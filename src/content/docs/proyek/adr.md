---
title: "Architecture Decision Records"
description: "Thirteen accepted and proposed decisions, from separating console and API to the future distribution repository."
track: proyek
section: sistem
order: 6
lang: en
canonical: true
---

# Architecture Decision Records

> Ringkasan keputusan arsitektur utama. Buat ADR file terpisah ketika keputusan menjadi lebih kompleks.

## ADR-001 — Separate Console and API

**Status:** Accepted

```text
sakala-console
→ SvelteKit

sakala-api
→ Laravel API
```

Legacy `sakala-dashboard` Laravel + Inertia + Svelte diarsipkan.

Reason:

- frontend/backend squad boundary jelas;
- explicit API contract;
- independent deployment;
- easier future CLI/public client;
- avoid coupling dashboard flow to Inertia.

## ADR-002 — Laravel Remains the Control Plane

**Status:** Accepted

Laravel handles auth, models, policy, deployment state, agent command, webhook, queue/event, realtime, and admin/product metadata.

Do not replace with Node/Fastify only because frontend is JavaScript.

## ADR-003 — Sanctum SPA Session for First-party Console

**Status:** Accepted

Use cookie/session for:

```text
app.sakala.dev
↔ api.sakala.dev
```

JWT is not default. Machine clients use bearer/scoped token.

## ADR-004 — Rust Agent Owns Privileged Runtime Operations

**Status:** Accepted

Only Agent performs Docker, build, Caddy, filesystem/runtime process, health/log execution.

API must not access Docker socket.

## ADR-005 — Agent Uses Outbound Polling for MVP

**Status:** Accepted

```text
heartbeat
→ poll
→ claim
→ execute
→ report
```

Reason:

- simple firewall/NAT model;
- no inbound remote shell;
- clear audit/state;
- easy single-node MVP.

## ADR-006 — Caddy Runs on Host for MVP

**Status:** Accepted

Reason:

- direct 80/443;
- automatic HTTPS;
- static Landing/Console;
- simple runtime routing;
- no extra edge container topology.

Agent manages deterministic route files with validate + reload.

## ADR-007 — Resource Policy vs Enforcement

**Status:** Accepted

```text
API
→ policy

Agent
→ enforcement

Node config
→ hard safety
```

Agent does not know Free/Pro/Education semantics.

## ADR-008 — Builder Priority

**Status:** Accepted

```text
1. Dockerfile
2. Railpack
3. Manual override
```

Analysis uses Sakala scanner + `railpack info`.

Real Railpack deployment uses `railpack prepare` + BuildKit frontend.

## ADR-009 — Public GitHub Repository First

**Status:** Accepted

MVP begins with public GitHub repos.

Private repository phase uses GitHub App + short-lived installation token, not persistent user PAT.

## ADR-010 — PRD Is Global; MVP Is Separate

**Status:** Accepted

`PRD.md` describes the product universe.

`MVP.md` constrains engineering scope.

Reason:

- UI/UX can design ahead;
- product vision remains visible;
- MVP cannot silently expand because future capability exists in PRD.

## ADR-011 — Explore Is Product Capability, Not Social Network

**Status:** Product Direction Accepted

Explore contains:

```text
Projects
Templates
Creators
Collections
```

No requirement for followers, DMs, generic feed, or social graph vanity metrics.

Focus is attribution, discovery, reuse, and project lineage.

## ADR-012 — Education Is Deployment Learning, Not LMS

**Status:** Product Direction Accepted

Sakala Learn focuses:

```text
Assignment
→ Source
→ Deploy
→ Live App
→ Review
```

It does not own curriculum, attendance, quizzes, or full grading.

## ADR-013 — Future `sakala` Repository Is Distribution, Not Monorepo

**Status:** Proposed

Purpose:

- installer;
- Compose/manifests;
- version pinning;
- self-host docs;
- CLI bootstrap.

Do not move all source repositories into it merely for installation convenience.
