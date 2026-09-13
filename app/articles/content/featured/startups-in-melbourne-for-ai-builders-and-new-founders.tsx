import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '../../authors'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'
import QuoteBlock from '../../../components/articles/QuoteBlock'
import AudienceGrid from '../../../components/articles/AudienceGrid'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'

export const useCustomHeader = true

const TOPIC = "Startups in Melbourne for AI Builders and New Founders"
export const CATEGORY = "featured"
export const SLUG = "startups-in-melbourne-for-ai-builders-and-new-founders"
export const DATE_PUBLISHED = "2026-09-13"
export const DATE_MODIFIED = "2026-09-13"
export const DESCRIPTION = "Start with LaunchVic\u2019s event listings, find AI peers, test a customer problem and use official business setup guidance to begin building in Melbourne."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Fhero-da78dd9e-bd65-48aa-819c-f49377d96b65.jpg?alt=media&token=84ba0b79-1709-4762-9d04-036b2fb60b08"
const HERO_IMAGE_ALT = "Close-up of Melbourne AI founders testing a startup idea at a LaunchVic networking event"
export const FEATURED_FOCUS = "startups"

const AUTHOR_PROFILE = getAuthorProfile(DEFAULT_AUTHOR_KEY)
const AUTHOR = AUTHOR_PROFILE?.name ?? 'Dr Sam Donegan'
const AUTHOR_ROLE = AUTHOR_PROFILE?.role ?? AUTHOR_PROFILE?.credentials ?? 'Founder'
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
  heading: "Key facts: Startups in Melbourne for AI Builders and New Founders",
  intro: "Start with LaunchVic\u2019s event listings, find AI peers, test a customer problem and use official business setup guidance to begin building in Melbourne.",
  items: [
    { label: "Where can Melbourne founders find connections?", description: "LaunchVic\u2019s Events & Networking page helps founders find Melbourne startup connections through topic, location and event-type filters. Customer research\u2014not meetup attendance or peer enthusiasm\u2014provides evidence of demand." },
    { label: "What belongs in an AI startup brief?", description: "A startup\u2019s business proposition needs a defined customer problem, a revenue approach, startup and monthly costs, and a customer-acquisition plan. An interesting AI demonstration alone does not establish customer demand." },
    { label: "Where can founders find official setup guidance?", description: "Business.gov.au provides Australian founders with guidance on defining and planning a business, registration and finance. Business structure affects registration requirements and legal and tax obligations." },
  ],
}

