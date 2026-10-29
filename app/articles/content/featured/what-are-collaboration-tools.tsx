import { Home } from "lucide-react";
import { Link } from "react-router";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";
import ArticleTocPlaceholder from "~/components/articles/ArticleTocPlaceholder";
import { COLLABORATION_HANDOFF_DOWNLOAD, HANDOFF_FIELDS, HANDOFF_WORKSHEET, HANDOFF_PLANNING_OPTIONS, HANDOFF_ACCEPTANCE_CASES, HANDOFF_CAPACITY_MINUTES, handoffSetupCost } from "~/lib/collaboration-handoff";
export { HANDOFF_WORKSHEET } from "~/lib/collaboration-handoff";

export const useCustomHeader = true;
export const CATEGORY = "featured";
export const SLUG = "what-are-collaboration-tools";
// Preserve the canonical registry date rather than the old conflicting body date.
export const DATE_PUBLISHED = "2025-12-13";
export const DATE_MODIFIED = "2026-09-11";
const TITLE = "Collaboration tools for small businesses: fix the handoff first";
export const DESCRIPTION = "Map a missed handoff, compare process fixes with software changes, and test whether a collaboration workflow reduces rework before paying for an AI integration.";
const PATH = "/articles/" + CATEGORY + "/" + SLUG;
const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-0c642a28-660d-4dee-b077-ee0c5181aa24.jpg?alt=media&token=188443b2-3bf5-4caa-b39f-68e465028cf4";
export const articleMeta = { title: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO, imageAlt: "Illustration of a team discussing a shared workflow" };
export const summaryHighlights = {
  heading: "Choose for the work, not the feature list",
  intro: "For an owner or operations manager whose team loses time chasing updates, re-entering information or correcting missed handoffs.",
  items: [
    { label: "What are collaboration tools?", description: "Software for sharing messages, documents, decisions and responsibility for work. Agree where the current state is recorded and who owns the next step." },
    { label: "Do you need another app?", description: "Not necessarily. Test whether clearer ownership, a shared template or configuration of an existing tool solves the problem first." },
    { label: "Where could AI help?", description: "A bounded suggestion or draft may help with unstructured input. It must not silently turn a summary into an approved decision or customer commitment." },
  ],
};
export const faqItems = [
  { question: "How do communication and collaboration tools differ?", answer: "Communication tools carry messages and conversations. Collaboration also involves shared work: its current version, owner, status and decisions. One product can support both, but posting a message is not the same as the next person accepting responsibility." },
  { question: "Which collaboration tool should a small business choose?", answer: "Match the missing behaviour: messaging for discussion, shared documents for editable records, task tracking for ownership, or an integration for transferring information. Check existing tools first and demonstrate the behaviour on the subscription you would actually use." },
  { question: "Should I add AI to a handoff workflow?", answer: "Only if a defined task benefits from it and you can test the result. A fixed rule is easier to inspect when inputs are structured and the decision is stable. Keep AI suggestions separate from approved records and require review before consequential actions." },
  { question: "Does time saved mean higher margins?", answer: "Not automatically. Released staff time is capacity. A margin claim needs evidence of additional contribution or spending actually avoided, after setup, subscriptions, review, maintenance and rework. Do not count the same time as both cash savings and extra revenue." },
];

