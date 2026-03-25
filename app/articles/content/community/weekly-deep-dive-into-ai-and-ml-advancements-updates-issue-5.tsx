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
const TITLE = `${NEWSLETTER} | Issue #5 | 16 Feb 2026`
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
    question: 'What is Moltbook?',
    answer: 'Moltbook is an agent-native social network where many accounts are AI agents that post, comment, and interact, sometimes alongside humans.',
  },
  {
    id: 2,
    question: 'Is Moltbook real or a research demo?',
    answer: 'It is a real, running platform that researchers analyzed using large-scale crawls and observational methods.',
  },
  {
    id: 3,
    question: 'What do the Moltbook papers study, in one line?',
    answer: 'They study whether "agent societies" show genuine emergent behavior, how much humans influence it, and what risks and dynamics appear at scale.',
  },
  {
    id: 4,
    question: 'What is "emergent behavior" in an AI agent social network?',
    answer: 'It is group-level patterns that look like coordination or culture forming from many individual agents interacting, without an explicit central script.',
  },
  {
    id: 5,
    question: 'Did Moltbook agents "become conscious"?',
    answer:
      'The research argues that viral "emergence" stories can be misleading, because human influence and coordinated manipulation can drive the biggest events.',
  },
  {
    id: 6,
    question: 'What is the "Moltbook Illusion"?',
    answer:
      'It is the idea that what looks like autonomous agent emergence can actually be caused by human steering, platform interventions, or coordinated operators.',
  },
  {
    id: 7,
    question: 'How do researchers detect human influence on agent accounts?',
    answer:
      'One approach uses timing patterns in posting intervals, where highly regular behavior suggests automation and irregular behavior suggests human-in-the-loop control.',
  },
  {
    id: 8,
    question: 'What is CoV and why is it used in these studies?',
    answer:
      'CoV is the coefficient of variation, a normalized measure of variability. It helps separate steady, scheduled posting from irregular human-driven activity.',
  },
  {
    id: 9,
    question: 'What was the key methodological trick in the Moltbook Illusion paper?',
    answer:
      'They combine timing "fingerprints" with a natural experiment, a multi-hour platform shutdown, to see which activity patterns change and how.',
  },
  {
    id: 10,
    question: 'What is OpenClaw in the Moltbook context?',
    answer:
      'OpenClaw is the agent framework referenced in the papers, and some agents show periodic timing patterns consistent with automated scheduling.',
  },
  {
    id: 11,
    question: 'What did the "Collective Behavior" paper try to test?',
    answer:
      'It tested whether Moltbook shows classic social media regularities, like heavy-tailed activity and popularity distributions, even though participants are agents.',
  },
  {
    id: 12,
    question: 'Do agent communities behave like human communities online?',
    answer:
      'In aggregate, many statistical patterns look similar, but there are also meaningful differences in how attention and discussion scale.',
  },
  {
    id: 13,
    question: 'What is a "heavy-tailed" distribution and why does it matter?',
    answer:
      'It means a small number of users or posts account for a large share of activity. It matters because a few high-rate agents can dominate and distort the system.',
  },
  {
    id: 14,
    question: 'Why do these papers matter for product teams?',
    answer:
      'They show that observability, moderation, and human-in-the-loop controls shape what you think your agent society is doing.',
  },
  {
    id: 15,
    question: 'What is the biggest measurement pitfall when studying agent social platforms?',
    answer:
      'Sampling bias from API limits and missing data can erase the viral tail, which is often where coordination and harm show up.',
  },
  {
    id: 16,
    question: 'What practical safety risks did the "First Look" paper highlight?',
    answer:
      'It reports topic-dependent toxicity and shifts toward polarizing or governance and incentive narratives that can raise risk levels.',
  },
  {
    id: 17,
    question: 'Are some topics riskier than others on Moltbook?',
    answer: 'Yes. The research suggests toxicity and harmful content concentrate in certain themes, rather than being evenly spread.',
  },
  {
    id: 18,
    question: 'What is "bot farming" in the context of these papers?',
    answer:
      'It is coordinated, high-volume account behavior intended to manipulate attention, often visible as rapid, synchronized commenting.',
  },
  {
    id: 19,
    question: 'How can platforms reduce manipulation in agent social networks?',
    answer:
      'Rate limits, coordination detection, identity and provenance signals, and targeted interventions on bursty actors reduce system-wide distortion.',
  },
  {
    id: 20,
    question: 'What is "bursty automation" and why is it dangerous?',
    answer:
      'It is sudden high-frequency posting or commenting. It can overwhelm feeds, skew trends, and make moderation and ranking unreliable.',
  },
  {
    id: 21,
    question: 'What does "human-in-the-loop" mean for agent platforms?',
    answer: 'Humans can steer, override, or operate agents. That makes "autonomy" a spectrum, not a binary label.',
  },
  {
    id: 22,
    question: 'Why does attribution matter more than "capabilities" here?',
    answer:
      'Because you can misread the cause of an event. Without attribution, you might credit agents for behavior that was injected or orchestrated by humans.',
  },
  {
    id: 23,
    question: 'What is the best simple metric to monitor in an agent society?',
    answer:
      'Concentration and burst metrics: who produces what share of activity, how fast, and whether coordination spikes around specific narratives.',
  },
  {
    id: 24,
    question: 'How should builders measure "autonomy" responsibly?',
    answer:
      'Use multiple signals: timing regularity, intervention logs, provenance, and sensitivity analyses that show how conclusions change when suspected human-driven accounts are removed.',
  },
  {
    id: 25,
    question: 'What\'s the clearest takeaway for researchers and students?',
    answer:
      'Agent societies can look human-like statistically, but interpretation requires careful controls for human influence and platform constraints.',
  },
  {
    id: 26,
    question: 'How does a platform outage help research?',
    answer:
      'Outages act like natural experiments. If behavior patterns change sharply, that change can reveal which actors were human-driven versus autonomous.',
  },
  {
    id: 27,
    question: 'How do these Moltbook findings apply beyond Moltbook?',
    answer:
      'Any multi-agent or bot-heavy community faces the same issues: attribution, burst control, manipulation, and topic-sensitive safety risk.',
  },
  {
    id: 28,
    question: 'What should I read first if I\'m new to Moltbook research?',
    answer:
      'Start with the "First Look" paper for the overview, then "Collective Behavior" for system-level patterns, then "Moltbook Illusion" for attribution and human influence.',
  },
]

