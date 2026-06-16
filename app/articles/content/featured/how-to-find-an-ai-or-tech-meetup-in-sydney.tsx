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

const TOPIC = "How to Find an AI or Tech Meetup in Sydney"
export const CATEGORY = "featured"
export const SLUG = "how-to-find-an-ai-or-tech-meetup-in-sydney"
export const DATE_PUBLISHED = "2026-06-16"
export const DATE_MODIFIED = "2026-06-16"
export const DESCRIPTION = "Meetup in Sydney guide for AI and tech networking"
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-1895a285-e323-4223-9adc-d90980aa86a4.jpg?alt=media&token=715a3b01-0770-48ab-9a45-b1ca5b806495"
const HERO_IMAGE_ALT = "Close-up of Sydney AI meetup attendees chatting over laptops and name badges in a candid networking moment"
export const FEATURED_FOCUS = "ai"

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
  { id: 1, question: "How do I find a useful AI meetup in Sydney?", answer: "Start by defining your goal, such as learning AI, meeting builders, finding startup advice, or exploring customer problems. Then search for recurring AI, machine learning, data, software, product, startup, and business communities with current organiser activity." },
  { id: 2, question: "Should I choose a technical meetup or a startup networking event?", answer: "Choose a technical AI, data, software, or product event if you want deeper technical discussion. Choose a startup or business networking room if your goal is commercial validation, customers, referrals, partnerships, or founder advice." },
  { id: 3, question: "What signals show a Sydney tech event is worth attending?", answer: "Look for a clear audience, stated purpose, credible host, recent activity, practical format, realistic cost, and a location that works for you. Event size matters less than whether the right people are likely to be in the room." },
  { id: 4, question: "How should I prepare for my first tech meetup?", answer: "Prepare a short introduction that explains what you are learning, building, hiring for, researching, or trying to understand. After the event, note who was useful to meet, what you learned, and what follow-up is needed." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Find an AI or Tech Meetup in Sydney",
  intro: "Meetup in Sydney guide for AI and tech networking",
  items: [
    { label: "Where to meet singles in Sydney?", description: "This guide is focused on AI and tech communities, not dating. If your goal is social connection, choose events with a clear audience and purpose before attending." },
    { label: "What replaced Meetup?", description: "No single replacement is identified here. The practical approach is to search for recurring communities, organiser activity, current dates, and formats across AI, tech, startup, IT, web, and business groups." },
    { label: "Is meetup a good way to meet singles?", description: "Meetup-style events can help people meet others, but this article treats them as purpose-led communities. For AI and tech, the best fit depends on audience, format, and goals." },
  ],
}

