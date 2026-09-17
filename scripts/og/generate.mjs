/**
 * Membuat social preview (Open Graph) per halaman ke public/og/.
 *
 *   node scripts/og/generate.mjs
 *
 * Teks digambar sebagai path glyph dari berkas WOFF2 yang sama dengan situs
 * (src/assets/fonts), lalu dirasterisasi oleh sharp. Tidak butuh font
 * sistem, browser, maupun dependency baru: fontkitten dan sharp sudah hadir
 * sebagai dependency Astro. Jalankan ulang bila judul halaman berubah, lalu
 * commit hasilnya; build tidak memanggil skrip ini.
 *
 * Beranda tetap memakai og/default.png yang membawa lockup penuh.
 */
import { mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as fontkitten from "fontkitten";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const fontDir = resolve(root, "src/assets/fonts");
const outDir = resolve(root, "public/og");

const W = 1200;
const H = 630;
const PAD = 88;

/* Nilai dari src/styles/global.css. */
const color = {
  deep: "#08413d",
  deepBorder: "#14564f",
  onDeep: "#ffffff",
  label: "#ccfbf1",
  muted: "#b5d5d2",
};

/* Halaman yang mendapat preview sendiri. Judulnya mengikuti h1 halaman. */
const pages = [
  {
    lang: "id",
    slug: "produk",
    label: "Produk",
    title: "Apa yang Sakala kerjakan, dan sejauh mana.",
  },
  {
    lang: "id",
    slug: "filosofi",
    label: "Filosofi",
    title: "Kode bukan akhir dari sebuah karya.",
  },
  {
    lang: "id",
    slug: "roadmap",
    label: "Roadmap",
    title: "Arah, bukan janji tanggal.",
  },
  {
    lang: "id",
    slug: "open-source",
    label: "Open Source",
    title: "Terbuka agar dapat dipelajari, diaudit, dan dikoreksi.",
  },
  {
    lang: "id",
    slug: "docs",
    label: "Dokumentasi",
    title: "Pengantar Sakala dan dokumentasi teknis.",
  },
  {
    lang: "id",
    slug: "changelog",
    label: "Changelog",
    title: "Perkembangan yang bisa diperiksa.",
  },
  {
    lang: "en",
    slug: "produk",
    label: "Product",
    title: "What Sakala does, and how far along it is.",
  },
  {
    lang: "en",
    slug: "filosofi",
    label: "Philosophy",
    title: "Code is not where the work ends.",
  },
  {
    lang: "en",
    slug: "roadmap",
    label: "Roadmap",
    title: "Direction, not a promise of dates.",
  },
  {
    lang: "en",
    slug: "open-source",
    label: "Open Source",
    title: "Open so it can be studied, audited, and corrected.",
  },
  {
    lang: "en",
    slug: "docs",
    label: "Documentation",
    title: "Understanding Sakala, and the technical documentation.",
  },
  {
    lang: "en",
    slug: "changelog",
    label: "Changelog",
    title: "Progress you can check.",
  },
];

const mark = `
<g fill="none" stroke="${color.label}" stroke-linecap="round">
  <path stroke-width="6" d="M59.9579 41.315L73.7477 29.9708C75.7741 28.3039 75.6737 25.1702 73.5448 23.6364L45.9499 3.75461C44.5849 2.77111 42.7504 2.74691 41.3598 3.69406L18.7912 19.0667C9.63907 25.3007 9.4343 38.723 18.392 45.2333L40.2842 61.1441"/>
  <path stroke-width="4" d="M44.0316 68.1163C42.047 68.1163 40.4105 66.4896 40.4105 64.4493C40.4107 62.4092 42.0471 60.7833 44.0316 60.7833C46.0162 60.7833 47.6525 62.4092 47.6527 64.4493C47.6527 66.4897 46.0163 68.1163 44.0316 68.1163Z"/>
  <path stroke-width="6" d="M33.2947 41.8663L23.8719 35.1245C21.6184 33.5122 21.6471 30.1526 23.9278 28.579L33.2947 22.1163"/>
  <path stroke-width="6" d="M30.0421 66.9177L16.2523 78.2618C14.2259 79.9288 14.3263 83.0624 16.4552 84.5963L44.0501 104.478C45.4151 105.462 47.2496 105.486 48.6402 104.539L71.2088 89.166C80.3609 82.932 80.5657 69.5097 71.608 62.9994L49.7158 47.0886"/>
  <path stroke-width="4" d="M45.9684 40.1163C47.953 40.1164 49.5895 41.743 49.5895 43.7833C49.5893 45.8235 47.9529 47.4493 45.9684 47.4493C43.9838 47.4493 42.3475 45.8235 42.3473 43.7833C42.3473 41.743 43.9837 40.1163 45.9684 40.1163Z"/>
  <path stroke-width="6" d="M56.7053 66.3663L66.1281 73.1082C68.3816 74.7205 68.3529 78.0801 66.0722 79.6536L56.7053 86.1163"/>
</g>`;

async function loadFont(file) {
  return fontkitten.create(await readFile(resolve(fontDir, file)));
}

/** Menggambar satu baris teks sebagai path. Tanpa kerning; cukup untuk
 *  judul preview. Mengembalikan markup dan lebar dalam px. */
function line(font, text, size, x, y, fill) {
  const scale = size / font.unitsPerEm;
  let cursor = 0;
  const parts = [];
  for (const ch of text) {
    const glyph = font.glyphForCodePoint(ch.codePointAt(0));
    const d = glyph.path.toSVG();
    if (d) {
      parts.push(
        `<path transform="translate(${(x + cursor * scale).toFixed(2)} ${y}) scale(${scale.toFixed(5)} ${(-scale).toFixed(5)})" d="${d}"/>`,
      );
    }
    cursor += glyph.advanceWidth;
  }
  return {
    svg: `<g fill="${fill}">${parts.join("")}</g>`,
    width: cursor * scale,
  };
}

function measure(font, text, size) {
  const scale = size / font.unitsPerEm;
  let w = 0;
  for (const ch of text)
    w += font.glyphForCodePoint(ch.codePointAt(0)).advanceWidth;
  return w * scale;
}

/** Membungkus judul ke beberapa baris di dalam lebar maksimum. */
function wrap(font, text, size, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (measure(font, next, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else current = next;
  }
  if (current) lines.push(current);
  return lines;
}

const display = await loadFont("montserrat-700.woff2");
const body = await loadFont("inter-500.woff2");

for (const page of pages) {
  const maxWidth = W - PAD * 2;
  let size = 64;
  let lines = wrap(display, page.title, size, maxWidth);
  while (lines.length > 3 && size > 44) {
    size -= 4;
    lines = wrap(display, page.title, size, maxWidth);
  }
  const lineHeight = size * 1.12;
  const titleTop = 300;

  const label = line(body, `${page.label} · Sakala`, 24, PAD, 236, color.label);
  const footer = line(
    body,
    "sakala.dev · Manifesting Code into Reality",
    22,
    PAD,
    H - PAD + 6,
    color.muted,
  );
  const title = lines
    .map(
      (text, i) =>
        line(display, text, size, PAD, titleTop + i * lineHeight, color.onDeep)
          .svg,
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
      <path d="M42 0H0V42" fill="none" stroke="${color.deepBorder}" stroke-width="1" opacity="0.55"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <mask id="gridmask"><rect width="${W}" height="${H}" fill="url(#fade)"/></mask>
  </defs>
  <rect width="${W}" height="${H}" fill="${color.deep}"/>
  <rect width="${W}" height="${H}" fill="url(#grid)" mask="url(#gridmask)"/>
  <g transform="translate(${PAD} ${PAD}) scale(1.05)">${mark}</g>
  ${label.svg}
  ${title}
  <rect x="${PAD}" y="${H - PAD - 36}" width="120" height="1" fill="${color.label}" opacity="0.6"/>
  ${footer.svg}
</svg>`;

  const dir = resolve(outDir, page.lang === "id" ? "." : page.lang);
  await mkdir(dir, { recursive: true });
  const file = resolve(dir, `${page.slug}.png`);
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9, palette: true })
    .toFile(file);
  console.log("wrote", file.replace(root + "/", ""));
}
