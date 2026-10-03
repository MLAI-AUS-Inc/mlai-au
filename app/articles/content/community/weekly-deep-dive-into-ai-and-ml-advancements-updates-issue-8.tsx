import { Home } from "lucide-react";
import { Link } from "react-router";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";
import ArticleTocPlaceholder from "~/components/articles/ArticleTocPlaceholder";
import handover from "../../../../public/downloads/environment-handover/recorded-run.json";

export const useCustomHeader = true;
export const SLUG = "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-8";
export const articleMeta = {
  title: "AI Bits #8: Environment handovers and a 2023 Proton correction",
  description: "Download a tested environment-handover kit, inspect source hashes and reproduce a held classification review. Includes the corrected scope of a 2023 Proton gaming paper.",
  datePublished: "2026-03-11",
  dateModified: "2026-09-10",
};
export const summaryHighlights = {
  heading: "Make the next operator's first run inspectable",
  intro: "For AI-assisted builders documenting a development environment—not a recommendation to switch operating systems.",
  items: [
    { label: "What does the source establish?", description: "The public abstract describes a 2023 comparison of Proton and native Windows for video gaming. Full methods and results were not available for this correction." },
    { label: "What was corrected?", description: "Removed unsupported causal attributions about Windows background services and extrapolation to AI inference or developer productivity." },
    { label: "What can you use?", description: "A twelve-file kit, a completed local record and a checker that distinguishes file identity from executed tests and delivery approval." },
  ],
};
export const ENVIRONMENT_MANIFEST = [
  "Environment handover — redact identifying paths and secrets",
  "Task, repository URL and exact commit:",
  "Host OS/version and architecture:",
  "Runtime and package-manager versions:",
  "Dependency lockfile and clean-install command:",
  "Container/VM layer and image digest, if used:",
  "GPU/driver/accelerator versions, or not applicable:",
  "Required configuration variable names (never secret values):",
  "Permitted fixture input and expected output:",
  "Test/run commands and observed exit status:",
  "Known failures, unsupported environments and manual fallback:",
  "Reproduction date, operator and evidence location:",
  "What was not tested:",
].join("\n");
const counts = handover.commands[1].counts!;
const comparison = handover.commands[2].summary!;
export const HANDOVER_FILES = ["inspect.mjs", "inspect.test.mjs", "expected-files.json", "recorded-run.json", "HANDOVER.md"];
export const faqItems = [
  { question: "Does this paper prove Linux is faster for AI inference?", answer: "No such conclusion is established here. The accessible abstract describes gaming. This correction did not inspect the full methods or results, and a result on one workload cannot be assumed for another." },
  { question: "Is Proton a general solution for Windows development tools?", answer: "Valve describes Proton as a Steam Play compatibility tool based on Wine and additional components, intended for Windows games on Linux. Do not infer support for an arbitrary development tool; verify the exact application and supported setup independently." },
  { question: "Does passing a local test prove a handover is reproducible?", answer: "It proves that run in that environment. A recipient must follow the documented setup independently, compare outputs and report differences before you claim a reproduced handover." },
  { question: "Should I change operating systems to build AI projects?", answer: "Start with your project's supported dependencies, hardware, team requirements and actual failure. This article supplies no evidence that an OS change will improve your performance. Test a representative workload before making a consequential change." },
];

