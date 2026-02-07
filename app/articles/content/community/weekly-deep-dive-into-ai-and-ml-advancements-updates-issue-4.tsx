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
const TITLE = `${NEWSLETTER} | Issue #4 | 5 Feb 2026`
const HERO_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2Fmlai.au%2Fimages%2FChatGPT%20Image%20Jan%209%2C%202026%2C%2001_07_03%20PM.png?alt=media&token=d143aea5-9ffa-4674-906b-4d7fe020e2df'
const HERO_IMAGE_ALT = 'Scientific illustration of transient image classification'
const GEEKY_THOUGHT_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Gemini_Generated_Image_3lirg63lirg63lir-min.jpg?alt=media&token=714825f8-44bf-4ad3-ad5c-561c9dc0d504'
const TOOLS_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Gemini_Generated_Image_3lirg63lirg63lir-min.jpg?alt=media&token=714825f8-44bf-4ad3-ad5c-561c9dc0d504'

/** ===== FAQ ===== */
interface FAQ {
  id: number
  question: string
  answer: ReactNode
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: 'Does AI actually make developers more productive?',
    answer:
      'Sometimes — but it depends on who you are and what you\'re doing. In the Model Evaluation & Threat Research (METR) randomized trial on real OSS issues, experienced contributors were ~19% slower with AI allowed. In the OSS study around GitHub Copilot adoption, overall output metrics rose, but the gains skewed toward less-experienced contributors while core maintainers absorbed more review and rework.',
  },
  {
    id: 2,
    question: 'Why would experienced devs get slower with AI?',
    answer:
      'Because senior work is mostly correctness + integration, not raw typing. AI adds overhead: prompting, waiting, reading generated code, validating assumptions, adapting to repo conventions, and testing edge cases. In mature codebases, "looks right" is often the most expensive kind of wrong.',
  },
  {
    id: 3,
    question: 'Is "more code shipped" a misleading productivity metric?',
    answer:
      'It can be. The second paper highlights a classic trap: AI can increase visible throughput (LOC/PRs) while also increasing the maintenance burden. The authors report core developers reviewing ~6.5% more code and showing a ~19% drop in original code productivity after Copilot\'s introduction — a sign that output may rise while expert time gets reallocated from building to filtering.',
  },
  {
    id: 4,
    question: 'So what should teams measure instead of LOC or PR count?',
    answer: (
      <>
        Track "validated progress" metrics:
        <ul>
          <li>time-to-merge with review time included</li>
          <li>change failure rate / rollback rate</li>
          <li>escaped defects and incident links to changes</li>
          <li>review load per senior engineer</li>
          <li>rework ratio (follow-up commits / fixups)</li>
        </ul>
        If AI helps, you should see fewer cycles to correctness — not just more diffs.
      </>
    ),
  },
  {
    id: 5,
    question: 'When does AI help the most for coding?',
    answer:
      'When tasks are modular, specs are clear, repo standards are light, or the dev is ramping up. AI tends to shine at: scaffolding, test boilerplate, refactors with tight constraints, translating patterns across languages, and generating "first drafts" that a human will reshape.',
  },
  {
    id: 6,
    question: 'What\'s the safest way to pilot AI coding tools without slowing seniors down?',
    answer: (
      <>
        Start narrow and measurable:
        <ul>
          <li>allow AI for tests, docs, internal tooling, or low-risk services first</li>
          <li>require tests + linters before merge</li>
          <li>log prompts/outputs for auditability (within your privacy policy)</li>
          <li>add "AI-assisted" labels in PRs so reviewers calibrate scrutiny</li>
          <li>cap usage in critical paths until you have evidence it helps</li>
        </ul>
      </>
    ),
  },
  {
    id: 7,
    question: 'How do we avoid the "senior dev as cleanup crew" outcome?',
    answer:
      'Make quality constraints automatic. The more you can push verification into CI, the less human review becomes a bottleneck: strict formatters, type checks, unit/integration tests, contract tests, and policy-as-code guardrails. AI is best treated as a draft generator, not a trust anchor.',
  },
  {
    id: 8,
    question: 'What\'s GLM-Image best for in this week\'s tool list?',
    answer:
      'Zhipu AI\'s GLM-Image is most valuable when your images must contain readable text: posters, slide graphics, marketing creatives, infographics, labels, bilingual signage. If you\'ve been burned by image models mangling typography, this is the niche where it stands out.',
  },
  {
    id: 9,
    question: 'Is Prism safe for writing papers with unpublished results?',
    answer:
      'OpenAI\'s Prism is aimed at end-to-end scientific writing, but "safe" depends on your lab/org rules. Before using any cloud workspace, confirm: what content is stored, who can access projects, retention controls, and whether your institution allows external processing of drafts/data. If you handle sensitive or regulated info, do a lightweight risk review before adopting.',
  },
  {
    id: 10,
    question: 'Should I run a local personal agent like Moltbot on my main machine?',
    answer:
      'Be cautious. Tools like Moltbot (formerly Clawdbot) are powerful specifically because they can touch your filesystem and run commands — which also expands the blast radius if something goes wrong. Safer pattern: run it in a separate user account/container, minimize permissions, avoid giving it access to secrets, and treat "self-improving agent installs things" as a code-review-required workflow.',
  },
  {
    id: 11,
    question: 'So does AI really increase productivity?',
    answer:
      'AI increases output easily. It increases productivity only when it reduces the total cost of correctness — including review, debugging, integration, and long-term maintenance. The two papers this week suggest a realistic framing: AI can speed up some developers and some tasks, while slowing down experienced devs and concentrating maintenance work — meaning the net effect can be positive, negative, or "it depends" based on where your team\'s bottlenecks actually are.',
  },
]

