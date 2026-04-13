# AGENTS.md

## Overview
- Standalone Next.js 16 poster renderer for event promotional material. Originated from v0 sandbox. Not part of the two-maps pnpm monorepo.

## Structure
- `posts/posters/long/`
- `app/` , app sources
- `app/page.tsx` , main poster page
- `app/layout.tsx` , root layout
- `app/globals.css` , global styles
- `components/ui/` , shadcn/ui component library, 57 files
- `hooks/` , custom React hooks, 2 files
- `public/` , static assets, 22 files
- `package.json` , `my-project`, placeholder name
- `next.config.mjs` , Next.js config
- `postcss.config.mjs` , PostCSS, Tailwind v4
- `tsconfig.json` , TypeScript config
- `components.json` , shadcn/ui config

## Conventions
- Next.js 16.2 + React 19 + App Router
- Tailwind CSS v4 via PostCSS, no `tailwind.config` file
- shadcn/ui + full Radix UI primitive suite
- Framer Motion for animations
- TypeScript strict mode enabled
- `isolatedModules` enabled
- Path alias: `@/*` -> `./*`
- Package name stays `my-project` until explicitly renamed

## Anti-Patterns
- Don't remove `ignoreBuildErrors: true` from `next.config.mjs` until all type errors are fixed
- Don't import from `two-maps/`, `@yalie/shared`, or any two-maps package
- Don't add this app to `pnpm-workspace.yaml`, this project uses its own package manager, `pnpm-lock.yaml` is present
- Don't treat this app as part of the two-maps monorepo

## Commands
- Run from `posts/posters/long/`
- `pnpm install` , install dependencies
- `pnpm dev` , `next dev`
- `pnpm build` , `next build`
- `pnpm start` , `next start`
- `pnpm lint` , `eslint .`
