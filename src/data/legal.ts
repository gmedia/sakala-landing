import { languages, type Lang } from "../i18n";

/** Id sama dengan nama berkas di src/content/legal dan route publiknya. */
export const legalIds = ["privasi", "syarat", "penggunaan-wajar"] as const;

export type LegalId = (typeof legalIds)[number];

/** Tanggal berlaku dari frontmatter dokumen (`effectiveDate`), untuk dibaca. */
export function formatLegalDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(languages[lang].htmlLang, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(date);
}

/** Nilai atribut `datetime`, misalnya `2026-11-30`. */
export function legalDateAttribute(date: Date): string {
  return date.toISOString().slice(0, 10);
}
