---
title: "PRD: Sakala"
description: "PRD global versi 6.0: masalah yang diselesaikan, pasar pertama, pengguna utama, alternatif yang dibandingkan pengguna, kemampuan produk, asumsi, risiko, dan target metrik."
track: proyek
section: arah
order: 3
lang: id
canonical: true
---

# PRD: Sakala

> **Versi:** 6.0 · **Tanggal:** 1 Oktober 2026 · **Status:** PRD global
> **Menggantikan:** versi 5.0 (15 Agustus 2026)
> **Tagline:** _Manifesting Code into Reality._

Dokumen ini mendefinisikan Sakala sebagai produk secara utuh: masalah yang
diselesaikan, untuk siapa, melawan alternatif apa, dan kemampuan yang dimiliki
serta dituju. Batas pekerjaan engineering saat ini ada di [MVP](/docs/proyek/mvp),
urutan pengerjaan ada di [Roadmap](/docs/proyek/roadmap), dan alasan di balik
semuanya ada di [Filosofi](/docs/proyek/philosophy).

Versi 6.0 menambahkan hal yang belum ada di versi 5.0: pasar pertama, persona
utama, alternatif yang dibandingkan pengguna, model biaya, asumsi yang belum
divalidasi, risiko, dan target angka untuk metrik.

## 1. Masalah

Mahasiswa, peserta magang, dan developer pemula bisa menulis kode yang
berjalan di laptop. Yang sulit adalah langkah berikutnya: membuat kode itu
hidup di alamat yang bisa dibuka orang lain, lalu memahami apa yang terjadi
ketika ia gagal.

Hari ini, langkah itu biasanya diselesaikan dengan salah satu dari tiga cara,
dan ketiganya meninggalkan celah:

- **Tidak di-deploy sama sekali.** Tugas dikumpulkan sebagai file ZIP atau
  tautan repository. Dosen harus menjalankan setiap project di laptopnya
  sendiri, atau tidak menjalankannya sama sekali.
- **Free tier platform global** (Vercel, Render, Railway, dan sejenisnya).
  Cocok untuk frontend. Untuk backend seperti Laravel atau Express, batasnya
  lebih ketat atau berbayar. Pesan kegagalannya ditulis untuk developer
  berpengalaman, dan platformnya bisa mengubah atau menutup free tier kapan
  saja. Heroku menghapus free tier pada 2022 karena abuse.
- **VPS atau server kampus yang disiapkan manual.** Mahasiswa belajar banyak,
  tetapi sebagian besar waktunya habis untuk SSH, Nginx, SSL, dan proses
  manager, bukan untuk memahami bagaimana aplikasinya hidup.

Di sisi pengajar, alat untuk kelas pemrograman sedang berkurang. Replit
menutup produk pendidikannya pada 2024. GitHub Classroom dihentikan pada
28 Agustus 2026. Classroom memberi repository per mahasiswa, tetapi tidak
pernah memberi aplikasi yang hidup.

## 2. Pernyataan produk

> Sakala adalah platform deployment open-source untuk belajar mengirim
> software. Mahasiswa, peserta magang, dan komunitas membawa project dari
> repository menjadi aplikasi yang hidup. Pengajar dan mentor melihat source
> dan aplikasinya di satu tempat. Institusi bisa menjalankan Sakala di
> infrastrukturnya sendiri.

Nilai inti:

```text
Repository
→ Dibaca (analisis yang bisa diperiksa)
→ Dibangun
→ Dijalankan
→ Alamat publik
→ Dipahami ketika gagal
→ Diperbaiki
```

Perjalanan yang lebih luas, setelah karya hidup:

```text
Repository → Manifest → Operate → Learn → Share / Grow
```

Daftar pilar produk dan urutan prioritasnya dipegang [Visi](/docs/proyek/vision).

## 3. Pasar pertama

Sakala masuk lewat **pendidikan**: kelas pemrograman di kampus dan SMK,
workshop komunitas, serta program magang dan PKL.

Alasannya:

