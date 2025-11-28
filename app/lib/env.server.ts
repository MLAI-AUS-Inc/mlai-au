import type { AppLoadContext } from "react-router";

export function getEnv(context: AppLoadContext) {
    return context.cloudflare.env;
}
