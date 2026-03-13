import type { ReactNode } from 'react'
import { Home } from 'lucide-react'
import { RocketLaunchIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/solid'
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

const TOPIC = "How to Find a Technical Co-Founder: A Strategic Guide for Non-Technical Entrepreneurs"
export const CATEGORY = "featured"
export const SLUG = "how-to-find-a-technical-co-founder-a-strategic-guide-for-non-technical-entrepren"
export const DATE_PUBLISHED = "2026-03-13"
export const DATE_MODIFIED = "2026-03-13"
export const DESCRIPTION = "Learn how to find a technical co-founder by defining the role, proving market demand, networking in the right communities, and testing fit before you commit."
const HERO_IMAGE = ""
const HERO_IMAGE_ALT = "How to Find a Technical Co-Founder: A Strategic Guide for Non-Technical Entrepreneurs"
export const FEATURED_FOCUS = "startups"

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
  { id: 1, question: "Do I really need a technical co-founder?", answer: "Not always. If you mainly need a simple MVP built from a clear specification, a freelancer or agency may be enough. A technical co-founder makes more sense when the product depends on ongoing technical judgment, architecture decisions, hiring, and long-term product direction." },
  { id: 2, question: "What makes a non-technical founder attractive to a technical partner?", answer: "The strongest signals are proof that the problem matters, a clear understanding of the customer, and evidence that you can create momentum on the business side. That can include customer interviews, waitlists, revenue, industry access, or detailed product thinking." },
  { id: 3, question: "Where should I look for a technical co-founder?", answer: "Start with communities where technical people already build and collaborate. Local AI groups, hackathons, startup meetups, university events, and industry conferences can be high-signal places to meet people. Online options like CoFoundersLab, Indie Hackers, and LinkedIn can help widen your search." },
  { id: 4, question: "How should I approach someone I want as a technical co-founder?", answer: "Lead with the problem, the market, and the progress you have already made. Explain why the opportunity matters, why now is the right time, and what kind of partnership you want to build. Avoid vague outreach or treating the person like a contractor with equity." },
  { id: 5, question: "How do I know if a potential co-founder is the right fit?", answer: "Do not decide based on technical skill alone. Test fit through a short project and watch how they communicate, handle trade-offs, follow through, and respond under pressure. Talk early about vision, working style, time commitment, risk tolerance, and equity expectations." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Find a Technical Co-Founder: A Strategic Guide for Non-Technical Entrepreneurs",
  intro: "Learn how to find a technical co-founder by defining the role, proving market demand, networking in the right communities, and testing fit before you commit.",
  items: [
    { label: "Start by defining the role", description: "Decide whether you need a true technical co-founder who will shape product and architecture, or a developer who can build a prototype from a clear brief." },
    { label: "Become easier to back", description: "Strong technical candidates look for evidence that the market is real and that you bring assets beyond the idea, such as customer insight, traction, wireframes, or access to buyers." },
    { label: "Look in communities, not just databases", description: "Meet potential partners in AI and startup communities, hackathons, meetups, conferences, and founder platforms where you can see how they think and work." },
  ],
}

export const articleMeta = {
  title: "How to Find a Technical Co-Founder: A Strategic Guide for Non-Technical Entrepreneurs",
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
    <article className="bg-transparent">
      <ArticleHeroHeader
        breadcrumbs={[
          { label: 'Home', href: '/', icon: Home },
          { label: 'Articles', href: '/articles' },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight={TOPIC}
        headerBgColor="purple"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <ArticleTocPlaceholder />
        </div>

        <div className="prose prose-lg prose-indigo max-w-none text-gray-700 prose-headings:text-gray-900 hover:prose-a:text-[--brand-ink]">
        <p><strong>{TOPIC}</strong> — {"Many startup ideas stall at the same point. A founder sees a real customer problem, can explain why it matters, and may even know who would buy the product. But they cannot build the first version themselves. In AI and software, that gap can feel especially sharp because product quality depends on technical choices made very early."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Learn how to find a technical co-founder by defining the role, proving market demand, networking in the right communities, and testing fit before you commit."
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
          {"Decide whether you need a true technical co-founder who will shape product and architecture, or a developer who can build a prototype from a clear brief."}
        </QuoteBlock>
      <section className="mx-auto max-w-4xl mt-10" id="sec-define-needs">
        <h2 className="text-3xl font-semibold">{"Define What You Actually Need: CTO vs. Lead Developer"}</h2>
        <p className="text-base leading-7">{"Before you start looking for a technical co-founder, get clear on the job. A real technical co-founder is not just the person who writes the first version of your app. They help shape the product, choose the tech stack, make architecture decisions, and set the standard for how the product will be built over time. If you mainly need someone to build a quick prototype from a clear spec, that may be a developer problem, not a co-founder problem."}</p>
        <p className="text-base leading-7">{"This distinction matters because the commitment is very different. That is a much bigger ask than paying someone to complete a defined project. If you offer co-founder status when you really need short-term execution, you can create misaligned expectations from day one."}</p>
        <p className="text-base leading-7">{"If you are still testing whether customers care, hiring a freelance developer or working with a small agency can be a sensible path. This approach is especially useful if the product is straightforward, the technical risk is low, or you already have enough product clarity to manage external builders well. Many founders discover that they do not need a CTO first; they need evidence that the idea is worth building."}</p>
        <p className="text-base leading-7">{"On the other hand, if the product depends on hard technical judgment from the start, such as AI systems, complex data workflows, or a platform that will need careful scaling, then a technical co-founder may be the right fit. In that case, you are looking for a partner who can challenge assumptions, translate business goals into technical plans, and make smart trade-offs under pressure. For founders in the Australian AI community, this is especially important because strong technical people often want to work on meaningful problems with clear traction, not just join as the person who codes someone else's idea. Define the role honestly, and you will have a much better chance of finding the right person."}</p>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="sec-investable-founder">
        <h2 className="text-3xl font-semibold">{"How to Make Yourself Investable as a Non-Technical Founder"}</h2>
        <p className="text-base leading-7">{"Many non-technical founders frame the problem as, \"How do I find a developer who believes in my idea?\" Strong technical talent usually sees it differently. They are choosing whether to spend years of their life on a problem, a market, and a partner."}</p>
        <p className="text-base leading-7">{"A good technical cofounder is often comparing your opportunity with a stable job, freelance income, and other startup ideas. If you bring proof that customers care, a clear view of the problem, and evidence that you can execute from the business side, the conversation changes. You stop looking like someone who needs saving and start looking like someone who can build a real company with the right partner."}</p>
        <p className="text-base leading-7">{"This shift matters because the best cofounder relationships are built on complementary value. You do need to reduce risk."}</p>
        <h3>{"Prove the market is real"}</h3>
        <p className="text-base leading-7">{"Before you ask someone to join full-time, show that the problem exists and that people want a solution badly enough to act."}</p>
        <p className="text-base leading-7">{"First, it lowers the risk that your startup is built on assumptions. Second, it shows that you can create momentum without a technical cofounder already in place. As seen in founder stories about building without an immediate technical partner, traction often makes later recruiting much easier because it turns a vague idea into a concrete opportunity."}</p>
        <h3>{"Bring assets only you can bring"}</h3>
        <p className="text-base leading-7">{"Your strongest advantage is often not the idea itself but the assets around it. Domain expertise is one of the biggest. If you deeply understand a workflow, regulation, customer pain point, or buying process that outsiders miss, that matters. These are hard to copy and can be more valuable than early code."}</p>
        <p className="text-base leading-7">{"You can also make yourself more investable by being unusually prepared. Create clear wireframes. Write down the user journey. A technical cofounder does not expect you to do their job, but they will notice when you have done yours."}</p>
      </section>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the how to find a technical cofounder checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Define What You Actually Need: CTO vs. Lead Developer",
            "How to Make Yourself Investable as a Non-Technical Founder",
            "Where to Look for a Technical Co-Founder",
            "How to Pitch and Vet Potential Technical Partners",
            "Take Action: Start Building Your Network Today",
          ]}
          accent="indigo"
        />
      <section className="mx-auto max-w-4xl mt-10" id="sec-where-to-look">
        <h2 className="text-3xl font-semibold">{"Where to Look for a Technical Co-Founder"}</h2>
        <p className="text-base leading-7">{"The best place to find a technical co-founder is usually not a cold database. It is a community where you can see how people think, build, and work with others over time. That is why local AI and tech groups matter so much."}</p>
        <p className="text-base leading-7">{"You should also spend time in places where technical people are already solving real problems. Hackathons, startup weekends, local meetups, university demo nights, and industry conferences are strong options. You can learn who ships quickly, who explains trade-offs clearly, and who stays calm when things break. That is valuable because a co-founder relationship depends on working style as much as technical ability."}</p>
        <p className="text-base leading-7">{"Sites like CoFoundersLab, Indie Hackers, and LinkedIn can help you find people outside your immediate network and start targeted conversations. A better approach is to share what problem you are solving, what progress you have already made, why the market matters, and what kind of partnership you want to build. Serious technical candidates are more likely to respond when they see commitment, clarity, and evidence that you can contribute beyond the idea."}</p>
        <h3>{"Offline communities and events"}</h3>
        <p className="text-base leading-7">{"Offline spaces are often the highest-signal places to meet a potential co-founder. If you meet someone promising, suggest a small project, a problem interview, or a one-day build sprint before talking about equity."}</p>
        <h3>{"Online networks and founder platforms"}</h3>
        <p className="text-base leading-7">{"Online channels are useful when you need more reach or a specific skill set. CoFoundersLab is designed for founder matching, Indie Hackers is strong for candid founder conversations, and LinkedIn can help you identify engineers with relevant experience or warm mutual connections. The key is to avoid vague outreach."}</p>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="sec-pitch-and-vet">
        <h2 className="text-3xl font-semibold">{"How to Pitch and Vet Potential Technical Partners"}</h2>
        <p className="text-base leading-7">{"When you meet a promising technical candidate, do not jump straight to a co-founder offer. Start with a small, time-boxed project that lasts a few weeks and has a clear goal, such as a landing page, prototype, or lightweight proof of concept. This gives both of you a low-risk way to test how you make decisions, handle ambiguity, and respond when something breaks."}</p>
        <p className="text-base leading-7">{"Your pitch also needs to be stronger than just the idea itself. Good technical people hear ideas all the time. What gets attention is a de-risked opportunity: evidence of customer demand, interviews, waitlist signups, industry access, early revenue, or a clear path to distribution. Show why this problem matters, why now is the right time, and what you are already doing to move the business forward without them."}</p>
        <h3>{"How to pitch the opportunity"}</h3>
        <p className="text-base leading-7">{"If you have spoken to users, tested pricing, built a no-code version, or mapped the market, say so. This shows you are not looking for someone to build blindly from a napkin sketch."}</p>
        <p className="text-base leading-7">{"It also helps to explain why you need a true partner instead of a freelancer or agency. A co-founder wants to know they will shape the product, not just take tickets. Be clear about the mission, the level of commitment you expect, and what success could look like over the next 12 to 24 months. Serious builders are usually more interested in a credible journey than hype."}</p>
        <h3>{"How to vet fit before you commit"}</h3>
        <p className="text-base leading-7">{"Do they follow through? Can they explain technical trade-offs in a way that helps the business move faster? A great engineer who avoids hard conversations can still be a poor co-founder match."}</p>
        <p className="text-base leading-7">{"You should also talk early about vision, working style, risk tolerance, time commitment, and equity expectations. It can feel awkward, but these conversations are much easier before the company is formed than after resentment builds."}</p>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="sec-conclusion">
        <h2 className="text-3xl font-semibold">{"Take Action: Start Building Your Network Today"}</h2>
        <p className="text-base leading-7">{"Finding a technical co-founder is rarely a quick search. It usually takes time, repeated conversations, and a clear idea of what you are trying to build. The strongest next step is not to pitch harder. It is to make your startup easier to believe in. Good technical people are more likely to join when they can see focus, traction, and a founder who understands the market."}</p>
        <p className="text-base leading-7">{"It is a place to connect, learn, and collaborate with people who care about AI and technology. If you want to meet potential technical co-founders, start showing up consistently, contribute to the community, and keep refining your idea as you go."}</p>
        <p className="text-base leading-7">{"It usually takes time, repeated conversations, and a clear idea of what you are trying to build. The strongest next step is not to pitch harder. It is to make your startup easier to believe in. Good technical people are more likely to join when they can see focus, traction, and a founder who understands the market."}</p>
      </section>

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"Meet potential partners in AI and startup communities, hackathons, meetups, conferences, and founder platforms where you can see how they think and work."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://cofounderslab.com/", title: "The Startup CommunityStart. Grow. Fund.", publisher: "cofounderslab.com", description: "Authoritative reference supporting The Startup CommunityStart. Grow. Fund..", category: "guide"},
          {id: 2, href: "https://foundingjourney.com/how-to-find-a-technical-cofounder", title: "How to Find a Technical Co-Founder | Founding Journey", publisher: "foundingjourney.com", description: "Authoritative reference supporting How to Find a Technical Co-Founder | Founding Journey.", category: "guide"},
          {id: 3, href: "https://www.linkedin.com/posts/josephpcaprara_how-do-i-find-a-technical-cofounder-for-my-activity-7371594520813002752-OePp", title: "Finding a technical cofounder: 2 paths and how to meet them | Joe Caprara posted on the topic | LinkedIn", publisher: "linkedin.com", description: "Authoritative reference supporting Finding a technical cofounder: 2 paths and how to meet them | Joe Caprara posted on the topic | LinkedIn.", category: "guide"},
          {id: 4, href: "https://www.masslight.com/posts/checklist-finding-technical-cofounder", title: "Checklist for Finding a Technical Co-Founder", publisher: "masslight.com", description: "Authoritative reference supporting Checklist for Finding a Technical Co-Founder.", category: "guide"},
          {id: 5, href: "https://www.groovehq.com/blog/technical-co-founder", title: "What I Did When I Couldn\u2019t Find a Technical Co-Founder", publisher: "groovehq.com", description: "Authoritative reference supporting What I Did When I Couldn\u2019t Find a Technical Co-Founder.", category: "guide"},
          {id: 6, href: "https://www.linkedin.com/posts/troymunson_heres-how-you-find-a-technical-co-founder-activity-7248342422693306368-BIee", title: "Here's how you find a technical co-founder for your idea: \n\n\nFriends & Family \n\u2192 This one is obvious. Shoot anyone/everyone you can a text/call. \n\nCoworkers \n\u2192 Reach out to the engineers at your\u2026 | Troy Munson", publisher: "linkedin.com", description: "Authoritative reference supporting Here's how you find a technical co-founder for your idea: \n\n\nFriends & Family \n\u2192 This one is obvious. Shoot anyone/everyone you can a text/call. \n\nCoworkers \n\u2192 Reach out to the engineers at your\u2026 | Troy Munson.", category: "guide"},
          {id: 7, href: "https://www.indiehackers.com/post/how-do-you-find-a-technical-co-founder-93b39e501b", title: "How do you find a 'Technical Co-Founder'? - Indie Hackers", publisher: "indiehackers.com", description: "Authoritative reference supporting How do you find a 'Technical Co-Founder'? - Indie Hackers.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Meet technical builders in the MLAI community"
            body="If you are serious about finding a technical co-founder, start by showing up where strong AI and tech people learn, build, and collaborate. Join the MLAI community to expand your network and build real relationships."
            buttonText="Join the MLAI community"
            buttonHref="/australian-ai-ecosystem"
          />
        </div>
        </div>

        <AuthorBio author={authorDetails} />

        <div className="mt-12">
          <ArticleFAQ items={faqItems} />
        </div>

        <ArticleFooterNav backHref="/articles" topHref="#" />
      </div>
    </article>
  )
}
