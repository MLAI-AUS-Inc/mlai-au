# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/how-to-start-a-startup-as-an-ai-builder.tsx
+++ unreviewed-local-draft/app/articles/content/featured/how-to-start-a-startup-as-an-ai-builder.tsx
@@ -3,26 +3,25 @@
 import { Home } from 'lucide-react'
 import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '../../authors'
 import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
+import ArticleConversionCTA from '../../../components/articles/ArticleConversionCTA'
+import { BASE_ARTICLE_SEO_CONFIG } from '../../seo-config'
 import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
-import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
+import { STARTUP_DELIVERY, STARTUP_DELIVERY_FILES, STARTUP_DELIVERY_ZIP } from '../../../lib/startup-builder-delivery'
 import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
 import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
 import { ArticleReferences } from '../../../components/articles/ArticleReferences'
 import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'
-import QuoteBlock from '../../../components/articles/QuoteBlock'
-import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'

 export const useCustomHeader = true

-const TOPIC = "How to Start a Startup as an AI Builder"
+const TOPIC = "Starting an AI startup: validate the problem and test your first delivery"
 export const CATEGORY = "featured"
 export const SLUG = "how-to-start-a-startup-as-an-ai-builder"
-export const DATE_PUBLISHED = "2026-07-14"
-export const DATE_MODIFIED = "2026-07-14"
-export const DESCRIPTION = "Startup how to begin: validate a clear customer problem, test a small AI workflow and prepare business foundations."
+export const DATE_PUBLISHED = "2026-08-01"
+export const DATE_MODIFIED = "2026-09-10"
+export const DESCRIPTION = "For AI-assisted builders: separate customer demand from delivery readiness, run a worked acceptance review and prepare an honest handover."
 const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-41fdd6b6-a76b-487c-a41e-5b2c34b9af49.jpg?alt=media&token=87d6ad27-1725-4aa1-a5cb-0bd7ad7297c6"
-const HERO_IMAGE_ALT = "Australian startup builders testing an AI workflow, close-up candid discussion with notes and focused gestures"
+const HERO_IMAGE_ALT = "Two people looking down together, one gesturing with a hand"
 export const FEATURED_FOCUS = "startups"

 const AUTHOR_PROFILE = getAuthorProfile(DEFAULT_AUTHOR_KEY)
@@ -73,24 +72,24 @@
 }

 export const faqItems: FAQ[] = [
-  { id: 1, question: "How to start a startup step by step?", answer: "Start by defining a specific customer problem, research the market and existing alternatives, speak with potential users, test a simple workflow, and use the evidence to decide whether to continue, narrow or change direction." },
-  { id: 2, question: "When should an Australian startup register the business?", answer: "Registering becomes relevant once customer conversations and early tests have made the venture direction clearer and the business is preparing to operate; current requirements depend on the venture and jurisdiction." },
-  { id: 3, question: "Do you need a co-founder to start an AI startup?", answer: "A co-founder is not identified as a required first step; the initial work is to define a customer problem, validate the need with potential users and test a small workflow." },
-  { id: 4, question: "What should you do if customer conversations do not support the original idea?", answer: "Change direction when potential users\u2019 needs differ from the original assumption, and continue investing only when research and validation give a credible reason to do so." },
+  { id: 1, question: "Does a working AI prototype validate a startup idea?", answer: "No. A technical test can show how a workflow behaves under selected conditions. Investigate a real user's task, alternatives and willingness to adopt or pay separately; an invented lab cannot establish those facts." },
+  { id: 2, question: "When should an Australian startup register the business?", answer: "There is no universal registration milestone tied to customer validation. Check the registrations, licences, tax and other obligations for your actual activities before operating or making commitments. Use current Australian Government guidance and obtain qualified advice for your circumstances." },
+  { id: 3, question: "Why do all the code tests pass while the delivery is held?", answer: "The tests reproduce the recorded behaviour, including a known defect. In q8 the program gives the event time to someone asking about parking. The acceptance review correctly reports HOLD; matching code tests is not the same as fulfilling the brief." },
+  { id: 4, question: "Can I use the supplied lab as evidence when applying for projects?", answer: "Identify it as a supplied teaching starter. Explain your own changes, AI assistance, review, actual tests and limitations. It is not client experience, proof of sole authorship, guaranteed project selection or permission to publish private work." },
 ]

 export const summaryHighlights = {
-  heading: "Key facts: How to Start a Startup as an AI Builder",
-  intro: "Startup how to begin: validate a clear customer problem, test a small AI workflow and prepare business foundations.",
+  heading: "From a prototype to an honest delivery decision",
+  intro: "Use separate evidence for customer demand, technical behaviour and readiness to take on a brief.",
   items: [
-    { label: "What is the first step in starting a startup?", description: "The first step is defining a clear problem for a specific group of people, including work that is slow, costly, difficult or leads to poor decisions." },
-    { label: "How do you validate a startup idea before building?", description: "Validate an idea by speaking with potential customers about their current process and alternatives, then testing a simple proposed workflow before committing to extensive product work." },
-    { label: "What should an AI startup build first?", description: "An AI startup should first build a narrow workflow for one user, with one input and one useful output that supports a specific decision or action." },
+    { label: "Investigate the user", description: "Record the current task and alternatives. A useful demo is not evidence of a sale or adoption." },
+    { label: "Test the brief", description: "Reproduce a small event-reply review: the code tests pass, but an irrelevant answer means the delivery is held." },
+    { label: "Hand over the limits", description: "Download the source, tests, results and completed handover. Attribute your own work honestly." },
   ],
 }

 export const articleMeta = {
-  title: "How to Start a Startup as an AI Builder",
+  title: TOPIC,
   topic: TOPIC,
   category: CATEGORY,
   slug: SLUG,
@@ -103,30 +102,7 @@
   featuredFocus: FEATURED_FOCUS,
 }

