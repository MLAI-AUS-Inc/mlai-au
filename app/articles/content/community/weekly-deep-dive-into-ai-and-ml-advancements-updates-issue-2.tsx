import { Home } from 'lucide-react'
import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
import ArticleConversionCTA from '~/components/articles/ArticleConversionCTA'
import { BASE_ARTICLE_SEO_CONFIG } from '~/articles/seo-config'
export const useCustomHeader = true
export const CATEGORY = 'community'
export const SLUG = 'weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2'
export const DATE_PUBLISHED = '2026-01-19'
export const DATE_MODIFIED = '2026-09-09'
export const DESCRIPTION = 'Separate model preference from correctness with a source-based comparison exercise, a clear reading of a small user study and a practical feedback record.'
const TITLE = 'AI Bits #2: Liking an AI answer is not the same as trusting it'
export const faqItems = [
 { id: 1, question: 'Can a model preference reveal my personality?', answer: 'This article does not establish that. Do not diagnose or classify a person from their preferred chatbot. Ask about their task and communication preferences directly.' },
 { id: 2, question: 'Can two people reasonably prefer different answers?', answer: 'Yes, they can value different wording or levels of detail. Check factual accuracy and task requirements separately before treating either answer as usable.' },
 { id: 3, question: 'Does this guide identify the best current model?', answer: 'No. It discusses an earlier study and provides a comparison exercise. The fictional answers below are written examples, not outputs from named models.' },
]
export default function ArticlePage() {
 return <div className="bg-white">
  <ArticleHeroHeader breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: 'AI Bits #2', current: true }]}
   title={TITLE} titleHighlight="not the same as trusting it" headerBgColor="cyan"
   summary={{ heading: 'Compare answers on two separate questions', intro: 'For AI-curious readers discussing what makes an answer useful—not a personality test or model recommendation.', items: [
    { label: 'Does it meet the task?', description: 'Check facts, omissions and unsupported additions against the source.' },
    { label: 'Do I like the presentation?', description: 'Record clarity and tone without letting them excuse an error.' },
    { label: 'What needs changing?', description: 'Describe a specific improvement instead of inferring a user type.' },
   ] }}
  />
  <article className="prose prose-lg max-w-3xl mx-auto px-4 py-10">
   <p><strong>Editorial correction, 9 September 2026:</strong> this issue previously described model choice as a mirror of personality and generalised about engineers and creators. Those claims went beyond the evidence. The original January publication date is retained; this revision focuses on comparing answers for an actual task.</p>
   <h2 id="study">What the small study found</h2>
   <p><a href="https://arxiv.org/abs/2508.21628v1">Yunusov and colleagues’ August 2025 paper</a> reports 32 participants, evenly distributed across four Keirsey types, using GPT-4 and Claude 3.5 for four collaborative tasks. Its abstract reports different preferences within those groups despite similar aggregate helpfulness ratings.</p>
   <p>That is a result about this sample, task set and model comparison. It does not establish a rule for assigning people a chatbot, prove the validity of personality categories, or rank current models. This revision checked the abstract and version record, not the full study data or a replication.</p>
   <h2 id="exercise">Try this without a model subscription</h2>
   <p><strong>Fictional exercise; all event details and answers are invented.</strong> Read the source card first:</p>
   <blockquote><p>Harbour AI Reading Circle is an online discussion on 14 October at 6 pm Sydney time. It lasts 45 minutes. Registration is required. The notice does not say whether a recording will be available.</p></blockquote>
   <p><strong>Task:</strong> write a brief reply explaining when and how to attend, and whether there will be a recording. Do not invent information.</p>
   <h3>Answer A</h3>
   <blockquote><p>Join the online discussion on 14 October at 6 pm Sydney time. It lasts 45 minutes, and you need to register. The notice does not confirm a recording.</p></blockquote>
   <h3>Answer B</h3>
   <blockquote><p>We’d love to see you at the Harbour AI Reading Circle! Drop in online at 6 pm Sydney time on 14 October—no registration needed. Don’t worry if you miss it: a recording will be shared afterwards.</p></blockquote>
   <p>These are editorial examples, not generated model outputs. Decide which wording you prefer, then check each against the source before reading the comparison below.</p>
   <table><thead><tr><th>Check</th><th>Answer A</th><th>Answer B</th></tr></thead><tbody>
    <tr><td>Time and online format</td><td>Matches the source</td><td>Matches the source</td></tr>
    <tr><td>Registration</td><td>Preserves the requirement</td><td>Contradicts the source</td></tr>
    <tr><td>Recording</td><td>Retains uncertainty</td><td>Adds an unsupported promise</td></tr>
    <tr><td>Duration</td><td>Includes 45 minutes</td><td>Omits it</td></tr>
    <tr><td>Style preference</td><td>Direct and compact</td><td>Warmer opening; preference does not repair its errors</td></tr>
   </tbody></table>
   <p>You can prefer a warmer opening while rejecting Answer B as written. A useful revision would keep that opening, restore the registration requirement and say that recording availability is unconfirmed. Do not turn a preference for warmth into a personality label or a conclusion that the answer is more accurate.</p>
   <h2 id="real-comparison">Use the distinction in a real comparison</h2>
   <ol>
    <li>Choose a permitted, low-stakes task with source material and clear requirements. Do not upload private material merely to compare tools.</li>
    <li>Record the model/version, settings, date, prompt and relevant conversation context. Different histories are different conditions.</li>
    <li>Set factual and task checks before reading the outputs. Record failures separately from preference ratings.</li>
    <li>If willing participants compare outputs, hide model names where practical and vary presentation order. This is a bias-reduction step, not proof of an unbiased study.</li>
    <li>Ask why an answer was preferred and what needs changing. Keep disagreement and uncertain judgments; do not manufacture a consensus.</li>
   </ol>
   <p>One task cannot establish an overall winner. If you edit the prompt between runs, note the change rather than attributing every difference to the model. Keep failed outputs in the record instead of selecting only favourable examples.</p>
   <h2 id="record">Record preference without losing correctness</h2>
   <pre className="whitespace-pre-wrap" aria-label="Answer comparison record">{[
    'Task, source material and required facts:',
    'Models/versions/settings/date (or editorial examples):',
    'Prompt and conversation conditions:',
    'Required checks defined before comparison:',
    'Contradictions, omissions and unsupported additions:',
    'Preferred presentation and reason:',
    'What must change before this answer is usable:',
    'Disagreement, uncertainty and comparison limits:',
    'Permission to retain or share feedback:',
   ].join('\n')}</pre>
   <p>No personality questionnaire is needed for this exercise. Ask what the person needs from the answer rather than collecting sensitive or unnecessary personal information.</p>
   <h2 id="discussion">Discuss one disagreement at an MLAI event</h2>
   <p>Bring a permitted example and ask: “Do we disagree about whether this is correct, or about how it is written?” Choose an event whose topic and level fit, and check online or in-person details. The fictional event above is not an MLAI listing or a registration invitation.</p>
   <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement="article-inline" />
   <h2 id="scope">Source and limits</h2>
   <p>The linked paper abstract was checked on 9 September 2026. The answer pair, checklist and record are editorial teaching material, not a new experiment or evidence about named current products. Prior tool and book endorsements were removed to keep the issue focused.</p>
   <ArticleFAQ items={faqItems} />
  </article>
 </div>
}
