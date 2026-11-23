---
title: Database dan Perintah Rilis
description: Cara menjalankan migration database sekali setiap deployment lewat perintah rilis, untuk database terkelola Sakala maupun database dari layanan lain.
track: panduan
section: Panduan deploy
order: 4.2
---

# Database dan Perintah Rilis

Perintah rilis adalah satu perintah yang Sakala jalankan sekali setiap deployment, setelah build dan sebelum versi baru menerima trafik. Biasanya dipakai untuk migration database.

Halaman ini menjelaskan cara kerja perintah rilis dan cara menulis migration yang aman untuknya. Database-nya bisa [database terkelola Sakala](/docs/database-terkelola), yang masih pilot terbatas, atau database dari layanan lain lewat [Menghubungkan Database Eksternal](/docs/database-eksternal).

> **Status per 18 November 2026.** Perintah rilis butuh `sakala-api` v0.7.0 atau lebih baru, Console v0.8.0 atau lebih baru, dan `sakala-agent` v0.10.0 atau lebih baru di node yang menjalankan project-mu. Kalau field **Release command** belum ada di tab **Pengaturan**, Console yang kamu pakai belum sampai versi itu. Contoh perintah di halaman ini belum dicoba lewat Sakala di production.

## Database hari ini

Ada dua pilihan. [Database terkelola](/docs/database-terkelola) adalah PostgreSQL yang dijalankan Sakala dan dipasang ke proyek, dengan `DATABASE_URL` dan `DB_*` yang diisi otomatis. Per 23 November 2026 fitur ini masih pilot terbatas: kuota bawaannya 0 di `sakala.dev`, jadi hanya workspace yang diberi kuota oleh admin Sakala yang bisa membuatnya.

