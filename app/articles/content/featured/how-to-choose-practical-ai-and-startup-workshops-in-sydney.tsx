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

const TOPIC = (/*cf-review:field-9b456c06fd7442e790285f636434a166*/"How to Choose Practical AI and Startup Workshops in Sydney")
export const CATEGORY = "featured"
export const SLUG = "how-to-choose-practical-ai-and-startup-workshops-in-sydney"
export const DATE_PUBLISHED = "2026-10-08"
export const DATE_MODIFIED = "2026-10-08"
export const DESCRIPTION = "Choose a Sydney AI or startup workshop around one business task. Use an event checklist and pilot template to assess fit, cost, data safety and results."
const HERO_IMAGE = (/*cf-review:field-e8f0a20ea5dd440abff44ffbb44018ff*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-23d67bb9-0ceb-477f-bbca-f0c2c29cdb86.jpg?alt=media&token=ea3d6d4c-8641-4480-9ac3-c89f7c78f33f")
const HERO_IMAGE_ALT = "Two people look at a laptop at a wooden table. One points toward it with a pen; the other holds a hand near their chin."
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
  heading: "Key facts: How to Choose Practical AI and Startup Workshops in Sydney",
  intro: "Choose a Sydney AI or startup workshop around one business task. Use an event checklist and pilot template to assess fit, cost, data safety and results.",
  items: [
    { label: "How do you choose a practical Sydney workshop?", description: "Choose a workshop whose participant exercises address a specific business task. Check prerequisites, software, facilitator support, data handling, take-home outputs and the full cost and time commitment before booking." },
    { label: "Should you choose AI practice or startup learning?", description: "Hands-on AI practice suits gaps in drafting instructions and checking outputs. Startup learning suits questions about customer needs, business models or pitching; choose by the advertised exercises rather than the event title." },
    { label: "Can you run an AI pilot without attending a workshop?", description: "You can run a pilot without a workshop when the task, approved inputs and human review are clear. Record the existing process, compare time and quality, and set spending limits and stop conditions." },
  ],
}

export const articleMeta = {
  title: "How to Choose Practical AI and Startup Workshops in Sydney",
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
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Choose a workshop for a task, not an AI promise"} data-cf-source-section-id={"intro"}>
        <h2><span data-cf-component-id="field-795ccf8141da4f27b3b9b9c15fef786b" data-cf-component-type="text">{/*cf-review:field-795ccf8141da4f27b3b9b9c15fef786b*/"Choose a workshop for a task, not an AI promise"}</span></h2>
        <p><strong>{TOPIC}</strong> — <span data-cf-component-id="field-73c439defa0b47e09036d65d1cbb4804" data-cf-component-type="text">{/*cf-review:field-73c439defa0b47e09036d65d1cbb4804*/"Choose a Sydney workshop only when its practical exercises address a specific task in your business, you can meet its prerequisites without stretching your budget, and you can practise with safe inputs. Check the full commitment before booking: preparation, travel, time away from the business and any required software, as well as the ticket price. Start with the problem you want to solve, rather than a tool you feel you should buy. That approach follows business.gov.au\u2019s guidance to identify business problems before choosing an AI solution."}</span></p>
        <p><span data-cf-component-id="field-7902eb5a2a494e23959682c3d65c7699" data-cf-component-type="text">{/*cf-review:field-7902eb5a2a494e23959682c3d65c7699*/"Look for hands-on AI practice if you need help giving a tool instructions and checking its drafts. A startup session may be more relevant if your uncertainty concerns customer needs or a proposed offer. Judge the event by what participants actually do, not its title alone."}</span></p>
        </div>
        <div id="shortlist-workflow" data-cf-component-id={"section:shortlist-workflow"} data-cf-component-type={"section"} data-cf-component-label={"Shortlist one routine workflow before browsing events"} data-cf-source-section-id={"shortlist-workflow"}>
          <h2><span data-cf-component-id="field-cd74b10d413d4543ab92bea4b67df9e9" data-cf-component-type="text">{/*cf-review:field-cd74b10d413d4543ab92bea4b67df9e9*/"Shortlist one routine workflow before browsing events"}</span></h2>
          <p><span data-cf-component-id="field-fd64bf5d44574f5ca3167e72b5fcc9a9" data-cf-component-type="text">{/*cf-review:field-fd64bf5d44574f5ca3167e72b5fcc9a9*/"Choose a recurring task and describe the problem you have actually observed before looking for a workshop. Record what makes the current process difficult, rather than assuming AI will improve it. business.gov.au\u2019s guidance on artificial intelligence identifies writing as a possible use for generative AI and advises checking AI-generated information against trustworthy sources before relying on it. That supports trying an assisted draft, not assuming it will save your business time."}</span></p>
          <p><span data-cf-component-id="field-33f0798371f74a1681346d6ce987e841" data-cf-component-type="text">{/*cf-review:field-33f0798371f74a1681346d6ce987e841*/"For a fictional retail example, an owner wants to test whether AI can help draft short product descriptions from approved public specifications. The required output is a draft for the owner to review against those specifications, with every factual claim checked before publication. Publishing the description, changing prices and adding unsupported product claims remain outside the task\u2019s scope. Any reduction in effort is a hypothesis to test, not an established saving."}</span></p>
          <p><span data-cf-component-id="field-8720b131bb7e4fb282563a98838dde89" data-cf-component-type="text">{/*cf-review:field-8720b131bb7e4fb282563a98838dde89*/"Copy the use-case record below and fill it in for your own workflow. Treat it as a planning worksheet, not a validated assessment. If approved inputs are unavailable or nobody can check the output, resolve that gap before buying tickets or tools. A clear task gives you something concrete to compare with a workshop\u2019s exercises."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-d4488d5b70e84143ae2a6fd98c51afb0" data-cf-component-type="text">{/*cf-review:field-d4488d5b70e84143ae2a6fd98c51afb0*/"Current workflow: [ ]"}</span></li>
            <li><span data-cf-component-id="field-7ba18ccc644148f38b2725fa08340f9b" data-cf-component-type="text">{/*cf-review:field-7ba18ccc644148f38b2725fa08340f9b*/"Observed problem: [ ]"}</span></li>
            <li><span data-cf-component-id="field-819c7009e78d43deae1b3b1a94673371" data-cf-component-type="text">{/*cf-review:field-819c7009e78d43deae1b3b1a94673371*/"Bounded AI-assisted task: [ ]"}</span></li>
            <li><span data-cf-component-id="field-0a20796b0e02497e89f6542aae9ea06f" data-cf-component-type="text">{/*cf-review:field-0a20796b0e02497e89f6542aae9ea06f*/"Available approved inputs: [ ]"}</span></li>
            <li><span data-cf-component-id="field-fd87a6d915e749d08742f13714ea9626" data-cf-component-type="text">{/*cf-review:field-fd87a6d915e749d08742f13714ea9626*/"Required output: [ ]"}</span></li>
            <li><span data-cf-component-id="field-45b54f02f46d456595c166519eda3295" data-cf-component-type="text">{/*cf-review:field-45b54f02f46d456595c166519eda3295*/"Accountable human reviewer: [ ]"}</span></li>
            <li><span data-cf-component-id="field-9feacf0c57a64dfaa44e167b104e8cc4" data-cf-component-type="text">{/*cf-review:field-9feacf0c57a64dfaa44e167b104e8cc4*/"Actions outside scope: [ ]"}</span></li>
          </ul>
          <div data-cf-component-id={"image:shortlist-workflow"} data-cf-component-type={"image"} data-cf-component-label={"Image: Shortlist one routine workflow before browsing events"} data-cf-source-section-id={"shortlist-workflow"}>
          <ArticleImageBlock
            src={/*cf-review:field-36a65dd63f2a45bda3b7220806142060*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-35328d08-033c-4732-b91d-797e1c28fd94.jpg?alt=media&token=daf60b79-c0e2-49eb-b2e8-d565c58f40ba"}
            alt={/*cf-review:field-216e390ad61d4803b74a8c2ec8f04ac1*/"A person writes in a spiral notebook at a wooden table beside a laptop, smartphone, mug, and potted plant."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="choose-format" data-cf-component-id={"section:choose-format"} data-cf-component-type={"section"} data-cf-component-label={"Decide whether you need AI practice, startup learning or neither"} data-cf-source-section-id={"choose-format"}>
          <h2><span data-cf-component-id="field-79fd1683aebf4d718174b37f89bb15c1" data-cf-component-type="text">{/*cf-review:field-79fd1683aebf4d718174b37f89bb15c1*/"Decide whether you need AI practice, startup learning or neither"}</span></h2>
          <p><span data-cf-component-id="field-3a97eacd0b2d4e5d838a5a12c5c5afdd" data-cf-component-type="text">{/*cf-review:field-3a97eacd0b2d4e5d838a5a12c5c5afdd*/"Choose the format that addresses what you still need to learn about your shortlisted workflow. If the gap is how to give an AI tool useful instructions, keep a draft within approved facts and check the result, look for hands-on AI practice. The event page should establish that participants practise drafting and verification themselves, rather than only watch a demonstration."}</span></p>
          <p><span data-cf-component-id="field-dcf532e474c64e75a06993c95d3bcb03" data-cf-component-type="text">{/*cf-review:field-dcf532e474c64e75a06993c95d3bcb03*/"Startup learning may fit a different gap. Consider customer-discovery learning when you need to investigate whether the proposed change addresses a customer problem. Look for business-model content if you are testing a new offer, or pitching practice if you need to explain your hypothesis and ask for feedback. Use these distinctions to assess the advertised exercises, not to assume that a session labelled \u201cstartup workshop\u201d will address your workflow."}</span></p>
          <p><span data-cf-component-id="field-a85ac0d84eb54ec6bf2e6f8becdb3f90" data-cf-component-type="text">{/*cf-review:field-a85ac0d84eb54ec6bf2e6f8becdb3f90*/"In the fictional retail example, pitching practice would not replace learning how to produce and review product-description drafts. Customer-discovery learning would become relevant if the owner needed to investigate what product information customers actually need. A completed workshop exercise or enthusiastic peer response would not establish customer demand or prove that the drafting process saves time."}</span></p>
          <p><span data-cf-component-id="field-1470d574a01f4c2098c9346d0ee20e2e" data-cf-component-type="text">{/*cf-review:field-1470d574a01f4c2098c9346d0ee20e2e*/"Choose neither when the task, approved inputs, accountable reviewer and small test are already clear. You can prepare a baseline and plan an assisted test without attending an event. If a reusable manual template appears to address the problem more simply, test that first."}</span></p>
        </div>
        <div id="event-worksheet" data-cf-component-id={"section:event-worksheet"} data-cf-component-type={"section"} data-cf-component-label={"Use a workshop-selection worksheet before booking"} data-cf-source-section-id={"event-worksheet"}>
          <h2><span data-cf-component-id="field-e6726d914ce04011bb3c8998eea4d0f2" data-cf-component-type="text">{/*cf-review:field-e6726d914ce04011bb3c8998eea4d0f2*/"Use a workshop-selection worksheet before booking"}</span></h2>
          <p><span data-cf-component-id="field-4ac67acdaaca4a18a5d19e03e0279cb9" data-cf-component-type="text">{/*cf-review:field-4ac67acdaaca4a18a5d19e03e0279cb9*/"Assess the event against your chosen workflow, not the breadth of its AI claims. A demonstration alone does not establish that you will practise your task, receive relevant feedback or leave with something you can reuse."}</span></p>
          <p><span data-cf-component-id="field-2736f4ce02454b61a6b41f52332f6676" data-cf-component-type="text">{/*cf-review:field-2736f4ce02454b61a6b41f52332f6676*/"Use the worksheet below as a decision aid, not a validated assessment instrument. Suitability depends on whether the session addresses your learning gap within your skills, data safeguards, time and spending limits."}</span></p>
          <div data-cf-component-id={"image:event-worksheet"} data-cf-component-type={"image"} data-cf-component-label={"Image: Use a workshop-selection worksheet before booking"} data-cf-source-section-id={"event-worksheet"}>
          <ArticleImageBlock
            src={/*cf-review:field-7c5a97812d094982bd8739f64983f28e*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-145fb911-6a22-4f91-9c33-e75fcc33d5aa.jpg?alt=media&token=2fb87fad-c063-4c75-b2e4-788415d1b18f"}
            alt={/*cf-review:field-274766f092bf4112add7a3337f8b916a*/"An open laptop, spiral notebook, pen, and mug sit on a wooden table beside a potted plant, with windows and a bookshelf behind."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-b2d09e5725a0433eb8c0924c9d303d81" data-cf-component-type="text">{/*cf-review:field-b2d09e5725a0433eb8c0924c9d303d81*/"Record what the event page establishes"}</span></h3>
          <p><span data-cf-component-id="field-99b9bdb604244476b6c7e13d33a10a22" data-cf-component-type="text">{/*cf-review:field-99b9bdb604244476b6c7e13d33a10a22*/"Start with this header: chosen workflow [ ]; learning gap [ ]; event title and URL [ ]; date checked [ ]. Complete the groups below using the event page. Where it does not answer a question, record the gap and ask the organiser rather than assuming the requirement is manageable."}</span></p>
          <p><span data-cf-component-id="field-b6c1a3df6a7b4b1e8dc3cffb7c02816b" data-cf-component-type="text">{/*cf-review:field-b6c1a3df6a7b4b1e8dc3cffb7c02816b*/"Practice and output. Establish what participants will actually do and how that exercise relates to your bounded task. Ask what you can take home and reuse, such as draft instructions, a checked sample or a test plan. For the fictional product-description task, look for an opportunity to draft from approved specifications and check claims against them. Event-page evidence [ ]; unresolved gap [ ]; organiser question [ ]."}</span></p>
          <p><span data-cf-component-id="field-f89704ac81964514a9abc0880bd16113" data-cf-component-type="text">{/*cf-review:field-f89704ac81964514a9abc0880bd16113*/"Readiness and support. Check the assumed knowledge, any coding requirements, laptop and software needs, required accounts and whether paid access is necessary. Establish what facilitator assistance and feedback are included, particularly if you are a beginner. Attendance does not establish that individual implementation support is available. Event-page evidence [ ]; unresolved gap [ ]; organiser question [ ]."}</span></p>
          <p><span data-cf-component-id="field-4f15c713c6fc465395c2f595083d192c" data-cf-component-type="text">{/*cf-review:field-4f15c713c6fc465395c2f595083d192c*/"Total commitment and Sydney fit. Confirm the exact venue or online format, date, Sydney-local time and current availability. Include session length, preparation, follow-up, travel and time away from the business. Record ticket prices and required software costs alongside your time commitment so you can compare the whole commitment with your own limits. Total cash cost in A$ [ ]; total time [ ]; event-page evidence [ ]; unresolved gap [ ]; organiser question [ ]."}</span></p>
          <p><span data-cf-component-id="field-d53046c3190d48b8b11abdffaba5b736" data-cf-component-type="text">{/*cf-review:field-d53046c3190d48b8b11abdffaba5b736*/"Data handling. Ask whether exercises can use synthetic examples, meaning invented inputs, or appropriately de-identified examples. Check whether prompts or screens are shared or recorded, and what the organiser and tool provider disclose about access, storage, reuse and deletion. OAIC guidance on commercially available AI products highlights intended-use suitability, human oversight, privacy risks and access to personal information as due-diligence considerations. Do not enter confidential or personal data into unapproved tools. Event-page evidence [ ]; unresolved gap [ ]; organiser question [ ]."}</span></p>
          <h3><span data-cf-component-id="field-41c7a22e5e834197a7fdf6765c661716" data-cf-component-type="text">{/*cf-review:field-41c7a22e5e834197a7fdf6765c661716*/"Attend, ask or skip"}</span></h3>
          <p><span data-cf-component-id="field-e88f2d59159b4867a7ca236198ab1638" data-cf-component-type="text">{/*cf-review:field-e88f2d59159b4867a7ca236198ab1638*/"Consider attending when the practical exercise addresses your learning gap and the prerequisites, support, data arrangements and total commitment fit your plan. If an essential detail is missing, send the relevant worksheet question to the organiser before booking. Their reply can clarify suitability, but it is not evidence that the workshop will improve your business results."}</span></p>
          <p><span data-cf-component-id="field-21d4d49d3a554f48833ac73b382ee779" data-cf-component-type="text">{/*cf-review:field-21d4d49d3a554f48833ac73b382ee779*/"Skip or defer when required skills, unsafe data demands or costs conflict with your plan. Do not use a points score that lets appealing features outweigh a serious blocker."}</span></p>
        </div>
        <div data-cf-component-id={"callout:protect-workshop-inputs"} data-cf-component-type={"callout"} data-cf-component-label={"Bring a safe example, not customer records"}>
          <ArticleCallout title="Bring a safe example, not customer records" variant="warning">
            {"Do not enter confidential or personal data into unapproved tools. Use synthetic examples or appropriately de-identified material for workshop exercises, without assuming that removing names alone makes records safe."}
          </ArticleCallout>
        </div>
        <div id="prepare-questions" data-cf-component-id={"section:prepare-questions"} data-cf-component-type={"section"} data-cf-component-label={"Prepare questions for the organiser and for peers"} data-cf-source-section-id={"prepare-questions"}>
          <h2><span data-cf-component-id="field-14f4d2b21a844bac8d042d82a842bd08" data-cf-component-type="text">{/*cf-review:field-14f4d2b21a844bac8d042d82a842bd08*/"Prepare questions for the organiser and for peers"}</span></h2>
          <p><span data-cf-component-id="field-be27039108f04698801ddf36bb00ef35" data-cf-component-type="text">{/*cf-review:field-be27039108f04698801ddf36bb00ef35*/"Before booking, adapt this message and add any unresolved questions from your workshop-selection worksheet: \u201cI run a small business and want to practise [bounded task] using [safe example inputs]. My starting skills are [ ]. Will participants practise this kind of task, what accounts are required, and what output and feedback are included?\u201d"}</span></p>
          <p><span data-cf-component-id="field-ee43faafc9a446049580d1c347400a5a" data-cf-component-type="text">{/*cf-review:field-ee43faafc9a446049580d1c347400a5a*/"For the fictional retail example, use the peer questions below to focus on factual checks and comparison with the existing process."}</span></p>
          <p><span data-cf-component-id="field-41f5fc89eb3645b3b5d6b07fb0d740e6" data-cf-component-type="text">{/*cf-review:field-41f5fc89eb3645b3b5d6b07fb0d740e6*/"Save your use-case statement and peer questions. Treat peer suggestions as ideas to assess in your pilot, not customer validation."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-46737f9120ac470faf495a90a1cd2917" data-cf-component-type="text">{/*cf-review:field-46737f9120ac470faf495a90a1cd2917*/"\u201cWhere could a product-description draft add a claim that is not in the specifications?\u201d"}</span></li>
            <li><span data-cf-component-id="field-3f5125630b824918b3675b017d2bbf0b" data-cf-component-type="text">{/*cf-review:field-3f5125630b824918b3675b017d2bbf0b*/"\u201cWhat manual comparison and quality checks would help me decide whether this is worth continuing?\u201d"}</span></li>
          </ul>
          <div data-cf-component-id={"image:prepare-questions"} data-cf-component-type={"image"} data-cf-component-label={"Image: Prepare questions for the organiser and for peers"} data-cf-source-section-id={"prepare-questions"}>
          <ArticleImageBlock
            src={/*cf-review:field-e2edc9d400f54d8f8d588b49d199fd88*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d1b80149-d454-4093-aab2-e067da9480c9.jpg?alt=media&token=d7605d8d-8907-4a26-a5ca-040445e6d4f2"}
            alt={/*cf-review:field-79754ba59dee441ab02d246b995f9c3d*/"Close-up of two people looking down with hands near their chins; one has long dark hair, and the other wears glasses."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="pilot-plan" data-cf-component-id={"section:pilot-plan"} data-cf-component-type={"section"} data-cf-component-label={"Draft a pilot plan before buying tools"} data-cf-source-section-id={"pilot-plan"}>
          <h2><span data-cf-component-id="field-e2e0d8fc720a4370940742a131b05297" data-cf-component-type="text">{/*cf-review:field-e2e0d8fc720a4370940742a131b05297*/"Draft a pilot plan before buying tools"}</span></h2>
          <p><span data-cf-component-id="field-af7251a982b947b08b4e98b97a191ad3" data-cf-component-type="text">{/*cf-review:field-af7251a982b947b08b4e98b97a191ad3*/"Start by recording how you complete the task now, including the time and corrections needed to produce an acceptable result. Then try the bounded AI-assisted task with approved inputs and a named human reviewer. Compare the results against the same quality criteria before deciding whether to continue. If approved tool access is unavailable, prepare the existing-workflow record and safe examples first rather than buying access just to complete the plan."}</span></p>
          <p><span data-cf-component-id="field-b209ad746ba3467b9dee3caf9a96f169" data-cf-component-type="text">{/*cf-review:field-b209ad746ba3467b9dee3caf9a96f169*/"The template below is a planning exercise, not a validated protocol or legal assessment. Its output checks reflect business.gov.au\u2019s advice to verify AI-generated information against trustworthy sources before relying on it (https://business.gov.au/online-and-digital/artificial-intelligence). Keeping responsibility and risk controls proportionate to the task also aligns with the human-centred approach described in Maddocks\u2019 overview of government AI guidance (https://www.maddocks.com.au/insights/navigating-the-latest-government-issued-guidance-on-ai). The template\u2019s fields and decision rules are editorial recommendations, not requirements attributed to those sources."}</span></p>
          <h3><span data-cf-component-id="field-3edd3354d55f4e24af1f125f86a7869c" data-cf-component-type="text">{/*cf-review:field-3edd3354d55f4e24af1f125f86a7869c*/"Copy this pilot plan"}</span></h3>
          <p><span data-cf-component-id="field-9e68153d3eb44fe5b1ad4c0bed1e5230" data-cf-component-type="text">{/*cf-review:field-9e68153d3eb44fe5b1ad4c0bed1e5230*/"Complete these grouped fields before spending money. Set the test period, workload and limits to fit your business rather than treating any preset quantity as necessary. Your baseline is the record of the existing process that you will compare with the assisted test. Use comparable inputs and the same definition of an acceptable output for both."}</span></p>
          <p><span data-cf-component-id="field-27a68299856348b8ae44be723919dac9" data-cf-component-type="text">{/*cf-review:field-27a68299856348b8ae44be723919dac9*/"For the fictional retail example, the task is drafting product descriptions from approved public specifications. Measure total time to an accepted description, unsupported claims, missing required facts and correction effort. The owner checks every factual claim before publication, while publication and price changes remain outside the test. Include failed attempts in the record. Keep setup and learning time separate from task time, then count that effort once when judging overall value."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-7ce56acb4fdf46309c5cf261064ba8ea" data-cf-component-type="text">{/*cf-review:field-7ce56acb4fdf46309c5cf261064ba8ea*/"Scope and responsibility \u2014 Task [ ]; observed problem and proposed benefit to test [ ]; approved inputs [ ]; required output [ ]; excluded actions [ ]; accountable reviewer [ ]; test period and number of comparable tasks [ ]."}</span></li>
            <li><span data-cf-component-id="field-8fbe04def0bc40adada7b9f548bd0f59" data-cf-component-type="text">{/*cf-review:field-8fbe04def0bc40adada7b9f548bd0f59*/"Existing-workflow baseline \u2014 Current method [ ]; comparable inputs [ ]; time from starting to an acceptable output [ ]; quality checks and acceptance criteria [ ]; corrections or failures [ ]."}</span></li>
            <li><span data-cf-component-id="field-c24083e1f0574ce2836ebdf515760805" data-cf-component-type="text">{/*cf-review:field-c24083e1f0574ce2836ebdf515760805*/"Assisted test and review \u2014 Approved tool or access decision still needed [ ]; draft instructions [ ]; human checks before use [ ]; drafting, checking and correction time, including failed attempts [ ]; setup and learning time recorded separately [ ]; fallback to the existing process [ ]."}</span></li>
            <li><span data-cf-component-id="field-a38f6edb55214e7b96411fa0114b08f6" data-cf-component-type="text">{/*cf-review:field-a38f6edb55214e7b96411fa0114b08f6*/"Budget and decision \u2014 Spending cap in A$ [ ]; workshop, travel, software and other cash costs [ ]; owner and staff time allowance [ ]; review date [ ]; minimum time and quality conditions for continuing [ ]; stop conditions [ ]."}</span></li>
          </ul>
          <h3><span data-cf-component-id="field-00ff6d84144e42609a1396962ecd186f" data-cf-component-type="text">{/*cf-review:field-00ff6d84144e42609a1396962ecd186f*/"Decide what would make you stop"}</span></h3>
          <p><span data-cf-component-id="field-9ffb26dee0e544a8ab19badf6ae1a296" data-cf-component-type="text">{/*cf-review:field-9ffb26dee0e544a8ab19badf6ae1a296*/"Pause or stop if data concerns remain unresolved, the reviewer cannot reliably check the output, errors breach your acceptance criteria, or spending and time exceed your limits. Do not enter confidential or personal data into unapproved tools. Use synthetic or appropriately de-identified examples while resolving access and data-handling questions, and fall back to the existing process when the assisted approach cannot meet your conditions."}</span></p>
          <p><span data-cf-component-id="field-9ae2f45bf0ce426eb65edfa72b1ddf75" data-cf-component-type="text">{/*cf-review:field-9ae2f45bf0ce426eb65edfa72b1ddf75*/"At the review date, compare accepted outputs, failures, correction effort and total cost. A faster draft is not a useful improvement if checking it removes the saving or leaves unacceptable errors. Continue only if the evidence meets the conditions you wrote down. An inconclusive small pilot does not establish business-wide value, so record what remains uncertain before committing more time or money."}</span></p>
        </div>
        <div id="next-decision" data-cf-component-id={"section:next-decision"} data-cf-component-type={"section"} data-cf-component-label={"Take the smallest useful next step"} data-cf-source-section-id={"next-decision"}>
          <h2><span data-cf-component-id="field-2111b14c9b534ab09c497251fc3356db" data-cf-component-type="text">{/*cf-review:field-2111b14c9b534ab09c497251fc3356db*/"Take the smallest useful next step"}</span></h2>
          <p><span data-cf-component-id="field-77d4f6e3139b4cbeb62eeb6d95966c82" data-cf-component-type="text">{/*cf-review:field-77d4f6e3139b4cbeb62eeb6d95966c82*/"Save your shortlisted workflow, completed workshop-selection worksheet, organiser and peer questions, and draft pilot plan together. Choose your next action from what remains unresolved: ask the organiser about an essential requirement, confirm which inputs you can safely use, or record the time and quality of your existing manual process as a baseline."}</span></p>
          <p><span data-cf-component-id="field-e0b4eeed52b8448cbd17b3c7f5bcbad6" data-cf-component-type="text">{/*cf-review:field-e0b4eeed52b8448cbd17b3c7f5bcbad6*/"If you use MLAI\u2019s calendar, check the individual event page for Sydney relevance."}</span></p>
          <div data-cf-component-id={"image:next-decision"} data-cf-component-type={"image"} data-cf-component-label={"Image: Take the smallest useful next step"} data-cf-source-section-id={"next-decision"}>
          <ArticleImageBlock
            src={/*cf-review:field-6428541980a64367a9a74046f963df28*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-1814f430-7d14-43c5-a42f-9fcf5822f2db.jpg?alt=media&token=37a85aa5-b8db-4b0a-ab31-5a5ca119830c"}
            alt={/*cf-review:field-52578750e90f45a18d09a93d388849f0*/"Four people sit around a wooden table with laptops, papers, and a water bottle in a bright room with plants, a bookshelf, and a sofa."}
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free worksheet"
            title={"AI Workshop Selection and Pilot Planning Worksheet"}
            description="Map one routine task, assess whether a workshop fits, prepare organiser questions and plan a small AI-assisted pilot with review checks."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fhow-to-choose-practical-ai-and-startup-workshops-in-sydney-worksheet-9fecddb7.pdf?alt=media&token=3f3efd4b-7375-471a-80a9-89d687509436"
            accent="purple"
            previewCards={[
              {
                title: "Workshop fit check",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Small pilot plan",
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
            {id: 3, href: "https://www.maddocks.com.au/insights/navigating-the-latest-government-issued-guidance-on-ai", title: "Maddocks | Quick tips and helpful tricks: navigating the latest\u2026", publisher: "maddocks.com.au", category: "guide"},
            {id: 4, href: "https://mlai.au/events", title: "AI & Machine Learning Events in Australia | MLAI", publisher: "mlai.au", category: "guide"},
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
