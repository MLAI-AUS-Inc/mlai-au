
const CF_REVIEW_6f8d24ff6fe54b1caf16a2be71baf625 = (/*cf-review:field-6f8d24ff6fe54b1caf16a2be71baf625*/"Start with a clearly defined task");
const CF_REVIEW_bce01b9c869248dea59260498c494455 = (/*cf-review:field-bce01b9c869248dea59260498c494455*/"Choose between automation, assistance and human handling");
const CF_REVIEW_add78ffbf85f4f269c7c4900071ceb92 = (/*cf-review:field-add78ffbf85f4f269c7c4900071ceb92*/"Make the human handover work before launch");
const CF_REVIEW_e73d538febbb4a91ad5fc4b309cd2ed3 = (/*cf-review:field-e73d538febbb4a91ad5fc4b309cd2ed3*/"Set the baseline and decision rules first");
const CF_REVIEW_3921d92e20ab418abf7de7d2465675dd = (/*cf-review:field-3921d92e20ab418abf7de7d2465675dd*/"Draft one bounded pilot before choosing tools");
const CF_REVIEW_df17db2bbfed433a864cfe758fe02d54 = (/*cf-review:field-df17db2bbfed433a864cfe758fe02d54*/"Review your plan with the people who will handle the work");
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'
import QuoteBlock from '../../../components/articles/QuoteBlock'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'

export const useCustomHeader = true

