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

const TOPIC = 'A Practical Guide for Australian Founders Building an AI Startup'
export const CATEGORY = 'featured'
export const SLUG = 'a-practical-guide-for-australian-founders-building-an-ai-startup'
export const DATE_PUBLISHED = '2026-07-12'
export const DATE_MODIFIED = '2026-07-12'
export const DESCRIPTION = 'Australian founders can build a focused first AI startup.'
const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-e79c88fc-4c95-41a5-97b4-82ddbd846b29.jpg?alt=media&token=9fb77a30-cac3-449e-b544-e72cba021bf9'
const HERO_IMAGE_ALT = 'A Practical Guide for Australian Founders Building an AI Startup'
export const FEATURED_FOCUS = 'startups'

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

const heroQuestionAnswers = [
  {
    question: 'What should Australian founders validate before building an AI startup?',
    answer: 'Validate a specific customer workflow, the pain it creates, and whether people will try a simpler or AI-assisted way of doing that work.',
  },
  {
    question: 'What is a sensible first AI MVP for an Australian startup?',
    answer: 'Start with one useful outcome in a focused workflow, such as preparing a draft for review, rather than trying to automate an entire process.',
  },
  {
    question: 'Where can Australian startup founders find early support?',
    answer: 'Founders can learn through local startup communities, established hubs in Sydney, growing digital communities in Perth, and online networks.',
  },
]

function AuthorBio({ author }: { author: AuthorDetails }) {
  const initials = author.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <section className='rounded-3xl border border-slate-200 bg-slate-50 px-6 py-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
        <div
          role='img'
          aria-label={author.name}
          className='flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 bg-cover bg-center text-lg font-semibold text-slate-700'
          style={author.avatarUrl ? { backgroundImage: `url(${author.avatarUrl})` } : undefined}
        >
          {author.avatarUrl ? null : initials}
        </div>
        <div>
          <p className='text-lg font-semibold text-slate-900'>{author.name}</p>
          <p className='text-sm font-medium uppercase tracking-[0.18em] text-slate-500'>{author.role}</p>
        </div>
      </div>
      {author.bio ? <p className='mt-4 text-base leading-7 text-slate-700'>{author.bio}</p> : null}
    </section>
  )
}

export const faqItems: FAQ[] = [
  { id: 1, question: 'How should a first-time founder validate an AI startup idea?', answer: 'Start with conversations about work that has already happened, then test a simple prototype or manual process to learn whether users will change how they work.' },
  { id: 2, question: 'What should an AI MVP do first?', answer: 'A first AI MVP should produce one useful result in a focused workflow, such as preparing a draft for review rather than running an entire business process.' },
  { id: 3, question: 'What should founders learn before choosing a model?', answer: 'Founders should establish the product’s data and context needs before choosing a model or architecture, including whether relevant data exists and can be accessed.' },
  { id: 4, question: 'Where can Australian founders build a support network?', answer: 'Australian startup communities include established technology hubs in Sydney, emerging digital communities in Perth, and online networks that can support repeated learning.' },
]

export const summaryHighlights = {
  heading: 'Key facts: A Practical Guide for Australian Founders Building an AI Startup',
  intro: 'Australian founders can build a focused first AI startup.',
  items: heroQuestionAnswers.map((item) => ({ label: item.question, description: item.answer })),
}

export const articleMeta = {
  title: 'A Practical Guide for Australian Founders Building an AI Startup',
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
  ...heroQuestionAnswers,
  { question: 'How should a first-time founder validate an AI startup idea?', answer: 'Start with conversations about work that has already happened, then test a simple prototype or manual process to learn whether users will change how they work.' },
  { question: 'What should an AI MVP do first?', answer: 'A first AI MVP should produce one useful result in a focused workflow, such as preparing a draft for review rather than running an entire business process.' },
  { question: 'What should founders learn before choosing a model?', answer: 'Founders should establish the product’s data and context needs before choosing a model or architecture, including whether relevant data exists and can be accessed.' },
  { question: 'Where can Australian founders build a support network?', answer: 'Australian startup communities include established technology hubs in Sydney, emerging digital communities in Perth, and online networks that can support repeated learning.' },
]

