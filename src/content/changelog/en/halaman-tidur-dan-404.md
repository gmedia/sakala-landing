---
title: A clearer sleeping page, a 404 page, and a file storage guide
description: Visitors of a sleeping project now see a time estimate and can wake it without JavaScript, an unused sakala.app address answers with its own 404 page, and a guide explains how to keep files outside the container.
publishedAt: 2026-11-23T16:15:00+07:00
lang: en
---

The page shown while a project sleeps was rewritten for visitors. It is now
titled **Aplikasi ini sedang dinyalakan** (this application is starting) and
says the application is usually ready in under a minute. In production, the
wakes recorded so far took 3 to 11 seconds. Without JavaScript, the page
shows a **Nyalakan aplikasi** (start the application) button. The page also
keeps asking for the project to wake when its first request gets lost, for
example because the visitor's network changed. Before, a case like that left
visitors waiting while nothing woke the project.

The page for an unavailable project now tells the project's owner where to see
the reason. An address under `sakala.app` that no project uses yet now answers
with a 404 page titled **Belum ada aplikasi di alamat ini** (no application at
this address yet), with a hint to check the spelling, instead of a plain
"Not found".

Files an application writes inside its container are lost every time the
container stops, including when the project sleeps, restarts, or is deployed
again. The [File Storage](/en/docs/penyimpanan-file) guide explains why and how
to use S3-compatible object storage from an outside provider, with Laravel and
Node examples. Console also gives the same reminder when you create a project
that looks like it keeps files on disk, such as a Laravel application.
