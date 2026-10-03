# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/how-many-people-use-artificial-intelligence-in-2026.tsx
+++ unreviewed-local-draft/app/articles/content/featured/how-many-people-use-artificial-intelligence-in-2026.tsx
@@ -1,100 +1,25 @@
 import { useEffect } from 'react'
-import type { ReactNode } from 'react'
 import { Home } from 'lucide-react'
-import { AcademicCapIcon, RocketLaunchIcon, UsersIcon } from '@heroicons/react/24/outline'
-import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '~/articles/authors'
-import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
-import AuthorBio from '../../../components/AuthorBio'
-import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
-import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
-import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
-import QuoteBlock from '../../../components/articles/QuoteBlock'
-import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
-import AudienceGrid from '../../../components/articles/AudienceGrid'
-import { ArticleCallout } from '../../../components/articles/ArticleCallout'
-import { ArticleReferences } from '../../../components/articles/ArticleReferences'
-import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'
-
+import { Link } from 'react-router'
+import { ArticleHeroHeader } from '~/components/articles/ArticleHeroHeader'
+import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
+import ArticleConversionCTA from '~/components/articles/ArticleConversionCTA'
+import { BASE_ARTICLE_SEO_CONFIG } from '~/articles/seo-config'
 export const useCustomHeader = true
