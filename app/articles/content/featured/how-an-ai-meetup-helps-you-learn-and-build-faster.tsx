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

const TOPIC = "How an AI Meetup Helps You Learn and Build Faster"
export const CATEGORY = "featured"
export const SLUG = "how-an-ai-meetup-helps-you-learn-and-build-faster"
export const DATE_PUBLISHED = "2026-06-02"
export const DATE_MODIFIED = "2026-06-02"
export const DESCRIPTION = "Meetup guide for faster AI learning and better projects."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-9448fd34-aa11-4f0d-b36d-b6fec453dc71.jpg?alt=media&token=2a29e2be-3761-459c-93b2-2b61bad80bf8"
const HERO_IMAGE_ALT = "Close-up of AI meetup attendees discussing a laptop prototype and notes during a hands-on learning session"
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
  { id: 1, question: "Do people still use meetups for AI learning?", answer: "Yes. The article shows that AI meetups remain useful when they combine technical talks, Q&A, open discussion and networking. The value is the repeatable learning loop, not only the event platform." },
  { id: 2, question: "How can an AI meetup help me learn faster?", answer: "A meetup turns passive learning into conversation. You can hear a concrete technical example, ask questions while the topic is fresh, and compare approaches with people at different experience levels." },
  { id: 3, question: "How can a meetup improve an AI project?", answer: "A meetup can help you test an idea before investing too much time. Feedback from experienced people can sharpen scope, reveal blind spots, and point to more practical next steps." },
  { id: 4, question: "What should I look for in a useful AI meetup?", answer: "Look for a clear topic, a visible agenda, practical or technical content, time for Q&A, open discussion and networking. A good meetup gives you both information and chances to talk with relevant people." },
  { id: 5, question: "How should I prepare before attending?", answer: "Bring one learning goal, one project question and one person or type of person you would like to follow up with. This keeps the event practical without turning it into a sales pitch." },
]

export const summaryHighlights = {
  heading: "Key facts: How an AI Meetup Helps You Learn and Build Faster",
  intro: "Meetup guide for faster AI learning and better projects.",
  items: [
    { label: "Is Meetup a dating site?", description: "No. In this article, a meetup means a structured learning and networking gathering around a shared interest, such as AI, machine learning, data or startups." },
    { label: "What does a Meetup mean?", description: "A meetup is a focused gathering where people with a shared interest exchange ideas, hear practical talks, ask questions and build useful professional connections." },
    { label: "What has replaced Meetup?", description: "Platforms may change, but the useful format remains recurring community contact around a practical interest. AI builders still benefit from regular talks, Q&A, feedback and networking." },
  ],
}

