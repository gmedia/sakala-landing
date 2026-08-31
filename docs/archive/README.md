# Arsip Dokumen

Dokumen di direktori ini **tidak lagi mengikat**. Isinya disimpan sebagai
catatan sejarah, bukan sebagai acuan kerja.

## Kenapa diarsipkan, bukan dihapus

Keduanya memuat konteks yang masih berguna: alasan di balik keputusan lama,
hasil pengukuran yang masih valid, dan jejak bagaimana landing sampai pada
bentuk sebelumnya. Menghapusnya akan menghilangkan alasan, menyisakan hasil.

Yang **tidak** boleh diambil dari sini adalah arah kreatif: narasi homepage,
urutan section, art direction, motion, dan hierarki konten. Semua itu kini
ditetapkan oleh [`docs/landing/`](../landing/).

## Isi

### `PROJECT_DESIGN_CONTEXT.md`

Sistem desain landing hasil rebuild sebelumnya: komposisi light base dengan
dark anchor, struktur halaman sebelas baris, dan aturan komponennya.

Bagian yang masih akurat sebagai catatan teknis:

- hasil hitung kontras token terhadap permukaan gelap `#08413D`;
- temuan bahwa `--color-primary` hanya mencapai 2.09:1 di atas permukaan gelap,
  sehingga focus ring memerlukan token terpisah;
- pola pemisahan jalur dokumentasi lewat field `track`.

Bagian yang sudah tidak berlaku: seluruh arah kreatif dan struktur homepage.

### `PROJECT_LANDING_REBUILD_PLAN.md`

Rencana kerja rebuild sebelumnya, termasuk penelusuran tiap pagar desain ke
dokumen `sakala-docs`.

Metodenya masih layak dicontoh: setiap aturan ditelusuri ke sumbernya, dan
aturan tanpa jejak tidak diperlakukan sebagai pagar. Isi spesifiknya sudah
tergantikan.

## Kalau ragu

Ketika dokumen di sini bertentangan dengan `docs/landing/`, `docs/landing/`
yang menang. Kalau bertentangan dengan `sakala-docs`, `sakala-docs` yang menang.
