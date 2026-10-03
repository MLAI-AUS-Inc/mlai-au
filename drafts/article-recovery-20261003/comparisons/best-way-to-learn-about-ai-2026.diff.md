# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/best-way-to-learn-about-ai-2026.tsx
+++ unreviewed-local-draft/app/articles/content/featured/best-way-to-learn-about-ai-2026.tsx
@@ -1,252 +1,107 @@
-import type { ReactNode } from 'react'
-import { Home } from 'lucide-react'
+import { Home } from "lucide-react";
+import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
+import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
+import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";
+import ArticleTocPlaceholder from "~/components/articles/ArticleTocPlaceholder";
+import type { ReactNode } from "react";
+import changeRecord from "../../../../public/downloads/ai-builder-lab/change-record.json";

-import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
-import AuthorBio from '../../../components/AuthorBio'
-import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
-import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
-import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
-import { QuoteBlock } from '../../../components/articles/QuoteBlock'
-import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
-import { AudienceGrid } from '../../../components/articles/AudienceGrid'
-import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
-
-/** ========== INPUTS (replace all placeholders) ========== */
-const TOPIC = 'Best way to learn about AI in 2026'
-const CATEGORY = 'featured'
-const SLUG = 'best-way-to-learn-about-ai-2026'
-const AUTHOR = 'Dr Sam Donegan'
-const AUTHOR_ROLE = 'Medical Doctor, AI Startup Founder & Lead Editor'
-const AUTHOR_BIO = 'Sam leads the MLAI editorial team, combining deep research in machine learning with practical guidance for Australian teams adopting AI responsibly.'
-const AUTHOR_AVATAR = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1732146096971.jpeg?alt=media&token=8cbc3057-565b-48d0-be4f-e786332a6376'
-const DATE_PUBLISHED = '2025-01-15T00:00:00.000Z'
-const DATE_MODIFIED = '2025-01-15T00:00:00.000Z'
-const DESCRIPTION = 'A 2026-ready roadmap for Australians to learn AI: fundamentals, hands-on projects, ethics, and career moves tailored to local pathways.'
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1d8313de-82ba-4ddc-a776-52cee7f2fa1b.jpg?alt=media&token=e14f4ba6-f385-40ec-8453-017f0d7efffa"
-const HERO_IMAGE_ALT = 'Person studying AI concepts on a laptop with diagrams on screen'
-const FEATURED_FOCUS = 'ai'
-
-/** ===== FAQ ===== */
-interface FAQ {
-  id: number
-  question: string
-  answer: ReactNode
+export const useCustomHeader = true;
+export const SLUG = "featured/best-way-to-learn-about-ai-2026";
+const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1d8313de-82ba-4ddc-a776-52cee7f2fa1b.jpg?alt=media&token=e14f4ba6-f385-40ec-8453-017f0d7efffa";
+export const DOWNLOAD_FILES = ["triage.mjs", "triage.test.mjs", "change-review.mjs", "change-review.test.mjs", "change-record.json", "PORTFOLIO.md", "README.md"];
+function ScrollTable({ label, children }: { label: string; children: ReactNode }) {
+  return <div role="region" aria-label={label} tabIndex={0} className="my-6 overflow-x-auto rounded border border-slate-300 px-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"><table className="min-w-[640px]">{children}</table></div>;
 }
-
-export const faqItems: FAQ[] = [
-  { id: 1, question: 'What is the quickest way to start learning AI in Australia?', answer: 'Begin with a short Python refresher, then complete an introductory machine learning course (e.g., Fast.ai or CS50 AI) while following along with local meetups like Machine Learning Sydney to stay motivated.' },
-  { id: 2, question: 'Do I need a maths degree to work in AI?', answer: 'No. You need practical comfort with linear algebra basics, probability, and calculus for gradient intuition. Many Australian employers accept candidates who can ship working models, explain trade-offs, and document risks, even without formal maths degrees.' },
-  { id: 3, question: 'Which Australian credentials are recognised by employers?', answer: 'Micro-credentials from reputable universities (UNSW, ANU, UQ), industry certs (AWS Machine Learning Specialty, Google Professional ML Engineer), and portfolio evidence (GitHub, Kaggle, papers) are commonly accepted.' },
-  { id: 4, question: 'How do I learn AI responsibly under Australian privacy laws?', answer: 'Follow the OAIC Australian Privacy Principles (APPs): minimise personal data, get consent, avoid using production data in public model training, and document data handling. Use synthetic or de-identified datasets when sharing projects.' },
-  { id: 5, question: 'What tools should beginners prioritise in 2026?', answer: 'Python, NumPy, Pandas, scikit-learn, PyTorch, and a hosted notebook (Colab, Paperspace). Add prompt engineering and RAG patterns with vector databases (e.g., Pinecone, pgvector) to stay current with applied LLM work.' },
-  { id: 6, question: 'How long does it take to be job-ready for an AI role?', answer: 'With 8–10 hours per week, a motivated learner can reach junior-level competency in 6–9 months by combining structured courses, 3–4 shipped projects, and active feedback from meetups or online code reviews.' },
-]
-
+export const articleMeta = {
+  title: "How to learn AI by building and testing a small workflow",
+  description: "A practical learning path for aspiring AI-assisted builders: fundamentals, a runnable synthetic triage lab, acceptance tests and honest portfolio evidence.",
+  datePublished: "2025-01-15",
+  dateModified: "2026-09-10",
+  author: "Dr Sam Donegan",
+  image: HERO,
+  imageAlt: "People gathered around a laptop, with one person wearing headphones around their neck",
+};
 export const summaryHighlights = {
-  heading: `Key facts: ${TOPIC}`,
-  intro:
-    "Pick a learning goal, establish the prerequisites and use a small project to check what you can explain and do independently.",
+  heading: "Learn to explain, test and improve what you build",
+  intro: "For early-career Australian and New Zealand learners working towards small AI-assisted software projects.",
   items: [
-    {
-      label: 'What is the fastest way to start learning AI in 2026?',
-      description: 'Begin with Python fundamentals, then take a structured ML/LLM intro course while building weekly mini-projects to publish.',
-    },
-    {
-      label: 'Do I need a degree to get an AI job in Australia?',
-      description: 'Not necessarily; employers accept strong portfolios, micro-credentials, and certifications plus evidence of responsible data use.',
-    },
-    {
-      label: 'Which AI tools should beginners focus on this year?',
-      description: 'Start with Python, scikit-learn, PyTorch, and hosted notebooks; add RAG patterns with vector databases for applied LLM work.',
-    },
+    { label: "Where do I start?", description: "Learn enough programming to read and test a small change. Use one bounded project to discover the next concept you need." },
+    { label: "How do I show progress?", description: "Reproduce a baseline, explain improvements and regressions, and prepare a reviewable record. A generated repository alone is not delivery evidence." },
+    { label: "When should I apply for project work?", description: "When you can explain, test and maintain your work and describe its limits—not after an arbitrary number of study months." },
   ],
-}
-
-export const useCustomHeader = true
+};

 export default function ArticlePage() {
-  const authorDetails = {
-    name: AUTHOR,
-    role: AUTHOR_ROLE,
-    bio: AUTHOR_BIO,
-    avatarUrl: AUTHOR_AVATAR,
-  }
+  return <div>
+    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: articleMeta.title, current: true }]} title={articleMeta.title} titleHighlight="building and testing" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
+    <ArticleTocPlaceholder />
+    <div data-cf-article-body className="prose prose-lg prose-slate max-w-none [&_h2]:scroll-mt-24">
+      <p><strong>A useful way to learn applied AI is to build a small workflow, establish what correct behaviour means and investigate where it fails.</strong> This path is for aspiring builders, not a promise of a job or a universal fastest route. You can use AI coding tools, but you remain responsible for understanding and verifying the result.</p>
+      <p>Separate three milestones: understanding a concept, completing a teaching exercise and delivering a client's system. Passing the exercise below supports the second. It does not establish security, operational readiness or suitability for paid work by itself.</p>

