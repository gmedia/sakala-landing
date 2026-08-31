---
title: Sharing a Project Beyond Localhost
description: Why a project that runs on your laptop cannot be opened by anyone else, and what your options are.
track: panduan
section: Start here
order: 2
lang: en
---

# Sharing a Project Beyond Localhost

A project running on `localhost` can only be opened from the machine it runs on. That is fine during development, but it becomes a problem when coursework needs to be graded, a portfolio needs sharing, or a demo has to be opened by someone else.

This page explains the options for getting a project to a public address. Sakala is still under active development, so nothing here is a claim that its deployment service is available.

## Why localhost cannot simply be shared

`localhost` points back to the machine currently in use. When someone else opens `localhost:3000`, their browser looks for an application on _their_ device, not on your laptop.

For a project to be reachable over the internet it needs an environment that keeps the application running, and a public route that points a domain at that application.

In simple terms:

1. source code lives in a Git repository;
2. a deployment environment fetches and builds that source;
3. the application process runs on an internal port;
4. a reverse proxy connects the public domain to that port;
5. logs and status help you check the result.

Read [Deployment Flow](/en/docs/teknis/alur-deployment) to understand the communication model Sakala is building.

## Options for sharing a project

The right option depends on how long the demo needs to live, your security needs, and how much infrastructure you want to manage.

### Use a tunnel for a short demo

A tunnel forwards connections from a temporary public URL to an application still running on your laptop. It is useful for a quick review or for debugging together.

Your laptop and the application process must stay awake. Do not use a tunnel to expose sensitive data, admin panels, or other local services without understanding the risk.

### Deploy to an existing platform

A deployment platform can pull source from a repository, run a build, and provide a public address. Check language support, resource limits, secret handling, logs, and sleep policy before choosing one.

For coursework and portfolios, make sure the address stays reachable through the whole review period.

### Run your own server

A VPS gives you more control, but you also become responsible for the operating system, firewall, SSL, reverse proxy, security updates, backups, and monitoring. It is a good way to learn infrastructure, but rarely the simplest path for sharing a small demo.

## What to prepare first

A project that runs happily on a laptop will not necessarily run elsewhere. Check the following:

- the source code lives in the right Git repository;
- dependencies and build commands are clearly recorded;
- the application reads its port from the environment when the framework needs it;
- secrets are not stored in the repository;
- local files or databases are not assumed to always be there;
- the README explains how to run the project;
- error pages do not leak credentials or sensitive detail.

If the project spans several services, write down how the frontend, API, database, and supporting services relate to each other. That separation of responsibility is also covered in [Sakala Concepts](/en/docs/teknis/konsep).

## What Sakala is building toward

Sakala aims to help small projects move from a Git repository to a public address through a path that is easy to follow. You will pick a repository through the Console, the API manages deployment state and commands, and an Agent performs the runtime work and reports status and logs back.

The goal is not to hide the deployment process. Sakala wants to make it easier to learn without turning it into a one-click claim or a replacement for enterprise cloud.

See [Deployment Flow](/en/docs/teknis/alur-deployment) for how that path is designed, and [FAQ](/en/docs/faq) for where the product stands today.

## After a project has a public address

Before sharing the link, open it from another device or network. Check the home page, important routes, static assets, how it behaves on a small screen, and what happens when something fails.

A public address does not automatically mean the application is production ready. Production also means security, observability, backups, capacity, and a recovery procedure that matches the risk of what you built.
