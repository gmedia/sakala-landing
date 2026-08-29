---
title: Glossary
description: The domain terms Sakala uses consistently across the console, API, agent, and documentation.
track: referensi
section: Reference
order: 1
lang: en
---

# Glossary

Consistent language prevents accidental architecture. The terms on this page carry the same meaning across the console, API, agent, and documentation.

## Product objects

**Project** — A long-lived product object owned by a user. It holds source configuration, deployments, variables and secrets, domains, and future services.

**Source or repository** — The Git source connected to a project.

**Project analysis** — Inspection of the source to determine stack, build, and runtime hints.

**Deployment** — One attempt to manifest a source revision into a running workload. A project may have many deployments.

**Active deployment** — The deployment currently serving the project or environment.

**Workload or service** — A runnable unit. Currently a web service; workers, cron, and static sites are the next direction.

**Environment** — A separate context such as production, preview, and development. Not available yet.

## Configuration

**Variable** — Non-secret runtime configuration.

**Secret** — Sensitive configuration requiring encryption and redaction in logs.

**Resource policy** — CPU, memory, and other limits requested and enforced, decided by the API.

**Hard safety limit** — A node-local maximum the Agent will not exceed, whatever the control plane requests.

## Domains

**Generated domain** — The Sakala-provided hostname following `<slug>.run.sakala.dev`.

**Custom domain** — A domain the user owns, mapped to a Sakala workload. Not available yet.

## Runtime

**Control plane** — `sakala-api` and its responsibilities for state, policy, and orchestration.

**Data plane or runtime** — The infrastructure that executes builds and workloads.

**Agent node** — A registered Sakala Agent identity.

**Runtime node** — A host capable of running user workloads through the Sakala Agent.

**Gateway node** — A host responsible for public ingress and routing. Future direction.

**AgentCommand** — A control plane instruction claimed and executed by an Agent.

**Builder** — The mechanism that turns source into a runnable image. The order is Dockerfile, then Railpack, then manual configuration.

**Railpack** — The automatic build-plan system Sakala uses when a repository provides no Dockerfile.

**Caddy route** — The MVP configuration mapping a runtime hostname to a local upstream.

## Ecosystem

**Template** — A reusable project starting point. Future direction.

**Showcase** — A public presentation of a project or living application. Future direction.

**Creator** — The person or organisation attributed to a piece of work.

**Collection** — A curated grouping of projects, templates, or creators.

**Explore** — The public discovery layer holding Projects, Templates, Creators, and Collections.

## Collaboration and learning

**Workspace** — The ownership and collaboration boundary holding projects and members.

**Classroom or programme** — A future Learn capability for assignment and deployment flow. Not an LMS.

**Assignment** — The definition of a software-delivery task, optionally tied to a template and a resource policy.

## Process

**Design Ready** — The UX is defined enough for handoff and review. It does not mean engineering has committed to building it.

**Engineering Committed** — The feature has been explicitly prioritised for implementation.

**MVP** — A strict validation milestone, not the complete definition of Sakala.

**Platform Console** — The maintainer-facing operational surface, not an ordinary CRUD admin panel.

**Sakala Distribution** — The future installer and self-hosting layer.

**CLI** — A future command-line interface for humans and operators. Distinct from the Agent.
