---
title: Pengantar Sakala
description: Persoalan yang sedang dikerjakan Sakala, arah rancangannya, dan apa yang sudah maupun belum bisa dipakai.
track: panduan
section: Mulai
order: 1
---

# Pengantar Sakala

Halaman ini menjelaskan persoalan yang sedang dikerjakan Sakala: membawa project dari repository Git menjadi aplikasi yang bisa dibuka orang lain lewat browser.

Kamu tidak perlu sudah paham Docker, reverse proxy, atau konfigurasi server untuk membacanya. Istilah teknis dijelaskan saat pertama kali muncul.

## Status saat ini, supaya tidak salah harap

Sakala **belum dibuka untuk umum**. Jalur deploy dari repository sampai URL publik sudah ada dan pernah terbukti di staging, tetapi pendaftarannya belum terbuka, dan jalur itu belum teruji bersama pengguna pilot atau di production. Status per 6 November 2026 ada di [MVP](/docs/proyek/mvp).

Karena itu sebagian besar halaman di sini masih dokumen rancangan: penjelasan tentang persoalannya, keputusan desain yang sudah diambil, dan arah yang sedang dituju.

Panduan pakai baru sebagian ada, terutama untuk peserta pilot:

- [Deploy Pertamamu](/docs/deploy-pertama), langkah demi langkah sampai punya URL publik;
- [Menyiapkan Dockerfile](/docs/dockerfile) dengan contoh yang sudah dicoba;
- [Menghubungkan database eksternal](/docs/database-eksternal), karena Sakala belum menyediakan database;
- [Saat deploy gagal](/docs/deploy-gagal), untuk membaca kode kegagalan dan memperbaikinya.

Yang tetap berguna walau kamu akhirnya memakai platform lain:

- memahami kenapa project perlu keluar dari `localhost`;
- membaca [Alur Deployment](/docs/teknis/alur-deployment) untuk memahami tahapannya;
- menyamakan istilah lewat [Glosarium](/docs/glosarium).

## Kalau kamu ingin memahami mesinnya

Bagian ini sengaja tidak membahas cara Sakala dibangun. Untuk itu ada
[Dokumentasi Teknis](/docs/teknis) yang membahas arsitektur, batas hak istimewa,
alur command, dan cara kerja Agent.

## Alamatnya

| Tujuan                    | Alamat             |
| ------------------------- | ------------------ |
| Website dan dokumentasi   | `sakala.dev`       |
| Console                   | `app.sakala.dev`   |
| Aplikasi hasil deployment | `*.run.sakala.dev` |

Console adalah antarmuka tempat project dikelola, dan pola `*.run.sakala.dev` berarti tiap aplikasi mendapat sub-alamatnya sendiri. Selama pendaftaran belum dibuka untuk umum, keduanya belum bisa dipakai oleh siapa saja.
