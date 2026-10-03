# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/what-is-an-accelerator-and-is-it-right-for-your-ai-startup.tsx
+++ unreviewed-local-draft/app/articles/content/featured/what-is-an-accelerator-and-is-it-right-for-your-ai-startup.tsx
@@ -1,130 +1,44 @@
-import { useEffect } from 'react'
-import type { ReactNode } from 'react'
-import { Home } from 'lucide-react'
-import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '../../authors'
-import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
-import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
-import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
-import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
-import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
-import { ArticleReferences } from '../../../components/articles/ArticleReferences'
-import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'
-import QuoteBlock from '../../../components/articles/QuoteBlock'
-import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'
+import { useEffect } from "react";
+import { Home } from "lucide-react";
+import { Link } from "react-router";
+import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
+import ArticleConversionCTA from "~/components/articles/ArticleConversionCTA";
+import { BASE_ARTICLE_SEO_CONFIG } from "~/articles/seo-config";

-export const useCustomHeader = true
-
-const TOPIC = 'What Is an Accelerator and Is It Right for Your AI Startup?'
-export const CATEGORY = 'featured'
-export const SLUG = 'what-is-an-accelerator-and-is-it-right-for-your-ai-startup'
-export const DATE_PUBLISHED = '2026-07-20'
-export const DATE_MODIFIED = '2026-09-15'
-export const DESCRIPTION = 'What is an accelerator for AI startups? Assess program fit.'
-const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c41fdb6d-155e-4092-9490-bca493c02527.jpg?alt=media&token=2219af28-2507-4c87-b5e6-368ad4e5c45a'
-const HERO_IMAGE_ALT = 'AI startup founders reviewing accelerator program notes during a candid close-up meeting'
-export const FEATURED_FOCUS = 'startups'
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
-type AuthorDetails = {
-  name: string
-  role: string
-  bio: string
-  avatarUrl: string
-}
-
-function AuthorBio({ author }: { author: AuthorDetails }) {
-  const initials = author.name
-    .split(/\s+/)
-    .filter(Boolean)
-    .slice(0, 2)
-    .map((part) => part[0]?.toUpperCase() ?? '')
-    .join('')
-
-  return (
-    <section className='rounded-3xl border border-slate-200 bg-slate-50 px-6 py-6'>
-      <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
-        <div
-          role='img'
-          aria-label={author.name}
-          className='flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 bg-cover bg-center text-lg font-semibold text-slate-700'
-          style={author.avatarUrl ? { backgroundImage: `url(${author.avatarUrl})` } : undefined}
-        >
-          {author.avatarUrl ? null : initials}
-        </div>
-        <div>
-          <p className='text-lg font-semibold text-slate-900'>{author.name}</p>
-          <p className='text-sm font-medium uppercase tracking-[0.18em] text-slate-500'>{author.role}</p>
-        </div>
-      </div>
-      {author.bio ? <p className='mt-4 text-base leading-7 text-slate-700'>{author.bio}</p> : null}
-    </section>
-  )
-}
-
-export const faqItems: FAQ[] = [
-  { id: 1, question: 'What is the difference between an accelerator and an incubator?', answer: "These labels do not establish a universal stage rule. Compare the particular programme’s eligibility, support, time commitment and terms. Some accelerators accept idea-stage teams; foundational support is not exclusive to incubators." },
-  { id: 2, question: 'Do all startup accelerators provide funding?', answer: 'No, investment opportunities may be available, but each accelerator offers different support and founders should ask organisers what opportunities are available now.' },
-  { id: 3, question: 'What should an AI founder prepare before applying to an accelerator?', answer: 'An AI founder should prepare a clear account of the problem being addressed, intended users, progress so far, and the specific bottleneck requiring support.' },
-  { id: 4, question: 'What should founders ask an accelerator organiser?', answer: 'Founders should ask what mentorship, networks, resources, facilities, investment opportunities, and participation expectations the program currently provides.' },
-]
-
+export const useCustomHeader = true;
+export const SLUG = "featured/what-is-an-accelerator-and-is-it-right-for-your-ai-startup";
+export const articleMeta = {
+  title: "Is an accelerator right for your AI startup? A decision worksheet",
+  description: "Decide whether a startup accelerator addresses your actual constraint. Compare eligibility, support, founder-time costs and alternatives before applying.",
+  datePublished: "2026-07-26",
+  dateModified: "2026-09-09",
+  author: "Dr Sam Donegan",
+  image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-c41fdb6d-155e-4092-9490-bca493c02527.jpg?alt=media&token=2219af28-2507-4c87-b5e6-368ad4e5c45a",
+  imageAlt: "Illustration of founders reviewing programme notes",
+};
 export const summaryHighlights = {
-  heading: 'Key facts: What Is an Accelerator and Is It Right for Your AI Startup?',
-  intro: 'What is an accelerator for AI startups? Assess program fit.',
+  heading: "Decide whether to apply before choosing a programme",
+  intro: "For Australian startup-curious founders weighing structured support against work they could do directly.",
   items: [
-    { label: 'What is the definition of an accelerator?', description: 'A business accelerator is a growth program for startups that offers mentorship, peer support, networks, practical resources, and possible investment opportunities.' },
-    { label: 'What is the accelerator used for?', description: "An accelerator offers structured support towards a startup’s next goal. The useful support and eligible stage vary by programme, so check what is actually included and whether it addresses your current bottleneck." },
-    { label: 'How do you know whether an accelerator fits your startup?', description: "A programme may fit when you meet its actual eligibility requirements and its support addresses a specific need at an acceptable cost in time, money and obligations." },
+    { label: "What is a startup accelerator?", description: "A structured support programme that may combine mentoring, cohort activity, technical help and investment. The actual offer and obligations vary." },
+    { label: "Must I already have revenue?", description: "No universal rule applies. Some programmes consider idea-stage ventures; others specify traction or a funding stage. Check the particular cohort." },
+    { label: "What is the decision?", description: "Compare the support you can substantiate with founder time, terms, eligibility and the best alternative use of your resources." },
   ],
-}
-
-export const articleMeta = {
-  title: TOPIC,
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
-  { question: 'What is the definition of an accelerator?', answer: 'A business accelerator is a growth program for startups that offers mentorship, peer support, networks, practical resources, and possible investment opportunities.' },
-  { question: 'What is the accelerator used for?', answer: "An accelerator offers structured support towards a startup’s next goal. The useful support and eligible stage vary by programme, so check what is actually included and whether it addresses your current bottleneck." },
-  { question: 'How do you know whether an accelerator fits your startup?', answer: "A programme may fit when you meet its actual eligibility requirements and its support addresses a specific need at an acceptable cost in time, money and obligations." },
-  { question: 'What is the difference between an accelerator and an incubator?', answer: "These labels do not establish a universal stage rule. Compare the particular programme’s eligibility, support, time commitment and terms. Some accelerators accept idea-stage teams; foundational support is not exclusive to incubators." },
-  { question: 'Do all startup accelerators provide funding?', answer: 'No, investment opportunities may be available, but each accelerator offers different support and founders should ask organisers what opportunities are available now.' },
-  { question: 'What should an AI founder prepare before applying to an accelerator?', answer: 'An AI founder should prepare a clear account of the problem being addressed, intended users, progress so far, and the specific bottleneck requiring support.' },
-  { question: 'What should founders ask an accelerator organiser?', answer: 'Founders should ask what mentorship, networks, resources, facilities, investment opportunities, and participation expectations the program currently provides.' },
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
+};
+export const ACCELERATOR_DECISION_SHEET = [
+  "Accelerator decision — record facts, not assumed benefits",
+  "Decision owner / date / programme and cohort:",
+  "Official eligibility and terms URL / checked on:",
+  "Current bottleneck / evidence that it matters:",
+  "Outcome needed / how we would observe it:",
+  "Stage, geography and founder availability: eligible, ineligible or unknown?",
+  "Specific support / who provides it / confirmed access:",
+  "Founder hours, travel, fees and other obligations:",
+  "Investment instrument and conditions / adviser questions:",
+  "Alumni evidence / selection limitations / unresolved claims:",
+  "Alternative use of the same time and resources:",
+  "Decision: apply, clarify, defer or decline / reason / review trigger:",
+].join("\n");

 const CONTENT_FACTORY_INSPECTOR_SCRIPT = "(function(){var p=new URLSearchParams(window.location.search);if(!p.has('cfInspector')||window.__cfArticleInspectorInstalled)return;window.__cfArticleInspectorInstalled=true;var post=function(payload){try{window.parent.postMessage(Object.assign({source:'content-factory-inspector',protocolVersion:3},payload),'*')}catch(e){}};var components=function(){return Array.prototype.slice.call(document.querySelectorAll('[data-cf-component-id]'))};var data=function(el,type,event){var r=el.getBoundingClientRect();var id=el.getAttribute('data-cf-component-id')||'';var payload={type:type,componentId:id,componentType:el.getAttribute('data-cf-component-type')||'',sourceSectionId:el.getAttribute('data-cf-source-section-id')||'',label:el.getAttribute('data-cf-component-label')||id,selector:'[data-cf-component-id=\\\"'+id+'\\\"]',rect:{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height},textExcerpt:String(el.textContent||'').replace(/\\s+/g,' ').trim().slice(0,500),pageUrl:window.location.href};if(event)payload.anchor={x:Math.max(0,Math.min(1,(event.clientX-r.left)/(r.width||1))),y:Math.max(0,Math.min(1,(event.clientY-r.top)/(r.height||1))),createdFrom:'live_preview_click'};return payload};var measure=function(){post({type:'measure',components:components().map(function(el){return data(el,'component')})})};document.addEventListener('click',function(event){var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;if(!target)return;event.preventDefault();event.stopPropagation();post(data(target,'comment:create',event));measure()},true);window.addEventListener('resize',measure);window.addEventListener('message',function(event){var message=event.data;if(!message||message.source!=='founder-tools-inspector')return;if(message.type==='measureComponents')measure();if(message.type==='scrollToComponent'){var target=document.querySelector('[data-cf-component-id=\\\"'+(message.componentId||'')+'\\\"]');if(target)target.scrollIntoView({block:'center',inline:'nearest'})}});post({type:'ready',mode:'comment'});setTimeout(measure,0)})();"

