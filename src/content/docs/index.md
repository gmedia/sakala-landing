---
title: Panduan Sakala
description: Titik masuk bagi kamu yang ingin memakai Sakala untuk membawa project dari repository menuju alamat publik.
track: panduan
section: Mulai
order: 1
---

# Panduan Sakala

Halaman ini untuk kamu yang ingin **memakai** Sakala: membawa project dari repository Git menjadi aplikasi yang bisa dibuka orang lain lewat browser.

Kamu tidak perlu sudah paham Docker, reverse proxy, atau konfigurasi server untuk mengikuti panduan ini. Istilah teknis akan dijelaskan saat pertama kali muncul.

## Status saat ini, supaya tidak salah harap

Sakala **belum tersedia sebagai layanan publik**. Alur deploy yang dijelaskan di sini adalah pengalaman yang sedang dibangun, bukan sesuatu yang bisa kamu jalankan hari ini.

Yang sudah bisa kamu lakukan sekarang:

- memahami kenapa project perlu keluar dari `localhost`;
- menyiapkan repository supaya siap dideploy ke platform mana pun;
- mempelajari bagaimana kegagalan deployment dibaca dan diperbaiki.

Tiga hal itu tetap berguna walau kamu akhirnya memakai platform lain.

## Kalau kamu ingin memahami mesinnya

Panduan ini sengaja tidak membahas cara Sakala dibangun. Untuk itu ada
[Dokumentasi Teknis](/docs/teknis) yang membahas arsitektur, batas hak istimewa,
alur command, dan cara kerja Agent.

## Alamat yang dipakai Sakala

| Tujuan                    | Alamat             |
| ------------------------- | ------------------ |
| Website dan dokumentasi   | `sakala.dev`       |
| Console                   | `app.sakala.dev`   |
| Aplikasi hasil deployment | `*.run.sakala.dev` |

Console adalah antarmuka tempat kamu nanti mengelola project. Pola `*.run.sakala.dev` berarti tiap aplikasi mendapat sub-alamatnya sendiri.
