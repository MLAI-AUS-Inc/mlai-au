import axios, { type InternalAxiosRequestConfig, AxiosHeaders, type AxiosAdapter } from 'axios';
import { looksLikeHtml } from "~/lib/backend-error";

export function shouldUseDevBackendStub() {
    return import.meta.env.DEV && import.meta.env.VITE_STUB_BACKEND === "true";
}

export function shouldUseDevAuthBypass() {
    return import.meta.env.DEV && import.meta.env.VITE_DEV_AUTH_BYPASS === "true";
}

export function shouldUseDevBackendFallback(error?: unknown) {
    if (!import.meta.env.DEV || shouldUseDevBackendStub()) {
        return false;
    }

    const maybeError = error as {
        response?: unknown;
        code?: string;
        message?: string;
        cause?: { code?: string; message?: string };
    } | null | undefined;
    if (maybeError?.response) {
        return false;
    }

    const code = String(maybeError?.code || maybeError?.cause?.code || "");
    const message = String(maybeError?.message || maybeError?.cause?.message || "").toLowerCase();
    return (
        code === "ECONNREFUSED" ||
        code === "ECONNRESET" ||
        code === "ENOTFOUND" ||
        code === "ETIMEDOUT" ||
        code === "ECONNABORTED" ||
        code === "ERR_NETWORK" ||
        message.includes("network connection lost") ||
        message.includes("network error") ||
        message.includes("failed to fetch") ||
        message.includes("connection refused")
    );
}

type SafeBackendError = Error & {
    status?: number;
    code?: string;
    response?: { status: number; data?: unknown };
};

function errorStatus(error: unknown): number | undefined {
    const candidate = error as { status?: unknown; response?: { status?: unknown } } | null;
    const status = candidate?.response?.status ?? candidate?.status;
    return typeof status === "number" && Number.isInteger(status) ? status : undefined;
}

function redactErrorData(value: unknown, depth = 0): unknown {
    if (depth > 5) return "[redacted]";
    if (typeof value === "string") {
        return value
            .replace(/\bBearer\s+[A-Za-z0-9._~+/-]+/gi, "Bearer [redacted]")
            .replace(/\b(access_token|refresh_token|authorization|cookie|sessionid|csrf(?:token)?|password|secret|api[_-]?key)\s*[:=]\s*[^\s;,]+/gi, "$1=[redacted]")
            .slice(0, 2000);
    }
    if (Array.isArray(value)) return value.slice(0, 20).map((item) => redactErrorData(item, depth + 1));
    if (value && typeof value === "object") {
        return Object.fromEntries(
            Object.entries(value as Record<string, unknown>).slice(0, 30).map(([key, item]) => [
                key,
                /cookie|authorization|token|secret|password|credential|api[_-]?key|session/i.test(key)
                    ? "[redacted]"
                    : redactErrorData(item, depth + 1),
            ]),
        );
    }
    return value;
}

// Axios errors contain the complete outgoing request config, including the
// forwarded session Cookie. Never let that object reach a route boundary or a
// console logger. Keep only the status and redacted response details callers use.
export function toSafeApiError(error: unknown): Error {
    if (error instanceof Error && error.name === "BackendRequestError") return error;
    const status = errorStatus(error);
    const candidate = error as { code?: unknown; response?: { data?: unknown } } | null;
    const code = typeof candidate?.code === "string" && /^[A-Z][A-Z0-9_]*$/.test(candidate.code)
        ? candidate.code
        : undefined;
    const safe = new Error(status ? `Backend request failed (${status}).` : "Backend request failed.") as SafeBackendError;
    safe.name = "BackendRequestError";
    // Non-enumerable metadata remains available to existing status/error-detail
    // handling without being serialized into Worker logs.
    if (status !== undefined) {
        const responseData = candidate?.response?.data;
        Object.defineProperty(safe, "status", { value: status });
        Object.defineProperty(safe, "response", {
            value: {
                status,
                data: typeof responseData === "string" && looksLikeHtml(responseData)
                    ? undefined
                    : redactErrorData(responseData),
            },
        });
    }
    if (code) Object.defineProperty(safe, "code", { value: code });
    return safe;
}

export function isApiUnavailableError(error: unknown): boolean {
    const status = errorStatus(error);
    if (status !== undefined) return status >= 500 && status <= 599;
    const code = (error as { code?: unknown } | null)?.code;
    return code === "ECONNABORTED" || code === "ETIMEDOUT" || code === "ERR_NETWORK" ||
        code === "ERR_BAD_RESPONSE" || code === "ECONNRESET" || code === "ECONNREFUSED" || code === "ENOTFOUND";
}

