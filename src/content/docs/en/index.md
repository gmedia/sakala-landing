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

Sakala is **not open to the public yet**. A deployment path from a repository to a public URL exists and has been proven on staging, but registration is not open, and the path has not been tested with pilot users or in production. The status as of 6 November 2026 is in the [MVP](/en/docs/proyek/mvp) document.

So most pages here are still design documents: the problem, the decisions already made, and the direction being built toward.

Usage guides exist only in part, mainly for pilot participants:

- [Your First Deploy](/en/docs/deploy-pertama), step by step to a public URL;
- [Preparing a Dockerfile](/en/docs/dockerfile), with examples that have been tried;
- [Connecting an external database](/en/docs/database-eksternal), since Sakala does not provide one;
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

| Purpose               | Address            |
| --------------------- | ------------------ |
| Website and docs      | `sakala.dev`       |
| Console               | `app.sakala.dev`   |
| Deployed applications | `*.run.sakala.dev` |

The Console is where projects are managed, and the `*.run.sakala.dev` pattern means each application gets its own sub-address. While registration is not open to the public, neither can be used by just anyone.
