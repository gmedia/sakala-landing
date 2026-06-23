import { links } from "./links";

export const mainNavigation = [
  { label: "Dokumentasi", href: "/docs" },
  { label: "Tentang", href: "/tentang" },
  { label: "Changelog", href: "/changelog" },
  { label: "GitHub", href: links.githubRepository, external: true },
];

export const docsNavigation = [
  { label: "Pengantar", href: "/docs" },
  { label: "Quickstart", href: "/docs/quickstart" },
  { label: "Konsep dasar", href: "/docs/concepts" },
  { label: "Alur deployment", href: "/docs/deployment-flow" },
  { label: "Cara kerja Agent", href: "/docs/agent-runtime" },
  { label: "Keluar dari localhost", href: "/docs/keluar-dari-localhost" },
  { label: "Pertanyaan umum", href: "/docs/faq" },
];
