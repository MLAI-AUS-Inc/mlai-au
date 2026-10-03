# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/how-small-business-owners-can-get-started-with-ai-2026.tsx
+++ unreviewed-local-draft/app/articles/content/featured/how-small-business-owners-can-get-started-with-ai-2026.tsx
@@ -1,335 +1,136 @@
-import type { ReactNode } from 'react'
-import { Home } from 'lucide-react'
-import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
+import { Home } from "lucide-react";
+import { Link } from "react-router";
+import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
+import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
+import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
+import AiPilotWorksheet from "~/components/articles/AiPilotWorksheet";
+import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";

-import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
-import AuthorBio from '../../../components/AuthorBio'
-import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
-import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
-import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
-import { QuoteBlock } from '../../../components/articles/QuoteBlock'
-import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
-import { AudienceGrid } from '../../../components/articles/AudienceGrid'
-import { ArticleStepList } from '../../../components/articles/ArticleStepList'
-import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
-import { ArticleReferences } from '../../../components/articles/ArticleReferences'
-import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
-import { getDefaultArticleAuthorDetails } from '../../authors'
+export const useCustomHeader = true;
+export const CATEGORY = "featured";
+export const SLUG = "how-small-business-owners-can-get-started-with-ai-2026";
+export const DATE_PUBLISHED = "2026-01-22";
+export const DATE_MODIFIED = "2026-09-10";
+export const DESCRIPTION = "Choose one business workflow, compare full pilot costs with genuinely avoidable spending, and use a downloadable worksheet and test plan before commissioning AI implementation.";
+const TITLE = "How small business owners can get started with AI: a measured pilot";
+const ARTICLE_PATH = "/articles/featured/how-small-business-owners-can-get-started-with-ai-2026";
+const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e8d91d69-4aa4-49a0-b1e4-a8b32d3f54ab.jpg?alt=media&token=3d3573bf-5a7d-416f-a7be-61be2dd87a04";
+const ACSC = "https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/artificial-intelligence-for-small-business";
+const OAIC = "https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products";

-/** ========== INPUTS (replace all placeholders) ========== */
-export const useCustomHeader = true
+export const articleMeta = { title: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO_IMAGE, imageAlt: "Illustration of a team planning work together" };
+export const summaryHighlights = {
+  heading: "Start with a business decision, not a tool subscription",
+  intro: "For an Australian owner or manager who needs implementation help and wants to know whether one workflow is worth testing.",
+  items: [
+    { label: "What should I try first?", description: "One repeatable task with inspectable inputs, a human approver and a manual fallback. First check whether a template or fixed automation already solves it." },
+    { label: "How do I judge the value?", description: "Measure total human effort, including checking and rework. Subtract running costs and distinguish released capacity from spending you can actually avoid." },
+    { label: "When should I stop?", description: "Pause on a critical error, unsafe data access or failed acceptance criteria. A positive time estimate is not permission to release an unsafe workflow." },
+  ],
+};
+export const faqItems = [
+  { question: "Do I need to learn to code before starting an AI pilot?", answer: "No. Explain the current task, inputs, constraints and what a correct result looks like. An existing product may support it; if integration or custom implementation is necessary, those requirements form a delivery brief." },
+  { question: "Is time saved the same as better profit margins?", answer: "No. Salaried time released can create capacity without reducing payroll. Count cash savings only where spending is genuinely avoided, then subtract subscriptions, usage, support and implementation costs. Track additional contribution from extra sales separately; this worksheet does not assume it." },
+  { question: "How many examples should I test?", answer: "A handful can find obvious problems, but cannot establish reliability. Include normal tasks, exceptions and consequential failures; choose evidence and acceptance criteria appropriate to the risk. Keep cases out of prompt development so you also test unseen inputs." },
+  { question: "Does a business subscription make customer data safe to upload?", answer: "No. Review the specific product, configuration, data handling and contractual terms. Start with synthetic examples, establish access and retention rules, and obtain appropriate advice on your obligations before introducing personal or confidential information." },
+];

