# Sakala Landing

Website publik dan pusat dokumentasi awal untuk **Sakala**, platform deployment open-source dari PT Media Sarana Data / GMEDIA. Situs ini ditujukan untuk `https://sakala.dev`, sementara dashboard produk berada pada `https://app.sakala.dev`.

## Stack

- Astro dengan output static/SSG
- TypeScript
- Tailwind CSS v4 melalui Vite plugin
- MDX dan Astro Content Collections
- Selective prefetch untuk navigasi internal penting
- Sitemap, RSS changelog, Open Graph metadata, serta canonical URL
- Prettier, Husky, dan lint-staged

## Quickstart

Persyaratan: Node.js 22 dan npm.

```bash
npm install
npm run dev
```

Server development Astro akan menampilkan alamat lokal pada terminal.

## Scripts

```bash
npm run dev          # development server
npm run format       # menulis format Prettier
npm run format:check # memeriksa format
npm run check        # type/content/Astro check
npm run build        # check kemudian static build
npm run preview      # pratinjau hasil build
```

Setelah `npm install`, script `prepare` mengaktifkan hook Husky. Commit akan menjalankan `lint-staged` agar file Astro, TypeScript, Markdown, JSON, dan CSS yang staged diformat dengan Prettier.

## Struktur

- `src/components/landing/`: bagian-bagian landing page.
- `src/content/docs/`: dokumentasi publik berbasis content collection.
- `src/layouts/`: layout SEO, landing, dan dokumentasi.
- `src/pages/`: route statis `/`, `/tentang`, `/docs`, `/changelog`, `/rss.xml`,
  serta `/404`.
- `public/`: logo, favicon, robots, dan Open Graph image.

## Kontribusi

Sakala Landing menggunakan Apache License 2.0. Baca
[CONTRIBUTING.md](CONTRIBUTING.md) dan
[keputusan fitur Astro](docs/PROJECT_ASTRO_FEATURES.md) sebelum membuat pull
request, lalu ikuti Conventional Commits.
