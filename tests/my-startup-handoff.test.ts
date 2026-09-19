import { describe, expect, test } from "bun:test";
import { parseStartupResearch, startupHandoffDestination } from "../app/lib/my-startup-handoff";

describe("My startup handoff", () => {
  test("retains the original run, selection, and paid request identity", () => {
    const research = { brief: { subject: "Trees" }, step: 2, runId: "original-run", requestId: "original-paid-request", selected: ["proposal-1"] };
    expect(parseStartupResearch(JSON.stringify(research))).toEqual(research);
    for (const value of [null, "null", "true", "[]", "{broken"]) expect(parseStartupResearch(value)).toEqual({});
  });
  test("accepts configured production and staging Chat origins", () => {
    for (const origin of ["https://chat.mlai.au", "https://chat.staging.mlai.au", "http://localhost:4174"])
      expect(startupHandoffDestination(`${origin}/my-startup/handoff?token=opaque`, origin).origin).toBe(origin);
  });
  test("rejects unrelated hosts, credentials, fragments, and routes", () => {
    for (const candidate of [null, "https://evil.test/my-startup/handoff", "https://chat.mlai.au.evil.test/my-startup/handoff", "https://user:pass@chat.mlai.au/my-startup/handoff", "https://chat.mlai.au/my-startup/handoff#secret", "https://chat.mlai.au/other", "http://chat.mlai.au/my-startup/handoff"])
      expect(() => startupHandoffDestination(candidate, "https://chat.mlai.au")).toThrow();
  });
});
