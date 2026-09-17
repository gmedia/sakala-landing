---
title: "Sakala Explore"
description: "Templates, showcase, creator profiles, collections, and project lineage as a product pillar, not a social network."
track: proyek
section: rencana
order: 10
lang: en
canonical: true
---

# Sakala Explore

> **Product Pillar:** Explore & Ecosystem  
> **Direction:** differentiation candidate

## 1. Why Explore Exists

Deployment answers:

> How does my code become a living application?

Explore answers:

> What happens after a work becomes real?

Sakala Explore allows projects to:

- be seen;
- be attributed to creators;
- inspire others;
- become templates;
- become part of collections;
- continue living after class/internship/project completion.

## 2. Information Architecture

```text
Explore
├── Projects
├── Templates
├── Creators
└── Collections
```

Possible public routes:

```text
/explore
/projects
/templates
/@username
/collections/:slug
```

Exact URL scheme remains a design/SEO decision.

## 3. Public Project Showcase

Project listing is opt-in.

Suggested visibility:

```text
Unlisted
Public Showcase
```

A runtime URL being public does not automatically mean it is discoverable in Explore.

Showcase metadata:

- title;
- description;
- creator;
- cover;
- category;
- tags;
- stack;
- live URL;
- source URL;
- license;
- collection;
- created/deployed metadata;
- template relation.

Actions:

```text
Open App
View Source
Use as Starting Point   future / conditional
```

## 4. Creator Profile

Creator is portfolio-first.

Show:

- name;
- avatar;
- short bio/role optional;
- public projects;
- templates;
- featured work;
- collections.

Do not make these core:

- follower count;
- DM;
- generic post feed;
- social graph.

Creator identity should be earned primarily through artifacts.

## 5. Templates

Template categories:

```text
Official
Community
Education
Organization
Starter
Application
Example
```

Template metadata:

```text
title
description
author
organization/collection
repository
demo
stack
category
tags
difficulty
variables
services
resource hint
license
verified status
cover
```

### Deploy

```text
Template
→ Configure
→ Create Project
→ Deploy
```

### Use Template

```text
Template
→ Create/Fork Repository
→ User edits source
→ Connect/Deploy later
```

The difference must be explicit in UX.

## 6. Template Lifecycle

```text
Project
→ Submit as Template
→ Automated Checks
→ Maintainer Review
→ Needs Changes / Approved
→ Published
→ Featured optional
```

Checks can eventually include:

- repository accessible;
- license present;
- README present;
- deployable;
- required variables declared;
- secrets absent;
- demo healthy;
- attribution valid.

## 7. Collections

Collection is a reusable organizational primitive.

Examples:

```text
Sakala Official Starters
GMEDIA Internship
SMKN 2 PKL Showcase
UTY Web Workshop
Jogja Dev Meetup
Community Picks
```

Collection fields:

- title;
- slug;
- owner/organization;
- description;
- cover;
- visibility;
- projects;
- templates;
- creators;
- date/program metadata optional.

This prevents hardcoding "internship feature" or "campus showcase" into platform internals.

## 8. Project Lineage

Future:

```text
Template A
├── Project B
├── Project C
└── Project D
```

Metadata candidates:

```text
derived_from_template_id
remixed_from_project_id
```

Potential UX:

```text
Based on Laravel API Starter
```

Purpose:

> Karya melahirkan karya.

## 9. Internship / PKL Loop

```text
Internship Assignment
→ Starter Template
→ Intern Project
→ Deploy
→ Mentor Review
→ Public Showcase
→ Candidate Template
→ Future Cohort
```

This gives intern output a life beyond presentation day.

## 10. Moderation

Admin needs:

- pending templates;
- needs changes;
- approved/rejected;
- reported project;
- featured candidate;
- collection review;
- abuse/IP/license concern.

Creator needs:

- submission status;
- feedback;
- edit/resubmit;
- remove listing.

## 11. Metrics

Useful:

- projects published;
- templates published;
- template deploy/use count;
- projects derived from templates;
- creators publishing;
- collection participation.

Avoid making social vanity metrics the product objective.

## 12. Design Scope Next

Recommended immediate UI/UX work:

```text
Explore Home
Showcase List
Showcase Detail
Template List
Template Detail
Creator Profile
Collection Detail
Publish Project
Submit Template
Moderation Status
```
