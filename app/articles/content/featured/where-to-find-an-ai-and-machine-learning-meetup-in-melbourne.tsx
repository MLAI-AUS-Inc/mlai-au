import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '../../authors'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import QuoteBlock from '../../../components/articles/QuoteBlock'
import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
import AudienceGrid from '../../../components/articles/AudienceGrid'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import MLAITemplateResourceCTA from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'

export const useCustomHeader = true

const TOPIC = "Where to Find an AI and Machine Learning Meetup in Melbourne"
export const CATEGORY = "featured"
export const SLUG = "where-to-find-an-ai-and-machine-learning-meetup-in-melbourne"
export const DATE_PUBLISHED = "2026-06-10"
export const DATE_MODIFIED = "2026-06-10"
export const DESCRIPTION = "Meetup Melbourne guide for AI and machine learning events"
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-ad20d1a2-d614-4f8c-8606-c8fe1c800c8c.jpg?alt=media&token=b389c532-31e8-4367-8839-b8fb033fdc8f"
const HERO_IMAGE_ALT = "Close-up candid of Melbourne AI meetup attendees discussing machine learning notes on a laptop at a local event"
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
  { id: 1, question: "Where should I start if I want an AI meetup in Melbourne?", answer: "Start with AI hubs, research communities, and event pages that publish technical agendas. Melbourne Connect and AI at Melbourne are useful starting points for research-led AI activity." },
  { id: 2, question: "How do I know if a meetup is worth attending?", answer: "Look for clear speakers, topics, agenda structure, networking time, and signs of an active community. A detailed event page helps you decide whether the meetup is technical, social, or mixed." },
  { id: 3, question: "Are non-AI Melbourne meetups useful for AI networking?", answer: "Yes, but treat them as adjacent rather than AI-specific. Talent, founder, recruiter, developer, and local community groups can lead to useful introductions around AI projects or roles." },
  { id: 4, question: "What should I do after attending an AI meetup?", answer: "Follow up with speakers and attendees, note useful groups, and schedule the next event before the habit fades. A monthly routine makes it easier to keep finding relevant events." },
]

export const summaryHighlights = {
  heading: "Key facts: Where to Find an AI and Machine Learning Meetup in Melbourne",
  intro: "Meetup Melbourne guide for AI and machine learning events",
  items: [
    { label: "Where do over 40s go in Melbourne?", description: "For AI and machine learning interests, start with research communities, innovation hubs, and event pages that publish clear agendas. Adjacent professional groups can also help with introductions." },
    { label: "Where to meet single girls in Melbourne?", description: "This guide focuses on professional AI and machine learning meetups, not dating. For relevant connections, prioritise events with networking time, open discussion, speakers, and community organisers." },
    { label: "What to do in Melbourne with my boyfriend?", description: "If you both like technology, attend an AI or ML event with talks, Q&A, and networking. Check the agenda first to match the format to your interests." },
  ],
}

