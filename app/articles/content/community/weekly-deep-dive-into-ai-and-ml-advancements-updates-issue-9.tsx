import type { ReactNode } from 'react'
import { Home } from 'lucide-react'

import { ArticleFAQ } from '../../../components/articles/ArticleFAQ'
import AuthorBio from '../../../components/AuthorBio'
import { ArticleHeroHeader } from '../../../components/articles/ArticleHeroHeader'
import { ArticleImageBlock } from '../../../components/articles/ArticleImageBlock'
import { ArticleFooterNav } from '../../../components/articles/ArticleFooterNav'
import { QuoteBlock } from '../../../components/articles/QuoteBlock'
import { ArticleTocPlaceholder } from '../../../components/articles/ArticleTocPlaceholder'
import { AudienceGrid } from '../../../components/articles/AudienceGrid'
import { RocketLaunchIcon } from '@heroicons/react/24/outline'

/** ========== INPUTS (replace all placeholders) ========== */
const SERIES = 'Weekly Deep Dive into AI and ML Advancements & Updates'
const NEWSLETTER = 'AI Bits for Techies'
const TITLE = `${NEWSLETTER} | Issue #9 | 18 Mar 2026`
const HERO_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_07_03%20PM.png?alt=media&token=d143aea5-9ffa-4674-906b-4d7fe020e2df'
const HERO_IMAGE_ALT = 'Scientific illustration of transient image classification'
const GEEKY_THOUGHT_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/geeky%20thought.png?alt=media&token=872aa2d4-e473-446a-bbf1-c1ed0d66e5e5'
const TOOLS_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/tools%20image.png?alt=media&token=da31d7a6-37f4-4519-b665-b81a997248c8'
const BOOK_RECOMMENDATION_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/book%20recommendation.png?alt=media&token=4e4ef417-d76a-48e4-b2e0-e3b8ba92fb51'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'Why isn’t “context compaction” enough for long tasks?',
    answer:
      'Compaction is essentially a summary of what happened, but summaries are lossy. They often miss the “why” behind an architectural choice. A long-running agent doesn’t just need a summary; it needs “state preservation”—the exact artifacts (git logs, tests, notes) that allow it to reconstruct the logic of the project from scratch.',
  },
  {
    id: 2,
    question: 'Why do agents “declare victory” prematurely?',
    answer:
      'Without a feature checklist, an agent looks at the current codebase, sees that it looks like a web app, and assumes the job is done. It lacks the internal requirements that a human carries. By providing a JSON-based checklist that explicitly marks features as “failing,” we give the agent an objective definition of done.',
  },
  {
    id: 3,
    question: 'What is the most effective “memory” for an agent?',
    answer:
      'It isn’t a vector database; it’s Git. A clean git history with descriptive commit messages is the most high-density memory an agent can have. It provides the what, the when, and a revert button if the current session goes off the rails.',
  },
]

export const summaryHighlights = {
  heading: `${NEWSLETTER} | Issue #9`,
  intro:
    'New research from Anthropic identifies the “context ceiling”—the point where long-running agents stall during complex builds—and introduces the “initializer-coder” framework to bridge the gap between sessions.',
  items: [
    {
      label: 'Where do long-running agents actually fail?',
      description:
        'The core bottleneck is “agentic amnesia.” Most frontier models attempt to one-shot complex applications, leading to exhausted context windows and half-implemented features. Without a structured harness, the next session arrives with no memory of the previous shift, forcing it to guess the state of the codebase. We are moving from single-shot prompts to persistent environments where the environment is as important as the model’s weights.',
    },
    {
      label: 'What is the “shift-work” problem and why does it matter?',
      description:
        'Imagine a project staffed by engineers working back-to-back shifts where no one leaves notes. This is the current reality for long-running agents. The noise floor is undocumented code left behind by a previous session. The productivity paradox hits the IDE: an agent can generate thousands of lines of code, but if it doesn’t leave clear artifacts—like a progress log or a structured feature list—the next session spends most of its tokens just trying to figure out what happened.',
    },
    {
      label: 'What should builders take away?',
      description:
        'Stop treating agents like isolated chatbots. Start building “agentic harnesses.” The real moat isn’t just the model; it’s the scaffolding around it—initializers, progress trackers, and automated testing loops. Reliability isn’t a property of the LLM; it’s an emergent property of the system design.',
    },
  ],
}

