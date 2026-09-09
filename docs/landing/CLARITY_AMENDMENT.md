# Clarity Amendment — Landing v3

Amandemen terhadap paket arah kreatif di direktori ini. Seluruh dokumen paket
tetap mengikat; amandemen ini menambah satu lapisan di atasnya dan menang bila
keduanya bertentangan pada hal yang diaturnya.

## Mengapa amandemen ini ada

Empat review eksternal independen (ChatGPT, Gemini, Grok, Claude) menilai
build v2 dan konvergen pada kesimpulan yang sama:

> Identitas dan narasinya kuat — jangan dirombak. Masalahnya adalah jarak
> antara cerita yang menarik dan pemahaman produk yang cepat.

Audit internal menambah dua temuan yang tidak ditangkap reviewer mana pun:
hero tidak memiliki satu pun tautan atau CTA, dan seluruh heading h1/h2
puitis tanpa satu pun kata kunci produk.

## Prinsip amandemen

```txt
Identitas tetap. Kejelasan bertambah.
```

- Metafora tidak dihapus; ia diberi jangkar faktual di tiap titik keputusan.
- Headline boleh puitis. Subheadline, heading persona, dan artefak membawa
  fakta.
- Satu aksi utama per fase kematangan. Pre-launch: **mengikuti perkembangan**
  (GitHub, RSS changelog, roadmap) — bukan pendaftaran untuk layanan yang
  belum ada.

## Perubahan yang diikat amandemen ini

1. Hero membawa subheadline konkret + pasangan CTA. Hero tanpa langkah
   berikutnya adalah cacat, bukan gaya.
2. Nav: Produk, Dokumentasi, Filosofi, Roadmap, GitHub. Developer yang
   scanning mencari Produk/Docs lebih dulu; Filosofi tetap satu klik.
3. Bab **Untuk Siapa** dengan heading lugas berkata kunci, personanya dari
   PRD sakala-docs §4 — bukan karangan.
4. Artefak **analisis repository** menjawab "stack apa yang didukung" lewat
   mekanisme terdokumentasi: Dockerfile → Railpack → manual (ADR-008).
5. Model deployment dijawab di bab Terbuka: runtime pilot didukung GMEDIA;
   self-host di roadmap (Horizon F). Tanpa menyebut pesaing.
6. Finale adalah blok follow ber-anchor, target CTA hero.

## Batas fakta (dari sakala-docs, baseline 2026-08-15)

**Jangan pernah mengklaim:**

- daftar bahasa/framework yang didukung — tidak ada di dokumen mana pun;
- "memaksimalkan yang minimal" — frasa ini tidak pernah ada di dokumen;
- perbandingan dengan Coolify/Dokku/Railway/Vercel — nol penyebutan kanonik;
- "production-ready", "enterprise-grade", "tanpa konfigurasi", "deploy sekali
  klik", "selalu tersedia" — larangan eksplisit design system;
- status implementasi per komponen — "Design Ready ≠ Engineering Committed"
  ditegaskan di empat tempat.

**Boleh diklaim (semua bersumber):**

- persona: mahasiswa, developer pemula, dosen/mentor, komunitas/workshop,
  tim kecil (`PRD.md` §4; `PHILOSOPHY.md:246`);
- builder Dockerfile → Railpack → manual, dengan hasil analisis yang dapat
  diperiksa (`ADR.md` ADR-008; `PRD.md:203`);
- workload saat ini Web Service; static/worker/cron menyusul (`PRD.md:249`);
- source: public GitHub repo dulu (`ADR.md` ADR-009);
- runtime pilot didukung GMEDIA; self-host di Horizon F (`GOVERNANCE.md`;
  `ROADMAP.md`);
- diferensiasi: transparansi ("Magic boleh terjadi, tetapi harus dapat
  dijelaskan" — `PHILOSOPHY.md:134`) dan belajar-melalui-wujud.

Contoh isi artefak analisis diambil verbatim dari `PHILOSOPHY.md:142-147`.

## Yang sengaja ditolak dari review

- **Stack pills** (Gemini) — tidak ada faktanya; dijawab lewat artefak
  mekanisme builder.
- **Waitlist email** — butuh layanan eksternal; kanal follow yang ada sudah
  jujur dan nol dependensi.
- **Menyebut pesaing** (Grok) — keputusan produk, dan nol dasar dokumen.
