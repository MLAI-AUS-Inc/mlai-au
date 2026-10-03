# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/what-is-inference-in-artificial-intelligence-and-why-it-matters.tsx
+++ unreviewed-local-draft/app/articles/content/featured/what-is-inference-in-artificial-intelligence-and-why-it-matters.tsx
@@ -1,296 +1,104 @@
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
-
-export const useCustomHeader = true
-
-const TOPIC = "What Is Inference in Artificial Intelligence and Why It Matters"
-export const CATEGORY = "featured"
-export const SLUG = "what-is-inference-in-artificial-intelligence-and-why-it-matters"
-export const DATE_PUBLISHED = "2026-04-08"
-export const DATE_MODIFIED = "2026-04-08"
-export const DESCRIPTION = "Learn what inference in artificial intelligence means, how it differs from training and serving, and why it matters in real AI systems."
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d8d1255b-d720-46a6-ab79-ed65bd104e1a.jpg?alt=media&token=8e3932df-1ab1-416b-9ac7-21eab7274536"
-const HERO_IMAGE_ALT = "What Is Inference in Artificial Intelligence and Why It Matters"
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
+import { Home } from "lucide-react";
+import { Link } from "react-router";
+import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
+import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
+import ArticleTocPlaceholder from "~/components/articles/ArticleTocPlaceholder";
+import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
+import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";
+import type { ReactNode } from "react";
+import measurement from "../../../../public/downloads/inference-lab/recorded-measurement.json";
+export const useCustomHeader = true;
+export const CATEGORY = "featured";
+export const SLUG = "what-is-inference-in-artificial-intelligence-and-why-it-matters";
+export const DATE_PUBLISHED = "2026-04-08";
+export const DATE_MODIFIED = "2026-09-10";
+const TITLE = "AI inference and serving: run a model, test the boundary";
+export const DESCRIPTION = "A runnable local inference service with fixed weights, request validation, quality fixtures and measured HTTP timing. Learn what these results do—and do not—prove.";
+const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d8d1255b-d720-46a6-ab79-ed65bd104e1a.jpg?alt=media&token=8e3932df-1ab1-416b-9ac7-21eab7274536";
+const PATH = "/articles/" + CATEGORY + "/" + SLUG;
+export const DOWNLOAD_FILES = ["model.mjs", "server.mjs", "server.test.mjs", "measure.mjs", "measure.test.mjs", "recorded-measurement.json", "README.md"];
+function ScrollTable({ label, children }: { label: string; children: ReactNode }) {
+ return <div role="region" aria-label={label} tabIndex={0} className="my-6 overflow-x-auto rounded border border-slate-300 px-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"><table className="min-w-[640px]">{children}</table></div>;
 }
