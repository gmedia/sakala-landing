# AGENTS.md - Sakala Landing

Dokumen ini berlaku bagi AI agents, Codex CLI, automation tools, dan contributor yang bekerja pada `sakala-landing`.

## Identity

- Project: **Sakala Landing**
- Product: **Sakala**
- Stewardship: **Sakala Maintainers**
- Founding Sponsor: **PT Media Sarana Data / GMEDIA**
- License: **Apache License 2.0**
- Bahasa copy pengguna: **Bahasa Indonesia**

## Product dan Brand Rules

- Jangan mengubah arah brand tanpa persetujuan eksplisit.
- Pertahankan komposisi light base dengan dark anchor: hero, CTA, header, dan
  footer memakai permukaan teal pekat, sisanya latar terang.
- Ikuti bahasa visual Console pada Figma, bukan art direction landing lama
  (paper, receipt, editorial grid) yang sudah dipensiunkan.
- Jangan menjadikan seluruh halaman gelap, dan jangan memakai neon, glow, atau
  template SaaS generik.
- Copy yang dilihat pengguna tersedia dalam Bahasa Indonesia dan Inggris melalui
  `src/i18n/`. Bahasa Indonesia adalah default tanpa prefix URL.
- Jangan menyajikan konten Bahasa Indonesia pada route `/en/`, dan jangan
  mengumumkan hreflang untuk halaman yang belum diterjemahkan.
- Jangan membuat klaim layanan production atau enterprise yang belum tersedia.
- Jangan memosisikan Sakala sebagai produk tertutup milik GMEDIA. Gunakan framing: Sakala adalah project open-source yang didukung GMEDIA sebagai sponsor pendiri.
- Untuk pekerjaan UI/UX, baca `docs/PROJECT_DESIGN_CONTEXT.md`. Sumber kebenaran
  produk tetap `sakala-docs`; dokumen di `docs/` adalah turunan yang
  mendeskripsikan situs, bukan prinsip produk.
- Untuk pekerjaan SEO, metadata, structured data, sitemap, atau konten publik, baca dan ikuti `docs/PROJECT_SEO_AUDIT.md`.
- Untuk menambah atau mengubah fitur Astro, baca keputusan `docs/PROJECT_ASTRO_FEATURES.md`.

## Architecture Rules

- Pertahankan situs sebagai Astro SSG/static-first.
- Jangan menambahkan runtime server.
- Jangan menambahkan JavaScript client berat tanpa alasan terukur.
- Jangan menambahkan React, Vue, atau Svelte islands kecuali kebutuhan interaksi telah disetujui.
- Utamakan Astro components untuk section statis.
- Gunakan Tailwind CSS v4 melalui Vite plugin, bukan integrasi Tailwind lama.
- Gunakan prefetch secara selektif pada navigasi internal berintensi tinggi; jangan mengaktifkan `prefetchAll`.
- Gunakan API `fonts` Astro dengan provider `local`. Font disimpan di
  `src/assets/fonts/` beserta lisensinya; jangan menambah host font pihak ketiga.
- Pertahankan RSS changelog sebagai static endpoint yang bersumber dari content collection.
- Perbarui dokumentasi bila mengubah struktur situs, navigasi, atau content collections.

## Verification

```bash
npm run format:check
npm run check
npm run build
```

## Commit Convention

Gunakan Conventional Commits:

```txt
chore(landing): initialize Astro static site foundation
feat(docs): add deployment workflow guide
fix(seo): correct canonical docs url
```
