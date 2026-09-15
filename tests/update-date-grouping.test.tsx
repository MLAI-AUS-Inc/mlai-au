import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import StartupUpdatesPage from "../app/components/vibe-raising/StartupUpdatesPage";
import { getUpdatePeriod, getUpdateTitles, getUpdateTimeLabels, groupStartupUpdatesByMonth, sortStartupUpdates, getUpdatesFinancialSeries } from "../app/lib/startup-updates-presentation";
import { fixtureUpdate, financialUpdate } from "./startup-updates-presentation.test";
import { renderUpdateEditor } from "./helpers/update-editor-render";
import { defaultUpdateSourceWindow, toLocalDateTime } from "../app/lib/update-source-window";

const updates = [
  fixtureUpdate("a", "2026-09", { updateDate: "2026-09-08", firstPublishedAt: "2026-09-08T04:00:00Z" }),
  fixtureUpdate("b", "2026-09", { updateDate: "2026-09-15", firstPublishedAt: "2026-09-15T02:00:00Z" }),
  fixtureUpdate("c", "2026-08", { datePrecision: "month", date: "2026-09-15T04:00:00Z" }),
];

describe("independent update dates", () => {
  test("source ranges use the last explicit cutoff and Melbourne daylight saving", () => {
    const now = Date.parse("2026-11-01T00:00:00Z");
    expect(defaultUpdateSourceWindow([], "2026-10-04", "Australia/Melbourne", null, now)?.end).toBe("2026-10-04T13:00:00.000Z");
    const previous = { ...updates[1], narrativePeriod: { start: "2026-09-01T00:00:00Z", end: "2026-09-15T01:30:00Z", timezone: "Australia/Melbourne" } };
    expect(defaultUpdateSourceWindow([previous], "2026-09-15", "Australia/Melbourne", "new", now)?.start).toBe("2026-09-15T01:30:00.000Z");
    expect(toLocalDateTime("broken recovery data")).toBe("");
  });
  test("latest can feature several updates from the same month", () => {
    expect(sortStartupUpdates(updates).map(item => item.id)).toEqual(["b", "a", "c"]);
    expect([...getUpdateTitles(updates).values()]).toEqual(["8th September Update", "15th September Update", "August Update"]);
  });
  test("publication date controls grouping independently of financial month", () => {
    const moved = { ...updates[0], updateDate: "2026-10-01", date: "2026-11-01" };
    expect(getUpdatePeriod(moved)).toMatchObject({ month: "2026-10", date: "2026-10-01" });
    expect(groupStartupUpdatesByMonth([moved, ...updates.slice(1)]).map(group => group.label)).toEqual(["October 2026", "September 2026", "August 2026"]);
  });
  test("month-only legacy updates never inherit their import day", () => {
    expect(getUpdatePeriod(updates[2]).date).toBeNull();
  });
  test("same-day posts have deterministic time labels and ignore edits", () => {
    const posts = [updates[1], { ...updates[1], id: "d", date: "2026-12-01", firstPublishedAt: "2026-09-15T01:00:00Z" }];
    expect(sortStartupUpdates(posts).map(item => item.id)).toEqual(["b", "d"]);
    expect(new Set(getUpdateTimeLabels(posts).values()).size).toBe(2);
    posts[1].firstPublishedAt = posts[0].firstPublishedAt;
    expect(new Set(getUpdateTimeLabels(posts).values()).size).toBe(2);
  });
  test("archive has month sections with all of each month's cards", () => {
    const html = renderToStaticMarkup(<MemoryRouter initialEntries={["/founder-tools/updates?view=all"]}><StartupUpdatesPage user={{ companyName: "MLAI", role: "founder" }} updates={updates} financialSeries={null} /></MemoryRouter>);
    expect(html).toContain('id="updates-month-2026-09"');
    expect(html).toContain('id="updates-month-2026-08"');
    expect((html.match(/href="\/founder-tools\/updates\/[abc]"/g) || []).length).toBe(3);
    expect(html.indexOf("15th September Update")).toBeLessThan(html.indexOf("8th September Update"));
  });
  test("repeated financial snapshots are not summed", () => {
    const snapshot = financialUpdate();
    const series = getUpdatesFinancialSeries([snapshot, { ...snapshot, id: "second", updateDate: "2026-09-15" }], [{ key: "xero", status: "connected" }]);
    expect(series!.points.filter(point => point.month === "2026-08")).toHaveLength(1);
    expect(series!.points.at(-1)!.income).toBe(51793);
  });
  test("new drafts have their own creation key and one date input", () => {
    const key = "15f58a09-65b6-41e5-bfc3-0b43f3a5f8e1";
    const html = renderUpdateEditor({}, false, { existingData: null, existingMonthlyUpdates: updates, creationKey: key, isEdit: false });
    expect(html).toContain(`name="creationKey" value="${key}"`);
    expect(html).toContain('name="updateDate" value="2026-09-15"');
    expect(html).toContain('aria-label="Highlights point 1"');
    expect(html).not.toContain("A product milestone.");
    expect(html).not.toContain('aria-label="Update cadence"');
  });
});
