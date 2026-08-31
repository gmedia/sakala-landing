# Sakala Landing Implementation Requirements

> This document constrains implementation, not the visual concept itself.

## 1. Existing technical baseline

Preserve the repository's static-first direction unless an explicit architecture decision changes it.

Current baseline:

```text
Astro
Static generation
Tailwind CSS v4
TypeScript
Astro content collections / MDX where already used
ID default locale
EN localized routes
```

Do not introduce a runtime server for homepage storytelling.

## 2. Architecture principles

Prefer:

```text
Astro components
semantic HTML
CSS
small isolated browser scripts only when needed
```

Avoid by default:

```text
React island
Vue island
Svelte island
large animation runtime
state-management library
WebGL
canvas rendering
```

An AI agent must justify any new client dependency.

## 3. Rebuild means rebuild

Do not preserve current homepage sections merely to minimize diff size.

Preserve:

- working architecture;
- localization infrastructure;
- SEO infrastructure;
- useful primitives;
- accessibility helpers;
- correct design-system components.

Replace:

- homepage information architecture when it conflicts with the new narrative;
- old creative-direction assumptions;
- redundant cards/sections;
- visual motifs that no longer serve the concept.

Do not rewrite unrelated docs pages for aesthetic consistency unless necessary.

## 4. Component strategy

Suggested conceptual structure:

```text
src/components/landing/
├── LandingHero.astro
├── PossibilityArtifact.astro
├── DistanceSection.astro
├── ThresholdSection.astro
├── ManifestationJourney.astro
├── DeploymentArtifact.astro
├── ClaritySection.astro
├── FailureArtifact.astro
├── ContinuationSection.astro
├── ProjectLineage.astro
├── OpenSourceSection.astro
└── LandingFinale.astro
```

Names are suggestions, not mandatory architecture.

Prefer meaningful components over `Section1`, `Section2`.

## 5. Design tokens

Do not scatter hardcoded color values through components.

Before implementation:

1. audit current `global.css`;
2. compare with canonical Figma/Sakala design system;
3. reconcile brand tokens;
4. keep semantic status tokens distinct from brand tokens;
5. document intentional changes.

Canonical provided design anchors:

```text
Green Teal   #0F766E
Burnt Orange #C2670E
Eerie Black  #1E1E1D
```

```text
Brand / Display / Heading   Montserrat
Body / Reading / Long-form  Inter
Mono / Technical artifact   system monospace
```

Use Figma/source design tokens for full ramps.

Do not guess missing shades.

## 6. Typography

Montserrat is the Sakala identity typeface and stays in display roles.
Inter is the reading typeface for body and long-form text, and is kept
deliberately rather than audited away.

```text
--font-display: Montserrat
--font-sans:    Inter
```

Do not change documentation typography casually while rebuilding only the landing.

Create landing-specific responsive display tokens instead of random `text-[92px]` values repeated in components.

## 7. Motion implementation

Follow `MOTION_LANGUAGE.md`.

Prefer:

- CSS transitions;
- CSS animations where semantic;
- IntersectionObserver for simple reveal/state activation;
- native scroll-linked primitives only where support/fallback is acceptable.

Do not install an animation package before demonstrating why native primitives are insufficient.

Any motion system must provide a static/reduced-motion equivalent.

## 8. JavaScript budget

The landing should remain highly usable without JavaScript.

JS is allowed for enhancement, not basic comprehension.

The following must render statically:

- main narrative copy;
- project journey states;
- final public URL explanation;
- open-source proof;
- navigation;
- CTA links.

## 9. Accessibility

Required:

- valid heading hierarchy;
- skip link;
- visible keyboard focus;
- usable touch targets;
- no color-only status;
- semantic figure captions;
- reduced motion;
- sufficient contrast;
- no forced horizontal page scrolling;
- no content hidden permanently without JS.

Test:

```text
320px
768px
1280px+
keyboard only
reduced motion
```

## 10. Performance

The narrative should feel premium because it is disciplined, not heavy.

Avoid:

- hero video;
- autoplay background media;
- giant image sequences;
- unbounded scroll listeners;
- large third-party script packages;
- unnecessary font weights;
- decorative network requests.

Optimize SVG and static assets.

Use responsive images when raster is truly necessary.

## 11. SEO

Preserve existing SEO work.

The homepage must contain at least one plain, crawlable explanation of what Sakala is.

Philosophical copy must not remove product clarity.

Preserve:

- canonical strategy;
- locale metadata;
- sitemap behavior;
- structured-data correctness;
- `hreflang` behavior;
- existing bilingual route rules.

Read `PROJECT_SEO_AUDIT.md` before changing metadata or route architecture.

## 12. Localization

All user-facing landing strings belong in the established i18n system.

Do not hardcode Indonesian directly inside components if the route has an English counterpart.

English copy should be authored intentionally.

Type safety/checks for missing translations should remain intact.

## 13. Product maturity

Before implementation, inventory current vs future capabilities.

Each displayed artifact must be classified as:

```text
actual
design direction
conceptual explanation
```

Future items need clear framing.

Never convert a Figma concept into a claim that the feature is running.

## 14. Validation commands

At minimum:

```bash
npm run format:check
npm run check
npm run build
```

## 15. Manual acceptance

Before calling rebuild complete:

- homepage story reads coherently with CSS animations disabled;
- story reads coherently with JS disabled where feasible;
- mobile is designed, not merely stacked;
- focus order follows visual order;
- Indonesian and English routes do not leak languages;
- no unsupported claim exists;
- no generic SaaS copy remains;
- no old section survives only because deleting it felt risky;
- no new dependency exists without rationale.

## 16. Scope discipline

The goal is a major homepage rebuild.

Do not turn it into:

```text
rewrite all docs
replace Astro
redesign Console
introduce API
add authentication
implement Explore backend
```

A landing can communicate future direction without building the future product.
