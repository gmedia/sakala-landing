---
title: Halaman tidur yang lebih jelas, halaman 404, dan panduan penyimpanan file
description: Pengunjung proyek yang tidur kini melihat perkiraan waktu dan bisa membangunkannya tanpa JavaScript, alamat sakala.app yang kosong menjawab dengan halaman 404 sendiri, dan ada panduan menyimpan berkas di luar container.
publishedAt: 2026-11-23T16:15:00+07:00
lang: id
---

Halaman yang muncul saat proyek sedang tidur ditulis ulang untuk pengunjung.
Judulnya kini **Aplikasi ini sedang dinyalakan**, dengan keterangan bahwa
aplikasinya biasanya siap dalam kurang dari satu menit. Di production, proyek
yang bangun sejauh ini tercatat butuh 3 sampai 11 detik. Tanpa JavaScript, halaman ini
menampilkan tombol **Nyalakan aplikasi**. Halaman juga terus meminta proyek
dibangunkan kalau permintaan pertamanya hilang di jalan, misalnya karena
jaringan pengunjung berganti. Sebelumnya, kasus seperti itu membuat pengunjung
menunggu tanpa ada yang membangunkan proyeknya.

Halaman untuk proyek yang tidak tersedia kini memberi tahu pemilik proyek di
mana alasannya bisa dilihat. Alamat di bawah `sakala.app` yang belum dipakai
proyek mana pun kini menjawab dengan halaman 404 berjudul **Belum ada aplikasi
di alamat ini**, dengan saran memeriksa ejaan alamatnya, menggantikan teks
"Not found" polos.

Berkas yang ditulis aplikasi ke dalam container hilang setiap kali container
berhenti, termasuk saat proyek tidur, di-restart, atau di-deploy ulang.
Panduan [Penyimpanan File](/docs/penyimpanan-file) menjelaskan alasannya dan
cara memakai object storage S3-compatible dari provider luar, dengan contoh
Laravel dan Node. Console juga mengingatkan hal yang sama saat membuat proyek
yang terlihat menyimpan berkas di disk, misalnya aplikasi Laravel.
