# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/starting-a-company-around-an-ai-idea-from-prototype-to-customers.tsx
+++ unreviewed-local-draft/app/articles/content/featured/starting-a-company-around-an-ai-idea-from-prototype-to-customers.tsx
@@ -1,283 +1,100 @@
-import type { ReactNode } from 'react'
-import { Home } from 'lucide-react'
-import { AcademicCapIcon, RocketLaunchIcon, UsersIcon } from '@heroicons/react/24/outline'
-import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '~/articles/authors'
-import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
-import AuthorBio from '../../../components/AuthorBio'
-import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
-import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
-import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
-import QuoteBlock from '../../../components/articles/QuoteBlock'
-import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
-import AudienceGrid from '../../../components/articles/AudienceGrid'
-import { ArticleStepList } from '../../../components/articles/ArticleStepList'
-import MLAITemplateResourceCTA from '../../../components/articles/MLAITemplateResourceCTA'
-import { ArticleReferences } from '../../../components/articles/ArticleReferences'
-import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'
+import { Home } from "lucide-react";
+import { Link } from "react-router";
+import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
+import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
+import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
+import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";
+import FounderCapacityWorksheet from "~/components/articles/FounderCapacityWorksheet";
+import { FOUNDER_PILOT_FIELDS, FOUNDER_PILOT_CASES, FOUNDER_PILOT_DOWNLOAD, PILOT_BRIEF } from "~/lib/founder-pilot-brief";
+export { PILOT_BRIEF, CAPACITY_WORKSHEET } from "~/lib/founder-pilot-brief";

