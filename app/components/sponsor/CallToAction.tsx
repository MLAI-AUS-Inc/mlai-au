import { ButtonLink } from "~/components/ui/Button";
import { Body, H2 } from "~/components/ui/Typography";

export default function CallToAction() {
  return (
    <div className="bg-teal-500">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <H2 className="text-white">
            Ready to Support Australia&apos;s AI Community?
          </H2>
          <Body className="mx-auto mt-6 max-w-xl text-teal-50">
            Join us in building a thriving AI ecosystem in Australia.
            Let&apos;s discuss how we can create a partnership that delivers
            value for your organization while supporting our community.
          </Body>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <ButtonLink
              href="mailto:hi@mlai.au?subject=Sponsorship Inquiry"
              variant="secondary"
            >
              Contact Us About Sponsorship
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  )
}
