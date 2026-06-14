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
export const DATE_PUBLISHED = "2026-06-14"
export const DATE_MODIFIED = "2026-06-14"
export const DESCRIPTION = "Meetup in Sydney for AI, tech and startup networking."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-9a3fd8af-3d97-4fd1-af86-5cdfffe71829.jpg?alt=media&token=736f722c-23f8-491a-aa52-d328807c9ea4"
const HERO_IMAGE_ALT = "Close-up candid of Sydney tech meetup attendees networking over laptops and name badges in a startup space"
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
  { id: 1, question: "How do I find an AI meetup in Sydney if the event title does not say AI?", answer: "Start with AI, machine learning and data searches, then widen to tech startup, founder, digital, UX, content strategy and small business events. Read the agenda and audience notes to check whether AI, product, digital or founder work is actually relevant." },
  { id: 2, question: "What should I check before I RSVP to a Sydney tech meetup?", answer: "Check the event description, audience fit, format, date, venue, suburb and registration status. Useful signals include regular activity, a clear purpose, a structured format, workshop details or a named host." },
  { id: 3, question: "Which Sydney meetup format is best for founders or builders?", answer: "Founders and builders may benefit from startup, small business or founder-focused rooms where people exchange ideas, hear business advice and discuss mistakes. A structured but informal setting can make conversations more useful." },
  { id: 4, question: "How can I make one tech meetup more useful?", answer: "Arrive with one learning goal or connection goal. Ask practical questions about projects, hurdles, tools and lessons, then follow up with specific context from the conversation." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Find an AI or Tech Meetup in Sydney",
  intro: "Meetup in Sydney for AI, tech and startup networking.",
  items: [
    { label: "Where to meet singles in Sydney?", description: "This guide is focused on AI and tech networking, not dating. For professional meetups, choose rooms by relevance, format, attendee fit and whether the event matches your goal." },
    { label: "What replaced Meetup?", description: "The article does not identify a replacement for Meetup. It recommends searching broadly across AI, tech startup, digital, UX, content strategy and small business communities, then checking each event page." },
    { label: "Is meetup a good way to meet singles?", description: "This guide does not assess singles events. It treats meetups as places for learning, professional networking, startup ideas, practical advice and repeat community contact." },
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
  { question: "Where to meet singles in Sydney?", answer: "This guide is focused on AI and tech networking, not dating. For professional meetups, choose rooms by relevance, format, attendee fit and whether the event matches your goal." },
  { question: "What replaced Meetup?", answer: "The article does not identify a replacement for Meetup. It recommends searching broadly across AI, tech startup, digital, UX, content strategy and small business communities, then checking each event page." },
  { question: "Is meetup a good way to meet singles?", answer: "This guide does not assess singles events. It treats meetups as places for learning, professional networking, startup ideas, practical advice and repeat community contact." },
  { question: "How do I find an AI meetup in Sydney if the event title does not say AI?", answer: "Start with AI, machine learning and data searches, then widen to tech startup, founder, digital, UX, content strategy and small business events. Read the agenda and audience notes to check whether AI, product, digital or founder work is actually relevant." },
  { question: "What should I check before I RSVP to a Sydney tech meetup?", answer: "Check the event description, audience fit, format, date, venue, suburb and registration status. Useful signals include regular activity, a clear purpose, a structured format, workshop details or a named host." },
  { question: "Which Sydney meetup format is best for founders or builders?", answer: "Founders and builders may benefit from startup, small business or founder-focused rooms where people exchange ideas, hear business advice and discuss mistakes. A structured but informal setting can make conversations more useful." },
  { question: "How can I make one tech meetup more useful?", answer: "Arrive with one learning goal or connection goal. Ask practical questions about projects, hurdles, tools and lessons, then follow up with specific context from the conversation." },
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
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Find the right meetup in Sydney by widening the search"} data-cf-source-section-id={"intro"}>
        <p><strong>{TOPIC}</strong> — {"The best meetup in Sydney for AI, machine learning or tech may not use those exact words in its title. Start with direct searches for AI and tech events, then widen the search to startup, digital, UX, content strategy and business communities. These adjacent groups often attract people who are building products, testing ideas, improving digital services or working around new technology."}</p>
        <p>{"Sydney has long-running communities that show why this broader search works. The Sydney Tech Startup Meetup has been described as a major, regular place for the city\u2019s tech startup community to connect and exchange ideas. The Sydney Content Strategy meetup brings together content strategists, content designers, writers, information architects, website managers, digital producers and UX designers, and says it has run for 15 years and met more than 70 times. When choosing where to go, judge the event by its relevance, cadence, format and attendee fit, not only by whether the title says AI."}</p>
        </div>
        <div id="search-beyond-ai" data-cf-component-id={"section:search-beyond-ai"} data-cf-component-type={"section"} data-cf-component-label={"Search beyond the word AI"} data-cf-source-section-id={"search-beyond-ai"}>
          <h2>{"Search beyond the word AI"}</h2>
          <p>{"When you search for a meetup in Sydney, start with direct terms like AI, machine learning and data. Then widen the search. Relevant rooms may sit under labels such as tech startup, founder, digital, UX, content strategy or small business. A group does not need AI in its name to include people who are building with AI, buying AI tools or changing workflows because of AI."}</p>
          <p>{"Sydney examples show why this matters. One long-running tech startup meetup is described as a place for the startup community to connect and exchange ideas. Sydney Content Strategy brings together content strategists, content designers, information architects, website managers, digital producers and UX designers to discuss digital strategy for users. Small business meetups focus on structured, informal sharing of ideas and experienced opinions. Read the event page before you commit."}</p>
          <ul>
            <li>{"Try adjacent searches such as tech startup, founder, digital, UX, content strategy and small business."}</li>
            <li>{"Check the event page for topic fit, format and who the meetup is designed for."}</li>
          </ul>
          <div data-cf-component-id={"image:search-beyond-ai"} data-cf-component-type={"image"} data-cf-component-label={"Image: Search beyond the word AI"} data-cf-source-section-id={"search-beyond-ai"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-5aff6ec2-ecc1-435b-9770-70551de838fd.jpg?alt=media&token=31eafa3b-8fe1-41c0-b84d-a8965d20880c"
            alt="Sydney coworking events board with AI, startup, UX and small business meetup flyers in a candid workspace scene"
            caption="Search beyond the word AI"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="Search wider" variant="purple">
            {"The best AI room may be labelled startup, digital, UX, content strategy or small business rather than AI."}
          </QuoteBlock>
        </div>
        <div id="shortlist-before-rsvp" data-cf-component-id={"section:shortlist-before-rsvp"} data-cf-component-type={"section"} data-cf-component-label={"Build a shortlist before you RSVP"} data-cf-source-section-id={"shortlist-before-rsvp"}>
          <h2>{"Build a shortlist before you RSVP"}</h2>
          <p>{"Before you commit to a meetup in Sydney, make a short list and compare each event against your goal. A good first pass is relevance. Read the agenda, event description and audience notes. Look for signs that the room matches what you want to learn or who you want to meet, such as tech startups, small business, digital strategy, content design, product work, UX, AI or founder topics."}</p>
          <p>{"Some Sydney groups show useful signals, such as regular activity, a clear purpose, a structured format, a workshop plan, venue details or a named host. Long-running groups and events with clear audience descriptions are easier to assess than vague listings."}</p>
          <ul>
            <li>{"Credibility: look for regular activity, a clear organiser purpose or a history of past meetups."}</li>
            <li>{"Practical fit: confirm the venue, format, date and registration status before you travel."}</li>
          </ul>
          <QuoteBlock title="Confirm before you travel" variant="purple">
            {"Community event pages can change."}
          </QuoteBlock>
        </div>
        <div id="choose-room" data-cf-component-id={"section:choose-room"} data-cf-component-type={"section"} data-cf-component-label={"Choose the room that matches your goal"} data-cf-source-section-id={"choose-room"}>
          <h2>{"Choose the room that matches your goal"}</h2>
          <p>{"The best meetup in Sydney is not always the biggest one. A tech startup meetup may suit someone looking for startup peers and ideas. A small business meeting may be better for an owner who wants honest opinions, experienced advice, or a more structured setting."}</p>
          <p>{"Start with your goal, then choose the format. The Sydney content strategy meetup, for example, brings together content strategists, designers, writers, information architects, website managers, digital producers, and UX designers to discuss digital strategy, and has included workshop-style sessions."}</p>
          <div data-cf-component-id={"image:choose-room"} data-cf-component-type={"image"} data-cf-component-label={"Image: Choose the room that matches your goal"} data-cf-source-section-id={"choose-room"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-733217c6-558f-4a52-9860-9e1fdace8da6.jpg?alt=media&token=6739b453-e071-4970-8904-e20f5a16c8f6"
            alt="Hands holding coffee during a small Sydney business meetup, close-up of candid networking moment"
            caption="Choose the room that matches your goal"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="Choose by fit, not size" variant="purple">
            {"Do not choose only by event size. Choose by whether the room matches your learning, building, or networking goal."}
          </QuoteBlock>
          <h3>{"For builders and founders"}</h3>
          <p>{"If you are building a company, product, or service, a business or startup room may be more useful than a broad social event. Sydney business meetup listings point to groups for tech startups, young entrepreneurs, North Shore startups, and marketing communities. These rooms are built around people who want to exchange ideas, find customers, hear business advice, and learn from other people\u2019s mistakes."}</p>
          <p>{"Small business meetups can also suit founders who want a more candid setting. Some are described as casual and informal, but still structured and purposeful. That matters because an unstructured room can be friendly without helping you make useful decisions."}</p>
          <h3>{"For career-focused networkers"}</h3>
          <p>{"If your goal is career growth, choose a repeatable networking format where you can meet relevant people more than once. Small business networking events in Sydney often focus on connecting people with the right contacts and building leads over time. This is different from attending one large event and hoping the right person appears."}</p>
          <p>{"It also helps you test whether the room is actually aligned with your industry, stage, and goals."}</p>
        </div>
        <div id="check-sydney-logistics" data-cf-component-id={"section:check-sydney-logistics"} data-cf-component-type={"section"} data-cf-component-label={"Check Sydney logistics before committing"} data-cf-source-section-id={"check-sydney-logistics"}>
          <h2>{"Check Sydney logistics before committing"}</h2>
          <p>{"Before you RSVP to a meetup in Sydney, check whether the event is realistic for your week. Sydney meetups can sit in very different local areas, from Lane Cove to Alexandria, Blacktown, Bondi Beach, or a central venue. Read the event page for the suburb, venue, date, start time, and any notes about parking or access. A relevant event you can attend often is usually more useful than a perfect-looking event that is too hard to reach."}</p>
          <p>{"Good event pages make the decision easier. Look for clear signals such as the next meetup date, location, how the meetup works, sponsors, workshop topic, or the meeting purpose. A Sydney content strategy meetup, for example, publishes sections for the next meetup, how it works, location, and sponsors. A small business meetup page may explain that the meeting is casual and informal, but still structured and purposeful. That mix matters because structure can make introductions easier, while informal time leaves room for real conversation."}</p>
          <ul>
            <li>{"Prefer meetups with enough structure to help conversation start, not so much structure that there is no room to talk."}</li>
          </ul>
          <div data-cf-component-id={"image:check-sydney-logistics"} data-cf-component-type={"image"} data-cf-component-label={"Image: Check Sydney logistics before committing"} data-cf-source-section-id={"check-sydney-logistics"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-17d846b3-98e9-4a7c-af97-03bde6623087.jpg?alt=media&token=af5c550d-31c2-405f-b985-1af502212d9a"
            alt="Sydney cafe meetup setup with coffee cups, signage, laptops, and blurred arrivals before an evening event"
            caption="Check Sydney logistics before committing"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="Sydney travel time matters" variant="purple">
            {"Choose an event you can attend regularly."}
          </QuoteBlock>
        </div>
        <div id="follow-up" data-cf-component-id={"section:follow-up"} data-cf-component-type={"section"} data-cf-component-label={"Turn one event into useful relationships"} data-cf-source-section-id={"follow-up"}>
          <h2>{"Turn one event into useful relationships"}</h2>
          <p>{"A meetup in Sydney is more useful when you arrive with a clear purpose. Your connection goal might be to meet one person in your field or one person who has already solved a problem you are facing."}</p>
          <p>{"Keep the conversation practical. Ask people what they are working on, what has been harder than expected, and what advice they would give someone at your stage. Good meetup communities create space to share ideas, experienced opinions, business lessons, and honest discussion."}</p>
          <p>{"After the event, follow up with specific context from the conversation. Return to groups that feel structured enough to be purposeful and relaxed enough for honest exchange."}</p>
          <QuoteBlock title="Make the first question specific" variant="purple">
            {"Bring one real question to the event."}
          </QuoteBlock>
        </div>
        <div data-cf-component-id={"resource-cta:meetup-finder-worksheet"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free worksheet"
            title={"Sydney Tech Meetup Shortlist Worksheet"}
            description="A printable worksheet to help you widen your meetup search, compare event fit, check logistics and turn one Sydney event into useful relationships."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fhow-to-find-an-ai-or-tech-meetup-in-sydney-worksheet-a67aa1b9.pdf?alt=media&token=8880d494-6940-4118-a213-676638e96624"
            accent="purple"
            previewCards={[
              {
                title: "Shortlist Builder",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "RSVP Checks",
                subtitle: 'PDF',
                color: "bg-[#00ffd7]",
                textColor: "text-black",
                rotationClass: "rotate-[7deg]",
              },
            ]}
          />
        </div>
        <div id="next-sydney-meetup-plan" data-cf-component-id={"section:next-sydney-meetup-plan"} data-cf-component-type={"section"} data-cf-component-label={"Your next Sydney meetup plan"} data-cf-source-section-id={"next-sydney-meetup-plan"}>
          <h2>{"Your next Sydney meetup plan"}</h2>
          <p>{"For your next meetup in Sydney, do not keep browsing forever. Pick one specialist AI or tech event, then add one adjacent event from the startup, digital, UX, marketing, or business world. Sydney has long-running tech startup meetups, business networking groups, small business meetings, and content strategy meetups, so a two-event shortlist gives you a useful comparison without overloading your calendar."}</p>
          <p>{"That goal might be to learn how another team solved a practical problem, meet one person working in a related field, or test whether the community feels honest and useful. After the event, keep returning to the groups that offer practical learning, relevant introductions, and open discussion. Those are the meetups most likely to compound into real value over time."}</p>
          <ul>
            <li>{"Choose one specialist AI or tech meetup and one adjacent startup, digital, UX, marketing, or business event."}</li>
            <li>{"Set one learning or connection goal before you attend."}</li>
            <li>{"Return to communities that provide practical learning, useful introductions, and honest discussion."}</li>
          </ul>
          <div data-cf-component-id={"image:next-sydney-meetup-plan"} data-cf-component-type={"image"} data-cf-component-label={"Image: Your next Sydney meetup plan"} data-cf-source-section-id={"next-sydney-meetup-plan"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-2ff770c1-11c6-4225-85ec-61e032673ff4.jpg?alt=media&token=9d3c0138-4e80-4cc6-adda-419c635fbc0a"
            alt="Candid wide scene of Sydney tech meetup attendees networking in a casual event space"
            caption="Your next Sydney meetup plan"
            width={1200}
            height={800}
          />
          </div>
        </div>

      <ArticleReferences
          references={[
            {id: 1, href: "https://maxmyprofit.com.au/sydney-business-meetup-groups/", title: "6 Sydney Business Meetup Groups you Should be a Part Of - MaxMyProfit", publisher: "maxmyprofit.com.au", description: "Authoritative reference supporting 6 Sydney Business Meetup Groups you Should be a Part Of - MaxMyProfit.", category: "guide"},
            {id: 2, href: "https://au.linkedin.com/company/sydney-content-strategy-meetup", title: "Sydney Content Strategy Meetup | LinkedIn", publisher: "au.linkedin.com", description: "Authoritative reference supporting Sydney Content Strategy Meetup | LinkedIn.", category: "guide"},
            {id: 3, href: "https://www.sydneycontentstrategy.com/", title: "Sydney content strategy meetup", publisher: "sydneycontentstrategy.com", description: "Authoritative reference supporting Sydney content strategy meetup.", category: "guide"},
            {id: 4, href: "https://hannahdemilta.com/2013/01/24/5-tips-for-planning-a-sydney-meetup/", title: "5 Tips for Planning a Sydney Meetup \u2013 Hannah DeMilta", publisher: "hannahdemilta.com", description: "Authoritative reference supporting 5 Tips for Planning a Sydney Meetup \u2013 Hannah DeMilta.", category: "guide"},
            {id: 5, href: "https://localsaucetours.com.au/unique-ways-to-meet-people-in-sydney/", title: "Unique Ways to Meet People in Sydney - Local Sauce Tours", publisher: "localsaucetours.com.au", description: "Authoritative reference supporting Unique Ways to Meet People in Sydney - Local Sauce Tours.", category: "guide"},
            {id: 6, href: "https://www.australiansmallbusiness.com.au/services/small-business-sydney-meetups/", title: "Small Business Meetups | Online Business Admin Courses & AI Assistants for Small Business", publisher: "australiansmallbusiness.com.au", description: "Authoritative reference supporting Small Business Meetups | Online Business Admin Courses & AI Assistants for Small Business.", category: "guide"},
            {id: 7, href: "https://sleek.com/au/resources/business-networking-group/", title: "Best Business Networking Groups in Australia (2026)", publisher: "sleek.com", description: "Authoritative reference supporting Best Business Networking Groups in Australia (2026).", category: "guide"},
            {id: 8, href: "https://www.sydneycontentstrategy.com/past-meetups", title: "Sydney content strategy meetup - Past meetups", publisher: "sydneycontentstrategy.com", description: "Authoritative reference supporting Sydney content strategy meetup - Past meetups.", category: "guide"},
            {id: 9, href: "https://bxnetworking.com/small-business-networking-events-sydney/", title: "Small Business Networking Events in Sydney | Bx Networking", publisher: "bxnetworking.com", description: "Authoritative reference supporting Small Business Networking Events in Sydney | Bx Networking.", category: "guide"},
            {id: 10, href: "https://events.humanitix.com/good-things-sydney-meetup", title: "Good Things Sydney Meetup", publisher: "events.humanitix.com", description: "Authoritative reference supporting Good Things Sydney Meetup.", category: "guide"},
          ]}
          heading="Sources & further reading"
        />

        <ArticleDisclaimer />

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Compare your next Sydney meetup options"
            body="Use a simple checklist to compare relevance, format, location, cadence and follow-up notes before you RSVP."
            buttonText="Open the meetup checklist"
            buttonHref="/resources/sydney-meetup-worksheet"
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
