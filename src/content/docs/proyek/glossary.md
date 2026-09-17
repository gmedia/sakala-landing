---
title: "Glossary"
description: "The shared domain language: project, deployment, workload, template, collection, control plane, agent node, and more."
track: proyek
section: kerjasama
order: 15
lang: en
canonical: true
---

# Glossary

Consistent language prevents accidental architecture.

## Project

Long-lived user product object.

Owns source configuration, deployments, variables/secrets, domains, and future services.

## Source / Repository

Git source connected to a Project.

## Project Analysis

Inspection of source to determine stack/build/runtime hints.

## Deployment

One attempt to manifest a source revision into a running workload.

A Project may have many Deployments.

## Active Deployment

Deployment currently serving the project/environment.

## Workload / Service

A runnable unit.

Current:

```text
Web Service
```

Future:

```text
Worker
Cron
Static Site
```

## Environment

Future isolated context such as:

```text
Production
Preview
Development
```

Contains its own deployment/config/domain relationship.

## Variable

Non-secret runtime configuration.

## Secret

Sensitive configuration requiring encryption/redaction.

## Generated Domain

Sakala-provided runtime hostname:

```text
<slug>.run.sakala.dev
```

## Custom Domain

User-owned domain mapped to a Sakala workload.

## Template

Reusable project starting point designed for deployment or code reuse.

## Showcase

Publicly discoverable presentation of a project/live application.

## Creator

Human or organization attributed to project/template work.

## Collection

Curated grouping of projects/templates/creators.

Examples: internship cohort, workshop, official starters.

## Explore

Public discovery layer containing Projects, Templates, Creators, and Collections.

## Workspace

Ownership/collaboration boundary containing projects and members.

## Classroom / Program

Future Learn capability for assignment/deployment workflow.

Not an LMS.

## Assignment

Definition of a software-delivery task, optionally connected to a Template and resource policy.

## Control Plane

`sakala-api` and its state/policy/orchestration responsibilities.

## Data Plane / Runtime

Infrastructure that executes builds and workloads.

## Agent Node

Registered Sakala Agent identity.

## Runtime Node

Host capable of running user workloads through Sakala Agent.

## Gateway Node

Future host responsible for public ingress/routing.

## AgentCommand

Control-plane instruction claimed/executed by an Agent.

## Resource Policy

Product-level requested/effective CPU/RAM/etc decided by API.

## Hard Safety Limit

Node-local maximum Agent will not exceed.

## Builder

Mechanism that turns source into runnable image.

Current priority:

```text
Dockerfile
Railpack
Manual
```

## Railpack

Automatic project build-plan system used by Sakala when appropriate.

## Caddy Route

MVP runtime hostname-to-local-upstream routing configuration.

## Platform Console

Maintainer-facing operational/admin product surface.

## Sakala Distribution

Future installer/self-hosting layer, potentially a repository named `sakala`.

## CLI

Future human/operator command-line interface. Not the Agent.

## Design Ready

UX/UI has enough definition for handoff/review.

Does not mean engineering is committed.

## Engineering Committed

Feature has been explicitly prioritized for implementation.

## MVP

Strict validation milestone defined in `MVP.md`, not the full definition of Sakala.
