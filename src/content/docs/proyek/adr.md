---
title: "Architecture Decision Records"
description: "Architecture and product decisions with their status, context, alternatives, and consequences — from separating console and API to workload isolation, quotas, the shared public domain, and the hosted plus self-host model."
track: proyek
section: sistem
order: 6
lang: en
canonical: true
---

# Architecture Decision Records

> A record of major decisions. Each entry states its status. A decision that
> changes a boundary gets a new ADR rather than an edit to an old one; an old
> ADR that no longer holds is marked **Superseded** and points to its
> replacement.

Status vocabulary:

```text
Proposed     under discussion, not yet binding
Accepted     binding; code and docs follow it
Superseded   replaced by a later ADR (linked)
```

ADR-001 to ADR-013 were recorded as short summaries. From ADR-014 onward each
entry carries context, the options considered, the decision, and its
consequences.

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

Update (2026-10-01): the API now issues short-lived GitHub App installation
tokens to the agent through a leased, per-command credential
(`LeaseRepositoryCredentialAction`). Private repository support is being
built on that path; the decision itself is unchanged.

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

## ADR-014 — Untrusted Workloads Run on a Separate Runtime Host Under gVisor

**Status:** Accepted (target for public registration; see MVP gate)

### Context

Every Sakala user deploys code that Sakala has never reviewed. For the first
market — students and interns — much of it is written while learning, and some
of it will be written by people who want to abuse free compute. It must be
treated as hostile.

Today the agent runs workloads with rootless Docker, per-container memory,
CPU, and PID limits, deadlines, and a capacity guard
(`sakala-agent/docs/RUNTIME_HARDENING.md`). Rootless Docker lowers the
privilege of the daemon, but a container still shares the host kernel. The
MVP topology (ARCHITECTURE §12) places user containers on the same host as the
API, PostgreSQL, Valkey, and object storage, so a kernel-level escape from one
user container reaches the control plane and every user's data.

### Options considered

| Option                             | Isolation                                | Fit for Sakala now                                                                                                                                                            |
| ---------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| runc + rootless + seccomp/AppArmor | Shared kernel, reduced privilege         | Already in place. Necessary, not sufficient for hostile code.                                                                                                                 |
| Sysbox                             | Shared kernel, stronger user namespacing | Aimed at running Docker-in-Docker; does not change the shared-kernel exposure.                                                                                                |
| **gVisor (`runsc`)**               | User-space kernel intercepts syscalls    | Drop-in OCI runtime for Docker and containerd; no hypervisor or nested virtualization needed; works on ordinary VMs, including a campus server.                               |
| Kata Containers                    | Lightweight VM per container             | Strong, but needs nested virtualization or bare metal; heavier to operate for a small team.                                                                                   |
| Firecracker microVMs               | Full VM per workload                     | Strongest; used by Fly.io and AWS Lambda. Requires bare metal or nested virt and a new image, networking, and observability model. Not a drop-in for the current Docker path. |
| One VM per user or per class       | Full VM                                  | Simple to reason about, but too expensive per student and slow to provision.                                                                                                  |

### Decision

1. **Separate the hosts.** User workloads run only on runtime nodes that host
   no control-plane service and no database. The API, database, cache, and
   object storage live on a separate app node. This is the change with the
   largest effect and does not depend on the sandbox choice.
2. **Run user containers under gVisor.** Runtime nodes register `runsc` as the
   Docker runtime for workloads labelled `dev.sakala.managed=true`. Builds keep
   running under the builder's own isolation path (rootless BuildKit), which is
   a separate hardening item.
3. **Keep the runtime abstraction open.** `RuntimeExecutor` already keeps the
   agent core independent of Docker. Firecracker or Kata remain candidates for
   a later runtime backend once there is bare metal and a measured need.

### Why gVisor and not the others

- It is the only strong option that works as a drop-in runtime on the Docker
  path Sakala already runs, on the kind of VM a sponsor or a campus actually
  has, without nested virtualization.
- The same choice works for self-host. A campus lab server can run gVisor; it
  usually cannot run Firecracker.
- Its known costs — slower syscalls, some filesystem and networking overhead,
  and occasional incompatibility with unusual system calls — matter less for
  small web services than for databases or heavy I/O, which Sakala does not
  host as user workloads yet.

### Consequences

- Before public registration, the production topology gains at least one
  dedicated runtime node, and `ARCHITECTURE.md` §12 describes two hosts.
