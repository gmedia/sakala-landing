---
title: Deploying a Monorepo
description: One repository holding several applications, such as a Laravel API and a Vite web app. Create one Sakala project per application with Root directory, and know the current limits.
track: panduan
section: Deploy guides
order: 4.5
lang: en
---

# Deploying a Monorepo

A monorepo is one repository that holds several applications, for example `apps/api` and `apps/web`. Sakala deploys a monorepo as **one project per application**. Every project points at the same repository and branch, and each has its own **Root directory**.

> **Status as of 11 November 2026.** Sakala is not open to the public yet. This guide comes from one real run in a Sakala development environment against the [`gmedia/facility-reporting`](https://github.com/gmedia/facility-reporting) repository, which holds a Laravel API in `apps/api` and a Vite web app in `apps/web`. It has not been tried with pilot users or in production. Other stacks have not been tried as a monorepo.

## Who this is for

This guide is for you if your backend and frontend live in one repository. By the end, each application has its own public URL, and you know the limits that still apply to monorepos.

## What you need

- You have been through [Your First Deploy](/en/docs/deploy-pertama), because the basic steps are the same.
- Each application builds and runs **from its own folder alone**. [Current limits](#current-limits) explains why.
- Enough project quota. Each application uses one project, and during the pilot an account has 3 projects.
- A database outside Sakala if one of the applications needs it. See [Connecting an External Database](/en/docs/database-eksternal).

## How it works

When it deploys, Sakala fetches the whole repository, then uses the folder in **Root directory** as the build context. The build context is the folder the build can see. The Dockerfile is looked for in that folder, and Railpack, which builds applications without a Dockerfile, only reads that folder too.

For the example repository, that makes two projects:

| Project | Root directory | Builder  | Result                            |
| ------- | -------------- | -------- | --------------------------------- |
| API     | `apps/api`     | Railpack | A Laravel app on its own URL      |
| Web     | `apps/web`     | Railpack | A static Vite site on its own URL |

Create the API project first, because the web app needs the API address when it builds.

## Step 1: the Laravel API project

Create a new project from your repository as usual. In the **Konfigurasi** step:

- **Nama Proyek:** for example `facility-api`.
- **Root directory:** `apps/api`.
- **Start command:** leave it empty. See the note below.

Fill in these **Environment Variables**. They are what the run on the example repository needed:

| Name                         | Value                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `APP_KEY`                    | Generate it on your laptop with `php artisan key:generate --show`, and tick **Simpan sebagai rahasia**.    |
| `DB_CONNECTION`              | `pgsql`. Without it Laravel uses its own default, because the `.env` file is not deployed.                 |
| `DB_HOST`, `DB_PORT`         | Your external database's address and port.                                                                 |
| `DB_DATABASE`, `DB_USERNAME` | The database name and its user.                                                                            |
| `DB_PASSWORD`                | The database password, as a secret.                                                                        |
| `RAILPACK_PHP_EXTENSIONS`    | `pdo_pgsql`. Asks Railpack to install the PHP extension for PostgreSQL. Without it Laravel cannot connect. |

Also add any other variables your application's `.env.example` asks for. For an application open to the internet, set `APP_ENV=production` and `APP_DEBUG=false`, so error pages do not reveal details of the application.

Then press **Buat Proyek** and **Deploy sekarang**.

**What you should see:** in Auto Detect, **Builder** shows Railpack and **Framework** shows Laravel. After **Deployment berhasil**, note this project's public URL.

**A note on Start command.** Railpack normally knows how to start Laravel, so Start command stays empty. During the run above, that default start still had a bug on Sakala, which is being fixed in the agent. If your API deployment fails while the application starts or is checked, and the Logs show no error in your code, set Start command to `php artisan serve --host=0.0.0.0 --port=$PORT` for now, and clear it again once the fix is released. `php artisan serve` is a development server, so do not treat it as the permanent way.

## Step 2: run migrations deliberately

Sakala does not run `php artisan migrate` for you, and there is no dedicated pre-deploy step for migrations yet. Run migrations as a step you decide on, not as a side effect of every application start.

The way we suggest: from your laptop or CI, point Laravel at the same database and run the migrations before deploying the version that needs them.

```bash
cd apps/api
DB_CONNECTION=pgsql DB_HOST=database-host DB_PORT=5432 \
DB_DATABASE=database_name DB_USERNAME=database_user DB_PASSWORD='database-password' \
php artisan migrate --force
```

Do not keep that command with its password in a shared shell history, and do not commit it. The database must be reachable from your laptop. If your provider restricts IP addresses, allow yours first.

You may be tempted to put `php artisan migrate --force && ...` in front of Start command. That runs every time the container starts, including restarts and redeploys. A failing migration also keeps the application from ever starting, and all you see is `runtime_app_crashed`. If you have to use it, remove it again once the migration is done.

Write migrations that stay safe for the version that is running, because the old version keeps serving until the new one passes its check.

## Step 3: the Vite web project

Create a second project from the same repository and branch:

- **Nama Proyek:** for example `facility-web`.
- **Root directory:** `apps/web`.
- **Environment Variables:** `VITE_API_BASE_URL` set to the API URL from step 1 plus the API path, for example `https://facility-api.run.sakala.dev/api/v1`.

Vite writes `VITE_*` variables into the build output, so the value must be there **at build time**, not only while the application runs. Railpack gives the project's Environment Variables to every build step. When the value changes, press **Redeploy** so the site is built again. Anyone who opens your site can read `VITE_*` values, so do not put secrets there.

**What you should see:** Railpack detects Vite and serves the build output as a static site. After **Deployment berhasil**, open the web URL and make sure a page that calls the API really loads data.

The web app and the API live at different addresses, so the browser treats calls from the web app to the API as cross-origin requests. The API must allow the web origin through CORS. In Laravel that is set in `config/cors.php` or in the variables your application uses.

## Current limits

Read this before you move your monorepo to Sakala.

- **Only the Root directory is built.** Files outside that folder are not available during the build. That means a lockfile at the repository root, such as `pnpm-lock.yaml` in the example repository, is not used. The web app's dependencies are installed without it, so their versions can differ from what you tested on your laptop. Shared workspace packages, such as a `packages/ui` that several applications import, and shared configuration at the root are not visible either. An application that depends on a workspace package cannot be deployed through Sakala yet.
- **No watch paths yet.** Sakala cannot limit auto-deploy to particular folders. If auto-deploy is on for several projects, every push to that branch rebuilds all of them, even when only one application changed. To avoid wasted builds, turn auto-deploy on only for the project that changes most, and press **Redeploy** by hand for the others.
- **One web service per project.** Laravel queue workers and the scheduler cannot run on Sakala yet.
- **No persistent storage.** Files the application writes, such as `file` sessions, `file` cache, and uploads, are gone each time a new deploy finishes. Use a database or an external service for data that has to last.

## If it fails

| What you see                             | Likely cause                                                                      | What to do                                                                                                                    |
| ---------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `runtime_root_directory_invalid`         | The Root directory folder does not exist on that branch                           | See [`runtime_root_directory_invalid`](/en/docs/deploy-gagal#runtime_root_directory_invalid)                                  |
| `runtime_build_failed`                   | The build needs a file outside the Root directory, such as a workspace package    | Read the Logs. If the missing file is outside the application folder, see [Current limits](#current-limits)                   |
| Laravel does not connect to the database | `DB_CONNECTION` or `RAILPACK_PHP_EXTENSIONS` is not set                           | Add the variables, then **Redeploy**. See also [If the connection fails](/en/docs/database-eksternal#if-the-connection-fails) |
| The API project fails while starting     | `APP_KEY` is empty, a migration in Start command failed, or the default start bug | Read the last lines of the Logs, then see [the note on Start command](#step-1-the-laravel-api-project)                        |
| The web app loads, but no data appears   | `VITE_API_BASE_URL` was empty or wrong at build time, or CORS refuses the call    | Check the API call in the browser's DevTools, fix the variable, then **Redeploy**                                             |

Other codes are explained in [When a Deploy Fails](/en/docs/deploy-gagal).

## Next steps

For build-time variables and a Vite example with a Dockerfile, read [Preparing a Dockerfile](/en/docs/dockerfile). For data connections, read [Connecting an External Database](/en/docs/database-eksternal). If your monorepo needs workspace packages or watch paths, tell us through **Kirim Masukan** in Console, so we know what is needed.
