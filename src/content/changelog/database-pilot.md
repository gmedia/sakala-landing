---
title: Pilot terbatas database PostgreSQL terkelola
description: Database PostgreSQL milik workspace, yang dipasang ke proyek dengan DATABASE_URL dan DB_* dari Sakala, mulai diuji di sakala.dev untuk beberapa workspace saja.
publishedAt: 2026-11-23
lang: id
---

Mulai hari ini, database PostgreSQL terkelola berjalan di `sakala.dev` sebagai
pilot terbatas. Database ini milik workspace, bisa dipasang ke satu atau
beberapa proyek, dan Sakala mengisi `DATABASE_URL` serta variabel `DB_*` di
aplikasimu saat deploy. Migration dijalankan lewat perintah rilis, password
bisa diganti dengan redeploy otomatis proyek yang terpasang, dan setiap
database di-backup setiap malam.

Pilot ini sengaja kecil. Kuota database bawaan setiap workspace adalah 0,
dan database hanya dibuka untuk beberapa workspace yang diberi kuota oleh
admin. Selama pilot, server database berjalan di mesin yang sama dengan
aplikasi, belum ada jaminan uptime, dan pemulihan dari backup dilakukan
maintainer, belum dari Console.

Kalau workspace-mu belum bisa membuat database, database eksternal tetap jalan
yang didukung. Cara kerja dan batasnya ada di
[Database Terkelola](/docs/database-terkelola).
