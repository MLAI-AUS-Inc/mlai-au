import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

import {
  ARTICLE_REGISTRY,
  getArticlesSortedNewestFirst,
  isArticleIndexable,
  ORDERED_ARTICLE_ROUTE_SLUGS,
} from "../app/articles/registry";
import { BASE_ARTICLE_SEO_CONFIG } from "../app/articles/seo-config";
import {
  buildStudioProjectPayload,
  type StudioProjectBrief,
} from "../app/lib/mlai-studio-project";
import {
  founderExperimentLedgerToCsv,
  parseStoredFounderExperiments,
  type FounderExperimentRow,
} from "../app/lib/founder-experiment-ledger";
import {
  ACCELERATOR_DATASET_VERIFIED_AT,
  AUSTRALIAN_ACCELERATOR_PROGRAMS,
} from "../app/lib/australian-accelerator-programs";
import {
  AUSTRALIAN_UNICORN_EVIDENCE,
  UNICORN_DATASET_VERIFIED_AT,
} from "../app/lib/australian-unicorn-evidence";
import { calculatePrimaryRound } from "../app/components/articles/UnicornValuationCalculator";
import {
  SYDNEY_AI_TECH_EVENTS,
  SYDNEY_EVENT_DATASET_VERIFIED_AT,
} from "../app/lib/sydney-ai-tech-events";
import { rankSydneyEvents } from "../app/components/articles/SydneyEventFitFinder";

const SALARY_SLUG = "featured/how-much-do-data-scientists-make";
const ISSUE_NINE_SLUG =
  "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-9";
const BEGINNER_AI_SLUG =
  "featured/what-is-artificial-intelligence-in-simple-words";
const BEGINNER_AI_DUPLICATE_SLUG =
  "featured/what-is-artificial-intelligence-with-example-for-everyday-readers";
const ENTREPRENEUR_SLUG =
  "featured/what-an-entrepreneur-does-and-how-to-start-well";
const STARTUP_DUPLICATE_SLUG =
  "featured/how-to-startup-a-practical-guide-for-first-time-founders";
const AGI_SLUG =
  "featured/what-is-general-artificial-intelligence-and-why-it-matters";
const AGI_DUPLICATE_SLUG =
  "featured/what-is-agi-in-artificial-intelligence-and-why-it-matters";
const ACCELERATOR_SLUG = "featured/startup-accelerator-australia";
const SINGAPORE_ACCELERATOR_SLUG =
  "featured/how-many-startup-accelerators-and-incubators-are-there-in-si";
const UNICORN_SLUG =
  "featured/what-is-a-unicorn-startup-and-why-it-matters";
const SYDNEY_MEETUP_SLUG =
  "featured/how-to-find-an-ai-and-tech-meetup-in-sydney";
const STALE_CODING_SLUG =
  "featured/how-to-choose-the-best-ai-for-coding-in-2025";

describe("article editorial containment", () => {
  test("integrity-risk articles remain routable but are withheld from indexing surfaces", () => {
    for (const slug of [SALARY_SLUG, ISSUE_NINE_SLUG, STALE_CODING_SLUG]) {
      const article = ARTICLE_REGISTRY[slug];
      expect(article).toBeDefined();
      expect(article.indexing).toBe("noindex");
      expect(article.publicationStatus).toBe("under-review");
      expect(isArticleIndexable(article)).toBeFalse();
      expect(ORDERED_ARTICLE_ROUTE_SLUGS).not.toContain(slug);
      expect(getArticlesSortedNewestFirst().map((item) => item.slug)).not.toContain(slug);
    }
  });

  test("an ordinary published article remains indexable", () => {
    const article =
      ARTICLE_REGISTRY["featured/what-is-artificial-intelligence-in-simple-words"];
    expect(isArticleIndexable(article)).toBeTrue();
    expect(getArticlesSortedNewestFirst().map((item) => item.slug)).toContain(article.slug);
  });

  test("under-review modules do not serialize stale FAQ claims", () => {
    const routeSource = readFileSync(
      path.join(process.cwd(), "app", "routes", "articles.slug.tsx"),
      "utf8",
    );

    expect(routeSource).toContain(
      'if (importer && article.publicationStatus !== "under-review")',
    );
  });

  test("the stale coding-tools listicle explains its benchmark rebuild without importing the old body", () => {
    const routeSource = readFileSync(
      path.join(process.cwd(), "app", "routes", "articles.slug.tsx"),
      "utf8",
    );

    expect(routeSource).toContain(
      '"The stale coding-tools list has been withdrawn."',
    );
    expect(routeSource).toContain(
      "The protocol is being registered before",
    );
  });
});

