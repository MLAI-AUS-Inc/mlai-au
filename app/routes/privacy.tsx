import type { MetaFunction } from "react-router";
import { Container } from "~/components/ui/Container";

const LAST_UPDATED = "30 April 2026";

export const meta: MetaFunction = () => {
  return [
    { title: "MLAI Privacy Policy | Data & Consent Guide" },
    {
      name: "description",
      content:
        "MLAI Privacy Policy covering events, Founder Tools, connected accounts, Google API data, and AI-assisted monthly updates.",
    },
    {
      name: "keywords",
      content:
        "privacy policy, MLAI, machine learning, AI community, personal information, Google API data, Founder Tools",
    },
  ];
};

export default function Privacy() {
  return (
    <>
      <Container className="bg-white pt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-1 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl pt-12 font-bold tracking-tight text-[#3b82f6] sm:text-5xl dark:text-[#3b82f6]">
              MLAI Privacy Policy
            </h1>
            <div className="mt-16 mb-24 space-y-7 text-base text-zinc-600 dark:text-gray-900">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">
                Last updated: {LAST_UPDATED}
              </h2>

              <p className="mt-4 text-base leading-7 text-zinc-600">
                MLAI Aus Inc ("we", "our", or "us") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard information when you visit our websites,
                attend our events, use our applications, or use MLAI Founder
                Tools, including Vibe Raising monthly updates.
              </p>

              <p className="mt-4 text-base leading-7 text-zinc-600">
                By accessing and using our website and services, you agree to the
                terms of this Privacy Policy.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Information We Collect
              </h2>

              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We may collect personal information that you voluntarily provide
                to us when you:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>Create or sign in to an MLAI account</li>
                <li>Register for events or workshops</li>
                <li>Subscribe to our newsletter or mailing list</li>
                <li>Contact us through our website or email</li>
                <li>Apply to volunteer with our organization</li>
                <li>Participate in surveys or feedback forms</li>
                <li>Provide startup, company, workspace, or team profile details</li>
                <li>
                  Upload or enter materials, URLs, notes, documents, or other
                  content into our applications
                </li>
              </ul>

              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                Automatically Collected Information
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                When you visit our website, we may automatically collect certain
                information about your device and browsing behavior, including:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website</li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Founder Tools and Connected Accounts
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                If you use Founder Tools, Vibe Raising, or related software
                features, you may choose to connect third-party accounts or
                provide source materials so MLAI can generate user-requested
                outputs such as monthly updates, summaries, metrics, timelines,
                and drafts.
              </p>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Depending on the features you enable, the information we collect
                and process may include:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>
                  <strong>Google/Gmail:</strong> Gmail metadata, senders,
                  recipients, subjects, dates, snippets, cleaned message or
                  thread text, attachment metadata, and extracted attachment text
                  where enabled and authorized by you.
                </li>
                <li>
                  <strong>Slack:</strong> workspace and channel identifiers,
                  selected channel names, public or private channel indicators,
                  message text, thread context, timestamps, and related message
                  metadata from channels you select or authorize.
                </li>
                <li>
                  <strong>Xero:</strong> organization, tenant, invoice, payment,
                  contact, account, report, profit and loss, balance sheet, and
                  metric information permitted by the scopes granted to MLAI.
                </li>
                <li>
                  <strong>Linear:</strong> workspace, project, issue, comment,
                  status, assignee, cycle, label, and delivery context where a
                  Linear integration is enabled.
                </li>
                <li>
                  <strong>Notion and Google Drive:</strong> page, file, document,
                  folder, metadata, and extracted text where these connectors are
                  enabled and authorized.
                </li>
                <li>
                  <strong>Manual materials:</strong> source URLs, short
                  summaries, recorded notes, uploaded files, pasted text, and
                  other materials you add directly.
                </li>
                <li>
                  <strong>Startup profile and generated outputs:</strong> company
                  profile details, monthly update drafts, generated sections,
                  extracted events, metrics, evidence, recommendations, and
                  review results.
                </li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Google API Data and Limited Use
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                MLAI’s use and transfer of information received from Google APIs
                will adhere to the Google API Services User Data Policy,
                including the Limited Use requirements.
              </p>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                For Google and Gmail data:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>We do not sell Google or Gmail data.</li>
                <li>
                  We do not use Google or Gmail data for advertising,
                  retargeting, or creditworthiness decisions.
                </li>
                <li>
                  We do not use Google or Gmail data to train generalized AI
                  models or foundation models.
                </li>
                <li>
                  We use Google and Gmail data only to provide, maintain, secure,
                  and improve the user-requested features that depend on your
                  connection.
                </li>
                <li>
                  Human access is limited to cases such as security, abuse
                  prevention, support you request, legal compliance, or where you
                  have given explicit permission.
                </li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                How We Use Your Information
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We use the information we collect to:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>Organize and manage events, workshops, and meetups</li>
                <li>Send newsletters and updates about MLAI activities</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Authenticate users and operate MLAI accounts and workspaces</li>
                <li>
                  Provide Founder Tools features, including connector sync,
                  monthly update generation, timelines, summaries, metrics,
                  drafts, and evidence review
                </li>
                <li>
                  Classify, extract, summarize, draft, and review user-requested
                  outputs from connected sources and manual materials
                </li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Coordinate volunteer activities and opportunities</li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                AI Processing
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Some MLAI features use automated systems and AI service providers,
                including Valley and model providers such as OpenAI, to classify,
                extract, summarize, draft, and review outputs that you request.
                We may send connected-source data, manual materials, generated
                drafts, extracted metrics, and evidence to these providers only
                as needed to provide the requested feature, maintain service
                quality, and keep the service secure. We do not use Google or
                Gmail data to train generalized AI models or foundation models.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Email Communications and Newsletter
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                If you subscribe to our newsletter or mailing list, we will send
                you periodic updates about:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>Upcoming events and workshops</li>
                <li>Community news and announcements</li>
                <li>Educational content related to AI and machine learning</li>
                <li>Volunteer opportunities</li>
              </ul>

              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                Unsubscribe Options
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                <strong>You can unsubscribe at any time by clicking the unsubscribe button</strong>{" "}
                included in every email we send. You may also:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>Contact us directly at hi@mlai.au to request removal from our mailing list</li>
                <li>Update your email preferences through the link provided in our emails</li>
                <li>Opt out of specific types of communications while remaining subscribed to others</li>
              </ul>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Once you unsubscribe, we will process your request promptly and
                you will stop receiving marketing emails within 5-10 business
                days. Please note that you may still receive transactional emails
                related to events you have registered for or other essential
                communications.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Information Sharing and Disclosure
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We do not sell your personal information. We do not share
                connected account data for advertising or retargeting. We may
                disclose information only as needed for the following purposes:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>
                  Event management platforms (e.g., Humanitix, Eventbrite) when
                  you register for events
                </li>
                <li>
                  Service providers who assist us in operating our websites,
                  applications, infrastructure, security, analytics, email,
                  support, and AI processing
                </li>
                <li>
                  Third-party services you choose to connect, as needed to
                  complete the action you requested
                </li>
                <li>When required by law or to protect our rights and safety</li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Data Security
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We implement appropriate technical and organizational security
                measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. These measures may
                include access controls, logging, encrypted transport, and
                protected storage for OAuth tokens and other sensitive connection
                data where supported. No method of transmission or storage is
                completely secure.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Data Retention
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We retain personal information only for as long as reasonably
                necessary to provide the Services, maintain account history,
                comply with legal obligations, resolve disputes, enforce
                agreements, prevent abuse, and keep the Services secure.
              </p>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                For connected accounts, we may retain OAuth tokens while your
                connection is active. Source artifacts, extracted text, generated
                drafts, metrics, timeline events, evidence, and review results
                may be retained while your account or workspace is active, until
                you delete them where product controls are available, or until you
                request deletion. Deletion may be subject to legal, security,
                audit, and backup retention requirements.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Disconnecting Accounts and Deleting Data
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                You can disconnect third-party accounts in the product where
                controls are available, and you can also revoke access directly
                through the third-party provider, such as your Google Account
                permissions page. Disconnecting a connector stops future sync for
                that connector but may not automatically remove historical
                generated outputs, source artifacts, metrics, or evidence already
                created from that connection.
              </p>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                To request deletion of data associated with a connector, generated
                monthly update, or MLAI account, email us at{" "}
                <a className="text-[#3b82f6]" href="mailto:hi@mlai.au">
                  hi@mlai.au
                </a>
                . Please include the email address associated with your MLAI
                account and, where relevant, the third-party account you
                connected.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Your Rights
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Depending on your location, you may have certain rights regarding
                your personal information, including:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>The right to access your personal information</li>
                <li>The right to correct or update your information</li>
                <li>The right to delete your information</li>
                <li>The right to restrict processing of your information</li>
                <li>The right to data portability</li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Children's Privacy
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Our services are not directed to children under 13 years of age.
                We do not knowingly collect personal information from children
                under 13.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Changes to This Privacy Policy
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Contact Us
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                If you have any questions about this Privacy Policy or our
                privacy practices, please contact us at:
              </p>

              <div className="mt-4 bg-gray-50 p-6 rounded-lg">
                <p className="mb-2 text-base leading-7 text-zinc-600">
                  <strong>MLAI Aus Inc</strong>
                </p>
                <p className="mb-2 text-base leading-7 text-zinc-600">Email: hi@mlai.au</p>
                <p className="text-base leading-7 text-zinc-600">Website: https://mlai.au</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
