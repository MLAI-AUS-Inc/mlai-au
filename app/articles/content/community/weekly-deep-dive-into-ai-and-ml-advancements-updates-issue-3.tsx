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
const TITLE = `${NEWSLETTER} | Issue #3 | 26 Jan 2026`
const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_07_03%20PM.png?alt=media&token=d143aea5-9ffa-4674-906b-4d7fe020e2df'
const HERO_IMAGE_ALT = 'Scientific illustration of transient image classification'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'Does a "Thinking" model use more electricity?',
    answer:
      'Yes, significantly. For a medium-length query, GPT-5\'s average energy consumption ranges from 2.33 Wh for minimal reasoning to 17.15 Wh for high reasoning—a more than seven-fold increase.',
  },
  {
    id: 2,
    question: 'How does one AI query compare to a Google search?',
    answer:
      'A single short GPT-4o query consumes 0.42 Wh, which exceeds the footprint of a traditional Google search (0.30 Wh) by approximately 40%.',
  },
  {
    id: 3,
    question: 'Why is water usage a factor in AI?',
    answer:
      'Data centers require massive amounts of water for cooling and off-site electricity generation. GPT-4o alone is projected to evaporate enough freshwater to fill over 500 Olympic-sized pools annually.',
  },
  {
    id: 4,
    question: 'Can developers reduce this impact?',
    answer:
      'Yes. Improving batch sizes is one of the most effective levers; moving from a batch size of 4 to 8 can reduce the energy per prompt by approximately 45%.',
  },

  // Strategic / Framework Questions
  {
    id: 5,
    question: 'Do I need to change my privacy notices for new AI features?',
    answer:
      'If you introduce new AI features that process personal or sensitive information, update your privacy notice and consent flows. Reference the OAIC APPs and include a short, plain-English description of what the model does, inputs needed, retention, and human oversight.',
  },
  {
    id: 6,
    question: 'What is the safest way to start a pilot?',
    answer:
      'Begin with low-risk internal content (policies, FAQs), apply rate limits, log prompts/outputs, and perform red-team style testing. Use feature flags and role-based access. Run a DPIA/PIA if personal data is involved.',
  },
  {
    id: 7,
    question: 'How should teams validate model performance?',
    answer:
      'Create a small, labeled evaluation set that mirrors your domain. Track accuracy, hallucination rate, latency, and cost per request. Re-test after any model switch or prompt change, and record changes in a decision log.',
  },
  {
    id: 8,
    question: 'Are there grants or programs in Australia for AI experiments?',
    answer:
      'Check current state-based innovation vouchers, CSIRO Kick-Start, and university accelerator programs. Funding cycles shift, so confirm eligibility windows and co-contribution rules before committing spend.',
  },
]

