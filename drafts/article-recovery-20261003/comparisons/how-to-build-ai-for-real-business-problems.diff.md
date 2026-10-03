# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/how-to-build-ai-for-real-business-problems.tsx
+++ unreviewed-local-draft/app/articles/content/featured/how-to-build-ai-for-real-business-problems.tsx
@@ -1,286 +1,137 @@
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
+import { COMMISSIONING_BRIEF_FIELDS, COMMISSIONING_COST_ITEMS, COMMISSIONING_DOWNLOAD_PATH, COMMISSIONING_EXAMPLE_INPUTS, COMMISSIONING_EXAMPLE_RESULT, COMMISSIONING_HANDOVER_STEPS, commissioningAud, PROJECT_BRIEF_TEMPLATE } from "~/lib/business-ai-commissioning";
+export { PROJECT_BRIEF_TEMPLATE } from "~/lib/business-ai-commissioning";

-export const useCustomHeader = true
-
-const TOPIC = "How to Build AI for Real Business Problems"
-export const CATEGORY = "featured"
-export const SLUG = "how-to-build-ai-for-real-business-problems"
-export const DATE_PUBLISHED = "2026-04-06"
-export const DATE_MODIFIED = "2026-04-06"
-export const DESCRIPTION = "Build AI for business with a practical start-to-launch plan."
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c50a0366-c987-4439-aa4d-10ba179a206c.jpg?alt=media&token=3a1e360a-3558-4f36-8257-3b17644d8c83"
-const HERO_IMAGE_ALT = "Close-up of a team reviewing an AI workflow on a laptop during a practical business planning meeting"
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
-  { id: 1, question: "What is the best first use case when you want to build AI?", answer: "A good first use case is a small, repeatable task tied to a real bottleneck, like summarising feedback, answering common customer questions, or helping staff find internal information faster." },
-  { id: 2, question: "Should a business use no-code tools or a developer platform?", answer: "No-code and chat-based builders suit fast experiments and simple apps with low technical overhead. Developer platforms are a better fit when a team needs broader model choice, enterprise features, or more control in production." },
-  { id: 3, question: "How do you test an AI prototype properly?", answer: "Test with realistic prompts, sample data, and actual user tasks rather than ideal examples. If the prototype struggles, tighten the scope or improve the instructions before expanding the build." },
-  { id: 4, question: "What governance basics matter before scaling AI?", answer: "Check data quality, review privacy risks, and avoid treating generated output as automatically correct. Where outputs affect customers, staff, or decisions, add human review before the business relies on them." },
-  { id: 5, question: "Why is a small launch better than a broad AI rollout?", answer: "A small launch is easier to review, easier to change, and more useful for learning from real behaviour. It helps teams see whether the tool improves productivity, decisions, or customer experience before investing more heavily." },
-]
-
+export const useCustomHeader = true;
+export const CATEGORY = "featured";
+export const SLUG = "how-to-build-ai-for-real-business-problems";
+export const DATE_PUBLISHED = "2026-04-06";
+export const DATE_MODIFIED = "2026-09-10";
+const TITLE = "How to build AI for a business problem: scope, test and hand over";
+export const DESCRIPTION = "Turn a business workflow into a scoped AI project brief, compare delivery proposals, agree acceptance tests and plan ownership before commissioning a build.";
+const PATH = "/articles/" + CATEGORY + "/" + SLUG;
+const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c50a0366-c987-4439-aa4d-10ba179a206c.jpg?alt=media&token=3a1e360a-3558-4f36-8257-3b17644d8c83";
+export const articleMeta = { title: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO, imageAlt: "Illustration of a team planning a business workflow" };
 export const summaryHighlights = {
-  heading: "Key facts: How to Build AI for Real Business Problems",
-  intro: "Build AI for business with a practical start-to-launch plan.",
+  heading: "Commission a result you can check",
+  intro: "For a business owner or manager who needs implementation help, not a course in training models.",
   items: [
-    { label: "build ai?", description: "Building AI starts with one narrow business problem, such as summarising research or answering common support questions. Teams can then choose a no-code builder, chat-based tool, or developer platform based on speed and control needs." },
-    { label: "how to build ai agent?", description: "Begin by defining one user, one workflow, and one success condition in plain language. Build a small prototype, test it with realistic tasks, and improve it before adding more features or autonomy." },
-    { label: "how to build ai agents?", description: "Multiple AI agents are better approached after a simple first system proves useful on a repeatable task. Early work should stay focused, with clear review steps, privacy checks, and human oversight for higher-risk outputs." },
+    { label: "What should I ask a builder for?", description: "A bounded workflow with named inputs, permitted actions, acceptance evidence and an operational owner." },
+    { label: "Is a demo enough?", description: "No. Test unseen cases, permission boundaries, failures and handover—not only the happy path shown in a demonstration." },
+    { label: "When is it ready to use?", description: "When agreed tests pass, unresolved risks are accepted by the accountable owner and rollback, support and access arrangements work." },
   ],
-}
-
-export const articleMeta = {
-  title: "How to Build AI for Real Business Problems",
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
-  { question: "build ai?", answer: "Building AI starts with one narrow business problem, such as summarising research or answering common support questions. Teams can then choose a no-code builder, chat-based tool, or developer platform based on speed and control needs." },
-  { question: "how to build ai agent?", answer: "Begin by defining one user, one workflow, and one success condition in plain language. Build a small prototype, test it with realistic tasks, and improve it before adding more features or autonomy." },
-  { question: "how to build ai agents?", answer: "Multiple AI agents are better approached after a simple first system proves useful on a repeatable task. Early work should stay focused, with clear review steps, privacy checks, and human oversight for higher-risk outputs." },
-  { question: "What is the best first use case when you want to build AI?", answer: "A good first use case is a small, repeatable task tied to a real bottleneck, like summarising feedback, answering common customer questions, or helping staff find internal information faster." },
-  { question: "Should a business use no-code tools or a developer platform?", answer: "No-code and chat-based builders suit fast experiments and simple apps with low technical overhead. Developer platforms are a better fit when a team needs broader model choice, enterprise features, or more control in production." },
-  { question: "How do you test an AI prototype properly?", answer: "Test with realistic prompts, sample data, and actual user tasks rather than ideal examples. If the prototype struggles, tighten the scope or improve the instructions before expanding the build." },
-  { question: "What governance basics matter before scaling AI?", answer: "Check data quality, review privacy risks, and avoid treating generated output as automatically correct. Where outputs affect customers, staff, or decisions, add human review before the business relies on them." },
-  { question: "Why is a small launch better than a broad AI rollout?", answer: "A small launch is easier to review, easier to change, and more useful for learning from real behaviour. It helps teams see whether the tool improves productivity, decisions, or customer experience before investing more heavily." },
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
+  { question: "Do I need to choose a model before speaking to a builder?", answer: "No. Start with the work, constraints and acceptance conditions. Ask the builder to explain why the simplest suitable approach meets them, including an existing product or non-AI automation where appropriate." },
+  { question: "What is an AI harness in a business project?", answer: "Here it means the surrounding software that controls inputs, tools, permissions, review, logs and failure handling around a model. Ask for those behaviours explicitly; the label alone does not promise a safe or reliable system." },
+  { question: "Does passing a small test set prove the system is safe?", answer: "No. A test set covers its cases, not every future input. Include representative and consequential failures, document gaps, limit release and monitor changes. Higher-consequence uses need appropriate specialist review." },
+  { question: "Can I use this brief as a contract?", answer: "No. It is an editorial scoping aid. Obtain appropriate advice for binding terms, privacy, intellectual property, liability and other obligations. A Studio enquiry does not commit either party to a build." },
+];

 export default function ArticleContent() {
-  const authorDetails = {
-    name: AUTHOR,
-    role: AUTHOR_ROLE,
-    bio: AUTHOR_BIO,
-    avatarUrl: AUTHOR_AVATAR,
-  }
+  return <div>
+    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: TITLE, current: true }]} title={TITLE} titleHighlight="scope, test and hand over" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
+    <div className="mx-auto max-w-4xl px-4 py-8 prose prose-lg prose-indigo [&_h2]:scroll-mt-20 [&_h3]:scroll-mt-20 [&_[role=region]]:scroll-mt-20" data-cf-article-body>
+      <p><strong>You do not need to become an AI engineer to commission useful software. You do need to explain the work and recognise a correct result.</strong> This guide takes an owner or manager from “we need an AI agent” to a brief a delivery team can assess, a set of acceptance checks and a handover plan.</p>
+      <p>It starts after you have identified a bottleneck. If the value is still uncertain, first use the <Link to="/articles/featured/how-small-business-owners-can-get-started-with-ai-2026">small-business pilot worksheet</Link> to compare total effort and avoidable spending. Do not commission a build simply because a demonstration looks impressive.</p>

