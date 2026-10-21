import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { ArticleCallout } from "../app/components/articles/ArticleCallout";
import { ArticleReferences } from "../app/components/articles/ArticleReferences";
import { ArticleStepList } from "../app/components/articles/ArticleStepList";
import { QuoteBlock } from "../app/components/articles/QuoteBlock";

const articleComponentsDir = join(import.meta.dir, "..", "app/components/articles");

// The classes that make a QuoteBlock look like a QuoteBlock: radius, padding,
// colours and the title row. Callouts must render with the same set.
const QUOTE_BLOCK_SHAPE = ["not-prose", "rounded-[28px]", "px-6", "sm:px-8", "py-6", "sm:py-7", "text-white"];

function classesOf(html: string) {
  const match = html.match(/class="([^"]+)"/);
  return new Set((match?.[1] ?? "").split(/\s+/));
}

describe("ArticleCallout uses MLAI's QuoteBlock style", () => {
  test("calm variants render QuoteBlock's purple block and warnings its orange block", () => {
    const purpleQuote = classesOf(renderToStaticMarkup(<QuoteBlock title="Tip">Body</QuoteBlock>));
    const orangeQuote = classesOf(renderToStaticMarkup(<QuoteBlock title="Tip" variant="orange">Body</QuoteBlock>));
    expect(purpleQuote.has("bg-[#4b1bd1]")).toBe(true);
    expect(orangeQuote.has("bg-[#ff3d00]")).toBe(true);

    const expectedBackground = { info: "bg-[#4b1bd1]", success: "bg-[#4b1bd1]", brand: "bg-[#4b1bd1]", warning: "bg-[#ff3d00]" } as const;
    for (const [variant, background] of Object.entries(expectedBackground)) {
      const html = renderToStaticMarkup(
        <ArticleCallout title="Use fictional data" variant={variant as keyof typeof expectedBackground}>
          Body copy
        </ArticleCallout>,
      );
      const classes = classesOf(html);
      for (const shape of QUOTE_BLOCK_SHAPE) {
        expect(classes.has(shape)).toBe(true);
      }
      expect(classes.has(background)).toBe(true);
      expect(html).toContain('<span class="text-base font-semibold leading-none">Use fictional data</span>');
      expect(html).not.toMatch(/border-l-4|amber-|emerald-|teal-|rounded-r-lg/);
    }
  });

  test("no emoji is added when the article does not pass an icon", () => {
    const html = renderToStaticMarkup(<ArticleCallout title="Check consent" variant="warning">Body</ArticleCallout>);
    expect(html).not.toContain("💡");
    expect(html).not.toMatch(/\p{Extended_Pictographic}/u);
  });

  test("an explicit icon is kept as decoration, like QuoteBlock", () => {
    const html = renderToStaticMarkup(
      <ArticleCallout title="Tip" variant="brand" icon={<span>★</span>}>
        Body
      </ArticleCallout>,
    );
    expect(html).toContain('<span class="text-xl" aria-hidden="true"><span>★</span></span>');
  });

  test("an unknown variant from cast article content falls back to purple", () => {
    const html = renderToStaticMarkup(
      // @ts-expect-error generated articles can pass variants outside the union
      <ArticleCallout variant="caution">Body</ArticleCallout>,
    );
    expect(classesOf(html).has("bg-[#4b1bd1]")).toBe(true);
  });

  test("legacy body copy inherits the block's white text instead of its old gray", () => {
    const html = renderToStaticMarkup(
      <ArticleCallout variant="info">
        <p className="text-sm text-gray-800">
          Prefer to jump ahead? <a href="/articles">Browse related articles</a>
        </p>
      </ArticleCallout>,
    );
    expect(html).toContain("[&amp;_:is(p,li,span,em,strong,b,i,small)]:text-inherit");
    expect(html).toContain("[&amp;_p]:text-base");
    expect(html).toContain("[&amp;_a]:text-inherit");
    expect(html).toContain("[&amp;_a]:underline");
  });

  test("a callout without a title or icon renders only the body", () => {
    const html = renderToStaticMarkup(<ArticleCallout title="" variant="brand">Only body</ArticleCallout>);
    expect(html).not.toContain("font-semibold leading-none");
    expect(html).toContain("Only body");
  });
});

