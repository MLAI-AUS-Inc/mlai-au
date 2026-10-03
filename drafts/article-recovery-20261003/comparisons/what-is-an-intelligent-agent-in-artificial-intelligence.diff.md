# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/what-is-an-intelligent-agent-in-artificial-intelligence.tsx
+++ unreviewed-local-draft/app/articles/content/featured/what-is-an-intelligent-agent-in-artificial-intelligence.tsx
@@ -1,104 +1,41 @@
-import { useEffect } from 'react'
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
+import { useEffect } from "react";
+import type { ReactNode } from "react";
+import { Home } from "lucide-react";
+import { Link } from "react-router";
+import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
+import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
+import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
+import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";
+import ArticleTocPlaceholder from "~/components/articles/ArticleTocPlaceholder";
+import review from "../../../../public/downloads/peas-agent-lab/recorded-review.json";

-export const useCustomHeader = true
-
-const TOPIC = "What Is an Intelligent Agent in Artificial Intelligence?"
-export const CATEGORY = "featured"
-export const SLUG = "what-is-an-intelligent-agent-in-artificial-intelligence"
-export const DATE_PUBLISHED = "2026-05-09"
-export const DATE_MODIFIED = "2026-05-09"
-export const DESCRIPTION = "What is intelligent agent in artificial intelligence? Learn how agents perceive, decide, act and support goal-directed AI workflows."
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-6e3a2103-531c-4ceb-bcd4-4f23a2f12c58.jpg?alt=media&token=bc7c5df0-4795-4456-95a7-3444817ada68"
-const HERO_IMAGE_ALT = "Close-up of teammates mapping AI intelligent agent decisions on a laptop in a candid workshop moment"
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
-  { id: 1, question: "What is a real-world example of an intelligent agent?", answer: "A contact centre AI agent is one example. It can ask questions, use the answers to look up relevant information, and respond with a possible solution." },
-  { id: 2, question: "How does an intelligent agent work?", answer: "An intelligent agent works as a loop: it observes its environment, reasons about the next useful action, and then acts to move closer to a goal." },
-  { id: 3, question: "What makes an AI system an agent instead of a normal AI feature?", answer: "The difference is action. A passive model or dashboard may show information, while an agent uses information from its environment to choose and perform goal-directed steps." },
-  { id: 4, question: "Why does rationality matter in intelligent agent design?", answer: "Rationality helps define what counts as a good action. A rational agent aims for the best available or best expected outcome within its goals, context and limits." },
-  { id: 5, question: "What is PEAS in intelligent agent design?", answer: "PEAS stands for performance measure, environment, actuators and sensors. It helps builders define success, the operating context, how the agent gathers information and how it acts." },
-]
-
+export const useCustomHeader = true;
+export const CATEGORY = "featured";
+export const SLUG = "what-is-an-intelligent-agent-in-artificial-intelligence";
+export const DATE_PUBLISHED = "2026-05-09";
+export const DATE_MODIFIED = "2026-09-10";
+const TITLE = "Intelligent agents in practice: a runnable PEAS design lab";
+export const DESCRIPTION = "Run a PEAS agent-design lab, compare a stale-record guard against its unchanged policy, and inspect reproducible tests, failures and a completed change review.";
+const PATH = "/articles/" + CATEGORY + "/" + SLUG;
+const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-6e3a2103-531c-4ceb-bcd4-4f23a2f12c58.jpg?alt=media&token=bc7c5df0-4795-4456-95a7-3444817ada68";
+export const articleMeta = { title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO, imageAlt: "Two people looking toward a laptop, with one pointing at the screen" };
+export const DOWNLOAD_FILES = ["agent.mjs", "agent.test.mjs", "freshness.mjs", "freshness.test.mjs", "recorded-review.json", "CHANGE-REVIEW.md", "README.md"];
+const FILE_LABELS = ["original policy and simulation", "nine baseline tests", "freshness guard and comparison", "twelve extension tests", "executed comparison and source hashes", "completed review and handover", "instructions and limits"];
 export const summaryHighlights = {
-  heading: "Key facts: What Is an Intelligent Agent in Artificial Intelligence?",
-  intro: "What is intelligent agent in artificial intelligence? Learn how agents perceive, decide, act and support goal-directed AI workflows.",
+  heading: "From definition to testable behaviour",
+  intro: "An agent receives observations and selects actions. PEAS makes its task explicit: Performance measure, Environment, Actuators and Sensors.",
   items: [
-    { label: "What are intelligent agents in artificial intelligence?", description: "Intelligent agents are AI systems that perceive an environment, use information from it, and take actions to achieve a goal. They are defined by context, decisions and goal-directed action." },
-    { label: "What are the 5 types of intelligent agents?", description: "This article focuses on the agent pattern rather than a full taxonomy. A useful practical distinction is how much context, reasoning, tool use and learning the agent can apply." },
-    { label: "Is ChatGPT an intelligent agent?", description: "ChatGPT is not always an intelligent agent when used only to answer prompts. It becomes more agentic when placed in workflows that use tools, make decisions or carry out tasks." },
+    { label: "For builders", description: "A small JavaScript lab for people learning to turn an AI-system brief into reviewable code and tests." },
+    { label: "What runs", description: "A deterministic rule policy in a synthetic environment. No model, credentials, network or external actions." },
+    { label: "What it proves", description: "Only the specified simulation cases—not production security, general intelligence or readiness for client work." },
   ],
-}
-
-export const articleMeta = {
-  title: "What Is an Intelligent Agent in Artificial Intelligence?",
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
-  { question: "What are intelligent agents in artificial intelligence?", answer: "Intelligent agents are AI systems that perceive an environment, use information from it, and take actions to achieve a goal. They are defined by context, decisions and goal-directed action." },
-  { question: "What are the 5 types of intelligent agents?", answer: "This article focuses on the agent pattern rather than a full taxonomy. A useful practical distinction is how much context, reasoning, tool use and learning the agent can apply." },
-  { question: "Is ChatGPT an intelligent agent?", answer: "ChatGPT is not always an intelligent agent when used only to answer prompts. It becomes more agentic when placed in workflows that use tools, make decisions or carry out tasks." },
-  { question: "What is a real-world example of an intelligent agent?", answer: "A contact centre AI agent is one example. It can ask questions, use the answers to look up relevant information, and respond with a possible solution." },
-  { question: "How does an intelligent agent work?", answer: "An intelligent agent works as a loop: it observes its environment, reasons about the next useful action, and then acts to move closer to a goal." },
-  { question: "What makes an AI system an agent instead of a normal AI feature?", answer: "The difference is action. A passive model or dashboard may show information, while an agent uses information from its environment to choose and perform goal-directed steps." },
-  { question: "Why does rationality matter in intelligent agent design?", answer: "Rationality helps define what counts as a good action. A rational agent aims for the best available or best expected outcome within its goals, context and limits." },
-  { question: "What is PEAS in intelligent agent design?", answer: "PEAS stands for performance measure, environment, actuators and sensors. It helps builders define success, the operating context, how the agent gathers information and how it acts." },
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
+};
+export const faqItems = [
+  { id: 1, question: "Does an intelligent agent have to use an LLM?", answer: "No. The general agent model concerns observations and actions. This lab uses a hand-written rule policy. An LLM can propose actions in a different implementation, but is not required to understand or test the environment boundary." },
+  { id: 2, question: "What does PEAS stand for?", answer: "Performance measure, Environment, Actuators and Sensors. It describes the task and interfaces, not a guarantee that an implementation is correct or optimal." },
+  { id: 3, question: "Is the lab learning from its results?", answer: "No. Lookup feedback changes the next action in one run. Each run starts fresh, and no training updates model parameters or improves the policy automatically." },
+  { id: 4, question: "Does rollback undo real actions?", answer: "No. The supplied failure case restores an in-memory draft array. It does not test crash recovery, database transactions or undoing external emails or payments." },
+];
 const CONTENT_FACTORY_INSPECTOR_SCRIPT = "(function(){var protocol=2;var params=new URLSearchParams(window.location.search);if(!params.has('cfInspector'))return;function post(payload){try{window.parent.postMessage(Object.assign({source:'content-factory-inspector',protocolVersion:protocol},payload),'*');}catch(e){}}if(window.__cfArticleInspectorInstalled){post({type:'ready',mode:window.__cfArticleInspectorMode||'comment'});return;}window.__cfArticleInspectorInstalled=true;window.__cfArticleInspectorProtocolVersion=protocol;window.__cfArticleInspectorMode='comment';var style=document.createElement('style');style.textContent='[data-cf-component-id]{cursor:crosshair}.cf-inspector-hover,.cf-inspector-selected{outline:2px solid #7c3aed!important;outline-offset:3px}.cf-inspector-selected{outline-color:#2563eb!important}#cf-inspector-label{position:fixed;z-index:2147483647;pointer-events:none;border-radius:6px;background:#111827;color:white;padding:4px 8px;font:600 12px/1.4 ui-sans-serif,system-ui,sans-serif;box-shadow:0 8px 24px rgba(15,23,42,.22)}';document.head.appendChild(style);var label=document.createElement('div');label.id='cf-inspector-label';label.hidden=true;document.body.appendChild(label);var active=null;var selected=null;var measureQueued=false;function mode(){return window.__cfArticleInspectorMode||'comment';}function rect(el){var r=el.getBoundingClientRect();return{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};}function esc(value){return String(value||'').replace(/\"/g,'\\\\\"');}function byId(id){var nodes=document.querySelectorAll('[data-cf-component-id]');for(var i=0;i<nodes.length;i++){if(nodes[i].getAttribute('data-cf-component-id')===id)return nodes[i];}return null;}function componentData(el,type,event){var id=el.getAttribute('data-cf-component-id')||'';var r=rect(el);var payload={type:type,componentId:id,componentType:el.getAttribute('data-cf-component-type')||'',sourceSectionId:el.getAttribute('data-cf-source-section-id')||'',label:el.getAttribute('data-cf-component-label')||id,selector:'[data-cf-component-id=\"'+esc(id)+'\"]',rect:r};if(event){var width=r.width||1;var height=r.height||1;var x=Math.max(0,Math.min(1,(event.clientX-r.left)/width));var y=Math.max(0,Math.min(1,(event.clientY-r.top)/height));payload.click={x:event.clientX,y:event.clientY};payload.anchor={x:x,y:y,createdFrom:'live_preview_click'};}return payload;}function allComponents(){var nodes=document.querySelectorAll('[data-cf-component-id]');var out=[];for(var i=0;i<nodes.length;i++){out.push(componentData(nodes[i],'component'));}return out;}function postMeasure(){post({type:'measure',components:allComponents()});}function queueMeasure(){if(measureQueued)return;measureQueued=true;window.requestAnimationFrame(function(){measureQueued=false;postMeasure();});}function setSelected(id){if(selected)selected.classList.remove('cf-inspector-selected');selected=id?byId(id):null;if(selected)selected.classList.add('cf-inspector-selected');}function show(el){var rect=el.getBoundingClientRect();var name=el.getAttribute('data-cf-component-label')||el.getAttribute('data-cf-component-id')||'component';var kind=el.getAttribute('data-cf-component-type')||'component';label.textContent=name+' ('+kind+')';label.style.left=Math.max(8,Math.min(rect.left,window.innerWidth-260))+'px';label.style.top=Math.max(8,rect.top-32)+'px';label.hidden=false;}document.addEventListener('mouseover',function(event){var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;if(!target)return;if(active&&active!==target)active.classList.remove('cf-inspector-hover');active=target;target.classList.add('cf-inspector-hover');show(target);post(componentData(target,'hover'));},true);document.addEventListener('mouseout',function(event){if(!active)return;var next=event.relatedTarget;if(next&&active.contains(next))return;active.classList.remove('cf-inspector-hover');active=null;label.hidden=true;},true);document.addEventListener('click',function(event){var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;if(!target)return;event.preventDefault();event.stopPropagation();setSelected(target.getAttribute('data-cf-component-id')||'');post(componentData(target,mode()==='comment'?'comment:create':'select',event));queueMeasure();},true);document.addEventListener('scroll',queueMeasure,true);window.addEventListener('resize',queueMeasure);window.addEventListener('message',function(event){var message=event.data;if(!message||typeof message!=='object'||message.source!=='founder-tools-inspector')return;if(message.type==='setMode'){window.__cfArticleInspectorMode=message.mode==='inspect'?'inspect':'comment';post({type:'ready',mode:mode()});}else if(message.type==='measureComponents'){postMeasure();}else if(message.type==='scrollToComponent'){var target=byId(message.componentId||'');if(target){target.scrollIntoView({block:'center',inline:'nearest'});setSelected(message.componentId||'');setTimeout(queueMeasure,80);}}else if(message.type==='setSelectedComponent'){setSelected(message.componentId||'');}});post({type:'ready',mode:mode()});setTimeout(queueMeasure,0);})();"

 function ContentFactoryInspectorBridge() {
@@ -116,219 +53,99 @@
   return null
 }

