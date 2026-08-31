# Sakala Landing Narrative Architecture

> Homepage model: **The Life of a Project**  
> Arc: **Possibility → Presence → Continuation**

## 1. Narrative rule

The homepage is not organized around departments or feature categories.

Avoid:

```text
Hero
Features
Benefits
Personas
Roadmap
Integrations
FAQ
CTA
```

Instead organize around a change in the visitor's understanding.

Every chapter must answer:

1. What does the visitor believe before this chapter?
2. What does the chapter reveal?
3. What does the visitor understand after it?
4. What visual evidence carries that idea?

## 2. Three-act structure

```text
ACT I — POSSIBILITY
A project exists, but only as potential.

ACT II — PRESENCE
Sakala helps it become alive and reachable.

ACT III — CONTINUATION
A living work can be shared, learned from, and continued.
```

## 3. Recommended homepage chapters

### Chapter 01 — Possibility

**Visitor question**

> What is a project before anyone can experience it?

**Primary idea**

> Setiap karya bermula sebagai kemungkinan.

**Artifact**

A real-looking but clearly illustrative repository/source artifact.

```text
karya/
├── src/
├── package.json
├── README.md
└── ...
```

**Visual state**

- spacious;
- neutral;
- low chroma;
- Green Teal is absent or very restrained;
- one clear focal object.

Do not dump product features or architecture here.

### Chapter 02 — Distance

**Visitor question**

> If the code works, what is still missing?

**Primary idea**

> Tidak semua yang selesai dibuat, selesai diwujudkan.

Supporting observations:

> Berjalan di laptop bukan berarti dapat dijangkau.

> Tersimpan di repository bukan berarti telah hidup.

**Artifact**

The same project at:

```text
localhost:5173
```

Optional refrain:

```text
"I built this."
```

The project is incomplete, not broken.

### Chapter 03 — The Threshold

**Visitor question**

> Where does Sakala enter the story?

**Primary idea**

> Di antara kemungkinan dan wujud, ada sebuah perjalanan.

Then reveal a plain explanation:

> Sakala membantu source dari repository menjadi aplikasi yang dapat berjalan, dibuka, dan dibagikan.

This plain sentence is a clarity anchor.

**Artifact**

```text
SOURCE
  ↓
SAKALA
  ↓
PRESENCE
```

The real Sakala mark may participate in the transformation.

Green Teal becomes visibly meaningful here.

### Chapter 04 — Manifestation

**Visitor question**

> What does Sakala actually do?

**Primary idea**

> Wujud bukan hanya build yang berhasil. Perjalanan harus sampai dapat dijangkau.

**Artifact**

```text
Repository
↓
Analyze
↓
Build
↓
Start
↓
Health
↓
Reach
```

Then reveal:

```text
project.run.sakala.dev
```

and a browser/live application representation.

This is the main product-proof chapter.

Emotional transition:

```text
"I built this."
      ↓
"Here it is."
```

### Chapter 05 — Clarity

**Visitor question**

> Is all this automation a black box?

**Primary headline**

> Sederhana tidak harus berarti tersembunyi.

Secondary line:

> Magic boleh terjadi. Misteri tidak harus.

**Artifact**

```text
Repository     ✓
Build          ✓
Start          ✓
Health Check   ×
```

Then:

```text
Application started,
but did not respond on the expected port.
```

Possible checks:

```text
bind address
expected port
runtime logs
```

Show `Terang`, not a generic "logs feature."

### Chapter 06 — Life

**Visitor question**

> Once the application is live, is Sakala finished?

**Primary headline**

> Deployment bukan akhir perjalanan.

Then:

> Karya yang hidup dapat melahirkan karya berikutnya.

**Artifact**

```text
Live Application
      │
      ├── Open
      ├── Share
      ├── Learn
      └── Improve
              │
           Template
              │
          New Project
```

Explore, templates, attribution, and learning appear as continuations, not a feature dump.

Future capabilities must be labeled as direction/future.

### Chapter 07 — Open / Human / Continuation

Return from system to people.

**Primary idea**

> Teknologi adalah alat. Yang penting adalah apa yang akhirnya dapat diwujudkan manusia dengannya.

Open-source proof:

```text
Source         Public
Architecture   Documented
Decisions      Documented
License        Apache-2.0
Contribute     Open
```

Sponsor framing remains factual and secondary.

End quietly:

# **Apa yang akan kamu wujudkan?**

Supporting line:

> Setiap karya bermula sebagai kemungkinan.

Actions must match actual product maturity.

## 4. One Project, One Journey

The strongest homepage follows **one project** through all chapters.

The same object evolves:

```text
file tree
→ localhost
→ repository
→ deployment
→ public URL
→ live project
→ showcase/template lineage
```

Do not create a disconnected illustration for every section.

The project may be fictional, but:

- use a neutral project name;
- do not imply it is a customer;
- do not invent usage metrics;
- do not imply future capabilities are already live.

## 5. One idea per viewport

Prefer:

```text
one idea
one artifact
one transition
```

over:

```text
headline
subheadline
3 cards
logo strip
diagram
2 buttons
floating decoration
```

## 6. Progressive technical depth

Use:

```text
Human observation
↓
Simple system model
↓
Product artifact
↓
Technical detail on demand
```

Do not begin with BuildKit, Railpack, Docker, Caddy, AgentCommand, or Control Plane.

## 7. CTA architecture

CTA priority follows reality.

Pre-public-service state:

```text
Primary:
Explore Sakala
Read Documentation

Secondary:
GitHub
Read Philosophy
```

Only use `Deploy a Project` when the flow is genuinely available.

## 8. What homepage should not contain in full

Move deeper:

- full seven-principle explanation;
- full roadmap;
- every target persona;
- complete architecture;
- repository map;
- complete governance;
- long FAQ;
- every future pillar.

## 9. Narrative acceptance test

A homepage visitor should be able to answer:

1. What problem does Sakala care about?
2. What does Sakala do?
3. How is it different from a black-box deploy button?
4. Why does deployment lead into Explore/Learn?
5. Why is Sakala open source?
6. What can I do next?

If the answer is twenty feature names instead of one coherent idea, the homepage is doing too much.
