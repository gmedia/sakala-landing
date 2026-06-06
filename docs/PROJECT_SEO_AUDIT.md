# Sakala Landing SEO Audit and Guidelines

Dokumen ini adalah audit dan guideline SEO khusus `sakala-landing`. Audit
dilakukan pada 6 Juni 2026 terhadap source project, static build, halaman live,
dan dokumentasi resmi Google Search Central.

SEO membantu mesin pencari memahami Sakala dan membantu pengguna menemukan
halaman yang relevan. SEO tidak dapat menjamin posisi pertama untuk query
tertentu.

## Sasaran Pencarian

Prioritas pencarian dibagi menjadi tiga kelompok:

1. **Brand:** `sakala`, `sakala.dev`, `sakala deployment`, `sakala deploy`.
2. **Problem dan intent:** `cara deploy project dari git`, `deploy project
mahasiswa`, `membagikan project localhost`, `platform deployment indonesia`.
3. **Educational:** `belajar deployment untuk pemula`, `alur deployment git ke
url`, `apa itu reverse proxy untuk deployment`.

Jangan menargetkan atau mengoptimalkan copy untuk `deploy gratis`, `hosting
gratis`, `production-ready`, atau klaim layanan lain sebelum fakta produknya
tersedia dan dapat dibuktikan.

## Executive Summary

Fondasi teknis SEO project sudah baik:

- Astro static-first menghasilkan HTML yang dapat dibaca crawler;
- `robots.txt`, sitemap, canonical URL, title, description, Open Graph, dan
  Twitter metadata tersedia;
- homepage memiliki `WebSite`, `Organization`, `SoftwareApplication`, dan
  `WebPage` structured data;
- bahasa halaman ditetapkan sebagai Bahasa Indonesia;
- halaman memiliki internal navigation dan URL deskriptif;
- OG image tersedia pada ukuran 1200 x 630.

Hambatan terbesar untuk query tunggal `sakala` bukan sekadar metadata. `Sakala`
adalah istilah global yang ambigu dan sudah diasosiasikan dengan banyak entitas
lain. Ranking brand membutuhkan konsistensi entitas, konten yang membantu,
mention dan link eksternal yang relevan, serta waktu untuk recrawl dan
re-indexing.

Perbaikan low-risk yang diterapkan bersama audit:

- copy awal homepage menyebut Sakala secara eksplisit;
- `WebSite` memiliki fallback site name `sakala.dev`;
- structured data entitas dan site name dibatasi ke homepage.
- breadcrumb visual dan `BreadcrumbList` memakai hierarchy yang sama pada docs,
  changelog, dan halaman tentang;
- changelog ditandai sebagai `CollectionPage`;
- panduan people-first tentang membagikan project dari localhost ditambahkan
  sebagai pintu masuk query non-brand.
- halaman `Tentang Sakala` menjelaskan ownership, tujuan, status, dan ekosistem
  repository sebagai penguat sinyal entitas.
- RSS changelog tersedia sebagai static endpoint dan diumumkan melalui
  auto-discovery metadata.

## Status Implementasi Repository

Status berikut membedakan pekerjaan yang dapat diselesaikan melalui source dari
pekerjaan yang memerlukan deployment, akses Search Console, atau sumber
eksternal.

| Area                                             | Status          | Catatan                                                   |
| ------------------------------------------------ | --------------- | --------------------------------------------------------- |
| Canonical, robots, sitemap, OG, Twitter metadata | Selesai         | Tersedia pada static build                                |
| Entity schema homepage                           | Selesai         | `WebSite`, `Organization`, dan `SoftwareApplication`      |
| Breadcrumb halaman bertingkat                    | Selesai         | Visual dan `BreadcrumbList` berasal dari data yang sama   |
| Klasifikasi changelog                            | Selesai         | Menggunakan `CollectionPage`                              |
| Konten intent `project dari localhost`           | Selesai         | Tersedia pada `/docs/keluar-dari-localhost`               |
| Halaman entity `Tentang Sakala`                  | Selesai         | Menggunakan `AboutPage` pada `/tentang`                   |
| RSS changelog                                    | Selesai         | Static feed tersedia pada `/rss.xml`                      |
| Tanggal update dan sitemap `lastmod`             | Ditunda sengaja | Belum ada proses yang menjamin tanggal selalu akurat      |
| Social preview per halaman                       | Ditunda sengaja | Belum ada manfaat terukur yang melebihi biaya maintenance |
| Deploy source terbaru                            | Eksternal       | Harus dilakukan pada pipeline hosting                     |
| Search Console dan request indexing              | Eksternal       | Memerlukan akses domain property                          |
| Backlink dan profil organisasi                   | Eksternal       | Memerlukan perubahan pada sumber resmi di luar repository |

