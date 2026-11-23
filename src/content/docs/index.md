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

Sakala hosted sedang dalam **tahap pilot terbuka**. Siapa pun bisa [mendaftar di Console](https://app.sakala.dev/register) dan memakainya tanpa biaya, dengan batas proyek, container, dan build per jam, serta proyek yang tidur setelah 30 menit tanpa pengunjung. Belum ada jaminan uptime, jadi Sakala belum cocok untuk aplikasi yang penting. Rinciannya ada di [Batas Pilot](/docs/batas-pilot), dan perkembangan terbarunya di [Changelog](/changelog).

Sebagian halaman di sini adalah panduan pakai, sebagian lagi dokumen rancangan: penjelasan tentang persoalannya, keputusan desain yang sudah diambil, dan arah yang sedang dituju.

Panduan pakai:

- [Deploy Pertamamu](/docs/deploy-pertama), langkah demi langkah sampai punya URL publik;
- [Menyiapkan Dockerfile](/docs/dockerfile) dengan contoh yang sudah dicoba;
- [Variabel dan secret](/docs/variabel-dan-secret), termasuk kapan perubahan butuh build ulang;
- [Database terkelola](/docs/database-terkelola), yang masih pilot terbatas, dan [menghubungkan database eksternal](/docs/database-eksternal) sebagai pilihan lain;
- [Database dan perintah rilis](/docs/perintah-rilis), untuk menjalankan migration sekali setiap deployment;
- [Penyimpanan file](/docs/penyimpanan-file), karena berkas di dalam container hilang setiap kali deploy;
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

| Tujuan                    | Alamat           |
| ------------------------- | ---------------- |
| Website dan dokumentasi   | `sakala.dev`     |
| Console                   | `app.sakala.dev` |
| Aplikasi hasil deployment | `*.sakala.app`   |

Console adalah antarmuka tempat project dikelola, dan pola `*.sakala.app` berarti tiap aplikasi mendapat sub-alamatnya sendiri, di domain yang [sengaja dipisah](/docs/faq#mengapa-aplikasi-ada-di-sakalaapp-bukan-sakaladev) dari `sakala.dev`.
