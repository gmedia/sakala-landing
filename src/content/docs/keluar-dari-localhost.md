---
title: Membagikan Project dari Localhost
description: Memahami cara membawa project dari localhost menuju URL publik dengan aman dan bertahap.
order: 5
section: Panduan
---

# Membagikan Project dari Localhost

Project yang berjalan di `localhost` hanya dapat dibuka dari perangkat tempat project tersebut dijalankan. Kondisi ini cukup selama pengembangan, tetapi menjadi hambatan ketika tugas perlu dinilai, portfolio ingin dibagikan, atau demo harus dibuka oleh orang lain.

Halaman ini menjelaskan pilihan untuk membawa project menuju URL publik. Sakala masih dikembangkan aktif, jadi penjelasan berikut bukan janji bahwa layanan deployment Sakala sudah tersedia.

## Mengapa localhost tidak dapat langsung dibagikan?

`localhost` menunjuk kembali ke perangkat yang sedang digunakan. Ketika orang lain membuka `localhost:3000`, browser mereka akan mencari aplikasi pada perangkat mereka sendiri, bukan pada laptopmu.

Agar project dapat dibuka melalui internet, project memerlukan lingkungan yang terus menjalankan aplikasi dan route publik yang mengarahkan domain menuju aplikasi tersebut.

Secara sederhana, alurnya adalah:

1. source code tersedia pada repository Git;
2. lingkungan deployment mengambil dan membangun source code;
3. proses aplikasi dijalankan pada port internal;
4. reverse proxy menghubungkan domain publik ke port aplikasi;
5. log dan status membantu memeriksa hasil deployment.

Baca [Alur Deployment](/docs/deployment-flow) untuk memahami model komunikasi yang sedang disusun Sakala.

## Pilihan untuk membagikan project

Pilihan yang tepat bergantung pada durasi demo, kebutuhan keamanan, dan seberapa banyak infrastruktur yang ingin kamu kelola.

### Gunakan tunnel untuk demo singkat

Tunnel meneruskan koneksi dari URL publik sementara menuju aplikasi yang masih berjalan di laptop. Cara ini berguna untuk review singkat atau debugging bersama.

Laptop dan proses aplikasi harus tetap aktif. Jangan gunakan tunnel untuk membuka data sensitif, panel admin, atau service lokal lain tanpa memahami risikonya.

### Deploy ke platform yang sudah tersedia

Platform deployment dapat mengambil source dari repository, menjalankan proses build, dan menyediakan URL publik. Periksa dukungan bahasa, batas resource, pengelolaan secret, log, serta kebijakan sleep sebelum memilih platform.

Untuk tugas dan portfolio, pastikan URL tetap dapat dibuka selama periode penilaian atau review.

### Kelola server sendiri

VPS memberi kontrol lebih besar, tetapi kamu juga bertanggung jawab atas sistem operasi, firewall, SSL, reverse proxy, update keamanan, backup, dan pemantauan. Pilihan ini berguna untuk belajar infrastruktur, tetapi bukan selalu jalur paling sederhana untuk membagikan demo kecil.

## Yang perlu disiapkan sebelum deployment

Project yang berjalan baik di laptop belum tentu langsung berjalan pada lingkungan lain. Periksa beberapa hal berikut:

- source code sudah berada pada repository Git yang benar;
- dependency dan command build tercatat dengan jelas;
- aplikasi membaca port dari environment bila framework membutuhkannya;
- secret tidak disimpan di repository;
- file atau database lokal tidak dianggap selalu tersedia;
- README menjelaskan cara menjalankan project;
- halaman error tidak membocorkan credential atau detail sensitif.

Jika project terdiri dari beberapa service, catat hubungan antara frontend, API, database, dan service pendukung lain. Pemisahan tanggung jawab ini juga dijelaskan pada [Konsep Dasar Sakala](/docs/concepts).

## Arah yang sedang dibangun Sakala

Sakala diarahkan untuk membantu project kecil bergerak dari repository Git menuju URL publik melalui alur yang mudah dipahami. Pengguna nantinya memilih repository melalui console, API mengelola state dan command deployment, sedangkan agent menangani pekerjaan runtime lalu melaporkan status serta log ke API.

Targetnya bukan menyembunyikan seluruh proses deployment. Sakala ingin membuat proses tersebut lebih mudah dipelajari tanpa mengubahnya menjadi klaim satu klik atau pengganti cloud enterprise.

Lihat [Quickstart](/docs/quickstart) untuk gambaran pengalaman yang sedang dituju dan [Pertanyaan Umum](/docs/faq) untuk status produk saat ini.

## Setelah project memiliki URL publik

Sebelum membagikan link, buka URL melalui perangkat atau jaringan lain. Periksa halaman utama, route penting, asset statis, respons mobile, dan kondisi ketika aplikasi gagal.

Jangan menganggap URL publik otomatis berarti aplikasi siap production. Kebutuhan production juga mencakup keamanan, observability, backup, kapasitas, dan prosedur pemulihan yang sesuai dengan risiko aplikasi.
