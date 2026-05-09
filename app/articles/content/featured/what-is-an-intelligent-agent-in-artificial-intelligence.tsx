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
import MLAITemplateResourceCTA from '../../../components/articles/MLAITemplateResourceCTA'
import { ArticleReferences } from '../../../components/articles/ArticleReferences'
import ArticleDisclaimer from '../../../components/articles/ArticleDisclaimer'

export const useCustomHeader = true

const TOPIC = "What Is an Intelligent Agent in Artificial Intelligence?"
export const CATEGORY = "featured"
export const SLUG = "what-is-an-intelligent-agent-in-artificial-intelligence"
export const DATE_PUBLISHED = "2026-05-09"
export const DATE_MODIFIED = "2026-05-09"
export const DESCRIPTION = "What is intelligent agent in artificial intelligence? Learn how agents perceive, decide, act and support goal-directed AI workflows."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-6e3a2103-531c-4ceb-bcd4-4f23a2f12c58.jpg?alt=media&token=bc7c5df0-4795-4456-95a7-3444817ada68"
const HERO_IMAGE_ALT = "Close-up of teammates mapping AI intelligent agent decisions on a laptop in a candid workshop moment"
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
  { id: 1, question: "What is a real-world example of an intelligent agent?", answer: "A contact centre AI agent is one example. It can ask questions, use the answers to look up relevant information, and respond with a possible solution." },
  { id: 2, question: "How does an intelligent agent work?", answer: "An intelligent agent works as a loop: it observes its environment, reasons about the next useful action, and then acts to move closer to a goal." },
  { id: 3, question: "What makes an AI system an agent instead of a normal AI feature?", answer: "The difference is action. A passive model or dashboard may show information, while an agent uses information from its environment to choose and perform goal-directed steps." },
  { id: 4, question: "Why does rationality matter in intelligent agent design?", answer: "Rationality helps define what counts as a good action. A rational agent aims for the best available or best expected outcome within its goals, context and limits." },
  { id: 5, question: "What is PEAS in intelligent agent design?", answer: "PEAS stands for performance measure, environment, actuators and sensors. It helps builders define success, the operating context, how the agent gathers information and how it acts." },
]

export const summaryHighlights = {
  heading: "Key facts: What Is an Intelligent Agent in Artificial Intelligence?",
  intro: "What is intelligent agent in artificial intelligence? Learn how agents perceive, decide, act and support goal-directed AI workflows.",
  items: [
    { label: "What are intelligent agents in artificial intelligence?", description: "Intelligent agents are AI systems that perceive an environment, use information from it, and take actions to achieve a goal. They are defined by context, decisions and goal-directed action." },
    { label: "What are the 5 types of intelligent agents?", description: "This article focuses on the agent pattern rather than a full taxonomy. A useful practical distinction is how much context, reasoning, tool use and learning the agent can apply." },
    { label: "Is ChatGPT an intelligent agent?", description: "ChatGPT is not always an intelligent agent when used only to answer prompts. It becomes more agentic when placed in workflows that use tools, make decisions or carry out tasks." },
  ],
}

