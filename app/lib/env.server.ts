import type { AppLoadContext } from "react-router";

export function getEnv(context: AppLoadContext): Env {
    // Fallback to process.env for local development when Cloudflare context is missing
    return (context.cloudflare?.env || process.env) as unknown as Env;
}
