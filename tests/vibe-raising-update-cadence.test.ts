import { describe, expect, test } from "bun:test";
import { renderUpdateEditor } from "./helpers/update-editor-render";

describe("cadence is part of the continuous form", () => {
  test("fresh monthly creation shows the editable draft immediately", () => {
    const html = renderUpdateEditor({}, false, { existingData: null, existingMonthlyUpdates: [], isEdit: false });
    expect(html).toContain('id="update-summary"');
    expect(html).toContain('aria-label="Highlights point 1"');
    expect(html).toContain('aria-label="Update month"');
    expect(html).toContain('name="updateCadence" value="monthly"');
    expect(html).not.toContain("How often do you want to update?");
  });
  test("weekly return links keep their dated period and Victor AI cadence", () => {
    const html = renderUpdateEditor({}, false, { draftReturnState: {cadence:"weekly",month:"September",year:2026,weekStart:"2026-08-31"} });
    expect(html).toContain('aria-label="Update week"');
    expect(html).toContain('name="weekStart" value="2026-08-31"');
    expect(html).toContain('name="updateCadence" value="weekly"');
    expect(html).toContain("Weekly · Victor AI");
  });
});
