---
title: Variables and Secrets
description: How to keep configuration out of your code, and why secrets must never live in a repository.
track: panduan
section: Preparing a project
order: 4
lang: en
---

# Variables and Secrets

Applications almost always need values that differ between your laptop and a public environment: a database address, an API key, a frontend URL, a debug flag.

Those values should not be written into the code. If they are, you have to edit code every time you change environment, and the secrets end up in Git history forever.

## Variables and secrets are treated differently

A **variable** is ordinary configuration that is harmless if seen. An application mode, a timezone, a public frontend address.

A **secret** is a value that causes harm if it leaks. A database password, an API key, an access token.

Sakala treats them differently. Secrets are stored encrypted, masked in the interface, and redacted from logs so they are never printed while a deployment runs.

## Rules that apply right now

1. Keep values in environment variables, not in code.
2. Add `.env` to `.gitignore`.
3. Provide a `.env.example` with variable names only and no real values, so others know what to fill in.
4. Never put a secret in the frontend. Anything sent to the browser can be read by the user.

## If a secret was already committed

Deleting the file and committing again **does not fix it**. Git history still holds the old value, and anyone with repository access can read it.

What you have to do is revoke that credential and issue a new one. Cleaning Git history is an additional step, not a substitute.

## What Sakala will provide

This section is direction, not something available yet.

Sakala will let you manage variables and secrets from the Console: add, edit, delete, and mark which ones need masking. A secret value can only be revealed again through a deliberate action rather than sitting on screen.

Because configuration changes affect a running application, Sakala will state clearly when a change only takes effect after a redeploy.

## What stays your responsibility

Sakala can protect how a secret is stored and redacted, but it cannot judge whether a value deserves to be secret. Deciding what counts as a secret, and rotating it when it leaks, remains yours.
