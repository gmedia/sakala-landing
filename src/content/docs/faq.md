---
title: Pertanyaan Umum
description: Jawaban ringkas tentang status, sasaran, dan kontribusi Sakala.
track: referensi
section: Referensi
order: 2
---

# Pertanyaan Umum

## Apa itu Sakala?

Sakala adalah platform deployment open-source yang membawa project dari repository Git menjadi aplikasi yang dapat dibuka dan dibagikan. Ia diinisiasi oleh Sakala Maintainers, didukung GMEDIA sebagai founding sponsor, dan masih dalam pengembangan aktif. Layanan hosted-nya sedang dalam tahap pilot terbuka, jadi siapa pun bisa [mendaftar](https://app.sakala.dev/register) dan memakainya tanpa biaya, dengan batas pemakaian.

## Apakah Sakala dapat langsung dipakai production?

Belum untuk aplikasi yang penting. Selama pilot tidak ada jaminan uptime, SLA, atau pemulihan data, dan berkas di dalam container hilang setiap kali deploy baru selesai. Untuk tugas, portfolio, dan demo, Sakala sudah bisa dipakai dengan batas yang dijelaskan di [Batas Pilot](/docs/batas-pilot).

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

Tiap proyek mendapat subdomain sendiri dan berjalan di container-nya sendiri. Browser belum memperlakukan tiap proyek sebagai situs terpisah untuk urusan cookie, karena `sakala.app` belum terdaftar di Public Suffix List. Pendaftaran itu direncanakan setelah jumlah pengguna Sakala cukup besar, karena itu salah satu syarat daftar tersebut. Latar belakang keputusannya ada di [ADR-016](/docs/proyek/adr).

Sementara itu, router Sakala membuang atribut `Domain` dari setiap header `Set-Cookie` yang dikirim aplikasi, jadi cookie dari server aplikasimu hanya berlaku untuk alamat aplikasimu sendiri. Yang tidak tercakup adalah cookie yang dipasang lewat JavaScript di browser. Kalau aplikasimu punya fitur login, beri nama cookie sesi dengan awalan `__Host-` (misalnya `SESSION_COOKIE=__Host-session` di Laravel), pasang `Secure` dan `Path=/`, tanpa `Domain`. Browser menolak cookie berawalan `__Host-` yang dipasang dari subdomain lain, sehingga aplikasi lain di `sakala.app` tidak bisa menimpanya.

Sampai 18 November 2026 aplikasi memakai alamat `*.run.sakala.dev`. Alamat lama itu sudah dimatikan tanpa pengalihan, jadi tautan yang pernah dibagikan perlu diganti dengan alamat baru yang tampil di Console.

## Di mana saya melaporkan masalah?

Buka issue di repository yang sesuai: [`sakala-landing`](https://github.com/gmedia/sakala-landing/issues) untuk website dan dokumentasi, [`sakala-console`](https://github.com/gmedia/sakala-console/issues) untuk tampilan dan alur di Console, dan [`sakala-api`](https://github.com/gmedia/sakala-api/issues) untuk deployment yang gagal karena gangguan di sisi Sakala. Kalau belum tahu repository-nya, tanyakan di [Discussions](https://github.com/gmedia/sakala/discussions). Untuk isu keamanan, ikuti [kebijakan keamanan repository](https://github.com/gmedia/sakala-landing/security/policy). Untuk aplikasi di `*.sakala.app` yang berbahaya, laporkan ke `abuse@sakala.dev` seperti dijelaskan di [Kebijakan Penggunaan Wajar](/penggunaan-wajar).

## Di mana dokumen hukum Sakala?

Ada tiga: [Pemberitahuan Privasi](/privasi), [Syarat Layanan](/syarat), dan [Kebijakan Penggunaan Wajar](/penggunaan-wajar).