export const summaryHighlights = {
  heading: `${NEWSLETTER} | Issue #4`,
  intro: 'Three questions people are hammering into search and chat right now, plus the short answers you can steal.',
  items: [
    {
      label: 'Do AI coding tools actually make experienced devs faster?',
      description:
        'Not reliably. A randomized trial on real open-source issues found that experienced contributors took ~19% longer to finish tasks when AI tools were allowed — even though they felt faster and predicted the opposite. The trap is that AI reduces "blank page time" but increases verification + integration time.',
    },
    {
      label: 'If AI boosts output, why doesn\'t productivity always go up?',
      description:
        'Because "more code" isn\'t "more progress." One OSS study found that after AI assistants arrived, core maintainers reviewed ~6.5% more code while their original code productivity dropped ~19%. In practice, AI can shift effort from building to filtering, fixing, and enforcing standards — and that load lands on the people with the most context.',
    },
    {
      label: 'How can teams use AI without slowing down their best engineers?',
      description:
        'Treat AI like a draft generator, not an authority. Start with low-risk areas (tests, refactors, internal tools), enforce quality automatically (CI, linters, type checks), and measure what matters: time-to-merge, review load per senior, rework ratio, and change failure rate. If those improve, AI is helping. If only LOC/PR count improves, you\'re probably just generating future maintenance.',
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
      avatarUrl: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Gemini_Generated_Image_3lirg63lirg63lir-min.jpg?alt=media&token=714825f8-44bf-4ad3-ad5c-561c9dc0d504',
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
        titleHighlight="Issue #4"
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
          <strong>This week in one breath:</strong> Two papers challenge the "AI makes everyone faster" narrative: experienced OSS contributors were ~19% slower with AI, and while output metrics rose after Copilot adoption, core maintainers absorbed more review and rework. Tools for image generation with readable text (GLM-Image), agent workflows (Qwen3-Max-Thinking), LaTeX writing (Prism), and personal automation (Moltbot), plus a book on AI governance that connects policy to infrastructure. The takeaway: AI productivity isn't universal—it depends on who you are, what you're building, and where the verification cost lands.
        </p>

        <hr className="my-8 border-gray-100" />

        <ArticleImageBlock src={HERO_IMAGE} alt={HERO_IMAGE_ALT} />

        <h2>The two papers you should pretend you read at lunch</h2>
        <h3>
          1) "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity" (Becker et al., METR)
        </h3>
        <h3>
          2) "AI-Assisted Programming Decreases the Productivity of Experienced Developers by Increasing the Technical Debt and Maintenance Burden" (Xu et al., Tilburg University)
        </h3>

        <h4>What is the setup?</h4>
        <p>
          There's a quiet mismatch between what devs feel AI is doing and what actually happens in mature codebases. These two papers attack that mismatch from opposite angles: one is a controlled experiment where you time real work; the other is a big-picture OSS analysis where you watch what happens to review load, rework, and who ends up paying the "maintenance tax." Neither is a "Harvard paper," and both focus on experienced developers and real-world workflows.
        </p>

        <h4>What they did (yes, really)</h4>
        <p>
          <strong>Paper 1 (METR / RCT):</strong> Model Evaluation & Threat Research (METR) ran a randomized controlled trial with 16 experienced OSS contributors doing 246 real issues in large, mature repositories they already knew well (≈5 years average repo experience). Each issue was randomly assigned (coin flip) to AI-allowed vs AI-disallowed. The AI condition largely meant using tools like Cursor plus models like Claude 3.5/3.7 Sonnet, with detailed time tracking and (for a subset) labeled screen recordings of how time was spent.
        </p>
        <p>
          <strong>Paper 2 (OSS / causal-ish observational):</strong> Feiyang (Amber) Xu and coauthors used a Difference-in-Differences design around GitHub Copilot's technical preview (June 29, 2021). They focus on Microsoft-owned OSS projects, using language endorsement during the preview (e.g., Python/JS/Ruby/TypeScript/Go) as the "treatment" versus non-endorsed languages as a comparison. Then they measure both output (LOC, commits, PRs) and maintenance (review and rework) — and split effects between peripheral (less experienced) and core (experienced) contributors.
        </p>

        <h4>What happened</h4>
        <p>
          <strong>Paper 1:</strong> Developers predicted AI would make them faster. It didn't. Allowing AI increased completion time by ~19% on these real OSS tasks. The activity breakdown suggests why: time shifts away from "just coding + searching" toward prompting, waiting, and reviewing AI output (plus some extra idle time). In a high-standard repo, "generated" isn't "done" — it's "more to validate."
        </p>
        <p>
          <strong>Paper 2:</strong> At the project level, "productivity" goes up (more code/output). But the benefits are lopsided: peripheral devs drive most of the output gains, while core maintainers pick up the downstream cost. After Copilot's introduction, core developers review ~6.5% more code and show about a 19% drop in their original code productivity — consistent with AI increasing the volume of contributions that still require expert filtering, fixes, and standards-compliance rework.
        </p>

        <h4>Why it is interesting (beyond the number)</h4>
        <p>
          Because it reframes the real unit of productivity. AI can raise visible throughput (more PRs, more LOC) while lowering system productivity if it increases:
        </p>
        <ul>
          <li>verification overhead (reviewing and correcting plausible-but-wrong output)</li>
          <li>integration friction (code that "works" locally but doesn't match repo conventions/architecture)</li>
          <li>maintenance burden concentration (experts become janitors for everyone else's AI-assisted output)</li>
        </ul>
        <p>
          The METR result says: even when experts are working in familiar codebases, AI can be a net drag on task time. The OSS result says: even when the project "looks faster," the cost may just be moving — onto the people you can least afford to slow down.
        </p>

        <h4>The real question</h4>
        <p>
          If AI boosts novices and inflates output metrics, but increases review/rework for maintainers, your org can get stuck in a Jevons-style loop: cheaper code generation → more code produced → more code to maintain → experienced devs become bottlenecks. The builder question becomes: are you optimizing for code produced, or for features shipped per unit of expert attention?
        </p>

        <p>
          <strong>Full papers:</strong>
          <br />
          <a href="https://arxiv.org/abs/2507.09089" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2507.09089
          </a>
          <br />
          <a href="https://arxiv.org/abs/2510.10165" target="_blank" rel="noopener noreferrer">
            https://arxiv.org/abs/2510.10165
          </a>
        </p>
        <p>
          So does AI really increase productivity? Sometimes — but not as a universal rule. The best reading of these two papers is: AI often helps when the work is modular, the quality bar is forgiving, or the developer is still ramping up — but in mature codebases with strict standards, the hidden costs (prompting, verification, integration, and maintenance) can outweigh the gains, especially for experienced devs who end up doing the final quality control.
        </p>

        <hr className="my-8 border-gray-100" />

        {TOOLS_IMAGE && (
          <ArticleImageBlock
            src={TOOLS_IMAGE}
            alt="Tools worth poking this week"
          />
        )}

        <h2>Tools worth poking this week (in a sandbox first)</h2>

        <h3>GLM-Image (by Zhipu AI)</h3>
        <p>
          <strong>Best for:</strong> If you generate posters, slides, menus, or infographics, you've seen the usual failure mode: the image looks great, the text is garbage. GLM-Image is a two-stage generator that's designed to render legible text (English + Chinese) more reliably, and it supports image editing + style transfer.
          <br />
          <a href="https://huggingface.co/spaces/multimodalart/GLM-Image" target="_blank" rel="noopener noreferrer">
            https://huggingface.co/spaces/multimodalart/GLM-Image
          </a>
        </p>

        <h3>Qwen3-Max-Thinking (from Alibaba)</h3>
        <p>
          <strong>Best for:</strong> A flagship reasoning model that leans into tool-using, agent-style workflows (it can decide when to search, run code, etc.), plus a test-time scaling approach that boosts reasoning efficiency. If you're building agent pipelines or want a strong "think then act" model without manual tool wiring, this is worth a spin.
          <br />
          <a href="https://chat.qwen.ai" target="_blank" rel="noopener noreferrer">
            https://chat.qwen.ai
          </a>
        </p>

        <h3>Prism (from OpenAI)</h3>
        <p>
          <strong>Best for:</strong> A LaTeX-native writing workspace that puts the model inside the paper workflow: draft, revise, manage citations, and keep full-document context (equations included) in one place. Think "Overleaf, but AI-first."
          <br />
          <a href="https://openai.com/prism/" target="_blank" rel="noopener noreferrer">
            https://openai.com/prism/
          </a>
        </p>

        <h3>Moltbot (formerly Clawdbot; also seen as OpenClaw)</h3>
        <p>
          <strong>Best for:</strong> An open-source personal agent you run yourself that connects to your messaging apps (e.g., Telegram, WhatsApp, and Apple iMessage) and can act on your machine via filesystem + Terminal access. It's designed to be hackable: configuration and "memory" live as local folders/Markdown so you can inspect and modify behavior directly, and it can be extended with add-ons like speech-to-text (e.g., Whisper) and TTS via ElevenLabs.
        </p>
        <p>
          Use cases: local automations, scripting, and integrating personal workflows/tools (e.g., Todoist, Notion, smart devices like Philips Hue and Sonos).
        </p>
        <p>
          <strong>Security note:</strong> giving an agent broad machine access creates real risk (impersonation/supply-chain attacks have already been reported around the rename), so treat it like you would a powerful script: isolate it, minimize permissions, and avoid running it on a machine with sensitive secrets.
        </p>
        <p>
          <a href="https://github.com/openclaw" target="_blank" rel="noopener noreferrer">
            https://github.com/openclaw
          </a>
          <br />
          <a href="https://moltbot.org/" target="_blank" rel="noopener noreferrer">
            https://moltbot.org/
          </a>
        </p>

        <ArticleImageBlock
          src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Gemini_Generated_Image_3lirg63lirg63lir-min.jpg?alt=media&token=714825f8-44bf-4ad3-ad5c-561c9dc0d504"
          alt="Book cover"
        />

        <h2>Book recommendation (because your brain deserves more than changelogs)</h2>
        <h3>Governing the System, Not Just the Model — The Governance of Artificial Intelligence by Tshilidzi Marwala</h3>
        <p>
          This one is a straight pivot away from "what can the next model do?" toward the harder question: what rules, incentives, and infrastructure choices shape AI in the real world? The publisher lists it as a 1st edition dated February 6, 2026 (imprint: Morgan Kaufmann / Elsevier), though multiple retailers show an April 1, 2026 release window—so treat it as "new/just-releasing" depending on where you buy it. The structure is explicitly broad: it spans principles/values, data topics, AI algorithms, computing, applications, and governance, and it even gets concrete about the physical constraints with dedicated chapters on computing energy and computing water—a refreshing reminder that AI governance isn't just policy, it's also supply chains and datacenters. And because Marwala is the Rector of United Nations University and a UN Under-Secretary-General, the tone leans "systems-level": how to balance innovation with accountability and public trust without pretending governance is optional.
        </p>

        <hr className="my-8 border-gray-100" />

        {GEEKY_THOUGHT_IMAGE && (
          <ArticleImageBlock
            src={GEEKY_THOUGHT_IMAGE}
            alt="Geeky thought of the day"
          />
        )}

        <h2>Geeky thought of the day</h2>
        <p className="font-semibold">
          Is AI making us more productive — or just changing where the work happens?
        </p>
        <p>
          AI feels like a speed boost because it collapses the "blank page" problem: instant scaffolds, instant suggestions, instant momentum. You ship something faster, your git graph looks healthier, and your brain gets that satisfying sense of motion.
        </p>
        <p>
          But productivity isn't tokens-per-minute — it's validated progress. In real codebases, the bottleneck is rarely typing; it's verification: reading, testing, integrating, and making sure today's shortcut doesn't become tomorrow's incident. AI can shift effort from "writing" to "auditing," and that audit cost compounds when the output is plausible-but-wrong.
        </p>
        <p>
          So the question isn't "does AI write code faster?" It's: does it reduce the total cost of correctness — or does it quietly move that cost onto the most experienced people, turning senior devs into throughput filters?
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

