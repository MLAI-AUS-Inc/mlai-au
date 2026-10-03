import { Home } from "lucide-react";
import { Link } from "react-router";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";
import ArticleTocPlaceholder from "~/components/articles/ArticleTocPlaceholder";
import { DISCOVERY_LOG, DISCOVERY_QUESTIONS, DISCOVERY_COUNTS, DISCOVERY_CONVERSATIONS, DISCOVERY_EXAMPLE, DISCOVERY_NEXT_TEST, DISCOVERY_PROVENANCE } from "~/lib/customer-problem-discovery";
export { DISCOVERY_LOG } from "~/lib/customer-problem-discovery";

export const useCustomHeader = true;
export const SLUG = "community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-6";
export const articleMeta = {
  title: "AI Bits #6: Test the customer problem before scaling outreach",
  description: "Test an AI startup's customer problem with interview prompts, a completed fictional discovery record and an unrun experiment plan. Download the worksheet and discuss your next question.",
  datePublished: "2026-02-25",
  dateModified: "2026-09-10",
};
export const summaryHighlights = {
  heading: "From an AI idea to a testable customer problem",
  intro: "For Australian AI/startup-curious readers exploring an idea—not a formula for acquiring customers.",
  items: [
    { label: "What does the research study?", description: "The academic literature on AI in sales, using bibliometric analysis and topic modelling. It is not a customer-acquisition experiment." },
    { label: "What can I do next?", description: "Use the interview prompts, completed fictional record and unrun test plan to prepare your own evidence-led decision." },
    { label: "What counts as progress?", description: "Evidence that changes your next decision, including evidence against building the proposed product." },
  ],
};
export default function ArticlePage() {
  return <div>
    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: "AI Bits #6", current: true }]} title={articleMeta.title} titleHighlight="Test the customer problem" headerBgColor="cyan" summary={summaryHighlights} />
    <div data-cf-article-body className="mx-auto max-w-4xl px-4 py-8 prose prose-lg prose-indigo">
      <p><strong>Before scaling outreach for an AI product, establish whose problem you are testing and what would change your mind.</strong> This issue offers a conversation guide and a decision log you can use before investing in another feature. Neither compliments nor a clever demo establish demand.</p>
      <aside aria-label="Editorial correction" className="rounded-xl border border-amber-300 bg-amber-50 p-5">
        <p><strong>Correction — 9 September 2026.</strong> The original February issue misdescribed the research method and attributed sales frameworks to the paper without sufficient verification. Those claims and unsupported acquisition recipes have been removed. The research summary below is limited to the abstract; the practical exercise is editorial guidance, not a result from the study.</p>
      </aside>
      <p><strong>10 September update:</strong> a completed fictional discovery record, a separate unrun next-test plan and a downloadable worksheet now accompany the questions. No interviews, outreach or customer results were added.</p>
      <p>This is for Australian AI/startup-curious founders deciding whether an idea addresses a worthwhile problem. The immediate outcome is a reasoned decision to investigate, change scope or stop—not a sales funnel or a contractor application.</p>
      <ArticleTocPlaceholder />

      <h2 id="research" className="scroll-mt-28">What the paper actually examines</h2>
      <p>Viktor Jarotschkin, Mostofa Wahid Soykoth and Nawar N. Chaker's 2025 paper, <a href="https://doi.org/10.1016/j.jbusres.2025.115383">Artificial intelligence in sales research: Identifying emergent themes and looking forward</a>, appears in the Journal of Business Research. The source check below uses the <a href="https://www.sciencedirect.com/science/article/abs/pii/S0148296325002061">publisher-indexed abstract</a>, checked on 10 September 2026; full text was not independently reviewed.</p>
      <p>On small screens, scroll the tables sideways. Keyboard users can focus each labelled table region and use the arrow keys.</p>
      <div role="region" aria-label="Sales research claim boundaries" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[38rem]">
        <caption>Research findings and this article's practical suggestions have different evidence</caption>
        <thead><tr><th>Statement</th><th>Support</th><th>Limit</th></tr></thead>
        <tbody>
          <tr><td>Study 1 maps the scholarly literature's networks and structure.</td><td>Bibliometric analysis, described in the abstract.</td><td>Not a longitudinal customer-acquisition trial.</td></tr>
          <tr><td>Study 2 identifies five themes in article contents.</td><td>Latent Dirichlet Allocation topic modelling, described in the abstract.</td><td>Not five validated sales prescriptions.</td></tr>
          <tr><td>The worksheet tests a founder's problem hypothesis.</td><td>MLAI's explicitly hypothetical editorial exercise below.</td><td>Not an intervention or customer result from the paper.</td></tr>
        </tbody>
      </table></div>
      <p>Neither a universal build-versus-sell time allocation nor a guaranteed acquisition rate is established here. The literature review does not validate the exercise.</p>

      <h2 id="hypothesis" className="scroll-mt-28">1. Write a problem hypothesis, not a product pitch</h2>
      <p>Choose one role, one situation and one suspected difficulty. “Businesses need AI” is too broad to test. State what someone does today and why changing that work might matter. Write down a competing explanation before speaking to anyone.</p>
      <p><strong>Illustrative example, not customer research:</strong> “An owner of a small service business spends time checking whether enquiries received a reply.” A competing explanation is that the existing inbox already handles this adequately; the real issue might be unclear responsibility rather than missing software. Do not assume an AI agent is the answer.</p>
      <p>Keep the initial question separate from your preferred implementation. If participants describe a simple process change, that is useful evidence even when it removes the reason to build your product.</p>

      <h2 id="conversation" className="scroll-mt-28">2. Ask about a recent event</h2>
      <p>Explain who you are, that you are exploring a possible product and how you intend to use the conversation. Do not disguise selling as neutral research. Ask permission before recording or retaining notes; avoid collecting customer records or confidential material. A participant can decline or stop.</p>
      <ol>
        {DISCOVERY_QUESTIONS.map(([question, followup]) => <li key={question}><strong>“{question}”</strong> {followup}</li>)}
      </ol>
      <p>Record what was said separately from what you think it means. Quotes require permission for publication and enough context to remain accurate. AI can help organise de-identified notes when appropriate, but invented interviews, inferred motives and synthetic quotes must never become customer evidence.</p>

      <h2 id="test" className="scroll-mt-28">3. Choose the next test before counting success</h2>
      <p>A conversation can identify a question worth testing; it does not prove willingness to pay. Agree a bounded next step with a willing participant, such as reviewing a mock workflow using fictional inputs. State what you will observe, the effort you can afford and what would make you stop or change direction.</p>
      <div role="region" aria-label="Customer discovery signal limits" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[36rem]">
        <caption>Example decision rules to adapt—not validated conversion benchmarks</caption>
        <thead><tr><th>Signal</th><th>What it supports</th><th>What to do next</th></tr></thead>
        <tbody>
          <tr><td>“That sounds useful”</td><td>A favourable reaction to the description.</td><td>Ask about the recent workflow; do not record a sale.</td></tr>
          <tr><td>A participant identifies a concrete recurring exception</td><td>A specific problem hypothesis for that participant.</td><td>Check the workaround and test the exception with safe sample inputs.</td></tr>
          <tr><td>A willing participant completes an agreed trial task</td><td>Observed behaviour in that trial's conditions.</td><td>Record effort, errors and limitations; investigate purchasing separately.</td></tr>
          <tr><td>No response, refusal or a satisfactory existing solution</td><td>Recruitment uncertainty or evidence against your assumption.</td><td>Keep it in the log. Reconsider segment, method or need before building more.</td></tr>
        </tbody>
      </table></div>
      <p>Define the segment, recruitment route and time window when reporting results. Track invitations and refusals as well as completed conversations. A convenience sample of friends or event attendees does not represent the whole Australian market. Do not select only encouraging responses or describe a small trial as product-market fit.</p>

      <h2 id="worked-example" className="scroll-mt-28">4. A worked decision that changes the proposed product</h2>
      <p><strong>{DISCOVERY_PROVENANCE}</strong> This is an illustration of how to reason, not customer research.</p>
      <p>A Melbourne idea-stage founder suspects that small service-business owners miss replies because drafting is difficult. The fit rule is an owner who personally handles or supervises enquiries and can describe a recent instance. The competing explanations are an adequate existing inbox, unclear responsibility or an unimportant problem.</p>
      <p>The fictional recruitment window is 1–7 September 2026, using permission-first introductions through an existing professional network. The ledger retains <strong>{DISCOVERY_COUNTS.invited} invitations: {DISCOVERY_COUNTS.completed} completed conversations, {DISCOVERY_COUNTS.declined} declines and {DISCOVERY_COUNTS.noResponse} without a response by the cutoff</strong>. All eight invented records are in the download. This convenience sample cannot represent the Australian market, and no actual contact permission exists.</p>
      <div role="region" aria-label="Fictional discovery notes and interpretations" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[42rem]">
        <caption>Invented participant reports, not observed workflows, quotes or transcripts</caption>
        <thead><tr><th>Record / fictional date</th><th>Invented report</th><th>Interpretation</th><th>Not established</th></tr></thead>
        <tbody>{DISCOVERY_CONVERSATIONS.map(row => <tr key={row.id}><td>{row.id}<br />{row.date}</td><td>{row.note}</td><td>{row.interpretation}</td><td>{row.missing}</td></tr>)}</tbody>
      </table></div>
      <p><strong>Missing measurement:</strong> {DISCOVERY_EXAMPLE[5][1]}</p>
      <p><strong>Worked decision:</strong> {DISCOVERY_EXAMPLE[10][1]}</p>
      <p>P1 stays in the example because a satisfactory existing solution challenges the original idea. P3 and P5 suggest a different question; they do not establish paid demand. Declines and non-response may concern access or timing, not the absence of a problem. None of these invented notes should be used in a pitch deck as traction.</p>

      <h2 id="next-test" className="scroll-mt-28">5. Specify a small next test without inventing its outcome</h2>
      <p>The founder's proposed follow-up is a manual responsibility exercise, not an AI build. It is <strong>UNRUN</strong>; the example includes no participant behaviour or measured improvement. Replace the invented dates and limits with your own before proposing a real test.</p>
      <dl>{DISCOVERY_NEXT_TEST.map(([label, value]) => <div key={label} className="mb-5"><dt className="font-bold">{label}</dt><dd className="ml-0">{value}</dd></div>)}</dl>
      <p>Keep the task and evidence separate from the technology you hoped to sell. If a clearer owner/status column is sufficient, that is a reason not to commission an autonomous reply agent. If the test cannot be completed, preserve the missing result and decide how to investigate it.</p>

      <h2 id="log" className="scroll-mt-28">6. Save the prompts, example and decision log</h2>
      <p><a href="/downloads/customer-problem-discovery.txt" download="customer-problem-discovery.txt">Download the discovery worksheet</a> as an editable plain-text file. It includes the six prompts, blank log, all eleven completed example fields, eight-record recruitment ledger, three fictional conversation notes and unrun test plan. No account or email is required.</p>
      <p>Use one record per test in your own notes. This is a working aid, not a validated research instrument. Keep the supplied fictional example separate from any actual notes, and leave uncertain fields unknown. You can also select and copy the blank log below if downloading is unavailable.</p>
      <pre className="whitespace-pre-wrap break-words" aria-label="Customer discovery decision log"><code>{DISCOVERY_LOG}</code></pre>
      <p>End with a decision and its reason. “Stop: the current process is adequate” is a legitimate outcome. “Investigate: the user has the problem but the budget owner is unknown” is more informative than counting another positive conversation.</p>

      <h2 id="community" className="scroll-mt-28">Continue the discussion without turning it into a pitch</h2>
      <p>If you want peers to challenge your assumptions, bring the non-confidential problem statement and one unresolved question to a suitable community event. Ask whether someone wants to discuss it; attending is not consent to a sales sequence. Peers can help improve the test, but their feedback does not replace evidence from your intended customers.</p>
      <ArticleConversionCTA articleSlug={SLUG} config={BASE_ARTICLE_SEO_CONFIG["/articles/" + SLUG].conversion!} events={[]} placement="article-inline" />
      <p>Only once a problem warrants an offer, continue with the <Link to="/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026">first-customer conversation and scoped-offer guide</Link>. That is a later decision, not a reason to ignore contrary evidence here. No worksheet is automatically shared with event organisers or attendees.</p>
      <p className="text-sm">Original publication: 25 February 2026. Substantive correction: 9 September; worked-example update: 10 September 2026. Original contributor credits remain in the publication record. Codex assisted the fictional teaching material and local checks; no actual customer research or new independent expert review is claimed.</p>
    </div>
  </div>;
}