describe("urgent article conversion mapping", () => {
  test("every urgent article present on this branch has an intent-specific CTA", () => {
    const urgentPaths = [
      "/articles/featured/how-much-do-data-scientists-make",
      "/articles/featured/what-is-artificial-intelligence-in-simple-words",
      "/articles/featured/what-is-a-unicorn-startup-and-why-it-matters",
      "/articles/featured/what-an-entrepreneur-does-and-how-to-start-well",
      "/articles/featured/how-many-startup-accelerators-and-incubators-are-there-in-si",
      "/articles/featured/how-to-choose-the-best-ai-for-coding-in-2025",
      "/articles/featured/how-to-find-an-ai-and-tech-meetup-in-sydney",
      "/articles/featured/what-is-general-artificial-intelligence-and-why-it-matters",
      "/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-9",
    ];

    for (const pathName of urgentPaths) {
      expect(BASE_ARTICLE_SEO_CONFIG[pathName]?.conversion?.primary).toBeTruthy();
      expect(BASE_ARTICLE_SEO_CONFIG[pathName]?.conversion?.version).toBe(
        pathName === `/articles/${UNICORN_SLUG}`
          ? "unicorn-evidence-v1"
          : pathName === `/articles/${SYDNEY_MEETUP_SLUG}`
            ? "sydney-event-finder-v1"
          : "urgent-v1",
      );
    }
  });

  test("the missing origin/main investment pair is preconfigured for the branch reconciliation", () => {
    expect(
      BASE_ARTICLE_SEO_CONFIG[
        "/articles/featured/invest-in-business-startups-before-you-commit"
      ]?.conversion?.primary,
    ).toBe("vibe-raising");
    expect(
      BASE_ARTICLE_SEO_CONFIG[
        "/articles/featured/startup-company-investment-for-ai-founders"
      ]?.conversion?.primary,
    ).toBe("vibe-raising");
  });
});

describe("beginner AI canonical rebuild", () => {
  test("retains one indexable canonical and retires the query duplicate", () => {
    expect(ARTICLE_REGISTRY[BEGINNER_AI_SLUG]).toBeDefined();
    expect(isArticleIndexable(ARTICLE_REGISTRY[BEGINNER_AI_SLUG])).toBeTrue();
    expect(ARTICLE_REGISTRY[BEGINNER_AI_SLUG].dateModified).toBe("2026-07-28");
    expect(ARTICLE_REGISTRY[BEGINNER_AI_DUPLICATE_SLUG]).toBeUndefined();

    const routesSource = readFileSync(
      path.join(process.cwd(), "app", "routes.ts"),
      "utf8",
    );
    const redirectsSource = readFileSync(
      path.join(process.cwd(), "app", "routes", "article-link-cleanups.tsx"),
      "utf8",
    );
    expect(routesSource).toContain(
      'route("/articles/featured/what-is-artificial-intelligence-with-example-for-everyday-readers"',
    );
    expect(redirectsSource).toContain(
      '"/articles/featured/what-is-artificial-intelligence-with-example-for-everyday-readers": "/articles/featured/what-is-artificial-intelligence-in-simple-words"',
    );
  });

  test("ships an original interactive asset and one shared FAQ schema source", () => {
    const articleSource = readFileSync(
      path.join(
        process.cwd(),
        "app",
        "articles",
        "content",
        "featured",
        "what-is-artificial-intelligence-in-simple-words.tsx",
      ),
      "utf8",
    );

    expect(articleSource).toContain("<AiOrNotQuiz />");
    expect(articleSource).toContain("How AI works: one transparent example");
    expect(articleSource).toContain("Method, limitations and disclosure");
    expect(articleSource).not.toContain('"@type": "FAQPage"');
    expect(articleSource).not.toContain("faqStructuredData");
  });
});