## Temuan Prioritas

### P0 - Deploy Source Terbaru Sebelum Meminta Recrawl

Pada 6 Juni 2026, halaman live `https://sakala.dev` yang dapat dibaca crawler
masih menampilkan versi lama, termasuk:

- badge berbahasa Inggris;
- deployment receipt berstatus `AKTIF`;
- status runtime lama;
- CTA GitHub yang belum diarahkan ke repository project.

Source lokal sudah memperbaiki masalah tersebut. Jangan meminta Google
melakukan recrawl sampai source terbaru benar-benar ter-deploy. AI Overview dan
snippet dapat tetap memakai copy lama selama halaman live belum berubah atau
belum dirayapi ulang.

### P0 - Gunakan Google Search Console Sebagai Sumber Data

Audit source tidak dapat menjawab query, impression, click-through rate, posisi,
atau status indexing aktual. Setelah deployment:

1. Verifikasi domain property `sakala.dev`.
2. Submit `https://sakala.dev/sitemap-index.xml`.
3. Inspect homepage, docs index, dan halaman docs utama.
4. Request indexing setelah perubahan penting.
5. Pantau query brand dan non-brand pada Performance report.
6. Catat baseline 28 hari sebelum membandingkan perubahan.

Jangan mengambil keputusan keyword hanya dari pencarian manual karena hasil
dapat berbeda menurut lokasi, histori, perangkat, dan waktu.

### P1 - Perkuat Sinyal Entitas Sakala

Google membentuk site name dan pemahaman brand dari homepage, structured data,
title, heading, konten, serta referensi di web.

Rekomendasi:

- gunakan nama `Sakala` secara konsisten pada homepage dan sumber eksternal;
- tambahkan `alternateName: "sakala.dev"` pada `WebSite` structured data sebagai
  fallback site name;
- pastikan profile GitHub GMEDIA dan repository ekosistem menautkan
  `https://sakala.dev`;
- gunakan deskripsi repository yang konsisten: Sakala adalah platform
  deployment open-source untuk project kecil dan pembelajaran;
- minta halaman resmi GMEDIA yang relevan menautkan Sakala dengan anchor text
  deskriptif;
- pertahankan halaman `Tentang Sakala` sebagai sumber ownership, tujuan, status
  produk, dan hubungan repository yang dapat diverifikasi.

Hindari membuat banyak variasi nama brand yang belum dikenal pengguna.

### P1 - Tambah Konten People-First Berdasarkan Intent Nyata

Saat ini situs memiliki landing, halaman tentang, changelog, dan enam halaman
docs. Ini cukup untuk menjelaskan fondasi, tetapi belum cukup untuk banyak query
non-brand.
Prioritas konten berikutnya harus menjawab kebutuhan nyata, misalnya:

- cara membagikan project yang masih berjalan di localhost; panduan awal sudah
  tersedia pada `/docs/keluar-dari-localhost`;
- pengantar deployment dari Git menuju URL publik;
- perbedaan dashboard, agent, runtime, dan reverse proxy;
- panduan deployment untuk tugas atau portfolio;
- penjelasan log, build, route, sleep, dan wake ketika fitur tersedia;
- studi proses pengembangan Sakala yang jujur dan dapat diverifikasi.

Setiap halaman harus memiliki tujuan pengguna yang jelas, informasi original,
judul deskriptif, internal link relevan, dan status produk yang jujur. Jangan
membuat halaman tipis hanya untuk mengejar variasi keyword.

### P1 - Rapikan Structured Data Berdasarkan Fungsi Halaman

Kondisi setelah audit:

- entitas `WebSite`, `Organization`, dan `SoftwareApplication` tampil pada
  homepage, sedangkan halaman lain tetap memiliki `WebPage`;
- `SoftwareApplication` membantu klasifikasi entitas, tetapi tidak memenuhi
  syarat rich result software Google tanpa offer dan review/rating;
- offer atau rating tidak boleh dibuat-buat hanya untuk rich result;
- halaman docs dan changelog memiliki breadcrumb visual serta
  `BreadcrumbList` yang sesuai hierarchy halaman;
