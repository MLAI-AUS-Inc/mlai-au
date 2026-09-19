# Vibe Marketing handoff to My startup

The optional banner in the existing Vibe Marketing application moves an owned startup's research draft to MLAI Chat. It does not create a company, run a workflow, or remove the old page.

## Configuration

These are public Vite build variables, not secrets. Set them in the build environment and rebuild the Worker application:

```dotenv
VITE_MY_STARTUP_HANDOFF_ENABLED=false
VITE_MY_STARTUP_CHAT_ORIGIN=https://chat.mlai.au
```

Enable the banner only after the backend My startup namespace and Chat browser routes have been deployed and piloted. The origin must match the backend's `COMMUNITY_CHAT_FRONTEND_URL`. The destination validator permits only that origin's exact `/my-startup/handoff` path, with HTTPS except for local development on `localhost` or `127.0.0.1`.

## Request and account boundaries

`POST /founder-tools/migrate-to-chat` is a registered React Router resource action. It authenticates the old website account, checks that the selected company belongs to that account and submits the bundle to `POST /api/v1/founder-tools/my-startup-handoff/` using the existing server-side JWT client. Tokens and responses must not be cached or logged.

The backend returns a ten-minute, single-use link bound to that same user and company. Chat redeems it only after its own account sign-in and explicit continuation. Being signed into a different Chat account does not adopt or merge the original account.

Only the `island-research:v2:<companyId>` session draft is transferred: research brief, step, existing run ID, selected proposals and original request ID. Backend validation checks existing research-run ownership. The link also carries bounded workflow/navigation query fields. Arbitrary redirect destinations and a caller-supplied alternate company are discarded.

The old tab retains its draft. Existing before-unload protection applies to other unsaved forms. Redemption never starts a second paid run or automatically adopts a proposed island.

## Rollback and verification

Disable `VITE_MY_STARTUP_HANDOFF_ENABLED` and rebuild to remove the banner. Both existing URLs and records remain usable; no database rollback is needed. Do not add forced redirects until the pilot and rollback window have completed.

Run `bun test`, `bun run typecheck` and `bun run build`. The handoff helper tests cover corrupt storage and destination validation. Real cross-origin sign-in and single-use redemption also require the Chat/backend staging checks in mlai-chat's `docs/mlai/my-startup.md`.
