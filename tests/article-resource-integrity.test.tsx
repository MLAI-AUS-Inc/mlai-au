import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import ts from "typescript";
import { getArticlesSortedNewestFirst } from "../app/articles/registry";
import { ArticleResourceCTA } from "../app/components/articles/ArticleResourceCTA";
import { isUsableArticleResourceHref } from "../app/lib/article-resource";

describe("article download integrity", () => {
  test("malformed generated props cannot crash the resource card during SSR", () => {
    for (const href of [undefined, null, {}, 42]) {
      expect(isUsableArticleResourceHref(href)).toBe(false);
      expect(renderToStaticMarkup(<ArticleResourceCTA title="Worksheet" description="A worksheet" buttonLabel="Download" buttonHref={href as any} />)).toBe("");
    }
    expect(renderToStaticMarkup(<ArticleResourceCTA title="Worksheet" description="A worksheet" buttonLabel="Download" buttonHref="/downloads/worksheet.txt" accent={"blue" as any} />)).toContain("/downloads/worksheet.txt");
  });
  test("registered published article modules no longer declare placeholder download cards", () => {
    for (const article of getArticlesSortedNewestFirst()) {
      const file = `app/articles/content/${article.slug}.tsx`;
      const source = readFileSync(file, "utf8");
      const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
      function visit(node: ts.Node) {
        if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(tree) === "ArticleResourceCTA") {
          const href = node.attributes.properties.find(p => ts.isJsxAttribute(p) && p.name.getText(tree) === "buttonHref");
          if (href && ts.isJsxAttribute(href) && href.initializer && ts.isStringLiteral(href.initializer)) {
            expect(isUsableArticleResourceHref(href.initializer.text), `${file}: ${href.initializer.text}`).toBe(true);
          }
        }
        ts.forEachChild(node, visit);
      }
      visit(tree);
    }
  });
  test.each(["", " ", "#", "#worksheet", "/articles", "/articles/?page=2", "/resources", "/contact", "/events", "https://mlai.au/articles", "https://www.mlai.au/articles/", "/articles/featured/example", "javascript:alert(1)", "data:text/html,hello"])("does not advertise a placeholder resource: %s", (href) => {
    expect(isUsableArticleResourceHref(href)).toBe(false);
    expect(renderToStaticMarkup(<ArticleResourceCTA title="Promised worksheet" description="Download the worksheet" buttonLabel="Download now" buttonHref={href} />)).toBe("");
  });

  test.each(["/downloads/pilot-brief.pdf", "https://firebasestorage.googleapis.com/v0/b/example/o/resources%2Fworksheet.pdf?alt=media", "https://docs.google.com/document/d/example/export?format=pdf"])("preserves an actual asset destination for editorial verification: %s", (href) => {
    expect(isUsableArticleResourceHref(href)).toBe(true);
    const html = renderToStaticMarkup(<ArticleResourceCTA title="Pilot brief" description="A scoped pilot brief" buttonLabel="Download brief" buttonHref={href} />);
    expect(html).toContain("Download brief");
    expect(html).toContain("Pilot brief");
  });
});
