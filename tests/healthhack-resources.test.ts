import { describe, expect, test } from "bun:test";

import {
  MEDHACK_SCHEDULE,
  MEDHACK_SECTIONS,
} from "../app/data/medhack-frontiers";

const RESOURCE_ROUTES = [
  "app/routes/healthhack.tsx",
  "app/routes/hospital.app.resources.tsx",
];

describe("HealthHack resources", () => {
  test("shows only the supplied Saturday and Sunday schedule", () => {
    expect(MEDHACK_SCHEDULE).toHaveLength(2);
    expect(MEDHACK_SCHEDULE.map((day) => day.dateTime)).toEqual([
      "2026-07-18",
      "2026-07-19",
    ]);
    expect(MEDHACK_SCHEDULE.every((day) => day.location === "Stone & Chalk Tech Central")).toBe(true);
  });

  test("includes the Large Tract semifinal and top-six final pathway", () => {
    const sunday = MEDHACK_SCHEDULE[1];
    expect(sunday.timeSlots).toContainEqual(
      expect.objectContaining({
        start: "4:00 PM",
        name: expect.stringContaining("Large Tract semifinals"),
      }),
    );
    expect(sunday.timeSlots).toContainEqual(
      expect.objectContaining({
        start: "6:15 PM",
        name: expect.stringContaining("top six pitching teams"),
      }),
    );
  });

  test("removes retired resource sections from navigation and both resource views", async () => {
    const sectionIds = MEDHACK_SECTIONS.map((section) => section.id);
    expect(sectionIds).not.toContain("subtopics");
    expect(sectionIds).not.toContain("venue");
    expect(sectionIds).not.toContain("mentor-schedules");
    expect(sectionIds).toContain("pitching-finals");

    for (const path of RESOURCE_ROUTES) {
      const source = await Bun.file(path).text();
      expect(source).not.toMatch(/MedhackSubtopics|MedhackVenue|MedhackMentorSchedule/);
      expect(source).toContain("MedhackPitchingFinals");
    }
  });

  test("promotes the pitching guide and uses indigo title treatments", async () => {
    const pitching = await Bun.file("app/routes/hospital.app.pitching.tsx").text();
    const coding = await Bun.file("app/routes/hospital.app.coding.tsx").text();
    const finals = await Bun.file("app/components/medhack/MedhackPitchingFinals.tsx").text();

    expect(pitching).toContain("Learn How to Pitch Your Idea");
    expect(pitching).toContain("/articles/featured/how-to-pitch-your-idea");
    expect(finals).toContain("/articles/featured/how-to-pitch-your-idea");
    expect(pitching).toContain("from-indigo-600 via-indigo-800 to-indigo-950");
    expect(coding).toContain("from-indigo-600 via-indigo-800 to-indigo-950");
    expect(pitching).not.toContain("from-[#783f8e] via-[#5a2d6a] to-[#2d1245]");
    expect(coding).not.toContain("from-[#783f8e] via-[#5a2d6a] to-[#2d1245]");
  });
});
