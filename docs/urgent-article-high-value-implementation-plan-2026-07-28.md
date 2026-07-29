# Urgent article high-value implementation plan

**Date:** 28 July 2026
**Source audit:** `docs/article-content-quality-audit-2026-07-27.md`
**Scope:** The ten articles that scored below 45/100
**Target:** Every retained canonical destination scores at least 80/100 and has a truthful, measurable conversion path to MLAI Events, MLAI Studio, or Founder Tools

## The governing decision

Do not force all ten urgent URLs to remain indexed. Google explicitly warns against maintaining multiple pages for query variants, so the high-value outcome is a smaller set of definitive resources:

- **Rebuild six existing URLs:** salary, simple AI, unicorns, entrepreneurs, Sydney meetups, and AI Bits Issue 9.
- **Replace one stale URL with an evergreen canonical:** the 2025 coding-tools article.
- **Merge and 301 three URLs:** the AGI acronym duplicate, the Singapore accelerator count, and the retail-investing article.

Three non-urgent destinations must also be upgraded because they will receive merged content:

- `what-is-general-artificial-intelligence-and-why-it-matters`
- the chosen Australian accelerator canonical
- `startup-company-investment-for-ai-founders`

The working recommendation is to use `startup-accelerator-australia` as the accelerator canonical because it is concise, Australian, and compatible with a maintained program finder. Confirm that choice against Search Console and backlink data before implementing redirects.

## Outcome map

| Urgent URL | Current score | Decision | High-value destination | Primary conversion |
|---|---:|---|---|---|
| `how-much-do-data-scientists-make` | 9 | Keep and rebuild | Same URL | Studio builder application |
| `what-is-artificial-intelligence-in-simple-words` | 29 | Keep as beginner canonical | Same URL; later absorb the “with example” duplicate | Events, then Studio project intake |
| `what-is-a-unicorn-startup-and-why-it-matters` | 30 | Keep and rebuild | Same URL | Founder Tools / Vibe Raising |
| `what-an-entrepreneur-does-and-how-to-start-well` | 34 | Keep as first-founder canonical | Same URL; absorb `how-to-startup-a-practical-guide-for-first-time-founders` | Founder Tools |
| `how-many-startup-accelerators-and-incubators-are-there-in-si` | 36 | Merge and 301 | Australian accelerator finder and fit guide | Founder Tools |
| `how-to-choose-the-best-ai-for-coding-in-2025` | 39 | Replace and 301 | New date-neutral, hands-on coding benchmark | Studio builder application |
| `how-to-find-an-ai-and-tech-meetup-in-sydney` | 40 | Keep and rebuild | Same URL | Events |
| `what-is-agi-in-artificial-intelligence-and-why-it-matters` | 42 | Merge and 301 | `what-is-general-artificial-intelligence-and-why-it-matters` | Events, then Studio project intake |
| `invest-in-business-startups-before-you-commit` | 42 | Merge and 301 | `startup-company-investment-for-ai-founders` | Founder Tools / Vibe Raising |
| AI Bits Issue 9 | 43 | Keep, correct, and rebuild | Same URL with visible correction history | Studio builder application and online event |

## Definition of “high value”

Every canonical page must clear this publish gate:

- **80/100 or higher** using the audit rubric.
- At least **20/25 originality**, **16/20 evidence**, and **12/15 trust**; a high total cannot hide weak accuracy.
- One original MLAI asset: dataset, experiment, interview set, tested comparison, interactive tool, worksheet, or first-hand case.
- A named writer and named qualified reviewer.
- A visible methodology, source-status, limitations, last-verified date, and honest AI-assistance disclosure where applicable.
- Claim-level primary sources for all volatile, quantitative, financial, legal, career, and product claims.
- No irrelevant PAA questions, truncated text, generator instructions, fake downloads, `#` buttons, or generic `/articles` CTAs.
- One primary conversion matched to reader intent and no more than one secondary conversion.
- Correct publisher, author, dates, canonical, Open Graph metadata, schema, internal links, and sitemap state.
- A human editor can state why MLAI would publish and share the page even if Google sent it no traffic.

## Phase 1 — contain risk and preserve evidence

