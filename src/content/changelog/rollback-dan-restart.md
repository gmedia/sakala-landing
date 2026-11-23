---
title: Rollback, Restart, dan riwayat yang menyebut pemicunya
description: Proyek kini bisa dikembalikan ke versi sebelumnya dari tab Riwayat, dinyalakan ulang tanpa build, dan setiap deployment di workspace tim menyebut siapa yang memulainya.
publishedAt: 2026-11-23T17:45:00+07:00
lang: id
---

Mulai hari ini, setiap baris di tab **Riwayat** punya menu **Kembalikan ke
versi ini**. Rollback membuat deployment baru dari commit dan pengaturan build
versi lama, sedangkan environment variable dan database tetap yang sekarang,
supaya password atau secret yang sudah diganti tidak kembali hidup. Server
menyimpan image versi yang sedang melayani dan versi sebelumnya, jadi kembali
satu versi biasanya tanpa build. Versi yang lebih lama di-build ulang dari
commit-nya, dan dialog rollback memberi tahu mana yang akan terjadi.

Setelah rollback, auto-deploy dijeda supaya push berikutnya tidak langsung
menimpa versi yang dikembalikan. Push selama jeda tetap tercatat, dan
**Nyalakan lagi auto-deploy** mengakhirinya.

Menu di sebelah tombol **Redeploy** kini juga berisi **Restart**, yang
menyalakan ulang container tanpa build dan tanpa deployment baru. Restart
tidak memakai perubahan variabel yang belum diterapkan; untuk itu tetap pakai
Redeploy.

Riwayat juga lebih mudah dibaca: deployment yang dipakai pengunjung diberi
tanda **Sedang melayani**, dan di workspace tim baris pemicunya menyebut nama,
misalnya "Rani, push ke main". Rollback tidak mengembalikan isi database dan
berkas di dalam container. Rinciannya ada di
[Rollback dan Restart](/docs/rollback-dan-restart).
