---
title: Variabel dan Secret
description: Cara mengisi environment variable dan secret di Sakala, termasuk saran dari .env.example, kapan perubahan butuh build ulang, dan kapan cukup redeploy tanpa build.
track: panduan
section: Panduan deploy
order: 3.5
---

# Variabel dan Secret

Environment variable adalah pasangan nama dan nilai yang dibaca aplikasimu saat berjalan, misalnya `DATABASE_URL` atau `APP_KEY`. Di Sakala, variabel disimpan per proyek di tab **Variabel**, dan setiap deployment membawa salinan variabel saat deployment itu dibuat.

Halaman ini menjelaskan cara mengisinya, cara menyimpan nilai rahasia, dan apa yang terjadi saat kamu mengubahnya: kapan Sakala cukup menyalakan ulang aplikasi dengan image yang sama, dan kapan aplikasinya harus di-build ulang.

> **Status per 23 November 2026.** Saran dari `.env.example` butuh `sakala-agent` v0.15.0, `sakala-api` v0.10.0, dan Console v0.11.0 atau lebih baru. Redeploy tanpa build butuh `sakala-agent` v0.14.0 atau lebih baru di node yang menjalankan proyekmu. Sakala hosted di `sakala.dev` sudah memakai versi ini.

## Mengisi variabel saat membuat proyek

Di langkah **Konfigurasi**, bagian **Environment variable (opsional)** menerima variabel satu per satu, atau isi file `.env` sekaligus lewat **Tempel dari .env**. Kamu boleh melewatinya dan mengisinya nanti.

Setelah proyek dibuat, Sakala membaca repository-mu. Kalau di sana ada `.env.example`, `.env.sample`, atau `.env.dist`, langkah **Deploy** menampilkan tahap **Persiapan** dengan saran variabel yang sudah dikelompokkan:

| Kelompok              | Isinya                                                                                                                                                                                                                                    |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Perlu kamu isi**    | Nama yang terlihat seperti kredensial, misalnya API key dari layanan lain. Nilainya harus dari kamu dan disimpan sebagai secret. Boleh dikosongkan, deploy tetap jalan.                                                                   |
| **Dibuatkan Sakala**  | Kunci acak seperti `APP_KEY`, `SECRET_KEY_BASE`, `AUTH_SECRET`, atau `SESSION_SECRET`, dibuat di browser-mu dan disimpan sebagai secret.                                                                                                  |
| **Dari .env.example** | Nilai dari file contoh. Beberapa nilai diganti untuk production, misalnya `APP_ENV=production`, `APP_DEBUG=false`, `LOG_LEVEL=info` sebagai ganti `debug`, dan `APP_URL` diisi alamat proyekmu. Setiap baris yang diganti diberi catatan. |
| **Diisi Sakala**      | `PORT`, dan variabel database kalau proyekmu memakai [database terkelola](/docs/database-terkelola). Kamu tidak perlu menulisnya.                                                                                                         |

Periksa sebentar, ubah yang perlu, lalu tekan **Deploy sekarang**. Variabel yang sudah ada di proyek tidak diubah. Nilai contoh yang merujuk variabel lain, seperti `${APP_NAME}`, tidak diisi otomatis, karena Sakala menyimpan teksnya apa adanya.

## Mengubah variabel setelah proyek berjalan

Buka proyek, lalu masuk ke tab **Variabel**. Dari sana kamu bisa:

- **Tambah variabel** untuk satu variabel;
- **Tempel dari .env** untuk banyak variabel sekaligus, dengan pratinjau mana yang baru dan mana yang sudah ada;
- **Isi dari .env.example** untuk saran yang sama dengan tahap Persiapan, kalau repository-mu punya file contoh;
- **Ubah** atau **Hapus** pada baris variabel.

Nama variabel otomatis ditulis dengan huruf besar dan garis bawah, misalnya `api url` menjadi `API_URL`. Jangan menambahkan `PORT`, karena Sakala mengisinya dengan port proyek.

Perubahan baru dipakai setelah deployment berikutnya. Sampai itu, Console menampilkan **Perubahan variabel belum dipakai aplikasi yang sedang berjalan** dengan tombol untuk redeploy.

## Secret

Centang **Simpan sebagai secret** untuk nilai yang tidak boleh terlihat, seperti password dan token. Nilainya disembunyikan di Console dan hanya muncul saat seseorang menekan tombol tampilkan, dan setiap kali nilai secret ditampilkan, Sakala mencatatnya di log audit.

Semua variabel disimpan terenkripsi, secret maupun bukan. Pemilik dan anggota workspace bisa menambah, mengubah, dan melihat nilai secret. Pengamat hanya melihat nama variabel dan nilai yang bukan secret.