-
-const TOPIC = "How Many People Use Artificial Intelligence in 2026?"
-export const CATEGORY = "featured"
-export const SLUG = "how-many-people-use-artificial-intelligence-in-2026"
-export const DATE_PUBLISHED = "2026-05-11"
-export const DATE_MODIFIED = "2026-05-11"
-export const DESCRIPTION = "How many people use artificial intelligence? Over 1B."
-const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-8583b06a-0bec-421b-80b1-4b077b41d73a.jpg?alt=media&token=63af1baf-eb47-47d6-8d65-b78c7dabc210"
-const HERO_IMAGE_ALT = "Close-up of people using AI tools on laptops and phones in a candid workspace moment"
-export const FEATURED_FOCUS = "ai"
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
-export const faqItems: FAQ[] = [
-  { id: 1, question: "How many people use artificial intelligence?", answer: "More than one billion people use AI, according to DataReportal’s global estimate. The figure should be treated as a broad estimate rather than a precise live count." },
-  { id: 2, question: "Does that mean most people use AI?", answer: "No. Global AI adoption is substantial, but it is not universal. Some estimates suggest many people have still not had a direct, meaningful interaction with AI." },
-  { id: 3, question: "Why is AI usage hard to count?", answer: "AI usage is spread across chatbots, apps, search tools, workplace systems and embedded product features. Some people use several tools, while others use AI without recognising it as AI." },
-  { id: 4, question: "Do company AI statistics count as people using AI?", answer: "Not directly. Company adoption and individual usage are related, but they measure different things. A company may use AI without every employee using it every day." },
-  { id: 5, question: "What should Australian AI founders do with the adoption data?", answer: "Treat the headline number as a market signal, not a product strategy. Validate specific workflows, design for different levels of AI familiarity and test whether users return." },
+export const CATEGORY = 'featured'
+export const SLUG = 'how-many-people-use-artificial-intelligence-in-2026'
+export const DATE_PUBLISHED = '2026-05-11'
+export const DATE_MODIFIED = '2026-09-09'
+export const DESCRIPTION = 'Understand the billion-user estimate, dated Australian survey evidence and why monthly users, device counts and business adoption cannot be combined.'
+export const FEATURED_FOCUS = 'ai'
+const TITLE = 'How many people use AI? Reading the evidence in 2026'
+const GLOBAL_SOURCE = 'https://datareportal.com/reports/digital-2026-one-billion-people-using-ai'
+const AU_SOURCE = 'https://digitalinclusionindex.org.au/australia-is-facing-an-ai-divide-new-national-survey-shows/'
+export const faqItems = [
+ { id: 1, question: 'Is there a precise worldwide count of people using AI in 2026?', answer: 'The sources reviewed here do not establish one. They cover particular tools, populations and periods, not a live census of every AI interaction.' },
+ { id: 2, question: 'Can I add user totals from different AI tools?', answer: 'Not without accounting for overlap, compatible time windows and counting units. One person may use several tools, accounts or devices.' },
+ { id: 3, question: 'Does business adoption measure individual use?', answer: 'No. A percentage of surveyed businesses cannot be treated as a percentage of employees or residents.' },
 ]
-
-export const summaryHighlights = {
-  heading: "Key facts: How Many People Use Artificial Intelligence in 2026?",
-  intro: "More than one billion people now use AI globally, but adoption is still uneven.",
-  items: [
-    { label: "How many people use AI worldwide?", description: "More than one billion people use AI globally." },
-    { label: "What percentage of Australians use AI?", description: "One consumer estimate projected 57% of Australians would embrace AI in 2026; business surveys can show different figures because they measure companies rather than individuals." },
-    { label: "Is AI adoption universal?", description: "No. AI use is widespread, but many people still have limited or no meaningful hands-on experience with AI tools." },
-  ],
-}
-
-export const articleMeta = {
-  title: "How Many People Use Artificial Intelligence in 2026?",
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
-  { question: "How many people use artificial intelligence?", answer: "More than one billion people use AI, according to DataReportal’s global estimate. The figure should be treated as a broad estimate rather than a precise live count." },
-  { question: "Does that mean most people use AI?", answer: "No. Global AI adoption is substantial, but it is not universal. Some estimates suggest many people have still not had a direct, meaningful interaction with AI." },
-  { question: "Why is AI usage hard to count?", answer: "AI usage is spread across chatbots, apps, search tools, workplace systems and embedded product features. Some people use several tools, while others use AI without recognising it as AI." },
-  { question: "Do company AI statistics count as people using AI?", answer: "Not directly. Company adoption and individual usage are related, but they measure different things. A company may use AI without every employee using it every day." },
-  { question: "What should Australian AI founders do with the adoption data?", answer: "Treat the headline number as a market signal, not a product strategy. Validate specific workflows, design for different levels of AI familiarity and test whether users return." },
-]
-
-const faqStructuredData = faqSchemaItems.length
-  ? JSON.stringify({
-      '@context': 'https://schema.org',
-      '@type': 'FAQPage',
-      mainEntity: faqSchemaItems.map((item) => ({
-        '@type': 'Question',
-        name: item.question,
-        acceptedAnswer: {
-          '@type': 'Answer',
-          text: item.answer,
-        },
-      })),
-    })
-  : null
-
 const CONTENT_FACTORY_INSPECTOR_SCRIPT = "(function(){\nvar protocol=3;\nvar params=new URLSearchParams(window.location.search);\nif(!params.has('cfInspector'))return;\nfunction post(payload){try{window.parent.postMessage(Object.assign({source:'content-factory-inspector',protocolVersion:protocol},payload),'*');}catch(e){}}\nif(window.__cfArticleInspectorInstalled){post({type:'ready',mode:window.__cfArticleInspectorMode||'comment'});return;}\nwindow.__cfArticleInspectorInstalled=true;window.__cfArticleInspectorProtocolVersion=protocol;window.__cfArticleInspectorMode='comment';\nvar style=document.createElement('style');\nstyle.textContent='[data-cf-component-id]{cursor:crosshair}.cf-inspector-hover,.cf-inspector-selected{outline:2px solid #7c3aed!important;outline-offset:3px}.cf-inspector-selected{outline-color:#2563eb!important}#cf-inspector-label{position:fixed;z-index:2147483647;pointer-events:none;border-radius:6px;background:#111827;color:white;padding:4px 8px;font:600 12px/1.4 ui-sans-serif,system-ui,sans-serif;box-shadow:0 8px 24px rgba(15,23,42,.22)}';\ndocument.head.appendChild(style);\nvar label=document.createElement('div');\nlabel.id='cf-inspector-label';label.hidden=true;document.body.appendChild(label);\nvar active=null;var selected=null;var measureQueued=false;\nfunction mode(){return window.__cfArticleInspectorMode||'comment';}\nfunction rect(el){var r=el.getBoundingClientRect();return{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};}\nfunction viewport(){return{width:window.innerWidth,height:window.innerHeight,scrollX:window.scrollX,scrollY:window.scrollY,devicePixelRatio:window.devicePixelRatio||1};}\nfunction esc(value){return String(value||'').replace(/\"/g,'\\\\\"');}\nfunction cleanText(el){return String((el&&el.textContent)||'').replace(/\\s+/g,' ').trim();}\nfunction textHash(value){var text=String(value||'');var hash=0;for(var i=0;i<text.length;i++){hash=((hash<<5)-hash)+text.charCodeAt(i);hash|=0;}return String(hash);}\nfunction domPath(el){var parts=[];var node=el;while(node&&node.nodeType===1&&node!==document.body){var tag=(node.tagName||'').toLowerCase();var index=1;var sibling=node.previousElementSibling;while(sibling){if((sibling.tagName||'').toLowerCase()===tag)index++;sibling=sibling.previousElementSibling;}parts.unshift(tag+':nth-of-type('+index+')');node=node.parentElement;}return parts.length?'body > '+parts.join(' > '):'body';}\nfunction visibleEnough(el){if(!el||!el.getBoundingClientRect)return false;var r=el.getBoundingClientRect();return r.width>=24&&r.height>=16;}\nfunction fallbackLabel(el,kind,index){var text=cleanText(el);if(text)return text.slice(0,100);if(kind==='image')return el.getAttribute('alt')||'Image '+index;if(kind==='toc')return'Table of contents';if(kind==='references')return'Authoritative References';if(kind==='disclaimer')return'Disclaimer';if(kind==='events-cta')return'Upcoming events CTA';if(kind==='company-highlight-cta')return'Highlighted CTA';if(kind==='cta')return'Call to action '+index;return kind+' '+index;}\nfunction setBoundary(node,id,type,label){if(!node||node.nodeType!==1||!visibleEnough(node))return false;if(node.hasAttribute('data-cf-component-id'))return false;var nearest=node.closest&&node.closest('[data-cf-component-id]');if(nearest&&nearest!==node&&nearest.getAttribute('data-cf-component-id')!=='article')return false;node.setAttribute('data-cf-component-id',id);node.setAttribute('data-cf-component-type',type);node.setAttribute('data-cf-component-label',label);node.setAttribute('data-cf-dom-boundary','true');return true;}\nfunction queryAll(selector){try{return Array.prototype.slice.call(document.querySelectorAll(selector));}catch(e){return[];}}\nfunction markKnownBoundaries(){\nvar groups=[\n{id:'toc',type:'toc',label:'Table of contents',selectors:['[data-article-toc-placeholder]','[data-article-toc]','[data-component=\"table-of-contents\"]','[data-semantic*=\"table-of-contents\" i]','[data-semantic*=\"sidebar-toc\" i]','nav[aria-label*=\"Table of contents\" i]','nav[aria-label*=\"contents\" i]']},\n{id:'references',type:'references',label:'Authoritative References',selectors:['[data-component*=\"reference\" i]','section[aria-label*=\"reference\" i]','section[id*=\"reference\" i]','[class*=\"references\" i]','[class*=\"reference-list\" i]']},\n{id:'disclaimer',type:'disclaimer',label:'Disclaimer',selectors:['[role=\"note\"][aria-label*=\"Legal\" i]','[aria-label*=\"Disclaimer\" i]','[class*=\"disclaimer\" i]','[class*=\"legal-notice\" i]']},\n{id:'events-cta',type:'events-cta',label:'Upcoming events CTA',selectors:['.events-cta','[class*=\"events-cta\" i]','section[aria-label*=\"Upcoming events\" i]','section[aria-label*=\"webinar\" i]']},\n{id:'highlight-cta',type:'company-highlight-cta',label:'Highlighted CTA',selectors:['[class*=\"highlight\" i][class*=\"cta\" i]','[class*=\"community\" i][class*=\"events\" i]']},\n{id:'cta',type:'company-cta',label:'Company CTA',selectors:['section[aria-label*=\"call to action\" i]','[class*=\"company-cta\" i]','[class*=\"resource-cta\" i]','[class*=\"cta\" i]']}\n];\nfor(var g=0;g<groups.length;g++){var group=groups[g];for(var s=0;s<group.selectors.length;s++){var nodes=queryAll(group.selectors[s]);for(var i=0;i<nodes.length;i++){setBoundary(nodes[i],group.id,group.type,group.label);}}}\n}\nfunction genericKind(node){var tag=(node.tagName||'component').toLowerCase();var classes=String(node.className||'').toLowerCase();var semantic=String(node.getAttribute('data-semantic')||'').toLowerCase();var aria=String(node.getAttribute('aria-label')||'').toLowerCase();var text=cleanText(node).toLowerCase();if(semantic.indexOf('toc')>=0||aria.indexOf('contents')>=0)return'toc';if(classes.indexOf('reference')>=0||aria.indexOf('reference')>=0||text.indexOf('authoritative references')>=0)return'references';if(classes.indexOf('disclaimer')>=0||aria.indexOf('legal')>=0||text.indexOf('disclaimer')===0)return'disclaimer';if(classes.indexOf('events-cta')>=0||text.indexOf('upcoming events')>=0||text.indexOf('event calendar')>=0)return'events-cta';if(classes.indexOf('highlight')>=0&&classes.indexOf('cta')>=0)return'company-highlight-cta';if(tag==='img'||tag==='figure')return'image';if(tag==='a'||tag==='button'||node.getAttribute('role')==='button'||classes.indexOf('cta')>=0)return'cta';if(tag==='h1'||tag==='h2'||tag==='h3')return'heading';if(tag==='ul'||tag==='ol')return'list';if(tag==='table')return'table';if(tag==='blockquote')return'quote';return'section';}\nfunction genericId(kind,index){if(kind==='toc')return'toc';if(kind==='references')return'references';if(kind==='disclaimer')return'disclaimer';if(kind==='events-cta')return'events-cta';if(kind==='company-highlight-cta')return'highlight-cta';if(kind==='cta')return'cta';return'dom:'+kind+':'+index;}\nfunction ensureFallbackBoundaries(){\nvar root=document.querySelector('article')||document.querySelector('main')||document.body;if(!root)return;\nmarkKnownBoundaries();\nvar selectors=['main section','article section','section','h1','h2','h3','figure','img','table','blockquote','[role=\"button\"]','button','a[class*=\"cta\" i]','[class*=\"cta\" i]','[class*=\"callout\" i]','[class*=\"reference\" i]','[class*=\"disclaimer\" i]','[data-semantic*=\"toc\" i]','ul','ol'];\nvar nodes=[];for(var s=0;s<selectors.length;s++){var found=queryAll(selectors[s]);for(var i=0;i<found.length;i++){var el=found[i];if(!root.contains(el)&&el!==root)continue;if(!visibleEnough(el))continue;if(nodes.indexOf(el)===-1)nodes.push(el);}}\nif(!document.querySelector('[data-cf-component-id]')&&visibleEnough(root))nodes.unshift(root);\nfor(var n=0;n<nodes.length;n++){var node=nodes[n];if(node.hasAttribute('data-cf-component-id'))continue;var kind=genericKind(node);setBoundary(node,genericId(kind,n+1),kind,fallbackLabel(node,kind,n+1));}\n}\nfunction componentNodes(){ensureFallbackBoundaries();return document.querySelectorAll('[data-cf-component-id]');}\nfunction byId(id){var nodes=componentNodes();for(var i=0;i<nodes.length;i++){if(nodes[i].getAttribute('data-cf-component-id')===id)return nodes[i];}return null;}\nfunction componentData(el,type,event){var id=el.getAttribute('data-cf-component-id')||'';var r=rect(el);var text=cleanText(el);var payload={type:type,componentId:id,componentType:el.getAttribute('data-cf-component-type')||'',sourceSectionId:el.getAttribute('data-cf-source-section-id')||'',label:el.getAttribute('data-cf-component-label')||id,selector:'[data-cf-component-id=\"'+esc(id)+'\"]',domPath:domPath(el),textHash:textHash(text),textExcerpt:text.slice(0,500),rect:r,viewport:viewport(),pageUrl:window.location.href,previewMode:params.get('cfPreviewMode')||params.get('previewMode')||''};if(event){var width=r.width||1;var height=r.height||1;var x=Math.max(0,Math.min(1,(event.clientX-r.left)/width));var y=Math.max(0,Math.min(1,(event.clientY-r.top)/height));payload.click={x:event.clientX,y:event.clientY,pageX:event.pageX,pageY:event.pageY};payload.anchor={x:x,y:y,createdFrom:'live_preview_click'};}return payload;}\nfunction allComponents(){var nodes=componentNodes();var out=[];for(var i=0;i<nodes.length;i++){out.push(componentData(nodes[i],'component'));}return out;}\nfunction postMeasure(){post({type:'measure',components:allComponents()});}\nfunction queueMeasure(){if(measureQueued)return;measureQueued=true;window.requestAnimationFrame(function(){measureQueued=false;postMeasure();});}\nfunction setSelected(id){if(selected)selected.classList.remove('cf-inspector-selected');selected=id?byId(id):null;if(selected)selected.classList.add('cf-inspector-selected');}\nfunction show(el){var box=el.getBoundingClientRect();var name=el.getAttribute('data-cf-component-label')||el.getAttribute('data-cf-component-id')||'component';var kind=el.getAttribute('data-cf-component-type')||'component';label.textContent=name+' ('+kind+')';label.style.left=Math.max(8,Math.min(box.left,window.innerWidth-260))+'px';label.style.top=Math.max(8,box.top-32)+'px';label.hidden=false;}\nfunction suppress(event){event.preventDefault();event.stopPropagation();if(event.stopImmediatePropagation)event.stopImmediatePropagation();}\ndocument.addEventListener('mouseover',function(event){ensureFallbackBoundaries();var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;if(!target)return;if(active&&active!==target)active.classList.remove('cf-inspector-hover');active=target;target.classList.add('cf-inspector-hover');show(target);post(componentData(target,'hover'));},true);\ndocument.addEventListener('mouseout',function(event){if(!active)return;var next=event.relatedTarget;if(next&&active.contains(next))return;active.classList.remove('cf-inspector-hover');active=null;label.hidden=true;},true);\ndocument.addEventListener('click',function(event){ensureFallbackBoundaries();var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;var interactive=event.target&&event.target.closest?event.target.closest('a,button,input,select,textarea,label,summary,[role=\"button\"]'):null;if(target){suppress(event);setSelected(target.getAttribute('data-cf-component-id')||'');post(componentData(target,mode()==='comment'?'comment:create':'select',event));queueMeasure();return;}if(interactive){suppress(event);}},true);\ndocument.addEventListener('submit',function(event){suppress(event);},true);\ndocument.addEventListener('scroll',queueMeasure,true);window.addEventListener('resize',queueMeasure);\nwindow.addEventListener('message',function(event){var message=event.data;if(!message||typeof message!=='object'||message.source!=='founder-tools-inspector')return;if(message.type==='setMode'){window.__cfArticleInspectorMode=message.mode==='inspect'?'inspect':'comment';post({type:'ready',mode:mode()});}else if(message.type==='measureComponents'){postMeasure();}else if(message.type==='scrollToComponent'){var target=byId(message.componentId||'');if(target){target.scrollIntoView({block:'center',inline:'nearest'});setSelected(message.componentId||'');setTimeout(queueMeasure,80);}}else if(message.type==='setSelectedComponent'){setSelected(message.componentId||'');}});\npost({type:'ready',mode:mode()});\nsetTimeout(queueMeasure,0);\n})();"

 function ContentFactoryInspectorBridge() {
@@ -112,212 +37,61 @@
   return null
 }

+
 export default function ArticleContent() {
-  const authorDetails = {
-    name: AUTHOR,
-    role: AUTHOR_ROLE,
-    bio: AUTHOR_BIO,
-    avatarUrl: AUTHOR_AVATAR,
-  }
-
-  return (
-    <>
-
-      <ContentFactoryInspectorBridge />
-      <ArticleHeroHeader
-        breadcrumbs={[
-          { label: 'Home', href: '/', icon: Home },
-          { label: 'Articles', href: "/articles" },
-          { label: TOPIC, current: true },
-        ]}
-        title={TOPIC}
-        titleHighlight={TOPIC}
-        headerBgColor="cyan"
-        summary={summaryHighlights}
-        heroImage={HERO_IMAGE}
-        heroImageAlt={HERO_IMAGE_ALT}
-      />
-
-      <ArticleTocPlaceholder className="bg-transparent" />
-
-      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
-        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"The short answer is large, but not universal"} data-cf-source-section-id={"intro"}>
-        <p><strong>{TOPIC}</strong> — {"More than one billion people now use AI, according to DataReportal’s global analysis. That is the clearest headline answer to the question, “how many people use artificial intelligence?” It shows that AI has moved well beyond a niche tool for researchers, engineers and early adopters."}</p>
-        <p>{"But the number needs context. A large global user base does not mean most people use AI often, use it knowingly, or have equal access to it. Other commentary on global adoption points to the opposite side of the story: many people have still never had a direct, meaningful interaction with AI. For Australian AI builders, that gap matters. The opportunity is not only that AI is already big. It is that adoption is still uneven, and many practical use cases are still waiting to be built."}</p>
-        <div data-cf-component-id={"image:intro"} data-cf-component-type={"image"} data-cf-component-label={"Hero image"} data-cf-source-section-id={"intro"}>
-        <ArticleImageBlock
-          src={HERO_IMAGE}
-          alt={HERO_IMAGE_ALT}
-          caption="How many people use artificial intelligence? Over 1B."
-          width={1600}
-          height={1067}
-        />
-        </div>
-        </div>
-
-        <div data-cf-component-id={"audience-grid"} data-cf-component-type={"audience-grid"} data-cf-component-label={"Who is this guide for?"}>
-          <AudienceGrid
-            heading="Who is this guide for?"
-            cards={[
-            {
-              title: 'Founders & Builders',
-              description: 'For operators validating demand, pitching a vision, and moving before momentum stalls.',
-              icon: <RocketLaunchIcon className="h-6 w-6" />,
-              variant: 'orange',
-            },
-            {
-              title: 'Students & Switchers',
-              description: 'For readers learning how strong technical partners evaluate traction, skills, and fit.',
-              icon: <AcademicCapIcon className="h-6 w-6" />,
-              variant: 'purple',
-            },
-            {
-              title: 'Community Builders',
-              description: 'For connectors, mentors, and organisers helping founders meet collaborators in the right rooms.',
-              icon: <UsersIcon className="h-6 w-6" />,
-              variant: 'yellow',
-            },
-            ]}
-          />
-        </div>
-
-        <div className="mt-6" data-cf-component-id={"quote:key-insight"} data-cf-component-type={"quote"} data-cf-component-label={"Key insight"}>
-          <QuoteBlock title="Key insight" variant="purple">
-            {"AI adoption is large enough to matter now, but uneven enough that clear onboarding, local context and specific workflows still decide whether people keep using a product."}
-          </QuoteBlock>
-        </div>
-        <div id="global-ai-user-estimate" data-cf-component-id={"section:global-ai-user-estimate"} data-cf-component-type={"section"} data-cf-component-label={"More than one billion people use AI"} data-cf-source-section-id={"global-ai-user-estimate"}>
-          <h2>{"More than one billion people use AI"}</h2>
-          <p>{"The clearest current answer is that more than one billion people use AI. That distinction matters because AI use is spread across many tools, apps and platforms, and not every provider publishes comparable user numbers."}</p>
-          <p>{"ChatGPT launched to the public only a few years ago, yet AI has already become a mainstream digital topic. Platform milestones help show momentum, but they do not tell the whole story. One person may use several AI products, while another may use AI through a search engine or app without thinking of it as a separate AI platform."}</p>
-          <p>{"So the best reading is simple: global AI use has passed the one billion person mark, but the precise count is still hard to measure. For founders, builders and community leaders, that means the more useful question is not only how many people use artificial intelligence, but how quickly everyday expectations are changing around it."}</p>
-          <div data-cf-component-id={"image:global-ai-user-estimate"} data-cf-component-type={"image"} data-cf-component-label={"Image: More than one billion people use AI"} data-cf-source-section-id={"global-ai-user-estimate"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-cd9c5821-ba76-4108-a04b-753fa3e1105a.jpg?alt=media&token=a2d218f2-bc07-42a1-8249-f90a137a16dd"
-            alt="Hands using an AI chatbot on a laptop beside notes and coffee, reflecting everyday AI use at massive scale"
-            caption="More than one billion people use AI"
-            width={1200}
-            height={800}
-          />
-          </div>
-          <ArticleCallout title="" variant="brand">
-            {"More than one billion people now use AI, according to DataReportal, but the number should be treated as a broad global estimate rather than a precise headcount."}
-          </ArticleCallout>
-        </div>
-        <div id="why-ai-usage-is-hard-to-count" data-cf-component-id={"section:why-ai-usage-is-hard-to-count"} data-cf-component-type={"section"} data-cf-component-label={"Why the real number is hard to measure"} data-cf-source-section-id={"why-ai-usage-is-hard-to-count"}>
-          <h2>{"Why the real number is hard to measure"}</h2>
-          <p>{"AI usage is hard to count because not every statistic is measuring the same thing. Some reports focus on people who directly use AI platforms, such as chatbots or image tools. Others focus on AI inside products and services that people already use. DataReportal notes that platform milestones exist, but there are still few evidence-based figures for total AI use across all tools."}</p>
-          <p>{"Business adoption adds another layer. A company may say it uses AI, but that does not mean every employee uses it every day. Hostinger frames the business question as how widely companies use AI across industries, regions and functions. That is different from counting individual users. For readers, the safest approach is to ask what the number is really counting before comparing one AI usage claim with another."}</p>
-          <h3>{"Three checks before trusting an AI usage statistic"}</h3>
-          <p>{"First, define the user. A person actively prompting an AI tool is not the same as a person exposed to an AI feature inside search, software or a workplace system. Second, check the time period. Third, separate individual usage from company adoption. A business adoption figure can show organisational interest, but it should not be read as a direct count of people using AI."}</p>
-        </div>
-        <div id="global-adoption-gap" data-cf-component-id={"section:global-adoption-gap"} data-cf-component-type={"section"} data-cf-component-label={"The adoption gap is still the bigger story"} data-cf-source-section-id={"global-adoption-gap"}>
-          <h2>{"The adoption gap is still the bigger story"}</h2>
-          <p>{"The headline number is important: DataReportal argues that more than 1 billion people now use AI. But that does not mean AI has reached most people in a useful way. Another estimate claims that 84% of humanity, or about 6.8 billion people, has never interacted with AI in any meaningful sense. That figure should be read carefully, but it is a useful counterweight to the excitement around fast-growing tools."}</p>
-          <p>{"AI can have a billion users and still feel distant, invisible or irrelevant to many communities. It is also about language, price, trust, device access, local context and whether the tool fits a real workflow. It is also a product signal. The next useful AI products may come from teams that understand a specific community deeply, rather than teams that only optimise for early adopters."}</p>
-          <div data-cf-component-id={"image:global-adoption-gap"} data-cf-component-type={"image"} data-cf-component-label={"Image: The adoption gap is still the bigger story"} data-cf-source-section-id={"global-adoption-gap"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-02c982f4-0b76-4dea-baea-d146ec9c46cb.jpg?alt=media&token=18e4c21f-8ffd-4f26-a5b5-3966a1278a2d"
-            alt="Empty community computer lab with old desktops, highlighting the global AI adoption gap"
-            caption="The adoption gap is still the bigger story"
-            width={1200}
-            height={800}
-          />
-          </div>
-        </div>
-
-        <div id="business-and-startup-implications" data-cf-component-id={"section:business-and-startup-implications"} data-cf-component-type={"section"} data-cf-component-label={"What AI adoption means for Australian builders"} data-cf-source-section-id={"business-and-startup-implications"}>
-          <h2>{"What AI adoption means for Australian builders"}</h2>
-          <p>{"For Australian builders, the main lesson is that AI adoption is real, but uneven. Business research describes AI as moving beyond theory into day-to-day operations, with adoption varying by company size, region, industry and function. That means a startup should not assume every customer is already confident with AI. Some buyers may be testing tools, while others may still need help understanding where AI fits in a normal workflow."}</p>
-          <p>{"The best early opportunities are often narrow, high-friction tasks where AI can show value quickly, such as reducing repetitive work or helping teams make a routine process faster. For students and AI professionals, the same pattern matters: useful AI skills are not only model skills, but also the ability to explain, test and apply AI in real business settings."}</p>
-          <p>{"MLAI’s role in the Australian ecosystem fits this moment. Events, hackathons, educational resources, Slack-based community programs and founder tools can help builders test ideas with people who see different parts of the market. That matters when adoption is uneven. A product that sounds obvious to one AI-fluent team may need a clearer use case, simpler setup or stronger proof point for another."}</p>
-          <div data-cf-component-id={"image:business-and-startup-implications"} data-cf-component-type={"image"} data-cf-component-label={"Image: What AI adoption means for Australian builders"} data-cf-source-section-id={"business-and-startup-implications"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-6a64b290-9599-4ee2-89ad-8c125b9adec4.jpg?alt=media&token=7106b571-6fa8-4dbb-9057-b7100fc46007"
-            alt="Builder’s hands using an AI estimating app on a dusty worksite tablet in Australia"
-            caption="What AI adoption means for Australian builders"
-            width={1200}
-            height={800}
-          />
-          </div>
-        </div>
-        <div id="quick-answers-for-ai-builders" data-cf-component-id={"section:quick-answers-for-ai-builders"} data-cf-component-type={"section"} data-cf-component-label={"Quick answers for founders and teams"} data-cf-source-section-id={"quick-answers-for-ai-builders"}>
-          <h2>{"Quick answers for founders and teams"}</h2>
-          <p>{"The short answer is that more than one billion people now use AI, based on DataReportal's global estimate. That is a large number, but it is still an estimate in a fast-moving market. It should not be read as a precise count of every person who has used an AI tool."}</p>
-          <p>{"For founders and teams, the more useful reading is that AI adoption is substantial but uneven. One source argues that many people globally have still never meaningfully used AI, while business adoption sources measure companies rather than individuals."}</p>
-          <ul>
-            <li>{"More than one billion people use AI, but the exact global count is uncertain."}</li>
-            <li>{"Many more people have not meaningfully used AI, so adoption is not universal."}</li>
-            <li>{"The opportunity is in specific workflows and user needs, not generic AI hype."}</li>
-          </ul>
-          <h3>{"A simple way to use the data"}</h3>
-          <p>{"Treat the headline number as a market signal, not a product strategy. If you are building in Australia, segment your audience into active AI users, AI-curious users and AI-unaware users. AI-curious users may need a clear first use case. AI-unaware users may need the benefit explained without assuming they care about AI itself."}</p>
-          <p>{"That approach also keeps company statistics in the right place. A report on how many companies use AI can show that organisations are experimenting with AI across functions, industries or regions. It does not prove how many individual workers, customers or citizens are using AI day to day."}</p>
-        </div>
-        <div id="conclusion" data-cf-component-id={"section:conclusion"} data-cf-component-type={"section"} data-cf-component-label={"Turn the AI usage number into a practical plan"} data-cf-source-section-id={"conclusion"}>
-          <h2>{"Turn the AI usage number into a practical plan"}</h2>
-          <p>{"The best broad answer is that more than one billion people now use AI. DataReportal notes that evidence-based figures are still limited, even as AI has become a major global digital topic. Business adoption is also hard to measure cleanly across industries, regions and company sizes."}</p>
-          <p>{"For Australian builders, the practical move is to treat the headline number as a signal, not a strategy. Talk to real users, test the workflows they already have, measure whether people come back, and design for people who are not already AI experts. Communities, events, hackathons and founder resources can help turn broad AI interest into products, teams and startups with real momentum."}</p>
-          <div data-cf-component-id={"image:conclusion"} data-cf-component-type={"image"} data-cf-component-label={"Image: Turn the AI usage number into a practical plan"} data-cf-source-section-id={"conclusion"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-4cbefd5f-f138-4018-85a4-69c5812522bc.jpg?alt=media&token=1de63d6d-0961-4a04-bf6e-fe1795026a07"
-            alt="Team reviewing AI adoption numbers on laptops during a candid office planning session"
-            caption="Turn the AI usage number into a practical plan"
-            width={1200}
-            height={800}
-          />
-          </div>
-        </div>
-
-        <div data-cf-component-id={"quote:keep-moving-forward"} data-cf-component-type={"quote"} data-cf-component-label={"Keep moving forward"}>
-          <QuoteBlock title="Keep moving forward" variant="orange">
-            {"Skip salary hype and broad AI claims. The stronger opportunity is to validate real workflows, build useful products, and help people adopt AI where it clearly saves time or improves decisions."}
-          </QuoteBlock>
-        </div>
-
-      <div className="not-prose my-10 rounded-3xl border border-purple-100 bg-purple-50/70 p-6 shadow-sm" data-cf-component-id={"references"} data-cf-component-type={"references"} data-cf-component-label={"Authoritative References"}>
-        <ArticleReferences
-          references={[
-            {id: 1, href: "https://datareportal.com/reports/digital-2026-one-billion-people-using-ai", title: "More than 1 billion people use AI — DataReportal – Global Digital Insights", publisher: "datareportal.com", description: "", category: "guide"},
-            {id: 2, href: "https://www.hostinger.com/au/tutorials/how-many-companies-use-ai", title: "How many companies use AI in 2026? Stats & trends revealed", publisher: "hostinger.com", description: "", category: "guide"},
-            {id: 3, href: "https://ai.uq.edu.au/project/trust-artificial-intelligence-global-study", title: "Trust in Artificial Intelligence: A global study - Artificial Intelligence at UQ - University of Queensland", publisher: "ai.uq.edu.au", description: "", category: "guide"},
-            {id: 4, href: "https://medium.com/data-ai-and-beyond/84-of-humans-have-never-used-ai-thats-either-a-crisis-or-an-opportunity-8d7c79f5f658", title: "84% of Humans Have Never Used AI. That’s Either a Crisis or an Opportunity. | by Julius Nyerere Nyambok | Data, AI and Beyond | Medium", publisher: "medium.com", description: "", category: "guide"},
-            {id: 5, href: "https://itbrief.com.au/story/nab-says-42-of-aussie-smes-use-ai-to-boost-productivity", title: "NAB says 42% of Aussie SMEs use AI to boost productivity", publisher: "itbrief.com.au", description: "", category: "guide"},
-            {id: 6, href: "https://elementor.com/blog/ai-how-many-companies-are-really-using-it/", title: "AI in 2026: How Many Companies Are Really Using It? (Stats & Trends Revealed)", publisher: "elementor.com", description: "", category: "guide"},
-            {id: 7, href: "https://digitalinclusionindex.org.au/australia-is-facing-an-ai-divide-new-national-survey-shows/", title: "Australia is facing an ‘AI divide’, new national survey shows - Australian Digital Inclusion Index", publisher: "digitalinclusionindex.org.au", description: "", category: "guide"},
-            {id: 8, href: "https://www.nu.edu/blog/ai-statistics-trends/", title: "131 AI Statistics and Trends for 2026 | National University", publisher: "nu.edu", description: "", category: "guide"},
-            {id: 9, href: "https://www.aiprm.com/en-au/ai-statistics/", title: "AI Statistics 2024 · AIPRM", publisher: "aiprm.com", description: "", category: "guide"},
-            {id: 10, href: "https://www.quetext.com/blog/ai-usage-statistics-2026-how-many-people-use-ai", title: "AI Usage Statistics in 2026: How Many People Use AI Today?", publisher: "quetext.com", description: "", category: "guide"},
-            {id: 11, href: "https://www.comparethemarket.com.au/news/how-many-australians-use-ai-2026/", title: "Australia’s AI boom: 57% of nation to embrace artificial intelligence in 2026 | Compare the Market", publisher: "comparethemarket.com.au", description: "", category: "guide"},
-            {id: 12, href: "https://www.iabuk.com/standard-content/ai-usage-statistics", title: "AI Usage Statistics | IAB UK", publisher: "iabuk.com", description: "", category: "guide"},
-          ]}
-          heading="Sources & further reading"
-        />
-      </div>
-
-        <div data-cf-component-id={"disclaimer"} data-cf-component-type={"disclaimer"} data-cf-component-label={"Disclaimer"}>
-          <ArticleDisclaimer />
-        </div>
-
-        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
-          <ArticleCompanyCTA
-            title="Build with Australia’s AI community"
-            body="Join MLAI to meet collaborators, test ideas through events and hackathons, and turn AI adoption trends into practical products."
-            buttonText="Explore MLAI resources"
-            buttonHref="/"
-          />
-        </div>
-      </div>
-
-        <div data-cf-component-id={"author-bio"} data-cf-component-type={"author-bio"} data-cf-component-label={"About the Author"}>
-          <AuthorBio author={authorDetails} />
-        </div>
-
-        <div className="mt-12" data-cf-component-id={"faq"} data-cf-component-type={"faq"} data-cf-component-label={"FAQ"}>
-          <ArticleFAQ items={faqItems} />
-        </div>
-
-        <ArticleFooterNav backHref="/articles" topHref="#" />
-    </>
-  )
+ return <div className="bg-white">
+  <ContentFactoryInspectorBridge />
+  <ArticleHeroHeader breadcrumbs={[{ label: 'Home', href: '/', icon: Home }, { label: 'Articles', href: '/articles' }, { label: TITLE, current: true }]}
+   title={TITLE} titleHighlight="Reading the evidence in 2026" headerBgColor="cyan"
+   summary={{ heading: 'Ask what the number counts', intro: 'For AI-curious Australians interpreting adoption headlines, not forecasting a product market.', items: [
+    { label: 'Scope', description: 'Standalone tools and embedded AI features are different measures.' },
+    { label: 'Time', description: 'Check when data was collected, not just the report title.' },
+    { label: 'Overlap', description: 'Several accounts or tools may belong to one person.' },
+   ] }}
+  />
+  <article className="prose prose-lg max-w-3xl mx-auto px-4 py-10" data-cf-article-body>
+   <p><strong>No precise worldwide 2026 headcount is established by the sources reviewed here.</strong> DataReportal estimates well over one billion monthly users of standalone generative-AI tools. Published on 15 October 2025 under its Digital 2026 series, the analysis draws on 2025 evidence; it is not a live count of all AI use. <a href={GLOBAL_SOURCE}>Read Simon Kemp’s analysis and definitions</a>.</p>
+   <p><strong>Correction, 9 September 2026:</strong> the earlier article presented that estimate as broad current AI use. It also repeated an unsupported worldwide non-use claim and a projected Australian percentage. Those claims have been removed; the narrower definitions and observation dates matter.</p>
+   <h2 id="global">What the global estimate includes</h2>
+   <p>DataReportal focuses on standalone LLM and generative-AI applications. It excludes search AI summaries, embedded software features, companion chatbots and in-app Meta AI. The estimate combines platform figures and audience analysis, rather than a deduplicated census of every person. We have not independently reproduced that analysis.</p>
+   <p>An attributed estimate of this activity does not establish daily use, benefit or willingness to pay. Nor can you infer every person’s familiarity with AI from it.</p>
+   <h2 id="australia">An Australian survey has a different scope</h2>
+   <p>The Australian Digital Inclusion Index researchers’ <a href={AU_SOURCE}>3 December 2025 survey account</a> reports that 45.6% of Australians had recently used a generative-AI tool. Fieldwork was in <strong>2024</strong>, with more than 5,500 adults across states and territories, including people who do not use the internet. This is a dated survey finding, not Australia’s rate today.</p>
+   <p>The same account reports text generation at 82.6% <em>among Australian generative-AI users</em>, not all Australians. Its “recently” wording is retained here; this summary does not establish a monthly active-user measure. Do not equate it with the global estimate.</p>
+   <h2 id="measures">Four measures that should not be mixed</h2>
+   <table><thead><tr><th>Measure</th><th>Check</th><th>Does not establish</th></tr></thead><tbody>
+    <tr><td>People who tried a tool</td><td>Question, population and recall period</td><td>Continued or daily use</td></tr>
+    <tr><td>Monthly active users</td><td>Definition of active, month and person/account unit</td><td>Unique people across services</td></tr>
+    <tr><td>Visits or device identities</td><td>Repeated visits, devices and app coverage</td><td>A direct human headcount</td></tr>
+    <tr><td>Businesses adopting AI</td><td>Business sample and adoption definition</td><td>Share of employees or residents using AI</td></tr>
+   </tbody></table>
+   <h2 id="overlap">Try the double-counting exercise</h2>
+   <p><strong>Fictional exercise—not market data:</strong> a group of 100 people answers a complete survey about the same month. Sixty used Tool A, forty used Tool B and thirty used both. Assume one response per person and no missing answers.</p>
+   <p>Unique users of either tool = <strong>60 + 40 − 30 = 70</strong>. Adding the platform totals counts the thirty overlapping people twice. Thirty people used neither of these two tools; that does not establish that they used no AI elsewhere.</p>
+   <p>If overlap is unknown, the counts only bound unique users between 60 and 100 in this group. The lower bound assumes every Tool B user also used Tool A; the upper assumes no overlap. These are logical bounds, not a confidence interval. Without a shared population and period, even this calculation may be inappropriate.</p>
+   <h2 id="denominator">Try a denominator swap</h2>
+   <p><strong>Separate fictional example:</strong> of 200 respondents, 80 used a generative-AI tool and 60 of those users generated text. That is 60 ÷ 80 = 75% of users, but 60 ÷ 200 = 30% of all respondents. Both calculations are correct; swapping their labels is not. This is not a reconstruction of the Australian survey.</p>
+   <h2 id="record">Keep an adoption-claim record</h2>
+   <pre className="whitespace-pre-wrap" aria-label="AI adoption claim record">{[
+    'Claim and direct source URL:',
+    'Publisher and publication date:',
+    'Fieldwork dates or active-use window:',
+    'Country and population:',
+    'Unit: people, accounts, devices, visits or organisations:',
+    'What counts as AI and as use:',
+    'Numerator and denominator:',
+    'Overlap, missing responses and exclusions:',
+    'Estimate, observation, survey response or forecast:',
+    'Limit that must remain with the claim:',
+   ].join('\n')}</pre>
+   <p>Use this when reading a headline, not as a reason to collect private usage histories. Missing definitions should remain “not established” until the methodology resolves them.</p>
+   <h2 id="next">You do not need to match an adoption statistic</h2>
+   <p>A large usage figure is not a reason to buy a subscription or feel behind. Start with a question you want to understand. The <Link to="/articles/featured/what-is-artificial-intelligence-in-simple-words">plain-language AI guide</Link> can help with the concepts.</p>
+   <p>At a relevant MLAI session, ask about one application, limitation or confusing claim. Check the advertised topic and experience level. An event audience is not a representative sample of Australians, and participation does not require starting a company or seeking contract work.</p>
+   <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement="article-inline" />
+   <h2 id="scope">Evidence and update scope</h2>
+   <p>The two sources were checked on 9 September 2026. Publication and fieldwork dates are deliberately separate. The exercises and record are original editorial teaching material, not MLAI user research. An update needs new comparable evidence—not just a new year in the title.</p>
+   <ArticleFAQ items={faqItems} />
+  </article>
+ </div>
 }
```
