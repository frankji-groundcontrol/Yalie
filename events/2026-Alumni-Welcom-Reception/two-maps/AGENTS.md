# AGENTS.md

## Overview
- pnpm workspace monorepo for two interactive event experiences: Alumni Journey Map and Local Guide Map.
- Web = Nuxt 3; video = Remotion; contracts = shared TypeScript types/schemas/utils.

## Structure
```text
two-maps/
├── shared/                        # @yalie/shared — TS types, JSON schemas, utils (no build step)
├── web/                           # @yalie/two-maps-web — merged Nuxt 3 app (THE running app)
│   ├── components/alumni/         # Alumni Journey Map components (8 files)
│   ├── components/local/          # Local Guide Map components (7 files)
│   ├── composables/               # Vue composables (4 files)
│   ├── pages/                     # index.vue, alumni.vue, local.vue
│   └── nuxt.config.ts             # Nuxt config (port 1701, LAN binding)
├── alumni-journey-map/
│   ├── data/templates/            # Sample JSON data
│   ├── web-nuxt/                  # ORPHANED scaffold (not in workspace)
│   └── video-remotion/            # @yalie/alumni-journey-video — Remotion
├── local-guide-map/
│   ├── data/templates/            # City JSON templates (shanghai, new-haven, beijing)
│   ├── data/supporting-materials/ # Reference research docs
│   ├── web-nuxt/                  # ORPHANED scaffold (not in workspace)
│   └── video-remotion/            # @yalie/local-guide-video — Remotion
├── docs/                          # Plans, visual direction, OpenClaw prompts
├── pnpm-workspace.yaml            # 4 packages: shared, web, 2x video-remotion
└── tsconfig.json                  # Root TS config, path alias @yalie/shared
```

## Where to Look
| Task | Location |
|------|----------|
| Edit alumni map UI | `web/components/alumni/` + `web/pages/alumni.vue` |
| Edit local guide UI | `web/components/local/` + `web/pages/local.vue` |
| Shared types/schemas | `shared/types/` + `shared/schemas/` |
| Alumni video | `alumni-journey-map/video-remotion/src/Root.tsx` |
| Local guide video | `local-guide-map/video-remotion/src/Root.tsx` |
| City data templates | `local-guide-map/data/templates/*.json` |
| Visual design rules | `docs/visual-direction_en.md` |
| OpenClaw prompts | `docs/openclaw-starter-prompts_{en,cn}.md` |

## Conventions
- TypeScript strict mode + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`.
- Path alias: `@yalie/shared` -> `shared/index.ts`; consumed as raw TS; no build step.
- Dual palette system: Dalí = warm golds/oranges for Alumni; Magritte = sky blues/slate for Local Guide.
- Fonts: Cormorant Garamond + Noto Serif SC for headings; Inter + Noto Sans SC for body.
- Dev server binds to `0.0.0.0:1701`; intentional LAN access for workshop use.
- Web stack: Nuxt 3 + Vue 3 + Composition API.
- Video stack: Remotion 4 + React 18; separate React ecosystem from Vue web.
- Workspace scope: 4 packages in `pnpm-workspace.yaml`; `web-nuxt/` folders are not workspace members.

## Anti-Patterns

- Never run `.nuxt/dist/server/server.mjs` directly; internal build artifact only.
- Never use linear easing for UI transitions; use ease-out entering, ease-in exiting.
- Never use pure black or pure white; use palette variants such as Surrealist Black and Dream White.
- Do not refactor the whole project; deliver the smallest usable version.
- Do not fabricate `demo_url` values in data.
- `alumni-journey-map/web-nuxt/` and `local-guide-map/web-nuxt/` are orphaned scaffolds; the running app is `web/`.

## Commands

Run from `two-maps/`:

```bash
pnpm install          # Install all workspace deps
pnpm dev              # Start @yalie/two-maps-web on port 1701
pnpm build            # Build shared + web + both video bundles
pnpm render           # Render both MP4 videos
pnpm render:alumni    # Render alumni-journey.mp4 only
pnpm render:local     # Render local-guide.mp4 only
```

## Notes

- No test suite, no linter, no CI/CD configured.
- Pre-built Remotion bundles are committed in `alumni-journey-map/video-remotion/build/`.
- `web/tests/` exists, but no test runner is configured.
- Reference site for implementation quality: `chicken-dice.me` (Frank Ji personal Nuxt site).
