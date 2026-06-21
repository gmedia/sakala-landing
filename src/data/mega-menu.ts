import { links } from "./links";

export const docsMegaMenu = {
  sections: [
    {
      title: "Mulai",
      items: [
        {
          label: "Quickstart",
          href: "/docs/quickstart",
          description: "Alur awal dari Git menuju URL publik.",
          icon: "play",
        },
        {
          label: "Keluar dari localhost",
          href: "/docs/keluar-dari-localhost",
          description: "Kenapa project perlu bisa dibuka orang lain.",
          icon: "link",
        },
        {
          label: "Konsep dasar",
          href: "/docs/concepts",
          description: "Peran console, API, agent, infra, dan runtime.",
          icon: "nodes",
        },
      ],
    },
    {
      title: "Teknis",
      items: [
        {
          label: "Alur deployment",
          href: "/docs/deployment-flow",
          description: "Command, status, routing, dan runtime.",
          icon: "flow",
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
    label: "Mulai dari Quickstart",
    href: "/docs/quickstart",
    description:
      "Ikuti gambaran alur Sakala dulu, lalu lanjut ke konsep dasar.",
  },
} as const;
