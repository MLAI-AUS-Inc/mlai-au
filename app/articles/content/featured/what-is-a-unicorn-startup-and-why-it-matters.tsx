import type { ReactNode } from "react";
import { Home } from "lucide-react";
import { Link } from "react-router";

import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleReferences } from "~/components/articles/ArticleReferences";
import UnicornValuationCalculator from "~/components/articles/UnicornValuationCalculator";
import {
  AUSTRALIAN_UNICORN_EVIDENCE,
  UNICORN_DATASET_OWNER,
  UNICORN_DATASET_REVIEW_CADENCE,
  UNICORN_DATASET_VERIFIED_AT,
} from "~/lib/australian-unicorn-evidence";

export const useCustomHeader = true;

const TOPIC =
  "What Is a Unicorn Startup? Australian Examples and a Valuation Calculator";
export const CATEGORY = "featured";
export const SLUG = "what-is-a-unicorn-startup-and-why-it-matters";
export const DATE_PUBLISHED = "2026-04-23";
export const DATE_MODIFIED = "2026-07-29";
export const DESCRIPTION =
  "Understand the US$1 billion unicorn threshold, inspect five sourced Australian valuation events, and model dilution in a transparent founder calculator.";
const HERO_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d806828c-a396-45ac-899e-2757423ebb86.jpg?alt=media&token=68db8b05-de8f-473e-aff2-f3bc4ecec96a";
const HERO_IMAGE_ALT =
  "Australian startup founders checking a valuation and ownership scenario";

interface FAQ {
  id: number;
  question: string;
  answer: ReactNode;
}

export const faqItems: FAQ[] = [
  {
    id: 1,
    question: "What is a unicorn startup?",
    answer:
      "In common current usage, a unicorn is a privately held startup with a valuation of at least US$1 billion. The valuation is a dated estimate or transaction term, not cash in the bank and not proof of profitability.",
  },
  {
    id: 2,
    question: "Does a US$1 billion valuation mean the company received US$1 billion?",
    answer:
      "No. A funding round may invest a much smaller amount at a negotiated company valuation. In a secondary sale, cash generally goes to the selling shareholder rather than the company.",
  },
  {
    id: 3,
    question: "What is the difference between pre-money and post-money valuation?",
    answer:
      "In a simple primary priced round, pre-money is the negotiated company value immediately before the new investment and post-money is pre-money plus the new primary cash. Real documents can add option-pool, security and preference effects.",
  },
  {
    id: 4,
    question: "Can a startup lose unicorn status?",
    answer:
      "Yes. A later priced round, secondary transaction, impairment, acquisition or public listing can make the old label stale or no longer applicable. When no current price is disclosed, the honest status is unknown.",
  },
  {
    id: 5,
    question: "Which Australian-founded startups have had unicorn valuations?",
    answer:
      "This page documents explicit US-dollar valuation events for Airwallex, Canva, Culture Amp, Go1 and Linktree. It is a verified sample, not a complete or current ranking of Australian unicorns.",
  },
  {
    id: 6,
    question: "How does MLAI handle Australian-dollar valuations?",
    answer:
      "The core evidence table requires a source that explicitly states at least US$1 billion. MLAI does not use a live or historical exchange-rate conversion to push an ambiguous Australian-dollar announcement over the threshold.",
  },
  {
    id: 7,
    question: "Is the dilution calculator financial advice?",
    answer:
      "No. It is a simplified educational model for a primary priced round. It excludes option-pool changes, SAFEs, convertible notes, preferences, debt, tax and secondary transactions. Founders should obtain qualified advice on their actual documents.",
  },
];

