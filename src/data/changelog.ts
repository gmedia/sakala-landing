import type { CollectionEntry } from "astro:content";

/**
 * Anchor sebuah entri changelog: slug berkasnya, tanpa prefix bahasa.
 * Changelog situs sengaja tidak memakai nomor versi; nomor versi milik rilis
 * repository (tag git dan CHANGELOG.md), bukan catatan perkembangan project.
 */
export function changelogAnchor(entry: CollectionEntry<"changelog">): string {
  return entry.id.replace(/^en\//, "");
}
