export function getInitials(name: string): string {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function generateAvatarUrl(initials: string): string {
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff`;
}