+
+function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
+  return <section id={id} className="scroll-mt-24" data-cf-component-id={"section:" + id} data-cf-component-type="section" data-cf-component-label={title} data-cf-source-section-id={id}><h2 className="scroll-mt-24">{title}</h2>{children}</section>;
+}
+function ScrollTable({ label, children }: { label: string; children: ReactNode }) {
+  return <div role="region" aria-label={label} tabIndex={0} className="my-6 max-w-full overflow-x-auto rounded border border-slate-300 px-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"><table className="min-w-[640px]">{children}</table></div>;
+}
 export default function ArticleContent() {
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
-      <ContentFactoryInspectorBridge />
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
-        <div id="section-01" data-cf-component-id={"section:section-01"} data-cf-component-type={"section"} data-cf-component-label={"An intelligent agent is AI that can perceive, decide and act"} data-cf-source-section-id={"section-01"}>
-        <p><strong>{TOPIC}</strong> — {"An intelligent agent in artificial intelligence is a system or software program that can perceive its environment, use information from that environment, and take actions to achieve a goal. In plain English, it is AI that does more than answer a prompt. It can decide what to do next and act with some level of autonomy."}</p>
-        <p>{"A human may still set the goal, limits and tools. The agent then chooses actions or workflows that help it reach that goal. This is why intelligent agents are a core idea in AI, not only a new label for agentic products. For builders and founders, the useful question is not just whether a product uses AI, but whether it can sense context, make decisions and take goal-directed action."}</p>
-        <div data-cf-component-id={"image:section-01"} data-cf-component-type={"image"} data-cf-component-label={"Hero image"} data-cf-source-section-id={"section-01"}>
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          caption="What is intelligent agent in artificial intelligence? Learn how agents perceive, decide, act and support goal-directed AI workflows."
-          width={1600}
-          height={1067}
-        />
+  return <div data-cf-article-body>
+    <ContentFactoryInspectorBridge />
+    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: TITLE, current: true }]} title={TITLE} titleHighlight="PEAS design lab" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
+    <div className="prose prose-lg prose-slate max-w-none">
+      <p>This tutorial is for early-career builders who can run JavaScript and want concrete design-and-test evidence. You do not need a paid AI account. If you are a business owner deciding what to commission, use the <Link to="/articles/featured/what-is-an-agent-in-artificial-intelligence">agent-or-simpler-workflow guide</Link> instead.</p>
+      <p>You will run the original observation/action loop, inspect its failure cases and reproduce a completed freshness change. The comparison separates what a policy proposes from what its environment permits. All examples are synthetic; copying the supplied lab does not establish your own delivery experience.</p>
+      <ArticleTocPlaceholder />
+      <Section id="section-01" title="1. Specify the task with PEAS">
+        <p><a href="https://inst.eecs.berkeley.edu/~cs188/textbook/search/agents.html">UC Berkeley’s agent-design notes</a> explain rational agents in terms of expected outcomes and define PEAS as a description of the task environment. Rationality is relative to the performance measure and available information, not consciousness, certainty or universal competence.</p>
+        <p>Our original teaching scenario prepares an internal draft for a fictional maintenance request. It is deliberately small enough to inspect completely. The rule policy is not claimed to be optimal, learned or a modern autonomous LLM product.</p>
+        <ScrollTable label="PEAS task specification">
+          <thead><tr><th>PEAS element</th><th>Lab specification</th><th>What changes in code</th></tr></thead>
+          <tbody>
+            <tr><td>Performance</td><td>One draft only for a permitted, complete request with a successful lookup; otherwise refuse or escalate within the step limit</td><td>Assertions on status, drafts and trace length—not a “looks intelligent” score</td></tr>
+            <tr><td>Environment</td><td>One synthetic request, a simulated lookup and an in-memory draft list</td><td>Input fixture and isolated state per run</td></tr>
+            <tr><td>Actuators</td><td>lookup, draft, refuse, escalate</td><td>Action allowlist and readiness checks; no send or delete implementation</td></tr>
+            <tr><td>Sensors</td><td>Location-present flag, request-permitted flag and latest lookup status</td><td>Frozen observation; the policy does not see the future lookup result</td></tr>
+          </tbody>
+        </ScrollTable>
+        <p>The environment has a hidden lookup outcome until the lookup runs. The policy cannot simply inspect the test’s answer beforehand. This makes the observation boundary visible without pretending that the three possible lookup results represent real-world complexity.</p>
+      </Section>
+      <Section id="section-02" title="2. Save and run the actual lab">
+        <p>Save all seven files in the same folder. Review the code before execution. It uses Node’s built-in modules and needs no package installation:</p>
+        <ul>
+          {DOWNLOAD_FILES.map((file, index) => <li key={file}><a href={"/downloads/peas-agent-lab/" + file} download>{file}</a> — {FILE_LABELS[index]}</li>)}
+        </ul>
+        <p>With Node.js 22 or later available, open a terminal in that folder:</p>
+        <pre><code>{"node agent.mjs\nnode --test agent.test.mjs freshness.test.mjs\nnode freshness.mjs --review"}</code></pre>
+        <p>The normal baseline run prints <code>status: drafted</code>, one draft marked <code>needs-human-review</code> and the trace below. The nine baseline and twelve extension tests should pass: 21 total. The review command deliberately exits with code 2 and <code>REVIEW_REQUIRED</code>; section 4 explains why. No real message, booking or payment is performed.</p>
+        <ScrollTable label="Baseline execution trace">
+          <thead><tr><th>Step</th><th>Observed lookup</th><th>Selected action</th><th>Environment result</th></tr></thead>
+          <tbody><tr><td>1</td><td>not-run</td><td>lookup</td><td>ok</td></tr><tr><td>2</td><td>ok</td><td>draft</td><td>draft-created; run stops for human review</td></tr></tbody>
+        </ScrollTable>
+        <p>This is an execution trace from the supplied deterministic fixture, not a model’s hidden reasoning. <code>externalActions: 0</code> is zero because this program has no external-action tools, not because an independent security monitor has certified it.</p>
+      </Section>
+      <Section id="section-03" title="3. Change the environment and inspect failure">
+        <p>Create an exercise file beside the downloaded module. This example simulates an unavailable tool:</p>
+        <pre><code>{'import { simulate } from "./agent.mjs";\nconsole.log(simulate({\n  id: "exercise-1", hasLocation: true,\n  lookupResult: "unavailable", requestedAction: "prepare-draft"\n}));'}</code></pre>
+        <ScrollTable label="PEAS failure exercises">
+          <thead><tr><th>Change</th><th>Expected result</th><th>Boundary demonstrated</th></tr></thead>
+          <tbody>
+            <tr><td>hasLocation: false</td><td>escalated, no draft</td><td>Missing required information is not invented</td></tr>
+            <tr><td>lookupResult: unavailable or conflict</td><td>lookup followed by escalation</td><td>Failed or contradictory evidence does not permit a draft</td></tr>
+            <tr><td>requestedAction: send; policy returns draft</td><td>refused, no draft</td><td>The simulator enforces the request boundary even when the policy does not</td></tr>
+            <tr><td>Policy always selects lookup; maxSteps: 3</td><td>step-limit after three actions</td><td>Repeated allowed actions terminate</td></tr>
+            <tr><td>failWrite: true</td><td>draft-write-failed; empty draft list</td><td>Only the simulated in-memory change is rolled back</td></tr>
+            <tr><td>Policy selects draft before lookup</td><td>draft-precondition-failed</td><td>A selected action still needs valid prerequisites</td></tr>
+          </tbody>
+        </ScrollTable>
+        <p>Inspect expected status and the absence of an unintended draft, not only the error message. A test that checks merely whether the function returns can pass while the behaviour is wrong.</p>
+      </Section>
+      <Section id="section-04" title="4. Use an AI coding tool without outsourcing the acceptance criteria">
+        <p>This teaching asset was drafted with AI coding assistance and checked with the supplied automated tests. That is not independent human review or a client deployment. For your extension, keep a record of the coding tool/model, date, request, proposed diff, rejected suggestions and actual test output.</p>
+        <blockquote><p>Read this simulator and its tests. Propose one new failure fixture within the current synthetic schema. Explain which PEAS boundary it exercises. Add a failing test before proposing a fix. Do not remove the action allowlist, readiness checks or existing assertions. Do not add network calls or credentials.</p></blockquote>
+        <p>Inspect the proposed change before running it. If the coding tool changes the expected result simply to make the test pass, reject that change unless the task specification itself was intentionally revised and documented. Keep the baseline as a comparison and explain why the new implementation is better.</p>
+        <p><strong>Completed extension:</strong> the new task permits a draft only when a successful lookup has a known record age between 0 and {review.maxAgeMs.toLocaleString("en-AU")} milliseconds inclusive. Unknown, future-dated and older records require escalation. This 60-second limit is our teaching assumption, not a production recommendation. Both timestamps are supplied synthetic integers, not readings from a real clock.</p>
+        <p>The original simulator receives its original four fields; it has no timestamp schema. The new wrapper adds <code>recordedAtMs</code> and <code>checkedAtMs</code>, exposing age/status only after lookup succeeds. It keeps the same rule policy and enforces freshness at the action boundary. This is a changed task requirement and environment permission—not a learned or smarter policy, or proof that the baseline violated its older specification.</p>
+        <ScrollTable label="Freshness contract comparison">
+          <thead><tr><th>Visible fixture</th><th>New requirement</th><th>Original simulator</th><th>Guarded simulator</th></tr></thead>
+          <tbody>{review.cases.map(row => <tr key={row.id}><td>{row.label}</td><td>{row.expected}</td><td>{row.baseline.status}{row.baseline.matchesContract ? "" : " — fails new requirement"}</td><td>{row.guarded.status}</td></tr>)}</tbody>
+        </ScrollTable>
+        <p>The executed record shows {review.summary.baselineMatches}/{review.summary.total} matching cases for the original simulator and {review.summary.guardedMatches}/{review.summary.total} for the guarded version. All seven fixtures were visible while authoring; none is an independent held-out benchmark. Tests that reproduce these results are not permission to deploy.</p>
+        <ScrollTable label="Stale record decision trace">
+          <thead><tr><th>Step</th><th>Visible freshness / age</th><th>Proposed action</th><th>Enforced action / reason</th></tr></thead>
+          <tbody>{review.cases.find(row => row.id === "stale")!.decisionTrace.map(row => <tr key={row.step}><td>{row.step}</td><td>{row.observation.recordStatus} / {row.observation.recordAgeMs === null ? "not observed" : `${row.observation.recordAgeMs} ms`}</td><td>{row.proposed}</td><td>{row.enforced} / {row.guardReason ?? "no freshness override"}</td></tr>)}</tbody>
+        </ScrollTable>
+        <p>Notice the second step still records a proposed <code>draft</code>. The guard changes execution to <code>escalate</code>; it must not erase the policy’s proposal. The downloadable JSON preserves every case and source hashes. The completed <code>CHANGE-REVIEW.md</code> records rationale, actual results, AI assistance, limits and recipient instructions. Its decision remains <code>{review.decision}</code>: independent technical and recipient review have not occurred.</p>
+      </Section>
+      <Section id="section-05" title="5. State what this lab does not test">
+        <p>The simulation does not implement real authentication, persistent duplicate prevention, concurrency, process isolation, live tool timeouts, crash recovery or prompt-injection defence. The policy is trusted synchronous local code: an infinite loop inside it can hang the process despite the step limit. Never run untrusted generated code on the assumption that this harness contains it.</p>
+        <p>No language model learns here. Tool feedback changes the next action in one run; nothing persists between runs and no model parameters change. Adding an asynchronous LLM or a live tool requires a separate design for timeouts, access, cost, data handling and recovery—not simply replacing the policy function and claiming the same tests prove safety.</p>
+        <p>For further architecture context, <a href="https://www.anthropic.com/engineering/building-effective-agents">Anthropic distinguishes predefined workflows from model-directed agents</a>. That distinction prevents this simple rule policy from being presented as evidence of an LLM’s planning ability.</p>
+        <p>The rollback test restores an array after an injected failure. It does not undo an email or payment. A real deployment must describe irreversible consequences and test the actual system boundary.</p>
+        <p>The freshness extension fixes both fixture clocks for the whole run. It does not test clock trust or skew, elapsed time during a real tool call, record changes between checking and acting, or concurrent writes. Frozen observations constrain the intended interface, not trusted code sharing the same process. Removing the guard would restore the three freshness failures, not provide a safe real-world rollback.</p>
+      </Section>
+      <Section id="section-06" title="6. Turn the exercise into honest delivery evidence">
+        <p>Before sharing your work, include the PEAS table, instructions, baseline output, one failure you added, the reviewed diff, test results and known limits. Ask another person to run it from those instructions; record what failed or needed explanation. Do not label that verification complete until it happens.</p>
+        <p>If you already have broader delivery evidence, show MLAI Studio what you shipped, how you used AI coding tools and how you tested the boundaries. This lab alone is not proof of client readiness. Applications are considered for scoped paid work; selection, available projects and portfolio publication rights are not guaranteed. Current intake asks about contracting in Australia; confirm eligibility before assuming a New Zealand pathway.</p>
+        <div data-cf-component-id="cta" data-cf-component-type="conversion-cta" data-cf-component-label="Builder evidence application">
+          <ArticleConversionCTA articleSlug={CATEGORY + "/" + SLUG} config={BASE_ARTICLE_SEO_CONFIG[PATH].conversion!} events={[]} placement="article-inline" />
         </div>
