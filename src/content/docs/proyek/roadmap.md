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

**Status per 19 November 2026:** tersedia di layanan hosted. Jalur deploy
end-to-end berjalan di production sejak 12 November 2026, termasuk health
check HTTP, log di Console, dan pesan kegagalan. Sejak itu juga dirilis
workspace dan tim, deploy otomatis saat push, perintah rilis per project, dan
domain project di `*.sakala.app`. Pendaftaran pilot terbuka untuk siapa saja
sejak 19 November 2026, dengan [batas pilot](/docs/batas-pilot).

### Gate — Pilot publik

Syarat sebelum pendaftaran dibuka untuk umum, dirinci di
[MVP](/docs/proyek/mvp): isolasi workload ([ADR-014](/docs/proyek/adr)), sleep
otomatis dan batas build ([ADR-015](/docs/proyek/adr)), dokumen hukum,
penanganan abuse, bukti dari pilot, dan estimasi biaya.

**Status per 23 November 2026:** maintainer membuka pendaftaran pilot untuk
siapa saja sejak 19 November 2026. Sandbox gVisor, runtime yang terpisah dari
control plane, sleep setelah 30 menit tanpa pengunjung, batas build per jam,
dokumen hukum, penangguhan project, dan pembatasan lalu lintas keluar dari
container pengguna (sejak 19 November 2026) sudah berjalan. Bukti dari pilot
dan estimasi biaya masih dikerjakan.

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

**Status per 19 November 2026:** sedang diuji. Installer di `gmedia/sakala`
sudah ada dan lolos uji di mesin bersih, tetapi belum dirilis dan belum
dicoba di server sungguhan.

### Horizon D — Operasi yang andal

- custom domain dengan verifikasi DNS dan TLS;
- pemulihan deployment dan rollback ke versi sebelumnya;
- metrik dasar;
- auto-deploy dari push lewat webhook;
- repository privat lewat GitHub App;
- visibilitas pemakaian dan kuota.

**Status per 23 November 2026:** auto-deploy dari push, repository privat
lewat GitHub App, metrik dasar per proyek (CPU, memori, replika, dan restart,
sejak 19 November 2026), serta rollback ke versi sebelumnya dan Restart tanpa
build (sejak 23 November 2026, lihat
[Rollback dan Restart](/docs/rollback-dan-restart)) sudah tersedia. Custom
domain dan visibilitas pemakaian yang lebih lengkap belum.

### Horizon E — Explore dan ekosistem

Dimulai dari koleksi yang dikurasi maintainer (misalnya hasil satu angkatan
magang), lalu showcase, template, profil creator, silsilah project, dan
"Deploy to Sakala". Detail di [Sakala Explore](/docs/proyek/feature-explore).

### Horizon F — Kolaborasi

Workspace, anggota, peran, dan koleksi milik organisasi.

**Status per 19 November 2026:** workspace tim, undangan, dan peran Owner,
Member, dan Viewer tersedia sejak 12 November 2026. Koleksi milik organisasi
belum.

### Horizon G — Layanan developer

