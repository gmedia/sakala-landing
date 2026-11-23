---
title: Frequently Asked Questions
description: Short answers about Sakala's status, who it is for, and how to contribute.
track: referensi
section: Reference
order: 2
lang: en
---

# Frequently Asked Questions

## What is Sakala?

Sakala is an open-source deployment platform that carries a project from a Git repository into an application that can be opened and shared. It is initiated by the Sakala Maintainers, supported by GMEDIA as founding sponsor, and still under active development. Its hosted service is in an open pilot, so anyone can [sign up](https://app.sakala.dev/register) and use it at no cost, within usage limits.

## Can Sakala be used in production yet?

Not for important applications. During the pilot there is no uptime guarantee, SLA, or data recovery, and files inside the container are lost every time a new deploy finishes. For assignments, portfolios, and demos, Sakala can already be used within the limits described in [Pilot Limits](/en/docs/batas-pilot).

## Is this only for students?

No. Sakala is also relevant for beginner developers, instructors, communities, and small teams who need straightforward project deployment.

## I am a lecturer. Can Sakala be used for a class?

Yes, as one way to let students' assignments be opened through a URL, within some limits. Sakala has no class features yet: no participant list, CSV import, assignments with deadlines, or grading. Those are on the roadmap as [Horizon B](/en/docs/proyek/roadmap#horizon-b--learn-minimal) and are not built. Sakala is also not an official submission system, so keep collecting assignments through your campus system and ask students to include the URL there.

The simplest way today:

1. Each student [signs up](https://app.sakala.dev/register) on their own and deploys from their own GitHub repository. A personal workspace holds 3 projects, and there is no cost during the pilot.
2. Students send their `<project-name>.sakala.app` address through the campus assignment system.
3. If you need to see the deployments and logs, a student can create the project in a team workspace, then invite you to that workspace as **Pengamat** (viewer). A viewer can read projects, deployments, and logs, but cannot change anything or see secret values.

A team workspace can also be used by a group, but its default limits are small: 2 projects and 2 running containers per workspace, and invitations go one email at a time through **Undang anggota** (invite member). All the limits are in [Pilot Limits](/en/docs/batas-pilot).

Before using it for a demo or grading, keep in mind that projects sleep after 30 minutes without visitors and need a moment to start again when opened, and there is no uptime guarantee during the pilot. Have a fallback, such as a recorded demo or running the application on a laptop.

If your class needs different limits or you have other questions, ask in [GitHub Discussions, Q&A category](https://github.com/gmedia/sakala/discussions/categories/q-a). Discussions are public, so do not post student data, passwords, or tokens there.

## Why open source?

Deployment teaches more when its flow, contracts, and technical trade-offs can be read and improved together.

## What is GMEDIA's role in Sakala?

GMEDIA is the founding sponsor and infrastructure supporter for Sakala's early phase. That support covers domains, infrastructure, room to experiment, and technical help so Sakala can reach MVP and an early pilot.

Sakala remains an open-source project with a public roadmap, documentation, issues, and contributions. Sponsorship does not confer control over technical decisions, roadmap priorities, licensing, or contributor rights.

## Why do applications live on `sakala.app` instead of `sakala.dev`?

A deployed application gets the address `<slug>.sakala.app`, while the website, documentation, Console, and API stay on `sakala.dev`. The two are kept apart on purpose, because an application on Sakala is code written by a user that anyone can open.

Free addresses with automatic HTTPS are a common tool for phishing pages. If one such application gets its domain blocked by browsers or mail filters, the block lands on `sakala.app`, and the website, documentation, and Console stay reachable. Cookies from `sakala.dev`, including the Console login cookie, are never sent to user applications either.

Each project gets its own subdomain and runs in its own container. Browsers do not yet treat each project as a separate site for cookies, because `sakala.app` is not on the Public Suffix List. Submitting it is planned once Sakala has enough users, which is one of the list's requirements. The reasoning behind the decision is in [ADR-016](/en/docs/proyek/adr).

Meanwhile, the Sakala router removes the `Domain` attribute from every `Set-Cookie` header an application sends, so cookies from your application's server only apply to your application's own address. Cookies set from JavaScript in the browser are not covered. If your application has a login, name the session cookie with the `__Host-` prefix (for example `SESSION_COOKIE=__Host-session` in Laravel), with `Secure` and `Path=/` and no `Domain`. Browsers reject a `__Host-` cookie set from another subdomain, so other applications on `sakala.app` cannot overwrite it.

Until 18 November 2026 applications used `*.run.sakala.dev` addresses. Those old addresses were switched off without a redirect, so links shared earlier need to be replaced with the new address shown in the Console.

## Where do I report a problem?

Open an issue on the matching repository: [`sakala-landing`](https://github.com/gmedia/sakala-landing/issues) for the website and documentation, [`sakala-console`](https://github.com/gmedia/sakala-console/issues) for screens and flows in the Console, and [`sakala-api`](https://github.com/gmedia/sakala-api/issues) for deployments that fail because of a fault on Sakala's side. If you are not sure which repository, ask in [Discussions](https://github.com/gmedia/sakala/discussions). For security matters, follow the [repository security policy](https://github.com/gmedia/sakala-landing/security/policy). To report a harmful application on `*.sakala.app`, write to `abuse@sakala.dev` as described in the [Acceptable Use Policy](/en/penggunaan-wajar).

## Where are Sakala's legal documents?

There are three: the [Privacy Notice](/en/privasi), the [Terms of Service](/en/syarat), and the [Acceptable Use Policy](/en/penggunaan-wajar). They are published in Indonesian, and the Indonesian text governs.
