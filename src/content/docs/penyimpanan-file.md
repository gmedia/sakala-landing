---
title: Penyimpanan File
description: Berkas yang ditulis aplikasi ke dalam container hilang begitu container berhenti, termasuk saat proyek tidur dan setiap kali deploy. Simpan upload dan berkas lain di object storage S3-compatible, dan data di database.
track: panduan
section: Panduan deploy
order: 4.1
---

# Penyimpanan File

Berkas yang ditulis aplikasimu ke dalam container, misalnya gambar yang di-upload pengguna, isi `storage/app` Laravel, atau berkas SQLite, hanya bertahan selama container itu terus berjalan. Begitu container berhenti, termasuk saat proyek tidur dan setiap kali deploy, berkasnya hilang. Simpan berkas seperti itu di object storage S3-compatible, dan simpan data terstruktur di database. Object storage dari Sakala sendiri, [bucket terkelola](/docs/bucket-terkelola), masih pilot terbatas yang dibuka per workspace, jadi panduan ini memakai provider di luar Sakala.

> **Status panduan ini per 23 November 2026.** Contoh kode di halaman ini sudah dijalankan secara lokal terhadap dua object storage S3-compatible di Docker, Garage 2.5.0 dan RustFS 1.0.6: Laravel 13 dengan `league/flysystem-aws-s3-v3` 3.35, dan Node 24 dengan AWS SDK for JavaScript v3. Ia belum dicoba terhadap provider sungguhan atau lewat Sakala di production.

## Kenapa berkas hilang

Di Sakala, aplikasimu berjalan di dalam sandbox gVisor, yaitu lapisan isolasi yang memisahkan aplikasi dari server. Berkas yang ditulis ke filesystem container disimpan di dalam sandbox itu, dan ikut hilang begitu container berhenti, walaupun container yang sama dinyalakan lagi. Sakala juga tidak memasang folder dari server ke container aplikasi, jadi tidak ada tempat di luar container yang ikut bertahan.

Container berhenti lebih sering daripada yang mungkin kamu kira. Berkas di dalamnya hilang saat:

- proyek tidur setelah 30 menit tanpa pengunjung, lalu bangun lagi;
- kamu menekan **Restart** di Console;
- aplikasi crash lalu dinyalakan ulang otomatis;
- ada deploy dari push baru, **Redeploy** (termasuk redeploy tanpa build), atau **Kembalikan ke versi ini** (rollback), karena setiap deployment membuat container baru;
- proyek dihapus.

Jadi anggap filesystem container sebagai tempat sementara. Kalau proyekmu berjalan dengan beberapa replika, setiap replika juga punya filesystem sendiri. Berkas yang di-upload lewat replika pertama tidak terlihat oleh replika kedua, jadi pengunjung bisa melihat gambar muncul lalu hilang tergantung replika mana yang melayaninya.

Di Sakala yang kamu jalankan sendiri (self-host) dengan runtime `runc` biasa, tanpa gVisor, berkas bertahan saat tidur dan **Restart**, tetapi tetap hilang setiap kali deploy.

## Yang dipakai sebagai gantinya

- **Data terstruktur**, seperti akun pengguna, pesanan, atau isi postingan, simpan di database: [database terkelola](/docs/database-terkelola) yang masih pilot terbatas, atau [database eksternal](/docs/database-eksternal).
- **Berkas**, seperti gambar upload, PDF, atau hasil export, simpan di object storage, yaitu layanan yang menyimpan berkas di dalam _bucket_ dan diakses lewat HTTP. Pilih yang **S3-compatible**, artinya memakai API yang sama dengan Amazon S3, supaya library yang sama bisa dipakai di banyak provider.
- **Berkas sementara**, seperti cache atau hasil olahan yang bisa dibuat ulang, boleh tetap ditulis ke container, misalnya ke `/tmp`, asal aplikasimu tidak rusak kalau berkas itu hilang.

## Memilih provider

