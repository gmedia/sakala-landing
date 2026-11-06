---
version: syarat-v1
---

Dengan menyetujui syarat ini saat mendaftar, atau saat pertama kali masuk lewat GitHub atau Google, kamu boleh memakai layanan Sakala di `sakala.dev`, `app.sakala.dev`, dan `*.run.sakala.dev`. Sakala masih tahap pilot, gratis, dan belum siap menjadi tempat aplikasi yang penting. Syarat ini ditulis supaya kamu tahu persis apa yang bisa dan tidak bisa kamu harapkan.

Pemrosesan data pribadimu dijelaskan terpisah di [Pemberitahuan Privasi](/privasi), yang bukan bagian dari persetujuan ini.

## 1. Siapa pengelolanya

Layanan ini dikelola oleh Sakala Maintainers, yaitu pengelola proyek open-source Sakala. Sakala Maintainers belum punya badan hukum tersendiri.

Infrastrukturnya didukung PT Media Sarana Data (GMEDIA) sebagai founding sponsor. Syarat ini tidak menyebut GMEDIA sebagai pihak dalam perjanjian, karena GMEDIA belum menyepakati peran itu.

Pihak pengelola bisa berubah, misalnya kalau badan hukum dibentuk. Kalau itu terjadi, kami memberi tahu kamu lewat email akun dan di situs ini sebelum perubahannya berlaku.

## 2. Siapa yang boleh memakai

Kalau kamu belum berusia 18 tahun, kamu harus mendapat persetujuan orang tua atau wali sebelum mendaftar. Saat menyetujui syarat ini, kamu menyatakan sudah berusia 18 tahun atau sudah mendapat persetujuan itu. Akun yang ternyata tidak memenuhi syarat ini bisa kami tutup.

Kamu bertanggung jawab atas keamanan akunmu dan atas semua yang terjadi lewat akun itu. Berikan nama dan email yang benar. Kalau akunmu dibobol, segera kabari [`info@sakala.dev`](mailto:info@sakala.dev).

## 3. Apa yang kamu dapat

Sakala mengambil source code dari repository GitHub-mu, membangunnya, menjalankannya sebagai satu web service, dan memberinya alamat `<slug>.run.sakala.dev`.

Batas pilot saat ini:

| Batas                         | Nilai                                                          |
| ----------------------------- | -------------------------------------------------------------- |
| Proyek per pengguna           | 3                                                              |
| Deployment aktif per pengguna | 2                                                              |
| Deployment aktif per proyek   | 1                                                              |
| Memori per container          | 256 MB, maksimal 512 MB                                        |
| CPU per container             | 0,5 core, maksimal 1 core                                      |
| Jumlah proses per container   | 128, maksimal 256                                              |
| Waktu build                   | 10 menit                                                       |
| Waktu start sampai sehat      | 2 menit                                                        |
| Waktu total satu perintah     | 15 menit                                                       |
| Log yang tersimpan            | 7 hari setelah deployment selesai, maksimal 10 MB per perintah |

Perubahan batas kami umumkan sebelum berlaku. Sleep otomatis untuk proyek tanpa trafik dan batas jumlah build per jam belum aktif, tetapi direncanakan. Kami akan mengumumkannya sebelum diaktifkan.

Container tidak punya penyimpanan tetap. Berkas yang ditulis di dalam container, termasuk SQLite dan hasil upload, hilang setiap kali deploy baru selesai. Sakala juga belum menyediakan basis data, custom domain, worker, atau cron.

## 4. Tahap pilot: tidak ada jaminan

Layanan ini disediakan apa adanya. Kami tidak menjanjikan uptime, SLA, pemulihan data, atau kecepatan penanganan gangguan. Basis data Sakala dan avatar yang diunggah dicadangkan setiap hari untuk memulihkan layanan, tetapi itu bukan jaminan datamu bisa dipulihkan, dan berkas di dalam container tidak ikut dicadangkan.

Hal berikut bisa terjadi, kadang tanpa pemberitahuan: layanan berhenti, proyek perlu di-deploy ulang, log terhapus lebih cepat dari biasanya, atau data hilang karena kerusakan node.

Isolasi antarpengguna belum selesai. Runtime tersandbox gVisor belum aktif di production, dan container pengguna belum dibatasi lalu lintas keluarnya. Jadi jangan menjalankan aplikasi yang menyimpan data sensitif atau yang kegagalannya bisa merugikan orang lain.

Alamat `*.run.sakala.dev` juga bisa berubah. Ada usulan memindahkan aplikasi pengguna ke domain terpisah, dan kalau itu diputuskan, kami akan mengumumkannya lebih dulu.

## 5. Kode dan datamu tetap milikmu

Kami tidak mengambil hak milik atas kode dan datamu. Kamu memberi kami izin terbatas untuk mengambil source code, membangun image, menjalankan container, menyimpan konfigurasi dan log, serta menampilkannya kepadamu. Izin ini hanya untuk menjalankan layanan, dan berakhir saat data proyeknya terhapus.

Kamu menjamin bahwa kamu berhak memakai kode dan konten yang kamu deploy.

Admin Sakala secara teknis bisa membaca log dan nilai secret proyekmu, dan bisa memakainya untuk menangani insiden atau abuse.

