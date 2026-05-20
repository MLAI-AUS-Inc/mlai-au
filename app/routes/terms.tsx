import type { ReactNode } from "react";
import type { MetaFunction } from "react-router";
import SectionDivider from "~/components/SectionDivider";

const LAST_UPDATED = "20 May 2026";

type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] };

type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export const meta: MetaFunction = () => {
  return [
    { title: "MLAI Terms of Service" },
    {
      name: "description",
      content:
        "MLAI Terms of Service for MLAI websites, events, community programs, founder tools, software, project services, workshops, grants, connected accounts, AI outputs, payments, acceptable use, and Google API data commitments.",
    },
    {
      name: "keywords",
      content:
        "MLAI terms of service, Vibe Raising terms, Vibe Marketing terms, MLAI Studio, software licence, project services, grants, Google OAuth, Gmail integration, AI outputs, Australian Consumer Law",
    },
  ];
};

const introParagraphs = [
  "These Terms of Service govern access to and use of the websites, applications, events, community programs, founder tools, software, project services, workshops, grant-funded programs, and related services provided by MLAI Aus Inc ABN 94 807 394 137.",
  "In these Terms, “MLAI”, “we”, “our” and “us” means MLAI Aus Inc. “You” means the person, organisation, client, participant, member, founder, student, teacher, sponsor, partner, customer or other user accessing or using the Services.",
  "These Terms are intended to operate as MLAI’s standard public terms for MLAI services, including community programs, software tools, software licences, connected-account products, grants, project delivery, workshops, studio services, subscriptions and related deliverables.",
  "If you do not agree to these Terms, do not use the Services.",
];

