---
title: Preparing a Dockerfile
description: Dockerfile examples that have been tried, how to test them on your laptop, and the port and variable rules your application has to meet to run on Sakala.
track: panduan
section: Deploy guides
order: 3
lang: en
---

# Preparing a Dockerfile

By the end of this guide your repository has a Dockerfile that runs on your laptop and meets Sakala's two requirements: the application listens on `0.0.0.0:$PORT`, and `/` answers with a status under 500.

> **Status as of 6 November 2026.** Sakala is not open to the public yet. This guide is for invited pilot participants and for anyone preparing an application ahead of time. The examples here have been built and run locally with Docker, under the same restrictions as the Sakala runtime, but have not been tried through Sakala in production.

## Who this is for

This guide is for you if you have a small web application and want to control how it is built. You do not need to be good at Docker already. If your repository has no Dockerfile, Sakala uses Railpack, a tool that works out the build automatically, so a Dockerfile is optional.

If there is a file named exactly `Dockerfile` in the repository root, or in the project's Root Directory, Sakala always uses it. Nothing overrides that choice.

## What you need

- Docker on your laptop. Check with `docker version`.
- `curl` to try the application.
- A GitHub repository to push this code to.

## The smallest example: a Node application

This example has no dependencies, so you can copy it straight into an empty folder. Create these four files.

`server.js`:

```js
const http = require("node:http");

// Sakala sets PORT. 3000 is only a fallback for running on your laptop.
const port = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Halo dari Sakala\n");
});

// 0.0.0.0 means accepting connections from outside the container, not only inside.
server.listen(port, "0.0.0.0", () => {
  console.log(`Listening on 0.0.0.0:${port}`);
});
```

`package.json`:

```json
{
  "name": "halo-sakala",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node server.js"
  }
}
```

`Dockerfile`:

```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package.json server.js ./
USER node
CMD ["node", "server.js"]
```

`.dockerignore`:

```text
.git
node_modules
.env
.env.*
Dockerfile
.dockerignore
```

The `.dockerignore` file keeps `.env` and unneeded folders out of the build. It starts to matter as soon as your Dockerfile uses `COPY . .`.

## Why the address and port matter

Before moving traffic to a new version, Sakala sends an HTTP request to `/` on your application from outside its container.

**Address.** `127.0.0.1` and `localhost` mean "only from inside this container". An application listening there is alive, but a request from outside never reaches it. `0.0.0.0` means accepting connections from outside as well.

**Port.** Sakala decides the port, hands it over through the `PORT` environment variable, and checks your application on that port. The order is:

1. The **Port** field you fill in when creating the project or in the **Pengaturan** tab.
2. If that field is empty, and the last stage of your Dockerfile declares exactly one port with `EXPOSE`, for example `EXPOSE 80`, that port is used. If the last stage has no `EXPOSE` at all, Sakala uses the port of its base image, so `FROM nginx:alpine` alone means port 80.
3. Otherwise, 3000.

Sakala reads `EXPOSE` when it detects the project's stack, which happens when the project is created, when the Root Directory changes, and when you press **Deteksi ulang**. The base image's port is read only for images on common public registries (Docker Hub, GitHub, Quay, Amazon ECR Public, Microsoft, and GitLab), and only when the last stage has no `EXPOSE` of its own. Values from an `ARG` or `ENV` set in the Dockerfile are read too. Two or more ports, for example `EXPOSE 80 443`, keep Sakala on 3000, so fill in the **Port** field. The project page shows the port that will be used, and a change in **Pengaturan** applies from the next deployment.

For code you write yourself, read `PORT` and do not hard-code the number. For an image whose port is fixed, such as `nginx` on port 80, usually nothing is needed. If it was not picked up, write `EXPOSE` with that port or fill in the **Port** field.

