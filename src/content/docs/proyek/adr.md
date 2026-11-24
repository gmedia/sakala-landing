---
title: "Architecture Decision Records"
description: "Architecture and product decisions with their status, context, alternatives, and consequences — from separating console and API to workload isolation, quotas, the shared public domain, the hosted plus self-host model, workspace ownership, the edge routing tier with replicas and regions, managed PostgreSQL for projects, proposed managed object storage, and proposed worker processes and scheduled jobs."
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

### Update 2026-11-06: rootful Docker with `runsc` on runtime nodes

The maintainer decided that runtime nodes run **rootful Docker with `runsc`**.
This replaces rootless Docker on runtime nodes, which the context above
describes as the state at the time. The feature is ready, but it is not yet
enabled in production.

Reasons:

- Under rootless Docker, `runsc` only starts with `--ignore-cgroups`, and with
  that flag per-workload limits stop applying. In the test, a 512 MiB allocation
  succeeded inside a 256 MiB limit, `--cpus 0.5` used 196% CPU, and
  `--pids-limit 32` passed at 117 PIDs. One tenant could exhaust the whole node.
- Under rootful Docker, all three limits apply. On the staging node (KVM VM
  without nested virtualization, kernel 7.0, cgroup v2, `runsc`
  release-20261102.0, platform `systrap`), a 200 MB allocation inside a 64 MiB
  limit ended with exit 137, and `--cpus 0.5` measured about 55%.
- The cost is a daemon running as root, so access to its socket equals root on
  that node. Decision 1 already keeps runtime nodes apart from the control plane,
  which bounds that cost to the node, and gVisor becomes the main isolation
  boundary.

The compatibility measurement in Consequences still stands: small Node and PHP
applications ran under `systrap`, but performance and compatibility of Laravel,
Express, and Next.js are not measured yet. Measurements live in
`sakala-agent/docs/RUNTIME_HARDENING.md`. Moving a node is described in the
`sakala-deployment` README.

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

### Update 2026-11-13: the wake path does not wait for the edge tier

Idle sleep is built on a single runtime node first, without the edge tier of
ADR-019. When a project sleeps, the Agent swaps its route in `runtime-caddy`
for a static "starting" page. The page asks the API to wake the project through
a public, rate-limited endpoint that only accepts a project that is actually
asleep, then reloads once the route points at the container again. Idle time is
measured from the access log of `runtime-caddy`. ADR-019 later moves the same
behaviour into Sakala Edge, where a request can also be held instead of
answered with a page.

## ADR-016 — The Shared Public Domain Is a Reputation Asset

**Status:** Accepted (`sakala.app` in use since 2026-11-18; Public Suffix List
submission pending)

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

### Update 2026-11-18: `sakala.app` chosen, old domains switched off

The maintainer accepted option 2 now and kept option 3 as the remaining step.
User projects moved to **`sakala.app`**:

- Production project URLs are `<slug>.sakala.app`. Staging uses
  `<slug>.staging.sakala.app`. A DNS wildcard covers exactly one label, so the
  production wildcard never serves a staging name, and `staging` joins the
  reserved slugs so no production project can claim `staging.sakala.app`.
- The apex `sakala.app` is not a project; it redirects (`301`) to
  `https://sakala.dev`.
- Certificates are issued the same way as before: host Caddy with the
  Cloudflare DNS module, through DNS-01.
- `*.run.sakala.dev` and `*.run.staging.sakala.dev` were switched off at once,
  without redirects. A redirect would have kept user content reachable under
  `sakala.dev`, the domain this ADR protects. Existing projects received their
  new address by being deployed again.
- Because `sakala.app` is a different registrable domain, no `sakala.dev`
  cookie reaches a project, whatever its `Domain` attribute.

Remaining step: submit `sakala.app` to the Public Suffix List, together with
`staging.sakala.app`, since a suffix only separates the label directly below
it. Until they are listed, browsers treat two projects as the same site, so
one project can set a cookie on `.sakala.app` that every other project,
staging included, receives, and reputation systems may still judge all
projects together. The operator procedure for the
move is in the `sakala-deployment` README.

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

## ADR-018 — Workspace Ownership and Limit Profiles

**Status:** Accepted (API foundation in progress; admin API and Console follow)

