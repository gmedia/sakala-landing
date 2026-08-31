# Konteks Implementasi Landing v2

Dokumen ini menggambarkan **apa yang benar-benar dibangun**, bukan apa yang
seharusnya dibangun. Arah kreatifnya tetap milik `docs/landing/`, dan bila
keduanya bertentangan, `docs/landing/` yang menang.

Pendahulunya, `docs/archive/PROJECT_DESIGN_CONTEXT.md`, menggambarkan build v1
dan tidak lagi berlaku.

## Susunan beranda

Delapan bab mengikuti satu project melewati hidupnya. Tiap bab adalah satu
komponen di `src/components/landing/`, dirangkai oleh `HomePage.astro`.

```txt
Possibility → Distance → Threshold → Manifestation
           → Clarity → Life → Open → Finale
```

`Chapter.astro` memegang permukaan dan jarak vertikalnya. Prop `thread`
menggambar sambungan Green Line yang melintasi batas bab.

## Artefak

Ilustrasi bukan gambar, melainkan konstruksi HTML dan CSS di
`src/components/artifact/`. Tidak ada pustaka diagram, tidak ada aset yang
perlu diunduh.

| Komponen             | Membawa                                             |
| -------------------- | --------------------------------------------------- |
| `SourceArtifact`     | Repository sebagai kemungkinan yang sudah berbentuk |
| `LocalhostArtifact`  | Panggung berkisi dengan jendela yang terkurung      |
| `ThresholdArtifact`  | Penyeberangan: garis, mark bercincin, konektor      |
| `DeploymentArtifact` | Tahap dan hasilnya dalam satu bingkai               |
| `ClarityArtifact`    | Baris status berdampingan dengan penjelasannya      |
| `LineageArtifact`    | Node graph dengan konektor SVG yang dihitung        |
| `OpenProofArtifact`  | Bukti keterbukaan, bukan label                      |
| `ArtifactFigure`     | Pembungkus: keterangan, teks alternatif, kematangan |

Aturan yang berlaku untuk semuanya:

- setiap artefak lewat `ArtifactFigure`, sehingga teks alternatif dan penanda
  kematangan tidak pernah hilang;
- status tidak pernah disampaikan lewat warna saja;
- artefak yang menggambarkan alur yang belum berjalan wajib menyatakannya;
- seluruh dekorasi `aria-hidden`;
- komposisinya utuh tanpa JavaScript.

## Gerak

`src/scripts/becoming.ts`, sekitar 2 KB, tanpa pustaka.

Penyembunyian awal digerbangi `data-motion="on"` yang dipasang skrip inline di
`BaseLayout.astro` sebelum paint. Tanpa JavaScript atribut itu tidak pernah
ada, dan seluruh konten tampil apa adanya.

Dua pengamat:

- `reveal` menyalakan elemen `.becoming` saat masuk viewport;
- `progress` menyalakan `.sequence-step` secara berurutan, dipakai tahap
  deployment dan penyeberangan di bab Ambang.

Ada satu pemeriksaan ulang saat `load`. Metrik font web baru berlaku setelah
`load`, dan pergeseran layout yang menyertainya pernah meninggalkan elemen yang
sudah terlihat tanpa pernah tercatat masuk viewport — terukur 3 dari 31 elemen
yang menyala. Kegagalannya berupa konten hilang, bukan animasi terlewat, jadi
celah itu ditutup.

## Token

Sumbernya `src/styles/global.css`. Tangga permukaan:

```txt
canvas   #FBFBFA   ground terang
surface  #FFFFFF   kartu dan artefak
deep     #08413D   teal pekat, dipakai bab Ambang
depth    #1E1E1D   Eerie Black, dipakai bab Terang
```

Permukaan gelap dipakai hanya ketika isinya menuntut, bukan karena terlihat
menarik.

Tiap keluarga permukaan punya tone kontrolnya sendiri. `LanguageSwitcher`
memiliki `light`, `deep`, dan `depth`; menukar `deep` dan `depth` menghasilkan
kontrol ber-hue asing dan border yang gagal kontras.

## Dokumentasi publik

Dua jalur di `src/content/docs/`, disusun oleh `src/data/docs.ts`.

Jalur pertama menjelaskan persoalan dan arahnya, jalur kedua menjelaskan
mesinnya. Kunci track `panduan` dipertahankan karena dipakai frontmatter setiap
dokumen, tetapi salinannya berbunyi "Pengantar", bukan "Panduan".

Selama Sakala belum tersedia sebagai layanan publik, dokumentasi tidak boleh
berbentuk panduan pakai. Halaman yang menjanjikan pemakaian sudah dicabut dan
alamat lamanya diarahkan ke hub. Yang tersisa menjelaskan cara kerja dan arah,
dan itu tetap jujur.

## Yang masih terbuka

Keduanya menunggu pemilik design system, tidak diputuskan di repository ini:

- Green Teal. `ART_DIRECTION.md` menulis `#0F796E`, aset Figma memakai
  `#0F766E`. Implementasi mengikuti aset Figma.
- Ramp penuh Burnt Orange dan Eerie Black belum tersedia di Figma. Hanya nilai
  anchor yang dipakai; tidak ada shade yang dikarang.
