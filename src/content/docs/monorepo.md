---
title: Men-deploy Monorepo
description: Satu repository berisi beberapa aplikasi, misalnya API Laravel dan web Vite. Buat satu proyek Sakala per aplikasi dengan Root directory. Workspace JavaScript dibangun dari root-nya, lengkap dengan lockfile.
track: panduan
section: Panduan deploy
order: 4.5
---

# Men-deploy Monorepo

Monorepo adalah satu repository yang berisi beberapa aplikasi, misalnya `apps/api` dan `apps/web`. Sakala men-deploy monorepo dengan membuat **satu proyek per aplikasi**. Semua proyek menunjuk repository dan branch yang sama, tetapi masing-masing punya **Root directory** sendiri.

> Sakala sedang dalam pilot terbuka sejak 19 November 2026: siapa pun bisa mendaftar dan memakainya tanpa biaya, dengan [batas pemakaian](/docs/batas-pilot).
>
> **Status panduan ini per 11 November 2026.** Panduan ini ditulis dari satu percobaan sungguhan di lingkungan pengembangan Sakala terhadap repository [`gmedia/facility-reporting`](https://github.com/gmedia/facility-reporting), yang berisi API Laravel di `apps/api` dan web Vite di `apps/web`. Belum dicoba bersama pengguna pilot, dan belum di production. Stack lain belum dicoba sebagai monorepo.
>
> **Pembaruan 19 November 2026.** Package di workspace JavaScript (pnpm, npm, Yarn, atau Bun) kini dibangun dari root workspace, jadi lockfile dan package workspace bersama ikut terpakai. Fitur ini membutuhkan sakala-agent versi terbaru (v0.13.0 atau lebih baru) di node yang menjalankan project-mu. Sudah diuji dengan contoh monorepo pnpm di test Docker `sakala-agent`, tetapi belum dicoba lewat Sakala di production. Penjelasannya ada di [Monorepo JavaScript](#monorepo-javascript).

## Untuk siapa

Panduan ini untuk kamu yang menyimpan backend dan frontend dalam satu repository. Di akhir panduan, setiap aplikasi punya URL publiknya sendiri, dan kamu tahu batas yang masih berlaku untuk monorepo.

## Yang perlu disiapkan

- Sudah pernah mengikuti [Deploy Pertamamu](/docs/deploy-pertama), karena langkah dasarnya sama.
- Setiap aplikasi bisa dibangun dan dijalankan **hanya dari foldernya sendiri**, kecuali package di workspace JavaScript. Bagian [Monorepo JavaScript](#monorepo-javascript) dan [Batas saat ini](#batas-saat-ini) menjelaskan alasannya.
- Kuota proyek yang cukup. Setiap aplikasi memakai satu proyek, dan selama pilot satu akun punya 3 proyek.
- Database di luar Sakala kalau salah satu aplikasi membutuhkannya. Lihat [Menghubungkan database eksternal](/docs/database-eksternal).

## Cara kerjanya

Saat men-deploy, Sakala mengambil seluruh repository, lalu memakai folder di **Root directory** sebagai konteks build. Konteks build adalah folder yang dilihat proses build. Dockerfile dicari di folder itu, dan Railpack, yang membangun aplikasi tanpa Dockerfile, juga hanya membaca folder itu.

Untuk repository contoh, hasilnya dua proyek:

| Proyek | Root directory | Builder  | Hasilnya                         |
| ------ | -------------- | -------- | -------------------------------- |
| API    | `apps/api`     | Railpack | Aplikasi Laravel di URL sendiri  |
| Web    | `apps/web`     | Railpack | Situs statis Vite di URL sendiri |

Buat proyek API lebih dulu, karena web membutuhkan alamat API saat build.

### Monorepo JavaScript

Di workspace pnpm, npm, Yarn, atau Bun, lockfile dan package manager hanya ada di root repository. Kalau Root directory menunjuk package di workspace itu, misalnya `apps/web`, Sakala membangun dari root workspace, bukan dari folder package saja. Railpack memasang dependency seluruh workspace dengan lockfile-nya, lalu menjalankan script milik package itu.

Sakala menganggap folder sebagai package workspace kalau folder itu punya `package.json` sendiri, dan root di atasnya mendaftarkannya di `packages` pada `pnpm-workspace.yaml` atau di `workspaces` pada `package.json`.

Yang perlu kamu isi hanya **Root directory**. Biarkan **Build command** dan **Start command** kosong:

- **Build.** Sakala menjalankan script `build` milik package. Di pnpm perintahnya `pnpm --filter '<nama-package>...' run build`, jadi package workspace yang dipakainya, misalnya `packages/ui`, ikut dibangun lebih dulu.
- **Start.** Kalau package punya script `start`, script itu yang dijalankan. Kalau tidak ada dan package-nya SPA Vite, yaitu aplikasi satu halaman yang dibangun dengan Vite, hasil build disajikan sebagai situs statis. Tautan langsung ke halaman di dalam aplikasi, misalnya `/laporan/12`, tetap bekerja, karena server mengembalikan `index.html` untuk alamat itu.

Kalau kamu mengisi Build command, Start command, atau Release command, perintahnya dijalankan di dalam folder package. Jadi `pnpm run build` di proyek dengan Root directory `apps/web` berjalan di `apps/web`, dan pnpm tersedia.

Folder yang bukan package workspace, misalnya API Laravel di `apps/api`, tidak terpengaruh: build tetap hanya melihat isi Root directory. Proyek yang punya Dockerfile di Root directory juga tetap dibangun dari folder itu saja.

## Langkah 1: proyek API Laravel

Buat proyek baru dari repository-mu seperti biasa. Di langkah **Konfigurasi**:

- **Nama Proyek:** misalnya `facility-api`.
- **Root directory:** `apps/api`.
- **Start command:** biarkan kosong. Lihat catatan di bawah.

Isi **Environment Variables** berikut. Inilah yang dibutuhkan percobaan di repository contoh:

| Nama                         | Isinya                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `APP_KEY`                    | Buat di laptop dengan `php artisan key:generate --show`, lalu centang **Simpan sebagai rahasia**.             |
| `DB_CONNECTION`              | `pgsql`. Tanpa ini Laravel memakai default-nya sendiri, karena berkas `.env` tidak ikut ter-deploy.           |
| `DB_HOST`, `DB_PORT`         | Alamat dan port database eksternalmu.                                                                         |
| `DB_DATABASE`, `DB_USERNAME` | Nama database dan user-nya.                                                                                   |
| `DB_PASSWORD`                | Password database, sebagai rahasia.                                                                           |
| `RAILPACK_PHP_EXTENSIONS`    | `pdo_pgsql`. Meminta Railpack memasang ekstensi PHP untuk PostgreSQL. Tanpa ini Laravel tidak bisa terhubung. |

Tambahkan juga variabel lain yang diminta `.env.example` aplikasimu. Untuk aplikasi yang terbuka di internet, isi `APP_ENV=production` dan `APP_DEBUG=false`, supaya pesan error tidak membocorkan detail aplikasi.

Lalu tekan **Buat Proyek** dan **Deploy sekarang**.

**Yang seharusnya terlihat:** di Auto Detect, **Builder** menunjukkan Railpack dan **Framework** menunjukkan Laravel. Setelah **Deployment berhasil**, catat URL publik proyek ini.

**Catatan soal Start command.** Biasanya Railpack sudah tahu cara menjalankan Laravel, jadi Start command dibiarkan kosong. Saat percobaan di atas, cara start bawaan itu masih punya bug di Sakala, yang sedang diperbaiki di agent. Kalau deployment API-mu gagal di tahap aplikasi mulai atau pengecekan aplikasi, dan Logs tidak menunjukkan kesalahan di kodemu, isi Start command sementara dengan `php artisan serve --host=0.0.0.0 --port=$PORT`, lalu kosongkan lagi setelah perbaikannya rilis. `php artisan serve` adalah server pengembangan, jadi jangan menganggapnya cara permanen.

## Langkah 2: jalankan migration dengan sengaja

Jalankan migration sebagai langkah yang kamu putuskan sendiri, bukan sebagai efek samping setiap kali aplikasi start. Ada dua cara.

Cara pertama adalah perintah rilis: isi field **Release command** di tab **Pengaturan** proyek API dengan `php artisan migrate --force`. Sakala menjalankannya sekali setiap deployment, setelah build dan sebelum versi baru menerima trafik. Cara kerja dan syarat versinya ada di [Database dan Perintah Rilis](/docs/perintah-rilis).

Cara kedua, kalau perintah rilis belum tersedia di Sakala yang kamu pakai: dari laptop atau CI, arahkan Laravel ke database yang sama lalu jalankan migration sebelum men-deploy versi yang membutuhkannya.

```bash
cd apps/api
DB_CONNECTION=pgsql DB_HOST=alamat-database DB_PORT=5432 \
DB_DATABASE=nama_database DB_USERNAME=user_database DB_PASSWORD='password-database' \
php artisan migrate --force
```

Jangan simpan perintah berisi password itu di riwayat shell bersama, dan jangan commit ke repository. Database harus bisa dijangkau dari laptopmu. Kalau provider-mu membatasi alamat IP, izinkan dulu alamatmu.

Kamu mungkin tergoda menaruh `php artisan migrate --force && ...` di depan Start command. Itu berjalan setiap kali container start, termasuk saat restart dan redeploy. Migration yang gagal juga membuat aplikasi tidak pernah start, dan yang terlihat hanya `runtime_app_crashed`. Kalau project-mu punya beberapa replika, setiap replika juga menjalankannya bersamaan. Pakai perintah rilis sebagai gantinya.

Tulis migration yang tetap aman untuk versi aplikasi yang sedang berjalan, karena versi lama terus melayani sampai versi baru lolos pengecekan.

## Langkah 3: proyek web Vite

Buat proyek kedua dari repository dan branch yang sama:

- **Nama Proyek:** misalnya `facility-web`.
- **Root directory:** `apps/web`.
- **Build command** dan **Start command:** biarkan kosong.
- **Environment Variables:** `VITE_API_BASE_URL` dengan URL API dari langkah 1 ditambah path API-nya, misalnya `https://facility-api.sakala.app/api/v1`.

Vite memasukkan variabel `VITE_*` ke hasil build, jadi nilainya harus ada **saat build**, bukan hanya saat aplikasi berjalan. Railpack memberikan Environment Variables proyek ke setiap langkah build. Kalau nilainya berubah, tekan **Redeploy** supaya situsnya dibangun ulang. Nilai `VITE_*` terbaca oleh siapa pun yang membuka situsmu, jadi jangan menaruh secret di sana.

**Yang seharusnya terlihat:** Railpack mendeteksi Vite dan menyajikan hasil build sebagai situs statis. Setelah **Deployment berhasil**, buka URL web-nya dan pastikan halaman yang memanggil API benar-benar memuat data.

Jangan isi Start command dengan `vite preview`, `npm run preview`, atau `vite`. Server preview dan dev server Vite 6 ke atas menolak alamat yang tidak terdaftar di `allowedHosts`, termasuk alamat Sakala, sehingga setiap pengunjung mendapat 403. Railpack juga menjalankan script `start` di `package.json` kalau ada, jadi hapus script `start` yang menjalankan `vite preview`. Kegagalannya dijelaskan di [`runtime_app_host_blocked`](/docs/deploy-gagal#runtime_app_host_blocked).

Web dan API berada di alamat berbeda, jadi browser menganggap panggilan dari web ke API sebagai permintaan lintas origin. API harus mengizinkan origin web lewat CORS. Di Laravel, itu diatur di `config/cors.php` atau variabel yang dipakai aplikasimu.

## Batas saat ini

Bagian ini penting dibaca sebelum memindahkan monorepo-mu ke Sakala.

- **Di luar workspace JavaScript, hanya isi Root directory yang ikut dibangun.** Berkas di luar folder itu, termasuk konfigurasi bersama di root, tidak tersedia saat build. Di node yang masih menjalankan sakala-agent lebih lama dari v0.13.0, aturan ini juga berlaku untuk package workspace: lockfile di root tidak dipakai, package workspace seperti `packages/ui` tidak terlihat, dan build yang memakai pnpm gagal dengan `pnpm: not found`.
- **SPA selain Vite di workspace belum disajikan otomatis.** Untuk Astro statis, Create React App, Angular, atau React Router di dalam workspace, tambahkan script `start` di package atau isi Start command.
- **Belum ada watch paths.** Sakala belum bisa membatasi auto-deploy ke folder tertentu. Kalau auto-deploy menyala di beberapa proyek, setiap push ke branch itu membangun ulang semua proyek tersebut, walaupun hanya satu aplikasi yang berubah. Supaya build tidak terbuang, nyalakan auto-deploy hanya di proyek yang paling sering berubah, dan tekan **Redeploy** manual untuk yang lain.
- **Satu web service per proyek.** Queue worker dan scheduler Laravel belum bisa dijalankan di Sakala.
- **Penyimpanan tidak tetap.** Berkas yang ditulis aplikasi, misalnya session `file`, cache `file`, dan upload, hilang setiap deploy baru selesai. Pakai database atau layanan eksternal untuk data yang harus bertahan.

## Kalau gagal

| Yang terlihat                        | Kemungkinan penyebab                                                      | Yang perlu dilakukan                                                                                                          |
| ------------------------------------ | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `runtime_root_directory_invalid`     | Folder di Root directory tidak ada di branch itu                          | Lihat [`runtime_root_directory_invalid`](/docs/deploy-gagal#runtime_root_directory_invalid)                                   |
| `runtime_build_failed`               | Build butuh berkas di luar Root directory, misalnya konfigurasi di root   | Baca Logs. Kalau yang hilang berkas di luar folder aplikasi, lihat [Batas saat ini](#batas-saat-ini)                          |
| Logs berisi `pnpm: not found`        | Node belum menjalankan sakala-agent v0.13.0 atau lebih baru               | Pembangunan dari root workspace belum aktif di node itu. Ceritakan lewat **Kirim Masukan** di Console                         |
| `runtime_app_host_blocked`           | Start command atau script `start` menjalankan `vite preview` atau `vite`  | Kosongkan Start command. Lihat [`runtime_app_host_blocked`](/docs/deploy-gagal#runtime_app_host_blocked)                      |
| Laravel tidak tersambung ke database | `DB_CONNECTION` atau `RAILPACK_PHP_EXTENSIONS` belum diisi                | Lengkapi variabelnya, lalu **Redeploy**. Lihat juga [Kalau koneksinya gagal](/docs/database-eksternal#kalau-koneksinya-gagal) |
| Proyek API gagal saat aplikasi mulai | `APP_KEY` kosong, migration gagal di Start command, atau bug start bawaan | Baca baris terakhir Logs, lalu lihat [catatan soal Start command](#langkah-1-proyek-api-laravel)                              |
| Web tampil, tetapi data tidak muncul | `VITE_API_BASE_URL` kosong atau salah saat build, atau CORS menolak       | Cek panggilan API di DevTools browser, perbaiki variabelnya, lalu **Redeploy**                                                |

Kode lain dijelaskan di [Saat deploy gagal](/docs/deploy-gagal).

## Langkah berikutnya

Untuk aturan variabel saat build dan contoh Vite dengan Dockerfile, baca [Menyiapkan Dockerfile](/docs/dockerfile). Untuk koneksi data, baca [Menghubungkan database eksternal](/docs/database-eksternal). Kalau monorepo-mu butuh watch paths, atau workspace dengan stack selain JavaScript, ceritakan lewat menu **Kirim Masukan** di Console, supaya kami tahu kebutuhannya.
