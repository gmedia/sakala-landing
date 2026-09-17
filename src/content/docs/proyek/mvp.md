---
title: "Sakala MVP"
description: "The strict engineering milestone: what must be built now, what is explicitly not required, and the exit gate."
track: proyek
section: arah
order: 4
lang: en
canonical: true
---

# Sakala MVP

> **Purpose:** strict engineering milestone  
> **Rule:** `PRD.md` describes Sakala. `MVP.md` limits what we build now.

## Core Validation Question

> Can a user bring a small Git project to a working public URL more easily than manually preparing a server?

Core journey:

```text
Authenticate
→ Onboard
→ Create Project
→ Analyze Repository
→ Configure
→ Deploy
→ Observe Progress
→ Read Logs
→ Open Public URL
→ Redeploy
```

## Must Have

### Identity

- GitHub OAuth;
- email auth path only if current backend issue explicitly includes it;
- authenticated Console session;
- account verification if required by chosen auth flow;
- current user;
- logout;
- onboarding.

Design coverage for auth/register/verification is already reported complete.

### Console

- dashboard;
- create project;
- project detail;
- variables/secrets;
- deployment detail;
- build logs;
- profile/settings/notifications may be implemented according to sprint priority, but design is ready.

### Project

- public GitHub repository;
- branch;
- project name/slug;
- generated domain;
- stack analysis;
- Dockerfile detection;
- Railpack detection;
- editable configuration.

### Deployment

- deployment record;
- states/events/logs;
- manual deploy;
- manual redeploy;
- one web workload;
- build;
- run;
- route;
- health check;
- success/failure.

### Agent

- identity/register;
- heartbeat;
- poll;
- claim;
- events;
- logs;
- complete;
- fail;
- runtime executor.

### Runtime

- Docker;
- Dockerfile build;
- Railpack fallback;
- resource limits;
- localhost workload port;
- Caddy route;
- health check;
- cleanup.

### Infrastructure

- Caddy host;
- Docker Engine;
- Agent systemd;
- API container;
- PostgreSQL;
- Valkey/Redis;
- static Landing/Console;
- wildcard runtime DNS.

## Not Required for MVP

Even if present in the global PRD:

- Templates;
- Showcase;
- Creator Profile;
- Collections;
- custom domain;
- managed PostgreSQL;
- Redis as user service;
- Object Storage;
- team/workspace;
- classroom;
- billing;
- preview deploy;
- rollback;
- sleep/wake;
- autoscale;
- multi-node;
- multi-region;
- Sakala Router;
- full CLI;
- self-host productization.

Design may explore some of these before MVP engineering is complete.

## Definition of Done

MVP is demonstrably complete when:

```text
Browser
→ Auth
→ Create Project
→ Repository analyzed
→ Deploy command created
→ Agent receives command
→ Source checked out
→ Image built
→ Container started
→ Route activated
→ Health passes
→ Console receives progress/logs
→ User opens *.run.sakala.dev
→ User performs redeploy
```

Additional acceptance:

- API does not access Docker socket;
- secrets do not leak in logs;
- resource limits enforced;
- failed deployment has useful failure reason;
- docs explain first deploy;
- setup can be reproduced from a clean environment with documented steps.

## MVP Success Signals

- successful first deploy;
- median time to first URL;
- failure distribution;
- percentage of users who can recover from a failed deploy;
- redeploy rate;
- second project rate;
- repeated use without maintainer intervention.

## Exit Gate

Do not declare MVP complete because UI screens exist.

MVP exits only when the **real end-to-end runtime path** works reliably enough for pilot users.
