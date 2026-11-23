---
title: Pemberitahuan Privasi versi 2 berlaku 30 November 2026
description: Versi baru Pemberitahuan Privasi menjelaskan database terkelola dan salinan backup di server kedua. Mulai berlaku 30 November 2026.
publishedAt: 2026-11-23
lang: id
---

[Pemberitahuan Privasi](/privasi) versi `privasi-v2` mulai berlaku 30 November 2026. Sampai tanggal itu, yang berlaku masih `privasi-v1`. Pemberitahuan ini
tidak meminta persetujuanmu, dan kamu tidak perlu melakukan apa pun.

Yang berubah:

- Ada bagian baru tentang database PostgreSQL terkelola. Isi database adalah
  datamu dan data pengguna aplikasimu, dan kami memprosesnya hanya untuk
  menjalankan proyekmu.
- Setiap database terkelola di-backup setiap malam dalam bentuk terenkripsi,
  dan salinannya disimpan sekitar 14 hari. Pemulihan dikerjakan maintainer,
  tidak pernah sebagai superuser.
- Menghapus database langsung menghapusnya dari server database, tetapi
  salinannya masih ada di backup sekitar 14 hari. Database tidak ikut terhapus
  saat proyek dihapus. Database di workspace pribadi ikut dihapus saat akunmu
  dihapus.
- Password database hanya bisa dibuka pemilik workspace dan admin Sakala, dan
  setiap pembukaannya dicatat. Host, port, nama database, dan user terlihat
  oleh semua anggota workspace.
- Backup data akun dan proyek kini juga disalin, tetap terenkripsi, ke server
  kedua di pusat data yang sama.
- Daftar email kini lengkap, termasuk undangan workspace dan email notifikasi
  proyek yang bisa kamu atur sendiri. Pembatasan lalu lintas keluar dari
  container pengguna kini disebut sebagai pengaman yang sudah berjalan.

Kami juga mengirim ringkasan ini ke email setiap akun yang sudah terverifikasi.
Pertanyaan bisa dikirim ke [`privacy@sakala.dev`](mailto:privacy@sakala.dev).