- **Cocok dengan filosofi.** Prinsip Terang (otomasi harus bisa dijelaskan)
  dan Belajar Melalui Wujud Nyata paling bernilai bagi orang yang sedang
  belajar.
- **Distribusi yang jelas.** Satu pengajar membawa 30 sampai 40 peserta. Satu
  program magang GMEDIA sudah tersedia sebagai pilot pertama.
- **Jawaban soal biaya.** Institusi bisa menjalankan runtime di server lab
  miliknya. Institusi juga butuh jaminan bahwa alatnya tidak hilang di tengah
  semester, dan open source memberi jaminan itu.

Yang sengaja tidak dikejar pada tahap ini: developer profesional yang butuh
frontend komersial berperforma global, tim yang butuh platform enterprise,
dan pengguna yang mencari hosting gratis tanpa konteks belajar.

Risiko pilihan ini ditulis di §12.

## 4. Pengguna

### 4.1 Persona utama

**Mahasiswa, siswa SMK, dan peserta magang.** Sudah bisa menulis aplikasi web
sederhana dan menyimpannya di GitHub. Belum pernah, atau jarang, men-deploy
backend sendiri.

Tujuan:

- tugas dan portfolio bisa dibuka dosen, mentor, dan perekrut dari satu URL;
- ketika deploy gagal, tahu di tahap mana dan kenapa;
- tidak perlu menguasai server sebelum karyanya hidup.

**Pengajar dan mentor.** Dosen, guru SMK, mentor magang, dan fasilitator
workshop.

Tujuan:

- melihat source dan aplikasi yang hidup untuk setiap peserta di satu tempat;
- tahu siapa yang sudah berhasil, siapa yang gagal, dan di tahap mana;
- tidak menyiapkan environment untuk setiap project.

### 4.2 Persona sekunder

**Developer pemula di luar institusi.** Ingin membawa project dari localhost
ke internet dan memahami prosesnya. Dilayani oleh produk yang sama, tetapi
kebutuhannya tidak mengarahkan prioritas.

**Pengelola lab dan tim IT institusi.** Menjalankan Sakala di server kampus
atau sekolah (self-host). Tujuannya: pemasangan yang bisa diulang, kuota yang
bisa diatur, dan data peserta yang tetap di infrastruktur institusi.

**Creator dan developer open-source.** Membagikan live demo dan membuat
template. Relevan setelah Explore berjalan (Horizon Explore di Roadmap).

### 4.3 Persona internal

**Maintainer dan operator platform.** Menjaga kesehatan platform, menangani
kegagalan dan abuse, dan membaca sinyal produk. Kebutuhannya dijabarkan di
[Platform Operations](/docs/proyek/platform-operations).

### 4.4 Yang tidak dilayani

Tim kecil yang butuh workspace, domain kustom, dan layanan data lengkap
tetap menjadi arah jangka panjang (pilar Collaborate dan Operate), tetapi
bukan dasar keputusan prioritas saat ini.

## 5. Alternatif yang dibandingkan pengguna

Pengguna tidak membandingkan Sakala dengan "menyiapkan server manual". Mereka
membandingkannya dengan pilihan yang sudah mereka tahu.

| Alternatif                        | Yang dicari pengguna di sana           | Posisi Sakala                                                                                     |
| --------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Vercel, Netlify (free tier)       | Frontend gratis dan cepat              | Tidak bersaing di frontend statis. Sakala unggul untuk backend dan untuk penjelasan kegagalan.    |
| Render, Railway (free tier/trial) | Backend dengan sedikit konfigurasi     | Kuota yang bisa ditebak, bahasa Indonesia, penjelasan per tahap, dan bisa di-self-host institusi. |
| VPS atau server lab kampus        | Kontrol penuh, belajar server          | Sakala berjalan di server yang sama, tanpa membuat setiap peserta mengelola server.               |
| Coolify, Dokploy (self-host PaaS) | PaaS untuk developer yang punya server | Sakala menambahkan konteks kelas: peserta, penugasan, tinjauan, dan penjelasan untuk pemula.      |
| Codio dan platform kelas berbayar | Pengganti GitHub Classroom             | Sakala fokus ke aplikasi yang hidup, bukan IDE atau penilaian. Open source dan bisa di-self-host. |

