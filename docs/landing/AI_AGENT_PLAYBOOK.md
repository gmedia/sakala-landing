# AI Agent Playbook — Sakala Landing Major Rebuild

> This file tells an AI coding agent **how to work**, not just what the final page should look like.

## 1. Mission

Rebuild the `sakala-landing` homepage so it expresses Sakala's philosophy through a coherent product story:

```text
The Life of a Project
Possibility → Presence → Continuation
```

The result must remain recognizably Sakala and technically aligned with the current Astro repository.

## 2. Required read order

Before editing code, read:

```text
AGENTS.md

Project philosophy/product docs available to the repository/project context:
PHILOSOPHY
VISION
PRD
MVP
DESIGN_STRATEGY
GOVERNANCE
FEATURE_EXPLORE
FEATURE_EDUCATION

docs/landing/README.md
docs/landing/LANDING_PHILOSOPHY.md
docs/landing/NARRATIVE_ARCHITECTURE.md
docs/landing/VOICE_AND_LANGUAGE.md
docs/landing/ART_DIRECTION.md
docs/landing/MOTION_LANGUAGE.md
docs/landing/CONTENT_ARCHITECTURE.md
docs/landing/PRODUCT_ARTIFACTS.md
docs/landing/IMPLEMENTATION_REQUIREMENTS.md

docs/PROJECT_SEO_AUDIT.md
docs/PROJECT_ASTRO_FEATURES.md
ARCHITECTURE.md
```

Do not begin by opening `src/pages/index.astro` and preserving whatever is already there.

Understand the target first.

## 3. Document precedence

For the homepage creative rebuild:

```text
Project-level Sakala philosophy/product truth
        ↓
docs/landing/*
        ↓
current implementation
```

Old local creative assumptions do not win merely because they already exist in code.

Specifically, creative/homepage-structure rules from:

```text
docs/archive/PROJECT_DESIGN_CONTEXT.md
docs/archive/PROJECT_LANDING_REBUILD_PLAN.md
```

are superseded where they conflict with `docs/landing/*`.

Technical knowledge from those files may still be reused if not contradicted.

## 4. Phase 0 — Audit

Before changing files, report:

### Current homepage

- sections;
- current copy;
- components used;
- current animation/client JS;
- current design tokens;
- current i18n keys;
- current metadata/SEO dependencies.

### Reusable components

Classify:

```text
KEEP
ADAPT
REMOVE
NEW
```

Do not equate "existing" with "must keep."

### Product claims

List homepage claims and classify:

```text
verified current capability
approved future direction
unsupported / ambiguous
```

Do not implement unsupported claims.

## 5. Phase 1 — Plan

Create a concrete implementation plan mapped to:

```text
Possibility
Distance
Threshold
Manifestation
Clarity
Life
Open/Human
Finale
```

For each chapter define:

- component;
- copy keys;
- artifact;
- responsive behavior;
- motion behavior;
- reduced-motion behavior;
- source truth for any product claim.

Only then begin implementation.

## 6. Phase 2 — Token reconciliation

Audit `src/styles/global.css`.

The supplied canonical Sakala design anchors are:

```text
Green Teal   #0F796E
Burnt Orange #C2670E
Eerie Black  #1E1E1D
Montserrat
```

Current repository values may differ.

Do not silently mix them.

If a token change impacts docs/other pages, explain scope before changing globally.

Prefer additive landing tokens when a global migration would create unrelated churn.

## 7. Phase 3 — Static narrative first

Build the entire homepage as a correct **static** page first.

Do not add animation yet.

Acceptance:

- story works;
- hierarchy works;
- responsive layout works;
- artifacts make sense;
- product claims are truthful;
- both languages work.

Only after static approval move to motion.

## 8. Phase 4 — Product artifacts

Build focused artifacts based on `PRODUCT_ARTIFACTS.md`.

Priority:

```text
1. source/local artifact
2. threshold
3. deployment journey
4. live browser
5. clarity/failure
6. lineage
```

Use actual Sakala visual grammar.

Do not create fake analytics or fake customer screens.

## 9. Phase 5 — Motion enhancement

Add motion according to:

```text
Nothing moves unless something is becoming.
Only one thing becomes at a time.
```

Do not install a motion library as the first step.

Motion is enhancement, not page architecture.

## 10. Phase 6 — Content pruning

After implementation, remove:

- duplicated ideas;
- generic feature cards;
- repeated CTAs;
- roadmap detail that belongs elsewhere;
- persona blocks that repeat the narrative;
- decorative labels that do not add meaning.

The final page should usually be **shorter in concepts** than the current page even if individual chapters are visually spacious.

## 11. Phase 7 — Verify

Run:

```bash
npm run format:check
npm run check
npm run build
```

Then manually review:

```text
320px
768px
1280px+
keyboard navigation
prefers-reduced-motion
Indonesian
English
```

## 12. Agent behavior rules

### Always ask why

Before adding a section:

> What visitor-understanding change does this create?

Before adding a visual:

> What does this explain?

Before adding motion:

> What is becoming?

Before adding a color:

> What does this color mean?

Before adding a dependency:

> What problem cannot reasonably be solved with the current stack?

Before preserving old code:

> Is it still correct for the new direction?

### Do not optimize for minimal diff

This is a major rebuild.

A smaller diff is not inherently better if it preserves the wrong information architecture.

### Do not over-engineer

A philosophical concept does not justify a complex runtime.

Keep Astro static-first.

### Do not hallucinate brand tokens

Use canonical design assets/Figma.

If a value is unavailable, leave a named token or ask rather than inventing a brand ramp.

### Do not invent product maturity

Design direction is not engineering completion.

## 13. Pull request expectations

A rebuild PR should explain:

```text
Problem
Why the old homepage was insufficient
New narrative
Design-system relationship
Sections removed
Sections added
Product-artifact truthfulness
Motion strategy
Accessibility
Performance
i18n
SEO
Screenshots/video
Validation commands
Known follow-ups
```

## 14. Done definition

Do not call the rebuild done because it "looks premium."

Done means:

- philosophy is understandable;
- product is clear;
- one project feels like it travels through the page;
- Green Teal has narrative purpose;
- landing and Console feel related;
- automation is shown without black-box mystique;
- future direction is framed honestly;
- page works without spectacle;
- mobile/reduced-motion/accessibility are first-class;
- no old homepage section remains without a reason.

## 15. Final self-review prompt

Before finishing, the agent should ask itself:

> If the Sakala logo disappeared, would this still feel like a coherent product worldview rather than a generic PaaS template?

> If all animation disappeared, would the story still be powerful?

> If a beginner read only the text, would they understand Sakala?

> If an engineer inspected the artifacts, would they find them technically honest?

All four should be yes.
