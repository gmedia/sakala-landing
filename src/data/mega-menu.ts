import { links } from "./links";

export const docsMegaMenu = {
  sections: [
    {
      title: "Panduan penggunaan",
      items: [
        {
          label: "Panduan Sakala",
          href: "/docs",
          description: "Titik masuk bagi yang ingin memakai Sakala.",
          icon: "play",
        },
        {
          label: "Keluar dari localhost",
          href: "/docs/keluar-dari-localhost",
          description: "Kenapa project perlu bisa dibuka orang lain.",
          icon: "link",
        },
        {
          label: "Menyiapkan project",
          href: "/docs/menyiapkan-project",
          description: "Yang perlu dibereskan di repository sebelum deploy.",
          icon: "nodes",
        },
      ],
    },
    {
      title: "Dokumentasi teknis",
      items: [
        {
          label: "Arsitektur sistem",
          href: "/docs/teknis/arsitektur",
          description: "Topologi, batas hak istimewa, dan invariant.",
          icon: "flow",
        },
        {
          label: "Cara kerja Agent",
          href: "/docs/teknis/agent",
          description: "Polling, claim, operating mode, dan executor.",
          icon: "nodes",
        },
        {
          label: "FAQ",
          href: "/docs/faq",
          description: "Status project, target user, dan kontribusi.",
          icon: "question",
        },
        {
          label: "Governance",
          href: "/governance",
          description: "Peran maintainer, sponsor, dan komunitas.",
          icon: "shield",
        },
      ],
    },
  ],
  ecosystem: [
    {
      label: "Console",
      href: links.repositories.console,
      description: "Antarmuka pengguna",
      external: true,
    },
    {
      label: "API",
      href: links.repositories.api,
      description: "Control plane",
      external: true,
    },
    {
      label: "Agent",
      href: links.repositories.agent,
      description: "Runtime executor",
      external: true,
    },
    {
      label: "Infra",
      href: links.repositories.infra,
      description: "Runtime playground",
      external: true,
    },
    {
      label: "Landing",
      href: links.repositories.landing,
      description: "Website & docs",
      external: true,
    },
  ],
  featured: {
    eyebrow: "Baru di Sakala?",
    label: "Mulai dari Panduan Sakala",
    href: "/docs",
    description:
      "Mulai dari panduan penggunaan. Dokumentasi teknis tersedia terpisah.",
  },
} as const;