Sakala tidak perlu menang di setiap baris. Sakala perlu menjadi pilihan yang
jelas untuk satu situasi: **kelas yang ingin setiap peserta punya aplikasi
yang hidup dan bisa dijelaskan.**

## 6. Tata kelola dan posisi organisasi

```text
Sakala = project open-source yang diinisiasi dan dikelola Sakala Maintainers
GMEDIA = founding sponsor dan infrastructure supporter
```

Hindari framing "Sakala by GMEDIA", "produk GMEDIA", atau "platform tertutup
milik GMEDIA". Detailnya di [Governance](/docs/proyek/governance).

## 7. Model penyediaan yang dituju

Sakala dituju tersedia dalam dua bentuk yang memakai kode yang sama. Hari ini
baru bentuk hosted yang sedang dibangun; self-host masih berstatus arah
(§9.7).

**Sakala hosted.** Runtime disediakan oleh infrastruktur GMEDIA. Setiap
pengguna mendapat kuota pilot yang tertulis dan ditegakkan (§9.2). Kapasitas
di atas kuota **dapat** ditawarkan GMEDIA sebagai layanan cloud berbayar,
tergantung keputusan bisnis GMEDIA. Bila ditawarkan, pembayaran itu adalah
hubungan antara pengguna dan GMEDIA sebagai penyedia infrastruktur, bukan
penjualan lisensi Sakala.

**Sakala self-host.** Institusi atau individu menjalankan Sakala di server
miliknya, dengan kuota yang diatur sendiri. Tidak ada fitur yang dikunci di
balik lisensi berbayar.

Yang diputuskan project Sakala adalah prinsip di bawah. Apakah dan bagaimana
GMEDIA menjual kapasitas adalah keputusan GMEDIA, dan menjadi dependensi,
bukan bagian dari keputusan ini.

Prinsip yang mengikat keduanya:

- kode Sakala tetap berlisensi Apache 2.0 seluruhnya;
- tidak ada fitur inti yang hanya tersedia di versi hosted;
- batas kuota hosted selalu tertulis di situs, bisa ditebak, dan tidak diubah
  diam-diam;
- bila GMEDIA menjual kapasitas, harganya tidak mengubah roadmap atau lisensi
  Sakala (lihat batas peran sponsor di Governance).

## 8. Prinsip produk

Prinsip kanonik ada di [Filosofi](/docs/proyek/philosophy): Wujud, Purna,
Sederhana, Terang, Tumbuh, Berbagi, Manusia.

Turunannya untuk keputusan produk:

- sederhana secara default, transparan ketika dibutuhkan;
- tidak ada otomasi yang tidak bisa dijelaskan;
- nilai dulu, seremoni infrastruktur belakangan;
- desain boleh mendahului engineering, tetapi desain siap bukan komitmen
  engineering;
- validasi sebelum memperbesar skala;
- hasil pengguna lebih penting daripada kecanggihan infrastruktur.

## 9. Kemampuan produk

Status setiap kemampuan memakai kosakata tetap:

```text
berjalan        ada di kode dan dipakai di production atau staging
dibangun        sedang dikerjakan
dirancang       desain siap, belum ada komitmen engineering
arah            tercatat sebagai tujuan, belum dirancang
```

### 9.1 Create — dari mana project dimulai

| Kemampuan                                                       | Status                     |
| --------------------------------------------------------------- | -------------------------- |
| Repository GitHub publik                                        | berjalan                   |
| Repository GitHub privat lewat GitHub App, token berumur pendek | dibangun (ada di kode API) |
| URL Git publik di luar GitHub                                   | dirancang                  |
| Template sebagai titik awal                                     | arah                       |
| Tombol "Deploy to Sakala"                                       | arah                       |

### 9.2 Manifest — dari source menjadi aplikasi yang hidup

**Analisis repository.** Sakala membaca repository, mendeteksi Dockerfile atau
memakai Railpack, menebak perintah build dan start serta port, lalu menampilkan
hasilnya untuk diperiksa dan diubah sebelum build. Status: berjalan.

