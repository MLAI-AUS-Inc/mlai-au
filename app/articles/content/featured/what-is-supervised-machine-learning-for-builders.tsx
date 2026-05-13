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
import { ArticleResourceCTA } from '../../../components/articles/ArticleResourceCTA'
import { ArticleStepList } from '../../../components/articles/ArticleStepList'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'

export const useCustomHeader = true

const TOPIC = 'What is supervised machine learning for builders?'
export const CATEGORY = 'featured'
export const SLUG = 'what-is-supervised-machine-learning-for-builders'
export const DATE_PUBLISHED = '2026-05-13'
export const DATE_MODIFIED = '2026-05-13'
export const DESCRIPTION = 'What is supervised machine learning? Learn labels and uses.'
const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-80e66436-5e59-491d-8bd3-95efb0595766.jpg?alt=media&token=b966dbd0-be0b-4b7b-8cef-a0c1ab9bc2e0'
const HERO_IMAGE_ALT = 'Builder labeling training data on a laptop during a candid supervised machine learning workshop'
export const FEATURED_FOCUS = 'ai'

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
  { id: 1, question: 'When should a team use supervised learning?', answer: 'Use supervised learning when the target output is clear and you have enough examples with known answers. It is a strong fit for prediction and classification workflows.' },
  { id: 2, question: 'What are labelled examples?', answer: 'Labelled examples pair input data with the correct answer, category, value, or outcome. They give the model a reference point for learning.' },
  { id: 3, question: 'What is the difference between classification and regression?', answer: 'Classification predicts a category or class. Regression predicts a continuous value or quantity. Both are supervised learning tasks when they use labelled examples.' },
  { id: 4, question: 'Why test a supervised model on unseen data?', answer: 'Testing on unseen data checks whether the model has learned useful patterns rather than only remembering training examples. This helps judge whether it can generalise.' },
  { id: 5, question: 'What should builders do before choosing an algorithm?', answer: 'Define the target output and inspect the labels. Clear, consistent labels usually matter more than model complexity at the start.' },
]

export const summaryHighlights = {
  heading: 'Key facts: What is supervised machine learning for builders?',
  intro: 'What is supervised machine learning? Learn labels and uses.',
  items: [
    { label: 'What is meant by supervised machine learning?', description: 'Supervised machine learning trains a model with labelled examples, where each input has a known correct output. The model learns patterns so it can predict outputs for new data.' },
    { label: 'What is supervised and unsupervised learning?', description: 'Supervised learning uses labelled examples with known target outputs. Unsupervised learning looks for structure in data without those known output labels.' },
    { label: 'Is ChatGPT supervised or unsupervised learning?', description: 'Classify the learning setup rather than the product name alone. AI systems can use supervised learning, unsupervised learning, or a mix of methods across different stages.' },
  ],
}

