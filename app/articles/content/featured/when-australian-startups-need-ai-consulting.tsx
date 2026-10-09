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
import { ArticleCallout } from '../../../components/articles/ArticleCallout'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'

export const useCustomHeader = true

const TOPIC = (/*cf-review:field-19c839bd1eeb417397387e17e2c91509*/"When Australian Startups Need AI Consulting")
export const CATEGORY = "featured"
export const SLUG = "when-australian-startups-need-ai-consulting"
export const DATE_PUBLISHED = "2026-10-09"
export const DATE_MODIFIED = "2026-10-09"
export const DESCRIPTION = "Decide whether to pilot AI with existing tools or get implementation help. Prepare a startup brief with a budget, human review and clear success measures."
const HERO_IMAGE = (/*cf-review:field-01970f6085b146109588d1a3ddf47144*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-56f46072-185d-4802-92fc-e204f3697839.jpg?alt=media&token=a995d95a-6f33-49d4-a973-a505eb568c93")
const HERO_IMAGE_ALT = "Two people sit beside an open laptop; one gestures with an open hand while the other, wearing glasses, holds a hand near their mouth."
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
  heading: "Key facts: When Australian Startups Need AI Consulting",
  intro: "Decide whether to pilot AI with existing tools or get implementation help. Prepare a startup brief with a budget, human review and clear success measures.",
  items: [
    { label: "When does a small startup need AI implementation help?", description: "Consider external help when system connections, data preparation, permissions or reliability exceed your team\u2019s capacity. An approved existing tool may suffice for a narrow task with manual inputs and human-reviewed outputs." },
    { label: "What should an AI pilot brief include?", description: "A pilot brief should specify the workflow, current time and quality baseline, approved systems and data, exclusions, accountable owner, human review, budget cap and success measures. Record unresolved permissions or missing inputs as dependencies." },
    { label: "What should you request from an AI consultant?", description: "Request a written scope before building, a bounded prototype, evaluation against your baseline, and documented handover and support arrangements. Keep responsibility for authorising data access, reviewing outputs and deciding whether to deploy with the startup." },
  ],
}

export const articleMeta = {
  title: "When Australian Startups Need AI Consulting",
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
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Get help for an implementation gap, not simply because AI is unfamiliar"} data-cf-source-section-id={"intro"}>
        <h2><span data-cf-component-id="field-2df44ad6c79744b9b5817b96561e5041" data-cf-component-type="text">{/*cf-review:field-2df44ad6c79744b9b5817b96561e5041*/"Get help for an implementation gap, not simply because AI is unfamiliar"}</span></h2>
        <p><strong>{TOPIC}</strong> — <span data-cf-component-id="field-593651670f1d4f09ac50076d47520699" data-cf-component-type="text">{/*cf-review:field-593651670f1d4f09ac50076d47520699*/"For a small Australian startup with a limited budget and no dedicated AI team, an existing, business-approved tool may be enough to pilot a narrow, low-risk task whose outputs a person can check. Start by checking what your current software can already do, as business.gov.au recommends. Consider external implementation help when connecting systems, preparing usable data, managing access permissions or meeting reliability requirements exceeds your team\u2019s capacity."}</span></p>
        <p><span data-cf-component-id="field-28e2aaae1e47407e944dfed937d2ac09" data-cf-component-type="text">{/*cf-review:field-28e2aaae1e47407e944dfed937d2ac09*/"AI consulting means help choosing and planning how to use AI for a business problem. A consultant may also offer implementation, but ask for building, testing, documentation and ongoing support to be explicitly addressed in the scope rather than assumed. Keep the commitment proportionate to the task and your team\u2019s ability to review and maintain it."}</span></p>
        </div>
        <div id="choose-workflow" data-cf-component-id={"section:choose-workflow"} data-cf-component-type={"section"} data-cf-component-label={"Choose one workflow worth testing"} data-cf-source-section-id={"choose-workflow"}>
          <h2><span data-cf-component-id="field-5e9f55ca58224d6e8a7ab22099e74b9e" data-cf-component-type="text">{/*cf-review:field-5e9f55ca58224d6e8a7ab22099e74b9e*/"Choose one workflow worth testing"}</span></h2>
          <p><span data-cf-component-id="field-f03cf393e8b84dc1a85a05e704a9b272" data-cf-component-type="text">{/*cf-review:field-f03cf393e8b84dc1a85a05e704a9b272*/"Shortlist routine tasks by their operational value, available inputs and consequences of error. Favour a task that takes recurring effort, uses material you can access legitimately, and produces an output someone can check before use. Describe the boundary clearly: what goes in, what should come out, and who checks it. Business.gov.au recommends identifying the business problem before choosing a solution."}</span></p>
          <p><span data-cf-component-id="field-4610ea846233453ab1934bc19dc0723f" data-cf-component-type="text">{/*cf-review:field-4610ea846233453ab1934bc19dc0723f*/"Record how the task works now before proposing an improvement. State the observation period and task volume, then capture the time spent preparing inputs, completing the work, checking it and making corrections. Define what counts as an acceptable output. Consider whether a reusable template or an existing software feature would solve the problem with less effort. If usable inputs or a reviewer are missing, narrow the task or postpone the pilot."}</span></p>
          <div data-cf-component-id={"image:choose-workflow"} data-cf-component-type={"image"} data-cf-component-label={"Image: Choose one workflow worth testing"} data-cf-source-section-id={"choose-workflow"}>
          <ArticleImageBlock
            src={/*cf-review:field-acd71977718a408384c52d89631ccbf1*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ccd0b603-f596-44f6-ab54-52573a33871d.jpg?alt=media&token=4de728f8-c7ad-4d47-a01c-2df3da960665"}
            alt={/*cf-review:field-383ad041b208494c9fd63d28608dd172*/"A person writes in an open notebook at a wooden table beside a laptop, smartphone, mug, and potted plant."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-2edda3422c2741e79a9d7073432c272b" data-cf-component-type="text">{/*cf-review:field-2edda3422c2741e79a9d7073432c272b*/"Hypothetical example, not a tested implementation"}</span></h3>
          <p><span data-cf-component-id="field-4f93389446ce46468d8b8324ff882e74" data-cf-component-type="text">{/*cf-review:field-4f93389446ce46468d8b8324ff882e74*/"Suppose a small software startup wants to turn approved public release notes into a customer-update draft. Its proposed pilot uses only those notes in a business-approved AI tool. A product owner checks every factual claim against the notes and approves the wording before publication. This is a drafting task, consistent with business.gov.au\u2019s description of generative AI writing tools."}</span></p>
          <p><span data-cf-component-id="field-7836035b69df427c8b24e2fe3790fd31" data-cf-component-type="text">{/*cf-review:field-7836035b69df427c8b24e2fe3790fd31*/"In this hypothetical workflow, value depends on how much drafting work the startup actually has. Feasibility depends on accessible, current release notes that contain enough information for the update. Keeping the output as a draft limits what an error can do, but review still takes time and must be included in the comparison. Private issue-tracker access and automatic publication stay outside the initial scope, and manual drafting remains the fallback."}</span></p>
        </div>
        <div data-cf-component-id={"callout:unapproved-data"} data-cf-component-type={"callout"} data-cf-component-label={"Keep confidential and personal data out of unapproved tools"}>
          <ArticleCallout title="Keep confidential and personal data out of unapproved tools" variant="warning">
            {"Start with explicitly approved public material. Resolve permissions and tool data-handling arrangements before using other business records."}
          </ArticleCallout>
        </div>
        <div id="decide-help" data-cf-component-id={"section:decide-help"} data-cf-component-type={"section"} data-cf-component-label={"Use this checklist to decide whether you need implementation help"} data-cf-source-section-id={"decide-help"}>
          <h2><span data-cf-component-id="field-3b1992fa10c6426f9996942ea94edfc4" data-cf-component-type="text">{/*cf-review:field-3b1992fa10c6426f9996942ea94edfc4*/"Use this checklist to decide whether you need implementation help"}</span></h2>
          <p><span data-cf-component-id="field-8f6eebb78d5649a2b6e4d4cba43bd8ba" data-cf-component-type="text">{/*cf-review:field-8f6eebb78d5649a2b6e4d4cba43bd8ba*/"InData Labs identifies integration with existing systems and data quality as challenges that consultants can help address. Identify what your team cannot safely build or maintain. The checklist below is a practical decision aid, not a scored or validated assessment. A serious data-access or reliability concern cannot be cancelled out by straightforward answers elsewhere."}</span></p>
          <p><span data-cf-component-id="field-4a5931cc5b424a82aa68c8ced6170c13" data-cf-component-type="text">{/*cf-review:field-4a5931cc5b424a82aa68c8ced6170c13*/"In the hypothetical release-note example, an extension that reads a private issue tracker and updates a mailing system introduces connections and permissions to assess. Keep it outside the initial pilot."}</span></p>
          <p><span data-cf-component-id="field-5165874ea72a40d0abb5cfc85dfe2094" data-cf-component-type="text">{/*cf-review:field-5165874ea72a40d0abb5cfc85dfe2094*/"Record your next route as an existing-tool pilot, help for a named technical gap, or simplification and postponement. Having no internal AI team does not settle the choice. Allow for staff time, review capacity and ongoing costs, and pause if safe access or accountable operation remains unresolved."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-fe318dfbb2344cc1a48b0fe51b1a4b9d" data-cf-component-type="text">{/*cf-review:field-fe318dfbb2344cc1a48b0fe51b1a4b9d*/"Integrations \u2014 Existing-tool route: supply approved material manually and keep the output separate from live systems. Consider implementation help: the workflow must automatically read from or write to business systems, and your team cannot manage the connections and permissions."}</span></li>
            <li><span data-cf-component-id="field-76c50404d56945e4abdc7fa7374c918a" data-cf-component-type="text">{/*cf-review:field-76c50404d56945e4abdc7fa7374c918a*/"Data preparation \u2014 Existing-tool route: use current, consistent source documents that a reviewer can check. Consider implementation help: conflicting records, missing information or changing sources require preparation and a maintained way to find the relevant material."}</span></li>
            <li><span data-cf-component-id="field-839e6a1999504377ae78accd43793059" data-cf-component-type="text">{/*cf-review:field-839e6a1999504377ae78accd43793059*/"Access controls \u2014 Existing-tool route: use an approved tool with known users and authorised inputs. Consider implementation help: different users need different access to private records. Pause if authority to access or share the data is unclear."}</span></li>
            <li><span data-cf-component-id="field-8dc3f515fd174cb9a339f1cbaeac1465" data-cf-component-type="text">{/*cf-review:field-8dc3f515fd174cb9a339f1cbaeac1465*/"Reliability \u2014 Existing-tool route: keep outputs as reviewed drafts, with the manual process available as a fallback. Consider implementation help: unattended publication or consequential customer actions require controls your team cannot implement. If you cannot define acceptable output or check failures, narrow the scope first."}</span></li>
            <li><span data-cf-component-id="field-d49aed8055194cc38a3a459a820408af" data-cf-component-type="text">{/*cf-review:field-d49aed8055194cc38a3a459a820408af*/"Maintenance \u2014 Existing-tool route: name someone to maintain instructions, update sources and perform routine checks. Consider implementation help: custom connections, troubleshooting and usage monitoring exceed that person\u2019s capacity. A build still needs a named operator and an affordable support arrangement."}</span></li>
          </ul>
        </div>
        <div id="pilot-brief" data-cf-component-id={"section:pilot-brief"} data-cf-component-type={"section"} data-cf-component-label={"Copy this one-page pilot brief before buying services"} data-cf-source-section-id={"pilot-brief"}>
          <h2><span data-cf-component-id="field-b37e3b701c6c4dfb8be7846c714ce4bb" data-cf-component-type="text">{/*cf-review:field-b37e3b701c6c4dfb8be7846c714ce4bb*/"Copy this one-page pilot brief before buying services"}</span></h2>
          <p><span data-cf-component-id="field-45aa17a2e61541c98cdc61a9db6c7bee" data-cf-component-type="text">{/*cf-review:field-45aa17a2e61541c98cdc61a9db6c7bee*/"Write down the smallest useful test before requesting an AI consulting proposal. You can also use this brief to organise an internal pilot with approved tools. Completing it is not a commitment to buy implementation."}</span></p>
          <p><span data-cf-component-id="field-04858c0b587543519b219e17c837b7d4" data-cf-component-type="text">{/*cf-review:field-04858c0b587543519b219e17c837b7d4*/"Mark unknowns as \u2018to confirm\u2019 rather than filling gaps with assumptions. Missing access permissions, an unmeasured baseline or an unnamed reviewer are dependencies to resolve. Distinguish setup spending from recurring tool, support and staff effort. This is a working planning aid, not a validated assessment or legal agreement."}</span></p>
          <div data-cf-component-id={"image:pilot-brief"} data-cf-component-type={"image"} data-cf-component-label={"Image: Copy this one-page pilot brief before buying services"} data-cf-source-section-id={"pilot-brief"}>
          <ArticleImageBlock
            src={/*cf-review:field-731e817034b14d2a871a9711975b1530*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d18143ee-b10b-4f84-af17-b9b91406d509.jpg?alt=media&token=2d76b678-b5b0-4adf-88a9-4f0c6b83c866"}
            alt={/*cf-review:field-5790159b1c6e4106b96c1f3985ac741b*/"An open laptop and notebook, a pen, a mug, and a potted plant on a wooden desk by a window overlooking trees and a distant skyline."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-cd2afdb3c1dc42a69ac4c9b304e7e46d" data-cf-component-type="text">{/*cf-review:field-cd2afdb3c1dc42a69ac4c9b304e7e46d*/"One-page pilot brief"}</span></h3>
          <p><span data-cf-component-id="field-213214bb49634e6dae53bed9da2dc8be" data-cf-component-type="text">{/*cf-review:field-213214bb49634e6dae53bed9da2dc8be*/"Copy the fields below and complete them with your accountable owner and reviewer. Set the success measures against your current workflow, using the evaluation guidance later in this article to define continue, revise and stop rules. Record which data and tools are approved before testing. Do not enter confidential or personal data into unapproved tools."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-e2d5e8e8b95e4745be230e7ca6963319" data-cf-component-type="text">{/*cf-review:field-e2d5e8e8b95e4745be230e7ca6963319*/"Workflow and value: [routine task]; [input]; [required output]; [frequency]; [operational problem worth addressing]."}</span></li>
            <li><span data-cf-component-id="field-925dd82c8ab94d3592fdf86daedd5877" data-cf-component-type="text">{/*cf-review:field-925dd82c8ab94d3592fdf86daedd5877*/"Baseline: [observation period and sample size]; [current end-to-end handling and correction time]; [quality standard]; [current cost]."}</span></li>
            <li><span data-cf-component-id="field-0d26c90bf7114f089dfddc83bf6df255" data-cf-component-type="text">{/*cf-review:field-0d26c90bf7114f089dfddc83bf6df255*/"Systems and data: [available tools]; [source material and permissions]; [person authorised to grant access]; [connections needed, if any]."}</span></li>
            <li><span data-cf-component-id="field-785af90e95c34999a124c61dbbed14e1" data-cf-component-type="text">{/*cf-review:field-785af90e95c34999a124c61dbbed14e1*/"Scope and exclusions: [included users and outputs]; [excluded systems, data and actions]; [steps that remain manual]."}</span></li>
            <li><span data-cf-component-id="field-7b9b15ea1c9f4a608721e31f4fd33043" data-cf-component-type="text">{/*cf-review:field-7b9b15ea1c9f4a608721e31f4fd33043*/"Accountability and review: [business owner]; [reviewer]; [checks before use]; [person authorised to pause the pilot]; [manual fallback]."}</span></li>
            <li><span data-cf-component-id="field-a9755cbfe5ef41a38f04573307ce67fb" data-cf-component-type="text">{/*cf-review:field-a9755cbfe5ef41a38f04573307ce67fb*/"Delivery and dependencies: [pilot dates]; [inputs the startup must supply]; [external tasks, if needed]; [expected documentation and handover]; [ongoing operator and support responsibilities]."}</span></li>
            <li><span data-cf-component-id="field-9b553195643f41f7981dcb6ef94a739b" data-cf-component-type="text">{/*cf-review:field-9b553195643f41f7981dcb6ef94a739b*/"Budget: [A$ spending cap]; [setup allowance]; [recurring tool and support allowance]; [internal staff-time limit]; [person authorised to approve changes]. Supplier prices: [leave blank until quoted]."}</span></li>
            <li><span data-cf-component-id="field-c8d54710ccff497e83ec382ac08f2b14" data-cf-component-type="text">{/*cf-review:field-c8d54710ccff497e83ec382ac08f2b14*/"Success and decision: [target end-to-end time versus baseline]; [quality threshold and definition of a material error]; [cost ceiling]; [evaluation sample]; [review date]; [continue, revise and stop rules]."}</span></li>
          </ul>
        </div>
        <div id="engagement-delivery" data-cf-component-id={"section:engagement-delivery"} data-cf-component-type={"section"} data-cf-component-label={"Ask for concrete outputs at each stage of the engagement"} data-cf-source-section-id={"engagement-delivery"}>
          <h2><span data-cf-component-id="field-8ed8c6d5968f4ceaa4e754d1a790916e" data-cf-component-type="text">{/*cf-review:field-8ed8c6d5968f4ceaa4e754d1a790916e*/"Ask for concrete outputs at each stage of the engagement"}</span></h2>
          <p><span data-cf-component-id="field-b15c6294a8b4429f9c56efeb4bc75783" data-cf-component-type="text">{/*cf-review:field-b15c6294a8b4429f9c56efeb4bc75783*/"Use your pilot brief to ask for a proposal that separates assessment, building, testing and handover. Each stage should leave you with something you can review before authorising further spending. Treat the sequence below as buyer requests to negotiate, not an industry standard or a promise about what every consultant supplies."}</span></p>
          <p><span data-cf-component-id="field-94061917fb7e4ce39c9bdf8b998c3dd1" data-cf-component-type="text">{/*cf-review:field-94061917fb7e4ce39c9bdf8b998c3dd1*/"Keep delivery responsibilities separate from business accountability. The consultant may assess feasibility, build the workflow and document its operation. Your startup still needs to authorise data access, provide process knowledge, review outputs and decide whether the workflow is suitable to use."}</span></p>
          <h3><span data-cf-component-id="field-5d091a52061044f9b546b0072bd8f392" data-cf-component-type="text">{/*cf-review:field-5d091a52061044f9b546b0072bd8f392*/"Discovery and scoping: approve the work before building"}</span></h3>
          <p><span data-cf-component-id="field-ad1ea46cbb2d48dfb6a009a38df21d4b" data-cf-component-type="text">{/*cf-review:field-ad1ea46cbb2d48dfb6a009a38df21d4b*/"Request an assessment of the chosen workflow, available data, required access and connections between systems. Your team supplies process knowledge and confirms what access it can authorise; the consultant identifies feasibility gaps and dependencies."}</span></p>
          <p><span data-cf-component-id="field-e9207e50b3864c468225e489f2a0f5a4" data-cf-component-type="text">{/*cf-review:field-e9207e50b3864c468225e489f2a0f5a4*/"Ask for a written scope naming deliverables, exclusions, assumptions, owners, budget boundaries and acceptance measures. Make unresolved access or data questions visible rather than treating them as settled. Approve the scope before building, with an explicit option to stop or narrow the work if discovery shows that the proposed pilot cannot fit your budget."}</span></p>
          <h3><span data-cf-component-id="field-51927a0c2d934c31a50dff1ff4c6766e" data-cf-component-type="text">{/*cf-review:field-51927a0c2d934c31a50dff1ff4c6766e*/"Prototyping and evaluation: require evidence beyond a demonstration"}</span></h3>
          <p><span data-cf-component-id="field-43850a875c3e4558abb7009d234562f6" data-cf-component-type="text">{/*cf-review:field-43850a875c3e4558abb7009d234562f6*/"Request a bounded prototype with documented setup and human-review controls, followed by an evaluation record comparing agreed test examples with your current baseline. Ask the consultant to record failures, known limitations, handling time and tool-usage costs, including checking and correction work rather than generation time alone."}</span></p>
          <p><span data-cf-component-id="field-a22f9bbf54ce45cd82f6bd8d5e2bd21c" data-cf-component-type="text">{/*cf-review:field-a22f9bbf54ce45cd82f6bd8d5e2bd21c*/"Your business owner judges whether outputs meet the agreed quality standard and whether the evidence supports continuing. A demonstration shows the workflow in action; it does not, by itself, establish acceptance. Resolve shortfalls or agree a revised scope before authorising wider use."}</span></p>
          <h3><span data-cf-component-id="field-a45d5bd0067141cf88a2545b28b62df8" data-cf-component-type="text">{/*cf-review:field-a45d5bd0067141cf88a2545b28b62df8*/"Handover and support: make ongoing ownership explicit"}</span></h3>
          <p><span data-cf-component-id="field-d3f69925b91a45019ffbc95addba2dd2" data-cf-component-type="text">{/*cf-review:field-d3f69925b91a45019ffbc95addba2dd2*/"Request the agreed code or configuration, an account and access inventory, operating instructions, known limitations, the evaluation record and a manual fallback. Confirm what you receive under the agreement rather than assuming everything transfers."}</span></p>
          <p><span data-cf-component-id="field-3240146f0ad144d5acfbcd0387868339" data-cf-component-type="text">{/*cf-review:field-3240146f0ad144d5acfbcd0387868339*/"Set out support responsibilities and costs: who handles source updates, tool changes, failures and future modifications? Have the nominated operator demonstrate that they can run the workflow, check its outputs and use the fallback. If routine operation still depends on the consultant, clarify that dependency and its cost before signing off the handover."}</span></p>
        </div>
        <div id="buying-questions" data-cf-component-id={"section:buying-questions"} data-cf-component-type={"section"} data-cf-component-label={"Clarify fees, data handling and exit terms before agreeing"} data-cf-source-section-id={"buying-questions"}>
          <h2><span data-cf-component-id="field-ff247c42035647b0aa98503a0bad5551" data-cf-component-type="text">{/*cf-review:field-ff247c42035647b0aa98503a0bad5551*/"Clarify fees, data handling and exit terms before agreeing"}</span></h2>
          <p><span data-cf-component-id="field-c2ce23d36efb43e4a4829e8b12871d27" data-cf-component-type="text">{/*cf-review:field-c2ce23d36efb43e4a4829e8b12871d27*/"Request a current written quote against your pilot brief rather than relying on a generic AI consulting price range. Compare what each proposal includes within your spending cap: setup, testing, handover and the recurring costs of running the workflow. Ask the supplier to distinguish included work from separately charged tools and support, so you can compare proposals against the same scope."}</span></p>
          <p><span data-cf-component-id="field-0ac0675805234b1685beae3c526a103f" data-cf-component-type="text">{/*cf-review:field-0ac0675805234b1685beae3c526a103f*/"Use the questions below to clarify practical obligations, not to assume particular legal rights or whether the Privacy Act applies to your business. The OAIC\u2019s guidance on commercially available AI products highlights due diligence, human oversight and access to personal information as considerations. Do not send confidential or personal data to an unapproved tool during a sales conversation or demonstration. If data handling or contract terms remain unclear, resolve them before granting access and seek qualified advice where needed."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-7926cb5e3652478d8848c9b8aa983347" data-cf-component-type="text">{/*cf-review:field-7926cb5e3652478d8848c9b8aa983347*/"Fees and payment: Is the work fixed-price, time-based or capped? What triggers payment, what is excluded, and do quoted amounts include applicable taxes? If hours are allocated, do meetings, scoping, testing and coordination count towards them?"}</span></li>
            <li><span data-cf-component-id="field-2d1b4fc71d5348e3a3a7f9b6140fdbcc" data-cf-component-type="text">{/*cf-review:field-2d1b4fc71d5348e3a3a7f9b6140fdbcc*/"Third-party and ongoing costs: Which subscriptions, AI usage charges, hosting and support are required? Who pays and controls billing? How will usage and spending be monitored, and what happens when the agreed spending cap is reached?"}</span></li>
            <li><span data-cf-component-id="field-dae6018541be40b9b145554bc58a78bf" data-cf-component-type="text">{/*cf-review:field-dae6018541be40b9b145554bc58a78bf*/"Scope changes and acceptance: Who can authorise extra work? How do missing inputs, access delays or changed requirements affect the quote? What evidence establishes acceptance, and how will unfinished or rejected work be handled?"}</span></li>
            <li><span data-cf-component-id="field-3cb561a26fbf42b2bd28ca59a2c6405b" data-cf-component-type="text">{/*cf-review:field-3cb561a26fbf42b2bd28ca59a2c6405b*/"Data handling: Which systems and providers receive inputs or outputs, who can access them, and where are they processed and stored? What retention, deletion and model-training terms apply? Can the proposed setup meet the restrictions recorded in your brief?"}</span></li>
            <li><span data-cf-component-id="field-bb4a4e3a4ad74243853021e74bdf427a" data-cf-component-type="text">{/*cf-review:field-bb4a4e3a4ad74243853021e74bdf427a*/"Ownership and exit: What code, configuration and documentation will you receive, and what remains subject to a licence? Who controls accounts? How can you export the work and revoke supplier access? What support remains after termination, and what would a handover to another operator require?"}</span></li>
          </ul>
          <div data-cf-component-id={"image:buying-questions"} data-cf-component-type={"image"} data-cf-component-label={"Image: Clarify fees, data handling and exit terms before agreeing"} data-cf-source-section-id={"buying-questions"}>
          <ArticleImageBlock
            src={/*cf-review:field-7b18798022444aaba11c1e0a4095b56a*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-2f3b2c7a-8bdb-4219-b6ab-75f500659e54.jpg?alt=media&token=bf477ff5-ccd5-432f-9579-376254583c28"}
            alt={/*cf-review:field-a125d0445e994e268eb17a71360767a6*/"Two people look down at a paper on a table; one holds a pen while the other rests a hand against their chin."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="pilot-exit" data-cf-component-id={"section:pilot-exit"} data-cf-component-type={"section"} data-cf-component-label={"Decide in advance when to continue, revise or stop"} data-cf-source-section-id={"pilot-exit"}>
          <h2><span data-cf-component-id="field-f603d1767a774efb836f712ac9425286" data-cf-component-type="text">{/*cf-review:field-f603d1767a774efb836f712ac9425286*/"Decide in advance when to continue, revise or stop"}</span></h2>
          <p><span data-cf-component-id="field-3e86d8476cff468b93b63e1ddcd08d5f" data-cf-component-type="text">{/*cf-review:field-3e86d8476cff468b93b63e1ddcd08d5f*/"Set the pilot\u2019s acceptance thresholds before testing, using your startup\u2019s current workflow and budget as the reference. Record which tasks you will assess, over what observation period, and what improvement would justify continuing. Agree acceptable handling time, quality and cost together: a faster draft is not useful if checking it consumes the saving. These are practical decision rules for your pilot, not a validated assessment or universal performance standard."}</span></p>
          <p><span data-cf-component-id="field-8c9468cfa19f4ed188d6e95d9d551e59" data-cf-component-type="text">{/*cf-review:field-8c9468cfa19f4ed188d6e95d9d551e59*/"Measure the whole task, including preparing inputs, drafting, checking, corrections, failed attempts and any return to the manual process. Keep initial setup effort separate from recurring work. For quality, record how many outputs were reviewed, accepted, corrected or contained material errors, and define what makes an error material for this workflow. Business.gov.au advises checking AI-generated information against trustworthy sources before relying on it."}</span></p>
          <p><span data-cf-component-id="field-5e8c634e1ea24eb3b983e3758d7d27fa" data-cf-component-type="text">{/*cf-review:field-5e8c634e1ea24eb3b983e3758d7d27fa*/"Record total pilot spending separately from expected ongoing tool costs, support and staff effort, so the decision accounts for what the team will need to sustain."}</span></p>
          <p><span data-cf-component-id="field-c21e8aa47fd94fc38fa606835b78140d" data-cf-component-type="text">{/*cf-review:field-c21e8aa47fd94fc38fa606835b78140d*/"At the review date, apply the decision rules below. Pause immediately if there is unauthorised data exposure or a critical failure, and resolve the issue before considering a restart. Time saved cannot offset a serious control failure. If observations are too few or do not reflect the work you intend to support, record the result as inconclusive. Even a successful draft-only pilot supports only a bounded next step, not unattended publication or wider deployment."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-243cc8641c90428b9ca37f7c8b0c0ae9" data-cf-component-type="text">{/*cf-review:field-243cc8641c90428b9ca37f7c8b0c0ae9*/"Continue when the agreed time, quality and cost thresholds are met, someone is assigned to operate the workflow, and no critical failure or data concern remains unresolved."}</span></li>
            <li><span data-cf-component-id="field-f128ed47b27f45db8caaeca18404c36b" data-cf-component-type="text">{/*cf-review:field-f128ed47b27f45db8caaeca18404c36b*/"Revise when you can name a fixable shortfall and retest it within a newly agreed scope and budget cap. Specify what will change and what evidence would justify continuing."}</span></li>
            <li><span data-cf-component-id="field-a7f7c601088441d891421f3ed9c74153" data-cf-component-type="text">{/*cf-review:field-a7f7c601088441d891421f3ed9c74153*/"Stop when the benefit remains weak, ongoing cost or maintenance exceeds the team\u2019s capacity, or no accountable reviewer is available."}</span></li>
          </ul>
        </div>
        <div id="next-decision" data-cf-component-id={"section:next-decision"} data-cf-component-type={"section"} data-cf-component-label={"Before committing to a build"} data-cf-source-section-id={"next-decision"}>
          <h2><span data-cf-component-id="field-9071c2eb8c0c4bc39dc0899703d17bfd" data-cf-component-type="text">{/*cf-review:field-9071c2eb8c0c4bc39dc0899703d17bfd*/"Before committing to a build"}</span></h2>
          <p><span data-cf-component-id="field-513707b56f714defaa6b0612b521e3ee" data-cf-component-type="text">{/*cf-review:field-513707b56f714defaa6b0612b521e3ee*/"Keep the accountable owner, review checks and budget cap visible in your decision. If existing tools and internal review can answer the pilot question, there is no need to commission a bespoke build. If the value remains unclear, no accountable owner is available, or you cannot arrange safe access and responsible review, simplify the task or leave it for later."}</span></p>
          <p><span data-cf-component-id="field-48e45cfaf50d461ea1bf40796e4d6479" data-cf-component-type="text">{/*cf-review:field-48e45cfaf50d461ea1bf40796e4d6479*/"For a workflow that needs bespoke implementation, MLAI Studio is an optional paid AI and software development service. It checks whether existing software can do the job before suggesting a custom build. Use your completed brief to frame the discussion, and request a written scope and quote before committing. You do not need to contact a supplier to use the brief or run an appropriate internal pilot."}</span></p>
          <div data-cf-component-id={"image:next-decision"} data-cf-component-type={"image"} data-cf-component-label={"Image: Before committing to a build"} data-cf-source-section-id={"next-decision"}>
          <ArticleImageBlock
            src={/*cf-review:field-7ecd94d934d24f928fe47c0ab83e3c55*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-7ef03a75-ab25-4c80-94a0-00a720a72724.jpg?alt=media&token=4220dc1f-9839-4f80-8c1d-23273f27f82d"}
            alt={/*cf-review:field-3286c61446f945a7b1b3122d3c674ab7*/"Three people sit around a wooden table with an open laptop in a room with large windows, plants, a bookshelf, and a whiteboard."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free worksheet"
            title={"AI Workflow Pilot and Consulting Brief"}
            description="Plan a narrow AI workflow pilot, record dependencies and costs, and prepare clear requirements for an internal test or consulting proposal."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fwhen-australian-startups-need-ai-consulting-worksheet-587f5109.pdf?alt=media&token=6546f18d-16e6-4c8c-bcb8-a165d031551c"
            accent="purple"
            previewCards={[
              {
                title: "Pilot readiness check",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Supplier brief",
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
            {id: 2, href: "https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products", title: "Guidance on privacy and the use of commercially available AI products | OAIC", publisher: "oaic.gov.au", category: "guide"},
            {id: 3, href: "https://indatalabs.com/blog/ai-consultant", title: "Everything You Should Know About AI Consultant in 2025", publisher: "indatalabs.com", category: "guide"},
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
