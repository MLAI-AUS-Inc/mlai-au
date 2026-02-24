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
const TITLE = `${NEWSLETTER} | Issue #6 | 25 Feb 2026`
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
    question: 'Can AI eventually automate the "Sales" part too?',
    answer:
      'Partially. AI can handle lead gen and initial outreach, but high-stakes sales are about risk mitigation and human accountability—things a model cannot yet provide.',
  },
  {
    id: 2,
    question: 'Why is "Trust" becoming more expensive?',
    answer:
      'As AI-generated outreach floods every channel, the signal-to-noise ratio collapses. When "Attention" is scarce, the cost to prove you are a real human with a real solution increases exponentially.',
  },
  {
    id: 3,
    question: 'What is the most effective lever for a builder today?',
    answer:
      'Improving your Distribution-to-Build ratio. If you spend 20 hours building, you should be spending 80 hours figuring out how to get it into a user\'s workflow.',
  },
  {
    id: 4,
    question: 'How do I get my first 100 users for my startup without a marketing budget?',
    answer:
      'The fastest way to your first 100 users isn\'t through paid ads; it\'s through unscalable, manual effort. Stop pitching and start solving micro-problems. Tactics include the "Reddit Shadow-Op" (finding people complaining about a specific problem and offering a scrappy, free tool to fix it), building tiny side-project calculators that funnel traffic to your main app, or cold-DMing ideal prospects and asking them to brutally roast your prototype.',
  },
  {
    id: 5,
    question: 'Why is my startup not getting any signups after launch?',
    answer:
      'You have likely fallen into the "Builder\'s Trap"—engineering a product in a complete vacuum. Building the tech is no longer the hardest part of a startup; distribution is. It doesn\'t matter if you\'ve engineered the most advanced agricultural drone for taking soil readings if you haven\'t stood in a muddy field to ask a farmer about their actual workflow. Features don\'t sell products; solving painful, real-world problems does.',
  },
  {
    id: 6,
    question: 'What is a "Minimum Evolvable Product" and why is it better than an MVP?',
    answer:
      'A Minimum Evolvable Product (MEP) focuses on survival and adaptation rather than just viability. When you launch, your earliest version only needs to do one thing: survive contact with a tiny group of desperate early adopters. Instead of building a polished final form, an MEP is designed to be scrappy, adapt fast, and evolve strictly based on the harsh, real-world feedback those first users give you.',
  },
  {
    id: 7,
    question: 'How do I convince users to switch from an established software competitor?',
    answer:
      'The biggest friction point for users leaving an incumbent platform is migrating their data. To steal your first 100 users, offer "Concierge Migration." Offer to manually move all their data into your system for them, entirely for free. Yes, it means doing tedious data entry at 2 AM, but doing the unscalable, dirty work that major tech companies refuse to do builds intense, long-term customer loyalty.',
  },
  {
    id: 8,
    question: 'What is the best cold outreach template for a new B2B SaaS?',
    answer:
      'The best cold outreach doesn\'t look like a sales pitch at all. Instead of asking for a meeting, ask for advice. Send a message to your ideal user on LinkedIn saying: "I\'m a founder building a tool for [their industry]. I think it\'s great, but it might also be total rubbish. Would you be open to roasting it for five minutes?" Humans can\'t resist giving their opinion, and a high percentage of those who critique your app will end up signing up because they feel a sense of ownership over the solution.',
  },
]

