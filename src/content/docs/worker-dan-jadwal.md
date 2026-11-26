---
title: Worker dan Jadwal
description: Menjalankan proses latar seperti antrean di samping web, dan perintah terjadwal sebagai container sekali jalan. Belum aktif di sakala.dev.
track: panduan
section: Panduan deploy
order: 4.25
---

# Worker dan Jadwal

Worker adalah proses kedua proyekmu yang terus berjalan tanpa alamat, misalnya `php artisan queue:work`. Jadwal menjalankan satu perintah pada waktu tertentu di container baru, lalu container itu dihapus. Keduanya memakai image dan variabel yang sama dengan web.

> **Status per 26 November 2026: belum aktif di `sakala.dev`.** Fitur ini sedang diuji di server staging. Sub-halaman **Proses** dan **Jadwal** di Pengaturan proyek hanya muncul di instalasi Sakala yang menyalakannya. Angka di halaman ini adalah nilai bawaan di kode dan bisa berubah sebelum fitur dibuka.

## Menambah worker

1. Buka proyek, tab **Pengaturan**, lalu **Proses**.
2. Tekan **Tambah worker**. Untuk proyek Laravel, Console menawarkan **Saran untuk Laravel**; tekan **Pakai saran ini**.
3. Isi **Nama**, misalnya `queue`, dan **Perintah**.
4. Atur **Container**, yaitu jumlah container worker ini. `0` menyimpan worker tanpa menjalankannya.
5. Tekan **Simpan worker**, lalu **Redeploy**. Worker berjalan mulai deployment berikutnya, biasanya [tanpa build](/docs/variabel-dan-secret#redeploy-tanpa-build).

Perintah dijalankan dengan `sh -c` dan harus terus berjalan:

| Stack         | Contoh perintah                                              |
| ------------- | ------------------------------------------------------------ |
| Laravel       | `php artisan queue:work --sleep=3 --tries=3 --max-time=3600` |
| Node (BullMQ) | `node worker.js`                                             |

Worker Laravel dengan `--max-time` keluar dengan kode 0 setiap jam. Sakala menyalakannya lagi dan tidak menganggapnya crash.

## Cara worker berjalan

- Worker tidak punya alamat dan tidak diperiksa lewat HTTP. Memori dan CPU-nya ikut proyek, kecuali kamu mengisinya di **Memori dan CPU**.
- Saat deploy, worker harus masih hidup 10 detik setelah dinyalakan. Kalau keluar lebih cepat, deploy gagal dengan `worker_start_failed`, dan versi lama tetap berjalan bersama worker lamanya.
- Setelah versi baru live, worker lama diberi 30 detik untuk berhenti. Selama beberapa detik dua versi bisa sama-sama mengambil job, jadi job harus tetap bisa diproses kode versi sebelumnya.
- Proyek [tidur](/docs/batas-pilot#proyek-tidur-setelah-30-menit-tanpa-pengunjung) sebagai satu kesatuan. Web dan worker berhenti bersama, dan job di antrean menunggu sampai proyek bangun. Worker tidak membuat proyek tetap bangun.
- **Restart** menyalakan ulang web dan worker. [Rollback](/docs/rollback-dan-restart) memakai daftar worker milik versi tujuan.
- Kalau worker berhenti sendiri setelah live, **Proses** menandainya **Crash** dan Sakala mengirim email. Tekan **Lihat log** di baris worker itu untuk membaca pesannya.

## Membuat jadwal

1. Buka tab **Pengaturan**, lalu **Jadwal**, lalu **Buat jadwal**.
2. Isi **Nama** dan **Perintah**. Perintah harus selesai sendiri.
3. Di **Kapan**, pilih dari **Pilihan cepat**, atau tulis **Ekspresi cron** lima bagian: menit, jam, tanggal, bulan, hari. Contoh: `30 2 * * *` untuk setiap hari pukul 02.30. Console menampilkan tiga run berikutnya.
4. Kalau perlu, buka **Zona waktu dan batas waktu**. Zona bawaan WIB, batas waktu bawaan 300 detik.
5. Tekan **Simpan jadwal**.

Jadwal tidak butuh redeploy, tetapi proyek harus sudah punya deployment yang live. Untuk mencoba perintahnya, tekan **Jalankan sekarang** di halaman jadwal.

## Cara run berjalan

- Setiap run adalah container baru dari image deployment yang sedang live, dengan variabel proyek. Container dihapus setelah selesai.
- Run mulai sekitar satu menit setelah waktunya, bukan tepat di detiknya.
- Run tetap berjalan saat proyek tidur, dan tidak membangunkannya.
- Kalau run sebelumnya masih berjalan, waktu berikutnya **Dilewati**.
- Kalau run belum bisa mulai 10 menit setelah waktunya, run dicatat **Terlewat** dan tidak dikejar.
- Kalau workspace sedang menjalankan run sebanyak batasnya, run baru **Menunggu giliran**.
- Run yang melewati batas waktu dihentikan dan dicatat **Melewati batas waktu**.

Jadi job harus aman dilewati dan aman dijalankan ulang. Jangan memakai jadwal untuk tugas yang wajib tepat waktu.

## Riwayat, log, dan kegagalan

- **Riwayat run** menyimpan 100 run terakhir setiap jadwal, dengan status, durasi, dan kode keluar. **Lihat log** membuka output run itu, yang disimpan 7 hari. Output run tidak masuk log deployment.
- Saat jadwal mulai gagal, Sakala mengirim satu email, lalu memberi tahu lagi saat jadwal berhasil.
- Setelah 10 run berturut-turut gagal, melewati batas waktu, atau terputus, Sakala menjeda jadwal dan menandainya **Dijeda otomatis**. Perbaiki penyebabnya, lalu tekan **Aktifkan lagi**.
- **Hentikan run** menghentikan run yang sedang berjalan. **Jeda** menghentikan jadwal tanpa menghapusnya.

## Laravel scheduler

Untuk proyek Laravel, **Jadwal** menawarkan `php artisan schedule:run` dengan jarak paling dekat yang diizinkan, misalnya setiap 15 menit. Laravel hanya menjalankan task yang jatuh tempo pada menit perintah itu mulai, jadi atur task Laravel-mu di menit yang sama dengan jadwal Sakala.

Karena run bisa mulai sampai sekitar satu menit setelah waktunya, task Laravel di menit itu bisa terlewat. Untuk task yang penting, buat jadwal Sakala tersendiri yang memanggil perintah artisan-nya langsung, misalnya `php artisan laporan:kirim` dengan `0 2 * * *`.

## Batas

| Batas                          | Nilai bawaan                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Container worker per workspace | 1. Setiap container worker juga memakai satu slot [container berjalan](/docs/batas-pilot#batas-per-workspace) |
| Worker per proyek              | 5                                                                                                             |
| Jadwal aktif per workspace     | 2. Jadwal nonaktif tidak dihitung                                                                             |
| Jarak antar-run paling dekat   | 15 menit                                                                                                      |
| Run bersamaan per workspace    | 1                                                                                                             |
| Batas waktu run                | 300 detik, paling lama 600 detik                                                                              |
| Tenggat mulai run              | 10 menit setelah waktunya                                                                                     |
| Perintah worker dan jadwal     | Satu baris, paling panjang 1.000 karakter                                                                     |

Admin Sakala bisa memberi workspace tertentu batas lain lewat profil batas.

## Yang belum didukung

- Proyek tanpa web, misalnya bot saja.
- Jadwal yang membangunkan proyek sebelum berjalan.
- Jarak antar-run di bawah 15 menit untuk workspace biasa.
- Singkatan cron seperti `@daily`. Tulis lima bagiannya, misalnya `0 0 * * *`.

Alasan di balik batas ini ada di [ADR-022](/docs/proyek/adr#adr-022--worker-processes-and-scheduled-jobs-for-projects).

## Langkah berikutnya

Antrean butuh tempat menyimpan job. Pilihannya tabel database lewat driver `database` Laravel, misalnya di [database terkelola](/docs/database-terkelola), atau [Valkey terkelola](/docs/valkey-terkelola). Contoh Laravel dengan antrean, worker, dan jadwal ada di [sakala-examples/laravel-queue](https://github.com/gmedia/sakala-examples/tree/main/laravel-queue); tautan ini aktif setelah contohnya selesai ditinjau.
