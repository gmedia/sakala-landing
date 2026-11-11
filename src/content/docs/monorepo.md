---
title: Men-deploy Monorepo
description: Satu repository berisi beberapa aplikasi, misalnya API Laravel dan web Vite. Buat satu proyek Sakala per aplikasi dengan Root directory, dan pahami batasnya saat ini.
track: panduan
section: Panduan deploy
order: 4.5
---

# Men-deploy Monorepo

Monorepo adalah satu repository yang berisi beberapa aplikasi, misalnya `apps/api` dan `apps/web`. Sakala men-deploy monorepo dengan membuat **satu proyek per aplikasi**. Semua proyek menunjuk repository dan branch yang sama, tetapi masing-masing punya **Root directory** sendiri.

> **Status per 11 November 2026.** Sakala belum dibuka untuk umum. Panduan ini ditulis dari satu percobaan sungguhan di lingkungan pengembangan Sakala terhadap repository [`gmedia/facility-reporting`](https://github.com/gmedia/facility-reporting), yang berisi API Laravel di `apps/api` dan web Vite di `apps/web`. Belum dicoba bersama pengguna pilot, dan belum di production. Stack lain belum dicoba sebagai monorepo.

## Untuk siapa

Panduan ini untuk kamu yang menyimpan backend dan frontend dalam satu repository. Di akhir panduan, setiap aplikasi punya URL publiknya sendiri, dan kamu tahu batas yang masih berlaku untuk monorepo.

## Yang perlu disiapkan

- Sudah pernah mengikuti [Deploy Pertamamu](/docs/deploy-pertama), karena langkah dasarnya sama.
- Setiap aplikasi bisa dibangun dan dijalankan **hanya dari foldernya sendiri**. Bagian [Batas saat ini](#batas-saat-ini) menjelaskan alasannya.
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

Sakala tidak menjalankan `php artisan migrate` untukmu, dan belum ada tahap khusus untuk migration sebelum deploy. Jalankan migration sebagai langkah yang kamu putuskan sendiri, bukan sebagai efek samping setiap kali aplikasi start.

Cara yang kami sarankan: dari laptop atau CI, arahkan Laravel ke database yang sama lalu jalankan migration sebelum men-deploy versi yang membutuhkannya.

```bash
cd apps/api
DB_CONNECTION=pgsql DB_HOST=alamat-database DB_PORT=5432 \
DB_DATABASE=nama_database DB_USERNAME=user_database DB_PASSWORD='password-database' \
php artisan migrate --force
```

Jangan simpan perintah berisi password itu di riwayat shell bersama, dan jangan commit ke repository. Database harus bisa dijangkau dari laptopmu. Kalau provider-mu membatasi alamat IP, izinkan dulu alamatmu.

Kamu mungkin tergoda menaruh `php artisan migrate --force && ...` di depan Start command. Itu berjalan setiap kali container start, termasuk saat restart dan redeploy. Migration yang gagal juga membuat aplikasi tidak pernah start, dan yang terlihat hanya `runtime_app_crashed`. Kalau terpaksa memakainya, buang lagi setelah migration-nya selesai.

Tulis migration yang tetap aman untuk versi aplikasi yang sedang berjalan, karena versi lama terus melayani sampai versi baru lolos pengecekan.

## Langkah 3: proyek web Vite

Buat proyek kedua dari repository dan branch yang sama:

- **Nama Proyek:** misalnya `facility-web`.
- **Root directory:** `apps/web`.
- **Environment Variables:** `VITE_API_BASE_URL` dengan URL API dari langkah 1 ditambah path API-nya, misalnya `https://facility-api.run.sakala.dev/api/v1`.

Vite memasukkan variabel `VITE_*` ke hasil build, jadi nilainya harus ada **saat build**, bukan hanya saat aplikasi berjalan. Railpack memberikan Environment Variables proyek ke setiap langkah build. Kalau nilainya berubah, tekan **Redeploy** supaya situsnya dibangun ulang. Nilai `VITE_*` terbaca oleh siapa pun yang membuka situsmu, jadi jangan menaruh secret di sana.

**Yang seharusnya terlihat:** Railpack mendeteksi Vite dan menyajikan hasil build sebagai situs statis. Setelah **Deployment berhasil**, buka URL web-nya dan pastikan halaman yang memanggil API benar-benar memuat data.

Web dan API berada di alamat berbeda, jadi browser menganggap panggilan dari web ke API sebagai permintaan lintas origin. API harus mengizinkan origin web lewat CORS. Di Laravel, itu diatur di `config/cors.php` atau variabel yang dipakai aplikasimu.

## Batas saat ini

Bagian ini penting dibaca sebelum memindahkan monorepo-mu ke Sakala.

- **Hanya isi Root directory yang ikut dibangun.** Berkas di luar folder itu tidak tersedia saat build. Artinya lockfile di root repository, misalnya `pnpm-lock.yaml` di repository contoh, tidak dipakai. Dependency web di-install tanpa lockfile itu, sehingga versinya bisa berbeda dari yang kamu uji di laptop. Package workspace bersama, misalnya `packages/ui` yang di-import beberapa aplikasi, dan konfigurasi bersama di root juga tidak terlihat. Aplikasi yang bergantung pada package workspace belum bisa di-deploy lewat Sakala.
- **Belum ada watch paths.** Sakala belum bisa membatasi auto-deploy ke folder tertentu. Kalau auto-deploy menyala di beberapa proyek, setiap push ke branch itu membangun ulang semua proyek tersebut, walaupun hanya satu aplikasi yang berubah. Supaya build tidak terbuang, nyalakan auto-deploy hanya di proyek yang paling sering berubah, dan tekan **Redeploy** manual untuk yang lain.
- **Satu web service per proyek.** Queue worker dan scheduler Laravel belum bisa dijalankan di Sakala.
- **Penyimpanan tidak tetap.** Berkas yang ditulis aplikasi, misalnya session `file`, cache `file`, dan upload, hilang setiap deploy baru selesai. Pakai database atau layanan eksternal untuk data yang harus bertahan.

## Kalau gagal

| Yang terlihat                        | Kemungkinan penyebab                                                      | Yang perlu dilakukan                                                                                                          |
| ------------------------------------ | ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `runtime_root_directory_invalid`     | Folder di Root directory tidak ada di branch itu                          | Lihat [`runtime_root_directory_invalid`](/docs/deploy-gagal#runtime_root_directory_invalid)                                   |
| `runtime_build_failed`               | Build butuh berkas di luar Root directory, misalnya package workspace     | Baca Logs. Kalau yang hilang berkas di luar folder aplikasi, lihat [Batas saat ini](#batas-saat-ini)                          |
| Laravel tidak tersambung ke database | `DB_CONNECTION` atau `RAILPACK_PHP_EXTENSIONS` belum diisi                | Lengkapi variabelnya, lalu **Redeploy**. Lihat juga [Kalau koneksinya gagal](/docs/database-eksternal#kalau-koneksinya-gagal) |
| Proyek API gagal saat aplikasi mulai | `APP_KEY` kosong, migration gagal di Start command, atau bug start bawaan | Baca baris terakhir Logs, lalu lihat [catatan soal Start command](#langkah-1-proyek-api-laravel)                              |
| Web tampil, tetapi data tidak muncul | `VITE_API_BASE_URL` kosong atau salah saat build, atau CORS menolak       | Cek panggilan API di DevTools browser, perbaiki variabelnya, lalu **Redeploy**                                                |

Kode lain dijelaskan di [Saat deploy gagal](/docs/deploy-gagal).

## Langkah berikutnya

Untuk aturan variabel saat build dan contoh Vite dengan Dockerfile, baca [Menyiapkan Dockerfile](/docs/dockerfile). Untuk koneksi data, baca [Menghubungkan database eksternal](/docs/database-eksternal). Kalau monorepo-mu butuh package workspace atau watch paths, ceritakan lewat menu **Kirim Masukan** di Console, supaya kami tahu kebutuhannya.
