import { beforeEach, describe, expect, mock, test } from "bun:test";
const api = await import("../app/lib/vibe-raising");
const save = mock(async (env: any, request: any, payload: any) => ({
  id: "42",
  ...payload,
  revisionId: 12,
  revisionHash: "server-hash",
  metricEvidence: { revenue: { source_provider: "xero", quality: "verified" } },
  reportingPeriod: { is_partial: true },
}));
mock.module("../app/lib/vibe-raising", () => ({
  ...api,
  requireVibeRaisingFounder: async () => ({
    appUser: { companies: [{ id: "startup-1" }] },
  }),
  saveVibeRaisingMonthlyUpdate: save,
  createVibeRaisingLocalDraftUpdateCookie: () => null,
}));
mock.module("../app/lib/env.server", () => ({ getEnv: () => ({}) }));
const { action } = await import("../app/routes/vibe-raising-app.create-update");
async function submit(intent: string, extra: Record<string, string> = {}) {
  const form = new FormData();
  Object.entries({
    intent,
    companyId: "startup-1",
    month: "September",
    year: "2026",
    expectedRevision: "11",
    ...extra,
  }).forEach(([key, value]) => form.set(key, value));
  const response = await action({
    request: new Request("http://local.test/create", {
      method: "POST",
      body: form,
    }),
    context: {},
    params: {},
  } as any);
  return response instanceof Response ? response.json() : response;
}
beforeEach(() => save.mockClear());
describe("editor save and review action", () => {
  test("saves an incomplete draft against its company and exact revision", async () => {
    expect(
      (await submit("save-draft", { summary: "An unfinished thought" }))?.step,
    ).toBe("draft-saved");
    expect(save.mock.calls[0][2]).toMatchObject({
      companyId: "startup-1",
      expectedRevision: 11,
      saveMode: "draft",
      summary: "An unfinished thought",
    });
  });
  test("blocks review until three meaningful narrative sections are present", async () => {
    expect(
      (
        await submit("review", {
          highlights: "Shipped a pilot",
          challenges: "- \n•",
        })
      )?.step,
    ).toBe("validation-error");
    expect(save).not.toHaveBeenCalled();
  });
  test("returns the server revision and evidence for the review instead of browser provenance", async () => {
    const result = await submit("review", {
      highlights: "Shipped a pilot",
      challenges: "Need feedback",
      learnings: "Shorter sessions helped",
    });
    expect(result?.step).toBe("feedback");
    expect(result?.data).toMatchObject({
      revisionId: 12,
      revisionHash: "server-hash",
      companyId: "startup-1",
      metricEvidence: {
        revenue: { source_provider: "xero", quality: "verified" },
      },
      reportingPeriod: { is_partial: true },
    });
  });
  test("returns a conflict inline so the working draft stays mounted", async () => {
    save.mockImplementationOnce(async () => {
      throw { response: { data: { detail: "A newer revision was saved." } } };
    });
    expect(
      await submit("save-draft", { summary: "Keep my unsaved text" }),
    ).toMatchObject({
      step: "validation-error",
      error: "A newer revision was saved.",
    });
  });
});
