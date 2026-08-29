import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { localizePath, type Lang } from "../i18n";

const meta = {
  id: {
    title: "Changelog Sakala",
    description:
      "Pembaruan publik website, dokumentasi, dan fondasi platform deployment open-source Sakala.",
    language: "id-ID",
  },
  en: {
    title: "Sakala Changelog",
    description:
      "Public updates to the website, documentation, and foundations of the Sakala open-source deployment platform.",
    language: "en-US",
  },
} as const satisfies Record<
  Lang,
  { title: string; description: string; language: string }
>;

/**
 * Satu feed per bahasa. Feed tidak boleh mencampur bahasa karena elemen
 * `language` hanya dapat menyatakan satu.
 */
export async function buildChangelogFeed(lang: Lang, site: URL | undefined) {
  if (!site) throw new Error("Astro site URL diperlukan untuk membuat RSS.");

  const entries = (await getCollection("changelog"))
    .filter((entry) => entry.data.lang === lang)
    .sort(
      (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
    );

  const changelogPath = localizePath("/changelog", lang);

  return rss({
    title: meta[lang].title,
    description: meta[lang].description,
    site,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: `${changelogPath}#v-${entry.data.version}`,
    })),
    customData: `<language>${meta[lang].language}</language>`,
  });
}