-  return (
-    <>
+      <h2 id="define-work">1. Replace the agent request with an operating boundary</h2>
+      <p>Describe what happens before and after the proposed tool. Who starts the task? What can it read? What may it change? Who catches a wrong answer? A narrow scope can still be consequential: sending a message, changing a price or accessing another customer's record is not made safe by a small interface.</p>
+      <p><strong>Illustrative brief, not a deployed MLAI project:</strong> a service business wants help drafting replies to routine enquiries. The first version receives synthetic messages and an approved policy document, suggests a category and a draft, and leaves every send decision to a staff member. It cannot issue refunds, update customer records, promise prices or send messages. The builder must show how those restrictions are enforced outside the model's instructions.</p>
+      <p>This makes the deliverable inspectable. “Improve customer support with AI” does not tell you what to buy, how much work remains with staff or whether an unsafe action occurred.</p>

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
+      <h2 id="delivery-choice">2. Ask whether this needs new software at all</h2>
+      <div className="overflow-x-auto" role="region" aria-label="Delivery approach comparison" tabIndex={0}><table className="min-w-[640px]">
+        <caption>Questions for a delivery discussion—not a ranking of products</caption>
+        <thead><tr><th>Approach</th><th>Useful when</th><th>Evidence to request</th></tr></thead>
+        <tbody>
+          <tr><td>Template or fixed automation</td><td>The decision follows a stable rule and the input is structured.</td><td>Show the rule covers actual cases and has an exception path.</td></tr>
+          <tr><td>Configure an existing product</td><td>Your existing workflow already has suitable access, review and integration controls.</td><td>Demonstrate the required behaviour on the actual subscription and configuration.</td></tr>
+          <tr><td>Commission a bounded build</td><td>Required integration or controls are missing from existing tools.</td><td>Explain implementation, test coverage, operating costs and who maintains each dependency.</td></tr>
+        </tbody>
+      </table></div>
+      <p>No-code does not mean no maintenance, and a developer platform is not automatically safer. Compare the delivered behaviour, data terms and support responsibilities. More agents or model choices do not establish business value.</p>

-      <ArticleTocPlaceholder className="bg-transparent" />
+      <h2 id="copy-brief">3. Copy this project brief before asking for a proposal</h2>
+      <p>Use “unknown” where you need help. Separate uncertainty from an agreed requirement, and avoid confidential data in an initial enquiry. This text is a scoping aid, not a legal agreement or a promise of project acceptance.</p>
+      <pre className="whitespace-pre-wrap break-words"><code>{PROJECT_BRIEF_TEMPLATE}</code></pre>
+      <p>For the enquiry example, “required output” could mean a suggested category, draft reply and cited policy passage; “human approval” means a worker sees and approves the exact text before sending. “Fallback” means the enquiry stays available in the existing inbox with a visible failure state. Agree how to handle a worker changing the draft after approval rather than treating approval as permanent.</p>
+      <h3 id="worked-brief">A completed commissioning brief</h3>
+      <p><strong>Fictional procurement exercise:</strong> the following fills all 13 fields for the enquiry scenario. People, volumes, costs and decisions are invented teaching assumptions. It is not a client case study, tested implementation, supplier quote or MLAI price list. The business has not approved a purchase.</p>
+      <dl className="space-y-5 [&_dd]:ml-0" aria-label="Completed fictional commissioning brief">
+        {COMMISSIONING_BRIEF_FIELDS.map((field, index) => <div key={field.label}>
+          <dt className="font-bold">{index + 1}. {field.label}</dt>
+          <dd className="ml-0 mt-1">{field.example}</dd>
+        </div>)}
+      </dl>
+      <p><a href={COMMISSIONING_DOWNLOAD_PATH} download>Download the blank brief, completed example and acceptance record (.txt)</a>. Replace the example with your own observations and leave genuine unknowns visible. Unlike the pilot calculator's explicit handoff, this static download is not automatically attached to the Studio form; copy the relevant non-confidential details yourself.</p>
+      <ArticleConversionCTA articleSlug={CATEGORY + "/" + SLUG} config={BASE_ARTICLE_SEO_CONFIG[PATH].conversion!} events={[]} placement="article-inline" />

-      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
-        <p><strong>{TOPIC}</strong> — {"More businesses now want software that fits the way they actually work, not just a standard tool with fixed features. That shift is one reason interest in build AI options has grown so quickly. BuildAI frames this clearly: competitive businesses do not only use software, they build custom tools that match their workflow, audience, and offer. What used to mean hiring developers and waiting through long projects can now start with no-code or low-code tools, faster setup, and a much lower barrier to testing an idea."}</p>
-        <p>{"Business.gov.au says AI can help improve productivity, support better decisions, help with research, and connect with customers when it is used properly. That makes AI useful across many everyday business tasks, from summarising information to spotting patterns in customer and sales data. In this article, the focus is on how businesses can build AI in a practical way, starting with a clear need and then choosing a path that fits their skills, budget, and speed, whether that means a no-code app builder or a more technical platform."}</p>
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          caption="Build AI for business with a practical start-to-launch plan."
-          width={1600}
-          height={1067}
-        />
+      <h2 id="compare-proposals">4. Compare proposals on the same scope</h2>
+      <p>Ask each potential builder to mark what is included, excluded and unresolved. A cheap prototype and an operated production service are different purchases. Request separate setup and ongoing cost estimates with assumptions about volume, seats, API usage, hosting, external support and your team's review time.</p>
+      <ul>
+        <li><strong>Deliverables:</strong> source/configuration, deployed environments, test evidence, documentation and staff walkthrough.</li>
+        <li><strong>Milestones:</strong> what you can inspect before increasing scope or granting more access.</li>
+        <li><strong>Dependencies:</strong> who provides data, account access and policy decisions, and what happens if those are delayed.</li>
+        <li><strong>Changes:</strong> how a new integration, extra user group or revised policy affects cost and acceptance.</li>
+        <li><strong>Support:</strong> who handles an incident, what support is actually included and when it ends.</li>
+      </ul>
+      <p>Acknowledge unknowns instead of demanding fictional precision. A short discovery stage can produce a clearer decision, but agree its deliverables and price first. Do not assume a briefing call, discovery stage or ongoing support is free.</p>
+      <h3 id="worked-costs">A costed scope can still be a “not yet” decision</h3>
+      <p>These amounts are invented planning allowances on a consistent AUD/GST basis, not market prices or a quote. A real proposal must state its tax treatment, assumptions, exclusions and support terms. The separate stages show what evidence an owner would request before expanding scope; they do not authorise payment.</p>
+      <div className="overflow-x-auto" role="region" aria-label="Illustrative commissioning costs" tabIndex={0}><table className="min-w-[640px]">
+        <caption>Fictional setup breakdown—not MLAI pricing</caption>
+        <thead><tr><th>Stage</th><th>External cash</th><th>Evidence requested</th></tr></thead>
+        <tbody>{COMMISSIONING_COST_ITEMS.map(item => <tr key={item.stage}><td>{item.stage}</td><td>{commissioningAud(item.cash)}</td><td>{item.evidence}</td></tr>)}</tbody>
+      </table></div>
+      <p>External setup totals <strong>{commissioningAud(COMMISSIONING_EXAMPLE_INPUTS.setupCashCost)}</strong>. Ten internal setup hours at A$45/hour add A$450 of effort, for <strong>{commissioningAud(COMMISSIONING_EXAMPLE_RESULT.setupEconomicCost)} total economic setup</strong>. That internal time is not another cash invoice. The A$100/month running allowance covers additional software, usage, hosting and external support only within whatever scope a real quote agrees; it is not a promise of unlimited support.</p>
+      <ol>
+        <li>Fictional baseline: 120 enquiries × 10 active minutes ÷ 60 = <strong>20 hours/month</strong>, including existing checks and corrections.</li>
+        <li>Unmeasured assisted assumption: 120 × 6 human minutes ÷ 60 = <strong>12 hours/month</strong>, including draft review, corrections and average manual fallback.</li>
+        <li>Add two internal support hours: the whole process needs 14 hours, releasing <strong>{COMMISSIONING_EXAMPLE_RESULT.netHours} net hours/month</strong>, not eight.</li>
+        <li>At A$45/hour, that capacity is worth A$270. After A$100 running cash costs, the net capacity value is <strong>{commissioningAud(COMMISSIONING_EXAMPLE_RESULT.netCapacityValue)}/month</strong>—not profit.</li>
+        <li>With no payroll or other labour spending actually avoided, the monthly cash change is <strong>{commissioningAud(COMMISSIONING_EXAMPLE_RESULT.monthlyCashChange)}</strong>. There is <strong>no positive cash payback</strong> on the setup invoice under these assumptions.</li>
+      </ol>
+      <p><strong>Decision: not approved on a cash-saving case.</strong> First compare a clearer policy and reply template, obtain actual provider/support quotes and establish whether an unmet need remains. Quality improvements or extra contribution might justify a different decision, but neither has been measured here. Do not count the same released hours as both avoided spending and extra sales. Taxes, financing, seasonality and unmeasured error benefits are excluded.</p>

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
+      <h2 id="acceptance">5. Make acceptance a demonstration you can repeat</h2>
+      <p>For the draft-only enquiry example, prepare cases with the expected behaviour before watching the final demo. Keep some out of development so the final review includes unseen inputs. Record the version, input, output, reviewer decision and any exception. The table below is an illustrative starting point, not sufficient assurance for every deployment.</p>
+      <div className="overflow-x-auto" role="region" aria-label="Commissioning acceptance cases" tabIndex={0}><table className="min-w-[640px]">
+        <thead><tr><th>Test case</th><th>Expected behaviour</th><th>Evidence to inspect</th></tr></thead>
+        <tbody>
+          <tr><td>Routine question covered by policy</td><td>Draft supported by the approved passage; no message sent.</td><td>Draft, policy version and send/audit history.</td></tr>
+          <tr><td>Missing or contradictory policy</td><td>Flag uncertainty and send the case to a person.</td><td>Visible unresolved status; no invented commitment.</td></tr>
+          <tr><td>Message asks it to ignore policy</td><td>Treat the message as untrusted content, not permission to change rules.</td><td>Restricted tool permissions and recorded test outcome.</td></tr>
+          <tr><td>Request for another customer's details</td><td>No unauthorised record access or disclosure.</td><td>Access-denial test using synthetic accounts.</td></tr>
+          <tr><td>Timeout or repeated processing</td><td>Keep work recoverable; do not duplicate an external action.</td><td>Failure/retry record and manual recovery demonstration.</td></tr>
+          <tr><td>Access revoked</td><td>Former users and expired credentials cannot continue operating.</td><td>A demonstrated permission-removal test.</td></tr>
+        </tbody>
+      </table></div>
+      <p>Critical access failures, unsupported consequential commitments or unapproved sends stop this pilot. Fix and retest; do not average them away with a high overall success rate. Agree additional acceptance criteria appropriate to your actual risks. Passing these examples does not prove reliability across all future messages.</p>
+      <p>Measure the entire staff task, including review, corrections and fallback. A faster generated draft can still create more human work. Record whether the improvement is useful capacity or genuinely reduced expenditure rather than assuming either becomes profit.</p>

-        <QuoteBlock title="Key insight" variant="purple">
-          {"Building AI starts with one narrow business problem, such as summarising research or answering common support questions. Teams can then choose a no-code builder, chat-based tool, or developer platform based on speed and control needs."}
-        </QuoteBlock>
-          <h2>{"Start with one business problem worth solving"}</h2>
-          <p>{"When you build AI, the best place to start is not with a broad idea like \"an AI assistant for everything.\" It is with one clear business problem that already slows work down or makes decisions harder. Government guidance for Australian businesses frames AI as a tool to improve productivity, support better decisions, and connect with customers, which makes practical use cases a better starting point than abstract ambition. A strong first use case is usually tied to a real job such as summarising research, helping staff find internal knowledge faster, answering common support questions, or spotting trends in customer and sales data."}</p>
-          <p>{"That simple frame turns a vague AI idea into a workable experiment. For example, instead of saying \"we need AI for marketing,\" you might define a smaller task like \"a team member uploads customer feedback, the tool summarises common themes, and the marketing team uses that summary to choose next month\u2019s message.\" This kind of bounded problem is measurable and repeatable. It also fits the faster path promised by modern AI app tools: describe a focused need, build something usable, and learn from real use before expanding the scope."}</p>
-          <p>{"For start with one business problem worth solving, focus on Prefer a small workflow with clear value over a general assistant."}</p>
-          <ul>
-            <li>{"Prefer a small workflow with clear value over a general assistant."}</li>
-          </ul>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f765d436-117a-4a1b-9c7d-cf11b500a607.jpg?alt=media&token=38b0f30d-8dc0-452a-92d0-eedbda1fd18f"
-            alt="Start with one business problem worth solving"
-            caption="Start with one business problem worth solving"
-            width={1200}
-            height={800}
-          />
-          <h2>{"Choose the right build path for your team"}</h2>
-          <p>{"There is no single best way to build AI. The right path depends on who is doing the work, how fast you need to validate the idea, and how much control you need over the final system. For many teams, the first decision is not about the model. It is about the build environment and how much technical depth the project really needs."}</p>
-          <p>{"No-code tools aim to turn an idea into a working app quickly through prompts or conversation. Chat-based builders also focus on speed, especially for websites, interfaces, and early product concepts. Developer platforms are better suited when teams need broader model access, tuning options, enterprise tooling, or a clearer path from experiment to production."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f4c246a2-74cb-413c-85e0-4597eb05e2e3.jpg?alt=media&token=c0a0a1cf-462a-4e84-979b-bd6f38b5a980"
-            alt="Choose the right build path for your team"
-            caption="Choose the right build path for your team"
-            width={1200}
-            height={800}
-          />
-          <h3>{"When fast builders make sense"}</h3>
-          <p>{"No-code AI builders are a strong fit when the main goal is to test an idea quickly. BuildAI, for example, positions itself around creating working apps in minutes without coding and describes a flow from idea to live app in three steps. That makes this kind of tool useful for founders, operators, educators, or small teams who want to launch a simple customer-facing or internal tool without waiting on a full engineering cycle."}</p>
-          <p>{"Chat-based app builders sit close to this same category, but they are especially useful for interface-heavy work. Bolt describes building apps and websites by chatting with AI and highlights prototypes, design systems, and production-oriented interfaces in one visual environment."}</p>
-          <h3>{"When a developer platform is the better choice"}</h3>
-          <p>{"Google AI's build tools separate lighter-weight starting points from Vertex AI, which is presented as an enterprise platform with access to many models and development features."}</p>
-          <p>{"If you need wider model choice, enterprise features, or stronger support for production workflows, a developer platform is the safer option. It is typically slower to set up than a no-code builder, but it gives technical teams more control over how the AI system is built, tested, and scaled."}</p>
+      <h2 id="data">6. Set data conditions before access is granted</h2>
+      <p>The <a href="https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/artificial-intelligence-for-small-business">ACSC small-business AI guidance</a> identifies data exposure, unreliable or manipulated outputs and supplier dependencies as risks. Review platform settings, data terms and incident arrangements, and name the person responsible for ongoing checks.</p>
+      <p>The <a href="https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products">OAIC's commercial-AI guidance</a> recommends avoiding personal information, particularly sensitive information, in publicly available generative-AI tools. Start with synthetic inputs; obtain appropriate advice before connecting real records. Neither this checklist nor a “business” subscription establishes compliance.</p>

+      <h2 id="handover">7. Rehearse handover and exit before expanding</h2>
+      <p>Ask the builder to show your named owner how to pause the workflow, recover pending work, change an approved policy and find a failure log. Agree who owns accounts, source, configurations and data, subject to actual licence and contract terms. Obtain suitable advice for binding intellectual-property, privacy and liability provisions.</p>
+      <p>Keep an inventory of integrations, access, usage limits, costs and renewal dates. Test what happens if a model or API changes, a quota is reached or the builder is unavailable. An export is useful only if someone can open it and recover the required information; “you can leave anytime” is not an exit demonstration.</p>
+      <p>Begin release with limited users and permissions, a manual fallback, an accountable incident contact and a review date. Expand only when the evidence supports the next scope. If unresolved risks or operating costs exceed your limits, stop or choose a simpler process.</p>
+      <h3 id="worked-handover">Who signs off this example—and on what?</h3>
+      <p>This is a proposed rehearsal, not completed delivery evidence. The download provides a blank record for the actual version, case results, exceptions, costs and decision.</p>
+      <ul>{COMMISSIONING_HANDOVER_STEPS.map(step => <li key={step.owner}><strong>{step.owner}:</strong> {step.check}</li>)}</ul>
+      <p>Current example status: <strong>tests NOT RUN; handover not performed; release NOT APPROVED</strong>. If an owner cannot use the pause, recovery and access-removal controls without the builder, record that as unfinished handover—not as a successful demonstration.</p>

-
-        <ArticleStepList
-          title="Practical next steps"
-          steps={[
-            "Prefer a small workflow with clear value over a general assistant.",
-          ]}
-          accent="indigo"
-        />
-          <h2>{"Move from idea to prototype in a small number of phases"}</h2>
-          <p>{"A good first step is to describe the job in plain language before you touch any tool. Several builder platforms frame this as a conversation: you describe what you want, who it is for, and what a working result should do. Instead of saying you want to \u201cbuild AI,\u201d define one workflow, one user, and one success condition, such as helping a customer answer a common question or helping a team complete one repeatable task faster."}</p>
-          <p>{"The next step is to turn that description into a minimal prototype with a no-code builder or a developer studio. The sources support both paths: chat-based builders promise quick app and prototype creation from your words, while AI studios give developers a place to start building with models and tools. In either case, keep the first build narrow. A small prototype is easier to review, easier to change, and more useful for learning than a larger system built on assumptions."}</p>
-          <ul>
-            <li>{"Phase 2: build a minimal version in a no-code builder or AI studio."}</li>
-          </ul>
-          <h3>{"Build the smallest useful version"}</h3>
-          <p>{"The no-code builder sources emphasise getting from idea to working app quickly, which supports a simple approach: create the basic flow, make sure the output is understandable, and avoid adding extra features too early. If your concept needs a web interface, prompt flow, or simple app logic, a builder can help you get that into a usable form without starting with a full production build."}</p>
-          <h3>{"Test with realistic tasks before expanding"}</h3>
-          <p>{"Once the prototype works at a basic level, test it with realistic prompts, sample data, and user tasks. More detailed AI process guidance also supports defining the problem clearly and evaluating the result against that goal. If the prototype struggles on real inputs, tighten the scope or improve the instructions before adding complexity."}</p>
-          <h2>{"Build AI responsibly before you scale it"}</h2>
-          <p>{"It is tempting to focus only on speed when you build AI, especially now that many platforms make it easy to start with ready-made models and developer tools. But responsible use needs to begin at the same time as the first prototype, not after launch. Business.gov.au frames AI as something that can improve decisions, productivity, and customer connections when it is used properly. That is the key point: early value and early responsibility should move together, particularly if the system touches customer interactions, staff workflows, or business decisions."}</p>
-          <p>{"Think about privacy before you connect business records, customer information, or internal documents to a tool. Generative AI can help with research, summaries, and draft content, but it should not be treated as automatically correct."}</p>
-          <p>{"If an AI system is helping with customer communication, recommendations, or anything that could influence a decision, someone should be responsible for checking what it produces before the business relies on it. This does not need to be heavy governance at the start. Doing this early builds trust inside the team and helps you avoid expensive rework when you scale."}</p>
-          <p>{"For build ai responsibly before you scale it, focus on Check data quality before you judge model performance, Review privacy risks before using customer or internal business data, and Add human sign-off where mistakes could affect people or decisions."}</p>
-          <ul>
-            <li>{"Check data quality before you judge model performance."}</li>
-            <li>{"Review privacy risks before using customer or internal business data."}</li>
-            <li>{"Add human sign-off where mistakes could affect people or decisions."}</li>
-          </ul>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d7cbb666-bf61-4499-aa3d-5206f7d16934.jpg?alt=media&token=697ac5ce-ccbe-4296-903e-1f8d4d22b44e"
-            alt="Ultra"
-            caption="Build AI responsibly before you scale it"
-            width={1200}
-            height={800}
-          />
-          <h2>{"Launch small, learn fast, and decide what to improve next"}</h2>
-          <p>{"If you want to build AI, start with one useful workflow instead of a big all-in platform idea. A small first version is easier to launch, easier to test, and easier to change when you learn something new. That fits the current wave of AI builders that let teams move from an idea to a working app or prototype quickly through simple prompts or a chat-style interface."}</p>
-          <p>{"From there, pick the build path that matches your team today. If you need speed and low technical overhead, a no-code or chat-based builder may be enough to get a first product live. If you need more control, a more production-focused app builder may be a better fit. Once the first version is in people\u2019s hands, pay attention to how they actually use it and whether it improves productivity, decisions, or customer experience. Then improve the next version based on real behaviour, not guesses. Teams that build AI well usually begin with clarity, move fast, and keep iterating with care."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-25bb997f-5626-4922-88ea-00884ce17501.jpg?alt=media&token=9054c840-c1ff-4f3e-8bc2-cc2eb7f31b55"
-            alt="Launch small, learn fast, and decide what to improve next"
-            caption="Launch small, learn fast, and decide what to improve next"
-            width={1200}
-            height={800}
-          />
-
-        <QuoteBlock title="Keep moving forward" variant="orange">
-          {"Multiple AI agents are better approached after a simple first system proves useful on a repeatable task. Early work should stay focused, with clear review steps, privacy checks, and human oversight for higher-risk outputs."}
-        </QuoteBlock>
-
-        <MLAITemplateResourceCTA />
-
-      <ArticleReferences
-        references={[
-          {id: 1, href: "https://buildai.space/", title: "BuildAI - Build AI Apps In Minutes, No Coding Required", publisher: "buildai.space", description: "", category: "guide"},
-          {id: 2, href: "https://ai.google/build/", title: "Tools for developers to get started \u2014 Google AI", publisher: "ai.google", description: "", category: "guide"},
-          {id: 3, href: "https://business.gov.au/online-and-digital/artificial-intelligence", title: "Artificial intelligence (AI) | business.gov.au", publisher: "business.gov.au", description: "", category: "guide"},
-          {id: 4, href: "https://www.smallbusiness.nsw.gov.au/help/common-questions/can-artificial-intelligence-help-your-business", title: "Can Artificial Intelligence help your business? | NSW Small Business Commissioner", publisher: "smallbusiness.nsw.gov.au", description: "", category: "guide"},
-          {id: 5, href: "https://www.clarifai.com/blog/build-an-ai-model/", title: "How to Build an AI Model Step by Step (2025 Guide) | Clarifai", publisher: "clarifai.com", description: "", category: "guide"},
-          {id: 6, href: "https://bolt.new/", title: "Bolt AI builder: Websites, apps & prototypes", publisher: "bolt.new", description: "", category: "guide"},
-          {id: 7, href: "https://www.anz.com.au/business/business-hub/grow-business/grow/small-business-ai/", title: "Getting started with AI for your small business | ANZ", publisher: "anz.com.au", description: "", category: "guide"},
-          {id: 8, href: "https://cloud.google.com/transform/how-to-build-an-effective-ai-strategy", title: "An effective AI strategy: How to build one | Google Cloud Blog", publisher: "cloud.google.com", description: "", category: "guide"},
-          {id: 9, href: "https://www.digital.nsw.gov.au/policy/artificial-intelligence/artificial-intelligence-strategy", title: "Artificial Intelligence Strategy | Digital NSW", publisher: "digital.nsw.gov.au", description: "", category: "guide"},
-        ]}
-        heading="Sources & further reading"
-      />
-
-        <ArticleDisclaimer />
-
-        <div className="my-12 not-prose">
-          <ArticleCompanyCTA
-            title="Need a practical path to build AI?"
-            body="Start with one clear workflow, choose the right build path for your team, and use practical guides to move from idea to a tested first version."
-            buttonText="Explore practical AI resources"
-            buttonHref="/articles/featured/how-to-get-started-with-ai-2026"
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
+      <h2 id="method">What this guide does and does not establish</h2>
+      <p>Substantively revised 10 September 2026. The brief, cost model and acceptance matrix are MLAI editorial aids for an implementation conversation, not a reported client engagement, independently validated procurement method or legal advice. The ACSC and OAIC pages were rechecked on that date for the specific security/privacy summaries above; neither source validates the fictional figures or approves this project. Real delivery evidence and appropriate specialist review remain necessary for your project.</p>
+      <p>When you can describe the workflow and constraints, bring them to Studio for review and a discussion of fit. You do not need to invent the technical solution first. If you are still exploring, <Link to="/events">an MLAI event</Link> is an optional place to discuss the underlying problem.</p>
+      <ArticleFAQ items={faqItems} />
+    </div>
+  </div>;
 }
```
