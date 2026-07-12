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

const TOPIC = "Shark Tank Australia Lessons for AI Founder Pitches"
export const CATEGORY = "featured"
export const SLUG = "shark-tank-australia-lessons-for-ai-founder-pitches"
export const DATE_PUBLISHED = "2026-07-12"
export const DATE_MODIFIED = "2026-07-12"
export const DESCRIPTION = "Shark Tank Australia lessons for sharper AI founder pitches"
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-6772c525-3c41-444c-b22a-01994e134791.jpg?alt=media&token=6a8f6a15-d4d1-4ddb-acbc-7b68738f9bbf"
const HERO_IMAGE_ALT = "AI founder pitching Shark Tank Australia-style investors in a candid close-up meeting"
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
  { id: 1, question: "How much technical detail should an AI founder include in a pitch?", answer: "AI founders should first explain the customer problem, proposed solution and business opportunity in plain language, then use technology to show why the promised outcome can be delivered." },
  { id: 2, question: "What should a founder say when the business is still being tested?", answer: "A founder should state clearly what is known, what is still being tested, and what funding or a follow-up conversation would enable as the next proof point." },
  { id: 3, question: "How can an AI startup make a demo more credible?", answer: "A demo is more credible when it makes the problem and product easy to understand while evidence explains why the business can work beyond the pitch room." },
  { id: 4, question: "How should founders handle investor questions after the opening?", answer: "Founders should rehearse short, direct answers on the customer, opportunity size, evidence and the support required, with each answer tied to the commercial case." },
]

export const summaryHighlights = {
  heading: "Key facts: Shark Tank Australia Lessons for AI Founder Pitches",
  intro: "Shark Tank Australia lessons for sharper AI founder pitches",
  items: [
    { label: "Is Shark Tank Australia still running?", description: "Shark Tank Australia is presented as a format where entrepreneurs pitch a business or product to investors in the hope of securing a deal that helps take it further." },
    { label: "Who is the richest on Shark Tank Australia?", description: "The grounded material identifies Matt Higgins as a former Shark Tank investor who advises founders to lead with the biggest opportunity and its potential to scale." },
    { label: "Who are the Australian Shark Tank judges?", description: "Shark Tank Australia features a panel of investors known as Sharks, who hear entrepreneurs present businesses or products and decide whether they want to make a deal." },
  ],
}

