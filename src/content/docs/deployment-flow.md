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

## Routing aplikasi

Aplikasi yang berhasil dijalankan akan dipetakan ke domain `*.run.sakala.dev`. Pada playground lokal, pola yang sama diuji melalui `*.run.sakala.localhost`.

Eksekusi Docker, Railpack, dan pembaruan route Caddy belum menjadi fitur publik; area tersebut disiapkan bertahap pada agent dan infra.
