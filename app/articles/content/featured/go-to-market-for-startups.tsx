import { Home } from "lucide-react";
import { Link } from "react-router";
import { ArticleHeroHeader } from "~/components/articles/ArticleHeroHeader";
import { ArticleFAQ } from "~/components/articles/ArticleFAQ";
import { ArticleTocPlaceholder } from "~/components/articles/ArticleTocPlaceholder";
import { GTM_BLANK_FIELDS, GTM_COMPLETED_FIELDS, GTM_STAGE_ROWS, GTM_RECORDS, GTM_LOG_HEADERS, gtmRecordCells, GTM_PROVENANCE, GTM_OBJECTIONS, GTM_DECISION, GTM_UNKNOWN, GTM_REVIEW_STATUS } from "~/lib/gtm-channel-test";

export const useCustomHeader = true;
export const CATEGORY = "featured";
export const SLUG = "go-to-market-for-startups";
export const DATE_PUBLISHED = "2026-04-04";
export const DATE_MODIFIED = "2026-09-15";
const TITLE = "Go to market for startups: design a channel test you can learn from";
export const DESCRIPTION = "A worked channel-test plan for Australian early-stage founders: define the buyer, offer, cost limits and evidence before deciding what to repeat.";
const PATH = "/articles/" + CATEGORY + "/" + SLUG;
const HERO = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/content-factory%2FU05QPB483K9%2FMLAI-AUS-Inc%2Fmlai-au%2Fimages%2Fhero-d8dae336-fe4f-4a44-bff3-316597ffe118.jpg?alt=media&token=0ef63680-c513-4f09-9e25-21b2d81228e9";
export const articleMeta = { title: TITLE, topic: TITLE, category: CATEGORY, slug: SLUG, description: DESCRIPTION, datePublished: DATE_PUBLISHED, dateModified: DATE_MODIFIED, author: "Dr Sam Donegan", image: HERO, imageAlt: "Two people examining a printed profile and coloured notes, one pointing with a pen" };
export const summaryHighlights = {
  heading: "A decision, not a launch checklist",
  intro: "A go-to-market plan connects a particular buyer, a credible offer and a way to reach them. Test that connection before increasing spend.",
  items: [
    { label: "Reader", description: "Australian early-stage founders who have a problem hypothesis and need to choose their next acquisition experiment." },
    { label: "Output", description: "A completed fictional channel test, its 28-record log, clear denominators and a matching editable worksheet for your own evidence." },
    { label: "Limit", description: "Small, non-random tests suggest a next step; they do not prove product-market fit or forecast acquisition cost." },
  ],
};
export const faqItems = [
  { id: 1, question: "How is go-to-market different from marketing?", answer: "Marketing helps a buyer discover and understand an offer. A go-to-market decision also includes who buys, what is sold, price conditions, buying approvals, delivery and the evidence needed to repeat that route." },
  { id: 2, question: "How many channels should I test?", answer: "Start with what you can track and fulfil within your time and spending limits. This worksheet compares two routes for illustration, not because two is a universal optimum. One well-recorded route may be enough to find the next uncertainty." },
  { id: 3, question: "Does a paid pilot prove product-market fit?", answer: "No. A paid pilot shows that a particular buyer accepted particular terms. Delivery cost, continued use, repeat purchasing and demand beyond personal contacts remain separate questions." },
  { id: 4, question: "Should I automate outreach with AI?", answer: "Not just to increase volume. First establish an appropriate audience, permitted contact route, accurate claims and a useful offer. Review every customer-facing statement and keep sensitive prospect information out of unapproved tools. This guide does not establish legal permission to contact anyone." },
];

export const channelTestWorksheet = GTM_BLANK_FIELDS;

