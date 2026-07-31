# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM caddy:2.10-alpine AS runtime

COPY docker/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv

RUN addgroup --system sakala \
    && adduser --system --disabled-password --ingroup sakala sakala \
    && mkdir -p /config/caddy /data/caddy \
    && chown -R sakala:sakala /config /data

USER sakala

ENV XDG_CONFIG_HOME=/config \
    XDG_DATA_HOME=/data

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://127.0.0.1:8080/healthz >/dev/null 2>&1 || exit 1
