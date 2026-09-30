---
title: "Glossary"
description: "The shared domain language and the canonical lists: deployment states, stage names, failure categories, runtime states, quotas, and the terms used by the product, the runtime, Learn, and Explore."
track: proyek
section: kerjasama
order: 15
lang: en
canonical: true
---

# Glossary

Consistent language prevents accidental architecture. This page also owns the
canonical lists that other documents, the Console, and the site refer to. When
code and this page disagree, the code is checked first; if the code is right,
this page is corrected.

## Canonical lists

### Deployment states

Source: `DeploymentStatus` in `sakala-api`.

```text
queued → cloning → analyzing → building → deploying → routing → health_checking
       → succeeded | failed | cancelled
```

### Stage names shown to users

Five named stages, grouped from the states above. Each interface uses one
language throughout.

| State(s)               | Indonesian            | English            |
| ---------------------- | --------------------- | ------------------ |
| `queued`, `cloning`    | Mengambil repository  | Cloning repository |
| `analyzing`            | Membaca proyek        | Analyzing project  |
| `building`             | Membangun image       | Building image     |
| `deploying`, `routing` | Menjalankan container | Starting container |
| `health_checking`      | Memeriksa kesehatan   | Checking health    |

Stage status words: `selesai / done`, `sedang berjalan / running`,
`menunggu / pending`, `gagal / failed`.

### Failure categories

Source: `DeploymentFailureCategory` in `sakala-api`.

```text
checkout · build · start · health · route · timeout · resource · node
scheduling · unknown
```

### Runtime states of a project

Source: `RuntimeStatus` in `sakala-api`.

```text
not_deployed · deploying · running · stopped · failed · crashed
```

### Project states

Source: `ProjectStatus` in `sakala-api`.

```text
draft · active · failed · suspended
```

### Capability status (product documents)

```text
berjalan / running · dibangun / building · dirancang / designed · arah / direction
```

### Public status (site)

```text
available · building · testing · next · direction · unavailable
```

## Product

**Project.** A long-lived product object. Owns source configuration,
deployments, variables and secrets, domains, and future services.

**Source / Repository.** The Git source connected to a project. Public GitHub
repositories today; private ones through a GitHub App.

**Project Analysis.** Inspection of the source to determine stack, build,
start, and port hints, shown to the user before building.

**Deployment.** One attempt to manifest a source revision into a running
workload. A project has many deployments.

**Active Deployment.** The deployment currently serving the project.

**Workload / Service.** A runnable unit. Current: Web Service. Future: Worker,
Cron, Static Site.

**Environment.** Future isolated context such as Production, Preview, or
Development, with its own deployment, configuration, and domain.

**Variable.** Non-secret runtime configuration.

**Secret.** Sensitive configuration, encrypted at rest and redacted from logs.

**Generated Domain.** The Sakala-provided hostname `<slug>.run.sakala.dev`.
Some slugs are reserved (`api`, `app`, `admin`, `status`, and others). See
ADR-016 for the proposed separate domain.

**Custom Domain.** A user-owned domain mapped to a workload.

## Hosting and policy

**Hosted.** Sakala run on infrastructure provided by GMEDIA, with a published
free quota. Capacity above the quota is GMEDIA's cloud service (ADR-017).

**Self-host.** Sakala run by an institution or individual on its own servers,
with its own quota. Same code and licence as hosted.

**Quota.** Product-level limit set by the API: projects per user, active
deployments, and per-container memory, CPU, and PIDs. Hosted defaults are in
PRD §9.2.

**Resource Policy.** The requested and effective CPU, memory, and similar
limits decided by the API for a deployment.

**Hard Safety Limit.** A node-local maximum the agent will not exceed,
regardless of the requested policy.

**Sleep.** Stopping an idle workload while keeping its configuration, to be
woken on the next request (ADR-015). Expected behaviour, not a failure.

**Stop.** An admin or owner action that stops a project's workload.

**Suspend.** An admin action that stops a project and prevents it from
serving, with a recorded reason and an appeal path. Used for abuse.

**Abuse Report.** A report that a hosted project is used for phishing,
malware, mining, spam, or other prohibited use. Handled by the process in
PLATFORM_OPERATIONS §6.

**Usage Signal.** A recorded event used for product validation and abuse
detection: deployment attempt, successful deployment, active projects,
rejected limits, agent failure, repeated build failure, manual intervention.

## Learn

**Class / Program.** A group of instructors and participants working on
assignments. Not an LMS.

**Assignment.** A software-delivery task, optionally with a starter template,
a deadline, a deployment requirement, and a resource policy.

**Roster.** The list of participants in a class, added by invitation link or
CSV, and later LTI.

**Submission.** The project version a participant hands in; can be locked by
the instructor after the deadline.

## Explore

**Template.** A reusable starting point designed for deployment or code
reuse.

**Showcase.** A publicly discoverable presentation of a project, opted into by
its owner.

**Creator.** A person or organization attributed to projects and templates.

**Collection.** A curated group of projects, templates, and creators, for
example an internship cohort or a workshop.

**Lineage.** The recorded relationship between a project and the template or
project it was derived from.

**Explore.** The public discovery layer of projects, templates, creators, and
collections.

## Collaboration

**Workspace.** An ownership and collaboration boundary containing projects
and members.

## System

**Control Plane.** `sakala-api` and its state, policy, and orchestration
responsibilities.

**Data Plane / Runtime.** Infrastructure that executes builds and workloads.

**App Node.** The host that runs the control plane: API, database, cache,
object storage, Console, and Landing.

**Runtime Node.** A host capable of running user workloads through the Sakala
Agent. ADR-014 requires it to be separate from the app node before public
registration.

**Gateway Node.** Future host responsible for public ingress and routing.

**Agent Node.** A registered Sakala Agent identity (`agent-<uuid7>`) with a
protocol revision and a status (ready, degraded, draining, drained,
maintenance).

**AgentCommand.** A control-plane instruction claimed and executed by an
agent under a lease.

**Lease.** The time an agent holds a claimed command before the control plane
treats it as abandoned.

**Runtime Class.** The container runtime used for user workloads (for example
`runsc` for gVisor). See ADR-014.

**Builder.** The mechanism that turns source into a runnable image. Priority:
Dockerfile, Railpack, manual.

**Railpack.** The automatic build-plan system Sakala uses when there is no
Dockerfile.

**Caddy Route.** The per-project hostname-to-upstream route file written by
the agent and served by the runtime Caddy.

**Release Pin.** The image digests a production release is made of. A release
is a reviewed change to the pins; a rollback is its revert.

**Platform Console.** The maintainer-facing operational surface.

**Sakala Distribution.** The future installer and self-host layer, possibly a
repository named `sakala`.

**CLI.** A future human and operator command-line interface. Not the agent.

## Process

**Design Ready.** The UX/UI has enough definition for handoff. Does not mean
engineering is committed.

**Engineering Committed.** A feature explicitly prioritized for
implementation.

**MVP.** The strict validation milestone in MVP.md, not the full definition of
Sakala.

**Public Pilot Gate.** The six conditions in MVP.md that must hold before
registration opens to everyone.

**ADR.** An Architecture Decision Record; a numbered, dated decision with its
status.
