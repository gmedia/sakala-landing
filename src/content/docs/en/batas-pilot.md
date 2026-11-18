---
title: Pilot Limits
description: Hosted Sakala is in its pilot. Anyone can sign up and use it at no cost, within limits on projects, containers, builds per hour, and automatic sleep.
track: panduan
section: Start here
order: 1.5
lang: en
---

# Pilot Limits

Hosted Sakala is in its pilot. Anyone can [sign up in the Console](https://app.sakala.dev/register) and use it at no cost, within the limits on this page. There is no uptime guarantee yet, so Sakala is not a fit for important applications.

> **Status as of 19 November 2026.** The numbers below are the defaults for a workspace without a custom limit profile. We announce limit changes in the [Changelog](/en/changelog) before they take effect.

## Limits per workspace

Every account gets one personal workspace when it signs up. A workspace is where projects live, and limits are counted per workspace.

| Limit                                              | Personal workspace | Team workspace |
| -------------------------------------------------- | ------------------ | -------------- |
| Projects                                           | 3                  | 2              |
| Containers running at the same time                | 3                  | 2              |
| Deployments processed at the same time             | 2                  | 1              |
| Builds per hour (counted over the last 60 minutes) | 20                 | 20             |
| Replicas per project                               | 1                  | 1              |

One account can own up to 2 team workspaces. Sakala admins can give a specific workspace different limits through a limit profile, for example more than one replica.

For the builds-per-hour limit, every deployment counts, including failed ones. Once the limit is reached, new deployments are refused until the oldest deployment in the last 60 minutes drops out of the count. A push that would trigger an automatic deploy during that time is skipped, and you get a notification.

## Limits per container

| Limit                         | Default                              | Maximum you can set |
| ----------------------------- | ------------------------------------ | ------------------- |
| Memory                        | 256 MB                               | 512 MB              |
| CPU                           | 0.5 core                             | 1 core              |
| Processes                     | 128                                  | 256                 |
| Build time                    | 10 minutes                           | —                   |
| Time from start to healthy    | 2 minutes                            | —                   |
| Total time for one deployment | 15 minutes                           | —                   |
| Logs kept                     | 7 days, at most 10 MB per deployment | —                   |

## Projects sleep after 30 minutes without visitors

A project with no visitors for 30 minutes is put to sleep so the pilot's capacity can be shared. Its address stays the same. The next visitor sees the **Proyek sedang dinyalakan** (project is starting) page, and the application opens by itself once it is ready. You can also wake it from the Console.

Your application is stopped while it sleeps and started again when it wakes, so anything held only in the application's memory, such as login sessions that are not stored in a database, is lost.

## Not available during the pilot

- An uptime guarantee, an SLA, or data recovery.
- Persistent storage inside the container. Files the application writes, including SQLite and uploads, are lost every time a new deploy finishes. For data, use an [external database](/en/docs/database-eksternal).
- Managed databases, custom domains, workers, and cron.
- Limits on outgoing traffic from containers. These limits are being added. Applications already run in a gVisor sandbox, but do not keep sensitive data on Sakala during the pilot.

## The binding rules

Your rights and obligations when using Sakala are set out in the [Terms of Service](/en/syarat) and the [Acceptable Use Policy](/en/penggunaan-wajar), published in Indonesian. Questions about limits can go to [`info@sakala.dev`](mailto:info@sakala.dev).

Ready to try? Follow [Your First Deploy](/en/docs/deploy-pertama).
