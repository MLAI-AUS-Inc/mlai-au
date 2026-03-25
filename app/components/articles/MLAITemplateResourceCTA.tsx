import { Link } from 'react-router'

export interface MLAITemplateResourceCTAProps {
  className?: string
}

export function MLAITemplateResourceCTA({ className = '' }: MLAITemplateResourceCTAProps) {
  return (
    <section className={`my-8 rounded-lg border-l-4 border-[#1028E0] bg-[#1028E0]/5 p-6 ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1028E0]">
            <span className="text-sm font-semibold text-white">📝</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold text-[#1028E0]">Free MLAI Template Resource</h3>
          <p className="mb-4 text-gray-700">
            Download our comprehensive template and checklist to structure your approach systematically. 
            Created by the MLAI community for Australian startups and teams.
          </p>
          <Link
            to="/articles"
            className="inline-block rounded-lg bg-[#1028E0] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1020C2] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Access free templates
          </Link>
        </div>
      </div>
    </section>
  )
}

export default MLAITemplateResourceCTA