const sections: LegalSection[] = [
  {
    id: "services-covered",
    title: "1. Services covered",
    blocks: [
      { type: "p", text: "These Terms apply to MLAI services, including:" },
      {
        type: "list",
        items: [
          "MLAI websites, articles, resources, newsletters and public content;",
          "community programs, meetups, events, hackathons, workshops and member spaces;",
          "founder tools, including Vibe Raising and Vibe Marketing;",
          "MLAI Studio services, builder hours, subscriptions, retainers and scoped project work;",
          "grant-funded, sponsored, educational, research, innovation and project delivery work;",
          "software licences, hosted tools, educational simulations, maintenance, support, configuration and feature enhancements;",
          "paid workshops, organiser services, sponsorship arrangements and related deliverables;",
          "connected-account products involving services such as Google, Gmail, Google Drive, Google Analytics, Search Console, Slack, Xero, Linear, Notion and similar services where enabled.",
        ],
      },
      {
        type: "p",
        text: "Some services may also be governed by a proposal, quote, invoice, event page, grant agreement, purchase order, statement of work, signed agreement, checkout page, product plan or written project terms.",
      },
    ],
  },
  {
    id: "accepting-terms",
    title: "2. Accepting these Terms",
    blocks: [
      { type: "p", text: "You accept these Terms when you:" },
      {
        type: "list",
        items: [
          "access or use any MLAI website, product, software, event, community space or service;",
          "create an account or connect a third-party account;",
          "register for or attend an event, hackathon, workshop or program;",
          "approve a proposal, quote, invoice, checkout, purchase order, statement of work or written project scope that refers to MLAI services;",
          "pay or arrange payment for MLAI services;",
          "receive, access, test or use a deliverable, software build, hosted product, grant-funded output or project service from MLAI;",
          "continue an engagement after being given or directed to these Terms; or",
          "use MLAI services on behalf of an organisation.",
        ],
      },
      {
        type: "p",
        text: "If you use the Services on behalf of an organisation, you represent that you have authority to bind that organisation to these Terms.",
      },
    ],
  },
  {
    id: "order-of-documents",
    title: "3. Order of documents",
    blocks: [
      {
        type: "p",
        text: "If there is any inconsistency between documents, the following order applies unless expressly stated otherwise:",
      },
      {
        type: "list",
        items: [
          "a signed written agreement between MLAI and the relevant counterparty;",
          "a signed statement of work or signed special conditions;",
          "a grant agreement or formal funding agreement accepted by MLAI;",
          "an MLAI proposal, quote, invoice, checkout page or product plan;",
          "these Terms;",
          "other operational communications such as emails, tickets, messages or project notes.",
        ],
      },
      {
        type: "p",
        text: "Purchase order terms, procurement terms or customer standard terms do not override these Terms unless MLAI expressly agrees to them in writing.",
      },
    ],
  },
  {
    id: "eligibility-accounts-authority",
    title: "4. Eligibility, accounts and authority",
    blocks: [
      { type: "p", text: "You must be able to form a legally binding contract to use the Services." },
      { type: "p", text: "You must provide accurate, current and complete information and keep it updated." },
      {
        type: "p",
        text: "You are responsible for maintaining the confidentiality of your account credentials and for activity under your account.",
      },
      {
        type: "p",
        text: "You must only use accounts, workspaces, files, datasets, API keys, systems, content, platforms or third-party services that you own, administer or are authorised to use.",
      },
      {
        type: "p",
        text: "You must not connect, upload, process or disclose information unless you have the necessary rights, permissions and lawful basis to do so.",
      },
    ],
  },
  {
    id: "community-terms",
    title: "5. General MLAI community terms",
    blocks: [
      {
        type: "p",
        text: "MLAI may run public, private, free, paid, sponsored, grant-funded, in-person, online or hybrid events, workshops, hackathons, programs and community activities.",
      },
      {
        type: "p",
        text: "Registration, ticketing, refunds, cancellations, rescheduling, venue rules, eligibility, judging, prizes, workshop materials and sponsorship arrangements may be governed by event-specific terms in addition to these Terms.",
      },
      {
        type: "p",
        text: "MLAI may cancel, postpone, reschedule, change venues, change speakers, modify formats, refuse entry, remove participants or restrict access where reasonably necessary.",
      },
      {
        type: "p",
        text: "Unless required by law or stated in event-specific terms, ticket refunds and transfers are handled at MLAI’s discretion.",
      },
      {
        type: "p",
        text: "You are responsible for your own travel, accommodation, equipment, dietary requirements, allergy management, accessibility requirements, health needs and participation decisions.",
      },
      {
        type: "p",
        text: "MLAI does not guarantee jobs, funding, investment, introductions, prizes, rankings, commercial outcomes, technical outcomes, educational outcomes or business success from any event, program or community activity.",
      },
    ],
  },
  {
    id: "community-spaces-conduct",
    title: "6. Community spaces and conduct",
    blocks: [
      {
        type: "p",
        text: "MLAI may provide community spaces such as Slack, Discord, mailing lists, member directories, forums, event groups and other collaboration channels.",
      },
      {
        type: "p",
        text: "You must participate respectfully, lawfully and consistently with any code of conduct or moderation rules published by MLAI.",
      },
      {
        type: "p",
        text: "MLAI may moderate, remove, suspend, restrict or terminate access to community spaces, events or programs if conduct creates risk, disrupts the community, breaches these Terms, or is otherwise inappropriate.",
      },
      {
        type: "p",
        text: "Community posts, jobs, opportunities, sponsor content, member profiles and third-party offers are not endorsed by MLAI unless expressly stated.",
      },
    ],
  },
  {
    id: "event-media",
    title: "7. Photos, recordings and event media",
    blocks: [
      { type: "p", text: "MLAI events may be photographed, filmed, livestreamed or recorded." },
      {
        type: "p",
        text: "By attending an MLAI event or program, you consent to MLAI capturing and using event media that may include your image, likeness or voice for event operations, community updates, education, archives, reporting and promotion.",
      },
      {
        type: "p",
        text: "If you do not want to be featured in event media, you should notify MLAI in advance or at the event where reasonably practicable.",
      },
    ],
  },
  {
    id: "volunteers-sponsors-partners",
    title: "8. Volunteers, sponsors and partners",
    blocks: [
      { type: "p", text: "Volunteer participation does not create an employment relationship unless separately agreed in writing." },
      { type: "p", text: "Volunteer reimbursements are payable only if MLAI approves them in advance." },
      {
        type: "p",
        text: "Volunteers must protect confidential information, use MLAI systems responsibly, follow access rules and disclose conflicts of interest.",
      },
      {
        type: "p",
        text: "Sponsor recognition, event involvement, brand use, speaker slots, attendee-list access, content rights and sponsorship deliverables must be agreed with MLAI.",
      },
      {
        type: "p",
        text: "Sponsorship or partnership does not mean MLAI endorses a sponsor, product, service, investment opportunity, job listing or other third-party offer unless expressly stated.",
      },
    ],
  },
  {
    id: "educational-public-content",
    title: "9. Educational and public content",
    blocks: [
      {
        type: "p",
        text: "MLAI articles, guides, talks, workshops, templates, resources, hackathon materials, simulations and educational programs are provided for general educational, community and informational purposes.",
      },
      {
        type: "p",
        text: "They are not legal, financial, tax, investment, fundraising, medical, engineering, energy-market, environmental, public policy, cybersecurity, accounting or other professional advice unless MLAI expressly agrees otherwise in a separate written engagement with a qualified professional.",
      },
      { type: "p", text: "You are responsible for seeking professional advice where appropriate." },
    ],
  },
  {
    id: "connected-accounts-oauth",
    title: "10. Connected accounts and OAuth",
    blocks: [
      {
        type: "p",
        text: "Some Services allow you to connect third-party accounts, workspaces, analytics properties, file stores, communication systems, project systems, finance systems or other data sources. Connector use is optional unless a specific project, statement of work or product feature requires it.",
      },
      {
        type: "p",
        text: "When you connect a third-party service, you authorise MLAI to access and process the data you grant through the relevant consent screen, API authorisation, in-product disclosure, file picker, account setting or connector interface.",
      },
      {
        type: "p",
        text: "The exact permissions requested should be shown before you grant access. You should not connect a service unless you understand and accept the requested access.",
      },
      {
        type: "p",
        text: "You may disconnect connected accounts where product controls are available, revoke access directly with the third-party provider, or contact MLAI.",
      },
      {
        type: "p",
        text: "Connector features may stop working if you revoke access, scopes change, a provider changes its API or policy, tokens expire, the third-party service is unavailable, your account is restricted, or you no longer have permissions.",
      },
      { type: "p", text: "Third-party services are governed by their own terms and policies." },
    ],
  },
  {
    id: "google-api-data",
    title: "11. Google API data commitments",
    blocks: [
      {
        type: "p",
        text: "Where MLAI uses information received from Google APIs, MLAI’s use and transfer of that information will adhere to the Google API Services User Data Policy, including the Limited Use requirements.",
      },
      { type: "p", text: "In particular:" },
      {
        type: "list",
        items: [
          "MLAI uses Google user data only to provide or improve user-facing features that are visible in the requesting MLAI product and that you choose to enable;",
          "MLAI requests Google permissions only where needed for implemented features and aims to use the narrowest practical permissions;",
          "MLAI does not sell Google user data or Gmail data;",
          "MLAI does not use Google user data for advertising, retargeting, personalised advertising, interest-based advertising, data broker services, credit-worthiness or lending purposes;",
          "MLAI does not use Google Workspace API data, including Gmail data or Google Drive file content, to create, train or improve generalized or non-personalized AI or machine learning models;",
          "MLAI does not transfer Google user data except as needed to provide or improve a visible user-facing feature with your consent, comply with law, protect security, or as otherwise permitted by Google policy;",
          "MLAI limits human access to Google user data to cases where you have given affirmative permission for specific data, where access is necessary for support, security or legal compliance, or where data is aggregated and anonymised for permitted internal operations.",
        ],
      },
    ],
  },
  {
    id: "ai-outputs-user-review",
    title: "12. AI outputs and user review",
    blocks: [
      {
        type: "p",
        text: "The Services may use automated systems and AI models to assist with drafting, summarisation, coding, analysis, marketing, education, research, extraction, recommendations, simulation, automation, testing and support.",
      },
      {
        type: "p",
        text: "AI-generated or AI-assisted outputs may be inaccurate, incomplete, outdated, biased, unsafe, unsuitable, infringing or misleading.",
      },
      {
        type: "p",
        text: "You must review outputs before relying on them, publishing them, sending them, deploying them, presenting them, submitting them, or using them in decisions.",
      },
      {
        type: "p",
        text: "You are responsible for the accuracy, legality, suitability, approvals, permissions, confidentiality and third-party rights associated with your content and your use of outputs.",
      },
      {
        type: "p",
        text: "MLAI does not guarantee that AI outputs will be error-free, original, secure, compliant, production-ready, commercially effective or suitable for any particular purpose.",
      },
      { type: "p", text: "Outputs are not professional advice unless MLAI expressly agrees otherwise in a separate written engagement." },
    ],
  },
  {
    id: "user-content",
    title: "13. User content",
    blocks: [
      {
        type: "p",
        text: "You retain ownership of content, data, materials, files, prompts, instructions, brand assets, business information, project information and other inputs that you provide to MLAI.",
      },
      {
        type: "p",
        text: "You grant MLAI a limited licence to host, copy, process, transmit, analyse, display, transform and use your content as needed to provide, operate, secure, support, troubleshoot, improve and document the Services, subject to these Terms and our Privacy Policy.",
      },
      {
        type: "p",
        text: "You must ensure that your content does not infringe third-party rights, breach confidentiality obligations, breach privacy laws, contain unlawful material, or include information you are not authorised to provide.",
      },
    ],
  },
  {
    id: "mlai-ip",
    title: "14. MLAI intellectual property",
    blocks: [
      {
        type: "p",
        text: "MLAI and its licensors retain ownership of MLAI websites, software, source code, platform code, game systems, simulations, templates, reusable components, educational materials, tools, libraries, automations, prompts, workflows, designs, models, processes, documentation, know-how, improvements and other pre-existing or reusable materials.",
      },
      { type: "p", text: "No ownership transfer occurs unless MLAI expressly agrees in a signed written assignment." },
      {
        type: "p",
        text: "Feedback, suggestions, ideas, examples, code snippets, prompts, designs, workshop contributions, hackathon submissions or other contributions you provide to MLAI may be used by MLAI for community, educational, product, operational and promotional purposes, unless MLAI has agreed different written terms.",
      },
    ],
  },
  {
    id: "confidentiality",
    title: "15. Confidentiality",
    blocks: [
      {
        type: "p",
        text: "If a project, workshop, founder workflow, grant, studio engagement, software licence or community role gives you access to non-public information, you must keep that information confidential and use it only for the purpose for which it was provided.",
      },
      {
        type: "p",
        text: "MLAI will use reasonable care to protect confidential information you provide, subject to these Terms, our Privacy Policy, agreed project terms, support needs, security needs and legal obligations.",
      },
      {
        type: "p",
        text: "Confidentiality obligations do not apply to information that is public through no breach, already known without restriction, independently developed, or required to be disclosed by law.",
      },
    ],
  },
  {
    id: "vibe-raising",
    title: "16. Vibe Raising terms",
    blocks: [
      {
        type: "p",
        text: "Vibe Raising helps founders and teams prepare founder updates, investor updates, monthly updates, relationship context, milestones, metrics, risks, asks, follow-ups and related investor-readiness materials.",
      },
      {
        type: "p",
        text: "Vibe Raising may process information you enter, upload, generate, approve or connect, including startup profiles, monthly updates, investor asks, customer context, company metrics, source URLs, uploaded materials and enabled sources such as Gmail, Google Drive, Slack, Xero, Linear, Notion, Google Analytics and Search Console.",
      },
      {
        type: "p",
        text: "Connected accounts are optional. You must own, administer or have authority to connect the relevant account, workspace, files, channels or data.",
      },
      {
        type: "p",
        text: "You must review every generated founder update, metric, claim, summary, ask and follow-up before sending, publishing or relying on it.",
      },
      {
        type: "p",
        text: "You must not include confidential third-party information, investor information, customer information, employee information or regulated information unless you have the rights and lawful basis to use it.",
      },
      {
        type: "p",
        text: "You must not use Vibe Raising to mislead investors, customers, grant providers, partners, sponsors or other recipients.",
      },
      {
        type: "p",
        text: "MLAI may, at its discretion, introduce founders to investors, mentors, sponsors, ecosystem partners, community members or other contacts. MLAI does not guarantee introductions, investment, investor interest, due diligence outcomes, funding, valuations, revenue, business success or any other commercial result.",
      },
      { type: "p", text: "Vibe Raising is not legal, financial, tax, investment, fundraising, securities or accounting advice." },
    ],
  },
  {
    id: "vibe-marketing",
    title: "17. Vibe Marketing terms",
    blocks: [
      {
        type: "p",
        text: "Vibe Marketing may help founders and teams with AI-assisted marketing strategy, SEO, AEO, GEO, content planning, topic discovery, keyword clustering, content templates, startup profiles, article generation, page generation, metadata, schema suggestions, internal linking, sitemap workflows, analytics-driven recommendations and optional publishing workflows.",
      },
      {
        type: "p",
        text: "Vibe Marketing may use user-provided startup profiles, website URLs, public website content, approved founder updates, approved Vibe Raising outputs, Google Analytics, Search Console, keyword tools, public search data, uploaded assets, product screenshots, customer personas and other authorised materials.",
      },
      { type: "p", text: "Generated content is draft content unless you or an authorised user approves or publishes it." },
      {
        type: "p",
        text: "You are responsible for reviewing accuracy, legality, brand fit, claims, pricing, testimonials, case studies, regulated-industry statements, competitor references, third-party rights and confidentiality before publishing.",
      },
      {
        type: "p",
        text: "You must not use Vibe Marketing for doorway pages, spam, deceptive content, impersonation, fake reviews, fabricated case studies, unlawful scraping, undisclosed paid endorsements, infringing content or misleading marketing.",
      },
      {
        type: "p",
        text: "MLAI does not guarantee search rankings, traffic, conversions, revenue, backlinks, citations by AI systems, investor interest, customer acquisition, brand outcomes or marketing performance.",
      },
    ],
  },
  {
    id: "cross-product-use",
    title: "18. Cross-product use between Vibe Raising and Vibe Marketing",
    blocks: [
      {
        type: "p",
        text: "Some MLAI products work together. For example, Vibe Raising may help you prepare founder updates, and Vibe Marketing may help you turn approved company information, website content, approved updates, metrics or themes into marketing content.",
      },
      {
        type: "p",
        text: "MLAI may use your account information, startup profile, product settings, approved outputs and user-approved summaries across MLAI products to provide a connected experience.",
      },
      {
        type: "p",
        text: "MLAI will only use connected-source data across products where that use is disclosed, user-facing, authorised by you and permitted by applicable third-party platform policies.",
      },
      {
        type: "p",
        text: "Vibe Marketing is designed to use approved outputs from Vibe Raising, such as final founder updates, approved company profiles, approved metrics summaries and approved customer themes, rather than raw Gmail messages or broad Google Drive file content.",
      },
      {
        type: "p",
        text: "Raw Gmail messages, Google Drive file content, OAuth tokens and other restricted connected-source data are not used across products by default.",
      },
    ],
  },
  {
    id: "grants-project-delivery",
    title: "19. MLAI Grants and project delivery terms",
    blocks: [
      {
        type: "p",
        text: "MLAI may receive grants, sponsorships, purchase orders, invoices, statements of work or project funding to deliver educational, software, community, research, innovation, product, data, workshop or project services.",
      },
      { type: "p", text: "The applicable proposal, invoice, grant agreement, purchase order, statement of work or written project terms define the specific deliverables." },
      { type: "p", text: "These Terms fill gaps unless a signed written agreement says otherwise." },
      {
        type: "p",
        text: "Deliverables may include software builds, hosted access, simulations, games, learning materials, workshops, reports, training, documentation, support, maintenance, configuration, data work and facilitation.",
      },
      {
        type: "p",
        text: "Milestones, acceptance criteria, timelines, fees, licence scope, support levels and included features are set out in the relevant proposal, invoice, purchase order, grant agreement or statement of work.",
      },
      {
        type: "p",
        text: "Clients and co-funders must provide timely feedback, assets, approvals, access, subject-matter input, data, branding, curriculum direction and other dependencies reasonably needed for delivery.",
      },
      {
        type: "p",
        text: "MLAI is not responsible for delays caused by missing feedback, delayed approvals, unavailable third-party services, missing access, changed requirements or client-side dependencies.",
      },
      {
        type: "p",
        text: "Change requests, expanded deployment, new integrations, major curriculum changes, additional modules, substantial UI redesign and new feature work are separate work unless expressly included in the applicable scope.",
      },
      {
        type: "p",
        text: "Unless the relevant statement of work says otherwise, deliverables are accepted when MLAI makes them available for use, delivery, testing or review and the client does not reject them in writing with specific material defects within 10 business days.",
      },
      {
        type: "p",
        text: "Minor defects, ordinary support issues and enhancement requests do not prevent acceptance and may be handled through support, maintenance or change-request processes.",
      },
    ],
  },
  {
    id: "default-software-licence",
    title: "20. Default software licence for grants, projects and MLAI products",
    blocks: [
      {
        type: "p",
        text: "This clause applies where MLAI provides access to MLAI software, hosted tools, educational simulations, games, platforms, prototypes, internal tools, automations or other software as part of a grant, project, client engagement, invoice, proposal or statement of work.",
      },
      {
        type: "p",
        text: "Unless the applicable proposal, invoice, licence, checkout, product plan, statement of work or signed agreement says otherwise, the client receives a non-exclusive, non-transferable, non-sublicensable licence to access and use the MLAI software for the agreed program, users, sites and purposes for two years.",
      },
      { type: "p", text: "The default two-year licence begins on the earliest of:" },
      {
        type: "list",
        items: [
          "the start date stated in the proposal, invoice, statement of work or product plan;",
          "the date MLAI first makes the software available to the client;",
          "the project commencement date; or",
          "the invoice or billing period start date.",
        ],
      },
      {
        type: "p",
        text: "If a proposal, invoice, licence, product plan, statement of work or signed agreement specifies a different term, that specified term applies.",
      },
      {
        type: "p",
        text: "Unless expressly stated otherwise, the default two-year licence does not apply to ordinary website access, event registration, community membership, trial access, temporary demos or subscription products that state their own billing period.",
      },
      {
        type: "p",
        text: "A software licence does not transfer ownership of MLAI software, source code, platform code, game systems, simulations, templates, reusable components, designs, educational materials, assets, workflows, know-how or improvements.",
      },
    ],
  },
  {
    id: "maintenance-enhancements",
    title: "21. Maintenance and enhancements",
    blocks: [
      {
        type: "p",
        text: "For software made available as part of a client project, grant project or educational software licence, basic maintenance is included only where stated in the proposal, invoice, licence, statement of work or product plan.",
      },
      {
        type: "p",
        text: "If software is licensed as part of a grant, education or project deliverable and no maintenance level is specified, basic maintenance means reasonable bug fixes, reasonable technical support, compatibility or security updates, and minor corrections required to keep the software usable for the agreed program during the licence term.",
      },
      {
        type: "p",
        text: "Basic maintenance does not include new features, new modules, new integrations, expanded deployment, major curriculum changes, substantial UI redesign, new asset packs, in-person facilitation, production-scale support, data migration, custom reporting or new product development unless expressly included.",
      },
      {
        type: "p",
        text: "New features, material UI changes, additional modules, integrations, expanded deployment, curriculum redevelopment and new asset packs are separate enhancement work unless expressly included in the applicable scope.",
      },
      {
        type: "p",
        text: "Payment for configuration, enhancements, feature work or support does not transfer ownership of the underlying software or MLAI platform.",
      },
      {
        type: "p",
        text: "Unless expressly stated otherwise, a feature enhancement package does not create a subscription, does not extend the licence term and does not transfer ownership.",
      },
    ],
  },
  {
    id: "studio-builder-hours",
    title: "22. MLAI Studio and builder hours",
    blocks: [
      {
        type: "p",
        text: "MLAI Studio may provide AI-assisted product building, design, prototyping, automation, development, content, integration, analysis, research, product support, builder hours, subscriptions, retainers or fixed-scope work.",
      },
      {
        type: "p",
        text: "Builder hours are time spent by MLAI personnel, contributors or approved contractors on agreed work, including planning, scoping, development, design, prompting, debugging, testing, documentation, review, meetings, deployment and project coordination.",
      },
      {
        type: "p",
        text: "Meetings, project management, review, documentation, QA, deployment and coordination may count as builder hours unless the applicable plan or statement of work says otherwise.",
      },
      { type: "p", text: "Unused hours expire at the end of the billing period unless the applicable plan or statement of work expressly allows rollover." },
      {
        type: "p",
        text: "Urgent work, out-of-scope work, substantial revisions, new integrations, production hardening, security reviews, legal reviews and support outside the agreed scope may require additional fees.",
      },
      {
        type: "p",
        text: "Unless otherwise agreed, the client is responsible for maintaining third-party accounts, API keys, billing, licences, domain names, hosting, analytics accounts, backups and platform permissions.",
      },
      {
        type: "p",
        text: "MLAI Studio provides builder capacity and project support. MLAI does not guarantee funding, customers, revenue, production readiness, regulatory approval, search rankings, investment or business success.",
      },
      {
        type: "p",
        text: "Unless the applicable statement of work says otherwise, the client owns bespoke deliverables created specifically for the client after full payment, except that MLAI retains ownership of MLAI background IP, templates, reusable components, libraries, tools, automations, prompts, platform code, systems, workflows, know-how and pre-existing materials.",
      },
    ],
  },
  {
    id: "workshops-organisers",
    title: "23. Paid workshops and organiser terms",
    blocks: [
      { type: "p", text: "Paid workshops may be governed by separate invoices, event pages, proposals, ticketing terms, sponsorship terms or organiser agreements." },
      { type: "p", text: "Workshop materials, examples, recordings, templates, code, prompts and slides remain MLAI IP or speaker IP unless expressly transferred in writing." },
      { type: "p", text: "Attendee lists, sponsor leads, event recordings and workshop outputs may only be used as agreed with MLAI and in accordance with applicable privacy requirements." },
      { type: "p", text: "Organiser payments, speaker fees, sponsor payments, revenue shares, reimbursement arrangements and ticketing splits must be agreed in writing." },
    ],
  },
  {
    id: "fees-taxes-subscriptions",
    title: "24. Fees, taxes, subscriptions and credits",
    blocks: [
      {
        type: "p",
        text: "Fees, GST, payment timing, renewal terms, subscription terms, credit packs, builder-hour packs, workshop fees, sponsorship fees and licence fees are set out in the applicable checkout, invoice, proposal, product plan, statement of work or written agreement.",
      },
      { type: "p", text: "Unless stated otherwise, fees are payable in Australian dollars and are exclusive of GST and third-party fees." },
      { type: "p", text: "MLAI may suspend or limit paid Services for unpaid amounts, failed payments, expired subscriptions or payment disputes, subject to applicable law." },
      { type: "p", text: "Subscriptions renew for the stated billing period unless cancelled in accordance with the applicable plan or statement of work." },
      { type: "p", text: "Credits, builder-hour packs and prepaid services expire according to the applicable plan, invoice or statement of work." },
      { type: "p", text: "Third-party software, API, hosting, cloud, domain, payment, SMS, email, analytics or infrastructure fees are the client’s responsibility unless expressly included." },
    ],
  },
  {
    id: "acceptable-use",
    title: "25. Acceptable use",
    blocks: [
      { type: "p", text: "You must not, and must not attempt to:" },
      {
        type: "list",
        items: [
          "use the Services unlawfully, deceptively, abusively or in a way that infringes third-party rights;",
          "connect accounts, files, datasets, workspaces, channels, messages, records or systems that you are not authorised to use;",
          "upload malware, exploit code, secrets, tokens, credentials, API keys or data you do not have authority to process;",
          "misuse Google, Gmail, Google Drive, Google Analytics, Search Console or other connected services;",
          "send spam, mass unsolicited messages, fake reviews, deceptive advertising or misleading investor, grant, sponsor or customer communications;",
          "reverse engineer, scrape, bypass, overload, compromise, probe or interfere with the Services or related systems except as permitted by law;",
          "use the Services for surveillance, discriminatory profiling, unlawful monitoring, credit-worthiness, lending, insurance, employment, medical, legal or other high-risk decisions without appropriate professional advice, safeguards and lawful basis;",
          "publish or generate content that is unlawful, defamatory, misleading, infringing, confidential, harmful or deceptive;",
          "use MLAI services to impersonate any person or organisation;",
          "remove attribution, copyright notices or technical controls unless authorised.",
        ],
      },
    ],
  },
  {
    id: "third-party-services",
    title: "26. Third-party services",
    blocks: [
      {
        type: "p",
        text: "The Services may integrate with third-party services, including Google, Gmail, Google Drive, Google Analytics, Search Console, Slack, Xero, Linear, Notion, payment processors, hosting providers, AI infrastructure providers, email tools, analytics services, ticketing platforms and other software or infrastructure providers.",
      },
      { type: "p", text: "Third-party services are governed by their own terms and policies." },
      { type: "p", text: "MLAI is not responsible for third-party service outages, API changes, rate limits, account restrictions, scope changes, billing issues, security incidents or policy changes." },
    ],
  },
  {
    id: "subcontractors",
    title: "27. Subcontractors and service providers",
    blocks: [
      {
        type: "p",
        text: "MLAI may use employees, volunteers, contractors, subcontractors, developers, designers, builders, facilitators, hosting providers, AI infrastructure providers, payment processors, analytics providers and other service providers to deliver the Services.",
      },
      { type: "p", text: "MLAI remains responsible for its delivery obligations under agreed project terms, subject to these Terms." },
    ],
  },
  {
    id: "disclaimers",
    title: "28. Disclaimers",
    blocks: [
      { type: "p", text: "To the maximum extent permitted by law, the Services are provided on an “as is” and “as available” basis." },
      { type: "p", text: "MLAI does not warrant that the Services will be uninterrupted, secure, error-free, compliant with every use case, compatible with every system, or suitable for your particular needs." },
      { type: "p", text: "MLAI does not guarantee fundraising outcomes, investment, investor interest, search rankings, traffic, conversions, customers, revenue, prizes, jobs, grants, educational outcomes, software availability, regulatory compliance, production readiness or business success." },
    ],
  },
  {
    id: "australian-consumer-law",
    title: "29. Australian Consumer Law",
    blocks: [
      { type: "p", text: "Nothing in these Terms excludes, restricts or modifies any rights, guarantees, warranties or remedies that cannot be excluded, restricted or modified under the Australian Consumer Law or other applicable law." },
      { type: "p", text: "Where MLAI is permitted by law to limit its liability for breach of a non-excludable guarantee, MLAI may limit its liability to the resupply of the relevant services, payment of the cost of resupply, repair or replacement of the relevant goods or software, or payment of the cost of repair or replacement, as applicable." },
    ],
  },
  {
    id: "liability",
    title: "30. Limitation of liability",
    blocks: [
      { type: "p", text: "To the maximum extent permitted by law, MLAI is not liable for indirect, incidental, special, consequential, punitive, exemplary or economic loss, or any loss of profits, revenue, goodwill, opportunity, business interruption, data, content, contracts, funding, investment, search rankings, customers or reputation arising from or related to the Services." },
      { type: "p", text: "For paid Services, to the maximum extent permitted by law and unless a signed agreement says otherwise, MLAI’s total liability is limited to the fees paid by you for the relevant Service in the six months before the event giving rise to the claim." },
      { type: "p", text: "For free Services, to the maximum extent permitted by law, MLAI’s total liability is limited to AUD $100." },
      { type: "p", text: "These limitations do not limit liability that cannot be limited by law." },
    ],
  },
  {
    id: "indemnity",
    title: "31. Indemnity",
    blocks: [
      { type: "p", text: "You agree to indemnify MLAI against claims, liabilities, damages, losses and expenses arising out of or related to your use of the Services, your content, your connected accounts or data, your breach of these Terms, your breach of law, or your infringement of third-party rights." },
    ],
  },
  {
    id: "suspension-termination",
    title: "32. Suspension and termination",
    blocks: [
      { type: "p", text: "MLAI may suspend, restrict or terminate access to the Services if we reasonably believe you have breached these Terms, pose a risk to MLAI, other users, third parties or systems, have unpaid fees, or if suspension is required by law, a platform provider, security need or operational requirement." },
      { type: "p", text: "You may stop using the Services at any time and may revoke connected account access as described in our Privacy Policy." },
      { type: "p", text: "Termination does not affect rights, obligations or liabilities that accrued before termination." },
      { type: "p", text: "Clauses intended to survive termination continue, including clauses relating to IP, confidentiality, fees, privacy, liability, indemnity, governing law and dispute resolution." },
    ],
  },
  {
    id: "changes",
    title: "33. Changes to these Terms",
    blocks: [
      { type: "p", text: "We may update these Terms from time to time." },
      { type: "p", text: "We will post the updated Terms on the MLAI website and update the “Last updated” date." },
      { type: "p", text: "If a change materially affects a paid Service, Google user data use or connected-account feature, we will provide notice or seek consent where required." },
    ],
  },
  {
    id: "governing-law",
    title: "34. Governing law",
    blocks: [
      { type: "p", text: "These Terms are governed by the laws of Victoria, Australia." },
      { type: "p", text: "The parties submit to the non-exclusive jurisdiction of the courts of Victoria and the Commonwealth courts of Australia." },
    ],
  },
  {
    id: "contact",
    title: "35. Contact",
    blocks: [
      { type: "p", text: "Our Privacy Policy explains how we collect, use, protect, retain and delete personal information, including Google user data and connected-source data." },
    ],
  },
];