export const useCustomHeader = true

export default function ArticlePage() {
  const authors = [
    {
      name: 'Dr Sam Donegan',
      role: 'Founder & Lead Editor',
      bio: 'Sam leads the MLAI editorial team, combining deep research in machine learning with practical guidance for Australian teams adopting AI responsibly.',
      avatarUrl:
        'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1732146096971.jpeg?alt=media&token=8cbc3057-565b-48d0-be4f-e786332a6376',
      url: 'https://www.linkedin.com/in/samueldonegan',
    },
    {
      name: 'Jun Kai (Luc) Chang',
      role: 'AI Software Developer',
      bio: 'Luc is an AI Software Developer at Monash AIM, building neural networks on FPGA boards. He is pursuing a Master of AI at Monash and co-founding a startup in the event space.',
      avatarUrl:
        'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1708509977925.jpeg?alt=media&token=57e9f02a-7209-4ff0-89d3-bd79e23cc8cb',
      url: 'https://www.linkedin.com/in/jkchangjobs',
    },
    {
      name: 'Julia Ponder',
      role: 'Technical Writer',
      bio: 'Julia specialises in translating developer jargon into plain English. She creates clear, expertly formatted documentation and tests products before they go to market.',
      avatarUrl:
        'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1702549233653.jpeg?alt=media&token=9ae8a7a5-58a0-4b3d-be4a-5699d2ca3a7c',
      url: 'https://www.linkedin.com/in/julia-ponder-australia/',
    },
    {
      name: 'Shivang Shekhar',
      role: 'Technical Writer',
      bio: 'Shivang is a mechanical engineer and AI masters student at Monash University with a diverse science background. He is the main author for AI Bits for Techies each week.',
      avatarUrl:
        'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/shivang%20profile%20pic%20(1).png?alt=media&token=0e31c4ae-9e56-48db-9779-065753982748',
      url: 'https://www.linkedin.com/in/shivang-s-466458191',
    },
  ]

  const breadcrumbs = [
    { label: 'Home', href: '/articles', icon: Home },
    { label: NEWSLETTER, current: true },
  ]

  return (
    <div>
      <ArticleHeroHeader
        breadcrumbs={breadcrumbs}
        title={TITLE}
        titleHighlight="Issue #9"
        headerBgColor="cyan"
        summary={{
          heading: summaryHighlights.heading,
          intro: summaryHighlights.intro,
          items: summaryHighlights.items,
        }}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <QuoteBlock
        variant="purple"
        title="Quick note"
        icon={<span className="text-xl">💡</span>}
        className="my-6"
      >
        This issue shifts from simple prompting to the &quot;context ceiling&quot;: where long-running agents lose the
        plot. We break down the Anthropic &quot;initializer-coder&quot; framework and a 2026 systems research paper on
        terminal scaffolding, plus <em>Co‑Intelligence</em> by Ethan Mollick. Part of the {SERIES} series.
      </QuoteBlock>

      <ArticleTocPlaceholder className="mb-12">
        {/* Rendered via portal by ArticleEnhancer */}
      </ArticleTocPlaceholder>

      <AudienceGrid
        heading="Read this if you are:"
        cards={[
          {
            title: 'Founders & Teams',
            description:
              'Building the model is no longer the bottleneck; building the harness is. This issue explains why your agent-to-human trust ratio depends on the traceability and state-management you build into autonomous workflows.',
            variant: 'orange',
            icon: <RocketLaunchIcon className="w-5 h-5 text-white" strokeWidth={1.8} />,
          },
          {
            title: 'Students & Switchers',
            description:
              'A deep dive into the end of single-shot prompting. Learn why the next generation of AI jobs isn’t in prompt engineering but in agentic system design—using tools like MCP, Git, and automated testing to keep long-running agents on track.',
            variant: 'purple',
            icon: (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                />
              </svg>
            ),
          },
          {
            title: 'Community Builders',
            description:
              'When agents contribute to open-source or internal codebases over days or weeks, the noise floor of undocumented changes can kill a community. This issue frames how to use initializer agents to maintain documentation and trust in a multi-contributor environment.',
            variant: 'yellow',
            icon: (
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            ),
          },
        ]}
        className="my-10"
      />

      {/* Main content */}
      <div className="">
        <h2>{TITLE}</h2>

        <p>
          Your weekly Aussie-flavoured deep dive into what changed in AI/ML, what matters, and what to do next (without
          living on release-note social media).
        </p>

        <p>
          <strong>This week in one breath:</strong> Anthropic&apos;s latest research addresses the &quot;agentic
          amnesia&quot; problem by splitting long-horizon tasks into a two-agent relay—an initializer to set the
          foundation and a coding agent to make incremental, documented progress. As we hit the limits of single context
          windows, the primary engineering challenge moves from better prompts to better state management via git logs,
          JSON feature lists, and automated testing harnesses. Plus, the tools to manage agent skills and the framework
          for building production-ready AI systems.
        </p>

        <hr className="my-8 border-gray-100" />

        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} />

        <h2>Journal Paper of the Week</h2>
        <h3>
          <strong>Building AI Coding Agents for the Terminal: Scaffolding, Harness, and Lessons Learned</strong>
        </h3>

        <h4>The Context</h4>
        <p>
          We have reached the limits of the &quot;chat interface.&quot; For agents to take on tasks that span days rather
          than seconds, they need to exist in a persistent environment. This research explores the harness engineering
          required to turn a frontier model into a reliable terminal-based agent. It treats the terminal not just as a
          tool, but as a shared memory between sessions.
        </p>

        <h4>The Method &amp; Results</h4>
        <p>
          The researchers tested several harness configurations across thousands of coding tasks to identify why agents
          declare victory prematurely or leave codebases in a broken state.
        </p>
        <ul>
          <li>
            <strong>The progress ledger:</strong> Introducing a mandatory progress.txt file and git history reduced
            re-work time by 65%. Instead of scanning every file, the agent reads the last 20 commits to get its
            bearings.
          </li>
          <li>
            <strong>The feature checklist:</strong> Using JSON-based feature lists instead of Markdown prevented the
            model from accidentally overwriting its own requirements. Each feature is a test that must pass before the
            agent can move on.
          </li>
          <li>
            <strong>Automated verification:</strong> Agents that were forced to run an init.sh script and a basic
            browser test at the start of every session were 40% less likely to implement new features on top of
            existing bugs.
          </li>
        </ul>

        <h4>Why It Matters</h4>
        <p>
          This is the transition from &quot;AI as a tool&quot; to &quot;AI as a collaborator.&quot; If we can solve the
          state-preservation problem, we unlock the ability to build massive production-quality applications without
          human intervention at every step. The terminal is the new context window.
        </p>

        <p>
          <strong>Full paper link:</strong>
          <br />
          <a href="https://arxiv.org/abs/2603.05344" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2603.05344
          </a>
        </p>

        <hr className="my-8 border-gray-100" />

        {TOOLS_IMAGE && (
          <ArticleImageBlock src={TOOLS_IMAGE} alt="Tools worth poking this week" />
        )}

        <h2>AI tools worth checking out</h2>

        <h3>Claude Agent SDK</h3>
        <p>
          <strong>Best for:</strong> The direct implementation of the harness architecture. It uses the Model Context
          Protocol (MCP) to allow agents to safely use local tools while managing token compaction and long-running
          sessions.
          <br />
          <a href="https://github.com/anthropics/anthropic-sdk-python" target="_blank" rel="noopener noreferrer">
            https://github.com/anthropics/anthropic-sdk-python
          </a>
        </p>

        <h3>LangGraph</h3>
        <p>
          <strong>Best for:</strong> Developers who need fine-grained control over &quot;agentic amnesia.&quot; It
          models agent interactions as a stateful directed graph, allowing you to explicitly save, load, and
          &quot;checkpoint&quot; an agent&apos;s memory across multiple days of execution.
          <br />
          <a href="https://langchain-ai.github.io/langgraph/" target="_blank" rel="noopener noreferrer">
            https://langchain-ai.github.io/langgraph/
          </a>
        </p>

        <h3>Vellum AI</h3>
        <p>
          <strong>Best for:</strong> Engineering teams moving from prototypes to production. It provides a robust
          framework for observability and versioning, ensuring that when an agent &quot;hands off&quot; work to a new
          session, the logic drift is measurable and the state is verifiable.
          <br />
          <a href="https://www.vellum.ai/" target="_blank" rel="noopener noreferrer">
            https://www.vellum.ai/
          </a>
        </p>

        <ArticleImageBlock src={BOOK_RECOMMENDATION_IMAGE} alt="Book cover" />

        <h2>Book recommendation (because your brain deserves more than changelogs)</h2>
        <h3>Co‑Intelligence: Living and Working with AI — Ethan Mollick</h3>
        <p>
          <strong>The narrative bridge:</strong> If the Anthropic research is the blueprint for how we build the relay
          race between agents, Mollick’s book is the guide for how we actually live with the runners. He introduces a
          concept every builder of long-running agents needs to hear: AI isn’t just a tool; it’s an alien intern.
          Brilliant, always-on, but without clear guardrails and a way to hand off work, it will confidently hallucinate
          a finish line.
        </p>
        <p>
          <strong>The challenge:</strong> How do you manage a coworker that has a perfect memory of a single
          conversation—but a total blackout the moment the window closes? How do you maintain human agency when the
          agents start doing the heavy lifting? You’ll have to read Mollick’s take on the jagged frontier to understand
          why the scaffolding discussed in this issue is the only thing keeping us from being replaced by our own
          automated interns.
        </p>

        <hr className="my-8 border-gray-100" />

        {GEEKY_THOUGHT_IMAGE && (
          <ArticleImageBlock
            src={GEEKY_THOUGHT_IMAGE}
            alt="Geeky thought of the week"
          />
        )}

        <h2>Geeky thought of the week</h2>
        <p className="font-semibold">The &quot;Sim-to-Real&quot; gap in logic.</p>
        <p>
          We talk about robotics needing to bridge the gap between simulation and the real world, but long-running coding
          agents face a similar hurdle: the code-to-production gap. In a single context window, everything is perfect.
          The code is fresh, the variables are in memory, and the sim is running.
        </p>
        <p>
          But the moment you close that window, you hit a noise floor of reality. A dependency updates, a server
          restarts, or a previous session leaves a shadow bug that isn’t obvious from the surface.
        </p>
        <p>
          The question for your week: if we eventually give agents enough memory and tools to maintain our entire
          digital infrastructure, do we become the legacy support for our own software? Or is the ultimate role of a
          human engineer to be the initializer—setting the initial conditions for a system we can no longer fully
          comprehend in one sitting?
        </p>

        <hr className="my-10 border-gray-100" />

        <h2>Housekeeping (so we stay honest)</h2>
        <p>
          This is general information, not legal advice. If you ship user-facing AI, be transparent about where AI is
          used, what it cannot do, and where humans stay in the loop.
        </p>

        <AuthorBio authors={authors} className="mt-8" />
      </div>

      <div className="mt-12">
        <ArticleFAQ items={faqItems} />
      </div>

      <ArticleFooterNav />
    </div>
  )
}

