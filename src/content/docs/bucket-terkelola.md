---
title: Bucket Terkelola
description: Bucket S3 milik workspace yang dipasang ke proyek, dengan variabel AWS_* yang diisi Sakala. Pilot terbatas yang dibuka per workspace.
track: panduan
section: Panduan deploy
order: 4.15
---

# Bucket Terkelola

Bucket terkelola adalah tempat menyimpan berkas, misalnya gambar upload atau PDF, yang dibuat dan dijalankan Sakala untukmu. Bucket ini memakai API S3, jadi library S3 yang biasa dipakai Laravel dan Node bisa langsung membacanya. Kamu memasangnya ke proyek, lalu Sakala mengisi variabel `AWS_*` di aplikasimu saat deploy, tanpa perlu menyalin kunci.

> **Status per 23 November 2026: pilot terbatas yang dibuka per workspace.** Kuota bucket bawaan setiap workspace adalah 0, jadi workspace belum bisa membuat bucket sampai admin Sakala memberinya kuota lewat profil batas. Workspace tanpa kuota melihat **Workspace ini belum bisa membuat bucket** di halaman **Bucket**. Kuota pertama di `sakala.dev` baru dibuka setelah versi [Pemberitahuan Privasi](/privasi) yang mencakup isi bucket berlaku. Cara memintanya ada di [Meminta kuota](#meminta-kuota). Sampai dibuka, pakai object storage di luar Sakala seperti di [Penyimpanan File](/docs/penyimpanan-file).

Fitur ini juga bergantung pada server Sakala yang kamu pakai. Kalau server itu belum terhubung ke server penyimpanan, halaman **Bucket** menampilkan **Bucket terkelola belum tersedia di server ini**. Selama pilot, server penyimpanan berjalan di mesin yang sama dengan aplikasi dan database terkelola, di satu disk tanpa salinan cadangan langsung, jadi gangguan di mesin itu mengenai ketiganya. Belum ada jaminan uptime, dan jangan menyimpan data sensitif di sini selama pilot.

## Meminta kuota

Kuota bucket diberikan admin Sakala lewat profil batas workspace, sama seperti kuota database. Untuk memintanya, buka diskusi baru di [GitHub Discussions, kategori Q&A](https://github.com/gmedia/sakala/discussions/categories/q-a) di repository `gmedia/sakala`. Sebutkan nama workspace-mu, apakah workspace pribadi atau tim, untuk apa bucket-nya dipakai, dan kira-kira berapa besar berkasnya. Discussions bisa dibaca publik, jadi jangan menulis secret key, token, atau data lain yang rahasia di sana. Selama pilot terbatas, belum tentu setiap permintaan bisa dipenuhi.

Kuota workspace terdiri dari dua angka: jumlah bucket, dan jatah penyimpanan dalam MB yang dibagi ke bucket-bucket itu.

## Yang kamu dapat

- Satu bucket S3 dengan access key-nya sendiri. Kunci itu hanya berlaku untuk bucket itu, tidak untuk bucket lain.
- Bucket milik workspace, bukan milik satu proyek. Ia bisa dibuat tanpa proyek, tetap ada saat proyek yang memakainya dihapus, dan bisa dipasang ke beberapa proyek di workspace yang sama.
- Variabel koneksi yang diisi Sakala saat deploy, dan secret key yang bisa diganti kapan saja.
- Bucket privat. Browser membuka berkas lewat link sementara yang dibuat aplikasimu, lihat [Link sementara](#link-sementara).
- Backup setiap malam yang dijalankan operator, lihat [Backup dan risiko kehilangan data](#backup-dan-risiko-kehilangan-data).

## Membuat dan memasang bucket

Ada dua jalan.

**Dari halaman Bucket.** Buka **Bucket** di sidebar, tekan **Buat bucket**, lalu isi nama dan kuota dalam MB. Nama itu hanya untuk ditampilkan di Sakala; nama bucket di server dibuat acak, jadi link sementara tidak memperlihatkan nama workspace atau proyekmu. Kuota awalnya sudah terisi, dan diambil dari jatah penyimpanan workspace. Setelah statusnya **Siap**, pasang ke proyek dari halaman bucket.

**Dari halaman proyek.** Kalau workspace-mu masih punya kuota bucket, halaman proyek menawarkan **Buat bucket untuk proyek ini**. Sakala membuat bucket-nya dan langsung memasangnya ke proyek itu.

Membuat, memasang, melepas, mengubah kuota, mengganti secret key, dan menghapus bucket bisa dilakukan pemilik dan anggota workspace. Pengamat hanya bisa melihat. Membuat bucket juga mensyaratkan kamu sudah menyetujui versi terbaru dokumen hukum Sakala, sama seperti membuat proyek.

Setelah memasang bucket, tekan **Redeploy** di proyek itu supaya aplikasinya menerima variabel bucket. Selama commit dan pengaturan build-nya sama, redeploy ini [tidak mem-build ulang](/docs/variabel-dan-secret#redeploy-tanpa-build). Satu proyek hanya bisa memakai satu bucket, karena nama variabelnya tetap.

## Variabel yang diisi Sakala

Proyek yang terpasang menerima variabel ini di setiap deployment berikutnya:

| Variabel                      | Isi                                                                                                                   |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `AWS_ENDPOINT_URL_S3`         | Alamat endpoint S3, misalnya `https://s3.sakala.app`. Dibaca sendiri oleh SDK AWS yang mendukung endpoint per layanan |
| `AWS_ENDPOINT`                | Alamat yang sama. Dibaca disk `s3` Laravel                                                                            |
| `AWS_DEFAULT_REGION`          | Region S3 untuk tanda tangan permintaan, misalnya `us-east-1`. Ini bukan region tempat proyekmu berjalan              |
| `AWS_REGION`                  | Region yang sama. Dibaca SDK AWS for JavaScript v3, yang tidak membaca `AWS_DEFAULT_REGION`                           |
| `AWS_BUCKET`                  | Nama bucket di server                                                                                                 |
| `AWS_ACCESS_KEY_ID`           | Access key ID. Tetap sama walaupun secret key diganti                                                                 |
| `AWS_SECRET_ACCESS_KEY`       | Secret access key                                                                                                     |
| `AWS_USE_PATH_STYLE_ENDPOINT` | `true`, karena endpoint ini hanya menerima alamat _path-style_, yaitu `https://endpoint/nama-bucket/berkas`           |

Variabel ini tidak disimpan sebagai variabel proyek. Tab **Variabel** menampilkannya sebagai daftar terpisah tanpa nilai. Kalau proyekmu punya variabel dengan nama yang sama, variabel proyek yang dipakai, dan Console memberinya tanda **Ditimpa proyek**. Hati-hati menimpa `AWS_ACCESS_KEY_ID` atau `AWS_SECRET_ACCESS_KEY`: aplikasimu lalu mengirim kunci itu ke endpoint bucket Sakala, dan permintaannya ditolak. Console memberi peringatan khusus untuk kedua nama itu.

Sakala sengaja tidak mengisi `AWS_ENDPOINT_URL`. SDK AWS versi sekarang memperlakukan variabel itu sebagai alamat untuk **semua** layanan AWS, bukan hanya S3. Aplikasi yang juga memakai layanan AWS lain, misalnya SES untuk email atau SQS untuk antrean, akan mengirim permintaan itu ke server penyimpanan Sakala. `AWS_ENDPOINT_URL_S3` hanya berlaku untuk S3. Kalau aplikasimu memang memakai SES atau SQS dengan kunci AWS-mu sendiri, beri kunci itu nama variabel lain, misalnya lewat `config/services.php` di Laravel, supaya tidak bertabrakan dengan `AWS_ACCESS_KEY_ID` dari bucket.

Sakala juga tidak mengisi `FILESYSTEM_DISK` dan `AWS_URL`. `FILESYSTEM_DISK` mengubah ke mana Laravel menyimpan berkas secara bawaan, termasuk berkas yang memang ingin kamu simpan di dalam container, jadi keputusannya tetap di tanganmu. `AWS_URL` hanya berguna untuk bucket publik, dan bucket terkelola selalu privat.

Setelah melepas bucket, proyek itu berhenti menerima variabelnya mulai deployment berikutnya.

## Laravel

Laravel sudah punya disk `s3` di `config/filesystems.php` yang membaca `AWS_ENDPOINT`, `AWS_DEFAULT_REGION`, `AWS_BUCKET`, kedua kunci, dan `AWS_USE_PATH_STYLE_ENDPOINT`. Yang perlu kamu tambahkan:

1. Driver-nya, lalu commit `composer.json` dan `composer.lock`:

   ```bash
   composer require league/flysystem-aws-s3-v3 "^3.0" --with-all-dependencies
   ```

2. Variabel proyek `FILESYSTEM_DISK=s3`, supaya kode yang tidak menyebut disk menyimpan ke bucket. Untuk proyek Laravel yang belum punya variabel itu, tab **Variabel** menampilkan tombol **Tambahkan FILESYSTEM_DISK=s3** yang membuatnya sebagai variabel proyek biasa.

3. **Redeploy** proyeknya.

Contoh menyimpan upload dan membuat link sementara, kode yang tidak menyebut disk `local` atau `public`, serta catatan soal `storage:link` ada di [Penyimpanan File, bagian Laravel](/docs/penyimpanan-file#laravel). Semuanya berlaku untuk bucket terkelola tanpa diubah.

## Node dan bahasa lain

Contoh modul `storage.js` di [Penyimpanan File, bagian Node](/docs/penyimpanan-file#node) membaca `AWS_ENDPOINT`, `AWS_DEFAULT_REGION`, `AWS_USE_PATH_STYLE_ENDPOINT`, `AWS_BUCKET`, dan kedua kunci, jadi ia berjalan dengan bucket terkelola tanpa diubah.

Untuk SDK atau bahasa lain, pastikan dua hal: endpoint diisi dari `AWS_ENDPOINT_URL_S3` atau `AWS_ENDPOINT`, dan path-style dinyalakan. Nama opsinya berbeda di tiap SDK, misalnya `forcePathStyle` di SDK JavaScript v3. Tanpa path-style, SDK menyusun alamat dengan nama bucket di depan domain, dan alamat seperti itu tidak dilayani endpoint ini.

## Link sementara

Bucket terkelola selalu privat. Tidak ada pengaturan untuk membukanya ke publik, jadi alamat berkas tanpa tanda tangan selalu ditolak. Supaya browser bisa membuka berkas, aplikasimu membuat _presigned URL_, yaitu link sementara yang ditandatangani dengan kunci bucket dan berhenti berlaku setelah waktu yang kamu tentukan. Di Laravel itu `Storage::temporaryUrl`, di Node `getSignedUrl`; contohnya ada di [Penyimpanan File](/docs/penyimpanan-file#laravel).

Buat link baru setiap kali halaman dimuat, dan pakai masa berlaku yang pendek, misalnya beberapa menit. Link yang sudah dibagikan tetap berlaku sampai waktunya habis, kecuali secret key diganti atau bucket dikunci admin Sakala. `Storage::url` dan `AWS_URL` tidak berguna di sini, karena keduanya untuk bucket publik.

## Melihat detail koneksi

Halaman bucket menampilkan endpoint, region, nama bucket, dan access key ID kepada semua anggota workspace, termasuk pengamat. Secret key hanya bisa dilihat pemilik workspace lewat **Tampilkan secret key**, dan setiap kali secret key ditampilkan, Sakala mencatatnya di log audit workspace. Proyek yang terpasang tetap menerimanya otomatis.

Setelah secret key ditampilkan, pemilik juga bisa menyalin semua variabel sekaligus dari blok **Untuk .env di laptop**. Berbeda dengan database terkelola, endpoint bucket bisa dijangkau dari internet, jadi kunci yang sama berjalan dari laptopmu atau server lain. Artinya juga, siapa pun yang memegang secret key bisa membaca dan menulis isi bucket. Jangan menaruhnya di repository, dan ganti secret key kalau kamu curiga kunci itu bocor.

## Mengganti secret key

Tekan **Ganti secret key** di halaman bucket. Access key ID tetap sama, hanya secret key yang berganti. Secret key lama langsung berhenti berlaku begitu server penyimpanan menggantinya, biasanya dalam beberapa detik. Aplikasi yang sedang berjalan masih membawa secret key lama, jadi tidak bisa membaca atau menulis berkas sampai di-redeploy.

Karena itu, **Redeploy otomatis proyek yang terpasang** sudah tercentang di dialognya. Begitu secret key baru aktif, Sakala men-deploy ulang versi yang sedang live di setiap proyek yang terpasang, biasanya tanpa build. Halaman bucket lalu menampilkan status tiap proyek, misalnya **Sudah memakai secret key baru**, atau alasan kalau redeploy otomatisnya dilewati. Kalau kamu menghapus centangnya, redeploy setiap proyek sendiri, dan ganti juga kunci di tempat lain yang memakainya, misalnya `.env` di laptopmu.

Ada jendela singkat saat server penyimpanan sedang mengganti kunci tetapi belum memastikan kunci mana yang berlaku. Selama itu, deploy proyek yang memakai bucket ini ditolak dengan pesan bahwa secret key bucket sedang diganti (kode `BUCKET_KEY_ROTATING`), push baru tidak di-deploy otomatis, dan **Tampilkan secret key** juga ditolak. Tunggu beberapa detik sampai penggantiannya selesai, lalu deploy lagi. Kalau server penyimpanan sampai tidak bisa memastikan hasilnya, penolakan ini berlanjut, dan halaman bucket memintamu menekan **Ganti secret key** sekali lagi untuk membereskannya.

Kalau penggantian secret key gagal, secret key lama tetap berlaku.

## Kuota dan batas

Setiap bucket punya kuota dalam MB, dan kuota itu batas keras: upload yang membuat isi bucket melewati kuota ditolak server penyimpanan. Kuota semua bucket di workspace dijumlahkan dan tidak boleh melewati jatah penyimpanan workspace. Kuota yang sudah dialokasikan tetap dihitung walaupun bucket-nya masih kosong.

| Batas                      | Nilai                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------ |
| Jumlah bucket dan jatah MB | Per workspace, dari profil batasnya. Kuota bawaan saat ini 0.                        |
| Kuota per bucket           | Kamu tentukan saat membuat bucket, dan bisa diubah. Upload yang melewatinya ditolak. |
| Bucket per proyek          | Satu. Satu bucket boleh dipasang ke beberapa proyek.                                 |
| Akses                      | Privat saja. Berkas dibuka lewat link sementara.                                     |

Kuota bisa diubah di pengaturan bucket. Menaikkan kuota diperiksa terhadap sisa jatah workspace. Menurunkan kuota di bawah isi bucket boleh, tetapi upload baru ditolak sampai isinya turun di bawah kuota.

Saat isi sebuah bucket mencapai 80% kuotanya, pemilik dan anggota workspace mendapat notifikasi **Bucket hampir penuh**. Saat mencapai 100%, halaman bucket menandainya **Penuh**, dan upload baru ditolak sampai ada berkas yang dihapus atau kuota dinaikkan. Berkas yang sudah ada tetap bisa dibaca, dan aplikasimu tetap bisa menghapusnya.

Setelah kuota diubah, server penyimpanan bisa menjawab penulisan pertama dengan `503 SlowDown`, kadang beberapa kali berturut-turut. SDK AWS mengulang permintaan seperti itu sendiri, jadi biasanya tidak terlihat. Kalau upload tetap gagal dengan `SlowDown` tepat setelah kuota diubah, ulangi beberapa detik kemudian.

Untuk berkas besar, SDK biasanya mengirimnya per bagian lewat _multipart upload_. Kuota diperiksa saat upload itu diselesaikan, bukan per bagian, jadi upload besar yang melewati kuota baru ditolak di akhir. Bagian dari upload yang tidak pernah diselesaikan dibuang server penyimpanan setelah sekitar 1 jam.

## Melepas dan menghapus

Melepas bucket di halaman bucket memutusnya dari proyek. Isinya tetap ada, dan proyek itu berhenti menerima variabelnya setelah redeploy berikutnya.

Bucket yang masih terpasang ke proyek tidak bisa dihapus. Lepas dulu dari semua proyek, lalu hapus bucket dari pengaturannya dengan mengetik ulang namanya. Menghapus bucket langsung menghapus semua berkas di dalamnya beserta kuncinya dari server penyimpanan, dan tidak bisa dibatalkan dari Console. Salinannya tetap ada di backup sampai sekitar 14 hari.

Menghapus proyek tidak menghapus bucket-nya; bucket hanya dilepas. Menghapus akun menghapus semua bucket di workspace pribadimu. Tim yang masih punya bucket tidak bisa dihapus sampai bucket-nya dihapus.

## Backup dan risiko kehilangan data

Operator Sakala mem-backup isi setiap bucket setiap malam dalam bentuk terenkripsi, lalu menyalinnya ke server lain. Salinan itu disimpan sekitar 14 hari. Data yang kamu hapus, termasuk bucket yang dihapus, bisa masih ada di backup selama masa simpan itu.

Selama pilot, server penyimpanan menyimpan bucket di satu disk tanpa salinan langsung di disk lain. Kalau disk atau mesin itu rusak, berkas yang ditulis setelah backup terakhir hilang, yaitu sampai sekitar 24 jam terakhir. Jadi jangan jadikan bucket ini satu-satunya tempat menyimpan berkas yang penting.

Backup menyalin setiap objek sebagai berkas biasa, dan itu membawa dua batasan:

- Key yang tidak bisa menjadi berkas dilewati dan tidak ikut di-backup. Contohnya penanda folder yang diakhiri `/`, misalnya `folder/`, dan key yang sekaligus menjadi awalan key lain, misalnya `a` di samping `a/b`. Hindari dua bentuk key ini. Kamu tidak butuh penanda folder, karena di S3 folder terbentuk sendiri dari `/` di dalam key.
- Metadata objek tidak ikut tersimpan. Setelah dipulihkan, `Content-Type` setiap berkas ditebak dari ekstensinya. Mengisi `Content-Type` saat upload tetap boleh dan berguna untuk pemakaian biasa, tetapi nilainya bisa berubah setelah pemulihan. Jadi beri berkas ekstensi yang sesuai isinya, misalnya `.jpg` atau `.pdf`.

Belum ada tombol unduh isi bucket atau pemulihan di Console. Kalau isi bucket perlu dipulihkan dari backup, maintainer yang melakukannya, dan selama pilot pemulihan belum dijamin. Pertanyaan soal ini bisa diajukan di [GitHub Discussions, kategori Q&A](https://github.com/gmedia/sakala/discussions/categories/q-a). Discussions bisa dibaca publik, jadi jangan menulis secret key atau isi berkasmu di sana. Kamu sendiri tetap bisa menyalin isi bucket kapan saja dengan alat S3 biasa dari laptop, memakai kunci dari **Untuk .env di laptop**.

## Yang belum didukung

- **Bucket publik.** Semua bucket privat, tanpa akses anonim dan tanpa bucket policy.
- **Hosting website statis** dari bucket.
- **Upload langsung dari browser** ke bucket, karena pengaturan CORS belum tersedia. Untuk sekarang, kirim upload ke aplikasimu, lalu aplikasimu yang menyimpannya ke bucket.
- **Unduh isi bucket dan pemulihan sendiri** dari Console.
- **Lebih dari satu bucket per proyek.**

Alasan di balik batas-batas ini ada di [ADR-021](/docs/proyek/adr#adr-021--managed-object-storage-for-projects).

## Langkah berikutnya

Kalau workspace-mu belum bisa membuat bucket, ikuti [Penyimpanan File](/docs/penyimpanan-file) untuk memakai object storage di luar Sakala dengan nama variabel yang sama. Untuk data terstruktur, siapkan [database terkelola](/docs/database-terkelola). Untuk cara variabel bekerja secara umum, baca [Variabel dan Secret](/docs/variabel-dan-secret).
