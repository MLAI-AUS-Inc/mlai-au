# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/what-an-entrepreneur-does-and-how-to-start-well.tsx
+++ unreviewed-local-draft/app/articles/content/featured/what-an-entrepreneur-does-and-how-to-start-well.tsx
@@ -6,6 +6,11 @@
 import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
 import { ArticleReferences } from "~/components/articles/ArticleReferences";
 import FounderExperimentLedger from "~/components/articles/FounderExperimentLedger";
+import { FOUNDER_LEDGER_EXAMPLE, FOUNDER_LEDGER_FIELDS } from "~/lib/founder-experiment-ledger";
+import { ArticleTocPlaceholder } from "~/components/articles/ArticleTocPlaceholder";
+import { ArticleEventPreference } from "~/components/articles/ArticleEventPreference";
+import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
+import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";

 export const useCustomHeader = true;

@@ -13,13 +18,13 @@
 export const CATEGORY = "featured";
 export const SLUG = "what-an-entrepreneur-does-and-how-to-start-well";
 export const DATE_PUBLISHED = "2026-04-20";
-export const DATE_MODIFIED = "2026-07-28";
+export const DATE_MODIFIED = "2026-09-11";
 export const DESCRIPTION =
-  "A practical Australian founder operating guide for the first 90 days, with evidence-based experiments, decision gates and a private in-browser experiment ledger.";
+  "Plan a first founder experiment with a proposed 90-day sequence, clearly labelled evidence, a completed fictional record and an editable browser ledger.";
 const HERO_IMAGE =
   "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-56ed48a4-989a-4c7a-902a-a4d660355998.jpg?alt=media&token=9f5d6e18-cf07-44dd-b1e2-b211e059cccf";
 const HERO_IMAGE_ALT =