@@ -143,110 +57,60 @@
   return null
 }

+
 export default function ArticleContent() {
-  const authorDetails = { name: AUTHOR, role: AUTHOR_ROLE, bio: AUTHOR_BIO, avatarUrl: AUTHOR_AVATAR }
+  return <div>
+    <ContentFactoryInspectorBridge />
+    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: articleMeta.title, current: true }]} title={articleMeta.title} titleHighlight="A decision worksheet" headerBgColor="cyan" summary={summaryHighlights} heroImage={articleMeta.image} heroImageAlt={articleMeta.imageAlt} />
+    <div className="mx-auto max-w-4xl px-4 py-8 prose prose-lg prose-indigo">
+      <p><strong>An accelerator is a way of obtaining structured startup support—not proof that your startup needs it.</strong> Before preparing an application, name the constraint you need help with and compare the programme with addressing that constraint directly. This guide helps you decide whether to pursue a programme; the separate <Link to="/articles/featured/startup-accelerator-australia">Australian accelerator finder</Link> helps you investigate named options and their dated source records.</p>
+      <p>There is no universal accelerator-versus-incubator stage boundary. Organisations use these labels differently. Read the actual entry criteria, duration, support and obligations rather than automatically choosing an incubator because your company is early.</p>

-  return (
-    <>
+      <h2 id="stage">Programme-specific evidence beats a stage rule</h2>
+      <p>Two official descriptions checked on 9 September 2026 illustrate the difference. They are examples of programme design, not recommendations to apply or confirmation that an Australian applicant qualifies for every cohort.</p>
+      <div className="overflow-x-auto"><table>
+        <caption>What the provider says—and the question still to resolve</caption>
+        <thead><tr><th>Provider</th><th>Published description</th><th>Implication for your decision</th></tr></thead>
+        <tbody>
+          <tr><td><a href="https://www.startmate.com/accelerator/program">Startmate</a></td><td>Its programme page says each cohort has included an idea-stage, pre-MVP company. It describes a hybrid programme accessible from Australia or New Zealand, with in-person weeks.</td><td>Being pre-revenue is not an automatic exclusion. Confirm current selection criteria and whether the attendance commitment works for your team.</td></tr>
+          <tr><td><a href="https://startup.google.com/programs/accelerator/">Google for Startups Accelerator</a></td><td>The global overview describes equity-free support and generally looks for technical startups demonstrating traction, ideally Seed to Series A. Individual programmes have specific requirements.</td><td>Do not infer Australian eligibility or an open intake from the global overview. Select a regional programme and check its criteria and technical participation requirements.</td></tr>
+        </tbody>
+      </table></div>
+      <p>Neither example proves a return on participation. Provider testimonials and portfolio successes are selected observations, not a comparison with similar companies that did not join. Ask what outcomes were measured, over what period and for which participants.</p>

-      <ContentFactoryInspectorBridge />
-      <ArticleHeroHeader
-        breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: TOPIC, current: true }]}
-        title={TOPIC}
-        titleHighlight={TOPIC}
-        headerBgColor='cyan'
-        summary={summaryHighlights}
-        heroImage={HERO_IMAGE}
-        heroImageAlt={HERO_IMAGE_ALT}
-      />
+      <h2 id="constraint">1. Name the constraint and the help that would change it</h2>
+      <p>Replace “we need a network” with a specific question: whose input is missing, what decision would it affect, and why can you not obtain it now? An AI startup may need to test customer demand, evaluate a technical failure, clarify data access or learn how a buyer approves a pilot. These are different problems.</p>
+      <ul>
+        <li><strong>Customer uncertainty:</strong> ask whether the programme offers relevant access or research support, not merely a long mentor list.</li>
+        <li><strong>Technical uncertainty:</strong> ask who can work through your actual architecture or evaluation question, and what time they commit.</li>
+        <li><strong>Fundraising preparation:</strong> distinguish feedback on evidence and narrative from investment. Introductions do not guarantee meetings or funding.</li>
+        <li><strong>Founder isolation:</strong> compare a cohort with a lighter peer community or events before accepting a larger commitment.</li>
+      </ul>
+      <p>A programme cannot supply evidence you have not collected. Present prototypes, interviews and trial results honestly; label hypothetical examples and do not generate customers, revenue or test results to make an application appear stronger.</p>

