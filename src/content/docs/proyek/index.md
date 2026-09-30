---
title: Dokumen Project
description: Sumber kebenaran Sakala — filosofi, visi, PRD, MVP, arsitektur, ADR, roadmap, dan governance — diterbitkan di sini, bukan di repository terpisah.
track: proyek
section: hub
order: 0
lang: id
---

# Dokumen Project Sakala

Inilah sumber kebenaran Sakala. Dokumen di jalur ini adalah dokumen kanonik
project: apa yang tertulis di sini adalah keputusan, dan perubahan di sini
ditinjau oleh maintainer. Halaman lain di situs ini — [Filosofi](/filosofi),
[Roadmap](/roadmap), [Dokumentasi Teknis](/docs/teknis) — adalah adaptasi
yang lebih naratif dari dokumen-dokumen ini.

Dokumen ditampilkan dalam bahasa aslinya dan sengaja tidak diterjemahkan,
supaya sumbernya tunggal. Aturannya: dokumen **arah produk** (Filosofi, Visi,
PRD, MVP, Roadmap, Strategi Desain, Sakala Learn, Sakala Explore) ditulis
dalam Bahasa Indonesia; dokumen **sistem dan komunitas** (Architecture, ADR,
Security, Platform Operations, Governance, Contributing, Glossary) ditulis
dalam bahasa Inggris. Tiap halaman menyebutkan bahasanya.

## Urutan otoritas

Ketika dua dokumen bertentangan, yang di atas menang.

```txt
PHILOSOPHY    mengapa Sakala ada
VISION        Sakala ingin menjadi apa
PRD           kemampuan produk yang dimiliki dan dituju
MVP           apa yang benar-benar harus dibangun sekarang
ARCHITECTURE  bagaimana boundary sistem bekerja
ADR           mengapa keputusan teknis besar diambil
ROADMAP       urutan pengembangan dan validation gate
DESIGN_STRATEGY, FEATURE_*, PLATFORM_OPERATIONS
GLOSSARY      bahasa domain bersama
```

Dokumen engineering per repository (`ARCHITECTURE.md`, `AGENTS.md`, README)
tetap ada dan tunduk pada dokumen di jalur ini.

## Prinsip kerja

```txt
Think broad.
Design ahead.
Build narrow.
Validate early.
Expand deliberately.
```

Dan untuk produk:

```txt
Code
→ Wujud
→ Hidup
→ Dibagikan
→ Dipelajari
→ Melahirkan karya berikutnya
```

## Mengubah dokumen di sini

Perubahan dokumen kanonik adalah keputusan project, bukan sekadar
penyuntingan. Ajukan lewat pull request ke repository situs ini; jalur
`src/content/docs/proyek/` ditinjau oleh Sakala Maintainers. Perubahan
arsitektur yang menggeser boundary dicatat sebagai ADR baru, bukan hanya
mengubah kalimat di `ARCHITECTURE`.

Baseline dokumentasi: 15 Agustus 2026, dipindahkan ke situs ini pada
17 September 2026, dan dimatangkan pada 1 Oktober 2026 (PRD 6.0, ADR-014
sampai ADR-017, aturan bahasa).
