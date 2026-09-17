# Changelog

Semua perubahan penting pada project ini akan didokumentasikan di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) dan project ini menggunakan [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Beranda v4: enam bab dengan artefak yang berubah keadaan; deployment berjalan tahap demi tahap dan mark menggambar dirinya di bab Ambang.
- Artefak bergrammar rancangan Console Wave 1 (analisis, timeline deployment, log kegagalan, kartu project) berlabel _design direction_.
- Social preview per halaman lewat `scripts/og/generate.mjs`, digambar dari font situs tanpa browser.
- Tiga pembaruan changelog terbaru di penutup beranda.
- Bagian "Cara berkontribusi" di halaman Open Source.
- Dokumentasi publik cara kerja Sakala Agent, command claim, operating mode, dan status fondasi MVP.
- Foundation website Astro static-first untuk `sakala.dev`.
- Landing page Bahasa Indonesia, dokumentasi, changelog, sitemap, dan metadata SEO.
- Identitas visual light-first serta aset logo Sakala.
- Art direction editorial dengan deployment receipt, status strip, bento use cases, dan tekstur CSS-only.
- Halaman governance publik, dokumen `GOVERNANCE.md`, dan `SPONSORS.md`.
- Framing sponsor pendiri untuk GMEDIA serta sponsor card pada halaman tentang.

### Changed

- Gerak dipindah dari teks ke artefak (37 elemen reveal menjadi 8); teks tampil statis.
- Pita status di atas header menjadi chip di dalam hero; CTA primer hero menuju bab Perjalanan, GitHub sebagai aksi sekunder.
- Nama tahap deployment mengikuti Console Wave 1.
- Bagian "Contributor awal" dihapus dari situs; `CONTRIBUTORS.md` tetap memuat kebijakannya.
- `RepoTopology`: heading kelompok h3, kalimat boundary datang dari pemakainya (memperbaiki kebocoran bahasa di `/en/open-source`).
- Framing Sakala diperbarui dari corporate-first menjadi project open-source yang didukung GMEDIA sebagai founding sponsor.
- Navigasi, dokumentasi, roadmap, dan daftar repository diperbarui untuk arsitektur `sakala-console` dan `sakala-api` yang terpisah.
