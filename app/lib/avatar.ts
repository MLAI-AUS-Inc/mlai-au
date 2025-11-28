// Utility functions for avatar generation and initials

/**
 * Extracts initials from a full name
 * @param fullName - The full name to extract initials from
 * @returns The initials (up to 2 characters)
 */
export function getInitials(fullName: string): string {
    if (!fullName) return '??';

    const names = fullName.trim().split(/\s+/);
    if (names.length === 1) {
        return names[0].substring(0, 2).toUpperCase();
    }

    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
}

/**
 * Generates an avatar URL using UI Avatars service
 * @param initials - The initials to display on the avatar
 * @returns The avatar URL
 */
export function generateAvatarUrl(initials: string): string {
    const encoded = encodeURIComponent(initials);
    return `https://ui-avatars.com/api/?name=${encoded}&background=4f46e5&color=fff&size=128`;
}