describe("ArticleReferences matches the table of contents box", () => {
  const references = [
    { id: 1, href: "https://business.gov.au/online-and-digital/artificial-intelligence", title: "Artificial intelligence (AI)", publisher: "business.gov.au", category: "guide" },
    { id: 2, href: "https://www.oaic.gov.au/privacy", title: "Privacy guidance", publisher: "OAIC", description: "Australian privacy obligations.", category: "government" },
    { id: 3, href: "https://academy.openai.com/resources", title: "Workshop hub", publisher: "", category: "guide" },
    { id: 4, href: "https://www.scalevp.com/insights/burn-multiple", title: "The Burn Multiple", publisher: "Scale Venture Partners", category: "analysis" },
  ];

  test("uses the ToC's outlined box, uppercase label and indigo links", () => {
    const html = renderToStaticMarkup(
      <ArticleReferences references={references} heading="Sources & further reading" />,
    );
    const sectionClasses = classesOf(html);
    for (const token of ["not-prose", "rounded-[32px]", "border", "border-gray-300", "bg-transparent"]) {
      expect(sectionClasses.has(token)).toBe(true);
    }
    expect(html).toContain('class="m-0 text-xs font-semibold uppercase tracking-wide text-gray-700"');
    expect(html).toContain("text-indigo-700 underline underline-offset-4");
    expect(html).not.toMatch(/rounded-md|ring-inset|bg-white/);
  });

  test("keeps the comment target, heading anchor, numbering and per-reference anchors", () => {
    const html = renderToStaticMarkup(<ArticleReferences references={references} />);
    expect(html).toContain('data-cf-component-id="references"');
    expect(html).toContain('aria-labelledby="references-heading"');
    expect(html).toContain('<h2 id="references-heading"');
    expect(html).toContain('id="references-heading-1"');
    expect(html).toContain('id="references-heading-4"');
    expect(html).toMatch(/\[<!-- -->1<!-- -->\]|\[1\]/);
    expect(html).toContain("(opens in a new tab)");
  });

  test("shows the domain once when the publisher is the domain", () => {
    const html = renderToStaticMarkup(<ArticleReferences references={references} previewCount={4} />);
    expect(html).not.toContain("business.gov.au · business.gov.au");
    expect(html).toContain(">business.gov.au</p>");
    expect(html).toContain(">OAIC · oaic.gov.au</p>");
    expect(html).toContain(">academy.openai.com</p>");
    expect(html).toContain(">Australian privacy obligations.</p>");
  });

  test("does not print a category pill on every row", () => {
    const html = renderToStaticMarkup(<ArticleReferences references={references} previewCount={4} />);
    expect(html).not.toMatch(/>Guide<|>Government<|>Analysis</);
  });

  test("keeps extra references behind a native disclosure", () => {
    const html = renderToStaticMarkup(<ArticleReferences references={references} previewCount={2} />);
    expect(html).toContain("<details");
    expect(html).toContain("Show all 4 references (2 more)");
    expect(html).toContain("Show fewer references");
  });

  test("uses stock rem text sizes only", () => {
    const source = readFileSync(join(articleComponentsDir, "ArticleReferences.tsx"), "utf8");
    expect(source).not.toMatch(/text-\[\d/);
  });
});

describe("article components use colours Tailwind can compile", () => {
  test("no article component reads a CSS variable through square-bracket shorthand", () => {
    // Tailwind 4 compiles bg-[--brand] to `background-color:--brand`, which the
    // browser drops. Use a palette class or the bg-(--token) form instead.
    for (const file of readdirSync(articleComponentsDir).filter((name) => name.endsWith(".tsx"))) {
      const source = readFileSync(join(articleComponentsDir, file), "utf8");
      expect({ file, matches: source.match(/-\[--[a-z-]+\]/g) ?? [] }).toEqual({ file, matches: [] });
    }
  });

  test("every step list accent renders a visible chip", () => {
    for (const accent of ["teal", "brand", "indigo"] as const) {
      const html = renderToStaticMarkup(<ArticleStepList steps={["One"]} accent={accent} />);
      expect(html).toMatch(/rounded-full text-xs font-bold (bg-teal-400 text-black|bg-\[#4b1bd1\] text-white|bg-indigo-100 text-indigo-600)/);
    }
    const unknown = renderToStaticMarkup(
      // @ts-expect-error generated articles can pass accents outside the union
      <ArticleStepList steps={["One"]} accent="orange" />,
    );
    expect(unknown).toContain("bg-indigo-100 text-indigo-600");
  });
});
