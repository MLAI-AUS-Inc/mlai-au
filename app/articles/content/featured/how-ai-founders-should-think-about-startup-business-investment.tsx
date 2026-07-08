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
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'

export const useCustomHeader = true

const TOPIC = "How AI Founders Should Think About Startup Business Investment"
export const CATEGORY = "featured"
export const SLUG = "how-ai-founders-should-think-about-startup-business-investment"
export const DATE_PUBLISHED = "2026-07-08"
export const DATE_MODIFIED = "2026-07-08"
export const DESCRIPTION = "Startup business investment choices before raising capital"
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-efd9fe81-754f-41a8-a170-d0e6db12501b.jpg?alt=media&token=ead28e83-51ac-4d49-a4d5-d491e7f0d86c"
const HERO_IMAGE_ALT = "AI founders reviewing startup investment options over a laptop before raising capital"
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
  { id: 1, question: "How should an AI founder decide what type of capital to seek?", answer: "The capital source should match the next risk the company must reduce, such as customer adoption, data defensibility, regulatory trust, sales motion, or a capital-intensive build." },
  { id: 2, question: "Why is the AI category important in fundraising?", answer: "The AI category shapes investor expectations because an AI-native product, AI-enabled workflow, infrastructure company, data-led business, and vertical-specific tool are judged in different ways." },
  { id: 3, question: "How much capital should an AI startup raise?", answer: "The raise amount should connect to the business plan, including runway, hiring, customer acquisition, infrastructure or model costs, sales cycles, and the next de-risking milestone." },
  { id: 4, question: "Do Australian early stage investor tax incentives matter?", answer: "Australian early stage innovation company tax incentives may shape investor conversations because Treasury describes concessional tax treatment for qualifying investments, but eligibility depends on specific tests." },
]

export const summaryHighlights = {
  heading: "Key facts: How AI Founders Should Think About Startup Business Investment",
  intro: "Startup business investment choices before raising capital",
  items: [
    { label: "What is a good start-up investment?", description: "A good start-up investment is backed by validated progress, clear customer need, and strong business evidence. For AI startups, investors also expect the AI to create a real advantage rather than act as a thin feature." },
    { label: "When should AI founders raise capital?", description: "AI founders should raise when capital can accelerate proof that is already underway. If the next customer, product, or evidence milestone can be reached without external capital, waiting may create a stronger position." },
    { label: "What should founders prepare before investor outreach?", description: "Founders should prepare a current evidence pack covering pitch materials, numbers, traction, legal position, intellectual property, and compliance. AI startups should also explain data advantage, model proof where relevant, and deployment risks." },
  ],
}