Pilihan lainnya database dari layanan lain. Aplikasi di Sakala bisa menghubungi internet, jadi database yang terbuka di internet bisa dipakai. Simpan alamat dan password-nya sebagai variabel proyek, misalnya `DATABASE_URL`, di tab **Variabel**. Nilainya disimpan terenkripsi dan disamarkan di log, walau [penyamarannya tidak sempurna](/docs/database-eksternal#mengganti-password), jadi tetap jangan mencetaknya. Untuk database seperti ini, backup dan pemulihan datanya menjadi tanggung jawabmu.

## Mengisi perintah rilis

Buka project, masuk ke tab **Pengaturan**, lalu isi field **Release command** di dekat **Build command** dan **Start command**. Field yang sama juga ada di pengaturan lanjutan saat membuat project. Simpan, lalu tekan **Redeploy**, karena perubahan pengaturan baru berlaku di deployment berikutnya.

Nilai yang biasa dipakai:

| Aplikasi           | Release command               |
| ------------------ | ----------------------------- |
| Laravel            | `php artisan migrate --force` |
| Node dengan Prisma | `npx prisma migrate deploy`   |

Untuk Prisma, pastikan CLI `prisma` ada di dalam image. Kalau Dockerfile-mu memakai `npm ci --omit=dev` dan `prisma` terdaftar di `devDependencies`, CLI itu tidak ikut terpasang.

Aturan yang perlu diikuti:

- Perintahnya satu baris, paling panjang 1000 karakter. Gabungkan beberapa langkah dengan `&&`, atau pindahkan ke script di repository.
- Perintahnya dijalankan lewat `sh -c`, sama seperti Start command, jadi image-nya harus punya `sh`.
- Perintahnya harus selesai sendiri. Jangan menunggu input dan jangan menjalankan server.

Kosongkan field-nya kalau kamu tidak lagi membutuhkannya.

## Yang terjadi saat deployment

Setelah image siap, Sakala menjalankan perintah rilis di container sementara. Ini juga berlaku untuk [redeploy tanpa build](/docs/variabel-dan-secret#redeploy-tanpa-build): image-nya dipakai ulang, tetapi perintah rilisnya tetap dijalankan, misalnya supaya migration berjalan di database yang baru dipasang. Container itu memakai image, environment variable, dan jaringan yang sama dengan aplikasimu, lalu dihapus setelah perintahnya selesai. Output-nya masuk ke panel **Logs** di detail deployment, dengan awalan `[release]` di setiap baris.

Kalau perintahnya selesai dengan exit code 0, Sakala lanjut menjalankan versi baru seperti biasa. Kalau exit code-nya selain 0, deployment gagal dengan kode `release_command_failed`, dan exit code-nya tertulis di **Detail error**. Versi baru tidak dijalankan, dan versi sebelumnya, kalau ada, tetap melayani pengunjung.

Batas waktunya ditentukan operator Sakala, defaultnya 600 detik (10 menit), dan tidak bisa diubah dari project. Perintah yang melewatinya membuat deployment gagal dengan kode `release_command_timeout`. Cara membaca kedua kode itu ada di [Saat Deploy Gagal](/docs/deploy-gagal#perintah-rilis).

Perintah rilis hanya berjalan saat deployment. Ia tidak berjalan saat aplikasi bangun dari sleep, saat container di-restart, saat Sakala memulihkan replika yang mati, dan tidak berjalan sekali per replika.

Kalau node yang menjalankan project-mu belum mendukung perintah rilis, Sakala menolak deploy dan memberi tahu bahwa node itu belum mendukungnya. Kamu bisa mengosongkan field-nya untuk deploy tanpa perintah rilis, atau menunggu operator memperbarui agent di node.

## Kenapa tidak di Start command

Kamu mungkin pernah menaruh `php artisan migrate --force && ...` di depan Start command. Start command berjalan setiap kali container mulai, termasuk saat bangun dari sleep, restart, dan pemulihan replika. Kalau project-mu punya beberapa replika, setiap replika menjalankannya bersamaan, sehingga beberapa migration bisa berjalan di waktu yang sama dan saling bertabrakan.

Migration yang gagal di Start command juga membuat aplikasi tidak pernah mulai, dan yang terlihat hanya `runtime_app_crashed`. Di perintah rilis, kegagalannya punya kode sendiri dan output-nya terpisah di log.

## Migration harus cocok dengan versi lama

Versi lama tetap melayani pengunjung selama perintah rilis berjalan, dan sampai versi baru lolos pengecekan. Jadi selama beberapa menit, versi lama membaca skema database yang sudah diubah oleh migration versi baru. Kalau deployment gagal setelah migration selesai, trafik tetap di versi lama, tetapi skemanya tidak ikut kembali.

Karena itu, pecah perubahan yang tidak cocok dengan versi lama menjadi beberapa deployment. Pola ini biasa disebut expand/contract. Contoh untuk mengganti nama kolom `name` menjadi `full_name`:

1. Deployment pertama: migration menambah kolom `full_name`, dan kode baru menulis ke kedua kolom. Versi lama tetap jalan karena kolom `name` masih ada.
2. Isi `full_name` untuk baris yang sudah ada.
3. Deployment berikutnya: kode hanya memakai `full_name`.
4. Deployment setelahnya: migration menghapus kolom `name`.

Sebelum migration yang menghapus atau mengubah data, buat backup dan pastikan backup itu bisa dipulihkan.

## Seeder tidak ditaruh di perintah rilis

Perintah rilis berjalan di setiap deployment, jadi seeder di sana akan mengisi data yang sama berulang kali. Untuk database dari layanan lain, jalankan seeder sekali dari laptopmu, langsung ke database itu. `read -rs` membuat nilainya tidak tampil di layar dan tidak tersimpan di riwayat shell:

```bash
read -rs DATABASE_URL && export DATABASE_URL
npx prisma db seed
unset DATABASE_URL
```

Contoh di atas untuk Prisma yang membaca `DATABASE_URL` dari schema-nya. Untuk Laravel, jalankan `php artisan db:seed` dengan variabel koneksi seperti di [contoh migration monorepo](/docs/monorepo#langkah-2-jalankan-migration-dengan-sengaja). Database-nya harus bisa dihubungi dari laptopmu.

Database terkelola tidak bisa dihubungi dari laptop, karena alamatnya hanya terjangkau aplikasi yang berjalan di Sakala. Kalau butuh data awal di sana, tulis seeder yang aman dijalankan berulang, misalnya hanya mengisi kalau tabelnya masih kosong.

## Langkah berikutnya

Kalau deployment gagal di perintah rilis, buka [Saat Deploy Gagal](/docs/deploy-gagal#perintah-rilis). Untuk menyiapkan database dari awal, baca [Database Terkelola](/docs/database-terkelola) atau [Menghubungkan Database Eksternal](/docs/database-eksternal). Untuk contoh project Laravel di monorepo, lihat [Men-deploy monorepo](/docs/monorepo).
