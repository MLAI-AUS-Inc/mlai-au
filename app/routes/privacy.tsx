import type { ReactNode } from "react";
import type { MetaFunction } from "react-router";
import SectionDivider from "~/components/SectionDivider";

const LAST_UPDATED = "20 May 2026";

export const meta: MetaFunction = () => {
  return [
    { title: "MLAI Privacy Policy" },
    {
      name: "description",
      content:
        "MLAI Privacy Policy covering MLAI websites, events, community programs, Vibe Raising, Vibe Marketing, MLAI Studio, grants, project services, software, Google OAuth, Gmail, Drive, Analytics, Search Console, connected services, AI processing, retention, deletion, and Limited Use commitments.",
    },
    {
      name: "keywords",
      content:
        "MLAI privacy policy, Google user data, Gmail data, Google Drive, Google Analytics, Search Console, Vibe Raising privacy, Vibe Marketing privacy, AI processing, data deletion, Limited Use",
    },
  ];
};

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

function Subsection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="mt-6 text-lg font-black leading-7 text-[var(--brutalist-orange)]">{title}</h3>
      {children}
    </div>
  );
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
              <p>
                MLAI Aus Inc ("MLAI", "we", "our", or "us") is a
                not-for-profit community based in Australia. This Privacy Policy
                explains how we collect, use, store, share, protect, retain, and
                delete information when you use MLAI websites, events, community
                programs, founder tools, connected-account products, project
                services, software, workshops, and related services.
              </p>

              <p>
                This policy covers MLAI generally, Vibe Raising, Vibe Marketing,
                MLAI Studio, MLAI Grants and project work, educational software,
                paid workshops, community activities, volunteers, sponsors, and
                connected services such as Google, Gmail, Google Drive, Google
                Analytics, Search Console, Slack, Xero, Linear, and Notion where
                enabled.
              </p>
            </div>

            <div className="mt-8 rounded-[1.5rem] bg-[var(--brutalist-black)] p-5 text-white sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--brutalist-mint)]">
                Policy sections
              </p>
              <nav className="mt-4 grid gap-2 text-sm font-semibold leading-6 sm:grid-cols-2 lg:grid-cols-4">
                  <PolicyLink href="#information-we-collect" className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10">Information We Collect</PolicyLink>
                  <PolicyLink href="#product-data" className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10">Product-Specific Data</PolicyLink>
                  <PolicyLink href="#google-data" className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10">Google User Data</PolicyLink>
                  <PolicyLink href="#ai-processing" className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10">AI Processing</PolicyLink>
                  <PolicyLink href="#cross-product" className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10">Cross-Product Data Use</PolicyLink>
                  <PolicyLink href="#limited-use" className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10">Google Limited Use Commitments</PolicyLink>
                  <PolicyLink href="#retention-deletion" className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10">Retention, Deletion, and Disconnecting</PolicyLink>
                  <PolicyLink href="#rights" className="rounded-full border border-white/15 px-3 py-2 text-white no-underline transition hover:bg-white/10">Your Rights and Choices</PolicyLink>
                </nav>
              </div>

            </header>

            <div className="mt-10 space-y-10">

              <Section id="who-we-are" title="1. Who We Are and How to Contact Us">
                <p>
                  MLAI Aus Inc operates MLAI websites, community programs, events,
                  founder tools, software, project services, educational programs,
                  and related services. We may act as a community operator, service
                  provider, software provider, project delivery partner, event
                  organiser, sponsor or partner contact point, and platform operator,
                  depending on the service you use.
                </p>
                <p>
                  Contact us at hi@mlai.au for privacy questions, access requests,
                  correction requests, deletion requests, complaints, or questions
                  about connected accounts.
                </p>
              </Section>

              <Section id="scope" title="2. Scope of This Policy">
                <p>This Privacy Policy applies to information MLAI handles through:</p>
                <List>
                  <li>MLAI websites, landing pages, articles, forms, analytics, and newsletters.</li>
                  <li>Events, hackathons, workshops, meetups, community spaces, Slack or Discord groups, member directories, and volunteer programs.</li>
                  <li>Founder tools, including Vibe Raising and Vibe Marketing.</li>
                  <li>MLAI Studio, builder-hour services, subscriptions, retainers, scoped project delivery, and product support.</li>
                  <li>MLAI Grants, sponsored projects, educational software, client projects, research, innovation programs, and software licences.</li>
                  <li>Optional connected services, including Google services and other third-party platforms that you choose to connect.</li>
                </List>
                <p>
                  Third-party websites, platforms, venues, payment processors,
                  ticketing providers, and connected services have their own privacy
                  policies. You should review those policies before using them.
                </p>
              </Section>

              <Section id="information-we-collect" title="3. Information We Collect">
                <Subsection title="Account, Contact, and Support Information">
                  <p>
                    We may collect your name, email address, phone number, company
                    name, role, organisation, profile information, login details,
                    account settings, preferences, support messages, contact forms,
                    communications, and authentication information.
                  </p>
                </Subsection>

                <Subsection title="Website, Analytics, and Usage Information">
                  <p>
                    We may collect IP address, browser type, device information,
                    referral source, pages viewed, timestamps, product events,
                    approximate location, cookies or similar identifiers, error
                    diagnostics, logs, and performance information. We may use
                    analytics tools to understand website and product usage.
                  </p>
                </Subsection>

                <Subsection title="Community, Event, Workshop, and Volunteer Information">
                  <p>
                    We may collect event registrations, ticketing details, attendance
                    records, dietary or accessibility information you provide,
                    speaker and organiser details, hackathon submissions, team
                    details, judging records, prize eligibility information, workshop
                    participation, community profile information, Slack or Discord
                    profile information, volunteer applications, volunteer role
                    information, sponsor and partner contact details, newsletter
                    subscriptions, photos, video, recordings, and feedback.
                  </p>
                </Subsection>

                <Subsection title="Startup, Founder, Client, and Project Information">
                  <p>
                    We may collect startup profiles, company descriptions, website
                    URLs, stage, sector, goals, metrics, milestones, investor asks,
                    customer themes, team details, traction, funding context,
                    uploaded files, product screenshots, brand assets, project
                    briefs, grants information, curriculum materials, client
                    requirements, SOW details, support tickets, deliverables,
                    invoices, purchase orders, and project communications.
                  </p>
                </Subsection>

                <Subsection title="Connected-Account and Source Data">
                  <p>
                    If you choose to connect a third-party service or data source, we
                    may collect account identifiers, workspace identifiers, OAuth
                    tokens, permission details, selected files, selected messages,
                    metadata, extracted text, analytics reports, project records,
                    finance records, source URLs, uploaded materials, generated
                    outputs, and other data permitted by the access you grant and the
                    feature you enable.
                  </p>
                </Subsection>
              </Section>

              <Section id="product-data" title="4. Product-Specific Data">
                <Subsection title="Vibe Raising">
                  <p>
                    Vibe Raising helps founders prepare monthly founder and investor
                    updates. We may process startup profile data, monthly update
                    drafts, final updates, metrics, milestones, highlights, risks,
                    blockers, asks, investor relationship notes, customer or partner
                    conversations, uploaded materials, source URLs, and optional
                    connected-source data from services such as Gmail, Google Drive,
                    Slack, Xero, Linear, Notion, Google Analytics, and Search Console
                    where enabled.
                  </p>
                  <p>
                    We may also create derived outputs such as relevance scores,
                    summaries, extracted events, extracted metrics, source context,
                    suggested asks, draft updates, review notes, and final updates.
                  </p>
                </Subsection>

                <Subsection title="Vibe Marketing">
                  <p>
                    Vibe Marketing may process startup profiles, public website
                    content, website URLs, product descriptions, approved founder
                    updates, approved Vibe Raising outputs, brand assets, customer
                    personas, topic ideas, keyword research, content templates,
                    generated drafts, metadata, schema suggestions, internal-linking
                    suggestions, sitemap information, Google Analytics reports,
                    Search Console reports, and performance data where connected.
                  </p>
                  <p>
                    Vibe Marketing is designed to use approved outputs and
                    user-provided marketing inputs by default, not raw Gmail messages
                    or broad Google Drive content, unless that raw-source use is
                    clearly disclosed in-product, you choose to enable it, and the
                    use is permitted by applicable platform policies and law.
                  </p>
                </Subsection>

                <Subsection title="MLAI Studio and Project Services">
                  <p>
                    MLAI Studio and project services may process project briefs,
                    business requirements, design files, code repositories, API keys
                    or credentials you provide, tickets, product analytics, support
                    logs, documents, meeting notes, client content, third-party
                    account details, deliverables, invoices, and communications
                    needed to deliver scoped work, subscriptions, retainers, builder
                    hours, support, and maintenance.
                  </p>
                </Subsection>

                <Subsection title="MLAI Grants, Educational Software, and Client Programs">
                  <p>
                    Grant-funded and educational programs may involve participant
                    registrations, teacher or facilitator information, student or
                    team submissions, school or partner details, project reports,
                    curriculum inputs, assessment or judging records, usage logs,
                    support records, simulated data, de-identified datasets, and
                    software licence information. Where a program involves children
                    or students, MLAI aims to collect the minimum information needed
                    for the educational purpose and to follow applicable school,
                    partner, consent, and legal requirements.
                  </p>
                </Subsection>
              </Section>

              <Section id="google-data" title="5. Google User Data">
                <p>
                  If you connect a Google account, Google will show the exact
                  permissions requested before you grant access. The Google data MLAI
                  accesses depends on the product, feature, scopes, consent screen,
                  and in-product choices you use.
                </p>

                <Subsection title="Google Account and OAuth Data">
                  <List>
                    <li>Google account identifiers such as email address, profile information, and account ID.</li>
                    <li>OAuth access tokens, refresh tokens, scope grants, token expiry details, and connection status.</li>
                    <li>Account, property, file, message, thread, label, or service identifiers needed to operate the connected feature.</li>
                  </List>
                </Subsection>

                <Subsection title="Gmail Data">
                  <p>
                    If you enable a Gmail-powered feature, MLAI may access or process
                    Gmail data permitted by the scopes you approve, which may include
                    message and thread identifiers, history identifiers, labels,
                    headers, dates, subjects, sender and recipient fields, snippets,
                    body text, cleaned or extracted text, previews, attachment
                    metadata, attachment content where required for the feature, and
                    derived artifacts such as relevance scores, summaries, extracted
                    events, metrics, asks, risks, and generated drafts.
                  </p>
                  <p>
                    Gmail access is used for disclosed user-facing workflows such as
                    finding relevant context for a founder update that you request.
                    We do not use Gmail data for advertising, retargeting, data
                    broker services, credit-worthiness, lending, or generalized AI
                    model training.
                  </p>
                </Subsection>

                <Subsection title="Google Drive Data">
                  <p>
                    If you enable Google Drive features, MLAI may access selected
                    files, file identifiers, folder or permission metadata, document
                    names, MIME types, modified dates, extracted text, comments or
                    content where authorised, and derived outputs needed for the
                    user-facing feature. Where practicable, MLAI prefers selected
                    file access, file-picker flows, app-created files, or per-file
                    access rather than broad Drive-wide access.
                  </p>
                </Subsection>

                <Subsection title="Google Analytics and Search Console Data">
                  <p>
                    If you connect Google Analytics or Search Console, MLAI may
                    process account, property, site, query, page, landing page,
                    impressions, clicks, click-through rate, rankings, traffic,
                    source, medium, conversion, engagement, device, geography, and
                    reporting data permitted by the scopes you approve. We use this
                    data for user-facing reporting, marketing insights, content
                    measurement, and optimisation workflows you enable.
                  </p>
                </Subsection>
              </Section>

              <Section id="other-connected-services" title="6. Other Connected Services">
                <p>Depending on the features you enable, MLAI may process:</p>
                <List>
                  <li><strong>Slack:</strong> workspace identifiers, channel identifiers, selected channel names, public or private channel indicators, messages, threads, timestamps, and metadata.</li>
                  <li><strong>Xero:</strong> organisation, tenant, invoice, payment, contact, account, report, profit and loss, balance sheet, and metric information permitted by granted scopes.</li>
                  <li><strong>Linear:</strong> workspace, project, issue, comment, status, assignee, cycle, label, and delivery context.</li>
                  <li><strong>Notion:</strong> selected pages, databases, blocks, titles, metadata, extracted text, and related content.</li>
                  <li><strong>Manual materials:</strong> uploaded files, source URLs, notes, pasted text, recorded walkthroughs, pitch decks, screenshots, summaries, and supporting documents.</li>
                </List>
              </Section>

              <Section id="ai-processing" title="7. AI Processing">
                <p>
                  MLAI may use AI systems and AI infrastructure providers to assist
                  with drafting, summarisation, extraction, classification, coding,
                  testing, search, marketing, analytics, education, simulation,
                  research, review, automation, and support. We may send relevant
                  inputs and context to those providers only as needed to provide the
                  user-facing feature, service, project, or support you request.
                </p>
                <p>
                  We do not use Google Workspace API data, including Gmail data or
                  Google Drive file content, to create, train, or improve generalized
                  AI or machine learning models. AI-assisted outputs may be retained
                  as part of your account, project, support, or product history as
                  described in this policy.
                </p>
              </Section>

              <Section id="how-we-use" title="8. How We Use Information">
                <p>We use information to:</p>
                <List>
                  <li>Provide, operate, personalise, maintain, secure, troubleshoot, and improve MLAI Services.</li>
                  <li>Run events, workshops, hackathons, community programs, volunteer programs, sponsorships, and partnerships.</li>
                  <li>Create founder updates, marketing drafts, summaries, analytics reports, product recommendations, educational materials, software deliverables, and project outputs you request.</li>
                  <li>Maintain account access, connected account status, OAuth tokens, product settings, and service records.</li>
                  <li>Process payments, invoices, refunds, subscriptions, sponsorships, grants, licences, and workshop fees.</li>
                  <li>Communicate with you about services, support, security, products, events, newsletters, and community activity.</li>
                  <li>Prevent abuse, protect security, debug issues, enforce terms, comply with law, and protect MLAI, users, partners, and the public.</li>
                  <li>Prepare de-identified, aggregated, or statistical insights for operations, reporting, community impact, sponsor reporting, grant reporting, and service improvement.</li>
                </List>
              </Section>

              <Section id="cross-product" title="9. Cross-Product Data Use">
                <p>
                  Where you use multiple MLAI products, we may use your account
                  information, startup profile, approved outputs, and product
                  settings across those products to provide a connected experience.
                  We do not use raw Google Workspace API data, including Gmail
                  messages or Google Drive file content, for a different MLAI product
                  unless that use is clearly disclosed in the product, is part of a
                  user-facing feature you choose to enable, and is permitted by
                  Google policy and applicable law.
                </p>
                <List>
                  <li><strong>Account data</strong> such as name, email, company, and role may be used across MLAI services.</li>
                  <li><strong>Startup profile data</strong> such as company description, website, stage, sector, and goals may be used across Vibe Raising and Vibe Marketing with notice.</li>
                  <li><strong>Approved outputs</strong> such as final founder updates, approved summaries, approved metrics, and approved themes may be used by Vibe Marketing if you opt in or approve that use.</li>
                  <li><strong>Restricted source data</strong> such as raw Gmail, Google Drive file content, private Slack, Xero, Linear, OAuth tokens, and other connected-source data is not used across products by default.</li>
                </List>
              </Section>

              <Section id="sharing" title="10. Sharing and Disclosure">
                <p>
                  We do not sell personal information, Google user data, Gmail data,
                  Google Drive content, or connected-source data. We may disclose
                  information only in limited circumstances:
                </p>
                <List>
                  <li>To service providers that help us host, operate, secure, analyse, support, communicate, process payments, deliver events, manage email, provide AI infrastructure, or provide the Services.</li>
                  <li>To AI infrastructure providers only as needed to provide the user-facing feature, service, support, or project you request.</li>
                  <li>When you direct us to share an output, send an update, invite a collaborator, publish content, submit a project, join an event, or connect a third-party service.</li>
                  <li>With venues, event partners, sponsors, mentors, judges, facilitators, co-organisers, schools, clients, grant providers, or project partners where needed for the relevant program and disclosed or reasonably expected.</li>
                  <li>When required by law, regulation, legal process, grant reporting requirement, safety need, security incident response, or to protect rights and prevent abuse.</li>
                  <li>In connection with a merger, acquisition, financing, reorganisation, or sale of assets, subject to applicable law and any user consent required by Google policy.</li>
                </List>
              </Section>

              <Section id="limited-use" title="11. Google Limited Use Commitments">
                <p>
                  MLAI's use and transfer of information received from Google APIs
                  will adhere to the Google API Services User Data Policy, including
                  the Limited Use requirements. In particular:
                </p>
                <List>
                  <li>We use Google user data only to provide or improve user-facing features that are visible in the requesting MLAI product.</li>
                  <li>We request Google permissions only where needed for implemented features and aim to use the narrowest practical scopes.</li>
                  <li>We do not sell Google user data.</li>
                  <li>We do not use Google user data for advertising, retargeting, personalised advertising, data broker services, credit-worthiness, or lending purposes.</li>
                  <li>We do not use Google Workspace API data to create, train, or improve generalized AI or machine learning models.</li>
                  <li>We do not transfer Google user data except as needed to provide or improve a visible user-facing feature with your consent, comply with law, protect security, or as otherwise permitted by Google policy.</li>
                  <li>We do not allow humans to read Google user data unless you have given affirmative permission for specific data, it is necessary for security or legal compliance, or the data has been aggregated and anonymised for permitted internal operations.</li>
                </List>
              </Section>

              <Section id="international" title="12. International Providers and Transfers">
                <p>
                  MLAI is based in Australia, but some service providers, hosting
                  providers, analytics providers, AI infrastructure providers,
                  payment processors, email tools, and support tools may process
                  information in other countries. Where we disclose personal
                  information to overseas providers, we take reasonable steps to use
                  providers with appropriate privacy, security, confidentiality, and
                  contractual protections.
                </p>
              </Section>

              <Section id="security" title="13. Data Security">
                <p>
                  We use technical and organisational safeguards designed to protect
                  information from unauthorised access, alteration, disclosure, or
                  destruction. Safeguards may include HTTPS, encryption for sensitive
                  stored data where applicable, access controls, token protection,
                  logging, internal access restrictions, least-privilege practices,
                  and security review of systems that handle connected-source data.
                  No system is perfectly secure, and you should use care when
                  choosing what to upload, connect, or share.
                </p>
              </Section>

              <Section id="retention-deletion" title="14. Retention, Deletion, and Disconnecting Accounts">
                <p>
                  We retain information only for as long as needed to provide the
                  Services, operate MLAI, comply with legal obligations, resolve
                  disputes, enforce agreements, maintain security, complete grant or
                  project reporting, and support legitimate operational purposes.
                </p>
                <List>
                  <li><strong>OAuth tokens</strong> are retained while the relevant connection is active. If you disconnect or revoke access, we delete or invalidate stored tokens within a reasonable time.</li>
                  <li><strong>Gmail artifacts and Google source context</strong> are retained only while needed for the user-facing workflow, support, security, troubleshooting, legal compliance, or your account history, unless you request deletion or law permits or requires longer retention.</li>
                  <li><strong>Generated outputs</strong> such as drafts, summaries, reports, marketing content, and final updates may be retained while your account, project, or product history remains active or until deleted or requested for deletion.</li>
                  <li><strong>Event, workshop, volunteer, sponsor, grant, project, licence, and payment records</strong> may be retained for operational, accounting, legal, tax, grant reporting, insurance, and governance purposes.</li>
                  <li><strong>Backups and logs</strong> may retain limited data for a reasonable period before deletion cycles complete.</li>
                </List>
                <p>
                  You may disconnect connected accounts in product settings where
                  available, revoke access directly with the third-party provider, or
                  email hi@mlai.au. After disconnecting, connector-powered features
                  may stop working. Historical generated outputs or cached artifacts
                  may remain until deleted through product controls or by request,
                  unless retention is required or permitted by law, security, or
                  legitimate operational needs.
                </p>
              </Section>

              <Section id="rights" title="15. Your Rights and Choices">
                <p>
                  You may request access, correction, deletion, export, restriction,
                  or information about how MLAI handles your personal information,
                  subject to verification, applicable law, technical feasibility,
                  safety, security, legal, and operational requirements.
                </p>
                <List>
                  <li>You can choose not to connect optional services such as Gmail, Google Drive, Google Analytics, Search Console, Slack, Xero, Linear, or Notion.</li>
                  <li>You can revoke Google access from your Google Account permissions and disconnect in MLAI settings where available.</li>
                  <li>You can unsubscribe from marketing emails using the unsubscribe link or by contacting hi@mlai.au.</li>
                  <li>You can request deletion of account data, connected-source data, generated outputs, or support records by emailing hi@mlai.au with enough detail to verify and action the request.</li>
                </List>
              </Section>

              <Section id="marketing" title="16. Marketing Communications">
                <p>
                  If you subscribe to MLAI emails, register for an event, join a
                  community program, use a product, or otherwise engage with MLAI, we
                  may send service, transactional, product, event, community,
                  sponsor, or newsletter communications. You can unsubscribe from
                  marketing emails, but we may still send transactional, security,
                  account, legal, or service-related messages.
                </p>
              </Section>

              <Section id="children-students" title="17. Children and Students">
                <p>
                  MLAI's general websites and founder tools are not directed to
                  children under 13. Some MLAI educational programs, hackathons, or
                  school software may involve students or young people through a
                  school, parent, guardian, client, partner, or facilitator. In those
                  settings, MLAI aims to collect only what is reasonably needed for
                  the educational program, use simulated or de-identified data where
                  appropriate, and follow applicable consent, school, partner, and
                  legal requirements.
                </p>
              </Section>

              <Section id="changes-contact" title="18. Changes, Contact, and Complaints">
                <p>
                  We may update this Privacy Policy from time to time. We will post
                  the updated policy on this page and update the "Last updated" date.
                  If we change how MLAI uses Google user data in a material way, we
                  will update this Privacy Policy and provide notice or seek consent
                  where required before using Google user data for the new purpose.
                </p>
                <p>
                  If you have questions, requests, or complaints about this Privacy
                  Policy or MLAI's privacy practices, contact us at hi@mlai.au. We
                  will assess privacy complaints and respond within a reasonable
                  period. If you are not satisfied with our response, you may be able
                  to contact the Office of the Australian Information Commissioner or
                  another applicable regulator.
                </p>
                <p>
                  Our <PolicyLink href="/terms">Terms of Service</PolicyLink>{" "}
                  explain the terms that apply to MLAI websites, events, community
                  programs, founder tools, connected-account products, project
                  services, software, workshops, and related services.
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
