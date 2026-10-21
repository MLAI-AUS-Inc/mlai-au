import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup, renderToString } from "react-dom/server";

import { ArticleEnhancer } from "../app/components/articles/ArticleEnhancer";
import { ArticleHydrationCommit, ArticleHydrationScope } from "../app/components/articles/ArticleHydration";
import { ArticleTocPlaceholder } from "../app/components/articles/ArticleTocPlaceholder";
import { TableOfContents } from "../app/components/articles/TableOfContents";

const ITEMS = [
  { href: "#choose-a-workflow", label: "Choose a workflow" },
  { href: "#write-the-prompt", label: "Write the prompt" },
];

function count(html: string, needle: string) {
  return html.split(needle).length - 1;
}

describe("server-rendered article table of contents", () => {
  test("entries passed to the placeholder are in the server HTML with the existing look", () => {
    const html = renderToStaticMarkup(<ArticleTocPlaceholder className="bg-transparent" items={ITEMS} />);

    expect(html).toContain('data-article-toc-placeholder="true"');
    expect(html).toContain('data-article-toc-server-rendered="true"');
    expect(html).toContain('data-cf-component-id="toc"');
    expect(html).toContain("not-prose rounded-[32px] border border-gray-300 bg-transparent px-8 py-7 text-gray-900 my-12");
    expect(html).toContain('<nav aria-label="Table of contents"');
    expect(html).toContain(">In this guide:</h3>");
    expect(html).toContain(
      '<a href="#choose-a-workflow" class="text-sm leading-5 font-medium text-indigo-700 underline underline-offset-4 hover:text-indigo-800 transition-colors">Choose a workflow</a>',
    );
    expect(html).toContain('<a href="#write-the-prompt"');
    // Entries keep the link's line height inside the article's taller prose line height.
    expect(count(html, '<li class="list-none text-sm leading-5">')).toBe(2);

    // The list is exactly what ArticleEnhancer portals today, so both paths look the same.
    const list = renderToStaticMarkup(
      <TableOfContents items={ITEMS} title="In this guide:" ariaLabel="Table of contents" />,
    );
    expect(html).toContain(`>${list}</div>`);
  });

  test("a placeholder without entries is an empty slot that stays hidden until it is filled", () => {
    const html = renderToStaticMarkup(<ArticleTocPlaceholder className="bg-transparent" />);

    expect(html).toMatch(/^<div [^>]*><\/div>$/);
    expect(html).toContain("empty:hidden");
    expect(html).not.toContain("data-article-toc-server-rendered");
    expect(renderToStaticMarkup(<ArticleTocPlaceholder items={[{ href: " ", label: "Blank" }]} />)).toMatch(
      /^<div [^>]*><\/div>$/,
    );
  });

  test("a whole article renders one contents list whose links resolve in the same server HTML", () => {
    const html = renderToString(
      <ArticleHydrationScope>
        <div id="example-content">
          <ArticleEnhancer articleTitle="Example" contentSelector="#example-content" enableToc />
          <div data-article-content>
            <ArticleHydrationCommit>
              <ArticleTocPlaceholder items={ITEMS} />
              <h2 id="choose-a-workflow">Choose a workflow</h2>
              <p>First section.</p>
              <h2 id="write-the-prompt">Write the prompt</h2>
              <p>Second section.</p>
            </ArticleHydrationCommit>
          </div>
        </div>
      </ArticleHydrationScope>,
    );

    expect(count(html, 'aria-label="Table of contents"')).toBe(1);
    for (const { href } of ITEMS) {
      expect(html).toContain(`href="${href}"`);
      expect(html).toContain(`id="${href.slice(1)}"`);
    }
  });

  test("the enhancer adds no second list after hydration and keeps filling legacy empty slots", async () => {
    const child = Bun.spawn([process.execPath, "tests/fixtures/article-toc-hydration-probe.tsx"], {
      stdout: "pipe",
      stderr: "pipe",
    });
    const [stdout, stderr, exit] = await Promise.all([
      new Response(child.stdout).text(),
      new Response(child.stderr).text(),
      child.exited,
    ]);
    expect({ exit, stderr }).toEqual({ exit: 0, stderr: "" });
    const results = Object.fromEntries(
      (JSON.parse(stdout) as Array<{ name: string }>).map((result) => [result.name, result]),
    ) as Record<string, any>;

    const ssr = results["server-rendered entries"];
    expect(ssr.server.navCount).toBe(1);
    expect(ssr.hydrated.navCount).toBe(1);
    expect(ssr.hydrated.hrefs).toEqual(["#choose-a-workflow", "#write-the-prompt"]);
    expect(ssr.hydrated.unresolvedHrefs).toEqual([]);
    expect(ssr.hydrated.headingIds).toEqual(["choose-a-workflow", "write-the-prompt"]);
    expect(ssr.errors).toEqual([]);

    // Entries render even when the article's seo-config leaves the client list off.
    const switchedOff = results["server-rendered entries with the client contents list switched off"];
    expect(switchedOff.server.navCount).toBe(1);
    expect(switchedOff.hydrated.navCount).toBe(1);
    expect(switchedOff.errors).toEqual([]);

    // Existing articles that pass no entries keep the client-built list.
    const legacy = results["legacy empty slot"];
    expect(legacy.server.navCount).toBe(0);
    expect(legacy.server.placeholderChildCount).toBe(0);
    expect(legacy.hydrated.navCount).toBe(1);
    expect(legacy.hydrated.hrefs).toEqual(["#choose-a-workflow", "#write-the-prompt"]);
    expect(legacy.hydrated.unresolvedHrefs).toEqual([]);
    expect(legacy.errors).toEqual([]);

    // And an empty slot that is never filled stays empty, which empty:hidden hides.
    const unfilled = results["legacy empty slot with the client contents list switched off"];
    expect(unfilled.hydrated.navCount).toBe(0);
    expect(unfilled.hydrated.placeholderChildCount).toBe(0);
    expect(unfilled.hydrated.placeholderHiddenWhenEmpty).toBe(true);
  });
});
