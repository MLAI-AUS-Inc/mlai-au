# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/what-are-collaboration-tools.tsx
+++ unreviewed-local-draft/app/articles/content/featured/what-are-collaboration-tools.tsx
@@ -1,377 +1,118 @@
-import type { ReactNode } from 'react'
-import { Home } from 'lucide-react'
-import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
+import { Home } from "lucide-react";
+import { Link } from "react-router";
+import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
+import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
+import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
+import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";
+import ArticleTocPlaceholder from "~/components/articles/ArticleTocPlaceholder";
+import { COLLABORATION_HANDOFF_DOWNLOAD, HANDOFF_FIELDS, HANDOFF_WORKSHEET, HANDOFF_PLANNING_OPTIONS, HANDOFF_ACCEPTANCE_CASES, HANDOFF_CAPACITY_MINUTES, handoffSetupCost } from "~/lib/collaboration-handoff";
+export { HANDOFF_WORKSHEET } from "~/lib/collaboration-handoff";

-import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
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
+export const SLUG = "what-are-collaboration-tools";
+// Preserve the canonical registry date rather than the old conflicting body date.
+export const DATE_PUBLISHED = "2025-12-13";
+export const DATE_MODIFIED = "2026-09-11";
+const TITLE = "Collaboration tools for small businesses: fix the handoff first";
+export const DESCRIPTION = "Map a missed handoff, compare process fixes with software changes, and test whether a collaboration workflow reduces rework before paying for an AI integration.";
+const PATH = "/articles/" + CATEGORY + "/" + SLUG;
+const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-0c642a28-660d-4dee-b077-ee0c5181aa24.jpg?alt=media&token=188443b2-3bf5-4caa-b39f-68e465028cf4";
+export const articleMeta = { title: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO, imageAlt: "Illustration of a team discussing a shared workflow" };
+export const summaryHighlights = {
+  heading: "Choose for the work, not the feature list",
+  intro: "For an owner or operations manager whose team loses time chasing updates, re-entering information or correcting missed handoffs.",
+  items: [
+    { label: "What are collaboration tools?", description: "Software for sharing messages, documents, decisions and responsibility for work. Agree where the current state is recorded and who owns the next step." },
+    { label: "Do you need another app?", description: "Not necessarily. Test whether clearer ownership, a shared template or configuration of an existing tool solves the problem first." },
+    { label: "Where could AI help?", description: "A bounded suggestion or draft may help with unstructured input. It must not silently turn a summary into an approved decision or customer commitment." },
+  ],
+};
+export const faqItems = [
+  { question: "How do communication and collaboration tools differ?", answer: "Communication tools carry messages and conversations. Collaboration also involves shared work: its current version, owner, status and decisions. One product can support both, but posting a message is not the same as the next person accepting responsibility." },
+  { question: "Which collaboration tool should a small business choose?", answer: "Match the missing behaviour: messaging for discussion, shared documents for editable records, task tracking for ownership, or an integration for transferring information. Check existing tools first and demonstrate the behaviour on the subscription you would actually use." },
+  { question: "Should I add AI to a handoff workflow?", answer: "Only if a defined task benefits from it and you can test the result. A fixed rule is easier to inspect when inputs are structured and the decision is stable. Keep AI suggestions separate from approved records and require review before consequential actions." },
+  { question: "Does time saved mean higher margins?", answer: "Not automatically. Released staff time is capacity. A margin claim needs evidence of additional contribution or spending actually avoided, after setup, subscriptions, review, maintenance and rework. Do not count the same time as both cash savings and extra revenue." },
+];

-/** ========== INPUTS (replace all placeholders) ========== */
-export const useCustomHeader = true
+export default function ArticleContent() {
+  return <div>
+    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: TITLE, current: true }]} title={TITLE} titleHighlight="fix the handoff first" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
+    <div data-cf-article-body className="mx-auto max-w-4xl px-4 py-8 prose prose-lg prose-indigo">
+      <p><strong>Collaboration tools help people share information and coordinate work. They cannot decide who is responsible for a handoff your business has never defined.</strong> If staff keep asking “which version?”, “who owns this?” or “has the customer approved it?”, start with one recurring breakdown before adding another application.</p>
+      <p>This guide is for small-business owners and operations managers, particularly Australian teams considering implementation help. It offers a worksheet and test plan, not a product ranking or a reported MLAI customer result. The workflow method is editorial guidance; the Australian security and privacy sources below address separate controls.</p>
+      <p><strong>11 September update:</strong> added a completed fictional handoff, comparable planning-cost entries and a downloadable record. The trial and acceptance tests are not performed; no client outcome is implied.</p>
+      <ArticleTocPlaceholder />

