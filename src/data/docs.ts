import { getCollection, type CollectionEntry } from "astro:content";

export type DocTrack = "panduan" | "teknis";

/**
 * Dua jalur dokumentasi yang berdiri sendiri. Pengguna yang hanya ingin
 * memakai Sakala tidak perlu melewati internal runtime untuk menemukan
 * jawabannya, dan sebaliknya.
 */
export const docTracks = {
  panduan: {
    label: "Panduan",
    title: "Panduan Sakala",
    href: "/docs",
    blurb: "Untuk kamu yang ingin memakai Sakala.",
  },
  teknis: {
    label: "Teknis",
    title: "Dokumentasi Teknis",
    href: "/docs/teknis",
    blurb: "Untuk yang ingin memahami atau ikut membangun.",
  },
} as const satisfies Record<
  DocTrack,
  { label: string; title: string; href: string; blurb: string }
>;

export type DocLink = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export type DocGroup = {
  section: string;
  items: DocLink[];
};

/** Halaman hub tiap jalur dirender oleh route tersendiri, bukan `[...slug]`. */
export const hubIds = ["index", "teknis"];

export function docHref(id: string): string {
  if (id === "index") return "/docs";
  if (id === "teknis") return "/docs/teknis";
  return `/docs/${id}`;
}

function toLink(entry: CollectionEntry<"docs">): DocLink {
  return {
    id: entry.id,
    title: entry.data.title,
    description: entry.data.description,
    href: docHref(entry.id),
  };
}

/** Kelompok untuk satu jalur, ditambah kelompok referensi yang muncul di
 *  kedua sidebar. */
export async function getTrackGroups(track: DocTrack): Promise<DocGroup[]> {
  const entries = await getCollection("docs");
  const selected = entries.filter(
    (entry) => entry.data.track === track || entry.data.track === "referensi",
  );

  const ordered = selected.sort((a, b) => {
    const trackWeight = (entry: CollectionEntry<"docs">) =>
      entry.data.track === "referensi" ? 1 : 0;
    const byTrack = trackWeight(a) - trackWeight(b);
    return byTrack !== 0 ? byTrack : a.data.order - b.data.order;
  });

  const groups: DocGroup[] = [];
  for (const entry of ordered) {
    const section = entry.data.section;
    const last = groups.at(-1);
    if (last && last.section === section) {
      last.items.push(toLink(entry));
    } else {
      groups.push({ section, items: [toLink(entry)] });
    }
  }
  return groups;
}

/** Urutan datar satu jalur, dipakai navigasi sebelumnya dan berikutnya. */
export async function getTrackSequence(track: DocTrack): Promise<DocLink[]> {
  const groups = await getTrackGroups(track);
  return groups.flatMap((group) => group.items);
}

export function trackFromPath(pathname: string): DocTrack {
  return pathname.startsWith("/docs/teknis") ? "teknis" : "panduan";
}
