import { links } from "./links";
import type { Dictionary } from "../i18n/id";
import { localizePath, type Lang } from "../i18n";

export type NavItem = {
  key: string;
  label: string;
  href: string;
  external?: boolean;
};

/**
 * Rute yang terbit dalam dua bahasa. Dipakai pemilih bahasa supaya ia tidak
 * pernah mengarah ke halaman yang tidak ada.
 */
export const bilingualRoutes = [
  "/",
  "/filosofi",
  "/produk",
  "/roadmap",
  "/open-source",
  "/changelog",
] as const;

export function isBilingual(path: string): boolean {
  if (path === "/docs" || path.startsWith("/docs/")) return true;
  return (bilingualRoutes as readonly string[]).includes(path);
}

/** Navigasi utama sengaja pendek. Sisanya berada di footer. */
export function getMainNavigation(lang: Lang, t: Dictionary): NavItem[] {
  return [
    {
      key: "philosophy",
      label: t.nav.philosophy,
      href: localizePath("/filosofi", lang),
    },
    {
      key: "product",
      label: t.nav.product,
      href: localizePath("/produk", lang),
    },
    { key: "docs", label: t.nav.docs, href: localizePath("/docs", lang) },
    {
      key: "roadmap",
      label: t.nav.roadmap,
      href: localizePath("/roadmap", lang),
    },
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
  { label: "Glosarium", href: "/docs/glosarium" },
  { label: "Pertanyaan umum", href: "/docs/faq" },
];
