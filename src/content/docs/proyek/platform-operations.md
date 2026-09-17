---
title: "Platform Operations"
description: "The maintainer-facing Platform Console: health, failures, nodes, capacity, moderation, and product signals."
track: proyek
section: rencana
order: 12
lang: en
canonical: true
---

# Platform Operations

> Maintainer-facing product direction

## 1. Why "Platform Console"

A normal admin dashboard implies CRUD.

Sakala needs an operational surface that answers:

- Is the platform healthy?
- Which deployments are failing?
- Why are they failing?
- Which nodes are saturated?
- Are users getting to first deploy?
- What content needs moderation?
- Where is operator intervention required?

## 2. Main Areas

```text
Platform Overview
Users
Projects
Deployments
Runtime Nodes
Commands
Resources / Usage
Explore Moderation
Feedback
Announcements
Audit
Settings
```

## 3. Overview

Suggested metrics:

- active users;
- projects;
- deployments 24h/7d;
- deployment success rate;
- median deploy duration;
- queue depth;
- active workloads;
- runtime capacity;
- failed commands;
- first-deploy activation;
- feedback requiring attention.

## 4. Runtime Nodes

Node detail:

```text
Name
Status
Agent Version
Last Heartbeat
CPU
RAM
Disk
Active Workloads
Building
Queued
Failed 24h
Capabilities
Labels
Region future
```

Actions future:

```text
Drain
Resume
Remove
Upgrade
```

Avoid dangerous actions without confirmation/audit.

## 5. Deployment Failure Analytics

Classify failure:

```text
repository
dependency
build
startup
health_check
routing
resource
timeout
runtime_crash
unknown
```

Admin should see:

```text
Top failures
Affected stacks
Recent examples
Trend
```

This is product discovery data as much as operations data.

## 6. Product Validation

Track:

- onboarding complete;
- first project;
- first analyze;
- first deploy;
- first successful URL;
- redeploy;
- second project;
- requested feature categories.

Goal:

> Understand where Sakala stops helping.

## 7. Explore Moderation

Needed once Explore exists:

```text
Pending Templates
Needs Changes
Featured Candidates
Reported Projects
Collections
License / Source Concerns
```

Moderation should leave an audit trail and submitter feedback.

## 8. Announcements

Future:

- maintenance;
- incident;
- release;
- product announcement.

Avoid using notifications as marketing spam.

## 9. Audit

Audit sensitive actions:

- admin resource override;
- project delete;
- domain ownership change;
- node drain/remove;
- moderation decision;
- workspace role change;
- security setting change.

## 10. Principle

Platform Console is not a side admin panel.

It is the maintainer's instrument for keeping Sakala safe, understandable, and improvable.
