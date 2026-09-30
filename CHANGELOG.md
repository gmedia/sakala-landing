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

- `CHANGELOG.md` disusun ulang per rilis, dan `package.json` mengikuti versi
  tag terakhir.
- Changelog situs tidak lagi menampilkan nomor versi; setiap entri memakai
  tanggal dan anchor berdasarkan slug entri.

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

[Unreleased]: https://github.com/gmedia/sakala-landing/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/gmedia/sakala-landing/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/gmedia/sakala-landing/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/gmedia/sakala-landing/releases/tag/v0.1.0
