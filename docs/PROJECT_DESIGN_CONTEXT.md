# Sakala Landing Design Context

Dokumen ini mendeskripsikan sistem desain `sakala-landing` seperti yang
benar-benar dibangun. Ia adalah **turunan**, bukan sumber kebenaran.

## Sumber kebenaran

| Tingkat | Sumber                 | Peran                                   |
| ------- | ---------------------- | --------------------------------------- |
| 1       | `sakala-docs`          | Kebenaran produk, filosofi, dan roadmap |
| 2       | Figma workspace Sakala | Bahasa visual, Wave 1 selesai           |
| 3       | Dokumen ini            | Catatan penerapan pada situs            |

Ketika dokumen ini bertentangan dengan `sakala-docs`, `sakala-docs` menang.
Versi sebelumnya dari dokumen ini mengunci situs pada art direction lama
(light-first wajib, motif paper dan deployment receipt, urutan section tetap);
semuanya sudah dipensiunkan.

Rencana dan alasan perubahan tercatat di `PROJECT_LANDING_REBUILD_PLAN.md`.

---

## 1. Pagar yang berasal dari `sakala-docs`

| Pagar                              | Sumber                                    |
| ---------------------------------- | ----------------------------------------- |
| Jujur soal kematangan produk       | `PRD.md:825`, `MVP.md`, `ROADMAP.md`      |
| Status adalah elemen UI kelas satu | `DESIGN_STRATEGY.md:174`                  |
| Aksesibilitas                      | `PRD.md:894`, `DESIGN_STRATEGY.md:182`    |
| Bukan tampilan SaaS admin generik  | `DESIGN_STRATEGY.md:190`, `VISION.md:288` |
| Ramah tanpa kekanakan              | `DESIGN_STRATEGY.md:166`                  |
| Teknis tanpa mengintimidasi        | `DESIGN_STRATEGY.md:170`                  |
| Framing open-source dan sponsor    | `GOVERNANCE.md`, `PRD.md` §3              |
| Situs tetap statis                 | `ARCHITECTURE.md` topologi runtime        |

Konsekuensi praktis: tidak ada tangkapan layar produk palsu, tidak ada
kapabilitas yang tampil tanpa label status, dan tidak ada CTA menuju alur yang
belum tersedia.

---

## 2. Arah visual

**Model naratif:** editorial/manifesto, disokong problem-solution. Model
product-demo-first tidak dipakai karena produknya belum berjalan dan UI palsu
dilarang.

**Komposisi:** light base dengan dark anchor.

- Permukaan gelap (`--color-deep`) dipakai untuk header, hero, CTA, dan footer.
- Isi yang perlu dibaca lama tetap di latar terang.
- Header sengaja gelap solid, bukan terang tembus pandang. Header translusen di
  atas hero gelap membuat teks membayang dan kontras jatuh.

Bahasa visual mengikuti panel brand Console pada Figma. Motif paper, receipt,
dan editorial grid dari versi lama tidak diteruskan.

---

## 3. Warna

Token didefinisikan pada `src/styles/global.css`. Jangan menambah warna
hardcoded.

Kontras terhadap dark anchor `#08413D`:

| Token            | Nilai     | Rasio   | Pemakaian                  |
| ---------------- | --------- | ------- | -------------------------- |
| `on-deep`        | `#FFFFFF` | 11.45:1 | Headline dan body          |
| `on-deep-label`  | `#CCFBF1` | 10.16:1 | Eyebrow, label, focus ring |
| `on-deep-muted`  | `#B5D5D2` | 7.31:1  | Teks sekunder              |
| `on-deep-subtle` | `#8FB3AE` | 5.03:1  | Batas paling redup         |

`--color-primary` hanya 2.09:1 di atas permukaan gelap dan **tidak boleh**
dipakai di sana, termasuk untuk focus ring.

Focus ring memakai variabel `--focus-ring` yang ditukar di dalam `.surface-deep`
dan `.surface-deepest`. Tanpa itu focus praktis tidak terlihat di section gelap.

Status pada latar terang memakai `success`, `warning`, `error`. Pada permukaan
gelap wajib memakai varian `*-on-deep` karena versi terang hanya mencapai
1.8-2.4:1.

Kontras pada latar terang `#F8FAF7`: `ink` 15.76, `primary-dark` 7.23,
`warm` 5.82, `primary` 5.21, `muted` 5.42, `muted-2` 4.68.

---

## 4. Tipografi

- `--font-display` Montserrat 600 dan 700 untuk judul dan nama.
- `--font-sans` Inter 400, 500, 600 untuk teks.
- `--font-mono` memakai stack sistem untuk label teknis, domain, dan status.

Keduanya di-self-host melalui API `fonts` Astro dengan provider `local`. Jangan
memakai monospace untuk paragraf, dan jangan menambah bobot tanpa alasan.

---

