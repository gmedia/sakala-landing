---
title: Connecting an External Database
description: Sakala does not provide a database yet. Here is how to connect your application to one outside Sakala through an environment variable, without leaking the password.
track: panduan
section: Deploy guides
order: 4
lang: en
---

# Connecting an External Database

The Sakala MVP does not provide a database. If your application needs one, you rent or set it up yourself outside Sakala, then give your application its address through the `DATABASE_URL` environment variable.

That makes backups, migrations, and data recovery your responsibility. Sakala only runs the application. Containers have no persistent storage either, so a SQLite file or an upload written inside the container is gone each time a new deploy finishes.

> **Status as of 6 November 2026.** Sakala is not open to the public yet. The code example here has been run locally against PostgreSQL in Docker, without TLS. It has not been tried against a real provider or through Sakala in production.

## Who this is for

This guide is for pilot participants whose application needs to store data, and for anyone preparing an application. By the end your application is connected to a database, and you know how to check it, change the password, and recover when the connection fails.

## What you need

- An application that passes [Preparing a Dockerfile](/en/docs/dockerfile), or that Railpack can build.
- A project in the Console, with access to the **Environment Variables** tab.
- A database at a provider of your choice.

## Choosing a provider

Many services offer managed PostgreSQL or MySQL, such as Neon, Supabase, Aiven, and other cloud providers, and your campus may run its own server. These names are only examples. Sakala has no official integration with them and has not been tested with them.

Check these before choosing:

- **Reachable from the internet.** Applications on Sakala are not on your campus or office private network, so a database open only on a private network cannot be reached.
- **TLS support.** TLS encrypts the connection, so passwords and data cannot be read on the way.
- **Free plan limits.** Look at the number of connections, data size, and whether the database sleeps when idle.
- **Backups.** Find out whether there are automatic backups and how to restore them.

## Step 1: get `DATABASE_URL`

Providers usually show a connection string on the database page. It looks like this:

```text
postgresql://USER_NAME:PASSWORD@HOST:5432/DATABASE_NAME?sslmode=require
```

Everything in capitals above is a placeholder, not a real value. If your password contains characters like `@`, `:`, or `/`, they have to be encoded, or create a new password with only letters and numbers.

Do not put this value in the repository, in a committed `.env`, in a Dockerfile, or in logs.

## Step 2: set it in the Console

You can set it while creating the project, or later: open the project, go to the **Environment Variables** tab, press **Tambah Variabel**, and enter the name `DATABASE_URL` with the connection string. Keep **Simpan sebagai rahasia** (save as secret) ticked. Variable names use capital letters, digits, and underscores.

The application only reads a new variable after the next deployment, so press **Redeploy** after saving. Each deployment uses a copy of the variables taken when it is created.

## Step 3: read it in your code

An example for Node with the `pg` library. Add it with `npm install pg`, and make sure `package-lock.json` is committed too.

