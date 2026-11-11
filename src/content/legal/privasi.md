---
version: privasi-v1
---

Halaman ini menjelaskan data pribadi yang diproses layanan Sakala, untuk apa, berapa lama disimpan, siapa saja yang ikut memprosesnya, dan apa hakmu. Sakala masih tahap pilot, jadi hal yang belum ada kami tulis apa adanya.

Pemberitahuan ini untuk kamu ketahui. Ini bukan permintaan persetujuan, dan kami tidak menjadikannya dasar pemrosesan datamu.

Kami tidak mengklaim Sakala sudah memenuhi seluruh kewajiban Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP). Halaman ini menyebut apa yang sudah berjalan dan apa yang belum.

## Yang paling perlu kamu tahu

- Kamu bisa mengunduh salinan datamu dan menghapus akunmu sendiri di Console. Sebagian data tetap ada setelah akun dihapus, dan rinciannya ada di bagian "Menghapus akun".
- Admin Sakala secara teknis bisa membaca log dan nilai secret proyek mana pun. Pembacaan nilai secret dicatat, tetapi pembacaan log belum.
- Beberapa data belum punya batas waktu simpan otomatis, misalnya jejak audit dan masukan. Rinciannya ada di tabel di bawah.
- Basis data dan avatar yang kamu unggah dicadangkan setiap hari, tetapi kami tidak menjanjikan pemulihan data. Jangan jadikan Sakala satu-satunya tempat menyimpan sesuatu yang penting.
- Jangan memakai Sakala untuk data yang sensitif. Isolasi antarpengguna belum selesai dibangun.

## Siapa yang bertanggung jawab

Layanan Sakala di `sakala.dev`, `app.sakala.dev`, `api.sakala.dev`, dan `*.run.sakala.dev` dikelola oleh Sakala Maintainers, yaitu pengelola proyek open-source Sakala. Sakala Maintainers belum punya badan hukum tersendiri.

Infrastrukturnya didukung PT Media Sarana Data (GMEDIA) sebagai founding sponsor. Dokumen ini tidak menyebut GMEDIA sebagai pengendali data atau pihak dalam perjanjian, karena GMEDIA belum menyepakati peran itu.

Pihak yang bertanggung jawab bisa berubah, misalnya kalau badan hukum dibentuk. Kalau itu terjadi, kami memberi tahu kamu lewat email akun dan di situs ini sebelum perubahannya berlaku.

Kontak untuk urusan privasi: [`privacy@sakala.dev`](mailto:privacy@sakala.dev). Kontak umum: [`info@sakala.dev`](mailto:info@sakala.dev).

## Data yang diproses

Kolom "Dasar" memakai istilah dari UU PDP Pasal 20 ayat (2), dan artinya dijelaskan setelah tabel. Lama simpan di tabel adalah pengaturan layanan saat ini.