-  const breadcrumbs = [
-    { label: 'Home', href: '/articles', icon: Home },
-    { label: TOPIC, current: true },
-  ]
+      <h2 id="fundamentals">1. Learn the concepts your next test needs</h2>
+      <p>If you cannot yet read a function, trace input to output or understand a failing test, start there. Practise files, data structures, errors and version control before adding a model provider or deployment service. Ask your coding assistant to explain a small diff, then check the explanation against the code.</p>
+      <p>Choose the next resource by your actual skill gap. <a href="https://developers.google.com/machine-learning/crash-course">Google's Machine Learning Crash Course</a> teaches ML concepts with exercises; its <a href="https://developers.google.com/machine-learning/crash-course/prereqs-and-prework">prerequisite guide</a> recommends programming and mathematical foundations, with Python, NumPy and pandas preparation. The <a href="https://docs.python.org/3/tutorial/">official Python tutorial</a> is for programmers learning Python, not people learning programming for the first time. These provider pages were checked on 10 September 2026.</p>
+      <p className="text-sm">On small screens, scroll the tables sideways. Keyboard users can focus a table and use the arrow keys.</p>
+      <ScrollTable label="Choose your next learning step"><thead><tr><th>Your current gap</th><th>Next step</th><th>Evidence to produce</th></tr></thead><tbody>
+        <tr><td>You cannot trace a function or a failing test</td><td>Practise variables, branches, arrays and errors before adding model access; ask for help with one small function</td><td>Explain the starter's input, output and one failure without relying on the assistant's summary</td></tr>
+        <tr><td>You already program, but Python is unfamiliar</td><td>Use the Python tutorial for the language basics you need</td><td>Translate a small input-validation test and explain the result</td></tr>
+        <tr><td>You can program, but training and evaluation are unclear</td><td>Check Google's prerequisites, then work through the relevant ML course modules</td><td>Distinguish training data, development cases and independent evaluation before reporting a score</td></tr>
+      </tbody></ScrollTable>
+      <p>The lab here uses JavaScript so it can run without installing packages or buying model access. Its lessons—input boundaries, evaluation and failure handling—also apply when you later work in Python. Do not try to learn every framework at once.</p>
+      <p><strong>Credential correction:</strong> the earlier guide recommended AWS Machine Learning Specialty as a current path. <a href="https://aws.amazon.com/certification/certified-machine-learning-specialty/">AWS lists 31 March 2026 as the last exam date</a>. Check provider availability before paying for preparation. This guide makes no claim that a particular certificate is accepted by all employers.</p>