```js
const http = require("node:http");
const { Pool } = require("pg");

const port = Number(process.env.PORT) || 3000;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3 });

// Without this, a connection dropped while idle can kill the application.
pool.on("error", (err) =>
  console.error("Database connection lost:", err.message),
);

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");

  if (pathname !== "/db") {
    res.end("Application is alive\n");
    return;
  }

  try {
    await pool.query("SELECT 1");
    res.end("Database connected\n");
  } catch (err) {
    // Log the message only. Never print DATABASE_URL.
    console.error("Database failed:", err.message || err.code);
    res.statusCode = 503;
    res.end("Database not connected\n");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Listening on 0.0.0.0:${port}`);
});
```

Its Dockerfile:

```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY server.js ./
USER node
CMD ["node", "server.js"]
```

Notice that `/` does not touch the database. Sakala's check calls `/`. If that address also fails when the database has a problem, the deploy fails with `runtime_app_unhealthy`, even though the application itself is fine.

The application should also not exit right away when the database is unreachable, because that becomes `runtime_app_crashed`. `max: 3` limits the number of connections, because free plans usually have a small allowance.

## Network, TLS, and IP lists

An application on Sakala runs inside a container, so `localhost` means the container itself. A database on your laptop cannot be reached through `localhost`, and neither can any other `localhost` service.

For TLS, follow the provider's connection string, which usually includes `sslmode=require`. If you get a certificate error, use the provider's CA certificate. Do not turn off verification just to make the error go away.

Some providers only accept connections from a list of IP addresses. As of 6 November 2026 Sakala has not published a fixed list of outgoing IP addresses, so do not rely on one address. If a provider requires an IP list, ask the pilot's organisers first. Opening access from every address (`0.0.0.0/0`) is your own decision, and if you choose it, use a strong password and TLS.

## Migrations and backups are your responsibility

Sakala does not run migrations and does not back up data. The simplest way is to run migrations from your laptop, with `DATABASE_URL` living only in your terminal. `read -rs` keeps the value off the screen and out of your shell history:

```bash
read -rs DATABASE_URL && export DATABASE_URL
npm run migrate
unset DATABASE_URL
```

`npm run migrate` here is a script in your own project, so adapt it to the migration tool you use.

If migrations run when the application starts, remember one thing: **a failed deploy returns traffic to the old version, but it does not return the data.** A changed schema stays changed, and the old version can break when it reads the new schema.

Before a migration that deletes or changes data:

1. Take a backup, then confirm that backup can actually be restored.
2. Try it on a copy of the database first.
3. Split the change. Add the new column and deploy the code that uses it, then remove the old column in a later deploy.

## Check the result

After a successful deploy, open your application's address:

```bash
curl -i https://PROJECT-NAME.run.sakala.dev/db
```

`Database connected` means the connection is right. Replace the address above with your project's URL. You can also check from your laptop if you have `psql`, which helps decide whether the problem is in the database or in the application:

```bash
read -rs DATABASE_URL && export DATABASE_URL
psql "$DATABASE_URL" -c "SELECT 1"
unset DATABASE_URL
```

## If the connection fails

Look for the message in the **Logs** panel on the deployment detail page. The messages below came from trials with the `pg` library, except the timeout, certificate, and `too many connections` rows, which have not been tried. Other libraries word them slightly differently.

| Message in the log                            | What it means                                  | What to do                                                                          |
| --------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------- |
| `getaddrinfo ENOTFOUND ...`                   | The host name was not found                    | Copy the host from the provider again, or check that `DATABASE_URL` is set          |
| `ECONNREFUSED`                                | Nothing accepts connections at that address    | Make sure `DATABASE_URL` is set, the host is not `localhost`, and the port is right |
| A timeout with no other message               | The connection is blocked on the way           | Check the provider's IP list, and make sure the database is not asleep              |
| `password authentication failed for user ...` | The user name or password is wrong             | Create a new password, replace `DATABASE_URL`, then Redeploy                        |
| `database "..." does not exist`               | The database name is wrong                     | Match the name at the provider                                                      |
| `The server does not support SSL connections` | The server has no TLS, and the client wants it | Make sure the host is right. For a public provider, do not lower the TLS setting    |
| A certificate error                           | The server's certificate is not trusted        | Use the provider's CA certificate                                                   |
| `too many connections`                        | The provider's connection allowance is used up | Lower `max`, or check your plan's connection limit                                  |

If you ask for help, send only the error message and the failure code. Never send `DATABASE_URL`.

While you fix things, the last successful version keeps serving visitors. If the new variable turns out to be wrong, restore the old value and Redeploy.

## Changing the password

Do this regularly, and right away if a password may have leaked.

1. Create a new user or password at the provider. If you can, leave the old one active for now.
2. In the **Environment Variables** tab, press **Ubah** (edit) on the `DATABASE_URL` row and save the new value.
3. Press **Redeploy**. The running version keeps the old value until the new deploy succeeds.
4. Check `/db` on the new version.
5. Turn off the old password at the provider.

Sakala masks secret values in logs, but not perfectly. Values under 8 characters and common words are not masked, and parts such as a host name are not treated as secret. So do not print them in the first place. If a secret shows up in a log, treat it as leaked and replace it.

## Next steps

If the deploy fails before it reaches the database, open [When a deploy fails](/en/docs/deploy-gagal). For the port and build variable rules, see [Preparing a Dockerfile](/en/docs/dockerfile).
