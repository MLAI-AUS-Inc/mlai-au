import { describe, expect, it, spyOn } from "bun:test";
import axios from "axios";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { Window } from "happy-dom";
import { initialStartupOverview, normalizeStartupOverview } from "../app/lib/startup-overview";
import { normalizeDraftedContent, normalizeMonthlyUpdate, runVibeRaisingStartupUpdate, saveVibeRaisingMonthlyUpdate } from "../app/lib/vibe-raising";
import VRPreviewUpdateCard from "../app/components/vibe-raising/VRPreviewUpdateCard";
import { StartupOverviewField } from "../app/components/vibe-raising/StartupOverview";
import UpdateArticle from "../app/components/vibe-raising/UpdateArticle";
import { recoverUpdateWorkingCopy } from "../app/lib/update-working-copy";

const introduction = "We help independent shops plan their deliveries.";

describe("saved startup introductions", () => {
  it("puts the saved introduction first in the current article reader", () => {
    const update = { id: "sample", date: "2026-10-25", month: "October", year: 2026,
      metrics: {}, summary: "We started a small trial.", highlights: "Two shops tried the planner.", startupOverview: introduction };
    const markup = renderToStaticMarkup(<MemoryRouter><UpdateArticle update={update} companyName="Example" /></MemoryRouter>);
    expect(markup.indexOf(introduction)).toBeLessThan(markup.indexOf(update.summary));
    expect(markup).toContain("What we do");
    expect(markup).not.toContain("This period in numbers");
  });

  it("keeps an unsaved introduction when a newer server revision appears", () => {
    const saved = { startupOverview: introduction, summary: "Saved summary" };
    const local = { ...saved, startupOverview: "We help independent shops plan local delivery stops.",
      expectedRevision: 1, lastSavedContent: JSON.stringify(saved) };
    expect(recoverUpdateWorkingCopy(local, { revisionId: 2 })).toBe(local);
    expect(recoverUpdateWorkingCopy({ ...saved, expectedRevision: 1, lastSavedContent: JSON.stringify(saved) }, { revisionId: 2 })).toBeNull();
  });

  it("reads generated and saved wire shapes while preserving explicit clearing", () => {
    for (const raw of [
      { startupOverview: introduction }, { startup_overview: introduction },
      { structured_memo: { startupOverview: introduction } },
      { structuredMemo: { startup_overview: introduction } },
    ]) {
      expect(normalizeStartupOverview(raw)).toBe(introduction);
      expect(normalizeDraftedContent(raw)?.startupOverview).toBe(introduction);
      expect(normalizeMonthlyUpdate({ id: 1, ...raw })?.startupOverview).toBe(introduction);
    }
    expect(normalizeDraftedContent({ startupOverview: "", structured_memo: { startupOverview: introduction } })?.startupOverview).toBe("");
    expect(normalizeMonthlyUpdate({ id: 1 })?.startupOverview).toBeUndefined();
    expect(normalizeStartupOverview({ startupOverview: ["not text"] })).toBeUndefined();
  });

  it("carries each past month's own introduction without using another month's profile", () => {
    const draft = normalizeDraftedContent({ startupOverview: introduction,
      pastMonths: [{ month: "September", startupOverview: "We helped local shops track stock." }, { month: "August" }] });
    expect(draft?.pastMonths[0].startupOverview).toBe("We helped local shops track stock.");
    expect(draft?.pastMonths[1].startupOverview).toBeUndefined();
  });

  it("prefills only a genuinely new draft and keeps an explicit empty value", () => {
    expect(initialStartupOverview(undefined, introduction, true)).toBe(introduction);
    expect(initialStartupOverview(undefined, introduction, false)).toBe("");
    expect(initialStartupOverview("", introduction, true)).toBe("");
    expect(initialStartupOverview("Our saved description.", introduction, false)).toBe("Our saved description.");
  });

  it("shows the saved introduction above update content and omits it for historical records", () => {
    const update = { id: "1", date: "2026-10-20", month: "October 2026", metrics: {},
      highlights: "We started testing the planner.", startupOverview: introduction };
    const render = (value: typeof update | Omit<typeof update, "startupOverview">) => renderToStaticMarkup(
      <MemoryRouter><VRPreviewUpdateCard update={value} user={{ companyName: "Example", shortDescription: "Today's different profile." }} showFounderActions={false} /></MemoryRouter>,
    );
    const markup = render(update);
    expect(markup.indexOf(introduction)).toBeLessThan(markup.indexOf(update.highlights));
    expect(markup).toContain("What we do");
    const { startupOverview: _, ...historical } = update;
    expect(render(historical)).not.toContain("What we do");
    expect(render(historical)).not.toContain("Today's different profile.");
  });

  it("provides an editable introduction with clear newcomer guidance", () => {
    const markup = renderToStaticMarkup(<StartupOverviewField value={introduction} onChange={() => {}} />);
    expect(markup).toContain(introduction);
    expect(markup).toContain("one or two sentences");
    expect(markup).toContain("Explain specialist terms");
    expect(markup).toContain("who can help and how");
    expect(markup).toContain("aria-describedby");
  });

  it("omits an untouched historical introduction from form submission but submits an intentional clear", () => {
    const browser = new Window();
    const formData = (value: string, edited: boolean) => {
      browser.document.body.innerHTML = renderToStaticMarkup(
        <form><input name="summary" defaultValue="An unrelated edit" /><StartupOverviewField value={value} edited={edited} onChange={() => {}} /></form>,
      );
      return new browser.FormData(browser.document.querySelector("form")!);
    };
    const historical = formData(initialStartupOverview(undefined, introduction, false), false);
    expect(historical.get("summary")).toBe("An unrelated edit");
    expect(historical.has("startupOverview")).toBe(false);
    expect(formData("", true).get("startupOverview")).toBe("");
    expect(formData(introduction, false).get("startupOverview")).toBe(introduction);
  });

  it("round-trips the founder's introduction through the save request and response", async () => {
    const create = axios.create.bind(axios);
    let sent: Record<string, unknown> = {};
    const mockCreate = spyOn(axios, "create").mockImplementation((config) => create({ ...config, adapter: async (request) => {
      sent = JSON.parse(request.data);
      return { data: { update: { id: 7, ...sent } }, status: 200, statusText: "OK", headers: {}, config: request };
    } }));
    try {
      const saved = await saveVibeRaisingMonthlyUpdate({ BACKEND_BASE_URL: "https://example.invalid" } as any,
        new Request("https://example.invalid/create"), { companyId: "example", month: "October", year: 2026,
          startupOverview: introduction, highlights: "We are testing the planner.", challenges: "", asks: "", learnings: "", next30Days: "", metrics: {} });
      expect(sent.startupOverview).toBe(introduction);
      expect(saved?.startupOverview).toBe(introduction);
    } finally {
      mockCreate.mockRestore();
    }
  });

  it("sends an explicit clear to generation and preserves introductions from monthly results", async () => {
    const sent: Array<Record<string, unknown>> = [];
    const mockFetch = spyOn(globalThis, "fetch").mockImplementation(async (_url, init) => {
      sent.push(JSON.parse(String(init?.body || "{}")));
      return Response.json({ state: "completed", currentMonth: { month: "October", year: 2026, startupOverview: introduction } });
    });
    try {
      const result = await runVibeRaisingStartupUpdate("https://example.invalid", { startupOverview: "" });
      await runVibeRaisingStartupUpdate("https://example.invalid", {});
      expect(sent[0]).toHaveProperty("startupOverview", "");
      expect(sent[1]).not.toHaveProperty("startupOverview");
      expect(result.draft?.startupOverview).toBe(introduction);
      expect(result.currentMonth?.startupOverview).toBe(introduction);
    } finally {
      mockFetch.mockRestore();
    }
  });
});
