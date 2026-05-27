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
    [key: string]: any;
}

export type ArticleAuthorReference = string | {
    name?: string;
    key?: string;
    authorKey?: string;
    url?: string;
    [key: string]: any;
};

const contentTeamAuthor = {
    personId: 'mlai-content-team',
    name: 'Content Team',
    role: 'Author',
    bio: '',
    affiliation: {
        name: 'MLAI Aus Inc',
        url: 'https://www.mlai.au',
    },
} satisfies AuthorRegistryEntry;

const authorRegistry = {
    'default-author': contentTeamAuthor,
    contentTeam: contentTeamAuthor,
} satisfies Record<string, AuthorRegistryEntry>;

export type AuthorRegistryKey = keyof typeof authorRegistry;

export const AUTHOR_REGISTRY = authorRegistry;
export const DEFAULT_AUTHOR_KEY: AuthorRegistryKey = 'default-author';
export const DEFAULT_AUTHOR_AVATAR_FALLBACK_URL = '';

function isAuthorRegistryKey(key?: string): key is AuthorRegistryKey {
    return Boolean(key && Object.prototype.hasOwnProperty.call(authorRegistry, key));
}

export function getAuthorProfile(key: AuthorRegistryKey | string = DEFAULT_AUTHOR_KEY): AuthorRegistryEntry {
    return isAuthorRegistryKey(key) ? authorRegistry[key] : authorRegistry[DEFAULT_AUTHOR_KEY];
}

export const getAuthorByKey = getAuthorProfile;

export function resolveAuthorProfile(author?: ArticleAuthorReference): AuthorRegistryEntry {
    if (!author) return getAuthorProfile(DEFAULT_AUTHOR_KEY);
    if (typeof author === 'string') return getAuthorProfile(author);

    const key = author.authorKey || author.key || DEFAULT_AUTHOR_KEY;
    const profile = getAuthorProfile(key);

    return {
        ...profile,
        ...author,
        name: author.name || profile.name,
        url: author.url || profile.url,
    };
}

export function getDefaultArticleAuthorDetails(): AuthorRegistryEntry {
    const author = getAuthorProfile(DEFAULT_AUTHOR_KEY);
    const fallbackName = 'Content Team';

    return {
        ...author,
        name: author.name ?? fallbackName,
        avatarUrl: author.avatarUrl || undefined,
        avatarAlt: author.avatarAlt ?? author.name ?? fallbackName,
    };
}

export function listAuthors(): AuthorRegistryEntry[] {
    const seen = new Set<string>();

    return Object.values(authorRegistry).filter((author) => {
        const dedupeKey = author.personId ?? author.name;
        if (seen.has(dedupeKey)) return false;
        seen.add(dedupeKey);
        return true;
    });
}

export { authorRegistry };
export default authorRegistry;
