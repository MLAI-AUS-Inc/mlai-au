import type { ReactNode } from "react";
import { Home } from "lucide-react";
import { Link } from "react-router";

import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleReferences } from "~/components/articles/ArticleReferences";
import FounderExperimentLedger from "~/components/articles/FounderExperimentLedger";

export const useCustomHeader = true;

const TOPIC = "What an Entrepreneur Does and How to Start Well";
export const CATEGORY = "featured";
export const SLUG = "what-an-entrepreneur-does-and-how-to-start-well";
export const DATE_PUBLISHED = "2026-04-20";
export const DATE_MODIFIED = "2026-07-28";
export const DESCRIPTION =
  "A practical Australian founder operating guide for the first 90 days, with evidence-based experiments, decision gates and a private in-browser experiment ledger.";
const HERO_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-56ed48a4-989a-4c7a-902a-a4d660355998.jpg?alt=media&token=9f5d6e18-cf07-44dd-b1e2-b211e059cccf";
const HERO_IMAGE_ALT =
  "Founder reviewing customer evidence and a 90-day operating plan at a desk";

interface FAQ {
  id: number;
  question: string;
  answer: ReactNode;
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: "What does an entrepreneur actually do?",
    answer:
      "An entrepreneur turns uncertainty into decisions: choose a customer problem, test assumptions, assemble people and resources, deliver an offer, learn from evidence and decide what to continue, change or stop.",
  },
  {
    id: 2,
    question: "What should a first-time founder do first?",
    answer:
      "Write one falsifiable customer-and-problem assumption, identify people who genuinely experience it and run the smallest ethical test that could change your decision.",
  },
  {
    id: 3,
    question: "Do I need to register a company before testing an idea?",
    answer:
      "Not every early conversation requires a company, but trading, contracts, tax, liability, licences, ownership and hiring can create obligations. Use official Australian registration guidance and get professional advice for your circumstances before making structural commitments.",
  },
  {
    id: 4,
    question: "What belongs in a 90-day founder plan?",
    answer:
      "A useful plan names the riskiest assumptions, experiments, success signals, customer commitments, delivery milestones, cash constraints, owners and decision dates. It should change when evidence changes.",
  },
  {
    id: 5,
    question: "How is evidence different from positive feedback?",
    answer:
      "Compliments describe an opinion. Stronger evidence shows behaviour or commitment: sharing real workflow data safely, introducing a decision-maker, signing a pilot, paying, using the product or returning repeatedly.",
  },
  {
    id: 6,
    question: "Is this guide legal, tax or financial advice?",
    answer:
      "No. It is a general operating guide. Business structure, tax, employment, privacy and intellectual-property decisions depend on the facts, so use the linked regulators and qualified advisers.",
  },
];

export const articleMeta = {
  title: TOPIC,
  topic: TOPIC,
  category: CATEGORY,
  slug: SLUG,
  description: DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  image: HERO_IMAGE,
  imageAlt: HERO_IMAGE_ALT,
  featuredFocus: "startups",
};

