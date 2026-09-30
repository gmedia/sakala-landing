---
title: "Governance"
description: "Stewardship, the sponsor boundary, roles and how to become a maintainer, how decisions are made and disagreements resolved, sustainability, licences and design files, the Sakala name, and working culture."
track: proyek
section: kerjasama
order: 13
lang: en
canonical: true
---

# Governance

This document describes how decisions are made in Sakala and who may make
them. It does not list the people who hold each role; people are recognized
through each repository's contributor policy (`CONTRIBUTORS.md`) once their
contribution is real and they agree to be listed.

## 1. Stewardship

Sakala is stewarded by the **Sakala Maintainers**.

PT Media Sarana Data (GMEDIA) is the **Founding Sponsor and Infrastructure
Supporter**. The relationship supports infrastructure, experimentation, pilot
access, and project growth without redefining Sakala as a closed company
product.

Preferred wording:

> Sakala adalah project deployment open-source yang diinisiasi oleh Sakala
> Maintainers dan didukung oleh GMEDIA sebagai founding sponsor dan
> infrastructure supporter.

Avoid "Sakala by GMEDIA", "a GMEDIA product", or any ownership claim that
contradicts this model.

## 2. Open-source principles

- public source under the Apache License 2.0;
- a public path for issues and contributions;
- decisions documented in the canonical project documents and ADRs;
- a public roadmap stated as direction, not dates;
- contributor attribution that is honest and consented.

## 3. Roles

| Role              | Who                                                            | Can                                                                       |
| ----------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Contributor       | Anyone who opens an issue, reviews, writes docs, or sends a PR | Propose any change                                                        |
| Triager           | Contributor trusted to manage issues on a repository           | Label, close duplicates, request information                              |
| Committer         | Contributor with write access to one or more repositories      | Review and merge within their area, following CODEOWNERS                  |
| Maintainer        | Member of `sakala-maintainers`                                 | Merge anywhere, approve ADRs and canonical document changes, cut releases |
| Security reviewer | Maintainer or delegate named for security review               | Block a release on security grounds                                       |

### Becoming a maintainer

A committer becomes a maintainer when:

1. they have contributed consistently over at least three months, across
   code, review, or documentation;
2. they have shown judgement in reviews and in at least one design
   discussion;
3. an existing maintainer nominates them in a private maintainer discussion;
4. no maintainer objects within seven days.

Participation in the GMEDIA internship programme is neither required nor
sufficient; the same path applies to everyone.

A maintainer who has been inactive for six months moves to **emeritus** after
a private notice and can return by asking. Emeritus maintainers are thanked in
`CONTRIBUTORS.md`.

## 4. How decisions are made

| Domain                   | Decided by                                          | Recorded in                    |
| ------------------------ | --------------------------------------------------- | ------------------------------ |
| Product direction        | Maintainers, with product and design discussion     | VISION, PRD, ROADMAP           |
| Architecture boundaries  | Maintainers                                         | ADR                            |
| Implementation           | Committers owning the area, within the architecture | Pull requests                  |
| Security                 | Security reviewer; can block a release              | SECURITY, advisories           |
| Community and moderation | Maintainers, with an appeal path                    | PLATFORM_OPERATIONS, audit log |
| Canonical documents      | Maintainers (enforced by CODEOWNERS)                | This site's `proyek` track     |

**Default: lazy consensus.** A proposal (a pull request, an ADR, or a
discussion) that receives no substantive objection within five working days
from a maintainer is accepted. Silence is consent; it is not a veto.

**Exception: security and emergencies.** A security fix, an abuse takedown,
or an action needed to stop an ongoing incident does not wait for lazy
consensus. The maintainer or security reviewer acts, then records the action
and its reason within two working days so other maintainers can review it
after the fact.

**When maintainers disagree.** The discussion continues in public on the pull
request or ADR. If it does not converge within a further five working days,
any maintainer can call a vote among maintainers. A simple majority decides;
the project lead breaks a tie. The outcome and the dissent are recorded in the
ADR.

**What always needs an ADR.** Changes to the Console/API boundary, the agent
privilege boundary, authentication, the API–agent protocol, resource
ownership, routing, workload isolation, the licence, and repository topology.

## 5. Sponsor boundary

Sponsors support infrastructure, domains, development resources,
documentation, community programmes, education pilots, or long-term
maintenance.

Sponsors do not, by sponsorship alone, control:

- technical decisions;
- roadmap priority;
- licence changes;
- contributor rights;
- who becomes a maintainer.

