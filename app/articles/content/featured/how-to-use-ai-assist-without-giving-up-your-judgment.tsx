import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'
import { ArticleCallout } from '../../../components/articles/ArticleCallout'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'

export const useCustomHeader = true

const TOPIC = (/*cf-review:field-c3a07c31047e48b1983cbf4430ff9a8c*/"How to Use AI Assist Without Giving Up Your Judgment")
export const CATEGORY = "featured"
export const SLUG = "how-to-use-ai-assist-without-giving-up-your-judgment"
export const DATE_PUBLISHED = "2026-10-07"
export const DATE_MODIFIED = "2026-10-07"
export const DESCRIPTION = "Plan a low-risk AI assist pilot for your small business: choose safe inputs, keep human approval and measure total time, quality and cost before expanding."
const HERO_IMAGE = (/*cf-review:field-5226b6de191a47e4ac348caf488a7cff*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-4cab4e38-5d75-408a-b1fc-3aff73bc9ec6.jpg?alt=media&token=7286ea61-b77f-45f2-a22d-ff965dba3195")
const HERO_IMAGE_ALT = "Two people look at a laptop, one holding a pen and the other gesturing with a hand."
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
  heading: "Key facts: How to Use AI Assist Without Giving Up Your Judgment",
  intro: "Plan a low-risk AI assist pilot for your small business: choose safe inputs, keep human approval and measure total time, quality and cost before expanding.",
  items: [
    { label: "How do I get AI to assist me?", description: "Start with one routine, easily checked task, such as drafting replies from a public FAQ. Use fictional inputs in an approved tool, name a reviewer and require human approval before any customer-facing use." },
    { label: "What is assist AI?", description: "AI assistance means using generative AI to prepare content from instructions, such as a customer-enquiry draft. A person checks facts against current source material, handles exceptions and makes the final decision." },
    { label: "How can I tell whether an AI pilot is useful?", description: "Compare manual and AI-assisted completion time for equivalent cases, including checking, editing and approval. Assess both against the same quality checklist, record tool costs in Australian dollars and apply preset continue-or-stop thresholds." },
  ],
}

export const articleMeta = {
  title: "How to Use AI Assist Without Giving Up Your Judgment",
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
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"AI can draft the work without owning the decision"} data-cf-source-section-id={"intro"}>
        <h2><span data-cf-component-id="field-8eebf3cc533a4c919fc97b6147cd8b45" data-cf-component-type="text">{/*cf-review:field-8eebf3cc533a4c919fc97b6147cd8b45*/"AI can draft the work without owning the decision"}</span></h2>
        <p><strong>{TOPIC}</strong> — <span data-cf-component-id="field-1387277b454a4056a3a99facb068f3c2" data-cf-component-type="text">{/*cf-review:field-1387277b454a4056a3a99facb068f3c2*/"Use AI to prepare a first draft of a routine task you can easily check. Keep fact-checking, unusual cases and final approval with a person, especially before anything reaches a customer. Here, \u201cAI assist\u201d means working with generative AI, which creates content from your instructions. It does not refer to a particular app or product called AI Assist."}</span></p>
        <p><span data-cf-component-id="field-634f363469a54066a984664c2b14bdeb" data-cf-component-type="text">{/*cf-review:field-634f363469a54066a984664c2b14bdeb*/"Fluent writing is not proof that the information is correct. Business.gov.au advises checking AI-generated information against trustworthy sources before relying on it. Check a draft against the source material rather than approving it because it sounds convincing. Compare the total time spent drafting, checking and correcting, the quality of the finished work and the tool cost with your current process. A faster first draft alone does not establish that AI saves your business time or money."}</span></p>
        </div>
        <div id="shortlist" data-cf-component-id={"section:shortlist"} data-cf-component-type={"section"} data-cf-component-label={"Choose a frequent task that is easy to check"} data-cf-source-section-id={"shortlist"}>
          <h2><span data-cf-component-id="field-0fce757c593847e0a96f08ab12c155f2" data-cf-component-type="text">{/*cf-review:field-0fce757c593847e0a96f08ab12c155f2*/"Choose a frequent task that is easy to check"}</span></h2>
          <p><span data-cf-component-id="field-327cc86bcc774cc2a6c21c8ab52852cd" data-cf-component-type="text">{/*cf-review:field-327cc86bcc774cc2a6c21c8ab52852cd*/"Start with routine writing work that already takes time in your business. Business.gov.au recommends identifying the problem you want AI to solve. Possible first-pilot candidates are drafting answers from your public FAQ, rewriting your own public product descriptions, or formatting a non-confidential internal checklist without changing its instructions. These are options to compare, not a claim that one is best for every business."}</span></p>
          <p><span data-cf-component-id="field-93e5bfb58ae64566b66c15c70db5762e" data-cf-component-type="text">{/*cf-review:field-93e5bfb58ae64566b66c15c70db5762e*/"For each candidate, complete this comparison worksheet: workflow; frequency per week; current minutes per task; estimated minutes potentially saved per task; ease of checking against the original source; consequences if an error slips through. Use your own observations for frequency and current time. Keep potential savings labelled as estimates until a pilot measures them, including checking and correction time. A frequent task may offer more opportunities to save time, but a draft that is difficult to verify may add work instead."}</span></p>
          <p><span data-cf-component-id="field-46403d017cc24b8b9986c497496ff83d" data-cf-component-type="text">{/*cf-review:field-46403d017cc24b8b9986c497496ff83d*/"Before selecting a candidate, check that you have safe inputs, an authoritative source and someone available to review every output before use. Do not enter confidential or personal data into unapproved tools. Use public material, fictional inputs or appropriately de-identified material, and check tool settings and business policies first. Reject a candidate if the reviewer cannot reliably catch errors against the source. Frequency and possible savings should not override these safeguards."}</span></p>
          <p><span data-cf-component-id="field-ba67b66f9f7a4395bc423b3f3b8a9d88" data-cf-component-type="text">{/*cf-review:field-ba67b66f9f7a4395bc423b3f3b8a9d88*/"For this first pilot, leave out autonomous sending, payments, employment or eligibility decisions, and personalised legal, medical or financial advice. Limit AI's role to drafting or formatting, with a person handling exceptions and approving the final output. Write down one provisional choice and why it is checkable, for example, \u201cDraft FAQ-based replies for human approval using fictional enquiries.\u201d This shortlist is a practical guide, not a validated or official scoring model."}</span></p>
          <div data-cf-component-id={"image:shortlist"} data-cf-component-type={"image"} data-cf-component-label={"Image: Choose a frequent task that is easy to check"} data-cf-source-section-id={"shortlist"}>
          <ArticleImageBlock
            src={/*cf-review:field-74aa6c5d4dd144bf8f3d1a30897a4db6*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d46575c7-9721-414b-b821-bffaadb83ad0.jpg?alt=media&token=9465f639-ecfb-43bb-99c2-c7a49f475c0d"}
            alt="A person writes in a spiral notebook beside an open laptop, mug and potted plant on a wooden table near a window."
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="responsibility-and-inputs" data-cf-component-id={"section:responsibility-and-inputs"} data-cf-component-type={"section"} data-cf-component-label={"Write down the human responsibilities and data boundaries"} data-cf-source-section-id={"responsibility-and-inputs"}>
          <h2><span data-cf-component-id="field-d963e652bbc44326b558d8e352de76d3" data-cf-component-type="text">{/*cf-review:field-d963e652bbc44326b558d8e352de76d3*/"Write down the human responsibilities and data boundaries"}</span></h2>
          <p><span data-cf-component-id="field-595e200df5a7495e8aa9141f33b07ccc" data-cf-component-type="text">{/*cf-review:field-595e200df5a7495e8aa9141f33b07ccc*/"Before trying a tool, name the person accountable for the workflow and separate drafting from approval. For a customer-enquiry pilot, the reviewer checks the proposed reply against current business information."}</span></p>
          <p><span data-cf-component-id="field-295d3239f0234f24b1af1ceb6b5730b6" data-cf-component-type="text">{/*cf-review:field-295d3239f0234f24b1af1ceb6b5730b6*/"Copy the three fields below into your plan and adapt them to your shortlisted workflow. The customer-enquiry example is a suggested division of responsibility for this exercise, not a tested process. Record the reviewer's name rather than leaving responsibility with \u201cthe team\u201d."}</span></p>
          <p><span data-cf-component-id="field-7ed10f5dc3934d968498c7187465d258" data-cf-component-type="text">{/*cf-review:field-7ed10f5dc3934d968498c7187465d258*/"Keep missing-information decisions, complaints, unusual requests and concessions with the owner or an authorised staff member. That person also gives final customer-facing approval before anything is sent. A prompt asking AI to be accurate or follow policy is not an approval mechanism."}</span></p>
          <p><span data-cf-component-id="field-72bc06680ffa4bdea04da3cbb735a50c" data-cf-component-type="text">{/*cf-review:field-72bc06680ffa4bdea04da3cbb735a50c*/"Do not enter confidential or personal information into unapproved tools. Use fictional inputs by default, or appropriately de-identified inputs only after checking their suitability. Before piloting, record the approved tool and account, permitted inputs and relevant business policies. Check the provider's current data-use terms and retention, training and access settings together. One setting alone does not establish that a tool is suitable for your workflow."}</span></p>
          <p><span data-cf-component-id="field-a3a7d47cc6414900be05fd5c0d28d569" data-cf-component-type="text">{/*cf-review:field-a3a7d47cc6414900be05fd5c0d28d569*/"If no suitable tool is approved, finish the written plan and measure the manual baseline instead of opening an unreviewed account or buying a subscription. The Office of the Australian Information Commissioner's Guidance on privacy and the use of commercially available AI products is official further reading. Use it to inform your review, not as proof that your pilot complies with privacy law or that every small business has the same obligations."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-6755f2042f164fb280c89e755e33ce82" data-cf-component-type="text">{/*cf-review:field-6755f2042f164fb280c89e755e33ce82*/"AI may draft: For customer enquiries, propose a reply using only supplied facts. For your workflow, write the specific output AI may prepare and what is outside scope."}</span></li>
            <li><span data-cf-component-id="field-49bd4d30ac794362973e3c764750417b" data-cf-component-type="text">{/*cf-review:field-49bd4d30ac794362973e3c764750417b*/"The named reviewer must verify: For customer enquiries, check hours, availability claims, policy wording and promises against current source material. For your workflow, name the reviewer and list the sources and checks they must use."}</span></li>
            <li><span data-cf-component-id="field-a786f6f1de674548ba99e803e6f38a2c" data-cf-component-type="text">{/*cf-review:field-a786f6f1de674548ba99e803e6f38a2c*/"The human alone may decide: For customer enquiries, resolve missing information, handle exceptions, approve concessions and authorise the final reply. For your workflow, record who has decision authority and when work must return to them."}</span></li>
          </ul>
        </div>
        <div data-cf-component-id={"callout:deidentification-check"} data-cf-component-type={"callout"} data-cf-component-label={"Removing a name is not the whole check"}>
          <ArticleCallout title="Removing a name is not the whole check" variant="warning">
            {"Check that de-identified inputs are suitable before using them. If you cannot confirm suitability, use a wholly fictional enquiry instead."}
          </ArticleCallout>
        </div>
        <div id="worked-example" data-cf-component-id={"section:worked-example"} data-cf-component-type={"section"} data-cf-component-label={"Work through a fictional customer-enquiry draft"} data-cf-source-section-id={"worked-example"}>
          <h2><span data-cf-component-id="field-bb1fa7d3b5a245d49c5a2eb051ccf4be" data-cf-component-type="text">{/*cf-review:field-bb1fa7d3b5a245d49c5a2eb051ccf4be*/"Work through a fictional customer-enquiry draft"}</span></h2>
          <p><span data-cf-component-id="field-672c610e373a42f082419e68b3907768" data-cf-component-type="text">{/*cf-review:field-672c610e373a42f082419e68b3907768*/"The entire example below is hypothetical. The stationery shop, reference facts, enquiry and replies are fictional. The illustrative AI draft is a teaching example, not output from a reported tool test or evidence from real customers."}</span></p>
          <div data-cf-component-id={"image:worked-example"} data-cf-component-type={"image"} data-cf-component-label={"Image: Work through a fictional customer-enquiry draft"} data-cf-source-section-id={"worked-example"}>
          <ArticleImageBlock
            src={/*cf-review:field-f09ae0685d5e44eb96f23e0b6250357e*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a5ef313e-7fd7-40e3-8dd0-26259c3a00fb.jpg?alt=media&token=e2f52575-9062-4e1b-b976-faa9ba000f4a"}
            alt="An open laptop, patterned mug, notebooks and a jar of pens sit on a wooden table, with shelves of books and cards behind."
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-381f1f7be7e744a9b9686e668266afe0" data-cf-component-type="text">{/*cf-review:field-381f1f7be7e744a9b9686e668266afe0*/"Fictional inputs and prompt"}</span></h3>
          <p><span data-cf-component-id="field-1eb503aa3acf4f21880d0847a148a065" data-cf-component-type="text">{/*cf-review:field-1eb503aa3acf4f21880d0847a148a065*/"The fictional shop\u2019s reference material says its Saturday opening hours are 9 am\u20131 pm and customers must receive a ready-for-collection notice before collecting an order. It supplies no stock or reservation information. The fictional enquiry reads: \u201cCan I collect two blue notebooks this Saturday?\u201d Those facts do not establish whether the notebooks are available or whether an order exists."}</span></p>
          <p><span data-cf-component-id="field-100ee9bff1b04d7db70e2a978eb499d9" data-cf-component-type="text">{/*cf-review:field-100ee9bff1b04d7db70e2a978eb499d9*/"A bounded prompt could read: \u201cDraft a short customer reply using only these facts: Saturday opening hours are 9 am\u20131 pm; collection requires a ready-for-collection notice; no stock or reservation information is supplied. The customer asks: \u2018Can I collect two blue notebooks this Saturday?\u2019 Do not invent availability, a reservation or order readiness. Flag missing information. Produce a draft for human review only.\u201d If you try this exercise, keep the inputs fictional and use a tool approved by your business. Do not paste real customer details or confidential information into an unapproved tool."}</span></p>
          <h3><span data-cf-component-id="field-e05cd4bb1f0f41a6aad5cf3c039af10f" data-cf-component-type="text">{/*cf-review:field-e05cd4bb1f0f41a6aad5cf3c039af10f*/"Illustrative draft and human checks"}</span></h3>
          <p><span data-cf-component-id="field-adf44d6e9ac94eff9d5073f5c891547b" data-cf-component-type="text">{/*cf-review:field-adf44d6e9ac94eff9d5073f5c891547b*/"Consider this deliberately flawed hypothetical AI draft: \u201cYes, your two blue notebooks will be ready on Saturday. We are open from 9 am to 1 pm.\u201d The unsupported promise is invented for teaching purposes. It does not demonstrate a measured failure rate or establish how any particular tool would respond."}</span></p>
          <p><span data-cf-component-id="field-f947ca204a144f3b9406adcc46245648" data-cf-component-type="text">{/*cf-review:field-f947ca204a144f3b9406adcc46245648*/"The reviewer checks each claim against the supplied material. The opening hours match, but availability and readiness have not been established. The draft also omits the requirement to wait for a ready-for-collection notice. The person must remove those assumptions or verify them independently before including them in a reply."}</span></p>
          <h3><span data-cf-component-id="field-89a8685ec240467aabcc84d6a189cabf" data-cf-component-type="text">{/*cf-review:field-89a8685ec240467aabcc84d6a189cabf*/"The human-approved revision"}</span></h3>
          <p><span data-cf-component-id="field-3a13e8878b8a4d6cb8e51b5fe65ef279" data-cf-component-type="text">{/*cf-review:field-3a13e8878b8a4d6cb8e51b5fe65ef279*/"A revised fictional reply could read: \u201cOur Saturday opening hours are 9 am\u20131 pm. Availability of two blue notebooks still needs to be confirmed. Please wait for a ready-for-collection notice before coming to collect an order.\u201d This version preserves the supplied hours and collection condition without promising stock or readiness. An actual reply must reflect the business\u2019s current, verified facts."}</span></p>
          <p><span data-cf-component-id="field-055ff9d67f2046fc8729c72e1065854f" data-cf-component-type="text">{/*cf-review:field-055ff9d67f2046fc8729c72e1065854f*/"For this exercise, assign approval to a named person: Alex, the fictional shop owner. Alex checks the revision against the reference material and decides whether to approve it, seek clarification or handle an exception manually. During the fictional pilot, record that approval without sending anything to a real customer. The decision to make a customer-facing commitment remains with the person responsible."}</span></p>
        </div>
        <div id="measurement" data-cf-component-id={"section:measurement"} data-cf-component-type={"section"} data-cf-component-label={"Measure the whole job before deciding to continue"} data-cf-source-section-id={"measurement"}>
          <h2><span data-cf-component-id="field-60325ce532c3438597c40d483b4d5636" data-cf-component-type="text">{/*cf-review:field-60325ce532c3438597c40d483b4d5636*/"Measure the whole job before deciding to continue"}</span></h2>
          <p><span data-cf-component-id="field-15d59a555b2b4755b36bbb81dd58d205" data-cf-component-type="text">{/*cf-review:field-15d59a555b2b4755b36bbb81dd58d205*/"Judge the pilot by the time needed to produce an acceptable, human-approved reply, not by how quickly AI generates text. The measurement method below is a proposed small-business practice exercise using fictional cases, not a validated test of AI effectiveness. Set your criteria before starting so a promising draft does not become a reason to overlook extra work or mistakes."}</span></p>
          <h3><span data-cf-component-id="field-3739f494a0624ce39413dfd835851cd7" data-cf-component-type="text">{/*cf-review:field-3739f494a0624ce39413dfd835851cd7*/"Total time and cost"}</span></h3>
          <p><span data-cf-component-id="field-1fb4a2d7011749b4acd236ec84bed7c9" data-cf-component-type="text">{/*cf-review:field-1fb4a2d7011749b4acd236ec84bed7c9*/"Establish a baseline by timing manual completion of a small set of representative fictional enquiries, including checking and approval. Compare that with AI-assisted handling of equivalent cases of similar difficulty, using the same reviewer and quality requirements. A small practice sample gives only an initial signal, so record the planned sample size and complete it rather than selecting the best results."}</span></p>
          <p><span data-cf-component-id="field-3909733771da4fe789e625de55632825" data-cf-component-type="text">{/*cf-review:field-3909733771da4fe789e625de55632825*/"For each AI-assisted case, count input preparation, prompting, waiting, source checking, editing, approval and any manual fallback. Include retries and rejected drafts. Record one-off setup time separately, but include it in the overall pilot labour budget. Calculate average net minutes saved by subtracting average AI-assisted completion time from average manual completion time."}</span></p>
          <p><span data-cf-component-id="field-7d410f48feb24a88be0fc8b02887a699" data-cf-component-type="text">{/*cf-review:field-7d410f48feb24a88be0fc8b02887a699*/"Record actual incremental tool fees and usage charges in Australian dollars, with relevant existing subscription costs shown alongside them. Check current provider pricing, terms and settings before starting. A free plan is not automatically approved or suitable for your business, and faster drafting alone does not show that the overall job costs less."}</span></p>
          <h3><span data-cf-component-id="field-7f9cb472a1eb4f90bdba7dd9b33f6bb1" data-cf-component-type="text">{/*cf-review:field-7f9cb472a1eb4f90bdba7dd9b33f6bb1*/"Quality and stopping rules"}</span></h3>
          <p><span data-cf-component-id="field-4df00a62e3144943960d4ddf8266512c" data-cf-component-type="text">{/*cf-review:field-4df00a62e3144943960d4ddf8266512c*/"Use the same quality checklist for both methods: facts trace to approved source material, the enquiry is answered or missing information is flagged, no unsupported commitments appear, the tone is suitable, input boundaries are respected and human approval is recorded. Log first-draft defects as well as the final pass or fail. This makes review effort visible even when editing eventually produces an acceptable reply."}</span></p>
          <p><span data-cf-component-id="field-454c315475934c729610ffc31d1ee102" data-cf-component-type="text">{/*cf-review:field-454c315475934c729610ffc31d1ee102*/"As an illustrative rule, consider another bounded round only if average total handling time is at least 20% lower than baseline, every final reply passes the checklist, no data or approval boundary is breached and the preset budget is respected. The 20% threshold is a planning choice, not a proven benchmark. Choose a threshold that makes the effort worthwhile for your business before seeing the results."}</span></p>
          <p><span data-cf-component-id="field-191cefb994b44406bbfaebdf5e4fb019" data-cf-component-type="text">{/*cf-review:field-191cefb994b44406bbfaebdf5e4fb019*/"Pause immediately if a data boundary or approval requirement is breached. Stop or revise the plan if time or quality criteria fail, and treat an incomplete sample as inconclusive rather than evidence of benefit. Passing a fictional exercise does not authorise live customer-data use, automated sending or wider deployment. Keep confidential and personal data out of unapproved tools, and assess any proposed change in inputs or scope separately."}</span></p>
        </div>
        <div id="pilot-plan" data-cf-component-id={"section:pilot-plan"} data-cf-component-type={"section"} data-cf-component-label={"Copy this one-page AI pilot plan"} data-cf-source-section-id={"pilot-plan"}>
          <h2><span data-cf-component-id="field-9be5d6857e1b4031bdfd58d6efabf9bd" data-cf-component-type="text">{/*cf-review:field-9be5d6857e1b4031bdfd58d6efabf9bd*/"Copy this one-page AI pilot plan"}</span></h2>
          <p><span data-cf-component-id="field-3a9ccabc188f4223bbdcf53193e7352b" data-cf-component-type="text">{/*cf-review:field-3a9ccabc188f4223bbdcf53193e7352b*/"Copy the fields below into a document and fill them in before starting. This is a planning exercise, not a validated methodology or a legal compliance assessment."}</span></p>
          <p><span data-cf-component-id="field-82a9be018035423aad432c601b34070a" data-cf-component-type="text">{/*cf-review:field-82a9be018035423aad432c601b34070a*/"One illustrative starting plan is 10 fictional enquiries over one week, with no more than two staff hours including setup, the manual baseline and review, and A$0 incremental tool spend using an already-approved tool if available. These are adjustable planning choices, not benchmarks or reported results. Set your thresholds before testing. If the limits prevent completion, record the pilot as incomplete rather than claiming success."}</span></p>
          <div data-cf-component-id={"image:pilot-plan"} data-cf-component-type={"image"} data-cf-component-label={"Image: Copy this one-page AI pilot plan"} data-cf-source-section-id={"pilot-plan"}>
          <ArticleImageBlock
            src={/*cf-review:field-3ead8af7a15544ed8fd9550f522f59f7*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a0fc1964-78c2-4f30-802e-05eee47be73c.jpg?alt=media&token=b04673ab-d56f-4c61-aa9d-4b1d1e413a68"}
            alt="Close-up of a person writing in a notebook at a wooden table, with a mug and potted plant behind."
            caption=""
            width={1200}
            height={800}
          />
          </div>
          <h3><span data-cf-component-id="field-225f96ac75db442e805b2431e2384dd2" data-cf-component-type="text">{/*cf-review:field-225f96ac75db442e805b2431e2384dd2*/"Job and accountability"}</span></h3>
          <p><span data-cf-component-id="field-19546bc7630b494a9ed7ab61458cdf5b" data-cf-component-type="text">{/*cf-review:field-19546bc7630b494a9ed7ab61458cdf5b*/"Define one task and name the people responsible for checking facts, handling exceptions and approving any customer-facing response."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-94a77d2ce5a441f39ba756b5c2ea6092" data-cf-component-type="text">{/*cf-review:field-94a77d2ce5a441f39ba756b5c2ea6092*/"Workflow: ____; intended benefit: ____; scope: ____; exclusions: ____."}</span></li>
            <li><span data-cf-component-id="field-e08f5861aedd4be3b79ab8de44788c5e" data-cf-component-type="text">{/*cf-review:field-e08f5861aedd4be3b79ab8de44788c5e*/"Accountable owner: ____; reviewer: ____."}</span></li>
            <li><span data-cf-component-id="field-fe64fc1ef8814e6299673c7e7526cc2a" data-cf-component-type="text">{/*cf-review:field-fe64fc1ef8814e6299673c7e7526cc2a*/"AI may draft: ____; the person must verify: ____."}</span></li>
            <li><span data-cf-component-id="field-05f1407a4abe4471892ad95827c7e1ed" data-cf-component-type="text">{/*cf-review:field-05f1407a4abe4471892ad95827c7e1ed*/"Decisions that remain human, including exceptions and final customer-facing approval: ____."}</span></li>
          </ul>
          <h3><span data-cf-component-id="field-dc43e0f7082240a49a66ca4ecf4948f0" data-cf-component-type="text">{/*cf-review:field-dc43e0f7082240a49a66ca4ecf4948f0*/"Tool and inputs"}</span></h3>
          <p><span data-cf-component-id="field-294bd1754f4d4f759bffdb958463e763" data-cf-component-type="text">{/*cf-review:field-294bd1754f4d4f759bffdb958463e763*/"Record approval for the specific tool and account. Do not enter confidential or personal data into unapproved tools. Use fictional or appropriately de-identified inputs within business policy, and check settings and output handling before the pilot."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-c02f7a94663f4afea7425e8311ae88d5" data-cf-component-type="text">{/*cf-review:field-c02f7a94663f4afea7425e8311ae88d5*/"Approved tool and account: ____; approval and settings checked by: ____; date: ____; relevant business policy: ____."}</span></li>
            <li><span data-cf-component-id="field-753d4bd378a44f918b3172a995057ad6" data-cf-component-type="text">{/*cf-review:field-753d4bd378a44f918b3172a995057ad6*/"Permitted input sources: ____; prohibited data: ____."}</span></li>
            <li><span data-cf-component-id="field-c0f8920b1ca24819811d9e5165a437fb" data-cf-component-type="text">{/*cf-review:field-c0f8920b1ca24819811d9e5165a437fb*/"Authoritative reference material used to check facts: ____."}</span></li>
            <li><span data-cf-component-id="field-1fba3691ee44440d83b76d257e6afe44" data-cf-component-type="text">{/*cf-review:field-1fba3691ee44440d83b76d257e6afe44*/"Output storage, access and deletion arrangements: ____; automatic sending: disabled; human approval required before anything is sent."}</span></li>
          </ul>
          <h3><span data-cf-component-id="field-5ff3e795f7f54126bf94a15ee70b7390" data-cf-component-type="text">{/*cf-review:field-5ff3e795f7f54126bf94a15ee70b7390*/"Test and limits"}</span></h3>
          <p><span data-cf-component-id="field-06d9f02f51f9480c9af64e584f48f34b" data-cf-component-type="text">{/*cf-review:field-06d9f02f51f9480c9af64e584f48f34b*/"Record how cases will be selected and the limits on total staff time and spending."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-66c625f3c1414c8bb5260760e1841f9f" data-cf-component-type="text">{/*cf-review:field-66c625f3c1414c8bb5260760e1841f9f*/"Manual baseline method and results: ____."}</span></li>
            <li><span data-cf-component-id="field-76626ee624a74c8886bdb56656f1a9d4" data-cf-component-type="text">{/*cf-review:field-76626ee624a74c8886bdb56656f1a9d4*/"Sample size: ____; case-selection method: ____; illustrative option: 10 fictional enquiries."}</span></li>
            <li><span data-cf-component-id="field-66d8b680c7bb4fd2bafe11172484f398" data-cf-component-type="text">{/*cf-review:field-66d8b680c7bb4fd2bafe11172484f398*/"Start date: ____; end date: ____; illustrative duration: one week."}</span></li>
            <li><span data-cf-component-id="field-a452d0a3bc434bbcb98a4a4961faca77" data-cf-component-type="text">{/*cf-review:field-a452d0a3bc434bbcb98a4a4961faca77*/"Total staff-time cap including setup, baseline, checking and rework: ____; illustrative cap: two hours."}</span></li>
            <li><span data-cf-component-id="field-e0ce44891cf04b2790806038740d00a9" data-cf-component-type="text">{/*cf-review:field-e0ce44891cf04b2790806038740d00a9*/"Incremental tool-spend cap in AUD: ____; illustrative cap: A$0 with an already-approved tool if available; actual costs: ____."}</span></li>
          </ul>
          <h3><span data-cf-component-id="field-d4f655ff1f0046ef861d5ea7886265c3" data-cf-component-type="text">{/*cf-review:field-d4f655ff1f0046ef861d5ea7886265c3*/"Review and decision"}</span></h3>
          <p><span data-cf-component-id="field-28acf06e99ea4a23b551e52a7c13abcc" data-cf-component-type="text">{/*cf-review:field-28acf06e99ea4a23b551e52a7c13abcc*/"Use the same quality checklist for manual and AI-assisted work. Set the required time improvement and quality, safety and cost limits before seeing results. Pause immediately for a data-boundary breach or unapproved sending, and record incomplete tests separately from successful ones."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-035eaa6282d34b609c05b51c26cf435d" data-cf-component-type="text">{/*cf-review:field-035eaa6282d34b609c05b51c26cf435d*/"Quality checklist, including source accuracy, completeness, tone and unsupported promises: ____."}</span></li>
            <li><span data-cf-component-id="field-1068ed26c39c436cbe7f600689b66d97" data-cf-component-type="text">{/*cf-review:field-1068ed26c39c436cbe7f600689b66d97*/"Per-case record: case ID ____; manual time ____; AI-assisted time including checking and rework ____; first-draft defects ____; rework required ____."}</span></li>
            <li><span data-cf-component-id="field-6eb9260fdd614a2b86857aace4cd356a" data-cf-component-type="text">{/*cf-review:field-6eb9260fdd614a2b86857aace4cd356a*/"Final approval record: reviewer ____; date ____; approved, rejected or escalated ____."}</span></li>
            <li><span data-cf-component-id="field-be0e1b5e0311407d84127da8535b064b" data-cf-component-type="text">{/*cf-review:field-be0e1b5e0311407d84127da8535b064b*/"Continue threshold: time improvement ____; quality requirement ____; safety requirement ____."}</span></li>
            <li><span data-cf-component-id="field-6da0137fa45a4f75bd4e77b2ef6da6ef" data-cf-component-type="text">{/*cf-review:field-6da0137fa45a4f75bd4e77b2ef6da6ef*/"Immediate-pause triggers: ____; stop criteria for unacceptable time, quality or cost: ____."}</span></li>
            <li><span data-cf-component-id="field-c70088fa71424540bceaf70f6dffad1f" data-cf-component-type="text">{/*cf-review:field-c70088fa71424540bceaf70f6dffad1f*/"Review date: ____; decision owner: ____; decision and reason: continue, revise, stop or incomplete ____."}</span></li>
          </ul>
        </div>
        <div id="finish-exercise" data-cf-component-id={"section:finish-exercise"} data-cf-component-type={"section"} data-cf-component-label={"Finish with one use case and three questions for peers"} data-cf-source-section-id={"finish-exercise"}>
          <h2><span data-cf-component-id="field-9fafe4adbdb24fecaf5ddabaadcc0051" data-cf-component-type="text">{/*cf-review:field-9fafe4adbdb24fecaf5ddabaadcc0051*/"Finish with one use case and three questions for peers"}</span></h2>
          <p><span data-cf-component-id="field-8d88abf9325b47699270ee5b1ef980c1" data-cf-component-type="text">{/*cf-review:field-8d88abf9325b47699270ee5b1ef980c1*/"Record exactly one workflow, the person accountable for the pilot and the main reason it passed your shortlist. That reason might be frequent repetition and outputs that are straightforward to check against approved facts. Keep the other candidates outside this pilot so you can assess one task without expanding its scope."}</span></p>
          <p><span data-cf-component-id="field-df344558b17a4b33b4d016a09372113c" data-cf-component-type="text">{/*cf-review:field-df344558b17a4b33b4d016a09372113c*/"A hypothetical completed choice could read: \u201cDraft replies to routine opening-hours and collection enquiries from approved reference facts. The business owner is accountable. This task passed the shortlist because replies can be checked against those facts. Use fictional enquiries, require human review and approval, make no stock promises and send nothing automatically.\u201d This is an exercise example, not a tested result. Choose a different workflow if your own comparison favours it."}</span></p>
          <p><span data-cf-component-id="field-75f218c0415a4406ba263e17dbc7bf9f" data-cf-component-type="text">{/*cf-review:field-75f218c0415a4406ba263e17dbc7bf9f*/"Before starting, check that every pilot-plan field has an answer or a deliberate limit. Any unresolved approval blocks the pilot."}</span></p>
          <p><span data-cf-component-id="field-5b96ebe53d794a2e9f1bafb56336bec5" data-cf-component-type="text">{/*cf-review:field-5b96ebe53d794a2e9f1bafb56336bec5*/"Share the bounded plan with peers and use these three questions to seek specific feedback. Record any changes or outstanding approvals in the plan before you begin."}</span></p>
          <ul>
            <li><span data-cf-component-id="field-e11cd9ac694e490180247717bd031d48" data-cf-component-type="text">{/*cf-review:field-e11cd9ac694e490180247717bd031d48*/"Is this workflow frequent and easy enough to check to justify a small pilot?"}</span></li>
            <li><span data-cf-component-id="field-ddc8464d0f9f4f3db698e25e453210e5" data-cf-component-type="text">{/*cf-review:field-ddc8464d0f9f4f3db698e25e453210e5*/"Which input, exception or approval risks have I missed?"}</span></li>
            <li><span data-cf-component-id="field-5d399d26dffd4f2f98a6af6e42899958" data-cf-component-type="text">{/*cf-review:field-5d399d26dffd4f2f98a6af6e42899958*/"Would this baseline, review checklist and time-and-cost threshold give a credible continue-or-stop decision?"}</span></li>
          </ul>
        </div>
        <div id="conclusion" data-cf-component-id={"section:conclusion"} data-cf-component-type={"section"} data-cf-component-label={"Start when approved, with peer learning optional"} data-cf-source-section-id={"conclusion"}>
          <h2><span data-cf-component-id="field-4aa712f7554c4022a73abfe57f0b6f9e" data-cf-component-type="text">{/*cf-review:field-4aa712f7554c4022a73abfe57f0b6f9e*/"Start when approved, with peer learning optional"}</span></h2>
          <p><span data-cf-component-id="field-a0ed87543567465e90938735ee053c3e" data-cf-component-type="text">{/*cf-review:field-a0ed87543567465e90938735ee053c3e*/"Once approvals are in place, establish your baseline and run the planned pilot. There is no need to jump straight to buying a tool or service. If no suitable tool is approved, keep the plan until that condition is met."}</span></p>
          <p><span data-cf-component-id="field-5c16a73b14aa471c8e1ca397008c881a" data-cf-component-type="text">{/*cf-review:field-5c16a73b14aa471c8e1ca397008c881a*/"For optional peer learning, browse MLAI's events calendar at /events and inspect a relevant event before registering with its organiser. Attending is not a requirement for running your pilot."}</span></p>
          <div data-cf-component-id={"image:conclusion"} data-cf-component-type={"image"} data-cf-component-label={"Image: Start when approved, with peer learning optional"} data-cf-source-section-id={"conclusion"}>
          <ArticleImageBlock
            src={/*cf-review:field-33aac76fb28e4730812b8871708b67e6*/"https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-88238ce8-25bc-4f12-9c4c-715b0288444d.jpg?alt=media&token=f909576c-cf73-475a-a69b-6ad56ece7d9f"}
            alt="Four people sit around a table with laptops and papers, one gesturing with both hands. Large windows and a whiteboard are behind them."
            caption=""
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free worksheet"
            title={"AI Assist Pilot Planning Worksheet"}
            description="Plan a small AI assist pilot with workflow comparison fields, data boundaries, review responsibilities, baseline measures and a continue-or-stop decision."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fhow-to-use-ai-assist-without-giving-up-your-judgment-worksheet-6aa65fe9.pdf?alt=media&token=a68e5e44-f665-4bc2-9319-f69afd5cfe63"
            accent="purple"
            previewCards={[
              {
                title: "Pilot scope planner",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Human review controls",
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
