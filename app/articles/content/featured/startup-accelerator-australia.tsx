import type { ReactNode } from "react";
import { Home } from "lucide-react";
import { Link } from "react-router";

import AcceleratorFitScorecard from "~/components/articles/AcceleratorFitScorecard";
import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleReferences } from "~/components/articles/ArticleReferences";
import {
  ACCELERATOR_DATASET_OWNER,
  ACCELERATOR_DATASET_REVIEW_CADENCE,
  ACCELERATOR_DATASET_VERIFIED_AT,
  AUSTRALIAN_ACCELERATOR_PROGRAMS,
} from "~/lib/australian-accelerator-programs";

export const useCustomHeader = true;

const TOPIC = "Australian Startup Accelerators: A Verified 2026 Program Finder";
export const CATEGORY = "featured";
export const SLUG = "startup-accelerator-australia";
export const DATE_PUBLISHED = "2026-01-10";
export const DATE_MODIFIED = "2026-07-29";
export const DESCRIPTION =
  "Compare verified Australian startup accelerators by stage, format, duration, published terms and intake status, then use MLAI’s interactive fit scorecard.";
const HERO_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-b4a9a55e-4254-4bb3-9eed-5b80dfbc4432.jpg?alt=media&token=54ee6558-bb42-4528-812c-7377691e9f9f";
const HERO_IMAGE_ALT =
  "Australian founders comparing accelerator eligibility, terms and program commitments";