### Step 1: snapshot before changing URLs

Export the previous 90 days for each urgent URL:

- Search Console clicks, impressions, queries, average position, indexing status, and canonical selected by Google;
- GA4 page views, engagement, and any current outbound clicks;
- inbound internal links and known external backlinks;
- current rendered HTML, title, description, schema, and screenshot.

This determines whether a same-day replacement or a 301 is safer than a temporary noindex. It also gives a performance baseline.

### Step 2: immediately contain the two integrity failures

1. **Salary page:** temporarily noindex because the live page has no body.
2. **AI Bits Issue 9:** temporarily noindex/unpublish because it misattributes the source and reports experiments absent from it.

Do not silently correct Issue 9. Preserve the URL and publish a visible correction history when the replacement is ready.

### Step 3: pause new search-targeted articles

Pause new query-led publishing until the editorial gate, redirects, CTA destinations, and metadata fixes below are operational.

### Step 4: reconcile the deployment branch

The live site has 62 article URLs while the checked-out branch registry has 57. The urgent investment article and its preferred destination exist on `origin/main` but not in the current working tree. Reconcile this before editing or redirecting so the deployed fix is made in the real source of truth.

## Phase 2 — build truthful conversion destinations first

### Step 5: keep `/events` as the event destination

The existing public `/events` route and article event cards are usable now. Improve them later by adding verified `online`, `in-person`, and `hybrid` event-format fields and filters. Do not infer an online event from an empty address.

Approved baseline CTA:

> Meet Australia’s AI builders in person or online. Browse upcoming MLAI events.

### Step 6: split MLAI Studio into builder and client journeys

The current `/mlai-studio` page only recruits builders and its real conversion is `/mlai-studio#apply`.

Keep that destination for career, coding, and builder readers:

> Ship real AI projects with Australian startups. Apply to MLAI Studio.

Before using Studio as a CTA for people who need a harness, workflow, agent, automation, or MVP built, add a client route:

`/mlai-studio/start-project`

The project brief should collect:

- desired outcome and current workflow;
- users and frequency;
- systems, data, integrations, and permissions;
- privacy/security constraints;
- what has already been tried;
- success measure;
- timeline, budget range, and contact details.

The confirmation page must state the next step and response time. Track submitted briefs separately from builder applications.

### Step 7: add a public Founder Tools acquisition page

`/founder-tools` is an authenticated app and sends logged-out readers to login. `/vibe-raising` is public but explains only investor updates.

Add a public route such as:

`/founder-tools/start`

It should explain:

- Vibe Raising;
- Vibe Marketing;
- connected data sources;
- what users receive before creating an account;
- privacy and AI-use expectations;
- direct starts into the appropriate authenticated flow.

Use `/vibe-raising` immediately for fundraising and investor-update articles. Use the new overview for broad founder articles.

### Step 8: create one shared article conversion component

Add:

- `app/components/articles/ArticleConversionCTA.tsx`
- a conversion field in `app/articles/seo-config.ts`

Supported variants:

- `events`
- `studio-builder`
- `studio-project`
- `founder-tools`
- `vibe-raising`

Replace the unconditional events block on every article with the configured CTA. Only event-intent articles should receive the rich upcoming-event cards.

Track:

- article slug;
- CTA type;
- placement;
- destination;
- content version;
- click;
- completed event registration, Studio brief/application, or Founder Tools account action where measurable.

Update `scripts/check-article-internal-links.ts` to recognise the Studio and Founder Tools paths and their query/hash variants while continuing to reject `#` placeholders.

## Phase 3 — repair shared trust and indexing infrastructure

### Step 9: add article-level index state

Add an `indexing: "index" | "noindex"` field to the registry and emit a single robots directive from the article route. Exclude noindex pages from the sitemap, article directory, next-article order, and related links.

### Step 10: enforce exact canonical URLs

- Stop public suffix matching from returning the article at `/articles/<leaf>`.
- 301 category-less, case, and trailing-slash variants to the exact registry URL.
- Add explicit 301 routes for merged urgent pages before the wildcard route.
- Remove redirected URLs from the registry, sitemap, next/related lists, and internal links.
- Never combine a 301 with a `noindex`; a retired URL should redirect directly to the final canonical in one hop.