| Data                                                                                                                                                                                                        | Untuk apa                                                                      | Dasar                                              | Lama simpan                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Akun: nama, username, email, email baru yang menunggu konfirmasi, kata sandi dalam bentuk hash, waktu verifikasi email, waktu login terakhir, peran                                                         | Membuat akun, masuk, mengirim email akun                                       | Perjanjian                                         | Sampai akun dihapus. Akun yang tidak aktif tidak dihapus otomatis                                                                                          |
| Login GitHub: ID dan username GitHub, email utama yang terverifikasi, alamat avatar, access token dan refresh token terenkripsi                                                                             | Masuk dengan GitHub, memeriksa aksesmu ke installation dan repository          | Perjanjian                                         | Sampai akun dihapus. Token diganti setiap kamu login ulang                                                                                                 |
| Login Google, kalau kamu memakainya: ID Google, nama, email, alamat avatar. Token Google tidak disimpan                                                                                                     | Masuk dengan Google                                                            | Perjanjian                                         | Sampai akun dihapus                                                                                                                                        |
| GitHub App: akun atau organisasi GitHub, jenis akun, cakupan repository, izin App, status                                                                                                                   | Mengambil source repository privat atau organisasi yang kamu pilih             | Perjanjian                                         | Sampai akun dihapus, kecuali masih dipakai pengguna atau proyek lain. Kamu bisa mencabut App di pengaturan GitHub                                          |
| Avatar yang kamu unggah (PNG, JPG, atau WEBP, maksimal 1 MB)                                                                                                                                                | Tampilan profil                                                                | Perjanjian                                         | Sampai kamu ganti atau hapus, atau sampai akun dihapus. Berkasnya bisa dibuka siapa saja yang punya alamatnya                                              |
| Jawaban onboarding: dari mana kamu tahu Sakala dan peranmu. Boleh dilewati                                                                                                                                  | Memahami siapa yang memakai pilot                                              | Kepentingan sah                                    | Sampai akun dihapus                                                                                                                                        |
| Catatan persetujuan dokumen: dokumen, versi, jenis tindakan, jalur, dan waktu. Termasuk catatan bahwa pemberitahuan privasi sudah ditampilkan. Tidak menyimpan alamat IP                                    | Menunjukkan versi yang kamu setujui                                            | Perjanjian                                         | Sampai akun dihapus                                                                                                                                        |
| Proyek: nama, slug, alamat repository, branch, domain, konfigurasi build, hasil analisis repository, alamat thumbnail kalau kamu isi                                                                        | Menjalankan proyekmu                                                           | Perjanjian                                         | Sampai proyek dihapus, ditambah 30 hari                                                                                                                    |
| Riwayat deployment: siapa yang memicu, branch, commit SHA, pesan commit, status, keterangan kegagalan                                                                                                       | Menampilkan riwayat dan penyebab gagal                                         | Perjanjian                                         | Sampai proyek dihapus, ditambah 30 hari. Tidak ikut terhapus saat log dipangkas                                                                            |
| Variabel dan secret proyek, disimpan terenkripsi                                                                                                                                                            | Dikirim ke container proyekmu                                                  | Perjanjian                                         | Sampai kamu hapus, atau sampai proyek dihapus ditambah 30 hari. Kalau akun dihapus, langsung dihapus saat itu juga                                         |
| Log build, log runtime, dan event deployment                                                                                                                                                                | Membantumu memahami dan memperbaiki deployment                                 | Perjanjian                                         | 7 hari setelah deployment selesai atau dibatalkan. Pemangkasan berjalan sekali sehari. Saat disk darurat, log bisa dihapus lebih cepat tanpa pemberitahuan |
| Sesi: alamat IP, user agent, waktu aktivitas terakhir                                                                                                                                                       | Menjaga kamu tetap masuk, keamanan akun                                        | Perjanjian dan kepentingan sah                     | Sesi berakhir setelah 120 menit tanpa aktivitas. Baris lama dibersihkan berkala                                                                            |
| Alamat IP dan permintaan ke API: batas percobaan login, pendaftaran, dan API, serta log server web                                                                                                          | Mencegah penyalahgunaan, mencari penyebab gangguan                             | Kepentingan sah                                    | Data batas percobaan hanya sebentar. Log server web tersimpan di log container dan belum punya batas waktu tertulis                                        |
| Jejak audit: ID pelaku, tindakan, objek, waktu, dan keterangannya. Pembacaan nilai secret dicatat dengan nama variabelnya, tidak pernah nilainya. Untuk tindakan admin, juga alamat IP dan user agent admin | Mempertanggungjawabkan tindakan sensitif, menangani abuse                      | Kepentingan sah                                    | Belum ada batas waktu, dan belum ada penghapusan otomatis. Datanya tetap ada setelah proyek atau akun dihapus                                              |
| Sinyal penggunaan: hitungan agregat, misalnya jumlah deployment atau kegagalan berulang                                                                                                                     | Memantau kesehatan pilot dan tanda abuse                                       | Kepentingan sah                                    | 30 hari                                                                                                                                                    |
| Masukan: kategori, isi pesan, proyek atau deployment yang kamu kaitkan, dan pilihanmu soal evaluasi pilot                                                                                                   | Dibaca tim Sakala. Dipakai untuk evaluasi pilot hanya kalau kamu mencentangnya | Kepentingan sah. Untuk evaluasi pilot: persetujuan | Belum ada batas waktu otomatis. Ikut terhapus saat akun dihapus                                                                                            |
| Notifikasi dalam aplikasi dan preferensinya                                                                                                                                                                 | Memberi tahu hasil deployment, masalah proyek, penangguhan, dan keamanan akun  | Perjanjian                                         | Notifikasi 90 hari, atau sampai akun dihapus kalau lebih dulu. Preferensi sampai akun dihapus                                                              |
| Email dari Sakala: verifikasi, reset kata sandi, perubahan email, pemberitahuan pendaftaran ganda, konfirmasi penghapusan akun, dan penangguhan proyek beserta alasannya                                    | Keamanan dan pengelolaan akun                                                  | Perjanjian                                         | Tautan verifikasi dan reset berlaku 60 menit. Salinan pengiriman di Brevo mengikuti aturan Brevo                                                           |
| Slug proyek yang sudah dihapus                                                                                                                                                                              | Mencegah alamat lama dipakai orang lain                                        | Kepentingan sah                                    | Permanen, hanya slug dan waktunya                                                                                                                          |
| Email yang kamu kirim ke kami, termasuk laporan abuse                                                                                                                                                       | Menjawab dan menangani laporanmu                                               | Kepentingan sah                                    | Belum ada batas waktu tertulis                                                                                                                             |