export const articleMeta = {
  title: "How to Find an AI or Tech Meetup in Sydney",
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
  { question: "Where to meet singles in Sydney?", answer: "This guide is focused on AI and tech communities, not dating. If your goal is social connection, choose events with a clear audience and purpose before attending." },
  { question: "What replaced Meetup?", answer: "No single replacement is identified here. The practical approach is to search for recurring communities, organiser activity, current dates, and formats across AI, tech, startup, IT, web, and business groups." },
  { question: "Is meetup a good way to meet singles?", answer: "Meetup-style events can help people meet others, but this article treats them as purpose-led communities. For AI and tech, the best fit depends on audience, format, and goals." },
  { question: "How do I find a useful AI meetup in Sydney?", answer: "Start by defining your goal, such as learning AI, meeting builders, finding startup advice, or exploring customer problems. Then search for recurring AI, machine learning, data, software, product, startup, and business communities with current organiser activity." },
  { question: "Should I choose a technical meetup or a startup networking event?", answer: "Choose a technical AI, data, software, or product event if you want deeper technical discussion. Choose a startup or business networking room if your goal is commercial validation, customers, referrals, partnerships, or founder advice." },
  { question: "What signals show a Sydney tech event is worth attending?", answer: "Look for a clear audience, stated purpose, credible host, recent activity, practical format, realistic cost, and a location that works for you. Event size matters less than whether the right people are likely to be in the room." },
  { question: "How should I prepare for my first tech meetup?", answer: "Prepare a short introduction that explains what you are learning, building, hiring for, researching, or trying to understand. After the event, note who was useful to meet, what you learned, and what follow-up is needed." },
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
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Start with the meetup in Sydney you actually need"} data-cf-source-section-id={"intro"}>
        <p><strong>{TOPIC}</strong> — {"The best meetup in Sydney is the one that matches the room you need. Before you browse event listings, decide why you are going. You might want to learn about AI, meet builders, find startup advice, explore customer problems, hire talent, or meet possible collaborators."}</p>
        <p>{"Sydney has overlapping tech, startup, IT, web, marketing, and business networking scenes. A good meetup should do more than fill an evening. It should help you meet relevant people, hear practical advice, and leave with clearer next steps."}</p>
        </div>
        <div id="landscape" data-cf-component-id={"section:landscape"} data-cf-component-type={"section"} data-cf-component-label={"Understand the Sydney AI and tech event map"} data-cf-source-section-id={"landscape"}>
          <h2>{"Understand the Sydney AI and tech event map"}</h2>
          <p>{"A meetup in Sydney can mean very different things depending on the room. Some events are built for technical AI, data, software, or product people. Others are startup, founder, small business, mastermind, marketing, or referral networking events. Before you choose one, decide whether you want to learn a technical topic, meet builders, test a startup idea, find customers, or get business advice."}</p>
          <p>{"The Sydney event map is broad enough that useful AI conversations may happen outside a dedicated AI meetup. A long-running Sydney Tech Startup Meetup is described as a regular place for the tech startup community to connect and exchange ideas. Lists of Sydney networking groups also point to Information Technology, web industry, and new media meetups. These adjacent communities can be useful when your AI interest sits inside a product, business, marketing, or startup problem."}</p>
          <div data-cf-component-id={"image:landscape"} data-cf-component-type={"image"} data-cf-component-label={"Image: Understand the Sydney AI and tech event map"} data-cf-source-section-id={"landscape"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e778303d-cc12-4de0-89a5-aa0ff48f2057.jpg?alt=media&token=da11f282-3dad-4813-8721-dedce1bdb19f"
            alt="Sydney AI meetup notebook with coffee, laptop, and blurred whiteboard notes in a candid tech event setting"
            caption="Understand the Sydney AI and tech event map"
            width={1200}
            height={800}
          />
          </div>
          <h3>{"Match the room to your goal"}</h3>
          <p>{"If you want deep model-building discussion, look for events that clearly focus on AI, machine learning, data, software engineering, or technical product work. If you want to understand demand, partnerships, referrals, or founder lessons, business and startup meetups may be a better fit. Small business and mastermind-style meetings are often framed around sharing ideas, getting experienced opinions, and building business connections, so they can help with commercial AI use cases even when they are not technical training rooms."}</p>
        </div>
        <div id="search-routine" data-cf-component-id={"section:search-routine"} data-cf-component-type={"section"} data-cf-component-label={"Use a four-step search routine"} data-cf-source-section-id={"search-routine"}>
          <h2>{"Use a four-step search routine"}</h2>
          <p>{"Start by naming the outcome you want from a meetup in Sydney. A founder may search for tech startup or founder networking. A builder may search for AI, machine learning, data science, software, or product events. This keeps the search focused and helps you compare groups that serve different communities, from startup meetups to IT, web, new media, and business networking groups."}</p>
          <p>{"Next, look for recurring communities before you choose a single event. A durable group is often more useful than one isolated talk because it gives you more chances to meet people, hear how others are solving problems, and build trust over time. Sydney sources list both long-running startup meetups and regular networking groups, so check whether the organiser has a pattern of current activity, a clear format, and a location that works for you."}</p>
          <p>{"Then shortlist three options and choose the one that best matches your level, goal, and availability."}</p>
          <div data-cf-component-id={"image:search-routine"} data-cf-component-type={"image"} data-cf-component-label={"Image: Use a four-step search routine"} data-cf-source-section-id={"search-routine"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f3484039-1bd8-41bb-af9b-cd9ccc50fcae.jpg?alt=media&token=1b7d5c2e-98b5-4422-961f-eb48fefdc9ef"
            alt="Laptop map and notes on a Sydney cafe table for finding startup, AI, and product meetups"
            caption="Use a four-step search routine"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="" variant="purple">
            {"An old event page is not automatically dead, but the organiser's current channels should confirm the next date."}
          </QuoteBlock>
        </div>
        <div id="quality-check" data-cf-component-id={"section:quality-check"} data-cf-component-type={"section"} data-cf-component-label={"Vet the event before you RSVP"} data-cf-source-section-id={"quality-check"}>
          <h2>{"Vet the event before you RSVP"}</h2>
          <p>{"Before you RSVP to a meetup in Sydney, look for evidence that the room has a clear purpose. A useful event can still be casual and informal. The stronger signal is that it is also structured enough to help people share ideas, get opinions, or meet others with a similar goal."}</p>
          <p>{"Cost is not the main test. Some Sydney networking groups are free or ask for only a small cover charge, and these can still be worth attending. If an event costs more, expect a clearer reason to go, such as a defined audience, a practical format, or a host that explains who the event is for."}</p>
          <QuoteBlock title="Tip" variant="purple">
            {"The strongest signal is not event size. It is whether the right people are likely to be in the room."}
          </QuoteBlock>
          <h3>{"Signals worth prioritising"}</h3>
          <p>{"Prioritise events that name the audience clearly. A small business meetup, founder night, technology gathering, or industry networking group gives you a better chance of judging fit before you arrive. Also look for a stated purpose, such as sharing ideas, getting experienced opinions, building business connections, or meeting people in a specific field."}</p>
          <p>{"A practical format matters too. The event does not need to feel formal, but it should give people a reason to talk. Recent activity, a visible host, and realistic pricing all help you decide whether the organiser is creating a useful room rather than just listing another event."}</p>
          <ul>
            <li>{"Clear audience"}</li>
            <li>{"Structured purpose"}</li>
            <li>{"Credible host"}</li>
            <li>{"Recent activity"}</li>
            <li>{"Practical format"}</li>
            <li>{"Realistic cost"}</li>
          </ul>
          <h3>{"Signals to question"}</h3>
          <p>{"Be careful with events that rely only on broad networking promises."}</p>
          <p>{"A room full of general business contacts may be useful for some people, but it may not help if you are looking for AI builders, startup founders, researchers, or technical peers. Check the event page before you go, because venues, schedules, and formats can change."}</p>
          <ul>
            <li>{"Vague networking claims"}</li>
            <li>{"No agenda or format"}</li>
            <li>{"Heavy sales language"}</li>
            <li>{"No recent events"}</li>
            <li>{"Audience mismatch"}</li>
          </ul>
        </div>
        <div data-cf-component-id={"resource-cta:shortlist-resource"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free worksheet"
            title={"Sydney AI & Tech Meetup Shortlist Worksheet"}
            description="A fillable worksheet to define your meetup goal, shortlist technical and broader events, vet fit before you RSVP, and prepare useful questions."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fhow-to-find-an-ai-or-tech-meetup-in-sydney-worksheet-e8b04702.pdf?alt=media&token=253cbb84-ed40-4ce1-902b-4b3e0ff7c901"
            accent="purple"
            previewCards={[
              {
                title: "Shortlist planner",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "RSVP vetting checks",
                subtitle: 'PDF',
                color: "bg-[#00ffd7]",
                textColor: "text-black",
                rotationClass: "rotate-[7deg]",
              },
            ]}
          />
        </div>
        <div id="make-connections" data-cf-component-id={"section:make-connections"} data-cf-component-type={"section"} data-cf-component-label={"Make the first meetup count"} data-cf-source-section-id={"make-connections"}>
          <h2>{"Make the first meetup count"}</h2>
          <p>{"A good meetup in Sydney starts before you walk into the room. This makes it easier for other people to place you and offer useful advice."}</p>
          <p>{"Ask what people are working on, which events they return to, and what they have found useful about the community. Sydney meetup groups are often valuable because they create space to meet people from your field, find possible customers, hear how others handled business hurdles, and get experienced opinions in a casual setting."}</p>
          <p>{"After the event, do a quick review while the details are fresh. Note who was useful to meet, what you learned, whether the event is worth attending again, and what follow-up is needed. One specific message after the meetup is usually more useful than collecting a long list of names with no next action."}</p>
          <div data-cf-component-id={"image:make-connections"} data-cf-component-type={"image"} data-cf-component-label={"Image: Make the first meetup count"} data-cf-source-section-id={"make-connections"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ea7076f9-6ddf-4f24-8dad-200520ad5114.jpg?alt=media&token=1cc70baf-b7fd-4ecf-86b6-39628cdf9d36"
            alt="Close-up of hands exchanging meetup name badges at a casual Sydney networking event"
            caption="Make the first meetup count"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="conclusion" data-cf-component-id={"section:conclusion"} data-cf-component-type={"section"} data-cf-component-label={"Build your first shortlist this week"} data-cf-source-section-id={"conclusion"}>
          <h2>{"Build your first shortlist this week"}</h2>
          <p>{"Start small. Pick one technical AI, data, software, or tech startup meetup in Sydney, then pick one broader business or startup networking event. This gives you a useful comparison between a specialist room and a wider business room. Sydney has both kinds of groups, and the best choice depends on what you want from the night."}</p>
          <p>{"Before you attend, write down the basics for each option: your goal, the audience, the expected level, date, location, format, cost, organiser, and any follow-up notes. Then go to the best-fit event with a short introduction and two useful questions. Return to the community where the conversations lead to learning, advice, collaboration, or commercial insight."}</p>
          <ul>
            <li>{"Choose one technical event and one broader business or startup event."}</li>
            <li>{"Record goal, audience, level, date, location, format, cost, organiser, and follow-up notes."}</li>
            <li>{"Go back to the meetup where the people and format helped you most."}</li>
          </ul>
          <div data-cf-component-id={"image:conclusion"} data-cf-component-type={"image"} data-cf-component-label={"Image: Build your first shortlist this week"} data-cf-source-section-id={"conclusion"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-e238f823-a9ae-4acf-b3c2-c8e6ccf6cc47.jpg?alt=media&token=6174b99f-f4df-491f-8d23-22e423c3d243"
            alt="Sydney startup meetup attendees networking in a wide candid scene at a casual business event"
            caption="Build your first shortlist this week"
            width={1200}
            height={800}
          />
          </div>
        </div>

      <ArticleReferences
          references={[
            {id: 1, href: "https://techevents.au/sydney/best-meetups", title: "The Best Tech Meetups in Sydney \u2014 2026 Guide | Tech Events Sydney", publisher: "techevents.au", description: "Authoritative reference supporting The Best Tech Meetups in Sydney \u2014 2026 Guide | Tech Events Sydney.", category: "guide"},
            {id: 2, href: "https://hannahdemilta.com/2013/01/24/5-tips-for-planning-a-sydney-meetup/", title: "5 Tips for Planning a Sydney Meetup \u2013 Hannah DeMilta", publisher: "hannahdemilta.com", description: "Authoritative reference supporting 5 Tips for Planning a Sydney Meetup \u2013 Hannah DeMilta.", category: "guide"},
            {id: 3, href: "https://maxmyprofit.com.au/sydney-business-meetup-groups/", title: "6 Sydney Business Meetup Groups you Should be a Part Of - MaxMyProfit", publisher: "maxmyprofit.com.au", description: "Authoritative reference supporting 6 Sydney Business Meetup Groups you Should be a Part Of - MaxMyProfit.", category: "guide"},
            {id: 4, href: "https://events.humanitix.com/good-things-sydney-meetup", title: "Good Things Sydney Meetup", publisher: "events.humanitix.com", description: "Authoritative reference supporting Good Things Sydney Meetup.", category: "guide"},
            {id: 5, href: "https://www.australiansmallbusiness.com.au/services/small-business-sydney-meetups/", title: "Small Business Meetups | Online Business Admin Courses & AI Assistants for Small Business", publisher: "australiansmallbusiness.com.au", description: "Authoritative reference supporting Small Business Meetups | Online Business Admin Courses & AI Assistants for Small Business.", category: "guide"},
            {id: 6, href: "https://publicrelationssydney.com.au/networking-groups-in-sydney/", title: "Networking groups in Sydney", publisher: "publicrelationssydney.com.au", description: "Authoritative reference supporting Networking groups in Sydney.", category: "guide"},
            {id: 7, href: "https://bxnetworking.com/small-business-networking-events-sydney/", title: "Small Business Networking Events in Sydney | Bx Networking", publisher: "bxnetworking.com", description: "Authoritative reference supporting Small Business Networking Events in Sydney | Bx Networking.", category: "guide"},
          ]}
          heading="Sources & further reading"
        />

        <ArticleDisclaimer />

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Build your Sydney meetup shortlist"
            body="Compare event goals, audience, format, location, cost, organiser activity, and follow-up notes before you RSVP."
            buttonText="Start your shortlist"
            buttonHref="#shortlist-resource"
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
