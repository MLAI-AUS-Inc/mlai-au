import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";

import ArticleSystemConnectionPanel from "../app/components/ArticleSystemConnectionPanel";
import type {
  VibeMarketingArticleSetupState,
  VibeMarketingBootstrap,
  VibeMarketingGithubReposResponse,
  VibeMarketingRunSummary,
} from "../app/types/vibe-marketing";

function baseBootstrap(overrides: Partial<VibeMarketingBootstrap> = {}): VibeMarketingBootstrap {
  return {
    company: {
      id: "company-1",
      name: "StatDoctor",
      domain: "statdoctor.app",
      organizationId: 1,
    },
    organization: {
      id: 1,
      name: "StatDoctor",
      domain: "statdoctor.app",
      competitors: [],
      seedKeywords: [],
    },
    settings: {
      githubRepo: "DrAnuG1995/website",
      dailyDiscoveryEnabled: false,
      githubConnectionState: "connected",
    },
    startupProfile: {
      founderNames: [],
    },
    websiteBaseline: {},
    googleBaselineConnection: {
      connected: false,
      hasBaselineScopes: false,
    },
    checks: {
      github: { passed: true },
      scaffold: { passed: true, setupRunId: "setup-old-1", setupStatus: "completed" },
    },
    articleSetupState: null,
    latestRuns: [],
    latestRunsByWorkflow: {},
    topicCandidates: [],
    topicPillars: [],
    hiddenTopicCandidates: [],
    declinedTopicFeedback: [],
    draftArticles: [],
    writtenTopics: [],
    publishEvidence: {},
    guidedSteps: [],
    workflowProgress: null,
    ...overrides,
  };
}

function githubRepos(): VibeMarketingGithubReposResponse {
  return {
    status: "connected",
    connectionState: "connected",
    githubRepo: "DrAnuG1995/website",
    repos: [
      {
        fullName: "DrAnuG1995/website",
        owner: "DrAnuG1995",
        name: "website",
        defaultBranch: "main",
      },
    ],
  };
}

function blockedScanRun(): VibeMarketingRunSummary {
  return {
    runId: "scan-failed-fresh",
    workflow: "repo_scan",
    domain: "statdoctor.app",
    githubRepo: "DrAnuG1995/website",
    status: "blocked",
    currentStep: "validate_plan",
    stepOrder: [],
    steps: [],
    warnings: [],
    errors: ["No build script was found for the repository web app."],
    blockingReason: "No build script was found for the repository web app.",
    blockingCode: "ARTICLE_DIRECTORY_UNSUPPORTED_RUNTIME",
    artifacts: [],
    diagnostics: {},
    result: {
      scan_purpose: "inventory",
      blocking_reason: "No build script was found for the repository web app.",
      blocking_code: "ARTICLE_DIRECTORY_UNSUPPORTED_RUNTIME",
    },
  };
}

function staleArticleSetupState(): VibeMarketingArticleSetupState {
  return {
    repo: "DrAnuG1995/website",
    githubRepo: "DrAnuG1995/website",
    scanRunId: "scan-failed-fresh",
    scanStatus: "blocked",
    scanStale: false,
    setupRunId: "setup-old-1",
    setupStatus: "completed",
    setupRunStatus: "completed",
    generationReady: true,
    published: true,
    routePath: "/articles",
    source: "config",
  };
}

function renderPanel({
  bootstrap = baseBootstrap(),
  articleSetupState = staleArticleSetupState(),
  scanRun = blockedScanRun(),
}: {
  bootstrap?: VibeMarketingBootstrap;
  articleSetupState?: VibeMarketingArticleSetupState | null;
  scanRun?: VibeMarketingRunSummary | null;
} = {}) {
  const router = createMemoryRouter(
    [
      {
        path: "/founder-tools/marketing/create",
        element: createElement(ArticleSystemConnectionPanel, {
          bootstrap: { ...bootstrap, articleSetupState },
          githubRepos: githubRepos(),
          isSubmitting: false,
          isActionPending: () => false,
          repoSelection: "DrAnuG1995/website",
          articleSetupState,
          scanRun,
          framed: false,
        }),
      },
    ],
    {
      initialEntries: ["/founder-tools/marketing/create?step=articleSystem"],
    },
  );

  return renderToStaticMarkup(createElement(RouterProvider, { router }));
}

describe("article system connection panel", () => {
  test("shows stale saved route with change, re-scan, and reset controls", () => {
    const markup = renderPanel();

    expect(markup).toContain("Saved setup needs refresh");
    expect(markup).toContain("Your last articles/blogs setup is saved");
    expect(markup).toContain("Articles/blogs location already selected");
    expect(markup).toContain("Public route: /articles");
    expect(markup).toContain("Change location");
    expect(markup).toContain("Re-scan repository");
    expect(markup).toContain("Reset articles setup");
    expect(markup).toContain("value=\"reset-article-setup\"");
  });

  test("does not render the old standalone Continue CTA when scaffold is ready without a selected target", () => {
    const markup = renderPanel({
      bootstrap: baseBootstrap({
        checks: {
          github: { passed: true },
          scaffold: { passed: true, setupBlocked: false },
        },
      }),
      articleSetupState: null,
      scanRun: null,
    });

    expect(markup).toContain("Reset articles setup");
    expect(markup).toContain("value=\"reset-article-setup\"");
    expect(markup).not.toContain(">Continue<");
    expect(markup).not.toContain("/founder-tools/marketing/create?step=research");
  });
});
