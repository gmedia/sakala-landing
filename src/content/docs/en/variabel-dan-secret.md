---
title: Variables and Secrets
description: How to set environment variables and secrets on Sakala, including suggestions from .env.example, when a change needs a rebuild, and when a redeploy without a build is enough.
track: panduan
section: Deploy guides
order: 3.5
lang: en
---

# Variables and Secrets

An environment variable is a name and value your application reads while it runs, for example `DATABASE_URL` or `APP_KEY`. On Sakala, variables are stored per project in the **Variabel** (variables) tab, and every deployment carries a copy of the variables as they were when the deployment was created.

This page explains how to set them, how to store secret values, and what happens when you change them: when Sakala only restarts the application with the same image, and when the application has to be built again.

> **Status as of 23 November 2026.** Suggestions from `.env.example` need `sakala-agent` v0.15.0, `sakala-api` v0.10.0, and Console v0.11.0 or later. A redeploy without a build needs `sakala-agent` v0.14.0 or later on the node that runs your project. Hosted Sakala at `sakala.dev` already runs these versions.

## Setting variables while creating a project

In the **Konfigurasi** (configuration) step, the **Environment variable (opsional)** section takes variables one by one, or a whole `.env` file through **Tempel dari .env** (paste from .env). You may skip it and set them later.

Once the project is created, Sakala reads your repository. If it has a `.env.example`, `.env.sample`, or `.env.dist`, the **Deploy** step shows a **Persiapan** (preparation) phase with suggested variables in groups:

| Group                                          | What it holds                                                                                                                                                                                                                             |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Perlu kamu isi** (you need to fill these in) | Names that look like credentials, for example an API key from another service. The value must come from you and is stored as a secret. You may leave it empty; the deploy still runs.                                                     |
| **Dibuatkan Sakala** (made by Sakala)          | Random keys such as `APP_KEY`, `SECRET_KEY_BASE`, `AUTH_SECRET`, or `SESSION_SECRET`, generated in your browser and stored as secrets.                                                                                                    |
| **Dari .env.example** (from .env.example)      | Values from the example file. Some are replaced for production, for example `APP_ENV=production`, `APP_DEBUG=false`, `LOG_LEVEL=info` instead of `debug`, and `APP_URL` set to your project's address. Every replaced row carries a note. |
| **Diisi Sakala** (filled in by Sakala)         | `PORT`, and the database variables when your project uses a [managed database](/en/docs/database-terkelola). You do not need to write them.                                                                                               |

Check them, change what you need, then press **Deploy sekarang** (deploy now). Variables the project already has are left alone. Example values that refer to another variable, such as `${APP_NAME}`, are not filled in, because Sakala stores the text as it is.

## Changing variables after the project runs

Open the project and go to the **Variabel** tab. From there you can use:

- **Tambah variabel** (add variable) for one variable;
- **Tempel dari .env** (paste from .env) for many at once, with a preview of which are new and which already exist;
- **Isi dari .env.example** (fill from .env.example) for the same suggestions as the Persiapan phase, if your repository has an example file;
- **Ubah** (edit) or **Hapus** (delete) on a variable's row.

Variable names are written in capitals and underscores automatically, so `api url` becomes `API_URL`. Do not add `PORT`, because Sakala sets it to the project's port.

A change is used only after the next deployment. Until then, the Console shows **Perubahan variabel belum dipakai aplikasi yang sedang berjalan** (the running application does not use the variable change yet) with a button to redeploy.

## Secrets

Tick **Simpan sebagai secret** (save as secret) for values that must not be visible, such as passwords and tokens. The value is hidden in the Console and only appears when someone presses the show button, and every time a secret value is shown, Sakala records it in the audit log.

All variables are stored encrypted, secret or not. Workspace owners and members can add, change, and read secret values. Viewers only see variable names and values that are not secret.

