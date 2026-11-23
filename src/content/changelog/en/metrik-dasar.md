---
title: Basic metrics per project
description: The Metrik tab now shows each project's CPU use, memory use, number of replicas, and restarts, from one hour up to 30 days back.
publishedAt: 2026-11-19
lang: en
---

Every project now has a **Metrik** (metrics) tab in the Console. It holds four
charts: CPU use, memory use against its limit, the number of running replicas,
and the number of restarts. The range can be 1 hour, 6 hours, 24 hours,
7 days, or 30 days.

Data is recorded per minute and kept for 24 hours, then summarised per hour
and kept for 30 days. Every workspace member, viewers included, can see it.
The charts help answer questions such as "is my application running out of
memory" before opening the logs.

These metrics do not cover visitor counts or HTTP errors yet.
