export const links = {
  console: "https://app.sakala.dev",
  /** Halaman daftar Console. Pilot hosted terbuka untuk siapa saja sejak
   *  19 November 2026, jadi CTA utama beranda mengarah ke sini. */
  consoleRegister: "https://app.sakala.dev/register",
  api: "https://api.sakala.dev",
  githubOrganization: "https://github.com/gmedia",
  /**
   * CTA "Lihat Repository" mengarah ke organisasi karena Sakala terdiri dari
   * lima repository. Sebelumnya menunjuk repo landing saja.
   */
  githubRepository: "https://github.com/gmedia",
  githubIssues: "https://github.com/gmedia/sakala-landing/issues",
  githubSecurity: "https://github.com/gmedia/sakala-landing/security/policy",
  repositories: {
    console: "https://github.com/gmedia/sakala-console",
    api: "https://github.com/gmedia/sakala-api",
    agent: "https://github.com/gmedia/sakala-agent",
    infra: "https://github.com/gmedia/sakala-infra",
    landing: "https://github.com/gmedia/sakala-landing",
  },
} as const;

export const domains = {
  site: "sakala.dev",
  console: "app.sakala.dev",
  api: "api.sakala.dev",
  runtime: "*.sakala.app",
} as const;
