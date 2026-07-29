# MLAI article content-quality and Google Search audit

**Audit date:** 27 July 2026
**Scope:** Every article URL published in the live `https://mlai.au/sitemap.xml` at the time of audit
**Live article count:** 62
**Purpose:** Identify pages that may look low-value, search-first, or scaled/templated to Google, and prioritise remediation

## Executive verdict

Google does **not** ban or automatically demote an article merely because AI helped create it. Google says it evaluates the usefulness, originality, accuracy, relevance, and purpose of the finished content. Generative AI can be used for research and structure. The material risk arises when a site generates many pages primarily to manipulate Search rankings or Google's generative-AI answers, especially pages that are unoriginal and add little or no value.

MLAI has a **high portfolio-level risk that warrants immediate remediation**, but this audit cannot conclude that Google has applied, or will apply, a spam penalty. Intent is part of Google's scaled-content-abuse definition, and intent cannot be proven from page output alone. No Search Console manual-action data was available to this audit.

The concern is the combined pattern:

- many closely related query-variant articles, including two AGI pages, two AI-agent pages, two cofounder-values pages, and several overlapping beginner-AI and startup guides;
- visible template or generation artefacts, malformed and truncated copy, irrelevant “People also ask”-style FAQs, fake or misdirected download calls to action, and repeated generic passages;
- little first-hand MLAI evidence in subjects where MLAI should have unusually strong experience, such as Australian AI communities, meetups, founders, accelerators, and events;
- irrelevant or weak sources labelled “authoritative”, and the same three generic Australian AI-policy references appended to most configured pages even when unrelated;
- publication bursts and pages written around numerous search-query variations rather than a smaller set of definitive resources.

The most serious single page is **“How Much Do Data Scientists Make?”**: it is a published, indexable 200 page whose content module is missing, so users receive only the registry description and byline.

Across the 62 live articles:

- **10 urgent (16%):** score below 45 — noindex, remove, merge, or rebuild before leaving indexed.
- **39 material low-value risk (63%):** score 45–64 — substantial human improvement or consolidation required.
- **10 adequate but improve (16%):** score 65–79 — keep indexed, then strengthen.
- **3 strong (5%):** score 80–100 — preserve and maintain.

The corpus average is **55.8/100**. In total, **49 of 62 pages (79%)** need material work or urgent containment. That does not mean 49 pages are Google spam violations; it means they currently lack enough original, trustworthy, well-edited value to be comfortable assets under Google's published guidance.

## What Google actually announced

The remembered May 2026 item was real, but it combines three different developments:

1. **15 May 2026 — guidance, not an algorithm report.** Google published [a new resource for optimizing for generative AI in Search](https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing). Its linked guide says that unique, compelling, non-commodity, first-hand content matters; creators should not recycle what is already online or what a model could easily produce; and making separate pages for every possible query variation primarily to manipulate rankings or AI responses violates the scaled-content-abuse policy.
2. **21 May–2 June 2026 — May 2026 core update.** Google's [status record](https://status.search.google.com/incidents/wdAXJk6LRRihEjpzEeWE) confirms the rollout dates. Google did not disclose that this update specifically targeted AI articles or content farms.
3. **24–26 June 2026 — June 2026 spam update.** This is the most recent relevant public ranking rollout as of this audit. Google's [status record](https://status.search.google.com/incidents/YUX1peHev5a4fkxLDiUQ) says it was global and applied to all languages, but does not disclose a specific spam subtype.