export const articleMeta = {
  title: 'What is supervised machine learning for builders?',
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
  { question: 'What is meant by supervised machine learning?', answer: 'Supervised machine learning trains a model with labelled examples, where each input has a known correct output. The model learns patterns so it can predict outputs for new data.' },
  { question: 'What is supervised and unsupervised learning?', answer: 'Supervised learning uses labelled examples with known target outputs. Unsupervised learning looks for structure in data without those known output labels.' },
  { question: 'Is ChatGPT supervised or unsupervised learning?', answer: 'Classify the learning setup rather than the product name alone. AI systems can use supervised learning, unsupervised learning, or a mix of methods across different stages.' },
  { question: 'When should a team use supervised learning?', answer: 'Use supervised learning when the target output is clear and you have enough examples with known answers. It is a strong fit for prediction and classification workflows.' },
  { question: 'What are labelled examples?', answer: 'Labelled examples pair input data with the correct answer, category, value, or outcome. They give the model a reference point for learning.' },
  { question: 'What is the difference between classification and regression?', answer: 'Classification predicts a category or class. Regression predicts a continuous value or quantity. Both are supervised learning tasks when they use labelled examples.' },
  { question: 'Why test a supervised model on unseen data?', answer: 'Testing on unseen data checks whether the model has learned useful patterns rather than only remembering training examples. This helps judge whether it can generalise.' },
  { question: 'What should builders do before choosing an algorithm?', answer: 'Define the target output and inspect the labels. Clear, consistent labels usually matter more than model complexity at the start.' },
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
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: faqStructuredData }} />
      ) : null}
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
        <div id='section-01' data-cf-component-id={'section:section-01'} data-cf-component-type={'section'} data-cf-component-label={'What is supervised machine learning?'} data-cf-source-section-id={'section-01'}>
        <p><strong>{TOPIC}</strong> — {'Supervised machine learning is a way to train an AI model using labelled examples. Each example includes an input and a known correct output. The model uses those examples to learn the relationship between the data it receives and the answer it should produce.'}</p>
        <p>{'The aim is not only to do well on the training examples. The aim is to learn patterns that can generalise to new, unseen data. For builders and founders, supervised learning is most useful when the outcome is clear enough to label, such as a category, prediction, score, or other known target.'}</p>
        <div data-cf-component-id={'image:section-01'} data-cf-component-type={'image'} data-cf-component-label={'Hero image'} data-cf-source-section-id={'section-01'}>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption='What is supervised machine learning? Learn labels and uses.'
          width={1600}
          height={1067}
        />
        </div>
        </div>

        <div data-cf-component-id={'audience-grid'} data-cf-component-type={'audience-grid'} data-cf-component-label={'Who is this guide for?'}>
          <AudienceGrid
            heading='Who is this guide for?'
            cards={[
            {
              title: 'Founders & Builders',
              description: 'For operators validating demand, pitching a vision, and moving before momentum stalls.',
              icon: <RocketLaunchIcon className='h-6 w-6' />,
              variant: 'orange',
            },
            {
              title: 'Students & Switchers',
              description: 'For readers learning how strong technical partners evaluate traction, skills, and fit.',
              icon: <AcademicCapIcon className='h-6 w-6' />,
              variant: 'purple',
            },
            {
              title: 'Community Builders',
              description: 'For connectors, mentors, and organisers helping founders meet collaborators in the right rooms.',
              icon: <UsersIcon className='h-6 w-6' />,
              variant: 'yellow',
            },
            ]}
          />
        </div>

        <div className='mt-12' data-cf-component-id={'quote:key-insight'} data-cf-component-type={'quote'} data-cf-component-label={'Key insight'}>
          <QuoteBlock title='Key insight' variant='purple'>
            {'Supervised machine learning trains a model with labelled examples, where each input has a known correct output. The model learns patterns so it can predict outputs for new data.'}
          </QuoteBlock>
        </div>
        <div id='section-02' data-cf-component-id={'section:section-02'} data-cf-component-type={'section'} data-cf-component-label={'How supervised learning works'} data-cf-source-section-id={'section-02'}>
          <h2>{'How supervised learning works'}</h2>
          <p>{'Supervised learning starts with labelled data. Each example includes an input and the correct output, answer, category, value, or outcome. The labels act as the reference point for learning, because they show the model what the right result should look like.'}</p>
          <p>{'During training, an algorithm uses those examples to learn relationships between inputs and outputs. The model makes predictions, compares them with the known answers, and adjusts its internal parameters to reduce errors. The aim is not just to remember the training data. The aim is to produce a model that can make useful predictions on new data it has not seen before.'}</p>
          <div data-cf-component-id={'image:section-02'} data-cf-component-type={'image'} data-cf-component-label={'Image: How supervised learning works'} data-cf-source-section-id={'section-02'}>
          <ArticleImageBlock
            src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-266b2f75-fb2c-44fa-a4ea-75cc4291fae5.jpg?alt=media&token=fd65e095-5a78-4cb7-9777-e3276ddf41ff'
            alt='Notebook with labeled data examples beside a laptop, illustrating supervised learning from inputs and correct outputs'
            caption='How supervised learning works'
            width={1200}
            height={800}
          />
          </div>
          <h3>{'1. Labelled examples'}</h3>
          <p>{'A labelled example pairs the data with the correct answer. For a classification task, the label might be a category. This labelled set gives the model its ground truth.'}</p>
          <h3>{'2. Training and adjustment'}</h3>
          <p>{'The algorithm processes many labelled examples and looks for patterns. When its prediction is wrong, the model adjusts its parameters.'}</p>
          <h3>{'3. Testing on new data'}</h3>
          <p>{'After training, the model is used on new inputs. Instead, it applies the relationships learned from labelled data to predict the likely output.'}</p>
        </div>
        <div id='section-03' data-cf-component-id={'section:section-03'} data-cf-component-type={'section'} data-cf-component-label={'Classification and regression are the two core tasks'} data-cf-source-section-id={'section-03'}>
          <h2>{'Classification and regression are the two core tasks'}</h2>
          <p>{'Most supervised machine learning problems fit into one of two task types: classification or regression. Both use labelled examples. Each training example includes an input and the correct output, so the model can learn the relationship between them and make predictions on new data.'}</p>
          <p>{'Classification is used when the output is a category or class.'}</p>
          <p>{'This difference matters before you choose an algorithm or tool. Start by naming the target output you want the model to predict.'}</p>
        </div>
        <div id='section-04' data-cf-component-id={'section:section-04'} data-cf-component-type={'section'} data-cf-component-label={'When builders should choose supervised learning'} data-cf-source-section-id={'section-04'}>
          <h2>{'When builders should choose supervised learning'}</h2>
          <p>{'Choose supervised learning when your project has a clear thing to predict and enough past examples with known answers. The training data needs both inputs and correct outputs, because the model learns the relationship between them. That makes supervised learning a strong fit for prediction and classification work, such as deciding which category a new item belongs to or estimating an outcome from existing data.'}</p>
          <p>{'For Australian founders, students and AI teams, the practical test is simple: can you write down the target before you train the model? If the answer is yes, and you can collect examples that show that target consistently, supervised learning may be a good starting point. If the answer is no, the project may still be valuable, but it may not be ready for supervised learning yet.'}</p>
          <div data-cf-component-id={'image:section-04'} data-cf-component-type={'image'} data-cf-component-label={'Image: When builders should choose supervised learning'} data-cf-source-section-id={'section-04'}>
          <ArticleImageBlock
            src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-1d18a364-072e-4d12-b99e-0aa1494ed1ae.jpg?alt=media&token=8db5a1cd-ec0c-4c9f-a9bf-87c81f292af0'
            alt='Laptop on a cluttered desk showing labeled training data for a supervised learning project'
            caption='When builders should choose supervised learning'
            width={1200}
            height={800}
          />
          </div>
          <h3>{'Start with labels, not model complexity'}</h3>
          <p>{'Good labels matter more than a more complex model at the start. Supervised learning depends on labelled data, where each example includes the correct answer or output. If those answers are noisy, inconsistent or unclear, the model has weak ground truth to learn from.'}</p>
          <p>{'Before choosing algorithms, teams should check whether people would label the same examples in the same way. This early data work helps make the learning problem clearer.'}</p>
          <h3>{'Do not force it onto discovery problems'}</h3>
          <p>{'Supervised learning is less suitable when the desired outcomes or categories are not known yet. In those cases, the team is still exploring the structure of the data rather than teaching a model from known answers. That is closer to the role of unsupervised learning, which is commonly contrasted with supervised learning because it does not rely on labelled training examples.'}</p>
          <p>{'A useful rule is to ask whether you are trying to predict a known answer or discover what the possible answers might be. If you already know the answer type, supervised learning can help automate prediction on new data. If you are still defining the answer type, spend more time on exploration and problem framing before building a supervised model.'}</p>
        </div>

        <div data-cf-component-id={'resource-cta'} data-cf-component-type={'resource-cta'} data-cf-component-label={'Get the checklist'}>
          <ArticleResourceCTA
            eyebrow='Free guide'
            title={'Get the what is supervised machine learning checklist'}
            description='Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations.'
            buttonLabel='Download now'
            buttonHref='/articles'
            accent='purple'
          />
        </div>

        <div data-cf-component-id={'step-list:practical-next-steps'} data-cf-component-type={'step-list'} data-cf-component-label={'Practical next steps'}>
          <ArticleStepList
            title='Practical next steps'
            steps={[
            'How supervised learning works',
            'Classification and regression are the two core tasks',
            'When builders should choose supervised learning',
            'A practical path to a first supervised model',
            'Common questions about supervised learning',
            ]}
            accent='indigo'
          />
        </div>
        <div id='section-05' data-cf-component-id={'section:section-05'} data-cf-component-type={'section'} data-cf-component-label={'A practical path to a first supervised model'} data-cf-source-section-id={'section-05'}>
          <h2>{'A practical path to a first supervised model'}</h2>
          <p>{'Name what the model will receive as input and what it should output. This keeps the work tied to the core idea of supervised learning: labelled examples show the model the relationship between inputs and correct outputs. For example, a task might be to predict a category, a score, or another known result, but the important point is that each training example needs a trusted answer.'}</p>
          <p>{'Next, build a small labelled dataset and inspect it before training. Then train a simple baseline model and compare its predictions with the known outputs, rather than relying on intuition. The final step is to test the model on examples it did not train on. If it performs well enough on unseen data, the next experiment may justify more data or better features. If it does not, revisit the target, the labels, or the approach before scaling the work.'}</p>
          <div data-cf-component-id={'image:section-05'} data-cf-component-type={'image'} data-cf-component-label={'Image: A practical path to a first supervised model'} data-cf-source-section-id={'section-05'}>
          <ArticleImageBlock
            src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ddcf890c-9cdd-4797-baef-8f1caa155fb8.jpg?alt=media&token=35ef3629-75f8-44a3-a537-04d396f2bae0'
            alt='Fingertips labeling training data on a laptop for a first supervised machine learning model'
            caption='A practical path to a first supervised model'
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id='section-06' data-cf-component-id={'section:section-06'} data-cf-component-type={'section'} data-cf-component-label={'Common questions about supervised learning'} data-cf-source-section-id={'section-06'}>
          <h2>{'Common questions about supervised learning'}</h2>
          <p>{'Supervised machine learning means learning from labelled examples. Each training example includes input data and a known output, sometimes called the target or correct answer. The model uses those examples to learn a relationship between the inputs and outputs, then applies that relationship to new data. This is why supervised learning is often described as useful for prediction and classification tasks.'}</p>
          <p>{'The main difference between supervised and unsupervised learning is the presence of those target labels. Supervised learning starts with examples that show the desired output. Unsupervised learning looks for structure in data without those known outputs. Supervised learning is not only classification, either. It is also better to classify the learning setup, not the product name alone. An AI system may use supervised learning, unsupervised learning, or a mix of methods.'}</p>
        </div>
        <div id='section-07' data-cf-component-id={'section:section-07'} data-cf-component-type={'section'} data-cf-component-label={'Turn the definition into a small experiment'} data-cf-source-section-id={'section-07'}>
          <h2>{'Turn the definition into a small experiment'}</h2>
          <p>{'Supervised machine learning becomes easier to understand when you turn it into a small test. Start with labelled examples, where each input has a known correct output. Pick one clear target output, then train a model to learn the relationship between the inputs and that output. It is to make useful predictions on new examples the model has not learned from.'}</p>
          <p>{'A focused classification or prediction task is usually a better starting point than a broad AI product idea. Before you collect more data or choose a more complex model, discuss the problem with peers, collaborators, or mentors who understand the context.'}</p>
          <div data-cf-component-id={'image:section-07'} data-cf-component-type={'image'} data-cf-component-label={'Image: Turn the definition into a small experiment'} data-cf-source-section-id={'section-07'}>
          <ArticleImageBlock
            src='https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-ff5298de-05bc-4a2f-85cc-e7851204c9f6.jpg?alt=media&token=a22f5bb5-a3ee-4da5-9bbc-c5380544ccb9'
            alt='Students testing a labelled machine learning example on a laptop during a casual workshop'
            caption='Turn the definition into a small experiment'
            width={1200}
            height={800}
          />
          </div>
        </div>

        <div data-cf-component-id={'quote:keep-moving-forward'} data-cf-component-type={'quote'} data-cf-component-label={'Keep moving forward'}>
          <QuoteBlock title='Keep moving forward' variant='orange'>
            {'Classify the learning setup rather than the product name alone. AI systems can use supervised learning, unsupervised learning, or a mix of methods across different stages.'}
          </QuoteBlock>
        </div>

      <div data-cf-component-id={'references'} data-cf-component-type={'references'} data-cf-component-label={'Authoritative References'}>
        <ArticleReferences
          references={[
            {id: 1, href: 'https://www.geeksforgeeks.org/machine-learning/supervised-machine-learning/', title: 'Supervised Machine Learning - GeeksforGeeks', publisher: 'geeksforgeeks.org', description: 'Authoritative reference supporting Supervised Machine Learning - GeeksforGeeks.', category: 'guide'},
            {id: 2, href: 'https://www.ovhcloud.com/en-au/learn/what-is-supervised-learning/', title: 'What is supervised learning? | OVHcloud Australia', publisher: 'ovhcloud.com', description: 'Authoritative reference supporting What is supervised learning? | OVHcloud Australia.', category: 'guide'},
            {id: 3, href: 'https://developers.google.com/machine-learning/intro-to-ml/supervised', title: 'Supervised Learning | Machine Learning | Google for Developers', publisher: 'developers.google.com', description: 'Authoritative reference supporting Supervised Learning | Machine Learning | Google for Developers.', category: 'guide'},
            {id: 4, href: 'https://www.grammarly.com/blog/ai/what-is-supervised-learning/', title: 'What Is Supervised Learning? A Comprehensive Guide | Grammarly', publisher: 'grammarly.com', description: 'Authoritative reference supporting What Is Supervised Learning? A Comprehensive Guide | Grammarly.', category: 'guide'},
            {id: 5, href: 'https://adai.news/resources/glossary/supervised-learning/', title: 'Supervised Learning: What It Means for Your Business | AdAI', publisher: 'adai.news', description: 'Authoritative reference supporting Supervised Learning: What It Means for Your Business | AdAI.', category: 'guide'},
            {id: 6, href: 'https://www.ibm.com/think/topics/supervised-learning', title: 'What Is Supervised Learning? | IBM', publisher: 'ibm.com', description: 'Authoritative reference supporting What Is Supervised Learning? | IBM.', category: 'guide'},
            {id: 7, href: 'https://cloud.google.com/discover/what-is-supervised-learning', title: 'What is Supervised Learning? | Google Cloud', publisher: 'cloud.google.com', description: 'Authoritative reference supporting What is Supervised Learning? | Google Cloud.', category: 'guide'},
            {id: 8, href: 'https://www.coursera.org/articles/supervised-learning', title: 'Machine Learning Basics: What Is Supervised Learning? | Coursera', publisher: 'coursera.org', description: 'Authoritative reference supporting Machine Learning Basics: What Is Supervised Learning? | Coursera.', category: 'guide'},
            {id: 9, href: 'https://www.itmagination.com/blog/differences-between-supervised-unsupervised-machine-learning', title: 'What’s Supervised and Unsupervised Machine Learning & How They Can Benefit Your Business', publisher: 'itmagination.com', description: 'Authoritative reference supporting What’s Supervised and Unsupervised Machine Learning & How They Can Benefit Your Business.', category: 'guide'},
            {id: 10, href: 'https://blog.tobiaszwingmann.com/p/supervised-machine-learning-guide', title: 'Supervised Machine Learning: Step-By-Step Guide', publisher: 'blog.tobiaszwingmann.com', description: 'Authoritative reference supporting Supervised Machine Learning: Step-By-Step Guide.', category: 'guide'},
          ]}
          heading='Sources & further reading'
        />
      </div>

        <div data-cf-component-id={'disclaimer'} data-cf-component-type={'disclaimer'} data-cf-component-label={'Disclaimer'}>
          <ArticleDisclaimer />
        </div>

        <div className='my-12 not-prose' data-cf-component-id={'cta'} data-cf-component-type={'company-cta'} data-cf-component-label={'Company CTA'}>
          <ArticleCompanyCTA
            title='Turn a supervised learning idea into a small test'
            body='Start with one clear prediction target, a small labelled dataset, and a simple baseline model. Use MLAI resources and community support to pressure-test the problem before scaling.'
            buttonText='Explore practical AI learning'
            buttonHref='/practical-ai-learning-and-getting-started'
          />
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
