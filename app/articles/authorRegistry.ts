// Author Registry

export type SocialLink = { label: string; href: string };

export interface AuthorRegistryEntry {
    personId?: string;
    name: string;
    url?: string;
    honorificPrefix?: string;
    credentials?: string;
    role?: string;
    title?: string;
    bio?: string;
    profile?: string;
    profileUrl?: string;
    affiliation?: {
        name: string;
        url?: string;
    };
    sameAs?: SocialLink[];
    avatarUrl?: string;
    avatarAlt?: string;
    knowsAbout?: string[];
    registrationNumber?: string;
    [key: string]: any;
}

export const authorRegistry = {
    contentTeam: {
        personId: 'content-team',
        name: 'Content Team',
        role: 'Author',
        title: 'Author',
        credentials: 'MLAI Aus Inc.',
        bio: 'Editorial contributors from MLAI Aus Inc.',
        affiliation: {
            name: 'MLAI Aus Inc.',
            url: 'https://mlai.au',
        },
    },
    'default-author': {
        personId: 'content-team',
        name: 'Content Team',
        role: 'Author',
        title: 'Author',
        credentials: 'MLAI Aus Inc.',
        bio: 'Editorial contributors from MLAI Aus Inc.',
        affiliation: {
            name: 'MLAI Aus Inc.',
            url: 'https://mlai.au',
        },
    },
} satisfies Record<string, AuthorRegistryEntry>;

export const AUTHOR_REGISTRY = authorRegistry;

export type AuthorRegistryKey = keyof typeof authorRegistry;

export const DEFAULT_AUTHOR_KEY: AuthorRegistryKey = 'default-author';

export const DEFAULT_AUTHOR_AVATAR_FALLBACK_URL = '';

function isAuthorRegistryKey(key?: string): key is AuthorRegistryKey {
    return Boolean(key && key in authorRegistry);
}

export function getAuthorProfile(key?: AuthorRegistryKey | string): AuthorRegistryEntry {
    return authorRegistry[isAuthorRegistryKey(key) ? key : DEFAULT_AUTHOR_KEY];
}

export const getArticleAuthorProfile = getAuthorProfile;

export function getDefaultArticleAuthorDetails(): AuthorRegistryEntry {
    const author = getAuthorProfile(DEFAULT_AUTHOR_KEY);
    const fallbackName = 'Content Team';

    return {
        ...author,
        name: author?.name ?? fallbackName,
        avatarUrl: author?.avatarUrl || undefined,
        avatarAlt: author?.avatarAlt ?? author?.name ?? fallbackName,
    };
}

export function listAuthors(): AuthorRegistryEntry[] {
    return Object.values(authorRegistry);
}
