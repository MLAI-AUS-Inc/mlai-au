import { describe, expect, test } from "bun:test";
import { getUpdateDraftDateError } from "../app/lib/update-draft-date";
import { renderUpdateEditor } from "./helpers/update-editor-render";

describe("AI draft date validation", () => {
    const today = "2026-09-17";

    test("explains the missing exact date on a month-only legacy update", () => {
        expect(getUpdateDraftDateError("", today)).toBe("Choose an update date before creating an AI draft.");
        const html = renderUpdateEditor({ month: "September", year: 2026, updateDate: null });
        expect(html).toContain('name="updateDate" value=""');
        expect(html).toContain('aria-describedby="update-date-hint"');
        expect(html).toContain("exact date not recorded. Choose an update date to create a fresh AI draft.");
    });

    test("accepts today, past dates and the earliest supported date", () => {
        for (const date of [today, "2026-09-01", "2026-08-31", "2025-01-01", "2028-02-29"]) {
            expect(getUpdateDraftDateError(date, "2028-03-01")).toBeNull();
        }
        expect(getUpdateDraftDateError(today, today)).toBeNull();
    });

    test("rejects future days within the current month using reporting-zone today", () => {
        expect(getUpdateDraftDateError("2026-09-18", today)).toBe("Choose today or an earlier update date.");
        expect(getUpdateDraftDateError("2026-10-01", today)).toBe("Choose today or an earlier update date.");
        expect(getUpdateDraftDateError("2024-12-31", today)).toBe("Choose an update date on or after 1 January 2025.");
    });

    test("rejects malformed and impossible dates instead of silently normalizing them", () => {
        for (const date of ["2026-09", "not-a-date", "2026-02-29", "2026-09-31", "2026-13-01"]) {
            expect(getUpdateDraftDateError(date, today)).toBe("Choose a valid update date before creating an AI draft.");
        }
    });
});
