# mlai website

This is the MLAI website - a React Router v7 application for a not-for-profit community based in Australia that aims to empower the Australian AI Community.

## Common advice

Use `bun` instead of `npm` -- `bun run typecheck`, `bun run typegen`

Add new routes to the `routes.ts` file

Use a local `TODO.md` scratchpad to keep track; create it if needed. It is gitignored and must not be committed. Keep task plans, handoff notes, PR drafts, generated reports, and browser captures local too (use `.local/` for working files without a dedicated ignore rule). Maintained documentation, source code, and shared configuration belong in version control. Never force-add local artefacts to a PR.

You may use commands like `tree -I 'node_modules|public'` to get an overview of the project structure.

## Deployment (Cloudflare Workers)

This site deploys to **Cloudflare Workers** (not Vercel). Key differences from the dev frontend (`Watt-The-Hack/frontend/`, Next.js on Vercel):

- **Package manager:** `bun`, not `npm`. Lockfile is `bun.lock`.
- **Cloudflare builds with `bun install --frozen-lockfile`.** If you add, remove, or update any dependency, you MUST run `bun install` locally and commit the updated `bun.lock`. A stale lockfile = failed deploy.
- **Env var convention:** Use `import.meta.env.VITE_*` for client-side vars. **Never use `process.env.NEXT_PUBLIC_*`** — that is a Next.js convention and silently evaluates to `undefined` in Vite/Cloudflare builds.
- **Worker env bindings** (server-side): Access via the `env` parameter in loaders/actions, not `process.env`. Configured in `wrangler.jsonc` under `vars`.

## Public website boundary

Keep member sign-in and Pulse on MLAI Chat. This site serves public pages and
does not create or refresh member sessions. Preserve legacy handoffs in
`workers/retired-apps.ts`, including non-replay of old form submissions.
Add public document paths to the static build allowlist when introducing a page.
## Public website boundary

Keep member sign-in and Pulse on MLAI Chat. This site serves public pages and
does not create or refresh member sessions. Preserve legacy handoffs in
`workers/retired-apps.ts`, including non-replay of old form submissions.
Add public document paths to the static build allowlist when introducing a page.
