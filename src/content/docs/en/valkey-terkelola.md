---
title: Managed Valkey
description: A workspace-owned, Redis-compatible key-value store for queues, sessions, and cache, with REDIS_URL filled in by Sakala. A limited pilot, not open on sakala.dev yet.
track: panduan
section: Deploy guides
order: 4.17
lang: en
---

# Managed Valkey

Valkey is an in-memory key-value store compatible with Redis, so Laravel's `redis` driver, ioredis, and BullMQ can use it directly. Sakala runs Valkey for your workspace, you attach it to a project, and Sakala fills in `REDIS_URL` and `REDIS_*` at deploy time.

> **Status as of 26 November 2026: a limited pilot, not open on `sakala.dev` yet.** Managed Valkey is available to workspaces whose quota a Sakala admin has opened. The default quota of every workspace is 0, and the **Valkey** item in the sidebar appears only for workspaces with a quota. On `sakala.dev`, the first quotas open only after a version of the [Privacy Notice](/en/privasi) that covers Valkey contents takes effect. How to ask is in [Requesting quota](#requesting-quota).

Without Valkey, Laravel can still use the `database` driver for queues, cache, and sessions, for example on a [managed database](/en/docs/database-terkelola).

## Choosing a mode

|           | Persistent (recommended)                              | Cache                                    |
| --------- | ----------------------------------------------------- | ---------------------------------------- |
| Data      | Written to disk every second, kept after a restart    | Memory only, may be empty after restart  |
| Backup    | Every night                                           | None                                     |
| When full | New writes are refused until some data is deleted     | The least recently used keys are dropped |
| Suits     | Job queues (Laravel queue, BullMQ) and login sessions | Cache that can be rebuilt                |

The mode cannot be changed after the store is created. Do not use cache mode for a queue: jobs can be dropped when it is full or lost on a restart.

## Creating and attaching

1. Open **Valkey** in the sidebar, then press **Buat Valkey** (create Valkey).
2. Fill in **Nama Valkey** (name), pick a **Mode**, then pick an **Ukuran** (size): 32, 64, or 128 MB.
3. Wait until its status is **Siap** (ready), then press **Pasang ke proyek** (attach to project).
4. Press **Redeploy** on that project. The variables arrive from the next deployment, usually [without a build](/en/docs/variabel-dan-secret#redeploy-without-a-build).

The project page works too: the **Variabel** (variables) tab shows **Pasang Valkey** (attach Valkey) and **Buat Valkey untuk proyek ini** (create Valkey for this project).

A store belongs to the workspace, not to one project. One store can be attached to several projects in the same workspace, but one project can use only one store. Workspace owners and members can create, attach, detach, resize, rotate the password, and delete. Viewers can only look.

## Variables filled in by Sakala

| Variable         | Value                                                        |
| ---------------- | ------------------------------------------------------------ |
| `REDIS_URL`      | `redis://:<password>@<host>:6379`, without a database number |
| `REDIS_HOST`     | The store's IP address on a private network                  |
| `REDIS_PORT`     | `6379`                                                       |
| `REDIS_PASSWORD` | A random 32-character password                               |

Every container of the project receives them: web, [workers, schedule runs](/en/docs/worker-dan-jadwal), and the [release command](/en/docs/perintah-rilis). A project variable with the same name still wins, and the **Variabel** tab marks it **Menimpa Valkey** (overrides Valkey).

Do not add `/0` to the end of `REDIS_URL`. Laravel uses database 0 for queues and 1 for cache. A number in the URL merges the two, so `php artisan cache:clear` also deletes jobs.

The store can be reached only from attached projects, over a private network on the same server. It has no public address, so it cannot be used from your laptop.

## Laravel

1. Add the project variables `QUEUE_CONNECTION=redis` and `CACHE_STORE=redis`. The **Variabel** tab offers a button that adds both. For sessions, add `SESSION_DRIVER=redis` yourself.
2. Laravel uses the phpredis extension by default. If your image does not have it, install predis, commit `composer.json` and `composer.lock`, then add the variable `REDIS_CLIENT=predis`:

   ```bash
   composer require predis/predis
   ```

3. Add a `php artisan queue:work` worker, see [Workers and Schedules](/en/docs/worker-dan-jadwal).
4. **Redeploy** the project.

## Node

```js
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null, // required for BullMQ workers
});
```

BullMQ needs persistent mode.

## Password

- **Tampilkan password** (show password) is available only to the workspace owner, and Sakala records each use in the workspace audit log.
- **Ganti password** (rotate password) creates a new password. The old one stops working at once, and open connections are closed.
- **Redeploy otomatis proyek yang terpasang** (redeploy attached projects automatically) is checked by default. Sakala then redeploys the live version of every attached project with the same image. Without a redeploy, the application cannot use the store.

## Limits and a full store

| Limit                   | Value                                                                                  |
| ----------------------- | -------------------------------------------------------------------------------------- |
| Number of stores and MB | Per workspace, from its limit profile. Default 0                                       |
| Size per store          | 32, 64, or 128 MB. Reserved from the workspace's allowance from creation, however full |
| Stores per project      | 1                                                                                      |
| Access                  | Only from attached projects                                                            |

When usage reaches 80%, workspace owners and members get a **Valkey hampir penuh** (Valkey nearly full) notification. The size can be changed on the store's page. A persistent store cannot shrink below what it holds now.

A store does not sleep with its projects, so its memory stays in use for as long as it exists.

## Backups and the risk of data loss

- **Persistent:** if the Valkey process crashes, about the last second of writes can be lost. The operator backs up the contents every night, encrypted, and keeps them for about 14 days. If the disk or server fails, data since the last backup is lost, up to about 24 hours.
- **Cache:** no backup.
- The store runs on the same server as your application, so a problem on that server affects both.
- There is no download or self-service restore in the Console yet. Restores from backup are done by a maintainer and are not guaranteed during the pilot.

## Detaching and deleting

- **Lepas Valkey** (detach Valkey) disconnects a project. The running application keeps using the store until it is redeployed.
- A store that is still attached cannot be deleted. Detach it from every project, then press **Hapus Valkey** (delete Valkey) and type its name. Its contents are gone at once and cannot be restored from the Console. For persistent mode, the backup copies remain for about 14 days.
- Deleting a project only detaches its store; the store is not deleted.

## Not supported yet

- Changing the mode after creation.
- Access from outside Sakala, including TLS.
- More than one store per project.
- Sizes above 128 MB.

The reasons behind these limits are in [ADR-023](/en/docs/proyek/adr#adr-023--managed-valkey-for-projects).

## Requesting quota

A Sakala admin grants Valkey quota through the workspace's limit profile. Start a new discussion in [GitHub Discussions, Q&A category](https://github.com/gmedia/sakala/discussions/categories/q-a) on the `gmedia/sakala` repository. Name your workspace, what the store is for, and which mode you need. Discussions are public, so do not post passwords or tokens there. During the limited pilot, not every request can be granted.
