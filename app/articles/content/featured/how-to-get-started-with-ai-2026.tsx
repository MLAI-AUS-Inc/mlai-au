import { Home } from "lucide-react";
import { Link } from "react-router";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";
import ArticleTocPlaceholder from "~/components/articles/ArticleTocPlaceholder";
import { FIRST_WORKFLOW_PLAN as PLAN, FIRST_WORKFLOW_RESULTS as COSTS, FIRST_WORKFLOW_SLOW_REVIEW, FIRST_WORKFLOW_CANDIDATES, FIRST_WORKFLOW_BRIEF, FIRST_WORKFLOW_BRIEF_TEMPLATE, FIRST_WORKFLOW_DOWNLOAD, firstWorkflowMoney as money, firstWorkflowPercent as percent } from "~/lib/first-workflow-readiness";
export const useCustomHeader = true;
export const CATEGORY = "featured";
export const SLUG = "how-to-get-started-with-ai-2026";
export const DATE_PUBLISHED = "2025-02-10";
export const DATE_MODIFIED = "2026-09-11";
const TITLE = "Getting started with AI: choose one business workflow";
export const DESCRIPTION = "An Australian small-business owner's workflow-selection guide: compare candidates, check data and review needs, and prepare a scoped implementation brief.";
const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d712d9d4-9358-43a8-a5c1-be38741f4d8e.jpg?alt=media&token=a4aa21de-513d-4d48-82d9-c7ef58e21268";
export const articleMeta = { title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO, imageAlt: "Illustration of a team reviewing workflow notes" };
export const summaryHighlights = { heading: "Choose the work before the tool", intro: "You do not need to learn to code before deciding which business process is worth investigating.", items: [
 {label:"Find a measurable task",description:"Identify repeated work with a known input, output, owner and quality requirement."},
 {label:"Check the risk",description:"Data permission, review effort and the consequence of errors matter as much as apparent speed."},
 {label:"Scope the next step",description:"Prepare one implementation brief, with an explicit fallback and no automatic expansion."},
]};
export const faqItems = [
 {id:1,question:"Do I have to learn Python first?",answer:"No. As the business owner, your first job is to describe the process, its cost, acceptable output and constraints. Technical implementation can be scoped with someone who can build and test it."},
 {id:2,question:"Does Australian hosting make an AI tool compliant?",answer:"No. Hosting location alone does not establish compliance or suitability. Review the actual data use, access, retention, security, contract and applicable obligations with appropriate advice."},
 {id:3,question:"Is there a universal percentage saving that justifies rollout?",answer:"No. Include review, rework, setup and operating costs, and require acceptable quality. Released staff time is capacity, not automatically cash savings or higher margins."},
];
export default function ArticleContent() {
 return <div data-cf-article-body>
  <ArticleHeroHeader breadcrumbs={[{label:"Home",href:"/",icon:Home},{label:"Articles",href:"/articles"},{label:TITLE,current:true}]} title={TITLE} titleHighlight="one business workflow" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
  <div className="prose prose-lg prose-slate max-w-none">
   <p>If you run a small or medium business in Australia and want better margins, start by finding a process worth improving—not by buying an AI subscription. This guide helps you select a candidate and explain it to an implementer. It does not require coding knowledge or promise savings.</p>
   <p><strong>11 September update:</strong> the worked FAQ example now separates first-week setup from repeat-week effort, includes operating and error-remedy costs, and supplies all twelve completed brief fields. The figures are invented; no client pilot was run.</p>
   <ArticleTocPlaceholder />
   <h2 id="observe" className="scroll-mt-28">Observe the process before proposing automation</h2>
   <p>Choose a representative period and record task volume, time spent, corrections, waiting and who checks the result. Separate active work from elapsed turnaround time. A reply that takes a day because someone waits for approval is not necessarily a day's labour.</p>
   <p>Use records you are permitted to inspect. Ask staff what creates rework and what exceptions are hardest. Do not turn the exercise into undisclosed employee surveillance or upload private records to an AI service just to estimate their potential value.</p>
   <h2 id="compare" className="scroll-mt-28">Compare three candidate tasks</h2>
   <p><strong>Fictional example:</strong> an equipment-hire business is choosing its first experiment. These are planning judgments for this scenario, not measured MLAI client results or a universal ranking.</p>
   <p>Scroll tables sideways on narrow screens; keyboard users can focus each labelled region and use the arrow keys.</p>
   <div role="region" aria-label="First workflow candidate boundaries" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[44rem]"><thead><tr><th>Candidate</th><th>Useful starting boundary</th><th>Reason to pause</th></tr></thead><tbody>
    <tr><td>Draft answers from approved public equipment FAQs</td><td>Show the source passage and a draft for staff review; no sending or availability promises</td><td>FAQ is out of date or nobody can check technical details</td></tr>
    <tr><td>Suggest categories for supplier invoices</td><td>Start with invented records; keep accounting entries and payment entirely outside the test</td><td>Live records need access review, or mistakes affect accounts without detection</td></tr>
    <tr><td>Approve a customer's hire application</td><td>Do not use as the first automated decision experiment</td><td>Errors could unfairly affect access; decision rules, obligations and oversight need specialist assessment</td></tr>
   </tbody></table></div>
   <p>For this fictional business, investigate the public FAQ task first only if the documents are current and someone owns review. Ordinary search or a clearer FAQ may solve the problem without generated text. Choosing not to use AI is a valid result.</p>
   <h3 id="completed-selection" className="scroll-mt-28">A completed selection record—not a scored sales pitch</h3>
   <p>Suppose the owner records the following <strong>invented one-week baseline</strong>. Active minutes already include existing checks and corrections; the rework counts identify cases within that workload, not extra time to add again. Costs and future performance are not measured by this example.</p>
   <div className="max-w-full overflow-x-auto" role="region" aria-label="Fictional workflow comparison" tabIndex={0}><table className="min-w-[45rem]">
    <caption>Fictional equipment-hire business: choosing what to investigate</caption>
    <thead><tr><th>Task</th><th>Weekly volume and existing effort</th><th>Rework / input readiness</th><th>Decision before spending</th></tr></thead><tbody>
     {FIRST_WORKFLOW_CANDIDATES.map(candidate => <tr key={candidate.task}><th scope="row">{candidate.task}</th><td>{candidate.weeklyCases} × {candidate.caseMinutes} minutes = {candidate.weeklyCases * candidate.caseMinutes} minutes</td><td>{candidate.reworkCases} cases require correction/escalation within that total. {candidate.readiness}</td><td>{candidate.decision}</td></tr>)}
    </tbody>
   </table></div>
   <p className="text-sm">On narrow screens, scroll the comparison sideways. The recorded choice below explains the decision.</p>
   <p><strong>Recorded choice:</strong> investigate routine FAQ replies, owned by the operations manager. The initial output is a suggested reply with the approved source passage, never an automatic send. Compare complete handling time and supported answers against the improved-template baseline. Pause if the source is outdated, an unsupported price or safety claim appears, or no reviewer is available. A brief can say “cost unknown—request a bounded estimate”; it must not replace an unknown with assumed savings.</p>
   <p><strong>What would change the choice?</strong> If the template already resolves the problem, stop there. If the FAQ needs major repair, fix that before testing generation. If invoice access and review become workable, reassess that separate candidate using its own evidence. This is a reasoned shortlist, not a universal points system or proof that the chosen experiment passed.</p>
   <h2 id="data" className="scroll-mt-28">Confirm the data boundary before trying a tool</h2>
   <p>The <a href="https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products">OAIC's commercial-AI guidance</a> recommends due diligence on intended use, oversight, access and privacy risks. As best practice it recommends not entering personal information, especially sensitive information, into publicly available generative AI tools. Read the full guidance for your circumstances; this is not a compliance determination.</p>
   <p>For an initial demonstration, use invented inputs or approved public material. Removing names does not by itself prove that data cannot identify someone. A training opt-out, local hosting claim or signed vendor contract is not a complete assessment. Ask who can access inputs and outputs, how long they are retained, what they are used for, and how mistakes or incidents are handled.</p>
   <h2 id="measure" className="scroll-mt-28">First week is not a repeat week</h2>
   <p><strong>Illustrative arithmetic for the same week:</strong> {PLAN.replies} FAQ replies at {PLAN.baselineCaseMinutes} minutes each use {COSTS.baselineMinutes} minutes, including current checking and correction. The proposed review is {PLAN.replies} × {PLAN.reviewMinutes} = {COSTS.reviewMinutes} minutes. The earlier 80-minute allowance is now explicitly split into additional exception correction, source upkeep and one-off setup.</p>
   <div role="region" aria-label="First and repeat week effort" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[40rem]"><caption>Invented effort on the same 40-reply workload</caption><thead><tr><th>Activity</th><th>First week</th><th>Repeat week without setup</th></tr></thead><tbody>
    <tr><th scope="row">Read and check proposed replies</th><td>{COSTS.reviewMinutes} minutes</td><td>{COSTS.reviewMinutes} minutes</td></tr>
    <tr><th scope="row">Additional exception correction</th><td>{PLAN.extraCorrectionMinutes} minutes</td><td>{PLAN.extraCorrectionMinutes} minutes</td></tr>
    <tr><th scope="row">Source upkeep and maintenance</th><td>{PLAN.maintenanceMinutes} minutes</td><td>{PLAN.maintenanceMinutes} minutes</td></tr>
    <tr><th scope="row">One-off internal setup</th><td>{PLAN.setupMinutes} minutes</td><td>0 minutes</td></tr>
    <tr><th scope="row">Total proposed effort</th><td>{COSTS.firstWeekMinutes} minutes</td><td>{COSTS.repeatWeekMinutes} minutes</td></tr>
    <tr><th scope="row">Potential release from 240-minute baseline</th><td>{COSTS.firstWeekCapacity} minutes</td><td>{COSTS.repeatWeekCapacity} minutes</td></tr>
   </tbody></table></div>
   <p>The first-week plan releases 40 minutes of capacity, not 120. The repeat-week plan releases {COSTS.repeatWeekCapacity} minutes only if the invented workload and performance repeat. Do not extrapolate this into an annual saving. The correction and upkeep rows are separate activities, not another count of the same per-reply review.</p>
   <p>At an invented {money(PLAN.capacityHourlyValue)}/hour capacity value, the {PLAN.setupMinutes} setup minutes are worth {money(COSTS.internalSetupValue)} of internal time. Add the {money(PLAN.setupCash)} external setup allowance for {money(COSTS.combinedSetupValue)} combined economic setup. Existing payroll does not disappear: do not charge this internal value a second time as cash or claim it as an avoided wage.</p>
   <h2 id="margin" className="scroll-mt-28">What happens to margin under these assumptions?</h2>
   <p>All figures below are invented, weekly and GST-exclusive, not supplier prices. The business has {money(PLAN.weeklyRevenue)} revenue and {money(PLAN.unchangedWeeklyExpenses)} of other listed expenses, including unchanged wages. Extra software/usage/support and a separate customer-remedy allowance are shown explicitly. This is the result after <em>listed</em> costs, not a statutory profit-and-loss statement or after-tax net-margin forecast.</p>
   <div role="region" aria-label="First workflow cost and margin assumptions" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[46rem]"><caption>Illustrative weekly result; no extra revenue or avoided payroll</caption><thead><tr><th>Item</th><th>Current process</th><th>Proposed first week</th><th>Proposed repeat week</th></tr></thead><tbody>
    <tr><th scope="row">Revenue</th><td>{money(PLAN.weeklyRevenue)}</td><td>{money(PLAN.weeklyRevenue)}</td><td>{money(PLAN.weeklyRevenue)}</td></tr>
    <tr><th scope="row">Other listed expenses, including wages</th><td>{money(PLAN.unchangedWeeklyExpenses)}</td><td>{money(PLAN.unchangedWeeklyExpenses)}</td><td>{money(PLAN.unchangedWeeklyExpenses)}</td></tr>
    <tr><th scope="row">Additional subscription / usage / support</th><td>A$0</td><td>{money(PLAN.subscription)} / {money(PLAN.usage)} / {money(PLAN.support)}</td><td>{money(PLAN.subscription)} / {money(PLAN.usage)} / {money(PLAN.support)}</td></tr>
    <tr><th scope="row">Customer-remedy allowance</th><td>{money(PLAN.baselineRemedies)}</td><td>{money(PLAN.proposedRemedies)}</td><td>{money(PLAN.proposedRemedies)}</td></tr>
    <tr><th scope="row">One-off external setup, expensed here</th><td>A$0</td><td>{money(PLAN.setupCash)}</td><td>A$0</td></tr>
    <tr><th scope="row">Result after listed expenses</th><td>{money(COSTS.baselineResult)}</td><td>{money(COSTS.firstWeekResult)}</td><td>{money(COSTS.repeatWeekResult)}</td></tr>
    <tr><th scope="row">Result as a percentage of revenue</th><td>{percent(COSTS.baselineMargin)}</td><td>{percent(COSTS.firstWeekMargin)}</td><td>{percent(COSTS.repeatWeekMargin)}</td></tr>
    <tr><th scope="row">Change from current process</th><td>Reference</td><td>{money(COSTS.firstWeekChange)}</td><td>{money(COSTS.repeatWeekChange)}</td></tr>
   </tbody></table></div>
   <p>The recurring costs are {money(COSTS.recurringCash)} plus {money(COSTS.incrementalRemedies)} of additional remedy allowance: the repeat-week result worsens by {money(-COSTS.repeatWeekChange)}, or {Math.abs(COSTS.repeatMarginPointChange ?? 0).toFixed(2)} percentage points at unchanged revenue. The first week also incurs external setup. No positive cash payback is established by these assumptions.</p>
   <p>The remedy allowances are not measured error rates, a cost per error or a cap on harm. They are separate cash allowances, not the internal correction minutes charged again. An unsupported safety claim, an unfair hire decision or unauthorised disclosure can have unpriced consequences and may stop the work outright. Timing of receipts/payments, depreciation, financing, tax, supplier terms and wider business changes are not modelled; get appropriate financial advice for your actual costs and accounting treatment.</p>
   <p><strong>What changes the decision?</strong> At five review minutes per reply, the repeat week takes {FIRST_WORKFLOW_SLOW_REVIEW.repeatWeekMinutes} minutes and the first week takes {FIRST_WORKFLOW_SLOW_REVIEW.firstWeekMinutes}; both exceed the baseline. Conversely, useful released time would need an evidenced business use or actually avoidable expense before it becomes a margin benefit. There is no automatic 20–30% threshold for expanding. Start with the simpler template and verify quality and costs before approving an AI pilot.</p>
   <p>The <a href="https://business.gov.au/finance/financial-tools-and-templates/set-up-a-profit-and-loss-statement">Australian Government's profit-and-loss guidance</a> explains recording sales and expenses, labelling estimates and stating the GST basis. It does not validate these fictional figures.</p>
   <p>For a more detailed calculation after selecting your candidate, use the <Link to="/articles/featured/how-small-business-owners-can-get-started-with-ai-2026">AI pilot worksheet</Link>. This article selects the workflow; that guide helps assess its pilot economics.</p>
   <h2 id="brief" className="scroll-mt-28">Copy this first-workflow brief</h2>
   <p><a href={FIRST_WORKFLOW_DOWNLOAD} download="first-ai-workflow-selection.txt">Download the editable selection record and completed fictional example (.txt)</a>, or copy the brief below. The file supplies the same twelve completed fields, all three candidates, first/repeat-week calculations and blank economics/actual-case records. No signup is required. Keep the example labelled and replace it with your own non-confidential observations. A worksheet is not a passed evaluation or an agreement to buy a project.</p>
   <details><summary>Completed FAQ workflow brief</summary><dl>{FIRST_WORKFLOW_BRIEF.map(field => <div key={field.label}><dt className="font-semibold">{field.label}</dt><dd>{field.value}</dd></div>)}</dl></details>
   <details><summary>Copy a blank first-workflow brief</summary><pre className="whitespace-pre-wrap break-words" aria-label="First business workflow brief"><code>{FIRST_WORKFLOW_BRIEF_TEMPLATE}</code></pre></details>
   <p>For the FAQ example, missing or conflicting source information should trigger a handoff rather than an invented answer. A draft must never become an automatic send simply because the tool offers that feature. Test these boundaries before live use and define how staff return to the current process.</p>
   <h2 id="implementation" className="scroll-mt-28">Get implementation help with the process, not a vague AI request</h2>
   <p>You can bring this brief to MLAI Studio without choosing a model, agent framework or programming language. Explain where the work hurts, what a correct outcome looks like and what must remain under your team's control. Scoping may identify a simpler non-AI fix or conclude that the task is not suitable yet.</p>
   <ArticleConversionCTA articleSlug={CATEGORY + "/" + SLUG} config={BASE_ARTICLE_SEO_CONFIG["/articles/" + CATEGORY + "/" + SLUG].conversion!} events={[]} placement="article-inline" />
   <p>The downloaded file is not automatically attached. Share only a permitted summary; acceptance and savings are not guaranteed. Confirm delivery-market eligibility with MLAI before planning work.</p>
   <p><small>Sources checked 11 September 2026. Codex assisted the fictional selection, cost example, brief and local checks. All proposed business tests are NOT RUN. Independent owner, technical/privacy and appropriate financial review remain outstanding; no client workflow was evaluated.</small></p>
  </div>
  <ArticleFAQ items={faqItems} />
 </div>;
}
