# Sakala sebaiknya menjadi tempat belajar mengirim software, dan harus menjawab soal biaya serta abuse sebelum pilot publik

1 Oktober 2026 · proposal · **diputuskan project lead pada 1 Oktober 2026**

> Kelima keputusan di bawah disetujui: pendidikan sebagai pasar pertama,
> model hosted dengan kuota plus self-host (kapasitas di atas kuota dijual
> sebagai layanan cloud GMEDIA, bukan lisensi Sakala), gVisor sebagai
> isolasi, dokumen hukum dan penanganan abuse, serta aturan bahasa. Hasilnya
> masuk ke dokumen kanonik: PRD 6.0, VISION, MVP, ROADMAP, ADR-014 sampai
> ADR-017, SECURITY, PLATFORM_OPERATIONS, GOVERNANCE, GLOSSARY,
> FEATURE_EDUCATION, FEATURE_EXPLORE, DESIGN_STRATEGY, ARCHITECTURE, dan
> CONTRIBUTING. Draf dokumen hukum ada di `legal/`.

Dokumen Sakala sudah kuat menjawab _mengapa_ Sakala ada dan _bagaimana_
sistemnya dibangun. Yang belum dijawab adalah tiga hal yang justru
menentukan apakah Sakala bertahan: untuk siapa Sakala dibuat terlebih dahulu,
melawan alternatif apa, dan siapa yang menanggung biaya runtime setelah masa
pilot. Tiga platform yang paling mirip Sakala pernah gagal di titik yang sama.
Heroku menghapus free tier pada 2022 karena abuse. Replit menutup produk
pendidikannya pada 2024 karena beban biaya. Glitch menghentikan hosting pada
2025 karena biaya operasional dan abuse.

Pada saat yang sama, ada celah baru. GitHub Classroom resmi dihentikan pada
28 Agustus 2026, padahal pernah dipakai 3,73 juta siswa dan pengajar. Dosen
dan guru yang dulu memakainya sedang mencari pengganti. Usulan dokumen ini:
Sakala memposisikan diri sebagai **tempat belajar mengirim software**, untuk
kampus, SMK, program magang, dan komunitas di Indonesia. Model
keberlanjutannya adalah self-host oleh institusi, bukan free tier tanpa batas.

## Yang perlu diputuskan

Lima keputusan ini mengubah isi PRD, MVP, dan roadmap. Urutannya sesuai
dampak.

1. **Pasar pertama.** Pendidikan (kelas, workshop, PKL, magang) dijadikan
   pasar pertama, bukan "developer" secara umum. Alasannya ada di bagian
   Arah. Tanpa keputusan ini, PRD tetap melayani delapan persona sekaligus
   dan tidak ada yang terlayani dengan tuntas.
2. **Siapa yang membayar runtime.** Usulannya adalah model hybrid. Pilot
   hosted didukung GMEDIA dengan kuota ketat. Self-host satu node untuk
   institusi dimajukan dari Horizon F ke horizon kedua. Institusi menjalankan
   runtime di infrastrukturnya sendiri, sehingga biaya tidak menumpuk di satu
   sponsor.
3. **Isolasi sebelum pilot publik.** Topologi MVP menaruh container aplikasi
   user di Docker host yang sama dengan API, PostgreSQL, dan Valkey. Kode
   mahasiswa adalah kode yang tidak dipercaya. Satu container escape berarti
   akses ke database control plane. Usulannya dicatat sebagai ADR baru:
   memisahkan host runtime dari host control plane, lalu memakai gVisor
   sebagai runtime container untuk workload user.
4. **Kebijakan abuse dan dasar hukum sebelum pilot publik.** Syarat layanan,
   kebijakan penggunaan yang wajar (acceptable use policy), pemberitahuan
   privasi sesuai UU PDP, dan jalur pelaporan abuse. Tanpa ini,
   `*.run.sakala.dev` akan dipakai untuk phishing dalam hitungan minggu,
   sama seperti yang dialami `*.vercel.app` dan `*.pages.dev`.
