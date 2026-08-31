# Rencana Rebuild Landing Sakala

Rencana kerja untuk menyusun ulang `sakala.dev` agar setara dengan visi di
`sakala-docs`, satu bahasa dengan Console yang desainnya sudah jadi, dan
menjelaskan infrastruktur lewat gambar, bukan paragraf saja.

| Konteks       | Nilai                          |
| ------------- | ------------------------------ |
| Repo          | `sakala-landing`               |
| Baseline docs | `sakala-docs` 2026-08-15       |
| Stack         | Astro 7 · static · Tailwind v4 |
| Eksekusi      | Rebuild penuh, review lokal    |

---

## 1. Sumber Kebenaran

Salah menaruh otoritas akan mengunci rebuild ke desain yang justru sedang
diganti.

| Tingkat | Sumber                 | Status                                                |
| ------- | ---------------------- | ----------------------------------------------------- |
| 1       | `sakala-docs`          | Source of truth project-level                         |
| 2       | Figma workspace Sakala | Design workspace utama, Wave 1 selesai                |
| 3       | `sakala-landing/docs/` | Artefak turunan yang **mendeskripsikan landing lama** |

Hierarki di dalam `sakala-docs` mengikuti README-nya sendiri:

```txt
PHILOSOPHY → VISION → PRD → MVP → ARCHITECTURE → ADR → ROADMAP → DESIGN_STRATEGY → GLOSSARY
```

### Kenapa `docs/` lokal tidak dipakai sebagai pagar

`PROJECT_DESIGN_CONTEXT.md` menulis aturan yang benar untuk landing lama:
light-first wajib, motif paper dan deployment receipt, urutan section tetap,
serta token warna versi sekarang. Semua itu deskripsi hasil desain sebelumnya,
bukan prinsip produk.

Menjadikannya batasan berarti melarang rebuild melakukan hal yang memang
diminta. File di `docs/` diperlakukan sebagai **keluaran** yang ditulis ulang di
akhir, bukan masukan yang membatasi di awal.

Pengecualian: `PROJECT_SEO_AUDIT.md` tetap berguna sebagai rujukan teknis karena
temuannya soal structured data, sinyal entitas, dan alur Search Console tidak
terikat arah visual lama.

---

## 2. Pagar yang Nyata

Tiap pagar ditelusuri ke `sakala-docs`. Kalau sebuah aturan tidak punya jejak di
sana, ia bukan pagar.

| Pagar                              | Sumber                                                       |
| ---------------------------------- | ------------------------------------------------------------ |
| Jujur soal kematangan produk       | `PRD.md:825`, `MVP.md` exit gate, `ROADMAP.md` "directional" |
| Status adalah elemen UI kelas satu | `DESIGN_STRATEGY.md:174`                                     |
| Aksesibilitas                      | `PRD.md:894`, `DESIGN_STRATEGY.md:182`                       |
| Bukan tampilan SaaS admin generik  | `DESIGN_STRATEGY.md:190`, `VISION.md:288`                    |
| Ramah tanpa kekanakan              | `DESIGN_STRATEGY.md:166`                                     |
| Teknis tanpa mengintimidasi        | `DESIGN_STRATEGY.md:170`                                     |
| Framing open-source dan sponsor    | `GOVERNANCE.md`, `PRD.md` §3                                 |
| Landing tetap statis               | `ARCHITECTURE.md` topologi runtime                           |

`PRD.md:825` menegaskan `Design Ready does not equal Engineering Committed`.
Landing tidak boleh menampilkan layar desain sebagai bukti fitur berjalan.
`MVP.md` bahkan melarang menyatakan MVP selesai hanya karena UI-nya ada.

Yang **tidak lagi** jadi pagar karena hanya ada di `docs/` lama: kewajiban
light-first, motif paper dan receipt, urutan section tetap, dan token warna
lama.

---

## 3. Model Naratif dan Arah Visual

Dipilih sadar, bukan diwarisi.

**Model naratif: editorial/manifesto, disokong problem-solution.**

