---
title: Valkey Terkelola
description: Penyimpanan key-value kompatibel Redis milik workspace untuk antrean, sesi, dan cache, dengan REDIS_URL yang diisi Sakala. Pilot terbatas, belum dibuka di sakala.dev.
track: panduan
section: Panduan deploy
order: 4.17
---

# Valkey Terkelola

Valkey adalah penyimpanan key-value di memori yang kompatibel dengan Redis, jadi driver `redis` Laravel, ioredis, dan BullMQ bisa langsung memakainya. Sakala menjalankan Valkey untuk workspace-mu, kamu memasangnya ke proyek, lalu Sakala mengisi `REDIS_URL` dan `REDIS_*` saat deploy.

> **Status per 26 November 2026: pilot terbatas, belum dibuka di `sakala.dev`.** Valkey terkelola tersedia untuk workspace yang kuotanya dibuka admin Sakala. Kuota bawaan setiap workspace adalah 0, dan menu **Valkey** di sidebar hanya muncul untuk workspace yang punya kuota. Di `sakala.dev`, kuota pertama baru dibuka setelah versi [Pemberitahuan Privasi](/privasi) yang mencakup isi Valkey berlaku. Cara memintanya ada di [Meminta kuota](#meminta-kuota).

Tanpa Valkey, Laravel tetap bisa memakai driver `database` untuk antrean, cache, dan sesi, misalnya di [database terkelola](/docs/database-terkelola).

## Pilih mode

|            | Persisten (disarankan)                                  | Cache                                      |
| ---------- | ------------------------------------------------------- | ------------------------------------------ |
| Data       | Ditulis ke disk setiap detik, tetap ada setelah restart | Hanya di memori, bisa kosong saat restart  |
| Backup     | Setiap malam                                            | Tidak ada                                  |
| Saat penuh | Tulisan baru ditolak sampai ada data yang dihapus       | Key yang paling lama tidak dipakai dibuang |
| Cocok      | Antrean job (Laravel queue, BullMQ) dan sesi login      | Cache yang bisa dibuat ulang               |

Mode tidak bisa diubah setelah Valkey dibuat. Jangan memakai mode cache untuk antrean: job bisa dibuang saat penuh atau hilang saat restart.

## Membuat dan memasang

1. Buka **Valkey** di sidebar, lalu tekan **Buat Valkey**.
2. Isi **Nama Valkey**, pilih **Mode**, lalu pilih **Ukuran**: 32, 64, atau 128 MB.
3. Tunggu sampai statusnya **Siap**, lalu tekan **Pasang ke proyek**.
4. Tekan **Redeploy** di proyek itu. Variabelnya masuk mulai deployment berikutnya, biasanya [tanpa build](/docs/variabel-dan-secret#redeploy-tanpa-build).

Dari halaman proyek juga bisa: tab **Variabel** menampilkan **Pasang Valkey** dan **Buat Valkey untuk proyek ini**.

Valkey milik workspace, bukan milik satu proyek. Satu Valkey bisa dipasang ke beberapa proyek di workspace yang sama, tetapi satu proyek hanya bisa memakai satu Valkey. Pemilik dan anggota workspace bisa membuat, memasang, melepas, mengubah ukuran, mengganti password, dan menghapus. Pengamat hanya bisa melihat.

## Variabel yang diisi Sakala

| Variabel         | Isi                                                     |
| ---------------- | ------------------------------------------------------- |
| `REDIS_URL`      | `redis://:<password>@<host>:6379`, tanpa nomor database |
| `REDIS_HOST`     | Alamat IP Valkey di network privat                      |
| `REDIS_PORT`     | `6379`                                                  |
| `REDIS_PASSWORD` | Password acak 32 karakter                               |

Semua container proyek menerimanya: web, [worker, run jadwal](/docs/worker-dan-jadwal), dan [perintah rilis](/docs/perintah-rilis). Variabel proyek dengan nama yang sama tetap menang, dan tab **Variabel** menandainya **Menimpa Valkey**.

Jangan menambahkan `/0` di akhir `REDIS_URL`. Laravel memakai database 0 untuk antrean dan 1 untuk cache. Nomor di URL menyatukan keduanya, sehingga `php artisan cache:clear` ikut menghapus job.

Valkey hanya bisa dijangkau dari proyek yang terpasang, lewat network privat di server yang sama. Tidak ada alamat publik, jadi alamat ini tidak bisa dipakai dari laptop.

## Laravel

1. Tambahkan variabel proyek `QUEUE_CONNECTION=redis` dan `CACHE_STORE=redis`. Tab **Variabel** menawarkan tombol untuk menambahkan keduanya. Untuk sesi, tambahkan `SESSION_DRIVER=redis` sendiri.
2. Laravel memakai ekstensi phpredis secara bawaan, padahal banyak image PHP tidak memasangnya, termasuk image FrankenPHP Alpine di contoh `laravel-queue`. Cara paling mudah: pasang predis, commit `composer.json` dan `composer.lock`, lalu tambahkan variabel `REDIS_CLIENT=predis`:

   ```bash
   composer require predis/predis
   ```

3. Tambahkan worker `php artisan queue:work`, lihat [Worker dan Jadwal](/docs/worker-dan-jadwal).
4. **Redeploy** proyeknya.

## Node

```js
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null, // wajib untuk worker BullMQ
});
```

BullMQ butuh mode persisten.

## Password

- **Tampilkan password** hanya tersedia untuk pemilik workspace, dan setiap kali dipakai, Sakala mencatatnya di log audit workspace.
- **Ganti password** membuat password baru. Password lama langsung berhenti berlaku dan koneksi yang terbuka diputus.
- **Redeploy otomatis proyek yang terpasang** sudah tercentang. Sakala lalu men-deploy ulang versi yang live di setiap proyek terpasang dengan image yang sama. Tanpa redeploy, aplikasinya tidak bisa memakai Valkey.

## Batas dan memori penuh

| Batas                      | Nilai                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------- |
| Jumlah Valkey dan jatah MB | Per workspace, dari profil batasnya. Bawaan 0                                         |
| Ukuran per Valkey          | 32, 64, atau 128 MB. Dicadangkan dari jatah workspace sejak dibuat, berapa pun isinya |
| Valkey per proyek          | 1                                                                                     |
| Akses                      | Hanya dari proyek yang terpasang                                                      |

Saat pemakaian mencapai 80%, pemilik dan anggota workspace mendapat notifikasi **Valkey hampir penuh**. Ukuran bisa diubah di halaman Valkey. Valkey persisten tidak bisa dikecilkan di bawah isinya saat ini.

Valkey tidak tidur bersama proyek, jadi memorinya terpakai terus selama Valkey ada.

## Backup dan risiko kehilangan data

- **Persisten:** kalau proses Valkey crash, data sekitar 1 detik terakhir bisa hilang. Operator mem-backup isinya setiap malam dalam bentuk terenkripsi dan menyimpannya sekitar 14 hari. Kalau disk atau server rusak, data sejak backup terakhir hilang, sampai sekitar 24 jam.
- **Cache:** tidak ada backup.
- Valkey berjalan di server yang sama dengan aplikasimu, jadi gangguan di server itu mengenai keduanya.
- Belum ada unduh isi atau pemulihan sendiri di Console. Pemulihan dari backup dilakukan maintainer, dan selama pilot belum dijamin.

## Melepas dan menghapus

- **Lepas Valkey** memutus proyek dari Valkey. Aplikasi yang sedang berjalan tetap memakainya sampai di-redeploy.
- Valkey yang masih terpasang tidak bisa dihapus. Lepas dulu dari semua proyek, lalu tekan **Hapus Valkey** dan ketik namanya. Isinya langsung hilang dan tidak bisa dipulihkan dari Console. Untuk mode persisten, salinan backup tetap ada sekitar 14 hari.
- Menghapus proyek hanya melepas Valkey-nya, tidak menghapusnya.

## Yang belum didukung

- Mengubah mode setelah dibuat.
- Akses dari luar Sakala, termasuk TLS.
- Lebih dari satu Valkey per proyek.
- Ukuran di atas 128 MB.

Alasan di balik batas ini ada di [ADR-023](/docs/proyek/adr#adr-023--managed-valkey-for-projects).

## Meminta kuota

Kuota Valkey diberikan admin Sakala lewat profil batas workspace. Buka diskusi baru di [GitHub Discussions, kategori Q&A](https://github.com/gmedia/sakala/discussions/categories/q-a) di repository `gmedia/sakala`. Sebutkan nama workspace-mu, untuk apa Valkey-nya dipakai, dan mode yang kamu butuhkan. Discussions bisa dibaca publik, jadi jangan menulis password atau token di sana. Selama pilot terbatas, belum tentu setiap permintaan bisa dipenuhi.