**Hosted capacity and pricing.** GMEDIA provides the hosted runtime and may
offer capacity above the free quota as its own cloud service
([ADR-017](/docs/proyek/adr)). Whether to offer it, and at what price, is
GMEDIA's decision. The price does not buy
a Sakala licence, does not buy features unavailable to self-host users, and
does not move items on the roadmap. The free quota published for the hosted
service is a maintainer decision, taken with GMEDIA because GMEDIA bears its
cost.

A GMEDIA employee who is also a maintainer acts in the maintainer role under
the same rules as any other maintainer.

## 6. Sustainability

Sakala must survive a change in any single sponsor's plans. Other projects in
this space show what happens when it cannot: hosted education tools that
depended on one company's priorities closed within months (Replit Education in
2024, GitHub Classroom in 2026).

Commitments:

- **Self-host is a first-class path**, not an afterthought
  ([ADR-017](/docs/proyek/adr)). If the hosted service changes, users and
  institutions can keep running Sakala.
- **The hosted free quota is written down** and changes are announced in
  advance ([ADR-015](/docs/proyek/adr)).
- **If the hosted service is shut down as a planned decision** under the
  project's or the sponsor's control, users get at least 90 days' notice, an
  export of their project configuration, and redirects, where legally and
  technically possible. An incident, a legal order, or a sponsor's failure may
  make that notice impossible; in those cases users are told as early as the
  situation allows.
- **Funding sources are public.** Sponsors are listed in `SPONSORS.md` with
  what they provide. Additional sponsors, grants, or a fiscal host may be
  added; none may acquire control beyond §5.

## 7. Licences, design assets, and the Sakala name

| Material                                                                                                 | Terms today                                                  |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Source code and documentation in the Sakala repositories, including the canonical documents on this site | Apache License 2.0, as stated in each repository's `LICENSE` |
| Design files outside the repositories (the Figma design system and mockups)                              | Not yet under an open licence; see "Design files" below      |
| The name "Sakala", the Sakala logo and mark                                                              | Not licensed; governed by the rules below                    |

The Apache License 2.0 does not grant permission to use the project's trade
names or trademarks (section 6 of the licence). The rules below state how the
name and logo may be used.

### Design files

Design work made for Sakala is intended to be a contribution to the project,
on the same footing as code. Two things are still open and need agreement
with GMEDIA and the people who made the designs:

1. **Where the files live.** The working Figma file is hosted in the GMEDIA
   workspace. The target is a Figma team held in the name of the Sakala
   project, with more than one maintainer as owner, so the design outlives any
   single account or sponsor arrangement (§6).
2. **Which licence applies.** The target is Creative Commons Attribution 4.0
   (CC BY 4.0) for the design system and mockups, which lets anyone reuse them
   with credit. It applies only after the contributors of that work agree.

Until then, the design system is published through its textual summary on the
[Design System](/docs/teknis/sistem-desain) page, which is part of this
repository and therefore Apache 2.0, and screens are shared as exported frames
in the issue or pull request that discusses them.

### The name and logo

- Anyone may use the name to refer to Sakala, to say they run it, or to say
  their work is built for it.
- Anyone may show the unmodified logo to link to or talk about Sakala, for
  example in an article, a talk, or a list of tools.
- A modified distribution or a hosted service run by someone else must not
  present itself as the official Sakala or imply endorsement. "Powered by
  Sakala" is fine; "Sakala Cloud" by another party is not.
- Do not alter the logo, combine it with another mark, or use it as the
  logo of another product.
- Institutions that self-host may say "Sakala at <institution>".
- Questions go to the maintainers.

## 8. GitHub teams and permissions

```text
sakala-maintainers
sakala-design
sakala-frontend
sakala-backend
sakala-runtime
```

- Primary repository of a team: write.
- Other repositories: read by default; triage where issue management is
  needed.
- Maintain or admin: maintainers only, where necessary.
- `main` is protected on every repository.

## 9. Internal and public planning

Public: repositories, canonical documents, the roadmap, and decisions.

Private: the internship execution board, mentoring notes, individual capacity,
unfixed vulnerabilities, and operational details of production
infrastructure (hosts, addresses, credentials).

The reason: direction should be open so contributors know the standard;
people's development and the security of running systems should not be.

## 10. Code of conduct

Every Sakala repository must carry `CODE_OF_CONDUCT.md`; a repository that
has not added it yet is covered by the same code in the meantime. It applies to
repositories, discussions, events, and any space where people act on behalf of
Sakala. Reports go privately to the maintainers; a maintainer involved in a
report does not take part in handling it.

## 11. Working culture

```text
Santai, tetapi bertanggung jawab.
Akrab, tetapi tetap ada batas.
Boleh belum bisa, tetapi wajib komunikatif.
```

> Build systems that allow the team to work, instead of forcing one lead to
> manually control everything.
