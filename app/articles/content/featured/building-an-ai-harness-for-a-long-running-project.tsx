import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline'
import { DEFAULT_AUTHOR_KEY, getAuthorProfile, DEFAULT_AUTHOR_AVATAR_FALLBACK_URL } from '../../authors'
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

const TOPIC = "Building an AI Harness for a Long-Running Project"
export const CATEGORY = "featured"
export const SLUG = "building-an-ai-harness-for-a-long-running-project"
export const DATE_PUBLISHED = "2026-03-15"
export const DATE_MODIFIED = "2026-03-15"
export const DESCRIPTION = "Learn how an AI harness for a long running project manages state, context, tools, checkpoints, and guardrails to keep autonomous work reliable, secure, and recoverable."
const HERO_IMAGE = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Fhero-e0447c71-bb99-429a-9503-57b0333d43b6.jpg?alt=media&token=d7bdce2c-359e-4119-9f97-dc61a9de3dea"
const HERO_IMAGE_ALT = "Developer and teammate reviewing AI project checkpoints and tools on a laptop in"
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
  { id: 1, question: "What should an AI harness store for a long-running project?", answer: "It should keep durable records such as task queues, checkpoints, tool outputs, file changes, approvals, error logs, and project memory. This allows the system to resume after failures or reviews without replaying the entire history." },
  { id: 2, question: "How does a harness reduce context drift over time?", answer: "A harness can layer memory into short working context, rolling summaries, and searchable long-term records. It also helps by pruning transient details and scheduling alignment checks after milestones, repeated failures, or major changes." },
  { id: 3, question: "Why are checkpoints important for long-running agents?", answer: "Checkpoints create recoverable save points after meaningful events like task completion, code generation, test results, or approvals. They make long-running systems easier to inspect, pause, retry, and resume safely." },
  { id: 4, question: "How does a harness improve security?", answer: "It enforces permission boundaries around tools, environments, credentials, and high-impact actions. Sandboxing, controlled secret handling, and approval gates reduce the risk from prompt injection, faulty code, or agent mistakes." },
  { id: 5, question: "What reliability controls belong in the harness layer?", answer: "The harness should handle timeouts, malformed tool results, interrupted jobs, schema mismatches, and retries as normal operating conditions. It should also emit logs, heartbeats, status updates, and clear stop conditions for operators." },
  { id: 6, question: "How should teams start building an AI harness?", answer: "Start with a narrow use case and a minimal viable harness rather than aiming for full autonomy immediately. Define task boundaries, add structured logging, enforce approvals for risky actions, and expand only after the control loop is working." },
]

export const summaryHighlights = {
  heading: "Key facts: Building an AI Harness for a Long-Running Project",
  intro: "Learn how an AI harness for a long running project manages state, context, tools, checkpoints, and guardrails to keep autonomous work reliable, secure, and recoverable.",
  items: [
    { label: "What is an AI harness in a long-running project?", description: "An AI harness is the operating layer around the model that manages memory, task state, tools, logs, permissions, retries, and stop conditions. It helps an agent work across many sessions without losing project continuity." },
    { label: "Why do long-running agents need more than prompts?", description: "Prompt loops handle short interactions, but long-running work needs durable state, checkpoints, and monitoring. Without that structure, agents can drift from goals, repeat work, lose context, or consume too many resources." },
    { label: "What makes a harness dependable in production?", description: "Reliable harnesses separate working context from persistent project memory, restrict tool access, and support pause-and-resume control. They also include recovery rules, approval gates, and budget limits for safer operation." },
  ],
}

