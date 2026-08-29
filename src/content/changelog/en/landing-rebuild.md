---
title: Site rebuilt, documentation deepened, and now bilingual
description: A visual direction that follows the Console, technical diagrams that explain the infrastructure, a domain glossary, and support for Indonesian and English.
version: "0.3.0"
publishedAt: 2026-08-29
lang: en
---

The `sakala.dev` site was rebuilt so it matches the scope of the project documentation and speaks the same visual language as the Console, whose design is already complete. The hero, call to action, header, and footer sit on a deep teal surface, while anything meant for longer reading stays on a light background.

The page now carries Sakala's seven principles, the product direction that follows once a piece of work is alive, and a roadmap that keeps design status separate from engineering status. Every capability that is not available yet carries a status label, so nothing reads as a promise.

Infrastructure is explained with diagrams rather than paragraphs alone. The five-stage flow, the split between control plane and data plane, and the cycle in which work gives rise to work are drawn as static SVG that follows the surface color and carries a text equivalent for screen reader users.

Documentation is now split into two tracks. `/docs` holds the usage guide, written without assuming the reader knows Docker or reverse proxies, while `/docs/teknis` holds architecture, runtime, and security. Navigation is derived from the content collection, and the old technical URLs redirect to their new addresses.

The site is available in Indonesian and English. Every Indonesian URL is unchanged, and English pages live under `/en/`. Pages that have not been translated do not advertise a version in another language.

Typography uses Montserrat for headings and Inter for body text, both self-hosted under the SIL OFL. The logo, favicon, and Open Graph image were rebuilt from new vector assets.