export const summaryHighlights = {
  heading: `${NEWSLETTER} | Issue #3`,
  intro:
    'Three questions people are hammering into search and chat right now, plus the short answers you can steal.',
  items: [
    {
      label:
        'Do "thinking" models use significantly more electricity?',
      description:
        'Yes. GPT-5\'s energy consumption ranges from 2.33 Wh for minimal reasoning to 17.15 Wh for high reasoning—a more than seven-fold increase. The most energy-hungry models can exceed ~33 Wh per long prompt, which is 70x+ more than efficient deployments.',
    },
    {
      label:
        'Is "Model Quality" actually just "Infrastructure Efficiency"?',
      description:
        'This week\'s research suggests a model\'s "goodness" is an emergent property of the data center it lives in. The same model can use 70% less energy and water by switching infrastructure, meaning "quality" isn\'t just about weights and biases—it\'s about the grid, cooling, and hardware.',
    },
    {
      label:
        'Can developers reduce AI\'s environmental impact?',
      description:
        'Yes. Improving batch sizes from 4 to 8 can reduce energy per prompt by approximately 45%. The real question for builders: are you optimizing for capability only, or for capability per watt, per litre, per tonne of CO₂ at the scale your product is heading?',
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
      avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1732146096971.jpeg?alt=media&token=8cbc3057-565b-48d0-be4f-e786332a6376',
    },
    {
      name: 'Jun Kai (Luc) Chang',
      role: 'AI Software Developer',
      bio: "Luc is an AI Software Developer at Monash AIM, building neural networks on FPGA boards. He is pursuing a Master of AI at Monash and co-founding a startup in the event space.",
      avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1708509977925.jpeg?alt=media&token=57e9f02a-7209-4ff0-89d3-bd79e23cc8cb',
    },
    {
      name: 'Julia Ponder',
      role: 'Technical Writer',
      bio: 'Julia specialises in translating developer jargon into plain English. She creates clear, expertly formatted documentation and tests products before they go to market.',
      avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1702549233653.jpeg?alt=media&token=9ae8a7a5-58a0-4b3d-be4a-5699d2ca3a7c',
    },
    {
      name: 'Shivang Shekhar',
      role: 'Technical Writer',
      bio: 'Shivang is a mechanical engineer and AI masters student at Monash University with a diverse science background. He is the main author for AI Bits for Techies each week.',
      avatarUrl: '🔬',
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
        titleHighlight="Issue #3"
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
        This guide is part of our broader series on {SERIES}. Prefer to jump ahead?{' '}
        <a href="/articles" className="font-semibold text-white underline-offset-4 hover:underline">
          Browse related articles →
        </a>
      </QuoteBlock>

      <ArticleTocPlaceholder className="mb-12">
        {/* Rendered via portal by ArticleEnhancer */}
      </ArticleTocPlaceholder>

      <AudienceGrid
        heading="Read this if you are:"
        cards={[
          {
            title: 'Founders & Teams',
            description: 'For leaders validating ideas, seeking funding, or managing teams.',
            variant: 'orange',
            icon: <RocketLaunchIcon className="w-5 h-5 text-white" strokeWidth={1.8} />,
          },
          {
            title: 'Students & Switchers',
            description: 'For those building portfolios, learning new skills, or changing careers.',
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
            description: 'For workshop facilitators, mentors, and ecosystem supporters.',
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
          Your weekly Aussie-flavoured deep dive into what changed in AI/ML, what matters, and what to do
          next (without living on release-note social media).
        </p>

        <p>
          <strong>This week in one breath:</strong> A paper benchmarking the energy, water, and carbon footprint of LLM inference showing 70x+ differences between models, tools for local image generation and multilingual translation, and a shift in thinking: "model quality" might actually be "infrastructure efficiency"—the same model can use 70% less energy just by switching infrastructure.
        </p>

        <hr className="my-8 border-gray-100" />

        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} />

        <h2>The one paper you should pretend you read at lunch</h2>
        <h3>How Hungry is AI? Benchmarking Energy, Water, and Carbon Footprint of LLM Inference</h3>

        <h4>What is the setup?</h4>
        <p>
          Everyone argues about training being expensive, but the real day-to-day bill is inference: the prompts you send all day, every day. The paper's point is simple: we still lack clean, standardised, prompt-level numbers that factor in infrastructure, not just "the model."
        </p>

        <h4>What they did (yes, really)</h4>
        <p>
          They benchmarked 30 models using public API performance data, then layered on infrastructure multipliers like PUE and regional carbon intensity, with hardware configurations inferred statistically. They also use a probabilistic (Monte Carlo) approach and rank "eco-efficiency" with cross-efficiency DEA.
        </p>

        <h4>What happened</h4>
        <p>
          The spread is massive. The most energy-hungry models (they call out o3 and DeepSeek-R1) can exceed ~33 Wh per long prompt, which is 70x+ more than much smaller/efficient deployments. At the other end, they note a single short GPT-4o query at about 0.43 Wh, which looks tiny until you scale it.
        </p>

        <h4>Why it is interesting (beyond the number)</h4>
        <p>
          Because "same model" does not mean "same footprint." Datacentre overhead and where the workload runs can swing the outcome dramatically. In other words: model choice matters, but infrastructure choice is right behind it.
        </p>

        <h4>The real question</h4>
        <p>
          If per-query costs keep getting cheaper and faster, usage will explode anyway (Jevons vibes). So the real builder question becomes: are you optimising for capability only, or for capability per watt, per litre, per tonne of CO₂, at the scale your product is heading?
        </p>

        <p>
          <strong>Full paper:</strong>{' '}
          <a href="https://arxiv.org/abs/2505.09598" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2505.09598
          </a>
        </p>

        <hr className="my-8 border-gray-100" />

        <h2>Tools worth poking this week (in a sandbox first)</h2>

        <h3>FLUX.2 [klein] (Black Forest Labs)</h3>
        <p>
          <strong>Best for:</strong> Developers and creators with consumer-grade hardware. These compressed models allow for
          professional-grade image generation and multi-reference editing directly on local GPUs (like the RTX
          3090/4090) with sub-second response times.
          <br />
          <a href="https://blackforestlabs.ai/" target="_blank" rel="noopener noreferrer">
            https://blackforestlabs.ai/
          </a>
        </p>

        <h3>TranslateGemma (Google)</h3>
        <p>
          <strong>Best for:</strong> Building low-latency, multilingual applications. These open-weights models are optimized for
          speed and accuracy across 55 languages, fitting on everything from H100 GPUs down to mobile devices
          while maintaining high-fidelity translation.
          <br />
          <a href="https://ai.google.dev/gemma" target="_blank" rel="noopener noreferrer">
            https://ai.google.dev/gemma
          </a>
        </p>

        <h3>GLM-Image (Zhipu AI)</h3>
        <p>
          <strong>Best for:</strong> Designers requiring precise text rendering and multi-subject consistency. This hybrid model
          combines autoregressive and diffusion techniques to excel at complex tasks like style transfer and
          generating high-resolution images with legible text.
          <br />
          <a href="https://github.com/THUDM/GLM-Image" target="_blank" rel="noopener noreferrer">
            https://github.com/THUDM/GLM-Image
          </a>
        </p>

        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_01_56%20PM.png?alt=media&token=7aa355b9-1304-40cf-bba2-1808e9141a26"
          alt="Book cover"
        />

        <h2>Book recommendation (because your brain deserves more than changelogs)</h2>
        <h3>The Atlas of AI – Kate Crawford</h3>
        <p>
          Crawford's work is the grounding counterweight to this week's paper. It zooms out and maps the physical
          stuff AI is actually made of.
        </p>
        <p>
          Her core argument is blunt: AI is neither artificial nor intelligent. It is an extractive industry. One that runs
          on lithium mines, exploited labour, and relentless data harvesting.
        </p>
        <p>
          Where this week's paper measures the operational hunger of LLMs, Crawford exposes the deeper,
          structural costs. The supply chains, the labour, the land.
        </p>
        <p>
          The "cloud" stops looking fluffy very quickly. In her framing, it is a planetary-scale industrial system that
          centralises power and steadily drains natural resources.
        </p>
        <p>
          Same story. Different layers.
        </p>

        <hr className="my-8 border-gray-100" />

        <h2>Geeky thought of the day</h2>
        <p className="font-semibold">
          Is "Model Quality" actually just "Infrastructure Efficiency"?
        </p>
        <p>
          We often treat an AI's intelligence as a fixed property, but this research suggests that a model's
          "goodness" is actually an emergent property of the data center it lives in. If the same model uses 70%
          less energy and water simply by switching from a proprietary server to a highly optimized cloud provider,
          then a model's "quality" isn't just about weights and biases—it's about the grid, the cooling, and the
          hardware.
        </p>
        <p>
          In an era of adaptive routing, we have to stop asking "How smart is this AI?" and start asking
          "How effectively can this infrastructure support its reasoning?"
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
