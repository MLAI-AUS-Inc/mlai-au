import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import VibeRaisingProgressPanel from "../app/components/VibeRaisingProgressPanel";
import { renderUpdateEditor } from "./helpers/update-editor-render";
const answers = { highlights: "Shipped a trial.", challenges: "Need onboarding feedback.", learnings: "Shorter prompts helped." };
const percent = (html: string) => Number(html.match(/aria-label="Draft progress"[^>]*aria-valuenow="(\d+)"/)?.[1]);

describe("compact update progress", () => {
  test("each meaningful section contributes once, including multiple dot points", () => {
    expect(percent(renderUpdateEditor({}))).toBe(0);
    expect(percent(renderUpdateEditor({ highlights: "Shipped a trial.\nReceived our first feedback." }))).toBe(20);
    expect(percent(renderUpdateEditor(answers))).toBe(60);
    expect(percent(renderUpdateEditor({ ...answers, next30Days: "Ship onboarding.", asks: "Find a designer." }))).toBe(100);
    expect(percent(renderUpdateEditor({ ...answers, asks: " \n- \n• " }))).toBe(60);
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
    expect(locked).toMatch(/data-stepper-step="publish"[^>]*disabled=""/);
    const ready = renderUpdateEditor(answers, true);
    expect(ready).not.toMatch(/data-stepper-step="publish"[^>]*disabled=""/);
    expect(ready.match(/aria-current="step"/g)).toHaveLength(1);
    expect(ready).toContain("Approve update");
  });
});
