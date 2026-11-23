---
title: Database Terkelola
description: Database PostgreSQL milik workspace yang dipasang ke proyek, dengan DATABASE_URL dan DB_* yang diisi Sakala. Saat ini masih pilot terbatas.
track: panduan
section: Panduan deploy
order: 3.8
---

# Database Terkelola

Database terkelola adalah database PostgreSQL yang dibuat dan dijalankan Sakala untukmu. Kamu memasangnya ke proyek, lalu Sakala mengisi `DATABASE_URL` dan variabel `DB_*` di aplikasimu saat deploy, tanpa perlu menyalin password.

> **Status per 23 November 2026: pilot terbatas.** Di `sakala.dev`, kuota database bawaan setiap workspace adalah 0, jadi kebanyakan workspace belum bisa membuat database. Database baru dibuka untuk beberapa workspace yang diberi kuota oleh admin Sakala. Workspace lain melihat pesan **Workspace ini belum bisa membuat database** saat mencoba membuat database. Sampai dibuka, pakai [database eksternal](/docs/database-eksternal).

Fitur ini juga bergantung pada server Sakala yang kamu pakai. Kalau server itu belum terhubung ke server database, halaman **Database** menampilkan **Database terkelola belum tersedia di server ini**. Selama pilot di `sakala.dev`, server database berjalan di mesin yang sama dengan aplikasi sampai ada server database tersendiri, jadi gangguan di mesin itu mengenai keduanya. Belum ada jaminan uptime, dan jangan menyimpan data sensitif di sini selama pilot.

## Yang kamu dapat

