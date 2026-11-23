---
title: Rollback and Restart
description: How to take a project back to an earlier version, restart its containers without a build, and read the History tab, including when Sakala needs a build and when it does not.
track: panduan
section: Deploy guides
order: 4.8
lang: en
---

# Rollback and Restart

If a new version of your application turns out to be broken, you can take it back to an earlier version from the **Riwayat** (history) tab, without touching your repository. If the application only needs to be started again, there is **Restart**, which creates no new deployment and builds nothing.

This page explains both, when Sakala reuses an image it already has, and what does not come back.

> **Status as of 23 November 2026.** Rollback and Restart need `sakala-api` v0.11.0, Console v0.12.0, and `sakala-agent` v0.16.1 or later. Hosted Sakala at `sakala.dev` already runs these versions.

## Choosing the right action

There are four ways to run a project again. An image here is the build result of your application, which Sakala uses to create containers.

- **Redeploy**, the button on the project page, deploys the latest commit with the current variables and settings. When the commit and build settings match the running version, the image is reused without a build. Use it after changing variables or settings.
- **Build ulang dari awal** (rebuild from scratch), in the menu next to **Redeploy**, works like Redeploy but always builds. Use it when the previous build result is broken.
- **Restart**, in the same menu, starts the running version's containers again, without a build and without a new deployment. Use it when the application hangs or crashed, but its code does not need to change.
- **Kembalikan ke versi ini** (restore this version), in the menu of every row in the **Riwayat** (history) tab, deploys the old version's commit and build settings with the current variables. Usually without a build, as long as that version's image is still stored. Use it when a new version is broken and you want the last one that worked.

The rules for when **Redeploy** reuses the image, including variables read at build time such as `VITE_*` and `NEXT_PUBLIC_*`, are in [Variables and Secrets](/en/docs/variabel-dan-secret#redeploy-without-a-build).

## Reading the History tab

The **Riwayat** tab lists every deployment of your project, newest first. A few markers help you read it:

- **Sedang melayani** (serving) marks the deployment visitors get now. While a new deployment runs, the old version keeps this marker until the new one is healthy.
- **Tanpa build** (without a build) marks a deployment that reused another deployment's image.
- The trigger line says where a deployment came from. In a team workspace it names the person, for example "Rani, push ke main" (Rani, push to main) or "Rani, rollback ke #4". In a personal workspace it only names the kind.
- A push that was not deployed, for example because [nothing changed in the project's folder](/en/docs/monorepo) or because auto-deploy is paused, shows as a grey row without a deployment number.

## Restart

Choose **Restart** from the menu next to the **Redeploy** button, then confirm. Sakala starts the running containers again, all replicas, usually within a few seconds. Meanwhile the project header shows **Sedang restart** (restarting).

A restart does not replace the code and does not pick up variable changes that have not been applied yet. If you just changed a variable, use **Redeploy**. A restart also does not run the [release command](/en/docs/perintah-rilis).

Restart is only available while the project runs or has crashed. A sleeping project does not need a restart, because it starts by itself when someone visits it. If your project crashed because of a bug in its code, it can crash again after a restart, so read the logs of the serving deployment first. Every restart is counted in the **Restart** chart on the **Metrik** (metrics) tab, one per replica.

## Restoring an earlier version

A rollback takes an application back to a version that ran before. On Sakala, a rollback creates a new deployment from the old version, so the history stays intact and you can move forward again at any time.

1. Open the **Riwayat** tab.
2. On the row of the deployment you want back, open its menu and choose **Kembalikan ke versi ini**.
3. The dialog compares the serving version with the target and says whether that version's image is still stored. Press **Kembalikan ke #N** (restore #N).

The new deployment reads **Rollback ke #N** (rollback to #N) in the history. The serving version keeps serving until the target is healthy, as with any deploy.

### What comes back and what does not

A rollback takes the commit, Root directory, Build command, Start command, release command, and port from the target version. Environment variables, attached databases, resources, and the number of replicas stay as they are now. This is on purpose: a database password you already replaced and a secret you deliberately revoked must not come back to life.

A rollback does not restore the database contents either. If the new version already ran a migration that changed tables, the old version will work against those changed tables. For changes like that, write migrations that are safe to run with the old code, or fix forward with a new commit.

### When a rollback needs a build

The Sakala server keeps two images per project: the one serving now, and the one that served before it. Going back to the previous version usually needs no build, so it is much faster than a normal deploy. Going back further rebuilds that version's commit, which takes longer and counts against the [builds per hour limit](/en/docs/batas-pilot#limits-per-workspace). The rollback dialog tells you which one will happen before you press the button.

The target must be a successful deployment that recorded a commit and comes from the branch the project uses now. Otherwise Sakala refuses the rollback and says why.

### Auto-deploy pauses after a rollback

If your project has auto-deploy on, a rollback pauses it, so the next push does not immediately replace the version you just restored. While it is paused, pushes to the project's branch are still listed in **Riwayat** but not deployed, and the project page shows how many pushes are being held.

Once the fix is ready, press **Nyalakan lagi auto-deploy** (turn auto-deploy back on). Turning it on does not deploy anything by itself; the next push is deployed. If you want to deploy the latest commit right away, the **Redeploy** button reads **Redeploy commit terbaru** (redeploy latest commit) during the pause, and that deployment replaces the rolled-back version.

Workspace owners and members can roll back, restart, and turn auto-deploy back on. Viewers can only look.

## Files inside the container are lost

A restart, a rollback, a redeploy, and a project that sleeps and wakes up all start containers from scratch. Files the application writes inside the container, such as uploads or a SQLite file, are lost every time. Keep data in a database and files in object storage. [File Storage](/en/docs/penyimpanan-file) shows how.

## Next steps

If the new deployment failed outright, rather than misbehaving after it went live, read [When a Deploy Fails](/en/docs/deploy-gagal) to understand its failure code. The old version keeps serving while that failed deploy happens.
