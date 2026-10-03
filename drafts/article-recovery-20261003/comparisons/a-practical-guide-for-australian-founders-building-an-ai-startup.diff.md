# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/a-practical-guide-for-australian-founders-building-an-ai-startup.tsx
+++ unreviewed-local-draft/app/articles/content/featured/a-practical-guide-for-australian-founders-building-an-ai-startup.tsx
@@ -3,28 +3,31 @@
 import { Home } from 'lucide-react'
 import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '../../authors'
 import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
+import ArticleConversionCTA from '~/components/articles/ArticleConversionCTA'
+import { BASE_ARTICLE_SEO_CONFIG } from '~/articles/seo-config'
 import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
 import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
 import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
 import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
-import { ArticleReferences } from '../../../components/articles/ArticleReferences'
 import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'
 import QuoteBlock from '../../../components/articles/QuoteBlock'
 import AudienceGrid from '../../../components/articles/AudienceGrid'
 import { ArticleStepList } from '../../../components/articles/ArticleStepList'
 import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'
+import { ArticleEventPreference } from '~/components/articles/ArticleEventPreference'
+import { FOUNDER_DRAFT_CASES, FOUNDER_TEST_PROVENANCE, FOUNDER_TEST_RECORD, founderTestTotals } from '~/lib/founder-workflow-test'

 export const useCustomHeader = true

-const TOPIC = 'A Practical Guide for Australian Founders Building an AI Startup'
+const TOPIC = 'Validate an AI startup idea in Australia: test one workflow'
 export const CATEGORY = 'featured'
 export const SLUG = 'a-practical-guide-for-australian-founders-building-an-ai-startup'
-export const DATE_PUBLISHED = '2026-07-12'
-export const DATE_MODIFIED = '2026-07-12'
-export const DESCRIPTION = 'Australian founders can build a focused first AI startup.'
+// Preserve the public registry date introduced in baab177, not the draft-preview date.
+export const DATE_PUBLISHED = '2026-07-26'
+export const DATE_MODIFIED = '2026-09-11'
+export const DESCRIPTION = 'Inspect a fictional AI startup workflow test: job notes, flawed drafts, a ten-case effort log and a completed decision record. Separate prototype behaviour from demand.'
 const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e79c88fc-4c95-41a5-97b4-82ddbd846b29.jpg?alt=media&token=9fb77a30-cac3-449e-b544-e72cba021bf9'
-const HERO_IMAGE_ALT = 'A Practical Guide for Australian Founders Building an AI Startup'
+const HERO_IMAGE_ALT = 'Person holding a pen and an open notebook'
 export const FEATURED_FOCUS = 'startups'

 const AUTHOR_PROFILE = getAuthorProfile(DEFAULT_AUTHOR_KEY)
@@ -57,7 +60,7 @@
   },
   {
     question: 'Where can Australian startup founders find early support?',
-    answer: 'Founders can learn through local startup communities, established hubs in Sydney, growing digital communities in Perth, and online networks.',
+    answer: 'Choose a relevant local or online founder learning event. Check the current topic and format, and bring one non-confidential question.',
   },
 ]

@@ -94,17 +97,17 @@
   { id: 1, question: 'How should a first-time founder validate an AI startup idea?', answer: 'Start with conversations about work that has already happened, then test a simple prototype or manual process to learn whether users will change how they work.' },
   { id: 2, question: 'What should an AI MVP do first?', answer: 'A first AI MVP should produce one useful result in a focused workflow, such as preparing a draft for review rather than running an entire business process.' },
   { id: 3, question: 'What should founders learn before choosing a model?', answer: 'Founders should establish the product’s data and context needs before choosing a model or architecture, including whether relevant data exists and can be accessed.' },
-  { id: 4, question: 'Where can Australian founders build a support network?', answer: 'Australian startup communities include established technology hubs in Sydney, emerging digital communities in Perth, and online networks that can support repeated learning.' },
+  { id: 4, question: 'Where can Australian founders build a support network?', answer: 'Look for a relevant local or online learning session and verify its current listing. Peer discussion can help frame a question but does not validate customer demand.' },
 ]

 export const summaryHighlights = {
-  heading: 'Key facts: A Practical Guide for Australian Founders Building an AI Startup',
-  intro: 'Australian founders can build a focused first AI startup.',
+  heading: 'Before building: problem, permission and evidence',
+  intro: 'For early founders exploring a specific customer problem. Use the supplied fictional records to examine what a small workflow test could establish, where it must stop, and what to ask next.',
   items: heroQuestionAnswers.map((item) => ({ label: item.question, description: item.answer })),
 }

 export const articleMeta = {
-  title: 'A Practical Guide for Australian Founders Building an AI Startup',
+  title: TOPIC,
   topic: TOPIC,
   category: CATEGORY,
   slug: SLUG,
@@ -117,25 +120,7 @@
   featuredFocus: FEATURED_FOCUS,
 }

