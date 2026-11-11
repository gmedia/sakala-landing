---
title: When a Deploy Fails
description: How to read Sakala's failure codes, tell a problem in your application from a fault on Sakala's side, and fix it yourself.
track: panduan
section: Deploy guides
order: 5
lang: en
---

# When a Deploy Fails

A failed deploy can almost always be traced from two places: the summary on the deployment detail page and the Logs panel below it. This page takes you from the failure code to the cause, how to check it, and how to fix it.

The old version does not break with it. Sakala only moves traffic after the new version answers, so if your project has deployed successfully before, the last good version keeps serving visitors while you fix things.

> **Status as of 6 November 2026.** Sakala is not open to the public yet, and this guide has not been tested with pilot users. The codes below follow `DeploymentFailureClassifier` in `sakala-api`. The Console shows its messages in Indonesian, and they are quoted here as they appear on screen.

## Who this is for

This guide is for you if you have just seen a failed deployment. All you need is access to the project in the Console. To try again on your laptop, you need Git and Docker. By the end you will know what broke and who can fix it.

## Start here

1. **Read the summary.** Open the **Riwayat Deployment** tab, choose the failed deployment, then press **Lihat detail error**. You will see the failure code, **Ringkasan** (the summary), **Detail error**, and advice below them. **Detail error** holds concrete facts such as the port, the last status, the exit code, or the memory limit, sometimes in English.
2. **Read the Logs panel.** Start from the last line before it stopped. Logs are kept for 7 days.
3. **Find the code on this page.** Press Ctrl+F and paste the code, for example `runtime_build_failed`.
4. **Fix it, commit, then deploy again.** Deploying again with no change rarely helps when the cause is in your application.

If you ask for help, send the code, the summary, and the relevant part of the log. Check that part first, and do not send environment variable values, tokens, `DATABASE_URL`, or the contents of `.env`. If a secret shows up in a log, treat it as leaked and replace it at the service it came from.

## Where the problem is

For faults on Sakala's side, the advice below the summary is headed **Yang bisa kamu lakukan** (what you can do) and opens with "Ini gangguan di sisi Sakala, bukan kesalahan di aplikasimu" (this is a fault on Sakala's side, not a mistake in your application). If it is headed **Cara memperbaiki** (how to fix it), there is usually something you can fix.

