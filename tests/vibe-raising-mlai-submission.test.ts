import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { buildVibeRaisingFinancialSurveyQuestion } from "../app/lib/vibe-raising-survey";

const routePath = fileURLToPath(new URL("../app/routes/vibe-raising-app.create-update.tsx", import.meta.url));
const apiPath = fileURLToPath(new URL("../app/lib/vibe-raising.ts", import.meta.url));
const routeSource = readFileSync(routePath, "utf8");
const apiSource = readFileSync(apiPath, "utf8");

describe("Vibe Raising MLAI submission", () => {
  test("uses one Send to MLAI action without investor publishing UI", () => {
    expect(routeSource).toContain('primaryLabel={isSubmitting ? "Sending..." : "Send to MLAI"}');
    expect(routeSource).toContain('name="intent" value="send-to-mlai"');
    expect(routeSource).not.toContain("Publish update");
    expect(routeSource).not.toContain("We found <strong");
    expect(routeSource).not.toContain("VibeRaisingAudienceVisibilityField");
  });

  test("captures feedback consent and keeps MLAI submissions private", () => {
    expect(routeSource).toContain("Would you like feedback from MLAI?");
    expect(routeSource).toContain("Yes, send me feedback");
    expect(routeSource).toContain("No feedback needed");
    expect(routeSource).toContain('audienceVisibility: ["just_me"]');
    expect(routeSource).toContain('submissionDestination: "mlai"');
    expect(apiSource).toContain("mlaiFeedbackOptIn?: boolean | null;");
    expect(apiSource).toContain("submissionDestination?: string | null;");
  });

  test("opens a private final-check dialog with the end-of-flow survey", () => {
    expect(routeSource).toContain("setShowSendToMlaiConfirmation(true)");
    expect(routeSource).toContain('aria-labelledby="send-to-mlai-confirmation-title"');
    expect(routeSource).toContain("Send this update to MLAI?");
    expect(routeSource).toContain("Only members of the Vibe Raising development team can access this submission.");
    expect(routeSource).toContain("Confirm and send to MLAI");
    expect(routeSource).toContain("Did the guided questions help you explain your progress, challenges, and support needs?");
    expect(routeSource).toContain("Did the final preview feel accurate enough to send without major edits?");
    expect(routeSource).not.toContain("Was this experience easy to navigate?");
    expect(routeSource).not.toContain("Did the flow feel too text-heavy?");
    expect(routeSource).not.toContain("Would you use this update flow again?");
    expect(routeSource).not.toContain("Final check");
    expect(routeSource).not.toContain("Private to the Vibe Raising development team");
    expect(routeSource).not.toContain("Quick optional survey");
    expect(routeSource).not.toContain("These answers are optional and will be included privately with your MLAI submission.");
    expect(routeSource).toContain("END_OF_FLOW_SURVEY_STEP_COUNT = END_OF_FLOW_SURVEY_CORE_QUESTIONS.length + 2");
    expect(routeSource).toContain("endOfFlowSurveyQuestions[endOfFlowSurveyStep]");
    expect(routeSource).toContain("HandThumbUpSolidIcon");
    expect(routeSource).toContain("HandThumbDownSolidIcon");
    expect(routeSource).toContain('from "@heroicons/react/24/solid"');
    expect(routeSource).toContain("hover:-translate-y-1 hover:shadow-xl");
    expect(routeSource).toContain("group-hover:-rotate-6");
    expect(routeSource).toContain("group-hover:rotate-6");
    expect(routeSource).toContain('aria-label={label}');
    expect(routeSource).not.toContain("Choose a thumb, or continue without answering.");
    expect(routeSource).toContain("setEndOfFlowSurveyStep((current) => Math.min(");
    expect(routeSource).toContain(">\n                                        Skip\n");
    expect(routeSource).toContain("What would make your next update faster or more useful?");
    expect(routeSource).toContain('name="surveyComments"');
    expect(apiSource).toContain("surveyFinancialQuestionContext?: VibeRaisingFinancialSurveyContext | null;");
    expect(apiSource).toContain("surveyImportedMetricsUseful?: boolean | null;");
    expect(apiSource).toContain("surveyConnectorValueClear?: boolean | null;");
    expect(apiSource).toContain("surveyGuidedQuestionsUseful?: boolean | null;");
    expect(apiSource).toContain("surveyPreviewAccurate?: boolean | null;");
    expect(apiSource).toContain("surveyComments?: string | null;");
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