-const TOPIC = 'What are collaboration tools'
-export const CATEGORY = 'featured'
-export const SLUG = 'what-are-collaboration-tools'
-const AUTHOR_PROFILE = getDefaultArticleAuthorDetails()
-const AUTHOR = AUTHOR_PROFILE.name ?? 'Dr Sam Donegan'
-const AUTHOR_ROLE = AUTHOR_PROFILE.role ?? AUTHOR_PROFILE.credentials ?? 'Founder'
-const AUTHOR_BIO = AUTHOR_PROFILE.bio ?? ''
-const AUTHOR_AVATAR =
-  AUTHOR_PROFILE.avatarUrl ??
-  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80'
-export const DATE_PUBLISHED = '2026-01-26'
-export const DATE_MODIFIED = '2026-01-26'
-export const DESCRIPTION = 'A plain-English guide to collaboration tools: definition, types, benefits, examples, and how to choose for Australian teams.'
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-0c642a28-660d-4dee-b077-ee0c5181aa24.jpg?alt=media&token=188443b2-3bf5-4caa-b39f-68e465028cf4"
-const HERO_IMAGE_ALT = 'Australian team collaborating with laptops, sticky notes, and a video call on screen'
-export const FEATURED_FOCUS = 'ai' // 'startups' | 'ai' | 'product' | 'funding'
+      <h2 id="match-tool" className="scroll-mt-28">1. Identify the missing behaviour</h2>
+      <p>On narrow screens, scroll tables sideways. Keyboard users can focus each labelled table region and use the arrow keys.</p>
+      <div role="region" aria-label="Collaboration needs comparison" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[38rem]">
+        <caption>Collaboration needs and what to demonstrate before buying</caption>
+        <thead><tr><th>Problem</th><th>Tool category</th><th>Proof to request</th></tr></thead>
+        <tbody>
+          <tr><td>Questions are scattered across private messages.</td><td>Shared communication space</td><td>A colleague can find the decision and linked work record without asking the author.</td></tr>
+          <tr><td>Several document copies disagree.</td><td>Shared document or knowledge store</td><td>The team can identify the approved version, see changes and restore an earlier version.</td></tr>
+          <tr><td>A request has no next owner.</td><td>Task or case tracking</td><td>Ownership, required information and receiver acceptance are visible, including when someone is absent.</td></tr>
+          <tr><td>Staff re-enter approved details.</td><td>Integration or fixed automation</td><td>The transfer uses a unique ID, handles duplicates and exposes failures without losing the request.</td></tr>
+        </tbody>
+      </table></div>
+      <p>These are selection requirements, not claims that every product includes them. A suite may cover several categories. Demonstrate the actual subscription, permissions and configuration; a demo of another plan does not establish that your team can use the same controls.</p>

