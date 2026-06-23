---
title: Alur Deployment
description: Model komunikasi console, API, dan agent dalam fondasi Sakala.
order: 4
section: Konsep
---

# Alur Deployment

Pada arah implementasi awal, console mengirim intent pengguna ke API. API membuat command dan agent mengambil pekerjaan secara outbound.

## Siklus command

1. Console mengirim permintaan deployment ke API.
2. API memvalidasi permintaan dan menyimpannya sebagai command.
3. Agent melakukan polling terhadap command yang tersedia.
4. Agent melakukan claim sebelum menjalankan pekerjaan.
5. Agent mengirim event dan log yang sudah melalui redaction.
6. Agent melaporkan hasil sukses atau gagal ke API.

Polling hanya menawarkan pekerjaan yang eligible. Agent belum boleh mengeksekusi command sebelum claim atomik berhasil. Command yang sudah diklaim atau selesai tidak dikembalikan lagi sebagai pekerjaan pending biasa.

## Routing aplikasi

Aplikasi yang berhasil dijalankan akan dipetakan ke domain `*.run.sakala.dev`. Pada playground lokal, pola yang sama diuji melalui `*.run.sakala.localhost`.

Fondasi MVP agent sudah menyediakan eksekusi Dockerfile/Railpack dan pembaruan route Caddy secara opt-in. Fitur tersebut belum menjadi layanan hosted publik dan masih membutuhkan integrasi Agent API serta runtime node yang dikonfigurasi untuk pilot.

Detail operating mode dan batas runtime dijelaskan pada [Cara kerja Sakala Agent](/docs/agent-runtime).
