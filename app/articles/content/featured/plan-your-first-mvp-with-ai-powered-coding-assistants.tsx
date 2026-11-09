
const CF_REVIEW_4bf850a55d9b4ceeb6e2e901e2264269 = (/*cf-review:field-4bf850a55d9b4ceeb6e2e901e2264269*/"Check whether you need to build");
const CF_REVIEW_d532f05339d84ecaac041fa75f0437b4 = (/*cf-review:field-d532f05339d84ecaac041fa75f0437b4*/"Write the brief before choosing the tool");
const CF_REVIEW_e4d5c1464d894db6bf8a0bf5a37bdc13 = (/*cf-review:field-e4d5c1464d894db6bf8a0bf5a37bdc13*/"Ask for one change at a time");
const CF_REVIEW_5deac3cc894a4bbeba52179a01ca8e73 = (/*cf-review:field-5deac3cc894a4bbeba52179a01ca8e73*/"Check behaviour before trusting the demo");
const CF_REVIEW_665bbafb531644968abf7d632e0d475b = (/*cf-review:field-665bbafb531644968abf7d632e0d475b*/"Put the pilot decision on one page");
const CF_REVIEW_fec1cce46fba48d693440f4cb2e356cb = (/*cf-review:field-fec1cce46fba48d693440f4cb2e356cb*/"Finish your plan before making a commitment");
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

