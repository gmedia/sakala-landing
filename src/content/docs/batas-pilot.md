---
title: Batas Pilot
description: Sakala hosted sedang dalam tahap pilot. Siapa pun bisa mendaftar dan memakainya tanpa biaya, dengan batas proyek, container, build per jam, dan sleep otomatis.
track: panduan
section: Mulai
order: 1.5
---

# Batas Pilot

Sakala hosted sedang dalam tahap pilot. Siapa pun bisa [mendaftar di Console](https://app.sakala.dev/register) dan memakainya tanpa biaya, dengan batas yang tertulis di halaman ini. Belum ada jaminan uptime, jadi Sakala belum cocok untuk aplikasi yang penting.

> **Status per 19 November 2026.** Angka di bawah adalah nilai default untuk workspace tanpa profil batas khusus. Perubahan batas kami umumkan di [Changelog](/changelog) sebelum berlaku.

## Batas per workspace

Setiap akun mendapat satu workspace pribadi saat mendaftar. Workspace adalah tempat proyek disimpan, dan batasnya dihitung per workspace.

| Batas                                         | Workspace pribadi | Workspace tim |
| --------------------------------------------- | ----------------- | ------------- |
| Proyek                                        | 3                 | 2             |
| Container yang berjalan bersamaan             | 3                 | 2             |
| Deployment yang diproses bersamaan            | 2                 | 1             |
| Build per jam (dihitung 60 menit ke belakang) | 20                | 20            |
| Replika per proyek                            | 1                 | 1             |

Satu akun bisa memiliki sampai 2 workspace tim. Admin Sakala bisa memberi workspace tertentu batas yang berbeda lewat profil batas, misalnya replika lebih dari satu.

Untuk batas build per jam, setiap deployment dihitung, termasuk yang gagal. Kalau batasnya tercapai, deployment baru ditolak sampai deployment paling lama di 60 menit terakhir keluar dari hitungan. Push yang seharusnya memicu deploy otomatis pada saat itu dilewati, dan kamu mendapat notifikasi.

## Batas per container

| Batas                       | Default                               | Maksimum yang bisa diatur |
| --------------------------- | ------------------------------------- | ------------------------- |
| Memory                      | 256 MB                                | 512 MB                    |
| CPU                         | 0,5 core                              | 1 core                    |
| Jumlah proses               | 128                                   | 256                       |
| Waktu build                 | 10 menit                              | —                         |
| Waktu start sampai sehat    | 2 menit                               | —                         |
| Waktu total satu deployment | 15 menit                              | —                         |
| Log yang tersimpan          | 7 hari, maksimal 10 MB per deployment | —                         |

## Proyek tidur setelah 30 menit tanpa pengunjung

Proyek yang tidak dikunjungi selama 30 menit ditidurkan supaya kapasitas pilot bisa dipakai bersama. Alamatnya tetap sama. Pengunjung berikutnya melihat halaman **Proyek sedang dinyalakan**, dan aplikasinya terbuka sendiri begitu siap. Kamu juga bisa membangunkannya dari Console.

Aplikasimu dihentikan saat tidur dan dijalankan lagi saat bangun, jadi apa pun yang hanya tersimpan di memory aplikasi, misalnya sesi login yang tidak disimpan di database, ikut hilang.

## Yang belum ada selama pilot

- Jaminan uptime, SLA, atau pemulihan data.
- Penyimpanan tetap di dalam container. Berkas yang ditulis aplikasi, termasuk SQLite dan hasil upload, hilang setiap kali deploy baru selesai. Untuk data, pakai [database eksternal](/docs/database-eksternal).
- Database terkelola, custom domain, worker, dan cron.
- Pembatasan lalu lintas keluar dari container. Pembatasan ini sedang ditambahkan. Aplikasi sudah berjalan di sandbox gVisor, tetapi selama pilot jangan menyimpan data sensitif di Sakala.

## Aturan yang mengikat

Hak dan kewajibanmu saat memakai Sakala diatur di [Syarat Layanan](/syarat) dan [Kebijakan Penggunaan Wajar](/penggunaan-wajar). Pertanyaan soal batas bisa dikirim ke [`info@sakala.dev`](mailto:info@sakala.dev).

Siap mencoba? Ikuti [Deploy Pertamamu](/docs/deploy-pertama).