const faqStructuredData = faqSchemaItems.length
  ? JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqSchemaItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
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
    return () => script.remove()
  }, [])
  return null
}

export default function ArticleContent() {
  const authorDetails = { name: AUTHOR, role: AUTHOR_ROLE, bio: AUTHOR_BIO, avatarUrl: AUTHOR_AVATAR }

  return (
    <>
      {faqStructuredData ? <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: faqStructuredData }} /> : null}
      <ContentFactoryInspectorBridge />
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight={TOPIC}
        headerBgColor='cyan'
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <ArticleTocPlaceholder className='bg-transparent' />

      <div className='prose prose-lg prose-slate max-w-none bg-transparent'>
        <div id='start-with-a-narrow-problem' data-cf-component-id={'section:start-with-a-narrow-problem'} data-cf-component-type={'section'} data-cf-component-label={'Start With a Narrow Problem You Understand'} data-cf-source-section-id={'start-with-a-narrow-problem'}>
          <p><strong>{TOPIC}</strong>{' For Australian founders, a strong first AI startup idea often begins with a problem you know first-hand. Look for a repeated task where people lose time, struggle to find information, or make decisions inconsistently. A narrow workflow gives you a clearer starting point than a broad ambition to “build with AI.”'}</p>
          <p>{'Australian startup founders are often older and more experienced than counterparts in other surveyed regions, which can mean deeper industry knowledge and stronger professional networks. Use that knowledge to speak with people in the workflow, define one useful outcome, and test a focused idea before expanding it into a larger product.'}</p>
        </div>

        <div id='choose-the-right-problem' data-cf-component-id={'section:choose-the-right-problem'} data-cf-component-type={'section'} data-cf-component-label={'Choose a Problem Worth Building Around'} data-cf-source-section-id={'choose-the-right-problem'}>
          <h2>{'Choose a Problem Worth Building Around'}</h2>
          <p>{'Start with a specific person doing a repeatable piece of work. The cost may be time, missed follow-ups, inconsistent decisions, or a poor customer experience. A broad idea such as “AI for small business” is not yet a product problem. “Help a service team handle routine customer follow-ups” is clearer because it names a user and a task. Founders should also ask what people do now. Existing spreadsheets, inbox rules, manual checks, or outsourced work reveal whether the problem is real and where a new tool must fit.'}</p>
          <p>{'It could mean less admin, faster responses, more consistent handling of information, or better decisions from available data. This gives the team a way to test whether a small first version is useful. AI is appropriate when it can improve that workflow in a practical way, not simply because the technology is available. It also brings early questions about data, infrastructure costs, and user trust. A credible opportunity begins with a customer outcome; AI is the possible means of delivering it.'}</p>
          <div data-cf-component-id={'image:choose-the-right-problem'} data-cf-component-type={'image'} data-cf-component-label={'Image: Choose a Problem Worth Building Around'} data-cf-source-section-id={'choose-the-right-problem'}>
            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a6e57c58-e644-4393-9618-a09860371146.jpg?alt=media&token=5f98b284-f30f-4a2e-998a-3892f2d6bf21' alt='Two colleagues comparing missed follow-ups on a phone, absorbed in a candid close-up conversation' caption='Choose a Problem Worth Building Around' width={1200} height={800} />
          </div>
          <QuoteBlock title='Keep the problem first' variant='purple'>{'Do not frame the problem as a need for AI. Frame it as a customer outcome that AI may help deliver.'}</QuoteBlock>
        </div>

        <div id='validate-before-building' data-cf-component-id={'section:validate-before-building'} data-cf-component-type={'section'} data-cf-component-label={'Validate the Workflow Before You Build the Model'} data-cf-source-section-id={'validate-before-building'}>
          <h2>{'Validate the Workflow Before You Build the Model'}</h2>
          <p>{'Start with conversations about work that has already happened. This is more useful than asking whether they like an idea. It helps founders distinguish an active problem from a polite expression of interest, and it keeps the discussion tied to everyday business workflows.'}</p>
          <p>{'For an AI product, this also exposes practical questions early: whether relevant data exists, how it can be accessed, and where a user needs to stay involved in the decision.'}</p>
          <div data-cf-component-id={'image:validate-before-building'} data-cf-component-type={'image'} data-cf-component-label={'Image: Validate the Workflow Before You Build the Model'} data-cf-source-section-id={'validate-before-building'}>
            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-4ce2fde4-028e-42ad-be9a-e4124342e488.jpg?alt=media&token=da3888ef-4540-46c5-af71-7f1a9ff4111c' alt='Founder and customer review a workflow sketch and prototype screens over coffee at a shared table' caption='Validate the Workflow Before You Build the Model' width={1200} height={800} />
          </div>
          <QuoteBlock title='' variant='purple'>{'A polite compliment is not validation.'}</QuoteBlock>
          <h3>{'Test the value with a lightweight version'}</h3>
          <p>{'A simple prototype or a manual process can show whether users will try a different way of working before you commit to model selection, infrastructure, or a larger build.'}</p>
          <p>{'Note what would prompt a customer to run a trial, what they would expect to change in their workflow, and why they might decline. The aim is not to collect compliments; it is to learn whether the problem is real enough for people to change behaviour.'}</p>
        </div>

        <div data-cf-component-id={'step-list:validation-sprint-steps'} data-cf-component-type={'step-list'} data-cf-component-label={'Run a Three-Step Validation Sprint'}>
          <ArticleStepList title='Run a Three-Step Validation Sprint' steps={[
            'Interview prospective users about work that has already happened to identify an active problem.',
            'Map the workflow’s available data, access needs, and points where users must stay involved.',
            'Test a simple prototype or manual process to see whether users will change how they work.',
          ]} accent='indigo' />
        </div>

        <div id='design-the-smallest-credible-product' data-cf-component-id={'section:design-the-smallest-credible-product'} data-cf-component-type={'section'} data-cf-component-label={'Design the Smallest Credible AI Product'} data-cf-source-section-id={'design-the-smallest-credible-product'}>
          <h2>{'Design the Smallest Credible AI Product'}</h2>
          <p>{'For example, the product might prepare a draft for review rather than attempting to run an entire business process. A focused MVP makes it easier to see whether the AI is useful in an everyday workflow, while avoiding the common mistake of trying to automate everything at once.'}</p>
          <p>{'Choose the product’s data and context needs before committing to a model or architecture.'}</p>
        </div>

        <div data-cf-component-id={'resource-cta:validation-resource'} data-cf-component-type={'resource-cta'} data-cf-component-label={'Get the resource'}>
          <ArticleResourceCTA eyebrow='Free worksheet' title={'AI Startup Idea Validation Worksheet'} description='Use this fill-in worksheet to turn an AI startup idea into a focused customer workflow, validation plan, and small prototype test.' buttonLabel='Download the PDF' buttonHref='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fresources%2Fa-practical-guide-for-australian-founders-building-an-ai-startup-worksheet-836c6dfd.pdf?alt=media&token=edf10e0f-c3b2-495b-8e44-8db314e8c430' accent='purple' previewCards={[
            { title: 'Workflow Definition', subtitle: 'PDF', color: 'bg-[#ff3d00]', textColor: 'text-white', rotationClass: 'rotate-[-6deg]' },
            { title: '30-Day Evidence Plan', subtitle: 'PDF', color: 'bg-[#00ffd7]', textColor: 'text-black', rotationClass: 'rotate-[7deg]' },
          ]} />
        </div>

        <div id='build-a-support-circle' data-cf-component-id={'section:build-a-support-circle'} data-cf-component-type={'section'} data-cf-component-label={'Build a Support Circle Around the Test'} data-cf-source-section-id={'build-a-support-circle'}>
          <h2>{'Build a Support Circle Around the Test'}</h2>
          <p>{'Australia’s startup communities span established tech hubs in Sydney and emerging digital communities in Perth, alongside online networks.'}</p>
          <p>{'Prior industry experience can strengthen this circle when it gives you credible access to a real customer problem.'}</p>
          <div data-cf-component-id={'image:build-a-support-circle'} data-cf-component-type={'image'} data-cf-component-label={'Image: Build a Support Circle Around the Test'} data-cf-source-section-id={'build-a-support-circle'}>
            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b3eb431e-24f6-48a0-8549-58121ac7b34d.jpg?alt=media&token=108fd3e6-9a9b-4dfb-8be3-ca9c9b87523d' alt='Australian startup meetup in a shared workspace, founders gathered around a product experiment board' caption='Build a Support Circle Around the Test' width={1200} height={800} />
          </div>
        </div>

        <div data-cf-component-id={'audience-grid:support-circle-by-founder-type'} data-cf-component-type={'audience-grid'} data-cf-component-label={'Build the Support Circle You Need'}>
          <AudienceGrid heading='Build the Support Circle You Need' cards={[
            { title: 'Domain operator becoming a founder', description: 'Use prior industry experience to reach people with direct knowledge of a real customer problem.', variant: 'purple' },
            { title: 'Technical builder', description: 'Use customer conversations to establish the workflow’s data, context, and user-involvement needs before choosing a model.', variant: 'purple' },
            { title: 'First-time generalist founder', description: 'Use startup communities in Sydney, Perth, and online networks to create repeated opportunities to learn from customer tests.', variant: 'purple' },
          ]} />
        </div>

        <div id='make-the-next-month-count' data-cf-component-id={'section:make-the-next-month-count'} data-cf-component-type={'section'} data-cf-component-label={'Make the Next 30 Days About Evidence'} data-cf-source-section-id={'make-the-next-month-count'}>
          <h2>{'Make the Next 30 Days About Evidence'}</h2>
          <p>{'For the next 30 days, focus on one customer workflow rather than a broad AI product idea. Write down the assumption that matters most: perhaps that a customer has a repeated task, that the task is painful enough to change, or that an AI-assisted result would be useful. Start with conversations before committing to a larger build. Australian business guidance consistently stresses choosing one problem first instead of trying to automate everything at once.'}</p>
          <p>{'Turn what you learn into a narrow prototype that produces one useful result. It does not need to solve every part of the workflow.'}</p>
          <ul>
            <li>{'Choose one customer workflow and name the assumption you need to test.'}</li>
            <li>{'Book customer conversations before expanding the feature set.'}</li>
            <li>{'Test a small prototype, then decide whether to refine, narrow, or stop.'}</li>
          </ul>
          <div data-cf-component-id={'image:make-the-next-month-count'} data-cf-component-type={'image'} data-cf-component-label={'Image: Make the Next 30 Days About Evidence'} data-cf-source-section-id={'make-the-next-month-count'}>
            <ArticleImageBlock src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b37c76e1-7b68-4497-92b3-7b7794447dc2.jpg?alt=media&token=79fe77f5-1c75-42c8-a417-c0e13f3dfc9c' alt='Small startup team reviewing customer workflow notes and AI assumptions on a whiteboard in a casual office' caption='Make the Next 30 Days About Evidence' width={1200} height={800} />
          </div>
        </div>

        <ArticleReferences
          references={[
            { id: 1, href: 'https://www.angelinvestmentnetwork.net/over-three-quarters-of-australian-startup-founders-are-over-45-challenging-silicon-valleys-youth-obsessed-narrative/', title: 'Australian Startup Founders Defy Global Trends - Angel Investment Network Blog', publisher: 'angelinvestmentnetwork.net', description: 'Authoritative reference supporting Australian Startup Founders Defy Global Trends - Angel Investment Network Blog.', category: 'guide' },
            { id: 2, href: 'https://www.codegeeks.solutions/blog/from-idea-to-impact-what-makes-ai-startups-succeed', title: 'How to Start an AI Startup: Practical Guide for Founders | CodeGeeks Solutions', publisher: 'codegeeks.solutions', description: 'Authoritative reference supporting How to Start an AI Startup: Practical Guide for Founders | CodeGeeks Solutions.', category: 'guide' },
            { id: 3, href: 'https://corvana.com.au/blog/ai-for-australian-businesses-a-practical-starting-guide', title: 'AI for Australian Businesses: A Practical Starting Guide', publisher: 'corvana.com.au', description: 'Authoritative reference supporting AI for Australian Businesses: A Practical Starting Guide.', category: 'guide' },
            { id: 4, href: 'https://www.australiansmallbusiness.com.au/how-to-set-up-your-first-ai-agent-a-practical-guide-for-small-business-owners/', title: 'How to Set Up Your First AI Agent: A Practical Guide for Small Business Owners | Online Business Admin Courses & AI Assistants for Small Business', publisher: 'australiansmallbusiness.com.au', description: 'Authoritative reference supporting How to Set Up Your First AI Agent: A Practical Guide for Small Business Owners | Online Business Admin Courses & AI Assistants for Small Business.', category: 'guide' },
            { id: 5, href: 'https://www.businessthink.unsw.edu.au/articles/business-ai-efficiency-innovation-automation', title: 'A practical guide to getting started with Business AI - UNSW BusinessThink', publisher: 'businessthink.unsw.edu.au', description: 'Authoritative reference supporting A practical guide to getting started with Business AI - UNSW BusinessThink.', category: 'guide' },
            { id: 6, href: 'https://officeproconsulting.com.au/ai-for-business/', title: 'AI for Business: A Practical Guide for Australian SMEs', publisher: 'officeproconsulting.com.au', description: 'Authoritative reference supporting AI for Business: A Practical Guide for Australian SMEs.', category: 'guide' },
            { id: 7, href: 'https://appoly.com.au/resources/practical-guide-to-ai-agents-for-australian-businesses/', title: 'A practical guide to AI agents for Australian businesses | Appoly Australia', publisher: 'appoly.com.au', description: 'Authoritative reference supporting A practical guide to AI agents for Australian businesses | Appoly Australia.', category: 'guide' },
            { id: 8, href: 'https://business.gov.au/', title: 'Support for businesses in Australia | business.gov.au', publisher: 'business.gov.au', description: 'Authoritative reference supporting Support for businesses in Australia | business.gov.au.', category: 'guide' },
            { id: 9, href: 'https://au.linkedin.com/company/aussiefoundersclub', title: 'Aussie Founders Club | LinkedIn', publisher: 'au.linkedin.com', description: 'Authoritative reference supporting Aussie Founders Club | LinkedIn.', category: 'guide' },
          ]}
          heading='Sources & further reading'
        />

        <ArticleDisclaimer />

        <div className='my-12 not-prose' data-cf-component-id={'cta'} data-cf-component-type={'company-cta'} data-cf-component-label={'Company CTA'}>
          <ArticleCompanyCTA title='Put One Assumption to the Test' body='Choose one customer workflow, speak with people who do that work, and use a narrow prototype to test whether an AI-assisted result is useful.' buttonText='Start Your Validation Test' buttonHref='#make-the-next-month-count' />
        </div>
      </div>

      <div data-cf-component-id={'author-bio'} data-cf-component-type={'author-bio'} data-cf-component-label={'About the Author'}>
        <AuthorBio author={authorDetails} />
      </div>

      <div className='mt-12' data-cf-component-id={'faq'} data-cf-component-type={'faq'} data-cf-component-label={'FAQ'}>
        <ArticleFAQ items={faqItems} />
      </div>

      <ArticleFooterNav backHref='/articles' topHref='#' />
    </>
  )
}
