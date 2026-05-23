---
title: Alur Deployment
description: Model komunikasi dashboard dan agent dalam fondasi Sakala.
order: 4
section: Konsep
---

# Alur Deployment

Pada arah implementasi awal, dashboard membuat command dan agent mengambil pekerjaan secara outbound.

## Siklus command

1. Dashboard menyimpan permintaan deployment sebagai command.
2. Agent melakukan polling terhadap command yang tersedia.
3. Agent melakukan claim sebelum menjalankan pekerjaan.
4. Agent mengirim event dan log yang sudah melalui redaction.
5. Agent melaporkan hasil sukses atau gagal.

## Routing aplikasi

Aplikasi yang berhasil dijalankan akan dipetakan ke domain `*.run.sakala.dev`. Pada playground lokal, pola yang sama diuji melalui `*.run.sakala.localhost`.

Eksekusi Docker, Railpack, dan pembaruan route Caddy belum menjadi fitur publik; area tersebut disiapkan bertahap pada agent dan infra.
