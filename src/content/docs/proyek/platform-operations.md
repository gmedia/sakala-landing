---
title: "Platform Operations"
description: "The maintainer-facing Platform Console: what exists today, platform health, runtime nodes, failure analytics, abuse handling with target times, moderation, product validation, and audit."
track: proyek
section: sistem
order: 8
lang: en
canonical: true
---

# Sakala Platform Operations

> Maintainer-facing product direction and operating procedures.

A normal admin dashboard implies CRUD. Sakala needs an operational surface
that answers:

- Is the platform healthy?
- Which deployments are failing, and why?
- Which nodes are saturated?
- Are users reaching their first deploy?
- Is anyone abusing the platform right now?
- What content needs moderation?
- Where is operator intervention required?

## 1. What exists today

As of 2026-10-01, in `sakala-api`:

| Capability                                                         | Where                                  |
| ------------------------------------------------------------------ | -------------------------------------- |
| Stop and suspend a project, with a reason, idempotency, audit      | admin project control                  |
| Runtime node control requests (drain and similar)                  | admin node control                     |
| Agent node registry, heartbeat, protocol revision, offline marking | agent API and scheduler                |
| Command assignment, lease, and expiry                              | scheduler, every minute                |
| Usage signals (for example repeated deployment failures)           | usage signal records, 30-day retention |
| Pilot validation metrics indexes                                   | database                               |
| User feedback                                                      | feedback endpoint, rate limited        |
| Audit events for sensitive actions                                 | audit table                            |

The Platform Console UI in `sakala-console` exposes part of this; the rest is
reachable through API endpoints and artisan commands.

## 2. Main areas

```text
Platform Overview · Users · Projects · Deployments · Runtime Nodes
Commands · Resources and Usage · Abuse Reports · Explore Moderation
Feedback · Announcements · Audit · Settings
```

## 3. Overview

- active users; projects; deployments in the last 24 hours and 7 days;
- deployment success rate and median duration;
- queue depth and failed commands;
- active workloads and runtime capacity;
- first-deploy activation (see PRD §13 for targets);
- open abuse reports and their age;
- feedback requiring attention.

## 4. Runtime nodes

Node detail: name, status (ready, degraded, draining, drained, maintenance),
agent version and protocol revision, last heartbeat, CPU, RAM, disk,
active and building workloads, queued and failed commands in 24 hours,
capabilities, labels, and later region.

Actions: drain, resume, remove, upgrade. Dangerous actions need confirmation
and an audit record.

## 5. Deployment failure analytics

Each failed deployment carries one category. The canonical list is the
`DeploymentFailureCategory` enum in `sakala-api`, mirrored in the
[Glossary](/docs/proyek/glossary):

```text
checkout · build · start · health · route · timeout · resource · node
scheduling · unknown
```

The agent reports finer failure codes (for example `runtime_disk_pressure`,
`runtime_cancelled`); they map onto these categories.

Show top failures, affected stacks, recent examples, and the trend. This is
product discovery data as much as operations data: a category that keeps
growing is a place where Sakala stops helping.

## 6. Abuse handling

This process is a precondition for public registration (MVP gate). Until the
dedicated abuse contact exists, reports arrive through the channel in
[Security §14](/docs/proyek/security).

### Sources

- reports to the abuse contact from users, security vendors, or registrars;
- usage signals (sustained CPU at the ceiling, unusual egress, repeated
  deployments of the same image across new accounts);
- browser and mail-filter warnings about a `run.sakala.dev` subdomain.

### Procedure and target times

| Step | What happens                                                                                         | Target                             |
| ---- | ---------------------------------------------------------------------------------------------------- | ---------------------------------- |
| 1    | Acknowledge the report and record it                                                                 | within 24 hours                    |
| 2    | Triage: confirm the content or behaviour; check for other projects by the same account               | within 24 hours of acknowledgement |
| 3    | Clear phishing, malware, or active attack: **suspend** the project and stop its route                | within 24 hours of the report      |
| 4    | Notify the owner with the reason and how to appeal                                                   | at suspension                      |
| 5    | Repeated or deliberate abuse: suspend the account and its projects                                   | at maintainer decision             |
| 6    | Appeal: another maintainer reviews; restore or confirm                                               | within 5 working days              |
| 7    | Record the outcome in the audit log; update detection rules if the case was not caught automatically | at close                           |

Suspension stops traffic and sleeps the workload; it does not delete data.
Deletion follows the retention rules in the privacy notice.

### Principles

- Act on evidence, not on popularity or complaints alone.
- A student who deployed something harmful by mistake is treated differently
  from someone who registered to abuse the platform. The appeal path exists
  for the first case.
- Never publish details that would help an abuser evade detection.

## 7. Product validation

Track:

- onboarding complete; first project; first analysis; first deploy;
- first healthy URL; redeploy; second project;
- requested feature categories from feedback.

The goal is to understand where Sakala stops helping. Targets are in the
[PRD §13](/docs/proyek/prd).

## 8. Explore moderation

Needed once Explore exists: pending templates, needs changes, featured
candidates, reported projects, collections, licence or source concerns.
Explore starts with curated collections, so early moderation is a maintainer
review rather than a public queue. Every decision leaves an audit trail and
feedback to the submitter.

## 9. Announcements

Maintenance, incidents, releases, and product announcements. Quota changes are
announced before they take effect (ADR-015). Notifications are not used for
marketing.

## 10. Audit

Audit sensitive actions: admin resource override, project delete, suspend and
restore, domain ownership change, node drain or remove, moderation decisions,
workspace or class role changes, security setting changes, and agent token
rotation or revocation.

## 11. Principle

The Platform Console is not a side admin panel. It is the maintainer's
instrument for keeping Sakala safe, understandable, and improvable.
