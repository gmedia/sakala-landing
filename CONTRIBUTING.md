# Contributing to Sakala Landing

Terima kasih atas minat berkontribusi pada website dan dokumentasi Sakala.

## Setup

Gunakan Node.js 22 dan npm:

```bash
npm install
npm run dev
```

`npm install` menjalankan `prepare` untuk mengaktifkan Husky. Hook `pre-commit` menjalankan `lint-staged` dan memformat file yang staged dengan Prettier.

## Branch dan Commit

Gunakan branch singkat seperti `feat/docs-quickstart` atau `fix/header-nav`. Commit harus mengikuti Conventional Commits, misalnya:

```txt
feat(landing): add community use case
docs(concepts): clarify agent boundary
```

## Aturan Perubahan

- Pertahankan copy pengguna dalam Bahasa Indonesia.
- Hindari client-side JavaScript bila HTML/CSS/Astro sudah mencukupi.
- Jangan mengubah brand direction atau domain contract tanpa diskusi.
- Tambahkan atau perbarui dokumentasi bila route, collection, atau navigasi berubah.
- Jangan memasukkan token, credential, atau secret pada source dan asset.

## Sebelum Pull Request

```bash
npm run format:check
npm run check
npm run build
```

Checklist pull request:

- [ ] Scope perubahan jelas dan terfokus.
- [ ] Copy serta tampilan mengikuti arah brand Sakala.
- [ ] Metadata/tautan diperiksa bila halaman publik berubah.
- [ ] Dokumentasi diperbarui bila diperlukan.
- [ ] Pemeriksaan lokal lulus.