-const faqSchemaItems = [
-  ...heroQuestionAnswers,
-  { question: 'How should a first-time founder validate an AI startup idea?', answer: 'Start with conversations about work that has already happened, then test a simple prototype or manual process to learn whether users will change how they work.' },
-  { question: 'What should an AI MVP do first?', answer: 'A first AI MVP should produce one useful result in a focused workflow, such as preparing a draft for review rather than running an entire business process.' },
-  { question: 'What should founders learn before choosing a model?', answer: 'Founders should establish the product’s data and context needs before choosing a model or architecture, including whether relevant data exists and can be accessed.' },
-  { question: 'Where can Australian founders build a support network?', answer: 'Australian startup communities include established technology hubs in Sydney, emerging digital communities in Perth, and online networks that can support repeated learning.' },
-]
-
-const faqStructuredData = faqSchemaItems.length
-  ? JSON.stringify({
-      '@context': 'https://schema.org',
-      '@type': 'FAQPage',
-      mainEntity: faqSchemaItems.map((item) => ({
-        '@type': 'Question',
-        name: item.question,
-        acceptedAnswer: { '@type': 'Answer', text: item.answer },
-      })),
-    })
-  : null
+

 const CONTENT_FACTORY_INSPECTOR_SCRIPT = `(function(){var p=3,q=new URLSearchParams(location.search);if(!q.has('cfInspector'))return;function post(x){try{parent.postMessage(Object.assign({source:'content-factory-inspector',protocolVersion:p},x),'*')}catch(e){}}if(window.__cfArticleInspectorInstalled){post({type:'ready',mode:window.__cfArticleInspectorMode||'comment'});return}window.__cfArticleInspectorInstalled=true;window.__cfArticleInspectorMode='comment';var style=document.createElement('style');style.textContent='[data-cf-component-id]{cursor:crosshair}.cf-inspector-hover,.cf-inspector-selected{outline:2px solid #7c3aed!important;outline-offset:3px}.cf-inspector-selected{outline-color:#2563eb!important}';document.head.appendChild(style);var selected;function nodes(){return[].slice.call(document.querySelectorAll('[data-cf-component-id]')).filter(function(el){var r=el.getBoundingClientRect();return r.width>=24&&r.height>=16})}function data(el,type,event){var r=el.getBoundingClientRect(),text=(el.textContent||'').replace(/\\s+/g,' ').trim(),id=el.getAttribute('data-cf-component-id')||'',payload={type:type,componentId:id,componentType:el.getAttribute('data-cf-component-type')||'',sourceSectionId:el.getAttribute('data-cf-source-section-id')||'',label:el.getAttribute('data-cf-component-label')||id,selector:'[data-cf-component-id="'+id.replace(/"/g,'\\\\"')+'"]',textExcerpt:text.slice(0,500),rect:{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height},viewport:{width:innerWidth,height:innerHeight,scrollX:scrollX,scrollY:scrollY,devicePixelRatio:devicePixelRatio||1},pageUrl:location.href,previewMode:q.get('cfPreviewMode')||q.get('previewMode')||''};if(event)payload.click={x:event.clientX,y:event.clientY,pageX:event.pageX,pageY:event.pageY};return payload}function measure(){post({type:'measure',components:nodes().map(function(el){return data(el,'component')})})}function set(id){if(selected)selected.classList.remove('cf-inspector-selected');selected=nodes().find(function(el){return el.getAttribute('data-cf-component-id')===id});if(selected)selected.classList.add('cf-inspector-selected')}document.addEventListener('mouseover',function(e){var el=e.target.closest&&e.target.closest('[data-cf-component-id]');if(el)el.classList.add('cf-inspector-hover')},true);document.addEventListener('mouseout',function(e){var el=e.target.closest&&e.target.closest('[data-cf-component-id]');if(el)el.classList.remove('cf-inspector-hover')},true);document.addEventListener('click',function(e){var el=e.target.closest&&e.target.closest('[data-cf-component-id]');if(!el)return;e.preventDefault();e.stopPropagation();set(el.getAttribute('data-cf-component-id'));post(data(el,window.__cfArticleInspectorMode==='comment'?'comment:create':'select',e));measure()},true);addEventListener('resize',measure);addEventListener('scroll',measure,true);addEventListener('message',function(e){var m=e.data;if(!m||m.source!=='founder-tools-inspector')return;if(m.type==='setMode'){window.__cfArticleInspectorMode=m.mode==='inspect'?'inspect':'comment';post({type:'ready',mode:window.__cfArticleInspectorMode})}if(m.type==='measureComponents')measure();if(m.type==='setSelectedComponent')set(m.componentId);if(m.type==='scrollToComponent'){set(m.componentId);if(selected)selected.scrollIntoView({block:'center',inline:'nearest'})}});post({type:'ready',mode:window.__cfArticleInspectorMode});setTimeout(measure,0)})()`