5. **Bahasa dokumen kanonik.** Saat ini 4 dokumen berbahasa Indonesia dan 11
   berbahasa Inggris. Pilih satu bahasa utama, lalu tulis ulang secara
   bertahap. Usulanku: Inggris untuk dokumen sistem (ARCHITECTURE, ADR,
   SECURITY, GLOSSARY), Indonesia untuk dokumen arah (PHILOSOPHY, VISION,
   PRD), dan aturan itu dicatat di halaman depan jalur Proyek.

## Audit dokumen

Skala penilaian: **kuat** berarti bisa dipakai apa adanya, **cukup** berarti
perlu dilengkapi, **lemah** berarti ada celah yang mengubah keputusan.

| Dokumen             | Nilai | Temuan utama                                                                                                                                                                                         |
| ------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| PHILOSOPHY          | kuat  | Tujuh prinsip dan product filter adalah aset terbaik Sakala. Tidak perlu diubah.                                                                                                                     |
| VISION              | cukup | Delapan pilar tanpa urutan prioritas. Tidak ada pernyataan posisi yang menyebut untuk siapa dan melawan apa.                                                                                         |
| PRD                 | lemah | Delapan persona setara. Tidak ada bagian lanskap kompetitor, asumsi, risiko, atau model biaya. Metrik ada, tetapi tanpa target angka.                                                                |
| MVP                 | cukup | Pertanyaan validasinya membandingkan Sakala dengan "menyiapkan server manual". Pengguna sasaran tidak membandingkan dengan VPS. Mereka membandingkan dengan free tier Vercel, Render, atau Railway.  |
| ARCHITECTURE        | kuat  | Batas control plane dan data plane jelas. Celahnya ada di topologi MVP (§12): runtime user dan control plane berbagi satu Docker host.                                                               |
| ADR                 | kuat  | Keputusan tercatat rapi. Belum ada ADR untuk isolasi workload, kuota dan sleep, serta domain publik (`*.run.sakala.dev` adalah domain bersama dengan risiko reputasi).                               |
| SECURITY            | cukup | Jujur mengakui container bukan batas multi-tenant yang sempurna, tetapi menunda keputusannya. Tidak membahas abuse oleh pengguna (phishing, crypto mining, spam). Kanal pelaporan masih "belum ada". |
| ROADMAP             | cukup | Horizon dan validation gate bagus. Self-host ada di Horizon F, padahal itu jawaban paling masuk akal untuk soal biaya. Tidak ada gate "siap pilot publik".                                           |
| DESIGN_STRATEGY     | cukup | Mendorong Explore sebagai gelombang desain berikutnya. Studi kasus Glitch menunjukkan Explore adalah fitur dengan biaya moderasi tertinggi. Urutan ini perlu ditinjau ulang.                         |
| FEATURE_EXPLORE     | cukup | Konsep attribution dan lineage kuat dan khas. Belum ada model moderasi yang realistis untuk tim kecil.                                                                                               |
| FEATURE_EDUCATION   | kuat  | Batas "bukan LMS" tepat. Belum membahas cara memasukkan daftar peserta (roster), integrasi LMS, dan apa yang terjadi pada project setelah semester selesai.                                          |
| PLATFORM_OPERATIONS | cukup | Kategori kegagalan deployment sangat berguna. Abuse hanya disebut satu kata ("abuse signal"), tanpa alur penanganan.                                                                                 |
| GOVERNANCE          | cukup | Batas peran sponsor jelas. Belum ada jalur menjadi maintainer, cara keputusan diambil saat tidak sepakat, kebijakan merek "Sakala", dan rencana keberlanjutan.                                       |
| CONTRIBUTING        | kuat  | Aturan soal AI-assisted development jarang dimiliki project seawal ini. Perlu ditambah tautan ke code of conduct.                                                                                    |
| GLOSSARY            | kuat  | Konsisten. Perlu ditambah istilah yang akan muncul: kuota, sleep, abuse report, self-host node.                                                                                                      |

Di luar temuan per dokumen, ada empat pola yang berulang.

**Daftar yang sama ditulis berbeda-beda.** Pilar produk muncul di VISION
(delapan pilar), PRD §6 (delapan sub-bab dengan nama berbeda), ROADMAP (enam
horizon), dan halaman Produk di situs (lima pilar). Status deployment muncul di
PRD §10 (sebelas state), Console Wave 1 (lima tahap), dan landing (lima tahap
dengan nama Console). Kalau satu daftar diubah, yang lain tidak ikut berubah.
Solusinya: satu dokumen memegang daftar, dokumen lain menautkannya.

