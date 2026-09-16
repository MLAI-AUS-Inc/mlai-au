import { expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import AuthorBio from "../app/components/AuthorBio";

test("contributor metadata does not automatically assert a review occurred", () => {
  const html = renderToStaticMarkup(<AuthorBio author={{ name: "Example Contributor", role: "Writer", bio: "An explicitly supplied biography." }} />);
  expect(html).toContain("Example Contributor");
  expect(html).toContain("An explicitly supplied biography.");
  expect(html).not.toContain("human-edited");
  expect(html).not.toContain("reviewed");
  expect(html).not.toContain("AI-assisted");
});

test("multiple contributor credits and an absent credit retain their existing behaviour", () => {
  const html = renderToStaticMarkup(<AuthorBio authors={[{ name: "First Writer" }, { name: "Second Writer" }]} />);
  expect(html).toContain("First Writer");
  expect(html).toContain("Second Writer");
  expect(renderToStaticMarkup(<AuthorBio />)).toBe("");
});
