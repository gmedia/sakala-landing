---
title: Quickstart
description: Gambaran awal penggunaan Sakala dari repository menuju URL publik.
order: 2
section: Mulai
---

# Quickstart

Sakala sedang dalam tahap foundation. Alur berikut adalah pengalaman yang sedang dibangun.

## Alur pengguna

1. Masuk ke dashboard pada `app.sakala.dev`.
2. Hubungkan repository Git untuk project yang ingin dijalankan.
3. Pilih deployment dan ikuti log proses secara transparan.
4. Buka URL aplikasi pada pola `nama-project.run.sakala.dev`.

## Pengembangan lokal

Repository `sakala-infra` menyediakan runtime lokal berbasis Docker Compose dan Caddy. Pola domain lokal menggunakan `*.run.sakala.localhost`.

Untuk contributor, setiap repository memiliki panduan setup masing-masing. Landing site ini dapat dijalankan dengan:

```bash
npm install
npm run dev
```