-      <ArticleTocPlaceholder className='bg-transparent' />
+      <h2 id="cost">2. Make the commitment visible</h2>
+      <p>Ask for the schedule and terms in writing. Include preparation, sessions, travel and follow-up—not only calendar hours. Decide which customer or product work will be delayed. If investment is offered, have the instrument, ownership consequences and obligations explained by a suitably qualified adviser before signing. This worksheet is not legal or financial advice.</p>
+      <p><strong>Illustrative time comparison:</strong> two founders each spending six hours a week on programme activity for twelve weeks commit 144 founder-hours in total. That excludes travel and application work. Those are fictional planning assumptions, not a provider's workload estimate or a cash expense. Compare what those same hours could achieve through customer tests, targeted advice or delivery work.</p>
+      <p>Keep cash costs separate from founder time. Credits are not unrestricted cash, introductions are not contracts, and published funding is not a substitute for understanding the actual offer. Where a detail is unknown, ask; do not score it as a benefit.</p>

-      <div className='prose prose-lg prose-slate max-w-none bg-transparent'>
-        <div id='what-is-an-accelerator' data-cf-component-id={'section:what-is-an-accelerator'} data-cf-component-type={'section'} data-cf-component-label={'What Is an Accelerator?'} data-cf-source-section-id={'what-is-an-accelerator'}>
-          <p><strong>{TOPIC}</strong>{': A business accelerator is a program that helps growing startups build strength and move forward. It can provide guidance from mentors, support from peers, useful networks, technical or logistical resources, and possible investment opportunities. In this article, “accelerator” means a business-growth program, not a physics device.'}</p>
-          <p>{"Do not rule out an accelerator solely because you are at idea stage. Programme names are an unreliable eligibility test: organisers set their own stage, sector and participation requirements. Check the current programme before choosing between it, an incubator or another source of support."}</p>
-        </div>
+      <h2 id="questions">3. Ask questions that can change your decision</h2>
+      <ol>
+        <li><strong>To the programme:</strong> “We need help with this specific constraint. Who would support it, in what format, and what access is actually included?”</li>
+        <li><strong>To the programme:</strong> “Which sessions are mandatory, where are they held, and what happens if a founder cannot attend?”</li>
+        <li><strong>To an alumnus:</strong> “What did you use, what took more time than expected, and what would you have done without the programme?”</li>
+        <li><strong>To your team:</strong> “What evidence would make us decline even if accepted?”</li>
+      </ol>
+      <p>Seek alumni with a comparable stage and problem, including experiences that were less positive where available. Record how you found them. A hand-picked testimonial cannot establish the typical outcome. Do not publish identifying quotes or private terms without permission.</p>

