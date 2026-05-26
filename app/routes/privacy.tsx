import type { ReactNode } from "react";
import type { MetaFunction } from "react-router";
import SectionDivider from "~/components/SectionDivider";

const LAST_UPDATED = "20 May 2026";

type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] };

type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export const meta: MetaFunction = () => {
  return [
    { title: "MLAI Privacy Policy" },
    {
      name: "description",
      content:
        "MLAI Privacy Policy covering MLAI websites, events, community programs, founder tools, connected-account products, project services, software, Google OAuth, Gmail, Drive, Analytics, Search Console, AI processing, retention, deletion, and Limited Use commitments.",
    },
    {
      name: "keywords",
      content:
        "MLAI privacy policy, Google user data, Gmail data, Google Drive, Google Analytics, Search Console, Vibe Raising privacy, Vibe Marketing privacy, AI processing, data deletion, Limited Use",
    },
  ];
};

const introParagraphs = [
  "This Privacy Policy explains how MLAI Aus Inc ABN 94 807 394 137 collects, uses, stores, shares, protects, retains and deletes information when you use MLAI websites, events, community programs, founder tools, connected-account products, project services, software, workshops and related services.",
  "In this Privacy Policy, “MLAI”, “we”, “our” and “us” means MLAI Aus Inc.",
  "This policy covers MLAI generally, Vibe Raising, Vibe Marketing, MLAI Studio, MLAI Grants and project work, educational software, paid workshops, community activities, volunteers, sponsors, and connected services such as Google, Gmail, Google Drive, Google Analytics, Search Console, Slack, Xero, Linear, Notion and similar services where enabled.",
];

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "1. Who we are and how to contact us",
    blocks: [
      { type: "p", text: "MLAI Aus Inc operates MLAI websites, community programs, events, founder tools, software, project services, educational programs and related services." },
      { type: "p", text: "Depending on the service you use, MLAI may act as a community operator, service provider, software provider, project delivery partner, event organiser, sponsor or partner contact point, and platform operator." },
      { type: "p", text: "Contact us at hi@mlai.au for privacy questions, access requests, correction requests, deletion requests, complaints or questions about connected accounts." },
    ],
  },
  {
    id: "scope",
    title: "2. Scope of this policy",
    blocks: [
      { type: "p", text: "This Privacy Policy applies to information MLAI handles through:" },
      {
        type: "list",
        items: [
          "MLAI websites, landing pages, articles, forms, analytics and newsletters;",
          "events, hackathons, workshops, meetups, community spaces, Slack or Discord groups, member directories and volunteer programs;",
          "founder tools, including Vibe Raising and Vibe Marketing;",
          "MLAI Studio, builder-hour services, subscriptions, retainers, scoped project delivery and product support;",
          "MLAI Grants, sponsored projects, educational software, client projects, research, innovation programs and software licences;",
          "optional connected services, including Google services and other third-party platforms that you choose to connect.",
        ],
      },
      {
        type: "p",
        text: "Third-party websites, platforms, venues, payment processors, ticketing providers and connected services have their own privacy policies. You should review those policies before using them.",
      },
    ],
  },
  {
    id: "information-we-collect",
    title: "3. Information we collect",
    blocks: [
      { type: "h3", text: "Account, contact and support information" },
      {
        type: "p",
        text: "We may collect your name, email address, phone number, company name, role, organisation, profile information, login details, account settings, preferences, support messages, contact forms, communications and authentication information.",
      },
      { type: "h3", text: "Website, analytics and usage information" },
      {
        type: "p",
        text: "We may collect IP address, browser type, device information, referral source, pages viewed, timestamps, product events, approximate location, cookies or similar identifiers, error diagnostics, logs and performance information.",
      },
      { type: "p", text: "We may use analytics tools to understand website and product usage." },
      { type: "h3", text: "Community, event, workshop and volunteer information" },
      {
        type: "p",
        text: "We may collect event registrations, ticketing details, attendance records, dietary or accessibility information you provide, speaker and organiser details, hackathon submissions, team details, judging records, prize eligibility information, workshop participation, community profile information, Slack or Discord profile information, volunteer applications, volunteer role information, sponsor and partner contact details, newsletter subscriptions, photos, video, recordings and feedback.",
      },
      { type: "h3", text: "Startup, founder, client and project information" },
      {
        type: "p",
        text: "We may collect startup profiles, company descriptions, website URLs, stage, sector, goals, metrics, milestones, investor asks, customer themes, team details, traction, funding context, uploaded files, product screenshots, brand assets, project briefs, grant information, curriculum materials, client requirements, statement-of-work details, support tickets, deliverables, invoices, purchase orders and project communications.",
      },
      { type: "h3", text: "Connected-account and source data" },
      {
        type: "p",
        text: "If you choose to connect a third-party service or data source, we may collect account identifiers, workspace identifiers, OAuth tokens, permission details, selected files, selected messages, metadata, extracted text, analytics reports, project records, finance records, source URLs, uploaded materials, generated outputs and other data permitted by the access you grant and the feature you enable.",
      },
    ],
  },
  {
    id: "product-specific-data",
    title: "4. Product-specific data",
    blocks: [
      { type: "h3", text: "Vibe Raising" },
      { type: "p", text: "Vibe Raising helps founders prepare monthly founder and investor updates." },
      {
        type: "p",
        text: "We may process startup profile data, monthly update drafts, final updates, metrics, milestones, highlights, risks, blockers, asks, investor relationship notes, customer or partner conversations, uploaded materials, source URLs, and optional connected-source data from services such as Gmail, Google Drive, Slack, Xero, Linear, Notion, Google Analytics and Search Console where enabled.",
      },
      {
        type: "p",
        text: "We may create derived outputs such as relevance scores, summaries, extracted events, extracted metrics, source context, suggested asks, draft updates, review notes and final updates.",
      },
      { type: "h3", text: "Vibe Marketing" },
      {
        type: "p",
        text: "Vibe Marketing may help founders and teams with AI-assisted marketing strategy, SEO, AEO, GEO, topic discovery, keyword clustering, content templates, startup profiles, article and page generation, metadata, schema suggestions, internal linking, sitemap workflows, analytics-driven recommendations and optional publishing workflows.",
      },
      {
        type: "p",
        text: "We may process startup profiles, public website content, website URLs, product descriptions, approved founder updates, approved Vibe Raising outputs, brand assets, customer personas, topic ideas, keyword research, content templates, generated drafts, metadata, schema suggestions, internal-linking suggestions, sitemap information, Google Analytics reports, Search Console reports and performance data where connected.",
      },
      {
        type: "p",
        text: "Vibe Marketing is designed to use approved outputs and user-provided marketing inputs by default, not raw Gmail messages or broad Google Drive content, unless that raw-source use is clearly disclosed in-product, you choose to enable it, and the use is permitted by applicable platform policies and law.",
      },
      { type: "h3", text: "MLAI Studio and project services" },
      {
        type: "p",
        text: "MLAI Studio and project services may process project briefs, business requirements, design files, code repositories, API keys or credentials you provide, tickets, product analytics, support logs, documents, meeting notes, client content, third-party account details, deliverables, invoices and communications needed to deliver scoped work, subscriptions, retainers, builder hours, support and maintenance.",
      },
      { type: "h3", text: "MLAI Grants, educational software and client programs" },
      {
        type: "p",
        text: "Grant-funded and educational programs may involve participant registrations, teacher or facilitator information, student or team submissions, school or partner details, project reports, curriculum inputs, assessment or judging records, usage logs, support records, simulated data, de-identified datasets and software licence information.",
      },
      {
        type: "p",
        text: "Where a program involves children or students, MLAI aims to collect only what is reasonably needed for the educational purpose, use simulated or de-identified data where appropriate, and follow applicable school, partner, consent and legal requirements.",
      },
    ],
  },
  {
    id: "google-user-data",
    title: "5. Google user data",
    blocks: [
      { type: "p", text: "If you connect a Google account, Google will show the exact permissions requested before you grant access." },
      { type: "p", text: "The Google data MLAI accesses depends on the product, feature, scopes, consent screen and in-product choices you use." },
      { type: "p", text: "MLAI requests Google data only for disclosed user-facing features that you choose to enable." },
      { type: "h3", text: "Google Account and OAuth data" },
      { type: "p", text: "We may process:" },
      {
        type: "list",
        items: [
          "Google account identifiers such as email address, profile information and account ID;",
          "OAuth access tokens, refresh tokens, scope grants, token expiry details and connection status;",
          "account, property, file, message, thread, label or service identifiers needed to operate the connected feature.",
        ],
      },
      { type: "h3", text: "Gmail data" },
      {
        type: "p",
        text: "If you enable a Gmail-powered feature, MLAI may access or process Gmail data permitted by the scopes you approve, which may include:",
      },
      {
        type: "list",
        items: [
          "message and thread identifiers;",
          "history identifiers;",
          "labels;",
          "headers;",
          "dates;",
          "subjects;",
          "sender and recipient fields;",
          "snippets;",
          "body text;",
          "cleaned or extracted text;",
          "previews;",
          "attachment metadata;",
          "attachment content where required for the feature;",
          "derived artifacts such as relevance scores, summaries, extracted events, metrics, asks, risks and generated drafts.",
        ],
      },
      {
        type: "p",
        text: "Gmail access is used for disclosed user-facing workflows, such as finding relevant context for a founder update that you request.",
      },
      {
        type: "p",
        text: "We do not use Gmail data for advertising, retargeting, personalised advertising, data broker services, credit-worthiness, lending or generalized AI model training.",
      },
      { type: "h3", text: "Google Drive data" },
      {
        type: "p",
        text: "If you enable Google Drive features, MLAI may access or process selected files, file identifiers, folder or permission metadata, document names, MIME types, modified dates, extracted text, comments or content where authorised, and derived outputs needed for the user-facing feature.",
      },
      {
        type: "p",
        text: "Where practicable, MLAI prefers selected file access, file-picker flows, app-created files or per-file access rather than broad Drive-wide access.",
      },
      {
        type: "p",
        text: "We do not use Google Drive file content for advertising, retargeting, personalised advertising, data broker services, credit-worthiness, lending or generalized AI model training.",
      },
      { type: "h3", text: "Google Analytics and Search Console data" },
      {
        type: "p",
        text: "If you connect Google Analytics or Search Console, MLAI may process account, property, site, query, page, landing page, impressions, clicks, click-through rate, rankings, traffic, source, medium, conversion, engagement, device, geography and reporting data permitted by the scopes you approve.",
      },
      {
        type: "p",
        text: "We use this data for user-facing reporting, marketing insights, content measurement and optimisation workflows you enable.",
      },
    ],
  },
  {
    id: "other-connected-services",
    title: "6. Other connected services",
    blocks: [
      { type: "p", text: "Depending on the features you enable, MLAI may process data from other connected services." },
      { type: "p", text: "This may include:" },
      {
        type: "list",
        items: [
          "Slack workspace identifiers, channel identifiers, selected channel names, public or private channel indicators, messages, threads, timestamps and metadata;",
          "Xero organisation, tenant, invoice, payment, contact, account, report, profit and loss, balance sheet and metric information permitted by granted scopes;",
          "Linear workspace, project, issue, comment, status, assignee, cycle, label and delivery context;",
          "Notion selected pages, databases, blocks, titles, metadata, extracted text and related content;",
          "manual materials such as uploaded files, source URLs, notes, pasted text, recorded walkthroughs, pitch decks, screenshots, summaries and supporting documents.",
        ],
      },
    ],
  },
  {
    id: "ai-processing",
    title: "7. AI processing",
    blocks: [
      {
        type: "p",
        text: "MLAI may use AI systems and AI infrastructure providers to assist with drafting, summarisation, extraction, classification, coding, testing, search, marketing, analytics, education, simulation, research, review, automation and support.",
      },
      {
        type: "p",
        text: "We may send relevant inputs and context to those providers only as needed to provide the user-facing feature, service, project or support you request.",
      },
      {
        type: "p",
        text: "Where information received from Google Workspace APIs is processed by AI infrastructure providers, we use that information only to provide or improve the visible user-facing feature you enabled, and not to train or improve generalized or non-personalized AI or machine learning models.",
      },
      {
        type: "p",
        text: "We do not use Google Workspace API data, including Gmail data or Google Drive file content, to create, train or improve generalized or non-personalized AI or machine learning models.",
      },
      {
        type: "p",
        text: "AI-assisted outputs may be retained as part of your account, project, support or product history as described in this policy.",
      },
    ],
  },
  {
    id: "how-we-use",
    title: "8. How we use information",
    blocks: [
      { type: "p", text: "We use information to:" },
      {
        type: "list",
        items: [
          "provide, operate, personalise, maintain, secure, troubleshoot and improve MLAI services;",
          "run events, workshops, hackathons, community programs, volunteer programs, sponsorships and partnerships;",
          "create founder updates, marketing drafts, summaries, analytics reports, product recommendations, educational materials, software deliverables and project outputs you request;",
          "maintain account access, connected account status, OAuth tokens, product settings and service records;",
          "process payments, invoices, refunds, subscriptions, sponsorships, grants, licences and workshop fees;",
          "communicate with you about services, support, security, products, events, newsletters and community activity;",
          "prevent abuse, protect security, debug issues, enforce terms, comply with law, and protect MLAI, users, partners and the public;",
          "prepare de-identified, aggregated or statistical insights for operations, reporting, community impact, sponsor reporting, grant reporting and service improvement.",
        ],
      },
      {
        type: "p",
        text: "For Google user data, the general purposes above are limited by the Google-specific commitments in this policy. MLAI uses Google user data only for disclosed user-facing features you enable and as otherwise permitted by the Google API Services User Data Policy and applicable law.",
      },
    ],
  },
  {
    id: "cross-product",
    title: "9. Cross-product data use",
    blocks: [
      {
        type: "p",
        text: "Where you use multiple MLAI products, we may use your account information, startup profile, approved outputs and product settings across those products to provide a connected experience.",
      },
      {
        type: "p",
        text: "We do not use raw Google Workspace API data, including Gmail messages or Google Drive file content, for a different MLAI product unless that use is clearly disclosed in the product, is part of a user-facing feature you choose to enable, and is permitted by Google policy and applicable law.",
      },
      { type: "p", text: "Account data such as name, email, company and role may be used across MLAI services." },
      { type: "p", text: "Startup profile data such as company description, website, stage, sector and goals may be used across Vibe Raising and Vibe Marketing with notice." },
      { type: "p", text: "Approved outputs such as final founder updates, approved summaries, approved metrics and approved themes may be used by Vibe Marketing if you opt in or approve that use." },
      { type: "p", text: "Restricted source data such as raw Gmail, Google Drive file content, private Slack, Xero, Linear, OAuth tokens and other connected-source data is not used across products by default." },
    ],
  },
  {
    id: "sharing",
    title: "10. Sharing and disclosure",
    blocks: [
      { type: "p", text: "We do not sell personal information, Google user data, Gmail data, Google Drive content or connected-source data." },
      { type: "p", text: "We may disclose information only in limited circumstances, including:" },
      {
        type: "list",
        items: [
          "to service providers that help us host, operate, secure, analyse, support, communicate, process payments, deliver events, manage email, provide AI infrastructure or provide the Services;",
          "to AI infrastructure providers only as needed to provide the user-facing feature, service, support or project you request;",
          "when you direct us to share an output, send an update, invite a collaborator, publish content, submit a project, join an event or connect a third-party service;",
          "with venues, event partners, sponsors, mentors, judges, facilitators, co-organisers, schools, clients, grant providers or project partners where needed for the relevant program and disclosed or reasonably expected;",
          "when required by law, regulation, legal process, grant reporting requirement, safety need, security incident response, or to protect rights and prevent abuse;",
          "in connection with a merger, acquisition, financing, reorganisation or sale of assets, subject to applicable law and any user consent required by Google policy.",
        ],
      },
      {
        type: "p",
        text: "For Google user data, transfers are limited to those permitted by the Google API Services User Data Policy, including the Limited Use requirements.",
      },
    ],
  },
  {
    id: "limited-use",
    title: "11. Google Limited Use commitments",
    blocks: [
      {
        type: "p",
        text: "MLAI’s use and transfer of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.",
      },
      { type: "p", text: "In particular:" },
      {
        type: "list",
        items: [
          "we use Google user data only to provide or improve user-facing features that are visible in the requesting MLAI product;",
          "we request Google permissions only where needed for implemented features and aim to use the narrowest practical scopes;",
          "we do not sell Google user data;",
          "we do not use Google user data for advertising, retargeting, personalised advertising, interest-based advertising, data broker services, credit-worthiness or lending purposes;",
          "we do not use Google Workspace API data to create, train or improve generalized or non-personalized AI or machine learning models;",
          "we do not transfer Google user data except as needed to provide or improve a visible user-facing feature with your consent, comply with law, protect security, or as otherwise permitted by Google policy;",
          "we do not allow humans to read Google user data unless you have given affirmative permission for specific data, it is necessary for security or legal compliance, or the data has been aggregated and anonymised for permitted internal operations.",
        ],
      },
    ],
  },
  {
    id: "human-access",
    title: "12. Human access to Google user data",
    blocks: [
      { type: "p", text: "MLAI restricts human access to Google user data." },
      { type: "p", text: "MLAI personnel, contractors or service providers may access Google user data only where:" },
      {
        type: "list",
        items: [
          "you have given affirmative permission for specific data;",
          "access is needed to provide support you request;",
          "access is needed to investigate security, abuse, reliability or technical issues;",
          "access is required by law;",
          "access is to aggregated and anonymised data for permitted internal operations; or",
          "access is otherwise permitted by Google policy and applicable law.",
        ],
      },
    ],
  },
  {
    id: "security",
    title: "13. Security",
    blocks: [
      { type: "p", text: "We use technical and organisational safeguards designed to protect information from unauthorised access, alteration, disclosure or destruction." },
      { type: "p", text: "Safeguards may include HTTPS, encryption for sensitive stored data where applicable, access controls, token protection, logging, internal access restrictions, least-privilege practices, provider review, backups and security review of systems that handle connected-source data." },
      { type: "p", text: "No system is perfectly secure. You should use care when choosing what to upload, connect or share." },
      { type: "p", text: "Where Google restricted-scope data is stored or transmitted through MLAI systems, MLAI will follow applicable Google verification, security assessment and data protection requirements." },
    ],
  },
  {
    id: "international",
    title: "14. International providers and transfers",
    blocks: [
      { type: "p", text: "MLAI is based in Australia, but some service providers, hosting providers, analytics providers, AI infrastructure providers, payment processors, email tools and support tools may process information in other countries." },
      { type: "p", text: "Where we disclose personal information to overseas providers, we take reasonable steps to use providers with appropriate privacy, security, confidentiality and contractual protections." },
    ],
  },
  {
    id: "retention-deletion",
    title: "15. Retention, deletion and disconnecting accounts",
    blocks: [
      {
        type: "p",
        text: "We retain information only for as long as needed to provide the Services, operate MLAI, comply with legal obligations, resolve disputes, enforce agreements, maintain security, complete grant or project reporting, and support legitimate operational purposes.",
      },
      { type: "p", text: "OAuth tokens are retained while the relevant connection is active." },
      { type: "p", text: "If you disconnect or revoke access, we delete or invalidate stored OAuth tokens within a reasonable time." },
      { type: "p", text: "Gmail artifacts and Google source context are retained only while needed for the user-facing workflow, support, security, troubleshooting, legal compliance or your account history, unless you request deletion or law permits or requires longer retention." },
      { type: "p", text: "Generated outputs such as drafts, summaries, reports, marketing content and final updates may be retained while your account, project or product history remains active or until deleted or requested for deletion." },
      { type: "p", text: "Event, workshop, volunteer, sponsor, grant, project, licence and payment records may be retained for operational, accounting, legal, tax, grant reporting, insurance and governance purposes." },
      { type: "p", text: "Backups and logs may retain limited data for a reasonable period before deletion cycles complete." },
      { type: "p", text: "You may disconnect connected accounts in product settings where available, revoke access directly with the third-party provider, or email hi@mlai.au." },
      { type: "p", text: "After disconnecting, connector-powered features may stop working. Historical generated outputs or cached artifacts may remain until deleted through product controls or by request, unless retention is required or permitted by law, security or legitimate operational needs." },
    ],
  },
  {
    id: "rights",
    title: "16. Your rights and choices",
    blocks: [
      { type: "p", text: "You may request access, correction, deletion, export, restriction or information about how MLAI handles your personal information, subject to verification, applicable law, technical feasibility, safety, security, legal and operational requirements." },
      { type: "p", text: "You can choose not to connect optional services such as Gmail, Google Drive, Google Analytics, Search Console, Slack, Xero, Linear or Notion." },
      { type: "p", text: "You can revoke Google access from your Google Account permissions and disconnect in MLAI settings where available." },
      { type: "p", text: "You can unsubscribe from marketing emails using the unsubscribe link or by contacting MLAI." },
      { type: "p", text: "You can request deletion of account data, connected-source data, generated outputs or support records by emailing hi@mlai.au with enough detail to verify and action the request." },
    ],
  },
  {
    id: "marketing",
    title: "17. Marketing communications",
    blocks: [
      { type: "p", text: "If you subscribe to MLAI emails, register for an event, join a community program, use a product, or otherwise engage with MLAI, we may send service, transactional, product, event, community, sponsor or newsletter communications." },
      { type: "p", text: "You can unsubscribe from marketing emails, but we may still send transactional, security, account, legal or service-related messages." },
    ],
  },
  {
    id: "children-students",
    title: "18. Children and students",
    blocks: [
      { type: "p", text: "MLAI’s general websites and founder tools are not directed to children under 13." },
      { type: "p", text: "Some MLAI educational programs, hackathons or school software may involve students or young people through a school, parent, guardian, client, partner or facilitator." },
      { type: "p", text: "In those settings, MLAI aims to collect only what is reasonably needed for the educational program, use simulated or de-identified data where appropriate, and follow applicable consent, school, partner and legal requirements." },
      { type: "p", text: "MLAI does not intend for children under 13 to connect personal Google accounts to MLAI connected-account products." },
      { type: "p", text: "Where a school or educational partner uses MLAI software with students, the school or partner is responsible for obtaining any required notices, consents and approvals unless otherwise agreed in writing." },
    ],
  },
  {
    id: "sensitive-information",
    title: "19. Sensitive information",
    blocks: [
      { type: "p", text: "You should not provide sensitive information, health information, financial account information, government identifiers, student records, confidential third-party data, regulated data or highly sensitive information unless it is necessary for the relevant Service and you are authorised to provide it." },
      { type: "p", text: "If sensitive information is required for a specific project, school program or client engagement, MLAI may require additional written arrangements." },
    ],
  },
  {
    id: "changes",
    title: "20. Changes to this policy",
    blocks: [
      { type: "p", text: "We may update this Privacy Policy from time to time." },
      { type: "p", text: "We will post the updated policy on the MLAI website and update the “Last updated” date." },
      { type: "p", text: "If we change how MLAI uses Google user data in a material way, we will update this Privacy Policy and provide notice or seek consent where required before using Google user data for the new purpose." },
    ],
  },
  {
    id: "contact",
    title: "21. Complaints and contact",
    blocks: [
      { type: "p", text: "If you have questions, requests or complaints about this Privacy Policy or MLAI’s privacy practices, contact us at:" },
      { type: "p", text: "We will assess privacy complaints and respond within a reasonable period." },
      { type: "p", text: "If you are not satisfied with our response, you may be able to contact the Office of the Australian Information Commissioner or another applicable regulator." },
      { type: "p", text: "Our Terms of Service explain the terms that apply to MLAI websites, events, community programs, founder tools, connected-account products, project services, software, workshops and related services." },
    ],
  },
];

