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

Status per 6 November 2026, berdasarkan kode terbaru di repository `sakala-api`,
`sakala-agent`, dan `sakala-console` pada branch `feat/core-maturity`. Perubahan
di branch itu belum di-merge, belum diuji di production, dan belum dipakai
pengguna pilot. Bukti staging terakhir yang tercatat berasal dari 1 Oktober 2026,
sebelum perubahan ini. Kata `dibangun` di bawah berarti ada di kode, tetapi belum
terbukti di pemakaian nyata.

| Area          | Kebutuhan                                                                                                                                                 | Status                                                                                                                                                                                        |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identitas     | GitHub OAuth, email dengan verifikasi, sesi Console, logout, onboarding dengan profil                                                                     | dibangun. Catatan 1 Oktober 2026 menyebut masalah kredensial autentikasi di production, dan belum diperiksa ulang                                                                             |
| Console       | Dashboard, buat project, detail project, variabel dan secret, detail deployment, log build, notifikasi                                                    | dibangun, termasuk wizard Auto Detect, panel log, ringkasan kegagalan, notifikasi, dan form masukan. Belum dicoba pengguna pilot                                                              |
| Project       | Repository GitHub publik, branch, nama dan slug, domain bawaan, analisis stack, deteksi Dockerfile dan Railpack, konfigurasi yang bisa diubah             | dibangun. Console menampilkan hasil analisis dan menyediakan form untuk port, build command, start command, dan root directory. Port tidak dideteksi: nilainya yang kamu isi, selain itu 3000 |
| Deployment    | Record deployment, state, event, log, deploy dan redeploy manual, satu web workload, build, run, route, health check, sukses dan gagal                    | dibangun. Deploy yang gagal menyimpan kode, tahap, dan detail kegagalan, dan versi lama tetap melayani                                                                                        |
| Agent         | Identitas, heartbeat, poll, claim dengan lease, event, log, complete, fail, protokol berversi                                                             | berjalan di staging per 1 Oktober 2026. Tambahan kode kegagalan dan pembatalan dibangun                                                                                                       |
| Runtime       | Docker rootless, build Dockerfile, fallback Railpack, batas resource, route Caddy ke nama container di network runtime, health check HTTP ke `/`, cleanup | dibangun. Status di bawah 500 lolos, dan aplikasi wajib listen di `0.0.0.0:$PORT`. Jalur variabel saat build pada Railpack belum diuji dengan build sungguhan                                 |
| Kuota         | Kuota pilot tertulis dan ditegakkan ([PRD §9.2](/docs/proyek/prd))                                                                                        | berjalan di API, dan Console menampilkan pemakaiannya saat membuat proyek                                                                                                                     |
| Kontrol admin | Stop dan suspend project, dengan alasan dan jejak audit                                                                                                   | berjalan di API. Dashboard admin di Console belum ada                                                                                                                                         |
| Infrastruktur | Caddy host, Docker Engine, agent via systemd, API, PostgreSQL, Valkey, object storage, Console dan Landing statis, DNS wildcard runtime                   | berjalan per 1 Oktober 2026, belum diperiksa ulang                                                                                                                                            |
| Rilis         | Image dibangun di CI, dipin per digest, rollback lewat revert                                                                                             | berjalan per 1 Oktober 2026, belum diperiksa ulang                                                                                                                                            |

Ringkasnya, MVP **belum selesai** dan belum dinyatakan selesai. Jalur deploy dari
repository sampai URL publik sudah terbukti di staging pada 1 Oktober 2026.
Sejak itu kode untuk health check HTTP, log, dan pesan kegagalan sudah dibangun,
tetapi belum terbukti di production dan belum dicoba pengguna pilot. Jadi bagian
kedua pertanyaan validasi, yaitu apakah mahasiswa bisa memulihkan deploy gagal
tanpa bantuan, belum terjawab. Pendaftaran di production belum dibuka.

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

Per 6 November 2026 daftar ini belum terpenuhi. Pemasangan dari environment bersih
dan penegakan batas resource saat runtime belum dibuktikan, dan kebocoran secret
di log nyata belum bisa dipastikan. Panduan [deploy pertama](/docs/deploy-pertama),
Dockerfile, database eksternal, dan deploy gagal sudah ditulis, tetapi belum dicoba
bersama pengguna pilot.

## Gate sebelum pendaftaran dibuka untuk umum

MVP yang selesai belum berarti siap dibuka untuk siapa saja. Pilot terbatas
(peserta magang dan pengguna yang diundang) boleh berjalan sebelum gate ini
terpenuhi. Pendaftaran terbuka untuk umum baru boleh dibuka setelah keenam
syarat berikut terpenuhi.

1. **Isolasi.** Syarat ini sama dengan yang dituntut
   [Security §2](/docs/proyek/security) dan [ADR-014](/docs/proyek/adr), dan
   baru terpenuhi bila keempatnya ada:
   - workload pengguna berjalan di host runtime yang terpisah dari API dan
     database;
   - container pengguna berjalan dengan runtime tersandbox (gVisor);
   - container pengguna punya egress policy yang memblokir akses ke app node,
     endpoint metadata cloud, dan SMTP;
   - build yang mengeksekusi source dan Dockerfile pengguna berjalan di jalur
     isolasi tersendiri, bukan di daemon runtime.
2. **Kuota lengkap.** Selain kuota yang sudah berjalan, ada sleep otomatis
   untuk project tanpa trafik dan batas jumlah build per jam
   ([ADR-015](/docs/proyek/adr)).
3. **Dokumen hukum.** Syarat layanan, kebijakan penggunaan yang wajar, dan
   pemberitahuan privasi sesuai UU PDP terbit di situs. Syarat layanan dan
   kebijakan penggunaan disetujui saat pendaftaran; pemberitahuan privasi
   ditampilkan dan diketahui pengguna saat pendaftaran, tetapi tidak dijadikan
   persetujuan sebagai dasar pemrosesan.
4. **Penanganan abuse.** Ada alamat pelaporan abuse yang dipantau, dan
   alurnya tertulis di [Platform Operations](/docs/proyek/platform-operations),
   termasuk target waktu suspend.
5. **Bukti dari pilot.** Median waktu dari login sampai URL pertama diukur
   pada minimal 10 pengguna pilot dan dicatat di dokumen ini.
6. **Biaya.** Estimasi biaya runtime per workload per bulan dan kapasitas yang
   disediakan GMEDIA tercatat, termasuk batasnya.

Status gate per 6 November 2026: syarat 1 sampai 6 belum terpenuhi. Kuota
pilot dan suspend oleh admin sudah menjadi fondasi untuk syarat 2 dan 4.

Untuk syarat 1, runtime tersandbox gVisor **siap sebagai fitur, tetapi belum
diaktifkan di production**. Maintainer memutuskan runtime node memakai Docker
rootful dengan `runsc`, karena limit per workload tidak berlaku di bawah `runsc`
pada Docker rootless ([ADR-014](/docs/proyek/adr)). Pengujiannya lolos di node
staging. Dua butir lain di syarat 1 belum selesai, yaitu egress policy dan jalur
build tersendiri.

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
