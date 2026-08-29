import { getCollection, type CollectionEntry } from "astro:content";
import { defaultLang, type Lang } from "../i18n";

export type DocTrack = "panduan" | "teknis";

/**
 * Dua jalur dokumentasi yang berdiri sendiri. Pengguna yang hanya ingin
 * memakai Sakala tidak perlu melewati internal runtime untuk menemukan
 * jawabannya, dan sebaliknya.
 */
const trackCopy = {
  id: {
    panduan: {
      label: "Panduan",
      title: "Panduan Sakala",
      blurb: "Untuk kamu yang ingin memakai Sakala.",
    },
    teknis: {
      label: "Teknis",
      title: "Dokumentasi Teknis",
      blurb: "Untuk yang ingin memahami atau ikut membangun.",
    },
  },
  en: {
    panduan: {
      label: "Guide",
      title: "Using Sakala",
      blurb: "For people who want to use Sakala.",
    },
    teknis: {
      label: "Technical",
      title: "Technical Documentation",
      blurb: "For people who want to understand or help build it.",
    },
  },
} as const;

export function getTrackMeta(track: DocTrack, lang: Lang) {
  return { ...trackCopy[lang][track], href: trackHref(track, lang) };
}

export function trackHref(track: DocTrack, lang: Lang): string {
  const base = track === "teknis" ? "/docs/teknis" : "/docs";
  return lang === defaultLang ? base : `/${lang}${base}`;
}

export type DocLink = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export type DocGroup = { section: string; items: DocLink[] };

/** Halaman hub tiap jalur dirender oleh route tersendiri, bukan `[...slug]`. */
export const hubIds = ["index", "teknis", "en", "en/teknis"];

/** `en/teknis/konsep` menjadi `/en/docs/teknis/konsep`. */
export function docHref(id: string): string {
  const isEnglish = id === "en" || id.startsWith("en/");
  const rest = isEnglish ? id.replace(/^en\/?/, "") : id;
  const prefix = isEnglish ? "/en/docs" : "/docs";
  if (rest === "" || rest === "index") return prefix;
  return `${prefix}/${rest}`;
}

function toLink(entry: CollectionEntry<"docs">): DocLink {
  return {
    id: entry.id,
    title: entry.data.title,
    description: entry.data.description,
    href: docHref(entry.id),
  };
}

export async function getTrackGroups(
  track: DocTrack,
  lang: Lang,
): Promise<DocGroup[]> {
  const entries = await getCollection("docs");
  const selected = entries.filter(
    (entry) =>
      entry.data.lang === lang &&
      (entry.data.track === track || entry.data.track === "referensi"),
  );

  const ordered = selected.sort((a, b) => {
    const weight = (entry: CollectionEntry<"docs">) =>
      entry.data.track === "referensi" ? 1 : 0;
    const byTrack = weight(a) - weight(b);
    return byTrack !== 0 ? byTrack : a.data.order - b.data.order;
  });

  const groups: DocGroup[] = [];
  for (const entry of ordered) {
    const section = entry.data.section;
    const last = groups.at(-1);
    if (last && last.section === section) last.items.push(toLink(entry));
    else groups.push({ section, items: [toLink(entry)] });
  }
  return groups;
}

/** Urutan datar satu jalur, dipakai navigasi sebelumnya dan berikutnya. */
export async function getTrackSequence(
  track: DocTrack,
  lang: Lang,
): Promise<DocLink[]> {
  const groups = await getTrackGroups(track, lang);
  return groups.flatMap((group) => group.items);
}

export function trackFromPath(pathname: string): DocTrack {
  return pathname.includes("/docs/teknis") ? "teknis" : "panduan";
}

export function langFromDocPath(pathname: string): Lang {
  return pathname.startsWith("/en/") ? "en" : defaultLang;
}

/**
 * Locale yang benar-benar menerbitkan sebuah dokumen. Dihitung dari collection
 * supaya halaman yang belum diterjemahkan tidak mengumumkan alternate palsu.
 */
export async function getDocLocales(id: string): Promise<Lang[]> {
  const entries = await getCollection("docs");
  const bare = id.replace(/^en\/?/, "") || "index";
  const has = (lang: Lang) =>
    entries.some((entry) => {
      const entryBare = entry.id.replace(/^en\/?/, "") || "index";
      const entryLang = entry.data.lang;
      return entryLang === lang && (entryBare === bare || entry.id === bare);
    });
  return (["id", "en"] as Lang[]).filter(has);
}