export const articleMeta = {
  title: "Building an AI Harness for a Long-Running Project",
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
  { question: "What is an AI harness in a long-running project?", answer: "An AI harness is the operating layer around the model that manages memory, task state, tools, logs, permissions, retries, and stop conditions. It helps an agent work across many sessions without losing project continuity." },
  { question: "Why do long-running agents need more than prompts?", answer: "Prompt loops handle short interactions, but long-running work needs durable state, checkpoints, and monitoring. Without that structure, agents can drift from goals, repeat work, lose context, or consume too many resources." },
  { question: "What makes a harness dependable in production?", answer: "Reliable harnesses separate working context from persistent project memory, restrict tool access, and support pause-and-resume control. They also include recovery rules, approval gates, and budget limits for safer operation." },
  { question: "What should an AI harness store for a long-running project?", answer: "It should keep durable records such as task queues, checkpoints, tool outputs, file changes, approvals, error logs, and project memory. This allows the system to resume after failures or reviews without replaying the entire history." },
  { question: "How does a harness reduce context drift over time?", answer: "A harness can layer memory into short working context, rolling summaries, and searchable long-term records. It also helps by pruning transient details and scheduling alignment checks after milestones, repeated failures, or major changes." },
  { question: "Why are checkpoints important for long-running agents?", answer: "Checkpoints create recoverable save points after meaningful events like task completion, code generation, test results, or approvals. They make long-running systems easier to inspect, pause, retry, and resume safely." },
  { question: "How does a harness improve security?", answer: "It enforces permission boundaries around tools, environments, credentials, and high-impact actions. Sandboxing, controlled secret handling, and approval gates reduce the risk from prompt injection, faulty code, or agent mistakes." },
  { question: "What reliability controls belong in the harness layer?", answer: "The harness should handle timeouts, malformed tool results, interrupted jobs, schema mismatches, and retries as normal operating conditions. It should also emit logs, heartbeats, status updates, and clear stop conditions for operators." },
  { question: "How should teams start building an AI harness?", answer: "Start with a narrow use case and a minimal viable harness rather than aiming for full autonomy immediately. Define task boundaries, add structured logging, enforce approvals for risky actions, and expand only after the control loop is working." },
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
        <p><strong>{TOPIC}</strong> — {"An ai harness for long running project work is the control system that sits around the model. It manages memory, tools, task state, logs, retries, permissions, and stop conditions. A harness helps an agent operate across days, weeks, or longer without losing the thread. In enterprise settings, that operating layer is what turns a model from an interesting demo into a dependable working system."}</p>
        <p>{"The difference matters because long-running agent workflows behave more like ongoing operations than single requests. They revisit goals, hand work between steps, and accumulate context over time. If that process is unharnessed, the agent can drift away from the objective, repeat work, burn through tokens, or overwrite useful context with noisy updates. Research and industry examples on long-running agent harnesses point to the same lesson: sustained AI work needs structure, observability, and guardrails by design, not as an afterthought."}</p>
        <p>{"In practice, teams get better results when they keep the scope narrow, review changes in small increments, and treat the agent as a fast contributor instead of an unchecked decision-maker."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Learn how an AI harness for a long running project manages state, context, tools, checkpoints, and guardrails to keep autonomous work reliable, secure, and recoverable."
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
          {"An AI harness is the operating layer around the model that manages memory, task state, tools, logs, permissions, retries, and stop conditions. It helps an agent work across many sessions without losing project continuity."}
        </QuoteBlock>
          <h2>{"Core Architectural Components"}</h2>
          <p>{"An AI harness for a long running project needs a stronger foundation than a simple prompt loop. The model must keep track of goals, current tasks, decisions, outputs, and handoff points across many sessions. In practice, that means separating short-term working context from durable project state. Chat context can help the model reason in the moment, but a persistent layer is what lets the system resume cleanly after a timeout, restart, model swap, or human review."}</p>
          <p>{"Useful records include task queues, file changes, tool outputs, checkpoints, approvals, error logs, and a running project memory. This makes the harness easier to audit and easier to debug when the agent goes off track. For long-running delivery work, reliability comes from state discipline as much as model quality."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-382d857a-ecd5-4671-8224-5dc4cb9809c6.jpg?alt=media&token=53111ed2-ae21-4a81-815f-600f1ba63a4f"
            alt="Core Architectural Components"
            caption="Core Architectural Components"
            width={1200}
            height={800}
          />
          <h3>{"State and persistence"}</h3>
          <p>{"State management is the core architectural decision. A strong harness defines what the AI can hold in memory for the current step, what must be written to external storage, and what should be promoted into durable project knowledge. The key is not the exact stack."}</p>
          <p>{"For long-running projects, checkpointing should happen at meaningful boundaries such as task completion, code generation, test results, or approval gates. Each checkpoint should be recoverable without replaying the whole session. It also gives humans a practical way to inspect progress and decide whether the agent should continue, retry, or change plan."}</p>
          <h3>{"Execution boundaries, sandboxing, and control"}</h3>
          <p>{"The harness should define which tools the model can call, what inputs are allowed, which environments it can touch, and what actions require explicit approval. Safe sandboxing matters because long-running agents often interact with code, data stores, terminals, APIs, and internal systems."}</p>
          <p>{"Monitoring is the other half of control. A production-grade harness should emit heartbeats, status updates, runtime metrics, error events, and task-level progress signals that humans or supervising systems can inspect. If cost spikes, a tool hangs, a dependency fails, or the agent starts drifting, operators need a reliable way to stop execution, save state, and resume later from a safe checkpoint. That control loop is what turns a clever agent into a dependable project system."}</p>
          <h2>{"Preventing Drift and Managing Context"}</h2>
          <p>{"An AI harness for a long running project needs a memory system, not just a bigger prompt. As work stretches across days or weeks, the agent will forget earlier decisions, repeat dead ends, or over-index on the latest instruction unless the harness keeps a clean project record. A practical pattern is to store task history in layers: a short working context for the current step, a rolling summary of recent progress, and a searchable long-term memory for decisions, constraints, and artefacts. That lets the agent stay fast in the moment without losing the reasoning that matters over time."}</p>
          <p>{"Summarisation has to be structured to be useful. Those summaries can then be embedded and indexed for vector retrieval, so the agent can pull the most relevant context when it starts a new session or switches tasks."}</p>
          <p>{"Context also drifts when the agent keeps accumulating tokens without pruning. In practice, the harness should distinguish between transient context and canonical context. Transient context helps the model act now; canonical context is what the model must still know next week."}</p>
          <p>{"Even with good memory design, long running projects need regular alignment checks. The harness should schedule checkpoints at meaningful intervals, such as after a milestone, after a large code change, or after repeated failures on the same task. At each checkpoint, the system can compare current behaviour against the project goal, coding standards, risk limits, and success criteria. Human-in-the-loop review is especially valuable here because it catches subtle drift that automated metrics miss, like solving the wrong business problem, introducing fragile patterns, or making assumptions that were never approved."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-52ffb928-6166-4d5e-ab8a-08bafc1b0fb6.jpg?alt=media&token=39879282-2d10-4f2a-a5ed-30d0b0113232"
            alt="Preventing Drift and Managing Context"
            caption="Preventing Drift and Managing Context"
            width={1200}
            height={800}
          />

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the ai harness for long running project checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "A harness improves stability by adding controls around long-running agent work.",
            "Start with a minimal viable harness before increasing autonomy.",
          ]}
          accent="indigo"
        />
          <h2>{"Ensuring Security and Reliability"}</h2>
          <p>{"An ai harness for long running project work should assume that failures will happen and design for recovery from the start. The practical harness guides describe long-running agents as systems that will eventually hit API timeouts, malformed tool results, interrupted jobs, or outputs that do not match the expected schema. A reliable harness does not treat those events as rare edge cases."}</p>
          <p>{"Security depends on strict boundaries around what the agent can access and execute. Broad credentials, production access, and open-ended shell permissions create unnecessary risk for long-running jobs, especially when the agent can act over many steps. Secrets should be passed through controlled infrastructure rather than copied into prompts wherever possible. These controls reduce the blast radius of prompt injection, faulty code generation, and simple agent mistakes."}</p>
          <p>{"The harness is the right place to enforce hard limits on runtime, model calls, tool usage, and total spend for each task or session. Practical harness write-ups also emphasise clear stop conditions and escalation paths so the system knows when to hand control back to a person. When recovery rules, permission boundaries, and budget guardrails work together, the harness becomes an operating layer for safe autonomy. It helps teams keep long-running project work moving while containing operational risk, security exposure, and runaway costs."}</p>
          <p>{"For teams building this capability, the key is to treat safety controls as core product logic rather than optional extras around the model. Recovery loops, sandboxes, approval gates, and spend limits should be built into the normal flow of execution, observed in logs, and tested under failure conditions. That approach makes the harness dependable enough for real project work, not just short demos."}</p>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-1eaad4c6-1aaa-4be3-be10-6bfffc811dba.jpg?alt=media&token=a424ce87-adf7-4516-b889-f80b3c4b27f2"
            alt="Ensuring Security and Reliability"
            caption="Ensuring Security and Reliability"
            width={1200}
            height={800}
          />
          <h2>{"Deploying Your AI Harness Architecture"}</h2>
          <p>{"An ai harness for long running project work matters because the model is only one part of the system. The sources consistently show that long-running agents need structure around them: scoped tasks, tool controls, state management, checkpoints, logging, retries, and human review. Without that harness layer, performance can drift as work stretches across many steps, files, and decisions. With it, teams get a more stable operating model that is easier to monitor, debug, and improve over time."}</p>
          <p>{"That stability is also what makes scaling realistic. Anthropic, Hightouch, and other practitioners describe harnesses as the way to manage context growth, recover from failures, and keep outputs aligned with project goals over extended runs. For most engineering teams, the practical move is to start with a minimal viable harness instead of aiming for full autonomy on day one. Define the task boundaries, capture structured logs, add clear checkpoints, require approval for high-impact actions, and set recovery rules for tool or model errors. Once those controls are working, expand the agent's scope in stages and harden the parts of the workflow that show the most risk or variance."}</p>
          <p>{"A well-designed harness can support longer projects, stronger governance, and safer use of autonomous behaviour as confidence grows. MLAI works with enterprise teams in Australia to design custom AI systems that fit real operating environments, including workflow design, guardrails, observability, and rollout planning. The next step is simple: map one long-running use case, build the smallest harness that can run it safely, and use that foundation to scale with intent."}</p>
          <ul>
            <li>{"A harness improves stability by adding controls around long-running agent work."}</li>
            <li>{"Start with a minimal viable harness before increasing autonomy."}</li>
          </ul>
          <ArticleImageBlock
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/article-images%2Finline-47986147-e1c8-427a-a296-2818f3f90b43.jpg?alt=media&token=296a116e-53b8-4ba0-abd0-efa248d91eca"
            alt="Deploying Your AI Harness Architecture"
            caption="Deploying Your AI Harness Architecture"
            width={1200}
            height={800}
          />

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"Reliable harnesses separate working context from persistent project memory, restrict tool access, and support pause-and-resume control. They also include recovery rules, approval gates, and budget limits for safer operation."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://mcpmarket.com/tools/skills/long-running-project-harness", title: "Long-Running Project Harness | Claude Code Skill", publisher: "mcpmarket.com", description: "Authoritative reference supporting Long-Running Project Harness | Claude Code Skill.", category: "guide"},
          {id: 2, href: "https://www.averi.ai/guides/affordable-ai-tools-how-small-businesses-can-harness-ai-without-big-budgets", title: "Affordable AI Tools: How Small Businesses Can Harness AI Without Big Budgets", publisher: "averi.ai", description: "Authoritative reference supporting Affordable AI Tools: How Small Businesses Can Harness AI Without Big Budgets.", category: "guide"},
          {id: 3, href: "https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html", title: "Harness Engineering", publisher: "martinfowler.com", description: "Authoritative reference supporting Harness Engineering.", category: "guide"},
          {id: 4, href: "https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents", title: "Effective harnesses for long-running agents \\ Anthropic", publisher: "anthropic.com", description: "Authoritative reference supporting Effective harnesses for long-running agents \\ Anthropic.", category: "guide"},
          {id: 5, href: "https://amplifypartners.com/blog-posts/how-hightouch-built-their-long-running-agent-harness", title: "How Hightouch built their long-running agent harness | Amplify Partners", publisher: "amplifypartners.com", description: "Authoritative reference supporting How Hightouch built their long-running agent harness | Amplify Partners.", category: "guide"},
          {id: 6, href: "https://cursor.com/blog/scaling-agents", title: "Scaling long-running autonomous coding \u00b7 Cursor", publisher: "cursor.com", description: "Authoritative reference supporting Scaling long-running autonomous coding \u00b7 Cursor.", category: "guide"},
          {id: 7, href: "https://www.linkedin.com/pulse/beyond-hype-why-your-business-ai-needs-harness-just-wrapper-spanidis-ql3lf", title: "Beyond the Hype: Why Your Business AI Needs a Harness, Not Just a Wrapper", publisher: "linkedin.com", description: "Authoritative reference supporting Beyond the Hype: Why Your Business AI Needs a Harness, Not Just a Wrapper.", category: "guide"},
          {id: 8, href: "https://thoughtbot.com/blog/digital-transformation-how-to-harness-ai", title: "\n        AI for Business: How to harness AI\n    ", publisher: "thoughtbot.com", description: "Authoritative reference supporting \n        AI for Business: How to harness AI\n    .", category: "guide"},
          {id: 9, href: "https://www.philschmid.de/agent-harness-2026", title: "The importance of Agent Harness in 2026", publisher: "philschmid.de", description: "Authoritative reference supporting The importance of Agent Harness in 2026.", category: "guide"},
          {id: 10, href: "https://arxiv.org/html/2603.05344v1", title: "Building AI Coding Agents for the Terminal: Scaffolding, Harness, Context Engineering, and Lessons Learned", publisher: "arxiv.org", description: "Authoritative reference supporting Building AI Coding Agents for the Terminal: Scaffolding, Harness, Context Engineering, and Lessons Learned.", category: "guide"},
          {id: 11, href: "https://www.linkedin.com/pulse/building-effective-harnesses-long-running-ai-coding-agents-bullock-oeile", title: "Building Effective Harnesses for Long-Running AI Coding Agents: A Practical Guide", publisher: "linkedin.com", description: "Authoritative reference supporting Building Effective Harnesses for Long-Running AI Coding Agents: A Practical Guide.", category: "guide"},
          {id: 12, href: "https://www.glean.com/perspectives/avoid-these-6-common-mistakes-in-your-ai-projects", title: "Avoid these 6 common mistakes in your AI projects", publisher: "glean.com", description: "Authoritative reference supporting Avoid these 6 common mistakes in your AI projects.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Plan a safer AI harness"
            body="If you are designing autonomous workflows that run for days or weeks, MLAI can help you define the harness layer: state, guardrails, observability, approvals, and rollout steps."
            buttonText="Talk to MLAI"
            buttonHref="/contact"
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
