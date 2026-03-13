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

const TOPIC = "How to Find a Technical Cofounder for Your Startup (And What to Do Instead)"
export const CATEGORY = "featured"
export const SLUG = "how-to-find-a-technical-cofounder-for-your-startup-and-what-to-do-instead"
export const DATE_PUBLISHED = "2026-03-13"
export const DATE_MODIFIED = "2026-03-13"
export const DESCRIPTION = "Struggling to find a technical cofounder? Learn where to look, how to assess fit, and how to keep building your MVP while you search."
const HERO_IMAGE = ""
const HERO_IMAGE_ALT = "How to Find a Technical Cofounder for Your Startup (And What to Do Instead)"
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
  { id: 1, question: "Do I need a technical cofounder before I launch?", answer: "Not necessarily. If you can validate demand, define the problem clearly, and drive sales or distribution, you may be able to launch an MVP with a product studio or fractional CTO support first." },
  { id: 2, question: "Where is the best place to find a technical cofounder?", answer: "Start with founder matching platforms, then work through your own network, alumni groups, former colleagues, LinkedIn outreach, and local startup or tech events where builders already gather." },
  { id: 3, question: "What should I show a potential technical cofounder?", answer: "Bring evidence that you can lead the business side: customer research, wireframes, early user interest, pre-sales, or a clear plan for getting traction. That is usually more persuasive than a big vision alone." },
  { id: 4, question: "How do I know if a technical cofounder is a good fit?", answer: "Look beyond technical strength. Check whether they communicate well, make practical trade-offs, are willing to ship a small MVP, and share your pace, risk tolerance, and long-term direction." },
  { id: 5, question: "Is it risky to give equity to someone too early?", answer: "Yes. Rushing into a cofounder arrangement without testing how you work together can create long-term problems. It is usually better to learn together first than to make a permanent equity decision too fast." },
  { id: 6, question: "What can I do if I cannot find the right technical cofounder yet?", answer: "Keep building. A studio like MLAI can help scope, design, and launch an MVP so you can learn from users, build credibility, and attract better technical talent from a stronger position." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Find a Technical Cofounder for Your Startup (And What to Do Instead)",
  intro: "Struggling to find a technical cofounder? Learn where to look, how to assess fit, and how to keep building your MVP while you search.",
  items: [
    { label: "You may not need one immediately", description: "A technical cofounder can help, but a non-technical founder can still validate demand and launch an MVP through a product studio or fractional technical support." },
    { label: "Treat the search like founder sales", description: "Strong technical candidates are taking real career risk. They need proof that you understand the customer, can drive growth, and have done more than just come up with an idea." },
    { label: "Look in focused builder communities", description: "Founder matching platforms, alumni and colleague networks, local meetups, hackathons, and AI or product events are practical places to meet startup-minded engineers." },
  ],
}