**Builder.** Urutan prioritasnya tetap ([ADR-008](/docs/proyek/adr)):

```text
1. Dockerfile milik pengguna
2. Railpack
3. Konfigurasi manual
```

**Deployment.** Satu deployment adalah satu percobaan mewujudkan satu revisi
source. Tahapnya bernama dan terlihat oleh pengguna. Daftar state kanonik
dipegang [Glosarium](/docs/proyek/glossary). Status: berjalan.

**Kuota pilot hosted** (nilai default, diatur di konfigurasi API):

| Batas                         | Nilai                         |
| ----------------------------- | ----------------------------- |
| Project per pengguna          | 3                             |
| Deployment aktif per pengguna | 2                             |
| Deployment aktif per project  | 1                             |
| Memori per container          | 256 MB default, maks 512 MB   |
| CPU per container             | 0,5 core default, maks 1 core |
| Jumlah proses per container   | 128 default, maks 256         |
| Waktu build                   | 10 menit                      |
| Waktu start sampai sehat      | 2 menit                       |
| Waktu total satu perintah     | 15 menit                      |
| Retensi log deployment        | 7 hari                        |

Institusi yang self-host mengatur nilai ini sendiri.

**Jenis workload.** Saat ini hanya Web Service. Worker, cron, dan situs statis
adalah arah.

**Yang belum ada dan dibutuhkan sebelum kuota bisa dianggap cukup:** sleep
otomatis untuk project yang tidak menerima trafik (saat ini sleep hanya
dipakai ketika admin men-suspend project), dan batas jumlah build per jam.

### 9.3 Operate — menjaga aplikasi tetap hidup

| Kemampuan                                                   | Status    |
| ----------------------------------------------------------- | --------- |
| Variabel dan secret terenkripsi, di-redaksi dari log        | berjalan  |
| Domain bawaan `<slug>.run.sakala.dev`                       | berjalan  |
| Log build dan log runtime, dengan batas ukuran              | berjalan  |
| Health check saat deploy                                    | berjalan  |
| Redeploy tanpa mematikan versi lama sebelum yang baru sehat | berjalan  |
| Custom domain dengan verifikasi DNS dan TLS                 | dirancang |
| Metrik dasar (CPU, memori, restart)                         | arah      |
| Auto-deploy dari push (webhook GitHub)                      | dibangun  |
| PostgreSQL, Redis, object storage terkelola                 | arah      |

### 9.4 Learn — belajar mengirim software

Sakala Learn **bukan LMS**. Sakala tidak mengelola materi, presensi, kuis,
ujian, atau nilai akhir. Sakala mengelola:

```text
Penugasan → Source → Deploy → Aplikasi hidup → Pengumpulan → Tinjauan
```

Kemampuan minimal yang dituju lebih dulu:

- kelas dengan pengajar dan peserta, peserta dimasukkan lewat CSV;
- penugasan dengan template awal opsional dan tenggat;
- ringkasan kelas: berapa yang sehat, gagal build, sedang berjalan, belum
  mulai;
- satu tampilan per peserta: repository, URL, deployment terakhir, log.

Status: arah, dengan prioritas tertinggi setelah MVP. Detail di
[Sakala Learn](/docs/proyek/feature-education).

### 9.5 Explore — karya yang dilihat, dipelajari, dan dilanjutkan

Showcase, template, profil creator, koleksi, dan silsilah project. Explore
dimulai dari koleksi yang dikurasi maintainer (misalnya hasil satu angkatan
magang), bukan unggahan publik terbuka, karena biaya moderasinya tinggi.
Status: dirancang sebagian. Detail di [Sakala Explore](/docs/proyek/feature-explore).

### 9.6 Collaborate — dikelola bersama

Workspace, anggota, peran (Owner, Maintainer, Developer, Viewer), undangan,
dan pemindahan kepemilikan project. Status: arah. Bagian yang dibutuhkan
Learn (pengajar dan peserta) dibangun lebih dulu di dalam Learn.

### 9.7 Platform — untuk pengguna tingkat lanjut dan institusi

