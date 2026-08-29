import type { Dictionary } from "./id";

export const en: Dictionary = {
  meta: {
    siteTitle: "Sakala — Bringing Code to Life as Real Applications",
    siteDescription:
      "Sakala is an open-source deployment project that helps code move from a repository into an application people can open, share, and learn from. Still under active development.",
    homeTitle: "Sakala — Manifesting Code into Reality",
    homeDescription:
      "Sakala helps projects move from a Git repository into applications that genuinely run. An open-source project being built in the open.",
    ogAlt: "Sakala logo with the tagline Manifesting Code into Reality",
    skipToContent: "Skip to main content",
  },

  nav: {
    label: "Main navigation",
    docs: "Documentation",
    about: "About",
    changelog: "Changelog",
    github: "GitHub",
    console: "Sign in",
    menu: "Menu",
    close: "Close",
    languageLabel: "Choose language",
    docsNoteForEnglish: "Documentation is currently written in Indonesian.",
  },

  hero: {
    badge: "Under active development",
    tagline: "Manifesting Code into Reality",
    title: "Code is not where the work ends.",
    lead: "A repository stores code well, but it does not give that code a life. Sakala is being built for the journey that follows: turning source into an application people can open, share, and learn from.",
    ctaPrimary: "Read the docs",
    ctaSecondary: "View repository",
    honesty:
      "Sakala is not available as a public service yet. What you can do today is read the architecture, follow the progress, and contribute.",
  },

  status: {
    label: "Development status",
    designNote: "Design status",
    engineeringNote: "Engineering status",
    disclaimer:
      "A finished design does not mean the feature runs. The two statuses are kept separate on purpose.",
    items: {
      design: {
        name: "Core product flow design",
        state: "complete",
      },
      foundation: {
        name: "Console, API, agent foundation",
        state: "being built",
      },
      runtime: {
        name: "Deployment runtime",
        state: "under test",
      },
      service: {
        name: "Public service",
        state: "not available",
      },
    },
  },

  problem: {
    eyebrow: "The usual gap",
    title: "It runs on your laptop. Nobody else can open it.",
    lead: "An application starts to feel real once it can run, be opened, and be tested against the real world. The distance to that point is often longer than expected.",
    items: {
      localhost: {
        title: "The project stops at localhost",
        text: "It runs fine on your own machine, but it has no address you can share.",
      },
      handover: {
        title: "Work is handed over as an archive",
        text: "Reviewers see files and screenshots rather than an application that actually runs.",
      },
      setup: {
        title: "Readers have to set it up themselves",
        text: "Every project carries different install steps, and every set of steps has its own way of failing.",
      },
      tooEarly: {
        title: "Servers arrive too early",
        text: "Learning to ship software should not begin with TLS, reverse proxies, and network configuration.",
      },
    },
  },

  crossing: {
    eyebrow: "How it works",
    title: "One crossing, five stages that can be explained.",
    lead: "Behind a single deploy command sit Git, a builder, containers, routing, and health checks. Sakala carries that complexity, but still explains what happened.",
    steps: {
      source: {
        name: "Source",
        text: "A Git repository and an exact commit form the starting point.",
      },
      build: {
        name: "Build",
        text: "The stack is detected and an image is built. Dockerfile first, Railpack as the fallback.",
      },
      deploy: {
        name: "Deploy",
        text: "A container is started with explicit resource limits.",
      },
      run: {
        name: "Run",
        text: "Health checks confirm the application actually answers, not merely that it started.",
      },
      reach: {
        name: "Reach",
        text: "A public route is activated, and the application gets an address people can open.",
      },
    },
    transparency: {
      title: "Automation is fine, as long as it can be explained.",
      text: "When something fails, what you need is not “something went wrong” but which stage failed and what to check.",
      sample: {
        caption: "The shape of explanation we are aiming for",
        stage: "Stage: Health Check",
        body: "The application started, but did not respond on the expected port.",
        checks: ["bind address", "exposed port", "runtime logs"],
      },
    },
    diagram: {
      caption:
        "How Sakala moves a repository to an application with a public address.",
      alt: "A five-stage flow diagram. Source leads to Build, Build to Deploy, Deploy to Run, and Run to Reach, which produces a public URL.",
    },
    systemDiagram: {
      caption: "How responsibility is divided between Sakala components.",
      alt: "A system diagram. The browser reaches the Console, the Console talks to the API as control plane, the API stores commands, the Agent pulls those commands outbound and then drives Docker and Caddy on a runtime node, producing a publicly reachable application container.",
      note: "The API never touches the Docker socket. Every privileged runtime operation belongs to the Agent alone.",
    },
  },

  principles: {
    eyebrow: "Seven principles",
    title: "What we hold on to when deciding.",
    items: {
      wujud: { name: "Manifest", text: "Code becomes something real." },
      purna: { name: "Complete", text: "The journey is supported to its end." },
      sederhana: {
        name: "Simple",
        text: "Complexity is not billed to the user.",
      },
      terang: { name: "Clear", text: "Automation must be explainable." },
      tumbuh: {
        name: "Grow",
        text: "Start small, keep room to become larger.",
      },
      berbagi: {
        name: "Share",
        text: "Work can be seen, studied, and passed on.",
      },
      manusia: {
        name: "Human",
        text: "Technology is a tool that helps people create.",
      },
    },
  },

  afterlife: {
    eyebrow: "Product direction",
    title: "Deployment is the heart, not the whole body.",
    lead: "Once a piece of work is alive, it still needs to be maintained, discovered, and learned from. This section describes the direction, not features that already exist.",
    statusLabel: "Status",
    pillars: {
      operate: {
        name: "Operate",
        question: "Once it is alive, how is the application kept healthy?",
        items: [
          "variables and secrets",
          "domains and TLS",
          "logs and health",
          "basic metrics",
        ],
      },
      explore: {
        name: "Explore",
        question: "What can grow out of work that is already alive?",
        items: [
          "project showcase",
          "templates",
          "creator profiles",
          "collections and curation",
        ],
      },
      learn: {
        name: "Learn",
        question: "How do people learn to ship software for real?",
        items: [
          "classes and workshops",
          "assignments",
          "internship flow",
          "mentor review",
        ],
      },
    },
    loop: {
      title: "Work gives rise to work",
      text: "A living project can become an example, an example can become a template, and a template can become someone else's starting point.",
      caption: "The cycle Sakala aims for once a project is successfully live.",
      alt: "A cycle diagram. Project leads to Deploy, Deploy to Showcase, Showcase to Template, Template to a new developer, and that developer starts a new project, returning to the beginning.",
    },
    boundary: {
      title: "What we deliberately avoid becoming",
      items: [
        "a generic cloud dashboard",
        "a Kubernetes UI with a new name",
        "a developer social network",
        "an LMS",
        "a replacement observability suite",
      ],
    },
  },

  audience: {
    eyebrow: "Who it is for",
    title: "Built first for those most blocked by infrastructure.",
    lead: "Sakala's early priority is people who write good code but are held back by servers.",
    items: {
      student: {
        name: "Students",
        text: "Hand in work as an address that opens, not an archive that must be reassembled.",
      },
      beginner: {
        name: "Beginner developers",
        text: "Move a project out of localhost while understanding why each stage exists.",
      },
      instructor: {
        name: "Instructors and mentors",
        text: "Open participants' work in a browser without preparing an environment for each one.",
      },
      creator: {
        name: "Open-source creators",
        text: "Offer a living demo and a starting point other people can build on.",
      },
      community: {
        name: "Communities",
        text: "Run workshops with consistent onboarding and predictable resources.",
      },
      team: {
        name: "Small teams",
        text: "Share prototypes and internal demos without starting from server configuration.",
      },
    },
  },

  roadmap: {
    eyebrow: "Roadmap",
    title: "Direction, not a promise of dates.",
    lead: "Sakala runs three parallel views that are related but never perfectly in sync.",
    horizonLabel: "Horizon",
    items: {
      a: {
        name: "Manifestation",
        text: "Identity, projects, repository analysis, build, deploy, logs, generated domain, and redeploy.",
        state: "in progress",
      },
      b: {
        name: "Reliable operation",
        text: "Custom domains, deployment recovery, runtime logs, metrics, and webhook auto-deploy.",
        state: "next",
      },
      c: {
        name: "Explore and ecosystem",
        text: "Showcase, creator profiles, templates, collections, and project lineage.",
        state: "in design",
      },
      d: {
        name: "Collaboration and learning",
        text: "Workspaces, members, roles, classrooms, assignments, and internship flow.",
        state: "planned",
      },
      e: {
        name: "Developer services",
        text: "Managed PostgreSQL, Redis, object storage, workers, and richer observability.",
        state: "planned",
      },
      f: {
        name: "Platform",
        text: "CLI, public API, self-host installer, and multi-node runtime.",
        state: "planned",
      },
    },
    validation: {
      title: "When a horizon may begin",
      text: "A finished design is not reason enough. What counts is user demand, product leverage, engineering cost, operational cost, and architectural readiness.",
    },
  },

  openSource: {
    eyebrow: "Open source",
    title: "Built in the open so it can be studied and corrected.",
    lead: "Deployment teaches more when its flow, contracts, and technical trade-offs can be read and improved together.",
    licenseLabel: "License",
    licenseValue: "Apache License 2.0",
    stewardshipLabel: "Stewardship",
    stewardshipValue: "Sakala Maintainers",
    sponsorLabel: "Founding sponsor",
    sponsorValue: "GMEDIA · PT Media Sarana Data",
    sponsorNote:
      "The sponsor supports infrastructure and the early phase. Sponsorship does not confer control over technical decisions, roadmap priorities, licensing, or contributor rights.",
    ecosystemLabel: "Repository ecosystem",
    repositories: {
      console: "User interface",
      api: "Control plane",
      agent: "Runtime executor",
      infra: "Runtime reference",
      landing: "Website and documentation",
    },
    governanceCta: "Read project governance",
  },

  faq: {
    eyebrow: "Questions",
    title: "What people usually ask first.",
    contactPrefix: "Something else on your mind? Start with",
    contactLink: "an issue on GitHub",
    items: {
      ready: {
        q: "Can I use Sakala yet?",
        a: "Not as a public service. The product and runtime foundations are still being built, and the status is shown openly so expectations stay accurate.",
      },
      docker: {
        q: "Do I need to understand Docker and reverse proxies first?",
        a: "Not on day one. Sakala carries the complexity but still shows what happens, so you can learn it gradually when you want to go deeper.",
      },
      enterprise: {
        q: "Is this a replacement for enterprise cloud?",
        a: "No. Sakala is built for learning, portfolios, demos, classes, communities, and small teams who want their work to be openable by others.",
      },
      gmedia: {
        q: "What is GMEDIA's role?",
        a: "GMEDIA is the founding sponsor and infrastructure supporter for the early phase. Sakala remains an open-source project with a public roadmap, documentation, and contributions.",
      },
      contribute: {
        q: "How can I contribute?",
        a: "Start with an issue, a documentation fix, feedback on the product flow, or a pull request. Contribution is not only code; design, testing, and community work shape the foundation too.",
      },
      selfhost: {
        q: "Will self-hosting be possible?",
        a: "That is the planned direction through a separate installer and distribution, but it is not being built yet.",
      },
    },
  },

  cta: {
    eyebrow: "Join early",
    title: "Help shape a deployment path that is clear enough to learn from.",
    lead: "Read the architecture, follow the progress, and tell us what is missing. Early users shape what this becomes.",
    primary: "Read the docs",
    secondary: "View repository",
  },

  footer: {
    tagline: "Manifesting Code into Reality",
    blurb:
      "An open-source deployment project that helps work move from a repository into a living application.",
    navigationLabel: "Navigation",
    openSourceLabel: "Open source",
    governance: "Governance",
    concepts: "Concepts",
    faqLink: "FAQ",
    rss: "Changelog RSS",
    rights: "Sakala Contributors",
    license: "Apache-2.0",
    sponsor: "Founding sponsor: GMEDIA",
  },
};
