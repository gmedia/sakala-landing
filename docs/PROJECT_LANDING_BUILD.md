# Konteks Implementasi Landing

Dokumen ini menggambarkan **apa yang benar-benar dibangun**, bukan apa yang
seharusnya dibangun. Arah kreatifnya tetap milik `docs/landing/`, dan bila
keduanya bertentangan, `docs/landing/` yang menang.

Versi ini menggambarkan build v4 (September 2026). Audit dan alasan tiap
perubahannya ada di `docs/landing/V4_AUDIT_AND_DIRECTION.md`.

## Susunan beranda

Enam bab mengikuti satu project melewati hidupnya. Tiap bab adalah satu
komponen di `src/components/landing/`, dirangkai oleh `HomePage.astro`.

```txt
01 Possibility  →  02 Threshold  →  03 Journey
             →  04 Clarity  →  05 Life  →  06 Open (+ penutup)
```

| Bab | Komponen             | Isi                                                                                                                            |
| --- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| 01  | `ChapterPossibility` | Hero: chip status, h1, subheadline polos, CTA "Lihat cara kerjanya" (→ `#perjalanan`) + GitHub, artefak repository → localhost |
| 02  | `ChapterThreshold`   | Permukaan bergradasi canvas → deep; mark yang merakit diri; kalimat polos; strip persona tiga kolom                            |
| 03  | `ChapterJourney`     | `id="perjalanan"`. Kartu analisis di samping lead; _signature sequence_ deployment; "Here it is."                              |
| 04  | `ChapterClarity`     | Eerie Black. Banner gagal, timeline berhenti di satu tahap, penjelasan, log                                                    |
| 05  | `ChapterLife`        | Silsilah karya; cabang tanpa status per item, satu catatan kematangan                                                          |
| 06  | `ChapterOpen`        | Bukti keterbukaan; lalu penutup `#ikuti-perkembangan`: pertanyaan, blok follow, tiga changelog terbaru                         |

Satu project yang sama berjalan sepanjang halaman: `portfolio/` →
`localhost:5173` → `github.com/kamu/portfolio` → `portfolio.run.sakala.dev`,
dan di bab Terang ia gagal health check justru karena mendengarkan di port
5173, bukan 3000.

`Chapter.astro` memegang permukaan dan jarak vertikalnya. Prop `thread`
menggambar sambungan Green Line yang melintasi batas bab.

## Artefak

Ilustrasi bukan gambar, melainkan konstruksi HTML dan CSS di
`src/components/artifact/`. Tidak ada pustaka diagram, tidak ada aset yang
perlu diunduh.

| Komponen               | Membawa                                                                         | Klasifikasi      |
| ---------------------- | ------------------------------------------------------------------------------- | ---------------- |
| `PossibilityArtifact`  | Repository dan localhost dalam satu bingkai, dengan `npm run dev` di antaranya  | conceptual       |
| `ThresholdArtifact`    | Penyeberangan; mark digambar dua goresan (source, lalu wujud)                   | conceptual       |
| `AnalysisArtifact`     | "Sakala membaca proyekmu": Repository / Branch / Builder / Port, urutan builder | design direction |
| `DeploymentArtifact`   | Strip meta, timeline lima tahap yang berjalan, momen "sudah hidup" + URL        | design direction |
| `ClarityArtifact`      | Banner gagal, timeline dengan satu tahap ✕, penjelasan, panel log               | design direction |
| `LineageArtifact`      | Node graph dengan konektor SVG yang dihitung                                    | conceptual       |
| `OpenProofArtifact`    | Bukti keterbukaan, bukan label                                                  | actual           |
| `ProjectCardsArtifact` | Kartu project Dashboard dalam tiga keadaan (`/produk`)                          | design direction |
| `ArtifactFigure`       | Pembungkus figure, figcaption, dan penanda kematangan (`note`)                  | —                |

Grammar artefak berlabel _design direction_ dipinjam dari Console Wave 1
(Figma, section Deployment detail `724:1713`, Create Project `1259:1491`,
Dashboard `1037:2984`): banner status, strip meta, timeline dengan lingkaran
keadaan, panel log, kartu analisis, kotak URL. Chrome Console (sidebar,
profil, breadcrumb) tidak ikut. Nama tahap mengikuti Console, ditulis natif
per bahasa.

Aturan yang berlaku untuk semuanya:

- artefak dibangun dengan HTML semantik dan reading order yang utuh;
- `ArtifactFigure` menambahkan figcaption dan penanda kematangan. Padanan
  tekstual khusus hanya diperlukan untuk artefak yang murni visual;
- status tidak pernah disampaikan lewat warna saja — tiap keadaan tahap
  membawa teksnya sendiri (`selesai` / `sedang berjalan` / `menunggu` /
  `gagal`);
- artefak yang menggambarkan alur yang belum berjalan wajib menyatakannya;
- seluruh dekorasi `aria-hidden`;
- komposisinya utuh tanpa JavaScript.

## Gerak

`src/scripts/becoming.ts`, sekitar 2,5 KB, tanpa pustaka.

