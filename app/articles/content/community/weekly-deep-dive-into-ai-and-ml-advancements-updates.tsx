import { Home } from 'lucide-react'
import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
import ArticleConversionCTA from '~/components/articles/ArticleConversionCTA'
import { BASE_ARTICLE_SEO_CONFIG } from '~/articles/seo-config'
export const useCustomHeader = true
export const CATEGORY = 'community'
export const SLUG = 'weekly-deep-dive-into-ai-and-ml-advancements-updates'
export const DATE_PUBLISHED = '2026-01-08'
export const DATE_MODIFIED = '2026-10-29'
export const DESCRIPTION = 'Read a scientific image-classification result carefully: distinguish prompt examples from pretraining, inspect missed cases and question generated explanations.'
const TITLE = 'Image classification accuracy and recall: reading the evidence | AI Bits #1'
export const faqItems = [
 { id: 1, question: 'Does using 15 examples mean the model learned everything from 15 images?', answer: 'No. Examples supplied for a task are not the same thing as the data used to pretrain a foundation model. This article does not establish the model’s complete pretraining dataset.' },
 { id: 2, question: 'Does a readable explanation prove why a model made a decision?', answer: 'Not by itself. Check the explanation against the input and independent evidence. Fluent wording or agreement from another model is not a substitute for a verified label.' },
 { id: 3, question: 'Can I apply the reported accuracy to my own images?', answer: 'Not without a relevant evaluation. Record your task, label definitions, image conditions and failure types instead of importing a percentage from a different dataset.' },
]
export default function ArticlePage() {
 return <div className="bg-white">
  <ArticleHeroHeader breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: 'AI Bits #1', current: true }]}
   title={TITLE} titleHighlight="accuracy and recall" headerBgColor="cyan"
   summary={{ heading: 'Look beyond the headline accuracy', intro: 'For AI-curious readers discussing a scientific result—not a guide to deploying an image classifier.', items: [
    { label: 'Name the task', description: 'A result for one scientific classification problem is not general image understanding.' },
    { label: 'Inspect the errors', description: 'A single average can hide which cases are missed.' },
    { label: 'Check explanations', description: 'Readable output creates something to inspect, not automatic proof.' },
   ] }}
  />
  <article className="prose prose-lg max-w-3xl mx-auto px-4 py-10">