-        <div id='what-accelerators-help-with' data-cf-component-id={'section:what-accelerators-help-with'} data-cf-component-type={'section'} data-cf-component-label={'What a Business Accelerator Is Designed to Change'} data-cf-source-section-id={'what-accelerators-help-with'}>
-          <h2>{'What a Business Accelerator Is Designed to Change'}</h2>
-          <p>{"Start by separating the support advertised from the support your team can actually use. Mentorship may help resolve a specific technical or customer question; introductions are useful only when the people and purpose are relevant. Ask which resources are included, who provides them and what participation requires."}</p>
-          <p>{'The value depends on the barrier the startup faces now. A business may be constrained by limited access to markets or networks, the risk and cost of expanding resources, or a growth plateau after launch. In that situation, an accelerator can provide relevant support and introductions. It does not remove the need for founders to decide which customer problem, market or growth constraint matters most.'}</p>
-          <div data-cf-component-id={'image:what-accelerators-help-with'} data-cf-component-type={'image'} data-cf-component-label={'Image: What a Business Accelerator Is Designed to Change'} data-cf-source-section-id={'what-accelerators-help-with'}>
-            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-14a62abe-5149-4f2e-995d-901bb1e9dd4f.jpg?alt=media&token=48fa7538-15f2-48a0-8528-42ab28c5e961' alt='Marked-up startup notebooks, coffee cups and tangled cables converging across a shared desk' caption='What a Business Accelerator Is Designed to Change' width={1200} height={800} />
-          </div>
-          <QuoteBlock title='Key point' variant='purple'>{'Treat an accelerator as targeted support for a defined growth constraint, not as a substitute for deciding what problem the startup needs to solve.'}</QuoteBlock>
-        </div>
+      <h2 id="decision">4. Compare applying with a concrete alternative</h2>
+      <p><strong>Fictional example:</strong> a team has a working AI demo but does not know whether its intended buyer can provide the required data. Before committing to a general programme, it could run a bounded data-access conversation and technical test. A programme becomes more relevant if it can substantiate access to the specific expertise or buyer context the team lacks. The right answer may be “clarify first”, not simply yes or no.</p>
+      <pre className="whitespace-pre-wrap break-words" aria-label="Accelerator decision worksheet"><code>{ACCELERATOR_DECISION_SHEET}</code></pre>
+      <p>Use <strong>apply</strong> when eligibility and the support-to-constraint match are substantiated and the commitment is acceptable; <strong>clarify</strong> when a material fact is unknown; <strong>defer</strong> when timing is wrong; and <strong>decline</strong> when a better alternative exists. These are editorial decision prompts, not an admission predictor or validated scoring model.</p>

