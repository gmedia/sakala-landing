---
title: "Visi Produk Sakala"
description: "Posisi Sakala, north star, delapan pilar produk dalam urutan prioritas, product loop, model penyediaan, dan apa yang tidak boleh Sakala jadi."
track: proyek
section: arah
order: 2
lang: id
canonical: true
---

# Visi Produk Sakala

> **From possibility to manifestation. From manifestation to growth.**

Dokumen ini adalah pemegang tunggal daftar pilar produk. Dokumen lain,
termasuk [PRD](/docs/proyek/prd), [Roadmap](/docs/proyek/roadmap), dan halaman
Produk di situs, menautkan daftar ini dan tidak menyalinnya dengan nama yang
berbeda.

## Posisi

> Sakala adalah platform deployment open-source untuk belajar mengirim
> software. Mahasiswa, peserta magang, dan komunitas membawa project dari
> repository menjadi aplikasi yang hidup. Pengajar dan mentor melihat source
> dan aplikasinya di satu tempat. Institusi bisa menjalankan Sakala di
> infrastrukturnya sendiri.

Kalimat ini memilih. Sakala tidak bersaing dengan platform global untuk
frontend komersial, dan tidak bersaing dengan PaaS self-host untuk developer
berpengalaman yang mengelola server sendiri. Sakala mengambil ruang yang
ditinggalkan alat kelas pemrograman yang tutup (Replit Education pada 2024,
GitHub Classroom pada 2026), lalu menambahkan hal yang tidak pernah mereka
punya: aplikasi yang benar-benar hidup, dengan proses yang bisa dijelaskan.

Pendidikan adalah pintu masuk, bukan batas. Karya yang lahir di kelas bisa
menjadi portfolio, template, dan titik awal bagi orang lain. Di situlah Sakala
tumbuh menjadi platform yang lebih luas.

## North star

Sakala ingin menjadi developer platform terbuka yang membantu manusia membawa
software melalui seluruh perjalanannya:

```text
Create → Manifest → Operate → Learn → Explore → Collaborate → Grow
```

Deployment adalah jantung Sakala, tetapi bukan seluruh tubuhnya.

## Pilar produk

Pilar diurutkan menurut prioritas saat ini. Urutan ini berubah hanya lewat
perubahan dokumen ini, dan setiap perubahan disertai alasannya.

| #   | Pilar       | Pertanyaan yang dijawab                          | Kenapa di urutan ini                                                                |
| --- | ----------- | ------------------------------------------------ | ----------------------------------------------------------------------------------- |
| 1   | Manifest    | Bagaimana source ini menjadi sesuatu yang hidup? | Inti Sakala. Tanpa ini, tidak ada yang lain.                                        |
| 2   | Create      | Dari mana karya ini dimulai?                     | Repository publik dan privat adalah pintu masuk setiap project.                     |
| 3   | Operate     | Setelah hidup, bagaimana aplikasi ini dijaga?    | Log, health, dan secret dibutuhkan sejak project pertama.                           |
| 4   | Learn       | Bagaimana orang belajar mengirim software?       | Pasar pertama. Dikerjakan segera setelah MVP.                                       |
| 5   | Platform    | Bagaimana institusi menjalankan Sakala sendiri?  | Self-host satu node adalah jawaban biaya jangka panjang dan jaminan bagi institusi. |
| 6   | Explore     | Apa yang lahir dari karya yang sudah hidup?      | Pembeda Sakala, tetapi mahal dimoderasi. Dimulai dari koleksi terkurasi.            |
| 7   | Collaborate | Bagaimana karya dikelola bersama?                | Bagian yang dibutuhkan Learn dibangun lebih dulu di dalam Learn.                    |
| 8   | Operations  | Bagaimana maintainer menjaga Sakala tetap sehat? | Pilar internal. Tumbuh bersama setiap pilar lain.                                   |

### 1. Manifest

Membawa source menjadi aplikasi yang nyata: analisis repository, deteksi
stack, Dockerfile, Railpack, konfigurasi manual, deployment dengan tahap yang
bernama, health check, alamat publik, redeploy, dan pemulihan. Worker, cron,
situs statis, dan preview deploy adalah perluasan berikutnya.

