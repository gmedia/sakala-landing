# Sakala Landing — Creative Direction Package

> Status: proposed source of truth for the next major `sakala-landing` rebuild  
> Scope: public landing experience, not Sakala Console product UI  
> Project: Sakala  
> Tagline: **Manifesting Code into Reality.**

This package turns Sakala's product philosophy into a concrete landing-page direction that can be executed by humans or AI coding agents.

## Why this package exists

The current landing already contains many correct ideas, but it presents too much of Sakala as sections of information. The next rebuild should make visitors **experience** the central idea:

```text
Possibility
→ Presence
→ Continuation
```

The landing should tell **the life of a software project**:

```text
Idea
→ Source
→ Repository
→ Sakala
→ Manifest
→ Live Application
→ Share / Learn / Improve
→ Template / Inspiration
→ New Project
```

The homepage is not a compressed PRD, architecture document, roadmap, or feature matrix.

It is the first encounter with Sakala's worldview.

## Creative direction

Internal concept:

```text
THE LIFE OF A PROJECT
```

Philosophical arc:

```text
Possibility → Presence → Continuation
```

Signature visual metaphor:

```text
The Threshold
Source → Sakala → Reality
```

Emotional refrain:

```text
"I built this."
      ↓
"Here it is."
```

Primary visual motif:

```text
The Green Line of Life
```

## Source-of-truth order for landing work

Read in this order:

```text
Project-level Sakala docs
1. PHILOSOPHY
2. VISION
3. PRD
4. MVP
5. DESIGN_STRATEGY
6. GOVERNANCE
7. FEATURE_EXPLORE / FEATURE_EDUCATION where relevant

Landing creative package
8. docs/landing/LANDING_PHILOSOPHY.md
9. docs/landing/NARRATIVE_ARCHITECTURE.md
10. docs/landing/VOICE_AND_LANGUAGE.md
11. docs/landing/ART_DIRECTION.md
12. docs/landing/MOTION_LANGUAGE.md
13. docs/landing/CONTENT_ARCHITECTURE.md
14. docs/landing/PRODUCT_ARTIFACTS.md
15. docs/landing/IMPLEMENTATION_REQUIREMENTS.md
16. docs/landing/AI_AGENT_PLAYBOOK.md
17. docs/landing/REFERENCE_NOTES.md

Repository technical references
18. docs/PROJECT_SEO_AUDIT.md
19. docs/PROJECT_ASTRO_FEATURES.md
20. ARCHITECTURE.md
```

## Superseded local direction

For the next homepage rebuild, this package supersedes the **creative and homepage-structure direction** in:

```text
docs/archive/PROJECT_DESIGN_CONTEXT.md
docs/archive/PROJECT_LANDING_REBUILD_PLAN.md
```

Those documents may still contain useful historical or technical notes, but they must not override this package on:

- homepage narrative;
- section order;
- visual storytelling;
- art direction;
- motion;
- homepage content hierarchy;
- product-artifact strategy.

`PROJECT_SEO_AUDIT.md` and `PROJECT_ASTRO_FEATURES.md` remain technical references unless they conflict with newer architecture or product decisions.

## Non-negotiable idea

The landing does **not** introduce a new Sakala brand.

It expands the existing Sakala Design System into an expressive storytelling surface.

```text
Console
→ shows how Sakala is used.

Landing
→ shows why Sakala exists.

Both
→ must unmistakably feel like Sakala.
```

## Package files

| File                             | Purpose                                                        |
| -------------------------------- | -------------------------------------------------------------- |
| `LANDING_PHILOSOPHY.md`          | why the landing exists and its conceptual thesis               |
| `NARRATIVE_ARCHITECTURE.md`      | story arc and chapter-by-chapter visitor journey               |
| `VOICE_AND_LANGUAGE.md`          | copy voice, vocabulary, bilingual rules, anti-hype rules       |
| `ART_DIRECTION.md`               | visual identity, color meaning, typography, composition        |
| `MOTION_LANGUAGE.md`             | motion grammar, scroll behavior, accessibility                 |
| `CONTENT_ARCHITECTURE.md`        | what belongs on homepage vs deeper pages                       |
| `PRODUCT_ARTIFACTS.md`           | rules for source, deployment, browser, lineage visuals         |
| `IMPLEMENTATION_REQUIREMENTS.md` | Astro/static/performance/accessibility engineering constraints |
| `AI_AGENT_PLAYBOOK.md`           | exact workflow for an AI agent executing the rebuild           |
| `REFERENCE_NOTES.md`             | research references and what to learn without copying          |

## Success condition

After scrolling the homepage, a visitor should be able to explain Sakala without memorizing a feature list:

> Sakala helps a software project move from source code into something that is actually alive and reachable, while keeping the process understandable. Once a project is alive, it can be shared, learned from, and become the beginning of new work.

If the page is visually beautiful but this idea is not clear, the rebuild failed.
