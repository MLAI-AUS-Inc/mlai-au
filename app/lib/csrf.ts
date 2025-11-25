// Helper function to get CSRF token from cookies
export function getCSRFToken(): string | null {
    if (typeof document === 'undefined') return null;

    const name = 'csrftoken';
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
            return decodeURIComponent(cookie.substring(name.length + 1));
        }
    }

    return null;
}
