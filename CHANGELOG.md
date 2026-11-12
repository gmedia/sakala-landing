# Changelog

Semua perubahan penting pada repository `sakala-landing` dicatat di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) dan
nomor versi mengikuti [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Setiap tag `vX.Y.Z` adalah satu rilis: workflow release membangun image dari
tag itu. Changelog di situs (`/changelog`) adalah catatan perkembangan project
untuk publik dan tidak memakai nomor versi ini.

Cara merilis:

1. Pindahkan isi `[Unreleased]` ke bagian versi baru beserta tanggalnya.
2. Naikkan `version` di `package.json` ke versi yang sama.
3. Merge ke `main`, lalu buat tag `vX.Y.Z` pada commit merge itu.

## [Unreleased]

### Changed

- [Start Contributing](src/content/docs/proyek/start-contributing.md) kini
  mengarahkan orang ke pencarian label `good first issue` dan `help wanted` di
  semua repository Sakala, yang ikut berubah saat issue dibuka dan ditutup,
  menggantikan kalimat bahwa belum ada good first issue. Larangan mengerjakan
  Explore, Learn, dan fitur tim dihapus, karena fitur seperti itu sekarang
  dibuka lewat issue `help wanted`. Sebagai gantinya ada penjelasan area yang
  tetap dipegang maintainer (security boundary, protokol agent, deployment
  production), cara mengusulkan pekerjaan besar lewat issue atau thread Ideas
  di Discussions `gmedia/sakala`, dan tautan Q&A untuk bertanya. Tautan ke
  `sakala-infra#4` yang sudah ditutup diganti panduan Full Stack Lokal, dan
  repository `gmedia/sakala` masuk tabel repository dan perintah quality.
- Template issue mengarahkan pertanyaan ke Discussions `gmedia/sakala` dan
  laporan keamanan ke halaman security policy repository ini, menggantikan
  tautan ke halaman organisasi.

## [0.3.3] - 2026-11-12

### Added

- Logo PNG untuk email transaksional di `/email/sakala-logo@2x.png` (280 x
  118 px, 11 KB, lossless): lockup Sakala berwarna Green Teal di atas tile
  putih bersudut bulat, digambar 2x untuk lebar tampil 140 px. Gmail dan
  Outlook tidak menampilkan SVG, dan tile putihnya menjaga logo tetap terbaca
  di klien email gelap yang tidak membalik warna gambar. Build menyalinnya apa
  adanya dan path-nya tidak boleh berubah, karena email yang sudah terkirim
  menunjuk ke sana. Dibuat ulang dengan `node scripts/email/render-logo.mjs`
  dari `public/brand/sakala-lockup.svg`.

## [0.3.2] - 2026-11-11

### Changed

- Bagian Port di [Menyiapkan Dockerfile](src/content/docs/dockerfile.md), dalam
  bahasa Indonesia dan Inggris, menjelaskan aturan port yang baru: kolom
  **Port**, lalu satu-satunya port dari `EXPOSE` di stage terakhir Dockerfile,
  lalu 3000. Image `nginx` biasa kini cukup memakai `EXPOSE 80`. [Saat Deploy
  Gagal](src/content/docs/deploy-gagal.md) menyebut aturan yang sama di
  `runtime_port_conflict` dan `runtime_app_not_listening`, dan kutipan pesan
  `runtime_port_conflict` kini memakai "proyek", sama dengan pesan dari API.
  Aturan ini berlaku setelah rilis API dan agent berikutnya terpasang. Port dari
  base image, misalnya `FROM nginx:alpine` tanpa `EXPOSE`, juga terbaca.
- Dependency diperbarui lewat Dependabot: grup npm minor dan patch (8 paket), Vite 8, @astrojs/mdx 8, prettier-plugin-astro 1, actions/checkout v7, actions/setup-node v7, dan docker/setup-buildx-action v4.

## [0.3.1] - 2026-11-11

### Changed

- Panduan [Menyiapkan Dockerfile](src/content/docs/dockerfile.md) dan
  [Saat Deploy Gagal](src/content/docs/deploy-gagal.md) mengikuti agent v0.4.0:
  image `nginx` biasa kini bisa dipakai asal mendengarkan di `${PORT}` lewat
  template, tabel kegagalan punya baris untuk nginx yang masih di port 80, dan
  perintah uji di laptop memakai flag capability yang sama dengan Sakala.

## [0.3.0] - 2026-11-11

### Added

- Pemberitahuan Privasi, Syarat Layanan, dan Kebijakan Penggunaan Wajar di
  `/privasi`, `/syarat`, dan `/penggunaan-wajar`, ditautkan dari footer. Route
  `/en/...` menampilkan teks Indonesia, dengan catatan bahwa teks itulah yang
  berlaku.
- Panduan [Deploy Pertamamu](src/content/docs/deploy-pertama.md),
  [Menyiapkan Dockerfile](src/content/docs/dockerfile.md),
  [Menghubungkan Database Eksternal](src/content/docs/database-eksternal.md),
  dan [Saat Deploy Gagal](src/content/docs/deploy-gagal.md), dalam Bahasa
  Indonesia dan Inggris.
- Halaman [Start Contributing](src/content/docs/proyek/start-contributing.md)
  yang memetakan repository, perintah quality, dan aturan kontrak.

### Changed

- Status di MVP, Roadmap, dan PRD §9.3 diperbarui per 6 November 2026. MVP tetap
  belum selesai, dan gate pendaftaran umum tetap belum terpenuhi.
- Pengantar dokumentasi tidak lagi menyebut bahwa alur deploy belum ada, dan
  menyatakan bahwa Sakala belum dibuka untuk umum.
- `/docs/ketika-gagal` kini mengarah ke `/docs/deploy-gagal`.

### Fixed

- State deployment di Alur Deployment dan Glossary mengikuti `DeploymentStatus`.
- Dokumen tidak lagi menyebut aplikasi mengikat port localhost. Route Caddy
  mengarah ke nama container di network runtime.
- Alur Deployment tidak lagi menyebut integrasi Agent API sebagai pekerjaan
  yang belum selesai.

## [0.2.1] - 2026-10-01

### Changed

- `CHANGELOG.md` disusun ulang per rilis, dan `package.json` mengikuti versi
  tag terakhir (#24).
- Changelog situs tidak lagi menampilkan nomor versi; setiap entri memakai
  tanggal dan anchor berdasarkan slug entri (#24).

## [0.2.0] - 2026-10-01

Rilis ini hanya berisi perubahan dokumentasi. Menurut SemVer, perubahan
seperti ini cukup menaikkan versi patch; nomor minor dipakai karena tag sudah
terbit sebelum hal itu dicek.

### Changed

- Dokumen project kanonik dimatangkan (#23): PRD 6.0 dengan pendidikan
  sebagai pasar pertama, persona utama, alternatif yang dibandingkan pengguna,
  kuota pilot, asumsi, risiko, dan target metrik; VISION dengan pernyataan
  posisi; MVP dengan gate enam syarat sebelum pendaftaran umum; ADR-014
  sampai ADR-017; SECURITY, PLATFORM_OPERATIONS, GOVERNANCE, GLOSSARY,
  ROADMAP, Learn, Explore, Design Strategy, ARCHITECTURE, dan CONTRIBUTING.
- Aturan bahasa dokumen kanonik: arah produk dalam Bahasa Indonesia, sistem
  dan komunitas dalam bahasa Inggris.
- Halaman Roadmap di situs mengikuti urutan horizon baru.
- `NOTICE` dan README menyatakan pengecualian merek Sakala; `GOVERNANCE.md` di
  root menjadi penunjuk ke halaman kanonik.

## [0.1.1] - 2026-09-24

### Added

- Tombol "Masuk" ke Console di header desktop dan navigasi mobile (#22).

## [0.1.0] - 2026-09-24

Rilis bertag pertama. Mencakup seluruh pekerjaan sejak repository dibuat
sampai workflow release (#1 sampai #21).

### Added

- Foundation website Astro static-first untuk `sakala.dev`, dengan
  dokumentasi, changelog, RSS, sitemap, dan metadata SEO.
- Situs dua bahasa (Indonesia dan Inggris) dengan dokumentasi publik dalam
  dua jalur, Pengantar dan Teknis (#16).
- Beranda _The Life of a Project_ (#17), lapisan kejelasan v3 (#18), dan
  beranda v4 dengan enam bab serta artefak yang berubah keadaan (#19).
- Jalur dokumentasi **Proyek** (`/docs/proyek`): dokumen kanonik Sakala terbit
  di situs ini, dengan `CODEOWNERS` untuk tinjauan maintainer (#20).
- Halaman **Sistem Desain** (`/docs/teknis/sistem-desain`) dalam dua bahasa
  (#20).
- Artefak bergrammar rancangan Console Wave 1, berlabel _design direction_
  (#19).
- Social preview per halaman lewat `scripts/og/generate.mjs` (#19).
- Dokumentasi publik cara kerja Sakala Agent (#12).
- Image container statis untuk production (#15) dan workflow release yang
  memublikasikan image pada setiap tag versi (#21).
- Halaman governance publik, `GOVERNANCE.md`, dan `SPONSORS.md`.

### Changed

- Framing Sakala diperbarui dari corporate-first menjadi project open-source
  yang didukung GMEDIA sebagai founding sponsor.
- Navigasi, dokumentasi, roadmap, dan daftar repository diperbarui untuk
  arsitektur `sakala-console` dan `sakala-api` yang terpisah (#11).
- Gerak pada beranda dipindah dari teks ke artefak (#19).
- Bagian "Contributor awal" diganti "Cara berkontribusi" di halaman Open
  Source (#19).
- Dependency diperbarui ke versi terbaru (#13).

[Unreleased]: https://github.com/gmedia/sakala-landing/compare/v0.3.3...HEAD
[0.3.3]: https://github.com/gmedia/sakala-landing/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/gmedia/sakala-landing/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/gmedia/sakala-landing/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/gmedia/sakala-landing/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/gmedia/sakala-landing/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/gmedia/sakala-landing/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/gmedia/sakala-landing/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/gmedia/sakala-landing/releases/tag/v0.1.0