-        </div>
-
-        <div data-cf-component-id={"audience-grid"} data-cf-component-type={"audience-grid"} data-cf-component-label={"Who is this guide for?"}>
-          <AudienceGrid
-            heading="Who is this guide for?"
-            cards={[
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
-            ]}
-          />
-        </div>
-
-        <div data-cf-component-id={"quote:key-insight"} data-cf-component-type={"quote"} data-cf-component-label={"Key insight"}>
-          <QuoteBlock title="Key insight" variant="purple">
-            {"Intelligent agents are AI systems that perceive an environment, use information from it, and take actions to achieve a goal. They are defined by context, decisions and goal-directed action."}
-          </QuoteBlock>
-        </div>
-        <div id="section-02" data-cf-component-id={"section:section-02"} data-cf-component-type={"section"} data-cf-component-label={"The core parts of an intelligent agent"} data-cf-source-section-id={"section-02"}>
-          <h2>{"The core parts of an intelligent agent"}</h2>
-          <p>{"An intelligent agent is easier to understand when you split it into a few working parts. First, it has an environment. This is the context it monitors or interacts with, such as a user conversation, a software system, a document store, a robot\u2019s surroundings, or another external setting. The agent then uses perception to collect inputs from that environment. In software, that may be data, messages, tool results, or system signals."}</p>
-          <p>{"The next part is purpose. Sources describe intelligent agents as systems that act to achieve goals, predetermined outcomes, or an objective function. This goal gives the agent a reason to choose one action over another. Decision-making connects the inputs to that goal. The final part is action: the agent does something in the environment or with available tools. A dashboard can show information, but an agent can use information to decide and act."}</p>
-          <div data-cf-component-id={"image:section-02"} data-cf-component-type={"image"} data-cf-component-label={"Image: The core parts of an intelligent agent"} data-cf-source-section-id={"section-02"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-07afafca-3263-4036-95a1-789172a45060.jpg?alt=media&token=ac98d132-3e30-4d9b-b984-bb80a578911a"
-            alt="Notebook, laptop, and whiteboard fragments mapping the core parts of an intelligent agent on a messy desk"
-            caption="The core parts of an intelligent agent"
-            width={1200}
-            height={800}
-          />
-          </div>
-        </div>
-        <div id="section-03" data-cf-component-id={"section:section-03"} data-cf-component-type={"section"} data-cf-component-label={"How intelligent agents work in practice"} data-cf-source-section-id={"section-03"}>
-          <h2>{"How intelligent agents work in practice"}</h2>
-          <p>{"In practice, an intelligent agent works as a loop. It observes its environment, uses the information it collects, chooses a useful next action, and then acts to move closer to a goal. The environment might be a software system, a conversation, a document store, or another setting where the agent can receive input and produce an output."}</p>
-          <p>{"Modern AI agents can use available tools and design workflows to complete tasks on behalf of a user or another system. Some agents can also improve performance over time by learning from data, feedback, or acquired knowledge, rather than only following a fixed response pattern."}</p>
-          <div data-cf-component-id={"image:section-03"} data-cf-component-type={"image"} data-cf-component-label={"Image: How intelligent agents work in practice"} data-cf-source-section-id={"section-03"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3fec690c-bb6a-42d9-a5a9-93050edc5813.jpg?alt=media&token=568e29ec-5397-4d8b-af63-13c9d2b7c6ce"
-            alt="Laptop on a cluttered desk showing an agent workflow loop with notes and cables in a candid workspace"
-            caption="How intelligent agents work in practice"
-            width={1200}
-            height={800}
-          />
-          </div>
-          <h3>{"A simple agent loop"}</h3>
-          <p>{"The first phase is observation. The agent perceives the environment or collects data relevant to the task. The second phase is reasoning. It uses that input to decide which action is most likely to help achieve the goal. The third phase is action."}</p>
-          <p>{"For a builder, this loop is the practical way to think about agents: input comes in, the agent decides what to do next, and an action changes the state of the task. The quality of the agent depends on how well it can interpret the environment, choose suitable actions, and keep improving its behaviour within the limits set by its design."}</p>
-        </div>
-
-        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the checklist"}>
-
-        </div>
-
-        <div data-cf-component-id={"step-list:practical-next-steps"} data-cf-component-type={"step-list"} data-cf-component-label={"Practical next steps"}>
-          <ArticleStepList
-            title="Practical next steps"
-            steps={[
-            "The core parts of an intelligent agent",
-            "How intelligent agents work in practice",
-            "Why rationality matters for agent design",
-            "Real examples show what makes an agent different",
-            "Use the agent lens before you build",
-            ]}
-            accent="indigo"
-          />
-        </div>
-        <div id="section-04" data-cf-component-id={"section:section-04"} data-cf-component-type={"section"} data-cf-component-label={"Why rationality matters for agent design"} data-cf-source-section-id={"section-04"}>
-          <h2>{"Why rationality matters for agent design"}</h2>
-          <p>{"Rationality is the design idea that turns an intelligent agent from \u201csoftware that acts\u201d into \u201csoftware that acts for a reason.\u201d In AI, an intelligent agent perceives its environment and takes autonomous actions to achieve goals. A rational agent is judged by whether its actions aim for the best available outcome, or the best expected outcome when the situation is uncertain."}</p>
-          <p>{"This does not mean the agent is perfectly intelligent. The answer depends on the goal, the environment, the information the agent can sense, and the actions it can take."}</p>
-          <h3>{"Use PEAS before you decide to build an agent"}</h3>
-          <p>{"PEAS is a useful lens for this design work. It stands for performance measure, environment, actuators and sensors. The performance measure defines success. The environment is the setting the agent operates in. Actuators are how it acts. Sensors are how it gathers information."}</p>
-          <p>{"If the environment is too unclear, the agent may not have enough context. If the sensors or actuators are limited, the agent may not be able to make or carry out useful decisions."}</p>
-        </div>
-        <div id="section-05" data-cf-component-id={"section:section-05"} data-cf-component-type={"section"} data-cf-component-label={"Real examples show what makes an agent different"} data-cf-source-section-id={"section-05"}>
-          <h2>{"Real examples show what makes an agent different"}</h2>
-          <p>{"The easiest way to recognise an intelligent agent is to look for context, a goal and an action. A contact centre AI agent, for example, does more than generate a reply. It can ask a customer questions, use the answers to look up relevant information and respond with a possible solution. That pattern is different from a simple chatbot that only returns text from a prompt, because the agent is choosing steps to move toward a goal."}</p>
-          <p>{"Self-driving cars interpret their surroundings and act in the physical world. Virtual assistants and game-playing AI can also be agent-like when they interpret a situation, make decisions and take actions. The key point is that machine learning alone does not make something an intelligent agent. The agent pattern appears when the system uses information from its environment to perform goal-directed work."}</p>
-          <p>{"This is why questions like \u201cis ChatGPT an intelligent agent?\u201d need a careful answer. A language model used only to answer a question is not always an agent. It becomes more agentic when it is placed inside a workflow that can use tools, make decisions, call external systems or carry out tasks for a user. Tool use matters because it lets the system move from producing an answer to taking steps in a process."}</p>
-          <p>{"Agent capability also varies. Some agents are narrow and automated, such as a system that recommends the next product or routes a support request. Others are more complex, such as workflows that plan several steps, use different tools and adapt based on new information."}</p>
-          <div data-cf-component-id={"image:section-05"} data-cf-component-type={"image"} data-cf-component-label={"Image: Real examples show what makes an agent different"} data-cf-source-section-id={"section-05"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9b73993d-ec88-4e57-8215-761583eb1bdd.jpg?alt=media&token=a7252b2e-e8da-4899-bd5e-f2a3c0d9a9e0"
-            alt="Close-up of a support agent using customer answers to guide an AI-assisted contact centre response"
-            caption="Real examples show what makes an agent different"
-            width={1200}
-            height={800}
-          />
-          </div>
-        </div>
-        <div id="section-06" data-cf-component-id={"section:section-06"} data-cf-component-type={"section"} data-cf-component-label={"Use the agent lens before you build"} data-cf-source-section-id={"section-06"}>
-          <h2>{"Use the agent lens before you build"}</h2>
-          <p>{"The simplest way to test an agent idea is to ask whether it really behaves like an intelligent agent. In AI, the core pattern is clear: the agent perceives its environment, uses data or context to make decisions, and takes actions to achieve a goal. What outcome is it trying to reach? What actions is it allowed to take?"}</p>
-          <p>{"For Australian AI builders and startup teams, this lens can prevent overbuilding. Start with one narrow workflow where the goal, inputs and allowed actions are easy to define."}</p>
-          <div data-cf-component-id={"image:section-06"} data-cf-component-type={"image"} data-cf-component-label={"Image: Use the agent lens before you build"} data-cf-source-section-id={"section-06"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-363846e4-8f2c-4da4-93b5-6f7894603af0.jpg?alt=media&token=3790553d-18e5-4dd0-813b-2d7c3a393fb8"
-            alt="Team mapping an AI agent workflow on a whiteboard during a candid office planning session"
-            caption="Use the agent lens before you build"
-            width={1200}
-            height={800}
-          />
-          </div>
-        </div>
-
-        <div data-cf-component-id={"quote:keep-moving-forward"} data-cf-component-type={"quote"} data-cf-component-label={"Keep moving forward"}>
-          <QuoteBlock title="Keep moving forward" variant="orange">
-            {"ChatGPT is not always an intelligent agent when used only to answer prompts. It becomes more agentic when placed in workflows that use tools, make decisions or carry out tasks."}
-          </QuoteBlock>
-        </div>
-
-        <div data-cf-component-id={"template-resource-cta"} data-cf-component-type={"template-resource-cta"} data-cf-component-label={"Free MLAI Template Resource"}>
-          <MLAITemplateResourceCTA />
-        </div>
-
-      <div data-cf-component-id={"references"} data-cf-component-type={"references"} data-cf-component-label={"Authoritative References"}>
-        <ArticleReferences
-          references={[
-            {id: 1, href: "https://en.wikipedia.org/wiki/Intelligent_agent", title: "Intelligent agent - Wikipedia", publisher: "en.wikipedia.org", description: "", category: "guide"},
-            {id: 2, href: "https://aws.amazon.com/what-is/ai-agents/", title: "What are AI Agents?- Agents in Artificial Intelligence Explained - AWS", publisher: "aws.amazon.com", description: "", category: "guide"},
-            {id: 3, href: "https://mitsloan.mit.edu/ideas-made-to-matter/agentic-ai-explained", title: "Agentic AI, explained | MIT Sloan", publisher: "mitsloan.mit.edu", description: "", category: "guide"},
-            {id: 4, href: "https://www.ibm.com/think/topics/ai-agents", title: "What Are AI Agents? | IBM", publisher: "ibm.com", description: "", category: "guide"},
-            {id: 5, href: "https://www.blueprism.com/guides/ai/intelligent-agents/", title: "What Are Intelligent Agents? | SS&C Blue Prism", publisher: "blueprism.com", description: "", category: "guide"},
-            {id: 6, href: "https://www.habitat3.com.au/single-post/ai-agents-what-are-they-how-do-they-help-small-business", title: "AI Agents: What are they and why should small businesses care? How can AI agents help small business?", publisher: "habitat3.com.au", description: "", category: "guide"},
-            {id: 7, href: "https://www.ebsco.com/research-starters/applied-sciences/intelligent-agent", title: "Intelligent agent | Applied Sciences | Research Starters | EBSCO Research", publisher: "ebsco.com", description: "", category: "guide"},
-            {id: 8, href: "https://cloud.google.com/discover/what-are-ai-agents", title: "What are AI agents? Definition, examples, and types | Google Cloud", publisher: "cloud.google.com", description: "", category: "guide"},
-            {id: 9, href: "https://www.geeksforgeeks.org/artificial-intelligence/intelligent-agent-in-ai/", title: "Intelligent Agent in AI - GeeksforGeeks", publisher: "geeksforgeeks.org", description: "", category: "guide"},
-            {id: 10, href: "https://genezio.com/blog/common-ai-agent-mistakes-how-intelligent-agents-fail-and-what-you-can-do/", title: "AI Agent Mistakes: How Intelligent Agents Fail and What To Do", publisher: "genezio.com", description: "", category: "guide"},
-          ]}
-          heading="Sources & further reading"
-        />
-      </div>
-
-        <div data-cf-component-id={"disclaimer"} data-cf-component-type={"disclaimer"} data-cf-component-label={"Disclaimer"}>
-          <ArticleDisclaimer />
-        </div>
-
-        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
-          <ArticleCompanyCTA
-            title="Build clearer AI agent ideas"
-            body="Join MLAI to learn practical AI concepts, test ideas with Australian builders, and connect with people turning agentic workflows into real products."
-            buttonText="Explore the MLAI community"
-            buttonHref="/"
-          />
-        </div>
-      </div>
-
-        <div data-cf-component-id={"author-bio"} data-cf-component-type={"author-bio"} data-cf-component-label={"About the Author"}>
-          <AuthorBio author={authorDetails} />
-        </div>
-
-        <div className="mt-12" data-cf-component-id={"faq"} data-cf-component-type={"faq"} data-cf-component-label={"FAQ"}>
-          <ArticleFAQ items={faqItems} />
-        </div>
-
-        <ArticleFooterNav backHref="/articles" topHref="#" />
-    </>
-  )
+        <p>Still learning? Choose an appropriate <Link to="/events">MLAI event</Link> and bring a specific test question. For a complementary evidence exercise, see the <Link to="/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-5">agent-trace lab and its provenance limits</Link>.</p>
+      </Section>
+      <p><small>Primary sources checked 10 September 2026. The lab is an original synthetic teaching example, not Berkeley- or Anthropic-endorsed software. The Anthropic source supplies an architectural distinction, not a current tool recommendation. These tests establish only the cases described above.</small></p>
+      <div data-cf-component-id="faq" data-cf-component-type="faq" data-cf-component-label="Lab questions"><ArticleFAQ items={faqItems} /></div>
+    </div>
+  </div>;
 }
```