const REFERENCES = [
  {
    id: 1,
    href: "https://business.gov.au/Guide/Starting",
    title: "Guide to starting a business",
    publisher: "business.gov.au",
    description:
      "Australian Government sequence for readiness, planning, registration, finances, customers, hiring and protection.",
    category: "government",
  },
  {
    id: 2,
    href: "https://business.gov.au/planning/business-structures-and-types/business-structures/choose-your-business-structure",
    title: "Choose your business structure",
    publisher: "business.gov.au",
    description:
      "Official comparison of common structures and the legal, tax, liability and administration factors to consider.",
    category: "government",
  },
  {
    id: 3,
    href: "https://business.gov.au/registrations",
    title: "Business registrations",
    publisher: "business.gov.au",
    description:
      "Official starting point for ABN, business name, company, tax, licence, permit, trade mark and domain registrations.",
    category: "government",
  },
  {
    id: 4,
    href: "https://www.ato.gov.au/businesses-and-organisations/preparing-lodging-and-paying/record-keeping-for-business",
    title: "Record keeping for business",
    publisher: "Australian Taxation Office",
    description:
      "Australian business record-keeping requirements and supporting guidance.",
    category: "government",
  },
  {
    id: 5,
    href: "https://www.ipaustralia.gov.au/tools-and-research/business-resources/ip-basics",
    title: "Intellectual property basics",
    publisher: "IP Australia",
    description:
      "Official factsheets covering trade marks, patents, design rights and commercialisation.",
    category: "government",
  },
  {
    id: 6,
    href: "https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/small-business",
    title: "Small business privacy guidance",
    publisher: "Office of the Australian Information Commissioner",
    description:
      "Official checklist for whether the Privacy Act covers a small business and the obligations that may follow.",
    category: "government",
  },
  {
    id: 7,
    href: "https://www.fairwork.gov.au/tools-and-resources/best-practice-guides/small-business-and-the-fair-work-act",
    title: "Small business and the Fair Work Act",
    publisher: "Fair Work Ombudsman",
    description:
      "Official employment obligations, best-practice checklist and help for small businesses.",
    category: "government",
  },
] as const;

function DecisionGate({
  decision,
  evidence,
  avoid,
}: {
  decision: string;
  evidence: string;
  avoid: string;
}) {
  return (
    <section className="rounded-[22px] border border-gray-300 bg-white p-5">
      <h3 className="m-0 text-lg font-black text-gray-950">{decision}</h3>
      <p className="mt-3 text-sm leading-6 text-gray-700">
        <strong>Look for:</strong> {evidence}
      </p>
      <p className="mt-2 text-sm leading-6 text-gray-700">
        <strong>Do not substitute:</strong> {avoid}
      </p>
    </section>
  );
}