Model product-demo-first tidak mungkin dipakai: produknya belum berjalan, dan
menampilkan UI palsu dilarang oleh pagar kejujuran. Yang tersisa dan justru
paling kuat adalah sudut pandang — Sakala punya filosofi yang tidak dimiliki
PaaS lain. Risiko model ini adalah cerita kuat tapi produk kabur, sehingga
ditambal dengan pembingkaian masalah yang konkret dan diagram teknis yang nyata.

**Arah visual: editorial product storytelling + aksen technical console.**

Editorial memberi pacing dan tipografi yang megah. Aksen technical console
memberi kredibilitas: label monospace, status presisi, diagram, dan istilah
teknis yang benar. Bento sengaja tidak dipakai sebagai prinsip penyusun, karena
komposisi bukan pengganti arsitektur informasi — dan itu kelemahan landing lama.

**CTA mengikuti kematangan produk.** Untuk tahap pra-MVP, tindakan yang jujur
adalah menelusuri konsep dan membaca dokumentasi, bukan mendaftar atau deploy.

```txt
Primer   : Baca Dokumentasi
Sekunder : Lihat Repository
```

Satu aksi primer per section. Tautan navigasi bukan CTA.

---

## 4. Bahasa Visual: Ikuti Console

`DESIGN_STRATEGY.md:5` menetapkan Figma sebagai design workspace utama, dan
Wave 1 sudah selesai. Bahasa visual Sakala yang sebenarnya sudah ada dan sudah
dipakai Console.

Dari layar Register terlihat polanya: panel brand teal pekat dengan tekstur
sirkuit halus, tipografi Montserrat dengan headline putih tebal, sisi terang
yang bersih, dan checklist ringkas sebagai bukti alur.

Landing melanjutkan bahasa itu supaya `sakala.dev` dan `app.sakala.dev` terbaca
sebagai satu produk. Ini alasan yang lebih kuat untuk komposisi terang-gelap:
bukan selera, melainkan cerminan pembagian yang sudah dipakai Console.

Motif paper, receipt, dan grid editorial dari landing lama tidak diteruskan.

---

## 5. Sistem Ilustrasi dan Aset

Deployment itu abstrak. Teks saja membuat pembaca yang belum paham VPS, reverse
proxy, dan container menyerah di paragraf ketiga. Ilustrasi di sini bukan
dekorasi, melainkan alat penjelas utama.

### Aturan dasar

Ilustrasi yang dipakai adalah **diagram teknis buatan sendiri**, bukan screenshot
produk dan bukan bentuk 3D abstrak. Screenshot produk terlarang oleh pagar
kejujuran, sedangkan bentuk abstrak tidak menjelaskan apa pun.

Sumbernya bukan karangan: `ARCHITECTURE.md` sudah memuat tiga diagram Mermaid
otoritatif pada baris 48, 309, dan 393. Diagram landing adalah penggambaran
ulang diagram itu, sehingga isinya benar menurut dokumen project.

### Inventaris diagram

| Diagram                        | Sumber                        | Dipakai di           |
| ------------------------------ | ----------------------------- | -------------------- |
| Perjalanan source sampai reach | `PHILOSOPHY.md` core loop     | Penyeberangan        |
| Peta sistem browser sampai app | `ARCHITECTURE.md:48`          | Penyeberangan        |
| Siklus command dan claim agent | `ARCHITECTURE.md:309`         | Penyeberangan detail |
| Topologi runtime dan routing   | `ARCHITECTURE.md:393` dan §13 | Setelah karya hidup  |
| Prioritas builder              | `ADR-008`                     | Penyeberangan        |
| State machine deployment       | `PRD.md` §10                  | Status               |
| Loop karya melahirkan karya    | `FEATURE_EXPLORE.md`          | Setelah karya hidup  |

### Implementasi

- Inline SVG statis, diwarnai `currentColor` agar hidup di latar terang dan
  gelap tanpa file ganda.
- Satu bahasa gambar: garis alur, node, label monospace, dan penanda status.
  Bukan tujuh gaya berbeda.
- Tanpa raster, tanpa library diagram di sisi client.