- PostgreSQL 18, satu database dengan user dan password-nya sendiri. Aplikasi MySQL perlu disesuaikan, karena yang tersedia hanya PostgreSQL.
- Database milik workspace, bukan milik satu proyek. Ia bisa dibuat tanpa proyek, tetap ada saat proyek yang memakainya dihapus, dan bisa dipasang ke beberapa proyek di workspace yang sama.
- Variabel koneksi yang diisi Sakala saat deploy, koneksi wajib TLS, dan password yang bisa diganti kapan saja.
- Backup setiap malam yang dijalankan operator. Pemulihannya belum bisa dilakukan sendiri, lihat [Backup dan pemulihan](#backup-dan-pemulihan).

## Membuat database

Ada dua jalan.

**Saat membuat proyek.** Kalau Sakala menemukan tanda bahwa aplikasimu butuh database, misalnya `DB_CONNECTION` di `.env.example` atau folder migration Laravel, tahap **Persiapan** di langkah **Deploy** menampilkan **Aplikasi ini sepertinya butuh database**. Pilih **Buat database baru untuk proyek ini**. Sakala membuat database-nya, memasangnya, lalu memulai deploy pertama sendiri setelah database siap. Di riwayat, deployment itu tertulis **Deploy pertama setelah database siap**.

**Dari halaman Database.** Buka **Database** di sidebar, tekan **Buat database**, lalu isi nama dan region. Nama itu hanya untuk ditampilkan di Sakala; nama database dan user di server dibuat acak. Setelah statusnya **Siap**, pasang ke proyek lewat **Pasang ke proyek**.

Membuat, memasang, melepas, dan menghapus database bisa dilakukan pemilik dan anggota workspace. Pengamat hanya bisa melihat.

## Variabel yang diisi Sakala

Proyek yang terpasang menerima variabel ini di setiap deployment berikutnya:

| Variabel                                    | Isi                                                             |
| ------------------------------------------- | --------------------------------------------------------------- |
| `DATABASE_URL`                              | `postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require` |
| `DB_CONNECTION`                             | `pgsql`                                                         |
| `DB_HOST`, `DB_PORT`                        | Alamat server database di jaringan privat Sakala                |
| `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` | Nama database, user, dan password                               |

Variabel ini tidak disimpan sebagai variabel proyek. Tab **Variabel** menampilkannya sebagai daftar terpisah tanpa nilai. Kalau proyekmu punya variabel dengan nama yang sama, variabel proyek yang dipakai, dan Console memberinya tanda **Ditimpa proyek**. Untuk Laravel 11 ke atas, jangan mengisi `DB_URL`, karena Laravel membacanya lebih dulu daripada `DB_HOST` dan seterusnya.

Setelah memasang atau melepas database, tekan **Redeploy** di proyek itu. Selama commit dan pengaturan build-nya sama, redeploy ini [tidak mem-build ulang](/docs/variabel-dan-secret#redeploy-tanpa-build).

## Menjalankan migration

Sakala tidak menjalankan migration sendiri. Isi **Release command** di tab **Pengaturan**, misalnya `php artisan migrate --force` untuk Laravel atau `npx prisma migrate deploy` untuk Prisma. Perintah itu berjalan sekali setiap deployment, setelah build dan sebelum versi baru menerima trafik. Caranya ada di [Database dan Perintah Rilis](/docs/perintah-rilis).

Alamat database hanya bisa dijangkau aplikasi yang berjalan di Sakala, bukan dari laptopmu atau layanan lain, dan belum ada konsol SQL di Console. Jadi migration dan data awal harus dijalankan lewat aplikasimu. Kalau butuh data awal, tulis seeder yang aman dijalankan berulang, misalnya hanya mengisi kalau tabelnya masih kosong, karena perintah rilis berjalan di setiap deployment.

## Melihat detail koneksi

Halaman database menampilkan host, port, nama database, dan user kepada semua anggota workspace. Password dan `DATABASE_URL` hanya bisa dilihat pemilik workspace lewat **Tampilkan password**, dan setiap kali password ditampilkan, Sakala mencatatnya di log audit workspace. Proyek yang terpasang tetap menerima keduanya otomatis.

## Mengganti password

Tekan **Ganti password** di halaman database. Password lama langsung berhenti berlaku begitu server database menggantinya, biasanya dalam beberapa detik. Aplikasi yang sedang berjalan masih membawa password lama, jadi tidak bisa membuka koneksi baru ke database sampai di-redeploy.

Karena itu, **Redeploy otomatis proyek yang terpasang** sudah tercentang di dialognya. Begitu password baru aktif, Sakala men-deploy ulang versi yang sedang live di setiap proyek yang terpasang, biasanya tanpa build. Halaman database lalu menampilkan status tiap proyek, misalnya **Sudah memakai password baru**, atau alasan kalau redeploy otomatisnya dilewati. Kalau kamu menghapus centangnya, redeploy setiap proyek sendiri.

Kalau penggantian password gagal, password lama tetap berlaku.

## Extension

Di halaman database kamu bisa memasang `pgcrypto`, `citext`, `pg_trgm`, `unaccent`, `hstore`, dan `vector` (pgvector). Extension lain, termasuk PostGIS, belum tersedia.

## Batas

| Batas                            | Nilai                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Jumlah dan total ukuran database | Per workspace, dari profil batasnya. Kuota bawaan di `sakala.dev` saat ini 0.                          |
| Koneksi bersamaan                | 5 per database, dipakai bersama oleh semua replika semua proyek yang terpasang, termasuk backup malam. |
| Berkas sementara per sesi        | 1 GB, misalnya untuk sort yang besar.                                                                  |
| Region                           | Proyek hanya bisa memakai database di region yang sama.                                                |
| Database per proyek              | Satu. Satu database boleh dipasang ke beberapa proyek.                                                 |

Batas koneksi yang kecil berarti jumlah koneksi aplikasimu juga harus kecil. Hitung koneksi maksimum per proses dikali jumlah proses dan replika, lalu pastikan totalnya di bawah 5. Untuk Node dengan `pg`, itu berarti `max` yang kecil di `Pool`. Koneksi yang ditolak karena batas ini biasanya muncul di log sebagai `too many connections`.

Saat total ukuran database di workspace mencapai 80% kuota, pemilik dan anggota mendapat notifikasi. Saat mencapai 100%, semua database di workspace itu **Terkunci**: aplikasi tidak bisa terhubung sampai ukurannya turun atau kuotanya dinaikkan. Karena aplikasi tidak bisa terhubung, data di dalamnya juga tidak bisa dikurangi dari aplikasi, jadi hapus database yang tidak dipakai atau minta admin Sakala menaikkan kuota. Backup malam tetap berjalan selama terkunci.

## Melepas dan menghapus

**Lepas** di halaman database memutus database dari proyek. Datanya tetap ada, dan proyek itu berhenti menerima variabel koneksinya setelah redeploy berikutnya.

Database yang masih terpasang ke proyek tidak bisa dihapus. Lepas dulu dari semua proyek, lalu tekan **Hapus database**. Menghapus database menghapus datanya dari server database.

## Backup dan pemulihan

Operator Sakala mem-backup setiap database setiap malam dalam bentuk terenkripsi. Di `sakala.dev`, salinannya disimpan sekitar satu minggu di server database, dan salinan lain sekitar dua minggu di server terpisah. Artinya, data yang ditulis setelah backup terakhir, sampai sekitar satu hari, bisa hilang. Data yang kamu hapus juga bisa masih ada di backup selama masa simpan itu.

Belum ada tombol unduh dump atau pemulihan di Console. Kalau datamu perlu dipulihkan dari backup, maintainer yang melakukannya, dan selama pilot pemulihan belum dijamin. Pertanyaan soal ini bisa diajukan di [GitHub Discussions, kategori Q&A](https://github.com/gmedia/sakala/discussions/categories/q-a). Discussions bisa dibaca publik, jadi jangan menulis password, `DATABASE_URL`, atau isi datamu di sana.

Pemulihan selalu dijalankan dengan user database milikmu sendiri, tidak pernah sebagai superuser. Isi dump, seperti fungsi, trigger, dan nilai default, ikut dijalankan saat dipulihkan dengan hak user yang memulihkannya. Kalau pemulihan berjalan sebagai superuser, kode di dalam satu database ikut berjalan sebagai superuser, dan dari situ bisa membaca atau mengubah database milik orang lain di server yang sama. Alasan lengkapnya ada di [ADR-020](/docs/proyek/adr#adr-020--managed-postgresql-for-projects).

## Langkah berikutnya

Atur migration lewat [Database dan Perintah Rilis](/docs/perintah-rilis). Kalau workspace-mu belum bisa membuat database, ikuti [Menghubungkan Database Eksternal](/docs/database-eksternal). Untuk cara variabel bekerja secara umum, baca [Variabel dan Secret](/docs/variabel-dan-secret).