Arti kolom "Dasar":

- **Perjanjian:** kami memprosesnya untuk menjalankan layanan yang kamu minta sesuai Syarat Layanan (Pasal 20 ayat (2) huruf b).
- **Kepentingan sah:** kami memprosesnya untuk menjaga keamanan dan memahami pilot, dengan memperhatikan keseimbangan dengan hakmu (Pasal 20 ayat (2) huruf f).
- **Persetujuan:** hanya untuk memakai masukan dalam evaluasi pilot, lewat kotak centang di form masukan (Pasal 20 ayat (2) huruf a).

Kami juga bisa memproses data kalau hukum mewajibkannya (Pasal 20 ayat (2) huruf c).

Kami tidak menjual data pribadi dan tidak memakainya untuk iklan. Notifikasi tidak dipakai untuk pemasaran.

## Source code, log, dan apa yang terlihat publik

Repository publik dibaca tanpa kredensial milikmu. Source repository privat diambil lewat token GitHub App yang berumur pendek dan dibatasi ke satu repository. Token itu tidak disimpan di database. Untuk membaca commit terbaru sebuah branch, API memakai token GitHub App berumur pendek yang berlaku untuk seluruh installation, dan menyimpannya sementara di cache dalam bentuk terenkripsi.

Saat build, Sakala Agent mengambil source code ke runtime node. Folder kerjanya dibersihkan, tetapi image hasil build bisa tetap ada di node sampai dibersihkan operator. Belum ada jadwal tetap untuk pembersihan image.

Log dan variabel proyek tidak publik. Yang bisa melihatnya hanya pemilik proyek dan admin Sakala.

URL proyek (`<slug>.run.sakala.dev`) publik dan bisa dibuka siapa saja. Slug dibuat dari nama proyek, jadi jangan memakai nama yang mengungkap data pribadi.

Penyaringan secret di log tidak sempurna. Sakala menyaring pola token umum dan nilai persis secret proyekmu, tetapi nilai di bawah 8 karakter, potongan secret, dan token tanpa pola yang dikenali bisa lolos. Jangan mencetak secret ke log.

## Data pengguna aplikasimu

Kalau aplikasimu mengumpulkan data orang lain, kamulah yang menentukan data apa dan untuk apa, dan kamu yang bertanggung jawab kepada mereka. Halaman ini tidak berlaku untuk pengumpulan data oleh aplikasimu.

Sakala tetap menjalankan aplikasinya. Karena itu, apa pun yang aplikasimu cetak ke log, termasuk alamat IP atau data pengunjung, ikut tersimpan di log proyekmu selama 7 hari dan bisa dibaca admin Sakala.

## Cookie dan penyimpanan di browser

Situs `sakala.dev` tidak memasang cookie analitik atau pelacak iklan. Font di situs dan di Console disajikan dari server kami sendiri.

Console memakai dua cookie, dan keduanya perlu supaya login berjalan:

- `__Host-sakala-api-session` menyimpan sesi login. Cookie ini hanya berlaku untuk `api.sakala.dev`, jadi tidak terkirim ke aplikasi di `*.run.sakala.dev`.
- `XSRF-TOKEN` melindungi dari permintaan palsu dari situs lain. Cookie ini berlaku untuk seluruh `sakala.dev`, jadi ikut terkirim ke aplikasi di `*.run.sakala.dev`. Ini bukan cookie sesi, dan tidak bisa dipakai sendirian untuk masuk ke akunmu.

Console juga menyimpan beberapa catatan di local storage browser: cara login terakhir, halaman yang ingin kamu tuju setelah login, penanda sesi aktif, dan waktu tunggu setelah terkena batas percobaan. Catatan ini tidak dikirim ke pihak lain.

