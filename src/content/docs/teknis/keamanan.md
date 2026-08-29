---
title: Keamanan
description: Batas hak istimewa, penanganan secret, isolasi runtime, dan aturan logging pada Sakala.
track: teknis
section: Sistem
order: 4
---

# Keamanan

Halaman ini adalah **baseline keamanan project**, bukan program keamanan production yang lengkap. Sakala masih dibangun, dan sebagian hal di bawah masih berupa aturan yang dipegang, bukan sistem yang sudah diaudit.

## Batas hak istimewa

Satu aturan yang menjadi dasar semuanya:

```txt
Sakala API tidak boleh mengakses Docker socket.
```

Seluruh operasi runtime berhak istimewa menjadi milik Agent. Konsekuensinya, sebuah HTTP request tidak pernah dapat langsung menjalankan perintah pada host, sekalipun lapisan API berhasil ditembus.

## Autentikasi Agent

Agent API memakai autentikasi mesin:

```txt
Authorization: Bearer <agent-token>
X-Agent-Id: <agent-id>
```

Token disimpan dalam bentuk hash pada control plane, dan harus mendukung rotasi serta pencabutan.

## Secret

- Nilai secret disimpan terenkripsi.
- Plaintext tidak dikembalikan secara default.
- Log disensor sebelum dikirim.
- Kredensial tidak pernah disisipkan pada keluaran perintah yang terlihat pengguna.
- Kredensial dihindari dari argumen proses bila memungkinkan.
- Kredensial repository sementara dibersihkan setelah dipakai.

## Kredensial repository

Untuk repository publik, tidak ada kredensial yang dipakai sama sekali.

Untuk repository privat nantinya, arahnya memakai GitHub App dengan installation token berumur pendek. Personal access token berumur panjang sengaja dihindari sebagai default platform.

## Isolasi runtime

Minimum yang diberlakukan pada workload pengguna:

- batas CPU;
- batas memori;
- batas jumlah proses bila tersedia;
- timeout build dan start;
- pengikatan port pada loopback;
- isolasi filesystem dan workspace;
- pembersihan setelah selesai.

Container **tidak diasumsikan** sebagai batas keamanan multi-tenant yang sempurna terhadap penyewa yang bermusuhan. Isolasi yang lebih kuat akan diteliti seiring penggunaan bertambah. Menyatakan ini terbuka lebih berguna daripada memberi rasa aman yang keliru.

## Routing

Sebelum sebuah route diaktifkan, urutannya tetap:

```txt
validasi hostname
validasi upstream
tulis berkas secara atomik
caddy validate
reload
```

Izin sudo milik Agent dibatasi sesempit mungkin.

## Webhook

Untuk webhook GitHub nantinya: verifikasi signature, deduplikasi pengiriman, validasi pemetaan repository dan branch, jangan memercayai payload begitu saja, dan jangan menjalankan build panjang di dalam request.

## Otorisasi

Akses pengguna ditegakkan oleh policy di backend. Peran workspace di masa depan tidak boleh bergantung hanya pada kontrol yang disembunyikan di frontend.

## Logging

Yang tidak pernah boleh masuk log: cookie sesi, header autentikasi, secret, installation token, password database, dan isi mentah berkas `.env`.

Peristiwa terkait keamanan tetap perlu konteks audit yang memadai, tanpa membocorkan material rahasianya.

## Rantai pasok

Baseline yang dianjurkan: versi rilis dipatok, checksum untuk binary yang didistribusikan, pemindaian dependency, build yang reproducible atau terdokumentasi, dan penandatanganan rilis yang dapat ditambahkan kemudian.

## Melaporkan masalah keamanan

Selama saluran pelaporan privat khusus belum tersedia, **jangan mempublikasikan detail celah yang belum diperbaiki pada issue publik**.

Gunakan [kebijakan keamanan repository](https://github.com/gmedia/sakala-landing/security/policy) untuk sekarang. Kontak resmi dan daftar versi yang didukung akan didokumentasikan saat Sakala mendekati layanan publik.
