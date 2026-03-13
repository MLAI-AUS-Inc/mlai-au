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

const TOPIC = "How to Find a Technical Cofounder for Your AI Startup"
export const CATEGORY = "featured"
export const SLUG = "how-to-find-a-technical-cofounder-for-your-ai-startup"
export const DATE_PUBLISHED = "2026-03-13"
export const DATE_MODIFIED = "2026-03-13"
export const DESCRIPTION = "Struggling to turn your vision into an MVP? Learn step-by-step how to find a technical cofounder, evaluate their skills, and successfully pitch your startup idea."
const HERO_IMAGE = ""
const HERO_IMAGE_ALT = "How to Find a Technical Cofounder for Your AI Startup"
export const FEATURED_FOCUS = "product"

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
  { id: 1, question: "What is the best way to find a technical cofounder?", answer: "Start with people who already know your work, such as former coworkers, classmates, alumni contacts, and trusted friends. Then expand into founder matching platforms and startup communities where engineers are already open to early-stage partnerships." },
  { id: 2, question: "Do I need to validate my idea before I look for a technical cofounder?", answer: "Yes. You do not need perfect proof, but you should be able to show customer conversations, a clear problem, and some sign of demand. Strong technical candidates usually want more than a raw idea." },
  { id: 3, question: "How do I pitch my startup to a technical cofounder?", answer: "Frame it as a partnership discussion, not a request for free development work. Explain the customer pain, market opportunity, what you have learned so far, and what you will own on the commercial side." },
  { id: 4, question: "Where can I meet technical cofounders for an AI startup in Australia?", answer: "Look in local AI and startup communities, including meetups, hackathons, startup weekends, university events, coworking spaces, and MLAI gatherings. These settings make it easier to build trust over time." },
  { id: 5, question: "Should I discuss equity right away?", answer: "You should be open about expectations early, but it is often smarter to test the working relationship first. A short trial project or collaboration can help both sides judge fit before getting deep into long-term equity details." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Find a Technical Cofounder for Your AI Startup",
  intro: "Struggling to turn your vision into an MVP? Learn step-by-step how to find a technical cofounder, evaluate their skills, and successfully pitch your startup idea.",
  items: [
    { label: "Prepare before you search", description: "Clarify the customer problem, gather early validation, and define the product you want to build so technical candidates can see real demand." },
    { label: "Show what you bring", description: "A strong pitch includes your domain knowledge, customer access, sales ability, market insight, or other assets that balance the partnership." },
    { label: "Start with warm networks", description: "Former coworkers, alumni groups, friends, and past collaborators often lead to better founder introductions because trust already exists." },
  ],
}

