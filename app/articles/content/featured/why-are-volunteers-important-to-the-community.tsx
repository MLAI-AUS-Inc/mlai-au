import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '~/articles/authors'
import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import ArticleCompanyCTA from '../../../components/articles/ArticleCompanyCTA'
import AuthorBio from '../../../components/AuthorBio'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import QuoteBlock from '../../../components/articles/QuoteBlock'
import ArticleTocPlaceholder from '../../../components/articles/ArticleTocPlaceholder'
import AudienceGrid from '../../../components/articles/AudienceGrid'
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import MLAITemplateResourceCTA from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'

export const useCustomHeader = true

const TOPIC = "Why Are Volunteers Important to the Community?"
export const CATEGORY = "featured"
export const SLUG = "why-are-volunteers-important-to-the-community"
export const DATE_PUBLISHED = "2026-05-17"
export const DATE_MODIFIED = "2026-05-17"
export const DESCRIPTION = "Volunteers are important because they add unpaid time, care, skills, connection, and resilience where paid resources are limited."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-a7b77c14-bfb3-42b7-bf75-afccaeba36d1.jpg?alt=media&token=67097595-4f47-4ebf-b071-c5cd86494dcb"
const HERO_IMAGE_ALT = "Volunteers sorting community donations together in a close-up candid moment of local care and connection"
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

export const faqItems: FAQ[] = [
  { id: 1, question: "What counts as volunteering?", answer: "Volunteering means giving time to help others without being paid. It can be formal through a charity or community organisation, or informal through everyday support for family, friends, or neighbours." },
  { id: 2, question: "Can volunteering be online or occasional?", answer: "Yes. Volunteering can happen in person or online, regularly or only sometimes. A one-off task can still be useful when it meets a real need." },
  { id: 3, question: "What benefits do volunteers gain?", answer: "Volunteers can gain stronger social connection, confidence, self-esteem, purpose, and practical skills. These benefits can make volunteering more sustainable because people grow while contributing." },
  { id: 4, question: "What is the golden rule of volunteering?", answer: "Be useful and reliable. Choose a role that fits your time and energy, clarify expectations early, communicate clearly, and respect what the community actually needs." },
  { id: 5, question: "How can someone start volunteering well?", answer: "Start with one community you care about and ask what help is genuinely needed. Then offer a contribution that matches your skills, availability, and capacity to follow through." },
]

export const summaryHighlights = {
  heading: "Volunteers turn care into practical help",
  intro: "Volunteers are important because they give unpaid time, care, and skills where practical support is needed and paid resources are limited.",
  items: [
    { label: "More capacity", description: "They help organisations run services, events, mentoring, fundraising, governance, training, and peer support when paid staff or budgets are stretched." },
    { label: "Stronger connection", description: "They welcome people in, build trust, share knowledge, and help neighbours, learners, founders, and local groups support one another." },
    { label: "Greater resilience", description: "They make communities more responsive by adding reliable hands, diverse skills, empathy, and a willingness to learn where help is needed most." },
  ],
}

