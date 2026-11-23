---
title: Managed Buckets
description: A workspace-owned S3 bucket attached to projects, with AWS_* variables filled in by Sakala. A limited pilot opened per workspace.
track: panduan
section: Deploy guides
order: 4.15
lang: en
---

# Managed Buckets

A managed bucket is a place to store files, such as uploaded images or PDFs, that Sakala creates and runs for you. It speaks the S3 API, so the S3 libraries Laravel and Node already use can read it directly. You attach it to a project, and Sakala fills in the `AWS_*` variables in your application at deploy time, so you never copy a key.

> **Status as of 23 November 2026: a limited pilot opened per workspace.** The default bucket quota of every workspace is 0, so a workspace cannot create buckets until a Sakala admin gives it a quota through its limit profile. Workspaces without a quota see **Workspace ini belum bisa membuat bucket** (this workspace cannot create buckets yet) on the **Bucket** page. The first quotas on `sakala.dev` open only after a version of the [Privacy Notice](/en/privasi) that covers bucket contents takes effect. How to ask is in [Requesting quota](#requesting-quota). Until then, use object storage outside Sakala as described in [File Storage](/en/docs/penyimpanan-file).

The feature also depends on the Sakala server you use. If that server is not connected to a storage server, the **Bucket** page shows **Bucket terkelola belum tersedia di server ini** (managed buckets are not available on this server yet). During the pilot, the storage server runs on the same machine as the applications and managed databases, on a single disk with no live second copy, so a problem on that machine affects all three. There is no uptime guarantee yet, and do not store sensitive data here during the pilot.

## Requesting quota

A Sakala admin grants bucket quota through the workspace's limit profile, the same way as database quota. To ask for it, start a new discussion in [GitHub Discussions, Q&A category](https://github.com/gmedia/sakala/discussions/categories/q-a) on the `gmedia/sakala` repository. Name your workspace, whether it is personal or a team, what the bucket is for, and roughly how large the files are. Discussions are public, so do not post secret keys, tokens, or other secrets there. During the limited pilot, not every request can be granted.

A workspace quota has two numbers: how many buckets, and a storage allowance in MB that is shared out among those buckets.

## What you get

- One S3 bucket with its own access key. That key works for that bucket only, not for any other bucket.
- A bucket that belongs to the workspace, not to one project. It can be created without a project, survives the deletion of projects that use it, and can be attached to several projects in the same workspace.
- Connection variables filled in by Sakala at deploy time, and a secret key you can replace at any time.
- A private bucket. Browsers open files through temporary links your application creates, see [Temporary links](#temporary-links).
- Nightly backups run by the operator, see [Backups and the risk of data loss](#backups-and-the-risk-of-data-loss).

## Creating and attaching a bucket

There are two ways.

**From the Bucket page.** Open **Bucket** in the sidebar, press **Buat bucket** (create bucket), then enter a name and a quota in MB. The name is only shown inside Sakala; the bucket name on the server is random, so temporary links do not reveal your workspace or project names. The quota is prefilled and comes out of the workspace's storage allowance. Once the status is **Siap** (ready), attach it to a project from the bucket page.

**From a project page.** If your workspace still has bucket quota left, the project page offers **Buat bucket untuk proyek ini** (create a bucket for this project). Sakala creates the bucket and attaches it to that project right away.

Workspace owners and members can create, attach, detach, resize, delete a bucket, and replace its secret key. Viewers can only look. Creating a bucket also requires that you have accepted the latest version of Sakala's legal documents, the same as creating a project.

After attaching a bucket, press **Redeploy** on that project so the application receives the bucket variables. As long as the commit and build settings are unchanged, this redeploy [does not rebuild](/en/docs/variabel-dan-secret#redeploy-without-a-build). A project can use only one bucket, because the variable names are fixed.

## Variables filled in by Sakala

Attached projects receive these variables on every later deployment:

| Variable                      | Value                                                                                                                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `AWS_ENDPOINT_URL_S3`         | The S3 endpoint address, for example `https://s3.sakala.app`. Read on its own by AWS SDKs that support per-service endpoints |
| `AWS_ENDPOINT`                | The same address. Read by Laravel's `s3` disk                                                                                |
| `AWS_DEFAULT_REGION`          | The S3 region used to sign requests, for example `us-east-1`. This is not the region your project runs in                    |
| `AWS_REGION`                  | The same region. Read by the AWS SDK for JavaScript v3, which does not read `AWS_DEFAULT_REGION`                             |
| `AWS_BUCKET`                  | The bucket name on the server                                                                                                |
| `AWS_ACCESS_KEY_ID`           | The access key ID. It stays the same when the secret key is replaced                                                         |
| `AWS_SECRET_ACCESS_KEY`       | The secret access key                                                                                                        |
| `AWS_USE_PATH_STYLE_ENDPOINT` | `true`, because this endpoint only accepts _path-style_ addresses, shaped like `https://endpoint/bucket/file`                |

These variables are not stored as project variables. The **Variabel** (Variables) tab lists them separately, without values. If your project has a variable with the same name, the project variable wins, and the Console marks it **Ditimpa proyek** (overridden by the project). Be careful overriding `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY`: your application then sends that key to Sakala's bucket endpoint, and the requests are refused. The Console shows a specific warning for those two names.

Sakala deliberately does not set `AWS_ENDPOINT_URL`. Current AWS SDKs treat that variable as the address for **every** AWS service, not just S3. An application that also uses another AWS service, such as SES for email or SQS for queues, would send those requests to Sakala's storage server. `AWS_ENDPOINT_URL_S3` applies to S3 only. If your application does use SES or SQS with your own AWS keys, give those keys different variable names, for example through `config/services.php` in Laravel, so they do not collide with the bucket's `AWS_ACCESS_KEY_ID`.

Sakala also does not set `FILESYSTEM_DISK` or `AWS_URL`. `FILESYSTEM_DISK` changes where Laravel stores files by default, including files you may want to keep inside the container, so that choice stays yours. `AWS_URL` only serves public buckets, and managed buckets are always private.

After a bucket is detached, the project stops receiving its variables from the next deployment on.

## Laravel

Laravel already has an `s3` disk in `config/filesystems.php` that reads `AWS_ENDPOINT`, `AWS_DEFAULT_REGION`, `AWS_BUCKET`, both keys, and `AWS_USE_PATH_STYLE_ENDPOINT`. What you add:

1. The driver, then commit `composer.json` and `composer.lock`:

   ```bash
   composer require league/flysystem-aws-s3-v3 "^3.0" --with-all-dependencies
   ```

2. The project variable `FILESYSTEM_DISK=s3`, so code that does not name a disk stores to the bucket. For a Laravel project without that variable, the **Variabel** tab shows a **Tambahkan FILESYSTEM_DISK=s3** (add FILESYSTEM_DISK=s3) button that creates it as an ordinary project variable.

3. **Redeploy** the project.

An example of storing an upload and creating a temporary link, code that names the `local` or `public` disk, and the note about `storage:link` are in [File Storage, Laravel section](/en/docs/penyimpanan-file#laravel). All of it applies to managed buckets unchanged.

## Node and other languages

The example `storage.js` module in [File Storage, Node section](/en/docs/penyimpanan-file#node) reads `AWS_ENDPOINT`, `AWS_DEFAULT_REGION`, `AWS_USE_PATH_STYLE_ENDPOINT`, `AWS_BUCKET`, and both keys, so it works with a managed bucket unchanged.

For other SDKs or languages, make sure of two things: the endpoint comes from `AWS_ENDPOINT_URL_S3` or `AWS_ENDPOINT`, and path-style is turned on. The option name differs per SDK, for example `forcePathStyle` in the JavaScript SDK v3. Without path-style, the SDK puts the bucket name in front of the domain, and this endpoint does not serve such addresses.

## Temporary links

Managed buckets are always private. There is no setting to make one public, so a file address without a signature is always refused. For a browser to open a file, your application creates a _presigned URL_, a temporary link signed with the bucket's key that expires after a time you choose. In Laravel that is `Storage::temporaryUrl`, in Node `getSignedUrl`; examples are in [File Storage](/en/docs/penyimpanan-file#laravel).

Create a fresh link every time a page loads, with a short lifetime such as a few minutes. A link already handed out keeps working until it expires, unless the secret key is replaced or a Sakala admin locks the bucket. `Storage::url` and `AWS_URL` are of no use here, because both are meant for public buckets.

## Viewing connection details

The bucket page shows the endpoint, region, bucket name, and access key ID to every workspace member, viewers included. Only the workspace owner can see the secret key, through **Tampilkan secret key** (show secret key), and every time it is shown, Sakala records it in the workspace audit log. Attached projects still receive it automatically.

Once the secret key is shown, the owner can also copy all variables at once from the **Untuk .env di laptop** (for a .env on your laptop) block. Unlike a managed database, the bucket endpoint is reachable from the internet, so the same key works from your laptop or another server. It also means anyone holding the secret key can read and write the bucket's contents. Do not put it in a repository, and replace the secret key if you suspect it has leaked.

## Replacing the secret key

Press **Ganti secret key** (replace secret key) on the bucket page. The access key ID stays the same; only the secret key changes. The old secret key stops working as soon as the storage server replaces it, usually within a few seconds. Running applications still hold the old secret key, so they cannot read or write files until they are redeployed.

That is why **Redeploy otomatis proyek yang terpasang** (automatically redeploy attached projects) is already ticked in the dialog. As soon as the new secret key is active, Sakala redeploys the live version of every attached project, usually without a build. The bucket page then shows each project's status, for example **Sudah memakai secret key baru** (already using the new secret key), or the reason an automatic redeploy was skipped. If you untick it, redeploy each project yourself, and also replace the key anywhere else it is used, such as the `.env` on your laptop.

There is a short window while the storage server is replacing the key but has not confirmed which key is valid. During it, deploying a project that uses this bucket is refused with a message that the bucket's secret key is being replaced (code `BUCKET_KEY_ROTATING`), new pushes are not deployed automatically, and **Tampilkan secret key** is refused too. Wait a few seconds for the replacement to finish, then deploy again. If the storage server cannot confirm the outcome at all, the refusal continues, and the bucket page asks you to press **Ganti secret key** once more to settle it.

If replacing the secret key fails, the old secret key stays valid.

## Quota and limits

Every bucket has a quota in MB, and that quota is a hard limit: an upload that would take the bucket past its quota is refused by the storage server. The quotas of all buckets in a workspace add up and cannot exceed the workspace's storage allowance. An allocated quota counts even while the bucket is still empty.

| Limit                    | Value                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------ |
| Number of buckets and MB | Per workspace, from its limit profile. The default quota is currently 0.             |
| Quota per bucket         | You set it when creating the bucket, and can change it. Uploads past it are refused. |
| Buckets per project      | One. One bucket may be attached to several projects.                                 |
| Access                   | Private only. Files are opened through temporary links.                              |

You can change the quota in the bucket's settings. An increase is checked against what is left of the workspace allowance. Lowering the quota below what the bucket holds is allowed, but new uploads are refused until its contents drop below the quota.

When a bucket's contents reach 80% of its quota, the workspace owners and members get a **Bucket hampir penuh** (bucket almost full) notification. At 100%, the bucket page marks it **Penuh** (full), and new uploads are refused until files are deleted or the quota is raised. Existing files can still be read, and your application can still delete them.

After a quota change, the storage server may answer the first write with `503 SlowDown`, sometimes several times in a row. AWS SDKs retry such requests on their own, so it is usually invisible. If an upload still fails with `SlowDown` right after a quota change, try again a few seconds later.

For large files, SDKs usually send them in parts through a _multipart upload_. The quota is checked when that upload is completed, not per part, so a large upload past the quota is only refused at the end. Parts of an upload that is never completed are discarded by the storage server after about 1 hour.

## Detaching and deleting

Detaching a bucket on the bucket page disconnects it from the project. Its contents stay, and that project stops receiving its variables after the next redeploy.

A bucket still attached to a project cannot be deleted. Detach it from every project first, then delete the bucket from its settings by typing its name. Deleting a bucket immediately removes every file in it, along with its key, from the storage server, and it cannot be undone from the Console. Copies remain in backups for up to about 14 days.

Deleting a project does not delete its bucket; the bucket is only detached. Deleting your account deletes every bucket in your personal workspace. A team that still has buckets cannot be deleted until its buckets are.

## Backups and the risk of data loss

Sakala's operator backs up the contents of every bucket every night in encrypted form, then copies them to another server. Those copies are kept about 14 days. Data you delete, including deleted buckets, may still be in backups during that period.

During the pilot, the storage server keeps buckets on a single disk with no live copy on another disk. If that disk or machine fails, files written after the last backup are lost, which means up to about the last 24 hours. So do not make this bucket the only place you keep important files.

There is no button to download a bucket's contents or restore it in the Console yet. If a bucket needs to be restored from a backup, a maintainer does it, and restores are not guaranteed during the pilot. Questions about this can be asked in [GitHub Discussions, Q&A category](https://github.com/gmedia/sakala/discussions/categories/q-a). Discussions are public, so do not post your secret key or file contents there. You can still copy a bucket's contents yourself at any time with ordinary S3 tools from your laptop, using the keys from **Untuk .env di laptop**.

## Not supported yet

- **Public buckets.** Every bucket is private, with no anonymous access and no bucket policy.
- **Static website hosting** from a bucket.
- **Direct uploads from the browser** to the bucket, because CORS settings are not available yet. For now, send uploads to your application, and let the application store them in the bucket.
- **Downloading bucket contents and self-service restores** from the Console.
- **More than one bucket per project.**

The reasoning behind these limits is in [ADR-021](/en/docs/proyek/adr#adr-021--managed-object-storage-for-projects).

## Next steps

If your workspace cannot create buckets yet, follow [File Storage](/en/docs/penyimpanan-file) to use object storage outside Sakala with the same variable names. For structured data, set up a [managed database](/en/docs/database-terkelola). For how variables work in general, read [Variables and Secrets](/en/docs/variabel-dan-secret).
