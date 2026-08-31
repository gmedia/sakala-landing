---
title: Understanding Sakala
description: The problem Sakala is working on, the direction of its design, and what does and does not exist yet.
track: panduan
section: Start here
order: 1
lang: en
---

# Understanding Sakala

This section explains the problem Sakala is working on: taking a project from a Git repository and turning it into an application other people can open in a browser.

You do not need to understand Docker, reverse proxies, or server configuration to read it. Technical terms are explained the first time they appear.

## Where things actually stand

Sakala is **not available as a public service yet**. There is no deployment flow you can run today.

So this is not a usage guide. What lives here are design documents: the problem, the decisions already made, and the direction being built toward.

What stays useful right now:

- understanding why a project needs to leave `localhost`;
- reading the [Deployment Flow](/en/docs/teknis/alur-deployment) as a design, not a promise;
- settling on shared vocabulary through the [Glossary](/en/docs/glosarium).

All of it holds even if you end up using a different platform.

## If you want to understand the machinery

This section deliberately avoids explaining how Sakala is built. That lives in the
[Technical Documentation](/en/docs/teknis), which covers architecture, privilege
boundaries, the command lifecycle, and how the Agent works.

## Planned addresses

| Purpose               | Address            |
| --------------------- | ------------------ |
| Website and docs      | `sakala.dev`       |
| Console               | `app.sakala.dev`   |
| Deployed applications | `*.run.sakala.dev` |

Of the three, only `sakala.dev` is live. The Console is where projects will be managed later, and the `*.run.sakala.dev` pattern means each application gets its own sub-address.