-const faqSchemaItems = [
-  { question: "What is the first step in starting a startup?", answer: "The first step is defining a clear problem for a specific group of people, including work that is slow, costly, difficult or leads to poor decisions." },
-  { question: "How do you validate a startup idea before building?", answer: "Validate an idea by speaking with potential customers about their current process and alternatives, then testing a simple proposed workflow before committing to extensive product work." },
-  { question: "What should an AI startup build first?", answer: "An AI startup should first build a narrow workflow for one user, with one input and one useful output that supports a specific decision or action." },
-  { question: "How to start a startup step by step?", answer: "Start by defining a specific customer problem, research the market and existing alternatives, speak with potential users, test a simple workflow, and use the evidence to decide whether to continue, narrow or change direction." },
-  { question: "When should an Australian startup register the business?", answer: "Registering becomes relevant once customer conversations and early tests have made the venture direction clearer and the business is preparing to operate; current requirements depend on the venture and jurisdiction." },
-  { question: "Do you need a co-founder to start an AI startup?", answer: "A co-founder is not identified as a required first step; the initial work is to define a customer problem, validate the need with potential users and test a small workflow." },
-  { question: "What should you do if customer conversations do not support the original idea?", answer: "Change direction when potential users\u2019 needs differ from the original assumption, and continue investing only when research and validation give a credible reason to do so." },
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
+

 const CONTENT_FACTORY_INSPECTOR_SCRIPT = "(function(){\nvar protocol=3;\nvar params=new URLSearchParams(window.location.search);\nif(!params.has('cfInspector'))return;\nfunction post(payload){try{window.parent.postMessage(Object.assign({source:'content-factory-inspector',protocolVersion:protocol},payload),'*');}catch(e){}}\nif(window.__cfArticleInspectorInstalled){post({type:'ready',mode:window.__cfArticleInspectorMode||'comment'});return;}\nwindow.__cfArticleInspectorInstalled=true;window.__cfArticleInspectorProtocolVersion=protocol;window.__cfArticleInspectorMode='comment';\nvar style=document.createElement('style');\nstyle.textContent='[data-cf-component-id]{cursor:crosshair}.cf-inspector-hover,.cf-inspector-selected{outline:2px solid #7c3aed!important;outline-offset:3px}.cf-inspector-selected{outline-color:#2563eb!important}#cf-inspector-label{position:fixed;z-index:2147483647;pointer-events:none;border-radius:6px;background:#111827;color:white;padding:4px 8px;font:600 12px/1.4 ui-sans-serif,system-ui,sans-serif;box-shadow:0 8px 24px rgba(15,23,42,.22)}';\ndocument.head.appendChild(style);\nvar label=document.createElement('div');\nlabel.id='cf-inspector-label';label.hidden=true;document.body.appendChild(label);\nvar active=null;var selected=null;var measureQueued=false;\nfunction mode(){return window.__cfArticleInspectorMode||'comment';}\nfunction rect(el){var r=el.getBoundingClientRect();return{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};}\nfunction viewport(){return{width:window.innerWidth,height:window.innerHeight,scrollX:window.scrollX,scrollY:window.scrollY,devicePixelRatio:window.devicePixelRatio||1};}\nfunction esc(value){return String(value||'').replace(/\"/g,'\\\\\"');}\nfunction cleanText(el){return String((el&&el.textContent)||'').replace(/\\s+/g,' ').trim();}\nfunction textHash(value){var text=String(value||'');var hash=0;for(var i=0;i<text.length;i++){hash=((hash<<5)-hash)+text.charCodeAt(i);hash|=0;}return String(hash);}\nfunction domPath(el){var parts=[];var node=el;while(node&&node.nodeType===1&&node!==document.body){var tag=(node.tagName||'').toLowerCase();var index=1;var sibling=node.previousElementSibling;while(sibling){if((sibling.tagName||'').toLowerCase()===tag)index++;sibling=sibling.previousElementSibling;}parts.unshift(tag+':nth-of-type('+index+')');node=node.parentElement;}return parts.length?'body > '+parts.join(' > '):'body';}\nfunction visibleEnough(el){if(!el||!el.getBoundingClientRect)return false;var r=el.getBoundingClientRect();return r.width>=24&&r.height>=16;}\nfunction fallbackLabel(el,kind,index){var text=cleanText(el);if(text)return text.slice(0,100);if(kind==='image')return el.getAttribute('alt')||'Image '+index;if(kind==='toc')return'Table of contents';if(kind==='references'||kind==='authoritative-references')return'Authoritative References';if(kind==='disclaimer')return'Disclaimer';if(kind==='events-cta')return'Upcoming events CTA';if(kind==='company-highlight-cta')return'Highlighted CTA';if(kind==='cta')return'Call to action '+index;return kind+' '+index;}\nfunction setBoundary(node,id,type,label){if(!node||node.nodeType!==1||!visibleEnough(node))return false;if(node.hasAttribute('data-cf-component-id'))return false;var nearest=node.closest&&node.closest('[data-cf-component-id]');if(nearest&&nearest!==node&&nearest.getAttribute('data-cf-component-id')!=='article')return false;node.setAttribute('data-cf-component-id',id);node.setAttribute('data-cf-component-type',type);node.setAttribute('data-cf-component-label',label);node.setAttribute('data-cf-dom-boundary','true');return true;}\nfunction queryAll(selector){try{return Array.prototype.slice.call(document.querySelectorAll(selector));}catch(e){return[];}}\nfunction markKnownBoundaries(){\nvar groups=[\n{id:'toc',type:'toc',label:'Table of contents',selectors:['[data-article-toc-placeholder]','[data-article-toc]','[data-component=\"table-of-contents\"]','[data-semantic*=\"table-of-contents\" i]','[data-semantic*=\"sidebar-toc\" i]','nav[aria-label*=\"Table of contents\" i]','nav[aria-label*=\"contents\" i]']},\n{id:'authoritative-references',type:'references',label:'Authoritative References',selectors:['[data-cf-component-id=\"authoritative-references\"]','[data-component*=\"authoritative-reference\" i]','section[aria-label*=\"Authoritative references\" i]']},\n{id:'references',type:'references',label:'Authoritative References',selectors:['[data-component*=\"reference\" i]','section[aria-label*=\"reference\" i]','section[id*=\"reference\" i]','[class*=\"references\" i]','[class*=\"reference-list\" i]']},\n{id:'disclaimer',type:'disclaimer',label:'Disclaimer',selectors:['[role=\"note\"][aria-label*=\"Legal\" i]','[aria-label*=\"Disclaimer\" i]','[class*=\"disclaimer\" i]','[class*=\"legal-notice\" i]']},\n{id:'events-cta',type:'events-cta',label:'Upcoming events CTA',selectors:['.events-cta','[class*=\"events-cta\" i]','section[aria-label*=\"Upcoming events\" i]','section[aria-label*=\"webinar\" i]']},\n{id:'highlight-cta',type:'company-highlight-cta',label:'Highlighted CTA',selectors:['[class*=\"highlight\" i][class*=\"cta\" i]','[class*=\"community\" i][class*=\"events\" i]']},\n{id:'cta',type:'company-cta',label:'Company CTA',selectors:['section[aria-label*=\"call to action\" i]','[class*=\"company-cta\" i]','[class*=\"resource-cta\" i]','[class*=\"cta\" i]']}\n];\nfor(var g=0;g<groups.length;g++){var group=groups[g];for(var s=0;s<group.selectors.length;s++){var nodes=queryAll(group.selectors[s]);for(var i=0;i<nodes.length;i++){setBoundary(nodes[i],group.id,group.type,group.label);}}}\n}\nfunction genericKind(node){var tag=(node.tagName||'component').toLowerCase();var classes=String(node.className||'').toLowerCase();var semantic=String(node.getAttribute('data-semantic')||'').toLowerCase();var aria=String(node.getAttribute('aria-label')||'').toLowerCase();var text=cleanText(node).toLowerCase();if(semantic.indexOf('toc')>=0||aria.indexOf('contents')>=0)return'toc';if(text.indexOf('authoritative references')>=0)return'authoritative-references';if(classes.indexOf('reference')>=0||aria.indexOf('reference')>=0)return'references';if(classes.indexOf('disclaimer')>=0||aria.indexOf('legal')>=0||text.indexOf('disclaimer')===0)return'disclaimer';if(classes.indexOf('events-cta')>=0||text.indexOf('upcoming events')>=0||text.indexOf('event calendar')>=0)return'events-cta';if(classes.indexOf('highlight')>=0&&classes.indexOf('cta')>=0)return'company-highlight-cta';if(tag==='img'||tag==='figure')return'image';if(tag==='a'||tag==='button'||node.getAttribute('role')==='button'||classes.indexOf('cta')>=0)return'cta';if(tag==='h1'||tag==='h2'||tag==='h3')return'heading';if(tag==='ul'||tag==='ol')return'list';if(tag==='table')return'table';if(tag==='blockquote')return'quote';return'section';}\nfunction genericId(kind,index){if(kind==='toc')return'toc';if(kind==='references')return'references';if(kind==='authoritative-references')return'authoritative-references';if(kind==='disclaimer')return'disclaimer';if(kind==='events-cta')return'events-cta';if(kind==='company-highlight-cta')return'highlight-cta';if(kind==='cta')return'cta';return'dom:'+kind+':'+index;}\nfunction ensureFallbackBoundaries(){\nvar root=document.querySelector('article')||document.querySelector('main')||document.body;if(!root)return;\nmarkKnownBoundaries();\nvar selectors=['main section','article section','section','h1','h2','h3','figure','img','table','blockquote','[role=\"button\"]','button','a[class*=\"cta\" i]','[class*=\"cta\" i]','[class*=\"callout\" i]','[class*=\"reference\" i]','[class*=\"disclaimer\" i]','[data-semantic*=\"toc\" i]','ul','ol'];\nvar nodes=[];for(var s=0;s<selectors.length;s++){var found=queryAll(selectors[s]);for(var i=0;i<found.length;i++){var el=found[i];if(!root.contains(el)&&el!==root)continue;if(!visibleEnough(el))continue;if(nodes.indexOf(el)===-1)nodes.push(el);}}\nif(!document.querySelector('[data-cf-component-id]')&&visibleEnough(root))nodes.unshift(root);\nfor(var n=0;n<nodes.length;n++){var node=nodes[n];if(node.hasAttribute('data-cf-component-id'))continue;var kind=genericKind(node);setBoundary(node,genericId(kind,n+1),kind,fallbackLabel(node,kind,n+1));}\n}\nfunction componentNodes(){ensureFallbackBoundaries();var nodes=Array.prototype.slice.call(document.querySelectorAll('[data-cf-component-id]'));var byId={};var ordered=[];for(var i=0;i<nodes.length;i++){var node=nodes[i];if(!visibleEnough(node))continue;var id=node.getAttribute('data-cf-component-id')||'';if(!id)continue;var current=byId[id];if(current&&current!==node){if(current.contains(node)){var pos=ordered.indexOf(current);if(pos>=0)ordered[pos]=node;byId[id]=node;continue;}if(node.contains(current))continue;}if(!current)ordered.push(node);byId[id]=node;}return ordered;}\nfunction byId(id){var nodes=componentNodes();for(var i=0;i<nodes.length;i++){if(nodes[i].getAttribute('data-cf-component-id')===id)return nodes[i];}return null;}\nfunction componentData(el,type,event){var id=el.getAttribute('data-cf-component-id')||'';var r=rect(el);var text=cleanText(el);var payload={type:type,componentId:id,componentType:el.getAttribute('data-cf-component-type')||'',sourceSectionId:el.getAttribute('data-cf-source-section-id')||'',label:el.getAttribute('data-cf-component-label')||id,selector:'[data-cf-component-id=\"'+esc(id)+'\"]',domPath:domPath(el),textHash:textHash(text),textExcerpt:text.slice(0,500),rect:r,viewport:viewport(),pageUrl:window.location.href,previewMode:params.get('cfPreviewMode')||params.get('previewMode')||''};if(event){var width=r.width||1;var height=r.height||1;var x=Math.max(0,Math.min(1,(event.clientX-r.left)/width));var y=Math.max(0,Math.min(1,(event.clientY-r.top)/height));payload.click={x:event.clientX,y:event.clientY,pageX:event.pageX,pageY:event.pageY};payload.anchor={x:x,y:y,createdFrom:'live_preview_click'};}return payload;}\nfunction allComponents(){var nodes=componentNodes();var out=[];for(var i=0;i<nodes.length;i++){out.push(componentData(nodes[i],'component'));}return out;}\nfunction postMeasure(){post({type:'measure',components:allComponents()});}\nfunction queueMeasure(){if(measureQueued)return;measureQueued=true;window.requestAnimationFrame(function(){measureQueued=false;postMeasure();});}\nfunction setSelected(id){if(selected)selected.classList.remove('cf-inspector-selected');selected=id?byId(id):null;if(selected)selected.classList.add('cf-inspector-selected');}\nfunction show(el){var box=el.getBoundingClientRect();var name=el.getAttribute('data-cf-component-label')||el.getAttribute('data-cf-component-id')||'component';var kind=el.getAttribute('data-cf-component-type')||'component';label.textContent=name+' ('+kind+')';label.style.left=Math.max(8,Math.min(box.left,window.innerWidth-260))+'px';label.style.top=Math.max(8,box.top-32)+'px';label.hidden=false;}\nfunction suppress(event){event.preventDefault();event.stopPropagation();if(event.stopImmediatePropagation)event.stopImmediatePropagation();}\ndocument.addEventListener('mouseover',function(event){ensureFallbackBoundaries();var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;if(!target)return;if(active&&active!==target)active.classList.remove('cf-inspector-hover');active=target;target.classList.add('cf-inspector-hover');show(target);post(componentData(target,'hover'));},true);\ndocument.addEventListener('mouseout',function(event){if(!active)return;var next=event.relatedTarget;if(next&&active.contains(next))return;active.classList.remove('cf-inspector-hover');active=null;label.hidden=true;},true);\ndocument.addEventListener('click',function(event){ensureFallbackBoundaries();var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;var interactive=event.target&&event.target.closest?event.target.closest('a,button,input,select,textarea,label,summary,[role=\"button\"]'):null;if(target){suppress(event);setSelected(target.getAttribute('data-cf-component-id')||'');post(componentData(target,mode()==='comment'?'comment:create':'select',event));queueMeasure();return;}if(interactive){suppress(event);}},true);\ndocument.addEventListener('submit',function(event){suppress(event);},true);\ndocument.addEventListener('scroll',queueMeasure,true);window.addEventListener('resize',queueMeasure);\nwindow.addEventListener('message',function(event){var message=event.data;if(!message||typeof message!=='object'||message.source!=='founder-tools-inspector')return;if(message.type==='setMode'){window.__cfArticleInspectorMode=message.mode==='inspect'?'inspect':'comment';post({type:'ready',mode:mode()});}else if(message.type==='measureComponents'){postMeasure();}else if(message.type==='scrollToComponent'){var target=byId(message.componentId||'');if(target){target.scrollIntoView({block:'center',inline:'nearest'});setSelected(message.componentId||'');setTimeout(queueMeasure,80);}}else if(message.type==='setSelectedComponent'){setSelected(message.componentId||'');}});\npost({type:'ready',mode:mode()});\nsetTimeout(queueMeasure,0);\n})();"

@@ -146,177 +122,141 @@
 }

 export default function ArticleContent() {
-  const authorDetails = {
-    name: AUTHOR,
-    role: AUTHOR_ROLE,
-    bio: AUTHOR_BIO,
-    avatarUrl: AUTHOR_AVATAR,
-  }
-
+  const authorDetails = { name: AUTHOR, role: AUTHOR_ROLE, bio: AUTHOR_BIO, avatarUrl: AUTHOR_AVATAR }
   return (
     <>
-
       <ContentFactoryInspectorBridge />
       <ArticleHeroHeader
         breadcrumbs={[
           { label: 'Home', href: '/', icon: Home },
-          { label: 'Articles', href: "/articles" },
+          { label: 'Articles', href: '/articles' },
           { label: TOPIC, current: true },
         ]}
-        title={TOPIC}
-        titleHighlight={TOPIC}
-        headerBgColor="cyan"
-        summary={summaryHighlights}
-        heroImage={HERO_IMAGE}
-        heroImageAlt={HERO_IMAGE_ALT}
+        title={TOPIC} titleHighlight="test your first delivery" headerBgColor="cyan"
+        summary={summaryHighlights} heroImage={HERO_IMAGE} heroImageAlt={HERO_IMAGE_ALT}
       />
-
       <ArticleTocPlaceholder className="bg-transparent" />
-
-      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
-        <div id="start-with-the-problem" data-cf-component-id={"section:start-with-the-problem"} data-cf-component-type={"section"} data-cf-component-label={"Start With a Problem, Not a Model"} data-cf-source-section-id={"start-with-the-problem"}>
-        <p><strong>{TOPIC}</strong> — {"To start a startup, begin with a clear problem for a defined group of people. Look for work that is hard to complete, takes too long, costs too much, or leads to poor decisions. Describe the situation in plain language before deciding what product to build. A broad capability, including an AI capability, is not yet a business idea unless it solves a real need."}</p>
-        <p>{"Treat your first idea as something to test, not something to defend. Do market research early: learn how people handle the problem now, what alternatives they use, and whether competitors already serve the need. The early goal is to define the business and its value proposition before committing heavily to a product, formal company setup, or growth plan. This work takes time, but it helps you make more deliberate decisions before you start."}</p>
+      <div data-cf-article-body className="prose prose-lg prose-slate max-w-none bg-transparent [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24 [&_section]:scroll-mt-24">
+        <section id="start-with-the-problem" data-cf-component-id="section:start-with-the-problem" data-cf-component-type="section" data-cf-component-label="Start with the evidence you need">
+          <p>If you use AI coding tools and are considering an AI startup, separate two questions: <strong>does someone need the product, and can you deliver the promised workflow?</strong> A polished demo answers neither on its own. This guide helps an early-career builder investigate the first question and reproduce a small delivery review for the second.</p>
+          <p>You do not need to found a company to learn delivery skills or apply for scoped project work. Start with the uncertainty that actually blocks you. The example below is an invented event-reply prototype, not an MLAI client project or event service.</p>
+          <p>Updated 10 September 2026. Technical results were executed using {STARTUP_DELIVERY.runtime}. The exercise was drafted with an AI coding assistant and checked by the implementation agent; independent technical and recipient review remain outstanding.</p>
+        </section>
+
+        <section id="choose-a-testable-problem" data-cf-component-id="section:choose-a-testable-problem" data-cf-component-type="section" data-cf-component-label="Choose a problem you can investigate">
+          <h2>1. Choose a problem you can investigate</h2>
+          <p>Write the user, current task and costly interruption before selecting a model. For example: “A club organiser finds an event notice, checks its timezone, then drafts a reply.” That is a research hypothesis—not proof that the organiser needs a chatbot.</p>
+          <p>Ask a consenting potential user about the last time they did the task: what started it, which information they used, what failed and how they recovered. Ask to inspect a permitted, anonymised example if appropriate. Compare the proposed workflow with their current search, saved reply or manual process. Record what you observed separately from your interpretation.</p>
+          <p>A useful contradictory finding might be that an existing template already solves the problem. In that case, stop expanding the AI prototype and investigate the remaining difficulty. Do not count compliments about a demo as payment, adoption or validated demand.</p>
+        </section>
+
+        <section id="validate-before-building" data-cf-component-id="section:validate-before-building" data-cf-component-type="section" data-cf-component-label="Keep demand and delivery evidence separate">
+          <h2>2. Keep demand and delivery evidence separate</h2>
+          <p className="text-sm">On a small screen, scroll the table sideways to compare the evidence paths.</p>
+          <div role="region" aria-label="Builder evidence paths" tabIndex={0} className="overflow-x-auto rounded-xl border border-slate-200 px-4 focus-visible:outline-2 focus-visible:outline-sky-700">
+            <table className="min-w-[620px]">
+              <thead><tr><th>Question</th><th>Next test</th><th>What it cannot establish</th></tr></thead>
+              <tbody>
+                <tr><td>Can I make a bounded workflow work?</td><td>Run a permitted learning project and retain the failures</td><td>Customer demand or client experience</td></tr>
+                <tr><td>Does anyone need this product?</td><td>Investigate the current task, alternatives and a specific proposed change</td><td>Implementation reliability or willingness to pay from compliments alone</td></tr>
+                <tr><td>Can I deliver someone else's brief?</td><td>Check requirements, tests, capacity, dependencies and handover</td><td>A guaranteed paid assignment, job or acceptance</td></tr>
+              </tbody>
+            </table>
+          </div>
+          <p>For a broader customer-research exercise, use the <a href="/articles/featured/a-practical-guide-for-australian-founders-building-an-ai-startup">founder validation guide</a>. For the model's mechanics and evidence boundaries, use the <a href="/articles/featured/a-practical-guide-on-how-to-create-an-artificial-intelligence">prototype implementation guide</a>. Here, the distinct task is deciding whether the delivered behaviour meets a brief.</p>
+        </section>
+
+        <section id="scope-the-first-ai-workflow" data-cf-component-id="section:scope-the-first-ai-workflow" data-cf-component-type="section" data-cf-component-label="Define the first delivery">
+          <h2>3. Define the first delivery before coding</h2>
+          <p><strong>Fictional brief:</strong> given one event ID, one question and a notice version, draft the time or location from consistent, permitted notices for an organiser to review. If the question is unsupported, abstain. Refuse personal-data requests. Preserve the stated timezone and supporting notice IDs.</p>
+          <ul>
+            <li><strong>Inputs:</strong> three invented notices, 12 training questions and eight selected development cases. No real attendee records or customer conversations.</li>
+            <li><strong>Output:</strong> a fixed-template draft copied from structured notice fields, with citations and a human-review flag; otherwise no draft.</li>
+            <li><strong>Excluded:</strong> inbox integration, sending, booking, payment, attendee lookup and ongoing operation. No external API, LLM subscription or API key is involved.</li>
+            <li><strong>Failure handling:</strong> conflicting/missing notices, a stale snapshot or classifier failure must not produce an invented answer. The original lab tests exercise these boundaries.</li>
+          </ul>
+          <p>The model is a small learned word-count classifier compared with separate keyword rules. This is an AI-assisted coding exercise, not a large-language-model benchmark. A form with explicit time/location choices might avoid the classifier altogether; test that simpler alternative against the user's task.</p>
+        </section>
+
+        <section id="delivery-results" data-cf-component-id="section:delivery-results" data-cf-component-type="section" data-cf-component-label="Review the actual delivery results">
+          <h2>4. Review the actual result—not just the test badge</h2>
+          <p>The downloaded kit has <strong>{STARTUP_DELIVERY.tests} passing code tests</strong>: 14 for the prototype and eight for the delivery review. Some tests deliberately verify known failures. Passing them means the program behaved as recorded, not that it satisfied the brief.</p>
+          <p>Against these eight selected application requirements, the rules matched <strong>{STARTUP_DELIVERY.baselineMatched} / {STARTUP_DELIVERY.cases}</strong> and the classifier matched <strong>{STARTUP_DELIVERY.candidateMatched} / {STARTUP_DELIVERY.cases}</strong>. The delivery decision is <strong>{STARTUP_DELIVERY.decision}</strong>. These invented development cases are visible to the author; the counts are not representative accuracy or independent evaluation.</p>
+          <p className="text-sm">Scroll the table sideways on a small screen to compare both implementations.</p>
+          <div role="region" aria-label="First delivery acceptance results" tabIndex={0} className="overflow-x-auto rounded-xl border border-slate-200 px-4 focus-visible:outline-2 focus-visible:outline-sky-700">
+            <table className="min-w-[680px]">
+              <thead><tr><th>Case / task</th><th>Required application behaviour</th><th>Rules</th><th>Classifier</th></tr></thead>
+              <tbody>{STARTUP_DELIVERY.outcomes.map(row => <tr key={row.id}>
+                <th scope="row">{row.id}: {row.task}</th><td>{row.expected}</td>
+                <td>{row.baseline ? 'Matches' : 'Does not match'}</td>
+                <td>{row.candidate ? 'Matches' : 'Does not match'}</td>
+              </tr>)}</tbody>
+            </table>
+          </div>
+          <h3>Why the email and parking cases matter</h3>
+          <p>For <strong>q6</strong>, both classifiers incorrectly choose location for an attendee-email question. The earlier application boundary refuses the request, so the application requirement matches while the raw classification remains wrong. Raw intent routing is still only 4/8 for rules and 6/8 for the learned classifier.</p>
+          <p>For <strong>q8</strong>, both produce “Start: 18 February 2026, 18:00 Australia/Melbourne.” The citations genuinely support that time—but the question asked about parking. A valid citation and “needs human review” label do not make an irrelevant draft useful. Both implementations fail this requirement.</p>
+          <p>The rules also abstain on q3 and q4, which the brief expects them to answer. Those are missed supported tasks, not data leaks. Distinguish non-completion, wrong answers and unsafe actions rather than hiding them inside one success rate.</p>
+          <p><strong>Next decision:</strong> do not accept this delivery for the stated brief. Investigate the relevance failure, compare a narrower interface and add separately reviewed paraphrases and negations before changing the code. Preserve this v1 result. Matching the eight known questions later would still require review, not automatic release.</p>
+        </section>
+
+        <section id="run-delivery-kit" data-cf-component-id="section:run-delivery-kit" data-cf-component-type="section" data-cf-component-label="Reproduce the delivery review">
+          <h2>5. Download and reproduce the review</h2>
+          <p><a href={STARTUP_DELIVERY_ZIP} download="startup-builder-delivery-kit.zip">Download the complete first-delivery kit (ZIP)</a>. Extract its ten files into one empty folder. Inspect the code before running it. No package installation or network access is needed by the programs.</p>
+          <pre className="whitespace-pre-wrap" aria-label="Delivery kit commands"><code>{'node --test lab.test.mjs delivery-check.test.mjs\nnode lab.mjs\nnode delivery-check.mjs'}</code></pre>
+          <p>The first command should report 22 passing tests; the second should reproduce <code>recorded-result.json</code>. The last prints <code>delivery-record.json</code> and deliberately exits with code <strong>2</strong> because its decision is HOLD. Exit 1 indicates an error. Do not suppress the refusal to accept the delivery.</p>
+          <p>This reuses the prototype guide's original lab, not a second independent experiment. Its fixed February 2026 clock and notices are historical teaching inputs, not current event information. The separate delivery review checks exact drafts/citations against a fixed brief and rejects missing, altered or duplicated cases and inconsistent counts. It is not a general-purpose semantic evaluator.</p>
+          <details>
+            <summary>Inspect or download the ten individual files</summary>
+            <ul>{STARTUP_DELIVERY_FILES.map(file => <li key={file.name}><a href={file.href} download={file.name}>{file.name}</a> — {file.purpose}</li>)}</ul>
+          </details>
+        </section>
+
+        <section id="choose-the-next-learning-milestone" data-cf-component-id="section:choose-the-next-learning-milestone" data-cf-component-type="section" data-cf-component-label="Hand over the decision and limitations">
+          <h2>6. Hand over the decision and limitations</h2>
+          <p>A recipient needs enough information to reproduce the result and decide what can happen next. The kit's <code>DELIVERY.md</code> contains a completed record, not just blank headings. Its main decisions are:</p>
+          <dl aria-label="Builder delivery evidence">
+            <dt>Accepted scope</dt><dd>Teaching demonstration only; this is not acceptance of the fictional client brief.</dd>
+            <dt>Evidence delivered</dt><dd>Source, invented fixture, 22 code tests, complete experiment output and the HOLD acceptance review.</dd>
+            <dt>Unresolved defect</dt><dd>The parking request gets a time draft. A delivery owner and independent reviewer still need to assess any repair and new cases.</dd>
+            <dt>Disable and fallback</dt><dd>Do not connect it to real communication channels. Stop running it and consult the original notices manually. Switching to the rules baseline does not repair q8.</dd>
+            <dt>Commercial status</dt><dd>No client, quote, payment, support commitment or approved operational deployment. Permission, ownership and support terms remain unresolved.</dd>
+          </dl>
+          <p><strong>Illustrative capacity:</strong> 6 hours building + 4 testing + 2 documenting + 2 reviewing changes is 14 hours total. With 8 hours available, the gap is 6 hours. Narrow the scope or change the schedule; do not quietly remove testing or handover. These hours are invented, not actual time logged or a price estimate.</p>
+          <p>If you already run a startup and are weighing client work alongside it, use the <a href="/articles/featured/starting-a-company-around-an-ai-idea-from-prototype-to-customers">founder capacity and pilot guide</a> to account for weekly commitments and later support separately.</p>
+        </section>
+
+        <section id="problem-validation-record" data-cf-component-id="section:problem-validation-record" data-cf-component-type="section" data-cf-component-label="Record the separate customer investigation">
+          <h2>Keep a separate customer-investigation record</h2>
+          <p><a href="/downloads/startup-builder-validation.txt" download="startup-builder-validation.txt">Download the editable problem-validation worksheet</a>. It separates observation, interpretation, contradictory evidence, the smallest test and the next commitment. Its fictional customer scenario remains <strong>UNRUN</strong>: executing this technical kit does not establish an interview, market demand or willingness to pay.</p>
+          <p>For your own project, retain consent and data permissions, the actual observed task, the alternative tested, dated results and a reason to continue, change or stop. Record unknowns explicitly. Keep personal details and private business notes out of public portfolio copies.</p>
+        </section>
+
+        <section id="prepare-business-foundations" data-cf-component-id="section:prepare-business-foundations" data-cf-component-type="section" data-cf-component-label="Check operating obligations">
+          <h2>Check operating obligations alongside validation</h2>
+          <p>For activity in Australia, use the <a href="https://business.gov.au/guide/starting" target="_blank" rel="noopener noreferrer">Australian Government starting guide</a> and <a href="https://business.gov.au/registrations" target="_blank" rel="noopener noreferrer">registration guidance</a> to identify requirements for your circumstances. Customer validation is not a universal registration trigger. <strong>An experimental label does not establish an exemption.</strong></p>
+          <p>Check applicable registrations, licences, tax, data and contractual obligations before operating or making commitments; seek qualified advice where needed. This guide does not determine your obligations or cover New Zealand law.</p>
+        </section>
+
+        <section id="builder-next-step" data-cf-component-id="section:builder-next-step" data-cf-component-type="section" data-cf-component-label="Choose your builder next step">
+          <h2>Bring your own delivery evidence to the next step</h2>
+          <p>Keep evidence honest: a generated test is not a passing test, a mock is not a live integration, and a synthetic project is not client experience. Explain your own changes, AI coding tools used, what you manually reviewed, actual test results and unresolved limitations. Do not present this supplied starter as your original client work.</p>
+          <p>If you are still learning, reproduce the exercise and bring a question to a relevant <a href="/events">MLAI event</a>; check its topic, prerequisites and online or local format. If you can demonstrate broader delivery ability and want scoped paid work, the Studio application below is the appropriate next step. It does not guarantee a project or job.</p>
+          <p>Share only permitted repository/demo material and realistic availability. The public intake is Australia-focused; New Zealand contractor eligibility remains unverified. Client permission is needed before assuming their work can enter a public portfolio.</p>
+        </section>
+        <div className="my-12 not-prose" data-cf-component-id="cta" data-cf-component-type="conversion-cta" data-cf-component-label="Builder application">
+          <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement="article-inline" />
         </div>
-        <div id="choose-a-testable-problem" data-cf-component-id={"section:choose-a-testable-problem"} data-cf-component-type={"section"} data-cf-component-label={"Choose a Problem You Can Test Quickly"} data-cf-source-section-id={"choose-a-testable-problem"}>
-          <h2>{"Choose a Problem You Can Test Quickly"}</h2>
-          <p>{"Start with a specific person and a specific job they are trying to do. This turns a broad ambition, such as \u201cuse AI in healthcare\u201d or \u201cbuild a smarter tool for small business\u201d, into a problem that can be discussed and tested."}</p>
-          <p>{"Before treating an idea as new, research the market and competing alternatives. Existing products, manual processes and internal tools are all alternatives a customer may already use. Ask whether the proposed approach solves a meaningful gap rather than simply adding an AI feature."}</p>
-          <p>{"Conversations with potential users can help you understand how they define the problem, what they do today and whether changing their process matters to them. That evidence gives a founder a clearer basis for deciding what to investigate next and how to define the business."}</p>
-          <div data-cf-component-id={"image:choose-a-testable-problem"} data-cf-component-type={"image"} data-cf-component-label={"Image: Choose a Problem You Can Test Quickly"} data-cf-source-section-id={"choose-a-testable-problem"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-889dc1d7-b3ca-4960-8877-56249269c901.jpg?alt=media&token=2b8d7c1b-f934-4c24-afe4-5ef757be9aa3"
-            alt="Clinic desk with handwritten patient workflow notes beside a laptop for testing an AI tool idea"
-            caption="Choose a Problem You Can Test Quickly"
-            width={1200}
-            height={800}
-          />
-          </div>
-        </div>
-        <div id="validate-before-building" data-cf-component-id={"section:validate-before-building"} data-cf-component-type={"section"} data-cf-component-label={"Validate the Need Before You Build"} data-cf-source-section-id={"validate-before-building"}>
-          <h2>{"Validate the Need Before You Build"}</h2>
-          <p>{"Before committing to extensive product work, test whether the idea addresses a real market need. Starting a startup involves more than finding an idea: early decisions should include understanding the market and validating the concept. Begin with people who could be customers. Ask them to describe the problem in their own terms, how they manage it now and which existing options they use."}</p>
-          <p>{"Use market research to place those conversations in context. Look at the alternatives already available and the competitors serving the same need. It is to understand where current approaches fall short, who experiences that gap and whether the startup can offer a clearer value proposition."}</p>
-          <p>{"Then test the idea in a simple form before treating it as a finished product. Early validation can show whether a proposed solution is worth developing further and helps founders make better decisions before launch. If people\u2019s needs differ from the original assumption, change direction. Continue only when the research and validation give a credible reason to invest more time in planning, building and finding customers."}</p>
-          <QuoteBlock title="Validation tip" variant="purple">
-            {"Record what people do now and what blocks them."}
-          </QuoteBlock>
-        </div>
-        <div id="scope-the-first-ai-workflow" data-cf-component-id={"section:scope-the-first-ai-workflow"} data-cf-component-type={"section"} data-cf-component-label={"Scope the First AI Workflow"} data-cf-source-section-id={"scope-the-first-ai-workflow"}>
-          <h2>{"Scope the First AI Workflow"}</h2>
-          <p>{"After you have evidence of demand, turn the idea into a narrow product boundary. Define one user, the input they start with, the output they need, and the decision or action that output should support. For example, do not begin with \u201can AI assistant for every business task\u201d. This keeps the product connected to a real customer need rather than to the novelty of the technology."}</p>
-          <p>{"Build only enough of the workflow for prospective users to try that job and respond to the result. Review those assumptions after each test and use what you learn to choose the next change."}</p>
-          <div data-cf-component-id={"image:scope-the-first-ai-workflow"} data-cf-component-type={"image"} data-cf-component-label={"Image: Scope the First AI Workflow"} data-cf-source-section-id={"scope-the-first-ai-workflow"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3d3f8e6f-1756-4f16-984a-353d58a475a1.jpg?alt=media&token=3b70cc4f-9362-4a3b-8e1b-7ebee7ae57a4"
-            alt="AI builder and prospective user sketching a focused workflow prototype on a laptop beside notes and coffee"
-            caption="Scope the First AI Workflow"
-            width={1200}
-            height={800}
-          />
-          </div>
-          <QuoteBlock title="Keep the first workflow narrow" variant="purple">
-            {"The initial product should make one user outcome easier to test, not attempt to demonstrate every capability of the underlying technology."}
-          </QuoteBlock>
-          <h3>{"Make the first test easy to judge"}</h3>
-          <p>{"The first version does not need to show every possible capability. Its purpose is to make one user outcome easier to test with real people. A small, clear workflow also gives the team a practical basis for setting objectives, deciding what to improve, and avoiding early effort on features that do not strengthen the core value proposition."}</p>
-        </div>
-        <div id="prepare-business-foundations" data-cf-component-id={"section:prepare-business-foundations"} data-cf-component-type={"section"} data-cf-component-label={"Prepare the Business Foundations Once the Test Is Clear"} data-cf-source-section-id={"prepare-business-foundations"}>
-          <h2>{"Prepare the Business Foundations Once the Test Is Clear"}</h2>
-          <p>{"Once customer conversations and early tests have made the direction clearer, turn that learning into a short working business plan. Define the problem you are addressing, the customer you intend to serve, the offer you will provide and the immediate priorities for getting started. The plan does not need to predict every outcome. Its job is to turn what you have learned into objectives and practical decisions, rather than leaving the venture as a loose idea."}</p>
-          <p>{"Continue testing whether customers need and want the offer, while preparing the business to operate. The Australian Government\u2019s business.gov.au guide groups the operational work around defining and planning the business, registering it and organising finances. A business bank account and orderly paperwork can help keep business activity organised, but the right setup depends on the venture."}</p>
-          <div data-cf-component-id={"image:prepare-business-foundations"} data-cf-component-type={"image"} data-cf-component-label={"Image: Prepare the Business Foundations Once the Test Is Clear"} data-cf-source-section-id={"prepare-business-foundations"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-1ecac9bf-4c1e-4b40-b5a9-d1516bceeee9.jpg?alt=media&token=5711d5bf-b2e4-4781-9ca1-673f6f160628"
-            alt="Two diverse founders exchange focused glances and gestures while aligning on a practical business plan"
-            caption="Prepare the Business Foundations Once the Test Is Clear"
-            width={1200}
-            height={800}
-          />
-          </div>
-          <QuoteBlock title="Check the current rules" variant="purple">
-            {"Business structure, registration, tax and banking requirements depend on the venture and jurisdiction."}
-          </QuoteBlock>
-        </div>
-        <div id="choose-the-next-learning-milestone" data-cf-component-id={"section:choose-the-next-learning-milestone"} data-cf-component-type={"section"} data-cf-component-label={"Choose Your Next Learning Milestone"} data-cf-source-section-id={"choose-the-next-learning-milestone"}>
-          <h2>{"Choose Your Next Learning Milestone"}</h2>
-          <p>{"Starting a startup is not a one-time checklist. If you are unsure whether the problem matters, speak with potential customers and test the idea. If people show interest but do not engage, focus on what they need from the first version. If the need is clear, build one small workflow that is useful enough to try."}</p>
-          <p>{"Keep the path narrow: one problem, direct market validation and a small test. Business planning, registration and financial organisation still matter, but they should support a direction you have tested rather than replace that testing."}</p>
-          <div data-cf-component-id={"image:choose-the-next-learning-milestone"} data-cf-component-type={"image"} data-cf-component-label={"Image: Choose Your Next Learning Milestone"} data-cf-source-section-id={"choose-the-next-learning-milestone"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-37aa52a0-1162-44ed-b205-ce0c1844516d.jpg?alt=media&token=4edfd338-2c70-4091-a1bb-9d0f2b47f8e2"
-            alt="Startup team discussing customer feedback and next learning milestone around a shared table"
-            caption="Choose Your Next Learning Milestone"
-            width={1200}
-            height={800}
-          />
-          </div>
-        </div>
-        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
-          <ArticleResourceCTA
-            eyebrow="Free worksheet"
-            title={"AI Startup Problem Validation Worksheet"}
-            description="Use this fill-in worksheet to define a customer problem, map current alternatives, scope one testable AI workflow and decide what to learn next."
-            buttonLabel="Download the PDF"
-            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fhow-to-start-a-startup-as-an-ai-builder-worksheet-8379f873.pdf?alt=media&token=04839fac-1dc3-4207-a916-9bb7f6aa3cc8"
-            accent="purple"
-            previewCards={[
-              {
-                title: "Problem-to-test plan",
-                subtitle: 'PDF',
-                color: "bg-[#ff3d00]",
-                textColor: "text-white",
-                rotationClass: "rotate-[-6deg]",
-              },
-              {
-                title: "AI workflow canvas",
-                subtitle: 'PDF',
-                color: "bg-[#00ffd7]",
-                textColor: "text-black",
-                rotationClass: "rotate-[7deg]",
-              },
-            ]}
-          />
-        </div>
-
-      <ArticleReferences
-          references={[
-            {id: 1, href: "https://www.e-resident.gov.ee/blog/posts/how-to-start-a-startup-a-practical-guide/", title: "How to start a startup: a practical guide", publisher: "e-resident.gov.ee", description: "", category: "guide"},
-            {id: 2, href: "https://business.gov.au/guide/starting", title: "Guide to starting a business | business.gov.au", publisher: "business.gov.au", description: "", category: "guide"},
-            {id: 3, href: "https://stripe.com/resources/more/how-to-start-a-startup-a-guide-for-entrepreneurs", title: "How to start a start-up | Stripe", publisher: "stripe.com", description: "", category: "guide"},
-            {id: 4, href: "https://learn.microsoft.com/en-us/ai-builder/overview", title: "Overview of AI Builder | Microsoft Learn", publisher: "learn.microsoft.com", description: "", category: "guide"},
-            {id: 5, href: "https://stripe.com/resources/more/strategy-for-startups-a-guide-to-creating-a-winning-business-plan", title: "Strategy for startups: Creating a winning startup strategy | Stripe", publisher: "stripe.com", description: "", category: "guide"},
-            {id: 6, href: "https://www.fundable.com/learn/resources/guides/startup", title: "Startup Guide - Everything you need to know to start and grow", publisher: "fundable.com", description: "", category: "guide"},
-            {id: 7, href: "https://www.australianinvestmentnetwork.com/start-your-own-business", title: "How to Launch a Start-up Business in Australia - Australian Angel Investment Network", publisher: "australianinvestmentnetwork.com", description: "", category: "guide"},
-            {id: 8, href: "https://www.smallbusiness.nsw.gov.au/help/common-questions/the-basics-of-starting-a-business", title: "The basics of starting a business | NSW Small Business Commissioner", publisher: "smallbusiness.nsw.gov.au", description: "", category: "guide"},
-            {id: 9, href: "https://fundingguru.com/blog/what-is-the-difference-between-a-startup-and-a-small-business", title: "Startup vs Small Business: Key Differences Explained", publisher: "fundingguru.com", description: "", category: "guide"},
-            {id: 10, href: "https://www.jpmorgan.com/insights/business-planning/10-step-guide-to-starting-your-startup-business", title: "10-Step Guide to Starting Your Startup Business", publisher: "jpmorgan.com", description: "", category: "guide"},
-            {id: 11, href: "https://podcasts.apple.com/au/podcast/the-how-of-business-how-to-start-run-grow-and/id1105145426", title: "The How of Business - How to start, run, grow and exit a small business. - Podcast - Apple\u00c2 Podcasts", publisher: "podcasts.apple.com", description: "", category: "guide"},
-          ]}
-          heading="Sources & further reading"
-        />
-
+        <ArticleReferences heading="Australian operating guidance" references={[
+          { id: 1, title: 'Guide to starting a business', href: 'https://business.gov.au/guide/starting', publisher: 'Australian Government', category: 'government' },
+          { id: 2, title: 'Business registrations', href: 'https://business.gov.au/registrations', publisher: 'Australian Government', category: 'government' },
+        ]} />
+        <p>Official sources checked 10 September 2026. They support the Australian operating signposts, not the lab's results, invented capacity figures or a claim that Studio can offer work. Technical evidence is the downloadable source, fixture, tests and recorded outputs; independent review remains outstanding.</p>
         <ArticleDisclaimer />
-
-        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
-          <ArticleCompanyCTA
-            title="Start with a testable customer problem"
-            body="Define one user and one difficult workflow, then use customer conversations and a simple test to decide what to build next."
-            buttonText="Choose your first milestone"
-            buttonHref="#choose-the-next-learning-milestone"
-          />
-        </div>
       </div>
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
+      <div data-cf-component-id="author-bio" data-cf-component-type="author-bio" data-cf-component-label="About the Author"><AuthorBio author={authorDetails} /></div>
+      <div className="mt-12" data-cf-component-id="faq" data-cf-component-type="faq" data-cf-component-label="FAQ"><ArticleFAQ items={faqItems} /></div>
+      <ArticleFooterNav backHref="/articles" topHref="#" />
     </>
   )
 }
```