**Tidak ada bukti dari pengguna.** Semua persona dan kebutuhan ditulis dari
asumsi tim. Tidak ada catatan wawancara, uji coba kelas, atau data dari pilot.
Ini wajar untuk tahap sekarang, tetapi PRD perlu memisahkan dengan jelas mana
yang sudah divalidasi dan mana yang masih hipotesis.

**Tidak ada angka.** Tidak ada kuota (berapa project per mahasiswa, berapa
RAM per workload), tidak ada target metrik (median waktu sampai URL pertama
berapa menit), dan tidak ada estimasi biaya per workload per bulan. Tanpa
angka, validation gate di ROADMAP tidak bisa diperiksa.

**Pertanyaan "apa yang terjadi setelah" belum dijawab.** Setelah semester
selesai, apakah project mahasiswa tetap hidup? Setelah pilot GMEDIA selesai,
siapa yang menanggung runtime? Setelah seseorang memakai subdomain untuk
phishing, apa yang dilakukan Sakala dalam satu jam pertama? Filosofi Sakala
bilang "karya dapat hidup lebih lama daripada tugas yang melahirkannya".
Dokumen belum menjelaskan bagaimana itu dibiayai.

## Studi kasus

Platform di bawah dipilih karena pernah menghadapi pilihan yang akan dihadapi
Sakala: free tier, pendidikan, komunitas, template, dan self-host.

### Yang mundur, dan kenapa

**Heroku** mengumumkan penghapusan semua paket gratis pada Agustus 2022 dan
menjalankannya pada 28 November 2022. Alasan resminya adalah "an extraordinary
amount of effort to manage fraud and abuse". Satu generasi developer yang
belajar deploy di Heroku pindah ke tempat lain. Pada Februari 2026, Salesforce
menempatkan Heroku dalam mode sustaining engineering: hanya perbaikan keamanan
dan stabilitas, tanpa fitur baru. Pelajarannya untuk Sakala: free tier tanpa
kontrol abuse adalah utang yang pasti ditagih.

**Replit Teams for Education** diluncurkan April 2022, diumumkan dihentikan
November 2023, dan mati pada 1 Agustus 2024. Alasan yang dilaporkan adalah
beban biaya dan infrastruktur dari sektor pendidikan. Sekolah yang sudah
membangun kurikulum di atasnya harus pindah di tengah jalan. Pelajarannya:
institusi pendidikan butuh jaminan bahwa alatnya tidak hilang. Open source dan
self-host adalah jaminan yang paling kuat.

**Glitch** mengumumkan pada 22 Mei 2025 bahwa hosting project dan profil user
berhenti pada 8 Juli 2025. Alasannya biaya operasional dan penyalahgunaan oleh
pihak jahat, ditambah pengakuan bahwa arsitekturnya sudah tidak memberi nilai
unik. Glitch adalah platform yang paling mirip visi Explore Sakala: komunitas,
remix, dan karya yang saling melahirkan. Pelajarannya: fitur komunitas dan
remix menambah biaya moderasi dan abuse, bukan hanya nilai.

**GitHub Classroom** menutup pendaftaran baru pada 26 Mei 2026 dan resmi
dihentikan pada 28 Agustus 2026, dialihkan ke solusi partner. Dalam sepuluh
tahun, Classroom dipakai 3,73 juta siswa dan pengajar di lebih dari 305.000
kelas. Classroom memberi repository per mahasiswa dan autograding lewat
GitHub Actions, tetapi tidak pernah memberi aplikasi yang hidup. Ini celah yang
persis diisi Sakala Learn: `source → deploy → live app → review`.

### Yang berhasil, dan apa yang bisa dipinjam

**Coolify** adalah PaaS self-host berlisensi Apache 2.0 dengan lebih dari
52.000 bintang di GitHub. Pendirinya menolak modal ventura dan membiayai
project dari sponsor serta Coolify Cloud (mulai $5 per bulan, dashboard
terkelola yang men-deploy ke server milik user). Pada Maret 2025, pendapatannya
dilaporkan sekitar $5.200 dari sponsor dan $10.500 dari Cloud per bulan.
Pelajarannya: model "bawa servermu sendiri" membuat biaya runtime tidak pernah
jadi beban project. Ini paling dekat dengan model keberlanjutan yang cocok
untuk Sakala.

