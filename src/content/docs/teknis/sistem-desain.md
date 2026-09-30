---
title: Sistem Desain
description: Token warna dengan rasio kontrasnya, pasangan tipografi, skala spasi, kosakata status, dan aturan artefak yang dipakai landing dan menjadi patokan antarmuka Sakala lainnya.
track: teknis
section: Antarmuka
order: 7
---

# Sistem Desain

> **Sumber kanonik:** [Design Strategy](/docs/proyek/design-strategy) · Sakala Design System (Figma, akses tim)

Halaman ini adalah patokan bagi siapa pun yang membuat antarmuka Sakala —
Console, landing, alat internal, maupun kontribusi baru. Nilai di sini
adalah nilai yang benar-benar dipakai situs ini (`src/styles/global.css`),
diselaraskan dengan Sakala Design System di Figma. Bila keduanya berbeda,
Figma yang menang dan halaman ini yang diperbaiki.

Yang tertulis di sini bukan rahasia: semuanya sudah ada di CSS yang dikirim
ke setiap browser. Menerbitkannya membuat kontribusi UI konsisten sejak
awal, bukan dikoreksi belakangan.

Nama dan logo Sakala tidak termasuk lisensi repository ini; pemakaiannya diatur [Governance §7](/docs/proyek/governance).

## Anchor brand

Tiga warna kanonik dari Sakala Design System. Nilai lain diturunkan dari
ramp Figma; tidak ada shade yang dikarang.

```txt
Green Teal     #0F766E   identitas Sakala, aksi utama, makna naratif: manifestasi, hidup, hadir
Burnt Orange   #C2670E   sekunder, hemat: niat manusia, titik transisi
Eerie Black    #1E1E1D   kedalaman teknis: source, log, permukaan diagnostik
```

Green Teal adalah primer. Burnt Orange bukan primer kedua dan tidak boleh
bersaing dengan warna peringatan. Warna status semantik (sukses, peringatan,
error, info) sengaja dipisah dari warna brand.

## Token warna dan kontras

Rasio diukur terhadap permukaan tempat token itu dipakai. Ambang WCAG 2.2 AA:
teks 4,5:1, teks besar dan elemen UI 3:1.

### Permukaan terang (`canvas #FBFBFA`)

| Token          | Nilai     | Peran                                                            | Rasio   |
| -------------- | --------- | ---------------------------------------------------------------- | ------- |
| `ink`          | `#1E1E1D` | teks utama                                                       | 16,11:1 |
| `muted`        | `#5C5C58` | teks sekunder                                                    | 6,49:1  |
| `muted-2`      | `#6B6B66` | label, keterangan                                                | 5,17:1  |
| `primary`      | `#0F766E` | aksi, penanda; sebagai teks kecil                                | 5,29:1  |
| `primary-dark` | `#115E59` | teks tautan di atas canvas                                       | 7,32:1  |
| `spark-text`   | `#96500B` | teks oranye (anchor `#C2670E` hanya 3,87:1, jadi untuk non-teks) | 5,88:1  |
| `success`      | `#15803D` | teks status berhasil                                             | 4,84:1  |
| `warning`      | `#9A4D06` | teks status peringatan                                           | 5,90:1  |
| `error`        | `#B91C1C` | teks status gagal                                                | 6,25:1  |
| putih          | `#FFFFFF` | teks di atas tombol `primary`                                    | 5,47:1  |

Pendamping: `surface #FFFFFF`, `background-soft #F4F4F2`, `border #E2E2DE`,
`border-strong #D1D1CB`, `primary-soft #CCFBF1`, `primary-soft-2 #E7FFFA`,
`spark-soft #FDF0E2`.

### Permukaan teal pekat (`deep #08413D`)

Dipakai untuk momen transisi, bukan sebagai default.

| Token           | Nilai     | Peran         | Rasio   |
| --------------- | --------- | ------------- | ------- |
| `on-deep`       | `#FFFFFF` | teks utama    | 11,45:1 |
| `on-deep-label` | `#CCFBF1` | label, ikon   | 10,16:1 |
| `on-deep-muted` | `#B5D5D2` | teks sekunder | 7,31:1  |

Pendamping: `deepest #06322F`, `deep-surface #0B4D48`, `deep-border #14564F`.

### Permukaan Eerie Black (`depth #1E1E1D`)

Dipakai untuk log, source, dan artefak diagnostik.

| Token            | Nilai     | Peran         | Rasio                       |
| ---------------- | --------- | ------------- | --------------------------- |
| `on-depth`       | `#E8E8E6` | teks utama    | 13,60:1                     |
| `on-depth-muted` | `#A8A8A4` | teks sekunder | 6,99:1                      |
| `error-on-depth` | `#FCA5A5` | baris error   | 7,68:1 pada `depth-surface` |

