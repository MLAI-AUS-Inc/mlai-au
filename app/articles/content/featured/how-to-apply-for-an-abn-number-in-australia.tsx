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

const TOPIC = "How to Apply for an ABN Number in Australia"
export const CATEGORY = "featured"
export const SLUG = "how-to-apply-for-an-abn-number-in-australia"
export const DATE_PUBLISHED = "2026-07-20"
export const DATE_MODIFIED = "2026-07-20"
export const DESCRIPTION = "How to apply for an ABN number in Australia online."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-9729b7df-c540-4e5a-8416-50a5f071620b.jpg?alt=media&token=6830eeee-0c31-4725-ac85-6fbda515630d"
const HERO_IMAGE_ALT = "Australian freelancer reviewing an online ABN application on a laptop at home, hands sorting paperwork"
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
  { id: 1, question: "What is an ABN?", answer: "An ABN is an 11-digit identifier issued by the Australian Business Register, managed by the ATO, for a business or enterprise\u2019s tax and administrative dealings." },
  { id: 2, question: "Who is entitled to an ABN?", answer: "A person or organisation carrying on an enterprise may be entitled to an ABN. The official application asks questions to assess entitlement based on the activity and applicant." },
  { id: 3, question: "Should a sole trader and a company use the same ABN setup?", answer: "No. A sole trader applies as an individual, while an incorporated company is a separate applicant, so the registration should match the entity carrying on the activity." },
  { id: 4, question: "Can I apply for other registrations with an ABN?", answer: "Yes. The ABN application may also allow applications for a business name, secure online authentication, GST registration and PAYG withholding, where relevant." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Apply for an ABN Number in Australia",
  intro: "How to apply for an ABN number in Australia online.",
  items: [
    { label: "Can I apply for an ABN online?", description: "Yes. Apply through the official Australian Business Register pathway, where eligibility and business-detail questions are used to determine whether an applicant is entitled to an ABN." },
    { label: "How much does it cost to apply for an ABN number?", description: "The application process requires applicants to answer official entitlement and business-detail questions before submission. The appropriate connected registrations depend on the venture\u2019s actual circumstances." },
    { label: "What documents do I need to apply for an ABN?", description: "Have clear applicant, business-structure and business-activity details ready. Sole traders may provide a tax file number, which can help speed up the application." },
  ],
}

