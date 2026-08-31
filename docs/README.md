# Dokumentasi Repository Sakala Landing

Direktori ini memuat dokumen kerja untuk `sakala-landing`. Dokumentasi publik
yang tampil di situs berada pada `src/content/docs/`, bukan di sini.

## Urutan otoritas

Ketika dua dokumen bertentangan, yang di atas menang.

```txt
1. Dokumentasi project Sakala      sakala-docs
2. Sakala Design System            Figma
3. docs/landing/                   arah kreatif landing
4. docs/PROJECT_*.md               keputusan teknis repository
5. Implementasi saat ini           src/
```

Implementasi berada di urutan terakhir. Sesuatu tidak menjadi benar hanya
karena ia sudah ada di dalam kode.

## Isi

### `landing/` — arah kreatif

Sumber kebenaran untuk rebuild homepage berikutnya. Konsepnya
`The Life of a Project` dengan busur `Possibility → Presence → Continuation`.

Mulai dari [`landing/README.md`](landing/README.md), lalu ikuti urutan baca
yang disebutkan di sana. Berbahasa Inggris, sejalan dengan `sakala-docs`.

Untuk agent maupun contributor yang akan mengerjakan homepage,
[`landing/AI_AGENT_PLAYBOOK.md`](landing/AI_AGENT_PLAYBOOK.md) menetapkan
alur kerjanya, dimulai dari Phase 0 — Audit sebelum menyentuh kode.

### Keputusan teknis repository

| Dokumen                                                  | Isi                                                       |
| -------------------------------------------------------- | --------------------------------------------------------- |
| [`PROJECT_LANDING_BUILD.md`](PROJECT_LANDING_BUILD.md)   | Konteks implementasi landing v2: bab, artefak, gerak      |
| [`PROJECT_ASTRO_FEATURES.md`](PROJECT_ASTRO_FEATURES.md) | Fitur Astro yang aktif dan yang ditunda: i18n, fonts, RSS |
| [`PROJECT_SEO_AUDIT.md`](PROJECT_SEO_AUDIT.md)           | Audit SEO, sinyal entitas, dan alur Search Console        |

Ketiganya tetap berlaku. Aturan spesifik soal routing i18n, provider font
`local`, dan prefetch selektif tinggal di sini, bukan di `AGENTS.md`.

### `archive/` — sudah disupersede

Berisi arah kreatif dari rebuild sebelumnya. Dokumen di sana **tidak lagi
mengikat**, tetapi disimpan karena memuat konteks historis dan sebagian catatan
teknis yang masih akurat.

Jangan memakainya sebagai acuan desain. Lihat
[`archive/README.md`](archive/README.md).

## Menambah dokumen

Letakkan berdasarkan sifatnya, bukan kapan ditulisnya:

- arah kreatif landing → `landing/`
- keputusan teknis repository → `docs/` dengan awalan `PROJECT_`
- sudah tidak berlaku → pindahkan ke `archive/`, jangan dihapus

Dokumen yang sudah tidak berlaku wajib dipindah, bukan sekadar diberi catatan
di dalam isinya. Dokumen usang yang duduk bersebelahan dengan yang aktif pernah
membuat rebuild sebelumnya mengunci diri pada desain yang justru sedang diganti.