### 2. Create

Membantu karya dimulai dari tempat yang baik: repository GitHub publik dan
privat, URL Git lain, template, contoh, dan kelak tombol "Deploy to Sakala".

### 3. Operate

Membantu aplikasi tetap bisa dipakai dan dipahami setelah deploy: variabel dan
secret, domain bawaan dan kustom, log, health, metrik dasar, dan kelak layanan
data terkelola (PostgreSQL, Redis, object storage).

### 4. Learn

Memberi tempat bagi proses belajar software delivery yang nyata: kelas,
workshop, magang dan PKL, penugasan, template awal, ringkasan untuk pengajar,
dan pengumpulan berupa aplikasi yang hidup.

Batasnya tetap:

```text
Sakala Learn ≠ LMS
```

Sakala tidak mengelola materi, presensi, kuis, ujian, dan kurikulum. Sakala
mengelola `source → deployment → aplikasi hidup → pengumpulan → tinjauan`.

### 5. Platform

Memberi institusi dan pengguna tingkat lanjut akses yang lebih luas: instalasi
self-host satu node, CLI, API publik, token berlingkup, deploy hook, dan kelak
multi-node serta gateway terpisah.

### 6. Explore

Membuat karya bisa ditemukan, dilihat, dipelajari, dan dipakai ulang:
showcase, template, profil creator, koleksi, silsilah project, dan attribution.
Explore bukan jejaring sosial ([ADR-011](/docs/proyek/adr)).

### 7. Collaborate

Membawa deployment dari individu ke kelompok: workspace pribadi dan
organisasi, anggota, peran, undangan, pemindahan project, dan audit.

### 8. Operations

Memberi maintainer kemampuan menjaga Sakala tetap sehat dan aman: kesehatan
platform, node runtime, kapasitas, kegagalan per kategori, penanganan abuse,
moderasi, masukan pengguna, dan audit.

## Product loop

Loop umum:

```text
Creator → Project → Repository → Deploy → Aplikasi hidup
→ Showcase → Template / Inspirasi → Creator baru → Project baru
```

Loop pendidikan, yang dijalankan lebih dulu:

```text
Penugasan → Template awal → Project peserta → Deploy → Tinjauan
→ Koleksi kelas → Kandidat template → Angkatan berikutnya
```

Loop pendidikan adalah versi loop umum yang punya pengajar, tenggat, dan
koleksi. Keduanya memakai primitif yang sama.

## Model penyediaan

Sakala dituju tersedia sebagai **hosted** (runtime disediakan GMEDIA, dengan
kuota yang tertulis) dan **self-host** (dijalankan institusi atau individu di
servernya sendiri). Keduanya memakai kode yang sama dan lisensi yang sama.
Hari ini baru hosted yang sedang dibangun.
Detail dan prinsipnya ada di [PRD §7](/docs/proyek/prd).

## Model pertumbuhan

```text
Level 1  Deployment sederhana
Level 2  Hosting yang andal
Level 3  Kelas dan pembelajaran
Level 4  Self-host institusi
Level 5  Explore dan ekosistem
Level 6  Layanan developer (data, worker)
Level 7  Infrastruktur developer terdistribusi
```

Tidak semua level dibangun sekarang.

```text
Visi luas. Eksekusi sempit.
```

## Yang tidak boleh Sakala jadi

Sakala tidak boleh kehilangan identitas karena mengejar kesetaraan fitur.
Hindari menjadi:

- dashboard cloud generik;
- antarmuka Kubernetes dengan nama baru;
- jejaring sosial developer;
- LMS;
- domain registrar;
- suite observability pengganti Grafana;
- cloud berlabel AI tanpa nilai inti;
- penyedia hosting gratis tanpa konteks, yang hanya menarik abuse;
- playground infrastruktur yang lebih menyenangkan maintainer daripada
  pengguna.

Setiap perluasan harus kembali ke:

> **Manifesting Code into Reality.**