Pendamping: `depth-surface #292927`, `depth-border #3A3A37`,
`success-on-depth #4ADE80`, `spark-on-depth #E08A2E`.

Catatan: `on-depth-subtle #8F8F8B` hanya 4,49:1 di atas `depth-surface`;
pakai `on-depth-muted` untuk teks di atas kartu gelap.

## Tipografi

Pasangan, bukan satu keluarga.

```txt
Brand / Display / Heading    Montserrat   bobot 600, 700
Body / Reading / Long-form   Inter        bobot 400, 500, 600
Mono / Artefak teknis        monospace sistem
```

Inter dipilih sengaja untuk kenyamanan membaca teks panjang; ia bukan brand
kedua dan tidak dipakai pada peran display. Monospace hanya untuk domain,
log, status deployment, pohon berkas, commit, dan label teknis — tidak pernah
untuk teks bacaan.

Skala display naratif khusus landing (`clamp`, diuji pada 320 px):

```txt
narrative-xl   clamp(2.75rem, 7vw, 6rem)      line-height 1
narrative-l    clamp(2.125rem, 5vw, 4.25rem)  line-height 1.04
narrative-m    clamp(1.75rem, 3.4vw, 2.75rem) line-height 1.14
```

Console memakai ceiling yang lebih rendah; skala ini tidak dipakai di
dokumentasi.

Aturan setting: body 16–18 px dengan line-height 1,5–1,65 dan lebar baris
45–80 karakter; heading line-height 1,0–1,2 dengan letter-spacing sedikit
negatif pada ukuran display; kalimat biasa (sentence case) untuk UI; angka
tabular di tabel dan log.

## Spasi, radius, permukaan

- Skala spasi 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px. Jarak antar
  kelompok selalu lebih besar daripada jarak di dalam kelompok.
- Radius: 8 px untuk kontrol, 12 px untuk kartu kecil, 16 px untuk artefak
  dan kartu besar, penuh untuk chip. Satu radius untuk semuanya adalah tanda
  template.
- Permukaan gelap adalah keputusan naratif (momen transisi, permukaan
  diagnostik), bukan default. Di dalamnya, token teks dan focus ring ditukar
  per permukaan (`.surface-deep`, `.surface-depth`).
- Gradient hanya ketika sesuatu berpindah keadaan, dan hanya dalam keluarga
  teal dan netral selama ramp Burnt Orange dan Eerie Black belum ada di Figma.

## Kosakata status

Dipakai sama di landing dan, sebaiknya, di Console.

```txt
available     tersedia
building      sedang dibangun
testing       sedang diuji
next          berikutnya
direction     arah
unavailable   belum tersedia
```

Status tahap deployment: `selesai` · `sedang berjalan` · `menunggu` · `gagal`.
Status tidak pernah disampaikan lewat warna saja: selalu ada teks atau ikon.

Nama tahap deployment mengikuti Console Wave 1, ditulis natif per bahasa:
`Mengambil repository` · `Membaca proyek` · `Membangun image` ·
`Menjalankan container` · `Memeriksa kesehatan`.

## Artefak dan ilustrasi

Ilustrasi Sakala adalah artefak perangkat lunak: repository, log, alamat,
tahap deployment, health check — bukan ilustrasi awan, server isometrik, atau
foto stok. Setiap artefak diklasifikasikan salah satu dari:

```txt
actual              keadaan produk yang berjalan hari ini
design direction    ada dalam rancangan yang disetujui, belum tentu terbangun
conceptual          diagram untuk menjelaskan prinsip
```

Artefak `design direction` dan `conceptual` selalu berlabel. Tidak pernah
ada tangkapan layar UI masa depan yang tampil seolah produk sudah berjalan.

## Aksesibilitas

Lantai yang berlaku untuk semua antarmuka Sakala: WCAG 2.2 AA; navigasi
keyboard lengkap dengan focus ring terlihat di setiap permukaan; target
sentuh 44 px di perangkat sentuh dan minimal 24 px di mana pun; tidak ada
scroll horizontal pada 320 px; `prefers-reduced-motion` dihormati dan cerita
tetap utuh tanpa gerak maupun tanpa JavaScript.

## Yang belum ada

- Ramp penuh Burnt Orange dan Eerie Black di Figma. Hanya nilai anchor yang
  dipakai.
- Token untuk Console (density, tabel, form) belum diselaraskan dengan
  halaman ini; itu pekerjaan berikutnya bersama tim desain.
