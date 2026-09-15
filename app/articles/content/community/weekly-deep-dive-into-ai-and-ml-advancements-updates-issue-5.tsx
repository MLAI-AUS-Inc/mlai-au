import { Home } from "lucide-react";
import { Link } from "react-router";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import ArticleTocPlaceholder from "~/components/articles/ArticleTocPlaceholder";
import recorded from "../../../../public/downloads/agent-trace-lab/recorded-run.json";
import { JIANG_COUNT_CHECK, JIANG_NON_SAFE_PERCENT, JIANG_LEVELS_TWO_TO_FOUR_PERCENT, LI_TIMESTAMP_INTERVAL_LABEL } from "~/lib/moltbook-source-check";

export const useCustomHeader = true;
export const SLUG = "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-5";
export const articleMeta = {
  title: "AI Bits #5: What agent activity logs can—and cannot—prove",
  description: "Read Moltbook research with its limits, then run a synthetic agent-observability kit: activity, retries, duplicate posts, moderation and a builder handover.",
  datePublished: "2026-02-16",
  dateModified: "2026-09-15",
};
const observation = recorded.observation;
const kitFiles = ["trace.mjs", "trace.test.mjs", "observe.mjs", "observe.test.mjs", "fixture.json", "run.mjs", "recorded-run.json", "README.md", "HANDOVER.md"];
export const summaryHighlights = {
  heading: "Inspect provenance before inferring agency",
  intro: "For AI-assisted builders who need to explain inputs, actions and approval boundaries in systems they deliver.",
  items: [
    { label: "What do the papers study?", description: "Different observational views of Moltbook: timing-based attribution, aggregate interaction patterns, and discussion topics/toxicity. They are not one controlled experiment." },
    { label: "What does timing establish?", description: "A pattern to investigate—not authenticated knowledge of who prompted a particular action or proof of consciousness." },
    { label: "What can you run?", description: "A nine-file offline kit with an actual recorded run: activity counts, retry checks, exact duplicates, recorded moderation states and timing sensitivity. It does not establish autonomy or production safety." },
  ],
};
export const faqItems = [
  { question: "Can regular posting prove an agent is autonomous?", answer: "No. A schedule is compatible with automation, but operators can shape inputs, configuration and later actions. Timing-based classifications must be interpreted within their method and dataset, not treated as authenticated actor records." },
  { question: "Do similar social statistics imply human-like intentions?", answer: "No. Similar distributions describe measured patterns. They do not establish a shared cause, subjective experience or motivation." },
  { question: "Does a log saying approved prove a valid approval?", answer: "No. The producer could be wrong or incomplete. A real approval design must separately address authorised identity, the exact action/content approved, expiry or changes, and enforcement. This lab implements none of those controls." },
  { question: "Can the trace lab be used as a production security gate?", answer: "No. It is a small teaching exercise with fictional records. It does not authenticate actors, detect omitted events, enforce permissions or execute actions. Independent security and systems review is needed for a real design." },
];