## 5. Struktur halaman

Urutan diturunkan dari busur naratif `PHILOSOPHY.md`:
kemungkinan, wujud, hidup, dibagikan, melahirkan karya baru.

```txt
Hero (gelap)
Status pengembangan (strip)
Jarak antara kode dan wujud
Penyeberangan
Tujuh prinsip (band)
Setelah karya hidup
Untuk siapa
Roadmap
Open source dan governance
FAQ
CTA dan footer (gelap)
```

Setiap section menjawab satu pertanyaan pengguna. Bila tidak menjawab apa pun,
section itu tidak dibuat.

---

## 5b. Dokumentasi

Dokumentasi dipisah menjadi dua jalur yang berdiri sendiri, karena persona
utama Sakala adalah mahasiswa dan developer pemula yang tidak perlu melewati
internal runtime untuk menemukan jawabannya.

```txt
/docs           Panduan Sakala      cara memakai
/docs/teknis    Dokumentasi Teknis  cara Sakala dibangun
```

Aturan:

- Jalur ditentukan lewat field `track` pada frontmatter, bukan lokasi berkas.
- `track: referensi` muncul di kedua sidebar.
- Sidebar, navigasi mobile, dan tautan sebelumnya/berikutnya diturunkan dari
  content collection. Jangan membuat daftar navigasi terpisah yang menduplikasi
  koleksi.
- Jalur panduan ditulis tanpa mengandaikan pembaca paham Docker atau reverse
  proxy. Istilah teknis dijelaskan saat pertama muncul.
- Halaman yang menjelaskan alur belum tersedia wajib menyatakannya di awal.

---

## 6. Ilustrasi

Deployment itu abstrak, jadi diagram adalah alat penjelas utama, bukan dekorasi.

Aturan:

- Diagram teknis buatan sendiri; bukan tangkapan layar produk, bukan bentuk 3D
  abstrak.
- Isinya diturunkan dari diagram Mermaid pada `ARCHITECTURE.md` agar benar
  menurut dokumen project.
- Inline SVG statis mengikuti `currentColor`, tanpa raster dan tanpa library
  diagram di sisi client.
- Satu bahasa gambar: node, konektor, label monospace, penanda status.

Aksesibilitas diagram wajib:

- dibungkus `DiagramFigure` yang menyediakan `figcaption` dan padanan teks;
- padanan teks menyebut alurnya secara berurutan;
- tidak ada makna yang hanya disampaikan lewat warna;
- diagram lebar memakai kontainer `.diagram` yang scroll sendiri;
- pemahaman tidak bergantung pada animasi.

Ikon mewarisi kosakata stroke logo: stroke membulat, dua bobot, geometri
bersudut sama.

---

## 7. Bahasa

Bahasa Indonesia adalah default tanpa prefix URL, Bahasa Inggris di `/en/`.

- Seluruh string pengguna berada di `src/i18n/`.
- Tipe kamus diturunkan dari versi Indonesia, sehingga terjemahan yang kurang
  gagal pada `astro check`.
- Sapaan Bahasa Indonesia memakai `kamu`.
- Halaman yang belum diterjemahkan tidak mengumumkan hreflang alternate, dan
  pemilih bahasa mengarahkannya ke beranda locale, bukan ke 404.
- Rute yang benar-benar dua bahasa dicatat pada `bilingualRoutes`.

Hindari hype, jargon SaaS tanpa makna, dan klaim absolut. Istilah teknis diberi
konteks.

---

## 8. Komponen

Gunakan yang sudah ada sebelum membuat pola baru:

```txt
Button        StatusPill      SectionHeader   Container   Card
BrandMark     BrandLockup     SakalaLogo
DiagramFigure FlowDiagram     SystemDiagram   LoopDiagram
SiteHeader    SiteFooter      MobileNav       LanguageSwitcher
```

`Button`, `SectionHeader`, `StatusPill`, dan komponen diagram menerima prop
`tone` untuk latar terang maupun gelap. Jangan membuat varian baru bila `tone`
sudah cukup.

`StatusPill` selalu membawa label teks dan membedakan bentuk penanda per tone,
sehingga status tidak pernah bergantung pada warna saja.

---

## 9. Aksesibilitas

- Mulai dari lebar 320px tanpa overflow horizontal.
- Semua tindakan dapat digunakan dengan keyboard, focus terlihat di kedua latar.
- Struktur heading berurutan.
- Ilustrasi dekoratif memakai `aria-hidden`; diagram informatif memiliki padanan
  teks.
- Target sentuh penting minimal 44px.
- Motion menghormati `prefers-reduced-motion`.

---

## 10. Verifikasi

```bash
npm run format:check
npm run check
npm run build
```

Selain itu periksa manual pada 320px, 768px, dan 1280px, telusur keyboard penuh,
serta pastikan tidak ada JavaScript client baru.
