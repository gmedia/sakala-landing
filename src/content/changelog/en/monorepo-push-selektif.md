---
title: A push to a monorepo deploys only the projects it changes
description: In a repository with several Sakala projects, a push now deploys only the projects whose folder changed, and JavaScript workspaces are recognised during analysis.
publishedAt: 2026-11-19
lang: en
---

When one repository is used by several Sakala projects, for example `apps/web`
and `apps/api`, a push now deploys only the projects whose **Root directory**
holds a changed file. If the change is a shared file outside every project's
folder, such as a lockfile, every project still deploys. A skipped push shows
up in the **Riwayat** (history) tab as a **Dilewati** (skipped) row, so you
still know why there is no new deployment. A manual redeploy always runs.

Repository analysis also recognises JavaScript workspaces (pnpm, npm, Yarn,
and Bun). Set Root directory to the package's folder, and Sakala builds from
the workspace root with its lockfile. See
[Deploying a Monorepo](/en/docs/monorepo).