interface FAQ {
  id: number;
  question: string;
  answer: ReactNode;
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: "Which startup accelerator is best in Australia?",
    answer:
      "There is no universal best program. The useful comparison is whether a program matches your current constraint, stage, eligibility, sector, time capacity and acceptable economic terms. The finder and scorecard on this page make those trade-offs explicit.",
  },
  {
    id: 2,
    question: "Do Australian startup accelerators take equity?",
    answer:
      "Some do and some do not. Google’s Australia and New Zealand program publishes equity-free support, while Startmate, UNSW 10x and EnergyLab publish investment structures. Read the current offer documents because a headline amount does not show every right, condition or future dilution effect.",
  },
  {
    id: 3,
    question: "Can I join an accelerator before I have a company?",
    answer:
      "It depends. Antler targets founders around inception and pre-seed, while programs such as UNSW 10x and CSIRO ON publish specific company, research, affiliation or intellectual-property conditions. Check every eligibility rule before investing time in an application.",
  },
  {
    id: 4,
    question: "Are Australian accelerators online or in person?",
    answer:
      "Both models exist, and “hybrid” can still include mandatory travel or workshops. Confirm the exact attendance calendar, city, travel cost and founder-time expectation directly with the program.",
  },
  {
    id: 5,
    question: "How should I compare accelerator investment terms?",
    answer:
      "Separate cash, valuation or SAFE mechanics, estimated ownership, fees, follow-on rights, participation conditions and the cost of founder time. Have qualified legal and financial advisers review the actual documents for your company.",
  },
  {
    id: 6,
    question: "Does this page count every Australian accelerator?",
    answer:
      "No. It is a verified shortlist, not a national census or ranking. MLAI includes programs with a live first-party page, clear Australian eligibility and structured founder or research-commercialisation support. The method and current limitations are published below.",
  },
  {
    id: 7,
    question: "What about accelerators in Singapore?",
    answer:
      "Use Singapore’s official Startup SG program and ecosystem directories, then verify the current program site and eligibility. Do not rely on an unsourced total: accelerator, incubator, venture studio, investor and coworking listings use different inclusion rules.",
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
    href: "https://www.startmate.com/accelerator/program",
    title: "Startmate Accelerator",
    publisher: "Startmate",
    description:
      "Current program duration, published investment structure, selection process and next cohort information.",
    category: "industry",
  },
  {
    id: 2,
    href: "https://startup.google.com/programs/accelerator/australia-new-zealand/",
    title: "Google for Startups Accelerator: Australia and New Zealand",
    publisher: "Google for Startups",
    description:
      "Current stage, format, duration, equity position, benefits and 2026 cohort dates.",
    category: "industry",
  },
  {
    id: 3,
    href: "https://unswfounders.com/10x-accelerator",
    title: "UNSW Founders 10x Accelerator",
    publisher: "UNSW Founders",
    description:
      "Current eligibility, investment structure, program benefits and 2026/2027 application status.",
    category: "industry",
  },
  {
    id: 4,
    href: "https://www.csiro.au/en/work-with-us/funding-programs/Innovation-programs/ON-Accelerate",
    title: "CSIRO ON Accelerate",
    publisher: "CSIRO",
    description:
      "Official research-commercialisation eligibility, program design, non-dilutive support and current application dates.",
    category: "government",
  },
  {
    id: 5,
    href: "https://energylab.org.au/programs/acceleration/",
    title: "Climate Solutions Accelerator",
    publisher: "EnergyLab",
    description:
      "Current climate-tech criteria, program calendar, investment range and 2027 expression-of-interest status.",
    category: "industry",
  },
  {
    id: 6,
    href: "https://www.unimelb.edu.au/mec/MECPrograms/melbourne-accelerator-program",
    title: "MAP Accelerator",
    publisher: "University of Melbourne",
    description:
      "Current published funding, support and three eligibility pathways.",
    category: "guide",
  },
  {
    id: 7,
    href: "https://www.antler.co/location/australia",
    title: "Antler in Australia",
    publisher: "Antler",
    description:
      "Current Australian residency duration, stage, cadence and application path.",
    category: "industry",
  },
  {
    id: 8,
    href: "https://launchvic.org/programs/",
    title: "LaunchVic programs",
    publisher: "LaunchVic",
    description:
      "Victorian Government-backed discovery point for startup programs and current opportunities.",
    category: "government",
  },
  {
    id: 9,
    href: "https://www.startupsg.gov.sg/programmes",
    title: "Startup SG programmes",
    publisher: "Startup SG",
    description:
      "Official Singapore program discovery page for founders comparing market-entry or local support.",
    category: "government",
  },
  {
    id: 10,
    href: "https://startup.google.com/programs/accelerator/singapore/",
    title: "Google for Startups Accelerator: Singapore",
    publisher: "Google for Startups",
    description:
      "Example of a current Singapore program whose official page publishes local-base, stage, format and equity requirements.",
    category: "industry",
  },
] as const;

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
        titleHighlight="Startup Accelerators"
        headerBgColor="cyan"
        summary={{
          heading: "Choose on evidence, not reputation",
          intro:
            "A useful accelerator should remove a specific company constraint at acceptable economic and time cost.",
          items: [
            {
              label: "Seven verified pathways",
              description:
                "The current dataset spans generalist, AI, university, research, climate and inception-stage programs.",
            },
            {
              label: "Terms are not comparable headlines",
              description:
                "Equity-free support, post-money investment and uncapped discounted SAFEs create different trade-offs.",
            },
            {
              label: "Status changes quickly",
              description:
                "Every row links to the first-party source and shows when MLAI last checked it.",
            },
          ],
        }}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <section
          aria-labelledby="accelerator-direct-answer"
          className="not-prose my-8 rounded-[28px] border-2 border-gray-950 bg-[#fefc22] p-6 sm:p-8"
        >
          <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-700">
            Direct answer
          </p>
          <h2
            id="accelerator-direct-answer"
            className="mt-3 text-3xl font-black tracking-tight text-gray-950"
          >
            Shortlist the program that matches your next constraint.
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-900">
            Startmate may suit an early startup seeking capital and fundraising
            access; Google’s program targets Seed-to-Series-A AI/ML companies;
            CSIRO ON targets research translation; EnergyLab targets climate
            solutions; Antler starts around company formation. Those are
            different jobs. Apply only when the program’s job matches yours.
          </p>
        </section>

        <p>
          This page is a maintained shortlist, not a ranking of the “best”
          accelerators and not a claim to count every program in Australia. The
          old version mixed stale descriptions with instructions to “check the
          official page”. The replacement records what the official page
          actually said, when it was checked and which important facts remain
          unstated.
        </p>

        <h2>Verified Australian accelerator finder</h2>
        <p>
          The table was checked on 29 July 2026. Application windows and offer
          terms can change without notice, so open the source before applying
          or accepting. “Published terms” is not a substitute for the legal
          documents offered to your company.
        </p>

        <div className="not-prose my-8 space-y-5">
          {AUSTRALIAN_ACCELERATOR_PROGRAMS.map((program) => (
            <section
              key={program.name}
              className="rounded-[24px] border border-gray-300 bg-white p-5 sm:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#4b1bd1]">
                    {program.kind}
                  </p>
                  <h3 className="mt-2 text-xl font-black text-gray-950">
                    {program.name}
                  </h3>
                </div>
                <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-900">
                  Checked {program.lastVerified}
                </span>
              </div>

              <dl className="mt-5 grid gap-4 text-sm leading-6 md:grid-cols-2">
                <div>
                  <dt className="font-black text-gray-950">Best for</dt>
                  <dd className="mt-1 text-gray-700">{program.bestFor}</dd>
                </div>
                <div>
                  <dt className="font-black text-gray-950">
                    Location and format
                  </dt>
                  <dd className="mt-1 text-gray-700">
                    {program.locationFormat}
                  </dd>
                </div>
                <div>
                  <dt className="font-black text-gray-950">Duration</dt>
                  <dd className="mt-1 text-gray-700">{program.duration}</dd>
                </div>
                <div>
                  <dt className="font-black text-gray-950">
                    Published cash/equity position
                  </dt>
                  <dd className="mt-1 text-gray-700">
                    {program.publishedTerms}
                  </dd>
                </div>
                <div>
                  <dt className="font-black text-gray-950">Current intake</dt>
                  <dd className="mt-1 text-gray-700">
                    {program.currentIntake}
                  </dd>
                </div>
                <div>
                  <dt className="font-black text-gray-950">
                    Eligibility signal
                  </dt>
                  <dd className="mt-1 text-gray-700">
                    {program.eligibilitySignal}
                  </dd>
                </div>
              </dl>

              <a
                href={program.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-block text-sm font-black text-[#4b1bd1] underline decoration-2 underline-offset-4"
              >
                Verify at {program.sourceLabel}
              </a>
            </section>
          ))}
        </div>

        <aside className="not-prose my-8 rounded-2xl border border-gray-300 bg-white p-5 text-sm text-gray-700">
          <p className="font-black text-gray-950">Dataset maintenance</p>
          <p className="mt-2 leading-6">
            Owner: {ACCELERATOR_DATASET_OWNER}. Last verified:{" "}
            {ACCELERATOR_DATASET_VERIFIED_AT}. Planned review cadence:{" "}
            {ACCELERATOR_DATASET_REVIEW_CADENCE}. A row is retained only while
            its first-party source remains live and the program’s Australian
            eligibility can be verified.
          </p>
        </aside>

        <h2>How to compare terms that look similar</h2>
        <p>
          Do not compare programs using the cheque alone. Startmate currently
          publishes A$120,000 at a A$1.5 million post-money valuation for
          founders without a qualifying previous raise. In a deliberately
          simplified calculation, A$120,000 divided by A$1.5 million is 8%.
          That helps a founder ask the right question, but the SAFE, other
          securities and future financing can change the final ownership
          outcome.
        </p>
        <p>
          UNSW 10x publishes a different instrument: a A$100,000 pre-money SAFE
          with a 15% discount and no valuation cap. You cannot derive a final
          ownership percentage from those three facts alone because the future
          priced round and the complete SAFE terms matter. Google and MAP
          publish equity-free support, while CSIRO describes non-dilutive
          support and retained IP. These offers solve different problems and
          create different obligations.
        </p>

        <div className="not-prose my-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Economic cost",
              body: "Cash, equity or SAFE mechanics, fees, follow-on rights, pro-rata rights, credits and conditions.",
            },
            {
              title: "Operating cost",
              body: "Founder weeks, travel, preparation, customer disruption and work expected outside sessions.",
            },
            {
              title: "Opportunity value",
              body: "Specific access to customers, expertise, infrastructure, co-founders or capital you cannot obtain more efficiently elsewhere.",
            },
          ].map((item) => (
            <section
              key={item.title}
              className="rounded-[22px] border border-gray-300 bg-white p-5"
            >
              <h3 className="m-0 text-lg font-black text-gray-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                {item.body}
              </p>
            </section>
          ))}
        </div>

        <p>
          This is general educational information, not legal, tax, financial or
          investment advice. Have qualified advisers review the actual offer
          documents and cap-table consequences for your company.
        </p>

        <AcceleratorFitScorecard />

        <h2>Use alumni evidence before accepting</h2>
        <p>
          A portfolio logo shows that a company participated; it does not prove
          the program created the outcome. Find alumni at a similar stage and
          in a similar sector, including at least one founder who did not become
          a headline success. Ask:
        </p>
        <ol>
          <li>What was your company’s main constraint before the program?</li>
          <li>
            Which promised introductions, coaching or technical support
            materially happened?
          </li>
          <li>
            What did founders have to do between sessions, and what customer
            work was displaced?
          </li>
          <li>
            What did you misunderstand about the investment, equity, SAFE,
            follow-on rights or fundraising process?
          </li>
          <li>
            Which measurable result would probably not have happened without
            the program?
          </li>
          <li>Knowing the outcome, would you accept the same terms again?</li>
        </ol>
        <p>
          Record the answer as evidence, not a testimonial. If every
          introduction is vague, every outcome is attributed to the program and
          no alumnus will discuss trade-offs, keep investigating.
        </p>

        <h2>What an AI startup should verify</h2>
        <p>
          AI startups need the ordinary commercial fit plus technical and
          governance fit. Before applying, identify the specific help you need:
          evaluation design, infrastructure cost, data access, security,
          deployment, sales, regulation or hiring. A broad promise of “AI
          mentors” is not enough.
        </p>
        <ul>
          <li>
            Name the model or system constraint the program could help remove.
          </li>
          <li>
            Ask which technical experts and customer partners are committed to
            the cohort.
          </li>
          <li>
            Confirm whether cloud credits have separate eligibility, expiry or
            product restrictions.
          </li>
          <li>
            Keep customer, personal, confidential and proprietary data out of
            unapproved application or mentor tools.
          </li>
          <li>
            Set one verified product or customer outcome for the program—not
            simply a demo-day pitch.
          </li>
        </ul>

        <h2>Singapore and overseas programs: verify access, not a count</h2>
        <p>
          The retired audit target asked how many accelerators and incubators
          operate in Singapore, then published an unsupported range. MLAI has
          removed that number from this maintained resource. Counts change with
          the definition of accelerator, incubator, investor, venture studio,
          university program and coworking hub.
        </p>
        <p>
          An Australian founder considering Singapore should start with the{" "}
          <a
            href="https://www.startupsg.gov.sg/programmes"
            target="_blank"
            rel="noreferrer noopener"
          >
            official Startup SG programmes page
          </a>{" "}
          and its ecosystem directory, then verify the program itself. For
          example, Google’s current Singapore accelerator page describes a
          three-month, mostly in-person, equity-free program for Singapore-based
          Seed-to-Series-B technology startups. “Available in Singapore” does
          not mean an Australian company is eligible without a local base or
          other conditions.
        </p>

        <h2>A seven-day accelerator decision process</h2>
        <ol>
          <li>
            <strong>Day 1:</strong> write the one company constraint the program
            must change.
          </li>
          <li>
            <strong>Day 2:</strong> eliminate programs that fail a published
            eligibility, timing or sector requirement.
          </li>
          <li>
            <strong>Day 3:</strong> obtain the complete current terms and
            attendance calendar.
          </li>
          <li>
            <strong>Days 4–5:</strong> interview two relevant alumni and one
            founder who chose another path.
          </li>
          <li>
            <strong>Day 6:</strong> compare the program with spending the same
            time on customers, a grant, advice or fundraising.
          </li>
          <li>
            <strong>Day 7:</strong> set the accept/decline rule, then decide
            whether the application is worth completing.
          </li>
        </ol>
        <p>
          Use MLAI’s{" "}
          <Link to="/articles/featured/what-an-entrepreneur-does-and-how-to-start-well">
            first-founder experiment ledger
          </Link>{" "}
          to record the constraint, evidence and decision. Founder Tools can
          then turn the company evidence into a plan and stakeholder update,
          while MLAI events provide a place to compare first-hand experiences
          with other Australian founders.
        </p>

        <aside className="not-prose my-10 rounded-[28px] bg-gray-950 p-6 text-white sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00ffd7]">
            Method, changelog, limitations and disclosure
          </p>
          <h2 className="mt-3 text-2xl font-black">
            A verified shortlist, not a ranking or national census
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-200">
            <li>
              <strong className="text-white">Inclusion rule:</strong> a live
              first-party page, clear Australian eligibility and structured
              cohort, residency or research-commercialisation support for
              founders.
            </li>
            <li>
              <strong className="text-white">Exclusions:</strong> generic
              coworking, venture funds without a structured program, dormant
              pages, short competitions and programs whose current Australian
              access could not be verified.
            </li>
            <li>
              <strong className="text-white">Verification:</strong> all seven
              rows were checked against program-owned or government/university
              pages on 29 July 2026. Unstated format or investment details are
              labelled rather than inferred.
            </li>
            <li>
              <strong className="text-white">Changelog:</strong> this revision
              replaces the four-name list, removes the fake download and
              unsupported Singapore count, adds a typed program dataset and
              publishes the maintenance owner and cadence.
            </li>
            <li>
              <strong className="text-white">Original asset:</strong> MLAI built
              the program dataset and eight-factor fit scorecard for this page.
              The scorecard does not submit or store responses.
            </li>
            <li>
              <strong className="text-white">Current limit:</strong> MLAI has not
              yet completed the required interviews with accelerator alumni or
              obtained a named human subject review. This page should not be
              declared final or scored 80+ until those gates are complete.
            </li>
            <li>
              <strong className="text-white">AI assistance:</strong> AI tools
              assisted research, drafting and code generation. Each volatile
              program claim was checked against the linked first-party source.
            </li>
          </ul>
        </aside>

        <ArticleReferences
          references={[...REFERENCES]}
          heading="First-party program sources"
          description="Sources checked for the 29 July 2026 dataset."
          previewCount={5}
        />

        <div className="mt-12">
          <ArticleFAQ
            items={faqItems}
            heading="Australian accelerator questions"
          />
        </div>
      </div>
    </>
  );
}
