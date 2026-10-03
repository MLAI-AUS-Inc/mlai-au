import { Home } from 'lucide-react'
import { Link } from 'react-router'
import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
import ArticleConversionCTA from '~/components/articles/ArticleConversionCTA'
import { BASE_ARTICLE_SEO_CONFIG } from '~/articles/seo-config'
import ArticleTocPlaceholder from '~/components/articles/ArticleTocPlaceholder'
import DeliveryEffortWorksheet from '~/components/articles/DeliveryEffortWorksheet'
import { compareDeliveryEffort, FICTIONAL_BASELINE, FICTIONAL_DELIVERY } from '~/lib/delivery-effort'
import handoverRun from '../../../../public/downloads/environment-handover/recorded-run.json'
export const useCustomHeader = true
export const CATEGORY = 'community'
export const SLUG = 'weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-4'
export const DATE_PUBLISHED = '2026-02-05'
export const DATE_MODIFIED = '2026-09-10'
export const DESCRIPTION = 'Compare two historical AI coding studies, distinguish effort from elapsed time, and use an editable acceptance log that preserves missing values and review limits.'
export const TITLE = 'AI Bits #4: Do AI coding tools save delivery time?'
const comparison = compareDeliveryEffort(FICTIONAL_BASELINE, FICTIONAL_DELIVERY.times)
export const faqItems = [
 { id: 1, question: 'Do these studies prove that AI always slows developers down?', answer: 'No. Preserve each study’s population, tools, period and outcome measure. Neither provides a universal estimate for your current project or a newer coding tool.' },
 { id: 2, question: 'Is a passing test suite enough to prove productivity?', answer: 'Tests provide evidence only for the behaviours they cover. Record task acceptance, review effort, rework and remaining risks as well. Faster generation alone does not establish faster delivery.' },
 { id: 3, question: 'Should I publish client prompts and source code as evidence?', answer: 'Only when you have permission. Redact private data, credentials and proprietary details. You can describe your process and use a separate permitted demonstration; portfolio use is not automatic.' },
]
export default function ArticlePage() {
 return <div className="bg-white">
  <ArticleHeroHeader breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: 'AI Bits #4', current: true }]}
   title={TITLE} titleHighlight="delivery time" headerBgColor="cyan"
   summary={{ heading: 'Evidence for builders using AI coding tools', intro: 'Show how you reached an accepted result, including work that happened after the first draft.', items: [
    { label: 'Keep studies separate', description: 'Task completion time and repository activity are different outcomes.' },
    { label: 'Count effort across people', description: 'A shorter authoring session can coexist with more review work.' },
    { label: 'Show what you verified', description: 'Use acceptance evidence, limitations and handover notes—not generated line counts.' },
   ] }}
  />
  <div data-cf-article-body className="prose prose-lg max-w-3xl mx-auto px-4 py-10">
   <p>This issue is for early-career builders using AI coding tools who want to demonstrate dependable project delivery. It revisits two earlier studies, then gives you a filled teaching log, editable worksheet and a runnable exercise for recording your own evidence. It is not a current model ranking or a claim that one workflow improves every developer’s productivity.</p>
   <p><strong>Editorial revision, 9 September 2026:</strong> the original February issue date is retained. Broad explanations of when AI helps have been replaced with study-specific findings and an explicit measurement plan. Unverified tool endorsements have been removed.</p>
   <p><strong>10 September update:</strong> added downloadable records, explicit missing-time handling and a checked worksheet; clarified the studies' time and activity measures. The filled CSV example is fictional; it is not a new experiment or client case.</p>
   <ArticleTocPlaceholder />
   <h2 id="studies" className="scroll-mt-28">Two findings, two different measurements</h2>
   <p>In <a href="https://arxiv.org/abs/2507.09089v2">Becker and colleagues’ 25 July 2025 version</a>, 16 experienced open-source developers completed 246 tasks in familiar mature projects. Tasks were randomly assigned to allow or disallow February–June 2025 AI tools, primarily Cursor with Claude 3.5/3.7 Sonnet. The authors report 19% longer completion time when AI was allowed. <a href="https://arxiv.org/html/2507.09089v2#S2.SS3">Section 2.3</a> measures developers' self-reported implementation work before and after PR review, with some missing post-review times imputed—not calendar duration or every reviewer's labour. The estimate adjusts for forecast task difficulty; <a href="https://arxiv.org/html/2507.09089v2#A4.SS2">Appendix D.2</a> explains its 95% confidence intervals and sensitivity to the uncertainty method. It is not a fixed slowdown for every developer or today's models.</p>
   <p><a href="https://arxiv.org/abs/2510.10165v3">Xu and colleagues’ 28 January 2026 version</a> analyses open-source activity following Copilot's introduction. Its <a href="https://arxiv.org/html/2510.10165v3#S6.SS2">subgroup results</a> report 19% fewer commits and 6.5% more PR reviews for core contributors, with 95% confidence intervals plotted in Figure 5. These are activity counts—not measured hours, lines of code reviewed or the same completion-time measure as the randomised trial. The <a href="https://arxiv.org/html/2510.10165v3#S3">methods</a> compare changes across supported and comparison language groups using difference-in-differences; individual Copilot usage is not observed. The result depends on exposure, comparison and contributor-group assumptions, not simply knowing that a person used AI.</p>
   <p>These are checks of the abstracts and selected measurement sections, not independent reproduction or a full causal-methods review. Do not average their percentages or call them a combined “AI slowdown rate”. Treat the worksheet below as a way to document your own work, not an attempt to reproduce either study.</p>
   <h2 id="question" className="scroll-mt-28">Define what “faster” means for your project</h2>
   <p>Before a small, permitted task begins, specify the behaviour to deliver and the evidence required for acceptance. For example, a fictional CSV import change might need to reject missing required columns, preserve valid rows and explain errors without exposing private data. Merely producing the parser would not complete that task.</p>
   <p>On narrow screens, swipe tables sideways; keyboard users can focus a table and use the arrow keys.</p>
   <div role="region" aria-label="Delivery measurement definitions" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[42rem]"><caption>Choose a measure that matches the claim</caption><thead><tr><th>Measure</th><th>Record</th><th>Do not confuse it with</th></tr></thead><tbody>
    <tr><td>Author effort</td><td>Active specification, implementation, prompting, reading and testing time</td><td>Only the interval while code is generated</td></tr>
    <tr><td>Reviewer effort</td><td>Separate time spent checking and explaining requested changes</td><td>Time already counted for the author</td></tr>
    <tr><td>Rework</td><td>Corrections and verification after feedback, recorded once</td><td>A new feature that changes the original scope</td></tr>
    <tr><td>Elapsed delivery time</td><td>Start to acceptance, including queue delays</td><td>Summed person-minutes when work overlaps</td></tr>
    <tr><td>Accepted behaviour</td><td>Checks run, results, review decision and unresolved limitations</td><td>PR count, line count or confident generated explanations</td></tr>
   </tbody></table></div>
   <h2 id="example" className="scroll-mt-28">A faster draft can still mean more total effort</h2>
   <p><strong>Fictional teaching example—not a study result or MLAI client measurement:</strong> compare two hypothetical delivery records for the same stated acceptance criteria.</p>
   <div role="region" aria-label="Fictional delivery effort comparison" tabIndex={0} className="max-w-full overflow-x-auto"><table className="min-w-[36rem]"><caption>Invented values, not a controlled comparison</caption><thead><tr><th>Effort in person-minutes</th><th>Without AI</th><th>AI-assisted</th></tr></thead><tbody>
    <tr><td>Author implementation and self-checks</td><td>{FICTIONAL_BASELINE.author}</td><td>{FICTIONAL_DELIVERY.times.author}</td></tr>
    <tr><td>Reviewer checks</td><td>{FICTIONAL_BASELINE.reviewer}</td><td>{FICTIONAL_DELIVERY.times.reviewer}</td></tr>
    <tr><td>Author corrections and re-checks</td><td>{FICTIONAL_BASELINE.rework}</td><td>{FICTIONAL_DELIVERY.times.rework}</td></tr>
    <tr><td>Total recorded effort</td><td>{comparison.baseline}</td><td>{comparison.candidate}</td></tr>
   </tbody></table></div>
   <p>Authoring alone fell by 35 minutes, or 43.75%. Total recorded effort increased by five minutes, or 5%. That does not imply a 5% longer calendar duration: people may work concurrently or wait in a queue. Software cost, later defects and ongoing maintenance are outside this example, so it is not a profitability comparison.</p>
   <p>This arithmetic does not show that AI caused the difference. Real comparisons need comparable scope, experience and conditions; repeating the same task can introduce learning effects. A single delivery record is useful evidence about work performed, not a controlled experiment or a universal rate.</p>
   <h2 id="record" className="scroll-mt-28">Use an AI-assisted delivery effort record</h2>
   <p>The <a href="/downloads/delivery-effort-example.txt" download="delivery-effort-example.txt">filled fictional delivery record</a> supplies the task, three acceptance criteria, an invented review correction and a HOLD decision because a privacy check remains unrun. Its 105 person-minutes, 240 elapsed minutes and 120 queue minutes are all invented. Queue time is contained in elapsed time; neither is added to active effort.</p>
   <p>Download a <a href="/downloads/delivery-effort-template.txt" download="delivery-effort-template.txt">blank delivery record</a> to use offline, or edit and save the worksheet below. The CSV example supplies no parser or real test results. Use the next section's existing runnable lab if you want to practise with actual commands.</p>
   <DeliveryEffortWorksheet />
   <p>Keep an explicit “not recorded” value when time is missing. Do not replace it with zero or reconstruct precise minutes from memory. Distinguish active attention from tool latency; record how you treated waiting so someone else can interpret the total.</p>
   <p>For example, clear the fictional reviewer minutes. The known subtotal becomes 70 minutes, while the complete total becomes unavailable—not 70 or 105. An explicitly recorded zero is different. Even complete fields cannot reveal omitted work or establish that the task was accepted.</p>
   <h2 id="practice" className="scroll-mt-28">Practise on a permitted, reproducible task</h2>
   <p>Use the <Link to="/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-8">environment handover kit</Link> to practise recording evidence. Its preserved local run reports {handoverRun.commands[1].counts!.pass} passing code tests and a classification-review <strong>{handoverRun.commands[2].decision}</strong>. Those are actual local execution results on a synthetic teaching fixture, not evidence of saved author time. No author/reviewer effort measurement or independent recipient approval was recorded for that run.</p>
   <ol>
    <li>Start a blank log before working. Define one small task and acceptance conditions; record the kit/source version, permitted inputs and chosen tools.</li>
    <li>Record active work by person and category as it happens. If you revisit the same problem after feedback, put that time in rework once. Keep tool waiting and review queues separate from attention.</li>
    <li>Follow the kit's actual commands, retain complete outputs and the expected HOLD, and note first failures before changing anything. A code test reproducing a defect is not acceptance of that defect.</li>
    <li>Ask a reviewer to record their own time and decision. If no reviewer is available, leave their minutes and approval not recorded; do not insert a synthetic reviewer into your real log.</li>
    <li>Save your source identity, test evidence and handover with the log. One run describes that work; comparing repeated runs on a task you have learned does not isolate the effect of AI.</li>
   </ol>
   <h2 id="handover" className="scroll-mt-28">Turn the record into credible build evidence</h2>
   <ol>
    <li>Choose a permitted example with a bounded task; do not experiment on a client’s production system without authorisation.</li>
    <li>Use AI coding tools within the agreed data and action boundaries. Inspect proposed changes and test against the task, not just the model’s suggested tests.</li>
    <li>Provide a short handover: what changed, exact run/check instructions, expected results, remaining failures and the actual review decision. Name missing review instead of inventing acceptance.</li>
    <li>Make security review proportional to the task: permissions, secrets/data boundaries, input handling and allowed actions. Record who checked them and what is untested; this rubric is not a security certification.</li>
    <li>Describe your contribution honestly. A worked example can demonstrate your process without claiming an unmeasured speed improvement.</li>
   </ol>
   <p>When you have your own permitted build—not just the supplied teaching example—show what you shipped, how you checked it and what another person needs to maintain it. Studio's public positioning is Australian; New Zealand contractor eligibility remains unverified here. <Link to="/contact">Confirm eligibility</Link> before assuming coverage. Portfolio use needs permission, and paid-project allocation is not guaranteed.</p>
   <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement="article-inline" />
   <p>If you are exploring the topic rather than applying to build, choose a relevant <Link to="/events">MLAI event</Link>. Your worksheet is not automatically attached to either destination.</p>
   <h2 id="scope" className="scroll-mt-28">Sources and limits</h2>
   <p>The two linked paper abstracts, version dates and selected measurement sections were checked on 10 September 2026. Their exact data and estimates have not been independently reproduced here. The CSV comparison and filled record are fictional editorial teaching material; the linked handover record describes a separate actual local run on synthetic inputs. No new productivity experiment was run. Neither establishes the safest workflow, a hiring outcome or an AI coding tool’s current performance. Independent technical/source review remains outstanding.</p>
   <ArticleFAQ items={faqItems} />
  </div>
 </div>
}
