---
title: Konsep Dasar
description: Peran setiap repository dan batas tanggung jawab Sakala.
order: 3
section: Konsep
---

# Konsep Dasar

Sakala memisahkan pengalaman pengguna dari pekerjaan runtime agar batas keamanan dan ownership tetap jelas.

## Komponen ekosistem

- `sakala-console` adalah antarmuka SvelteKit untuk pengalaman pengguna.
- `sakala-api` adalah control plane Laravel untuk autentikasi, project, deployment, dan command.
- `sakala-agent` adalah runtime executor yang nantinya menjalankan operasi deployment pada node.
- `sakala-infra` adalah playground runtime lokal serta referensi networking dan routing.
- `sakala-landing` adalah website publik, dokumentasi, dan pintu masuk SEO.

## Batas penting

Console berkomunikasi dengan API dan tidak mengakses Docker socket secara langsung. Agent melakukan polling command dari API, menjalankan pekerjaan runtime, lalu melaporkan event, log, status, dan heartbeat ke API.

Sakala tidak diarahkan menjadi alternatif cloud enterprise. Fokus awalnya adalah deployment yang lebih mudah dipelajari dan digunakan oleh project serta tim kecil.