describe("first-founder canonical rebuild", () => {
  test("retires the weaker startup query page into the entrepreneur canonical", () => {
    expect(ARTICLE_REGISTRY[ENTREPRENEUR_SLUG]).toBeDefined();
    expect(ARTICLE_REGISTRY[ENTREPRENEUR_SLUG].dateModified).toBe("2026-07-28");
    expect(ARTICLE_REGISTRY[STARTUP_DUPLICATE_SLUG]).toBeUndefined();
    expect(
      BASE_ARTICLE_SEO_CONFIG[`/articles/${ENTREPRENEUR_SLUG}`]?.conversion
        ?.primary,
    ).toBe("founder-tools");

    const routesSource = readFileSync(
      path.join(process.cwd(), "app", "routes.ts"),
      "utf8",
    );
    const redirectsSource = readFileSync(
      path.join(process.cwd(), "app", "routes", "article-link-cleanups.tsx"),
      "utf8",
    );
    expect(routesSource).toContain(
      'route("/articles/featured/how-to-startup-a-practical-guide-for-first-time-founders"',
    );
    expect(redirectsSource).toContain(
      '"/articles/featured/how-to-startup-a-practical-guide-for-first-time-founders": "/articles/featured/what-an-entrepreneur-does-and-how-to-start-well"',
    );
  });

  test("ships the experiment ledger without a second FAQ schema", () => {
    const articleSource = readFileSync(
      path.join(
        process.cwd(),
        "app",
        "articles",
        "content",
        "featured",
        "what-an-entrepreneur-does-and-how-to-start-well.tsx",
      ),
      "utf8",
    );

    expect(articleSource).toContain("<FounderExperimentLedger />");
    expect(articleSource).toContain("Days 1–10");
    expect(articleSource).toContain("Method, limitations and disclosure");
    expect(articleSource).not.toContain('"@type": "FAQPage"');
    expect(articleSource).not.toContain("faqStructuredData");
  });

  test("round-trips local ledger data and exports safely escaped CSV", () => {
    const rows: FounderExperimentRow[] = [
      {
        id: "experiment_1",
        assumption: 'Founders will pay for a "monthly update" workflow.',
        customer: "Australian AI founders",
        test: "Offer a paid concierge session",
        successSignal: "3 paid pilots",
        evidence: "Two pilots,\none declined",
        decision: "Change",
        nextStep: "Narrow the segment",
      },
    ];

    expect(parseStoredFounderExperiments(JSON.stringify(rows))).toEqual(rows);
    expect(parseStoredFounderExperiments('{"not":"an array"}')).toBeNull();

    const csv = founderExperimentLedgerToCsv(rows);
    expect(csv).toContain(
      '"Founders will pay for a ""monthly update"" workflow."',
    );
    expect(csv).toContain('"Two pilots,\none declined"');
    expect(csv).toContain('"Change"');
  });
});

