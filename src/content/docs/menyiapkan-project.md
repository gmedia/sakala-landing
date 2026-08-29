---
title: Menyiapkan Project
description: Yang perlu dibereskan di repository supaya project siap dideploy, dan bisa kamu kerjakan sekarang juga.
track: panduan
section: Menyiapkan project
order: 3
---

# Menyiapkan Project

Project yang berjalan mulus di laptop belum tentu berjalan di tempat lain. Penyebabnya hampir selalu sama: ada sesuatu yang tersedia di laptopmu tetapi tidak ikut tercatat di repository.

Halaman ini bisa kamu kerjakan **sekarang**, bahkan sebelum Sakala tersedia. Isinya berlaku untuk platform deployment mana pun.

## 1. Semua yang dibutuhkan ada di repository

Lingkungan deployment hanya menerima apa yang ada di repository. File yang cuma ada di laptopmu tidak ikut terbawa.

Periksa dengan cara paling jujur: clone repository-mu sendiri ke folder baru, lalu jalankan dari nol. Kalau gagal, deployment juga akan gagal.

## 2. Dependency tercatat, bukan terpasang manual

Daftar dependency harus ada di berkas yang dibaca mesin, misalnya `package.json`, `composer.json`, `requirements.txt`, atau `go.mod`.

Kalau kamu pernah memasang sesuatu secara manual di laptop agar project jalan, itu harus dicatat juga. Kalau tidak, aplikasi akan gagal saat build.

## 3. Aplikasi membaca port dari environment

Ini penyebab kegagalan yang paling sering, dan paling membingungkan karena aplikasinya terlihat berhasil dijalankan.

Di laptop, kamu biasanya menjalankan aplikasi pada port tetap seperti `3000` atau `8000`. Di lingkungan deployment, port ditentukan oleh sistem dan diberitahukan lewat environment variable.

Aplikasi harus membaca port itu, bukan memaksakan angka sendiri:

```js
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0");
```

Perhatikan juga alamat bind-nya. `localhost` di dalam container berarti "hanya di dalam container ini", sehingga tidak dapat dijangkau dari luar. Gunakan `0.0.0.0`.

## 4. Rahasia tidak ikut masuk repository

Password database, API key, dan token tidak boleh berada di dalam repository, bahkan di repository privat.

Pindahkan ke environment variable, dan pastikan berkas seperti `.env` masuk `.gitignore`. Cara mengelolanya dijelaskan pada [Variabel dan Secret](/docs/variabel-dan-secret).

Kalau rahasia pernah ter-commit, mengganti berkasnya tidak cukup. Riwayat Git masih menyimpannya, jadi kredensialnya harus diganti.

## 5. Jangan mengandalkan berkas lokal yang tidak permanen

Berkas yang ditulis aplikasi saat berjalan, misalnya hasil upload atau database SQLite, bisa hilang ketika aplikasi dijalankan ulang atau dideploy ulang.

Untuk demo dan tugas hal itu sering tidak masalah. Yang penting kamu menyadarinya, bukan terkejut saat datanya hilang.

## 6. Cara build dan menjalankan tercatat jelas

Lingkungan deployment perlu tahu dua hal: bagaimana project dibangun, dan perintah apa yang menjalankannya.

Sebagian besar framework populer sudah punya konvensi yang dapat dikenali otomatis. Kalau project-mu tidak biasa, sediakan `Dockerfile` supaya kamu sendiri yang menentukan caranya.

Sakala mendahulukan `Dockerfile` milikmu bila tersedia. Urutan lengkapnya dijelaskan pada [Alur Deployment](/docs/teknis/alur-deployment).

## Daftar periksa singkat

- [ ] Repository bisa di-clone dan dijalankan dari nol.
- [ ] Dependency tercatat di berkas manifest.
- [ ] Aplikasi membaca `PORT` dan bind ke `0.0.0.0`.
- [ ] Tidak ada rahasia di dalam repository atau riwayatnya.
- [ ] Kamu tahu data mana yang bisa hilang saat restart.
- [ ] Perintah build dan start jelas, atau ada `Dockerfile`.
