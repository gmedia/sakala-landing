---
title: Privacy Notice version 2 takes effect on November 30, 2026
description: A new version of the Privacy Notice covers managed databases and backup copies on a second server. It takes effect on November 30, 2026.
publishedAt: 2026-11-23
lang: en
---

Version `privasi-v2` of the [Privacy Notice](/en/privasi) takes effect on
November 30, 2026. Until then, `privasi-v1` still applies. The notice does not
ask for your consent, and you do not need to do anything. The notice is
written in Indonesian, and the Indonesian text is the one that governs.

What changes:

- A new section covers managed PostgreSQL databases. What a database holds is
  your data and your application users' data, and we process it only to run
  your project.
- Every managed database is backed up each night, encrypted, and the copies
  are kept for about 14 days. Restores are done by maintainers, never as a
  superuser.
- Deleting a database removes it from the database server right away, but its
  copies stay in the backups for about 14 days. A database is not deleted with
  a project. Databases in your personal workspace are deleted with your
  account.
- Only workspace owners and Sakala admins can reveal a database password, and
  every reveal is recorded. The host, port, database name, and user are
  visible to every workspace member.
- Backups of account and project data are now also copied, still encrypted,
  to a second server in the same data center.

We are also sending this summary to the email of every verified account.
Questions can go to [`privacy@sakala.dev`](mailto:privacy@sakala.dev).
