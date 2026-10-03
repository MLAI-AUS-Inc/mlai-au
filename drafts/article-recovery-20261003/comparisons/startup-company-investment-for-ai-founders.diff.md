# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/startup-company-investment-for-ai-founders.tsx
+++ unreviewed-local-draft/app/articles/content/featured/startup-company-investment-for-ai-founders.tsx
@@ -3,7 +3,9 @@
 import { Home } from 'lucide-react'
 import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '../../authors'
 import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
+import ArticleConversionCTA from '~/components/articles/ArticleConversionCTA'
+import { BASE_ARTICLE_SEO_CONFIG } from '~/articles/seo-config'
+import { Link } from 'react-router'
 import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
 import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
 import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
@@ -18,8 +20,9 @@
 const TOPIC = "Startup Company Investment for AI Founders"
 export const CATEGORY = "featured"
 export const SLUG = "startup-company-investment-for-ai-founders"
-export const DATE_PUBLISHED = "2026-07-18"
-export const DATE_MODIFIED = '2026-09-15'
+// Preserve the public registry date introduced in bea8cc4, not the draft-preview date.
+export const DATE_PUBLISHED = "2026-07-27"
+export const DATE_MODIFIED = "2026-09-09"
 export const DESCRIPTION = "Startup company investment essentials for AI founders: set a clear milestone, plan runway and build an evidence-based funding case."
 const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-09abd229-0994-46d7-b58b-0902fa9b4ef6.jpg?alt=media&token=9252f992-53cf-46c0-bf32-bb025bb61176"
 const HERO_IMAGE_ALT = "AI founders reviewing runway plans and funding milestones with an investor at a shared table"
@@ -73,19 +76,19 @@
 }

 export const faqItems: FAQ[] = [
-  { id: 1, question: "Is early user interest enough for an AI founder to raise capital?", answer: "No. A working product and early user interest can make fundraising timely, but founders still need to explain why capital is needed now and what specific milestone it will achieve." },
-  { id: 2, question: "When should an AI startup bootstrap rather than fundraise?", answer: "Bootstrapping may be the better move when external capital would not clearly shorten the path to the next milestone beyond what current revenue, savings, grants, or a leaner plan can achieve." },
-  { id: 3, question: "How much runway should an early AI startup plan for?", answer: "There is no universal runway target. Model the dated costs and receipts needed for a specific milestone, including delays and obligations. Separate confirmed cash from uncertain future funding, and obtain qualified advice for consequential financing decisions." },
-  { id: 4, question: "What evidence do investors need beyond an AI claim?", answer: "Investors need evidence of a defined customer problem, real-world application, differentiated business value, and existing progress such as a working product, early user interest, or user feedback." },
+  { id: 1, question: "Is early user interest enough for an AI founder to raise capital?", answer: "Interest alone does not establish funding suitability or availability. Record the evidence, explain the proposed work and investigate the costs and terms rather than treating enthusiasm as a funding decision." },
+  { id: 2, question: "When should an AI startup bootstrap rather than fundraise?", answer: "Compare feasible options and their consequences for the milestone, obligations and timing. This guide does not choose a financing path for you; do not assume grants, borrowing or personal funds are available or appropriate." },
+  { id: 3, question: "How much runway should an early AI startup plan for?", answer: "No universal duration is established here. Model the work, payment dates, uncertain receipts and delays for your milestone. A historical fundraising rule of thumb is not a current recommendation for every Australian AI startup." },
+  { id: 4, question: "What evidence do investors need beyond an AI claim?", answer: "Prepare dated evidence for your actual claims and keep planned work separate. Requirements differ by investor; this article is not an investor checklist or an assurance of investability." },
 ]

 export const summaryHighlights = {
   heading: "Key facts: Startup Company Investment for AI Founders",
   intro: "Startup company investment essentials for AI founders: set a clear milestone, plan runway and build an evidence-based funding case.",
   items: [
-    { label: "Can you invest in startup companies?", description: "Startup company investment is most useful when capital has a clear job, such as reaching stronger product validation, early customer adoption, or evidence that the business can scale." },
-    { label: "What's a good startup company to invest in?", description: "A stronger startup case combines a defined customer problem, a real-world use case, differentiated value, and evidence such as a working product or early user interest." },
-    { label: "What is a good startup company to invest in?", description: "A credible AI startup connects its funding request to a specific proof point and explains how its product can scale, sustain its position, and remain distinct in a crowded market." },
+    { label: "What would the capital help test?", description: "Name the milestone and separate existing evidence from planned work." },
+    { label: "What does the plan cost?", description: "Track payment dates, assumptions and a delayed scenario rather than using a universal runway target." },
+    { label: "What remains unresolved?", description: "Prepare questions about costs, evidence and terms; this guide does not assess investment suitability." },
   ],
 }