-        <div id='accelerator-versus-incubator' data-cf-component-id={'section:accelerator-versus-incubator'} data-cf-component-type={'section'} data-cf-component-label={"Accelerator or Incubator? Check the Actual Programme"} data-cf-source-section-id={'accelerator-versus-incubator'}>
-          <h2>{"Accelerator or Incubator? Check the Actual Programme"}</h2>
-          <p>{"Compare options against the same questions: does the programme accept your stage, does it provide the help you need, and can you meet its commitments? A broad label cannot answer those questions. Being eligible also does not establish that participation is the best use of your time."}</p>
-          <p>{"Write down your current evidence, the unresolved question and the help needed next. Then compare the actual programmes, including any incubator, accelerator or independent support option that accepts your situation. Record unknown terms as questions for the organiser rather than assuming the label guarantees suitable support."}</p>
-          <div data-cf-component-id={'image:accelerator-versus-incubator'} data-cf-component-type={'image'} data-cf-component-label={'Image: Accelerator or Incubator? Start With Your Stage'} data-cf-source-section-id={'accelerator-versus-incubator'}>
-            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-0b3d8a88-8772-499b-a4c2-05690d63d2fc.jpg?alt=media&token=9eb69bf8-f60e-443e-b3e6-d02ad9866ee8' alt='Startup team workspace with growth charts, mentor notes and accelerator event badges on a shared desk' caption="Accelerator or Incubator? Check the Actual Programme" width={1200} height={800} />
-          </div>
-          <QuoteBlock title='' variant='purple'>{"Check programme-specific eligibility and support; an early-stage team does not automatically need an incubator first."}</QuoteBlock>
-        </div>
-
-        <div id='ai-startup-readiness' data-cf-component-id={'section:ai-startup-readiness'} data-cf-component-type={'section'} data-cf-component-label={'The AI Startup Readiness Questions to Ask First'} data-cf-source-section-id={'ai-startup-readiness'}>
-          <h2>{'The AI Startup Readiness Questions to Ask First'}</h2>
-          <p>{'Before applying to an AI startup accelerator or booking an introductory call, define the bottleneck you need help with. It might be customer access, founder guidance, peer feedback, practical resources, or preparation for investment conversations. A clear answer helps you judge whether a program’s support matches the work in front of you. It also prevents a broad accelerator application from becoming a substitute for deciding what the business needs next.'}</p>
-          <p>{'Prepare a short, honest picture of your startup’s current position. Explain the problem you are addressing, who the intended users are, and what progress has been made so far.'}</p>
-          <QuoteBlock title='A useful caution' variant='purple'>{'These are readiness questions, not universal entry requirements. Each program should state its own eligibility and selection criteria.'}</QuoteBlock>
-          <h3>{'Match the program to your stage'}</h3>
-          <p>{"Test fit against your immediate work. If your next step is understanding a customer problem, ask how the programme supports that investigation. If it is a technical constraint, ask about relevant expertise. Do not infer either capability from an offer of general mentoring."}</p>
-        </div>
-
-        <div id='test-program-fit' data-cf-component-id={'section:test-program-fit'} data-cf-component-type={'section'} data-cf-component-label={'Use a Three-Step Test to Assess Program Fit'} data-cf-source-section-id={'test-program-fit'}>
-          <h2>{'Use a Three-Step Test to Assess Program Fit'}</h2>
-          <p>{"Name one or two outcomes you need from outside support. For each prospective programme, record a current official source for eligibility, attendance, resources, fees and investment terms. Compare these with an alternative way to progress without joining. Ask the organiser to clarify anything you cannot verify."}</p>
-          <p>{'Next, check whether a specific program can provide the support that matches those outcomes. Ask organisers what guidance, networks, resources, facilities, or investment opportunities are available now. Then clarify what participation involves and whether your team can make use of the support. A program may help remove barriers to growth, but it is a better fit when the startup is ready to act on the opportunities it offers.'}</p>
-          <div data-cf-component-id={'image:test-program-fit'} data-cf-component-type={'image'} data-cf-component-label={'Image: Use a Three-Step Test to Assess Program Fit'} data-cf-source-section-id={'test-program-fit'}>
-            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3edfbbf9-cf6c-4dd6-ae5c-846c4ed1c0c4.jpg?alt=media&token=d5623822-7573-4d4e-bc8e-b7b7d9dfb4c3' alt='Close-up of two Australian startup peers quietly discussing mentor support and program priorities' caption='Use a Three-Step Test to Assess Program Fit' width={1200} height={800} />
-          </div>
-          <QuoteBlock title='Check current details' variant='purple'>{'Ask program organisers for current details rather than assuming that every accelerator provides the same funding, network access, or level of support.'}</QuoteBlock>
-        </div>
-
-        <div id='make-the-next-decision' data-cf-component-id={'section:make-the-next-decision'} data-cf-component-type={'section'} data-cf-component-label={'Make the Next Decision, Not Just the Next Application'} data-cf-source-section-id={'make-the-next-decision'}>
-          <h2>{'Make the Next Decision, Not Just the Next Application'}</h2>
-          <p>{"A useful application starts with a clear reason for joining. Describe the problem you are working on, the evidence you have and the specific help you need. Explain what you would do with that help, rather than treating admission itself as progress."}</p>
-          <p>{"Before committing, check the written obligations and the work you would postpone to participate. Seek appropriate advice on consequential terms. If the support is a poor match or key conditions remain unclear, deferring or choosing another route is a reasonable decision."}</p>
-          <ul>
-            <li>{'Name the single growth problem you need help solving.'}</li>
-            <li>{'Compare programs against that problem, their support, and their networks.'}</li>
-            <li>{"Compare an incubator, accelerator or independent route using the actual requirements and support."}</li>
-          </ul>
-          <div data-cf-component-id={'image:make-the-next-decision'} data-cf-component-type={'image'} data-cf-component-label={'Image: Make the Next Decision, Not Just the Next Application'} data-cf-source-section-id={'make-the-next-decision'}>
-            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-17dab5c9-bc98-4b3c-9b6a-0cd4964f7c10.jpg?alt=media&token=91bd73d1-d479-4c71-ad45-e6dbf2a0850c' alt='Startup founders in a candid peer workshop reviewing growth plans and next business decisions' caption='Make the Next Decision, Not Just the Next Application' width={1200} height={800} />
-          </div>
-        </div>
-
-        <p className="text-sm text-slate-600">Correction, 15 September 2026: the earlier article and worksheet treated incubator-first as a general rule for less-developed startups. <a href="https://www.startmate.com/accelerator/program">Startmate’s current programme page</a> describes accepting idea-stage, pre-MVP companies. We have replaced the blanket stage rule with programme-specific checks.</p>
-        <div data-cf-component-id={'resource-cta'} data-cf-component-type={'resource-cta'} data-cf-component-label={'Get the resource'}>
-          <ArticleResourceCTA eyebrow='Free worksheet' title='AI Startup Accelerator Fit Worksheet' description='Use this fill-in worksheet to decide whether an accelerator or incubator fits your AI startup, define the help you need, and assess prospective programs.' buttonLabel="Download editable worksheet (Markdown)" buttonHref="/downloads/accelerator-fit-worksheet.md" accent='purple' previewCards={[{ title: "Eligibility and terms", subtitle: "Markdown", color: 'bg-[#ff3d00]', textColor: 'text-white', rotationClass: 'rotate-[-6deg]' }, { title: 'Program-fit prompts', subtitle: "Markdown", color: 'bg-[#00ffd7]', textColor: 'text-black', rotationClass: 'rotate-[7deg]' }]} />
-        </div>
-
-        <ArticleReferences references={[
-        { id: 1, href: "https://www.startmate.com/accelerator/program", title: "Startmate Accelerator: programme and eligibility", publisher: "Startmate", description: "A current example of an accelerator accepting idea-stage teams; terms remain programme-specific.", category: "industry" },
-        { id: 2, href: "https://www.bdc.ca/en/articles-tools/entrepreneur-toolkit/templates-business-guides/glossary/business-accelerator", title: "What is a business accelerator?", publisher: "BDC", description: "A Canadian glossary, not an eligibility rule for Australian programmes.", category: "guide" },
-      ]} />
-
-        <ArticleDisclaimer />
-
-        <div className='my-12 not-prose' data-cf-component-id={'cta'} data-cf-component-type={'company-cta'} data-cf-component-label={'Company CTA'}>
-          <ArticleCompanyCTA title='Assess Your Program Fit' body='Name the growth outcome your startup needs, then compare prospective programs against the support and connections they can provide.' buttonText='Use the fit test' buttonHref='#test-program-fit' />
-        </div>
-      </div>
-
-      <div data-cf-component-id={'author-bio'} data-cf-component-type={'author-bio'} data-cf-component-label={'About the Author'}>
-        <AuthorBio author={authorDetails} />
-      </div>
-
-      <div className='mt-12' data-cf-component-id={'faq'} data-cf-component-type={'faq'} data-cf-component-label={'FAQ'}>
-        <ArticleFAQ items={faqItems} />
-      </div>
-
-      <ArticleFooterNav backHref='/articles' topHref='#' />
-    </>
-  )
+      <h2 id="next">Discuss the constraint, then investigate programmes</h2>
+      <p>Bring a non-confidential version of your decision sheet to a suitable founder or AI community conversation. Ask peers to challenge the assumption that a programme is the next step. Check the <Link to="/articles/featured/startup-accelerator-australia">programme finder</Link> and the provider's current page before relying on dates or eligibility; this explainer is not an application calendar.</p>
+      <ArticleConversionCTA articleSlug={SLUG} config={BASE_ARTICLE_SEO_CONFIG["/articles/" + SLUG].conversion!} events={[]} placement="article-inline" />
+      <p className="text-sm">Correction, 9 September 2026: removed unrelated networking, software and property references and replaced the blanket startup-stage rule with programme-specific evidence. The decision sheet is supplied here instead of the earlier PDF promotion. Original registry publication date is retained; no new independent expert review or programme acceptance is claimed.</p>
+    </div>
+  </div>;
 }
```