export const articleMeta = {
  title: "How to Find a Technical Cofounder for Your Startup (And What to Do Instead)",
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
        <p><strong>{TOPIC}</strong> — {"A lot of founders hit the same wall. They understand the customer problem, they can sell the vision, and they may even have early interest from the market. That gap creates real frustration, because the business may feel urgent while progress depends on finding one person with the right mix of engineering depth, startup appetite, and belief in the mission."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Struggling to find a technical cofounder? Learn where to look, how to assess fit, and how to keep building your MVP while you search."
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
          {"A technical cofounder can help, but a non-technical founder can still validate demand and launch an MVP through a product studio or fractional technical support."}
        </QuoteBlock>
      <section className="mx-auto max-w-[1220px] mt-0" id="do-you-really-need-one">
        <h2 className="font-heading text-3xl font-semibold">{"Do You Really Need a Technical Cofounder on Day One?"}</h2>
        <p className="text-base leading-7">{"Not always. A technical cofounder can be a major advantage, but they are not the only path to getting an MVP into users\u2019 hands. If you are a non-technical founder with strong domain knowledge, sales ability, or distribution, you may be able to validate the market before locking in a long-term cofounder relationship."}</p>
        <p className="text-base leading-7">{"The bigger risk is often rushing into what is basically a business marriage. Founders sometimes panic, assume they need a technical partner immediately, and give away large equity stakes to someone they barely know. A weaker cofounder match can hurt more than a slower start, especially if you have never built anything together under pressure."}</p>
        <p className="text-base leading-7">{"A practical middle path is to use a product studio like MLAI, or bring in a fractional CTO, to scope and build the first version while you test the market. This approach helps you launch, learn from real users, and make better technical decisions without forcing a permanent equity choice too early. If traction starts to appear, you are often in a stronger position to attract better technical talent later, whether that becomes a senior hire, a fractional leader, or the right technical cofounder with proven fit."}</p>
        <p className="text-base leading-7">{"A technical cofounder can be a major advantage, but they are not the only path to getting an MVP into users\u2019 hands. If you are a non-technical founder with strong domain knowledge, sales ability, or distribution, you may be able to validate the market before locking in a long-term cofounder relationship."}</p>
      </section>
      <section className="mx-auto max-w-[1220px] mt-0" id="where-to-look">
        <h2 className="font-heading text-3xl font-semibold">{"Where to Look for Your Technical Partner"}</h2>
        <p className="text-base leading-7">{"A good technical cofounder rarely appears through one channel alone. Start with founder matching networks such as CoFoundersLab and Y Combinator Startup School matching, where people are already signalling that they want to build something serious."}</p>
        <p className="text-base leading-7">{"Instead of asking, \"Want to be my technical cofounder?\" explain the problem, the customer pain, what progress you have made, and why you think the person could be a strong fit. That gives people enough context to decide whether a conversation is worth having."}</p>
        <p className="text-base leading-7">{"Start with founder matching networks such as CoFoundersLab and Y Combinator Startup School matching, where people are already signalling that they want to build something serious. A good technical cofounder rarely appears through one channel alone."}</p>
        <h3>{"Use founder communities with clear filters"}</h3>
        <p className="text-base leading-7">{"Dedicated founder communities are useful because they reduce random noise. Look for profiles that show more than technical skill alone. Strong signs include shipped products, side projects, open-source work, startup curiosity, and evidence that the person can communicate clearly with non-technical teammates. In Australia, this can include local startup groups, accelerator communities, and university-linked founder programs."}</p>
        <h3>{"Show up where technical builders already gather"}</h3>
        <p className="text-base leading-7">{"Attend tech meetups, hackathons, AI demo days, and startup events where people are actively building and sharing work. In the Australian ecosystem, this might mean local founder meetups in Sydney, Melbourne, or Brisbane, industry events tied to universities, and product or machine learning communities. These settings let you observe how someone thinks, how they explain trade-offs, and whether they are energised by startup messiness."}</p>
      </section>

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
            "Acknowledge the common frustration: great ideas stalled by a lack of coding ability.",
            "Highlight that recruiting a technical cofounder is essentially a B2B sales pitch; you must sell your vision and traction.",
            "Preview the article: where to look, how to vet, and alternatives to keep moving.",
          ]}
          accent="indigo"
        />
      <section className="mx-auto max-w-[1220px] mt-0" id="how-to-evaluate">
        <h2 className="font-heading text-3xl font-semibold">{"How to Pitch and Evaluate a Potential Technical Cofounder"}</h2>
        <p className="text-base leading-7">{"A strong first conversation is not a sales pitch about your big idea. It is proof that you can carry the business side of the company. A good technical cofounder wants to see that you are not just looking for someone to build for free. They want evidence that you understand the problem, can attract users, and are ready to do the hard commercial work after the product ships."}</p>
        <p className="text-base leading-7">{"You should also treat early meetings as a two-way evaluation. Listen for practical thinking. The right person does not need to love cutting corners, but they should be comfortable shipping a small MVP to test the market before investing months in perfect architecture."}</p>
        <p className="text-base leading-7">{"It is proof that you can carry the business side of the company. A good technical cofounder wants to see that you are not just looking for someone to build for free. They want evidence that you understand the problem, can attract users, and are ready to do the hard commercial work after the product ships."}</p>
        <h3>{"What to bring into the meeting"}</h3>
        <p className="text-base leading-7">{"Go in with a short founder pack."}</p>
        <h3>{"What to test in their thinking"}</h3>
        <p className="text-base leading-7">{"Give them a realistic startup scenario: limited budget, unclear feature priorities, and pressure to learn fast. Their answer will show whether they think like a founder or like a pure implementer. You are looking for judgment, not just technical vocabulary."}</p>
      </section>
      <section className="mx-auto max-w-[1220px] mt-0" id="conclusion">
        <h2 className="font-heading text-3xl font-semibold">{"Keep Moving Forward: Don't Let the Search Stall Your Startup"}</h2>
        <p className="text-base leading-7">{"Finding the right technical cofounder can take far longer than most founders expect. You are choosing a long-term business partner who must share your pace, standards, and appetite for risk."}</p>
        <p className="text-base leading-7">{"Startup momentum matters. A practical path is to keep building while you keep looking. With a partner like MLAI, you can architect your product, de-risk the technical roadmap, and get an MVP into users' hands sooner. That progress helps you learn faster, makes your company more credible, and can make your startup far more attractive to a future technical cofounder who wants to join something already in motion."}</p>
        <p className="text-base leading-7">{"You are choosing a long-term business partner who must share your pace, standards, and appetite for risk. Finding the right technical cofounder can take far longer than most founders expect. A practical path is to keep building while you keep looking. With a partner like MLAI, you can architect your product, de-risk the technical roadmap, and get an MVP into users' hands sooner."}</p>
      </section>

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"Founder matching platforms, alumni and colleague networks, local meetups, hackathons, and AI or product events are practical places to meet startup-minded engineers."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://articles.sequoiacap.com/five-tips-for-technical-co-founders", title: "Five Tips for Technical Co-Founders", publisher: "articles.sequoiacap.com", description: "Authoritative reference supporting Five Tips for Technical Co-Founders.", category: "guide"},
          {id: 2, href: "https://www.linkedin.com/pulse/how-i-vet-technical-co-founder-matt-watson-msvwc", title: "How I Vet a Technical Co-Founder", publisher: "linkedin.com", description: "Authoritative reference supporting How I Vet a Technical Co-Founder.", category: "guide"},
          {id: 3, href: "https://www.dave-bailey.com/blog/technical-co-founder", title: "\n      \n        How to Recruit a Technical Co-founder for Your Startup\n      \n    ", publisher: "dave-bailey.com", description: "Authoritative reference supporting \n      \n        How to Recruit a Technical Co-founder for Your Startup\n      \n    .", category: "guide"},
          {id: 4, href: "https://www.masslight.com/posts/checklist-finding-technical-cofounder", title: "Checklist for Finding a Technical Co-Founder", publisher: "masslight.com", description: "Authoritative reference supporting Checklist for Finding a Technical Co-Founder.", category: "guide"},
          {id: 5, href: "https://www.groovehq.com/blog/technical-co-founder", title: "What I Did When I Couldn\u2019t Find a Technical Co-Founder", publisher: "groovehq.com", description: "Authoritative reference supporting What I Did When I Couldn\u2019t Find a Technical Co-Founder.", category: "guide"},
          {id: 6, href: "https://www.linkedin.com/pulse/do-you-really-need-technical-co-founder-what-should-i-jonathan-morgan-dkxzc", title: "Do you really need a technical co-founder? And what should I be looking for?", publisher: "linkedin.com", description: "Authoritative reference supporting Do you really need a technical co-founder? And what should I be looking for?.", category: "guide"},
          {id: 7, href: "https://www.lithobyte.co/7-mistakes-people-make-trying-to-find-technical-co-founders/", title: "7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte", publisher: "lithobyte.co", description: "Authoritative reference supporting 7 Mistakes People Make Trying to Find Technical Co-Founders \u2013 LithoByte.", category: "guide"},
          {id: 8, href: "https://www.smartcompany.com.au/startupsmart/how-to-recruit-a-technical-co-founder/", title: "How to recruit a technical co-founder, according to Alan Jones - SmartCompany", publisher: "smartcompany.com.au", description: "Authoritative reference supporting How to recruit a technical co-founder, according to Alan Jones - SmartCompany.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Need to build before you find the right technical cofounder?"
            body="MLAI can help you scope the product, de-risk the technical roadmap, and launch an MVP while you continue your cofounder search."
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
      </div>
    </article>
  )
}
