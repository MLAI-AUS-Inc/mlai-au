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

const TOPIC = "How Australian AI Founders Can Prepare for Angel Investors"
export const CATEGORY = "featured"
export const SLUG = "how-australian-ai-founders-can-prepare-for-angel-investors"
export const DATE_PUBLISHED = "2026-09-14"
export const DATE_MODIFIED = "2026-09-14"
export const DESCRIPTION = "Prepare for Australian angel investors with customer evidence, credible AI performance, a milestone-based funding ask and a targeted investor shortlist."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Fhero-87346dd5-d5fc-465b-9f3e-d4a34cf5e2fe.jpg?alt=media&token=69b3d9a2-4058-441e-86bc-dd83aa86edb1"
const HERO_IMAGE_ALT = "Australian AI founder showing investor metrics to an angel investor across a caf\u00e9 table"
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
]

export const summaryHighlights = {
  heading: "Key facts: How Australian AI Founders Can Prepare for Angel Investors",
  intro: "Prepare for Australian angel investors with customer evidence, credible AI performance, a milestone-based funding ask and a targeted investor shortlist.",
  items: [
    { label: "How to find angel investors in Australia?", description: "Start with the official websites of Sydney Angels, Melbourne Angels, Brisbane Angels and Perth Angels. Check each group\u2019s current investment focus, geographic eligibility and founder-facing enquiry route." },
    { label: "Are angel investors a good idea?", description: "Angel funding can suit businesses with a credible high-growth opportunity and a need for investor expertise alongside capital. Brisbane Angels emphasises high growth, market position and sustainable advantages, rather than AI alone." },
    { label: "What evidence should AI founders prepare for investors?", description: "Useful preparation includes clearly labelled customer evidence, AI performance comparisons against an existing workflow, and delivery costs. Include human-review effort and connect the funding amount to a specific business milestone." },
  ],
}

