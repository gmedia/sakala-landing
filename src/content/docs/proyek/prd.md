---
title: "PRD: Sakala — Developer Platform"
description: "PRD global versi 5.0: problem space, pengguna, pilar, kemampuan jangka pendek dan panjang, NFR, dan metrik."
track: proyek
section: arah
order: 3
lang: id
canonical: true
---

# PRD: Sakala — Developer Platform

> **Version:** 5.0  
> **Status:** Global Product PRD  
> **Date:** 2026-08-15  
> **Tagline:** _Manifesting Code into Reality._  
> **License:** Apache License 2.0  
> **Project Stewardship:** Sakala Maintainers  
> **Founding Sponsor & Infrastructure Supporter:** PT Media Sarana Data / GMEDIA

## 1. Purpose

Dokumen ini mendefinisikan **Sakala sebagai produk secara utuh**.

PRD ini bukan daftar fitur satu sprint dan bukan checklist MVP. MVP didefinisikan terpisah di `MVP.md`.

Tujuan PRD:

- menjelaskan problem space;
- mendefinisikan users;
- memetakan product pillars;
- mendokumentasikan capability jangka pendek dan panjang;
- memberi UI/UX ruang mendesain di depan engineering;
- mencegah arsitektur terlalu sempit;
- mencegah product scope berubah menjadi kumpulan fitur tanpa arah.

## 2. Product Statement

Sakala adalah project deployment open-source yang membantu developer membawa source code dari repository menjadi aplikasi nyata yang dapat hidup, dibuka, digunakan, dibagikan, dipelajari, dan dikembangkan tanpa harus terlebih dahulu menguasai seluruh kompleksitas server dan infrastruktur.

Core value:

```text
Repository
→ Understand
→ Build
→ Deploy
→ Public URL
→ Observe
→ Improve
```

Extended value:

```text
Create
→ Manifest
→ Operate
→ Explore
→ Collaborate
→ Learn
→ Platform
```

## 3. Governance & Positioning

Formula resmi:

```text
Sakala = open-source project initiated by Sakala Maintainers
GMEDIA = founding sponsor + infrastructure supporter
```

Hindari:

```text
Sakala by GMEDIA
Produk GMEDIA
Platform tertutup milik GMEDIA
```

Sakala dapat tumbuh bersama sponsor, institusi, komunitas, dan contributor tanpa kehilangan stewardship open-source.

## 4. Users

### 4.1 Student

Goal:

- tugas dapat dibuka dosen;
- portfolio dapat dibagikan;
- belajar deployment tanpa membangun infra dari nol.

### 4.2 Beginner Developer

Goal:

- membawa project dari localhost ke internet;
- memahami error deployment;
- membangun kepercayaan diri software delivery.

### 4.3 Creator / Open-source Developer

Goal:

- showcase karya;
- membagikan live demo;
- membuat template;
- memberi starting point kepada developer lain.

### 4.4 Instructor / Mentor

Goal:

- memberi starter;
- melihat project peserta;
- membuka live app;
- memahami status deployment;
- review tanpa menyiapkan environment setiap project.

### 4.5 Community / Workshop Organizer

Goal:

- onboarding seragam;
- resource terkendali;
- project peserta mudah dibagikan.

### 4.6 Small Team

Goal:

- shared project;
- member access;
- domain;
- data service;
- environment;
- operational visibility.

### 4.7 Platform Maintainer

Goal:

- mengetahui health platform;
- melihat failure;
- mengelola runtime node;
- menjaga capacity;
- melakukan moderation;
- memahami adoption dan product signal.

### 4.8 Self-host Operator

Future goal:

- install Sakala;
- join runtime node;
- upgrade;
- backup;
- operate platform dengan friction rendah.

## 5. Product Principles

Canonical principles berada di `PHILOSOPHY.md`.

```text
Wujud
Purna
Sederhana
Terang
Tumbuh
Berbagi
Manusia
```

Rules:

- simple by default;
- transparent when needed;
- no unexplained magic;
- value before infrastructure ceremony;
- design may lead engineering;
- validate before scale;
- user outcome beats infrastructure sophistication.

## 6. Product Pillars

### 6.1 Create

Sakala harus dapat memulai project dari:

- Git repository;
- template;
- future example/remix source.

Template types:

- Official;
- Community;
- Education;
- Organization/Collection;
- Application;
- Starter;
- Example.

Future reusable entry point:

```text
Deploy to Sakala
```

### 6.2 Manifest

#### Repository Analysis

Sakala dapat:

- validate repository;
- detect stack;
- inspect common manifests;
- detect Dockerfile;
- use Railpack info;
- infer build/start hints;
- report confidence and editable result.

#### Build

Builder priority:

```text
1. User Dockerfile
2. Railpack
3. Manual configuration
```

#### Deployment

Deployment should support:

- queue;
- clone;
- analyze;
- prepare;
- build;
- start;
- route;
- health;
- success/failure;
- logs;
- redeploy.

Future:

- retry;
- cancel;
- rollback;
- compare;
- promotion.

#### Workload Types

