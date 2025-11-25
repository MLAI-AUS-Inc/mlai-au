import axios, { type InternalAxiosRequestConfig, AxiosHeaders } from 'axios';
import { getCSRFToken } from './csrf';

const DEFAULT_SITE_URL = 'http://localhost:5173';

const resolveApiBase = () => {
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        const isLocalhost =
            hostname === 'localhost' ||
            hostname.includes('localhost') ||
            hostname === '127.0.0.1' ||
            hostname === '::1';

        if (isLocalhost) {
            // In development, use the same origin to leverage Vite proxy
            return window.location.origin;
        }

        // In production on client-side, use window origin
        return window.location.origin;
    }

    // Server-side: since we don't have access to env here, 
    // the auth functions will pass the backend URL if needed
    // For now, return empty string - will be handled per-request
    return '';
};

const API_URL = resolveApiBase();

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Request interceptor to add CSRF token
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const csrfToken = getCSRFToken();
        if (csrfToken) {
            if (!config.headers) {
                config.headers = new AxiosHeaders();
            }
            config.headers.set('X-CSRFToken', csrfToken);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (!error.response) {
            return Promise.reject(error);
        }

        const { status } = error.response;
        const originalRequest = error.config;

        // Handle 401 errors (unauthorized)
        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Redirect to login if on client-side
            if (typeof window !== 'undefined') {
                const pathname = window.location.pathname;
                const isAuthRoute = pathname.startsWith('/platform/login') || pathname.startsWith('/verify-email');

                if (!isAuthRoute) {
                    const next = encodeURIComponent(pathname + window.location.search);
                    window.location.href = `/platform/login?next=${next}`;
                }
            }
        }

        return Promise.reject(error);
    }
);

console.log('Axios instance configured with baseURL:', API_URL);
