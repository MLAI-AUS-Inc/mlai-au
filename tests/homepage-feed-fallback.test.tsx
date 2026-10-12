import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import UpcomingEvents from "../app/components/UpcomingEvents";

test("the empty events representation acknowledges the feed may be unavailable", () => {
  const html = renderToStaticMarkup(<UpcomingEvents events={[]} />);
  expect(html).toContain("The feed may be empty or unavailable.");
  expect(html).not.toContain("No upcoming events at this time");
});
