import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { ARTICLE_CONTEXTUAL_READING_PATHS as paths } from "../app/articles/contextual-reading-paths";
import { ARTICLE_REGISTRY, isArticleIndexable } from "../app/articles/registry";
import { ArticleLayout } from "../app/components/articles/ArticleLayout";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import { ArticleReadingLinks } from "../app/components/articles/ArticleReadingLinks";
import { readFileSync } from "node:fs";
const groups = JSON.parse(readFileSync("tests/fixtures/search-indexing/search-console-examples.json", "utf8")).groups;
const candidates = groups.filter((group: any) => group.reason.includes("currently not indexed")).flatMap((group: any) => group.rows.map((row: any) => new URL(row.url).pathname)).filter((path: string) => path.startsWith("/articles/") && isArticleIndexable(ARTICLE_REGISTRY[path.slice(10)]));
const recovered = ["/articles/featured/build-an-ai-personal-assistant-for-one-small-business-task", "/articles/featured/startups-in-melbourne-for-ai-builders-and-new-founders"];
const render = (path: string) => renderToStaticMarkup(<MemoryRouter><ArticleReadingLinks articlePath={path} /></MemoryRouter>);
test("all 16 retained candidates and both recovered guides have rendered contextual inbound and outward paths", () => {
  expect(candidates).toHaveLength(16);
  for (const target of [...candidates, ...recovered]) {
    const inbound = Object.entries(paths).filter(([source, choices]) => source !== target && choices.some(choice => choice.href === target));
    expect(inbound.length, target).toBeGreaterThan(0);
    expect(render(inbound[0][0]), target).toContain('href="' + target + '"');
    expect(paths[target].length, target).toBeGreaterThan(0);
    for (const choice of paths[target]) expect(render(target)).toContain('href="' + choice.href + '"');
  }
});
test("every contextual choice uses an eligible exact canonical destination and a production task explanation", () => {
  for (const [source, choices] of Object.entries(paths)) {
    const article = ARTICLE_REGISTRY[source.slice(10)];
    expect(isArticleIndexable(article), source).toBe(true);
    expect(new Set(choices.map(choice => choice.href)).size).toBe(choices.length);
    for (const choice of choices) {
      expect(choice.href).not.toBe(source);
      expect(choice.reason.trim().length).toBeGreaterThan(20);
      const destination = ARTICLE_REGISTRY[choice.href.slice(10)];
      expect(isArticleIndexable(destination), choice.href).toBe(true);
      expect(choice.href).toBe("/articles/" + destination.slug);
    }
  }
});
test("withheld notices never render discovery links even if their noindex flag is missing", () => {
  const publicArticle = Object.values(ARTICLE_REGISTRY).find(isArticleIndexable)!;
  expect(isArticleIndexable({ ...publicArticle, publicationStatus: "under-review", indexing: undefined })).toBe(false);
  const notices = Object.values(ARTICLE_REGISTRY).filter(article => !isArticleIndexable(article));
  expect(notices).toHaveLength(4);
  for (const notice of notices) expect(render("/articles/" + notice.slug)).toBe("");
});

test("the recovered module keeps one Events offer and one disclaimer while shared navigation remains visible", async () => {
  for (const path of recovered) {
    const article = ARTICLE_REGISTRY[path.slice(10)];
    const module = await import("../app/articles/content/" + article.slug + ".tsx");
    const Content = module.default;
    const html = renderToStaticMarkup(<MemoryRouter><ArticleLayout article={article}><Content /></ArticleLayout></MemoryRouter>);
    expect(BASE_ARTICLE_SEO_CONFIG[path].contentOwnsConversion).toBe(true);
    expect(BASE_ARTICLE_SEO_CONFIG[path].contentOwnsDisclaimer).toBe(true);
    expect((html.match(/Explore MLAI events/g) ?? []).length).toBe(1);
    expect((html.match(/data-cf-component-id="disclaimer"/g) ?? []).length).toBe(1);
    expect(html).toContain("data-article-reading-links");
    expect(module.DATE_PUBLISHED).toBe(article.date);
    expect(module.DATE_MODIFIED).toBe(article.dateModified);
    expect(Date.parse(article.dateModified!)).toBeGreaterThanOrEqual(Date.parse(article.date));
  }
});
