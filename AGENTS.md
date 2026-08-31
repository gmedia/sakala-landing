# AGENTS.md — Sakala Landing

This document applies to AI agents, Codex, automation tools, and contributors working on `sakala-landing`.

## Identity

- Project: **Sakala Landing**
- Product: **Sakala**
- Tagline: **Manifesting Code into Reality.**
- Stewardship: **Sakala Maintainers**
- Founding Sponsor & Infrastructure Supporter: **PT Media Sarana Data / GMEDIA**
- License: **Apache License 2.0**
- Default public language: **Bahasa Indonesia**

## Source of truth

Project-level Sakala documentation remains authoritative for philosophy, product, scope, architecture, and governance.

For landing-specific creative work, read:

```text
docs/landing/README.md
docs/landing/LANDING_PHILOSOPHY.md
docs/landing/NARRATIVE_ARCHITECTURE.md
docs/landing/VOICE_AND_LANGUAGE.md
docs/landing/ART_DIRECTION.md
docs/landing/MOTION_LANGUAGE.md
docs/landing/CONTENT_ARCHITECTURE.md
docs/landing/PRODUCT_ARTIFACTS.md
docs/landing/IMPLEMENTATION_REQUIREMENTS.md
docs/landing/AI_AGENT_PLAYBOOK.md
docs/landing/REFERENCE_NOTES.md
```

For SEO and Astro technical decisions, also read:

```text
docs/PROJECT_SEO_AUDIT.md
docs/PROJECT_ASTRO_FEATURES.md
ARCHITECTURE.md
```

### Superseded creative direction

For the next major homepage rebuild, `docs/landing/*` supersedes conflicting **creative/homepage-structure** direction in:

```text
docs/archive/PROJECT_DESIGN_CONTEXT.md
docs/archive/PROJECT_LANDING_REBUILD_PLAN.md
```

Those older files may still contain useful historical or technical context, but they do not override the new homepage narrative, visual storytelling, art direction, motion language, or content hierarchy.

## Homepage creative thesis

```text
The Life of a Project
Possibility → Presence → Continuation
```

Signature metaphor:

```text
Source → Sakala → Reality
```

Emotional refrain:

```text
"I built this." → "Here it is."
```

The homepage follows one conceptual project through its life.

## Brand rules

The landing does **not** create a new Sakala visual identity.

Canonical anchors from the supplied design system:

```text
Green Teal   #0F796E
Burnt Orange #C2670E
Eerie Black  #1E1E1D
Typeface     Montserrat
```

Use actual Figma/design-system ramps instead of guessing missing shades.

- Green Teal is primary Sakala identity and may narratively represent manifestation, life, presence, and growth.
- Burnt Orange is secondary and restrained.
- Semantic success/warning/error colors remain distinct from brand colors.
- Do not introduce an unrelated serif or landing-only brand system.
- Do not use eco/nature imagery merely because the brand is green.
- Do not become a Vercel/Linear/Awwwards clone.
- Avoid generic SaaS bento grids as homepage architecture.

## Product and copy rules

- Be honest about maturity.
- Do not claim production, enterprise, scale, uptime, or sustainability without evidence.
- Do not invent customers, metrics, or testimonials.
- Design direction is not engineering completion.
- Future Explore/Learn capabilities must not be presented as already shipped.
- Sakala is an open-source project stewarded by Sakala Maintainers; GMEDIA is founding sponsor and infrastructure supporter.
- Bahasa Indonesia is authored natively, not mechanically translated from English.
- Avoid generic SaaS hype.
- Philosophical copy must remain understandable in one read.
- Operational errors/logs must be technical and precise, never poetic.

## Architecture rules

- Keep Astro static-first.
- Do not add a runtime server for landing storytelling.
- Prefer Astro components, semantic HTML, CSS, and minimal isolated browser JS.
- Do not add React/Vue/Svelte islands or animation libraries without measured need and explicit rationale.
- Keep Tailwind CSS v4 through current Vite setup.
- Preserve current i18n route behavior.
- Preserve SEO/canonical/hreflang/structured-data work.
- Keep fonts self-hosted according to repository architecture.
- Update docs when architecture or public-content behavior changes.

## Motion rules

```text
Nothing moves unless something is becoming.
Only one thing becomes at a time.
```

- Motion communicates state change, not decoration.
- Story must work with motion disabled.
- Respect `prefers-reduced-motion`.
- No long scroll hijacking.
- No decorative WebGL, cursor gimmicks, floating particles, or autoplay hero video.

## Artifact rules

Use software artifacts as illustrations:

```text
repository
source
localhost
deployment state
logs
health
domain
browser
lineage
```

Classify every artifact:

```text
actual
design direction
conceptual explanation
```

Do not show conceptual/future UI as a live shipped screenshot.

## Required workflow for major homepage work

1. Read source-of-truth documents.
2. Audit current homepage.
3. Classify existing components: `KEEP / ADAPT / REMOVE / NEW`.
4. Inventory and verify product claims.
5. Plan narrative chapter-by-chapter.
6. Build a correct static/responsive version first.
7. Add truthful product artifacts.
8. Add motion only after static story works.
9. Verify accessibility, i18n, SEO, and performance.
10. Run project checks.

## Verification

```bash
npm run format:check
npm run check
npm run build
```

Also manually review:

```text
320px
768px
1280px+
keyboard only
prefers-reduced-motion
Indonesian
English
```

## Commit convention

```text
docs(landing): define creative direction
refactor(landing): rebuild homepage narrative
feat(landing): add manifestation journey
fix(a11y): improve reduced-motion landing experience
```

## Final question

Before adding anything to homepage, ask:

> Why does this exist?

If the answer is only "because it looks cool" or "other developer tools have it", do not add it.
