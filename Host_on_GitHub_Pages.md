# Hosting on GitHub Pages

GitHub Pages can host this site by serving the compiled output of `vite build` — no Jekyll involved. Below is everything that stands between the current code and a working GitHub Pages deployment.

---

## Build Configuration Changes

### 1. `PORT` env var hard requirement

`vite.config.ts` throws an error and refuses to build unless `PORT` is set. This is Replit-specific. A GitHub Actions CI job would need to supply it (e.g. `PORT=3000`), or a separate GitHub-specific Vite config variant could remove the requirement.

### 2. `BASE_PATH` / Vite `base` setting

GitHub Pages project sites live at `https://<username>.github.io/<repo-name>/`. The Vite `base` option must match that sub-path exactly, or every asset (images, JS, CSS) will 404. Currently `base` is driven by the `BASE_PATH` env var, so the CI job must inject the correct value:

```
BASE_PATH=/your-repo-name/
```

---

## Routing Fix

### 3. SPA 404 fallback

The site uses client-side routing (wouter). GitHub Pages has no server to redirect unknown paths — if someone visits `/about` directly, they get a real 404 page. The standard fix is to copy the built `index.html` to `404.html` after the build so GitHub Pages serves the app shell for any unmatched URL and lets the router handle it in the browser.

```bash
cp artifacts/ida-stellas-nation/dist/public/index.html \
   artifacts/ida-stellas-nation/dist/public/404.html
```

---

## Monorepo & Dependency Requirements

### 4. Full monorepo checkout required

The app is one package inside a pnpm workspace. The CI job must check out the **entire repository** — not just the `artifacts/ida-stellas-nation` folder — because:

- Dependencies are installed from the workspace root (`pnpm-workspace.yaml`, shared catalog)
- The app depends on a sibling package: `"@workspace/api-client-react": "workspace:*"`
- The `@assets` import alias resolves two levels up to the workspace root's `attached_assets/` folder (where the background images and logo live)

### 5. pnpm (not npm)

All dependency management uses pnpm. The GitHub Actions workflow needs:

- `pnpm/action-setup` action
- Node.js version **24**

before running `pnpm install`.

### 6. Scoped build command

The build must be run as:

```bash
pnpm --filter @workspace/ida-stellas-nation run build
```

A plain `npm run build` or `vite build` will not work from the repo root.

---

## Output & Deployment

### 7. Deploy the right folder

The compiled site lands in:

```
artifacts/ida-stellas-nation/dist/public
```

The GitHub Pages deploy action (e.g. `peaceiris/actions-gh-pages` or the native `actions/deploy-pages`) must point to that folder specifically.

### 8. Replit plugins

Two Replit-specific Vite plugins (`cartographer`, `dev-banner`) are already guarded by `process.env.REPL_ID`, so they will not run in CI. The `runtime-error-modal` plugin is always loaded but is harmless in a production build. No blocking issue here.

### 9. Google Fonts

Fonts load at runtime from `fonts.googleapis.com` via a `<link>` tag in `index.html`. This works on GitHub Pages without any changes.

---

## Summary Checklist

| # | Item | What's needed |
|---|---|---|
| 1 | `PORT` env var | Supply in CI (e.g. `PORT=3000`) |
| 2 | `BASE_PATH` / Vite base | Set to `/your-repo-name/` in CI |
| 3 | Client-side routing | Copy `index.html` → `404.html` after build |
| 4 | Monorepo structure | Full repo checkout, not just the app subfolder |
| 5 | `@workspace/api-client-react` | Present automatically if full monorepo is checked out |
| 6 | `@assets` alias | Resolved at build time — full repo checkout required |
| 7 | Package manager | pnpm + Node.js 24 in CI |
| 8 | Build command | `pnpm --filter @workspace/ida-stellas-nation run build` |
| 9 | Deploy folder | `artifacts/ida-stellas-nation/dist/public` |

---

## Example GitHub Actions Workflow

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node.js 24
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm --filter @workspace/ida-stellas-nation run build
        env:
          PORT: 3000
          BASE_PATH: /your-repo-name/
          NODE_ENV: production

      - name: Copy index.html to 404.html (SPA routing fallback)
        run: cp artifacts/ida-stellas-nation/dist/public/index.html \
                artifacts/ida-stellas-nation/dist/public/404.html

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: artifacts/ida-stellas-nation/dist/public
```

> Replace `your-repo-name` in `BASE_PATH` with the actual GitHub repository name.
