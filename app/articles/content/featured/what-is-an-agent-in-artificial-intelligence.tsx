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

const TOPIC = "What Is an Agent in Artificial Intelligence?"
export const CATEGORY = "featured"
export const SLUG = "what-is-an-agent-in-artificial-intelligence"
export const DATE_PUBLISHED = "2026-04-17"
export const DATE_MODIFIED = "2026-04-17"
export const DESCRIPTION = "What is agent in artificial intelligence? Learn the core definition, how AI agents work, the main agent types, and how agents differ from assistants, bots, and fixed automation."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-a2025658-d5c3-44fe-a5c4-f9599005a6a0.jpg?alt=media&token=98790d72-c277-47c3-a63f-6b565ac852e2"
const HERO_IMAGE_ALT = "Close-up of coworkers reviewing an AI agent workflow on a laptop during a"
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
  { id: 1, question: "How does an AI agent work step by step?", answer: "An AI agent typically works in a loop: it gathers input, interprets the current state, chooses a next action, executes it, and then checks the result. It may repeat that cycle across several steps until it reaches the goal or needs more input." },
  { id: 2, question: "What makes an AI agent different from a chatbot?", answer: "A chatbot mainly responds in conversation, while an AI agent is designed to pursue a goal and choose actions within set limits. Agents can also use tools, data, or other systems to continue a task beyond a single reply." },
  { id: 3, question: "What are the main types of AI agents?", answer: "A common teaching model groups AI agents into simple reflex, model-based reflex, goal-based, utility-based, and learning agents. These types reflect increasing sophistication in internal state, planning, optimisation, and adaptation." },
  { id: 4, question: "Does an AI agent need memory or tool use?", answer: "Not always. Memory, reasoning, planning, and tool use are common modern features, but the core idea is still that the agent perceives its environment, makes decisions, and acts toward a goal." },
  { id: 5, question: "How can you tell if a system is really agentic?", answer: "Look for three signs together: it can perceive relevant context, choose actions in service of a goal, and act across multiple steps. Useful supporting signals include bounded autonomy, tool use, memory, and adjustment based on feedback." },
]

export const summaryHighlights = {
  heading: "Key facts: What Is an Agent in Artificial Intelligence?",
  intro: "What is agent in artificial intelligence? Learn the core definition, how AI agents work, the main agent types, and how agents differ from assistants, bots, and fixed automation.",
  items: [
    { label: "What is an agent in AI?", description: "An AI agent is a software system that works toward a goal with some autonomy. It gathers information from its environment, decides what to do next, and takes actions to move a task forward." },
    { label: "What is an example of an agent?", description: "A customer support system that asks clarifying questions, checks internal documents, decides whether it can solve the issue, and escalates when needed is an example of an AI agent." },
    { label: "Who are the Big 4 AI agents?", description: "There is no single standard list called the \u201cBig 4 AI agents\u201d in core AI agent definitions. Most teaching models instead describe common agent types, such as reflex, goal-based, utility-based, and learning approaches." },
  ],
}

