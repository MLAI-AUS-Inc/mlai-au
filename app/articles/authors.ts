
export type SocialLink = { label: string; href: string };

export interface AuthorRegistryEntry {
    personId: string;
    name: string;
    url?: string;
    honorificPrefix?: string;
    credentials?: string;
    role?: string;
    bio?: string;
    affiliation?: {
        name: string;
        url: string;
    };
    sameAs?: SocialLink[];
    avatarUrl?: string;
    avatarAlt?: string;
    knowsAbout?: string[];
    registrationNumber?: string;
}

const authorRegistry = {
    samDonegan: {
        personId: 'https://www.mlai.au/#sam-donegan',
        name: 'Dr Sam Donegan',
        honorificPrefix: 'Dr',
        credentials: 'MD, BBioMed',
        role: 'Founder',
        bio: 'Medical doctor and founder of MLAI.',
        affiliation: {
            name: 'MLAI',
            url: 'https://www.mlai.au/',
        },
        sameAs: [
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samueldonegan/' },
        ],
        avatarUrl: 'https://placehold.co/400x400/png', // Placeholder
        avatarAlt: 'Dr Sam Donegan',
    },
} satisfies Record<string, AuthorRegistryEntry>;

export type AuthorRegistryKey = keyof typeof authorRegistry;

export const DEFAULT_AUTHOR_KEY: AuthorRegistryKey = 'samDonegan';

export const DEFAULT_AUTHOR_AVATAR_FALLBACK_URL = 'https://placehold.co/400x400/png';

export function getAuthorProfile(key: AuthorRegistryKey): AuthorRegistryEntry {
    return authorRegistry[key];
}

export function getDefaultArticleAuthorDetails(): {
    name: string;
    avatarUrl?: string;
    avatarAlt?: string;
} {
    const author = getAuthorProfile(DEFAULT_AUTHOR_KEY);
    const fallbackName = 'Dr Sam Donegan';

    return {
        name: author?.name ?? fallbackName,
        avatarUrl: author?.avatarUrl ?? DEFAULT_AUTHOR_AVATAR_FALLBACK_URL,
        avatarAlt: author?.avatarAlt ?? author?.name ?? fallbackName,
    };
}

export function listAuthors(): AuthorRegistryEntry[] {
    return Object.values(authorRegistry);
}
