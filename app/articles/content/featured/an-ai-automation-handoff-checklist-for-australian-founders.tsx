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

const TOPIC = (/*cf-review:field-4041d1686a634ec780cbf4265515dd62*/"An AI automation handoff checklist for Australian founders")
export const CATEGORY = "featured"
export const SLUG = "an-ai-automation-handoff-checklist-for-australian-founders"
export const DATE_PUBLISHED = "2026-10-09"
export const DATE_MODIFIED = "2026-10-09"
export const DESCRIPTION = "Plan a small AI automation pilot with a fill-in handoff checklist covering human review, data boundaries, costs, teammate ownership and stop conditions."
const HERO_IMAGE = (/*cf-review:field-c1e5b1e5311c461095bb8c60037076b4*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-74e266de-8ccd-4df3-93dd-bc58f2335e1e.jpg?alt=media&token=29e8bba7-c290-4c7c-a637-a1a119ebd3db")
const HERO_IMAGE_ALT = "Two people sit at a table with an open laptop; one holds a pen above a spiral notebook, with a mug nearby."
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
  heading: "Key facts: An AI automation handoff checklist for Australian founders",
  intro: "Plan a small AI automation pilot with a fill-in handoff checklist covering human review, data boundaries, costs, teammate ownership and stop conditions.",
  items: [
    { label: "What can AI be used to automate?", description: "AI can assist with drafting routine customer replies from approved facts. In a hypothetical repair-booking workflow, a human checks the draft and sends it manually; prices, availability and booking confirmations remain outside scope." },
    { label: "What should an AI pilot measure?", description: "An AI pilot should compare manual and assisted handling time, output quality, review effort and incremental tool cost. Assisted time includes preparation, correction and manual fallback, with setup and training recorded separately." },
    { label: "When is a workflow ready to hand over?", description: "The proposed handoff requires recorded pilot results, current instructions, checked permissions and a supervised human teammate run. An unrun or failed rehearsal means not ready, and a successful run does not remove human approval." },
  ],
}

export const articleMeta = {
  title: "An AI automation handoff checklist for Australian founders",
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
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Hand over the workflow only when another person can operate it"} data-cf-source-section-id={"intro"}>
        <h2><span data-cf-component-id="field-4e932d12197f4eed9c3744e7ba4a6515" data-cf-component-type="text">{/*cf-review:field-4e932d12197f4eed9c3744e7ba4a6515*/"Hand over the workflow only when another person can operate it"}</span></h2>
        <p><strong>{TOPIC}</strong> — <span data-cf-component-id="field-11f251f1763b4d51a8e0f03bde81578e" data-cf-component-type="text">{/*cf-review:field-11f251f1763b4d51a8e0f03bde81578e*/"Start with a bounded routine task, agree which tools and data it may use, and define where human review happens and when work must stop. Before reducing founder involvement, record the pilot results and observe a teammate following the documented instructions, checking the output and using escalation or the manual fallback when needed. Treat these as conditions for your handoff decision, rather than assuming a useful AI demonstration means the workflow is ready."}</span></p>
        <p><span data-cf-component-id="field-fba8da6a0f9243d6bb5e7df6ef3943b2" data-cf-component-type="text">{/*cf-review:field-fba8da6a0f9243d6bb5e7df6ef3943b2*/"Here, \u201cteammate\u201d means a human operator, not an autonomous AI employee. AI may prepare a draft, but a named person remains responsible for checking and approving its use. Business.gov.au advises checking AI-generated information against a trustworthy source before relying on it. A written handoff plan captures what you intend to do; recorded results and a supervised teammate run provide evidence of what happened. Until that evidence exists, keep the handoff marked as planned, not ready."}</span></p>
        </div>
        <div id="choose-one-task" data-cf-component-id={"section:choose-one-task"} data-cf-component-type={"section"} data-cf-component-label={"Choose one task with a clear finish"} data-cf-source-section-id={"choose-one-task"}>
          <h2><span data-cf-component-id="field-73a4bde32b0b4c4e9500a581f4baf975" data-cf-component-type="text">{/*cf-review:field-73a4bde32b0b4c4e9500a581f4baf975*/"Choose one task with a clear finish"}</span></h2>
          <p><span data-cf-component-id="field-69816a690ac44e4fba23a2e9268cb5d7" data-cf-component-type="text">{/*cf-review:field-69816a690ac44e4fba23a2e9268cb5d7*/"Start with repeated work that has a recognisable input, an output someone can check and an existing manual process to fall back on. Describe where the task starts, what counts as finished and what stays outside its scope. These are practical selection criteria, not evidence that AI will improve the work. Business.gov.au recommends identifying the business problem before choosing an AI solution and checking the software you already use for suitable features: https://business.gov.au/online-and-digital/artificial-intelligence."}</span></p>
          <p><span data-cf-component-id="field-68de1f8bd34a45a7865e0a1a130cfed8" data-cf-component-type="text">{/*cf-review:field-68de1f8bd34a45a7865e0a1a130cfed8*/"For a hypothetical customer-reply workflow, the task could be drafting an explanation of how to request a repair booking. The input would be a general enquiry and approved facts about the booking process. The finished output would be a draft ready for a person to check, not a sent reply or a confirmed appointment. Prices, availability, complaints and resolving the customer's whole issue would remain outside scope. Keeping the task at the drafting stage gives the human operator a review point before anything reaches a customer."}</span></p>
          <p><span data-cf-component-id="field-78b72c71898f45e5a5b4e713d4e0fec8" data-cf-component-type="text">{/*cf-review:field-78b72c71898f45e5a5b4e713d4e0fec8*/"Check whether an existing tool is approved for the intended use before buying or connecting another service. You can plan a drafting pilot without giving the tool inbox access or permission to send messages automatically. Also consider whether a saved reply template or a clearer manual process would address the same problem. If the answer rarely changes, a template may be enough. Choose the approach to test because it addresses a specific difficulty, then use the pilot to find out whether it helps."}</span></p>
          <div data-cf-component-id={"image:choose-one-task"} data-cf-component-type={"image"} data-cf-component-label={"Image: Choose one task with a clear finish"} data-cf-source-section-id={"choose-one-task"}>
          <ArticleImageBlock
            src={/*cf-review:field-fa85a8ea94624f65b91a4bb69e218b4a*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-6e35d711-07b8-4ec5-abc7-3d631fb78634.jpg?alt=media&token=6bb58788-e68c-47cd-ad27-b9d675910dfa"}
            alt={/*cf-review:field-b5a0e56a5eb9404ab0d92d74cc58b632*/"A person writes in an open notebook at a wooden desk beside a laptop, smartphone, mug, and potted plant near a window."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="people-tools-data" data-cf-component-id={"section:people-tools-data"} data-cf-component-type={"section"} data-cf-component-label={"Agree who can use which tools and data"} data-cf-source-section-id={"people-tools-data"}>
          <h2><span data-cf-component-id="field-77c2da2252aa4910a7837e8346da1604" data-cf-component-type="text">{/*cf-review:field-77c2da2252aa4910a7837e8346da1604*/"Agree who can use which tools and data"}</span></h2>
          <p><span data-cf-component-id="field-dd15bc5fa9024198a360b153408b4b85" data-cf-component-type="text">{/*cf-review:field-dd15bc5fa9024198a360b153408b4b85*/"Before testing, name the accountable owner, the human operator who will run the task, a backup and the person authorised to approve changes. The owner decides whether the workflow can proceed and handles unresolved concerns. The operator follows the instructions and checks outputs at the agreed human approval point. Someone may hold several roles in a small team, but record each responsibility so the teammate knows who to contact rather than having to guess."}</span></p>
          <p><span data-cf-component-id="field-11762481b98f46aea97a7781b798eab3" data-cf-component-type="text">{/*cf-review:field-11762481b98f46aea97a7781b798eab3*/"Write down the exact tool and account or workspace, which inputs are permitted, where outputs will be stored and what access the operator and backup need. Give them only the permissions required for their assigned work. Customer Science\u2019s AI data privacy guide offers useful questions for this record: what data enters the workflow, why it is needed, who can access it and what evidence shows that controls are in place. Use those questions to describe your proposed workflow, without treating the guide\u2019s compliance framing as a legal conclusion about your business."}</span></p>
          <p><span data-cf-component-id="field-66ad4f27dda74a1197c0b396bc02c9f7" data-cf-component-type="text">{/*cf-review:field-66ad4f27dda74a1197c0b396bc02c9f7*/"A familiar product name or an existing login does not establish approval for a particular use of data. The Australian Government\u2019s Staff guidance on public generative AI distinguishes public tools from non-public enterprise tools, which may offer different security, privacy or tailored functionality despite a similar look and feel. That guidance is written for government personnel handling government information, not as a set of private-sector legal requirements. For your pilot, confirm the actual account and configuration rather than relying on the product name alone."}</span></p>
          <p><span data-cf-component-id="field-6cf11ecdecef4fd5bb5e9cae63ac8b01" data-cf-component-type="text">{/*cf-review:field-6cf11ecdecef4fd5bb5e9cae63ac8b01*/"Keep the approval record with the operating instructions. When someone proposes changing the tool, instructions, permitted data or access, the designated change approver should record the decision and its reason. The accountable owner should decide which permission checks and workflow tests need repeating before the change becomes routine. This gives the operator a clear boundary between an approved process and a proposed variation. A completed checklist does not guarantee legal compliance."}</span></p>
          <QuoteBlock title="Keep unapproved data out" variant="orange">
            <span data-cf-component-id="field-25f1f6550ee04880bf7e21e7754b44f7" data-cf-component-type="text">{/*cf-review:field-25f1f6550ee04880bf7e21e7754b44f7*/"Do not enter confidential or personal data into unapproved tools."}</span>
          </QuoteBlock>
        </div>
        <div data-cf-component-id={"callout:unapproved-data-warning"} data-cf-component-type={"callout"} data-cf-component-label={"An existing login is not approval"}>
          <ArticleCallout title="An existing login is not approval" variant="warning">
            {"If approval for the tool, exact account or intended data use is unclear, pause the AI-assisted task and use the existing manual process while the accountable owner checks approval."}
          </ArticleCallout>
        </div>
        <div id="pilot-measurements" data-cf-component-id={"section:pilot-measurements"} data-cf-component-type={"section"} data-cf-component-label={"Measure the whole task, including review"} data-cf-source-section-id={"pilot-measurements"}>
          <h2><span data-cf-component-id="field-693b733edd6f413587c5dc769870de7d" data-cf-component-type="text">{/*cf-review:field-693b733edd6f413587c5dc769870de7d*/"Measure the whole task, including review"}</span></h2>
          <p><span data-cf-component-id="field-4f8d5ee34b7841e5a7e97b7a91a4b464" data-cf-component-type="text">{/*cf-review:field-4f8d5ee34b7841e5a7e97b7a91a4b464*/"Measure the time needed to produce an acceptable, approved result, not just the time the tool takes to generate a draft. Use the record below as a suggested worksheet, not a research-validated evaluation method. Choose your pilot period, case scope, spending cap and review date before testing. ExIQ\u2019s discussion aid for Australian agencies and suppliers similarly recommends bringing a baseline, a practical way to test benefit and evidence gaps to the decision conversation: https://exiq.com.au/insights/government-ai-readiness-checklist/."}</span></p>
          <p><span data-cf-component-id="field-b3cd66d0a01b4cd588d4defbc81675cb" data-cf-component-type="text">{/*cf-review:field-b3cd66d0a01b4cd588d4defbc81675cb*/"Build the manual baseline from comparable tasks. Record the task type, case count, total handling minutes and output quality using the same acceptance checks you will apply to assisted work. For assisted handling time, add preparation and drafting, human review and correction, and exception or manual-fallback effort. Count each period of work only once. Keep setup and training effort separate so you can distinguish the work needed to establish the process from the effort needed to operate it."}</span></p>
          <p><span data-cf-component-id="field-4cd860ca6af84c7a9fc7bccc2d27e2ab" data-cf-component-type="text">{/*cf-review:field-4cd860ca6af84c7a9fc7bccc2d27e2ab*/"For quality, count outputs accepted without correction, corrected before acceptance and rejected, alongside the total number assessed. Note what went wrong and whether the final output met your checks. Include unsuccessful attempts and the effort spent recovering from them rather than recording only the fastest drafts. Record the time spent on business.gov.au\u2019s recommended output checks (https://business.gov.au/online-and-digital/artificial-intelligence). Keep measurement notes in the approved storage location without copying unnecessary customer information."}</span></p>
          <p><span data-cf-component-id="field-e9e933f5f7534c90b7a2fd252363f0c4" data-cf-component-type="text">{/*cf-review:field-e9e933f5f7534c90b7a2fd252363f0c4*/"Copy these fields into your measurement record and leave observations blank until collected. Record comparable case groups separately if their task types differ."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-1ad68d14d3364799b6e17bb7df80bea4" data-cf-component-type="text">{/*cf-review:field-1ad68d14d3364799b6e17bb7df80bea4*/"Pilot period and task scope: __"}</span></li>
            <li><span data-cf-component-id="field-3a814caf4e9e4f86aa024b600bcf2a73" data-cf-component-type="text">{/*cf-review:field-3a814caf4e9e4f86aa024b600bcf2a73*/"Planned case count: __"}</span></li>
            <li><span data-cf-component-id="field-2eb5c982afaa49c9b289840b025e5641" data-cf-component-type="text">{/*cf-review:field-2eb5c982afaa49c9b289840b025e5641*/"Spending cap (A$): __"}</span></li>
            <li><span data-cf-component-id="field-55181c34b957490f83fe05dd23ab715e" data-cf-component-type="text">{/*cf-review:field-55181c34b957490f83fe05dd23ab715e*/"Review date and decision owner: __"}</span></li>
            <li><span data-cf-component-id="field-4791d2e691e143bcb036685c93bea55b" data-cf-component-type="text">{/*cf-review:field-4791d2e691e143bcb036685c93bea55b*/"Actual dates, task type and cases assessed: __"}</span></li>
            <li><span data-cf-component-id="field-1826cee75bb248e7993a628b8efb4198" data-cf-component-type="text">{/*cf-review:field-1826cee75bb248e7993a628b8efb4198*/"Manual baseline handling time, total minutes: __"}</span></li>
            <li><span data-cf-component-id="field-f9987707053742aab84a1cab315a4a68" data-cf-component-type="text">{/*cf-review:field-f9987707053742aab84a1cab315a4a68*/"Assisted preparation and drafting, total minutes: __"}</span></li>
            <li><span data-cf-component-id="field-185720520f6b41778a2086c96d25fa69" data-cf-component-type="text">{/*cf-review:field-185720520f6b41778a2086c96d25fa69*/"Human review and correction, total minutes: __"}</span></li>
            <li><span data-cf-component-id="field-f91884b63d064684b0af24709318b0e9" data-cf-component-type="text">{/*cf-review:field-f91884b63d064684b0af24709318b0e9*/"Exception or manual-fallback effort, total minutes: __"}</span></li>
            <li><span data-cf-component-id="field-14d30b5c6927412388b138d6c4fd6004" data-cf-component-type="text">{/*cf-review:field-14d30b5c6927412388b138d6c4fd6004*/"Total assisted handling time, total minutes: __"}</span></li>
            <li><span data-cf-component-id="field-e1745814c9984812ba61be704e04d011" data-cf-component-type="text">{/*cf-review:field-e1745814c9984812ba61be704e04d011*/"Output acceptance checks: __"}</span></li>
            <li><span data-cf-component-id="field-e5f286eefa1a405b88601b9fea1d6d19" data-cf-component-type="text">{/*cf-review:field-e5f286eefa1a405b88601b9fea1d6d19*/"Manual quality results and error notes: __"}</span></li>
            <li><span data-cf-component-id="field-411e7209e72a40158fc226235db1aa05" data-cf-component-type="text">{/*cf-review:field-411e7209e72a40158fc226235db1aa05*/"Assisted quality results and error notes: __"}</span></li>
            <li><span data-cf-component-id="field-dfc5662a525a4a50a05481741bdc3829" data-cf-component-type="text">{/*cf-review:field-dfc5662a525a4a50a05481741bdc3829*/"Incremental tool cost (A$): __"}</span></li>
            <li><span data-cf-component-id="field-ba590cbb94b34ec793e46449d1b69e27" data-cf-component-type="text">{/*cf-review:field-ba590cbb94b34ec793e46449d1b69e27*/"Setup and training effort, recorded separately: __"}</span></li>
            <li><span data-cf-component-id="field-c59f349eb48f42ab8f9d89b0bae855b1" data-cf-component-type="text">{/*cf-review:field-c59f349eb48f42ab8f9d89b0bae855b1*/"Measurement-record location: __"}</span></li>
          </ul>
          <div data-cf-component-id={"image:pilot-measurements"} data-cf-component-type={"image"} data-cf-component-label={"Image: Measure the whole task, including review"} data-cf-source-section-id={"pilot-measurements"}>
          <ArticleImageBlock
            src={/*cf-review:field-325478d3b99149cf99bf08921e230f14*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-7d53267b-c440-4d65-8eaa-a32f75f4d8da.jpg?alt=media&token=0bb02ccc-48eb-4bb4-b5b3-f3969cd1d2ae"}
            alt={/*cf-review:field-75a835d28ebe4943a5a734890de1f364*/"An open laptop, mug, notebook, pen, books and phone sit on a wooden table beside houseplants and a window overlooking water."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-584af07d2a4a40b0830e1f395b5f4a1d" data-cf-component-type="text">{/*cf-review:field-584af07d2a4a40b0830e1f395b5f4a1d*/"Set the decision rules before testing"}</span></h3>
          <p><span data-cf-component-id="field-ab1526b028794ec9b1634b1118c162e7" data-cf-component-type="text">{/*cf-review:field-ab1526b028794ec9b1634b1118c162e7*/"Decide what would make the workflow worthwhile for your team before you see the results. Set limits for total handling time, review effort, quality and cost that fit the task. A quick draft may still be unsuitable if checking and correction consume too much operator time. These are reader-defined decision rules, not universal benchmarks."}</span></p>
          <p><span data-cf-component-id="field-49fc4a276eee43e3b0e0be817b0c3b0e" data-cf-component-type="text">{/*cf-review:field-49fc4a276eee43e3b0e0be817b0c3b0e*/"Record immediate stop events separately from disappointing productivity results. A suspected data exposure or an unauthorised action should trigger a pause and escalation, rather than waiting for the scheduled review. Define the contact and channel in advance, and use the existing manual process while the issue is reviewed."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-4ea5484b5905499cb7f5471100cdb9f5" data-cf-component-type="text">{/*cf-review:field-4ea5484b5905499cb7f5471100cdb9f5*/"Acceptable total handling time: __"}</span></li>
            <li><span data-cf-component-id="field-5849cd1917ec41e28b10679254098b67" data-cf-component-type="text">{/*cf-review:field-5849cd1917ec41e28b10679254098b67*/"Acceptable review and correction effort: __"}</span></li>
            <li><span data-cf-component-id="field-9e38b71c4b8441d795413c889b2da218" data-cf-component-type="text">{/*cf-review:field-9e38b71c4b8441d795413c889b2da218*/"Required output quality: __"}</span></li>
            <li><span data-cf-component-id="field-c4471eca82e54fecb29d640ece219b9f" data-cf-component-type="text">{/*cf-review:field-c4471eca82e54fecb29d640ece219b9f*/"Maximum incremental tool cost (A$): __"}</span></li>
            <li><span data-cf-component-id="field-1ed7a9345c8a4d31b239164c908a18c4" data-cf-component-type="text">{/*cf-review:field-1ed7a9345c8a4d31b239164c908a18c4*/"Continue if: __"}</span></li>
            <li><span data-cf-component-id="field-34bd28c220f7421fb06486c22a2aa3cb" data-cf-component-type="text">{/*cf-review:field-34bd28c220f7421fb06486c22a2aa3cb*/"Revise and retest if: __"}</span></li>
            <li><span data-cf-component-id="field-9594cb8aff08490398e5cc904ab291c8" data-cf-component-type="text">{/*cf-review:field-9594cb8aff08490398e5cc904ab291c8*/"Stop if: __"}</span></li>
            <li><span data-cf-component-id="field-a20a370312dd42cf86649fb2f87f91fe" data-cf-component-type="text">{/*cf-review:field-a20a370312dd42cf86649fb2f87f91fe*/"Person responsible for the decision: __"}</span></li>
            <li><span data-cf-component-id="field-1d0483904e15439c9cf5fde54e8b9ebb" data-cf-component-type="text">{/*cf-review:field-1d0483904e15439c9cf5fde54e8b9ebb*/"Immediate stop events: __"}</span></li>
            <li><span data-cf-component-id="field-329972eacac9484ca7d22761511fa879" data-cf-component-type="text">{/*cf-review:field-329972eacac9484ca7d22761511fa879*/"Notify this person through this channel: __"}</span></li>
            <li><span data-cf-component-id="field-4a926f669c584990ba5dea50f14bf909" data-cf-component-type="text">{/*cf-review:field-4a926f669c584990ba5dea50f14bf909*/"Manual fallback and its location: __"}</span></li>
            <li><span data-cf-component-id="field-e7f43f73555346a89061d539395194ec" data-cf-component-type="text">{/*cf-review:field-e7f43f73555346a89061d539395194ec*/"Owner authorised to approve restarting: __"}</span></li>
          </ul>
        </div>
        <div id="hypothetical-reply-workflow" data-cf-component-id={"section:hypothetical-reply-workflow"} data-cf-component-type={"section"} data-cf-component-label={"Hypothetical example: drafting repair-booking replies"} data-cf-source-section-id={"hypothetical-reply-workflow"}>
          <h2><span data-cf-component-id="field-e5dea9e385124ab7acac8d0e29d7a607" data-cf-component-type="text">{/*cf-review:field-e5dea9e385124ab7acac8d0e29d7a607*/"Hypothetical example: drafting repair-booking replies"}</span></h2>
          <p><span data-cf-component-id="field-040b8aef620b406e90070e8c91d19d1c" data-cf-component-type="text">{/*cf-review:field-040b8aef620b406e90070e8c91d19d1c*/"Business.gov.au describes using generative AI to draft text and suggests looking at AI features in software you already use. The hypothetical workflow below applies that idea to a narrow customer-support task: drafting a reply explaining how to request a repair booking. It is an illustrative plan, not an executed test, customer evidence or a record of improved performance."}</span></p>
          <p><span data-cf-component-id="field-57a7353a39e24d5e86b72b8c1eb6ac65" data-cf-component-type="text">{/*cf-review:field-57a7353a39e24d5e86b72b8c1eb6ac65*/"In this fictional team, Alex is the accountable owner and approves changes, Priya operates the workflow and approves replies, and Sam is the backup. Assume an existing drafting feature has been approved for this fictional scope. For your own pilot, identify and approve the exact tool, account and permitted use rather than treating this assumption as permission. Quotes, appointment availability, complaints, customer records and booking confirmations remain outside the task."}</span></p>
          <div data-cf-component-id={"image:hypothetical-reply-workflow"} data-cf-component-type={"image"} data-cf-component-label={"Image: Hypothetical example: drafting repair-booking replies"} data-cf-source-section-id={"hypothetical-reply-workflow"}>
          <ArticleImageBlock
            src={/*cf-review:field-bdebce0441844ebd92a88745757f6621*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a3f1b4b0-eac2-4d64-adce-14316b41c886.jpg?alt=media&token=5f03fabe-c5df-4f61-99be-4864a0e88668"}
            alt={/*cf-review:field-b0010a2797f84930a107eedc32d77542*/"Two people look toward a screen, one reaching forward while the other wears glasses and rests a hand against their chin."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-5033450d23154a238bd140bf6c7bc036" data-cf-component-type="text">{/*cf-review:field-5033450d23154a238bd140bf6c7bc036*/"Draft from a small set of supplied facts"}</span></h3>
          <p><span data-cf-component-id="field-1868cf68f53d450ca8c30cbb1c3e3e49" data-cf-component-type="text">{/*cf-review:field-1868cf68f53d450ca8c30cbb1c3e3e49*/"The fictional business publishes these facts: repair requests go through its website\u2019s booking form, the form asks for equipment type, and the team confirms appointments separately. The example enquiry is simply, \u201cHow do I request a repair booking?\u201d It contains no names or contact details. The proposed drafting tool has no connection to customer messages or automatic sending."}</span></p>
          <p><span data-cf-component-id="field-1f7763072fb84c2d9db4cad492029318" data-cf-component-type="text">{/*cf-review:field-1f7763072fb84c2d9db4cad492029318*/"A reusable instruction for this hypothetical task is: \u201cDraft a reply to the enquiry using only the supplied public booking facts. Do not add prices, availability or a booking confirmation. If information needed to answer is missing, flag it for the operator rather than guessing.\u201d Supply the enquiry and booking facts alongside that instruction."}</span></p>
          <p><span data-cf-component-id="field-fcd0c03459ec42e3a415d2bef7cbefa4" data-cf-component-type="text">{/*cf-review:field-fcd0c03459ec42e3a415d2bef7cbefa4*/"An authored illustration of a suitable reply is: \u201cPlease use the booking form on our website and include the equipment type. Our team will confirm an appointment separately.\u201d It is not tested model output."}</span></p>
          <h3><span data-cf-component-id="field-8b0b30af85684ec98f2052c3b962bdd4" data-cf-component-type="text">{/*cf-review:field-8b0b30af85684ec98f2052c3b962bdd4*/"Keep approval and exceptions with the human operator"}</span></h3>
          <p><span data-cf-component-id="field-53e4613cd7034651b182af532dbefce4" data-cf-component-type="text">{/*cf-review:field-53e4613cd7034651b182af532dbefce4*/"In the proposed process, Priya compares every statement in the draft with the supplied facts and checks that it promises neither a price nor an appointment. Only after approving it does she send the reply manually. If the request falls outside scope or the draft invents a promise, she withholds it, uses the existing manual reply process and refers the exception to Alex. The planned supervised teammate run should include recognising and handling such an exception."}</span></p>
          <p><span data-cf-component-id="field-8e707b2d58054198b0c6bd35dff7245d" data-cf-component-type="text">{/*cf-review:field-8e707b2d58054198b0c6bd35dff7245d*/"The hypothetical record remains incomplete: baseline timing: not run; assisted handling and review time: not run; quality observations: not run; tool cost: not recorded; operator and backup permission checks: pending; documented operating instructions: draft only; supervised teammate run: not run."}</span></p>
          <p><span data-cf-component-id="field-e0b90171dbe54509a7b9d5128beb19c6" data-cf-component-type="text">{/*cf-review:field-e0b90171dbe54509a7b9d5128beb19c6*/"Before Alex reduces founder involvement, the team still needs actual timing, quality and cost observations, checked permissions, current instructions and an observed teammate run. The proposed handoff remains not ready, and human approval stays part of the workflow."}</span></p>
        </div>
        <div id="handoff-checklist" data-cf-component-id={"section:handoff-checklist"} data-cf-component-type={"section"} data-cf-component-label={"Copy this pilot-to-teammate handoff checklist"} data-cf-source-section-id={"handoff-checklist"}>
          <h2><span data-cf-component-id="field-0db4e57bffee4465a7ccee1351831825" data-cf-component-type="text">{/*cf-review:field-0db4e57bffee4465a7ccee1351831825*/"Copy this pilot-to-teammate handoff checklist"}</span></h2>
          <p><span data-cf-component-id="field-c396f067c0f148b8b96a61cf1151c590" data-cf-component-type="text">{/*cf-review:field-c396f067c0f148b8b96a61cf1151c590*/"Copy this record into your working document for a bounded routine task run by a human operator. Fill in the planned controls before testing, then add evidence as you collect it. Leave boxes unchecked until the relevant definition, observation or verification is recorded."}</span></p>
          <p><span data-cf-component-id="field-355f1ced95064d2a9eedf48171eb93df" data-cf-component-type="text">{/*cf-review:field-355f1ced95064d2a9eedf48171eb93df*/"This is a suggested planning worksheet, not a validated evaluation method or a guarantee of legal compliance. Keep planned controls separate from recorded observations, and identify supporting records without copying unnecessary customer information into the checklist."}</span></p>
          <h3><span data-cf-component-id="field-cc1fda87c4854365bbae4d02fd70d8f6" data-cf-component-type="text">{/*cf-review:field-cc1fda87c4854365bbae4d02fd70d8f6*/"Define before the pilot"}</span></h3>
          <p><span data-cf-component-id="field-1e0ff68df7474eb4b95bdbc67d0dc835" data-cf-component-type="text">{/*cf-review:field-1e0ff68df7474eb4b95bdbc67d0dc835*/"Note any overlapping roles when assigning responsibilities. In the approval record, specify the exact tool and account, not just the product name, and make clear that confidential or personal data must stay out of unapproved tools."}</span></p>
          <p><span data-cf-component-id="field-e711e32b5986433cb9b24d50af74fe25" data-cf-component-type="text">{/*cf-review:field-e711e32b5986433cb9b24d50af74fe25*/"Write operating instructions that cover the path from input to approved output, including incomplete inputs and drafts that fail a check. Document how to notify the escalation contact and return to the manual process while an issue is reviewed. Set your measurement thresholds before testing. For pilot boundaries, decision rules and recovery arrangements already recorded above, reference those records rather than copying the entries."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-c55ff8c8ae7543ecba47a198d51e1a5c" data-cf-component-type="text">{/*cf-review:field-c55ff8c8ae7543ecba47a198d51e1a5c*/"\u2610 Scope recorded: workflow purpose and routine task __; starting input __; finished output __; exclusions __."}</span></li>
            <li><span data-cf-component-id="field-3695039add6c409fa4dd937854084e28" data-cf-component-type="text">{/*cf-review:field-3695039add6c409fa4dd937854084e28*/"\u2610 Responsibilities assigned: accountable owner __; human operator __; backup __; change approver __."}</span></li>
            <li><span data-cf-component-id="field-e0eb48f63ee641828147c9c0e9138794" data-cf-component-type="text">{/*cf-review:field-e0eb48f63ee641828147c9c0e9138794*/"\u2610 Tools and data approved: exact tool and account or workspace __; permitted data __; prohibited data __; operator permissions __; backup permissions __; approved storage location __; approval record __."}</span></li>
            <li><span data-cf-component-id="field-00696fc996734d5c983793d98dd2f41e" data-cf-component-type="text">{/*cf-review:field-00696fc996734d5c983793d98dd2f41e*/"\u2610 Instructions written: required inputs __; trusted fact source __; operating steps __; output acceptance checks __; human approval point __."}</span></li>
            <li><span data-cf-component-id="field-f56caf615454422d83975bb51d0afba2" data-cf-component-type="text">{/*cf-review:field-f56caf615454422d83975bb51d0afba2*/"\u2610 Recovery defined: exception types __; immediate stop conditions, escalation contact and channel, and manual fallback and its location documented in __."}</span></li>
            <li><span data-cf-component-id="field-82e852c14f014049bd93e59d0002b298" data-cf-component-type="text">{/*cf-review:field-82e852c14f014049bd93e59d0002b298*/"\u2610 Pilot boundaries complete in the measurement record: pilot period, case scope and planned case count, spending cap in A$ and review date. Measurement-record location: __."}</span></li>
            <li><span data-cf-component-id="field-40d9ad9d4c0140acb565dce950178b09" data-cf-component-type="text">{/*cf-review:field-40d9ad9d4c0140acb565dce950178b09*/"\u2610 Decision rules complete: acceptable total handling time, acceptable review effort, required quality and acceptable tool cost; conditions to continue, revise and retest, or stop. Decision-rule record location: __."}</span></li>
          </ul>
          <h3><span data-cf-component-id="field-7ddb58d40a74495cb790d36ec4907f7d" data-cf-component-type="text">{/*cf-review:field-7ddb58d40a74495cb790d36ec4907f7d*/"Record pilot evidence"}</span></h3>
          <p><span data-cf-component-id="field-907ea724c9ee45ae8d6cf885c24470e5" data-cf-component-type="text">{/*cf-review:field-907ea724c9ee45ae8d6cf885c24470e5*/"Complete the measurement record above from observations, not targets or forecasts. Leave uncollected observations blank or marked \u2018not run\u2019; a planned saving is not a measured result."}</span></p>
          <p><span data-cf-component-id="field-dd3806e8f8ac4172a018dd74354a10dd" data-cf-component-type="text">{/*cf-review:field-dd3806e8f8ac4172a018dd74354a10dd*/"Use the checks below to confirm what that record contains, without copying the figures here. Identify the underlying records so the owner can examine the result against each threshold."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-aa1f80d6cccd4bc6a904e2f1a20d0248" data-cf-component-type="text">{/*cf-review:field-aa1f80d6cccd4bc6a904e2f1a20d0248*/"\u2610 Cases documented: actual case count, task types and testing dates. Supporting record location: __."}</span></li>
            <li><span data-cf-component-id="field-4116f6f5e7024b77bb45023e64d7646d" data-cf-component-type="text">{/*cf-review:field-4116f6f5e7024b77bb45023e64d7646d*/"\u2610 Manual baseline recorded: comparable case count, total handling minutes and quality results against acceptance checks."}</span></li>
            <li><span data-cf-component-id="field-20e2bebe79a443a08a77b287fb6851d9" data-cf-component-type="text">{/*cf-review:field-20e2bebe79a443a08a77b287fb6851d9*/"\u2610 Assisted time recorded in minutes: preparation and drafting, review and correction, exception or manual-fallback effort, and total handling time."}</span></li>
            <li><span data-cf-component-id="field-2f6d87926fdc4f4fa48be085c0f549d0" data-cf-component-type="text">{/*cf-review:field-2f6d87926fdc4f4fa48be085c0f549d0*/"\u2610 Quality assessed: cases assessed, accepted without correction, corrected before acceptance, rejected and error notes."}</span></li>
            <li><span data-cf-component-id="field-4e8e9e368337439a9e2f128b98645247" data-cf-component-type="text">{/*cf-review:field-4e8e9e368337439a9e2f128b98645247*/"\u2610 Costs and setup recorded: incremental tool cost in A$, with setup effort and training effort recorded separately."}</span></li>
            <li><span data-cf-component-id="field-e697f0b0b5f94b6b95890cbeea0cc5c2" data-cf-component-type="text">{/*cf-review:field-e697f0b0b5f94b6b95890cbeea0cc5c2*/"\u2610 Issues and decision evidence recorded: exceptions __; unresolved issues __; result against each threshold __; supporting record location __."}</span></li>
          </ul>
          <h3><span data-cf-component-id="field-51ceac487c7d46f780af736ca856f108" data-cf-component-type="text">{/*cf-review:field-51ceac487c7d46f780af736ca856f108*/"Verify before reducing founder involvement"}</span></h3>
          <p><span data-cf-component-id="field-f87c8461950049a0b14e450d8f3303a1" data-cf-component-type="text">{/*cf-review:field-f87c8461950049a0b14e450d8f3303a1*/"For this proposed handoff, require recorded pilot results, current documented instructions and a supervised teammate run before reducing founder involvement. Observe whether the teammate follows the instructions, checks the output and recognises when to escalate or use the manual fallback. If the rehearsal has not been run, the handoff is \u2018not ready\u2019: arrange the supervised run. If it fails, keep that status, revise the instructions and repeat the rehearsal."}</span></p>
          <p><span data-cf-component-id="field-0a3685aafb9541a79b44121fbde1e0ed" data-cf-component-type="text">{/*cf-review:field-0a3685aafb9541a79b44121fbde1e0ed*/"A successful supervised run does not remove ongoing human approval or prove every future case is safe. Require owner approval before material changes to tools, instructions, permitted data or access. Record which checks must be repeated, and complete them before the changed process becomes routine."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-1be3d69d88cc41268b270e940c51c200" data-cf-component-type="text">{/*cf-review:field-1be3d69d88cc41268b270e940c51c200*/"\u2610 Instructions verified: current instructions location __; version __; corrections made after testing __."}</span></li>
            <li><span data-cf-component-id="field-e1a15448ae4e43c6a937f7e3cf5fdabd" data-cf-component-type="text">{/*cf-review:field-e1a15448ae4e43c6a937f7e3cf5fdabd*/"\u2610 Access verified: operator access checked by and on __; backup access checked by and on __; outstanding permission issues __."}</span></li>
            <li><span data-cf-component-id="field-60c8eca080dd40be8f017762fd7c32ab" data-cf-component-type="text">{/*cf-review:field-60c8eca080dd40be8f017762fd7c32ab*/"\u2610 Supervised run recorded: date __; observer __; case __; observation record location __."}</span></li>
            <li><span data-cf-component-id="field-67a6850d4f37491499acdd0ed38547b2" data-cf-component-type="text">{/*cf-review:field-67a6850d4f37491499acdd0ed38547b2*/"\u2610 Operator capability evidenced: instructions followed __; output checks completed __; human approval applied __; exception recognised __; escalation or fallback used __."}</span></li>
            <li><span data-cf-component-id="field-e862d0318fed42548da527b65acf03c8" data-cf-component-type="text">{/*cf-review:field-e862d0318fed42548da527b65acf03c8*/"\u2610 Owner decision recorded: ready or not ready __; reason and evidence __; owner __; decision date __; next review trigger __."}</span></li>
            <li><span data-cf-component-id="field-851f7b3f72ec4f05952cbe12b4218a1c" data-cf-component-type="text">{/*cf-review:field-851f7b3f72ec4f05952cbe12b4218a1c*/"\u2610 Change control documented: owner approval record location __; checks to repeat after material changes __; person responsible for completing those checks __."}</span></li>
          </ul>
          <h3><span data-cf-component-id="field-78bb452d5cbd461ea0c195621a5c8913" data-cf-component-type="text">{/*cf-review:field-78bb452d5cbd461ea0c195621a5c8913*/"Questions to take to peers"}</span></h3>
          <p><span data-cf-component-id="field-38da649223f4414e9de54d2faa967ed6" data-cf-component-type="text">{/*cf-review:field-38da649223f4414e9de54d2faa967ed6*/"Take your shortlisted task and unresolved decisions to peers without sharing confidential records. Ask about the parts that remain uncertain, especially exception handling and the effort required to review outputs. Use their suggestions to refine the plan, then test changes in your own workflow rather than treating another team's experience as evidence that yours is ready."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-e13787c66fb346d5acd2bc32c6b027b1" data-cf-component-type="text">{/*cf-review:field-e13787c66fb346d5acd2bc32c6b027b1*/"\u2610 Shortlisted use case __; unresolved question __."}</span></li>
            <li><span data-cf-component-id="field-728afd8787414915bc8c000074f11d43" data-cf-component-type="text">{/*cf-review:field-728afd8787414915bc8c000074f11d43*/"\u2610 Which exceptions should stay manual? Notes __."}</span></li>
            <li><span data-cf-component-id="field-d2fd32f51e93462c89f6e4037f64ef2e" data-cf-component-type="text">{/*cf-review:field-d2fd32f51e93462c89f6e4037f64ef2e*/"\u2610 How do you count checking, correction and fallback effort? Notes __."}</span></li>
            <li><span data-cf-component-id="field-f654fe8f75464a04b04118a230a0993c" data-cf-component-type="text">{/*cf-review:field-f654fe8f75464a04b04118a230a0993c*/"\u2610 What would you want to see in a supervised teammate run? Notes __."}</span></li>
          </ul>
        </div>
        <div id="next-step" data-cf-component-id={"section:next-step"} data-cf-component-type={"section"} data-cf-component-label={"Check whether an event fits your questions"} data-cf-source-section-id={"next-step"}>
          <h2><span data-cf-component-id="field-16cf54b5fab844f38965cede6f94d25d" data-cf-component-type="text">{/*cf-review:field-16cf54b5fab844f38965cede6f94d25d*/"Check whether an event fits your questions"}</span></h2>
          <p><span data-cf-component-id="field-fe6550965e344a5bb8d823a402cc1e2b" data-cf-component-type="text">{/*cf-review:field-fe6550965e344a5bb8d823a402cc1e2b*/"Judge an event\u2019s relevance against your questions about the shortlisted task. You can run your pilot without attending, and attendance does not guarantee implementation advice."}</span></p>
          <div data-cf-component-id={"image:next-step"} data-cf-component-type={"image"} data-cf-component-label={"Image: Check whether an event fits your questions"} data-cf-source-section-id={"next-step"}>
          <ArticleImageBlock
            src={/*cf-review:field-ca947d66ada3474291492eb201226e9d*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ec3230b9-3879-4f74-979d-ce9db9328080.jpg?alt=media&token=94ca78a9-561a-43dd-8983-5f8c5aae7ee2"}
            alt={/*cf-review:field-ec594a1b985c45e995951bd2338faa0e*/"Three people stand near large windows, two wearing backpacks and one holding a cup, with seated people and a blank projection screen behind them."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free worksheet"
            title={"AI Automation Pilot-to-Teammate Handoff Worksheet"}
            description="A fill-in worksheet to define an AI-assisted task, assign human ownership, set data boundaries, measure results and record handoff evidence."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fan-ai-automation-handoff-checklist-for-australian-founders-worksheet-5ff77ab7.pdf?alt=media&token=79ab46c1-3a65-4b0f-9589-43c3a8bc8cb3"
            accent="purple"
            previewCards={[
              {
                title: "Pilot measurements",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Handoff readiness",
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
            {id: 2, href: "https://customerscience.com.au/insights/ai-data-privacy-compliance/", title: "AI Data Privacy Compliance in Australia: 2026 Guide | Customer Science", publisher: "customerscience.com.au", category: "guide"},
            {id: 3, href: "https://www.digital.gov.au/policy/ai/staff-guidance-public-generative-ai", title: "Staff guidance on public generative AI | digital.gov.au", publisher: "digital.gov.au", category: "guide"},
            {id: 4, href: "https://exiq.com.au/insights/government-ai-readiness-checklist/", title: "Government AI Readiness Checklist Australia | ExIQ", publisher: "exiq.com.au", category: "guide"},
            {id: 5, href: "https://academy.openai.com/public/resources/openai-academy-small-business-resource-hub-2026-06-03", title: "ChatGPT for Small Business | Workshop Resource Hub - Resource | OpenAI Academy", publisher: "academy.openai.com", category: "guide"},
            {id: 6, href: "https://mlai.au/events", title: "AI & Machine Learning Events in Australia | MLAI", publisher: "mlai.au", category: "guide"},
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

        <ArticleFooterNav backHref="/articles" topHref="#" />
    </>
  )
}