Sakala also masks secret values in logs, but the masking is not perfect: values shorter than 8 characters and common words are not masked. So do not print secrets to the log. If a secret does show up, treat it as leaked and change it. An example of changing a database password is in [Connecting an External Database](/en/docs/database-eksternal#changing-the-password).

## Build-time and runtime variables

Every variable is available while the application runs. Some applications also read variables **at build time** and keep the value in the build output, for example a Vite site that writes `VITE_API_URL` into its JavaScript files. For those, a new value is only used after a rebuild.

Sakala decides whether a variable change needs a rebuild from the kind of application it found when it analysed the repository:

| Kind of application                                                                                            | Changing a variable                                                                                                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Static site, including an SPA without a Start command                                                          | Always rebuilds, because the site is served as files and the values are stored in them.                                                                                                                               |
| A framework that can render pages at build time, for example Next.js, Nuxt, Astro, SvelteKit, Gatsby, or Remix | Always rebuilds, because pages rendered at build time keep the values.                                                                                                                                                |
| A plain server, for example Laravel, Express, Django, Go, or a project with a Dockerfile                       | Restarts with the same image, unless the variable name starts with `VITE_`, `NEXT_PUBLIC_`, `NUXT_PUBLIC_`, `PUBLIC_`, `REACT_APP_`, `VUE_APP_`, `GATSBY_`, `EXPO_PUBLIC_`, or `RAILPACK_`, or is exactly `NODE_ENV`. |
| An application Sakala cannot classify yet                                                                      | Always rebuilds, to be safe.                                                                                                                                                                                          |

Variables from a managed database (`DATABASE_URL` and `DB_*`) never cause a build, for any kind of application.

You do not need to memorise this table. In the **Variabel** tab, next to the save button, the Console says what will happen before you save: **Cukup restart dengan image yang sama (tanpa build)** (a restart with the same image, no build), or **Perubahan ini butuh build ulang karena** (this change needs a rebuild because) followed by the reason.

Values read at build time, such as `VITE_*` and `NEXT_PUBLIC_*`, end up in the build output and can be read by anyone who opens your application. Do not put secrets there.

## Redeploy without a build

The **Redeploy** button reuses the image in use when nothing needs to be built again. For that, all of this must match the active deployment:

- the commit, meaning nothing new has been pushed to the project's branch;
- Root directory, Build command, and Start command;
- the variables read at build time, according to the table above.

The image must also still be on the node that runs your project. A sleeping or crashed project can still reuse its image.

A redeploy without a build still runs the [release command](/en/docs/perintah-rilis), health checks, and every replica, and the old version keeps serving until the new one is healthy. Only the clone, analysis, and build are skipped. On the deployment page the step reads **Memakai image dari deployment #N (tanpa build)** (using the image from deployment #N, no build), and in the **Riwayat** (history) tab the row is labelled **Tanpa build** (no build).

A deployment that reuses an image does not count toward the [build limit per hour](/en/docs/batas-pilot#limits-per-workspace). If the image turns out to be gone from the node, Sakala builds as usual, and the deployment counts from then on.

Redeploys without a build are also used automatically after you attach, detach, or change the password of a [managed database](/en/docs/database-terkelola), as long as the commit and build settings have not changed.

## Rebuild from scratch

Next to the **Redeploy** button is a menu with **Build ulang dari awal** (rebuild from scratch). It always builds from the latest commit, without reusing the old image. Use it when:

- the previous build output is broken;
- your application reads another variable at build time that the rules above do not cover. For example, a Dockerfile with `RUN --mount=type=secret,id=API_URL ...`: `API_URL` has no `VITE_` or other build prefix, so Sakala treats it as a runtime variable and does not rebuild when its value changes.

Builds on Sakala do not reuse an old build step when a variable's value changes, so the new value is always read. How variables reach the build, including `--mount=type=secret` in a Dockerfile, is in [Preparing a Dockerfile](/en/docs/dockerfile#variables-needed-during-the-build).

## Next steps

For an application that needs a database, read [Managed Databases](/en/docs/database-terkelola) or [Connecting an External Database](/en/docs/database-eksternal). To run migrations once per deployment, read [Databases and the Release Command](/en/docs/perintah-rilis). To go back to an earlier version or start the application again without a build, read [Rollback and Restart](/en/docs/rollback-dan-restart).
