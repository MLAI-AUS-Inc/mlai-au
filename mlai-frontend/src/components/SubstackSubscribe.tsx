'use client'

export default function SubstackSubscribe() {
  // Static iframe embed for newsletter subscription
  return (
    <div className="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[480px] overflow-hidden rounded-lg">
      <iframe
        src="https://mlaiaus.substack.com/embed"
        width="100%"
        height="320"
        style={{ background: 'white' }}
        frameBorder="0"
        scrolling="no"
      />
    </div>
  )
} 