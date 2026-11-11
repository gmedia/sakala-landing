---
title: Menghubungkan Database Eksternal
description: Sakala belum menyediakan database. Begini cara menghubungkan aplikasimu ke database di luar Sakala lewat environment variable, tanpa membocorkan password.
track: panduan
section: Panduan deploy
order: 4
---

# Menghubungkan Database Eksternal

Sakala MVP tidak menyediakan database. Kalau aplikasimu butuh database, kamu menyewa atau menyiapkannya sendiri di luar Sakala, lalu memberikan alamatnya ke aplikasi lewat environment variable `DATABASE_URL`.

Artinya backup, migration, dan pemulihan data menjadi tanggung jawabmu. Sakala hanya menjalankan aplikasinya. Container juga tidak punya penyimpanan tetap, jadi berkas SQLite atau hasil upload yang ditulis ke dalam container hilang setiap kali deploy baru selesai.

> **Status per 6 November 2026.** Sakala belum dibuka untuk umum. Contoh kode di halaman ini sudah dijalankan secara lokal terhadap PostgreSQL di Docker, tanpa TLS. Ia belum dicoba terhadap provider sungguhan atau lewat Sakala di production.

## Untuk siapa

Panduan ini untuk peserta pilot yang aplikasinya perlu menyimpan data, dan untuk siapa pun yang sedang menyiapkan aplikasinya. Di akhir panduan, aplikasimu tersambung ke database dan kamu tahu cara mengecek, mengganti password, dan pulih kalau koneksinya gagal.

## Yang perlu disiapkan

- Aplikasi yang sudah lolos [Menyiapkan Dockerfile](/docs/dockerfile) atau bisa dibangun oleh Railpack.
- Project di Console, dengan akses ke tab **Environment Variables**.
- Database di provider pilihanmu.

## Memilih provider

Banyak layanan menyediakan PostgreSQL atau MySQL terkelola, misalnya Neon, Supabase, Aiven, dan penyedia cloud lain, dan kampusmu mungkin punya servernya sendiri. Nama-nama ini hanya contoh. Sakala belum punya integrasi resmi dengan mereka dan belum diuji bersama mereka.

Yang perlu kamu cek sebelum memilih:

- **Bisa dijangkau dari internet.** Aplikasi di Sakala tidak berada di jaringan privat kampus atau kantormu, jadi database yang hanya terbuka di jaringan privat tidak bisa dihubungi.
- **Mendukung TLS.** TLS mengenkripsi koneksi, supaya password dan data tidak terbaca di perjalanan.
- **Batas paket gratis.** Perhatikan jumlah koneksi, ukuran data, dan apakah database-nya tidur saat tidak dipakai.
- **Backup.** Cari tahu apakah ada backup otomatis dan bagaimana cara memulihkannya.

## Langkah 1: ambil `DATABASE_URL`

Provider biasanya menampilkan connection string di halaman database. Bentuknya seperti ini:

```text
postgresql://NAMA_USER:PASSWORD@HOST:5432/NAMA_DATABASE?sslmode=require
```

Semua huruf besar di atas adalah contoh, bukan nilai sungguhan. Kalau password-mu mengandung karakter seperti `@`, `:`, atau `/`, karakter itu harus di-encode, atau buat password baru yang hanya berisi huruf dan angka.

Jangan menaruh nilai ini di repository, di `.env` yang ter-commit, di Dockerfile, atau di log.

## Langkah 2: isi di Console

Kamu bisa mengisinya saat membuat proyek, atau nanti: buka project, masuk ke tab **Environment Variables**, tekan **Tambah Variabel**, lalu isi nama `DATABASE_URL` dengan connection string tadi. Biarkan **Simpan sebagai rahasia** tercentang. Nama variabel harus huruf besar, angka, dan garis bawah.

Variabel baru dibaca aplikasi setelah deployment berikutnya, jadi tekan **Redeploy** setelah menyimpan. Setiap deployment memakai salinan variabel saat ia dibuat.

## Langkah 3: baca di kode

Contoh untuk Node dengan library `pg`. Tambahkan dengan `npm install pg`, lalu pastikan `package-lock.json` ikut ter-commit.

