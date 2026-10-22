
const CF_REVIEW_1b594a0f259b46a99e0e7bc6ade51331 = (/*cf-review:field-1b594a0f259b46a99e0e7bc6ade51331*/"Start with routine reply drafts");
const CF_REVIEW_b316b0dd159e4a34bef9da0edc72b60d = (/*cf-review:field-b316b0dd159e4a34bef9da0edc72b60d*/"Choose a use case and draft its pilot record");
const CF_REVIEW_80c56934f3854ad3895703addc529dd7 = (/*cf-review:field-80c56934f3854ad3895703addc529dd7*/"Approve the information and the human handover");
const CF_REVIEW_a07c49effab340b7b0c7c2115e2cacdd = (/*cf-review:field-a07c49effab340b7b0c7c2115e2cacdd*/"Set the measures before you start");
const CF_REVIEW_acb063f7986f41b68f47e6a58a5d9c21 = (/*cf-review:field-acb063f7986f41b68f47e6a58a5d9c21*/"A hypothetical pilot for routine reply drafts");
const CF_REVIEW_1a3ebf2c00ca44a999900aa01745ac38 = (/*cf-review:field-1a3ebf2c00ca44a999900aa01745ac38*/"Take a draft plan to your next conversation");
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

const TOPIC = (/*cf-review:field-4257eb6b4243457c80130a896dc483b5*/"How Australian Startups Can Test AI for Customer Service")
export const CATEGORY = "featured"
export const SLUG = "how-australian-startups-can-test-ai-for-customer-service"
export const DATE_PUBLISHED = "2026-10-22"
export const DATE_MODIFIED = "2026-10-22"
export const DESCRIPTION = "Choose a customer-service AI use case and draft a small pilot with data limits, human review, clear measures and a stop rule before buying tools."
const HERO_IMAGE = (/*cf-review:field-b326239178244ea78be3135588b6ee06*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-558630ed-22eb-4360-88be-6f4da76ee87e.jpg?alt=media&token=cbaf1473-25d5-4ad9-958e-7a5b160f1be1")
const HERO_IMAGE_ALT = "Two people look at an open laptop, one gesturing with a hand and the other wearing glasses. A leafy plant is behind them."
export const FEATURED_FOCUS = "startups"

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
  { id: 1, question: "What if our FAQ pages disagree?", answer: "Resolve conflicting FAQ pages before including those questions in the pilot. Name a person responsible for the source material and use a dated set of approved facts; the AI must not decide which policy is correct." },
  { id: 2, question: "Does reviewing every reply count as escalation?", answer: "No. Routine review checks every draft before sending; escalation requires an additional human decision or handoff. Refunds, complaints, sensitive enquiries and unsupported answers must go to the named human decision-maker." },
  { id: 3, question: "What if too few enquiries arrive before the pilot ends?", answer: "Record an inconclusive result if too few eligible enquiries arrive before the agreed deadline. Make a new decision before extending the trial. A small sample can inform a local next step but cannot establish a general productivity claim." },
  { id: 4, question: "Does faster drafting mean the pilot saved money?", answer: "No. Faster drafting alone does not establish savings because preparation, review, corrections and handovers also take staff time. Calculate total pilot cost using incremental tool charges and staff time at a declared hourly cost, including setup and training." },
]

export const summaryHighlights = {
  heading: "Key facts",
  intro: "Choose a customer-service AI use case and draft a small pilot with data limits, human review, clear measures and a stop rule before buying tools.",
  items: [
    { label: "Can I use AI for customer service?", description: "AI can draft routine replies, sort enquiries or find information for staff. Reply drafting is a candidate when questions repeat, approved answers are current and a person checks every response before sending." },
    { label: "When should a startup defer customer-service AI?", description: "Defer AI when enquiry volume is low, source documents conflict, no reviewer is available or data handling cannot be approved. Improving FAQs or using saved replies remains a valid alternative." },
    { label: "What should a customer-service AI pilot measure?", description: "Measure complete handling time, draft accuracy against approved sources, escalation frequency and total cost, including staff effort. Set success thresholds and stop rules before testing, with review and correction included in the workload." },
  ],
}

export const articleMeta = {
  title: "How Australian Startups Can Test AI for Customer Service",
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
          { href: "#intro", label: (CF_REVIEW_1b594a0f259b46a99e0e7bc6ade51331) },
          { href: "#decision-worksheet", label: (CF_REVIEW_b316b0dd159e4a34bef9da0edc72b60d) },
          { href: "#data-and-approval", label: (CF_REVIEW_80c56934f3854ad3895703addc529dd7) },
          { href: "#measurement", label: (CF_REVIEW_a07c49effab340b7b0c7c2115e2cacdd) },
          { href: "#hypothetical-pilot", label: (CF_REVIEW_acb063f7986f41b68f47e6a58a5d9c21) },
          { href: "#conclusion", label: (CF_REVIEW_1a3ebf2c00ca44a999900aa01745ac38) },
        ]}
      />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <div data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Start with routine reply drafts"} data-cf-source-section-id={"intro"}>
        <h2 id="intro"><span data-cf-component-id="field-1b594a0f259b46a99e0e7bc6ade51331" data-cf-component-type="text">{CF_REVIEW_1b594a0f259b46a99e0e7bc6ade51331}</span></h2>
        <p><span data-cf-component-id="field-05ed470265b94e8696d5dba25a546905" data-cf-component-type="text">{/*cf-review:field-05ed470265b94e8696d5dba25a546905*/"If your small team repeatedly answers the same questions and has current, approved answers, try drafting routine replies for a person to check. AI can also sort enquiries or find information for staff. You do not need to buy a public-facing chatbot to try it. Choose a narrow task and name its reviewer."}</span></p>
        <p><span data-cf-component-id="field-eeaa3ece5e4e49cc96f1e5b32032b7da" data-cf-component-type="text">{/*cf-review:field-eeaa3ece5e4e49cc96f1e5b32032b7da*/"Generative AI produces content from instructions and supplied information. Fluent wording does not establish that an answer is correct. The Australian Government\u2019s business.gov.au guidance recommends identifying a business problem before choosing a tool."}</span></p>
        </div>
        <div data-cf-component-id={"section:decision-worksheet"} data-cf-component-type={"section"} data-cf-component-label={"Choose a use case and draft its pilot record"} data-cf-source-section-id={"decision-worksheet"}>
          <h2 id="decision-worksheet"><span data-cf-component-id="field-b316b0dd159e4a34bef9da0edc72b60d" data-cf-component-type="text">{CF_REVIEW_b316b0dd159e4a34bef9da0edc72b60d}</span></h2>
          <p><span data-cf-component-id="field-71b7f9a3e43d4230ba0975f14c6aae80" data-cf-component-type="text">{/*cf-review:field-71b7f9a3e43d4230ba0975f14c6aae80*/"Choose a task that repeats often enough to investigate, with answers your team can verify. Use your enquiry history and documents to compare workflow fit. The worksheet makes no product recommendations or savings promises."}</span></p>
          <p><span data-cf-component-id="field-451ed7df8fda4dc5aff9463bf62a2e99" data-cf-component-type="text">{/*cf-review:field-451ed7df8fda4dc5aff9463bf62a2e99*/"Copy the comparison and pilot record into your working notes."}</span></p>
          <div data-cf-component-id={"image:decision-worksheet"} data-cf-component-type={"image"} data-cf-component-label={"Image: Choose a use case and draft its pilot record"} data-cf-source-section-id={"decision-worksheet"}>
          <ArticleImageBlock
            src={/*cf-review:field-caf1a7b85877490688909af4ff3fb1fb*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-8de8a85d-4408-4108-b336-1e56a5308375.jpg?alt=media&token=1d671fdf-e04b-4905-a2a7-953b0cb133a6"}
            alt={/*cf-review:field-4a88f5e42acf4774b7a545742d2c191e*/"Person writes in an open notebook on a wooden table beside a laptop, a mug, printed photographs and a potted plant."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-72de0e972011470f9d1dd7de02d4525e" data-cf-component-type="text">{/*cf-review:field-72de0e972011470f9d1dd7de02d4525e*/"Compare the options"}</span></h3>
          <p><span data-cf-component-id="field-270a5daa88024e9cb2d21133b38c5bc4" data-cf-component-type="text">{/*cf-review:field-270a5daa88024e9cb2d21133b38c5bc4*/"Reply drafting from frequently asked questions (FAQs) suits repeated routine enquiries with current, approved answers. Limit inputs to non-identifying question text and public facts. Manual draft-only testing avoids inbox integration. Without review, misstated instructions or policy could reach a customer."}</span></p>
          <p><span data-cf-component-id="field-4756b11d2c1848f78217bd7bd84661f3" data-cf-component-type="text">{/*cf-review:field-4756b11d2c1848f78217bd7bd84661f3*/"Enquiry triage means sorting enquiries for the right person. Consider it when sorting a queue consumes staff time and you have clear categories and routing rules. Incoming messages may contain personal or sensitive information. Staff-checked labels avoid automatic routing, but a wrong label could delay an urgent or sensitive enquiry."}</span></p>
          <p><span data-cf-component-id="field-1eb59582348443ddb31a95e647acf7de" data-cf-component-type="text">{/*cf-review:field-1eb59582348443ddb31a95e647acf7de*/"Internal knowledge lookup suits repeated staff searches through maintained, authoritative documents. Confidential material may need restricted access. Preparing a small permitted document set differs from integrating a whole knowledge system. An incorrect answer could lead staff to follow the wrong procedure."}</span></p>
          <h3><span data-cf-component-id="field-95314867e7a34b55800a267f769be1e9" data-cf-component-type="text">{/*cf-review:field-95314867e7a34b55800a267f769be1e9*/"Record your pilot"}</span></h3>
          <p><span data-cf-component-id="field-0d704cdcae8044a999a15a1c7bf132b1" data-cf-component-type="text">{/*cf-review:field-0d704cdcae8044a999a15a1c7bf132b1*/"Defer if volume is low, sources conflict, review capacity is absent or data handling cannot be approved. Improving FAQs or using saved replies may be enough."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-09a96384f8d643c4b04b3374591d4386" data-cf-component-type="text">{/*cf-review:field-09a96384f8d643c4b04b3374591d4386*/"Record the chosen task or deferral, rationale, scope and exclusions."}</span></li>
            <li><span data-cf-component-id="field-8728da32f8ec4d84a27a3856141f2bfd" data-cf-component-type="text">{/*cf-review:field-8728da32f8ec4d84a27a3856141f2bfd*/"Name the accountable owner and reviewer, and list outstanding approvals."}</span></li>
            <li><span data-cf-component-id="field-cf8a935f92e94fd4a4b7c87809145ccc" data-cf-component-type="text">{/*cf-review:field-cf8a935f92e94fd4a4b7c87809145ccc*/"Identify the approved tool and settings, source versions, permitted data and approval status."}</span></li>
            <li><span data-cf-component-id="field-929ac57a838c4ece8b453f80be124926" data-cf-component-type="text">{/*cf-review:field-929ac57a838c4ece8b453f80be124926*/"Record manual handling measures and a comparable sample for the baseline."}</span></li>
            <li><span data-cf-component-id="field-a85d3e659efc4513aa0159d170eaf421" data-cf-component-type="text">{/*cf-review:field-a85d3e659efc4513aa0159d170eaf421*/"Set dates, a case cap, a staff-hour cap and an A$ spending cap."}</span></li>
            <li><span data-cf-component-id="field-135b20fc33a042e79085849dcfd5be9d" data-cf-component-type="text">{/*cf-review:field-135b20fc33a042e79085849dcfd5be9d*/"Specify approval before sending, escalation reasons and the human decision-maker."}</span></li>
            <li><span data-cf-component-id="field-6020740f91154421984b1153fdb321a2" data-cf-component-type="text">{/*cf-review:field-6020740f91154421984b1153fdb321a2*/"Set numerical success thresholds using the measures below."}</span></li>
            <li><span data-cf-component-id="field-3c88dc5878fe4cea8618ba01577391cf" data-cf-component-type="text">{/*cf-review:field-3c88dc5878fe4cea8618ba01577391cf*/"Define stop triggers, a rollback owner and the return-to-manual process."}</span></li>
          </ul>
        </div>
        <div data-cf-component-id={"section:data-and-approval"} data-cf-component-type={"section"} data-cf-component-label={"Approve the information and the human handover"} data-cf-source-section-id={"data-and-approval"}>
          <h2 id="data-and-approval"><span data-cf-component-id="field-80c56934f3854ad3895703addc529dd7" data-cf-component-type="text">{CF_REVIEW_80c56934f3854ad3895703addc529dd7}</span></h2>
          <p><span data-cf-component-id="field-19cd17cd35cb4cf7a4419f48b3dfe643" data-cf-component-type="text">{/*cf-review:field-19cd17cd35cb4cf7a4419f48b3dfe643*/"Name someone responsible for the source material and collect a small, dated set of approved facts. Resolve conflicting FAQ pages before including those questions in the pilot; the model must not decide which policy is correct."}</span></p>
          <p><span data-cf-component-id="field-d25252f36dc44290a5b0cb778400a073" data-cf-component-type="text">{/*cf-review:field-d25252f36dc44290a5b0cb778400a073*/"Before approving a tool, check how the vendor handles inputs and outputs: whether they can be used for model training, where they are stored, who can access them, and how retention and deletion work. A paid subscription alone does not establish suitability."}</span></p>
          <p><span data-cf-component-id="field-7f639b33077e43a2af049063dedfea4d" data-cf-component-type="text">{/*cf-review:field-7f639b33077e43a2af049063dedfea4d*/"Consult the Office of the Australian Information Commissioner\u2019s guidance on commercially available AI products and seek appropriate professional guidance about Australian privacy obligations that apply to your business."}</span></p>
          <p><span data-cf-component-id="field-be6ffe484c4946a0a9ed6fba0c51729f" data-cf-component-type="text">{/*cf-review:field-be6ffe484c4946a0a9ed6fba0c51729f*/"Before testing, name the reviewer and the person who handles exceptions. Require the reviewer to check every reply against approved sources and correct it before sending, consistent with business.gov.au\u2019s advice to verify AI-generated information against trustworthy sources. Refunds, complaints, sensitive enquiries and answers the sources cannot support must go to the named human decision-maker. Keep sending under human control: the AI must not independently promise a refund, approve an exception or make another commitment to a customer."}</span></p>
          <div data-cf-component-id={"image:data-and-approval"} data-cf-component-type={"image"} data-cf-component-label={"Image: Approve the information and the human handover"} data-cf-source-section-id={"data-and-approval"}>
          <ArticleImageBlock
            src={/*cf-review:field-9b455c88f7e74f06bae3e7a464751324*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-618ca00c-995c-4f47-ab9c-23b96a0950b3.jpg?alt=media&token=95d808bb-1046-48ed-af9f-8b2052a8fd83"}
            alt={/*cf-review:field-d078e2cd21bc45609d1c93917b5774d4*/"An open laptop, stacked books, an open notebook with a pen, and a mug on a wooden table beside a window and leafy plant."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="When an enquiry falls outside the data boundary" variant="orange">
            <span data-cf-component-id="field-a3b36cc76ac64c60b4f6980d466b910e" data-cf-component-type="text">{/*cf-review:field-a3b36cc76ac64c60b4f6980d466b910e*/"If an enquiry cannot be prepared within the agreed data boundaries, keep it in the existing manual workflow until the accountable owner resolves the approval."}</span>
          </QuoteBlock>
        </div>
        <div data-cf-component-id={"callout:unapproved-data-warning"} data-cf-component-type={"callout"} data-cf-component-label={"Keep customer data out of unapproved tools"}>
          <QuoteBlock title="Keep customer data out of unapproved tools" variant="orange">
            {"Do not enter confidential or personal customer information into unapproved tools. Until the tool and intended data use are approved, prepare with fictional enquiries and approved public facts."}
          </QuoteBlock>
        </div>
        <div data-cf-component-id={"section:measurement"} data-cf-component-type={"section"} data-cf-component-label={"Set the measures before you start"} data-cf-source-section-id={"measurement"}>
          <h2 id="measurement"><span data-cf-component-id="field-a07c49effab340b7b0c7c2115e2cacdd" data-cf-component-type="text">{CF_REVIEW_a07c49effab340b7b0c7c2115e2cacdd}</span></h2>
          <p><span data-cf-component-id="field-0812e66c7b83497389c7769d55a59b87" data-cf-component-type="text">{/*cf-review:field-0812e66c7b83497389c7769d55a59b87*/"Chatbase\u2019s customer-service guide recommends tracking response time, escalation and quality. Use the proposed measures below for your draft-only pilot, without treating vendor claims as benchmarks."}</span></p>
          <h3><span data-cf-component-id="field-c013bc682cc5447e8f4c5d1fa00e65a3" data-cf-component-type="text">{/*cf-review:field-c013bc682cc5447e8f4c5d1fa00e65a3*/"Compare the whole task"}</span></h3>
          <p><span data-cf-component-id="field-6c5bd2527bd14f32b81d56640e26ac87" data-cf-component-type="text">{/*cf-review:field-6c5bd2527bd14f32b81d56640e26ac87*/"Your baseline is the current manual process measured before introducing AI. Compare similar routine enquiries using identical start and finish points. Assisted handling time includes preparation, prompting, waiting that occupies staff, review, correction, handover and sending. Track setup and training separately, but include them in total pilot effort. Generation speed alone is not a fair comparison."}</span></p>
          <p><span data-cf-component-id="field-b00a5c81f18d4b1e8d55bf378f1823c1" data-cf-component-type="text">{/*cf-review:field-b00a5c81f18d4b1e8d55bf378f1823c1*/"Calculate draft accuracy as drafts whose factual claims and necessary instructions match approved sources without factual correction, divided by all drafts reviewed. Record serious errors separately."}</span></p>
          <p><span data-cf-component-id="field-1444b9c0b7364337b2cbe17b89300c96" data-cf-component-type="text">{/*cf-review:field-1444b9c0b7364337b2cbe17b89300c96*/"Calculate escalation frequency as cases requiring an additional human decision or handoff, divided by all cases entering the pilot workflow. Routine draft review is not escalation. Record reasons and missed required escalations: a lower rate can conceal failures to seek help."}</span></p>
          <p><span data-cf-component-id="field-455c662ee3324f6193c6bdf103ee4d6f" data-cf-component-type="text">{/*cf-review:field-455c662ee3324f6193c6bdf103ee4d6f*/"Total pilot cost is incremental tool and usage charges plus staff time at a declared hourly cost. Include all pilot effort, including escalations, without counting staff minutes twice. Show cash spending and labour cost separately."}</span></p>
          <h3><span data-cf-component-id="field-41b1c8771edf464da98f7e37d0212ad9" data-cf-component-type="text">{/*cf-review:field-41b1c8771edf464da98f7e37d0212ad9*/"Decide what would justify continuing"}</span></h3>
          <p><span data-cf-component-id="field-6d67ef7ac70c449db3e43ff0d7401510" data-cf-component-type="text">{/*cf-review:field-6d67ef7ac70c449db3e43ff0d7401510*/"Set numerical thresholds for handling time, draft accuracy, escalation performance and cost before testing. Specify critical safety failures and approval breaches that require an immediate stop, alongside case, time and spending limits. If a stop condition occurs, return to the manual process and investigate before proposing another trial."}</span></p>
          <p><span data-cf-component-id="field-72e05e1f475145d9918607deddff69d9" data-cf-component-type="text">{/*cf-review:field-72e05e1f475145d9918607deddff69d9*/"Continue only when the agreed quality, safety, time and cost conditions are met. If too few eligible enquiries arrive before the deadline, record an inconclusive result. Extending the trial requires a new decision. A small sample can inform your next local decision; it cannot establish a general productivity claim."}</span></p>
        </div>
        <div data-cf-component-id={"section:hypothetical-pilot"} data-cf-component-type={"section"} data-cf-component-label={"A hypothetical pilot for routine reply drafts"} data-cf-source-section-id={"hypothetical-pilot"}>
          <h2 id="hypothetical-pilot"><span data-cf-component-id="field-acb063f7986f41b68f47e6a58a5d9c21" data-cf-component-type="text">{CF_REVIEW_acb063f7986f41b68f47e6a58a5d9c21}</span></h2>
          <p><span data-cf-component-id="field-ca61e50da2ed4e66b1786a9674cf0f6c" data-cf-component-type="text">{/*cf-review:field-ca61e50da2ed4e66b1786a9674cf0f6c*/"Suppose a small software startup chooses reply drafting for recurring questions about exporting reports. These illustrative limits and thresholds are not industry standards, tested results or MLAI customer evidence. Drafting suits this workload better than enquiry sorting or internal lookup because questions repeat and maintained public instructions provide a narrow source set."}</span></p>
          <p><span data-cf-component-id="field-a7629ba907f94d17a383c59b40ae18ac" data-cf-component-type="text">{/*cf-review:field-a7629ba907f94d17a383c59b40ae18ac*/"The founder owns the pilot, excluding account-specific troubleshooting and all mandatory-escalation cases described above. Before assisted testing, the team measures comparable manual handling times, leaving the baseline result blank until measured."}</span></p>
          <p><span data-cf-component-id="field-fd75b63ddb774cd48d6d483c03709164" data-cf-component-type="text">{/*cf-review:field-fd75b63ddb774cd48d6d483c03709164*/"The proposed limits are two weeks, 20 eligible draft cases, four hours of total staff time and A$50 in incremental tool charges. At an assumed labour cost of A$50 per hour, the combined budget ceiling is A$250. These budget choices do not represent vendor prices or predicted expenditure."}</span></p>
          <p><span data-cf-component-id="field-3d92db99f86f4eea8bff38da4f941d03" data-cf-component-type="text">{/*cf-review:field-3d92db99f86f4eea8bff38da4f941d03*/"The team prepares fictional questions and a dated, approved public help-page extract. After recording tool and data approvals, it enters only approved, non-identifying task text from eligible live enquiries into the approved tool. The founder checks every draft against the extract, corrects it and manually sends the final reply. The AI receives no inbox send permission. Anything outside scope goes to the named human decision-maker."}</span></p>
          <p><span data-cf-component-id="field-21869505ba814570b6f4519d745c313a" data-cf-component-type="text">{/*cf-review:field-21869505ba814570b6f4519d745c313a*/"The record uses the handling-time, accuracy, escalation and cost measures above. Setup and training count towards the staff-time limit."}</span></p>
          <p><span data-cf-component-id="field-08fae076743748b4955913c8359a71d1" data-cf-component-type="text">{/*cf-review:field-08fae076743748b4955913c8359a71d1*/"Before starting, the founder records the continue conditions: at least a 20% reduction in median total handling time against the measured baseline, at least 19 of 20 drafts factually correct without correction, no missed mandatory escalations and costs within the agreed limits. An unplanned handoff rate above 20% prompts a scope review, never pressure to avoid necessary escalation."}</span></p>
          <p><span data-cf-component-id="field-18e7429e145a4c46b02bca55771527d3" data-cf-component-type="text">{/*cf-review:field-18e7429e145a4c46b02bca55771527d3*/"The founder handles rollback and investigation if a stop condition occurs. Time or spending limits also end testing. The output is a proposed pilot record ready for approval, with results unfilled. Meeting the conditions would justify considering another bounded test, not automatically launching a public chatbot."}</span></p>
          <div data-cf-component-id={"image:hypothetical-pilot"} data-cf-component-type={"image"} data-cf-component-label={"Image: A hypothetical pilot for routine reply drafts"} data-cf-source-section-id={"hypothetical-pilot"}>
          <ArticleImageBlock
            src={/*cf-review:field-c8991fa308464636b95567c4867c4c8e*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-c3a0eacc-8d00-435a-927e-928eb07f0d51.jpg?alt=media&token=ace861ba-1c35-4d2d-bbc1-277c4e4fd894"}
            alt={/*cf-review:field-cb994eb5e7544634ab1b27c0d16f460a*/"Close-up of a person resting their hand against their mouth and looking toward a screen, with a blurred plant in the background."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"section:conclusion"} data-cf-component-type={"section"} data-cf-component-label={"Take a draft plan to your next conversation"} data-cf-source-section-id={"conclusion"}>
          <h2 id="conclusion"><span data-cf-component-id="field-1a3ebf2c00ca44a999900aa01745ac38" data-cf-component-type="text">{CF_REVIEW_1a3ebf2c00ca44a999900aa01745ac38}</span></h2>
          <p><span data-cf-component-id="field-fe5bb56519b64f368dfb68261e6dec92" data-cf-component-type="text">{/*cf-review:field-fe5bb56519b64f368dfb68261e6dec92*/"Keep your pilot plan in draft until the named owner resolves outstanding approvals. You can discuss the chosen use case or documented decision to defer before committing money or connecting customer systems."}</span></p>
          <p><span data-cf-component-id="field-6c2bc98c97f14cee94dac7e8056dd4a9" data-cf-component-type="text">{/*cf-review:field-6c2bc98c97f14cee94dac7e8056dd4a9*/"Ask peers about their own trials: which corrections consumed the most time, which vendor data controls did they verify, and what made them stop or narrow the trial? Use their answers to question your assumptions. Another business\u2019s experience is not proof that your plan will work."}</span></p>
          <p><span data-cf-component-id="field-a0b5d7df11ee4755bc782469b4285221" data-cf-component-type="text">{/*cf-review:field-a0b5d7df11ee4755bc782469b4285221*/"Explore MLAI events for optional peer learning. Availability, format and cost depend on the organiser\u2019s event page. Attendance does not guarantee one-to-one implementation advice or replace running a pilot."}</span></p>
          <div data-cf-component-id={"image:conclusion"} data-cf-component-type={"image"} data-cf-component-label={"Image: Take a draft plan to your next conversation"} data-cf-source-section-id={"conclusion"}>
          <ArticleImageBlock
            src={/*cf-review:field-dee3221b19274fd7a616d274f378c944*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-48c8bce2-97d2-476a-9145-8a6341e8b076.jpg?alt=media&token=102bb545-bc39-4212-ad01-215ee79fc41b"}
            alt={/*cf-review:field-0a10ebb794944ea4922296f6f3fa464f*/"Four people sit at a wooden table with laptops and cups. One gestures with both hands. Large windows, plants and a whiteboard fill the room."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free worksheet"
            title={"AI Customer Service Pilot Planning Worksheet"}
            description="Use this worksheet to choose a narrow AI task, approve source information, assign review, set measures and define when to stop or narrow the pilot."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fhow-australian-startups-can-test-ai-for-customer-service-worksheet-415e172d.pdf?alt=media&token=33273c90-0ca0-4a53-91eb-0ecace541f78"
            accent="purple"
            previewCards={[
              {
                title: "Pilot plan",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Data control checks",
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
            {id: 3, href: "https://www.chatbase.co/blog/ai-in-customer-service", title: "AI in Customer Service: Use Cases, Examples & Benefits", publisher: "", category: "guide"},
            {id: 4, href: "https://www.edesk.com/blog/15-great-examples-of-ai-in-customer-service/", title: "15 Examples of AI in Customer Service to Boost Efficiency", publisher: "", category: "guide"},
            {id: 5, href: "https://academy.openai.com/public/resources/openai-academy-small-business-resource-hub-2026-06-03", title: "ChatGPT for Small Business | Workshop Resource Hub - Resource | OpenAI Academy", publisher: "", category: "guide"},
            {id: 6, href: "https://mlai.au/events", title: "AI & Machine Learning Events in Australia | MLAI", publisher: "", category: "guide"},
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
