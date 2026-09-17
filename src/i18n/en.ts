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
    status: {
      label: "Pre-launch",
      text: "Not yet available as a public service. Built in the open.",
      link: "See the roadmap",
    },

    possibility: {
      eyebrow: "Sakala · Open-source deployment platform",
      title: "Every project begins as a possibility.",
      sub: "Running on a laptop is not the same as being reachable. Sakala takes a project from a Git repository to an application with a public address of its own.",
      ctaPrimary: "See how it works",
      ctaSecondary: "View on GitHub",
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
        "The flow is real and documented: a public GitHub repository is read, built with a Dockerfile or Railpack, then given a public address of its own at *.run.sakala.dev.",
      from: "Possibility / Local",
      through: "Sakala",
      to: "Presence / Public",
      fromToken: "github.com/you/portfolio",
      toToken: "portfolio.run.sakala.dev",
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
      url: "https://portfolio.run.sakala.dev",
      open: "Open site",
      appTitle: "Hello, world.",
      refrain: "Here it is.",
      deployCaption:
        "Five named stages, and their consequence: the same work, now with an address.",
      note: "Stages, times, and the address show the Console design being built, not a running service.",
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
      note: "This form of explanation shows the Console design being built.",
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
        { label: "Architecture", value: "Documented" },
        { label: "Decisions", value: "Recorded" },
        { label: "Contributions", value: "Open" },
        { label: "Pilot runtime", value: "Supported by GMEDIA" },
        { label: "Self-host", value: "On the roadmap" },
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
      "An open-source deployment platform that carries work from a repository into a living application.",
    exploreLabel: "Explore",
    projectLabel: "Project",
    rss: "Changelog RSS",
    rights: "Sakala Contributors",
    license: "Apache-2.0",
    sponsor: "Founding sponsor: GMEDIA",
  },
};
