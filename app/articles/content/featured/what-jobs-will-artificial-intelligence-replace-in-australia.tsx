import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '../../authors'
import { ArticleFAQ } from '~/components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import { QuoteBlock } from '../../../components/articles/QuoteBlock'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import { AudienceGrid } from '../../../components/articles/AudienceGrid'
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import { MLAITemplateResourceCTA } from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import { ArticleDisclaimer } from '../../../components/articles/ArticleDisclaimer'

export const useCustomHeader = true

const TOPIC = "What Jobs Will Artificial Intelligence Replace in Australia?"
export const CATEGORY = "featured"
export const SLUG = "what-jobs-will-artificial-intelligence-replace-in-australia"
export const DATE_PUBLISHED = "2026-06-10"
export const DATE_MODIFIED = "2026-06-10"
export const DESCRIPTION = "What jobs will artificial intelligence replace in Australia, and which roles are more likely to be augmented than removed."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d4df182f-c37d-4a89-a0b8-3360cd482b42.jpg?alt=media&token=ebc0675f-4c19-4030-b8e2-f06f6bac08d1"
const HERO_IMAGE_ALT = "Australian workers discussing AI tools on a laptop in a close-up candid office moment"
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
  { id: 1, question: "Are Australian jobs more likely to be replaced or augmented by AI?", answer: "The article points to augmentation as the stronger Australian signal. Research cited in the article says generative AI has greater capacity to augment work than fully automate it, although some jobs have higher exposure." },
  { id: 2, question: "What types of work are most exposed to AI automation?", answer: "Work is more exposed when it is routine, rules-based, digital, and information-heavy. Examples include clerical processing, administration, data entry, basic customer support workflows, scheduling, simple content production, and first-pass research." },
  { id: 3, question: "Which jobs are less likely to be fully replaced by AI?", answer: "Jobs that depend on trust, judgement, care, accountability, physical skill, relationships, or changing local context are less likely to be fully replaced. Examples discussed include healthcare, skilled trades, teaching, construction, creative direction, and client-facing advisory work." },
  { id: 4, question: "How should startup founders plan for AI job risk?", answer: "Founders should map tasks before redesigning roles. Start with task frequency, decision risk, customer impact, and human accountability, then test AI on high-frequency, low-risk work while keeping people responsible for important decisions." },
  { id: 5, question: "What should workers do to prepare for AI in the workplace?", answer: "Workers should build AI literacy and learn how to use tools safely, check outputs, spot errors, and connect AI to real business problems. Stronger careers will combine tool use with human judgement, context, and accountability." },
]

export const summaryHighlights = {
  heading: "Key facts: What Jobs Will Artificial Intelligence Replace in Australia?",
  intro: "What jobs will artificial intelligence replace in Australia, and which roles are more likely to be augmented than removed.",
  items: [
    { label: "Which job will be replaced by AI?", description: "AI is most likely to replace routine tasks inside clerical, administrative, data entry, basic support, scheduling, and repeatable information roles. Whole-job replacement is less certain than task automation." },
    { label: "What jobs will be gone by 2030?", description: "The article does not claim specific jobs will disappear by 2030. It frames risk by task exposure, with routine digital work more exposed and judgement-heavy work more resilient." },
    { label: "Why is Gen Z struggling to get jobs?", description: "The grounded article does not directly analyse Gen Z job struggles. It notes that school leavers and career changers increasingly need AI literacy alongside human strengths such as judgement and customer context." },
  ],
}

