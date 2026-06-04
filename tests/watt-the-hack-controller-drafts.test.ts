import { describe, expect, test } from "bun:test";

import {
  draftNeedsConfirm,
  emptyWorkspace,
  entryFor,
  isDirty,
  parseWorkspace,
  serializeWorkspace,
  setApplied,
  setDraft,
  type ControllerWorkspace,
} from "../app/lib/watt-the-hack-sandbox/controller-drafts";

const FALLBACK = "def controller(state):\n    return {}\n";

describe("controller-drafts workspace", () => {
  test("entryFor seeds a fresh scenario with the fallback for both slices", () => {
    const ws = emptyWorkspace();
    expect(entryFor(ws, "duck_curve", FALLBACK)).toEqual({
      applied: FALLBACK,
      draft: FALLBACK,
    });
  });

  test("entryFor returns a copy, not the stored reference", () => {
    let ws = setDraft(emptyWorkspace(), "duck_curve", "code", FALLBACK);
    const entry = entryFor(ws, "duck_curve", FALLBACK);
    entry.draft = "mutated";
    expect(entryFor(ws, "duck_curve", FALLBACK).draft).toBe("code");
  });

  test("setDraft updates the draft and preserves the applied source", () => {
    let ws = setApplied(emptyWorkspace(), "duck_curve", "APPLIED", FALLBACK);
    ws = setDraft(ws, "duck_curve", "DRAFT", FALLBACK);
    expect(entryFor(ws, "duck_curve", FALLBACK)).toEqual({
      applied: "APPLIED",
      draft: "DRAFT",
    });
  });

  test("setApplied updates the applied source and preserves the draft", () => {
    let ws = setDraft(emptyWorkspace(), "duck_curve", "DRAFT", FALLBACK);
    ws = setApplied(ws, "duck_curve", "DRAFT", FALLBACK);
    expect(isDirty(entryFor(ws, "duck_curve", FALLBACK))).toBe(false);
  });

  test("edits to one scenario never leak into another", () => {
    let ws = setDraft(emptyWorkspace(), "duck_curve", "DUCK", FALLBACK);
    ws = setDraft(ws, "frequency_frenzy", "FREQ", FALLBACK);
    expect(entryFor(ws, "duck_curve", FALLBACK).draft).toBe("DUCK");
    expect(entryFor(ws, "frequency_frenzy", FALLBACK).draft).toBe("FREQ");
  });

  test("setDraft is immutable — the source workspace is untouched", () => {
    const ws = emptyWorkspace();
    setDraft(ws, "duck_curve", "code", FALLBACK);
    expect(ws.byScenario).toEqual({});
  });
});

describe("controller-drafts dirty + confirm logic", () => {
  test("isDirty is true only when draft differs from applied", () => {
    expect(isDirty({ applied: "a", draft: "a" })).toBe(false);
    expect(isDirty({ applied: "a", draft: "b" })).toBe(true);
  });

  test("no confirm when the draft is already applied", () => {
    expect(draftNeedsConfirm("same", "same", [])).toBe(false);
  });

  test("no confirm when the dirty draft is an unmodified known template", () => {
    expect(draftNeedsConfirm("TEMPLATE_B", "TEMPLATE_A", ["TEMPLATE_A", "TEMPLATE_B"])).toBe(false);
  });

  test("confirm when the dirty draft is custom hand-written code", () => {
    expect(draftNeedsConfirm("my custom code", "TEMPLATE_A", ["TEMPLATE_A"])).toBe(true);
  });
});

describe("controller-drafts persistence", () => {
  test("round-trips a populated workspace", () => {
    let ws = setApplied(emptyWorkspace(), "duck_curve", "APPLIED", FALLBACK);
    ws = setDraft(ws, "duck_curve", "DRAFT", FALLBACK);
    ws = setDraft(ws, "gauntlet", "G", FALLBACK);
    const restored = parseWorkspace(serializeWorkspace(ws));
    expect(restored).toEqual(ws);
  });

  test("returns an empty workspace for non-JSON", () => {
    expect(parseWorkspace("not json{")).toEqual(emptyWorkspace());
  });

  test("returns an empty workspace when byScenario is missing", () => {
    expect(parseWorkspace(JSON.stringify({ v: 1 }))).toEqual(emptyWorkspace());
  });

  test("drops malformed entries but keeps valid ones", () => {
    const raw = JSON.stringify({
      v: 1,
      byScenario: {
        good: { applied: "a", draft: "b" },
        missingDraft: { applied: "a" },
        notAnObject: "nope",
        nullEntry: null,
      },
    });
    const ws: ControllerWorkspace = parseWorkspace(raw);
    expect(Object.keys(ws.byScenario)).toEqual(["good"]);
    expect(ws.byScenario.good).toEqual({ applied: "a", draft: "b" });
  });
});
