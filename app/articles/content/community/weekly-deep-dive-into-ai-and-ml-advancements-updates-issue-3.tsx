import { Home } from 'lucide-react'
import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
import ArticleConversionCTA from '~/components/articles/ArticleConversionCTA'
import { BASE_ARTICLE_SEO_CONFIG } from '~/articles/seo-config'
export const useCustomHeader = true
export const CATEGORY = 'community'
export const SLUG = 'weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-3'
export const DATE_PUBLISHED = '2026-01-26'
export const DATE_MODIFIED = '2026-09-09'
export const DESCRIPTION = 'Interpret AI energy and water estimates without false precision: inspect measurement boundaries, work through a labelled scenario and prepare better research questions.'
const TITLE = 'AI Bits #3: How to read an AI environmental-footprint estimate'
export const faqItems = [
 { id: 1, question: 'Does every AI query have the same footprint?', answer: 'Do not assume so. Check the workload, model/version, hardware assumptions and accounting boundary behind any quoted number. This article does not measure your provider’s infrastructure.' },
 { id: 2, question: 'Can I convert an electricity estimate straight into water use or emissions?', answer: 'Not without additional, compatible assumptions or measurements. State the factor, geography, period and boundary used. Missing information should remain unknown, not become zero.' },
 { id: 3, question: 'Is a lower footprint proof that a model is better?', answer: 'No. Fitness for a task and environmental impact are different questions. Compare task acceptance and resource accounting separately; a failed answer is not equivalent to a useful one.' },
]
export default function ArticlePage() {
 return <div className="bg-white">
  <ArticleHeroHeader breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: 'AI Bits #3', current: true }]}
   title={TITLE} titleHighlight="environmental-footprint estimate" headerBgColor="cyan"
   summary={{ heading: 'Check what is being counted', intro: 'For AI-curious readers discussing environmental claims—not a provider ranking or a measurement of your own usage.', items: [
    { label: 'Measured or modelled?', description: 'Identify direct observations, inferred inputs and scenario assumptions.' },
    { label: 'Same boundary?', description: 'Check what each estimate includes before comparing numbers.' },
    { label: 'Useful next question', description: 'Ask what evidence would make the comparison meaningful.' },
   ] }}
  />
  <article className="prose prose-lg max-w-3xl mx-auto px-4 py-10">
   <p><strong>Correction, 9 September 2026:</strong> the earlier issue stated precise per-query figures and broad reduction claims without keeping their assumptions visible. This revision removes those universal claims and distinguishes estimation from direct measurement. The original January issue date is retained.</p>
   <h2 id="source">What the cited paper actually describes</h2>
   <p><a href="https://arxiv.org/abs/2505.09598v6">Jegham and colleagues’ “How Hungry is AI?”, version 6</a>, dated 24 November 2025, describes an infrastructure-aware framework covering 30 models. Its abstract says it combines public API performance data, company-specific environmental multipliers and statistically inferred hardware configurations. That is not direct metering of every commercial query.</p>
   <p>The abstract reports estimates above 29 Wh for some long prompts and a spread exceeding 65 times between systems. These are attributed results within its framework—not current measurements for your requests. This revision checked the abstract and version history, not a complete reanalysis of its data or assumptions.</p>
   <p>Our interpretation: a useful discussion starts by identifying how a number was obtained. Do not repeat a dramatic comparison without its workload and uncertainty. A dated estimate can be informative without becoming a universal constant.</p>
   <h2 id="boundaries">Five checks before comparing two headlines</h2>
   <div className="my-6 max-w-full overflow-x-auto" role="region" aria-label="Environmental footprint claim boundaries" tabIndex={0}><table><thead><tr><th>Check</th><th>Question to ask</th><th>Common mismatch</th></tr></thead><tbody>
    <tr><td>Unit and denominator</td><td>Is it Wh per request, per token, per completed task or for an entire period?</td><td>Comparing a single answer with a multi-step workflow</td></tr>
    <tr><td>Workload</td><td>What input/output lengths, reasoning settings, retries and caching assumptions apply?</td><td>Comparing short drafts with long reasoning runs</td></tr>
    <tr><td>System boundary</td><td>Does it include only computation, facility overhead, training or hardware manufacture?</td><td>Treating an operational estimate as a whole-life total</td></tr>
    <tr><td>Location and date</td><td>Which infrastructure and environmental factors were used, and when?</td><td>Applying an overseas historical factor to an unknown deployment</td></tr>
    <tr><td>Method and uncertainty</td><td>Which inputs were measured, disclosed, inferred or assumed?</td><td>Presenting a modelled point estimate as exact metered consumption</td></tr>
   </tbody></table></div>
   <p>For a water claim, also ask whether the quantity refers to withdrawal or consumption and whether electricity-related and on-site uses are included. For a carbon claim, ask which emissions boundary and conversion factor apply. Keep the terms used by the source; these quantities are not interchangeable labels.</p>
   <h2 id="scenario">A worked scenario—not your provider’s footprint</h2>
   <p><strong>Entirely hypothetical inputs:</strong> suppose an operational estimate is 0.5–1.5 Wh per request and a workflow makes 10,000 requests in a month. Assume the estimate already includes the overhead being discussed. No actual model or provider is represented.</p>
   <ul>
    <li>Lower scenario: 0.5 × 10,000 = 5,000 Wh = 5 kWh.</li>
    <li>Upper scenario: 1.5 × 10,000 = 15,000 Wh = 15 kWh.</li>
    <li>If those 10,000 requests include 2,000 retries, do not add the retries again.</li>
    <li>If 10,000 means initial requests and another 2,000 retries occur, the scenario becomes 6–18 kWh.</li>
   </ul>
   <p>The interval comes from chosen assumptions; it is not a statistical confidence interval. It omits training and equipment manufacture. It also supplies no water or emissions factors, so those results remain unknown. Multiplying a precise request count by an uncertain input does not remove the uncertainty.</p>
   <p>Do not multiply by facility overhead again if it is already included. Before changing a factor, explain the new boundary. Before claiming a reduction, check that both scenarios deliver comparable accepted outputs and count unsuccessful attempts consistently.</p>
   <h2 id="claims">Practice: rewrite an overconfident statement</h2>
   <p><strong>Fictional claim:</strong> “Moving our chatbot saves 70% of water and makes the model smarter.”</p>
   <p><strong>Evidence-aware alternative:</strong> “We do not yet have a comparable water estimate for both deployments. We need the workload, location, accounting boundary and factor sources. We will assess answer quality separately using the same task criteria.”</p>
   <p>This is not a finding that a migration cannot help. It is a statement that the supplied evidence is insufficient. An appropriate next step is to request the missing methodology, not choose a more convincing number or claim that environmental efficiency is model intelligence.</p>
   <h2 id="record">Copy an environmental-claim reading record</h2>
   <pre className="whitespace-pre-wrap" aria-label="AI environmental claim record">{[
    'Exact claim and source/version/date:',
    'Quantity, unit and denominator:',
    'Workload and accepted-task definition:',
    'Request count and treatment of retries:',
    'What is included and excluded:',
    'Measured, disclosed, inferred or assumed inputs:',
    'Location, period and factor source:',
    'Uncertainty and sensitivity to assumptions:',
    'What the comparison does not establish:',
    'Missing evidence and next question:',
   ].join('\n')}</pre>
   <p>No account or download is needed to use this record. If provider information is unavailable, label the result as incomplete. Do not substitute an unrelated model’s estimate simply because it is public.</p>
   <h2 id="discussion">Bring a specific question to an MLAI event</h2>
   <p>For an AI discussion, try: “Does this footprint estimate count retries and overhead, and how were the inputs obtained?” Bring the source rather than only a screenshot of the headline. Choose a relevant topic, experience level and online or in-person format; attendance does not provide environmental assurance or certify a product.</p>
   <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement="article-inline" />
   <h2 id="scope">Editorial scope</h2>
   <p>The linked paper abstract and version history were checked on 9 September 2026. The checklist and hypothetical arithmetic are editorial teaching material, not a measured MLAI footprint, procurement recommendation or lifecycle assessment. Previous tool and book endorsements were removed to keep this issue focused on interpreting the research.</p>
   <ArticleFAQ items={faqItems} />
  </article>
 </div>
}
