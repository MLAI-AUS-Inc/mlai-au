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
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'

export const useCustomHeader = true

const TOPIC = "Startup Business Investment Before Raising Capital"
export const CATEGORY = "featured"
export const SLUG = "startup-business-investment-before-raising-capital"
export const DATE_PUBLISHED = "2026-07-22"
export const DATE_MODIFIED = "2026-07-22"
export const DESCRIPTION = "Startup business investment preparation for founders"
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-b2cb4460-1a26-41da-a4b8-86b06dc14699.jpg?alt=media&token=826c3ff5-7a9f-47d2-893b-ab75cc7f1279"
const HERO_IMAGE_ALT = "Australian startup founder pauses thoughtfully before an investor meeting, candid close-up conversation scene"
export const FEATURED_FOCUS = "funding"

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
  { id: 1, question: "What should be in an investor-ready evidence pack?", answer: "An investor-ready evidence pack should contain current business information, core assumptions, supporting evidence, financial numbers, and material on compliance, intellectual property and legal issues." },
  { id: 2, question: "What are common startup funding structures?", answer: "Common funding structures include equity, convertible instruments such as convertible notes or SAFEs, and loans; equity gives ownership, convertibles may become equity later, and loans create repayment obligations." },
  { id: 3, question: "Why should investor materials be updated?", answer: "Investor materials should be updated because customer conversations, product work and market learning can change the business story, assumptions and supporting evidence." },
  { id: 4, question: "What should founders check before accepting startup funds in Australia?", answer: "Founders should check the implications of issuing equity, using a convertible instrument or taking a loan, including disclosure obligations, investor requirements and any personal-guarantee exposure, before accepting funds." },
]

export const summaryHighlights = {
  heading: "Key facts: Startup Business Investment Before Raising Capital",
  intro: "Startup business investment preparation for founders",
  items: [
    { label: "What is a good start-up investment?", description: "A suitable start-up investment supports a defined business milestone, such as product development, market research, early hiring or operational growth, and fits the company\u2019s stage and funding needs." },
    { label: "How should founders prepare before raising capital?", description: "Founders should define the milestone, amount and use of funds, then keep business evidence, financial numbers, compliance, intellectual-property and legal materials current before investor outreach." },
    { label: "How can a startup assess investor fit?", description: "A startup can assess fit by researching an investor\u2019s specialisation and past investments, then testing whether their focus suits the business\u2019s sector, stage and proposed funding path." },
  ],
}

