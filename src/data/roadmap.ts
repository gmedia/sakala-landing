export const roadmapItems = [
  {
    stage: "Sekarang",
    title: "Pondasi sudah disiapkan",
    description:
      "Landing, pondasi dashboard, pondasi agent, dan runtime lokal untuk pengujian.",
    active: true,
  },
  {
    stage: "Berikutnya",
    title: "Menguji alur pertama",
    description:
      "Login GitHub, pembuatan project, dan simulasi deployment yang bisa diikuti.",
    active: false,
  },
  {
    stage: "Nanti",
    title: "Runtime deployment awal",
    description:
      "Build Docker, routing Caddy, sleep/wake, dan pilot kecil bersama kampus.",
    active: false,
  },
];

export const developmentStatuses = [
  { name: "Website & dokumentasi", state: "tersedia", tone: "ready" },
  { name: "Dashboard & agent", state: "pondasi", tone: "progress" },
  { name: "Alur deployment", state: "berikutnya", tone: "progress" },
  { name: "Runtime publik", state: "belum tersedia", tone: "later" },
] as const;
