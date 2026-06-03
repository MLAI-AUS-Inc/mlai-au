# mlai website

This is the MLAI website - a React Router v7 application for a not-for-profit community based in Australia that aims to empower the Australian AI Community.

## Common advice

Use `bun` instead of `npm` -- `bun run typecheck`, `bun run typegen`

Add new routes to the `routes.ts` file

Read and use [@TODO.md](@file:mlai-au/TODO.md) as your scratchpad to keep track.

You may use commands like `tree -I 'node_modules|public'` to get an overview of the project structure.

## Deployment (Cloudflare Workers)

This site deploys to **Cloudflare Workers** (not Vercel). Key differences from the dev frontend (`Watt-The-Hack/frontend/`, Next.js on Vercel):

- **Package manager:** `bun`, not `npm`. Lockfile is `bun.lock`.
- **Cloudflare builds with `bun install --frozen-lockfile`.** If you add, remove, or update any dependency, you MUST run `bun install` locally and commit the updated `bun.lock`. A stale lockfile = failed deploy.
- **Env var convention:** Use `import.meta.env.VITE_*` for client-side vars. **Never use `process.env.NEXT_PUBLIC_*`** — that is a Next.js convention and silently evaluates to `undefined` in Vite/Cloudflare builds.
- **Worker env bindings** (server-side): Access via the `env` parameter in loaders/actions, not `process.env`. Configured in `wrangler.jsonc` under `vars`.

## Watt The Hack Sandbox Code

The WTH sandbox components live in `app/components/watt-the-hack/sandbox/` and `app/lib/watt-the-hack-sandbox/`. This code is ported from the `Watt-The-Hack/frontend/` repo (Next.js).

**When syncing code from the Next.js frontend:**
- Audit every `process.env` reference and convert to `import.meta.env.VITE_*`.
- The sandbox API client (`app/lib/watt-the-hack-sandbox/api.ts`) resolves the backend URL via hostname detection. On `mlai.au` it points to `https://watt-the-hack.vercel.app` (where the FastAPI backend is deployed). Override with `VITE_WTH_SANDBOX_API_URL` in `.dev.vars` or Cloudflare dashboard.
- Do NOT blindly copy-paste files — the runtime environments are fundamentally different (Cloudflare Workers vs Node.js/Vercel).
