import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import VibeRaisingProgressPanel from "../app/components/VibeRaisingProgressPanel";
import { renderUpdateEditor } from "./helpers/update-editor-render";
const answers = { highlights: "Shipped a trial.", challenges: "Need onboarding feedback.", learnings: "Shorter prompts helped." };
const percent = (html: string) => Number(html.match(/aria-label="Draft progress"[^>]*aria-valuenow="(\d+)"/)?.[1]);

describe("compact update progress", () => {
  test("the gallery moves from Draft to Refine once the founder has writing", () => {
    expect(renderUpdateEditor({})).toContain('<li aria-current="step">Draft</li>');
    for (const writing of [{ highlights: "Shipped a trial.\nReceived our first feedback." }, answers, { summary: "Our latest chapter" }]) {
      const html = renderUpdateEditor(writing);
      expect(html).toContain('<li aria-current="step">Refine</li>');
      expect(html.match(/aria-current="step"/g)).toHaveLength(1);
      expect(html).not.toContain('aria-label="Draft progress"');
    }
  });
  test("keeps three quiet steps and makes connections part of drafting", () => {
    const html = renderToStaticMarkup(<VibeRaisingProgressPanel activeStep="connect" progress={{draft:.4}} />);
    expect(html.match(/data-stepper-step=/g)).toHaveLength(3);
    expect(html).toMatch(/data-stepper-step="draft"[^>]*aria-current="step"/);
    expect(html).not.toContain("You’re here");
    expect(percent(html)).toBe(40);
  });
  test("review and send stay locked until the saved draft has three answers", () => {
    const locked = renderUpdateEditor({ highlights: answers.highlights }, true);
    expect(locked).toMatch(/<button[^>]*disabled=""[^>]*>Approve update/);
    const ready = renderUpdateEditor(answers, true);
    expect(ready).not.toMatch(/<button[^>]*disabled=""[^>]*>Approve update/);
    expect(ready.match(/aria-current="step"/g)).toHaveLength(1);
    expect(ready).toContain("Approve update");
  });
});
