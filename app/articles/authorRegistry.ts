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
    personId: 'mlai-content-team',
    name: 'Content Team',
    url: 'https://mlai.au',
    role: 'Author',
    credentials: 'MLAI Aus Inc.',
    bio: 'Articles are prepared by the MLAI content team for the Australian AI and machine learning community.',
    affiliation: {
        name: 'MLAI Aus Inc.',
        url: 'https://mlai.au',
    },
    avatarAlt: 'Content Team',
} satisfies AuthorRegistryEntry;

const authorRegistry = {
    contentTeam: defaultAuthorProfile,
    'default-author': defaultAuthorProfile,
} satisfies Record<string, AuthorRegistryEntry>;

export type AuthorRegistryKey = keyof typeof authorRegistry;

export const DEFAULT_AUTHOR_KEY: AuthorRegistryKey = 'default-author';

export const DEFAULT_AUTHOR_AVATAR_FALLBACK_URL = '';

function registryAsRecord(): Record<string, AuthorRegistryEntry> {
    return authorRegistry as Record<string, AuthorRegistryEntry>;
}

export function getAuthorProfile(key: AuthorRegistryKey | string = DEFAULT_AUTHOR_KEY): AuthorRegistryEntry {
    const registry = registryAsRecord();
    return registry[key] ?? registry[DEFAULT_AUTHOR_KEY] ?? defaultAuthorProfile;
}

export type DefaultArticleAuthorDetails = AuthorRegistryEntry & {
    name: string;
    role: string;
    credentials: string;
    bio: string;
    avatarAlt: string;
};

export function getDefaultArticleAuthorDetails(): DefaultArticleAuthorDetails {
    const author = getAuthorProfile(DEFAULT_AUTHOR_KEY);
    const fallbackName = 'Content Team';
    const avatarUrl = author.avatarUrl || DEFAULT_AUTHOR_AVATAR_FALLBACK_URL;
    const details: DefaultArticleAuthorDetails = {
        ...author,
        name: author.name || fallbackName,
        role: author.role || 'Author',
        credentials: author.credentials || 'MLAI Aus Inc.',
        bio: author.bio || '',
        avatarAlt: author.avatarAlt || author.name || fallbackName,
    };

    if (avatarUrl) {
        details.avatarUrl = avatarUrl;
    }

    return details;
}

export function listAuthors(): AuthorRegistryEntry[] {
    const seen = new Set<string>();
    return Object.values(authorRegistry).filter(author => {
        const key = author.personId ?? author.name;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}
