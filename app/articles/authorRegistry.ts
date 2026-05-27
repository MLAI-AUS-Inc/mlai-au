// Author Registry

export type SocialLink = { label: string; href: string };

export interface AuthorRegistryEntry {
    personId?: string;
    name: string;
    url?: string;
    honorificPrefix?: string;
    credentials?: string;
    role?: string;
    bio?: string;
    affiliation?: {
        name: string;
        url?: string;
    };
    sameAs?: SocialLink[];
    avatarUrl?: string;
    avatarAlt?: string;
    knowsAbout?: string[];
    registrationNumber?: string;
}

const defaultAuthorProfile = {
    name: 'Content Team',
    role: 'Author',
    credentials: 'MLAI Aus Inc.',
    bio: 'Articles prepared by the MLAI content team.',
} satisfies AuthorRegistryEntry;

const authorRegistry = {
    'default-author': defaultAuthorProfile,
    contentTeam: defaultAuthorProfile,
} satisfies Record<string, AuthorRegistryEntry>;

export type AuthorRegistryKey = keyof typeof authorRegistry;

export const DEFAULT_AUTHOR_KEY: AuthorRegistryKey = 'default-author';

export const DEFAULT_AUTHOR_AVATAR_FALLBACK_URL = '';

const authorRegistryByKey: Record<string, AuthorRegistryEntry> = authorRegistry;

export function getAuthorProfile(key?: AuthorRegistryKey | string | null): AuthorRegistryEntry {
    return authorRegistryByKey[key || DEFAULT_AUTHOR_KEY] ?? authorRegistryByKey[DEFAULT_AUTHOR_KEY];
}

export type DefaultArticleAuthorDetails = AuthorRegistryEntry & {
    name: string;
    avatarUrl?: string;
    avatarAlt?: string;
};

export function getDefaultArticleAuthorDetails(): DefaultArticleAuthorDetails {
    const author = getAuthorProfile(DEFAULT_AUTHOR_KEY);
    const fallbackName = 'Content Team';
    const details: DefaultArticleAuthorDetails = {
        ...author,
        name: author.name || fallbackName,
        avatarAlt: author.avatarAlt || author.name || fallbackName,
    };

    const avatarUrl = author.avatarUrl || DEFAULT_AUTHOR_AVATAR_FALLBACK_URL;
    if (avatarUrl) {
        details.avatarUrl = avatarUrl;
    }

    return details;
}

export function listAuthors(): AuthorRegistryEntry[] {
    return Array.from(new Set(Object.values(authorRegistry)));
}