Tracked in [sakala-api#122](https://github.com/gmedia/sakala-api/issues/122).

### Context

Today every project belongs to one personal account, and limits apply per
account. A real case does not fit: interns from a partner campus build
`facility-reporting` for GMEDIA. It should be deployed under the GMEDIA
organisation, GMEDIA must control who can deploy and the team's resource
limits, and access to the repository must not depend on one intern's personal
account. Classroom resource policy (ADR-015, FEATURE_EDUCATION) also needs
limits per class rather than per user.

### Decision

- Every project is owned by a workspace. Every user has exactly one personal
  workspace, created at registration; existing users are backfilled by
  migration and their projects move into it. The user column on a project
  stays as the creator. Creating a project without naming a workspace uses the
  personal workspace, so solo use feels unchanged.
- A team is a workspace of type `team` with three roles: `owner` (manage
  members, invitations, and settings), `member` (create, deploy, and manage
  the team's projects, including environment variables), and `viewer` (read
  only; never sees secret values). Sakala admins keep their existing powers. A
  member who leaves or is removed loses access at once; projects stay with the
  workspace. A team always keeps at least one owner; the last owner cannot
  leave or be demoted.
- Any user with a verified email may create team workspaces, capped per user
  (default 2 owned teams, from configuration). An admin can raise one user's
  cap. The cap applies to every path to ownership: creating a team, accepting
  an owner invitation, and being promoted to owner.
- Members join through email invitations that carry a role, a single-use
  token stored only as a hash, and an expiry (default 7 days). A `member` or
  `viewer` invitation can be accepted with the token from any verified
  account; an `owner` invitation only by the account whose verified email is
  the invited address, so a forwarded link cannot hand over a team. An owner
  who leaves or loses the role revokes the invitations they sent.
- Resource limits come from reusable limit profiles (for example "Pilot",
  "Magang GMEDIA", "Kelas") attached to a workspace: max projects, max running
  containers, max concurrent deployments, per-project memory and CPU caps, and
  a builds-per-hour field reserved for the build rate limit
  ([sakala-api#124](https://github.com/gmedia/sakala-api/issues/124)).
  Personal and team workspaces use the same mechanism. A personal workspace
  without a profile keeps today's pilot limits, so nothing changes for existing
  users. A team without a profile gets small defaults (2 projects, 2 running
  containers, 1 deployment at a time), so creating teams does not multiply
  quota; a team that needs more gets a profile from an admin. Limits count per
  workspace, never per member, and are enforced under a row lock on the
  workspace.
- GitHub access for team projects:
  - a public repository needs no person, so deploys keep working when the
    creator leaves;
  - a private repository from a GitHub App installation keeps access only
    while a current owner or member with a linked GitHub identity is linked
    to that installation: the creator while still a member, otherwise the
    longest-standing owner, then member. When nobody qualifies, deploys stop
    with `REPOSITORY_ACCESS_REVOKED` until someone in the team links the
    installation;
  - on an organisation installation that person only anchors the access: the
    installation token reads the repository, and the organisation controls
    which repositories the installation sees. On an installation on a personal
    GitHub account, that person's own token must still read the repository.

  Personal workspace projects keep today's rule: the owner must still have
  access.

- Deleting an account deletes the personal workspace and its projects as
  before and removes memberships. It is refused with `LAST_WORKSPACE_OWNER`
  while the user is the last owner of a team that still has projects; an empty
  team they solely own is deleted with the account.

### Consequences

- The admin API for profiles and workspaces, then the Console (workspace
  switcher, members page, owner shown on projects), follow in later changes.
  The API stays backward compatible (additive fields only), so the current
  Console keeps working.
- Audit events record membership, role, invitation, and limit-profile changes.
- A team project from an organisation installation keeps deploying after its
  creator leaves, as long as another owner or member is linked to the
  installation and it still includes the repository. Removing the repository
  from the installation is the organisation's lever.
- Realtime subscriptions are authorised once, when they open: a removed
  member stops receiving deployment events only after reconnecting.
- Moving a project between workspaces is not part of this decision.

## ADR-019 — Sakala Edge Routes Public Traffic to Runtime Nodes

**Status:** Accepted (2026-11-18: Sakala Edge serves production traffic;
see the update of 2026-11-18)

### Context

Every project URL resolves through one DNS-only wildcard record,
`*.sakala.app`, to one runtime host. Host Caddy terminates TLS there and
passes the request, `Host` header intact, to `runtime-caddy` on loopback, which
reads the route files the Agent writes for that node. This works because there
is exactly one runtime node.

The API already supports more than one node: `AgentNodeSchedulerService` picks
the online node with the fewest reserved commands and keeps a project on the
node that serves it. What is missing sits in front of the nodes:

- DNS cannot tell which node serves a project, so a second node, even in the
  same data centre, has no way to receive its projects' traffic.
- Nodes carry no location. A node in Yogyakarta and one in Jakarta are
  indistinguishable to the scheduler and to the user.
- Waking a sleeping project (ADR-015) is best done where a request can be held
  for a few seconds instead of answered with a page.
- Running one project as several containers and spreading requests across them
  (load balancing between replicas) needs a component that knows every
  replica of a project and its health.
- Rate limits and abuse blocks for user workloads currently live on each
  runtime host, next to untrusted code.

### Options considered

1. **One DNS record per project**, created through the DNS provider's API and
   pointing at the node that serves it. No new component, but every
   deployment depends on the DNS provider, record changes wait for TTLs, a
   move between nodes is slow and visible, sleeping projects still need a
   node to answer, and there is nowhere to balance load.
2. **One wildcard per region**, for example `*.jkt.sakala.app` and
   `*.jog.sakala.app`, each pointing at that region's runtime host. Simple
   and close to today, but the region becomes part of every URL, moving a
   project between regions changes its address, and several nodes inside one
   region still cannot share traffic.
3. **Sakala Edge**: a routing tier on its own hosts that holds the wildcard
   certificate, looks up which node (and later which replicas) serve a
   project, and forwards the request there over a private network. The
   project URL never contains a node or a region.
4. **A managed edge** such as Cloudflare Workers or Tunnel. Little to
   operate, but routing, waking, and abuse handling would depend on a
   proprietary platform that self-host operators cannot run, contrary to
   ADR-017.

### Proposed decision

Option 3, built from an existing reverse proxy rather than a custom one, and
introduced in stages so each stage is justified by a real need:

1. **One runtime node (today).** No edge. Idle sleep follows the update to
   ADR-015 on the node itself.
2. **Second runtime node.** Sakala Edge appears on a separate host. The
   wildcard record points at the edge. The API is the source of truth for
   which node serves which project and publishes a route table; the edge pulls
   it with its own credential and keeps the last good copy, so an API outage
   does not take down running projects. Traffic from the edge reaches each
   node's `runtime-caddy` over WireGuard; the node no longer accepts project
   traffic from the internet. Waking, request holding, rate limits, and abuse
   blocks move to the edge.
3. **Regions.** Nodes report a region label (`SAKALA_AGENT_REGION`). A
   workspace or project chooses a region, the scheduler only places it on
   nodes of that region, and an edge runs per region. DNS steers users to the
   edge of the project's region.
4. **Replicas and load balancing.** A project can ask for more than one
   container. The scheduler places the replicas, the route table lists all of
   them with health, and the edge balances requests across the healthy ones.
   This is the stage that answers "can Sakala load balance an app".

Making the control plane itself highly available (several API hosts behind a
load balancer) is a separate decision and not part of this ADR.

### Consequences

- The edge becomes a strong dependency of every project, so stage 2 runs two
  edge instances from the start, and a stale route table must keep serving
  rather than fail closed.
- The edge holds the TLS certificate for every project URL. It never runs
  tenant code, and its credential can only read the route table.
- Requests gain one hop inside the same region; the latency is measured when
  stage 2 starts instead of assumed.
- The domain move of ADR-016 is cheapest when the edge is introduced, because
  the edge is where the new wildcard certificate lives.
- Self-host keeps working without an edge: a single-node installation uses the
  path that runs today, and the edge is optional until a second node joins.
- The Agent, the API route table, and the scheduler change together, so this
  work stays with maintainers (protocol and security boundary), not with
  outside contributors.

### Update 2026-11-18: build order, technology, regions

**Build order.** The maintainer changed the order of the stages above. Replicas
on one node come first, and Sakala Edge is built now, before a second node
exists, so adding a node later is provisioning only.

- **Phase 1, replicas on a node.** A project can run N containers on the node
  that serves it. The node's Caddy (`runtime-caddy`) balances across the
  healthy replicas with `least_conn` and passive health checks: a replica that
  fails a request receives no traffic for 10 seconds, and the request is
  retried on another replica for up to 5 seconds. Active health checks were
  rejected because Caddy 2.11 treats only one status class as healthy, while
  Sakala treats any status below 500 as alive.
- **Phase 2, Sakala Edge.** Built next and deployed in front of the single
  node that exists today.

**Technology.** Sakala Edge is Caddy as the data plane plus a small sync
service, `sakala-edge`:

- The API publishes the route table at `GET /api/edge/v1/routes`, readable
  only with the Edge credential.
- `sakala-edge` validates every table before using it. It rejects an empty
  table, a host outside the project domains, an upstream that is not a
  private address, and a table smaller than the minimum the API says to
  expect. It keeps the last good snapshot on disk, renders it as a Caddyfile
  include, and reloads Caddy, rolling back to the previous file if the reload
  fails. An API outage, or an Edge restart during one, therefore keeps the
  last good routes.
- Traefik with its HTTP provider was evaluated and rejected. It does not
  persist polled configuration, so an Edge restart during an API outage would
  drop every route. Its open-source ACME cannot share certificates between
  instances. It would also add a second proxy to a stack that otherwise runs
  only Caddy.
- Caddy's own HTTP config loader was rejected because it replaces the whole
  configuration on each load and stops polling after one failed apply.
- Rate limiting at the Edge is deferred, because Caddy needs a third-party
  module for it. Rate limiting of wake requests already lives in the API.

**Load balancing layers.** The Edge balances across nodes; each node's Caddy
balances across that node's replicas. The Edge never needs to know about
individual replicas.

**Regions**, as agreed with the maintainer:

- A user chooses a region per project. A workspace may set a default region
  for its new projects.
- The scheduler places a project only on nodes labelled with that region.
- When a region has more than one node, the replicas of a project are spread
  across different nodes in that region automatically.
- Replicas in more than one region are deferred until there is demand. They
  need DNS that steers each user to the nearest region, and they make apps
  backed by one database slower, because every request from the far region
  crosses to the database.

**Status.** Accepted on 2026-11-18, when Sakala Edge started serving production
traffic.

- Done: replicas on a node
  ([sakala-agent#93](https://github.com/gmedia/sakala-agent/pull/93),
  [sakala-api#162](https://github.com/gmedia/sakala-api/pull/162),
  [sakala-console#129](https://github.com/gmedia/sakala-console/pull/129)),
  the API route table with region- and capacity-aware placement
  ([sakala-api#163](https://github.com/gmedia/sakala-api/pull/163)), the
  `sakala-edge` route sync
  ([sakala-agent#95](https://github.com/gmedia/sakala-agent/pull/95),
  [sakala-agent#96](https://github.com/gmedia/sakala-agent/pull/96)), restarting
  exited replicas ([sakala-agent#98](https://github.com/gmedia/sakala-agent/pull/98)),
  and the Edge running on staging and production.
- Remaining: the second node, and replicas spread across nodes (stage 4).

## ADR-020 — Managed PostgreSQL for Projects

**Status:** Proposed (decisions approved by the maintainer on 2026-11-18;
becomes Accepted when the first managed database serves a project)

Tracked in [sakala-api#125](https://github.com/gmedia/sakala-api/issues/125).

### Context

Almost every student application needs a database. Today users sign up with
an outside provider and paste its URL into environment variables
([external database guide](/docs/database-eksternal)): one more account, a
region to choose, and connections across the internet.

Users need a database inside Sakala, credentials they never copy, a backup,
and a clear size limit. The platform needs tenant isolation, an enforceable
quota, no internet exposure, compatibility with idle sleep (ADR-015), and a
small footprint that one person can run when self-hosted (ADR-017).

### Options considered

1. **A. One shared PostgreSQL instance per region**, one database and one
   login role per tenant database, as hobby tiers do: Heroku Essential shares
   clusters between customers
   ([Heroku](https://help.heroku.com/NYMRTXEG/why-am-i-seeing-information-about-other-postgresql-processes-or-databases-that-aren-t-related-to-my-heroku-postgres-essential-database)),
   and a Laravel Cloud cluster holds up to 500 databases
   ([Laravel Cloud](https://laravel.com/cloud/docs/resources/databases/postgres)).
   Isolation is SQL privileges only.
2. **B. A PostgreSQL container per database**, as Dokku, Coolify, and Railway
   do. Strong isolation, but each is its own upgrade, backup, and wake
   ordering, and uses node memory.
3. **C. Self-hosted Neon.** Branching and scale to zero, but it needs a
   pageserver, safekeepers, a broker, a storage controller, and object
   storage, and upstream documents it only "on a workstation for small
   experiments" ([Neon](https://github.com/neondatabase/neon)).
4. **D. Hybrid**: A by default, B for databases that outgrow it.
5. **External providers only** (status quo): no operations, no user need met.

### Decision

Option A for v1, with D as the planned next step.

- **Database host.** One dedicated VM per region, at the same provider and
  location as the runtime nodes, on their private LAN, never reachable from
  the internet. It starts at 2 vCPU, 4 GB RAM, and 100 GB SSD: about 1 GB
  `shared_buffers` and `max_connections` around 100 (5 per database for about
  20 active at once); idle databases cost almost nothing. Before serving, its
  disk must reach several hundred fdatasync ops/s in `pg_test_fsync`; the
  staging host measured 54 (below). Running the instance on a runtime node is
  for single-node and self-host installations only.
- **Runtime.** runc, not runsc: tenants submit SQL, not processes, untrusted
  procedural languages are refused, and gVisor would contain a compromised
  PostgreSQL only after every tenant's data is exposed. Containers under D,
  where a tenant may get superuser, run under runsc.
- **A database belongs to a workspace**, personal or team (ADR-018), like a
  standalone service. It has its own Console page next to projects, can be
  created without any project (for example to practise SQL), and survives
  project deletion. It attaches to zero, one, or several projects of the same
  workspace: attaching injects the connection variables into that project,
  detaching removes them and keeps the data. Every database lives in the
  shared instance of its region.
- **Regions.** A database has its own region, by default that of the project
  it is created for. Another region is allowed with a latency warning: each
  query round trip between regions adds about 10 to 20 ms, or 0.3 to 0.6 s
  for a page with 30 queries. Moving a project does not move its database;
  the Console warns and offers to keep it or to create one in the new region
  and copy the data, with a later "copy database" action (dump and restore,
  the original untouched until the user switches). Data never moves
  implicitly. Until a private network between regions exists (WireGuard or
  similar), attaching across regions is refused with a clear message; with
  one region today the case does not arise.
- **Quotas.** The workspace's limit profile sets `max_databases` and
  `max_database_storage_mb`, starting at 2 databases and 512 MB in total for
  a personal workspace and higher for teams (for example 5 GB), to be tuned.
  One hundred personal workspaces at their limit take 50 GB of the 100 GB
  disk. PostgreSQL has no per-database quota, so a size watcher sums
  `pg_database_size()`, warns the owner at 80 %, and at the limit sets
  `ALLOW_CONNECTIONS false` on the workspace's databases
  ([PostgreSQL](https://www.postgresql.org/docs/current/sql-alterdatabase.html)).
- **Provisioning.** Agent commands on the database host (ADR-004, ADR-005)
  create the database and role with random names (`p_<random>`), so the
  superuser credential never leaves it. Database privileges are revoked from
  PUBLIC. Credentials are encrypted, redacted from logs, rotatable, and
  injected into the release command and every container of attached
  projects; variable names are decided at implementation.
- **Network and hardening.** Connections only from the runtime nodes'
  private IPs, `scram-sha-256` with long random passwords, and CONNECT only on
  the tenant's own database; `postgres` and `template1` closed to PUBLIC, no
  CREATE on schema `public`
  ([PostgreSQL](https://www.postgresql.org/docs/current/ddl-schemas.html)).
  No per-project network rule in v1: every container on a node leaves with
  the node's IP, so the database cannot tell projects apart by address.
  sakala-api#125's "only the owning project's containers" is met by
  credentials and privileges; per-project network rules return with D.
  Access from outside Sakala is not offered (later perhaps TLS with an IP
  allow-list). Security releases are applied within days; cluster-wide major
  upgrades are announced.
- **Extensions.** `pgcrypto`, `citext`, `pg_trgm`, `unaccent`, and `hstore`,
  which PostgreSQL marks trusted so a tenant creates them
  ([PostgreSQL](https://www.postgresql.org/docs/current/contrib.html)), and
  `pgvector`. pgvector is not trusted (`vector.control` in 0.8.7 has no
  `trusted = true`; upstream declined in
  [pgvector#288](https://github.com/pgvector/pgvector/issues/288)), so the
  database agent installs it on request. No PostGIS yet.
- **Limits.** `CONNECTION LIMIT` on role and database (starting at 5),
  shared by every attached project's replicas. Role defaults for
  `statement_timeout`, `idle_in_transaction_session_timeout`, and
  `idle_session_timeout`, which a tenant can override, and `temp_file_limit`,
  which it cannot
  ([PostgreSQL](https://www.postgresql.org/docs/current/runtime-config-resource.html)).
  PgBouncer is added when peak connections pass about 70 % of
  `max_connections` or many projects run replicas.
- **The `work_mem` risk.** A tenant can `SET work_mem = '2GB'`, and a query
  may use several times that. Instance memory and connection limits bound
  it, but an OOM restarts the instance for every tenant. This is the main
  reason for D.
- **Backups and downloads.** Nightly `pg_dump -Fc` per database, encrypted
  with age and stored off the host like the control-plane backup, kept 7
  days (longer may come with a team tier), with a scheduled restore drill.
  Point-in-time recovery waits for a team or paid tier, or for data that
  cannot be recreated; until then the docs state that up to one day of data
  can be lost (RPO 24 h). Owners can download a dump of their database from
  the Console, rate-limited, as the [Terms](/syarat) keep data the user's. A
  simple SQL console may come later.
- **Visibility.** Tenants can list other database and role names; PostgreSQL
  "is not designed to hide this information"
  ([pgsql-hackers](https://postgresql.org/message-id/671405.1716570133%40sss.pgh.pa.us)).
  Names are random.
- **Sleep, deploys, self-host.** The instance is always on at a fixed cost;
  a sleeping project holds no connections and wakes without waiting for it.
  Branching and scale to zero are not offered (option C). Migrations run in
  the release command before the new version takes traffic. Self-host gets
  this as an optional component in `gmedia/sakala`, off by default.

### Measurement under gVisor

`postgres:18-alpine` (18.7), 256 MB memory limit, `shared_buffers=32MB`,
`max_connections=20`, one run per runtime on 2026-11-18, on the shared
staging host (2 vCPU Haswell, 1.9 GiB RAM, load average 2.9 to 5.2), runsc
`release-20261102.0` with systrap and directfs.

| Measure                                   | runc              | runsc             |
| ----------------------------------------- | ----------------- | ----------------- |
| First start with initdb, to `pg_isready`  | 6.5 s             | 24.1 s            |
| Stop then start, to `pg_isready` (3 runs) | 4.4 / 4.9 / 3.2 s | 7.6 / 4.6 / 2.2 s |
| Idle memory after init (`docker stats`)   | 18.1 MiB          | 61.6 MiB          |
| `pg_test_fsync` fdatasync (8 kB)          | 53.9 ops/s        | 10.4 ops/s        |
| `pgbench -i -s 5`                         | 22.1 s            | 17.1 s            |
| `pgbench -c 4 -j 2 -T 30`: TPS, latency   | 26.0, 153.9 ms    | 26.8, 149.0 ms    |

gVisor costs about 43 MiB per idle instance and 2 to 5 times slower
fdatasync. Throughput was equal most likely because the disk is the
bottleneck (about 18 ms per fdatasync even under runc), hence the disk
requirement above. For D, a sandboxed database idles at about 60 MiB and
restarts within the 10 to 13 s app wake. With one noisy run each,
differences below about 2 times are not meaningful.

### Moving to option D

When a database needs a superuser-only extension or another major version;
one tenant repeatedly tops CPU or IO or causes an OOM; a team or paid tier is
introduced; a university needs stronger isolation (for example graded
assessments); or the instance passes about 70 % of `max_connections` or
memory at peak.

### Consequences

- The instance is a shared dependency: a restart or OOM affects every
  database in the region.
- The boundary between tenants is credentials and the CONNECT privilege, not
  the network. Workspace quotas protect the shared instance.
- Managed databases stay part of one product (same Console, accounts,
  workspaces, limit profiles) but keep a clean boundary: their own API
  resource and quota rules outside project logic, their own Agent role on the
  database host, and projects that consume them only through attachment and
  connection variables. They could later be offered as a separate service
  without a rewrite.
- The API gains a resource holding secrets, so this work stays with
  maintainers. External databases stay supported.

### Open questions (owner: maintainer)

- The concrete database host machine and provider per region, which depends
  on GMEDIA infrastructure.

### Plan

No dates; each phase starts after the previous one.

1. Provision a database host on staging and measure its disk against the
   requirement above.
2. API: a workspace-scoped `databases` resource with a region and project
   attachments (create, attach, detach, rotate, dump download, delete),
   variable injection into attached projects, and `max_databases` and
   `max_database_storage_mb` in limit profiles.
3. Agent database role: provisioning, size watcher, nightly dumps, restore
   drill; a user guide on the landing that states the RPO.
4. Console: a Databases page next to projects (usage against the quota,
   attachments, dump download) and the attached database in each project's
   environment view, values hidden, with the cross-region warning.
5. The "copy database" action and the optional self-host component in
   `gmedia/sakala`.

### Update 2026-11-23: phase 1 and the production pilot

Phase 1 shipped in sakala-api v0.9.0 (the `databases` resource, attachments,
injection, quotas, rotation), sakala-agent v0.12.0 (the database role), and
Console v0.10.0 (the Database page); the wizard's database choice followed
in Console v0.11.0. What changed against the decision above:

- **Variable names.** Attached projects receive `DATABASE_URL`
  (`postgresql://...?sslmode=require`), `DB_CONNECTION=pgsql`, `DB_HOST`,
  `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD`, built at
  deployment time and never stored as project variables. A project variable
  with the same name wins.
- **Locking at the quota.** A full workspace gets its roles set to
  `NOLOGIN` and their sessions terminated, not `ALLOW_CONNECTIONS false`,
  because the latter also blocks the superuser and would stop the nightly
  backup exactly when the data matters most.
- **Production host.** The production pilot instance runs on the runtime
  node, with a 512 MB memory cap and 50 connections, until a dedicated
  database VM exists (maintainer decision of 2026-11-20). This is the
  exception the "Database host" bullet reserves for single-node installs,
  accepted for a small pilot: the default quota on production is 0, and
  workspaces are opened one by one through limit profiles, starting
  2026-11-23.
- **Backups.** Nightly `pg_dump -Fc` per database, encrypted with age, 7
  sets kept on the database host; in production a copy is pulled nightly to
  the control-plane host and kept for 14 sets. A restore drill from that
  off-host copy on 2026-11-23 matched the live database.
- **Not built yet.** Dump download in the Console, restore by the owner, and
  "copy database". Restores are done by a maintainer, and the [Managed Databases](/docs/database-terkelola)
  user guide says so, together with the RPO of up to one day.

**Tenant dumps are never restored as a superuser.** A dump holds objects the
tenant defined, and restoring it runs some of them: functions called by
`CHECK` constraints, index expressions, column defaults, and triggers. They
run with the privileges of the restoring session. Under a superuser session
that tenant code runs as superuser, and `pg_restore --role` does not contain
it, because `SET ROLE` can be undone with `RESET ROLE` while the session user
is a superuser
([PostgreSQL](https://www.postgresql.org/docs/current/sql-set-role.html)).
From there it could, for example, make its own role a superuser or read
other tenants' databases. So a restore logs in as a role without superuser:
the tenant's own role for a real restore, or for a drill a throwaway role
with no other privileges in a scratch database, which is what
`restore-database.sh` in `sakala-deployment` does. Extensions on the
allow-list, which need the superuser, are created first and left out of what
that role restores.

## ADR-021 — Managed Object Storage for Projects

**Status:** Proposed (direction set by the maintainer on 2026-11-23; becomes
Accepted when the first managed bucket serves a project)

### Context

Sakala has no file storage for projects. Every deployment creates a new
container, and the runtime never mounts host volumes into workloads
(sakala-agent `docs/DOCKER_RUNTIME.md`), so anything an application writes to
its filesystem, such as uploaded images, Laravel's `storage/app`, or a SQLite
file, is lost on every redeploy and rollback. On hosted Sakala it is lost even
sooner: workloads run under gVisor (ADR-014) with its root overlay inside the
sandbox, so writes disappear whenever the container stops, including idle
sleep (ADR-015), **Restart**, and an automatic restart after a crash (tested
on the staging runtime node on 2026-11-23; under plain runc the same file
survives a stop and start). Each replica (ADR-019) has its own filesystem, so
replicas do not even see each other's files.

Today users are told to use an S3-compatible provider outside Sakala
([File Storage guide](/docs/penyimpanan-file)): one more account and keys to
copy. A first application that accepts uploads works until its next deploy,
then loses them. The roadmap, PRD, and vision already list managed object
storage as a direction.

Users need a bucket inside Sakala, credentials they never copy, and a clear
size limit. The platform needs tenant isolation, an enforceable quota,
protection of the shared domain's reputation (ADR-016), and a footprint one
person can run when self-hosted (ADR-017).

### Options considered

1. **RustFS** ([rustfs/rustfs](https://github.com/rustfs/rustfs)), Apache
   2.0, an S3-compatible store written in Rust. Version 1.0.0 was released on
   2026-09-16 and 1.0.6 on 2026-11-15. Its README lists IAM policies, bucket
   quota, and multi-tenancy as available, and marks S3 Tables (Iceberg REST)
   and MinIO on-disk compatibility as preview, behind an opt-in flag or with
   a bounded compatibility claim; Sakala needs neither. It already runs
   inside the control plane as internal avatar storage reachable only by the
   API (`sakala-deployment`, pinned to 1.0.0), so operators know it.
2. **Garage** ([deuxfleurs](https://garagehq.deuxfleurs.fr/)), AGPLv3, built
   for self-hosting on modest hardware: a single dependency-free binary, 1 GB
   RAM and 16 GB disk as its stated minimum, and a geo-distributed design
   meant for nodes in several physical locations. It has per-key permissions
   on each bucket and bucket quotas on size and object count. Lighter than
   RustFS, and a strong candidate; not chosen, by the maintainer's choice of
   RustFS below.
3. **MinIO Community.** Its README declared maintenance mode on 2025-12-03 and
   "no longer maintained" on 2026-02-12, pointing to the commercial AIStor
   editions, and the `minio/minio` repository is archived on GitHub (checked
   2026-11-23). Rejected: no security fixes can be expected for a service
   exposed to the internet.
4. **SeaweedFS.** Viable and mature, but more moving parts for a pilot: a
   master, volume servers, a filer, and the S3 gateway.
5. **Ceph RGW.** Proven at scale, but far too heavy for the pilot's hardware:
   monitors, managers, OSDs, and the gateway.
6. **Per-project host volumes.** Rejected: a volume pins a project to one
   node, conflicts with replicas, with the edge tier moving traffic between
   nodes (ADR-019), and with rollback to a deployment whose files no longer
   match, and every volume becomes a separate backup and restore problem.
7. **External providers only** (status quo): no operations, no user need met.

### Decision

Option 1, RustFS, for v1, chosen by the maintainer on 2026-11-23 for
consistency with Sakala's Rust components (the agent, ADR-004, and Sakala
Edge, ADR-019) and for
its permissive license, the same Apache 2.0 that Sakala uses. It runs as a
separate service that Sakala reaches over the S3 and admin HTTP APIs.

- **A bucket belongs to a workspace**, personal or team (ADR-018), like a
  managed database (ADR-020). It has its own place in the Console, can exist
  without a project, survives project deletion, and attaches to zero, one, or
  several projects of the same workspace. Attaching injects the connection
  variables; detaching removes them and keeps the objects.
- **Quotas** live in limit profiles as new fields, for example `max_buckets`
  and `max_bucket_storage_mb` (names decided at implementation). The default
  on hosted is 0, and workspaces are opened one by one through limit
  profiles, as in the database pilot. Enforcement relies on RustFS bucket
  quotas once they are confirmed (see the open questions); until then a size
  watcher sums bucket usage, warns at 80 %, and blocks writes at the limit,
  as ADR-020 does for databases.
- **Credentials.** One access key per bucket, whose IAM policy allows object
  reads and writes on that bucket only, with no admin, bucket-policy, or
  other-bucket actions. Keys are created by Sakala, encrypted, redacted from
  logs, and rotatable like a database password, with an automatic redeploy
  of attached projects.
- **Injected variables** use the names AWS SDKs and Laravel already read:
  `AWS_ENDPOINT_URL` (read by AWS SDKs, including JavaScript v3 and PHP)
  and `AWS_ENDPOINT` (read by Laravel's `s3` disk), `AWS_ACCESS_KEY_ID`,
  `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION`, `AWS_BUCKET`, and
  `AWS_USE_PATH_STYLE_ENDPOINT=true`. The JavaScript SDK reads the region
  from `AWS_REGION`, not `AWS_DEFAULT_REGION`, so injecting both is to be
  settled at implementation. As with databases, a project variable with the
  same name wins.
- **Endpoint.** One public HTTPS endpoint on the user-content domain, never
  on `sakala.dev` (ADR-016): `s3.sakala.app` in production and
  `s3.staging.sakala.app` on staging, path-style only, so no per-bucket
  subdomains or certificates are needed. The slug `s3` joins the reserved
  slugs. It is public because browsers must reach presigned URLs.
- **Private by default.** Buckets do not allow anonymous reads. Browsers get
  files through presigned URLs that the application creates.
- **Placement.** The pilot runs a RustFS instance on the runtime node, as the
  database pilot does, separate from the control plane's avatar store, so a
  tenant's load or abuse cannot reach control-plane data. Quotas are tight.
  The agent's disk guard marks the node degraded and refuses new builds under
  critical disk pressure, but it does not stop RustFS from filling the disk,
  so the sum of bucket quotas must stay below the node's free space. The
  instance moves to a dedicated storage or database VM when GMEDIA provides
  one (WP-14).
- **Deletion.** A bucket attached to a project cannot be deleted; it is
  detached first, as with databases. Whether objects are removed at once
  like a managed database, or after a purge window like projects (30 days),
  is to be aligned with ADR-020's deletion when the API is built.

### Consequences

- The runtime node carries a second stateful service during the pilot. A
  full disk or a node failure affects applications, databases, and buckets
  together.
- A public S3 endpoint is a new internet-facing surface on `sakala.app`; its
  abuse handling joins the process in PLATFORM_OPERATIONS.
- The boundary between tenants is the access key and its IAM policy, not the
  network.
- RustFS reached 1.0 two months before this ADR, so Sakala depends on a young
  release line; versions are pinned and upgraded deliberately, as for the
  control plane.
- Applications that follow the [File Storage guide](/docs/penyimpanan-file)
  with an external provider can move by changing variables, as long as the
  injected names stay as above.
- Storing user files is a new data category, so the privacy notice needs a
  new version (after `privasi-v2`) before buckets open to users.

### Open questions (owner: maintainer)

- **Bucket quota on the pinned version.** RustFS lists bucket quota as
  available, but whether it rejects writes at the limit on the version
  Sakala pins is not verified yet. Step 2 tests it, together with a key
  limited to one bucket by IAM policy and memory use at idle.
- **Public-read buckets and static website hosting.** A bucket policy can
  make a bucket public-read, but anonymous hosting under `sakala.app`
  invites malware and phishing and harms the domain's reputation (ADR-016).
  Not offered in v1.
- **Backup.** Recommended: a nightly encrypted copy of bucket contents off
  the host, kept 14 days, matching the roughly 14 days of backup the privacy
  notice (`privasi-v2`) states for other data. Not decided yet, and until it
  is, the user guide must say that objects have no backup.
- The concrete storage host per region, which depends on GMEDIA
  infrastructure.
- Whether self-host ships RustFS as an optional component in
  `gmedia/sakala`, off by default, as planned for managed databases.

### Plan

No dates; each step starts after the previous one.

1. Docs and a Console warning: the [File Storage guide](/docs/penyimpanan-file)
   and this ADR, then a Console notice that container files are temporary.
2. RustFS on staging, operated by hand: buckets, per-bucket keys, quotas,
   and the public endpoint, with the checks in the open questions.
3. API, agent, and Console integration: a workspace-scoped `buckets`
   resource with attachments, variable injection, key rotation, quotas in
   limit profiles, and a Console page next to Database.
4. A production pilot behind limit profiles, after the privacy notice update
   and the backup decision.

### Update 2026-11-23: phase 1 as built

Step 3 of the plan is merged but not released: the `managed-s3` role in
sakala-agent (#138), the `buckets` resource in sakala-api (#204), and the
Console's Bucket page, which is still in review. The status stays Proposed
until the first managed bucket serves a project. What changed against the
decision above:

- **Variable names.** Attached projects receive `AWS_ENDPOINT_URL_S3`,
  `AWS_ENDPOINT`, `AWS_USE_PATH_STYLE_ENDPOINT=true`, `AWS_DEFAULT_REGION`,
  `AWS_REGION`, `AWS_BUCKET`, `AWS_ACCESS_KEY_ID`, and
  `AWS_SECRET_ACCESS_KEY`. `AWS_ENDPOINT_URL` is **not** injected: current
  AWS SDKs read it as the endpoint for every AWS service, so an application
  that also calls SES or SQS with its own keys would send those calls to the
  bucket endpoint. `AWS_ENDPOINT_URL_S3` applies to S3 only. Both region
  names are injected, because the JavaScript SDK v3 reads only `AWS_REGION`.
  `FILESYSTEM_DISK` and `AWS_URL` are not injected; the Console suggests
  `FILESYSTEM_DISK=s3` for Laravel instead.
- **Quota.** RustFS 1.0.6 enforces a hard quota per bucket, so there is no
  size watcher and no lock at 100 %: uploads past the quota are refused,
  and the workspace is notified at 80 %. A workspace's limit profile holds
  `max_buckets` and `max_bucket_storage_mb`, and the sum of its bucket
  quotas stays within the latter. Two known gaps: RustFS answers the first
  write after a quota change with `503 SlowDown`, which SDKs retry, and it
  checks the quota when a multipart upload completes, not per part, so
  parts of an abandoned upload take space until RustFS discards them after
  about an hour.
- **Names and keys.** The S3 bucket name is random (`b-` and 20
  characters), never derived from user input, so presigned URLs reveal no
  workspace or project name. One RustFS user per bucket, whose only policy
  is read and write on that bucket. Rotation changes the secret and keeps
  the access key ID. While a rotation is in flight and the node has not
  confirmed which secret works, deployments of attached projects and the
  owner's credential view answer `409 BUCKET_KEY_ROTATING`.
- **Deletion.** Like a managed database: refused while attached, otherwise
  the objects, key, and policy are removed at once, and backups keep them
  for up to 14 days.
- **Backup.** Decided: a nightly `rc mirror` of each bucket, encrypted with
  age, 3 sets kept on the storage host and 14 pulled off-host. The pilot
  runs on one drive with no redundancy, so losing the node loses up to 24
  hours of objects; the [Managed Buckets](/docs/bucket-terkelola) user
  guide says so.
- **Abuse.** A Sakala admin can lock a bucket from the command line, which
  disables its key, so applications can no longer read or write and
  presigned URLs stop working. The endpoint's reverse proxy is planned to
  add `X-Content-Type-Options: nosniff` and `Content-Security-Policy:
sandbox`, so HTML served through a presigned URL cannot run scripts.
- **Not built yet.** CORS for direct browser uploads, a wizard card,
  bucket download for owners, and erasure-coded or multi-node storage.

The production pilot still waits for a privacy notice version that covers
bucket contents, a backup restore drill, and the pilot runbook.

## ADR-022 — Worker Processes and Scheduled Jobs for Projects

**Status:** Proposed (drafted 2026-11-24 for stage 1 of the roadmap; whether
workers and schedules belong to the free quota is still open; becomes
Accepted when a project runs a worker and a schedule in production)

### Context

A project on Sakala is one process: the `web` container, or several replicas
of it (ADR-019), behind the node's router. The Agent starts it with a restart
policy of `unless-stopped`, proves it answers HTTP before switching the route,
and puts it to sleep when nobody visits (ADR-015). A Laravel or Node
application that is more than a site also needs work outside a request: a
queue worker such as `php artisan queue:work`, and jobs on a timetable such
as a nightly report or a cleanup. Today users can only start the worker in
the background of the web container, where nobody sees it crash and it
competes with the web server for the same memory limit, or call a URL of
their app from an outside cron service, which wakes the project and is
bounded by a request timeout.

Most of the building blocks exist:

- **One image, several uses.** A deployment can reuse the live image without
  a build, and that reuse does not count against builds per hour. The release
  command already runs once per deployment as its own container of the new
  image, with the deployment's variables, project network, resources, gVisor
  runtime, and security options, and no route.
- **Recorded settings.** A rollback runs with the settings its target
  recorded in its `DeployProject` payload, on the target's image.
- **Quotas.** Every replica counts against the workspace's
  `max_active_containers` on deploy and on wake, and the Agent refuses work
  past `SAKALA_MAX_ACTIVE_CONTAINERS` on the node.
- **Protocol.** New behaviour ships inside protocol revision 4 behind a node
  capability, such as `replicas`, `release-command`, and `image-reuse`. A new
  command type also stays in revision 4 when the API only assigns it to nodes
  that advertise it, as the database and bucket commands do.

Two constraints shape the design. The production runtime node has 2 vCPU and
3,910 MB of RAM and also hosts the managed PostgreSQL pilot (memory limit
512 MB), with the bucket pilot (384 MB) planned from 7 December 2026; staging
has 2 vCPU and 1,962 MB for everything. And the Agent runs at most
`SAKALA_MAX_CONCURRENT_COMMANDS` commands at once (default 4), one at a time
per project, so a job that runs as an ordinary command for ten minutes would
hold back a deploy or restart of the same project.

### Options considered

Process model:

1. **Status quo: everything in the web container** (`&`, supervisord).
   Rejected: no logs or restart per process, no separate memory, and a dead
   worker never fails anything.
2. **Worker processes as extra containers of the same deployment**, from the
   same image with another command. This is the Procfile model: on Heroku,
   `web` is "the only process type that can receive external HTTP traffic",
   and other process types run next to it from the same build
   ([Heroku](https://devcenter.heroku.com/articles/procfile)).
3. **A worker as a separate project** on the same repository. Rejected:
   variables are copied by hand, each project builds its own image, and the
   two drift to different commits after a deploy.

Who triggers a scheduled job:

1. **The API scheduler** records each due run and sends the node a command
   that runs one container from the live image.
2. **A scheduler inside the Agent**, fed with the schedules of the projects on
   its node. It keeps firing while the API is down, but the schedule table
   and the run history must then be synchronised both ways, a project that
   moves between nodes can run twice or not at all, every node clock becomes
   a source of truth, and quotas and suspension would be enforced in two
   places.
3. **Crontab or a scheduler process inside a container**, such as
   supercronic or `php artisan schedule:work`. No history, no timeout, no
   failure notice, and it sleeps with the project. It remains possible as a
   worker command, but is not the platform mechanism.
4. **An outside service calling a URL** of the app. Wakes the project, is
   bounded by a request timeout, and needs a public endpoint guarded by a
   secret.

Idle sleep for a project with workers:

1. **Never sleep.** Simple, but every worker becomes permanent load on a node
   that only fits a handful of awake containers (see Capacity below).
2. **Sleep as one unit**: web and workers stop together under the existing
   rule (no HTTP request within the window) and start together on wake.
3. **Only the web process sleeps** while workers keep running. Saves little,
   and a sleeping project would still hold most of its slots.
4. **Wake on queue depth.** Needs Sakala to read the application's queue,
   which only becomes possible with a managed queue store such as the Valkey
   service planned next in the roadmap.

### Decision

Process option 2, trigger option 1, and sleep option 2.

#### Processes

- **A project has one `web` process and zero or more worker processes**, at
  most 5 definitions per project (configuration, not a quota). A worker has a
  name (lowercase letters, digits, and dashes, starting with a letter, up to
  30 characters; `web`, `release`, and `job` are reserved), a command (1 to
  1000 characters, no control characters, the rule for the start and release
  commands), a replica count from 0 to the workspace's `max_replicas` (0
  keeps the definition and runs nothing), and memory and CPU within the
  workspace's per-container caps, by default the project's.
- **Same image, same variables.** A deployment builds once. Every process
  starts from that image with `sh -c <command>`, as the release command does,
  with the same variables, project network, runtime, security options,
  resource limits, and egress filter. A worker has no route, no published
  port, and no HTTP check, and is never in the route table or the traffic
  report.
- **Changes apply from the next deployment**, as replicas do. A deployment
  that only changes processes reuses the live image: no build, and no build
  counted.
- **Deployment order.** Build, then the release command once, then the web
  and worker candidates. Web replicas pass the HTTP readiness check as today;
  a worker is ready when it is still running `SAKALA_WORKER_STARTUP_SECONDS`
  after it started (starting value 10 seconds). Then the route switches,
  which stays the commit point, and the old web and worker containers get
  `SIGTERM` and `SAKALA_WORKER_STOP_GRACE_SECONDS` (starting value 30 seconds)
  before `SIGKILL`. A worker that exits before the commit point fails the
  deployment with `worker_start_failed`, and the previous version keeps
  serving with its own workers. For a few seconds both versions can take
  queue jobs, so jobs, like migrations under a release command, must
  tolerate the previous version running next to the new one.
- **Restarts.** Workers keep `unless-stopped`. An exit with code 0 is
  expected (Laravel's `--max-time` and `--max-jobs` end a worker on purpose)
  and is not a crash. Other exits follow the existing crash-loop rule. A
  crashing worker is shown on its process and notified; it does not mark the
  project as crashed and does not touch the web route.
- **Identity.** Worker containers carry `dev.sakala.workload-kind=worker`
  (web keeps `web`) and `dev.sakala.process=<name>`. Everything that reads
  workloads for routing, readiness, traffic, or replica restore filters on
  the kind.
- **Logs.** Each log line carries the process it came from (`web`, a worker
  name, `release`, or `job`), and the Console filters by it. Each process has
  its own log byte budget, so a chatty worker cannot use up the budget the
  web process needs.
- **Lifecycle.** `RestartProject` restarts every process of the live
  deployment, `SleepProject` and `StopProject` stop all of them, and
  `WakeProject` starts all of them after the capacity check. The release
  command still never runs on these commands.
- **Rollback** runs the processes recorded by the target deployment, on the
  target's image, like its commands and port today. A worker added after the
  target does not run after the rollback; the Console says so before
  confirming.
- **Protocol.** Still revision 4. `DeployProject` gains an optional
  `processes` list. Nodes that can run it advertise `worker-processes`; the
  API sends the field and places a deployment with workers only on such a
  node, as it does for `release-command`. Heartbeat metrics and crash
  details gain an optional `process` key.

#### Scheduled jobs

- **A schedule belongs to a project** and has a name, a command (the same
  rule as above), a standard five-field cron expression, a timezone
  (default `Asia/Jakarta`, so the Console shows WIB; slots are computed and
  stored in UTC), a timeout (default 300 seconds, at most 600, the release
  command's node deadline), and an enabled flag. Expressions are parsed with
  `dragonmantank/cron-expression`, which Laravel's own scheduler already
  depends on.
- **The API is the only scheduler.** A Laravel scheduler command,
  `schedules:dispatch`, runs every minute on one server like the existing
  sweeps. For each due slot it records a run, unique per schedule and slot,
  and creates a `RunJob` command pinned to the node that serves the project.
  The payload carries the command and timeout, and copies the image
  identity, variables, and resources from the live deployment's
  `DeployProject` payload, so a run uses exactly what the live version runs.
- **The Agent runs a job** as one container of the live image with
  `sh -c <command>`, with the isolation of the release container, no route,
  and no restart. It carries `dev.sakala.role=job` and the project and
  deployment labels, so image GC keeps the image while it runs. Jobs use
  their own pool, `SAKALA_MAX_CONCURRENT_JOBS` (starting value 2), outside
  the per-project command queue, so a long job never delays a deploy or
  restart of the same project. Each job is admitted under the node's
  capacity guard as one container. Output goes to the existing logs endpoint
  of the command; completion reports `exit_code`, `duration_ms`, and
  `oom_killed`; failures are `job_failed`, `job_timeout`,
  `job_image_missing`, and the existing `runtime_capacity_exceeded` and
  `runtime_cancelled`. **Stop run** in the Console uses the existing
  `cancel_requested`. Nodes advertise `scheduled-jobs`, and because an older
  Agent fails to read a poll response that holds an unknown command type,
  the API only assigns `RunJob` to nodes that advertise it.
- **Timing.** A run starts within about a minute of its slot: the scheduler
  interval, the Agent's poll (3 seconds by default), and the container start.
  Schedules are for "about this time", not for the exact second.
- **At most once per slot.** A slot that has not started 10 minutes after
  its time (or within the interval, if that is shorter) is recorded as
  `missed` with the reason: API down, node offline, no live deployment, or
  no capacity. Missed slots are recorded once and never run late in a burst.
  When the Agent disappears during a run, the command lease expires and the
  run is recorded as `lost`; the Agent removes leftover job containers when
  it starts again. Nothing is retried automatically, so a job must be safe to
  skip and safe to run again by hand. Kubernetes gives CronJobs the same
  advice and the same `startingDeadlineSeconds` idea
  ([Kubernetes](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)).
- **No overlap.** When a slot comes while the previous run is still open,
  the new slot is recorded as `skipped` with reason `overlap`, as Railway
  does ([Railway](https://docs.railway.com/reference/cron-jobs)). Other
  policies can come later.
- **Workspace concurrency.** A workspace runs at most
  `max_concurrent_job_runs` jobs at once. A due run beyond that waits in the
  API until a run finishes or its deadline passes.
- **History and notice.** The last 100 runs of a schedule are kept with
  status, exit code, start, and duration; their logs follow
  `SAKALA_LOG_RETENTION_DAYS` (7 days). Project members are notified when a
  schedule starts failing and when it recovers, not on every failure. After
  10 consecutive failures the schedule is paused, with a notice. Both
  numbers are starting values.
- **Run now** starts a run by hand under the same rules and is recorded in
  the audit log.
- **Suspended and deleted projects.** `RunJob` is blocked for a suspended
  project like `DeployProject`. Deleting a project deletes its schedules and
  cancels open runs.

#### Idle sleep

- A project sleeps as one unit, web and workers, under the existing rule:
  no HTTP request within the workspace's window. A worker that is busy does
  not keep the project awake, because the Agent cannot see an application's
  queue. A workspace that needs workers running all the time gets a limit
  profile with `idle_sleep_minutes` set to 0.
- A scheduled run does not wake the project. It needs only the image, which
  a sleeping project keeps, so it runs while web and workers sleep and does
  not count as traffic. A job that only pushes work onto a queue waits for
  the next wake; the guide says to do the work in the scheduled command
  itself.

#### Quotas

- **Workers count as containers.** Each worker container counts against
  `max_active_containers` like a replica, on deploy and on wake. A worker
  does not add capacity beyond the workspace's existing container quota; it
  uses one of its slots.
- **Job runs do not count as containers**, because they are short. They are
  bounded per workspace by `max_concurrent_job_runs` and per node by
  `SAKALA_MAX_CONCURRENT_JOBS` and the node's capacity guard.
- **New limit profile fields**, empty meaning "follow the global setting",
  as for the existing fields: `max_worker_containers`, `max_schedules`
  (enabled schedules per workspace), `min_schedule_interval_minutes`, and
  `max_concurrent_job_runs`. An expression is refused when two of its next
  1,000 slots are closer than the minimum interval.
- **Hosted defaults wait for the maintainer** (see the open questions):

  | Field                           | Option A: small free quota | Option B: closed by default | Option C: workers free, schedules closed |
  | ------------------------------- | -------------------------- | --------------------------- | ---------------------------------------- |
  | `max_worker_containers`         | 1                          | 0                           | 1                                        |
  | `max_schedules`                 | 2                          | 0                           | 0                                        |
  | `min_schedule_interval_minutes` | 15                         | 15                          | 15                                       |
  | `max_concurrent_job_runs`       | 1                          | 0                           | 0                                        |

  Option A is recommended: a queue is a basic need of a Laravel app, a
  worker spends a container slot the workspace already has, and the
  arithmetic below keeps 15-minute schedules small on today's node.

#### Laravel and Node

- Project inspection reports process suggestions from a closed set, as it
  already suggests a release command. With `artisan` in the project: a
  worker `php artisan queue:work --sleep=3 --tries=3 --max-time=3600`; in a
  workspace that never sleeps, also a worker `php artisan schedule:work`;
  in one that sleeps, a schedule `php artisan schedule:run` at the
  workspace's minimum interval, with the note that Laravel only runs tasks
  due in that minute. With a `worker` script in `package.json`: a worker
  `npm run worker`. The Console fills its forms from these; commands stay
  free text.
- For hourly and daily presets the Console picks a random minute, so
  schedules do not all start at minute 0.

#### Capacity on the current node

These figures are estimates to be replaced by workload metrics from staging
before release.

| Item                                                         | Memory (MB) | Basis                                        |
| ------------------------------------------------------------ | ----------- | -------------------------------------------- |
| Runtime node RAM                                             | 3,910       | measured                                     |
| Managed PostgreSQL limit                                     | −512        | production setting                           |
| Bucket pilot limit (from 7 December)                         | −384        | production setting                           |
| Operating system, Docker, Agent, router                      | −500        | assumed                                      |
| One build at a time                                          | −1,024      | assumed                                      |
| Left for project containers                                  | 1,490       |                                              |
| Laravel web container, idle, including about 45 MB of gVisor | 200         | assumed; gVisor overhead measured in ADR-020 |
| Laravel queue worker, idle                                   | 110         | assumed                                      |

About 1,490 MB fits roughly four Laravel projects with one worker each
(310 MB a pair), or seven without, awake at the same time; with every
container at its 512 MB cap, only two. Containers are capped, not reserved,
so the node relies on idle sleep to keep most of them stopped. For jobs, by
Little's law, 40 schedules every 15 minutes with runs of about 20 seconds
average 40 / 15 × 20 / 60 ≈ 0.9 running jobs; the same 40 all at minute 0
with 2 job slots drain in 40 × 20 / 2 = 400 seconds, inside the 10-minute
start deadline. A 1-minute interval for the same 40 schedules would average
13 running jobs, which this node cannot hold; hence 15 minutes on the free
quota. CPU limits throttle instead of killing, but two busy workers at
1,000 millicores each already fill both vCPUs.

#### Security

Workers and jobs add no privilege. They run user code in the same gVisor
sandbox, with the same dropped capabilities, `no-new-privileges`, resource
limits, project network, and host egress filter as the web container, which
matches every project bridge network without a change. Their commands run
inside the user's own container, never on the node. Variables travel
encrypted in the command payload and are decrypted only for the pinned
node, and log lines pass the same redaction. The new exposure is compute
that runs without visitors: it is bounded by the container quota, CPU
limits, idle sleep, and the concurrency limits on jobs, and outgoing mail on
TCP 25 stays blocked.

### Consequences

- The runtime node runs more kinds of containers, and its health and crash
  reports need a process dimension. The Agent, the API's command and quota
  code, and the Console change together, so this work stays with
  maintainers.
- Every reader of workload labels in the Agent must learn the worker kind.
  An Agent rolled back to a release without `worker-processes` must not meet
  worker containers: projects with workers are redeployed without them, or
  stopped, before such a rollback.
- Scheduled jobs depend on the API. While the API is down, running projects
  keep serving and running jobs finish, but no new run starts, and slots
  past their deadline are recorded as missed.
- Users get at-most-once runs and a start within about a minute, which suits
  reports, cleanups, and reminders, not tasks that need the exact second.
- Rollback and sleep keep their meaning: one deployment, one set of
  processes, one image.

### Open questions (owner: maintainer)

- **Workers and schedules on the free quota**: options A, B, or C above.
  Recommended: A.
- **Projects without a web process**, such as a chat bot that only polls.
  They would never receive the traffic that keeps a project awake, and they
  are the easiest shape for abuse. Not in v1.
- **A schedule that wakes the project first**, for jobs that only dispatch
  to a queue. Deferred until users ask for it.
- **A lower minimum interval** for paid or partner workspaces, decided with
  billing (stage 4 of the roadmap).

### Plan

No dates; each step starts after the previous one.

1. Agent: the `processes` payload and worker containers, the `RunJob` command
   with its own pool, process labels and log tagging, and the
   `worker-processes` and `scheduled-jobs` capabilities.
2. API: process definitions, schedules and runs, the dispatcher, quotas and
   profile fields, and capability-aware placement.
3. Console: "Proses" and "Jadwal" in project settings, logs per process, and
   run history.
4. Guides and a Laravel example with a queue and a schedule in
   `gmedia/sakala-examples`.
5. Staging, with memory measured per process to replace the estimates above,
   then production after stage 0 of the roadmap is closed.