<aside aria-label="Accuracy and recall answer different questions" className="my-6 rounded-xl border border-slate-300 bg-slate-50 p-5"><p><strong>Accuracy and recall answer different questions</strong></p><p>Accuracy counts all correct labels; recall asks how many actual targets were found. A high accuracy can hide missed targets when non-targets dominate. <a href='#accuracy'>Inspect the 95% accuracy, 0% recall example</a>, then use the source record below before repeating a result.</p></aside>
   <p><strong>Correction, 9 September 2026:</strong> this issue previously described a pretrained model as doing science with almost no training data and overstated what generated explanations establish. The original January publication date remains. This revision separates the source finding from wider claims.</p>
   <h2 id="paper">What the paper reports</h2>
   <p><a href="https://arxiv.org/abs/2510.06931v1">Stoppa and colleagues’ 2025 paper</a> studies real-versus-bogus optical transient classification across Pan-STARRS, MeerLICHT and ATLAS datasets. Its abstract reports 93% average accuracy using Gemini with 15 examples and concise instructions, alongside textual descriptions. It also describes a second model assessing output coherence.</p>
   <p>Those are the authors’ findings for that task, not an MLAI replication. The 15 examples are not the foundation model’s entire training history. A coherence check is not an independent ground-truth label. This revision checked the abstract, dataset description, Table 1 and selected methods; it does not reproduce the experiments or determine performance on a new dataset.</p>
   <div role="region" aria-label="Scientific classification source boundaries" tabIndex={0} className="overflow-x-auto"><table><caption><a href="https://arxiv.org/pdf/2510.06931v1#page=2">Pinned PDF, page 2 and Table 1</a>; source methods checked 29 October 2026</caption><thead><tr><th>Dataset / size</th><th>Labels and balance</th><th>Accuracy / precision / recall</th></tr></thead><tbody><tr><td>Pan-STARRS: 2,000 candidates</td><td>About half manually classified real transients; remainder from pipeline garbage lists</td><td>94.1% / 95.4% / 93.1%</td></tr><tr><td>MeerLICHT: approximately 3,200 candidates</td><td>Expert labels; exact class counts not established in the inspected text</td><td>93.4% / 87.7% / 98.7%</td></tr><tr><td>ATLAS: 2,000 candidates</td><td>About half manually classified real transients; remainder from pipeline garbage lists</td><td>91.9% / 88.5% / 94.5%</td></tr></tbody></table></div>
   <p>The methods identify <code>gemini-1.5-pro-002</code> and 15 manually selected image triplets per telescope. Those guide examples are prompting context, not model training. The inspected sections do not make the guide/evaluation exclusion rule explicit enough to certify an independent held-out split here. Verify the released data/code before making that claim.</p>
   <p>The simple mean of the three displayed accuracies is 93.13%, which rounds to the headline 93%; the article does not establish a pooled case-weighted count. The paper also reports a later run against an updated endpoint. Keep it separate from Table 1 rather than silently replacing the original result.</p>
   <h2 id="meaning">Separate three claims before repeating them</h2>
   <div role="region" aria-label={"Separate three claims before repeating them — Claim, Evidence needed, What not to infer"} tabIndex={0} className="min-w-0 max-w-full overflow-x-auto"><table><thead><tr><th>Claim</th><th>Evidence needed</th><th>What not to infer</th></tr></thead><tbody>
    <tr><td>The classification is correct.</td><td>A trustworthy reference label and the actual prediction</td><td>A convincing explanation must mean the label is correct</td></tr>
    <tr><td>The explanation describes visible evidence.</td><td>Comparison with the input and a qualified interpretation where needed</td><td>A second model agreeing establishes truth</td></tr>
    <tr><td>The approach transfers to another dataset.</td><td>An evaluation under that dataset’s conditions</td><td>The original average applies to any image task</td></tr>
   </tbody></table></div>
   <h2 id="accuracy">A 95% score that misses every target</h2>
   <p><strong>Fictional arithmetic—not the paper’s data:</strong> imagine 1,000 labelled candidates: 50 genuine targets and 950 non-targets. A classifier labels every candidate a non-target.</p>
   <div role="region" aria-label={"A 95% score that misses every target — Reference label, Predicted target, Predicted non-target"} tabIndex={0} className="min-w-0 max-w-full overflow-x-auto"><table><thead><tr><th>Reference label</th><th>Predicted target</th><th>Predicted non-target</th></tr></thead><tbody>
    <tr><td>50 actual targets</td><td>0</td><td>50</td></tr>
    <tr><td>950 actual non-targets</td><td>0</td><td>950</td></tr>
   </tbody></table></div>
   <p>It gets 950 of 1,000 labels right: 95% accuracy. But it finds zero of the 50 targets: target recall is 0%. Precision for target predictions has a zero denominator because there are no positive predictions; do not present it as a meaningful measured percentage without stating the convention used.</p>
   <p>This does not show that the published study made this error. It shows why a headline score is insufficient by itself. Ask for class counts, the confusion matrix and the consequences of false positives and false negatives. A higher overall score need not answer the question you care about.</p>
   <h2 id="explanation">Exercise: turn an explanation into checkable observations</h2>
   <p><strong>Fictional output:</strong> “This is a real target because the bright feature is compact and appears consistently.” Before accepting that statement, separate its parts:</p>
   <ul>
    <li>What input supports “compact”, and how is that property defined?</li>
    <li>Were multiple observations supplied to support “consistently”, or did the explanation invent them?</li>
    <li>Does the reference label agree, and who or what established it?</li>
    <li>What would count as contradictory evidence?</li>
   </ul>
   <p>If the required input or expertise is missing, record that limitation. Do not generate a second confident paragraph to fill the gap. This is a reading exercise; it does not teach astronomical classification or certify a model explanation.</p>
   <h2 id="completed-record">A completed reading record</h2>
   <dl><dt>Claim and source</dt><dd>Stoppa et al., v1 abstract: Gemini is applied to real/bogus optical-transient classification with 15 supplied examples.</dd><dt>Reported result</dt><dd>Table 1 gives separate accuracy, precision and recall per telescope. Exact MeerLICHT class counts and guide/evaluation separation remain unresolved in this reading.</dd><dt>What the result cannot establish</dt><dd>Recall on your own image set, correctness of every explanation, or a model trained from only 15 images.</dd><dt>Next check</dt><dd>Inspect the released data/code to establish guide/evaluation separation and aggregation before comparing another classifier.</dd></dl>
   <p>For text outputs, use the <a href='/articles/community/weekly-deep-dive-into-ai-and-ml-advancements-updates-issue-2'>answer correctness and style exercise</a>. To practise with code, use the <a href='/articles/featured/best-way-to-learn-about-ai-2026#extend'>learning lab’s failure comparison</a>.</p>
   <h2 id="record">Copy a classification-result reading record</h2>
   <pre className="whitespace-pre-wrap" aria-label="Classification result reading record">{[
    'Paper/version and exact task:',
    'Model and supplied examples versus pretraining:',
    'Dataset and reference-label method:',
    'Class counts and evaluation split:',
    'Metric definition and aggregation:',
    'False positives, false negatives and missing results:',
    'Explanation claim and supporting input:',
    'Independent checks and their limitations:',
    'What cannot be inferred for another dataset:',
    'Question to investigate next:',
   ].join('\n')}</pre>
   <p>Use “not reported in the material I checked” rather than inventing a value. Keep training examples separate from evaluation cases, and record whether the full methods or only the abstract were reviewed. No account, model run or download is needed for this exercise.</p>
   <h2 id="discussion">Bring a better question to an MLAI discussion</h2>
   <p>Try: “Which errors are hidden by this average, and what evidence supports the explanation?” Bring the source and one uncertainty. Choose an event whose topic and experience level fit, then check its location or online format. Attending does not provide scientific validation or deployment approval.</p>
   <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement="article-inline" />
   <h2 id="scope">Source and editorial scope</h2>
   <p>The abstract was checked on 9 September; the PDF dataset description, Table 1 and selected methods on 29 October 2026. The confusion matrix, explanation example and record are editorial teaching material, not a new experiment. Previous product recommendations and unrelated general advice were removed to focus on interpreting this scientific result.</p>
   <ArticleFAQ items={faqItems} />
  </article>
 </div>
}