const TOPIC = (/*cf-review:field-8d89b3b7fbed4c5ea279c8a545b74308*/"Plan your first MVP with AI-powered coding assistants")
export const CATEGORY = "featured"
export const SLUG = "plan-your-first-mvp-with-ai-powered-coding-assistants"
export const DATE_PUBLISHED = "2026-11-09"
export const DATE_MODIFIED = "2026-11-09"
export const DESCRIPTION = "Decide whether to build, then plan a quote-request tracker with AI coding prompts, synthetic data, human checks and a scorecard for your first MVP."
const HERO_IMAGE = (/*cf-review:field-ac88a2360e1e4447a12948edb2a15edb*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-4ef93752-d190-4a98-9abd-d3f45c4692fd.jpg?alt=media&token=d1fd5961-fffd-45de-bc59-ec6f5b3d44aa")
const HERO_IMAGE_ALT = "Two people look at a laptop. One gestures toward the screen while the other rests a hand on their chin. A notebook and pen sit on the table."
export const FEATURED_FOCUS = "product"

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
  { id: 1, question: "How should I define the coding assistant's role in the pilot?", answer: "An AI coding assistant can help draft or explain code. Our view: state the coding help you want separately from the tracker's required functions in your brief. For this pilot, keep those functions focused on creating, viewing and updating quote requests, and have a reviewer assess the proposed design." },
  { id: 2, question: "What should happen to records when I close and reopen the prototype?", answer: "Saved records and their updates should remain available after the agreed close-and-reopen action. Record what you observe against that expected behaviour, and leave the check marked 'Not run' until you perform it. Ask your reviewer where the records are stored." },
  { id: 3, question: "What if I cannot explain the generated code?", answer: "Pause before running code or instructions you can't assess, and obtain help from someone able to review them. We recommend qualified technical review before live business use, including access, storage, software dependencies, recovery and maintenance." },
]

export const summaryHighlights = {
  heading: "Key facts",
  intro: "Decide whether to build, then plan a quote-request tracker with AI coding prompts, synthetic data, human checks and a scorecard for your first MVP.",
  items: [
    { label: "What is AI coding assistance?", description: "AI coding assistance uses generative AI to draft or explain code from your instructions. Generated code, explanations and suggested checks still need human review before you rely on them." },
    { label: "Should you build an MVP or use existing software?", description: "Our view: configure an existing form or spreadsheet if it meets your workflow needs. Before commissioning code, record your current process, its time and errors, and the gap existing software leaves." },
    { label: "How should you evaluate a first MVP?", description: "Compare equivalent tasks against your baseline using time, errors, owner effort and total tool costs in AUD. Set your continue, revise and stop thresholds before running the pilot, including checking and correction time." },
  ],
}

export const articleMeta = {
  title: "Plan your first MVP with AI-powered coding assistants",
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
          { href: "#intro", label: (CF_REVIEW_4bf850a55d9b4ceeb6e2e901e2264269) },
          { href: "#scope", label: (CF_REVIEW_d532f05339d84ecaac041fa75f0437b4) },
          { href: "#prompts", label: (CF_REVIEW_e4d5c1464d894db6bf8a0bf5a37bdc13) },
          { href: "#review", label: (CF_REVIEW_5deac3cc894a4bbeba52179a01ca8e73) },
          { href: "#pilot-plan", label: (CF_REVIEW_665bbafb531644968abf7d632e0d475b) },
          { href: "#conclusion", label: (CF_REVIEW_fec1cce46fba48d693440f4cb2e356cb) },
        ]}
      />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <div data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Check whether you need to build"} data-cf-source-section-id={"intro"}>
        <h2 id="intro"><span data-cf-component-id="field-4bf850a55d9b4ceeb6e2e901e2264269" data-cf-component-type="text">{CF_REVIEW_4bf850a55d9b4ceeb6e2e901e2264269}</span></h2>
        <p><span data-cf-component-id="field-75df1fcf6d8f4d33987b617bf1f3fc2a" data-cf-component-type="text">{/*cf-review:field-75df1fcf6d8f4d33987b617bf1f3fc2a*/"Our view: if a form or spreadsheet you already have can fix the workflow, try that before asking AI to write an app. Name the recurring problem, record how you handle it now and inspect your existing software options. For an Australian small-business owner with limited time and budget, that's the first spending decision."}</span></p>
        <p><span data-cf-component-id="field-8039d90869504623ac7b0791d6001afb" data-cf-component-type="text">{/*cf-review:field-8039d90869504623ac7b0791d6001afb*/"Establish your baseline: observe the time and effort you spend completing a request, correcting errors and chasing its status. Keep those observations in business-approved records so you can compare any proposed change with your current process."}</span></p>
        <p><span data-cf-component-id="field-851011771909440ca013ce26ef6daece" data-cf-component-type="text">{/*cf-review:field-851011771909440ca013ce26ef6daece*/"An AI coding assistant uses generative AI to help draft or explain code from your instructions. An MVP, or minimum viable product, is the smallest version that lets you evaluate a specific useful workflow, not permission to release unfinished software."}</span></p>
        <p><span data-cf-component-id="field-924622ce6b0e45b2b1e9b2bee9bbafd5" data-cf-component-type="text">{/*cf-review:field-924622ce6b0e45b2b1e9b2bee9bbafd5*/"Our view: plan the workflow and human review before choosing a coding tool, because generated material still needs checking before you rely on it. business.gov.au supports that verification principle (https://business.gov.au/online-and-digital/artificial-intelligence). This planning approach is for small teams exploring a bounded workflow, not enterprise engineering teams or high-consequence uses. It isn't a production deployment guide or tool ranking. If existing software meets your need, configure it before commissioning code."}</span></p>
        </div>
        <div data-cf-component-id={"section:scope"} data-cf-component-type={"section"} data-cf-component-label={"Write the brief before choosing the tool"} data-cf-source-section-id={"scope"}>
          <h2 id="scope"><span data-cf-component-id="field-d532f05339d84ecaac041fa75f0437b4" data-cf-component-type="text">{CF_REVIEW_d532f05339d84ecaac041fa75f0437b4}</span></h2>
          <p><span data-cf-component-id="field-aff32a1d119d40e4a8d9ac6b36748db9" data-cf-component-type="text">{/*cf-review:field-aff32a1d119d40e4a8d9ac6b36748db9*/"Our view: write down what the tracker must do before you compare coding tools. For the illustrative internal quote-request tracker, a request with a visible status gives you behaviour to inspect: can you tell what needs attention, and does a status change stay saved? That\u2019s a clearer brief than asking an assistant to automate your administration."}</span></p>
          <p><span data-cf-component-id="field-b82ee110f3be42fb97ac567585e1f406" data-cf-component-type="text">{/*cf-review:field-b82ee110f3be42fb97ac567585e1f406*/"Connect the person using the tracker to the record they handle and the changes they\u2019re allowed to make. Name an accountable business owner who can approve scope and decide whether the result meets the need. The worked pilot plan below brings those decisions together with the required fields, essential functions and exclusions, so you can adapt a single record rather than maintain competing versions."}</span></p>
          <p><span data-cf-component-id="field-cabc87cbc08a41a8b1f3ad0de0af0a4f" data-cf-component-type="text">{/*cf-review:field-cabc87cbc08a41a8b1f3ad0de0af0a4f*/"Set your spending cap and timebox before subscribing or commissioning work. Include time for learning, reviewing and fixing, not just generating code. We recommend treating those activities as part of the build budget: a quick draft still leaves you with decisions to check and software to maintain."}</span></p>
          <p><span data-cf-component-id="field-f8363ca9a9694764bd3cadb7aad94367" data-cf-component-type="text">{/*cf-review:field-f8363ca9a9694764bd3cadb7aad94367*/"Once the brief exists, investigate whether a tool\u2019s data handling is acceptable to your business, its costs fit your cap and you can retain the code. Ask whether you or your reviewer can explain its proposed changes before accepting them. Foundd Legal\u2019s guide to AI and Australian privacy law identifies names and email addresses as personal information, and describes risks from customer messages and feedback that identify people. Treat the contents of a request as a data decision before treating them as coding input."}</span></p>
          <div data-cf-component-id={"image:scope"} data-cf-component-type={"image"} data-cf-component-label={"Image: Write the brief before choosing the tool"} data-cf-source-section-id={"scope"}>
          <ArticleImageBlock
            src={/*cf-review:field-5a7b4d22ed91421ca6d29f630722846c*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b6153beb-3603-4d3d-bb3e-40a4fa4b7ff1.jpg?alt=media&token=6c1878bb-e0e2-4a16-9787-0a18cce79320"}
            alt={/*cf-review:field-ed1458cd74ac42dc948ca4c44e8c3eb8*/"A person writes in an open notebook at a wooden table beside a laptop and ceramic mug, with a plant near the window."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="Keep the prototype separate" variant="orange">
            <span data-cf-component-id="field-c951b783410a48e1828cb76514f9b45c" data-cf-component-type="text">{/*cf-review:field-c951b783410a48e1828cb76514f9b45c*/"Use synthetic records invented for this prototype. Don\u2019t enter personal or confidential information into unapproved tools, expose credentials such as passwords or API keys, or connect live business systems during the initial build. Keep that boundary in place when you move from planning to coding."}</span>
          </QuoteBlock>
        </div>
        <div data-cf-component-id={"callout:prototype-data-boundary"} data-cf-component-type={"callout"} data-cf-component-label={"Keep the prototype separate from live work"}>
          <QuoteBlock title="Keep the prototype separate from live work" variant="orange">
            {"Use only invented, synthetic records for your prototype. Don't enter personal or confidential data into unapproved tools, expose passwords or API keys, or connect the prototype to live business systems."}
          </QuoteBlock>
        </div>
        <div data-cf-component-id={"section:prompts"} data-cf-component-type={"section"} data-cf-component-label={"Ask for one change at a time"} data-cf-source-section-id={"prompts"}>
          <h2 id="prompts"><span data-cf-component-id="field-e4d5c1464d894db6bf8a0bf5a37bdc13" data-cf-component-type="text">{CF_REVIEW_e4d5c1464d894db6bf8a0bf5a37bdc13}</span></h2>
          <p><span data-cf-component-id="field-41489f7595cb45d381d8c21aa713a0a7" data-cf-component-type="text">{/*cf-review:field-41489f7595cb45d381d8c21aa713a0a7*/"Our view: you should approve each change before asking an AI coding assistant for the next. For your quote-request tracker, we suggest the sequence below so you can compare each proposal with your brief and keep control of scope. These are proposed instructions you can adapt, not a transcript of a completed build."}</span></p>
          <div data-cf-component-id={"image:prompts"} data-cf-component-type={"image"} data-cf-component-label={"Image: Ask for one change at a time"} data-cf-source-section-id={"prompts"}>
          <ArticleImageBlock
            src={/*cf-review:field-04553d5fa60348c395b3e046c4d8b49f*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a44d8c4f-7ba1-48f0-8b36-cc75bad1e74d.jpg?alt=media&token=f069baba-7602-4c62-be47-a768d1290686"}
            alt={/*cf-review:field-c5a2e146984543cda5a944a050c73c88*/"An open laptop, notebook with a pen, mug, phone and stacked books sit on a wooden table beside a window and potted plants."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-3b0f54a2bdba4773b1b0e71b43b852ed" data-cf-component-type="text">{/*cf-review:field-3b0f54a2bdba4773b1b0e71b43b852ed*/"Plan before coding"}</span></h3>
          <p><span data-cf-component-id="field-4801ec8ee1f2499a810e27d1a66ac8f7" data-cf-component-type="text">{/*cf-review:field-4801ec8ee1f2499a810e27d1a66ac8f7*/"Start by asking the assistant to explain its proposed approach before it generates code: \u201cRead my build brief. Restate the user, fields, allowed functions and exclusions. Identify missing decisions and suggest the simplest approach. Explain how records would be saved. Do not write code yet.\u201d"}</span></p>
          <p><span data-cf-component-id="field-09fefbc5411340dcbfb94e9a002497c6" data-cf-component-type="text">{/*cf-review:field-09fefbc5411340dcbfb94e9a002497c6*/"Compare that restatement with what you actually need. Correct omissions, resolve missing decisions and approve the scope before proceeding. If you can't explain how the proposed tracker would save a request, ask for a simpler explanation before accepting the approach."}</span></p>
          <h3><span data-cf-component-id="field-efbeed5b19ef434eb427597c1bff3b53" data-cf-component-type="text">{/*cf-review:field-efbeed5b19ef434eb427597c1bff3b53*/"Build one function"}</span></h3>
          <p><span data-cf-component-id="field-e0a980f32d28440a8d26612ad8d11cde" data-cf-component-type="text">{/*cf-review:field-e0a980f32d28440a8d26612ad8d11cde*/"Keep the next request bounded: \u201cUsing the approved brief, implement only the create-request function. Keep the agreed scope unchanged. Show the files you would change and explain how I would inspect the result. Stop before adding another function.\u201d"}</span></p>
          <p><span data-cf-component-id="field-70955d197b7a42fc81a4505f4b628433" data-cf-component-type="text">{/*cf-review:field-70955d197b7a42fc81a4505f4b628433*/"Have a person able to assess the proposed code and instructions review them before execution. If that's beyond your skills, pause and obtain help. After review, inspect whether creating a request behaves as agreed before requesting another feature. Use the same bounded approach separately for viewing requests and updating them, rather than asking the assistant to finish everything at once."}</span></p>
          <h3><span data-cf-component-id="field-ff24ff51461f4013b44c59e69f79d558" data-cf-component-type="text">{/*cf-review:field-ff24ff51461f4013b44c59e69f79d558*/"Explain the change"}</span></h3>
          <p><span data-cf-component-id="field-8cad62727ef743f285162276eb048c00" data-cf-component-type="text">{/*cf-review:field-8cad62727ef743f285162276eb048c00*/"Ask for an explanation you can follow: \u201cExplain this change in plain English: what each changed file does, where a record is stored, what input it accepts and what could fail. Identify anything you are uncertain about.\u201d Ask it to explain unfamiliar terms rather than accepting an unexplained command."}</span></p>
          <p><span data-cf-component-id="field-6b5f0b8acfcf4cf6ad3613580d2056cd" data-cf-component-type="text">{/*cf-review:field-6b5f0b8acfcf4cf6ad3613580d2056cd*/"Then request proposed checks: \u201cUsing my brief and this change, draft manual checks with an action and expected result. Cover missing fields, invalid inputs, updates to the correct record and records remaining after reopening. Do not report any check as passed.\u201d Review those suggestions against the proposed checks in your pilot plan, keeping the agreed checks in that same record. Request the next feature only after you've inspected the current behaviour and resolved any failure."}</span></p>
        </div>
        <div data-cf-component-id={"section:review"} data-cf-component-type={"section"} data-cf-component-label={"Check behaviour before trusting the demo"} data-cf-source-section-id={"review"}>
          <h2 id="review"><span data-cf-component-id="field-5deac3cc894a4bbeba52179a01ca8e73" data-cf-component-type="text">{CF_REVIEW_5deac3cc894a4bbeba52179a01ca8e73}</span></h2>
          <p><span data-cf-component-id="field-2416ee4a9beb4e579b32d6c7f46d1f13" data-cf-component-type="text">{/*cf-review:field-2416ee4a9beb4e579b32d6c7f46d1f13*/"Our view: a convincing demo is a reason to inspect the tracker, not permission to use it in your business. We think a successful demo should not replace review of generated code, explanations and suggested checks, or further checks under untried conditions. business.gov.au advises checking AI-generated information against a trustworthy source before relying on it (https://business.gov.au/online-and-digital/artificial-intelligence). The software review gates below are our proposed precautions."}</span></p>
          <p><span data-cf-component-id="field-6548bb321a064b76a7d70537abd24bdf" data-cf-component-type="text">{/*cf-review:field-6548bb321a064b76a7d70537abd24bdf*/"Use the proposed checks in your pilot plan as a record of what you actually observe. Decide the expected result before you perform the action, then record what happened, including failures. Leave anything you haven\u2019t performed marked \u2018Not run\u2019. Keep a failed result when you make a correction, so you can distinguish the original problem from the result of checking the change."}</span></p>
          <p><span data-cf-component-id="field-6e04144954514c4bb29a25537428ec03" data-cf-component-type="text">{/*cf-review:field-6e04144954514c4bb29a25537428ec03*/"For this pilot, we recommend checking that saved records and updates remain available after the agreed close-and-reopen action. Inspecting the stored record answers a different question from inspecting the screen: did the intended change reach storage? Ask your reviewer to identify where records are stored and what that storage does not protect against."}</span></p>
          <p><span data-cf-component-id="field-5c2cfebefad34077a4195ef474210d73" data-cf-component-type="text">{/*cf-review:field-5c2cfebefad34077a4195ef474210d73*/"If you can\u2019t assess the code or instructions, pause and obtain help before running them. Before live business use, we recommend qualified technical review, especially when you introduce real data, shared access, hosting or integrations. Ask the reviewer to assess who can access records, how storage works, the software components the tracker relies on, and the arrangements for recovery and maintenance. Your manual checks can show whether the agreed behaviour occurred under the conditions you tried; they don\u2019t replace that technical review. Keep the tracker out of live use until you\u2019ve resolved the issues that review identifies."}</span></p>
        </div>
        <div data-cf-component-id={"section:pilot-plan"} data-cf-component-type={"section"} data-cf-component-label={"Put the pilot decision on one page"} data-cf-source-section-id={"pilot-plan"}>
          <h2 id="pilot-plan"><span data-cf-component-id="field-665bbafb531644968abf7d632e0d475b" data-cf-component-type="text">{CF_REVIEW_665bbafb531644968abf7d632e0d475b}</span></h2>
          <p><span data-cf-component-id="field-90daaf1d49e74cc1a633f70ddea5ab53" data-cf-component-type="text">{/*cf-review:field-90daaf1d49e74cc1a633f70ddea5ab53*/"Our view: write your decision rules before you generate code. Copy this record and replace its owner, dates, spending cap, effort limit and decision thresholds with your own before starting. Adapt the workflow and fields to your chosen task. Its headings give you a reusable brief, check log and scorecard without creating separate worksheets."}</span></p>
          <p><span data-cf-component-id="field-27257e1323644591a0eb91d91201b9d9" data-cf-component-type="text">{/*cf-review:field-27257e1323644591a0eb91d91201b9d9*/"Compare equivalent tasks with consistent timing boundaries. Keep setup effort separate from recurring handling time so you don't count it twice. A synthetic rehearsal can inform your next decision, but cannot establish production reliability or customer outcomes."}</span></p>
          <div data-cf-style-role="callout" data-cf-scenario="true">
            <QuoteBlock title="Hypothetical pilot plan using synthetic records" variant="purple">
              <span style={{ display: 'block' }}><strong><span data-cf-component-id="field-090b9b99d40a40ec8ba48da08c927ffb" data-cf-component-type="text">{/*cf-review:field-090b9b99d40a40ec8ba48da08c927ffb*/"Internal quote-request tracker"}</span></strong></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><span data-cf-component-id="field-5456638869324516b25b3526dfc15682" data-cf-component-type="text">{/*cf-review:field-5456638869324516b25b3526dfc15682*/"Build brief"}</span></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><span data-cf-component-id="field-7204f9b77f5a4777afbd1c11a9476156" data-cf-component-type="text">{/*cf-review:field-7204f9b77f5a4777afbd1c11a9476156*/"User and workflow: an owner-operator records incoming quote requests, views outstanding requests and changes their status. Accountable owner: Alex Chen, owner-operator."}</span></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><span data-cf-component-id="field-cb4eb67cb0164aedb04a2d33e8495b71" data-cf-component-type="text">{/*cf-review:field-cb4eb67cb0164aedb04a2d33e8495b71*/"Required fields: request reference, short description and status. Functions: create, view and update. Allowed statuses: New, In review and Closed."}</span></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><span data-cf-component-id="field-b55f8c0a493941f6ac29a47107400728" data-cf-component-type="text">{/*cf-review:field-b55f8c0a493941f6ac29a47107400728*/"Synthetic records: DEMO-A | Equipment hire | New; DEMO-B | Equipment repair | In review."}</span></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><span data-cf-component-id="field-2716380217a34999bf0ac05fbd28d2b0" data-cf-component-type="text">{/*cf-review:field-2716380217a34999bf0ac05fbd28d2b0*/"Exclude automated customer communication, payments and production integrations. Retain the established prototype data boundary."}</span></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><span data-cf-component-id="field-8b000f7a00ad4b8ca7c883024656ea20" data-cf-component-type="text">{/*cf-review:field-8b000f7a00ad4b8ca7c883024656ea20*/"Spending cap: A$300 total, including any paid technical review, with at most A$100 for subscriptions, usage and hosting. Owner-hours limit: 10 hours, including learning, setup, rehearsal, review, fixes and maintenance. Timebox: 16 to 27 November 2026. Measurable success criteria: all four proposed checks pass and every scorecard threshold below is met."}</span></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><span data-cf-component-id="field-54551905cc8b43ea9deb43390039163d" data-cf-component-type="text">{/*cf-review:field-54551905cc8b43ea9deb43390039163d*/"Scored rehearsal: attempt 10 equivalent tasks using synthetic records in each workflow. Include creating, viewing and updating requests. Time each task from opening the request to confirming the intended result, including checking and corrections. Retain every attempt and failure."}</span></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><span data-cf-component-id="field-1e5e297db6634fc288ac2a71dbe89714" data-cf-component-type="text">{/*cf-review:field-1e5e297db6634fc288ac2a71dbe89714*/"Proposed checks"}</span></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><strong><span data-cf-component-id="field-8978368a34bd47ebb38d6dc366f3e7cc" data-cf-component-type="text">{/*cf-review:field-8978368a34bd47ebb38d6dc366f3e7cc*/"Save with description missing"}</span>:</strong> <span data-cf-component-id="field-b93964cb10c84ed6a73aa1fc6c5dc6b4" data-cf-component-type="text">{/*cf-review:field-b93964cb10c84ed6a73aa1fc6c5dc6b4*/"Expected: saving prevented. Observed: Not measured. Status: Not run."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-f7a396872777488592de99c82a4a4baa" data-cf-component-type="text">{/*cf-review:field-f7a396872777488592de99c82a4a4baa*/"Submit an unrecognised status"}</span>:</strong> <span data-cf-component-id="field-59c83592672b47b190b357b63b068ee7" data-cf-component-type="text">{/*cf-review:field-59c83592672b47b190b357b63b068ee7*/"Expected: rejected; stored record unchanged. Observed: Not measured. Status: Not run."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-3939f0e1c4884d4f92220e50f7c3f92f" data-cf-component-type="text">{/*cf-review:field-3939f0e1c4884d4f92220e50f7c3f92f*/"Change DEMO-A status to Closed"}</span>:</strong> <span data-cf-component-id="field-91daeb1697d84b0ea28433a29af93945" data-cf-component-type="text">{/*cf-review:field-91daeb1697d84b0ea28433a29af93945*/"Expected: DEMO-A status changes; DEMO-B stays unchanged. Observed: Not measured. Status: Not run."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-63ef382e5a2e4108ad5d14920f0a7c62" data-cf-component-type="text">{/*cf-review:field-63ef382e5a2e4108ad5d14920f0a7c62*/"Close and reopen"}</span>:</strong> <span data-cf-component-id="field-deac104192d54b188eab0260716ad7f5" data-cf-component-type="text">{/*cf-review:field-deac104192d54b188eab0260716ad7f5*/"Expected: saved records and updates remain. Observed: Not measured. Status: Not run."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-8873936ad6ca41afa2ebc6d8d0e4645b" data-cf-component-type="text">{/*cf-review:field-8873936ad6ca41afa2ebc6d8d0e4645b*/"Pilot scorecard"}</span>:</strong> <span data-cf-component-id="field-e1afe30ed4e74bffbcfcd4ceed24cda5" data-cf-component-type="text">{/*cf-review:field-e1afe30ed4e74bffbcfcd4ceed24cda5*/"Measure | Baseline | Prototype observation | Decision threshold"}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-c1fdfbff3e704d63bdd3b21e8bd331a4" data-cf-component-type="text">{/*cf-review:field-c1fdfbff3e704d63bdd3b21e8bd331a4*/"Time per completed task, including checking and corrections"}</span>:</strong> <span data-cf-component-id="field-9d566bf165314b9f9b276c803eebbab3" data-cf-component-type="text">{/*cf-review:field-9d566bf165314b9f9b276c803eebbab3*/"Not measured | Not measured | Mean no more than 3 minutes per completed task and no slower than baseline; all 10 tasks completed."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-470f4e3e81e249319bc6af425eccaa6b" data-cf-component-type="text">{/*cf-review:field-470f4e3e81e249319bc6af425eccaa6b*/"Errors per attempted task, retaining attempt count"}</span>:</strong> <span data-cf-component-id="field-be39cf001b9d44999bad60bdc3de0837" data-cf-component-type="text">{/*cf-review:field-be39cf001b9d44999bad60bdc3de0837*/"Not measured | Not measured | 0 record-handling errors across the 10 attempted tasks in the scored run."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-24070419b0e24ab7babf5102b75d0c9e" data-cf-component-type="text">{/*cf-review:field-24070419b0e24ab7babf5102b75d0c9e*/"Owner effort: setup, review and maintenance recorded separately"}</span>:</strong> <span data-cf-component-id="field-3fa29a7858e745bc8bfe19990a3fb985" data-cf-component-type="text">{/*cf-review:field-3fa29a7858e745bc8bfe19990a3fb985*/"Not measured | Not measured | At most 10 owner-hours across all pilot activities, including learning, rehearsal and fixes."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-4a9db1cab26c4463820908db04c45c59" data-cf-component-type="text">{/*cf-review:field-4a9db1cab26c4463820908db04c45c59*/"Total attributable tool costs in AUD: subscriptions, usage and hosting"}</span>:</strong> <span data-cf-component-id="field-e7724ec0a8d64b32b0a4950aad6dc242" data-cf-component-type="text">{/*cf-review:field-e7724ec0a8d64b32b0a4950aad6dc242*/"Not measured | Not measured | At most A$100 for tools during the pilot; total spending including paid technical review at most A$300."}</span></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><span data-cf-component-id="field-87928e4dd4df4368a7d93b5e7067c7e2" data-cf-component-type="text">{/*cf-review:field-87928e4dd4df4368a7d93b5e7067c7e2*/"Continue to the next technical-review stage only when all four checks pass, every scorecard threshold is met and no data concerns remain. Revise once if a non-critical gap can be corrected and rechecked within 2 remaining owner-hours and A$50 of the unspent budget before 27 November 2026. Those allowances sit within the existing caps. Stop for lost or wrongly updated records, unresolved data concerns, remaining work that would exceed a cap, or thresholds still unmet at the end date."}</span></span>
            </QuoteBlock>
          </div>
          <div data-cf-component-id={"image:pilot-plan"} data-cf-component-type={"image"} data-cf-component-label={"Image: Put the pilot decision on one page"} data-cf-source-section-id={"pilot-plan"}>
          <ArticleImageBlock
            src={/*cf-review:field-6ed1124cb20f436e864bb36dbab017db*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-cfc1a035-18c8-431d-a4aa-33de98e47fbf.jpg?alt=media&token=d76dd0a6-5792-46d1-8c94-6d4149419d8b"}
            alt={/*cf-review:field-34536cb4c0934b08a027b4e4f8b76254*/"Close-up of a person in a black top looking downward with their chin resting on their hand."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"section:conclusion"} data-cf-component-type={"section"} data-cf-component-label={"Finish your plan before making a commitment"} data-cf-source-section-id={"conclusion"}>
          <h2 id="conclusion"><span data-cf-component-id="field-fec1cce46fba48d693440f4cb2e356cb" data-cf-component-type="text">{CF_REVIEW_fec1cce46fba48d693440f4cb2e356cb}</span></h2>
          <p><span data-cf-component-id="field-3b3c5ffb67f74c0297adb4d55e1ab9de" data-cf-component-type="text">{/*cf-review:field-3b3c5ffb67f74c0297adb4d55e1ab9de*/"Our view: finish your bounded plan before buying a tool. Name the accountable owner in your existing one-page record, fill in the spending cap and timebox, collect your baseline and set continue, revise and stop thresholds. If your existing form or spreadsheet meets the need, configure it. Otherwise, prepare the smallest reviewed prototype within those limits."}</span></p>
          <p><span data-cf-component-id="field-efc055dbc6c44f52b661d9fb820c2765" data-cf-component-type="text">{/*cf-review:field-efc055dbc6c44f52b661d9fb820c2765*/"Ask peers: \u201cCould the form or spreadsheet I already use handle this workflow without custom code?\u201d Then ask: \u201cWhich failure case would you test before trusting saved updates?\u201d And: \u201cWhat technical review would you arrange before using real data?\u201d Use their answers to resolve gaps in your plan before committing to a build."}</span></p>
          <p><span data-cf-component-id="field-b032d401d03e4a49aeafa9a39c1b96ad" data-cf-component-type="text">{/*cf-review:field-b032d401d03e4a49aeafa9a39c1b96ad*/"If you\u2019d like to discuss your questions with others, you can explore our events. Inspect a relevant event\u2019s topic, level and registration details before deciding whether to register. Availability, format and cost vary, and attendance doesn\u2019t guarantee one-to-one implementation advice. You don\u2019t need to attend an event to run your pilot."}</span></p>
          <div data-cf-component-id={"image:conclusion"} data-cf-component-type={"image"} data-cf-component-label={"Image: Finish your plan before making a commitment"} data-cf-source-section-id={"conclusion"}>
          <ArticleImageBlock
            src={/*cf-review:field-326537f51c6240d0aadaae5647263552*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-674220f3-440b-4e2b-b484-92fd338799c9.jpg?alt=media&token=d5ca55ef-2213-4d5d-b641-df45b39f6830"}
            alt={/*cf-review:field-dca65e0ada9848319ebe92dd1b571a7d*/"Three people sit around a wooden table with laptops, a notebook, a mug and a bottle, near a sofa, bookshelf, plants and a large window."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free worksheet"
            title={"AI Coding Assistant Pilot Decision Worksheet"}
            description="Use this one-page worksheet to define a small pilot, record baseline effort, test each change and set clear continue, revise or stop rules."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fplan-your-first-mvp-with-ai-powered-coding-assistants-worksheet-2fc38a88.pdf?alt=media&token=3f0208ba-f1ce-4bec-8755-a2e8e6e5226c"
            accent="purple"
            previewCards={[
              {
                title: "Pilot brief",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Test and decision log",
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
            {id: 2, href: "https://founddlegal.com/blogs/legal-resources/using-ai-in-your-small-business-what-australian-privacy-law-actually-says?srsltid=AYCX9vICPPb9ifPn3cHzgSiU4FKOHowjsnXqZdRi8o-yfClMAMZF8HnA", title: "AI and Privacy Law for Small Business in Australia", publisher: "", category: "guide"},
            {id: 3, href: "https://saascompared.io/blog/best-ai-coding-assistants/", title: "Best AI Coding Assistants in 2026: GitHub Copilot vs Cursor vs Claude Code and More", publisher: "", category: "guide"},
            {id: 4, href: "https://mlai.au/events", title: "AI & Machine Learning Events in Australia | MLAI", publisher: "", category: "guide"},
          ]}
          heading="Sources & further reading"
        />

        <ArticleDisclaimer />

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Learn with Australia's AI community"
            body="The public MLAI events calendar lists upcoming AI and machine learning events. Readers can inspect an event and register with its organiser if it fits. Availability, format and any cost depend on the event page; attending does not guarantee one-to-one implementation advice."
            buttonText="Explore MLAI events"
            buttonHref="/events"
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
