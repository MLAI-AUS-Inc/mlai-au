import { afterEach, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { EXAMPLE_AI_PILOT } from "../app/lib/ai-pilot-economics";
import { appendPilotNotes, createStudioPilotHandoff, isCurrentStudioPilotHandoff, PILOT_BRIEF_MAX_LENGTH, PILOT_HANDOFF_MAX_AGE_MS,
  stageStudioPilotHandoff, takeStudioPilotHandoff } from "../app/lib/studio-pilot-handoff";
import { buildStudioProjectPayload, EMPTY_STUDIO_PROJECT_BRIEF } from "../app/lib/mlai-studio-project";
import MlaiStudioProjectForm from "../app/components/MlaiStudioProjectForm";

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
afterEach(() => {
  if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
  else Reflect.deleteProperty(globalThis, "window");
});
const browser = () => Object.defineProperty(globalThis, "window", { configurable: true, value: {} });

test("export includes current inputs and limitations, not fictional agreed requirements", () => {
  const handoff = createStudioPilotHandoff({ ...EXAMPLE_AI_PILOT, cashablePercent: 50 }, "Draft only; no sending", 1000);
  expect(handoff.text).toContain("monthlyCashChange: 125.00");
  expect(handoff.text).toContain("Draft only; no sending");
  expect(handoff.text).toContain("estimate, not a measured result");
  expect(Object.keys(handoff)).toEqual(["createdAt", "text"]);
  expect(Object.isFrozen(handoff)).toBe(true);
});
test("rejects invalid or oversized handoffs and handles clock boundaries", () => {
  expect(() => createStudioPilotHandoff({ ...EXAMPLE_AI_PILOT, monthlyTasks: -1 }, "")).toThrow();
  expect(() => createStudioPilotHandoff(EXAMPLE_AI_PILOT, "x".repeat(PILOT_BRIEF_MAX_LENGTH + 1))).toThrow();
  expect(() => createStudioPilotHandoff(EXAMPLE_AI_PILOT, "", NaN)).toThrow();
  const handoff = createStudioPilotHandoff(EXAMPLE_AI_PILOT, "", 1000);
  expect(isCurrentStudioPilotHandoff(handoff, 1000)).toBe(true);
  expect(isCurrentStudioPilotHandoff(handoff, 999)).toBe(false);
  expect(isCurrentStudioPilotHandoff(handoff, 1000 + PILOT_HANDOFF_MAX_AGE_MS - 1)).toBe(true);
  expect(isCurrentStudioPilotHandoff(handoff, 1000 + PILOT_HANDOFF_MAX_AGE_MS)).toBe(false);
});
test("server rendering cannot create cross-reader pending state", () => {
  Reflect.deleteProperty(globalThis, "window");
  expect(stageStudioPilotHandoff(EXAMPLE_AI_PILOT, "must not retain")).toBe(false);
  expect(takeStudioPilotHandoff()).toBeUndefined();
});
test("same-tab handoff is one-use, expires, and requires no storage or network API", () => {
  browser(); // No history, storage, navigation or fetch methods exist on this window.
  expect(stageStudioPilotHandoff(EXAMPLE_AI_PILOT, "first", 1000)).toBe(true);
  expect(takeStudioPilotHandoff(1001)?.text).toContain("first");
  expect(takeStudioPilotHandoff(1002)).toBeUndefined();
  stageStudioPilotHandoff(EXAMPLE_AI_PILOT, "expired", 1000);
  expect(takeStudioPilotHandoff(1000 + PILOT_HANDOFF_MAX_AGE_MS)).toBeUndefined();
  stageStudioPilotHandoff(EXAMPLE_AI_PILOT, "old", 1000);
  stageStudioPilotHandoff(EXAMPLE_AI_PILOT, "new", 1001);
  const latest = takeStudioPilotHandoff(1002)!;
  expect(latest.text).toContain("\nnew\n");
  expect(latest.text).not.toContain("\nold\n");
});
test("failed replacement cannot leave an older draft available", () => {
  browser();
  stageStudioPilotHandoff(EXAMPLE_AI_PILOT, "old", 1000);
  expect(() => stageStudioPilotHandoff({ ...EXAMPLE_AI_PILOT, monthlyTasks: -1 }, "bad", 1001)).toThrow();
  expect(takeStudioPilotHandoff(1002)).toBeUndefined();
});
test("adding notes preserves existing prose; payload requires explicit form consent", () => {
  const notes = appendPilotNotes("Previously tried a template.", createStudioPilotHandoff(EXAMPLE_AI_PILOT, "Review first"));
  expect(notes).toStartWith("Previously tried a template.\n\n");
  expect(notes).toContain("not agreed project requirements");
  const brief = { ...EMPTY_STUDIO_PROJECT_BRIEF, previousAttempts: notes };
  const payload = buildStudioProjectPayload(brief, { clientRef: "test-only" });
  expect(payload.anything_else).toContain(notes);
  expect(payload.projects).toBe("");
  expect(payload.consent).toBe(false);
  expect(payload.email).toBe("");
});
test("server form has explicit masking and does not expose another reader's worksheet", () => {
  const html = renderToStaticMarkup(<MlaiStudioProjectForm />);
  expect(html).toContain('data-clarity-mask="true"');
  expect(html).not.toContain("monthlyCashChange");
  expect(html).not.toContain('checked=""');
});
