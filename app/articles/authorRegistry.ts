// Author Registry

export type SocialLink = { label: string; href: string };

export interface AuthorRegistryEntry {
    personId?: string;
    name: string;
    url?: string;
    profileUrl?: string;
    honorificPrefix?: string;
    credentials?: string;
    role?: string;
    jobTitle?: string;
    bio?: string;
    description?: string;
    affiliation?: {
        name: string;
        url?: string;
    };
    sameAs?: SocialLink[];
    avatarUrl?: string;
    avatarAlt?: string;
    image?: string;
    imageAlt?: string;
    knowsAbout?: string[];
    registrationNumber?: string;
    [key: string]: any;
}

export const DEFAULT_AUTHOR_AVATAR_FALLBACK_URL = 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/MLAI_Logo%20(1).png?alt=media&token=00b60b5c-0aae-4f08-b970-f3d773699a66';

const authorRegistry = {
    contentTeam: {
        name: 'Content Team',
        role: 'Author',
        jobTitle: 'Author',
        bio: '',
        affiliation: {
            name: 'MLAI Aus Inc.',
            url: 'https://www.mlai.au',
        },
        avatarUrl: DEFAULT_AUTHOR_AVATAR_FALLBACK_URL,
        avatarAlt: 'MLAI Aus Inc. logo',
    },
    'default-author': {
        name: 'Content Team',
        role: 'Author',
        jobTitle: 'Author',
        bio: '',
        affiliation: {
            name: 'MLAI Aus Inc.',
            url: 'https://www.mlai.au',
        },
        avatarUrl: DEFAULT_AUTHOR_AVATAR_FALLBACK_URL,
        avatarAlt: 'MLAI Aus Inc. logo',
    },
} satisfies Record<string, AuthorRegistryEntry>;

export type AuthorRegistryKey = keyof typeof authorRegistry;

export const AUTHOR_REGISTRY = authorRegistry;
export const DEFAULT_AUTHOR_KEY: AuthorRegistryKey = 'default-author';

export function getAuthorProfile(key?: AuthorRegistryKey | string): AuthorRegistryEntry {
    const registry = authorRegistry as Record<string, AuthorRegistryEntry>;
    return registry[key || DEFAULT_AUTHOR_KEY] ?? registry[DEFAULT_AUTHOR_KEY] ?? registry.contentTeam;
}

export function getDefaultArticleAuthorDetails(): AuthorRegistryEntry {
    const author = getAuthorProfile(DEFAULT_AUTHOR_KEY);
    const fallbackName = 'Content Team';
    const avatarUrl = author.avatarUrl || author.image || DEFAULT_AUTHOR_AVATAR_FALLBACK_URL || undefined;

    return {
        ...author,
        name: author.name ?? fallbackName,
        role: author.role ?? author.jobTitle ?? 'Author',
        jobTitle: author.jobTitle ?? author.role ?? 'Author',
        ...(avatarUrl ? { avatarUrl, image: avatarUrl } : {}),
        avatarAlt: author.avatarAlt ?? author.imageAlt ?? author.name ?? fallbackName,
        imageAlt: author.imageAlt ?? author.avatarAlt ?? author.name ?? fallbackName,
    };
}

export function listAuthors(): AuthorRegistryEntry[] {
    return Object.values(authorRegistry);
}

export default authorRegistry;
