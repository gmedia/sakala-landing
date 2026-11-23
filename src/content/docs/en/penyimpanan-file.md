---
title: File Storage
description: Files your application writes inside its container are lost on every deploy. Keep uploads and other files in S3-compatible object storage, and data in a database.
track: panduan
section: Deploy guides
order: 4.1
lang: en
---

# File Storage

Sakala does not provide file storage for projects yet. Files your application writes inside its container, such as images uploaded by users, Laravel's `storage/app`, or a SQLite file, are gone each time a new deploy finishes. Keep files like these in S3-compatible object storage outside Sakala, and keep structured data in a database.

> **Status of this guide as of 23 November 2026.** The code on this page has been run locally against two S3-compatible object stores in Docker, Garage 2.5.0 and RustFS 1.0.6: Laravel 13 with `league/flysystem-aws-s3-v3` 3.35, and Node 24 with the AWS SDK for JavaScript v3. It has not been tried against a real provider or through Sakala in production.

## Why files are lost

Every deployment creates a new container from your application's image. The old container, with every file written into it, is removed once the new version is running. Sakala does not mount folders from the server into application containers either, so nothing outside the container survives with it.

| Event                                                               | Files written inside the container                 |
| ------------------------------------------------------------------- | -------------------------------------------------- |
| The project sleeps, then wakes for a visitor                        | Kept, because the same container starts again      |
| **Restart** in the Console                                          | Kept, because the same container is restarted      |
| A deploy from a new push, **Redeploy**, or redeploy without a build | Lost, because a deployment creates a new container |
| **Kembalikan ke versi ini** (go back to this version)               | Lost, because going back is a deployment too       |
| The project is deleted                                              | Lost                                               |

If your project runs with several replicas, each replica has its own filesystem. A file uploaded through the first replica is not visible to the second, so visitors may see an image appear and then disappear depending on which replica serves them.

Even though files survive sleep and **Restart**, do not rely on it. The next deploy removes them anyway.

## What to use instead

- **Structured data**, such as user accounts, orders, or post content, belongs in a database: a [managed database](/en/docs/database-terkelola), still a limited pilot, or an [external database](/en/docs/database-eksternal).
- **Files**, such as uploaded images, PDFs, or exports, belong in object storage, a service that keeps files in _buckets_ and serves them over HTTP. Choose one that is **S3-compatible**, meaning it speaks the same API as Amazon S3, so the same libraries work across many providers.
- **Temporary files**, such as caches or output you can regenerate, may stay in the container, for example in `/tmp`, as long as your application does not break when they disappear.

## Choosing a provider

For now, object storage for a project on Sakala means a provider outside Sakala, for example Cloudflare R2, Amazon S3, or Backblaze B2. These names are only examples. Sakala has no official integration with them and has not been tested with them.

What to check before choosing:

- **Free tier and its limits.** Look at storage size, request counts, and outbound transfer costs on the provider's pricing page. The numbers change, so check them there.
- **Private access.** Keep the bucket private, and let browsers fetch files through temporary links your application creates. The Laravel and Node examples below show how.
- **Access keys per bucket.** Prefer a provider that can create an access key valid for one bucket only. If that key leaks, only that bucket is exposed, not your whole account.

From the provider you need five values: the endpoint address, the region, the bucket name, the access key ID, and the secret access key. Also check the provider's instructions for whether it uses _path-style_ addresses, shaped like `https://endpoint/bucket-name/file`, or addresses with the bucket name in front of the domain.

## Storing the keys in Sakala

Enter the provider's values as variables in your project's **Variabel** (Variables) tab. This guide uses the names Laravel's default configuration already reads, so the Node and Laravel examples share them:

| Variable                      | Value                                                                   |
| ----------------------------- | ----------------------------------------------------------------------- |
| `AWS_ENDPOINT`                | The provider's endpoint address, starting with `https://`               |
| `AWS_DEFAULT_REGION`          | The provider's region                                                   |
| `AWS_BUCKET`                  | The bucket name                                                         |
| `AWS_ACCESS_KEY_ID`           | The access key ID                                                       |
| `AWS_SECRET_ACCESS_KEY`       | The secret access key. Tick **Simpan sebagai secret** (store as secret) |
| `AWS_USE_PATH_STYLE_ENDPOINT` | `true` if the provider uses path-style addresses, otherwise `false`     |
| `FILESYSTEM_DISK`             | Laravel only: `s3`, so files go to the bucket by default                |

