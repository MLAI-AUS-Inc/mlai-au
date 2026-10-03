import { Home } from "lucide-react";
import { Link } from "react-router";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import ArticleTocPlaceholder from "~/components/articles/ArticleTocPlaceholder";
import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";
import type { ReactNode } from "react";
import measurement from "../../../../public/downloads/inference-lab/recorded-measurement.json";
export const useCustomHeader = true;
export const CATEGORY = "featured";
export const SLUG = "what-is-inference-in-artificial-intelligence-and-why-it-matters";
export const DATE_PUBLISHED = "2026-04-08";
export const DATE_MODIFIED = "2026-09-10";
const TITLE = "AI inference and serving: run a model, test the boundary";
export const DESCRIPTION = "A runnable local inference service with fixed weights, request validation, quality fixtures and measured HTTP timing. Learn what these results do—and do not—prove.";
const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d8d1255b-d720-46a6-ab79-ed65bd104e1a.jpg?alt=media&token=8e3932df-1ab1-416b-9ac7-21eab7274536";
const PATH = "/articles/" + CATEGORY + "/" + SLUG;
export const DOWNLOAD_FILES = ["model.mjs", "server.mjs", "server.test.mjs", "measure.mjs", "measure.test.mjs", "recorded-measurement.json", "README.md"];
function ScrollTable({ label, children }: { label: string; children: ReactNode }) {
 return <div role="region" aria-label={label} tabIndex={0} className="my-6 overflow-x-auto rounded border border-slate-300 px-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"><table className="min-w-[640px]">{children}</table></div>;
}
export const articleMeta = { title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO, imageAlt: "Two people examining a small camera circuit board beside a screen" };
export const summaryHighlights = { heading: "Inference is not the whole service", intro: "Inference applies model parameters to inputs. Serving makes that operation available through an interface with validation, errors and operational limits.", items: [
  { label: "Build", description: "Run a tiny fixed-weight linear model over local HTTP, without an API key or package installation." },
  { label: "Measure", description: "Compare four individual requests with one grouped request, preserving outputs and timing boundaries." },
  { label: "Limit", description: "Synthetic arithmetic quality is not business accuracy. Local HTTP timings do not benchmark an LLM or cloud service." },
] };
export const faqItems = [
  { id: 1, question: "Must inference use previously unseen input?", answer: "No. A trained model can run on an input it has seen before. Unseen evaluation examples matter for testing generalisation, but novelty is not what defines an inference operation." },
  { id: 2, question: "Does inference mean the whole system stops learning?", answer: "This lab holds parameters fixed. Other systems may update memory, prompts, retrieval data or model parameters through separate processes. Record what changed rather than assuming all deployed systems are static." },
  { id: 3, question: "Is the grouped request a cloud batch service?", answer: "No. It is one synchronous local HTTP request carrying several scalar inputs. It does not simulate queued cloud batch processing, GPU batching, concurrency or an LLM’s token generation." },
  { id: 4, question: "Does zero API spending mean inference is free?", answer: "No. The supplied service calls no paid provider, so provider API spending is zero. Hardware, energy, engineering and operating costs were not measured." },
];
export default function ArticleContent() {
 return <div>
  <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: TITLE, current: true }]} title={TITLE} titleHighlight="inference and serving" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
  <ArticleTocPlaceholder />
  <div data-cf-article-body className="prose prose-lg prose-slate max-w-none [&_h2]:scroll-mt-24">
   <p>This is a builder exercise in separating a prediction from the service that delivers it. You need basic JavaScript and a local terminal. No customer data, cloud deployment, paid model or AI account is needed. The output is a repeatable test record, not a claim that you have deployed a production AI system.</p>
   <h2 id="terms">Training, inference and serving are different operations</h2>
   <p><a href="https://developers.google.com/machine-learning/glossary#inference">Google’s machine-learning glossary</a> describes inference as making predictions by applying a trained model. The input need not be new to the model. A useful prediction and a correct prediction are separate questions.</p>
   <p className="text-sm">On a narrow screen, scroll each table sideways; keyboard users can focus the table and use the arrow keys.</p>
   <ScrollTable label="Training and serving operations"><thead><tr><th>Operation</th><th>What changes</th><th>In this exercise</th></tr></thead><tbody>
    <tr><td>Training</td><td>Parameters are fitted using examples</td><td>The saved fixture has weight 2 and bias 1, fitting invented pairs (0,1), (1,3), (2,5)</td></tr>
    <tr><td>Fine-tuning</td><td>Further training adapts an existing model</td><td>Not performed; it is not a mandatory stage before inference</td></tr>
    <tr><td>Inference</td><td>Inputs produce predictions using the current parameters</td><td>For x = 3, the result is 2 × 3 + 1 = 7; parameters do not change</td></tr>
    <tr><td>Serving</td><td>An interface handles requests and responses</td><td>Loopback HTTP validates JSON and reports explicit errors</td></tr>
   </tbody></ScrollTable>
   <p><a href="https://developers.google.com/machine-learning/crash-course/linear-regression">Google’s linear-regression material</a> explains the weighted-input-plus-bias form. Our tiny fixture uses mathematical teaching data with no business interpretation. A real prediction problem needs meaningful training/evaluation data and a justified error measure; fitting this line proves none of that.</p>
   <h2 id="run">Run the local service and tests</h2>
   <p>Save all seven files together and inspect the five JavaScript files before running. This dependency-free code uses modern Node.js APIs; the actual run below used {measurement.environment.node}. Other runtime versions need their own test run.</p>
   <ul>{DOWNLOAD_FILES.map(file => <li key={file}><a href={"/downloads/inference-lab/" + file} download>{file}</a></li>)}</ul>
   <pre><code>{"node --test server.test.mjs measure.test.mjs\nnode measure.mjs > my-measurement.json"}</code></pre>
   <p>The measurement script starts a server on an available port at <code>127.0.0.1</code>, runs its requests and closes it. Nine tests check fixed outputs, schema/numeric limits, HTTP errors and the measurement protocol. No network connection to a remote provider is made. Keep your new report alongside the supplied record: timings will differ, so compare the protocol, source hashes, counts and outputs—not identical milliseconds.</p>
   <p>A completed run prints the full record even if requests fail. Exit code 0 means this fixture matched; 2 means a request failed or an expected value did not match; 1 means the measurement could not start or finish. None is production approval.</p>
   <p>To try one request manually, run <code>node server.mjs</code>, copy its printed port into the command below, and stop the server with Ctrl+C afterwards:</p>
   <pre><code>{'curl http://127.0.0.1:PORT/predict -H "Content-Type: application/json" --data \'{"inputs":[3,-1]}\''}</code></pre>
   <p>Expected response: model version <code>synthetic-linear-v1</code> and outputs <code>[7,-1]</code>. The model uses one scalar input per prediction, so token counts are not applicable—not zero-token LLM inference.</p>
   <h2 id="boundary">Test the interface, not only the formula</h2>
   <p>The server uses <a href="https://nodejs.org/api/http.html">Node’s HTTP API</a>. It accepts only POST requests to <code>/predict</code> with JSON containing an <code>inputs</code> array of 1–32 finite numbers in the range −1000 to 1000. Extra fields and numeric strings are rejected, not silently converted.</p>
   <ScrollTable label="Inference HTTP boundary cases"><thead><tr><th>Case</th><th>Expected HTTP result</th></tr></thead><tbody>
    <tr><td>Valid inputs [3,-1]</td><td>200; ordered outputs [7,-1]</td></tr>
    <tr><td>Malformed JSON, null input or extra fields</td><td>400; invalid-input</td></tr>
    <tr><td>Body larger than 4096 bytes</td><td>413; body-too-large</td></tr>
    <tr><td>GET on the prediction route</td><td>405; use-post</td></tr>
    <tr><td>Non-JSON content type</td><td>415; use-json</td></tr>
    <tr><td>Unknown route</td><td>404; not-found</td></tr>
   </tbody></ScrollTable>
   <p>These are teaching limits, not universal production defaults. The server has basic five-second request/socket limits, but the test suite does not establish timeout behaviour under every network condition. It has no authentication, TLS, persistent monitoring or multi-user protection. Keep it on loopback and do not expose it through a tunnel or deploy it as a public service.</p>
   <h2 id="results">Read the actual record, including its limits</h2>
   <p><strong>Actual local observation:</strong> <time dateTime={measurement.startedAt}>{measurement.startedAt}</time> (10 September 2026 in Melbourne), using Node {measurement.environment.node} on {measurement.environment.cpuModel}, {measurement.environment.architecture}, with {measurement.environment.logicalCpus} logical CPUs and {measurement.environment.memoryBytes / 2 ** 30} GiB of system memory. Client and server shared one process. The <a href="/downloads/inference-lab/recorded-measurement.json" download>complete measured record</a> contains every request and SHA-256 hashes of the five source/test files; this table reads directly from it.</p>
   <p>Protocol <code>{measurement.protocol}</code> compares the same inputs [3, −1, 0.5, 4] and expected outputs [7, −1, 2, 9]. Ten pairs alternate which mode runs first: balanced, not randomised. Both modes are synchronous with concurrency one and no retries. Two initial warm-up requests, single then grouped, are recorded separately; server startup is excluded, so this is not a cold-process benchmark.</p>
   <ScrollTable label="Recorded inference timing results"><thead><tr><th>Pair / first mode</th><th>Four sequential requests, total ms</th><th>One four-input request, total ms</th><th>Exact matches: sequential / grouped</th></tr></thead><tbody>
    {measurement.rounds.map(round => {
     const single = round.modes.find(mode => mode.mode === "sequential")!;
     const grouped = round.modes.find(mode => mode.mode === "grouped")!;
     return <tr key={round.round}><td>{round.round} / {round.order[0]}</td><td>{single.elapsedMs.toFixed(3)}</td><td>{grouped.elapsedMs.toFixed(3)}</td><td>{single.exactMatches}/{single.expectedCount} / {grouped.exactMatches}/{grouped.expectedCount}</td></tr>;
    })}
   </tbody></ScrollTable>
   <p>Each mode matched {measurement.summary.quality.sequential.exactMatches}/{measurement.summary.quality.sequential.expectedCount} fixture values. Across warm-up and comparison there were {measurement.summary.attemptedRequests} HTTP attempts, {measurement.summary.attemptedInputs} scalar inputs and {measurement.summary.failedRequests} failed requests. The request bodies totalled {measurement.summary.requestBodyBytes} bytes; completed response bodies totalled {measurement.summary.completedResponseBodyBytes} bytes. These are JSON-body counts, not network wire traffic or billable tokens.</p>
   <p>Request timing includes local HTTP, body parsing and response-contract validation. Mode totals also include loop/bookkeeping overhead. We did not control host load, repeat on different machines or measure energy. Ten pairs on four mathematical inputs do not support a stable tail-latency estimate, generalisation claim or universal speed/cost winner. Do not convert this table into “batch inference is X times faster” marketing.</p>
   <p>Both modes return the same simple arithmetic values. That is correctness against this fixture, not accuracy on an unseen business dataset. This grouped endpoint is not an asynchronous cloud batch service. Provider API spending was zero because none was called; total operating cost remains unmeasured.</p>
   <h2 id="failures">A fast wrong response still fails the task</h2>
   <p>The measurement tests deliberately return one HTTP 503 after warm-up. The script still makes all 52 attempts; the sequential score becomes 39/40, not 39/39, and the failed slot stays in its original position. Another test returns HTTP 200 with wrong numeric outputs: transport errors stay at zero but both quality scores become 0/40. A 20 ms stalled-server test records a timeout. These are controlled failure tests, separate from the successful timing observation above.</p>
   <p>Malformed JSON, unexpected model versions, extra fields and wrong output counts or types also produce explicit failure records. Redirects are refused. This protects the interpretation of this local experiment; it does not establish internet-facing service safety.</p>
   <h2 id="handover">Create a usable inference handover record</h2>
   <ol>
    <li>Record model/version, runtime, machine, date and exact input fixture; keep expected outputs outside any model input.</li>
    <li>Define timing boundaries, warm-up, request order, payload size, concurrency and repetitions. Keep failures and timeouts rather than dropping them from results.</li>
    <li>For an LLM extension, record actual input/output tokens, cache behaviour, price version/currency and retries. For total operating cost, also measure the relevant hardware allocation, energy and labour over the same boundary. These values are not supplied by this scalar lab: the JSON uses null, not invented zeros.</li>
    <li>Choose task-specific quality and safety criteria before testing. Compare errors as well as successful outputs.</li>
    <li>Record AI coding tool/model, proposed changes, manual interventions, rejected suggestions and the commands another builder should run.</li>
    <li>Have a second person reproduce the run and document differences. Do not claim this step is done until it happens.</li>
   </ol>
   <p>This lab was drafted with AI coding assistance and tested automatically. The update added balanced ordering, failure-preserving quality counts and source hashes; it also fixed sparse-array validation for direct JavaScript calls. No independent human or recipient review is claimed. For your extension, ask your coding tool to add a failing request-validation test before changing the service. Review the diff; do not let it weaken the input contract to make the test pass.</p>
   <p>If you already have broader delivery evidence, show MLAI Studio a build, its test results and operational limits. This exercise alone does not establish production readiness or eligibility for paid work. Current intake asks about contracting in Australia; confirm eligibility before assuming a New Zealand pathway.</p>
   <ArticleConversionCTA articleSlug={CATEGORY + "/" + SLUG} config={BASE_ARTICLE_SEO_CONFIG[PATH].conversion!} events={[]} placement="article-inline" />
   <p>For the decision-making layer around tools, try the <Link to="/articles/featured/what-is-an-intelligent-agent-in-artificial-intelligence">PEAS agent-design lab</Link>. For discussion while learning, check relevant <Link to="/events">MLAI events</Link>.</p>
   <p><small>Primary references checked 10 September 2026. The timings describe one local teaching run, not a vendor benchmark or measured customer benefit. Independent reproduction, production deployment and full operating-cost measurement have not been established.</small></p>
   <ArticleFAQ items={faqItems} />
  </div>
 </div>;
}
