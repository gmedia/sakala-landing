---
# TODO(maintainer): the title, `publishedAt`, and the dates below are
# placeholders. Fill in the real announcement date and effective date (at
# least 7 days after the announcement) before this PR leaves draft.
title: Privacy Notice version 3 takes effect on TODO
description: A new version of the Privacy Notice covers managed buckets, file storage you attach to projects. It takes effect on TODO.
publishedAt: 2099-12-31
lang: en
---

Version `privasi-v3` of the [Privacy Notice](/en/privasi) takes effect on TODO.
Until then, `privasi-v2` still applies. The notice does not ask for your
consent, and you do not need to do anything. The notice is written in
Indonesian, and the Indonesian text is the one that governs.

What changes:

- A new section covers managed buckets, file storage that speaks the S3 API.
  What a bucket holds is your data and your application users' data, and we
  process it only to run your project.
- Bucket contents are stored on Sakala's own servers. Every bucket is backed up
  each night, encrypted, and the copies are kept for about 14 days. Restores
  are done by maintainers after agreeing with the workspace owner.
- Deleting a bucket removes its files from the storage server right away, but
  its copies stay in the backups for about 14 days. A bucket is not deleted
  with a project. Buckets in your personal workspace are deleted with your
  account.
- Only workspace owners and Sakala admins can reveal a bucket's secret key, and
  every reveal is recorded. The endpoint, region, bucket name, and access key
  ID are visible to every workspace member.

We are also sending this summary to the email of every verified account.
Questions can go to [`privacy@sakala.dev`](mailto:privacy@sakala.dev).