export const articleMeta = {
  title: "What Is an Agent in Artificial Intelligence?",
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
  { question: "What is an agent in AI?", answer: "An AI agent is a software system that works toward a goal with some autonomy. It gathers information from its environment, decides what to do next, and takes actions to move a task forward." },
  { question: "What is an example of an agent?", answer: "A customer support system that asks clarifying questions, checks internal documents, decides whether it can solve the issue, and escalates when needed is an example of an AI agent." },
  { question: "Who are the Big 4 AI agents?", answer: "There is no single standard list called the \u201cBig 4 AI agents\u201d in core AI agent definitions. Most teaching models instead describe common agent types, such as reflex, goal-based, utility-based, and learning approaches." },
  { question: "How does an AI agent work step by step?", answer: "An AI agent typically works in a loop: it gathers input, interprets the current state, chooses a next action, executes it, and then checks the result. It may repeat that cycle across several steps until it reaches the goal or needs more input." },
  { question: "What makes an AI agent different from a chatbot?", answer: "A chatbot mainly responds in conversation, while an AI agent is designed to pursue a goal and choose actions within set limits. Agents can also use tools, data, or other systems to continue a task beyond a single reply." },
  { question: "What are the main types of AI agents?", answer: "A common teaching model groups AI agents into simple reflex, model-based reflex, goal-based, utility-based, and learning agents. These types reflect increasing sophistication in internal state, planning, optimisation, and adaptation." },
  { question: "Does an AI agent need memory or tool use?", answer: "Not always. Memory, reasoning, planning, and tool use are common modern features, but the core idea is still that the agent perceives its environment, makes decisions, and acts toward a goal." },
  { question: "How can you tell if a system is really agentic?", answer: "Look for three signs together: it can perceive relevant context, choose actions in service of a goal, and act across multiple steps. Useful supporting signals include bounded autonomy, tool use, memory, and adjustment based on feedback." },
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
        <p><strong>{TOPIC}</strong> — {"An AI agent is a software system that works toward a goal with some autonomy. In plain English, that means a person or business sets the objective, but the system can decide what steps to take next instead of waiting for a separate instruction for every move. Across the core source definitions, the common pattern is consistent: an agent interacts with its environment, gathers information, makes decisions, and takes actions to complete a task or move closer to an outcome."}</p>
        <p>{"This matters because modern AI is shifting from only answering questions to carrying out work. An agent can do more than generate text. It can look up information, use available tools, follow a workflow, and respond based on what it finds. In this article, we will keep the idea practical: first define what an AI agent is, then explain how it works, look at common types, compare it with related systems like assistants or bots, and finish with how to think about using or evaluating one in the real world."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="What is agent in artificial intelligence? Learn the core definition, how AI agents work, the main agent types, and how agents differ from assistants, bots, and fixed automation."
          width={1600}
          height={1067}
        />

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

        <QuoteBlock title="Key insight" variant="purple">
          {"An AI agent is a software system that works toward a goal with some autonomy. It gathers information from its environment, decides what to do next, and takes actions to move a task forward."}
        </QuoteBlock>
          <h2>{"The Core Traits That Make Software an Agent"}</h2>
          <p>{"What makes an AI system an agent is not just that it can produce an answer. An agent can perceive its environment, collect information, and take actions to pursue a set goal. The goal is usually defined by a person or organisation, but the agent chooses the next step on its own within those limits."}</p>
          <p>{"Sources like AWS and Google Cloud describe AI agents as software systems that work toward predetermined goals while independently selecting actions. It can inspect the current situation, decide what information it still needs, and then act to move the task forward."}</p>
          <p>{"A second core trait is decision-making based on what the agent observes. An agent takes in signals from its environment, such as user responses, system data, or other available inputs, and uses them to choose what to do next. AWS and GeeksforGeeks both frame this as interacting with the environment, collecting data, and using that data to perform self-directed tasks."}</p>
          <p>{"Modern AI agents may also include added capabilities that make this decision loop more useful. Google Cloud highlights reasoning, planning, and memory as common features, and these help explain why newer agents can handle broader tasks than older bots or scripts. Some agents can also use tools or external systems as part of their workflow. These features are helpful, but they are best seen as extensions of the main idea: the agent senses, decides, and acts in service of a goal."}</p>
          <ul>
            <li>{"Core traits"}</li>
            <li>{"Helpful added capabilities in modern agents"}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-849cc448-056e-4b41-9af9-ce023893dba5.jpg?alt=media&token=3b1f8e59-7e5c-44b9-81ea-9af0c3136c21"
            alt="The Core Traits That Make Software an Agent"
            caption="The Core Traits That Make Software an Agent"
            width={1200}
            height={800}
          />
          <h2>{"How AI Agents Work in Practice"}</h2>
          <p>{"In practice, an AI agent works in a loop rather than as a one-off reply system. It takes in input from its environment, such as a user message, a document, or data from another system. It then interprets that input against a goal, decides what to do next, takes an action, and checks the result. Sources from IBM, AWS, Google Cloud, and GeeksforGeeks all describe this pattern in similar terms: agents collect data, choose actions, interact with tools or systems, and keep moving toward a set objective."}</p>
          <p>{"What makes this useful is that the agent is not limited to text generation alone. It can be connected to tools, APIs, internal knowledge sources, and memory. That means it may look up information, call a service, update a record, or ask a follow-up question before responding. The core idea is simple: the agent observes, reasons, acts, and then observes again so it can adjust its next step."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-6793d863-8e9f-4545-9a4d-c2ad085b37e2.jpg?alt=media&token=2f4e8a57-f8e0-4e5e-bfbb-4d8bf452cbd8"
            alt="How AI Agents Work in Practice"
            caption="How AI Agents Work in Practice"
            width={1200}
            height={800}
          />
          <h3>{"Phase 1: Perceive and understand the current state"}</h3>
          <p>{"The first phase is perception. The agent gathers information from whatever environment it operates in. AWS and GeeksforGeeks both frame agents as systems that interact with their environment and collect data before acting."}</p>
          <p>{"Google Cloud describes agents as showing reasoning, planning, and memory, which helps explain why this stage is more than simple input matching. The agent is trying to work out the current state of the task: what the user wants, what information is missing, and what constraints matter before it chooses a next action."}</p>
          <h3>{"Phase 2: Choose actions, use tools, and learn from results"}</h3>
          <p>{"Once it has enough context, the agent selects a next step. IBM describes AI agents as systems that autonomously perform tasks by designing workflows with available tools, while AWS notes that humans set goals but the agent independently chooses the best actions to pursue them."}</p>
          <p>{"The action is not the end of the loop. If the tool returns useful information, the agent can continue. If the result is incomplete, it may try a different action or ask for more input. This repeated observe-decide-act pattern is what gives AI agents their practical value: they can move through a task in stages instead of stopping at a single answer."}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the what is agent in artificial intelligence checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Core traits",
            "Helpful added capabilities in modern agents",
          ]}
          accent="indigo"
        />
          <h2>{"The Main Types of Agents in Artificial Intelligence"}</h2>
          <p>{"When people ask what is agent in artificial intelligence, they often run into a common teaching model that groups agents by how they decide what to do next. The usual progression starts with simple reflex agents, then moves to model-based reflex agents, goal-based agents, utility-based agents, and learning agents."}</p>
          <p>{"A more advanced agent keeps some internal picture of the situation, reasons about goals, weighs better versus worse outcomes, and may improve from experience. In modern explanations of AI agents, this broader idea also connects to autonomy, reasoning, planning, memory, and adaptation."}</p>
          <h3>{"From direct reaction to goal-driven behaviour"}</h3>
          <p>{"A simple reflex agent follows preset condition-action rules. This is the most basic kind of agent because it does not need much internal reasoning. A model-based reflex agent goes one step further by keeping an internal state, which helps it act when it cannot rely only on the current input."}</p>
          <p>{"Goal-based agents add explicit objectives. Instead of only reacting, they can choose actions based on whether those actions move them toward a target. This makes room for planning, because the agent can evaluate possible next steps in light of the goal it is trying to reach."}</p>
          <h3>{"From choosing better outcomes to learning over time"}</h3>
          <p>{"Utility-based agents extend the goal-based idea by comparing different ways to reach a result. Rather than asking only, \"Does this achieve the goal?\" they also ask which option is better according to some measure of value or preference. This is helpful when there are several possible actions and the agent needs to optimise for a better outcome, not just any acceptable one."}</p>
          <p>{"Learning agents add adaptation. It can become more effective over time, which is why learning agents are often described as the most flexible type in the standard classification."}</p>
          <h2>{"AI Agents vs AI Assistants, Bots, and Automation"}</h2>
          <p>{"An AI agent is built to pursue a goal and choose actions on its own within set limits. Sources from IBM, AWS, Google Cloud, and GeeksforGeeks all describe agents as systems that can interact with an environment, use tools or data, and decide what to do next to complete a task. A chatbot can be useful in conversation, but it is not always designed to plan, adapt, or take follow-up actions across other systems."}</p>
          <p>{"An AI assistant sits somewhere in the middle for many real products. If it mostly waits for instructions, it behaves more like an assistant than an agent. An agentic system stands out when it can evaluate the situation, select from available tools, and adjust its path as the task changes."}</p>
          <p>{"Customer support shows where these categories overlap. By contrast, an AI agent can ask clarifying questions, look up internal documents, decide whether it can solve the issue, and escalate when needed. The same pattern applies in IT operations, where a non-agentic tool might run a fixed workflow, while an agentic system can choose steps and tools based on the problem it finds."}</p>
          <p>{"For ai agents vs ai assistants, bots, and automation, focus on Chatbot: mainly responds in conversation, Assistant: helps with tasks when prompted, and AI agent: pursues a goal, makes decisions, and acts across tools or environments."}</p>
          <ul>
            <li>{"Chatbot: mainly responds in conversation."}</li>
            <li>{"Assistant: helps with tasks when prompted."}</li>
            <li>{"AI agent: pursues a goal, makes decisions, and acts across tools or environments."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-abd63bdf-bde5-4760-8b49-4073f837bff2.jpg?alt=media&token=99b6d60e-c7e1-4401-a64e-11d281682f9c"
            alt="Ultra-close candid of a hand guiding AI agent workflow on laptop, comparing assistants, bots"
            caption="AI Agents vs AI Assistants, Bots, and Automation"
            width={1200}
            height={800}
          />
          <h2>{"How to Tell if a System Is Really an AI Agent"}</h2>
          <p>{"The stronger definitions of AI agents describe software that can interact with its environment, gather information, pursue a goal, and choose actions with some autonomy. So when you evaluate a product demo or an internal idea, look for three signs together: it can perceive relevant context, it can decide what to do next in service of a goal, and it can take actions across steps rather than stopping at one answer."}</p>
          <p>{"A system may sound agentic in marketing copy, but the better signal is bounded autonomy in a real workflow: using tools, retrieving information, keeping useful memory, and adjusting based on feedback or changing inputs. In practice, the safest path is to start with a narrow task, define clear goals and limits, watch how it behaves over multiple steps, and then expand only when the results are reliable enough for responsible use."}</p>
          <p>{"In practice, how to Tell if a System Is Really an AI Agent works best when the section stays specific about what changes first, why it matters, and how the reader can apply the idea without filler."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Finline-069eb546-1a19-4325-b05b-233d80121ab9.jpg?alt=media&token=4bca5480-80a5-47b8-a517-7bba2c8b00f4"
            alt="How to Tell if a System Is Really an AI Agent"
            caption="How to Tell if a System Is Really an AI Agent"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"There is no single standard list called the \u201cBig 4 AI agents\u201d in core AI agent definitions. Most teaching models instead describe common agent types, such as reflex, goal-based, utility-based, and learning approaches."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://aws.amazon.com/what-is/ai-agents/", title: "What are AI Agents?- Agents in Artificial Intelligence Explained - AWS", publisher: "aws.amazon.com", description: "Authoritative reference supporting What are AI Agents?- Agents in Artificial Intelligence Explained - AWS.", category: "guide"},
          {id: 2, href: "https://www.decidr.ai/blog/the-sme-superpower-how-agentic-ai-levels-the-playing-field-for-small-businesses", title: "Agentic AI: The secret edge for small business success", publisher: "decidr.ai", description: "Authoritative reference supporting Agentic AI: The secret edge for small business success.", category: "guide"},
          {id: 3, href: "https://mitsloan.mit.edu/ideas-made-to-matter/agentic-ai-explained", title: "Agentic AI, explained | MIT Sloan", publisher: "mitsloan.mit.edu", description: "Authoritative reference supporting Agentic AI, explained | MIT Sloan.", category: "guide"},
          {id: 4, href: "https://cloud.google.com/discover/what-are-ai-agents", title: "What are AI agents? Definition, examples, and types | Google Cloud", publisher: "cloud.google.com", description: "Authoritative reference supporting What are AI agents? Definition, examples, and types | Google Cloud.", category: "guide"},
          {id: 5, href: "https://www.ibm.com/think/topics/ai-agents", title: "What Are AI Agents? | IBM", publisher: "ibm.com", description: "Authoritative reference supporting What Are AI Agents? | IBM.", category: "guide"},
          {id: 6, href: "https://www.databricks.com/blog/types-ai-agents-definitions-roles-and-examples", title: "Types of AI Agents: Definitions, Roles, and Examples | Databricks Blog", publisher: "databricks.com", description: "Authoritative reference supporting Types of AI Agents: Definitions, Roles, and Examples | Databricks Blog.", category: "guide"},
          {id: 7, href: "https://www.habitat3.com.au/single-post/ai-agents-what-are-they-how-do-they-help-small-business", title: "AI Agents: What are they and why should small businesses care? How can AI agents help small business?", publisher: "habitat3.com.au", description: "Authoritative reference supporting AI Agents: What are they and why should small businesses care? How can AI agents help small business?.", category: "guide"},
          {id: 8, href: "https://www.geeksforgeeks.org/artificial-intelligence/agents-artificial-intelligence/", title: "Agents in AI - GeeksforGeeks", publisher: "geeksforgeeks.org", description: "Authoritative reference supporting Agents in AI - GeeksforGeeks.", category: "guide"},
          {id: 9, href: "https://ioni.ai/post/what-are-agents-in-artificial-intelligence", title: "What Are Agents in Artificial Intelligence? | Feb 19, 2025", publisher: "ioni.ai", description: "Authoritative reference supporting What Are Agents in Artificial Intelligence? | Feb 19, 2025.", category: "guide"},
          {id: 10, href: "https://www.databricks.com/blog/what-is-agent-evaluation", title: "What is AI Agent Evaluation? | Databricks", publisher: "databricks.com", description: "Authoritative reference supporting What is AI Agent Evaluation? | Databricks.", category: "guide"},
          {id: 11, href: "https://en.wikipedia.org/wiki/AI_agent", title: "AI agent - Wikipedia", publisher: "en.wikipedia.org", description: "Authoritative reference supporting AI agent - Wikipedia.", category: "guide"},
          {id: 12, href: "https://www.jotform.com/agent-templates/category/checklist-ai-agents", title: "Checklist AI Agents | Jotform", publisher: "jotform.com", description: "Authoritative reference supporting Checklist AI Agents | Jotform.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Explore practical AI learning paths"
            body="If you want to move from definitions to hands-on understanding, start with practical resources for beginners and builders working with real AI workflows."
            buttonText="See practical AI learning"
            buttonHref="/practical-ai-learning-beginners-builders"
          />
        </div>
      </div>

        <AuthorBio author={authorDetails} />

        <div className="mt-12">
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleFooterNav backHref="/articles" topHref="#" />
    </>
  )
}
