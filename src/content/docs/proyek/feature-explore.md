---
title: "Sakala Explore"
description: "Showcase, template, profil creator, koleksi, dan silsilah project sebagai pilar produk, bukan jejaring sosial. Dimulai dari koleksi terkurasi, dengan model moderasi yang realistis untuk tim kecil."
track: proyek
section: rencana
order: 12
lang: id
canonical: true
---

# Sakala Explore

> **Pilar:** Explore dan ekosistem
> **Posisi:** pembeda Sakala, dimulai setelah Learn dan self-host ([Roadmap Horizon E](/docs/proyek/roadmap))

## 1. Kenapa Explore ada

Deployment menjawab:

> Bagaimana kodeku menjadi aplikasi yang hidup?

Explore menjawab:

> Apa yang terjadi setelah sebuah karya menjadi nyata?

Explore membuat project bisa dilihat, diberi attribution ke pembuatnya,
menginspirasi orang lain, menjadi template, masuk koleksi, dan tetap hidup
setelah kelas atau magang selesai.

## 2. Pelajaran dari platform lain

**Glitch** adalah platform yang paling mirip visi Explore: komunitas, remix,
dan karya yang saling melahirkan. Pada Mei 2025 Glitch mengumumkan bahwa
hosting project dan profil pengguna berhenti pada 8 Juli 2025, dengan alasan
biaya operasional dan penyalahgunaan. Fitur komunitas terbuka menambah nilai,
tetapi juga menambah biaya moderasi dan permukaan abuse.

**Railway** membayar pembuat template 25 persen dari pemakaian yang berasal
dari template mereka, dan sudah membayar hampir $1 juta. Template yang bagus
lahir dari insentif yang jelas.

Dua pelajaran itu menentukan urutan Explore di Sakala: mulai dari koleksi yang
dikurasi, beri insentif yang sesuai konteks Sakala, dan buka unggahan publik
hanya setelah moderasi terbukti sanggup.

## 3. Tahapan

| Tahap | Isi                                                                                              | Siapa yang mengisi            |
| ----- | ------------------------------------------------------------------------------------------------ | ----------------------------- |
| 1     | **Koleksi terkurasi**: hasil satu angkatan magang atau satu kelas, template resmi Sakala         | Maintainer dan pengajar       |
| 2     | **Showcase atas izin**: pemilik project memilih menampilkan project-nya; ditinjau sebelum tampil | Pengguna, ditinjau maintainer |
| 3     | **Template komunitas**: pengguna mengajukan project sebagai template; ditinjau dan diverifikasi  | Pengguna, ditinjau maintainer |
| 4     | **Silsilah dan remix**: project yang lahir dari template atau project lain                       | Otomatis dari metadata        |

Tahap berikutnya dibuka hanya bila tahap sebelumnya bisa dimoderasi dalam
target waktu di [Platform Operations](/docs/proyek/platform-operations).

## 4. Arsitektur informasi

```text
Explore
├── Project
├── Template
├── Creator
└── Koleksi
```

Kandidat route publik: `/explore`, `/projects`, `/templates`, `/@username`,
`/collections/:slug`. Skema URL final adalah keputusan desain dan SEO.

## 5. Showcase project

Tampil di Explore hanya atas pilihan pemilik:

```text
Tidak terdaftar (default) · Showcase publik
```

URL runtime yang publik tidak otomatis membuat project bisa ditemukan di
Explore.

Metadata showcase: judul, deskripsi, creator, gambar sampul, kategori, tag,
stack, URL aplikasi, URL source, lisensi, koleksi, waktu deploy, dan relasi
template.

Aksi: buka aplikasi, lihat source, dan (bersyarat) pakai sebagai titik awal.

## 6. Profil creator

Profil creator berorientasi portfolio, bukan jejaring sosial. Menampilkan
nama, avatar, bio atau peran opsional, project publik, template, karya
unggulan, dan koleksi.

Yang sengaja tidak dijadikan inti: jumlah pengikut, pesan langsung, feed
umum, dan grafik sosial ([ADR-011](/docs/proyek/adr)). Identitas creator
dibangun dari karyanya.

