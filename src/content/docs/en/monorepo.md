---
title: Deploying a Monorepo
description: One repository holding several applications, such as a Laravel API and a Vite web app. Create one Sakala project per application with Root directory. JavaScript workspaces are built from their root, lockfile included.
track: panduan
section: Deploy guides
order: 4.5
lang: en
---

# Deploying a Monorepo

A monorepo is one repository that holds several applications, for example `apps/api` and `apps/web`. Sakala deploys a monorepo as **one project per application**. Every project points at the same repository and branch, and each has its own **Root directory**.

> Sakala has been in an open pilot since 19 November 2026: anyone can sign up and use it at no cost, within the [usage limits](/en/docs/batas-pilot).
>
> **Status of this guide as of 11 November 2026.** This guide comes from one real run in a Sakala development environment against the [`gmedia/facility-reporting`](https://github.com/gmedia/facility-reporting) repository, which holds a Laravel API in `apps/api` and a Vite web app in `apps/web`. It has not been tried with pilot users or in production. Other stacks have not been tried as a monorepo.
>
> **Update, 19 November 2026.** A package in a JavaScript workspace (pnpm, npm, Yarn, or Bun) is now built from the workspace root, so the lockfile and shared workspace packages are used. This needs the latest sakala-agent (v0.13.0 or later) on the node that runs your project. It has been tested with an example pnpm monorepo in the `sakala-agent` Docker tests, but not yet through Sakala in production. [JavaScript monorepos](#javascript-monorepos) explains how it works.

## Who this is for

This guide is for you if your backend and frontend live in one repository. By the end, each application has its own public URL, and you know the limits that still apply to monorepos.

## What you need

- You have been through [Your First Deploy](/en/docs/deploy-pertama), because the basic steps are the same.
- Each application builds and runs **from its own folder alone**, except a package in a JavaScript workspace. [JavaScript monorepos](#javascript-monorepos) and [Current limits](#current-limits) explain why.
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

### JavaScript monorepos

In a pnpm, npm, Yarn, or Bun workspace, the lockfile and the package manager live only at the repository root. When Root directory points at a package in that workspace, such as `apps/web`, Sakala builds from the workspace root instead of the package folder alone. Railpack installs the dependencies of the whole workspace with its lockfile, then runs that package's own scripts.

Sakala treats a folder as a workspace package when it has its own `package.json` and the root above it lists it under `packages` in `pnpm-workspace.yaml` or under `workspaces` in `package.json`.

All you fill in is **Root directory**. Leave **Build command** and **Start command** empty:

- **Build.** Sakala runs the package's `build` script. With pnpm the command is `pnpm --filter '<package-name>...' run build`, so the workspace packages it uses, such as `packages/ui`, are built first.
- **Start.** If the package has a `start` script, that script runs. If it has none and the package is a Vite SPA, a single-page app built with Vite, the build output is served as a static site. A direct link to a page inside the app, such as `/reports/12`, still works, because the server returns `index.html` for that address.

If you do fill in Build command, Start command, or Release command, the command runs inside the package folder. So `pnpm run build` in a project with Root directory `apps/web` runs in `apps/web`, with pnpm available.

A folder that is not a workspace package, such as a Laravel API in `apps/api`, is unaffected: the build still sees only the Root directory. A project with a Dockerfile in its Root directory is also still built from that folder alone.

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

Run migrations as a step you decide on, not as a side effect of every application start. There are two ways.

The first is the release command: set the **Release command** field in the API project's **Pengaturan** (settings) tab to `php artisan migrate --force`. Sakala runs it once per deployment, after the build and before the new version receives traffic. How it works and which versions it needs are in [Databases and the Release Command](/en/docs/perintah-rilis).

The second, if the Sakala you use does not offer the release command yet: from your laptop or CI, point Laravel at the same database and run the migrations before deploying the version that needs them.

```bash
cd apps/api
DB_CONNECTION=pgsql DB_HOST=database-host DB_PORT=5432 \
DB_DATABASE=database_name DB_USERNAME=database_user DB_PASSWORD='database-password' \
php artisan migrate --force
```

Do not keep that command with its password in a shared shell history, and do not commit it. The database must be reachable from your laptop. If your provider restricts IP addresses, allow yours first.

You may be tempted to put `php artisan migrate --force && ...` in front of Start command. That runs every time the container starts, including restarts and redeploys. A failing migration also keeps the application from ever starting, and all you see is `runtime_app_crashed`. If your project has several replicas, each replica also runs it at the same time. Use the release command instead.

Write migrations that stay safe for the version that is running, because the old version keeps serving until the new one passes its check.

## Step 3: the Vite web project

Create a second project from the same repository and branch:

- **Nama Proyek:** for example `facility-web`.
- **Root directory:** `apps/web`.
- **Build command** and **Start command:** leave them empty.
- **Environment Variables:** `VITE_API_BASE_URL` set to the API URL from step 1 plus the API path, for example `https://facility-api.sakala.app/api/v1`.

Vite writes `VITE_*` variables into the build output, so the value must be there **at build time**, not only while the application runs. Railpack gives the project's Environment Variables to every build step. When the value changes, press **Redeploy** so the site is built again. Anyone who opens your site can read `VITE_*` values, so do not put secrets there.

**What you should see:** Railpack detects Vite and serves the build output as a static site. After **Deployment berhasil**, open the web URL and make sure a page that calls the API really loads data.

Do not set Start command to `vite preview`, `npm run preview`, or `vite`. The preview and dev servers of Vite 6 and later refuse any address that is not listed in `allowedHosts`, including the Sakala address, so every visitor gets a 403. Railpack also runs the `start` script in `package.json` when there is one, so remove a `start` script that runs `vite preview`. The failure is explained in [`runtime_app_host_blocked`](/en/docs/deploy-gagal#runtime_app_host_blocked).

The web app and the API live at different addresses, so the browser treats calls from the web app to the API as cross-origin requests. The API must allow the web origin through CORS. In Laravel that is set in `config/cors.php` or in the variables your application uses.

## Current limits

Read this before you move your monorepo to Sakala.

- **Outside a JavaScript workspace, only the Root directory is built.** Files outside that folder, including shared configuration at the root, are not available during the build. On a node that still runs a sakala-agent older than v0.13.0, this also applies to workspace packages: the lockfile at the root is not used, workspace packages such as `packages/ui` are not visible, and a build that uses pnpm fails with `pnpm: not found`.
- **SPAs other than Vite in a workspace are not served automatically yet.** For static Astro, Create React App, Angular, or React Router inside a workspace, add a `start` script to the package or fill in Start command.
- **No watch paths yet.** Sakala cannot limit auto-deploy to particular folders. If auto-deploy is on for several projects, every push to that branch rebuilds all of them, even when only one application changed. To avoid wasted builds, turn auto-deploy on only for the project that changes most, and press **Redeploy** by hand for the others.
- **One web service per project.** Laravel queue workers and the scheduler cannot run on Sakala yet.
- **No persistent storage.** Files the application writes, such as `file` sessions, `file` cache, and uploads, are gone each time a new deploy finishes. Use a database or an external service for data that has to last.

## If it fails

| What you see                             | Likely cause                                                                      | What to do                                                                                                                    |
| ---------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `runtime_root_directory_invalid`         | The Root directory folder does not exist on that branch                           | See [`runtime_root_directory_invalid`](/en/docs/deploy-gagal#runtime_root_directory_invalid)                                  |
| `runtime_build_failed`                   | The build needs a file outside the Root directory, such as configuration at root  | Read the Logs. If the missing file is outside the application folder, see [Current limits](#current-limits)                   |
| The Logs show `pnpm: not found`          | The node does not run sakala-agent v0.13.0 or later yet                           | Building from the workspace root is not active on that node yet. Tell us through **Kirim Masukan** in Console                 |
| `runtime_app_host_blocked`               | Start command or a `start` script runs `vite preview` or `vite`                   | Clear Start command. See [`runtime_app_host_blocked`](/en/docs/deploy-gagal#runtime_app_host_blocked)                         |
| Laravel does not connect to the database | `DB_CONNECTION` or `RAILPACK_PHP_EXTENSIONS` is not set                           | Add the variables, then **Redeploy**. See also [If the connection fails](/en/docs/database-eksternal#if-the-connection-fails) |
| The API project fails while starting     | `APP_KEY` is empty, a migration in Start command failed, or the default start bug | Read the last lines of the Logs, then see [the note on Start command](#step-1-the-laravel-api-project)                        |
| The web app loads, but no data appears   | `VITE_API_BASE_URL` was empty or wrong at build time, or CORS refuses the call    | Check the API call in the browser's DevTools, fix the variable, then **Redeploy**                                             |

Other codes are explained in [When a Deploy Fails](/en/docs/deploy-gagal).

## Next steps

For build-time variables and a Vite example with a Dockerfile, read [Preparing a Dockerfile](/en/docs/dockerfile). For data connections, read [Connecting an External Database](/en/docs/database-eksternal). If your monorepo needs watch paths, or a workspace in a stack other than JavaScript, tell us through **Kirim Masukan** in Console, so we know what is needed.
