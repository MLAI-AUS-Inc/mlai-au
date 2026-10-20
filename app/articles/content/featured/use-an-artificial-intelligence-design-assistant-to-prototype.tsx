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

const TOPIC = (/*cf-review:field-a18cc6cab8d54be0b843ff6bc8df0aef*/"Use an Artificial Intelligence Design Assistant to Prototype")
export const CATEGORY = "featured"
export const SLUG = "use-an-artificial-intelligence-design-assistant-to-prototype"
export const DATE_PUBLISHED = "2026-10-20"
export const DATE_MODIFIED = "2026-10-20"
export const DESCRIPTION = "Prototype a hypothetical small-business workflow with synthetic data, check its interactions and plan a capped pilot before paying for development."
const HERO_IMAGE = (/*cf-review:field-09492d232a6640ceab26b72c1ae6f91e*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-6f255f22-52be-4e14-a162-6ea7c04e7054.jpg?alt=media&token=f8e00c6f-f254-425a-ab00-293e2c007690")
const HERO_IMAGE_ALT = "Two people look at a laptop at a table. One points toward it while the other, wearing glasses, rests a hand against their chin."
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
  heading: "Key facts: Use an Artificial Intelligence Design Assistant to Prototype",
  intro: "Prototype a hypothetical small-business workflow with synthetic data, check its interactions and plan a capped pilot before paying for development.",
  items: [
    { label: "What can an artificial intelligence design assistant produce?", description: "Some AI design tools generate editable interface layouts from text prompts and provide text-generation features for interface copy. Check whether buttons actually connect screens before treating the output as a clickable prototype." },
    { label: "How can you prototype a small-business idea?", description: "For a hypothetical garden-tidy offering, connect three screens: job details, review and edit, and a simulated acknowledgement. Use synthetic data and manually check navigation, error states and mobile readability." },
    { label: "What should a prototype pilot measure?", description: "Measure task time, completeness, errors and spending against a comparable baseline. Record customer effort, owner review and setup separately, with time and spending caps and agreed continue, revise or stop thresholds." },
  ],
}

export const articleMeta = {
  title: "Use an Artificial Intelligence Design Assistant to Prototype",
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
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Start with one customer task, not a whole product"} data-cf-source-section-id={"intro"}>
        <h2><span data-cf-component-id="field-732e4a1cb08548209030fff66fc2b5a3" data-cf-component-type="text">{/*cf-review:field-732e4a1cb08548209030fff66fc2b5a3*/"Start with one customer task, not a whole product"}</span></h2>
        <p><strong>{TOPIC}</strong> — <span data-cf-component-id="field-e220b894cc114559a0dd75bedb470976" data-cf-component-type="text">{/*cf-review:field-e220b894cc114559a0dd75bedb470976*/"For a hypothetical first prototype, give an artificial intelligence design assistant one customer task and ask for three connected screens using fictional data. Inspect the generated copy and interactions yourself, then define a small, capped pilot before buying tools or commissioning development. Start with the business problem rather than the software, consistent with business.gov.au\u2019s guidance on introducing AI."}</span></p>
        <p><span data-cf-component-id="field-6f548a46cb384cbb84eb1b5446f42523" data-cf-component-type="text">{/*cf-review:field-6f548a46cb384cbb84eb1b5446f42523*/"Here, a design assistant means an AI tool you instruct to draft interface layouts, wording or screen specifications. Our hypothetical example is an Australian garden-maintenance business considering a quote-request option for one-off garden tidy-ups. No customer research, prototype testing or validation has been conducted for this example."}</span></p>
        <p><span data-cf-component-id="field-ede08fb0808649828a1a7419e92e07ab" data-cf-component-type="text">{/*cf-review:field-ede08fb0808649828a1a7419e92e07ab*/"AI can help design that flow without being part of the eventual service. A person could still assess every quote request, and the finished form might not need AI at all. A clickable prototype does not establish readiness for live use, secure data handling, functioning integrations or customer demand."}</span></p>
        </div>
        <div id="scope-customer-task" data-cf-component-id={"section:scope-customer-task"} data-cf-component-type={"section"} data-cf-component-label={"Choose one problem and draw its boundaries"} data-cf-source-section-id={"scope-customer-task"}>
          <h2><span data-cf-component-id="field-e6bfdcb676f14a4eaee3b364e0ed301d" data-cf-component-type="text">{/*cf-review:field-e6bfdcb676f14a4eaee3b364e0ed301d*/"Choose one problem and draw its boundaries"}</span></h2>
          <p><span data-cf-component-id="field-853ac952ec0042bc89b2e61f9e1ecf57" data-cf-component-type="text">{/*cf-review:field-853ac952ec0042bc89b2e61f9e1ecf57*/"Business.gov.au recommends identifying the business problem first and looking at software you already use when considering solutions. Use this sentence to narrow your idea: \u201c[Customer] needs to [complete task] so that [specific outcome]; we will explore whether [proposed change] helps.\u201d The outcome should be something a person can review, rather than a promise that the tool will deliver a business result."}</span></p>
          <p><span data-cf-component-id="field-884c1ba62fd84da29cf278c046668fe5" data-cf-component-type="text">{/*cf-review:field-884c1ba62fd84da29cf278c046668fe5*/"For the hypothetical garden-maintenance business: \u201cA prospective garden-tidy customer needs to provide enough job information for a person to assess a quote request; we will explore whether a guided request form helps.\u201d Assume the current alternative is a phone or email enquiry. Keep the proposed offering to a request for a one-off garden tidy-up, with a person deciding what happens next."}</span></p>
          <p><span data-cf-component-id="field-2833da643d6e48198d126594a7b34928" data-cf-component-type="text">{/*cf-review:field-2833da643d6e48198d126594a7b34928*/"In this hypothetical exercise, limit the demonstration to three primary screens: enter job details, review and edit those details, then view a clearly labelled simulated acknowledgement. Leave out payments, accounts, live availability, automatic prices and connections to customer-management systems. The final screen should say \u201cDemo only\u2014nothing has been sent\u201d to make its simulated status explicit. During the rehearsal, ask participants what that message means and record any misunderstanding about whether a request or booking was made."}</span></p>
          <p><span data-cf-component-id="field-1b2f85c5749542449500b216a4255ae0" data-cf-component-type="text">{/*cf-review:field-1b2f85c5749542449500b216a4255ae0*/"Before generating anything, check whether an existing business-approved tool supports editable screens, linked buttons and a preview. Confirm its current access, sharing, export and pricing restrictions rather than assuming these features are included. Record tool limitations before deciding whether another subscription is needed."}</span></p>
          <div data-cf-component-id={"image:scope-customer-task"} data-cf-component-type={"image"} data-cf-component-label={"Image: Choose one problem and draw its boundaries"} data-cf-source-section-id={"scope-customer-task"}>
          <ArticleImageBlock
            src={/*cf-review:field-7266ecda03ad4ec8a7579bfee5c3ff20*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-6ca837ad-c141-4a9e-84ac-b5f7a088507c.jpg?alt=media&token=52e98946-b132-4b80-9342-263bc4231c8d"}
            alt={/*cf-review:field-ca52416762c74c22824027b5344abd2c*/"A hand draws a garden layout in a notebook on a weathered wooden table beside gardening gloves, a mug, and a potted plant."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"callout:synthetic-data-boundary"} data-cf-component-type={"callout"} data-cf-component-label={"Keep real customer data out"}>
          <ArticleCallout title="Keep real customer data out" variant="warning">
            {"Use synthetic inputs, and never enter personal or confidential information into an unapproved tool. Have a person review all generated copy and interactions before relying on them."}
          </ArticleCallout>
        </div>
        <div id="generate-prototype" data-cf-component-id={"section:generate-prototype"} data-cf-component-type={"section"} data-cf-component-label={"Generate the screens and connect the flow"} data-cf-source-section-id={"generate-prototype"}>
          <h2><span data-cf-component-id="field-c60f6cd8635b4219a03b0f95cf1663ac" data-cf-component-type="text">{/*cf-review:field-c60f6cd8635b4219a03b0f95cf1663ac*/"Generate the screens and connect the flow"}</span></h2>
          <p><span data-cf-component-id="field-67e81da8dab1458db89ef792833479d8" data-cf-component-type="text">{/*cf-review:field-67e81da8dab1458db89ef792833479d8*/"Give the assistant the customer task, the information it can use, the output you want and the limits it must respect. OpenAI Academy\u2019s small-business workshop calls these Goal, Context, Output and Boundary. They help you explain the request without needing technical language. The hypothetical garden-tidy exercise below applies that structure; it does not assume your chosen tool can generate working, clickable screens."}</span></p>
          <p><span data-cf-component-id="field-e8a8c252a1d247dd8b5d4c3ad56cb416" data-cf-component-type="text">{/*cf-review:field-e8a8c252a1d247dd8b5d4c3ad56cb416*/"Check what the assistant actually returns. A screen specification describes the layout, words and behaviour. A static image shows an appearance but has no working controls. A clickable prototype connects screens so someone can follow a route. If the assistant supplies only copy, layouts, specifications or images, use them to assemble editable screens in an already-approved design or presentation tool."}</span></p>
          <h3><span data-cf-component-id="field-9dc957bc72aa48808309274b1e485a4d" data-cf-component-type="text">{/*cf-review:field-9dc957bc72aa48808309274b1e485a4d*/"Copy and adapt this prompt"}</span></h3>
          <p><span data-cf-component-id="field-6539bc71e95e4f4aa5c0a60dfa7505fb" data-cf-component-type="text">{/*cf-review:field-6539bc71e95e4f4aa5c0a60dfa7505fb*/"Replace the bracketed descriptions with your intended business, customer and task. The supplied sample details belong to the hypothetical garden-tidy example and are synthetic, not customer records."}</span></p>
          <p><span data-cf-component-id="field-53b702321abe4bd1af51832ca9e0bf3b" data-cf-component-type="text">{/*cf-review:field-53b702321abe4bd1af51832ca9e0bf3b*/"Act as a design assistant for [small business and proposed offering]. Intended user: [customer]. Task: [one customer task]. For this hypothetical exercise, create a low-fidelity, mobile-first prototype with exactly three primary screens: (1) enter the necessary details, (2) review them and edit, and (3) view a simulated acknowledgement. Keep the layout simple and suitable for a narrow phone screen."}</span></p>
          <p><span data-cf-component-id="field-8a7785c7c26c4b6c9915a3d9af930fa0" data-cf-component-type="text">{/*cf-review:field-8a7785c7c26c4b6c9915a3d9af930fa0*/"For this hypothetical garden-tidy example, use only these synthetic details: Sample Customer A; demo@example.com; service: one-off garden tidy; garden size: small; job note: weed beds and sweep paths. Include labelled fields, concise plain-English copy, a missing-required-field state and an invalid-email state within the relevant screen. Specify forward, edit/back and restart interactions. Use readable text and errors that do not rely on colour alone."}</span></p>
          <p><span data-cf-component-id="field-8372339b701141e290bc273c92dc2715" data-cf-component-type="text">{/*cf-review:field-8372339b701141e290bc273c92dc2715*/"Do not create real accounts, send messages, store submissions, connect services, quote prices or promise availability. Label the final screen: Demo only\u2014nothing has been sent. Output editable screens and an interaction map if supported; otherwise provide a screen specification and exact linking instructions. List assumptions, simulated behaviours and anything requiring human review. Do not invent customer findings."}</span></p>
          <h3><span data-cf-component-id="field-69c940251cf64bacb1cd4b416d11f7fe" data-cf-component-type="text">{/*cf-review:field-69c940251cf64bacb1cd4b416d11f7fe*/"Connect the screens and check the preview"}</span></h3>
          <p><span data-cf-component-id="field-f856acf6cc704cea84196c3564710be2" data-cf-component-type="text">{/*cf-review:field-f856acf6cc704cea84196c3564710be2*/"For the hypothetical garden-tidy flow, link the job-details screen to the review screen. From review, provide an edit action that returns to job details and a simulated submission action that opens the acknowledgement. Let the acknowledgement restart the demonstration. If the tool has not created those links, connect the buttons manually where supported, then follow each route in preview or presentation mode."}</span></p>
          <p><span data-cf-component-id="field-74c4d5f21093458384443e3d0bfb3de2" data-cf-component-type="text">{/*cf-review:field-74c4d5f21093458384443e3d0bfb3de2*/"Links alone do not prove that form behaviour works. If the prototype cannot accept typed details, label that behaviour as simulated and record the limitation."}</span></p>
        </div>
        <div id="inspect-and-revise" data-cf-component-id={"section:inspect-and-revise"} data-cf-component-type={"section"} data-cf-component-label={"Walk through the prototype before showing it to anyone"} data-cf-source-section-id={"inspect-and-revise"}>
          <h2><span data-cf-component-id="field-bbb3c16921e54adea53003f7a5063ec3" data-cf-component-type="text">{/*cf-review:field-bbb3c16921e54adea53003f7a5063ec3*/"Walk through the prototype before showing it to anyone"}</span></h2>
          <p><span data-cf-component-id="field-b8187ffde3534eafa885171d6d3d0957" data-cf-component-type="text">{/*cf-review:field-b8187ffde3534eafa885171d6d3d0957*/"Inspect the generated screens yourself rather than accepting the assistant\u2019s claim that they work. Business.gov.au advises checking AI-generated information before relying on it. For this hypothetical garden-tidy prototype, start with the normal route using the supplied synthetic details: enter the request, review it and open the simulated acknowledgement. Check that necessary details are requested before review, the review matches the input and every button reaches its intended destination."}</span></p>
          <p><span data-cf-component-id="field-1952efe8ae464f70b94be2bbf9f59dbb" data-cf-component-type="text">{/*cf-review:field-1952efe8ae464f70b94be2bbf9f59dbb*/"Then try the correction routes. Leave a required field blank, enter an invalid fictional email address, return from review to change the garden size, then restart the demonstration. Keep a short issue log recording the route, expected behaviour, observed behaviour and anything you simulated manually. A drawn error message does not demonstrate functioning validation. If the prototype cannot preserve edited values or respond to invalid input, record that limitation rather than treating the route as passed."}</span></p>
          <p><span data-cf-component-id="field-4be734afddd847c892146afc9bcd6d54" data-cf-component-type="text">{/*cf-review:field-4be734afddd847c892146afc9bcd6d54*/"Read the copy alongside those interactions. Look for unexplained fields, missing instructions and promises about prices, availability or messages being sent that the demonstration cannot fulfil. Where \u201cContinue\u201d leaves the destination unclear, use a label such as \u201cReview job details\u201d. Check that the acknowledgement describes a simulation, not a real quote request or booking, and that returning to edit is easy to find."}</span></p>
          <p><span data-cf-component-id="field-2d63f3610f5a4c55a6f5a343369ef7bc" data-cf-component-type="text">{/*cf-review:field-2d63f3610f5a4c55a6f5a343369ef7bc*/"Open a narrow mobile preview and inspect it for clipped content, readable text and enough spacing to distinguish adjacent buttons. Where the tool permits, try keyboard navigation and zoom, and check whether keyboard focus remains visible. Inspect field labels and make sure errors explain the problem in words rather than relying on colour alone. Mark checks the tool cannot support as \u201cnot testable here\u201d. These are practical checks for this exercise, not a comprehensive accessibility audit, security assessment or proof of operational reliability."}</span></p>
          <p><span data-cf-component-id="field-7ff25ec5353b47bda0ecf5562d8a1b7c" data-cf-component-type="text">{/*cf-review:field-7ff25ec5353b47bda0ecf5562d8a1b7c*/"Ask for a bounded revision, then repeat the affected route. For example, in this hypothetical prototype: \u201cOn the review screen, add an Edit job details action that returns to the entry screen; keep all other copy unchanged.\u201d Check the revised copy and links yourself, and update the issue log with what changed, what remains unresolved and what is still simulated."}</span></p>
          <div data-cf-component-id={"image:inspect-and-revise"} data-cf-component-type={"image"} data-cf-component-label={"Image: Walk through the prototype before showing it to anyone"} data-cf-source-section-id={"inspect-and-revise"}>
          <ArticleImageBlock
            src={/*cf-review:field-729a7a2e61ce44069370aeec243d5aed*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-bbd5f133-5723-443a-8776-d93638e8b712.jpg?alt=media&token=42bb4603-36ea-40ca-a4e3-cd414404f49d"}
            alt={/*cf-review:field-5fc98af07c8340808d95d0a75d9ed528*/"An open laptop, mug, notebook and pen sit on a wooden garden table beside a potted plant, with greenery in the background."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="pilot-scorecard" data-cf-component-id={"section:pilot-scorecard"} data-cf-component-type={"section"} data-cf-component-label={"Draft a capped pilot before committing money"} data-cf-source-section-id={"pilot-scorecard"}>
          <h2><span data-cf-component-id="field-f5fabdfa8e1447659331d3b193f31ff8" data-cf-component-type="text">{/*cf-review:field-f5fabdfa8e1447659331d3b193f31ff8*/"Draft a capped pilot before committing money"}</span></h2>
          <p><span data-cf-component-id="field-c46d85d2a8844c9c9762073acf87cd64" data-cf-component-type="text">{/*cf-review:field-c46d85d2a8844c9c9762073acf87cd64*/"Plan a usability rehearsal with synthetic information, not a live quote-request service. For the hypothetical garden-tidy offering, invite willing participants who resemble the intended customer where feasible, explain that nothing will be submitted, and name a human reviewer who can check outputs and stop the exercise. The immediate question is whether people can complete and understand the proposed flow, not whether the business is ready to launch it."}</span></p>
          <p><span data-cf-component-id="field-8e1e20ac0f924c5a907364e03db448a7" data-cf-component-type="text">{/*cf-review:field-8e1e20ac0f924c5a907364e03db448a7*/"Set the time and spending limits before inviting participants or buying tools. Record a comparable baseline for the current enquiry process, including customer effort and the owner's checking and correction work. MLAI's workflow-selection guide recommends observing the existing process and separating setup from recurring effort. If you have no comparable baseline, write \u201cnot measured\u201d and collect it before claiming an improvement."}</span></p>
          <div data-cf-component-id={"image:pilot-scorecard"} data-cf-component-type={"image"} data-cf-component-label={"Image: Draft a capped pilot before committing money"} data-cf-source-section-id={"pilot-scorecard"}>
          <ArticleImageBlock
            src={/*cf-review:field-20178e00482d418b89288fd5b3c1f6cb*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-c6b7f3fb-9788-4f29-a48e-abcc6923e50f.jpg?alt=media&token=7b45fca0-5aaa-4a50-a9e4-af09591b7405"}
            alt={/*cf-review:field-cfd16ad6f1dc44b58288f84c101127d6*/"Close-up of two people looking down at a notebook, with a hand holding a pen in the foreground."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-413fc18402654e56b13082815fde80c9" data-cf-component-type="text">{/*cf-review:field-413fc18402654e56b13082815fde80c9*/"Fill in the pilot scorecard"}</span></h3>
          <p><span data-cf-component-id="field-892349cbbedd42869aa24587505fc7b4" data-cf-component-type="text">{/*cf-review:field-892349cbbedd42869aa24587505fc7b4*/"Copy this scorecard and fill in the plan before running the rehearsal. The tasks and decision rules below are a planning exercise for the hypothetical garden-tidy example, not a validated assessment method. Set your own thresholds against the baseline and the limits your business can afford."}</span></p>
          <p><span data-cf-component-id="field-d996ef4b80fc4d04b1a7c6fa16e738a5" data-cf-component-type="text">{/*cf-review:field-d996ef4b80fc4d04b1a7c6fa16e738a5*/"Current workflow and comparison: Current workflow [ ]; comparable task or scenario [ ]; observation period or rehearsal count [ ]."}</span></p>
          <p><span data-cf-component-id="field-e824e1a769284adb92f8ec54f06541f0" data-cf-component-type="text">{/*cf-review:field-e824e1a769284adb92f8ec54f06541f0*/"Baseline measures: Customer completion time [ ]; owner review and correction time [ ]; complete and accurate requests [ ] out of [ ]. Record \u201cnot measured\u201d wherever evidence is missing."}</span></p>
          <p><span data-cf-component-id="field-b5a5a07276bc44969e31a9a9cddabb81" data-cf-component-type="text">{/*cf-review:field-b5a5a07276bc44969e31a9a9cddabb81*/"Scope and dates: Shortlisted use case [ ]; start date [ ]; review date [ ]; participant count [ ]; task count [ ]."}</span></p>
          <p><span data-cf-component-id="field-ae57d39ce0ad43ad8ee53319260b0c5d" data-cf-component-type="text">{/*cf-review:field-ae57d39ce0ad43ad8ee53319260b0c5d*/"Time and spending caps: Total setup, testing and revision cap [ ] hours; cash spending cap A$[ ]."}</span></p>
          <p><span data-cf-component-id="field-8868f83fe35d428898586ece4a391e5b" data-cf-component-type="text">{/*cf-review:field-8868f83fe35d428898586ece4a391e5b*/"Responsibility and data boundary: Named human reviewer with authority to stop [ ]; permitted tools [ ]; permitted synthetic inputs [ ]. Do not enter personal or confidential information into unapproved tools."}</span></p>
          <p><span data-cf-component-id="field-512bb98225c14bf3b5a66cea3d86ae37" data-cf-component-type="text">{/*cf-review:field-512bb98225c14bf3b5a66cea3d86ae37*/"Proposed feedback tasks: Enter the supplied fictional garden-tidy request without coaching; change a detail on review; recover from a missing-field error; explain what the final screen means. Record any behaviour that must be simulated manually."}</span></p>
          <p><span data-cf-component-id="field-4b3b85e9176c4a5b8c778daa66fbb690" data-cf-component-type="text">{/*cf-review:field-4b3b85e9176c4a5b8c778daa66fbb690*/"Feedback record: Task completed [ ]; assistance needed [ ]; misunderstandings [ ]; suggested changes [ ]."}</span></p>
          <p><span data-cf-component-id="field-7b04ee29997a4165ade274a93ebbbfb2" data-cf-component-type="text">{/*cf-review:field-7b04ee29997a4165ade274a93ebbbfb2*/"Time measures: Customer time per comparable task [ ]; owner review and correction time [ ]; combined handling time [ ]. Keep setup and revision time [ ] hours separate."}</span></p>
          <p><span data-cf-component-id="field-db5bc86ba2bf4d84b876de099bc12cf6" data-cf-component-type="text">{/*cf-review:field-db5bc86ba2bf4d84b876de099bc12cf6*/"Quality measures: Correct and complete tasks [ ] out of [ ]; critical errors [ ]; unresolved issues [ ]."}</span></p>
          <p><span data-cf-component-id="field-6e771221d38149b2b86404d7990cafda" data-cf-component-type="text">{/*cf-review:field-6e771221d38149b2b86404d7990cafda*/"Actual spending: Tool expenses A$[ ]; participant expenses A$[ ]; other rehearsal expenses A$[ ]; total A$[ ]."}</span></p>
          <p><span data-cf-component-id="field-d2ad80a7b7864d2d8b8d391fc905035d" data-cf-component-type="text">{/*cf-review:field-d2ad80a7b7864d2d8b8d391fc905035d*/"Continue threshold: For this hypothetical rehearsal, proceed only to a bounded design or feasibility test if time meets [target against baseline], quality meets [required successful tasks out of total], unresolved critical errors equal zero, and both caps are respected."}</span></p>
          <p><span data-cf-component-id="field-01a77f85f5ea43e1a4d3f7c16af01cba" data-cf-component-type="text">{/*cf-review:field-01a77f85f5ea43e1a4d3f7c16af01cba*/"Revise threshold: Retest a fixable time or quality miss only if the proposed correction [ ] and retest fit within the remaining time and spending caps."}</span></p>
          <p><span data-cf-component-id="field-08c024210dd04db3afc884ec59990bce" data-cf-component-type="text">{/*cf-review:field-08c024210dd04db3afc884ec59990bce*/"Stop or pause threshold: Stop or pause if a privacy or safety concern arises, a cap would be exceeded, or the agreed revision still fails the thresholds."}</span></p>
          <p><span data-cf-component-id="field-75ab7e6c479043dab04ea0ef78ad192c" data-cf-component-type="text">{/*cf-review:field-75ab7e6c479043dab04ea0ef78ad192c*/"During the rehearsal, record what participants do and where they need help, rather than relying on whether they like the screens. If the owner manually rehearses receiving and assessing a request, label that handling as simulated. Do not count a simulated integration as working. Keep the customer's effort, the owner's effort and preparation time visible so that a quicker screen journey does not hide extra review work."}</span></p>
          <p><span data-cf-component-id="field-e7f4cc599a7e4a30bf7f513ad149864c" data-cf-component-type="text">{/*cf-review:field-e7f4cc599a7e4a30bf7f513ad149864c*/"No results or benchmark thresholds are supplied here. Rehearsal timings do not establish production savings, future operating costs or customer demand, and positive usability feedback does not authorise deployment."}</span></p>
        </div>
        <div id="shortlist-and-peer-questions" data-cf-component-id={"section:shortlist-and-peer-questions"} data-cf-component-type={"section"} data-cf-component-label={"Shortlist one use case and prepare your peer questions"} data-cf-source-section-id={"shortlist-and-peer-questions"}>
          <h2><span data-cf-component-id="field-1e41ae7f42c04e7ea9d8d5f11b4443f6" data-cf-component-type="text">{/*cf-review:field-1e41ae7f42c04e7ea9d8d5f11b4443f6*/"Shortlist one use case and prepare your peer questions"}</span></h2>
          <p><span data-cf-component-id="field-c9c03f796c564503b4deb32f114bee7f" data-cf-component-type="text">{/*cf-review:field-c9c03f796c564503b4deb32f114bee7f*/"Write down your shortlisted use case as a hypothesis. For the hypothetical garden-maintenance business: \u201cExplore whether a three-screen quote-request flow helps prospective garden-tidy customers supply reviewable job details, with a person assessing every request.\u201d This remains an idea to test, not evidence of customer demand."}</span></p>
          <p><span data-cf-component-id="field-98a4ae1532254986b40302db0a551e8b" data-cf-component-type="text">{/*cf-review:field-98a4ae1532254986b40302db0a551e8b*/"Gather your prototype or preview, issue log and unrun pilot scorecard so a peer can see what you propose to test. Include an unresolved limitation, such as simulated rather than functioning field validation, and name the decision the rehearsal should inform: whether to continue to a bounded feasibility test, revise the design or stop. Peer experience can help identify gaps, but it does not replace intended-customer feedback, measured results or appropriate implementation review."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-9481dca510ea433b9b6e3487dc70ef0b" data-cf-component-type="text">{/*cf-review:field-9481dca510ea433b9b6e3487dc70ef0b*/"What would have to work beyond these screens before this flow could be used for real requests?"}</span></li>
            <li><span data-cf-component-id="field-eea273ab1be54d83848ce191bf1b122d" data-cf-component-type="text">{/*cf-review:field-eea273ab1be54d83848ce191bf1b122d*/"Which editing, validation, mobile, sharing or export limitations should I check in my current tools?"}</span></li>
            <li><span data-cf-component-id="field-480f58d6440541a0b791e3d0547ee0a5" data-cf-component-type="text">{/*cf-review:field-480f58d6440541a0b791e3d0547ee0a5*/"Are my baseline, task count, review-time accounting and continue, revise or stop thresholds useful for this small rehearsal?"}</span></li>
          </ul>
        </div>
        <div id="optional-events" data-cf-component-id={"section:optional-events"} data-cf-component-type={"section"} data-cf-component-label={"Optional next step for a peer conversation"} data-cf-source-section-id={"optional-events"}>
          <h2><span data-cf-component-id="field-b874d2ad558e4bfcac2da7bd951affcc" data-cf-component-type="text">{/*cf-review:field-b874d2ad558e4bfcac2da7bd951affcc*/"Optional next step for a peer conversation"}</span></h2>
          <p><span data-cf-component-id="field-ee390030ceab4bf4a4309885d5636f40" data-cf-component-type="text">{/*cf-review:field-ee390030ceab4bf4a4309885d5636f40*/"Explore MLAI events if you\u2019d like a peer conversation about your shortlisted use case and questions. Event availability, format and cost vary, so check the current listing and the organiser\u2019s details before deciding whether to attend."}</span></p>
          <p><span data-cf-component-id="field-2d2d2b9df1f447fa8610d305e8e0350c" data-cf-component-type="text">{/*cf-review:field-2d2d2b9df1f447fa8610d305e8e0350c*/"Attendance does not guarantee individual implementation advice. You can continue your bounded planning and feedback work without attending."}</span></p>
          <div data-cf-component-id={"image:optional-events"} data-cf-component-type={"image"} data-cf-component-label={"Image: Optional next step for a peer conversation"} data-cf-source-section-id={"optional-events"}>
          <ArticleImageBlock
            src={/*cf-review:field-e7a2e045e0fe497db826e4e476001597*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-72dc8a1a-2afe-4bee-b749-c7b13ca78102.jpg?alt=media&token=a39c4ef8-3e3d-43b4-baab-40267c58eada"}
            alt={/*cf-review:field-c721732da83d414facf35235f9d73ee4*/"Four people sit around a low table as one gestures. A mug, bottle and plant sit on the table, with more people and a whiteboard behind."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free worksheet"
            title={"AI Prototype and Capped Pilot Planning Worksheet"}
            description="A fill-in worksheet to scope one AI-assisted prototype, log its limitations and set guardrails for a synthetic-data usability rehearsal."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fuse-an-artificial-intelligence-design-assistant-to-prototype-worksheet-92b54e70.pdf?alt=media&token=ea87b6ad-a6c6-47f1-ae02-b24d1149cece"
            accent="purple"
            previewCards={[
              {
                title: "Prototype issue log",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Pilot guardrails",
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
            {id: 3, href: "https://mlai.au/articles/featured/how-to-get-started-with-ai-2026", title: "Getting started with AI: choose one business workflow | MLAI", publisher: "mlai.au", category: "guide"},
            {id: 4, href: "https://uizard.io/design-assistant/", title: "Uizard's AI-powered Design Assistant | Uizard", publisher: "uizard.io", category: "guide"},
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
