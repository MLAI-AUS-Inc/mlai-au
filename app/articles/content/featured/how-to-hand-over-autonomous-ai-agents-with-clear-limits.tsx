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
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import { ArticleCallout } from '../../../components/articles/ArticleCallout'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'

export const useCustomHeader = true

const TOPIC = (/*cf-review:field-ef02e1f590444e31aba56583ca71b678*/"How to Hand Over Autonomous AI Agents With Clear Limits")
export const CATEGORY = "featured"
export const SLUG = "how-to-hand-over-autonomous-ai-agents-with-clear-limits"
export const DATE_PUBLISHED = "2026-10-15"
export const DATE_MODIFIED = "2026-10-15"
export const DESCRIPTION = "Draft an AI agent handover sheet with permissions, human approvals, operating limits and a stop procedure before your small-business pilot begins."
const HERO_IMAGE = (/*cf-review:field-2727c72d767d4a87a882047fe8e3ff4e*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-99d8cfc2-ede5-4f5a-8979-03cf50c8200a.jpg?alt=media&token=0a12fb75-b95d-46d5-af48-abf0fb5d8578")
const HERO_IMAGE_ALT = "Two people look at a sheet of paper at a wooden table, one holding it and the other pointing with a pen, beside an open laptop."
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
        <div
          role="img"
          aria-label={author.name}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 bg-cover bg-center text-lg font-semibold text-slate-700"
          style={author.avatarUrl ? { backgroundImage: `url(${author.avatarUrl})` } : undefined}
        >
          {author.avatarUrl ? null : initials}
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
]

export const summaryHighlights = {
  heading: "Key facts: How to Hand Over Autonomous AI Agents With Clear Limits",
  intro: "Draft an AI agent handover sheet with permissions, human approvals, operating limits and a stop procedure before your small-business pilot begins.",
  items: [
    { label: "Can you give me an example of an autonomous agent?", description: "A hypothetical customer-enquiry agent reads an approved public FAQ and creates reply drafts for human review. It has no customer-mailbox access or sending connector; those permission boundaries require verification before launch." },
    { label: "What belongs in an AI agent handover?", description: "An AI agent handover records the purpose, named owner and backup, approved data and tools, permitted actions, approval gates, operating limits, logging and stop procedure. Unknown essential controls must be marked \u201cunverified\u2014pilot blocked\u201d." },
    { label: "How do you stop an AI agent workflow?", description: "The owner or backup pauses intake, handles queued and active work, and involves an authorised administrator to disable relevant access where supported. Check logs and destinations for completed actions: stopping does not undo them." },
  ],
}

export const articleMeta = {
  title: "How to Hand Over Autonomous AI Agents With Clear Limits",
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

      <ArticleTocPlaceholder className="bg-transparent" />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Write the boundaries before handing over the work"} data-cf-source-section-id={"intro"}>
        <h2><span data-cf-component-id="field-47000dd9a03f47339fa684fb4d0afb0d" data-cf-component-type="text">{/*cf-review:field-47000dd9a03f47339fa684fb4d0afb0d*/"Write the boundaries before handing over the work"}</span></h2>
        <p><strong>{TOPIC}</strong> — <span data-cf-component-id="field-e52de5d6301542a79a449094b4eb0b28" data-cf-component-type="text">{/*cf-review:field-e52de5d6301542a79a449094b4eb0b28*/"Before handing work to an AI agent, write down its purpose, named owner and backup, permitted tools and actions, human approval gates, operating limits and stop procedure. Make those decisions specific enough that someone else on your team can tell what is allowed, what must wait for review and who can intervene. The owner remains accountable for the workflow even when the software takes steps without asking."}</span></p>
        <p><span data-cf-component-id="field-8adc77ccfacb42429c36a0f51ce57770" data-cf-component-type="text">{/*cf-review:field-8adc77ccfacb42429c36a0f51ce57770*/"An AI agent is software that uses information to choose steps towards a goal, sometimes through connected tools. In autonomous AI agents, \u201cautonomous\u201d describes the steps the software can take without asking each time. It does not grant unrestricted permission to access information or act on your business\u2019s behalf."}</span></p>
        <p><span data-cf-component-id="field-158d892edf8b4672a1c9ef69d7321b0b" data-cf-component-type="text">{/*cf-review:field-158d892edf8b4672a1c9ef69d7321b0b*/"Business.gov.au advises checking AI-generated information against trustworthy sources before relying on it. Build that review into the handover rather than leaving it as an informal expectation."}</span></p>
        </div>
        <div id="permission-boundaries" data-cf-component-id={"section:permission-boundaries"} data-cf-component-type={"section"} data-cf-component-label={"Separate reading, drafting, changing and acting"} data-cf-source-section-id={"permission-boundaries"}>
          <h2><span data-cf-component-id="field-8ce2d8f752f5492a88730faaa36e7b31" data-cf-component-type="text">{/*cf-review:field-8ce2d8f752f5492a88730faaa36e7b31*/"Separate reading, drafting, changing and acting"}</span></h2>
          <p><span data-cf-component-id="field-6ebab4599da642c28aa8f67446508a0d" data-cf-component-type="text">{/*cf-review:field-6ebab4599da642c28aa8f67446508a0d*/"Write permissions as separate decisions in your handover. Reading means viewing approved information, such as a public FAQ. Drafting means creating proposed text in an approved output location. Changing means editing an existing business record. Acting externally means sending a message, publishing content or making a purchase. These are planning categories, not a claim about how any particular product divides its controls. Permission to read information does not grant permission to change it, and permission to draft a reply does not grant permission to send it."}</span></p>
          <p><span data-cf-component-id="field-9932ddd01fa14081a9a3984de2c297c7" data-cf-component-type="text">{/*cf-review:field-9932ddd01fa14081a9a3984de2c297c7*/"Replace broad wording such as \u201caccess to customer service\u201d with the actual account, connected tool, dataset or folder and the allowed operation. Give the agent only the access its task needs."}</span></p>
          <p><span data-cf-component-id="field-1419936a8fbb40858284d47c3a02f3c8" data-cf-component-type="text">{/*cf-review:field-1419936a8fbb40858284d47c3a02f3c8*/"OpenAI Academy\u2019s small-business workshop advises checking the intended account or workspace, providing only necessary information and keeping a person responsible before acting. Its suggested prompt boundaries include keeping work as a draft and flagging missing information. Those instructions express your intent; they do not demonstrate that tool permissions enforce it."}</span></p>
          <div data-cf-component-id={"image:permission-boundaries"} data-cf-component-type={"image"} data-cf-component-label={"Image: Separate reading, drafting, changing and acting"} data-cf-source-section-id={"permission-boundaries"}>
          <ArticleImageBlock
            src={/*cf-review:field-921bc7e2a2c5446a8d06e69645764c31*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d428681f-89b7-4743-9ef6-b9cbc1d52dd3.jpg?alt=media&token=9835efa3-db6b-44e7-9088-025d6c0e9807"}
            alt={/*cf-review:field-22a1f21607054d11b98dc3a8ab02177f*/"A person writes in an open notebook at a wooden table beside a laptop, smartphone, mug, and potted plant."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-788ddd747474419e857d28c95857651d" data-cf-component-type="text">{/*cf-review:field-788ddd747474419e857d28c95857651d*/"Make approval a real boundary"}</span></h3>
          <p><span data-cf-component-id="field-b744110d293946da8f0fdbb4d24df4bf" data-cf-component-type="text">{/*cf-review:field-b744110d293946da8f0fdbb4d24df4bf*/"Name the reviewer and backup, what they must check, where their decision is recorded and what prevents action without approval. For a customer-reply draft, require the reviewer to check factual claims against the approved source and check any promises before release. Record approval against the particular draft reviewed. If approval is missing or the source cannot answer the question, leave the work pending and refer it to the named owner."}</span></p>
          <p><span data-cf-component-id="field-d568b1c0931746729ea5ec74464f1d6f" data-cf-component-type="text">{/*cf-review:field-d568b1c0931746729ea5ec74464f1d6f*/"For a draft-only pilot, keep sending in a separate, human-controlled workflow and do not connect the agent to sending tools. Check the chosen product\u2019s actual permissions rather than assuming it separates drafting from sending. If you cannot verify that separation, keep the workflow manual."}</span></p>
        </div>
        <div id="handover-template" data-cf-component-id={"section:handover-template"} data-cf-component-type={"section"} data-cf-component-label={"Copy this agent handover sheet"} data-cf-source-section-id={"handover-template"}>
          <h2><span data-cf-component-id="field-75258a98faf84e779a3207fb44b07d31" data-cf-component-type="text">{/*cf-review:field-75258a98faf84e779a3207fb44b07d31*/"Copy this agent handover sheet"}</span></h2>
          <p><span data-cf-component-id="field-523fbb5b93964113872c3245a4299b53" data-cf-component-type="text">{/*cf-review:field-523fbb5b93964113872c3245a4299b53*/"Copy these fields into an editable document for your chosen workflow. For example, keep the handover as a one-page working summary, with detailed tool controls in a separate, clearly referenced stop record. This is an original planning template, not a legal compliance form or evidence that your tools enforce the boundaries you write down."}</span></p>
          <p><span data-cf-component-id="field-c2362cd9915948e0bf334b8fd580cce8" data-cf-component-type="text">{/*cf-review:field-c2362cd9915948e0bf334b8fd580cce8*/"Replace every bracketed field with a decision or an explicit unresolved issue. Mark any unknown permission or control \u201cunverified\u2014pilot blocked\u201d, and name who will check it. A completed draft records your intentions; authorising the pilot requires evidence that the necessary permissions, approval gates and stop controls work in your chosen configuration."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-65609ab42bfe48879a96bef2eef82bd4" data-cf-component-type="text">{/*cf-review:field-65609ab42bfe48879a96bef2eef82bd4*/"Purpose and scope: [business task and intended output]. Exclusions: [tasks, decisions and information outside scope]. Workflow name/version: [identifier]."}</span></li>
            <li><span data-cf-component-id="field-7e0314816cfb4d2fb1d1ba2199fc2cfb" data-cf-component-type="text">{/*cf-review:field-7e0314816cfb4d2fb1d1ba2199fc2cfb*/"Accountability: [named owner and contact route]. Backup: [named person and contact route]. Pilot start/end dates: [dates]. Supervised operating window: [hours and time zone]."}</span></li>
            <li><span data-cf-component-id="field-d8a1cb1a65a3475488b9f59a6f05a191" data-cf-component-type="text">{/*cf-review:field-d8a1cb1a65a3475488b9f59a6f05a191*/"Approved access: [tools, workspace, accounts and connectors]. Approved inputs: [specific datasets, files or folders]. Draft destination: [location]. Do not enter confidential or personal data into unapproved tools."}</span></li>
            <li><span data-cf-component-id="field-8a8ddd71e3b140df940dc168677b058c" data-cf-component-type="text">{/*cf-review:field-8a8ddd71e3b140df940dc168677b058c*/"Permitted operations: read [specified information]; create drafts [specified location]. Prohibited operations: [record changes, source-file overwrites, sending, publishing, purchasing and other external actions]. Actual permission evidence: [reference or unverified\u2014pilot blocked]."}</span></li>
            <li><span data-cf-component-id="field-f2d96dcfbd284e12b713226ffa27ed76" data-cf-component-type="text">{/*cf-review:field-f2d96dcfbd284e12b713226ffa27ed76*/"Approval gate: [named reviewer] checks [facts, source accuracy and commitments]. Approval is recorded in [location]. Without approval: [hold behaviour and technical control preventing further action]. Any human sending occurs through [separate human-controlled workflow]."}</span></li>
            <li><span data-cf-component-id="field-a00faa2b7d5e43debe58de9cc0c3d1ba" data-cf-component-type="text">{/*cf-review:field-a00faa2b7d5e43debe58de9cc0c3d1ba*/"Escalation: missing facts, uncertainty or out-of-scope work go to [person/contact route]. While awaiting a decision: [hold or manual handling]."}</span></li>
            <li><span data-cf-component-id="field-9b577fa0498a4327bbf505d5c015e172" data-cf-component-type="text">{/*cf-review:field-9b577fa0498a4327bbf505d5c015e172*/"Operating limits: maximum run time [duration]; task volume [cap]; retries [cap]; total spending [A$ amount and included charges]. For each limit, record [enforced control or named supervisor and checking schedule]. Alerts alone do not enforce a cap."}</span></li>
            <li><span data-cf-component-id="field-cfa62a7adeb54edaae9bc72e7da584ec" data-cf-component-type="text">{/*cf-review:field-cfa62a7adeb54edaae9bc72e7da584ec*/"Logging: [location and authorised readers]. Record [item identifier, time, workflow version, outcome, reviewer decision, tool activity, errors and cost], without unnecessary personal information."}</span></li>
            <li><span data-cf-component-id="field-1da03e9abf104368a829536f60248306" data-cf-component-type="text">{/*cf-review:field-1da03e9abf104368a829536f60248306*/"Stop and fallback: stop for [privacy concerns, unexpected access/actions, failed controls or exceeded limits]. Who may stop: [names]. Tool-specific stop record: [location/version, operator, verified controls for triggers, queued/active work and connection access, and logs/destinations to inspect]. Manual fallback: [workflow and responsible person]."}</span></li>
            <li><span data-cf-component-id="field-cc7bd1a53e974b4487f5facb7fba4b99" data-cf-component-type="text">{/*cf-review:field-cc7bd1a53e974b4487f5facb7fba4b99*/"Restart: only [named authority] may approve after [cause corrected, completed actions checked, pending work reconciled and controls rechecked]. Stopping does not undo completed actions."}</span></li>
            <li><span data-cf-component-id="field-f044564fe04f446c960f523c3d3a0e80" data-cf-component-type="text">{/*cf-review:field-f044564fe04f446c960f523c3d3a0e80*/"Pilot decision: manual baseline [location/status]. Measures [end-to-end handling time, quality/corrections and actual costs]. Human review [reviewer and required checks]. Continue if [conditions]; revise if [contained shortfall]; stop if [critical failure or limit breach]."}</span></li>
            <li><span data-cf-component-id="field-a646d057af4d41fbaecd40d349d009cb" data-cf-component-type="text">{/*cf-review:field-a646d057af4d41fbaecd40d349d009cb*/"Verification and sign-off: permission checks [status/evidence]; approval checks [status/evidence]; stop rehearsal [status/evidence]. Unresolved issues [issue, owner, follow-up date and launch-blocking status]. Draft reviewed by [owner/backup/date]. Pilot authorisation [pending or named approver/date]."}</span></li>
          </ul>
        </div>
        <div id="hypothetical-handover" data-cf-component-id={"section:hypothetical-handover"} data-cf-component-type={"section"} data-cf-component-label={"Hypothetical example: draft customer replies without sending"} data-cf-source-section-id={"hypothetical-handover"}>
          <h2><span data-cf-component-id="field-3b75ca4161eb4687abec08be71b6ba9e" data-cf-component-type="text">{/*cf-review:field-3b75ca4161eb4687abec08be71b6ba9e*/"Hypothetical example: draft customer replies without sending"}</span></h2>
          <p><span data-cf-component-id="field-fed6bb922080493e831a504c94b490e1" data-cf-component-type="text">{/*cf-review:field-fed6bb922080493e831a504c94b490e1*/"Hypothetical teaching example\u2014not implemented or tested. This completed planning draft uses invented names, resource labels, limits and decision thresholds. They are assumptions for the exercise, not customer results, verified product capabilities or recommended benchmarks. Every proposed technical control remains \u201cunverified\u2014pilot blocked\u201d until checked in the chosen tools."}</span></p>
          <p><span data-cf-component-id="field-8a3befb293a14ddf8a3af3edb9e7cbc1" data-cf-component-type="text">{/*cf-review:field-8a3befb293a14ddf8a3af3edb9e7cbc1*/"Purpose and accountability: The fictional workflow, Enquiry Draft Pilot, version A, prepares replies about public opening hours and services. Maya Chen is the accountable owner; Leo Tran is the backup. They supervise operation and use their internal team contact channel for escalation. Account enquiries, complaints, refunds and personalised commitments are outside scope. Missing facts and out-of-scope requests go to Maya, or Leo when Maya is unavailable, without an invented answer."}</span></p>
          <p><span data-cf-component-id="field-884458caa9d94e14b900601a50f0ad3f" data-cf-component-type="text">{/*cf-review:field-884458caa9d94e14b900601a50f0ad3f*/"Tools and data: The proposed business-approved workflow runner, Draft Runner, reads Public FAQ and Approved Inputs, then creates drafts in Draft Review. These are fictional resource labels, not vendor menu paths. Inputs are limited to dummy questions or staff-written, approved non-sensitive summaries. The agent receives no customer-mailbox access. Confidential or personal data must not enter unapproved tools."}</span></p>
          <p><span data-cf-component-id="field-a0c446f423404226b7ab8f03dbaa9d9f" data-cf-component-type="text">{/*cf-review:field-a0c446f423404226b7ab8f03dbaa9d9f*/"Permissions and approval: The proposed access allows reading the FAQ and admitted inputs and creating new drafts in Draft Review. It prohibits sending, publishing, purchasing, changing customer records, overwriting source files and using unapproved tools."}</span></p>
          <p><span data-cf-component-id="field-badf7e35d5c84db4864b0414923bee6d" data-cf-component-type="text">{/*cf-review:field-badf7e35d5c84db4864b0414923bee6d*/"Maya or Leo checks every draft against the FAQ and records approval, required changes or rejection in Review Log. Without approval, the draft stays unused. A person may manually send an approved reply from a separate mail application. The agent has no sending connector, and that separation must be verified before launch."}</span></p>
          <p><span data-cf-component-id="field-dba429df589541c48cae58b2cf3a75db" data-cf-component-type="text">{/*cf-review:field-dba429df589541c48cae58b2cf3a75db*/"Operating limits: In this hypothetical pilot, operation lasts five working days from an authorised start, covers at most 20 eligible enquiries and permits one draft attempt per enquiry, with an A$30 tool-cost ceiling. Maya records the start and end dates when authorising launch. Operation is supervised only."}</span></p>
          <p><span data-cf-component-id="field-f4503525b7944ae08a56a74c7aaffe9f" data-cf-component-type="text">{/*cf-review:field-f4503525b7944ae08a56a74c7aaffe9f*/"The proposed runner configuration would enforce the end date, task count and no-retry rule; Maya or Leo would control each operating session. A provider-side spending cap would need verification. Cost alerts alone would not establish an enforced ceiling. Any limit without a workable, verified enforcement or supervision method remains a launch blocker."}</span></p>
          <p><span data-cf-component-id="field-a3a419a3ff4245dd8b629e2c597378fe" data-cf-component-type="text">{/*cf-review:field-a3a419a3ff4245dd8b629e2c597378fe*/"Logging and escalation: Review Log is restricted to Maya and Leo and records the item ID, time, workflow version, draft outcome, reviewer decision, tool activity and cost. It avoids unnecessary customer information. Either operator may stop the workflow for suspected data exposure, unexpected access, prohibited activity, failed controls or exceeded limits. Maya alone may authorise restart after correction, reconciliation of pending work and repeated checks."}</span></p>
          <p><span data-cf-component-id="field-e9189edd602e4320870952c67485c95c" data-cf-component-type="text">{/*cf-review:field-e9189edd602e4320870952c67485c95c*/"Stop record: Stop Map A identifies Draft Runner, the Approved Inputs pending-work area, and the Public FAQ and Draft Review connections. Maya is the primary stop operator and proposed connection administrator; Leo is the backup, subject to verifying that both have the necessary access."}</span></p>
          <p><span data-cf-component-id="field-87bafa1761144e4dbb8ecb21fdc8ffa8" data-cf-component-type="text">{/*cf-review:field-87bafa1761144e4dbb8ecb21fdc8ffa8*/"The intended procedure is to pause submissions and triggers, hold queued items, check active runs separately, and disable relevant connections where supported and safe. They would inspect runner activity, pending items, draft history and billing records for completed actions, outstanding work and charges."}</span></p>
          <p><span data-cf-component-id="field-500fd66e25a5424985177c73a62c3bdf" data-cf-component-type="text">{/*cf-review:field-500fd66e25a5424985177c73a62c3bdf*/"Exact control locations, shared-account dependencies and effects on queued and active work still require verification using current provider instructions. Uncertain control or output integrity means switching to manual drafting and review."}</span></p>
          <p><span data-cf-component-id="field-d2670111710442daaf44e131c2fff629" data-cf-component-type="text">{/*cf-review:field-d2670111710442daaf44e131c2fff629*/"Pilot decision: Before launch, Maya records a comparable manual baseline for end-to-end handling time, factual quality and cost. Assisted handling time includes preparation, review, corrections and manual sending; setup and rehearsal effort are recorded separately for the overall assessment."}</span></p>
          <p><span data-cf-component-id="field-bcb916d0209347238cb7fd24e0bc5f14" data-cf-component-type="text">{/*cf-review:field-bcb916d0209347238cb7fd24e0bc5f14*/"The hypothetical continue rule requires lower reviewed handling time, no material factual errors or boundary breaches, and costs within the ceiling. A contained quality or time shortfall calls for revision and another agreed scope. Privacy, permission or control failures require stopping. Continuing does not grant sending authority."}</span></p>
          <p><span data-cf-component-id="field-8f3c973133f5414bbd851cc8169b3c5d" data-cf-component-type="text">{/*cf-review:field-8f3c973133f5414bbd851cc8169b3c5d*/"Verification and sign-off: The draft is complete. Permission checks, the baseline and the stop rehearsal are pending. The pilot is not authorised."}</span></p>
          <div data-cf-component-id={"image:hypothetical-handover"} data-cf-component-type={"image"} data-cf-component-label={"Image: Hypothetical example: draft customer replies without sending"} data-cf-source-section-id={"hypothetical-handover"}>
          <ArticleImageBlock
            src={/*cf-review:field-4f17f804a5c842929780548ed13c5241*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-bfc4efe2-5fb8-4867-88f4-0c197da98d3e.jpg?alt=media&token=72cc5271-b7e4-47c6-8947-eed676615664"}
            alt={/*cf-review:field-7749e040efab4f2fbac4f1ab2494d522*/"An open laptop, mug, notebook, pen and phone sit on a wooden desk beside potted plants and a window overlooking city buildings."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"callout:stop-is-not-undo"} data-cf-component-type={"callout"} data-cf-component-label={"A stop prompt is not an access control"}>
          <ArticleCallout title="A stop prompt is not an access control" variant="warning">
            {"Telling an agent \u201cstop\u201d does not reliably remove tool access; use verified workflow and account controls. Stopping does not undo completed actions, so record what happened and what recovery requires."}
          </ArticleCallout>
        </div>
        <div id="stop-and-recover" data-cf-component-id={"section:stop-and-recover"} data-cf-component-type={"section"} data-cf-component-label={"Write the stop procedure for your actual tools"} data-cf-source-section-id={"stop-and-recover"}>
          <h2><span data-cf-component-id="field-f2ab790ee2014572bfac1287b15172f8" data-cf-component-type="text">{/*cf-review:field-f2ab790ee2014572bfac1287b15172f8*/"Write the stop procedure for your actual tools"}</span></h2>
          <p><span data-cf-component-id="field-ed478dd16a8247ab9b95080331e46114" data-cf-component-type="text">{/*cf-review:field-ed478dd16a8247ab9b95080331e46114*/"Write down which person will operate the actual workflow and account controls, and how they will check the result. Attach a compact stop map to the handover for each connected tool. Record its tool and workflow identifier, responsible operator and required access, verified control location, treatment of queued and active work, connection-disable method, evidence to inspect, manual fallback and restart condition."}</span></p>
          <p><span data-cf-component-id="field-7e11b44dd5b94759968ac596a6b88f24" data-cf-component-type="text">{/*cf-review:field-7e11b44dd5b94759968ac596a6b88f24*/"This guide provides a planning checklist, not vendor-specific stop instructions. Fill in these details from your administration screens and current provider instructions, then verify them before launch. If a necessary control remains unverified, keep the workflow manual."}</span></p>
          <h3><span data-cf-component-id="field-9a38c874f11140e89ab1f353100ede9e" data-cf-component-type="text">{/*cf-review:field-9a38c874f11140e89ab1f353100ede9e*/"Pause and isolate"}</span></h3>
          <p><span data-cf-component-id="field-c6a3891797b54efcaf1c36c11910f723" data-cf-component-type="text">{/*cf-review:field-c6a3891797b54efcaf1c36c11910f723*/"The owner or backup should record the stop trigger and time, then pause new manual submissions, schedules and event triggers. Hold or cancel queued work using the controls documented in the stop map. Check active runs separately and establish whether the tool supports cancelling them. Do not treat paused intake as evidence that work already running has stopped."}</span></p>
          <p><span data-cf-component-id="field-9551ca79a98d45fd9ee841ac797d54d2" data-cf-component-type="text">{/*cf-review:field-9551ca79a98d45fd9ee841ac797d54d2*/"The authorised administrator should then disable the relevant workflow connection, integration account or access credential where the product supports it and it is safe to do so. Identify shared-account dependencies before the pilot so the administrator knows what else a change could interrupt. Verify the effect in the connected tools rather than assuming that revoking access instantly cancels every operation."}</span></p>
          <h3><span data-cf-component-id="field-e7a95598a6ca4ebda3761a2b63355dd5" data-cf-component-type="text">{/*cf-review:field-e7a95598a6ca4ebda3761a2b63355dd5*/"Check and recover"}</span></h3>
          <p><span data-cf-component-id="field-2f3dc0ecb4694e6ab935306921c07029" data-cf-component-type="text">{/*cf-review:field-2f3dc0ecb4694e6ab935306921c07029*/"Inspect available workflow logs and destination tools for completed actions, outstanding jobs, duplicate work and charges. Preserve the incident record, including what the operator checked and found. Where logs are incomplete, record the uncertainty and escalate it to the accountable owner rather than concluding that nothing happened."}</span></p>
          <p><span data-cf-component-id="field-a3a1c35e74b8483e9daed75dba6f402e" data-cf-component-type="text">{/*cf-review:field-a3a1c35e74b8483e9daed75dba6f402e*/"Switch to the documented manual workflow whenever control or output integrity is uncertain. Any correction of a completed action needs its own authorisation. Restart only after the cause has been addressed and pending work has been reconciled. Repeat the relevant permission and stop checks, and obtain approval from the named restart authority before resuming. Record that decision in the handover."}</span></p>
        </div>
        <div id="pre-handover-checks" data-cf-component-id={"section:pre-handover-checks"} data-cf-component-type={"section"} data-cf-component-label={"Verify the controls before handing over"} data-cf-source-section-id={"pre-handover-checks"}>
          <h2><span data-cf-component-id="field-6e072581cbab4227828a19d9d60504a1" data-cf-component-type="text">{/*cf-review:field-6e072581cbab4227828a19d9d60504a1*/"Verify the controls before handing over"}</span></h2>
          <p><span data-cf-component-id="field-560eb301262342da93c31e217e308419" data-cf-component-type="text">{/*cf-review:field-560eb301262342da93c31e217e308419*/"Ask your administrator to show what actually prevents an unapproved action, and confirm that the owner and backup can access the controls they are expected to operate."}</span></p>
          <p><span data-cf-component-id="field-f870a80b4c2f40ce9cc443a09b01283e" data-cf-component-type="text">{/*cf-review:field-f870a80b4c2f40ce9cc443a09b01283e*/"Use dummy or approved non-sensitive data in an isolated test setting for permission checks and the stop rehearsal. Do not attempt prohibited actions against real customers, live business records or payment destinations."}</span></p>
          <p><span data-cf-component-id="field-bbe1663a1fc649bda14f5fdfd53fa5a1" data-cf-component-type="text">{/*cf-review:field-bbe1663a1fc649bda14f5fdfd53fa5a1*/"Keep a verification record alongside the handover. Describe what you observed rather than simply writing \u2018passed\u2019, and assign each unresolved issue to someone who can follow it up. A successful rehearsal provides limited evidence for that configuration, not a safety guarantee."}</span></p>
        </div>
        <div data-cf-component-id={"step-list:verify-before-handover"} data-cf-component-type={"step-list"} data-cf-component-label={"Four checks to perform before handover"}>
          <ArticleStepList
            title="Four checks to perform before handover"
            steps={[
            "Inspect accounts, connector permissions, data locations and approval settings with the owner and backup. Compare actual access with the handover sheet.",
            "Check drafting, out-of-scope escalation and withheld approval using dummy or approved non-sensitive inputs in an isolated setting. Verify that sending and record changes are unavailable; non-execution alone does not prove access is denied.",
            "Rehearse the stop record: pause intake, hold queued work, check active runs and disable relevant connections where supported and safe. Inspect logs and destinations, and record any limitations.",
            "Record the tool and workflow version, date, checker, expected behaviour and observed results. Resolve discrepancies and obtain named pilot authorisation before launch. Keep the workflow manual if any necessary control remains unverified.",
            ]}
            accent="teal"
          />
        </div>
        <div id="bounded-pilot" data-cf-component-id={"section:bounded-pilot"} data-cf-component-type={"section"} data-cf-component-label={"Connect the handover to a bounded pilot"} data-cf-source-section-id={"bounded-pilot"}>
          <h2><span data-cf-component-id="field-22f74315eb5441b385772aa5f6884aa7" data-cf-component-type="text">{/*cf-review:field-22f74315eb5441b385772aa5f6884aa7*/"Connect the handover to a bounded pilot"}</span></h2>
          <p><span data-cf-component-id="field-4343363b8775401dbed3a1b291e1f09b" data-cf-component-type="text">{/*cf-review:field-4343363b8775401dbed3a1b291e1f09b*/"Before the pilot begins, record how your team handles comparable eligible tasks manually: end-to-end handling time, corrections or quality issues, and relevant costs. This is your baseline for deciding whether the assisted workflow helps. For the customer-enquiry teaching example, the baseline still needs to be measured; no time saving has been established."}</span></p>
          <p><span data-cf-component-id="field-f0ee7bf985584c77acc80f2f2dd10b64" data-cf-component-type="text">{/*cf-review:field-f0ee7bf985584c77acc80f2f2dd10b64*/"Add the pilot end date, task-volume ceiling, supervised operating window and budget in A$ to the handover. For each limit, record whether the tool stops execution or merely alerts someone. An alert needs a named person to act on it and is not an enforced spending cap."}</span></p>
          <p><span data-cf-component-id="field-807544b946164c22ac81f22e9cc4954e" data-cf-component-type="text">{/*cf-review:field-807544b946164c22ac81f22e9cc4954e*/"Measure the whole assisted workflow, not just how quickly the agent produces text. Include preparing the input, checking the draft, correcting it and sending the approved reply manually. Record setup and stop-rehearsal effort separately, then include that effort in the overall pilot assessment."}</span></p>
          <p><span data-cf-component-id="field-35e82c13bee445678eeb65f21fd4ccc2" data-cf-component-type="text">{/*cf-review:field-35e82c13bee445678eeb65f21fd4ccc2*/"Alongside handling time, log factual errors, corrections, escalations and any action outside the agreed permissions. Track actual tool costs, including relevant subscription and usage charges. Keep human review throughout: a draft-only pilot still requires someone to check every reply against the approved information before using it."}</span></p>
          <p><span data-cf-component-id="field-f823eca3c1b34a43a84a435f2b471376" data-cf-component-type="text">{/*cf-review:field-f823eca3c1b34a43a84a435f2b471376*/"Write the continue, revise and stop rules before launch, so faster drafting cannot quietly outweigh a control failure. Continue only when the agreed time, quality and cost conditions are met and no critical issue remains unresolved. Revise a contained quality or time shortfall by documenting the change, agreeing a new scope and repeating the relevant checks before resuming. Stop for uncontrolled access, privacy concerns, failed stop controls or exceeded operating limits, and follow the handover\u2019s stop-and-recovery procedure rather than simply asking the agent to behave differently."}</span></p>
          <p><span data-cf-component-id="field-966e0bcc136d4d4b95dde5a85cfc85e0" data-cf-component-type="text">{/*cf-review:field-966e0bcc136d4d4b95dde5a85cfc85e0*/"At the review date, use the recorded results to decide the next step. A small pilot provides evidence about that workflow under those conditions, not proof of general productivity gains. If you continue, retain the existing permissions unless a separate review explicitly authorises a change. Better draft performance does not, by itself, justify connecting a sending tool or removing human approval."}</span></p>
          <div data-cf-component-id={"image:bounded-pilot"} data-cf-component-type={"image"} data-cf-component-label={"Image: Connect the handover to a bounded pilot"} data-cf-source-section-id={"bounded-pilot"}>
          <ArticleImageBlock
            src={/*cf-review:field-edfa482ac3e44ccb98a4ff5ff243f221*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-5867c79f-5547-4a35-bb0b-22c4ca886783.jpg?alt=media&token=c67b7758-e1cc-4b9e-821c-41fe98436204"}
            alt={/*cf-review:field-794c597bd7d942b78459fec0c5c21b31*/"Close-up of a person holding a pen near their lips and looking downward, with a laptop and white cup on the desk."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="complete-handover" data-cf-component-id={"section:complete-handover"} data-cf-component-type={"section"} data-cf-component-label={"Finish your draft and take three questions to peers"} data-cf-source-section-id={"complete-handover"}>
          <h2><span data-cf-component-id="field-b5fed697ad8148178f132cf0f06df434" data-cf-component-type="text">{/*cf-review:field-b5fed697ad8148178f132cf0f06df434*/"Finish your draft and take three questions to peers"}</span></h2>
          <p><span data-cf-component-id="field-213dafa63fea4dd6ab06c347ee54ccb2" data-cf-component-type="text">{/*cf-review:field-213dafa63fea4dd6ab06c347ee54ccb2*/"Have the owner and backup review and date the handover draft."}</span></p>
          <p><span data-cf-component-id="field-d09b87033d1a4437a7150417df81def0" data-cf-component-type="text">{/*cf-review:field-d09b87033d1a4437a7150417df81def0*/"Take a sanitised summary to peers, with the unresolved decisions clearly marked. Leave out credentials, customer messages and confidential workflow details. Peer discussion can help you spot missing questions, but it does not replace checking the actual configuration with the person who administers your tools. Adapt these questions to the decisions still open in your draft:"}</span></p>
          <ul>
            <li><span data-cf-component-id="field-49757724a3794ba3bb7c8eff464d3031" data-cf-component-type="text">{/*cf-review:field-49757724a3794ba3bb7c8eff464d3031*/"Can our chosen tools separate drafting from sending, and what evidence should we ask the administrator to show?"}</span></li>
            <li><span data-cf-component-id="field-f1bfd475546d41cc854ccd9bce263159" data-cf-component-type="text">{/*cf-review:field-f1bfd475546d41cc854ccd9bce263159*/"What happens to queued and active work when our stop controls are used?"}</span></li>
            <li><span data-cf-component-id="field-c701ac51c9ac4a77a915128f190122b1" data-cf-component-type="text">{/*cf-review:field-c701ac51c9ac4a77a915128f190122b1*/"Which quality failures should stop this pilot even if handling time improves?"}</span></li>
          </ul>
        </div>
        <div id="optional-support" data-cf-component-id={"section:optional-support"} data-cf-component-type={"section"} data-cf-component-label={"Optional support after the draft is complete"} data-cf-source-section-id={"optional-support"}>
          <h2><span data-cf-component-id="field-bab86a7752364e25a56dc87551099839" data-cf-component-type="text">{/*cf-review:field-bab86a7752364e25a56dc87551099839*/"Optional support after the draft is complete"}</span></h2>
          <p><span data-cf-component-id="field-52e41955fb2b4678a3007a4265d794ef" data-cf-component-type="text">{/*cf-review:field-52e41955fb2b4678a3007a4265d794ef*/"You can explore MLAI events to learn alongside other builders and business owners. Check a relevant event page before deciding to attend: availability, format and cost depend on that page. Attendance does not guarantee individual implementation advice or replace permission checks, the stop rehearsal or pilot preparation."}</span></p>
          <p><span data-cf-component-id="field-02949b92e7c94352b5798ace4bd5cede" data-cf-component-type="text">{/*cf-review:field-02949b92e7c94352b5798ace4bd5cede*/"If your team cannot resolve an implementation gap, MLAI Studio offers paid AI and software development. Use a sanitised handover to define the workflow, its boundaries and the controls still needed. Studio describes checking whether your existing software can do the job before suggesting a custom build. Keep unresolved launch blockers visible, whichever implementation route you choose."}</span></p>
          <div data-cf-component-id={"image:optional-support"} data-cf-component-type={"image"} data-cf-component-label={"Image: Optional support after the draft is complete"} data-cf-source-section-id={"optional-support"}>
          <ArticleImageBlock
            src={/*cf-review:field-b775911da79d4b90aee9d768c48dd183*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-85481514-0afb-4176-90d3-610761ee3f87.jpg?alt=media&token=8f10c771-5b45-4a5a-9937-be92fd0fe183"}
            alt={/*cf-review:field-70aff0317e2f4e3e94e1c7a416fcef07*/"Four people sit in a circle, one gesturing, in a bright room with large windows, plants, tables, laptops, and a projection screen."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free template"
            title={"Autonomous AI Agent Handover Template"}
            description="A fill-in handover sheet for assigning a bounded AI-agent workflow, verifying controls and deciding whether a pilot is ready to run."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fhow-to-hand-over-autonomous-ai-agents-with-clear-limits-template-41dd0132.pdf?alt=media&token=1995306a-1ae1-4d8a-8528-fabb6ae7eaf5"
            accent="purple"
            previewCards={[
              {
                title: "Permission boundaries",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Stop-control record",
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
            {id: 1, href: "https://business.gov.au/online-and-digital/artificial-intelligence", title: "Artificial intelligence (AI) | business.gov.au", publisher: "business.gov.au", category: "guide"},
            {id: 2, href: "https://academy.openai.com/public/resources/openai-academy-small-business-resource-hub-2026-06-03", title: "ChatGPT for Small Business | Workshop Resource Hub - Resource | OpenAI Academy", publisher: "academy.openai.com", category: "guide"},
            {id: 3, href: "https://teamvoy.com/blog/what-are-autonomous-ai-agents/", title: "AI Coding Agents: What Autonomous Agents Do in Development", publisher: "teamvoy.com", category: "guide"},
            {id: 4, href: "https://mlai.au/mlai-studio", title: "MLAI Studio | AI & software for your business", publisher: "mlai.au", category: "guide"},
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

        <ArticleFooterNav backHref="/articles" topHref="#" />
    </>
  )
}