| Kemampuan                                      | Status                 |
| ---------------------------------------------- | ---------------------- |
| Instalasi self-host satu node                  | arah, prioritas tinggi |
| CLI pengguna (`sakala deploy`, `logs`, `open`) | arah                   |
| API publik dan token berlingkup                | arah                   |
| Multi-node dan gateway terpisah                | arah                   |

### 9.8 Operasi platform

Maintainer bisa men-stop dan men-suspend project, melihat node runtime,
kegagalan per kategori, sinyal pemakaian, dan masukan pengguna. Status:
berjalan sebagian. Detail di [Platform Operations](/docs/proyek/platform-operations).

## 10. Identitas dan akun

- Login dengan GitHub OAuth dan email dengan verifikasi. Status: dibangun.
  Di production masih ada masalah kredensial autentikasi, sehingga pendaftaran
  belum dibuka.
- Sesi Console memakai cookie Sanctum, bukan JWT ([ADR-003](/docs/proyek/adr)).
- Onboarding menanyakan profil pengguna. Pilihan saat ini adalah developer,
  devops, architect, dan lainnya. Untuk pasar pertama, pilihan mahasiswa atau
  peserta magang dan pengajar atau mentor perlu ditambahkan, supaya langkah
  awal dan metrik bisa dibedakan per persona.

## 11. Kebutuhan non-fungsional

### Keamanan

- API tidak pernah mengakses Docker socket ([ADR-004](/docs/proyek/adr)).
- Kode pengguna diperlakukan sebagai kode yang tidak dipercaya. Isolasi
  workload diatur di [ADR-014](/docs/proyek/adr).
- Secret terenkripsi saat disimpan dan di-redaksi dari log.
- Kredensial repository berumur pendek.
- Detail di [Security](/docs/proyek/security).

### Keandalan

- Deployment baru tidak menggantikan versi lama sebelum sehat.
- Perintah ke agent idempoten dan punya lease, sehingga agent yang mati di
  tengah jalan tidak meninggalkan state yang menggantung.
- Rilis production di-pin per digest image; rollback adalah revert satu
  commit.

### Hukum dan privasi

Sakala hosted memproses data pribadi (nama, email, akun GitHub) orang di
Indonesia, sehingga tunduk pada UU PDP yang berlaku penuh sejak
17 Oktober 2024. Sebelum pendaftaran dibuka untuk umum, Sakala hosted wajib
punya syarat layanan, kebijakan penggunaan yang wajar, dan pemberitahuan
privasi yang terbit di situs, serta jalur pelaporan abuse yang dipantau.

### Aksesibilitas

WCAG 2.2 AA untuk Console dan situs: navigasi keyboard, fokus terlihat,
kontras cukup, status tidak hanya disampaikan lewat warna, dan pesan error
yang menjelaskan cara memperbaikinya. Token dan aturannya ada di
[Sistem Desain](/docs/teknis/sistem-desain).

### Keterpeliharaan

Batas repository eksplisit, kontrak API terdokumentasi (OpenAPI), keputusan
arsitektur dicatat sebagai ADR, dan dokumentasi diperbarui bersama perubahan
perilaku.

## 12. Asumsi dan risiko

### Asumsi yang belum divalidasi

Setiap asumsi di bawah menentukan satu keputusan besar. Belum ada yang
dibuktikan dengan data pengguna.

| Asumsi                                                                       | Cara membuktikannya                                                         |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Pengajar mau mewajibkan tugas yang di-deploy, bukan hanya repository         | Wawancara lima pengajar; satu kelas pilot yang memakai Sakala satu semester |
| Institusi mau dan mampu menjalankan satu server untuk kelasnya               | Wawancara dua pengelola lab; satu pemasangan self-host percobaan            |
| Kuota pilot (§9.2) cukup untuk tugas kuliah umum (Laravel, Express, Next.js) | Jalankan 20 sampai 30 project contoh selama dua minggu dan catat pemakaian  |
| Penjelasan kegagalan per tahap mengurangi pertanyaan ke pengajar             | Bandingkan jumlah pertanyaan di kelas pilot dengan semester sebelumnya      |
| Mahasiswa kembali memakai Sakala untuk project kedua tanpa disuruh           | Ukur tingkat project kedua (§13)                                            |

