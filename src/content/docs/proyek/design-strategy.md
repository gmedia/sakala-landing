---
title: "Design Strategy"
description: "Current design coverage, the Explore wave, domain management, platform operations, and the handoff standard."
track: proyek
section: rencana
order: 9
lang: en
canonical: true
---

# Design Strategy

> Product design may lead engineering. Design is not a hidden engineering commitment.

## Design Source

Current primary design workspace:

```text
Sakala Design System — Figma (team access)
```

This document records product-level design direction, not pixel-level Figma specification.

## 1. Current Coverage

Wave 1 is reported complete:

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

UI/UX no longer needs to wait for engineering to finish those screens before exploring the next product horizon.

## 2. Next Focus — Sakala Explore

Why Explore first:

- differentiates Sakala from generic PaaS dashboards;
- connects philosophy, open source, portfolio, internship, and education;
- can be explored without waiting for runtime implementation;
- creates a richer reason for Sakala to exist beyond "deploy without VPS".

Required explorations:

```text
Explore Home
Project Showcase List
Project Showcase Detail
Template List
Template Detail
Creator Profile
Collection Detail
Publish to Showcase
Submit as Template
Template Review State
Featured State
Rejected / Needs Changes State
```

## 3. Explore UX Questions

Design should answer:

- What makes a public project worth opening?
- How do we show creator attribution without becoming a social network?
- What is the difference between `Deploy` and `Use Template`?
- How does a project become a template?
- How does a collection communicate context such as internship or workshop?
- How does a creator opt out of public listing?
- How do we show source, live app, stack, license, and provenance clearly?
- What moderation state is visible to submitter?
- How does a template explain required env/services before deploy?

## 4. Wave 3 — Domain Management

Screens/states:

```text
Generated Domain
Custom Domain
Add Domain
DNS Instructions
Pending Verification
Verified
TLS Provisioning
Active
Failure
Primary Domain
Alias
Redirect
Remove Domain
```

Design principle:

> DNS complexity should be explained, not dumped on the user.

A domain status can conceptually show:

```text
DNS    ✓
TLS    ✓
Route  ✓
App    ✓
```

## 5. Wave 4 — Platform Operations

See `PLATFORM_OPERATIONS.md`.

Prioritize:

- overview;
- nodes;
- deployments;
- failure analytics;
- moderation;
- feedback.

Avoid generic CRUD admin template.

## 6. Wave 5 — Collaboration & Learn

Explore:

- workspace;
- member invite;
- role;
- classroom;
- assignment;
- participant project;
- mentor/instructor dashboard;
- showcase handoff.

Boundary:

```text
Learn ≠ LMS
```

## 7. Design Handoff Standard

Every implementation-ready feature should provide:

- target user;
- user goal;
- route/context;
- normal state;
- empty state;
- loading state;
- error state;
- partial failure;
- permission denied;
- destructive confirmation;
- responsive behavior;
- required data;
- required actions;
- copy;
- interaction/prototype notes.

## 8. Product UI Principles

### Friendly but not childish

Explain complexity using clear language.

### Developer-oriented but not intimidating

Use technical detail progressively.

### Status is a first-class UI element

Deployment, health, DNS, verification, and moderation must be readable.

### Logs are tools, not decoration

Terminal/log UI must prioritize searchability and error comprehension.

### Accessibility

- keyboard;
- visible focus;
- contrast;
- semantic labels;
- status not only color.

### Identity

Avoid generic SaaS admin appearance where possible.

Sakala should feel like:

```text
a place where projects become real
```

not merely:

```text
a database admin dashboard
```
