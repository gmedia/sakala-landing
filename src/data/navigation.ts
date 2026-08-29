import { links } from "./links";
import type { Dictionary } from "../i18n/id";
import type { Lang } from "../i18n";

export type NavItem = {
  key: string;
  label: string;
  href: string;
  external?: boolean;
};

/**
 * Rute yang benar-benar terbit dalam dua bahasa. Halaman lain sengaja tidak
 * dilokalkan supaya navigasi tidak pernah mengarah ke URL yang tidak ada, dan
 * supaya /en tidak menyajikan konten Bahasa Indonesia.
 */
export const bilingualRoutes = ["/"] as const;

export function isBilingual(path: string): boolean {
  return (bilingualRoutes as readonly string[]).includes(path);
}

export function getMainNavigation(_lang: Lang, t: Dictionary): NavItem[] {
  return [
    { key: "docs", label: t.nav.docs, href: "/docs" },
    { key: "about", label: t.nav.about, href: "/tentang" },
    { key: "changelog", label: t.nav.changelog, href: "/changelog" },
    {
      key: "github",
      label: t.nav.github,
      href: links.githubOrganization,
      external: true,
    },
  ];
}

export const docsNavigation = [
  { label: "Pengantar", href: "/docs" },
  { label: "Quickstart", href: "/docs/quickstart" },
  { label: "Konsep dasar", href: "/docs/concepts" },
  { label: "Alur deployment", href: "/docs/deployment-flow" },
  { label: "Cara kerja Agent", href: "/docs/agent-runtime" },
  { label: "Keluar dari localhost", href: "/docs/keluar-dari-localhost" },
  { label: "Pertanyaan umum", href: "/docs/faq" },
];
