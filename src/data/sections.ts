import { links } from "./links";

/**
 * Struktur dan status section landing. Seluruh teks yang dibaca pengguna
 * berada di src/i18n, sehingga urutan dan status tidak perlu diduplikasi
 * per bahasa.
 */

export type Tone = "ready" | "progress" | "testing" | "later";

/** Status pengembangan. Desain dan engineering sengaja dipisah, mengikuti
 *  PRD.md: "Design Ready does not equal Engineering Committed". */
export const statusItems = [
  { id: "design", kind: "design", tone: "ready" },
  { id: "foundation", kind: "engineering", tone: "progress" },
  { id: "runtime", kind: "engineering", tone: "testing" },
  { id: "service", kind: "engineering", tone: "later" },
] as const satisfies ReadonlyArray<{
  id: string;
  kind: "design" | "engineering";
  tone: Tone;
}>;

export const problemIds = [
  "localhost",
  "handover",
  "setup",
  "tooEarly",
] as const;

/** Core loop PHILOSOPHY.md: Source → Build → Deploy → Run → Reach. */
export const crossingSteps = [
  "source",
  "build",
  "deploy",
  "run",
  "reach",
] as const;

/** Tujuh prinsip PHILOSOPHY.md, urutan mengikuti dokumen aslinya. */
export const principleIds = [
  "wujud",
  "purna",
  "sederhana",
  "terang",
  "tumbuh",
  "berbagi",
  "manusia",
] as const;

/** Pilar VISION.md yang berlaku setelah sebuah karya hidup. Semuanya arah,
 *  bukan kapabilitas yang tersedia — karena itu tone tidak pernah "ready". */
export const afterlifePillars = [
  { id: "operate", tone: "progress" },
  { id: "explore", tone: "later" },
  { id: "learn", tone: "later" },
] as const satisfies ReadonlyArray<{ id: string; tone: Tone }>;

export const audienceIds = [
  "student",
  "beginner",
  "instructor",
  "creator",
  "community",
  "team",
] as const;

/** Horizon produk ROADMAP.md. */
export const roadmapItems = [
  { id: "a", tone: "progress" },
  { id: "b", tone: "later" },
  { id: "c", tone: "later" },
  { id: "d", tone: "later" },
  { id: "e", tone: "later" },
  { id: "f", tone: "later" },
] as const satisfies ReadonlyArray<{ id: string; tone: Tone }>;

export const faqIds = [
  "ready",
  "docker",
  "enterprise",
  "gmedia",
  "contribute",
  "selfhost",
] as const;

export const ecosystemRepositories = [
  { id: "console", href: links.repositories.console },
  { id: "api", href: links.repositories.api },
  { id: "agent", href: links.repositories.agent },
  { id: "infra", href: links.repositories.infra },
  { id: "landing", href: links.repositories.landing },
] as const;
