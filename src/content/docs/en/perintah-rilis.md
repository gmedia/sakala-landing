---
title: Databases and the Release Command
description: How to run database migrations once per deployment with the release command, for a Sakala managed database or one from another service.
track: panduan
section: Deploy guides
order: 4.2
lang: en
---

# Databases and the Release Command

The release command is a single command Sakala runs once per deployment, after the build and before the new version receives traffic. It is usually used for database migrations.

This page explains how the release command works and how to write migrations that are safe with it. The database can be a [Sakala managed database](/en/docs/database-terkelola), which is still a limited pilot, or one from another service through [Connecting an External Database](/en/docs/database-eksternal).

> **Status as of 18 November 2026.** The release command needs `sakala-api` v0.7.0 or later, Console v0.8.0 or later, and `sakala-agent` v0.10.0 or later on the node that runs your project. If the **Release command** field is not in the **Pengaturan** (settings) tab yet, the Console you use has not reached that version. The example commands on this page have not been tried through Sakala in production.

## Databases today

There are two options. A [managed database](/en/docs/database-terkelola) is PostgreSQL run by Sakala and attached to a project, with `DATABASE_URL` and `DB_*` filled in automatically. As of 23 November 2026 it is still a limited pilot: the default quota on `sakala.dev` is 0, so only workspaces that a Sakala admin has given a quota can create one.

The other option is a database from another service. Applications on Sakala can reach the internet, so a database that is open on the internet can be used. Store its address and password as project variables, for example `DATABASE_URL`, in the **Variabel** (variables) tab. The values are stored encrypted and masked in logs, although [the masking is not perfect](/en/docs/database-eksternal#changing-the-password), so still do not print them. For a database like this, backups and data recovery are your responsibility.

## Setting the release command

Open the project, go to the **Pengaturan** tab, and fill in the **Release command** field next to **Build command** and **Start command**. The same field is also in the advanced settings when you create a project. Save, then press **Redeploy**, because settings changes only apply to the next deployment.

Typical values:

| Application      | Release command               |
| ---------------- | ----------------------------- |
| Laravel          | `php artisan migrate --force` |
| Node with Prisma | `npx prisma migrate deploy`   |

For Prisma, make sure the `prisma` CLI is inside the image. If your Dockerfile uses `npm ci --omit=dev` and `prisma` is listed under `devDependencies`, the CLI is not installed.

Rules to follow:

- The command is one line, up to 1000 characters. Join several steps with `&&`, or move them to a script in the repository.
- The command runs through `sh -c`, just like Start command, so the image must have `sh`.
- The command must finish on its own. Do not wait for input and do not start a server.

Clear the field when you no longer need it.

## What happens during a deployment

Once the image is ready, Sakala runs the release command in a temporary container. This also applies to a [redeploy without a build](/en/docs/variabel-dan-secret#redeploy-without-a-build): the image is reused, but the release command still runs, for example so migrations run on a database that was just attached. That container uses the same image, environment variables, and network as your application, and is removed once the command finishes. Its output goes to the **Logs** panel on the deployment detail page, with `[release]` at the start of each line.

If the command finishes with exit code 0, Sakala goes on to start the new version as usual. If the exit code is anything else, the deployment fails with the code `release_command_failed`, and the exit code is shown in **Detail error**. The new version is not started, and the previous version, if there is one, keeps serving visitors.

The time limit is set by the Sakala operator, 600 seconds (10 minutes) by default, and cannot be changed from the project. A command that runs past it fails the deployment with the code `release_command_timeout`. How to read both codes is in [When a Deploy Fails](/en/docs/deploy-gagal#release-command).

The release command only runs during a deployment. It does not run when the application wakes from sleep, when a container restarts, when Sakala recovers a replica that died, and it does not run once per replica.

If the node that runs your project does not support the release command yet, Sakala refuses the deploy and says the node does not support it. You can clear the field to deploy without a release command, or wait for the operator to update the agent on the node.

## Why not in Start command

You may have put `php artisan migrate --force && ...` in front of Start command. Start command runs every time a container starts, including waking from sleep, restarts, and replica recovery. If your project has several replicas, each replica runs it at the same time, so several migrations can run at once and collide.

A migration that fails in Start command also keeps the application from ever starting, and all you see is `runtime_app_crashed`. In the release command, the failure has its own code and its output is kept apart in the log.

## Migrations must work with the previous version

The previous version keeps serving visitors while the release command runs, and until the new version passes its check. So for a few minutes the previous version reads a database schema that the new version's migration has already changed. If the deployment fails after the migration finished, traffic stays on the previous version, but the schema does not go back.

That is why a change the previous version cannot handle should be split across several deployments. This pattern is often called expand/contract. An example for renaming the column `name` to `full_name`:

1. First deployment: the migration adds the `full_name` column, and the new code writes to both columns. The previous version keeps working because `name` still exists.
2. Fill in `full_name` for existing rows.
3. Next deployment: the code only uses `full_name`.
4. The deployment after that: the migration removes the `name` column.

Before a migration that deletes or changes data, take a backup and make sure that backup can be restored.

## Seeders do not belong in the release command

The release command runs on every deployment, so a seeder there would insert the same data again and again. Run seeders once from your laptop, straight against the database at that other service. `read -rs` keeps the value off the screen and out of your shell history:

```bash
read -rs DATABASE_URL && export DATABASE_URL
npx prisma db seed
unset DATABASE_URL
```

The example above is for Prisma reading `DATABASE_URL` from its schema. For Laravel, run `php artisan db:seed` with connection variables like the ones in the [monorepo migration example](/en/docs/monorepo#step-2-run-migrations-deliberately). The database must be reachable from your laptop.

A managed database cannot be reached from a laptop, because its address is only reachable from applications running on Sakala. If you need seed data there, write a seeder that is safe to run repeatedly, for example one that only inserts when the table is still empty.

## Next steps

If a deployment fails in the release command, open [When a Deploy Fails](/en/docs/deploy-gagal#release-command). To set up a database from the start, read [Managed Databases](/en/docs/database-terkelola) or [Connecting an External Database](/en/docs/database-eksternal). For a Laravel project in a monorepo, see [Deploying a Monorepo](/en/docs/monorepo).
