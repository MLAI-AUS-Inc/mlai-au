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

const TOPIC = "How to Find a Technical Co-Founder for Your Startup (Without Wasting Months)"
export const CATEGORY = "featured"
export const SLUG = "how-to-find-a-technical-co-founder-for-your-startup-without-wasting-months"
export const DATE_PUBLISHED = "2026-03-14"
export const DATE_MODIFIED = "2026-03-14"
export const DESCRIPTION = "Struggling to build your MVP? Learn how to find, pitch, and vet a technical co-founder for your startup, plus alternatives if you can't find the perfect fit."
const HERO_IMAGE = ""
const HERO_IMAGE_ALT = "How to Find a Technical Co-Founder for Your Startup (Without Wasting Months)"
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
  { id: 1, question: "What is the difference between a technical co-founder and a developer?", answer: "A developer usually delivers assigned work. A technical co-founder takes founder-level responsibility for product and technology decisions, shares business risk, and helps shape the company from the start." },
  { id: 2, question: "How can a non-technical founder attract a technical co-founder?", answer: "Bring evidence that the problem is real and that you are already doing the business work. Customer interviews, traction, pilots, clear wireframes, and a focused first use case make you more credible than a broad idea alone." },
  { id: 3, question: "Where should I look for a technical co-founder?", answer: "Start with warm networks like former colleagues, alumni groups, advisors, investors, and startup operators. Then expand to communities and platforms such as Y Combinator Co-Founder Matching, Wellfound, hackathons, local meetups, and demo days." },
  { id: 4, question: "How do I vet a technical co-founder if I cannot read code?", answer: "Focus on shipped products, ownership, and decision-making. Ask what they built, what constraints they faced, what trade-offs they made, and how they explain risks and priorities to non-technical people." },
  { id: 5, question: "Should a technical co-founder be paid salary or equity?", answer: "Because they take founding risk, meaningful equity is usually part of the arrangement. Some may also need salary later when funding or revenue allows, but early-stage compensation is often equity-heavy." },
  { id: 6, question: "What if I cannot find the right technical co-founder?", answer: "Do not lower your standards just to move faster. You can keep validating with no-code tools, use a tightly scoped agency build, or work with a product studio to create a testable product while you continue the search." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Find a Technical Co-Founder for Your Startup (Without Wasting Months)",
  intro: "Struggling to build your MVP? Learn how to find, pitch, and vet a technical co-founder for your startup, plus alternatives if you can't find the perfect fit.",
  items: [
    { label: "Lead with proof, not just an idea", description: "Technical co-founders usually join when they see a real problem, founder credibility, and early market signals. Customer interviews, pilots, LOIs, or a narrow use case make your pitch stronger." },
    { label: "Know what role you are filling", description: "A technical co-founder is a founder-level partner, not just a developer. They help shape product direction, make early architecture choices, and align technical decisions with business goals." },
    { label: "Source through trusted networks first", description: "Warm introductions from colleagues, alumni groups, operators, advisors, and startup communities often beat cold outreach. Founder-matching platforms and local tech events can widen the search." },
  ],
}