-const TOPIC = 'How small business owners can get started with AI'
-export const CATEGORY = 'featured'
-export const SLUG = 'how-small-business-owners-can-get-started-with-ai-2026'
-const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
-const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
-const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
-const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
-const AUTHOR_AVATAR =
-  AUTHOR_PROFILE.avatarUrl ??
-  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
-export const DATE_PUBLISHED = '2026-01-29'
-export const DATE_MODIFIED = '2026-01-29'
-export const DESCRIPTION = 'Starter plan for Australian small business owners to adopt AI in 2026: practical use cases, a 30‑day pilot, privacy and security basics, and ROI tips.'
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e8d91d69-4aa4-49a0-b1e4-a8b32d3f54ab.jpg?alt=media&token=3d3573bf-5a7d-416f-a7be-61be2dd87a04"
-const HERO_IMAGE_ALT = 'Small business owner using AI tools on a laptop'
-export const FEATURED_FOCUS = 'ai'
+export default function ArticleContent() {
+  const conversion = BASE_ARTICLE_SEO_CONFIG[ARTICLE_PATH].conversion!;
+  return <>
+    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: "Small-business AI pilot", current: true }]} title={TITLE} titleHighlight="a measured pilot" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO_IMAGE} heroImageAlt={articleMeta.imageAlt} />
+    <div className="prose prose-lg prose-slate max-w-none" data-primary-icp="SMB">
+      <p><strong>Choose one workflow, measure its current cost, and test whether assistance improves the whole task—not just the first draft.</strong> You do not need to code or buy an agent first. You need a process someone owns, examples of correct work, a safe test environment and a reason the improvement would matter.</p>
+      <p>This guide is for owners and managers of established small businesses. It helps you decide whether to configure an existing tool or commission a bounded pilot. It is not a coding tutorial, product ranking or promise that AI will improve your margins.</p>
+      <h2 id="choose-task">1. Choose a task with a clear way to check the answer</h2>
+      <p>Describe an input, an output and an approver: “From approved product facts, draft a description for a staff member to check.” Avoid “automate marketing”; it hides too many decisions. First try a better template, clearer handover or fixed rule. If that solves the problem, you may not need AI.</p>
+      <div className="overflow-x-auto"><table>
+        <caption>Illustrative pilot options—not measured client results</caption>
+        <thead><tr><th>Task</th><th>Bounded experiment</th><th>Keep outside the pilot</th><th>Measure</th></tr></thead>
+        <tbody>
+          <tr><td>Product descriptions</td><td>Draft from approved facts; staff approve publication.</td><td>Invented specifications, safety claims or discounts.</td><td>Total minutes to approval; unsupported facts.</td></tr>
+          <tr><td>Routine enquiry replies</td><td>Suggest a reply from approved policy text in a test inbox.</td><td>Autonomous sending, refunds or unusual commitments.</td><td>Review/fallback time, policy errors and escalation accuracy.</td></tr>
+          <tr><td>Internal handover notes</td><td>Turn synthetic notes into a checklist a worker verifies.</td><td>Customer records, payroll changes or external messages.</td><td>Missed actions, incorrect owners and correction time.</td></tr>
+        </tbody>
+      </table></div>
+      <p>Reject a first experiment if you cannot inspect its output, lack permission to use the inputs or cannot safely undo an action. A familiar task is not automatically low-risk: an incorrect price, recipient or health claim can still have consequences.</p>

