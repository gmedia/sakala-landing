---
title: Rollback dan Restart
description: Cara mengembalikan proyek ke versi sebelumnya, menyalakan ulang container tanpa build, dan membaca tab Riwayat, termasuk kapan Sakala perlu build dan kapan tidak.
track: panduan
section: Panduan deploy
order: 4.8
---

# Rollback dan Restart

Kalau versi baru aplikasimu ternyata bermasalah, kamu bisa mengembalikannya ke versi sebelumnya dari tab **Riwayat**, tanpa mengubah repository. Kalau aplikasinya hanya perlu dinyalakan ulang, ada **Restart**, yang tidak membuat deployment baru dan tidak mem-build apa pun.

Halaman ini menjelaskan keduanya, kapan Sakala memakai ulang image yang sudah ada, dan apa yang tidak ikut kembali.

> **Status per 23 November 2026.** Rollback dan Restart butuh `sakala-api` v0.11.0, Console v0.12.0, dan `sakala-agent` v0.16.1 atau lebih baru. Sakala hosted di `sakala.dev` sudah memakai versi ini.

## Memilih cara yang tepat

Ada empat cara menjalankan ulang proyek. Image di sini adalah hasil build aplikasimu, yang dipakai untuk membuat container.

- **Redeploy**, tombol di halaman proyek, men-deploy commit terbaru dengan variabel dan pengaturan sekarang. Kalau commit dan pengaturan build-nya sama dengan versi yang sedang berjalan, image-nya dipakai ulang tanpa build. Pakai setelah mengubah variabel atau pengaturan.
- **Build ulang dari awal**, di menu sebelah **Redeploy**, sama seperti Redeploy tetapi selalu mem-build. Pakai kalau hasil build sebelumnya bermasalah.
- **Restart**, di menu yang sama, menyalakan ulang container versi yang sedang berjalan, tanpa build dan tanpa deployment baru. Pakai kalau aplikasi macet atau crash, tetapi kodenya tidak perlu diganti.
- **Kembalikan ke versi ini**, di menu setiap baris tab **Riwayat**, men-deploy commit dan pengaturan build versi lama dengan variabel sekarang. Biasanya tanpa build, selama image versi itu masih tersimpan. Pakai kalau versi baru rusak dan kamu ingin kembali ke versi yang terakhir berjalan baik.

