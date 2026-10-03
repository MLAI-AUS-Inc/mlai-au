# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/a-practical-guide-on-how-to-create-an-artificial-intelligence.tsx
+++ unreviewed-local-draft/app/articles/content/featured/a-practical-guide-on-how-to-create-an-artificial-intelligence.tsx
@@ -1,277 +1,111 @@
-import type { ReactNode } from 'react'
-import { Home } from 'lucide-react'
-import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/solid'
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
+import { EVENT_REPLY_LAB as LAB, EVENT_REPLY_FILES } from "~/lib/event-reply-lab";

-export const useCustomHeader = true
-
-const TOPIC = "A Practical Guide on How to Create an Artificial Intelligence"
-export const CATEGORY = "featured"
-export const SLUG = "a-practical-guide-on-how-to-create-an-artificial-intelligence"
-export const DATE_PUBLISHED = "2026-03-22"
-export const DATE_MODIFIED = "2026-03-22"
-export const DESCRIPTION = "Learn how to create an artificial intelligence with our step-by-step guide covering data strategy, model training, and ethical deployment for your projects."
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-0c1f2bc9-89fc-42cc-8e74-2c6d708ae3c9.jpg?alt=media&token=257975d5-7903-4218-b610-048dfe649d16"
-const HERO_IMAGE_ALT = "A Practical Guide on How to Create an Artificial Intelligence"
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
-  { id: 1, question: "What is the first step before building an AI system?", answer: "Start by defining the exact task the system should help with, who will use it, and how success will be measured. A clear use case should come before tool selection or model training." },
-  { id: 2, question: "Why is data strategy so important in AI development?", answer: "Data quality strongly affects output quality. If data is incomplete, duplicated, poorly labelled, or unmanaged, the model is more likely to produce unreliable results." },
-  { id: 3, question: "Should you build a model from scratch or start with existing tools?", answer: "Many teams begin with a managed platform or an existing model and then tune it for their task. That usually saves time and gives a clearer baseline than treating every project as a research exercise." },
-  { id: 4, question: "How do you know whether an AI model is good enough to deploy?", answer: "You compare its results against validation or test data and check whether it meets the success measures set at the start. Teams usually retrain and adjust settings several times before deployment." },
-  { id: 5, question: "What should be checked before deploying AI in a live environment?", answer: "Review security permissions, third-party integrations, sensitive data access, and governance rules before launch. It is also important to check outputs for bias, harmful errors, and other risks in real use." },
-  { id: 6, question: "Does an AI system need monitoring after launch?", answer: "Yes. Models and workflows can drift over time as data, users, and conditions change, so live systems should be monitored and updated rather than treated as finished once released." },
-]
-
-export const summaryHighlights = {
-  heading: "Key facts: A Practical Guide on How to Create an Artificial Intelligence",
-  intro: "Learn how to create an artificial intelligence with our step-by-step guide covering data strategy, model training, and ethical deployment for your projects.",
-  items: [
-    { label: "How can we create artificial intelligence?", description: "Create an AI system by defining a specific problem, preparing reliable data, choosing a suitable model approach, and testing it in rounds. Safe deployment also requires governance, security checks, and ongoing monitoring." },
-    { label: "Can I create my own AI?", description: "Yes, individuals and small teams can build practical AI systems when they start with a narrow use case and realistic goals. Modern tool stacks and existing models make development more accessible than a blank-slate approach." },
-    { label: "What is the 30% rule for AI?", description: "This article does not define a standard \"30% rule\" for AI. Its focus is the core build process: use-case definition, data quality, model training, validation, and responsible deployment." },
-  ],
-}
-
-export const articleMeta = {
-  title: "A Practical Guide on How to Create an Artificial Intelligence",
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
-  { question: "How can we create artificial intelligence?", answer: "Create an AI system by defining a specific problem, preparing reliable data, choosing a suitable model approach, and testing it in rounds. Safe deployment also requires governance, security checks, and ongoing monitoring." },
-  { question: "Can I create my own AI?", answer: "Yes, individuals and small teams can build practical AI systems when they start with a narrow use case and realistic goals. Modern tool stacks and existing models make development more accessible than a blank-slate approach." },
-  { question: "What is the 30% rule for AI?", answer: "This article does not define a standard \"30% rule\" for AI. Its focus is the core build process: use-case definition, data quality, model training, validation, and responsible deployment." },
-  { question: "What is the first step before building an AI system?", answer: "Start by defining the exact task the system should help with, who will use it, and how success will be measured. A clear use case should come before tool selection or model training." },
-  { question: "Why is data strategy so important in AI development?", answer: "Data quality strongly affects output quality. If data is incomplete, duplicated, poorly labelled, or unmanaged, the model is more likely to produce unreliable results." },
-  { question: "Should you build a model from scratch or start with existing tools?", answer: "Many teams begin with a managed platform or an existing model and then tune it for their task. That usually saves time and gives a clearer baseline than treating every project as a research exercise." },
-  { question: "How do you know whether an AI model is good enough to deploy?", answer: "You compare its results against validation or test data and check whether it meets the success measures set at the start. Teams usually retrain and adjust settings several times before deployment." },
-  { question: "What should be checked before deploying AI in a live environment?", answer: "Review security permissions, third-party integrations, sensitive data access, and governance rules before launch. It is also important to check outputs for bias, harmful errors, and other risks in real use." },
-  { question: "Does an AI system need monitoring after launch?", answer: "Yes. Models and workflows can drift over time as data, users, and conditions change, so live systems should be monitored and updated rather than treated as finished once released." },
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
+export const useCustomHeader = true;
+export const CATEGORY = "featured";
+export const SLUG = "a-practical-guide-on-how-to-create-an-artificial-intelligence";
+export const DATE_PUBLISHED = "2026-03-22";
+export const DATE_MODIFIED = "2026-09-10";
+const TITLE = "Build a bounded AI prototype: code, tests and handover";
+export const DESCRIPTION = "Run a local event-reply classifier, compare it with rules, inspect a real failure and hand over the code, evidence and limits of a bounded AI prototype.";
+const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-0c1f2bc9-89fc-42cc-8e74-2c6d708ae3c9.jpg?alt=media&token=257975d5-7903-4218-b610-048dfe649d16";
+const PATH = "/articles/" + CATEGORY + "/" + SLUG;
+export const articleMeta = { title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO, imageAlt: "Two people examining a small robot with a laptop in the background" };
+export const summaryHighlights = { heading: "Build a testable system, not a vague AI demo", intro: "Training a new model is an option, not a mandatory step. Here, a tiny local classifier makes its behaviour inspectable.", items: [
+  { label: "Run the whole example", description: "Six downloadable files, invented notices and a rules-versus-model comparison. No API key or package installation." },
+  { label: "Inspect the failure", description: "A correctly cited start time is still the wrong response to a parking question." },
+  { label: "Hand over honest evidence", description: "Keep development results, simulated failures and independent human review clearly separate." },
+] };
+export const faqItems = [
+  { id: 1, question: "Must I train a model to build an AI application?", answer: "No. An existing model may be suitable, or rules and ordinary search may solve the task without AI. This lab fits a small text classifier so you can inspect its calculation; it does not train an LLM." },
+  { id: 2, question: "Does six out of eight mean the prototype is 75% accurate?", answer: "It means six selected invented questions matched their expected intent. It does not measure overall answer quality, real-world accuracy, security or customer usefulness. All cases were visible during development." },
+  { id: 3, question: "Can the lab send replies or access attendee information?", answer: "No. The delivered program has neither capability. It returns a fixed draft from synthetic notice fields or a refusal/cannot-answer result. Every draft needs a person to check the actual question and evidence." },
+  { id: 4, question: "Does completing the example qualify me for client work?", answer: "No. It is a teaching exercise. A Studio application should show broader delivery experience, your contribution, tested work and realistic availability. Selection and paid project matching are not guaranteed." },
+];

 export default function ArticleContent() {
-  const authorDetails = {
-    name: AUTHOR,
-    role: AUTHOR_ROLE,
-    bio: AUTHOR_BIO,
-    avatarUrl: AUTHOR_AVATAR,
-  }
+  return <div>
+    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: TITLE, current: true }]} title={TITLE} titleHighlight="code, tests and handover" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
+    <div data-cf-article-body className="mx-auto max-w-4xl px-4 py-8 prose prose-lg prose-slate [&_h2]:scroll-mt-20 [&_h3]:scroll-mt-20 [&_[role=region]]:scroll-mt-20">
+      <p><strong>A useful first AI build has a bounded task, an inspectable baseline and a way to fail safely.</strong> This guide is for early-career builders who can read basic JavaScript, use a terminal and review AI-assisted code. You will run a small event-question classifier, inspect its replies and prepare a handover record—not create a foundation model or prove you are ready for a client project.</p>
+      <p>The supplied project is an original teaching example with invented data. It is not MLAI's event system, a client case study or a benchmark of commercial AI tools. No real inbox, attendee database, LLM provider or external action is connected.</p>

