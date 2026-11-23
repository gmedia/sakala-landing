---
title: Redeploy tanpa build dan saran variabel dari .env.example
description: Redeploy kini memakai ulang image yang sedang dipakai kalau tidak ada yang perlu di-build ulang, dan wizard menyarankan variabel dari .env.example.
publishedAt: 2026-11-20
lang: id
---

Sejak 19 November 2026, tombol **Redeploy** memakai ulang image yang sedang
dipakai kalau commit, pengaturan build, dan variabel yang dibaca saat build
tidak berubah. Clone, analisis, dan build dilewati, sedangkan perintah rilis,
health check, dan replika tetap berjalan seperti biasa. Ini juga berlaku untuk
redeploy otomatis setelah password database diganti, dan deployment seperti
ini tidak dihitung dalam batas build per jam. Kalau kamu tetap ingin build,
pilih **Build ulang dari awal** di menu sebelah tombol Redeploy.

Sejak 20 November 2026, situs statis dan framework yang membuat halaman saat
build, seperti Next.js, Nuxt, Astro, dan SvelteKit, selalu di-build ulang saat
variabelnya berubah, karena nilai variabel tersimpan di hasil build. Di tab
**Variabel**, Console menulis akibat sebuah perubahan sebelum kamu
menyimpannya.

Wizard proyek baru juga membaca `.env.example` di repository dan menyarankan
variabelnya: mana yang perlu kamu isi, kunci acak yang dibuatkan Sakala, dan
nilai contoh yang disesuaikan untuk production. Saran yang sama ada di tab
**Variabel** lewat **Isi dari .env.example**. Rinciannya ada di
[Variabel dan Secret](/docs/variabel-dan-secret).
