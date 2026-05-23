## Ringkasan

Jelaskan perubahan utama pada pull request ini.

## Jenis Perubahan

- [ ] `feat` - halaman, komponen, atau konten baru
- [ ] `fix` - perbaikan bug atau SEO/accessibility
- [ ] `docs` - dokumentasi
- [ ] `style` - tampilan tanpa perubahan perilaku
- [ ] `build` / `ci` - tooling atau automation
- [ ] `chore` - maintenance

## Area yang Terdampak

- [ ] Landing page / brand UI
- [ ] Dokumentasi / changelog
- [ ] Navigation / content collections
- [ ] SEO / social metadata
- [ ] Build / dependency / CI
- [ ] Security / policies

## Cara Menguji

```bash
npm run format:check
npm run check
npm run build
```

## Checklist

- [ ] Commit mengikuti Conventional Commits (`type(scope): message`).
- [ ] Copy pengguna tetap Bahasa Indonesia dan sesuai arah brand.
- [ ] Situs tetap static-first tanpa JavaScript client yang tidak diperlukan.
- [ ] Tidak ada secret atau credential pada source dan asset.
- [ ] Dokumentasi diperbarui bila route, navigasi, atau collection berubah.
- [ ] Semua pemeriksaan lokal lulus.

## Related Issue

Closes #
