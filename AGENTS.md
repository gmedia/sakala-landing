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
- Pertahankan antarmuka light-first, bersih, hangat, dan aksen teal.
- Jangan memakai gaya dark cyberpunk, AI glow, atau template SaaS generik.
- Copy yang dilihat pengguna harus dalam Bahasa Indonesia, kecuali nama teknis atau badge yang sudah ditetapkan.
- Jangan membuat klaim layanan production atau enterprise yang belum tersedia.
- Jangan memosisikan Sakala sebagai produk tertutup milik GMEDIA. Gunakan framing: Sakala adalah project open-source yang didukung GMEDIA sebagai sponsor pendiri.
- Untuk pekerjaan UI/UX, baca guideline `docs/PROJECT_DESIGN_CONTEXT.md`.
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
