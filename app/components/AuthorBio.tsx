import type { ReactNode } from 'react'

interface AuthorProfile {
    name: string
    role?: string
    bio?: string
    avatarUrl?: string
    url?: string
}

interface AuthorBioProps {
    author?: AuthorProfile
    authors?: AuthorProfile[]
    className?: string
}

export default function AuthorBio({ author, authors, className = '' }: AuthorBioProps) {
    // Normalize to an array
    const authorList = authors ?? (author ? [author] : [])

    if (authorList.length === 0) return null

    return (
        <div className={`not-prose mt-12 rounded-[28px] border border-gray-300 bg-[#f8f3e8] p-7 md:p-9 ${className}`}>
            <h3 className="text-xl font-semibold text-black mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                About the {authorList.length > 1 ? 'Authors' : 'Author'}
            </h3>

            <div className={`grid gap-6 ${authorList.length > 1 ? 'md:grid-cols-3' : 'md:grid-cols-1 max-w-sm mx-auto'}`}>
                {authorList.map((person, idx) => (
                    <ComponentWrapper key={person.name + idx} href={person.url}>
                        <div className="flex flex-col h-full items-center text-center p-4 rounded-xl border border-black/30 bg-white/40 backdrop-blur-[1px] transition-all hover:-translate-y-1 hover:border-black">
                            {person.avatarUrl && (
                                <img
                                    src={person.avatarUrl}
                                    alt={person.name}
                                    className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-100 mb-4"
                                />
                            )}
                            <h4 className="font-semibold text-gray-900">{person.name}</h4>
                            {person.role && (
                                <p className="text-sm text-gray-700 font-medium mb-2">{person.role}</p>
                            )}
                            {person.bio && (
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {person.bio}
                                </p>
                            )}
                        </div>
                    </ComponentWrapper>
                ))}
            </div>

            <p className="mt-6 text-xs text-gray-600 text-center">
                AI-assisted drafting, human-edited and reviewed.
            </p>
        </div>
    )
}

function ComponentWrapper({ href, children }: { href?: string; children: ReactNode }) {
    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="block no-underline"
            >
                {children}
            </a>
        )
    }
    return <div>{children}</div>
}