-  return (
-    <div>
-      <ArticleHeroHeader
-        breadcrumbs={breadcrumbs}
-        title={TOPIC}
-        headerBgColor="cyan"
-        summary={{
-          heading: summaryHighlights.heading,
-          intro: summaryHighlights.intro,
-          items: summaryHighlights.items,
-        }}
-        heroImage={HERO_IMAGE}
-        heroImageAlt={HERO_IMAGE_ALT}
-      />
+      <h2 id="lab">2. Run the review-only enquiry lab</h2>
+      <p><strong>Project scope:</strong> suggest billing, appointment or other for fictional enquiries. Every output remains marked for human review. There is no send action, customer database, approval interface or model API call. The included predictor is a keyword baseline, not AI; the surrounding code is a small harness for comparing future predictors.</p>
+      <p>Save all seven files together in a new local folder. Inspect the four JavaScript files before running them. The download includes the original baseline, a worked change, its complete result and a filled portfolio example:</p>
+      <ul>{DOWNLOAD_FILES.map(file => <li key={file}><a href={"/downloads/ai-builder-lab/" + file} download>{file}</a></li>)}</ul>
+      <p>With Node.js installed, run the following from that folder. The supplied files were tested locally with Node 25.2.1; no package install or API key is required.</p>
+      <pre className="whitespace-pre-wrap break-words"><code>{'node --test triage.test.mjs change-review.test.mjs\nnode change-review.mjs'}</code></pre>
+      <p>Expect 15 passing code tests. The second command prints the complete review and exits with code 2 for its expected <strong>HOLD</strong> decision. That is not a crashed command: the report preserves a regression and another wrong route. Exit 1 means an execution or input error. Even a fixture with no known failures would need independent review, not automatic release.</p>
+      <p>The baseline reports five correct routes out of six synthetic cases. The sixth mentions an appointment only to say the question is about something else. The rule still routes it to appointments. That known failure is part of the exercise—not a benchmark of customer accuracy.</p>

-      <QuoteBlock
-        variant="purple"
-        title="Quick note"
-        icon={<span className="text-xl">💡</span>}
-        className="my-6"
-      >
-        This guide is part of our broader series on {TOPIC}. Prefer to jump ahead?{' '}
-        <a href="/articles" className="font-semibold text-white underline-offset-4 hover:underline">
-          Browse related articles →
-        </a>
-      </QuoteBlock>
+      <h2 id="checks">3. Understand what the tests do and do not prove</h2>
+      <ScrollTable label="Starter acceptance boundaries">
+        <caption>Acceptance evidence in the downloadable starter</caption>
+        <thead><tr><th>Check</th><th>Expected behaviour</th><th>Limit</th></tr></thead>
+        <tbody>
+          <tr><td>Clear and mixed enquiries</td><td>Route clear cases; mixed categories go to other.</td><td>Six fictional cases do not represent real messages.</td></tr>
+          <tr><td>Blank or oversized input</td><td>Reject before prediction.</td><td>This is not comprehensive input-security testing.</td></tr>
+          <tr><td>Malformed output or an extra send field</td><td>Reject the prediction and keep human review required.</td><td>A category can pass validation and still be wrong.</td></tr>
+          <tr><td>Predictor throws an error</td><td>Record a rejected prediction without authorising action.</td><td>A live adapter would also need deadlines and cost controls.</td></tr>
+          <tr><td>Evaluation answer leakage</td><td>Pass only input text to the predictor, not the expected label.</td><td>The starter cases are public, so create separate unseen cases for your experiment.</td></tr>
+        </tbody>
+      </ScrollTable>
+      <p>A test suite can pass while documenting known wrong model behaviour. Read both the assertions and the evaluation report. If you remove a difficult case to improve the score, you have weakened the evidence rather than improved the system.</p>

-      <ArticleTocPlaceholder className="mb-10" />
+      <h2 id="extend">4. Review a change, not only its headline score</h2>
+      <p>The worked candidate splits a message at punctuation, removes whole clauses containing “not about”, then applies the unchanged keyword baseline. This repairs the original opening-hours case—but it can also throw away a real request. Both algorithms are rules, not learned models. An AI assistant helping write them does not change that distinction.</p>
+      <p>The following numbers come directly from <a href="/downloads/ai-builder-lab/change-record.json" download>the complete change record</a>, version <code>{changeRecord.version}</code>, executed locally with Node 25.2.1 on 10 September 2026. It includes the exact outputs and source hashes. The six original cases and eight added contrast cases were all visible during authoring; neither set is an independent held-out benchmark.</p>
+      <ScrollTable label="Learning change comparison"><thead><tr><th>Visible case set</th><th>Original baseline</th><th>Changed rules</th><th>What the count misses</th></tr></thead><tbody>
+        <tr><td>Original development set</td><td>{changeRecord.development.baselineCorrect}/{changeRecord.development.total}</td><td>{changeRecord.development.candidateCorrect}/{changeRecord.development.total}</td><td>Repairs the one motivating failure</td></tr>
+        <tr><td>Added contrast set</td><td>{changeRecord.contrast.baselineCorrect}/{changeRecord.contrast.total}</td><td>{changeRecord.contrast.candidateCorrect}/{changeRecord.contrast.total}</td><td>Three improvements, one regression and one still-wrong route</td></tr>
+        <tr><td>Combined</td><td>{changeRecord.summary.baselineCorrect}/{changeRecord.summary.total}</td><td>{changeRecord.summary.candidateCorrect}/{changeRecord.summary.total}</td><td>Decision: {changeRecord.decision}; not approval to replace a real workflow</td></tr>
+      </tbody></ScrollTable>
+      <ScrollTable label="Learning change failure log"><thead><tr><th>Case and message</th><th>Expected / candidate</th><th>Why it remains open</th></tr></thead><tbody>
+        {changeRecord.failureLog.map(row => <tr key={row.id}><td>{row.id}: {row.text}</td><td>{row.expected} / {row.actual}</td><td>{row.id === "c3" ? "Regression: the baseline was right, but dropping the clause loses the request to change the date" : "Still wrong: neither keyword list recognises the reschedule paraphrase"}</td></tr>)}
+      </tbody></ScrollTable>
+      <p>A higher total score did not make this change uniformly better. Case c3 was correct before and wrong afterwards. The complete record preserves that regression, the c5 failure and every other row; do not delete difficult cases or change their expected answer just to get a green result. No latency, development-time saving or total operating cost was measured.</p>
+      <p>For your own change, ask an AI coding tool for one narrow proposal. Record the proposal, your diff and what you rejected. Add cases that challenge it as well as cases that must keep their old behaviour. Once you inspect and tune against a case, treat it as development data. For an independent evaluation, ask another person to prepare permitted cases and freeze the candidate before comparison. That review has not happened for this teaching example.</p>

-      <AudienceGrid
-        heading="Read this if you are:"
-        cards={[
-          {
-            title: 'Founders & Teams',
-            description: 'For leaders validating ideas, seeking funding, or managing teams.',
-            variant: 'orange',
-            icon: <RocketLaunchIcon className="w-5 h-5 text-white" strokeWidth={1.8} />,
-          },
-          {
-            title: 'Students & Switchers',
-            description: 'For those building portfolios, learning new skills, or changing careers.',
-            variant: 'purple',
-            icon: <AcademicCapIcon className="w-5 h-5 text-white" strokeWidth={1.8} />,
-          },
-          {
-            title: 'Community Builders',
-            description: 'For workshop facilitators, mentors, and ecosystem supporters.',
-            variant: 'yellow',
-            icon: <UsersIcon className="w-5 h-5 text-black" strokeWidth={1.8} />,
-          },
-        ]}
-        className="my-10"
-      />
+      <h2 id="learned-model">5. Connect the software lesson to a learned model</h2>
+      <p>If you can explain the comparison, continue with the <a href="/articles/featured/a-practical-guide-on-how-to-create-an-artificial-intelligence">local event-reply model lab</a>. It fits a small classifier from synthetic examples and compares it with rules, including cases where the answer still fails. That is a separate experiment: it does not turn this keyword candidate into AI or prove that learning always beats rules.</p>
+      <p>The triage README also describes a future predictor interface returning only the permitted category; no live provider integration is included. If you build one, record actual model, prompt and dataset versions, rejected outputs, latency and cost. Never invent measurements or put secrets in public files. For service boundaries and measured local HTTP, use the <a href="/articles/featured/what-is-inference-in-artificial-intelligence-and-why-it-matters">inference and serving guide</a>.</p>
+      <p>Keep this exercise local with synthetic data. Do not connect it to a real inbox or publish an unauthenticated service. A real system would need authorised data handling, persistent review state, access control, monitoring and an accountable operational owner.</p>

-      {/* Main content */}
-      <div className="">
-        <p>
-          <strong>{TOPIC}</strong> helps Australian founders and teams avoid common pitfalls. This guide is designed to be actionable, evidence-based, and tailored to the 2026 landscape.
-        </p>
-
-        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} width={1200} height={630} />
-
-        <h2>What is {TOPIC}?</h2>
-        <p>
-          Learning AI in 2026 means combining three threads: (1) computational thinking and Python fluency, (2) applied machine learning and large language model (LLM) patterns such as retrieval-augmented generation (RAG), and (3) responsible practice aligned with the Australian Privacy Principles (APPs) and emerging AI safety guidance. It is less about memorising theory and more about shipping small, verifiable projects that demonstrate you can reason about data, evaluate models, and communicate risks.
-        </p>
-        <p>
-          In Australia, employers increasingly value demonstrable skills over titles. Whether you are in Brisbane, Sydney, or remote, the fastest path pairs online coursework with local communities—meetups, hackathons, and open-source contributions—so you can validate your skills with feedback.
-        </p>
-
-        <h2>Why it matters in 2026</h2>
-        <ArticleImageBlock
-          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d0264b00-0aed-477b-b0f1-54e6c2ede32b.jpg?alt=media&token=39f07a8d-e29a-414c-af1e-6400562d29f4"
-          alt="People collaborating in a vibrant tech startup environment with a nostalgic 90s film aesthetic."
-        />
-
-        <p>
-          Generative AI is now embedded in productivity stacks, customer support, and analytics. Ignoring it risks slower delivery, higher costs, and compliance gaps. Acting now matters because Australian organisations are formalising AI governance in procurement and vendor risk assessments. Being able to explain data lineage, consent, and evaluation metrics is becoming table stakes for roles across product, engineering, and operations.
-        </p>
-        <p>
-          The 2026 hiring market rewards candidates who can move from prototype to production responsibly. If you can show model comparisons (e.g., perplexity vs. cost), basic prompt evaluation, and a privacy-first approach, you will stand out without needing a decade of experience.
-        </p>
-
-        <QuoteBlock
-          variant="purple"
-          title="Pro Tip"
-          icon={<span className="text-xl">💡</span>}
-          className="my-8"
-        >
-          Pair every course module with a tiny project (one notebook, one README) and publish it; shipping weekly beats cramming theory.
-        </QuoteBlock>
-
-        <h2>Step-by-Step Guide</h2>
-        <ArticleImageBlock
-          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e687e40d-6b11-44f4-83bf-4a8fd68b5cc9.jpg?alt=media&token=74c5bdbf-40aa-448b-b1d8-dd3fe3c3643c"
-          alt="People collaborating in a vibrant 90s tech startup, embodying innovation and creativity in a retro aesthetic."
-        />
-
-        <h3>Step 1: Preparation</h3>
-        <p>
-          Cover the essentials quickly: Python, Git, and data handling. Use the Australian Bureau of Statistics (ABS) open datasets for practice to stay within local data norms. Learn the math you need just-in-time—vectors, matrices, gradients—via concise resources like 3Blue1Brown. Set up a reproducible environment (Conda or uv) and a hosted notebook (Colab or Paperspace) to avoid local GPU blockers.
-        </p>
-        <p>
-          Choose one credential to anchor your learning—an AWS ML Specialty practice path or a university micro-credential—so you have a clear syllabus and deadlines. Bookmark OAIC guidance to ensure any personal data you touch is de-identified or synthetic.
-        </p>
-
-        <h3>Step 2: Execution</h3>
-        <p>
-          Build three to four projects that reflect real Australian problems: demand forecasting for a local retailer using Prophet, a RAG chatbot over public policy PDFs, or a toxicity filter for community forums using open models. For each project, document dataset sources, evaluation metrics (accuracy, F1, latency, cost per 1k tokens), and privacy controls. Push code to GitHub, add a short Loom walkthrough, and invite feedback from local meetups.
-        </p>
-        <p>
-          Practice responsible deployment: use feature flags, capture model and prompt versions, and add red-teaming checklists. When using LLMs, compare at least two providers on cost and accuracy; note where models struggle with Australian slang or location names, and add guardrails.
-        </p>
-
-        <h3>Step 3: Review</h3>
-        <p>
-          Run a monthly retrospective: what shipped, what was measured, and what broke. Update your portfolio to highlight lessons, not just successes. Map skills to roles—data analyst with LLM augmentation, ML engineer, or AI product manager—and identify the next credential or project to close the gap. Ask mentors for targeted feedback on code quality, model evaluation, and communication clarity.
-        </p>
-        <p>Finally, rehearse concise storytelling: explain one project in 90 seconds, including the problem, approach, metrics, cost, and risks. This is increasingly what Australian hiring managers expect in 2026 screenings.</p>
-
-        <h2>Conclusion</h2>
-        <p>
-          The best way to learn about AI in 2026 is to ship small, responsible projects, document your decisions, and stay anchored to Australian privacy and governance expectations. With steady practice and community feedback, you can reach hire-ready confidence without pausing your career for a full degree.
-        </p>
-
-        <QuoteBlock variant="purple" className="mt-8">
-          <h3 className="text-lg font-bold text-white mb-4">Your Next Steps</h3>
-          <ul className="space-y-3">
-            <li className="flex gap-3 text-white/90">
-              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
-                1
-              </span>
-              <span>Set up your learning environment (Python, Git, hosted notebook) this week.</span>
-            </li>
-            <li className="flex gap-3 text-white/90">
-              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
-                2
-              </span>
-              <span>Complete one introductory ML course module and ship a mini-project to GitHub.</span>
-            </li>
-            <li className="flex gap-3 text-white/90">
-              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
-                3
-              </span>
-              <span>Join a local AI meetup or online community for feedback and accountability.</span>
-            </li>
-          </ul>
-        </QuoteBlock>
-
-        {/* <div className="my-12">
-          <ArticleCompanyCTA
-            title={`Need help with ${TOPIC}?`}
-            body="Get practical recommendations based on your goals, time, and experience level."
-            buttonText="Get recommendations"
-            buttonHref="#"
-            note="You can filter by topic, format (online/in‑person), and experience level."
-          />
-        </div> */}
-      </div>
-
-      <hr className="my-10 border-gray-100" />
-
-      <AuthorBio authors={[authorDetails]} />
-
-      <div className="mt-12">
-        <ArticleFAQ items={faqItems} />
-      </div>
-
-      <ArticleFooterNav />
-
-    </div >
-  )
+      <h2 id="portfolio">6. Turn the work into honest portfolio evidence</h2>
+      <p>Use <a href="/downloads/ai-builder-lab/PORTFOLIO.md" download>the completed portfolio record</a> to see the expected level of detail: scope, commands, actual results, both failure causes, AI-assistance limits, return-to-baseline instructions and explicitly pending independent review. It is an example to learn from, not a record of your own client work.</p>
+      <p>Publish your scope, reproduction commands, data assumptions, failure log and known limits alongside the code. Describe which changes AI tools suggested, what you rejected and what you verified. Credit this starter instead of presenting it unchanged as an original client engagement. Obtain permission before sharing any eventual client work.</p>
+      <p>Ask a reviewer to run the project from your instructions and challenge one test. Record their real feedback; if review is still pending, say so. You are ready for a delivery conversation when you can explain decisions, diagnose failures and maintain the work—not merely when a generated demo opens.</p>
+      <p>If you already have your own permitted project evidence, show the changes you can explain and maintain—not only a test badge or an unchanged starter. That gives MLAI Studio a more useful basis for a builder conversation.</p>
+      <ArticleConversionCTA articleSlug={SLUG} config={BASE_ARTICLE_SEO_CONFIG["/articles/" + SLUG].conversion!} events={[]} placement="article-inline" />
+      <p>Still learning the fundamentals? Browse <a href="/events">MLAI events</a> for an appropriate topic and experience level. Builder intake is currently Australia-focused; New Zealand readers should confirm contracting eligibility with MLAI before assuming a supported pathway.</p>
+      <p className="text-sm">Substantively revised 10 September 2026. The update supplies an executed change review and completed example, with source-checked learning prerequisites. The starter and this revision were AI-assisted and tested by the same agent; independent technical/recipient review and customer deployment have not occurred. No job-ready timeline, employer acceptance or paid-project outcome is claimed.</p>
+    </div>
+  </div>;
 }
```
