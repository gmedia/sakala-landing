import { id, type Dictionary } from "./id";
import { en } from "./en";

export type { Dictionary };

export const languages = {
  id: {
    label: "Bahasa Indonesia",
    short: "ID",
    htmlLang: "id",
    ogLocale: "id_ID",
  },
  en: { label: "English", short: "EN", htmlLang: "en", ogLocale: "en_US" },
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "id";
export const locales = Object.keys(languages) as Lang[];

const dictionaries = { id, en } as const;

export function useTranslations(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split("/");
  return maybeLang in languages ? (maybeLang as Lang) : defaultLang;
}

/** Strips the locale prefix so a path can be re-localized to another language. */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && segments[0] in languages && segments[0] !== defaultLang) {
    segments.shift();
  }
  return `/${segments.join("/")}`;
}

/** Trailing slash dipertahankan agar hreflang identik dengan canonical
 *  yang dihasilkan Astro. */
export function localizePath(pathname: string, lang: Lang): string {
  const segments = stripLocale(pathname).split("/").filter(Boolean);
  const base = segments.length ? `/${segments.join("/")}` : "";
  const prefixed = lang === defaultLang ? base : `/${lang}${base}`;
  return prefixed === "" ? "/" : `${prefixed}/`;
}

/**
 * Alternate links for hreflang. Only locales that actually publish the page
 * are listed, because a silent fallback would serve the wrong language.
 */
export function getAlternates(pathname: string, available: Lang[] = locales) {
  return available.map((lang) => ({
    lang,
    htmlLang: languages[lang].htmlLang,
    path: localizePath(pathname, lang),
  }));
}