describe("AGI canonical rebuild", () => {
  test("retires the acronym duplicate into the evidence-guide canonical", () => {
    expect(ARTICLE_REGISTRY[AGI_SLUG]).toBeDefined();
    expect(isArticleIndexable(ARTICLE_REGISTRY[AGI_SLUG])).toBeTrue();
    expect(ARTICLE_REGISTRY[AGI_SLUG].dateModified).toBe("2026-07-28");
    expect(ARTICLE_REGISTRY[AGI_DUPLICATE_SLUG]).toBeUndefined();
    expect(
      BASE_ARTICLE_SEO_CONFIG[`/articles/${AGI_SLUG}`]?.conversion?.primary,
    ).toBe("events");
    expect(
      BASE_ARTICLE_SEO_CONFIG[`/articles/${AGI_SLUG}`]?.conversion?.secondary,
    ).toBe("studio-project");

    const routesSource = readFileSync(
      path.join(process.cwd(), "app", "routes.ts"),
      "utf8",
    );
    const redirectsSource = readFileSync(
      path.join(process.cwd(), "app", "routes", "article-link-cleanups.tsx"),
      "utf8",
    );
    expect(routesSource).toContain(
      'route("/articles/featured/what-is-agi-in-artificial-intelligence-and-why-it-matters"',
    );
    expect(redirectsSource).toContain(
      '"/articles/featured/what-is-agi-in-artificial-intelligence-and-why-it-matters": "/articles/featured/what-is-general-artificial-intelligence-and-why-it-matters"',
    );
  });

  test("ships the original claim evaluator without a second FAQ schema", () => {
    const articleSource = readFileSync(
      path.join(
        process.cwd(),
        "app",
        "articles",
        "content",
        "featured",
        "what-is-general-artificial-intelligence-and-why-it-matters.tsx",
      ),
      "utf8",
    );

    expect(articleSource).toContain("<AgiClaimEvaluator />");
    expect(articleSource).toContain(
      "Four terms that should not be collapsed into one",
    );
    expect(articleSource).toContain("Method, limitations and disclosure");
    expect(articleSource).toContain("Australian expert roundtable");
    expect(articleSource).not.toContain('"@type": "FAQPage"');
    expect(articleSource).not.toContain("faqStructuredData");
  });
});

describe("Australian accelerator canonical rebuild", () => {
  test("publishes the maintained finder while containing the unsupported Singapore count", () => {
    const canonicalArticle = ARTICLE_REGISTRY[ACCELERATOR_SLUG];
    const singaporeArticle = ARTICLE_REGISTRY[SINGAPORE_ACCELERATOR_SLUG];

    expect(canonicalArticle).toBeDefined();
    expect(isArticleIndexable(canonicalArticle)).toBeTrue();
    expect(canonicalArticle.dateModified).toBe("2026-07-29");
    expect(singaporeArticle).toBeDefined();
    expect(singaporeArticle.indexing).toBe("noindex");
    expect(singaporeArticle.publicationStatus).toBe("under-review");
    expect(isArticleIndexable(singaporeArticle)).toBeFalse();
    expect(ORDERED_ARTICLE_ROUTE_SLUGS).not.toContain(
      SINGAPORE_ACCELERATOR_SLUG,
    );

    const conversion =
      BASE_ARTICLE_SEO_CONFIG[`/articles/${ACCELERATOR_SLUG}`]?.conversion;
    expect(conversion?.primary).toBe("founder-tools");
    expect(conversion?.secondary).toBe("events");
    expect(conversion?.version).toBe("accelerator-finder-v1");
  });

  test("ships seven uniquely sourced and currently verified program rows", () => {
    expect(AUSTRALIAN_ACCELERATOR_PROGRAMS.length).toBeGreaterThanOrEqual(7);
    expect(
      new Set(AUSTRALIAN_ACCELERATOR_PROGRAMS.map((program) => program.name))
        .size,
    ).toBe(AUSTRALIAN_ACCELERATOR_PROGRAMS.length);

    for (const program of AUSTRALIAN_ACCELERATOR_PROGRAMS) {
      expect(program.lastVerified).toBe(ACCELERATOR_DATASET_VERIFIED_AT);
      expect(program.sourceUrl.startsWith("https://")).toBeTrue();
      expect(program.publishedTerms.length).toBeGreaterThan(30);
      expect(program.currentIntake.length).toBeGreaterThan(20);
    }
  });

  test("renders the finder and fit scorecard without fake downloads or duplicate FAQ schema", () => {
    const articleSource = readFileSync(
      path.join(
        process.cwd(),
        "app",
        "articles",
        "content",
        "featured",
        "startup-accelerator-australia.tsx",
      ),
      "utf8",
    );

    expect(articleSource).toContain("AUSTRALIAN_ACCELERATOR_PROGRAMS.map");
    expect(articleSource).toContain("<AcceleratorFitScorecard />");
    expect(articleSource).toContain(
      "Method, changelog, limitations and disclosure",
    );
    expect(articleSource).not.toContain('buttonHref="#"');
    expect(articleSource).not.toContain('"@type": "FAQPage"');
    expect(articleSource).not.toContain("faqStructuredData");
  });
});

