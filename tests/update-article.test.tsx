import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import UpdateArticle, {
  updateArticlePoints,
} from "../app/components/vibe-raising/UpdateArticle";

const base = {
  id: "42",
  month: "September",
  year: 2026,
  date: "2026-09-11",
  summary: "Our month in a few words.",
  highlights: "Delivered a programme.\nWelcomed new founders.",
  challenges: "",
  learnings: "",
  next30Days: "",
  asks: "",
  metrics: { revenue: "AUD 0" },
  metricEvidence: { revenue: { source_provider: "xero", quality: "verified" } },
  reportingPeriod: {
    is_partial: true,
    cutoff: "2026-09-10T15:02:00Z",
    timezone: "Australia/Melbourne",
  },
};
const render = (value: any) =>
  renderToStaticMarkup(
    <MemoryRouter>
      <UpdateArticle update={value} companyName="MLAI" />
    </MemoryRouter>,
  );

describe("shared update article", () => {
  test("narrative precedes financial context, with all dot points visible", () => {
    const html = render(base);
    expect(html.indexOf("Delivered a programme.")).toBeLessThan(
      html.indexOf("This period in numbers"),
    );
    expect(html).toContain("Welcomed new founders.");
    expect(html).toContain("AUD 0");
    expect(html).toContain("Month to date");
    expect(html).toMatch(/11 Sep(?:t)? 2026/);
    expect(html).not.toContain("Show all");
  });
  test("keeps a whole point with multiple sentences, URLs and source references", () => {
    const text =
      "We shipped version 1.2. Feedback arrived. [source](https://example.test/report)";
    expect(updateArticlePoints(text)).toEqual([text]);
    const html = render({ ...base, highlights: text });
    expect(html).toContain("We shipped version 1.2. Feedback arrived.");
    expect(html).toContain("<summary>1 source</summary>");
    expect(html).toContain('href="https://example.test/report"');
  });
  test("pre-revenue updates do not get empty financial sections, and legacy values stay labelled", () => {
    expect(render({ ...base, metrics: {} })).not.toContain(
      "This period in numbers",
    );
    expect(
      render({
        ...base,
        metricEvidence: {
          revenue: { quality: "founder_asserted", source_provider: "founder" },
        },
      }),
    ).toContain("Founder reported");
  });
});
