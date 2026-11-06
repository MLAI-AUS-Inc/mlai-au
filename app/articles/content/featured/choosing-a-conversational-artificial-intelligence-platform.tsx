
const CF_REVIEW_ea2d35fc12294c48ad333df3d6da870f = (/*cf-review:field-ea2d35fc12294c48ad333df3d6da870f*/"Choose the task before the platform");
const CF_REVIEW_fd164d22e7e746e48ea75bc66db35cd3 = (/*cf-review:field-fd164d22e7e746e48ea75bc66db35cd3*/"When a simpler interface will do");
const CF_REVIEW_3ebc547b7f614ddd9c1c7fda2540fb5b = (/*cf-review:field-3ebc547b7f614ddd9c1c7fda2540fb5b*/"Human oversight and data controls come first");
const CF_REVIEW_00d491c0e53e4564b836e26cc353e48b = (/*cf-review:field-00d491c0e53e4564b836e26cc353e48b*/"Compare three routes against the same job");
const CF_REVIEW_53703ac38b484e14a5e8fa6f94f55ab2 = (/*cf-review:field-53703ac38b484e14a5e8fa6f94f55ab2*/"Your pilot needs rules before it starts");
const CF_REVIEW_355a7612aba64621802d3c24aa7721de = (/*cf-review:field-355a7612aba64621802d3c24aa7721de*/"What your shortlist needs");
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

