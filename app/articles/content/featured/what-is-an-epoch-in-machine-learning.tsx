import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { AcademicCapIcon, RocketLaunchIcon, UsersIcon } from '@heroicons/react/24/outline'
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
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'

export const useCustomHeader = true

const TOPIC = "What Is an Epoch in Machine Learning?"
export const CATEGORY = "featured"
export const SLUG = "what-is-an-epoch-in-machine-learning"
export const DATE_PUBLISHED = "2026-05-10"
export const DATE_MODIFIED = "2026-05-10"
export const DESCRIPTION = "What is an epoch in machine learning? Learn how epochs, batches and iterations affect model training, overfitting and compute cost."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-be4d5a0e-2788-4411-8bcb-da86c9bbb31b.jpg?alt=media&token=1c1b0470-0840-4bac-b522-123c2abf83fb"
const HERO_IMAGE_ALT = "Data scientists reviewing machine learning epochs and training batches on a laptop close up"
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
  { id: 1, question: "What is an epoch in machine learning?", answer: "An epoch is one complete pass through the full training dataset. During that pass, the model processes training examples, calculates errors and updates its internal parameters." },
  { id: 2, question: "How is an epoch different from a batch?", answer: "An epoch covers the whole training dataset. A batch is a smaller subset of examples processed before a model update, so many batches can fit inside one epoch." },
  { id: 3, question: "How is an iteration different from an epoch?", answer: "An iteration usually means one batch has been processed and used for one parameter update. An epoch is complete only after the model has worked through the full training dataset." },
  { id: 4, question: "What does 3 epochs mean?", answer: "Three epochs means the model has passed through the full training dataset three times. Each pass may contain many batch updates, depending on the batch size." },
  { id: 5, question: "Why do models train for more than one epoch?", answer: "A single pass often is not enough for the model to learn useful patterns. Repeated epochs let the model refine weights and biases, although more epochs are not always better." },
  { id: 6, question: "How should you choose the right number of epochs?", answer: "Start with a reasonable setting, then compare training and validation behaviour. Keep the epoch count only if it improves validation results enough to justify the extra time and compute." },
]

export const summaryHighlights = {
  heading: "Key facts: What Is an Epoch in Machine Learning?",
  intro: "What is an epoch in machine learning? Learn how epochs, batches and iterations affect model training, overfitting and compute cost.",
  items: [
    { label: "Is 20 epochs too much?", description: "Not necessarily. Whether 20 epochs is too much depends on validation performance, dataset size, model complexity, training setup and compute budget." },
    { label: "What does 50 epochs mean?", description: "Fifty epochs means the model has completed fifty full passes through the training dataset. It does not mean fifty examples or fifty batch updates." },
    { label: "Is 100 epochs too much?", description: "It can be, but there is no universal cutoff. If validation performance stalls or worsens while training performance improves, the model may be overfitting." },
  ],
}