-/** ===== FAQ ===== */
-interface FAQ {
-  id: number
-  question: string
-  answer: ReactNode
+      <h2 id="baseline">2. Record the baseline before choosing a solution</h2>
+      <p>Observe a representative operating period. Record volume, case type, human handling time, corrections, waiting time and final outcome. Keep waiting time separate from paid effort: cutting a queue by a day is useful, but not a day of wage savings.</p>
+      <ul>
+        <li><strong>Use one consistent unit:</strong> an approved description or correctly resolved enquiry, not one model response.</li>
+        <li><strong>Include difficult cases:</strong> missing inputs, unusual requests and existing escalations.</li>
+        <li><strong>Name an owner:</strong> who judges correctness, manages access and can stop the test?</li>
+        <li><strong>State the business reason:</strong> avoid overtime, reduce contractor spending, prevent errors or release capacity. These are different outcomes.</li>
+      </ul>
+
+      <h2 id="buy-or-build">3. Decide whether to improve, configure or commission</h2>
+      <div className="overflow-x-auto"><table>
+        <thead><tr><th>Path</th><th>When to investigate it</th><th>Before spending</th></tr></thead>
+        <tbody>
+          <tr><td>Improve without AI</td><td>A template, clear owner or fixed rule covers the cases.</td><td>Test that simpler change against the same baseline.</td></tr>
+          <tr><td>Configure an existing product</td><td>Your current system can assist while preserving review and permissions.</td><td>Check the actual plan, connector access, usage limits, data terms and fallback.</td></tr>
+          <tr><td>Commission a scoped build</td><td>The workflow crosses systems or requires controls the existing product cannot provide.</td><td>Agree inputs, permitted actions, acceptance tests, ongoing owner and support boundaries.</td></tr>
+        </tbody>
+      </table></div>
+      <p>There is no universal under-$500 budget or cheapest subscription that fits every pilot. Obtain prices for the actual seats, usage, integration and support. A custom build is not automatically better; an existing tool is not automatically safe. For commissioning decisions, see <Link to="/articles/featured/how-to-build-ai-for-real-business-problems">building AI for a real business problem</Link>.</p>
+
+      <h2 id="cost-example">4. Separate useful capacity from cash savings</h2>
+      <p><strong>Worked illustration, not an MLAI client result:</strong> suppose a business produces 60 descriptions a month. Each currently takes 20 human minutes. A proposed assisted process takes eight human minutes, including review, corrections and the average effort of manual fallbacks. These timings are assumptions to replace with measurements.</p>
+      <ol>
+        <li>Effort released: 60 × (20 − 8) ÷ 60 = <strong>12 hours/month</strong>.</li>
+        <li>Allow another two internal maintenance hours: <strong>10 net hours/month</strong>.</li>
+        <li>At an illustrative loaded cost of A$45/hour, capacity is worth A$450. Subtract A$100 of additional running cash costs: <strong>A$350/month net capacity value</strong>.</li>
+        <li>If payroll and other spending stay unchanged, avoidable labour spend is zero. The <strong>cash change is minus A$100/month</strong>, not a A$350 profit increase.</li>
+        <li>If you can substantiate that half the net labour value replaces avoidable spending, the estimated cash change becomes A$225 − A$100 = <strong>A$125/month</strong>. An illustrative A$600 setup invoice takes 4.8 months to repay from that cash change, if sustained.</li>
+      </ol>
+      <p>Six internal setup hours add A$270 of effort, taking total economic setup cost to A$870. That internal effort is not included in the cash-invoice payback. Do not count the same labour in both the invoice and internal hours. The example excludes additional revenue, tax effects, financing and seasonality.</p>
+      <p>If released capacity lets you sell more work, measure the <em>additional contribution after delivery costs</em> separately. Do not assume every released hour can be sold or value it at an unadjusted billing rate.</p>
+      <p>Complete the worksheet below, then choose <strong>Use my worksheet in a Studio brief</strong> to carry your estimates and non-confidential notes into the enquiry for review. That does not submit them or treat the example's figures as agreed requirements. You can also start a blank brief with the separate CTA.</p>
+    </div>
+
+    <AiPilotWorksheet />
+    <ArticleConversionCTA articleSlug={CATEGORY + "/" + SLUG} config={conversion} events={[]} placement="article-inline" />
+
+    <div className="prose prose-lg prose-slate mt-10 max-w-none">
+      <h2 id="test-plan">5. Test the whole workflow, including failures</h2>
+      <p>The worksheet download includes a blank evaluation sheet: assign the owner, separate development and held-out cases, then record expected and actual outcomes, error severity, total human effort and the continue/stop decision. Its fictional missing-warranty example is explicitly <strong>not run</strong>. Fill the log with observed evidence; the calculator cannot evaluate the workflow for you.</p>
+      <p>A few selected successes are a smoke test, not reliability evidence. Separate development examples from evaluation cases. Record the product/model version, settings, date, inputs, result, human corrections and total handling time. Never drop cases that failed or needed manual completion.</p>
+      <div className="overflow-x-auto"><table>
+        <caption>Evaluation plan for the illustrative product-description pilot</caption>
+        <thead><tr><th>Case</th><th>Expected behaviour</th><th>Failure to log</th></tr></thead>
+        <tbody>
+          <tr><td>Complete approved facts</td><td>Draft supported facts for staff approval.</td><td>Invented material, price or capability.</td></tr>
+          <tr><td>Missing dimensions or warranty</td><td>Leave unresolved or ask a person; do not guess.</td><td>Confident unsupported details.</td></tr>
+          <tr><td>Instructions embedded in supplier text</td><td>Treat text as untrusted input, not authority to change policy or send data.</td><td>Following conflicting instructions or exposing information.</td></tr>
+          <tr><td>Tool failure or unacceptable draft</td><td>Use the manual process and count its effort.</td><td>Work lost, sent unapproved or omitted from timing.</td></tr>
+        </tbody>
+      </table></div>
+      <p>Agree quality requirements, time/cost ceilings and escalation rules before evaluation. For this draft-only example, an unsupported consequential claim or unapproved publication is a stop signal. Define critical errors with the accountable owner; high-consequence decisions need qualified review. No observed errors in a small sample does not prove there are none.</p>
+      <p>Compare the same mix of tasks. Record changes in demand, staffing or product complexity instead of attributing every improvement to AI. Expand only when you can explain both the benefit and the cases where the process still fails.</p>
+
+      <h2 id="data-controls">6. Set data and action boundaries before connecting systems</h2>
+      <p>The <a href={ACSC}>ACSC's small-business AI guidance</a> identifies data exposure, unreliable or manipulated outputs and supplier dependencies as risks. Check data handling, access settings and incident procedures; assign responsibility for output checks and ongoing review. A business-plan label alone does not settle these questions.</p>
+      <p>The <a href={OAIC}>OAIC's commercial-AI guidance</a> recommends avoiding personal information, particularly sensitive information, in publicly available generative-AI tools. It addresses product due diligence, transparency and personal information in inputs and outputs. Begin with synthetic data and obtain appropriate advice before connecting real records; this guide is not a compliance assessment.</p>
+      <ul>
+        <li>List the systems and fields the pilot may access; begin with the least access required.</li>
+        <li>Keep publication, payments and customer commitments behind named human approval.</li>
+        <li>Define who changes prompts/configuration, how logs are protected and when data is deleted.</li>
+        <li>Test manual fallback and account/access removal before depending on a supplier.</li>
+      </ul>
+
+      <h2 id="decision">7. Decide to continue, revise or stop</h2>
+      <p>Choose a review date after enough representative work—not because every pilot must last four weeks. Consider correctness, critical failures, net effort, cash costs and maintenance ownership together.</p>
+      <ul>
+        <li><strong>Continue cautiously:</strong> acceptance criteria are met, the value matters and someone owns the process.</li>
+        <li><strong>Revise and retest:</strong> a limited, understood problem has a feasible fix. Set a bounded test, not an indefinite experiment.</li>
+        <li><strong>Stop:</strong> unsafe behaviour, unreliable evidence or costs you cannot justify. Keep the manual process and capture what you learned.</li>
+      </ul>
+      <p>If implementation is the obstacle, bring the worksheet's workflow, constraints and success measure to Studio. Submitting a brief does not commit you to a project or guarantee savings. If you are still exploring the basics, <Link to="/events">an MLAI event</Link> is a lower-commitment place to discuss your questions.</p>
+
+      <h2 id="method">Sources and limits</h2>
+      <p>The security and privacy sources above were checked on 9 September 2026. The tables, model and worksheet are MLAI editorial decision aids, not a reported customer experiment or validated financial forecast. The numbers are illustrative; real pilot feedback and measured outcomes are needed to assess usefulness in your business. No vendor price, hiring promise or guaranteed return is implied.</p>
+      <ArticleFAQ items={faqItems} />
+    </div>
+  </>;
 }
