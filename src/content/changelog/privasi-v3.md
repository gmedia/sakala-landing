---
title: Pemberitahuan Privasi versi 3 berlaku 7 Desember 2026
description: Versi baru Pemberitahuan Privasi menjelaskan bucket terkelola, tempat menyimpan berkas yang dipasang ke proyek. Mulai berlaku 7 Desember 2026.
publishedAt: 2026-11-30
lang: id
---

[Pemberitahuan Privasi](/privasi) versi `privasi-v3` mulai berlaku 7 Desember 2026. Sampai
tanggal itu, yang berlaku masih `privasi-v2`. Pemberitahuan ini tidak meminta
persetujuanmu, dan kamu tidak perlu melakukan apa pun.

Yang berubah:

- Ada bagian baru tentang bucket terkelola, yaitu tempat menyimpan berkas yang
  memakai API S3. Isi bucket adalah datamu dan data pengguna aplikasimu, dan
  kami memprosesnya hanya untuk menjalankan proyekmu.
- Isi bucket disimpan di server Sakala sendiri. Isi setiap bucket di-backup
  setiap malam dalam bentuk terenkripsi, dan salinannya disimpan sekitar 14
  hari. Pemulihan dikerjakan maintainer setelah sepakat dengan pemilik
  workspace.
- Menghapus bucket langsung menghapus berkasnya dari server penyimpanan,
  tetapi salinannya masih ada di backup sekitar 14 hari. Bucket tidak ikut
  terhapus saat proyek dihapus. Bucket di workspace pribadi ikut dihapus saat
  akunmu dihapus.
- Secret key bucket hanya bisa dibuka pemilik workspace dan admin Sakala, dan
  setiap pembukaannya dicatat. Endpoint, region, nama bucket, dan access key ID
  terlihat oleh semua anggota workspace.

Kami juga mengirim ringkasan ini ke email setiap akun yang sudah terverifikasi.
Pertanyaan bisa dikirim ke [`privacy@sakala.dev`](mailto:privacy@sakala.dev).
