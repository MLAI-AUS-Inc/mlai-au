import axios, { type InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

// Vite uses import.meta.env instead of process.env
const DEFAULT_SITE_URL = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';

const resolveApiBase = () => {
    // In Vite, we access env vars via import.meta.env
    const configured = import.meta.env.VITE_API_URL?.trim();

    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        const isLocalhost =
            hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            hostname === '::1' ||
            hostname.endsWith('.localhost');

        if (isLocalhost) {
            // If we are on esafety.localhost, point to the backend on port 80 with the same hostname
            // This ensures cookies with Domain=.localhost are sent/received correctly
            if (hostname === 'esafety.localhost') {
                return 'http://esafety.localhost:80';
            }
            // Fallback for standard localhost or other local domains
            return 'http://localhost:80';
        }

        return configured || window.location.origin;
    }

    // Server-side (SSR) fallback
    return configured || DEFAULT_SITE_URL;
};

const API_URL = resolveApiBase();

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Helper to get CSRF token if it exists (placeholder for now if not using Django CSRF cookies directly)
// If your backend sets a CSRF cookie, you might need to read it here.
const getCSRFToken = () => {
    if (typeof document === 'undefined') return null;
    const name = 'csrftoken';
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const csrfToken = getCSRFToken();
        if (csrfToken) {
            // Create headers if they don't exist
            if (!config.headers) {
                config.headers = new AxiosHeaders();
            }
            // Set the CSRF token
            config.headers.set('X-CSRFToken', csrfToken);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Global response interceptor to catch auth errors
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        // If there is no response object, just reject
        if (!error.response) {
            return Promise.reject(error);
        }

        const { status } = error.response;
        // const originalRequest = error.config;

        // Handle 401 (unauthenticated)
        // For now, we'll just let the error propagate, but we could add refresh logic here later
        // similar to the user's example if we have a refresh token endpoint.

        // Handle 403 (forbidden)
        if (status === 403) {
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);