export const articleMeta = {
  title: "How to Find a Technical Co-Founder for Your Startup (Without Wasting Months)",
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
        <p><strong>{TOPIC}</strong> — {"A lot of early founders hit the same wall. You know the industry, you have seen the customer problem up close, and you may even have proof that people want the product. It is also where many non-technical founders start to doubt themselves. They wonder whether they need to learn to code, pay an agency too early, or somehow convince a great engineer to join on a slide deck and a promise."}</p>
        <p>{"The hard truth is that strong technical co-founders usually do not join because the idea sounds exciting on its own. They join because they trust the founder, believe the problem is real, and can see that the business side is already being handled with discipline. In practice, finding the right partner is less about luck and more about preparation. You need a clear problem statement, evidence of demand, a realistic view of roles and equity, and a way to assess technical judgment without pretending to be an engineer. This article walks through that process step by step: how to get yourself ready, where to look, how to vet candidates, and what to do if a true co-founder is not the right answer yet."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Struggling to build your MVP? Learn how to find, pitch, and vet a technical co-founder for your startup, plus alternatives if you can't find the perfect fit."
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
          {"Technical co-founders usually join when they see a real problem, founder credibility, and early market signals. Customer interviews, pilots, LOIs, or a narrow use case make your pitch stronger."}
        </QuoteBlock>
          <h2>{"What a Technical Co-Founder Actually Brings to the Table"}</h2>
          <p>{"A technical co-founder is not just the first person who can write code. They are a founder-level operator who owns major product and technology decisions from day one. That usually means shaping the first version of the product, choosing a sensible architecture, deciding what should be built now versus later, and translating customer needs into technical priorities. A CTO can play a similar role, but the title often appears later when a company already has a team, budget, and clearer reporting lines. An outsourced developer is different again: they can deliver tasks or projects, but they usually do not carry the same long-term ownership, business risk, or strategic responsibility."}</p>
          <p>{"The real value of a technical co-founder is judgment. Early startups rarely fail because they lacked code alone; they fail because they built the wrong thing, built too much, or built it in a way that could not support learning and growth. A strong technical co-founder helps balance speed, quality, and cost. They make early trade-offs, set engineering standards, and often hire or mentor the first engineers. Just as importantly, they align technology choices with business goals such as validation, fundraising, and time to market. Many technical co-founders will expect meaningful equity because they are taking founding risk, not simply providing contract labour. Some may also need salary once funding or revenue allows, but equity is usually part of the deal from the start."}</p>
          <h2>{"How to Prepare Your Pitch Before Reaching Out"}</h2>
          <p>{"A strong technical cofounder pitch starts before you contact anyone. Most experienced engineers are not looking for a raw idea. They want to see that you have done the hard business work already. If your message sounds like, \"I have an app idea, can you build it?\", you will likely be ignored. If your message sounds like, \"I spoke to 25 buyers, 9 asked for pilots, and here is the narrow first use case\", you look far more credible."}</p>
          <p>{"Validation matters because a technical cofounder is not just choosing a product. They are choosing a partner, a level of risk, and where to spend years of effort. You do not need perfect proof, but you do need signs of momentum."}</p>
          <p>{"You should also make the product feel real before asking someone to join. They help a technical person judge whether the problem is worth solving and whether your thinking is structured. These materials do not need to be polished. They need to be specific. Show the first user, the first task, the key screen, the business process behind it, and what success looks like in the first 90 days."}</p>
          <h3>{"What to bring into the first conversation"}</h3>
          <p>{"Come prepared with a short founder brief. Include the customer problem, who has it, how often it happens, how people solve it today, and why current options are weak. Add your traction so far, even if it is early."}</p>
          <p>{"You should also be ready to explain your role in the company beyond \"vision\". A good technical cofounder wants to know what you will own every week. Be clear about sales, customer discovery, operations, fundraising, domain expertise, partnerships, or industry access."}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the technical cofounder checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "What a Technical Co-Founder Actually Brings to the Table",
            "How to Prepare Your Pitch Before Reaching Out",
            "Where to Find High-Quality Technical Candidates",
            "How to Vet a Technical Co-Founder's Skills and Fit",
            "What to Do If You Can't Find the Right Fit",
          ]}
          accent="indigo"
        />
          <h2>{"Where to Find High-Quality Technical Candidates"}</h2>
          <p>{"The best technical cofounder candidates rarely come from cold job ads alone. Start with people who already have some connection to you: former colleagues, university alumni groups, startup operators, advisors, investors, and friends in engineering teams."}</p>
          <p>{"That approach matters because a cofounder search is not the same as hiring an employee. Describe the problem you are solving, the stage you are at, the skills you need, and the kind of partnership you want. People are far more likely to refer strong candidates when they understand the mission and the gap clearly."}</p>
          <p>{"Online founder and startup communities can widen your reach when your immediate network is thin. Platforms such as Y Combinator Co-Founder Matching and Wellfound can help you meet technical builders who are already interested in startups. Look for signals like shipped side projects, thoughtful technical writing, open-source work, and consistent participation in product discussions."}</p>
          <p>{"Ask what they have built recently, what kinds of products excite them, and how they think about customers, trade-offs, and speed. The goal is to identify people who can both build and reason, because an early-stage technical cofounder needs to make architecture choices while still moving quickly."}</p>
          <p>{"Hackathons, local tech meetups, startup weekends, university demo days, and niche industry events let you see how people think and communicate in real time. In Australia, this can include local SaaS events, AI meetups, founder groups, and engineering communities in cities like Sydney, Melbourne, and Brisbane. These settings are useful because you can observe whether someone is curious, practical, and able to explain technical ideas clearly to non-technical people."}</p>
          <p>{"Approach these spaces to build relationships first, not to force an immediate cofounder conversation. That slower path often produces better founder matches than trying to close someone after one meeting."}</p>
          <h2>{"How to Vet a Technical Co-Founder's Skills and Fit"}</h2>
          <p>{"If you cannot review code yourself, focus on outcomes instead of technical theatre. What problem did the product solve, what part did they personally own, what shipped, and what happened after launch? A strong technical co-founder can explain the trade-offs they made, the constraints they faced, and what they would do differently now."}</p>
          <p>{"Communication is just as important as raw technical skill. In an early-stage company, you need someone who can turn messy business goals into practical product decisions. The right person should explain risks in plain English, not hide behind jargon. If they cannot help a non-technical founder understand why one path is better than another, you will struggle when priorities, budget, or timelines get tight."}</p>
          <p>{"It helps you answer the question that matters most: can this person build with you under real startup pressure, not just interview well?"}</p>
          <p>{"What problem did the product solve, what part did they personally own, what shipped, and what happened after launch? A strong technical co-founder can explain the trade-offs they made, the constraints they faced, and what they would do differently now. If you cannot review code yourself, focus on outcomes instead of technical theatre. In an early-stage company, you need someone who can turn messy business goals into practical product decisions."}</p>
          <h2>{"What to Do If You Can't Find the Right Fit"}</h2>
          <p>{"If you still have not found the right technical cofounder, do not treat that as a sign to lower the bar. A strong business idea does not become stronger just because you rushed into a partnership."}</p>
          <p>{"You can hire a small agency for a tightly scoped build, work with a product studio like MLAI to turn the idea into a testable product, or use no-code tools to prove demand before you invest more heavily. The important thing is not to sit still waiting for a technical saviour. Keep customer conversations moving, keep shipping what you can, and keep building enough traction that the right technical partner sees a serious company rather than an unfinished idea."}</p>
          <p>{"A strong business idea does not become stronger just because you rushed into a partnership. If you still have not found the right technical cofounder, do not treat that as a sign to lower the bar. The important thing is not to sit still waiting for a technical saviour."}</p>

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"Warm introductions from colleagues, alumni groups, operators, advisors, and startup communities often beat cold outreach. Founder-matching platforms and local tech events can widen the search."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://articles.sequoiacap.com/five-tips-for-technical-co-founders", title: "Five Tips for Technical Co-Founders", publisher: "articles.sequoiacap.com", description: "Authoritative reference supporting Five Tips for Technical Co-Founders.", category: "guide"},
          {id: 2, href: "https://www.lithobyte.co/7-mistakes-people-make-trying-to-find-technical-co-founders/", title: "7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte", publisher: "lithobyte.co", description: "Authoritative reference supporting 7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte.", category: "guide"},
          {id: 3, href: "https://www.dave-bailey.com/blog/technical-co-founder", title: "\n      \n        How to Recruit a Technical Co-founder for Your Startup\n      \n    ", publisher: "dave-bailey.com", description: "Authoritative reference supporting \n      \n        How to Recruit a Technical Co-founder for Your Startup\n      \n    .", category: "guide"},
          {id: 4, href: "https://www.groovehq.com/blog/technical-co-founder", title: "What I Did When I Couldn\u2019t Find a Technical Co-Founder", publisher: "groovehq.com", description: "Authoritative reference supporting What I Did When I Couldn\u2019t Find a Technical Co-Founder.", category: "guide"},
          {id: 5, href: "https://www.smartcompany.com.au/startupsmart/how-to-recruit-a-technical-co-founder/", title: "How to recruit a technical co-founder, according to Alan Jones - SmartCompany", publisher: "smartcompany.com.au", description: "Authoritative reference supporting How to recruit a technical co-founder, according to Alan Jones - SmartCompany.", category: "guide"},
          {id: 6, href: "https://news.ycombinator.com/item?id=38477057", title: "You do need a technical co-founder [video] | Hacker News", publisher: "news.ycombinator.com", description: "Authoritative reference supporting You do need a technical co-founder [video] | Hacker News.", category: "guide"},
          {id: 7, href: "https://foundingjourney.com/how-to-find-a-technical-cofounder", title: "How to Find a Technical Co-Founder | Founding Journey", publisher: "foundingjourney.com", description: "Authoritative reference supporting How to Find a Technical Co-Founder | Founding Journey.", category: "guide"},
          {id: 8, href: "https://www.linkedin.com/pulse/how-i-vet-technical-co-founder-matt-watson-msvwc", title: "How I Vet a Technical Co-Founder", publisher: "linkedin.com", description: "Authoritative reference supporting How I Vet a Technical Co-Founder.", category: "guide"},
          {id: 9, href: "https://plane.com/blog/what-to-look-for-in-a-technical-co-founder", title: "What to look for in a technical co-founder - Plane | Global payroll, HR & compliance", publisher: "plane.com", description: "Authoritative reference supporting What to look for in a technical co-founder - Plane | Global payroll, HR & compliance.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Need help building before you find the right co-founder?"
            body="If your search is dragging on, you do not have to pause the business. MLAI can help you scope, prototype, and launch a testable product so you can keep learning and build real traction."
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
