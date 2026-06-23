---
title: Cara Kerja Sakala Agent
description: Memahami polling, command claim, operating mode, dan runtime Docker pada Sakala Agent.
order: 5
section: Konsep
---

# Cara Kerja Sakala Agent

Sakala Agent adalah proses Rust yang berjalan pada runtime node. Tugasnya mengambil pekerjaan dari Sakala API, menjalankan operasi yang diizinkan pada node, lalu melaporkan heartbeat, event, log, dan hasil kembali ke API.

Agent bukan web server dan tidak menerima perintah langsung dari browser. Semua komunikasi dimulai dari agent menuju API.

```txt
Sakala Console
      |
      v
Sakala API menyimpan command
      ^
      | polling, claim, event, log, hasil
      |
Sakala Agent
      |
      v
Docker, Railpack, dan Caddy pada runtime node
```

## Dari command sampai selesai

1. Pengguna meminta deployment melalui Sakala Console.
2. API memvalidasi akses, policy, dan resource project.
3. API menyimpan command dengan status `Pending`.
4. Agent meminta daftar command yang tersedia untuk node tersebut.
5. Agent melakukan **claim** secara atomik sebelum bekerja.
6. Agent menjalankan inspection atau deployment dan mengirim event serta log.
7. Agent menandai command berhasil atau gagal.

Hasil polling belum berarti command dimiliki agent. Claim mencegah dua agent menjalankan pekerjaan yang sama. Setelah command diklaim atau selesai, API tidak mengembalikannya lagi sebagai pekerjaan pending biasa.

## `local`, `connected`, `noop`, dan `docker`

Sakala memisahkan cara agent terhubung dari cara agent mengeksekusi runtime.

| Konfigurasi | Artinya                                                                              |
| ----------- | ------------------------------------------------------------------------------------ |
| `local`     | Agent tidak menghubungi API. Heartbeat dan polling hanya terlihat sebagai log lokal. |
| `connected` | Agent memakai token untuk heartbeat, polling, claim, dan reporting ke Sakala API.    |
| `noop`      | Command diselesaikan tanpa menjalankan Git, Docker, Railpack, atau Caddy.            |
| `docker`    | Command yang didukung benar-benar dijalankan pada runtime node.                      |

Kombinasinya membantu pengembangan bertahap:

- `local + noop` adalah default aman untuk memastikan binary dapat berjalan;
- `connected + noop` menguji kontrak API lengkap tanpa mengubah host;
- `connected + docker` adalah flow runtime nyata untuk node yang sudah disiapkan;
- `local + docker` tidak mengambil deployment dari API, sehingga bukan flow operasi normal.

Noop bukan deployment palsu yang ditampilkan sebagai aplikasi aktif. Mode ini hanya membuktikan bahwa autentikasi, command lifecycle, dan reporting telah tersambung sebelum akses host yang privileged diaktifkan.

## Preview project dan deployment

Preview project menggunakan command `InspectProject`. Agent melakukan checkout commit, menjalankan scanner ringan dan `railpack info`, lalu mengembalikan metadata stack. Tahap ini tidak membangun image atau menjalankan container.

Deployment menggunakan command `DeployProject`. Untuk repository dengan Dockerfile, konfigurasi user diprioritaskan. Bila Dockerfile tidak tersedia, agent dapat memakai Railpack untuk menyiapkan build plan, lalu Docker Buildx membangun image aplikasi.

```txt
Preview:
repository -> scanner + railpack info -> metadata stack

Deploy:
repository -> Dockerfile/Railpack -> image -> container -> health check -> route
```

## Siapa menentukan resource?

Sakala API menentukan resource berdasarkan policy project, workspace, atau plan. Agent tidak menentukan apakah seorang pengguna mendapat paket tertentu.

Agent bertugas memvalidasi dan menerapkan memory, CPU, serta process limit pada container. Node tetap mempunyai hard safety limit agar command yang salah atau terlalu besar tidak mengganggu workload lain.

```txt
Sakala API   menentukan resource yang boleh diminta
Sakala Agent memvalidasi dan menerapkannya pada node
```

## Caddy pada MVP

Implementasi agent saat ini memakai Caddy container dari `sakala-infra`. Caddy dan aplikasi berada pada Docker network `sakala-runtime`, sehingga Caddy dapat menemukan aplikasi melalui nama container tanpa mempublikasikan port aplikasi ke internet.

Caddy yang terpasang langsung pada host belum menjadi topologi runtime yang didukung agent. Dukungan itu memerlukan alokasi port loopback dan adapter reload tersendiri; bukan sekadar mengganti perintah reload.

Untuk pilot, Caddy host masih dapat dipakai sebagai edge luar statis yang meneruskan trafik ke `sakala-caddy` pada loopback. Agent tetap mengelola router container, sementara TLS dan policy edge luar dikelola operator.

## Status MVP

Fondasi MVP Sakala Agent sudah mencakup connected polling, command lifecycle, project inspection, Dockerfile/Railpack build, container resource guard, health check, route Caddy, reconciliation, dan reporting.

Ini berarti fondasi executor sudah dapat diuji sebagai sistem. Ini belum berarti layanan hosted Sakala sudah production-ready. Pilot tetap membutuhkan implementasi endpoint Agent API yang sesuai, provisioning node, secret management, observability, backup, dan pengujian operasi end-to-end.

Implementasi dan kontrak teknis lengkap tersedia di repository [`sakala-agent`](https://github.com/gmedia/sakala-agent).
