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
const TITLE = `${NEWSLETTER} | Issue #7 | 4 Mar 2026`
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
    question: 'Will Foundation Models actually solve Moravec’s Paradox?',
    answer:
      'Partially. We’ve mastered high-level reasoning (chess, coding), but low-level sensorimotor skills remain hard. Foundation models like OpenVLA give us a path forward by treating “movement” as a language, but the “Noise Floor” of physical sensors is still a massive hurdle that software alone can’t fix.',
  },
  {
    id: 2,
    question: 'Is the $10,000 humanoid a realistic developer tool?',
    answer:
      'It’s getting there. As the “Trust Ceiling” for autonomous hardware lowers, we are seeing a shift from $1M research platforms to more “disposable” hardware. The goal isn’t a perfect robot; it’s a “good enough” body that can be updated via the cloud.',
  },
  {
    id: 3,
    question: 'How do we handle “Edge Latency” in robotics?',
    answer:
      'This is the ultimate friction point. You cannot wait 500ms for a cloud inference if a robot is about to collide with a human. The future of robotics isn’t just “bigger models”; it’s “smaller, faster distillations” that can run locally on the edge.',
  },
  {
    id: 4,
    question: 'Why is “Sim-to-Real” still the hardest problem in the stack?',
    answer:
      'In simulation, physics is a clean coefficient; in reality, it’s a mess of dust, humidity, and mechanical wear. This “Transfer Gap” is the ultimate tax on robotics. Until world models can simulate the chaotic entropy of a non-laboratory environment, the lab will always outperform the field.',
  },
  {
    id: 5,
    question: 'Does the “Data Moat” belong to software labs or hardware manufacturers?',
    answer:
      'As models like OpenVLA commoditise, power shifts to whoever owns “proprietary trajectories.” A fleet of robots collecting three years of real-world physical data creates a moat that synthetic data can’t bridge. The winners won’t just be the best coders, but those with the most “physical miles” driven.',
  },
  {
    id: 6,
    question: 'Will “General Purpose” robots kill “Special Purpose” automation?',
    answer:
      'Unlikely. We have general-purpose hands, yet we still use specialised dishwashers for efficiency. For the builder, the key metric is cost-per-action. A $20k humanoid doing 100 things poorly will lose to a $2k specialised arm doing one thing perfectly 24/7. We aren’t building for “human-like” form; we’re building for “value-like” utility.',
  },
]

