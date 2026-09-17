import { defaultLang, type Lang } from "../i18n";

/**
 * Social preview per halaman. Berkasnya dibuat oleh scripts/og/generate.mjs
 * dan di-commit di public/og; daftar ini harus sejalan dengan daftar halaman
 * di skrip itu. Halaman di luar daftar, termasuk beranda, memakai
 * og/default.png yang membawa lockup penuh.
 */
const slugs = new Set([
  "produk",
  "filosofi",
  "roadmap",
  "open-source",
  "docs",
  "changelog",
]);

export function ogImageFor(basePath: string, lang: Lang): string {
  const first = basePath.split("/").filter(Boolean)[0];
  if (!first || !slugs.has(first)) return "/og/default.png";
  const prefix = lang === defaultLang ? "/og" : `/og/${lang}`;
  return `${prefix}/${first}.png`;
}
