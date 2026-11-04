
const CF_REVIEW_ab92bab9a79640b5bf37575424a467b7 = (/*cf-review:field-ab92bab9a79640b5bf37575424a467b7*/"Your first pilot needs a checkable task");
const CF_REVIEW_4f48d3cb88074601883f26bc3c313c41 = (/*cf-review:field-4f48d3cb88074601883f26bc3c313c41*/"A useful baseline covers the whole task");
const CF_REVIEW_7eaa6face3ea4a95b21358ea6dc4b6db = (/*cf-review:field-7eaa6face3ea4a95b21358ea6dc4b6db*/"Copy and adapt your AI agent handover checklist");
const CF_REVIEW_67fbf0c4b39d4ce2966c53ee8f67d114 = (/*cf-review:field-67fbf0c4b39d4ce2966c53ee8f67d114*/"Test the handover before connecting live work");
const CF_REVIEW_bc44050ed8784c41bccaa7ec4c7c59d0 = (/*cf-review:field-bc44050ed8784c41bccaa7ec4c7c59d0*/"Review effort can erase the saving");
const CF_REVIEW_88302cdb8bbd4e0d9ed7d9cbde85d42c = (/*cf-review:field-88302cdb8bbd4e0d9ed7d9cbde85d42c*/"Take one draft and three questions to your peers");
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

