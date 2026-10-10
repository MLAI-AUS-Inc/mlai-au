import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import Team from "../app/components/team";
import { teamRoster } from "../app/data/team-roster";

test("both layouts render the roster and safely default to Callum", () => {
  const html = renderToStaticMarkup(<Team initialFighterId="retired" />);
  for (const member of teamRoster) {
    expect(html.split(`aria-label="Select ${member.name}"`)).toHaveLength(3);
  }
  expect(html.match(/aria-pressed="true"/g)).toHaveLength(2);
  expect(html.match(/CALLUM HOLT/g)).toHaveLength(2);
  expect(html.match(/src="\/press-kit\/team-callum-holt.jpg"/g)).toHaveLength(2);
  expect(html.match(/Loading character artwork/g)).toHaveLength(2);
  expect(html).not.toContain("firebasestorage.googleapis.com");
  expect(html).not.toContain("token=");
  expect(html.match(/href="\/platform\/login\?app=esafety&amp;next=\/esafety\/dashboard"/g)).toHaveLength(2);
});

test("valid initial IDs resolve profile content in both layouts", () => {
  const html = renderToStaticMarkup(<Team initialFighterId="sam-donegan" />);
  expect(html.match(/SAM DONEGAN/g)).toHaveLength(2);
  expect(html.match(/href="https:\/\/www.linkedin.com\/in\/samueldonegan\/"/g)).toHaveLength(3);
});