Penyembunyian awal digerbangi `data-motion="on"` yang dipasang skrip inline
di `BaseLayout.astro` sebelum paint. Tanpa JavaScript atribut itu tidak
pernah ada, dan seluruh konten tampil apa adanya.

Aturannya sejak v4: **teks tampil statis; hanya artefak yang menjadi.**
Beranda memuat 8 elemen `.becoming` (semuanya `ArtifactFigure`) dan 3
urutan `data-sequence`, turun dari 37 elemen di v3.

Dua pengamat:

- `reveal` menyalakan elemen `.becoming` saat masuk viewport;
- `progress` menyalakan `.sequence-step` berurutan. Jeda per langkah bisa
  diatur lewat nilai atribut (`data-sequence="480"`); urutan yang duduk di
  dalam artefak yang belum muncul menunggu ~480 ms lebih dulu supaya hanya
  satu hal yang menjadi pada satu waktu.

Keadaan tahap deployment dihitung CSS dari urutan (`global.css`, bagian
"tahap deployment"): tahap `.is-present` selesai, tahap tepat sesudahnya
sedang berjalan, sisanya menunggu; garis penghubung terisi teal saat kedua
ujungnya selesai. Selector `html:not([data-motion="on"])` membuat semua tahap
selesai tanpa JavaScript. Mark di Ambang memakai `pathLength="1"` dan
`stroke-dashoffset` untuk menggambar dirinya; tanpa gerak ia utuh.

Ada satu pemeriksaan ulang saat `load` untuk elemen yang terlewat karena
pergeseran layout font.

## Token

Sumbernya `src/styles/global.css`. Tangga permukaan:

```txt
canvas   #FBFBFA   ground terang
surface  #FFFFFF   kartu dan artefak
deep     #08413D   teal pekat, dipakai bab Ambang (bergradasi dari canvas di tepi atas)
depth    #1E1E1D   Eerie Black, dipakai bab Terang
```

Gradient hanya dipakai ketika sesuatu berpindah keadaan: permukaan Ambang
(`.threshold-surface`, canvas → deep dalam 5rem, selesai jauh sebelum baris
teks pertama), garis tahap yang terisi, bloom di belakang halaman yang hidup.
Hanya keluarga teal dan netral; ramp Burnt Orange dan Eerie Black belum ada
di Figma, jadi tidak ada shade yang dikarang.

Tiap keluarga permukaan punya tone kontrolnya sendiri. `LanguageSwitcher`
memiliki `light`, `deep`, dan `depth`.

## Social preview

`scripts/og/generate.mjs` membuat `public/og/<slug>.png` dan
`public/og/en/<slug>.png` untuk produk, filosofi, roadmap, open-source, docs,
dan changelog. Judul digambar sebagai path glyph dari WOFF2 di
`src/assets/fonts` lewat `fontkitten`, dirasterisasi `sharp`; keduanya sudah
hadir sebagai dependency Astro, jadi tidak butuh font sistem maupun browser.
`src/data/og.ts` memetakan path ke berkasnya; beranda dan halaman lain memakai
`og/default.png`. Jalankan ulang bila judul halaman berubah, lalu commit
hasilnya — build tidak memanggilnya.

## Dokumentasi publik

Dua jalur di `src/content/docs/`, disusun oleh `src/data/docs.ts`.

Jalur pertama menjelaskan persoalan dan arahnya, jalur kedua menjelaskan
mesinnya. Kunci track `panduan` dipertahankan karena dipakai frontmatter setiap
dokumen, tetapi salinannya berbunyi "Pengantar", bukan "Panduan".

Selama Sakala belum tersedia sebagai layanan publik, dokumentasi tidak boleh
berbentuk panduan pakai. Halaman penggunaan yang tidak punya penerus diarahkan
ke hub; perjalanan deployment diarahkan ke rancangan alur teknis yang
ekuivalen.

## Anchor yang sudah dikunci

```txt
Green Teal    #0F766E
Burnt Orange  #C2670E
Eerie Black   #1E1E1D
```

Tipografi adalah pasangan, bukan satu keluarga:

```txt
Brand / Display / Heading   Montserrat   --font-display
Body / Reading / Long-form  Inter        --font-sans
Mono / Technical artifact   monospace    --font-mono
```

Log di landing memakai monospace walaupun rancangan Console memakai
Montserrat; `PRODUCT_ARTIFACTS.md` §2 yang berlaku di sini.

## Yang masih terbuka

- Ramp penuh Burnt Orange dan Eerie Black belum tersedia di Figma. Hanya
  nilai anchor yang dipakai; tidak ada shade yang dikarang.
- Komposisi diverifikasi lewat screenshot headless di 1440 px dan 390 px,
  termasuk keadaan tengah animasi (mark setengah tergambar, tahap "sedang
  berjalan"). Belum diuji di perangkat nyata maupun pembaca layar; itu
  tinjauan manual yang tetap layak sebelum rilis.
- Jumlah kata beranda (±1.250) tidak turun dari v3 karena artefak kini
  membawa teks produk (tahap, log, changelog); prosa naratifnya yang
  berkurang.