-
-export const faqItems: FAQ[] = [
-  { id: 1, question: "How is inference different from training in AI?", answer: "Training is the learning phase where a model adjusts its parameters using data. Inference happens afterward, when that trained model uses new, unseen input to produce an output." },
-  { id: 2, question: "Where does fine tuning fit in the AI workflow?", answer: "Fine tuning sits between initial training and production use. It adapts an already trained model to a narrower task or domain before the updated model is used for inference." },
-  { id: 3, question: "What is the difference between inference and serving?", answer: "Inference is the act of a trained model producing an answer from new input. Serving is the infrastructure and runtime setup that makes that inference available reliably to applications or users." },
-  { id: 4, question: "What are the main types of AI inference?", answer: "The two broad types are real-time inference and batch inference. Real-time inference returns results quickly for live interactions, while batch inference processes many inputs together on a schedule." },
-  { id: 5, question: "Is generative AI still using inference?", answer: "Yes. When a generative AI system creates text, images, or another output from a prompt, it is still performing inference because it is applying a trained model to new input." },
-  { id: 6, question: "What should people evaluate during AI inference?", answer: "Useful checks include output accuracy, response speed, operating cost, and deployment context. These factors shape whether inference works well enough for the real task and user experience." },
-]
-
-export const summaryHighlights = {
-  heading: "Key facts: What Is Inference in Artificial Intelligence and Why It Matters",
-  intro: "Learn what inference in artificial intelligence means, how it differs from training and serving, and why it matters in real AI systems.",
-  items: [
-    { label: "What is inference with an example?", description: "Inference is when a trained AI model uses new data to produce an output. For example, a spam filter reviewing a new email and labeling it spam or inbox is performing inference." },
-    { label: "What is an inference in AI?", description: "An inference in AI is the output a trained model produces from unseen input, such as a prediction, classification, decision, or generated response. It is the stage where learned patterns are applied in practice." },
-    { label: "What are 5 examples of an inference?", description: "Common examples include spam detection, image recognition, navigation recommendations, grammar assistance, and chatbot replies. In each case, a trained model receives fresh input and returns a result." },
-  ],
+export const articleMeta = { title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO, imageAlt: "Two people examining a small camera circuit board beside a screen" };
+export const summaryHighlights = { heading: "Inference is not the whole service", intro: "Inference applies model parameters to inputs. Serving makes that operation available through an interface with validation, errors and operational limits.", items: [
+  { label: "Build", description: "Run a tiny fixed-weight linear model over local HTTP, without an API key or package installation." },
+  { label: "Measure", description: "Compare four individual requests with one grouped request, preserving outputs and timing boundaries." },
+  { label: "Limit", description: "Synthetic arithmetic quality is not business accuracy. Local HTTP timings do not benchmark an LLM or cloud service." },
+] };
+export const faqItems = [
+  { id: 1, question: "Must inference use previously unseen input?", answer: "No. A trained model can run on an input it has seen before. Unseen evaluation examples matter for testing generalisation, but novelty is not what defines an inference operation." },
+  { id: 2, question: "Does inference mean the whole system stops learning?", answer: "This lab holds parameters fixed. Other systems may update memory, prompts, retrieval data or model parameters through separate processes. Record what changed rather than assuming all deployed systems are static." },
+  { id: 3, question: "Is the grouped request a cloud batch service?", answer: "No. It is one synchronous local HTTP request carrying several scalar inputs. It does not simulate queued cloud batch processing, GPU batching, concurrency or an LLM’s token generation." },
+  { id: 4, question: "Does zero API spending mean inference is free?", answer: "No. The supplied service calls no paid provider, so provider API spending is zero. Hardware, energy, engineering and operating costs were not measured." },
+];
+export default function ArticleContent() {
+ return <div>
+  <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: TITLE, current: true }]} title={TITLE} titleHighlight="inference and serving" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
+  <ArticleTocPlaceholder />
+  <div data-cf-article-body className="prose prose-lg prose-slate max-w-none [&_h2]:scroll-mt-24">
+   <p>This is a builder exercise in separating a prediction from the service that delivers it. You need basic JavaScript and a local terminal. No customer data, cloud deployment, paid model or AI account is needed. The output is a repeatable test record, not a claim that you have deployed a production AI system.</p>
+   <h2 id="terms">Training, inference and serving are different operations</h2>
+   <p><a href="https://developers.google.com/machine-learning/glossary#inference">Google’s machine-learning glossary</a> describes inference as making predictions by applying a trained model. The input need not be new to the model. A useful prediction and a correct prediction are separate questions.</p>
+   <p className="text-sm">On a narrow screen, scroll each table sideways; keyboard users can focus the table and use the arrow keys.</p>
+   <ScrollTable label="Training and serving operations"><thead><tr><th>Operation</th><th>What changes</th><th>In this exercise</th></tr></thead><tbody>
+    <tr><td>Training</td><td>Parameters are fitted using examples</td><td>The saved fixture has weight 2 and bias 1, fitting invented pairs (0,1), (1,3), (2,5)</td></tr>
+    <tr><td>Fine-tuning</td><td>Further training adapts an existing model</td><td>Not performed; it is not a mandatory stage before inference</td></tr>
+    <tr><td>Inference</td><td>Inputs produce predictions using the current parameters</td><td>For x = 3, the result is 2 × 3 + 1 = 7; parameters do not change</td></tr>
+    <tr><td>Serving</td><td>An interface handles requests and responses</td><td>Loopback HTTP validates JSON and reports explicit errors</td></tr>
+   </tbody></ScrollTable>
+   <p><a href="https://developers.google.com/machine-learning/crash-course/linear-regression">Google’s linear-regression material</a> explains the weighted-input-plus-bias form. Our tiny fixture uses mathematical teaching data with no business interpretation. A real prediction problem needs meaningful training/evaluation data and a justified error measure; fitting this line proves none of that.</p>
+   <h2 id="run">Run the local service and tests</h2>
+   <p>Save all seven files together and inspect the five JavaScript files before running. This dependency-free code uses modern Node.js APIs; the actual run below used {measurement.environment.node}. Other runtime versions need their own test run.</p>
+   <ul>{DOWNLOAD_FILES.map(file => <li key={file}><a href={"/downloads/inference-lab/" + file} download>{file}</a></li>)}</ul>
+   <pre><code>{"node --test server.test.mjs measure.test.mjs\nnode measure.mjs > my-measurement.json"}</code></pre>
+   <p>The measurement script starts a server on an available port at <code>127.0.0.1</code>, runs its requests and closes it. Nine tests check fixed outputs, schema/numeric limits, HTTP errors and the measurement protocol. No network connection to a remote provider is made. Keep your new report alongside the supplied record: timings will differ, so compare the protocol, source hashes, counts and outputs—not identical milliseconds.</p>
+   <p>A completed run prints the full record even if requests fail. Exit code 0 means this fixture matched; 2 means a request failed or an expected value did not match; 1 means the measurement could not start or finish. None is production approval.</p>
+   <p>To try one request manually, run <code>node server.mjs</code>, copy its printed port into the command below, and stop the server with Ctrl+C afterwards:</p>
+   <pre><code>{'curl http://127.0.0.1:PORT/predict -H "Content-Type: application/json" --data \'{"inputs":[3,-1]}\''}</code></pre>
+   <p>Expected response: model version <code>synthetic-linear-v1</code> and outputs <code>[7,-1]</code>. The model uses one scalar input per prediction, so token counts are not applicable—not zero-token LLM inference.</p>
+   <h2 id="boundary">Test the interface, not only the formula</h2>
+   <p>The server uses <a href="https://nodejs.org/api/http.html">Node’s HTTP API</a>. It accepts only POST requests to <code>/predict</code> with JSON containing an <code>inputs</code> array of 1–32 finite numbers in the range −1000 to 1000. Extra fields and numeric strings are rejected, not silently converted.</p>
+   <ScrollTable label="Inference HTTP boundary cases"><thead><tr><th>Case</th><th>Expected HTTP result</th></tr></thead><tbody>
+    <tr><td>Valid inputs [3,-1]</td><td>200; ordered outputs [7,-1]</td></tr>
+    <tr><td>Malformed JSON, null input or extra fields</td><td>400; invalid-input</td></tr>
+    <tr><td>Body larger than 4096 bytes</td><td>413; body-too-large</td></tr>
+    <tr><td>GET on the prediction route</td><td>405; use-post</td></tr>
+    <tr><td>Non-JSON content type</td><td>415; use-json</td></tr>
+    <tr><td>Unknown route</td><td>404; not-found</td></tr>
+   </tbody></ScrollTable>
+   <p>These are teaching limits, not universal production defaults. The server has basic five-second request/socket limits, but the test suite does not establish timeout behaviour under every network condition. It has no authentication, TLS, persistent monitoring or multi-user protection. Keep it on loopback and do not expose it through a tunnel or deploy it as a public service.</p>
+   <h2 id="results">Read the actual record, including its limits</h2>
+   <p><strong>Actual local observation:</strong> <time dateTime={measurement.startedAt}>{measurement.startedAt}</time> (10 September 2026 in Melbourne), using Node {measurement.environment.node} on {measurement.environment.cpuModel}, {measurement.environment.architecture}, with {measurement.environment.logicalCpus} logical CPUs and {measurement.environment.memoryBytes / 2 ** 30} GiB of system memory. Client and server shared one process. The <a href="/downloads/inference-lab/recorded-measurement.json" download>complete measured record</a> contains every request and SHA-256 hashes of the five source/test files; this table reads directly from it.</p>
+   <p>Protocol <code>{measurement.protocol}</code> compares the same inputs [3, −1, 0.5, 4] and expected outputs [7, −1, 2, 9]. Ten pairs alternate which mode runs first: balanced, not randomised. Both modes are synchronous with concurrency one and no retries. Two initial warm-up requests, single then grouped, are recorded separately; server startup is excluded, so this is not a cold-process benchmark.</p>
+   <ScrollTable label="Recorded inference timing results"><thead><tr><th>Pair / first mode</th><th>Four sequential requests, total ms</th><th>One four-input request, total ms</th><th>Exact matches: sequential / grouped</th></tr></thead><tbody>
+    {measurement.rounds.map(round => {
+     const single = round.modes.find(mode => mode.mode === "sequential")!;
+     const grouped = round.modes.find(mode => mode.mode === "grouped")!;
+     return <tr key={round.round}><td>{round.round} / {round.order[0]}</td><td>{single.elapsedMs.toFixed(3)}</td><td>{grouped.elapsedMs.toFixed(3)}</td><td>{single.exactMatches}/{single.expectedCount} / {grouped.exactMatches}/{grouped.expectedCount}</td></tr>;
+    })}
+   </tbody></ScrollTable>
+   <p>Each mode matched {measurement.summary.quality.sequential.exactMatches}/{measurement.summary.quality.sequential.expectedCount} fixture values. Across warm-up and comparison there were {measurement.summary.attemptedRequests} HTTP attempts, {measurement.summary.attemptedInputs} scalar inputs and {measurement.summary.failedRequests} failed requests. The request bodies totalled {measurement.summary.requestBodyBytes} bytes; completed response bodies totalled {measurement.summary.completedResponseBodyBytes} bytes. These are JSON-body counts, not network wire traffic or billable tokens.</p>
+   <p>Request timing includes local HTTP, body parsing and response-contract validation. Mode totals also include loop/bookkeeping overhead. We did not control host load, repeat on different machines or measure energy. Ten pairs on four mathematical inputs do not support a stable tail-latency estimate, generalisation claim or universal speed/cost winner. Do not convert this table into “batch inference is X times faster” marketing.</p>
+   <p>Both modes return the same simple arithmetic values. That is correctness against this fixture, not accuracy on an unseen business dataset. This grouped endpoint is not an asynchronous cloud batch service. Provider API spending was zero because none was called; total operating cost remains unmeasured.</p>
+   <h2 id="failures">A fast wrong response still fails the task</h2>
+   <p>The measurement tests deliberately return one HTTP 503 after warm-up. The script still makes all 52 attempts; the sequential score becomes 39/40, not 39/39, and the failed slot stays in its original position. Another test returns HTTP 200 with wrong numeric outputs: transport errors stay at zero but both quality scores become 0/40. A 20 ms stalled-server test records a timeout. These are controlled failure tests, separate from the successful timing observation above.</p>
+   <p>Malformed JSON, unexpected model versions, extra fields and wrong output counts or types also produce explicit failure records. Redirects are refused. This protects the interpretation of this local experiment; it does not establish internet-facing service safety.</p>
+   <h2 id="handover">Create a usable inference handover record</h2>
+   <ol>
+    <li>Record model/version, runtime, machine, date and exact input fixture; keep expected outputs outside any model input.</li>
+    <li>Define timing boundaries, warm-up, request order, payload size, concurrency and repetitions. Keep failures and timeouts rather than dropping them from results.</li>
+    <li>For an LLM extension, record actual input/output tokens, cache behaviour, price version/currency and retries. For total operating cost, also measure the relevant hardware allocation, energy and labour over the same boundary. These values are not supplied by this scalar lab: the JSON uses null, not invented zeros.</li>
+    <li>Choose task-specific quality and safety criteria before testing. Compare errors as well as successful outputs.</li>
+    <li>Record AI coding tool/model, proposed changes, manual interventions, rejected suggestions and the commands another builder should run.</li>
+    <li>Have a second person reproduce the run and document differences. Do not claim this step is done until it happens.</li>
+   </ol>
+   <p>This lab was drafted with AI coding assistance and tested automatically. The update added balanced ordering, failure-preserving quality counts and source hashes; it also fixed sparse-array validation for direct JavaScript calls. No independent human or recipient review is claimed. For your extension, ask your coding tool to add a failing request-validation test before changing the service. Review the diff; do not let it weaken the input contract to make the test pass.</p>
+   <p>If you already have broader delivery evidence, show MLAI Studio a build, its test results and operational limits. This exercise alone does not establish production readiness or eligibility for paid work. Current intake asks about contracting in Australia; confirm eligibility before assuming a New Zealand pathway.</p>
+   <ArticleConversionCTA articleSlug={CATEGORY + "/" + SLUG} config={BASE_ARTICLE_SEO_CONFIG[PATH].conversion!} events={[]} placement="article-inline" />
+   <p>For the decision-making layer around tools, try the <Link to="/articles/featured/what-is-an-intelligent-agent-in-artificial-intelligence">PEAS agent-design lab</Link>. For discussion while learning, check relevant <Link to="/events">MLAI events</Link>.</p>
+   <p><small>Primary references checked 10 September 2026. The timings describe one local teaching run, not a vendor benchmark or measured customer benefit. Independent reproduction, production deployment and full operating-cost measurement have not been established.</small></p>
+   <ArticleFAQ items={faqItems} />
+  </div>
+ </div>;
 }