### Ikonografi diturunkan dari logo

Detail kecil yang membuat brand terasa utuh: mark Sakala memakai stroke
membulat dengan dua bobot, 6 untuk bentuk utama dan 4 untuk simpul, pada kanvas
90 kali 104. Ikon set landing mewarisi kosakata itu — stroke membulat, dua
bobot, geometri bersudut sama. Hasilnya ikon terasa satu keluarga dengan logo,
bukan set generik yang ditempel.

### Aksesibilitas diagram

Ini bagian yang paling sering gagal, dan langsung menabrak `PRD.md:894`.

- Tiap diagram dibungkus `figure` dengan `figcaption` yang menjelaskan isinya.
- Sediakan padanan teks yang menyebut alurnya secara berurutan, sehingga
  pembaca screen reader mendapat informasi yang sama.
- Tidak ada makna yang hanya disampaikan lewat warna; tiap node berlabel.
- Diagram lebar memakai kontainer `overflow-x: auto` sendiri, dan pada layar
  kecil memakai varian bertumpuk, bukan gambar mengecil sampai tidak terbaca.
- Pemahaman tidak boleh bergantung pada animasi; motion apa pun menghormati
  `prefers-reduced-motion`.

### Detail kecil yang dianggarkan

Bukan tambahan kalau sempat, melainkan bagian pekerjaan: focus ring yang jelas
di kedua latar, state hover dan active yang konsisten, angka memakai
`tabular-nums`, label teknis memakai monospace, garis penghubung putus-putus
pada diagram alur, dan transisi halus pada elemen interaktif.

---

## 6. Internasionalisasi

Astro 7.0.2 punya konfigurasi `i18n` bawaan, dan `@astrojs/sitemap` mendukung
opsi `i18n`. Keduanya sudah diverifikasi terpasang.

### Keputusan

```js
i18n: {
  defaultLocale: "id",
  locales: ["id", "en"],
  routing: { prefixDefaultLocale: false },
}
```

Bahasa Indonesia menjadi default tanpa prefix, Inggris di bawah `/en/`.

Alasannya: dengan `prefixDefaultLocale: false`, **seluruh URL yang ada sekarang
tidak berubah**. Ini penting karena `PROJECT_SEO_AUDIT.md` menempatkan indexing
dan sinyal entitas sebagai P0, dan mengubah URL akan membuang kerja itu.

Bahasa Inggris ditambahkan karena `sakala-docs` sendiri berbahasa Inggris dan
project ini mengundang contributor luar, sementara persona utama di `PRD.md` §4
tetap mahasiswa, dosen, dan komunitas Indonesia.

### Lapisan pesan

Copy saat ini tersebar sebagai teks keras di file `.astro` dan `src/data/*.ts`.
Semuanya dipindah ke `src/i18n/` dengan kunci bertipe, plus helper
`useTranslations(locale)`. Tetap statis, tanpa JavaScript client.

### Konten dan dokumentasi

Content collection mendapat dimensi locale. Landing diterjemahkan penuh karena
copy-nya terbatas; dokumentasi tetap Indonesia lebih dulu dan Inggris menyusul
bertahap.

**Tanpa fallback diam-diam.** Halaman `/en/` tidak boleh menyajikan konten
Bahasa Indonesia. Bila sebuah dokumen belum diterjemahkan, route `/en/`-nya
tidak dibuat dan tidak muncul di navigasi Inggris.

### SEO multibahasa

- `hreflang` alternate untuk tiap locale plus `x-default`.
- `og:locale` dan `og:locale:alternate`.
- `inLanguage` pada JSON-LD mengikuti locale halaman, bukan `id-ID` keras
  seperti sekarang.
- Opsi `i18n` pada `@astrojs/sitemap`.
- Canonical per locale.

### Pemilih bahasa

Tautan biasa, tanpa JavaScript. Bahasa aktif ditandai teks, bukan warna saja.
Saat berpindah bahasa, arahkan ke padanan halaman bila ada; bila tidak ada,
arahkan ke beranda locale tersebut, jangan ke 404.