PostgreSQL, Redis atau Valkey, object storage terkelola, worker dan queue,
backup dan restore, observability yang lebih kaya.
Rancangan PostgreSQL terkelola diusulkan di
[ADR-020](/docs/proyek/adr#adr-020--managed-postgresql-for-projects).

**Status per 23 November 2026:** PostgreSQL terkelola tahap pertama sedang
diuji sebagai pilot terbatas sejak 23 November 2026, hanya untuk workspace
yang diberi kuota oleh admin. Backup malam berjalan, dan pemulihannya
dilakukan maintainer. Panduannya ada di
[Database Terkelola](/docs/database-terkelola). Bucket S3 terkelola
([ADR-021](/docs/proyek/adr#adr-021--managed-object-storage-for-projects),
Proposed) sedang dibangun sebagai pilot terbatas, dengan panduan di
[Bucket Terkelola](/docs/bucket-terkelola). Kuota pertamanya baru dibuka
setelah pemberitahuan privasi versi baru berlaku. Layanan lain belum.

### Horizon H — Platformisasi

CLI, API publik, node join, drain, dan upgrade, runtime multi-node, gateway
dan router.

## 2. Roadmap engineering

| Fase | Isi                                                                                       | Status per 23 Nov 2026                                                                          |
| ---- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 0    | Pemisahan repository, CI dasar, branch protection, fondasi design system                  | selesai                                                                                         |
| 1    | Kontrak auth, GitHub OAuth, email dan verifikasi, sesi, onboarding                        | berjalan di production sejak 12 Nov                                                             |
| 2    | Siklus project, validasi repository, analisis stack, domain bawaan, variabel dan secret   | berjalan di production sejak 12 Nov                                                             |
| 3    | Model deployment, event dan log, state machine, realtime                                  | berjalan di production sejak 12 Nov                                                             |
| 4    | Agent terhubung: register, heartbeat, poll, claim, lease, event, log, protokol berversi   | selesai                                                                                         |
| 5    | Runtime nyata: checkout, Dockerfile, Railpack, container, batas, Caddy, health, cleanup   | berjalan di production sejak 12 Nov; variabel build Railpack belum diuji dengan build sungguhan |
| 6    | MVP end-to-end: browser, API, agent, runtime, URL publik                                  | berjalan di production sejak 12 Nov                                                             |
| 7    | Penguatan pilot: kategori kegagalan, dokumentasi, pengaman, metrik validasi, alat operasi | sedang dikerjakan; pilot terbuka sejak 19 Nov                                                   |
| 8    | Gate pilot publik: isolasi, sleep, batas build, dokumen hukum, abuse                      | sebagian besar berjalan, termasuk egress container sejak 19 Nov; bukti dan biaya belum          |
| 9    | Learn minimal                                                                             | berikutnya                                                                                      |
| 10   | Installer self-host satu node                                                             | sedang diuji, belum dirilis                                                                     |

## 3. Roadmap desain

| Gelombang | Isi                                                                                                                                                                           | Status                                                                                              |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1         | Perjalanan produk inti: login, OAuth, verifikasi, onboarding, dashboard, buat project, detail deployment, log build, detail project, variabel, profil, pengaturan, notifikasi | desain selesai dan dibangun di Console                                                              |
| 2         | Platform Console: overview, pengguna, project, deployment, node, kegagalan, abuse, masukan                                                                                    | dibangun sebagian di area admin Console: overview, pengguna, workspace, profil batas, node, masukan |
| 3         | Pilot publik: halaman sleep dan bangun, kuota, suspend dan banding, persetujuan syarat layanan                                                                                | dibangun di Console                                                                                 |
| 4         | Learn: kelas, penugasan, ringkasan pengajar, tampilan peserta, masuknya peserta lewat CSV                                                                                     | berikutnya                                                                                          |
| 5         | Domain dan operasi: custom domain, DNS, TLS, health runtime, error yang lebih kaya                                                                                            | nanti                                                                                               |
| 6         | Explore: koleksi terkurasi, showcase, template, profil creator                                                                                                                | nanti                                                                                               |
| 7         | Layanan terkelola                                                                                                                                                             | nanti                                                                                               |

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
- Load balancing dimulai dari replika di satu node: satu project bisa
  berjalan sebagai beberapa container, dan router node membagi request ke
  replika yang sehat. Sakala Edge dibangun sebelum node kedua ada, supaya
  menambah node nanti cukup dengan menyiapkan server
  ([ADR-019](/docs/proyek/adr)).

## 5. Anti-roadmap

Jangan memprioritaskan berdasarkan checklist kesetaraan fitur, iri pada
tangkapan layar pesaing, kegembiraan teknologi, "kayaknya keren", atau desain
yang sudah selesai saja.

Prioritaskan berdasarkan satu pertanyaan:

> Apakah ini memperkuat perjalanan inti Sakala dan kebutuhan pengguna yang
> sudah terbukti?
