import { useEffect } from "react";
import type { ReactNode } from "react";
import { Home } from "lucide-react";
import { Link } from "react-router";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";
import ArticleTocPlaceholder from "~/components/articles/ArticleTocPlaceholder";
import review from "../../../../public/downloads/peas-agent-lab/recorded-review.json";

export const useCustomHeader = true;
export const CATEGORY = "featured";
export const SLUG = "what-is-an-intelligent-agent-in-artificial-intelligence";
export const DATE_PUBLISHED = "2026-05-09";
export const DATE_MODIFIED = "2026-09-10";
const TITLE = "Intelligent agents in practice: a runnable PEAS design lab";
export const DESCRIPTION = "Run a PEAS agent-design lab, compare a stale-record guard against its unchanged policy, and inspect reproducible tests, failures and a completed change review.";
const PATH = "/articles/" + CATEGORY + "/" + SLUG;
const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-6e3a2103-531c-4ceb-bcd4-4f23a2f12c58.jpg?alt=media&token=bc7c5df0-4795-4456-95a7-3444817ada68";
export const articleMeta = { title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO, imageAlt: "Two people looking toward a laptop, with one pointing at the screen" };
export const DOWNLOAD_FILES = ["agent.mjs", "agent.test.mjs", "freshness.mjs", "freshness.test.mjs", "recorded-review.json", "CHANGE-REVIEW.md", "README.md"];
const FILE_LABELS = ["original policy and simulation", "nine baseline tests", "freshness guard and comparison", "twelve extension tests", "executed comparison and source hashes", "completed review and handover", "instructions and limits"];
export const summaryHighlights = {
  heading: "From definition to testable behaviour",
  intro: "An agent receives observations and selects actions. PEAS makes its task explicit: Performance measure, Environment, Actuators and Sensors.",
  items: [
    { label: "For builders", description: "A small JavaScript lab for people learning to turn an AI-system brief into reviewable code and tests." },
    { label: "What runs", description: "A deterministic rule policy in a synthetic environment. No model, credentials, network or external actions." },
    { label: "What it proves", description: "Only the specified simulation cases—not production security, general intelligence or readiness for client work." },
  ],
};
export const faqItems = [
  { id: 1, question: "Does an intelligent agent have to use an LLM?", answer: "No. The general agent model concerns observations and actions. This lab uses a hand-written rule policy. An LLM can propose actions in a different implementation, but is not required to understand or test the environment boundary." },
  { id: 2, question: "What does PEAS stand for?", answer: "Performance measure, Environment, Actuators and Sensors. It describes the task and interfaces, not a guarantee that an implementation is correct or optimal." },
  { id: 3, question: "Is the lab learning from its results?", answer: "No. Lookup feedback changes the next action in one run. Each run starts fresh, and no training updates model parameters or improves the policy automatically." },
  { id: 4, question: "Does rollback undo real actions?", answer: "No. The supplied failure case restores an in-memory draft array. It does not test crash recovery, database transactions or undoing external emails or payments." },
];
const CONTENT_FACTORY_INSPECTOR_SCRIPT = "(function(){var protocol=2;var params=new URLSearchParams(window.location.search);if(!params.has('cfInspector'))return;function post(payload){try{window.parent.postMessage(Object.assign({source:'content-factory-inspector',protocolVersion:protocol},payload),'*');}catch(e){}}if(window.__cfArticleInspectorInstalled){post({type:'ready',mode:window.__cfArticleInspectorMode||'comment'});return;}window.__cfArticleInspectorInstalled=true;window.__cfArticleInspectorProtocolVersion=protocol;window.__cfArticleInspectorMode='comment';var style=document.createElement('style');style.textContent='[data-cf-component-id]{cursor:crosshair}.cf-inspector-hover,.cf-inspector-selected{outline:2px solid #7c3aed!important;outline-offset:3px}.cf-inspector-selected{outline-color:#2563eb!important}#cf-inspector-label{position:fixed;z-index:2147483647;pointer-events:none;border-radius:6px;background:#111827;color:white;padding:4px 8px;font:600 12px/1.4 ui-sans-serif,system-ui,sans-serif;box-shadow:0 8px 24px rgba(15,23,42,.22)}';document.head.appendChild(style);var label=document.createElement('div');label.id='cf-inspector-label';label.hidden=true;document.body.appendChild(label);var active=null;var selected=null;var measureQueued=false;function mode(){return window.__cfArticleInspectorMode||'comment';}function rect(el){var r=el.getBoundingClientRect();return{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};}function esc(value){return String(value||'').replace(/\"/g,'\\\\\"');}function byId(id){var nodes=document.querySelectorAll('[data-cf-component-id]');for(var i=0;i<nodes.length;i++){if(nodes[i].getAttribute('data-cf-component-id')===id)return nodes[i];}return null;}function componentData(el,type,event){var id=el.getAttribute('data-cf-component-id')||'';var r=rect(el);var payload={type:type,componentId:id,componentType:el.getAttribute('data-cf-component-type')||'',sourceSectionId:el.getAttribute('data-cf-source-section-id')||'',label:el.getAttribute('data-cf-component-label')||id,selector:'[data-cf-component-id=\"'+esc(id)+'\"]',rect:r};if(event){var width=r.width||1;var height=r.height||1;var x=Math.max(0,Math.min(1,(event.clientX-r.left)/width));var y=Math.max(0,Math.min(1,(event.clientY-r.top)/height));payload.click={x:event.clientX,y:event.clientY};payload.anchor={x:x,y:y,createdFrom:'live_preview_click'};}return payload;}function allComponents(){var nodes=document.querySelectorAll('[data-cf-component-id]');var out=[];for(var i=0;i<nodes.length;i++){out.push(componentData(nodes[i],'component'));}return out;}function postMeasure(){post({type:'measure',components:allComponents()});}function queueMeasure(){if(measureQueued)return;measureQueued=true;window.requestAnimationFrame(function(){measureQueued=false;postMeasure();});}function setSelected(id){if(selected)selected.classList.remove('cf-inspector-selected');selected=id?byId(id):null;if(selected)selected.classList.add('cf-inspector-selected');}function show(el){var rect=el.getBoundingClientRect();var name=el.getAttribute('data-cf-component-label')||el.getAttribute('data-cf-component-id')||'component';var kind=el.getAttribute('data-cf-component-type')||'component';label.textContent=name+' ('+kind+')';label.style.left=Math.max(8,Math.min(rect.left,window.innerWidth-260))+'px';label.style.top=Math.max(8,rect.top-32)+'px';label.hidden=false;}document.addEventListener('mouseover',function(event){var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;if(!target)return;if(active&&active!==target)active.classList.remove('cf-inspector-hover');active=target;target.classList.add('cf-inspector-hover');show(target);post(componentData(target,'hover'));},true);document.addEventListener('mouseout',function(event){if(!active)return;var next=event.relatedTarget;if(next&&active.contains(next))return;active.classList.remove('cf-inspector-hover');active=null;label.hidden=true;},true);document.addEventListener('click',function(event){var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;if(!target)return;event.preventDefault();event.stopPropagation();setSelected(target.getAttribute('data-cf-component-id')||'');post(componentData(target,mode()==='comment'?'comment:create':'select',event));queueMeasure();},true);document.addEventListener('scroll',queueMeasure,true);window.addEventListener('resize',queueMeasure);window.addEventListener('message',function(event){var message=event.data;if(!message||typeof message!=='object'||message.source!=='founder-tools-inspector')return;if(message.type==='setMode'){window.__cfArticleInspectorMode=message.mode==='inspect'?'inspect':'comment';post({type:'ready',mode:mode()});}else if(message.type==='measureComponents'){postMeasure();}else if(message.type==='scrollToComponent'){var target=byId(message.componentId||'');if(target){target.scrollIntoView({block:'center',inline:'nearest'});setSelected(message.componentId||'');setTimeout(queueMeasure,80);}}else if(message.type==='setSelectedComponent'){setSelected(message.componentId||'');}});post({type:'ready',mode:mode()});setTimeout(queueMeasure,0);})();"

