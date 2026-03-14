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

const TOPIC = "How to Win a Hackathon: A Strategic Guide to Ideation, Execution, and Pitching"
export const CATEGORY = "featured"
export const SLUG = "how-to-win-a-hackathon-a-strategic-guide-to-ideation-execution-and-pitching"
export const DATE_PUBLISHED = "2026-03-14"
export const DATE_MODIFIED = "2026-03-14"
export const DESCRIPTION = "Discover how to win a hackathon with this comprehensive guide. Learn proven strategies for team building, rapid prototyping, and delivering a winning pitch."
const HERO_IMAGE = ""
const HERO_IMAGE_ALT = "How to Win a Hackathon: A Strategic Guide to Ideation, Execution, and Pitching"
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
  { id: 1, question: "What actually helps you win a hackathon?", answer: "Usually, it is not the most complex codebase. Teams tend to do better when they solve a clear problem, build a focused MVP, and present the idea in a way judges can understand quickly." },
  { id: 2, question: "How do you choose a good hackathon idea?", answer: "Start with the judging criteria, event brief, and sponsor tracks. Then pick a problem that is narrow, feasible in the time available, and simple enough to explain in one sentence." },
  { id: 3, question: "What is the ideal hackathon team setup?", answer: "A small team of three to five often works well. Common roles include a pitch or business lead, a front-end or UX lead, and a back-end or integrations lead, with everyone aligned on the same story and priorities." },
  { id: 4, question: "Should you build everything from scratch in a hackathon?", answer: "Not usually. The article stresses speed and product judgment over technical purity. It is often smarter to hardcode non-core parts, use existing tools, and spend most of your time on the feature that makes the demo stand out." },
  { id: 5, question: "How should you structure a hackathon pitch?", answer: "A practical flow is: the problem, the solution, the market potential, and the tech stack. Keep the message simple, assign speaking roles ahead of time, and use a stable demo with a backup video if needed." },
  { id: 6, question: "Is a hackathon project useful even if you do not win?", answer: "Yes. A strong prototype can become the starting point for further validation, product design, and a roadmap. The article frames the hackathon as a launchpad rather than an endpoint." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Win a Hackathon: A Strategic Guide to Ideation, Execution, and Pitching",
  intro: "Discover how to win a hackathon with this comprehensive guide. Learn proven strategies for team building, rapid prototyping, and delivering a winning pitch.",
  items: [
    { label: "Think like a startup", description: "Winning teams treat a hackathon like a fast product launch, not just a coding sprint. They focus on a real user problem, a usable prototype, and a clear reason the idea matters." },
    { label: "Choose a narrow problem", description: "The best ideas are specific, easy to explain, and aligned with the event brief, sponsor tracks, and judging criteria. If the value is hard to state in one sentence, the scope is probably too wide." },
    { label: "Build a balanced team", description: "A strong team usually combines product thinking, design, engineering, and pitching. Clear roles and simple working rules help the team move fast and avoid last-minute confusion." },
  ],
}

