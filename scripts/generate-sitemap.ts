import { writeFile } from "node:fs/promises";
import path from "node:path";
import { getSitemapEntries, renderSitemap, resolveSitemapOrigin } from "./lib/sitemap";

const origin = resolveSitemapOrigin(process.env.SITE_URL || process.env.VITE_SITE_URL);
const entries = getSitemapEntries();
const output = path.join(process.cwd(), "public/sitemap.xml");
await writeFile(output, renderSitemap(entries, origin), "utf8");
console.log(`Sitemap generated with ${entries.length} canonical entries at ${output}`);