Selama workspace-mu belum mendapat kuota [bucket terkelola](/docs/bucket-terkelola), object storage untuk proyek di Sakala berarti provider di luar Sakala, misalnya Cloudflare R2, Amazon S3, atau Backblaze B2. Nama-nama ini hanya contoh. Sakala belum punya integrasi resmi dengan mereka dan belum diuji bersama mereka.

Yang perlu kamu cek sebelum memilih:

- **Paket gratis dan batasnya.** Lihat batas ukuran penyimpanan, jumlah request, dan biaya transfer keluar di halaman harga provider. Angkanya berubah, jadi cek langsung di sana.
- **Akses privat.** Bucket sebaiknya privat, lalu browser mengambil berkas lewat link sementara yang dibuat aplikasimu. Cara membuatnya ada di contoh Laravel dan Node di bawah.
- **Access key per bucket.** Pilih provider yang bisa membuat access key yang hanya berlaku untuk satu bucket. Kalau kunci itu bocor, yang terbuka hanya bucket itu, bukan seluruh akunmu.

Dari provider, kamu butuh lima nilai: alamat endpoint, region, nama bucket, access key ID, dan secret access key. Cek juga di petunjuk provider apakah ia memakai _path-style_, yaitu alamat berbentuk `https://endpoint/nama-bucket/berkas`, atau alamat dengan nama bucket di depan domain.

## Menyimpan kunci di Sakala

Isi nilai dari provider sebagai variabel di tab **Variabel** proyekmu. Panduan ini memakai nama yang sudah dibaca konfigurasi bawaan Laravel, supaya contoh Node dan Laravel memakai nama yang sama:

| Variabel                      | Isi                                                                       |
| ----------------------------- | ------------------------------------------------------------------------- |
| `AWS_ENDPOINT`                | Alamat endpoint dari provider, diawali `https://`                         |
| `AWS_DEFAULT_REGION`          | Region dari provider                                                      |
| `AWS_BUCKET`                  | Nama bucket                                                               |
| `AWS_ACCESS_KEY_ID`           | Access key ID                                                             |
| `AWS_SECRET_ACCESS_KEY`       | Secret access key. Centang **Simpan sebagai secret**                      |
| `AWS_USE_PATH_STYLE_ENDPOINT` | `true` kalau provider memakai path-style, selain itu `false`              |
| `FILESYSTEM_DISK`             | Hanya untuk Laravel: `s3`, supaya berkas disimpan ke bucket secara bawaan |