### Step 11: repair publisher, authors, dates, and schema

- Replace `Support Sorted` with `MLAI Aus Inc`.
- Use the existing valid MLAI logo.
- Remove global Dr Sam/Dr Lukas author tags from pages they did not author.
- Resolve named authors and reviewers from one source of truth.
- Store accurate `datePublished` and `dateModified`.
- Emit one Article graph and one FAQ graph only.
- Remove module-local duplicate JSON-LD, duplicated disclaimers, and irrelevant default sources.

### Step 12: add article-specific metadata and internal links

Emit one canonical, `og:type=article`, article-specific image/title/description, Twitter card, author, and published/modified dates. Implement the currently empty related-article carousel and add 2–3 curated contextual links per canonical page.

## Phase 4 — page-by-page production briefs

### 1. Data scientist salaries — keep and rebuild

**Goal:** The most transparent Australian data-science salary benchmark MLAI can maintain.

1. Align the dormant `careers/how-much-do-data-scientists-make.tsx` module with the registered canonical path, then treat its prose as a draft requiring full fact-checking.
2. Audit at least 100 deduplicated Australian job ads and report both the total and the subset disclosing pay. Use a clear occupation definition and exclude analyst/engineer roles and duplicated recruiter listings.
3. Capture snapshot date, city, seniority, sector, employment type, base versus package, super, and contractor/permanent status.
4. Add 2–4 recruiter or Australian data-lead interviews.
5. Publish methodology, exclusions, limitations, a reusable data summary, and a base/package/contract-rate calculator.
6. Structure the page around an answer card, bands by seniority, supported city/sector comparisons, offer comparison, negotiation, and limitations.
7. Cross-link the separate data-science-career article.

Use official occupational and earnings sources as benchmarks, current job advertisements as the analysed corpus, and recruiter reports only as triangulation.

**Primary CTA:** “Build paid AI/data project experience” → `/mlai-studio#apply`.
**Secondary CTA:** relevant career or builder events → `/events`.

**Ready when:** 100+ ad audit, disclosed-pay `N`, method, two expert voices, calculator, correctly labelled pay components, claim-level links, and score ≥80.

### 2. AI in simple words — keep as the beginner canonical

**Goal:** An explainer a nontechnical Australian can understand, test, and use.

1. Merge the useful material from `what-is-artificial-intelligence-with-example-for-everyday-readers` and 301 that duplicate.
2. Run a disclosed plain-language session with at least eight AI beginners; capture common misconceptions and anonymised quotes.
3. Create an original “rules versus learned patterns” diagram.
4. Build one transparent input → model → output → human-check example.
5. Create an eight-question “AI or not?” interactive or printable.
6. Explain AI, machine learning, and generative AI without anthropomorphism; add privacy, bias, and hallucination basics.
7. Test the final explanation with at least five nontechnical readers using a short comprehension check.

Use OECD/NIST or ISO terminology, Australian government AI guidance, OAIC privacy guidance, and official model documentation for named examples.

**Primary CTA:** beginner workshops and meetups → `/events`.
**Secondary CTA after client intake exists:** “Bring us one workflow and leave with a build plan” → `/mlai-studio/start-project`.

**Ready when:** one canonical definition page, original test/diagram/demo/quiz, nontechnical comprehension result, correct terminology, no truncated or query-stuffed FAQs, and score ≥80.

### 3. Unicorn startups — keep and rebuild

**Goal:** A defensible Australian unicorn dataset and founder decision guide, not valuation mythology.

1. Build a dated mini-dataset of at least five Australian-founded companies with a publicly attributable US$1 billion-plus valuation.
2. Record valuation date, round, currency, evidence source, and current-status confidence. Use “unknown” rather than inference.
3. Add a checked post-money valuation and cap-table example.
4. Interview two Australian founders, VCs, startup lawyers, or accountants.
5. Explain what a valuation does and does not mean: it is not cash, revenue, profit, or a guaranteed exit.
6. Cover down rounds, exits, and loss of status.
7. Publish a downloadable valuation one-pager or calculator.

