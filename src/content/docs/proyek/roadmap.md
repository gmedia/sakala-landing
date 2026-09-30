---
title: "Roadmap Sakala"
description: "Horizon produk dalam urutan baru, fase engineering dengan statusnya, gelombang desain, gate sebelum setiap horizon dimulai, dan anti-roadmap."
track: proyek
section: rencana
order: 9
lang: id
canonical: true
---

# Roadmap Sakala

> Roadmap adalah arah, bukan janji tanggal.

Sakala memakai tiga pandangan yang berjalan paralel dan tidak selalu sinkron:
produk, desain, dan engineering. Nama pilar mengikuti [Visi](/docs/proyek/vision).

## Perubahan dari versi sebelumnya

Per 1 Oktober 2026, urutan horizon diubah mengikuti keputusan pasar pertama
([PRD §3](/docs/proyek/prd)):

- **Learn** (kelas minimal) naik dari Horizon D ke horizon kedua setelah
  Manifestasi.
- **Self-host satu node** naik dari Horizon F ke horizon ketiga
  ([ADR-017](/docs/proyek/adr)).
- **Explore** turun setelah self-host dan dimulai dari koleksi yang dikurasi.
- Ditambahkan gate **Pilot publik** sebelum pendaftaran dibuka untuk umum.

## 1. Roadmap produk

### Horizon A — Manifestasi

```text
Repository → Deploy → URL publik
```

Identitas, onboarding, project, analisis repository, build, deploy, log,
variabel dan secret, domain bawaan, health check, redeploy, kuota pilot,
kontrol admin.

**Status:** jalur deploy end-to-end sudah berjalan di staging, misalnya
`react.run.staging.sakala.dev`, tetapi belum matang. Pendaftaran di production
belum dibuka karena masalah kredensial autentikasi yang masih diperbaiki.
Lihat [MVP](/docs/proyek/mvp).

### Gate — Pilot publik

Syarat sebelum pendaftaran dibuka untuk umum, dirinci di
[MVP](/docs/proyek/mvp): isolasi workload ([ADR-014](/docs/proyek/adr)), sleep
otomatis dan batas build ([ADR-015](/docs/proyek/adr)), dokumen hukum,
penanganan abuse, bukti dari pilot, dan estimasi biaya.

### Horizon B — Learn minimal

- kelas dengan pengajar dan peserta, peserta dimasukkan lewat CSV;
- penugasan dengan template awal opsional dan tenggat;
- ringkasan kelas untuk pengajar;
- satu tampilan per peserta: repository, URL, deployment terakhir, log;
- kebijakan resource per kelas;
- siklus hidup project setelah kelas selesai.

Detail di [Sakala Learn](/docs/proyek/feature-education).

### Horizon C — Self-host satu node

- installer satu node yang bisa diulang, dengan versi yang di-pin dan
  checksum;
- gVisor aktif secara default;
- dokumentasi pemasangan manual;
- panduan untuk pengelola lab institusi;
- repository distribusi `sakala` ([ADR-013](/docs/proyek/adr)).

### Horizon D — Operasi yang andal

- custom domain dengan verifikasi DNS dan TLS;
- pemulihan deployment dan rollback ke versi sebelumnya;
- metrik dasar;
- auto-deploy dari push lewat webhook;
- repository privat lewat GitHub App;
- visibilitas pemakaian dan kuota.

### Horizon E — Explore dan ekosistem

Dimulai dari koleksi yang dikurasi maintainer (misalnya hasil satu angkatan
magang), lalu showcase, template, profil creator, silsilah project, dan
"Deploy to Sakala". Detail di [Sakala Explore](/docs/proyek/feature-explore).

### Horizon F — Kolaborasi

Workspace, anggota, peran, dan koleksi milik organisasi.

### Horizon G — Layanan developer

PostgreSQL, Redis atau Valkey, object storage terkelola, worker dan queue,
backup dan restore, observability yang lebih kaya.

