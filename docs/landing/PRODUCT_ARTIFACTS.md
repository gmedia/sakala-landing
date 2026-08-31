# Sakala Landing Product Artifacts

> Product artifacts are the illustrations.

## 1. Why artifacts

Sakala deals with abstract processes.

Generic illustrations make those processes feel more abstract.

Use familiar developer artifacts instead:

```text
repository
source tree
commit
deployment stage
log
health result
domain
browser
project lineage
```

## 2. One artifact family

All homepage artifacts should look like they belong to the same Sakala system.

Shared grammar:

- Montserrat for interface text where appropriate;
- project-approved monospace for technical labels;
- Sakala Green Teal;
- official neutral/border tokens;
- existing semantic status colors;
- real status wording;
- consistent radii/borders;
- accessible labels.

Do not create a marketing-only UI style unrelated to Console.

## 3. Source Artifact

Purpose:

> Show possibility.

May contain:

```text
project/
├── src/
├── package.json
├── README.md
└── ...
```

Optional metadata:

```text
main
commit abc123
```

Rules:

- simple;
- legible;
- not a fake GitHub screenshot;
- do not require syntax-highlighting spectacle.

## 4. Local Artifact

Purpose:

> Show the project works but remains local.

Example:

```text
http://localhost:5173
```

It can display a tiny application result.

Do not imply localhost is a failure.

It is a valid development state.

The tension is reach, not shame.

## 5. Deployment Artifact

Purpose:

> Show Purna and manifestation.

Canonical conceptual sequence:

```text
Repository
Analyze
Build
Start
Health
Reach
```

Use terminology compatible with actual Sakala deployment states.

Do not invent steps that contradict current product docs.

### Current vs future

If an artifact represents functionality not currently shipped, label it clearly.

A conceptual explanation is allowed.

A fake product screenshot implying availability is not.

## 6. Living Browser Artifact

Purpose:

> Prove presence.

It should contain:

```text
generated domain
healthy/reachable state
simple application result
```

Example domain pattern:

```text
<slug>.run.sakala.dev
```

Use a clearly illustrative slug.

Do not use a real third-party project without permission.

## 7. Clarity / Failure Artifact

Purpose:

> Show Terang.

Example:

```text
Repository    ✓
Build         ✓
Start         ✓
Health        ×
```

Then:

```text
Application started,
but did not respond on the expected port.
```

This artifact is not a dramatic error illustration.

It is a diagnostic tool.

Use real categories and terminology from Sakala when available.

## 8. Lineage Artifact

Purpose:

> Show continuation.

Concept:

```text
Live Project
   ├── Showcase
   ├── Learn
   └── Template
           ↓
       New Project
```

Do not make this look like a social graph.

No follower counts, likes, or generic feed mechanics.

Attribution should focus on work and creator.

## 9. Product proof vs concept illustration

Use three labels internally:

### Actual

Represents a currently working product state.

Can be shown directly.

### Design direction

Exists in approved product/design direction but is not necessarily implemented.

Must not be shown as a live shipped screenshot.

### Conceptual explanation

A diagram/artifact created to explain a principle.

It must visually read as explanation, not proof of production availability.

AI agents must classify an artifact before implementing it.

## 10. Console relationship

When real Console UI exists for the concept:

- reuse its component grammar;
- reuse status wording;
- reuse token semantics;
- simplify for landing only when necessary for comprehension.

Do not literally embed huge dashboard screenshots where a focused artifact communicates better.

## 11. No fake metrics

Never invent:

```text
12,432 deployments
99.99% uptime
20k developers
500 universities
10M requests
```

unless backed by current public evidence.

## 12. No fake testimonial

Do not invent a student, company, university, or creator quote.

Human scenarios may be illustrative but must not look like endorsements.

## 13. Responsive artifacts

Artifacts must remain understandable at 320px.

Prefer:

- vertical state lists;
- horizontally scrollable code only when necessary;
- shortened metadata;
- stacked lineage.

Do not shrink a desktop diagram until labels become unreadable.

## 14. Artifact accessibility

Every informative artifact needs an equivalent semantic description.

For diagrams:

- `figure`;
- meaningful `figcaption`;
- text alternative/order;
- status not communicated only by color.

For purely decorative technical texture:

```text
aria-hidden="true"
```

## 15. Artifact acceptance test

Ask:

- Does it explain something real?
- Is the terminology correct?
- Does it resemble Sakala, not a generic terminal?
- Could it mislead users about product maturity?
- Does it still work without animation?
- Can a beginner infer what changed?

If not, simplify or remove it.
