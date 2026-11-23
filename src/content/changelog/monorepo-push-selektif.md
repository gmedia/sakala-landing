---
title: Push di monorepo hanya men-deploy proyek yang berubah
description: Di repository dengan beberapa proyek Sakala, push kini hanya men-deploy proyek yang foldernya berubah, dan workspace JavaScript dikenali saat analisis.
publishedAt: 2026-11-19
lang: id
---

Kalau satu repository dipakai beberapa proyek Sakala, misalnya `apps/web` dan
`apps/api`, push kini hanya men-deploy proyek yang **Root directory**-nya
berisi berkas yang berubah. Kalau yang berubah berkas bersama di luar folder
proyek mana pun, misalnya lockfile, semua proyek tetap di-deploy. Push yang
dilewati muncul di tab **Riwayat** sebagai baris **Dilewati**, jadi kamu tetap
tahu kenapa tidak ada deployment baru. Redeploy manual selalu jalan.

Analisis repository juga mengenali workspace JavaScript (pnpm, npm, Yarn, dan
Bun). Isi Root directory dengan folder package-nya, dan Sakala mem-build dari
root workspace dengan lockfile-nya. Caranya ada di
[Men-deploy Monorepo](/docs/monorepo).
