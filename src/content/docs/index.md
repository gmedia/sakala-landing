---
title: Pengantar Sakala
description: Persoalan yang sedang dikerjakan Sakala, arah rancangannya, dan apa yang sudah maupun belum ada.
track: panduan
section: Mulai
order: 1
---

# Pengantar Sakala

Halaman ini menjelaskan persoalan yang sedang dikerjakan Sakala: membawa project dari repository Git menjadi aplikasi yang bisa dibuka orang lain lewat browser.

Kamu tidak perlu sudah paham Docker, reverse proxy, atau konfigurasi server untuk membacanya. Istilah teknis dijelaskan saat pertama kali muncul.

## Status saat ini, supaya tidak salah harap

Sakala **belum tersedia sebagai layanan publik**. Tidak ada alur deploy yang bisa kamu jalankan hari ini.

Karena itu dokumentasi ini bukan panduan pakai. Yang ada di sini adalah dokumen rancangan: penjelasan tentang persoalannya, keputusan desain yang sudah diambil, dan arah yang sedang dituju.

Yang tetap berguna sekarang:

- memahami kenapa project perlu keluar dari `localhost`;
- membaca [Alur Deployment](/docs/teknis/alur-deployment) sebagai rancangan, bukan janji;
- menyamakan istilah lewat [Glosarium](/docs/glosarium).

Semuanya tetap berlaku walau kamu akhirnya memakai platform lain.

## Kalau kamu ingin memahami mesinnya

Bagian ini sengaja tidak membahas cara Sakala dibangun. Untuk itu ada
[Dokumentasi Teknis](/docs/teknis) yang membahas arsitektur, batas hak istimewa,
alur command, dan cara kerja Agent.

## Alamat yang direncanakan

| Tujuan                    | Alamat             |
| ------------------------- | ------------------ |
| Website dan dokumentasi   | `sakala.dev`       |
| Console                   | `app.sakala.dev`   |
| Aplikasi hasil deployment | `*.run.sakala.dev` |

Dari ketiganya baru `sakala.dev` yang hidup. Console adalah antarmuka tempat project akan dikelola nanti, dan pola `*.run.sakala.dev` berarti tiap aplikasi mendapat sub-alamatnya sendiri.
