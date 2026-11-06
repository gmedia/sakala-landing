---
title: "Start Contributing"
description: "A map for newcomers: which repository does what, how to run each one, which quality commands must pass, how to pick work, and the rule for changing the agent and API contract."
track: proyek
section: kerjasama
order: 13.5
lang: en
canonical: true
---

# Start Contributing

Pick one repository below, run it, then pick an issue. Sakala is split across five public repositories, and you do not need all of them running to make a useful change. The rules they share are in [Contributing to Sakala](/docs/proyek/contributing).

As of 6 November 2026, Sakala is not open to the public and the MVP is not done. See [MVP](/docs/proyek/mvp) for what exists and what does not.

## The repositories

| Repository                                                   | What it is                        | Stack                                   | Prerequisites                      |
| ------------------------------------------------------------ | --------------------------------- | --------------------------------------- | ---------------------------------- |
| [`sakala-landing`](https://github.com/gmedia/sakala-landing) | This site and canonical documents | Astro 7, Tailwind CSS 4                 | Node.js 22.12 or newer, npm        |
| [`sakala-console`](https://github.com/gmedia/sakala-console) | User dashboard, a static SPA      | SvelteKit, Svelte 5, Tailwind CSS 4     | Node.js 22.12 or newer, pnpm 10.31 |
| [`sakala-api`](https://github.com/gmedia/sakala-api)         | Control plane                     | Laravel 13, PHP 8.5, PostgreSQL, Valkey | PHP 8.5, Composer 2, Docker        |
| [`sakala-agent`](https://github.com/gmedia/sakala-agent)     | Runtime executor on a node        | Rust workspace                          | Rust 1.88 or newer, Make           |
| [`sakala-infra`](https://github.com/gmedia/sakala-infra)     | Local runtime reference           | Docker Compose, Caddy, shell scripts    | Docker with Compose, Make          |

The infrastructure that runs the hosted service is kept private, as [Governance §9](/docs/proyek/governance) explains. You do not need it to contribute.

## Run a repository

Each block starts from a fresh clone of that repository. Its own `README.md` and `CONTRIBUTING.md` hold the details.

`sakala-landing`:

```bash
npm ci
npm run dev
```

`sakala-console`, which needs a local API for anything past the login screen:

```bash
pnpm install
cp .env.example .env
pnpm exec playwright install chromium
pnpm dev
```

`sakala-api`:

```bash
cp .env.example .env
composer install
php artisan key:generate
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
```

`sakala-agent`, which starts in `local` mode by default, with no API and no Docker work. Stop it with Ctrl+C.

```bash
cargo run -p sakala-agent
```

`sakala-infra`:

```bash
cp .env.example .env
make up
make doctor
```

There is no single command that runs everything together yet. Connecting the agent to the local runtime is tracked in [`sakala-infra#4`](https://github.com/gmedia/sakala-infra/issues/4).

## Quality commands

Run these before opening a pull request. CI runs the same checks.

| Repository       | Commands                                                      | What to know                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sakala-landing` | `npm run format:check`, `npm run check`, `npm run build`      |                                                                                                                                                                           |
| `sakala-console` | `pnpm quality`, and `pnpm test:e2e` if a user flow changed    | Needs `.env` and the Playwright Chromium from setup, because component tests run in a browser                                                                             |
| `sakala-api`     | `composer check`, `composer audit --locked`                   | Without Sail, `composer check` cannot reach the database in `.env.example`. Prefix it with `DB_CONNECTION=sqlite DB_DATABASE=":memory:"`, as CI does for the OpenAPI step |
| `sakala-agent`   | `make fmt`, `make lint`, `make test`, `make build`            | `make check` runs the same set, but checks formatting instead of rewriting it                                                                                             |
| `sakala-infra`   | `make config`, and `bash -n scripts/*.sh` if a script changed | Run `make up`, `make doctor`, and `make test-runtime` if container behaviour changed                                                                                      |

## Pick work

Open issues live on each repository. Start with the ones labelled `good first issue` or `help wanted`, if there are any. As of 5 November 2026 no issue carries `good first issue` yet, so read the open list and ask.

- [`sakala-landing` issues](https://github.com/gmedia/sakala-landing/issues)
- [`sakala-console` issues](https://github.com/gmedia/sakala-console/issues)
- [`sakala-api` issues](https://github.com/gmedia/sakala-api/issues)
- [`sakala-agent` issues](https://github.com/gmedia/sakala-agent/issues)
- [`sakala-infra` issues](https://github.com/gmedia/sakala-infra/issues)

The labels `mvp` and `phase:N` link an issue to the engineering phases in the [Roadmap](/docs/proyek/roadmap). Say on the issue that you are taking it before starting anything large. If nothing fits, open an issue describing the problem, and do not start on Explore, Learn, or team features before the [public pilot gate](/docs/proyek/mvp) is met.

## Contract rules

Two contracts cross repository boundaries. Changing either one in only one repository breaks the others.

**Agent and API.** The wire types are defined in `sakala-agent`: the `sakala-agent-protocol` crate, plus `docs/AGENT_API.md`, `docs/COMMAND_LIFECYCLE.md`, and `docs/COMPATIBILITY.md`. `sakala-api` implements them and must not add an endpoint, command type, or wire field on its own. A change is made together with an explicit protocol change in the agent. A new failure code also needs a case in `DeploymentFailureClassifier` in `sakala-api`, or users see it as `unknown`. Anything that changes the agent's privilege boundary needs discussion first, and a new [ADR](/docs/proyek/adr) when it moves that boundary.

**Console and API.** Laravel API Resources and the Scramble OpenAPI output are the source of truth for the HTTP contract. When an endpoint changes, run `pnpm api:types` in `sakala-console` against a running local API, instead of writing the types by hand.

## Next

Read [Contributing to Sakala](/docs/proyek/contributing) for branches, commits, and pull requests, and [Architecture](/docs/proyek/architecture) if your change touches a boundary. Report security problems privately, as [Security §14](/docs/proyek/security) describes, never in a public issue.
