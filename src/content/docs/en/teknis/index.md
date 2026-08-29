---
title: Technical Documentation
description: A map of Sakala's architecture, privilege boundaries, runtime flow, and security model.
track: teknis
section: Start here
order: 1
lang: en
---

# Technical Documentation

This section is for people who want to understand **how Sakala is built**, whether to contribute, audit its technical decisions, or simply out of curiosity about how a deployment platform works.

If what you want is how to use Sakala, [Using Sakala](/en/docs) is the right place.

## What to know first

Sakala is made of several repositories with separated responsibilities. That separation is not about tidiness; it is a privilege boundary. Only one component may touch Docker and change routing.

One rule explains most of the architecture's shape:

```txt
The Sakala API must never access the Docker socket.
```

From that rule come the outbound command model, the split between control plane and data plane, and the division between deciding resources and enforcing them.

## Implementation status

The foundation can be exercised as a system, but it is not a hosted service. This documentation describes the agreed contracts and direction; it does not claim everything already runs in production.

Where something is still a plan, the relevant page says so.

## Going deeper

The full architecture documents, technical decisions, and roadmap live in the project repositories. The pages here are summaries kept in step with them.
