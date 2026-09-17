---
title: "Sakala Learn"
description: "Classroom, assignment, and internship workflows built from generic primitives. Not an LMS."
track: proyek
section: rencana
order: 11
lang: en
canonical: true
---

# Sakala Learn

> **Status:** Future product pillar  
> **Principle:** deployment learning, not LMS

## 1. Product Thesis

Software education often stops at source code.

Sakala Learn focuses on the next step:

```text
Source
→ Deployment
→ Live Application
→ Review
```

A student should be able to say:

```text
Here is my source.
Here is my running application.
```

## 2. Boundary

Sakala should not own:

- attendance;
- curriculum;
- lecture material;
- quiz;
- exam;
- full grading;
- student administration.

Those belong to LMS/SIS products.

Sakala may integrate with them later.

## 3. Core Objects

Potential domain:

```text
Workspace
└── Classroom / Program
    ├── Instructors / Mentors
    ├── Participants
    ├── Assignments
    └── Projects / Submissions
```

Assignment may include:

- title;
- description;
- starter template;
- repository requirement;
- resource policy;
- required service;
- deadline;
- deployment requirement;
- showcase permission.

## 4. Student Flow

```text
Join
→ Open Assignment
→ Use Template / Connect Repo
→ Develop
→ Deploy
→ Fix Failures
→ Submit
→ Optional Showcase
```

## 5. Instructor Flow

```text
Create Classroom
→ Create Assignment
→ Choose Template
→ Invite Participants
→ Observe Deployment Status
→ Open Source
→ Open Live App
→ Review
```

Overview example:

```text
24 Participants

18 Healthy
 3 Build Failed
 2 In Progress
 1 Not Started
```

## 6. Internship / PKL

Do not create a separate hardcoded "Internship engine".

Compose generic primitives:

```text
Workspace
+ Collection
+ Template
+ Assignment
+ Showcase
```

Example:

```text
GMEDIA Internship
```

Output:

- live project;
- source;
- creator attribution;
- program collection;
- optional featured status;
- optional template candidate.

## 7. Resource Policy

Education can eventually define:

```text
CPU
Memory
Max Projects
Allowed Services
Expiration
Always-on policy
```

This makes infrastructure predictable and teaches realistic constraints.

## 8. Why This Matters

Sakala becomes a bridge between:

```text
learning to code
```

and:

```text
learning to ship software
```

That is distinct educational value without turning Sakala into an LMS.
