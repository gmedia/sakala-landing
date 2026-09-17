---
title: "Sakala Roadmap"
description: "Product horizons A–F, engineering phases 0–8, design waves 1–6, validation gates, and the anti-roadmap."
track: proyek
section: rencana
order: 8
lang: en
canonical: true
---

# Sakala Roadmap

> Roadmap is directional, not a promise of dates.

Sakala uses three parallel views:

```text
Product Roadmap
Design Roadmap
Engineering Roadmap
```

They are related but not synchronized one-to-one.

## 1. Product Roadmap

### Horizon A — Manifestation

```text
Repository
→ Deploy
→ Public URL
```

Capabilities:

- identity/auth;
- onboarding;
- project;
- repository analysis;
- build;
- deploy;
- logs;
- variables/secrets;
- generated domain;
- health;
- redeploy.

### Horizon B — Reliable Operation

- custom domain;
- deployment recovery;
- runtime logs;
- metrics;
- webhook auto-deploy;
- private repository;
- usage/resource visibility.

### Horizon C — Explore & Ecosystem

- showcase;
- creator profile;
- templates;
- collections;
- template submission;
- featured;
- project lineage;
- Deploy to Sakala.

### Horizon D — Collaboration & Learn

- workspace;
- members;
- roles;
- collections by organization;
- classroom;
- assignment;
- internship/workshop workflow.

### Horizon E — Developer Services

- managed PostgreSQL;
- Redis/Valkey;
- Object Storage;
- worker/queue;
- backup/restore;
- richer observability.

### Horizon F — Platformization

- CLI;
- public API;
- self-host installer;
- node join/drain/upgrade;
- multi-node runtime;
- gateway/router.

## 2. Engineering Roadmap

### Phase 0 — Foundation

- repositories split;
- basic CI;
- branch protection;
- design system foundation;
- API/Agent architecture.

### Phase 1 — Auth & Console Foundation

- auth contract;
- GitHub OAuth;
- email auth if committed;
- verification if committed;
- session;
- onboarding;
- dashboard integration.

### Phase 2 — Project Lifecycle

- project CRUD;
- repo validation;
- stack analysis;
- generated domain;
- variables/secrets;
- project detail API integration.

### Phase 3 — Deployment Contract

- deployment model;
- events/logs;
- state machine;
- realtime;
- deployment detail integration.

### Phase 4 — Connected Agent

- register/identity;
- heartbeat;
- poll;
- claim;
- events/logs;
- complete/fail;
- auth/idempotency.

### Phase 5 — Real Runtime

- checkout;
- Dockerfile;
- Railpack;
- container;
- limits;
- Caddy;
- health;
- logs;
- cleanup.

### Phase 6 — End-to-End MVP

```text
Browser
→ API
→ Agent
→ Runtime
→ Public URL
```

### Phase 7 — Pilot Hardening

- failure categories;
- documentation;
- safeguards;
- validation metrics;
- operational tooling minimum.

### Phase 8 — Post-MVP Selection

Choose based on real signal:

- custom domain;
- webhook;
- GitHub App/private repo;
- rollback;
- Explore;
- workspace;
- self-hosting;
- managed database.

## 3. Design Roadmap

### Wave 1 — Core Product Journey

**Status: DONE / Design Ready**

```text
Login & Register
GitHub OAuth
Account Verification
Onboarding
Dashboard
Create Project
Deployment Detail
Build Logs
Project Detail
Variables / Secrets
Profile
Settings
Notifications
```

### Wave 2 — Explore & Ecosystem

**Recommended next**

- Explore home;
- showcase listing;
- showcase detail;
- template listing;
- template detail;
- Use Template / Deploy;
- creator profile;
- collection detail;
- publish to showcase;
- submit as template;
- moderation/review states.

### Wave 3 — Domains & Operation

- generated domain management;
- custom domain;
- DNS instruction;
- verification;
- TLS;
- alias/redirect;
- runtime health;
- richer log/error states.

### Wave 4 — Platform Operations Console

- platform overview;
- users/projects/deployments;
- node health;
- capacity;
- failure analytics;
- moderation;
- feedback;
- announcements.

### Wave 5 — Collaboration & Learn

- workspace;
- members;
- invite;
- role;
- classroom;
- assignment;
- internship/workshop;
- instructor/mentor overview.

### Wave 6 — Managed Services

- PostgreSQL;
- Redis/Valkey;
- Object Storage;
- worker/queue;
- usage;
- service credentials/attachment.

## 4. Validation Gates

A new engineering horizon should not start only because its design is complete.

Consider:

```text
User Demand
+
Product Leverage
+
Engineering Cost
+
Operational Cost
+
Architecture Readiness
```

Examples:

- Explore can be designed early because it has low dependency on runtime internals and high identity value.
- Managed PostgreSQL should wait for operational model, backup/security expectations, cost, and strong demand.
- Multi-region should wait until real one-region/multi-node constraints are observed.

## 5. Anti-Roadmap

Do not prioritize by:

- feature parity checklist;
- competitor screenshot envy;
- technology excitement;
- "would be cool";
- UI completion alone.

Prioritize by:

> Does this strengthen Sakala's core journey and validated user need?