**Dokploy** tumbuh paling cepat di kategori self-host tahun ini (sekitar 36.000
bintang per Agustus 2026). Pada Januari 2026, lisensinya dirapikan menjadi
Apache 2.0 untuk core, dengan fitur enterprise di bawah lisensi source-available
terpisah. Perubahan lisensi di tengah jalan ini memicu diskusi soal
kepercayaan. Pelajarannya: tentukan batas antara yang terbuka dan yang
komersial sejak awal, sebelum komunitas bergantung.

**Railway** membayar pembuat template 25 persen dari pemakaian yang berasal
dari template mereka, dan menaikkannya sementara menjadi 50 persen untuk $1 juta
pembayaran berikutnya. Total yang sudah dibayar mendekati $1 juta. Pelajarannya
untuk Explore: template yang bagus datang dari insentif yang jelas. Untuk
Sakala, insentifnya belum tentu uang. Bisa berupa attribution, kurasi resmi,
atau pengakuan institusi (misalnya template resmi program magang).

**Render** memberi free tier yang jelas batasnya: service gratis tidur setelah
15 menit tanpa trafik, butuh sekitar satu menit untuk bangun, dengan jatah 750
jam instance per workspace per bulan. **Vercel Hobby** gratis tetapi
dibatasi untuk penggunaan non-komersial, dengan batas pemakaian yang tidak bisa
dibeli tambahan. Pelajarannya: free tier yang bertahan adalah free tier yang
batasnya tertulis, bisa ditebak, dan membuat abuse tidak menguntungkan. Sleep
setelah tidak aktif adalah alat paling murah untuk itu. Di MVP Sakala, sleep
masih masuk daftar "tidak dibutuhkan".

**Fly.io** menjalankan setiap workload di microVM Firecracker dengan kernel
sendiri, bukan container biasa. Pilihan umum di industri untuk kode yang tidak
dipercaya adalah Firecracker (butuh kontrol atas hardware) atau gVisor (kernel
di ruang user yang mencegat syscall, bisa dipakai dengan tooling container
yang ada). Untuk Sakala yang memakai Docker di satu host, gVisor adalah langkah
yang paling realistis.

### Konteks yang mempengaruhi Sakala

**Abuse di subdomain gratis adalah kondisi normal, bukan kemungkinan.**
Kaspersky memblokir 224.984 subdomain unik di layanan cloud yang dipakai
untuk phishing antara Agustus 2025 dan Juli 2026. `pages.dev` memuat 24,9
persen tautan phishing yang dilacak, disusul `vercel.app` (13,8 persen) dan
`github.io` (13,7 persen). Platform yang memberi subdomain gratis
dengan HTTPS otomatis akan menjadi sasaran begitu ia dikenal.

**UU PDP berlaku penuh sejak 17 Oktober 2024.** Setiap pihak yang memproses
data pribadi orang di Indonesia wajib punya dasar hukum pemrosesan,
pemberitahuan privasi yang transparan, dan pelaporan kebocoran dalam 72 jam.
Sanksi administratifnya sampai 2 persen pendapatan tahunan. Sakala memproses
data mahasiswa (nama, email, akun GitHub), jadi ini berlaku sejak pilot.

**Pesaing regional sudah ada.** Zeabur, PaaS dari Taiwan, memposisikan diri
sebagai PaaS paling ramah developer untuk Asia. Sekitar 5 persen trafik
situsnya berasal dari Indonesia. Sakala tidak perlu mengalahkannya di fitur,
karena posisi Sakala berbeda: pendidikan, bahasa Indonesia, open source, dan
bisa di-self-host institusi.

## Arah yang diusulkan

### Posisi

Usulan kalimat posisi, untuk ditaruh di VISION dan halaman depan jalur
Proyek:

> Sakala adalah platform deployment open-source untuk belajar mengirim
> software. Mahasiswa, peserta magang, dan komunitas membawa project dari
> repository menjadi aplikasi yang hidup. Pengajar dan mentor melihat source
> dan aplikasinya di satu tempat. Institusi bisa menjalankan Sakala di
> infrastrukturnya sendiri.

