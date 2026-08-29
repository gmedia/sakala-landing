---
title: Dokumentasi Teknis
description: Peta arsitektur Sakala, batas hak istimewa, alur runtime, dan model keamanannya.
track: teknis
section: Mulai
order: 1
---

# Dokumentasi Teknis

Halaman ini untuk kamu yang ingin memahami **bagaimana Sakala dibangun**, entah karena ingin berkontribusi, mengaudit keputusan teknisnya, atau sekadar penasaran cara kerja sebuah platform deployment.

Kalau yang kamu cari adalah cara memakai Sakala, [Panduan Sakala](/docs) adalah tempat yang tepat.

## Yang perlu diketahui lebih dulu

Sakala terdiri dari beberapa repository dengan tanggung jawab terpisah. Pemisahan itu bukan soal kerapian, melainkan batas hak istimewa: hanya satu komponen yang boleh menyentuh Docker dan mengubah routing.

Satu aturan yang menjelaskan hampir seluruh bentuk arsitekturnya:

```txt
Sakala API tidak boleh mengakses Docker socket.
```

Dari aturan itu lahir model command yang diambil secara outbound, pemisahan control plane dan data plane, serta pembagian antara penetapan resource dan penerapannya.

## Status implementasi

Fondasi sudah dapat diuji sebagai sistem, tetapi belum menjadi layanan hosted. Dokumentasi ini menjelaskan kontrak dan arah yang disepakati, bukan menyatakan semuanya sudah berjalan di production.

Bila sebuah bagian masih berupa rencana, hal itu dinyatakan di halaman terkait.

## Sumber yang lebih dalam

Dokumen arsitektur, keputusan teknis, dan roadmap lengkap berada pada repository project. Halaman-halaman di sini adalah ringkasan yang dijaga tetap sejalan dengannya.
