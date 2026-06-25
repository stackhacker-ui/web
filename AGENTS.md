# AGENTS.md

## Project overview

Nuxt 4 documentation site with a built-in shadcn-vue component registry for distributing custom blocks.

## Commands

- `pnpm dev` — dev server
- `pnpm lint` — ESLint (`@nuxt/eslint`-based, stylistic enabled: double quotes, semi)
- `pnpm lint:fix` — auto-fix
- `pnpm typecheck` — `nuxt typecheck`
- `pnpm registry:build` — generate registry JSON files into `public/r/`
- `pnpm registry:verify` — verify generated registry dependency metadata after `registry:build`

CI order: **lint → typecheck** (no tests)

## Architecture

- **Nuxt 4 compat mode** (`future.compatibilityVersion: 4`) — app code lives under `app/`
- `app/components/ui/` — shadcn-vue UI primitives (`shadcn-nuxt` module, no prefix)
- `app/components/content/` — global MDC components (`pathPrefix: false`)
- `app/components/_internal/`, `app/components/examples/` — excluded from Nuxt auto-imports
- `app/registry/blocks/` — distributable components; each block = directory with `index.ts` + `.vue`
- `content/docs/` — Markdown docs (`@nuxt/content` v3, D1 database)
- `public/r/` — generated output from `registry:build` (should be gitignored)

## Registry build

`pnpm registry:build` runs `scripts/registry-build.ts`:

1. `shadcn-vue-registry` generates registry.json from `app/registry/`
2. `shadcn-vue build` outputs per-item JSON to `public/r/*.json`
3. Intermediate file `app/registry/registry.json` is auto-deleted

Run `pnpm registry:verify` after `pnpm registry:build` when registry dependencies change.

Config: `registry.config.ts` and `components.json` `registries` field.

## Style conventions

- ESLint stylistic: **double quotes**, **semicolons**
- Tailwind v4 via `@tailwindcss/vite` plugin — no `tailwind.config` file
- shadcn-vue style: `new-york`, baseColor: `neutral`, CSS variables enabled
- Icons: `lucide-vue-next` for app and local shadcn primitives; registry-distributed items targeting shadcn-vue Create may use `@lucide/vue` when fresh `shadcn-vue add` verification requires it

## Commit conventions

- Use commitizen/czg-style Conventional Commits: `<type>(<scope>): <Subject>`.
- Keep `type` and `scope` lowercase; capitalize the first letter of `Subject`.
- Use imperative mood and omit trailing periods, e.g. `feat(registry): Add pricing plans block`.

## Content

- `content.config.ts` defines the docs collection with `category` field: `element | content | marketing | chat | overview`
- `@nuxt/content` v3 with D1 database (`content.database.type: "d1"`)
- Markdown highlight disabled; `nuxt-shiki` module handles syntax highlighting instead

## Infrastructure

- **NuxtHub** (`@nuxthub/core`) — Cloudflare D1/SQLite bindings
- `hub.db: "sqlite"` — uses SQLite for local development
