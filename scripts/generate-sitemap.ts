import { writeFile } from "fs/promises";
import path from "path";
import {
    ARTICLE_REGISTRY,
    resolveArticleRouteSlug,
} from "../app/articles/registry";

type ChangeFrequency =
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";

type SitemapEntry = {
    path: string;
    lastmod?: string;
    changefreq?: ChangeFrequency;
    priority?: number;
};

const SITE_URL = (
    process.env.SITE_URL ||
    process.env.VITE_SITE_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://mlai.au"
).replace(/\/$/, "");

function normalizeDate(dateValue?: string) {
    if (!dateValue) return undefined;
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) return undefined;
    return parsed.toISOString().split("T")[0];
}

function toAbsoluteUrl(routePath: string) {
    const normalized = routePath.startsWith("/") ? routePath : `/${routePath}`;
    return new URL(normalized, SITE_URL).toString();
}

function buildUrlElement(entry: SitemapEntry) {
    const segments = [
        `<loc>${toAbsoluteUrl(entry.path)}</loc>`,
        entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : null,
        entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : null,
        entry.priority !== undefined ? `<priority>${entry.priority.toFixed(1)}</priority>` : null,
    ].filter(Boolean);

    const content = segments.map((segment) => `  ${segment}`).join("\n");
    return ` <url>\n${content}\n </url>`;
}

const staticPages: SitemapEntry[] = [
    { path: "/", changefreq: "weekly", priority: 1.0 },
    { path: "/articles", changefreq: "daily", priority: 0.9 },
    { path: "/about", changefreq: "monthly", priority: 0.6 },
    { path: "/contact", changefreq: "monthly", priority: 0.6 },
    { path: "/events", changefreq: "weekly", priority: 0.7 },
    { path: "/how-to-pitch-your-idea", changefreq: "monthly", priority: 0.6 },
    { path: "/members", changefreq: "monthly", priority: 0.5 },
    { path: "/sponsors", changefreq: "monthly", priority: 0.5 },
    { path: "/privacy", changefreq: "yearly", priority: 0.3 },
    { path: "/terms", changefreq: "yearly", priority: 0.3 },
];

const articlePages: SitemapEntry[] = Object.values(ARTICLE_REGISTRY).map((article) => ({
    path: `/articles/${resolveArticleRouteSlug(article.slug)}`,
    lastmod: normalizeDate(article.dateModified || article.lastUpdated || article.date),
    changefreq: "monthly",
    priority: 0.8,
}));

const allEntries = [...staticPages, ...articlePages];

const xmlContent = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    ...allEntries.map(buildUrlElement),
    "</urlset>",
    "",
].join("\n");

const outputPath = path.join(process.cwd(), "public", "sitemap.xml");
await writeFile(outputPath, xmlContent, "utf-8");

console.log(`Sitemap generated with ${allEntries.length} entries at ${outputPath}`);
