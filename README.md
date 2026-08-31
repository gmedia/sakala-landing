# Sakala Landing

Website publik dan pusat dokumentasi awal untuk **Sakala**, project deployment
open-source yang diinisiasi oleh maintainer Sakala dan didukung oleh GMEDIA
sebagai sponsor pendiri. Situs ini ditujukan untuk `https://sakala.dev`,
sementara console produk berada pada `https://app.sakala.dev` dan control plane
API berada pada `https://api.sakala.dev`.

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

## Container Image

Landing tetap static-first. `Dockerfile` hanya membangun artefak Astro dan menyajikannya melalui Caddy internal pada port `8080`; ia tidak menambahkan server aplikasi atau secret runtime.

```bash
docker build -t sakala-landing:local .
docker run --rm -p 8080:8080 sakala-landing:local
```

Untuk deployment Sakala, konfigurasi domain, TLS, reverse proxy host, dan path rilis dikelola di repository deployment terpisah. Image ini tidak membawa konfigurasi production tersebut.

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
- `src/pages/`: route statis `/`, `/tentang`, `/governance`, `/docs`,
  `/changelog`, `/rss.xml`, serta `/404`.
- `public/`: logo, favicon, robots, dan Open Graph image.
- `docs/`: dokumen kerja repository. Bukan dokumentasi publik.

## Dokumen Kerja

Arah kreatif landing berada di [`docs/landing/`](docs/landing/README.md),
dan itulah sumber kebenaran untuk rebuild homepage berikutnya. Keputusan
teknis repository berada di [`docs/`](docs/README.md).

Urutan otoritasnya dijelaskan pada [`docs/README.md`](docs/README.md).
Ringkasnya: dokumentasi project Sakala, lalu Design System, lalu
`docs/landing/`, lalu keputusan teknis, baru implementasi.

## Governance dan Sponsor

Sakala menggunakan Apache License 2.0 dan dikembangkan dengan roadmap,
dokumentasi, issue, serta kontribusi publik. GMEDIA berperan sebagai founding
sponsor dan infrastructure supporter pada fase awal.

Baca [GOVERNANCE.md](GOVERNANCE.md) dan [SPONSORS.md](SPONSORS.md) untuk
memahami batas peran sponsor, maintainer, dan arah komunitas Sakala.

Prinsip pencatatan contributor awal dijelaskan di
[CONTRIBUTORS.md](CONTRIBUTORS.md). Nama baru dicantumkan setelah kontribusinya
nyata dan contributor memberikan persetujuan.

## Kontribusi

Sakala Landing menggunakan Apache License 2.0. Baca
[CONTRIBUTING.md](CONTRIBUTING.md) dan
[keputusan fitur Astro](docs/PROJECT_ASTRO_FEATURES.md) sebelum membuat pull
request, lalu ikuti Conventional Commits.

Untuk pekerjaan pada homepage, baca [AGENTS.md](AGENTS.md) dan
[`docs/landing/`](docs/landing/README.md) lebih dulu.
