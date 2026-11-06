import { languages, type Lang } from "../i18n";

/**
 * Tanggal mulai berlaku ketiga dokumen hukum. Ini satu-satunya tempatnya:
 * kalau tanggal terbit bergeser, cukup ubah baris ini.
 */
export const legalEffectiveDate = "2026-11-07";

/** Id sama dengan nama berkas di src/content/legal dan route publiknya. */
export const legalIds = ["privasi", "syarat", "penggunaan-wajar"] as const;

export type LegalId = (typeof legalIds)[number];

export function formatLegalDate(lang: Lang): string {
  return new Intl.DateTimeFormat(languages[lang].htmlLang, {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${legalEffectiveDate}T00:00:00Z`));
}