const navLinks = [
  { href: "#information-we-collect", label: "Information we collect" },
  { href: "#product-specific-data", label: "Product-specific data" },
  { href: "#google-user-data", label: "Google user data" },
  { href: "#limited-use", label: "Limited Use commitments" },
  { href: "#human-access", label: "Human access" },
  { href: "#retention-deletion", label: "Retention and deletion" },
  { href: "#rights", label: "Your rights" },
  { href: "#contact", label: "Contact" },
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-[var(--brutalist-border)]/15 pt-8">
      <h2 className="flex items-start gap-3 text-2xl font-black leading-8 tracking-tight text-[var(--brutalist-black)] sm:text-3xl">
        <span className="mt-3 h-2 w-10 shrink-0 rounded-full bg-[var(--brutalist-blue)]" aria-hidden="true" />
        <span>{title}</span>
      </h2>
      <div className="mt-5 space-y-4 text-base leading-7 text-[var(--brutalist-black)]/75">{children}</div>
    </section>
  );
}

function Subsection({ title }: { title: string }) {
  return <h3 className="mt-6 text-lg font-black leading-7 text-[var(--brutalist-orange)]">{title}</h3>;
}

function List({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-[var(--brutalist-blue)]">{children}</ul>;
}

function PolicyLink({
  href,
  children,
  className = "text-[var(--brutalist-blue)]",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={`font-black underline underline-offset-4 ${className}`}>
      {children}
    </a>
  );
}

function RenderBlock({ block }: { block: LegalBlock }) {
  if (block.type === "h3") {
    return <Subsection title={block.text} />;
  }

  if (block.type === "list") {
    return (
      <List>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    );
  }

  if (block.text.startsWith("Our Terms of Service")) {
    return (
      <p>
        Our <PolicyLink href="/terms">Terms of Service</PolicyLink> explain the terms that apply to MLAI
        websites, events, community programs, founder tools, connected-account products, project services,
        software, workshops and related services.
      </p>
    );
  }

  return <p>{block.text}</p>;
}

function ContactCard() {
  return (
    <div className="mt-6 rounded-[1.5rem] bg-[var(--brutalist-black)] p-6 text-white">
      <p className="mb-2 text-base leading-7 text-white">
        <strong>MLAI Aus Inc</strong>
      </p>
      <p className="mb-2 text-base leading-7 text-white/80">ABN 94 807 394 137</p>
      <p className="mb-2 text-base leading-7 text-white/80">585 Little Collins Street, Melbourne VIC 3000</p>
      <p className="mb-2 text-base leading-7 text-white/80">Email: hi@mlai.au</p>
      <p className="text-base leading-7 text-white/80">Website: mlai.au</p>
    </div>
  );
}

export default function Privacy() {
  return (
    <main className="min-h-screen bg-[var(--brutalist-beige)] pb-16 pt-20 text-[var(--brutalist-black)]">
      <SectionDivider color="#3537dc" label="Privacy" />
      <section className="bg-[var(--brutalist-beige)] p-2 lg:p-3">
        <article className="w-full rounded-2xl border border-gray-400 bg-[linear-gradient(180deg,var(--brutalist-beige)_0%,#fffaf1_100%)] p-4 shadow-[0_24px_80px_rgba(26,26,26,0.08)] sm:rounded-[2.5rem] sm:p-8 lg:p-12">
          <header className="border-b border-[var(--brutalist-border)]/20 pb-10">
            <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.24em] text-[var(--brutalist-blue)]">
              <span>Privacy</span>
              <span className="h-1 w-8 rounded-full bg-[var(--brutalist-blue)]" aria-hidden="true" />
              <span>MLAI Aus Inc</span>
            </div>

            <h1
              className="mt-6 max-w-5xl text-[var(--brutalist-black)]"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "clamp(3.25rem, 10vw, 8.5rem)",
                fontWeight: 700,
                lineHeight: 0.9,
              }}
            >
              MLAI Privacy Policy
            </h1>

            <p className="mt-6 text-lg font-black leading-7 text-[var(--brutalist-orange)]">
              Last updated: {LAST_UPDATED}
            </p>

            <div className="mt-8 grid gap-5 text-lg leading-8 text-[var(--brutalist-black)]/78 lg:grid-cols-2">
              {introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] bg-[var(--brutalist-black)] p-5 text-white sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--brutalist-mint)]">
                Policy sections
              </p>
              <nav className="mt-4 grid gap-2 text-sm font-semibold leading-6 sm:grid-cols-2 lg:grid-cols-4">
                {navLinks.map((link) => (
                  <PolicyLink
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10"
                  >
                    {link.label}
                  </PolicyLink>
                ))}
              </nav>
            </div>
          </header>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <Section key={section.id} id={section.id} title={section.title}>
                {section.blocks.map((block, index) => {
                  const shouldShowContact =
                    section.id === "contact" &&
                    block.type === "p" &&
                    block.text.startsWith("If you have questions");

                  return (
                    <div key={`${section.id}-${index}`}>
                      <RenderBlock block={block} />
                      {shouldShowContact ? <ContactCard /> : null}
                    </div>
                  );
                })}
              </Section>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