describe("Australian unicorn evidence-guide rebuild", () => {
  test("keeps the canonical indexable with fundraising and event conversion paths", () => {
    const article = ARTICLE_REGISTRY[UNICORN_SLUG];

    expect(article).toBeDefined();
    expect(isArticleIndexable(article)).toBeTrue();
    expect(article.dateModified).toBe("2026-07-29");

    const conversion =
      BASE_ARTICLE_SEO_CONFIG[`/articles/${UNICORN_SLUG}`]?.conversion;
    expect(conversion?.primary).toBe("vibe-raising");
    expect(conversion?.secondary).toBe("events");
    expect(conversion?.version).toBe("unicorn-evidence-v1");
  });

  test("publishes at least five explicit US-dollar valuation events with status confidence", () => {
    expect(AUSTRALIAN_UNICORN_EVIDENCE.length).toBeGreaterThanOrEqual(5);
    expect(
      new Set(AUSTRALIAN_UNICORN_EVIDENCE.map((item) => item.company)).size,
    ).toBe(AUSTRALIAN_UNICORN_EVIDENCE.length);

    for (const item of AUSTRALIAN_UNICORN_EVIDENCE) {
      expect(item.valuationUsdFloorBillions).toBeGreaterThanOrEqual(1);
      expect(item.disclosedValuation).toContain("US$");
      expect(item.lastVerified).toBe(UNICORN_DATASET_VERIFIED_AT);
      expect(item.sourceUrl.startsWith("https://")).toBeTrue();
      expect(item.connectionSourceUrl.startsWith("https://")).toBeTrue();
      expect(item.statusNote.length).toBeGreaterThan(60);
    }

    expect(
      AUSTRALIAN_UNICORN_EVIDENCE.filter(
        (item) => item.statusConfidence === "recent-company-report",
      ).map((item) => item.company),
    ).toEqual(["Airwallex"]);
  });

  test("renders the evidence table and downloadable calculator without a duplicate FAQ schema", () => {
    const articleSource = readFileSync(
      path.join(
        process.cwd(),
        "app",
        "articles",
        "content",
        "featured",
        "what-is-a-unicorn-startup-and-why-it-matters.tsx",
      ),
      "utf8",
    );
    const calculatorSource = readFileSync(
      path.join(
        process.cwd(),
        "app",
        "components",
        "articles",
        "UnicornValuationCalculator.tsx",
      ),
      "utf8",
    );

    expect(articleSource).toContain("AUSTRALIAN_UNICORN_EVIDENCE.map");
    expect(articleSource).toContain("<UnicornValuationCalculator />");
    expect(articleSource).toContain(
      "Method, changelog, limitations and disclosure",
    );
    expect(articleSource).toContain("Current editorial gate");
    expect(articleSource).not.toContain('"@type": "FAQPage"');
    expect(articleSource).not.toContain("faqStructuredData");
    expect(articleSource).not.toContain("Download now");

    expect(calculatorSource).toContain("Download scenario as CSV");
    expect(calculatorSource).toContain("Post-money = pre-money + new primary cash");
    expect(calculatorSource).toContain("not valid for a secondary share sale");
  });

  test("checks the published A$900m plus A$100m ownership example", () => {
    expect(
      calculatePrimaryRound({
        preMoney: 900,
        newMoney: 100,
        founderOwnership: 60,
      }),
    ).toEqual({
      postMoney: 1000,
      investorOwnership: 10,
      founderOwnershipAfter: 54,
      founderDilutionPoints: 6,
    });
  });
});

