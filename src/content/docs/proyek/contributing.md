---
title: "Contributing to Sakala"
description: "How to contribute across the Sakala repositories: workflow, branches, commits, pull requests, architecture and canonical-document changes, AI-assisted work, security, and conduct."
track: proyek
section: kerjasama
order: 14
lang: en
canonical: true
---

# Contributing to Sakala

Thank you for helping Sakala turn code into something real.

## Workflow

Internal contributors:

```text
Issue
→ Branch
→ Commit
→ Pull Request
→ Review
→ CI
→ Squash Merge
```

External contributors:

```text
Fork
→ Branch
→ Pull Request
```

No direct push to `main`.

## Branch Naming

```text
feature/*
fix/*
docs/*
chore/*
refactor/*
```

## Commits

Prefer Conventional Commits:

```text
feat(projects): add project analysis endpoint
fix(agent): reject invalid resource limits
docs(runtime): explain caddy route lifecycle
```

## Pull Requests

A good PR should explain:

- problem;
- solution;
- scope;
- test/evidence;
- screenshots for UI;
- logs for runtime changes;
- migration/API contract changes;
- risks;
- follow-up if intentionally incomplete.

Keep PRs focused.

## Architecture Changes

Changes affecting these require explicit discussion:

- Console/API boundary;
- Agent privilege boundary;
- auth architecture;
- Docker socket access;
- API-agent protocol;
- resource ownership;
- routing model;
- repository topology.

Update `ADR.md` when appropriate.

## AI-assisted Development

AI may help:

- explain;
- brainstorm;
- review;
- generate test ideas;
- draft boilerplate.

Contributor still owns:

- understanding;
- correctness;
- security;
- test;
- PR explanation.

Do not submit large generated changes you cannot explain.

## Canonical Documents

The project documents on this site's `proyek` track are decisions, not notes.

- Propose a change through a pull request to `sakala-landing`, under
  `src/content/docs/proyek/`. Maintainers review it (CODEOWNERS).
- A change to an architecture boundary is a new ADR, not only an edited
  sentence in ARCHITECTURE.
- Language: system and community documents (ARCHITECTURE, ADR, SECURITY,
  PLATFORM_OPERATIONS, GOVERNANCE, CONTRIBUTING, GLOSSARY) are written in
  English; product-direction documents (PHILOSOPHY, VISION, PRD, MVP, ROADMAP,
  DESIGN_STRATEGY, FEATURE_EDUCATION, FEATURE_EXPLORE) are written in
  Indonesian. Do not mix languages inside one document.
- A list that already has an owner (product pillars in VISION, deployment
  states and failure categories in GLOSSARY) is linked, not copied.

## Repositories

```text
sakala-landing      site and canonical documents
sakala-console      console
sakala-api          control plane
sakala-agent        runtime executor
sakala-infra        runtime reference
```

Each repository has its own `CONTRIBUTING.md` for local setup; this page sets
the rules they share.

## Security

Report vulnerabilities privately through GitHub private vulnerability
reporting on the affected repository, never in a public issue. See
[Security §14](/docs/proyek/security).

Never commit:

```text
.env
password
API token
private key
GitHub App secret
agent token
database credential
```

Follow `SECURITY.md`.

## Documentation

A behavioral or architectural change is incomplete if documentation becomes misleading.

Update the relevant docs with the code.

## Conduct

Every repository carries `CODE_OF_CONDUCT.md`, and it applies wherever people
act on behalf of Sakala. See [Governance §10](/docs/proyek/governance).