export const articleMeta = {
  title: "How to Find a Technical Cofounder for Your AI Startup",
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
        <p><strong>{TOPIC}</strong> — {"A lot of startup ideas stall at the same point: the founder understands the customer problem, the market, and the business model, but cannot build the product."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Struggling to turn your vision into an MVP? Learn step-by-step how to find a technical cofounder, evaluate their skills, and successfully pitch your startup idea."
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
          {"Clarify the customer problem, gather early validation, and define the product you want to build so technical candidates can see real demand."}
        </QuoteBlock>
      <section className="mx-auto max-w-4xl mt-10" id="sec-02-prep">
        <h2 className="text-3xl font-semibold">{"Define Your Needs and Validate Your Idea First"}</h2>
        <p className="text-base leading-7">{"Before you try to find a technical cofounder, get clear on the problem you want to solve and who will care enough to use or pay for it. Most strong engineers are not looking to join a vague idea stage brainstorm. They want evidence that you have done the hard non-technical work already. Validation does not need to be perfect, but it should show that you are building from customer demand rather than personal excitement alone."}</p>
        <p className="text-base leading-7">{"This preparation matters because a cofounder is taking a major career and equity risk. If you approach someone with only a broad concept, they may assume they will have to define the product, build it, and carry the business alone. That is not an attractive partnership. A stronger pitch is: here is the customer problem, here is what I learned from ten or twenty conversations, here is the smallest product users said they need, and here is the traction I have already created. Resources such as technical cofounder checklists often stress the same point: founders should show clarity, commitment, and some real-world signal before they expect a top engineer to say yes."}</p>
        <p className="text-base leading-7">{"You also need to define the technical role with more precision than 'I need someone technical.' Think about the actual product you want to ship in the next six to twelve months. Is it a web app, mobile app, AI workflow tool, data platform, marketplace, or internal automation product? Each path points to different skills."}</p>
        <p className="text-base leading-7">{"A good cofounder relationship is balanced, even when each person contributes in different ways. Make a simple founder value checklist: domain expertise, access to customers, sales ability, industry network, fundraising support, product thinking, operations, marketing, or initial capital. If you can say, 'I already have customer access in healthcare,' or 'I can sell into Australian SMEs because I know this market well,' that is far more compelling than saying, 'I have the idea.' The goal is to show that the business has two sides: technical execution and commercial momentum. When you do this work first, your search becomes easier because the right technical cofounder can see both the opportunity and your seriousness."}</p>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="sec-03-where-to-look">
        <h2 className="text-3xl font-semibold">{"Where to Find Technical Co-founders"}</h2>
        <p className="text-base leading-7">{"Former coworkers, university classmates, alumni groups, trusted friends, and people you have already built things with can shorten the search. These contacts already know your work style, your reliability, and whether you follow through. That matters because a co-founder search is not only about skill."}</p>
        <p className="text-base leading-7">{"Do not post a vague note saying you need a developer. Instead, explain the problem you are solving, who it is for, what progress you have made, and what kind of technical partner you want. Ask for introductions to people who are actively interested in startups, not just people who can code."}</p>
        <p className="text-base leading-7">{"After you work through your immediate network, widen the search in places where technical builders already raise their hand. Founder matching platforms and startup communities can help you meet engineers who are open to joining an early-stage idea."}</p>
        <h3>{"Use warm networks first"}</h3>
        <p className="text-base leading-7">{"Make a simple list of people from past jobs, side projects, study groups, meetups, and founder circles. Say what you are building, why now is the right time, and what stage you are at. If they are not a fit, ask who they would trust for a serious startup conversation. This approach tends to produce higher-quality introductions than broad public posts."}</p>
        <p className="text-base leading-7">{"Someone you met at a hackathon two years ago or an engineer from another team at a previous company might now be looking for a new challenge. In Australia, alumni networks, coworking communities, and local tech Slack or Discord groups can also act as warm channels when someone can vouch for you."}</p>
        <h3>{"Go where technical builders gather"}</h3>
        <p className="text-base leading-7">{"Specialised platforms such as CoFoundersLab and YC's co-founder matching ecosystem can help you meet people who are actively exploring startup partnerships. People there are not just browsing jobs. Many are actively considering founder-level risk, equity, and early-stage ambiguity."}</p>
        <p className="text-base leading-7">{"Offline communities remain one of the best places to find strong technical co-founders. Attend AI meetups, hackathons, startup weekends, university demo days, and community events where builders naturally spend time. For an Australian founder, MLAI events can be especially useful because they bring together people who care about AI, learning, and collaboration. Instead of pitching immediately, join discussions, contribute something useful, and build a real presence. People are more likely to consider a co-founder conversation when they have seen how you think and how you show up in a community."}</p>
      </section>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the find technical cofounder checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Define Your Needs and Validate Your Idea First",
            "Where to Find Technical Co-founders",
            "How to Pitch Your Idea and Assess Fit",
            "Start Building Your Network Today",
          ]}
          accent="indigo"
        />
      <section className="mx-auto max-w-4xl mt-10" id="sec-04-pitching">
        <h2 className="text-3xl font-semibold">{"How to Pitch Your Idea and Assess Fit"}</h2>
        <p className="text-base leading-7">{"When you pitch a technical cofounder, do not frame the conversation like you are hiring someone to build your idea for free. Strong technical candidates usually have their own ideas, careers, and options. They are deciding whether you are worth building with, not just whether your product sounds interesting. Treat the discussion like a partnership conversation from the start."}</p>
        <p className="text-base leading-7">{"It is your evidence that the business can win. Talk about the market, the customer pain, your early validation, and your go-to-market plan. A technical cofounder wants to know that you bring more than enthusiasm. They want to see that you can create momentum on the non-technical side while they help shape the product and technical direction as an equal partner."}</p>
        <p className="text-base leading-7">{"Strong technical candidates usually have their own ideas, careers, and options. They are deciding whether you are worth building with, not just whether your product sounds interesting."}</p>
        <h3>{"What to cover in the first few conversations"}</h3>
        <p className="text-base leading-7">{"Good early conversations should move past the idea quickly. Be honest about risks, timeline, funding expectations, and whether this is a side project or a venture-scale company."}</p>
        <h3>{"Test the working relationship before discussing equity in depth"}</h3>
        <p className="text-base leading-7">{"The point is not to get free labour. The point is to see how you both communicate, make decisions, handle feedback, and respond when things get messy. A short trial can reveal whether you share the same pace, standards, and values before you lock in a long-term cofounder relationship."}</p>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="sec-05-conclusion">
        <h2 className="text-3xl font-semibold">{"Start Building Your Network Today"}</h2>
        <p className="text-base leading-7">{"Finding a technical cofounder is a lot like dating. A strong match comes from shared values, clear expectations, and honest communication, not from rushing to fill a gap on your startup org chart."}</p>
        <p className="text-base leading-7">{"The most useful next step is simple: stop waiting for the perfect introduction and start showing up. Attend local meetups, founder events, hack nights, and AI community gatherings. Join online matching platforms, but also invest in real relationships where people can see how you think and work. If you are in Australia, communities like MLAI can be a practical place to meet technical peers, learn together, and build trust over time."}</p>
        <p className="text-base leading-7">{"A strong match comes from shared values, clear expectations, and honest communication, not from rushing to fill a gap on your startup org chart. Finding a technical cofounder is a lot like dating. Attend local meetups, founder events, hack nights, and AI community gatherings. Join online matching platforms, but also invest in real relationships where people can see how you think and work."}</p>
      </section>

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"Former coworkers, alumni groups, friends, and past collaborators often lead to better founder introductions because trust already exists."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://www.antler.co/blog/how-to-find-a-co-founder-in-australia", title: "How To Find A Co-Founder In Australia | Antler", publisher: "antler.co", description: "Authoritative reference supporting How To Find A Co-Founder In Australia | Antler.", category: "guide"},
          {id: 2, href: "https://www.linkedin.com/posts/josephpcaprara_how-do-i-find-a-technical-cofounder-for-my-activity-7371594520813002752-OePp", title: "Finding a technical cofounder: 2 paths and how to meet them | Joe Caprara posted on the topic | LinkedIn", publisher: "linkedin.com", description: "Authoritative reference supporting Finding a technical cofounder: 2 paths and how to meet them | Joe Caprara posted on the topic | LinkedIn.", category: "guide"},
          {id: 3, href: "https://www.ycombinator.com/cofounder-matching", title: "Y Combinator Co-Founder Matching Platform - find a co-founder through YC | Y Combinator", publisher: "ycombinator.com", description: "Authoritative reference supporting Y Combinator Co-Founder Matching Platform - find a co-founder through YC | Y Combinator.", category: "guide"},
          {id: 4, href: "https://www.linkedin.com/posts/troymunson_heres-how-you-find-a-technical-co-founder-activity-7248342422693306368-BIee", title: "Here's how you find a technical co-founder for your idea: \n\n\nFriends & Family \n\u2192 This one is obvious. Shoot anyone/everyone you can a text/call. \n\nCoworkers \n\u2192 Reach out to the engineers at your\u2026 | Troy Munson", publisher: "linkedin.com", description: "Authoritative reference supporting Here's how you find a technical co-founder for your idea: \n\n\nFriends & Family \n\u2192 This one is obvious. Shoot anyone/everyone you can a text/call. \n\nCoworkers \n\u2192 Reach out to the engineers at your\u2026 | Troy Munson.", category: "guide"},
          {id: 5, href: "https://www.linkedin.com/posts/timhe2000_why-you-cant-find-a-technical-cofounder-activity-7328446023708659713-dePB", title: "Why you can't find a tech cofounder: 13 reasons | Tim He posted on the topic | LinkedIn", publisher: "linkedin.com", description: "Authoritative reference supporting Why you can't find a tech cofounder: 13 reasons | Tim He posted on the topic | LinkedIn.", category: "guide"},
          {id: 6, href: "https://www.groovehq.com/blog/technical-co-founder", title: "What I Did When I Couldn\u2019t Find a Technical Co-Founder", publisher: "groovehq.com", description: "Authoritative reference supporting What I Did When I Couldn\u2019t Find a Technical Co-Founder.", category: "guide"},
          {id: 7, href: "https://www.lithobyte.co/7-mistakes-people-make-trying-to-find-technical-co-founders/", title: "7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte", publisher: "lithobyte.co", description: "Authoritative reference supporting 7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte.", category: "guide"},
          {id: 8, href: "https://www.masslight.com/posts/checklist-finding-technical-cofounder", title: "Checklist for Finding a Technical Co-Founder", publisher: "masslight.com", description: "Authoritative reference supporting Checklist for Finding a Technical Co-Founder.", category: "guide"},
          {id: 9, href: "https://cofounderslab.com/", title: "The Startup CommunityStart. Grow. Fund.", publisher: "cofounderslab.com", description: "Authoritative reference supporting The Startup CommunityStart. Grow. Fund..", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Meet technical builders in the right rooms"
            body="If you want to find a technical cofounder, stop relying only on cold outreach. Join AI and startup communities where founders, engineers, and operators learn and connect in person."
            buttonText="Explore MLAI events"
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
