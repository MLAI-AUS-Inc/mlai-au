import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";

import VibeMarketingAuthorsSetup from "../app/components/VibeMarketingAuthorsSetup";
import type { VibeMarketingAuthor } from "../app/types/vibe-marketing";

function renderAuthors({
  authors = [],
  defaultAuthorId = null,
  isSubmitting = false,
}: {
  authors?: VibeMarketingAuthor[];
  defaultAuthorId?: string | null;
  isSubmitting?: boolean;
} = {}) {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: createElement(VibeMarketingAuthorsSetup, {
          authors,
          defaultAuthorId,
          isSubmitting,
        }),
      },
    ],
    { initialEntries: ["/"] },
  );

  return renderToStaticMarkup(createElement(RouterProvider, { router }));
}

function elementContaining(markup: string, tag: "input" | "button", text: string) {
  const elements = markup.match(new RegExp(`<${tag}[^>]*>(?:[^<]*)</${tag}>|<${tag}[^>]*>`, "g")) ?? [];
  return elements.find((element) => element.includes(text)) ?? "";
}

function hasDisabledAttribute(element: string) {
  return /\sdisabled(?:=""|(?=[\s>]))/.test(element);
}

describe("vibe marketing authors setup", () => {
  test("keeps empty author fields visually active while limiting only unavailable actions", () => {
    const markup = renderAuthors();
    const nameInput = elementContaining(markup, "input", 'placeholder="Dr Sam Donegan"');
    const saveButton = elementContaining(markup, "button", "Save authors");

    expect(markup).toContain("Add a name to set as default");
    expect(markup).toContain("border-slate-300 bg-white");
    expect(markup).not.toContain("bg-gray-50/70");
    expect(hasDisabledAttribute(nameInput)).toBe(false);
    expect(hasDisabledAttribute(saveButton)).toBe(true);
  });

  test("highlights a saved default author and enables saving", () => {
    const markup = renderAuthors({
      authors: [
        {
          id: "devashi-desai",
          name: "Devashi Desai",
          role: "Founder & CEO",
          bio: "Founder and community builder.",
        },
      ],
      defaultAuthorId: "devashi-desai",
    });
    const saveButton = elementContaining(markup, "button", "Save authors");

    expect(markup).toContain("Default byline");
    expect(markup).toContain("border-violet-200 ring-1 ring-violet-100");
    expect(hasDisabledAttribute(saveButton)).toBe(false);
  });
});