export default function ArticleContent() {
  return <div>
    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: "AI Bits #8", current: true }]} title={articleMeta.title} titleHighlight="Environment handovers" headerBgColor="cyan" summary={summaryHighlights} />
    <div data-cf-article-body className="mx-auto max-w-4xl px-4 py-8 prose prose-lg prose-indigo">
      <p>An AI-assisted build that runs on your laptop is not yet a demonstrated handover. If you want to deliver a scoped project for someone else, give its next operator the source identity, setup, commands, expected result and known failures. This guide supplies a completed teaching example you can inspect and repeat; it does not qualify you for client work or recommend an operating-system change.</p>
      <ArticleTocPlaceholder />
      <aside aria-label="Editorial correction" className="border-l-4 border-amber-500 pl-4">
        <p><strong>Correction — 9 September 2026:</strong> the original March issue attributed specific performance effects to Windows background services and used a gaming comparison to suggest advantages for development and AI workloads. We could not substantiate those detailed attributions from the accessible source, so they have been removed. This does not establish that the paper's results are false; it establishes a limit on what this article can responsibly report.</p>
      </aside>
      <h2 id="source-scope" className="scroll-mt-28">What the 2023 paper actually covers</h2>
      <p>Marek Kopel and Michał Bożek’s <a href="https://link.springer.com/chapter/10.1007/978-3-031-41456-5_48">“Is Proton Good Enough?” — A Performance Comparison Between Gaming on Windows and Linux</a> was published online on 13 September 2023 in the ICCCI 2023 proceedings. Its public abstract describes comparing Proton with native Windows for video gaming.</p>
      <p>The publisher page exposes an abstract, not the complete methods and results available through subscription access. This correction has not verified individual game outcomes, hardware configurations, driver versions, measured overhead or a causal explanation for any difference. We therefore give no numeric result, winner or recommendation based on those unavailable details.</p>
      <p>Valve’s <a href="https://github.com/ValveSoftware/Proton">official Proton repository</a> describes a Steam Play compatibility tool based on Wine and additional components for running Windows games on Linux. That is a specific purpose, not a blanket compatibility promise for development applications.</p>

      <h2 id="claim-boundary" className="scroll-mt-28">Separate a benchmark result from a new claim</h2>
      <div role="region" aria-label="Benchmark claim boundaries" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[42rem]">
        <caption>Evidence needed before repeating a performance claim</caption>
        <thead><tr><th>Claim</th><th>Needed evidence</th><th>Status in this article</th></tr></thead>
        <tbody>
          <tr><td>The paper compares gaming environments.</td><td>Publisher abstract and bibliographic record.</td><td>Checked.</td></tr>
          <tr><td>A particular game performed better on one setup.</td><td>Full results with workload, versions, settings and measurement method.</td><td>Not verified here.</td></tr>
          <tr><td>Background services caused the difference.</td><td>A design isolating that factor and considering alternatives.</td><td>Not established by the accessible abstract.</td></tr>
          <tr><td>The same advantage applies to AI inference or build pipelines.</td><td>A separate relevant benchmark with comparable output correctness and conditions.</td><td>No such benchmark was run for this article.</td></tr>
        </tbody>
      </table></div>
      <p>“Plausible explanation” and “measured cause” are different statements. Drivers, settings, caching, workload mix and measurement choices can change a comparison. Do not select a favourite explanation without evidence that separates it from alternatives.</p>

      <h2 id="builder-task" className="scroll-mt-28">The builder task: make your environment inspectable</h2>
      <p>If you use AI coding tools to deliver software, a more useful next step than choosing an OS winner is documenting the environment someone else needs to reproduce your work. Code that runs only on your laptop is not yet a demonstrated handover.</p>
      <p>The completed record below uses the <Link to="/articles/featured/best-way-to-learn-about-ai-2026">learning guide's review-only classification lab</Link>. Its seven existing files remain unchanged; this article adds five handover files. Both classifiers are keyword rules, <strong>not an AI model or client system</strong>. All fourteen examples are fictional and were visible during authoring.</p>
      <p>The read-only checker compares seven named files with <code>expected-files.json</code> and reports Node/V8, platform, architecture and kernel. It does not execute those files, inspect extra files, install dependencies or open a network connection. Its report excludes usernames, hostnames, local paths and environment-variable values. Hashes establish identity against this manifest, not authenticity if both are altered, runtime compatibility or protection against later file changes.</p>
      <details><summary>Copy a blank manifest for your own permitted project</summary><p>This template is not a completed reproduction claim. Fill it from actual observations, including container/VM layers where used.</p><pre className="whitespace-pre-wrap break-words"><code>{ENVIRONMENT_MANIFEST}</code></pre></details>
      <p>Keep secrets out of manifests and logs. Name required variables and how an authorised operator obtains them; do not publish tokens, customer records or unredacted machine paths. Ask permission before sharing client source or a reproduction bundle.</p>

      <h2 id="reproduction-exercise" className="scroll-mt-28">Download and repeat the recorded handover</h2>
      <p><a href="/downloads/environment-handover-kit.zip" download="environment-handover-kit.zip">Download the complete environment handover kit</a> — twelve files in two folders, including all seven learning-lab files. No package installation, API key, GPU or container is needed for these dependency-free Node scripts. The recorded run used Node {handover.fileInspection.environment.node} on macOS arm64; other versions and operating systems need their own verification.</p>
      <p>Extract the ZIP, keep its two folders together and open a terminal in their parent folder. Inspect the JavaScript first, then run each command separately:</p>
      <pre className="whitespace-pre-wrap break-words"><code>{"node --version\nnode environment-handover/inspect.mjs\nnode --test --test-reporter=tap ai-builder-lab/triage.test.mjs ai-builder-lab/change-review.test.mjs environment-handover/inspect.test.mjs\nnode ai-builder-lab/change-review.mjs"}</code></pre>
      <p>The inspector exits 0 for <code>FILES_MATCH</code>, 2 for a mismatch and 1 for invalid usage or manifest. The test command exits 0. The final change review deliberately exits <strong>2 / HOLD</strong> because the classifier still fails the teaching task. These are different checks: 24 passing code tests do not cancel that HOLD. See the handover for recording exit status in your shell.</p>
      <div role="region" aria-label="Recorded handover outcomes" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[42rem]">
        <caption>Actual local execution, 10 September 2026; not an independent recipient run</caption>
        <thead><tr><th>Check</th><th>Recorded outcome</th><th>What it does not establish</th></tr></thead>
        <tbody>
          <tr><td>File identity</td><td>{handover.fileInspection.files.length}/7 files match; exit {handover.commands[0].exitStatus}</td><td>The checker itself did not execute the lab or approve it.</td></tr>
          <tr><td>Executed code tests</td><td>{counts.pass}/{counts.tests} pass; {counts.fail} fail; exit {handover.commands[1].exitStatus}</td><td>15 lab tests and 9 checker tests reproduce behaviour, including known defects.</td></tr>
          <tr><td>Executed classification comparison</td><td>Baseline {comparison.baselineCorrect}/{comparison.total}; candidate {comparison.candidateCorrect}/{comparison.total}; {handover.commands[2].decision}, exit {handover.commands[2].exitStatus}</td><td>The full output matches the supplied change record, but retains {comparison.remainingFailures} failures including {comparison.regressions} regression.</td></tr>
          {handover.negativeChecks.map(row => <tr key={row.case}><td>{row.case}</td><td>{row.file.status}; exit {row.exitStatus}</td><td>Deliberately altered disposable copy; no source was executed by the checker.</td></tr>)}
        </tbody>
      </table></div>
      <p>For the candidate, c3 loses the active appointment-date request when the whole “not about” clause is discarded; c5 still misses “Can I reschedule?”. Keep both. The higher combined count is not general language understanding, customer accuracy or evidence from independent evaluation.</p>
      <p>The complete <a href="/downloads/environment-handover/HANDOVER.md" download="HANDOVER.md">HANDOVER.md</a> records all manifest fields, actual macOS/runtime versions, excluded dependencies, failure handling and pending recipient review. Other inspectable files:</p>
      <ul>{HANDOVER_FILES.filter(name => name !== "HANDOVER.md").map(name => <li key={name}><a href={"/downloads/environment-handover/" + name} download={name}>{name}</a></li>)}</ul>
      <p>The record was generated by a Codex-assisted local run. It identifies this uncommitted draft by file hashes; it does not attest a Git release or independent human review. Review even a minimal version/hash record before sharing. The checker does not sanitise other programs' logs, which may contain private paths or data.</p>
      <h3 className="scroll-mt-28" id="recipient-reproduction">What a recipient still needs to do</h3>
      <ol>
        <li>Record the downloaded source hashes, date, actual environment and exact commands. Do not overwrite the supplied author's record with your result.</li>
        <li>Run the tests and compare the full classification output with <code>change-record.json</code>. Preserve all failures and exit statuses, not only a headline score.</li>
        <li>Ask another person to follow the same instructions without your unstated setup steps. Record their environment and outcome separately. Their runtime fields may differ even if the source and deterministic result match.</li>
        <li>If the outcomes differ, reduce the problem to the smallest reproducible input. Note the mismatch before modifying dependencies or deleting a failing test.</li>
        <li>Update the manifest with both the working setup and what remains untested. A second local run is not an independent reproduction.</li>
      </ol>
      <p>No independent recipient has completed that review here. A second local run is <strong>not an independent reproduction</strong>. No Windows/Linux, clean-OS installation, GPU or API compatibility is claimed. If your project needs those, document and test them separately.</p>

      <h2 id="troubleshooting" className="scroll-mt-28">Troubleshoot the first difference, not the whole operating system</h2>
      <div role="region" aria-label="Environment handover troubleshooting" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[42rem]">
        <caption>Keep the first failure and change one relevant thing</caption>
        <thead><tr><th>Observation</th><th>Next check</th></tr></thead>
        <tbody>
          <tr><td>Node is unavailable</td><td>Use your team's approved runtime setup and record its version. This kit does not install it.</td></tr>
          <tr><td>Inspector exits 1</td><td>Check arguments and the supplied manifest. For a different folder use <code>--lab "PATH TO COPY"</code>.</td></tr>
          <tr><td>Missing or different file</td><td>Check extraction and exact names, then inspect the diff. Do not update the expected hash merely to hide a mismatch.</td></tr>
          <tr><td>File check passes, execution fails</td><td>Retain Node/OS, the first failing test and permitted input/output. Same source bytes do not prove compatibility.</td></tr>
          <tr><td>Tests pass, change review is HOLD</td><td>That is expected for this fixture. Correct the task failure in a separately versioned change; do not delete the failure case.</td></tr>
        </tbody>
      </table></div>
      <p>Practise a missing-file check only in a disposable copy: move <code>triage.mjs</code> out, inspect that copy, then restore it. The recorded demonstration did this and also checked a changed file. Neither result is evidence about an operating system's speed.</p>

      <h2 id="comparison-plan" className="scroll-mt-28">If performance matters, write a comparison plan first</h2>
      <p>Define the actual task, equivalent correct output, hardware/resource constraints and metric. For an inference workflow, distinguish completion latency, throughput and output quality; a faster wrong result is not an equivalent result. Record model/version, input set, concurrency, cache state and failures.</p>
      <p>Repeat runs under a documented procedure, preserve individual observations and report variability instead of choosing the fastest run. Separate setup or warm-up from measured work, explain which costs are included and avoid changing several factors while attributing the result to one. These are planning questions, not a completed experimental protocol or benchmark.</p>
      <p>Only claim support for the configurations tested. A local comparison does not establish a universal OS ranking, a customer's future workload performance or business savings.</p>

      <h2 id="handover" className="scroll-mt-28">Turn evidence into a useful handover</h2>
      <p>Include the manifest, permitted inputs, commands, expected output, failed cases and a clear account of your own contribution. Explain what AI coding tools generated, what you reviewed and why the result satisfies the requested behaviour. Ask a systems reviewer to reproduce consequential setup and compatibility claims before relying on them in client delivery.</p>
      <p>For a client project, also account for review and rework time: the <Link to="/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-4">coding delivery-effort guide</Link> separates code-writing speed from accepted delivery. When you have your own permitted build evidence—not just this supplied starter—you can use it in a Studio application.</p>
      <ArticleConversionCTA articleSlug={SLUG} config={BASE_ARTICLE_SEO_CONFIG["/articles/" + SLUG].conversion!} events={[]} placement="article-inline" />
      <p>Studio's public positioning is Australian; New Zealand contractor eligibility has not been verified here. <Link to="/contact">Confirm eligibility</Link> before assuming acceptance. If you are simply curious about these questions, find a relevant <Link to="/events">MLAI event</Link>. Application and project matching are not guaranteed.</p>
      <p><small>Source scope rechecked 10 September 2026: Springer public abstract and Valve repository documentation. The new kit was run locally; no full-text paper review, independent environment reproduction or OS/AI performance benchmark is claimed.</small></p>
      <ArticleFAQ items={faqItems} />
    </div>
  </div>;
}