### Risiko

| Risiko                                                                       | Dampak                                         | Mitigasi                                                                                                                            |
| ---------------------------------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Subdomain `*.run.sakala.dev` dipakai untuk phishing atau malware             | Reputasi domain rusak, domain diblokir browser | Kebijakan penggunaan, jalur lapor abuse, suspend oleh admin, pertimbangkan domain terpisah dari merek ([ADR-016](/docs/proyek/adr)) |
| Container escape dari kode pengguna                                          | Akses ke control plane dan data pengguna lain  | [ADR-014](/docs/proyek/adr): host runtime terpisah, runtime tersandbox                                                              |
| Biaya runtime hosted melebihi kapasitas sponsor                              | Layanan hosted harus dibatasi mendadak         | Kuota tertulis, sleep otomatis, self-host sebagai jalur utama institusi                                                             |
| Institusi pendidikan lambat mengambil keputusan dan pemakaian musiman        | Adopsi lambat, beban tidak merata              | Pilot pertama di program yang dikendalikan sendiri (magang GMEDIA), bukan kerja sama resmi                                          |
| Tim inti kecil dan sebagian adalah peserta magang dengan masa kerja terbatas | Pengetahuan hilang saat angkatan berganti      | Dokumentasi kanonik, ADR, dan kontribusi publik; jalur menjadi maintainer di Governance                                             |
| Platform besar menambahkan fitur kelas yang serupa                           | Diferensiasi berkurang                         | Tetap unggul di self-host, bahasa Indonesia, dan penjelasan kegagalan                                                               |

## 13. Metrik keberhasilan

Target berlaku untuk pilot hosted. Angka ini adalah titik awal yang disepakati
tim, bukan hasil pengukuran, dan diperbarui setelah pilot pertama.

| Metrik                                                       | Target pilot         |
| ------------------------------------------------------------ | -------------------- |
| Median waktu dari login pertama sampai URL publik pertama    | kurang dari 15 menit |
| Persentase deployment pertama yang berhasil tanpa bantuan    | minimal 60 persen    |
| Persentase pengguna yang pulih dari deploy gagal sendiri     | minimal 50 persen    |
| Persentase pengguna yang membuat project kedua dalam 30 hari | minimal 30 persen    |
| Waktu dari laporan abuse sampai project di-suspend           | kurang dari 24 jam   |

Metrik Learn, setelah kelas pertama berjalan:

- persentase peserta dengan aplikasi sehat sebelum tenggat;
- jumlah pertanyaan teknis ke pengajar per peserta;
- persentase pengajar yang memakai Sakala lagi di semester berikutnya.

Hindari metrik yang tidak mendorong keputusan, seperti jumlah pengikut atau
jumlah bintang di showcase.

## 14. Batas eksplisit

Sakala tidak berusaha menjadi LMS, domain registrar, jejaring sosial,
suite observability lengkap, cloud hyperscale, antarmuka Kubernetes, atau
panel VPS generik. Sakala boleh berintegrasi dengan domain-domain itu hanya
bila mendukung perjalanan intinya.

## 15. Desain dan engineering dipisahkan

```text
Desain:      Belum dimulai · Sedang didesain · Desain siap · Tervalidasi
Engineering: Backlog · Siap · Dikerjakan · Review · Berjalan · Ditunda
```

Desain siap tidak sama dengan komitmen engineering. UI/UX boleh mendahului
engineering; urutan engineering mengikuti [Roadmap](/docs/proyek/roadmap).

## Riwayat perubahan

| Versi | Tanggal         | Perubahan utama                                                                                                                               |
| ----- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 6.0   | 1 Oktober 2026  | Pasar pertama pendidikan, persona utama, alternatif, model hosted dan self-host, kuota pilot, asumsi, risiko, target metrik, status kemampuan |
| 5.0   | 15 Agustus 2026 | PRD global pertama yang dipisahkan dari MVP                                                                                                   |