Current:

```text
Web Service
```

Future model:

```text
Project
├── Web Service
├── Worker
├── Cron
└── Static Site
```

#### Environments

Future:

```text
Production
Preview
Development
```

Preview deployment can eventually map PR/branch to temporary runtime.

### 6.3 Operate

#### Variables & Secrets

Requirements:

- key/value configuration;
- secret masking;
- encrypted storage;
- redaction;
- controlled reveal;
- edit/delete;
- redeploy requirement communication.

Design coverage: **Wave 1 complete** inside Project Detail.

#### Domains

Current:

- generated `*.run.sakala.dev`.

Next:

- custom domain;
- ownership/DNS verification;
- TLS status;
- primary domain;
- alias;
- redirect;
- failure diagnostics.

#### Logs

Current:

- build logs;
- deployment detail logs.

Next:

- runtime logs;
- filter/search;
- stage filter;
- timestamps;
- download;
- retention indicator;
- deterministic failure explanation.

#### Health & Metrics

Current/near:

- health check;
- deployment success/fail.

Next:

- CPU;
- RAM;
- restart count;
- uptime/basic health history.

Future:

- alert;
- incident;
- advanced metrics/tracing.

#### Data Services

Future:

- PostgreSQL;
- Redis/Valkey;
- Object Storage;
- Queue/Worker integration.

Desired UX:

```text
Create Service
→ Credentials
→ Attach Project
→ Environment Injected
→ Application Ready
```

### 6.4 Explore

Explore is a core differentiator candidate.

```text
Explore
├── Projects
├── Templates
├── Creators
└── Collections
```

#### Showcase

Project owner may opt into public listing.

Visibility model:

```text
Unlisted
Public Showcase
```

Runtime public accessibility and Explore listing are separate concepts.

Public showcase metadata:

- title;
- description;
- creator;
- cover;
- stack;
- tags;
- category;
- repository/source;
- live URL;
- license;
- collection;
- template relation.

#### Creator Profile

Creator profile is portfolio-oriented, not social-network-oriented.

Show:

- identity;
- bio/role optional;
- public projects;
- templates;
- featured work;
- collection participation.

Do not make follower count a core success metric.

#### Templates

Template detail:

- title;
- description;
- author;
- repository;
- live demo;
- stack;
- required variables;
- required services;
- resources;
- license;
- verification;
- provenance/collection.

Actions:

```text
Use Template
Deploy
```

#### Collections

Generic primitive for:

- GMEDIA Internship;
- Sakala Official Templates;
- Campus Workshop;
- Community Picks;
- Hackathon;
- PKL Showcase.

Collection may contain:

- projects;
- templates;
- creators.

#### Project Lineage

Future metadata:

```text
derived_from_template
remixed_from_project
```

Purpose:

> karya melahirkan karya.

### 6.5 Collaborate

Future:

- personal workspace;
- organization workspace;
- members;
- roles;
- invite;
- project ownership;
- transfer;
- activity;
- audit;
- organization collections/templates.

Keep role model simple initially:

```text
Owner
Maintainer
Developer
Viewer
```

### 6.6 Learn

Sakala Learn / Classroom is future product capability.

Boundary:

```text
Not an LMS.
```

Sakala does not aim to own:

- curriculum;
- attendance;
- quiz;
- exam;
- full grading system.

Sakala focuses on:

```text
Assignment
→ Source
→ Deploy
→ Live Application
→ Submission
→ Technical Review
```

Capabilities:

- classroom/workshop;
- mentor/instructor;
- participant;
- assignment;
- starter template;
- deployment status;
- live URL;
- repository;
- resource policy;
- deadline;
- collection/showcase output.

Internship/PKL is a workflow built from generic primitives, not a hardcoded separate product.

### 6.7 Platform

#### CLI

Future user CLI:

```bash
sakala login
sakala init
sakala deploy
sakala logs
sakala env set
sakala open
```

Future operator CLI:

```bash
sakala status
sakala doctor
sakala upgrade
sakala node join
sakala node list
sakala node drain
sakala node remove
```

#### Public API

Future:

- scoped API token;
- project API;
- deployment API;
- deploy hooks;
- external integration.

#### Self-hosting

Potential distribution repository:

```text
sakala
```

Purpose:

- installer;
- manifests;
- version pinning;
- self-host docs;
- CLI bootstrap;
- single-node setup;
- node join.

### 6.8 Operations

Maintainer-facing Platform Console:

- overview;
- users;
- projects;
- deployments;
- runtime nodes;
- capacity;
- command queue;
- failure analytics;
- resource violations;
- feedback;
- announcements;
- audit;
- template moderation;
- showcase moderation;
- product validation.

More detail in `PLATFORM_OPERATIONS.md`.

## 7. Identity & Authentication

Product supports or intends to support:

- GitHub OAuth;
- email registration;
- account verification;
- profile;
- settings;
- notification preferences.

### Current Design Coverage

Design is reported complete for:

- Login & Register;
- GitHub OAuth flow;
- account verification;
- profile;
- settings;
- notifications.

