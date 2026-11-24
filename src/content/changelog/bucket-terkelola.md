---
title: Bucket terkelola untuk menyimpan berkas, pilot terbatas
description: Workspace yang diberi kuota kini bisa membuat bucket S3 dan memasangnya ke proyek, dengan variabel AWS_* yang diisi Sakala. Bucket dibuka per workspace selama pilot.
publishedAt: 2026-12-07T10:00:00+07:00
lang: id
---

Mulai hari ini, workspace yang diberi kuota bisa membuat **bucket**, yaitu
tempat menyimpan berkas seperti gambar upload atau PDF yang memakai API S3.
Berkas di dalam container hilang setiap kali container berhenti, jadi bucket
adalah tempat yang tepat untuk berkas yang harus tetap ada setelah redeploy,
restart, atau proyek tidur.

Bucket milik workspace, bukan milik satu proyek. Buka **Bucket** di sidebar
untuk membuatnya, atau pilih **Buat bucket untuk proyek ini** dari halaman
proyek. Setelah bucket terpasang, tekan **Redeploy**: aplikasimu menerima
`AWS_ENDPOINT_URL_S3`, `AWS_ENDPOINT`, `AWS_BUCKET`, access key, dan variabel
lain yang dibaca disk `s3` Laravel dan SDK AWS for JavaScript.

Bucket selalu privat. Browser membuka berkas lewat link sementara yang dibuat
aplikasimu. Secret key hanya bisa dilihat pemilik workspace, bisa diganti kapan
saja, dan isi bucket di-backup setiap malam.

Selama pilot, kuota bucket bawaan setiap workspace adalah 0. Cara meminta
kuota, contoh Laravel dan Node, dan batasan yang perlu diketahui ada di
[Bucket Terkelola](/docs/bucket-terkelola).