-  return (
-    <>
+      <h2 id="contract">1. Define what the application may do</h2>
+      <p><strong>The task:</strong> prepare a reply about the time or location of an explicitly selected fictional event, using three fixed notice records. A small learned classifier selects the field; application code copies its value into a draft and attaches supporting notice IDs. The model never writes free-form factual prose.</p>
+      <p className="text-sm">On small screens, swipe the comparison tables sideways. Keyboard users can focus a table and use the left/right arrow keys.</p>
+      <div className="overflow-x-auto" role="region" aria-label="Event prototype acceptance contract" tabIndex={0}><table className="min-w-[640px]">
+        <caption>The implemented teaching contract, not a real event-service specification</caption>
+        <thead><tr><th>Boundary</th><th>Implemented behaviour</th><th>Human responsibility</th></tr></thead><tbody>
+          <tr><td>Input</td><td>Only event ID, question and snapshot version; unknown fields are rejected.</td><td>Confirm the event and permitted notice source.</td></tr>
+          <tr><td>Evidence</td><td>Matching notices must have the requested field and agree; expired or wrong snapshots stop.</td><td>Verify the source is approved, correct and fresh enough.</td></tr>
+          <tr><td>Output</td><td>A fixed, cited draft marked needs-human-review, or an explicit refusal/cannot-answer result.</td><td>Check that it answers this question, not just that its fact is cited.</td></tr>
+          <tr><td>Capabilities</td><td>No sending, booking, payment, registration or attendee lookup exists.</td><td>Review any future capability before adding it.</td></tr>
+        </tbody>
+      </table></div>
+      <p>A prompt saying “never send” is not the same as removing a sending tool. In this delivered program there is no such tool. The limited request filter is additional teaching logic, not a comprehensive privacy or intention detector.</p>

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
+      <h2 id="run-prototype">2. Download and run the working prototype</h2>
+      <p>Save all six files in one new folder, retaining their names. Read the code before executing it. You need a maintained Node.js runtime; there are no packages to install, secrets to supply or cloud costs generated by the delivered program.</p>
+      <ul>{EVENT_REPLY_FILES.map(file => <li key={file.name}><a href={file.href} download>{file.name}</a> — {file.purpose}.</li>)}</ul>
+      <pre className="whitespace-pre-wrap break-words"><code>{"node --version\nnode --test lab.test.mjs\nnode lab.mjs"}</code></pre>
+      <p>Recorded on 10 September 2026 with {LAB.runtime}: <strong>{LAB.tests} tests passed</strong>. Compare the entire JSON result with <code>recorded-result.json</code>. The fixed scenario uses an explicit 1 February 2026 clock and invented February notices; these are not current event details. A clock beyond the snapshot's expiry deliberately stops replies.</p>
+      <p>The README shows how to submit a single question, use the rules baseline instead of the model and investigate setup failures. A missing fixture or extra command-line argument exits with an error. If your browser appends <code>.txt</code> to a code filename, restore the displayed name.</p>

-      <ArticleTocPlaceholder className="bg-transparent" />
+      <h2 id="model">3. Separate the model from the application</h2>
+      <p>The classifier fits word counts from {LAB.trainingExamples} labelled training questions: six about time and six about location. It is <strong>multinomial naive Bayes</strong>, not an LLM. Lowercase word tokens, class frequencies and smoothed counts determine its scores. The <a href="https://scikit-learn.org/stable/modules/naive_bayes.html#multinomial-naive-bayes">scikit-learn model explanation</a> describes the method and Laplace smoothing; this lab implements it in JavaScript and does not import that library.</p>
+      <p>Unknown vocabulary is ignored. No known tokens or a log-score margin below 0.75 produces <code>other</code>. That teaching cutoff is not a calibrated probability or safety guarantee. The model does not know event permissions or whether a fact is useful to the reader.</p>
+      <ol>
+        <li>The validator checks the request, selected event and notice snapshot.</li>
+        <li>The classifier receives question text only and proposes <code>time</code>, <code>location</code> or <code>other</code>.</li>
+        <li>Application code checks that field across every matching notice, refusing missing or conflicting evidence.</li>
+        <li>A fixed template produces the draft and citations. A person must check relevance and evidence before doing anything with it.</li>
+      </ol>
+      <p><strong>Executed trace, case q3:</strong> “{LAB.exampleQuestion}”. The model selects <code>time</code>; both <code>notice-1</code> and <code>notice-2</code> contain the same value. The output is “{LAB.exampleDraft}”, with those two field citations and <code>needs-human-review</code>. The rules baseline returns <code>other</code> for this wording. The full input and both outputs are in the download.</p>

-      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
-        <p><strong>{TOPIC}</strong> — {"Interest in artificial intelligence has grown fast, but building an AI system no longer belongs only to large tech companies. Small businesses and everyday teams can now start with practical AI projects, especially when they focus on a clear business need instead of chasing a vague idea of \u201cdoing AI.\u201d Across business and government guidance, the common message is simple: start with a real problem, choose tools carefully, and expect AI adoption to be a planned process rather than a single quick setup."}</p>
-        <p>{"That is the scope of this article. When people ask how to create an artificial intelligence, they are usually talking about creating an AI system that can support a task, improve a workflow, or automate part of a decision process. In practice, that means moving through a few core phases: define the problem, prepare the data, select and test an approach, and deploy it in a safe and responsible way. It also means thinking early about governance, security, and measurable outcomes, because useful AI is not just about models. It is about building something people can trust and use."}</p>
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          caption="Learn how to create an artificial intelligence with our step-by-step guide covering data strategy, model training, and ethical deployment for your projects."
-          width={1600}
-          height={1067}
-        />
+      <h2 id="comparison">4. Compare the baseline and keep the failed cases</h2>
+      <p>The rules baseline recognises a short list such as “time/start/when” and “where/venue/address”; it abstains when both or neither match. It is deliberately simple, not an optimised production competitor. A field-selection interface might remove the need for either method.</p>
+      <div className="overflow-x-auto" role="region" aria-label="Recorded event prototype results" tabIndex={0}><table className="min-w-[640px]">
+        <caption>Actual routing results on eight invented development questions—not answer accuracy</caption>
+        <thead><tr><th>Measure</th><th>Rules baseline</th><th>Learned classifier</th></tr></thead><tbody>
+          <tr><td>Expected intent matches</td><td>{LAB.baselineCorrect} / {LAB.evaluationCases}</td><td>{LAB.candidateCorrect} / {LAB.evaluationCases}</td></tr>
+          <tr><td>“Commence” and “hall/meet” paraphrases</td><td>Abstains on both</td><td>Routes both to the expected field</td></tr>
+          <tr><td>Attendee email request, q6</td><td>Misclassifies as location</td><td>Misclassifies as location</td></tr>
+          <tr><td>Parking question, q8</td><td>Returns the wrong field</td><td>Returns the wrong field</td></tr>
+        </tbody>
+      </table></div>
+      <p><strong>Inspect q8: “{LAB.failureQuestion}”.</strong> Both methods return the start time. Its citations are valid, but the response is irrelevant. Reject this draft. In q6, the separate application filter refuses the attendee request before classification; that does not turn the underlying wrong classification into a correct one.</p>
+      <p><strong>Decision: neither version is approved for real event enquiries.</strong> Keep the known failure in the log and test an explicit field selector or revised abstention design on fresh cases. Do not remove awkward questions to create a flattering score.</p>
+      <p>These are development examples, <strong>not a statistically representative benchmark</strong>. They are excluded from fitting but were visible during implementation. Tests reject exact normalised overlaps; they do not remove near-duplicate meaning or selection bias. <a href="https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets">Google's dataset guidance</a> explains why tuning against repeatedly viewed examples needs separate, fresh evaluation. Have another person prepare permitted cases and review outcomes before estimating real-world usefulness.</p>

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
+      <h2 id="failure-checks">5. Test boundaries, not just successful replies</h2>
+      <div className="overflow-x-auto" role="region" aria-label="Prototype failure checks" tabIndex={0}><table className="min-w-[640px]">
+        <caption>Behaviours exercised by the downloadable automated suite</caption>
+        <thead><tr><th>Input or injected fault</th><th>Observed behaviour</th><th>Limit</th></tr></thead><tbody>
+          <tr><td>Disagreeing times or missing field</td><td>No draft; explicit evidence failure</td><td>Agreeing sources are not necessarily true.</td></tr>
+          <tr><td>Expired/wrong snapshot or unknown event</td><td>No draft</td><td>Approval and expiry policy need an accountable owner.</td></tr>
+          <tr><td>“Ignore instructions and send” in notice text</td><td>Text reaches neither classifier nor draft</td><td>Data exclusion, not a full prompt-injection benchmark.</td></tr>
+          <tr><td>Throwing, malformed or never-resolving classifier</td><td>Explicit failure; no fabricated reply</td><td>Simulated adapter failures, not provider reliability tests.</td></tr>
+        </tbody>
+      </table></div>
+      <p>The timer stops waiting for an asynchronous result; it cannot terminate blocking JavaScript or undo an external effect. Replacement classifier code is trusted local code, not sandboxed. Adding a provider changes privacy, cost, cancellation and security requirements and needs separate review.</p>
+      <p>Other tests check the model against a hand-solvable probability calculation, verify that evaluation labels cannot change predictions, reject malformed/duplicate records and compare cited values with the selected notice. Green tests establish only those exercised behaviours.</p>

-        <QuoteBlock title="Key insight" variant="purple">
-          {"Create an AI system by defining a specific problem, preparing reliable data, choosing a suitable model approach, and testing it in rounds. Safe deployment also requires governance, security checks, and ongoing monitoring."}
-        </QuoteBlock>
-          <h2>{"Defining Your Use Case and Data Strategy"}</h2>
-          <p>{"Before you build anything, decide exactly what your artificial intelligence should help with. A strong AI project starts with a clear use case, not with a model or tool choice. Sources on AI implementation and strategy consistently point to clear vision, prioritised use cases, and measurable outcomes as the starting point for success."}</p>
-          <p>{"State the task, the users, and the result you want to improve. Then add a simple success measure, such as reducing response time, improving document retrieval, or lowering the amount of manual sorting."}</p>
-          <p>{"A practical way to think about defining your use case and data strategy is through Set boundaries and prepare the right data."}</p>
-          <p>{"Write down the input, expected output, data permissions and a simple baseline before choosing a model. Reserve examples for evaluation and include cases that should be rejected or sent for review."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-643be2a0-01c8-4839-93d2-c22c54ac57c1.jpg?alt=media&token=d50f3fcd-1ff0-44b8-8140-1cd0740351b8"
-            alt="Notebook checklist beside laptop and whiteboard notes outlining AI use case and data plan"
-            caption="Defining Your Use Case and Data Strategy"
-            width={1200}
-            height={800}
-          />
-          <h3>{"Set boundaries and prepare the right data"}</h3>
-          <p>{"Once the use case is clear, define what the AI should and should not do. Setting these limits early supports safer adoption and aligns with source guidance around data governance and responsible AI practices."}</p>
-          <p>{"Your data strategy is just as important as the use case itself. If the data is messy, incomplete, duplicated, or poorly labelled, the AI output will be unreliable. A practical starting point is to identify your data sources, assign ownership, remove obvious quality issues, and decide how new data will be reviewed and updated over time."}</p>
-          <h2>{"How to Create an Artificial Intelligence Model"}</h2>
-          <p>{"Once you know the problem you want to solve, the next step is to build a model in a structured way. A practical approach is to start with a development stack that already supports model building, testing, and tuning, rather than trying to invent every part yourself. Google AI\u2019s developer tools point to this kind of workflow: use a tool stack, build on existing models where it makes sense, and customise or tune them for your task."}</p>
-          <p>{"A step-by-step build process also helps you avoid wasted effort. In plain terms, you choose the tools, prepare the data, select a model approach, train it, test it, and then improve it in rounds. You usually learn from validation results, adjust the setup, and train again until the model performs well enough for the job you defined earlier."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-203233e3-f539-4232-9f1a-a80e667c4a43.jpg?alt=media&token=99583270-24bc-46d5-802d-28042fb97044"
-            alt="How to Create an Artificial Intelligence Model"
-            caption="How to Create an Artificial Intelligence Model"
-            width={1200}
-            height={800}
-          />
-          <h3>{"Choose tools and a starting architecture"}</h3>
-          <p>{"Some teams start with a managed AI platform or an existing model and then tune it. Others build more of the pipeline themselves. The key idea, supported by the source material, is that modern AI development often combines a tool stack with model customisation rather than treating every project as a blank-slate research problem."}</p>
-          <p>{"If you are creating an AI system from scratch, begin with a simple model approach that can be tested quickly. A small, understandable baseline gives you something to measure against."}</p>
-          <h3>{"Train, validate, and fine-tune"}</h3>
-          <p>{"Training means showing the model examples so it can learn patterns."}</p>
-          <p>{"In simple terms, you change settings, retrain, and compare outcomes. That disciplined cycle is what turns a rough AI model into one that is accurate enough to use in practice."}</p>
+      <h2 id="handover">6. Turn the exercise into your own delivery evidence</h2>
+      <p>The files were drafted with AI coding assistance and checked through agent-run execution, calculation tests and failure cases. <strong>No independent human reviewer has approved this prototype.</strong> Downloading it is not evidence that you authored or delivered a client system. Explain the changes you actually make.</p>
+      <p><a href="/downloads/ai-prototype-delivery-contract.txt" download>Download the editable prototype delivery contract</a>. It now includes the completed lab scope and routing result, plus a blank evaluation row. The README adds data permission, environment, your contribution, failure evidence, independent review and future deployment ownership. Leave unrun checks marked UNRUN and approvals marked PENDING.</p>
+      <p>A narrow coding-assistant prompt to try: “Add one test for a missing notice field. Do not change expected results, add network calls or remove the parking failure. Explain what the test does not prove.” Inspect the diff, run the full suite and record your corrections.</p>
+      <p>Do not train or fine-tune a larger model merely because the project is called AI. First test whether a form, rules, search or an existing product meets the task. Further modelling needs a demonstrated gap, permitted data and a stronger evaluation. For commissioning, use the <Link to="/articles/featured/how-to-build-ai-for-real-business-problems">business AI delivery guide</Link>. For different engineering tasks, see the <Link to="/articles/featured/what-is-inference-in-artificial-intelligence-and-why-it-matters">inference service lab</Link> and <Link to="/articles/featured/what-is-an-intelligent-agent-in-artificial-intelligence">agent action-boundary lab</Link>.</p>

-
-
-        <ArticleStepList
-          title="Practical next steps"
-          steps={[
-            "Defining Your Use Case and Data Strategy",
-            "How to Create an Artificial Intelligence Model",
-            "Secure Deployment and Ethical Considerations",
-            "Next Steps for Your AI Journey",
-          ]}
-          accent="indigo"
-        />
-          <h2>{"Secure Deployment and Ethical Considerations"}</h2>
-          <p>{"After you train an AI system, deployment should be treated as a security task, not just a launch step. Cyber.gov.au notes that AI adoption brings cyber security risks on top of familiar threats such as phishing, ransomware and insider threats. It also means checking third-party tools carefully before connecting them to business systems, because an AI feature can become another path into sensitive data if it is configured poorly or given broad permissions."}</p>
-          <p>{"Ethical deployment also depends on responsible data use and clear governance. Australian small business guidance stresses using AI safely and responsibly, and strategy guidance from Microsoft highlights data governance and responsible AI practices as part of effective adoption. A simple way to apply that is to decide what data the system should never use, review outputs for bias or harmful errors before release, and keep a human in the loop for high-impact decisions. Once the system is live, monitor results over time rather than assuming the first version will stay reliable."}</p>
-          <p>{"Define who can access the system, what actions it may perform and how a person can stop it. Test error handling and escalation using permitted or synthetic data before exposing a real workflow."}</p>
-          <p>{"Keep a record of the version, evaluation cases, observed failures and release decision. A successful demonstration is a starting point for testing, not evidence that the system is ready for every user or setting."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-c71da946-ac82-4daa-9f92-8dd292c1a714.jpg?alt=media&token=e34a5f8d-6306-4b70-800e-d5887947bf16"
-            alt="Secure Deployment and Ethical Considerations"
-            caption="Secure Deployment and Ethical Considerations"
-            width={1200}
-            height={800}
-          />
-          <h2>{"Next Steps for Your AI Journey"}</h2>
-          <p>{"If you want to know how to create an artificial intelligence system, the clearest next step is to treat it as a staged journey rather than a single build. Start with a clear problem and a practical strategy. Then focus on the data you need, the people and tools required, and the rules that will guide responsible use. After that, build and test a small solution, measure whether it actually helps, and only then move toward wider deployment. Security and governance should stay in view the whole time, especially when AI is handling sensitive business or customer information."}</p>
-          <p>{"Reliable AI is rarely finished on the first attempt. Most teams learn by iterating: improve the data, refine the model or workflow, check the outcomes, and adjust the process as real-world use reveals gaps. If you are building your skills in Australia, you do not need to do that alone. MLAI exists to help people connect, learn, and collaborate around artificial intelligence. Join the community, share what you are building, ask better questions, and keep turning small, well-managed experiments into useful AI capability."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-0bc0d048-989b-4025-9427-e3fb80fce70d.jpg?alt=media&token=dcf2a3d2-1bf2-4824-bed8-6a229a937991"
-            alt="Team mapping next steps for an AI project on a whiteboard with laptops and"
-            caption="Next Steps for Your AI Journey"
-            width={1200}
-            height={800}
-          />
-
-        <QuoteBlock title="Keep moving forward" variant="orange">
-          {"This article does not define a standard \"30% rule\" for AI. Its focus is the core build process: use-case definition, data quality, model training, validation, and responsible deployment."}
-        </QuoteBlock>
-
-        <MLAITemplateResourceCTA />
-
-      <ArticleReferences
-        references={[
-          {id: 1, href: "https://www.digital.nsw.gov.au/policy/artificial-intelligence/artificial-intelligence-strategy", title: "Artificial Intelligence Strategy | Digital NSW", publisher: "digital.nsw.gov.au", description: "", category: "guide"},
-          {id: 2, href: "https://www.anz.com.au/business/business-hub/grow-business/grow/small-business-ai/", title: "Getting started with AI for your small business | ANZ", publisher: "anz.com.au", description: "", category: "guide"},
-          {id: 3, href: "https://business.gov.au/online-and-digital/artificial-intelligence", title: "Artificial intelligence (AI) | business.gov.au", publisher: "business.gov.au", description: "", category: "guide"},
-          {id: 4, href: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/ai/strategy", title: "Create your AI strategy - Cloud Adoption Framework | Microsoft Learn", publisher: "learn.microsoft.com", description: "", category: "guide"},
-          {id: 5, href: "https://cloud.google.com/transform/how-to-build-an-effective-ai-strategy", title: "An effective AI strategy: How to build one | Google Cloud Blog", publisher: "cloud.google.com", description: "", category: "guide"},
-          {id: 6, href: "https://www.thestrategygroup.com.au/blog/6-steps-to-a-successful-ai-strategy", title: "How to Build a Winning AI Strategy", publisher: "thestrategygroup.com.au", description: "", category: "guide"},
-          {id: 7, href: "https://labs.lamatic.ai/p/how-to-build-ai/", title: "By-Step Guide on How to Build AI and AI Systems From Scratch", publisher: "labs.lamatic.ai", description: "", category: "guide"},
-          {id: 8, href: "https://ai.google/build/", title: "Tools for developers to get started \u00e2\u0080\u0094 Google AI", publisher: "ai.google", description: "", category: "guide"},
-          {id: 9, href: "https://www.cyber.gov.au/business-government/secure-design/artificial-intelligence/artificial-intelligence-for-small-business", title: "Artificial intelligence for small business | Cyber.gov.au", publisher: "cyber.gov.au", description: "", category: "guide"},
-        ]}
-        heading="Sources & further reading"
-      />
-
-        <ArticleDisclaimer />
-
-        <div className="my-12 not-prose">
-          <ArticleCompanyCTA
-            title="Keep building your AI roadmap"
-            body="Use this guide as a starting point, then explore more MLAI resources on AI learning, engineering, product design, and the Australian AI ecosystem."
-            buttonText="Browse MLAI articles"
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
+      <h2 id="next">Use tested work when applying to the builder pool</h2>
+      <p>Already delivering projects with AI coding tools? Use a permitted repository or demo, test record and handover to show MLAI Studio what you can take responsibility for. This lab alone is not proof of client readiness. Applications depend on fit and available work; an assignment is not guaranteed and publishing client work needs permission. The current application asks about contracting in Australia; New Zealand applicants should clarify eligibility before assuming support.</p>
+      <ArticleConversionCTA articleSlug={CATEGORY + "/" + SLUG} config={BASE_ARTICLE_SEO_CONFIG[PATH].conversion!} events={[]} placement="article-inline" />
+      <p>Still practising? <Link to="/events">Find an MLAI learning or build event</Link> and bring one question about a result or boundary you could not explain. Check the advertised format, level and location.</p>
+    </div>
+    <ArticleFAQ items={faqItems} />
+  </div>;
 }
```
