import { ImageWithFallback as Image } from "~/components/ImageWithFallback"
import { Link } from 'react-router'

type ArticleProviderReferralsCTAProps = {
  title?: string
  body?: string
  primaryHref?: string
  primaryText?: string
  secondaryHref?: string
  secondaryText?: string
  note?: string
  imageSrc?: string
  imageAlt?: string
  id?: string
  className?: string
}

export default function ArticleProviderReferralsCTA({
  title = 'List once. Get matched referrals—free to start.',
  body = 'Create your SupportSorted profile so coordinators, plan managers and families can find you by niche, wait time and location.',
  primaryHref = '/providers',
  primaryText = 'Create your profile (free)',
  secondaryHref = '/providers#how-it-works',
  secondaryText = 'See how referrals work',
  note = 'Keep a free profile live; only pay if you opt into premium boosts.',
  imageSrc = 'https://firebasestorage.googleapis.com/v0/b/a-duet.appspot.com/o/Screenshot%202025-11-17%20at%201.36.19%E2%80%AFpm.png?alt=media&token=c88ce119-a5b1-4d69-b729-d1c346d87cbc',
  imageAlt = 'SupportSorted provider referral dashboard preview',
  id,
  className = '',
}: ArticleProviderReferralsCTAProps) {
  return (
    <section
      id={id}
      className={`my-12 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">For providers</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">{title}</h2>
          <p className="mt-3 text-base text-gray-700">{body}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to={primaryHref}
              className="inline-flex items-center justify-center rounded-full bg-[#1028E0] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0d1bbd]"
            >
              {primaryText}
            </Link>
            {secondaryHref && secondaryText ? (
              <Link
                to={secondaryHref}
                className="inline-flex items-center justify-center rounded-full border border-[#1028E0] px-6 py-3 text-sm font-semibold text-[#1028E0] transition hover:bg-[#1028E0]/10"
              >
                {secondaryText}
              </Link>
            ) : null}
          </div>
          {note ? <p className="mt-4 text-sm text-gray-600">{note}</p> : null}
        </div>

        <div className="relative h-full w-full bg-gray-50">
          <div className="relative mx-auto h-full w-full max-w-2xl p-6">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1344}
              height={840}
              className="h-full w-full rounded-xl border border-gray-200 object-cover shadow-sm"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
