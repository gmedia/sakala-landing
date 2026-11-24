---
title: Managed buckets for file storage, limited pilot
description: Workspaces with a quota can now create S3 buckets and attach them to projects, with AWS_* variables filled in by Sakala. Buckets open per workspace during the pilot.
publishedAt: 2026-12-07T10:00:00+07:00
lang: en
---

Starting today, workspaces with a quota can create **buckets**: storage for
files such as uploaded images or PDFs that speaks the S3 API. Files written
inside a container are lost whenever the container stops, so a bucket is the
place for files that must survive a redeploy, a restart, or a project going to
sleep.

A bucket belongs to the workspace, not to one project. Open **Bucket** in the
sidebar to create one, or choose **Buat bucket untuk proyek ini** on a project
page. Once a bucket is attached, press **Redeploy**: your app receives
`AWS_ENDPOINT_URL_S3`, `AWS_ENDPOINT`, `AWS_BUCKET`, the access key, and the
other variables that Laravel's `s3` disk and the AWS SDK for JavaScript read.

Buckets are always private. Browsers open files through temporary links your
app creates. Only workspace owners can reveal the secret key, it can be
replaced at any time, and bucket contents are backed up every night.

During the pilot every workspace starts with a bucket quota of 0. How to ask
for a quota, Laravel and Node examples, and the limits to know about are in
[Managed Buckets](/en/docs/bucket-terkelola).
