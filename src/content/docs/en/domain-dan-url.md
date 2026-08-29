---
title: Domains and URLs
description: How an application gets a public address, and what separates the generated domain from your own.
track: panduan
section: Deploying
order: 6
lang: en
---

# Domains and URLs

An application only starts to feel real once it has an address other people can open. This page explains where that address comes from.

## The generated domain

Every project gets an automatic address following this pattern:

```txt
<slug>.run.sakala.dev
```

The `slug` comes from your project name. This address appears without you buying a domain or configuring DNS, so a project can be shared immediately.

In local development the same pattern is exercised through `*.run.sakala.localhost`.

## Why the address is not live right after the build

An application that builds successfully is not necessarily reachable yet. Two stages follow:

1. **Routing** — the public address is connected to your application running on an internal port.
2. **Health check** — Sakala confirms your application actually answers, not merely that the process started.

If the health check fails, the address is not activated. That is deliberate: a deployment marked failed is better than visitors finding an error page.

The most common reasons a health check fails are covered in [When a Deployment Fails](/en/docs/ketika-gagal).

## HTTPS

TLS certificates are handled automatically, so your application address uses `https://` without you preparing anything. This is one of the most tedious parts of running your own server.

## Your own domain

This section is direction, not something available yet.

Later you will be able to use a domain you own. The flow will cover adding the domain, pointing DNS at it, verifying ownership, issuing a certificate, and then the domain becoming active.

DNS complexity will be explained step by step rather than dumped on you. The status of each stage is shown separately so you know which part is unfinished:

```txt
DNS    ✓
TLS    ✓
Route  ✓
App    ✓
```

Other planned capabilities follow: setting a primary domain, creating aliases, and configuring redirects.

## Before you share the address

Open it from another device or network, not just the laptop you work on. Check the home page, important routes, images and CSS, how it looks on a small screen, and what appears when something goes wrong.

A public address does not automatically mean the application is production ready. Production readiness also covers security, monitoring, backups, capacity, and a recovery procedure that matches your application's risk.