const navLinks = [
  { href: "#services-covered", label: "Services covered" },
  { href: "#connected-accounts-oauth", label: "Connected accounts" },
  { href: "#google-api-data", label: "Google API data" },
  { href: "#vibe-raising", label: "Vibe Raising" },
  { href: "#vibe-marketing", label: "Vibe Marketing" },
  { href: "#grants-project-delivery", label: "Grants and projects" },
  { href: "#default-software-licence", label: "Software licence" },
  { href: "#studio-builder-hours", label: "MLAI Studio" },
  { href: "#contact", label: "Contact" },
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-[var(--brutalist-border)]/15 pt-8">
      <h2 className="flex items-start gap-3 text-2xl font-black leading-8 tracking-tight text-[var(--brutalist-black)] sm:text-3xl">
        <span className="mt-3 h-2 w-10 shrink-0 rounded-full bg-[var(--brutalist-orange)]" aria-hidden="true" />
        <span>{title}</span>
      </h2>
      <div className="mt-5 space-y-4 text-base leading-7 text-[var(--brutalist-black)]/75">{children}</div>
    </section>
  );
}

function List({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 marker:text-[var(--brutalist-orange)]">{children}</ul>;
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
  if (block.type === "list") {
    return (
      <List>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </List>
    );
  }

  if (block.text.startsWith("Our Privacy Policy")) {
    return (
      <p>
        Our <PolicyLink href="/privacy">Privacy Policy</PolicyLink> explains how we collect, use, protect,
        retain and delete personal information, including Google user data and connected-source data.
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

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[var(--brutalist-beige)] pb-16 pt-20 text-[var(--brutalist-black)]">
      <SectionDivider color="#ff3d00" label="Legal" />
      <section className="bg-[var(--brutalist-beige)] p-2 lg:p-3">
        <article className="w-full rounded-2xl border border-gray-400 bg-[linear-gradient(180deg,var(--brutalist-beige)_0%,#fffaf1_100%)] p-4 shadow-[0_24px_80px_rgba(26,26,26,0.08)] sm:rounded-[2.5rem] sm:p-8 lg:p-12">
          <header className="border-b border-[var(--brutalist-border)]/20 pb-10">
            <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.24em] text-[var(--brutalist-orange)]">
              <span>Legal</span>
              <span className="h-1 w-8 rounded-full bg-[var(--brutalist-orange)]" aria-hidden="true" />
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
              MLAI Terms of Service
            </h1>

            <p className="mt-6 text-lg font-black leading-7 text-[var(--brutalist-blue)]">
              Last updated: {LAST_UPDATED}
            </p>

            <div className="mt-8 grid gap-5 text-lg leading-8 text-[var(--brutalist-black)]/78 lg:grid-cols-2">
              {introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 rounded-[1.5rem] bg-[var(--brutalist-black)] p-5 text-white sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--brutalist-mint)]">
                Terms sections
              </p>
              <nav className="mt-4 grid gap-2 text-sm font-semibold leading-6 sm:grid-cols-2 lg:grid-cols-3">
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
                {section.blocks.map((block, index) => (
                  <RenderBlock key={`${section.id}-${index}`} block={block} />
                ))}
                {section.id === "contact" ? <ContactCard /> : null}
              </Section>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
