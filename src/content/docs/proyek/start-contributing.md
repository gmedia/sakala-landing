---
title: "Start Contributing"
description: "A map for newcomers: which repository does what, how to run each one, which quality commands must pass, how to pick work, and the rule for changing the agent and API contract."
track: proyek
section: kerjasama
order: 13.5
lang: en
canonical: true
---

# Start Contributing

Pick one repository below, run it, then pick an issue. Sakala is split across six public repositories, and you do not need all of them running to make a useful change. The rules they share are in [Contributing to Sakala](/docs/proyek/contributing).

As of 6 November 2026, Sakala is not open to the public and the MVP is not done. See [MVP](/docs/proyek/mvp) for what exists and what does not.

## The repositories

| Repository                                                   | What it is                                                                               | Stack                                   | Prerequisites                      |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | --------------------------------------- | ---------------------------------- |
| [`sakala-landing`](https://github.com/gmedia/sakala-landing) | This site and canonical documents                                                        | Astro 7, Tailwind CSS 4                 | Node.js 22.12 or newer, npm        |
| [`sakala-console`](https://github.com/gmedia/sakala-console) | User dashboard, a static SPA                                                             | SvelteKit, Svelte 5, Tailwind CSS 4     | Node.js 22.12 or newer, pnpm 10.31 |
| [`sakala-api`](https://github.com/gmedia/sakala-api)         | Control plane                                                                            | Laravel 13, PHP 8.5, PostgreSQL, Valkey | PHP 8.5, Composer 2, Docker        |
| [`sakala-agent`](https://github.com/gmedia/sakala-agent)     | Runtime executor on a node                                                               | Rust workspace                          | Rust 1.88 or newer, Make           |
| [`sakala-infra`](https://github.com/gmedia/sakala-infra)     | Local runtime reference                                                                  | Docker Compose, Caddy, shell scripts    | Docker with Compose, Make          |
| [`sakala`](https://github.com/gmedia/sakala)                 | Self-host distribution: installer, Compose, pinned versions, and the home of Discussions | Bash, Docker Compose, systemd           | Docker with Compose, ShellCheck    |

The infrastructure that runs the hosted service is kept private, as [Governance §9](/docs/proyek/governance) explains. You do not need it to contribute.

## Run a repository

Each block starts from a fresh clone of that repository. Its own `README.md` and `CONTRIBUTING.md` hold the details.

`sakala-landing`:

```bash
npm ci
npm run dev
```

`sakala-console`, which needs a local API for anything past the login screen:

```bash
pnpm install
cp .env.example .env
pnpm exec playwright install chromium
pnpm dev
```

`sakala-api`:

```bash
cp .env.example .env
composer install
php artisan key:generate
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate
```

`sakala-agent`, which starts in `local` mode by default, with no API and no Docker work. Stop it with Ctrl+C.

```bash
cargo run -p sakala-agent
```

`sakala-infra`:

```bash
cp .env.example .env
make up
make doctor
```

To run the API, Console, agent, and runtime together on one machine, follow [Full Stack Lokal](https://github.com/gmedia/sakala-infra/blob/main/docs/FULL_STACK_LOCAL.md) in `sakala-infra` instead of the blocks above. It ends with a project deployed to a local URL. Running the `sakala-api` and `sakala-infra` blocks above side by side does not work, because Sail starts Reverb on port 8080 and the infra Caddy wants the same port. The guide moves Reverb to 8081.

## Quality commands

Run these before opening a pull request. CI runs the same checks.

| Repository       | Commands                                                      | What to know                                                                                                                                                                                                                                  |
| ---------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sakala-landing` | `npm run format:check`, `npm run check`, `npm run build`      |                                                                                                                                                                                                                                               |
| `sakala-console` | `pnpm quality`, and `pnpm test:e2e` if a user flow changed    | Needs `.env` and the Playwright Chromium from setup, because component tests run in a browser                                                                                                                                                 |
| `sakala-api`     | `composer check`, `composer audit --locked`                   | Without Sail, `composer check` cannot reach the database in `.env.example`. Prefix it with `DB_CONNECTION=sqlite DB_DATABASE=":memory:"`, as CI does for the OpenAPI step                                                                     |
| `sakala-agent`   | `make fmt`, `make lint`, `make test`, `make build`            | `make check` runs the same set, but checks formatting instead of rewriting it                                                                                                                                                                 |
| `sakala-infra`   | `make config`, and `bash -n scripts/*.sh` if a script changed | Run `make up`, `make doctor`, and `make test-runtime` if container behaviour changed                                                                                                                                                          |
| `sakala`         | ShellCheck, `tests/compose-config.sh`, `tests/dry-run.sh`     | The exact commands are in its `CONTRIBUTING.md`. `tests/dry-run.sh` runs the installer in throwaway Ubuntu containers and needs Docker and internet. Never run `tests/install-e2e.sh` or `tests/upgrade-e2e.sh` on a machine you want to keep |

## Pick work

Start from these two searches. They cover every Sakala repository and stay current as issues open and close:

- [Issues labelled `good first issue`](https://github.com/search?type=issues&q=is:issue%20is:open%20label:%22good%20first%20issue%22%20repo:gmedia/sakala%20repo:gmedia/sakala-console%20repo:gmedia/sakala-api%20repo:gmedia/sakala-agent%20repo:gmedia/sakala-landing%20repo:gmedia/sakala-infra) are small and self-contained. Each one names the files to touch and how to test the change, so it suits a first pull request.
- [Issues labelled `help wanted`](https://github.com/search?type=issues&q=is:issue%20is:open%20label:%22help%20wanted%22%20repo:gmedia/sakala%20repo:gmedia/sakala-console%20repo:gmedia/sakala-api%20repo:gmedia/sakala-agent%20repo:gmedia/sakala-landing%20repo:gmedia/sakala-infra) are larger features from the [Roadmap](/docs/proyek/roadmap) that maintainers would like help with.

Comment on the issue before you start, so two people do not end up on the same work. For a `help wanted` issue, describe your approach in that comment and wait for a maintainer to reply before writing much code. These features usually span more than one repository, and the [contract rules](#contract-rules) below apply. The labels `mvp` and `phase:N` link an issue to the engineering phases in the Roadmap.

An open issue without either label may already be planned or in progress with maintainers. Ask on it before picking it up.

To browse everything instead, open issues live on each repository: [`sakala-landing`](https://github.com/gmedia/sakala-landing/issues), [`sakala-console`](https://github.com/gmedia/sakala-console/issues), [`sakala-api`](https://github.com/gmedia/sakala-api/issues), [`sakala-agent`](https://github.com/gmedia/sakala-agent/issues), [`sakala-infra`](https://github.com/gmedia/sakala-infra/issues), and [`sakala`](https://github.com/gmedia/sakala/issues).

### Areas that stay with maintainers

Maintainers make the changes in three areas, because a mistake there puts users or servers at risk, or the work needs access that contributors do not have:

- **Security boundaries:** authentication, authorization for workspaces and the admin area, Docker socket access, and the gVisor sandbox around user workloads.
- **The agent protocol:** the wire contract between `sakala-agent` and `sakala-api`, described under [Contract rules](#contract-rules).
- **Production deployment:** the private infrastructure repository, the deploy scripts, and the servers behind the hosted service.

You are still welcome to report a bug or suggest a change in these areas. Open an issue, or report it privately if it is a vulnerability, and leave the pull request to a maintainer unless one asks you to send it.

### Propose larger work

If nothing on the lists fits, or your idea is bigger than one issue, propose it before writing code. Open an issue in the repository it belongs to and describe the problem you want to solve, not only the solution. If you are not sure which repository it belongs to, or whether it fits Sakala at all, start a thread in [Ideas](https://github.com/gmedia/sakala/discussions/categories/ideas) on Discussions in `gmedia/sakala` instead. Start building once a maintainer agrees on the approach, so your work does not need a rewrite.

### Ask questions

Ask in [Q&A](https://github.com/gmedia/sakala/discussions/categories/q-a) on [Discussions](https://github.com/gmedia/sakala/discussions). It serves every Sakala repository, so you do not need to work out which repository a question belongs to first.

## Contract rules

Two contracts cross repository boundaries. Changing either one in only one repository breaks the others.

**Agent and API.** The wire types are defined in `sakala-agent`: the `sakala-agent-protocol` crate, plus `docs/AGENT_API.md`, `docs/COMMAND_LIFECYCLE.md`, and `docs/COMPATIBILITY.md`. `sakala-api` implements them and must not add an endpoint, command type, or wire field on its own. A change is made together with an explicit protocol change in the agent. A new failure code also needs a case in `DeploymentFailureClassifier` in `sakala-api`, or users see it as `unknown`. Anything that changes the agent's privilege boundary needs discussion first, and a new [ADR](/docs/proyek/adr) when it moves that boundary.

**Console and API.** Laravel API Resources and the Scramble OpenAPI output are the source of truth for the HTTP contract. When an endpoint changes, run `pnpm api:types` in `sakala-console` against a running local API, instead of writing the types by hand.

## Next

Read [Contributing to Sakala](/docs/proyek/contributing) for branches, commits, and pull requests, and [Architecture](/docs/proyek/architecture) if your change touches a boundary. Report security problems privately, as [Security §14](/docs/proyek/security) describes, never in a public issue.
