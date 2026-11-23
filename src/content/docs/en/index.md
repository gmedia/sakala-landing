---
title: Understanding Sakala
description: The problem Sakala is working on, the direction of its design, and what can and cannot be used yet.
track: panduan
section: Start here
order: 1
lang: en
---

# Understanding Sakala

This section explains the problem Sakala is working on: taking a project from a Git repository and turning it into an application other people can open in a browser.

You do not need to understand Docker, reverse proxies, or server configuration to read it. Technical terms are explained the first time they appear.

## Where things actually stand

Hosted Sakala is in an **open pilot**. Anyone can [sign up in the Console](https://app.sakala.dev/register) and use it at no cost, within limits on projects, containers, and builds per hour, and projects sleep after 30 minutes without visitors. There is no uptime guarantee yet, so Sakala is not a fit for important applications. The details are in [Pilot Limits](/en/docs/batas-pilot), and the latest progress is in the [Changelog](/en/changelog).

Some pages here are usage guides, others are design documents: the problem, the decisions already made, and the direction being built toward.

Usage guides:

- [Your First Deploy](/en/docs/deploy-pertama), step by step to a public URL;
- [Preparing a Dockerfile](/en/docs/dockerfile), with examples that have been tried;
- [Variables and secrets](/en/docs/variabel-dan-secret), including when a change needs a rebuild;
- [Managed databases](/en/docs/database-terkelola), still a limited pilot, and [connecting an external database](/en/docs/database-eksternal) as the other option;
- [Databases and the release command](/en/docs/perintah-rilis), to run migrations once per deployment;
- [When a deploy fails](/en/docs/deploy-gagal), to read failure codes and fix them.

What stays useful even if you end up using a different platform:

- understanding why a project needs to leave `localhost`;
- reading the [Deployment Flow](/en/docs/teknis/alur-deployment) to understand the stages;
- settling on shared vocabulary through the [Glossary](/en/docs/glosarium).

## If you want to understand the machinery

This section deliberately avoids explaining how Sakala is built. That lives in the
[Technical Documentation](/en/docs/teknis), which covers architecture, privilege
boundaries, the command lifecycle, and how the Agent works.

## The addresses

| Purpose               | Address          |
| --------------------- | ---------------- |
| Website and docs      | `sakala.dev`     |
| Console               | `app.sakala.dev` |
| Deployed applications | `*.sakala.app`   |

The Console is where projects are managed, and the `*.sakala.app` pattern means each application gets its own sub-address, on a domain [kept apart](/en/docs/faq#why-do-applications-live-on-sakalaapp-instead-of-sakaladev) from `sakala.dev` on purpose.
