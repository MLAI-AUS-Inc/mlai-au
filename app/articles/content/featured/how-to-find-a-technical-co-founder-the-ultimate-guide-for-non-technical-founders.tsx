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

const TOPIC = "How to Find a Technical Co-Founder: The Ultimate Guide for Non-Technical Founders"
export const CATEGORY = "featured"
export const SLUG = "how-to-find-a-technical-co-founder-the-ultimate-guide-for-non-technical-founders"
export const DATE_PUBLISHED = "2026-03-13"
export const DATE_MODIFIED = "2026-03-13"
export const DESCRIPTION = "Learn how to find a technical cofounder for your startup. Discover practical ways to prepare, network, pitch your idea, and assess long-term fit."
const HERO_IMAGE = ""
const HERO_IMAGE_ALT = "How to Find a Technical Co-Founder: The Ultimate Guide for Non-Technical Founders"
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
  { id: 1, question: "What is the best way to find a technical cofounder if I am non-technical?", answer: "Start by preparing solid basics: the problem, target user, MVP scope, and early proof such as interviews or mockups. Then look through warm introductions first, followed by founder-matching platforms and niche communities where technical people already spend time." },
  { id: 2, question: "Do I need a full business plan before I approach engineers?", answer: "No. You do not need a polished plan, but you should have enough detail to show judgment and follow-through. Wireframes, customer feedback, a simple business model, and a clear first version are usually more useful than a long document." },
  { id: 3, question: "Where should I look for a technical cofounder?", answer: "Start with people who already know your work, including friends, former coworkers, classmates, and other founders. After that, use structured matching platforms and focused communities such as MLAI if you are building in AI, data, automation, or related areas." },
  { id: 4, question: "How should I pitch my startup to a potential technical cofounder?", answer: "Lead with the problem, who has it, and why it matters now. Then explain what you bring to the company, what stage the project is at, and how compensation, equity, time commitment, and decision-making would work." },
  { id: 5, question: "How can I evaluate a technical cofounder if I cannot judge code quality myself?", answer: "Ask about specific projects they built, the trade-offs they made, what broke, and how they handled it. You can also run a small trial project and pay attention to communication, follow-through, clarity, and whether your working styles match." },
  { id: 6, question: "Should I hire a freelancer first instead of finding a cofounder?", answer: "That depends on your goal. If you only need short-term execution, a freelancer may help. If you need someone to shape the product, take risk, and stay through uncertainty, a true technical cofounder is a different role and should be assessed as a long-term partner." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Find a Technical Co-Founder: The Ultimate Guide for Non-Technical Founders",
  intro: "Learn how to find a technical cofounder for your startup. Discover practical ways to prepare, network, pitch your idea, and assess long-term fit.",
  items: [
    { label: "Start with preparation", description: "Before you try to find a technical cofounder, define the problem, sketch the MVP, gather early proof, and clarify the skills your product actually needs." },
    { label: "Use warm and niche channels", description: "Begin with friends, coworkers, and founder networks, then expand into founder-matching platforms and focused communities such as MLAI where technical builders already gather." },
    { label: "Pitch the problem, not a feature list", description: "Engineers respond better to a clear problem, customer insight, and founder credibility than to a long wishlist of product features." },
  ],
}

