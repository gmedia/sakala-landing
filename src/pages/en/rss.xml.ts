import type { APIRoute } from "astro";
import { buildChangelogFeed } from "../../lib/rss";

export const GET: APIRoute = ({ site }) => buildChangelogFeed("en", site);
