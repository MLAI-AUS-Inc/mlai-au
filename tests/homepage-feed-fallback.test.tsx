import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import UpcomingEvents from "../app/components/UpcomingEvents";

test("the empty events representation acknowledges the feed may be unavailable", () => {
  const html = renderToStaticMarkup(<UpcomingEvents events={[]} />);
  expect(html).toContain("The feed may be empty or unavailable.");
  expect(html).not.toContain("No upcoming events at this time");
});

test("homepage event cards use the organiser's date and time in every host timezone", () => {
  const event = {
    _id: "midnight",
    name: "Community night",
    startDate: "2026-10-18T23:30:00Z",
    timezone: "Australia/Melbourne",
    eventLocation: { address: "Melbourne" },
    slug: "night",
    published: true,
    source: "luma" as const,
  };
  const script = `import React from 'react'; import { renderToStaticMarkup } from 'react-dom/server'; import UpcomingEvents from './app/components/UpcomingEvents.tsx'; console.log(renderToStaticMarkup(React.createElement(UpcomingEvents, {events: ${JSON.stringify([event])}})));`;
  const renders = ["UTC", "America/Los_Angeles", "Australia/Melbourne"].map(
    (TZ) => {
      const result = Bun.spawnSync([process.execPath, "-e", script], {
        cwd: process.cwd(),
        env: { ...process.env, TZ },
      });
      expect(result.exitCode).toBe(0);
      return result.stdout.toString();
    },
  );
  expect(renders[0]).toBe(renders[1]);
  expect(renders[0]).toBe(renders[2]);
  expect(renders[0]).toContain(">19</div>");
  expect(renders[0]).toContain("10:30");
  expect(renders[0]).toContain("AEDT");
});