Kalimat ini memilih. Ia tidak bersaing dengan Vercel untuk frontend
komersial, dan tidak bersaing dengan Coolify untuk developer yang mengelola
server sendiri. Ia mengambil ruang yang ditinggalkan Replit Education dan
GitHub Classroom, lalu menambahkan hal yang tidak pernah mereka punya:
aplikasi yang benar-benar hidup dan bisa dijelaskan.

### Kenapa pendidikan duluan

Pendidikan cocok dengan filosofi Sakala. Prinsip "Belajar Melalui Wujud
Nyata" dan "Terang" paling bernilai bagi orang yang sedang belajar. Developer
senior tidak butuh penjelasan kenapa health check gagal. Mahasiswa butuh.

Pendidikan juga punya jalur distribusi yang jelas. Satu dosen membawa 30
sampai 40 mahasiswa. Satu program magang GMEDIA sudah menjadi pilot yang
tersedia. Tidak perlu marketing ke developer satu per satu.

Yang terakhir, pendidikan menyelesaikan soal biaya lewat self-host. Kampus dan
SMK sering punya server lab yang menganggur di luar jam praktikum. Mereka
tidak mau data mahasiswa di platform asing yang bisa tutup kapan saja, seperti
Replit dan GitHub Classroom. Sakala yang open source dan bisa dipasang di
server kampus menjawab keduanya.

Risiko pilihan ini juga perlu ditulis. Institusi pendidikan lambat mengambil
keputusan, pengadaan rumit, dan penggunaannya musiman (ramai di tengah
semester, sepi saat libur). Karena itu pilot pertama sebaiknya di program yang
dikendalikan sendiri, yaitu magang GMEDIA dan satu atau dua dosen yang sudah
dikenal, bukan kerja sama resmi dengan kampus.

### Yang dimajukan, yang ditunda

| Kemampuan                                            | Posisi sekarang        | Usulan                                              | Alasan                                                                                |
| ---------------------------------------------------- | ---------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Kuota per user dan sleep saat tidak aktif            | Tidak masuk MVP        | Syarat pilot publik                                 | Alat paling murah melawan biaya dan abuse (Render, Heroku)                            |
| Pemisahan host runtime dan control plane, gVisor     | "Diteliti nanti"       | Syarat pilot publik                                 | Kode mahasiswa adalah kode tidak dipercaya                                            |
| Syarat layanan, AUP, privasi UU PDP, lapor abuse     | Tidak ada              | Syarat pilot publik                                 | Kewajiban hukum dan perlindungan reputasi domain                                      |
| Classroom minimal (roster CSV, assignment, overview) | Horizon D              | Horizon kedua, setelah MVP                          | Celah GitHub Classroom, dan pasar pertama                                             |
| Self-host satu node untuk institusi                  | Horizon F              | Horizon kedua                                       | Jawaban biaya jangka panjang dan jaminan bagi institusi                               |
| Explore publik (showcase, template komunitas)        | Wave desain berikutnya | Setelah Classroom, mulai dari koleksi yang dikurasi | Biaya moderasi tinggi (Glitch). Mulai dari koleksi program yang dikurasi maintainer   |
| Managed PostgreSQL, Redis, object storage            | Horizon E              | Tetap ditunda                                       | Mahal dan berisiko. Untuk kelas, database di dalam container project sudah cukup dulu |
| Multi-node, multi-region                             | Horizon F              | Tetap ditunda                                       | Belum ada bukti kebutuhan                                                             |

### Gate "siap pilot publik"

ROADMAP punya validation gate untuk horizon, tetapi belum punya gate untuk
membuka pintu ke pengguna di luar tim. Usulan gate, ditambahkan ke MVP.md:

1. Runtime user berjalan di host terpisah dari API dan database, dengan
   gVisor atau yang setara, dan tercatat di ADR.
2. Kuota tertulis dan ditegakkan: jumlah project per user, CPU dan memori per
   workload, sleep setelah tidak aktif, batas build per jam.
