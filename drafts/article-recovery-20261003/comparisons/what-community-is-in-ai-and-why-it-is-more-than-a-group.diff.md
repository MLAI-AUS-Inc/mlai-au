# Draft comparison for source review

Display-only diff; never apply this mechanically. Current-main dates, sources, metadata and destinations must be preserved.

```diff
--- current-main/app/articles/content/featured/what-community-is-in-ai-and-why-it-is-more-than-a-group.tsx
+++ unreviewed-local-draft/app/articles/content/featured/what-community-is-in-ai-and-why-it-is-more-than-a-group.tsx
@@ -3,27 +3,24 @@
 import { Home } from 'lucide-react'
 import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '../../authors'
 import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
-import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
+import ArticleConversionCTA from '../../../components/articles/ArticleConversionCTA'
+import { BASE_ARTICLE_SEO_CONFIG } from '../../seo-config'
 import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
-import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
 import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
 import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
-import { ArticleReferences } from '../../../components/articles/ArticleReferences'
-import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'
-import QuoteBlock from '../../../components/articles/QuoteBlock'
-import AudienceGrid from '../../../components/articles/AudienceGrid'
-import { ArticleStepList } from '../../../components/articles/ArticleStepList'
+import { ArticleEventPreference } from '../../../components/articles/ArticleEventPreference'
+import { DESK_READING_RECORD, PARTICIPATION_BLANK, PARTICIPATION_DOWNLOAD, PARTICIPATION_FIELDS, PARTICIPATION_PATH, PARTICIPATION_PROVENANCE, PUBLIC_CONTRIBUTIONS } from '../../../lib/community-participation'

 export const useCustomHeader = true

-const TOPIC = "What Community Is in AI and Why It Is More Than a Group"
+const TOPIC = "What an AI community is: examples and your first contribution"
 export const CATEGORY = "featured"
 export const SLUG = "what-community-is-in-ai-and-why-it-is-more-than-a-group"
-export const DATE_PUBLISHED = "2026-07-22"
-export const DATE_MODIFIED = "2026-07-22"
-export const DESCRIPTION = "What community is in AI: shared purpose, trust and participation."
+export const DATE_PUBLISHED = "2026-07-26"
+export const DATE_MODIFIED = "2026-09-11"
+export const DESCRIPTION = "See two public MLAI contributions, distinguish review from self-merge, and prepare a small contribution and permission-based follow-up for a suitable AI event."
 const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-224f0dfd-4f1d-493c-b646-bcc4df200d8d.jpg?alt=media&token=8d14687e-44aa-4fa4-a4c1-02c095ddc973"
-const HERO_IMAGE_ALT = "Diverse adults in close conversation at an Australian AI community gathering, listening with trust and focus"
+const HERO_IMAGE_ALT = "Two people facing each other in conversation (illustrative image)"
 export const FEATURED_FOCUS = "ai"

 const AUTHOR_PROFILE = getAuthorProfile(DEFAULT_AUTHOR_KEY)
@@ -77,22 +74,22 @@
   { id: 1, question: "Can an online AI group be a community?", answer: "Yes, an online AI group can be a community when members share a meaningful purpose, build relationships, and participate over time. A Discord server or mailing list alone is only a channel." },
   { id: 2, question: "Is attending one AI event enough to create community?", answer: "No, a single AI event can start connections, but community develops through repeated interaction, shared norms, and follow-through. People need reasons and opportunities to return and participate together." },
   { id: 3, question: "How can members contribute without being AI experts?", answer: "Members can contribute by asking thoughtful questions, sharing what they have tried, making introductions, helping at events, or creating space for others to participate. Useful contribution is not limited to technical expertise." },
-  { id: 4, question: "How can organisers tell whether participation is becoming reciprocal?", answer: "Participation is becoming reciprocal when members help one another, bring unfinished questions as well as polished work, and see their contributions influence future conversations or activities." },
-  { id: 5, question: "What is the biggest AI community in Australia?", answer: "There is no single independently verified public ranking of AI communities in Australia. MLAI is an Australian AI community that brings people together to learn, share practical experience, and participate in conversations and events about AI." },
+  { id: 4, question: "Does a merged contribution prove that it was reviewed?", answer: "No. A merge records acceptance into the repository, but the author may have merged it themselves. Check the review history separately. Even another person's approval does not prove every behaviour was tested or establish attendance, payment or career outcomes." },
+  { id: 5, question: "Does attending give me access to paid projects?", answer: "No. Event participation is separate from an application for paid work and does not guarantee introductions, contracts or a job. Choose an event for its stated learning or participation purpose." },
 ]

 export const summaryHighlights = {
-  heading: "Key facts about AI communities",
-  intro: "An AI community is built through shared purpose, trust, and ongoing participation.",
+  heading: "Start with a question, not a membership count",
+  intro: "A newcomer can learn from public work before choosing how to participate.",
   items: [
-    { label: "What makes an AI group a community?", description: "An AI community is connected by meaningful common ground, such as shared values, norms, identity, place, or purpose. It is sustained through relationships and ongoing participation." },
-    { label: "How is an AI community different from a group?", description: "An AI community is more than a collection of members because people share socially meaningful connections and ways of participating. It forms around shared learning, work, or practice." },
-    { label: "What does an AI community look like in practice?", description: "It can be people who regularly learn a tool together, discuss a common challenge, and share practical lessons. Their repeated exchanges, not the platform, create the community." },
+    { label: "Read a real contribution", description: "Two public MLAI changes show different records of contribution and response. Neither is a testimonial or proof of a job outcome." },
+    { label: "Prepare something small", description: "Use the completed desk-reading example and editable record to separate your question, actual observations and proposed follow-up." },
+    { label: "Choose a suitable next interaction", description: "Check the event's topic, prerequisites, location and format. Listening is a valid starting point; a contribution is optional." },
   ],
 }

 export const articleMeta = {
-  title: "What Community Is in AI and Why It Is More Than a Group",
+  title: TOPIC,
   topic: TOPIC,
   category: CATEGORY,
   slug: SLUG,
@@ -105,31 +102,7 @@
   featuredFocus: FEATURED_FOCUS,
 }

-const faqSchemaItems = [
-  { question: "What makes an AI group a community?", answer: "An AI community is connected by meaningful common ground, such as shared values, norms, identity, place, or purpose. It is sustained through relationships and ongoing participation." },
-  { question: "How is an AI community different from a group?", answer: "An AI community is more than a collection of members because people share socially meaningful connections and ways of participating. It forms around shared learning, work, or practice." },
-  { question: "What does an AI community look like in practice?", answer: "It can be people who regularly learn a tool together, discuss a common challenge, and share practical lessons. Their repeated exchanges, not the platform, create the community." },
-  { question: "Can an online AI group be a community?", answer: "Yes, an online AI group can be a community when members share a meaningful purpose, build relationships, and participate over time. A Discord server or mailing list alone is only a channel." },
-  { question: "Is attending one AI event enough to create community?", answer: "No, a single AI event can start connections, but community develops through repeated interaction, shared norms, and follow-through. People need reasons and opportunities to return and participate together." },
-  { question: "How can members contribute without being AI experts?", answer: "Members can contribute by asking thoughtful questions, sharing what they have tried, making introductions, helping at events, or creating space for others to participate. Useful contribution is not limited to technical expertise." },
-  { question: "How can organisers tell whether participation is becoming reciprocal?", answer: "Participation is becoming reciprocal when members help one another, bring unfinished questions as well as polished work, and see their contributions influence future conversations or activities." },
-  { question: "What is the biggest AI community in Australia?", answer: "There is no single independently verified public ranking of AI communities in Australia. MLAI is an Australian AI community that brings people together to learn, share practical experience, and participate in conversations and events about AI." },
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

@@ -158,13 +131,12 @@

   return (
     <>
-
       <ContentFactoryInspectorBridge />
       <ArticleHeroHeader
         breadcrumbs={[
           { label: 'Home', href: '/', icon: Home },
           { label: 'Articles', href: "/articles" },
-          { label: TOPIC, current: true },
+          { label: 'AI community participation', current: true },
         ]}
         title={TOPIC}
         headerBgColor="cyan"
@@ -173,152 +145,91 @@
         heroImageAlt={HERO_IMAGE_ALT}
       />

-      <ArticleTocPlaceholder className="bg-transparent" />
-
-      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
-        <div id="what-community-is" data-cf-component-id={"section:what-community-is"} data-cf-component-type={"section"} data-cf-component-label={"What Community Is in AI"} data-cf-source-section-id={"what-community-is"}>
-        <p><strong>{TOPIC}</strong>{" A community is a social group held together by something that matters to its members. That shared element can be a place, values, norms, culture, identity, or a common purpose."}</p>
-        <p>{"In AI, community forms when people build relationships and take part around shared learning or work. These connections can exist locally or online, but the platform itself is not the community; the relationships, shared purpose, and ongoing participation are."}</p>
-        </div>
-        <div id="group-versus-community" data-cf-component-id={"section:group-versus-community"} data-cf-component-type={"section"} data-cf-component-label={"A Group Becomes a Community Through Shared Meaning"} data-cf-source-section-id={"group-versus-community"}>
-          <h2>{"A Group Becomes a Community Through Shared Meaning"}</h2>
-          <p>{"A group is simply people linked by a channel, activity, place or interest. A mailing list, Discord server, meetup attendance list or social following can make it easier for AI-interested people to find one another. That does not automatically make it a community. A community has socially meaningful things in common, such as values, norms, identity or a shared purpose. It can exist in a physical place, online, or across both."}</p>
-          <p>{"Shared purpose gives people a reason to return and a clearer sense of what they can contribute. In an AI setting, that purpose might be learning together, discussing a common challenge, or supporting work around a shared initiative. Repeated interactions then help people recognise how to participate: how questions are asked, how knowledge is shared and how others are treated. Over time, those relationships and norms create an environment people identify with."}</p>
-          <div data-cf-component-id={"image:group-versus-community"} data-cf-component-type={"image"} data-cf-component-label={"Image: A Group Becomes a Community Through Shared Meaning"} data-cf-source-section-id={"group-versus-community"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-15386f21-7204-4cda-a629-68d83506fe28.jpg?alt=media&token=b5648430-3de9-49d1-9eae-35220d6b0927"
-            alt="Hands, notebooks and coffee cups around a whiteboard during an Australian AI meetup project discussion"
-            caption="A Group Becomes a Community Through Shared Meaning"
-            width={1200}
-            height={800}
-          />
+      <div data-cf-article-body className="prose prose-lg prose-slate mx-auto w-full min-w-0 max-w-4xl bg-transparent [overflow-wrap:anywhere] [&_th]:text-left [&_th]:p-3 [&_td]:p-3 [&_td]:align-top">
+        <ArticleTocPlaceholder className="bg-transparent" />
+        <section data-cf-component-id="section:what-community-is" data-cf-component-type="section" data-cf-component-label="Community and shared practice">
+          <h2 id="what-community-is">What makes an AI group a community?</h2>
+          <p>An AI community is people building ongoing relationships around learning about, using or making AI. A chat group is a channel; community depends on what people do together. For an Australian newcomer, look for opportunities to ask a question, contribute on your own terms and see what happens next—not just a large membership count.</p>
+          <p>A community of practice is a narrower concept. Etienne and Beverly Wenger-Trayner describe three elements: a shared domain, interaction between members, and a developing practice of resources and experience. A website or shared job title alone does not establish it. Their framework is about collective learning, not a ranking of AI communities or proof of employment outcomes. <a href="https://www.wenger-trayner.com/introduction-to-communities-of-practice/">Read their June 2015 introduction</a>.</p>
+          <p>You do not have to join a formal community of practice to benefit from a talk. A one-off event can be worthwhile, and you can listen before deciding whether you want a more active role. This guide is for curious participants, not a promise of expert mentoring or project placement.</p>
+        </section>
+        <section data-cf-component-id="section:public-contributions" data-cf-component-type="section" data-cf-component-label="Public contribution evidence">
+          <h2 id="public-contributions">Two public MLAI contributions you can inspect</h2>
+          <p>A pull request is a proposed change to a shared code repository. Its change view shows what was edited; its conversation shows recorded responses. A merge incorporates the change. You can read these public records without installing the project or submitting anything.</p>
+          <p>The following records were checked on 10 September 2026. They show contribution and acceptance, with an important difference in the review history. They do not establish the contributors&apos; age, location, experience level, use of AI coding tools, motivation or whether they were paid.</p>
+          <div role="region" aria-label="Public MLAI contribution comparison" tabIndex={0} className="max-w-full overflow-x-auto rounded-xl border border-slate-300 focus-visible:outline-2 focus-visible:outline-offset-2">
+            <table className="w-full min-w-[52rem] table-fixed">
+              <caption className="p-3 text-left text-sm">Public source comparison (UTC dates)</caption>
+              <thead><tr><th>Contribution</th><th>What changed</th><th>Recorded response</th><th>What this supports—and does not</th></tr></thead>
+              <tbody>{PUBLIC_CONTRIBUTIONS.map(row => <tr key={row.number} data-public-contribution={row.number}>
+                <th scope="row"><a href={row.url}>{row.label} (#{row.number})</a><br /><span className="font-normal">By {row.author}<br /><time dateTime={row.mergedAt}>Merged {row.mergedAt.slice(0, 10)} UTC</time></span></th>
+                <td>{row.change}</td><td>{row.response}</td><td>{row.limit}</td>
+              </tr>)}</tbody>
+            </table>
           </div>
-        </div>
-        <div data-cf-component-id={"audience-grid:ai-community-audiences"} data-cf-component-type={"audience-grid"} data-cf-component-label={"What This Means for Different AI Participants"}>
-          <AudienceGrid
-            heading="What This Means for Different AI Participants"
-            cards={[
-            {
-              title: "Learners",
-              description: "Seek recurring spaces where questions, shared learning, and early work are welcomed.",
-              variant: "purple",
-            },
-            {
-              title: "Builders and founders",
-              description: "Share work in progress, compare approaches, and offer practical peer feedback around common challenges.",
-              variant: "purple",
-            },
-            {
-              title: "Organisers and supporters",
-              description: "Create repeatable ways for members to meet, contribute, and see that their participation matters.",
-              variant: "purple",
-            },
-            ]}
-          />
-        </div>
-        <div id="signals-of-real-ai-community" data-cf-component-id={"section:signals-of-real-ai-community"} data-cf-component-type={"section"} data-cf-component-label={"What Real Community Looks Like in AI"} data-cf-source-section-id={"signals-of-real-ai-community"}>
-          <h2>{"What Real Community Looks Like in AI"}</h2>
-          <p>{"A real AI community is more than an audience for posts, newsletters, or one-off events. It is a group of people connected by a meaningful shared interest, along with relationships, norms, and ways of helping each other. An event can start a connection, but the value comes from what members do with that connection afterwards."}</p>
-          <p>{"AI can make it easier to find information, surface relevant discussions, or reduce admin work. It does not replace the trust built when people talk honestly, listen carefully, and follow through. In a healthy AI community, members bring unfinished questions as well as polished work."}</p>
-          <div data-cf-component-id={"image:signals-of-real-ai-community"} data-cf-component-type={"image"} data-cf-component-label={"Image: What Real Community Looks Like in AI"} data-cf-source-section-id={"signals-of-real-ai-community"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-1c3680d4-56f1-4c3a-ae2f-746431e04935.jpg?alt=media&token=a58c0655-5745-4a15-a573-a08b9dbb97eb"
-            alt="AI workshop table with notebooks, prototype screens, and whiteboard sketches in a shared campus workspace"
-            caption="What Real Community Looks Like in AI"
-            width={1200}
-            height={800}
-          />
-          </div>
-          <h3>{"Look for reciprocity, not just activity"}</h3>
-          <p>{"These repeated exchanges give members a reason to return and help turn shared interest in AI into a durable community."}</p>
-        </div>
-        <div id="build-participation-into-practice" data-cf-component-id={"section:build-participation-into-practice"} data-cf-component-type={"section"} data-cf-component-label={"How to Turn AI Participation Into Community"} data-cf-source-section-id={"build-participation-into-practice"}>
-          <h2>{"How to Turn AI Participation Into Community"}</h2>
-          <p>{"Start with a shared purpose that is specific enough for people to recognise why they belong. An AI group might gather around learning a tool, discussing responsible use, or solving a practical project problem. Communities can form around shared values, norms, identity, or practice, whether members meet in person or online. A clear purpose gives conversations and events a common point of return."}</p>
-          <p>{"Give members chances to ask questions, share what they have tried, compare approaches, and work across roles. For AI work, a community of practice can bring different teams together and reduce knowledge silos around a shared initiative. Events remain valuable because they create connection and trust that automated answers or online administration cannot reproduce."}</p>
-          <p>{"Finally, carry contributions forward. AI can help with administrative work such as organising information, surfacing relevant threads, or creating summaries. It should support the human work of connection rather than replace it. A durable community grows when members can see that their participation affects what happens next."}</p>
-          <div data-cf-component-id={"image:build-participation-into-practice"} data-cf-component-type={"image"} data-cf-component-label={"Image: How to Turn AI Participation Into Community"} data-cf-source-section-id={"build-participation-into-practice"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-17956ff4-1118-4f4b-82b0-b3459ec42fbe.jpg?alt=media&token=c3777dd8-d6e2-43cb-9718-e1085155f31b"
-            alt="How to Turn AI Participation Into Community"
-            caption="How to Turn AI Participation Into Community"
-            width={1200}
-            height={800}
-          />
-          </div>
-          <QuoteBlock title="Design for mutual participation" variant="purple">
-            {"Do not treat engagement as a volume metric alone; design for members to help one another and shape what happens next."}
-          </QuoteBlock>
-        </div>
-        <div data-cf-component-id={"step-list:community-practice-steps"} data-cf-component-type={"step-list"} data-cf-component-label={"Three Practices That Build Durable Participation"}>
-          <ArticleStepList
-            title="Three Practices That Build Durable Participation"
-            steps={[
-            "Name a clear shared purpose.",
-            "Create repeatable peer participation.",
-            "Carry contributions into the next interaction.",
-            ]}
-            accent="teal"
-          />
-        </div>
-        <div id="ai-tools-and-human-trust" data-cf-component-id={"section:ai-tools-and-human-trust"} data-cf-component-type={"section"} data-cf-component-label={"AI Can Support Community but Cannot Substitute for Trust"} data-cf-source-section-id={"ai-tools-and-human-trust"}>
-          <h2>{"AI Can Support Community but Cannot Substitute for Trust"}</h2>
-          <p>{"AI can reduce some of the routine work involved in running a community. It can answer common member questions, moderate discussions, surface relevant threads, match people with shared interests, and help produce updates such as a weekly digest. These uses can make knowledge easier to find and ease administrative pressure on a small community team. AI can also help with practical tasks such as creating a tracking spreadsheet, freeing time that would otherwise go to manual setup."}</p>
-          <p>{"That saved time should support, rather than replace, human community work. A tool cannot sit across the table from someone, listen to their situation, or create the trust that grows through repeated, genuine interaction. Events and direct conversations still matter because they help people meet, exchange experiences, and build relationships."}</p>
-          <div data-cf-component-id={"image:ai-tools-and-human-trust"} data-cf-component-type={"image"} data-cf-component-label={"Image: AI Can Support Community but Cannot Substitute for Trust"} data-cf-source-section-id={"ai-tools-and-human-trust"}>
-          <ArticleImageBlock
-            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-8e8aa7b6-f953-4c31-b8e7-d65cea6e2f10.jpg?alt=media&token=9c9db2ca-07a1-40e8-b91c-906b15610fa5"
-            alt="People around a table discussing community needs with a shared AI workspace on screen"
-            caption="AI Can Support Community but Cannot Substitute for Trust"
-            width={1200}
-            height={800}
-          />
-          </div>
-          <QuoteBlock title="" variant="purple">
-            {"Use AI to reduce coordination work, then put the saved time into listening, introductions, and follow-through."}
-          </QuoteBlock>
-        </div>
-        <div className="mt-12" data-cf-component-id={"quote:trust-is-human"} data-cf-component-type={"quote"} data-cf-component-label={"Key insight"}>
-          <QuoteBlock title="Key insight" variant="purple">
-            {"AI can make coordination easier, but trust still grows through people showing up for one another."}
-          </QuoteBlock>
-        </div>
-        <div id="community-is-a-practice" data-cf-component-id={"section:community-is-a-practice"} data-cf-component-type={"section"} data-cf-component-label={"Treat Community as a Practice"} data-cf-source-section-id={"community-is-a-practice"}>
-          <h2>{"Treat Community as a Practice"}</h2>
-          <p>{"A community is more than a list of members or a shared interest. It is a group of people connected by meaningful common ground, such as values, norms, identity, place, or a shared purpose. It becomes stronger when relationships are durable and people have regular ways to take part together."}</p>
-          <p>{"For an AI community, that practice might be learning with peers, sharing a useful lesson, asking a thoughtful question, helping at an event, or making space for another person to contribute. AI can help with information and administration, but it does not replace the trust built through human interaction."}</p>
-        </div>
-
-      <ArticleReferences
-          references={[
-            {id: 1, href: "https://en.wikipedia.org/wiki/Community", title: "Community - Wikipedia", publisher: "en.wikipedia.org", description: "", category: "guide"},
-            {id: 2, href: "https://bevy.com/b/blog/why-community-events-matter-more-in-the-ai-era-not-less", title: "Why Community Events Matter More in the AI Era, Not Less - Bevy", publisher: "bevy.com", description: "", category: "guide"},
-            {id: 3, href: "https://www.carriemelissajones.com/blog/what-is-community-strategy", title: "What is Community Strategy? \u2014 The CMJ Group by Carrie Melissa Jones", publisher: "carriemelissajones.com", description: "", category: "guide"},
-            {id: 4, href: "https://stackoverflow.co/internal/resources/why-your-ai-project-needs-a-community-of-practice-and-how-to-build-one/", title: "Why your AI project needs a community of practice and how to build one - Stack Overflow", publisher: "stackoverflow.co", description: "", category: "guide"},
-            {id: 5, href: "https://deb-schell.medium.com/ai-isnt-replacing-community-it-s-redefining-how-we-build-it-77062c67a796", title: "Medium", publisher: "deb-schell.medium.com", description: "", category: "guide"},
-            {id: 6, href: "https://www.activenetwork.com/blog/the-importance-of-small-business-in-your-community", title: "The Importance Of Small Business In Your Community | ACTIVE Network Blog", publisher: "activenetwork.com", description: "", category: "guide"},
-          ]}
-          heading="Sources & further reading"
-        />
-
-        <ArticleDisclaimer />
-
-        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
-          <ArticleCompanyCTA
-            title="Put Community Into Practice"
-            body="Create regular opportunities for people to learn together, share what they have tried, and carry useful contributions into the next interaction."
-            buttonText="Build Participation"
-            buttonHref="#"
-          />
+          <p className="text-sm">On a small screen, scroll the table sideways to read each column. Keyboard users can focus the table region and use the arrow keys.</p>
+          <p>The first record shows a contributor&apos;s proposal and a different maintainer&apos;s response. The second leaves a shared reference but does not show that exchange. That distinction is more informative than treating every contribution count as evidence of reciprocity. Neither record tells us whether a newcomer felt welcome or returned to an event.</p>
+          <h3>Try a three-question reading exercise</h3>
+          <p>Open either record and ask: what was contributed, who responded, and what outcome is actually documented? For the sidebar change, you do not need to understand every line of code to ask why a shortcut should ignore someone typing in a form.</p>
+          <details id="reading-check" className="rounded-xl border border-slate-300 p-5">
+            <summary className="cursor-pointer font-semibold">Compare your reading with the recorded evidence</summary>
+            <ul>
+              <li><strong>Contribution:</strong> #1586 changes navigation code; #1514 changes onboarding documentation.</li>
+              <li><strong>Response:</strong> drsamdonegan approved #1586, then merged it. The approval contains no written explanation. #1514 was self-merged; no review was recorded.</li>
+              <li><strong>Outcome:</strong> both changes were merged. That does not tell us whether either contributor attended an event, got paid, found a job or improved another person&apos;s experience.</li>
+            </ul>
+          </details>
+        </section>
+        <section data-cf-component-id="section:signals-of-real-ai-community" data-cf-component-type="section" data-cf-component-label="Choose a participation format">
+          <h2 id="signals-of-real-ai-community">Choose the interaction you actually want</h2>
+          <p>The following are suggested fit checks, not observations of every MLAI session. Verify the individual event listing and ask the organiser when the format is unclear.</p>
+          <ul>
+            <li><strong>Understand an idea:</strong> look for an introductory talk with questions. Check assumed knowledge, whether questions are supported, and local or online attendance.</li>
+            <li><strong>Try something:</strong> look for a hands-on workshop. Check laptop, account, software, cost and access requirements; do not assume individual troubleshooting is included.</li>
+            <li><strong>Compare a problem:</strong> look for a discussion or build session. Check whether work-in-progress sharing fits the agenda and what may be shown publicly.</li>
+          </ul>
+          <p>For a location-based shortlist, use the <a href="/articles/featured/where-to-find-ai-events-in-melbourne">Melbourne event guide</a> or <a href="/articles/featured/how-to-find-an-ai-and-tech-meetup-in-sydney">Sydney event guide</a>, then check the organiser&apos;s current listing. If you are planning participation for others, the <a href="/articles/featured/how-to-foster-community-engagement">organiser&apos;s feedback-cycle guide</a> answers that separate task.</p>
+          <p>After attending, use observable signals: did you understand one idea better, receive a useful correction, or agree on a specific next exchange? A busy chat, large membership count or friendly first impression alone does not establish technical reliability or a suitable long-term fit.</p>
+          <p>If a session pressures you to buy, share confidential work or accept unwanted contact, you can decline or leave. Ask the organiser about conduct and reporting arrangements rather than assuming membership makes a space safe.</p>
+        </section>
+        <section data-cf-component-id="section:ai-tools-and-human-trust" data-cf-component-type="section" data-cf-component-label="Sharing with permission">
+          <h2 id="ai-tools-and-human-trust">Use AI assistance without overstating what happened</h2>
+          <p>You might use an AI tool to organise your own non-sensitive notes or draft a follow-up. Check names, claims and promised actions yourself before sharing. A generated summary is not evidence that a speaker agreed with it, and an automated introduction is not the other person's consent to be contacted.</p>
+          <p>Prefer a small public example you own over customer screenshots or private chat logs. If your contribution involves AI-generated code, explain what you tested and what remains uncertain. Helpful participation can also be a question, a correction or simply careful listening.</p>
+        </section>
+
+        <section data-cf-component-id="section:newcomer-plan" data-cf-component-type="section" data-cf-component-label="Your first participation plan">
+          <h2 id="newcomer-plan">Your first participation plan</h2>
+          <p>If you are AI-curious and unsure where to start, choose one manageable interaction rather than trying to become an expert before attending. The following is a suggested newcomer journey, not a report of an actual member's experience or a promise about every MLAI event.</p>
+          <ol>
+            <li><strong>Before choosing:</strong> write one question you want to explore. Read the event's topic, prerequisites, online/in-person format, timezone, cost and accessibility information. Ask the organiser about anything material that is unclear before registering.</li>
+            <li><strong>At the session:</strong> briefly explain what you are curious about, listen to the answer and leave space for others. A beginner's specific question can be a contribution; you do not need to deliver an expert talk.</li>
+            <li><strong>Offer something small:</strong> share a relevant public source, describe a test you tried, or identify a confusing instruction. Ask before taking over someone else's problem or offering an introduction.</li>
+            <li><strong>Afterwards:</strong> follow up only where interest is mutual. Send the agreed resource or correction, not an unsolicited pitch or a message to everyone on an attendee list.</li>
+            <li><strong>Decide whether to return:</strong> record what you learned and what still needs work. Choose a later relevant session if it helps; there is no obligation to attend repeatedly or provide unpaid work.</li>
+          </ol>
+          <h3>A contribution that does not require a client story</h3>
+          <p><strong>Illustrative example:</strong> you try an openly available tutorial and find that one step is unclear. You can say, “I followed these instructions on this setup, expected this result and got this error. Is there a step I misunderstood?” Include only information you have permission to share. If you use an MLAI article lab, distinguish its synthetic exercise from a real customer deployment.</p>
+          <p>A useful non-technical contribution might instead be a plain-language question about a claim in a talk: “What was measured, and what is still an assumption?” You are helping others understand the evidence, not claiming expertise you do not have.</p>
+          <h3>A completed preparation record—not an attendance story</h3>
+          <p>{PARTICIPATION_PROVENANCE} It demonstrates how to keep a proposed next step separate from something already done.</p>
+          <dl aria-label="Completed desk-reading record" className="rounded-xl border border-slate-300 p-5">{PARTICIPATION_FIELDS.map((field, index) => <div key={field} className="mb-4 last:mb-0"><dt className="font-semibold">{field}</dt><dd className="ml-0 mt-1">{DESK_READING_RECORD[index]}</dd></div>)}</dl>
+          <h3>Use the record for your own participation</h3>
+          <pre className="max-w-full whitespace-pre-wrap break-words" aria-label="Community participation record">{PARTICIPATION_BLANK}</pre>
+          <p><a href={PARTICIPATION_DOWNLOAD} download="mlai-community-participation-record.txt">Download the editable participation record (.txt)</a>. It includes the two source records, completed desk-reading example and blank fields. Open it in a text editor and update it after your interaction; it is saved locally, not submitted to MLAI.</p>
+          <p>Keep names and contact details private, and obtain permission before publishing someone else's words, photo or work. Do not upload private conversations to an AI summariser without appropriate permission and data safeguards. Event attendance does not include guaranteed introductions, projects, jobs or individual advice.</p>
+        </section>
+        <ArticleEventPreference articlePath={PARTICIPATION_PATH} idPrefix="community" description="Choose a calendar preference for your next interaction. Only this preference travels to the Events page; your participation notes are not sent. This does not register you or guarantee a suitable session is available." />
+        <div className="my-12 not-prose" data-cf-component-id="cta" data-cf-component-type="conversion-cta" data-cf-component-label="Newcomer event invitation">
+          <ArticleConversionCTA articleSlug={CATEGORY + '/' + SLUG} config={BASE_ARTICLE_SEO_CONFIG['/articles/' + CATEGORY + '/' + SLUG].conversion!} events={[]} placement="article-inline" />
+        </div>
+        <div className="mt-12" data-cf-component-id={"faq"} data-cf-component-type={"faq"} data-cf-component-label={"FAQ"}>
+          <ArticleFAQ items={faqItems} />
         </div>
       </div>

         <div data-cf-component-id={"author-bio"} data-cf-component-type={"author-bio"} data-cf-component-label={"About the Author"}>
           <AuthorBio author={authorDetails} />
-        </div>
-
-        <div className="mt-12" data-cf-component-id={"faq"} data-cf-component-type={"faq"} data-cf-component-label={"FAQ"}>
-          <ArticleFAQ items={faqItems} />
         </div>

         <ArticleFooterNav backHref="/articles" topHref="#" />
```