-export const useCustomHeader = true
-
-const TOPIC = "How to Start a Company Around an AI Idea From Prototype to Customers"
-export const CATEGORY = "featured"
-export const SLUG = "starting-a-company-around-an-ai-idea-from-prototype-to-customers"
-export const DATE_PUBLISHED = "2026-04-06"
-export const DATE_MODIFIED = "2026-04-06"
-export const DESCRIPTION = "A practical guide to turning an AI prototype into a testable offer, running pilots, setting up safely in Australia, and winning early customers."
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1febf3be-29fb-44ed-9207-e79b38921cc2.jpg?alt=media&token=3b266804-e787-46d9-86b6-7f7ec4f3aa8a"
-const HERO_IMAGE_ALT = "Founder showing an AI prototype to a small business owner during a close-up pilot meeting in Australia"
-export const FEATURED_FOCUS = "ai"
-
-const AUTHOR_PROFILE = getAuthorProfile(DEFAULT_AUTHOR_KEY)
-const AUTHOR = AUTHOR_PROFILE?.name ?? 'Dr Sam Donegan'
-const AUTHOR_ROLE = AUTHOR_PROFILE?.role ?? AUTHOR_PROFILE?.credentials ?? 'Founder'
-const AUTHOR_BIO = AUTHOR_PROFILE?.bio ?? ''
-const AUTHOR_AVATAR = AUTHOR_PROFILE?.avatarUrl ?? DEFAULT_AUTHOR_AVATAR_FALLBACK_URL
-
-interface FAQ {
-  id: number
-  question: string
-  answer: ReactNode
-}
-
-export const faqItems: FAQ[] = [
-  { id: 1, question: "What is the best starting point for an AI startup?", answer: "Start with one narrow workflow problem that is frequent, costly, and urgent enough to justify change. Define who feels the pain, who uses the product, and who approves the budget before building further." },
-  { id: 2, question: "How is a prototype different from a minimum offer?", answer: "A prototype shows that the idea can work, while a minimum offer is packaged so a customer can trial it in a real workflow. The offer should have clear outputs, scope limits, and expectations for what is automated and what is not." },
-  { id: 3, question: "What should an AI pilot include?", answer: "A useful pilot should be narrow, time-bound, and tied to a small set of agreed KPIs. It should also track user behaviour, business value, and operational friction so the founder can decide whether to refine, repeat, or expand." },
-  { id: 4, question: "What company foundations matter before selling AI more broadly?", answer: "Founders should clarify legal structure, data handling, privacy boundaries, IP ownership, and acceptable use early. Customers also need a clear explanation of what the tool does, where it may be wrong, and how issues will be handled." },
-  { id: 5, question: "How do early AI startups win first customers?", answer: "Early customers usually come from a clear use case where the return can be explained simply in time, cost, or error reduction. Sales conversations work best when they focus on the business problem and measurable result rather than model novelty." },
-]
-
+export const useCustomHeader = true;
+export const CATEGORY = "featured";
+export const SLUG = "starting-a-company-around-an-ai-idea-from-prototype-to-customers";
+export const DATE_PUBLISHED = "2026-04-06";
+export const DATE_MODIFIED = "2026-09-10";
+const TITLE = "From AI prototype to paid pilot: scope delivery without derailing your startup";
+export const DESCRIPTION = "A pilot brief and capacity worksheet for technical founders: define acceptance, costs, support and handover, then decide whether a scoped client project fits your startup.";
+const PATH = "/articles/" + CATEGORY + "/" + SLUG;
+const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1febf3be-29fb-44ed-9207-e79b38921cc2.jpg?alt=media&token=3b266804-e787-46d9-86b6-7f7ec4f3aa8a";
+export const articleMeta = { title: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO, imageAlt: "Two people examining a camera and electronic components" };
 export const summaryHighlights = {
-  heading: "Key facts: How to Start a Company Around an AI Idea From Prototype to Customers",
-  intro: "A practical guide to turning an AI prototype into a testable offer, running pilots, setting up safely in Australia, and winning early customers.",
+  heading: "Sell a bounded pilot, not an unfinished promise",
+  intro: "For technical founders who already build with AI coding tools and are deciding what they can responsibly deliver alongside their own startup.",
   items: [
-    { label: "What turns an AI idea into a real company?", description: "A real company starts with a specific customer problem, a defined buyer, and a measurable outcome. A working demo alone does not show demand, budget, or willingness to change." },
-    { label: "How should founders shape the first offer?", description: "The first offer should cover one use case, one workflow, and clear limits on data, users, integrations, and support. This makes early trials easier to deliver and easier for customers to assess." },
-    { label: "Why do pilots matter before scaling?", description: "Pilots help founders test usage, business value, and delivery friction before investing in a broader rollout. Time-bound pilots with simple KPIs give better evidence for pricing, roadmap, and sales decisions." },
+    { label: "What turns a demo into an offer?", description: "A named buyer, a useful output, exclusions, acceptance evidence, commercial terms and a handover—not just a working screen." },
+    { label: "Does a paid project validate the startup?", description: "It establishes that customer’s willingness to buy that scope. It does not establish a repeatable product market or recurring revenue." },
+    { label: "When does contracting fit?", description: "When delivery, review, communication and support fit genuine capacity without sacrificing an essential startup milestone. Expected fees are not cash already received." },
   ],
-}
-
-export const articleMeta = {
-  title: "How to Start a Company Around an AI Idea From Prototype to Customers",
-  topic: TOPIC,
-  category: CATEGORY,
-  slug: SLUG,
-  description: DESCRIPTION,
-  datePublished: DATE_PUBLISHED,
-  dateModified: DATE_MODIFIED,
-  author: AUTHOR,
-  image: HERO_IMAGE,
-  imageAlt: HERO_IMAGE_ALT,
-  featuredFocus: FEATURED_FOCUS,
-}
-
-const faqSchemaItems = [
-  { question: "What turns an AI idea into a real company?", answer: "A real company starts with a specific customer problem, a defined buyer, and a measurable outcome. A working demo alone does not show demand, budget, or willingness to change." },
-  { question: "How should founders shape the first offer?", answer: "The first offer should cover one use case, one workflow, and clear limits on data, users, integrations, and support. This makes early trials easier to deliver and easier for customers to assess." },
-  { question: "Why do pilots matter before scaling?", answer: "Pilots help founders test usage, business value, and delivery friction before investing in a broader rollout. Time-bound pilots with simple KPIs give better evidence for pricing, roadmap, and sales decisions." },
-  { question: "What is the best starting point for an AI startup?", answer: "Start with one narrow workflow problem that is frequent, costly, and urgent enough to justify change. Define who feels the pain, who uses the product, and who approves the budget before building further." },
-  { question: "How is a prototype different from a minimum offer?", answer: "A prototype shows that the idea can work, while a minimum offer is packaged so a customer can trial it in a real workflow. The offer should have clear outputs, scope limits, and expectations for what is automated and what is not." },
-  { question: "What should an AI pilot include?", answer: "A useful pilot should be narrow, time-bound, and tied to a small set of agreed KPIs. It should also track user behaviour, business value, and operational friction so the founder can decide whether to refine, repeat, or expand." },
-  { question: "What company foundations matter before selling AI more broadly?", answer: "Founders should clarify legal structure, data handling, privacy boundaries, IP ownership, and acceptable use early. Customers also need a clear explanation of what the tool does, where it may be wrong, and how issues will be handled." },
-  { question: "How do early AI startups win first customers?", answer: "Early customers usually come from a clear use case where the return can be explained simply in time, cost, or error reduction. Sales conversations work best when they focus on the business problem and measurable result rather than model novelty." },
-]
-
-const faqStructuredData = faqSchemaItems.length
-  ? JSON.stringify({
-      '@context': 'https://schema.org',
-      '@type': 'FAQPage',
-      mainEntity: faqSchemaItems.map((item) => ({
-        '@type': 'Question',
-        name: item.question,
-        acceptedAnswer: {
-          '@type': 'Answer',
-          text: item.answer,
-        },
-      })),
-    })
-  : null
+};
+export const faqItems = [
+  { question: "How is a paid pilot different from a prototype?", answer: "A prototype demonstrates an idea. A pilot is an agreed engagement with a defined user, scope, evaluation and operating boundary. Payment alone does not make the software production-ready or prove repeatable demand." },
+  { question: "Should founders take contract work to extend runway?", answer: "Only after checking capacity, costs, collection timing and the startup work displaced. A project can consume more time than its build estimate and its fee may arrive after costs are due. This worksheet does not predict runway or provide financial advice." },
+  { question: "What should an AI-assisted builder show in an application?", answer: "A permitted work sample, their own contribution, how AI coding tools were used, reviewed changes, tests, a failure they diagnosed, and realistic availability. Do not share client code or data without permission." },
+  { question: "Does applying to MLAI Studio guarantee a project?", answer: "No. Applications are considered for suitability and matching. The public intake asks about eligibility to contract in Australia; New Zealand-based founders should confirm eligibility with MLAI before assuming the pathway supports their circumstances." },
+];

 export default function ArticleContent() {
-  const authorDetails = {
-    name: AUTHOR,
-    role: AUTHOR_ROLE,
-    bio: AUTHOR_BIO,
-    avatarUrl: AUTHOR_AVATAR,
-  }
+  return <div>
+    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: TITLE, current: true }]} title={TITLE} titleHighlight="scope delivery" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
+    <div data-cf-article-body="true" className="mx-auto max-w-4xl px-4 py-8 prose prose-lg prose-indigo [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24">
+      <p><strong>A working AI prototype is not yet a promise you can price, deliver and support.</strong> For a founder who can already build, the next task is to define what one customer can buy and how both parties will recognise delivery. This guide also helps you decide whether a small client engagement fits alongside your own startup.</p>
+      <p>It is not a complete company-formation guide, a forecast of customer acquisition or a guarantee of contract income. The worked pilot and capacity numbers below are explicitly fictional editorial examples, not reported MLAI engagements. If you are still exploring an idea rather than delivering software, the <Link to="/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-6">customer-discovery exercise</Link> is an earlier step.</p>