Aturan kapan **Redeploy** memakai ulang image, termasuk variabel yang dibaca saat build seperti `VITE_*` dan `NEXT_PUBLIC_*`, ada di [Variabel dan Secret](/docs/variabel-dan-secret#redeploy-tanpa-build).

## Membaca tab Riwayat

Tab **Riwayat** memuat semua deployment proyekmu, dari yang terbaru. Beberapa tanda membantu membacanya:

- **Sedang melayani** menandai deployment yang dipakai pengunjung sekarang. Selama deployment baru berjalan, versi lama tetap bertanda ini sampai versi baru sehat.
- **Tanpa build** menandai deployment yang memakai ulang image deployment lain.
- Baris pemicu menyebut asal deployment. Di workspace tim, baris ini menyebut nama orangnya, misalnya "Rani, push ke main" atau "Rani, rollback ke #4". Di workspace pribadi hanya tertulis jenisnya.
- Push yang tidak di-deploy, misalnya karena [tidak ada perubahan di folder proyek](/docs/monorepo) atau karena auto-deploy sedang dijeda, tampil sebagai baris abu-abu tanpa nomor deployment.

## Restart

Pilih **Restart** dari menu di sebelah tombol **Redeploy**, lalu konfirmasi. Sakala menyalakan ulang container yang sedang berjalan, semua replikanya, biasanya dalam beberapa detik. Selama itu, kepala halaman proyek menampilkan **Sedang restart**.

Restart tidak mengganti kode dan tidak memakai perubahan variabel yang belum diterapkan. Kalau kamu baru mengubah variabel, pakai **Redeploy**. Restart juga tidak menjalankan [perintah rilis](/docs/perintah-rilis).

Restart hanya tersedia saat proyek berjalan atau crash. Proyek yang tidur tidak perlu di-restart, karena ia menyala sendiri saat dikunjungi. Kalau proyekmu crash karena kesalahan di kode, ia bisa crash lagi setelah restart, jadi baca dulu log deployment yang sedang melayani. Setiap restart tercatat di grafik **Restart** pada tab **Metrik**, satu per replika.

## Kembalikan ke versi sebelumnya

Rollback adalah mengembalikan aplikasi ke versi yang pernah berjalan. Di Sakala, rollback membuat deployment baru dari versi lama, jadi riwayatnya tetap utuh dan kamu bisa maju lagi kapan saja.

1. Buka tab **Riwayat**.
2. Di baris deployment yang ingin dikembalikan, buka menunya, lalu pilih **Kembalikan ke versi ini**.
3. Dialog membandingkan versi yang **Sedang melayani** dengan versi tujuan, dan menyebut apakah image versi itu masih tersimpan. Tekan **Kembalikan ke #N**.

Deployment barunya tertulis **Rollback ke #N** di riwayat. Versi yang sedang melayani tetap melayani sampai versi tujuan sehat, sama seperti deploy biasa.

### Yang ikut kembali dan yang tidak

Rollback mengambil commit, Root directory, Build command, Start command, perintah rilis, dan port dari versi tujuan. Environment variable, database yang terpasang, sumber daya, dan jumlah replika tetap yang sekarang. Ini disengaja: password database yang sudah diganti dan secret yang sengaja dicabut tidak boleh kembali hidup.

Rollback juga tidak mengembalikan isi database. Kalau versi baru sudah menjalankan migration yang mengubah tabel, versi lama akan bekerja dengan tabel yang sudah berubah itu. Untuk perubahan seperti ini, siapkan migration yang aman dijalankan bersama kode versi lama, atau perbaiki maju dengan commit baru.

### Kapan rollback butuh build

Server Sakala menyimpan dua image per proyek: yang sedang melayani, dan yang melayani sebelumnya. Rollback ke versi sebelumnya biasanya tidak perlu build, jadi jauh lebih cepat daripada deploy biasa. Rollback ke versi yang lebih lama mem-build ulang commit versi itu, jadi lebih lama dan dihitung dalam [batas build per jam](/docs/batas-pilot#batas-per-workspace). Dialog rollback sudah memberi tahu mana yang akan terjadi sebelum kamu menekan tombolnya.

Versi tujuan harus deployment yang berhasil, mencatat commit, dan berasal dari branch yang dipakai proyek sekarang. Kalau tidak, Sakala menolak rollback dan menyebut alasannya.

### Auto-deploy dijeda setelah rollback

Kalau auto-deploy proyekmu menyala, rollback menjedanya, supaya push berikutnya tidak langsung menimpa versi yang baru kamu kembalikan. Selama dijeda, push ke branch proyek tetap tercatat di **Riwayat**, tetapi tidak di-deploy, dan halaman proyek menampilkan berapa push yang sudah ditahan.

Setelah perbaikannya siap, tekan **Nyalakan lagi auto-deploy**. Menyalakannya tidak langsung men-deploy apa pun; push berikutnya yang akan di-deploy. Kalau kamu ingin langsung men-deploy commit terbaru, tombol **Redeploy** selama jeda bertuliskan **Redeploy commit terbaru**, dan deployment itu menggantikan versi rollback.

Pemilik dan anggota workspace bisa melakukan rollback, Restart, dan menyalakan lagi auto-deploy. Pengamat hanya bisa melihat.

## Berkas di dalam container ikut hilang

Restart, rollback, redeploy, dan proyek yang tidur lalu bangun lagi semuanya menyalakan container dari awal. Berkas yang ditulis aplikasi ke dalam container, misalnya hasil upload atau berkas SQLite, hilang setiap kali itu terjadi. Simpan data di database, dan berkas di object storage. Caranya ada di [Penyimpanan File](/docs/penyimpanan-file).

## Langkah berikutnya

Kalau deployment barunya gagal, bukan sekadar bermasalah setelah live, baca [Saat Deploy Gagal](/docs/deploy-gagal) untuk membaca kode kegagalannya. Versi lama tetap melayani selama deploy yang gagal itu.