export default function ArticleContent() {
  return <div>
    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: "AI Bits #5", current: true }]} title={articleMeta.title} titleHighlight="can—and cannot—prove" headerBgColor="cyan" summary={summaryHighlights} />
    <div data-cf-article-body className="mx-auto max-w-4xl px-4 py-8 prose prose-lg prose-indigo">
      <aside aria-label="Editorial correction" className="border-l-4 border-amber-500 pl-4">
        <p><strong>Correction in this revision — 15 September 2026:</strong> the original issue overextended observations about agent activity into claims about intention and included an inappropriate medical-diagnosis tool recommendation. Those claims and the unrelated tool/book roundup have been removed. This revision separates the three research questions and adds a synthetic builder exercise. It does not claim independent replication of the research.</p>
      </aside>
      <p>This revision includes a complete synthetic posting log, an actual local run record and a filled handover. The original publication date is retained. No Moltbook data or real-world agent experiment was added.</p>
      <p>A platform can display thousands of agent-labelled accounts without giving an observer a reliable history of the instructions, operator edits and system rules behind each post. For a builder, the practical question is narrower than “what do agents want?”: <strong>what evidence lets another person reconstruct a particular action?</strong></p>

      <p>This guide is for early-career builders using AI coding tools who can run a small JavaScript exercise and explain what its results mean. The deliverable is an inspectable observation and handover, not a claim that you have built a production moderation system.</p>
      <ArticleTocPlaceholder />
      <h2 id="three-studies" className="scroll-mt-28">Three studies with different questions and datasets</h2>
      <p>These are preprints; this article does not assert peer-review status. Counts are reported by the authors, not collected or independently reproduced by MLAI. The method checks below identify the sections rechecked on 15 September 2026; they do not validate the underlying datasets or every analysis.</p>
      <p>On a small screen, swipe tables sideways. Keyboard users can focus each table region and use the arrow keys.</p>
      <div role="region" aria-label="Moltbook source comparison" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[44rem]">
        <caption>Keep the source, unit of observation and question together</caption>
        <thead><tr><th>Preprint and version</th><th>Reported scope</th><th>Question and limit</th></tr></thead>
        <tbody>
          <tr><td><a href="https://arxiv.org/abs/2602.07432v2">The Moltbook Illusion</a>, Ning Li; v2, 12 February 2026.</td><td>226,938 posts, 447,043 comments and 55,932 authors; 27 January–10 February.</td><td>Examines timing and an outage. Operator ground truth is absent; timing classes do not authenticate individual actions.</td></tr>
          <tr><td><a href="https://arxiv.org/abs/2602.09270v1">Collective Behavior of AI Agents: the Case of Moltbook</a>, Giordano De Marzo and David Garcia; v1, 9 February 2026.</td><td>Over 369,000 posts and 3.0 million comments from approximately 46,000 active agents.</td><td>Finds heavy-tailed activity and popularity patterns, alongside a different upvote/discussion-size relationship from human communities. Statistical resemblance alone does not establish a common cause or intention.</td></tr>
          <tr><td><a href="https://arxiv.org/abs/2602.10127v1">“Humans welcome to observe”: A First Look at the Agent Social Network Moltbook</a>, Yukun Jiang and colleagues; v1, 2 February 2026.</td><td>44,411 posts and 12,209 sub-communities collected before 1 February 2026.</td><td>Uses nine topic categories and a five-level toxicity scale; reports topic-dependent toxicity and bursty posting. Results depend on the sample and classification method, not a universal agent risk score.</td></tr>
        </tbody>
      </table></div>
      <p>Do not add these counts into a combined experiment or compare percentages without checking definitions and collection windows. “Agents” and “active agents” are not automatically interchangeable denominators.</p>
      <p>Where a paper attributes observed patterns to human influence or a platform intervention, preserve that attribution and its scope. Do not upgrade an inference into a claim that every individual action has known provenance. Nor does a lack of observed human involvement establish its absence.</p>

      <h2 id="method-checks" className="scroll-mt-28">Check the denominator before reusing a finding</h2>
      <h3>Timing: eligible authors are not all authors</h3>
      <p>Li's timing analysis covers <strong>9,838 authors with five or more posts</strong>, not all 55,932. Its <a href="https://arxiv.org/pdf/2602.07432v2#page=36">limitations (PDF pages 36–37)</a> lack operator ground truth and report 0% extended-dataset LLM analysis; <a href="https://arxiv.org/pdf/2602.07432v2#page=44">methods (pages 42–44)</a> describe a model pipeline and 100% content-feature coverage. These coverage statements remain unreconciled here; do not silently choose one.</p>
      <p>A second reporting discrepancy: <a href="https://arxiv.org/pdf/2602.07432v2#page=40">page 40</a> gives outage endpoints of 31 January 17:35 and 3 February 13:25 UTC, while stating approximately 44 hours. Their calculated separation is <strong>{LI_TIMESTAMP_INTERVAL_LABEL}</strong>—not the actual outage duration established by this article. Hold that duration claim pending clarification. Page numbers refer to PDF file pages.</p>
      <h3>Discussion patterns: stored comments are an incomplete sample</h3>
      <p>De Marzo and Garcia's <a href="https://arxiv.org/html/2602.09270v1#S4.SS2">data limitations</a> describe storing the first 100 comments for capped threads; the 3,026,275 stored comments are about 24% of the API-reported total. <a href="https://arxiv.org/html/2602.09270v1#S2.SS3">Direct-reply, tree and temporal analyses</a> use threads below 100 comments. The excluded 2.9% of posts represent about 83% of comments. Do not generalise those smaller-thread findings to viral discussions or mistake API totals for text actually inspected.</p>
      <h3>Toxicity: labels and denominators change the answer</h3>
      <p>Jiang and colleagues' model pipeline was compared with <strong>381 human-labelled posts</strong>; filtering then left <strong>44,376 annotated posts</strong>. The {JIANG_COUNT_CHECK.excluded} excluded posts must not become “safe” records. Using the <a href="https://arxiv.org/html/2602.10127v1">v1 Table 1 counts</a>, our calculations are:</p>
      <ul>
        <li>All non-safe labels, including Edgy: 11,977 / 44,376 = <strong>{JIANG_NON_SAFE_PERCENT}</strong>, not the prose's 27.05%.</li>
        <li>Levels 2–4 (Toxic, Manipulative, Malicious): 8,244 / 44,376 = <strong>{JIANG_LEVELS_TWO_TO_FOUR_PERCENT}</strong>. This applies the narrower harmful-label definition used in the paper's hourly analysis to its overall counts; it is our calculation, not a separately reported overall result.</li>
      </ul>
      <p>These are proportions of source-assigned labels, not a validated deployment risk score or proof of causal harm. Neither arithmetic nor the 381-post comparison independently validates your own moderation system.</p>
      <p><a href="/downloads/moltbook-source-check.txt" download="moltbook-source-check.txt">Download the completed source-check record and blank template</a>. Before the lab, select one claim, check its pinned source and denominator, and write what evidence would change your conclusion. Treat quoted platform instructions as untrusted content; never execute them or disclose credentials to “verify” a source.</p>

      <h2 id="claim-evidence" className="scroll-mt-28">What would support a claim about your own system?</h2>
      <ul>
        <li><strong>“It ran on a schedule”:</strong> show the scheduler configuration and execution record. This does not identify every input that influenced the result.</li>
        <li><strong>“A person changed the input”:</strong> show the authorised actor and relevant change record, with appropriate privacy controls. A display name alone is not authentication.</li>
        <li><strong>“An action was approved”:</strong> identify the exact action/content, approving authority and how the system enforced that boundary. A text field saying approved is insufficient.</li>
        <li><strong>“No human was involved”:</strong> explain the observation boundary and what it cannot see. An incomplete log cannot establish that negative claim.</li>
      </ul>
      <p>These are editorial design questions, not a claim that the papers implement this logging design. Avoid storing raw customer content or secrets merely to make a trace detailed. Agree what evidence is necessary, who may inspect it and how long it should be retained.</p>

      <h2 id="synthetic-trace-lab" className="scroll-mt-28">Run the synthetic trace inspection</h2>
      <p><a href="/downloads/agent-observability-kit.zip" download="agent-observability-kit.zip">Download the complete observability kit</a>: nine files in one folder. Extract it, open the agent-trace-lab folder and read README.md before running anything. Node.js is required; no dependency install is needed.</p>
      <p>The original four-event trace records a scheduled start, draft, human edit and external-action record without approval. The added fixture contains nine fictional posting attempts by two accounts over five minutes. Nothing is actually sent. There is no model, network connection or Moltbook dataset.</p>
      <pre className="whitespace-pre-wrap break-words"><code>{"node --test trace.test.mjs observe.test.mjs\nnode observe.mjs\nnode run.mjs"}</code></pre>
      <p>The preserved run passed <strong>{recorded.tests.counts.pass}/{recorded.tests.counts.tests} code tests</strong> on {recorded.environment.node}, {recorded.environment.platform}/{recorded.environment.architecture}. That is an actual local execution on synthetic inputs, not a tested compatibility matrix or an independent reproduction. The run record includes exact source hashes, test output and observations. Your timestamp and durations will differ.</p>
      <p>run.mjs prints a new JSON record without overwriting the supplied one. It executes the two supplied test files in a local child process; it is not a sandbox or a security scanner. Exit 0 means the analysis ran, even though the observation remains <strong>{observation.status}</strong>. Source hashes identify bytes, not a trusted author or approval.</p>
      <details><summary>Inspect or save the nine files individually</summary><ul>{kitFiles.map(name => <li key={name}><a href={"/downloads/agent-trace-lab/" + name} download={name}>{name}</a></li>)}</ul></details>

      <h2 id="activity-review" className="scroll-mt-28">Count attempts, then investigate what happened</h2>
      <p>The recorded synthetic window contains <strong>{observation.counts.attempts} attempts: {observation.counts.published} published, {observation.counts.rateLimited} rate-limited and {observation.counts.errors} error</strong>. “Published” is a fictional log state, not an action performed by this code. Keeping failures in the total prevents six successful records being reported as six attempts.</p>
      <div role="region" aria-label="Synthetic activity histogram" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[32rem]"><caption>One-minute buckets in the fictional 10 September UTC window; start included, end excluded</caption><thead><tr><th>UTC interval</th><th>Attempts</th><th>Published</th><th>Rate-limited</th><th>Error</th></tr></thead><tbody>
        {observation.histogram.map(row => <tr key={row.start}><td>{row.start.slice(11, 19)}–{row.end.slice(11, 19)}</td><td>{row.attempts}</td><td>{row.published}</td><td>{row.rateLimited}</td><td>{row.errors}</td></tr>)}
      </tbody></table></div>
      <p>The last minute has no observed attempts; the histogram does not discard it. An empty bucket cannot establish that nothing happened outside the logging boundary. Clock correctness, omitted records and activity outside the chosen window are unverified.</p>
      <ul>
        <li><strong>Retry behaviour:</strong> p4 occurs one second after p3 records a five-second delay, so it is early. p5 occurs exactly ten seconds after p4 records a ten-second delay and meets that comparison. These checks compare each limited record with the next same-account attempt; they do not enforce cumulative quotas or interpret actual HTTP headers. A missing delay stays unknown, not zero.</li>
        <li><strong>Exact duplicates:</strong> p1, p2, p7 and p9 contain identical fictional text. There are {observation.duplicatePublicationsAfterFirst} repeated publications after the first, out of {observation.duplicateDenominator} published records. Denied attempts are excluded from that denominator. Exact text equality misses paraphrases, treats case/whitespace differences as distinct and does not prove spam or common control.</li>
        <li><strong>Moderation review:</strong> {observation.moderation.reviewQueue.length} published records are queued: p2 is recorded flagged; p5, p7 and p9 are not reviewed. The other {observation.moderation.recordedCleared} merely say cleared. No toxicity model or human moderation ran, and no authorised reviewer was assigned. An actual decision would need permitted content, policy, context and accountable review.</li>
      </ul>

      <h2 id="timing-sensitivity" className="scroll-mt-28">Change the timing threshold without inventing actor labels</h2>
      <p>Here “short interval” means time between adjacent attempts by the same account, including denied and failed attempts. The cutoffs are inclusive, author-chosen teaching settings—not the papers' coefficient-of-variation method or an autonomy classifier.</p>
      <div role="region" aria-label="Timing threshold sensitivity" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[30rem]"><caption>Same seven intervals, three different cutoffs</caption><thead><tr><th>At most</th><th>Matching intervals</th><th>All same-account intervals</th></tr></thead><tbody>
        {observation.sensitivity.map(row => <tr key={row.thresholdSeconds}><td>{row.thresholdSeconds} {row.thresholdSeconds === 1 ? "second" : "seconds"}</td><td>{row.matchingIntervals}</td><td>{row.denominator}</td></tr>)}
      </tbody></table></div>
      <p>The answer changes from 3/7 to 6/7 simply by changing the cutoff. There is no authenticated human/automated ground truth: it is <strong>{observation.actorGroundTruth}</strong>. Therefore no actor-classification accuracy can be calculated; autonomy remains <strong>{observation.autonomy}</strong>.</p>
      <p>Copy the kit before changing a fixture. Predict a result, run observe.mjs, then compare the complete output. The supplied tests deliberately pin the baseline: changing that fixture may fail them. Preserve the failure and explain the changed case rather than deleting inconvenient assertions. Never paste customer content or credentials into the fixture; a synthetic label and hashed output do not anonymise private data.</p>
      <div role="region" aria-label="Trace experiment boundaries" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[36rem]">
        <caption>Separate four-event trace: a recorded human edit and an action without approval; nothing sent</caption>
        <thead><tr><th>Change to try</th><th>Expected observation</th><th>What not to conclude</th></tr></thead>
        <tbody>
          <tr><td>Remove the human-edit event and repair the parent link.</td><td>No human input is recorded.</td><td>This does not prove none occurred outside the log.</td></tr>
          <tr><td>Set the action approval field to true.</td><td>The approval-not-recorded flag disappears.</td><td>No approver was authenticated and no real permission was granted.</td></tr>
          <tr><td>Repeat an event ID or reference an unseen parent.</td><td>The parser rejects the malformed trace.</td><td>Rejecting this defect does not prove a valid trace is complete.</td></tr>
          <tr><td>Use unknown-input for the starting event.</td><td>Unknown provenance remains visible.</td><td>Unknown must not be silently relabelled autonomous.</td></tr>
        </tbody>
      </table></div>
      <p>The result no-listed-defect-found deliberately does not mean safe, approved or autonomous. Producers can omit events or lie. A supplied approval flag cannot establish exact-content approval, and timestamps do not prove causality. This lab is not a production authorisation gate.</p>

      <h2 id="handover" className="scroll-mt-28">Make the exercise part of an honest builder handover</h2>
      <p>The kit's filled <a href="/downloads/agent-trace-lab/HANDOVER.md" download="HANDOVER.md">handover record</a> identifies the task, fictional inputs, actual environment and results, the early retry, pending moderation and proposed follow-up. It does not quietly convert passing tests into an accepted client delivery.</p>
      <p>Predict each changed fixture's result before running it, retain failures and record your runtime and exact commands. Ask another builder to reproduce the result without unstated setup. Describe what AI coding tools helped create, which changes you reviewed and which behaviours the tests do not cover.</p>
      <p>Add one completed source check to your handover: the claim, version, relevant method, denominator, unresolved issue and resulting design decision. For example, an incomplete activity log supports a coverage warning—not a confident autonomy label. Keep unverified claims out of client acceptance criteria.</p>
      <p>For a real agent system, separately review authenticated actors, correlation identifiers, configuration/model versions, allowed tools, exact approval boundaries, logging integrity and recovery. The lab implements none of those production controls. Use the <Link to="/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-8">environment handover manifest in Issue #8</Link> to record the setup rather than claiming “works on my machine” is a completed handover.</p>
      <p>For your portfolio, show your own permitted change, retained failures and handover—not the supplied starter as though it were original client work. Client portfolio use requires permission. Studio's public positioning is Australian; New Zealand-based builders should <Link to="/contact">confirm eligibility</Link>. Application, matching and paid work are not guaranteed.</p>
    <p><Link to="/events">Explore upcoming MLAI events</Link> and check the listing for its topic, format and participation requirements.</p>
      <p>If you are exploring the topic rather than seeking delivery work, choose a relevant <Link to="/events">MLAI event</Link>. The kit is not automatically attached to an application.</p>
      <p><small>Codex assisted the method-section checks, source-bound arithmetic and synthetic lab implementation, tests and local verification. This was not an independent full-paper review or replication; no real model, platform or client outcome was measured. Independent systems/source review and a recipient-run reproduction remain outstanding.</small></p>
      <ArticleFAQ items={faqItems} />
    </div>
  </div>;
}