export const articleMeta = {
  title: "Shark Tank Australia Lessons for AI Founder Pitches",
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
  { question: "Is Shark Tank Australia still running?", answer: "Shark Tank Australia is presented as a format where entrepreneurs pitch a business or product to investors in the hope of securing a deal that helps take it further." },
  { question: "Who is the richest on Shark Tank Australia?", answer: "The grounded material identifies Matt Higgins as a former Shark Tank investor who advises founders to lead with the biggest opportunity and its potential to scale." },
  { question: "Who are the Australian Shark Tank judges?", answer: "Shark Tank Australia features a panel of investors known as Sharks, who hear entrepreneurs present businesses or products and decide whether they want to make a deal." },
  { question: "How much technical detail should an AI founder include in a pitch?", answer: "AI founders should first explain the customer problem, proposed solution and business opportunity in plain language, then use technology to show why the promised outcome can be delivered." },
  { question: "What should a founder say when the business is still being tested?", answer: "A founder should state clearly what is known, what is still being tested, and what funding or a follow-up conversation would enable as the next proof point." },
  { question: "How can an AI startup make a demo more credible?", answer: "A demo is more credible when it makes the problem and product easy to understand while evidence explains why the business can work beyond the pitch room." },
  { question: "How should founders handle investor questions after the opening?", answer: "Founders should rehearse short, direct answers on the customer, opportunity size, evidence and the support required, with each answer tied to the commercial case." },
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
        <div id="attention-is-earned-in-the-opening" data-cf-component-id={"section:attention-is-earned-in-the-opening"} data-cf-component-type={"section"} data-cf-component-label={"Attention Is Earned in the Opening"} data-cf-source-section-id={"attention-is-earned-in-the-opening"}>
        <p><strong>{TOPIC}</strong> — {"Shark Tank Australia puts aspiring entrepreneurs in front of a panel of investors, known as Sharks, to present a business or product and seek a deal. That format makes the opening matter: before an investor can assess the detail, they need to understand what the business is, who it serves, and why the opportunity is worth discussing."}</p>
        <p>{"Start with the commercial role of the product: the problem it addresses, the customer affected, and the value the business aims to create. A clear opening gives an investor a reason to stay with the pitch when the technical detail follows."}</p>
        </div>
        <div id="lead-with-the-biggest-what" data-cf-component-id={"section:lead-with-the-biggest-what"} data-cf-component-type={"section"} data-cf-component-label={"Lead With the Biggest What"} data-cf-source-section-id={"lead-with-the-biggest-what"}>
          <h2>{"Lead With the Biggest What"}</h2>
          <p>{"A strong Shark Tank Australia-style opening leads with the size of the opportunity, not a tour of the product. Former Shark Tank investor Matt Higgins advises founders to lead with the biggest \u201cwhat\u201d: the bigness of the opportunity and how it can scale."}</p>
          <p>{"This framing helps investors assess the business before they assess the technology."}</p>
          <div data-cf-component-id={"image:lead-with-the-biggest-what"} data-cf-component-type={"image"} data-cf-component-label={"Image: Lead With the Biggest What"} data-cf-source-section-id={"lead-with-the-biggest-what"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-14d3e8b3-2ea3-430a-ba54-c43d57e3811c.jpg?alt=media&token=67d8b334-5002-4a47-b323-900cd1db7ddd"
            alt="Founder\u2019s hand circles a large market figure on a whiteboard beside a half-finished coffee"
            caption="Lead With the Biggest What"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"quote:biggest-what-insight"} data-cf-component-type={"quote"} data-cf-component-label={"Key insight"}>
          <QuoteBlock title="Key insight" variant="purple">
            {"Feature the supported principle: \"Pitch the bigness of the opportunity.\" Keep the quote to one sentence and use it as a visual pause after the full explanation, not as a repetition of the opening."}
          </QuoteBlock>
        </div>
        <div id="translate-the-model-into-a-buyer-story" data-cf-component-id={"section:translate-the-model-into-a-buyer-story"} data-cf-component-type={"section"} data-cf-component-label={"Translate the Model Into a Buyer Story"} data-cf-source-section-id={"translate-the-model-into-a-buyer-story"}>
          <h2>{"Translate the Model Into a Buyer Story"}</h2>
          <p>{"Shark Tank Australia puts founders in front of a panel to pitch an idea and seek a deal that can help take the business further. In that setting, the first job is clarity."}</p>
          <p>{"The aim is to make the opportunity understandable to someone who has not seen the product before, while keeping the claim tied to a real customer need."}</p>
          <p>{"The technology should support the explanation of why the product can deliver the promised outcome, rather than becoming the whole pitch. This order keeps the discussion focused on the business opportunity that a prospective investor or customer is being asked to back."}</p>
          <div data-cf-component-id={"image:translate-the-model-into-a-buyer-story"} data-cf-component-type={"image"} data-cf-component-label={"Image: Translate the Model Into a Buyer Story"} data-cf-source-section-id={"translate-the-model-into-a-buyer-story"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-6124acb1-b2d8-4ede-adb4-e1ec5e66a6e3.jpg?alt=media&token=a0accca5-f158-4db4-bda8-9d6de209224a"
            alt="Founder\u2019s pitch notes and product sketches spread across a desk before a Shark Tank Australia meeting"
            caption="Translate the Model Into a Buyer Story"
            width={1200}
            height={800}
          />
          </div>
          <h3>{"Use a buyer-first order"}</h3>
          <p>{"In a pitch format built around entrepreneurs seeking investment, a clear explanation of the opportunity helps keep attention on the business, not just the presentation."}</p>
        </div>
        <div id="make-proof-do-more-than-the-demo" data-cf-component-id={"section:make-proof-do-more-than-the-demo"} data-cf-component-type={"section"} data-cf-component-label={"Make Proof Do More Than the Demo"} data-cf-source-section-id={"make-proof-do-more-than-the-demo"}>
          <h2>{"Make Proof Do More Than the Demo"}</h2>
          <p>{"Shark Tank Australia can create attention for a young business. SmartCompany\u2019s look back at the original series notes that the program helped skyrocket some small Australian businesses, and it highlights ventures such as car-sharing platform Car Next Door. That visibility can open doors, but it is not proof that every claim in a pitch has been validated. A memorable demo should make the problem and product easy to understand; the underlying evidence must show why the business can work beyond the room."}</p>
          <p>{"Be specific about what is known, what is still being tested, and what the requested funding or conversation will enable."}</p>
        </div>
        <div id="design-for-the-investor-questions" data-cf-component-id={"section:design-for-the-investor-questions"} data-cf-component-type={"section"} data-cf-component-label={"Design for the Questions That Follow"} data-cf-source-section-id={"design-for-the-investor-questions"}>
          <h2>{"Design for the Questions That Follow"}</h2>
          <p>{"In Shark Tank Australia, entrepreneurs present their businesses or products to a panel of investors, with the hope that one or more investors will want to make a deal. That format makes the conversation after the opening pitch part of the test. A founder needs to connect the opportunity to a clear commercial case, rather than treating questions as an interruption. The opening should make the central opportunity easy to understand, including why the business could grow."}</p>
          <p>{"Rehearse short, direct answers about the customer, the size of the opportunity, the evidence behind the idea, and what funding or support would enable. Keep each answer tied to the business case."}</p>
          <div data-cf-component-id={"image:design-for-the-investor-questions"} data-cf-component-type={"image"} data-cf-component-label={"Image: Design for the Questions That Follow"} data-cf-source-section-id={"design-for-the-investor-questions"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b1ebb995-10b0-49cf-84d6-824a81a1505f.jpg?alt=media&token=f819d98b-2c5a-4ee4-b7b2-68c760b298df"
            alt="Design for the Questions That Follow"
            caption="Design for the Questions That Follow"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="rehearse-for-the-next-conversation" data-cf-component-id={"section:rehearse-for-the-next-conversation"} data-cf-component-type={"section"} data-cf-component-label={"Rehearse for the Next Conversation"} data-cf-source-section-id={"rehearse-for-the-next-conversation"}>
          <h2>{"Rehearse for the Next Conversation"}</h2>
          <p>{"Use a Shark Tank Australia-style pitch as rehearsal for an investor or business conversation. This follows the pitch advice to lead with the biggest \u201cwhat\u201d: the size and potential of the opportunity should be clear before the detail of the solution."}</p>
          <p>{"Keep the connection direct: customer problem, proposed solution, and the reason the business could grow. In the Shark Tank format, entrepreneurs pitch their ideas to investors in the hope of securing a deal that can help grow a business or take an idea to market."}</p>
          <p>{"Decide what you want from the listener, such as a follow-up discussion, feedback, or a conversation about funding and growth. If each part is clear without technical jargon, you have a stronger starting point for the next pitch."}</p>
          <ul>
            <li>{"Lead with the customer opportunity and its potential scale."}</li>
            <li>{"Explain the solution in plain language."}</li>
          </ul>
          <div data-cf-component-id={"image:rehearse-for-the-next-conversation"} data-cf-component-type={"image"} data-cf-component-label={"Image: Rehearse for the Next Conversation"} data-cf-source-section-id={"rehearse-for-the-next-conversation"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-c8f1fa3b-6e3d-47ef-81b1-0519a8173a8b.jpg?alt=media&token=05406b7f-da2d-4e75-bf8b-4113c570450d"
            alt="Entrepreneur rehearses a Shark Tank-style investor pitch with colleagues in a casual meeting room"
            caption="Rehearse for the Next Conversation"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free checklist"
            title={"AI Founder Pitch Rehearsal Checklist"}
            description="Use this checklist to shape an opportunity-led AI pitch, test the clarity of your evidence, and rehearse for follow-up questions."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fshark-tank-australia-lessons-for-ai-founder-pitches-checklist-4461be64.pdf?alt=media&token=6f5a4957-e494-422c-bbee-30140d27f078"
            accent="purple"
            previewCards={[
              {
                title: "Opportunity-led opening",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Investor Q&A rehearsal",
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
            {id: 1, href: "https://www.sjc.com.au/blog/lessons-from-the-shark-tank-3/", title: "Simon Jones & Co - Lessons From the Shark Tank #3", publisher: "sjc.com.au", description: "Authoritative reference supporting Simon Jones & Co - Lessons From the Shark Tank #3.", category: "guide"},
            {id: 2, href: "https://www.linkedin.com/posts/matt-higgins-rse_i-was-a-shark-on-shark-tank-and-the-question-activity-7362496556454817793-0Sn2", title: "I was a Shark on Shark Tank, and the question I get asked the most is: | Matt Higgins", publisher: "linkedin.com", description: "Authoritative reference supporting I was a Shark on Shark Tank, and the question I get asked the most is: | Matt Higgins.", category: "guide"},
            {id: 3, href: "https://business.gov.au/guide/starting", title: "Guide to starting a business | business.gov.au", publisher: "business.gov.au", description: "Authoritative reference supporting Guide to starting a business | business.gov.au.", category: "guide"},
            {id: 4, href: "https://www.smartcompany.com.au/shark-tank-australia/how-shark-tank-australia-works/", title: "Explainer: How Shark Tank Australia works - SmartCompany", publisher: "smartcompany.com.au", description: "Authoritative reference supporting Explainer: How Shark Tank Australia works - SmartCompany.", category: "guide"},
            {id: 5, href: "https://www.smartcompany.com.au/shark-tank-australia/shark-tank-australia-success-stories-car-next-door-modibodi-qpay/", title: "Seven of the biggest Shark Tank success stories - SmartCompany", publisher: "smartcompany.com.au", description: "Authoritative reference supporting Seven of the biggest Shark Tank success stories - SmartCompany.", category: "guide"},
            {id: 6, href: "https://en.wikipedia.org/wiki/Shark_Tank_(Australian_TV_series)", title: "Shark Tank (Australian TV series) - Wikipedia", publisher: "en.wikipedia.org", description: "Authoritative reference supporting Shark Tank (Australian TV series) - Wikipedia.", category: "guide"},
            {id: 7, href: "https://www.proactiveaccountant.com.au/blog/lessons-from-the-shark-tank/", title: "Proactive Accountant - Lessons From the Shark Tank", publisher: "proactiveaccountant.com.au", description: "Authoritative reference supporting Proactive Accountant - Lessons From the Shark Tank.", category: "guide"},
          ]}
          heading="Sources & further reading"
        />

        <ArticleDisclaimer />

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Rehearse the commercial case"
            body="Prepare a clear opening that names the customer opportunity, explains the solution in plain language and ends with a specific reason to continue the conversation."
            buttonText="Explore AI startup pitching"
            buttonHref="/ai-startup-fundraising-pitching-investor-updates"
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