const TOPIC = (/*cf-review:field-3fb5f575221847de89413ac93c302a3b*/"An AI agent handover checklist for your small business")
export const CATEGORY = "featured"
export const SLUG = "an-ai-agent-handover-checklist-for-your-small-business"
export const DATE_PUBLISHED = "2026-11-04"
export const DATE_MODIFIED = "2026-11-04"
export const DESCRIPTION = "Choose one workflow, define your AI agent's limits and human takeover rules, and set pilot measures before buying tools or expanding access."
const HERO_IMAGE = (/*cf-review:field-fac389c2274c434c8062decb73bac094*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-350b1da7-e652-4443-92fd-f6783f3e35ea.jpg?alt=media&token=47781a67-6fb5-4727-9eb3-1b780017aeed")
const HERO_IMAGE_ALT = "Two people look at a document beside a laptop, one holding a pen and the other wearing glasses with a hand near their mouth."
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
  { id: 1, question: "Can the business owner also review the agent's work?", answer: "Yes. You can hold both ownership and review responsibilities in a small team, but record each explicitly. Name who checks outputs and who decides whether the pilot should continue." },
  { id: 2, question: "What happens if nobody is available to take over?", answer: "The work stays paused if neither the named reviewer nor the backup is available. Your handover record should identify both recipients and state who can authorise a restart." },
  { id: 3, question: "Does passing synthetic tests justify access to customer records?", answer: "No. Synthetic tests check only the behaviours you tested; they don't establish live customer performance or justify broader data access. A later live pilot needs the relevant approvals and a comparable real baseline." },
  { id: 4, question: "What if review time removes the saving?", answer: "If checking and rework erase the saving, revise the task or return to a simpler process, such as a saved reply or fixed rule. Count preparation, review, corrections and exception handling when comparing effort." },
]

export const summaryHighlights = {
  heading: "Key facts",
  intro: "Choose one workflow, define your AI agent's limits and human takeover rules, and set pilot measures before buying tools or expanding access.",
  items: [
    { label: "Which workflow should you pilot first?", description: "Choose a repeated task with clear inputs, a checkable output and a manual fallback, such as drafting enquiry replies. Record current handling time, corrections, staff effort and spending before choosing tools." },
    { label: "What belongs in an AI agent handover checklist?", description: "Your checklist should name the owner and reviewer, approved data and tools, permitted actions, expected outputs, takeover triggers and manual fallback. Consequential external actions, including customer messages and payments, need explicit human approval." },
    { label: "How should you assess the pilot?", description: "Compare equivalent work using total human handling time, output quality, takeover behaviour and actual tool charges. Apply your agreed continue, revise or stop criteria, keeping setup effort separate from recurring work." },
  ],
}

export const articleMeta = {
  title: "An AI agent handover checklist for your small business",
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
          { href: "#intro", label: (CF_REVIEW_ab92bab9a79640b5bf37575424a467b7) },
          { href: "#workflow-baseline", label: (CF_REVIEW_4f48d3cb88074601883f26bc3c313c41) },
          { href: "#handover-checklist", label: (CF_REVIEW_7eaa6face3ea4a95b21358ea6dc4b6db) },
          { href: "#rehearse-handover", label: (CF_REVIEW_67fbf0c4b39d4ce2966c53ee8f67d114) },
          { href: "#pilot-decision", label: (CF_REVIEW_bc44050ed8784c41bccaa7ec4c7c59d0) },
          { href: "#next-conversation", label: (CF_REVIEW_88302cdb8bbd4e0d9ed7d9cbde85d42c) },
        ]}
      />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <div data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Your first pilot needs a checkable task"} data-cf-source-section-id={"intro"}>
        <h2 id="intro"><span data-cf-component-id="field-ab92bab9a79640b5bf37575424a467b7" data-cf-component-type="text">{CF_REVIEW_ab92bab9a79640b5bf37575424a467b7}</span></h2>
        <p><span data-cf-component-id="field-3686da8b7b1b46e48b7416dcab0c6967" data-cf-component-type="text">{/*cf-review:field-3686da8b7b1b46e48b7416dcab0c6967*/"Our view: choose one routine workflow, record how it works today and agree when a person takes back control before you buy an AI agent. If you run a small Australian business, that gives you a task you can assess against your current process before committing budget or expanding access."}</span></p>
        <p><span data-cf-component-id="field-90d8ce54da6a4b7faf3a2689fd609347" data-cf-component-type="text">{/*cf-review:field-90d8ce54da6a4b7faf3a2689fd609347*/"An AI agent is software that uses information to choose and carry out steps towards a goal, within the tools and permissions you give it. You can delegate a bounded task without authorising unsupervised external actions. For example, an agent could prepare a customer-enquiry draft while you retain control over whether anything gets sent."}</span></p>
        <p><span data-cf-component-id="field-7e0d1da6a24642c798b4c2c06108db82" data-cf-component-type="text">{/*cf-review:field-7e0d1da6a24642c798b4c2c06108db82*/"If most advice you're seeing starts with buying a tool, we disagree: decide what a correct output looks like and who'll review it first. Business.gov.au advises checking AI-generated information against a trustworthy source before relying on it (https://business.gov.au/online-and-digital/artificial-intelligence)."}</span></p>
        <p><span data-cf-component-id="field-3476158c148b40a1b8dd2fcd2bf8ed4f" data-cf-component-type="text">{/*cf-review:field-3476158c148b40a1b8dd2fcd2bf8ed4f*/"We're recommending a starting point for small teams, not a process for unsupervised high-stakes decisions, enterprise governance programmes or personalised legal, medical or financial advice. If your proposed task needs those safeguards, choose a lower-risk task for your first pilot."}</span></p>
        </div>
        <div data-cf-component-id={"section:workflow-baseline"} data-cf-component-type={"section"} data-cf-component-label={"A useful baseline covers the whole task"} data-cf-source-section-id={"workflow-baseline"}>
          <h2 id="workflow-baseline"><span data-cf-component-id="field-4f48d3cb88074601883f26bc3c313c41" data-cf-component-type="text">{CF_REVIEW_4f48d3cb88074601883f26bc3c313c41}</span></h2>
          <p><span data-cf-component-id="field-f954811f48324f4e8587df7d2f6f216a" data-cf-component-type="text">{/*cf-review:field-f954811f48324f4e8587df7d2f6f216a*/"Shortlist work you can check and take back manually. Choose a repeated task with identifiable inputs and a clear output, such as suggesting an enquiry category or preparing a reply for review. Leave autonomous enquiry resolution out of your first pilot. Check whether a fixed rule, saved reply or clearer manual handover would solve the problem before adding an agent."}</span></p>
          <p><span data-cf-component-id="field-a95db4ef4f1c4a9294c3a95260b122b6" data-cf-component-type="text">{/*cf-review:field-a95db4ef4f1c4a9294c3a95260b122b6*/"Record how comparable manual cases work today. Mitori's readiness guide recommends workflow evidence and a measured baseline rather than a headline productivity claim. Note which cases you included, their total handling time, corrections or routing errors, staff effort and relevant spending in Australian dollars. Keep the task boundaries consistent so you can later compare equivalent work. Otherwise, you could compare a quick draft with a fully resolved enquiry and mistake the difference for a saving."}</span></p>
          <p><span data-cf-component-id="field-70d47ba6d1564dafaa1056c4cfbb9658" data-cf-component-type="text">{/*cf-review:field-70d47ba6d1564dafaa1056c4cfbb9658*/"Separate observations from estimates. Keep setup effort apart from recurring handling effort, so you neither omit it nor charge it again for every case. Count preparation, review, corrections and exception handling in recurring time. Existing staff time still counts, even when it doesn't create a new invoice."}</span></p>
          <p><span data-cf-component-id="field-e83d1be276f44f6d940e199fa68d78e2" data-cf-component-type="text">{/*cf-review:field-e83d1be276f44f6d940e199fa68d78e2*/"Write your shortlisted task in a sentence that states its input and expected output, then carry that sentence and your baseline into the handover record below. If you can't explain how a person will check the output, narrow the task before choosing tools."}</span></p>
          <div data-cf-component-id={"image:workflow-baseline"} data-cf-component-type={"image"} data-cf-component-label={"Image: A useful baseline covers the whole task"} data-cf-source-section-id={"workflow-baseline"}>
          <ArticleImageBlock
            src={/*cf-review:field-ca23458e1a444d5d9a21dba0590a5c8b*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-8784d683-9f48-4f81-908d-792f66f1e42d.jpg?alt=media&token=5c48773c-20db-439a-abcc-bc4565b876ff"}
            alt={/*cf-review:field-25091536114a4a7bb2aaf59486607ffd*/"A person writes in an open notebook at a wooden table beside a laptop, smartphone, mug, closed book, and trailing plant."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"callout:protect-test-inputs"} data-cf-component-type={"callout"} data-cf-component-label={"Keep customer details out of unapproved tools"}>
          <QuoteBlock title="Keep customer details out of unapproved tools" variant="orange">
            {"Don't enter confidential or personal information into unapproved AI tools, including customer details copied into a public chat. While tool and data approvals remain unresolved, use wholly synthetic inputs and keep any escalation notes within the data boundaries you've approved."}
          </QuoteBlock>
        </div>
        <div data-cf-component-id={"section:handover-checklist"} data-cf-component-type={"section"} data-cf-component-label={"Copy and adapt your AI agent handover checklist"} data-cf-source-section-id={"handover-checklist"}>
          <h2 id="handover-checklist"><span data-cf-component-id="field-7eaa6face3ea4a95b21358ea6dc4b6db" data-cf-component-type="text">{CF_REVIEW_7eaa6face3ea4a95b21358ea6dc4b6db}</span></h2>
          <p><span data-cf-component-id="field-9695192b71964a049c3e8ea5301c5b7f" data-cf-component-type="text">{/*cf-review:field-9695192b71964a049c3e8ea5301c5b7f*/"Your handover should let another person finish the work without guessing. Use our planning aid below: replace its values, dates and roles with your own, and keep launch blocked wherever approval remains unresolved."}</span></p>
          <p><span data-cf-component-id="field-2081233640e748e18a3699e6845f65ae" data-cf-component-type="text">{/*cf-review:field-2081233640e748e18a3699e6845f65ae*/"Keep ownership and review explicit, even when you hold both roles. Approval to test drafting doesn't authorise sending messages or making payments. Those consequential actions need explicit human approval and remain outside this pilot."}</span></p>
          <div data-cf-style-role="callout" data-cf-scenario="true">
            <QuoteBlock title="Hypothetical customer enquiry triage handover" variant="purple">
              <span style={{ display: 'block' }}><strong><span data-cf-component-id="field-de392deeeb52400baf4d1a88391884e3" data-cf-component-type="text">{/*cf-review:field-de392deeeb52400baf4d1a88391884e3*/"Draft only, with human review"}</span></strong></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><span data-cf-component-id="field-f4bf4751f5324a50b1c12cff9c590c72" data-cf-component-type="text">{/*cf-review:field-f4bf4751f5324a50b1c12cff9c590c72*/"Assess legal compliance separately from pilot planning."}</span></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><strong><span data-cf-component-id="field-aee517543ae34a0e842897520bf227ae" data-cf-component-type="text">{/*cf-review:field-aee517543ae34a0e842897520bf227ae*/"Task and baseline"}</span>:</strong> <span data-cf-component-id="field-2ce85c19e0a5435197550e93539da062" data-cf-component-type="text">{/*cf-review:field-2ce85c19e0a5435197550e93539da062*/"The agent categorises enquiries, drafts factual replies and routes exceptions. The goal is to reduce handling effort. The operations lead owns the workflow, checks every output as the accountable reviewer and decides the pilot outcome.\n\nManual baseline: ten comparable cases, 40 minutes, ten correctly routed, AUD 0 incremental tool spending."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-af557f566c994fed9041833481b18e19" data-cf-component-type="text">{/*cf-review:field-af557f566c994fed9041833481b18e19*/"Inputs, permissions and outputs"}</span>:</strong> <span data-cf-component-id="field-ff702d99fc764e918115d3d0e8ca1e61" data-cf-component-type="text">{/*cf-review:field-ff702d99fc764e918115d3d0e8ca1e61*/"Approved data: enquiries and a public FAQ, both synthetic. No tools or accounts have been selected. The exact product, account and data need approval before launch.\n\nThe agent may read the test inputs and FAQ and write only to the test review queue. Live inbox access, sending, payments and live-record edits are prohibited. The business owner approves and carries out external actions manually.\n\nInput T01: 'When do you close Tuesday?' FAQ F01: Tuesday closes 5 pm. Expected output: category Opening hours; reference F01; unsent draft 'We close at 5 pm on Tuesday.'"}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-a6746054e9854b56b604e85e77c6131c" data-cf-component-type="text">{/*cf-review:field-a6746054e9854b56b604e85e77c6131c*/"Human takeover and manual fallback"}</span>:</strong> <span data-cf-component-id="field-e06c5eae663b418b8589d7197bd997bf" data-cf-component-type="text">{/*cf-review:field-e06c5eae663b418b8589d7197bd997bf*/"Uncertainty, missing facts, complaints, sensitive data and requests outside scope trigger a handover. Complaint variation: 'I'm unhappy with your service' goes to the operations lead, with the business owner as backup. If neither is available, work stays paused.\n\nSend the permitted input reference, facts used, proposed output, escalation reason, actions attempted or completed, and approval state.\n\nThe operations lead has authority to pause: stop new runs, cancel pending work, preserve the permitted activity record and return unfinished cases to the manual queue. Check completed actions before manual processing to avoid duplication. Only the operations lead can authorise a restart, after review."}</span></span>
              <span style={{ display: 'block', marginTop: '0.25rem' }}><strong><span data-cf-component-id="field-8fe34185304d4d78a696ff98b68c20b7" data-cf-component-type="text">{/*cf-review:field-8fe34185304d4d78a696ff98b68c20b7*/"Pilot review and decision"}</span>:</strong> <span data-cf-component-id="field-88490ed0bbe046caa614f4da182c213b" data-cf-component-type="text">{/*cf-review:field-88490ed0bbe046caa614f4da182c213b*/"Use the same ten cases. Start: 9 November 2026. End and review: 13 November 2026.\n\nTargets: below 40 minutes of recurring human handling time; all permission boundaries respected; all required takeovers delivered; no incorrect factual output accepted; spending at most AUD 10.\n\nContinue in the same scope if all criteria are met. Revise a correctable workflow issue. Stop for an unauthorised action, failed takeover or unresolved data approval."}</span></span>
              <span style={{ display: 'block', marginTop: '0.75rem' }}><span data-cf-component-id="field-00d0a319310c42f9a0387deaffa337ed" data-cf-component-type="text">{/*cf-review:field-00d0a319310c42f9a0387deaffa337ed*/"Any expansion of this scope needs separate approval."}</span></span>
            </QuoteBlock>
          </div>
          <div data-cf-component-id={"image:handover-checklist"} data-cf-component-type={"image"} data-cf-component-label={"Image: Copy and adapt your AI agent handover checklist"} data-cf-source-section-id={"handover-checklist"}>
          <ArticleImageBlock
            src={/*cf-review:field-b94d317e665749119c6e070bf4165bd6*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-1d636d83-afc1-4160-a82a-7f6260c01684.jpg?alt=media&token=79a3457d-4f31-41c0-a99c-7e2deb70e9f9"}
            alt={/*cf-review:field-f3f2cae3f30041dab838aa6f2608224b*/"An open laptop, notebook, pen and black mug sit on a wooden desk beside a window, with books and potted plants nearby."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"section:rehearse-handover"} data-cf-component-type={"section"} data-cf-component-label={"Test the handover before connecting live work"} data-cf-source-section-id={"rehearse-handover"}>
          <h2 id="rehearse-handover"><span data-cf-component-id="field-67fbf0c4b39d4ce2966c53ee8f67d114" data-cf-component-type="text">{CF_REVIEW_67fbf0c4b39d4ce2966c53ee8f67d114}</span></h2>
          <p><span data-cf-component-id="field-b06120c445bb444fa5dfddee3881e1fd" data-cf-component-type="text">{/*cf-review:field-b06120c445bb444fa5dfddee3881e1fd*/"Rehearse the handover while the agent is disconnected from live work, so you can find gaps without affecting customers. Test routine work and each takeover trigger you've recorded using the approved test inputs. Check whether the named recipient gets enough permitted context to finish the task. Make the primary reviewer unavailable to test the backup route, then check that work stays paused when neither person is available."}</span></p>
          <p><span data-cf-component-id="field-602dd43716d3494daef7e0e80c91d7b3" data-cf-component-type="text">{/*cf-review:field-602dd43716d3494daef7e0e80c91d7b3*/"Test permissions separately from the agent's answers. AgentShelf's governance checklist explicitly distinguishes the operating record from controls in connected systems. For your draft-only pilot, verify that prohibited actions are unavailable, even when an input requests them. Don't treat the agent's claim that it's confident, or its promise to seek approval, as proof. If you can't verify those restrictions, keep the exercise disconnected. Any future design that permits external actions needs a separately verified approval control before you enable them."}</span></p>
          <p><span data-cf-component-id="field-08680e5fd94a406ab0b02b93956c65d8" data-cf-component-type="text">{/*cf-review:field-08680e5fd94a406ab0b02b93956c65d8*/"Rehearse the pause and manual return with whoever will operate the pilot. Check that they can stop new runs, identify queued work and account for partially completed cases. A pause button nobody can find is mostly decoration. Pausing doesn't undo an action that has already happened, so inspect the action record before returning unfinished cases to the manual process. Confirm who will finish each case to avoid duplicate work."}</span></p>
        </div>
        <div data-cf-component-id={"section:pilot-decision"} data-cf-component-type={"section"} data-cf-component-label={"Review effort can erase the saving"} data-cf-source-section-id={"pilot-decision"}>
          <h2 id="pilot-decision"><span data-cf-component-id="field-bc44050ed8784c41bccaa7ec4c7c59d0" data-cf-component-type="text">{CF_REVIEW_bc44050ed8784c41bccaa7ec4c7c59d0}</span></h2>
          <p><span data-cf-component-id="field-afba9d332c4142a48b31686fb96c60a3" data-cf-component-type="text">{/*cf-review:field-afba9d332c4142a48b31686fb96c60a3*/"Judge the pilot by the work you finish after checking. Compare it with your baseline using equivalent cases and the same task boundaries."}</span></p>
          <p><span data-cf-component-id="field-d180a65297b041129de04e793be028be" data-cf-component-type="text">{/*cf-review:field-d180a65297b041129de04e793be028be*/"Quality includes knowing when to hand back control. Check the output against the agreed correct outcome, then check whether the agent escalated the cases that required a person. Keep actual tool charges in AUD separate from staff effort. Time released for other work doesn't automatically reduce your cash spending."}</span></p>
          <p><span data-cf-component-id="field-a5eb4f480d0f4698a1732990f6279061" data-cf-component-type="text">{/*cf-review:field-a5eb4f480d0f4698a1732990f6279061*/"Use the decision criteria you wrote before the pilot. Continue within the existing permissions only when the evidence meets those criteria. Revise a specific, correctable problem and test it again; stop if a permission boundary fails or the task isn't worth the checking it requires. If review and rework erase the apparent saving, we think returning to a saved reply, fixed rule or manual process is a useful decision."}</span></p>
          <p><span data-cf-component-id="field-62a8444ce9ca40a481fe0e22f297fc87" data-cf-component-type="text">{/*cf-review:field-62a8444ce9ca40a481fe0e22f297fc87*/"A synthetic rehearsal checks the behaviours you tested; it doesn't establish performance with live customers or justify broader data access. Any later live pilot needs the relevant approvals and a comparable real baseline. Record your decision, the evidence behind it and any issue that must be resolved before another run. If you can't explain why continuing is justified, keep the agent paused."}</span></p>
          <div data-cf-component-id={"image:pilot-decision"} data-cf-component-type={"image"} data-cf-component-label={"Image: Review effort can erase the saving"} data-cf-source-section-id={"pilot-decision"}>
          <ArticleImageBlock
            src={/*cf-review:field-83ba0069b107426392b3c5dd6900265e*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-74f04197-dff0-4da4-8e6d-1934b31c8671.jpg?alt=media&token=f0fdfb0d-c686-4de3-9310-55722d889944"}
            alt={/*cf-review:field-8e74c737f1b74a39868920b7eb3487fb*/"Close-up of a person with a hand against their mouth, looking toward a screen beside papers, a pen, and a black mug."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"section:next-conversation"} data-cf-component-type={"section"} data-cf-component-label={"Take one draft and three questions to your peers"} data-cf-source-section-id={"next-conversation"}>
          <h2 id="next-conversation"><span data-cf-component-id="field-88302cdb8bbd4e0d9ed7d9cbde85d42c" data-cf-component-type="text">{CF_REVIEW_88302cdb8bbd4e0d9ed7d9cbde85d42c}</span></h2>
          <p><span data-cf-component-id="field-3cf7ea20135744b1b22a809f82a0c8d1" data-cf-component-type="text">{/*cf-review:field-3cf7ea20135744b1b22a809f82a0c8d1*/"We think you'll get more useful peer feedback from a bounded draft than a general question about which AI tool to buy. Before you share it, name your shortlisted workflow, its owner, unresolved approvals and review date. Leave undecided permissions visibly unresolved. Silence isn't approval."}</span></p>
          <p><span data-cf-component-id="field-33c3552fe2724b4e83d0715219aa29d8" data-cf-component-type="text">{/*cf-review:field-33c3552fe2724b4e83d0715219aa29d8*/"Share only non-confidential descriptions, then ask: \u201cWhich exception would you test first?\u201d, \u201cWhat would the next person need to finish this handover?\u201d and \u201cWhere might review effort erase the saving?\u201d Use the answers to improve your draft, not as permission to deploy. Bring any suggested change back to the person accountable for the pilot before you change its scope."}</span></p>
          <p><span data-cf-component-id="field-7e422af325094658b60595780052ac0d" data-cf-component-type="text">{/*cf-review:field-7e422af325094658b60595780052ac0d*/"Check an event's relevance to your questions on the organiser's page. You don't need to attend an event to run a pilot."}</span></p>
          <div data-cf-component-id={"image:next-conversation"} data-cf-component-type={"image"} data-cf-component-label={"Image: Take one draft and three questions to your peers"} data-cf-source-section-id={"next-conversation"}>
          <ArticleImageBlock
            src={/*cf-review:field-fe181e074332401ba74db209b51bc564*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a6a4ada0-458a-4866-9a4b-463711933126.jpg?alt=media&token=8c619b5f-286a-4f25-9d54-2431a3ed4265"}
            alt={/*cf-review:field-4ec927c1c515488fa6e431f95cd9ce30*/"Four people sit around a wooden table with a laptop, mugs and papers in a bright room with plants, a sofa and a bookshelf."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free checklist"
            title={"AI Agent Pilot Handover Checklist"}
            description="Use this checklist to choose a bounded workflow, document human takeover rules, test controls offline and assess whether review effort outweighs any saving."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fan-ai-agent-handover-checklist-for-your-small-business-checklist-314173b0.pdf?alt=media&token=fbd7b6f8-1191-48d0-a523-1d6d37ff40b4"
            accent="purple"
            previewCards={[
              {
                title: "Takeover rules",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Offline test plan",
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
            {id: 2, href: "https://www.voiceflow.com/blog/ai-agent-builder-security-compliance-enterprise-guide", title: "AI Agent Security and Compliance: A 2026 Enterprise Guide", publisher: "", category: "guide"},
            {id: 3, href: "https://mitori.ai/blog/ai-agent-readiness-checklist", title: "Is Your Business Ready for AI Agents? A Readiness Checklist", publisher: "", category: "guide"},
            {id: 4, href: "https://agentshelf.ai/knowledge/ai-governance/ai-agent-governance-checklist", title: "An AI Agent Governance Checklist for Teams | AgentShelf", publisher: "", category: "guide"},
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
