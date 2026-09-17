---
title: Project Documents
description: Sakala's source of truth — philosophy, vision, PRD, MVP, architecture, ADRs, roadmap, and governance — published here, not in a separate repository.
track: proyek
section: hub
order: 0
lang: en
---

# Sakala Project Documents

This is Sakala's source of truth. The documents on this track are the
project's canonical documents: what is written here is a decision, and
changes here are reviewed by the maintainers. The other pages on this site
— [Philosophy](/en/filosofi), [Roadmap](/en/roadmap),
[Technical Documentation](/en/docs/teknis) — are more narrative adaptations
of these documents.

Documents are shown in the language they were written in and are
deliberately not translated, so that there is a single source. Some are in
Indonesian, some in English; each page says which.

## Order of authority

When two documents conflict, the one higher up wins.

```txt
PHILOSOPHY    why Sakala exists
VISION        what Sakala wants to become
PRD           the product capabilities it has and aims for
MVP           what must actually be built now
ARCHITECTURE  how the system boundaries work
ADR           why the major technical decisions were made
ROADMAP       development order and validation gates
DESIGN_STRATEGY, FEATURE_*, PLATFORM_OPERATIONS
GLOSSARY      shared domain language
```

Per-repository engineering documents (`ARCHITECTURE.md`, `AGENTS.md`,
READMEs) still exist and defer to the documents on this track.

## Working principle

```txt
Think broad.
Design ahead.
Build narrow.
Validate early.
Expand deliberately.
```

And for the product:

```txt
Code
→ Made real
→ Alive
→ Shared
→ Learned from
→ Gives rise to the next work
```

## Changing a document here

A change to a canonical document is a project decision, not an edit.
Propose it through a pull request to this site's repository; the
`src/content/docs/proyek/` path is reviewed by the Sakala Maintainers.
Architecture changes that move a boundary are recorded as a new ADR, not
only as a changed sentence in `ARCHITECTURE`.

Documentation baseline: 2026-08-15, moved to this site on 2026-09-17.