Use the original Aileen Lee/Cowboy Ventures history, company and lead-investor announcements, reputable financial reporting, and method-transparent Australian funding reports.

**Primary CTA:** “Track the evidence investors care about” → `/vibe-raising`.
**Secondary CTA:** founder/investor events → `/events`.

**Ready when:** traceable Australian dataset, explicit US$/A$ handling, two first-hand voices, independently checked maths, no irrelevant failure-rate/query FAQs, and score ≥80.

### 4. What an entrepreneur does — keep as the first-founder canonical

**Goal:** A real Australian founder 30/60/90-day operating plan.

1. Merge useful material from `how-to-startup-a-practical-guide-for-first-time-founders`, then 301 it.
2. Run a disclosed one-to-two-week diary/interview study with at least six MLAI founders.
3. Aggregate time spent on customer discovery, building, selling, administration, people, and fundraising; clearly state sample limits.
4. Document at least two real validation experiments with input, action, result, and decision.
5. Produce an original experiment ledger and stop/continue/pivot checklist.
6. Use official Australian sources for structure, registration, tax, employment, privacy, and IP handoffs without presenting individual legal or tax advice.
7. Structure the page as days 1–10, 11–30, 31–60, and 61–90.

**Primary CTA:** “Turn your experiments into a company plan and update” → `/founder-tools/start`.
**Secondary CTA:** founder workshops → `/events`.

**Ready when:** founder diary evidence, two real experiments, original worksheet, official Australian handoffs, merged duplicate, working 301, and score ≥80.

### 5. Singapore accelerator count — merge and 301

**Goal:** Remove an unsupported, peripheral count and strengthen one maintained Australian founder resource.

1. Choose the Australian accelerator canonical using Search Console/backlink evidence; provisional recommendation: `startup-accelerator-australia`.
2. Merge the useful fit/verification framework from both MLAI accelerator pages.
3. Replace the Singapore count with a short, sourced section on overseas/Singapore options for Australian founders.
4. Build a maintained program table with program, stage, sector, location/format, intake, fee/equity, eligibility, source, and last-verified date.
5. Verify each row from the program itself; aggregators are discovery leads only.
6. Assign an owner and quarterly update SLA.
7. Add alumni or founder interviews and a program-fit scorecard.
8. Publish the destination first, then 301 the Singapore URL and remove it from registry/sitemap/internal links.

If MLAI chooses to retain a dedicated Singapore page, it needs a public row-level dataset, exact inclusion rules, two-reviewer deduplication, three Australian-founder interviews, and quarterly maintenance. Otherwise it should not exist.

**Primary CTA:** “Build your accelerator evidence pack” → `/founder-tools/start`.
**Secondary CTA:** online accelerator/alumni event → `/events`.

**Ready when:** destination score ≥80, every row verified in the previous 90 days, method/changelog/owner public, then one-hop 301 passes.

### 6. Best AI for coding in 2025 — replace with an evergreen benchmark

**Goal:** A reproducible MLAI Studio comparison based on real work, not a yearly listicle.

1. Create a date-neutral canonical such as `ai-coding-assistants-tested-on-real-projects`.
2. Select four to six tools and freeze exact versions, prices, model settings, permissions, and test date.
3. Use the same licence-safe tasks: bug fix, API error handling, refactor, test generation, UI state, and agent workflow.
4. Pre-register the scoring method before running tests.
5. Measure verified completion, regressions, time, cost, tokens, human interventions, security/privacy behaviour, and out-of-scope changes.
6. Use hidden acceptance tests and blinded human review where practical.
7. Publish prompts, fixtures, raw results, failures, exclusions, and analysis code.
8. Explain which tool suits which constraint; do not declare one universal winner.
9. Publish the replacement, then 301 the stale 2025 URL.

**Primary CTA:** “Ship real AI projects with Australian startups” → `/mlai-studio#apply`.
**Secondary CTA:** online coding-tool showdown or build lab → `/events`.

**Ready when:** reproducible benchmark, no affiliate influence, all tools/versioned, failures included, destination score ≥80, and one-hop 301 works.

### 7. Sydney AI and tech meetups — keep and rebuild

