---
title: Redeploy without a build, and variable suggestions from .env.example
description: Redeploy now reuses the image in use when nothing needs to be built again, and the wizard suggests variables from .env.example.
publishedAt: 2026-11-20
lang: en
---

Since 19 November 2026, the **Redeploy** button reuses the image in use when
the commit, build settings, and variables read at build time are unchanged.
Clone, analysis, and build are skipped, while the release command, health
checks, and replicas run as usual. This also applies to the automatic
redeploy after a database password change, and such deployments do not count
toward the build limit per hour. If you still want a build, choose
**Build ulang dari awal** (rebuild from scratch) in the menu next to Redeploy.

Since 20 November 2026, static sites and frameworks that render pages at
build time, such as Next.js, Nuxt, Astro, and SvelteKit, always rebuild when
their variables change, because the values are stored in the build output. In
the **Variabel** (variables) tab, the Console says what a change will do
before you save it.

The new project wizard also reads `.env.example` in the repository and
suggests its variables: which ones you need to fill in, random keys made by
Sakala, and example values adjusted for production. The same suggestions are
in the **Variabel** tab through **Isi dari .env.example** (fill from
.env.example). The details are in
[Variables and Secrets](/en/docs/variabel-dan-secret).
