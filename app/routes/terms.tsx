import type { ReactNode } from "react";
import type { MetaFunction } from "react-router";
import SectionDivider from "~/components/SectionDivider";

const LAST_UPDATED = "20 May 2026";

export const meta: MetaFunction = () => {
  return [
    { title: "MLAI Terms of Service" },
    {
      name: "description",
      content:
        "MLAI Terms of Service for MLAI websites, events, community programs, founder tools, Vibe Raising, Vibe Marketing, MLAI Studio, project services, grants, software licences, workshops, connected accounts, AI outputs, payments, acceptable use, and Google API data commitments.",
    },
    {
      name: "keywords",
      content:
        "MLAI terms of service, Vibe Raising terms, Vibe Marketing terms, MLAI Studio, software licence, project services, grants, Google OAuth, Gmail integration, AI outputs, Australian Consumer Law",
    },
  ];
};

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

function Subsection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="mt-6 text-lg font-black leading-7 text-[var(--brutalist-blue)]">{title}</h3>
      {children}
    </div>
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
              <p>
                These Terms of Service ("Terms") govern your access to and use of
                the websites, applications, events, community programs, founder
                tools, project services, software, workshops, and other services
                provided by MLAI Aus Inc ("MLAI", "we", "our", or "us").
              </p>

              <p>
                These Terms apply to MLAI websites, events, community programs,
                Vibe Raising, Vibe Marketing, MLAI Studio, MLAI Grants and project
                work, software licensing, paid workshops, subscriptions, builder
                hours, connected-account products, and related services
                (collectively, the "Services"). By accessing or using the Services,
                you agree to be bound by these Terms. If you do not agree, do not
                use the Services.
              </p>
            </div>

            <div className="mt-8 rounded-[1.5rem] bg-[var(--brutalist-black)] p-5 text-white sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--brutalist-mint)]">
                Product schedules
              </p>
              <nav className="mt-4 grid gap-2 text-sm font-semibold leading-6 sm:grid-cols-2 lg:grid-cols-3">
                  <PolicyLink href="#community" className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10">Schedule A - General MLAI Community Terms</PolicyLink>
                  <PolicyLink href="#vibe-raising" className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10">Schedule B - Vibe Raising Terms</PolicyLink>
                  <PolicyLink href="#vibe-marketing" className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10">Schedule C - Vibe Marketing Terms</PolicyLink>
                  <PolicyLink href="#grants-projects" className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10">Schedule D - MLAI Grants and Project Delivery Terms</PolicyLink>
                  <PolicyLink href="#studio" className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10">Schedule E - MLAI Studio Terms</PolicyLink>
                  <PolicyLink href="#software-licence" className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10">Schedule F - Software Licence Terms</PolicyLink>
                  <PolicyLink href="#workshops" className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10">Schedule G - Paid Workshops and Organiser Terms</PolicyLink>
                </nav>
              </div>

            </header>

            <div className="mt-10 space-y-10">

              <Section id="who-we-are" title="1. Who We Are">
                <p>
                  MLAI Aus Inc is a not-for-profit community based in Australia
                  that aims to empower the Australian AI community through events,
                  education, learning-by-doing programs, founder tools, software,
                  project delivery, sponsorships, partnerships, and community
                  programs.
                </p>
                <p>
                  These Terms are intended to operate as MLAI's standard terms for
                  general community participation, software tools, licences, project
                  services, grants, events, workshops, and related deliverables
                  unless MLAI and a counterparty have signed a separate written
                  agreement that says otherwise.
                </p>
              </Section>

              <Section id="services-covered" title="2. Services Covered">
                <p>The Services may include:</p>
                <List>
                  <li>MLAI websites, articles, resources, guides, newsletters, and public content.</li>
                  <li>Events, hackathons, workshops, meetups, community programs, and member spaces.</li>
                  <li>Founder tools, including Vibe Raising and Vibe Marketing.</li>
                  <li>MLAI Studio services, builder hours, subscriptions, retainers, and scoped delivery work.</li>
                  <li>Grant-funded, sponsored, educational, software, research, innovation, and project delivery work.</li>
                  <li>Software licences, hosted tools, educational simulations, maintenance, support, configuration, and feature enhancements.</li>
                  <li>Paid workshops, organiser services, sponsorship packages, and related attendee or sponsor deliverables.</li>
                </List>
              </Section>

              <Section id="eligibility-accounts" title="3. Eligibility and Accounts">
                <List>
                  <li>You must be able to form a legally binding contract to use the Services.</li>
                  <li>You must provide accurate, current, and complete information and keep it updated.</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials and for activity under your account.</li>
                  <li>You must only use accounts, workspaces, API keys, files, datasets, platforms, content, or third-party services that you own, administer, or are authorised to use.</li>
                  <li>If you use the Services on behalf of an organisation, you represent that you have authority to bind that organisation to these Terms.</li>
                </List>
              </Section>

              <Section id="community" title="4. Schedule A - General MLAI Community Terms">
                <Subsection title="Events, Hackathons, and Workshops">
                  <List>
                    <li>MLAI may run in-person, online, hybrid, public, private, free, paid, sponsored, or grant-funded events, workshops, hackathons, and education programs.</li>
                    <li>Registration, ticketing, refunds, cancellations, rescheduling, venue rules, eligibility, judging, prizes, and workshop materials may be governed by event-specific terms in addition to these Terms.</li>
                    <li>MLAI may cancel, postpone, reschedule, change venues, change speakers, modify formats, or refuse entry where reasonably necessary.</li>
                    <li>Unless required by law or stated in event-specific terms, ticket refunds and transfers are handled at MLAI's discretion.</li>
                    <li>You are responsible for your own travel, accommodation, equipment, dietary requirements, allergy management, health needs, and participation decisions.</li>
                    <li>MLAI does not guarantee jobs, funding, investment, introductions, prizes, rankings, commercial outcomes, technical outcomes, or business success from any event or program.</li>
                  </List>
                </Subsection>

                <Subsection title="Community Spaces and Conduct">
                  <List>
                    <li>MLAI may provide community spaces such as Slack, Discord, mailing lists, member directories, event groups, forums, and other collaboration channels.</li>
                    <li>You must participate respectfully, lawfully, and consistently with any code of conduct or moderation rules published by MLAI.</li>
                    <li>MLAI may moderate, remove, suspend, restrict, or terminate access to community spaces or events if conduct creates risk, disrupts the community, breaches these Terms, or is otherwise inappropriate.</li>
                    <li>Community posts, jobs, opportunities, sponsor content, member profiles, and third-party offers are not endorsed by MLAI unless expressly stated.</li>
                  </List>
                </Subsection>

                <Subsection title="Photos, Video, and Recordings">
                  <p>
                    MLAI events may be photographed, filmed, livestreamed, or
                    recorded. By attending an event, you consent to MLAI capturing
                    and using event media that may include your image, likeness, or
                    voice for event operations, community updates, education,
                    archives, reporting, and promotion, unless you notify MLAI in
                    advance or at the event that you do not want to be featured
                    where reasonably practicable.
                  </p>
                </Subsection>

                <Subsection title="Volunteers, Sponsors, and Partners">
                  <List>
                    <li>Volunteer participation does not create an employment relationship unless separately agreed in writing.</li>
                    <li>Volunteer reimbursements are payable only if MLAI approves them in advance.</li>
                    <li>Volunteers must protect confidential information, use MLAI systems responsibly, follow access rules, and disclose conflicts of interest.</li>
                    <li>Sponsor recognition, event involvement, brand use, speaker slots, attendee-list access, content rights, and sponsorship deliverables must be agreed with MLAI.</li>
                    <li>Sponsorship or partnership does not mean MLAI endorses a sponsor, product, service, investment opportunity, or job listing unless expressly stated.</li>
                  </List>
                </Subsection>

                <Subsection title="Educational Content">
                  <p>
                    MLAI articles, guides, talks, workshops, templates, resources,
                    hackathon materials, and educational programs are provided for
                    general educational and community purposes. They are not legal,
                    financial, tax, investment, medical, engineering, energy-market,
                    environmental, public policy, cyber security, or other
                    professional advice unless MLAI expressly agrees otherwise in a
                    separate written engagement with a qualified professional.
                  </p>
                </Subsection>
              </Section>

              <Section id="connected-accounts" title="5. Connected Accounts and OAuth">
                <p>
                  Some Services allow you to connect third-party accounts,
                  workspaces, analytics properties, file stores, communication
                  systems, project systems, finance systems, or other data sources.
                  Connector use is optional unless a specific project or SOW requires
                  it.
                </p>
                <List>
                  <li>You authorise MLAI to access and process the data you grant through the relevant consent screen, API authorisation, in-product disclosure, file picker, account setting, or connector UI.</li>
                  <li>The exact permissions requested should be shown before you grant access. You should not connect a service unless you understand and accept the requested access.</li>
                  <li>You may disconnect connected accounts where product controls are available, revoke access directly with the third-party provider, or contact MLAI at hi@mlai.au.</li>
                  <li>Connector features may stop working if you revoke access, scopes change, a provider changes its API or policy, tokens expire, the third-party service is unavailable, or you no longer have permissions.</li>
                </List>
                <Subsection title="Google API Data Commitments">
                  <p>
                    MLAI's use and transfer of information received from Google APIs
                    will adhere to the Google API Services User Data Policy,
                    including the Limited Use requirements. In particular:
                  </p>
                  <List>
                    <li>We do not sell Google user data or Gmail data.</li>
                    <li>We do not use Google user data for advertising, retargeting, personalised advertising, data broker services, credit-worthiness, or lending purposes.</li>
                    <li>We do not use Google Workspace API data to create, train, or improve generalized AI or machine learning models.</li>
                    <li>We use Google user data only for disclosed user-facing features that you choose to enable and as otherwise permitted by Google policy and applicable law.</li>
                    <li>We limit human access to Google user data to cases permitted by Google policy, such as your affirmative agreement, support, security, legal compliance, or aggregated internal operations.</li>
                  </List>
                </Subsection>
              </Section>

              <Section id="ai-outputs" title="6. AI Outputs and User Review">
                <p>
                  The Services may use automated systems and AI models to assist with
                  drafting, summarisation, coding, analysis, marketing, education,
                  research, extraction, recommendations, simulation, and support.
                  AI-generated or AI-assisted outputs may be inaccurate, incomplete,
                  outdated, biased, unsafe, unsuitable, or misleading.
                </p>
                <List>
                  <li>You must review outputs before relying on them, publishing them, sending them, deploying them, presenting them, or using them in decisions.</li>
                  <li>You are responsible for the accuracy, legality, suitability, approvals, permissions, and third-party rights associated with your content and your use of outputs.</li>
                  <li>MLAI does not guarantee that AI outputs will be error-free, original, secure, compliant, production-ready, commercially effective, or suitable for any particular purpose.</li>
                  <li>Outputs are not professional advice unless MLAI expressly agrees otherwise in a separate written engagement.</li>
                </List>
              </Section>

              <Section id="user-content-ip" title="7. User Content, MLAI IP, and Licences">
                <Subsection title="Your Content">
                  <p>
                    You retain ownership of content, data, materials, files,
                    prompts, instructions, brand assets, business information, and
                    other inputs that you provide to MLAI ("User Content"). You grant
                    MLAI a limited licence to host, copy, process, transmit, analyse,
                    display, transform, and use User Content as needed to provide,
                    operate, secure, support, troubleshoot, improve, and document the
                    Services, subject to these Terms and our{" "}
                    <PolicyLink href="/privacy">Privacy Policy</PolicyLink>.
                  </p>
                </Subsection>

                <Subsection title="MLAI Intellectual Property">
                  <p>
                    MLAI and its licensors retain ownership of MLAI websites,
                    software, source code, platform code, game systems, simulations,
                    templates, reusable components, educational materials, tools,
                    libraries, automations, prompts, workflows, designs, models,
                    processes, documentation, know-how, improvements, and other
                    pre-existing or reusable materials unless a signed written
                    agreement expressly transfers ownership.
                  </p>
                </Subsection>

                <Subsection title="Community and Workshop Contributions">
                  <p>
                    If you contribute ideas, feedback, code, content, designs,
                    prompts, examples, workshop materials, hackathon submissions, or
                    suggestions to MLAI, you grant MLAI a non-exclusive, worldwide,
                    royalty-free licence to use, reproduce, adapt, publish, display,
                    distribute, and improve those contributions for community,
                    educational, product, operational, and promotional purposes,
                    unless MLAI has agreed different written terms.
                  </p>
                </Subsection>
              </Section>

              <Section id="confidentiality" title="8. Confidentiality">
                <p>
                  If a project, workshop, founder workflow, grant, studio engagement,
                  or community role gives you access to non-public information, you
                  must keep that information confidential and use it only for the
                  purpose for which it was provided. MLAI will use reasonable care to
                  protect confidential information you provide, subject to these
                  Terms, our Privacy Policy, agreed project terms, support needs,
                  security needs, and legal obligations.
                </p>
              </Section>

              <Section id="vibe-raising" title="9. Schedule B - Vibe Raising Terms">
                <p>
                  Vibe Raising helps founders prepare monthly startup and investor
                  updates, structure highlights, metrics, risks, asks, milestones,
                  follow-ups, and relationship context, and may support optional
                  publishing or investor-readiness workflows.
                </p>
                <List>
                  <li>Vibe Raising may process information you enter, upload, generate, approve, or connect, including startup profiles, monthly updates, investor asks, customer context, company metrics, source URLs, uploaded materials, Gmail, Google Drive, Slack, Xero, Linear, Notion, and other enabled sources.</li>
                  <li>Connected accounts are optional. You must own, administer, or have authority to connect the relevant account, workspace, files, channels, or data.</li>
                  <li>You must review every generated founder update, metric, claim, summary, ask, and follow-up before sending, publishing, or relying on it.</li>
                  <li>You must not include confidential third-party information, investor information, customer information, employee information, or regulated information unless you have the rights and lawful basis to use it.</li>
                  <li>You must not use Vibe Raising to mislead investors, customers, grant providers, partners, sponsors, or other recipients.</li>
                </List>
                <Subsection title="Investor Introduction Disclaimer">
                  <p>
                    MLAI may, at its discretion, introduce founders to investors,
                    mentors, sponsors, ecosystem partners, community members, or
                    other contacts. MLAI does not guarantee introductions, investment,
                    investor interest, due diligence outcomes, funding, valuations,
                    revenue, business success, or any other commercial result.
                  </p>
                </Subsection>
                <Subsection title="No Fundraising or Investment Advice">
                  <p>
                    Vibe Raising is not legal, financial, tax, investment,
                    fundraising, securities, or accounting advice. You are responsible
                    for obtaining professional advice where appropriate.
                  </p>
                </Subsection>
              </Section>

              <Section id="vibe-marketing" title="10. Schedule C - Vibe Marketing Terms">
                <p>
                  Vibe Marketing may help founders and teams with AI-assisted
                  marketing strategy, SEO, AEO, GEO, topic discovery, keyword
                  clustering, content templates, startup profiles, article and page
                  generation, metadata, schema suggestions, internal linking,
                  sitemap workflows, analytics-driven recommendations, and optional
                  publishing workflows.
                </p>
                <List>
                  <li>Vibe Marketing may use user-provided startup profiles, website URLs, public website content, approved founder updates, approved Vibe Raising outputs, Google Analytics, Search Console, keyword tools, public search data, uploaded assets, product screenshots, customer personas, and other authorised materials.</li>
                  <li>Generated content is draft content unless you or an authorised user approves or publishes it.</li>
                  <li>You are responsible for reviewing accuracy, legality, brand fit, claims, pricing, testimonials, case studies, regulated-industry statements, competitor references, third-party rights, and confidentiality before publishing.</li>
                  <li>You must not use Vibe Marketing for doorway pages, spam, deceptive content, impersonation, fake reviews, fabricated case studies, unlawful scraping, undisclosed paid endorsements, or infringing content.</li>
                  <li>MLAI does not guarantee search rankings, traffic, conversions, revenue, backlinks, citations by AI systems, investor interest, customer acquisition, brand outcomes, or marketing performance.</li>
                </List>
                <Subsection title="Cross-Product Use With Vibe Raising">
                  <p>
                    Some MLAI products work together. For example, Vibe Raising may
                    help you prepare founder updates, and Vibe Marketing may help you
                    turn approved company information, website content, approved
                    updates, metrics, or themes into marketing content. We will only
                    use connected-source data across products where that use is
                    disclosed, user-facing, authorised by you, and permitted by
                    applicable third-party platform policies.
                  </p>
                  <p>
                    Vibe Marketing should use approved outputs from Vibe Raising,
                    such as final founder updates, approved company profiles,
                    approved metrics summaries, and approved customer themes, rather
                    than raw Gmail messages or broad Google Drive file content unless
                    that raw-source use is specifically disclosed and enabled by you.
                  </p>
                </Subsection>
              </Section>

              <Section id="grants-projects" title="11. Schedule D - MLAI Grants and Project Delivery Terms">
                <p>
                  MLAI may receive grants, sponsorships, purchase orders, invoices,
                  statements of work, or project funding to deliver educational,
                  software, community, research, innovation, or project services.
                  The applicable proposal, invoice, grant agreement, purchase order,
                  statement of work, or written project terms define the specific
                  deliverables. These Terms fill gaps unless a signed written
                  agreement says otherwise. If there is a conflict, signed
                  project-specific terms prevail to the extent of the conflict.
                </p>
                <Subsection title="Deliverables and Project Structure">
                  <List>
                    <li>Deliverables may include software builds, hosted access, simulations, games, learning materials, workshops, reports, training, documentation, support, maintenance, configuration, data work, and facilitation.</li>
                    <li>Milestones, acceptance criteria, timelines, fees, licence scope, support levels, and included features are set out in the relevant proposal, invoice, purchase order, grant agreement, or SOW.</li>
                    <li>Clients and co-funders must provide timely feedback, assets, approvals, access, subject-matter input, data, branding, curriculum direction, and other dependencies reasonably needed for delivery.</li>
                    <li>MLAI is not responsible for delays caused by missing feedback, delayed approvals, unavailable third-party services, missing access, changed requirements, or client-side dependencies.</li>
                    <li>Change requests, expanded deployment, new integrations, major curriculum changes, additional modules, substantial UI redesign, and new feature work are separate work unless expressly included in the SOW.</li>
                  </List>
                </Subsection>

                <Subsection title="Acceptance">
                  <p>
                    Unless the relevant SOW says otherwise, deliverables are accepted
                    when MLAI makes them available for use, delivery, testing, or
                    review and the client does not reject them in writing with
                    specific material defects within 10 business days. Minor defects,
                    ordinary support issues, and enhancement requests do not prevent
                    acceptance and may be handled through support, maintenance, or
                    change-request processes.
                  </p>
                </Subsection>
              </Section>

              <Section id="studio" title="12. Schedule E - MLAI Studio Terms">
                <p>
                  MLAI Studio may provide AI-assisted product building, design,
                  prototyping, automation, development, content, integration,
                  analysis, research, product support, builder hours, subscriptions,
                  retainers, or fixed-scope work.
                </p>
                <List>
                  <li>Builder hours are time spent by MLAI personnel, contributors, or approved contractors on agreed work, including planning, scoping, development, design, prompting, debugging, testing, documentation, review, meetings, deployment, and project coordination.</li>
                  <li>Meetings, project management, review, documentation, QA, deployment, and coordination may count as builder hours unless the applicable SOW says otherwise.</li>
                  <li>Unused hours expire at the end of the billing period unless the applicable plan or SOW expressly allows rollover.</li>
                  <li>Urgent work, out-of-scope work, substantial revisions, new integrations, production hardening, security reviews, legal reviews, and support outside the agreed scope may require additional fees.</li>
                  <li>Unless otherwise agreed, the client is responsible for maintaining third-party accounts, API keys, billing, licences, domain names, hosting, analytics accounts, backups, and platform permissions.</li>
                  <li>MLAI Studio provides builder capacity and project support. MLAI does not guarantee funding, customers, revenue, production readiness, regulatory approval, search rankings, investment, or business success.</li>
                </List>
                <Subsection title="Studio Deliverables and IP">
                  <p>
                    Unless the applicable SOW says otherwise, the client owns bespoke
                    deliverables created specifically for the client after full
                    payment, except MLAI retains ownership of MLAI background IP,
                    templates, reusable components, libraries, tools, automations,
                    prompts, platform code, systems, workflows, know-how, and
                    pre-existing materials.
                  </p>
                </Subsection>
              </Section>

              <Section id="software-licence" title="13. Schedule F - Software Licence Terms">
                <Subsection title="Software Ownership">
                  <p>
                    Unless expressly agreed otherwise in writing, MLAI retains all
                    intellectual property rights in MLAI software, source code, game
                    systems, simulations, templates, reusable components, designs,
                    educational materials, assets, workflows, know-how, and
                    improvements.
                  </p>
                </Subsection>

                <Subsection title="Client Licence">
                  <p>
                    A client receives a non-exclusive, non-transferable licence to
                    access and use MLAI software for the agreed program, term, users,
                    sites, and purposes stated in the applicable proposal, invoice,
                    licence document, purchase order, or SOW. No ownership transfer
                    occurs unless MLAI expressly agrees in a signed written
                    assignment.
                  </p>
                </Subsection>

                <Subsection title="Maintenance and Enhancements">
                  <List>
                    <li>Basic maintenance means bug fixes, reasonable technical support, compatibility or security updates, and minor corrections required to keep the software usable for the agreed program, only where included in the proposal, invoice, licence, or SOW.</li>
                    <li>Basic maintenance does not include new features, new modules, new integrations, expanded deployment, major curriculum changes, substantial UI redesign, new asset packs, or production-scale support unless expressly included.</li>
                    <li>New features, material UI changes, additional modules, integrations, expanded deployment, curriculum redevelopment, and new asset packs are separate enhancement work unless expressly included in the SOW.</li>
                    <li>Payment for configuration, enhancements, feature work, or support does not transfer ownership of the underlying software or MLAI platform.</li>
                  </List>
                </Subsection>

                <Subsection title="Carbon, Cost & Convenience">
                  <p>
                    Carbon, Cost &amp; Convenience is MLAI-owned educational software.
                    Monash Tech School receives a non-exclusive, non-transferable
                    licence to use the software for the Monash Tech School /
                    Supersystems educational program for the period stated in the
                    applicable invoice, proposal, or SOW. Unless a later written
                    agreement says otherwise, the licence period is 1 November 2025
                    to 1 November 2027.
                  </p>
                  <p>
                    Additional feature work, including the additional $24,300
                    enhancement package, is a fixed-fee enhancement package to the
                    existing licensed software. It does not transfer ownership, does
                    not create a subscription, and does not extend the licence term
                    unless agreed in writing.
                  </p>
                  <p>
                    Carbon, Cost &amp; Convenience is an educational simulation. It is
                    not engineering, energy-market, financial, environmental, legal,
                    or public policy advice.
                  </p>
                </Subsection>
              </Section>

              <Section id="workshops" title="14. Schedule G - Paid Workshops and Organiser Terms">
                <List>
                  <li>Paid workshops may be governed by separate invoices, event pages, proposals, ticketing terms, sponsorship terms, or organiser agreements.</li>
                  <li>Workshop materials, examples, recordings, templates, code, and slides remain MLAI IP or speaker IP unless expressly transferred in writing.</li>
                  <li>Attendee lists, sponsor leads, event recordings, and workshop outputs may only be used as agreed with MLAI and in accordance with applicable privacy requirements.</li>
                  <li>Organiser payments, speaker fees, sponsor payments, revenue shares, reimbursement arrangements, and ticketing splits must be agreed in writing.</li>
                </List>
              </Section>

              <Section id="fees-payment" title="15. Fees, Taxes, Subscriptions, and Credits">
                <List>
                  <li>Fees, GST, payment timing, renewal terms, subscription terms, credit packs, builder-hour packs, workshop fees, sponsorship fees, and licence fees are set out in the applicable checkout, invoice, proposal, SOW, or written agreement.</li>
                  <li>Unless stated otherwise, fees are payable in Australian dollars and are exclusive of GST and third-party fees.</li>
                  <li>MLAI may suspend or limit paid Services for unpaid amounts, failed payments, expired subscriptions, or payment disputes, subject to applicable law.</li>
                  <li>Subscriptions renew for the stated billing period unless cancelled in accordance with the applicable plan or SOW.</li>
                  <li>Credits, builder-hour packs, and prepaid services expire according to the applicable plan, invoice, or SOW.</li>
                </List>
              </Section>

              <Section id="acceptable-use" title="16. Acceptable Use">
                <p>You must not, and must not attempt to:</p>
                <List>
                  <li>Use the Services unlawfully, deceptively, abusively, or in a way that infringes third-party rights.</li>
                  <li>Connect accounts, files, datasets, workspaces, channels, messages, records, or systems that you are not authorised to use.</li>
                  <li>Upload, generate, publish, or send unlawful, misleading, defamatory, infringing, harassing, discriminatory, harmful, unsafe, confidential, or malicious content.</li>
                  <li>Use the Services to send spam, mass unsolicited messages, fake reviews, deceptive advertising, or misleading investor or customer communications.</li>
                  <li>Reverse engineer, scrape, bypass, overload, compromise, probe, or interfere with the Services or related systems except as permitted by law.</li>
                  <li>Upload malware, exploit code, secrets, tokens, API keys, credentials, or data you do not have authority to process.</li>
                  <li>Use the Services to make high-risk decisions without appropriate human review, professional advice, testing, and safeguards.</li>
                </List>
              </Section>

              <Section id="third-party-services" title="17. Third-Party Services">
                <p>
                  The Services may integrate with third-party services, including
                  Google, Gmail, Google Drive, Google Analytics, Search Console,
                  Slack, Xero, Linear, Notion, payment processors, hosting providers,
                  AI infrastructure providers, email tools, analytics services,
                  ticketing platforms, and other software or infrastructure
                  providers. Third-party services are governed by their own terms and
                  policies. MLAI is not responsible for third-party service outages,
                  API changes, rate limits, account restrictions, scope changes,
                  billing issues, security incidents, or policy changes.
                </p>
              </Section>

              <Section id="disclaimers" title="18. Disclaimers">
                <p>
                  To the maximum extent permitted by law, the Services are provided
                  on an "as is" and "as available" basis. MLAI does not warrant that
                  the Services will be uninterrupted, secure, error-free, compliant
                  with every use case, or suitable for your particular needs.
                </p>
                <p>
                  MLAI does not guarantee fundraising outcomes, investment, investor
                  interest, search rankings, traffic, conversions, customers,
                  revenue, prizes, jobs, grants, educational outcomes, software
                  availability, regulatory compliance, production readiness, or
                  business success.
                </p>
              </Section>

              <Section id="australian-consumer-law" title="19. Australian Consumer Law">
                <p>
                  Nothing in these Terms excludes, restricts, or modifies any rights,
                  guarantees, warranties, or remedies that cannot be excluded,
                  restricted, or modified under the Australian Consumer Law or other
                  applicable law.
                </p>
                <p>
                  Where MLAI is permitted by law to limit its liability for breach of
                  a non-excludable guarantee, MLAI may limit its liability to the
                  resupply of the relevant services, payment of the cost of resupply,
                  repair or replacement of the relevant goods or software, or payment
                  of the cost of repair or replacement, as applicable.
                </p>
              </Section>

              <Section id="liability" title="20. Limitation of Liability and Indemnity">
                <p>
                  To the maximum extent permitted by law, MLAI is not liable for
                  indirect, incidental, special, consequential, punitive, exemplary,
                  or economic loss, or any loss of profits, revenue, goodwill,
                  opportunity, business interruption, data, content, contracts,
                  funding, investment, search rankings, customers, or reputation
                  arising from or related to the Services.
                </p>
                <p>
                  You agree to indemnify MLAI against claims, liabilities, damages,
                  losses, and expenses arising out of or related to your use of the
                  Services, your User Content, your connected accounts or data, your
                  breach of these Terms, your breach of law, or your infringement of
                  third-party rights.
                </p>
              </Section>

              <Section id="suspension-termination" title="21. Suspension and Termination">
                <p>
                  MLAI may suspend, restrict, or terminate access to the Services if
                  we reasonably believe you have breached these Terms, pose a risk to
                  MLAI, other users, third parties, or systems, have unpaid fees, or
                  if suspension is required by law, a platform provider, security
                  need, or operational requirement. You may stop using the Services
                  at any time and may revoke connected account access as described in
                  our Privacy Policy.
                </p>
              </Section>

              <Section id="changes-governing-law" title="22. Changes, Governing Law, and Contact">
                <p>
                  We may update these Terms from time to time. We will post the
                  updated Terms on this page and update the "Last updated" date. If a
                  change materially affects a paid Service, Google user data use, or
                  a connected-account feature, we will provide notice or seek consent
                  where required.
                </p>
                <p>
                  These Terms are governed by the laws of Victoria, Australia. The
                  parties submit to the non-exclusive jurisdiction of the courts of
                  Victoria and the Commonwealth courts of Australia.
                </p>
                <p>
                  Our <PolicyLink href="/privacy">Privacy Policy</PolicyLink>{" "}
                  explains how we collect, use, protect, retain, and delete personal
                  information, including Google user data and connected-source data.
                </p>

                <div className="mt-6 rounded-[1.5rem] bg-[var(--brutalist-black)] p-6 text-white">
                  <p className="mb-2 text-base leading-7 text-white">
                    <strong>MLAI Aus Inc</strong>
                  </p>
                  <p className="mb-2 text-base leading-7 text-white/80">Email: hi@mlai.au</p>
                  <p className="text-base leading-7 text-white/80">Website: https://mlai.au</p>
                </div>
              </Section>
            </div>
          </article>
        </section>
      </main>
  );
}