**Goal:** A maintained, genuinely useful Sydney/online event finder.

1. Define inclusion criteria: active AI/ML/tech group, public evidence, upcoming or recurring activity, and Sydney or online accessibility.
2. Build a dated table with organiser, audience, topic, cadence, cost, venue/format, accessibility, registration URL, and last-verified date.
3. Verify with organisers; interview at least six and attend or obtain first-hand reports for at least three events.
4. Explain how to select a meetup by goal and how to judge whether a group is still active.
5. Add a correction/submission form for organisers.
6. Assign monthly ownership and remove stale entries.
7. Delete every dating/singles FAQ and any query unrelated to AI/tech events.
8. For Sydney readers, promote online MLAI events unless a verified Sydney MLAI event actually exists.

**Primary CTA:** “Browse upcoming MLAI events in person or online” → `/events`.

**Ready when:** maintained directory, first-hand checks, verified links, last-checked owner/date, no dating contamination, and score ≥80.

### 8. AGI acronym page — merge and 301

**Goal:** One honest AGI explainer, not separate pages for the acronym and expanded term.

1. Upgrade `what-is-general-artificial-intelligence-and-why-it-matters` before redirecting.
2. Compare major definitions in a sourced matrix and distinguish capability claims, benchmarks, and marketing labels.
3. Add an MLAI expert roundtable or at least three named Australian researcher/practitioner perspectives.
4. Explain what current systems can and cannot demonstrate and why prediction dates are uncertain.
5. Build an original benchmark/claim evaluation worksheet.
6. Remove duplicated vendor summaries and hype-driven FAQs.
7. Move the useful acronym-page material, publish the canonical, then 301 the acronym URL.

**Primary CTA:** AGI/current-systems talks and debates → `/events`.
**Secondary CTA after client intake exists:** “Build the useful system available now” → `/mlai-studio/start-project`.

**Ready when:** canonical destination score ≥80, definition matrix, named perspectives, uncertainty handled, and redirect/sitemap/internal-link tests pass.

### 9. Invest in business startups — merge into founder funding readiness

**Goal:** Align the page with MLAI founders and avoid maintaining weak retail investment advice.

1. Upgrade `startup-company-investment-for-ai-founders` from 69 to 80-plus.
2. Reframe useful due-diligence material as “what investors will inspect before funding your company”.
3. Add an original Australian AI funding-readiness model with milestones, runway, evidence, risks, and use of funds.
4. Analyse an anonymised set of MLAI pitch decks or founder updates and report recurring evidence gaps.
5. Have a qualified Australian startup lawyer/accountant/investor review financial and legal statements.
6. Use ASIC/Moneysmart for any retained retail-investor context and clearly separate general information from advice.
7. Add a real funding-readiness worksheet inside Founder Tools or as a usable download.
8. Publish the founder canonical first, then 301 the investor-intent URL.

Current official Australian guidance says crowd-sourced startup investments can be highly speculative, illiquid, and capable of losing all invested money. The merged page should not encourage retail investing.

**Primary CTA:** “Build investor trust before you raise” → `/vibe-raising`.
**Secondary CTA:** founder/investor events → `/events`.

**Ready when:** destination score ≥80, qualified review, original MLAI evidence/model, advice boundary clear, real tool/worksheet, and one-hop redirect works.

### 10. AI Bits Issue 9 — correct and rebuild with an MLAI experiment

**Goal:** Turn the most serious accuracy failure into MLAI’s strongest example of transparent correction and reproducible practice.

1. Add a prominent correction dated 28 July 2026. State that the earlier version incorrectly attributed the work to Anthropic and reported quantitative experiments absent from the source.
2. Correct the source to Nghi D. Q. Bui’s OPENDEV technical report, arXiv:2603.05344v3, and state that it is a work in progress without systematic quantitative evaluation.
3. Remove the “thousands of tasks”, `progress.txt`, last-20-commits, 65%, 40%, initializer-coder, and unsupported autonomous-production claims.
4. Separate architecture descriptions, author-reported implementation observations, MLAI metaphors, and independent MLAI findings visually.
5. Run the **MLAI Studio Agent Handoff Test**:
   - five public TypeScript fixtures;
   - bare continuation versus a structured handoff bundle;
   - three repetitions per condition: 30 runs;
   - same model/version, agent, tools, budget, timeout, and container;
   - randomised condition order;
   - hidden acceptance tests;
   - primary outcome: verified completion without regression or out-of-scope changes;
   - secondary outcomes: time, cost, tokens, rereads, interventions, regressions, and claimed-versus-verified success.
