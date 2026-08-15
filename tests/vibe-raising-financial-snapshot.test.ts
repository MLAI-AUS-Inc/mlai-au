import { describe, expect, test } from "bun:test";

import {
  normalizeConciseAnalysis,
  normalizeFinancialSnapshot,
} from "../app/lib/vibe-raising";

describe("Vibe Raising financial snapshots", () => {
  test("normalizes serialized backend snapshots before review rendering", () => {
    const snapshot = normalizeFinancialSnapshot(JSON.stringify({
      schema_version: "1",
      target_month: "2026-07-01",
      as_of_date: "2026-07-31",
      currency: "AUD",
      performance: [
        { month: "2026-07-01", income: "12000", expenses: "8000", net: "4000", is_partial: false },
      ],
      revenue_mix: [
        { month: "2026-07-01", total: "12000", segments: [{ key: "sales", label: "Sales", amount: "12000" }] },
      ],
      event_contribution: [],
      overhead: [],
    }));

    expect(snapshot).toEqual({
      schemaVersion: "1",
      targetMonth: "2026-07-01",
      asOfDate: "2026-07-31",
      currency: "AUD",
      generatedAt: null,
      performance: [
        { month: "2026-07-01", income: 12000, expenses: 8000, net: 4000, isPartial: false, basis: null },
      ],
      revenueMix: [
        { month: "2026-07-01", total: 12000, segments: [{ key: "sales", label: "Sales", amount: 12000 }] },
      ],
      eventContribution: [],
      overhead: [],
      dataQuality: null,
    });
  });

  test("normalizes serialized concise analysis", () => {
    expect(normalizeConciseAnalysis(JSON.stringify({
      headline: "July finished ahead of plan.",
      bullets: ["Revenue grew.", "Costs stayed controlled.", "Cash improved.", "Ignore this fourth point."],
    }))).toEqual({
      headline: "July finished ahead of plan.",
      bullets: ["Revenue grew.", "Costs stayed controlled.", "Cash improved."],
    });
  });
});