export const articleMeta = {
  title: "Where to Find an AI and Machine Learning Meetup in Melbourne",
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
  { question: "Where do over 40s go in Melbourne?", answer: "For AI and machine learning interests, start with research communities, innovation hubs, and event pages that publish clear agendas. Adjacent professional groups can also help with introductions." },
  { question: "Where to meet single girls in Melbourne?", answer: "This guide focuses on professional AI and machine learning meetups, not dating. For relevant connections, prioritise events with networking time, open discussion, speakers, and community organisers." },
  { question: "What to do in Melbourne with my boyfriend?", answer: "If you both like technology, attend an AI or ML event with talks, Q&A, and networking. Check the agenda first to match the format to your interests." },
  { question: "Where should I start if I want an AI meetup in Melbourne?", answer: "Start with AI hubs, research communities, and event pages that publish technical agendas. Melbourne Connect and AI at Melbourne are useful starting points for research-led AI activity." },
  { question: "How do I know if a meetup is worth attending?", answer: "Look for clear speakers, topics, agenda structure, networking time, and signs of an active community. A detailed event page helps you decide whether the meetup is technical, social, or mixed." },
  { question: "Are non-AI Melbourne meetups useful for AI networking?", answer: "Yes, but treat them as adjacent rather than AI-specific. Talent, founder, recruiter, developer, and local community groups can lead to useful introductions around AI projects or roles." },
  { question: "What should I do after attending an AI meetup?", answer: "Follow up with speakers and attendees, note useful groups, and schedule the next event before the habit fades. A monthly routine makes it easier to keep finding relevant events." },
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
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"The best places to start your meetup Melbourne search"} data-cf-source-section-id={"intro"}>
        <p><strong>{TOPIC}</strong> — {"If you are searching for a meetup Melbourne option in AI or machine learning, start with the communities that already publish clear AI activity. Melbourne Connect describes AI at Melbourne as a research community for artificial intelligence, with work across machine learning, natural language processing, robotics, and ethical AI. That makes it a useful first stop when you want to find serious AI networks, research-led conversations, and people working on real applications."}</p>
        <p>{"AICamp\u2019s Melbourne AI and ML meetup, for example, lists an in-person format with check-in, food and drink, networking, tech talks, Q&A, open discussion, and a mixer. Those details help you judge whether an event is right for learning, meeting developers, or hearing practical talks before you register."}</p>
        <p>{"You can also widen the search to adjacent Melbourne communities. Talent, digital inclusion, local guide, and social meetup groups can lead to useful introductions, even when they are not AI-specific. Use them as discovery paths, then prioritise events that clearly name the topic, audience, speakers, agenda, and networking format."}</p>
        <div data-cf-component-id={"image:intro"} data-cf-component-type={"image"} data-cf-component-label={"Hero image"} data-cf-source-section-id={"intro"}>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Meetup Melbourne guide for AI and machine learning events"
          width={1600}
          height={1067}
        />
        </div>
        </div>

        <div data-cf-component-id={"audience-grid"} data-cf-component-type={"audience-grid"} data-cf-component-label={"Who is this guide for?"}>
          <AudienceGrid
            heading="Who is this guide for?"
            cards={[
            {
              title: 'Founders & Builders',
              description: 'For operators validating demand, pitching a vision, and moving before momentum stalls.',
              icon: <RocketLaunchIcon className="h-6 w-6" />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'For readers learning how strong technical partners evaluate traction, skills, and fit.',
              icon: <AcademicCapIcon className="h-6 w-6" />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'For connectors, mentors, and organisers helping founders meet collaborators in the right rooms.',
              icon: <UsersIcon className="h-6 w-6" />,
              variant: 'yellow',
            },
            ]}
          />
        </div>

        <div data-cf-component-id={"quote:key-insight"} data-cf-component-type={"quote"} data-cf-component-label={"Key insight"}>
          <QuoteBlock title="Key insight" variant="purple">
            {"For AI and machine learning interests, start with research communities, innovation hubs, and event pages that publish clear agendas. Adjacent professional groups can also help with introductions."}
          </QuoteBlock>
        </div>
        <div id="ai-hubs-and-research-communities" data-cf-component-id={"section:ai-hubs-and-research-communities"} data-cf-component-type={"section"} data-cf-component-label={"Start with AI hubs and research communities"} data-cf-source-section-id={"ai-hubs-and-research-communities"}>
          <h2>{"Start with AI hubs and research communities"}</h2>
          <p>{"A good way to find a credible meetup in Melbourne is to start with AI-focused hubs and research communities. Melbourne Connect describes AI at Melbourne as a hub for artificial intelligence innovation and research."}</p>
          <p>{"The research community at Melbourne Connect spans machine learning, natural language processing, robotics, ethical AI, and applied interdisciplinary work. When you search for Melbourne AI events, look for public seminars, showcases, workshops, and community programming connected to these kinds of institutions. They can help you see where real research, applied projects, and local professional networks overlap."}</p>
          <div data-cf-component-id={"image:ai-hubs-and-research-communities"} data-cf-component-type={"image"} data-cf-component-label={"Image: Start with AI hubs and research communities"} data-cf-source-section-id={"ai-hubs-and-research-communities"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3d95e524-52d0-4e28-95dd-a5c4320c53e5.jpg?alt=media&token=7ad76ccf-7fec-4a8e-8c8b-0de0fc356411"
            alt="Notebook and coffee beside AI research flyers at a Melbourne community meetup table"
            caption="Start with AI hubs and research communities"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="technical-event-pages" data-cf-component-id={"section:technical-event-pages"} data-cf-component-type={"section"} data-cf-component-label={"Use event pages to find technical AI and ML nights"} data-cf-source-section-id={"technical-event-pages"}>
          <h2>{"Use event pages to find technical AI and ML nights"}</h2>
          <p>{"A good event page can tell you a lot before you commit to a meetup Melbourne night. The AICamp listing describes an in-person AI and ML meetup in Melbourne, run in collaboration with DataStax. It sets expectations clearly: deep-dive tech talks on AI, ML, and data, plus food and drinks, networking with speakers and developers, Q&A, open discussion, and a mixer."}</p>
          <p>{"Check-in, food, drinks, and networking are listed from 5:30pm to 6:20pm. Tech talks run from 6:30pm to 8:00pm. Q&A, open discussion, and the mixer start at 8:00pm. That timing helps you judge whether the event is mainly social, mainly technical, or a mix of both."}</p>
          <p>{"One listed talk is about building an AI image search app using natural language with the OpenAI CLIP model and vector search. If you are interested in applied AI, search, embeddings, or developer-focused examples, that is a strong signal that the night may be relevant. If the topic feels too advanced or too far from your goals, you can keep looking for a better-fit Melbourne AI meetup."}</p>
          <div data-cf-component-id={"image:technical-event-pages"} data-cf-component-type={"image"} data-cf-component-label={"Image: Use event pages to find technical AI and ML nights"} data-cf-source-section-id={"technical-event-pages"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3c84eca8-c66e-435a-80d7-172ba0ba3296.jpg?alt=media&token=0ab8abb2-b8f6-4812-b32c-c6299804b1a5"
            alt="Melbourne AI and ML meetup event page open on a laptop in a quiet workspace before a technical night"
            caption="Use event pages to find technical AI and ML nights"
            width={1200}
            height={800}
          />
          </div>
        </div>

        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the checklist"}>
          <ArticleResourceCTA
            eyebrow="Free guide"
            title={"Get the meetup melbourne checklist"}
            description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
            buttonLabel="Download now"
            buttonHref="/articles"
            accent="purple"
          />
        </div>

        <div data-cf-component-id={"step-list:practical-next-steps"} data-cf-component-type={"step-list"} data-cf-component-label={"Practical next steps"}>
          <ArticleStepList
            title="Practical next steps"
            steps={[
            "Start with AI-specific hubs and research communities such as Melbourne Connect and AI at Melbourne.",
            "Check event pages for in-person AI and ML meetups that publish agendas, speakers, talk topics, and networking details.",
            "Use adjacent technology, talent, and local interest communities to discover introductions and event leads.",
            ]}
            accent="indigo"
          />
        </div>
        <div id="choose-the-right-format" data-cf-component-id={"section:choose-the-right-format"} data-cf-component-type={"section"} data-cf-component-label={"Choose the right meetup format before you RSVP"} data-cf-source-section-id={"choose-the-right-format"}>
          <h2>{"Choose the right meetup format before you RSVP"}</h2>
          <p>{"Before you RSVP to a meetup Melbourne event, read the agenda closely. A good agenda usually tells you whether the night is built around learning, networking, open discussion, or a mix of all three. The AICamp Melbourne AI and ML meetup is a clear example: it includes check-in, food and networking, then deep-dive tech talks, followed by Q&A, open discussion and a mixer."}</p>
          <p>{"Match the format to what you need that week. If you want new skills, choose a session with expert-led talks or workshops. If you want contacts, look for food, drinks, mixers or open discussion time. If you want a broader view of AI work in Melbourne, research communities and innovation hubs can help you see how machine learning, natural language processing, robotics and ethical AI connect across fields."}</p>
          <h3>{"Technical talks suit practical learning"}</h3>
          <p>{"Technical talks are a strong fit when you want implementation detail or exposure to current tools. The AICamp Melbourne meetup describes deep-dive talks on AI, ML and data, including a talk on building an AI image search app with OpenAI CLIP and vector search. That kind of agenda is best when you want to learn from builders and ask focused questions."}</p>
          <h3>{"Mixers suit introductions and feedback"}</h3>
          <p>{"Networking time is better when your main goal is conversation. Check-in sessions, food and drink, open discussion, Q&A and mixers create space to meet speakers, developers and other attendees."}</p>
          <h3>{"Research communities suit a wider AI view"}</h3>
          <p>{"Research and innovation hubs are useful when you want context beyond one tool or product. Melbourne Connect describes AI at Melbourne as a research community bringing together experts across machine learning, natural language processing, robotics and ethical AI. It also points to interdisciplinary work across computer science, engineering, healthcare and the social sciences."}</p>
        </div>
        <div id="adjacent-communities" data-cf-component-id={"section:adjacent-communities"} data-cf-component-type={"section"} data-cf-component-label={"Look at adjacent communities for useful introductions"} data-cf-source-section-id={"adjacent-communities"}>
          <h2>{"Look at adjacent communities for useful introductions"}</h2>
          <p>{"Not every useful meetup Melbourne search needs to start with an AI event. Some adjacent professional communities can help you meet people who work near AI projects, even when the group itself is not AI-specific. Melbourne Talent Meetup, for example, describes itself as Melbourne\u2019s largest talent and recruiter community. Its focus is staffing, recruiting, HR and a more collaborative talent community across Melbourne."}</p>
          <p>{"That kind of group can be useful if your goal is a hiring conversation, a founder introduction, or a better view of cross-functional roles around AI teams. Treat it as adjacent, not equivalent. An AI and ML meetup may offer technical talks and developer networking, while a recruiter or talent meetup is more likely to help with people, roles and market context."}</p>
          <p>{"A Local Guides Connect post describes a Melbourne Local Guides meet-up in Prahran that was planned through a community post, with personal outreach used when public responses were limited. This does not make it an AI meetup, but it shows that Melbourne meetups can form around specific interests outside formal tech event pages."}</p>
          <p>{"First, shortlist AI-specific meetups when you need technical learning or AI peer discussion. Then check talent, founder, local guide, student, product or community forums when you need broader introductions. Keep the distinction clear so you do not mistake every Melbourne meetup for an AI opportunity."}</p>
          <div data-cf-component-id={"image:adjacent-communities"} data-cf-component-type={"image"} data-cf-component-label={"Image: Look at adjacent communities for useful introductions"} data-cf-source-section-id={"adjacent-communities"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-90fab5a0-51d5-43cd-b636-b994fea46db1.jpg?alt=media&token=e68a6008-35ba-40c3-adc1-8392642139bc"
            alt="Close-up of meetup attendees exchanging business cards during a casual Melbourne networking event"
            caption="Look at adjacent communities for useful introductions"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="monthly-meetup-routine" data-cf-component-id={"section:monthly-meetup-routine"} data-cf-component-type={"section"} data-cf-component-label={"Build a simple monthly meetup routine"} data-cf-source-section-id={"monthly-meetup-routine"}>
          <h2>{"Build a simple monthly meetup routine"}</h2>
          <p>{"The easiest way to keep finding a useful meetup Melbourne has to offer is to make it a monthly habit. Start with AI hubs and research communities such as Melbourne Connect, then scan event pages that publish clear technical agendas. A strong AI or ML meetup will usually tell you the topic, speaker, timing, and format before you arrive."}</p>
          <p>{"The AICamp Melbourne AI and ML meetup, for example, listed check-in time, food and networking, deep-dive tech talks, Q&A, open discussion, and a mixer."}</p>
          <p>{"Adjacent Melbourne meetups can still be useful, especially if they connect you with developers, recruiters, founders, talent teams, or local organisers. Treat them as supporting events rather than AI-specific learning spaces."}</p>
          <ul>
            <li>{"Once a month, check AI hubs, research communities, and event pages."}</li>
            <li>{"Shortlist one technical AI or ML event with a clear agenda."}</li>
            <li>{"Add one networking-friendly session if you want broader local connections."}</li>
            <li>{"After attending, follow up and schedule the next meetup."}</li>
          </ul>
          <div data-cf-component-id={"image:monthly-meetup-routine"} data-cf-component-type={"image"} data-cf-component-label={"Image: Build a simple monthly meetup routine"} data-cf-source-section-id={"monthly-meetup-routine"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ccca84b1-9923-4e7b-9c32-6be57d77b27e.jpg?alt=media&token=f2d37a4d-47e8-442e-8ddc-f9ffe394cc5d"
            alt="Monthly AI meetup in Melbourne with attendees chatting in a casual community event space"
            caption="Build a simple monthly meetup routine"
            width={1200}
            height={800}
          />
          </div>
        </div>

        <div data-cf-component-id={"quote:keep-moving-forward"} data-cf-component-type={"quote"} data-cf-component-label={"Keep moving forward"}>
          <QuoteBlock title="Keep moving forward" variant="orange">
            {"If you both like technology, attend an AI or ML event with talks, Q&A, and networking. Check the agenda first to match the format to your interests."}
          </QuoteBlock>
        </div>

        <div data-cf-component-id={"template-resource-cta"} data-cf-component-type={"template-resource-cta"} data-cf-component-label={"Free MLAI Template Resource"}>
          <MLAITemplateResourceCTA />
        </div>

      <ArticleReferences
          references={[
            {id: 1, href: "https://www.melbconnect.com.au/ai-melbourne", title: "Melbourne Connect | Melbourne Connect | Melbourne AI Innovations &\u2026", publisher: "melbconnect.com.au", description: "Authoritative reference supporting Melbourne Connect | Melbourne Connect | Melbourne AI Innovations &\u2026.", category: "guide"},
            {id: 2, href: "https://www.aicamp.ai/event/eventdetails/W2023112022", title: "Learn AI with global developers community | AICamp", publisher: "aicamp.ai", description: "Authoritative reference supporting Learn AI with global developers community | AICamp.", category: "guide"},
            {id: 3, href: "https://socialmelbourne.com/blog/melbourne~social-meetups-guide-melbourne", title: "Social Meetups in Melbourne: Complete Guide to Finding and Attending Events", publisher: "socialmelbourne.com", description: "Authoritative reference supporting Social Meetups in Melbourne: Complete Guide to Finding and Attending Events.", category: "guide"},
            {id: 4, href: "https://au.linkedin.com/company/melbourne-talent-meetup", title: "Melbourne Talent Meetup | LinkedIn", publisher: "au.linkedin.com", description: "Authoritative reference supporting Melbourne Talent Meetup | LinkedIn.", category: "guide"},
            {id: 5, href: "https://www.localguidesconnect.com/t/recap-melbourne-local-guides-meetup-in-prahran/402521", title: "[RECAP] Melbourne Local Guides meetup in Prahran! - Meet-ups - Local Guides Connect", publisher: "localguidesconnect.com", description: "Authoritative reference supporting [RECAP] Melbourne Local Guides meetup in Prahran! - Meet-ups - Local Guides Connect.", category: "guide"},
            {id: 6, href: "https://events.humanitix.com/good-things-melbourne-meetup", title: "Good Things Melbourne Meetup", publisher: "events.humanitix.com", description: "Authoritative reference supporting Good Things Melbourne Meetup.", category: "guide"},
            {id: 7, href: "https://events.humanitix.com/melbourne-talent-meetup-31-leadership-through-a-different-lens", title: "Melbourne Talent Meetup #31 - Leadership Through A Different Lens", publisher: "events.humanitix.com", description: "Authoritative reference supporting Melbourne Talent Meetup #31 - Leadership Through A Different Lens.", category: "guide"},
            {id: 8, href: "https://www.planning.vic.gov.au/guides-and-resources/strategies-and-initiatives/plan-melbourne/implementation", title: "Implementation", publisher: "planning.vic.gov.au", description: "Authoritative reference supporting Implementation.", category: "guide"},
            {id: 9, href: "https://mikeschinkel.com/2010/25-best-practices-for-meetup-organizers/", title: "25 Best Practices for Meetup Organizers \u2013 MikeSchinkel.com", publisher: "mikeschinkel.com", description: "Authoritative reference supporting 25 Best Practices for Meetup Organizers \u2013 MikeSchinkel.com.", category: "guide"},
          ]}
          heading="Sources & further reading"
        />

        <ArticleDisclaimer />

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Build your AI network in Melbourne"
            body="Use a simple monthly routine: check AI hubs, scan event pages, shortlist one technical event, and add one networking-friendly session if you want broader local connections."
            buttonText="Explore AI community resources"
            buttonHref="/resources"
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