export const articleMeta = {
  title: "How an AI Meetup Helps You Learn and Build Faster",
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
  { question: "Is Meetup a dating site?", answer: "No. In this article, a meetup means a structured learning and networking gathering around a shared interest, such as AI, machine learning, data or startups." },
  { question: "What does a Meetup mean?", answer: "A meetup is a focused gathering where people with a shared interest exchange ideas, hear practical talks, ask questions and build useful professional connections." },
  { question: "What has replaced Meetup?", answer: "Platforms may change, but the useful format remains recurring community contact around a practical interest. AI builders still benefit from regular talks, Q&A, feedback and networking." },
  { question: "Do people still use meetups for AI learning?", answer: "Yes. The article shows that AI meetups remain useful when they combine technical talks, Q&A, open discussion and networking. The value is the repeatable learning loop, not only the event platform." },
  { question: "How can an AI meetup help me learn faster?", answer: "A meetup turns passive learning into conversation. You can hear a concrete technical example, ask questions while the topic is fresh, and compare approaches with people at different experience levels." },
  { question: "How can a meetup improve an AI project?", answer: "A meetup can help you test an idea before investing too much time. Feedback from experienced people can sharpen scope, reveal blind spots, and point to more practical next steps." },
  { question: "What should I look for in a useful AI meetup?", answer: "Look for a clear topic, a visible agenda, practical or technical content, time for Q&A, open discussion and networking. A good meetup gives you both information and chances to talk with relevant people." },
  { question: "How should I prepare before attending?", answer: "Bring one learning goal, one project question and one person or type of person you would like to follow up with. This keeps the event practical without turning it into a sales pitch." },
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
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"AI meetups make learning less isolated"} data-cf-source-section-id={"intro"}>
        <p><strong>{TOPIC}</strong> — {"A good AI meetup helps people learn faster because it brings technical talks, questions, peer feedback and networking into one repeatable setting. It is a structured gathering around a shared interest, with enough purpose to help people share ideas, hear experienced views and make useful connections."}</p>
        <p>{"An in-person AI meetup might include deep-dive talks on AI, machine learning and data, time to meet speakers and other developers, then Q&A, open discussion and a mixer. That mix matters. For MLAI, the value is practical learning, real-world projects and meaningful professional connections for people building, learning and working with AI in Australia."}</p>
        <div data-cf-component-id={"image:intro"} data-cf-component-type={"image"} data-cf-component-label={"Hero image"} data-cf-source-section-id={"intro"}>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Meetup guide for faster AI learning and better projects."
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
            {"No. In this article, a meetup means a structured learning and networking gathering around a shared interest, such as AI, machine learning, data or startups."}
          </QuoteBlock>
        </div>
        <div id="what-a-meetup-does" data-cf-component-id={"section:what-a-meetup-does"} data-cf-component-type={"section"} data-cf-component-label={"What a meetup actually gives AI builders"} data-cf-source-section-id={"what-a-meetup-does"}>
          <h2>{"What a meetup actually gives AI builders"}</h2>
          <p>{"A meetup gives AI builders a focused room, a shared topic and a clear reason to talk with people working near the same problems. In this article, meetup means a learning and networking gathering, not a dating site. The useful part is simple: people come together around an interest, share what they are trying, and leave with new contacts or ideas."}</p>
          <p>{"Business and startup meetup sources describe this value in practical terms. A Sydney business meetup guide says groups can help people network with others in their field, get advice, avoid costly mistakes and hear how others overcame hurdles. A Perth startup meetup example describes regular gatherings where people learn from others doing similar work, get feedback on ideas, vent frustrations and meet new friends."}</p>
          <p>{"For AI builders, that makes the meetup format durable even when the platform changes. The event might be weekly, fortnightly or occasional. It might focus on startups, technology, product design, investment opportunities or another practical topic. What matters is the recurring community contact: people have a place to compare notes, test their thinking and build professional relationships outside a feed or private chat."}</p>
          <div data-cf-component-id={"image:what-a-meetup-does"} data-cf-component-type={"image"} data-cf-component-label={"Image: What a meetup actually gives AI builders"} data-cf-source-section-id={"what-a-meetup-does"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-065580a4-9e5f-442b-ba5b-9c9eb611e1cd.jpg?alt=media&token=3de5e0a5-4b67-41f8-8966-2efa6b834061"
            alt="AI builders\u2019 notebooks and coffee cups on a meetup table during a focused networking discussion"
            caption="What a meetup actually gives AI builders"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="learn-faster" data-cf-component-id={"section:learn-faster"} data-cf-component-type={"section"} data-cf-component-label={"You learn faster when talks become conversations"} data-cf-source-section-id={"learn-faster"}>
          <h2>{"You learn faster when talks become conversations"}</h2>
          <p>{"A good meetup does more than put a speaker at the front of the room. The Sydney in-person AI meetup described by AICamp starts with check-in, food, drink and networking, then moves into deep-dive AI, machine learning and data talks. People arrive with different projects, questions and levels of experience, so even a short conversation can make a technical topic easier to place."}</p>
          <p>{"The technical talk then gives the group a shared example to work from. In the Sydney agenda, one talk focuses on building an AI image search app using natural language with OpenAI CLIP and vector search. That is more concrete than a broad overview of AI. Attendees can hear how a real implementation is framed, what tools are involved, and where the hard parts may sit. When the talk is followed by Q&A, open discussion and a mixer, passive listening turns into active testing of ideas."}</p>
          <h3>{"Why Q&A changes the learning loop"}</h3>
          <p>{"Q&A gives learners a way to check what they understood while the material is still fresh. These details are often the parts that are hardest to get from a tutorial alone."}</p>
          <p>{"That mix helps the room make sense of the topic faster, because people can compare approaches instead of learning in isolation."}</p>
        </div>
        <div id="build-better-projects" data-cf-component-id={"section:build-better-projects"} data-cf-component-type={"section"} data-cf-component-label={"You build better projects by testing ideas in public"} data-cf-source-section-id={"build-better-projects"}>
          <h2>{"You build better projects by testing ideas in public"}</h2>
          <p>{"A meetup can turn a private project idea into a practical feedback loop. Small business meetup organisers describe these sessions as safe places to share ideas and get experienced opinions."}</p>
          <p>{"The value is not only encouragement. Meetup networking can help people find useful advice, avoid costly mistakes, and hear how others overcame similar hurdles. For an AI or machine learning project, that kind of conversation can sharpen the scope, test whether the problem is useful, and point to better next steps before too much time is spent in the wrong direction."}</p>
          <div data-cf-component-id={"image:build-better-projects"} data-cf-component-type={"image"} data-cf-component-label={"Image: You build better projects by testing ideas in public"} data-cf-source-section-id={"build-better-projects"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ff103e9f-7cce-4a1f-9f13-33ca845288fd.jpg?alt=media&token=cc6f3e10-bf2f-4693-ad18-02fae02590c4"
            alt="Small business meetup workspace with project notes on a table, ready for public feedback and idea testing"
            caption="You build better projects by testing ideas in public"
            width={1200}
            height={800}
          />
          </div>
          <h3>{"Before the meetup"}</h3>
          <p>{"This gives experienced people enough context to offer useful opinions instead of general advice."}</p>
          <h3>{"During the meetup"}</h3>
          <p>{"Use the room as a source of practical judgment. The aim is to learn from people in your field, not to defend every choice."}</p>
        </div>

        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the checklist"}>
          <ArticleResourceCTA
            eyebrow="Free guide"
            title={"Get the meetup checklist"}
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
            "What a meetup actually gives AI builders",
            "You learn faster when talks become conversations",
            "You build better projects by testing ideas in public",
            "The right meetup helps you find your people",
            "How to choose a meetup and get real value from it",
            ]}
            accent="indigo"
          />
        </div>
        <div id="find-your-community" data-cf-component-id={"section:find-your-community"} data-cf-component-type={"section"} data-cf-component-label={"The right meetup helps you find your people"} data-cf-source-section-id={"find-your-community"}>
          <h2>{"The right meetup helps you find your people"}</h2>
          <p>{"A good meetup is not only a place to collect contacts. It is a place to find people who are working in your field, facing similar problems, and willing to share what they have learned. Business meetup guides describe these groups as a way to network with people from your field, hear how others overcame hurdles, get advice, exchange ideas, and meet new customers or collaborators."}</p>
          <p>{"That matters for AI builders because useful projects rarely sit inside one skill set. An AI product may need engineering, data, product, design, research, operations, and business input. Startup meetups are useful because they bring together people who are already involved in a startup, or thinking about starting one. When you attend more than once, people can see how you think across several conversations."}</p>
          <div data-cf-component-id={"image:find-your-community"} data-cf-component-type={"image"} data-cf-component-label={"Image: The right meetup helps you find your people"} data-cf-source-section-id={"find-your-community"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b93be888-0509-4a02-b1d4-3f997cb9beff.jpg?alt=media&token=d98ed92c-2854-4df8-80f1-1684824eda97"
            alt="Hands exchanging business cards at a crowded meetup, close-up of networking in a candid moment"
            caption="The right meetup helps you find your people"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="choose-and-show-up" data-cf-component-id={"section:choose-and-show-up"} data-cf-component-type={"section"} data-cf-component-label={"How to choose a meetup and get real value from it"} data-cf-source-section-id={"choose-and-show-up"}>
          <h2>{"How to choose a meetup and get real value from it"}</h2>
          <p>{"Choose a meetup that makes its value clear before you arrive. A useful listing should name the topic, show the agenda, and leave room for both learning and conversation. The Sydney AI meetup from AICamp is a simple model: check-in with food, drink and networking, then tech talks, then Q&A, open discussion and a mixer. That mix gives you content to learn from and time to meet people who are working on similar problems."}</p>
          <p>{"Before you go, set a small aim for the event. Bring one learning goal, one project question, and one person or type of person you would like to follow up with. This keeps the meetup practical without turning it into a sales pitch. Regular attendance also matters. Perth startup examples include weekly Friday meetups and fortnightly catch-ups where people learn, get feedback, and meet others in the community. One event can be useful, but repeated attendance is where trust and better conversations usually start."}</p>
        </div>
        <div id="conclusion" data-cf-component-id={"section:conclusion"} data-cf-component-type={"section"} data-cf-component-label={"Make your next meetup an experiment"} data-cf-source-section-id={"conclusion"}>
          <h2>{"Make your next meetup an experiment"}</h2>
          <p>{"A good meetup can shorten the distance between learning and doing. AI meetups often combine technical talks, Q&A, open discussion and time with other developers. Business and startup meetups can also give people a place to exchange ideas, hear experienced opinions and learn from others working through similar problems."}</p>
          <p>{"For your next meetup, treat attendance as a small experiment. After the talk, speak to at least one person about what you are working on or what you found interesting. The goal is not to collect contacts."}</p>
          <p>{"MLAI-style community participation works best when it becomes part of your practical AI habit."}</p>
          <div data-cf-component-id={"image:conclusion"} data-cf-component-type={"image"} data-cf-component-label={"Image: Make your next meetup an experiment"} data-cf-source-section-id={"conclusion"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-1f06bda9-b32b-470b-b927-d1c953b82ac2.jpg?alt=media&token=3782ebd4-aad2-4393-bb78-3c6b49e9bec5"
            alt="Developers and founders share ideas during a candid meetup discussion in a small event space"
            caption="Make your next meetup an experiment"
            width={1200}
            height={800}
          />
          </div>
        </div>

        <div data-cf-component-id={"quote:keep-moving-forward"} data-cf-component-type={"quote"} data-cf-component-label={"Keep moving forward"}>
          <QuoteBlock title="Keep moving forward" variant="orange">
            {"Platforms may change, but the useful format remains recurring community contact around a practical interest. AI builders still benefit from regular talks, Q&A, feedback and networking."}
          </QuoteBlock>
        </div>

        <div data-cf-component-id={"template-resource-cta"} data-cf-component-type={"template-resource-cta"} data-cf-component-label={"Free MLAI Template Resource"}>
          <MLAITemplateResourceCTA />
        </div>

      <ArticleReferences
          references={[
            {id: 1, href: "https://www.firstclassaccounts.com/blog/6-really-simple-tips-for-using-meetup-as-part-of-your-business-strategy/", title: "6 simple ways to use Meetup to grow your business network - First Class Accounts", publisher: "firstclassaccounts.com", description: "Authoritative reference supporting 6 simple ways to use Meetup to grow your business network - First Class Accounts.", category: "guide"},
            {id: 2, href: "https://www.aicamp.ai/event/eventdetails/W2023111501", title: "Learn AI with global developers community | AICamp", publisher: "aicamp.ai", description: "Authoritative reference supporting Learn AI with global developers community | AICamp.", category: "guide"},
            {id: 3, href: "https://andygrunwald.com/blog/lesson-learned-from-running-a-local-meetup/", title: "Lessons learned from running a local meetup - Andy Grunwald", publisher: "andygrunwald.com", description: "Authoritative reference supporting Lessons learned from running a local meetup - Andy Grunwald.", category: "guide"},
            {id: 4, href: "https://maxmyprofit.com.au/sydney-business-meetup-groups/", title: "6 Sydney Business Meetup Groups you Should be a Part Of - MaxMyProfit", publisher: "maxmyprofit.com.au", description: "Authoritative reference supporting 6 Sydney Business Meetup Groups you Should be a Part Of - MaxMyProfit.", category: "guide"},
            {id: 5, href: "https://blog.spacecubed.com/5-perth-meetups-all-entrepreneurs-and-startups-should-join", title: "5 Perth Meetups all Entrepreneurs and Startups Should Join", publisher: "blog.spacecubed.com", description: "Authoritative reference supporting 5 Perth Meetups all Entrepreneurs and Startups Should Join.", category: "guide"},
            {id: 6, href: "https://andreas.scherbaum.la/post/2025-05-05_checklist-for-meetup-organizers/", title: "Checklist for Meetup Organizers | Andreas 'ads' Scherbaum", publisher: "andreas.scherbaum.la", description: "Authoritative reference supporting Checklist for Meetup Organizers | Andreas 'ads' Scherbaum.", category: "guide"},
            {id: 7, href: "https://jakeworth.com/posts/how-i-organize-a-meetup/", title: "How to Start a Meetup Group (Lessons from Running One for 10 Years) | Jake Worth", publisher: "jakeworth.com", description: "Authoritative reference supporting How to Start a Meetup Group (Lessons from Running One for 10 Years) | Jake Worth.", category: "guide"},
            {id: 8, href: "https://www.australiansmallbusiness.com.au/services/small-business-sydney-meetups/", title: "Small Business Meetups | Online Business Admin Courses & AI Assistants for Small Business", publisher: "australiansmallbusiness.com.au", description: "Authoritative reference supporting Small Business Meetups | Online Business Admin Courses & AI Assistants for Small Business.", category: "guide"},
            {id: 9, href: "https://mikeschinkel.com/2010/25-best-practices-for-meetup-organizers/", title: "25 Best Practices for Meetup Organizers \u2013 MikeSchinkel.com", publisher: "mikeschinkel.com", description: "Authoritative reference supporting 25 Best Practices for Meetup Organizers \u2013 MikeSchinkel.com.", category: "guide"},
            {id: 10, href: "https://www.localguidesconnect.com/t/how-to-organize-a-successful-meet-up/463414", title: "How to organize a successful meet-up - Get started on Connect - Local Guides Connect", publisher: "localguidesconnect.com", description: "Authoritative reference supporting How to organize a successful meet-up - Get started on Connect - Local Guides Connect.", category: "guide"},
          ]}
          heading="Sources & further reading"
        />

        <ArticleDisclaimer />

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Join practical AI conversations in Australia"
            body="Explore MLAI community events, talks and resources designed for people learning, building and working with AI."
            buttonText="Explore MLAI events"
            buttonHref="/events"
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
