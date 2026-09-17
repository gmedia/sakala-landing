---
title: "Governance"
description: "Stewardship, the sponsor boundary, decision domains, team shape, GitHub teams, and working culture."
track: proyek
section: kerjasama
order: 13
lang: en
canonical: true
---

# Governance

## 1. Stewardship

Sakala is stewarded by:

```text
Sakala Maintainers
```

PT Media Sarana Data / GMEDIA is recognized as:

```text
Founding Sponsor & Infrastructure Supporter
```

This relationship supports infrastructure, experimentation, pilot access, and project growth without redefining Sakala as a closed company product.

People who build Sakala are recognized through each repository's contributor policy (`CONTRIBUTORS.md`): a name is listed after the contribution is real and the person agrees, without hierarchy or headcount. This document describes how decisions are made, not who holds them.

## 2. Open-source Principle

Sakala aims for:

- public source;
- public issue/contribution path;
- documented decisions;
- Apache License 2.0;
- transparent technical direction;
- healthy contributor attribution.

## 3. Decision Domains

### Product

Maintainers + product/design discussion.

### Architecture

Maintainer-led with ADR for major boundary changes.

### Implementation

Owning squad within established architecture.

### Security

Maintainer/security review can block release.

### Community / Moderation

Documented rules, auditability, appeal/review path where practical.

## 4. GitHub Teams

Suggested:

```text
sakala-maintainers
sakala-design
sakala-frontend
sakala-backend
sakala-runtime
```

Permissions:

```text
Primary repo
→ Write

Cross-repo
→ Read default
→ Triage where issue/PR management is needed

Maintainer
→ Maintain/Admin only where necessary
```

`main` remains protected.

## 5. Internal vs Public Planning

Repositories:

```text
Public
```

Internal internship/execution board:

```text
Private
```

A public roadmap may be maintained separately later.

Reason:

- roadmap transparency can be public;
- raw sprint blockers, mentoring notes, capacity, and sensitive runtime details do not need to be.

## 6. Working Culture

```text
Santai, tetapi bertanggung jawab.
Akrab, tetapi tetap ada batas.
Boleh belum bisa, tetapi wajib komunikatif.
```

Architecture principle:

> Build systems that allow the team to work, instead of forcing one lead to manually control everything.

## 7. Sponsorship Language

Preferred:

> Sakala adalah project deployment open-source yang diinisiasi oleh Sakala Maintainers dan didukung oleh GMEDIA sebagai founding sponsor dan infrastructure supporter.

Avoid ownership claims that contradict this stewardship model.