The rule the user remembered was introduced earlier. On **5 March 2024**, Google [announced changes intended to show less content made to attract clicks](https://developers.google.com/search/blog/2024/03/core-update-spam-policies) and introduced the named **scaled content abuse** spam policy. The method is deliberately neutral: Google's [current spam policy](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content) defines the abuse as many pages created primarily to manipulate rankings rather than help people, usually large amounts of unoriginal, low-value content, **no matter how it is created**.

## How Google plans to treat AI-generated articles

### 1. AI assistance itself is not the offence

Google's [generative-AI content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) says generative AI can be useful for topic research and structuring original work. It asks publishers to focus on accuracy, quality, and relevance and to give readers context about how substantial automation was used when that context would reasonably be expected.

### 2. Ordinary low-value content and spam are related but not identical

A weak individual page may simply be less likely to rank, be selected for AI answers, or be indexed. It is not automatically “spam”. Scaled content abuse is a portfolio practice: many low-value or unoriginal pages plus a primary purpose of manipulating rankings or generative-AI responses.

### 3. Google explicitly warns against query-variant page factories

Google's 2026 [generative-AI Search guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) says:

- provide a unique point of view and first-hand experience;
- make non-commodity content rather than generic summaries anyone could create;
- do not recycle what others have said or what an AI model could easily produce;
- do not create separate content for every possible search/fan-out query primarily to manipulate visibility;
- no special “AEO/GEO” writing hack, schema, page length, `llms.txt`, or keyword variation is required.

This is directly relevant to MLAI's overlapping AGI, agent, beginner-AI, startup, cofounder, education, venture-capital, and meetup clusters.

### 4. Enforcement can be algorithmic or manual

Google says policy violations are detected through automated systems and, where needed, human review. Consequences can include lower rankings, exclusion from results, or a manual action. Google's [spam-update guidance](https://developers.google.com/search/docs/appearance/spam-updates) also says automated systems may need **months** to learn that a remediated site complies.

### 5. The practical test is people-first value and trust

Google's [people-first content self-assessment](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) asks whether content:

- contains original reporting, research, analysis, or information beyond the obvious;
- demonstrates first-hand experience and real expertise;
- is complete enough for the reader to achieve their goal without searching again;
- clearly identifies who created it, how it was created, and why;
- uses trustworthy evidence and accurate authorship;
- exists for an established audience and site purpose rather than mainly to capture search traffic.

Google says its quality-rater scores do not directly determine rankings. Likewise, the scores in this report are an editorial risk model, not a reconstruction of Google's algorithm.

## Audit method and scoring

### Corpus

The live sitemap contained 62 `/articles/*` URLs, and all 62 returned HTTP 200 during the audit. The current working branch contains only 57 registry entries; the five additional live pages were inspected from `origin/main` and their live output:

- `featured/startup-company-investment-for-ai-founders`
- `featured/what-community-is-in-ai-and-why-it-is-more-than-a-group`
- `featured/what-is-an-accelerator-and-is-it-right-for-your-ai-startup`
- `featured/invest-in-business-startups-before-you-commit`
- `featured/a-practical-guide-for-australian-founders-building-an-ai-startup`

There are also 73 content modules that are not registered or published and return 404; they were excluded because the request was to audit published articles.

### Evidence inspected

- live sitemap, HTTP status, rendered page output, canonicals, and structured data;
- article registry metadata and every published TSX content module;
- headings, body copy, references, FAQ/PAA sections, calls to action, publication dates, authorship, and cross-article repetition;
- topic overlap and five-word-shingle similarity across the corpus;
- official Google Search documentation and update records.

This was not a plagiarism determination, factual peer review of every sentence, backlink audit, or performance audit using Search Console analytics. Those would require additional evidence.

### 100-point editorial risk rubric

| Dimension | Points | What earns the points |
|---|---:|---|
| Originality and first-hand experience | 25 | MLAI data, reporting, testing, interviews, cases, methodology, or a genuinely distinctive expert view |
| Usefulness and completeness | 20 | Fully satisfies its promise and gives the reader an actionable or definitive result |
| Accuracy, sources, and freshness | 20 | Primary/reputable evidence, claim-level support, reconciled statistics, and current volatile information |
| Trust: Who, How, and Why | 15 | Accurate authorship/review, demonstrated qualifications, creation context, and a clear people-first purpose |
| Editorial craft | 10 | Coherent, specific, human-edited copy without truncation, filler, broken UI, or template debris |
| Audience fit and portfolio uniqueness | 10 | Serves MLAI's Australian AI audience and is meaningfully distinct from other MLAI pages |

| Score | Audit classification | Default treatment |
|---:|---|---|
| 80–100 | Strong | Preserve, maintain, and use as a model |
| 65–79 | Adequate; improve | Keep indexed; strengthen in normal editorial work |
| 45–64 | Material low-value risk | Major human improvement, merge, or reposition |
| 0–44 | Urgent | Noindex/remove/merge or rebuild before leaving indexed |

Shared technical defects are reported separately rather than subtracting the same issue repeatedly from all 62 content scores.

## Corpus-wide technical and trust defects

These defects do not prove spam, but they weaken Google's ability to trust and consolidate the content:

1. **Wrong publisher on every live article.** The shared Article JSON-LD says the publisher is `Support Sorted`, not MLAI, and points to a missing `/favicon_128px.png`.
2. **Duplicate indexable URL aliases.** Registry lookup accepts the full category slug, a category-less leaf slug, and arbitrary case variants. The alternate URL returns the same article with HTTP 200, while the root layout self-canonicalises the alternate pathname. This creates duplicate pages and conflicting canonical signals instead of redirecting aliases to the one registered URL.
3. **One published page has no body.** `featured/how-much-do-data-scientists-make` is registered and in the sitemap but lacks its content module. The fallback renders only a short description and byline.
4. **Authorship is inconsistent.** The root emits two author meta tags—Dr Sam Donegan and Dr Lukas Wesemann—on every page, including pages credited to the MLAI Content Team. Some body constants/embedded schema disagree with the registry author, and multi-author arrays are collapsed into a single `Person`.
5. **Dates drift.** Twenty-two body-level publication constants disagree with the registry/schema/sitemap date.
6. **Duplicate or irrelevant boilerplate.** Forty-seven pages repeat the same disclaimer; 31 emit duplicated FAQ structured data in addition to other schema; and 53 configured pages append the same three generic AI-policy references, including pages about pitching, venture capital, salaries, and education where those sources do not support the claims.
7. **Weak internal linking.** Only one of 54 configured live pages has curated, topic-relevant internal links. Most “Related reads” are selected by registry adjacency, not semantic relevance.
8. **Generic social metadata.** Article pages inherit generic `MLAI` Open Graph title/description/image and `website` type rather than article-specific social metadata.
9. **Metadata quality.** Eight descriptions are under 70 characters and 17 exceed 160 characters. The salary title also ends with a stray apostrophe.
10. **Deployment/corpus mismatch.** The live site and `origin/main` registry publish 62 articles while the checked-out branch registry has 57. The committed `public/sitemap.xml` has only 53 article entries, although the live generated sitemap had 62. Remediation must begin by reconciling the canonical source of truth so fixes do not accidentally drop or omit live pages.

## Immediate containment queue

These ten pages scored below 45. Temporarily noindex/unpublish them until the stated defect is corrected, or merge/redirect them where a stronger canonical exists:

1. **How Much Do Data Scientists Make? — 9:** no article body.
2. **What Is Artificial Intelligence in Simple Words? — 29:** truncation, repeated generator artefacts, overlap.
3. **What Is a Unicorn Startup and Why It Matters — 30:** broken copy, filler instructions visible, irrelevant queries.
4. **What an Entrepreneur Does and How to Start Well — 34:** incomplete/template-led copy and query padding.
5. **Singapore Accelerators and Incubators — 36:** precise volatile counts with zero sources.
6. **Best AI for Coding in 2025 — 39:** stale title, published in 2026, and no actual tool comparison or benchmark.
7. **Sydney AI and Tech Meetup — 40:** does not name enough meetups and contains dating/singles FAQs.
8. **What Is AGI — 42:** direct query duplicate of the expanded-term AGI page.
9. **Invest in Business Startups — 42:** malformed, weakly sourced financial advice.
10. **AI Bits Issue 9 — 43:** attributes a single-author OPENDEV work-in-progress to Anthropic and reports quantitative experiments absent from the cited paper.

## Article-by-article audit

Scores assess the live article as a reader and Google can encounter it on 27 July 2026. “Noindex now” means a temporary protective measure while the page is being rebuilt; a page that has a useful replacement should normally be consolidated with a 301 redirect rather than left as a permanent duplicate.

| Published article | Score | Classification | Main issue and required action |
|---|---:|---|---|
| [Startup Company Investment for AI Founders](https://mlai.au/articles/featured/startup-company-investment-for-ai-founders) | 69 | Adequate; improve | A clean milestone/runway framework with a real checklist, but mostly generic and quantitatively weak. Add an original Australian AI funding model, primary/local data, claim-level support, and the author's relevant experience. |
| [What Community Is in AI and Why It Is More Than a Group](https://mlai.au/articles/featured/what-community-is-in-ai-and-why-it-is-more-than-a-group) | 59 | Material risk | MLAI's ideal first-hand subject is reduced to generic definitions, with no member/event outcome, quote, or operating data; sources include Wikipedia, Medium, and an unrelated article, and the CTA points to `#`. Rebuild around MLAI practice and evidence. |
| [What Is an Accelerator and Is It Right for Your AI Startup?](https://mlai.au/articles/featured/what-is-an-accelerator-and-is-it-right-for-your-ai-startup) | 50 | Material risk | The worksheet helps, but source retrieval failed: AWS Global Accelerator, Jedox, “Value Accelerator”, and “Cashflow Accelerator” are unrelated meanings presented as authoritative. Replace with current Australian program terms, comparisons, and founder/alumni interviews. |
| [Invest in Business Startups Before You Commit](https://mlai.au/articles/featured/invest-in-business-startups-before-you-commit) | 42 | **Urgent** | Financial/YMYL advice contains literal template debris and malformed prose, while evidence is mostly fundraising/vendor/LinkedIn material rather than ASIC or Moneysmart. Noindex until rebuilt and reviewed by a qualified Australian investment/legal editor. |
| [A Practical Guide for Australian Founders Building an AI Startup](https://mlai.au/articles/featured/a-practical-guide-for-australian-founders-building-an-ai-startup) | 59 | Material risk | The workflow and worksheet are useful, but “Australian” is superficial and omits concrete programs, privacy/responsible-AI obligations, and MLAI founder evidence. Add a worked founder case, primary data, exact resources, and verify/remove the extraordinary founder-age claim. |
| [Best Meetup Websites for AI and Startup Communities in Australia](https://mlai.au/articles/featured/best-meetup-websites-for-ai-and-startup-communities-in-australia) | 52 | Material risk | It under-delivers on “best websites”: mostly organisation pages, not a tested platform comparison, with an irrelevant singles source and stale organiser material. Rewrite as a date-stamped first-hand Meetup/Eventbrite/Humanitix/Luma comparison with method, features, pricing, and Australian testing. |
| [Where to Find AI Events in Melbourne](https://mlai.au/articles/featured/where-to-find-ai-events-in-melbourne) | 69 | Adequate; improve | Useful named examples and planner, but mainly paraphrases organiser marketing and shows no MLAI attendance or selection evidence. Add verified current dates/URLs, a maintenance owner, and first-hand photos, recommendations, or organiser quotes. |
| [Why Australian Startups Need Stronger AI Communities](https://mlai.au/articles/featured/why-australian-startups-need-stronger-ai-communities) | 47 | Material risk | Search-first contamination includes unrelated “top 10 startups” and “business with $100K” FAQs; sections are incomplete and MLAI supplies none of its own evidence. Urgently rewrite around member/event outcomes and interviews, and delete the unrelated FAQ/schema. |
| [How to Find an AI and Tech Meetup in Sydney](https://mlai.au/articles/featured/how-to-find-an-ai-and-tech-meetup-in-sydney) | 40 | **Urgent** | Names almost no current Sydney meetups and injects dating/singles queries into FAQ/schema. Noindex until rebuilt as a verified directory/comparison with organisers, dates, links, selection method, and first-hand checks. |
| [How Many People Use Artificial Intelligence in 2026?](https://mlai.au/articles/featured/how-many-people-use-artificial-intelligence-in-2026) | 57 | Material risk | Repeats a broad “over 1 billion” estimate without definition/method, conflicts with an unreconciled Medium statistic, and leans on SEO stat roundups. Rebuild the data core from primary surveys with sample, geography, field date, definition, and methodology. |
| [What Is an Intelligent Agent in Artificial Intelligence?](https://mlai.au/articles/featured/what-is-an-intelligent-agent-in-artificial-intelligence) | 52 | Material risk | Near-query duplicate of the agent article, with largely the same definition/loop; a supposed checklist links only to `/articles` with irrelevant fundraising copy. Merge into one canonical agent guide with a PEAS/worked example, diagram or code, and primary sources. |
| [What Is a Unicorn Startup and Why It Matters](https://mlai.au/articles/featured/what-is-a-unicorn-startup-and-why-it-matters) | 30 | **Urgent** | Visible editorial failure: a FAQ truncates mid-word, literal copy discusses working “without filler”, unrelated PAA is injected, and the download is bogus. Noindex and human-rewrite from primary history/data with Australian cases, or remove. |
| [What an Entrepreneur Does and How to Start Well](https://mlai.au/articles/featured/what-an-entrepreneur-does-and-how-to-start-well) | 34 | **Urgent** | Repeated “without filler” artefacts, thin/incomplete sections, a generic resource CTA, and unrelated query FAQs. Noindex pending a real Australian 90-day founder plan with examples, templates, and primary official evidence. |
| [What Is Artificial Intelligence in Simple Words?](https://mlai.au/articles/featured/what-is-artificial-intelligence-in-simple-words) | 29 | **Urgent** | FAQ and alt text visibly truncate, filler-template copy repeats, taxonomy is overconfident, and the page overlaps the other beginner explainers. Noindex and consolidate; human-rewrite with an accurate original demonstration or diagram. |
| [What Is an Agent in Artificial Intelligence?](https://mlai.au/articles/featured/what-is-an-agent-in-artificial-intelligence) | 48 | Material risk | The more complete agent page still contains a false checklist CTA, a thin traits section, irrelevant “Big 4 AI agents” FAQ, and filler copy. Use only as the canonical after a substantial rewrite and merge/redirect the intelligent-agent variant. |
| [How to Startup a Small Business in Australia](https://mlai.au/articles/featured/how-to-startup-a-small-business-in-australia) | 49 | Material risk | Official ATO/business.gov.au grounding helps, but the promised registration checklist is incomplete and legal/tax structure advice is reductive. Remove PAA/fake CTA and have a qualified editor add current official steps, thresholds, links, and caveats. |
| [What Is General Artificial Intelligence and Why It Matters](https://mlai.au/articles/featured/what-is-general-artificial-intelligence-and-why-it-matters) | 47 | Material risk | Same intent, claims, structure, and six core sources as “What Is AGI”, published eight days apart. Consolidate/redirect and add a sourced definitions/benchmarks comparison plus an identifiable MLAI expert view. |
| [What Constitutes a Startup in Practice](https://mlai.au/articles/featured/what-constitutes-a-startup-in-practice) | 55 | Material risk | Coherent but commodity and repetitive, with universalised definitions, unrelated “50-100-500”/“4 Ps” FAQs, and a generic download. Add primary definitions, Australian legal/policy context, founder comparisons, and a real decision worksheet. |
| [What Is AGI in Artificial Intelligence and Why It Matters](https://mlai.au/articles/featured/what-is-agi-in-artificial-intelligence-and-why-it-matters) | 42 | **Urgent** | A direct acronym-query duplicate of the general-AI page, sharing its claims and six sources, with malformed passages and a generic CTA. Noindex now, merge its useful material into one AGI resource, then 301 it. |
| [What Is Artificial Intelligence Used For in Everyday Work and Life](https://mlai.au/articles/featured/what-is-artificial-intelligence-used-for-in-everyday-work-and-life) | 50 | Material risk | A generic catalogue overlapping the beginner-AI pages, with no tested workflow/case data, an irrelevant “Which 3 jobs survive AI?” FAQ, literal filler, and a false download. Merge or narrow to first-hand Australian workflow cases with before/after evidence. |
| [Why Founders Clubs Work for Early Stage Growth](https://mlai.au/articles/featured/why-founders-clubs-work-for-early-stage-growth) | 50 | Material risk | Malformed generator prose and provider/blog synthesis with no MLAI member evidence. Replace the fake download, add founder interviews and event/cohort data, and report measured outcomes. |
| [What Is Inference in Artificial Intelligence and Why It Matters](https://mlai.au/articles/featured/what-is-inference-in-artificial-intelligence-and-why-it-matters) | 69 | Adequate; improve | Accurate and useful, but repetitive and derivative. Add a reproducible inference walkthrough plus a measured latency/cost/quality comparison. |
| [How to Build AI for Real Business Problems](https://mlai.au/articles/featured/how-to-build-ai-for-real-business-problems) | 60 | Material risk | Useful workflow but no real build or evaluation, and some malformed copy. Add an Australian SME case with baseline, test set, error, cost, privacy, and outcome measures. |
| [How to Start a Company Around an AI Idea From Prototype to Customers](https://mlai.au/articles/featured/starting-a-company-around-an-ai-idea-from-prototype-to-customers) | 62 | Material risk | Practical sequence but generic and overlapping other startup guides. Add a real Australian founder/pilot, offer/KPI/legal templates, primary OAIC/IP sources, and consolidate the cluster. |
| [How to Startup](https://mlai.au/articles/featured/how-to-startup-a-practical-guide-for-first-time-founders) | 60 | Material risk | Sensibly rejects unsupported startup statistics but remains broad and template-led. Add an Australian registration decision tree and founder-tested checklist, then merge overlapping startup material. |
| [What Is Artificial Intelligence With Example for Everyday Readers](https://mlai.au/articles/featured/what-is-artificial-intelligence-with-example-for-everyday-readers) | 58 | Material risk | Accurate but generic and keyword-shaped, with forced “AI stock”/“4 types” FAQs and visible generator residue. Rewrite around original Australian examples/diagrams and remove query bait. |
| [How to Get the First Customers for My Startup in 2026](https://mlai.au/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026) | 62 | Material risk | Practical beachhead/outreach advice, but no scripts, targets, worked example, or first-hand proof. Add a numbered 30-day plan, real scripts and measures, and an MLAI founder case. |
| [Go to Market for Startups](https://mlai.au/articles/featured/go-to-market-for-startups) | 57 | Material risk | Generic vendor-source synthesis with substantial overlap with the first-customers article. Make it a distinct downloadable GTM experiment canvas with worked metrics, or merge it. |
| [How to Assess Cofounder Values Match Before You Commit](https://mlai.au/articles/featured/how-to-assess-cofounder-values-match-before-you-commit) | 56 | Material risk | Useful conversation/trial framework, but near-duplicates the “test” page and promises four items while its numbering is broken. Retain as the possible canonical, merge the other page, and add founder interviews. |
| [A Practical Guide on How to Create an Artificial Intelligence](https://mlai.au/articles/featured/a-practical-guide-on-how-to-create-an-artificial-intelligence) | 55 | Material risk | The headline promises a build guide, but the body is high-level adoption strategy with no stack, code, data split, or evaluation. Rebuild as one reproducible project or retitle it honestly as AI-project planning. |
| [How to Choose the Best AI for Coding in 2025](https://mlai.au/articles/featured/how-to-choose-the-best-ai-for-coding-in-2025) | 39 | **Urgent** | Published in 2026 with a stale 2025 title; its “comparison” names and benchmarks no tools. Noindex/remove or rebuild with dated hands-on tests, exact versions/prices/tasks, methodology, and results. |
| [How to Test for a Cofounder Values Match Before You Commit](https://mlai.au/articles/featured/how-to-test-for-a-cofounder-values-match-before-you-commit) | 48 | Material risk | Empty hero image, repeated paragraphs/fragments, and near-duplicate intent, copy, and sources. Merge its useful material into the assess page and 301 redirect this URL. |
| [How Technology Affects Education Negatively](https://mlai.au/articles/featured/how-technology-affects-education-negatively) | 67 | Adequate; improve | Balanced and useful with strong institutions, but still desk synthesis with uncited attention/sleep claims and overlap across four education pages. Add claim-level research and Australian teacher/student evidence; consider one education hub. |
| [How to Get Started with AI in Australia (2026)](https://mlai.au/articles/featured/how-to-get-started-with-ai-2026) | 55 | Material risk | Strong pilot steps, but no article-specific evidence despite “evidence-based”, and a visibly machine-shaped “What is How to get started…” heading. Rewrite the heading, cite current primary documentation, and show an MLAI pilot with measured results. |
| [Best Way to Learn About AI in 2026](https://mlai.au/articles/featured/best-way-to-learn-about-ai-2026) | 45 | Material risk | No sources, templated/awkward structure, placeholder-like summary, and a recommendation for the AWS ML Specialty after its 31 March 2026 retirement. Urgently refresh and merge or sharply differentiate it from the other learning guides. |
| [Learn AI Melbourne: Courses, Meetups, and Pathways](https://mlai.au/articles/featured/learn-ai-melbourne) | 57 | Material risk | Only two institutions are linked; promised costs, meetups, and pathways remain vague. Build a dated Melbourne table with fees, intakes, mode, prerequisites, live meetup links, and first-hand learner outcomes. |
| [How Small Business Owners Can Get Started with AI (2026)](https://mlai.au/articles/featured/how-small-business-owners-can-get-started-with-ai-2026) | 63 | Material risk | Practical ROI/pilot advice, but half the evidence is marketing/agency content and no result proves the method. Add a documented Australian small-business pilot with baseline, error rate, cost, outcome, and primary privacy/tool sources. |
| [How VCs Value Startups](https://mlai.au/articles/featured/how-vcs-value-startups) | 57 | Material risk | Useful mechanics, but two reference links are 404, local norms are weakly supported, and it cannibalises two VC explainers. Consolidate and publish an auditable worked valuation/cap-table model with current local evidence. |
| [How to Foster Community Engagement (2026)](https://mlai.au/articles/featured/how-to-foster-community-engagement) | 67 | Adequate; improve | A solid inclusive framework with reasonable sources, but MLAI contributes none of its own community experience. Add a “you said/we did” MLAI case with participation/retention metrics and reusable workshop templates. |
| [Startup Accelerators in Australia (2026)](https://mlai.au/articles/featured/startup-accelerator-australia) | 59 | Material risk | Mostly reliable official links, but only four programs represent Australia and program details are volatile. Merge with the newer accelerator page or maintain a verified table with dates, terms, fees/equity, and alumni checks. |
| [How to Find Networking Events in Australia (2026)](https://mlai.au/articles/featured/how-to-find-networking-events) | 63 | Material risk | Good directory links and useful process, but generic and overlapping the Melbourne, Sydney, and platform pages. Make this the maintained canonical event-finder hub with MLAI curation/reviews; consolidate the narrower pages where appropriate. |
| [How Modern Technology Affects Education Today and in the Future (2026)](https://mlai.au/articles/featured/how-modern-technology-affects-education-today-and-in-the-fut) | 63 | Material risk | Stronger primary sourcing and balanced advice, but materially the same desk synthesis as three education pages and no field evidence. Use as the possible canonical hub; add Australian educator/learner interviews or pilot data. |
| [How Technology Has Changed Education (2026)](https://mlai.au/articles/featured/how-technology-has-changed-education) | 50 | Material risk | Two broad sources support many claims and the article nearly duplicates the stronger modern-technology page. Merge and 301 rather than maintaining another query variant. |
| [How Much Venture Capital Was Invested in 2023?](https://mlai.au/articles/featured/how-much-venture-capital-was-invested-in-2023) | 68 | Adequate; improve | Helpful explanation of why global totals differ, but the Australian section gives no exact sourced figure and drifts into job advice. Add a source/scope table and precise Australian numbers, update through 2025, and remove the tangent. |
| [What Are Collaboration Tools](https://mlai.au/articles/featured/what-are-collaboration-tools) | 57 | Material risk | Dictionary/competitor synthesis with generic vendor lists and weak MLAI-specific value. Add MLAI's actual workflow comparison, measured outcomes, and security decisions, or noindex if it remains generic. |
| [How Technology Is Shaping Learning in Higher Education (2026)](https://mlai.au/articles/featured/how-technology-is-shaping-learning-in-higher-education) | 49 | Material risk | Only two sources, one government link is 404, several trend claims lack evidence, and it overlaps the education cluster. Merge/rebuild from current university policy/data and student/educator evidence. |
| [Venture Capital: How It Works (2026)](https://mlai.au/articles/featured/venture-capital-how-does-it-work) | 56 | Material risk | The dilution example is genuinely useful, but sources are generic/global, Australian 2026 claims are unsupported, and it duplicates the VC-firm guide. Move the worked maths into one definitive Australian canonical. |
| [Startup Accelerators and Incubators in Singapore (2026)](https://mlai.au/articles/featured/how-many-startup-accelerators-and-incubators-are-there-in-si) | 36 | **Urgent** | Asserts 60–80 programs and precise category bands with zero source links, admits there is no authoritative list, is volatile, and is tangential to MLAI's Australian focus. Noindex/unpublish unless rebuilt from an auditable dated inventory. |
| [How Does a Venture Capital Firm Work? (2026 Guide)](https://mlai.au/articles/featured/how-does-a-venture-capital-firm-work) | 64 | Material risk | The best VC mechanics candidate, with useful Business.gov/YC support, but local term norms remain weak and it cannibalises the other explainers. Make it canonical, merge the cluster, and add current Australian term data/interviews. |
| [The Best Startup Pitch Deck Ever (2026): An Australian Founder's Guide](https://mlai.au/articles/featured/the-best-startup-pitch-deck-ever) | 70 | Adequate; improve | Useful 12-slide flow and relevant sources, but the title is hyperbolic and the page provides little original proof. Add an annotated real MLAI deck before/after with outcomes and soften the claim. |
| [How to Get a Data Science Job in Australia (2026)](https://mlai.au/articles/featured/how-to-get-data-science-job) | 48 | Material risk | Visible copy says it distils “top-ranking career pages” and answers PAA; two course-provider pages plus APS Jobs support broad hiring claims. Rewrite from an Australian job-ad dataset and hiring-manager interviews; remove search-production language. |
| [How to Pitch Your Big Idea](https://mlai.au/articles/featured/how-to-pitch-your-idea) | 80 | **Strong** | The strongest page: original MLAI deck template, real SupportSorted/Climate pitches, videos, and exercises. Keep; remove one duplicated paragraph, explain stale brand context, trim where helpful, and cite external examples. |
| [How Much Do Data Scientists Make?](https://mlai.au/articles/featured/how-much-do-data-scientists-make) | 9 | **Urgent** | Published 200 page contains only a short description and byline because the registered content module is missing; it has no article body, H1, sources, or bio, and its title ends in an apostrophe. Remove/noindex immediately or wire in and fact-check the orphan careers module. |
| [Weekly Deep Dive into AI and ML Advancements & Updates — Issue 1](https://mlai.au/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates) | 79 | Adequate; improve | Accurately reflects the paper's 15 examples/~93% result, but omits publication status/limitations and pads the page with four unrelated generic FAQs reused in Issue 3. Cite the Nature DOI, add limits, and remove boilerplate. |
| [AI Bits for Techies — Issue 2](https://mlai.au/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2) | 76 | Adequate; improve | Useful synthesis, but generalises from 32 mostly university students, two older models, and categorical Keirsey types into broad product claims. Put those limits beside the findings and test the hypotheses with MLAI users. |
| [AI Bits for Techies — Issue 3](https://mlai.au/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-3) | 73 | Adequate; improve | Treats modelled energy estimates as measured facts and appears based on an older revision: current v6 reports over 29 Wh/65×, not ~33 Wh/70×. Label estimates/assumptions, update the figures, and remove duplicated FAQs. |
| [AI Bits for Techies — Issue 4](https://mlai.au/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-4) | 86 | **Strong** | Strong comparison of an RCT and observational study, with method detail, nuance, and useful engineering metrics. Keep; explicitly label publication/preprint status and do not imply the observational Copilot result proves causality. |
| [AI Bits for Techies — Issue 5](https://mlai.au/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-5) | 87 | **Strong** | Distinctive, accurate three-paper synthesis with practical implications. Label the very recent sources as preprints, separate editorial speculation from findings, remove the unsupported API-interaction claim, and fix nested paragraph markup. |
| [AI Bits for Techies — Issue 6](https://mlai.au/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-6) | 54 | Material risk | Mischaracterises a bibliometric/LDA review as a longitudinal sector analysis and presents MLAI-created “Trust Ceiling/Noise Floor” ideas as paper findings. Rewrite immediately around the actual method/five themes or label and separately support MLAI's framework. |
| [AI Bits for Techies — Issue 7](https://mlai.au/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-7) | 64 | Material risk | Presents a June 2024 OpenVLA preprint as current March 2026 research, says 17.5% rather than 16.5%, and overstates the mechanism and implications. Correct date/number, add limitations, and use a current comparison or tested implementation. |
| [AI Bits for Techies — Issue 8](https://mlai.au/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-8) | 60 | Material risk | Extrapolates a 2023 GPU-gaming conference chapter to compilers, containers, ML training, and inference without evidence; stale and off-mission for AI Bits. Retire/reposition or restrict conclusions to tested games and add current ML benchmarks. |
| [AI Bits for Techies — Issue 9](https://mlai.au/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-9) | 43 | **Urgent** | Serious source misrepresentation: calls a single-author OPENDEV work-in-progress “Anthropic” research and invents thousands of tests plus 65%/40% results despite the paper saying it lacks systematic quantitative evaluation. Unpublish/noindex and verify every claim before a full rewrite. |

### Newsletter primary-source verification

The paper-based newsletter issues were checked against their cited primary works, not scored from prose alone:

- [Issue 1 source](https://arxiv.org/abs/2510.06931)
- [Issue 2 source](https://arxiv.org/abs/2508.21628)
- [Issue 3 source](https://arxiv.org/abs/2505.09598)
- Issue 4 [randomised trial](https://arxiv.org/abs/2507.09089) and [observational study](https://arxiv.org/abs/2510.10165)
- Issue 5 [paper one](https://arxiv.org/abs/2602.07432), [paper two](https://arxiv.org/abs/2602.09270), and [paper three](https://arxiv.org/abs/2602.10127)
- [Issue 6 source](https://www.sciencedirect.com/science/article/abs/pii/S0148296325002061)
- [Issue 7 source](https://arxiv.org/abs/2406.09246)
- [Issue 8 source](https://link.springer.com/chapter/10.1007/978-3-031-41456-5_48)
- [Issue 9 source](https://arxiv.org/abs/2603.05344)

## Portfolio consolidation plan

### Merge into definitive hubs

1. **AI agents:** combine “What Is an Agent…” and “What Is an Intelligent Agent…” into one authoritative guide; keep the better final URL and 301 the other.
2. **AGI:** combine “What Is AGI…” and “What Is General Artificial Intelligence…”; do not maintain pages for the acronym and expanded query separately.
3. **Beginner AI:** make one beginner hub that clearly connects definition, examples, and uses. Either merge “simple words”, “with example”, and “used for” or give each a sharply different audience, evidence base, and outcome.
4. **Cofounder values:** merge “assess” and “test” into one evidence-based worksheet and decision process.
5. **Build/create AI:** merge or clearly separate business discovery from technical implementation. The technical page should contain an actual worked system, data/evaluation method, code or architecture, and failure analysis.
6. **Startup basics:** rationalise “what constitutes a startup”, “how to startup”, “small business in Australia”, “entrepreneur”, “AI startup guide”, and “starting an AI company” into a small journey with distinct stages.
7. **Venture capital:** consolidate the overlapping VC-mechanics pages; keep separate pages only where the intent and evidence are genuinely different.
8. **Education technology:** consolidate the four broad education/technology summaries into fewer expert-led resources or move them out of the primary MLAI editorial focus.

### Pages that should become MLAI-first assets

MLAI has a defensible advantage that generic AI-generated summaries do not:

- publish anonymised findings from MLAI event attendance, member questions, founder cohorts, and community outcomes;
- interview Australian founders, organisers, investors, researchers, and accelerator alumni;
- show dated, maintained comparisons of Australian events, platforms, accelerators, grants, courses, and programs;
- turn advice into downloadable worksheets that really exist and match the page promise;
- include screenshots, photos, diagrams, calculation sheets, methodology notes, sample sizes, and “last verified” dates;
- have a named qualified human author or reviewer sign off material claims.

## Remediation sequence

### First 7 days: contain the highest risk

1. Temporarily noindex or remove the urgent pages until they are rebuilt; immediately restore, redirect, or remove the bodyless salary page.
2. Remove irrelevant dating, investing, stock, “90% fail”, “50-100-500”, “4 Ps”, “Big 4 agents”, and similar PAA/FAQ blocks that do not serve the article's core task.
3. Fix wrong publisher/author/date/schema data and the missing logo.
4. Stop category-less and case-variant URL aliases from returning 200; 301 them to the exact registered canonical URL.
5. Pause new search-targeted article publishing until human editorial checks and consolidation are in place.

### Next 30 days: consolidate and rebuild

1. Choose canonical pages for the duplicate clusters above, move the best material into them, and 301 superseded URLs.
2. Rewrite urgent and material-risk pages around original MLAI evidence, primary sources, and a specific reader outcome.
3. Replace irrelevant default references with claim-level sources; remove duplicated FAQ schema and template text.
4. Add a real author/reviewer page, accurate bylines, an editorial policy, corrections process, and an appropriate AI-assistance disclosure.
5. Curate internal links by topic and reader journey rather than publication adjacency.

### Following 60–90 days: prove compliance and monitor

1. Use Search Console page/query data to decide which overlapping URLs have equity worth preserving and to monitor indexing, manual actions, impressions, and AI-feature visibility.
2. Validate Article/FAQ structured data and canonical/redirect behaviour after deployment.
3. Re-request indexing only after substantive changes are live.
4. Track an editorial evidence field for every article: primary sources, verification date, original contribution, named reviewer, and reason the page deserves to exist.
5. Expect recovery to be gradual; Google says its automated spam systems may need months to recognise sustained compliance.

## Recommended publication gate for future articles

Do not publish unless an editor can answer “yes” to all of these:

- Is the article materially different from every existing MLAI page?
- Does it contain something MLAI knows, observed, tested, calculated, or reported that a generic model could not supply?
- Does it fully solve a task for MLAI's Australian AI audience?
- Are volatile and consequential claims supported by primary, current sources?
- Are author, reviewer, dates, disclosure, schema, metadata, canonicals, links, and calls to action accurate?
- Has a human removed template debris, irrelevant query variants, invented downloads, and unsupported extrapolation?
- Would MLAI still publish and share this article with members if Google sent it no search traffic?