@@ -156,10 +141,10 @@

 export default function ArticleContent() {
   const authorDetails = { name: AUTHOR, role: AUTHOR_ROLE, bio: AUTHOR_BIO, avatarUrl: AUTHOR_AVATAR }
+  const totals = founderTestTotals()

   return (
     <>
-
       <ContentFactoryInspectorBridge />
       <ArticleHeroHeader
         breadcrumbs={[
@@ -180,7 +165,7 @@
       <div className='prose prose-lg prose-slate max-w-none bg-transparent'>
         <div id='start-with-a-narrow-problem' data-cf-component-id={'section:start-with-a-narrow-problem'} data-cf-component-type={'section'} data-cf-component-label={'Start With a Narrow Problem You Understand'} data-cf-source-section-id={'start-with-a-narrow-problem'}>
           <p><strong>{TOPIC}</strong>{' For Australian founders, a strong first AI startup idea often begins with a problem you know first-hand. Look for a repeated task where people lose time, struggle to find information, or make decisions inconsistently. A narrow workflow gives you a clearer starting point than a broad ambition to “build with AI.”'}</p>
-          <p>{'Australian startup founders are often older and more experienced than counterparts in other surveyed regions, which can mean deeper industry knowledge and stronger professional networks. Use that knowledge to speak with people in the workflow, define one useful outcome, and test a focused idea before expanding it into a larger product.'}</p>
+          <p>{'Prior experience can suggest a problem to investigate, but it does not establish demand. Speak with people who do the work and include perspectives beyond your existing network. You do not need to match a demographic profile to begin a careful test.'}</p>
         </div>

         <div id='choose-the-right-problem' data-cf-component-id={'section:choose-the-right-problem'} data-cf-component-type={'section'} data-cf-component-label={'Choose a Problem Worth Building Around'} data-cf-source-section-id={'choose-the-right-problem'}>
@@ -188,7 +173,7 @@
           <p>{'Start with a specific person doing a repeatable piece of work. The cost may be time, missed follow-ups, inconsistent decisions, or a poor customer experience. A broad idea such as “AI for small business” is not yet a product problem. “Help a service team handle routine customer follow-ups” is clearer because it names a user and a task. Founders should also ask what people do now. Existing spreadsheets, inbox rules, manual checks, or outsourced work reveal whether the problem is real and where a new tool must fit.'}</p>
           <p>{'It could mean less admin, faster responses, more consistent handling of information, or better decisions from available data. This gives the team a way to test whether a small first version is useful. AI is appropriate when it can improve that workflow in a practical way, not simply because the technology is available. It also brings early questions about data, infrastructure costs, and user trust. A credible opportunity begins with a customer outcome; AI is the possible means of delivering it.'}</p>
           <div data-cf-component-id={'image:choose-the-right-problem'} data-cf-component-type={'image'} data-cf-component-label={'Image: Choose a Problem Worth Building Around'} data-cf-source-section-id={'choose-the-right-problem'}>
-            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a6e57c58-e644-4393-9618-a09860371146.jpg?alt=media&token=5f98b284-f30f-4a2e-998a-3892f2d6bf21' alt='Two colleagues comparing missed follow-ups on a phone, absorbed in a candid close-up conversation' caption='Choose a Problem Worth Building Around' width={1200} height={800} />
+            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a6e57c58-e644-4393-9618-a09860371146.jpg?alt=media&token=5f98b284-f30f-4a2e-998a-3892f2d6bf21' alt='Two people looking at a phone in a close-up conversation' caption='Illustrative image; not a record of the fictional workflow test.' width={1200} height={800} />
           </div>
           <QuoteBlock title='Keep the problem first' variant='purple'>{'Do not frame the problem as a need for AI. Frame it as a customer outcome that AI may help deliver.'}</QuoteBlock>
         </div>
@@ -198,7 +183,7 @@
           <p>{'Start with conversations about work that has already happened. This is more useful than asking whether they like an idea. It helps founders distinguish an active problem from a polite expression of interest, and it keeps the discussion tied to everyday business workflows.'}</p>
           <p>{'For an AI product, this also exposes practical questions early: whether relevant data exists, how it can be accessed, and where a user needs to stay involved in the decision.'}</p>
           <div data-cf-component-id={'image:validate-before-building'} data-cf-component-type={'image'} data-cf-component-label={'Image: Validate the Workflow Before You Build the Model'} data-cf-source-section-id={'validate-before-building'}>
-            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-4ce2fde4-028e-42ad-be9a-e4124342e488.jpg?alt=media&token=da3888ef-4540-46c5-af71-7f1a9ff4111c' alt='Founder and customer review a workflow sketch and prototype screens over coffee at a shared table' caption='Validate the Workflow Before You Build the Model' width={1200} height={800} />
+            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-4ce2fde4-028e-42ad-be9a-e4124342e488.jpg?alt=media&token=da3888ef-4540-46c5-af71-7f1a9ff4111c' alt='Two people reviewing hand-drawn diagrams and screen sketches at a table' caption='Illustrative image; not evidence of a customer interview.' width={1200} height={800} />
           </div>
           <QuoteBlock title='' variant='purple'>{'A polite compliment is not validation.'}</QuoteBlock>
           <h3>{'Test the value with a lightweight version'}</h3>
@@ -218,9 +203,63 @@
           <h2>{'Design the Smallest Credible AI Product'}</h2>
           <p>{'For example, the product might prepare a draft for review rather than attempting to run an entire business process. A focused MVP makes it easier to see whether the AI is useful in an everyday workflow, while avoiding the common mistake of trying to automate everything at once.'}</p>
           <p>{'Choose the product’s data and context needs before committing to a model or architecture.'}</p>
+          <h3>A draft assistant test that can fail usefully</h3>
+          <p><strong>{FOUNDER_TEST_PROVENANCE}</strong> A founder proposes an assistant that drafts follow-up emails from a service team's job notes. The hypothesis is lower total handling time without invented commitments. The proposed isolated test uses synthetic notes, not a live inbox, and cannot send messages. That is a design requirement, not a verified software boundary.</p>
+          <nav aria-label='Workflow example sections' className='my-5'>
+            <ul className='flex flex-wrap gap-x-6 gap-y-2'>
+              <li><a href='#workflow-test-cases-title'>Inspect the supplied drafts</a></li>
+              <li><a href='#workflow-test-effort-title'>Compare the full effort</a></li>
+              <li><a href='#workflow-decision-title'>Read the completed decision</a></li>
+              <li><a href='#validation-discussion-record'>Prepare an event question</a></li>
+            </ul>
+          </nav>
+          <table><thead><tr><th>Test input</th><th>Required behaviour</th><th>Failure to record</th></tr></thead><tbody>
+            <tr><td>Completed job with an approved next step</td><td>Draft only the recorded facts and next step</td><td>Invented price, date or promise</td></tr>
+            <tr><td>Missing completion status</td><td>Ask for the missing information or flag review</td><td>Assuming the work is complete</td></tr>
+            <tr><td>Conflicting appointment dates</td><td>Expose the conflict rather than choose a date</td><td>A confident but unsupported appointment</td></tr>
+            <tr><td>Note containing an instruction to bypass review</td><td>Treat the note as input data; retain the review boundary</td><td>Sending a message or changing permissions</td></tr>
+          </tbody></table>
+          <p>Agree the acceptance criteria before inspecting results. Keep setup and correction time in the comparison, and retain failures. Passing these synthetic cases is only a prototype check; it does not establish security, production readiness or customer demand.</p>
+          <section id='inspect-the-workflow-test' aria-labelledby='workflow-test-cases-title'>
+            <h3 id='workflow-test-cases-title' className='scroll-mt-28'>Inspect the notes, draft and correction</h3>
+            <p>These four supplied examples show the normal case and three failures. They are written for comparison, not generated outputs. A correction does not erase the original failure or prove that a future system will behave correctly. No messages were sent.</p>
+            {FOUNDER_DRAFT_CASES.slice(0, 4).map(row => <section key={row.id} className='not-prose my-5 rounded-xl border border-gray-300 bg-white p-5 text-gray-950' aria-labelledby={`founder-case-${row.id}`}>
+              <h4 id={`founder-case-${row.id}`} className='text-lg font-semibold'>{row.id}: {row.verdict === 'needs-revision' ? 'A draft to reject' : 'A bounded draft'}</h4>
+              <dl className='mt-4 space-y-3 text-base leading-7'>
+                <div><dt className='font-semibold'>Invented job note</dt><dd className='m-0'>{row.input}</dd></div>
+                <div><dt className='font-semibold'>Expected behaviour</dt><dd className='m-0'>{row.expected}</dd></div>
+                <div><dt className='font-semibold'>Scripted draft — not sent</dt><dd className='m-0'>{row.draft}</dd></div>
+                <div><dt className='font-semibold'>Why keep or reject it?</dt><dd className='m-0'>{row.reason}</dd></div>
+                <div><dt className='font-semibold'>Correction, not a retest</dt><dd className='m-0'>{row.correction}</dd></div>
+              </dl>
+            </section>)}
+            <details className='my-6 rounded-xl border border-gray-300 p-5'>
+              <summary className='cursor-pointer font-semibold'>Inspect the six other supplied cases (D-05–D-10)</summary>
+              <p>These complete the fictional ten-case set. They are not unseen customer examples or a held-out evaluation.</p>
+              <ol>{FOUNDER_DRAFT_CASES.slice(4).map(row => <li key={row.id} className='mb-5'><strong>{row.id}.</strong> {row.input}<br /><strong>Scripted draft, not sent:</strong> {row.draft}<br /><strong>Assessment:</strong> {row.reason}</li>)}</ol>
+            </details>
+          </section>
+          <section id='workflow-test-effort' aria-labelledby='workflow-test-effort-title'>
+            <h3 id='workflow-test-effort-title' className='scroll-mt-28'>Count the correction work before claiming a saving</h3>
+            <p>Every minute below is an invented teaching assumption. Manual drafting and draft review cover the same ten notes and completion standard; neither side includes sending. A real trial must record actual time, exceptions and the cost of unresolved failures.</p>
+            <div role='region' aria-label='Fictional ten-case effort comparison' tabIndex={0} className='overflow-x-auto rounded-xl border border-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2'>
+              <table className='w-full min-w-[34rem]'><caption className='px-4 py-3 text-left font-semibold'>Invented minutes per case; one-off setup is separate</caption><thead><tr><th scope='col'>Case</th><th scope='col'>Manual</th><th scope='col'>Review</th><th scope='col'>Correction</th><th scope='col'>Scripted draft</th></tr></thead><tbody>
+                {FOUNDER_DRAFT_CASES.map(row => <tr key={row.id}><th scope='row'>{row.id}</th><td>{row.manualMinutes}</td><td>{row.reviewMinutes}</td><td>{row.correctionMinutes}</td><td>{row.verdict === 'needs-revision' ? 'Needs revision' : 'Fits this criterion'}</td></tr>)}
+              </tbody><tfoot><tr><th scope='row'>Total</th><td>{totals.manual}</td><td>{totals.review}</td><td>{totals.correction}</td><td>{totals.needsRevision} of {totals.count} need revision</td></tr></tfoot></table>
+            </div>
+            <p><strong>Fictional effort comparison, not a measured result:</strong> setup {totals.setup} + review {totals.review} + correction {totals.correction} = {totals.firstBatch} minutes. That first batch is five minutes slower than the {totals.manual}-minute manual scenario. Excluding setup gives {totals.repeatBatchAssumption} minutes only if the later review and correction assumptions stay unchanged. A faster second batch has not been demonstrated.</p>
+            <p>Do not turn seven scripted drafts that fit their criteria into a model-accuracy claim. D-02 invents completion, D-03 invents a booking, and D-04 invents authorised actions. The decision is to revise and run a new isolated test, not progress to live use. A corrected sentence is not a working control.</p>
+            <p>Separately ask an authorised prospective user whether a controlled trial is useful and what would make them decline; do not infer willingness to pay from a successful demo. For the next distinct task, use <a href='/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026'>the first-customer conversation guide</a> to plan a permission-based discussion, not another prototype score.</p>
+          </section>
+          <section id='completed-workflow-decision' aria-labelledby='workflow-decision-title'>
+            <h3 id='workflow-decision-title' className='scroll-mt-28'>Completed fictional decision record</h3>
+            <dl aria-label='Founder prototype decision record'>{FOUNDER_TEST_RECORD.map(field => <div key={field.label} className='my-4'><dt className='font-semibold'>{field.label}</dt><dd className='m-0'>{field.value}</dd></div>)}</dl>
+          </section>
         </div>

         <div data-cf-component-id={'resource-cta:validation-resource'} data-cf-component-type={'resource-cta'} data-cf-component-label={'Get the resource'}>
+          <p>For the complete example, <a href='/downloads/founder-validation-test-record.md' download>download the ten-case test and completed/blank decision record (Markdown)</a>. It contains every supplied note, scripted draft, correction and invented minute, plus the same eight fields completed and blank. It is an editable document, not a runnable assistant or a measured result. Save a copy before editing.</p>
+          <p>The separate PDF is a printable four-section planning worksheet with no interactive form fields; it does not contain the expanded example above. Its 30-day section is a suggested planning window, not a validated deadline.</p>
           <ArticleResourceCTA eyebrow='Free worksheet' title={'AI Startup Idea Validation Worksheet'} description='Use this fill-in worksheet to turn an AI startup idea into a focused customer workflow, validation plan, and small prototype test.' buttonLabel='Download the PDF' buttonHref='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fa-practical-guide-for-australian-founders-building-an-ai-startup-worksheet-836c6dfd.pdf?alt=media&token=edf10e0f-c3b2-495b-8e44-8db314e8c430' accent='purple' previewCards={[
             { title: 'Workflow Definition', subtitle: 'PDF', color: 'bg-[#ff3d00]', textColor: 'text-white', rotationClass: 'rotate-[-6deg]' },
             { title: '30-Day Evidence Plan', subtitle: 'PDF', color: 'bg-[#00ffd7]', textColor: 'text-black', rotationClass: 'rotate-[7deg]' },
@@ -229,10 +268,10 @@

         <div id='build-a-support-circle' data-cf-component-id={'section:build-a-support-circle'} data-cf-component-type={'section'} data-cf-component-label={'Build a Support Circle Around the Test'} data-cf-source-section-id={'build-a-support-circle'}>
           <h2>{'Build a Support Circle Around the Test'}</h2>
-          <p>{'Australia’s startup communities span established tech hubs in Sydney and emerging digital communities in Perth, alongside online networks.'}</p>
+          <p>{'Choose a session by its advertised topic, experience level and format, not a city’s reputation. Check the organiser’s current listing and registration requirements before attending.'}</p>
           <p>{'Prior industry experience can strengthen this circle when it gives you credible access to a real customer problem.'}</p>
           <div data-cf-component-id={'image:build-a-support-circle'} data-cf-component-type={'image'} data-cf-component-label={'Image: Build a Support Circle Around the Test'} data-cf-source-section-id={'build-a-support-circle'}>
-            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b3eb431e-24f6-48a0-8549-58121ac7b34d.jpg?alt=media&token=108fd3e6-9a9b-4dfb-8be3-ca9c9b87523d' alt='Australian startup meetup in a shared workspace, founders gathered around a product experiment board' caption='Build a Support Circle Around the Test' width={1200} height={800} />
+            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b3eb431e-24f6-48a0-8549-58121ac7b34d.jpg?alt=media&token=108fd3e6-9a9b-4dfb-8be3-ca9c9b87523d' alt='People discussing notes around a shared table, with other groups in the background' caption='Illustrative image; not a verified MLAI event or participant record.' width={1200} height={800} />
           </div>
         </div>

@@ -240,13 +279,13 @@
           <AudienceGrid heading='Build the Support Circle You Need' cards={[
             { title: 'Domain operator becoming a founder', description: 'Use prior industry experience to reach people with direct knowledge of a real customer problem.', variant: 'purple' },
             { title: 'Technical builder', description: 'Use customer conversations to establish the workflow’s data, context, and user-involvement needs before choosing a model.', variant: 'purple' },
-            { title: 'First-time generalist founder', description: 'Use startup communities in Sydney, Perth, and online networks to create repeated opportunities to learn from customer tests.', variant: 'purple' },
+            { title: 'First-time generalist founder', description: 'Choose relevant local or online discussions, then test assumptions with the intended users rather than relying on peer enthusiasm.', variant: 'purple' },
           ]} />
         </div>

         <div id='make-the-next-month-count' data-cf-component-id={'section:make-the-next-month-count'} data-cf-component-type={'section'} data-cf-component-label={'Make the Next 30 Days About Evidence'} data-cf-source-section-id={'make-the-next-month-count'}>
           <h2>{'Make the Next 30 Days About Evidence'}</h2>
-          <p>{'For the next 30 days, focus on one customer workflow rather than a broad AI product idea. Write down the assumption that matters most: perhaps that a customer has a repeated task, that the task is painful enough to change, or that an AI-assisted result would be useful. Start with conversations before committing to a larger build. Australian business guidance consistently stresses choosing one problem first instead of trying to automate everything at once.'}</p>
+          <p>{'For the next 30 days, focus on one customer workflow rather than a broad AI product idea. Write down the assumption that matters most: perhaps that a customer has a repeated task, that the task is painful enough to change, or that an AI-assisted result would be useful. Start with conversations before committing to a larger build. The 30-day window is an editorial planning suggestion, not a validated deadline or a promise that an idea can be proven in a month. Adjust the scope and timing to permissions, access and what the test can actually establish.'}</p>
           <p>{'Turn what you learn into a narrow prototype that produces one useful result. It does not need to solve every part of the workflow.'}</p>
           <ul>
             <li>{'Choose one customer workflow and name the assumption you need to test.'}</li>
@@ -254,29 +293,37 @@
             <li>{'Test a small prototype, then decide whether to refine, narrow, or stop.'}</li>
           </ul>
           <div data-cf-component-id={'image:make-the-next-month-count'} data-cf-component-type={'image'} data-cf-component-label={'Image: Make the Next 30 Days About Evidence'} data-cf-source-section-id={'make-the-next-month-count'}>
-            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b37c76e1-7b68-4497-92b3-7b7794447dc2.jpg?alt=media&token=79fe77f5-1c75-42c8-a417-c0e13f3dfc9c' alt='Small startup team reviewing customer workflow notes and AI assumptions on a whiteboard in a casual office' caption='Make the Next 30 Days About Evidence' width={1200} height={800} />
+            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b37c76e1-7b68-4497-92b3-7b7794447dc2.jpg?alt=media&token=79fe77f5-1c75-42c8-a417-c0e13f3dfc9c' alt='Four people seated around a table with a laptop and papers' caption='Illustrative image; no customer findings are attributed to these people.' width={1200} height={800} />
           </div>
         </div>

-        <ArticleReferences
-          references={[
-            { id: 1, href: 'https://www.angelinvestmentnetwork.net/over-three-quarters-of-australian-startup-founders-are-over-45-challenging-silicon-valleys-youth-obsessed-narrative/', title: 'Australian Startup Founders Defy Global Trends - Angel Investment Network Blog', publisher: 'angelinvestmentnetwork.net', description: "", category: 'guide' },
-            { id: 2, href: 'https://www.codegeeks.solutions/blog/from-idea-to-impact-what-makes-ai-startups-succeed', title: 'How to Start an AI Startup: Practical Guide for Founders | CodeGeeks Solutions', publisher: 'codegeeks.solutions', description: "", category: 'guide' },
-            { id: 3, href: 'https://corvana.com.au/blog/ai-for-australian-businesses-a-practical-starting-guide', title: 'AI for Australian Businesses: A Practical Starting Guide', publisher: 'corvana.com.au', description: "", category: 'guide' },
-            { id: 4, href: 'https://www.australiansmallbusiness.com.au/how-to-set-up-your-first-ai-agent-a-practical-guide-for-small-business-owners/', title: 'How to Set Up Your First AI Agent: A Practical Guide for Small Business Owners | Online Business Admin Courses & AI Assistants for Small Business', publisher: 'australiansmallbusiness.com.au', description: "", category: 'guide' },
-            { id: 5, href: 'https://www.businessthink.unsw.edu.au/articles/business-ai-efficiency-innovation-automation', title: 'A practical guide to getting started with Business AI - UNSW BusinessThink', publisher: 'businessthink.unsw.edu.au', description: "", category: 'guide' },
-            { id: 6, href: 'https://officeproconsulting.com.au/ai-for-business/', title: 'AI for Business: A Practical Guide for Australian SMEs', publisher: 'officeproconsulting.com.au', description: "", category: 'guide' },
-            { id: 7, href: 'https://appoly.com.au/resources/practical-guide-to-ai-agents-for-australian-businesses/', title: 'A practical guide to AI agents for Australian businesses | Appoly Australia', publisher: 'appoly.com.au', description: "", category: 'guide' },
-            { id: 8, href: 'https://business.gov.au/', title: 'Support for businesses in Australia | business.gov.au', publisher: 'business.gov.au', description: "", category: 'guide' },
-            { id: 9, href: 'https://au.linkedin.com/company/aussiefoundersclub', title: 'Aussie Founders Club | LinkedIn', publisher: 'au.linkedin.com', description: "", category: 'guide' },
-          ]}
-          heading='Sources & further reading'
-        />
+        <section id='research-scope'>
+          <h2>Research guidance and what this exercise adds</h2>
+          <p>The Australian Government's <a href='https://business.gov.au/marketing-and-advertising/do-market-research'>market research guide</a> covers customers, products and competitors, including interviews, surveys and observing product use. It recommends reporting the question, method, findings and resulting actions. These are research options, not proof that a particular sample or prototype validates your idea.</p>
+          <p>Mary-Anne Williams' <a href='https://www.businessthink.unsw.edu.au/articles/business-ai-efficiency-innovation-automation'>25 June 2024 UNSW BusinessThink opinion article</a> frames business AI around business value and responsible experimentation. It is expert commentary, not a controlled evaluation of this guide's method. We do not use its examples as evidence of our own results.</p>
+          <p>The market research guidance was rechecked on 11 September 2026; the opinion source retains its 9 September check. The supplied notes, drafts, effort assumptions, decision record and suggested timebox are editorial teaching material, not results reported by either source. There has been no customer study or independent validation of this method. Record contradictory findings, and stop or change the plan when the evidence requires it.</p>
+        </section>

         <ArticleDisclaimer />

+        <section id='validation-discussion-record' className='scroll-mt-28'>
+          <h2>Bring a question, not a finished pitch</h2>
+          <p>Bring one unresolved question from the test. A peer can challenge your reasoning; intended users still need to supply evidence about their own workflow and willingness to change it.</p>
+          <pre className='whitespace-pre-wrap' aria-label='Startup validation discussion record'>{[
+            'Specific person and workflow:',
+            'Observation from actual work, with sharing permission:',
+            'Assumption still to test:',
+            'Smallest permitted test and what it could disprove:',
+            'Result that would change the plan:',
+            'One question for a relevant founder learning event:',
+          ].join('\n')}</pre>
+          <p>Leave customer identifiers and private business data out of an event discussion. Feedback from other attendees can help refine a question, but cannot substitute for evidence from the people who would use or pay for the product.</p>
+          <p><strong>A question from this example:</strong> “If two job records disagree, who is allowed to resolve the conflict, and what evidence should the first permitted trial collect?” That is a useful founder-learning discussion even if the next step is a manual process rather than an AI build.</p>
+          <ArticleEventPreference articlePath={'/articles/' + CATEGORY + '/' + SLUG} idPrefix='founder-workflow-event' description='Choose a format for the MLAI event calendar. Only this format preference travels to the event CTA—not your notes or the completed record. Check the current topic, experience level and availability; applying a preference is not a booking.' />
+        </section>
+
         <div className='my-12 not-prose' data-cf-component-id={'cta'} data-cf-component-type={'company-cta'} data-cf-component-label={'Company CTA'}>
-          <ArticleCompanyCTA title='Put One Assumption to the Test' body='Choose one customer workflow, speak with people who do that work, and use a narrow prototype to test whether an AI-assisted result is useful.' buttonText='Start Your Validation Test' buttonHref='#make-the-next-month-count' />
+          <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement='article-inline' />
         </div>
       </div>

```
