# Cloudflare Pages

Source: yanwei1983/second-epoch-site, branch main.
Build command: pnpm run build:static
Output: out
Node: 24.16.0
Framework preset: None
Root: repository root
Do not set GITHUB_PAGES_BASE_PATH for Cloudflare.
Target domain: tse.polardog.cc (associate through Pages Custom Domains).

Language routes: `/cn/` is always Chinese and `/en/` is always English.
The default `/` entry redirects to a remembered manual choice, or otherwise checks
the browser's current preferred language (`zh`, including regional variants, selects Chinese;
other languages select English). Both language pages are statically exported.
Language switching preserves the current chapter and query parameters. Only manual
switching stores a preference when browser storage is available. Explicit routes take
priority over stored preferences. Product links from polardog.cc use these routes.

Large website images use https://cdn.polardog.cc/web/ in R2 bucket tse-assets (Standard).
37 images, 87,023,356 bytes, verified byte-for-byte using SHA-256 before removing their public/ copies.
Small badges and crew portraits remain on Pages. No video files exist in this repository.
See app/asset-manifest.json for URL mappings and reports/r2-web-migration.json for sizes and hashes.
APK upload remains pending.
The existing gh-pages branch remains available during migration.

## Discord community

The community card, footer link and footer icon use the same official invitation:
https://discord.gg/grC2JM2NEZ

The invitation opens THE SECOND EPOCH (server 1551977827690217502) at #welcome.
Discord was configured with no expiration, unlimited uses and temporary membership
disabled on 2026-09-23. Both `/en/` and `/cn/` use this invitation; the Discord
community itself uses English for overseas players. Update `discordLinkProps` in
`app/game-site.js` if the invitation is ever intentionally revoked or replaced.

## Reservations and private feedback

The reservation dialog posts nickname, email and optional message (max 2000 characters) to /api/reservations. Cloudflare Pages Functions writes to D1 `tse-feedback`, table `reservations`, via FEEDBACK_DB. No public read endpoint exists.

View messages in Cloudflare Dashboard > Storage & databases > D1 > tse-feedback > Explore Data > reservations. Columns include UTC created_at, nickname, email, message and language.

Schema: migrations/0001_reservations.sql. Bindings: wrangler.toml. Local backend checks: node --test tests/reservations.test.mjs. Only /api/reservations invokes a Function; static page and asset requests stay static.

Successful submission saves data; it does not automatically send notification emails. On the Workers Free plan, D1 includes 100,000 rows written/day and 5 GB total account storage; free-plan quotas are enforced. No paid upgrade was enabled.
