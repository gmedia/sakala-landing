---
title: Dokumen project dimatangkan, dengan arah yang lebih tegas
description: Sakala kini jelas masuk lewat pendidikan, tersedia sebagai hosted dan self-host dengan kode yang sama, dan punya syarat tertulis sebelum pendaftaran dibuka untuk umum.
publishedAt: 2026-10-01
lang: id
---

Audit atas lima belas dokumen project menemukan bahwa Sakala sudah kuat
menjelaskan mengapa ia ada dan bagaimana sistemnya bekerja, tetapi belum
menjawab untuk siapa lebih dulu, dibandingkan dengan apa, dan siapa yang
menanggung biaya runtime. Pembaruan ini menjawab ketiganya.

Sakala masuk lewat pendidikan: kelas pemrograman, workshop, magang, dan PKL.
PRD versi 6.0 menetapkan mahasiswa dan pengajar sebagai persona utama,
membandingkan Sakala dengan alternatif yang benar-benar dipakai pengguna, dan
mencatat kuota pilot yang sudah berjalan beserta asumsi, risiko, dan target
metriknya. Sakala Learn naik ke horizon kedua di roadmap, dan self-host satu
node ke horizon ketiga.

Tiga keputusan arsitektur baru dan satu usulan tercatat. Sebelum pendaftaran
dibuka untuk umum, workload pengguna wajib dipisahkan dari control plane dan
dijalankan dengan gVisor; hari ini keduanya masih satu host. Project yang
tidak dipakai akan tidur. Versi hosted dan self-host memakai kode dan lisensi
yang sama. Domain publik bersama diusulkan diperlakukan sebagai aset reputasi.
MVP kini punya enam syarat tertulis sebelum pendaftaran dibuka untuk umum.

Governance mendapat jalur menjadi maintainer, cara mengambil keputusan saat
tidak sepakat, kebijakan nama Sakala, dan komitmen keberlanjutan. Dokumen arah
produk kini ditulis dalam Bahasa Indonesia, dokumen sistem dalam bahasa
Inggris.
