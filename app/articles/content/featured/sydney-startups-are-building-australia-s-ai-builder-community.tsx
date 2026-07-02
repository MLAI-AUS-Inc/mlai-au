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

export const useCustomHeader = true

const TOPIC = "Sydney Startups Are Building Australia\u2019s AI Builder Community"
export const CATEGORY = "featured"
export const SLUG = "sydney-startups-are-building-australia-s-ai-builder-community"
export const DATE_PUBLISHED = "2026-07-02"
export const DATE_MODIFIED = "2026-07-02"
export const DESCRIPTION = "Sydney startups are becoming more practical as AI builders use communities, university founder programs, residencies and directories to turn ideas into ventures."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-48b39127-eeae-4207-8bd9-cb9f85375641.jpg?alt=media&token=05692384-1320-49b8-b94e-9595b5111e70"
const HERO_IMAGE_ALT = "Sydney AI startup founders collaborating at a close-up community meetup with laptops and notes"
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
  { id: 1, question: "Why are Sydney startups becoming important for AI builders?", answer: "Sydney startups are becoming important for AI builders because the city combines practical startup infrastructure with AI-focused communities. Examples include the Sydney Startup Guide and AI Builder Club\u2019s Sydney CBD residency model." },
  { id: 2, question: "Where can AI builders find community in Sydney?", answer: "AI builders can find community through short residencies, startup directories and university-linked founder programs. AI Builder Club is described as a free six-week residency for Australian AI startups and project builders in the Sydney CBD." },
  { id: 3, question: "How do university founder programs support Sydney AI startups?", answer: "University founder programs support Sydney AI startups before formal scale-up by helping projects meet mentors, test ideas and become venture-shaped. UNSW Founders says it supports many startups and projects each year." },
  { id: 4, question: "What should Sydney AI founders validate before raising capital?", answer: "Sydney AI founders should validate the user, workflow, domain and data source before raising capital. A model demo is weaker than evidence that a real buyer context and workflow exist." },
]

export const summaryHighlights = {
  heading: "Key facts: Sydney Startups Are Building Australia\u2019s AI Builder Community",
  intro: "Sydney startups are becoming more practical as AI builders use communities, university founder programs, residencies and directories to turn ideas into ventures.",
  items: [
    { label: "How many startups are in Sydney?", description: "Sydney has enough startup activity to support refreshed ecosystem directories covering startups, funds, communities, workspaces and first meetings. The strongest signal is current activity, not a static count." },
    { label: "How many startups are there in Sydney?", description: "Sydney\u2019s startup ecosystem is broad and active, with university founder programs supporting many startups and projects each year. UNSW Founders examples include AI, robotics, health, sustainability and real-estate ideas." },
  ],
}

