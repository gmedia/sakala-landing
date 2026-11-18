---
title: The Console, team workspaces, and legal documents run in production
description: The Sakala Console now runs in production with personal and team workspaces, roles, quotas per workspace, and consent to the terms of service at sign-up.
publishedAt: 2026-11-12
lang: en
---

The Console at `app.sakala.dev` now runs in production. Accounts can be created
with email, GitHub, or Google, and people who sign up are asked to accept the
[Terms of Service](/en/syarat) and the
[Acceptable Use Policy](/en/penggunaan-wajar). Accounts can also be exported
and deleted from the Console.

Projects now belong to a workspace. Every account has a personal workspace, and
can create team workspaces, invite members by email, and give them the Owner,
Member, or Viewer role. Quotas are counted per workspace and shown when
creating a project.

User applications run on a runtime host separate from the control plane,
inside a gVisor sandbox. Maintainers have an admin area to see nodes,
workspaces, and feedback, and to suspend projects with a recorded reason.