Kalau avatarmu berasal dari GitHub atau Google, browser memuat gambarnya langsung dari penyedia itu, sehingga penyedia itu bisa melihat alamat IP-mu.

## Pihak lain yang ikut memproses data

| Pihak                                                                                              | Perannya                                                                                                   | Data yang terlibat                                                                                                                              |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| PT Media Sarana Data (GMEDIA)                                                                      | Menyediakan server yang menjalankan Sakala                                                                 | Semua data yang tersimpan di server. Pengelola server secara teknis bisa menjangkaunya                                                          |
| [Cloudflare](https://www.cloudflare.com/privacypolicy/)                                            | DNS, proxy untuk `sakala.dev`, `app.sakala.dev`, dan `api.sakala.dev`, serta penerusan email `@sakala.dev` | Alamat IP, alamat yang diminta, data permintaan, dan email yang kamu kirim ke kami. Lalu lintas `*.run.sakala.dev` tidak lewat proxy Cloudflare |
| [GitHub](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) | Login, GitHub App, repository, webhook                                                                     | Identitas GitHub, token, dan data repository                                                                                                    |
| [Brevo](https://www.brevo.com/legal/privacypolicy/)                                                | Mengirim email akun                                                                                        | Alamat email, nama, dan isi email                                                                                                               |
| [Google](https://policies.google.com/privacy)                                                      | Login Google, hanya kalau kamu memakainya                                                                  | Identitas Google                                                                                                                                |

Email dari Sakala memakai pelacakan Brevo, dalam mode anonim. Setiap email memuat piksel kecil yang mencatat bahwa email dibuka. Setiap tautan di email lebih dulu melewati pengalihan Brevo di `r.em.sakala.dev`, baru sampai ke tujuannya. Itu berlaku untuk semua tautan, termasuk tautan verifikasi dan reset kata sandi, jadi alamat tujuan beserta tokennya ikut melewati server Brevo.

Basis data, cache, dan penyimpanan avatar (PostgreSQL, Valkey, dan object storage) berjalan di server Sakala sendiri, bukan di layanan pihak ketiga.

## Lokasi data dan transfer ke luar Indonesia

Server Sakala disediakan GMEDIA, dan alamat IP publiknya terdaftar di Indonesia. Kami belum menerbitkan lokasi pusat datanya secara rinci.

Sebagian data keluar dari Indonesia lewat penyedia di tabel atas. Menurut kebijakan masing-masing penyedia, Cloudflare berkedudukan di Amerika Serikat dan menyimpan data terutama di Amerika Serikat dan Kawasan Ekonomi Eropa. GitHub beroperasi di Amerika Serikat dan Belanda, dan bisa memproses data di beberapa lokasi. Brevo berkedudukan di Prancis.

UU PDP Pasal 56 mengatur transfer seperti ini. Kami belum menyelesaikan penilaian tingkat pelindungan di negara tujuan, dan belum punya perjanjian tersendiri yang dinegosiasikan dengan penyedia tersebut. Kalau kamu ingin tahu lebih lanjut, tanyakan ke [`privacy@sakala.dev`](mailto:privacy@sakala.dev).

## Keamanan dan akses internal

Yang sudah berjalan:

- kata sandi disimpan sebagai hash;
- token OAuth dan nilai variabel disimpan terenkripsi;
- koneksi ke Console, API, dan URL proyek memakai HTTPS;
- log disaring di agent dan di API;
- basis data dan avatar yang diunggah dicadangkan setiap hari dalam bentuk terenkripsi;
- tindakan sensitif admin, seperti stop, suspend, dan membuka kembali proyek, dicatat di jejak audit;
- setiap pembacaan nilai secret dicatat di jejak audit, dengan nama variabelnya dan tanpa nilainya.

Yang belum selesai:

- runtime tersandbox gVisor belum aktif di production, jadi container pengguna masih berbagi kernel dengan host-nya;
- belum ada pembatasan lalu lintas keluar dari container pengguna;
- belum ada jalur isolasi tersendiri untuk build;
- pembacaan log oleh admin belum dicatat di jejak audit;
- jejak audit belum punya batas waktu simpan.

Admin Sakala bisa membaca log dan nilai secret semua proyek untuk menangani insiden atau abuse. Operator server punya akses ke basis data. Kami tidak mengklaim sertifikasi keamanan apa pun.

## Backup

Basis data Sakala dan avatar yang kamu unggah dicadangkan setiap hari dalam bentuk terenkripsi. Kami menyimpan 14 salinan lengkap terbaru, yang dalam keadaan normal mencakup sekitar 14 hari. Backup ini untuk memulihkan layanan saat terjadi kerusakan, dan kami tidak menjanjikan pemulihan data.

Akibatnya, data yang sudah kamu hapus bisa tetap ada di backup sekitar 14 hari setelah terhapus. Kalau pencadangan gagal atau tertunda, salinan lama bisa tersimpan lebih lama. Berkas di dalam container tidak ikut dicadangkan.

## Menghapus proyek

Kamu bisa menghapus proyek sendiri lewat tab Pengaturan di halaman proyek. Proyek langsung hilang dari Console, dan belum ada cara memulihkannya. Kalau runtime node sedang offline, aplikasinya bisa tetap melayani sampai node itu kembali.

Data proyek dihapus permanen 30 hari kemudian oleh tugas harian, yaitu proyek, deployment, log, event, variabel dan secret, serta notifikasinya. Kalau runtime node belum menyelesaikan penghentian aplikasinya saat itu, data proyek menunggu node tersebut, tetapi variabel dan secret tetap dihapus tepat waktu. Yang tetap ada: slug, jejak audit, masukan yang pernah kamu kirim (tanpa kaitan ke proyek), sinyal penggunaan sampai masa simpannya habis, salinan di backup sekitar 14 hari, dan image yang belum dibersihkan dari node.

## Menghapus akun

Kamu bisa menghapus akunmu sendiri di Console. Kamu perlu mengetik ulang email akun dan kata sandi. Kalau akunmu tidak punya kata sandi, kamu perlu login ulang lewat GitHub atau Google dalam 15 menit terakhir. Penghapusan tidak bisa dibatalkan, dan kamu tidak perlu menyetujui syarat versi terbaru untuk melakukannya.

Kalau kamu tidak bisa masuk ke akunmu, kirim permintaan ke [`privacy@sakala.dev`](mailto:privacy@sakala.dev) dan kami mengerjakannya manual setelah memastikan identitasmu.

Yang terjadi setelah akun dihapus:

| Data                                                                                                                                                                               | Yang terjadi                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Akun, login GitHub atau Google beserta tokennya, avatar yang kamu unggah, jawaban onboarding, masukan, notifikasi, catatan persetujuan dokumen, semua sesi, token reset kata sandi | Langsung dihapus                                                                                                                                                                                                 |
| Variabel dan secret semua proyekmu, termasuk salinannya untuk deployment                                                                                                           | Langsung dihapus                                                                                                                                                                                                 |
| Hubungan akunmu dengan GitHub App                                                                                                                                                  | Langsung dihapus. Data installation ikut dihapus, kecuali masih dipakai pengguna atau proyek lain                                                                                                                |
| Aplikasimu                                                                                                                                                                         | Dihentikan. Kalau runtime node sedang offline, aplikasinya bisa tetap melayani sampai node itu kembali                                                                                                           |
| Proyek dan riwayat deployment, termasuk nama proyek, alamat repository, dan pesan commit                                                                                           | Tetap ada tanpa pemilik, lalu dihapus permanen 30 hari setelah akun dihapus, atau setelah runtime node menyelesaikan penghentian aplikasinya kalau itu lebih lama                                                |
| Log dan event deployment                                                                                                                                                           | Dipangkas setelah 7 hari seperti biasa, dan sisanya ikut terhapus bersama proyek                                                                                                                                 |
| Jejak audit                                                                                                                                                                        | Tetap ada tanpa batas waktu. Isinya ID akunmu, tindakan, objek, dan keterangannya, termasuk nama variabel secret yang pernah dibaca dan catatan bahwa akun dihapus. Emailmu tidak dicatat di catatan penghapusan |
| Slug proyek                                                                                                                                                                        | Tetap ada permanen, supaya alamat lama tidak dipakai orang lain                                                                                                                                                  |
| Sinyal penggunaan                                                                                                                                                                  | Tetap ada sampai masa simpan 30 hari habis                                                                                                                                                                       |
| Backup basis data dan avatar                                                                                                                                                       | Salinan tetap ada sekitar 14 hari, dan bisa lebih lama kalau pencadangan gagal atau tertunda                                                                                                                     |
| Image di runtime node                                                                                                                                                              | Tetap ada sampai dibersihkan operator                                                                                                                                                                            |
| Log server web dan email yang kamu kirim ke kami                                                                                                                                   | Tetap ada, dan belum punya batas waktu tertulis                                                                                                                                                                  |

Kami mengirim email konfirmasi ke alamat akunmu setelah penghapusan selesai. Email yang sudah terkirim tidak bisa kami tarik dari Brevo atau dari kotak masukmu. Setelah itu, alamat emailmu bisa dipakai mendaftar lagi sebagai akun baru.

Menghapus akun tidak mencabut GitHub App di sisi GitHub, jadi cabut sendiri di pengaturan GitHub-mu. Belum ada tombol untuk itu di Console.

Akun admin Sakala tidak bisa dihapus lewat jalur ini. Peran adminnya harus dicabut lebih dulu.

## Hakmu

UU PDP memberi kamu hak berikut:

- mendapat informasi tentang siapa yang memproses datamu dan untuk apa (Pasal 5);
- melengkapi, memperbarui, dan memperbaiki data (Pasal 6);
- mengakses dan mendapat salinan data (Pasal 7);
- mengakhiri pemrosesan, menghapus, atau memusnahkan data (Pasal 8);
- menarik kembali persetujuan (Pasal 9);
- mengajukan keberatan atas keputusan yang hanya didasarkan pada pemrosesan otomatis, kalau berakibat hukum atau berdampak signifikan (Pasal 10);
- menunda atau membatasi pemrosesan (Pasal 11);
- menggugat dan menerima ganti rugi atas pelanggaran (Pasal 12);
- mendapatkan data dalam format yang lazim dan mengirimkannya ke pengendali data lain, sesuai syaratnya (Pasal 13).

Beberapa hak punya pengecualian (Pasal 15).

Nama, username, avatar, email, kata sandi, dan preferensi notifikasi bisa kamu ubah sendiri di Console.

Kamu juga bisa mengunduh salinan datamu sendiri di Console dalam format JSON, paling banyak 3 kali per jam. Salinan itu berisi akun, catatan persetujuan, login GitHub atau Google, GitHub App, proyek, deployment, nama variabel, notifikasi, dan masukan. Setiap jenis data dibatasi 1.000 item terbaru, dan berkasnya menyebut kalau ada yang terpotong. Nilai variabel, token, kata sandi, log deployment, dan jejak audit tidak ikut.

Untuk hal lain, termasuk akses ke data yang tidak ikut di salinan, kirim permohonan ke [`privacy@sakala.dev`](mailto:privacy@sakala.dev) dari email akunmu.

Kami berusaha menjawab paling lambat 3 x 24 jam. Itu batas yang UU PDP tetapkan untuk perbaikan data (Pasal 30), akses (Pasal 32), penghentian setelah persetujuan ditarik (Pasal 40), serta penundaan dan pembatasan (Pasal 41). Kalau ada yang tidak bisa kami penuhi, kami sampaikan alasannya.

## Kalau terjadi kegagalan pelindungan data

Kalau terjadi kegagalan pelindungan data pribadi, kami memberi tahu kamu dan lembaga yang berwenang secara tertulis paling lambat 3 x 24 jam, sesuai UU PDP Pasal 46. Pemberitahuannya memuat data apa yang terungkap, kapan dan bagaimana terungkapnya, serta upaya penanganan dan pemulihannya.

## Usia

Kalau kamu belum berusia 18 tahun, kamu baru boleh memakai Sakala dengan persetujuan orang tua atau wali. UU PDP Pasal 25 ayat (2) mewajibkan persetujuan itu untuk pemrosesan data anak. Saat mendaftar, kamu menyatakan sudah berusia 18 tahun atau sudah mendapat persetujuan tersebut. Sakala tidak memeriksa pernyataan ini.

Kalau kamu orang tua atau wali dan tidak menyetujui anakmu yang belum berusia 18 tahun memakai Sakala, tulis ke [`privacy@sakala.dev`](mailto:privacy@sakala.dev). Akunnya akan kami tutup dan datanya kami hapus.

## Perubahan pemberitahuan ini

Setiap perubahan mendapat versi baru. Perubahan yang berarti kami umumkan lebih dulu di situs ini dan lewat email akun sebelum berlaku. Versi baru pemberitahuan ini tidak meminta persetujuanmu.
