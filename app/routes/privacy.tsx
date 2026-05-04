import type { MetaFunction } from "react-router";
import { Container } from "~/components/ui/Container";

const LAST_UPDATED = "4 May 2026";

export const meta: MetaFunction = () => {
  return [
    { title: "MLAI Vibe Raising Privacy Policy | Google and Gmail Data Use" },
    {
      name: "description",
      content:
        "Privacy Policy for MLAI Vibe Raising, including Google OAuth, Gmail data access, AI-assisted monthly founder updates, retention, deletion, and Limited Use commitments.",
    },
    {
      name: "keywords",
      content:
        "MLAI Vibe Raising privacy policy, Gmail integration, Google OAuth, Google user data, Limited Use, data deletion",
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
              MLAI Vibe Raising Privacy Policy
            </h1>
            <div className="mt-16 mb-24 space-y-7 text-base text-zinc-600 dark:text-gray-900">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">
                Last updated: {LAST_UPDATED}
              </h2>

              <p className="mt-4 text-base leading-7 text-zinc-600">
                MLAI Aus Inc ("MLAI", "we", "our", or "us") provides MLAI
                Vibe Raising, a founder tool that helps startups draft monthly
                investor updates from information the founder chooses to provide
                or connect. This Privacy Policy explains how we collect, use,
                store, share, protect, retain, and delete information, including
                Google user data and Gmail data.
              </p>

              <p className="mt-4 text-base leading-7 text-zinc-600">
                By using MLAI websites, applications, and services, including
                MLAI Vibe Raising, you acknowledge the practices described in
                this Privacy Policy.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Information We Collect
              </h2>

              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                Account, Contact, and Support Information
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We may collect information you provide when you create an
                account, contact us, register for events, subscribe to updates,
                request support, or otherwise interact with MLAI. This may
                include your name, email address, company name, role, support
                requests, and communication preferences.
              </p>

              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                Startup and Founder Update Information
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                MLAI Vibe Raising may process startup information that you enter,
                upload, generate, or approve in the product. This may include
                company profile information, goals, metrics, milestones,
                customer conversations, investor asks, risks, blockers, draft
                updates, final updates, notes, files, and other materials you
                choose to use for monthly founder or investor updates.
              </p>

              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                Optional Connected Data Sources
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                You may choose to connect third-party services so MLAI Vibe
                Raising can use relevant context for the update workflow.
                Connected sources may include Google services such as Gmail and
                Google Account profile information, as well as other data sources
                that are available in the product from time to time. You should
                only connect accounts and data that you own or are authorized to
                use.
              </p>

              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                Google and Gmail Data We Access
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                If you choose to connect your Google account, Google will show
                the exact permissions requested before you grant access. Depending
                on the feature you enable, MLAI may access or process:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>Google account identifiers such as your email address and profile information.</li>
                <li>OAuth access tokens and refresh tokens needed to maintain the connection.</li>
                <li>Gmail message and thread identifiers, history identifiers, labels, headers, dates, and other metadata.</li>
                <li>Email subjects, sender and recipient fields, snippets, body text, cleaned or extracted text, and previews.</li>
                <li>Attachment metadata and attachment content when processed for the update workflow.</li>
                <li>Derived artifacts such as relevance scores, summaries, extracted events, metrics, asks, risks, and generated drafts.</li>
              </ul>

              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                Automatically Collected Information
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                When you use our website or services, we may collect technical
                and usage information such as IP address, browser type, device
                information, pages visited, referral source, timestamps, log
                data, product events, and error diagnostics.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                How We Use Information
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We use information to provide, maintain, secure, and improve MLAI
                services. For MLAI Vibe Raising, we use connected and provided
                data to:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>Generate monthly founder and investor update drafts requested by you.</li>
                <li>Identify relevant update signals such as milestones, metrics, investor feedback, customer conversations, risks, asks, and follow-ups.</li>
                <li>Show previews, summaries, source context, and derived outputs in the product.</li>
                <li>Maintain your connected account status and refresh authorized data when needed for the requested workflow.</li>
                <li>Provide support, troubleshoot issues, prevent abuse, protect security, and comply with legal obligations.</li>
                <li>Send service, transactional, and account-related communications.</li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                AI Processing
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                MLAI Vibe Raising may use automated systems and AI models to
                analyze founder-provided data and optional connected data,
                including Gmail data, for the purpose of producing the
                user-facing monthly update workflow you requested. We do not use
                Google Workspace API data, including Gmail data, to create, train,
                or improve generalized AI or machine learning models.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Google User Data and Limited Use Commitments
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                MLAI's use and transfer of information received from Google APIs
                will adhere to the Google API Services User Data Policy,
                including the Limited Use requirements. In particular:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>We use Google user data only to provide or improve user-facing features that are visible in MLAI Vibe Raising.</li>
                <li>We do not sell Google user data or Gmail data.</li>
                <li>We do not use Google user data for advertising, retargeting, personalized advertising, data broker services, credit-worthiness, or lending purposes.</li>
                <li>We do not use Google Workspace API data to create, train, or improve generalized AI or machine learning models.</li>
                <li>We do not transfer Google user data except as needed to provide or improve the user-facing feature with your consent, comply with law, protect security, or as otherwise permitted by Google policy.</li>
                <li>We do not allow humans to read Google user data unless you have given explicit permission, it is necessary for security or legal compliance, or the data has been aggregated and anonymized for permitted internal operations.</li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Sharing and Disclosure
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We do not sell your personal information, Google user data, or
                Gmail data. We may disclose information only in the following
                limited circumstances:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>To service providers that help us operate, host, secure, support, or provide MLAI services, subject to confidentiality and data protection obligations.</li>
                <li>To AI infrastructure providers only as needed to provide the user-facing feature you requested, and not for generalized model training on Google Workspace API data.</li>
                <li>When you direct us to share an output, send an update, invite a collaborator, or otherwise disclose information through the product.</li>
                <li>When required by law, regulation, legal process, or to protect rights, safety, security, and prevent abuse.</li>
                <li>In connection with a merger, acquisition, financing, reorganization, or sale of assets, subject to applicable law and required user consent where Google policy requires it.</li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Data Security
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We use technical and organizational safeguards designed to protect
                information from unauthorized access, alteration, disclosure, or
                destruction. These safeguards include HTTPS for data transmitted
                over external networks, encryption for stored sensitive data where
                applicable, access controls, token protection, and internal
                restrictions on who may access production systems. No system is
                perfectly secure, but we work to maintain a secure operating
                environment for user data and credentials.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Retention and Deletion
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We retain information only for as long as needed to provide MLAI
                services, comply with legal obligations, resolve disputes,
                enforce agreements, maintain security, and support legitimate
                business purposes. For MLAI Vibe Raising:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>OAuth tokens and connected account identifiers are retained while your Google connection is active.</li>
                <li>Selected Gmail message and thread artifacts, extracted text, metadata, relevance signals, and derived outputs may be retained while needed to generate, display, troubleshoot, and improve the user-facing update workflow.</li>
                <li>Generated drafts, monthly updates, summaries, metrics, and other derived outputs may be retained while your account is active or until you delete them or request deletion.</li>
                <li>When you disconnect Google, revoke access, delete your account, or request deletion, we will delete or de-identify associated Google tokens, Gmail artifacts, and derived outputs within a reasonable time unless retention is required or permitted by law, security, or legitimate operational needs.</li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Your Choices and Controls
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                You may choose not to connect Gmail. If you connect Gmail, you may
                disconnect it in MLAI account settings where available, revoke
                MLAI's access from your Google Account permissions page, or email
                us at hi@mlai.au. You may also request access, correction,
                deletion, export, or restriction of your personal information,
                subject to applicable law and verification of your request.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Email Communications and Newsletter
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                If you subscribe to MLAI emails, we may send updates about MLAI
                activities, events, product information, and service notices. You
                can unsubscribe from marketing emails by using the unsubscribe
                link in those emails or by contacting hi@mlai.au. We may still
                send transactional or account-related messages.
              </p>

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
                We may update this Privacy Policy from time to time. If we change
                how MLAI uses Google user data in a material way, we will update
                this Privacy Policy and provide notice or seek consent where
                required before using Google user data for the new purpose.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Contact Us
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                If you have questions about this Privacy Policy, our privacy
                practices, or a deletion request, contact us at:
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