### Horizon H — Platformisasi

CLI, API publik, node join, drain, dan upgrade, runtime multi-node, gateway
dan router.

## 2. Roadmap engineering

| Fase | Isi                                                                                       | Status per 1 Okt 2026             |
| ---- | ----------------------------------------------------------------------------------------- | --------------------------------- |
| 0    | Pemisahan repository, CI dasar, branch protection, fondasi design system                  | selesai                           |
| 1    | Kontrak auth, GitHub OAuth, email dan verifikasi, sesi, onboarding                        | selesai                           |
| 2    | Siklus project, validasi repository, analisis stack, domain bawaan, variabel dan secret   | selesai                           |
| 3    | Model deployment, event dan log, state machine, realtime                                  | selesai                           |
| 4    | Agent terhubung: register, heartbeat, poll, claim, lease, event, log, protokol berversi   | selesai                           |
| 5    | Runtime nyata: checkout, Dockerfile, Railpack, container, batas, Caddy, health, cleanup   | selesai                           |
| 6    | MVP end-to-end: browser, API, agent, runtime, URL publik                                  | berjalan di staging, belum matang |
| 7    | Penguatan pilot: kategori kegagalan, dokumentasi, pengaman, metrik validasi, alat operasi | sedang dikerjakan                 |
| 8    | Gate pilot publik: isolasi, sleep, batas build, dokumen hukum, abuse                      | berikutnya                        |
| 9    | Learn minimal                                                                             | berikutnya                        |
| 10   | Installer self-host satu node                                                             | berikutnya                        |

## 3. Roadmap desain

| Gelombang | Isi                                                                                                                                                                           | Status                                 |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| 1         | Perjalanan produk inti: login, OAuth, verifikasi, onboarding, dashboard, buat project, detail deployment, log build, detail project, variabel, profil, pengaturan, notifikasi | selesai, sebagian besar sudah dibangun |
| 2         | Learn: kelas, penugasan, ringkasan pengajar, tampilan peserta, masuknya peserta lewat CSV                                                                                     | berikutnya                             |
| 3         | Pilot publik: halaman sleep dan bangun, kuota, suspend dan banding, persetujuan syarat layanan                                                                                | berikutnya                             |
| 4         | Domain dan operasi: custom domain, DNS, TLS, health runtime, error yang lebih kaya                                                                                            | nanti                                  |
| 5         | Platform Console: overview, node, kegagalan, abuse, moderasi, masukan                                                                                                         | nanti                                  |
| 6         | Explore: koleksi terkurasi, showcase, template, profil creator                                                                                                                | nanti                                  |
| 7         | Layanan terkelola                                                                                                                                                             | nanti                                  |

Rincian per gelombang ada di [Design Strategy](/docs/proyek/design-strategy).

## 4. Gate sebelum horizon dimulai

Horizon baru tidak dimulai hanya karena desainnya selesai. Pertimbangkan:

```text
Kebutuhan pengguna yang terbukti
+ Daya ungkit produk
+ Biaya engineering
+ Biaya operasional
+ Kesiapan arsitektur
```

Contoh:

- Learn dimulai setelah gate pilot publik, karena kelas membawa puluhan
  pengguna sekaligus.
- Self-host dimulai setelah ADR-014 berjalan di hosted, supaya installer
  membawa isolasi yang sama.
- Layanan data terkelola menunggu model operasional, backup, keamanan,
  biaya, dan permintaan yang kuat.
- Multi-region menunggu sampai batas satu region dan multi-node benar-benar
  terlihat.

## 5. Anti-roadmap

Jangan memprioritaskan berdasarkan checklist kesetaraan fitur, iri pada
tangkapan layar pesaing, kegembiraan teknologi, "kayaknya keren", atau desain
yang sudah selesai saja.

Prioritaskan berdasarkan satu pertanyaan:

> Apakah ini memperkuat perjalanan inti Sakala dan kebutuhan pengguna yang
> sudah terbukti?