export default function ArticleContent() {
  return <div data-cf-article-body>
    <ArticleHeroHeader breadcrumbs={[{ label: "Home", href: "/", icon: Home }, { label: "Articles", href: "/articles" }, { label: TITLE, current: true }]} title={TITLE} titleHighlight="channel test" headerBgColor="cyan" summary={summaryHighlights} heroImage={HERO} heroImageAlt={articleMeta.imageAlt} />
    <div className="prose prose-lg prose-slate max-w-none">
      <p>This guide is for a founder choosing how to reach an initial Australian customer segment—not an established business buying an AI transformation or a developer seeking contract work. You will leave with a test record and a decision rule, rather than a list of every marketing channel.</p>
      <p>If you cannot yet describe a problem someone has experienced, start with the <Link to="/articles/featured/how-to-get-the-first-customers-for-my-startup-in-2026">first-customer conversation guide</Link>. That page helps you prepare and record individual conversations; this one helps you design and interpret a channel test. If you already have a buyer and need to scope delivery, use the <Link to="/articles/featured/starting-a-company-around-an-ai-idea-from-prototype-to-customers">prototype-to-paid-pilot guide</Link>.</p>
      <ArticleTocPlaceholder />

      <h2 id="buyer-offer" className="scroll-mt-28">1. Specify a buyer and an offer before a channel</h2>
      <p><a href="https://startups.aws.com/learn/prove-whats-possible-make-your-idea-success-solid-go-to-market-strategy">AWS’s go-to-market guide</a> links market research, competing alternatives, audience access and messaging. Those are planning considerations, not proof that your particular offer has demand.</p>
      <p><strong>Fictional worked example:</strong> a Melbourne founder is considering a tool that drafts quote-follow-up messages for small commercial maintenance businesses. The assumed buyer is the owner who approves follow-ups; the current alternative is a spreadsheet and manually written emails. These are hypotheses to check, not research findings about that sector.</p>
      <p>The proposed test offer is a review-only demonstration using synthetic quote records, followed by an optional, separately scoped paid pilot. It does not send customer emails or promise more sales. Record the pilot’s actual price and conditions consistently across routes; “interested” is not acceptance of a price never shown.</p>
      <p>For the fictional calculation, assume a fixed AUD 600 total pilot price for one review-only workflow and ten synthetic records, with one review session and no live integration. This is an invented test price, not an MLAI quote, market benchmark or claim that the work is profitable. A real proposal needs its own delivery estimate and explicit commercial terms.</p>
      <p>Write your message around the task: “See how a draft follow-up is checked against the quote before anyone sends it.” Avoid “autonomous revenue engine” or a savings percentage you have not measured. Make clear what exists today, what is a prototype and what still requires development.</p>

      <h2 id="channel-choice" className="scroll-mt-28">2. Choose a route you can access appropriately</h2>
      <p><a href="https://business.gov.au/planning/business-plans/develop-your-marketing-plan">business.gov.au’s marketing-plan guidance</a> connects a target market, goals, activities and a budget, then calls for analysing results and refining the plan. It does not establish a universally best channel.</p>
      <div role="region" aria-label="GTM channel selection" tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4"><table className="min-w-[38rem]">
        <thead><tr><th>Route in this example</th><th>What it might reveal</th><th>What can distort the result</th></tr></thead>
        <tbody>
          <tr><td>Introductions requested through existing contacts, with the recipient’s agreement</td><td>Whether a relevant owner accepts a demonstration and discusses the workflow</td><td>Personal trust can outperform what strangers would do; the pool is limited</td></tr>
          <tr><td>An organiser-approved session for people who choose to attend</td><td>Whether the explanation attracts task-relevant follow-up</td><td>Attendance and enthusiasm are not buying authority; event preparation costs time</td></tr>
        </tbody>
      </table></div>
      <p>These are candidate routes, not access MLAI guarantees. Follow organiser rules and obtain appropriate permission before following up. Do not scrape attendee lists or treat membership as consent. Check requirements for your actual communication channel and jurisdiction before outreach; this is not legal advice.</p>
      <p>Keep the offer and qualification rule consistent. If the audience, message and price all differ, document that you compared two bundles of choices—not the isolated effect of the channel.</p>

      <h2 id="worksheet" className="scroll-mt-28">3. Complete the same twelve fields before starting</h2>
      <p>Copy these fields into your own document or <a href="/downloads/gtm-channel-test.txt" download="gtm-channel-test.txt">save the editable text worksheet and completed example</a>. The file includes the same completed fields, stage definitions, record log and decision shown here, plus space for actual follow-up evidence. It is an editorial planning aid, not a validated scoring system.</p>
      <pre className="whitespace-pre-wrap" aria-label="Channel test worksheet">{channelTestWorksheet.join("\n")}</pre>
      <h3 id="completed-record" className="scroll-mt-28">Completed fictional channel-test record</h3>
      <p>{GTM_PROVENANCE} The schedule deliberately describes a future fictional decision, not a forecast. This expanded log assigns statuses to illustrate the earlier aggregate counts; it is not newly discovered customer evidence.</p>
      <dl className="space-y-5">{GTM_COMPLETED_FIELDS.map((field, index) => <div key={field.label} data-gtm-record-field={index + 1}><dt className="font-bold">{field.label}</dt><dd className="ml-0 mt-1">{field.value}</dd></div>)}</dl>

      <h2 id="worked-results" className="scroll-mt-28">4. Interpret counts without inventing a winner</h2>
      <p>A reply, an attended demonstration, acceptance of terms, payment and actual use answer different questions. In this example, “activation” means completing the agreed ten-record pilot review. No fictional buyer has done that. The session has no paid buyer yet, so its activation proportion is not calculable—not an observed 0% success rate.</p>
      <p>Wide tables scroll sideways. You can focus a table region and use the arrow keys, or read the same rows in the text download.</p>
      <div role="region" aria-label="GTM stage denominators" tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4"><table className="min-w-[44rem]">
        <caption>Synthetic stage counts at the fictional 5 October decision</caption>
        <thead><tr><th scope="col">Stage and denominator</th><th scope="col">Agreed introductions</th><th scope="col">Opt-in session</th></tr></thead>
        <tbody>{GTM_STAGE_ROWS.map(row => <tr key={row.label}><th scope="row" className="font-normal"><strong>{row.label}</strong><br />{row.rule}</th>{row.cells.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
      </table></div>
      <p>Five of eight introduced people and four of twenty attendees met the fit rule. Those denominators describe different selection processes, so their percentages are not a fair experiment proving introductions are better. One payment is too little evidence for a stable acquisition forecast. Zero payments so far does not make acquisition cost zero.</p>
      <details className="my-6 rounded-xl border border-gray-300 p-4">
        <summary className="cursor-pointer font-semibold">Inspect all 28 synthetic status records</summary>
        <p>I01–I08 are introduced recipients; S01–S20 are session attendees. Every status is invented. “Not-invited” is separate from a pending response; “not-shown” means no pilot offer was made under this demo-first protocol. “Not-due” means no terms were accepted, not a missing or refused payment. No row represents a real person.</p>
        <div role="region" aria-label="GTM synthetic record log" tabIndex={0} className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4"><table className="min-w-[56rem]">
          <caption>Author-created records, not a CRM export</caption>
          <thead><tr>{GTM_LOG_HEADERS.map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
          <tbody>{GTM_RECORDS.map(row => <tr key={row.id} data-gtm-record-id={row.id}>{gtmRecordCells(row).map((cell, index) => index === 0 ? <th scope="row" key={index}>{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody>
        </table></div>
        <p>{GTM_OBJECTIONS}</p>
      </details>
      <h3 id="cost-check" className="scroll-mt-28">Cash, founder time and delivery promises are separate limits</h3>
      <p><strong>Cost arithmetic:</strong> if the founder uses an illustrative AUD 60/hour value for planning, introductions consumed AUD 40 + (4 × AUD 60) = AUD 280 in cash plus valued time. The session consumed AUD 180 + (8 × AUD 60) = AUD 660. Only AUD 40 and AUD 180 are cash spending in this example; valued founder time is an opportunity-cost assumption, not a salary payment.</p>
      <p>Combined acquisition uses AUD 220 cash and 12 hours, valued here at AUD 720: AUD 940 cash plus valued time. There is AUD 30 cash headroom but <strong>0 hours remaining</strong>. Two accepted pilots use the two-commitment ceiling, even though only one buyer has paid. That ceiling does not establish delivery feasibility: delivery and support effort still need estimating.</p>
      <p>These totals exclude product development, pilot delivery, ongoing support, refunds, taxes and other overhead. Do not present them as fully loaded customer acquisition cost or compare them with the fictional AUD 600 payment as though the difference were profit. Record delivery and continued use separately before judging the business model.</p>

      <h2 id="decision" className="scroll-mt-28">5. Make a bounded next decision</h2>
      <ul>
        <li><strong>Repeat narrowly:</strong> relevant buyers completed the next step and the test stayed within limits. Repeat with a new, clearly described group; check whether personal connections were doing the work.</li>
        <li><strong>Change one assumption:</strong> people fit the segment but misunderstand the offer, cannot obtain approval or reject the terms. Record the objection and change the relevant assumption, not every variable at once.</li>
        <li><strong>Stop or pause:</strong> access is inappropriate, the promised result cannot be delivered, capacity is exhausted or the agreed spending limit is reached. More outreach does not repair these problems.</li>
      </ul>
      <p><strong>Decision for this example:</strong> {GTM_DECISION}</p>
      <p>{GTM_UNKNOWN} The pending payment is still pending at the fictional decision date; an expired follow-up window does not convert it into a sale or a loss. Do not infer price objections from a bare “declined” status.</p>
      <p>Keep unsuccessful tests. A useful record explains the exact offer, who saw it, what happened and what remains unknown. Do not let an AI summary turn tentative interest into a customer win.</p>
      <h3 id="actual-follow-up" className="scroll-mt-28">Record a new decision before extending a real test</h3>
      <p>The download includes blank follow-up slots. Record internal ID, route, appropriate contact basis and expiry, stage, date, actual outcome, supporting source and next allowed action in an approved private system. Separately record any new acquisition hours/cash, delivery capacity, approval owner and date. Leave unknowns explicit; no slot is a requirement to collect unnecessary personal data.</p>

      <h2 id="peer-review" className="scroll-mt-28">Take one unresolved decision to peers</h2>
      <p>Bring an anonymised version of your worksheet and one question—such as whether your fit rule distinguishes a user from a buyer—to a relevant founder or AI discussion. Give useful context without sharing prospect identities, confidential quotes or contact lists. MLAI events are for participation and learning, not guaranteed customer introductions.</p>
    <p><Link to="/events">Explore upcoming MLAI events</Link> and check the listing for its topic, format and participation requirements.</p>
      <p>If your next task is organising company evidence for an update or content plan, explore <Link to="/founder-tools/start">Founder Tools</Link>; opening a workspace requires an account. Keep pending experiments distinct from confirmed results. No worksheet is automatically imported, and a polished update is not customer evidence.</p>
      <p><small>Sources checked 15 September 2026. The worksheet, synthetic dataset and decision framework are editorial aids; neither linked organisation has endorsed or validated them. {GTM_REVIEW_STATUS} This page does not claim original customer research or a completed pilot.</small></p>
      <ArticleFAQ items={faqItems} />
    </div>
  </div>;
}