export const articleMeta = {
  title: "How to Win a Hackathon: A Strategic Guide to Ideation, Execution, and Pitching",
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

export default function ArticleContent() {
  const authorDetails = {
    name: AUTHOR,
    role: AUTHOR_ROLE,
    bio: AUTHOR_BIO,
    avatarUrl: AUTHOR_AVATAR,
  }

  return (
    <>
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
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
        <p><strong>{TOPIC}</strong> — {"A hackathon can look like a pure coding contest, but winning teams usually treat it like a compressed startup launch."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Discover how to win a hackathon with this comprehensive guide. Learn proven strategies for team building, rapid prototyping, and delivering a winning pitch."
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
          {"Winning teams treat a hackathon like a fast product launch, not just a coding sprint. They focus on a real user problem, a usable prototype, and a clear reason the idea matters."}
        </QuoteBlock>
          <h2>{"Strategy First: Picking the Right Problem to Solve"}</h2>
          <p>{"Most hackathons are not won by the most complicated build. They are won by teams that solve the right problem in a way judges can understand fast. Before your team starts brainstorming features, read the event brief, sponsor tracks, and judging criteria line by line. Some hackathons reward technical difficulty. Others care more about business value, demo quality, or alignment with a sponsor challenge."}</p>
          <p>{"A strong hackathon idea is usually narrow, specific, and easy to explain. Specific ideas are easier to prototype, easier to demo, and easier for judges to remember."}</p>
          <p>{"Try a format like: \"We help [user] solve [problem] by using [approach] so they can [result].\" If that sentence feels crowded or vague, simplify the scope."}</p>
          <p>{"It also helps to choose a problem that gives you a believable demo path. If the answer is no, the idea may be too broad for the time available. The best hackathon concepts sit in the overlap between judging criteria, technical feasibility, and a story that lands quickly."}</p>
          <p>{"They are won by teams that solve the right problem in a way judges can understand fast. Before your team starts brainstorming features, read the event brief, sponsor tracks, and judging criteria line by line. Some hackathons reward technical difficulty. Others care more about business value, demo quality, or alignment with a sponsor challenge."}</p>
          <h2>{"Building the Ideal Hackathon Team"}</h2>
          <p>{"A strong hackathon team is not just a group of good coders. Winning teams usually cover product thinking, design, engineering, and storytelling. If everyone only works on back-end logic, the demo can feel rough and the pitch can fall flat. Judges often score the whole package: problem clarity, user experience, technical execution, and business value."}</p>
          <p>{"In most hackathons, a small team of three to five works well. It is large enough to split work and small enough to stay fast. A simple, polished project with a clear story usually beats a messy build packed with half-finished features."}</p>
          <p>{"Winning teams usually cover product thinking, design, engineering, and storytelling. If everyone only works on back-end logic, the demo can feel rough and the pitch can fall flat. Judges often score the whole package: problem clarity, user experience, technical execution, and business value. A strong hackathon team is not just a group of good coders. It is large enough to split work and small enough to stay fast."}</p>
          <h3>{"Pick roles that match the judging criteria"}</h3>
          <p>{"A practical setup is a pitch or business lead, a front-end or UX designer, and a back-end or integrations engineer. The pitch lead frames the problem, shapes the demo story, and keeps the team tied to what judges care about."}</p>
          <p>{"In AI-focused hackathons, this role is especially useful because teams often need help connecting a model to a real workflow and turning raw output into something a user can trust."}</p>
          <h3>{"Set team rules before the time pressure hits"}</h3>
          <p>{"These small choices prevent last-minute confusion and painful merge conflicts late in the event."}</p>
          <p>{"It also helps to set short check-in points during the hackathon."}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the how to win a hackathon checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Strategy First: Picking the Right Problem to Solve",
            "Building the Ideal Hackathon Team",
            "Execution and Prototyping: The 80/20 Rule",
            "Nailing the Pitch and Demo",
            "From Prototype to Product",
          ]}
          accent="indigo"
        />
          <h2>{"Execution and Prototyping: The 80/20 Rule"}</h2>
          <p>{"Hackathons reward visible progress, not perfect architecture. The fastest teams pick one feature that makes judges lean forward, then put most of their time into making that feature feel real. That is the 80/20 rule in practice: spend roughly 80% of your effort on the part of the product that creates the strongest reaction, and keep everything else just good enough to support the story. A simple but convincing demo usually beats a broad but half-finished product."}</p>
          <p>{"This means you should fake the boring parts without guilt. Hardcode a login. Good hackathon teams are not cheating the process; they are showing good product judgment under time pressure. Judges usually know what was built in a weekend."}</p>
          <p>{"The goal is not technical purity. It is choosing where custom work actually matters."}</p>
          <p>{"The fastest teams pick one feature that makes judges lean forward, then put most of their time into making that feature feel real. That is the 80/20 rule in practice: spend roughly 80% of your effort on the part of the product that creates the strongest reaction, and keep everything else just good enough to support the story. A simple but convincing demo usually beats a broad but half-finished product. Hackathons reward visible progress, not perfect architecture. Hardcode a login."}</p>
          <h2>{"Nailing the Pitch and Demo"}</h2>
          <p>{"A strong hackathon pitch does not try to prove that your team wrote the most code. If your story is easy to follow, your prototype feels more valuable. Start by framing the problem in one or two simple sentences. Keep the language concrete."}</p>
          <p>{"A practical pitch structure is: The Problem, The Solution, The Market Potential, and The Tech Stack. That order works because it matches how judges think. First, they need to care. Second, they need to see it works. Use a stable local build if possible, and keep a short backup video ready that shows the core workflow from start to finish. A clean, reliable demo beats an ambitious but unstable one every time."}</p>
          <p>{"Your speaking roles should also be planned, not improvised. Another teammate can drive the demo and explain what is happening on screen. The whole presentation should sound like one team telling one story, not three people reading separate notes."}</p>
          <p>{"Remind the judges what problem you solved, why your approach stands out, and what makes the project viable after the hackathon. Then finish confidently. In a hackathon, the best teams do not just build something interesting. They make it easy for judges to remember why it should win."}</p>
          <p>{"If your story is easy to follow, your prototype feels more valuable. Start by framing the problem in one or two simple sentences. Keep the language concrete."}</p>
          <h2>{"From Prototype to Product"}</h2>
          <p>{"Strong teams usually pick a real problem, build a focused MVP, and explain the value in simple terms. That means choosing a use case judges can understand fast, cutting anything that does not support the core demo, and showing clear business logic behind the product. A polished story matters just as much as the prototype itself. If your demo makes the problem obvious, proves the solution works, and shows why people would use or pay for it, you give yourself a much better chance of standing out."}</p>
          <p>{"Even if you do not take first place, a good hackathon build can become something bigger. The next step is to test demand, tighten the user experience, and turn the demo into a reliable product roadmap. Treat your hackathon as a launchpad, not a finish line. If you want help turning an early concept into a market-ready product, working with an experienced AI product studio like MLAI can help you move from weekend prototype to real-world launch with more speed and less guesswork."}</p>

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"A strong team usually combines product thinking, design, engineering, and pitching. Clear roles and simple working rules help the team move fast and avoid last-minute confusion."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://www.linkedin.com/posts/aryankyatham_how-to-win-hackathons-if-you-are-just-getting-activity-7294218472035618816-X0Pd", title: "How to win hackathons if you are just getting started. \ud83e\udd2f\ud83e\udd14\n\nI won 8+ hackathons & exactly a year ago, i won my first hackathon (remember? the iconic tagline 3 days, 3 hackathons, 3 wins).\ud83d\udd25 \n\nWhat\u2026 | ARYAN KYATHAM | 139 comments", publisher: "linkedin.com", description: "Authoritative reference supporting How to win hackathons if you are just getting started. \ud83e\udd2f\ud83e\udd14\n\nI won 8+ hackathons & exactly a year ago, i won my first hackathon (remember? the iconic tagline 3 days, 3 hackathons, 3 wins).\ud83d\udd25 \n\nWhat\u2026 | ARYAN KYATHAM | 139 comments.", category: "guide"},
          {id: 2, href: "https://www.linkedin.com/posts/breardon2011_programming-hackathons-ai-activity-7356021043288788992-DnL8", title: "How to win hackathons: a checklist of what works and what doesn't | Brian Reardon posted on the topic | LinkedIn", publisher: "linkedin.com", description: "Authoritative reference supporting How to win hackathons: a checklist of what works and what doesn't | Brian Reardon posted on the topic | LinkedIn.", category: "guide"},
          {id: 3, href: "https://www.claromentis.com/blog/how-to-run-a-successful-hackathon-in-a-small-business", title: "How to Run a Successful Small Business Hackathon", publisher: "claromentis.com", description: "Authoritative reference supporting How to Run a Successful Small Business Hackathon.", category: "guide"},
          {id: 4, href: "https://ainna.ai/resources/faq/winning-hackathon-guide", title: "How to Win a Hackathon: The Ultimate Survival Guide for 2025 | Ainna | Ainna FAQ", publisher: "ainna.ai", description: "Authoritative reference supporting How to Win a Hackathon: The Ultimate Survival Guide for 2025 | Ainna | Ainna FAQ.", category: "guide"},
          {id: 5, href: "https://www.linkedin.com/pulse/how-win-hackathon-my-journey-trial-error-pidchayanin-chutipattana-aauof", title: "How to Win a Hackathon: My Journey of Trial and Error", publisher: "linkedin.com", description: "Authoritative reference supporting How to Win a Hackathon: My Journey of Trial and Error.", category: "guide"},
          {id: 6, href: "https://www.nicksingh.com/posts/win-hackathons-a-how-to-guide", title: "Win Hackathons In 2022: Step-By-Step Guide | NickSingh.com", publisher: "nicksingh.com", description: "Authoritative reference supporting Win Hackathons In 2022: Step-By-Step Guide | NickSingh.com.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Turn your hackathon prototype into a real product"
            body="A good weekend build can be the start of something bigger. If you want help refining the concept, improving the user experience, and planning the next product steps, MLAI can help move your prototype toward launch."
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
