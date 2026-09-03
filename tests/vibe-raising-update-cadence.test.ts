import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const routeSource = readFileSync(
  join(import.meta.dir, "../app/routes/vibe-raising-app.create-update.tsx"),
  "utf8",
);

describe("Vibe Raising update cadence pre-step", () => {
  test("shows Monthly and Weekly before a new update form", () => {
    expect(routeSource).toContain('type UpdateCadence = "monthly" | "weekly";');
    expect(routeSource).toContain("How often do you want to update?");
    expect(routeSource).toContain('title: "Monthly"');
    expect(routeSource).toContain('title: "Weekly"');
    expect(routeSource).toContain('badge: "Victor AI-only"');
    expect(routeSource).toContain('Weekly - Victor AI-only');
    expect(routeSource).toContain("if (!isEdit && updateCadence === null)");
    expect(routeSource).toContain('<section className="w-full rounded-[2rem]');
  });

  test("keeps the selected cadence visible and changeable in the form", () => {
    expect(routeSource).toContain("Update cadence:");
    expect(routeSource).toContain("onClick={() => setUpdateCadence(null)}");
  });

  test("shows dated week choices instead of month tabs for weekly updates", () => {
    expect(routeSource).toContain("function WeeklyUpdateTabs");
    expect(routeSource).toContain('aria-label="Update week"');
    expect(routeSource).toContain('{isWeeklyUpdate ? "Select week" : "Select month"}');
    expect(routeSource).toContain("options={createStepWeekOptions}");
    expect(routeSource).toContain("selectedKey={selectedWeekKey}");
    expect(routeSource).toContain('name="weekStart"');
    expect(routeSource).toContain('name="weekEnd"');
  });
});
