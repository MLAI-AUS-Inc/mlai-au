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

const TOPIC = "How to Test for a Cofounder Values Match Before You Commit"
export const CATEGORY = "featured"
export const SLUG = "how-to-test-for-a-cofounder-values-match-before-you-commit"
export const DATE_PUBLISHED = "2026-03-14"
export const DATE_MODIFIED = "2026-03-14"
export const DESCRIPTION = "Learn actionable strategies to test for a cofounder values match before launching your startup. Discover trial projects, hard questions, and alignment frameworks."
const HERO_IMAGE = ""
const HERO_IMAGE_ALT = "How to Test for a Cofounder Values Match Before You Commit"
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
  { id: 1, question: "How do you test for a cofounder values match before starting a company?", answer: "Use action, not just conversation. First define your own non-negotiables in writing. Then run a short trial project with real deadlines and shared pressure, and pair that with direct questions about conflict, risk, money, and decision-making." },
  { id: 2, question: "How long should a cofounder trial project last?", answer: "A two- to four-week trial is often enough to reveal patterns without creating too much complexity. The key is not length alone, but whether the work includes clear deliverables, time pressure, and a structured debrief at the end." },
  { id: 3, question: "What behaviours matter most during a cofounder trial?", answer: "Look for how the person handles missed deadlines, feedback, disagreement, ambiguity, and other people. Early honesty, accountability, and respect usually matter more than perfect output." },
  { id: 4, question: "What questions should you ask a potential cofounder?", answer: "Ask for examples from past conflict, failure, and trade-offs. Also use scenario questions about buyout offers, fundraising, salaries, runway, equity, and who makes final decisions when founders disagree." },
  { id: 5, question: "Can complementary skills make up for weak values alignment?", answer: "Usually not for long. Skills explain what each founder can do, but values shape how they work together when the startup is under pressure. Misalignment on ethics, risk, fairness, or work style tends to create deeper conflict later." },
  { id: 6, question: "What should happen after you confirm a strong values match?", answer: "Turn the fit into structure. Agree on roles, ownership, pay, decision rights, and what happens if one founder leaves. Trust matters, but a healthy cofounder relationship also needs clear agreements." },
]

export const summaryHighlights = {
  heading: "Key facts: How to Test for a Cofounder Values Match Before You Commit",
  intro: "Learn actionable strategies to test for a cofounder values match before launching your startup. Discover trial projects, hard questions, and alignment frameworks.",
  items: [
    { label: "Start with your own standards", description: "Write down your non-negotiables, working preferences, and deal-breakers before you assess anyone else. Clear standards make the cofounder search more honest." },
    { label: "Test values through real work", description: "A short trial project with deadlines, clear deliverables, and shared pressure is one of the best ways to see how a potential cofounder behaves when conditions are not ideal." },
    { label: "Watch what happens under strain", description: "Pay attention to missed deadlines, feedback style, honesty about problems, and how they treat other people. These moments reveal operating values better than polished conversation." },
  ],
}

