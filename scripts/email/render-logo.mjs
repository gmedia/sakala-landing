/**
 * Membuat logo PNG untuk email transaksional ke public/email/.
 *
 *   node scripts/email/render-logo.mjs
 *
 * Gmail dan Outlook tidak menampilkan SVG, jadi email memakai PNG ini lewat
 * URL tetap https://sakala.dev/email/sakala-logo@2x.png (sakala-api,
 * docs/EMAIL.md). Sumbernya lockup di public/brand/sakala-lockup.svg dengan
 * warna Green Teal, digambar 2x untuk lebar tampil 140 px di atas tile putih
 * bersudut bulat, supaya tetap terbaca di klien email gelap yang tidak
 * membalik warna gambar.
 *
 * sharp (dengan librsvg) sudah hadir sebagai dependency Astro. Jalankan ulang
 * hanya bila logo berubah, lalu commit hasilnya; build tidak memanggil skrip
 * ini. Nama berkasnya jangan diganti, karena email yang sudah terkirim tetap
 * menunjuk ke sana.
 */
import { readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const source = resolve(root, "public/brand/sakala-lockup.svg");
const output = resolve(root, "public/email/sakala-logo@2x.png");

const TEAL = "#0F766E";
const TILE = "#FFFFFF";

/* Ukuran dalam piksel 2x. Tampil di email: 140 x 59 px. */
const WIDTH = 280;
const PAD_X = 20;
const PAD_Y = 16;
const RADIUS = 16;

const svg = (await readFile(source, "utf8")).replaceAll("currentColor", TEAL);

/* Gambar jauh lebih besar, buang tepi kosong, lalu perkecil supaya tepinya halus. */
const trimmed = await sharp(Buffer.from(svg), { density: 72 * 12 })
  .trim()
  .png()
  .toBuffer();
const logo = await sharp(trimmed)
  .resize({ width: WIDTH - PAD_X * 2, kernel: "lanczos3" })
  .png()
  .toBuffer({ resolveWithObject: true });

const height = logo.info.height + PAD_Y * 2;
const tile = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${height}">` +
    `<rect width="${WIDTH}" height="${height}" rx="${RADIUS}" fill="${TILE}"/></svg>`,
);

const raw = await sharp(tile)
  .composite([{ input: logo.data, left: PAD_X, top: PAD_Y }])
  .raw()
  .toBuffer({ resolveWithObject: true });

/* Lossless. Filter adaptif per baris justru membuat berkas ini lebih besar. */
await sharp(raw.data, { raw: raw.info })
  .png({ compressionLevel: 9, adaptiveFiltering: false })
  .toFile(output);

const { size } = await stat(output);
console.log(`${output}: ${WIDTH} x ${height} px, ${size} byte`);
