---
title: "Sakala Learn"
description: "Pasar pertama Sakala: kelas, penugasan, dan magang yang dibangun dari primitif umum. Bukan LMS. Termasuk roster, integrasi LMS, siklus hidup project, data peserta, dan rencana pilot."
track: proyek
section: rencana
order: 11
lang: id
canonical: true
---

# Sakala Learn

> **Status:** pilar prioritas setelah MVP ([Roadmap Horizon B](/docs/proyek/roadmap))
> **Prinsip:** belajar deployment, bukan LMS

## 1. Tesis

Pendidikan pemrograman sering berhenti di source code. Tugas dikumpulkan
sebagai repository atau file ZIP, lalu dinilai tanpa pernah dijalankan.

Sakala Learn fokus pada langkah berikutnya:

```text
Source → Deployment → Aplikasi hidup → Tinjauan
```

Seorang peserta harus bisa berkata:

```text
Ini source-ku.
Ini aplikasiku yang berjalan.
```

## 2. Kenapa sekarang

Dua alat kelas pemrograman yang banyak dipakai sudah berhenti. Replit menutup
Teams for Education pada 1 Agustus 2024. GitHub Classroom dihentikan pada
28 Agustus 2026, setelah dipakai 3,73 juta siswa dan pengajar di lebih dari
305.000 kelas. Classroom memberi repository per peserta dan autograding
lewat GitHub Actions, tetapi tidak pernah memberi aplikasi yang hidup.

Hipotesisnya, sebagian pengajar yang dulu memakainya sedang mencari
pengganti, termasuk di Indonesia. Ini belum divalidasi: belum diketahui berapa
yang sudah memilih alternatif dan berapa yang masih mencari (lihat asumsi di
[PRD §12](/docs/proyek/prd)). Bila hipotesis itu benar, Sakala bisa mengisi
bagian yang belum diisi pengganti yang ada: setiap peserta punya aplikasi yang
hidup, dan pengajar bisa melihat kenapa aplikasi itu gagal.

Pelajaran dari kedua penutupan itu juga mengikat desain Learn: institusi butuh
jaminan bahwa alatnya tidak hilang di tengah semester. Karena itu Learn
berjalan sama di Sakala hosted dan self-host ([ADR-017](/docs/proyek/adr)).

## 3. Batas

Sakala tidak mengelola presensi, kurikulum, materi kuliah, kuis, ujian, nilai
akhir, dan administrasi mahasiswa. Semua itu milik LMS dan sistem informasi
akademik.

Sakala mengelola:

```text
Penugasan → Source → Deploy → Aplikasi hidup → Pengumpulan → Tinjauan teknis
```

Autograding bukan fokus awal. Pengajar yang membutuhkan test otomatis tetap
bisa memakai GitHub Actions di repository peserta; Sakala menampilkan
hasilnya bila ada, bukan menggantikannya.

## 4. Objek inti

```text
Workspace (institusi atau program)
└── Kelas
    ├── Pengajar dan mentor
    ├── Peserta
    ├── Penugasan
    └── Project dan pengumpulan
```

Penugasan memuat: judul, deskripsi, template awal opsional, syarat repository,
kebijakan resource, layanan yang dibutuhkan, tenggat, syarat deployment
(misalnya "harus sehat sebelum tenggat"), dan izin masuk koleksi.

## 5. Alur peserta

```text
Bergabung lewat tautan kelas → Buka penugasan
→ Pakai template atau hubungkan repository → Kembangkan → Deploy
→ Perbaiki kegagalan → Kumpulkan → (opsional) Masuk koleksi
```

## 6. Alur pengajar

```text
Buat kelas → Masukkan peserta → Buat penugasan → Pilih template
→ Pantau status deployment → Buka source → Buka aplikasi → Tinjau
```

Contoh ringkasan kelas:

```text
24 peserta

18 sehat
 3 gagal build
 2 sedang berjalan
 1 belum mulai
```

Dari ringkasan, pengajar bisa langsung melihat kategori kegagalan
terbanyak. Bila delapan peserta gagal di tahap yang sama, itu tanda materinya
perlu diulang, bukan delapan masalah terpisah.

## 7. Memasukkan peserta

Urutan yang dituju:

1. **Tautan undangan kelas.** Peserta masuk dengan akun Sakala biasa.
2. **Unggah CSV** berisi nama, email, dan NIM atau nomor peserta. Peserta yang
   belum punya akun menerima undangan.