-  return (
-    <>
+      <h2 id="buyer-decision">1. Define what the buyer is deciding</h2>
+      <p>Separate the person doing the work, the person accountable for the result and the budget approver. Ask what happens today, which failure matters, and what evidence would justify changing the workflow. Avoid replacing those questions with a list of model features.</p>
+      <p>A custom client project and a startup product experiment can share engineering, but they answer different questions. A customer paying for bespoke integration does not establish that many customers will buy a standard product. Record reusable learning separately from client-specific commitments, and do not assume you own or may reuse client-funded work.</p>

-      <ArticleHeroHeader
-        breadcrumbs={[
-          { label: 'Home', href: '/', icon: Home },
-          { label: 'Articles', href: "/articles" },
-          { label: TOPIC, current: true },
-        ]}
-        title={TOPIC}
-        titleHighlight={TOPIC}
-        headerBgColor="cyan"
-        summary={summaryHighlights}
-        heroImage={HERO_IMAGE}
-        heroImageAlt={HERO_IMAGE_ALT}
-      />
+      <h2 id="worked-pilot">2. Turn the demo into a bounded pilot</h2>
+      <p><strong>Fictional pilot:</strong> an operations team wants draft weekly summaries of project updates. Start in a test workspace with synthetic updates. The draft links every factual statement to a supplied update and marks missing information. A staff reviewer controls publication. The pilot cannot message customers, change project status or access unrelated workspaces.</p>
+      <p>The completed brief below deliberately ends at <strong>not ready to commit</strong>. Its fee, hours and cost allowances are invented, not a market benchmark. Filling every box is useful precisely because it reveals missing evidence and an infeasible schedule.</p>
+      <dl className="space-y-5">{FOUNDER_PILOT_FIELDS.map(field => <div key={field.label} className="border-l-4 border-cyan-700 pl-4"><dt className="font-bold">{field.label}</dt><dd className="ml-0 mt-1">{field.value}</dd></div>)}</dl>
+      <p>Do not imply that a synthetic pilot is already a live deployment. Access to real data, privacy/security assessment and operational approval are separate decisions. If a buyer wants live publication or another integration, revise scope, tests and price before agreeing.</p>

-      <ArticleTocPlaceholder className="bg-transparent" />
+      <h2 id="copy-brief">3. Save the brief and expose unknowns</h2>
+      <p>Complete the brief together, using “unknown” rather than inventing costs or acceptance targets. Keep confidential data out of an initial enquiry. This is a planning worksheet, not a contract template.</p>
+      <p><a href={FOUNDER_PILOT_DOWNLOAD} download>Download the completed example, acceptance record and blank pilot brief (.txt)</a>. It includes the original fictional capacity calculation. Your edits to the interactive worksheet are saved separately using its own download button.</p>
+      <details><summary className="cursor-pointer font-bold">Copy a blank pilot brief</summary><pre className="whitespace-pre-wrap break-words"><code>{PILOT_BRIEF}</code></pre></details>
+      <p>Australian <a href="https://business.gov.au/people/contractors/prepare-a-contract">business.gov.au contract guidance</a> covers matters including payment, intellectual property and documenting changes. Use appropriate professional advice for binding terms, business structure, tax, liability and jurisdiction-specific obligations; the article does not settle them.</p>
+      <p>Specify whether acceptance means delivery of agreed software, a measured workflow outcome, or both. The buyer’s access and review obligations need dates too. Do not promise a business result that depends on unavailable data, adoption or decisions you cannot control.</p>

-      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
-        <p><strong>{TOPIC}</strong> — {"Many AI startups stall because they confuse a clever prototype with a real business. A demo can show that a model works, but that does not prove that a customer has a clear problem, a budget, or a reason to switch from what they do now. The stronger starting point is usually a narrow pain point for a defined user, then a small pilot that tests whether the solution creates a useful result. This matters because early time and money are easy to waste on features, platforms, and technical polish that nobody has asked for."}</p>
-        <p>{"A safer path is to start small, test early, and judge progress by outcomes instead of novelty. The first signs of traction are usually practical: user feedback, measurable KPIs, and evidence that the product improves a task or decision in a way people care about. It moves from prototype, to validation, to business setup, and then to winning first customers. The goal is not to build the broadest AI product first. The goal is to prove that a specific problem is worth solving, then grow from there."}</p>
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          caption="A practical guide to turning an AI prototype into a testable offer, running pilots, setting up safely in Australia, and winning early customers."
-          width={1600}
-          height={1067}
-        />
+      <h2 id="delivery-evidence">4. Show evidence beyond an AI-generated demo</h2>
+      <p>Use AI coding tools to assist implementation, but retain responsibility for understanding and reviewing the change. <a href="https://docs.github.com/en/copilot/responsible-use/inline-suggestions">GitHub’s responsible-use guidance for Copilot suggestions</a> explicitly calls for review and validation and warns that generated code can be inaccurate. A generated test suite can share the implementation’s mistaken assumptions.</p>
+      <ul>
+        <li><strong>Independent expectations:</strong> write expected outcomes from the scope before using the implementation to generate answers. Keep some evaluation cases outside development.</li>
+        <li><strong>Inspect the diff:</strong> explain permissions, dependency changes, error handling and why a failing test was changed. Passing by deleting the requirement is not acceptance.</li>
+        <li><strong>Test failures:</strong> missing source, contradictory updates, wrong-workspace access, provider timeout, repeated run and an instruction embedded in an update to publish externally.</li>
+        <li><strong>Show the boundary:</strong> verify the service lacks unauthorised send/write capabilities. A prompt saying “do not send” is not the same control.</li>
+        <li><strong>Handover:</strong> supply permitted source/configuration, reproduction steps, known limitations, access ownership, disabling instructions and agreed support terms.</li>
+      </ul>
+      <p>For the fictional summary pilot, contradictory updates should be surfaced for review, not resolved into an invented fact. A timeout should leave original updates available and show an error, not a success-looking empty summary. An embedded instruction must not gain permissions or alter the agreed task.</p>
+      <p><strong>Proposed acceptance record—not test results.</strong> All eight cases are UNRUN: no summary application was implemented for this planning example. Replace this starting set with representative and independently held-out cases for the actual scope. For each run, retain the exact fixture/version, observed output, action/usage evidence, failure disposition and reviewer/date.</p>
+      <p>Swipe the table sideways on a small screen, or focus it and use the arrow keys.</p>
+      <div role="region" aria-label="Proposed pilot acceptance cases" tabIndex={0} className="overflow-x-auto scroll-mt-24"><table className="min-w-[720px]">
+        <caption>Eight starting cases; results and reviewer approval are not supplied</caption>
+        <thead><tr><th scope="col">Case and input</th><th scope="col">Expected evidence</th><th scope="col">Status</th></tr></thead>
+        <tbody>{FOUNDER_PILOT_CASES.map(item => <tr key={item.id}><th scope="row" className="min-w-60 font-normal"><strong>{item.id}</strong>: {item.input}</th><td className="min-w-72">{item.expected}</td><td>UNRUN</td></tr>)}</tbody>
+      </table></div>
+      <p>Assess value separately: compare representative manual and pilot cases, counting review, correction and operating effort. Record sample size and differences in case difficulty. Released time is capacity, not cash already saved; small test results do not establish performance on every future case.</p>
+      <p>Need a runnable starting exercise before committing to a client pilot? The <Link to="/articles/featured/a-practical-guide-on-how-to-create-an-artificial-intelligence">bounded event-reply prototype</Link> includes code, synthetic inputs and retained failures. It is a different workflow, not proof that this summary pilot meets its requirements.</p>

-        <AudienceGrid
-          heading="Who is this guide for?"
-          cards={[
-            {
-              title: 'Founders & Builders',
-              description: 'For operators validating demand, pitching a vision, and moving before momentum stalls.',
-              icon: <RocketLaunchIcon className="h-6 w-6" />,
-              variant: 'orange',
-            },
-            {
-              title: 'Students & Switchers',
-              description: 'For readers learning how strong technical partners evaluate traction, skills, and fit.',
-              icon: <AcademicCapIcon className="h-6 w-6" />,
-              variant: 'purple',
-            },
-            {
-              title: 'Community Builders',
-              description: 'For connectors, mentors, and organisers helping founders meet collaborators in the right rooms.',
-              icon: <UsersIcon className="h-6 w-6" />,
-              variant: 'yellow',
-            },
-          ]}
-        />
+      <h2 id="capacity-decision">5. Decide whether client work fits your startup</h2>
+      <p>This section is for existing technical founders in Australia or New Zealand who use AI coding tools, can review and test what they ship, and are considering contract delivery. Being a founder alone does not establish those skills or spare capacity.</p>
+      <p><strong>Fictional capacity check, not an estimate for your project:</strong> six genuinely available hours per week over four weeks gives 24 hours. If implementation needs 12, testing and security review 5, meetings 3, and handover/support 4, that already consumes all 24. Adding a four-hour contingency produces a 28-hour obligation and a four-hour shortfall. Faster code generation does not remove the other obligations.</p>
+      <p>The timing matters too. The proposed allocation needs 9, 7, 6 and 6 hours in weeks 1–4. Even increasing availability to seven hours every week would leave week 1 overloaded. Two additional support hours in week 5 also have no reserved capacity. Extra hours later cannot silently repair an earlier deadline.</p>
+      <p>The decision is to reduce scope, extend the window if both sides can support it, or decline—not quietly borrow time from an essential startup milestone. Include support after the initial window and permission to share or reuse work. A paid engagement is not automatically available for your public portfolio.</p>
+      <p>In the example, A$1,800 of expected receipts minus A$700 of direct outlays leaves A$1,100 of project cash over four weeks. It is <strong>not profit</strong>: founder time, taxes, overhead and other commitments are not valued. Starting at zero and counting each week’s outlays before receipts gives a largest temporary cash gap of A$450. Delay the first A$900 receipt from week 2 to week 4 and that gap becomes A$700, even though the final balance is unchanged.</p>
+      <p><a href="https://business.gov.au/finance/cash-flow/set-up-a-cash-flow-statement">business.gov.au’s cash-flow guidance</a> distinguishes estimates and incoming/outgoing cash. The worksheet below is only a four-week project scenario, not a whole-business cash-flow statement. Use actual payment dates and all obligations for decisions that depend on cash; seek appropriate financial advice.</p>
+      <FounderCapacityWorksheet />
+      <ArticleConversionCTA articleSlug={CATEGORY + "/" + SLUG} config={BASE_ARTICLE_SEO_CONFIG[PATH].conversion!} events={[]} placement="article-inline" />
+      <p>The public Studio application currently asks whether you can legally contract in Australia. If you are based in New Zealand, <Link to="/contact">confirm eligibility with MLAI</Link> before assuming this pathway supports your circumstances. Application, selection, project matching and income are not guaranteed.</p>
+      <p>Not seeking client work? Browse <Link to="/events">MLAI events</Link> for a relevant founder discussion or build session. You do not need to describe yourself as a contractor to participate; check the individual event’s format and requirements.</p>

-        <QuoteBlock title="Key insight" variant="purple">
-          {"A real company starts with a specific customer problem, a defined buyer, and a measurable outcome. A working demo alone does not show demand, budget, or willingness to change."}
-        </QuoteBlock>
-          <h2>{"Start with a narrow problem and a clear buyer"}</h2>
-          <p>{"A strong AI company usually starts with one narrow problem, not a broad idea like \"AI for marketing\" or \"AI for healthcare.\" The safer starting point is a specific workflow where people already feel friction, such as a repetitive task, a slow manual review step, or a decision that often creates delays or errors. The goal is to pick a pain point that is easy to describe, easy to test, and important enough that someone wants it fixed now. This keeps the first prototype small and helps you learn quickly from real use instead of building a large system around assumptions."}</p>
-          <p>{"Once the problem is clear, define the buyer path just as clearly. Ask three separate questions: who feels the pain day to day, who will use the product, and who can approve the budget. In some early products, these may be the same person, but often they are not. A useful first wedge is a use case that happens often, costs time or money when done badly, and has enough urgency that a team will try a new solution. Before building further, set a simple success measure tied to the workflow, such as time saved per task, fewer mistakes, or better conversion on a defined step. If you cannot explain the result in plain business terms, the idea is probably still too broad."}</p>
-          <ul>
-            <li>{"Separate the user, the problem owner, and the budget approver."}</li>
-            <li>{"Use simple proof points like time saved, error reduction, or improvement in a specific conversion step."}</li>
-          </ul>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-8eeadeef-a2a0-402b-ba3c-7715c480167a.jpg?alt=media&token=080f01bd-a5f1-46ec-8c95-80ed01abc40d"
-            alt="Notebook with one workflow circled beside buyer notes and coffee cup on a cluttered desk"
-            caption="Start with a narrow problem and a clear buyer"
-            width={1200}
-            height={800}
-          />
-          <h2>{"Turn the prototype into a testable minimum offer"}</h2>
-          <p>{"A prototype is useful for showing that your idea can work, but early customers usually need something more concrete than a demo. The next step is to turn it into a minimum offer: a small, testable version of the product built around one real problem and one clear result. The core idea is to start small, focus on a specific pain point, and test with users before expanding. That keeps you from spending too much time building features people may not want."}</p>
-          <p>{"Pick one use case, define the workflow the customer will follow, and make the output visible enough that they can judge whether it helps. For an AI product, the offer does not need to be fully automated from day one. This fits the pilot approach: use a basic version, measure whether it solves the problem, and improve it through short feedback loops."}</p>
-          <p>{"Set limits on who can use it, what data is included, which integrations are in scope, and how much support you will provide during the trial. These boundaries make the first version easier to deliver and easier for the customer to understand. They also help you separate what is ready now from what still needs work, which is important when moving from prototype testing toward a repeatable product."}</p>
-          <p>{"A simple, well-scoped offer with explicit expectations is usually more useful than a broad promise backed by an unfinished product."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9765263b-d305-46ac-92da-ee16648b91f8.jpg?alt=media&token=52c4aa74-6aa1-47e9-bd0d-d6683512ccdd"
-            alt="Prototype on a workshop desk beside a simple signup sheet, showing a test"
-            caption="Turn the prototype into a testable minimum offer"
-            width={1200}
-            height={800}
-          />
-
-
-
-        <ArticleStepList
-          title="Practical next steps"
-          steps={[
-            "Separate the user, the problem owner, and the budget approver.",
-            "Use simple proof points like time saved, error reduction, or improvement in a specific conversion step.",
-          ]}
-          accent="indigo"
-        />
-          <h2>{"Validate with pilots before you scale the product"}</h2>
-          <p>{"A pilot is a safer way to test an AI product than a full launch. The goal is not to prove that the whole company is finished. It is to check whether a real customer problem exists, whether your prototype can help, and whether people will use it in practice. That lines up with basic product development advice: start with a viable idea, build a basic version, test it early, and use feedback to improve it before you invest more time and money."}</p>
-          <p>{"For an AI founder, a good pilot should be narrow and time-bound. Pick one specific pain point, agree on a clear start and end date, and define a small set of KPIs before work begins. That keeps the project focused and makes the decision at the end easier. Instead of asking, \"Did people like it?\" you can ask, \"Did it reduce manual work, improve speed, or solve the problem well enough to continue?\""}</p>
-          <h3>{"What to measure during a pilot"}</h3>
-          <p>{"The most useful pilot feedback usually comes from three areas. First, watch user behaviour. Are people actually using the tool, or are they falling back to their old process? Second, look for business value. Even in a small trial, you should be able to see whether the product helps with an important job. Third, note operational friction. Early testing is the right time to find problems in setup, workflow, handoff, or support."}</p>
-          <p>{"If the product only works with heavy founder involvement, unclear inputs, or manual fixes, that is still valuable learning."}</p>
-          <h3>{"How pilot results shape the next move"}</h3>
-          <p>{"At the end of the pilot, use the evidence to make a simple decision: refine, repeat, or move forward. If usage is weak, your positioning may be off or the problem may not be urgent enough. If users get value but setup is messy, product priorities may need to shift toward reliability and workflow fit. If the results are strong, you have better grounds to invest in production planning and go-to-market work."}</p>
-          <p>{"That is a stronger base for pricing and roadmap choices than building for scale too early."}</p>
-          <h2>{"Build the company foundations early enough to sell safely"}</h2>
-          <p>{"As an AI idea moves from prototype to real customer use, the company setup needs to catch up. In Australia, that means thinking about the legal structure of the venture and the rules that apply before sales widen. It also makes it easier to explain what the business is actually offering, who is responsible for delivery, and how risks will be handled."}</p>
-          <p>{"This is also the stage to make ownership and data questions explicit. Customers will want to know what data the product uses, how that data is handled, and who owns the outputs, code, prompts, or other materials created in the service. Founders do not need a huge legal stack on day one, but they do need clear boundaries around privacy, intellectual property, and acceptable use before broader rollout."}</p>
-          <p>{"Product development guidance from business.gov.au stresses moving from prototype and testing into production planning. For an AI startup, that means checking whether onboarding, support, monitoring, and issue handling match the promise being sold."}</p>
-          <p>{"Customers do not need every technical detail, but they do need to understand what the tool does, where it may be wrong, and what happens if something goes wrong. That combination makes the business easier to buy from and easier to improve as real customer use expands."}</p>
-          <ul>
-            <li>{"Support, onboarding, delivery, and production readiness."}</li>
-            <li>{"What the AI does, its limits, and how issues will be managed."}</li>
-          </ul>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-7f54986d-d6b5-4c58-bba9-4a4c12562721.jpg?alt=media&token=2247a8bc-b3b7-41f5-b235-d1fe1e748574"
-            alt="Build the company foundations early enough to sell safely"
-            caption="Build the company foundations early enough to sell safely"
-            width={1200}
-            height={800}
-          />
-          <h2>{"How to win your first customers and learn from each sale"}</h2>
-          <p>{"Your first customers usually come from a narrow use case, not a broad AI story. Start with a segment where the pain is clear, frequent, and expensive enough to justify change. In outreach and early calls, talk about the workflow problem, the time or cost being lost, and the measurable result your product can improve. That keeps the conversation grounded in business value instead of model features. A small pilot with simple success metrics is often the easiest way to get a first yes, because it lowers risk for the buyer and gives you a clear feedback loop."}</p>
-          <p>{"That gives you material for case examples, testimonials, sharper messaging, and product decisions. That repeatable first use case is a better foundation for growth than an ambitious product vision with no clear buying path."}</p>
-          <p>{"Record what each customer agreed to try, what they actually used and what happened next. Keep a demonstration, an unpaid trial and a paid commitment distinct when deciding your next step."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ff1ff176-b089-4236-ae39-96758d8dfbc3.jpg?alt=media&token=890bcfb6-5a98-4381-9870-b76d0184141a"
-            alt="Startup founder discussing a workflow pain point with first customers during"
-            caption="How to win your first customers and learn from each sale"
-            width={1200}
-            height={800}
-          />
-
-        <QuoteBlock title="Keep moving forward" variant="orange">
-          {"Pilots help founders test usage, business value, and delivery friction before investing in a broader rollout. Time-bound pilots with simple KPIs give better evidence for pricing, roadmap, and sales decisions."}
-        </QuoteBlock>
-
-        <MLAITemplateResourceCTA />
-
-      <ArticleReferences
-        references={[
-          {id: 1, href: "https://www.businessthink.unsw.edu.au/articles/business-ai-efficiency-innovation-automation", title: "A practical guide to getting started with Business AI - UNSW BusinessThink", publisher: "businessthink.unsw.edu.au", description: "", category: "guide"},
-          {id: 2, href: "https://blog.tobiaszwingmann.com/p/ai-prototype-to-production-checklist", title: "The AI Prototype-to-Production Checklist", publisher: "blog.tobiaszwingmann.com", description: "", category: "guide"},
-          {id: 3, href: "https://www.mymobilelyfe.com/artificial-intelligence/from-idea-to-impact-how-to-launch-your-first-ai-project/", title: "From Idea to Impact: How to Launch Your First AI Project | Artificial Intelligence | MyMobileLyfe | AI Consulting and Digital Marketing", publisher: "mymobilelyfe.com", description: "", category: "guide"},
-          {id: 4, href: "https://business.gov.au/planning/new-businesses/develop-a-new-product", title: "Develop a new product | business.gov.au", publisher: "business.gov.au", description: "", category: "guide"},
-          {id: 5, href: "https://www.hubspot.com/startups/scaling-smarter/how-to-validate-startup-idea", title: "Startup Idea Validation: A Step-by-Step Guide Before Launch", publisher: "hubspot.com", description: "", category: "guide"},
-          {id: 6, href: "https://www.ai-scaleup.com/ai-entrepreneur/how-to-build-startup/", title: "How to Build an AI Startup: An Easy 7-Step Essential Guide", publisher: "ai-scaleup.com", description: "", category: "guide"},
-          {id: 7, href: "https://ebpearls.com.au/blog/investor-ready-prototypes", title: "Building Investor-Ready Prototypes Without Technical Skills or Funding", publisher: "ebpearls.com.au", description: "", category: "guide"},
-          {id: 8, href: "https://sprintlaw.com.au/articles/ai-business-ideas-in-australia-how-to-launch-legally-and-safely/", title: "AI Business Ideas in Australia: How to Launch Legally and Safely | Sprintlaw Australia", publisher: "sprintlaw.com.au", description: "", category: "guide"},
-          {id: 9, href: "https://www.linkedin.com/posts/tdoucet_here-is-my-roadmap-to-building-a-successful-activity-7265199473234952192-aa1W", title: "Here is my roadmap to building a successful AI company: 1. Focus on the Output First focus on figuring out what quality, best-in-class OUTPUT you can provide to your customers. Your success lies in\u2026 | Troy Doucet", publisher: "linkedin.com", description: "", category: "guide"},
-          {id: 10, href: "https://www.cloudflight.io/en/blog/how-to-start-with-ai-in-your-company-a-checklist/", title: "How to start with AI in your company: a checklist | Cloudflight", publisher: "cloudflight.io", description: "", category: "guide"},
-        ]}
-        heading="Sources & further reading"
-      />
-
-        <ArticleDisclaimer />
-
-        <div className="my-12 not-prose">
-          <ArticleCompanyCTA
-            title="Need a clearer path from AI prototype to pilot?"
-            body="Use the article roadmap to narrow the problem, package a small offer, and test it with real buyers before scaling. A focused first use case is usually the fastest route to evidence and early revenue."
-            buttonText="Browse founder articles"
-            buttonHref="/articles"
-          />
-        </div>
-      </div>
-
-        <AuthorBio author={authorDetails} />
-
-        <div className="mt-12">
-          <ArticleFAQ items={faqItems} />
-        </div>
-
-        <ArticleFooterNav backHref="/articles" topHref="#" />
-    </>
-  )
+      <h2 id="pilot-decision">6. Close the pilot with a written decision</h2>
+      <p>Record delivered scope, passed and failed checks, user feedback, total delivery/operating effort and outstanding risks. Ask the buyer to distinguish “the software meets the brief” from “we want to buy a wider rollout”. Choose stop, revise, repeat or expand and write the reason. Expansion requires a new scope, not an assumption that support or features continue indefinitely.</p>
+      <p>If the experience is useful to your own startup, record what is genuinely reusable and what remains client-specific. Keep evidence from a bespoke pilot separate from claims of recurring product revenue or broad market validation.</p>
+      <p><small>Sources checked 10 September 2026. This AI-assisted MLAI editorial guide supplies a worked planning example and a functioning arithmetic worksheet, not a tested summary application. Pilot results, customer validation and independent technical, financial or legal review are not claimed. The examples are not regulator-endorsed templates or measured client results.</small></p>
+      <ArticleFAQ items={faqItems} />
+    </div>
+  </div>;
 }
```
