# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

- **`artifacts/ida-stellas-nation`** — Static React/Vite multi-page site for "Ida & Stella's Nation Incorporated", a Las Vegas non-profit. Mounted at `/`. Uses wouter for routing and framer-motion for animations. Five pages: Home, About, Services, History, Contact. Each page renders an opaque peaceful nature background (meadow / forest / lake) behind a translucent content panel. Palette: sage green primary, warm cream background, dusty rose accent. Serif: Cormorant Garamond. Background images live in `src/assets/`.
