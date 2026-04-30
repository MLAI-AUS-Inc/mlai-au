import type { MetaFunction } from "react-router";
import { Container } from "~/components/ui/Container";

const LAST_UPDATED = "30 April 2026";

export const meta: MetaFunction = () => {
  return [
    { title: "MLAI Terms of Service" },
    {
      name: "description",
      content:
        "MLAI Terms of Service governing use of MLAI services, Founder Tools, connected accounts, and AI-assisted monthly updates.",
    },
    {
      name: "keywords",
      content:
        "terms of service, MLAI, Founder Tools, Gmail integration, Slack integration, Xero integration, Google OAuth, AI summaries",
    },
  ];
};

export default function TermsOfService() {
  return (
    <>
      <Container className="bg-white pt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-1 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl pt-12 font-bold tracking-tight text-[#3b82f6] sm:text-5xl dark:text-[#3b82f6]">
              MLAI Terms of Service
            </h1>

            <div className="mt-16 mb-24 space-y-7 text-base text-zinc-600 dark:text-gray-900">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">
                Last updated: {LAST_UPDATED}
              </h2>

              <p className="mt-4 text-base leading-7 text-zinc-600">
                These Terms of Service ("Terms") govern your access to and use
                of the MLAI websites, applications, and services (collectively,
                the "Services") provided by MLAI Aus Inc ("MLAI", "we", "our",
                or "us").
              </p>

              <p className="mt-4 text-base leading-7 text-zinc-600">
                By accessing or using the Services, you agree to be bound by
                these Terms. If you do not agree, do not use the Services.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                1. The Services
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                MLAI provides community, educational, and software-based tools,
                which may include AI-powered features. Some features, including
                Founder Tools and Vibe Raising monthly updates, allow you to
                connect third-party accounts or provide materials so MLAI can
                process your data to deliver user-requested outputs such as
                summaries, reports, metrics, timelines, and drafts.
              </p>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Supported connectors may include Google/Gmail, Slack, Xero,
                Linear, Notion, Google Drive, and other services where enabled.
                You may also provide manual materials such as URLs, notes,
                summaries, recordings, pasted text, or uploaded files.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                2. Eligibility and Accounts
              </h2>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>You must be able to form a legally binding contract to use the Services.</li>
                <li>
                  You are responsible for maintaining the confidentiality of your
                  account credentials and for all activity under your account.
                </li>
                <li>
                  You agree to provide accurate, current, and complete
                  information and keep it updated.
                </li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                3. Connected Accounts, OAuth, and Founder Tools Data
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                If you choose to connect a third-party account or workspace, you
                authorize MLAI to access and process the data you explicitly grant
                through the relevant consent screen, API authorization, or in-app
                selection flow for the purpose of providing the feature you
                requested.
              </p>

              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                3.1 What you are authorising
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Depending on the feature you enable, MLAI may access data from
                connected services such as Gmail messages and attachments, Slack
                channels and threads, Xero invoices, payments, contacts, accounts
                and reports, Linear projects and issues, Notion pages, Google
                Drive files, and related metadata. The exact permissions are
                shown in the relevant consent screen or connector UI when you
                connect or select sources.
              </p>

              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                3.2 What we do with connected-source data
              </h3>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>
                  We use connected-source data to provide the user-facing feature
                  you requested, such as generating monthly updates, summaries,
                  insights, metrics, timelines, evidence, and reports about your
                  startup activity.
                </li>
                <li>
                  We may process connected-source data using automated systems
                  and AI service providers to classify, extract, summarize,
                  draft, and review requested outputs.
                </li>
                <li>
                  We may store tokens required to maintain your connection,
                  including refresh tokens where provided, and may store source
                  artifacts, extracted text, evidence, metrics, generated drafts,
                  and other derived outputs associated with your account or
                  workspace.
                </li>
              </ul>

              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                3.3 Google API data use commitments
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                MLAI’s use and transfer of information received from Google APIs
                will adhere to the Google API Services User Data Policy,
                including the Limited Use requirements.
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
                  We limit access to Google and Gmail data to what is necessary
                  to provide, maintain, secure, and support the feature you
                  request, or as otherwise permitted by law and Google policy.
                </li>
              </ul>

              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                3.4 Storage and retention
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Our goal is to store only what is reasonably needed to provide
                and operate the Services. For connected accounts, we may store
                OAuth connection tokens, account identifiers, selected source
                settings, source artifacts, extracted text, evidence, metrics,
                generated drafts, review results, and other outputs associated
                with your account or workspace.
              </p>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We may retain this information while your account or workspace is
                active, until you delete it where product controls are available,
                or until you request deletion, subject to legal, security, audit,
                and backup retention requirements. Disconnecting a connector
                stops future sync for that connector but may not automatically
                delete historical generated outputs, source artifacts, metrics,
                or evidence already created from that connection.
              </p>

              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                3.5 Disconnecting, deleting data, and revoking access
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                You can disconnect connected accounts in the product where
                controls are available, and you can also revoke MLAI access
                directly through the relevant third-party provider. After you
                disconnect or revoke access, some features may stop working.
              </p>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                If you want MLAI to delete data associated with a connector,
                generated monthly update, or AI output, use available product
                controls or email us at <strong>hi@mlai.au</strong> with your
                request. Please include the email address associated with your
                MLAI account and, where relevant, the third-party account or
                workspace you connected.
              </p>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We will action deletion requests within a reasonable time and,
                where applicable, confirm once completed.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                4. Your Responsibilities
              </h2>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>
                  You may only connect accounts, workspaces, channels, files, and
                  data that you own, administer, or are authorized to use with the
                  Services.
                </li>
                <li>
                  You are responsible for ensuring that your use of the Services
                  complies with applicable laws, regulations, third-party terms,
                  privacy obligations, and contractual obligations, including
                  confidentiality obligations to customers, employees, investors,
                  and other third parties.
                </li>
                <li>
                  You are responsible for reviewing generated drafts, metrics,
                  evidence, summaries, and reports before relying on them,
                  publishing them, or sharing them with investors, communities,
                  customers, or other third parties.
                </li>
                <li>
                  You must not share outputs that contain confidential,
                  privileged, personal, or third-party information unless you are
                  authorized to do so.
                </li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                5. Acceptable Use
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                You agree not to misuse the Services. You must not, and must not
                attempt to:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>Access or use the Services in a way that violates any law or infringes the rights of others.</li>
                <li>Attempt to gain unauthorized access to any accounts, systems, or networks.</li>
                <li>
                  Reverse engineer, decompile, or attempt to extract the source
                  code of the Services except to the extent permitted by law.
                </li>
                <li>Upload or transmit malware or interfere with the operation or security of the Services.</li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                6. AI Outputs and Disclaimers
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                The Services may produce outputs generated or assisted by AI,
                including monthly update drafts, summaries, metrics, evidence,
                recommendations, and review results. AI-generated outputs may be
                inaccurate, incomplete, stale, or misleading and should not be
                treated as professional advice, including legal, financial, tax,
                medical, security, or investment advice.
              </p>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Outputs may include confidential, personal, or third-party
                information from connected sources or materials you provide. You
                are solely responsible for reviewing, editing, approving, and
                deciding whether to publish, send, or otherwise use any output.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                7. Intellectual Property
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We and our licensors own all rights, title, and interest in and
                to the Services, including all intellectual property rights. You
                retain ownership of your content. You grant MLAI a limited
                license to process your content solely to provide, operate,
                secure, and support the Services.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                8. Third-Party Services
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                The Services may integrate with third-party services such as
                Google, Gmail, Google Drive, Slack, Xero, Linear, Notion, OpenAI,
                and other AI or infrastructure providers. Third-party services
                are governed by their own terms and policies. MLAI is not
                responsible for third-party services.
              </p>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Connector features may be affected by third-party API outages,
                rate limits, revoked scopes, expired or invalid tokens,
                permission changes, product changes, policy changes, or account
                restrictions. You may need to reconnect accounts or update
                permissions for some features to work.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                9. Suspension and Termination
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We may suspend or terminate your access to the Services if we
                reasonably believe you have violated these Terms, pose a risk to
                the Services, or where required by law. You may stop using the
                Services at any time and may revoke connected account access as
                described above.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                10. Disclaimer of Warranties
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                To the maximum extent permitted by law, the Services are provided
                on an "as is" and "as available" basis. We disclaim all
                warranties, express or implied, including implied warranties of
                merchantability, fitness for a particular purpose, and
                non-infringement.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                11. Limitation of Liability
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                To the maximum extent permitted by law, MLAI will not be liable
                for any indirect, incidental, special, consequential, or punitive
                damages, or any loss of profits, revenue, data, or goodwill
                arising from or related to your use of the Services.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                12. Indemnity
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                You agree to indemnify and hold harmless MLAI from and against
                any claims, liabilities, damages, losses, and expenses arising
                out of or related to your use of the Services, your content, or
                your violation of these Terms.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                13. Privacy
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Our Privacy Policy explains how we collect, use, and protect
                personal information. By using the Services, you agree to our
                Privacy Policy.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                14. Changes to These Terms
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We may update these Terms from time to time. We will post the
                updated Terms on this page and update the "Last updated" date.
                Your continued use of the Services after changes become
                effective constitutes acceptance of the updated Terms.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                15. Contact Us
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                If you have questions about these Terms, contact us at:
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
