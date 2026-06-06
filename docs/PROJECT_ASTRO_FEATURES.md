# Sakala Landing Astro Feature Decisions

Dokumen ini mencatat keputusan penggunaan fitur Astro pada `sakala-landing`.
Tujuannya adalah menjaga situs tetap static-first sambil memakai fitur Astro
yang memberi manfaat terukur.

## Fitur Aktif

### Static Site Generation

Seluruh halaman dan endpoint publik dibangun secara statis. Jangan menambahkan
adapter atau runtime server tanpa kebutuhan produk yang disetujui.

### Content Collections

Dokumentasi dan changelog menggunakan content collections dengan schema Zod.
Pertahankan metadata yang dapat diverifikasi dan jangan menambahkan tanggal
update yang tidak benar-benar dipelihara.

### Sitemap

`@astrojs/sitemap` menghasilkan sitemap dari route indexable berdasarkan
konfigurasi `site`.

### Selective Prefetch

Astro prefetch aktif dengan `prefetchAll: false`. Prefetch hanya digunakan pada
jalur internal berintensi tinggi:

- navigasi utama desktop dan mobile;
- CTA dokumentasi;
- navigasi docs sebelumnya dan berikutnya;
- sidebar, mobile navigation, dan kartu index docs;
- logo menuju beranda.

Gunakan strategi `hover` untuk desktop dan `tap` untuk menu mobile. Jangan
mengaktifkan `prefetchAll`, `viewport`, atau `load` secara luas karena dapat
mengambil halaman yang tidak dibutuhkan pengguna.

### RSS Changelog

`/rss.xml` dibangun sebagai static endpoint menggunakan `@astrojs/rss` dan
collection changelog. Feed diumumkan melalui RSS auto-discovery pada setiap
halaman.

Setiap item RSS harus mengarah ke pembaruan yang terlihat pada halaman
changelog. Jangan memasukkan roadmap atau janji yang belum menjadi pembaruan
publik.

## Fitur yang Ditunda

### ClientRouter dan View Transitions

Jangan menambahkan `ClientRouter` hanya untuk animasi. Fitur ini baru layak
dievaluasi ketika ada kebutuhan client-side navigation atau persistent state
lintas halaman yang terukur.

### Astro Fonts

Tunda sampai tersedia keputusan font brand dan aset font lokal yang memiliki
lisensi jelas. Jangan menambah provider remote hanya untuk mengganti system
fallback tanpa audit performa.

### Responsive Images

Terapkan `astro:assets` ketika konten mulai memakai gambar raster atau
screenshot. Logo SVG dan OG image saat ini belum membutuhkan pipeline responsive
image.

### Content Security Policy

Evaluasi setelah platform deployment dan kebutuhan script pihak ketiga stabil.
CSP harus diuji terhadap JSON-LD, metadata, analytics, dan header dari hosting.

### Experimental Features

Jangan mengaktifkan experimental flags tanpa kebutuhan spesifik, rencana
verifikasi, dan persetujuan terhadap risiko breaking change.
