// Author Registry

export type SocialLink = { label: string; href: string };
export type AuthorSameAsInput = SocialLink | string;

export interface AuthorRegistryEntry {
    [key: string]: any;
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

export type ArticleAuthorDetails = AuthorRegistryEntry & {
    name: string;
    role: string;
    credentials: string;
    bio: string;
    avatarAlt: string;
    avatarUrl?: string;
};

export type ArticleAuthorInput = string | {
    name?: string;
    key?: string;
    authorKey?: string;
    url?: string;
    role?: string;
    credentials?: string;
    bio?: string;
    avatarUrl?: string;
    avatarAlt?: string;
    sameAs?: AuthorSameAsInput[];
};

function labelFromSameAsHref(href: string): string {
    try {
        const hostname = new URL(href).hostname.replace(/^www\./, '');
        return hostname || href;
    } catch {
        return href;
    }
}

export function normalizeAuthorSameAs(sameAs?: AuthorSameAsInput[] | null): SocialLink[] | undefined {
    if (!sameAs || sameAs.length === 0) return undefined;

    const links: SocialLink[] = [];

    for (const item of sameAs) {
        if (typeof item === 'string') {
            const href = item.trim();
            if (href) {
                links.push({ label: labelFromSameAsHref(href), href });
            }
            continue;
        }

        const href = item.href?.trim();
        if (!href) continue;

        links.push({
            label: item.label?.trim() || labelFromSameAsHref(href),
            href,
        });
    }

    return links.length > 0 ? links : undefined;
}

const contentTeamAuthor = {
    personId: 'mlai-content-team',
    name: 'Content Team',
    role: 'Author',
    credentials: '',
    bio: '',
    avatarAlt: 'Content Team',
} satisfies AuthorRegistryEntry;

export const authorRegistry = {
    contentTeam: contentTeamAuthor,
    'default-author': contentTeamAuthor,
} satisfies Record<string, AuthorRegistryEntry>;

export const AUTHOR_REGISTRY = authorRegistry;

export type AuthorRegistryKey = keyof typeof authorRegistry;

export const DEFAULT_AUTHOR_KEY: AuthorRegistryKey = 'default-author';

export const DEFAULT_AUTHOR_AVATAR_FALLBACK_URL = '';

export function isAuthorRegistryKey(key: string): key is AuthorRegistryKey {
    return Object.prototype.hasOwnProperty.call(authorRegistry, key);
}

export function getAuthorProfile(key: AuthorRegistryKey | string | undefined = DEFAULT_AUTHOR_KEY): AuthorRegistryEntry {
    return key && isAuthorRegistryKey(key) ? authorRegistry[key] : authorRegistry[DEFAULT_AUTHOR_KEY];
}

export const getAuthorByKey = getAuthorProfile;
export const resolveAuthorProfile = getAuthorProfile;

export function getArticleAuthorDetails(key: AuthorRegistryKey | string | undefined = DEFAULT_AUTHOR_KEY): ArticleAuthorDetails {
    const author = getAuthorProfile(key);
    const fallbackName = 'Content Team';
    const name = author.name || fallbackName;

    const details: ArticleAuthorDetails = {
        ...author,
        name,
        role: author.role || 'Author',
        credentials: author.credentials || '',
        bio: author.bio || '',
        avatarAlt: author.avatarAlt || name,
    };

    const normalizedSameAs = normalizeAuthorSameAs(author.sameAs);
    if (normalizedSameAs) {
        details.sameAs = normalizedSameAs;
    } else {
        delete details.sameAs;
    }

    const avatarUrl = author.avatarUrl || DEFAULT_AUTHOR_AVATAR_FALLBACK_URL;
    if (avatarUrl) {
        details.avatarUrl = avatarUrl;
    }

    return details;
}

export function getDefaultArticleAuthorDetails(): ArticleAuthorDetails {
    return getArticleAuthorDetails(DEFAULT_AUTHOR_KEY);
}

export function resolveArticleAuthor(author?: ArticleAuthorInput): ArticleAuthorDetails {
    if (!author) return getDefaultArticleAuthorDetails();
    if (typeof author === 'string') return getArticleAuthorDetails(author);

    const { sameAs, ...authorOverrides } = author;
    const key = authorOverrides.authorKey || authorOverrides.key;
    const profile = key ? getAuthorProfile(key) : getAuthorProfile(DEFAULT_AUTHOR_KEY);
    const name = authorOverrides.name || profile.name || 'Content Team';

    const details: ArticleAuthorDetails = {
        ...profile,
        ...authorOverrides,
        name,
        role: authorOverrides.role || profile.role || 'Author',
        credentials: authorOverrides.credentials || profile.credentials || '',
        bio: authorOverrides.bio || profile.bio || '',
        avatarAlt: authorOverrides.avatarAlt || profile.avatarAlt || name,
    };

    const normalizedSameAs = normalizeAuthorSameAs(sameAs ?? profile.sameAs);
    if (normalizedSameAs) {
        details.sameAs = normalizedSameAs;
    } else {
        delete details.sameAs;
    }

    const avatarUrl = authorOverrides.avatarUrl || profile.avatarUrl || DEFAULT_AUTHOR_AVATAR_FALLBACK_URL;
    if (avatarUrl) {
        details.avatarUrl = avatarUrl;
    }

    return details;
}

export function resolveArticleAuthors(authors?: ArticleAuthorInput[]): ArticleAuthorDetails[] {
    if (!authors || authors.length === 0) return [getDefaultArticleAuthorDetails()];
    return authors.map((author) => resolveArticleAuthor(author));
}

export function listAuthors(): AuthorRegistryEntry[] {
    const seen = new Set<string>();

    return Object.values(authorRegistry).filter((author) => {
        const id = author.personId || author.name;
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
    });
}

export default authorRegistry;
