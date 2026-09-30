---
title: "Security Principles"
description: "The project security baseline: privilege boundary, workload isolation, secrets, credentials, abuse by users, personal data, logging, supply chain, and how to report a problem."
track: proyek
section: sistem
order: 7
lang: en
canonical: true
---

# Sakala Security Principles

> This is the project security baseline, not a complete production security
> programme. Repository-specific rules live in each repository's
> `SECURITY.md`; where they conflict with this page, this page wins and the
> repository file is corrected.

Sakala faces two kinds of threat, and they need different defences:

- **Attacks on Sakala** — someone tries to break the control plane, the agent,
  or another user's project.
- **Abuse through Sakala** — someone uses Sakala as intended, technically, to
  harm others: phishing pages, malware hosting, crypto mining, spam.

The first is an engineering problem. The second is an operations and policy
problem. Free hosting platforms that ignored the second closed their free
tiers (Heroku, 2022) or their hosting altogether (Glitch, 2025).

## 1. Privilege boundary

```text
Sakala API must never access the Docker socket.
```

Privileged runtime operations belong to the Sakala Agent
([ADR-004](/docs/proyek/adr)). The Console never talks to the agent or the
runtime directly.

## 2. Workload isolation

User code is untrusted code. Current measures:

- rootless Docker on runtime nodes;
- per-container memory, CPU, and PID limits, with node hard ceilings the agent
  enforces regardless of the requested profile;
- build, start, and command deadlines, with process-group termination;
- ports bound to localhost; only the runtime Caddy routes traffic in;
- labelled containers and workspace garbage collection.

Containers are not a sufficient boundary for hostile code.
[ADR-014](/docs/proyek/adr) records the target: user workloads on runtime
hosts that carry no control-plane service or database, running under gVisor.
It is a precondition for opening public registration (MVP gate).

Not yet in place, and required before public registration: an egress policy
for user containers (at minimum, no access to the app node, the cloud
metadata endpoint, or SMTP), and a separate isolation path for builds.

## 3. Agent authentication

```text
Authorization: Bearer <agent-token>
X-Agent-Id: agent-<uuid7>
```

The control plane stores only a hash of the token. Tokens are issued once at
provisioning and can be rotated or revoked by an admin. Nodes report a
protocol revision; the API schedules work only for revisions it supports.

## 4. Secrets

- encrypt stored secret values;
- never return plaintext by default;
- redact logs in both the agent and the API (defence in depth);
- never embed credentials in user-visible command output;
- avoid credentials in process arguments where possible;
- clean temporary repository credentials after use.

## 5. Repository credentials

Public repository: no credential.

Private GitHub repository: a GitHub App installation token with a short life,
leased by the API to the agent for a single command
([ADR-009](/docs/proyek/adr)). A long-lived personal access token is never the
platform default.

## 6. Abuse by users

### What is not allowed

The acceptable use policy lists it in full. The categories the platform
actively detects and removes are:

- phishing and credential harvesting;
- malware, command-and-control, and drive-by downloads;
- cryptocurrency mining and other compute resale;
- spam, open relays, and outbound scanning or attacks;
- content that is illegal in Indonesia.

### Controls

| Control                                        | Status                                                            |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| Account verification (email or GitHub)         | in place                                                          |
| Per-user project and deployment quotas         | in place                                                          |
| Rate limits on login, registration, OAuth, API | in place                                                          |
| Admin stop and suspend with reason and audit   | in place                                                          |
| Reserved slugs (`api`, `app`, `admin`, …)      | in place                                                          |
| Usage signals (for example repeated failures)  | in place                                                          |
| Idle sleep and build rate limit                | required before public registration ([ADR-015](/docs/proyek/adr)) |
| Egress policy for user containers              | required before public registration                               |
| Separate registrable domain for user content   | proposed ([ADR-016](/docs/proyek/adr))                            |
| Published abuse contact and takedown process   | required before public registration                               |

The takedown process, with target times, is owned by
[Platform Operations](/docs/proyek/platform-operations).

## 7. Personal data

The hosted service processes personal data of people in Indonesia — names,
email addresses, GitHub identities, IP addresses in logs — and is subject to
Indonesia's Personal Data Protection Law (UU PDP), fully in force since
17 October 2024. The baseline:

- collect only what the product uses; do not add tracking to the Console;
- publish a privacy notice that states what is collected, why, how long it is
  kept, and how to request access or deletion;
- keep deployment logs for a bounded period (7 days by default) and prune
  usage signals (30 days by default);
- allow a user to delete their account and projects;
- report a qualifying personal-data breach to affected users and the
  authority within 72 hours;
- for classes, treat the institution as the party that decides why student
  data is processed, and record that in the class agreement.

Self-host operators are responsible for the personal data on their own
installation.

## 8. Routing

Before a route becomes active:

```text
validate hostname → validate upstream → atomic write → caddy validate → reload
```

Runtime Caddy reads route files through a read-only mount and never receives
the Docker socket. Agent permissions on the host are narrowly scoped.

## 9. Webhooks

GitHub webhooks: verify the signature, deduplicate deliveries, validate the
repository and branch mapping, never trust the payload blindly, and never run
a build inside the request.

## 10. Authorization

Access is enforced by backend policies. A hidden button in the Console is not
access control. Future workspace and class roles follow the same rule.

## 11. Logging

Never log session cookies, auth headers, secrets, installation tokens,
database passwords, or raw `.env` content. Security-relevant events carry
audit context without secret material. Log lines, batches, and totals have
size bounds so a user cannot flood storage.

## 12. Supply chain

- application images are built in CI and pinned by digest in the production
  release; the production host never builds;
- agent binaries are installed from GitHub releases and verified against
  published checksums;
- dependencies are scanned, lockfiles are committed, and new dependencies are
  reviewed;
- signed releases may be added later.

## 13. Self-host installer

When it exists, the installer must be inspectable, version-pinned, checksum
verified, explicit about privileged operations, idempotent where practical,
and accompanied by manual installation docs. It enables gVisor by default and
documents what changes if an operator disables it.

## 14. Reporting

**Vulnerabilities.** Do not open a public issue for an unpatched
vulnerability. Report it privately through GitHub's private vulnerability
reporting on the affected repository. Maintainers enable that feature on every
Sakala repository and aim to acknowledge a report within three working days.

**Abuse.** A project hosted on Sakala that is used for phishing, malware, or
other abuse is reported to the abuse contact published on the site. Until that
contact is published, reports go through the same private vulnerability
channel. Publishing a monitored abuse contact is a precondition for public
registration.
