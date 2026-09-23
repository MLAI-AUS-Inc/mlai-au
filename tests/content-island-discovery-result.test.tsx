import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";

import ContentIslandDiscoveryResult from "../app/components/ContentIslandDiscoveryResult";

function render(status: string) {
  return renderToStaticMarkup(
    <MemoryRouter>
      <ContentIslandDiscoveryResult status={status} runId="research-123" onRefresh={() => {}} />
    </MemoryRouter>,
  );
}

describe("content island discovery result", () => {
  test("links an awaiting-confirmation run to its review and topic selection page", () => {
    const markup = render("awaiting_confirmation");
    expect(markup).toContain('href="/founder-tools/marketing/runs/research-123"');
    expect(markup).toContain("Review article ideas");
    expect(markup).toContain("Choose an idea from the research result");
    expect(markup).not.toContain("Updating the topic picker");
  });

  test("keeps a completed empty result actionable without showing a progress spinner", () => {
    const markup = render("completed");
    expect(markup).toContain("no new eligible idea");
    expect(markup).toContain('href="/founder-tools/marketing/runs/research-123"');
    expect(markup).toContain("Check for ideas again");
  });

  test("does not claim an unfinished run is ready", () => {
    expect(render("running")).toBe("");
  });
});
