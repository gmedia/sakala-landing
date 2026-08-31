# Sakala Landing Art Direction

> **Same identity. Different expression.**

## 1. Core decision

The landing must not create a second Sakala brand.

Use the existing Sakala Design System used by product/UI design.

Canonical visual anchors from the supplied Sakala style guide:

```text
Brand / Green Teal
#0F766E

Secondary / Burnt Orange
#C2670E

Black / Eerie Black
#1E1E1D
```

Typography is a pair, not a single face:

```text
Brand / Display / Heading   Montserrat
Body / Reading / Long-form  Inter
Mono / Technical artifact   system monospace
```

Inter is an intentional supporting typeface for reading, not a second brand.

Use the real Figma/design-system ramps for tints and shades.

Do not reconstruct the whole ramp by guessing from screenshots.

### Reconciliation status

The repository previously carried conflicting brand and typography assumptions.

The v2 rebuild reconciled them with the canonical Sakala system documented
above. Do not reintroduce a second system alongside it.

## 2. Relationship with Console

```text
                    SAKALA

           ┌──────────┴──────────┐
           │                     │
        LANDING               CONSOLE

       expressive             operational
       narrative              functional
       spacious               denser
       cinematic restraint    task-oriented
       philosophical copy     operational copy

           └──── SAME DNA ──────┘
```

Landing and Console should share:

- logo/mark;
- Green Teal identity;
- core typography;
- semantic status logic;
- border/radius family where appropriate;
- technical artifact grammar;
- accessibility behavior;
- overall sense of precision.

They may differ in:

- scale;
- whitespace;
- composition;
- pacing;
- motion;
- amount of narrative copy.

## 3. Art-direction name

Internal direction:

# **Quiet Technical Storytelling**

Three qualities:

### Quiet

The page is confident enough to leave space.

It does not fill every viewport with cards, gradients, badges, and motion.

### Technical

Real software artifacts are the visual language:

- repository;
- code/file tree;
- deployment state;
- logs;
- browser;
- domain;
- project lineage.

### Storytelling

Artifacts change as the project changes.

The visual system follows one project's life rather than presenting a catalog of unrelated illustrations.

## 4. Color semantics

### Green Teal — manifestation / life

Green Teal represents:

```text
Sakala
transformation
presence
life
growth
connection
```

Use it with purpose.

A recommended narrative progression:

```text
Possibility
→ mostly neutral

Threshold
→ Green Teal enters

Manifestation
→ Green Teal guides progress

Presence
→ Green Teal becomes confident

Continuation
→ Green line branches/grows
```

Do not turn the entire page green.

Meaning requires contrast.

### Burnt Orange — human spark / warmth

Use sparingly.

Possible meanings:

```text
human intention
idea
attention
warmth
a point of transition
```

Recommended visual presence is small relative to Green Teal.

It is not a second primary color.

It must not compete with semantic warning colors.

### Eerie Black — technical depth

Useful for:

- source/code surfaces;
- open-source/engineering section;
- terminal-like artifacts;
- strong text;
- visual anchors.

Avoid turning the entire page into a dark developer-tool clone.

### Neutral space — possibility / silence

White and official neutral surfaces create:

```text
space
calm
unfinished possibility
readability
```

Do not use random beige/paper styling if it no longer belongs to the canonical Sakala system.

## 5. Green is not an eco claim

Sakala may feel alive, fresh, growing, and healthy.

Do not imply environmental sustainability unless there is a real documented claim.

Avoid:

- leaves;
- globe/planet motifs;
- solar/nature imagery;
- lime-green eco gradients;
- "green cloud" claims without evidence.

The visual identity is technical, not an environmental campaign.

## 6. Typography

Montserrat carries brand, display, and headings. Inter carries body and
long-form reading. Technical artifacts use system monospace.

Inter is an intentional supporting typeface chosen for reading comfort at
length. It is not a second brand, and it never appears in display roles.

Do not introduce an editorial serif merely to make the site "philosophical."

Depth comes from:

- wording;
- hierarchy;
- whitespace;
- line breaks;
- pacing;
- composition.

### Landing extension

The application design system may have a smaller display ceiling.

The landing may introduce larger **responsive narrative display tokens** while preserving Montserrat.

Example conceptual scale:

```text
Narrative XL
clamp(...) around 72–96px desktop

Narrative L
clamp(...) around 56–80px desktop

Existing Display / H1 / H2
continue for normal page hierarchy
```

Do not hardcode these values from this document without testing 320px–wide layouts.

### Monospace

Use a system/project-approved monospace only for:

- domain names;
- logs;
- deployment statuses;
- file trees;
- commit identifiers;
- technical labels.

Do not write body copy in monospace.

## 7. Composition

Prefer:

```text
one large thought
+
one artifact
+
large breathing room
```

over:

```text
headline
+
six cards
+
four icons
+
three badges
+
decorative gradient
```

### Recommended composition qualities

- asymmetric when it helps the story;
- clear grid;
- large margins;
- disciplined alignment;
- technical labels used as detail, not decoration;
- occasional full-width transition moments;
- restrained dark anchors.

## 8. Primary visual motif — Green Line of Life

A thin Green Teal path can follow the project through the page.

Concept:

```text
repository
    │
    │
    ● analyze
    │
    ● build
    │
    ● health
    │
    ● live
    │
    ├── showcase
    ├── learn
    └── template
            │
        new project
```

The line may:

- begin faint;
- gain presence at Sakala;
- mark state transitions;
- branch during continuation.

It should remain subtle.

Do not turn it into a glowing sci-fi energy beam.

## 9. Product artifacts are the illustrations

Primary visual material:

```text
Source Artifact
Deployment Artifact
Living Browser Artifact
Failure/Clarity Artifact
Project Lineage Artifact
```

Avoid generic:

- cloud illustrations;
- isometric server farms;
- abstract 3D shapes;
- floating cards;
- random icons;
- stock developer imagery.

## 10. Logo use

The Sakala mark may become part of the Threshold interaction.

Rules:

- use actual logo geometry;
- do not distort the mark beyond recognition;
- do not invent logo symbolism that contradicts canonical philosophy;
- transformation around the mark should remain readable without animation.

## 11. Dark sections

Dark surfaces can create strong chapter boundaries.

Recommended candidates:

- technical/open-source proof;
- source/code moments;
- one dramatic transition.

Do not automatically make hero + CTA + footer dark because an older landing did so.

The new narrative decides surface changes.

## 12. What to avoid

Do not become:

### Vercel imitation

```text
black/white everything
giant neutral sans
grid because developer
```

### Linear imitation

```text
dark gradient everywhere
glow everywhere
```

### Awwwards experiment

```text
cursor gimmicks
WebGL with no meaning
scroll hijacking
3D decoration
```

### Generic SaaS

```text
bento feature grid as homepage architecture
gradient blobs
logo clouds before value is understood
```

### Eco startup

```text
leaves
earth
greenwashing visual language
```

## 13. Visual acceptance test

Remove the logo.

Does the page still feel like a coherent Sakala experience because of:

- Green Teal behavior;
- Montserrat display paired with Inter reading;
- technical artifacts;
- status grammar;
- Green Line;
- transformation narrative?

Then remove all motion.

Does the story still make sense?

If not, the art direction is too dependent on spectacle.