## 6. Tanggung jawabmu atas aplikasimu

Aplikasi yang kamu deploy adalah tanggung jawabmu. Itu termasuk:

- isi dan perilakunya, serta kepatuhannya pada hukum;
- data pengguna aplikasimu, termasuk memberi tahu mereka apa yang kamu kumpulkan;
- backup dan migration basis data eksternal yang kamu pakai;
- menjaga secret supaya tidak tercetak ke log.

URL proyekmu publik, jadi siapa saja bisa membuka aplikasinya. Kamu tidak memiliki slug atau alamatnya. Beberapa slug dicadangkan, dan slug proyek yang sudah dihapus tidak bisa dipakai lagi.

## 7. Penggunaan yang dilarang

Kamu harus mematuhi [Kebijakan Penggunaan Wajar](/penggunaan-wajar), yang menjadi bagian dari syarat ini. Kebijakan itu menjelaskan apa yang dilarang, bagaimana laporan ditangani, dan cara mengajukan banding.

## 8. Penangguhan

Kami bisa menghentikan atau menangguhkan proyek kalau melanggar syarat ini, membahayakan orang lain, atau membahayakan layanan. Dalam kasus yang jelas, kami bertindak dulu, baru memberi tahu.

Penangguhan memutus trafik ke aplikasi dan menghentikan container-nya, tetapi tidak menghapus data. Selama ditangguhkan, proyek tidak bisa di-deploy.

Saat proyekmu ditangguhkan, kamu menerima alasannya lewat email dan notifikasi di Console. Belum ada fitur banding di Console, jadi banding dikirim lewat email ke [`abuse@sakala.dev`](mailto:abuse@sakala.dev).

Kalau penangguhan dibuka, aplikasinya tidak jalan sendiri. Kamu perlu men-deploy ulang.

## 9. Berhenti memakai Sakala

Kamu bisa menghapus proyek atau akunmu kapan saja dari Console, dan bisa mengunduh salinan datamu lebih dulu. Penghapusan akun tidak bisa dibatalkan. Apa yang dihapus dan apa yang tetap ada dijelaskan di [Pemberitahuan Privasi](/privasi).

Kami bisa menutup akun yang berulang kali atau sengaja melanggar syarat ini. Belum ada fitur penangguhan untuk akun. Kami menangguhkan proyeknya satu per satu, dan menutup akunnya secara manual.

Kalau layanan ini ditutup sebagai keputusan terencana, kami akan memberi tahu paling sedikit 90 hari sebelumnya, serta menyediakan ekspor konfigurasi proyek dan pengalihan alamat, sejauh hukum dan teknis memungkinkan. Insiden, perintah hukum, atau berhentinya dukungan sponsor bisa membuat pemberitahuan sepanjang itu tidak mungkin. Dalam keadaan itu, kami memberi tahu secepat keadaan memungkinkan.

## 10. Batas tanggung jawab

Sakala gratis dan masih pilot. Sejauh diizinkan hukum, pengelola tidak bertanggung jawab atas kerugian karena layanan berhenti, data hilang, atau aplikasimu tidak berjalan.

Bagian ini tidak menghapus hak yang menurut hukum tidak bisa dihapus, termasuk hakmu sebagai subjek data pribadi.

## 11. Open source dan layanan ini adalah dua hal berbeda

Kode Sakala berlisensi Apache License 2.0. Lisensi itu berlaku untuk kodenya, sedangkan syarat ini berlaku untuk layanan yang kami jalankan. Kamu bisa menjalankan Sakala di servermu sendiri, dan dalam hal itu syarat ini tidak berlaku.

Lisensi Apache 2.0 tidak memberi izin memakai nama dan logo Sakala. Aturannya ada di dokumen [Governance](/docs/proyek/governance).

Kalau suatu saat GMEDIA menawarkan kapasitas berbayar di atas kuota gratis, itu hubungan terpisah antara kamu dan GMEDIA. Saat ini layanan hanya menawarkan kuota gratis.

## 12. Perubahan syarat

Setiap perubahan mendapat versi baru. Perubahan yang berarti kami umumkan lebih dulu di situs ini dan lewat email akun sebelum berlaku.

Sampai kamu menyetujui versi baru syarat ini atau Kebijakan Penggunaan Wajar, kamu tidak bisa membuat proyek, menganalisis ulang repository, atau men-deploy, dan auto-deploy dilewati. Kamu tetap bisa membaca datamu, membatalkan deployment, menghapus proyek, mengunduh salinan data, dan menghapus akun. Kalau kamu tidak setuju, kamu bisa berhenti memakai layanan.

## 13. Hukum yang berlaku

Syarat ini tunduk pada hukum Republik Indonesia. Kalau ada masalah, kami minta kamu menghubungi kami lebih dulu supaya bisa dibicarakan.

## 14. Kontak

- Umum: [`info@sakala.dev`](mailto:info@sakala.dev)
- Privasi dan data pribadi: [`privacy@sakala.dev`](mailto:privacy@sakala.dev)
- Abuse dan banding penangguhan: [`abuse@sakala.dev`](mailto:abuse@sakala.dev)
