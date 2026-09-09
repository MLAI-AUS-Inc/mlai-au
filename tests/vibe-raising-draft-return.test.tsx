import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import CreateUpdate from "../app/routes/vibe-raising-app.create-update";
import {
  buildVibeRaisingDraftReturnPath,
  readVibeRaisingDraftReturnState,
  type VibeRaisingDraftReturnState,
} from "../app/lib/vibe-raising-draft-return";

const createPath = "/founder-tools/updates/create";

function renderDraft(path: string, existingData: Record<string, unknown> | null = null) {
  const url = new URL(path, "http://mlai.local");
  const router = createMemoryRouter([{
    id: "create",
    path: createPath,
    Component: CreateUpdate,
  }], {
    initialEntries: [path],
    hydrationData: { loaderData: { create: {
      user: { companies: [], companyName: "Test startup", companyRegistered: true },
      existingData,
      isEdit: Boolean(existingData),
      backendBaseUrl: "http://127.0.0.1:8000",
      resumeEmailDrafting: false,
      selectedInputSources: url.searchParams.get("inputs")?.split(",") || [],
      draftReturnState: readVibeRaisingDraftReturnState(url.search),
      existingMonthlyUpdates: [],
    } } },
  });
  try {
    return renderToStaticMarkup(createElement(RouterProvider, { router }));
  } finally {
    router.dispose();
  }
}

describe("Vibe Raising connection return", () => {
  const periods: VibeRaisingDraftReturnState[] = [
    { cadence: "monthly", month: "August", year: 2026 },
    { cadence: "weekly", month: "September", year: 2026, weekStart: "2026-08-31" },
    { cadence: "weekly", month: "January", year: 2026, weekStart: "2025-12-29" },
  ];

  for (const period of periods) {
    for (const source of ["stripe", "xero"]) {
      test(`returns to the ${period.cadence} template for ${period.weekStart || period.month} after selecting ${source}`, () => {
        const returnPath = buildVibeRaisingDraftReturnPath(createPath, "?edit=42&utm_source=reminder", period, []);
        const connectionUrl = new URL(`/founder-tools/data-sources?next=${encodeURIComponent(returnPath)}`, "http://mlai.local");
        // The connection page preserves `next` and replaces only the chosen inputs.
        const target = new URL(connectionUrl.searchParams.get("next")!, "http://mlai.local");
        target.searchParams.set("inputs", source);
        expect(readVibeRaisingDraftReturnState(target.search)).toEqual(period);
        expect(target.searchParams.get("edit")).toBe("42");
        expect(target.searchParams.get("utm_source")).toBe("reminder");

        const markup = renderDraft(`${target.pathname}${target.search}`);
        expect(markup).toContain('id="vibe-raising-draft-review-form"');
        expect(markup).toContain(`name="month" value="${period.month}"`);
        expect(markup).toContain(`name="year" value="${period.year}"`);
        expect(markup).toContain(`name="updateCadence" value="${period.cadence}"`);
        expect(markup).not.toContain("How often do you want to update?");
        expect(markup).not.toContain("Select the month this update covers.");
        if (period.weekStart) expect(markup).toContain(`name="weekStart" value="${period.weekStart}"`);

        // Leaving for another connection must keep restoring the same template.
        const connectHref = markup.match(/href="(\/founder-tools\/data-sources\?next=[^"]+)"/)?.[1];
        expect(connectHref).toBeDefined();
        const nextConnection = new URL(connectHref!.replaceAll("&amp;", "&"), "http://mlai.local");
        const repeatedTarget = new URL(nextConnection.searchParams.get("next")!, "http://mlai.local");
        expect(readVibeRaisingDraftReturnState(repeatedTarget.search)).toEqual(period);
        expect(repeatedTarget.searchParams.get("inputs")).toBe(source);
      });
    }
  }

  test("fresh creation and source-only links still start at cadence selection", () => {
    for (const search of ["", "?inputs=stripe"]) {
      expect(readVibeRaisingDraftReturnState(search)).toBeNull();
      expect(renderDraft(`${createPath}${search}`)).toContain("How often do you want to update?");
    }
  });

  test("returning without a connected source still opens the template", () => {
    const path = buildVibeRaisingDraftReturnPath(createPath, "?inputs=stripe", periods[0], []);
    expect(new URL(path, "http://mlai.local").searchParams.has("inputs")).toBe(false);
    expect(renderDraft(path)).toContain('id="vibe-raising-draft-review-form"');
  });

  test("edit links still open the existing draft without a return marker", () => {
    const markup = renderDraft(`${createPath}?edit=42`, { month: "August", year: 2026, highlights: "Existing draft" });
    expect(markup).toContain('id="vibe-raising-draft-review-form"');
    expect(markup).toContain("Existing draft");
  });

  test("missing or malformed return state does not bypass period selection", () => {
    const valid = "?step=template&cadence=weekly&month=September&year=2026&weekStart=2026-08-31";
    for (const search of [
      "?step=template", valid.replace("weekly", "daily"), valid.replace("2026-08-31", "2026-08-32"),
      valid.replace("2026-08-31", "2026-09-01"), valid.replace("September", "August"),
      valid.replace("year=2026", "year=oops"), valid.replace("weekStart=2026-08-31", ""),
    ]) expect(readVibeRaisingDraftReturnState(search)).toBeNull();
  });

  test("changing cadence or leaving before period confirmation removes stale return state", () => {
    const previous = "?edit=42&step=template&cadence=weekly&month=September&year=2026&weekStart=2026-08-31&inputs=xero";
    const monthly = new URL(buildVibeRaisingDraftReturnPath(createPath, previous, periods[0], ["stripe"]), "http://mlai.local");
    expect(monthly.searchParams.has("weekStart")).toBe(false);
    expect(readVibeRaisingDraftReturnState(monthly.search)).toEqual(periods[0]);
    const unconfirmed = new URL(buildVibeRaisingDraftReturnPath(createPath, previous, null, []), "http://mlai.local");
    expect(unconfirmed.search).toBe("?edit=42");
  });
});
