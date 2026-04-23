import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { ARTICLE_REGISTRY, resolveArticleRouteSlug } from "../app/articles/registry";

const ARTICLE_CONTENT_ROOT = path.join(process.cwd(), "app", "articles", "content");
const ROOT_RELATIVE_LINK_RE = /\b(?:buttonHref|href|to)\s*=\s*["'](\/[^"']*)["']/g;

const VALID_STATIC_ROUTES = new Set([
  "/",
  "/articles",
  "/contact",
  "/dashboard",
  "/events",
  "/how-to-pitch-your-idea",
  "/hackathons",
  "/medhack",
  "/members",
  "/platform/dashboard",
  "/platform/login",
  "/platform/logout",
  "/privacy",
  "/resources",
  "/roo",
  "/sponsors",
  "/terms",
  "/verify-email",
  "/esafety",
  "/esafety/dashboard",
  "/esafety/leaderboard",
  "/esafety/profile",
  "/esafety/resources",
  "/esafety/submit",
  "/esafety/team",
  "/hospital/app",
  "/hospital/app/coding",
  "/hospital/app/dashboard",
  "/hospital/app/leaderboard",
  "/hospital/app/pitching",
  "/hospital/app/profile",
  "/hospital/app/resources",
  "/hospital/app/submit",
  "/hospital/app/team",
  "/innovate-connect-alliance",
  "/innovate-connect-alliance/docs",
  "/innovate-connect-alliance/profile",
  "/innovate-connect-alliance/submissions",
  "/innovate-connect-alliance/team",
  "/vibe-raising",
  "/vibe-raising-landing",
  "/vibe-raising/companies",
  "/vibe-raising/company-setup",
  "/vibe-raising/create-update",
  "/vibe-raising/discover",
  "/vibe-raising/logout",
  "/ai-founder-community-pitching-ideas",
  "/practical-ai-learning-beginners-builders",
]);

const VALID_ARTICLE_ROUTES = new Set(
  Object.values(ARTICLE_REGISTRY).map((article) => `/articles/${resolveArticleRouteSlug(article.slug)}`)
);

type InvalidMatch = {
  file: string;
  line: number;
  route: string;
};

function collectArticleContentFiles(rootDir: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(rootDir, { withFileTypes: true })) {
    const entryPath = path.join(rootDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectArticleContentFiles(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".tsx")) {
      files.push(entryPath);
    }
  }

  return files.sort();
}

function lineNumberForIndex(source: string, index: number) {
  return source.slice(0, index).split("\n").length;
}

function isValidInternalRoute(route: string) {
  return VALID_STATIC_ROUTES.has(route) || VALID_ARTICLE_ROUTES.has(route);
}

const invalidMatches: InvalidMatch[] = [];
const articleContentFiles = collectArticleContentFiles(ARTICLE_CONTENT_ROOT);

for (const file of articleContentFiles) {
  const source = readFileSync(file, "utf8");

  for (const match of source.matchAll(ROOT_RELATIVE_LINK_RE)) {
    const route = match[1];
    if (isValidInternalRoute(route)) continue;

    invalidMatches.push({
      file,
      line: lineNumberForIndex(source, match.index ?? 0),
      route,
    });
  }
}

if (invalidMatches.length > 0) {
  console.error("Invalid internal article links found:");
  for (const invalidMatch of invalidMatches) {
    console.error(`- ${invalidMatch.route} at ${invalidMatch.file}:${invalidMatch.line}`);
  }
  process.exit(1);
}

console.log(`Article internal link check passed for ${articleContentFiles.length} files.`);