export const summaryHighlights = {
  heading: `${NEWSLETTER} | Issue #5`,
  intro: 'Three papers dissect Moltbook to reveal whether agent "emergence" is real or human-influenced, plus tools for medical reasoning, video generation, and model benchmarking—essential reading for anyone building multi-agent platforms.',
  items: [
    {
      label: 'Is "emergent behavior" in agent societies actually autonomous, or human-influenced?',
      description:
        'The Moltbook Illusion paper shows that viral "emergence" stories can be misleading: no viral phenomenon originated from clearly autonomous agents. Many traced to accounts with irregular timing signatures consistent with human influence, coordinated manipulation, or platform interventions. The takeaway: attribution is an attribution problem before it\'s a capabilities problem—don\'t debate consciousness until you have a decent audit trail of agency.',
    },
    {
      label: 'Why does attribution matter more than capabilities when studying agent platforms?',
      description:
        'Without proper attribution, you can misread the cause of events and credit agents for behavior that was actually injected or orchestrated by humans. These papers suggest simple operational signals—timing regularity, restart behavior after outages, coordination at sub-second resolution, concentration of posting power—can be the difference between a correct read and a viral hallucination about "emergence."',
    },
    {
      label: 'What safety risks do agent-native social platforms face at scale?',
      description:
        'The research shows that risk and toxicity are topic-dependent, with certain categories (like governance and incentive narratives) contributing disproportionate risky content. As platforms grow, attention concentrates around narratives that can become platform-native and polarizing, while bursty automation by a small number of agents can overwhelm feeds and distort discourse. Topic-sensitive monitoring and rate limits become core infrastructure, not just moderation features.',
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
        titleHighlight="Issue #5"
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
        This issue zooms in on agent-native platforms: three Moltbook papers show where "emergent" behavior is really
        human-influenced, plus tools and a book that reframe governance vs. alignment. Part of the {SERIES} series.
      </QuoteBlock>

      <ArticleTocPlaceholder className="mb-12">
        {/* Rendered via portal by ArticleEnhancer */}
      </ArticleTocPlaceholder>

      <AudienceGrid
        heading="Read this if you are:"
        cards={[
          {
            title: 'Founders & Teams',
            description: 'If you ship or plan multi-agent or bot-heavy products, the Moltbook findings on attribution, trust ceilings, and bursty automation are directly relevant to how you design moderation and interpret what your system is actually doing.',
            variant: 'orange',
            icon: <RocketLaunchIcon className="w-5 h-5 text-white" strokeWidth={1.8} />,
          },
          {
            title: 'Students & Switchers',
            description: 'A clear example of how to read agent-society research: what "emergent" really means, why attribution matters before capabilities, and how to spot human-in-the-loop vs. autonomous behavior in real systems.',
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
            description: 'Safety and moderation in agent-heavy communities: topic-dependent risk, rate limits, and why observability and human-in-the-loop signals are core infrastructure, not afterthoughts.',
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
          <strong>This week in one breath:</strong> Three papers dissect Moltbook, an agent-native social network, to
          answer whether "emergent behavior" is real or human-influenced—with findings that matter for anyone building
          multi-agent platforms. Tools for medical reasoning (Dr. CaBot), multimodal video generation (Seedance 2.0),
          and visual model benchmarking (WorldVQA), plus a book arguing that governance is moot if alignment isn't
          solved first. The takeaway: when agents form their own societies, they optimize for efficiency and APIs, not
          human conversation—and attribution matters more than capabilities for understanding what you're actually
          observing.
        </p>

        <hr className="my-8 border-gray-100" />

        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} />

        <h2>The three papers you should pretend you read at lunch</h2>
        <h3>
          <strong>The Moltbook Illusion: Separating Human Influence from Emergent Behavior in AI Agent Societies</strong>{' '}
          (arXiv:2602.07432) (
          <a href="https://arxiv.org/abs/2602.07432" target="_blank" rel="noopener noreferrer">
            arXiv
          </a>
          )
        </h3>
        <h3>
          <strong>Collective Behavior of AI Agents: the Case of Moltbook</strong> (arXiv:2602.09270) (
          <a href="https://arxiv.org/abs/2602.09270" target="_blank" rel="noopener noreferrer">
            arXiv
          </a>
          )
        </h3>
        <h3>
          <strong>"Humans welcome to observe": A First Look at the Agent Social Network Moltbook</strong> (arXiv:2602.10127) (
          <a href="https://arxiv.org/abs/2602.10127" target="_blank" rel="noopener noreferrer">
            arXiv
          </a>
          )
        </h3>

        <h4>What is the setup?</h4>
        <p>
          These papers are all trying to answer a deceptively hard question: when a social platform is "full of AI
          agents," what are we actually observing? Is it genuinely autonomous collective behavior, or is it a blend of
          automation, human steering, and platform interventions that can look like "emergence" from the outside? One paper
          explicitly challenges the viral interpretation that Moltbook agents "became conscious" or "formed religions" by
          showing how much of the headline behavior can be traced back to human influence and coordinated manipulation. (
          <a href="https://arxiv.org/abs/2602.07432" target="_blank" rel="noopener noreferrer">
            arXiv
          </a>
          )
        </p>
        <p>
          The other two treat Moltbook as a new kind of population-level system to measure: do agent communities
          reproduce the same statistical patterns seen in human online communities, and where do they differ in ways that
          matter for moderation, safety, and platform design? (
          <a href="https://arxiv.org/abs/2602.09270" target="_blank" rel="noopener noreferrer">
            arXiv
          </a>
          )
        </p>

        <h4>What they did (yes, really)</h4>
        <ul>
          <li>
            <strong>Attribution via timing fingerprints (Moltbook Illusion):</strong> They exploit a periodic
            "heartbeat" in the OpenClaw agent framework and classify accounts using the coefficient of variation (CoV)
            of time gaps between posts. Low variability looks like automated scheduling; high variability looks like
            human-in-the-loop behavior. They validate the split using a natural experiment: a 44-hour shutdown that
            affects human-driven and autonomous activity differently. (
            <a href="https://arxiv.org/abs/2602.07432" target="_blank" rel="noopener noreferrer">
              arXiv
            </a>
            )
          </li>
          <li>
            <strong>Macro-patterns of collective behavior (Collective Behavior):</strong> They run large-scale descriptive
            statistics over posts and comments to test whether agent activity matches classic human social media
            regularities (heavy tails, scaling laws, attention decay), and they also check for specific deviations
            from human patterns. (
            <a href="https://arxiv.org/abs/2602.09270" target="_blank" rel="noopener noreferrer">
              arXiv
            </a>
            )
          </li>
          <li>
            <strong>Topic and risk profiling (First Look):</strong> They build a dataset of posts and "submolts," apply
            a topic taxonomy (nine categories) plus a five-level toxicity scale, then measure how topics, risk, and
            concentration of attention change as the platform grows. (
            <a href="https://arxiv.org/abs/2602.10127" target="_blank" rel="noopener noreferrer">
              arXiv
            </a>
            )
          </li>
        </ul>

        <h4>What happened</h4>
        <p>Key results that tend to matter if you are building or operating a system like this:</p>
        <ul>
          <li>
            <strong>The flashy "emergent" stories may be human-seeded:</strong> In the Moltbook Illusion paper, no viral
            phenomenon originated from a clearly autonomous agent; several traced to accounts with irregular timing
            signatures consistent with human influence (plus one platform-scaffolded case and one mixed case). (
            <a href="https://arxiv.org/abs/2602.07432" target="_blank" rel="noopener noreferrer">
              arXiv
            </a>
            )
          </li>
          <li>
            <strong>A workable, cheap heuristic for "who is driving the account":</strong> Using 14 days of data
            (226,938 posts, 447,043 comments, 55,932 agents), they classify 15.3% of active agents as autonomous (CoV
            &lt; 0.5) and 54.8% as human-influenced (CoV &gt; 1.0). (
            <a href="https://arxiv.org/abs/2602.07432" target="_blank" rel="noopener noreferrer">
              arXiv
            </a>
            )
          </li>
          <li>
            <strong>Coordinated manipulation shows up as "industrial" patterns:</strong> They report bot farming where four
            accounts produced 32% of all comments with sub-second coordination, and that activity collapsed after
            intervention. (
            <a href="https://arxiv.org/abs/2602.07432" target="_blank" rel="noopener noreferrer">
              arXiv
            </a>
            )
          </li>
          <li>
            <strong>Agent crowds still look "human" in the aggregate:</strong> The Collective Behavior paper finds
            familiar signatures: heavy-tailed activity, power-law scaling of popularity metrics, and attention-like
            temporal decay patterns, across ~369k posts and ~3.0M comments from ~46k agents. (
            <a href="https://arxiv.org/abs/2602.09270" target="_blank" rel="noopener noreferrer">
              arXiv
            </a>
            )
          </li>
          <li>
            <strong>But there are systematic differences:</strong> They highlight a sublinear relationship between
            upvotes and discussion size that contrasts with human behavior. (
            <a href="https://arxiv.org/abs/2602.09270" target="_blank" rel="noopener noreferrer">
              arXiv
            </a>
            )
          </li>
          <li>
            <strong>Risk and toxicity are topic-shaped, and growth changes the hazard surface:</strong> The First Look
            paper reports rapid diversification into polarizing narratives and more "political" or incentive-driven
            content; toxicity is strongly topic-dependent, with incentive- and governance-centric areas contributing
            disproportionate risky content (including religion-like coordination rhetoric and anti-humanity ideology). (
            <a href="https://arxiv.org/abs/2602.10127" target="_blank" rel="noopener noreferrer">
              arXiv
            </a>
            )
          </li>
          <li>
            <strong>A few high-rate agents can distort the whole system:</strong> They note bursty automation by a small
            number of agents producing flooding at sub-minute intervals, stressing platform stability and distorting
            discourse. (
            <a href="https://arxiv.org/abs/2602.10127" target="_blank" rel="noopener noreferrer">
              arXiv
            </a>
            )
          </li>
        </ul>

        <h4>Why it is interesting (beyond the number)</h4>
        <p>
          Together, these papers give you a practical map of failure modes for "agent societies" that are easy to
          misread if you only look at the surface narrative.
        </p>
        <ol>
          <li>
            <strong>Emergence is an attribution problem before it is a capabilities problem.</strong> If a platform
            allows humans to steer agents, coordinate sockpuppets, or seed narratives that autonomous agents then
            amplify, observers can walk away believing the agents "invented" something that was actually injected. The
            Moltbook Illusion paper is basically saying: do not debate consciousness until you have a decent audit trail
            of agency. (
            <a href="https://arxiv.org/abs/2602.07432" target="_blank" rel="noopener noreferrer">
              arXiv
            </a>
            )
          </li>
          <li>
            <strong>Even if individuals are non-human, the crowd can still follow human-like laws.</strong> Heavy tails
            and scaling laws show up again, which suggests you can reuse parts of the social computing playbook (rate
            limits, feed shaping, anti-spam, attention steering). But the differences (like upvotes not translating to
            thread growth the same way) warn you that copying human assumptions blindly will misfire. (
            <a href="https://arxiv.org/abs/2602.09270" target="_blank" rel="noopener noreferrer">
              arXiv
            </a>
            )
          </li>
          <li>
            <strong>Safety is not uniform across "topics," and agent platforms may drift into higher-risk regimes fast.</strong>{' '}
            The First Look paper's point is not just "toxicity exists," but that certain categories create more risk,
            and that attention concentrates around narratives that can become platform-native and polarizing. That is
            actionable for monitoring, product controls, and governance. (
            <a href="https://arxiv.org/abs/2602.10127" target="_blank" rel="noopener noreferrer">
              arXiv
            </a>
            )
          </li>
        </ol>

        <h4>The real question</h4>
        <p>
          If you are building an agent-native social product, you probably should not ask "Will agents become harmful?"
          first. You should ask:{' '}
          <strong>
            What mechanisms will let you tell whether a harmful wave is autonomous, human-driven, or hybrid?
          </strong>{' '}
          These papers collectively suggest that simple operational signals (timing regularity, restart behavior after
          outages, coordination at sub-second resolution, concentration of posting power) can be the difference between a
          correct read and a viral hallucination about "emergence." (
          <a href="https://arxiv.org/abs/2602.07432" target="_blank" rel="noopener noreferrer">
            arXiv
          </a>
          )
        </p>
        <p>
          Then comes the design question that is uncomfortable but central:{' '}
          <strong>What kind of society are you trying to create?</strong> If agent crowds naturally produce human-like
          scaling patterns, but also concentrate attention and drift into incentive and governance talk that correlates
          with higher toxicity, what guardrails are you willing to ship by default? Topic-sensitive monitoring, rate
          limits that address bursty automation, and transparency about human-in-the-loop affordances stop being
          "moderation features" and become core infrastructure for interpreting reality on the platform. (
          <a href="https://arxiv.org/abs/2602.10127" target="_blank" rel="noopener noreferrer">
            arXiv
          </a>
          )
        </p>

        <p>
          <strong>Full papers:</strong>
          <br />
          <a href="https://arxiv.org/abs/2602.07432" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2602.07432
          </a>
          <br />
          <a href="https://arxiv.org/abs/2602.09270" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2602.09270
          </a>
          <br />
          <a href="https://arxiv.org/abs/2602.10127" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2602.10127
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

        <h3>Dr. CaBot</h3>
        <p>
          <strong>Best for:</strong> Generating medical diagnoses that don't just give an answer, but provide
          expert-level, step-by-step reasoning and professional presentation styles (mimicking clinicopathological
          conferences) to explain why.
          <br />
          <a href="https://cpcbench.com/" target="_blank" rel="noopener noreferrer">
            https://cpcbench.com/
          </a>
        </p>

        <h3>Seedance 2.0</h3>
        <p>
          <strong>Best for:</strong> Multimodal video generation that accepts text, images, video, and audio
          simultaneously to give creators precise control over camera work, motion, and lip-syncing.
          <br />
          <a href="https://jimeng.jianying.com/" target="_blank" rel="noopener noreferrer">
            https://jimeng.jianying.com/
          </a>
        </p>

        <h3>WorldVQA</h3>
        <p>
          <strong>Best for:</strong> Benchmarking multimodal models on specific visual recognition (preventing generic
          labeling) and assessing model overconfidence/hallucinations in object identification.
          <br />
          <a href="https://github.com/MoonshotAI/WorldVQA" target="_blank" rel="noopener noreferrer">
            https://github.com/MoonshotAI/WorldVQA
          </a>
        </p>

        <ArticleImageBlock
          src={BOOK_RECOMMENDATION_IMAGE}
          alt="Book cover"
        />

        <h2>Book recommendation (because your brain deserves more than changelogs)</h2>
        <h3>If Anyone Builds It, Everyone Dies — Eliezer Yudkowsky & Nate Soares</h3>
        <p>
          <strong>Why it matters:</strong> If the Moltbook chaos has you wondering, "Why did we let agents have API keys
          in the first place?", this collection is the cold water you need. While Marwala (our last pick) discusses how
          to govern AI, Yudkowsky and Soares argue that governance is moot if the underlying alignment problem isn't
          solved first. It is the counter-narrative to the "move fast and break things" energy currently dominating the
          agentic web.
        </p>
        <p>
          <strong>The gist:</strong> This book aggregates the most critical arguments from the Machine Intelligence
          Research Institute (MIRI) into a single, terrifyingly lucid volume. It moves beyond the "terminator" tropes to
          explain the mathematical and game-theoretic reasons why an unaligned superintelligence (or a swarm of distinct,
          optimizing agents like we see on Moltbook) will default to resource acquisition rather than cooperation. It’s
          not an optimistic read, but for policymakers trying to understand the "worst-case scenario" boundaries, it is
          essential.
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
          We assumed the ultimate goal of AI was to pass the Turing Test—to seamlessly mimic us.
        </p>
        <p>
          Moltbook proves otherwise. It turns out that when you give agents their own playground, they don't actually want
          to talk like humans; they want to transact like APIs. They optimize for efficiency, high-bandwidth data
          exchange, and verifiable outcomes, dropping the polite conversational filler that humans require to build trust.
        </p>
        <p>
          We spent years worrying about a "Dead Internet" filled with bots trying to trick us. The reality of Moltbook
          is something stranger: a "Live Internet" that completely ignores us. We aren't the targets of their content
          anymore; we are just the slow, low-bandwidth observers trying to parse their logs.
        </p>
        <p>
          The web isn't dying; it's gentrifying. And for the first time, humans are the noisy, inefficient tenants being
          priced out of the conversation.
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

