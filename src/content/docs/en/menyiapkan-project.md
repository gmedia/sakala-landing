---
title: Preparing Your Project
description: What to fix in your repository so the project is ready to deploy, and you can do all of it today.
track: panduan
section: Preparing a project
order: 3
lang: en
---

# Preparing Your Project

A project that runs smoothly on your laptop will not necessarily run elsewhere. The cause is almost always the same: something exists on your machine that never made it into the repository.

You can work through this page **now**, before Sakala is available. It applies to any deployment platform.

## 1. Everything needed is in the repository

A deployment environment only receives what the repository contains. Files that live only on your laptop do not travel with it.

Test it the honest way: clone your own repository into a fresh folder and run it from scratch. If that fails, deployment will fail too.

## 2. Dependencies are declared, not installed by hand

Your dependency list must live in a file a machine can read, such as `package.json`, `composer.json`, `requirements.txt`, or `go.mod`.

If you ever installed something manually to make the project run, that has to be recorded too. Otherwise the build will fail.

## 3. The application reads its port from the environment

This is the most common failure, and the most confusing one, because the application appears to start successfully.

On a laptop you usually run on a fixed port like `3000` or `8000`. In a deployment environment the port is assigned by the system and passed in through an environment variable.

Your application has to read it rather than insist on its own number:

```js
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0");
```

Watch the bind address too. Inside a container, `localhost` means "only inside this container", so nothing outside can reach it. Use `0.0.0.0`.

## 4. Secrets stay out of the repository

Database passwords, API keys, and tokens must not live inside the repository, not even a private one.

Move them into environment variables, and make sure files like `.env` are in `.gitignore`. How to manage them is covered in [Variables and Secrets](/en/docs/variabel-dan-secret).

If a secret was ever committed, replacing the file is not enough. Git history still holds it, so the credential itself has to be rotated.

## 5. Do not rely on local files that will not survive

Files your application writes while running, such as uploads or a SQLite database, can disappear when the application restarts or is redeployed.

For demos and coursework that is often fine. What matters is that you know it, rather than being surprised when the data is gone.

## 6. Build and start commands are clear

A deployment environment needs to know two things: how the project is built, and what command runs it.

Most popular frameworks follow conventions that can be detected automatically. If your project is unusual, provide a `Dockerfile` so you decide how it happens.

Sakala prefers your `Dockerfile` when one exists. The full order is described in [Deployment Flow](/en/docs/teknis/alur-deployment).

## Quick checklist

- [ ] The repository can be cloned and run from scratch.
- [ ] Dependencies are declared in a manifest file.
- [ ] The application reads `PORT` and binds to `0.0.0.0`.
- [ ] No secrets in the repository or its history.
- [ ] You know which data can disappear on restart.
- [ ] Build and start commands are clear, or a `Dockerfile` exists.