export const articleMeta = {
  title: "What Jobs Will Artificial Intelligence Replace in Australia?",
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
  { question: "Which job will be replaced by AI?", answer: "AI is most likely to replace routine tasks inside clerical, administrative, data entry, basic support, scheduling, and repeatable information roles. Whole-job replacement is less certain than task automation." },
  { question: "What jobs will be gone by 2030?", answer: "The article does not claim specific jobs will disappear by 2030. It frames risk by task exposure, with routine digital work more exposed and judgement-heavy work more resilient." },
  { question: "Why is Gen Z struggling to get jobs?", answer: "The grounded article does not directly analyse Gen Z job struggles. It notes that school leavers and career changers increasingly need AI literacy alongside human strengths such as judgement and customer context." },
  { question: "Are Australian jobs more likely to be replaced or augmented by AI?", answer: "The article points to augmentation as the stronger Australian signal. Research cited in the article says generative AI has greater capacity to augment work than fully automate it, although some jobs have higher exposure." },
  { question: "What types of work are most exposed to AI automation?", answer: "Work is more exposed when it is routine, rules-based, digital, and information-heavy. Examples include clerical processing, administration, data entry, basic customer support workflows, scheduling, simple content production, and first-pass research." },
  { question: "Which jobs are less likely to be fully replaced by AI?", answer: "Jobs that depend on trust, judgement, care, accountability, physical skill, relationships, or changing local context are less likely to be fully replaced. Examples discussed include healthcare, skilled trades, teaching, construction, creative direction, and client-facing advisory work." },
  { question: "How should startup founders plan for AI job risk?", answer: "Founders should map tasks before redesigning roles. Start with task frequency, decision risk, customer impact, and human accountability, then test AI on high-frequency, low-risk work while keeping people responsible for important decisions." },
  { question: "What should workers do to prepare for AI in the workplace?", answer: "Workers should build AI literacy and learn how to use tools safely, check outputs, spot errors, and connect AI to real business problems. Stronger careers will combine tool use with human judgement, context, and accountability." },
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
        <div id="intro-ai-job-replacement-answer" data-cf-component-id={"section:intro-ai-job-replacement-answer"} data-cf-component-type={"section"} data-cf-component-label={"AI will replace tasks before it replaces whole jobs"} data-cf-source-section-id={"intro-ai-job-replacement-answer"}>
        <p><strong>{TOPIC}</strong> — {"AI is more likely to replace tasks before it replaces whole jobs. The first work to change is repeatable, rules-based, and data-heavy work, such as clerical, administrative, and data entry tasks. Global estimates suggest many jobs could be affected by AI, but affected does not always mean removed."}</p>
        <p>{"In Australia, the stronger signal is augmentation. One Australian small business analysis cites Jobs and Skills Australia research saying generative AI has greater capacity to augment work than automate it. For founders, the useful question is not only what jobs will artificial intelligence replace. It is which workflows can be redesigned so people spend less time on routine work and more time on judgement, customers, and execution."}</p>
        <div data-cf-component-id={"image:intro-ai-job-replacement-answer"} data-cf-component-type={"image"} data-cf-component-label={"Hero image"} data-cf-source-section-id={"intro-ai-job-replacement-answer"}>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="What jobs will artificial intelligence replace in Australia, and which roles are more likely to be augmented than removed."
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
            {"AI is most likely to replace routine tasks inside clerical, administrative, data entry, basic support, scheduling, and repeatable information roles. Whole-job replacement is less certain than task automation."}
          </QuoteBlock>
        </div>
        <div id="roles-most-exposed-to-ai" data-cf-component-id={"section:roles-most-exposed-to-ai"} data-cf-component-type={"section"} data-cf-component-label={"The jobs most exposed to AI are routine and information-heavy"} data-cf-source-section-id={"roles-most-exposed-to-ai"}>
          <h2>{"The jobs most exposed to AI are routine and information-heavy"}</h2>
          <p>{"The jobs most exposed to AI tend to share a simple pattern: the work is routine, information-heavy, and easy to describe as a repeatable process."}</p>
          <p>{"That does not mean every job in these areas will disappear. A clearer way to think about it is task automation first, then role reduction if enough tasks are absorbed by software. Australian commentary points to clerical, administrative, and data entry roles as more exposed, while also noting that AI is more likely to augment many jobs than fully automate them. Basic customer support workflows, scheduling, simple content production, and first-pass research tasks fit the same risk pattern because they rely on high volumes of digital information and standard decisions."}</p>
          <p>{"For founders and startup teams, the practical question is not only what jobs will artificial intelligence replace. It is which tasks inside a role can be done faster, cheaper, or more consistently by AI. If a role is mostly made up of repeatable digital tasks, it is more likely to shrink or change. If the role also needs judgement, trust, context, care, negotiation, or responsibility for outcomes, AI is more likely to become a tool used by the worker rather than a full replacement."}</p>
          <div data-cf-component-id={"image:roles-most-exposed-to-ai"} data-cf-component-type={"image"} data-cf-component-label={"Image: The jobs most exposed to AI are routine and information-heavy"} data-cf-source-section-id={"roles-most-exposed-to-ai"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9cbd311f-8fad-44b0-8e1d-bd983223aa36.jpg?alt=media&token=429684d5-77d5-4e4c-8160-ee2f2674483c"
            alt="Hands sorting spreadsheets and notes at a cluttered desk, showing routine information-heavy work at risk from AI"
            caption="The jobs most exposed to AI are routine and information-heavy"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="jobs-less-likely-to-be-replaced" data-cf-component-id={"section:jobs-less-likely-to-be-replaced"} data-cf-component-type={"section"} data-cf-component-label={"The safer jobs combine judgement, trust, and physical context"} data-cf-source-section-id={"jobs-less-likely-to-be-replaced"}>
          <h2>{"The safer jobs combine judgement, trust, and physical context"}</h2>
          <p>{"The jobs least likely to be fully replaced by artificial intelligence tend to have more than one hard-to-automate feature. They involve human judgement, trust, accountability, care, or work in a changing physical setting. Australian small business research also points to augmentation as the larger pattern, with AI having more capacity to support work than fully automate it."}</p>
          <p>{"Healthcare, skilled trades, construction, teaching, creative roles, and relationship-heavy service work are often described as more defensible. A nurse, teacher, electrician, designer, or client-facing adviser may still use AI, but the core value is not just producing text or processing data."}</p>
          <p>{"That does not mean these roles will stay the same. AI can still help with documentation, planning, analysis, routine communication, and first drafts. The safer question is not \u201cCan AI touch this job?\u201d but \u201cWhich parts of this job need a trusted person in the loop?\u201d For founders and teams, that is where role design should focus."}</p>
          <div data-cf-component-id={"image:jobs-less-likely-to-be-replaced"} data-cf-component-type={"image"} data-cf-component-label={"Image: The safer jobs combine judgement, trust, and physical context"} data-cf-source-section-id={"jobs-less-likely-to-be-replaced"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a9314789-74d6-4727-8112-73192fea0a9e.jpg?alt=media&token=dbe502c2-2946-4983-a16a-09a98da72428"
            alt="Quiet workshop floor showing tools and workstations where human judgement and hands-on context matter"
            caption="The safer jobs combine judgement, trust, and physical context"
            width={1200}
            height={800}
          />
          </div>
        </div>

        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the checklist"}>
          <ArticleResourceCTA
            eyebrow="Free guide"
            title={"Get the what jobs will artificial intelligence replace checklist"}
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
            "The jobs most exposed to AI are routine and information-heavy",
            "The safer jobs combine judgement, trust, and physical context",
            "Australian startups should plan around exposure, not panic",
            "The practical response is to redesign roles around AI",
            "Use AI job risk as a design signal",
            ]}
            accent="indigo"
          />
        </div>
        <div id="australian-startup-workforce-planning" data-cf-component-id={"section:australian-startup-workforce-planning"} data-cf-component-type={"section"} data-cf-component-label={"Australian startups should plan around exposure, not panic"} data-cf-source-section-id={"australian-startup-workforce-planning"}>
          <h2>{"Australian startups should plan around exposure, not panic"}</h2>
          <p>{"For Australian startups, the useful question is not only what jobs will artificial intelligence replace. It is which parts of each role are exposed to automation, and which parts still need human judgement. Australian-focused research cited by Flowtivity says only 4% of Australian jobs are highly exposed to AI automation, while about 21% face medium-to-high exposure. That points to uneven change, not a simple wave of replacement."}</p>
          <p>{"Early-stage companies should use exposure as a planning signal. If a role is heavy in repeatable admin, clerical work, or data entry, founders can test AI support before hiring more capacity. If a role carries customer trust, safety, strategy, or final accountability, the better plan is usually to give people better tools rather than remove the human layer."}</p>
          <h3>{"Map tasks before you redesign roles"}</h3>
          <p>{"List the work people do most often, then separate routine information work from decisions that affect customers, money, compliance, or reputation. A founder can then decide where AI can draft, sort, summarise, or check work, and where a person must still approve the result."}</p>
          <p>{"Use four simple filters: task frequency, decision risk, customer impact, and the level of human accountability required. High-frequency, low-risk tasks are the best place to trial automation. High-impact decisions need clearer ownership, even when AI is used in the workflow. This approach helps startups build leaner teams while staying realistic about where AI can augment work rather than fully replace it."}</p>
        </div>
        <div id="how-workers-and-founders-prepare" data-cf-component-id={"section:how-workers-and-founders-prepare"} data-cf-component-type={"section"} data-cf-component-label={"The practical response is to redesign roles around AI"} data-cf-source-section-id={"how-workers-and-founders-prepare"}>
          <h2>{"The practical response is to redesign roles around AI"}</h2>
          <p>{"The useful question is not only what jobs will artificial intelligence replace. It is which tasks inside each role are ready for automation, which tasks can be improved with AI, and which tasks still need human judgement. Australian small businesses should start with a task audit. Routine clerical work, administration, and data entry may be more exposed, while many roles are more likely to be augmented than fully replaced."}</p>
          <p>{"For founders, this turns AI planning into role design. Keep people close to work that needs customer context, judgement, quality control, and ownership of the workflow. Move repetitive information work into tools where it is reliable enough, then train team members to check outputs, spot errors, and decide when a human should step in."}</p>
          <p>{"For workers, school leavers, and career changers, AI literacy is becoming a core operating skill. It means understanding what AI can do, where it fails, how to use it safely, and how to connect it to real business problems. The strongest careers will often combine tool use with human strengths that are harder to automate."}</p>
          <div data-cf-component-id={"image:how-workers-and-founders-prepare"} data-cf-component-type={"image"} data-cf-component-label={"Image: The practical response is to redesign roles around AI"} data-cf-source-section-id={"how-workers-and-founders-prepare"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-2941f28e-623f-46dc-b79b-740ebaf6b4d1.jpg?alt=media&token=a550ef44-945d-4dfa-bfec-ff1d9085627f"
            alt="Close-up of hands using an AI tool to reorganize work tasks on a laptop in a small business setting"
            caption="The practical response is to redesign roles around AI"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="conclusion-ai-job-risk-next-steps" data-cf-component-id={"section:conclusion-ai-job-risk-next-steps"} data-cf-component-type={"section"} data-cf-component-label={"Use AI job risk as a design signal"} data-cf-source-section-id={"conclusion-ai-job-risk-next-steps"}>
          <h2>{"Use AI job risk as a design signal"}</h2>
          <p>{"The clearest answer to what jobs will artificial intelligence replace is still task-specific. Work built around routine digital tasks, clerical processing, administration, data entry, and repeatable information handling is more exposed. Work that depends on trust, judgement, care, physical skill, relationships, or local context is harder to replace outright."}</p>
          <p>{"For Australian startup builders, the next move is not to wait for perfect certainty. Map the workflows in your team now. Look for places where AI can improve speed, quality, or cost without removing human accountability. It is better-designed roles where people own decisions, customer relationships, ethical judgement, and the work that needs human responsibility."}</p>
          <div data-cf-component-id={"image:conclusion-ai-job-risk-next-steps"} data-cf-component-type={"image"} data-cf-component-label={"Image: Use AI job risk as a design signal"} data-cf-source-section-id={"conclusion-ai-job-risk-next-steps"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-bec08bdc-4a2f-485e-a57d-80baa2da66cf.jpg?alt=media&token=40e90451-9e29-4a8d-8b14-0833874b2d0f"
            alt="Office team reviewing task lists on laptops during a candid workflow planning session"
            caption="Use AI job risk as a design signal"
            width={1200}
            height={800}
          />
          </div>
        </div>

        <div data-cf-component-id={"quote:keep-moving-forward"} data-cf-component-type={"quote"} data-cf-component-label={"Keep moving forward"}>
          <QuoteBlock title="Keep moving forward" variant="orange">
            {"The grounded article does not directly analyse Gen Z job struggles. It notes that school leavers and career changers increasingly need AI literacy alongside human strengths such as judgement and customer context."}
          </QuoteBlock>
        </div>

        <div data-cf-component-id={"template-resource-cta"} data-cf-component-type={"template-resource-cta"} data-cf-component-label={"Free MLAI Template Resource"}>
          <MLAITemplateResourceCTA />
        </div>

      <ArticleReferences
          references={[
            {id: 1, href: "https://uniathena.com/what-jobs-will-ai-replace", title: "What Jobs Will AI Replace & Which Careers Are Safe in 2026? - A Complete Guide | UniAthena", publisher: "uniathena.com", description: "Authoritative reference supporting What Jobs Will AI Replace & Which Careers Are Safe in 2026? - A Complete Guide | UniAthena.", category: "guide"},
            {id: 2, href: "https://gaper.io/15-jobs-will-ai-replace-by-2030/", title: "15 Jobs AI Will Replace by 2030 | Gaper.io", publisher: "gaper.io", description: "Authoritative reference supporting 15 Jobs AI Will Replace by 2030 | Gaper.io.", category: "guide"},
            {id: 3, href: "https://flowtivity.ai/blog/will-ai-replace-jobs-australia-small-business/", title: "Will AI Replace Jobs in Australia? 5 Roles That Are Safe (And 5 That Aren't) | Flowtivity", publisher: "flowtivity.ai", description: "Authoritative reference supporting Will AI Replace Jobs in Australia? 5 Roles That Are Safe (And 5 That Aren't) | Flowtivity.", category: "guide"},
            {id: 4, href: "https://agilityportal.io/blog/what-jobs-has-ai-already-replaced", title: "What Jobs Has AI Already Replaced \u2014 and Which Roles Are Next as It Takes Over the Workplace - Insight Blog", publisher: "agilityportal.io", description: "Authoritative reference supporting What Jobs Has AI Already Replaced \u2014 and Which Roles Are Next as It Takes Over the Workplace - Insight Blog.", category: "guide"},
            {id: 5, href: "https://tripleten.com/tools/what-jobs-will-ai-replace/", title: "What Jobs Will AI Replace? AI Job Risk Calculator", publisher: "tripleten.com", description: "Authoritative reference supporting What Jobs Will AI Replace? AI Job Risk Calculator.", category: "guide"},
            {id: 6, href: "https://www.coursera.org/articles/which-jobs-will-ai-replace", title: "Which Jobs Will AI Replace? | Coursera", publisher: "coursera.org", description: "Authoritative reference supporting Which Jobs Will AI Replace? | Coursera.", category: "guide"},
            {id: 7, href: "https://www.turingcollege.com/blog/what-jobs-will-ai-replace", title: "What Jobs Will AI Replace? A Guide to Staying Relevant at Work", publisher: "turingcollege.com", description: "Authoritative reference supporting What Jobs Will AI Replace? A Guide to Staying Relevant at Work.", category: "guide"},
            {id: 8, href: "https://www.sydneycareercoaching.com.au/what-jobs-will-ai-replace/", title: "What jobs will AI replace? How can employees prepare?", publisher: "sydneycareercoaching.com.au", description: "Authoritative reference supporting What jobs will AI replace? How can employees prepare?.", category: "guide"},
            {id: 9, href: "https://www.upwork.com/resources/jobs-ai-wont-replace", title: "120+ Jobs That AI Won\u2019t Replace - Upwork", publisher: "upwork.com", description: "Authoritative reference supporting 120+ Jobs That AI Won\u2019t Replace - Upwork.", category: "guide"},
            {id: 10, href: "https://www.techtarget.com/whatis/feature/Will-AI-replace-jobs-9-job-types-that-might-be-affected", title: "Is AI replacing jobs? How 17 job types feel the effects | TechTarget", publisher: "techtarget.com", description: "Authoritative reference supporting Is AI replacing jobs? How 17 job types feel the effects | TechTarget.", category: "guide"},
            {id: 11, href: "https://studynext.com/au/resources/business-jobs-ai-cant-replace", title: "Business Jobs That AI Can\u2019t Replace | StudyNext Australia", publisher: "studynext.com", description: "Authoritative reference supporting Business Jobs That AI Can\u2019t Replace | StudyNext Australia.", category: "guide"},
          ]}
          heading="Sources & further reading"
        />

        <ArticleDisclaimer />

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Build AI-ready roles, not panic-driven teams"
            body="Use the MLAI community to learn practical AI skills, compare real startup workflows, and find support as you redesign work around automation and human judgement."
            buttonText="Explore practical AI learning"
            buttonHref="/practical-ai-learning-and-getting-started"
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