describe("Sydney AI and tech event-finder rebuild", () => {
  test("keeps the canonical indexable with an Events-first conversion path", () => {
    const article = ARTICLE_REGISTRY[SYDNEY_MEETUP_SLUG];

    expect(article).toBeDefined();
    expect(isArticleIndexable(article)).toBeTrue();
    expect(article.dateModified).toBe("2026-07-29");

    const conversion =
      BASE_ARTICLE_SEO_CONFIG[`/articles/${SYDNEY_MEETUP_SLUG}`]?.conversion;
    expect(conversion?.primary).toBe("events");
    expect(conversion?.version).toBe("sydney-event-finder-v1");
  });

  test("publishes eight unique organiser-sourced rows with conservative activity labels", () => {
    expect(SYDNEY_AI_TECH_EVENTS.length).toBeGreaterThanOrEqual(8);
    expect(
      new Set(SYDNEY_AI_TECH_EVENTS.map((event) => event.name)).size,
    ).toBe(SYDNEY_AI_TECH_EVENTS.length);

    for (const event of SYDNEY_AI_TECH_EVENTS) {
      expect(event.lastVerified).toBe(SYDNEY_EVENT_DATASET_VERIFIED_AT);
      expect(event.sourceUrl.startsWith("https://")).toBeTrue();
      expect(event.audience.length).toBeGreaterThan(40);
      expect(event.nextOrLatestActivity.length).toBeGreaterThan(40);
      expect(event.accessibility.length).toBeGreaterThan(40);
    }

    expect(
      SYDNEY_AI_TECH_EVENTS.filter(
        (event) => event.activityStatus === "upcoming",
      ).map((event) => event.name),
    ).toEqual([
      "Cursor Sydney",
      "Proof to Production Australia — AI on Tap",
      "AI Week Sydney",
    ]);
  });

  test("ships the directory and event-fit worksheet without search-query filler or duplicate FAQ schema", () => {
    const articleSource = readFileSync(
      path.join(
        process.cwd(),
        "app",
        "articles",
        "content",
        "featured",
        "how-to-find-an-ai-and-tech-meetup-in-sydney.tsx",
      ),
      "utf8",
    );

    expect(articleSource).toContain("SYDNEY_AI_TECH_EVENTS.map");
    expect(articleSource).toContain("<SydneyEventFitFinder />");
    expect(articleSource).toContain(
      "Method, changelog, limitations and disclosure",
    );
    expect(articleSource).toContain("Current editorial gate");
    expect(articleSource).toContain('to="/events"');
    expect(articleSource).toContain('to="/contact"');
    expect(articleSource.toLowerCase()).not.toContain("singles");
    expect(articleSource.toLowerCase()).not.toContain("dating");
    expect(articleSource).not.toContain('"@type": "FAQPage"');
    expect(articleSource).not.toContain("faqStructuredData");
  });

  test("ranks a future web-builder meetup first for an in-person web goal", () => {
    const [match] = rankSydneyEvents({
      goal: "web",
      format: "in-person",
      cost: "either",
    });

    expect(match.event.name).toBe("Cursor Sydney");
    expect(match.reasons).toContain("Matches: Build for the web");
    expect(match.reasons).toContain("Future date verified");
  });
});

