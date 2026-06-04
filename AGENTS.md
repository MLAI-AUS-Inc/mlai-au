# mlai website

This is the MLAI website - a React Router v7 application for a not-for-profit community based in Australia that aims to empower the Australian AI Community.

## ⚠ Scope: only touch Watt The Hack code

This repo is the **entire MLAI website**, not just Watt The Hack — there are ~91 routes and only ~19 are WTH. When doing Watt The Hack work, edit **only** WTH-owned paths:

- `app/routes/watt-the-hack.*`
- `app/lib/wth-*`, `app/lib/watt-the-hack-*`
- `app/components/watt-the-hack/`

**Do not modify, refactor, rename, or "tidy up" any other route, component, or lib.** They belong to other parts of the site and other developers, and editing them can break unrelated production systems. If a WTH change seems to require a file outside these paths, stop and flag it instead of editing.

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
- Audit every `process.env` reference and convert to `import.meta.env.VITE_*`. In Vite/Cloudflare builds, `process.env.NEXT_PUBLIC_*` silently evaluates to `undefined`, which means the sandbox falls back to `http://127.0.0.1:8000` in prod — a silent breakage.
- The sandbox API client (`app/lib/watt-the-hack-sandbox/api.ts`) resolves the backend URL via hostname detection. On `mlai.au` it points to **`https://api.mlai.au/api/v1/hackathons/watt-the-hack`** — the Django backend in `mlai-backend`, **not** the dev FastAPI sandbox at `watt-the-hack.vercel.app`. Override with `VITE_WTH_SANDBOX_API_URL` in `.dev.vars` or Cloudflare dashboard.
- The Django endpoints require an authenticated user (`IsAuthenticated`) — JWT in the `access_token` cookie. The sandbox client MUST send credentials, which is why `api.ts` uses the shared `axiosInstance` (it has `withCredentials: true`) rather than a bare `fetch()`. If you ever rewrite the client back to `fetch()`, pass `credentials: "include"` or every call will 401.
- Do NOT blindly copy-paste files from `Watt-The-Hack/frontend/` — the dev FastAPI sandbox is unauthenticated and uses a different env-var system, so a verbatim port will break in prod.
