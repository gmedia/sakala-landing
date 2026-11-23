---
title: Rollback, Restart, and a history that names who started each deployment
description: A project can now be taken back to an earlier version from the History tab and restarted without a build, and every deployment in a team workspace names who started it.
publishedAt: 2026-11-23T17:45:00+07:00
lang: en
---

Starting today, every row in the **Riwayat** (history) tab has a
**Kembalikan ke versi ini** (restore this version) menu. A rollback creates a
new deployment from the old version's commit and build settings, while
environment variables and databases stay as they are now, so a password or
secret you already replaced does not come back to life. The server keeps the
image of the serving version and of the one before it, so going back one
version usually needs no build. Older versions are rebuilt from their commit,
and the rollback dialog tells you which will happen.

After a rollback, auto-deploy is paused so the next push does not immediately
replace the restored version. Pushes during the pause are still recorded, and
**Nyalakan lagi auto-deploy** (turn auto-deploy back on) ends it.

The menu next to the **Redeploy** button now also holds **Restart**, which
starts the containers again without a build and without a new deployment. A
restart does not pick up variable changes that have not been applied yet; use
Redeploy for those.

The history is also easier to read: the deployment visitors get is marked
**Sedang melayani** (serving), and in a team workspace the trigger line names
the person, for example "Rani, push ke main". A rollback does not restore
database contents or files inside the container. Details are in
[Rollback and Restart](/en/docs/rollback-dan-restart).
