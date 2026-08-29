---
title: Security
description: Privilege boundaries, secret handling, runtime isolation, and logging rules in Sakala.
track: teknis
section: System
order: 4
lang: en
---

# Security

This page is a **project security baseline**, not a complete production security programme. Sakala is still being built, and some of what follows is a rule being held rather than an audited system.

## Privilege boundary

One rule underpins everything else:

```txt
The Sakala API must never access the Docker socket.
```

All privileged runtime operations belong to the Agent. As a result, an HTTP request can never directly execute a command on the host, even if the API layer were compromised.

## Agent authentication

The Agent API uses machine authentication:

```txt
Authorization: Bearer <agent-token>
X-Agent-Id: <agent-id>
```

Tokens are stored hashed on the control plane, and must support rotation and revocation.

## Secrets

- Secret values are stored encrypted.
- Plaintext is not returned by default.
- Logs are redacted before being sent.
- Credentials never appear in user-visible command output.
- Credentials are kept out of process arguments where possible.
- Temporary repository credentials are cleaned up after use.

## Repository credentials

For public repositories, no credentials are used at all.

For private repositories later, the direction is a GitHub App with short-lived installation tokens. Long-lived personal access tokens are deliberately avoided as a platform default.

## Runtime isolation

The minimum enforced on user workloads:

- CPU limit;
- memory limit;
- process count limit where available;
- build and start timeouts;
- loopback port binding;
- filesystem and workspace isolation;
- cleanup afterwards.

Containers are **not assumed** to be a perfect multi-tenant security boundary against hostile tenants. Stronger isolation will be researched as usage grows. Saying this openly is more useful than offering false comfort.

## Routing

Before a route is activated, the order stays:

```txt
validate hostname
validate upstream
write the file atomically
caddy validate
reload
```

The Agent's sudo permission is scoped as narrowly as possible.

## Webhooks

For GitHub webhooks later: verify the signature, deduplicate deliveries, validate the repository and branch mapping, never trust the payload blindly, and never run a long build inside the request.

## Authorization

User access is enforced by backend policies. Future workspace roles must not rely only on controls hidden in the frontend.

## Logging

Never logged: session cookies, authentication headers, secrets, installation tokens, database passwords, and raw `.env` contents.

Security-related events still need adequate audit context, without leaking secret material.

## Supply chain

The recommended baseline: pinned release versions, checksums for distributed binaries, dependency scanning, reproducible or documented builds, and signed releases that can be added later.

## Reporting a security problem

While a dedicated private reporting channel does not exist yet, **do not publish details of an unpatched vulnerability in a public issue**.

Use the [repository security policy](https://github.com/gmedia/sakala-landing/security/policy) for now. An official contact and supported version list will be documented as Sakala approaches a public service.
