---
title: "Strategi Desain"
description: "Cakupan desain saat ini, utang desain yang tercatat, gelombang desain berikutnya dalam urutan baru, standar handoff, dan prinsip UI produk."
track: proyek
section: rencana
order: 10
lang: id
canonical: true
---

# Strategi Desain Sakala

> Desain produk boleh mendahului engineering. Desain bukan komitmen
> engineering yang tersembunyi.

## Sumber desain

Sakala Design System di Figma (akses tim). Ringkasan publik token, tipografi,
kosakata status, dan aturan artefak ada di
[Sistem Desain](/docs/teknis/sistem-desain). Bila keduanya berbeda, Figma yang
menang dan halaman publik yang diperbaiki.

Dokumen ini mencatat arah desain di tingkat produk, bukan spesifikasi piksel.

## 1. Cakupan saat ini

Gelombang 1 selesai dan sebagian besar sudah dibangun di Console:

```text
Login dan daftar · GitHub OAuth · Verifikasi akun · Onboarding · Dashboard
Buat project · Detail deployment · Log build · Detail project
Variabel dan secret · Profil · Pengaturan · Notifikasi
```

## 2. Utang desain yang tercatat

Ditemukan saat layar Gelombang 1 dipakai sebagai acuan artefak di situs
(September 2026). Dicatat supaya diselesaikan bersama, bukan untuk menilai
siapa pun.

| Temuan                                                                               | Dampak                                          | Arah perbaikan                                                                      |
| ------------------------------------------------------------------------------------ | ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| Token teks sekunder `#A2A2A2` di atas `#FBFBFB` hanya 2,47:1                         | Timestamp dan label gagal WCAG AA (butuh 4,5:1) | Naikkan token, misalnya ke nilai `muted-2` di Sistem Desain (5,17:1)                |
| Token sukses `#39DA8A` dipakai sebagai teks (1,82:1)                                 | Teks status sukses sulit dibaca                 | Pakai varian gelap `#248A57` atau lebih gelap untuk teks                            |
| Nama tahap deployment bercampur bahasa ("Cloning repository", "Menganalisis proyek") | Kosakata tidak konsisten dalam satu daftar      | Satu bahasa per antarmuka; nama tahap kanonik di [Glosarium](/docs/proyek/glossary) |
| Log memakai Montserrat                                                               | Kolom dan timestamp sulit dipindai              | Monospace untuk log, sesuai Sistem Desain                                           |
| Contoh slug berspasi (`Sakala 2.run.sakala.dev`)                                     | Contoh yang tidak mungkin terjadi               | Contoh slug memakai tanda hubung (`sakala-2`)                                       |

## 3. Gelombang berikutnya

Urutan mengikuti [Roadmap](/docs/proyek/roadmap).

### Gelombang 2 — Learn

Layar dan state: tautan undangan kelas, unggah peserta lewat CSV, buat kelas,
buat penugasan dengan template dan tenggat, ringkasan kelas untuk pengajar,
tampilan per peserta (repository, URL, deployment terakhir, log), kunci
pengumpulan, arsip kelas, pindahkan project ke akun pribadi.

Pertanyaan yang harus dijawab desain:

- Bagaimana pengajar melihat 30 peserta sekaligus tanpa membuka 30 halaman?
- Bagaimana kategori kegagalan terbanyak terlihat dalam satu layar?
- Apa yang dilihat peserta tentang data dirinya yang terlihat oleh pengajar?
- Bagaimana kelas yang sudah selesai terasa "diarsipkan", bukan "dihapus"?

### Gelombang 3 — Pilot publik

Halaman project yang sedang tidur dan sedang bangun, tampilan kuota dan
sisanya, project yang di-suspend beserta alasan dan jalur banding,
persetujuan syarat layanan saat mendaftar, dan pengaturan hapus akun.

Prinsip: sleep adalah perilaku yang diharapkan, bukan kegagalan. Copy-nya
harus membuat itu jelas.

### Gelombang 4 — Domain dan operasi

```text
Domain bawaan · Custom domain · Tambah domain · Instruksi DNS
Menunggu verifikasi · Terverifikasi · TLS · Aktif · Gagal
Domain utama · Alias · Redirect · Hapus domain
```

Prinsip: kompleksitas DNS dijelaskan, bukan dilempar ke pengguna. Status domain
bisa ditampilkan sebagai `DNS ✓ · TLS ✓ · Route ✓ · Aplikasi ✓`.

### Gelombang 5 — Platform Console

Overview, node, deployment, analitik kegagalan, laporan abuse, moderasi,
masukan. Hindari template admin CRUD generik. Detail di
[Platform Operations](/docs/proyek/platform-operations).

### Gelombang 6 — Explore

Dimulai dari halaman koleksi, detail project dalam koleksi, dan profil
creator sebagai portfolio. Detail di [Sakala Explore](/docs/proyek/feature-explore).

### Gelombang 7 — Layanan terkelola

PostgreSQL, Redis atau Valkey, object storage, worker dan queue, pemakaian,
kredensial dan pemasangan layanan.

## 4. Standar handoff

Setiap fitur yang siap diimplementasikan menyertakan:

- pengguna sasaran dan tujuannya;
- route atau konteks;
- state normal, kosong, memuat, error, gagal sebagian, tidak berizin;
- konfirmasi untuk aksi destruktif;
- perilaku responsif (minimal 320 px dan desktop);
- data dan aksi yang dibutuhkan;
- copy final dalam bahasa antarmuka;
- catatan interaksi atau prototipe;
- pengecekan kontras untuk setiap pasangan warna baru.

## 5. Prinsip UI produk

**Ramah, tetapi tidak kekanak-kanakan.** Jelaskan kompleksitas dengan bahasa
yang jelas.

**Berorientasi developer, tetapi tidak mengintimidasi.** Detail teknis dibuka
bertahap.

**Status adalah elemen utama.** Deployment, health, DNS, verifikasi,
moderasi, sleep, dan suspend harus terbaca, dan tidak hanya lewat warna.

**Log adalah alat, bukan hiasan.** Monospace, timestamp, level, pencarian,
salin, dan baris error yang ditandai.

**Satu bahasa per antarmuka.** Istilah teknis yang lazim boleh tetap bahasa
Inggris (deploy, build, log), tetapi kalimatnya utuh dalam satu bahasa.

**Aksesibilitas.** Keyboard, fokus terlihat, kontras WCAG 2.2 AA, label
semantik.

**Identitas.** Sakala terasa seperti tempat karya menjadi nyata, bukan
sekadar dashboard admin database.
