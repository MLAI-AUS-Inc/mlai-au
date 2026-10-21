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
import { ArticleCallout } from '../../../components/articles/ArticleCallout'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'

export const useCustomHeader = true

const TOPIC = (/*cf-review:field-46c63aa1a5ac40f8a7666413acb2cd0e*/"Prototype With an Artificial Intelligence Design Assistant")
export const CATEGORY = "featured"
export const SLUG = "prototype-with-an-artificial-intelligence-design-assistant"
export const DATE_PUBLISHED = "2026-10-21"
export const DATE_MODIFIED = "2026-10-21"
export const DESCRIPTION = "Use an AI design assistant to prototype a fictional booking flow, review the screens and plan a small pilot before paying for development."
const HERO_IMAGE = (/*cf-review:field-73a7ba44f0d1425db7628d9eddd8f46b*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-cec891b8-11f5-472c-92a2-617b5b93e8fc.jpg?alt=media&token=52073d7c-3207-4370-a662-41d9ba04cbe8")
const HERO_IMAGE_ALT = "Two people look at a laptop; one points toward the screen while the other, wearing glasses, rests a hand on their chin."
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
  heading: "Key facts: Prototype With an Artificial Intelligence Design Assistant",
  intro: "Use an AI design assistant to prototype a fictional booking flow, review the screens and plan a small pilot before paying for development.",
  items: [
    { label: "What does an artificial intelligence design assistant do?", description: "An artificial intelligence design assistant uses written instructions to draft interface layouts and screen text. Before choosing a tool, check whether you can edit its screens and connect their controls into a clickable flow." },
    { label: "How do you turn an idea into a clickable prototype?", description: "Define a bounded user task, prompt with wholly invented data, then connect and review the screens. In the hypothetical bicycle-service example, customers choose a service and preferred time, review their request and see a simulated receipt." },
    { label: "What should a prototype pilot measure?", description: "A prototype rehearsal should record customer task time, staff handling time, completion, corrections and costs against a current-workflow baseline. Simulated actions must remain labelled: a quick walkthrough cannot establish live savings, technical reliability or customer demand." },
  ],
}

export const articleMeta = {
  title: "Prototype With an Artificial Intelligence Design Assistant",
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
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Draft a booking flow with an AI design assistant"} data-cf-source-section-id={"intro"}>
        <h2><span data-cf-component-id="field-5497accd7dd741aa8a1c3a81c4f66146" data-cf-component-type="text">{/*cf-review:field-5497accd7dd741aa8a1c3a81c4f66146*/"Draft a booking flow with an AI design assistant"}</span></h2>
        <p><strong>{TOPIC}</strong> — <span data-cf-component-id="field-1a07538ba7d54ad6b456c8613c3627f3" data-cf-component-type="text">{/*cf-review:field-1a07538ba7d54ad6b456c8613c3627f3*/"Choose a bounded user task, describe the essential screens, then generate and connect them using fictional data. Review the path from the user\u2019s starting point to the intended outcome, and plan a small comparison with the current workflow before buying tools or commissioning development. This follows business.gov.au\u2019s advice to identify the business problem first rather than use AI for its own sake."}</span></p>
        <p><span data-cf-component-id="field-87ed62b5c63643fa9cf8fc1da1f6eb29" data-cf-component-type="text">{/*cf-review:field-87ed62b5c63643fa9cf8fc1da1f6eb29*/"An artificial intelligence design assistant is software that uses written instructions to help draft interface layouts and the words shown on screen."}</span></p>
        <p><span data-cf-component-id="field-3ab5519fd63f48308764ecedf597333c" data-cf-component-type="text">{/*cf-review:field-3ab5519fd63f48308764ecedf597333c*/"For the hypothetical bicycle-service scenario, distinguish three proposed deliverables. A clickable prototype would simulate navigation and choices. Functioning booking software would need to carry out real operations, such as storing a request and checking availability. If you later propose an integrated AI workflow, specify how model outputs would connect to business systems and controls, including human review where needed. Treat customer demand as a separate question to investigate with the intended customers."}</span></p>
        <p><span data-cf-component-id="field-b2ef043fa7cc4fbea736f60cfae2bb0d" data-cf-component-type="text">{/*cf-review:field-b2ef043fa7cc4fbea736f60cfae2bb0d*/"For this hypothetical business, keep the exercise to three screens: choose a service and preferred time, review the request, and show a simulated receipt awaiting staff confirmation. No customer study, prototype test or business result is claimed for this fictional example. Using AI to draft that interface does not mean the booking process itself needs AI. A simpler form or an existing booking tool may be enough once the problem and constraints are clearer."}</span></p>
        </div>
        <div id="choose-workflow" data-cf-component-id={"section:choose-workflow"} data-cf-component-type={"section"} data-cf-component-label={"Shortlist one workflow you can afford to explore"} data-cf-source-section-id={"choose-workflow"}>
          <h2><span data-cf-component-id="field-d54040f012e442ef8c40f1cb4e4677bf" data-cf-component-type="text">{/*cf-review:field-d54040f012e442ef8c40f1cb4e4677bf*/"Shortlist one workflow you can afford to explore"}</span></h2>
          <p><span data-cf-component-id="field-9e2f7ff7ecc548d4b2899d2d4ace0066" data-cf-component-type="text">{/*cf-review:field-9e2f7ff7ecc548d4b2899d2d4ace0066*/"Choose a task with a recognisable start and finish to keep unrelated features out of the exercise. Write down the problem and how people handle it now. OpenAI Academy\u2019s small-business resource hub encourages clear goals, context and boundaries, with a person responsible for final decisions."}</span></p>
          <p><span data-cf-component-id="field-2bafe30d0b15443aa94fccbf94ce242a" data-cf-component-type="text">{/*cf-review:field-2bafe30d0b15443aa94fccbf94ce242a*/"For a hypothetical local bicycle-service business, the intended user is a customer requesting a standard tune-up. Assume repeated clarification by phone is the problem, and a phone enquiry plus a staff-kept diary is the current workaround. These are fictional assumptions to investigate, not customer findings. Bound the prototype to choosing a service and preferred appointment time, then reviewing the request. Leave payments, live calendar availability, accounts, automatic booking confirmation and marketplace features outside the scope."}</span></p>
          <p><span data-cf-component-id="field-3adf1c3c61ff40c0adb5796031fe9878" data-cf-component-type="text">{/*cf-review:field-3adf1c3c61ff40c0adb5796031fe9878*/"Use the checklist below to set investigation limits before choosing a tool. Defer an idea that requires sensitive customer records in an unapproved tool, consequential automated decisions or several live integrations. Those dependencies need investigation beyond this first design exercise."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-eab27dfd8ab24b588f6f7772ee3eb7c0" data-cf-component-type="text">{/*cf-review:field-eab27dfd8ab24b588f6f7772ee3eb7c0*/"User and task: Who needs help, what starts the task and what observable outcome marks its end?"}</span></li>
            <li><span data-cf-component-id="field-d3bd17785e334a5880ad1ae105aedb7a" data-cf-component-type="text">{/*cf-review:field-d3bd17785e334a5880ad1ae105aedb7a*/"Problem and workaround: What is difficult now, how is it currently handled and what evidence is still missing?"}</span></li>
            <li><span data-cf-component-id="field-8eccff0c62c14f008ea561edff7b5578" data-cf-component-type="text">{/*cf-review:field-8eccff0c62c14f008ea561edff7b5578*/"Scope: What will the prototype show, and which features and real-world actions are excluded?"}</span></li>
            <li><span data-cf-component-id="field-c4d210f0c9e744a1b8c11dced4824fd5" data-cf-component-type="text">{/*cf-review:field-c4d210f0c9e744a1b8c11dced4824fd5*/"Data boundary: Can the exercise use wholly invented practice data without confidential records, personal information or live-system access?"}</span></li>
            <li><span data-cf-component-id="field-98c71c3c83b449788efdbf397dc00852" data-cf-component-type="text">{/*cf-review:field-98c71c3c83b449788efdbf397dc00852*/"Owner and time: Who is accountable for the investigation, and how much owner and staff time is available?"}</span></li>
            <li><span data-cf-component-id="field-66388105c9b5476997ba1ff2bab94db7" data-cf-component-type="text">{/*cf-review:field-66388105c9b5476997ba1ff2bab94db7*/"Spending limit: Write the maximum budget in A$, including any tool charges you would need to approve."}</span></li>
            <li><span data-cf-component-id="field-e18b055f9253434193fe529723a0e223" data-cf-component-type="text">{/*cf-review:field-e18b055f9253434193fe529723a0e223*/"Defer or shortlist: Record a reason to defer. Shortlist only when the task, accountable owner, data boundary and affordable next investigation are identifiable. Otherwise, record the missing information instead of buying a tool."}</span></li>
          </ul>
          <div data-cf-component-id={"image:choose-workflow"} data-cf-component-type={"image"} data-cf-component-label={"Image: Shortlist one workflow you can afford to explore"} data-cf-source-section-id={"choose-workflow"}>
          <ArticleImageBlock
            src={/*cf-review:field-101a2c6ccd554f8a9782629436c77131*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-67a75098-0993-40cc-8069-bbdaedf2d99d.jpg?alt=media&token=041c12b5-628b-4039-8ee0-dd4db6c31f8e"}
            alt={/*cf-review:field-977ddb7bcdd44a43852e1e534665fc9a*/"A person in a black apron works on a bicycle's rear gears. A mug, notebook, pen and phone sit on a wooden workbench."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"callout:fictional-data-only"} data-cf-component-type={"callout"} data-cf-component-label={"Use fictional data, not customer records"}>
          <ArticleCallout title="Use fictional data, not customer records" variant="warning">
            {"Do not enter confidential or personal information into an unapproved tool. Use wholly invented names, enquiries and records for the prototype, because removing a name from a real record does not make it synthetic."}
          </ArticleCallout>
        </div>
        <div id="check-tool" data-cf-component-id={"section:check-tool"} data-cf-component-type={"section"} data-cf-component-label={"Check the tool before entering your prompt"} data-cf-source-section-id={"check-tool"}>
          <h2><span data-cf-component-id="field-29073a524e3d45cf8170a8fcd2f03194" data-cf-component-type="text">{/*cf-review:field-29073a524e3d45cf8170a8fcd2f03194*/"Check the tool before entering your prompt"}</span></h2>
          <p><span data-cf-component-id="field-7553788661e546ccbaf8d8d60ca741a0" data-cf-component-type="text">{/*cf-review:field-7553788661e546ccbaf8d8d60ca741a0*/"Start with an existing business-approved tool if it can support the exercise. Confirm that you are signed into the intended account or workspace, a precaution also recommended in OpenAI Academy\u2019s small-business workshop materials. Inspect account permissions, requested integrations and prototype-sharing settings, including who can view a shared link. Check the tool\u2019s terms for retention, deletion and whether your inputs may be reused for training. If those terms are unclear or unacceptable for your business, pause or choose an approved alternative."}</span></p>
          <p><span data-cf-component-id="field-56b6f93656b4464e9d2a697deacfe7ef" data-cf-component-type="text">{/*cf-review:field-56b6f93656b4464e9d2a697deacfe7ef*/"Check capabilities and costs together before committing. Does the selected plan let you edit the generated screens and connect buttons between them? If the tool only produces images, establish an approved way to link them before continuing. Verify that the intended controls take you from screen to screen before treating the output as a clickable prototype."}</span></p>
          <p><span data-cf-component-id="field-b7d7bddc3c54468fb7814dc87ae1e5f7" data-cf-component-type="text">{/*cf-review:field-b7d7bddc3c54468fb7814dc87ae1e5f7*/"Inspect current subscription and usage charges, trial renewal conditions and export restrictions, then compare them with your spending limit. Do not assume a trial covers the whole exercise or that exporting your work is included."}</span></p>
          <p><span data-cf-component-id="field-b0ed37f8188a493abddf734b5081cfa0" data-cf-component-type="text">{/*cf-review:field-b0ed37f8188a493abddf734b5081cfa0*/"For the hypothetical bicycle-service prototype, invent the customer label, service request and preferred appointment times without copying a real enquiry. This lets you describe the task without bringing customer information into the design exercise. These checks are practical precautions, not legal advice or confirmation that a tool is suitable for handling live business data."}</span></p>
          <QuoteBlock title="Keep enquiries and credentials out" variant="orange">
            <span data-cf-component-id="field-fc92fa85a6744b86bb93e47b1a5f13dd" data-cf-component-type="text">{/*cf-review:field-fc92fa85a6744b86bb93e47b1a5f13dd*/"Keep real customer enquiries, confidential documents, passwords, payment details and production credentials out of the prototype."}</span>
          </QuoteBlock>
        </div>
        <div id="write-prompt" data-cf-component-id={"section:write-prompt"} data-cf-component-type={"section"} data-cf-component-label={"Write a reusable design prompt"} data-cf-source-section-id={"write-prompt"}>
          <h2><span data-cf-component-id="field-323e511271f54f49928aff892e48c6b2" data-cf-component-type="text">{/*cf-review:field-323e511271f54f49928aff892e48c6b2*/"Write a reusable design prompt"}</span></h2>
          <p><span data-cf-component-id="field-30006362ed9e407ca27d4c0080e0c0c7" data-cf-component-type="text">{/*cf-review:field-30006362ed9e407ca27d4c0080e0c0c7*/"Give the assistant a goal, context, a requested output and boundaries. OpenAI Academy\u2019s small-business resource hub uses these prompting supports to clarify the task and identify what needs human review (https://academy.openai.com/public/resources/openai-academy-small-business-resource-hub-2026-06-03). For this hypothetical design exercise, limit the output to three screens so you can inspect a bounded task flow. That limit is a scoping choice, not an industry rule or a guarantee of good design. Replace the bracketed fields below with your brief, keeping all practice data wholly invented."}</span></p>
          <div data-cf-component-id={"image:write-prompt"} data-cf-component-type={"image"} data-cf-component-label={"Image: Write a reusable design prompt"} data-cf-source-section-id={"write-prompt"}>
          <ArticleImageBlock
            src={/*cf-review:field-ec752e02be054f9c81bba4fc5ed5ee4e*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-29febe2f-8841-4d22-ab3e-56e5478befc6.jpg?alt=media&token=706588bc-38ae-42a0-bce6-4da3cc8f5840"}
            alt={/*cf-review:field-6a4c1f76d91a44499f94330c7184d817*/"An open laptop, notebook with pen, mug, and potted plant sit on a wooden desk beside a large window, with bookshelves nearby."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-a29cc9bd34c34ddda75f49bd9e17de20" data-cf-component-type="text">{/*cf-review:field-a29cc9bd34c34ddda75f49bd9e17de20*/"Reusable design prompt"}</span></h3>
          <p><span data-cf-component-id="field-7e56413934ce47d6872fa0e08aaba4f0" data-cf-component-type="text">{/*cf-review:field-7e56413934ce47d6872fa0e08aaba4f0*/"Design an editable, clickable prototype for [intended user] to complete [one core task]. Their current problem is [problem], and their workaround is [workaround]. For this hypothetical exercise, create only three screens: [input or choice], [review and correction], and [result or handoff]. Connect the main action, Back and Edit controls."}</span></p>
          <p><span data-cf-component-id="field-b82d285f149b4463858406db5b809948" data-cf-component-type="text">{/*cf-review:field-b82d285f149b4463858406db5b809948*/"Constraints: [device], plain language, labelled controls, readable contrast, no colour-only instructions and [scope exclusions]. Include error states for [missing input] and [unavailable or invalid choice] within those screens. Use only this synthetic data: [invented records]."}</span></p>
          <p><span data-cf-component-id="field-0bf71449d5dd42cd972dc1e04900a31d" data-cf-component-type="text">{/*cf-review:field-0bf71449d5dd42cd972dc1e04900a31d*/"A person must approve [real-world action]. Label simulated results clearly; do not send, charge, book or connect to live systems. Ask about material gaps rather than inventing business rules. Identify anything your tool cannot implement."}</span></p>
          <h3><span data-cf-component-id="field-1f9f9d91edc14aa88e62fca317a6d2fb" data-cf-component-type="text">{/*cf-review:field-1f9f9d91edc14aa88e62fca317a6d2fb*/"Hypothetical completed example"}</span></h3>
          <p><span data-cf-component-id="field-218f14dd3c5947df8825718d5a25d95f" data-cf-component-type="text">{/*cf-review:field-218f14dd3c5947df8825718d5a25d95f*/"Design a mobile-first, editable, clickable prototype for a customer of the fictional Demo Bike Care to request one standard tune-up. Assume phone enquiries currently require repeated clarification."}</span></p>
          <p><span data-cf-component-id="field-79113f1d24714075a1bac05764cab1d3" data-cf-component-type="text">{/*cf-review:field-79113f1d24714075a1bac05764cab1d3*/"Create three screens: 1. Choose the service and a preferred time; 2. Review the request and edit it; 3. Show \u201cDemo request received, awaiting staff confirmation\u201d. Use Customer A, Standard tune-up, Tuesday 10 am, Thursday 2 pm and request DEMO-001 as invented data."}</span></p>
          <p><span data-cf-component-id="field-8992a8c1fd2a49ecb05faa354bcf33c1" data-cf-component-type="text">{/*cf-review:field-8992a8c1fd2a49ecb05faa354bcf33c1*/"Connect Next, Back, Edit and Send request (demo). Show missing service or time errors and a simulated unavailable-time state with an alternative. Use plain English, labelled controls, readable contrast and errors explained in text."}</span></p>
          <p><span data-cf-component-id="field-f055ff36fda2478faa7fa01bb9218785" data-cf-component-type="text">{/*cf-review:field-f055ff36fda2478faa7fa01bb9218785*/"No payments, accounts, live calendars, real messages or automatic confirmation. Staff must check availability before any real booking. Mark the prototype as a simulation that sends and stores no booking. Ask about material gaps rather than inventing business rules, and identify anything your tool cannot implement."}</span></p>
          <p><span data-cf-component-id="field-5a45cc92a29447429239f75e0b24e874" data-cf-component-type="text">{/*cf-review:field-5a45cc92a29447429239f75e0b24e874*/"In this hypothetical example, the error states are variants within the three screens, not extra features or additional screens. The preferred times are fictional choices, not live availability. Check the output against the brief: an assistant may omit a requested interaction or generate wording that incorrectly suggests a booking is confirmed."}</span></p>
        </div>
        <div id="build-review" data-cf-component-id={"section:build-review"} data-cf-component-type={"section"} data-cf-component-label={"Connect the screens and revise the task flow"} data-cf-source-section-id={"build-review"}>
          <h2><span data-cf-component-id="field-ab66fef9effb4d6bada80bf59a4b579c" data-cf-component-type="text">{/*cf-review:field-ab66fef9effb4d6bada80bf59a4b579c*/"Connect the screens and revise the task flow"}</span></h2>
          <p><span data-cf-component-id="field-6b08716a7e934b01bbe9ab023461dddd" data-cf-component-type="text">{/*cf-review:field-6b08716a7e934b01bbe9ab023461dddd*/"Generate a draft from your prompt, then compare it with the agreed task and exclusions. Remove out-of-scope features before adjusting its appearance. Treat generated designs as drafts, not automatically usable or accurate interfaces. OpenAI Academy\u2019s small-business resource hub similarly recommends evaluating polished outputs and keeping a person responsible for decisions."}</span></p>
          <p><span data-cf-component-id="field-50e3e3e3d0e248dcaa05fb73081c7f5a" data-cf-component-type="text">{/*cf-review:field-50e3e3e3d0e248dcaa05fb73081c7f5a*/"Connect the controls and walk through the request yourself. Your selected tool may require manual linking. In this hypothetical booking flow, Next should reach review, Edit should return to the relevant input, and Send request (demo) should reach the pending-confirmation state. Try the missing-input and unavailable-time variants as well as the main path. Check that an unavailable choice offers a way forward. If retaining a selection or submitting a request is only simulated, make that limitation visible rather than implying that information is stored or sent."}</span></p>
          <p><span data-cf-component-id="field-a759dd384de747b09a15146271bed964" data-cf-component-type="text">{/*cf-review:field-a759dd384de747b09a15146271bed964*/"Record each problem, its intended correction and whether you rechecked it after a revision. Give the assistant a focused instruction rather than asking it to improve everything. For this hypothetical example, use:"}</span></p>
          <p><span data-cf-component-id="field-f373fdf25ded4ddc82af1aa3fd2d91a0" data-cf-component-type="text">{/*cf-review:field-f373fdf25ded4ddc82af1aa3fd2d91a0*/"\u201cKeep the same three screens. On the review screen, show the selected service and preferred time with an Edit control. Replace Booking confirmed with Demo request received, awaiting staff confirmation. Preserve the simulated error path and do not add integrations.\u201d"}</span></p>
          <p><span data-cf-component-id="field-ab6465dee9c64a22acfcf98e08cd9d79" data-cf-component-type="text">{/*cf-review:field-ab6465dee9c64a22acfcf98e08cd9d79*/"Inspect the revised flow again because a requested correction is not evidence that the tool implemented it."}</span></p>
          <h3><span data-cf-component-id="field-f65956477962430c8d8d9efc6cae1453" data-cf-component-type="text">{/*cf-review:field-f65956477962430c8d8d9efc6cae1453*/"Prototype review checklist"}</span></h3>
          <p><span data-cf-component-id="field-4a21605418e14ac6b88df39191dc95b3" data-cf-component-type="text">{/*cf-review:field-4a21605418e14ac6b88df39191dc95b3*/"Record what you can inspect and what remains unknown. Accessibility checks that the preview does not support remain unverified, and a visual review is not an accessibility conformance assessment. Observing an intended user attempt the task belongs in the future pilot plan; this self-review does not establish that users can complete it."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-77335a874d9c4b53983cf2a502aab5ef" data-cf-component-type="text">{/*cf-review:field-77335a874d9c4b53983cf2a502aab5ef*/"Task completion and recovery: check for dead-end buttons, selected details visible at review, working Back and Edit controls, and an alternative after the simulated unavailable-time state."}</span></li>
            <li><span data-cf-component-id="field-bc020c4352c841868205d46fd8dd8697" data-cf-component-type="text">{/*cf-review:field-bc020c4352c841868205d46fd8dd8697*/"Plain, consistent language: use the same service and action names throughout. Explain errors in words and distinguish a request from a confirmed booking."}</span></li>
            <li><span data-cf-component-id="field-79b398aacf2d452cbbaccca361eb6bb8" data-cf-component-type="text">{/*cf-review:field-79b398aacf2d452cbbaccca361eb6bb8*/"Accessibility basics: inspect readable labels and contrast, avoid colour-only instructions, and check keyboard navigation and visible focus where the preview supports them."}</span></li>
            <li><span data-cf-component-id="field-76f8fd1184ea461d8dfc89ac505b09ad" data-cf-component-type="text">{/*cf-review:field-76f8fd1184ea461d8dfc89ac505b09ad*/"Accuracy against the fictional brief: check that service names, preferred times and request details match the supplied invented data. Remove invented business rules or unsupported promises."}</span></li>
            <li><span data-cf-component-id="field-336e9ace5d3642e498d9567c518440cd" data-cf-component-type="text">{/*cf-review:field-336e9ace5d3642e498d9567c518440cd*/"Human responsibility: keep the need for staff availability checks visible before any real booking. A simulated approval message does not establish that software enforces approval."}</span></li>
          </ul>
        </div>
        <div id="future-checks" data-cf-component-id={"section:future-checks"} data-cf-component-type={"section"} data-cf-component-label={"List what the prototype still cannot establish"} data-cf-source-section-id={"future-checks"}>
          <h2><span data-cf-component-id="field-e0d9964564a446edac5be1554707386b" data-cf-component-type="text">{/*cf-review:field-e0d9964564a446edac5be1554707386b*/"List what the prototype still cannot establish"}</span></h2>
          <p><span data-cf-component-id="field-3e5e835aff6349bd964e1520bee0ccce" data-cf-component-type="text">{/*cf-review:field-3e5e835aff6349bd964e1520bee0ccce*/"A clickable request flow shows how someone might move through an interface. It does not establish whether the backend\u2014the behind-the-scenes code and storage that perform real operations\u2014can do the work, whether integrations will be reliable or whether information will be handled securely. Record these as unresolved questions. Before commissioning development, ask for a bounded technical investigation into the operations the proposed service would need to perform."}</span></p>
          <p><span data-cf-component-id="field-22693292ec914709b56007625f6518b4" data-cf-component-type="text">{/*cf-review:field-22693292ec914709b56007625f6518b4*/"In the hypothetical bicycle-service example, a live calendar connection would need checks of access permissions and what happens when availability cannot be retrieved or a request fails. Before introducing live data, arrange an appropriate security and privacy review of how information would be accessed, processed and stored."}</span></p>
          <p><span data-cf-component-id="field-32f8e1130dba48d8b7ea0ec1d8b30779" data-cf-component-type="text">{/*cf-review:field-32f8e1130dba48d8b7ea0ec1d8b30779*/"The message \u201cawaiting staff confirmation\u201d only describes an intended handoff. A working system would need separate testing to establish whether it actually prevents a booking without staff approval. Likewise, using AI to generate the interface says nothing about the accuracy or performance of any future AI feature."}</span></p>
          <p><span data-cf-component-id="field-f50b6668fabc49179f6703855d4ec8fd" data-cf-component-type="text">{/*cf-review:field-f50b6668fabc49179f6703855d4ec8fd*/"Customer demand needs a separate investigation. In future conversations with intended customers, ask about recent occasions when they encountered the assumed problem, how they handled it and which alternatives they already use. Compliments about the screens do not establish that people need the service or would change their behaviour to use it. Where those conversations support further investigation, consider a bounded real-world trial after the relevant technical and data checks."}</span></p>
          <p><span data-cf-component-id="field-c84bcce5406142bcada110824148fdd1" data-cf-component-type="text">{/*cf-review:field-c84bcce5406142bcada110824148fdd1*/"Keep the unanswered questions beside your review notes and use them to choose the next affordable investigation. Consider whether a clearer manual handoff or existing software could address the problem before paying for a custom build."}</span></p>
          <div data-cf-component-id={"image:future-checks"} data-cf-component-type={"image"} data-cf-component-label={"Image: List what the prototype still cannot establish"} data-cf-source-section-id={"future-checks"}>
          <ArticleImageBlock
            src={/*cf-review:field-16c95182631f4a3e9bdd2257a4013a37*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9c12aed8-4aef-4b90-9215-a25671572d40.jpg?alt=media&token=5f1fe604-54ce-4399-b5fd-2633078685b4"}
            alt={/*cf-review:field-a203368c4a4d43859ff57f48eb7f1eab*/"Close-up of a person holding a hand against their mouth beside an open laptop and a black mug on a wooden table."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="pilot-plan" data-cf-component-id={"section:pilot-plan"} data-cf-component-type={"section"} data-cf-component-label={"Draft a low-cost pilot with a decision rule"} data-cf-source-section-id={"pilot-plan"}>
          <h2><span data-cf-component-id="field-09d748505f564d3d8b9e58acdae0a14d" data-cf-component-type="text">{/*cf-review:field-09d748505f564d3d8b9e58acdae0a14d*/"Draft a low-cost pilot with a decision rule"}</span></h2>
          <p><span data-cf-component-id="field-f6fabc0ce00a4472982703f646f8a399" data-cf-component-type="text">{/*cf-review:field-f6fabc0ce00a4472982703f646f8a399*/"Plan a prototype rehearsal using wholly invented tasks with participants who fit the intended user group. It is not a deployment of working AI. Start by defining a comparable task in the current workflow and recording how it is completed, including clarification, staff review and corrections. Leave results not yet collected blank and mark them \u201cto measure\u201d. You do not need to upload real customer records to establish this baseline."}</span></p>
          <p><span data-cf-component-id="field-c79ee52d35d1464da5e14baf21b2c4e2" data-cf-component-type="text">{/*cf-review:field-c79ee52d35d1464da5e14baf21b2c4e2*/"Rehearse the proposed flow with synthetic scenarios and a clearly labelled manual handoff. In the hypothetical Demo Bike Care example, compare the existing enquiry-and-clarification task with a fictional booking-request walkthrough followed by simulated staff review. Check whether participants understand that their preferred time is not confirmed. Record customer task time separately from staff handling time, and note where someone role-plays an action that future software would need to perform."}</span></p>
          <p><span data-cf-component-id="field-cbc20e8ca01840ed915d806453ba0a45" data-cf-component-type="text">{/*cf-review:field-cbc20e8ca01840ed915d806453ba0a45*/"At the review date, compare the agreed measures and apply the decision rules below. Timing a clickable path cannot establish live end-to-end savings. Compare like-for-like tasks where possible, and identify simulated actions, setup effort and missing measurements. Keep tool charges, staff effort and setup costs separate so a quick walkthrough does not hide the work needed to support it. A later live booking pilot would require separate technical and data checks."}</span></p>
          <h3><span data-cf-component-id="field-c559f4f470ac4652b4febd30c87aa042" data-cf-component-type="text">{/*cf-review:field-c559f4f470ac4652b4febd30c87aa042*/"Copyable pilot-plan template"}</span></h3>
          <p><span data-cf-component-id="field-7499504eee064e57bfa417b465c28110" data-cf-component-type="text">{/*cf-review:field-7499504eee064e57bfa417b465c28110*/"Use these fields as a planning exercise, not a validated assessment method. Before beginning, the accountable owner should fill in the time target, quality threshold, permitted correction count and spending limit. Choose boundaries that suit the task and what the business can afford to investigate, rather than treating them as universal benchmarks."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-495288782d12450d8c10d0c748db6d22" data-cf-component-type="text">{/*cf-review:field-495288782d12450d8c10d0c748db6d22*/"Scope and hypothesis \u2014 Selected workflow: ____. Intended user: ____. Problem we think exists: ____. What is excluded: ____."}</span></li>
            <li><span data-cf-component-id="field-60f502f72b204d058fad12b6f16acbe3" data-cf-component-type="text">{/*cf-review:field-60f502f72b204d058fad12b6f16acbe3*/"People and responsibility \u2014 Accountable owner: ____. Intended participants and how they fit the user group: ____. How participation will be explained and permission obtained: ____."}</span></li>
            <li><span data-cf-component-id="field-ab349330a1be4204bd7ab985eefc5f81" data-cf-component-type="text">{/*cf-review:field-ab349330a1be4204bd7ab985eefc5f81*/"Current-workflow baseline \u2014 Existing workaround: ____. Comparable task and completion point: ____. Tasks or attempts to observe: ____. Measurement method, including clarification and correction effort: ____. Baseline results: ____ (to measure)."}</span></li>
            <li><span data-cf-component-id="field-40f5bfec5aeb4459b11ca7f14c7a90a5" data-cf-component-type="text">{/*cf-review:field-40f5bfec5aeb4459b11ca7f14c7a90a5*/"Rehearsal \u2014 Synthetic scenarios: ____. Manual staff handoff: ____. Actions that are simulated rather than performed: ____. Who records observations: ____."}</span></li>
            <li><span data-cf-component-id="field-d6cd1b324d6c4c6f9b5a0e5c7c38a930" data-cf-component-type="text">{/*cf-review:field-d6cd1b324d6c4c6f9b5a0e5c7c38a930*/"Limits \u2014 Start date: ____. Review date: ____. Total staff-hour limit, including preparation and review: ____. Spending cap: A$____. Fallback if the exercise stops: ____."}</span></li>
            <li><span data-cf-component-id="field-42f90ecfb6fd4c3fab9c18b9b5453336" data-cf-component-type="text">{/*cf-review:field-42f90ecfb6fd4c3fab9c18b9b5453336*/"Time and quality measures \u2014 Customer task time: ____ (to measure). Staff handling or review time: ____ (to measure). Successful completions out of attempts: ____ (to measure). Attempts needing correction out of attempts: ____ (to measure). Total corrections: ____ (to measure). Misunderstood status or other consequential errors: ____ (to measure)."}</span></li>
            <li><span data-cf-component-id="field-32b877000fef4cabb1a34be5393e411c" data-cf-component-type="text">{/*cf-review:field-32b877000fef4cabb1a34be5393e411c*/"Cost measures \u2014 Tool charges: A$____ (to measure). Staff effort: ____ hours (to measure). Setup costs, with any overlap identified: A$____ (to measure)."}</span></li>
            <li><span data-cf-component-id="field-a4eed337a66b4abcba20b0154226d6e4" data-cf-component-type="text">{/*cf-review:field-a4eed337a66b4abcba20b0154226d6e4*/"Decision boundaries \u2014 Time target for each role: ____. Quality threshold and denominator: ____. Permitted correction count: ____. Critical issues that block continuation: ____. Next bounded investigation if criteria are met: ____."}</span></li>
          </ul>
          <h3><span data-cf-component-id="field-2a26c900a73a422a9d5fd1dc007ec3b8" data-cf-component-type="text">{/*cf-review:field-2a26c900a73a422a9d5fd1dc007ec3b8*/"Continue, revise or stop"}</span></h3>
          <p><span data-cf-component-id="field-42c87b185aba48c0b3d88daf77c3cd75" data-cf-component-type="text">{/*cf-review:field-42c87b185aba48c0b3d88daf77c3cd75*/"Continue only to the next bounded investigation if the predefined time target, quality threshold, permitted correction count and cost limit are met, with no unresolved critical issue. Record the evidence supporting that decision: ____. A successful rehearsal supports further investigation, not a claim that the software is ready or customer demand is established."}</span></p>
          <p><span data-cf-component-id="field-d50e733dc79a428eae1f3bb4ab32ccae" data-cf-component-type="text">{/*cf-review:field-d50e733dc79a428eae1f3bb4ab32ccae*/"Revise if a specific, correctable problem can be investigated within the remaining time and spending limits. Record the problem, proposed change and recheck: ____."}</span></p>
          <p><span data-cf-component-id="field-ab30cedc7c5c46219ca01a4ae6e35a0c" data-cf-component-type="text">{/*cf-review:field-ab30cedc7c5c46219ca01a4ae6e35a0c*/"Stop or defer if the underlying problem is not supported, a serious data or safety issue arises, limits are reached or critical dependencies remain unresolved. Record the reason and fallback: ____. For the hypothetical booking flow, confusion about whether an appointment is confirmed belongs in this decision record, not merely in a list of cosmetic improvements."}</span></p>
        </div>
        <div id="next-conversation" data-cf-component-id={"section:next-conversation"} data-cf-component-type={"section"} data-cf-component-label={"Take your prototype and plan to the next conversation"} data-cf-source-section-id={"next-conversation"}>
          <h2><span data-cf-component-id="field-90ce8114e24b417ea1d5fa9fe58e5ff0" data-cf-component-type="text">{/*cf-review:field-90ce8114e24b417ea1d5fa9fe58e5ff0*/"Take your prototype and plan to the next conversation"}</span></h2>
          <p><span data-cf-component-id="field-6b36bafcad92468f9528520557796948" data-cf-component-type="text">{/*cf-review:field-6b36bafcad92468f9528520557796948*/"Gather your shortlisted use case and its exclusions, the prototype and prompt, and a completed review checklist with unresolved items. Include a pilot plan naming the accountable owner, time and spending limits, and continue, revise or stop criteria. For the hypothetical booking example, include the three-screen request flow and keep the pending staff-confirmation message visible. Mark missing evidence and unverified behaviour clearly so the discussion does not suggest the product is ready to launch."}</span></p>
          <p><span data-cf-component-id="field-0ecd889021ad4c7e9f2487d25640bfec" data-cf-component-type="text">{/*cf-review:field-0ecd889021ad4c7e9f2487d25640bfec*/"Ask peers: \u201cWhich part of this request flow is unclear?\u201d, \u201cWhat exception or staff handoff have I missed?\u201d and \u201cCould an existing tool or simpler process address this problem before we build?\u201d Record their suggestions against the relevant screen or pilot assumption. Peer feedback can help you identify questions to investigate, but it does not substitute for evidence from intended customers. If later checks reveal a need for development, use the scoped brief to explain the task, boundaries and unresolved dependencies."}</span></p>
          <p><span data-cf-component-id="field-fae3417e81f94bc189f44544f1ac4347" data-cf-component-type="text">{/*cf-review:field-fae3417e81f94bc189f44544f1ac4347*/"Optional next step after planning: Explore MLAI events. Check individual event details for relevance, availability, format and cost before registering. Attendance does not guarantee one-to-one implementation advice and is separate from commissioning development."}</span></p>
          <div data-cf-component-id={"image:next-conversation"} data-cf-component-type={"image"} data-cf-component-label={"Image: Take your prototype and plan to the next conversation"} data-cf-source-section-id={"next-conversation"}>
          <ArticleImageBlock
            src={/*cf-review:field-d9c7978334ec40d2b52525c74d36af98*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-64754961-3350-4691-a59b-8c2f1ae08c6e.jpg?alt=media&token=f73bf91e-a92d-4f97-9e51-f896bc00df3b"}
            alt={/*cf-review:field-d75612a932194fbc9d636f2a38e4fa3e*/"Three people near a whiteboard with diagrams and sticky notes, one pointing; a wooden table holds two laptops, notebooks, and a mug."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free worksheet"
            title={"AI Design Prototype Planning Worksheet"}
            description="Use this fill-in worksheet to define a bounded workflow, prepare a safe prototype, record gaps and plan a low-cost pilot."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fprototype-with-an-artificial-intelligence-design-assistant-worksheet-fbe170e6.pdf?alt=media&token=2923c647-85f0-412a-9853-facc27447cda"
            accent="purple"
            previewCards={[
              {
                title: "Prototype scope",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Pilot decision rule",
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
            {id: 3, href: "https://flowstep.ai/blog/ai-design-assistant/", title: "8 Best AI Design Assistant Tools in 2026", publisher: "flowstep.ai", category: "guide"},
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
