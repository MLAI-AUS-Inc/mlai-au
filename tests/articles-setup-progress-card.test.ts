import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import ArticlesSetupProgressCard from "../app/components/ArticlesSetupProgressCard";
import type { VibeMarketingRunSummary } from "../app/types/vibe-marketing";

function codeReviewReadyRun(reason: string | null): VibeMarketingRunSummary {
  const setup: Record<string, unknown> = { status: "code_review_ready" };
  if (reason !== null) setup.preview_unsupported_reason = reason;
  return {
    runId: "setup-code-review-1",
    workflow: "article_system_setup",
    domain: "statdoctor.app",
    githubRepo: "DrAnuG1995/website",
    // A code-review-ready park sits at the setup approval gate; the setup payload
    // carries the terminal "code_review_ready" status the card branches on.
    status: "awaiting_approval",
    currentStep: "build_preview",
    stepOrder: [],
    steps: [],
    warnings: [],
    errors: [],
    artifacts: [],
    diagnostics: {},
    result: { article_system_setup: setup },
  };
}

describe("articles setup progress card", () => {
  test("renders the specific preview-unsupported reason on a code_review_ready park", () => {
    const reason = "The hosted preview deployed, but the app server crashed on boot because it requires production secrets.";
    const markup = renderToStaticMarkup(
      createElement(ArticlesSetupProgressCard, { run: codeReviewReadyRun(reason) }),
    );

    expect(markup).toContain("Articles setup ready for code review");
    expect(markup).toContain("The hosted preview deployed, but the app server crashed on boot");
    expect(markup).toContain("Open the setup build to review the code changes, then approve setup PR creation.");
    // The generic stack fallback must NOT appear when a real reason is known.
    expect(markup).not.toContain("supported for this site");
  });

  test("falls back to the generic stack sentence when no preview-unsupported reason is present", () => {
    const markup = renderToStaticMarkup(
      createElement(ArticlesSetupProgressCard, { run: codeReviewReadyRun(null) }),
    );

    expect(markup).toContain("Articles setup ready for code review");
    expect(markup).toContain("supported for this site");
    expect(markup).toContain("Open the setup build to review the code changes, then approve setup PR creation.");
  });

  test("explains a baseline build block and does not render it as an active build", () => {
    const run = codeReviewReadyRun(null);
    run.status = "running";
    run.result = {
      article_system_setup: {
        status: "code_review_ready",
        baseline_build_blocked: true,
        code_review_reason: "Build error: Error: supabaseUrl is required.",
      },
    };

    const markup = renderToStaticMarkup(createElement(ArticlesSetupProgressCard, { run }));

    expect(markup).toContain("Articles setup ready for code review");
    expect(markup).toContain("No GitHub Action was dispatched");
    expect(markup).toContain("supabaseUrl is required");
    expect(markup).not.toContain("Building articles setup preview");
    expect(markup).not.toContain("supported for this site");
  });
});