3. **Integrasi LMS lewat LTI 1.3**, untuk institusi yang memakai Moodle atau
   LMS lain. Ini arah, bukan kebutuhan awal.

Sakala tidak menyinkronkan data akademik lain dari LMS.

## 8. Kebijakan resource

Kelas mendefinisikan batasnya sendiri, di atas mekanisme kuota yang sama
dengan pengguna biasa ([ADR-015](/docs/proyek/adr)):

```text
CPU · Memori · Jumlah project per peserta · Layanan yang diizinkan
Masa berlaku · Kebijakan selalu hidup atau boleh tidur
```

Batas yang jelas membuat infrastruktur bisa diprediksi dan mengajarkan
batasan yang realistis.

## 9. Siklus hidup setelah kelas selesai

Pertanyaan yang harus dijawab sebelum kelas pertama: apa yang terjadi pada
30 aplikasi setelah semester berakhir?

| Tahap                     | Yang terjadi                                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| Selama kelas              | Project berjalan dengan kebijakan resource kelas                                                |
| Setelah tenggat           | Pengajar bisa mengunci project sebagai versi yang dikumpulkan                                   |
| Kelas diarsipkan          | Project tidur dan tetap bisa dibangunkan untuk ditinjau, selama masa arsip yang diatur pengajar |
| Peserta ingin melanjutkan | Project dipindahkan ke akun pribadi peserta dan mengikuti kuota pribadinya                      |
| Masa arsip habis          | Project dihentikan; source tetap di repository peserta, konfigurasi bisa diekspor               |

Prinsipnya sama dengan filosofi Berbagi: karya tidak harus berakhir ketika
tugasnya selesai. Peserta memutuskan apakah karyanya berlanjut.

## 10. Data peserta

Siapa yang menjadi pengendali dan siapa yang menjadi prosesor data kelas
menurut UU PDP belum ditetapkan di dokumen ini. Hubungannya bisa campuran:
untuk sebagian data Sakala hosted mungkin memproses atas instruksi institusi,
sedangkan untuk akun, keamanan, penanganan abuse, dan operasi, Sakala punya
tujuan pemrosesan sendiri. Pembagiannya ditetapkan dalam perjanjian kelas dan
Pemberitahuan Privasi setelah legal review.

Yang sudah menjadi prinsip produk, apa pun hasil pembagian itu:

- data yang dikumpulkan terbatas pada yang dipakai: nama, email, nomor
  peserta, akun GitHub, dan project;
- pengajar hanya melihat data peserta di kelasnya;
- nilai atau penilaian tidak disimpan di Sakala;
- peserta bisa melihat data apa yang dilihat pengajarnya;
- kelas yang diarsipkan mengikuti masa simpan yang tertulis, lalu data
  kelasnya dihapus.

Institusi yang ingin data peserta tidak keluar dari infrastrukturnya memakai
self-host.

## 11. Magang dan PKL

Tidak ada "mesin magang" yang dibuat khusus. Magang disusun dari primitif
umum:

```text
Workspace + Kelas + Template + Penugasan + Koleksi
```

Contoh: program magang GMEDIA. Keluarannya: aplikasi yang hidup, source,
attribution creator, koleksi program, status unggulan opsional, dan kandidat
template untuk angkatan berikutnya.

## 12. Rencana pilot

Pilot pertama berjalan di program yang dikendalikan sendiri sebelum kerja sama
resmi dengan institusi, karena institusi pendidikan lambat mengambil keputusan
dan pemakaiannya musiman.

1. **Program magang GMEDIA** — satu angkatan, satu kelas, dua sampai tiga
   penugasan.
2. **Satu sampai dua dosen yang sudah dikenal** — satu mata kuliah
   pemrograman web, satu semester.
3. **Satu institusi self-host** — setelah installer satu node tersedia.

Yang diukur, selain metrik di [PRD §13](/docs/proyek/prd):

- persentase peserta dengan aplikasi sehat sebelum tenggat;
- jumlah pertanyaan teknis ke pengajar per peserta, dibandingkan kelas
  sebelumnya;
- apakah pengajar mau memakai Sakala lagi di semester berikutnya.

## 13. Kenapa ini penting

Sakala menjadi jembatan antara:

```text
belajar menulis kode
```

dan:

```text
belajar mengirim software
```

Itu nilai pendidikan yang khas, tanpa menjadikan Sakala sebuah LMS.
