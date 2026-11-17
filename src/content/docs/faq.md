---
title: Pertanyaan Umum
description: Jawaban ringkas tentang status, sasaran, dan kontribusi Sakala.
track: referensi
section: Referensi
order: 2
---

# Pertanyaan Umum

## Apa itu Sakala?

Sakala adalah platform deployment open-source yang membawa project dari repository Git menjadi aplikasi yang dapat dibuka dan dibagikan. Ia diinisiasi oleh Sakala Maintainers, didukung GMEDIA sebagai founding sponsor, dan masih dalam pengembangan aktif — belum tersedia sebagai layanan publik.

## Apakah Sakala dapat langsung dipakai production?

Belum. Sakala masih dalam pengembangan aktif dan belum dibuka untuk umum. Jalur deploy-nya sudah ada, tetapi belum teruji bersama pengguna pilot atau di production.

## Apakah platform ini hanya untuk mahasiswa?

Tidak. Sakala juga relevan untuk developer pemula, pengajar, komunitas, dan tim kecil yang membutuhkan deployment project yang sederhana.

## Mengapa open source?

Deployment lebih bermanfaat untuk pembelajaran bila alur, kontrak, dan trade-off teknisnya dapat dibaca serta diperbaiki bersama.

## Apa peran GMEDIA di Sakala?

GMEDIA adalah sponsor pendiri dan infrastructure supporter untuk fase awal Sakala. Dukungan ini mencakup domain, infrastruktur, ruang eksperimen, dan dukungan teknis agar Sakala dapat mencapai MVP dan pilot awal.

Sakala tetap dikembangkan sebagai project open-source dengan roadmap, dokumentasi, issue, dan kontribusi publik. Sponsor tidak otomatis mengontrol keputusan teknis, prioritas roadmap, perubahan lisensi, atau hak contributor.

## Mengapa aplikasi ada di `sakala.app`, bukan `sakala.dev`?

Aplikasi hasil deployment mendapat alamat `<slug>.sakala.app`, sedangkan website, dokumentasi, Console, dan API tetap di `sakala.dev`. Keduanya sengaja dipisah karena aplikasi di Sakala adalah kode milik pengguna yang bisa dibuka siapa saja.

Alamat gratis dengan HTTPS otomatis sering disalahgunakan untuk halaman phishing. Kalau satu aplikasi seperti itu membuat browser atau filter email memblokir domainnya, yang terkena adalah `sakala.app`, sehingga website, dokumentasi, dan Console tetap bisa dibuka. Cookie dari `sakala.dev`, termasuk cookie login Console, juga tidak pernah terkirim ke aplikasi pengguna.

Tiap proyek mendapat subdomain sendiri dan berjalan di container-nya sendiri. Langkah yang masih tersisa adalah mendaftarkan `sakala.app` ke Public Suffix List, supaya browser juga memperlakukan tiap proyek sebagai situs terpisah untuk urusan cookie. Latar belakang keputusannya ada di [ADR-016](/docs/proyek/adr).

Sampai 18 November 2026 aplikasi memakai alamat `*.run.sakala.dev`. Alamat lama itu sudah dimatikan tanpa pengalihan, jadi tautan yang pernah dibagikan perlu diganti dengan alamat baru yang tampil di Console.

## Di mana saya melaporkan masalah?

Gunakan [issue pada repository Sakala Landing](https://github.com/gmedia/sakala-landing/issues) untuk masalah website dan dokumentasi. Untuk isu keamanan, ikuti [kebijakan keamanan repository](https://github.com/gmedia/sakala-landing/security/policy). Untuk aplikasi di `*.sakala.app` yang berbahaya, laporkan ke `abuse@sakala.dev` seperti dijelaskan di [Kebijakan Penggunaan Wajar](/penggunaan-wajar).

## Di mana dokumen hukum Sakala?

Ada tiga: [Pemberitahuan Privasi](/privasi), [Syarat Layanan](/syarat), dan [Kebijakan Penggunaan Wajar](/penggunaan-wajar).
