# Cloudflare Pages

Source: yanwei1983/second-epoch-site, branch main.
Build command: pnpm run build:static
Output: out
Node: 24.16.0
Framework preset: None
Root: repository root
Do not set GITHUB_PAGES_BASE_PATH for Cloudflare.
Target domain: tse.polardog.cc (associate through Pages Custom Domains).

Large website images use https://cdn.polardog.cc/web/ in R2 bucket tse-assets (Standard).
37 images, 87,023,356 bytes, verified byte-for-byte using SHA-256 before removing their public/ copies.
Small badges and crew portraits remain on Pages. No video files exist in this repository.
See app/asset-manifest.json for URL mappings and reports/r2-web-migration.json for sizes and hashes.
APK upload remains pending.
The existing gh-pages branch remains available during migration.