- changelog menggunakan tipe halaman `CollectionPage`.

Aturan implementasi seterusnya:

- tampilkan `WebSite` site-name structured data pada homepage;
- tampilkan `Organization` dan entitas Sakala hanya pada halaman yang relevan;
- tetap gunakan `WebPage` sesuai halaman;
- gunakan `CollectionPage` hanya untuk halaman yang benar-benar menyajikan
  koleksi;
- pertahankan breadcrumb visual dan structured data dari sumber data yang sama;
- validasi dengan Schema Markup Validator dan Rich Results Test;
- jangan menganggap structured data sebagai faktor yang menjamin ranking.

### P2 - Metadata dan Sitemap

Yang sudah baik:

- title dan description unik pada tipe halaman utama;
- canonical URL tersedia;
- sitemap hanya berisi halaman indexable;
- 404 menggunakan `noindex`;
- robots mengizinkan crawl dan menunjuk sitemap;
- social preview memiliki dimensi yang benar.

Peningkatan berikutnya:

- tambahkan tanggal update pada content collection hanya jika akurat dan
  benar-benar dipelihara;
- gunakan `lastmod` sitemap hanya dari data perubahan yang akurat;
- review title dan description setiap kali intent halaman berubah;
- buat social preview khusus untuk halaman penting bila manfaatnya jelas.

Google tidak menggunakan meta keywords. Jangan menambahkannya.

## Strategi Query Brand `sakala`

Query tunggal `sakala` memiliki kompetisi entitas dan intent yang luas. Target
realistis bertahap:

```txt
Tahap 1 : sakala.dev
Tahap 2 : sakala deploy / sakala deployment
Tahap 3 : sakala untuk project / sakala GMEDIA
Tahap 4 : sakala
```

Untuk memperkuat tahap tersebut:

- konsisten memakai nama dan deskripsi produk;
- bangun link dari domain dan repository resmi;
- publikasikan perkembangan yang nyata melalui changelog;
- buat konten yang layak dirujuk komunitas atau kampus;
- pantau branded impressions di Search Console;
- beri waktu beberapa minggu sampai beberapa bulan untuk evaluasi.

Tidak ada perubahan teknis yang dapat menjamin Sakala langsung berada di posisi
pertama untuk query tunggal tersebut.

## AI Overview dan Product Honesty

AI Overview dapat merangkum halaman secara tidak sempurna. Project hanya dapat
memperbaiki sumber yang dikendalikan:

- tulis definisi Sakala secara eksplisit dan konsisten;
- bedakan fitur tersedia, preview konsep, dan roadmap;
- hindari contoh yang terlihat seperti bukti layanan aktif;
- gunakan FAQ untuk menjawab status production dan batas produk;
- deploy koreksi lalu request recrawl;
- pantau kembali hasil setelah Google memproses versi terbaru.

Jangan mengubah copy menjadi klaim agresif hanya agar ringkasan AI terlihat
menjual.

## Checklist Setiap Perubahan Publik

### Content

- [ ] Intent pengguna halaman jelas.
- [ ] Title dan H1 akurat serta tidak menipu.
- [ ] Description unik dan sesuai konten.
- [ ] Nama Sakala, domain, status, dan CTA konsisten.
- [ ] Internal link menggunakan anchor text deskriptif.
- [ ] Tidak ada keyword stuffing atau klaim yang belum tersedia.

### Technical

- [ ] Halaman penting dapat dirender sebagai HTML statis.
- [ ] Canonical mengarah ke URL yang benar.
- [ ] Indexable page masuk sitemap.
- [ ] Halaman utility yang tidak relevan memakai `noindex`.
- [ ] Structured data sesuai konten yang terlihat.
- [ ] `robots.txt` dan sitemap tetap dapat diakses.
- [ ] OG image, title, description, dan alt diperiksa.

### Setelah Deploy

- [ ] Pastikan live source sama dengan build terbaru.
- [ ] Jalankan URL Inspection pada halaman yang berubah.
- [ ] Request indexing bila perubahan penting.
- [ ] Pantau indexing dan structured data errors.
- [ ] Bandingkan query, impression, click, CTR, dan average position.
- [ ] Evaluasi setelah cukup waktu; jangan menilai hanya dari satu pencarian.

## Sumber Resmi

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Site names in Google Search](https://developers.google.com/search/docs/appearance/site-names)
- [Crawling and indexing](https://developers.google.com/search/docs/crawling-indexing)
- [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Software application structured data](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
