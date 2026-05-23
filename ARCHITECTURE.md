# Arsitektur Sakala Landing

## Tujuan

`sakala-landing` merupakan website publik, entry point SEO, dan calon pusat konten Sakala pada `sakala.dev`. Situs ini tidak menjalankan fungsi control plane atau runtime deployment.

## Mengapa Astro

Astro sesuai untuk halaman marketing dan dokumentasi yang sebagian besar berupa konten statis. Output SSG menghasilkan halaman ringan, mudah di-cache, dan tidak memerlukan server aplikasi saat dipublikasikan.

## Strategi SSG-First

- Semua halaman utama dirender saat build.
- Interaksi sederhana menggunakan HTML native seperti `details`, bukan JavaScript client yang berat.
- Tidak ada runtime server atau pemanggilan API dashboard dari browser pada foundation ini.

## Struktur Komponen

- `BaseLayout.astro` menyatukan metadata SEO, canonical URL, dan Open Graph.
- `LandingLayout.astro` membungkus halaman publik dengan header/footer.
- `DocsLayout.astro` memberi navigasi dokumentasi konsisten.
- Komponen pada `landing/` dan `ui/` tetap presentasional dan statis.

## Content Collections

Koleksi `docs` menghasilkan route dokumentasi dan validasi frontmatter. Koleksi `changelog` menyediakan pembaruan publik yang terstruktur. Blog atau tutorial dapat ditambahkan sebagai collection baru setelah kebutuhan editorial jelas.

## SEO dan Domain

Konfigurasi site menggunakan `https://sakala.dev`. Sitemap dan `robots.txt` dapat ditemukan crawler, sementara setiap halaman memperoleh metadata canonical dan default social preview. Dashboard tetap berada pada `app.sakala.dev`; URL aplikasi masa depan menggunakan `*.run.sakala.dev`.