-
-export const articleMeta = {
-  title: "What Is Inference in Artificial Intelligence and Why It Matters",
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
-  { question: "What is inference with an example?", answer: "Inference is when a trained AI model uses new data to produce an output. For example, a spam filter reviewing a new email and labeling it spam or inbox is performing inference." },
-  { question: "What is an inference in AI?", answer: "An inference in AI is the output a trained model produces from unseen input, such as a prediction, classification, decision, or generated response. It is the stage where learned patterns are applied in practice." },
-  { question: "What are 5 examples of an inference?", answer: "Common examples include spam detection, image recognition, navigation recommendations, grammar assistance, and chatbot replies. In each case, a trained model receives fresh input and returns a result." },
-  { question: "How is inference different from training in AI?", answer: "Training is the learning phase where a model adjusts its parameters using data. Inference happens afterward, when that trained model uses new, unseen input to produce an output." },
-  { question: "Where does fine tuning fit in the AI workflow?", answer: "Fine tuning sits between initial training and production use. It adapts an already trained model to a narrower task or domain before the updated model is used for inference." },
-  { question: "What is the difference between inference and serving?", answer: "Inference is the act of a trained model producing an answer from new input. Serving is the infrastructure and runtime setup that makes that inference available reliably to applications or users." },
-  { question: "What are the main types of AI inference?", answer: "The two broad types are real-time inference and batch inference. Real-time inference returns results quickly for live interactions, while batch inference processes many inputs together on a schedule." },
-  { question: "Is generative AI still using inference?", answer: "Yes. When a generative AI system creates text, images, or another output from a prompt, it is still performing inference because it is applying a trained model to new input." },
-  { question: "What should people evaluate during AI inference?", answer: "Useful checks include output accuracy, response speed, operating cost, and deployment context. These factors shape whether inference works well enough for the real task and user experience." },
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
-
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
-
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
-
-      <ArticleTocPlaceholder className="bg-transparent" />
-
-      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
-        <p><strong>{TOPIC}</strong> — {"Inference in artificial intelligence is the process of using a trained model on new, unseen data to produce an output. That output can be a prediction, a classification, a decision, or generated content such as text or an image. In plain English, inference is the moment the model stops learning and starts doing useful work with what it already learned."}</p>
-        <p>{"This is why many sources describe inference as the operational or \u201cdoing\u201d part of AI. A model receives an input, applies patterns learned during training, and returns an answer. If a system labels an email as spam, identifies an object in a photo, or generates a response from a prompt, that visible result is inference. It is the stage where AI creates practical value in real applications and workflows."}</p>
-        <p>{"Inference also helps explain where this step sits in the wider AI lifecycle. Training comes first, when the model learns from data. Inference comes after that, when the trained model is used on fresh inputs in real-world use. From there, teams often need to think about serving, speed, scale, and cost, but those are later operational concerns. At its core, inference simply means a trained AI model turning input into a useful output."}</p>
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          caption="Learn what inference in artificial intelligence means, how it differs from training and serving, and why it matters in real AI systems."
-          width={1600}
-          height={1067}
-        />
-
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
-
-        <QuoteBlock title="Key insight" variant="purple">
-          {"Inference is when a trained AI model uses new data to produce an output. For example, a spam filter reviewing a new email and labeling it spam or inbox is performing inference."}
-        </QuoteBlock>
-          <h2>{"Training, fine tuning, inference and serving"}</h2>
-          <p>{"These terms describe different parts of the same machine learning workflow, but they are not interchangeable. Training is the learning phase. A model studies examples, finds patterns, and adjusts its internal parameters so it can do a task better over time. Inference starts after that learning phase. It is the moment the trained model receives new, unseen data and produces an output, such as a prediction, a decision, or generated text."}</p>
-          <p>{"That is why many sources describe inference as the \"doing\" part of AI or the final step that people experience as AI in practice. In a real product, users usually do not see training happen. They see inference happen when they upload an image, ask a chatbot a question, or send new data into a model and get a result back. Training builds the capability, while inference applies it."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-7a3e39a6-47af-488d-9a22-f28fa5a86a81.jpg?alt=media&token=a0d1de3e-26ec-4a78-99a7-bbcbe2b0ac64"
-            alt="Training, fine tuning, inference and serving"
-            caption="Training, fine tuning, inference and serving"
-            width={1200}
-            height={800}
-          />
-          <h3>{"Where fine tuning fits"}</h3>
-          <p>{"Fine tuning sits between broad training and day-to-day inference. Instead of building a model from scratch, teams start with an already trained model and adapt it to a narrower task, domain, or style. The core idea is still learning from data, but the goal is more specific than the original training stage."}</p>
-          <p>{"After fine tuning is complete, the updated model is then used for inference just like any other trained model. In simple terms, fine tuning changes what the model has learned, while inference uses whatever the model has already learned at that point."}</p>
-          <h3>{"What serving adds"}</h3>
-          <p>{"Serving is the delivery layer around inference. It is the infrastructure and runtime setup that makes a model available to an application, a website, or an internal system. If inference is the act of producing an answer, serving is how that answer becomes accessible and reliable in production."}</p>
-          <p>{"This distinction matters because a model can be trained and even fine tuned without being ready for real users. Serving focuses on making inference usable at scale, with the speed, availability, and deployment setup needed for live requests. So the full picture is: training teaches, fine tuning adapts, inference answers, and serving makes those answers available in the real world."}</p>
-          <h2>{"How AI inference works from input to output"}</h2>
-          <p>{"AI inference starts when a trained model receives new data it has not seen before. That input might be a photo, a sentence, a sound clip, or a row of business data. Before the model can use it, the system usually puts it into the format the model expects. In simple terms, the input is prepared, passed into the model, and checked against patterns the model learned during training. This is the point where AI stops learning and starts doing useful work."}</p>
-          <p>{"Once the model runs, it produces an output based on that fresh input. The output depends on the task. So the flow is usually: prepare the input, run the trained model, read the result, then trigger an action if needed."}</p>
-          <ul>
-            <li>{"Phase 1: receive and prepare new input"}</li>
-            <li>{"Phase 2: run the trained model on that input"}</li>
-            <li>{"Phase 3: return and interpret the output"}</li>
-          </ul>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f40eb17e-247e-498e-be98-d9dc5735b871.jpg?alt=media&token=d563003a-f363-4682-8800-11c7ed1c64ab"
-            alt="How AI inference works from input to output"
-            caption="How AI inference works from input to output"
-            width={1200}
-            height={800}
-          />
-          <h3>{"What the output can look like"}</h3>
-          <p>{"The same inference flow can end in different kinds of answers. A classification model may return a label such as spam or not spam. A prediction model may return a score or probability. A generative model may return new text or an image. Across these cases, the core idea stays the same: new data goes in, the trained model applies what it learned, and the system returns an answer that can be shown to a user or used by another part of the application."}</p>
-
-
-
-        <ArticleStepList
-          title="Practical next steps"
-          steps={[
-            "Phase 1: receive and prepare new input",
-            "Phase 2: run the trained model on that input",
-            "Phase 3: return and interpret the output",
-          ]}
-          accent="indigo"
-        />
-          <h2>{"The main types of AI inference"}</h2>
-          <p>{"AI systems usually run inference in two broad ways: real-time inference and batch inference. Real-time inference, sometimes called online inference, means the model receives new input and returns a result straight away. This mode is used when a person, device, or software system needs a fast response, such as a chatbot replying to a message or a model classifying incoming data as it arrives. The main goal is low latency, because the output is part of a live experience."}</p>
-          <p>{"Batch inference works differently. Instead of handling one request at a time for an immediate answer, the model processes many inputs together on a schedule or as a larger job. In practice, teams choose between these modes based on the trade-off between response time, operating cost, and the kind of user experience they need to deliver."}</p>
-          <ul>
-            <li>{"Real-time inference focuses on quick responses for live applications."}</li>
-            <li>{"Batch inference focuses on processing larger volumes efficiently."}</li>
-            <li>{"The right mode depends on latency needs, scale, cost, and user experience."}</li>
-          </ul>
-          <h3>{"How to decide between real-time and batch inference"}</h3>
-          <p>{"A simple way to think about the choice is to ask when the prediction is needed. If the answer must appear during an interaction, real-time inference is usually the better fit. If the prediction can wait until later, batch inference may be more practical. This makes the distinction less about the model itself and more about the timing of the workload."}</p>
-          <p>{"Real-time systems are designed to stay ready for incoming requests, which supports fast output but can be more demanding to operate. Batch jobs can group work together, which may improve efficiency when large amounts of data need the same kind of prediction. That is why two systems using similar models can still choose very different inference modes depending on how often requests arrive and how quickly results are expected."}</p>
-          <h2>{"Examples and common questions about AI inference"}</h2>
-          <p>{"AI inference is what happens when a trained model is given new input and produces an output. In plain terms, it is the working stage of AI. A spam filter is a simple example: the model has already learned patterns from earlier email data, and during inference it looks at a new email and predicts whether it is spam or not."}</p>
-          <p>{"This also helps answer a common question: what are inferences in AI? They are the predictions, classifications, decisions, or generated outputs a trained model produces from unseen data. In that sense, inference is not a separate kind of intelligence. It is the moment the model uses what it learned. Sources also frame this as the final step after training, where AI delivers a result in a real application rather than continuing to learn."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-33feed15-d5bb-46ba-9ecb-c3584dc074a7.jpg?alt=media&token=4975f7e7-211d-4ade-bed7-6940ff4de165"
-            alt="Ultra-close candid of a person checking a spam email alert on phone, illustrating AI inference in action"
-            caption="Examples and common questions about AI inference"
-            width={1200}
-            height={800}
-          />
-          <h3>{"What is an example of AI inference?"}</h3>
-          <p>{"A clear example is email classification. After training on many examples of spam and non-spam messages, the model receives a brand-new email. It checks the patterns in that message and returns an output such as spam or inbox. That single prediction is an AI inference."}</p>
-          <p>{"Another example is image recognition. A trained model sees a new image and predicts what it contains based on patterns learned earlier. Red Hat describes this as a model providing an answer based on data, and Google Cloud describes it as the point where the model stops learning and starts doing useful work on new input."}</p>
-          <h3>{"What are the basic types, and how is inference different from generative AI?"}</h3>
-          <p>{"At a basic level, inference can show up in a few familiar forms: classification, prediction, decision-making, and generation. Classification covers tasks like spam detection or image labeling. Prediction and decision-making cover cases where a model evaluates new data and chooses an output or action. Generation is still inference too, because a trained model is producing text, images, or another result from a prompt."}</p>
-          <p>{"That is why inference and generative AI are not opposites. Generative AI is a category of AI systems that can create new content, while inference is the runtime process those systems use to produce that content. IBM explicitly places generative AI within the broader pattern-recognition view of inference. So when a chatbot writes a reply, the chatbot is a generative AI application, and the act of producing that reply is inference."}</p>
-          <h2>{"Why inference matters in practice"}</h2>
-          <p>{"Inference is the point where an AI system stops being a trained model on paper and starts producing a real output. It is the moment a model takes new, unseen input and turns it into a prediction, decision, or generated response. That is why inference is the stage most people actually experience when they use AI. In practice, it is also where AI delivers business value, because the system must respond to real requests in a real setting."}</p>
-          <p>{"When you evaluate an AI product, demo, or internal tool, it helps to separate training from inference. A model may have impressive training behind it, but the practical question is how well it performs during inference. Look at whether the output is accurate enough for the task, how quickly it responds, what it costs to run, and where it is deployed. Using that training-versus-inference distinction makes AI claims easier to assess and keeps attention on the part that users, teams, and customers depend on every day."}</p>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-11e65229-5584-482f-9444-9f332ba8a4f7.jpg?alt=media&token=d6c43e15-5b27-4f81-bf70-a7ed91f57d83"
-            alt="Why inference matters in practice"
-            caption="Why inference matters in practice"
-            width={1200}
-            height={800}
-          />
-
-        <QuoteBlock title="Keep moving forward" variant="orange">
-          {"Common examples include spam detection, image recognition, navigation recommendations, grammar assistance, and chatbot replies. In each case, a trained model receives fresh input and returns a result."}
-        </QuoteBlock>
-
-        <MLAITemplateResourceCTA />
-
-      <ArticleReferences
-        references={[
-          {id: 1, href: "https://www.ovhcloud.com/en-au/learn/what-is-ai-inference/", title: "What is ai inference? | OVHcloud Australia", publisher: "ovhcloud.com", description: "", category: "guide"},
-          {id: 2, href: "https://cloud.google.com/discover/what-is-ai-inference", title: "What is AI inference? How it works and examples | Google Cloud", publisher: "cloud.google.com", description: "", category: "guide"},
-          {id: 3, href: "https://www.suse.com/c/ai-inference-everything-you-need-to-know/", title: "AI Inference: Everything You Need To Know | SUSE Communities", publisher: "suse.com", description: "", category: "guide"},
-          {id: 4, href: "https://www.ibm.com/think/topics/ai-inference", title: "What is AI Inference? | IBM", publisher: "ibm.com", description: "", category: "guide"},
-          {id: 5, href: "https://groq.com/blog/understanding-ai-101-what-is-inference-in-machine-learning-and-ai-applications", title: "What is AI Inference? ML Basics Explained | Groq is fast, low cost inference.", publisher: "groq.com", description: "", category: "guide"},
-          {id: 6, href: "https://www.redhat.com/en/topics/ai/what-is-ai-inference", title: "What is AI inference?", publisher: "redhat.com", description: "", category: "guide"},
-          {id: 7, href: "https://nebius.com/blog/posts/difference-between-ai-training-and-inference", title: "The difference between AI training and inference", publisher: "nebius.com", description: "", category: "guide"},
-          {id: 8, href: "https://www.arm.com/glossary/ai-inference", title: "What is AI Inference \u2013 Arm\u00ae", publisher: "arm.com", description: "", category: "guide"},
-          {id: 9, href: "https://www.redhat.com/en/blog/strategic-approach-ai-inference-performance", title: "A strategic approach to AI inference performance", publisher: "redhat.com", description: "", category: "guide"},
-          {id: 10, href: "https://www.azion.com/en/learning/ai/what-is-ai-inference/", title: "What is AI inference? (+ When to Use It and How to Run It in Production) | Azion", publisher: "azion.com", description: "", category: "guide"},
-          {id: 11, href: "https://www.geeksforgeeks.org/artificial-intelligence/inference-in-ai/", title: "Inference in AI - GeeksforGeeks", publisher: "geeksforgeeks.org", description: "", category: "guide"},
-        ]}
-        heading="Sources & further reading"
-      />
-
-        <ArticleDisclaimer />
-
-        <div className="my-12 not-prose">
-          <ArticleCompanyCTA
-            title="Keep building your practical AI understanding"
-            body="If you want more plain-English guidance on how AI systems work in real settings, explore beginner-friendly learning resources and examples."
-            buttonText="Explore practical AI learning"
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
-}
```