export const summaryHighlights = {
  heading: "A valuation milestone, not a quality certificate",
  intro:
    "Use a unicorn label as the start of diligence: check the date, currency, transaction and ownership effects.",
  items: [
    {
      label: "Five attributable examples",
      description:
        "Every company row links to an announcement that explicitly reports a US$1 billion-plus valuation.",
    },
    {
      label: "Current status is separated",
      description:
        "Historical threshold evidence is not presented as a continuously valid market price.",
    },
    {
      label: "The maths is inspectable",
      description:
        "Change the round inputs, see the formula and download the simplified scenario as CSV.",
    },
  ],
};

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
    href: "https://techcrunch.com/2013/11/02/welcome-to-the-unicorn.club/",
    title: "Welcome To The Unicorn Club: Learning From Billion-Dollar Startups",
    publisher: "Aileen Lee, TechCrunch",
    description:
      "The 2013 article that introduced the term and explicitly described its snapshot and source limitations.",
    category: "analysis",
  },
  {
    id: 2,
    href: "https://www.airwallex.com/global/blog/the-ai-era-has-no-home-market-build-accordingly",
    title: "The AI Era Has No Home Market. Build Accordingly.",
    publisher: "Airwallex",
    description:
      "Company announcement of a June 2026 financing at a US$11 billion valuation.",
    category: "industry",
  },
  {
    id: 3,
    href: "https://www.canva.com/newsroom/news/canva-announces-usd-40-billion-valuation-fueled-global-demand-visual-communication/",
    title: "Canva Announces USD 40 Billion Valuation",
    publisher: "Canva",
    description:
      "Company announcement of a September 2021 US$200 million round and US$40 billion valuation.",
    category: "industry",
  },
  {
    id: 4,
    href: "https://www.cultureamp.com/company/announcements/global-employee-experience-leader-culture-amp-raises-100-million",
    title: "Culture Amp raises $100M in Series F funding round",
    publisher: "Culture Amp",
    description:
      "Company announcement of a July 2021 Series F and valuation above US$1.5 billion.",
    category: "industry",
  },
  {
    id: 5,
    href: "https://www.globenewswire.com/news-release/2021/07/19/2264897/0/en/go1-raises-200-million-in-series-d-funding-to-further-corporate-learning.html",
    title: "Go1 Raises $200 Million in Series D Funding",
    publisher: "Go1 via GlobeNewswire",
    description:
      "Company announcement of a July 2021 Series D and valuation above US$1 billion.",
    category: "industry",
  },
  {
    id: 6,
    href: "https://www.prnewswire.com/news-releases/linktree-raises-110-million-usd-led-by-index-and-coatue-to-power-next-phase-of-growth-for-creators-consumers-and-brands-301503884.html",
    title: "Linktree Raises $110 Million USD Led by Index and Coatue",
    publisher: "Linktree via PR Newswire",
    description:
      "Company announcement of a March 2022 round at a US$1.3 billion valuation.",
    category: "industry",
  },
  {
    id: 7,
    href: "https://business.gov.au/finance/funding/choose-your-funding",
    title: "Choose your funding",
    publisher: "business.gov.au",
    description:
      "Australian Government comparison of equity finance and other business funding paths.",
    category: "government",
  },
  {
    id: 8,
    href: "https://business.gov.au/grants-and-programs/venture-capital/safe-notes",
    title: "SAFE Notes",
    publisher: "business.gov.au",
    description:
      "Australian Government explanation of SAFE mechanics and legal qualification.",
    category: "government",
  },
  {
    id: 9,
    href: "https://asic.gov.au/regulatory-resources/fundraising/",
    title: "Fundraising",
    publisher: "ASIC",
    description:
      "Australian fundraising rules and regulatory starting points.",
    category: "government",
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
        titleHighlight="Unicorn Startup"
        headerBgColor="cyan"
        summary={summaryHighlights}
        heroImage={HERO_IMAGE}
        heroImageAlt={HERO_IMAGE_ALT}
      />

      <div className="prose prose-lg prose-slate max-w-none bg-transparent">
        <section
          aria-labelledby="unicorn-direct-answer"
          className="not-prose my-8 rounded-[28px] border-2 border-gray-950 bg-[#fefc22] p-6 sm:p-8"
        >
          <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-700">
            Direct answer
          </p>
          <h2
            id="unicorn-direct-answer"
            className="mt-3 text-3xl font-black tracking-tight text-gray-950"
          >
            A unicorn is a privately held startup valued at US$1 billion or
            more—but the date and deal matter as much as the headline.
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-900">
            The label records a valuation milestone. It does not say the
            company received US$1 billion, earns a profit, has liquid shares or
            will achieve a billion-dollar exit. Read it as: “a transaction or
            valuation source supported this number at this point in time.”
          </p>
        </section>

        <p>
          Venture investor Aileen Lee introduced the “Unicorn Club” in 2013.
          Her original study used a narrower research definition and warned
          that its public-source data was a snapshot. Modern startup coverage
          usually applies the word to private companies at the US$1 billion
          threshold. The snapshot warning remains essential.
        </p>

        <h2>Five Australian-founded companies with documented unicorn rounds</h2>
        <p>
          This evidence table answers a precise question: which Australian-
          founded or Australian-headquartered companies have an attributable
          announcement explicitly stating a valuation of at least US$1
          billion? It does not rank company quality and it is not a complete
          list of companies that may qualify today.
        </p>

        <div className="not-prose my-8 space-y-5">
          {AUSTRALIAN_UNICORN_EVIDENCE.map((item) => (
            <section
              key={item.company}
              className="rounded-[24px] border border-gray-300 bg-white p-5 sm:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#4b1bd1]">
                    {item.financingEvent}
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-gray-950">
                    {item.company}: {item.disclosedValuation}
                  </h3>
                </div>
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-black ${
                    item.statusConfidence === "recent-company-report"
                      ? "bg-emerald-100 text-emerald-900"
                      : "bg-amber-100 text-amber-950"
                  }`}
                >
                  {item.statusLabel}
                </span>
              </div>

              <dl className="mt-5 grid gap-4 text-sm leading-6 md:grid-cols-2">
                <div>
                  <dt className="font-black text-gray-950">
                    Valuation-event date
                  </dt>
                  <dd className="mt-1 text-gray-700">
                    <time dateTime={item.valuationDate}>
                      {new Intl.DateTimeFormat("en-AU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        timeZone: "UTC",
                      }).format(new Date(`${item.valuationDate}T00:00:00Z`))}
                    </time>
                  </dd>
                </div>
                <div>
                  <dt className="font-black text-gray-950">
                    Australian connection
                  </dt>
                  <dd className="mt-1 text-gray-700">
                    {item.australianConnection}{" "}
                    <a
                      href={item.connectionSourceUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-bold text-[#4b1bd1] underline decoration-1 underline-offset-2"
                    >
                      Connection source: {item.connectionSourceTitle}.
                    </a>
                  </dd>
                </div>
                <div className="md:col-span-2">
                  <dt className="font-black text-gray-950">
                    What can be said now
                  </dt>
                  <dd className="mt-1 text-gray-700">{item.statusNote}</dd>
                </div>
              </dl>

              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-5 inline-block text-sm font-black text-[#4b1bd1] underline decoration-2 underline-offset-4"
              >
                Read the {item.sourceType}: {item.sourceTitle}
              </a>
            </section>
          ))}
        </div>

        <aside className="not-prose my-8 rounded-2xl border border-gray-300 bg-white p-5 text-sm text-gray-700">
          <p className="font-black text-gray-950">Dataset maintenance</p>
          <p className="mt-2 leading-6">
            Owner: {UNICORN_DATASET_OWNER}. Last verified:{" "}
            {UNICORN_DATASET_VERIFIED_AT}. Planned review cadence:{" "}
            {UNICORN_DATASET_REVIEW_CADENCE}. A historic row remains useful as
            evidence of a dated valuation event, but it is never silently
            promoted into a current valuation.
          </p>
        </aside>

        <h2>Currency and inclusion rules</h2>
        <p>
          The threshold is denominated in US dollars, so currency handling can
          change the answer. MLAI used four rules:
        </p>
        <ol>
          <li>
            The source must explicitly state a US-dollar valuation of at least
            US$1 billion. “$1 billion” without a clear currency is not enough
            when the context is ambiguous.
          </li>
          <li>
            MLAI does not convert an Australian-dollar valuation to qualify a
            company. That avoids selecting a convenient exchange rate or
            conversion date.
          </li>
          <li>
            The event date, round and source are recorded. A 2021 valuation is
            described as 2021 evidence, not a 2026 price.
          </li>
          <li>
            Unknown means unknown. If no newer attributable priced event was
            found, the table does not estimate one from revenue, users, token
            prices or press speculation.
          </li>
        </ol>

        <h2>How a funding round can create the valuation</h2>
        <p>
          In a simple primary priced round, investors and the company negotiate
          a pre-money valuation. New cash is added to calculate post-money
          valuation. The new investor’s simplified ownership is the new
          investment divided by post-money valuation.
        </p>
        <p>
          Example: a A$900 million pre-money valuation plus A$100 million of new
          primary cash produces a A$1 billion post-money valuation. The new
          investor owns 10% in the simplified model. If the founder group owned
          60% immediately before the round, it owns 54% immediately after: 60%
          multiplied by 90%.
        </p>
        <p>
          That example is checked arithmetic, not a term-sheet model. An option
          pool increase, SAFE or note conversion, different share classes,
          liquidation preferences and other rights can materially change the
          economics. A secondary transaction is also different: shares change
          hands and the cash generally goes to the seller, not the company.
        </p>

        <UnicornValuationCalculator />

        <h2>What a US$1 billion valuation does—and does not—mean</h2>
        <div className="not-prose my-8 grid gap-4 md:grid-cols-2">
          {[
            {
              title: "It can mean",
              items: [
                "A recent investor accepted a price or financing term that implied the valuation.",
                "The company crossed a widely recognised private-market milestone.",
                "The round may create financing, hiring, customer and media attention.",
              ],
            },
            {
              title: "It does not prove",
              items: [
                "US$1 billion of cash, revenue, profit or founder liquidity.",
                "That every ordinary share has the same rights or realisable price.",
                "A successful exit, durable product demand or a current valuation.",
              ],
            },
          ].map((group) => (
            <section
              key={group.title}
              className="rounded-[24px] border border-gray-300 bg-white p-6"
            >
              <h3 className="m-0 text-xl font-black text-gray-950">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-700">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <h2>How a unicorn loses the label</h2>
        <p>
          A valuation is not continuously observable for a private company.
          The clearest new evidence may be a later priced round or secondary
          trade. If that event implies less than US$1 billion, calling the
          company a current unicorn is misleading even though the earlier
          milestone remains part of its history.
        </p>
        <p>
          An acquisition or public listing also changes the category because
          the company is no longer a privately held startup. If no transaction
          discloses a new value, neither an old headline nor silence establishes
          today’s price. This is why the evidence table distinguishes a recent
          company report from historical threshold evidence.
        </p>

        <h2>A founder decision guide: optimise the round, not the label</h2>
        <ol>
          <li>
            <strong>Name the job of the capital.</strong> Tie the amount to
            measurable product, customer, regulatory, team or runway
            milestones.
          </li>
          <li>
            <strong>Model ownership under more than one scenario.</strong> Test
            the priced round plus option-pool, SAFE, note and downside cases
            with qualified advisers.
          </li>
          <li>
            <strong>Separate primary and secondary cash.</strong> Record how
            much reaches the company, how much goes to sellers and which rights
            attach to each security.
          </li>
          <li>
            <strong>Build evidence before the raise.</strong> Keep a dated
            record of milestones, metrics, risks and asks so investor
            conversations are based on an operating history rather than a
            valuation aspiration.
          </li>
          <li>
            <strong>Set a walk-away rule.</strong> Define unacceptable
            dilution, control, preference, governance and reporting terms
            before time pressure narrows the decision.
          </li>
        </ol>
        <p>
          MLAI’s{" "}
          <Link to="/vibe-raising">Vibe Raising</Link> workflow helps founders
          turn real monthly company evidence into investor updates before a
          raise. MLAI’s <Link to="/events">in-person and online events</Link>{" "}
          are the place to test the questions with other Australian builders.
        </p>

        <h2>Questions to ask when a unicorn headline appears</h2>
        <ul>
          <li>What is the exact valuation date and currency?</li>
          <li>Is the number pre-money, post-money or only “implied”?</li>
          <li>Was the transaction primary, secondary or a mixture?</li>
          <li>How much cash reached the company?</li>
          <li>Which security was issued, and do all shares have equal rights?</li>
          <li>Is there a newer priced event, acquisition or public listing?</li>
          <li>
            Is the publisher the company, an investor, a regulator or a report
            repeating another outlet?
          </li>
          <li>
            Which operating evidence—revenue quality, retention, margins,
            runway or customer concentration—should be examined separately?
          </li>
        </ul>

        <aside className="not-prose my-10 rounded-[28px] bg-gray-950 p-6 text-white sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00ffd7]">
            Method, changelog, limitations and disclosure
          </p>
          <h2 className="mt-3 text-2xl font-black">
            A sourced event dataset, not a live private-market index
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-200">
            <li>
              <strong className="text-white">Inclusion rule:</strong> an
              attributable announcement explicitly states a valuation of at
              least US$1 billion and supports an Australian founding or
              headquarters connection.
            </li>
            <li>
              <strong className="text-white">Exclusions:</strong> Australian-
              dollar-only valuations, databases without visible source
              evidence, speculative estimates, token market capitalisation and
              public-company market capitalisation.
            </li>
            <li>
              <strong className="text-white">Verification:</strong> the five
              source pages were opened and checked on 29 July 2026. MLAI did
              not inspect confidential transaction documents or independently
              value the companies.
            </li>
            <li>
              <strong className="text-white">Status rule:</strong> only the
              recent 2026 Airwallex announcement is labelled recent. Older
              events are historical threshold evidence and do not establish a
              July 2026 valuation.
            </li>
            <li>
              <strong className="text-white">Original asset:</strong> MLAI built
              the typed evidence table, status-confidence treatment and
              downloadable primary-round calculator for this page. Calculator
              inputs remain in the browser.
            </li>
            <li>
              <strong className="text-white">Changelog:</strong> this revision
              removes generic filler, the false checklist download, irrelevant
              search-query FAQs, a truncated FAQ answer and duplicate FAQ
              structured data.
            </li>
            <li>
              <strong className="text-white">Current editorial gate:</strong>{" "}
              the planned two interviews with relevant Australian founders,
              investors or qualified advisers and a named financial/legal
              review have not yet been completed. Do not mark this article
              final or score it 80+ until those gates are satisfied.
            </li>
            <li>
              <strong className="text-white">AI assistance:</strong> AI tools
              assisted source discovery, drafting and code generation. Volatile
              claims were checked against the linked pages; the remaining
              interview and human-review gaps are stated rather than invented.
            </li>
          </ul>
        </aside>

        <ArticleReferences
          references={[...REFERENCES]}
          heading="Valuation, fundraising and definition sources"
          description="Sources checked for the 29 July 2026 revision."
          previewCount={5}
        />

        <div className="mt-12">
          <ArticleFAQ
            items={faqItems}
            heading="Unicorn startup questions"
          />
        </div>
      </div>
    </>
  );
}
