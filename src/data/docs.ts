import { getCollection, type CollectionEntry } from "astro:content";
import { defaultLang, type Lang } from "../i18n";

export type DocTrack = "panduan" | "teknis" | "proyek";

/**
 * Dua jalur dokumentasi yang berdiri sendiri. Jalur pertama menjelaskan
 * persoalan dan arahnya, jalur kedua menjelaskan mesinnya.
 *
 * Kunci `panduan` dipertahankan karena dipakai frontmatter setiap dokumen.
 * Salinannya tidak lagi berbunyi "panduan pakai": selama Sakala belum jadi
 * layanan publik, judul semacam itu menjanjikan sesuatu yang belum ada.
 */
const trackCopy = {
  id: {
    panduan: {
      label: "Pengantar",
      title: "Pengantar Sakala",
      blurb: "Persoalan yang dikerjakan dan arah yang sedang dibangun.",
    },
    teknis: {
      label: "Teknis",
      title: "Dokumentasi Teknis",
      blurb: "Untuk yang ingin memahami atau ikut membangun.",
    },
    proyek: {
      label: "Proyek",
      title: "Dokumen Project",
      blurb: "Sumber kebenaran: filosofi, PRD, arsitektur, ADR, roadmap.",
    },
  },
  en: {
    panduan: {
      label: "Overview",
      title: "Understanding Sakala",
      blurb: "The problem being worked on, and the direction being built.",
    },
    teknis: {
      label: "Technical",
      title: "Technical Documentation",
      blurb: "For people who want to understand or help build it.",
    },
    proyek: {
      label: "Project",
      title: "Project Documents",
      blurb: "Source of truth: philosophy, PRD, architecture, ADRs, roadmap.",
    },
  },
} as const;

/**
 * Kelompok di jalur `proyek`. Dokumen kanonik tampil di kedua bahasa, jadi
 * frontmatter `section`-nya memakai kunci ini dan labelnya diterjemahkan di
 * sini, bukan ditulis di tiap berkas.
 */
const projectSections: Record<string, Record<Lang, string>> = {
  arah: { id: "Arah", en: "Direction" },
  sistem: { id: "Sistem", en: "System" },
  rencana: { id: "Rencana", en: "Plans" },
  kerjasama: { id: "Kerja sama", en: "Working together" },
};

export function getTrackMeta(track: DocTrack, lang: Lang) {
  return { ...trackCopy[lang][track], href: trackHref(track, lang) };
}

export function trackHref(track: DocTrack, lang: Lang): string {
  const base = track === "panduan" ? "/docs" : `/docs/${track}`;
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
export const hubIds = [
  "index",
  "teknis",
  "proyek",
  "en",
  "en/teknis",
  "en/proyek",
];

/** `en/teknis/konsep` menjadi `/en/docs/teknis/konsep`. Dokumen kanonik
 *  (`proyek/*`) tidak punya salinan per bahasa, jadi route-nya mengikuti
 *  bahasa halaman yang memintanya. */
export function docHref(id: string, lang: Lang = defaultLang): string {
  const isEnglish = id === "en" || id.startsWith("en/");
  const rest = isEnglish ? id.replace(/^en\/?/, "") : id;
  const prefix = isEnglish || lang === "en" ? "/en/docs" : "/docs";
  if (rest === "" || rest === "index") return prefix;
  return `${prefix}/${rest}`;
}

function toLink(entry: CollectionEntry<"docs">, lang: Lang): DocLink {
  return {
    id: entry.id,
    title: entry.data.title,
    description: entry.data.description,
    href: docHref(entry.id, entry.data.canonical ? lang : defaultLang),
  };
}

export async function getTrackGroups(
  track: DocTrack,
  lang: Lang,
): Promise<DocGroup[]> {
  const entries = await getCollection("docs");
  // Halaman hub sudah diwakili pemilih jalur, jadi ia tidak diulang sebagai
  // item daftar di bawahnya.
  // Jalur proyek berisi dokumen kanonik saja: ia tampil di kedua bahasa dan
  // tidak dicampur dengan referensi terjemahan.
  const selected = entries.filter((entry) => {
    if (hubIds.includes(entry.id)) return false;
    if (track === "proyek") return entry.data.track === "proyek";
    return (
      entry.data.lang === lang &&
      (entry.data.track === track || entry.data.track === "referensi")
    );
  });

  const ordered = selected.sort((a, b) => {
    const weight = (entry: CollectionEntry<"docs">) =>
      entry.data.track === "referensi" ? 1 : 0;
    const byTrack = weight(a) - weight(b);
    return byTrack !== 0 ? byTrack : a.data.order - b.data.order;
  });

  const groups: DocGroup[] = [];
  for (const entry of ordered) {
    const section =
      track === "proyek"
        ? (projectSections[entry.data.section]?.[lang] ?? entry.data.section)
        : entry.data.section;
    const last = groups.at(-1);
    if (last && last.section === section) last.items.push(toLink(entry, lang));
    else groups.push({ section, items: [toLink(entry, lang)] });
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
  if (pathname.includes("/docs/teknis")) return "teknis";
  if (pathname.includes("/docs/proyek")) return "proyek";
  return "panduan";
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
  // Dokumen kanonik terbit di kedua route.
  if (entries.some((entry) => entry.id === id && entry.data.canonical))
    return ["id", "en"];
  const bare = id.replace(/^en\/?/, "") || "index";
  const has = (lang: Lang) =>
    entries.some((entry) => {
      const entryBare = entry.id.replace(/^en\/?/, "") || "index";
      const entryLang = entry.data.lang;
      return entryLang === lang && (entryBare === bare || entry.id === bare);
    });
  return (["id", "en"] as Lang[]).filter(has);
}