const TOPIC = (/*cf-review:field-ff80da341a8c46b7b645be95d3819e9a*/"How to use AI in customer service and keep people in control")
export const CATEGORY = "featured"
export const SLUG = "how-to-use-ai-in-customer-service-and-keep-people-in-control"
export const DATE_PUBLISHED = "2026-10-24"
export const DATE_MODIFIED = "2026-10-24"
export const DESCRIPTION = "Choose one customer-service task to trial with AI, set clear human handovers and draft a small pilot with quality, privacy and cost controls."
const HERO_IMAGE = (/*cf-review:field-f24fdbbf7c8e429287b1ee398f2c747f*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-a5f79a4d-002f-4d3c-b0f9-e1cf3ec9caff.jpg?alt=media&token=803dfae5-0bdb-45f6-8370-3a935b186203")
const HERO_IMAGE_ALT = "Two people look at a laptop, one gesturing and the other resting a hand on their chin. A leafy plant stands beside a window behind them."
export const FEATURED_FOCUS = "ai"

type ArticleAuthorProfile = {
  name: string
  role?: string
  credentials?: string
  bio?: string
  url?: string
  avatarUrl?: string
  avatarAlt?: string
  sameAs?: { label: string; href: string }[]
}
const DEFAULT_AUTHOR_KEY = 'contentTeam'
const DEFAULT_AUTHOR_AVATAR_FALLBACK_URL = ''
const AUTHOR_REGISTRY: Record<string, ArticleAuthorProfile> = {
  contentTeam: {
    name: "Dr Sam Donegan",
    role: "Medical Doctor, AI & Full Stack Software Engineer, President at MLAI",
    bio: "Sam leads the MLAI editorial team, combining deep research in machine learning with practical guidance for Australian teams adopting AI responsibly.",
    url: "https://www.linkedin.com/in/samueldonegan/",
    avatarUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1732146096971.jpeg?alt=media&token=8cbc3057-565b-48d0-be4f-e786332a6376",
    avatarAlt: "Dr Sam Donegan profile photo",
  },
}
const getAuthorProfile = (key: string): ArticleAuthorProfile | undefined => AUTHOR_REGISTRY[key]

const AUTHOR_PROFILE = getAuthorProfile(DEFAULT_AUTHOR_KEY)
const AUTHOR = AUTHOR_PROFILE?.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = [AUTHOR_PROFILE?.role, AUTHOR_PROFILE?.credentials].filter((value, index, values) => value && values.indexOf(value) === index).join(' · ') || 'Author'
const AUTHOR_BIO = AUTHOR_PROFILE?.bio ?? ''
const AUTHOR_AVATAR = AUTHOR_PROFILE?.avatarUrl ?? DEFAULT_AUTHOR_AVATAR_FALLBACK_URL

interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

type AuthorDetails = {
  name: string
  role: string
  bio: string
  avatarUrl: string
}

function AuthorBio({ author }: { author: AuthorDetails }) {
  const initials = author.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 px-6 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-lg font-semibold text-slate-700">
          {author.avatarUrl ? (
            <img
              data-cf-article-image="avatar"
              src={author.avatarUrl}
              alt={author.name}
              width={80}
              height={80}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : initials}
        </div>
        <div>
          <p className="text-lg font-semibold text-slate-900">{author.name}</p>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{author.role}</p>
        </div>
      </div>
      {author.bio ? <p className="mt-4 text-base leading-7 text-slate-700">{author.bio}</p> : null}
    </section>
  )
}

export const faqItems: FAQ[] = [
  { id: 1, question: "Can I trial AI without putting a chatbot in front of customers?", answer: "Yes. Staff can use AI to draft general return-lodgement instructions, check every draft against approved sources and send replies through the existing support inbox." },
  { id: 2, question: "What time should I count when comparing the trial?", answer: "Count prompting, checking, corrections and escalation work in active handling time, then compare like-for-like enquiries with the manual baseline. Record setup and testing separately from recurring work, but include their staff time in the full pilot cost." },
  { id: 3, question: "Does a lower escalation rate mean better service?", answer: "No. A lower escalation rate can hide missed handovers. Record escalated enquiries as a share of enquiries assessed, retain the reasons and check whether required handovers occurred, including when customers requested a person." },
  { id: 4, question: "What if too few eligible enquiries arrive during the trial?", answer: "An incomplete comparison does not support a success decision. At the pre-agreed endpoint, review the missing evidence before deciding whether to revise or stop the pilot." },
]

export const summaryHighlights = {
  heading: "Key facts",
  intro: "Choose one customer-service task to trial with AI, set clear human handovers and draft a small pilot with quality, privacy and cost controls.",
  items: [
    { label: "Which customer-service tasks are candidates for automation?", description: "Opening-hours answers and general returns instructions are candidates when they use current, approved public information. Unattended replies need tested boundaries and a workable route to a person." },
    { label: "Which customer interactions should stay human-led?", description: "Disputed refunds, distressed customers and sensitive disclosures should stay with a person who owns the interaction and decision. Where unattended delivery is not justified, staff should check AI-assisted drafts before sending." },
    { label: "How do you choose a first AI pilot?", description: "Shortlist a frequent task whose inputs and answers can be checked against approved sources, such as drafting general returns instructions. Record an accountable owner, human fallback, baseline, spending limit and decision rules before launch." },
  ],
}

export const articleMeta = {
  title: "How to use AI in customer service and keep people in control",
  topic: TOPIC,
  category: CATEGORY,
  slug: SLUG,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  author: AUTHOR,
  image: HERO_IMAGE,
  imageAlt: HERO_IMAGE_ALT,
  featuredFocus: FEATURED_FOCUS,
}

const CONTENT_FACTORY_INSPECTOR_SCRIPT = "(function(){\nvar protocol=5;\nvar params=new URLSearchParams(window.location.search);\nif(!params.has('cfInspector'))return;\nfunction post(payload){try{window.parent.postMessage(Object.assign({source:'content-factory-inspector',protocolVersion:protocol},payload),'*');}catch(e){}}\nif(window.__cfArticleInspectorInstalled){post({type:'ready',mode:window.__cfArticleInspectorMode||'comment'});return;}\nwindow.__cfArticleInspectorInstalled=true;window.__cfArticleInspectorProtocolVersion=protocol;window.__cfArticleInspectorMode='comment';\nfunction install(){\nvar style=document.createElement('style');\nstyle.textContent='[data-cf-component-id]{cursor:crosshair}html[data-cf-review-mode=editText] [data-cf-review-field]{cursor:text}.cf-inspector-hover,.cf-inspector-selected{outline:2px solid #7c3aed!important;outline-offset:3px}.cf-inspector-selected{outline-color:#2563eb!important}#cf-inspector-label{position:fixed;z-index:2147483647;pointer-events:none;border-radius:6px;background:#111827;color:white;padding:4px 8px;font:600 12px/1.4 ui-sans-serif,system-ui,sans-serif;box-shadow:0 8px 24px rgba(15,23,42,.22)}';\ndocument.head.appendChild(style);\nvar label=document.createElement('div');\nlabel.id='cf-inspector-label';label.hidden=true;document.body.appendChild(label);\nvar active=null;var selected=null;var measureQueued=false;var staged={};var fieldOriginals={};\nfunction mode(){return window.__cfArticleInspectorMode||'comment';}\nfunction rect(el){var r=el.getBoundingClientRect();return{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};}\nfunction viewport(){return{width:window.innerWidth,height:window.innerHeight,scrollX:window.scrollX,scrollY:window.scrollY,devicePixelRatio:window.devicePixelRatio||1};}\nfunction esc(value){return String(value||'').replace(/\"/g,'\\\\\"');}\nfunction cleanText(el){return String((el&&el.textContent)||'').replace(/\\s+/g,' ').trim();}\nfunction textHash(value){var text=String(value||'');var hash=0;for(var i=0;i<text.length;i++){hash=((hash<<5)-hash)+text.charCodeAt(i);hash|=0;}return String(hash);}\nfunction domPath(el){var parts=[];var node=el;while(node&&node.nodeType===1&&node!==document.body){var tag=(node.tagName||'').toLowerCase();var index=1;var sibling=node.previousElementSibling;while(sibling){if((sibling.tagName||'').toLowerCase()===tag)index++;sibling=sibling.previousElementSibling;}parts.unshift(tag+':nth-of-type('+index+')');node=node.parentElement;}return parts.length?'body > '+parts.join(' > '):'body';}\nfunction visibleEnough(el){if(!el||!el.getBoundingClientRect)return false;var r=el.getBoundingClientRect();return r.width>=24&&r.height>=16;}\nfunction fallbackLabel(el,kind,index){var text=cleanText(el);if(text)return text.slice(0,100);if(kind==='image')return el.getAttribute('alt')||'Image '+index;if(kind==='toc')return'Table of contents';if(kind==='references'||kind==='authoritative-references')return'Authoritative References';if(kind==='disclaimer')return'Disclaimer';if(kind==='events-cta')return'Upcoming events CTA';if(kind==='company-highlight-cta')return'Highlighted CTA';if(kind==='cta')return'Call to action '+index;return kind+' '+index;}\nfunction setBoundary(node,id,type,label){if(!node||node.nodeType!==1||!visibleEnough(node))return false;if(node.hasAttribute('data-cf-component-id'))return false;var nearest=node.closest&&node.closest('[data-cf-component-id]');if(nearest&&nearest!==node&&nearest.getAttribute('data-cf-component-id')!=='article')return false;node.setAttribute('data-cf-component-id',id);node.setAttribute('data-cf-component-type',type);node.setAttribute('data-cf-component-label',label);node.setAttribute('data-cf-dom-boundary','true');return true;}\nfunction queryAll(selector){try{return Array.prototype.slice.call(document.querySelectorAll(selector));}catch(e){return[];}}\nfunction markKnownBoundaries(){\nvar groups=[\n{id:'toc',type:'toc',label:'Table of contents',selectors:['[data-article-toc-placeholder]','[data-article-toc]','[data-component=\"table-of-contents\"]','[data-semantic*=\"table-of-contents\" i]','[data-semantic*=\"sidebar-toc\" i]','nav[aria-label*=\"Table of contents\" i]','nav[aria-label*=\"contents\" i]']},\n{id:'authoritative-references',type:'references',label:'Authoritative References',selectors:['[data-cf-component-id=\"authoritative-references\"]','[data-component*=\"authoritative-reference\" i]','section[aria-label*=\"Authoritative references\" i]']},\n{id:'references',type:'references',label:'Authoritative References',selectors:['[data-component*=\"reference\" i]','section[aria-label*=\"reference\" i]','section[id*=\"reference\" i]','[class*=\"references\" i]','[class*=\"reference-list\" i]']},\n{id:'disclaimer',type:'disclaimer',label:'Disclaimer',selectors:['[role=\"note\"][aria-label*=\"Legal\" i]','[aria-label*=\"Disclaimer\" i]','[class*=\"disclaimer\" i]','[class*=\"legal-notice\" i]']},\n{id:'events-cta',type:'events-cta',label:'Upcoming events CTA',selectors:['.events-cta','[class*=\"events-cta\" i]','section[aria-label*=\"Upcoming events\" i]','section[aria-label*=\"webinar\" i]']},\n{id:'highlight-cta',type:'company-highlight-cta',label:'Highlighted CTA',selectors:['[class*=\"highlight\" i][class*=\"cta\" i]','[class*=\"community\" i][class*=\"events\" i]']},\n{id:'cta',type:'company-cta',label:'Company CTA',selectors:['section[aria-label*=\"call to action\" i]','[class*=\"company-cta\" i]','[class*=\"resource-cta\" i]','[class*=\"cta\" i]']}\n];\nfor(var g=0;g<groups.length;g++){var group=groups[g];for(var s=0;s<group.selectors.length;s++){var nodes=queryAll(group.selectors[s]);for(var i=0;i<nodes.length;i++){setBoundary(nodes[i],group.id,group.type,group.label);}}}\n}\nfunction genericKind(node){var tag=(node.tagName||'component').toLowerCase();var classes=String(node.className||'').toLowerCase();var semantic=String(node.getAttribute('data-semantic')||'').toLowerCase();var aria=String(node.getAttribute('aria-label')||'').toLowerCase();var text=cleanText(node).toLowerCase();if(semantic.indexOf('toc')>=0||aria.indexOf('contents')>=0)return'toc';if(text.indexOf('authoritative references')>=0)return'authoritative-references';if(classes.indexOf('reference')>=0||aria.indexOf('reference')>=0)return'references';if(classes.indexOf('disclaimer')>=0||aria.indexOf('legal')>=0||text.indexOf('disclaimer')===0)return'disclaimer';if(classes.indexOf('events-cta')>=0||text.indexOf('upcoming events')>=0||text.indexOf('event calendar')>=0)return'events-cta';if(classes.indexOf('highlight')>=0&&classes.indexOf('cta')>=0)return'company-highlight-cta';if(tag==='img'||tag==='figure')return'image';if(tag==='a'||tag==='button'||node.getAttribute('role')==='button'||classes.indexOf('cta')>=0)return'cta';if(tag==='h1'||tag==='h2'||tag==='h3')return'heading';if(tag==='ul'||tag==='ol')return'list';if(tag==='table')return'table';if(tag==='blockquote')return'quote';return'section';}\nfunction genericId(kind,index){if(kind==='toc')return'toc';if(kind==='references')return'references';if(kind==='authoritative-references')return'authoritative-references';if(kind==='disclaimer')return'disclaimer';if(kind==='events-cta')return'events-cta';if(kind==='company-highlight-cta')return'highlight-cta';if(kind==='cta')return'cta';return'dom:'+kind+':'+index;}\nfunction ensureFallbackBoundaries(){\nvar root=document.querySelector('article')||document.querySelector('main')||document.body;if(!root)return;\nmarkKnownBoundaries();\nvar selectors=['main section','article section','section','h1','h2','h3','figure','img','table','blockquote','[role=\"button\"]','button','a[class*=\"cta\" i]','[class*=\"cta\" i]','[class*=\"callout\" i]','[class*=\"reference\" i]','[class*=\"disclaimer\" i]','[data-semantic*=\"toc\" i]','ul','ol'];\nvar nodes=[];for(var s=0;s<selectors.length;s++){var found=queryAll(selectors[s]);for(var i=0;i<found.length;i++){var el=found[i];if(!root.contains(el)&&el!==root)continue;if(!visibleEnough(el))continue;if(nodes.indexOf(el)===-1)nodes.push(el);}}\nif(!document.querySelector('[data-cf-component-id]')&&visibleEnough(root))nodes.unshift(root);\nfor(var n=0;n<nodes.length;n++){var node=nodes[n];if(node.hasAttribute('data-cf-component-id'))continue;var kind=genericKind(node);setBoundary(node,genericId(kind,n+1),kind,fallbackLabel(node,kind,n+1));}\n}\nfunction componentNodes(){ensureFallbackBoundaries();var nodes=Array.prototype.slice.call(document.querySelectorAll('[data-cf-component-id]'));var byId={};var ordered=[];for(var i=0;i<nodes.length;i++){var node=nodes[i];if(!visibleEnough(node))continue;var id=node.getAttribute('data-cf-component-id')||'';if(!id)continue;var current=byId[id];if(current&&current!==node){if(current.contains(node)){var pos=ordered.indexOf(current);if(pos>=0)ordered[pos]=node;byId[id]=node;continue;}if(node.contains(current))continue;}if(!current)ordered.push(node);byId[id]=node;}return ordered;}\nfunction byId(id){var bound=document.querySelector('[data-cf-review-field=\"'+esc(id)+'\"]');if(bound)return bound;var nodes=componentNodes();for(var i=0;i<nodes.length;i++){if(nodes[i].getAttribute('data-cf-component-id')===id)return nodes[i];}return null;}\nfunction componentData(el,type,event){var id=mode()==='editText'?(el.getAttribute('data-cf-review-field')||el.getAttribute('data-cf-component-id')||''):(el.getAttribute('data-cf-component-id')||'');var r=rect(el);var text=cleanText(el);var payload={type:type,componentId:id,componentType:mode()==='editText'?'text':el.getAttribute('data-cf-component-type')||'',sourceSectionId:el.getAttribute('data-cf-source-section-id')||'',label:el.getAttribute('data-cf-component-label')||id,selector:'[data-cf-component-id=\"'+esc(id)+'\"]',domPath:domPath(el),textHash:textHash(text),textExcerpt:text.slice(0,500),rect:r,viewport:viewport(),pageUrl:window.location.href,previewMode:params.get('cfPreviewMode')||params.get('previewMode')||''};if(event){var width=r.width||1;var height=r.height||1;var x=Math.max(0,Math.min(1,(event.clientX-r.left)/width));var y=Math.max(0,Math.min(1,(event.clientY-r.top)/height));payload.click={x:event.clientX,y:event.clientY,pageX:event.pageX,pageY:event.pageY};payload.anchor={x:x,y:y,createdFrom:'live_preview_click'};}return payload;}\nfunction allComponents(){var nodes=componentNodes();var out=[];for(var i=0;i<nodes.length;i++){out.push(componentData(nodes[i],'component'));}return out;}\nfunction bindFields(fields,authoritative){\nif(!Array.isArray(fields))return;window.__cfReviewFields=fields;\nfor(var i=0;i<fields.length;i++){\nvar field=fields[i];if(!field||typeof field.id!=='string'||typeof field.value!=='string')continue;\nif(Array.isArray(field.componentBindings)){field.componentBindings.forEach(function(binding){var nodes=queryAll(binding.domSelector||'');if(nodes.length===1&&binding.componentId)nodes[0].setAttribute('data-cf-component-id',binding.componentId);});}\nif(field.componentSelector&&field.componentId){var components=queryAll(field.componentSelector);if(components.length===1)components[0].setAttribute('data-cf-component-id',field.componentId);}\nvar existing=byId(field.id);\nif(!existing&&field.kind==='text'&&field.domSelector){var parents=queryAll(field.domSelector);if(parents.length===1){var parent=parents[0];var texts=Array.prototype.slice.call(parent.childNodes).filter(function(node){return node.nodeType===3||(node.nodeType===1&&node.hasAttribute('data-cf-review-field'));});var text=texts[field.textNodeIndex||0];var expected=field.anchorValue===undefined?field.value:field.anchorValue;var matchesValue=function(node){return node&&(node.textContent===expected||node.textContent===field.value);};if(!matchesValue(text)){var matching=texts.filter(matchesValue);text=matching.length===1?matching[0]:null;}if(text&&text.nodeType===3&&matchesValue(text)){var span=document.createElement('span');span.setAttribute('data-cf-review-field',field.id);span.textContent=text.textContent;parent.replaceChild(span,text);existing=span;}}}\nif(field.domSelector&&!existing)continue;\nif(existing){if(field.kind==='text'){existing.setAttribute('data-cf-review-field',field.id);existing.setAttribute('tabindex','0');if(authoritative){fieldOriginals[field.id]=field.value;var value=Object.prototype.hasOwnProperty.call(staged,field.id)?staged[field.id]:field.value;if(existing.textContent!==value)existing.textContent=value;}else if(!Object.prototype.hasOwnProperty.call(fieldOriginals,field.id))fieldOriginals[field.id]=existing.textContent;}continue;}\nif(field.kind==='image'){var images=queryAll('article img,main img');for(var k=0;k<images.length;k++){if(images[k].getAttribute('src')===field.value||images[k].getAttribute('src')===field.anchorValue){images[k].setAttribute('data-cf-component-id',field.id);images[k].setAttribute('data-cf-component-type','image');images[k].setAttribute('data-cf-component-label',field.label||'Image');break;}}continue;}\nif(field.kind!=='text')continue;\nvar scope=field.componentId?byId(field.componentId):null;var nodes=queryAll('article p,article h1,article h2,article h3,article h4,article li,article figcaption,article span,article a,article button,main p,main h1,main h2,main h3,main h4,main li,main figcaption,main span,main a,main button');if(scope)nodes=nodes.filter(function(node){return node===scope||scope.contains(node);});\nfor(var j=0;j<nodes.length;j++){var node=nodes[j];if(node.getAttribute('data-cf-component-id')&&node.getAttribute('data-cf-component-id').indexOf('field-')===0)continue;\nif(node.children.length===0&&(node.textContent===field.value||node.textContent===field.anchorValue)){var matches=nodes.filter(function(item){return item.children.length===0&&(item.textContent===field.value||item.textContent===field.anchorValue);});if(matches.length!==1)break;node.setAttribute('data-cf-review-field',field.id);if(!node.getAttribute('data-cf-component-id')){node.setAttribute('data-cf-component-id',field.id);node.setAttribute('data-cf-component-type','text');node.setAttribute('data-cf-component-label',field.label||'Text');}fieldOriginals[field.id]=authoritative?field.value:node.textContent;if(authoritative)node.textContent=Object.prototype.hasOwnProperty.call(staged,field.id)?staged[field.id]:field.value;break;}}\n}queueMeasure();\n}\nfunction postMeasure(){var nodes=componentNodes();for(var i=0;i<nodes.length;i++){if(!nodes[i].hasAttribute('tabindex'))nodes[i].setAttribute('tabindex','0');}post({type:'measure',components:allComponents()});}\nfunction queueMeasure(){if(measureQueued)return;measureQueued=true;window.requestAnimationFrame(function(){measureQueued=false;postMeasure();});}\nfunction setSelected(id){if(selected)selected.classList.remove('cf-inspector-selected');selected=id?byId(id):null;if(selected)selected.classList.add('cf-inspector-selected');}\nfunction show(el){var box=el.getBoundingClientRect();var name=el.getAttribute('data-cf-component-label')||el.getAttribute('data-cf-component-id')||'component';var kind=el.getAttribute('data-cf-component-type')||'component';label.textContent=name+' ('+kind+')';label.style.left=Math.max(8,Math.min(box.left,window.innerWidth-260))+'px';label.style.top=Math.max(8,box.top-32)+'px';label.hidden=false;}\nfunction suppress(event){event.preventDefault();event.stopPropagation();if(event.stopImmediatePropagation)event.stopImmediatePropagation();}\nfunction eventTarget(event){if(!event.target||!event.target.closest)return null;if(mode()==='editText'){var node=event.target.closest('[data-cf-review-field]');if(!node)return null;var id=node.getAttribute('data-cf-review-field');var fields=window.__cfReviewFields||[];return fields.some(function(field){return field.id===id&&field.kind==='text';})?node:null;}return event.target.closest('[data-cf-component-id]');}\nfunction selectionId(node){return mode()==='editText'?node.getAttribute('data-cf-review-field'):node.getAttribute('data-cf-component-id');}\nfunction stageField(id,value){var node=byId(id);if(!node||typeof value!=='string'||!node.hasAttribute('data-cf-review-field'))return;if(!Object.prototype.hasOwnProperty.call(fieldOriginals,id))fieldOriginals[id]=node.textContent;staged[id]=value;node.textContent=value;queueMeasure();}\nfunction resetFields(){Object.keys(staged).forEach(function(id){var node=byId(id);if(node)node.textContent=fieldOriginals[id];});staged={};queueMeasure();}\ndocument.addEventListener('mouseover',function(event){ensureFallbackBoundaries();var target=eventTarget(event);if(!target)return;if(active&&active!==target)active.classList.remove('cf-inspector-hover');active=target;target.classList.add('cf-inspector-hover');show(target);post(componentData(target,'hover'));},true);\ndocument.addEventListener('mouseout',function(event){if(!active)return;var next=event.relatedTarget;if(next&&active.contains(next))return;active.classList.remove('cf-inspector-hover');active=null;label.hidden=true;},true);\ndocument.addEventListener('click',function(event){ensureFallbackBoundaries();var target=eventTarget(event);var interactive=event.target&&event.target.closest?event.target.closest('a,button,input,select,textarea,label,summary,[role=\"button\"]'):null;if(target){suppress(event);setSelected(selectionId(target)||'');post(componentData(target,mode()==='comment'?'comment:create':mode()==='editText'?'text:select':'select',event));queueMeasure();return;}if(interactive){suppress(event);}},true);\ndocument.addEventListener('keydown',function(event){if(event.key!=='Enter'&&event.key!==' ')return;var target=eventTarget(event);if(!target)return;suppress(event);setSelected(selectionId(target));post(componentData(target,mode()==='comment'?'comment:create':mode()==='editText'?'text:select':'select'));},true);\ndocument.addEventListener('submit',function(event){suppress(event);},true);\nnew MutationObserver(function(){if(window.__cfReviewFields)bindFields(window.__cfReviewFields);}).observe(document.body,{childList:true,subtree:true});\ndocument.addEventListener('scroll',queueMeasure,true);window.addEventListener('resize',queueMeasure);\nwindow.addEventListener('message',function(event){if(event.source!==window.parent)return;var message=event.data;if(!message||typeof message!=='object'||message.source!=='founder-tools-inspector')return;if(message.type==='bindFields'){bindFields(message.fields,true);}else if(message.type==='stageField'){stageField(message.fieldId||message.componentId||'',message.value);}else if(message.type==='resetFields'){resetFields();}else if(message.type==='savedField'){var saved=byId(message.componentId||'');if(saved&&(saved.hasAttribute('data-cf-review-field')||saved.getAttribute('data-cf-component-type')==='text')&&typeof message.value==='string'){saved.textContent=message.value;queueMeasure();}}else if(message.type==='setMode'){window.__cfArticleInspectorMode=message.mode==='editText'?'editText':message.mode==='inspect'?'inspect':'comment';document.documentElement.setAttribute('data-cf-review-mode',mode());if(active)active.classList.remove('cf-inspector-hover');active=null;label.hidden=true;setSelected('');post({type:'ready',mode:mode()});}else if(message.type==='measureComponents'){postMeasure();}else if(message.type==='scrollToComponent'){var target=byId(message.componentId||'');if(target){target.scrollIntoView({block:'center',inline:'nearest'});setSelected(message.componentId||'');setTimeout(queueMeasure,80);}}else if(message.type==='setSelectedComponent'){setSelected(message.componentId||'');}});\npost({type:'ready',mode:mode()});\nsetTimeout(queueMeasure,0);\n}\nif(document.body)install();else document.addEventListener('DOMContentLoaded',install,{once:true});\n})();"

function ContentFactoryInspectorBridge() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!new URLSearchParams(window.location.search).has('cfInspector')) return
    const script = document.createElement('script')
    script.dataset.contentFactoryInspector = 'true'
    script.textContent = CONTENT_FACTORY_INSPECTOR_SCRIPT
    document.body.appendChild(script)
    return () => {
      script.remove()
    }
  }, [])
  return null
}

export default function ArticleContent() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <>
      <ContentFactoryInspectorBridge />
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: "/articles" },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight={TOPIC}
        headerBgColor="cyan"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <ArticleTocPlaceholder
        className="bg-transparent"
        items={[
          { href: "#intro", label: (CF_REVIEW_6f8d24ff6fe54b1caf16a2be71baf625) },
          { href: "#triage", label: (CF_REVIEW_bce01b9c869248dea59260498c494455) },
          { href: "#safeguards", label: (CF_REVIEW_add78ffbf85f4f269c7c4900071ceb92) },
          { href: "#measurement", label: (CF_REVIEW_e73d538febbb4a91ad5fc4b309cd2ed3) },
          { href: "#pilot", label: (CF_REVIEW_3921d92e20ab418abf7de7d2465675dd) },
          { href: "#conclusion", label: (CF_REVIEW_df17db2bbfed433a864cfe758fe02d54) },
        ]}
      />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <div data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Start with a clearly defined task"} data-cf-source-section-id={"intro"}>
        <h2 id="intro"><span data-cf-component-id="field-6f8d24ff6fe54b1caf16a2be71baf625" data-cf-component-type="text">{CF_REVIEW_6f8d24ff6fe54b1caf16a2be71baf625}</span></h2>
        <p><span data-cf-component-id="field-1142bfe45bcd456dacd16009466a40ee" data-cf-component-type="text">{/*cf-review:field-1142bfe45bcd456dacd16009466a40ee*/"Consider automation for repetitive customer questions only when answers can be checked against current, approved information and customers can reach a person when needed. Use AI-assisted drafts when someone needs to check the facts and wording before sending. Keep consequential decisions and sensitive interactions human-led, with a person responsible for the response."}</span></p>
        <p><span data-cf-component-id="field-bc05b29b31f243e6bb9448998bee2255" data-cf-component-type="text">{/*cf-review:field-bc05b29b31f243e6bb9448998bee2255*/"Choose the task before buying a tool. If the boundaries are unclear, keep the output as a draft for review. A small trial gives you work to inspect before handing over more of your customer-service workflow."}</span></p>
        </div>
        <div data-cf-component-id={"section:triage"} data-cf-component-type={"section"} data-cf-component-label={"Choose between automation, assistance and human handling"} data-cf-source-section-id={"triage"}>
          <h2 id="triage"><span data-cf-component-id="field-bce01b9c869248dea59260498c494455" data-cf-component-type="text">{CF_REVIEW_bce01b9c869248dea59260498c494455}</span></h2>
          <p><span data-cf-component-id="field-4b122c6fc491480aad0916ee07ba65ba" data-cf-component-type="text">{/*cf-review:field-4b122c6fc491480aad0916ee07ba65ba*/"Shortlist a frequent task whose inputs and answers you can check against reliable, current sources your business has approved. OpenAI Academy\u2019s small-business guidance recommends setting boundaries, tracing claims to sources and leaving a person responsible for decisions."}</span></p>
          <p><span data-cf-component-id="field-2380fab4767444c0b5b99ad705a72313" data-cf-component-type="text">{/*cf-review:field-2380fab4767444c0b5b99ad705a72313*/"Assess what customer information the task needs, what happens if the answer is wrong and how easily the customer can reach a person. No handling mode is automatically safe. If current information or a workable human route is missing, rule out unattended replies. For an unchanging answer, a checked saved reply may be sufficient."}</span></p>
          <p><span data-cf-component-id="field-3351c26e12ee4672a6088882651c3a00" data-cf-component-type="text">{/*cf-review:field-3351c26e12ee4672a6088882651c3a00*/"| Handling mode | Tasks to consider | Required boundary and human role |\n| --- | --- | --- |\n| Bounded automation | Opening-hours answers or general returns instructions drawn only from current, approved public information | Test the scope before unattended delivery and provide a workable route to a person. |\n| AI-assisted human replies | Clarifying approved returns steps or adjusting the tone of a routine reply | A person checks, corrects and sends each draft. |\n| Human-led handling | Disputed refunds, distressed customers and sensitive disclosures | A person owns the interaction and decision. |"}</span></p>
          <div data-cf-component-id={"image:triage"} data-cf-component-type={"image"} data-cf-component-label={"Image: Choose between automation, assistance and human handling"} data-cf-source-section-id={"triage"}>
          <ArticleImageBlock
            src={/*cf-review:field-e62c898ad7ef4a988e5a55416145f092*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d74d2688-bd5b-4871-b14c-d48648a0ab31.jpg?alt=media&token=29c2134f-bf05-4d2a-8fba-6f6f4625f56e"}
            alt={/*cf-review:field-640d04bdd19c4d76bdf644b91318e303*/"A person writes in a notebook at a wooden table beside an open laptop, smartphone, and mug."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-9f14741b431741afa9b945008c5d9067" data-cf-component-type="text">{/*cf-review:field-9f14741b431741afa9b945008c5d9067*/"Bounded automation"}</span></h3>
          <p><span data-cf-component-id="field-aa123ebdefc54f4a8d2ebfc36596168e" data-cf-component-type="text">{/*cf-review:field-aa123ebdefc54f4a8d2ebfc36596168e*/"Here, automation means delivering replies without individual pre-send approval. Explaining how to lodge a return does not authorise the system to decide a customer\u2019s eligibility or issue a refund. A person remains accountable for that boundary."}</span></p>
          <h3><span data-cf-component-id="field-e0dfb6d160ad4c6e9203c3440e1a0839" data-cf-component-type="text">{/*cf-review:field-e0dfb6d160ad4c6e9203c3440e1a0839*/"AI-assisted human replies"}</span></h3>
          <p><span data-cf-component-id="field-afba149e0d994edb89919f9108b3934e" data-cf-component-type="text">{/*cf-review:field-afba149e0d994edb89919f9108b3934e*/"OpenAI Academy advises treating polished output as a draft to evaluate. Check facts, policies and promises against the source. This approach suits work where wording can vary but customer-facing claims still need review."}</span></p>
          <h3><span data-cf-component-id="field-9a53628bbac14bbabb6147ce4ac5ea69" data-cf-component-type="text">{/*cf-review:field-9a53628bbac14bbabb6147ce4ac5ea69*/"Human-led handling"}</span></h3>
          <p><span data-cf-component-id="field-4e6964e147644833b1642c77995cdfe9" data-cf-component-type="text">{/*cf-review:field-4e6964e147644833b1642c77995cdfe9*/"Keep decisions with a person when the customer\u2019s circumstances require judgement. The consequences or sensitivity of the enquiry may rule out an automated conclusion."}</span></p>
        </div>
        <div data-cf-component-id={"section:safeguards"} data-cf-component-type={"section"} data-cf-component-label={"Make the human handover work before launch"} data-cf-source-section-id={"safeguards"}>
          <h2 id="safeguards"><span data-cf-component-id="field-add78ffbf85f4f269c7c4900071ceb92" data-cf-component-type="text">{CF_REVIEW_add78ffbf85f4f269c7c4900071ceb92}</span></h2>
          <p><span data-cf-component-id="field-421ef92e99064dfba6e881427c4b29ec" data-cf-component-type="text">{/*cf-review:field-421ef92e99064dfba6e881427c4b29ec*/"Stop the automated answer or action when approved information is missing, conflicting or outdated, the customer asks for a person, or the request falls outside the pilot\u2019s scope. Build these stop rules into the workflow, consistent with OpenAI Academy\u2019s guidance to flag missing information and retain human responsibility."}</span></p>
          <p><span data-cf-component-id="field-ed24b1dd3b0647c9ad91072378163a70" data-cf-component-type="text">{/*cf-review:field-ed24b1dd3b0647c9ad91072378163a70*/"Give customers a route to an existing staffed phone line or support inbox. Assign an owner and backup, and keep the context needed for the handover within approved systems. For enquiries outside staffed hours, state when someone will be available. Before launch, test that a routine handover reaches the right person and that the backup receives it when the owner is unavailable."}</span></p>
          <p><span data-cf-component-id="field-f7629b2b5a164146ab75c6fed48594fd" data-cf-component-type="text">{/*cf-review:field-f7629b2b5a164146ab75c6fed48594fd*/"Have the owner approve the specific tool, account, settings, permitted inputs and access before use. Check the vendor\u2019s information about storage, retention and reuse. A product label alone is not approval. The Office of the Australian Information Commissioner (OAIC) recommends checking suitability for the intended use, privacy and security risks, access to information and how human oversight will work."}</span></p>
          <div data-cf-component-id={"image:safeguards"} data-cf-component-type={"image"} data-cf-component-label={"Image: Make the human handover work before launch"} data-cf-source-section-id={"safeguards"}>
          <ArticleImageBlock
            src={/*cf-review:field-37d59964e5ec457daa48f4d8167f7c58*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-2e3280c1-0efb-43c0-9c53-f7f0c52550e5.jpg?alt=media&token=05e5a7f5-09bd-4618-b0d0-fd708b9551b9"}
            alt={/*cf-review:field-37e58bd6e805435db1306868ab62289f*/"An open laptop, mug, phone, notebook, pen and potted plant sit on a wooden desk, with a black chair, whiteboard and bookshelf behind it."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"callout:customer-data-boundary"} data-cf-component-type={"callout"} data-cf-component-label={"Keep customer information out of unapproved tools"}>
          <QuoteBlock title="Keep customer information out of unapproved tools" variant="orange">
            {"Do not enter personal or confidential customer information into unapproved AI tools. Check applicable Australian privacy obligations through OAIC guidance or qualified advice before using customer data; this is general guidance, not personalised legal advice."}
          </QuoteBlock>
        </div>
        <div data-cf-component-id={"section:measurement"} data-cf-component-type={"section"} data-cf-component-label={"Set the baseline and decision rules first"} data-cf-source-section-id={"measurement"}>
          <h2 id="measurement"><span data-cf-component-id="field-e73d538febbb4a91ad5fc4b309cd2ed3" data-cf-component-type="text">{CF_REVIEW_e73d538febbb4a91ad5fc4b309cd2ed3}</span></h2>
          <p><span data-cf-component-id="field-84bd4928af5c488899b033fc9f0710a6" data-cf-component-type="text">{/*cf-review:field-84bd4928af5c488899b033fc9f0710a6*/"Judge the pilot against the current manual process, using criteria set before launch. Faster drafting alone does not show that customer service has improved."}</span></p>
          <h3><span data-cf-component-id="field-7ac518bd522b4ab7b9d03e3a3968dad8" data-cf-component-type="text">{/*cf-review:field-7ac518bd522b4ab7b9d03e3a3968dad8*/"Measure the whole task"}</span></h3>
          <p><span data-cf-component-id="field-1dba7f7f8eaa4b14a70e1387f8cf9ba0" data-cf-component-type="text">{/*cf-review:field-1dba7f7f8eaa4b14a70e1387f8cf9ba0*/"For a representative period before the pilot, record enquiry count and type, total active handling minutes, source-checked answer accuracy, escalations and cost. Keep customer identifiers out of this measurement record. During the trial, compare like-for-like enquiries and count prompting, checking, corrections and escalation work in handling time."}</span></p>
          <p><span data-cf-component-id="field-487a5f4ad0b448958da759fdd8ded6ec" data-cf-component-type="text">{/*cf-review:field-487a5f4ad0b448958da759fdd8ded6ec*/"Define answer accuracy consistently: factually correct and complete answers divided by answers checked. Check against the approved sources, and record initial draft accuracy separately from final human-approved reply accuracy so corrections remain visible."}</span></p>
          <p><span data-cf-component-id="field-ee20fb29cbdc47f6af7cd5a70a7fe2c2" data-cf-component-type="text">{/*cf-review:field-ee20fb29cbdc47f6af7cd5a70a7fe2c2*/"Record escalation frequency as escalated enquiries divided by enquiries assessed, with reasons. Fewer handovers are not inherently better: check whether necessary handovers happened."}</span></p>
          <p><span data-cf-component-id="field-0f567ef7a8b0409a99617ea2da974642" data-cf-component-type="text">{/*cf-review:field-0f567ef7a8b0409a99617ea2da974642*/"Calculate total pilot cost from tool and usage charges, other direct trial costs, and staff time valued at a rate your business chooses. Record setup and testing separately from recurring operation, but include both in the full pilot cost."}</span></p>
          <h3><span data-cf-component-id="field-b143597a4728445b9ac5077140b4cd8d" data-cf-component-type="text">{/*cf-review:field-b143597a4728445b9ac5077140b4cd8d*/"Agree when to pause or continue"}</span></h3>
          <p><span data-cf-component-id="field-f4a70cbb25b34e1f8b171fe361622017" data-cf-component-type="text">{/*cf-review:field-f4a70cbb25b34e1f8b171fe361622017*/"Before launch, have the accountable owner record minimum accuracy and completeness requirements, acceptable handling time, a spending limit and immediate stop conditions in the pilot plan. Pause for a boundary breach, failed handover or critical error, even if replies are faster."}</span></p>
          <p><span data-cf-component-id="field-f2100fea7cf54b689b45e7a61cc22dc1" data-cf-component-type="text">{/*cf-review:field-f2100fea7cf54b689b45e7a61cc22dc1*/"At the agreed endpoint, continue only if the pilot meets the recorded criteria. Otherwise, review what failed before deciding whether to revise or stop it. A short trial does not establish general reliability or justify automatic expansion to other enquiries."}</span></p>
        </div>
        <div data-cf-component-id={"section:pilot"} data-cf-component-type={"section"} data-cf-component-label={"Draft one bounded pilot before choosing tools"} data-cf-source-section-id={"pilot"}>
          <h2 id="pilot"><span data-cf-component-id="field-3921d92e20ab418abf7de7d2465675dd" data-cf-component-type="text">{CF_REVIEW_3921d92e20ab418abf7de7d2465675dd}</span></h2>
          <p><span data-cf-component-id="field-11896d7b2aa04563a873865e63db8b64" data-cf-component-type="text">{/*cf-review:field-11896d7b2aa04563a873865e63db8b64*/"Write the task, permitted sources and review boundary before comparing products. Adapt the worksheet entries to your business, replacing the facts and thresholds."}</span></p>
          <p><span data-cf-component-id="field-dfd084fa47ad4292a7a328834008a6c4" data-cf-component-type="text">{/*cf-review:field-dfd084fa47ad4292a7a328834008a6c4*/"Resolve tool approval and fallback staffing before spending, and record the exact product and account approval before launch."}</span></p>
          <div data-cf-style-role="callout" data-cf-scenario="true">
            <QuoteBlock title="Hypothetical example" variant="purple">
              <span style={{ display: 'block' }}><strong><span data-cf-component-id="field-b3fe3bc60d6a439ba66f034d643c280e" data-cf-component-type="text">{/*cf-review:field-b3fe3bc60d6a439ba66f034d643c280e*/"Pilot worksheet"}</span></strong></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><span data-cf-component-id="field-3342ffccef0c467c9531ba97bc03580e" data-cf-component-type="text">{/*cf-review:field-3342ffccef0c467c9531ba97bc03580e*/"Banksia Homewares plans to trial draft-only return-lodgement instructions using approved public information. Mia will resolve the tool approval and launch dates before the trial begins."}</span></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><strong><span data-cf-component-id="field-0a6bbac84e5844c3801226f6a2a48400" data-cf-component-type="text">{/*cf-review:field-0a6bbac84e5844c3801226f6a2a48400*/"Scope and exclusions"}</span>:</strong> <span data-cf-component-id="field-5670353b5b8b4f9ea8b6d960ef9920e5" data-cf-component-type="text">{/*cf-review:field-5670353b5b8b4f9ea8b6d960ef9920e5*/"Draft general return-lodgement instructions. Exclude eligibility decisions, refund approvals, order lookup and automatic sending."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-a439c6ad99c74ac2a133d3aea7263d07" data-cf-component-type="text">{/*cf-review:field-a439c6ad99c74ac2a133d3aea7263d07*/"Tool and approved sources"}</span>:</strong> <span data-cf-component-id="field-cb5f97b61065421b8299f4241004e5d5" data-cf-component-type="text">{/*cf-review:field-cb5f97b61065421b8299f4241004e5d5*/"An owner-approved business AI workspace is required. Exact product and account selection and approval are pending. Use only Banksia Homewares\u2019 checked public \u2018How to request a return\u2019 page and support contact details. Record the source review date before launch."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-7008855132f241ccbe3317cfea058ad1" data-cf-component-type="text">{/*cf-review:field-7008855132f241ccbe3317cfea058ad1*/"Inputs"}</span>:</strong> <span data-cf-component-id="field-66bd737747dc450ebe98e56d73cf0b0c" data-cf-component-type="text">{/*cf-review:field-66bd737747dc450ebe98e56d73cf0b0c*/"Staff-entered generic enquiry categories and fictional test questions. No copied customer messages."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-3f101bed1ac54a08b272b2911be02219" data-cf-component-type="text">{/*cf-review:field-3f101bed1ac54a08b272b2911be02219*/"Ownership and review"}</span>:</strong> <span data-cf-component-id="field-cea928c8ddd440f59640420712cab1d1" data-cf-component-type="text">{/*cf-review:field-cea928c8ddd440f59640420712cab1d1*/"Mia is accountable, with supervisor Lee as backup. Staff verify every reply against approved sources before sending through the existing support inbox."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-0fdadca384674c73a29e5e8714ddb809" data-cf-component-type="text">{/*cf-review:field-0fdadca384674c73a29e5e8714ddb809*/"Fallback"}</span>:</strong> <span data-cf-component-id="field-ca7a2f2a0c7b44b38e7efbea6a0e7bce" data-cf-component-type="text">{/*cf-review:field-ca7a2f2a0c7b44b38e7efbea6a0e7bce*/"Apply the handover rules above: stop drafting and assign to Mia or Lee in the support inbox. The existing support phone is available during staffed hours."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-812d24e7bce74b4ca9c661403d1f017b" data-cf-component-type="text">{/*cf-review:field-812d24e7bce74b4ca9c661403d1f017b*/"Duration and readiness"}</span>:</strong> <span data-cf-component-id="field-56168b7c7b4c41988bbf2b5bdf3fb0d5" data-cf-component-type="text">{/*cf-review:field-56168b7c7b4c41988bbf2b5bdf3fb0d5*/"10 business days, up to 20 eligible enquiries. Enter start and end dates before launch. Boundary tests must pass first."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-1457bfb618d54d5796dd3beae9a2eb62" data-cf-component-type="text">{/*cf-review:field-1457bfb618d54d5796dd3beae9a2eb62*/"Manual baseline"}</span>:</strong> <span data-cf-component-id="field-4d608b1e83da4607a5749750323ee36e" data-cf-component-type="text">{/*cf-review:field-4d608b1e83da4607a5749750323ee36e*/"20 comparable enquiries took 80 active handling minutes. Of the 20 initial replies, 19 were correct and complete. Of the 20 enquiries, 2 were escalated."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-f7c1fcca71eb45ef9443106bf6b379cd" data-cf-component-type="text">{/*cf-review:field-f7c1fcca71eb45ef9443106bf6b379cd*/"Continue or stop"}</span>:</strong> <span data-cf-component-id="field-bfb9e9246187476f892aaa84092ffaa1" data-cf-component-type="text">{/*cf-review:field-bfb9e9246187476f892aaa84092ffaa1*/"For 20 comparable enquiries: at most 70 active minutes including checking, corrections and escalation, and at least 19 of 20 initial drafts correct and complete. Every sent reply must be verified. No critical errors. Stop immediately for boundary breaches or failed required handovers. An incomplete comparison means no success decision."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-64e7f12fb32a4d40896bc83239e98a1a" data-cf-component-type="text">{/*cf-review:field-64e7f12fb32a4d40896bc83239e98a1a*/"Spending"}</span>:</strong> <span data-cf-component-id="field-76360ea5d03143f7a10faf8421831fe8" data-cf-component-type="text">{/*cf-review:field-76360ea5d03143f7a10faf8421831fe8*/"A$100 incremental cash plus 3 total staff hours covering setup, testing, handling and evaluation. At A$40 per hour, the all-in cap is A$220. Pause at either resource limit."}</span></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><span data-cf-component-id="field-d51b5787f57143b5850455f49cf583f0" data-cf-component-type="text">{/*cf-review:field-d51b5787f57143b5850455f49cf583f0*/"Finish with a scoped use case and draft plan, then resolve outstanding approvals."}</span></span>
            </QuoteBlock>
          </div>
          <div data-cf-component-id={"image:pilot"} data-cf-component-type={"image"} data-cf-component-label={"Image: Draft one bounded pilot before choosing tools"} data-cf-source-section-id={"pilot"}>
          <ArticleImageBlock
            src={/*cf-review:field-45e8202803f242f1ba7e015820f40bdb*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-20e47494-0096-4c6f-a173-d90412ca3011.jpg?alt=media&token=92649032-1987-4ab1-9911-e9d64c17562c"}
            alt={/*cf-review:field-d3bb960642fc446d8fbee6f3c22e2009*/"Two people lean over a notebook, one holding a pen, with a laptop beside them and a plant in the background."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"section:conclusion"} data-cf-component-type={"section"} data-cf-component-label={"Review your plan with the people who will handle the work"} data-cf-source-section-id={"conclusion"}>
          <h2 id="conclusion"><span data-cf-component-id="field-df17db2bbfed433a864cfe758fe02d54" data-cf-component-type="text">{CF_REVIEW_df17db2bbfed433a864cfe758fe02d54}</span></h2>
          <p><span data-cf-component-id="field-1625fd09f80c4fdc9bb2179bb17885be" data-cf-component-type="text">{/*cf-review:field-1625fd09f80c4fdc9bb2179bb17885be*/"Check who is accountable for the shortlisted task, when the plan requires human review and whether the fallback will reach someone."}</span></p>
          <p><span data-cf-component-id="field-4c11e1bd139549c8849562eb31f53575" data-cf-component-type="text">{/*cf-review:field-4c11e1bd139549c8849562eb31f53575*/"Ask peers: \u201cWhich exception have I missed?\u201d and \u201cWould a checked saved reply solve this more simply?\u201d Discuss the workflow without sharing customer information, and use the conversation to identify gaps before launch."}</span></p>
          <p><span data-cf-component-id="field-24154a616ad545dcb770ea51e7c6cc15" data-cf-component-type="text">{/*cf-review:field-24154a616ad545dcb770ea51e7c6cc15*/"For optional peer learning, [Explore MLAI events](/events). Check the organiser\u2019s current event availability, format and cost before booking. Attendance does not guarantee implementation advice."}</span></p>
          <div data-cf-component-id={"image:conclusion"} data-cf-component-type={"image"} data-cf-component-label={"Image: Review your plan with the people who will handle the work"} data-cf-source-section-id={"conclusion"}>
          <ArticleImageBlock
            src={/*cf-review:field-31e8574087954af3a44cea181a04f9b8*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f5817ae9-a15f-4a0a-bfbd-0afc6fdbb3e8.jpg?alt=media&token=3c32197e-b3b1-4cd3-b8bb-4e03dc9a853c"}
            alt={/*cf-review:field-034be8e4e45b4b10a72d67aca835e702*/"Four people sit around a wooden table with a laptop, cups and papers. One gestures with both hands. Plants stand near large windows."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free worksheet"
            title={"Human-Controlled AI Customer Service Pilot Worksheet"}
            description="Fill in a practical plan for one AI customer-service trial before you compare tools or put automated replies in front of customers."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fhow-to-use-ai-in-customer-service-and-keep-people-in-control-worksheet-29b3356c.pdf?alt=media&token=cb8a5c4f-3039-40c6-a1bb-7b4ae9116173"
            accent="purple"
            previewCards={[
              {
                title: "Pilot planning worksheet",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Handover rules",
                subtitle: 'PDF',
                color: "bg-[#00ffd7]",
                textColor: "text-black",
                rotationClass: "rotate-[7deg]",
              },
            ]}
          />
        </div>

      <ArticleReferences
          references={[
            {id: 1, href: "https://business.gov.au/online-and-digital/artificial-intelligence", title: "Artificial intelligence (AI) | business.gov.au", publisher: "", category: "guide"},
            {id: 2, href: "https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products", title: "Guidance on privacy and the use of commercially available AI products | OAIC", publisher: "", category: "guide"},
            {id: 3, href: "https://academy.openai.com/public/resources/openai-academy-small-business-resource-hub-2026-06-03", title: "ChatGPT for Small Business | Workshop Resource Hub - Resource | OpenAI Academy", publisher: "", category: "guide"},
          ]}
          heading="Sources & further reading"
        />

        <ArticleDisclaimer />

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Get in touch about MLAI Studio"
            body="Browse testimonials and case studies from MLAI Studio, understand how MLAI Studio works, the price per month and how many builder hours that buys you."
            buttonText="Explore MLAI Studio"
            buttonHref="https://mlai.au/mlai-studio"
          />
        </div>
      </div>

        <div data-cf-component-id={"author-bio"} data-cf-component-type={"author-bio"} data-cf-component-label={"About the Author"}>
          <AuthorBio author={authorDetails} />
        </div>

        <div className="mt-12" data-cf-component-id={"faq"} data-cf-component-type={"faq"} data-cf-component-label={"FAQ"}>
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleFooterNav backHref="/articles" topHref="#" />
    </>
  )
}