---

## 7. Keputusan Terkunci

| Aspek           | Keputusan                             |
| --------------- | ------------------------------------- |
| Arah visual     | Light base, dark anchor               |
| Tipografi       | Montserrat display, Inter body        |
| Cakupan naratif | Cerita produk penuh dan filosofi      |
| Eksekusi        | Rebuild penuh sekali jalan            |
| Ilustrasi       | Diagram teknis dari `ARCHITECTURE.md` |
| Bahasa          | `id` default, `en` di `/en/`          |

---

## 8. Arsitektur Halaman

Alur diturunkan dari busur naratif `PHILOSOPHY.md`:

```txt
kemungkinan → wujud → hidup → dibagikan → melahirkan karya baru
```

| #   | Latar  | Section                     | Peran naratif                         |
| --- | ------ | --------------------------- | ------------------------------------- |
| 1   | Gelap  | Hero                        | Tesis: Manifesting Code into Reality  |
| 2   | Strip  | Status pengembangan         | Kejujuran, ditempatkan lebih awal     |
| 3   | Terang | Jarak antara kode dan wujud | Masalah yang dibantu                  |
| 4   | Terang | Penyeberangan               | Source → Build → Deploy → Run → Reach |
| 5   | Band   | Tujuh prinsip               | Kenapa dibangun dengan cara ini       |
| 6   | Terang | Setelah karya hidup         | Operate, Explore, Learn sebagai arah  |
| 7   | Terang | Untuk siapa                 | Persona dari `PRD.md` §4              |
| 8   | Terang | Roadmap                     | Horizon produk dan wave desain        |
| 9   | Terang | Open source dan governance  | Siapa di baliknya                     |
| 10  | Terang | FAQ                         | Sisa keraguan                         |
| 11  | Gelap  | CTA dan footer              | Langkah berikutnya                    |

Section 4 dan 6 adalah tempat diagram bekerja paling keras. Section 6 memuat
loop yang jadi inti `FEATURE_EXPLORE.md`:

```txt
Project → Deploy → Showcase → Template → Developer baru → Project baru
```

Keberatan dijawab di dekat keputusannya, bukan ditumpuk di FAQ.

---

## 9. Urutan Kerja

### Fase 0 — Tetapkan arah desain baru

Menulis catatan arah desain ringkas yang diturunkan dari `sakala-docs` dan
Figma, lalu memakainya sebagai acuan build. Tandai `PROJECT_DESIGN_CONTEXT.md`
lama sebagai superseded. Penulisan ulang dokumen panjangnya adalah Fase 9.

### Fase 1 — Fondasi token dan tipografi

- Ramp teal gelap dan token teks on-dark dari variabel Figma.
- Self-host Montserrat lewat provider `local`, lisensi SIL OFL eksplisit.
- Bobot dibatasi: Montserrat 600 dan 700, Inter 400, 500, 600.
- Skala tipografi display dan body, termasuk perilaku pada 320px.

File: `src/styles/global.css`, `astro.config.mjs`, `public/fonts/`

### Fase 2 — Kerangka i18n

Dikerjakan sebelum menulis section, supaya copy tidak perlu dibongkar dua kali.

- Konfigurasi `i18n` dan `sitemap.i18n`.
- `src/i18n/` dengan kunci bertipe dan helper `useTranslations`.
- Content collection mendapat dimensi locale.
- `hreflang`, `og:locale`, dan `inLanguage` pada `BaseLayout`.

File: `astro.config.mjs`, `src/i18n/`, `src/content.config.ts`

### Fase 3 — Komponen brand

- Inline SVG agar `currentColor` bekerja di kedua latar.
- Regenerasi favicon dari `sakala-mark.svg`.
- OG image baru memakai lockup dan tagline resmi, satu per locale.
- Pensiunkan `logo.svg` 73 KB dan `favicon.svg` 29 KB.

File: `src/components/brand/`, `public/brand/`, `public/og/`

### Fase 4 — Sistem diagram dan ikon

