import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const routePath = fileURLToPath(new URL("../app/routes/vibe-raising-app.create-update.tsx", import.meta.url));
const routeSource = readFileSync(routePath, "utf8");

describe("Vibe Raising founder requirements", () => {
  test("replaces manual financial metric fields with Stripe and Xero connectors", () => {
    expect(routeSource).toContain('const FINANCIAL_METRIC_SOURCE_KEYS = ["stripe", "xero"] as const;');
    expect(routeSource).toContain("financialMetricSources.map");
    expect(routeSource).toContain("Manual metric entry is not available.");
    expect(routeSource).toContain("Connect {source.label}");
    expect(routeSource).not.toContain("draft-metric-");
  });

  test("requires three founder-question answers in the UI and action", () => {
    expect(routeSource).toContain("const REQUIRED_FOUNDER_QUESTION_COUNT = 3;");
    expect(routeSource).toContain('new Set(["review", "save-draft", "send-to-mlai", "publish"])');
    expect(routeSource).toContain("countAnsweredFounderQuestions(formData)");
    expect(routeSource).toContain("isSubmitting || !hasMinimumFounderAnswers");
    expect(routeSource).toContain("isSubmitting || !canSubmitReviewToMlai");
    expect(routeSource).toContain("before saving or submitting");
  });
});
