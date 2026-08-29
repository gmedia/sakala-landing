---
title: Domain dan URL
description: Bagaimana aplikasi mendapat alamat publik, dan apa yang membedakan domain bawaan dengan domain sendiri.
track: panduan
section: Proses deploy
order: 6
---

# Domain dan URL

Aplikasi baru terasa nyata ketika ia punya alamat yang bisa dibuka orang lain. Halaman ini menjelaskan bagaimana alamat itu muncul.

## Domain bawaan

Setiap project mendapat alamat otomatis dengan pola:

```txt
<slug>.run.sakala.dev
```

`slug` diambil dari nama project-mu. Alamat ini muncul tanpa kamu perlu membeli domain atau mengatur DNS, sehingga project bisa langsung dibagikan.

Pada lingkungan pengembangan lokal, pola yang sama diuji melalui `*.run.sakala.localhost`.

## Kenapa alamatnya tidak langsung aktif setelah build

Aplikasi yang berhasil dibangun belum tentu langsung bisa dibuka. Ada dua tahap lagi setelahnya:

1. **Routing** — alamat publik dihubungkan ke aplikasimu yang berjalan di port internal.
2. **Health check** — Sakala memastikan aplikasimu benar-benar menjawab, bukan sekadar prosesnya menyala.

Kalau health check gagal, alamatnya tidak diaktifkan. Ini disengaja: lebih baik deployment dinyatakan gagal daripada pengunjung menemukan halaman error.

Penyebab health check gagal yang paling umum dibahas pada [Ketika Deployment Gagal](/docs/ketika-gagal).

## HTTPS

Sertifikat TLS diurus otomatis, sehingga alamat aplikasimu memakai `https://` tanpa kamu perlu menyiapkan apa pun. Ini salah satu bagian yang paling merepotkan bila kamu mengelola server sendiri.

## Domain sendiri

Bagian ini adalah arah, belum tersedia.

Nantinya kamu dapat memakai domain milikmu sendiri. Alurnya akan mencakup menambahkan domain, mengarahkan DNS, verifikasi kepemilikan, penerbitan sertifikat, lalu domain menjadi aktif.

Kerumitan DNS akan dijelaskan langkah demi langkah, bukan ditimpakan begitu saja. Status tiap tahap ditampilkan terpisah supaya kamu tahu bagian mana yang belum selesai:

```txt
DNS    ✓
TLS    ✓
Route  ✓
App    ✓
```

Kemampuan lain yang direncanakan menyusul: menetapkan domain utama, membuat alias, dan mengatur pengalihan.

## Sebelum membagikan alamatnya

Buka alamat itu dari perangkat atau jaringan lain, bukan hanya dari laptop yang kamu pakai bekerja. Periksa halaman utama, route penting, aset gambar dan CSS, tampilan di layar kecil, serta apa yang muncul ketika terjadi kesalahan.

Alamat publik tidak otomatis berarti aplikasi siap production. Kesiapan production juga mencakup keamanan, pemantauan, backup, kapasitas, dan prosedur pemulihan yang sesuai dengan risiko aplikasimu.
