---
title: Quickstart
description: Gambaran awal penggunaan Sakala dari repository menuju URL publik.
order: 2
section: Mulai
---

# Quickstart

Sakala sedang dalam tahap foundation. Alur berikut adalah pengalaman yang sedang dibangun.

## Alur yang sedang dituju

1. Pengguna masuk ke Sakala Console pada `app.sakala.dev`.
2. Pengguna menghubungkan repository Git untuk project yang ingin dijalankan.
3. Sakala menampilkan proses deployment dan log secara transparan.
4. Aplikasi yang berhasil dijalankan akan tersedia pada pola `nama-project.run.sakala.dev`.

## Pengembangan lokal

Repository `sakala-infra` menyediakan runtime lokal berbasis Docker Compose dan Caddy. Pola domain lokal menggunakan `*.run.sakala.localhost`.

Untuk contributor, setiap repository memiliki panduan setup masing-masing. Landing site ini dapat dijalankan dengan:

```bash
npm install
npm run dev
```