## 7. Template

Kategori: resmi, komunitas, pendidikan, organisasi, starter, aplikasi, contoh.

Metadata: judul, deskripsi, pembuat, organisasi atau koleksi, repository,
demo, stack, kategori, tag, tingkat kesulitan, variabel dan layanan yang
dibutuhkan, petunjuk resource, lisensi, status verifikasi, gambar sampul.

Dua aksi yang harus jelas bedanya di UX:

```text
Deploy:        Template → Konfigurasi → Buat project → Deploy
Pakai template: Template → Buat atau fork repository → Ubah source → Hubungkan dan deploy nanti
```

### Siklus hidup template

```text
Project → Ajukan sebagai template → Pemeriksaan otomatis
→ Tinjauan maintainer → Perlu perubahan / Disetujui → Terbit → (opsional) Unggulan
```

Pemeriksaan otomatis: repository bisa diakses, lisensi dan README ada, bisa
di-deploy, variabel yang dibutuhkan dideklarasikan, tidak ada secret, demo
sehat, attribution valid.

### Insentif

Sakala belum menjual kapasitas sendiri, jadi insentifnya bukan uang. Yang
bisa diberikan:

- attribution yang terlihat di setiap project turunan;
- status template resmi atau terverifikasi;
- pengakuan institusi, misalnya template resmi program magang atau mata
  kuliah;
- jumlah project yang lahir dari template, ditampilkan di profil creator.

Bila kelak GMEDIA menjual kapasitas cloud, bagi hasil untuk pembuat template
bisa dipertimbangkan, sebagai keputusan GMEDIA sebagai penyedia
infrastruktur ([Governance §5](/docs/proyek/governance)).

## 8. Koleksi

Koleksi adalah primitif organisasi yang bisa dipakai ulang, supaya fitur
"magang" atau "showcase kampus" tidak di-hardcode ke platform.

Contoh: Sakala Official Starters, Magang GMEDIA, Showcase PKL SMK, Workshop
Web kampus, Community Picks.

Isi koleksi: judul, slug, pemilik atau organisasi, deskripsi, sampul,
visibilitas, project, template, creator, dan metadata program opsional.

## 9. Silsilah project

Metadata:

```text
derived_from_template
remixed_from_project
```

Contoh UX: "Berdasarkan Laravel API Starter". Tujuannya satu kalimat dari
filosofi Sakala: karya melahirkan karya.

## 10. Loop magang dan PKL

```text
Penugasan magang → Template awal → Project peserta → Deploy
→ Tinjauan mentor → Koleksi program → Kandidat template → Angkatan berikutnya
```

Karya peserta magang punya kehidupan setelah hari presentasi.

## 11. Moderasi

Maintainer membutuhkan: template yang menunggu, perlu perubahan,
disetujui atau ditolak, project yang dilaporkan, kandidat unggulan, tinjauan
koleksi, serta masalah abuse, hak cipta, atau lisensi.

Creator membutuhkan: status pengajuan, masukan, ubah dan ajukan ulang, serta
menarik project dari daftar.

Setiap keputusan meninggalkan jejak audit. Konten yang dilaporkan sebagai
abuse ditangani lewat alur di [Platform Operations §6](/docs/proyek/platform-operations),
bukan antrean moderasi Explore.

## 12. Metrik

Berguna: project yang terbit, template yang terbit, jumlah deploy dari
template, project turunan template, creator yang menerbitkan, partisipasi
koleksi, dan waktu tinjauan moderasi.

Hindari menjadikan metrik sosial yang semu sebagai tujuan produk.

## 13. Lingkup desain berikutnya

Mengikuti tahapan di §3, desain dimulai dari:

```text
Halaman koleksi · Detail project dalam koleksi · Profil creator (portfolio)
```

Lalu, bila tahap 2 dan 3 dibuka: publikasi project, pengajuan template,
status moderasi, daftar dan detail template, beranda Explore.
