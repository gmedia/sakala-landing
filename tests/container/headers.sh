#!/usr/bin/env bash

# Checks the headers the Landing image sends, against the real image and its Caddyfile. Every HTML
# page must say Cache-Control: no-transform, so Cloudflare does not inject its Web Analytics beacon
# (see docker/Caddyfile), and must still be compressed. Needs Docker. Touches no server.
#
#   tests/container/headers.sh                    build the image, then test it
#   IMAGE=<ref> tests/container/headers.sh        test an image that is already built

set -euo pipefail

cd "$(dirname "$0")/../.."

image=${IMAGE:-}
name=sakala-landing-headers-test
failures=0

cleanup() { docker rm -f "$name" > /dev/null 2>&1 || true; }
trap cleanup EXIT

pass() { printf 'ok   %s\n' "$1"; }
fail() {
    printf 'FAIL %s\n' "$1" >&2
    failures=$((failures + 1))
}
expect_equal() {
    if [ "$2" = "$3" ]; then pass "$1"; else fail "$1: expected '$2', got '$3'"; fi
}
expect_contains() {
    if grep -qF -- "$2" <<< "$3"; then pass "$1"; else fail "$1: expected to find '$2' in: $3"; fi
}

if [ -z "$image" ]; then
    image=sakala-landing:headers-test
    docker build --quiet -t "$image" . > /dev/null
    pass "built $image"
fi

cleanup
docker run -d --name "$name" -p 127.0.0.1::8080 "$image" > /dev/null
port=$(docker port "$name" 8080/tcp | head -n 1 | sed 's/.*://')
for _ in $(seq 1 50); do
    curl -fsS -o /dev/null "http://127.0.0.1:$port/healthz" 2> /dev/null && break
    sleep 0.2
done

headers() { curl -sS -D - -o /dev/null -H 'Accept-Encoding: gzip' "http://127.0.0.1:$port$1" | tr -d '\r'; }
# Prints the value of one header, matched case-insensitively, from the output of `headers`.
header_value() { sed -n "s/^$1: //Ip" <<< "$2" | head -n 1; }

# Every HTML file in the image, requested the way a browser would: a directory index by its
# trailing-slash URL, any other file by its own name (404.html, for example).
mapfile -t pages < <(docker exec "$name" find /srv -name '*.html' | sed -e 's|^/srv||' -e 's|/index\.html$|/|' | sort)
[ "${#pages[@]}" -gt 0 ] || fail "no HTML files found in /srv"
page_failures=$failures
for page in "${pages[@]}"; do
    response=$(headers "$page")
    status=$(head -n 1 <<< "$response")
    type=$(header_value Content-Type "$response")
    cache=$(header_value Cache-Control "$response")
    encoding=$(header_value Content-Encoding "$response")
    length=$(header_value Content-Length "$response")
    # Caddy's encode skips responses under 512 bytes, such as Astro's redirect stubs; every larger
    # page must still arrive compressed.
    compressed_ok=1
    if [ "$encoding" != gzip ] && [ "${length:-0}" -ge 512 ]; then compressed_ok=0; fi
    if [[ $status != *' 200'* || $type != text/html* || $cache != no-transform || $compressed_ok != 1 ]]; then
        fail "$page: status '$status', Content-Type '$type', Cache-Control '$cache', Content-Encoding '$encoding', Content-Length '$length'"
    fi
done
if [ "$failures" -eq "$page_failures" ]; then
    pass "all ${#pages[@]} HTML pages: 200, text/html, Cache-Control: no-transform, gzip from 512 bytes"
fi

# The pages named in the evidence, spelled out so a missing page cannot pass by omission.
for page in / /en/ /privasi/ /404.html; do
    response=$(headers "$page")
    expect_contains "$page: is HTML" 'Content-Type: text/html' "$response"
    expect_equal "$page: Cache-Control" 'no-transform' "$(header_value Cache-Control "$response")"
done

# Everything else keeps its previous headers.
css=$(docker exec "$name" find /srv -name '*.css' | head -n 1 | sed 's|^/srv||')
expect_equal "stylesheet $css: no Cache-Control added" '' "$(header_value Cache-Control "$(headers "$css")")"
expect_equal "rss.xml: no Cache-Control added" '' "$(header_value Cache-Control "$(headers /rss.xml)")"
expect_equal "healthz: still answers" 'ok' "$(curl -fsS "http://127.0.0.1:$port/healthz")"

if [ "$failures" -gt 0 ]; then
    printf '%s check(s) failed.\n' "$failures" >&2
    exit 1
fi
printf 'All container header checks passed.\n'
