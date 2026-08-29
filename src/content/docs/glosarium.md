---
title: Glosarium
description: Istilah domain Sakala yang dipakai konsisten di console, API, agent, dan dokumentasi.
track: referensi
section: Referensi
order: 1
---

# Glosarium

Bahasa yang konsisten mencegah arsitektur yang tidak disengaja. Istilah di halaman ini dipakai dengan arti yang sama di seluruh console, API, agent, dan dokumentasi.

## Objek produk

**Project** — Objek produk berumur panjang milik pengguna. Ia memiliki konfigurasi source, deployment, variabel dan secret, domain, serta layanan pendukung di masa depan.

**Source atau repository** — Sumber Git yang terhubung ke sebuah project.

**Project analysis** — Pemeriksaan source untuk menentukan stack, build, dan petunjuk runtime.

**Deployment** — Satu percobaan mewujudkan satu revisi source menjadi workload yang berjalan. Sebuah project dapat memiliki banyak deployment.

**Active deployment** — Deployment yang saat ini melayani project atau environment.

**Workload atau service** — Unit yang dapat dijalankan. Saat ini berupa web service; worker, cron, dan static site adalah arah berikutnya.

**Environment** — Konteks terpisah seperti production, preview, dan development. Belum tersedia.

## Konfigurasi

**Variable** — Konfigurasi runtime yang bukan rahasia.

**Secret** — Konfigurasi sensitif yang membutuhkan enkripsi dan redaksi pada log.

**Resource policy** — CPU, memori, dan batas lain yang diminta serta diberlakukan, diputuskan oleh API.

**Hard safety limit** — Batas maksimum lokal sebuah node yang tidak akan dilampaui Agent, apa pun yang diminta control plane.

## Domain

**Generated domain** — Hostname bawaan Sakala dengan pola `<slug>.run.sakala.dev`.

**Custom domain** — Domain milik pengguna yang dipetakan ke workload Sakala. Belum tersedia.

## Runtime

**Control plane** — `sakala-api` beserta tanggung jawab state, policy, dan orkestrasinya.

**Data plane atau runtime** — Infrastruktur yang menjalankan build dan workload.

**Agent node** — Identitas Sakala Agent yang telah terdaftar.

**Runtime node** — Host yang mampu menjalankan workload pengguna melalui Sakala Agent.

**Gateway node** — Host yang bertanggung jawab atas ingress dan routing publik. Arah masa depan.

**AgentCommand** — Instruksi control plane yang diklaim lalu dieksekusi oleh Agent.

**Builder** — Mekanisme yang mengubah source menjadi image yang dapat dijalankan. Urutannya: Dockerfile, lalu Railpack, lalu konfigurasi manual.

**Railpack** — Sistem build plan otomatis yang dipakai Sakala ketika repository tidak menyediakan Dockerfile.

**Caddy route** — Konfigurasi pemetaan hostname runtime ke upstream lokal pada MVP.

## Ekosistem

**Template** — Titik awal project yang dapat dipakai ulang. Arah masa depan.

**Showcase** — Presentasi publik sebuah project atau aplikasi hidup. Arah masa depan.

**Creator** — Manusia atau organisasi yang diatribusikan pada sebuah karya.

**Collection** — Pengelompokan terkurasi berisi project, template, atau creator.

**Explore** — Lapisan penemuan publik yang memuat Projects, Templates, Creators, dan Collections.

## Kolaborasi dan belajar

**Workspace** — Batas kepemilikan dan kolaborasi yang memuat project dan anggota.

**Classroom atau program** — Kapabilitas Learn untuk alur penugasan dan deployment. Bukan LMS.

**Assignment** — Definisi tugas software delivery, opsional terhubung ke template dan resource policy.

## Proses

**Design Ready** — Rancangan UX sudah cukup matang untuk diserahkan dan ditinjau. Ini tidak berarti engineering sudah berkomitmen membangunnya.

**Engineering Committed** — Fitur sudah secara eksplisit diprioritaskan untuk diimplementasikan.

**MVP** — Milestone validasi yang ketat, bukan definisi lengkap tentang Sakala.

**Platform Console** — Permukaan operasional untuk maintainer, bukan panel admin CRUD biasa.

**Sakala Distribution** — Lapisan installer dan self-hosting di masa depan.

**CLI** — Antarmuka baris perintah untuk manusia dan operator di masa depan. Berbeda dari Agent.