- The agent needs a runtime-class setting and a preflight check for `runsc`.
- Performance and compatibility must be measured on the pilot workload set
  (Laravel, Express, Next.js) before the runtime becomes mandatory. Workloads
  that fail under gVisor are documented, not silently moved to runc.
- Self-host documentation states that running without gVisor is supported for
  trusted single-owner installations only.

## ADR-015 — Quotas Are Product Policy; Idle Projects Sleep

**Status:** Accepted (quotas in place; idle sleep and build rate limit required before public registration)

### Context

Heroku removed its free tier in 2022 citing fraud and abuse, and Glitch ended
hosting in 2025 citing operating costs and abuse. Free tiers that survive
(Render, for example) publish exact limits and put inactive services to sleep.
Sakala's pilot quotas already exist in the API (`config/sakala.php`,
`pilot_limits`), but nothing reclaims resources from a project nobody visits,
and nothing bounds how often a user can trigger builds.

### Decision

- Quotas are product policy owned by the API (ADR-007). Default hosted values
  are published in the PRD and on the site; self-host operators set their own.
- A project on the hosted service sleeps after a period without incoming
  requests and wakes on the next request. The period starts at 30 minutes for
  the pilot and is tuned from measurements. The existing `SleepProject` and
  `WakeProject` agent commands are reused.
- Builds are rate limited per user per hour, in addition to the concurrent
  deployment limits.
- A quota change is announced before it takes effect and never lowers a limit
  for projects already deployed without notice.

### Consequences

- Waking requires the edge to hold a request while the container starts, or
  to show a clear "starting" page. The user-facing copy must say that a sleep
  is expected behaviour, not a failure.
- Classroom resource policy (FEATURE_EDUCATION §7) is built on the same
  mechanism, with limits set per class instead of per user.

## ADR-016 — The Shared Public Domain Is a Reputation Asset

**Status:** Proposed

### Context

Every hosted project receives `<slug>.run.sakala.dev`. Free subdomains with
automatic HTTPS are a standard phishing tool: between August 2025 and July
2026 Kaspersky blocked 224,984 unique phishing subdomains on cloud and
decentralized services, led by `pages.dev` and `vercel.app`. If phishing is
served under `sakala.dev`, browsers and mail filters may start to distrust the
whole domain, including the landing and the console.

### Options considered

1. Keep `*.run.sakala.dev` and rely on takedown.
2. Move user workloads to a separate registrable domain (for example
   `sakala.app` or a `.site` domain), so a block against user content does not
   reach `sakala.dev`.
3. Option 2, plus submitting that domain to the Public Suffix List so browsers
   treat each project as its own site for cookies and reputation.

### Proposed decision

Option 3 before public registration. Until then, option 1 with the abuse
process in PLATFORM_OPERATIONS.

### Consequences

- A domain migration changes every existing project URL; it is far cheaper
  during the pilot than after public launch.
- Reserved slugs (`api`, `app`, `admin`, `status`, and others) stay reserved
  on the new domain.

## ADR-017 — Hosted and Self-host Share One Codebase and One License

**Status:** Accepted

### Context

The hosted service runs on infrastructure provided by GMEDIA. Its capacity is
finite. GMEDIA may offer paid capacity above the free quota as its own cloud
service; whether and how it does so is GMEDIA's business decision and is not
decided by this ADR. Institutions in the first market want to run Sakala on their
own servers and want assurance it will not disappear. Other projects show two
failure modes: a hosted-only platform that closes (Replit Education, GitHub
Classroom), and an open-source project that later moves features behind a
separate licence and loses trust.

### Decision

- Sakala is one codebase under Apache License 2.0. Hosted and self-host run
  the same code.
- No core feature is reserved for the hosted service or placed under a
  different licence.
- If GMEDIA offers paid capacity above the free quota, that payment is a
  relationship between the user and GMEDIA as infrastructure provider. It
  does not buy a Sakala licence and does not buy influence over the roadmap.
- Self-host installation for a single node is promoted from Horizon F to the
  horizon after Learn in the roadmap.

### Consequences

- Features that only make sense for the hosted service (billing integration
  with GMEDIA, should it exist) live behind configuration, not behind a
  licence.
- Dependency: any paid capacity requires an explicit business decision by
  GMEDIA. Until then, the hosted service offers only the free quota.
- GOVERNANCE records the sponsor boundary for pricing decisions.
- ADR-013 (distribution repository) becomes the delivery vehicle for
  self-host and moves from Proposed toward Accepted when installer work
  starts.
