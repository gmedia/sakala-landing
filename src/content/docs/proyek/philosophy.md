---
title: "Filosofi Sakala"
description: "Mengapa Sakala ada: tujuh prinsip, manifesto, filosofi mark, dan filter produk."
track: proyek
section: arah
order: 1
lang: id
canonical: true
---

# Filosofi Sakala

> **Manifesting Code into Reality.**

## Pembuka

Kami percaya kode bukanlah akhir dari sebuah karya.

Kode adalah kemungkinan: ide yang telah mendapat struktur, logika yang telah diberi bahasa, dan sesuatu yang menunggu untuk diwujudkan.

Repository dapat menyimpan source code dengan sangat baik, tetapi repository belum tentu memberi karya itu kehidupan. Sebuah aplikasi mulai terasa nyata ketika ia dapat berjalan, dibuka, digunakan, diuji oleh dunia nyata, diperbaiki ketika gagal, dan dibagikan kepada orang lain.

Sakala hadir pada batas antara **kemungkinan** dan **wujud**.

```text
Ide
↓
Kode
↓
Repository
↓
────────── SAKALA ──────────
↓
Build
↓
Runtime
↓
Aplikasi hidup
↓
Dapat dibuka
↓
Dapat digunakan
↓
Dapat dibagikan
↓
Dapat tumbuh
```

## 1. Wujud

> **Kode menemukan maknanya ketika dapat menjadi sesuatu yang nyata.**

Developer sering berkata:

```text
"I built this."
```

Sakala ingin membantu mereka sampai dapat berkata:

```text
"Here it is."
```

Ada URL-nya. Bisa dicoba. Bisa gagal. Bisa diperbaiki. Bisa digunakan orang lain.

Deployment bukan sekadar operasi infrastruktur. Ia adalah proses ketika sesuatu yang abstrak menjadi hadir.

Karena itu core Sakala selalu berputar pada:

```text
Source
→ Build
→ Deploy
→ Run
→ Reach
```

## 2. Purna

> **Kami membantu perjalanan sampai tuntas, bukan meninggalkan pengguna di tengah kompleksitas.**

Purna tidak berarti Sakala harus memiliki semua fitur di dunia.

Purna berarti ketika Sakala menawarkan sebuah kemampuan, pengalaman itu sebisa mungkin membawa user menuju tujuan yang benar-benar selesai.

Bukan:

```text
Image built.
Good luck.
```

Tetapi:

```text
Build
→ Container
→ Route
→ Health Check
→ Public URL
```

Bukan:

```text
Database created.
```

Tetapi:

```text
Database
→ Credentials
→ Connection URL
→ Attach to Project
→ Environment
→ Application Connected
```

## 3. Sederhana, Bukan Dangkal

> **Kompleksitas platform tidak seharusnya menjadi pajak yang dibayar setiap pengguna.**

Di belakang satu tombol Deploy bisa hidup Git, BuildKit, Railpack, Docker, DNS, TLS, Caddy, health check, resource policy, scheduler, dan runtime node.

User tidak perlu dipaksa memahami semuanya sebelum mendapatkan value.

Default experience:

```text
Repository
→ Detect
→ Deploy
```

Namun kesederhanaan tidak berarti kehilangan kedalaman.

```text
simple by default
transparent when needed
```

## 4. Terang

> **Magic boleh terjadi, tetapi harus dapat dijelaskan.**

Otomasi yang tidak membebani user itu baik. Black box yang hanya berkata `Something went wrong` tidak cukup.

Ketika Sakala mengambil keputusan otomatis, Sakala harus mampu menjelaskan keputusan itu.

```text
Detected: Laravel
PHP: 8.x
Builder: Railpack
Expected port: 8080
```

Ketika deployment gagal:

```text
Stage: Health Check

Application started,
but did not respond on the expected port.

Check:
- bind address
- exposed port
- runtime logs
```

Sakala tidak hanya membantu software berjalan. Sakala membantu developer memahami bagaimana software mereka hidup.

## 5. Tumbuh

> **Mulai kecil tanpa menutup kemungkinan menjadi lebih besar.**

User pertama mungkin hanya ingin:

```text
portfolio
→ public URL
```

Besok ia mungkin membutuhkan:

```text
Custom Domain
→ Database
→ Worker
→ Redis
→ Monitoring
→ Team
```

Prinsip engineering:

```text
Do not build tomorrow today.
Do not make tomorrow impossible either.
```

## 6. Berbagi

> **Karya yang baik seharusnya dapat hidup lebih lama daripada tugas yang melahirkannya.**

Banyak karya developer berakhir seperti:

```text
Tugas
→ Repository
→ Dinilai
→ Dilupakan
```

Sakala percaya karya dapat memiliki kehidupan berikutnya:

