import axios, { type InternalAxiosRequestConfig, AxiosHeaders, type AxiosAdapter } from 'axios';

// Catch-all stub adapter: when VITE_STUB_BACKEND=true (typically in
// .env.local, never committed), every API request short-circuits and
// returns a fake empty response instead of hitting api.mlai.au. Keeps
// local dev working when the live backend is slow/down. Safe to commit —
// does nothing in normal dev or production where the flag is unset.
const devStubAdapter: AxiosAdapter = async (config) => {
    const method = (config.method || 'get').toUpperCase();
    console.log(`[API STUB] ${method} ${config.baseURL ?? ''}${config.url ?? ''} → empty stub response`);
    return {
        data: [],
        status: 200,
        statusText: 'OK (dev stub)',
        headers: {},
        config,
    } as any;
};

function applyDevStubAdapter(instance: ReturnType<typeof axios.create>) {
    if (import.meta.env.VITE_STUB_BACKEND === "true") {
        instance.defaults.adapter = devStubAdapter;
    }
}

// Vite uses import.meta.env instead of process.env
const DEFAULT_SITE_URL = import.meta.env.VITE_SITE_URL || 'http://localhost:5173';
const DEFAULT_LOCAL_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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
            // Use the configured local API origin when developing on localhost.
            if (hostname === 'esafety.localhost') {
                return DEFAULT_LOCAL_API_URL;
            }
            return DEFAULT_LOCAL_API_URL;
        }

        // Production domain check
        if (hostname === 'mlai.au' || hostname === 'www.mlai.au') {
            return 'https://api.mlai.au';
        }

        return configured || window.location.origin;
    }

    // Server-side (SSR) fallback
    return configured || DEFAULT_LOCAL_API_URL;
};

export const API_URL = resolveApiBase();

// ... existing code ...
export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});
applyDevStubAdapter(axiosInstance);

// Helper to get the base URL from the environment or fall back to the static config
export function getBaseUrl(env: any): string {
    return env?.BACKEND_BASE_URL || API_URL;
}

// Helper to create an axios instance for a specific request
export function createApiClient(env: any, request?: Request) {
    const baseURL = getBaseUrl(env);
    const headers: Record<string, string> = {};

    if (request) {
        const cookieHeader = request.headers.get("Cookie");
        if (cookieHeader) {
            headers["Cookie"] = cookieHeader;
        }
    }

    const client = axios.create({
        baseURL,
        withCredentials: true,
        headers
    });
    applyDevStubAdapter(client);

    // Add the same interceptors as the global instance
    client.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const csrfToken = getCSRFToken();
            if (csrfToken) {
                if (!config.headers) {
                    config.headers = new AxiosHeaders();
                }
                config.headers.set('X-CSRFToken', csrfToken);
            }
            const headerObject =
                config.headers && typeof config.headers.toJSON === "function"
                    ? config.headers.toJSON()
                    : config.headers;
            console.log(`[API] Request ${config.method?.toUpperCase()} ${config.url}`, {
                baseURL: config.baseURL,
                headers: sanitizeHeaders(headerObject),
                dataIsFormData: config.data instanceof FormData
            });
            return config;
        },
        (error) => Promise.reject(error)
    );

    client.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (!error.response) {
                return Promise.reject(error);
            }
            const { status } = error.response;
            if (status === 403) {
                return Promise.reject(error);
            }
            return Promise.reject(error);
        }
    );

    return client;
}

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

function sanitizeHeaders(
    headers: Record<string, unknown> | AxiosHeaders | undefined,
): Record<string, unknown> | undefined {
    if (!headers || typeof headers !== "object") {
        return headers as Record<string, unknown> | undefined;
    }

    const clone: Record<string, unknown> = { ...(headers as Record<string, unknown>) };
    for (const key of Object.keys(clone)) {
        if (key.toLowerCase() === "cookie") {
            clone[key] = "[redacted]";
        }
    }
    return clone;
}

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
        const headerObject =
            config.headers && typeof config.headers.toJSON === "function"
                ? config.headers.toJSON()
                : config.headers;
        console.log(`[API] Request ${config.method?.toUpperCase()} ${config.url}`, {
            headers: sanitizeHeaders(headerObject),
            dataIsFormData: config.data instanceof FormData
        });
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
