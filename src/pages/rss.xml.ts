import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("Astro site URL diperlukan untuk membuat RSS.");

  const entries = (await getCollection("changelog")).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );

  return rss({
    title: "Changelog Sakala",
    description:
      "Pembaruan publik website, dokumentasi, dan fondasi platform deployment open-source Sakala.",
    site,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: `/changelog/#v-${entry.data.version}`,
    })),
    customData: "<language>id-ID</language>",
  });
};
