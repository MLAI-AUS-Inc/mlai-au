import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import MentorsPage, {
  CHAT_MENTORING_URL,
  MENTOR_INTEREST_MAILTO,
  meta,
} from "../app/routes/mentors";
import { PUBLIC_INDEXABLE_PAGES } from "../app/lib/public-pages";

function render() {
  const Page = MentorsPage as unknown as () => JSX.Element;
  return renderToStaticMarkup(
    <MemoryRouter>
      <Page />
    </MemoryRouter>,
  );
}

describe("mentors page", () => {
  test("has the canonical link, title and description", () => {
    const tags = meta({} as never) as Array<Record<string, string>>;
    expect(tags).toContainEqual({ title: "Mentor at MLAI | MLAI" });
    expect(tags).toContainEqual({ tagName: "link", rel: "canonical", href: "https://mlai.au/mentors" });
    expect(tags.some((tag) => tag.name === "description" && tag.content.length > 40)).toBe(true);
  });

  test("renders the hero, the chat call to action and the mailto", () => {
    const html = render();
    expect(html).toContain("Mentor at MLAI");
    expect(html).toContain("Got an invite? Open MLAI Chat");
    expect(html).toContain(`href="${CHAT_MENTORING_URL}"`);
    expect(html).toContain(`href="${MENTOR_INTEREST_MAILTO.replaceAll("&", "&amp;")}"`);
    expect(html).toContain('href="/roo"');
    expect(CHAT_MENTORING_URL).toBe("https://chat.mlai.au/mentoring");
    expect(MENTOR_INTEREST_MAILTO).toStartWith("mailto:hi@mlai.au?");
  });

  test("never carries an invite token", () => {
    const html = render();
    expect(html).not.toContain("mentor_invite");
    expect(html).not.toContain("token=");
  });

  test("is listed as a public indexable page", () => {
    expect(PUBLIC_INDEXABLE_PAGES).toContain("/mentors");
  });
});