- Primitif diagram bersama: node, konektor, label, penanda status.
- Tujuh diagram pada inventaris bagian 5.
- Ikon set yang mewarisi kosakata stroke logo.
- Tekstur brand panel sebagai CSS atau SVG, bukan raster.
- Padanan teks dan varian bertumpuk untuk layar kecil.

File: `src/components/diagram/`, `src/components/icons/`

### Fase 5 — Lapisan data

- `principles.ts` baru dari `PHILOSOPHY.md`.
- `pillars.ts` baru dari `VISION.md`, tiap item wajib punya status.
- `roadmap.ts` ditulis ulang mengikuti `ROADMAP.md`, memisahkan status desain
  dari status engineering.
- `use-cases.ts` disesuaikan dengan persona `PRD.md` §4.
- `links.ts`: perbaiki `githubRepository` yang menunjuk repo landing padahal
  dipakai sebagai CTA repository produk.
- Semua string berpindah ke lapisan i18n.

File: `src/data/`, `src/i18n/`

### Fase 6 — Shell dan section

- Mega menu dipertahankan; polanya bekerja tanpa JavaScript client.
- Header transparan di atas hero gelap lalu solid saat di-scroll, murni CSS.
- Pemilih bahasa di header dan footer.
- Footer jadi dark anchor dengan atribusi benar:
  `© {tahun} Sakala Contributors · Apache-2.0`.
- Section ditulis mengikuti peta bagian 8; tiap kapabilitas berlabel status.

File: `src/components/layout/`, `src/components/landing/`, `src/pages/`

### Fase 7 — Metadata dan changelog

- Pertahankan graph JSON-LD, canonical, breadcrumb, sitemap, dan RSS.
- Tidak ada URL lama berubah, jadi tidak perlu redirect.
- Tambah entri changelog; RSS hanya memuat pembaruan yang terlihat publik.

### Fase 8 — Aksesibilitas dan verifikasi

- Focus ring khusus permukaan gelap; lihat temuan bagian 10.
- Padanan teks tiap diagram diperiksa dengan menonaktifkan gambar.
- Urutan heading, alt text, target sentuh 44px, `prefers-reduced-motion`.
- Uji manual 320px, 768px, 1280px, plus telusur keyboard penuh.
- `npm run format:check`, `npm run check`, `npm run build`.

### Fase 9 — Tulis ulang dokumen turunan

`PROJECT_DESIGN_CONTEXT.md` ditulis ulang dari nol mengikuti hasil akhir,
`PROJECT_ASTRO_FEATURES.md` memindahkan Astro Fonts dan i18n ke Aktif, dan
`PROJECT_SEO_AUDIT.md` diperbarui pada bagian yang menyebut elemen visual lama.

---

## 10. Sistem Warna dan Hasil Uji Kontras

Angka dihitung, bukan perkiraan. Rasio WCAG 2.1 terhadap dark anchor `#08413D`,
ambang teks normal 4.5:1.

| Peran              | Nilai     | Rasio   | Hasil     | Penggunaan                        |
| ------------------ | --------- | ------- | --------- | --------------------------------- |
| Teks utama on-dark | `#FFFFFF` | 11.45:1 | AAA       | Headline dan body di hero         |
| `primary-soft`     | `#CCFBF1` | 10.16:1 | AAA       | Eyebrow, label, focus ring        |
| `primary-100`      | `#B5D5D2` | 7.31:1  | AAA       | Teks sekunder on-dark             |
| Teal redup         | `#8FB3AE` | 5.03:1  | AA        | Batas paling redup yang boleh     |
| `primary`          | `#0F766E` | 2.09:1  | **GAGAL** | Tidak boleh dipakai di atas gelap |

### Temuan yang harus ditangani

Aturan global saat ini memakai `outline: 3px solid var(--color-primary)` pada
`:focus-visible`. Di atas dark anchor rasionya hanya 2.09:1, di bawah ambang
3:1 untuk elemen non-teks, sehingga focus ring praktis tidak terlihat.

Perlu token focus terpisah untuk permukaan gelap memakai `#CCFBF1`. Ini bukan
preferensi: `PRD.md:894` dan `DESIGN_STRATEGY.md:182` mensyaratkan focus
terlihat dan kontras memadai.