Do not add your own `PORT` variable to the project. If its value differs from the port Sakala chose, the deploy fails with [`runtime_port_conflict`](/en/docs/deploy-gagal#runtime_port_conflict).

**The answer at `/`.** Any status under 500 passes, including a 404 or a login page, because the only thing being confirmed is that your application answers. A 5xx is retried until the start deadline, 2 minutes by default, and then counts as a failure. A failed deploy does not disturb the previous version, which keeps serving visitors.

## Try it on your laptop

Run this from the folder with the Dockerfile. The `--cap-drop` and `--security-opt` flags are restrictions Sakala applies too, and the memory, CPU, and process limits are the pilot defaults. It is nicer to find a problem here.

```bash
docker build -t halo-sakala .
docker run -d --name halo-sakala -e PORT=3000 -p 127.0.0.1:3000:3000 \
  --cap-drop ALL --cap-add CHOWN --cap-add DAC_OVERRIDE --cap-add FOWNER --cap-add FSETID \
  --cap-add KILL --cap-add SETGID --cap-add SETUID --cap-add NET_BIND_SERVICE \
  --security-opt no-new-privileges \
  --memory 256m --cpus 0.5 --pids-limit 128 \
  halo-sakala
curl -i http://127.0.0.1:3000/
```

A correct result looks like this:

```text
HTTP/1.1 200 OK
Content-Type: text/plain; charset=utf-8

Halo dari Sakala
```

Then confirm the application really reads `PORT`, by running it on another port:

```bash
docker rm -f halo-sakala
docker run -d --name halo-sakala -e PORT=8123 -p 127.0.0.1:8123:8123 \
  --cap-drop ALL --cap-add CHOWN --cap-add DAC_OVERRIDE --cap-add FOWNER --cap-add FSETID \
  --cap-add KILL --cap-add SETGID --cap-add SETUID --cap-add NET_BIND_SERVICE \
  --security-opt no-new-privileges \
  halo-sakala
curl -i http://127.0.0.1:8123/
docker rm -f halo-sakala
```

If the second `curl` also answers `200 OK`, your application is ready.

## Second example: a static site with Vite

This example is for a Vite project whose build output is static files. The project needs a `package-lock.json`, which `npm install` creates. In the code, the value is read through `import.meta.env.VITE_API_URL`.

`Dockerfile`:

```dockerfile
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN --mount=type=secret,id=VITE_API_URL,env=VITE_API_URL npm run build

FROM nginxinc/nginx-unprivileged:1-alpine
COPY default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
```

`default.conf.template`, whose `${PORT}` value is filled in when the container starts:

```nginx
server {
    listen 0.0.0.0:${PORT};
    root /usr/share/nginx/html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

`.dockerignore`:

```text
.git
node_modules
dist
.env
.env.*
Dockerfile
.dockerignore
```

The regular `nginx` image works too. Keep the template above so nginx listens on `${PORT}`, or, without the template, leave nginx on port 80: Sakala reads `EXPOSE 80` from the `nginx` image and uses that port. If port 80 is not picked up, for example because the base image is on a private registry, nginx listens on port 80 while Sakala checks port 3000, and the deploy fails with [`runtime_app_not_listening`](/en/docs/deploy-gagal#runtime_app_not_listening). This example uses `nginxinc/nginx-unprivileged` because its processes never run as root at all.

Try it on your laptop:

```bash
VITE_API_URL=https://api.contoh.test docker build --secret id=VITE_API_URL,env=VITE_API_URL -t halo-vite .
docker run -d --name halo-vite -e PORT=3000 -p 127.0.0.1:3000:3000 \
  --cap-drop ALL --cap-add CHOWN --cap-add DAC_OVERRIDE --cap-add FOWNER --cap-add FSETID \
  --cap-add KILL --cap-add SETGID --cap-add SETUID --cap-add NET_BIND_SERVICE \
  --security-opt no-new-privileges \
  --memory 256m --cpus 0.5 --pids-limit 128 \
  halo-vite
curl -i http://127.0.0.1:3000/
docker rm -f halo-vite
```

Keep `-e PORT=3000` when you try this image on your laptop. Without it, nginx stops with `invalid port`. This does not happen on Sakala, because `PORT` is always set.

## Other stacks

As of 6 November 2026 only the two examples above have been tried. Python, Go, PHP, and other stacks are fine as long as the image builds, the application listens on `0.0.0.0:$PORT`, and `/` answers under 500. There is no tested example for them here yet, so use the steps in "Try it on your laptop" to check for yourself.

For now Sakala runs one web service per project. Workers and cron are not available.

## Variables needed during the build

Variables you set in the Environment Variables tab are always available while the application runs. During the build, the rule depends on how it builds.

- **Without a Dockerfile (Railpack).** Variables are automatically available on every build step, with no extra setup.
- **With a Dockerfile.** You have to ask for them on the step that needs them, like the line `RUN --mount=type=secret,id=VITE_API_URL,env=VITE_API_URL npm run build` above.

If you only write `--mount=type=secret,id=VITE_API_URL`, the value is available as the file `/run/secrets/VITE_API_URL`, not as an environment variable. `PORT` and empty variables are not passed to the build.

Three things that often confuse people on a Dockerfile:

- **`ARG` stays empty.** Sakala deliberately does not fill it, because an `ARG` value is stored in the image history, where anyone holding the image can read it.
- **An unset variable does not fail the build.** The step still runs with an empty value. In a trial of the Vite example above, the result read `API: ` with no address.
- **Changing a value does not rebuild a cached step.** The next build can keep using the old value. Commit a code change in a file copied before that step so the step rebuilds.

Values passed this way do not enter image layers or history, unless your own build step writes them to a file. Public variables like `VITE_*` and `NEXT_PUBLIC_*` are a different story: the framework puts them in the build output, where anyone opening your application can read them. Do not put secrets there.

This Dockerfile path has been tested with real BuildKit. The Railpack path has only been checked at the level of its arguments and documentation, not with a real Railpack build.

## Keep secrets out of the image

Passwords, tokens, and the contents of `.env` do not belong in a Dockerfile or in the repository. Avoid these three patterns:

```dockerfile
# Do not copy this.
ENV DATABASE_URL=postgresql://user:password@host/db
ARG API_TOKEN
COPY .env .
```

Set the values in the Environment Variables tab so they exist only while the application runs. To confirm nothing slipped in, check the image history and look for `.env` files inside. The `find` command below must print nothing.

```bash
docker history --no-trunc halo-sakala
docker run --rm --entrypoint sh halo-sakala -c 'find / -name ".env*" 2>/dev/null'
```

If a secret has already been committed, deleting the file is not enough, because the value stays in Git history. Replace the secret at the service it came from.

## Push and deploy

Sakala builds the image itself from your repository, so you do not push an image to a registry. Pushing the code is enough:

```bash
git add Dockerfile .dockerignore package.json server.js
git commit -m "chore: add Dockerfile"
git push
```

Then open the project in the Console and press **Deploy sekarang** or **Redeploy**. If this is your first deploy, follow [Your First Deploy](/en/docs/deploy-pertama). If `curl` worked on your laptop but the deploy still fails, read the code on the deployment detail page.

## If it fails

A failed deploy does not replace the version being served. If your project has deployed successfully before, the old version stays reachable while you fix things. The most common mistakes:

| What happened                                                                        | Code                                                                                   |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| The application listens on `localhost` or a fixed port                               | [`runtime_app_not_listening`](/en/docs/deploy-gagal#runtime_app_not_listening)         |
| The project has a `PORT` variable with a different value                             | [`runtime_port_conflict`](/en/docs/deploy-gagal#runtime_port_conflict)                 |
| nginx on port 80, but port 80 is read from neither the Dockerfile nor the base image | [`runtime_app_not_listening`](/en/docs/deploy-gagal#runtime_app_not_listening)         |
| The application stops on start                                                       | [`runtime_app_crashed`](/en/docs/deploy-gagal#runtime_app_crashed)                     |
| `/` always answers 5xx                                                               | [`runtime_app_unhealthy`](/en/docs/deploy-gagal#runtime_app_unhealthy)                 |
| `npm ci` fails because `package-lock.json` was not committed                         | [`runtime_build_failed`](/en/docs/deploy-gagal#runtime_build_failed)                   |
| A file named `dockerfile` in lowercase                                               | No specific code. See [Dockerfile not used](/en/docs/deploy-gagal#dockerfile-not-used) |

## Next steps

If your application needs a database, continue to [Connecting an external database](/en/docs/database-eksternal). If your deploy failed, open [When a deploy fails](/en/docs/deploy-gagal).