-/** ===== FAQ ===== */
-interface FAQ {
-  id: number
-  question: string
-  answer: ReactNode
+      <h2 id="handoff-example" className="scroll-mt-28">2. Define one handoff before automating it</h2>
+      <p><strong>Fictional example:</strong> a service business passes an accepted quote from sales to scheduling. Sales posts a chat message, scheduling copies details into a board and someone later discovers the approved scope is missing. No customer data or measured client outcome is represented here.</p>
+      <p>A better specification is: the approved quote remains the source of truth; its ID links to a scheduling task; sales confirms required fields; a named scheduler accepts the handoff. A chat alert points to that task. It does not approve the quote, change the price or commit a service date.</p>
+      <ul>
+        <li><strong>Ready:</strong> approved scope and a usable source-record link exist. Missing approval keeps the request in an exception queue.</li>
+        <li><strong>Received:</strong> the scheduler explicitly accepts ownership. A notification being delivered or read is insufficient.</li>
+        <li><strong>Changed:</strong> a scope revision after acceptance returns to a named reviewer; it must not silently overwrite scheduled work.</li>
+        <li><strong>Absent:</strong> the backup owner can see unresolved requests without gaining unrelated customer access.</li>
+      </ul>
+      <p>Agree these rules with people doing both sides of the work. If they disagree about what “approved” means, an integration will reproduce the disagreement faster.</p>
+
+      <h2 id="copy-workflow" className="scroll-mt-28">3. Use a completed record, then write your own</h2>
+      <p><a href={COLLABORATION_HANDOFF_DOWNLOAD} download="collaboration-handoff.txt">Download the handoff record and selection worksheet</a>. It contains the completed example, all three options, a blank worksheet and six acceptance cases. It is editable plain text; no signup is required.</p>
+      <details><summary>Completed fictional handoff: quote Q-104 to scheduling</summary><dl>{HANDOFF_FIELDS.map(field => <div key={field.label}><dt className="font-semibold">{field.label}</dt><dd>{field.example}</dd></div>)}</dl></details>
+      <p>Use one real workflow but remove customer names, credentials and confidential commercial detail from anything shared externally. Write “unknown” where investigation is needed. This is a scoping aid, not a contract or compliance certification.</p>
+      <details><summary>Copy the blank worksheet</summary><pre className="whitespace-pre-wrap break-words"><code>{HANDOFF_WORKSHEET}</code></pre></details>
+
+      <h2 id="configure-or-build" className="scroll-mt-28">4. Compare the three paths</h2>
+      <p><strong>Fix the process first</strong> when the missing piece is an owner, acceptance rule or document convention. Try a shared template and manual queue. Record what still fails; do not add AI simply to make the change appear more advanced.</p>
+      <p><strong>Configure existing software</strong> when it can represent the record, ownership, permissions and exception path you need. Include setup and training effort in the comparison, along with any subscription upgrade. Assign someone to maintain the configuration.</p>
+      <p><strong>Consider a scoped build</strong> when tested requirements remain missing—for example, transferring approved records between systems while enforcing access and duplicate handling. Ask for a demonstration, maintenance owner and exit/export path.</p>
+      <p>An AI component might propose a summary of an unstructured enquiry for staff review. In this example it must not turn that summary into an approved quote or send a customer commitment. Require the builder to enforce permissions in the surrounding software, not just a model instruction. Keep the source visible so reviewers can check omissions.</p>
+      <p><strong>Fictional planning comparison—not supplier prices:</strong> the entries below illustrate what to collect on a consistent cost/tax basis. A$50/hour values internal setup capacity; it is not an avoidable payroll expense. Replace every estimate with your own evidence. Unknown build costs prevent a complete financial ranking.</p>
+      <div role="region" aria-label="Handoff options cost and control comparison" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[48rem]"><caption>Same quote-to-scheduling problem; no option is approved for live use</caption><thead><tr><th>Path</th><th>Setup and cash assumptions</th><th>Review and maintenance</th><th>Access, recovery and exit</th><th>Decision</th></tr></thead><tbody>
+        {HANDOFF_PLANNING_OPTIONS.map(option => <tr key={option.name}><th scope="row">{option.name}</th><td>{option.setupHours === null ? "Unknown — obtain a quote" : <>{option.setupHours} internal hours + A${option.setupCash} external setup; A${option.monthlyCash}/month incremental cash. Setup economic value: A${handoffSetupCost(option)}.</>}<p>{option.costLimit}</p></td><td>{option.upkeep}</td><td>{option.access}</td><td>{option.decision}</td></tr>)}
+      </tbody></table></div>
+      <p><strong>Worked decision: prepare a process-only trial.</strong> The example's first gap is unclear acceptance, not missing AI. Agree the roles and demonstrate access/recovery before starting. No trial has run, no purchase is authorised and no savings have been measured. Reconsider configuration or a build only when the manual trial exposes a specific unmet requirement.</p>
+      <ArticleConversionCTA articleSlug={CATEGORY + "/" + SLUG} config={BASE_ARTICLE_SEO_CONFIG[PATH].conversion!} events={[]} placement="article-inline" />
+      <p>If implementation is needed, expand the worksheet into a <Link to="/articles/featured/how-to-build-ai-for-real-business-problems">scoped business-build brief</Link>. Your downloaded record is not automatically attached; share only a permitted summary. An enquiry is not a promise of acceptance, a free discovery engagement or a guaranteed saving. International client availability should be <Link to="/contact">confirmed with MLAI</Link> before planning delivery.</p>
+
+      <h2 id="acceptance-tests" className="scroll-mt-28">5. Test exceptions, not just a successful transfer</h2>
+      <p>Use synthetic records before granting live customer access. These cases start the fictional sales-to-scheduling test plan; they are not sufficient assurance for every business. Record input, expected result, actual result, version and reviewer for each.</p>
+      <p><strong>All six cases below are NOT RUN.</strong> A specified result is not evidence that a product enforces it. In a process-only trial, test the equivalent manual failure and recovery; do not mark a nonexistent connector test as passed.</p>
+      <div role="region" aria-label="Handoff acceptance plan" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[38rem]">
+        <thead><tr><th>Case</th><th>Expected behaviour</th><th>Evidence</th></tr></thead>
+        <tbody>
+          {HANDOFF_ACCEPTANCE_CASES.map(row => <tr key={row.id}><td>{row.id}: {row.case}</td><td>{row.expected}</td><td>{row.evidence}</td></tr>)}
+        </tbody>
+      </table></div>
+      <p>Stop the pilot if it loses a request, exposes information to an unauthorised account or makes an unapproved commitment. Agree other acceptable error thresholds before testing, with consequences and unresolved risks documented by the accountable owner.</p>
+
+      <h2 id="measure-value" className="scroll-mt-28">6. Measure completed work and rework—not message counts</h2>
+      <p>Before changing the workflow, record case count, active handling time, elapsed handoff time, missed requests and rework in a representative period. Repeat for a comparable pilot period, including exceptions, review and maintenance. Note workload or case-difficulty changes; before/after comparisons alone do not establish causation.</p>
+      <p><strong>Arithmetic example, not a forecast:</strong> 40 comparable handoffs taking 12 active minutes each use 480 minutes. At 7 minutes each, they use 280 minutes. Subtract 80 extra minutes of review and maintenance from the 200-minute difference: the potential net release is {HANDOFF_CAPACITY_MINUTES} minutes, or two hours. Case review and rework are already inside the per-case figures; any additional rework outside that assumption reduces the result further. These are unmeasured planning inputs for the process-only example, not a comparison of implemented products.</p>
+      <p>Those two hours are capacity, not automatically cash savings. Add subscriptions and setup effort; identify spending actually avoided or extra work generating contribution. Do not count both against the same hours. Use the <Link to="/articles/featured/how-small-business-owners-can-get-started-with-ai-2026">AI pilot economics worksheet</Link> to separate capacity from avoidable cash costs.</p>
+      <p>Continue only if evidence meets agreed operational and cost criteria. Otherwise change scope, return to the manual process or stop. More messages, logins or AI summaries do not prove a better margin.</p>
+
+      <h2 id="access-and-privacy" className="scroll-mt-28">7. Check access and data responsibilities</h2>
+      <p>The Australian Cyber Security Centre’s <a href="https://www.cyber.gov.au/business-government/protecting-devices-systems/cloud-computing/cloud-shared-responsibility-model-guidance-for-individuals-and-small-and-medium-businesses">cloud shared-responsibility guidance for small and medium businesses</a> explains that a cloud provider does not remove your own responsibilities. It includes controlling data access, strong authentication and incident readiness.</p>
+      <p>Have the responsible administrator demonstrate guest access, account removal, connected-app permissions, export and recovery. Confirm who receives alerts and can disable the integration. These are review questions, not certification that a configuration is compliant.</p>
+      <p>If AI handles personal information, consult the OAIC’s <a href="https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products">guidance on commercially available AI products</a>. It recommends product due diligence and human oversight, and advises against entering personal information—especially sensitive information—into publicly available generative AI tools. Do not treat a paid plan or Australian hosting label as a complete privacy assessment. Obtain advice appropriate to your business and jurisdiction.</p>
+      <p><small>Source pages checked 11 September 2026. Codex assisted the completed record, comparison, arithmetic and local checks. These are editorial aids, not regulator-endorsed instructions or a measured customer case study. Independent sender/receiver, delivery and appropriate access/privacy review remain outstanding.</small></p>
+      <h2 id="next-step" className="scroll-mt-28">Your next step</h2>
+      <p>Ask the sender and receiver to complete one worksheet together. Try the simplest change meeting its rules, then keep exception and cost evidence. If you need a builder, share the non-confidential workflow and tests—not just a request for “an AI agent”.</p>
+      <ArticleFAQ items={faqItems} />
+    </div>
+  </div>;
 }