export const articleMeta = {
  title: "How to Find a Technical Co-Founder: The Ultimate Guide for Non-Technical Founders",
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
        <p><strong>{TOPIC}</strong> — {"If you have a solid startup idea but no technical background, the search for a technical cofounder can feel slow, awkward, and discouraging. Many non-technical founders begin by thinking they need someone who can simply build an app or ship an MVP. A true technical cofounder helps define the product, challenge assumptions, choose the right stack, estimate effort, and make calm decisions when things break or priorities change."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Learn how to find a technical cofounder for your startup. Discover practical ways to prepare, network, pitch your idea, and assess long-term fit."
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
          {"Before you try to find a technical cofounder, define the problem, sketch the MVP, gather early proof, and clarify the skills your product actually needs."}
        </QuoteBlock>
      <section className="mx-auto max-w-4xl mt-10" id="prose-define-needs">
        <h2 className="text-3xl font-semibold">{"Define Your Needs Before You Search"}</h2>
        <p className="text-base leading-7">{"Before you try to find a technical cofounder, get specific about what you are actually building and why it matters. Strong engineers hear vague startup pitches all the time, so \u201cI have a great idea\u201d is rarely enough to start a serious conversation. What stands out is evidence that you have done the early work. If you already have customer interviews, early signups, mockups, or examples of people asking for the product, you look much more credible."}</p>
        <p className="text-base leading-7">{"A technical cofounder is not just a contractor who writes code for someone else\u2019s idea. They are taking real risk with you, so they want to see momentum, judgment, and follow-through. You do not need a polished business plan, but you should have basic wireframes, a simple view of the business model, and a shortlist of the most important assumptions to test."}</p>
        <p className="text-base leading-7">{"You should also define the technical needs of your MVP before you start searching. Not every startup needs the same kind of builder. Some products need a full-stack engineer who can ship fast, while others need stronger data, mobile, AI, or infrastructure skills. If you are building an AI product, be careful not to overstate the need for advanced machine learning from day one if the real first step is workflow design, data collection, and a usable interface."}</p>
        <p className="text-base leading-7">{"The goal is not to lock in every technical decision too early. Define the problem, sketch the MVP, understand the user journey, and identify the capabilities needed to build version one. That makes your search more focused and respectful of other people\u2019s time. It also gives a potential cofounder confidence that you are ready to build something real, not just talk about possibilities."}</p>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="prose-where-to-look">
        <h2 className="text-3xl font-semibold">{"Where to Look: From Immediate Networks to AI Communities"}</h2>
        <p className="text-base leading-7">{"Ask friends, family, former coworkers, classmates, startup founders, and ex-managers if they know strong engineers who are curious about building something new."}</p>
        <p className="text-base leading-7">{"Be specific when you reach out. Do not just say you are looking for a technical co-founder. Explain the problem, who it affects, what you have already done, and why now is a good time to build. Include what kind of person you want to meet, such as a full-stack engineer, ML engineer, or product-minded technical lead. Clear messages get better referrals because people can quickly decide who in their network might match."}</p>
        <p className="text-base leading-7">{"After warm outreach, use structured founder-matching channels. Platforms like CoFoundersLab can help you meet people who are actively looking for startup partners rather than casual chats. These platforms are useful because they make intent clearer from the start. You will need several conversations, a small test project, and honest discussion about risk, time commitment, equity, and decision-making before you know whether the match is real."}</p>
        <h3>{"Niche communities often produce better fits"}</h3>
        <p className="text-base leading-7">{"General networking spaces can be useful, but niche communities often lead to stronger co-founder matches. In focused groups, people already share a technical interest, a learning mindset, or a view of where the market is going. That matters if you are building in AI, data, automation, or developer tools, where curiosity and technical depth are hard to fake. Instead of trying to convince someone cold, you can meet people who are already engaged with the field."}</p>
        <p className="text-base leading-7">{"For founders in Australia, communities like MLAI can be a practical place to start. Join conversations before you pitch your idea. Ask thoughtful questions, share what you are learning, and look for people who consistently show good judgment, follow-through, and excitement about real problems. A technical co-founder is not just someone who can code. You are looking for someone you can learn with, make decisions with, and handle pressure with over a long period."}</p>
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
            "Define Your Needs Before You Search",
            "Where to Look: From Immediate Networks to AI Communities",
            "How to Pitch Your Vision to an Engineer",
            "Vetting for Alignment, Commitment, and Skill",
            "Take the First Step Toward Your Technical Partnership",
          ]}
          accent="indigo"
        />
      <section className="mx-auto max-w-4xl mt-10" id="prose-how-to-pitch">
        <h2 className="text-3xl font-semibold">{"How to Pitch Your Vision to an Engineer"}</h2>
        <p className="text-base leading-7">{"When you talk to a potential technical cofounder, start with the problem, not the product wishlist."}</p>
        <p className="text-base leading-7">{"A strong technical prospect is not only judging the idea. They are judging you. Be clear about what you will own, such as customer interviews, sales, partnerships, operations, fundraising, or community building. This signals that you are not looking for someone to \"build it while I think about it.\" You are offering a real partnership."}</p>
        <p className="text-base leading-7">{"Finally, be direct about compensation, equity, time commitment, and risk. A serious engineer will want to know whether this is a side project, a full-time company, or something in between. They will also want to know how decisions will be made and what success looks like over the next six to twelve months. Honest conversations build trust early."}</p>
        <p className="text-base leading-7">{"When you talk to a potential technical cofounder, start with the problem, not the product wishlist. They are judging you. Be clear about what you will own, such as customer interviews, sales, partnerships, operations, fundraising, or community building. This signals that you are not looking for someone to \"build it while I think about it.\" You are offering a real partnership. A strong technical prospect is not only judging the idea. A serious engineer will want to know whether this is a side project, a full-time company, or something in between."}</p>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="prose-vetting">
        <h2 className="text-3xl font-semibold">{"Vetting for Alignment, Commitment, and Skill"}</h2>
        <p className="text-base leading-7">{"If you are non-technical, do not try to judge a potential cofounder only by whether they sound smart. Look for proof in their past work. Ask what they have built, why they made certain technical choices, what went wrong, and how they fixed it."}</p>
        <p className="text-base leading-7">{"Skill alone is not enough for an early startup. You also need to know how this person works under pressure and whether they want the same kind of company you want to build. Watch how they communicate, how quickly they respond, whether they ask good questions, and whether they follow through. Use that experience to discuss commitment, decision-making, time expectations, equity, and long-term vision before calling them a cofounder."}</p>
        <p className="text-base leading-7">{"Look for proof in their past work. Ask what they have built, why they made certain technical choices, what went wrong, and how they fixed it. If you are non-technical, do not try to judge a potential cofounder only by whether they sound smart. You also need to know how this person works under pressure and whether they want the same kind of company you want to build. Watch how they communicate, how quickly they respond, whether they ask good questions, and whether they follow through."}</p>
        <h3>{"Questions that reveal real ability"}</h3>
        <p className="text-base leading-7">{"What did you build yourself? What was the hardest technical issue? How did you decide what to ship first? Their answers should be specific and easy to follow."}</p>
      </section>
      <section className="mx-auto max-w-4xl mt-10" id="conclusion-action-plan">
        <h2 className="text-3xl font-semibold">{"Take the First Step Toward Your Technical Partnership"}</h2>
        <p className="text-base leading-7">{"Finding a technical co-founder is rarely a quick search. The strongest matches happen when you can clearly explain the problem, the customer, the early plan, and why now is the right time to build."}</p>
        <p className="text-base leading-7">{"Then put yourself in rooms where technical builders already gather and contribute with curiosity, not urgency. Communities like MLAI can help you meet people through ongoing conversations, events, and shared learning. Your next step is simple: prepare your materials this week, join relevant communities, and start a few genuine conversations with builders who care about the same problem."}</p>
        <p className="text-base leading-7">{"The strongest matches happen when you can clearly explain the problem, the customer, the early plan, and why now is the right time to build. Finding a technical co-founder is rarely a quick search. Communities like MLAI can help you meet people through ongoing conversations, events, and shared learning. Your next step is simple: prepare your materials this week, join relevant communities, and start a few genuine conversations with builders who care about the same problem."}</p>
      </section>

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"Engineers respond better to a clear problem, customer insight, and founder credibility than to a long wishlist of product features."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://foundingjourney.com/how-to-find-a-technical-cofounder", title: "How to Find a Technical Co-Founder | Founding Journey", publisher: "foundingjourney.com", description: "Authoritative reference supporting How to Find a Technical Co-Founder | Founding Journey.", category: "guide"},
          {id: 2, href: "https://www.lithobyte.co/7-mistakes-people-make-trying-to-find-technical-co-founders/", title: "7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte", publisher: "lithobyte.co", description: "Authoritative reference supporting 7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte.", category: "guide"},
          {id: 3, href: "https://www.linkedin.com/posts/josephpcaprara_how-do-i-find-a-technical-cofounder-for-my-activity-7371594520813002752-OePp", title: "Finding a technical cofounder: 2 paths and how to meet them | Joe Caprara posted on the topic | LinkedIn", publisher: "linkedin.com", description: "Authoritative reference supporting Finding a technical cofounder: 2 paths and how to meet them | Joe Caprara posted on the topic | LinkedIn.", category: "guide"},
          {id: 4, href: "https://www.groovehq.com/blog/technical-co-founder", title: "What I Did When I Couldn\u2019t Find a Technical Co-Founder", publisher: "groovehq.com", description: "Authoritative reference supporting What I Did When I Couldn\u2019t Find a Technical Co-Founder.", category: "guide"},
          {id: 5, href: "https://www.linkedin.com/posts/timhe2000_why-you-cant-find-a-technical-cofounder-activity-7328446023708659713-dePB", title: "Why you can't find a tech cofounder: 13 reasons | Tim He posted on the topic | LinkedIn", publisher: "linkedin.com", description: "Authoritative reference supporting Why you can't find a tech cofounder: 13 reasons | Tim He posted on the topic | LinkedIn.", category: "guide"},
          {id: 6, href: "https://www.linkedin.com/posts/troymunson_heres-how-you-find-a-technical-co-founder-activity-7248342422693306368-BIee", title: "Here's how you find a technical co-founder for your idea: \n\n\nFriends & Family \n\u2192 This one is obvious. Shoot anyone/everyone you can a text/call. \n\nCoworkers \n\u2192 Reach out to the engineers at your\u2026 | Troy Munson", publisher: "linkedin.com", description: "Authoritative reference supporting Here's how you find a technical co-founder for your idea: \n\n\nFriends & Family \n\u2192 This one is obvious. Shoot anyone/everyone you can a text/call. \n\nCoworkers \n\u2192 Reach out to the engineers at your\u2026 | Troy Munson.", category: "guide"},
          {id: 7, href: "https://cofounderslab.com/", title: "The Startup CommunityStart. Grow. Fund.", publisher: "cofounderslab.com", description: "Authoritative reference supporting The Startup CommunityStart. Grow. Fund..", category: "guide"},
          {id: 8, href: "https://www.masslight.com/posts/checklist-finding-technical-cofounder", title: "Checklist for Finding a Technical Co-Founder", publisher: "masslight.com", description: "Authoritative reference supporting Checklist for Finding a Technical Co-Founder.", category: "guide"},
          {id: 9, href: "https://www.ycombinator.com/cofounder-matching", title: "Y Combinator Co-Founder Matching Platform - find a co-founder through YC | Y Combinator", publisher: "ycombinator.com", description: "Authoritative reference supporting Y Combinator Co-Founder Matching Platform - find a co-founder through YC | Y Combinator.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Meet technical builders in the right community"
            body="If you want to find a technical cofounder, start by joining places where strong builders already share ideas, ask good questions, and work through real problems together. MLAI gives founders a practical way to meet people through ongoing conversations instead of cold outreach alone."
            buttonText="Join the MLAI community"
            buttonHref="/community"
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