```js
const http = require("node:http");
const { Pool } = require("pg");

const port = Number(process.env.PORT) || 3000;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3 });

// Tanpa ini, koneksi yang putus saat menganggur bisa mematikan aplikasi.
pool.on("error", (err) =>
  console.error("Koneksi database putus:", err.message),
);

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");

  if (pathname !== "/db") {
    res.end("Aplikasi hidup\n");
    return;
  }

  try {
    await pool.query("SELECT 1");
    res.end("Database tersambung\n");
  } catch (err) {
    // Cukup catat pesannya. Jangan pernah mencetak DATABASE_URL.
    console.error("Gagal ke database:", err.message || err.code);
    res.statusCode = 503;
    res.end("Database belum tersambung\n");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Listening on 0.0.0.0:${port}`);
});
```

Dockerfile-nya:

```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY server.js ./
USER node
CMD ["node", "server.js"]
```

Perhatikan bahwa `/` tidak menyentuh database. Pengecekan Sakala memanggil `/`. Kalau alamat itu ikut gagal saat database bermasalah, deploy ikut gagal dengan `runtime_app_unhealthy`, padahal aplikasinya sendiri baik-baik saja.

Aplikasi juga sebaiknya tidak langsung berhenti saat database belum bisa dihubungi, karena itu akan menjadi `runtime_app_crashed`. `max: 3` membatasi jumlah koneksi, karena paket gratis biasanya punya batas yang kecil.

## Jaringan, TLS, dan daftar IP

Aplikasi di Sakala berjalan di dalam container, jadi `localhost` berarti container itu sendiri. Database di laptopmu tidak bisa dihubungi lewat alamat `localhost`, begitu juga layanan `localhost` lainnya.

Untuk TLS, ikuti connection string dari provider, yang biasanya sudah memuat `sslmode=require`. Kalau muncul error sertifikat, pakai sertifikat CA dari provider. Jangan mematikan verifikasinya hanya supaya error-nya hilang.

Beberapa provider hanya menerima koneksi dari daftar IP tertentu. Per 6 November 2026 Sakala belum menerbitkan daftar IP keluar yang tetap, jadi jangan mengandalkan satu alamat. Kalau provider mewajibkan daftar IP, tanyakan dulu ke pengelola pilot. Membuka akses dari semua alamat (`0.0.0.0/0`) adalah keputusanmu sendiri, dan kalau kamu memilihnya, pakai password yang kuat dan TLS.

## Migration dan backup adalah tanggung jawabmu

Sakala tidak menjalankan migration dan tidak mem-backup data. Cara paling sederhana adalah menjalankan migration dari laptop, dengan `DATABASE_URL` yang hanya hidup di terminalmu. `read -rs` membuat nilainya tidak tampil di layar dan tidak tersimpan di riwayat shell:

```bash
read -rs DATABASE_URL && export DATABASE_URL
npm run migrate
unset DATABASE_URL
```

`npm run migrate` di sini adalah script di project-mu sendiri, jadi sesuaikan dengan alat migration yang kamu pakai.

Kalau migration dijalankan saat aplikasi mulai, ingat satu hal: **deploy yang gagal mengembalikan trafik ke versi lama, tetapi tidak mengembalikan datanya.** Skema yang sudah berubah tetap berubah, dan versi lama bisa rusak karena membaca skema baru.

Sebelum migration yang menghapus atau mengubah data:

1. Buat backup, lalu pastikan backup itu benar-benar bisa dipulihkan.
2. Coba dulu di database salinan.
3. Pecah perubahannya. Tambahkan kolom baru dan deploy kode yang memakainya, baru hapus kolom lama di deploy berikutnya.

## Cek hasilnya

Setelah deploy berhasil, buka alamat aplikasimu:

```bash
curl -i https://NAMA-PROJECT.run.sakala.dev/db
```

`Database tersambung` berarti koneksinya benar. Ganti alamat di atas dengan URL project-mu. Kamu juga bisa mengecek dari laptop kalau punya `psql`, yang membantu memastikan apakah masalahnya di database atau di aplikasi:

```bash
read -rs DATABASE_URL && export DATABASE_URL
psql "$DATABASE_URL" -c "SELECT 1"
unset DATABASE_URL
```

## Kalau koneksinya gagal

Cari pesannya di panel **Logs** pada detail deployment. Pesan di bawah ini muncul dari percobaan dengan library `pg`, kecuali baris timeout, sertifikat, dan `too many connections` yang belum kami coba. Library lain memakai kata yang sedikit berbeda.

| Pesan di log                                  | Artinya                                       | Yang perlu dilakukan                                                                 |
| --------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------ |
| `getaddrinfo ENOTFOUND ...`                   | Nama host tidak ditemukan                     | Salin ulang host dari provider, atau periksa apakah `DATABASE_URL` sudah terisi      |
| `ECONNREFUSED`                                | Tidak ada yang menerima koneksi di alamat itu | Pastikan `DATABASE_URL` sudah terisi, host-nya bukan `localhost`, dan port-nya benar |
| Timeout tanpa pesan lain                      | Koneksi diblokir di jalan                     | Periksa daftar IP di provider, dan pastikan database-nya tidak sedang tidur          |
| `password authentication failed for user ...` | Nama user atau password salah                 | Buat ulang password, ganti `DATABASE_URL`, lalu Redeploy                             |
| `database "..." does not exist`               | Nama database salah                           | Samakan dengan nama di provider                                                      |
| `The server does not support SSL connections` | Server tidak memakai TLS, klien memintanya    | Pastikan host-nya benar. Untuk provider publik, jangan turunkan pengaturan TLS       |
| Error sertifikat                              | Sertifikat server tidak dipercaya             | Pakai sertifikat CA dari provider                                                    |
| `too many connections`                        | Jatah koneksi di provider habis               | Kecilkan `max`, atau lihat batas koneksi paketmu                                     |

Kalau kamu minta bantuan, kirim pesan error dan kode kegagalannya saja. Jangan pernah mengirim `DATABASE_URL`.

Selama kamu memperbaiki, versi yang terakhir berhasil tetap melayani pengunjung. Kalau variabel yang baru ternyata salah, isi kembali nilai yang lama dan lakukan Redeploy.

## Mengganti password

Lakukan ini secara berkala, dan segera kalau password mungkin bocor.

1. Buat user atau password baru di provider. Kalau bisa, biarkan yang lama aktif dulu.
2. Di tab **Environment Variables**, tekan **Ubah** pada baris `DATABASE_URL`, lalu simpan nilai baru.
3. Tekan **Redeploy**. Versi yang sedang berjalan tetap memakai nilai lama sampai deploy baru berhasil.
4. Cek `/db` di versi baru.
5. Matikan password lama di provider.

Sakala menyamarkan nilai secret di log, tetapi tidak sempurna. Nilai yang kurang dari 8 karakter dan kata umum tidak disamarkan, dan sebagian isi seperti nama host tidak dianggap secret. Jadi jangan mencetaknya sejak awal. Kalau secret terlihat di log, anggap sudah bocor dan ganti.

## Langkah berikutnya

Kalau deploy-nya gagal sebelum sempat tersambung ke database, buka [Saat deploy gagal](/docs/deploy-gagal). Untuk aturan port dan variabel saat build, lihat [Menyiapkan Dockerfile](/docs/dockerfile).
