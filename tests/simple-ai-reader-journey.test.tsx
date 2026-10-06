import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import ArticleContent, { articleMeta, faqItems } from "../app/articles/content/featured/what-is-artificial-intelligence-in-simple-words";
import { ARTICLE_REGISTRY, getNextArticleSlug } from "../app/articles/registry";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import { ArticleLayout } from "../app/components/articles/ArticleLayout";

const slug = "featured/what-is-artificial-intelligence-in-simple-words";
const article = ARTICLE_REGISTRY[slug];
const config = BASE_ARTICLE_SEO_CONFIG[`/articles/${slug}`];

function renderPage() {
  return renderToStaticMarkup(
    <MemoryRouter>
      <ArticleLayout article={article} faqItems={faqItems}>
        <ArticleContent />
      </ArticleLayout>
    </MemoryRouter>,
  );
}

test("the beginner page serves working next steps and consistent visible and structured attribution without scripts", () => {
  const html = renderPage();
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  const nodes = scripts.flatMap((script) => JSON.parse(script[1])["@graph"] ?? []);
  const schema = nodes.find((node) => node["@type"] === "Article");

  expect(schema.author.url).toBe(article.authorUrl);
  expect(html).toContain(`href="${schema.author.url}"`);
  expect(html.toLowerCase()).toContain(`datetime="${schema.dateModified}"`);
  expect(schema.datePublished).toBe(articleMeta.datePublished);
  expect(schema.dateModified).toBe(articleMeta.dateModified);
  expect(schema.description).toBe(articleMeta.description);
  expect(nodes.some((node) => node["@type"] === "FAQPage")).toBe(false);
  expect(html).toContain(faqItems[0].question);
  expect(html).toContain('href="#ai-or-not-heading"');
  expect(html).toContain('id="ai-or-not-heading"');
  expect(html.match(/Find an AI event/g)).toHaveLength(2);
  expect(html).toContain('href="/events"');
  expect(html).toContain(`href="/articles/${config.nextArticleSlug}"`);
  expect(html).not.toContain('href="/articles/featured/what-an-entrepreneur-does-and-how-to-start-well"');
});

test("the next-read override cannot send readers to a withheld article or back to itself", () => {
  const original = config.nextArticleSlug;
  try {
    for (const candidate of [slug, "featured/does-not-exist", "featured/how-to-choose-the-best-ai-for-coding-in-2025"]) {
      config.nextArticleSlug = candidate;
      const html = renderPage();
      expect(html).toContain(`href="/articles/${getNextArticleSlug(slug)}"`);
      if (candidate !== slug) expect(html).not.toContain(`href="/articles/${candidate}"`);
    }
  } finally {
    config.nextArticleSlug = original;
  }
});
