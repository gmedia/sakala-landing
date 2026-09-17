---
title: "Contributing to Sakala"
description: "Workflow, branch naming, commits, pull requests, and review expectations across the Sakala repositories."
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

## Security

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