Sakala juga menyamarkan nilai secret di log, tetapi penyamarannya tidak sempurna: nilai yang kurang dari 8 karakter dan kata umum tidak disamarkan. Jadi jangan mencetak secret ke log. Kalau secret terlanjur terlihat, anggap sudah bocor dan ganti nilainya. Contoh mengganti password database ada di [Menghubungkan Database Eksternal](/docs/database-eksternal#mengganti-password).

## Variabel saat build dan saat aplikasi berjalan

Semua variabel tersedia saat aplikasi berjalan. Sebagian aplikasi juga membaca variabel **saat build** dan menyimpan nilainya di hasil build, misalnya situs Vite yang menulis `VITE_API_URL` ke berkas JavaScript. Untuk aplikasi seperti itu, nilai baru baru terpakai setelah di-build ulang.

Sakala memutuskan apakah perubahan variabel perlu build ulang dari jenis aplikasimu, yang terbaca saat analisis repository:

| Jenis aplikasi                                                                                               | Mengubah variabel                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Situs statis, termasuk SPA tanpa Start command                                                               | Selalu build ulang, karena situsnya disajikan sebagai file dan nilai variabel ikut tersimpan di dalamnya.                                                                                                                |
| Framework yang bisa membuat halaman saat build, misalnya Next.js, Nuxt, Astro, SvelteKit, Gatsby, atau Remix | Selalu build ulang, karena halaman yang dibuat saat build menyimpan nilainya.                                                                                                                                            |
| Server biasa, misalnya Laravel, Express, Django, Go, atau proyek dengan Dockerfile                           | Cukup restart dengan image yang sama, kecuali nama variabelnya diawali `VITE_`, `NEXT_PUBLIC_`, `NUXT_PUBLIC_`, `PUBLIC_`, `REACT_APP_`, `VUE_APP_`, `GATSBY_`, `EXPO_PUBLIC_`, atau `RAILPACK_`, atau tepat `NODE_ENV`. |
| Aplikasi yang jenisnya belum bisa dipastikan Sakala                                                          | Selalu build ulang, supaya aman.                                                                                                                                                                                         |

Variabel dari database terkelola (`DATABASE_URL` dan `DB_*`) tidak pernah memicu build, untuk jenis aplikasi apa pun.

Kamu tidak perlu menghafal tabel ini. Di tab **Variabel**, di dekat tombol simpan, Console sudah menulis akibatnya sebelum kamu menyimpan: **Cukup restart dengan image yang sama (tanpa build)**, atau **Perubahan ini butuh build ulang karena** diikuti alasannya.

Nilai variabel yang dibaca saat build, seperti `VITE_*` dan `NEXT_PUBLIC_*`, masuk ke hasil build dan bisa dibaca siapa pun yang membuka aplikasimu. Jangan menaruh secret di sana.

## Redeploy tanpa build

Tombol **Redeploy** memakai ulang image yang sedang dipakai kalau tidak ada yang perlu di-build ulang. Syaratnya, semua ini sama dengan deployment yang sedang aktif:

- commit-nya, artinya belum ada push baru ke branch proyek;
- Root directory, Build command, dan Start command;
- variabel yang dibaca saat build, menurut tabel di atas.

Image itu juga harus masih ada di node yang menjalankan proyekmu. Proyek yang sedang tidur atau crash tetap bisa memakai ulang image-nya.

Redeploy tanpa build tetap menjalankan [perintah rilis](/docs/perintah-rilis), health check, dan semua replika, dan versi lama tetap melayani sampai versi baru sehat. Yang dilewati hanya clone, analisis, dan build. Di detail deployment, langkahnya tertulis **Memakai image dari deployment #N (tanpa build)**, dan di tab **Riwayat** barisnya diberi label **Tanpa build**.

Deployment yang memakai ulang image tidak dihitung dalam [batas build per jam](/docs/batas-pilot#batas-per-workspace). Kalau image-nya ternyata sudah tidak ada di node, Sakala mem-build seperti biasa, dan deployment itu dihitung sejak saat itu.

Redeploy tanpa build juga dipakai otomatis setelah kamu memasang, melepas, atau mengganti password [database terkelola](/docs/database-terkelola), selama commit dan pengaturan build-nya tidak berubah.

## Build ulang dari awal

Di sebelah tombol **Redeploy** ada menu dengan pilihan **Build ulang dari awal**. Pilihan ini selalu mem-build dari commit terbaru, tanpa memakai image lama. Pakai kalau:

- hasil build sebelumnya bermasalah;
- aplikasimu membaca variabel lain saat build, yang tidak tercakup aturan di atas. Contohnya Dockerfile dengan `RUN --mount=type=secret,id=API_URL ...`: `API_URL` tidak diawali `VITE_` atau awalan lain, jadi Sakala menganggapnya variabel runtime dan tidak mem-build ulang saat nilainya berubah.

Build di Sakala tidak memakai ulang langkah build yang lama saat nilai variabelnya berubah, jadi nilai baru pasti terbaca. Cara variabel sampai ke build, termasuk `--mount=type=secret` di Dockerfile, ada di [Menyiapkan Dockerfile](/docs/dockerfile#variabel-yang-dibutuhkan-saat-build).

## Langkah berikutnya

Untuk aplikasi yang butuh database, baca [Database Terkelola](/docs/database-terkelola) atau [Menghubungkan Database Eksternal](/docs/database-eksternal). Untuk menjalankan migration sekali setiap deployment, baca [Database dan Perintah Rilis](/docs/perintah-rilis).
