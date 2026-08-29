---
title: Using Sakala
description: The starting point for people who want to use Sakala to take a project from a repository to a public address.
track: panduan
section: Start here
order: 1
lang: en
---

# Using Sakala

This section is for people who want to **use** Sakala: to take a project from a Git repository and turn it into an application other people can open in a browser.

You do not need to understand Docker, reverse proxies, or server configuration to follow it. Technical terms are explained the first time they appear.

## Where things actually stand

Sakala is **not available as a public service yet**. The deployment flow described here is the experience being built, not something you can run today.

What you can do right now:

- understand why a project needs to leave `localhost`;
- prepare your repository so it is ready to deploy anywhere;
- learn how deployment failures are read and fixed.

All three stay useful even if you end up using a different platform.

## If you want to understand the machinery

This guide deliberately avoids explaining how Sakala is built. That lives in the
[Technical Documentation](/en/docs/teknis), which covers architecture, privilege
boundaries, the command lifecycle, and how the Agent works.

## Addresses Sakala uses

| Purpose               | Address            |
| --------------------- | ------------------ |
| Website and docs      | `sakala.dev`       |
| Console               | `app.sakala.dev`   |
| Deployed applications | `*.run.sakala.dev` |

The Console is the interface where you will manage projects. The `*.run.sakala.dev` pattern means each application gets its own sub-address.
