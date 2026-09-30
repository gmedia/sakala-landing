---
title: Design System
description: Color tokens with measured contrast, the typography pair, spacing scale, status vocabulary, and artifact rules used by the landing and serving as the reference for other Sakala interfaces.
track: teknis
section: Interface
order: 7
lang: en
---

# Design System

> **Canonical source:** [Design Strategy](/en/docs/proyek/design-strategy) · Sakala Design System (Figma, team access)

This page is the reference for anyone building a Sakala interface — the
Console, the landing, internal tools, or a new contribution. The values here
are the ones this site actually uses (`src/styles/global.css`), reconciled
with the Sakala Design System in Figma. Where the two differ, Figma wins and
this page gets corrected.

None of this is secret: it is already in the CSS shipped to every browser.
Publishing it makes UI contributions consistent from the start instead of
corrected afterwards.

The Sakala name and logo are not covered by this repository's licence; their use is governed by [Governance §7](/en/docs/proyek/governance).

## Brand anchors

Three canonical colors from the Sakala Design System. Other values derive
from the Figma ramps; no shade is invented.

```txt
Green Teal     #0F766E   Sakala identity, primary action, narrative meaning: manifestation, life, presence
Burnt Orange   #C2670E   secondary, restrained: human intention, points of transition
Eerie Black    #1E1E1D   technical depth: source, logs, diagnostic surfaces
```

Green Teal is primary. Burnt Orange is not a second primary and must not
compete with warning colors. Semantic status colors (success, warning,
error, info) are deliberately separate from brand colors.

## Color tokens and contrast

Ratios are measured against the surface the token is used on. WCAG 2.2 AA
thresholds: text 4.5:1, large text and UI parts 3:1.

### Light surface (`canvas #FBFBFA`)

| Token          | Value     | Role                                                                | Ratio   |
| -------------- | --------- | ------------------------------------------------------------------- | ------- |
| `ink`          | `#1E1E1D` | primary text                                                        | 16.11:1 |
| `muted`        | `#5C5C58` | secondary text                                                      | 6.49:1  |
| `muted-2`      | `#6B6B66` | labels, captions                                                    | 5.17:1  |
| `primary`      | `#0F766E` | actions, markers; as small text                                     | 5.29:1  |
| `primary-dark` | `#115E59` | link text on canvas                                                 | 7.32:1  |
| `spark-text`   | `#96500B` | orange text (the anchor `#C2670E` is only 3.87:1, so non-text only) | 5.88:1  |
| `success`      | `#15803D` | success status text                                                 | 4.84:1  |
| `warning`      | `#9A4D06` | warning status text                                                 | 5.90:1  |
| `error`        | `#B91C1C` | failure status text                                                 | 6.25:1  |
| white          | `#FFFFFF` | text on a `primary` button                                          | 5.47:1  |

Companions: `surface #FFFFFF`, `background-soft #F4F4F2`, `border #E2E2DE`,
`border-strong #D1D1CB`, `primary-soft #CCFBF1`, `primary-soft-2 #E7FFFA`,
`spark-soft #FDF0E2`.

### Deep teal surface (`deep #08413D`)

Used for moments of transition, not as a default.

| Token           | Value     | Role           | Ratio   |
| --------------- | --------- | -------------- | ------- |
| `on-deep`       | `#FFFFFF` | primary text   | 11.45:1 |
| `on-deep-label` | `#CCFBF1` | labels, icons  | 10.16:1 |
| `on-deep-muted` | `#B5D5D2` | secondary text | 7.31:1  |

Companions: `deepest #06322F`, `deep-surface #0B4D48`, `deep-border #14564F`.

### Eerie Black surface (`depth #1E1E1D`)

Used for logs, source, and diagnostic artifacts.

| Token            | Value     | Role           | Ratio                     |
| ---------------- | --------- | -------------- | ------------------------- |
| `on-depth`       | `#E8E8E6` | primary text   | 13.60:1                   |
| `on-depth-muted` | `#A8A8A4` | secondary text | 6.99:1                    |
| `error-on-depth` | `#FCA5A5` | error lines    | 7.68:1 on `depth-surface` |

Companions: `depth-surface #292927`, `depth-border #3A3A37`,
`success-on-depth #4ADE80`, `spark-on-depth #E08A2E`.

Note: `on-depth-subtle #8F8F8B` reaches only 4.49:1 on `depth-surface`; use
`on-depth-muted` for text on dark cards.

## Typography

A pair, not a single family.

```txt
Brand / Display / Heading    Montserrat   weights 600, 700
Body / Reading / Long-form   Inter        weights 400, 500, 600
Mono / Technical artifacts   system monospace
```

Inter is chosen deliberately for reading comfort at length; it is not a
second brand and never appears in display roles. Monospace is only for
domains, logs, deployment status, file trees, commits, and technical labels
— never for reading text.

Landing-only narrative display scale (`clamp`, tested at 320 px):

```txt
narrative-xl   clamp(2.75rem, 7vw, 6rem)      line-height 1
narrative-l    clamp(2.125rem, 5vw, 4.25rem)  line-height 1.04
narrative-m    clamp(1.75rem, 3.4vw, 2.75rem) line-height 1.14
```

The Console uses a lower ceiling; this scale is not used in the docs.

Setting rules: body 16–18 px with line-height 1.5–1.65 and a 45–80 character
measure; headings at line-height 1.0–1.2 with slightly negative letter-spacing
at display sizes; sentence case for UI; tabular figures in tables and logs.

## Spacing, radius, surfaces

- Spacing scale 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px. Space
  between groups is always larger than space within them.
- Radius: 8 px for controls, 12 px for small cards, 16 px for artifacts and
  large cards, full for chips. One radius for everything is a template tell.
- Dark surfaces are a narrative decision (a transition, a diagnostic
  surface), not a default. Inside them, text tokens and the focus ring are
  swapped per surface (`.surface-deep`, `.surface-depth`).
- Gradients only where something changes state, and only within the teal and
  neutral families while the Burnt Orange and Eerie Black ramps do not yet
  exist in Figma.

## Status vocabulary

Used identically on the landing and, ideally, in the Console.

```txt
available · building · testing · next · direction · unavailable
```

Deployment stage states: `done` · `running` · `pending` · `failed`. Status is
never conveyed by color alone: there is always text or an icon.

Deployment stage names follow Console Wave 1, written natively per language:
`Cloning repository` · `Analyzing project` · `Building image` ·
`Starting container` · `Checking health`.

## Artifacts and illustration

Sakala's illustrations are software artifacts: repository, logs, address,
deployment stages, health check — not cloud illustrations, isometric servers,
or stock photos. Every artifact is classified as one of:

```txt
actual              a product state that runs today
design direction    exists in approved design, not necessarily built
conceptual          a diagram that explains a principle
```

`design direction` and `conceptual` artifacts are always labelled. Future UI
never appears as a screenshot of a running product.

## Accessibility

The floor for every Sakala interface: WCAG 2.2 AA; full keyboard navigation
with a visible focus ring on every surface; 44 px touch targets on touch
devices and at least 24 px anywhere; no horizontal scroll at 320 px;
`prefers-reduced-motion` respected, with the story intact without motion and
without JavaScript.

## Not yet available

- Full Burnt Orange and Eerie Black ramps in Figma. Only the anchor values
  are used.
- Console tokens (density, tables, forms) are not yet reconciled with this
  page; that is the next piece of work with the design team.