-  "Founder reviewing customer evidence and a 90-day operating plan at a desk";
+  "Two people with pens, a diagrammed notebook and banknotes on a table";

 interface FAQ {
   id: number;
@@ -44,7 +49,7 @@
     id: 3,
     question: "Do I need to register a company before testing an idea?",
     answer:
-      "Not every early conversation requires a company, but trading, contracts, tax, liability, licences, ownership and hiring can create obligations. Use official Australian registration guidance and get professional advice for your circumstances before making structural commitments.",
+      "The obligations depend on the activity and your circumstances. Trading, contracts, tax, liability, licences, ownership and hiring may require checks before you proceed. Use current official registration guidance and qualified advice rather than treating the 90-day sequence as permission to postpone them.",
   },
   {
     id: 4,
@@ -169,7 +174,7 @@

 export default function ArticleContent() {
   return (
-    <>
+    <div data-cf-article-body>
       <ArticleHeroHeader
         breadcrumbs={[
           { label: "Home", href: "/", icon: Home },
@@ -215,7 +220,7 @@
           </p>
           <h2
             id="entrepreneur-answer-heading"
-            className="mt-3 text-3xl font-black tracking-tight text-gray-950"
+            className="mt-3 text-3xl font-black tracking-tight text-gray-950 scroll-mt-28"
           >
             The work is deciding what deserves the next dollar and day.
           </h2>
@@ -227,7 +232,9 @@
           </p>
         </section>

-        <h2>Before day one: define the constraint</h2>
+        <p>The 90-day ranges below are a proposed planning sequence, not a proven timetable or permission to trade, hire or collect data. Revisit the next step when evidence, capacity or obligations change. For the meaning of the label itself, see the <Link to="/articles/featured/what-constitutes-a-startup-in-practice">startup-definition guide</Link>.</p>
+        <ArticleTocPlaceholder />
+        <h2 id="constraints" className="scroll-mt-28">Before day one: define the constraint</h2>
         <p>
           Begin with the runway and responsibility you actually have. Write down
           the hours and money you can risk, income you still need, caring or
@@ -252,12 +259,12 @@
           outcome].
         </blockquote>
         <p>
-          “Everyone needs this” cannot be tested. “Independent allied-health
+          “Everyone needs this” cannot be tested. An invented hypothesis such as “Independent allied-health
           clinics with more than five practitioners lose at least three hours a
           week reconciling referrals” can be investigated.
         </p>

-        <h2>Days 1–10: investigate the problem, not your pitch</h2>
+        <h2 id="investigate" className="scroll-mt-28">Days 1–10: investigate the problem, not your pitch</h2>
         <p>
           Recruit people who have recently experienced the workflow. Ask about a
           specific occasion: what triggered it, what they did, what it cost,
@@ -300,7 +307,7 @@
           continue—not proof of demand.
         </p>

-        <h2>Days 11–30: test a commitment before a build</h2>
+        <h2 id="commitment" className="scroll-mt-28">Days 11–30: test a commitment before a build</h2>
         <p>
           Choose the smallest test that exposes the riskiest assumption. That
           could be a paid diagnostic, manually delivered service, letter of
@@ -327,19 +334,20 @@
           />
         </div>

-        <h3>Two illustrative experiment designs</h3>
+        <h3 id="experiment-designs" className="scroll-mt-28">Two illustrative experiment designs</h3>
         <p>
           These examples show the structure; they are not MLAI case-study
           results.
         </p>
-        <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-gray-300">
+        <div role="region" aria-label="Proposed founder experiment designs" tabIndex={0} className="not-prose my-8 overflow-x-auto rounded-2xl border border-gray-300 focus-visible:outline-2 focus-visible:outline-offset-4">
           <table className="w-full min-w-[760px] border-collapse bg-white text-left text-sm">
+            <caption className="p-4 text-left">Proposed designs, not run tests or measured customer outcomes. Scroll sideways on smaller screens.</caption>
             <thead className="bg-gray-950 text-white">
               <tr>
-                <th className="p-4 font-black">Assumption</th>
-                <th className="p-4 font-black">Test</th>
-                <th className="p-4 font-black">Pre-set signal</th>
-                <th className="p-4 font-black">Decision</th>
+                <th scope="col" className="p-4 font-black">Assumption</th>
+                <th scope="col" className="p-4 font-black">Test</th>
+                <th scope="col" className="p-4 font-black">Pre-set signal</th>
+                <th scope="col" className="p-4 font-black">Decision</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-200 text-gray-800">
@@ -380,9 +388,20 @@
           </table>
         </div>

+        <p>The clinic scenario is a design to review, not permission to process health information. <a href="https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/small-business">OAIC's small-business guidance</a> includes health-service providers regardless of turnover. Start with synthetic material and obtain appropriate privacy and clinical review before considering any real-data test. A manually operated workflow is not automatically safe.</p>
+
+        <h2 id="completed-example" className="scroll-mt-28">Inspect one completed fictional record</h2>
+        <p>This supplied example extends the investor-update design. All participants, limits and outcomes are invented. It demonstrates how to record a missed signal and an unknown response, not the unfinished founder diary/interview study.</p>
+        <nav aria-label="Founder evidence sections"><ul><li><a href="#completed-example">Completed example</a></li><li><a href="#experiment-ledger-heading">Edit your ledger</a></li><li><a href="#next-step">Choose a next step</a></li></ul></nav>
+        <details className="my-6 rounded-xl border border-gray-300 p-4"><summary className="cursor-pointer font-semibold">Read all eight fields of the fictional update experiment</summary><dl className="space-y-5">{FOUNDER_LEDGER_FIELDS.map(([label, key]) => <div key={key} data-founder-example-field={key}><dt className="font-bold">{label}</dt><dd className="ml-0 mt-1">{FOUNDER_LEDGER_EXAMPLE[key]}</dd></div>)}</dl></details>
+        <p><strong>Interpretation:</strong> the story supplies one return-and-use out of three invited participants against a pre-set signal of three. The unanswered third invitation is not a decline. “Change” means investigate the difference before another proposal, not retrospectively lower the success signal. No real demand or retention rate is established.</p>
+        <p>In your own ledger, keep a proposed test separate from observed notes. For an observation, record when, how and with whose permission it was obtained, what was self-reported, and what someone else actually checked. Leave independently verified outcomes unknown when none exist. The status selector records your description; it does not verify it.</p>
         <FounderExperimentLedger />
-
-        <h2>Days 31–60: deliver the outcome manually and measure it</h2>
+        <p>Bring the unresolved question from your record to a relevant MLAI learning event. For this example: “What would distinguish a useful one-off session from a recurring need?” Ask whether another participant is willing to discuss an anonymised example; attendance does not promise customer research or business advice.</p>
+        <ArticleEventPreference articlePath={"/articles/" + CATEGORY + "/" + SLUG} idPrefix="founder-ledger" description="Choose a preferred MLAI event format. This does not upload your ledger, book feedback or register you for an event." />
+        <ArticleConversionCTA articleSlug={CATEGORY + "/" + SLUG} config={BASE_ARTICLE_SEO_CONFIG["/articles/" + CATEGORY + "/" + SLUG].conversion!} events={[]} placement="article-inline" />
+
+        <h2 id="delivery" className="scroll-mt-28">Days 31–60: deliver the outcome manually and measure it</h2>
         <p>
           A manual or partly manual service can expose missing permissions,
           edge cases, support work and adoption friction before software hides
@@ -421,7 +440,7 @@
           main assumption untouched.
         </p>

-        <h2>Days 61–90: decide what becomes a business</h2>
+        <h2 id="decision" className="scroll-mt-28">Days 61–90: decide what becomes a business</h2>
         <p>
           By day 90, aim to answer four questions honestly:
         </p>
@@ -449,7 +468,7 @@
           than simply authorise more building.
         </p>

-        <h2>Australian setup: use decision gates, not a generic checklist</h2>
+        <h2 id="setup" className="scroll-mt-28">Australian setup: use decision gates, not a generic checklist</h2>
         <p>
           Formal steps depend on what you are doing. The official{" "}
           <a
@@ -536,7 +555,7 @@
           ))}
         </div>

-        <h2>What to record each month</h2>
+        <h2 id="monthly-record" className="scroll-mt-28">What to record each month</h2>
         <p>
           Keep one evidence trail rather than rebuilding the story for each
           investor, adviser or teammate:
@@ -569,8 +588,10 @@
             <li>
               <strong className="text-white">Source method:</strong> Australian
               registration, structure, tax-record, privacy, workplace and IP
-              handoffs were checked against regulator or government guidance on
-              28 July 2026.
+              handoffs were originally checked on 28 July 2026. The business.gov.au,
+              ATO, IP Australia, OAIC and Fair Work handoffs were checked again on
+              11 September 2026. These are general handoffs, not an assessment of
+              your obligations; use current guidance and qualified advice before acting.
             </li>
             <li>
               <strong className="text-white">Original asset:</strong> MLAI built
@@ -584,10 +605,10 @@
               and the worked experiments are illustrative rather than results.
             </li>
             <li>
-              <strong className="text-white">AI assistance:</strong> this July
-              2026 revision used AI-assisted research, drafting and code
-              generation. A named human subject reviewer is still required
-              before MLAI declares the article final or scores it 80+.
+              <strong className="text-white">AI assistance:</strong> the July and
+              September 2026 revisions used AI-assisted research, drafting and code
+              generation. A named human subject reviewer and the disclosed real
+              founder study remain required before final editorial acceptance.
             </li>
             <li>
               <strong className="text-white">Advice boundary:</strong> this
@@ -597,10 +618,29 @@
           </ul>
         </aside>

+        <h2 id="next-step" className="scroll-mt-28">Choose a next step that fits your stage</h2>
+        <p>
+          If you are exploring entrepreneurship, bring one question or a lesson
+          from the experiment ledger to a relevant MLAI event. If you already
+          run a company and need to organise updates or marketing work, review
+          the <Link to="/founder-tools/start">Founder Tools overview</Link> for
+          that specific task. Exploring an idea does not make a software
+          subscription or contractor application your required next step. The
+          optional tools are not an automatic import of this ledger; check the
+          selected tool’s account and data-sharing requirements first.
+        </p>
+
+        <nav aria-label="Founder follow-on guides">
+          <ul>
+            <li>Need to plan a customer conversation? Continue with the <Link to="/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026">first-customer discovery guide</Link>.</li>
+            <li>Still deciding what kind of business you are exploring? Use the <Link to="/articles/featured/what-constitutes-a-startup-in-practice">startup-definition examples and decision record</Link>.</li>
+          </ul>
+        </nav>
+
         <ArticleReferences
           references={[...REFERENCES]}
           heading="Australian primary sources"
-          description="Official handoffs checked for this 28 July 2026 revision."
+          description="Official handoffs and source-specific review limits are recorded above; check current requirements before acting."
           previewCount={4}
         />

@@ -611,6 +651,6 @@
           />
         </div>
       </div>
-    </>
+    </div>
   );
 }
```