export const articleMeta = {
  title: "Why Are Volunteers Important to the Community?",
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
  { question: "Why are volunteers so important to the community?", answer: "Volunteers give unpaid time, care, and skills where paid resources are limited. They help organisations run services, support people, and build stronger social connection." },
  { question: "How do volunteers contribute to the community?", answer: "They contribute through formal roles with charities or informal help for neighbours, friends, and family. Their work can include mentoring, events, fundraising, governance, training, and peer support." },
  { question: "What are the 5 core values of a volunteer?", answer: "The article highlights service, respect, reliability, empathy, and willingness to learn. These values help volunteers stay useful, trusted, and responsive to real community needs." },
  { question: "What counts as volunteering?", answer: "Volunteering means giving time to help others without being paid. It can be formal through a charity or community organisation, or informal through everyday support for family, friends, or neighbours." },
  { question: "Can volunteering be online or occasional?", answer: "Yes. Volunteering can happen in person or online, regularly or only sometimes. A one-off task can still be useful when it meets a real need." },
  { question: "What benefits do volunteers gain?", answer: "Volunteers can gain stronger social connection, confidence, self-esteem, purpose, and practical skills. These benefits can make volunteering more sustainable because people grow while contributing." },
  { question: "What is the golden rule of volunteering?", answer: "Be useful and reliable. Choose a role that fits your time and energy, clarify expectations early, communicate clearly, and respect what the community actually needs." },
  { question: "How can someone start volunteering well?", answer: "Start with one community you care about and ask what help is genuinely needed. Then offer a contribution that matches your skills, availability, and capacity to follow through." },
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

const CONTENT_FACTORY_INSPECTOR_SCRIPT = "(function(){\nvar protocol=3;\nvar params=new URLSearchParams(window.location.search);\nif(!params.has('cfInspector'))return;\nfunction post(payload){try{window.parent.postMessage(Object.assign({source:'content-factory-inspector',protocolVersion:protocol},payload),'*');}catch(e){}}\nif(window.__cfArticleInspectorInstalled){post({type:'ready',mode:window.__cfArticleInspectorMode||'comment'});return;}\nwindow.__cfArticleInspectorInstalled=true;window.__cfArticleInspectorProtocolVersion=protocol;window.__cfArticleInspectorMode='comment';\nvar style=document.createElement('style');\nstyle.textContent='[data-cf-component-id]{cursor:crosshair}.cf-inspector-hover,.cf-inspector-selected{outline:2px solid #7c3aed!important;outline-offset:3px}.cf-inspector-selected{outline-color:#2563eb!important}#cf-inspector-label{position:fixed;z-index:2147483647;pointer-events:none;border-radius:6px;background:#111827;color:white;padding:4px 8px;font:600 12px/1.4 ui-sans-serif,system-ui,sans-serif;box-shadow:0 8px 24px rgba(15,23,42,.22)}';\ndocument.head.appendChild(style);\nvar label=document.createElement('div');\nlabel.id='cf-inspector-label';label.hidden=true;document.body.appendChild(label);\nvar active=null;var selected=null;var measureQueued=false;\nfunction mode(){return window.__cfArticleInspectorMode||'comment';}\nfunction rect(el){var r=el.getBoundingClientRect();return{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};}\nfunction viewport(){return{width:window.innerWidth,height:window.innerHeight,scrollX:window.scrollX,scrollY:window.scrollY,devicePixelRatio:window.devicePixelRatio||1};}\nfunction esc(value){return String(value||'').replace(/\"/g,'\\\\\"');}\nfunction cleanText(el){return String((el&&el.textContent)||'').replace(/\\s+/g,' ').trim();}\nfunction textHash(value){var text=String(value||'');var hash=0;for(var i=0;i<text.length;i++){hash=((hash<<5)-hash)+text.charCodeAt(i);hash|=0;}return String(hash);}\nfunction domPath(el){var parts=[];var node=el;while(node&&node.nodeType===1&&node!==document.body){var tag=(node.tagName||'').toLowerCase();var index=1;var sibling=node.previousElementSibling;while(sibling){if((sibling.tagName||'').toLowerCase()===tag)index++;sibling=sibling.previousElementSibling;}parts.unshift(tag+':nth-of-type('+index+')');node=node.parentElement;}return parts.length?'body > '+parts.join(' > '):'body';}\nfunction visibleEnough(el){if(!el||!el.getBoundingClientRect)return false;var r=el.getBoundingClientRect();return r.width>=24&&r.height>=16;}\nfunction fallbackLabel(el,kind,index){var text=cleanText(el);if(text)return text.slice(0,100);if(kind==='image')return el.getAttribute('alt')||'Image '+index;if(kind==='toc')return'Table of contents';if(kind==='references')return'Authoritative References';if(kind==='disclaimer')return'Disclaimer';if(kind==='events-cta')return'Upcoming events CTA';if(kind==='company-highlight-cta')return'Highlighted CTA';if(kind==='cta')return'Call to action '+index;return kind+' '+index;}\nfunction setBoundary(node,id,type,label){if(!node||node.nodeType!==1||!visibleEnough(node))return false;if(node.hasAttribute('data-cf-component-id'))return false;var nearest=node.closest&&node.closest('[data-cf-component-id]');if(nearest&&nearest!==node&&nearest.getAttribute('data-cf-component-id')!=='article')return false;node.setAttribute('data-cf-component-id',id);node.setAttribute('data-cf-component-type',type);node.setAttribute('data-cf-component-label',label);node.setAttribute('data-cf-dom-boundary','true');return true;}\nfunction queryAll(selector){try{return Array.prototype.slice.call(document.querySelectorAll(selector));}catch(e){return[];}}\nfunction markKnownBoundaries(){\nvar groups=[\n{id:'toc',type:'toc',label:'Table of contents',selectors:['[data-article-toc-placeholder]','[data-article-toc]','[data-component=\"table-of-contents\"]','[data-semantic*=\"table-of-contents\" i]','[data-semantic*=\"sidebar-toc\" i]','nav[aria-label*=\"Table of contents\" i]','nav[aria-label*=\"contents\" i]']},\n{id:'references',type:'references',label:'Authoritative References',selectors:['[data-component*=\"reference\" i]','section[aria-label*=\"reference\" i]','section[id*=\"reference\" i]','[class*=\"references\" i]','[class*=\"reference-list\" i]']},\n{id:'disclaimer',type:'disclaimer',label:'Disclaimer',selectors:['[role=\"note\"][aria-label*=\"Legal\" i]','[aria-label*=\"Disclaimer\" i]','[class*=\"disclaimer\" i]','[class*=\"legal-notice\" i]']},\n{id:'events-cta',type:'events-cta',label:'Upcoming events CTA',selectors:['.events-cta','[class*=\"events-cta\" i]','section[aria-label*=\"Upcoming events\" i]','section[aria-label*=\"webinar\" i]']},\n{id:'highlight-cta',type:'company-highlight-cta',label:'Highlighted CTA',selectors:['[class*=\"highlight\" i][class*=\"cta\" i]','[class*=\"community\" i][class*=\"events\" i]']},\n{id:'cta',type:'company-cta',label:'Company CTA',selectors:['section[aria-label*=\"call to action\" i]','[class*=\"company-cta\" i]','[class*=\"resource-cta\" i]','[class*=\"cta\" i]']}\n];\nfor(var g=0;g<groups.length;g++){var group=groups[g];for(var s=0;s<group.selectors.length;s++){var nodes=queryAll(group.selectors[s]);for(var i=0;i<nodes.length;i++){setBoundary(nodes[i],group.id,group.type,group.label);}}}\n}\nfunction genericKind(node){var tag=(node.tagName||'component').toLowerCase();var classes=String(node.className||'').toLowerCase();var semantic=String(node.getAttribute('data-semantic')||'').toLowerCase();var aria=String(node.getAttribute('aria-label')||'').toLowerCase();var text=cleanText(node).toLowerCase();if(semantic.indexOf('toc')>=0||aria.indexOf('contents')>=0)return'toc';if(classes.indexOf('reference')>=0||aria.indexOf('reference')>=0||text.indexOf('authoritative references')>=0)return'references';if(classes.indexOf('disclaimer')>=0||aria.indexOf('legal')>=0||text.indexOf('disclaimer')===0)return'disclaimer';if(classes.indexOf('events-cta')>=0||text.indexOf('upcoming events')>=0||text.indexOf('event calendar')>=0)return'events-cta';if(classes.indexOf('highlight')>=0&&classes.indexOf('cta')>=0)return'company-highlight-cta';if(tag==='img'||tag==='figure')return'image';if(tag==='a'||tag==='button'||node.getAttribute('role')==='button'||classes.indexOf('cta')>=0)return'cta';if(tag==='h1'||tag==='h2'||tag==='h3')return'heading';if(tag==='ul'||tag==='ol')return'list';if(tag==='table')return'table';if(tag==='blockquote')return'quote';return'section';}\nfunction genericId(kind,index){if(kind==='toc')return'toc';if(kind==='references')return'references';if(kind==='disclaimer')return'disclaimer';if(kind==='events-cta')return'events-cta';if(kind==='company-highlight-cta')return'highlight-cta';if(kind==='cta')return'cta';return'dom:'+kind+':'+index;}\nfunction ensureFallbackBoundaries(){\nvar root=document.querySelector('article')||document.querySelector('main')||document.body;if(!root)return;\nmarkKnownBoundaries();\nvar selectors=['main section','article section','section','h1','h2','h3','figure','img','table','blockquote','[role=\"button\"]','button','a[class*=\"cta\" i]','[class*=\"cta\" i]','[class*=\"callout\" i]','[class*=\"reference\" i]','[class*=\"disclaimer\" i]','[data-semantic*=\"toc\" i]','ul','ol'];\nvar nodes=[];for(var s=0;s<selectors.length;s++){var found=queryAll(selectors[s]);for(var i=0;i<found.length;i++){var el=found[i];if(!root.contains(el)&&el!==root)continue;if(!visibleEnough(el))continue;if(nodes.indexOf(el)===-1)nodes.push(el);}}\nif(!document.querySelector('[data-cf-component-id]')&&visibleEnough(root))nodes.unshift(root);\nfor(var n=0;n<nodes.length;n++){var node=nodes[n];if(node.hasAttribute('data-cf-component-id'))continue;var kind=genericKind(node);setBoundary(node,genericId(kind,n+1),kind,fallbackLabel(node,kind,n+1));}\n}\nfunction componentNodes(){ensureFallbackBoundaries();return document.querySelectorAll('[data-cf-component-id]');}\nfunction byId(id){var nodes=componentNodes();for(var i=0;i<nodes.length;i++){if(nodes[i].getAttribute('data-cf-component-id')===id)return nodes[i];}return null;}\nfunction componentData(el,type,event){var id=el.getAttribute('data-cf-component-id')||'';var r=rect(el);var text=cleanText(el);var payload={type:type,componentId:id,componentType:el.getAttribute('data-cf-component-type')||'',sourceSectionId:el.getAttribute('data-cf-source-section-id')||'',label:el.getAttribute('data-cf-component-label')||id,selector:'[data-cf-component-id=\"'+esc(id)+'\"]',domPath:domPath(el),textHash:textHash(text),textExcerpt:text.slice(0,500),rect:r,viewport:viewport(),pageUrl:window.location.href,previewMode:params.get('cfPreviewMode')||params.get('previewMode')||''};if(event){var width=r.width||1;var height=r.height||1;var x=Math.max(0,Math.min(1,(event.clientX-r.left)/width));var y=Math.max(0,Math.min(1,(event.clientY-r.top)/height));payload.click={x:event.clientX,y:event.clientY,pageX:event.pageX,pageY:event.pageY};payload.anchor={x:x,y:y,createdFrom:'live_preview_click'};}return payload;}\nfunction allComponents(){var nodes=componentNodes();var out=[];for(var i=0;i<nodes.length;i++){out.push(componentData(nodes[i],'component'));}return out;}\nfunction postMeasure(){post({type:'measure',components:allComponents()});}\nfunction queueMeasure(){if(measureQueued)return;measureQueued=true;window.requestAnimationFrame(function(){measureQueued=false;postMeasure();});}\nfunction setSelected(id){if(selected)selected.classList.remove('cf-inspector-selected');selected=id?byId(id):null;if(selected)selected.classList.add('cf-inspector-selected');}\nfunction show(el){var box=el.getBoundingClientRect();var name=el.getAttribute('data-cf-component-label')||el.getAttribute('data-cf-component-id')||'component';var kind=el.getAttribute('data-cf-component-type')||'component';label.textContent=name+' ('+kind+')';label.style.left=Math.max(8,Math.min(box.left,window.innerWidth-260))+'px';label.style.top=Math.max(8,box.top-32)+'px';label.hidden=false;}\nfunction suppress(event){event.preventDefault();event.stopPropagation();if(event.stopImmediatePropagation)event.stopImmediatePropagation();}\ndocument.addEventListener('mouseover',function(event){ensureFallbackBoundaries();var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;if(!target)return;if(active&&active!==target)active.classList.remove('cf-inspector-hover');active=target;target.classList.add('cf-inspector-hover');show(target);post(componentData(target,'hover'));},true);\ndocument.addEventListener('mouseout',function(event){if(!active)return;var next=event.relatedTarget;if(next&&active.contains(next))return;active.classList.remove('cf-inspector-hover');active=null;label.hidden=true;},true);\ndocument.addEventListener('click',function(event){ensureFallbackBoundaries();var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;var interactive=event.target&&event.target.closest?event.target.closest('a,button,input,select,textarea,label,summary,[role=\"button\"]'):null;if(target){suppress(event);setSelected(target.getAttribute('data-cf-component-id')||'');post(componentData(target,mode()==='comment'?'comment:create':'select',event));queueMeasure();return;}if(interactive){suppress(event);}},true);\ndocument.addEventListener('submit',function(event){suppress(event);},true);\ndocument.addEventListener('scroll',queueMeasure,true);window.addEventListener('resize',queueMeasure);\nwindow.addEventListener('message',function(event){var message=event.data;if(!message||typeof message!=='object'||message.source!=='founder-tools-inspector')return;if(message.type==='setMode'){window.__cfArticleInspectorMode=message.mode==='inspect'?'inspect':'comment';post({type:'ready',mode:mode()});}else if(message.type==='measureComponents'){postMeasure();}else if(message.type==='scrollToComponent'){var target=byId(message.componentId||'');if(target){target.scrollIntoView({block:'center',inline:'nearest'});setSelected(message.componentId||'');setTimeout(queueMeasure,80);}}else if(message.type==='setSelectedComponent'){setSelected(message.componentId||'');}});\npost({type:'ready',mode:mode()});\nsetTimeout(queueMeasure,0);\n})();"

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
        <div id="intro-volunteers-make-community-work" data-cf-component-id={"section:intro-volunteers-make-community-work"} data-cf-component-type={"section"} data-cf-component-label={"Volunteers Make Community Work Possible"} data-cf-source-section-id={"intro-volunteers-make-community-work"}>
        <p><strong>{TOPIC}</strong> — {"Volunteers are important to the community because they give time, care, and skills where help is needed but paid resources are often limited. Volunteering can mean formal work through a charity or community organisation, or informal help such as supporting friends, family, or neighbours. In both cases, it is unpaid activity that helps other people and strengthens the places where we live, learn, and work."}</p>
        <p>{"Volunteers also help turn shared interest into real connection. Community groups rely on people who show up, welcome others, organise activities, share knowledge, and keep small tasks moving. In an MLAI-style community, that can look like helping at meetups, supporting education sessions, mentoring peers, contributing to hackathons, or making space for learners, builders, founders, researchers, and industry supporters to work together."}</p>
        <div data-cf-component-id={"image:intro-volunteers-make-community-work"} data-cf-component-type={"image"} data-cf-component-label={"Hero image"} data-cf-source-section-id={"intro-volunteers-make-community-work"}>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Why are volunteers important to the community? See how they add capacity, care, skills, connection, and resilience to local groups and learning networks."
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

        <div className="mt-8" data-cf-component-id={"quote:key-insight"} data-cf-component-type={"quote"} data-cf-component-label={"Key insight"}>
          <QuoteBlock title="Key insight" variant="purple">
            {"Volunteers give unpaid time, care, and skills where paid resources are limited. They help organisations run services, support people, and build stronger social connection."}
          </QuoteBlock>
        </div>
        <div id="what-counts-as-volunteering" data-cf-component-id={"section:what-counts-as-volunteering"} data-cf-component-type={"section"} data-cf-component-label={"What Counts as Volunteering Today"} data-cf-source-section-id={"what-counts-as-volunteering"}>
          <h2>{"What Counts as Volunteering Today"}</h2>
          <p>{"Volunteering means giving your time to help others without being paid. It can be formal, such as helping through a charity or community organisation. It can also be informal, such as helping family, friends, or neighbours with practical tasks. This broad definition matters because many people contribute to community life without seeing themselves as volunteers."}</p>
          <p>{"Volunteering can happen in person or online. It can be regular, or it can happen only sometimes. That flexibility makes it easier for people with different schedules, skills, caring roles, health needs, and levels of experience to take part. A useful contribution does not have to be a long-term role."}</p>
          <p>{"In modern community work, volunteering can include event support, mentoring, governance, communications, technical help, training, fundraising, helplines, and peer support. A small charity may rely on volunteers who give their time and skills across several of these roles. In a community like MLAI, the same idea applies: a person who helps run an event, supports a learner, reviews a project, or shares practical knowledge is strengthening the community."}</p>
          <div data-cf-component-id={"image:what-counts-as-volunteering"} data-cf-component-type={"image"} data-cf-component-label={"Image: What Counts as Volunteering Today"} data-cf-source-section-id={"what-counts-as-volunteering"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b8d07a8c-79ae-427a-b4b9-5466b5baa5d3.jpg?alt=media&token=63bec090-3e89-4308-8440-24c7c9cee638"
            alt="Hands sorting volunteer sign-up notes beside coffee cups on a community centre table"
            caption="What Counts as Volunteering Today"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="why-communities-depend-on-volunteers" data-cf-component-id={"section:why-communities-depend-on-volunteers"} data-cf-component-type={"section"} data-cf-component-label={"Why Communities Depend on Volunteers"} data-cf-source-section-id={"why-communities-depend-on-volunteers"}>
          <h2>{"Why Communities Depend on Volunteers"}</h2>
          <p>{"Communities depend on volunteers because they turn goodwill into practical help. Volunteers connect people to causes, services, and each other. This is why they are often described as the glue that holds a community together. Even small tasks can matter when they support people, animals, or organisations that need help."}</p>
          <p>{"Many community organisations work with limited time, staff, and money. When people donate their time and skills, they help these organisations run activities, support services, share information, and keep important work moving."}</p>
          <p>{"This value is especially clear in specialist communities. A refugee support service may rely on volunteers to help with community fundraising or public awareness. A health charity may rely on volunteers who give time, skills, lived experience, and steady support to a small team. In learning networks like MLAI, volunteers can help others by mentoring, welcoming new members, sharing knowledge, and creating trusted peer support."}</p>
          <h3>{"What volunteers make possible"}</h3>
          <p>{"Volunteer effort does not have to be large to be useful. A few hours of help can strengthen an event, keep a helpline or information project supported, or help a community member find the right next step. Across different causes, the common thread is capacity: volunteers help communities do more than they could do with paid staff alone."}</p>
        </div>
        <div id="what-volunteers-gain" data-cf-component-id={"section:what-volunteers-gain"} data-cf-component-type={"section"} data-cf-component-label={"Volunteering Also Strengthens the Volunteer"} data-cf-source-section-id={"what-volunteers-gain"}>
          <h2>{"Volunteering Also Strengthens the Volunteer"}</h2>
          <p>{"Volunteering is not a one-way act of sacrifice. It helps the community, but it can also strengthen the person who gives their time. RACS notes that volunteering can support emotional and mental wellbeing, lift self-esteem, and give people a stronger sense of purpose. That matters because people are more likely to keep showing up when the work feels meaningful, useful, and connected to something larger than themselves."}</p>
          <p>{"It also helps people build relationships. Community service can connect volunteers with new friends, contacts, and social skills, while giving them a practical way to take part in community life. For students, founders, builders, researchers, and early-career professionals, this can mean practising communication, collaboration, organising, mentoring, and leadership in real settings. Those personal gains do not reduce the community benefit. They make it more sustainable, because volunteers grow while they contribute."}</p>
          <div data-cf-component-id={"image:what-volunteers-gain"} data-cf-component-type={"image"} data-cf-component-label={"Image: Volunteering Also Strengthens the Volunteer"} data-cf-source-section-id={"what-volunteers-gain"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-40148d23-2283-4e47-95cb-7904d69720dc.jpg?alt=media&token=a730274b-1128-4ac9-8636-3087ac5d8cf4"
            alt="Community garden workday with tools and seedlings, showing how volunteering supports wellbeing and connection"
            caption="Volunteering Also Strengthens the Volunteer"
            width={1200}
            height={800}
          />
          </div>
        </div>

        <div className="not-prose my-10 rounded-3xl border border-purple-200 bg-purple-50/80 p-6 shadow-sm sm:p-8" data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the checklist"}>
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-700">Volunteer checklist</p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">Before you offer your time, check these five things</h3>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700">Use this quick checklist to make sure your contribution is practical, respectful, and sustainable.</p>
          <ul className="mt-6 grid gap-3 text-sm font-medium text-slate-800 sm:grid-cols-2">
            {[
              'The community has named a real need.',
              'The role fits your time and energy.',
              'Expectations, training, and boundaries are clear.',
              'You know who to ask for help.',
              'You can follow through or hand over respectfully.',
            ].map((item) => (
              <li key={item} className="flex gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-purple-100">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <a href="#how-to-volunteer-well" className="mt-6 inline-flex items-center rounded-full bg-purple-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-800">Use the checklist</a>
        </div>

        <div data-cf-component-id={"step-list:practical-next-steps"} data-cf-component-type={"step-list"} data-cf-component-label={"Practical next steps"}>
          <ArticleStepList
            title="Practical next steps"
            steps={[
            "Start by asking what work is most needed.",
            "Clarify expectations before you begin.",
            ]}
            accent="indigo"
          />
        </div>
        <div id="how-to-volunteer-well" data-cf-component-id={"section:how-to-volunteer-well"} data-cf-component-type={"section"} data-cf-component-label={"How to Volunteer in a Way That Actually Helps"} data-cf-source-section-id={"how-to-volunteer-well"}>
          <h2>{"How to Volunteer in a Way That Actually Helps"}</h2>
          <p>{"Useful volunteering starts with the community need. Before choosing a role, ask what would genuinely help the organisation or people being served. Healthdirect describes volunteering as giving your time to serve others without being paid, and notes that it can happen through a charity or community organisation, in person or online, regularly or only sometimes. That flexibility matters because a small, well-matched task can still make a real difference."}</p>
          <p>{"Next, match the role to your real time, skills, and energy. A recurring role may suit someone who can commit each week, while a one-off task may be better for someone with limited availability."}</p>
          <ul>
            <li>{"Start by asking what work is most needed."}</li>
            <li>{"Clarify expectations before you begin."}</li>
          </ul>
          <div data-cf-component-id={"image:how-to-volunteer-well"} data-cf-component-type={"image"} data-cf-component-label={"Image: How to Volunteer in a Way That Actually Helps"} data-cf-source-section-id={"how-to-volunteer-well"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ca1ec8c3-6451-4f01-871c-d3566ae509b7.jpg?alt=media&token=b5f2a1aa-4c32-40f3-9864-541921311444"
            alt="Volunteer’s hands sorting donated groceries for a local community group in a candid close-up"
            caption="How to Volunteer in a Way That Actually Helps"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="common-questions-about-community-volunteering" data-cf-component-id={"section:common-questions-about-community-volunteering"} data-cf-component-type={"section"} data-cf-component-label={"Common Questions About Community Volunteering"} data-cf-source-section-id={"common-questions-about-community-volunteering"}>
          <h2>{"Common Questions About Community Volunteering"}</h2>
          <p>{"Why are volunteers important to the community? The simple answer is that they give time and skills where practical support is needed. Volunteering can happen through a charity or community organisation, or informally through help for friends, family, and neighbours. In both cases, volunteers add care, capacity, and connection without being paid. That makes it easier for organisations to support people, run local activities, and respond to community needs."}</p>
          <p>{"The benefits of volunteering for the community are also social. Volunteers help people connect with others, build new relationships, and strengthen a sense of belonging. Even small tasks can make a real difference to people, organisations, and causes that need help. This is why volunteers are often described as part of the glue that holds a community together."}</p>
          <p>{"The golden rule of volunteering is to be useful and reliable. A volunteer does not need to be perfect or have every skill from the start."}</p>
        </div>
        <div id="conclusion-start-with-one-useful-contribution" data-cf-component-id={"section:conclusion-start-with-one-useful-contribution"} data-cf-component-type={"section"} data-cf-component-label={"Start With One Useful Contribution"} data-cf-source-section-id={"conclusion-start-with-one-useful-contribution"}>
          <h2>{"Start With One Useful Contribution"}</h2>
          <p>{"Volunteers are important to the community because they turn care into practical help. A good place to begin is with one community you already care about and one real need you can understand. Volunteering can happen in person or online, regularly or only sometimes, and even small tasks can make a real difference for people and organisations that need support."}</p>
          <p>{"Choose a role that fits your skills, time, and energy, then treat it as a relationship. In an MLAI setting, that might mean mentoring a learner, helping run an event, sharing technical knowledge, supporting a hackathon, or welcoming newcomers."}</p>
          <div data-cf-component-id={"image:conclusion-start-with-one-useful-contribution"} data-cf-component-type={"image"} data-cf-component-label={"Image: Start With One Useful Contribution"} data-cf-source-section-id={"conclusion-start-with-one-useful-contribution"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-d1db0a61-4f47-40bc-a86f-11a55e949533.jpg?alt=media&token=22dbc33e-4686-4391-a078-337843f46bed"
            alt="Volunteers sorting donated supplies together at a community center in a candid wide scene"
            caption="Start With One Useful Contribution"
            width={1200}
            height={800}
          />
          </div>
        </div>

        <div data-cf-component-id={"quote:keep-moving-forward"} data-cf-component-type={"quote"} data-cf-component-label={"Keep moving forward"}>
          <QuoteBlock title="Keep moving forward" variant="orange">
            {"The article highlights service, respect, reliability, empathy, and willingness to learn. These values help volunteers stay useful, trusted, and responsive to real community needs."}
          </QuoteBlock>
        </div>

        <div data-cf-component-id={"template-resource-cta"} data-cf-component-type={"template-resource-cta"} data-cf-component-label={"Free MLAI Template Resource"}>
          <MLAITemplateResourceCTA />
        </div>

      <div data-cf-component-id={"references"} data-cf-component-type={"references"} data-cf-component-label={"Authoritative References"}>
        <ArticleReferences
          references={[
            {id: 1, href: "https://www.healthdirect.gov.au/benefits-of-volunteering", title: "Benefits of volunteering | healthdirect", publisher: "healthdirect.gov.au", description: "Authoritative reference supporting Benefits of volunteering | healthdirect.", category: "guide"},
            {id: 2, href: "https://www.wcsu.edu/community-engagement/benefits-of-volunteering/", title: "Benefits of Community Service – Community Engagement", publisher: "wcsu.edu", description: "Authoritative reference supporting Benefits of Community Service – Community Engagement.", category: "guide"},
            {id: 3, href: "https://www.communitydirectors.com.au/articles/the-importance-of-volunteering-skills-not-just-time", title: "Institute of Community Directors Australia | The importance of…", publisher: "communitydirectors.com.au", description: "Authoritative reference supporting Institute of Community Directors Australia | The importance of….", category: "guide"},
            {id: 4, href: "https://www.thrive-platform.com/10-reasons-why-volunteering-is-good-for-your-business/", title: "10 Reasons Why Volunteering is good for Business | Thrive", publisher: "thrive-platform.com", description: "Authoritative reference supporting 10 Reasons Why Volunteering is good for Business | Thrive.", category: "guide"},
            {id: 5, href: "https://www.volunteer.com.au/advice-and-tips/building-a-stronger-community-through-volunteering", title: "Building a stronger community through volunteering | SEEK Volunteer", publisher: "volunteer.com.au", description: "Authoritative reference supporting Building a stronger community through volunteering | SEEK Volunteer.", category: "guide"},
            {id: 6, href: "https://www.racs.org.au/news/5-reasons-why-you-should-volunteer", title: "5 Reasons Why You Should Volunteer — RACS | Refugee Advice & Casework Service", publisher: "racs.org.au", description: "Authoritative reference supporting 5 Reasons Why You Should Volunteer — RACS | Refugee Advice & Casework Service.", category: "guide"},
            {id: 7, href: "https://taprootfoundation.org/blog/how-skilled-volunteers-can-help-your-small-business/", title: "How Skilled Volunteers Can Help Your Small Business", publisher: "taprootfoundation.org", description: "Authoritative reference supporting How Skilled Volunteers Can Help Your Small Business.", category: "guide"},
            {id: 8, href: "https://www.chooselegend.com/learn/entry/the-importance-of-community-involvement-as-a-small-business/", title: "The Importance of Community Involvement as a Small Business | Legend Web Works", publisher: "chooselegend.com", description: "Authoritative reference supporting The Importance of Community Involvement as a Small Business | Legend Web Works.", category: "guide"},
            {id: 9, href: "https://ericreiersen.com/volunteering-a-catalyst-for-positive-change-in-local-communities/", title: "Volunteering: A Catalyst for Positive Change in Local Communities", publisher: "ericreiersen.com", description: "Authoritative reference supporting Volunteering: A Catalyst for Positive Change in Local Communities.", category: "guide"},
            {id: 10, href: "https://www.hrleader.com.au/people/24891-volunteer-work-helping-to-fuel-our-economy-businesses-should-get-on-board", title: "Volunteer work helps fuel our economy – why businesses should get on board - HR Leader", publisher: "hrleader.com.au", description: "Authoritative reference supporting Volunteer work helps fuel our economy – why businesses should get on board - HR Leader.", category: "guide"},
            {id: 11, href: "https://pernicious-anaemia-society.org/blog/the-importance-of-volunteering/", title: "The Importance of Volunteering | Pernicious Anaemia Society", publisher: "pernicious-anaemia-society.org", description: "Authoritative reference supporting The Importance of Volunteering | Pernicious Anaemia Society.", category: "guide"},
            {id: 12, href: "https://www.alphamoosewriting.com/post/volunteering-and-your-bottom-line-how-giving-back-benefits-small-businesses", title: "Volunteering and Your Bottom Line: Benefits for Small Businesses", publisher: "alphamoosewriting.com", description: "Authoritative reference supporting Volunteering and Your Bottom Line: Benefits for Small Businesses.", category: "guide"},
          ]}
          heading="Sources & further reading"
        />
      </div>

        <div data-cf-component-id={"disclaimer"} data-cf-component-type={"disclaimer"} data-cf-component-label={"Disclaimer"}>
          <ArticleDisclaimer />
        </div>

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Contribute to a practical AI community"
            body="If you want to help learners, builders, founders, and researchers connect, start with one useful contribution: mentor, support an event, share knowledge, or welcome newcomers."
            buttonText="Explore MLAI community opportunities"
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