export const articleMeta = {
  title: "Startup Business Investment Before Raising Capital",
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
  { question: "What is a good start-up investment?", answer: "A suitable start-up investment supports a defined business milestone, such as product development, market research, early hiring or operational growth, and fits the company\u2019s stage and funding needs." },
  { question: "How should founders prepare before raising capital?", answer: "Founders should define the milestone, amount and use of funds, then keep business evidence, financial numbers, compliance, intellectual-property and legal materials current before investor outreach." },
  { question: "How can a startup assess investor fit?", answer: "A startup can assess fit by researching an investor\u2019s specialisation and past investments, then testing whether their focus suits the business\u2019s sector, stage and proposed funding path." },
  { question: "What should be in an investor-ready evidence pack?", answer: "An investor-ready evidence pack should contain current business information, core assumptions, supporting evidence, financial numbers, and material on compliance, intellectual property and legal issues." },
  { question: "What are common startup funding structures?", answer: "Common funding structures include equity, convertible instruments such as convertible notes or SAFEs, and loans; equity gives ownership, convertibles may become equity later, and loans create repayment obligations." },
  { question: "Why should investor materials be updated?", answer: "Investor materials should be updated because customer conversations, product work and market learning can change the business story, assumptions and supporting evidence." },
  { question: "What should founders check before accepting startup funds in Australia?", answer: "Founders should check the implications of issuing equity, using a convertible instrument or taking a loan, including disclosure obligations, investor requirements and any personal-guarantee exposure, before accepting funds." },
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
        <div id="why-preparation-comes-first" data-cf-component-id={"section:why-preparation-comes-first"} data-cf-component-type={"section"} data-cf-component-label={"Why Preparation Comes Before the Raise"} data-cf-source-section-id={"why-preparation-comes-first"}>
        <p><strong>{TOPIC}</strong> — {"Startup business investment should begin with a clear growth objective, not with sending a pitch deck. Capital can help a young business move from idea to execution or support its next stage of growth. Common uses include product development, market research, early hiring and operating costs. The useful question is: what specific milestone would this money help the business reach?"}</p>
        <p>{"That milestone shapes the funding conversation. A founder developing an initial product may need a different plan from a business preparing to expand into a new market. Setting the goal, expected use of funds and current stage first gives founders a sounder basis for deciding whether external capital is appropriate now. It also makes later discussions about funding sources and a funding plan more focused."}</p>
        </div>
        <div data-cf-component-id={"audience-grid:founder-stage-grid"} data-cf-component-type={"audience-grid"} data-cf-component-label={"Prepare for the Stage You Are In"}>
          <AudienceGrid
            heading="Prepare for the Stage You Are In"
            cards={[
            {
              title: "Pre-product founders",
              description: "Define the validation milestone and the minimum resources needed for product development or market research.",
              variant: "purple",
            },
            {
              title: "Early-traction founders",
              description: "Connect the funding request to evidence from market testing, customer conversations or initial product learning.",
              variant: "purple",
            },
            {
              title: "Scaling founders",
              description: "Show how capital will support expansion, staffing, operational growth or further innovation.",
              variant: "purple",
            },
            ]}
          />
        </div>
        <div id="match-capital-to-milestone" data-cf-component-id={"section:match-capital-to-milestone"} data-cf-component-type={"section"} data-cf-component-label={"Match the Capital Type to the Milestone"} data-cf-source-section-id={"match-capital-to-milestone"}>
          <h2>{"Match the Capital Type to the Milestone"}</h2>
          <p>{"Start with the next outcome the business needs to achieve, not a general desire to raise money. Early capital may be used for product development, market testing or initial hiring. At a later point, a startup may need funds for expansion, operational growth or further innovation. Define the milestone in plain terms, the work required to reach it and the funding needed to complete that work. This gives founders a clearer basis for deciding whether a raise fits the company\u2019s current stage and for explaining the use of funds to potential investors."}</p>
          <p>{"Capital structures create different commitments. Equity funding gives investors an ownership interest in the company. Convertible instruments, including convertible notes or SAFEs, can convert into equity later, so their valuation cap and discount mechanics need to be documented clearly. A loan creates repayment obligations, and a personal guarantee can expose a founder personally. Before choosing a structure, consider the ownership being offered, any repayment exposure, the timing of the raise and the obligations that continue after funds arrive. Check whether a proposed share issue creates disclosure obligations and whether investors meet the relevant requirements. Get legal and financial advice before accepting funds, especially where the terms are complex or personal exposure is involved."}</p>
          <div data-cf-component-id={"image:match-capital-to-milestone"} data-cf-component-type={"image"} data-cf-component-label={"Image: Match the Capital Type to the Milestone"} data-cf-source-section-id={"match-capital-to-milestone"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3ecf666f-41bf-451d-8e88-68c3fb6c6a50.jpg?alt=media&token=ce0f97bb-999d-4407-b38d-b51f39f5d4da"
            alt="Hand sorting milestone notes beside coffee and a startup roadmap on a cluttered desk"
            caption="Match the Capital Type to the Milestone"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="Choose for the milestone" variant="purple">
            {"Do not choose a funding instrument solely because it is common in your network."}
          </QuoteBlock>
        </div>
        <div id="assemble-investor-evidence" data-cf-component-id={"section:assemble-investor-evidence"} data-cf-component-type={"section"} data-cf-component-label={"Build an Investor-Ready Evidence Pack"} data-cf-source-section-id={"assemble-investor-evidence"}>
          <h2>{"Build an Investor-Ready Evidence Pack"}</h2>
          <p>{"Treat your investor materials as a working evidence pack, not a fixed pitch document. business.gov.au recommends a toolbox of dynamic documents that can change as you learn more in the marketplace. Keep the core story, assumptions and supporting information aligned as customer conversations, product work and market learning develop. The pack should also address compliance, intellectual property and legal issues, so questions in these areas do not appear as an afterthought."}</p>
          <p>{"State how much capital you are seeking, what the funds are intended to support, and what progress that spend is expected to unlock. Startup funding can support work such as product development, market research, staffing and operational growth, but the relevant mix depends on the business and its stage."}</p>
          <div data-cf-component-id={"image:assemble-investor-evidence"} data-cf-component-type={"image"} data-cf-component-label={"Image: Build an Investor-Ready Evidence Pack"} data-cf-source-section-id={"assemble-investor-evidence"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-382dde3d-3d12-4f18-845c-3e49e4cdaa54.jpg?alt=media&token=2987a6ec-0213-461e-8d8a-9f72e5dcd78f"
            alt="Marked-up investor evidence pack, laptop and market notes spread across a shared workspace desk"
            caption="Build an Investor-Ready Evidence Pack"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="" variant="purple">
            {"Treat investor materials as working documents: update assumptions and evidence as customer, product and market learning changes."}
          </QuoteBlock>
        </div>
        <div id="plan-outreach-before-contact" data-cf-component-id={"section:plan-outreach-before-contact"} data-cf-component-type={"section"} data-cf-component-label={"Plan the Raise Before Contacting Investors"} data-cf-source-section-id={"plan-outreach-before-contact"}>
          <h2>{"Plan the Raise Before Contacting Investors"}</h2>
          <p>{"Start with a funding plan that connects the raise to a clear business milestone. Define the amount you need, the stage your business is in, and what the capital is intended to support. Product development, market research, staffing and operational growth can all require funding, but the use of funds should fit the business\u2019s current goals and stage."}</p>
          <p>{"Build a working investor toolbox before outreach. business.gov.au recommends using documents that can be updated as you learn from the market. Keep core business materials and numbers current, and include matters such as compliance, intellectual property and legal issues."}</p>
          <p>{"Research each investor before you make contact. Look at what they specialise in, the investments they have made, and the reasons behind those investments. Use that research to decide whether there is a genuine fit, then prepare questions and ask for feedback."}</p>
          <h3>{"Match the raise to the next milestone"}</h3>
          <p>{"A funding request is easier to explain when it is tied to a defined next step for the business. Set the amount and intended use of capital before starting outreach, then make sure they align with your business goals and stage of development."}</p>
          <h3>{"Prepare materials and target the right people"}</h3>
          <p>{"Keep your documents, numbers and key legal considerations ready to update."}</p>
        </div>
        <div data-cf-component-id={"step-list:raise-preparation-sequence"} data-cf-component-type={"step-list"} data-cf-component-label={"A Four-Step Raise Preparation Sequence"}>
          <ArticleStepList
            title="A Four-Step Raise Preparation Sequence"
            steps={[
            "Define the next milestone and intended use of funds.",
            "Assemble current business, compliance, intellectual-property and financial materials.",
            "Research investors whose focus fits the startup\u2019s stage and needs.",
            "Check the funding structure and obtain legal or financial advice before accepting funds.",
            ]}
            accent="indigo"
          />
        </div>
        <div id="find-investors-with-fit" data-cf-component-id={"section:find-investors-with-fit"} data-cf-component-type={"section"} data-cf-component-label={"Find Investors Who Fit Your Startup"} data-cf-source-section-id={"find-investors-with-fit"}>
          <h2>{"Find Investors Who Fit Your Startup"}</h2>
          <p>{"This helps you focus on people or funds whose interests connect to your startup\u2019s sector, stage and funding needs."}</p>
          <p>{"Start with the funding plan for your business. Consider what the capital is for, such as product development, market research, staffing or operational growth, then look for funding sources that fit that plan and your current stage. Australian early-stage businesses may approach government sources or private-sector funds where relevant. In each conversation, test for genuine alignment: does the investor understand the opportunity, and does their focus suit the funding path you are proposing?"}</p>
          <div data-cf-component-id={"image:find-investors-with-fit"} data-cf-component-type={"image"} data-cf-component-label={"Image: Find Investors Who Fit Your Startup"} data-cf-source-section-id={"find-investors-with-fit"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-942ee013-938b-46de-aad9-7fd6f720f5c1.jpg?alt=media&token=a98acdd0-de6b-4d4f-9e95-0671714f8821"
            alt="Founder listening intently to an investor during a close candid startup funding conversation"
            caption="Find Investors Who Fit Your Startup"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="Focus on fit" variant="purple">
            {"A smaller, well-researched investor shortlist is more useful than broad outreach to people whose investment focus does not match the business."}
          </QuoteBlock>
        </div>
        <div id="take-the-next-ready-step" data-cf-component-id={"section:take-the-next-ready-step"} data-cf-component-type={"section"} data-cf-component-label={"Make Readiness Your First Fundraising Milestone"} data-cf-source-section-id={"take-the-next-ready-step"}>
          <h2>{"Make Readiness Your First Fundraising Milestone"}</h2>
          <p>{"Treat fundraising readiness as a business milestone before it becomes an investor outreach task. Define the next milestone the capital must support, such as product development, market research, staffing or operational growth. Then set a funding plan that fits your business stage, goals and capital needs. A clear purpose helps you assess whether a proposed funding source is suitable."}</p>
          <p>{"business.gov.au recommends documents that can be updated as you learn, including material on compliance, intellectual property and legal issues. Be ready to explain your numbers, and research investors before contacting them so you understand their focus and past investments. Before accepting funds, check the implications of issuing equity, using a convertible instrument or taking on a loan. Australian fundraising and personal-guarantee questions can have legal and financial consequences, so obtain appropriate professional advice."}</p>
          <ul>
            <li>{"Name the milestone the capital will fund and why it matters now."}</li>
            <li>{"Keep business evidence, numbers and core documents current."}</li>
            <li>{"Match investor outreach and funding structure to your stage, then seek professional advice before signing."}</li>
          </ul>
          <div data-cf-component-id={"image:take-the-next-ready-step"} data-cf-component-type={"image"} data-cf-component-label={"Image: Make Readiness Your First Fundraising Milestone"} data-cf-source-section-id={"take-the-next-ready-step"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ec22b46a-5a09-42df-8972-c5e7c398992f.jpg?alt=media&token=cad8900b-b770-428e-8c56-ffa80d0ca6ee"
            alt="Founders in casual planning meeting defining their next startup growth milestone before fundraising"
            caption="Make Readiness Your First Fundraising Milestone"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free checklist"
            title={"Startup Fundraising Readiness Checklist"}
            description="Use this practical checklist to define the raise, maintain investor-ready evidence, identify aligned investors and review funding obligations before accepting capital."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fstartup-business-investment-before-raising-capital-checklist-d875eec9.pdf?alt=media&token=722db8b6-a492-4b76-a214-636ec69243f0"
            accent="purple"
            previewCards={[
              {
                title: "Investor-ready pack",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Funding review",
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
            {id: 1, href: "https://vivatech.com/news/investment-checklist-for-startups-what-investors-want-to-see", title: "Startup Investment Checklist: A Guide to Securing Funding", publisher: "vivatech.com", description: "Authoritative reference supporting Startup Investment Checklist: A Guide to Securing Funding.", category: "guide"},
            {id: 2, href: "https://www.thatround.com/how-to-raise-capital-for-a-startup", title: "How To Raise Capital For a Startup | ThatRound", publisher: "thatround.com", description: "Authoritative reference supporting How To Raise Capital For a Startup | ThatRound.", category: "guide"},
            {id: 3, href: "https://stripe.com/au/resources/more/how-to-raise-capital-for-your-startup-a-guide-to-funding-stages-and-sources", title: "How to raise capital for your startup | Stripe", publisher: "stripe.com", description: "Authoritative reference supporting How to raise capital for your startup | Stripe.", category: "guide"},
            {id: 4, href: "https://gocardless.com/guides/posts/start-up-business-investment", title: "8 Ways to Raise Investment for Your Startup Business | GoCardless", publisher: "gocardless.com", description: "Authoritative reference supporting 8 Ways to Raise Investment for Your Startup Business | GoCardless.", category: "guide"},
            {id: 5, href: "https://business.gov.au/finance/funding/pitch-for-venture-capital", title: "Pitch for venture capital | business.gov.au", publisher: "business.gov.au", description: "Authoritative reference supporting Pitch for venture capital | business.gov.au.", category: "guide"},
            {id: 6, href: "https://legalvision.com.au/how-can-i-raise-capital-for-my-startup/", title: "How Can I Raise Capital for my Startup? | LegalVision", publisher: "legalvision.com.au", description: "Authoritative reference supporting How Can I Raise Capital for my Startup? | LegalVision.", category: "guide"},
            {id: 7, href: "https://law.temple.edu/10q/startups-entrepreneurs-options-and-strategies-for-funding-your-startup-or-growth-company/", title: "Startups & Entrepreneurs: Options and Strategies for Funding Your Startup or Growth Company - The Temple 10-Q", publisher: "law.temple.edu", description: "Authoritative reference supporting Startups & Entrepreneurs: Options and Strategies for Funding Your Startup or Growth Company - The Temple 10-Q.", category: "guide"},
            {id: 8, href: "https://business.gov.au/guide/starting", title: "Guide to starting a business | business.gov.au", publisher: "business.gov.au", description: "Authoritative reference supporting Guide to starting a business | business.gov.au.", category: "guide"},
            {id: 9, href: "https://stripe.com/resources/more/checklist-for-business-startups-what-founding-teams-need-to-do-first", title: "Start-up business checklist for founding teams | Stripe", publisher: "stripe.com", description: "Authoritative reference supporting Start-up business checklist for founding teams | Stripe.", category: "guide"},
            {id: 10, href: "https://stripe.com/au/resources/more/small-business-startup-capital-101-how-to-fund-your-early-days", title: "Small business startup capital: A guide | Stripe", publisher: "stripe.com", description: "Authoritative reference supporting Small business startup capital: A guide | Stripe.", category: "guide"},
            {id: 11, href: "https://sprintlaw.com.au/articles/startup-investment-in-australia-essential-legal-and-business-guide/", title: "Startup Investment in Australia | Sprintlaw Australia", publisher: "sprintlaw.com.au", description: "Authoritative reference supporting Startup Investment in Australia | Sprintlaw Australia.", category: "guide"},
          ]}
          heading="Sources & further reading"
        />

        <ArticleDisclaimer />

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Prepare Before You Raise"
            body="Set a clear funding milestone, organise current evidence and assess the obligations of the proposed capital structure before accepting investment."
            buttonText="Review your funding plan"
            buttonHref="#plan-outreach-before-contact"
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