export const articleMeta = {
  title: "How AI Founders Should Think About Startup Business Investment",
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
  { question: "What is a good start-up investment?", answer: "A good start-up investment is backed by validated progress, clear customer need, and strong business evidence. For AI startups, investors also expect the AI to create a real advantage rather than act as a thin feature." },
  { question: "When should AI founders raise capital?", answer: "AI founders should raise when capital can accelerate proof that is already underway. If the next customer, product, or evidence milestone can be reached without external capital, waiting may create a stronger position." },
  { question: "What should founders prepare before investor outreach?", answer: "Founders should prepare a current evidence pack covering pitch materials, numbers, traction, legal position, intellectual property, and compliance. AI startups should also explain data advantage, model proof where relevant, and deployment risks." },
  { question: "How should an AI founder decide what type of capital to seek?", answer: "The capital source should match the next risk the company must reduce, such as customer adoption, data defensibility, regulatory trust, sales motion, or a capital-intensive build." },
  { question: "Why is the AI category important in fundraising?", answer: "The AI category shapes investor expectations because an AI-native product, AI-enabled workflow, infrastructure company, data-led business, and vertical-specific tool are judged in different ways." },
  { question: "How much capital should an AI startup raise?", answer: "The raise amount should connect to the business plan, including runway, hiring, customer acquisition, infrastructure or model costs, sales cycles, and the next de-risking milestone." },
  { question: "Do Australian early stage investor tax incentives matter?", answer: "Australian early stage innovation company tax incentives may shape investor conversations because Treasury describes concessional tax treatment for qualifying investments, but eligibility depends on specific tests." },
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
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Raise only after the investment case is clear"} data-cf-source-section-id={"intro"}>
        <p><strong>{TOPIC}</strong> — {"Startup business investment should be treated as a tool for scaling validated progress, not as proof that an AI startup is ready. A working prototype is no longer enough on its own. Building and testing AI products has become cheaper, so investors can now expect clearer traction, sharper positioning, and stronger business evidence before they take a meeting seriously."}</p>
        <p>{"For founders, the useful question is not simply \u201cCan we raise?\u201d It is \u201cDo we have an investment case?\u201d That case should show what kind of AI company you are building, why the product is more than a thin AI feature, who needs it, and what early numbers or customer signals support the story. Capital may be the right next step, but so might deeper validation, better vertical focus, or more disciplined preparation before fundraising."}</p>
        </div>
        <div data-cf-component-id={"quote:cheap-build-higher-bar"} data-cf-component-type={"quote"} data-cf-component-label={"Counterintuitive pre-raise reality"}>
          <QuoteBlock title="Counterintuitive pre-raise reality" variant="purple">
            {"A single sentence explaining that cheaper AI prototyping can raise the fundraising bar because investors expect more proof before capital."}
          </QuoteBlock>
        </div>
        <div id="ai-category" data-cf-component-id={"section:ai-category"} data-cf-component-type={"section"} data-cf-component-label={"Decide what kind of AI company investors are being asked to fund"} data-cf-source-section-id={"ai-category"}>
          <h2>{"Decide what kind of AI company investors are being asked to fund"}</h2>
          <p>{"Before a startup business investment conversation gets serious, founders need to make the AI category clear. Tech Nation\u2019s guidance for AI fundraising starts with a simple point: know which type of AI company you are. That matters because investors will judge an AI-native product, an AI-enabled workflow, an infrastructure company, a data-led business, and a vertical-specific tool in different ways."}</p>
          <p>{"A weak pitch says, \u201cwe use AI.\u201d A stronger pitch explains what AI changes for the customer or the business. If the AI does not change the outcome, investors may see it as a feature rather than the basis for a venture-scale company."}</p>
          <div data-cf-component-id={"image:ai-category"} data-cf-component-type={"image"} data-cf-component-label={"Image: Decide what kind of AI company investors are being asked to fund"} data-cf-source-section-id={"ai-category"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-eace2c4b-cde2-4c05-83f0-7414ed44cc09.jpg?alt=media&token=4a69a877-8340-4616-ab58-4bf3ab8579a2"
            alt="Founder\u2019s notebook beside laptop notes defining AI startup category for investor fundraising"
            caption="Decide what kind of AI company investors are being asked to fund"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="" variant="purple">
            {"If the product would be just as valuable without AI, the investment story needs to focus on the real business advantage instead."}
          </QuoteBlock>
          <h3>{"Prove the AI is core, not cosmetic"}</h3>
          <p>{"Founders should be direct about where AI sits in the product. Is it the main reason the product works, or is it an add-on to an existing SaaS workflow? Tech Nation warns founders not to simply sprinkle AI on a SaaS product. Investors want to understand whether AI creates a real business advantage, not just a more current pitch deck."}</p>
          <p>{"A practical test is to ask what would happen if the AI layer were removed. If the product would still deliver almost the same value, the investment story should focus on the real advantage instead, such as the customer problem, distribution, data, or market focus. If the product becomes slower, less useful, or less defensible without AI, then the founder can explain why AI is central to the company."}</p>
        </div>
        <div id="evidence-pack" data-cf-component-id={"section:evidence-pack"} data-cf-component-type={"section"} data-cf-component-label={"Build the evidence pack before the pitch deck"} data-cf-source-section-id={"evidence-pack"}>
          <h2>{"Build the evidence pack before the pitch deck"}</h2>
          <p>{"Before you pitch for startup business investment, build a small evidence pack that supports the story in your deck. Business.gov.au describes this as a toolbox of dynamic documents that can change as you learn from the market. For an Australian startup, that toolbox should cover the basics investors expect to check, including business materials, compliance, intellectual property, and legal issues."}</p>
          <p>{"For AI startups, the bar is often higher because a working product can be built and tested quickly. It should show customer validation, a clear view of the type of AI company you are building, and why your data access or data advantage matters. Where deployment risk is important, show that the team understands it and is not treating AI as a thin feature added to a standard product."}</p>
          <ul>
            <li>{"Keep core business, legal, compliance, and intellectual property documents current."}</li>
            <li>{"For AI startups, explain data advantage, model proof where relevant, and deployment risks."}</li>
          </ul>
          <div data-cf-component-id={"image:evidence-pack"} data-cf-component-type={"image"} data-cf-component-label={"Image: Build the evidence pack before the pitch deck"} data-cf-source-section-id={"evidence-pack"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-5e8ab625-52cc-4ddf-b1e2-984af8467a7b.jpg?alt=media&token=0c2ed840-1760-4d41-a8b3-91769cf067a4"
            alt="Startup evidence pack notes and market research on a founder\u2019s desk before an investor pitch"
            caption="Build the evidence pack before the pitch deck"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="capital-fit" data-cf-component-id={"section:capital-fit"} data-cf-component-type={"section"} data-cf-component-label={"Match the capital source to the risk you are reducing"} data-cf-source-section-id={"capital-fit"}>
          <h2>{"Match the capital source to the risk you are reducing"}</h2>
          <p>{"Startup business investment is not just about finding someone willing to write a cheque. For Australian startups seeking venture capital, business.gov.au says founders can approach government sources or private sector funds, but should research investors before making contact."}</p>
          <p>{"For AI founders, fit should also reflect the next risk the company must reduce. Another may need stronger customer adoption, clearer data defensibility, regulatory trust, a repeatable sales motion, or funding for a more capital-intensive build. Tech Nation\u2019s AI fundraising guidance points to the importance of knowing what type of AI company you are, proving a data moat, targeting the right verticals, and understanding the economics of raising capital."}</p>
          <p>{"Australian early stage innovation company tax incentives may also shape some investor conversations. Treasury describes concessional tax treatment for investments made in qualifying early stage innovation companies, including startups with high growth potential. Eligibility depends on specific tests, so it belongs in specialist tax and legal advice before it is used in fundraising materials."}</p>
          <QuoteBlock title="Investor fit is strategic" variant="purple">
            {"The wrong capital can push an AI startup toward milestones it is not ready to execute."}
          </QuoteBlock>
        </div>
        <div id="numbers" data-cf-component-id={"section:numbers"} data-cf-component-type={"section"} data-cf-component-label={"Know the numbers behind the investment story"} data-cf-source-section-id={"numbers"}>
          <h2>{"Know the numbers behind the investment story"}</h2>
          <p>{"Before seeking startup business investment, founders need a clear grip on the numbers. Business.gov.au makes this a specific step in preparing for venture capital: know your numbers before you approach investors. That means the raise amount should not sit apart from the business plan. It should connect to what the company will do next, what that will cost, and what evidence the team expects to create before the next funding decision."}</p>
          <p>{"For AI founders, this is especially important because the fundraising bar has shifted. Source commentary on early-stage AI fundraising notes that working products can often be built and tested at low cost, so investors may expect stronger traction or clearer proof even at early stages. A better investment story links the use of funds to concrete assumptions: runway, hiring, customer acquisition, infrastructure or model costs, sales cycles, and the next de-risking milestone. It is to show which assumptions matter, how they were formed, and what the new capital is meant to prove."}</p>
          <div data-cf-component-id={"image:numbers"} data-cf-component-type={"image"} data-cf-component-label={"Image: Know the numbers behind the investment story"} data-cf-source-section-id={"numbers"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-c02fdf92-bb78-4104-920e-6565af8bc95f.jpg?alt=media&token=8a4c1cd1-b480-4534-a7e7-c0a518d7f67c"
            alt="Founder\u2019s hand reviewing startup financials before seeking investment"
            caption="Know the numbers behind the investment story"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta:investment-readiness-checklist"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free checklist"
            title={"AI Startup Investment Readiness Checklist"}
            description="Use this checklist before pitching to confirm your AI category, evidence pack, numbers, investor fit, and reason for raising."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fhow-ai-founders-should-think-about-startup-business-investment-checklist-98c1f000.pdf?alt=media&token=4e6deecd-aa1a-472d-b151-947883845310"
            accent="purple"
            previewCards={[
              {
                title: "Evidence pack",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Investor fit",
                subtitle: 'PDF',
                color: "bg-[#00ffd7]",
                textColor: "text-black",
                rotationClass: "rotate-[7deg]",
              },
            ]}
          />
        </div>
        <div id="conclusion" data-cf-component-id={"section:conclusion"} data-cf-component-type={"section"} data-cf-component-label={"Use capital as an accelerant, not a substitute for proof"} data-cf-source-section-id={"conclusion"}>
          <h2>{"Use capital as an accelerant, not a substitute for proof"}</h2>
          <p>{"Startup business investment works best when it speeds up learning that is already underway. Before pitching, define what kind of AI company you are, and be clear about why AI creates a real advantage for customers or operations. Investors are unlikely to be persuaded by a product that only adds AI as a label. They will want to see a sharper case for value, traction, and differentiation."}</p>
          <p>{"Build a current investor toolbox that covers the basics: your pitch materials, numbers, traction, legal position, intellectual property, and compliance. Then shortlist investors whose mandate matches the next risk you need to reduce. If you can reach the next customer, product, or evidence milestone without external capital, it may be better to do that first and raise from a stronger position."}</p>
          <ul>
            <li>{"Define the AI company type before you pitch."}</li>
            <li>{"Show how AI improves the product, customer outcome, or operation."}</li>
            <li>{"Prepare your numbers, traction evidence, legal basics, IP position, and compliance notes."}</li>
            <li>{"Target investors who understand your stage, sector, and funding need."}</li>
            <li>{"Raise when capital can accelerate proof, not replace it."}</li>
          </ul>
          <div data-cf-component-id={"image:conclusion"} data-cf-component-type={"image"} data-cf-component-label={"Image: Use capital as an accelerant, not a substitute for proof"} data-cf-source-section-id={"conclusion"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3d1a5bb4-2299-4f4a-8cb0-a99eaa8ae770.jpg?alt=media&token=846c5186-af9a-4461-bc42-0332aa00ba20"
            alt="Startup team reviewing AI metrics in a candid office meeting before pitching investors"
            caption="Use capital as an accelerant, not a substitute for proof"
            width={1200}
            height={800}
          />
          </div>
        </div>

      <ArticleReferences
          references={[
            {id: 1, href: "https://vivatech.com/news/investment-checklist-for-startups-what-investors-want-to-see", title: "Startup Investment Checklist: A Guide to Securing Funding", publisher: "vivatech.com", description: "Authoritative reference supporting Startup Investment Checklist: A Guide to Securing Funding.", category: "guide"},
            {id: 2, href: "https://waveup.com/blog/how-to-raise-money-for-ai-startup/", title: "How to Raise Money for an AI Startup in 2026 (Playbook) | Waveup", publisher: "waveup.com", description: "Authoritative reference supporting How to Raise Money for an AI Startup in 2026 (Playbook) | Waveup.", category: "guide"},
            {id: 3, href: "https://www.linkedin.com/posts/aarthir_on-fundraising-and-pitching-for-early-stage-activity-7422782333864300544-BHd-", title: "Early Stage AI Startups: Pitching and Fundraising in the AI Era | Aarthi Ramamurthy posted on the topic | LinkedIn", publisher: "linkedin.com", description: "Authoritative reference supporting Early Stage AI Startups: Pitching and Fundraising in the AI Era | Aarthi Ramamurthy posted on the topic | LinkedIn.", category: "guide"},
            {id: 4, href: "https://www.forumvc.com/thought-pieces/ai-startup-investment-how-to-stand-out", title: "AI Startup Investment: How to Stand Out to Investors", publisher: "forumvc.com", description: "Authoritative reference supporting AI Startup Investment: How to Stand Out to Investors.", category: "guide"},
            {id: 5, href: "https://sprintlaw.com.au/articles/small-business-investment-in-australia-essential-legal-guide/", title: "Small Business Investment in Australia: Guide | Sprintlaw Australia", publisher: "sprintlaw.com.au", description: "Authoritative reference supporting Small Business Investment in Australia: Guide | Sprintlaw Australia.", category: "guide"},
            {id: 6, href: "https://technation.io/how-to-raise-funding-in-the-ai-era/", title: "How to Raise Funding in the AI Era: 5 Things Investors Want to See | Tech Nation", publisher: "technation.io", description: "Authoritative reference supporting How to Raise Funding in the AI Era: 5 Things Investors Want to See | Tech Nation.", category: "guide"},
            {id: 7, href: "https://business.gov.au/finance/funding/pitch-for-venture-capital", title: "Pitch for venture capital | business.gov.au", publisher: "business.gov.au", description: "Authoritative reference supporting Pitch for venture capital | business.gov.au.", category: "guide"},
            {id: 8, href: "https://stripe.com/au/resources/more/small-business-startup-capital-101-how-to-fund-your-early-days", title: "Small business startup capital: A guide | Stripe", publisher: "stripe.com", description: "Authoritative reference supporting Small business startup capital: A guide | Stripe.", category: "guide"},
            {id: 9, href: "https://treasury.gov.au/national-innovation-and-science-agenda/tax-incentives-for-early-stage-investors", title: "Tax incentives for early stage investors | Treasury.gov.au", publisher: "treasury.gov.au", description: "Authoritative reference supporting Tax incentives for early stage investors | Treasury.gov.au.", category: "guide"},
            {id: 10, href: "https://sprintlaw.com.au/articles/startup-investment-in-australia-essential-legal-and-business-guide/", title: "Startup Investment in Australia | Sprintlaw Australia", publisher: "sprintlaw.com.au", description: "Authoritative reference supporting Startup Investment in Australia | Sprintlaw Australia.", category: "guide"},
            {id: 11, href: "https://business.gov.au/guide/starting", title: "Guide to starting a business | business.gov.au", publisher: "business.gov.au", description: "Authoritative reference supporting Guide to starting a business | business.gov.au.", category: "guide"},
          ]}
          heading="Sources & further reading"
        />

        <ArticleDisclaimer />

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Pressure-test your investment readiness"
            body="Join an Australian AI founder community focused on sharper preparation, stronger evidence, and better investor conversations before a raise."
            buttonText="Explore the community"
            buttonHref="/community"
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