Do not put these values in the repository, in a committed `.env`, or in the Dockerfile. After saving, press **Redeploy**. These variables are read while the application runs, so a [redeploy without a build](/en/docs/variabel-dan-secret#redeploy-without-a-build) is usually enough. Secrets are covered in full in [Variables and Secrets](/en/docs/variabel-dan-secret#secrets).

## Laravel

Laravel already has an `s3` disk in `config/filesystems.php` that reads the variables above. All you add is the driver:

```bash
composer require league/flysystem-aws-s3-v3 "^3.0" --with-all-dependencies
```

Commit `composer.json` and `composer.lock`. Then set the variables from the table above, including `FILESYSTEM_DISK=s3`. Laravel's default `.env.example` does not list `AWS_ENDPOINT`, but `config/filesystems.php` still reads it.

With `FILESYSTEM_DISK=s3`, code that does not name a disk stores straight to the bucket:

```php
// Store an upload in the bucket. $path holds, for example, "avatars/a1b2c3.jpg".
$path = $request->file('photo')->store('avatars');

// A temporary link so the browser can open the file from a private bucket.
$url = Storage::temporaryUrl($path, now()->addMinutes(10));
```

Code that names the `local` or `public` disk, for example `->store('avatars', 'public')`, still writes inside the container, and those files are still lost on deploy. Change the disk to `s3`, or drop that argument. `php artisan storage:link` does not help on Sakala either, because the folder it links to lives inside the container.

`Storage::url($path)` is only useful for a public bucket. It builds the address from `AWS_URL`, the bucket's public address given by the provider. For a private bucket, use `Storage::temporaryUrl`.

## Node

Install the AWS SDK for JavaScript v3, and make sure `package-lock.json` is committed:

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

An example `storage.js` module that reads the same variables as Laravel:

```js
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  endpoint: process.env.AWS_ENDPOINT,
  region: process.env.AWS_DEFAULT_REGION,
  forcePathStyle: process.env.AWS_USE_PATH_STYLE_ENDPOINT === "true",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const bucket = process.env.AWS_BUCKET;

// Store a file, for example an upload, in the bucket.
async function saveFile(key, body, contentType) {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
}

// A temporary link so the browser can open the file from a private bucket.
function fileUrl(key, seconds = 600) {
  return getSignedUrl(s3, new GetObjectCommand({ Bucket: bucket, Key: key }), {
    expiresIn: seconds,
  });
}

module.exports = { saveFile, fileUrl };
```

In your upload route, call `saveFile("avatars/" + fileName, fileBody, fileType)` and store the key in your database. When a page needs to show the file, create a link with `await fileUrl(key)`. The link expires after `seconds` seconds, so create a fresh one each time the page loads instead of storing it.

`region` and `endpoint` are set in code because the JavaScript SDK does not read `AWS_DEFAULT_REGION` or `AWS_ENDPOINT` on its own.

## SQLite files

SQLite keeps the whole database in one file, so on Sakala that file, with all its data, is lost on every deploy. If your project has several replicas, each replica also has its own SQLite database with different contents.

Laravel 11 and later use SQLite by default (`DB_CONNECTION=sqlite`) and keep sessions, cache, and the job queue in that same database. Unless you change it, users are also logged out on every deploy. Move to PostgreSQL with a [managed database](/en/docs/database-terkelola) or an [external database](/en/docs/database-eksternal).

## What comes next

Managed object storage, meaning buckets that Sakala creates and runs and that you attach to projects like a managed database, is being designed in [ADR-021](/en/docs/proyek/adr#adr-021--managed-object-storage-for-projects). It is still a proposal and has no date. The design uses the same `AWS_*` variable names as this guide, but that is not final.

## Next steps

If your application also stores data, set up a [managed database](/en/docs/database-terkelola) or an [external database](/en/docs/database-eksternal). For how variables work in general, read [Variables and Secrets](/en/docs/variabel-dan-secret).
