---
title: Workers and Schedules
description: Run a background process such as a queue next to the web process, and scheduled commands as one-off containers. Not enabled on sakala.dev yet.
track: panduan
section: Deploy guides
order: 4.25
lang: en
---

# Workers and Schedules

A worker is a second process of your project that keeps running without an address, for example `php artisan queue:work`. A schedule runs one command at a set time in a new container, and the container is removed afterwards. Both use the same image and variables as the web process.

> **Status as of 26 November 2026: not enabled on `sakala.dev` yet.** The feature is being tested on the staging server. The **Proses** (processes) and **Jadwal** (schedules) sub-pages of a project's settings appear only on Sakala installations that turn it on. The numbers on this page are the defaults in the code and may change before the feature opens.

## Adding a worker

1. Open the project, the **Pengaturan** (settings) tab, then **Proses**.
2. Press **Tambah worker** (add worker). For a Laravel project, the Console offers **Saran untuk Laravel** (suggestion for Laravel); press **Pakai saran ini** (use this suggestion).
3. Fill in **Nama** (name), for example `queue`, and **Perintah** (command).
4. Set **Container**, the number of containers for this worker. `0` keeps the worker without running it.
5. Press **Simpan worker** (save worker), then **Redeploy**. The worker runs from the next deployment, usually [without a build](/en/docs/variabel-dan-secret#redeploy-without-a-build).

The command runs with `sh -c` and must keep running:

| Stack         | Example command                                              |
| ------------- | ------------------------------------------------------------ |
| Laravel       | `php artisan queue:work --sleep=3 --tries=3 --max-time=3600` |
| Node (BullMQ) | `node worker.js`                                             |

A Laravel worker with `--max-time` exits with code 0 every hour. Sakala starts it again and does not count it as a crash.

## How a worker runs

- A worker has no address and no HTTP check. Its memory and CPU follow the project unless you set them under **Memori dan CPU** (memory and CPU).
- During a deploy, a worker must still be running 10 seconds after it starts. If it exits sooner, the deploy fails with `worker_start_failed`, and the previous version keeps running with its workers.
- Once the new version is live, old workers get 30 seconds to stop. For a few seconds both versions can take jobs, so jobs must still work with the previous version's code.
- A project [sleeps](/en/docs/batas-pilot#projects-sleep-after-30-minutes-without-visitors) as one unit. Web and workers stop together, and queued jobs wait until the project wakes. A worker does not keep the project awake.
- **Restart** restarts web and workers. [Rollback](/en/docs/rollback-dan-restart) uses the target version's list of workers.
- If a worker stops on its own after going live, **Proses** marks it **Crash** and Sakala sends an email. Press **Lihat log** (view log) on that worker's row to read its output.

## Creating a schedule

1. Open the **Pengaturan** tab, then **Jadwal**, then **Buat jadwal** (create schedule).
2. Fill in **Nama** and **Perintah**. The command must finish on its own.
3. Under **Kapan** (when), pick from **Pilihan cepat** (quick choices), or write a five-field **Ekspresi cron** (cron expression): minute, hour, day of month, month, day of week. For example, `30 2 * * *` runs every day at 02:30. The Console shows the next three runs.
4. If needed, open **Zona waktu dan batas waktu** (timezone and time limit). The default timezone is WIB (UTC+7), and the default time limit is 300 seconds.
5. Press **Simpan jadwal** (save schedule).

A schedule needs no redeploy, but the project must already have a live deployment. To try the command, press **Jalankan sekarang** (run now) on the schedule's page.

## How a run works

- Each run is a new container from the live deployment's image, with the project's variables. The container is removed when it finishes.
- A run starts within about a minute of its time, not at the exact second.
- Runs still happen while the project sleeps, and they do not wake it.
- If the previous run is still going, the next time is **Dilewati** (skipped).
- If a run cannot start within 10 minutes of its time, it is recorded as **Terlewat** (missed) and not caught up.
- If the workspace is already running as many runs as its limit, a new run is **Menunggu giliran** (waiting).
- A run that passes its time limit is stopped and recorded as **Melewati batas waktu** (timed out).

So a job must be safe to skip and safe to run again. Do not use schedules for work that must happen on time.

## History, logs, and failures

- **Riwayat run** (run history) keeps the last 100 runs of each schedule, with status, duration, and exit code. **Lihat log** opens a run's output, which is kept for 7 days. Run output does not go into the deployment log.
- When a schedule starts failing, Sakala sends one email, and tells you again when it succeeds.
- After 10 runs in a row fail, time out, or are lost, Sakala pauses the schedule and marks it **Dijeda otomatis** (paused automatically). Fix the cause, then press **Aktifkan lagi** (enable again).
- **Hentikan run** (stop run) stops a run in progress. **Jeda** (pause) stops a schedule without deleting it.

## Laravel scheduler

For a Laravel project, **Jadwal** offers `php artisan schedule:run` at the shortest interval allowed, for example every 15 minutes. Laravel only runs tasks that are due in the minute the command starts, so put your Laravel tasks in the same minutes as the Sakala schedule.

Because a run can start up to about a minute after its time, a Laravel task due in that minute can be missed. For an important task, create a separate Sakala schedule that calls its artisan command directly, for example `php artisan report:send` with `0 2 * * *`.

## Limits

| Limit                           | Default                                                                                                     |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Worker containers per workspace | 1. Each worker container also takes one [running container](/en/docs/batas-pilot#limits-per-workspace) slot |
| Workers per project             | 5                                                                                                           |
| Enabled schedules per workspace | 2. Disabled schedules do not count                                                                          |
| Shortest interval between runs  | 15 minutes                                                                                                  |
| Concurrent runs per workspace   | 1                                                                                                           |
| Run time limit                  | 300 seconds, at most 600 seconds                                                                            |
| Start deadline                  | 10 minutes after the scheduled time                                                                         |
| Worker and schedule commands    | One line, at most 1,000 characters                                                                          |

A Sakala admin can give a workspace other limits through a limit profile.

## Not supported yet

- Projects without a web process, such as a bot on its own.
- Schedules that wake the project before running.
- Intervals under 15 minutes for regular workspaces.
- Cron shortcuts such as `@daily`. Write the five fields, for example `0 0 * * *`.

The reasons behind these limits are in [ADR-022](/en/docs/proyek/adr#adr-022--worker-processes-and-scheduled-jobs-for-projects).

## Next steps

A queue needs somewhere to keep its jobs. The options are a database table through Laravel's `database` driver, for example on a [managed database](/en/docs/database-terkelola), or [managed Valkey](/en/docs/valkey-terkelola). A Laravel example with a queue, a worker, and a schedule is at [sakala-examples/laravel-queue](https://github.com/gmedia/sakala-examples/tree/main/laravel-queue); the link works once the example has been reviewed.
