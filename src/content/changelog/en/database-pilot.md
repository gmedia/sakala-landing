---
title: Limited pilot of managed PostgreSQL databases
description: Workspace-owned PostgreSQL databases, attached to projects with DATABASE_URL and DB_* from Sakala, are now being tested on sakala.dev for a few workspaces only.
publishedAt: 2026-11-23
lang: en
---

From today, managed PostgreSQL databases run on `sakala.dev` as a limited
pilot. A database belongs to a workspace, can be attached to one or several
projects, and Sakala fills in `DATABASE_URL` and the `DB_*` variables in your
application at deploy time. Migrations run through the release command, the
password can be changed with an automatic redeploy of attached projects, and
every database is backed up each night.

The pilot is deliberately small. The default database quota of every
workspace is 0, and databases are open only to a few workspaces that an admin
has given a quota. During the pilot the database server runs on the same
machine as the applications, there is no uptime guarantee, and restoring from
a backup is done by a maintainer, not from the Console yet.

If your workspace cannot create a database yet, external databases remain the
supported way. How it works and its limits are in
[Managed Databases](/en/docs/database-terkelola).
