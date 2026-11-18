/** Repository publik Sakala yang aktif. Dipakai juga untuk pencarian issue. */
const sakalaRepositoryNames = [
  "sakala",
  "sakala-console",
  "sakala-api",
  "sakala-agent",
  "sakala-landing",
  "sakala-infra",
] as const;

/**
 * Organisasi `gmedia` di GitHub juga memuat project GMEDIA lain, jadi tautan
 * "GitHub" membuka daftar repository organisasi yang difilter ke Sakala, tanpa
 * repository yang sudah diarsipkan.
 */
const sakalaRepositoryList =
  "https://github.com/orgs/gmedia/repositories?q=sakala+archived%3Afalse";

/** Issue terbuka berlabel tertentu di semua repository Sakala sekaligus. */
function issueSearch(label: string): string {
  const repos = sakalaRepositoryNames.map((name) => `repo:gmedia/${name}`);
  const query = ["is:issue", "is:open", `label:"${label}"`, ...repos].join(" ");
  return `https://github.com/search?type=issues&q=${encodeURIComponent(query)}`;
}

export const links = {
  console: "https://app.sakala.dev",
  api: "https://api.sakala.dev",
  /** Nama kunci dipertahankan; isinya kini daftar repository Sakala saja. */
  githubOrganization: sakalaRepositoryList,
  githubRepository: sakalaRepositoryList,
  githubIssues: "https://github.com/gmedia/sakala-landing/issues",
  githubSecurity: "https://github.com/gmedia/sakala-landing/security/policy",
  /** Discussions untuk seluruh project ada di repository distribusi `sakala`. */
  githubDiscussions: "https://github.com/gmedia/sakala/discussions",
  goodFirstIssues: issueSearch("good first issue"),
  repositories: {
    distribution: "https://github.com/gmedia/sakala",
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