```text
Project
→ Deploy
→ Showcase
→ Dipelajari
→ Template
→ Dipakai orang lain
→ Melahirkan karya baru
```

Inilah alasan Templates, Showcase, Creator, dan Collections bukan sekadar fitur sosial.

## 7. Manusia

> **Infrastruktur adalah alat. Manusia dan apa yang mereka ciptakan adalah tujuan.**

Sakala tidak menang karena memiliki scheduler paling rumit.

Sakala menang ketika seseorang yang tadinya hanya punya source code akhirnya dapat membuat software-nya hidup.

Pertanyaan ketika memilih teknologi atau fitur:

> Apakah ini membantu manusia mewujudkan sesuatu, atau kita hanya sedang menikmati kompleksitas teknis?

## 8. Belajar Melalui Wujud Nyata

Developer belajar dengan cara berbeda ketika software-nya berhadapan dengan dunia nyata.

```text
build failed
→ baca logs
→ pahami masalah
→ perbaiki
→ redeploy
→ berhasil
```

Karena itu Sakala secara alami cocok untuk mahasiswa, intern, PKL, workshop, komunitas belajar, dan developer pemula.

Sakala tidak perlu menjadi LMS. Perannya adalah memberi arena aman untuk belajar bagaimana software benar-benar dikirim dan dijalankan.

## 9. Karya Memiliki Pencipta

> **Kami menghargai karya sekaligus manusia di baliknya.**

Creator Profile dan Showcase harus mengutamakan attribution.

Bukan follower count.

Bukan vanity social graph.

Tetapi:

```text
This is what I made.
Here is the source.
Here is the living application.
```

## 10. Terbuka Agar Karya Melahirkan Karya

> **Pengetahuan tumbuh ketika dapat dilihat, dipelajari, dimodifikasi, dan dibagikan kembali.**

Loop Sakala:

```text
Open Source Project
↓
Sakala
↓
Live Application
↓
Showcase
↓
Template
↓
New Developer
↓
New Project
```

## Tujuh Prinsip Sakala

```text
01 Wujud
   Kode menjadi nyata.

02 Purna
   Perjalanan dibantu sampai tuntas.

03 Sederhana
   Kompleksitas tidak dibebankan ke user.

04 Terang
   Otomasi harus dapat dijelaskan.

05 Tumbuh
   Mulai kecil, tetap punya ruang berkembang.

06 Berbagi
   Karya dapat dilihat, dipelajari, dan diwariskan.

07 Manusia
   Teknologi adalah alat untuk membantu manusia mencipta.
```

## Filosofi Mark

```text
Upper form
→ source / possibility / local

Negative space
→ transformation / deployment

Lower form
→ manifestation / public / reality
```

Logo merangkum:

```text
Source
→ Transformation
→ Wujud
```

## Manifesto

Kami percaya kode bukanlah akhir dari sebuah karya.

Kode adalah kemungkinan—sesuatu yang menunggu untuk diwujudkan.

Sakala hadir untuk membantu perjalanan dari ide, repository, dan baris-baris kode menuju sesuatu yang dapat hidup, dibuka, digunakan, dan dibagikan.

Kami percaya teknologi yang baik tidak memamerkan kompleksitasnya. Ia menyederhanakan tanpa menyembunyikan kebenaran, mengotomasi tanpa menjadi kotak hitam, dan membantu pengguna belajar ketika mereka ingin memahami lebih dalam.

Kami percaya karya tidak harus berakhir setelah tugas selesai, internship berakhir, atau repository berhenti mendapat commit. Karya dapat hidup, menjadi portfolio, menjadi contoh, menjadi template, dan menjadi awal bagi karya orang lain.

Kami membangun Sakala agar developer dapat mulai dari sesuatu yang kecil tanpa kehilangan ruang untuk tumbuh.

Infrastruktur hanyalah alat. Yang penting adalah apa yang akhirnya dapat diwujudkan manusia dengannya.

> **Sakala — Manifesting Code into Reality.**

## Product Filter

Sebelum fitur besar masuk roadmap, tanyakan:

1. Apakah fitur ini membantu karya menjadi nyata?
2. Apakah ia membuat perjalanan user lebih utuh?
3. Apakah ia mengurangi kompleksitas tanpa menjadi black box?
4. Apakah ia membantu user memahami, belajar, atau berkembang?
5. Apakah ia membuat karya dapat hidup dan memberi manfaat lebih lama?
6. Apakah ia memberi ruang untuk tumbuh tanpa memaksa kompleksitas sekarang?
7. Apakah manfaatnya nyata bagi manusia, bukan hanya menyenangkan secara teknis?

Jika hampir semua jawabannya tidak, fitur tersebut kemungkinan bukan prioritas Sakala.
