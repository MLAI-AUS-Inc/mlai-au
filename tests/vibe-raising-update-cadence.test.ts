import { describe, expect, test } from "bun:test";
import { renderUpdateEditor } from "./helpers/update-editor-render";

describe("updates have dates without a cadence choice", () => {
  test("fresh creation shows the editable draft immediately", () => {
    const html = renderUpdateEditor({}, false, { existingData: null, existingMonthlyUpdates: [], isEdit: false });
    expect(html).toContain('id="update-summary"');
    expect(html).toContain('aria-label="Highlights point 1"');
    expect(html).toContain('id="update-date"');
    expect(html).not.toContain('name="updateCadence"');
    expect(html).not.toContain("How often do you want to update?");
  });
  test("legacy weekly links open the same date-based editor", () => {
    const html = renderUpdateEditor({}, false, { draftReturnState: {cadence:"weekly",month:"September",year:2026,weekStart:"2026-08-31"} });
    expect(html).toContain('id="update-date"');
    expect(html).not.toContain('aria-label="Update week"');
    expect(html).not.toContain("Weekly · Victor AI");
  });
});