export const summaryHighlights = {
  heading: `${NEWSLETTER} | Issue #7`,
  intro:
    'A UC Berkeley paper on OpenVLA identifies the “universal remote” moment for robotics—shifting from hard-coded scripts to prompting hardware—plus why the “physics bottleneck” and sim-to-real gaps are the new frontiers of scarcity.',
  items: [
    {
      label: 'Where does AI actually win in the physical cycle?',
      description:
        'The paper identifies a transition to vision-language-action (VLA) models: AI now excels at cross-platform embodiment, mapping natural language directly to motor commands. By treating physical movement as a token prediction problem, we are moving from “programming” robots to “prompting” hardware across diverse mechanical architectures.',
    },
    {
      label: 'What is the “physics bottleneck” and why does it matter?',
      description:
        'While we have an abundance of digital text, we lack a “GitHub” for tactile feedback. This is the physics bottleneck: the difficulty of capturing high-fidelity data for how the world actually feels. The productivity paradox shifts to the factory floor: efficiency gains in digital “brains” do not save us if the noise floor of physical entropy and hardware wear-and-tear scales harder than code generation.',
    },
    {
      label: 'What should builders take away?',
      description:
        'Stop thinking only about the model’s IQ. Start caring about sim-to-real transfer and proprietary trajectories. As generalist models commoditise, the real moat is not the code—it’s the “physical miles” and the data of human–robot trust. Movement is now the primary deployment problem, not a research footnote.',
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
        titleHighlight="Issue #7"
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
        This issue shifts from digital &quot;brains&quot; to the &quot;physics bottleneck&quot;—where AI finally gets
        hands and feet. An OpenVLA paper maps the new &quot;universal remote&quot; moment for robotics, plus world-model
        tools and <em>The Coming Wave</em>. Part of the {SERIES} series.
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
              'Hardware is no longer the moat; trajectories are. This issue breaks down why “general purpose” is often a distraction from “value-like” utility and why your sim-to-real success rate matters more than your GPU cluster.',
            variant: 'orange',
            icon: <RocketLaunchIcon className="w-5 h-5 text-white" strokeWidth={1.8} />,
          },
          {
            title: 'Students & Switchers',
            description:
              'A technical deep dive into the end of “siloed robotics” via OpenVLA and VLA models. Learn why prompting hardware is the new programming and how to navigate the “physics bottleneck” using world foundation models and digital gyms.',
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
              'When autonomous agents flood the physical grid, the “trust ceiling” becomes the ultimate barrier to deployment. This issue frames why human-in-the-loop accountability and local edge safety are the only ways to bypass the noise floor of robotic automation.',
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
          <strong>This week in one breath:</strong> A UC Berkeley paper introduces OpenVLA, the “universal remote”
          moment for robotics where we move from hard-coding to prompting hardware. As we bridge the sim-to-real gap,
          the primary bottleneck shifts from digital data to physical “trajectories” and the messy entropy of the real
          world. Plus, why the “physics bottleneck” is the new scarcity, the coming wave of autonomous agents, and the
          tools to build them.
        </p>

        <hr className="my-8 border-gray-100" />

        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} />

        <h2>Journal Paper of the Week</h2>
        <h3>
          <strong>OpenVLA: An Open-Source Vision-Language-Action Model</strong>
        </h3>

        <h4>The Context</h4>
        <p>
          For the last decade, the &quot;brain&quot; of a robot was a hyper-specific script. We spent thousands of
          engineering hours hard-coding how a specific gripper should interact with a specific plastic cup. But the
          centre of gravity has moved.
        </p>
        <p>
          We are transitioning from &quot;Programming&quot; robots to &quot;Prompting&quot; hardware. This paper from UC
          Berkeley and collaborators introduces the OpenVLA framework—a 7B parameter model that represents the
          &quot;Universal Remote&quot; moment for robotics. It bridges the gap between internet-scale knowledge
          (language/vision) and low-level motor control (action).
        </p>

        <h4>The Method &amp; Results</h4>
        <p>
          The researchers fine-tuned a massive vision-language model on the Open X-Embodiment dataset—nearly 1 million
          robot trajectories across diverse hardware. The gaps are wild:
        </p>
        <ul>
          <li>
            <strong>The Translation Layer:</strong> OpenVLA doesn&apos;t just &quot;see&quot; an object; it maps natural
            language instructions directly to continuous robot control signals. It treats &quot;pick up the apple&quot;
            as a token prediction problem, similar to how GPT predicts the next word.
          </li>
          <li>
            <strong>Embodiment Agnostic:</strong> The model demonstrates a remarkable ability to generalise across
            different robot bodies. You can take a model trained on one arm and, with minimal friction, deploy its
            &quot;reasoning&quot; onto a completely different mechanical architecture.
          </li>
          <li>
            <strong>The Robustness Floor:</strong> Unlike previous task-specific models, OpenVLA shows a 17.5% absolute
            increase in success rates for tasks involving new objects and environments it hasn&apos;t seen before.
          </li>
        </ul>

        <h4>Why It Matters</h4>
        <p>
          This is the end of the &quot;Siloed Robot.&quot; If we can treat physical movement as a scalable data problem,
          the barrier to entry for robotics collapses.
        </p>
        <p>
          We are moving toward a world where the &quot;weights and biases&quot; of a model are more important than the
          specific torque of a motor.
        </p>

        <p>
          <strong>Full paper link:</strong>
          <br />
          <a href="https://arxiv.org/abs/2406.09246" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2406.09246
          </a>
        </p>

        <hr className="my-8 border-gray-100" />

        {TOOLS_IMAGE && (
          <ArticleImageBlock src={TOOLS_IMAGE} alt="Tools worth poking this week" />
        )}

        <h2>AI tools worth checking out</h2>

        <h3>NVIDIA Cosmos</h3>
        <p>
          <strong>Best for:</strong> A &quot;World Foundation Model&quot; platform. It allows builders to simulate
          physical reality with photorealistic accuracy—ideal for training robots in a digital &quot;gym&quot; to avoid
          the high cost of hardware failure.
          <br />
          <a href="https://www.nvidia.com/en-au/ai/cosmos/" target="_blank" rel="noopener noreferrer">
            https://www.nvidia.com/en-au/ai/cosmos/
          </a>
        </p>

        <h3>OpenMind OM1</h3>
        <p>
          <strong>Best for:</strong> A robot-agnostic operating system—the &quot;Android OS&quot; for the robotics era.
          It provides a standardised software layer that lets your AI &quot;brain&quot; talk to almost any mechanical
          &quot;body.&quot;
          <br />
          <a href="https://www.openmind.org/" target="_blank" rel="noopener noreferrer">
            https://www.openmind.org/
          </a>
        </p>

        <h3>Physical Intelligence π0 (Pi‑Zero)</h3>
        <p>
          <strong>Best for:</strong> A generalist vision‑language‑action model designed for zero‑shot generalisation.
          Ideal for developers who want robots to perform complex tasks (like folding laundry or sorting bins) without
          task‑specific training data.
          <br />
          <a href="https://www.physicalintelligence.company/" target="_blank" rel="noopener noreferrer">
            https://www.physicalintelligence.company/
          </a>
        </p>

        <ArticleImageBlock src={BOOK_RECOMMENDATION_IMAGE} alt="Book cover" />

        <h2>Book recommendation (because your brain deserves more than changelogs)</h2>
        <h3>The Coming Wave — Mustafa Suleyman</h3>
        <p>
          <strong>Why it matters:</strong> If we successfully build a &quot;General Purpose&quot; robot tomorrow, who
          actually owns the liability when it makes a mistake in your home? As the technical barriers between digital
          code and physical muscle evaporate, we are rushing toward a &quot;containment&quot; crisis that most builders
          aren&apos;t prepared for.
        </p>
        <p>
          <strong>The gist:</strong> Mustafa Suleyman (co‑founder of DeepMind) poses a chilling question: can a
          technology that is designed to be autonomous ever truly be contained? If the &quot;Coming Wave&quot; of
          robotics is as inevitable as the internet was, how do we prevent the total erosion of the &quot;Trust
          Ceiling&quot; in our physical neighbourhoods? You&apos;ll need to dive into his framework for
          &quot;containment&quot; to see if we&apos;re building a utopia or an uncontrollable feedback loop.
        </p>

        <hr className="my-8 border-gray-100" />

        {GEEKY_THOUGHT_IMAGE && (
          <ArticleImageBlock
            src={GEEKY_THOUGHT_IMAGE}
            alt="Geeky thought of the week"
          />
        )}

        <h2>Geeky thought of the week</h2>
        <p className="font-semibold">
          The &quot;Physics Bottleneck&quot; is the new scarcity.
        </p>
        <p>
          We&apos;ve spent the last three years feasting on the &quot;Data Abundance&quot; of the internet—billions of
          tokens of free text and images. But nature doesn&apos;t have a &quot;GitHub&quot; for tactile feedback. There
          is no &quot;Stack Overflow&quot; for the exact micro‑friction required to turn a rusted bolt without snapping
          it.
        </p>
        <p>
          We are entering an era where the most valuable data isn&apos;t what we&apos;ve written down, but what we&apos;ve
          felt. If the digital gold rush was about &quot;scaling the brain,&quot; the physical gold rush is about
          &quot;instrumenting the touch.&quot;
        </p>
        <p>
          Think of it this way: if an AI can eventually simulate every physical interaction perfectly in a digital
          &quot;gym,&quot; does the &quot;real world&quot; eventually just become an expensive, slow peripheral for the
          simulation? Or is there a &quot;Noise Floor&quot; in physical reality—a chaotic, un‑simulatable entropy—that
          will always keep the robots one step behind us?
        </p>

        <hr className="my-10 border-gray-100" />

        <h2>Housekeeping (so we stay honest)</h2>
        <p>
          This is general information, not legal advice. If you ship user-facing AI, be transparent about
          where AI is used, what it cannot do, and where humans stay in the loop.
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

