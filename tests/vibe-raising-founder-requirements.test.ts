import { describe, expect, test } from "bun:test";
import { renderUpdateEditor } from "./helpers/update-editor-render";

describe("founder form requirements", () => {
  test("shows the saved narrative as individually editable points", () => {
    const html = renderUpdateEditor({ highlights:"First thing shipped.\nSecond thing shipped." });
    expect(html).toContain('aria-label="Highlights point 1"');
    expect(html).toContain('aria-label="Highlights point 2"');
    expect(html).toContain('aria-label="Add Highlights point"');
    expect(html).toContain('aria-label="Remove Highlights point 2"');
    expect(html).not.toContain("founder questions answered.");
    expect(html).not.toContain("Connect data for AI drafting");
    expect(html).not.toContain("Financial metrics</h2>");
  });
  test("financial values render as outputs, preserving zero and their form values", () => {
    const html = renderUpdateEditor({ revenue:"AUD 100",monthlyCosts:"AUD 0",metrics:{revenue:"AUD 100",monthlyCosts:"AUD 0"},metricEvidence:{revenue:{source_provider:"xero",quality:"verified"}} });
    expect(html).toContain('<output id="draft-figure-revenue">AUD 100</output>');
    expect(html).toContain('<output id="draft-figure-monthlyCosts">AUD 0</output>');
    expect(html).toContain('type="hidden" name="revenue" value="AUD 100"');
    expect(html).not.toContain('<input id="draft-figure-revenue"');
  });
  test("an incomplete draft can be saved, but needs three answers for review", () => {
    const html = renderUpdateEditor({ highlights: "Shipped a trial." });
    expect(html).toMatch(/<button type="button" class="update-button secondary">Save draft<\/button>/);
    expect(html).toMatch(/<button type="submit"[^>]*disabled=""/);
    expect(html).toContain("Answer any 3 sections to review.");
  });
});