Pada ground terang `#F8FAF7` tidak ada regresi: `primary` 5.21:1, `primary-dark`
7.23:1, `ink` 15.76:1, `muted` 4.73:1, `warm` 5.82:1.

---

## 11. Risiko

### Section arah produk terbaca sebagai janji fitur

Risiko terbesar dari memperluas cakupan naratif, dan langsung menabrak
`PRD.md:825`. Penjaga: tidak ada kapabilitas tampil tanpa label status. Explore,
Learn, dan CLI ditandai tegas sebagai arah.

### Diagram jadi dekorasi

Kalau diagram tidak menambah pemahaman, ia hanya menambah berat halaman dan
beban maintenance. Penjaga: tiap diagram harus bisa dijelaskan dengan kalimat
"tanpa gambar ini pembaca tidak akan paham X". Bila tidak bisa, diagram itu
dicoret.

### Utang terjemahan

Dua bahasa berarti dua kali permukaan konten untuk tim kecil, dan konten
Inggris yang basi lebih merusak kepercayaan daripada tidak ada sama sekali.
Penjaga: landing diterjemahkan penuh karena terbatas, dokumentasi bertahap, dan
tidak ada fallback diam-diam.

### Sinyal entitas melemah

`PROJECT_SEO_AUDIT.md` mencatat `sakala` adalah kata ambigu secara global.
Menambah halaman Inggris tanpa `hreflang` yang benar bisa memecah sinyal.
Penjaga: `hreflang` lengkap dengan `x-default`, canonical per locale, dan URL
Indonesia tidak berubah sama sekali.

### Dark anchor melenceng jadi dashboard gelap generik

`VISION.md:288` melarang menjadi `generic cloud dashboard`. Penjaga: gelap hanya
untuk hero, CTA, dan footer, mengikuti panel brand Console. Tanpa neon, tanpa
glow. Bila hasilnya bisa dipakai produk lain tanpa diubah, arahnya salah.

### Rebuild penuh menyembunyikan regresi

Verifikasi bergantung pada review lokal. Sediakan checklist per section dan
bandingkan dengan halaman lama sebelum digabung.

### Anggaran font dan SVG membengkak

Maksimum dua bobot Montserrat dan tiga bobot Inter, subset latin. Diagram inline
dihitung terhadap ukuran halaman; bila satu section jadi terlalu berat, diagram
dipecah atau disederhanakan.

---

## 12. Di Luar Cakupan

Halaman dokumentasi mewarisi token dan tipografi baru tetapi tata letaknya tidak
dirombak; dokumentasi memang harus lebih tenang daripada landing. Halaman
changelog, governance, dan tentang hanya menyesuaikan token. Terjemahan penuh
dokumentasi ke Inggris dikerjakan bertahap setelah rebuild. Console dan
repository lain tidak tersentuh.

---

## 13. Definisi Selesai

1. `format:check`, `check`, dan `build` lulus.
2. Tidak ada JavaScript client baru dan tidak ada dependency runtime baru.
3. Semua pasangan warna pada permukaan gelap memenuhi ambang WCAG, focus ring
   terlihat pada kedua latar.
4. Tidak ada kapabilitas tampil tanpa label status, dan tidak ada CTA menuju
   alur yang belum tersedia.
5. Tiap diagram punya padanan teks dan tetap terbaca pada 320px.
6. Halaman rapi pada 320px, 768px, dan 1280px tanpa overflow horizontal.
7. Seluruh URL Bahasa Indonesia yang lama tetap sama; `/en/` punya `hreflang`,
   canonical, dan `inLanguage` yang benar.
8. Tidak ada halaman `/en/` yang menyajikan konten Bahasa Indonesia.
9. Metadata, structured data, sitemap, dan RSS utuh; entri changelog ditambahkan.
10. Bahasa visual landing sejalan dengan panel brand Console.
11. Dokumen turunan di `docs/` sudah ditulis ulang mengikuti hasil akhir.
