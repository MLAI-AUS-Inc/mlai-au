import { afterEach, describe, expect, test } from "bun:test";
import {
  updateWorkingCopyKey,
  readUpdateWorkingCopy,
  writeUpdateWorkingCopy,
  isFinancialMetric,
} from "../app/lib/update-working-copy";
const original = globalThis.window;
afterEach(() => {
  globalThis.window = original;
});
function storage() {
  const entries = new Map<string, string>();
  globalThis.window = {
    localStorage: {
      getItem: (key: string) => entries.get(key),
      setItem: (key: string, value: string) => entries.set(key, value),
    },
  } as any;
  return entries;
}

describe("working copy recovery", () => {
  test("recovers text and pending AI without mixing founders, startups, or periods", () => {
    storage();
    const key = updateWorkingCopyKey("1", "mlai", "September:2026");
    const copy = {
      summary: "My newer writing",
      highlights: "One point\nAnother point",
      candidate: { summary: "AI proposal", revisionId: 12 },
      expectedRevision: 11,
      metrics: { monthlyCosts: "0" },
    };
    expect(writeUpdateWorkingCopy(key, copy)).toBe(true);
    expect(readUpdateWorkingCopy(key)).toEqual(copy);
    expect(
      readUpdateWorkingCopy(
        updateWorkingCopyKey("2", "mlai", "September:2026"),
      ),
    ).toBeNull();
    expect(
      readUpdateWorkingCopy(
        updateWorkingCopyKey("1", "other", "September:2026"),
      ),
    ).toBeNull();
    expect(
      readUpdateWorkingCopy(updateWorkingCopyKey("1", "mlai", "August:2026")),
    ).toBeNull();
  });
  test("corrupt or unavailable browser storage leaves server hydration usable", () => {
    const entries = storage();
    entries.set("broken", "not json");
    expect(readUpdateWorkingCopy("broken")).toBeNull();
    globalThis.window = {
      get localStorage() {
        throw new Error("blocked");
      },
    } as any;
    expect(readUpdateWorkingCopy("draft")).toBeNull();
    expect(writeUpdateWorkingCopy("draft", {})).toBe(false);
  });
  test("known financial fields and custom imported finance fields remain locked", () => {
    expect(isFinancialMetric("revenue")).toBe(true);
    expect(
      isFinancialMetric("ticketSales", { source_provider: "stripe" }),
    ).toBe(true);
    expect(
      isFinancialMetric("cashMovements", { source_provider: "bank_feed" }),
    ).toBe(true);
    expect(
      isFinancialMetric("activeUsers", { source_provider: "google_analytics" }),
    ).toBe(false);
  });
});