export const summaryHighlights = {
  heading: `${NEWSLETTER} | Issue #6`,
  intro: 'A Journal of Business Research paper on AI in sales research identifies where AI adds value (lead scoring, CRM, forecasting) and where it stalls—the trust ceiling and the noise floor—plus why "Better Tech" does not equal "Market Share."',
  items: [
    {
      label: 'Where does AI actually win in the sales cycle?',
      description:
        'The paper finds an "Asymmetry of Automation": AI excels at building-adjacent tasks (lead scoring, CRM data entry, predictive forecasting). When it comes to complex, high-stakes relationship management, AI-driven interventions often see a diminishing rate of return—the Trust Ceiling.',
    },
    {
      label: 'What is the "Noise Floor" and why does it matter?',
      description:
        'As AI lowers the cost of outreach, the volume of low-quality interactions explodes. Genuine human attention becomes a scarcer and more expensive resource. The Productivity Paradox shifts to the sales floor: efficiency gains in building do not save us if customer acquisition scales harder than code generation.',
    },
    {
      label: 'What should builders take away?',
      description:
        'Stop thinking only about how smart your product is. Start caring about how it actually reaches a human who trusts you. Sales is now the primary deployment problem, not a research footnote.',
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
        titleHighlight="Issue #6"
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
        This issue shifts from "builder's gold rush" to where AI actually stalls: the sales floor. A Journal of Business
        Research paper maps the trust ceiling and noise floor, plus tools and Crossing the Chasm. Part of the {SERIES}{' '}
        series.
      </QuoteBlock>

      <ArticleTocPlaceholder className="mb-12">
        {/* Rendered via portal by ArticleEnhancer */}
      </ArticleTocPlaceholder>

      <AudienceGrid
        heading="Read this if you are:"
        cards={[
          {
            title: 'Founders & Teams',
            description: 'Better tech does not equal market share. This issue spells out why distribution and trust are now the primary deployment problem—and why your Distribution-to-Build ratio matters more than your stack.',
            variant: 'orange',
            icon: <RocketLaunchIcon className="w-5 h-5 text-white" strokeWidth={1.8} />,
          },
          {
            title: 'Students & Switchers',
            description: 'A clear picture of where AI wins in sales (lead scoring, CRM, forecasting) and where it hits a wall. Plus practical tactics for your first 100 users, cold outreach, and why "roast my prototype" beats a pitch.',
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
            description: 'When trust is the scarce resource, community and human connection become the moat. This issue frames why events, workshops, and genuine attention scale differently from AI outreach—and how to position your community.',
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
          <strong>This week in one breath:</strong> A Journal of Business Research paper maps where AI is winning in
          sales—lead scoring, CRM, forecasting—and where it hits a wall: the trust ceiling and the noise floor. As
          technical barriers to building collapse, customer acquisition and human trust become the primary deployment
          problem. Plus tools and reads for the week.
        </p>

        <hr className="my-8 border-gray-100" />

        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} />

        <h2>Journal Paper of the Week</h2>
        <h3>
          <strong>Artificial intelligence in sales research: Identifying emergent themes and looking forward</strong>{' '}
          (Journal of Business Research) (
          <a href="https://doi.org/10.1016/j.jbusres.2025.115383" target="_blank" rel="noopener noreferrer">
            DOI
          </a>
          )
        </h3>

        <h4>The Context</h4>
        <p>
          Most of the AI discourse has obsessed over the "builder's gold rush." New frameworks, automated coding
          agents, and instant deployment. But the centre of gravity has moved.
        </p>
        <p>
          As the technical barriers to product creation collapse, we are hitting a massive friction point: the human
          element of the transaction. While we can automate the generation of a product, we cannot easily automate the
          generation of trust. This paper from the Journal of Business Research maps exactly where AI is successfully
          infiltrating the sales cycle—and, more importantly, where it is stalling. (
          <a href="https://doi.org/10.1016/j.jbusres.2025.115383" target="_blank" rel="noopener noreferrer">
            DOI
          </a>
          )
        </p>

        <h4>The Method &amp; Results</h4>
        <p>
          The researchers conducted a systematic longitudinal analysis of emergent AI themes in professional sales,
          synthesizing data from high-growth sectors to identify where AI adds value versus where it creates noise. The
          gaps are wild.
        </p>
        <ul>
          <li>
            <strong>The "Asymmetry of Automation":</strong> AI excels at "building-adjacent" sales tasks—lead scoring,
            CRM data entry, and predictive forecasting.
          </li>
          <li>
            <strong>The Trust Ceiling:</strong> When it comes to complex, high-stakes relationship management,
            AI-driven interventions often see a diminishing rate of return.
          </li>
          <li>
            <strong>The "Noise Floor":</strong> As AI lowers the cost of outreach, the volume of low-quality
            interactions explodes, making genuine human attention a scarcer and more expensive resource.
          </li>
        </ul>

        <h4>Why It Matters</h4>
        <p>
          This paper is a clean example of why "Better Tech" does not equal "Market Share." In an era where anyone can
          build a functional MVP over a weekend, the "Productivity Paradox" shifts to the sales floor. The efficiency
          gains in building do not save us if the cost of customer acquisition scales harder than the speed of code
          generation.
        </p>
        <p>
          For builders, the shift is clear. Stop thinking only about how smart your product is. Start caring about how
          it actually reaches a human who trusts you. Sales is now the primary deployment problem, not a research
          footnote. (
          <a href="https://doi.org/10.1016/j.jbusres.2025.115383" target="_blank" rel="noopener noreferrer">
            DOI
          </a>
          )
        </p>

        <p>
          <strong>Full paper:</strong>
          <br />
          <a href="https://doi.org/10.1016/j.jbusres.2025.115383" target="_blank" rel="noopener noreferrer">
            https://doi.org/10.1016/j.jbusres.2025.115383
          </a>
        </p>

        <hr className="my-8 border-gray-100" />

        {TOOLS_IMAGE && (
          <ArticleImageBlock
            src={TOOLS_IMAGE}
            alt="Tools worth poking this week"
          />
        )}

        <h2>Tools worth poking this week (in a sandbox first)</h2>

        <h3>Outreach</h3>
        <p>
          <strong>Best for:</strong> Automating sales engagement and outreach sequences. Outreach uses AI to intelligently
          suggest next-best actions, optimize follow-ups, and scale personalized communication—making sales workflows
          more efficient and less manual.
          <br />
          <a href="https://www.outreach.io/" target="_blank" rel="noopener noreferrer">
            https://www.outreach.io/
          </a>
        </p>

        <h3>Gong</h3>
        <p>
          <strong>Best for:</strong> Conversation intelligence and deal analytics. Gong applies AI to sales calls, emails,
          and meetings to uncover patterns, coach teams, identify risks, and improve close rates—turning sales
          activities into actionable insights.
          <br />
          <a href="https://www.gong.io/" target="_blank" rel="noopener noreferrer">
            https://www.gong.io/
          </a>
        </p>

        <h3>Drift</h3>
        <p>
          <strong>Best for:</strong> Conversational lead capture and qualification. Drift's AI chat engages visitors in
          real time, qualifies them automatically, and routes high-intent prospects to sales reps—helping teams convert
          traffic into real leads.
          <br />
          <a href="https://www.drift.com/" target="_blank" rel="noopener noreferrer">
            https://www.drift.com/
          </a>
        </p>

        <ArticleImageBlock
          src={BOOK_RECOMMENDATION_IMAGE}
          alt="Book cover"
        />

        <h2>Book recommendation (because your brain deserves more than changelogs)</h2>
        <h3>Crossing the Chasm — Geoffrey Moore</h3>
        <p>
          <strong>Why it matters:</strong> Moore's work is the grounding counterweight to this week's paper. It zooms out
          and maps the psychological landscape of technology adoption. His core argument is blunt: great tech dies in the
          "Chasm" because founders focus on features while customers focus on trust and social proof.
        </p>
        <p>
          <strong>The gist:</strong> Where this week's paper measures the operational infiltration of AI in sales, Moore
          exposes the deeper, structural human costs of adoption. The "cloud" of AI hype stops looking fluffy very
          quickly when it hits the hard wall of enterprise sales. Same story. Different layers.
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
          Great tech dies in the Chasm because founders focus on features while customers focus on trust and social proof.
        </p>
        <p>
          This week's paper measures where AI infiltrates sales operationally—lead scoring, CRM, the trust ceiling. Moore
          zooms out and maps the psychological landscape of adoption: the deeper, structural human costs. The "cloud" of
          AI hype stops looking fluffy very quickly when it hits the hard wall of enterprise sales.
        </p>
        <p>
          Same story. Different layers.
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