3. Syarat layanan, AUP, dan pemberitahuan privasi terbit di situs.
4. Ada alamat pelaporan abuse yang dipantau, dan alur penanganannya tertulis
   di PLATFORM_OPERATIONS: siapa yang menonaktifkan route, dalam berapa lama,
   dan bagaimana user diberi tahu.
5. Median waktu dari login sampai URL pertama diukur pada minimal 10 pengguna
   pilot, dan hasilnya dicatat.
6. Estimasi biaya runtime per workload per bulan tercatat, termasuk kapasitas
   yang disediakan GMEDIA dan batasnya.

## Perubahan dokumen yang diusulkan

Setiap perubahan di bawah adalah PR terpisah ke jalur `proyek`, supaya bisa
direview satu per satu.

| Dokumen                                      | Perubahan                                                                                                                                                                          |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VISION                                       | Tambah pernyataan posisi. Urutkan pilar sesuai prioritas. Tambah bagian "alternatif yang dibandingkan pengguna".                                                                   |
| PRD                                          | Tetapkan persona utama (mahasiswa, pengajar) dan sekunder. Tambah bagian lanskap, asumsi yang belum divalidasi, risiko, dan target angka untuk metrik.                             |
| MVP                                          | Ganti pembanding "menyiapkan server manual" menjadi "free tier yang ada". Tambah gate "siap pilot publik".                                                                         |
| ADR                                          | ADR-014 isolasi workload user. ADR-015 kuota dan sleep. ADR-016 kebijakan domain publik bersama.                                                                                   |
| SECURITY                                     | Bagian abuse oleh pengguna. Kanal pelaporan kerentanan yang nyata (satu alamat untuk semua repo).                                                                                  |
| ROADMAP                                      | Majukan Classroom minimal dan self-host satu node ke horizon kedua. Pindahkan Explore publik setelahnya.                                                                           |
| PLATFORM_OPERATIONS                          | Alur penanganan abuse dan takedown, dengan target waktu.                                                                                                                           |
| GOVERNANCE                                   | Jalur menjadi maintainer, cara mengambil keputusan saat tidak sepakat, kebijakan merek, dan bagian keberlanjutan (siapa membayar apa, dan apa yang terjadi bila sponsor berhenti). |
| FEATURE_EDUCATION                            | Roster, integrasi LMS (mulai dari CSV, LTI nanti), siklus hidup project setelah semester, dan kebijakan data mahasiswa.                                                            |
| Dokumen baru: TERMS, ACCEPTABLE_USE, PRIVACY | Terbit di situs sebelum pilot publik. Perlu ditinjau orang yang paham hukum; draf awal bisa disiapkan tim.                                                                         |
| Satu sumber untuk daftar                     | Pilar produk dipegang VISION. Status deployment dipegang GLOSSARY. Dokumen lain menautkan, tidak menyalin.                                                                         |

## Yang belum pasti

Beberapa usulan di atas masih hipotesis dan perlu dibuktikan sebelum dikunci
di dokumen kanonik.

- **Minat institusi terhadap self-host.** Belum ada satu pun kampus atau SMK
  yang ditanya. Cara memastikannya: wawancara lima pengajar dan dua pengelola
  lab komputer, dengan satu pertanyaan kunci, yaitu apakah mereka mau dan bisa
  menjalankan satu server untuk kelasnya.
- **Biaya per workload.** Belum ada angka. Cara memastikannya: jalankan 20
  sampai 30 project contoh (Laravel, Express, Next.js) di satu node selama dua
  minggu dan catat pemakaian CPU, memori, dan disk.
- **Kapasitas GMEDIA untuk pilot.** Dokumen tidak menyebut berapa node, berapa
  lama, dan dengan batas apa. Ini perlu dikonfirmasi langsung dengan GMEDIA.
- **Pengganti GitHub Classroom yang sudah dipilih pengajar.** Pengumuman
  GitHub menyebut "partner solutions" tanpa menyebut namanya di halaman
  changelog. Salah satu artikel menyebut Codio. Perlu dicek apakah pengajar di
  Indonesia sudah pindah ke sana atau masih mencari.
- **Angka dari artikel pihak ketiga.** Pendapatan Coolify, bintang Dokploy,
  dan porsi trafik Zeabur berasal dari artikel dan pelacak pihak ketiga, bukan
  laporan resmi. Cukup untuk arah, tidak untuk dikutip sebagai fakta di situs.