export const articleMeta = {
  title: "How Australian AI Founders Can Prepare for Angel Investors",
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
  { question: "How to find angel investors in Australia?", answer: "Start with the official websites of Sydney Angels, Melbourne Angels, Brisbane Angels and Perth Angels. Check each group\u2019s current investment focus, geographic eligibility and founder-facing enquiry route." },
  { question: "Are angel investors a good idea?", answer: "Angel funding can suit businesses with a credible high-growth opportunity and a need for investor expertise alongside capital. Brisbane Angels emphasises high growth, market position and sustainable advantages, rather than AI alone." },
  { question: "What evidence should AI founders prepare for investors?", answer: "Useful preparation includes clearly labelled customer evidence, AI performance comparisons against an existing workflow, and delivery costs. Include human-review effort and connect the funding amount to a specific business milestone." },
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
        <div id="intro" data-cf-component-id={"section:intro"} data-cf-component-type={"section"} data-cf-component-label={"Prepare evidence before asking for investment"} data-cf-source-section-id={"intro"}>
        <p><strong>{TOPIC}</strong> — {"Establish fit before outreach. Target investors and groups that back businesses at your stage and can understand your market. Brisbane Angels says it looks for companies with high-growth potential, a strong market position and sustainable advantages, so your case needs to show more than an AI demonstration."}</p>
        <p>{"Substantiate the claims behind the product. Be ready to explain the customer problem, what the product does, why customers will choose it, and the evidence you have so far. Sydney Angels uses a team-based process to screen and assess opportunities, which means a clear, consistent business case matters when several people are evaluating it."}</p>
        <p>{"Connect the amount you are raising to a specific business milestone, such as a product release, key hire or market entry. Prepare a concise deck, current ownership information and supporting material that can stand up to questions. This is practical preparation, not a universal requirement of every angel group; the exact process and documents vary by investor and deal structure."}</p>
        </div>
        <div id="angel-fit" data-cf-component-id={"section:angel-fit"} data-cf-component-type={"section"} data-cf-component-label={"Check whether angel funding fits your business"} data-cf-source-section-id={"angel-fit"}>
          <h2>{"Check whether angel funding fits your business"}</h2>
          <p>{"Angel funding is usually a better fit when you can describe a credible high-growth opportunity, not simply because your company uses AI. Brisbane Angels says it focuses on companies with potential for high growth, a strong market position and sustainable advantages. Perth Angels similarly describes investing in high-growth, founder-led businesses. These are examples of what particular groups emphasise, rather than universal funding rules."}</p>
          <p>{"Before preparing a raise, test whether you can explain the growth opportunity in plain terms: the problem, the market position you could build, and why the business may have an enduring advantage. Also consider whether the business is at a stage where an investor can evaluate that story. This is a practical self-assessment, not a pass-or-fail threshold for funding."}</p>
          <p>{"The right angel relationship may involve more than capital. Sydney Angels says members bring skills, knowledge and networks to portfolio companies, while Melbourne Angels says its members engage with founders' boards, teams and networks. Identify the expertise, introductions or operating perspective that would be genuinely useful to your business, then look for investors whose experience matches that need."}</p>
          <p>{"A focused approach is stronger than treating every investor as interchangeable. Be ready to connect your growth case with the specific contribution you are seeking, while recognising that each group and individual investor will make its own assessment."}</p>
          <div data-cf-component-id={"image:angel-fit"} data-cf-component-type={"image"} data-cf-component-label={"Image: Check whether angel funding fits your business"} data-cf-source-section-id={"angel-fit"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-741c74f8-1be7-45fe-9927-184efb66639e.jpg?alt=media&token=03f1628d-c1f1-4948-86cd-4f3eeb060efd"
            alt="Founder\u2019s hand testing growth assumptions in a notebook beside coffee and blurred market notes"
            caption="Check whether angel funding fits your business"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"quote:national-angel-connections"} data-cf-component-type={"quote"} data-cf-component-label={"Look beyond the city name"}>
          <QuoteBlock title="Look beyond the city name" variant="purple">
            {"\u201cOur investments are actively syndicated with other Angel groups across Australia.\u201d \u2014 Perth Angels [source-04]"}
          </QuoteBlock>
        </div>
        <div id="investor-shortlist" data-cf-component-id={"section:investor-shortlist"} data-cf-component-type={"section"} data-cf-component-label={"Build a shortlist of Australian angel groups"} data-cf-source-section-id={"investor-shortlist"}>
          <h2>{"Build a shortlist of Australian angel groups"}</h2>
          <p>{"Start with official angel-group websites rather than treating any list as a ranking or a complete directory. As you research, check the group\u2019s current investment focus, its founder contact route, and whether it is accepting opportunities. The material reviewed here does not establish a dedicated AI investment mandate or a currently open application window for any group."}</p>
          <p>{"Sydney Angels describes a team-based investment process for Australian startups with high-growth potential. Its site says companies are not charged to apply for investment, while noting this is common among angel groups. A founder can ask how the group\u2019s screening, pitch and syndicate assessment process would apply to their venture; do not assume the same fee policy applies everywhere."}</p>
          <p>{"Melbourne Angels says it invests $100,000 to $500,000 per round and may provide follow-on funding. Treat that as a statement about this group, not as a typical individual angel cheque, a recommended raise size, or a funding commitment. Confirm whether the group\u2019s current round approach and follow-on expectations fit your proposed funding plan."}</p>
          <p>{"Brisbane Angels says it looks for high-growth companies with a strong market position and sustainable advantages. It also describes investors assessing opportunities together with subject matter experts. For a sector-specific startup, ask whether relevant expertise is available in the network and how that expertise is involved in assessment."}</p>
          <p>{"Perth Angels describes investments in high-growth, founder-led businesses and says it syndicates investments with other angel groups across Australia. Although it is based in Perth, its national links mean founders should check geographic eligibility directly rather than assume the city name either rules them out or guarantees access."}</p>
        </div>
        <div id="ai-evidence" data-cf-component-id={"section:ai-evidence"} data-cf-component-type={"section"} data-cf-component-label={"Make your AI claims easy to verify"} data-cf-source-section-id={"ai-evidence"}>
          <h2>{"Make your AI claims easy to verify"}</h2>
          <p>{"Treat this as founder preparation, not a diligence checklist issued by angel groups. Investors assessing early-stage companies look for market demand, a credible path to growth and clear risks. For an AI startup, make the claims in your pitch traceable to customer evidence, testing and known constraints."}</p>
          <div data-cf-component-id={"image:ai-evidence"} data-cf-component-type={"image"} data-cf-component-label={"Image: Make your AI claims easy to verify"} data-cf-source-section-id={"ai-evidence"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-e645a58d-fff6-4f05-b039-94b30e53537c.jpg?alt=media&token=f8b7d055-4210-471f-9cb4-6cd6c647e7de"
            alt="Startup workspace whiteboard showing AI metrics, customer notes and growth assumptions for investor review"
            caption="Make your AI claims easy to verify"
            width={1200}
            height={800}
          />
          </div>
          <h3>{"Customer value and model performance"}</h3>
          <p>{"Start with the buyer and the workflow problem. State what evidence exists today, and label it accurately: customer conversations, unpaid pilots and paying customers are different signals. For each claimed improvement, compare AI-assisted work with the relevant existing workflow. Record the test conditions, limitations and any human review rather than relying on a polished demonstration alone."}</p>
          <p>{"For example, a document-review tool might claim to save time. A useful founder record would compare the current review process with AI-assisted review, including the time and effort needed for a person to check the output. This is a hypothetical example, not a required benchmark or a claim about results."}</p>
          <h3>{"Defensibility and delivery costs"}</h3>
          <p>{"Also explain what makes the product defensible and what it costs to deliver. Identify what the company controls, such as its product workflow or customer relationships, and what depends on external models, data or providers. Where relevant, document permissions for model and data use, material dependencies, model-serving costs and human-review costs. Mark unknowns and proposed tests plainly instead of presenting assumptions as proven performance."}</p>
        </div>
        <div id="funding-ask" data-cf-component-id={"section:funding-ask"} data-cf-component-type={"section"} data-cf-component-label={"Connect the funding ask to a milestone and supporting evidence"} data-cf-source-section-id={"funding-ask"}>
          <h2>{"Connect the funding ask to a milestone and supporting evidence"}</h2>
          <p>{"Start with one business milestone that the funding will help achieve. Cost the work, time and resources needed to reach it, then make the amount sought easy to follow. For an AI venture, this may include product development as well as model-serving, evaluation and human-review costs. Investors commonly want to understand how funds will be used and what milestones they are expected to unlock."}</p>
          <p>{"Make the investment case compact and connected. Explain the customer problem, the evidence that demand exists, your advantage, the team\u2019s ability to deliver, and how the funding moves the company toward the chosen milestone. Early-stage investors assess both the team and signals of market demand, so use specific evidence you can stand behind rather than broad claims."}</p>
          <p>{"Prepare a small supporting folder for follow-up questions. Useful categories include the evidence cited in the pitch, ownership and cap-table information, available financial records, and clearly labelled forecasts. This is preparation rather than a universal document list: the details an investor requests can vary with the deal and stage."}</p>
          <p>{"Treat equity and deal terms as separate decisions from the headline amount. The available sources do not establish a standard ownership percentage or a typical set of angel terms in Australia. Shares, convertible instruments and SAFE-style arrangements can affect founder ownership and future fundraising, so obtain qualified legal and financial advice before agreeing to a proposed investment."}</p>
          <div data-cf-component-id={"image:funding-ask"} data-cf-component-type={"image"} data-cf-component-label={"Image: Connect the funding ask to a milestone and supporting evidence"} data-cf-source-section-id={"funding-ask"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-7bdaa7f2-6cc4-4307-aecc-7189bd7abae0.jpg?alt=media&token=cce93817-7cc4-4166-a254-d304f56401fb"
            alt="Close-up of two startup founders reviewing funding milestones and evidence, hands pointing at notes"
            caption="Connect the funding ask to a milestone and supporting evidence"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="investor-conversation" data-cf-component-id={"section:investor-conversation"} data-cf-component-type={"section"} data-cf-component-label={"Make a targeted approach and prepare for follow-up"} data-cf-source-section-id={"investor-conversation"}>
          <h2>{"Make a targeted approach and prepare for follow-up"}</h2>
          <p>{"Start by checking each angel group's current founder-facing contact, enquiry or pitch guidance. Do not confuse this with an investor membership invitation: Melbourne Angels describes membership as invitation-only, while it separately invites ventures to pitch. If a group does not make its founder route clear, contact it and ask how it prefers to receive opportunities."}</p>
          <p>{"Make the first message short and specific. State the customer problem, the strongest evidence you can verify, the amount you are seeking, the milestone the funding is intended to support, and why that particular group is relevant. Keep the same facts in your deck, financial material and later answers. A clear use of funds and milestone plan helps an investor understand what the round is meant to unlock."}</p>
          <p>{"Prepare for a conversation with more than one reviewer, not only a single meeting. Sydney Angels describes a team-based process in which interested members form syndicates and collaborate on due diligence. Brisbane Angels likewise says its investors assess opportunities together, drawing on subject matter experts. Keep a record of questions, answer with evidence where possible, and clearly identify any point that is still unresolved rather than filling gaps with confident claims."}</p>
          <p>{"Use the discussion to assess fit in both directions. Ask how the group evaluates opportunities, whether relevant expertise may be involved, and what involvement investors may have after an investment. Angel groups can bring networks and operating experience as well as capital, but the nature of that support differs by group and should not be assumed. Before accepting funding, obtain appropriate legal and financial advice on the proposed terms and your fundraising obligations."}</p>
        </div>
        <div id="next-action" data-cf-component-id={"section:next-action"} data-cf-component-type={"section"} data-cf-component-label={"Resolve your biggest evidence gap before outreach"} data-cf-source-section-id={"next-action"}>
          <h2>{"Resolve your biggest evidence gap before outreach"}</h2>
          <p>{"Before contacting a targeted angel investor or group, write a short investment case. Link the customer problem to your strongest evidence, state the funding milestone, and explain why that investor is a relevant fit. Investors commonly assess market-demand signals, the team, use of funds and risks, so a clear case gives them a practical basis for the first conversation."}</p>
          <p>{"Then identify the claim with the weakest support. It may be a customer need, product assumption, market-demand signal or planned use of funds. Decide what specific evidence would make that claim more credible, and obtain it before outreach where possible. If the central customer or product claim is still untested, prioritise that test over further pitch polishing."}</p>
          <p>{"Preparation can improve the quality of an investor conversation, but it does not guarantee funding. Keep outreach targeted and factual, and seek appropriate legal or financial advice before structuring an Australian capital raise."}</p>
          <div data-cf-component-id={"image:next-action"} data-cf-component-type={"image"} data-cf-component-label={"Image: Resolve your biggest evidence gap before outreach"} data-cf-source-section-id={"next-action"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-e79fbf80-d557-448c-904d-c80e76ffbce8.jpg?alt=media&token=79c9467d-4ade-43e2-9868-19396a8d93d8"
            alt="Startup founders reviewing customer evidence and funding milestones before investor outreach"
            caption="Resolve your biggest evidence gap before outreach"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the resource"}>
          <ArticleResourceCTA
            eyebrow="Free worksheet"
            title={"Angel Investor Outreach Preparation Worksheet"}
            description="Use this fill-in worksheet to build a concise, evidence-backed investment case and prepare a targeted first approach to angel investors."
            buttonLabel="Download the PDF"
            buttonHref="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-resources%2Fhow-australian-ai-founders-can-prepare-for-angel-investors-worksheet-9fd2d7ae.pdf?alt=media&token=ff4a0b5c-01b7-41d7-938c-f72685e5a709"
            accent="purple"
            previewCards={[
              {
                title: "Evidence Gap Check",
                subtitle: 'PDF',
                color: "bg-[#ff3d00]",
                textColor: "text-white",
                rotationClass: "rotate-[-6deg]",
              },
              {
                title: "Milestone-Based Ask",
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
            {id: 1, href: "https://www.sydneyangels.net.au/", title: "Sydney Angels", publisher: "sydneyangels.net.au", category: "guide"},
            {id: 2, href: "https://melbourneangels.com/", title: "Melbourne Angels", publisher: "melbourneangels.com", category: "guide"},
            {id: 3, href: "https://www.brisbaneangels.com.au/", title: "Brisbane Angels", publisher: "brisbaneangels.com.au", category: "guide"},
            {id: 4, href: "https://www.perthangels.com/", title: "Perth Angels | Perth's Angel Investing Community", publisher: "perthangels.com", category: "guide"},
            {id: 5, href: "https://sprintlaw.com.au/articles/angel-investors-how-they-invest-and-what-startups-need-to-know/", title: "Angel Investors in Australia: How Deals Work | Sprintlaw Australia", publisher: "sprintlaw.com.au", category: "guide"},
            {id: 6, href: "https://mlai.au/", title: "MLAI | Empowering Australia's AI Community", publisher: "mlai.au", category: "guide"},
            {id: 7, href: "https://mlai.au/events", title: "AI & Machine Learning Events in Australia | MLAI", publisher: "mlai.au", category: "guide"},
          ]}
          heading="Sources & further reading"
        />

        <ArticleDisclaimer />

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Connect with Australia\u2019s AI community"
            body="MLAI is a not-for-profit, volunteer community supporting Australian founders. Explore its AI and machine learning events, including founder coworking sessions."
            buttonText="Explore MLAI events"
            buttonHref="/events"
          />
        </div>
      </div>

        <div data-cf-component-id={"author-bio"} data-cf-component-type={"author-bio"} data-cf-component-label={"About the Author"}>
          <AuthorBio author={authorDetails} />
        </div>

        <ArticleFooterNav backHref="/articles" topHref="#" />
    </>
  )
}