-
-export const faqItems: FAQ[] = [
-  {
-    id: 1,
-    question: 'What is a collaboration tool?',
-    answer: (
-      <>A collaboration tool is software that helps people work together by making communication, content, and coordination visible in one place. Common examples include chat (e.g. channels/DMs), shared documents, video meetings, task boards, and whiteboards. Tools can be real-time (synchronous) or asynchronous.</>
-    ),
-  },
-  {
-    id: 2,
-    question: 'How are collaboration tools different from communication tools?',
-    answer: (
-      <>
-        Communication tools focus on messages (chat, email, video). Collaboration tools include communication plus shared workspaces where files, tasks, notes, and decisions live. Many platforms combine both (e.g. Teams, Slack with apps, Google Workspace).
-      </>
-    ),
-  },
-  {
-    id: 3,
-    question: 'What types of collaboration tools are there?',
-    answer: (
-      <>
-        <ul className="list-disc pl-5">
-          <li>Communication: chat, channels, video conferencing</li>
-          <li>Content/knowledge: docs, sheets, wikis, shared drives</li>
-          <li>Coordination: task boards, roadmaps, issue trackers</li>
-          <li>Whiteboarding/ideation: digital canvases</li>
-          <li>Workflow/integration: automation and app connectors</li>
-        </ul>
-      </>
-    ),
-  },
-  {
-    id: 4,
-    question: 'Which collaboration tools are commonly used?',
-    answer: (
-      <>Popular choices include Microsoft Teams and 365, Slack, Google Workspace, Atlassian Confluence/Jira, Trello, Asana, Miro, and Zoom. Choose based on your workflows, existing licences, and security needs rather than brand alone.</>
-    ),
-  },
-  {
-    id: 5,
-    question: 'How do I choose the right tool for my team?',
-    answer: (
-      <>
-        Start with the work: document your must-do workflows, decide on non-negotiables (SSO, retention, data residency), shortlist options that integrate with your stack, then pilot with a small team and measure adoption (messages, comments, tasks completed, meeting friction).
-      </>
-    ),
-  },
-  {
-    id: 6,
-    question: 'Are collaboration tools secure and compliant in Australia?',
-    answer: (
-      <>
-        Look for SSO/MFA, encryption at rest/in transit, audit logs, retention and export, data residency options, and role-based access. If you’re in the public sector, check Digital NSW and Australian Government guidance for tool selection and record-keeping.
-      </>
-    ),
-  },
-]
-
-/** ===== Summary Highlights (used by ArticleHeroHeader) ===== */
-export const summaryHighlights = {
-  heading: `Key facts: ${TOPIC}`,
-  intro: "Choose tools around the work people need to coordinate: conversations, shared documents, decisions and handovers. Agree how the team will use them before adding another app.",
-  items: [
-    { label: 'What is a collaboration tool?', description: 'Software that helps people work together by combining communication, shared content, and task coordination (real-time or async).' },
-    { label: 'What types exist?', description: 'Communication (chat/video), content/knowledge (docs/wikis), coordination (tasks/issues), whiteboards, and integrations/automation.' },
-    { label: 'How do I choose?', description: 'Start from workflows, require SSO/security, shortlist options that fit your suite, pilot with a small team, and measure adoption.' },
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
-    href: 'https://www.digital.nsw.gov.au/delivery/digital-service-toolkit/resources/digital-collaboration-tools',
-    title: 'Digital collaboration tools',
-    publisher: 'Digital NSW',
-    description: 'Government guidance on selecting and using collaboration tools, including security and record-keeping considerations.',
-    category: 'guide',
-  },
-  {
-    id: 2,
-    href: 'https://www.techtarget.com/searchunifiedcommunications/definition/team-collaboration-tools',
-    title: 'What are collaboration tools? Definition, types and benefits',
-    publisher: 'TechTarget',
-    description: 'Overview of collaboration tools, capabilities, and business benefits.',
-    category: 'analysis',
-  },
-  {
-    id: 3,
-    href: 'https://en.wikipedia.org/wiki/Collaboration_tool',
-    title: 'Collaboration tool',
-    publisher: 'Wikipedia',
-    description: 'General reference on categories, history, and examples of collaboration software.',
-    category: 'guide',
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
-          <strong>{TOPIC}</strong> — In hybrid and distributed teams, work spreads across chat, docs, meetings, and task boards. Collaboration tools bring these threads together so people can communicate, co‑author content, and coordinate delivery without losing context.
-        </p>
-
-        {/* Hero Image - Use ArticleImageBlock, not raw img */}
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          caption="Modern teams collaborate across chat, docs, whiteboards and meetings."
-          width={1600}
-          height={1067}
-        />
-
-        {/* WHO IS THIS FOR - Use AudienceGrid */}
-        <AudienceGrid
-          heading="Who is this guide for?"
-          cards={[
-            {
-              title: 'Founders & Teams',
-              description: 'Choose tools that reduce friction and make work visible.',
-              icon: <RocketLaunchIcon className="h-6 w-6" />,
-              variant: 'orange',
-            },
-            {
-              title: 'Students & Switchers',
-              description: 'Understand the landscape and build a job‑ready toolkit.',
-              icon: <AcademicCapIcon className="h-6 w-6" />,
-              variant: 'purple',
-            },
-            {
-              title: 'Community Builders',
-              description: 'Run events and study groups with shared workspaces.',
-              icon: <UsersIcon className="h-6 w-6" />,
-              variant: 'yellow',
-            },
-          ]}
-        />
-
-        {/* RESEARCH-DERIVED SECTIONS */}
-        <h2>What counts as a collaboration tool? (Definition)</h2>
-        <p>
-          At its core, a collaboration tool is software that helps people work together on shared outcomes. Competitor sources define this as a blend of communication (chat/meetings), shared content (docs/wikis/files), and coordination (tasks/boards/calendars). Tools can be synchronous (live meetings, co‑editing) or asynchronous (comments, threads, issues) and often integrate with your wider stack.
-        </p>
-
-        <QuoteBlock title="Key insight" variant="purple">
-          Successful collaboration tools reduce context switching. They keep conversation, content, and coordination close together so decisions are easy to find later.
-        </QuoteBlock>
-
-        <h2>Types of collaboration tools (with examples)</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f4a08f56-b1e5-4c59-acba-84c06fe7165c.jpg?alt=media&token=e7e0a94c-4746-4872-8bd9-02bfadf4b52d" alt="Diverse team collaborating in a vibrant 90s tech startup setting, surrounded by laptops and creative brainstorming." className="w-full rounded-lg my-8" />
-
-        <p>Top references group tools into a few practical categories. Most teams use a mix:</p>
-        <h3>1) Communication and messaging</h3>
-        <p>Channels and DMs for quick questions and updates; video for live discussion.</p>
-        <ul className="list-disc pl-5">
-          <li>Chat: Slack, Microsoft Teams</li>
-          <li>Meetings: Zoom, Google Meet, Teams Meetings</li>
-        </ul>
-
-        <h3>2) Content and knowledge</h3>
-        <p>Shared documents, sheets, slides, and wikis capture decisions and how‑tos.</p>
-        <ul className="list-disc pl-5">
-          <li>Docs/Drive: Google Workspace, Microsoft 365</li>
-          <li>Wikis/notes: Confluence, Notion</li>
-        </ul>
-
-        <h3>3) Coordination and delivery</h3>
-        <p>Task boards and issue trackers make ownership and progress visible.</p>
-        <ul className="list-disc pl-5">
-          <li>Boards: Trello, Asana</li>
-          <li>Issues/roadmaps: Jira</li>
-        </ul>
-
-        <h3>4) Whiteboarding and ideation</h3>
-        <p>Visual canvases for workshops, retros, and early product thinking.</p>
-        <ul className="list-disc pl-5">
-          <li>Miro, FigJam</li>
-        </ul>
-
-        <h3>5) Workflow and integration</h3>
-        <p>Automations and app connectors reduce copy‑paste and duplicate work.</p>
-        <ul className="list-disc pl-5">
-          <li>Built‑in connectors (Teams/Slack apps), Zapier/Make</li>
-        </ul>
-
-        <h2>Benefits and trade‑offs</h2>
-<img src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-8098eb17-f1af-4ca1-bf97-62c44cdc79c3.jpg?alt=media&token=9ff0bfe4-35b9-4a59-ada8-fcc35bc3ec49" alt="Group of diverse individuals collaborating in a vibrant tech workspace, capturing 90s film nostalgia." className="w-full rounded-lg my-8" />
-
-        <p>Well‑chosen tools improve communication, visibility, and delivery speed. References emphasise these gains, with some caveats:</p>
-        <ul className="list-disc pl-5">
-          <li><strong>Clarity:</strong> Decisions and files live with the conversation.</li>
-          <li><strong>Speed:</strong> Real‑time co‑editing and tighter feedback loops.</li>
-          <li><strong>Inclusion:</strong> Async threads help teams across time zones.</li>
-          <li><strong>Trade‑offs:</strong> Notification overload, tool sprawl, and weak governance can erode value. Start simple and set norms.</li>
-        </ul>
-
-        <h2>Examples you’ll see in Australian teams</h2>
-        <p>
-          Many local organisations use Microsoft 365/Teams or Google Workspace as a base, then add specialist tools for boards (Trello/Asana), issues (Jira), workshops (Miro), and meetings (Zoom/Meet). Pick the minimum set that fits your workflows and compliance needs.
-        </p>
-        <ul className="list-disc pl-5">
-          <li>Suites: Microsoft 365 + Teams, Google Workspace</li>
-          <li>Chat: Slack (with app integrations)</li>
-          <li>Boards/Tasks: Trello, Asana</li>
-          <li>Issues/Roadmaps: Jira</li>
-          <li>Whiteboards: Miro, FigJam</li>
-          <li>Meetings: Zoom, Google Meet, Teams</li>
-        </ul>
-
-
-
-        <h2>How to choose a collaboration tool (short framework)</h2>
-        <p>Use a lightweight, evidence‑based selection process before you commit org‑wide.</p>
-        <ArticleStepList
-          title="Step‑by‑step actions"
-          steps={[
-            { label: 'Define top 3 workflows (e.g. triage requests, run stand‑ups, ship docs).' },
-            { label: 'List must‑haves (SSO/MFA, retention/export, data residency, cost caps).' },
-            { label: 'Shortlist 2–3 options that integrate with your existing suite (365/Workspace).' },
-            { label: 'Pilot with a small team for 2–3 weeks; track adoption and friction points.' },
-            { label: 'Decide, establish conventions (channels, naming, templates), and roll out.' },
-          ]}
-          accent="teal"
-        />
-
-        <QuoteBlock title="Pro tip" variant="orange">
-          Measure behaviour, not opinions: messages posted, comments resolved, tasks completed, meeting time saved. Adoption data beats feature lists.
-        </QuoteBlock>
-
-        <MLAITemplateResourceCTA />
-
-        <h2>Security, privacy, and record‑keeping (AU context)</h2>
-        <p>
-          Australian guidance (e.g. Digital NSW) recommends balancing usability with governance. Before rollout, confirm how the tool handles authentication, data, and records.
-        </p>
-        <ul className="list-disc pl-5">
-          <li><strong>Access:</strong> SSO/MFA, role‑based permissions, guest access controls.</li>
-          <li><strong>Data:</strong> Encryption at rest/in transit, retention and export, data residency options.</li>
-          <li><strong>Records:</strong> Decide what must be captured for compliance, then set channels/labels and export policies accordingly.</li>
-          <li><strong>Audit:</strong> Logs, admin reporting, and incident response processes.</li>
-        </ul>
-
-        <h2>Implementation: onboarding that sticks</h2>
-        <p>Tools do not replace team agreements. Pair the platform with simple conventions.</p>
-        <ul className="list-disc pl-5">
-          <li>Agree channel names and when to use chat vs. docs vs. issues.</li>
-          <li>Use templates for recurring rituals (stand‑ups, retros, handovers).</li>
-          <li>Trim notifications; encourage threads over DMs for findability.</li>
-          <li>Review usage monthly and archive stale spaces to avoid sprawl.</li>
-        </ul>
-
-        <h2>Closing: start small, learn fast</h2>
-        <p>
-          Pick one workflow, run a short pilot, and measure adoption. Keep what helps, remove what distracts, and document the convention so new teammates succeed on day one.
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
-        title={`Keen to connect with Australia’s AI community?`}
-        body="MLAI is a not‑for‑profit community empowering practitioners and learners. Reach out and we’ll point you to relevant events and resources."
-        buttonText="Contact MLAI"
-        buttonHref="https://mlai.au/contact"
-        note="Friendly, community‑first support."
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