export default function ArticleContent() {
  return (
    <>
      <ArticleHeroHeader
        breadcrumbs={[
          { label: "Home", href: "/", icon: Home },
          { label: "Articles", href: "/articles" },
          { label: TOPIC, current: true },
        ]}
        title={TOPIC}
        titleHighlight="Entrepreneur"
        headerBgColor="cyan"
        summary={{
          heading: "The job in one loop",
          intro:
            "An entrepreneur repeatedly converts assumptions into evidence and evidence into a decision.",
          items: [
            {
              label: "Choose",
              description:
                "Name a specific customer, problem and assumption that could be wrong.",
            },
            {
              label: "Test",
              description:
                "Run the smallest ethical experiment that can change the decision.",
            },
            {
              label: "Decide",
              description:
                "Continue, change or stop—and record why before starting the next cycle.",
            },
          ],
        }}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <section
          aria-labelledby="entrepreneur-answer-heading"
          className="not-prose my-8 rounded-[28px] border-2 border-gray-950 bg-[#fefc22] p-6 sm:p-8"
        >
          <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-700">
            Direct answer
          </p>
          <h2
            id="entrepreneur-answer-heading"
            className="mt-3 text-3xl font-black tracking-tight text-gray-950"
          >
            The work is deciding what deserves the next dollar and day.
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-900">
            Founders talk to customers, build and sell—but the deeper job is
            allocating scarce time, money and trust under uncertainty. A useful
            first 90 days therefore produces evidence and decisions, not merely
            a logo, feature list or long business plan.
          </p>
        </section>

        <h2>Before day one: define the constraint</h2>
        <p>
          Begin with the runway and responsibility you actually have. Write down
          the hours and money you can risk, income you still need, caring or
          health constraints, and the date you will review the commitment. The{" "}
          <a
            href="https://business.gov.au/Guide/Starting"
            target="_blank"
            rel="noreferrer noopener"
          >
            Australian Government starting guide
          </a>{" "}
          treats personal readiness, business definition and planning as
          separate steps for good reason: enthusiasm does not remove practical
          obligations.
        </p>
        <p>
          Then write one sentence that can be disproved:
        </p>
        <blockquote>
          We believe [specific customer] experiences [specific problem] often
          enough to commit [money, time, access or behaviour] to [proposed
          outcome].
        </blockquote>
        <p>
          “Everyone needs this” cannot be tested. “Independent allied-health
          clinics with more than five practitioners lose at least three hours a
          week reconciling referrals” can be investigated.
        </p>

        <h2>Days 1–10: investigate the problem, not your pitch</h2>
        <p>
          Recruit people who have recently experienced the workflow. Ask about a
          specific occasion: what triggered it, what they did, what it cost,
          what they tried and who controls a purchase. Avoid explaining your
          solution until you understand the current behaviour.
        </p>

        <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
          <section className="rounded-[24px] border border-gray-300 bg-white p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#4b1bd1]">
              Useful prompt
            </p>
            <h3 className="mt-2 text-xl font-black text-gray-950">
              “Tell me about the last time this happened.”
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-700">
              Follow the sequence, tools, workarounds, delay, people involved
              and consequence. Recent behaviour is more informative than a
              prediction about a hypothetical product.
            </p>
          </section>
          <section className="rounded-[24px] border border-gray-300 bg-orange-100 p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-900">
              Weak prompt
            </p>
            <h3 className="mt-2 text-xl font-black text-gray-950">
              “Would you use my AI platform?”
            </h3>
            <p className="mt-3 text-sm leading-6 text-gray-700">
              It reveals the concept, invites politeness and leaves price,
              urgency and decision authority undefined.
            </p>
          </section>
        </div>

        <p>
          Summarise repeated facts, contradictions and unknowns. Do not turn
          three similar conversations into a market statistic. The output of
          this phase is a narrower assumption and a list of people willing to
          continue—not proof of demand.
        </p>

        <h2>Days 11–30: test a commitment before a build</h2>
        <p>
          Choose the smallest test that exposes the riskiest assumption. That
          could be a paid diagnostic, manually delivered service, letter of
          intent, prototype review with the actual decision-maker, or a
          time-boxed pilot. Set the success signal before running it so the
          result cannot be rewritten afterwards.
        </p>

        <div className="not-prose my-8 grid gap-4 lg:grid-cols-3">
          <DecisionGate
            decision="Problem decision"
            evidence="Recent examples, measurable consequence and an owner actively trying to improve it."
            avoid="Broad survey interest or agreement that the topic sounds important."
          />
          <DecisionGate
            decision="Offer decision"
            evidence="A customer accepts a defined outcome, price or meaningful next commitment."
            avoid="Feature requests from someone with no buying or adoption role."
          />
          <DecisionGate
            decision="Delivery decision"
            evidence="You can produce the outcome safely at a cost and effort the model can support."
            avoid="A polished demo that has never touched the real workflow."
          />
        </div>

        <h3>Two illustrative experiment designs</h3>
        <p>
          These examples show the structure; they are not MLAI case-study
          results.
        </p>
        <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-gray-300">
          <table className="w-full min-w-[760px] border-collapse bg-white text-left text-sm">
            <thead className="bg-gray-950 text-white">
              <tr>
                <th className="p-4 font-black">Assumption</th>
                <th className="p-4 font-black">Test</th>
                <th className="p-4 font-black">Pre-set signal</th>
                <th className="p-4 font-black">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              <tr>
                <td className="p-4 align-top">
                  Clinic managers will pay to reduce referral triage time.
                </td>
                <td className="p-4 align-top">
                  Offer a two-week, manually operated pilot with a defined
                  privacy boundary and baseline measurement.
                </td>
                <td className="p-4 align-top">
                  At least two qualified clinics sign the same paid pilot and
                  provide approved test data.
                </td>
                <td className="p-4 align-top">
                  Continue only if the commitment and delivery constraint are
                  both met.
                </td>
              </tr>
              <tr>
                <td className="p-4 align-top">
                  Technical founders need help producing investor updates.
                </td>
                <td className="p-4 align-top">
                  Run a concierge update session from approved company evidence
                  rather than building automation first.
                </td>
                <td className="p-4 align-top">
                  Three founders return the next month and independently use the
                  output with stakeholders.
                </td>
                <td className="p-4 align-top">
                  Change the audience or workflow if usage does not repeat.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <FounderExperimentLedger />

        <h2>Days 31–60: deliver the outcome manually and measure it</h2>
        <p>
          A manual or partly manual service can expose missing permissions,
          edge cases, support work and adoption friction before software hides
          them. Define the baseline, target, test period, owner and failure
          condition. Record both the claimed outcome and the independently
          verified outcome.
        </p>
        <p>
          For an AI workflow, this is also when to map the data, integrations,
          human approval points and recovery path. If the output affects people,
          money, access or reputation, decide who can challenge and override it.
          Do not put real personal or confidential information into an
          unapproved public AI tool.
        </p>

        <h3>A proposed weekly operating rhythm</h3>
        <p>
          This is a planning template, not a measurement of how successful
          founders spend their time:
        </p>
        <ul>
          <li>
            <strong>Monday:</strong> choose one decision and the evidence needed.
          </li>
          <li>
            <strong>Tuesday–Thursday:</strong> talk, sell, deliver and observe.
          </li>
          <li>
            <strong>Friday:</strong> reconcile cash, review evidence, record
            risks and make the continue/change/stop decision.
          </li>
        </ul>
        <p>
          Protect time for customer work. A week filled entirely with tooling,
          branding and internal planning can feel productive while leaving the
          main assumption untouched.
        </p>

        <h2>Days 61–90: decide what becomes a business</h2>
        <p>
          By day 90, aim to answer four questions honestly:
        </p>
        <ol>
          <li>
            Does a defined customer experience the problem with enough
            consequence and frequency?
          </li>
          <li>
            Have customers made a meaningful commitment to the proposed
            outcome?
          </li>
          <li>
            Can you deliver that outcome safely, repeatedly and within a viable
            cost envelope?
          </li>
          <li>
            Do the founders still want to pursue it under the actual
            constraints?
          </li>
        </ol>
        <p>
          “Stop” is a valid evidence-based decision. “Change” should specify
          which assumption changed. “Continue” should name the next risk rather
          than simply authorise more building.
        </p>

        <h2>Australian setup: use decision gates, not a generic checklist</h2>
        <p>
          Formal steps depend on what you are doing. The official{" "}
          <a
            href="https://business.gov.au/Guide/Starting"
            target="_blank"
            rel="noreferrer noopener"
          >
            guide to starting a business
          </a>{" "}
          covers readiness, structure, planning, registration, finances,
          customers, hiring and protection. Use it as the source of truth, then
          get legal, accounting or other professional advice where the choice
          depends on your circumstances.
        </p>

        <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Before trading or signing",
              text: "Check structure, personal liability, contracts, ABN, business name, tax registrations, licences and insurance. Do not choose a company simply because it sounds more like a startup.",
              href: "https://business.gov.au/planning/business-structures-and-types/business-structures/choose-your-business-structure",
              label: "Compare business structures",
            },
            {
              title: "Before taking money",
              text: "Set up invoicing, cash tracking and records. Separate founder assumptions from money the business can actually spend.",
              href: "https://www.ato.gov.au/businesses-and-organisations/preparing-lodging-and-paying/record-keeping-for-business",
              label: "Read ATO record-keeping guidance",
            },
            {
              title: "Before sharing or commissioning IP",
              text: "Write down who owns existing and newly created work. Consider confidentiality and the relevant IP right before disclosing sensitive material.",
              href: "https://www.ipaustralia.gov.au/tools-and-research/business-resources/ip-basics",
              label: "Use IP Australia’s resources",
            },
            {
              title: "Before collecting people’s data",
              text: "Check whether the Privacy Act covers the business, what other rules apply, what is necessary to collect and how it will be protected.",
              href: "https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/small-business",
              label: "Use the OAIC small-business checklist",
            },
            {
              title: "Before hiring or using contractors",
              text: "Understand workplace obligations and do not assume an ABN or contract label determines the legal relationship.",
              href: "https://www.fairwork.gov.au/find-help-for/independent-contractors",
              label: "Check Fair Work guidance",
            },
            {
              title: "Before dividing founder equity",
              text: "Document roles, time, decision rights, vesting approach, departures and IP ownership with qualified advice before conflict makes the conversation harder.",
              href: "/articles/featured/how-to-test-for-a-cofounder-values-match-before-you-commit",
              label: "Test the cofounder relationship",
              internal: true,
            },
          ].map((gate) => (
            <section
              key={gate.title}
              className="rounded-[22px] border border-gray-300 bg-white p-5"
            >
              <h3 className="m-0 text-lg font-black text-gray-950">
                {gate.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                {gate.text}
              </p>
              {gate.internal ? (
                <Link
                  to={gate.href}
                  className="mt-4 inline-block text-sm font-black text-[#4b1bd1] underline decoration-2 underline-offset-4"
                >
                  {gate.label}
                </Link>
              ) : (
                <a
                  href={gate.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-4 inline-block text-sm font-black text-[#4b1bd1] underline decoration-2 underline-offset-4"
                >
                  {gate.label}
                </a>
              )}
            </section>
          ))}
        </div>

        <h2>What to record each month</h2>
        <p>
          Keep one evidence trail rather than rebuilding the story for each
          investor, adviser or teammate:
        </p>
        <ul>
          <li>customer problem and segment changes;</li>
          <li>experiments, pre-set signals, results and decisions;</li>
          <li>revenue, cash, runway and material commitments;</li>
          <li>product usage and verified customer outcomes;</li>
          <li>risks, incidents, assumptions and help needed; and</li>
          <li>the next milestone and accountable owner.</li>
        </ul>
        <p>
          This is the foundation for a useful company plan and stakeholder
          update. For a deeper customer-acquisition sequence, continue with{" "}
          <Link to="/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026">
            how to get your first customers
          </Link>
          .
        </p>

        <aside className="not-prose my-10 rounded-[28px] bg-gray-950 p-6 text-white sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00ffd7]">
            Method, limitations and disclosure
          </p>
          <h2 className="mt-3 text-2xl font-black">
            This is an operating framework, not a founder-performance study
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-200">
            <li>
              <strong className="text-white">Source method:</strong> Australian
              registration, structure, tax-record, privacy, workplace and IP
              handoffs were checked against regulator or government guidance on
              28 July 2026.
            </li>
            <li>
              <strong className="text-white">Original asset:</strong> MLAI built
              the local experiment ledger, decision gates and 90-day framework
              for this page. The tool does not submit entries to MLAI.
            </li>
            <li>
              <strong className="text-white">Limit:</strong> MLAI has not yet
              completed the planned diary/interview study with Australian
              founders. The weekly rhythm is labelled as a proposed template,
              and the worked experiments are illustrative rather than results.
            </li>
            <li>
              <strong className="text-white">AI assistance:</strong> this July
              2026 revision used AI-assisted research, drafting and code
              generation. A named human subject reviewer is still required
              before MLAI declares the article final or scores it 80+.
            </li>
            <li>
              <strong className="text-white">Advice boundary:</strong> this
              article is general information, not legal, tax, employment,
              privacy or financial advice.
            </li>
          </ul>
        </aside>

        <ArticleReferences
          references={[...REFERENCES]}
          heading="Australian primary sources"
          description="Official handoffs checked for this 28 July 2026 revision."
          previewCount={4}
        />

        <div className="mt-12">
          <ArticleFAQ
            items={faqItems}
            heading="First-founder questions"
          />
        </div>
      </div>
    </>
  );
}
