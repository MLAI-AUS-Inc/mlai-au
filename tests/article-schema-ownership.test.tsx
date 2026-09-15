import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { getArticlesSortedNewestFirst } from "../app/articles/registry";
import { ArticleImageBlock } from "../app/components/articles/ArticleImageBlock";

test("absent article images render no empty image request", () => {
  expect(renderToStaticMarkup(<ArticleImageBlock src="" alt="Unused" />)).toBe("");
  expect(renderToStaticMarkup(<ArticleImageBlock src=" " alt="Unused" />)).toBe("");
});

test("published article bodies leave Article and FAQ schema to the shared layout", async () => {
  let inspected = 0;
  for (const article of getArticlesSortedNewestFirst()) {
    const module = await import("../app/articles/content/" + article.slug + ".tsx");
    const Content = module.default;
    let html: string;
    try { html = renderToStaticMarkup(<MemoryRouter><Content /></MemoryRouter>); }
    catch (error) { throw new Error("Article body failed to render: " + article.slug, { cause: error }); }
    expect(html).not.toMatch(/<img\b[^>]*\bsrc=["']\s*["']/);
    expect(html, article.slug).not.toContain("AI-assisted drafting, human-edited and reviewed.");
    const scripts = html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g);
    for (const script of scripts) {
      const graph = JSON.parse(script[1]);
      const inspect = (value: unknown): void => {
        if (!value || typeof value !== "object") return;
        if (Array.isArray(value)) { value.forEach(inspect); return; }
        const row = value as Record<string, unknown>;
        const types = Array.isArray(row["@type"]) ? row["@type"] : [row["@type"]];
        for (const type of types) expect(["FAQPage", "Article", "BlogPosting"].includes(String(type)), article.slug + ": module-owned " + type).toBe(false);
        Object.values(row).forEach(inspect);
      };
      inspect(graph);
    }
    inspected++;
  }
  expect(inspected).toBeGreaterThanOrEqual(56);
});
