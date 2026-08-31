# Sakala Landing Content Architecture

> Homepage is a gateway into Sakala, not a storage place for all Sakala knowledge.

## 1. Principle

The project already has rich philosophy, architecture, roadmap, governance, Explore, Learn, and engineering documentation.

Do not compress all of it into the homepage.

Use progressive disclosure:

```text
Homepage
→ understand the idea

Product / Philosophy
→ understand the worldview

Docs
→ learn how to use/build it

Roadmap
→ understand direction

GitHub
→ inspect and contribute
```

## 2. Homepage responsibilities

Homepage must answer:

```text
Why does Sakala exist?
What does it do?
How does it behave differently?
What can a living project become?
Why is it open?
What can I do next?
```

Homepage does not need to fully answer:

```text
How does Agent polling work?
What are all future product pillars?
What is every roadmap horizon?
What does every persona need?
What is the complete repository topology?
What are all governance roles?
```

## 3. Recommended homepage content

```text
Possibility
Distance
Threshold
Manifestation
Clarity
Life / Continuation
Open / Human
Final question
```

Status/maturity disclosure should remain visible, but it does not need to dominate the emotional opening.

A concise status indicator or development note can appear near primary product proof or navigation.

## 4. Dedicated content surfaces

### `/philosophy` or equivalent

- full seven Sakala principles;
- manifesto;
- why "Manifesting Code into Reality";
- human-centered philosophy.

### `/product` or equivalent

- current capabilities;
- Create / Manifest / Operate overview;
- Explore and Learn direction with clear status;
- plain product explanation.

### `/roadmap`

- product/design/engineering direction;
- validation gates;
- explicit "directional, not promise" framing.

### `/open-source` or project/about page

- governance;
- stewardship;
- GMEDIA sponsor framing;
- license;
- contributing;
- architecture transparency;
- repositories.

### `/docs`

User-facing documentation.

### `/docs/teknis`

Technical/runtime/architecture documentation.

Preserve existing route strategy if already implemented unless the rebuild explicitly changes it.

## 5. Explore and Learn on homepage

These belong after manifestation.

They should appear as consequences of a project becoming alive.

Do not present:

```text
Explore
Learn
Workspace
Managed DB
Router
CLI
...
```

as a feature grid.

Instead:

```text
Live project
→ can be shared
→ can be learned from
→ may become a template
→ may help a new creator
```

Then link deeper.

## 6. Persona content

Avoid a six-card persona block unless research proves it is needed.

Use human outcomes inside the story.

Examples:

```text
Student:
"Here is my source. Here is the running application."

Mentor:
open source + open live app

Creator:
repository → demo → showcase → template
```

Deeper use-case pages may expand these later.

## 7. Roadmap content

Homepage should not list Horizon A–F.

At most show directional continuation:

```text
Manifest
→ Operate
→ Explore
→ Learn
→ Grow
```

with status labels where useful.

Link to the full roadmap.

## 8. FAQ

FAQ is not a dumping ground.

Answer concerns near the relevant decision:

- black box → Clarity;
- product maturity → status disclosure;
- ownership/governance → Open section;
- Learn boundary → deeper Learn page.

Keep FAQ only for genuinely residual questions.

## 9. Open-source and sponsor language

Canonical framing:

```text
Sakala
→ open-source project stewarded by Sakala Maintainers

GMEDIA
→ Founding Sponsor & Infrastructure Supporter
```

Sponsor branding must not overpower Sakala project identity.

## 10. Localization

Indonesian is default.

English should be authored, not mechanically translated.

The narrative architecture stays equivalent while wording may differ naturally.

## 11. SEO and clarity

Philosophical headlines do not replace descriptive metadata.

Page title, description, structured data, and at least one clear on-page sentence should explicitly communicate that Sakala is an open-source deployment/developer platform.

Beautiful ambiguity is not an SEO strategy.

## 12. Content deletion test

Before keeping a section ask:

> If this section disappeared, would a first-time visitor lose a critical part of the Sakala story?

If no, move it deeper.

Shorter does not mean shallower.

The goal is **high meaning per section**.
