export type VibeRaisingFinancialSurveyContext = "imported_metrics" | "connector_value";
export type VibeRaisingFinancialSurveyQuestionKey = "importedMetricsUseful" | "connectorValueClear";
export type VibeRaisingFinancialSurveySourceKey = "stripe" | "xero";

const FINANCIAL_SURVEY_SOURCE_LABELS: Record<VibeRaisingFinancialSurveySourceKey, string> = {
  stripe: "Stripe",
  xero: "Xero",
};

export function buildVibeRaisingFinancialSurveyQuestion(sourceKeys: readonly string[]): {
  key: VibeRaisingFinancialSurveyQuestionKey;
  label: string;
  context: VibeRaisingFinancialSurveyContext;
} {
  const selectedSourceKeys = (["stripe", "xero"] as const).filter((key) => sourceKeys.includes(key));

  if (selectedSourceKeys.length === 0) {
    return {
      key: "connectorValueClear",
      label: "Was it clear what connecting Stripe or Xero would add to your update?",
      context: "connector_value",
    };
  }

  const sourceLabel = selectedSourceKeys
    .map((key) => FINANCIAL_SURVEY_SOURCE_LABELS[key])
    .join(" and ");

  return {
    key: "importedMetricsUseful",
    label: `Did the financial metrics imported from ${sourceLabel} look correct and useful?`,
    context: "imported_metrics",
  };
}