Engineering implementation remains independently prioritized.

### First-party Console Auth

```text
Sanctum SPA cookie/session
```

GitHub OAuth:

```text
Socialite
```

Machine auth:

```text
Bearer token / scoped token
```

JWT is not default first-party console auth.

## 8. Dashboard

Wave 1 design is complete.

Dashboard should provide:

- orientation;
- recent projects;
- recent deployments;
- health/status summary;
- quick create/deploy path;
- relevant notification/activity.

Future:

- usage summary;
- resource summary;
- personalized onboarding hint;
- education/team context.

## 9. Project

Project is a long-lived product object.

Project owns or references:

- identity;
- repository/source;
- deployment configuration;
- environment/secrets;
- domains;
- workload/service definitions;
- deployments;
- health;
- showcase metadata;
- future workspace;
- future managed services.

Project should not be modeled as merely "one Docker container forever".

## 10. Deployment

Deployment is an immutable or mostly immutable attempt to manifest a source revision into a running workload.

Record:

- source commit;
- branch/ref;
- trigger;
- actor;
- builder;
- runtime node;
- requested/applied resources;
- status;
- stage;
- logs/events;
- image;
- route;
- health result;
- timestamps;
- failure category.

Suggested states:

```text
queued
cloning
analyzing
preparing
building
starting
routing
health_checking
succeeded
failed
cancelled
```

## 11. Source Integration

Current/near:

- public GitHub repository;
- exact branch/ref;
- GitHub OAuth identity.

Next:

- webhook auto-redeploy;
- GitHub App;
- private repositories;
- repository picker;
- branch deploy settings.

Future:

- preview deployment;
- GitLab;
- other Git providers based on demand.

Private GitHub repository should use GitHub App short-lived installation tokens rather than long-lived user PATs.

## 12. Notifications

Design coverage: Wave 1 complete.

Potential event categories:

- deployment success;
- deployment failure;
- project issue;
- account/security;
- collaboration;
- platform announcement.

Delivery:

- in-app first;
- email later when useful;
- external integration later.

## 13. Admin & Moderation

Admin is not generic CRUD.

It is a platform operations surface.

Moderation grows naturally with Explore:

- template submission;
- featured candidate;
- reported showcase;
- collection review;
- abuse.

See `PLATFORM_OPERATIONS.md`.

## 14. Design / Engineering Decoupling

States:

```text
Design:
Not Started
In Design
Design Ready
Validated

Engineering:
Backlog
Ready
In Progress
Review
Implemented
Deferred
```

Rule:

> **Design Ready does not equal Engineering Committed.**

UI/UX may move ahead while developers implement earlier capabilities.

## 15. Current Design Baseline

Reported complete:

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

Next recommended design focus:

```text
Explore & Ecosystem
→ Showcase
→ Templates
→ Creator
→ Collections
```

Then:

```text
Domain Management
→ Platform Operations Console
→ Collaboration / Education
```

Detailed sequence lives in `DESIGN_STRATEGY.md`.

## 16. Non-Functional Requirements

### Security

- API must never directly access Docker socket;
- agent token hashed at rest;
- secrets encrypted;
- logs redact secrets;
- webhook signatures verified;
- repository credentials short-lived;
- policies enforce ownership;
- resource limits enforced;
- destructive action confirmed;
- privileged runtime operations isolated in Agent.

### Reliability

- deployment lifecycle recoverable;
- agent reconnect safe;
- idempotent command handling;
- bounded retry;
- timeouts;
- failed deploy should preserve previous healthy runtime where strategy allows;
- routing validates before activation.

### Accessibility

- keyboard operation;
- semantic forms;
- visible focus;
- adequate contrast;
- status not represented by color alone;
- understandable errors.

### Maintainability

- repo boundaries explicit;
- API contract documented;
- architecture decisions recorded;
- critical flow tested;
- docs updated alongside behavioral change.

## 17. Success Metrics

### Activation

- first login;
- onboarding complete;
- first project;
- first repository analyzed;
- first successful deployment;
- time to first public URL.

### Retention

- redeploy;
- second deployment;
- second project;
- return to dashboard.

### Product Quality

- deployment success rate;
- failure reasons;
- recovery rate;
- median deploy time;
- log usefulness;
- support intervention required.

### Explore

Future:

- public showcases;
- template uses;
- template-derived projects;
- creator publication;
- collection engagement.

Avoid follower-style vanity metrics as primary signals.

### Learn

Future:

- assignment deployment completion;
- instructor review flow completion;
- repeat workshop/class use;
- student project showcase/template progression.

## 18. Explicit Boundaries

Sakala is not trying to become:

- LMS;
- domain registrar;
- social network;
- full observability suite;
- hyperscale cloud;
- Kubernetes UI;
- AI-first cloud brand;
- generic VPS management panel.

Sakala may integrate with these domains only where they support its core journey.

## 19. Product North Star

```text
Code
↓
Wujud
↓
Berjalan
↓
Dibagikan
↓
Dipelajari
↓
Dikembangkan
↓
Melahirkan karya baru
```

That is Sakala.
