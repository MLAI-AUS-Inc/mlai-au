import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import CreateUpdate from "../app/routes/vibe-raising-app.create-update";
import VibeRaisingProgressPanel from "../app/components/VibeRaisingProgressPanel";
import { getVibeRaisingDraftProgress } from "../app/lib/vibe-raising-progress";

const answerFields = ["highlights", "challenges", "learnings", "next30Days", "asks"];

function renderUpdate(answers: Record<string, string>, review = false) {
  const data = { month: "August", year: 2026, revisionId: 12, revisionHash: "reviewed-hash", companyId: "test-company", ...answers };
  const router = createMemoryRouter([{ id: "update", path: "/create", Component: CreateUpdate }], {
    initialEntries: ["/create?edit=42"],
    hydrationData: {
      loaderData: { update: {
        metricDefinitions: [],
        user: { authUser: { id: "test-founder" }, companies: [], companyName: "Test startup", companyRegistered: true },
        existingData: data,
        isEdit: true,
        backendBaseUrl: "http://127.0.0.1:8000",
        resumeEmailDrafting: false,
        selectedInputSources: [],
        draftReturnState: null,
        existingMonthlyUpdates: [],
      } },
      ...(review ? { actionData: { update: { step: "feedback", feedback: {}, data } } } : {}),
    },
  });
  try { return renderToStaticMarkup(<RouterProvider router={router} />); }
  finally { router.dispose(); }
}

function draftPercent(markup: string) {
  return Number(markup.match(/aria-label="Draft update progress"[^>]*aria-valuenow="(\d+)"/)?.[1]);
}

describe("Vibe Raising vertical progress", () => {
  test("cadence and period each advance progress without requiring a connector", () => {
    expect(getVibeRaisingDraftProgress(false, false, 0)).toBe(0);
    expect(getVibeRaisingDraftProgress(true, false, 0)).toBeGreaterThan(0);
    expect(getVibeRaisingDraftProgress(true, true, 0)).toBeGreaterThan(getVibeRaisingDraftProgress(true, false, 0));
  });

  test("each meaningful founder answer advances the actual draft panel once", () => {
    const answers: Record<string, string> = {};
    let previous = draftPercent(renderUpdate(answers));
    for (const field of answerFields) {
      answers[field] = "A useful founder answer.";
      const next = draftPercent(renderUpdate(answers));
      expect(next).toBeGreaterThan(previous);
      answers[field] += " More detail in the same answer.";
      expect(draftPercent(renderUpdate(answers))).toBe(next);
      previous = next;
    }
    expect(previous).toBe(100);
    answers.asks = " \n- \n• ";
    expect(draftPercent(renderUpdate(answers))).toBeLessThan(100);
  });

  test("draft navigation highlights writing, not connections, and locks review/send", () => {
    const markup = renderUpdate({ highlights: "Shipped a trial." });
    expect(markup).toMatch(/data-stepper-step="draft"[^>]*aria-current="step"/);
    expect(markup).toMatch(/data-stepper-step="review"[^>]*disabled=""/);
    expect(markup).toMatch(/data-stepper-step="publish"[^>]*disabled=""/);
    expect(markup.match(/aria-current="step"/g)).toHaveLength(1);
    expect(markup).not.toContain('<nav aria-label="Monthly update progress"');
    expect(markup).not.toContain('aria-label="Draft progress"');
  });

  test("review unlocks sending only at three answers and treats connections as optional", () => {
    const answers = { highlights: "Shipped a trial.", challenges: "Need onboarding feedback." };
    const locked = renderUpdate(answers, true);
    expect(locked).toMatch(/data-stepper-step="review"[^>]*aria-current="step"/);
    expect(locked).toMatch(/data-stepper-step="publish"[^>]*disabled=""/);
    const ready = renderUpdate({ ...answers, learnings: "Shorter prompts helped." }, true);
    expect(ready).not.toMatch(/data-stepper-step="publish"[^>]*disabled=""/);
    expect(ready).toContain("Skipped · optional");
    expect(ready.match(/data-stepper-step=/g)).toHaveLength(4);
  });

  test("connections remain current without falsely completing the draft", () => {
    const markup = renderToStaticMarkup(<VibeRaisingProgressPanel activeStep="connect" progress={{ draft: 2 / 7, connect: 0.5 }} />);
    expect(markup).toMatch(/data-stepper-step="connect"[^>]*aria-current="step"/);
    expect(draftPercent(markup)).toBe(29);
    expect(markup).not.toContain('data-complete="true"');
  });

  test("all four steps remain present and invalid progress cannot overfill a segment", () => {
    const markup = renderToStaticMarkup(<VibeRaisingProgressPanel activeStep="publish" progress={{ draft: Infinity, connect: -1, review: 3, publish: 0.75 }} />);
    expect(markup.match(/data-stepper-step=/g)).toHaveLength(4);
    expect(draftPercent(markup)).toBe(0);
    expect(markup).toMatch(/aria-label="Connect data progress"[^>]*aria-valuenow="0"/);
    expect(markup).toMatch(/aria-label="Review progress"[^>]*aria-valuenow="100"/);
    expect(markup).toContain('stroke-dashoffset="25"');
  });
});