export const articleMeta = {
  title: "How to Apply for an ABN Number in Australia",
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
  { question: "Can I apply for an ABN online?", answer: "Yes. Apply through the official Australian Business Register pathway, where eligibility and business-detail questions are used to determine whether an applicant is entitled to an ABN." },
  { question: "How much does it cost to apply for an ABN number?", answer: "The application process requires applicants to answer official entitlement and business-detail questions before submission. The appropriate connected registrations depend on the venture\u2019s actual circumstances." },
  { question: "What documents do I need to apply for an ABN?", answer: "Have clear applicant, business-structure and business-activity details ready. Sole traders may provide a tax file number, which can help speed up the application." },
  { question: "What is an ABN?", answer: "An ABN is an 11-digit identifier issued by the Australian Business Register, managed by the ATO, for a business or enterprise\u2019s tax and administrative dealings." },
  { question: "Who is entitled to an ABN?", answer: "A person or organisation carrying on an enterprise may be entitled to an ABN. The official application asks questions to assess entitlement based on the activity and applicant." },
  { question: "Should a sole trader and a company use the same ABN setup?", answer: "No. A sole trader applies as an individual, while an incorporated company is a separate applicant, so the registration should match the entity carrying on the activity." },
  { question: "Can I apply for other registrations with an ABN?", answer: "Yes. The ABN application may also allow applications for a business name, secure online authentication, GST registration and PAYG withholding, where relevant." },
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
        <div id="what-an-abn-means-for-ai-founders" data-cf-component-id={"section:what-an-abn-means-for-ai-founders"} data-cf-component-type={"section"} data-cf-component-label={"What an ABN Means for an AI Founder"} data-cf-source-section-id={"what-an-abn-means-for-ai-founders"}>
        <p><strong>{TOPIC}</strong> — {"To apply for an ABN in Australia, use the Australian Business Register application and answer questions that check whether you are entitled to one. An Australian Business Number is an 11-digit identifier issued by the Australian Business Register, which is managed by the Australian Taxation Office. It identifies a business or enterprise for tax and administrative purposes."}</p>
        <p>{"For an AI founder, an ABN can be a practical early step once you are genuinely operating an enterprise, such as providing AI development or consulting services, selling a product, or contracting with clients. You can use it when invoicing customers and dealing with suppliers, government agencies and the ATO. It is not a default credential for every experiment or idea: the application asks about your activity and applicant details to determine entitlement."}</p>
        </div>
        <div id="check-entitlement-before-applying" data-cf-component-id={"section:check-entitlement-before-applying"} data-cf-component-type={"section"} data-cf-component-label={"Check Whether Your AI Activity Is Eligible Before You Apply"} data-cf-source-section-id={"check-entitlement-before-applying"}>
          <h2>{"Check Whether Your AI Activity Is Eligible Before You Apply"}</h2>
          <p>{"An ABN is for a person or organisation carrying on an enterprise, so it is not automatically available for every AI idea, hobby build or informal side project. The official ABN application asks questions to determine whether you are entitled to one."}</p>
          <p>{"These are different ways of operating, and the person or entity applying needs to match the business structure and activity you provide in the application."}</p>
          <div data-cf-component-id={"image:check-entitlement-before-applying"} data-cf-component-type={"image"} data-cf-component-label={"Image: Check Whether Your AI Activity Is Eligible Before You Apply"} data-cf-source-section-id={"check-entitlement-before-applying"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d2371c58-4651-4d14-b187-d2502ed8e30d.jpg?alt=media&token=408db875-7320-446a-8567-64d858c4c055"
            alt="Ultra-close candid of two Australians discussing whether their AI side project qualifies for an ABN"
            caption="Check Whether Your AI Activity Is Eligible Before You Apply"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="Eligibility reminder" variant="purple">
            {"An ABN is not automatic for every AI side project."}
          </QuoteBlock>
          <h3>{"Be clear about who is applying"}</h3>
          <p>{"First identify the applicant. If you are starting as an individual, you may be applying as a sole trader. If an incorporated company will run the venture, the company is a separate applicant. Business.gov.au provides guidance on business structures, including choosing a structure and changing one later."}</p>
          <p>{"Do not treat an ABN as the same thing as every other registration your project may need. The ATO says that, when applying for an ABN, you can also apply for a business name, secure online authentication and tax registrations such as GST and PAYG withholding. Consider these separately and select only what fits your current business activity."}</p>
        </div>
        <div id="confirm-structure-and-applicant" data-cf-component-id={"section:confirm-structure-and-applicant"} data-cf-component-type={"section"} data-cf-component-label={"Confirm Your Business Structure and Applicant"} data-cf-source-section-id={"confirm-structure-and-applicant"}>
          <h2>{"Confirm Your Business Structure and Applicant"}</h2>
          <p>{"Before applying for an ABN, be clear about the business structure and the entity that will apply. An ABN application asks questions to determine entitlement, and the registration should reflect the business that will carry on the activity. This matters when an early project is becoming a real venture with customer work, invoices or tax registrations."}</p>
          <p>{"A founder working independently as a sole trader should not assume they have the same set-up as a startup operating through a company. The Australian Government provides guidance on different business structures, choosing one and changing structure later. If ownership, responsibilities or the intended structure are still unsettled, resolve that decision before completing the ABN form. Use official starting-a-business guidance, and seek professional advice if your circumstances need it."}</p>
          <div data-cf-component-id={"image:confirm-structure-and-applicant"} data-cf-component-type={"image"} data-cf-component-label={"Image: Confirm Your Business Structure and Applicant"} data-cf-source-section-id={"confirm-structure-and-applicant"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-df0bed6e-9711-44a5-94cf-a24d7e7f5999.jpg?alt=media&token=e10f8c96-f214-4f79-b9f3-7c98cc90c207"
            alt="Founder\u2019s hand reviews business structure notes beside laptop, product sketches and customer proposal"
            caption="Confirm Your Business Structure and Applicant"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="Confirm the entity first" variant="purple">
            {"Do not use the ABN form to resolve an unsettled ownership or structure decision; confirm the applying entity first."}
          </QuoteBlock>
        </div>
        <div id="complete-the-online-application" data-cf-component-id={"section:complete-the-online-application"} data-cf-component-type={"section"} data-cf-component-label={"Complete the Online ABN Application"} data-cf-source-section-id={"complete-the-online-application"}>
          <h2>{"Complete the Online ABN Application"}</h2>
          <p>{"Apply through the official Australian Business Register pathway. The application asks questions to determine whether you are entitled to an ABN, so answer the eligibility and business-detail questions carefully. This is not just a form for creating an identifier; it is part of the registration process for an enterprise. If you are applying as a sole trader, providing your tax file number can help speed up the application."}</p>
          <p>{"As you complete the ABN application, you may also be able to apply for a business name, set up secure online authentication, and register for taxes such as GST and PAYG withholding. Treat these as separate decisions within the same process, not automatic add-ons. Choose only the registrations that fit how your venture operates and its current tax obligations. Before you submit, review each answer and selected registration so the details accurately reflect the business you are starting."}</p>
          <QuoteBlock title="Before submitting" variant="purple">
            {"Review every answer carefully. The application assesses ABN entitlement as well as collecting registration details."}
          </QuoteBlock>
        </div>
        <div id="after-your-abn-application" data-cf-component-id={"section:after-your-abn-application"} data-cf-component-type={"section"} data-cf-component-label={"What to Do After You Submit Your Application"} data-cf-source-section-id={"after-your-abn-application"}>
          <h2>{"What to Do After You Submit Your Application"}</h2>
          <p>{"After you submit an ABN application, follow the outcome shown through the official registration process and act on any instructions provided. An application can have different outcomes, so do not assume the number is available until the result confirms it. Keep a record of the entity details and business activity you used in the application."}</p>
          <p>{"Once an ABN is available, it can support everyday business administration. You may use it when preparing invoices, dealing with suppliers and completing relevant tax-related registrations. For an AI startup, that could mean using the correct business details when invoicing a client for development work or setting up a supplier account. An ABN is only one part of the setup. Separate obligations may apply to your business structure, tax position, contracts and any later changes to the venture. Review your details as the business develops, especially if its structure or activities change."}</p>
          <div data-cf-component-id={"image:after-your-abn-application"} data-cf-component-type={"image"} data-cf-component-label={"Image: What to Do After You Submit Your Application"} data-cf-source-section-id={"after-your-abn-application"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9e5b1d3b-62e1-4b88-af9f-b5dab0b2d901.jpg?alt=media&token=e7cb2b74-adae-40cf-973a-8cabf34c8bb4"
            alt="What to Do After You Submit Your Application"
            caption="What to Do After You Submit Your Application"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="Keep the setup separate" variant="purple">
            {"An ABN helps establish business administration, but it does not replace the separate obligations that may apply to your structure, tax position or contracts."}
          </QuoteBlock>
        </div>
        <div id="make-the-abn-a-deliberate-first-step" data-cf-component-id={"section:make-the-abn-a-deliberate-first-step"} data-cf-component-type={"section"} data-cf-component-label={"Make the ABN a Deliberate First Step"} data-cf-source-section-id={"make-the-abn-a-deliberate-first-step"}>
          <h2>{"Make the ABN a Deliberate First Step"}</h2>
          <p>{"An ABN can be an important early registration for a real business, but it is not a startup badge to collect. Start by checking whether you are entitled to an ABN. The ATO application asks questions to help determine entitlement, so answer them based on the business activity you are genuinely starting or carrying on."}</p>
          <p>{"Before you apply, be clear about who is applying and the business structure being used. Those choices shape the details you enter and the registrations you may need next. During the ABN application, consider whether you also need a business name, secure online authentication, GST registration or PAYG withholding. Use official ATO and business.gov.au guidance when your venture changes, rather than treating the first application as the end of the setup work."}</p>
          <ul>
            <li>{"Check ABN entitlement before starting the application."}</li>
            <li>{"Confirm the applicant and business structure before entering details."}</li>
            <li>{"Consider connected registrations that may be relevant to your business."}</li>
          </ul>
          <div data-cf-component-id={"image:make-the-abn-a-deliberate-first-step"} data-cf-component-type={"image"} data-cf-component-label={"Image: Make the ABN a Deliberate First Step"} data-cf-source-section-id={"make-the-abn-a-deliberate-first-step"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-44b8edf3-2610-4745-9315-8c984f7da6f2.jpg?alt=media&token=bcadcb2a-e31b-4d9e-a4e4-c7bd14706893"
            alt="Diverse Australian founders reviewing ABN eligibility notes during a practical coworking conversation"
            caption="Make the ABN a Deliberate First Step"
            width={1200}
            height={800}
          />
          </div>
        </div>

      <ArticleReferences
          references={[
            {id: 1, href: "https://legalvision.com.au/apply-australian-business-number-abn/", title: "How to Apply for an Australian Business Number (ABN) | LegalVision", publisher: "legalvision.com.au", description: "Authoritative reference supporting How to Apply for an Australian Business Number (ABN) | LegalVision.", category: "guide"},
            {id: 2, href: "https://business.gov.au/registrations/register-for-an-australian-business-number-abn", title: "Register for an Australian Business Number | business.gov.au", publisher: "business.gov.au", description: "Authoritative reference supporting Register for an Australian Business Number | business.gov.au.", category: "guide"},
            {id: 3, href: "https://stripe.com/au/resources/more/how-to-apply-to-an-abn-a-guide-for-businesses", title: "How to apply for an Australian Business Number (ABN) | Stripe", publisher: "stripe.com", description: "Authoritative reference supporting How to apply for an Australian Business Number (ABN) | Stripe.", category: "guide"},
            {id: 4, href: "https://sprintlaw.com.au/articles/your-complete-guide-to-applying-for-an-abn-in-australia/", title: "Applying for an ABN in Australia | Sprintlaw Australia", publisher: "sprintlaw.com.au", description: "Authoritative reference supporting Applying for an ABN in Australia | Sprintlaw Australia.", category: "guide"},
            {id: 5, href: "https://www.arrow.net.au/news/how-to-apply-for-an-abn/", title: "How to Apply for an ABN in Australia: A Practical Guide", publisher: "arrow.net.au", description: "Authoritative reference supporting How to Apply for an ABN in Australia: A Practical Guide.", category: "guide"},
            {id: 6, href: "https://www.companysetupaustralia.com/common-mistakes-when-applying-for-an-abn/", title: "ABN Application Common Mistakes | Company Set Up Australia", publisher: "companysetupaustralia.com", description: "Authoritative reference supporting ABN Application Common Mistakes | Company Set Up Australia.", category: "guide"},
            {id: 7, href: "https://gimbla.com/blog/getting-an-abn-number", title: "Getting an ABN Number: A Practical Guide for Small Businesses", publisher: "gimbla.com", description: "Authoritative reference supporting Getting an ABN Number: A Practical Guide for Small Businesses.", category: "guide"},
            {id: 8, href: "https://www.ato.gov.au/businesses-and-organisations/starting-registering-or-closing-a-business/starting-your-own-business/registration-obligations-for-businesses/work-out-which-registrations-you-need/business-or-company-registrations", title: "Business or company registrations | Australian Taxation Office", publisher: "ato.gov.au", description: "Authoritative reference supporting Business or company registrations | Australian Taxation Office.", category: "guide"},
            {id: 9, href: "https://business.gov.au/", title: "Support for businesses in Australia | business.gov.au", publisher: "business.gov.au", description: "Authoritative reference supporting Support for businesses in Australia | business.gov.au.", category: "guide"},
            {id: 10, href: "https://sprintlaw.com.au/articles/abn-australia-how-to-successfully-register-your-business/", title: "Registering for an ABN in Australia | Sprintlaw Australia", publisher: "sprintlaw.com.au", description: "Authoritative reference supporting Registering for an ABN in Australia | Sprintlaw Australia.", category: "guide"},
            {id: 11, href: "https://www.aondirect.com.au/sme-talk/small-business/abn-setup-small-business", title: "How to set up an ABN for your small business | Aon", publisher: "aondirect.com.au", description: "Authoritative reference supporting How to set up an ABN for your small business | Aon.", category: "guide"},
          ]}
          heading="Sources & further reading"
        />

        <ArticleDisclaimer />

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Build Your AI Venture on Clear Foundations"
            body="Connect with Australia\u2019s AI community as you move from an early project to an operating venture."
            buttonText="Explore the community"
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