export const articleMeta = {
  title: "What Is an Epoch in Machine Learning?",
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
  { question: "Is 20 epochs too much?", answer: "Not necessarily. Whether 20 epochs is too much depends on validation performance, dataset size, model complexity, training setup and compute budget." },
  { question: "What does 50 epochs mean?", answer: "Fifty epochs means the model has completed fifty full passes through the training dataset. It does not mean fifty examples or fifty batch updates." },
  { question: "Is 100 epochs too much?", answer: "It can be, but there is no universal cutoff. If validation performance stalls or worsens while training performance improves, the model may be overfitting." },
  { question: "What is an epoch in machine learning?", answer: "An epoch is one complete pass through the full training dataset. During that pass, the model processes training examples, calculates errors and updates its internal parameters." },
  { question: "How is an epoch different from a batch?", answer: "An epoch covers the whole training dataset. A batch is a smaller subset of examples processed before a model update, so many batches can fit inside one epoch." },
  { question: "How is an iteration different from an epoch?", answer: "An iteration usually means one batch has been processed and used for one parameter update. An epoch is complete only after the model has worked through the full training dataset." },
  { question: "What does 3 epochs mean?", answer: "Three epochs means the model has passed through the full training dataset three times. Each pass may contain many batch updates, depending on the batch size." },
  { question: "Why do models train for more than one epoch?", answer: "A single pass often is not enough for the model to learn useful patterns. Repeated epochs let the model refine weights and biases, although more epochs are not always better." },
  { question: "How should you choose the right number of epochs?", answer: "Start with a reasonable setting, then compare training and validation behaviour. Keep the epoch count only if it improves validation results enough to justify the extra time and compute." },
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

const CONTENT_FACTORY_INSPECTOR_SCRIPT = "(function(){
var protocol=3;
var params=new URLSearchParams(window.location.search);
if(!params.has('cfInspector'))return;
function post(payload){try{window.parent.postMessage(Object.assign({source:'content-factory-inspector',protocolVersion:protocol},payload),'*');}catch(e){}}
if(window.__cfArticleInspectorInstalled){post({type:'ready',mode:window.__cfArticleInspectorMode||'comment'});return;}
window.__cfArticleInspectorInstalled=true;window.__cfArticleInspectorProtocolVersion=protocol;window.__cfArticleInspectorMode='comment';
var style=document.createElement('style');
style.textContent='[data-cf-component-id]{cursor:crosshair}.cf-inspector-hover,.cf-inspector-selected{outline:2px solid #7c3aed!important;outline-offset:3px}.cf-inspector-selected{outline-color:#2563eb!important}#cf-inspector-label{position:fixed;z-index:2147483647;pointer-events:none;border-radius:6px;background:#111827;color:white;padding:4px 8px;font:600 12px/1.4 ui-sans-serif,system-ui,sans-serif;box-shadow:0 8px 24px rgba(15,23,42,.22)}';
document.head.appendChild(style);
var label=document.createElement('div');
label.id='cf-inspector-label';label.hidden=true;document.body.appendChild(label);
var active=null;var selected=null;var measureQueued=false;
function mode(){return window.__cfArticleInspectorMode||'comment';}
function rect(el){var r=el.getBoundingClientRect();return{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};}
function viewport(){return{width:window.innerWidth,height:window.innerHeight,scrollX:window.scrollX,scrollY:window.scrollY,devicePixelRatio:window.devicePixelRatio||1};}
function esc(value){return String(value||'').replace(/\"/g,'\\\"');}
function cleanText(el){return String((el&&el.textContent)||'').replace(/\s+/g,' ').trim();}
function textHash(value){var text=String(value||'');var hash=0;for(var i=0;i<text.length;i++){hash=((hash<<5)-hash)+text.charCodeAt(i);hash|=0;}return String(hash);}
function domPath(el){var parts=[];var node=el;while(node&&node.nodeType===1&&node!==document.body){var tag=(node.tagName||'').toLowerCase();var index=1;var sibling=node.previousElementSibling;while(sibling){if((sibling.tagName||'').toLowerCase()===tag)index++;sibling=sibling.previousElementSibling;}parts.unshift(tag+':nth-of-type('+index+')');node=node.parentElement;}return parts.length?'body > '+parts.join(' > '):'body';}
function visibleEnough(el){if(!el||!el.getBoundingClientRect)return false;var r=el.getBoundingClientRect();return r.width>=24&&r.height>=16;}
function fallbackLabel(el,kind,index){var text=cleanText(el);if(text)return text.slice(0,100);if(kind==='image')return el.getAttribute('alt')||'Image '+index;if(kind==='toc')return'Table of contents';if(kind==='references')return'Authoritative References';if(kind==='disclaimer')return'Disclaimer';if(kind==='events-cta')return'Upcoming events CTA';if(kind==='company-highlight-cta')return'Highlighted CTA';if(kind==='cta')return'Call to action '+index;return kind+' '+index;}
function setBoundary(node,id,type,label){if(!node||node.nodeType!==1||!visibleEnough(node))return false;if(node.hasAttribute('data-cf-component-id'))return false;var nearest=node.closest&&node.closest('[data-cf-component-id]');if(nearest&&nearest!==node&&nearest.getAttribute('data-cf-component-id')!=='article')return false;node.setAttribute('data-cf-component-id',id);node.setAttribute('data-cf-component-type',type);node.setAttribute('data-cf-component-label',label);node.setAttribute('data-cf-dom-boundary','true');return true;}
function queryAll(selector){try{return Array.prototype.slice.call(document.querySelectorAll(selector));}catch(e){return[];}}
function markKnownBoundaries(){
var groups=[
{id:'toc',type:'toc',label:'Table of contents',selectors:['[data-article-toc-placeholder]','[data-article-toc]','[data-component=\"table-of-contents\"]','[data-semantic*=\"table-of-contents\" i]','[data-semantic*=\"sidebar-toc\" i]','nav[aria-label*=\"Table of contents\" i]','nav[aria-label*=\"contents\" i]']},
{id:'references',type:'references',label:'Authoritative References',selectors:['[data-component*=\"reference\" i]','section[aria-label*=\"reference\" i]','section[id*=\"reference\" i]','[class*=\"references\" i]','[class*=\"reference-list\" i]']},
{id:'disclaimer',type:'disclaimer',label:'Disclaimer',selectors:['[role=\"note\"][aria-label*=\"Legal\" i]','[aria-label*=\"Disclaimer\" i]','[class*=\"disclaimer\" i]','[class*=\"legal-notice\" i]']},
{id:'events-cta',type:'events-cta',label:'Upcoming events CTA',selectors:['.events-cta','[class*=\"events-cta\" i]','section[aria-label*=\"Upcoming events\" i]','section[aria-label*=\"webinar\" i]']},
{id:'highlight-cta',type:'company-highlight-cta',label:'Highlighted CTA',selectors:['[class*=\"highlight\" i][class*=\"cta\" i]','[class*=\"community\" i][class*=\"events\" i]']},
{id:'cta',type:'company-cta',label:'Company CTA',selectors:['section[aria-label*=\"call to action\" i]','[class*=\"company-cta\" i]','[class*=\"resource-cta\" i]','[class*=\"cta\" i]']}
];
for(var g=0;g<groups.length;g++){var group=groups[g];for(var s=0;s<group.selectors.length;s++){var nodes=queryAll(group.selectors[s]);for(var i=0;i<nodes.length;i++){setBoundary(nodes[i],group.id,group.type,group.label);}}}
}
function genericKind(node){var tag=(node.tagName||'component').toLowerCase();var classes=String(node.className||'').toLowerCase();var semantic=String(node.getAttribute('data-semantic')||'').toLowerCase();var aria=String(node.getAttribute('aria-label')||'').toLowerCase();var text=cleanText(node).toLowerCase();if(semantic.indexOf('toc')>=0||aria.indexOf('contents')>=0)return'toc';if(classes.indexOf('reference')>=0||aria.indexOf('reference')>=0||text.indexOf('authoritative references')>=0)return'references';if(classes.indexOf('disclaimer')>=0||aria.indexOf('legal')>=0||text.indexOf('disclaimer')===0)return'disclaimer';if(classes.indexOf('events-cta')>=0||text.indexOf('upcoming events')>=0||text.indexOf('event calendar')>=0)return'events-cta';if(classes.indexOf('highlight')>=0&&classes.indexOf('cta')>=0)return'company-highlight-cta';if(tag==='img'||tag==='figure')return'image';if(tag==='a'||tag==='button'||node.getAttribute('role')==='button'||classes.indexOf('cta')>=0)return'cta';if(tag==='h1'||tag==='h2'||tag==='h3')return'heading';if(tag==='ul'||tag==='ol')return'list';if(tag==='table')return'table';if(tag==='blockquote')return'quote';return'section';}
function genericId(kind,index){if(kind==='toc')return'toc';if(kind==='references')return'references';if(kind==='disclaimer')return'disclaimer';if(kind==='events-cta')return'events-cta';if(kind==='company-highlight-cta')return'highlight-cta';if(kind==='cta')return'cta';return'dom:'+kind+':'+index;}
function ensureFallbackBoundaries(){
var root=document.querySelector('article')||document.querySelector('main')||document.body;if(!root)return;
markKnownBoundaries();
var selectors=['main section','article section','section','h1','h2','h3','figure','img','table','blockquote','[role=\"button\"]','button','a[class*=\"cta\" i]','[class*=\"cta\" i]','[class*=\"callout\" i]','[class*=\"reference\" i]','[class*=\"disclaimer\" i]','[data-semantic*=\"toc\" i]','ul','ol'];
var nodes=[];for(var s=0;s<selectors.length;s++){var found=queryAll(selectors[s]);for(var i=0;i<found.length;i++){var el=found[i];if(!root.contains(el)&&el!==root)continue;if(!visibleEnough(el))continue;if(nodes.indexOf(el)===-1)nodes.push(el);}}
if(!document.querySelector('[data-cf-component-id]')&&visibleEnough(root))nodes.unshift(root);
for(var n=0;n<nodes.length;n++){var node=nodes[n];if(node.hasAttribute('data-cf-component-id'))continue;var kind=genericKind(node);setBoundary(node,genericId(kind,n+1),kind,fallbackLabel(node,kind,n+1));}
}
function componentNodes(){ensureFallbackBoundaries();return document.querySelectorAll('[data-cf-component-id]');}
function byId(id){var nodes=componentNodes();for(var i=0;i<nodes.length;i++){if(nodes[i].getAttribute('data-cf-component-id')===id)return nodes[i];}return null;}
function componentData(el,type,event){var id=el.getAttribute('data-cf-component-id')||'';var r=rect(el);var text=cleanText(el);var payload={type:type,componentId:id,componentType:el.getAttribute('data-cf-component-type')||'',sourceSectionId:el.getAttribute('data-cf-source-section-id')||'',label:el.getAttribute('data-cf-component-label')||id,selector:'[data-cf-component-id=\"'+esc(id)+'\"]',domPath:domPath(el),textHash:textHash(text),textExcerpt:text.slice(0,500),rect:r,viewport:viewport(),pageUrl:window.location.href,previewMode:params.get('cfPreviewMode')||params.get('previewMode')||''};if(event){var width=r.width||1;var height=r.height||1;var x=Math.max(0,Math.min(1,(event.clientX-r.left)/width));var y=Math.max(0,Math.min(1,(event.clientY-r.top)/height));payload.click={x:event.clientX,y:event.clientY,pageX:event.pageX,pageY:event.pageY};payload.anchor={x:x,y:y,createdFrom:'live_preview_click'};}return payload;}
function allComponents(){var nodes=componentNodes();var out=[];for(var i=0;i<nodes.length;i++){out.push(componentData(nodes[i],'component'));}return out;}
function postMeasure(){post({type:'measure',components:allComponents()});}
function queueMeasure(){if(measureQueued)return;measureQueued=true;window.requestAnimationFrame(function(){measureQueued=false;postMeasure();});}
function setSelected(id){if(selected)selected.classList.remove('cf-inspector-selected');selected=id?byId(id):null;if(selected)selected.classList.add('cf-inspector-selected');}
function show(el){var box=el.getBoundingClientRect();var name=el.getAttribute('data-cf-component-label')||el.getAttribute('data-cf-component-id')||'component';var kind=el.getAttribute('data-cf-component-type')||'component';label.textContent=name+' ('+kind+')';label.style.left=Math.max(8,Math.min(box.left,window.innerWidth-260))+'px';label.style.top=Math.max(8,box.top-32)+'px';label.hidden=false;}
function suppress(event){event.preventDefault();event.stopPropagation();if(event.stopImmediatePropagation)event.stopImmediatePropagation();}
document.addEventListener('mouseover',function(event){ensureFallbackBoundaries();var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;if(!target)return;if(active&&active!==target)active.classList.remove('cf-inspector-hover');active=target;target.classList.add('cf-inspector-hover');show(target);post(componentData(target,'hover'));},true);
document.addEventListener('mouseout',function(event){if(!active)return;var next=event.relatedTarget;if(next&&active.contains(next))return;active.classList.remove('cf-inspector-hover');active=null;label.hidden=true;},true);
document.addEventListener('click',function(event){ensureFallbackBoundaries();var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;var interactive=event.target&&event.target.closest?event.target.closest('a,button,input,select,textarea,label,summary,[role=\"button\"]'):null;if(target){suppress(event);setSelected(target.getAttribute('data-cf-component-id')||'');post(componentData(target,mode()==='comment'?'comment:create':'select',event));queueMeasure();return;}if(interactive){suppress(event);}},true);
document.addEventListener('submit',function(event){suppress(event);},true);
document.addEventListener('scroll',queueMeasure,true);window.addEventListener('resize',queueMeasure);
window.addEventListener('message',function(event){var message=event.data;if(!message||typeof message!=='object'||message.source!=='founder-tools-inspector')return;if(message.type==='setMode'){window.__cfArticleInspectorMode=message.mode==='inspect'?'inspect':'comment';post({type:'ready',mode:mode()});}else if(message.type==='measureComponents'){postMeasure();}else if(message.type==='scrollToComponent'){var target=byId(message.componentId||'');if(target){target.scrollIntoView({block:'center',inline:'nearest'});setSelected(message.componentId||'');setTimeout(queueMeasure,80);}}else if(message.type==='setSelectedComponent'){setSelected(message.componentId||'');}});
post({type:'ready',mode:mode()});
setTimeout(queueMeasure,0);
})();"

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
        <div id="section-01" data-cf-component-id={"section:section-01"} data-cf-component-type={"section"} data-cf-component-label={"An epoch is one full pass through the training data"} data-cf-source-section-id={"section-01"}>
        <p><strong>{TOPIC}</strong> — {"An epoch in machine learning is one complete pass through the entire training dataset. If a model is training on a set of examples, one epoch means the model has had the chance to process each training example once. During that pass, the model makes predictions, compares them with the expected answers, and uses the error to update its internal parameters."}</p>
        <p>{"Epochs matter because training usually needs more than one pass. A first pass can help the model start finding patterns, but later passes let it refine those patterns and improve. For Australian AI builders, students, and founders, the epoch count is a practical planning unit. It affects model performance, compute use, and how long each experiment takes."}</p>
        <div data-cf-component-id={"image:section-01"} data-cf-component-type={"image"} data-cf-component-label={"Hero image"} data-cf-source-section-id={"section-01"}>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="What is an epoch in machine learning? Learn how epochs, batches and iterations affect model training, overfitting and compute cost."
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
            {"Not necessarily. Whether 20 epochs is too much depends on validation performance, dataset size, model complexity, training setup and compute budget."}
          </QuoteBlock>
        </div>
        <div id="section-02" data-cf-component-id={"section:section-02"} data-cf-component-type={"section"} data-cf-component-label={"How epochs, batches and iterations fit together"} data-cf-source-section-id={"section-02"}>
          <h2>{"How epochs, batches and iterations fit together"}</h2>
          <p>{"An epoch is one complete pass through the full training dataset. In practice, the model usually does not process the whole dataset at once. Large datasets are commonly split into smaller batches, and the model works through those batches one after another during the epoch."}</p>
          <p>{"A batch is a subset of training examples processed before the model updates its internal parameters. An iteration usually means one batch has been processed and used for one update. For example, if a dataset has 1,000 examples and the batch size is 100, one epoch contains 10 iterations. If training runs for five epochs, the model has had five chances to see the full dataset, with batch-by-batch updates inside each pass."}</p>
          <div data-cf-component-id={"image:section-02"} data-cf-component-type={"image"} data-cf-component-label={"Image: How epochs, batches and iterations fit together"} data-cf-source-section-id={"section-02"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b4f33080-879c-4158-be67-611dd71c2338.jpg?alt=media&token=cd2ad9bc-9510-4a34-849e-fdcab0dc102f"
            alt="Notebook with batch notes beside a laptop, illustrating epochs, batches, and iterations in model training"
            caption="How epochs, batches and iterations fit together"
            width={1200}
            height={800}
          />
          </div>
          <QuoteBlock title="Quick distinction" variant="purple">
            {"Epoch counts full passes through the dataset. Batch size controls how many examples are processed at once. Iterations count the batch updates inside an epoch."}
          </QuoteBlock>
        </div>
        <div id="section-03" data-cf-component-id={"section:section-03"} data-cf-component-type={"section"} data-cf-component-label={"Why models usually train for multiple epochs"} data-cf-source-section-id={"section-03"}>
          <h2>{"Why models usually train for multiple epochs"}</h2>
          <p>{"A model rarely learns enough from one pass through the training data. During an epoch, the model sees the full training set, usually in batches, and updates its weights and biases from the errors it calculates. Repeating that process gives the model more chances to adjust those internal settings and move closer to useful patterns in the data."}</p>
          <p>{"The first few epochs often make the biggest difference because the model is still learning broad relationships. Later epochs can still help, but the gains may become smaller as the model approaches a better fit. This is why more epochs are not automatically better. The right epoch count depends on the dataset, the model, the task, and the training setup. Used well, multiple epochs can improve pattern recognition, performance, and training stability without treating repetition as the goal."}</p>
          <div data-cf-component-id={"image:section-03"} data-cf-component-type={"image"} data-cf-component-label={"Image: Why models usually train for multiple epochs"} data-cf-source-section-id={"section-03"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-dc5c3272-867b-408a-b4e5-d659f5eb7576.jpg?alt=media&token=23b993be-29b1-4f40-b4dc-71300d57874f"
            alt="Laptop training log on a desk showing repeated epochs and model updates in a quiet workspace"
            caption="Why models usually train for multiple epochs"
            width={1200}
            height={800}
          />
          </div>
        </div>

        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the checklist"}>
          <ArticleResourceCTA
            eyebrow="Free guide"
            title={"Get the what is an epoch in machine learning checklist"}
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
            "How epochs, batches and iterations fit together",
            "Why models usually train for multiple epochs",
            "The trade-off: undertraining, overfitting and compute cost",
            "What common epoch counts really mean",
            "Use epochs as a training decision, not a magic number",
            ]}
            accent="indigo"
          />
        </div>
        <div id="section-04" data-cf-component-id={"section:section-04"} data-cf-component-type={"section"} data-cf-component-label={"The trade-off: undertraining, overfitting and compute cost"} data-cf-source-section-id={"section-04"}>
          <h2>{"The trade-off: undertraining, overfitting and compute cost"}</h2>
          <p>{"Epoch count is a trade-off, not a fixed rule. With too few epochs, the model may not have enough passes through the training data to adjust its weights and learn useful patterns."}</p>
          <p>{"With too many epochs, the model can start to fit the training data too closely. That can make training results look better while performance on new data gets worse. Extra epochs also cost more time and compute, so a higher epoch count should earn its place through better validation results, not just better training results."}</p>
          <h3>{"Practical signals to watch"}</h3>
          <p>{"A useful way to choose whether to keep training is to compare training performance with validation performance. If both are improving, more epochs may still be worth testing. If training keeps improving while validation stalls or worsens, the model may be starting to overfit. If neither is improving, more epochs may only add cost. For a practical project, the right epoch count is usually found by testing, checking validation results, and balancing model quality against training time and available resources."}</p>
        </div>
        <div id="section-05" data-cf-component-id={"section:section-05"} data-cf-component-type={"section"} data-cf-component-label={"What common epoch counts really mean"} data-cf-source-section-id={"section-05"}>
          <h2>{"What common epoch counts really mean"}</h2>
          <p>{"Common epoch counts are easiest to read as plain counts of full passes through the training data. If you train for 3 epochs, the model has worked through the full training dataset three times. If you train for 50 epochs, it has completed fifty full passes through the training data. That does not mean it has seen only fifty examples, and it does not mean there were only fifty batch updates. Batches sit inside an epoch; the epoch is the larger cycle over the dataset."}</p>
          <p>{"So is 20 epochs enough, or is 100 epochs too much? There is no universal cutoff. The right count depends on the dataset, the model, the training setup, and the compute you can afford. More epochs can help a model keep improving, but they can also waste time or make the model fit the training data too closely. The useful question is not just how many epochs ran. It is whether validation results show that the model is learning patterns that still work on data it did not train on."}</p>
          <p>{"For practical work, treat epoch counts as experiment settings rather than rules. Run a small set of trials, compare training and validation performance, and keep notes on the epoch count, batch size, model version, and results. A 20-epoch run and a 100-epoch run are only meaningful when you can compare what changed and whether the model generalised better."}</p>
          <div data-cf-component-id={"image:section-05"} data-cf-component-type={"image"} data-cf-component-label={"Image: What common epoch counts really mean"} data-cf-source-section-id={"section-05"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-b1b48105-1144-4e9d-9a3b-5074f2eece1c.jpg?alt=media&token=e5bbe686-3a13-43cd-99e0-3722a67fc224"
            alt="Fingertips tallying training epochs in a notebook beside a laptop during a late-night machine learning session"
            caption="What common epoch counts really mean"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="section-06" data-cf-component-id={"section:section-06"} data-cf-component-type={"section"} data-cf-component-label={"Use epochs as a training decision, not a magic number"} data-cf-source-section-id={"section-06"}>
          <h2>{"Use epochs as a training decision, not a magic number"}</h2>
          <p>{"An epoch is one complete pass through the training dataset. During that pass, the model usually works through smaller batches, and each batch can produce an iteration where the model updates its weights and biases. That is why epoch count, batch size and iteration count should be read together, not treated as separate trivia."}</p>
          <p>{"For your next training run, start with a reasonable epoch count, then watch what happens to training and validation behaviour. If the model is still improving, more epochs may help. If improvement slows or validation results get worse, more training may not be useful. Record the epoch count alongside batch size, dataset version and model settings so later experiments are easier to compare."}</p>
          <p>{"For Australian builders, founders and students, this is the practical lesson: epochs are a decision point. Better training literacy helps teams make faster and more defensible choices when they test models, explain results and decide what to try next."}</p>
          <div data-cf-component-id={"image:section-06"} data-cf-component-type={"image"} data-cf-component-label={"Image: Use epochs as a training decision, not a magic number"} data-cf-source-section-id={"section-06"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-a8fc3505-d599-48f3-b2d3-d74e7e330671.jpg?alt=media&token=7c1733a1-0d57-44c3-bf97-aa46343ec3c2"
            alt="Data science team reviewing model training epochs on laptops in a candid wide office scene"
            caption="Use epochs as a training decision, not a magic number"
            width={1200}
            height={800}
          />
          </div>
        </div>

        <div data-cf-component-id={"quote:keep-moving-forward"} data-cf-component-type={"quote"} data-cf-component-label={"Keep moving forward"}>
          <QuoteBlock title="Keep moving forward" variant="orange">
            {"It can be, but there is no universal cutoff. If validation performance stalls or worsens while training performance improves, the model may be overfitting."}
          </QuoteBlock>
        </div>

        <div data-cf-component-id={"template-resource-cta"} data-cf-component-type={"template-resource-cta"} data-cf-component-label={"Free MLAI Template Resource"}>
          <QuoteBlock title="Free MLAI Template Resource" variant="orange">
            {"Use MLAI's free templates and practical resources to structure your AI learning, experiments and next project decisions."}
          </QuoteBlock>
        </div>

      <div data-cf-component-id={"references"} data-cf-component-type={"references"} data-cf-component-label={"Authoritative References"}>
        <ArticleReferences
          references={[
            {id: 1, href: "https://deepchecks.com/glossary/epoch-in-machine-learning/", title: "What is Epoch in Machine Learning | Deepchecks", publisher: "deepchecks.com", description: "Authoritative reference supporting What is Epoch in Machine Learning | Deepchecks.", category: "guide"},
            {id: 2, href: "https://www.geeksforgeeks.org/machine-learning/epoch-in-machine-learning/", title: "Epoch in Machine Learning - GeeksforGeeks", publisher: "geeksforgeeks.org", description: "Authoritative reference supporting Epoch in Machine Learning - GeeksforGeeks.", category: "guide"},
            {id: 3, href: "https://encord.com/glossary/epochs-definition/", title: "Epochs Definition | Encord", publisher: "encord.com", description: "Authoritative reference supporting Epochs Definition | Encord.", category: "guide"},
            {id: 4, href: "https://www.lyzr.ai/glossaries/epochs/", title: "What Are Epochs in Machine Learning?", publisher: "lyzr.ai", description: "Authoritative reference supporting What Are Epochs in Machine Learning?.", category: "guide"},
            {id: 5, href: "https://nebius.com/blog/posts/epochs-in-day-to-day-ml-pipelines", title: "Epochs in day-to-day machine learning processes", publisher: "nebius.com", description: "Authoritative reference supporting Epochs in day-to-day machine learning processes.", category: "guide"},
            {id: 6, href: "https://www.coursera.org/articles/epoch-in-machine-learning", title: "What Is an Epoch in Machine Learning? | Coursera", publisher: "coursera.org", description: "Authoritative reference supporting What Is an Epoch in Machine Learning? | Coursera.", category: "guide"},
            {id: 7, href: "https://digitaldefynd.com/IQ/epoch-in-machine-learning-pros-cons/", title: "15 Pros & Cons of Epoch in Machine Learning [2026] - DigitalDefynd Education", publisher: "digitaldefynd.com", description: "Authoritative reference supporting 15 Pros & Cons of Epoch in Machine Learning [2026] - DigitalDefynd Education.", category: "guide"},
          ]}
          heading="Sources & further reading"
        />
      </div>

        <div data-cf-component-id={"disclaimer"} data-cf-component-type={"disclaimer"} data-cf-component-label={"Disclaimer"}>
          <ArticleDisclaimer />
        </div>

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Build stronger AI training habits"
            body="Use MLAI resources to sharpen your understanding of model training, experiment tracking and practical AI decisions."
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
