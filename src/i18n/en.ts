import type { Dictionary } from "./id";

export const en: Dictionary = {
  meta: {
    siteTitle: "Sakala — Bringing Code to Life as Real Applications",
    siteDescription:
      "Sakala is an open-source deployment project that helps source in a repository become an application that runs, can be opened, and can be shared. Still under active development.",
    homeTitle: "Sakala — Manifesting Code into Reality",
    homeDescription:
      "Sakala is an open-source deployment project that helps carry source from a repository into an application that runs, can be opened, and can be shared. Being built in the open.",
    ogAlt: "Sakala logo with the tagline Manifesting Code into Reality",
    skipToContent: "Skip to main content",
  },

  nav: {
    label: "Main navigation",
    philosophy: "Philosophy",
    product: "Product",
    docs: "Documentation",
    roadmap: "Roadmap",
    openSource: "Open Source",
    changelog: "Changelog",
    github: "GitHub",
    console: "Sign in",
    menu: "Menu",
    close: "Close",
    languageLabel: "Choose language",
    docsNoteForEnglish: null,
  },

  status: {
    available: "available",
    building: "being built",
    testing: "under test",
    next: "next",
    direction: "direction",
    unavailable: "not available",
  },

  home: {
    notice: {
      label: "Status",
      text: "Sakala is not available as a public service yet. The flow on this page is the experience being built.",
      link: "See development status",
    },

    possibility: {
      title: "Every work begins as a possibility.",
      lead: "A project can be finished, stored neatly, and running on your own screen. And still, nobody else can open it.",
      artifactLabel: "Repository",
      branch: "main",
      commit: "commit a3f9c21",
      files: [
        "portfolio/",
        "├── src/",
        "├── public/",
        "├── package.json",
        "└── README.md",
      ],
      caption:
        "A repository holds a possibility: an idea that already has form, but not yet an address.",
    },

    distance: {
      eyebrow: "The distance",
      title: "Not everything finished being made is finished becoming real.",
      lead: "Running on a laptop proves something works. Not that the world can open it.",
      refrain: "I built this.",
      artifactLabel: "Running locally",
      address: "localhost:5173",
      appTitle: "Hello, world.",
      appSub: "It works on this machine.",
      reach: "reachable by: you",
      observations: [
        "A repository holds source. The world needs something it can open.",
        "This project is not broken. It simply has not arrived.",
      ],
      caption:
        "The application runs at an address that only points back to the machine running it.",
    },

    threshold: {
      eyebrow: "The threshold",
      title: "Between possibility and presence, there is a journey.",
      plain:
        "Sakala is an open-source deployment project that helps carry source from a repository into an application that runs, can be opened, and can be shared.",
      from: "Possibility / Local",
      through: "Sakala",
      to: "Presence / Public",
      fromToken: "github.com/you/karya",
      toToken: "karya.run.sakala.dev",
      caption: "Sakala sits exactly at that crossing.",
    },

    manifestation: {
      eyebrow: "The journey",
      title: "Presence is more than a successful build.",
      lead: "The journey is not finished until the work can actually be reached. Every stage has a name, so you know where it stands.",
      steps: [
        {
          name: "Repository",
          text: "The source and the exact commit form the starting point.",
        },
        {
          name: "Analyze",
          text: "The stack is detected, and what was read is shown for you to check.",
        },
        {
          name: "Build",
          text: "Source becomes an image that can run.",
        },
        {
          name: "Start",
          text: "The application runs with explicit resource limits.",
        },
        {
          name: "Health",
          text: "Sakala confirms the application genuinely answers.",
        },
        {
          name: "Reach",
          text: "A public route is activated, and the work has an address.",
        },
      ],
      arrivalLabel: "Reachable",
      domain: "portfolio.run.sakala.dev",
      healthy: "200 · healthy",
      arrivalTitle: "Hello, world.",
      arrivalSub: "No longer only source. Now it is present.",
      refrain: "Here it is.",
      deployCaption:
        "Six stages, and their consequence: a work that can be reached.",
      note: "The address, stages, and states in this section describe the flow being built.",
    },

    clarity: {
      eyebrow: "Clarity",
      title: "Simple should not have to mean hidden.",
      lead: "Magic may happen. Mystery does not have to. When something fails, you deserve to know why.",
      states: [
        { name: "Repository", ok: true },
        { name: "Build", ok: true },
        { name: "Start", ok: true },
        { name: "Health", ok: false },
      ],
      stateOk: "ok",
      stateFailed: "failed",
      failureTitle: "Health Check failed",
      failureBody:
        "The application started, but did not respond on the expected port.",
      checkLabel: "Check",
      checks: ["bind address", "exposed port", "runtime logs"],
      caption:
        "Failure is pinned to a named stage rather than reported as a general error.",
      note: "This shape of explanation describes the direction being pursued.",
    },

    life: {
      eyebrow: "Continuation",
      title: "Deployment is not the end of the journey.",
      lead: "A living work can be opened, shared, learned from, and repaired. Some of it becomes a starting point for someone else.",
      root: "A living work",
      branches: [
        { name: "Opened", status: "available" },
        { name: "Shared", status: "available" },
        { name: "Learned from", status: "direction" },
        { name: "Repaired", status: "available" },
      ],
      onward: "Becomes a template",
      newWork: "New work",
      caption:
        "A living work can give rise to the next one. Items marked as direction are not available yet.",
      more: "See the product direction",
    },

    open: {
      eyebrow: "In the open",
      title: "What helps people learn should itself be open to study.",
      lead: "Sakala's flow, contracts, and technical trade-offs are public so they can be read, corrected, and built on together.",
      facts: [
        { label: "Source", value: "Public" },
        { label: "License", value: "Apache-2.0" },
        { label: "Architecture", value: "Documented" },
        { label: "Decisions", value: "Recorded" },
        { label: "Contribution", value: "Open" },
      ],
      factsCaption: "Evidence of openness, not merely a badge.",
      human:
        "Technology is a tool. What matters is what people can finally bring into being with it.",
      stewardship:
        "Sakala is an open-source project initiated by the Sakala Maintainers and supported by GMEDIA as founding sponsor and infrastructure supporter.",
      cta: "Read the governance",
    },

    finale: {
      title: "What will you bring into being?",
      lead: "Every work begins as a possibility.",
      primary: "Explore Sakala",
      secondary: "Read the docs",
      tertiary: "View on GitHub",
    },
  },

  philosophy: {
    metaTitle: "Sakala Philosophy — Manifesting Code into Reality",
    metaDescription:
      "Sakala's seven principles, what the tagline Manifesting Code into Reality means, and why deployment is treated as a crossing from possibility into presence.",
    crumb: "Philosophy",
    eyebrow: "Philosophy",
    title: "Code is not where the work ends.",
    lead: "Code is possibility: an idea that has been given structure, and something waiting to be made real. Sakala exists at the boundary between possibility and presence.",
    arcTitle: "Three stages underneath everything",
    arc: [
      {
        name: "Possibility",
        text: "Something could exist. Source code is potential that already has structure.",
      },
      {
        name: "Presence",
        text: "Something now exists in a form other people can reach.",
      },
      {
        name: "Continuation",
        text: "Its existence makes the next work possible.",
      },
    ],
    principlesTitle: "Seven principles",
    principlesLead:
      "These are not slogans. Each principle carries a product consequence.",
    principles: [
      {
        name: "Wujud · Manifest",
        text: "Code finds its meaning when it can become something real.",
        consequence: "The journey does not stop at a successful build.",
      },
      {
        name: "Purna · Complete",
        text: "The journey is supported to its end, not abandoned midway through complexity.",
        consequence:
          "Build, container, route, health check, then a public address.",
      },
      {
        name: "Sederhana · Simple",
        text: "Platform complexity should not be a tax every user pays.",
        consequence: "Simple by default, transparent when needed.",
      },
      {
        name: "Terang · Clear",
        text: "Automation may happen, but it must be explainable.",
        consequence:
          "When a deployment fails, you deserve to know which stage stopped.",
      },
      {
        name: "Tumbuh · Grow",
        text: "Start small without closing off the possibility of becoming larger.",
        consequence:
          "Do not build tomorrow today; do not make tomorrow impossible either.",
      },
      {
        name: "Berbagi · Share",
        text: "Good work should be able to outlive the assignment that produced it.",
        consequence:
          "A living work can become an example, a template, and a new beginning.",
      },
      {
        name: "Manusia · Human",
        text: "Infrastructure is a tool. People and what they create are the point.",
        consequence:
          "Sakala succeeds when someone manages to make their work live.",
      },
    ],
    taglineTitle: "Manifesting Code into Reality",
    taglineBody:
      "The tagline is not a turn of phrase. It names the actual work: helping something abstract become present, openable, and testable against the real world.",
    filterTitle: "The product filter",
    filterLead:
      "Before a major feature enters the roadmap, these questions are asked.",
    filter: [
      "Does this help a work become real?",
      "Does it make the user's journey more complete?",
      "Does it reduce complexity without becoming a black box?",
      "Does it help users understand and grow?",
      "Does it let a work live longer?",
      "Does it leave room to grow without forcing complexity now?",
      "Is the benefit real for people, not merely technically enjoyable?",
    ],
  },

  product: {
    metaTitle: "Sakala Product — Capabilities and Direction",
    metaDescription:
      "What Sakala does today, what is being built, and where it is heading. Every capability carries an honest status.",
    crumb: "Product",
    eyebrow: "Product",
    title: "What Sakala does, and how far along it is.",
    lead: "Every capability on this page carries a status. A finished design does not mean the feature runs.",
    disclaimer:
      "Sakala is not available as a public service yet. The product and runtime foundations are still being assembled in the open.",
    pillarsTitle: "The product journey",
    pillars: [
      {
        name: "Create",
        question: "Where does this work begin?",
        status: "building",
        items: [
          "connect a Git repository",
          "choose a branch",
          "templates as a starting point",
        ],
      },
      {
        name: "Manifest",
        question: "How does this source become something alive?",
        status: "building",
        items: [
          "repository analysis and stack detection",
          "build via Dockerfile or Railpack",
          "deployment, health check, and public route",
          "redeploy",
        ],
      },
      {
        name: "Operate",
        question: "Once alive, how is the application kept healthy?",
        status: "next",
        items: [
          "variables and secrets",
          "generated and custom domains",
          "logs and health",
          "basic metrics",
        ],
      },
      {
        name: "Explore",
        question: "What can grow out of work that is already alive?",
        status: "direction",
        items: [
          "project showcase",
          "templates",
          "creator profiles",
          "collections and project lineage",
        ],
      },
      {
        name: "Learn",
        question: "How do people learn to ship software for real?",
        status: "direction",
        items: [
          "classes and workshops",
          "assignments",
          "internship flow",
          "mentor review",
        ],
      },
    ],
    boundaryTitle: "What we deliberately avoid becoming",
    boundaryLead:
      "Keeping an identity matters more than chasing feature parity.",
    boundary: [
      "a generic cloud dashboard",
      "a Kubernetes UI with a new name",
      "a developer social network",
      "an LMS",
      "a domain registrar",
      "a replacement observability suite",
      "an AI-branded cloud with no core value",
    ],
    docsCta: "Read the docs",
    roadmapCta: "See the roadmap",
  },

  roadmapPage: {
    metaTitle: "Sakala Roadmap — Direction, Not a Promise of Dates",
    metaDescription:
      "Sakala's product horizons, design and engineering status kept separate, and what must hold before a horizon may begin.",
    crumb: "Roadmap",
    eyebrow: "Roadmap",
    title: "Direction, not a promise of dates.",
    lead: "Sakala runs three parallel views that are related but never perfectly in sync: product, design, and engineering.",
    horizonLabel: "Horizon",
    horizons: [
      {
        name: "Manifestation",
        status: "building",
        text: "Identity, projects, repository analysis, build, deploy, logs, generated domain, health, and redeploy.",
      },
      {
        name: "Reliable operation",
        status: "next",
        text: "Custom domains, deployment recovery, runtime logs, metrics, and webhook auto-deploy.",
      },
      {
        name: "Explore and ecosystem",
        status: "direction",
        text: "Showcase, creator profiles, templates, collections, and project lineage.",
      },
      {
        name: "Collaboration and learning",
        status: "direction",
        text: "Workspaces, members, roles, classrooms, assignments, and internship flow.",
      },
      {
        name: "Developer services",
        status: "direction",
        text: "Managed PostgreSQL, Redis, object storage, workers, and richer observability.",
      },
      {
        name: "Platform",
        status: "direction",
        text: "CLI, public API, self-host installer, and multi-node runtime.",
      },
    ],
    designTitle: "Design and engineering status stay separate",
    designLead:
      "A design being ready does not mean engineering has committed to building it. The two are deliberately not conflated.",
    tracks: [
      { name: "Core product flow design", status: "available" },
      { name: "Console, API, agent foundation", status: "building" },
      { name: "Deployment runtime", status: "testing" },
      { name: "Public service", status: "unavailable" },
    ],
    gateTitle: "When a horizon may begin",
    gateLead:
      "A finished design is not reason enough. What counts is user demand, product leverage, engineering cost, operational cost, and architectural readiness.",
  },

  openSourcePage: {
    metaTitle: "Sakala Open Source — Governance, Sponsor, and Ecosystem",
    metaDescription:
      "How Sakala is stewarded: maintainer stewardship, the limits of GMEDIA's role as founding sponsor, the Apache-2.0 license, and the repository ecosystem.",
    crumb: "Open Source",
    eyebrow: "Open Source",
    title: "Open so it can be studied, audited, and corrected.",
    lead: "Deployment teaches more when its flow, contracts, and technical trade-offs can be read and improved together.",
    factsTitle: "Project facts",
    facts: [
      { label: "License", value: "Apache License 2.0" },
      { label: "Stewardship", value: "Sakala Maintainers" },
      { label: "Founding sponsor", value: "GMEDIA · PT Media Sarana Data" },
    ],
    sponsorTitle: "The limits of the sponsor's role",
    sponsorLead:
      "GMEDIA supports infrastructure, domains, room to experiment, and technical help so Sakala can reach MVP and an early pilot.",
    sponsorBody:
      "Sponsorship does not confer control over technical decisions, roadmap priorities, licensing, or contributor rights. Sakala continues with a public roadmap, documentation, and contributions.",
    stewardshipCards: [
      {
        role: "Stewardship",
        name: "Sakala Maintainers",
        text: "Hold technical, architectural, and licensing decisions.",
      },
      {
        role: "Supporting",
        name: "GMEDIA",
        text: "Founding sponsor and infrastructure supporter. No control over roadmap or licensing.",
      },
      {
        role: "Contributing",
        name: "Public contributors",
        text: "Issues, pull requests, documentation, design, and testing.",
      },
    ],
    stewardshipCaption:
      "How stewardship, sponsorship, and contribution relate.",
    decisionsTitle: "Decision domains",
    decisions: [
      {
        area: "Product",
        owner: "Maintainers, together with product and design discussion.",
      },
      {
        area: "Architecture",
        owner:
          "Maintainer-led. Major boundary changes are recorded as architecture decisions.",
      },
      {
        area: "Implementation",
        owner: "The owning squad, within the established architecture.",
      },
      {
        area: "Security",
        owner: "A maintainer or security review can hold a release.",
      },
      {
        area: "Community",
        owner: "Documented rules, auditable, with a path for review.",
      },
    ],
    ecosystemTitle: "Repository ecosystem",
    ecosystemLead:
      "Responsibility is separated so the privilege boundary stays clear. Only the Agent performs runtime operations.",
    ecosystemCaption:
      "Sakala's five repositories, grouped by the privilege each one holds.",
    publicLabel: "Public",
    controlLabel: "Control plane",
    dataLabel: "Data plane",
    repoRoles: {
      landing: "Website, documentation, and SEO entry point.",
      console: "The user interface for managing projects.",
      api: "Control plane for auth, projects, deployments, and commands.",
      agent: "Runtime executor that performs work on a node.",
      infra: "Runtime, networking, and routing reference.",
    },
    contributorsTitle: "Early contributors",
    contributorsLead:
      "Names are listed once the contribution is real and the person agrees to being named. Contribution is not only code.",
    contributorAreas: [
      "Product & Design",
      "Frontend",
      "Backend & Platform",
      "Documentation",
      "Testing",
      "Community",
    ],
    contributeCta: "See where to contribute",
  },

  changelogPage: {
    metaTitle: "Changelog — Sakala",
    metaDescription:
      "Follow public updates to Sakala, covering the landing page, documentation, console, API, agent, and open-source deployment foundations.",
    crumb: "Changelog",
    eyebrow: "Changelog",
    title: "Progress you can check.",
    lead: "Notable updates to the website, documentation, and product foundations. What is recorded here has actually shipped publicly; plans live elsewhere.",
    rss: "Subscribe via RSS",
    empty: "No updates have been recorded in this language yet.",
  },

  notFound: {
    metaTitle: "Page not found — Sakala",
    metaDescription: "The page you were looking for could not be found.",
    eyebrow: "Error 404",
    title: "This address does not lead anywhere yet.",
    lead: "The link may have changed, or the page may simply not exist yet while Sakala is still being built. Here is where you can go instead.",
    destinations: {
      home: { label: "Home", note: "Back to the start" },
      docs: { label: "Documentation", note: "Concepts and deployment flow" },
      changelog: { label: "Changelog", note: "Latest progress" },
    },
  },

  footer: {
    tagline: "Manifesting Code into Reality",
    blurb:
      "An open-source deployment project that helps work move from a repository into a living application.",
    exploreLabel: "Explore",
    projectLabel: "Project",
    rss: "Changelog RSS",
    rights: "Sakala Contributors",
    license: "Apache-2.0",
    sponsor: "Founding sponsor: GMEDIA",
  },
};