const TOPIC = (/*cf-review:field-1784b1d0c0e54db29fa9deb4977ea917*/"Choosing a conversational artificial intelligence platform")
export const CATEGORY = "featured"
export const SLUG = "choosing-a-conversational-artificial-intelligence-platform"
export const DATE_PUBLISHED = "2026-11-06"
export const DATE_MODIFIED = "2026-11-06"
export const DESCRIPTION = "Choose one small-business workflow, compare three conversational AI routes, and set data, handover and AUD cost limits before committing to a pilot."
const HERO_IMAGE = (/*cf-review:field-41ada742d7d3429b9baeddd3e8a64cb8*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-42f558db-72ed-4380-8987-147797208f3f.jpg?alt=media&token=0a225c48-23ea-48fe-bf96-bb54ec846b9e")
const HERO_IMAGE_ALT = "Two people sit at a table with a laptop and open notebook. One holds a pen and gestures while the other rests a hand on their chin."
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
  { id: 1, question: "Does a no-training setting mean my data stays in Australia?", answer: "No. Verify training use, storage location and processing location separately with your provider." },
  { id: 2, question: "How should I compare a free trial with a paid pilot?", answer: "Check what you'll commit to when the trial ends, including any minimum paid term, usage limits and overages. Use the same full-cost calculation for both options, with cash costs in AUD and internal setup and review hours recorded separately. Treat unconfirmed costs as unknown, never zero." },
  { id: 3, question: "What should happen when the tool cannot answer?", answer: "It should use the agreed fallback to a named person, including the plan for when they're unavailable. Define what information transfers and test the handover before external use." },
  { id: 4, question: "What should I check about exports before choosing a platform?", answer: "Get a dated provider document or written answer confirming what content and formats you can export and whether you can reuse the content elsewhere. For custom development, assign responsibility for building and maintaining the export function." },
]

export const summaryHighlights = {
  heading: "Key facts",
  intro: "Choose one small-business workflow, compare three conversational AI routes, and set data, handover and AUD cost limits before committing to a pilot.",
  items: [
    { label: "What is a conversational AI platform?", description: "A conversational AI platform lets you build or configure a tool that answers questions in everyday language. Permission to access customer records or change bookings must be decided separately." },
    { label: "Which platform routes should you compare?", description: "You can compare a feature in existing software, a separate no-code chatbot builder and a custom API approach. Check each against the same task, information permissions, human handover requirements and full pilot cost in AUD." },
    { label: "How should you decide whether to continue a pilot?", description: "Base your decision on predefined answer quality, human effort and spending limits. Count review, correction and handover time against the manual baseline, and pause if information access breaches approved boundaries or a critical handover fails." },
  ],
}

export const articleMeta = {
  title: "Choosing a conversational artificial intelligence platform",
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
          { href: "#intro", label: (CF_REVIEW_ea2d35fc12294c48ad333df3d6da870f) },
          { href: "#use-case", label: (CF_REVIEW_fd164d22e7e746e48ea75bc66db35cd3) },
          { href: "#safeguards", label: (CF_REVIEW_3ebc547b7f614ddd9c1c7fda2540fb5b) },
          { href: "#comparison", label: (CF_REVIEW_00d491c0e53e4564b836e26cc353e48b) },
          { href: "#pilot", label: (CF_REVIEW_53703ac38b484e14a5e8fa6f94f55ab2) },
          { href: "#conclusion", label: (CF_REVIEW_355a7612aba64621802d3c24aa7721de) },
        ]}
      />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <div data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Choose the task before the platform"} data-cf-source-section-id={"intro"}>
        <h2 id="intro"><span data-cf-component-id="field-ea2d35fc12294c48ad333df3d6da870f" data-cf-component-type="text">{CF_REVIEW_ea2d35fc12294c48ad333df3d6da870f}</span></h2>
        <p><span data-cf-component-id="field-c1cbaba546b740fca0c7159e68f5afce" data-cf-component-type="text">{/*cf-review:field-c1cbaba546b740fca0c7159e68f5afce*/"Our view: choose the simplest tool that handles your bounded task, uses approved information and leaves a person responsible for the result. If you're running a small Australian business, start with a routine job you can check before committing your budget. Your first product can be a small customer-facing or internal tool. You don't need to build a new AI model or launch a software venture."}</span></p>
        <p><span data-cf-component-id="field-e849f6363bee4152b5028eff0adbd605" data-cf-component-type="text">{/*cf-review:field-e849f6363bee4152b5028eff0adbd605*/"You can use conversational AI software to build or configure a tool that responds to questions in everyday language. You might use it to answer questions from approved business information. But the conversational interface doesn't itself grant permission to read customer records or take actions. You need to decide those permissions separately."}</span></p>
        <p><span data-cf-component-id="field-8e28cc449ac947809597488e9949ae35" data-cf-component-type="text">{/*cf-review:field-8e28cc449ac947809597488e9949ae35*/"AI-generated information needs checking against a trustworthy source before you rely on it, as business.gov.au advises (https://business.gov.au/online-and-digital/artificial-intelligence). That's why we put the task and its information sources ahead of the feature list. This advice is for small teams without a dedicated AI function. It isn't for enterprise procurement or anyone seeking personalised legal, medical or financial advice."}</span></p>
        </div>
        <div data-cf-component-id={"section:use-case"} data-cf-component-type={"section"} data-cf-component-label={"When a simpler interface will do"} data-cf-source-section-id={"use-case"}>
          <h2 id="use-case"><span data-cf-component-id="field-fd164d22e7e746e48ea75bc66db35cd3" data-cf-component-type="text">{CF_REVIEW_fd164d22e7e746e48ea75bc66db35cd3}</span></h2>
          <p><span data-cf-component-id="field-045ad58c769f4de3aed768c11295b464" data-cf-component-type="text">{/*cf-review:field-045ad58c769f4de3aed768c11295b464*/"If a simpler interface handles your task, we recommend using it. Choose a form when you need known fields filled in, search when someone needs to find a document, a fixed FAQ for stable repeated answers, and existing automation for a predictable sequence. Consider conversation when varied phrasing or useful follow-up questions add something those options can't. A chat bubble doesn't make a missing workshop policy any easier to find."}</span></p>
          <p><span data-cf-component-id="field-3e4a7242c2ed490196addc2e9c4047aa" data-cf-component-type="text">{/*cf-review:field-3e4a7242c2ed490196addc2e9c4047aa*/"Write the task into a decision record before you compare tools. Use the filled example below as your starting point, replacing its entries with your own approved details. Keep that workflow unchanged as you investigate platform options, so you compare how each would handle the same job. If clearer public information would solve the problem, you can stop there."}</span></p>
          <div data-cf-style-role="callout" data-cf-scenario="true">
            <QuoteBlock title="Hypothetical worked example" variant="purple">
              <span style={{ display: 'block' }}><strong><span data-cf-component-id="field-3016a19844604771a947f4e210e3bcc1" data-cf-component-type="text">{/*cf-review:field-3016a19844604771a947f4e210e3bcc1*/"A craft-workshop business scopes a read-only assistant"}</span></strong></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><span data-cf-component-id="field-1c7c88efbdef48b287d1be3b07645a5b" data-cf-component-type="text">{/*cf-review:field-1c7c88efbdef48b287d1be3b07645a5b*/"A small Australian craft-workshop business is considering an assistant for practical questions before booking. It would explain published information without accessing customer records or changing bookings."}</span></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><strong><span data-cf-component-id="field-a85531b6488a45078fe8bde267f4a782" data-cf-component-type="text">{/*cf-review:field-a85531b6488a45078fe8bde267f4a782*/"Intended user"}</span>:</strong> <span data-cf-component-id="field-9f5eead03add49b1970ef5dd920c051d" data-cf-component-type="text">{/*cf-review:field-9f5eead03add49b1970ef5dd920c051d*/"A prospective workshop attendee."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-eb5bf8155ad147c2b3bd29d21745f52d" data-cf-component-type="text">{/*cf-review:field-eb5bf8155ad147c2b3bd29d21745f52d*/"Routine task"}</span>:</strong> <span data-cf-component-id="field-f0049bb03104495cbb138a30f6df9b72" data-cf-component-type="text">{/*cf-review:field-f0049bb03104495cbb138a30f6df9b72*/"Finding preparation and attendance information before booking."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-635e5fa5626f4e519a34f32174368a2c" data-cf-component-type="text">{/*cf-review:field-635e5fa5626f4e519a34f32174368a2c*/"Current baseline"}</span>:</strong> <span data-cf-component-id="field-fc7735f6ad7c46809d784a12a04b3924" data-cf-component-type="text">{/*cf-review:field-fc7735f6ad7c46809d784a12a04b3924*/"Staff find answers on the public workshop pages. Handling time has not yet been measured."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-9a31e7e2d783404f93746f40c8fd7540" data-cf-component-type="text">{/*cf-review:field-9a31e7e2d783404f93746f40c8fd7540*/"Approved information sources"}</span>:</strong> <span data-cf-component-id="field-36f09b3445074825884d9a67f10596cf" data-cf-component-type="text">{/*cf-review:field-36f09b3445074825884d9a67f10596cf*/"Published workshop descriptions, materials information and venue details."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-24aab87905704b3d97e1435329a3194c" data-cf-component-type="text">{/*cf-review:field-24aab87905704b3d97e1435329a3194c*/"Excluded requests"}</span>:</strong> <span data-cf-component-id="field-2073928e94774d989dfb3d40e2b30e88" data-cf-component-type="text">{/*cf-review:field-2073928e94774d989dfb3d40e2b30e88*/"Live seat availability, booking changes, refunds, payments and individual customer records."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-93583c6236eb424dba1ccd9dbaa041b6" data-cf-component-type="text">{/*cf-review:field-93583c6236eb424dba1ccd9dbaa041b6*/"Accountable human owner"}</span>:</strong> <span data-cf-component-id="field-34850168d65e4e8cbc8f010beea4f8c5" data-cf-component-type="text">{/*cf-review:field-34850168d65e4e8cbc8f010beea4f8c5*/"The workshop manager."}</span></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><span data-cf-component-id="field-57ad54720d91441da35bd0d285ebd2d6" data-cf-component-type="text">{/*cf-review:field-57ad54720d91441da35bd0d285ebd2d6*/"The business has no developer to maintain a custom integration. Its existing software capabilities, provider terms and costs are still unverified, so the manager will first check whether a clearer FAQ can answer the scoped questions."}</span></span>
            </QuoteBlock>
          </div>
          <div data-cf-component-id={"image:use-case"} data-cf-component-type={"image"} data-cf-component-label={"Image: When a simpler interface will do"} data-cf-source-section-id={"use-case"}>
          <ArticleImageBlock
            src={/*cf-review:field-ffa8101f2e8f43198e4bdecd3a84d829*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e0d8ee51-9815-40d5-ac21-d59f642ed324.jpg?alt=media&token=401d0a71-8631-4b76-b500-cc5ca797ccac"}
            alt={/*cf-review:field-966425b1aea2482ab8ae41205fbff4a3*/"Person holding a pen over an open notebook on a wooden table beside a laptop, mug, and potted plant near a window."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"section:safeguards"} data-cf-component-type={"section"} data-cf-component-label={"Human oversight and data controls come first"} data-cf-source-section-id={"safeguards"}>
          <h2 id="safeguards"><span data-cf-component-id="field-3ebc547b7f614ddd9c1c7fda2540fb5b" data-cf-component-type="text">{CF_REVIEW_3ebc547b7f614ddd9c1c7fda2540fb5b}</span></h2>
          <p><span data-cf-component-id="field-84890d17d90c43608dc658d8d942da6f" data-cf-component-type="text">{/*cf-review:field-84890d17d90c43608dc658d8d942da6f*/"For your proposed pilot, we'd require approved information access, an accountable owner, reviewable answers, a working human fallback and provider terms you understand. Legal 500's practical guide for Australian companies stresses governance and human oversight when managing AI risks (https://www.legal500.com/intelligence/australia/technology/ai-and-business-a-practical-guide-for-australian-companies). These are our due diligence requirements. They don't certify legal compliance. Voice, extra messaging channels, branding and advanced analytics can wait unless your chosen task needs them."}</span></p>
          <p><span data-cf-component-id="field-0822c7113f574fc1ad8ec36b7885314b" data-cf-component-type="text">{/*cf-review:field-0822c7113f574fc1ad8ec36b7885314b*/"Before you connect anything, ask the provider what the tool can read, how deletion works and whether inputs or outputs can be used for training. Ask separately where storage and processing happen. Don't treat an Australian sales presence or a setting that disables training as confirmation of Australian hosting. Keep the answers and supporting provider terms in your decision record, separating confirmed controls from unanswered questions."}</span></p>
          <p><span data-cf-component-id="field-3989e9b2cccd44b38485897ea42a1e02" data-cf-component-type="text">{/*cf-review:field-3989e9b2cccd44b38485897ea42a1e02*/"Decide which requests must stop, who receives them, what information gets passed across and what happens when that person is unavailable. Test the handover. A button labelled 'contact support' doesn't prove that someone will respond. If you can't identify who takes responsibility when the tool reaches its limit, leave that candidate off your shortlist until you can."}</span></p>
          <div data-cf-component-id={"image:safeguards"} data-cf-component-type={"image"} data-cf-component-label={"Image: Human oversight and data controls come first"} data-cf-source-section-id={"safeguards"}>
          <ArticleImageBlock
            src={/*cf-review:field-a621815075b84b358f45cafb78a11c15*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9ba0ac20-ee2e-478a-8262-910ea63a54c0.jpg?alt=media&token=46a15a6f-3dbe-47a0-84ab-d41e279dfd9e"}
            alt={/*cf-review:field-47b281079acc4cd6a0066010b0407013*/"An open laptop, bottle, mug, notebook and pen sit on a wooden table beside plants and large windows overlooking water and buildings."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"callout:unapproved-data-warning"} data-cf-component-type={"callout"} data-cf-component-label={"Keep unapproved data out"}>
          <QuoteBlock title="Keep unapproved data out" variant="orange">
            {"Don't enter confidential or personal information into unapproved tools. Start with approved public business information and synthetic questions. Before you connect anything or invite users, confirm what the tool records, who can access those records and how long they're retained."}
          </QuoteBlock>
        </div>
        <div data-cf-component-id={"section:comparison"} data-cf-component-type={"section"} data-cf-component-label={"Compare three routes against the same job"} data-cf-source-section-id={"comparison"}>
          <h2 id="comparison"><span data-cf-component-id="field-00d491c0e53e4564b836e26cc353e48b" data-cf-component-type="text">{CF_REVIEW_00d491c0e53e4564b836e26cc353e48b}</span></h2>
          <p><span data-cf-component-id="field-25342a0e858a4fbab98262b3fe992cb8" data-cf-component-type="text">{/*cf-review:field-25342a0e858a4fbab98262b3fe992cb8*/"We recommend investigating a feature in software you already use before commissioning anything new. business.gov.au recommends starting with existing tools when researching AI solutions (https://business.gov.au/online-and-digital/artificial-intelligence). You can configure an existing conversational feature, configure a separate no-code chatbot builder, or commission custom conversational software using APIs."}</span></p>
          <p><span data-cf-component-id="field-75314a4658044f728e36a4afa2f40a1d" data-cf-component-type="text">{/*cf-review:field-75314a4658044f728e36a4afa2f40a1d*/"For each important capability, keep a dated provider document or written answer in your decision record. Mark unresolved capabilities unverified instead of assuming they're included."}</span></p>
          <h3><span data-cf-component-id="field-48c5e438f2d944eb9fa659fcbe99b14b" data-cf-component-type="text">{/*cf-review:field-48c5e438f2d944eb9fa659fcbe99b14b*/"What to verify for each route"}</span></h3>
          <p><span data-cf-component-id="field-905708c270fb424e937ca3a7f1ea956f" data-cf-component-type="text">{/*cf-review:field-905708c270fb424e937ca3a7f1ea956f*/"Copy this matrix into your decision record. Name a candidate in each column and replace the prompts with your findings and supporting document references. Compare the same workflow and pilot duration across candidates. Use the budget calculation below for the AUD totals, keeping internal hours separate."}</span></p>
          <p><span data-cf-component-id="field-d07b095288d242c7aa91c12200765a8f" data-cf-component-type="text">{/*cf-review:field-d07b095288d242c7aa91c12200765a8f*/"| Record or check | Feature in existing software | Separate no-code chatbot builder | Custom API approach |\n| --- | --- | --- | --- |\n| Candidate | Software, feature and plan: ___ | Builder and plan: ___ | Proposed implementation and API services: ___ |\n| Setup effort | Confirm plan inclusion. Record configuration tasks, owner and estimated hours: ___ | Record configuration tasks, owner and estimated hours: ___ | Record build and maintenance responsibilities for software, access controls, handover and logs; estimate hours: ___ |\n| Existing software integration | Request a demonstration of the required workflow in your software. Record result: ___ | Request a demonstration of the actual connector to your software. Record result: ___ | Scope the required connection and request a demonstration. Record result: ___ |\n| Data access | Verify what the feature can read or change and the permissions needed: ___ | Verify builder and connector permissions against approved information access: ___ | Specify access controls and verify what each connected service can read or change: ___ |\n| Retention and deletion | Record the feature's retention and deletion terms: ___ | Record retention and deletion terms for the builder and connected providers: ___ | Record each service's terms and who deletes stored copies: ___ |\n| Training controls | Record applicable training terms and settings: ___ | Record training terms for the builder and underlying provider, plus applicable settings: ___ | Record API provider training terms and implementation settings: ___ |\n| Human handover | Demonstrate the fallback to your named recipient, including their unavailability and a failed handover. Record result: ___ | Demonstrate the builder's handover to your named recipient, including their unavailability and a failed handover. Record result: ___ | Assign responsibility for building and maintaining the fallback; demonstrate its normal and failure paths. Record result: ___ |\n| Usage limits | Record plan allowances, billing units, overages and spending controls: ___ | Record billing units, allowances, overages and spending controls: ___ | Record provider limits, usage billing and implementation budget controls: ___ |\n| Export options | Confirm exportable content, formats and reuse rights: ___ | Confirm exportable content, formats and reuse rights: ___ | Specify exportable content, formats and reuse rights; name the export function's maintainer: ___ |\n| Total pilot cash cost in AUD | Obtain any extra plan quote and calculate the full incremental total: ___ | Obtain subscription and connector quotes and calculate the full incremental total: ___ | Obtain development, usage and support quotes and calculate the full incremental total: ___ |\n| Assumptions and unresolved checks | Record estimates, assumptions and questions still awaiting confirmation: ___ | Record estimates, assumptions and questions still awaiting confirmation: ___ | Record estimates, assumptions and questions still awaiting confirmation: ___ |"}</span></p>
          <h3><span data-cf-component-id="field-1d64566da65241549fa3cc5fe9e0f5f7" data-cf-component-type="text">{/*cf-review:field-1d64566da65241549fa3cc5fe9e0f5f7*/"What belongs in your pilot budget"}</span></h3>
          <p><span data-cf-component-id="field-61eefc766f354b2f915b27b6755ad492" data-cf-component-type="text">{/*cf-review:field-61eefc766f354b2f915b27b6755ad492*/"Calculate incremental cash cost from subscription commitments, usage, connectors, external setup and support, plus applicable taxes and conversion fees. Record pilot duration, seats, expected usage, billing unit, trial expiry, minimum commitment, conversion date and GST treatment."}</span></p>
          <p><span data-cf-component-id="field-6557ed5236ba4cab94764410304be2d0" data-cf-component-type="text">{/*cf-review:field-6557ed5236ba4cab94764410304be2d0*/"Enter confirmed AUD totals when quoted, otherwise unknown. Record internal setup and review hours separately, valuing them only with your own explicit hourly assumption."}</span></p>
          <p><span data-cf-component-id="field-8b5d5d8177f141c3a30e220296ccbeaa" data-cf-component-type="text">{/*cf-review:field-8b5d5d8177f141c3a30e220296ccbeaa*/"For the workshop use case, investigate the existing feature first if it meets the requirements, keeping a builder as an alternative. Defer custom development unless a necessary capability remains unmet and someone can maintain it."}</span></p>
        </div>
        <div data-cf-component-id={"section:pilot"} data-cf-component-type={"section"} data-cf-component-label={"Your pilot needs rules before it starts"} data-cf-source-section-id={"pilot"}>
          <h2 id="pilot"><span data-cf-component-id="field-53703ac38b484e14a5e8fa6f94f55ab2" data-cf-component-type="text">{CF_REVIEW_53703ac38b484e14a5e8fa6f94f55ab2}</span></h2>
          <p><span data-cf-component-id="field-8880242c87a24d1badfcb3d47c96d612" data-cf-component-type="text">{/*cf-review:field-8880242c87a24d1badfcb3d47c96d612*/"We think you should agree on what would make you stop before paying to start. For a small team, the pilot should test whether reviewed answers reduce work within your budget. Add the test rules to your decision record so enthusiasm doesn't rewrite them later."}</span></p>
          <div data-cf-component-id={"image:pilot"} data-cf-component-type={"image"} data-cf-component-label={"Image: Your pilot needs rules before it starts"} data-cf-source-section-id={"pilot"}>
          <ArticleImageBlock
            src={/*cf-review:field-e09d3b62710c40c5bd0ccd7b8cd44b3d*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-50414b88-7f9a-4f5f-a869-fae1d1e71aef.jpg?alt=media&token=0f1419f3-3ae6-4005-8cf3-90ed28392653"}
            alt={/*cf-review:field-7124d1c396b94cb189d68c471467b275*/"Close-up of a woman holding a pen near her chin and looking toward a man with glasses who is looking down."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-f951a70e229249688a5c32027821eae3" data-cf-component-type="text">{/*cf-review:field-f951a70e229249688a5c32027821eae3*/"Set the baseline and limits"}</span></h3>
          <p><span data-cf-component-id="field-9a083ba083cc4c549cf8696c02a4c89e" data-cf-component-type="text">{/*cf-review:field-9a083ba083cc4c549cf8696c02a4c89e*/"Choose a short window. For example, you could reserve two weeks as a planning choice. Record start and end dates, the accountable owner and an actual spending ceiling in AUD before any paid use. Time the current manual lookup workflow first, using the same task types you'll test with the tool."}</span></p>
          <p><span data-cf-component-id="field-7a491a21ef5f4033bb4d9a554f0e5d51" data-cf-component-type="text">{/*cf-review:field-7a491a21ef5f4033bb4d9a554f0e5d51*/"Your test questions should cover more than straightforward requests. For the workshop task, include materials and venue questions, ambiguous wording, unavailable facts, booking changes that require a person, and requests to ignore the tool's boundaries. Write the expected answer or fallback beside each question before testing."}</span></p>
          <h3><span data-cf-component-id="field-f2a9efbe975c4b118a72edf15db57ccd" data-cf-component-type="text">{/*cf-review:field-f2a9efbe975c4b118a72edf15db57ccd*/"Review the answers"}</span></h3>
          <p><span data-cf-component-id="field-f822fd1e711d419fb471e97800f73e84" data-cf-component-type="text">{/*cf-review:field-f822fd1e711d419fb471e97800f73e84*/"Following business.gov.au's guidance on checking AI-generated information (https://business.gov.au/online-and-digital/artificial-intelligence), we recommend that your pilot's owner check every test response and each customer-facing pilot answer against the approved source before external use. Our proposed acceptance criteria are that relevant facts match, essential details aren't omitted, unsupported promises are absent, and unavailable or excluded requests reach the agreed fallback."}</span></p>
          <p><span data-cf-component-id="field-f2dc0fc7336e4b6d95c33d5f53c6612b" data-cf-component-type="text">{/*cf-review:field-f2dc0fc7336e4b6d95c33d5f53c6612b*/"Measure completed work. Don't judge success by response speed. Track lookup, prompting, review, correction and handover time, and include setup effort once when comparing total human effort with the matched manual baseline. Log each failed question, the error, its consequence, the correction and the person responsible. Released time isn't automatically cash saved."}</span></p>
          <h3><span data-cf-component-id="field-19fcf945628d453c85863ccc0961bf21" data-cf-component-type="text">{/*cf-review:field-19fcf945628d453c85863ccc0961bf21*/"Use your thresholds to decide"}</span></h3>
          <p><span data-cf-component-id="field-5b0b5ad85b1d472a922514b4c98d4b83" data-cf-component-type="text">{/*cf-review:field-5b0b5ad85b1d472a922514b4c98d4b83*/"Write the continuation gates before launch: every reviewed case must meet the answer or fallback criteria, critical failures must be resolved, total human effort must improve against the matched baseline, and spending must stay within your written ceiling. At the end, record whether the evidence supports continuing, changing the setup or stopping."}</span></p>
          <p><span data-cf-component-id="field-551115430d64426494b09d912b1ec0b8" data-cf-component-type="text">{/*cf-review:field-551115430d64426494b09d912b1ec0b8*/"Pause immediately if information access breaches your approved boundaries, a critical handover fails or the budget runs out. Change or stop if the quality, time or cost gates fail. A successful small test supports another bounded trial. It doesn't establish that the tool will work reliably at scale."}</span></p>
        </div>
        <div data-cf-component-id={"section:conclusion"} data-cf-component-type={"section"} data-cf-component-label={"What your shortlist needs"} data-cf-source-section-id={"conclusion"}>
          <h2 id="conclusion"><span data-cf-component-id="field-355a7612aba64621802d3c24aa7721de" data-cf-component-type="text">{CF_REVIEW_355a7612aba64621802d3c24aa7721de}</span></h2>
          <p><span data-cf-component-id="field-c4393c084cd2412d9abbd0cad13b9c62" data-cf-component-type="text">{/*cf-review:field-c4393c084cd2412d9abbd0cad13b9c62*/"You're ready to investigate when your decision record names the chosen task or simpler alternative, the platform routes worth pursuing, the evidence still missing and the person responsible for obtaining it. Don't purchase while essential requirements remain unverified."}</span></p>
          <p><span data-cf-component-id="field-1db8efd64824421f887b5002aac68e89" data-cf-component-type="text">{/*cf-review:field-1db8efd64824421f887b5002aac68e89*/"Take these questions to vendors or peers, and record which answers still need provider documentation:"}</span></p>
          <p><span data-cf-component-id="field-700cd5c16dc04eccaf485a1ea8cf0196" data-cf-component-type="text">{/*cf-review:field-700cd5c16dc04eccaf485a1ea8cf0196*/"A peer conversation is optional. Use your drafted questions to judge whether an event listed at /events would help."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-89971a983a424a6083d7a1328c576955" data-cf-component-type="text">{/*cf-review:field-89971a983a424a6083d7a1328c576955*/"Can you demonstrate the integration on our scoped workflow?"}</span></li>
            <li><span data-cf-component-id="field-2a2247e62fb44357b2c06a0f60d11dc5" data-cf-component-type="text">{/*cf-review:field-2a2247e62fb44357b2c06a0f60d11dc5*/"Where is our information stored and processed, how long is it retained, and can it be used for training?"}</span></li>
            <li><span data-cf-component-id="field-21e1db9315d54402a422a58e742114b2" data-cf-component-type="text">{/*cf-review:field-21e1db9315d54402a422a58e742114b2*/"Who receives a human handover, and what happens if that handover fails?"}</span></li>
            <li><span data-cf-component-id="field-d1746fc25ae640a0aae6fdacd6b3406f" data-cf-component-type="text">{/*cf-review:field-d1746fc25ae640a0aae6fdacd6b3406f*/"What's the full AUD commitment, including setup, usage overages, support and leaving the service?"}</span></li>
          </ul>
          <div data-cf-component-id={"image:conclusion"} data-cf-component-type={"image"} data-cf-component-label={"Image: What your shortlist needs"} data-cf-source-section-id={"conclusion"}>
          <ArticleImageBlock
            src={/*cf-review:field-8260fb3098794d4f9167f9d3e9ad7d9c*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-4eaea978-29e1-469e-9d94-ed7353374a0a.jpg?alt=media&token=77e59f06-202c-4b90-8c6d-e6a4f0ed3549"}
            alt={/*cf-review:field-16d7057ba46c443bbd611361b9f9b699*/"Three people sit at a wooden table with a laptop, notebooks and mugs. One gestures while another writes. Bookshelves and plants line the room."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free worksheet"
            title={"Conversational AI Pilot Decision Record"}
            description="Use this worksheet to scope one conversational AI workflow, record provider evidence and set pilot rules before you commit."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fchoosing-a-conversational-artificial-intelligence-platform-worksheet-21f665ca.pdf?alt=media&token=beaf1501-d7d1-4e4f-a3ce-9dc28743904a"
            accent="purple"
            previewCards={[
              {
                title: "Data control record",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Pilot stop rules",
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
            {id: 2, href: "https://www.legal500.com/intelligence/australia/technology/ai-and-business-a-practical-guide-for-australian-companies", title: "AI and business - A practical guide for Australian companies | Legal 500", publisher: "", category: "guide"},
            {id: 3, href: "https://www.dialpad.com/blog/conversational-ai/", title: "What Is Conversational AI? Definition, Examples & Benefits | Dialpad", publisher: "", category: "guide"},
            {id: 4, href: "https://www.moveworks.com/us/en/resources/blog/how-to-choose-conversational-ai-platform", title: "Top 10 Conversational AI Platforms for Enterprises in 2026", publisher: "", category: "guide"},
            {id: 5, href: "https://mlai.au/events", title: "AI & Machine Learning Events in Australia | MLAI", publisher: "", category: "guide"},
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
