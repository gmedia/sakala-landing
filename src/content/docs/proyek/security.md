---
title: "Security Principles"
description: "The project security baseline: privilege boundary, agent authentication, secrets, repository credentials, and reporting."
track: proyek
section: sistem
order: 7
lang: en
canonical: true
---

# Security Principles

> This is a project security baseline, not a complete production security program.

## 1. Privilege Boundary

Canonical rule:

```text
Sakala API must never access the Docker socket.
```

Privileged runtime operations belong to Sakala Agent.

## 2. Agent Authentication

Agent API requires machine authentication.

Baseline:

```text
Authorization: Bearer <agent-token>
X-Agent-Id: <agent-id>
```

Store token hash on control plane.

Support rotation/revocation.

## 3. Secrets

- encrypt stored secret values;
- do not return plaintext by default;
- redact logs;
- never embed credentials in user-visible command output;
- avoid credentials in process arguments when possible;
- clean temporary repository credentials.

## 4. Repository Credentials

Public repo:

```text
no credential
```

Future private GitHub repo:

```text
GitHub App
→ short-lived installation token
```

Avoid long-lived user PAT as platform default.

## 5. Runtime Isolation

At minimum:

- CPU limit;
- memory limit;
- PID limit where available;
- build/start timeout;
- localhost port binding;
- controlled network policy later;
- filesystem/workspace isolation;
- cleanup.

Containers are not assumed to be a perfect hostile multi-tenant security boundary. Stronger isolation may be researched as usage expands.

## 6. Routing

Before Caddy activation:

```text
validate hostname
validate upstream
atomic write
caddy validate
reload
```

Agent sudo permission must be narrowly scoped.

## 7. Webhooks

GitHub webhook:

- verify signature;
- deduplicate delivery;
- validate repository/branch mapping;
- do not trust payload blindly;
- do not perform long build inline in request.

## 8. Authorization

User access must be enforced by backend policies.

Future workspace role must not rely only on hidden frontend controls.

## 9. Logging

Never log:

- session cookie;
- auth header;
- secrets;
- installation token;
- database password;
- raw `.env`.

Security-related events should have audit context without leaking secret material.

## 10. Supply Chain

Recommended baseline:

- pinned release versions;
- checksums for distributed binaries;
- dependency scanning;
- reproducible or documented builds where practical;
- signed releases may be added later.

## 11. Self-host Installer

Future installer must be:

- inspectable;
- version-pinned;
- checksum verified;
- explicit about privileged operations;
- idempotent where practical;
- accompanied by manual install docs.

## 12. Reporting

Until a dedicated private reporting channel is established, do not encourage publication of unpatched exploitable details in public issues.

A future public `SECURITY.md` should document the official contact and supported versions.