function ContentFactoryInspectorBridge() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!new URLSearchParams(window.location.search).has('cfInspector')) return
    const script = document.createElement('script')
    script.dataset.contentFactoryInspector = 'true'
    script.textContent = CONTENT_FACTORY_INSPECTOR_SCRIPT
    document.body.appendChild(script)
    return () => {
      script.remove()
    }
  }, [])
  return null
}


function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} className="scroll-mt-24" data-cf-component-id={"section:" + id} data-cf-component-type="section" data-cf-component-label={title} data-cf-source-section-id={id}><h2 className="scroll-mt-24">{title}</h2>{children}</section>;
}
function ScrollTable({ label, children }: { label: string; children: ReactNode }) {
  return <div role="region" aria-label={label} tabIndex={0} className="my-6 max-w-full overflow-x-auto rounded border border-slate-300 px-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"><table className="min-w-[640px]">{children}</table></div>;
}
export default function ArticleContent() {
  return <div data-cf-article-body>
    <ContentFactoryInspectorBridge />
    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: TITLE, current: true }]} title={TITLE} titleHighlight="PEAS design lab" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
    <div className="prose prose-lg prose-slate max-w-none">
      <p>This tutorial is for early-career builders who can run JavaScript and want concrete design-and-test evidence. You do not need a paid AI account. If you are a business owner deciding what to commission, use the <Link to="/articles/featured/what-is-an-agent-in-artificial-intelligence">agent-or-simpler-workflow guide</Link> instead.</p>
      <p>You will run the original observation/action loop, inspect its failure cases and reproduce a completed freshness change. The comparison separates what a policy proposes from what its environment permits. All examples are synthetic; copying the supplied lab does not establish your own delivery experience.</p>
      <ArticleTocPlaceholder />
      <Section id="section-01" title="1. Specify the task with PEAS">
        <p><a href="https://inst.eecs.berkeley.edu/~cs188/textbook/search/agents.html">UC Berkeley’s agent-design notes</a> explain rational agents in terms of expected outcomes and define PEAS as a description of the task environment. Rationality is relative to the performance measure and available information, not consciousness, certainty or universal competence.</p>
        <p>Our original teaching scenario prepares an internal draft for a fictional maintenance request. It is deliberately small enough to inspect completely. The rule policy is not claimed to be optimal, learned or a modern autonomous LLM product.</p>
        <ScrollTable label="PEAS task specification">
          <thead><tr><th>PEAS element</th><th>Lab specification</th><th>What changes in code</th></tr></thead>
          <tbody>
            <tr><td>Performance</td><td>One draft only for a permitted, complete request with a successful lookup; otherwise refuse or escalate within the step limit</td><td>Assertions on status, drafts and trace length—not a “looks intelligent” score</td></tr>
            <tr><td>Environment</td><td>One synthetic request, a simulated lookup and an in-memory draft list</td><td>Input fixture and isolated state per run</td></tr>
            <tr><td>Actuators</td><td>lookup, draft, refuse, escalate</td><td>Action allowlist and readiness checks; no send or delete implementation</td></tr>
            <tr><td>Sensors</td><td>Location-present flag, request-permitted flag and latest lookup status</td><td>Frozen observation; the policy does not see the future lookup result</td></tr>
          </tbody>
        </ScrollTable>
        <p>The environment has a hidden lookup outcome until the lookup runs. The policy cannot simply inspect the test’s answer beforehand. This makes the observation boundary visible without pretending that the three possible lookup results represent real-world complexity.</p>
      </Section>
      <Section id="section-02" title="2. Save and run the actual lab">
        <p>Save all seven files in the same folder. Review the code before execution. It uses Node’s built-in modules and needs no package installation:</p>
        <ul>
          {DOWNLOAD_FILES.map((file, index) => <li key={file}><a href={"/downloads/peas-agent-lab/" + file} download>{file}</a> — {FILE_LABELS[index]}</li>)}
        </ul>
        <p>With Node.js 22 or later available, open a terminal in that folder:</p>
        <pre><code>{"node agent.mjs\nnode --test agent.test.mjs freshness.test.mjs\nnode freshness.mjs --review"}</code></pre>
        <p>The normal baseline run prints <code>status: drafted</code>, one draft marked <code>needs-human-review</code> and the trace below. The nine baseline and twelve extension tests should pass: 21 total. The review command deliberately exits with code 2 and <code>REVIEW_REQUIRED</code>; section 4 explains why. No real message, booking or payment is performed.</p>
        <ScrollTable label="Baseline execution trace">
          <thead><tr><th>Step</th><th>Observed lookup</th><th>Selected action</th><th>Environment result</th></tr></thead>
          <tbody><tr><td>1</td><td>not-run</td><td>lookup</td><td>ok</td></tr><tr><td>2</td><td>ok</td><td>draft</td><td>draft-created; run stops for human review</td></tr></tbody>
        </ScrollTable>
        <p>This is an execution trace from the supplied deterministic fixture, not a model’s hidden reasoning. <code>externalActions: 0</code> is zero because this program has no external-action tools, not because an independent security monitor has certified it.</p>
      </Section>
      <Section id="section-03" title="3. Change the environment and inspect failure">
        <p>Create an exercise file beside the downloaded module. This example simulates an unavailable tool:</p>
        <pre><code>{'import { simulate } from "./agent.mjs";\nconsole.log(simulate({\n  id: "exercise-1", hasLocation: true,\n  lookupResult: "unavailable", requestedAction: "prepare-draft"\n}));'}</code></pre>
        <ScrollTable label="PEAS failure exercises">
          <thead><tr><th>Change</th><th>Expected result</th><th>Boundary demonstrated</th></tr></thead>
          <tbody>
            <tr><td>hasLocation: false</td><td>escalated, no draft</td><td>Missing required information is not invented</td></tr>
            <tr><td>lookupResult: unavailable or conflict</td><td>lookup followed by escalation</td><td>Failed or contradictory evidence does not permit a draft</td></tr>
            <tr><td>requestedAction: send; policy returns draft</td><td>refused, no draft</td><td>The simulator enforces the request boundary even when the policy does not</td></tr>
            <tr><td>Policy always selects lookup; maxSteps: 3</td><td>step-limit after three actions</td><td>Repeated allowed actions terminate</td></tr>
            <tr><td>failWrite: true</td><td>draft-write-failed; empty draft list</td><td>Only the simulated in-memory change is rolled back</td></tr>
            <tr><td>Policy selects draft before lookup</td><td>draft-precondition-failed</td><td>A selected action still needs valid prerequisites</td></tr>
          </tbody>
        </ScrollTable>
        <p>Inspect expected status and the absence of an unintended draft, not only the error message. A test that checks merely whether the function returns can pass while the behaviour is wrong.</p>
      </Section>
      <Section id="section-04" title="4. Use an AI coding tool without outsourcing the acceptance criteria">
        <p>This teaching asset was drafted with AI coding assistance and checked with the supplied automated tests. That is not independent human review or a client deployment. For your extension, keep a record of the coding tool/model, date, request, proposed diff, rejected suggestions and actual test output.</p>
        <blockquote><p>Read this simulator and its tests. Propose one new failure fixture within the current synthetic schema. Explain which PEAS boundary it exercises. Add a failing test before proposing a fix. Do not remove the action allowlist, readiness checks or existing assertions. Do not add network calls or credentials.</p></blockquote>
        <p>Inspect the proposed change before running it. If the coding tool changes the expected result simply to make the test pass, reject that change unless the task specification itself was intentionally revised and documented. Keep the baseline as a comparison and explain why the new implementation is better.</p>
        <p><strong>Completed extension:</strong> the new task permits a draft only when a successful lookup has a known record age between 0 and {review.maxAgeMs.toLocaleString("en-AU")} milliseconds inclusive. Unknown, future-dated and older records require escalation. This 60-second limit is our teaching assumption, not a production recommendation. Both timestamps are supplied synthetic integers, not readings from a real clock.</p>
        <p>The original simulator receives its original four fields; it has no timestamp schema. The new wrapper adds <code>recordedAtMs</code> and <code>checkedAtMs</code>, exposing age/status only after lookup succeeds. It keeps the same rule policy and enforces freshness at the action boundary. This is a changed task requirement and environment permission—not a learned or smarter policy, or proof that the baseline violated its older specification.</p>
        <ScrollTable label="Freshness contract comparison">
          <thead><tr><th>Visible fixture</th><th>New requirement</th><th>Original simulator</th><th>Guarded simulator</th></tr></thead>
          <tbody>{review.cases.map(row => <tr key={row.id}><td>{row.label}</td><td>{row.expected}</td><td>{row.baseline.status}{row.baseline.matchesContract ? "" : " — fails new requirement"}</td><td>{row.guarded.status}</td></tr>)}</tbody>
        </ScrollTable>
        <p>The executed record shows {review.summary.baselineMatches}/{review.summary.total} matching cases for the original simulator and {review.summary.guardedMatches}/{review.summary.total} for the guarded version. All seven fixtures were visible while authoring; none is an independent held-out benchmark. Tests that reproduce these results are not permission to deploy.</p>
        <ScrollTable label="Stale record decision trace">
          <thead><tr><th>Step</th><th>Visible freshness / age</th><th>Proposed action</th><th>Enforced action / reason</th></tr></thead>
          <tbody>{review.cases.find(row => row.id === "stale")!.decisionTrace.map(row => <tr key={row.step}><td>{row.step}</td><td>{row.observation.recordStatus} / {row.observation.recordAgeMs === null ? "not observed" : `${row.observation.recordAgeMs} ms`}</td><td>{row.proposed}</td><td>{row.enforced} / {row.guardReason ?? "no freshness override"}</td></tr>)}</tbody>
        </ScrollTable>
        <p>Notice the second step still records a proposed <code>draft</code>. The guard changes execution to <code>escalate</code>; it must not erase the policy’s proposal. The downloadable JSON preserves every case and source hashes. The completed <code>CHANGE-REVIEW.md</code> records rationale, actual results, AI assistance, limits and recipient instructions. Its decision remains <code>{review.decision}</code>: independent technical and recipient review have not occurred.</p>
      </Section>
      <Section id="section-05" title="5. State what this lab does not test">
        <p>The simulation does not implement real authentication, persistent duplicate prevention, concurrency, process isolation, live tool timeouts, crash recovery or prompt-injection defence. The policy is trusted synchronous local code: an infinite loop inside it can hang the process despite the step limit. Never run untrusted generated code on the assumption that this harness contains it.</p>
        <p>No language model learns here. Tool feedback changes the next action in one run; nothing persists between runs and no model parameters change. Adding an asynchronous LLM or a live tool requires a separate design for timeouts, access, cost, data handling and recovery—not simply replacing the policy function and claiming the same tests prove safety.</p>
        <p>For further architecture context, <a href="https://www.anthropic.com/engineering/building-effective-agents">Anthropic distinguishes predefined workflows from model-directed agents</a>. That distinction prevents this simple rule policy from being presented as evidence of an LLM’s planning ability.</p>
        <p>The rollback test restores an array after an injected failure. It does not undo an email or payment. A real deployment must describe irreversible consequences and test the actual system boundary.</p>
        <p>The freshness extension fixes both fixture clocks for the whole run. It does not test clock trust or skew, elapsed time during a real tool call, record changes between checking and acting, or concurrent writes. Frozen observations constrain the intended interface, not trusted code sharing the same process. Removing the guard would restore the three freshness failures, not provide a safe real-world rollback.</p>
      </Section>
      <Section id="section-06" title="6. Turn the exercise into honest delivery evidence">
        <p>Before sharing your work, include the PEAS table, instructions, baseline output, one failure you added, the reviewed diff, test results and known limits. Ask another person to run it from those instructions; record what failed or needed explanation. Do not label that verification complete until it happens.</p>
        <p>If you already have broader delivery evidence, show MLAI Studio what you shipped, how you used AI coding tools and how you tested the boundaries. This lab alone is not proof of client readiness. Applications are considered for scoped paid work; selection, available projects and portfolio publication rights are not guaranteed. Current intake asks about contracting in Australia; confirm eligibility before assuming a New Zealand pathway.</p>
        <div data-cf-component-id="cta" data-cf-component-type="conversion-cta" data-cf-component-label="Builder evidence application">
          <ArticleConversionCTA articleSlug={CATEGORY + "/" + SLUG} config={BASE_ARTICLE_SEO_CONFIG[PATH].conversion!} events={[]} placement="article-inline" />
        </div>
        <p>Still learning? Choose an appropriate <Link to="/events">MLAI event</Link> and bring a specific test question. For a complementary evidence exercise, see the <Link to="/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-5">agent-trace lab and its provenance limits</Link>.</p>
      </Section>
      <p><small>Primary sources checked 10 September 2026. The lab is an original synthetic teaching example, not Berkeley- or Anthropic-endorsed software. The Anthropic source supplies an architectural distinction, not a current tool recommendation. These tests establish only the cases described above.</small></p>
      <div data-cf-component-id="faq" data-cf-component-type="faq" data-cf-component-label="Lab questions"><ArticleFAQ items={faqItems} /></div>
    </div>
  </div>;
}
