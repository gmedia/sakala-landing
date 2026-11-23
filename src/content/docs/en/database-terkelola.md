---
title: Managed Databases
description: A workspace-owned PostgreSQL database attached to projects, with DATABASE_URL and DB_* filled in by Sakala. Currently a limited pilot.
track: panduan
section: Deploy guides
order: 3.8
lang: en
---

# Managed Databases

A managed database is a PostgreSQL database that Sakala creates and runs for you. You attach it to a project, and Sakala fills in `DATABASE_URL` and the `DB_*` variables in your application at deploy time, so you never copy a password.

> **Status as of 23 November 2026: limited pilot.** On `sakala.dev`, the default database quota of every workspace is 0, so most workspaces cannot create a database yet. Databases are open only to a few workspaces that a Sakala admin has given a quota. Other workspaces see **Workspace ini belum bisa membuat database** (this workspace cannot create databases yet) when they try to create one. Until then, use an [external database](/en/docs/database-eksternal).

The feature also depends on the Sakala server you use. If that server is not connected to a database server, the **Database** page shows **Database terkelola belum tersedia di server ini** (managed databases are not available on this server yet). During the pilot on `sakala.dev`, the database server runs on the same machine as the applications until a dedicated database server is available, so a problem on that machine affects both. There is no uptime guarantee yet, and do not store sensitive data here during the pilot.

## What you get

