import type { MetaFunction } from "react-router";
import { Container } from "~/components/ui/Container";

export const meta: MetaFunction = () => {
  return [
    { title: "MLAI Privacy Policy | Data & Consent Guide" },
    { name: "description", content: "MLAI Privacy Policy outlining the collection, use, and management of personal information for our AI community." },
    { name: "keywords", content: "privacy policy, MLAI, machine learning, AI community, personal information, Australian Privacy Principles" },
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
                Last updated: {new Date().toLocaleDateString()}
              </h2>

              <p className="mt-4 text-base leading-7 text-zinc-600">
                MLAI Aus Inc ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or attend our events.
              </p>

              <p className="mt-4 text-base leading-7 text-zinc-600">
                By accessing and using our website and services, you agree to the terms of this Privacy Policy.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Information We Collect
              </h2>

              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>Register for events or workshops</li>
                <li>Subscribe to our newsletter or mailing list</li>
                <li>Contact us through our website or email</li>
                <li>Apply to volunteer with our organization</li>
                <li>Participate in surveys or feedback forms</li>
              </ul>

              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                Automatically Collected Information
              </h3>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                When you visit our website, we may automatically collect certain information about your device and browsing behavior, including:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website</li>
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
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Coordinate volunteer activities and opportunities</li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Email Communications and Newsletter
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                If you subscribe to our newsletter or mailing list, we will send you periodic updates about:
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
                <strong>You can unsubscribe at any time by clicking the unsubscribe button</strong> included in every email we send. You may also:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>Contact us directly at hi@mlai.au to request removal from our mailing list</li>
                <li>Update your email preferences through the link provided in our emails</li>
                <li>Opt out of specific types of communications while remaining subscribed to others</li>
              </ul>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Once you unsubscribe, we will process your request promptly and you will stop receiving marketing emails within 5-10 business days. Please note that you may still receive transactional emails related to events you have registered for or other essential communications.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Information Sharing and Disclosure
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul className="mt-4 list-disc pl-5 space-y-2 text-base leading-7 text-zinc-600">
                <li>Event management platforms (e.g., Humanitix, Eventbrite) when you register for events</li>
                <li>Service providers who assist us in operating our website and conducting our activities</li>
                <li>When required by law or to protect our rights and safety</li>
              </ul>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Data Security
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Data Retention
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Your Rights
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                Depending on your location, you may have certain rights regarding your personal information, including:
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
                Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Changes to This Privacy Policy
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="mt-8 text-xl font-semibold leading-7 text-gray-900">
                Contact Us
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>

              <div className="mt-4 bg-gray-50 p-6 rounded-lg">
                <p className="mb-2 text-base leading-7 text-zinc-600"><strong>MLAI Aus Inc</strong></p>
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