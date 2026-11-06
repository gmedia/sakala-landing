---
version: penggunaan-wajar-v1
---

Sakala adalah layanan gratis untuk belajar dan membawa project kecil sampai punya URL publik. Jangan memakainya untuk merugikan orang lain atau menghabiskan kapasitas bersama. Kalau kamu melanggar, proyekmu bisa ditangguhkan. Kebijakan ini adalah bagian dari [Syarat Layanan](/syarat).

Melihat sesuatu yang berbahaya di `*.run.sakala.dev`? Laporkan ke [`abuse@sakala.dev`](mailto:abuse@sakala.dev).

## Yang dilarang

Kamu tidak boleh memakai Sakala untuk:

- **Phishing dan pencurian kredensial:** halaman yang meniru layanan lain atau memancing orang memasukkan kata sandi, kode OTP, atau data kartu.
- **Malware:** menyebarkan malware, menjalankan server command-and-control, atau memasang unduhan otomatis yang berbahaya.
- **Mining dan penjualan ulang compute:** menambang cryptocurrency, atau menjual kapasitas Sakala ke pihak lain.
- **Spam:** mengirim email atau pesan massal yang tidak diminta, atau menjalankan open relay.
- **Serangan dan pemindaian:** memindai, menyerang, atau membanjiri sistem lain tanpa izin pemiliknya, termasuk DDoS.
- **Menyerang Sakala atau pengguna lain:** mencoba keluar dari container, mengakses proyek orang lain, atau mengganggu runtime node.
- **Konten yang melanggar hukum Indonesia:** termasuk konten eksploitasi seksual anak, yang kami tangani tanpa toleransi.
- **Data orang lain tanpa hak:** menyebarkan data pribadi hasil curian atau kebocoran.
- **Melanggar hak orang lain:** menyebarkan konten bajakan, atau mengaku sebagai orang atau organisasi lain.
- **Mengakali batas pilot:** membuat banyak akun untuk melewati kuota.

Belajar keamanan boleh, selama targetnya aplikasimu sendiri atau sistem yang kamu punya izin tertulis untuk mengujinya. Kalau menemukan celah di Sakala, laporkan dengan cara yang tertulis di bawah, dan jangan mencobanya pada data pengguna lain.

## Cara kami menemukan pelanggaran

Sumbernya laporan dari pengguna, vendor keamanan, atau registrar, peringatan browser dan filter email tentang alamat `run.sakala.dev`, dan sinyal penggunaan seperti kegagalan deployment berulang.

Deteksi otomatis kami masih terbatas, jadi laporan darimu penting. Admin juga bisa membaca log dan konfigurasi proyek untuk memeriksa laporan.

## Yang terjadi setelah ada laporan

Waktu di tabel ini adalah target kami, bukan jaminan. Sakala dikelola tim kecil.

| Langkah | Yang kami lakukan                                                                                    | Target                      |
| ------- | ---------------------------------------------------------------------------------------------------- | --------------------------- |
| 1       | Mencatat laporan dan membalas pelapor                                                                | 24 jam                      |
| 2       | Memeriksa kontennya, dan melihat apakah ada proyek lain dari akun yang sama                          | 24 jam setelah langkah 1    |
| 3       | Kalau jelas phishing, malware, atau serangan aktif: menangguhkan proyek dan menghentikan alamatnya   | 24 jam sejak laporan        |
| 4       | Sistem memberi tahu pemilik proyek alasannya dan cara banding, lewat email dan notifikasi di Console | Saat penangguhan            |
| 5       | Kalau pelanggarannya berulang atau disengaja: menangguhkan semua proyeknya dan menutup akunnya       | Sesuai keputusan maintainer |
| 6       | Banding: maintainer lain meninjau, lalu membuka kembali atau menguatkan keputusan                    | 5 hari kerja                |

Kami bertindak berdasarkan bukti, bukan banyaknya keluhan. Mahasiswa yang tanpa sengaja men-deploy sesuatu yang berbahaya kami perlakukan berbeda dari orang yang mendaftar untuk menyalahgunakan layanan.

## Apa arti penangguhan

Penangguhan memutus trafik ke aplikasi dan menghentikan container-nya. Datanya tidak dihapus, dan proyeknya tetap terlihat di Console dengan status ditangguhkan, tetapi tidak bisa di-deploy.

Penghapusan data mengikuti [Pemberitahuan Privasi](/privasi). Kami bisa menyimpan bukti pelanggaran untuk menangani kasusnya, dan bisa menyerahkan data kalau hukum mewajibkannya.

Alasan penangguhan dikirim persis seperti yang ditulis admin, dan notifikasinya tetap terkirim walaupun kamu mematikan kategori notifikasi itu.

Kalau penangguhan dibuka, kamu mendapat notifikasi di Console. Aplikasinya tidak jalan sendiri, jadi kamu perlu men-deploy ulang.

Belum ada fitur penangguhan untuk akun. Kami menangguhkan proyeknya satu per satu, dan menutup akunnya secara manual.

## Mengajukan banding

Belum ada fitur banding di Console. Kirim email ke [`abuse@sakala.dev`](mailto:abuse@sakala.dev) dari email akunmu, sebutkan nama proyek dan alamatnya, lalu jelaskan kenapa menurutmu keputusannya perlu ditinjau. Kalau memungkinkan, yang meninjau adalah maintainer yang tidak mengambil keputusan awal.

## Cara melapor

Kirim ke [`abuse@sakala.dev`](mailto:abuse@sakala.dev):

- alamat lengkap yang bermasalah, misalnya `contoh.run.sakala.dev/login`;
- apa yang kamu lihat dan kapan;
- bukti pendukung, misalnya tangkapan layar atau header email;
- cara menghubungimu, kalau kamu ingin kabar lanjutan.

Kami tidak memberikan identitas pelapor kepada pemilik proyek, kecuali hukum mewajibkannya.

Untuk celah keamanan pada Sakala sendiri, jangan membuka issue publik. Laporkan secara privat lewat fitur private vulnerability reporting di repository GitHub yang terkait.

Kami tidak menjelaskan rincian deteksi kami, supaya tidak dipakai untuk menghindarinya.