export const articleMeta = {
  title: "Sydney Startups Are Building Australia\u2019s AI Builder Community",
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
  { question: "How many startups are in Sydney?", answer: "Sydney has enough startup activity to support refreshed ecosystem directories covering startups, funds, communities, workspaces and first meetings. The strongest signal is current activity, not a static count." },
  { question: "How many startups are there in Sydney?", answer: "Sydney\u2019s startup ecosystem is broad and active, with university founder programs supporting many startups and projects each year. UNSW Founders examples include AI, robotics, health, sustainability and real-estate ideas." },
  { question: "Why are Sydney startups becoming important for AI builders?", answer: "Sydney startups are becoming important for AI builders because the city combines practical startup infrastructure with AI-focused communities. Examples include the Sydney Startup Guide and AI Builder Club\u2019s Sydney CBD residency model." },
  { question: "Where can AI builders find community in Sydney?", answer: "AI builders can find community through short residencies, startup directories and university-linked founder programs. AI Builder Club is described as a free six-week residency for Australian AI startups and project builders in the Sydney CBD." },
  { question: "How do university founder programs support Sydney AI startups?", answer: "University founder programs support Sydney AI startups before formal scale-up by helping projects meet mentors, test ideas and become venture-shaped. UNSW Founders says it supports many startups and projects each year." },
  { question: "What should Sydney AI founders validate before raising capital?", answer: "Sydney AI founders should validate the user, workflow, domain and data source before raising capital. A model demo is weaker than evidence that a real buyer context and workflow exist." },
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
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Sydney\u2019s AI startup moment is becoming more practical"} data-cf-source-section-id={"intro"}>
        <p><strong>{TOPIC}</strong>: {"Sydney startups are becoming stronger because the local scene is easier to navigate and more focused on building. Founders, operators, investors, communities and would-be joiners can now find clearer paths into the ecosystem. The Sydney Startup Guide frames the city around practical needs: who is funding, which startups to follow, where to work, which communities to join and how to start building a life in the scene."}</p>
        <p>{"This matters for AI because Australia\u2019s AI ecosystem is also growing across business, research and jobs. Sydney sits inside that national shift, but its edge is local and practical. Residency-style programs such as AI Builder Club show how engineers and enthusiasts can learn, build projects and form a community in the Sydney CBD. For builders, the question is no longer only whether Sydney has startup activity."}</p>
        </div>
        <div id="section-02" data-cf-component-id={"section:section-02"} data-cf-component-type={"section"} data-cf-component-label={"Why Sydney startups are organising around AI builders"} data-cf-source-section-id={"section-02"}>
          <h2>{"Why Sydney startups are organising around AI builders"}</h2>
          <p>{"Sydney startups are not forming around AI in a vacuum. The National AI Centre describes Australia\u2019s AI ecosystem as growing across businesses, research and jobs. That gives local founders a wider national setting: AI is becoming a shared capability, not only a niche technical topic. For Sydney builders, this makes community more important, because early teams need places to learn what is changing, compare notes, and turn technical interest into working projects."}</p>
          <p>{"MLAI is one of the practical community layers helping that happen. Through MLAI, Australian AI founders can connect with peers, mentors and operators while working close to Sydney\u2019s startup infrastructure rather than trying to build in isolation."}</p>
          <p>{"That support also includes access to free coworking space for Australian founders at Tech Central\u2019s Stone & Chalk, a useful base for early teams that need focus, meetings and proximity to other builders. For AI founders, a physical place to work can make the difference between a loose idea and a disciplined weekly build rhythm."}</p>
          <p>{"Sydney\u2019s broader startup infrastructure is also becoming easier to find. The Sydney Startup Guide points people toward funds, startups to follow, communities to join, workspaces, and practical first steps. This kind of directory does not make the ecosystem uniform, but it lowers the search cost for founders and operators who are trying to work out where to begin."}</p>
          <div data-cf-component-id={"image:section-02"} data-cf-component-type={"image"} data-cf-component-label={"Image: Why Sydney startups are organising around AI builders"} data-cf-source-section-id={"section-02"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-f977b131-a9ff-4aba-8521-16ef89797923.jpg?alt=media&token=2158704e-c695-4fc6-b387-72fde6f050d0"
            alt="Close-up of Sydney AI builders discussing startup ideas over a laptop at a crowded meetup"
            caption="Why Sydney startups are organising around AI builders"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="Read the scene carefully" variant="purple">
            {"Do not treat \u201cSydney startups\u201d as one uniform scene."}
          </QuoteBlock>
        </div>
        <div id="section-03" data-cf-component-id={"section:section-03"} data-cf-component-type={"section"} data-cf-component-label={"The builder pipeline starts before a company is formed"} data-cf-source-section-id={"section-03"}>
          <h2>{"The builder pipeline starts before a company is formed"}</h2>
          <p>{"Sydney startups do not begin only when a company is registered or a funding round is announced. In AI, the pipeline often starts earlier, inside university-linked programs and builder communities where people test ideas, meet mentors, and turn technical work into venture-shaped projects. UNSW Founders is one clear example. Its Founders Program says it supports many startups and projects each year to help ventures get off the ground."}</p>
          <p>{"The examples listed by UNSW Founders show why this early pipeline matters. The ideas include AI-powered supplier sustainability and ESG intelligence for due diligence and responsible procurement, robotic touch and dexterous gripping, AI voice assistants for real-estate communication, free virtual work simulations for learners, and health-related technologies such as EEG-based wearable tech for depression recovery. This is useful evidence of breadth, not a ranked list of the best Sydney startups. It shows that AI startup formation in Sydney reaches beyond generic software tools into procurement, robotics, real estate, education, and health-adjacent work."}</p>
          <div data-cf-component-id={"image:section-03"} data-cf-component-type={"image"} data-cf-component-label={"Image: The builder pipeline starts before a company is formed"} data-cf-source-section-id={"section-03"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-1ebfbdad-207e-48f1-81e1-1045aac6d539.jpg?alt=media&token=3c47d578-d082-4ea8-bfe8-1e7e51b238c9"
            alt="Sydney university founders demo AI robotics prototypes to mentors in a candid startup workshop setting"
            caption="The builder pipeline starts before a company is formed"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="Read the examples carefully" variant="purple">
            {"Use the UNSW Founders examples as evidence of sector breadth, not as a ranking of Sydney\u2019s top startups."}
          </QuoteBlock>
        </div>
        <div id="section-04" data-cf-component-id={"section:section-04"} data-cf-component-type={"section"} data-cf-component-label={"Where Sydney AI builders can find signal"} data-cf-source-section-id={"section-04"}>
          <h2>{"Where Sydney AI builders can find signal"}</h2>
          <p>{"There is no single front door for Sydney startups. A better approach is to build a short map of trusted signals: current directories, active builder communities, university founder programs, and practical places to meet people. The Sydney Startup Guide is useful for this because it is positioned as a weekly refreshed directory of funds, startups, communities, desks, and first coffees."}</p>
          <p>{"For AI builders, the strongest signal often comes from being close to other people who are also building. SmartCompany describes AI Builder Club as a free six-week residency for Australian AI startups, aimed at enthusiasts and engineers working on their own AI projects with expert mentorship."}</p>
          <p>{"UNSW Founders says its Founders Program supports many startups and projects each year to get ventures off the ground, and its startup list includes AI, robotics, health, sustainability, and practical skills ideas. For a founder or early operator, these programs can show what is being built near the research and student talent base, not just what is already raising capital."}</p>
          <div data-cf-component-id={"image:section-04"} data-cf-component-type={"image"} data-cf-component-label={"Image: Where Sydney AI builders can find signal"} data-cf-source-section-id={"section-04"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-8283feb9-881f-473c-9cfc-419b2721cd24.jpg?alt=media&token=dcf8fd46-eb43-4ea3-b7c2-5d3cca0698ea"
            alt="Sydney CBD coworking space with AI builders around laptops and whiteboards in a candid meetup scene"
            caption="Where Sydney AI builders can find signal"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="Verify before you rely on a listing" variant="purple">
            {"Directories and community pages change quickly."}
          </QuoteBlock>
          <h3>{"Communities and residencies"}</h3>
          <p>{"Start with communities and short residencies when you need feedback, pace, and peers. They are not a replacement for customers, but they can make the early building process less lonely and more disciplined."}</p>
          <h3>{"University founder programs"}</h3>
          <p>{"Look at university founder programs when you want to understand the flow of new ventures and technical ideas. They can be especially useful for AI builders who want to meet researchers, students, or founders working near deep technology."}</p>
          <h3>{"Funds, desks, and first coffees"}</h3>
          <p>{"Use practical startup infrastructure last-mile style. Check which funds are currently active, which startups are worth following, which communities still meet, and where you can work or take first meetings."}</p>
        </div>
        <div id="section-05" data-cf-component-id={"section:section-05"} data-cf-component-type={"section"} data-cf-component-label={"What founders should validate before they raise"} data-cf-source-section-id={"section-05"}>
          <h2>{"What founders should validate before they raise"}</h2>
          <p>{"Sydney startups should validate the shape of the problem before they turn fundraising into the main goal. The local ecosystem has capital, programs, communities, directories and founder support, but that does not replace evidence that a real workflow needs the product. The Sydney Startup Guide points founders toward funds, startups, communities and practical steps."}</p>
          <p>{"AI founders need even tighter validation. The UNSW Founders startup examples range from supplier sustainability intelligence to real-estate voice assistants, robotics, virtual work simulations and health-related technology. That spread shows why a generic AI pitch is weak. The National AI Centre also frames AI as an ecosystem across businesses, research and jobs, with strengths and gaps."}</p>
          <p>{"Sydney also gives founders places to test ideas before formal investor conversations. The AI Builder Club is described as a free short residency for Australian AI startups, with engineers and enthusiasts building projects with mentorship in a community setting. Directories and community maps can also help founders find people to speak with, startups to learn from and programs that match their stage."}</p>
          <ul>
            <li>{"Define the specific user, workflow and domain before pitching the AI capability."}</li>
            <li>{"Use Sydney communities, programs and directories to get feedback before raising."}</li>
          </ul>
          <QuoteBlock title="Validation check" variant="purple">
            {"A model demo is not enough. Founders need to test whether the workflow, data source and buyer context are real."}
          </QuoteBlock>
          <h3>{"Validate problem fit"}</h3>
          <p>{"Start with a narrow problem in a named domain. Ask whether the user already has a painful workflow, whether the AI system can fit into that workflow, and whether the data needed to make it useful is available. A founder building for real estate, procurement, robotics, education or health will face different evidence needs, even if each product uses AI."}</p>
          <h3>{"Validate builder and ecosystem fit"}</h3>
          <p>{"Programs such as AI Builder Club and ecosystem resources such as the Sydney Startup Guide can help founders find mentors, peers, communities and current market signals. This does not prove the business will work, but it can expose weak assumptions earlier."}</p>
        </div>
        <div id="section-06" data-cf-component-id={"section:section-06"} data-cf-component-type={"section"} data-cf-component-label={"Turn the community into a compounding advantage"} data-cf-source-section-id={"section-06"}>
          <h2>{"Turn the community into a compounding advantage"}</h2>
          <p>{"Sydney startups do not grow through attention alone. The stronger path is to pick a real AI problem, find the right builder and founder communities, and test ideas with people who may actually use them. The Sydney Startup Guide frames the ecosystem as a practical place to find startups, funds, communities, workspaces and first steps. Programs such as AI Builder Club add another layer by giving Australian AI builders a short residency model with mentorship and project work."}</p>
          <p>{"The same lesson applies to students, operators and ecosystem supporters. Builders can move from learning into applied projects through programs, startup directories and founder pathways. Supporters can strengthen the connective tissue that makes this possible: events, education, mentoring, startup programs and trusted information. MLAI\u2019s role sits naturally in that wider infrastructure, helping AI builders, learners and founders meet, learn and build with others rather than trying to work alone."}</p>
          <ul>
            <li>{"Founders: choose a concrete AI problem, join relevant communities, and test with real users before chasing attention."}</li>
            <li>{"Supporters: back events, education, mentoring and practical pathways that help the AI ecosystem compound."}</li>
          </ul>
          <div data-cf-component-id={"image:section-06"} data-cf-component-type={"image"} data-cf-component-label={"Image: Turn the community into a compounding advantage"} data-cf-source-section-id={"section-06"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-2574e9d0-7099-4817-8c6f-040931ebfff6.jpg?alt=media&token=cb0d9820-984c-4799-a2f6-262a1b73242e"
            alt="Sydney startup founders testing AI ideas in a candid community meetup scene"
            caption="Turn the community into a compounding advantage"
            width={1200}
            height={800}
          />
          </div>
        </div>

      <ArticleReferences
          references={[
            {id: 1, href: "https://sydney-startup.guide/", title: "Sydney Startup Guide", publisher: "sydney-startup.guide", description: "Authoritative reference supporting Sydney Startup Guide.", category: "guide"},
            {id: 2, href: "https://www.ai.gov.au/news-and-insights/reports/australias-artificial-intelligence-ecosystem-growth-and-opportunities", title: "Australia\u2019s artificial intelligence ecosystem: growth and opportunities | National AI Centre", publisher: "ai.gov.au", description: "Authoritative reference supporting Australia\u2019s artificial intelligence ecosystem: growth and opportunities | National AI Centre.", category: "guide"},
            {id: 3, href: "https://www.smartcompany.com.au/startupsmart/ai-builder-club-free-residency-program-australia/", title: "Meet AI Builder Club: The free short residency program for Australian AI startups - SmartCompany", publisher: "smartcompany.com.au", description: "Authoritative reference supporting Meet AI Builder Club: The free short residency program for Australian AI startups - SmartCompany.", category: "guide"},
            {id: 4, href: "https://builtinsydney.au/articles/startup-companies-sydney", title: "12 Top Startup Companies in Sydney | Built In Sydney", publisher: "builtinsydney.au", description: "Authoritative reference supporting 12 Top Startup Companies in Sydney | Built In Sydney.", category: "guide"},
            {id: 5, href: "https://www.bossintelligence.com.au/start-up-checklist/", title: "Startup Checklist \u2023 A Guide for Australian Entrepreneurs", publisher: "bossintelligence.com.au", description: "Authoritative reference supporting Startup Checklist \u2023 A Guide for Australian Entrepreneurs.", category: "guide"},
            {id: 6, href: "https://unswfounders.com/our-startups", title: "Our Startups - UNSW Founders", publisher: "unswfounders.com", description: "Authoritative reference supporting Our Startups - UNSW Founders.", category: "guide"},
            {id: 7, href: "https://www.basetemplates.com/startups/top-10-startups-in-sydney", title: "Top 10 Startups in Sydney", publisher: "basetemplates.com", description: "Authoritative reference supporting Top 10 Startups in Sydney.", category: "guide"},
            {id: 8, href: "https://atparramatta.com/business/startups", title: "Startups | AtParramatta", publisher: "atparramatta.com", description: "Authoritative reference supporting Startups | AtParramatta.", category: "guide"},
            {id: 9, href: "https://business.gov.au/guide/starting", title: "Guide to starting a business | business.gov.au", publisher: "business.gov.au", description: "Authoritative reference supporting Guide to starting a business | business.gov.au.", category: "guide"},
            {id: 10, href: "https://www.brisbanebusinesscoaching.com.au/the-top-5-mistakes-brisbane-startups-make-and-how-to-avoid-them/", title: "Brisbane Startups: 5 Fatal Mistakes to Avoid", publisher: "brisbanebusinesscoaching.com.au", description: "Authoritative reference supporting Brisbane Startups: 5 Fatal Mistakes to Avoid.", category: "guide"},
            {id: 11, href: "https://www.lafrenchtech.com.au/top-7-common-mistakes-to-avoid-when-starting-a-tech-company/", title: "Top 7 Common Mistakes to Avoid When Starting a Tech Company - La French Tech Australia", publisher: "lafrenchtech.com.au", description: "Authoritative reference supporting Top 7 Common Mistakes to Avoid When Starting a Tech Company - La French Tech Australia.", category: "guide"},
          ]}
          heading="Sources & further reading"
        />

        <ArticleDisclaimer />

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Build with Australia\u2019s AI community"
            body="Join MLAI to meet AI builders, learners and founders working on practical projects across Australia\u2019s growing AI ecosystem."
            buttonText="Explore the MLAI community"
            buttonHref="/"
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
