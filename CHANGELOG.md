# Changelog

Semua perubahan penting pada repository `sakala-landing` dicatat di file ini.

Format mengikuti [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) dan
nomor versi mengikuti [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Setiap tag `vX.Y.Z` adalah satu rilis: workflow release membangun image dari
tag itu. Changelog di situs (`/changelog`) adalah catatan perkembangan project
untuk publik dan tidak memakai nomor versi ini.

Cara merilis:

1. Pindahkan isi `[Unreleased]` ke bagian versi baru beserta tanggalnya.
2. Naikkan `version` di `package.json` ke versi yang sama.
3. Merge ke `main`, lalu buat tag `vX.Y.Z` pada commit merge itu.

Setelah image terbit, tag yang sama juga membuat GitHub Release dari bagian
versinya di file ini.

## [Unreleased]

## [0.3.11] - 2026-11-23

### Changed

- Pemberitahuan Privasi `privasi-v2`, berlaku mulai 30 November 2026:
  bagian baru **Database terkelola**, backup database terkelola dan salinan
  backup di server kedua, database saat proyek atau akun dihapus, daftar
  email yang lengkap (undangan workspace dan email notifikasi proyek),
  pembatasan egress yang sudah aktif di production, serta
  **Riwayat versi** yang menautkan teks terakhir `privasi-v1`. Entri
  changelog situs (id dan en) mengumumkannya.
- Tanggal berlaku dokumen hukum kini per dokumen, di frontmatter
  `effectiveDate`, menggantikan `legalEffectiveDate` yang berlaku untuk
  ketiganya. Label halaman menjadi **Berlaku mulai** (**In effect from**),
  karena versi baru terbit sebelum tanggal berlakunya.
- Deploy Pertamamu (id dan en) mengikuti wizard Console v0.11.0: layar
  **Selamat datang di Sakala**, tahap Repository, Konfigurasi, dan Deploy,
  tab **URL GitHub publik** dan contoh siap pakai, **Pengaturan lanjutan**,
  tombol **Buat dan deploy** dan **Buat tanpa deploy** (menggantikan **Buat
  Proyek** dan **Lewati**), tahap Persiapan dengan saran variabel dan kartu
  database, layar **sudah live** dengan **Bagikan** dan **Kode QR**, serta
  tombol gagal **Lihat error di log** dan **Salin ringkasan error**.
- Database Terkelola (id dan en) menjelaskan cara meminta kuota database:
  diskusi baru di GitHub Discussions kategori Q&A di `gmedia/sakala`, yang
  diberikan admin lewat profil batas.

### Added

- Halaman panduan "Penyimpanan File" (id dan en) di `/docs/penyimpanan-file`:
  berkas di dalam container hilang begitu container berhenti (tidur,
  **Restart**, crash, deploy, rollback) karena gVisor, replika punya
  filesystem sendiri, object storage S3-compatible di provider luar sebagai
  gantinya, variabel `AWS_*` sebagai secret, contoh Laravel
  (`league/flysystem-aws-s3-v3`, `temporaryUrl`) dan Node
  (`@aws-sdk/client-s3`, presigned URL) yang sudah dicoba terhadap Garage dan
  RustFS lokal, serta catatan SQLite. Hub docs dan Menghubungkan Database
  Eksternal menautkannya.
- ADR-021 "Managed Object Storage for Projects" (Proposed): RustFS sebagai
  engine (Garage, MinIO Community, SeaweedFS, Ceph RGW, dan volume per proyek
  dicatat sebagai alternatif), bucket milik workspace dengan kuota di profil
  batas, satu access key per bucket, endpoint `s3.sakala.app` path-style
  dengan bucket privat dan presigned URL, pilot di runtime node, serta
  pertanyaan terbuka (kuota bucket di versi yang di-pin, bucket publik,
  backup). PRD menautkannya.
- Halaman panduan "Variabel dan Secret" (id dan en) di `/docs/variabel-dan-secret`,
  yang sebelumnya dialihkan ke hub: cara mengisi variabel saat membuat proyek
  dan di tab Variabel, saran dari `.env.example` di tahap Persiapan, secret
  dan audit saat nilainya ditampilkan, variabel waktu-build dan runtime
  (situs statis dan framework prerender selalu build, server biasa mengikuti
  awalan seperti `VITE_` dan `NEXT_PUBLIC_`, variabel database tidak pernah
  memicu build), redeploy tanpa build, dan "Build ulang dari awal". Redirect
  lama di `astro.config.mjs` dihapus.
- Halaman panduan "Database Terkelola" (id dan en) di `/docs/database-terkelola`:
  status pilot terbatas (kuota bawaan 0 di `sakala.dev`), ketersediaan yang
  bergantung pada server, membuat database dari wizard atau halaman Database,
  variabel `DATABASE_URL` dan `DB_*`, migration lewat perintah rilis, detail
  koneksi, ganti password dengan redeploy otomatis, extension, batas koneksi
  dan penyimpanan, melepas dan menghapus, serta backup yang pemulihannya
  dilakukan maintainer dan tidak pernah sebagai superuser.
- Pertanyaan Umum (id dan en) mendapat jawaban untuk dosen: memakai Sakala
  untuk kelas hari ini (akun per mahasiswa, URL dikumpulkan lewat sistem
  kampus, dosen sebagai Pengamat di workspace tim), fitur kelas yang belum
  ada, batas workspace tim, sleep dan cadangan untuk demo, dan pertanyaan
  lewat GitHub Discussions kategori Q&A di `gmedia/sakala`.
- Empat entri changelog situs (id dan en): metrik dasar per proyek, push
  selektif di monorepo, redeploy tanpa build dengan saran variabel dari
  `.env.example`, dan pilot terbatas database terkelola.

### Changed

- Status di halaman Produk dan Roadmap per 23 November 2026: metrik dasar kini
  tersedia, redeploy tanpa build, push selektif di monorepo, dan saran
  `.env.example` masuk daftar yang sudah tersedia, dan database PostgreSQL
  terkelola tertulis sebagai pilot terbatas yang sedang diuji. Status Horizon D
  dan G di roadmap kanonik ikut diperbarui.
- Panduan yang menulis Sakala belum menyediakan database (Perintah Rilis,
  Database Eksternal, Deploy Pertamamu, Pengantar, Batas Pilot) kini menyebut
  pilot terbatas database terkelola. Batas Pilot mendapat baris kuota database
  (0) dan menjelaskan bahwa redeploy tanpa build tidak dihitung dalam batas
  build per jam. Perintah Rilis menjelaskan bahwa perintahnya tetap berjalan
  saat image dipakai ulang.
- Nama tab dan label Console di panduan disamakan dengan Console v0.11.0: tab
  **Variabel** (bukan Environment Variables), **Tambah variabel**, dan
  **Simpan sebagai secret**.
- Menyiapkan Dockerfile tidak lagi menulis bahwa langkah build ter-cache
  memakai nilai lama, karena build Dockerfile di Sakala berjalan tanpa cache
  layer sejak sakala-agent v0.3.0. Sebagai gantinya, halaman itu menjelaskan
  kapan memakai "Build ulang dari awal".
- Judul halaman hub dokumentasi kini sama dengan H1-nya ("Pengantar Sakala",
  "Understanding Sakala"), dan navigasi mobile docs tidak lagi menulis judul
  jalur dua kali di hub.
- ADR-020 mendapat bagian "Update 2026-11-23": nama variabel koneksi yang
  dipakai, penguncian kuota lewat `NOLOGIN` (bukan `ALLOW_CONNECTIONS
false`), instance pilot production yang sementara berjalan di runtime node,
  backup dan drill restore dari salinan off-host, yang belum dibangun (unduh
  dump, restore oleh pemilik, copy database), dan aturan bahwa dump tenant
  tidak pernah di-restore sebagai superuser beserta alasannya.

## [0.3.10] - 2026-11-19

### Changed

- Men-deploy Monorepo (id dan en) mendapat bagian "Push di monorepo": push
  hanya men-deploy proyek yang Root directory-nya berubah, atau semua proyek
  kalau berkas bersama di luar folder proyek berubah. Bagian itu juga
  menjelaskan folder bersarang, Root directory kosong, kapan semua proyek
  tetap di-deploy, dan baris "Dilewati" di tab Riwayat. Saran menyalakan
  auto-deploy di satu proyek saja dihapus; watch paths tetap tercatat sebagai
  batas. Berlaku sejak rilis `sakala-api` dan Console setelah `sakala-api`
  v0.8.0 dan Console v0.9.0.
- Men-deploy Monorepo (id dan en) menjelaskan workspace JavaScript (pnpm, npm,
  Yarn, Bun): Root directory diisi folder package, Build dan Start command
  dibiarkan kosong, build berjalan dari root workspace dengan lockfile-nya,
  dan SPA Vite tanpa script `start` disajikan sebagai situs statis. Batas
  "hanya isi Root directory" kini berlaku di luar workspace JavaScript dan di
  node dengan sakala-agent lebih lama dari v0.13.0. Panduan juga mengingatkan
  agar Start command tidak diisi `vite preview`.
- Saat Deploy Gagal (id dan en) mendapat bagian `runtime_app_host_blocked`:
  Vite preview atau dev server yang menolak domain Sakala, dan Django dengan
  `DisallowedHost`, beserta cara mengecek dan memperbaikinya. Kedua perubahan
  membutuhkan sakala-agent v0.13.0 atau lebih baru.

## [0.3.9] - 2026-11-19

### Added

- ADR-020 (Proposed, keputusannya sudah disetujui maintainer): PostgreSQL
  terkelola. Satu instance bersama per region di VM database sendiri dengan
  syarat kecepatan disk, database sebagai resource milik workspace yang bisa
  dipasang ke nol, satu, atau beberapa project, kuota jumlah dan total ukuran
  database di profil batas, aturan beda region, backup harian 7 hari dengan
  RPO 24 jam, unduh dump oleh pemilik, daftar extension, kapan menambah
  PgBouncer dan PITR, dan hasil ukur PostgreSQL di bawah gVisor (runsc)
  dibanding runc. PRD 9.3 dan Horizon G di roadmap kini menautkan ADR ini.
- Halaman panduan "Batas Pilot" (id dan en) di `/docs/batas-pilot`: batas per
  workspace (proyek, container, deployment bersamaan, build per jam, replika),
  batas per container, sleep setelah 30 menit tanpa pengunjung, dan yang belum
  ada selama pilot. Chip status beranda, Produk, Roadmap, hub dokumentasi, dan
  Deploy Pertamamu menautkannya.
- Entri changelog situs "Batas pilot yang kini berlaku" (id dan en, 19
  November 2026): pengumuman yang dijanjikan Syarat Layanan §3 untuk sleep
  otomatis dan batas build per jam.
- Lima entri changelog situs (id dan en) untuk perkembangan sejak 1 Oktober
  2026: Console dan workspace tim, sleep otomatis, domain `sakala.app`, replika
  dengan Sakala Edge beserta perintah rilis dan batas build per jam, dan pilot
  yang terbuka untuk siapa saja.

### Changed

- Status layanan mengikuti keputusan maintainer 19 November 2026: pilot hosted
  terbuka untuk siapa saja, tanpa biaya, dengan batas pemakaian. Klaim "pre-launch", "belum
  tersedia sebagai layanan publik", dan syarat undangan diganti di beranda,
  Produk, Roadmap, hub dokumentasi, FAQ, Deploy Pertamamu, panduan lain, dan
  Start Contributing (id dan en). Catatan ilustrasi tidak lagi menyebut
  "bukan layanan yang sudah berjalan".
- Hero beranda: aksi utama "Daftar dan deploy" ke halaman daftar Console, aksi
  kedua "Lihat cara kerjanya". Tombol GitHub pindah dari hero; GitHub tetap ada
  di navigasi dan bab Terbuka. Penutup beranda mendapat tombol daftar yang sama.
- Produk memberi status per kemampuan, bukan per pilar, per 19 November 2026.
  Roadmap memisahkan "Sudah tersedia" dari horizon yang belum dibangun, dengan
  label horizon mengikuti dokumen roadmap kanonik.
- Syarat Layanan §3 memuat batas yang sekarang berlaku: kuota proyek,
  container, dan deployment per workspace, 20 build per workspace per jam,
  dan sleep setelah 30 menit tanpa pengunjung. Versi (`syarat-v1`) dan tanggal
  berlakunya tidak diubah, karena yang berubah adalah batas operasional.
  Pemberitahuan Privasi bagian keamanan dikoreksi dengan cara yang sama:
  aplikasi pengguna di production berjalan di sandbox gVisor, dan pembatasan
  lalu lintas keluar dari container pengguna sedang ditambahkan.
- Dokumen kanonik Roadmap, MVP, dan PRD mencatat status per 19 November 2026
  (pendaftaran pilot terbuka, fase engineering yang sudah berjalan di
  production).
- FAQ (id dan en) menjelaskan bahwa router Sakala membuang atribut `Domain`
  dari cookie aplikasi, bahwa pendaftaran `sakala.app` ke Public Suffix List
  menunggu jumlah pengguna cukup besar, dan cara memakai cookie berawalan
  `__Host-` untuk sesi login.

### Fixed

- Alamat yang tidak ada kini menampilkan halaman 404 situs (versi Inggris
  untuk `/en/...`) dengan status tetap 404. Sebelumnya Caddy menjawab 404
  dengan body kosong karena `docker/Caddyfile` tidak punya `handle_errors`.
  Copy 404 tidak lagi menyebut "Sakala masih dibangun".
- Tautan "GitHub" di navigasi, bab Terbuka, dan footer membuka daftar
  repository Sakala di organisasi `gmedia` (difilter, tanpa arsip), bukan
  halaman organisasi yang juga berisi project lain.
- Halaman Open Source mendahulukan "Mulai berkontribusi" (Start
  Contributing), lalu good first issue di semua repository Sakala,
  Discussions di `gmedia/sakala`, dan dokumentasi. Keterangan ekosistem
  menyebut repository keenam, `sakala`. FAQ (id dan en) mengarahkan issue ke
  repository sesuai topiknya.
- "Saat Deploy Gagal" (id dan en) kini memuat `runtime_app_exec_denied` dan
  `runtime_replicas_exceeded`, yang bisa diperbaiki pengguna dan sebelumnya
  jatuh ke "Kegagalan yang belum dikenali". Baris tabel
  `repository_access_check_failed` kini punya keempat kolom.
- Halaman dokumentasi dengan enam bagian atau lebih punya daftar isi: di
  sidebar di bawah halaman yang sedang dibuka (layar lebar), dan sebagai
  panel "Di halaman ini" yang bisa dibuka (layar sempit).
- Navigasi utama kini menandai halaman aktif (`aria-current="page"`, atau
  `"true"` untuk halaman di bawah Dokumentasi). Sebelumnya trailing slash
  membuat perbandingan path tidak pernah cocok.
- H1 beranda tidak lagi terpotong di layar di bawah 360 px, dan menu mobile
  menutup dengan Esc lalu mengembalikan fokus ke tombol Menu.

## [0.3.8] - 2026-11-18

### Added

- Halaman panduan "Database dan Perintah Rilis" (id dan en) menjelaskan cara
  memakai database dari layanan lain selama Sakala belum menyediakan database
  terkelola, dan perintah rilis per project (field **Release command**): kapan
  ia berjalan, kapan tidak, batas waktunya, migration yang cocok dengan versi
  lama, dan alasan seeder serta migration tidak ditaruh di Start command.
- "Saat Deploy Gagal" (id dan en) kini memuat kategori `release` beserta kode
  `release_command_failed` dan `release_command_timeout`.

### Changed

- "Menghubungkan Database Eksternal" dan "Men-deploy Monorepo" (id dan en)
  kini menyarankan perintah rilis untuk migration, dengan menjalankan
  migration dari laptop sebagai cara lain.

## [0.3.7] - 2026-11-18

### Added

- Setiap tag `vX.Y.Z` kini juga menerbitkan GitHub Release setelah image
  terbit. Catatannya adalah bagian versi itu di file ini, disusul daftar
  "What's Changed" buatan GitHub yang menyebut setiap kontributor. Workflow
  release gagal kalau tag tidak punya bagian yang berisi di file ini.
- FAQ (id dan en) menjelaskan mengapa aplikasi pengguna berada di domain
  terpisah `sakala.app`, bukan di `sakala.dev`.
- ADR-019 (Proposed) mencatat Sakala Edge, tier routing yang meneruskan trafik
  publik ke runtime node, beserta jalur wake untuk sleep otomatis (#60).
  Pembaruan 2026-11-18 mencatat urutan kerja (replika di satu node dulu, lalu
  Sakala Edge), teknologi Edge, dua lapis load balancing, dan model region
  (#65).

### Changed

- ADR-019 berstatus Accepted sejak Sakala Edge melayani trafik production
  pada 2026-11-18, dengan daftar yang sudah selesai (replika, tabel route API,
  penempatan berdasarkan region dan kapasitas, `sakala-edge`, pemulihan
  replika) dan yang tersisa (node kedua, replika lintas node).
- Pemberitahuan Privasi kini menjelaskan bahwa cookie Console berlaku di
  `sakala.dev` dan tidak terkirim ke aplikasi pengguna di `*.sakala.app`.
  Syarat Layanan kini menyebut bahwa aplikasi di production sudah berjalan di
  sandbox gVisor, dan bahwa perubahan alamat berikutnya diumumkan lebih dulu.
  Versi dokumen tidak berubah.
- Alamat aplikasi pengguna di dokumentasi, beranda, dan contoh perintah kini
  `<slug>.sakala.app` (staging `<slug>.staging.sakala.app`), menggantikan
  `*.run.sakala.dev` yang sudah dimatikan.
- ADR-016 berstatus Accepted dengan catatan pembaruan 2026-11-18: `sakala.app`
  dipilih, domain lama dimatikan tanpa pengalihan, dan pendaftaran ke Public
  Suffix List menjadi langkah yang tersisa. ADR-019 menyebut wildcard
  `*.sakala.app` sebagai keadaan sekarang.
- Syarat Layanan, Pemberitahuan Privasi, dan Kebijakan Penggunaan Wajar kini
  menyebut `*.sakala.app` sebagai alamat aplikasi pengguna. Ini koreksi fakta
  tentang tempat aplikasi disajikan, jadi versi dokumen dan tanggal
  berlakunya tidak berubah.
- PRD §9.3 mencatat replika per project, dan bagian "Jalan menuju multi-node"
  di dokumentasi teknis (id dan en) menyebut replika di satu node dan Sakala
  Edge yang sudah berjalan.
- `sakala-maintainers` menjadi code owner semua path (#58).
- Dependency diperbarui lewat Dependabot: astro 7.4.7, @astrojs/mdx 8.1.3,
  tailwindcss dan @tailwindcss/vite 4.3.5, vite 8.3.6 (#62), serta
  docker/login-action dan softprops/action-gh-release v3.0.4 (#61).

## [0.3.6] - 2026-11-12

### Changed

- [Start Contributing](src/content/docs/proyek/start-contributing.md) kini
  meminta kontributor memastikan issue belum di-assign atau diklaim di
  komentar sebelum mengerjakannya, menjelaskan bahwa maintainer meng-assign
  issue setelah ada klaim, apa yang dilakukan kalau klaim diam seminggu, dan
  bahwa pull request untuk issue yang sudah diklaim orang lain biasanya
  ditutup sebagai duplikat (#54).

## [0.3.5] - 2026-11-12

### Fixed

- Cloudflare tidak lagi menyisipkan beacon Web Analytics
  (`static.cloudflareinsights.com/beacon.min.js`) ke halaman situs. Web
  Analytics (RUM) aktif di zona dan tidak bisa dimatikan dari sisi Sakala,
  padahal kebijakan privasi menyatakan situs tidak memasang analitik. Setiap
  respons HTML, termasuk halaman 404, kini dikirim dengan
  `Cache-Control: no-transform`, dan Cloudflare tidak mengubah respons yang
  membawa directive itu. Header dipasang di level teratas `docker/Caddyfile`
  berdasarkan `Content-Type: text/html`, jadi kompresi Caddy tetap jalan dan
  file selain HTML tidak berubah. `tests/container/headers.sh` memeriksa header
  setiap halaman HTML di image.

## [0.3.4] - 2026-11-12

### Changed

- [Start Contributing](src/content/docs/proyek/start-contributing.md) kini
  mengarahkan orang ke pencarian label `good first issue` dan `help wanted` di
  semua repository Sakala, yang ikut berubah saat issue dibuka dan ditutup,
  menggantikan kalimat bahwa belum ada good first issue. Larangan mengerjakan
  Explore, Learn, dan fitur tim dihapus, karena fitur seperti itu sekarang
  dibuka lewat issue `help wanted`. Sebagai gantinya ada penjelasan area yang
  tetap dipegang maintainer (security boundary, protokol agent, deployment
  production), cara mengusulkan pekerjaan besar lewat issue atau thread Ideas
  di Discussions `gmedia/sakala`, dan tautan Q&A untuk bertanya. Tautan ke
  `sakala-infra#4` yang sudah ditutup diganti panduan Full Stack Lokal, dan
  repository `gmedia/sakala` masuk tabel repository dan perintah quality.
- Template issue mengarahkan pertanyaan ke Discussions `gmedia/sakala` dan
  laporan keamanan ke halaman security policy repository ini, menggantikan
  tautan ke halaman organisasi.

## [0.3.3] - 2026-11-12

### Added

- Logo PNG untuk email transaksional di `/email/sakala-logo@2x.png` (280 x
  118 px, 11 KB, lossless): lockup Sakala berwarna Green Teal di atas tile
  putih bersudut bulat, digambar 2x untuk lebar tampil 140 px. Gmail dan
  Outlook tidak menampilkan SVG, dan tile putihnya menjaga logo tetap terbaca
  di klien email gelap yang tidak membalik warna gambar. Build menyalinnya apa
  adanya dan path-nya tidak boleh berubah, karena email yang sudah terkirim
  menunjuk ke sana. Dibuat ulang dengan `node scripts/email/render-logo.mjs`
  dari `public/brand/sakala-lockup.svg`.

## [0.3.2] - 2026-11-11

### Changed

- Bagian Port di [Menyiapkan Dockerfile](src/content/docs/dockerfile.md), dalam
  bahasa Indonesia dan Inggris, menjelaskan aturan port yang baru: kolom
  **Port**, lalu satu-satunya port dari `EXPOSE` di stage terakhir Dockerfile,
  lalu 3000. Image `nginx` biasa kini cukup memakai `EXPOSE 80`. [Saat Deploy
  Gagal](src/content/docs/deploy-gagal.md) menyebut aturan yang sama di
  `runtime_port_conflict` dan `runtime_app_not_listening`, dan kutipan pesan
  `runtime_port_conflict` kini memakai "proyek", sama dengan pesan dari API.
  Aturan ini berlaku setelah rilis API dan agent berikutnya terpasang. Port dari
  base image, misalnya `FROM nginx:alpine` tanpa `EXPOSE`, juga terbaca.
- Dependency diperbarui lewat Dependabot: grup npm minor dan patch (8 paket), Vite 8, @astrojs/mdx 8, prettier-plugin-astro 1, actions/checkout v7, actions/setup-node v7, dan docker/setup-buildx-action v4.

## [0.3.1] - 2026-11-11

### Changed

- Panduan [Menyiapkan Dockerfile](src/content/docs/dockerfile.md) dan
  [Saat Deploy Gagal](src/content/docs/deploy-gagal.md) mengikuti agent v0.4.0:
  image `nginx` biasa kini bisa dipakai asal mendengarkan di `${PORT}` lewat
  template, tabel kegagalan punya baris untuk nginx yang masih di port 80, dan
  perintah uji di laptop memakai flag capability yang sama dengan Sakala.

## [0.3.0] - 2026-11-11

### Added

- Pemberitahuan Privasi, Syarat Layanan, dan Kebijakan Penggunaan Wajar di
  `/privasi`, `/syarat`, dan `/penggunaan-wajar`, ditautkan dari footer. Route
  `/en/...` menampilkan teks Indonesia, dengan catatan bahwa teks itulah yang
  berlaku.
- Panduan [Deploy Pertamamu](src/content/docs/deploy-pertama.md),
  [Menyiapkan Dockerfile](src/content/docs/dockerfile.md),
  [Menghubungkan Database Eksternal](src/content/docs/database-eksternal.md),
  dan [Saat Deploy Gagal](src/content/docs/deploy-gagal.md), dalam Bahasa
  Indonesia dan Inggris.
- Halaman [Start Contributing](src/content/docs/proyek/start-contributing.md)
  yang memetakan repository, perintah quality, dan aturan kontrak.

### Changed

- Status di MVP, Roadmap, dan PRD §9.3 diperbarui per 6 November 2026. MVP tetap
  belum selesai, dan gate pendaftaran umum tetap belum terpenuhi.
- Pengantar dokumentasi tidak lagi menyebut bahwa alur deploy belum ada, dan
  menyatakan bahwa Sakala belum dibuka untuk umum.
- `/docs/ketika-gagal` kini mengarah ke `/docs/deploy-gagal`.

### Fixed

- State deployment di Alur Deployment dan Glossary mengikuti `DeploymentStatus`.
- Dokumen tidak lagi menyebut aplikasi mengikat port localhost. Route Caddy
  mengarah ke nama container di network runtime.
- Alur Deployment tidak lagi menyebut integrasi Agent API sebagai pekerjaan
  yang belum selesai.

## [0.2.1] - 2026-10-01

### Changed

- `CHANGELOG.md` disusun ulang per rilis, dan `package.json` mengikuti versi
  tag terakhir (#24).
- Changelog situs tidak lagi menampilkan nomor versi; setiap entri memakai
  tanggal dan anchor berdasarkan slug entri (#24).

## [0.2.0] - 2026-10-01

Rilis ini hanya berisi perubahan dokumentasi. Menurut SemVer, perubahan
seperti ini cukup menaikkan versi patch; nomor minor dipakai karena tag sudah
terbit sebelum hal itu dicek.

### Changed

- Dokumen project kanonik dimatangkan (#23): PRD 6.0 dengan pendidikan
  sebagai pasar pertama, persona utama, alternatif yang dibandingkan pengguna,
  kuota pilot, asumsi, risiko, dan target metrik; VISION dengan pernyataan
  posisi; MVP dengan gate enam syarat sebelum pendaftaran umum; ADR-014
  sampai ADR-017; SECURITY, PLATFORM_OPERATIONS, GOVERNANCE, GLOSSARY,
  ROADMAP, Learn, Explore, Design Strategy, ARCHITECTURE, dan CONTRIBUTING.
- Aturan bahasa dokumen kanonik: arah produk dalam Bahasa Indonesia, sistem
  dan komunitas dalam bahasa Inggris.
- Halaman Roadmap di situs mengikuti urutan horizon baru.
- `NOTICE` dan README menyatakan pengecualian merek Sakala; `GOVERNANCE.md` di
  root menjadi penunjuk ke halaman kanonik.

## [0.1.1] - 2026-09-24

### Added

- Tombol "Masuk" ke Console di header desktop dan navigasi mobile (#22).

## [0.1.0] - 2026-09-24

Rilis bertag pertama. Mencakup seluruh pekerjaan sejak repository dibuat
sampai workflow release (#1 sampai #21).

### Added

- Foundation website Astro static-first untuk `sakala.dev`, dengan
  dokumentasi, changelog, RSS, sitemap, dan metadata SEO.
- Situs dua bahasa (Indonesia dan Inggris) dengan dokumentasi publik dalam
  dua jalur, Pengantar dan Teknis (#16).
- Beranda _The Life of a Project_ (#17), lapisan kejelasan v3 (#18), dan
  beranda v4 dengan enam bab serta artefak yang berubah keadaan (#19).
- Jalur dokumentasi **Proyek** (`/docs/proyek`): dokumen kanonik Sakala terbit
  di situs ini, dengan `CODEOWNERS` untuk tinjauan maintainer (#20).
- Halaman **Sistem Desain** (`/docs/teknis/sistem-desain`) dalam dua bahasa
  (#20).
- Artefak bergrammar rancangan Console Wave 1, berlabel _design direction_
  (#19).
- Social preview per halaman lewat `scripts/og/generate.mjs` (#19).
- Dokumentasi publik cara kerja Sakala Agent (#12).
- Image container statis untuk production (#15) dan workflow release yang
  memublikasikan image pada setiap tag versi (#21).
- Halaman governance publik, `GOVERNANCE.md`, dan `SPONSORS.md`.

### Changed

- Framing Sakala diperbarui dari corporate-first menjadi project open-source
  yang didukung GMEDIA sebagai founding sponsor.
- Navigasi, dokumentasi, roadmap, dan daftar repository diperbarui untuk
  arsitektur `sakala-console` dan `sakala-api` yang terpisah (#11).
- Gerak pada beranda dipindah dari teks ke artefak (#19).
- Bagian "Contributor awal" diganti "Cara berkontribusi" di halaman Open
  Source (#19).
- Dependency diperbarui ke versi terbaru (#13).

[Unreleased]: https://github.com/gmedia/sakala-landing/compare/v0.3.11...HEAD
[0.3.11]: https://github.com/gmedia/sakala-landing/compare/v0.3.10...v0.3.11
[0.3.10]: https://github.com/gmedia/sakala-landing/compare/v0.3.9...v0.3.10
[0.3.9]: https://github.com/gmedia/sakala-landing/compare/v0.3.8...v0.3.9
[0.3.8]: https://github.com/gmedia/sakala-landing/compare/v0.3.7...v0.3.8
[0.3.7]: https://github.com/gmedia/sakala-landing/compare/v0.3.6...v0.3.7
[0.3.6]: https://github.com/gmedia/sakala-landing/compare/v0.3.5...v0.3.6
[0.3.5]: https://github.com/gmedia/sakala-landing/compare/v0.3.4...v0.3.5
[0.3.4]: https://github.com/gmedia/sakala-landing/compare/v0.3.3...v0.3.4
[0.3.3]: https://github.com/gmedia/sakala-landing/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/gmedia/sakala-landing/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/gmedia/sakala-landing/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/gmedia/sakala-landing/compare/v0.2.1...v0.3.0
[0.2.1]: https://github.com/gmedia/sakala-landing/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/gmedia/sakala-landing/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/gmedia/sakala-landing/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/gmedia/sakala-landing/releases/tag/v0.1.0
