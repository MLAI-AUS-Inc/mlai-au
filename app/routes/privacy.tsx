import type { MetaFunction } from "@react-router/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy - MLAI Aus Inc" },
    { name: "description", content: "Privacy Policy for MLAI Aus Inc - learn how we collect, use, and protect your information." },
  ];
};

export default function Privacy() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="prose prose-gray max-w-none">
            <h2>Introduction</h2>
            <p>
              MLAI Aus Inc ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or attend our events.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul>
              <li>Register for events or workshops</li>
              <li>Subscribe to our newsletter or mailing list</li>
              <li>Contact us through our website or email</li>
              <li>Apply to volunteer with our organization</li>
              <li>Participate in surveys or feedback forms</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>
              When you visit our website, we may automatically collect certain information about your device and browsing behavior, including:
            </p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Organize and manage events, workshops, and meetups</li>
              <li>Send newsletters and updates about MLAI activities</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Coordinate volunteer activities and opportunities</li>
            </ul>

            <h2>Email Communications and Newsletter</h2>
            <p>
              If you subscribe to our newsletter or mailing list, we will send you periodic updates about:
            </p>
            <ul>
              <li>Upcoming events and workshops</li>
              <li>Community news and announcements</li>
              <li>Educational content related to AI and machine learning</li>
              <li>Volunteer opportunities</li>
            </ul>

            <h3>Unsubscribe Options</h3>
            <p>
              <strong>You can unsubscribe at any time by clicking the unsubscribe button</strong> included in every email we send. You may also:
            </p>
            <ul>
              <li>Contact us directly at info@mlai.org.au to request removal from our mailing list</li>
              <li>Update your email preferences through the link provided in our emails</li>
              <li>Opt out of specific types of communications while remaining subscribed to others</li>
            </ul>
            <p>
              Once you unsubscribe, we will process your request promptly and you will stop receiving marketing emails within 5-10 business days. Please note that you may still receive transactional emails related to events you have registered for or other essential communications.
            </p>

            <h2>Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
            </p>
            <ul>
              <li>Event management platforms (e.g., Humanitix, Eventbrite) when you register for events</li>
              <li>Service providers who assist us in operating our website and conducting our activities</li>
              <li>When required by law or to protect our rights and safety</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
            </p>

            <h2>Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>The right to access your personal information</li>
              <li>The right to correct or update your information</li>
              <li>The right to delete your information</li>
              <li>The right to restrict processing of your information</li>
              <li>The right to data portability</li>
            </ul>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="mb-2"><strong>MLAI Aus Inc</strong></p>
              <p className="mb-2">Email: info@mlai.org.au</p>
              <p>Website: https://mlai.org.au</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}