describe("coding-assistant benchmark containment and preregistration", () => {
  test("withholds the stale yearly listicle from indexing and discovery", () => {
    const article = ARTICLE_REGISTRY[STALE_CODING_SLUG];

    expect(article).toBeDefined();
    expect(article.indexing).toBe("noindex");
    expect(article.publicationStatus).toBe("under-review");
    expect(article.dateModified).toBe("2026-07-29");
    expect(isArticleIndexable(article)).toBeFalse();
    expect(ORDERED_ARTICLE_ROUTE_SLUGS).not.toContain(STALE_CODING_SLUG);
    expect(
      getArticlesSortedNewestFirst().map((item) => item.slug),
    ).not.toContain(STALE_CODING_SLUG);
  });

  test("freezes a no-results protocol before a four-to-six-tool run matrix", () => {
    const researchDirectory = path.join(
      process.cwd(),
      "research",
      "ai-coding-assistant-benchmark",
    );
    const protocolText = readFileSync(
      path.join(researchDirectory, "protocol.v1.json"),
      "utf8",
    );
    const protocol = JSON.parse(protocolText);
    const recordedHash = readFileSync(
      path.join(researchDirectory, "protocol.v1.sha256"),
      "utf8",
    ).split(/\s+/)[0];

    expect(protocol.status).toBe("preregistered-no-results");
    expect(protocol.preregisteredAt).toBe("2026-07-29");
    expect(protocol.toolSelection.minimumTools).toBe(4);
    expect(protocol.toolSelection.maximumTools).toBe(6);
    expect(protocol.tasks.map((task: { id: string }) => task.id)).toEqual([
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
    ]);
    expect(protocol.trialDesign.repetitionsPerToolTask).toBe(3);
    expect(protocol.trialDesign.minimumTrials).toBe(4 * 6 * 3);
    expect(protocol.trialDesign.maximumTrials).toBe(6 * 6 * 3);
    expect(protocol.outcomes.primary.passRule).toContain(
      "hidden acceptance test",
    );
    expect(protocol.releaseGates.length).toBeGreaterThanOrEqual(6);
    expect(
      createHash("sha256").update(protocolText).digest("hex"),
    ).toBe(recordedHash);
  });
});

describe("sitemap implementation", () => {
  test("the generator filters noindex articles and includes new public conversion routes", () => {
    const source = readFileSync(
      path.join(process.cwd(), "scripts", "generate-sitemap.ts"),
      "utf8",
    );
    expect(source).toContain(".filter(isArticleIndexable)");
    expect(source).toContain('path: "/mlai-studio/start-project"');
    expect(source).toContain('path: "/founder-tools/start"');
  });
});

describe("Studio client project intake", () => {
  test("builds a separately identifiable backend payload with article attribution", () => {
    const brief: StudioProjectBrief = {
      fullName: "Alex Founder",
      email: "alex@example.com",
      phone: "+61 400 000 000",
      organisation: "Example AI",
      outcome: "Reduce support triage time without removing human approval.",
      currentWorkflow: "A founder reviews a shared inbox every morning.",
      systemsAndData: "Gmail, Linear and an internal knowledge base.",
      privacyAndSecurity: "Customer emails may contain personal information.",
      previousAttempts: "A basic prompt and spreadsheet.",
      successMeasure: "Cut review time by 60% with no missed urgent messages.",
      timeline: "Within 1 month",
      budget: "A$5,000–A$15,000",
      consent: true,
      website: "",
    };

    const payload = buildStudioProjectPayload(brief, {
      clientRef: "project_test_123",
      attribution: {
        articleSlug: "featured/what-is-artificial-intelligence-in-simple-words",
        ctaType: "studio-project",
        placement: "article-secondary",
        destination: "/mlai-studio/start-project",
        version: "urgent-v1",
        clickedAt: "2026-07-28T00:00:00.000Z",
      },
    });

    expect(payload.client_ref).toBe("project_test_123");
    expect(payload.stage).toBe("complete");
    expect(payload.interests).toEqual(["Client project brief"]);
    expect(payload.projects).toBe(brief.outcome);
    expect(payload.consent).toBeTrue();
    expect(payload.anything_else).toContain(`Article source: featured/what-is-artificial-intelligence-in-simple-words`);
    expect(payload.anything_else).toContain("CTA type: studio-project");
    expect(payload.anything_else).toContain(`Success measure: ${brief.successMeasure}`);
  });
});