@@ -103,30 +106,7 @@
   featuredFocus: FEATURED_FOCUS,
 }

-const faqSchemaItems = [
-  { question: "Can you invest in startup companies?", answer: "Startup company investment is most useful when capital has a clear job, such as reaching stronger product validation, early customer adoption, or evidence that the business can scale." },
-  { question: "What's a good startup company to invest in?", answer: "A stronger startup case combines a defined customer problem, a real-world use case, differentiated value, and evidence such as a working product or early user interest." },
-  { question: "What is a good startup company to invest in?", answer: "A credible AI startup connects its funding request to a specific proof point and explains how its product can scale, sustain its position, and remain distinct in a crowded market." },
-  { question: "Is early user interest enough for an AI founder to raise capital?", answer: "No. A working product and early user interest can make fundraising timely, but founders still need to explain why capital is needed now and what specific milestone it will achieve." },
-  { question: "When should an AI startup bootstrap rather than fundraise?", answer: "Bootstrapping may be the better move when external capital would not clearly shorten the path to the next milestone beyond what current revenue, savings, grants, or a leaner plan can achieve." },
-  { question: "How much runway should an early AI startup plan for?", answer: "There is no universal runway target. Model the dated costs and receipts needed for a specific milestone, including delays and obligations. Separate confirmed cash from uncertain future funding, and obtain qualified advice for consequential financing decisions." },
-  { question: "What evidence do investors need beyond an AI claim?", answer: "Investors need evidence of a defined customer problem, real-world application, differentiated business value, and existing progress such as a working product, early user interest, or user feedback." },
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

@@ -155,7 +135,6 @@

   return (
     <>
-
       <ContentFactoryInspectorBridge />
       <ArticleHeroHeader
         breadcrumbs={[
@@ -176,12 +155,12 @@
       <div className="prose prose-lg prose-slate max-w-none bg-transparent">
         <div id="why-ai-founders-need-a-pre-raise-case" data-cf-component-id={"section:why-ai-founders-need-a-pre-raise-case"} data-cf-component-type={"section"} data-cf-component-label={"Startup Company Investment Starts With a Clear Case"} data-cf-source-section-id={"why-ai-founders-need-a-pre-raise-case"}>
         <p><strong>{TOPIC}</strong> — {"Startup company investment is most useful when the capital has a clear job: helping the business reach its next meaningful milestone. For an AI founder, that might mean moving from early validation to a more structured stage of growth. A working product and interest from early users can make fundraising timely, but they do not by themselves explain why the company needs to raise now."}</p>
-        <p>{"Interest in AI is strong, yet the market is becoming more crowded and investors are increasingly selective. They need to see more than an AI label or a promising idea. A clear case connects the funding request to a differentiated, real-world business and the progress the company expects to make with the capital. Raising should support that progress, not act as validation for an untested idea."}</p>
+        <p>This guide helps you prepare a funding discussion; it does not measure current investor appetite or decide whether raising is suitable. Separate what your company has demonstrated from what new capital might let it investigate. A compelling story does not establish customer demand.</p>
         </div>
         <div id="decide-whether-to-raise-now" data-cf-component-id={"section:decide-whether-to-raise-now"} data-cf-component-type={"section"} data-cf-component-label={"Decide Whether Raising Is the Right Next Move"} data-cf-source-section-id={"decide-whether-to-raise-now"}>
           <h2>{"Decide Whether Raising Is the Right Next Move"}</h2>
-          <p>{"Start with the immediate constraint: what cannot be achieved with current revenue, savings, grants, or a leaner plan? Then name the next milestone that capital would help reach, such as moving from early validation into a more scalable product or market effort. If the money would not clearly shorten the path to that milestone, bootstrapping may be the better next move."}</p>
-          <p>{"A strong reason to raise connects capital to a credible business need and a clear use of funds. Investor attention for AI can create urgency, but the AI label alone is not a funding case. In a crowded market, investors are becoming more selective and look for real-world application and differentiation. Founders should be able to explain why the company needs capital now, what it will unlock, and why that work matters to customers."}</p>
+          <p>Name the immediate constraint and compare feasible alternatives, including a smaller scope or delaying the project. Do not assume grants, personal savings or borrowing are available or appropriate. Record the consequences and unresolved questions for each option rather than applying a rule that one financing path is always better.</p>
+          <p>Write a testable explanation: “We propose to spend [amount, based on dated costs] on [work] to investigate [specific milestone], with [decision criteria].” Keep the amount conditional until costs, obligations and timing have been checked. Choosing a funding instrument or offering terms needs advice appropriate to your circumstances.</p>
           <div data-cf-component-id={"image:decide-whether-to-raise-now"} data-cf-component-type={"image"} data-cf-component-label={"Image: Decide Whether Raising Is the Right Next Move"} data-cf-source-section-id={"decide-whether-to-raise-now"}>
           <ArticleImageBlock
             src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f29b6ced-51f3-4da5-944d-1fea309adf5e.jpg?alt=media&token=40a5d8ae-6a0f-4cfd-a1c2-059bb2d181a7"
@@ -198,7 +177,17 @@
         <div id="set-the-round-milestone-and-budget" data-cf-component-id={"section:set-the-round-milestone-and-budget"} data-cf-component-type={"section"} data-cf-component-label={"Define the Milestone Your Round Must Buy"} data-cf-source-section-id={"set-the-round-milestone-and-budget"}>
           <h2>{"Define the Milestone Your Round Must Buy"}</h2>
           <p>{"For an early AI company, that proof point might be moving from early validation to a product that can reach more users or showing clearer market demand."}</p>
-          <p>{"Build a dated cash plan from the work needed to reach a defined milestone. Include applicable team, product, customer research, tax and financing costs, payment dates and a delayed scenario. Keep uncertain receipts separate from available cash. A gap in that plan does not, by itself, establish how much to raise or whether the milestone is worth pursuing."}</p>
+          <p>Build a dated cash plan from the actual work and obligations, including team, delivery, infrastructure and other applicable costs. Separate confirmed receipts from uncertain ones. Test delays instead of adding an unexplained buffer.</p>
+          <p><strong>Runway clarification, 9 September 2026:</strong> the previous article presented 12 to 18 months as a general planning recommendation. Geoff Ralston's <a href="https://www.ycombinator.com/blog/how-to-raise-a-seed-round">January 2016 YC seed-fundraising guide</a> describes that interval in a historical venture context. It is not evidence of the appropriate duration, raise amount or financing terms for an Australian AI startup today.</p>
+          <p>The Australian Government's <a href="https://business.gov.au/finance/funding/pitch-for-venture-capital">venture-capital preparation guide</a> asks founders to explain the capital required, its use and expected achievement. Use these as preparation questions, not a guarantee that funding is suitable or available. Both sources were checked on 9 September 2026.</p>
+          <h3>Stress-test one milestone budget</h3>
+          <p><strong>Fictional teaching scenario, AUD—not a recommended raise:</strong> a team has $30,000 available after accounting for its other obligations. It estimates a three-month test at $12,000 per month, plus $6,000 of setup costs. No revenue or new investment is assumed. This simplified example omits tax, financing costs and other obligations; a real plan must include everything applicable.</p>
+          <table><thead><tr><th>Scenario</th><th>Illustrative cash needed</th><th>Gap against $30,000</th></tr></thead><tbody>
+            <tr><td>Three months as planned</td><td>3 × $12,000 + $6,000 = $42,000</td><td>$12,000</td></tr>
+            <tr><td>Two extra months at the same cost</td><td>5 × $12,000 + $6,000 = $66,000</td><td>$36,000</td></tr>
+          </tbody></table>
+          <p>The delay adds $24,000 under these assumptions. Neither gap is automatically the amount to raise: the example does not price financing, show payment dates within each month, or establish that the milestone is worth pursuing. Revise the scope and verify obligations with appropriate advisers before committing; an expected future investment is not cash in hand.</p>
+          <p>Attach a testable outcome to the budget—for example, a permission-cleared pilot with specified acceptance criteria and a recorded stop decision if they are not met. Completing a budget period is not itself evidence of customer demand.</p>
           <div data-cf-component-id={"image:set-the-round-milestone-and-budget"} data-cf-component-type={"image"} data-cf-component-label={"Image: Define the Milestone Your Round Must Buy"} data-cf-source-section-id={"set-the-round-milestone-and-budget"}>
           <ArticleImageBlock
             src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3df2d06f-a75f-4673-a8af-3c3a37310e9f.jpg?alt=media&token=7fd591e8-3b0c-4c6d-839f-d5d990f24dcd"
@@ -212,20 +201,27 @@
             {"The amount is not the strategy; the evidence of what the money will achieve is the strategy."}
           </QuoteBlock>
           <h3>{"Make the milestone testable"}</h3>
-          <p>{"If a cost does not help the company build, test, or take the product to market, question whether it belongs in this round. The amount is not the strategy; the evidence of what the money will achieve is the strategy."}</p>
-        </div>
-        <div id="make-the-ai-business-case-investable" data-cf-component-id={"section:make-the-ai-business-case-investable"} data-cf-component-type={"section"} data-cf-component-label={"Make the AI Business Case Investable"} data-cf-source-section-id={"make-the-ai-business-case-investable"}>
-          <h2>{"Make the AI Business Case Investable"}</h2>
-          <p>{"Investors need to see more than an AI capability. Frame AI as the way your company delivers value, not as the whole proposition. Start with a defined customer problem and a real-world use case. This makes the business case easier to assess than a broad claim that the product is \u201cAI-powered.\u201d"}</p>
-          <p>{"A crowded AI market also makes differentiation central to a startup company investment conversation. Be clear about why this solution can stand out, rather than assuming access to AI tools is enough. Investors will consider whether the company can scale, sustain its position, and remain distinct as similar products enter the market. Connect your product, customer use case, and business value in one simple story. That gives the AI a practical role in a business that can grow."}</p>
+          <p>Keep required costs visible even when they do not directly build a product: compliance, security, support and existing commitments can still matter. A milestone budget is not permission to omit inconvenient obligations.</p>
+        </div>
+        <div id="make-the-ai-business-case-investable" data-cf-component-id={"section:make-the-ai-business-case-investable"} data-cf-component-type={"section"} data-cf-component-label={"Make the AI Business Case Checkable"} data-cf-source-section-id={"make-the-ai-business-case-investable"}>
+          <h2>{"Make the AI Business Case Checkable"}</h2>
+          <p>Describe the customer task, current alternative and proposed change. Identify what the AI does, what a person must check, and the failure cases that would make the change unacceptable. Access to a model is not evidence that this workflow has improved.</p>
+          <p>For a comparison with alternatives, use dated observations and explicit criteria: setup effort, permitted data access, exceptions, operating cost and handover. Label untested advantages as hypotheses. This article does not establish a competitive moat or a market-wide investment trend.</p>
           <QuoteBlock title="" variant="purple">
             {"A generic AI solution is harder to defend than a clear solution to a defined customer problem."}
           </QuoteBlock>
         </div>
         <div id="prepare-investor-testable-evidence" data-cf-component-id={"section:prepare-investor-testable-evidence"} data-cf-component-type={"section"} data-cf-component-label={"Prepare Evidence Investors Can Test"} data-cf-source-section-id={"prepare-investor-testable-evidence"}>
           <h2>{"Prepare Evidence Investors Can Test"}</h2>
-          <p>{"Build the funding story around evidence that already exists. This might include a working product, early user interest, or clear feedback from real-world use. For an AI startup, explain the application and business value rather than presenting AI as the product by itself. Investors need a clear reason the company can stand out in a crowded market."}</p>
-          <p>{"Next, connect the capital request to one specific milestone. Explain what the funding will help the company prove, such as moving from early validation toward a more structured stage of growth. A large market can provide context, but it does not prove investability on its own."}</p>
+          <p><strong>Fictional example, not MLAI research:</strong> a team has twelve discovery interviews, two organisations that agreed to a pilot, and no paying customers.</p>
+          <table><thead><tr><th>Record</th><th>Defensible statement</th><th>Not established</th></tr></thead><tbody>
+            <tr><td>Twelve interviews</td><td>We discussed the workflow with twelve people; retain the questions and responses.</td><td>Population-wide demand or willingness to pay</td></tr>
+            <tr><td>Two pilot agreements</td><td>Two organisations agreed to the specified trial, subject to its terms.</td><td>Two paying customers, successful delivery or renewal</td></tr>
+            <tr><td>No paying customers</td><td>We have not demonstrated paid adoption.</td><td>Revenue, retention or proven unit economics</td></tr>
+          </tbody></table>
+          <p>Describe what the pilot must test and how permission, acceptance and failures will be recorded. Do not rename pilot interest as sales to make a funding update stronger.</p>
+          <p>Use a claim-to-evidence table instead of turning every sign of interest into traction. A conversation, a trial agreement, an active user and a paid renewal describe different events. Preserve dates, sample limits and permission to share.</p>
+          <p>For each planned milestone, specify what result would change the next decision. A failed pilot may be useful evidence; it should not disappear from an update because it makes the story less tidy.</p>
           <div data-cf-component-id={"image:prepare-investor-testable-evidence"} data-cf-component-type={"image"} data-cf-component-label={"Image: Prepare Evidence Investors Can Test"} data-cf-source-section-id={"prepare-investor-testable-evidence"}>
           <ArticleImageBlock
             src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-804912d9-e640-4e81-99b9-978fe650a621.jpg?alt=media&token=c9849d87-259f-4067-9f7c-e0e7c398899b"
@@ -241,11 +237,11 @@
         </div>
         <div id="raise-for-the-next-proof-point" data-cf-component-id={"section:raise-for-the-next-proof-point"} data-cf-component-type={"section"} data-cf-component-label={"Raise for the Next Proof Point"} data-cf-source-section-id={"raise-for-the-next-proof-point"}>
           <h2>{"Raise for the Next Proof Point"}</h2>
-          <p>{"Raise capital because it has a clear job to do: reach the next proof point. That proof point might be stronger product validation, early customer adoption, or evidence that the business can scale. Seed funding is intended to move a company from early validation towards structured growth, but an AI label alone is not a funding case. In a crowded market, investors are looking for a real application, clear differentiation, and measurable business value."}</p>
-          <p>{"Set the amount from the work required during the planned runway, rather than from headline funding activity. Map the costs needed to achieve the milestone, such as the team, product development, marketing, and a sensible buffer. Then make investor conversations specific: explain the customer problem, why your approach is distinct, what evidence you have today, and what this capital will help prove next. A disciplined raise gives founders a practical basis for deciding whether outreach is timely."}</p>
+          <p>Before outreach, review the plan with the people responsible for delivery and any advisers needed for financing or legal questions. An unresolved dependency or unpriced obligation is a reason to investigate further, not to fill the gap with a confident forecast.</p>
+          <p>Use the worksheet below to keep evidence, costs and uncertainties together. Decide separately whether to pursue external funding; completing the worksheet does not certify readiness or assure that an investor will agree.</p>
           <ul>
             <li>{"Name one next milestone that capital will help achieve."}</li>
-            <li>{"Build the raise amount from the operating costs needed to reach it."}</li>
+            <li>{"Build a dated cost model and record what it excludes."}</li>
           </ul>
           <div data-cf-component-id={"image:raise-for-the-next-proof-point"} data-cf-component-type={"image"} data-cf-component-label={"Image: Raise for the Next Proof Point"} data-cf-source-section-id={"raise-for-the-next-proof-point"}>
           <ArticleImageBlock
@@ -257,26 +253,25 @@
           />
           </div>
         </div>
-        <p className="text-sm text-slate-600">Correction, 15 September 2026: the earlier version and PDF presented 12–18 months as a general runway target. That range appears in <a href="https://www.ycombinator.com/blog/how-to-raise-a-seed-round">YC’s 2016 seed-fundraising guide</a> in a particular funding context. It is not a rule for every Australian startup. The replacement worksheet uses explicit cash and timing assumptions.</p>
         <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
           <ArticleResourceCTA
-            eyebrow="Free checklist"
+            eyebrow="Editable preparation worksheet"
             title={"Founder Funding Preparation Worksheet"}
-            description="Save and edit a Markdown worksheet to record milestone evidence, dated cash assumptions and delay scenarios. It prepares questions for discussion; it does not assess whether you should raise capital."
-            buttonLabel="Download editable worksheet (Markdown)"
+            description="Save and edit a Markdown worksheet covering milestone evidence, dated cash assumptions and delay scenarios. This replaces the earlier PDF's blanket runway rule; it is not a raise-readiness assessment."
+            buttonLabel="Download the editable worksheet"
             buttonHref="/downloads/founder-funding-preparation.md"
             accent="purple"
             previewCards={[
               {
                 title: "Milestone evidence",
-                subtitle: "Markdown",
+                subtitle: 'Markdown',
                 color: "bg-[#ff3d00]",
                 textColor: "text-white",
                 rotationClass: "rotate-[-6deg]",
               },
               {
-                title: "Investor case checklist",
-                subtitle: "Markdown",
+                title: "Cash and delay assumptions",
+                subtitle: 'Markdown',
                 color: "bg-[#00ffd7]",
                 textColor: "text-black",
                 rotationClass: "rotate-[7deg]",
@@ -286,19 +281,28 @@
         </div>

       <ArticleReferences references={[
-        { id: 1, href: "https://business.gov.au/finance/funding/pitch-for-venture-capital", title: "Pitch for venture capital", publisher: "Australian Government", description: "Preparation questions and information to assemble before approaching investors.", category: "government" },
-        { id: 2, href: "https://www.ycombinator.com/blog/how-to-raise-a-seed-round", title: "A Guide to Seed Fundraising (2016)", publisher: "Y Combinator", description: "Historical US seed-funding context, not a universal Australian runway target.", category: "guide" },
-      ]} />
+        { id: 1, href: "https://business.gov.au/finance/funding/pitch-for-venture-capital", title: "Pitch for venture capital", publisher: "Australian Government", description: "Preparation questions, not a funding approval or assessment.", category: "guide" },
+        { id: 2, href: "https://www.ycombinator.com/blog/how-to-raise-a-seed-round", title: "A Guide to Seed Fundraising (January 2016)", publisher: "Y Combinator", description: "Historical source for the runway clarification; not current Australian financing guidance.", category: "guide" },
+      ]} heading="Sources and their scope" />

         <ArticleDisclaimer />

+        <section id="funding-discussion-record">
+          <h2>Prepare one question for a founder discussion</h2>
+          <p>This page serves founders learning how to explain a capital need. Reading about fundraising does not imply that you want to deliver client projects as a contractor. Before a community conversation, separate your evidence from what you still hope to prove.</p>
+          <pre className="whitespace-pre-wrap" aria-label="Funding discussion preparation">{[
+            'Milestone we want to investigate:',
+            'Evidence we already have and permission to share it:',
+            'Assumptions that remain untested:',
+            'Work, dependencies and costs still to verify:',
+            'Question for a qualified adviser, if needed:',
+            'One non-confidential question for peer discussion:',
+          ].join('\n')}</pre>
+          <p>If your actual next task is reporting progress, <Link to="/vibe-raising">explore Vibe Raising for preparing a founder update</Link>. Keep the update grounded in real milestones, metrics and risks. A reporting tool does not verify those claims or establish that a company is investable.</p>
+        </section>
+
         <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
-          <ArticleCompanyCTA
-            title="Plan the Next Proof Point"
-            body="Set a specific milestone, map the work needed to reach it, and make the funding request match the evidence the business needs to build."
-            buttonText="Define the milestone"
-            buttonHref="#define-the-milestone-your-round-must-buy"
-          />
+          <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement="article-inline" />
         </div>
       </div>

```
