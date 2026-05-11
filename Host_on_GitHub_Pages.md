# Hosting on GitHub Pages

**Target URL:** `https://digitalguru-creations.github.io/Ida-and-Stellas-Nation.github.io/`

- **GitHub org/username:** `digitalguru-creations`
- **Repository name:** `Ida-and-Stellas-Nation.github.io`
- **Vite base sub-path:** `/Ida-and-Stellas-Nation.github.io/`

This is a **project page** (not a user page), so the sub-path applies and all requirements below must be met.

GitHub Pages hosts this site by serving the compiled output of `vite build` — no Jekyll involved.

---

## Build Configuration Changes

### 1. `PORT` env var — supply in CI

`vite.config.ts` throws an error and refuses to build unless `PORT` is set. This is Replit-specific. Supply it in the GitHub Actions job:

```
PORT=3000
```

### 2. `BASE_PATH` / Vite `base` — now has a concrete value

```
BASE_PATH=/Ida-and-Stellas-Nation.github.io/
```

Every asset URL Vite emits (JS bundles, CSS, images, fonts) will be prefixed with this path. If it is wrong or missing, the deployed site will be a blank page.

---

## Routing Fix

### 3. SPA 404 fallback

The site uses client-side routing (wouter). GitHub Pages has no server to redirect unknown paths — if someone visits `/about` directly, they get a real 404 page. The fix is to copy the built `index.html` to `404.html` after the build so GitHub Pages serves the app shell for any unmatched URL and lets the router handle it in the browser.

```bash
cp artifacts/ida-stellas-nation/dist/public/index.html \
   artifacts/ida-stellas-nation/dist/public/404.html
```

---

## Monorepo & Dependency Requirements

### 4. Full monorepo checkout required

The app is one package inside a pnpm workspace. Three things force a full repo checkout:

| Dependency | Why the full repo is needed |
|---|---|
| `pnpm-workspace.yaml` catalog | Shared version pins used by every package |
| `@workspace/api-client-react: workspace:*` | Sibling package that must be present |
| `@assets` alias → `../../attached_assets/` | Resolves to workspace root at build time — this is where `bg-meadow.png`, `bg-forest.png`, `bg-lake.png`, and `logo.png` live |

### 5. pnpm + Node.js 24

The lock file and workspace catalog are pnpm-specific. The CI runner needs:

- `pnpm/action-setup` (any recent version)
- `actions/setup-node@v4` with `node-version: 24`

### 6. Scoped build command

```bash
pnpm --filter @workspace/ida-stellas-nation run build
```

A plain `npm run build` or `vite build` from the repo root will not work.

---

## Output & Deployment

### 7. Deploy the right folder

The compiled site lands in:

```
artifacts/ida-stellas-nation/dist/public
```

The GitHub Pages deploy action must point to that folder specifically.

### 8. Replit-specific plugins

Two Replit-specific Vite plugins (`cartographer`, `dev-banner`) are already guarded by `process.env.REPL_ID` and will not load in CI. The `runtime-error-modal` plugin is always loaded but is harmless in a production build. No action needed.

### 9. Google Fonts

Fonts load at runtime from `fonts.googleapis.com` via a `<link>` tag in `index.html`. This works on GitHub Pages without any changes.

---

## Summary Checklist

| # | Item | Exact value for this deployment |
|---|---|---|
| 1 | `PORT` env var | `PORT=3000` |
| 2 | `BASE_PATH` env var | `BASE_PATH=/Ida-and-Stellas-Nation.github.io/` |
| 3 | SPA routing fallback | Copy `index.html` → `404.html` after build |
| 4 | Checkout scope | Full monorepo (not just `artifacts/ida-stellas-nation`) |
| 5 | Package manager | pnpm + Node.js 24 |
| 6 | Build command | `pnpm --filter @workspace/ida-stellas-nation run build` |
| 7 | Deploy folder | `artifacts/ida-stellas-nation/dist/public` |
| 8 | GitHub org | `digitalguru-creations` |
| 9 | Repository name | `Ida-and-Stellas-Nation.github.io` |
| 10 | Deploy branch | `gh-pages` (standard) |

---

## GitHub Actions Workflow

Create this file in your repository at `.github/workflows/deploy.yml`:

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
        with:
          version: "10.26.1"

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
          BASE_PATH: /Ida-and-Stellas-Nation.github.io/
          NODE_ENV: production

      - name: Copy index.html to 404.html (SPA routing fallback)
        run: |
          cp artifacts/ida-stellas-nation/dist/public/index.html \
             artifacts/ida-stellas-nation/dist/public/404.html

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: artifacts/ida-stellas-nation/dist/public
```

> After this workflow runs once, go to the repository **Settings → Pages → Source** and set the source to the `gh-pages` branch. The site will then be live at `https://digitalguru-creations.github.io/Ida-and-Stellas-Nation.github.io/`.