## Sumber

- Glitch: [BleepingComputer, Glitch to end app hosting and user profiles on July 8](https://www.bleepingcomputer.com/news/security/glitch-to-end-app-hosting-and-user-profiles-on-july-8/), [forum Glitch](https://support.glitch.com/t/discussion-thread-project-hosting-ending-july-8/75660)
- Heroku: [TechTarget, Heroku to end free tiers](https://www.techtarget.com/searchsoftwarequality/news/252524336/Heroku-to-end-free-tiers-creating-platform-void-for-devs), [Yahoo Finance, blaming fraud and abuse](https://finance.yahoo.com/news/heroku-announces-plans-eliminate-free-174322489.html), [DeployHQ, Heroku enters sustaining engineering mode](https://www.deployhq.com/blog/heroku-sustaining-engineering-alternatives)
- Replit: [DataWars, Replit Teams for Education deprecation](https://www.datawars.io/articles/replit-teams-for-education-deprecation-all-you-need-to-know), [Codeanywhere](https://codeanywhere.com/blog/alternative-solutions-for-educators-after-replits-teams-for-education-discontinuation)
- GitHub Classroom: [GitHub Changelog, GitHub Classroom deprecated](https://github.blog/changelog/2026-08-27-github-classroom-deprecated/), [GitHub Changelog, sign-ups no longer available](https://github.blog/changelog/2026-05-26-github-classroom-sign-ups-are-no-longer-available/), [GitHub Community Discussion #205975](https://github.com/orgs/community/discussions/205975), [Codio, After GitHub Classroom](https://www.codio.com/blog/extending-github-education), [GitHub Docs, autograding](https://docs.github.com/en/education/manage-coursework-with-github-classroom/teach-with-github-classroom/use-autograding)
- Coolify: [temps.sh, Coolify pricing 2026](https://temps.sh/blog/coolify-pricing-explained-2026), [DEV, Coolify pricing teardown](https://dev.to/beton/coolify-pricing-teardown-2026-5675)
- Dokploy: [bex.co, Dokploy Apache 2.0 standardization](https://bex.co/blog/2026/08/16/dokploy-apache-2-0-license-standardization-trust), [bex.co, star velocity self-hosted PaaS](https://bex.co/blog/2026/09/25/coolify-dokploy-caprover-star-velocity-self-hosted-paas-2026)
- Railway: [Template Kickback Program](https://railway.com/open-source-kickback), [Railway blog, $1M for open source](https://blog.railway.com/p/1M-open-source-kickbacks)
- Render: [Render, platforms with a real free tier in 2026](https://render.com/articles/platforms-with-a-real-free-tier-for-developers-in-2026)
- Vercel: [justinmckelvey.com, Hobby limits and the commercial clause](https://justinmckelvey.com/blog/is-vercel-free)
- Isolasi: [Fly.io, Firecracker vs gVisor](https://fly.io/learn/firecracker-vs-gvisor/), [gVisor](https://gvisor.dev/), [Northflank, Firecracker vs gVisor](https://northflank.com/blog/firecracker-vs-gvisor)
- Abuse: [Securelist (Kaspersky), phishers are hijacking legitimate cloud infrastructure](https://securelist.com/cloud-platforms-in-phishing/120832/), [Kaseya, phishing campaigns abusing Vercel](https://www.kaseya.com/blog/phishing-campaigns-abusing-vercels-free-hosting-platform/)
- UU PDP: [ASEAN Briefing, Indonesia's PDP law guide](https://www.aseanbriefing.com/doing-business-guide/indonesia/company-establishment/personal-data-protection-law), [DLA Piper, data protection laws in Indonesia](https://www.dlapiperdataprotection.com/?t=law&c=ID)
- Zeabur: [Hogan Tech, What is Zeabur](https://hogantechs.com/en/zeabur-iaas-paas-saas-deploy-scale-instantly/), [DevTune, Zeabur](https://devtune.ai/verticals/deployment-and-hosting-platforms/zeabur)
- Dokumen internal: jalur Proyek di `src/content/docs/proyek/` (baseline 15 Agustus 2026).
