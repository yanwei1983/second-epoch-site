# GitHub Pages deployment

Run the deployment command from the project root:

```powershell
npm run deploy:github-pages -- -Repository git@github.com:OWNER/REPOSITORY.git
```

The command performs these steps:

1. Detects `/REPOSITORY` as the GitHub Pages base path.
2. Builds the static Next.js export into `out`.
3. Rewrites public asset URLs for the repository subpath.
4. Creates `out/.nojekyll`, `out/404.html`, and `github-pages.zip`.
5. Force-publishes the generated site to the `gh-pages` branch.

For an `OWNER.github.io` repository, the base path is automatically empty. Override detection when needed:

```powershell
npm run deploy:github-pages -- -Repository git@github.com:OWNER/REPOSITORY.git -BasePath /custom-path
```

Build the archive without pushing:

```powershell
npm run deploy:github-pages -- -Repository git@github.com:OWNER/REPOSITORY.git -BuildOnly
```

In GitHub, configure **Settings > Pages > Build and deployment** to deploy from the `gh-pages` branch and `/ (root)`.