6. Pre-register the protocol before seeing results.
7. Publish fixtures, commits, prompts, container, verifier, raw data, sanitised logs, exclusions, and analysis.
8. Call the result exploratory and report uncertainty. If the experiment is incomplete, publish only the planned protocol and do not invent placeholder results.
9. Include a downloadable `HANDOFF.md`, `acceptance.json`, `run-state.json`, and verifier checklist.
10. Name the writer, source checker, experiment operator, and reviewer; disclose the actual role of AI tools.

Suggested replacement title:

> What Keeps Coding Agents on Track After Context Runs Out? OPENDEV’s Architecture and an MLAI Studio Handoff Test

**Primary CTA:** “Apply to build production AI systems with MLAI Studio” → `/mlai-studio#apply`.
**Secondary CTA:** a real online Paper-to-Practice Lab → `/events`, but only after a registration page exists.

**Ready when:** all false claims are removed, correction history is visible, source status is exact, the experiment is independently reproducible, every number maps to the paper or MLAI dataset, and score ≥80.

## Phase 5 — implementation order

### Release A: days 1–3

- snapshot analytics and backlinks;
- noindex salary and Issue 9;
- reconcile the 62-versus-57 branch mismatch;
- fix article-level robots handling;
- pause new query-led publishing.

### Release B: days 4–8

- add Studio project-intake route;
- add public Founder Tools start page;
- add shared conversion component and tracking;
- update the internal-link checker;
- fix publisher/authors/dates/schema/canonicals.

### Release C: weeks 2–3

- restore and rebuild salary;
- correct Issue 9 and start its pre-registered experiment;
- rebuild the Australian accelerator, AGI, and founder-investment destinations;
- implement their redirects only after destinations pass review.

### Release D: weeks 3–5

- run and publish the coding benchmark;
- rebuild Sydney events;
- rebuild beginner AI;
- rebuild entrepreneur and unicorn pages;
- merge their related query variants.

### Release E: week 6

- complete editorial, legal/financial, data, accessibility, and technical review;
- rescore every destination;
- publish only destinations scoring 80 or higher;
- regenerate sitemap and request recrawl.

## Phase 6 — validation

Run:

```bash
bun run typecheck
bun run check:article-internal-links
bun run generate:sitemap
bun run build
```

Add automated assertions for:

- canonical article returns 200;
- aliases and retired pages return one-hop 301s;
- unknown article returns 404;
- temporary page has one noindex directive and is absent from sitemap/directory;
- each indexable page has one canonical and one robots directive;
- Article JSON-LD has MLAI publisher, valid logo, correct authors, and dates;
- no duplicate Article or FAQ nodes;
- no redirecting URL appears in the sitemap or internal links;
- no CTA has a `#` placeholder or generic `/articles` destination;
- every indexable article has a rendered H1, substantive body, named author/reviewer, and working primary CTA.

After deployment:

- inspect each URL and redirect with `curl`;
- validate schema;
- use Search Console URL Inspection;
- request recrawl only after the replacement is live;
- monitor indexing, selected canonical, impressions, and CTA conversions weekly for 12 weeks.

## Ownership and cadence

Recommended minimum team:

- one editorial owner;
- one engineer;
- one research/data lead;
- one subject reviewer per domain;
- one community/events owner;
- one conversion/analytics owner.

The data-heavy pages need an explicit maintenance owner:

- salary: quarterly;
- coding benchmark: quarterly or after material product releases;
- Sydney events: monthly;
- accelerator database: quarterly;
- unicorn dataset: quarterly;
- paper/newsletter corrections: whenever source revisions change conclusions.

The plan should take approximately six weeks with parallel work. Without original research capacity, publish fewer pages; do not replace visible automation artefacts with polished but still commodity summaries.