export const articleMeta = {
  title: "Startups in Melbourne for AI Builders and New Founders",
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

const faqSchemaItems = [
  { question: "Where can Melbourne founders find connections?", answer: "LaunchVic\u2019s Events & Networking page helps founders find Melbourne startup connections through topic, location and event-type filters. Customer research\u2014not meetup attendance or peer enthusiasm\u2014provides evidence of demand." },
  { question: "What belongs in an AI startup brief?", answer: "A startup\u2019s business proposition needs a defined customer problem, a revenue approach, startup and monthly costs, and a customer-acquisition plan. An interesting AI demonstration alone does not establish customer demand." },
  { question: "Where can founders find official setup guidance?", answer: "Business.gov.au provides Australian founders with guidance on defining and planning a business, registration and finance. Business structure affects registration requirements and legal and tax obligations." },
]

const faqStructuredData = faqSchemaItems.length
  ? JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqSchemaItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  : null

const CONTENT_FACTORY_INSPECTOR_SCRIPT = "(function(){\nvar protocol=3;\nvar params=new URLSearchParams(window.location.search);\nif(!params.has('cfInspector'))return;\nfunction post(payload){try{window.parent.postMessage(Object.assign({source:'content-factory-inspector',protocolVersion:protocol},payload),'*');}catch(e){}}\nif(window.__cfArticleInspectorInstalled){post({type:'ready',mode:window.__cfArticleInspectorMode||'comment'});return;}\nwindow.__cfArticleInspectorInstalled=true;window.__cfArticleInspectorProtocolVersion=protocol;window.__cfArticleInspectorMode='comment';\nvar style=document.createElement('style');\nstyle.textContent='[data-cf-component-id]{cursor:crosshair}.cf-inspector-hover,.cf-inspector-selected{outline:2px solid #7c3aed!important;outline-offset:3px}.cf-inspector-selected{outline-color:#2563eb!important}#cf-inspector-label{position:fixed;z-index:2147483647;pointer-events:none;border-radius:6px;background:#111827;color:white;padding:4px 8px;font:600 12px/1.4 ui-sans-serif,system-ui,sans-serif;box-shadow:0 8px 24px rgba(15,23,42,.22)}';\ndocument.head.appendChild(style);\nvar label=document.createElement('div');\nlabel.id='cf-inspector-label';label.hidden=true;document.body.appendChild(label);\nvar active=null;var selected=null;var measureQueued=false;\nfunction mode(){return window.__cfArticleInspectorMode||'comment';}\nfunction rect(el){var r=el.getBoundingClientRect();return{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};}\nfunction viewport(){return{width:window.innerWidth,height:window.innerHeight,scrollX:window.scrollX,scrollY:window.scrollY,devicePixelRatio:window.devicePixelRatio||1};}\nfunction esc(value){return String(value||'').replace(/\"/g,'\\\\\"');}\nfunction cleanText(el){return String((el&&el.textContent)||'').replace(/\\s+/g,' ').trim();}\nfunction textHash(value){var text=String(value||'');var hash=0;for(var i=0;i<text.length;i++){hash=((hash<<5)-hash)+text.charCodeAt(i);hash|=0;}return String(hash);}\nfunction domPath(el){var parts=[];var node=el;while(node&&node.nodeType===1&&node!==document.body){var tag=(node.tagName||'').toLowerCase();var index=1;var sibling=node.previousElementSibling;while(sibling){if((sibling.tagName||'').toLowerCase()===tag)index++;sibling=sibling.previousElementSibling;}parts.unshift(tag+':nth-of-type('+index+')');node=node.parentElement;}return parts.length?'body > '+parts.join(' > '):'body';}\nfunction visibleEnough(el){if(!el||!el.getBoundingClientRect)return false;var r=el.getBoundingClientRect();return r.width>=24&&r.height>=16;}\nfunction fallbackLabel(el,kind,index){var text=cleanText(el);if(text)return text.slice(0,100);if(kind==='image')return el.getAttribute('alt')||'Image '+index;if(kind==='toc')return'Table of contents';if(kind==='references'||kind==='authoritative-references')return'Authoritative References';if(kind==='disclaimer')return'Disclaimer';if(kind==='events-cta')return'Upcoming events CTA';if(kind==='company-highlight-cta')return'Highlighted CTA';if(kind==='cta')return'Call to action '+index;return kind+' '+index;}\nfunction setBoundary(node,id,type,label){if(!node||node.nodeType!==1||!visibleEnough(node))return false;if(node.hasAttribute('data-cf-component-id'))return false;var nearest=node.closest&&node.closest('[data-cf-component-id]');if(nearest&&nearest!==node&&nearest.getAttribute('data-cf-component-id')!=='article')return false;node.setAttribute('data-cf-component-id',id);node.setAttribute('data-cf-component-type',type);node.setAttribute('data-cf-component-label',label);node.setAttribute('data-cf-dom-boundary','true');return true;}\nfunction queryAll(selector){try{return Array.prototype.slice.call(document.querySelectorAll(selector));}catch(e){return[];}}\nfunction markKnownBoundaries(){\nvar groups=[\n{id:'toc',type:'toc',label:'Table of contents',selectors:['[data-article-toc-placeholder]','[data-article-toc]','[data-component=\"table-of-contents\"]','[data-semantic*=\"table-of-contents\" i]','[data-semantic*=\"sidebar-toc\" i]','nav[aria-label*=\"Table of contents\" i]','nav[aria-label*=\"contents\" i]']},\n{id:'authoritative-references',type:'references',label:'Authoritative References',selectors:['[data-cf-component-id=\"authoritative-references\"]','[data-component*=\"authoritative-reference\" i]','section[aria-label*=\"Authoritative references\" i]']},\n{id:'references',type:'references',label:'Authoritative References',selectors:['[data-component*=\"reference\" i]','section[aria-label*=\"reference\" i]','section[id*=\"reference\" i]','[class*=\"references\" i]','[class*=\"reference-list\" i]']},\n{id:'disclaimer',type:'disclaimer',label:'Disclaimer',selectors:['[role=\"note\"][aria-label*=\"Legal\" i]','[aria-label*=\"Disclaimer\" i]','[class*=\"disclaimer\" i]','[class*=\"legal-notice\" i]']},\n{id:'events-cta',type:'events-cta',label:'Upcoming events CTA',selectors:['.events-cta','[class*=\"events-cta\" i]','section[aria-label*=\"Upcoming events\" i]','section[aria-label*=\"webinar\" i]']},\n{id:'highlight-cta',type:'company-highlight-cta',label:'Highlighted CTA',selectors:['[class*=\"highlight\" i][class*=\"cta\" i]','[class*=\"community\" i][class*=\"events\" i]']},\n{id:'cta',type:'company-cta',label:'Company CTA',selectors:['section[aria-label*=\"call to action\" i]','[class*=\"company-cta\" i]','[class*=\"resource-cta\" i]','[class*=\"cta\" i]']}\n];\nfor(var g=0;g<groups.length;g++){var group=groups[g];for(var s=0;s<group.selectors.length;s++){var nodes=queryAll(group.selectors[s]);for(var i=0;i<nodes.length;i++){setBoundary(nodes[i],group.id,group.type,group.label);}}}\n}\nfunction genericKind(node){var tag=(node.tagName||'component').toLowerCase();var classes=String(node.className||'').toLowerCase();var semantic=String(node.getAttribute('data-semantic')||'').toLowerCase();var aria=String(node.getAttribute('aria-label')||'').toLowerCase();var text=cleanText(node).toLowerCase();if(semantic.indexOf('toc')>=0||aria.indexOf('contents')>=0)return'toc';if(text.indexOf('authoritative references')>=0)return'authoritative-references';if(classes.indexOf('reference')>=0||aria.indexOf('reference')>=0)return'references';if(classes.indexOf('disclaimer')>=0||aria.indexOf('legal')>=0||text.indexOf('disclaimer')===0)return'disclaimer';if(classes.indexOf('events-cta')>=0||text.indexOf('upcoming events')>=0||text.indexOf('event calendar')>=0)return'events-cta';if(classes.indexOf('highlight')>=0&&classes.indexOf('cta')>=0)return'company-highlight-cta';if(tag==='img'||tag==='figure')return'image';if(tag==='a'||tag==='button'||node.getAttribute('role')==='button'||classes.indexOf('cta')>=0)return'cta';if(tag==='h1'||tag==='h2'||tag==='h3')return'heading';if(tag==='ul'||tag==='ol')return'list';if(tag==='table')return'table';if(tag==='blockquote')return'quote';return'section';}\nfunction genericId(kind,index){if(kind==='toc')return'toc';if(kind==='references')return'references';if(kind==='authoritative-references')return'authoritative-references';if(kind==='disclaimer')return'disclaimer';if(kind==='events-cta')return'events-cta';if(kind==='company-highlight-cta')return'highlight-cta';if(kind==='cta')return'cta';return'dom:'+kind+':'+index;}\nfunction ensureFallbackBoundaries(){\nvar root=document.querySelector('article')||document.querySelector('main')||document.body;if(!root)return;\nmarkKnownBoundaries();\nvar selectors=['main section','article section','section','h1','h2','h3','figure','img','table','blockquote','[role=\"button\"]','button','a[class*=\"cta\" i]','[class*=\"cta\" i]','[class*=\"callout\" i]','[class*=\"reference\" i]','[class*=\"disclaimer\" i]','[data-semantic*=\"toc\" i]','ul','ol'];\nvar nodes=[];for(var s=0;s<selectors.length;s++){var found=queryAll(selectors[s]);for(var i=0;i<found.length;i++){var el=found[i];if(!root.contains(el)&&el!==root)continue;if(!visibleEnough(el))continue;if(nodes.indexOf(el)===-1)nodes.push(el);}}\nif(!document.querySelector('[data-cf-component-id]')&&visibleEnough(root))nodes.unshift(root);\nfor(var n=0;n<nodes.length;n++){var node=nodes[n];if(node.hasAttribute('data-cf-component-id'))continue;var kind=genericKind(node);setBoundary(node,genericId(kind,n+1),kind,fallbackLabel(node,kind,n+1));}\n}\nfunction componentNodes(){ensureFallbackBoundaries();var nodes=Array.prototype.slice.call(document.querySelectorAll('[data-cf-component-id]'));var byId={};var ordered=[];for(var i=0;i<nodes.length;i++){var node=nodes[i];if(!visibleEnough(node))continue;var id=node.getAttribute('data-cf-component-id')||'';if(!id)continue;var current=byId[id];if(current&&current!==node){if(current.contains(node)){var pos=ordered.indexOf(current);if(pos>=0)ordered[pos]=node;byId[id]=node;continue;}if(node.contains(current))continue;}if(!current)ordered.push(node);byId[id]=node;}return ordered;}\nfunction byId(id){var nodes=componentNodes();for(var i=0;i<nodes.length;i++){if(nodes[i].getAttribute('data-cf-component-id')===id)return nodes[i];}return null;}\nfunction componentData(el,type,event){var id=el.getAttribute('data-cf-component-id')||'';var r=rect(el);var text=cleanText(el);var payload={type:type,componentId:id,componentType:el.getAttribute('data-cf-component-type')||'',sourceSectionId:el.getAttribute('data-cf-source-section-id')||'',label:el.getAttribute('data-cf-component-label')||id,selector:'[data-cf-component-id=\"'+esc(id)+'\"]',domPath:domPath(el),textHash:textHash(text),textExcerpt:text.slice(0,500),rect:r,viewport:viewport(),pageUrl:window.location.href,previewMode:params.get('cfPreviewMode')||params.get('previewMode')||''};if(event){var width=r.width||1;var height=r.height||1;var x=Math.max(0,Math.min(1,(event.clientX-r.left)/width));var y=Math.max(0,Math.min(1,(event.clientY-r.top)/height));payload.click={x:event.clientX,y:event.clientY,pageX:event.pageX,pageY:event.pageY};payload.anchor={x:x,y:y,createdFrom:'live_preview_click'};}return payload;}\nfunction allComponents(){var nodes=componentNodes();var out=[];for(var i=0;i<nodes.length;i++){out.push(componentData(nodes[i],'component'));}return out;}\nfunction postMeasure(){post({type:'measure',components:allComponents()});}\nfunction queueMeasure(){if(measureQueued)return;measureQueued=true;window.requestAnimationFrame(function(){measureQueued=false;postMeasure();});}\nfunction setSelected(id){if(selected)selected.classList.remove('cf-inspector-selected');selected=id?byId(id):null;if(selected)selected.classList.add('cf-inspector-selected');}\nfunction show(el){var box=el.getBoundingClientRect();var name=el.getAttribute('data-cf-component-label')||el.getAttribute('data-cf-component-id')||'component';var kind=el.getAttribute('data-cf-component-type')||'component';label.textContent=name+' ('+kind+')';label.style.left=Math.max(8,Math.min(box.left,window.innerWidth-260))+'px';label.style.top=Math.max(8,box.top-32)+'px';label.hidden=false;}\nfunction suppress(event){event.preventDefault();event.stopPropagation();if(event.stopImmediatePropagation)event.stopImmediatePropagation();}\ndocument.addEventListener('mouseover',function(event){ensureFallbackBoundaries();var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;if(!target)return;if(active&&active!==target)active.classList.remove('cf-inspector-hover');active=target;target.classList.add('cf-inspector-hover');show(target);post(componentData(target,'hover'));},true);\ndocument.addEventListener('mouseout',function(event){if(!active)return;var next=event.relatedTarget;if(next&&active.contains(next))return;active.classList.remove('cf-inspector-hover');active=null;label.hidden=true;},true);\ndocument.addEventListener('click',function(event){ensureFallbackBoundaries();var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;var interactive=event.target&&event.target.closest?event.target.closest('a,button,input,select,textarea,label,summary,[role=\"button\"]'):null;if(target){suppress(event);setSelected(target.getAttribute('data-cf-component-id')||'');post(componentData(target,mode()==='comment'?'comment:create':'select',event));queueMeasure();return;}if(interactive){suppress(event);}},true);\ndocument.addEventListener('submit',function(event){suppress(event);},true);\ndocument.addEventListener('scroll',queueMeasure,true);window.addEventListener('resize',queueMeasure);\nwindow.addEventListener('message',function(event){var message=event.data;if(!message||typeof message!=='object'||message.source!=='founder-tools-inspector')return;if(message.type==='setMode'){window.__cfArticleInspectorMode=message.mode==='inspect'?'inspect':'comment';post({type:'ready',mode:mode()});}else if(message.type==='measureComponents'){postMeasure();}else if(message.type==='scrollToComponent'){var target=byId(message.componentId||'');if(target){target.scrollIntoView({block:'center',inline:'nearest'});setSelected(message.componentId||'');setTimeout(queueMeasure,80);}}else if(message.type==='setSelectedComponent'){setSelected(message.componentId||'');}});\npost({type:'ready',mode:mode()});\nsetTimeout(queueMeasure,0);\n})();"

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
      {faqStructuredData ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqStructuredData }} />
      ) : null}
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
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Where should a new Melbourne founder start?"} data-cf-source-section-id={"intro"}>
        <p><strong>{TOPIC}</strong> — {"Start with the gap you need to close. To meet other founders, technical peers and potential collaborators, use LaunchVic\u2019s events calendar and community-group listings. It includes Melbourne meetups, pitch nights, workshops and investor sessions, with filters for topic, location and event type."}</p>
        <p>{"For AI-focused learning and peer connections, MLAI is an Australian not-for-profit, volunteer community that runs events and offers founder-oriented tools. Check its current event calendar rather than assuming a particular Melbourne event or venue will be available."}</p>
        <p>{"Community participation is different from setting up a business. When you are ready to operate, use business.gov.au\u2019s starting-a-business guide to work through readiness, your customer and market, planning, business structure, registration, finances and getting customers. The best first move is the one that addresses your immediate uncertainty: the problem, the people needed to build, or the practical steps to trade."}</p>
        </div>
        <div id="launchvic-events" data-cf-component-id={"section:launchvic-events"} data-cf-component-type={"section"} data-cf-component-label={"Find Melbourne startup events through LaunchVic"} data-cf-source-section-id={"launchvic-events"}>
          <h2>{"Find Melbourne startup events through LaunchVic"}</h2>
          <p>{"LaunchVic\u2019s Events & Networking page is a useful starting point for finding startup events in Victoria. Its calendar includes founder meetups, pitch nights, workshops and investor sessions in Melbourne and regional locations, as well as online events. Treat it as a statewide discovery tool rather than assuming every listing is in Melbourne."}</p>
          <p>{"Use the calendar filters for topic, location and event type to narrow the options. Select Melbourne when an in-person local event is needed, or choose an online format when that better suits your circumstances. Then read the organiser\u2019s own listing to understand who the event is for and whether it fits your current startup stage or industry."}</p>
          <p>{"Choose the format based on the conversation you need. A founder meetup may suit peer discussion, while a workshop can be useful when you want to learn around a defined topic. Pitch nights and investor sessions are different settings again, so it helps to arrive with a clear question rather than treating every event as the same networking opportunity."}</p>
          <p>{"For contact that continues after a single event, look at specialised community groups. LaunchVic describes these groups as networks organised around shared industries, experiences or startup stages, with regular meetups and ongoing peer support. A group that matches your immediate question is likely to make follow-up conversations more relevant."}</p>
          <div data-cf-component-id={"image:launchvic-events"} data-cf-component-type={"image"} data-cf-component-label={"Image: Find Melbourne startup events through LaunchVic"} data-cf-source-section-id={"launchvic-events"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-2131a3f3-8f83-45ea-a8f8-dfd0205ed5f9.jpg?alt=media&token=3453e634-00a5-49ce-94bd-87339567ee8c"
            alt="Blurred hand passing notebooks, coffee cups and event flyers on a Melbourne startup meetup table"
            caption="Find Melbourne startup events through LaunchVic"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="Before you book" variant="purple">
            {"Check the organiser\u2019s current date, format, location, cost and attendance requirements before booking."}
          </QuoteBlock>
        </div>
        <div id="ai-community" data-cf-component-id={"section:ai-community"} data-cf-component-type={"section"} data-cf-component-label={"Use an AI community for learning and collaboration"} data-cf-source-section-id={"ai-community"}>
          <h2>{"Use an AI community for learning and collaboration"}</h2>
          <p>{"MLAI describes itself as a not-for-profit, volunteer community focused on AI and machine learning in Australia. Its website lists AI events and founder tools, including workshops and playbooks. Consider these activities for technical learning and peer discussion, rather than as evidence of customer demand."}</p>
          <p>{"Use technical conversations for technical questions. For example, you might ask how others approach an AI workflow, prototype or data problem. Use prospective customer conversations for a different question: whether the problem matters, how it is handled now and whether someone would consider your proposed solution. One type of conversation does not replace the other."}</p>
          <p>{"Check MLAI\u2019s current event and activity details before relying on a particular way to participate. Melbourne events and online options can change, and attendance or places should not be assumed."}</p>
        </div>
        <div data-cf-component-id={"audience-grid:choose-your-conversation"} data-cf-component-type={"audience-grid"} data-cf-component-label={"Which conversation do you need first?"}>
          <AudienceGrid
            heading="Which conversation do you need first?"
            cards={[
            {
              title: "Have a prototype? Seek customer insight",
              description: "Use LaunchVic\u2019s topic and location filters to find relevant industry or founder conversations. Bring a question about the customer\u2019s existing workflow, then distinguish peer feedback from direct customer research.",
              variant: "orange",
            },
            {
              title: "Know the problem? Seek technical perspective",
              description: "Consider MLAI\u2019s learning and community activities to discuss AI workflows, prototypes or data questions with peers. Check current Melbourne or online participation details before making plans.",
              variant: "orange",
            },
            ]}
          />
        </div>
        <div id="customer-problem-brief" data-cf-component-id={"section:customer-problem-brief"} data-cf-component-type={"section"} data-cf-component-label={"Give your AI idea a customer and a cost model"} data-cf-source-section-id={"customer-problem-brief"}>
          <h2>{"Give your AI idea a customer and a cost model"}</h2>
          <p>{"Start with a short business brief before asking for feedback. A lean plan should state the problem, the customer, how the business could make money, its startup and monthly costs, and how it expects to acquire customers. This gives people something specific to challenge, rather than asking whether an AI demo seems interesting."}</p>
          <p>{"Describe the person or organisation that experiences the problem, how they handle it now, and what you still need to learn. That may include whether the problem is frequent enough to matter, who would pay, and what route could reach prospective customers. Market research can help founders understand customers, competitors and whether a product or service is likely to succeed."}</p>
          <p>{"For example, a hypothetical founder might test an AI tool that drafts routine course-enquiry responses for a training provider. The first version need not automate every customer interaction. The founder could focus on a narrow set of common enquiries, then ask whether drafted responses are useful enough for staff to review and send."}</p>
          <p>{"Keep the first AI test conservative. Use synthetic or permissioned examples, retain human review, and compare the draft-assisted workflow with the existing process. These are practical test-design suggestions, not legal requirements. Record costs that need investigation, including model or API use and the founder's time to review outputs, alongside the wider startup and ongoing costs in the business brief."}</p>
          <div data-cf-component-id={"image:customer-problem-brief"} data-cf-component-type={"image"} data-cf-component-label={"Image: Give your AI idea a customer and a cost model"} data-cf-source-section-id={"customer-problem-brief"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-7fa5d9c3-9e2e-461a-a7e5-6ee5d0da9b0e.jpg?alt=media&token=e795f0a4-02d3-472d-96f8-d89d11aa03ab"
            alt="Notebook with customer personas, cost calculations, and startup notes on a shared workspace desk"
            caption="Give your AI idea a customer and a cost model"
            width={1200}
            height={800}
          />
          </div>
          <h3>{"Define the customer and the problem"}</h3>
          <p>{"Complete this working note before your next conversation: \u201cMy prospective customer is ___. They need to ___, currently using ___. My idea would ___. The payer could be ___, and I would reach them through ___. Estimated startup costs are ___ and monthly costs are ___. The assumption I most need to test is ___.\u201d Mark guesses as untested; this is a planning exercise, not evidence of demand."}</p>
          <h3>{"Keep the first AI test narrow"}</h3>
          <p>{"For the hypothetical course-enquiry tool, write a trial note identifying which enquiry types are in scope, what the current response process looks like, what reviewers will check, and what would make you stop or revise the test. Record review time, corrections and model or API costs alongside whether the drafts are useful. Decide your acceptance criteria before testing; no results are assumed."}</p>
        </div>
        <div id="useful-conversations" data-cf-component-id={"section:useful-conversations"} data-cf-component-type={"section"} data-cf-component-label={"Turn a meetup conversation into a useful follow-up"} data-cf-source-section-id={"useful-conversations"}>
          <h2>{"Turn a meetup conversation into a useful follow-up"}</h2>
          <p>{"Startup meetups, pitch nights, workshops and investor sessions can create useful opportunities to meet people at a similar stage or with relevant experience. Arrive with a short customer brief: the problem you are exploring, who experiences it, and one question you have not resolved. This is more useful than a broad claim that you want to use AI, because it gives the other person something specific to respond to."}</p>
          <p>{"A practical opening question is: \u201cHow do you handle this task today, and what makes it difficult?\u201d It asks about the current workflow rather than asking someone to agree with your proposed solution. Listen for the steps involved, the points of friction and the terms people use to describe the problem. Those details can help you refine market research and a lean business plan."}</p>
          <p>{"If the conversation surfaces a relevant uncertainty, ask permission for a small, concrete follow-up. For example, you might ask whether the person would be willing to discuss a non-sensitive workflow example or talk through what a small test would need to show. State what you want to learn and make it easy for them to decline."}</p>
          <p>{"Peer feedback can sharpen a question, but it is not evidence of customer demand. A busy event, enthusiastic comments or a conversation with an investor does not validate a product or secure funding. Treat each interaction as one input, then look for direct customer research and evidence that people have a real problem worth solving."}</p>
          <div data-cf-component-id={"image:useful-conversations"} data-cf-component-type={"image"} data-cf-component-label={"Image: Turn a meetup conversation into a useful follow-up"} data-cf-source-section-id={"useful-conversations"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-88f451c6-fbb7-4a3f-9556-efa382128d8b.jpg?alt=media&token=ca41f028-faa8-4bff-af41-ab8e2a7c7b36"
            alt="Close-up of two founders swapping phone numbers after a startup meetup conversation"
            caption="Turn a meetup conversation into a useful follow-up"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="business-foundations" data-cf-component-id={"section:business-foundations"} data-cf-component-type={"section"} data-cf-component-label={"Use official guidance for business setup"} data-cf-source-section-id={"business-foundations"}>
          <h2>{"Use official guidance for business setup"}</h2>
          <p>{"Before committing to a Melbourne startup, assess whether you are ready for the work and financial uncertainty involved. Business.gov.au says founders need a solid idea, funding, business skills, resilience and discipline. It also recommends considering whether the activity is a business or a hobby, as the obligations can differ. Start with a clear view of the problem you will solve, the customer, how the venture will earn money and the costs you expect to carry."}</p>
          <p>{"Choose a legal structure based on your circumstances rather than copying another founder. Business.gov.au notes that structure affects required registrations and legal and tax obligations. Sprintlaw similarly describes trade-offs around cost, control, tax and liability. A sole trader, partnership and company can suit different levels of risk, ownership and growth plans; there is no single default structure for an AI startup. Seek business, legal or tax advice if the choice or its obligations are unclear."}</p>
          <p>{"Use the official business.gov.au starting-a-business guide to work through defining and planning the business, registration and finance. Its guide also provides a checklist in PDF and Word formats. As your plan becomes more specific, identify the registrations, licences and permits that apply to your situation, and keep financial planning part of the setup rather than an afterthought."}</p>
        </div>
        <div id="next-move" data-cf-component-id={"section:next-move"} data-cf-component-type={"section"} data-cf-component-label={"Choose one place and one question to start with"} data-cf-source-section-id={"next-move"}>
          <h2>{"Choose one place and one question to start with"}</h2>
          <p>{"Start with the uncertainty that would most change your next decision. If you need to learn whether a customer problem is real, bring a short note describing the customer, problem and your current assumption to a conversation with a prospective customer. A relevant founder meetup, workshop or community group can help you refine the question or seek introductions, but is not a substitute for customer research. Melbourne and Victoria have events and networks for founders at different stages, including idea validation and co-founder searches."}</p>
          <p>{"If your question is about setting up the business, begin with the official business.gov.au starting guide. Its sequence covers defining and planning the business, registration, finances and getting customers. Write down the points that need professional advice, such as legal structure, tax or other obligations, rather than guessing or delaying the question."}</p>
          <p>{"Progress does not mean joining every network or rushing to seek investment. It means replacing one important unknown with clearer evidence, a useful conversation or a documented next step."}</p>
          <div data-cf-component-id={"image:next-move"} data-cf-component-type={"image"} data-cf-component-label={"Image: Choose one place and one question to start with"} data-cf-source-section-id={"next-move"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-75087437-03d8-45bf-8ea8-daa3972d9c76.jpg?alt=media&token=db4f3d25-ec93-4577-a053-0228c1a152d6"
            alt="Small team discussing customer problem notes at a caf\u00e9 table before choosing their next research question"
            caption="Choose one place and one question to start with"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free worksheet"
            title={"Melbourne AI Startup Discovery Worksheet"}
            description="A fill-in worksheet for clarifying an AI startup idea, choosing relevant Melbourne or online events, preparing customer conversations and tracking setup questions."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-resources%2Fstartups-in-melbourne-for-ai-builders-and-new-founders-worksheet-840ec247.pdf?alt=media&token=48697220-d17e-4b8c-989e-c1286b9df479"
            accent="purple"
            previewCards={[
              {
                title: "Customer Brief Prompts",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Event Planning",
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
            {id: 1, href: "https://launchvic.org/events-and-networking/", title: "Events & Networking | LaunchVic", publisher: "launchvic.org", category: "guide"},
            {id: 2, href: "https://sprintlaw.com.au/articles/business-startup-checklist/", title: "Business Startup Checklist Australia | Sprintlaw Australia", publisher: "sprintlaw.com.au", category: "guide"},
            {id: 3, href: "https://business.gov.au/guide/starting", title: "Guide to starting a business | business.gov.au", publisher: "business.gov.au", category: "guide"},
            {id: 4, href: "https://mlai.au/", title: "MLAI | Empowering Australia's AI Community", publisher: "mlai.au", category: "guide"},
          ]}
          heading="Sources & further reading"
        />

        <ArticleDisclaimer />

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Find an AI community conversation"
            body="MLAI is an Australian not-for-profit, volunteer AI community. Browse its event calendar and check current locations, formats and attendance details for an activity that fits your technical question."
            buttonText="Explore MLAI events"
            buttonHref="https://mlai.au/events"
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
