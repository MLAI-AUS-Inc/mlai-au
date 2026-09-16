import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildVibeRaisingFinancialSurveyQuestion } from "../app/lib/vibe-raising-survey";

const routePath = fileURLToPath(new URL("../app/routes/vibe-raising-app.create-update.tsx", import.meta.url));
const apiPath = fileURLToPath(new URL("../app/lib/vibe-raising.ts", import.meta.url));
const routeSource = readFileSync(routePath, "utf8");
const apiSource = readFileSync(apiPath, "utf8");

describe("Monthly revision publication", () => {
  test("submits a reviewed revision rather than a separate MLAI delivery", () => {
    expect(routeSource).toContain('name="intent" value="publish"');
    expect(routeSource).not.toContain('if (intent === "send-to-mlai")');
    expect(routeSource).toContain('const revisionId = Number(formData.get("revisionId"))');
    expect(routeSource).toContain('const revisionHash = String(formData.get("revisionHash")');
    expect(routeSource).toContain('companyId: activeCompanyId, revisionId, revisionHash');
  });

  test("uses the saved disclosure in the approval form", () => {
    expect(routeSource).toContain('const reviewAudienceVisibility = normalizeAudienceVisibilityValue(reviewData?.audienceVisibility)');
    expect(routeSource).toContain('{reviewAudienceVisibility.map((audience) => (');
    expect(routeSource).toContain('VibeRaisingAudienceVisibilityField');
    expect(apiSource).toContain('encodeURIComponent(updateId)}/publish/`, approval)');
    expect(routeSource).not.toContain('grade: "A+"');
  });

  test("explains the exact saved revision in the final confirmation", () => {
    expect(routeSource).toContain('<UpdateDialog title="Approve this update?"');
    expect(routeSource).toContain('Approve this revision');
    expect(routeSource).toContain('Approve the saved revision you just reviewed');
    expect(routeSource).not.toContain('Only members of the Vibe Raising development team can access this submission.');
  });

  test("adapts the financial survey question to the selected connector", () => {
    expect(buildVibeRaisingFinancialSurveyQuestion([])).toEqual({
      key: "connectorValueClear",
      label: "Was it clear what connecting Stripe or Xero would add to your update?",
      context: "connector_value",
    });
    expect(buildVibeRaisingFinancialSurveyQuestion(["stripe"])).toEqual({
      key: "importedMetricsUseful",
      label: "Did the financial metrics imported from Stripe look correct and useful?",
      context: "imported_metrics",
    });
    expect(buildVibeRaisingFinancialSurveyQuestion(["xero"])).toEqual({
      key: "importedMetricsUseful",
      label: "Did the financial metrics imported from Xero look correct and useful?",
      context: "imported_metrics",
    });
    expect(buildVibeRaisingFinancialSurveyQuestion(["xero", "stripe"])).toEqual({
      key: "importedMetricsUseful",
      label: "Did the financial metrics imported from Stripe and Xero look correct and useful?",
      context: "imported_metrics",
    });
  });
});