| Category     | In short                                                | What usually needs doing                            |
| ------------ | ------------------------------------------------------- | --------------------------------------------------- |
| `checkout`   | Source code could not be fetched from GitHub            | Check the repository and GitHub access              |
| `build`      | The image was not built                                 | Fix the Dockerfile or dependencies                  |
| `start`      | The image exists, but the application does not stay up  | Read the application log                            |
| `health`     | The application is alive, but does not answer correctly | Check the port and `/`                              |
| `route`      | The public address could not be prepared                | A fault on Sakala's side                            |
| `timeout`    | A time limit was passed                                 | Speed up the build or start                         |
| `resource`   | Out of memory, or the server is full                    | Use less memory, or wait                            |
| `node`       | The Sakala server is not ready                          | A fault on Sakala's side                            |
| `scheduling` | No server has picked up the work yet                    | Try again later                                     |
| `unknown`    | Not recognised yet                                      | See [Unrecognised failures](#unrecognised-failures) |

The two most often confused are build failures and failures while the application runs. A **build failure** means the image never existed, so the answer is in the `docker build` output. A **start or health failure** means the image exists, so the answer is in the application's log and how it behaves when it runs.

## Trying it again on your laptop

These commands repeat what Sakala does. Clone the repository into a new folder so you test what is in the repository, not files on your laptop that were never committed. Replace `OWNER/REPO` with your repository.

```bash
git clone https://github.com/OWNER/REPO.git coba-sakala
cd coba-sakala
docker build -t coba-sakala .
docker run -d --name coba-sakala -e PORT=3000 -p 127.0.0.1:3000:3000 \
  --cap-drop ALL --cap-add CHOWN --cap-add DAC_OVERRIDE --cap-add FOWNER --cap-add FSETID \
  --cap-add KILL --cap-add SETGID --cap-add SETUID --cap-add NET_BIND_SERVICE \
  --security-opt no-new-privileges \
  --memory 256m --cpus 0.5 --pids-limit 128 \
  coba-sakala
curl -i http://127.0.0.1:3000/
docker logs coba-sakala
docker rm -f coba-sakala
```

If `docker build` fails, it is a build failure. If `curl` fails or answers 5xx, it is a start or health failure. These commands only apply to a project with a Dockerfile. Without one, Railpack works out the build and the result can differ.

## Problems you can fix

### Repository and GitHub

#### `repository_not_found`

- **What you see:** "Repository tidak ditemukan di GitHub." (the repository was not found on GitHub)
- **Cause:** The repository was deleted or renamed, or it is private and not connected through the GitHub App.
- **Check:** Run `GIT_TERMINAL_PROMPT=0 git ls-remote https://github.com/OWNER/REPO.git HEAD`, which tries without asking you to log in. If it fails, GitHub does not allow public access to that repository.
- **Fix:** Restore the name, or connect the private repository through the GitHub App, then deploy again.

#### `repository_access_denied`

- **What you see:** "Sakala tidak punya izin untuk membaca repository ini." (Sakala has no permission to read this repository)
- **Cause:** The Sakala GitHub App has not been given access to this repository.
- **Check:** On GitHub, open **Settings**, then **Applications**, then the Sakala GitHub App, and look at the list of allowed repositories.
- **Fix:** Add the repository to that list, then deploy again.

#### `repository_access_revoked`

- **What you see:** "Pemilik project tidak lagi punya akses ke repository ini di GitHub." (the project owner no longer has access to this repository on GitHub)
- **Cause:** Sakala rechecks access before a deployment, and the project owner no longer has access to this private repository.
- **Check:** Open the repository on GitHub with the project owner's account.
- **Fix:** Ask the repository owner to restore the access, then deploy again. If the access is already right, log in again with GitHub so Sakala can check it again.

#### `repository_auth_failed`

- **What you see:** "GitHub menolak akses ke repository ini." (GitHub refused access to this repository)
- **Cause:** A private repository is not connected, or the GitHub App installation is no longer valid.
- **Check:** See whether the repository is private and whether the Sakala GitHub App is still installed.
- **Fix:** Connect it through the GitHub App, or reinstall it if already connected, then deploy again.

#### `repository_credential_unavailable`

- **What you see:** "Sakala tidak mendapat akses sementara ke repository dari GitHub." (Sakala did not get temporary access to the repository from GitHub)
- **Cause:** The GitHub App was removed or lost access, so GitHub gives no temporary permission.
- **Check:** Look at the repository list in the Sakala GitHub App settings.
- **Fix:** Reinstall it or give access again, then deploy again.

#### `repository_commit_not_found`

- **What you see:** "Commit yang mau di-deploy sudah tidak ada di repository, biasanya karena force push." (the commit to deploy is no longer in the repository, usually because of a force push)
- **Cause:** The commit disappeared from the branch after the deployment was created.
- **Check:** Run `git log --oneline -5 origin/BRANCH-NAME` after `git fetch`, then compare it with the commit on the deployment detail page.
- **Fix:** Deploy again so Sakala takes the latest commit from the project's branch.

### Build

#### `runtime_build_failed`

- **What you see:** "Deployment gagal saat proses build aplikasi." (the deployment failed while building the application)
- **Cause:** A build step stopped with an error. Common ones: `package-lock.json` was not committed, a dependency could not be downloaded, a file name in `COPY` is wrong, or the build script failed. A `Dockerfile` that is a symlink leading outside the repository ends up here too.
- **Check:** Read the last line in the Logs panel, then repeat with the [laptop commands](#trying-it-again-on-your-laptop). `git status --short` shows files that were not committed.
- **Fix:** Fix it in the repository, commit, then deploy again. See [Preparing a Dockerfile](/en/docs/dockerfile).

#### Dockerfile not used

This case has no code of its own. If Sakala does not find a file named exactly `Dockerfile`, it uses Railpack, so what you see is a build result you did not expect, or `runtime_build_failed`.

- **Cause:** It is named `dockerfile` in lowercase, it has not been committed, or it is not in the repository root or the project's Root Directory.
- **Check:** Look at the **Builder** row in the Auto Detect stage, which should read **Dockerfile terdeteksi**. Then run `git ls-files | grep -i dockerfile` and confirm the spelling and location.
- **Fix:** Rename or move the file, commit, then deploy again.

#### `runtime_root_directory_invalid`

- **What you see:** "Direktori root project tidak menunjuk folder yang bisa dipakai di repository." (the project's root directory does not point at a usable folder in the repository)
- **Cause:** The project's Root Directory points at a folder that does not exist on this branch, is not a folder, or is a symlink leading outside the repository.
- **Check:** Run `git ls-tree -d HEAD apps/web`, with `apps/web` replaced by the folder you set. If nothing comes back, the folder is not in that commit.
- **Fix:** In the **Pengaturan** tab, correct the **Root Directory** field, for example `apps/web`, or clear it to use the repository root. Save, then press **Redeploy**.

Does your repository hold several applications? See [Deploying a Monorepo](/en/docs/monorepo), including its limits: the build only sees the Root Directory, so lockfiles and workspace packages at the repository root are left out.

### The application on start

#### `runtime_app_crashed`

- **What you see:** "Aplikasi berhenti sendiri sesaat setelah dijalankan." (the application stopped by itself shortly after starting)
- **Cause:** The application process stopped during the start stage, and a single restart already counts as a crash. Common ones: an environment variable is not set, the database connection failed on start, the image needs permissions Sakala restricts, like the regular `nginx` image, or a start command is used on an image without `sh`.
- **Check:** Read the last line in the Logs panel. On your laptop, run `docker inspect --format '{{.State.ExitCode}}' coba-sakala` before removing the container.
- **Fix:** Fill in the variables in the **Environment Variables** tab, do not let the application exit just because the database is not connected yet, or clear **Start command** in the **Pengaturan** tab if your image has no `sh`. Then deploy again. See [Connecting an external database](/en/docs/database-eksternal).

#### `runtime_port_conflict`

- **What you see:** "Environment variable `PORT` di proyek ini berbeda dengan port yang dipakai Sakala untuk aplikasimu." (the project's `PORT` variable differs from the port Sakala uses for your application)
- **Cause:** The project has a `PORT` variable whose value differs from the port Sakala chose, or whose value is not a port number.
- **Check:** Look at the **Environment Variables** tab and **Detail error**, which names both values. Sakala's port is the **Port** field in the **Pengaturan** tab. If that field is empty, Sakala uses the port from `EXPOSE` in the Dockerfile when there is exactly one, and 3000 otherwise. The project page shows the port in use, and a new one if it only applies from the next deploy.
- **Fix:** Delete the `PORT` variable, since Sakala already sets it. If your application really needs another port, fill in the **Port** field in the **Pengaturan** tab. Then deploy again.

### The application does not answer

#### `runtime_app_not_listening`

- **What you see:** "Aplikasi berjalan, tetapi tidak menerima koneksi di port yang ditentukan Sakala." (the application runs, but does not accept connections on the port Sakala set)
- **Cause:** Nothing answered on that port until the start deadline, 2 minutes by default. Usually the application listens on `localhost` or `127.0.0.1`, uses a fixed port, or starts too slowly.
- **Check:** Run the [laptop commands](#trying-it-again-on-your-laptop) and look at the address in the log. While the container runs, `docker exec coba-sakala netstat -ltn` shows the listening address on an Alpine image. The right one is `0.0.0.0:3000` or `:::3000`.
- **Fix:** Listen on `0.0.0.0` and read the port from `PORT`, then deploy again. If your application's port is hard to change, set the **Port** field in the **Pengaturan** tab to match it, or write that port as the only `EXPOSE` in the Dockerfile. See [Why the address and port matter](/en/docs/dockerfile#why-the-address-and-port-matter).

#### `runtime_app_unhealthy`

- **What you see:** "Aplikasi merespons pengecekan dari Sakala dengan error server (status 500 ke atas)." (the application answered Sakala's check with a server error, status 500 or above)
- **Cause:** `/` kept answering 5xx until the deadline. Usually that page calls a database or another service that fails.
- **Check:** Run `curl -i http://127.0.0.1:3000/` on your laptop, then read the error in the Logs panel. A status under 500, including 404, already passes.
- **Fix:** Fix the error, or make `/` independent of other services, then deploy again.

#### `runtime_health_check_failed`

- **What you see:** "Aplikasi berjalan, tetapi tidak menerima koneksi di port yang ditentukan Sakala." The summary is the same as `runtime_app_not_listening`, but the cause is different.
- **Cause:** This code appears when the `HEALTHCHECK` in your Dockerfile reports `unhealthy`, or is still `starting` at the deadline. It can also be because its command uses a tool the image does not have, such as `curl` on an Alpine image.
- **Check:** While the container runs on your laptop, run `docker inspect --format '{{json .State.Health}}' coba-sakala`.
- **Fix:** Correct the `HEALTHCHECK` command or remove the line, since Sakala already checks `/`, then deploy again.

### Time and memory limits

#### `runtime_timeout`

- **What you see:** "Build atau start aplikasi melewati batas waktu yang ditetapkan Sakala." (the build or start passed the time limit Sakala set)
- **Cause:** The pilot defaults are 10 minutes for the build, 2 minutes from start until it answers, and 15 minutes overall. These limits cannot be changed from a project.
- **Check:** Look for the slow stage in the Logs panel, then measure with `time docker build --no-cache -t coba-sakala .` on your laptop. Your laptop can be faster than the server, because CPU on Sakala is limited.
- **Fix:** Cut dependencies and build steps, or speed up the application's start, then deploy again.

#### `runtime_app_out_of_memory`

- **What you see:** "Aplikasi dihentikan karena memakai memory melebihi batas." (the application was stopped for using more memory than allowed)
- **Cause:** The application passed the project's memory limit, which is stated in **Detail error**. The pilot default is 256 MB, with a maximum of 512 MB.
- **Check:** Run the application on your laptop with `--memory 256m`, then look at `docker stats --no-stream coba-sakala`. After it stops, `docker inspect --format '{{.State.OOMKilled}}' coba-sakala` answers `true` if memory was the cause.
- **Fix:** Reduce the number of workers, the cache size, or the data loaded on start, then deploy again.

## Faults on Sakala's side

For the codes below, there is nothing to change in your repository. You cannot inspect Sakala's servers from outside, so the check is the same for all of them: confirm the code is on this list, then see whether the old version is still serving.

What you can do is deploy again. It often helps, but it is not guaranteed. If the same code comes back, do not keep repeating it. Report it as described in [Unrecognised failures](#unrecognised-failures).

| Code                                                                                                                                                                          | What you see                                                                                                                     | Cause                                                                  | What you can do                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------- |
| `repository_credential_expired`                                                                                                                                               | "Akses sementara Sakala ke repository habis masa berlakunya sebelum source code selesai diambil."                                | Fetching the source took so long the permission ran out                | Deploy again. Sakala asks GitHub for new access |
| `repository_access_check_failed`                                                                                                                                              | "Sakala tidak bisa memeriksa akses repository ke GitHub saat ini." (Sakala cannot check repository access with GitHub right now) |
| `repository_checkout_failed`, `runtime_repository_failed`                                                                                                                     | "Sakala gagal mengambil source code dari GitHub."                                                                                | A Git process failed on the server, for example because of the network | Deploy again. Report it if it comes back        |
| `runtime_execution_failed`, `runtime_container_failed`, `runtime_workload_not_found`, `runtime_workload_not_running`, `runtime_reporting_failed`, `runtime_filesystem_failed` | "Sakala gagal menjalankan container aplikasi."                                                                                   | A Docker command, working files, or reporting failed on the server     | Deploy again. Report it if it comes back        |
| `runtime_routing_failed`                                                                                                                                                      | "Sakala gagal menyiapkan alamat publik untuk aplikasi."                                                                          | The route to the application could not be activated                    | Deploy again. Report it if it comes back        |
| `command_lease_expired`                                                                                                                                                       | "Server Sakala berhenti merespons sebelum deployment selesai."                                                                   | The server did not report back before the deadline                     | Deploy again. Report it if it comes back        |
| `command_expired`                                                                                                                                                             | "Belum ada server Sakala yang tersedia untuk menjalankan deployment."                                                            | No server picked up this work                                          | Deploy again in a few minutes                   |
| `runtime_capacity_exceeded`                                                                                                                                                   | "Kapasitas server Sakala sedang penuh."                                                                                          | The server already runs too many applications                          | Deploy again in a few minutes                   |
| `runtime_disk_pressure`                                                                                                                                                       | "Ruang disk server Sakala sedang hampir penuh."                                                                                  | The server's disk is nearly full                                       | Deploy again in a few minutes                   |
| `runtime_preflight_failed`, `runtime_dependency_failed`, `invalid_runtime_configuration`, `invalid_runtime_command`, `unsupported_runtime_command`                            | "Server Sakala belum siap menjalankan deployment."                                                                               | A server check failed, or a command from the API could not be used     | Deploy again. Report it if it comes back        |
| `runtime_cancelled`                                                                                                                                                           | "Deployment dibatalkan karena server Sakala sedang berhenti atau dialihkan."                                                     | The deployment was stopped, by the server or by a cancel request       | Deploy again. Nothing needs changing            |

## A deployment stuck in the queue

A deployment waiting for a server has no deadline, so it can sit at **Deployment mengantre** (queued) with no failure code at all. Meanwhile, the active deployment limit can reject your next deploy. There is nothing to change in your repository. You can press **Batalkan deployment** (cancel the deployment). If the queue does not move, report it as described in the next section.

## Unrecognised failures

Any code not listed on this page falls into the `unknown` category, with the summary "Deployment gagal karena terjadi kesalahan yang belum dikenali." (the deployment failed because of an error not recognised yet). Sakala does not know whether the cause is in your application or on the server.

1. Read the Logs panel, because the answer may be there.
2. Deploy again once. The result is not guaranteed.
3. If it fails again, note the failure code, the project name, the time, and the relevant log lines, without secret values.
4. Tell the maintainer or mentor who invited you to the pilot, or open an [issue on `sakala-api`](https://github.com/gmedia/sakala-api/issues). Issues are public, so check the contents again.

The **Kirim Masukan** form in the Console, and the **Kirim masukan** link on a finished deployment page, help the team improve Sakala. The form is not a support channel, so you may not get a reply. Do not write secrets there. There is no promised response time or official support, because Sakala is still in development.

## Confirm it has recovered

A deploy has recovered when its status is successful and its public address answers. From a terminal, replace this address with your project's URL:

```bash
curl -I https://PROJECT-NAME.run.sakala.dev/
```

A status under 500 means the application answers. Still open the page in a browser, because Sakala's check only confirms the application answers, not that every feature is right.

## Next steps

To start over from the beginning, follow [Your First Deploy](/en/docs/deploy-pertama). For examples that have been tried, open [Preparing a Dockerfile](/en/docs/dockerfile). If the problem is in your data connection, open [Connecting an external database](/en/docs/database-eksternal). If your repository holds several applications, open [Deploying a Monorepo](/en/docs/monorepo). For the order of stages behind the scenes, read [Deployment Flow](/en/docs/teknis/alur-deployment).