export const articleMeta = {
  title: "What Is an Intelligent Agent in Artificial Intelligence?",
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
  { question: "What are intelligent agents in artificial intelligence?", answer: "Intelligent agents are AI systems that perceive an environment, use information from it, and take actions to achieve a goal. They are defined by context, decisions and goal-directed action." },
  { question: "What are the 5 types of intelligent agents?", answer: "This article focuses on the agent pattern rather than a full taxonomy. A useful practical distinction is how much context, reasoning, tool use and learning the agent can apply." },
  { question: "Is ChatGPT an intelligent agent?", answer: "ChatGPT is not always an intelligent agent when used only to answer prompts. It becomes more agentic when placed in workflows that use tools, make decisions or carry out tasks." },
  { question: "What is a real-world example of an intelligent agent?", answer: "A contact centre AI agent is one example. It can ask questions, use the answers to look up relevant information, and respond with a possible solution." },
  { question: "How does an intelligent agent work?", answer: "An intelligent agent works as a loop: it observes its environment, reasons about the next useful action, and then acts to move closer to a goal." },
  { question: "What makes an AI system an agent instead of a normal AI feature?", answer: "The difference is action. A passive model or dashboard may show information, while an agent uses information from its environment to choose and perform goal-directed steps." },
  { question: "Why does rationality matter in intelligent agent design?", answer: "Rationality helps define what counts as a good action. A rational agent aims for the best available or best expected outcome within its goals, context and limits." },
  { question: "What is PEAS in intelligent agent design?", answer: "PEAS stands for performance measure, environment, actuators and sensors. It helps builders define success, the operating context, how the agent gathers information and how it acts." },
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

const CONTENT_FACTORY_INSPECTOR_SCRIPT = "(function(){var protocol=2;var params=new URLSearchParams(window.location.search);if(!params.has('cfInspector'))return;function post(payload){try{window.parent.postMessage(Object.assign({source:'content-factory-inspector',protocolVersion:protocol},payload),'*');}catch(e){}}if(window.__cfArticleInspectorInstalled){post({type:'ready',mode:window.__cfArticleInspectorMode||'comment'});return;}window.__cfArticleInspectorInstalled=true;window.__cfArticleInspectorProtocolVersion=protocol;window.__cfArticleInspectorMode='comment';var style=document.createElement('style');style.textContent='[data-cf-component-id]{cursor:crosshair}.cf-inspector-hover,.cf-inspector-selected{outline:2px solid #7c3aed!important;outline-offset:3px}.cf-inspector-selected{outline-color:#2563eb!important}#cf-inspector-label{position:fixed;z-index:2147483647;pointer-events:none;border-radius:6px;background:#111827;color:white;padding:4px 8px;font:600 12px/1.4 ui-sans-serif,system-ui,sans-serif;box-shadow:0 8px 24px rgba(15,23,42,.22)}';document.head.appendChild(style);var label=document.createElement('div');label.id='cf-inspector-label';label.hidden=true;document.body.appendChild(label);var active=null;var selected=null;var measureQueued=false;function mode(){return window.__cfArticleInspectorMode||'comment';}function rect(el){var r=el.getBoundingClientRect();return{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};}function esc(value){return String(value||'').replace(/\"/g,'\\\\\"');}function byId(id){var nodes=document.querySelectorAll('[data-cf-component-id]');for(var i=0;i<nodes.length;i++){if(nodes[i].getAttribute('data-cf-component-id')===id)return nodes[i];}return null;}function componentData(el,type,event){var id=el.getAttribute('data-cf-component-id')||'';var r=rect(el);var payload={type:type,componentId:id,componentType:el.getAttribute('data-cf-component-type')||'',sourceSectionId:el.getAttribute('data-cf-source-section-id')||'',label:el.getAttribute('data-cf-component-label')||id,selector:'[data-cf-component-id=\"'+esc(id)+'\"]',rect:r};if(event){var width=r.width||1;var height=r.height||1;var x=Math.max(0,Math.min(1,(event.clientX-r.left)/width));var y=Math.max(0,Math.min(1,(event.clientY-r.top)/height));payload.click={x:event.clientX,y:event.clientY};payload.anchor={x:x,y:y,createdFrom:'live_preview_click'};}return payload;}function allComponents(){var nodes=document.querySelectorAll('[data-cf-component-id]');var out=[];for(var i=0;i<nodes.length;i++){out.push(componentData(nodes[i],'component'));}return out;}function postMeasure(){post({type:'measure',components:allComponents()});}function queueMeasure(){if(measureQueued)return;measureQueued=true;window.requestAnimationFrame(function(){measureQueued=false;postMeasure();});}function setSelected(id){if(selected)selected.classList.remove('cf-inspector-selected');selected=id?byId(id):null;if(selected)selected.classList.add('cf-inspector-selected');}function show(el){var rect=el.getBoundingClientRect();var name=el.getAttribute('data-cf-component-label')||el.getAttribute('data-cf-component-id')||'component';var kind=el.getAttribute('data-cf-component-type')||'component';label.textContent=name+' ('+kind+')';label.style.left=Math.max(8,Math.min(rect.left,window.innerWidth-260))+'px';label.style.top=Math.max(8,rect.top-32)+'px';label.hidden=false;}document.addEventListener('mouseover',function(event){var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;if(!target)return;if(active&&active!==target)active.classList.remove('cf-inspector-hover');active=target;target.classList.add('cf-inspector-hover');show(target);post(componentData(target,'hover'));},true);document.addEventListener('mouseout',function(event){if(!active)return;var next=event.relatedTarget;if(next&&active.contains(next))return;active.classList.remove('cf-inspector-hover');active=null;label.hidden=true;},true);document.addEventListener('click',function(event){var target=event.target&&event.target.closest?event.target.closest('[data-cf-component-id]'):null;if(!target)return;event.preventDefault();event.stopPropagation();setSelected(target.getAttribute('data-cf-component-id')||'');post(componentData(target,mode()==='comment'?'comment:create':'select',event));queueMeasure();},true);document.addEventListener('scroll',queueMeasure,true);window.addEventListener('resize',queueMeasure);window.addEventListener('message',function(event){var message=event.data;if(!message||typeof message!=='object'||message.source!=='founder-tools-inspector')return;if(message.type==='setMode'){window.__cfArticleInspectorMode=message.mode==='inspect'?'inspect':'comment';post({type:'ready',mode:mode()});}else if(message.type==='measureComponents'){postMeasure();}else if(message.type==='scrollToComponent'){var target=byId(message.componentId||'');if(target){target.scrollIntoView({block:'center',inline:'nearest'});setSelected(message.componentId||'');setTimeout(queueMeasure,80);}}else if(message.type==='setSelectedComponent'){setSelected(message.componentId||'');}});post({type:'ready',mode:mode()});setTimeout(queueMeasure,0);})();"

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
        <div id="section-01" data-cf-component-id={"section:section-01"} data-cf-component-type={"section"} data-cf-component-label={"An intelligent agent is AI that can perceive, decide and act"} data-cf-source-section-id={"section-01"}>
        <p><strong>{TOPIC}</strong> — {"An intelligent agent in artificial intelligence is a system or software program that can perceive its environment, use information from that environment, and take actions to achieve a goal. In plain English, it is AI that does more than answer a prompt. It can decide what to do next and act with some level of autonomy."}</p>
        <p>{"A human may still set the goal, limits and tools. The agent then chooses actions or workflows that help it reach that goal. This is why intelligent agents are a core idea in AI, not only a new label for agentic products. For builders and founders, the useful question is not just whether a product uses AI, but whether it can sense context, make decisions and take goal-directed action."}</p>
        <div data-cf-component-id={"image:section-01"} data-cf-component-type={"image"} data-cf-component-label={"Hero image"} data-cf-source-section-id={"section-01"}>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="What is intelligent agent in artificial intelligence? Learn how agents perceive, decide, act and support goal-directed AI workflows."
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
            {"Intelligent agents are AI systems that perceive an environment, use information from it, and take actions to achieve a goal. They are defined by context, decisions and goal-directed action."}
          </QuoteBlock>
        </div>
        <div id="section-02" data-cf-component-id={"section:section-02"} data-cf-component-type={"section"} data-cf-component-label={"The core parts of an intelligent agent"} data-cf-source-section-id={"section-02"}>
          <h2>{"The core parts of an intelligent agent"}</h2>
          <p>{"An intelligent agent is easier to understand when you split it into a few working parts. First, it has an environment. This is the context it monitors or interacts with, such as a user conversation, a software system, a document store, a robot\u2019s surroundings, or another external setting. The agent then uses perception to collect inputs from that environment. In software, that may be data, messages, tool results, or system signals."}</p>
          <p>{"The next part is purpose. Sources describe intelligent agents as systems that act to achieve goals, predetermined outcomes, or an objective function. This goal gives the agent a reason to choose one action over another. Decision-making connects the inputs to that goal. The final part is action: the agent does something in the environment or with available tools. A dashboard can show information, but an agent can use information to decide and act."}</p>
          <div data-cf-component-id={"image:section-02"} data-cf-component-type={"image"} data-cf-component-label={"Image: The core parts of an intelligent agent"} data-cf-source-section-id={"section-02"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-07afafca-3263-4036-95a1-789172a45060.jpg?alt=media&token=ac98d132-3e30-4d9b-b984-bb80a578911a"
            alt="Notebook, laptop, and whiteboard fragments mapping the core parts of an intelligent agent on a messy desk"
            caption="The core parts of an intelligent agent"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="section-03" data-cf-component-id={"section:section-03"} data-cf-component-type={"section"} data-cf-component-label={"How intelligent agents work in practice"} data-cf-source-section-id={"section-03"}>
          <h2>{"How intelligent agents work in practice"}</h2>
          <p>{"In practice, an intelligent agent works as a loop. It observes its environment, uses the information it collects, chooses a useful next action, and then acts to move closer to a goal. The environment might be a software system, a conversation, a document store, or another setting where the agent can receive input and produce an output."}</p>
          <p>{"Modern AI agents can use available tools and design workflows to complete tasks on behalf of a user or another system. Some agents can also improve performance over time by learning from data, feedback, or acquired knowledge, rather than only following a fixed response pattern."}</p>
          <div data-cf-component-id={"image:section-03"} data-cf-component-type={"image"} data-cf-component-label={"Image: How intelligent agents work in practice"} data-cf-source-section-id={"section-03"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-3fec690c-bb6a-42d9-a5a9-93050edc5813.jpg?alt=media&token=568e29ec-5397-4d8b-af63-13c9d2b7c6ce"
            alt="Laptop on a cluttered desk showing an agent workflow loop with notes and cables in a candid workspace"
            caption="How intelligent agents work in practice"
            width={1200}
            height={800}
          />
          </div>
          <h3>{"A simple agent loop"}</h3>
          <p>{"The first phase is observation. The agent perceives the environment or collects data relevant to the task. The second phase is reasoning. It uses that input to decide which action is most likely to help achieve the goal. The third phase is action."}</p>
          <p>{"For a builder, this loop is the practical way to think about agents: input comes in, the agent decides what to do next, and an action changes the state of the task. The quality of the agent depends on how well it can interpret the environment, choose suitable actions, and keep improving its behaviour within the limits set by its design."}</p>
        </div>

        <div data-cf-component-id={"resource-cta"} data-cf-component-type={"resource-cta"} data-cf-component-label={"Get the checklist"}>
          <ArticleResourceCTA
            eyebrow="Free guide"
            title={"Get the what is intelligent agent in artificial intelligence checklist"}
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
            "The core parts of an intelligent agent",
            "How intelligent agents work in practice",
            "Why rationality matters for agent design",
            "Real examples show what makes an agent different",
            "Use the agent lens before you build",
            ]}
            accent="indigo"
          />
        </div>
        <div id="section-04" data-cf-component-id={"section:section-04"} data-cf-component-type={"section"} data-cf-component-label={"Why rationality matters for agent design"} data-cf-source-section-id={"section-04"}>
          <h2>{"Why rationality matters for agent design"}</h2>
          <p>{"Rationality is the design idea that turns an intelligent agent from \u201csoftware that acts\u201d into \u201csoftware that acts for a reason.\u201d In AI, an intelligent agent perceives its environment and takes autonomous actions to achieve goals. A rational agent is judged by whether its actions aim for the best available outcome, or the best expected outcome when the situation is uncertain."}</p>
          <p>{"This does not mean the agent is perfectly intelligent. The answer depends on the goal, the environment, the information the agent can sense, and the actions it can take."}</p>
          <h3>{"Use PEAS before you decide to build an agent"}</h3>
          <p>{"PEAS is a useful lens for this design work. It stands for performance measure, environment, actuators and sensors. The performance measure defines success. The environment is the setting the agent operates in. Actuators are how it acts. Sensors are how it gathers information."}</p>
          <p>{"If the environment is too unclear, the agent may not have enough context. If the sensors or actuators are limited, the agent may not be able to make or carry out useful decisions."}</p>
        </div>
        <div id="section-05" data-cf-component-id={"section:section-05"} data-cf-component-type={"section"} data-cf-component-label={"Real examples show what makes an agent different"} data-cf-source-section-id={"section-05"}>
          <h2>{"Real examples show what makes an agent different"}</h2>
          <p>{"The easiest way to recognise an intelligent agent is to look for context, a goal and an action. A contact centre AI agent, for example, does more than generate a reply. It can ask a customer questions, use the answers to look up relevant information and respond with a possible solution. That pattern is different from a simple chatbot that only returns text from a prompt, because the agent is choosing steps to move toward a goal."}</p>
          <p>{"Self-driving cars interpret their surroundings and act in the physical world. Virtual assistants and game-playing AI can also be agent-like when they interpret a situation, make decisions and take actions. The key point is that machine learning alone does not make something an intelligent agent. The agent pattern appears when the system uses information from its environment to perform goal-directed work."}</p>
          <p>{"This is why questions like \u201cis ChatGPT an intelligent agent?\u201d need a careful answer. A language model used only to answer a question is not always an agent. It becomes more agentic when it is placed inside a workflow that can use tools, make decisions, call external systems or carry out tasks for a user. Tool use matters because it lets the system move from producing an answer to taking steps in a process."}</p>
          <p>{"Agent capability also varies. Some agents are narrow and automated, such as a system that recommends the next product or routes a support request. Others are more complex, such as workflows that plan several steps, use different tools and adapt based on new information."}</p>
          <div data-cf-component-id={"image:section-05"} data-cf-component-type={"image"} data-cf-component-label={"Image: Real examples show what makes an agent different"} data-cf-source-section-id={"section-05"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-9b73993d-ec88-4e57-8215-761583eb1bdd.jpg?alt=media&token=a7252b2e-e8da-4899-bd5e-f2a3c0d9a9e0"
            alt="Close-up of a support agent using customer answers to guide an AI-assisted contact centre response"
            caption="Real examples show what makes an agent different"
            width={1200}
            height={800}
          />
          </div>
        </div>
        <div id="section-06" data-cf-component-id={"section:section-06"} data-cf-component-type={"section"} data-cf-component-label={"Use the agent lens before you build"} data-cf-source-section-id={"section-06"}>
          <h2>{"Use the agent lens before you build"}</h2>
          <p>{"The simplest way to test an agent idea is to ask whether it really behaves like an intelligent agent. In AI, the core pattern is clear: the agent perceives its environment, uses data or context to make decisions, and takes actions to achieve a goal. What outcome is it trying to reach? What actions is it allowed to take?"}</p>
          <p>{"For Australian AI builders and startup teams, this lens can prevent overbuilding. Start with one narrow workflow where the goal, inputs and allowed actions are easy to define."}</p>
          <div data-cf-component-id={"image:section-06"} data-cf-component-type={"image"} data-cf-component-label={"Image: Use the agent lens before you build"} data-cf-source-section-id={"section-06"}>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-363846e4-8f2c-4da4-93b5-6f7894603af0.jpg?alt=media&token=3790553d-18e5-4dd0-813b-2d7c3a393fb8"
            alt="Team mapping an AI agent workflow on a whiteboard during a candid office planning session"
            caption="Use the agent lens before you build"
            width={1200}
            height={800}
          />
          </div>
        </div>

        <div data-cf-component-id={"quote:keep-moving-forward"} data-cf-component-type={"quote"} data-cf-component-label={"Keep moving forward"}>
          <QuoteBlock title="Keep moving forward" variant="orange">
            {"ChatGPT is not always an intelligent agent when used only to answer prompts. It becomes more agentic when placed in workflows that use tools, make decisions or carry out tasks."}
          </QuoteBlock>
        </div>

        <div data-cf-component-id={"template-resource-cta"} data-cf-component-type={"template-resource-cta"} data-cf-component-label={"Free MLAI Template Resource"}>
          <MLAITemplateResourceCTA />
        </div>

      <div data-cf-component-id={"references"} data-cf-component-type={"references"} data-cf-component-label={"Authoritative References"}>
        <ArticleReferences
          references={[
            {id: 1, href: "https://en.wikipedia.org/wiki/Intelligent_agent", title: "Intelligent agent - Wikipedia", publisher: "en.wikipedia.org", description: "Authoritative reference supporting Intelligent agent - Wikipedia.", category: "guide"},
            {id: 2, href: "https://aws.amazon.com/what-is/ai-agents/", title: "What are AI Agents?- Agents in Artificial Intelligence Explained - AWS", publisher: "aws.amazon.com", description: "Authoritative reference supporting What are AI Agents?- Agents in Artificial Intelligence Explained - AWS.", category: "guide"},
            {id: 3, href: "https://mitsloan.mit.edu/ideas-made-to-matter/agentic-ai-explained", title: "Agentic AI, explained | MIT Sloan", publisher: "mitsloan.mit.edu", description: "Authoritative reference supporting Agentic AI, explained | MIT Sloan.", category: "guide"},
            {id: 4, href: "https://www.ibm.com/think/topics/ai-agents", title: "What Are AI Agents? | IBM", publisher: "ibm.com", description: "Authoritative reference supporting What Are AI Agents? | IBM.", category: "guide"},
            {id: 5, href: "https://www.blueprism.com/guides/ai/intelligent-agents/", title: "What Are Intelligent Agents? | SS&C Blue Prism", publisher: "blueprism.com", description: "Authoritative reference supporting What Are Intelligent Agents? | SS&C Blue Prism.", category: "guide"},
            {id: 6, href: "https://www.habitat3.com.au/single-post/ai-agents-what-are-they-how-do-they-help-small-business", title: "AI Agents: What are they and why should small businesses care? How can AI agents help small business?", publisher: "habitat3.com.au", description: "Authoritative reference supporting AI Agents: What are they and why should small businesses care? How can AI agents help small business?.", category: "guide"},
            {id: 7, href: "https://www.ebsco.com/research-starters/applied-sciences/intelligent-agent", title: "Intelligent agent | Applied Sciences | Research Starters | EBSCO Research", publisher: "ebsco.com", description: "Authoritative reference supporting Intelligent agent | Applied Sciences | Research Starters | EBSCO Research.", category: "guide"},
            {id: 8, href: "https://cloud.google.com/discover/what-are-ai-agents", title: "What are AI agents? Definition, examples, and types | Google Cloud", publisher: "cloud.google.com", description: "Authoritative reference supporting What are AI agents? Definition, examples, and types | Google Cloud.", category: "guide"},
            {id: 9, href: "https://www.geeksforgeeks.org/artificial-intelligence/intelligent-agent-in-ai/", title: "Intelligent Agent in AI - GeeksforGeeks", publisher: "geeksforgeeks.org", description: "Authoritative reference supporting Intelligent Agent in AI - GeeksforGeeks.", category: "guide"},
            {id: 10, href: "https://genezio.com/blog/common-ai-agent-mistakes-how-intelligent-agents-fail-and-what-you-can-do/", title: "AI Agent Mistakes: How Intelligent Agents Fail and What To Do", publisher: "genezio.com", description: "Authoritative reference supporting AI Agent Mistakes: How Intelligent Agents Fail and What To Do.", category: "guide"},
          ]}
          heading="Sources & further reading"
        />
      </div>

        <div data-cf-component-id={"disclaimer"} data-cf-component-type={"disclaimer"} data-cf-component-label={"Disclaimer"}>
          <ArticleDisclaimer />
        </div>

        <div className="my-12 not-prose" data-cf-component-id={"cta"} data-cf-component-type={"company-cta"} data-cf-component-label={"Company CTA"}>
          <ArticleCompanyCTA
            title="Build clearer AI agent ideas"
            body="Join MLAI to learn practical AI concepts, test ideas with Australian builders, and connect with people turning agentic workflows into real products."
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