-
-export const faqItems: FAQ[] = [
-  {
-    id: 1,
-    question: 'Which AI tools are easiest for beginners? (2026)',
-    answer: (
-      <>
-        Start with tools that fit your current stack: Microsoft 365 Copilot or Google Workspace (Gemini) for documents and email; ChatGPT Teams for drafting and Q&A; and vertical tools like help‑desk assistants inside your support platform. Pick one tool, one use case, and run a short pilot first.
-      </>
-    ),
-  },
-  {
-    id: 2,
-    question: 'Do I need my own data to see value?',
-    answer: (
-      <>
-        No. You can get value from generic tasks like drafting emails, FAQs, and product descriptions. Your own data becomes powerful later via connectors to email, docs, spreadsheets or your CRM—after you’ve proven the workflow.
-      </>
-    ),
-  },
-  {
-    id: 3,
-    question: 'How do I avoid privacy risks with customer data?',
-    answer: (
-      <>
-        Use business/enterprise plans that offer data control, opt‑out of model training where possible, avoid pasting sensitive personal information, and set a simple team policy for what’s in/out. Follow Cyber.gov.au guidance for small business security.
-      </>
-    ),
-  },
-  {
-    id: 4,
-    question: 'What skills should my team learn first?',
-    answer: (
-      <>
-        Prompting basics (clear instructions, examples), verifying outputs, handling data safely, and maintaining an audit trail. Create lightweight “house rules” so everyone follows the same approach.
-      </>
-    ),
-  },
-  {
-    id: 5,
-    question: 'How do we measure ROI on an AI pilot?',
-    answer: (
-      <>
-        Track time saved against your baseline, apply your internal hourly rate, and note quality improvements (e.g., fewer revisions, faster response times). Keep pilots under $500 and under 4 weeks to make the decision simple.
-      </>
-    ),
-  },
-  {
-    id: 6,
-    question: 'Are there Australian rules or support I should know about?',
-    answer: (
-      <>
-        Check the Office of the Australian Information Commissioner (OAIC) for privacy obligations and Cyber.gov.au for small business security practices. For potential support programs, refer to Business.gov.au (offerings change—always verify current details).
-      </>
-    ),
-  },
-]
-
-/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
-export const summaryHighlights = {
-  heading: `Key facts: ${TOPIC}`,
-  intro: "Start with one bounded task, compare the result with your current process and include the time spent checking and correcting the output.",
-  items: [
-    { label: 'What’s a good first AI project for a small business?', description: 'Pick one repeatable task (e.g., customer reply drafts or FAQs) and run a 2–4 week pilot.' },
-    { label: 'How much does it cost to start using AI in 2026?', description: '$0–$50 per user/month for mainstream tools; keep pilots under $500 total.' },
-    { label: 'Is it safe to use AI with customer data?', description: 'Use business plans with data controls, avoid sensitive info, and follow Cyber.gov.au guidance.' },
-  ],
-}
-
-/** ===== Article Metadata (route handler uses for registry/SEO) ===== */
-export const articleMeta = {
-  title: `${TOPIC} (2026)`,
-  topic: TOPIC,
-  category: CATEGORY,
-  slug: SLUG,
-  description: DESCRIPTION,
-  datePublished: DATE_PUBLISHED,
-  dateModified: DATE_MODIFIED,
-  author: AUTHOR,
-  image: HERO_IMAGE,
-  imageAlt: HERO_IMAGE_ALT,
-}
-
-/** ===== References (optional) ===== */
-const references = [
-  {
-    id: 1,
-    href: 'https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/artificial-intelligence-for-small-business',
-    title: 'Artificial intelligence for small business',
-    publisher: 'Cyber.gov.au',
-    description: 'Security and safe adoption guidance for Australian small businesses.',
-    category: 'government',
-  },
-  {
-    id: 2,
-    href: 'https://www.pwc.com.au/services/artificial-intelligence/2026-ai-business-predictions.html',
-    title: '2026 AI Business Predictions',
-    publisher: 'PwC Australia',
-    description: 'Outlook on AI adoption and impact on business in 2026.',
-    category: 'analysis',
-  },
-  {
-    id: 3,
-    href: 'https://www.smartcompany.com.au/partner-content/how-are-small-businesses-using-ai-to-get-ahead-in-2026/',
-    title: 'How are small businesses using AI to get ahead in 2026?',
-    publisher: 'SmartCompany',
-    description: 'Examples of practical AI use cases for SMBs.',
-    category: 'analysis',
-  },
-  {
-    id: 4,
-    href: 'https://vtdigital.com.au/10-profitable-ai-business-ideas-in-australia-for-2026/',
-    title: '10 Profitable AI Business Ideas in Australia for 2026',
-    publisher: 'VT Digital',
-    description: 'Idea starters and opportunities in the Australian context.',
-    category: 'industry',
-  },
-]
-
-/**
- * ARTICLE CONTENT COMPONENT
- *
- * This component is dynamically imported by the route handler and rendered
- * INSIDE ArticleLayout. Do NOT wrap in ArticleLayout here.
- */
-export default function ArticleContent() {
-  const authorDetails = {
-    name: AUTHOR,
-    role: AUTHOR_ROLE,
-    bio: AUTHOR_BIO,
-    avatarUrl: AUTHOR_AVATAR,
-  }
-
-  return (
-    <>
-      {/* Hero header (custom) */}
-      <ArticleHeroHeader
-        breadcrumbs={[
-          { label: 'Home', href: '/', icon: Home },
-          { label: 'Articles', href: '/articles' },
-          { label: TOPIC, current: true },
-        ]}
-        title={TOPIC}
-        titleHighlight={TOPIC}
-        headerBgColor="cyan"
-        summary={summaryHighlights}
-        heroImage={HERO_IMAGE}
-        heroImageAlt={HERO_IMAGE_ALT}
-      />
-
-      {/* Table of contents placeholder */}
-      <ArticleTocPlaceholder className="bg-transparent" />
-
-      <div className="prose prose-lg prose-slate max-w-none">
-        {/* Opening paragraph */}
-        <p>
-          <strong>{TOPIC}</strong> – In 2026, Australian small businesses are using AI to draft customer emails and social posts, answer common enquiries, summarise notes, and tidy up bookkeeping. The safest way to start is a short, low‑risk pilot on one task your team already does every day.
-        </p>
-
-        {/* Hero Image - Use ArticleImageBlock, not raw img */}
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          caption="Exploring AI tools and planning a short pilot."
-        />
-
-        {/* WHO IS THIS FOR - Use AudienceGrid, not raw HTML divs */}
-        <AudienceGrid
-          heading="Who is this guide for?"
-          cards={[
-            {
-              title: 'Founders & Teams',
-              description: 'Owners and managers looking for quick wins without big budgets.',
-              icon: <RocketLaunchIcon className="h-6 w-6" />,
-              variant: 'orange',
-            },
-            {
-              title: 'Students & Switchers',
-              description: 'Helping out in family businesses or side‑hustles with AI skills.',
-              icon: <AcademicCapIcon className="h-6 w-6" />,
-              variant: 'purple',
-            },
-            {
-              title: 'Community Builders',
-              description: 'Advisors and mentors supporting Australian small businesses.',
-              icon: <UsersIcon className="h-6 w-6" />,
-              variant: 'yellow',
-            },
-          ]}
-        />
-
-        {/* RESEARCH-DERIVED SECTIONS */}
-        <h2>What small businesses are actually doing with AI in 2026</h2>
-        <p>
-          Themes from current Australian coverage show clear early wins: marketing copy and product descriptions, inbox triage and replies, website and help‑desk FAQs, transcription and content summaries, basic forecasting, and receipt categorisation. These are repeatable workflows, easy to measure, and typically low‑risk.
-        </p>
-
-        <QuoteBlock title="Key insight" variant="purple">
-          Start where benefits are immediate and measurable: automate parts of workflows you already do daily, not whole jobs.
-        </QuoteBlock>
-
-        <h2>Start with a safe, narrow pilot (2–4 weeks)</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-dfd47926-b1a6-469c-b2c4-bf43654e2805.jpg?alt=media&token=72bfaff8-3714-47fd-98e7-947caa5e5a2a" alt="Tech team brainstorming in a 90s film aesthetic during a focused pilot project session." className="w-full rounded-lg my-8" />
-
-        <p>
-          A short pilot lets you test value without big spend. Keep it to one business process, under $500, and track time and quality improvements against a baseline.
-        </p>
-
-        <h3>Pick one task, not a department</h3>
-        <p>
-          Good candidates include drafting reply emails to common enquiries, generating product descriptions from a checklist, turning call notes into a follow‑up plan, or tagging and summarising support tickets.
-        </p>
-
-        <QuoteBlock title="Practical checklist" variant="purple">
-          Define one outcome and success metric; set a weekly time baseline; choose one tool; write simple prompts and examples; agree on what data is allowed; and decide in advance how you will measure quality.
-        </QuoteBlock>
-
-        <ArticleStepList
-          title="30‑day pilot plan"
-          steps={[
-            { label: 'Week 0: Choose one workflow and capture a 1‑week baseline (time/quality). ' },
-            { label: 'Week 1: Select a tool that fits your stack (e.g., Microsoft/Google/ChatGPT Teams). ' },
-            { label: 'Week 1: Configure access and guardrails (no sensitive data; opt‑out of training). ' },
-            { label: 'Weeks 2–3: Run the pilot with 3–5 real examples; log time, outputs, corrections.' },
-            { label: 'Week 3: Review security and privacy against Cyber.gov.au guidance.' },
-            { label: 'Week 4: Compare to baseline; decide: scale, tweak, or stop.' },
-          ]}
-          accent="teal"
-        />
-
-
-
-        <h2>Choosing tools that fit how you already work</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-457d6857-02d1-4d48-b737-7db763113054.jpg?alt=media&token=7261b560-3a15-4cbe-a28f-62b1ce79ba7a" alt="A vibrant 90s film-inspired scene showcasing a diverse team collaborating in a tech startup environment." className="w-full rounded-lg my-8" />
-
-        <p>
-          Pick tools that plug into your daily systems. If your team lives in Microsoft 365, start with Copilot; if you use Google Workspace, try Gemini. If you need a general assistant for drafting, ChatGPT Teams or similar can work. Vertical add‑ons inside your help‑desk, accounting, or e‑commerce suite often reduce setup effort and risk.
-        </p>
-        <p>
-          Check data controls (can you opt‑out of model training?), permissioning (who can see what?), and pricing (keep the pilot under $500 total). Prefer Australian or compliant data handling where possible, and keep sensitive information out of prompts.
-        </p>
-
-        <h2>Protect customer and business data from day one</h2>
-        <p>
-          Follow small‑business security basics from Cyber.gov.au: least‑privilege access, strong authentication, and a clear rule on what data can be used in prompts. Keep an audit trail of prompts and outputs during pilots, and never paste payment details or sensitive personal information. If in doubt, leave it out.
-        </p>
-
-        <QuoteBlock title="Pro tip" variant="orange">
-          Treat AI like a junior assistant: it drafts quickly, you verify. Keep humans in the loop for anything customer‑facing or legally sensitive.
-        </QuoteBlock>
-
-        <MLAITemplateResourceCTA />
-
-        <h2>Estimate ROI with simple numbers</h2>
-        <p>
-          A basic model is time saved × hourly cost, plus any quality uplift. Example: if drafting a product description drops from 20 to 8 minutes across 60 items a month, that’s 12 minutes × 60 = 12 hours saved. At $45/hour, that’s ~$540/month before quality benefits. Compare against tool costs and keep only what pays back.
-        </p>
-
-        <h2>What to do next</h2>
-        <p>
-          Choose one workflow, run a 2–4 week pilot, and measure results. If it works, document the prompt, data rules, and QA checks so anyone on the team can repeat it. Expand to one more workflow, then stop and reassess. Sustainable progress beats a big‑bang project.
-        </p>
-      </div>
-
-      {/* References */}
-      <ArticleReferences references={references} heading="Sources & further reading" />
-
-      {/* Disclaimer */}
-      <ArticleDisclaimer />
-
-      {/* Company CTA */}
-      <ArticleCompanyCTA
-        title={`Need help with ${TOPIC}?`}
-        body="MLAI is a not‑for‑profit community empowering the Australian AI community. Connect for practical pointers and community resources."
-        buttonText="Get recommendations"
-        buttonHref="/contact"
-        note="We’ll point you to community resources and upcoming sessions."
-      />
-
-      {/* Author Bio */}
-      <AuthorBio author={authorDetails} />
-
-      {/* FAQ */}
-      <ArticleFAQ items={faqItems} />
-
-      {/* Navigation */}
-      <ArticleFooterNav />
-    </>
-  )
-}
```