Jangan menaruh nilai-nilai ini di repository, di `.env` yang ter-commit, atau di Dockerfile. Setelah menyimpan, tekan **Redeploy**. Variabel ini dibaca saat aplikasi berjalan, jadi biasanya cukup [redeploy tanpa build](/docs/variabel-dan-secret#redeploy-tanpa-build). Penjelasan lengkap soal secret ada di [Variabel dan Secret](/docs/variabel-dan-secret#secret).

## Laravel

Laravel sudah punya disk `s3` di `config/filesystems.php` yang membaca variabel di atas. Yang perlu ditambahkan hanya driver-nya:

```bash
composer require league/flysystem-aws-s3-v3 "^3.0" --with-all-dependencies
```

Commit `composer.json` dan `composer.lock`. Lalu isi variabel di tabel sebelumnya, termasuk `FILESYSTEM_DISK=s3`. `.env.example` bawaan Laravel tidak memuat `AWS_ENDPOINT`, tetapi `config/filesystems.php` tetap membacanya.

Dengan `FILESYSTEM_DISK=s3`, kode yang tidak menyebut disk langsung menyimpan ke bucket:

```php
// Menyimpan upload ke bucket. $path berisi misalnya "avatars/a1b2c3.jpg".
$path = $request->file('foto')->store('avatars');

// Link sementara supaya browser bisa membuka berkas dari bucket privat.
$url = Storage::temporaryUrl($path, now()->addMinutes(10));
```

Kode yang menyebut disk `local` atau `public`, misalnya `->store('avatars', 'public')`, tetap menulis ke dalam container, jadi berkasnya tetap hilang begitu container berhenti. Ganti disk-nya menjadi `s3`, atau hapus argumen itu. `php artisan storage:link` juga tidak membantu di Sakala, karena folder yang ditautkannya ada di dalam container.

`Storage::url($path)` hanya berguna kalau bucket-nya publik. Ia menyusun alamat dari `AWS_URL`, yaitu alamat publik bucket yang diberikan provider. Untuk bucket privat, pakai `Storage::temporaryUrl`.

## Node

Pasang AWS SDK for JavaScript v3, lalu pastikan `package-lock.json` ikut ter-commit:

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

Contoh modul `storage.js` yang membaca variabel yang sama dengan Laravel:

```js
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3Client({
  endpoint: process.env.AWS_ENDPOINT,
  region: process.env.AWS_DEFAULT_REGION,
  forcePathStyle: process.env.AWS_USE_PATH_STYLE_ENDPOINT === "true",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const bucket = process.env.AWS_BUCKET;

// Menyimpan berkas, misalnya hasil upload, ke bucket.
async function saveFile(key, body, contentType) {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
}

// Link sementara supaya browser bisa membuka berkas dari bucket privat.
function fileUrl(key, seconds = 600) {
  return getSignedUrl(s3, new GetObjectCommand({ Bucket: bucket, Key: key }), {
    expiresIn: seconds,
  });
}

module.exports = { saveFile, fileUrl };
```

Di route upload, panggil `saveFile("avatars/" + namaBerkas, isiBerkas, tipeBerkas)` lalu simpan key-nya di database. Saat halaman perlu menampilkan berkas itu, buat link dengan `await fileUrl(key)`. Link-nya berhenti berlaku setelah `seconds` detik, jadi buat link baru setiap kali halaman dimuat, jangan disimpan.

`region` dan `endpoint` diisi langsung di kode karena SDK JavaScript tidak membaca `AWS_DEFAULT_REGION` atau `AWS_ENDPOINT` sendiri.

## Berkas SQLite

SQLite menyimpan seluruh database di satu berkas di dalam container. Di Sakala, berkas itu beserta semua datanya hilang begitu container berhenti, bahkan saat proyek hanya tidur karena 30 menit tidak dikunjungi. Ini alasan kuat untuk memakai database sungguhan. Kalau proyekmu punya beberapa replika, setiap replika juga punya database SQLite sendiri yang isinya berbeda.

Laravel 11 ke atas memakai SQLite secara bawaan (`DB_CONNECTION=sqlite`), dan menyimpan session, cache, serta antrean job di database yang sama. Artinya, tanpa diganti, pengguna juga logout setiap kali proyek tidur atau di-deploy. Pindahkan ke PostgreSQL lewat [database terkelola](/docs/database-terkelola) atau [database eksternal](/docs/database-eksternal).

## Bucket terkelola

[Bucket terkelola](/docs/bucket-terkelola) adalah bucket S3 yang dibuat dan dijalankan Sakala lalu dipasang ke proyek seperti database terkelola. Statusnya pilot terbatas: kuota bawaannya 0, dan workspace dibuka satu per satu oleh admin Sakala. Sakala mengisi variabel `AWS_*` yang sama dengan panduan ini, ditambah `AWS_ENDPOINT_URL_S3` dan `AWS_REGION`, jadi contoh Laravel dan Node di atas bisa dipakai tanpa diubah saat kamu pindah ke bucket terkelola. `FILESYSTEM_DISK=s3` tetap kamu isi sendiri. Sebelum pindah, hapus variabel `AWS_*` lama dari tab **Variabel**, karena variabel proyek dengan nama yang sama menimpa nilai dari bucket.

## Langkah berikutnya

Kalau aplikasimu juga menyimpan data, siapkan [database terkelola](/docs/database-terkelola) atau [database eksternal](/docs/database-eksternal). Untuk cara variabel bekerja secara umum, baca [Variabel dan Secret](/docs/variabel-dan-secret).
