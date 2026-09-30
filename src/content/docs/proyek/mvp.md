---
title: "MVP Sakala"
description: "Batas engineering saat ini: pertanyaan validasi, yang wajib dibangun, yang sengaja tidak dibangun, definisi selesai, dan gate sebelum pendaftaran dibuka untuk umum."
track: proyek
section: arah
order: 4
lang: id
canonical: true
---

# MVP Sakala

> **Fungsi:** batas engineering yang ketat
> **Aturan:** [PRD](/docs/proyek/prd) menjelaskan Sakala. Dokumen ini membatasi apa yang dibangun sekarang.

## Pertanyaan validasi

> Bisakah seorang mahasiswa membawa project Git kecil sampai punya URL publik
> yang sehat, lebih cepat dan lebih bisa ia pahami daripada free tier yang
> sudah ada, dan bisakah ia memulihkan deploy yang gagal tanpa bantuan?

Versi sebelumnya membandingkan Sakala dengan menyiapkan server secara manual.
Pembanding itu diganti, karena pengguna sasaran membandingkan Sakala dengan
free tier platform global, bukan dengan VPS ([PRD §5](/docs/proyek/prd)).

Perjalanan intinya:

```text
Autentikasi → Onboarding → Buat project → Analisis repository → Konfigurasi
→ Deploy → Pantau tahap → Baca log → Buka URL publik → Redeploy
```

## Wajib ada

Status per 1 Oktober 2026 berdasarkan kode di repository `sakala-api`,
`sakala-agent`, dan `sakala-console`, serta pengujian di staging.

| Area          | Kebutuhan                                                                                                                                     | Status                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Identitas     | GitHub OAuth, email dengan verifikasi, sesi Console, logout, onboarding dengan profil                                                         | dibangun; di production masih ada masalah kredensial autentikasi |
| Console       | Dashboard, buat project, detail project, variabel dan secret, detail deployment, log build, notifikasi                                        | berjalan                                                         |
| Project       | Repository GitHub publik, branch, nama dan slug, domain bawaan, analisis stack, deteksi Dockerfile dan Railpack, konfigurasi yang bisa diubah | berjalan                                                         |
| Deployment    | Record deployment, state, event, log, deploy dan redeploy manual, satu web workload, build, run, route, health check, sukses dan gagal        | berjalan                                                         |
| Agent         | Identitas, heartbeat, poll, claim dengan lease, event, log, complete, fail, protokol berversi                                                 | berjalan                                                         |
| Runtime       | Docker rootless, build Dockerfile, fallback Railpack, batas resource, port localhost, route Caddy, health check, cleanup                      | berjalan                                                         |
| Kuota         | Kuota pilot tertulis dan ditegakkan ([PRD §9.2](/docs/proyek/prd))                                                                            | berjalan                                                         |
| Kontrol admin | Stop dan suspend project, dengan alasan dan jejak audit                                                                                       | berjalan                                                         |
| Infrastruktur | Caddy host, Docker Engine, agent via systemd, API, PostgreSQL, Valkey, object storage, Console dan Landing statis, DNS wildcard runtime       | berjalan                                                         |
| Rilis         | Image dibangun di CI, dipin per digest, rollback lewat revert                                                                                 | berjalan                                                         |

Ringkasnya, MVP **belum selesai**. Jalur deploy dari repository sampai URL
publik sudah terbukti di staging, tetapi belum matang dan belum dipakai
pengguna pilot. Di production, pendaftaran belum dibuka karena masalah
kredensial autentikasi yang masih diperbaiki.

## Sengaja tidak dibangun untuk MVP

Walaupun ada di PRD: template, showcase, profil creator, koleksi, custom
domain, PostgreSQL dan Redis sebagai layanan pengguna, object storage untuk
pengguna, workspace tim, kelas, billing, preview deploy, rollback manual,
autoscale, multi-node, multi-region, router Sakala, CLI lengkap, dan
instalasi self-host yang dikemas.

Desain boleh menjelajahi sebagian dari daftar ini sebelum MVP selesai.

## Definisi selesai

MVP dianggap selesai bila jalur end-to-end ini terbukti berjalan:

```text
Browser → Login → Buat project → Repository dianalisis
→ Perintah deploy dibuat → Agent menerima perintah → Source di-checkout
→ Image dibangun → Container berjalan → Route aktif → Health check lolos
→ Console menerima tahap dan log → Pengguna membuka *.run.sakala.dev
→ Pengguna melakukan redeploy
```

Syarat tambahan:

- API tidak mengakses Docker socket;
- secret tidak bocor ke log;
- batas resource ditegakkan;
- deployment yang gagal punya alasan yang berguna dan menunjuk tahapnya;
- dokumentasi menjelaskan deploy pertama;
- pemasangan bisa diulang dari environment bersih dengan langkah yang
  terdokumentasi.

## Gate sebelum pendaftaran dibuka untuk umum

MVP yang selesai belum berarti siap dibuka untuk siapa saja. Pilot terbatas
(peserta magang dan pengguna yang diundang) boleh berjalan sebelum gate ini
terpenuhi. Pendaftaran terbuka untuk umum baru boleh dibuka setelah keenam
syarat berikut terpenuhi.

1. **Isolasi.** Workload pengguna berjalan di host runtime yang terpisah dari
   API dan database, dengan runtime container tersandbox, sesuai
   [ADR-014](/docs/proyek/adr).
2. **Kuota lengkap.** Selain kuota yang sudah berjalan, ada sleep otomatis
   untuk project tanpa trafik dan batas jumlah build per jam
   ([ADR-015](/docs/proyek/adr)).
3. **Dokumen hukum.** Syarat layanan, kebijakan penggunaan yang wajar, dan
   pemberitahuan privasi sesuai UU PDP terbit di situs dan disetujui saat
   pendaftaran.
4. **Penanganan abuse.** Ada alamat pelaporan abuse yang dipantau, dan
   alurnya tertulis di [Platform Operations](/docs/proyek/platform-operations),
   termasuk target waktu suspend.
5. **Bukti dari pilot.** Median waktu dari login sampai URL pertama diukur
   pada minimal 10 pengguna pilot dan dicatat di dokumen ini.
6. **Biaya.** Estimasi biaya runtime per workload per bulan dan kapasitas yang
   disediakan GMEDIA tercatat, termasuk batasnya.

Status gate per 1 Oktober 2026: syarat 1 sampai 6 belum terpenuhi. Kuota
pilot, suspend oleh admin, dan Docker rootless sudah menjadi fondasi untuk
syarat 1, 2, dan 4.

## Sinyal keberhasilan MVP

Target angkanya ada di [PRD §13](/docs/proyek/prd). Yang diukur:

- deploy pertama yang berhasil;
- median waktu sampai URL pertama;
- distribusi kegagalan per kategori;
- persentase pengguna yang pulih dari deploy gagal;
- tingkat redeploy;
- tingkat project kedua;
- pemakaian berulang tanpa campur tangan maintainer.

## Gerbang keluar

Jangan menyatakan MVP selesai karena layar UI sudah ada. MVP selesai hanya
ketika jalur runtime end-to-end yang nyata berjalan cukup andal untuk
pengguna pilot.
