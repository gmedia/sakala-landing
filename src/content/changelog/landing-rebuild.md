---
title: Situs disusun ulang, dokumentasi diperdalam, dan dua bahasa
description: Arah visual baru mengikuti Console, diagram teknis untuk menjelaskan infrastruktur, glosarium domain, serta dukungan Bahasa Indonesia dan Inggris.
version: "0.3.0"
publishedAt: 2026-08-29
---

Landing `sakala.dev` disusun ulang agar setara dengan visi pada dokumentasi
project dan sebahasa dengan Console yang desainnya sudah selesai. Hero, CTA,
header, dan footer memakai permukaan teal pekat sebagai penanda, sementara isi
yang perlu dibaca lama tetap berada pada latar terang.

Halaman kini memuat tujuh prinsip Sakala, arah produk setelah sebuah karya
hidup, serta roadmap yang memisahkan status desain dari status engineering.
Setiap kapabilitas yang belum tersedia membawa label status agar tidak terbaca
sebagai janji fitur.

Infrastruktur dijelaskan lewat diagram, bukan paragraf saja. Alur lima tahap,
pembagian control plane dan data plane, serta siklus karya melahirkan karya
digambar sebagai SVG statis yang mengikuti warna permukaan dan memiliki padanan
teks untuk pembaca screen reader.

Situs sekarang tersedia dalam Bahasa Indonesia dan Inggris. Seluruh URL Bahasa
Indonesia tidak berubah, dan halaman Inggris berada di bawah `/en/`. Halaman
yang belum diterjemahkan tidak mengumumkan versi bahasa lain.

Seluruh halaman lain ikut disusun ulang. Halaman tentang menambahkan
perjalanan produk dan model pertumbuhan, halaman governance menjelaskan domain
keputusan serta struktur akses repository, dan dokumentasi mendapat glosarium
istilah domain.

Dokumentasi dipisah menjadi dua jalur. `/docs` berisi panduan penggunaan yang
ditulis tanpa mengandaikan pembaca paham Docker atau reverse proxy, sedangkan
`/docs/teknis` berisi arsitektur, runtime, dan keamanan. Navigasi diturunkan
dari content collection, dan URL teknis lama dialihkan ke alamat barunya.

Panduan penggunaan menambahkan halaman menyiapkan project, variabel dan secret,
perjalanan deploy pertama, domain dan URL, serta membaca kegagalan deployment.
Jalur teknis menambahkan arsitektur sistem dan model keamanan.

Dokumentasi teknis kini memuat diagram: pembagian control plane dan data plane,
state machine deployment, prioritas builder, dan siklus command Agent. Semuanya
diturunkan dari dokumen arsitektur project.

Tipografi memakai Montserrat untuk judul dan Inter untuk teks, keduanya
di-self-host dengan lisensi SIL OFL. Logo, favicon, dan Open Graph image
diperbarui memakai aset vektor baru.
