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
  "/privasi",
  "/syarat",
  "/penggunaan-wajar",
] as const;

export function isBilingual(path: string): boolean {
  if (path === "/docs" || path.startsWith("/docs/")) return true;
  return (bilingualRoutes as readonly string[]).includes(path);
}

/** Path tanpa trailing slash, kecuali root, supaya `/produk` dan `/produk/`
 *  dibandingkan sebagai halaman yang sama. */
export function withoutTrailingSlash(path: string): string {
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

/**
 * Nilai `aria-current` untuk satu item navigasi: `page` di halaman itu
 * sendiri, `true` di halaman yang berada di bawahnya (misalnya satu dokumen
 * di bawah Dokumentasi), dan tidak ada untuk halaman lain.
 */
export function navCurrent(
  currentPath: string,
  item: NavItem,
): "page" | "true" | undefined {
  if (item.external) return undefined;
  const current = withoutTrailingSlash(currentPath);
  const target = withoutTrailingSlash(item.href);
  if (current === target) return "page";
  return current.startsWith(`${target}/`) ? "true" : undefined;
}

/** Navigasi utama sengaja pendek. Sisanya berada di footer.
 *  Produk dan Dokumentasi mendahului Filosofi: developer yang scanning mencari
 *  keduanya lebih dulu, dan filosofi tetap satu klik untuk yang mencarinya. */
export function getMainNavigation(lang: Lang, t: Dictionary): NavItem[] {
  return [
    {
      key: "product",
      label: t.nav.product,
      href: localizePath("/produk", lang),
    },
    { key: "docs", label: t.nav.docs, href: localizePath("/docs", lang) },
    {
      key: "philosophy",
      label: t.nav.philosophy,
      href: localizePath("/filosofi", lang),
    },
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
