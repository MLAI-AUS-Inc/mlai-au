import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import ArticleAdmissionNotice, { admissionRecovery } from "../app/components/ArticleAdmissionNotice";
import { normalizeMarketingRun } from "../app/lib/vibe-marketing";

const fixture = { schema_version: "2026-09-11.1", error_code: "article_task_dispatch_uncertain", observed_at: "2026-09-11T00:00:00+00:00" };
const render = (value: unknown = fixture, companyId = "owner/one", refreshing = false) => renderToStaticMarkup(
  <ArticleAdmissionNotice value={value} companyId={companyId} onRefresh={() => { throw new Error("Rendering must not start recovery"); }} refreshing={refreshing} />,
);

describe("non-terminal article admission observations", () => {
  for (const error_code of Object.keys(admissionRecovery)) test(`${error_code} explains a bounded recovery without submitting a start`, () => {
    const html = render({ ...fixture, error_code, error: "UNTRUSTED DETAIL", next_action: "start_and_charge", auto_refunded: true });
    expect(html).toContain("earlier start attempt, not the current run outcome");
    expect(html).toContain("does not fail the article, approve a retry or refund points");
    expect(html).toContain(error_code);
    expect(html).not.toContain("UNTRUSTED DETAIL");
    expect(html).not.toContain("<form");
    expect(html).not.toContain('type="submit"');
    expect(html).toContain('type="button"');
    expect(html).toContain('href="/founder-tools/marketing/editorial?companyId=owner%2Fone"');
    expect(html).toContain('target="_blank" rel="noopener"');
  });
  for (const value of [null, {}, [], "bad", { ...fixture, schema_version: "future" },
                      { ...fixture, error_code: "toString" }, { ...fixture, observed_at: "yesterday" }]) {
    test(`invalid notice is not a control instruction: ${JSON.stringify(value)}`, () => expect(render(value)).toBe(""));
  }
  test("refresh is non-mutating and disabled while status is being checked", () => {
    const html = render(fixture, "", true);
    expect(html).toContain("Refreshing status…");
    expect(html).toContain('disabled=""');
    expect(html).not.toContain("href=");
  });
  test("the actual route renders the backend-owned history and only revalidates on refresh", () => {
    const route = readFileSync(new URL("../app/routes/founder-tools.marketing.run.tsx", import.meta.url), "utf8");
    expect(route).toContain("<ArticleAdmissionNotice value={run.result?.article_admission_notice} companyId={bootstrap.company.id}");
    expect(route).toContain('onRefresh={() => { setPolledRun(null); revalidator.revalidate(); }} refreshing={revalidator.state !== "idle"}');
  });
  test("normalizing a polling response retains notice history without making the run failed or resumable", () => {
    const run = normalizeMarketingRun({ runId: "original", workflow: "article_generation", status: "running",
      resumeAvailable: false, result: { article_admission_notice: fixture } });
    expect(run.result?.article_admission_notice).toEqual(fixture);
    expect(run.status).toBe("running");
    expect(run.resumeAvailable).toBe(false);
    expect(run.errorCode).toBeNull();
  });
});