// True when a backend call rejected with HTTP 404. Works across axios adapters — the
// xhr/http/fetch adapters all populate `error.response.status`, and some thrown shapes
// only carry a top-level `status`. SSR loaders use this to treat a deleted/reset run as
// "gone" instead of letting the 404 throw and SSR-500 the whole page.
export function isApiNotFoundError(error: unknown): boolean {
    return errorStatus(error) === 404;
}

// Extract the human-readable failure reason a backend returned, across every thrown shape:
// the axios shape (`error.response.data`), the top-level-status Worker shape (`error.data`, see
// the note above), a string body, and DRF bodies keyed on `detail`/`error`/`message`/
// `non_field_errors` (string or list). Falls back to the error message, then a generic string.
// Used so a real server reason (e.g. a 409 detail) surfaces in the UI instead of axios's opaque
// "Request failed with status code 409".
export function apiErrorDetail(error: unknown, fallback = "Run action failed."): string {
    const body =
        (error as { response?: { data?: unknown } } | null)?.response?.data ??
        (error as { data?: unknown } | null)?.data;
    // A string body is the real reason UNLESS it's an HTML error page (Cloudflare/nginx gateway
    // 5xx, or a Django DEBUG-off 500) — dumping that whole document into the banner is worse than
    // the axios status message, so let those fall through to `error.message`.
    if (typeof body === "string" && body.trim() && !looksLikeHtml(body)) return body.trim();
    if (body && typeof body === "object") {
        const rec = body as Record<string, unknown>;
        const candidate = rec.detail ?? rec.error ?? rec.message ?? rec.non_field_errors;
        if (typeof candidate === "string" && candidate.trim()) return candidate.trim();
        if (Array.isArray(candidate) && typeof candidate[0] === "string" && candidate[0].trim()) {
            return candidate[0].trim();
        }
    }
    const message = (error as { message?: string } | null)?.message;
    return typeof message === "string" && message.trim() ? message.trim() : fallback;
}

// Catch-all stub adapter for local development only. When
// VITE_STUB_BACKEND=true, every API request short-circuits and returns a
// fake empty response instead of hitting api.mlai.au.
const devStubAdapter: AxiosAdapter = async (config) => {
    const method = (config.method || 'get').toUpperCase();
    console.log(`[API STUB] ${method} ${config.baseURL ?? ''}${config.url ?? ''} -> empty stub response`);
    return {
        data: [],
        status: 200,
        statusText: 'OK (dev stub)',
        headers: {},
        config,
    } as any;
};

function applyDevStubAdapter(instance: ReturnType<typeof axios.create>) {
    if (shouldUseDevBackendStub()) {
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

// Bound every backend call so a hung request surfaces an error instead of an
// infinite spinner. Without this, a stuck server-side action (e.g. a reset whose
// backend call never returns) leaves the UI "…ing" forever with no recovery.
export const API_REQUEST_TIMEOUT_MS = 60_000;

// Cloudflare Workers run with nodejs_compat, which makes axios fall back to the
// Node http/https adapter — its outbound-POST handling hangs in the Workers
// runtime (the request body never reaches the origin, so e.g. the article-setup
// reset POST spins forever and the backend never logs it). Force the
// Worker-native fetch adapter so SSR loaders AND actions work. The dev stub
// adapter (applyDevStubAdapter) still overrides this in local development.
const WORKER_SAFE_ADAPTER = "fetch" as const;

// ... existing code ...
export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    timeout: API_REQUEST_TIMEOUT_MS,
    adapter: WORKER_SAFE_ADAPTER,
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

        // SSR actions authenticate to the backend with the browser's cookie, so
        // preserve the browser-controlled Origin as well. The backend validates
        // this exact value against CSRF_TRUSTED_ORIGINS before allowing unsafe
        // cookie-authenticated requests. Do not synthesize an Origin when the
        // incoming request omitted one; missing/untrusted origins must still be
        // rejected by the backend.
        const originHeader = request.headers.get("Origin");
        if (originHeader) {
            headers["Origin"] = originHeader;
        }
    }

    const client = axios.create({
        baseURL,
        withCredentials: true,
        headers,
        timeout: API_REQUEST_TIMEOUT_MS,
        adapter: WORKER_SAFE_ADAPTER,
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
            return config;
        },
        (error) => Promise.reject(toSafeApiError(error))
    );

    client.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(toSafeApiError(error))
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
    (error) => Promise.reject(toSafeApiError(error))
);

// Keep request internals and forwarded credentials out of thrown errors.
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(toSafeApiError(error))
);