export const articleMeta = {
  title: "How to Test for a Cofounder Values Match Before You Commit",
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
        <p><strong>{TOPIC}</strong> — {"Research and founder interviews often point to cofounder conflict as a major reason startups stall or fail. That is why a strong skills mix is helpful, but it is not enough. Skills explain what each person can do."}</p>
        <p>{"A cofounder values match shows up in hard moments, not polished coffee chats. The real test is action. Before you commit, you need ways to see how a potential cofounder works, disagrees, shares credit, and handles uncertainty. That is the core idea of this guide: do not only discuss values, design small real-world tests for them."}</p>
        <p>{"That is why a strong skills mix is helpful, but it is not enough. Skills explain what each person can do. Research and founder interviews often point to cofounder conflict as a major reason startups stall or fail. The real test is action. Before you commit, you need ways to see how a potential cofounder works, disagrees, shares credit, and handles uncertainty. That is the core idea of this guide: do not only discuss values, design small real-world tests for them."}</p>
        <ArticleImageBlock
          src={HERO_IMAGE}
          alt={HERO_IMAGE_ALT}
          caption="Learn actionable strategies to test for a cofounder values match before launching your startup. Discover trial projects, hard questions, and alignment frameworks."
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
          {"Write down your non-negotiables, working preferences, and deal-breakers before you assess anyone else. Clear standards make the cofounder search more honest."}
        </QuoteBlock>
          <h2>{"Step 1: Audit and Document Your Own Non-Negotiables"}</h2>
          <p>{"Before you test whether a potential cofounder matches your values, you need a written view of your own. Many founders stay vague here. If your own values are still fuzzy, almost any early conversation can feel promising because there is no clear standard to compare against."}</p>
          <p>{"A nice-to-have might be shared hobbies, similar communication style, or preference for the same productivity tools. A non-negotiable is different. It is a value or operating rule that, if broken, will create lasting conflict. Examples include honesty with investors, willingness to challenge each other directly, commitment to inclusive hiring, or refusing to build AI products that cross your ethical line."}</p>
          <p>{"Founders should also look beyond mission language and test practical values. Risk tolerance is a major one. One founder may be comfortable bootstrapping for years, while another expects aggressive fundraising and fast hiring. Lifestyle expectations matter too. Writing these points down forces you to move from abstract identity to real operating choices."}</p>
          <p>{"If you work in AI, add explicit statements about responsibility and impact. A short founder values sheet can help: list your top five non-negotiables, your top three working-style preferences, and three scenarios that would make you leave a partnership. Once that document exists, your cofounder search becomes sharper, faster, and more honest because you are testing against something concrete instead of relying on chemistry alone."}</p>
          <h2>{"Step 2: Execute a High-Stakes Trial Project"}</h2>
          <p>{"A short trial project is often the most reliable way to test for a cofounder values match."}</p>
          <p>{"The best trial projects usually run for two to four weeks. Without real constraints, you are only observing compatibility in ideal conditions."}</p>
          <p>{"Think of the trial as a stress test, not a chemistry test."}</p>
          <p>{"A short trial project is often the most reliable way to test for a cofounder values match. Without real constraints, you are only observing compatibility in ideal conditions. The best trial projects usually run for two to four weeks. Think of the trial as a stress test, not a chemistry test. Write the trial brief before day one. Also agree on practical norms like response times, meeting cadence, and what quality bar is acceptable."}</p>
          <h3>{"Set the rules before the work starts"}</h3>
          <p>{"Write the trial brief before day one. Also agree on practical norms like response times, meeting cadence, and what quality bar is acceptable. These details may feel administrative, but they are exactly where hidden values differences tend to surface."}</p>
          <p>{"This setup helps you separate genuine misalignment from simple confusion. It may be a different value ranking."}</p>
          <h3>{"Watch behaviour when things go wrong"}</h3>
          <p>{"Does your potential cofounder surface the problem early or hide it? Under pressure, people usually reveal their default operating values."}</p>
          <p>{"That includes contractors, early hires, customers, and community members."}</p>
          <p>{"At the end of the trial, run a structured debrief. Each person should answer the same questions about what worked, what created friction, where trust increased, and what felt misaligned. If the output was decent but the working experience felt brittle or one-sided, that is a warning sign."}</p>

        <ArticleResourceCTA
          eyebrow="Free guide"
          title={"Get the how to test for cofounder values match checklist"}
          description="Use this article as a working guide: shortlist candidates, validate traction, and structure your next conversations."
          buttonLabel="Download now"
          buttonHref="/articles"
          accent="purple"
        />

        <ArticleStepList
          title="Practical next steps"
          steps={[
            "Step 1: Audit and Document Your Own Non-Negotiables",
            "Step 2: Execute a High-Stakes Trial Project",
            "Step 3: Stress-Test Conflict Resolution Through Hard Questions",
            "Making the Final Decision to Partner Up",
          ]}
          accent="indigo"
        />
          <h2>{"Step 3: Stress-Test Conflict Resolution Through Hard Questions"}</h2>
          <p>{"A values match rarely shows up in a relaxed coffee chat. Ask for specific examples from past jobs, side projects, or startup attempts. Questions like, \u201cTell me about a time you strongly disagreed with a teammate,\u201d or \u201cWhat is a failure you still think about?\u201d are useful because they uncover patterns, not polished ideals."}</p>
          <p>{"Scenario questions are also powerful because they force both founders to make values visible. You are looking for alignment on risk, ambition, fairness, and decision-making style. If one founder optimises for speed and upside while the other protects stability and control, that gap will matter later."}</p>
          <p>{"Ask how much runway each person has, what salary they need, whether they support family members, and how long they can work without predictable income. Then talk about equity in practical terms, not vague goodwill. These discussions can feel awkward, but avoiding them is worse. Many cofounder conflicts are not really about personality."}</p>
          <p>{"Ask for specific examples from past jobs, side projects, or startup attempts. Questions like, \u201cTell me about a time you strongly disagreed with a teammate,\u201d or \u201cWhat is a failure you still think about?\u201d are useful because they uncover patterns, not polished ideals. A values match rarely shows up in a relaxed coffee chat. You are looking for alignment on risk, ambition, fairness, and decision-making style."}</p>
          <h2>{"Making the Final Decision to Partner Up"}</h2>
          <p>{"By the end of a cofounder trial, you should have more than a good feeling. You should have evidence. If the partnership already feels draining in a small test, that is useful data. Walking away early can feel awkward, but it is often the smartest and kindest choice for both people."}</p>
          <p>{"If the values match is strong, do not stop at verbal alignment. Turn that fit into clear decisions about roles, ownership, decision-making, pay, and what happens if one person leaves. A healthy cofounder relationship needs structure as well as trust. Trust your instincts, but also trust the pattern of behaviour you observed during the trial. The right cofounder should make the mission feel more possible, not more confusing. When both the evidence and your judgment say yes, move forward with clarity and commitment."}</p>
          <p>{"You should have evidence. If the partnership already feels draining in a small test, that is useful data. Walking away early can feel awkward, but it is often the smartest and kindest choice for both people."}</p>

        <QuoteBlock title="Keep moving forward" variant="orange">
          {"Pay attention to missed deadlines, feedback style, honesty about problems, and how they treat other people. These moments reveal operating values better than polished conversation."}
        </QuoteBlock>

        <MLAITemplateResourceCTA />

      <ArticleReferences
        references={[
          {id: 1, href: "https://www.mentessa.com/7-best-practices-for-a-cofounder-matching-service-online/", title: "7 Best Practices for a Cofounder Matching Service Online", publisher: "mentessa.com", description: "Authoritative reference supporting 7 Best Practices for a Cofounder Matching Service Online.", category: "guide"},
          {id: 2, href: "https://findskill.ai/skills/productivity/co-founder-vetting-checklist/", title: "Co-Founder Vetting Checklist | FindSkill.ai \u2014 Master Any Skill with AI", publisher: "findskill.ai", description: "Authoritative reference supporting Co-Founder Vetting Checklist | FindSkill.ai \u2014 Master Any Skill with AI.", category: "guide"},
          {id: 3, href: "https://onlyfounders.app/all-blogs/cofounder-compatibility-testing-your-cofounder-s-compatibility", title: "Cofounder Compatibility: Testing your CoFounder's Compatibility ! - OnlyFounders App", publisher: "onlyfounders.app", description: "Authoritative reference supporting Cofounder Compatibility: Testing your CoFounder's Compatibility ! - OnlyFounders App.", category: "guide"},
          {id: 4, href: "https://blackbird.vc/blog/the-cofounder-question", title: "The cofounder question | Blackbird", publisher: "blackbird.vc", description: "Authoritative reference supporting The cofounder question | Blackbird.", category: "guide"},
          {id: 5, href: "https://www.nfx.com/post/the-pyramid-of-cofounder-success", title: "The Pyramid of Co-Founder Success", publisher: "nfx.com", description: "Authoritative reference supporting The Pyramid of Co-Founder Success.", category: "guide"},
          {id: 6, href: "https://www.fwdstart.me/p/how-to-test-for-co-founder-compatibility-and-alignment", title: "How to test for co-founder compatibility and alignment", publisher: "fwdstart.me", description: "Authoritative reference supporting How to test for co-founder compatibility and alignment.", category: "guide"},
          {id: 7, href: "https://www.charityentrepreneurship.com/post/how-to-successfully-pick-a-co-founder", title: "How to Successfully Pick a Co-Founder", publisher: "charityentrepreneurship.com", description: "Authoritative reference supporting How to Successfully Pick a Co-Founder.", category: "guide"},
          {id: 8, href: "https://blog.foundersbase.com/how-can-i-vet-or-evaluate-a-potential-co-founders-compatibility/", title: "How can I vet or evaluate a potential co-founder\u2019s compatibility?", publisher: "blog.foundersbase.com", description: "Authoritative reference supporting How can I vet or evaluate a potential co-founder\u2019s compatibility?.", category: "guide"},
          {id: 9, href: "https://www.linkedin.com/posts/jmiddleton_choosing-a-co-founder-is-not-like-choosing-activity-7331680314664103936-s2B7", title: "How to find co-founder fit: 4 tests to pass | Jesse Middleton posted on the topic | LinkedIn", publisher: "linkedin.com", description: "Authoritative reference supporting How to find co-founder fit: 4 tests to pass | Jesse Middleton posted on the topic | LinkedIn.", category: "guide"},
          {id: 10, href: "https://www.antler.co/blog/find-a-co-founder-with-antler", title: "How Antler facilitates co-founder matching", publisher: "antler.co", description: "Authoritative reference supporting How Antler facilitates co-founder matching.", category: "guide"},
          {id: 11, href: "https://www.library.hbs.edu/working-knowledge/cofounder-courtship-how-to-find-the-right-mate-for-your-startup", title: "Cofounder Courtship: How to Find the Right Mate\u2014for Your Startup | Working Knowledge", publisher: "library.hbs.edu", description: "Authoritative reference supporting Cofounder Courtship: How to Find the Right Mate\u2014for Your Startup | Working Knowledge.", category: "guide"},
        ]}
        heading="Sources & further reading"
      />

        <ArticleDisclaimer />

        <div className="my-12 not-prose">
          <ArticleCompanyCTA
            title="Use a founder-fit checklist before you split equity"
            body="If you are weighing a potential cofounder, use a simple framework to document values, pressure-test alignment, and run better trial projects before making a long-term commitment."
            buttonText="Get the founder alignment template"
            buttonHref="/resources"
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