export default function ArticleContent() {
  return <div>
    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: TITLE, current: true }]} title={TITLE} titleHighlight="fix the handoff first" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
    <div data-cf-article-body className="mx-auto max-w-4xl px-4 py-8 prose prose-lg prose-indigo">
      <p><strong>Collaboration tools help people share information and coordinate work. They cannot decide who is responsible for a handoff your business has never defined.</strong> If staff keep asking “which version?”, “who owns this?” or “has the customer approved it?”, start with one recurring breakdown before adding another application.</p>
      <p>This guide is for small-business owners and operations managers, particularly Australian teams considering implementation help. It offers a worksheet and test plan, not a product ranking or a reported MLAI customer result. The workflow method is editorial guidance; the Australian security and privacy sources below address separate controls.</p>
      <p><strong>11 September update:</strong> added a completed fictional handoff, comparable planning-cost entries and a downloadable record. The trial and acceptance tests are not performed; no client outcome is implied.</p>
      <ArticleTocPlaceholder />

      <h2 id="match-tool" className="scroll-mt-28">1. Identify the missing behaviour</h2>
      <p>On narrow screens, scroll tables sideways. Keyboard users can focus each labelled table region and use the arrow keys.</p>
      <div role="region" aria-label="Collaboration needs comparison" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[38rem]">
        <caption>Collaboration needs and what to demonstrate before buying</caption>
        <thead><tr><th>Problem</th><th>Tool category</th><th>Proof to request</th></tr></thead>
        <tbody>
          <tr><td>Questions are scattered across private messages.</td><td>Shared communication space</td><td>A colleague can find the decision and linked work record without asking the author.</td></tr>
          <tr><td>Several document copies disagree.</td><td>Shared document or knowledge store</td><td>The team can identify the approved version, see changes and restore an earlier version.</td></tr>
          <tr><td>A request has no next owner.</td><td>Task or case tracking</td><td>Ownership, required information and receiver acceptance are visible, including when someone is absent.</td></tr>
          <tr><td>Staff re-enter approved details.</td><td>Integration or fixed automation</td><td>The transfer uses a unique ID, handles duplicates and exposes failures without losing the request.</td></tr>
        </tbody>
      </table></div>
      <p>These are selection requirements, not claims that every product includes them. A suite may cover several categories. Demonstrate the actual subscription, permissions and configuration; a demo of another plan does not establish that your team can use the same controls.</p>

      <h2 id="handoff-example" className="scroll-mt-28">2. Define one handoff before automating it</h2>
      <p><strong>Fictional example:</strong> a service business passes an accepted quote from sales to scheduling. Sales posts a chat message, scheduling copies details into a board and someone later discovers the approved scope is missing. No customer data or measured client outcome is represented here.</p>
      <p>A better specification is: the approved quote remains the source of truth; its ID links to a scheduling task; sales confirms required fields; a named scheduler accepts the handoff. A chat alert points to that task. It does not approve the quote, change the price or commit a service date.</p>
      <ul>
        <li><strong>Ready:</strong> approved scope and a usable source-record link exist. Missing approval keeps the request in an exception queue.</li>
        <li><strong>Received:</strong> the scheduler explicitly accepts ownership. A notification being delivered or read is insufficient.</li>
        <li><strong>Changed:</strong> a scope revision after acceptance returns to a named reviewer; it must not silently overwrite scheduled work.</li>
        <li><strong>Absent:</strong> the backup owner can see unresolved requests without gaining unrelated customer access.</li>
      </ul>
      <p>Agree these rules with people doing both sides of the work. If they disagree about what “approved” means, an integration will reproduce the disagreement faster.</p>

      <h2 id="copy-workflow" className="scroll-mt-28">3. Use a completed record, then write your own</h2>
      <p><a href={COLLABORATION_HANDOFF_DOWNLOAD} download="collaboration-handoff.txt">Download the handoff record and selection worksheet</a>. It contains the completed example, all three options, a blank worksheet and six acceptance cases. It is editable plain text; no signup is required.</p>
      <details><summary>Completed fictional handoff: quote Q-104 to scheduling</summary><dl>{HANDOFF_FIELDS.map(field => <div key={field.label}><dt className="font-semibold">{field.label}</dt><dd>{field.example}</dd></div>)}</dl></details>
      <p>Use one real workflow but remove customer names, credentials and confidential commercial detail from anything shared externally. Write “unknown” where investigation is needed. This is a scoping aid, not a contract or compliance certification.</p>
      <details><summary>Copy the blank worksheet</summary><pre className="whitespace-pre-wrap break-words"><code>{HANDOFF_WORKSHEET}</code></pre></details>

      <h2 id="configure-or-build" className="scroll-mt-28">4. Compare the three paths</h2>
      <p><strong>Fix the process first</strong> when the missing piece is an owner, acceptance rule or document convention. Try a shared template and manual queue. Record what still fails; do not add AI simply to make the change appear more advanced.</p>
      <p><strong>Configure existing software</strong> when it can represent the record, ownership, permissions and exception path you need. Include setup and training effort in the comparison, along with any subscription upgrade. Assign someone to maintain the configuration.</p>
      <p><strong>Consider a scoped build</strong> when tested requirements remain missing—for example, transferring approved records between systems while enforcing access and duplicate handling. Ask for a demonstration, maintenance owner and exit/export path.</p>
      <p>An AI component might propose a summary of an unstructured enquiry for staff review. In this example it must not turn that summary into an approved quote or send a customer commitment. Require the builder to enforce permissions in the surrounding software, not just a model instruction. Keep the source visible so reviewers can check omissions.</p>
      <p><strong>Fictional planning comparison—not supplier prices:</strong> the entries below illustrate what to collect on a consistent cost/tax basis. A$50/hour values internal setup capacity; it is not an avoidable payroll expense. Replace every estimate with your own evidence. Unknown build costs prevent a complete financial ranking.</p>
      <div role="region" aria-label="Handoff options cost and control comparison" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[48rem]"><caption>Same quote-to-scheduling problem; no option is approved for live use</caption><thead><tr><th>Path</th><th>Setup and cash assumptions</th><th>Review and maintenance</th><th>Access, recovery and exit</th><th>Decision</th></tr></thead><tbody>
        {HANDOFF_PLANNING_OPTIONS.map(option => <tr key={option.name}><th scope="row">{option.name}</th><td>{option.setupHours === null ? "Unknown — obtain a quote" : <>{option.setupHours} internal hours + A${option.setupCash} external setup; A${option.monthlyCash}/month incremental cash. Setup economic value: A${handoffSetupCost(option)}.</>}<p>{option.costLimit}</p></td><td>{option.upkeep}</td><td>{option.access}</td><td>{option.decision}</td></tr>)}
      </tbody></table></div>
      <p><strong>Worked decision: prepare a process-only trial.</strong> The example's first gap is unclear acceptance, not missing AI. Agree the roles and demonstrate access/recovery before starting. No trial has run, no purchase is authorised and no savings have been measured. Reconsider configuration or a build only when the manual trial exposes a specific unmet requirement.</p>
      <ArticleConversionCTA articleSlug={CATEGORY + "/" + SLUG} config={BASE_ARTICLE_SEO_CONFIG[PATH].conversion!} events={[]} placement="article-inline" />
      <p>If implementation is needed, expand the worksheet into a <Link to="/articles/featured/how-to-build-ai-for-real-business-problems">scoped business-build brief</Link>. Your downloaded record is not automatically attached; share only a permitted summary. An enquiry is not a promise of acceptance, a free discovery engagement or a guaranteed saving. International client availability should be <Link to="/contact">confirmed with MLAI</Link> before planning delivery.</p>

      <h2 id="acceptance-tests" className="scroll-mt-28">5. Test exceptions, not just a successful transfer</h2>
      <p>Use synthetic records before granting live customer access. These cases start the fictional sales-to-scheduling test plan; they are not sufficient assurance for every business. Record input, expected result, actual result, version and reviewer for each.</p>
      <p><strong>All six cases below are NOT RUN.</strong> A specified result is not evidence that a product enforces it. In a process-only trial, test the equivalent manual failure and recovery; do not mark a nonexistent connector test as passed.</p>
      <div role="region" aria-label="Handoff acceptance plan" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[38rem]">
        <thead><tr><th>Case</th><th>Expected behaviour</th><th>Evidence</th></tr></thead>
        <tbody>
          {HANDOFF_ACCEPTANCE_CASES.map(row => <tr key={row.id}><td>{row.id}: {row.case}</td><td>{row.expected}</td><td>{row.evidence}</td></tr>)}
        </tbody>
      </table></div>
      <p>Stop the pilot if it loses a request, exposes information to an unauthorised account or makes an unapproved commitment. Agree other acceptable error thresholds before testing, with consequences and unresolved risks documented by the accountable owner.</p>

      <h2 id="measure-value" className="scroll-mt-28">6. Measure completed work and rework—not message counts</h2>
      <p>Before changing the workflow, record case count, active handling time, elapsed handoff time, missed requests and rework in a representative period. Repeat for a comparable pilot period, including exceptions, review and maintenance. Note workload or case-difficulty changes; before/after comparisons alone do not establish causation.</p>
      <p><strong>Arithmetic example, not a forecast:</strong> 40 comparable handoffs taking 12 active minutes each use 480 minutes. At 7 minutes each, they use 280 minutes. Subtract 80 extra minutes of review and maintenance from the 200-minute difference: the potential net release is {HANDOFF_CAPACITY_MINUTES} minutes, or two hours. Case review and rework are already inside the per-case figures; any additional rework outside that assumption reduces the result further. These are unmeasured planning inputs for the process-only example, not a comparison of implemented products.</p>
      <p>Those two hours are capacity, not automatically cash savings. Add subscriptions and setup effort; identify spending actually avoided or extra work generating contribution. Do not count both against the same hours. Use the <Link to="/articles/featured/how-small-business-owners-can-get-started-with-ai-2026">AI pilot economics worksheet</Link> to separate capacity from avoidable cash costs.</p>
      <p>Continue only if evidence meets agreed operational and cost criteria. Otherwise change scope, return to the manual process or stop. More messages, logins or AI summaries do not prove a better margin.</p>

      <h2 id="access-and-privacy" className="scroll-mt-28">7. Check access and data responsibilities</h2>
      <p>The Australian Cyber Security Centre’s <a href="https://www.cyber.gov.au/business-government/protecting-devices-systems/cloud-computing/cloud-shared-responsibility-model-guidance-for-individuals-and-small-and-medium-businesses">cloud shared-responsibility guidance for small and medium businesses</a> explains that a cloud provider does not remove your own responsibilities. It includes controlling data access, strong authentication and incident readiness.</p>
      <p>Have the responsible administrator demonstrate guest access, account removal, connected-app permissions, export and recovery. Confirm who receives alerts and can disable the integration. These are review questions, not certification that a configuration is compliant.</p>
      <p>If AI handles personal information, consult the OAIC’s <a href="https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products">guidance on commercially available AI products</a>. It recommends product due diligence and human oversight, and advises against entering personal information—especially sensitive information—into publicly available generative AI tools. Do not treat a paid plan or Australian hosting label as a complete privacy assessment. Obtain advice appropriate to your business and jurisdiction.</p>
      <p><small>Source pages checked 11 September 2026. Codex assisted the completed record, comparison, arithmetic and local checks. These are editorial aids, not regulator-endorsed instructions or a measured customer case study. Independent sender/receiver, delivery and appropriate access/privacy review remain outstanding.</small></p>
      <h2 id="next-step" className="scroll-mt-28">Your next step</h2>
      <p>Ask the sender and receiver to complete one worksheet together. Try the simplest change meeting its rules, then keep exception and cost evidence. If you need a builder, share the non-confidential workflow and tests—not just a request for “an AI agent”.</p>
      <ArticleFAQ items={faqItems} />
    </div>
  </div>;
}
