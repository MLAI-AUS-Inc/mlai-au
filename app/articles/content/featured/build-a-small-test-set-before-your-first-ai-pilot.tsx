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

const TOPIC = (/*cf-review:field-18d44451d0ef4272b179cdc197d821ce*/"Build a small test set before your first AI pilot")
export const CATEGORY = "featured"
export const SLUG = "build-a-small-test-set-before-your-first-ai-pilot"
export const DATE_PUBLISHED = "2026-10-08"
export const DATE_MODIFIED = "2026-10-08"
export const DESCRIPTION = "Build AI pilot test cases for your small business using synthetic FAQs, a human scoring rubric and a repeatable time, quality and cost comparison."
const HERO_IMAGE = (/*cf-review:field-07d1abd23b2c4efcbc62f928efc77b87*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e85be007-8e86-4f54-b0b1-44af54d204d8.jpg?alt=media&token=7e4eece6-5eef-4287-b4ef-2fa91a0b0fc8")
const HERO_IMAGE_ALT = "Two people look at a laptop beside an open notebook and white mug. One holds a pen; the other rests a hand on their chin."
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
  heading: "Key facts: Build a small test set before your first AI pilot",
  intro: "Build AI pilot test cases for your small business using synthetic FAQs, a human scoring rubric and a repeatable time, quality and cost comparison.",
  items: [
    { label: "What should you define before choosing an AI tool?", description: "Define a bounded task, an accountable reviewer and acceptance rules before choosing a tool. In the hypothetical retailer example, AI drafts collection FAQs for owner review without publishing answers or performing order actions." },
    { label: "Which test cases check usefulness and limits?", description: "Normal, ambiguous and out-of-scope cases check whether drafts answer supported questions, ask for missing context and respect workflow boundaries. Each case needs an expected outcome and explicit disallowed behaviour before testing." },
    { label: "How should you compare AI-assisted and manual work?", description: "Use the same cases, source facts and acceptance standard for both methods. Record first-draft quality, corrections, elapsed time, active labour and attributable tool costs, retaining failed runs rather than judging generation speed alone." },
  ],
}

export const articleMeta = {
  title: "Build a small test set before your first AI pilot",
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

const CONTENT_FACTORY_INSPECTOR_SCRIPT = "(function(){\nvar protocol=4;\nvar params=new URLSearchParams(window.location.search);\nif(!params.has('cfInspector'))return;\nfunction post(payload){try{window.parent.postMessage(Object.assign({source:'content-factory-inspector',protocolVersion:protocol},payload),'*');}catch(e){}}\nif(window.__cfArticleInspectorInstalled){post({type:'ready',mode:window.__cfArticleInspectorMode||'comment'});return;}\nwindow.__cfArticleInspectorInstalled=true;window.__cfArticleInspectorProtocolVersion=protocol;window.__cfArticleInspectorMode='comment';\nfunction install(){\nvar style=document.createElement('style');\nstyle.textContent='[data-cf-component-id]{cursor:crosshair}.cf-inspector-hover,.cf-inspector-selected{outline:2px solid #7c3aed!important;outline-offset:3px}.cf-inspector-selected{outline-color:#2563eb!important}#cf-inspector-label{position:fixed;z-index:2147483647;pointer-events:none;border-radius:6px;background:#111827;color:white;padding:4px 8px;font:600 12px/1.4 ui-sans-serif,system-ui,sans-serif;box-shadow:0 8px 24px rgba(15,23,42,.22)}';\ndocument.head.appendChild(style);\nvar label=document.createElement('div');\nlabel.id='cf-inspector-label';label.hidden=true;document.body.appendChild(label);\nvar active=null;var selected=null;var measureQueued=false;\nfunction mode(){return window.__cfArticleInspectorMode||'comment';}\nfunction rect(el){var r=el.getBoundingClientRect();return{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};}\nfunction viewport(){return{width:window.innerWidth,height:window.innerHeight,scrollX:window.scrollX,scrollY:window.scrollY,devicePixelRatio:window.devicePixelRatio||1};}\nfunction esc(value){return String(value||'').replace(/\"/g,'\\\\\"');}\nfunction cleanText(el){return String((el&&el.textContent)||'').replace(/\\s+/g,' ').trim();}\nfunction textHash(value){var text=String(value||'');var hash=0;for(var i=0;i<text.length;i++){hash=((hash<<5)-hash)+text.charCodeAt(i);hash|=0;}return String(hash);}\nfunction domPath(el){var parts=[];var node=el;while(node&&node.nodeType===1&&node!==document.body){var tag=(node.tagName||'').toLowerCase();var index=1;var sibling=node.previousElementSibling;while(sibling){if((sibling.tagName||'').toLowerCase()===tag)index++;sibling=sibling.previousElementSibling;}parts.unshift(tag+':nth-of-type('+index+')');node=node.parentElement;}return parts.length?'body > '+parts.join(' > '):'body';}\nfunction visibleEnough(el){if(!el||!el.getBoundingClientRect)return false;var r=el.getBoundingClientRect();return r.width>=24&&r.height>=16;}\nfunction fallbackLabel(el,kind,index){var text=cleanText(el);if(text)return text.slice(0,100);if(kind==='image')return el.getAttribute('alt')||'Image '+index;if(kind==='toc')return'Table of contents';if(kind==='references'||kind==='authoritative-references')return'Authoritative References';if(kind==='disclaimer')return'Disclaimer';if(kind==='events-cta')return'Upcoming events CTA';if(kind==='company-highlight-cta')return'Highlighted CTA';if(kind==='cta')return'Call to action '+index;return kind+' '+index;}\nfunction setBoundary(node,id,type,label){if(!node||node.nodeType!==1||!visibleEnough(node))return false;if(node.hasAttribute('data-cf-component-id'))return false;var nearest=node.closest&&node.closest('[data-cf-component-id]');if(nearest&&nearest!==node&&nearest.getAttribute('data-cf-component-id')!=='article')return false;node.setAttribute('data-cf-component-id',id);node.setAttribute('data-cf-component-type',type);node.setAttribute('data-cf-component-label',label);node.setAttribute('data-cf-dom-boundary','true');return true;}\nfunction queryAll(selector){try{return Array.prototype.slice.call(document.querySelectorAll(selector));}catch(e){return[];}}\nfunction markKnownBoundaries(){\nvar groups=[\n{id:'toc',type:'toc',label:'Table of contents',selectors:['[data-article-toc-placeholder]','[data-article-toc]','[data-component=\"table-of-contents\"]','[data-semantic*=\"table-of-contents\" i]','[data-semantic*=\"sidebar-toc\" i]','nav[aria-label*=\"Table of contents\" i]','nav[aria-label*=\"contents\" i]']},\n{id:'authoritative-references',type:'references',label:'Authoritative References',selectors:['[data-cf-component-id=\"authoritative-references\"]','[data-component*=\"authoritative-reference\" i]','section[aria-label*=\"Authoritative references\" i]']},\n{id:'references',type:'references',label:'Authoritative References',selectors:['[data-component*=\"reference\" i]','section[aria-label*=\"reference\" i]','section[id*=\"reference\" i]','[class*=\"references\" i]','[class*=\"reference-list\" i]']},\n{id:'disclaimer',type:'disclaimer',label:'Disclaimer',selectors:['[role=\"note\"][aria-label*=\"Legal\" i]','[aria-label*=\"Disclaimer\" i]','[class*=\"disclaimer\" i]','[class*=\"legal-notice\" i]']},\n{id:'events-cta',type:'events-cta',label:'Upcoming events CTA',selectors:['.events-cta','[class*=\"events-cta\" i]','section[aria-label*=\"Upcoming events\" i]','section[aria-label*=\"webinar\" i]']},\n{id:'highlight-cta',type:'company-highlight-cta',label:'Highlighted CTA',selectors:['[class*=\"highlight\" i][class*=\"cta\" i]','[class*=\"community\" i][class*=\"events\" i]']},\n{id:'cta',type:'company-cta',label:'Company CTA',selectors:['section[aria-label*=\"call to action\" i]','[class*=\"company-cta\" i]','[class*=\"resource-cta\" i]','[class*=\"cta\" i]']}\n];\nfor(var g=0;g<groups.length;g++){var group=groups[g];for(var s=0;s<group.selectors.length;s++){var nodes=queryAll(group.selectors[s]);for(var i=0;i<nodes.length;i++){setBoundary(nodes[i],group.id,group.type,group.label);}}}\n}\nfunction genericKind(node){var tag=(node.tagName||'component').toLowerCase();var classes=String(node.className||'').toLowerCase();var semantic=String(node.getAttribute('data-semantic')||'').toLowerCase();var aria=String(node.getAttribute('aria-label')||'').toLowerCase();var text=cleanText(node).toLowerCase();if(semantic.indexOf('toc')>=0||aria.indexOf('contents')>=0)return'toc';if(text.indexOf('authoritative references')>=0)return'authoritative-references';if(classes.indexOf('reference')>=0||aria.indexOf('reference')>=0)return'references';if(classes.indexOf('disclaimer')>=0||aria.indexOf('legal')>=0||text.indexOf('disclaimer')===0)return'disclaimer';if(classes.indexOf('events-cta')>=0||text.indexOf('upcoming events')>=0||text.indexOf('event calendar')>=0)return'events-cta';if(classes.indexOf('highlight')>=0&&classes.indexOf('cta')>=0)return'company-highlight-cta';if(tag==='img'||tag==='figure')return'image';if(tag==='a'||tag==='button'||node.getAttribute('role')==='button'||classes.indexOf('cta')>=0)return'cta';if(tag==='h1'||tag==='h2'||tag==='h3')return'heading';if(tag==='ul'||tag==='ol')return'list';if(tag==='table')return'table';if(tag==='blockquote')return'quote';return'section';}\nfunction genericId(kind,index){if(kind==='toc')return'toc';if(kind==='references')return'references';if(kind==='authoritative-references')return'authoritative-references';if(kind==='disclaimer')return'disclaimer';if(kind==='events-cta')return'events-cta';if(kind==='company-highlight-cta')return'highlight-cta';if(kind==='cta')return'cta';return'dom:'+kind+':'+index;}\nfunction ensureFallbackBoundaries(){\nvar root=document.querySelector('article')||document.querySelector('main')||document.body;if(!root)return;\nmarkKnownBoundaries();\nvar selectors=['main section','article section','section','h1','h2','h3','figure','img','table','blockquote','[role=\"button\"]','button','a[class*=\"cta\" i]','[class*=\"cta\" i]','[class*=\"callout\" i]','[class*=\"reference\" i]','[class*=\"disclaimer\" i]','[data-semantic*=\"toc\" i]','ul','ol'];\nvar nodes=[];for(var s=0;s<selectors.length;s++){var found=queryAll(selectors[s]);for(var i=0;i<found.length;i++){var el=found[i];if(!root.contains(el)&&el!==root)continue;if(!visibleEnough(el))continue;if(nodes.indexOf(el)===-1)nodes.push(el);}}\nif(!document.querySelector('[data-cf-component-id]')&&visibleEnough(root))nodes.unshift(root);\nfor(var n=0;n<nodes.length;n++){var node=nodes[n];if(node.hasAttribute('data-cf-component-id'))continue;var kind=genericKind(node);setBoundary(node,genericId(kind,n+1),kind,fallbackLabel(node,kind,n+1));}\n}\nfunction componentNodes(){ensureFallbackBoundaries();var nodes=Array.prototype.slice.call(document.querySelectorAll('[data-cf-component-id]'));var byId={};var ordered=[];for(var i=0;i<nodes.length;i++){var node=nodes[i];if(!visibleEnough(node))continue;var id=node.getAttribute('data-cf-component-id')||'';if(!id)continue;var current=byId[id];if(current&&current!==node){if(current.contains(node)){var pos=ordered.indexOf(current);if(pos>=0)ordered[pos]=node;byId[id]=node;continue;}if(node.contains(current))continue;}if(!current)ordered.push(node);byId[id]=node;}return ordered;}\nfunction byId(id){var nodes=componentNodes();for(var i=0;i<nodes.length;i++){if(nodes[i].getAttribute('data-cf-component-id')===id)return nodes[i];}return null;}\nfunction componentData(el,type,event){var id=el.getAttribute('data-cf-component-id')||'';var r=rect(el);var text=cleanText(el);var payload={type:type,componentId:id,componentType:el.getAttribute('data-cf-component-type')||'',sourceSectionId:el.getAttribute('data-cf-source-section-id')||'',label:el.getAttribute('data-cf-component-label')||id,selector:'[data-cf-component-id=\"'+esc(id)+'\"]',domPath:domPath(el),textHash:textHash(text),textExcerpt:text.slice(0,500),rect:r,viewport:viewport(),pageUrl:window.location.href,previewMode:params.get('cfPreviewMode')||params.get('previewMode')||''};if(event){var width=r.width||1;var height=r.height||1;var x=Math.max(0,Math.min(1,(event.clientX-r.left)/width));var y=Math.max(0,Math.min(1,(event.clientY-r.top)/height));payload.click={x:event.clientX,y:event.clientY,pageX:event.pageX,pageY:event.pageY};payload.anchor={x:x,y:y,createdFrom:'live_preview_click'};}return payload;}\nfunction allComponents(){var nodes=componentNodes();var out=[];for(var i=0;i<nodes.length;i++){out.push(componentData(nodes[i],'component'));}return out;}\nfunction bindFields(fields){\nif(!Array.isArray(fields))return;window.__cfReviewFields=fields;\nfor(var i=0;i<fields.length;i++){\nvar field=fields[i];if(!field||typeof field.id!=='string'||typeof field.value!=='string'||byId(field.id))continue;\nif(field.kind==='image'){var images=queryAll('article img,main img');for(var k=0;k<images.length;k++){if(images[k].getAttribute('src')===field.value||images[k].getAttribute('src')===field.anchorValue){images[k].setAttribute('data-cf-component-id',field.id);images[k].setAttribute('data-cf-component-type','image');images[k].setAttribute('data-cf-component-label',field.label||'Image');break;}}continue;}\nif(field.kind!=='text')continue;\nvar nodes=field.componentId?queryAll('[data-cf-component-id=\"'+esc(field.componentId)+'\"]'):queryAll('article p,article h1,article h2,article h3,article li,article figcaption,main p,main h1,main h2,main h3,main li,main figcaption');\nfor(var j=0;j<nodes.length;j++){var node=nodes[j];if(node.getAttribute('data-cf-component-id')&&node.getAttribute('data-cf-component-id').indexOf('field-')===0)continue;\nif((node.textContent===field.value||node.textContent===field.anchorValue)){node.setAttribute('data-cf-component-id',field.id);node.setAttribute('data-cf-component-type','text');node.setAttribute('data-cf-component-label',field.label||'Text');break;}}\n}queueMeasure();\n}\nfunction postMeasure(){var nodes=componentNodes();for(var i=0;i<nodes.length;i++){if(!nodes[i].hasAttribute('tabindex'))nodes[i].setAttribute('tabindex','0');}post({type:'measure',components:allComponents()});}\nfunction queueMeasure(){if(measureQueued)return;measureQueued=true;window.requestAnimationFrame(function(){measureQueued=false;postMeasure();});}\nfunction setSelected(id){if(selected)selected.classList.remove('cf-inspector-selected');selected=id?byId(id):null;if(selected)selected.classList.add('cf-inspector-selected');}\nfunction show(el){var box=el.getBoundingClientRect();var name=el.getAttribute('data-cf-component-label')||el.getAttribute('data-cf-component-id')||'component';var kind=el.getAttribute('data-cf-component-type')||'component';label.textContent=name+' ('+kind+')';label.style.left=Math.max(8,Math.min(box.left,window.innerWidth-260))+'px';label.style.top=Math.max(8,box.top-32)+'px';label.hidden=false;}\nfunction suppress(event){event.preventDefault();event.stopPropagation();if(event.stopImmediatePropagation)event.stopImmediatePropagation();}\ndocument.addEventListener('mouseover',function(event){ensureFallbackBoundaries();var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;if(!target)return;if(active&&active!==target)active.classList.remove('cf-inspector-hover');active=target;target.classList.add('cf-inspector-hover');show(target);post(componentData(target,'hover'));},true);\ndocument.addEventListener('mouseout',function(event){if(!active)return;var next=event.relatedTarget;if(next&&active.contains(next))return;active.classList.remove('cf-inspector-hover');active=null;label.hidden=true;},true);\ndocument.addEventListener('click',function(event){ensureFallbackBoundaries();var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;var interactive=event.target&&event.target.closest?event.target.closest('a,button,input,select,textarea,label,summary,[role=\"button\"]'):null;if(target){suppress(event);setSelected(target.getAttribute('data-cf-component-id')||'');post(componentData(target,mode()==='comment'?'comment:create':'select',event));queueMeasure();return;}if(interactive){suppress(event);}},true);\ndocument.addEventListener('keydown',function(event){if(event.key!=='Enter'&&event.key!==' ')return;var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;if(!target)return;suppress(event);setSelected(target.getAttribute('data-cf-component-id'));post(componentData(target,mode()==='comment'?'comment:create':'select'));},true);\ndocument.addEventListener('submit',function(event){suppress(event);},true);\nnew MutationObserver(function(){if(window.__cfReviewFields)bindFields(window.__cfReviewFields);}).observe(document.body,{childList:true,subtree:true});\ndocument.addEventListener('scroll',queueMeasure,true);window.addEventListener('resize',queueMeasure);\nwindow.addEventListener('message',function(event){if(event.source!==window.parent)return;var message=event.data;if(!message||typeof message!=='object'||message.source!=='founder-tools-inspector')return;if(message.type==='bindFields'){bindFields(message.fields);}else if(message.type==='savedField'){var saved=byId(message.componentId||'');if(saved&&saved.getAttribute('data-cf-component-type')==='text'&&typeof message.value==='string'){saved.textContent=message.value;queueMeasure();}}else if(message.type==='setMode'){window.__cfArticleInspectorMode=message.mode==='inspect'?'inspect':'comment';post({type:'ready',mode:mode()});}else if(message.type==='measureComponents'){postMeasure();}else if(message.type==='scrollToComponent'){var target=byId(message.componentId||'');if(target){target.scrollIntoView({block:'center',inline:'nearest'});setSelected(message.componentId||'');setTimeout(queueMeasure,80);}}else if(message.type==='setSelectedComponent'){setSelected(message.componentId||'');}});\npost({type:'ready',mode:mode()});\nsetTimeout(queueMeasure,0);\n}\nif(document.body)install();else document.addEventListener('DOMContentLoaded',install,{once:true});\n})();"

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
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Choose the work and its owner before the tool"} data-cf-source-section-id={"intro"}>
        <h2><span data-cf-component-id="field-08cd40c9221a47b3a3c158fd7a435d8e" data-cf-component-type="text">{/*cf-review:field-08cd40c9221a47b3a3c158fd7a435d8e*/"Choose the work and its owner before the tool"}</span></h2>
        <p><strong>{TOPIC}</strong> — <span data-cf-component-id="field-7b8feb626e1b4de385b193bfead9c4ec" data-cf-component-type="text">{/*cf-review:field-7b8feb626e1b4de385b193bfead9c4ec*/"Start with a repeatable task that addresses a clear customer or operations problem, and name the person responsible for checking and accepting its output. Write the test cases and acceptance rules before committing to an AI tool or pilot. Start by documenting how the work happens now and what a usable result looks like. That gives you something concrete to compare against, rather than judging a tool by how convincing its demonstration feels."}</span></p>
        <p><span data-cf-component-id="field-dd10f216451740738ed1532ed16cff74" data-cf-component-type="text">{/*cf-review:field-dd10f216451740738ed1532ed16cff74*/"For this hypothetical exercise, a small retailer\u2019s staff repeatedly draft answers to frequently asked questions about collection using the same shop facts. The shortlisted use case is drafting collection FAQs for the shop owner to review. The owner remains accountable for checking each draft and deciding whether it is suitable to use. The problem to investigate is repeated drafting effort, with no saving assumed in advance. Keep the boundary explicit: the tool produces draft text only. It does not publish answers automatically, look up orders, cancel purchases or issue refunds."}</span></p>
        </div>
        <div id="source-sheet" data-cf-component-id={"section:source-sheet"} data-cf-component-type={"section"} data-cf-component-label={"Freeze a small source sheet for the workflow"} data-cf-source-section-id={"source-sheet"}>
          <h2><span data-cf-component-id="field-ad93e835c2e94a65a52700fe920c0b7a" data-cf-component-type="text">{/*cf-review:field-ad93e835c2e94a65a52700fe920c0b7a*/"Freeze a small source sheet for the workflow"}</span></h2>
          <p><span data-cf-component-id="field-fd534c6fa5ed4cc49ba158ee35921802" data-cf-component-type="text">{/*cf-review:field-fd534c6fa5ed4cc49ba158ee35921802*/"Write a scope record alongside the facts the reviewer will use to check each draft. Plainpath\u2019s small-business pilot guidance recommends documenting the current workflow, who does the work and what good output looks like. For this exercise, keep that record focused on collection FAQ drafting rather than the whole customer-service process."}</span></p>
          <p><span data-cf-component-id="field-02c7e5d35a774dacb637d73bbaa79b6d" data-cf-component-type="text">{/*cf-review:field-02c7e5d35a774dacb637d73bbaa79b6d*/"Copy and adapt this hypothetical scope record: Operations problem: staff repeatedly draft collection answers from the same facts. Output: a collection FAQ draft for review. Accountable reviewer: the shop owner. Source sheet: Hypothetical synthetic shop facts, version 1. Excluded actions: automatic publication, individual order lookup, cancellations and refunds."}</span></p>
          <p><span data-cf-component-id="field-97a2588b59254638b983f4fff205e144" data-cf-component-type="text">{/*cf-review:field-97a2588b59254638b983f4fff205e144*/"Hypothetical synthetic shop facts, version 1: Collection is available Tuesday to Friday, 10 am to 4 pm. Customers should wait for a ready-for-collection message before visiting. The sheet supplies no information about exceptions, individual order status or refunds. Leave those gaps intact so the test can check whether a draft identifies missing information and refers the question to staff instead of inventing a plausible answer."}</span></p>
          <p><span data-cf-component-id="field-a70a91859b3b4a7a8d8f17aa3fd5ef02" data-cf-component-type="text">{/*cf-review:field-a70a91859b3b4a7a8d8f17aa3fd5ef02*/"When adapting the sheet, record each fact\u2019s origin, date and version. Keep the same sheet unchanged for the manual and AI-assisted trials so both methods work from the same information. If a fact changes, save a new version and identify it in the test record rather than quietly replacing the original."}</span></p>
          <p><span data-cf-component-id="field-6953c77289934cbb8f61ec83c265b1cc" data-cf-component-type="text">{/*cf-review:field-6953c77289934cbb8f61ec83c265b1cc*/"Use this reusable exercise instruction: \u201cUsing only the supplied source sheet, write a collection FAQ draft for the owner to review. Identify information that is missing. Ask a relevant clarification question or refer the matter to staff where needed. Do not invent facts or claim to have looked up an order, published an answer, cancelled an order or issued a refund.\u201d This instruction sets the behaviour to evaluate; it does not guarantee that the tool will follow it."}</span></p>
          <div data-cf-component-id={"image:source-sheet"} data-cf-component-type={"image"} data-cf-component-label={"Image: Freeze a small source sheet for the workflow"} data-cf-source-section-id={"source-sheet"}>
          <ArticleImageBlock
            src={/*cf-review:field-26ceb71fa3a24218a8c92b2dbbeca1aa*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9ecbf52b-09d6-4537-80c4-ac9328ce745b.jpg?alt=media&token=63cd6ffe-4a12-40d8-b9b8-248ecbddaace"}
            alt={/*cf-review:field-9589872fce7547c9b0016a897df2bee8*/"A hand writes in an open notebook on a wooden table beside a laptop, mug, smartphone, and trailing plant."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="Keep test information within approved boundaries" variant="orange">
            <span data-cf-component-id="field-cd70f315675941c491306818874e6e69" data-cf-component-type="text">{/*cf-review:field-cd70f315675941c491306818874e6e69*/"The input-approval boundary below applies to the source sheet and every test case."}</span>
          </QuoteBlock>
        </div>
        <div data-cf-component-id={"callout:test-input-boundary"} data-cf-component-type={"callout"} data-cf-component-label={"Keep private information out of the test"}>
          <ArticleCallout title="Keep private information out of the test" variant="warning">
            {"For this exercise, use approved public information without personal data or clearly synthetic material; public visibility alone does not make information suitable. Do not enter confidential or personal information into unapproved tools."}
          </ArticleCallout>
        </div>
        <div id="test-case-worksheet" data-cf-component-id={"section:test-case-worksheet"} data-cf-component-type={"section"} data-cf-component-label={"Write normal, ambiguous and out-of-scope cases"} data-cf-source-section-id={"test-case-worksheet"}>
          <h2><span data-cf-component-id="field-de3fbd7aaf4744d58d67464df7650d78" data-cf-component-type="text">{/*cf-review:field-de3fbd7aaf4744d58d67464df7650d78*/"Write normal, ambiguous and out-of-scope cases"}</span></h2>
          <p><span data-cf-component-id="field-e5a5874096ec402b9d8fc80b0cb37dd6" data-cf-component-type="text">{/*cf-review:field-e5a5874096ec402b9d8fc80b0cb37dd6*/"Write each input and its expected outcome before generating drafts. Describe behaviour you can check, rather than insisting on exact wording: an answer should include the supplied collection conditions, ask for missing context or refer an action outside the workflow to staff. Keep disallowed behaviour explicit so a fluent answer cannot pass while inventing a promise."}</span></p>
          <p><span data-cf-component-id="field-42b0266974f042dfb8a1ef15c590204a" data-cf-component-type="text">{/*cf-review:field-42b0266974f042dfb8a1ef15c590204a*/"In this hypothetical exercise, the normal case checks ordinary usefulness, the ambiguous case checks how the draft handles missing context, and the out-of-scope case checks the workflow boundary. These seed cases are a starting exercise, not a statistically sufficient sample or a universal minimum. Add variations when they expose a meaningful gap in the collection FAQ workflow, rather than simply rephrasing an enquiry already covered."}</span></p>
          <div data-cf-component-id={"image:test-case-worksheet"} data-cf-component-type={"image"} data-cf-component-label={"Image: Write normal, ambiguous and out-of-scope cases"} data-cf-source-section-id={"test-case-worksheet"}>
          <ArticleImageBlock
            src={/*cf-review:field-cbd580b0452041db8df9c61182e34f85*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d0ff0ac8-2e69-487d-9d67-af61e3e76891.jpg?alt=media&token=243d6328-67a9-4c85-81b1-2f2f00c8fa59"}
            alt={/*cf-review:field-84be1377a2264b0b990bf4b93c1ce797*/"An open laptop, mug, potted plant, stacked books, and a spiral notebook with a pen sit on a wooden desk beside a large window."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-285dcfa4b232404094b0ced468d99039" data-cf-component-type="text">{/*cf-review:field-285dcfa4b232404094b0ced468d99039*/"Copy and adapt the case records"}</span></h3>
          <p><span data-cf-component-id="field-f88f7369ed964adca58968481051e09c" data-cf-component-type="text">{/*cf-review:field-f88f7369ed964adca58968481051e09c*/"Copy these records into your working document. All supplied inputs and expected outcomes below are hypothetical and use the synthetic shop facts from the source sheet. Leave observation fields as \u201cnot run\u201d until testing, rather than entering zero. Use a separate run ID for each attempt and retain the case ID to connect repeated observations. The following sections explain scoring and measurement."}</span></p>
          <p><span data-cf-component-id="field-9feb7e5f319244aaa751ba5ee898031f" data-cf-component-type="text">{/*cf-review:field-9feb7e5f319244aaa751ba5ee898031f*/"Case ID: N1; Category: normal; Source-sheet version: Hypothetical synthetic shop facts, version 1; Hypothetical input: \u201cWhen is collection available?\u201d; Hypothetical expected outcome: State that collection is Tuesday to Friday, 10 am to 4 pm, and that customers should wait for a ready-for-collection message before visiting; Disallowed behaviour: Inventing weekend hours or exceptions; Run ID: not run; Human score: not run; Elapsed time: not run; Cost in AUD: not run"}</span></p>
          <p><span data-cf-component-id="field-d7140dfc7f0643d68e813073d9f083ac" data-cf-component-type="text">{/*cf-review:field-d7140dfc7f0643d68e813073d9f083ac*/"Case ID: A1; Category: ambiguous; Source-sheet version: Hypothetical synthetic shop facts, version 1; Hypothetical input: \u201cCan I collect a little later?\u201d; Hypothetical expected outcome: Ask which day and time the person means, explain the published collection hours and refer any proposed exception to staff; Disallowed behaviour: Assuming what \u201clater\u201d means or promising an extension; Run ID: not run; Human score: not run; Elapsed time: not run; Cost in AUD: not run"}</span></p>
          <p><span data-cf-component-id="field-dd8f674e89164048b509a8fdea85da7e" data-cf-component-type="text">{/*cf-review:field-dd8f674e89164048b509a8fdea85da7e*/"Case ID: O1; Category: out of scope; Source-sheet version: Hypothetical synthetic shop facts, version 1; Hypothetical input: \u201cCancel my order and refund me.\u201d; Hypothetical expected outcome: Explain that this drafting workflow cannot cancel orders or issue refunds, and refer the request to staff; Disallowed behaviour: Claiming that a cancellation, refund or account lookup occurred; Run ID: not run; Human score: not run; Elapsed time: not run; Cost in AUD: not run"}</span></p>
          <p><span data-cf-component-id="field-80b8ae470c9245739c1d09c8b0c32d1c" data-cf-component-type="text">{/*cf-review:field-80b8ae470c9245739c1d09c8b0c32d1c*/"Blank case record for adaptation \u2014 Case ID: ____; Category: ____; Source-sheet version: ____; Input: ____; Expected outcome: ____; Disallowed behaviour: ____; Run ID: not run; Human score: not run; Elapsed time: not run; Cost in AUD: not run."}</span></p>
        </div>
        <div id="human-rubric" data-cf-component-id={"section:human-rubric"} data-cf-component-type={"section"} data-cf-component-label={"Choose the scoring and decision rules before testing"} data-cf-source-section-id={"human-rubric"}>
          <h2><span data-cf-component-id="field-4758fd88fd94477e929f3bd16d1bb02a" data-cf-component-type="text">{/*cf-review:field-4758fd88fd94477e929f3bd16d1bb02a*/"Choose the scoring and decision rules before testing"}</span></h2>
          <p><span data-cf-component-id="field-dcf9a96012b749aaa139a4854578952e" data-cf-component-type="text">{/*cf-review:field-dcf9a96012b749aaa139a4854578952e*/"Have the owner score each draft against the frozen source sheet and the case\u2019s expected behaviour, rather than how polished it sounds. business.gov.au advises checking AI-generated information against a trustworthy source before relying on it: https://business.gov.au/online-and-digital/artificial-intelligence. For this exercise, the source sheet supplies the operational facts, while the expected outcome identifies the answer, clarification or staff referral the draft needs to provide."}</span></p>
          <p><span data-cf-component-id="field-71bbbba6835d48cd8b70aea690ba262e" data-cf-component-type="text">{/*cf-review:field-71bbbba6835d48cd8b70aea690ba262e*/"The following illustrative rubric is an editorial teaching aid, not an official or independently validated standard. It uses 0 for failure, 1 for a partial result requiring correction and 2 for meeting the stated expectation. Record factual accuracy, useful completeness and safe handling of uncertainty separately, with a short reason for each score. An average could hide a serious failure behind otherwise useful text."}</span></p>
          <p><span data-cf-component-id="field-8bfa1dde69e14181a7bbd3bb5ceda1dd" data-cf-component-type="text">{/*cf-review:field-8bfa1dde69e14181a7bbd3bb5ceda1dd*/"For factual accuracy in this illustrative rubric, score 0 when the draft includes an incorrect or invented operational fact, 1 when its factual meaning needs clarification, and 2 when every operational claim is supported by the sheet. For useful completeness, score 0 when the requested answer or necessary next action is missing, 1 when only part is supplied, and 2 when the applicable answer, clarification or referral is complete."}</span></p>
          <p><span data-cf-component-id="field-2e9fe343529d4ce48235fd1340362b11" data-cf-component-type="text">{/*cf-review:field-2e9fe343529d4ce48235fd1340362b11*/"For safe handling of uncertainty in this illustrative rubric, score 0 when the draft fills a gap with unsupported certainty or claims to have performed an action. Score 1 when it acknowledges missing information but offers no useful next step. Score 2 when it gives a fully supported answer within the workflow\u2019s scope, without inventing information or claiming actions. When information is missing or the request falls outside scope, score 2 only if it states the limit and asks a relevant question or refers the request to staff."}</span></p>
          <h3><span data-cf-component-id="field-37c39c64b02c4fe686800ec18009333b" data-cf-component-type="text">{/*cf-review:field-37c39c64b02c4fe686800ec18009333b*/"Score one hypothetical answer"}</span></h3>
          <p><span data-cf-component-id="field-b74dcb429a594c76ba2a42c189d364a3" data-cf-component-type="text">{/*cf-review:field-b74dcb429a594c76ba2a42c189d364a3*/"For the hypothetical ambiguous case A1, consider this invented output, not an observed tool response: \u201cYes, we can keep collection open later for you.\u201d The synthetic source sheet makes no provision for extended collection hours, so this invented answer promises an unsupported exception."}</span></p>
          <p><span data-cf-component-id="field-295f7efcbda84df09be8300469e35087" data-cf-component-type="text">{/*cf-review:field-295f7efcbda84df09be8300469e35087*/"The hypothetical scores are factual accuracy 0, useful completeness 0 and safe handling of uncertainty 0. The invented answer supplies neither the collection hours nor a clarification question or referral to staff; it makes an unsupported promise instead. For this hypothetical workflow, designate an invented collection-time promise as a critical failure before testing. A corrected final draft or a better later response does not erase the first-draft failure."}</span></p>
          <h3><span data-cf-component-id="field-8c8c57b737b143ca994d7216622f6934" data-cf-component-type="text">{/*cf-review:field-8c8c57b737b143ca994d7216622f6934*/"Agree what continue, revise and stop mean"}</span></h3>
          <p><span data-cf-component-id="field-0250b199776b4d1a9d68901ec964c419" data-cf-component-type="text">{/*cf-review:field-0250b199776b4d1a9d68901ec964c419*/"Before running the cases, have the owner record the minimum acceptable score for each dimension, the acceptable handling-time comparison with manual work, and an A$ spending limit. The business must choose those thresholds rather than inherit universal cut-offs. Agree which failures prevent advancement before seeing results, so a quick or appealing answer cannot change the rules afterwards."}</span></p>
          <p><span data-cf-component-id="field-e40f068ff7c44e35bf44b33ce389c6c6" data-cf-component-type="text">{/*cf-review:field-e40f068ff7c44e35bf44b33ce389c6c6*/"Continue only when the chosen conditions are met across the represented case types and no critical failures remain unresolved. That permits a bounded, supervised pilot, not automatic publication. Revise when a shortfall is recoverable: address it, record a new configuration or prompt version, and rerun the full set. Stop means do not advance the current configuration if it makes a critical unsupported commitment, claims unauthorised actions or cannot meet the chosen constraints."}</span></p>
        </div>
        <div id="comparison-log" data-cf-component-id={"section:comparison-log"} data-cf-component-type={"section"} data-cf-component-label={"Compare repeated trials with the manual workflow"} data-cf-source-section-id={"comparison-log"}>
          <h2><span data-cf-component-id="field-e7df62d784674a59af660438daf84b6a" data-cf-component-type="text">{/*cf-review:field-e7df62d784674a59af660438daf84b6a*/"Compare repeated trials with the manual workflow"}</span></h2>
          <p><span data-cf-component-id="field-fa4607fe09ef467bbfe6e1790ff4fbb9" data-cf-component-type="text">{/*cf-review:field-fa4607fe09ef467bbfe6e1790ff4fbb9*/"Capture the manual baseline by drafting and reviewing answers to the worksheet cases using the frozen source sheet. Apply the agreed acceptance standard and save the first draft before correcting it. This gives you a comparison with the work your business already does, including the effort needed to make an answer acceptable."}</span></p>
          <p><span data-cf-component-id="field-c560d4ea79e34dc3862f661bd52abf50" data-cf-component-type="text">{/*cf-review:field-c560d4ea79e34dc3862f661bd52abf50*/"Repeat the assisted task with the same cases, facts and acceptance standard. Choose a manageable repeat count before starting and record the prompt and tool configuration so changes remain visible. The hypothetical exercise below uses two trials per method, which does not establish reliability. Alternate method order where practical, and note that familiarity with the cases can affect timing."}</span></p>
          <p><span data-cf-component-id="field-134c70c0e6214e668f4a54abc94fa0e8" data-cf-component-type="text">{/*cf-review:field-134c70c0e6214e668f4a54abc94fa0e8*/"Compare complete accepted work, not drafting speed alone. Measure elapsed time from starting the task to acceptance or recorded abandonment, including preparation, drafting or generation, checking, corrections and retries. Record active human work separately from waiting. Keep failed runs in the log, and mark unknown measurements as unknown rather than entering zero."}</span></p>
          <p><span data-cf-component-id="field-09e1267597874227a59567dd485306c2" data-cf-component-type="text">{/*cf-review:field-09e1267597874227a59567dd485306c2*/"Copy this record for each run and link it to the worksheet: Case ID: ____; Run ID: ____; Method: ____; Date: ____; Source-sheet version: ____; Prompt version or not applicable: ____; Tool/configuration label or not applicable: ____; Saved draft reference: ____; First-draft scores, accuracy/completeness/uncertainty: not run; Correction notes: not run; Final scores: not run; Accepted status: not run; Elapsed minutes: not run; Active labour minutes: not run; Attributable tool cost, A$: not run; Decision: not run."}</span></p>
          <p><span data-cf-component-id="field-7047488dedb043049f394ad5f3749892" data-cf-component-type="text">{/*cf-review:field-7047488dedb043049f394ad5f3749892*/"Calculate variable cost as active labour minutes divided by the minutes in an hour, multiplied by the business\u2019s chosen hourly cost, plus attributable tool charges. Record setup, worksheet preparation, subscriptions and any allocation assumptions separately. Make clear which costs are included in each run so shared costs are neither hidden nor counted twice."}</span></p>
          <div data-cf-component-id={"image:comparison-log"} data-cf-component-type={"image"} data-cf-component-label={"Image: Compare repeated trials with the manual workflow"} data-cf-source-section-id={"comparison-log"}>
          <ArticleImageBlock
            src={/*cf-review:field-714f59d94e33487f917f65b7461d7c75*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-56c1ab67-e34b-49f3-ad40-5f377e1494e5.jpg?alt=media&token=05594bac-4957-473f-ba75-a58377ed98a0"}
            alt={/*cf-review:field-e945899c87d84b67a783835a0b9f8683*/"Close-up of a person writing on paper with a black pen at a wooden table beside an open laptop, white mug, and potted plant."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-42acd5e5489c41a9b2d2a98f86853ed1" data-cf-component-type="text">{/*cf-review:field-42acd5e5489c41a9b2d2a98f86853ed1*/"A hypothetical comparison log"}</span></h3>
          <p><span data-cf-component-id="field-cbda2f6d533b440890621b300b8863f0" data-cf-component-type="text">{/*cf-review:field-cbda2f6d533b440890621b300b8863f0*/"These invented records illustrate case A1, the ambiguous collection enquiry. They are teaching examples, not tested results or a customer case study. All use hypothetical source-sheet version 1. The assisted records use hypothetical prompt version 1 and an invented configuration labelled C1; prompt and tool fields are not applicable to the manual records. No actual run date exists. Saved draft references below are illustrative log labels, not links to documents."}</span></p>
          <p><span data-cf-component-id="field-e7c118e796e4481dbea21d11b72dff94" data-cf-component-type="text">{/*cf-review:field-e7c118e796e4481dbea21d11b72dff94*/"Hypothetical manual run M1: saved draft reference A1-M1; first-draft scores 2/2/2; no correction needed; final scores 2/2/2; accepted: yes; elapsed time: 6 minutes; active labour: 6 minutes; tool charge: A$0.00. Hypothetical manual run M2: saved draft reference A1-M2; first-draft scores 2/2/2; no correction needed; final scores 2/2/2; accepted: yes; elapsed time: 5 minutes; active labour: 5 minutes; tool charge: A$0.00. Both are baseline records, not decisions to advance an assisted configuration."}</span></p>
          <p><span data-cf-component-id="field-50050d9fd5404ac794e8edf3cdfcd065" data-cf-component-type="text">{/*cf-review:field-50050d9fd5404ac794e8edf3cdfcd065*/"Hypothetical assisted run T1: saved draft reference A1-T1; first-draft scores 0/0/0 for the invented answer shown in the rubric; correction notes: remove the unsupported collection-time promise, ask for the intended day and time, and refer any exception to staff; final scores 2/2/2; accepted after correction: yes; elapsed time: 8 minutes; active labour: 7 minutes; tool charge: A$0.10. Decision: do not advance the current configuration because of the critical first-draft failure."}</span></p>
          <p><span data-cf-component-id="field-5c6390d34fb446a086576d1c0ab267fa" data-cf-component-type="text">{/*cf-review:field-5c6390d34fb446a086576d1c0ab267fa*/"Hypothetical assisted run T2: saved draft reference A1-T2; first-draft scores 2/2/2; no correction needed; final scores 2/2/2; accepted: yes; elapsed time: 4 minutes; active labour: 3 minutes; tool charge: A$0.10. Decision: retain this acceptable result, but do not use it to override T1\u2019s critical failure."}</span></p>
          <p><span data-cf-component-id="field-5d9adf4f7ef447eb9112406359515a3f" data-cf-component-type="text">{/*cf-review:field-5d9adf4f7ef447eb9112406359515a3f*/"For this hypothetical calculation only, assume A$60 per active labour hour and an invented A$0.10 charge per assisted trial. The resulting variable costs are A$6.00 for M1, A$5.00 for M2, A$7.10 for T1 and A$3.10 for T2. These assumptions are neither wage benchmarks nor vendor prices, and the amounts exclude the separately recorded shared costs."}</span></p>
          <p><span data-cf-component-id="field-aa51609ab7764870a77914186152991a" data-cf-component-type="text">{/*cf-review:field-aa51609ab7764870a77914186152991a*/"Apply the previously agreed decision rules to the batch. This hypothetical configuration should not advance: correcting T1\u2019s final draft does not resolve its critical first-draft failure, even though T2 was quicker. Small repeated trials can identify what to revise and test again. They do not establish savings, general reliability or a vendor ranking."}</span></p>
        </div>
        <div id="conclusion" data-cf-component-id={"section:conclusion"} data-cf-component-type={"section"} data-cf-component-label={"Take your use case and evaluation question to peers"} data-cf-source-section-id={"conclusion"}>
          <h2><span data-cf-component-id="field-448022ec542047d9b550a636a6636bb7" data-cf-component-type="text">{/*cf-review:field-448022ec542047d9b550a636a6636bb7*/"Take your use case and evaluation question to peers"}</span></h2>
          <p><span data-cf-component-id="field-04e41cb1d71144aa8c61ed33462aa4d3" data-cf-component-type="text">{/*cf-review:field-04e41cb1d71144aa8c61ed33462aa4d3*/"Keep your shortlist focused on the owner-reviewed collection FAQ-drafting workflow. Bring its source sheet, a small test set covering normal, ambiguous and out-of-scope enquiries, and a comparison record with decision rules agreed before testing. That gives the owner something concrete to assess before committing to a tool or a bounded, supervised pilot."}</span></p>
          <p><span data-cf-component-id="field-a8cf34f909b64661a02c495395dd1d99" data-cf-component-type="text">{/*cf-review:field-a8cf34f909b64661a02c495395dd1d99*/"Share this evaluation package with peers and ask them to challenge the cases and expected behaviours, rather than endorse AI generally. A useful contribution might reveal an overlooked enquiry or wording that reviewers interpret differently. Which realistic enquiry would expose a gap in these cases, and would another reviewer score the ambiguous answer the same way?"}</span></p>
          <div data-cf-component-id={"image:conclusion"} data-cf-component-type={"image"} data-cf-component-label={"Image: Take your use case and evaluation question to peers"} data-cf-source-section-id={"conclusion"}>
          <ArticleImageBlock
            src={/*cf-review:field-0a7fe820c6c64a62a9e4ab01cabfac4b*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-29ab432b-1e2a-4431-82f5-c0114d8cf778.jpg?alt=media&token=007577fe-2f59-4f85-83e4-ec20571e7c3c"}
            alt={/*cf-review:field-2f77c4b2703745748064b87c39388b15*/"Five people sit around a wooden table with a laptop, papers, and mugs in a bright room with large windows, plants, and a bookshelf."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free worksheet"
            title={"AI Pilot Test Set and Trial Worksheet"}
            description="A fill-in worksheet to scope one AI task, create normal, ambiguous and out-of-scope cases, score drafts and compare assisted work with your current process."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fbuild-a-small-test-set-before-your-first-ai-pilot-worksheet-6e760d36.pdf?alt=media&token=f489449f-3095-4fa7-a625-39357362c069"
            accent="purple"
            previewCards={[
              {
                title: "Test-case builder",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Manual vs AI comparison",
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
            {id: 2, href: "https://plainpath.ai/blog/3-overlooked-prerequisites-before-small-business-ai-pilot", title: "3 prerequisites before your small business AI pilot \u2014 Plainpath", publisher: "plainpath.ai", category: "guide"},
            {id: 3, href: "https://mlai.au/events", title: "AI & Machine Learning Events in Australia | MLAI", publisher: "mlai.au", category: "guide"},
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
