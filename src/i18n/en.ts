import type { Dictionary } from "./id";

export const en: Dictionary = {
  meta: {
    siteTitle: "Sakala — Open-Source Deployment Platform",
    siteDescription:
      "Sakala is an open-source deployment platform that carries source from a repository into an application that can be opened and shared.",
    homeTitle: "Sakala — Open-Source Deployment Platform",
    homeDescription:
      "Sakala is an open-source deployment platform: carrying a project from a Git repository into an application that can be opened and shared. Built in the open.",
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
    projectDocs: "Project documents",
    changelog: "Changelog",
    github: "GitHub",
    console: "Sign in",
    menu: "Menu",
    close: "Close",
    languageLabel: "Choose language",
    docsNoteForEnglish: null,
  },

  source: {
    label: "Canonical source",
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
    status: {
      label: "Open pilot",
      text: "Anyone can sign up, within usage limits.",
      link: "See the pilot limits",
    },

    possibility: {
      eyebrow: "Sakala · Open-source deployment platform",
      title: "Every project begins as a possibility.",
      sub: "Running on a laptop is not the same as being reachable. Sakala takes a project from a Git repository to an application with a public address of its own.",
      ctaPrimary: "Sign up and deploy",
      ctaSecondary: "See how it works",
      repoLabel: "Repository",
      branch: "main",
      commit: "a3f9c21",
      files: ["portfolio/", "├── src/", "├── public/", "├── package.json"],
      runCommand: "npm run dev",
      address: "localhost:5173",
      appTitle: "Hello, world.",
      appSub: "Running fine on this machine.",
      reach: "reachable by: you",
      refrain: "I built this.",
      caption:
        "The repository keeps the source; localhost proves it runs. Neither gives the work an address anyone else can open.",
    },

    threshold: {
      eyebrow: "Threshold",
      title: "Sakala stands between possibility and presence.",
      plain:
        "The flow is real and documented: a public GitHub repository is read, built with a Dockerfile or Railpack, then given a public address of its own at *.sakala.app.",
      from: "Possibility / Local",
      through: "Sakala",
      to: "Presence / Public",
      fromToken: "github.com/you/portfolio",
      toToken: "portfolio.sakala.app",
      caption:
        "The upper form of the mark is source; the lower form is presence. Sakala is the space between.",
      forWhomTitle: "Who it is for",
      personas: [
        {
          name: "Students & interns",
          text: "Assignments and portfolios open for lecturers and recruiters, without building infrastructure from scratch.",
        },
        {
          name: "Lecturers & mentors",
          text: "Review work without setting up an environment for every project.",
        },
        {
          name: "Beginners & communities",
          text: "Learn deployment from a flow where every stage has a name and an explanation.",
        },
      ],
    },

    journey: {
      eyebrow: "Journey",
      title: "Being live is more than a green build.",
      lead: "The journey is not over until the work can actually be reached. Every stage has a name, so you always know where it stands.",
      analysisTitle: "Sakala reads your project",
      analysisSub:
        "Configuration detected from the repository, editable before the build runs.",
      analysisRows: [
        { k: "Repository", v: "you/portfolio", ok: false },
        { k: "Branch", v: "main", ok: false },
        { k: "Builder", v: "Dockerfile detected", ok: true },
        { k: "Port", v: "3000", ok: false },
      ],
      builderLabel: "Builder order",
      builderSteps: ["Your Dockerfile", "Railpack", "Manual setup"],
      analysisCaption:
        "The stack is recognized from your Dockerfile or through Railpack. The result is there to inspect, not hidden.",
      deployLabel: "Deployment #1",
      meta: [
        { k: "Commit", v: "a3f9c21" },
        { k: "Branch", v: "main" },
        { k: "Trigger", v: "Manual deploy" },
        { k: "Started", v: "08:41:02" },
      ],
      stages: [
        { name: "Cloning repository", time: "08:41:02" },
        { name: "Analyzing project", time: "08:41:05" },
        { name: "Building image", time: "08:41:32" },
        { name: "Starting container", time: "08:41:42" },
        { name: "Checking health", time: "08:41:49" },
      ],
      stateDone: "done",
      stateRunning: "running",
      statePending: "pending",
      arrivalTitle: "Your project is live",
      arrivalSub: "Finished in 47 seconds. Publicly reachable now.",
      url: "https://portfolio.sakala.app",
      open: "Open site",
      appTitle: "Hello, world.",
      refrain: "Here it is.",
      deployCaption:
        "Five named stages, and their consequence: the same work, now with an address.",
      note: "An illustration with sample data, not a Console screenshot.",
    },

    clarity: {
      eyebrow: "Clarity",
      title: "Simple does not have to mean hidden.",
      lead: "Magic may happen. Mystery does not have to. When something fails, you deserve to know at which stage, and why.",
      bannerTitle: "Deployment failed",
      bannerSub:
        "Stopped at Checking health. The explanation and the log are below.",
      stages: [
        { name: "Cloning repository", time: "08:41:02", state: "done" },
        { name: "Analyzing project", time: "08:41:05", state: "done" },
        { name: "Building image", time: "08:41:32", state: "done" },
        { name: "Starting container", time: "08:41:42", state: "done" },
        { name: "Checking health", time: "08:42:12", state: "failed" },
      ],
      stateDone: "done",
      stateFailed: "failed",
      explainLabel: "What happened",
      explainTitle:
        "The app is running, but it listens on port 5173 instead of the expected 3000.",
      checkLabel: "Check",
      checks: [
        "the PORT variable and bind address",
        "the port exposed in the Dockerfile",
        "the runtime log below",
      ],
      logLabel: "Log",
      logs: [
        {
          t: "08:41:42",
          m: "Container started · portfolio@a3f9c21",
          error: false,
        },
        {
          t: "08:41:42",
          m: "Health check → 127.0.0.1:31042 (port 3000), timeout 30s",
          error: false,
        },
        {
          t: "08:41:45",
          m: "app: listening on http://localhost:5173",
          error: false,
        },
        {
          t: "08:42:12",
          m: "Health check failed: no response on port 3000 after 30s",
          error: true,
        },
      ],
      caption:
        "The failure points to one stage, is explained in plain words, and the log sits right beside it.",
      note: "An illustration with sample data. In the Console, a failed deployment shows its stage, failure code, explanation, and logs.",
    },

    life: {
      eyebrow: "Continuation",
      title: "Deployment is not the end of the story.",
      lead: "A living work can be opened, shared, learned from, and improved. Some of it becomes a starting point for someone else.",
      root: "A living work",
      branches: ["Opened", "Shared", "Learned from", "Improved"],
      onward: "Becomes a template",
      newWork: "New work",
      caption: "A living work can give rise to the next one.",
      note: "Showcase, templates, and learning are product direction, not yet available.",
      more: "See the product direction",
    },

    open: {
      eyebrow: "Open",
      title: "What helps people learn should itself be open to learning from.",
      lead: "Sakala's flows, contracts, and technical trade-offs are open so they can be read, corrected, and built on together.",
      facts: [
        { label: "Source", value: "Public" },
        { label: "License", value: "Apache-2.0" },
        {
          label: "Architecture",
          value: "Documented",
          href: "/docs/proyek/architecture",
        },
        { label: "Decisions", value: "Recorded", href: "/docs/proyek/adr" },
        { label: "Contributions", value: "Open" },
        { label: "Pilot runtime", value: "Supported by GMEDIA" },
        { label: "Self-host", value: "Under test" },
      ],
      factsCaption: "Evidence that Sakala is open, not just a label.",
      human:
        "Technology is a tool. What matters is what people can finally bring into being with it.",
      stewardship:
        "Sakala is an open-source project initiated by the Sakala Maintainers and supported by GMEDIA as founding sponsor and infrastructure supporter.",
      cta: "Read about governance",
    },

    finale: {
      title: "What will you bring to life?",
      lead: "Every project begins as a possibility.",
      cta: "Sign up and deploy",
      ctaNote: "Usage limits apply during the pilot.",
      followTitle: "Follow the progress",
      followLead:
        "Sakala is built in the open. Every step can be followed from here.",
      follow: [
        {
          key: "github",
          label: "Follow on GitHub",
          note: "Star or watch for release news",
        },
        {
          key: "rss",
          label: "Subscribe to the changelog RSS",
          note: "Every publicly visible change",
        },
        {
          key: "roadmap",
          label: "See the roadmap",
          note: "Direction, not dates",
        },
      ],
      latestTitle: "Latest progress",
      latestAll: "All updates",
      docs: "Read the documentation",
    },
  },

  philosophy: {
    metaTitle: "Sakala Philosophy — Manifesting Code into Reality",
    metaDescription:
      "Sakala's seven principles, what the tagline Manifesting Code into Reality means, and why deployment is treated as a crossing from possibility into presence.",
    crumb: "Philosophy",
    eyebrow: "Philosophy",
    title: "Code is not where the work ends.",
    sourceTitle: "Sakala Philosophy (PHILOSOPHY)",
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
      "Sakala is in its pilot. Anyone can sign up and use it at no cost, within limits on projects, containers, and builds per hour. There is no uptime guarantee yet, so it is not a fit for important applications.",
    disclaimerLink: "See the pilot limits",
    pillarsTitle: "The product journey",
    pillarsStatusDate: "Status as of 23 November 2026.",
    pillars: [
      {
        name: "Create",
        question: "Where does this work begin?",
        items: [
          { label: "connect a public GitHub repository", status: "available" },
          {
            label: "private repositories through the GitHub App",
            status: "available",
          },
          { label: "choose a branch", status: "available" },
          { label: "templates as a starting point", status: "direction" },
        ],
      },
      {
        name: "Manifest",
        question: "How does this source become something alive?",
        items: [
          {
            label: "repository analysis and stack detection",
            status: "available",
          },
          { label: "build via Dockerfile or Railpack", status: "available" },
          {
            label: "deployment, health check, and public route",
            status: "available",
          },
          {
            label: "redeploy and automatic deploy on push",
            status: "available",
          },
          {
            label: "a release command before the new version serves",
            status: "available",
          },
          {
            label:
              "redeploy without a build when only runtime variables change",
            status: "available",
          },
          {
            label: "monorepos: a push deploys only the projects it changes",
            status: "available",
          },
        ],
      },
      {
        name: "Operate",
        question: "Once alive, how is the application kept healthy?",
        items: [
          {
            label: "variables and secrets, with suggestions from .env.example",
            status: "available",
          },
          { label: "generated *.sakala.app domain", status: "available" },
          { label: "logs and health", status: "available" },
          {
            label: "sleep when idle, wake when visited",
            status: "available",
          },
          { label: "team workspaces and roles", status: "available" },
          {
            label:
              "replicas and load balancing, through an admin limit profile",
            status: "available",
          },
          {
            label: "basic metrics: CPU, memory, replicas, and restarts",
            status: "available",
          },
          {
            label:
              "rollback to an earlier version, and Restart without a build",
            status: "available",
          },
          {
            label: "managed PostgreSQL databases, limited pilot",
            status: "testing",
          },
          {
            label: "managed S3 buckets, a limited pilot being prepared",
            status: "building",
          },
          { label: "custom domains", status: "direction" },
        ],
      },
      {
        name: "Explore",
        question: "What can grow out of work that is already alive?",
        items: [
          { label: "project showcase", status: "direction" },
          { label: "templates", status: "direction" },
          { label: "creator profiles", status: "direction" },
          { label: "collections and project lineage", status: "direction" },
        ],
      },
      {
        name: "Learn",
        question: "How do people learn to ship software for real?",
        items: [
          { label: "classes and workshops", status: "next" },
          { label: "assignments", status: "next" },
          { label: "internship flow", status: "direction" },
          { label: "mentor review", status: "direction" },
        ],
      },
    ],
    cardsTitle: "What it looks like in the Console",
    cardsLead:
      "The Console design puts status first: every project shows at a glance whether it is live, being built, or failed.",
    cards: [
      {
        name: "portfolio",
        repo: "you/portfolio",
        state: "live",
        stateLabel: "Live",
        body: "Hello, world.",
        time: "2 hours ago",
      },
      {
        name: "final-project",
        repo: "you/final-project",
        state: "deploying",
        stateLabel: "Deploying",
        body: "Building image…",
        time: "started 1 minute ago",
      },
      {
        name: "notes-api",
        repo: "you/notes-api",
        state: "failed",
        stateLabel: "Failed",
        body: "Health check failed",
        time: "yesterday",
      },
    ],
    cardsAction: "View details",
    cardsCaption:
      "Project cards on the Dashboard: name, repository, state, preview, and one action.",
    cardsNote:
      "An illustration based on the Console design, with sample data. Not a screenshot.",
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
    sourceTitle: "Sakala Roadmap (ROADMAP)",
    lead: "Sakala runs three parallel views that are related but never perfectly in sync: product, design, and engineering.",
    shippedTitle: "Available now",
    shippedLead:
      "Status as of 23 November 2026. All of this can be used on the hosted pilot, within the pilot limits.",
    shippedLink: "See the pilot limits",
    shipped: [
      "Accounts with email, GitHub, or Google, with consent to the terms of service",
      "Projects from a public GitHub repository, or a private one through the GitHub App",
      "Repository analysis, build via Dockerfile or Railpack, deploy, health check, and redeploy",
      "Automatic deploy on push, and a release command before the new version serves",
      "A push to a monorepo deploys only the projects whose folder changed",
      "Redeploy without a build when only runtime variables or the database change, and a Build ulang dari awal (rebuild from scratch) option",
      "Variables and secrets, with suggestions from .env.example when creating a project",
      "Build and runtime logs, and failure codes that point at their stage",
      "Basic per-project metrics: CPU, memory, replicas, and restarts, up to 30 days back",
      "Rollback to an earlier version from the History tab, and Restart without a build",
      "A generated domain on *.sakala.app",
      "Personal and team workspaces, invitations, and Owner, Member, and Viewer roles",
      "Quotas per workspace, a build limit per hour, and sleep after 30 minutes without visitors",
      "Replicas and load balancing through Sakala Edge, for workspaces with an admin limit profile",
      "User applications run in a gVisor sandbox, apart from the control plane",
      "An admin area, project suspension, and legal documents",
    ],
    horizonsTitle: "Not built yet",
    horizonsLead:
      "What comes next, in order. The status shows maturity, not a date.",
    horizons: [
      {
        label: "Gate",
        name: "Public pilot",
        status: "testing",
        text: "Registration has been open to anyone since 19 November 2026. Outgoing traffic from user containers has been limited since the same day. Still in progress: evidence of usage and costs from the pilot.",
      },
      {
        label: "Horizon B",
        name: "Minimal Learn",
        status: "next",
        text: "Classes, participants via CSV, assignments with deadlines, an overview for instructors, and what happens to projects after a class ends.",
      },
      {
        label: "Horizon C",
        name: "Single-node self-host",
        status: "testing",
        text: "The installer in the gmedia/sakala repository exists and is tested on clean machines, but it has not been released or tried on a real server.",
      },
      {
        label: "Horizon D",
        name: "Reliable operation",
        status: "direction",
        text: "Custom domains, and usage visibility beyond the basic metrics. Rollback to an earlier version and Restart have been available since 23 November 2026.",
      },
      {
        label: "Horizon E",
        name: "Explore and ecosystem",
        status: "direction",
        text: "Starting from curated collections, then showcases, templates, creator profiles, and project lineage.",
      },
      {
        label: "Horizon G–H",
        name: "Services and platform",
        status: "direction",
        text: "Managed PostgreSQL has been in a limited pilot since 23 November 2026, only for workspaces given a quota. Managed S3 buckets (ADR-021) are being built as a limited pilot, and open only after a new version of the privacy notice takes effect. After that, workers and cron, CLI, public API, and multi-node runtime.",
      },
    ],
    designTitle: "Design and engineering status stay separate",
    designLead:
      "A design being ready does not mean engineering has committed to building it. The two are deliberately not conflated.",
    tracks: [
      { name: "Core product flow design", status: "available" },
      { name: "Console, API, and agent", status: "available" },
      { name: "Deployment runtime", status: "available" },
      { name: "Hosted service, pilot stage", status: "available" },
      { name: "Single-node self-host", status: "testing" },
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
      {
        label: "Stewardship",
        value: "Sakala Maintainers",
        href: "/docs/proyek/governance",
      },
      { label: "Founding sponsor", value: "GMEDIA · PT Media Sarana Data" },
      {
        label: "Project documents",
        value: "Published on this site",
        href: "/docs/proyek",
      },
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
      "Sakala's five component repositories, grouped by the privilege each one holds. A sixth repository, sakala, holds the self-host installer and Discussions.",
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
    contributeTitle: "How to contribute",
    contributeLead:
      "Contribution is not only code. Start from the map of repositories, then pick the path that suits you.",
    contributePaths: [
      {
        key: "start",
        label: "Start contributing",
        note: "Which repository does what, how to run it, and how to pick an issue.",
      },
      {
        key: "goodFirstIssues",
        label: "Pick a good first issue",
        note: "Small issues across every Sakala repository, each naming the files and how to test them.",
      },
      {
        key: "discussions",
        label: "Ask or propose in Discussions",
        note: "For questions and ideas that do not belong to one repository yet.",
      },
      {
        key: "docs",
        label: "Read and correct the documentation",
        note: "The technical documentation is open to be read, tested, and fixed.",
      },
    ],
    topologyNote:
      "The API never touches the Docker socket. Only the Agent performs privileged runtime operations.",
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
    title: "This address does not lead to any page.",
    lead: "The link may have changed, the page may have moved, or the address may have a typo. Here is where you can go instead.",
    destinations: {
      home: { label: "Home", note: "Back to the start" },
      docs: { label: "Documentation", note: "Concepts and deployment flow" },
      changelog: { label: "Changelog", note: "Latest progress" },
    },
  },

  footer: {
    tagline: "Manifesting Code into Reality",
    blurb:
      "An open-source deployment platform that carries work from a repository into a living application.",
    exploreLabel: "Explore",
    projectLabel: "Project",
    rss: "Changelog RSS",
    rights: "Sakala Contributors",
    license: "Apache-2.0",
    sponsor: "Founding sponsor: GMEDIA",
    legalLabel: "Legal",
  },
  legal: {
    eyebrow: "Legal document",
    effectiveFrom: "In effect from",
    version: "Version",
    governingNote:
      "Written in Indonesian and deliberately not translated, so there is a single source. The Indonesian text below is the one that governs.",
    documents: {
      privasi: {
        title: "Privacy Notice",
        heading: "Sakala Privacy Notice",
        description:
          "The personal data the Sakala service processes, why, how long it is kept, who else processes it, and your rights. Published in Indonesian.",
      },
      syarat: {
        title: "Terms of Service",
        heading: "Sakala Terms of Service",
        description:
          "The terms for using the Sakala service during its pilot: what you get, its limits, your responsibilities, and suspension. Published in Indonesian.",
      },
      "penggunaan-wajar": {
        title: "Acceptable Use Policy",
        heading: "Sakala Acceptable Use Policy",
        description:
          "What is not allowed on Sakala, how reports are handled, how to report, and how to appeal. Published in Indonesian.",
      },
    },
  },
};
