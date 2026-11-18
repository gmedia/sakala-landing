---
title: Replicas, Sakala Edge, the release command, and a build limit per hour
description: A project can now run several replicas behind Sakala Edge, run a release command before the new version serves, and is limited in builds per hour.
publishedAt: 2026-11-18
lang: en
---

A project can now run with several replicas, and its traffic is shared by
Sakala Edge, a new router that reads its route table from the API. When one
replica dies, traffic moves to the others and the agent starts it again.
Replicas are only available to workspaces that an admin has given a limit
profile. Applications that use replicas have to be stateless.

A project can also have a **Release command**, run once per deployment before
the new version receives traffic, for example for migrations. How to use it is
in [Databases and the Release Command](/en/docs/perintah-rilis).

Every workspace is now limited in builds per hour, counted over the last 60
minutes. The details are in [Pilot Limits](/en/docs/batas-pilot).
