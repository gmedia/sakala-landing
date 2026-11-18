---
title: Replika, Sakala Edge, perintah rilis, dan batas build per jam
description: Satu project kini bisa berjalan dengan beberapa replika di belakang Sakala Edge, menjalankan perintah rilis sebelum versi baru melayani, dan dibatasi jumlah build per jam.
publishedAt: 2026-11-18
lang: id
---

Satu project kini bisa berjalan dengan beberapa replika, dan trafiknya dibagi
oleh Sakala Edge, router baru yang membaca tabel route dari API. Kalau satu
replika mati, trafik pindah ke replika lain dan agent menyalakannya lagi.
Replika hanya tersedia untuk workspace yang diberi profil batas oleh admin.
Aplikasi yang memakai replika harus stateless.

Project juga bisa punya **Release command**, perintah yang dijalankan sekali
setiap deployment sebelum versi baru menerima trafik, misalnya untuk migration.
Caranya ada di [Database dan Perintah Rilis](/docs/perintah-rilis).

Setiap workspace kini dibatasi jumlah build per jam, dihitung 60 menit ke
belakang. Rinciannya ada di [Batas Pilot](/docs/batas-pilot).