- PostgreSQL 18, one database with its own user and password. MySQL applications need adjusting, because only PostgreSQL is offered.
- A database that belongs to the workspace, not to one project. It can be created without a project, survives the deletion of projects that use it, and can be attached to several projects in the same workspace.
- Connection variables filled in by Sakala at deploy time, TLS required on every connection, and a password you can change at any time.
- Nightly backups run by the operators. You cannot restore them yourself yet; see [Backups and recovery](#backups-and-recovery).

## Creating a database

There are two ways.

**While creating a project.** If Sakala finds signs that your application needs a database, such as `DB_CONNECTION` in `.env.example` or a Laravel migrations folder, the **Persiapan** (preparation) phase of the **Deploy** step shows **Aplikasi ini sepertinya butuh database** (this application seems to need a database). Pick **Buat database baru untuk proyek ini** (create a new database for this project). Sakala creates the database, attaches it, and starts the first deploy on its own once the database is ready. In the history, that deployment reads **Deploy pertama setelah database siap** (first deploy after the database is ready).

**From the Database page.** Open **Database** in the sidebar, press **Buat database** (create database), and fill in a name and a region. The name is only shown in Sakala; the database and user names on the server are random. Once its status is **Siap** (ready), attach it to a project with **Pasang ke proyek** (attach to project).

Workspace owners and members can create, attach, detach, and delete databases. Viewers can only look.

## Variables Sakala fills in

An attached project receives these variables in every following deployment:

| Variable                                    | Value                                                           |
| ------------------------------------------- | --------------------------------------------------------------- |
| `DATABASE_URL`                              | `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require` |
| `DB_CONNECTION`                             | `pgsql`                                                         |
| `DB_HOST`, `DB_PORT`                        | The database server's address on Sakala's private network       |
| `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` | Database name, user, and password                               |

These are not stored as project variables. The **Variabel** (variables) tab lists them separately, without values. If your project has a variable with the same name, the project variable wins, and the Console marks it **Ditimpa proyek** (overridden by the project). For Laravel 11 and later, do not set `DB_URL`, because Laravel reads it before `DB_HOST` and the rest.

After attaching or detaching a database, press **Redeploy** on that project. As long as its commit and build settings are unchanged, this redeploy [does not build again](/en/docs/variabel-dan-secret#redeploy-without-a-build).

## Running migrations

Sakala does not run migrations by itself. Fill in **Release command** in the **Pengaturan** (settings) tab, for example `php artisan migrate --force` for Laravel or `npx prisma migrate deploy` for Prisma. It runs once per deployment, after the build and before the new version receives traffic. See [Databases and the Release Command](/en/docs/perintah-rilis).

The database address is reachable only from applications running on Sakala, not from your laptop or another service, and the Console has no SQL console yet. So migrations and seed data must run through your application. If you need seed data, write a seeder that is safe to run repeatedly, for example one that only inserts when the table is still empty, because the release command runs on every deployment.

## Seeing the connection details

The database page shows the host, port, database name, and user to every workspace member. The password and `DATABASE_URL` are visible only to workspace owners, through **Tampilkan password** (show password), and every time the password is shown, Sakala records it in the workspace audit log. Attached projects still receive both automatically.

## Changing the password

Press **Ganti password** (change password) on the database page. The old password stops working as soon as the database server replaces it, usually within a few seconds. Running applications still carry the old password, so they cannot open new connections to the database until they are redeployed.

That is why **Redeploy otomatis proyek yang terpasang** (automatically redeploy attached projects) is ticked in the dialog. Once the new password is active, Sakala redeploys the live version of every attached project, usually without a build. The database page then shows each project's state, such as **Sudah memakai password baru** (using the new password), or the reason an automatic redeploy was skipped. If you untick it, redeploy each project yourself.

If the password change fails, the old password stays valid.

## Extensions

On the database page you can install `pgcrypto`, `citext`, `pg_trgm`, `unaccent`, `hstore`, and `vector` (pgvector). Other extensions, PostGIS included, are not available yet.

## Limits

| Limit                              | Value                                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| Number and total size of databases | Per workspace, from its limit profile. The default quota on `sakala.dev` is currently 0.         |
| Concurrent connections             | 5 per database, shared by every replica of every attached project, including the nightly backup. |
| Temporary files per session        | 1 GB, for example for a large sort.                                                              |
| Region                             | A project can only use a database in the same region.                                            |
| Databases per project              | One. One database may be attached to several projects.                                           |

A small connection limit means your application must keep its connections small too. Multiply the maximum connections per process by the number of processes and replicas, and keep the total under 5. For Node with `pg`, that means a small `max` on the `Pool`. Connections refused by this limit usually show up in the log as `too many connections`.

When the total size of the workspace's databases reaches 80% of the quota, owners and members are notified. At 100%, every database in that workspace is **Terkunci** (locked): applications cannot connect until the size drops or the quota is raised. Because applications cannot connect, the data cannot be reduced from the application either, so delete databases you do not use or ask a Sakala admin to raise the quota. Nightly backups keep running while locked.

## Detaching and deleting

**Lepas** (detach) on the database page disconnects the database from a project. The data stays, and the project stops receiving its connection variables after its next redeploy.

A database that is still attached to a project cannot be deleted. Detach it from every project first, then press **Hapus database** (delete database). Deleting a database removes its data from the database server.

## Backups and recovery

Sakala's operators back up every database each night, encrypted. On `sakala.dev`, copies are kept for about one week on the database server, and another set for about two weeks on a separate server. So data written after the last backup, up to about one day, can be lost. Data you delete can also remain in the backups for that long.

The Console has no dump download or restore button yet. If your data needs to be restored from a backup, a maintainer does it, and recovery is not guaranteed during the pilot. Questions about this can go to the contact in [Pilot Limits](/en/docs/batas-pilot#the-binding-rules).

A restore always runs as your own database user, never as a superuser. What a dump contains, such as functions, triggers, and default values, runs during the restore with the privileges of the user doing it. If a restore ran as a superuser, code from one database would run as a superuser too, and could read or change other people's databases on the same server. The full reasoning is in [ADR-020](/en/docs/proyek/adr#adr-020--managed-postgresql-for-projects).

## Next steps

Set up migrations with [Databases and the Release Command](/en/docs/perintah-rilis). If your workspace cannot create a database yet, follow [Connecting an External Database](/en/docs/database-eksternal). For how variables work in general, read [Variables and Secrets](/en/docs/variabel-dan-secret).
