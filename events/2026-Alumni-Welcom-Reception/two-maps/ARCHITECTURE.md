# ARCHITECTURE.md — Two Maps

> One-page codebase map. Read this **before** you grep, ls, or scan. Everything below has been verified against the working tree; update it when the tree changes.

## Purpose

Two browser experiences for the Yale Shanghai alumni welcome reception (April 2026):

1. **Alumni Journey Map** — person-centric. Each profile has ordered `stops` (city + year) from hometown → Yale → today.
2. **Local Guide Map** — place-centric. City templates (Shanghai, New Haven, Beijing) with category, coordinates, and bilingual tips.

Both render in two output formats:

- **Interactive web** — Nuxt 3 + Vue 3 + Leaflet, deployed on LAN for phones.
- **Pre-rendered video** — Remotion 4 + React 18, exported as MP4 for social / AV.

They share one data contract (TypeScript types + JSON Schema + formatters).

---

## Packages (pnpm workspace)

Declared in `pnpm-workspace.yaml`:

| Package | Path | Purpose | Runtime |
|---|---|---|---|
| `@yalie/shared` | `shared/` | Types, JSON schemas, formatters. No build step. | Raw TS, imported via path alias. |
| `@yalie/two-maps-web` | `web/` | **THE running web app.** Merged Nuxt 3 app with both maps. | Nuxt 3 · Vue 3 · Leaflet · Tailwind. |
| `@yalie/alumni-journey-video` | `alumni-journey-map/video-remotion/` | MP4 of the alumni map. | Remotion 4 · React 18. |
| `@yalie/local-guide-video` | `local-guide-map/video-remotion/` | MP4 of the local guide. | Remotion 4 · React 18. |

**Not in the workspace (orphan scaffolds — do not edit):**

- `alumni-journey-map/web-nuxt/`
- `local-guide-map/web-nuxt/`

These were superseded by the merged `web/` app.

---

## Directory Tree (truncated to signal)

```text
two-maps/
├── AGENTS.md                      # Code-specific agent conventions
├── CLAUDE.md                      # Role memories + runbook
├── ARCHITECTURE.md                # This file
├── README.md                      # Bilingual project intro
├── package.json                   # Root scripts (dev/build/render)
├── pnpm-workspace.yaml            # 4 workspace packages
├── tsconfig.json                  # Root TS config, @yalie/shared alias
│
├── shared/                        # @yalie/shared
│   ├── index.ts                   #   re-exports ./types + ./utils/format
│   ├── assets/                    #   shared image/asset references
│   ├── schemas/
│   │   ├── alumni-journey.schema.json
│   │   └── local-guide.schema.json
│   ├── types/
│   │   ├── alumni-journey.ts      #   Profile, Stop, Coordinates, Tags
│   │   ├── local-guide.ts         #   CityGuide, Location, Category
│   │   └── index.ts
│   └── utils/
│       └── format.ts              #   Shared formatters (dates, city names, etc.)
│
├── web/                           # @yalie/two-maps-web — THE running app
│   ├── nuxt.config.ts             #   devServer host: 0.0.0.0, palettes, fonts
│   ├── app.vue                    #   Root component
│   ├── package.json               #   dev/build/start/preview scripts
│   ├── pages/
│   │   ├── index.vue              #   Landing (mode toggle)
│   │   ├── alumni.vue             #   /alumni route — Alumni Journey Map
│   │   └── local.vue              #   /local route — Local Guide Map
│   ├── components/
│   │   ├── alumni/                #   8 files
│   │   │   ├── AlumniBuilder.vue
│   │   │   ├── AlumniDrawer.vue
│   │   │   ├── AlumniDrawer.css
│   │   │   ├── AlumniHero.vue
│   │   │   ├── AlumniLegend.vue
│   │   │   ├── AlumniMap.vue
│   │   │   ├── AlumniStageAvatars.ts
│   │   │   └── AlumniStarData.ts
│   │   ├── local/                 #   7 files
│   │   │   ├── LocalCards.vue
│   │   │   ├── LocalCategoryData.ts
│   │   │   ├── LocalControls.vue
│   │   │   ├── LocalEmpire.vue
│   │   │   ├── LocalHero.vue
│   │   │   ├── LocalMap.vue
│   │   │   └── LocalWalks.vue
│   │   └── shared/
│   │       └── MapModeToggle.vue
│   ├── composables/
│   │   ├── useAlumniState.ts      #   Alumni selection / hover state
│   │   ├── useLocalGuideState.ts  #   Local guide city / category state
│   │   ├── useLeafletMap.ts       #   Leaflet instance lifecycle
│   │   └── useConstellationMap.ts #   Alumni constellation (globe.gl) behavior
│   ├── lib/
│   │   └── alumniJourneySelection.ts  # Journey-line selection logic
│   ├── public/
│   │   └── avatars/               #   Alumni photos (referenced by profile.photoUrl)
│   ├── scripts/                   #   Asset generation helpers
│   ├── prompts/                   #   LLM prompts used for content generation
│   ├── tests/                     #   Dir exists; no runner configured
│   ├── generate-avatars.js        #   One-off avatar generator
│   └── generate-avatars-batch.js  #   Batch version
│
├── alumni-journey-map/
│   ├── data/
│   │   └── templates/
│   │       └── sample.json        #   Alumni profiles (source of truth for web + video)
│   ├── video-remotion/            # @yalie/alumni-journey-video
│   │   ├── remotion.config.ts
│   │   ├── src/
│   │   │   ├── Root.tsx           #   Remotion composition registry
│   │   │   └── AlumniJourneyVideo.tsx
│   │   └── build/                 #   Committed pre-rendered bundle
│   └── web-nuxt/                  #   ORPHAN — do not edit
│
├── local-guide-map/
│   ├── data/
│   │   ├── templates/
│   │   │   ├── sample.json
│   │   │   ├── shanghai-sample.json
│   │   │   ├── new-haven-sample.json
│   │   │   └── beijing-sample.json
│   │   └── supporting-materials/  #   Research docs backing the city templates
│   ├── video-remotion/            # @yalie/local-guide-video
│   │   ├── remotion.config.ts
│   │   └── src/
│   │       ├── Root.tsx
│   │       └── LocalGuideVideo.tsx
│   └── web-nuxt/                  #   ORPHAN — do not edit
│
└── docs/
    ├── implementation-plan_en.md
    ├── visual-direction_en.md
    ├── openclaw-starter-prompts_en.md
    ├── openclaw-starter-prompts_cn.md
    └── workflow-skill-template_en.md
```

---

## Data Flow

```text
                 shared/types/*.ts  ◄── shared/schemas/*.schema.json
                        │                         │
                        │ (TypeScript contract)   │ (runtime validation)
                        ▼                         ▼
    ┌───────────────────────────────────────────────────┐
    │  Data JSON  (the source of truth)                 │
    │                                                   │
    │  alumni-journey-map/data/templates/sample.json    │
    │  local-guide-map/data/templates/<city>.json       │
    └───────────────────────────────────────────────────┘
                        │
          ┌─────────────┴──────────────┐
          ▼                            ▼
   web/ (Nuxt 3)                video-remotion/ (Remotion 4)
   ─ pages/alumni.vue           ─ src/AlumniJourneyVideo.tsx
   ─ pages/local.vue            ─ src/LocalGuideVideo.tsx
   ─ components/alumni/*        (renders to MP4 via `pnpm render`)
   ─ components/local/*
   ─ composables/use*.ts
   (served on 0.0.0.0:<1701-1800>)
```

Everything flows from the JSON. Edit the JSON → both web and video update on their next run. This is why `[BE]` Bo owns the data contract and is the first person to check when anything looks wrong.

---

## Where To Look (quick lookup)

| I need to… | Open |
|---|---|
| Add / edit / remove an alumnus | `alumni-journey-map/data/templates/sample.json` |
| Add / edit / remove a city place | `local-guide-map/data/templates/<city>-sample.json` |
| Add a new city | Copy `shanghai-sample.json` → `<city>-sample.json`, then wire in `web/components/local/LocalControls.vue` |
| Change alumni map UI | `web/components/alumni/*.vue` + `web/pages/alumni.vue` |
| Change local guide UI | `web/components/local/*.vue` + `web/pages/local.vue` |
| Change map marker / cluster behavior | `web/composables/useLeafletMap.ts` |
| Change alumni constellation / globe | `web/composables/useConstellationMap.ts` |
| Change selection / hover state | `web/composables/useAlumniState.ts` or `useLocalGuideState.ts` |
| Change palette / fonts | `web/nuxt.config.ts` → `tailwindcss.config.theme.extend` |
| Change the shared data contract | `shared/types/*.ts` **and** `shared/schemas/*.schema.json` (keep them in sync) |
| Change shared formatters | `shared/utils/format.ts` |
| Change the alumni video | `alumni-journey-map/video-remotion/src/AlumniJourneyVideo.tsx` |
| Change the local guide video | `local-guide-map/video-remotion/src/LocalGuideVideo.tsx` |
| Add new alumni photo | `web/public/avatars/<slug>.png` + update `photoUrl` in JSON |
| Landing page | `web/pages/index.vue` + `web/components/shared/MapModeToggle.vue` |
| Visual design rules | `docs/visual-direction_en.md` |
| OpenClaw facilitation prompts | `docs/openclaw-starter-prompts_{en,cn}.md` |

---

## Key Technical Decisions

| Decision | Why | Where to see it |
|---|---|---|
| Merged web app in `web/` | One Nuxt app for both maps → shared landing, shared composables, simpler deploy. | `web/pages/index.vue`, `pnpm-workspace.yaml` |
| `shared/` has no build step | Raw TS, consumed via `@yalie/shared` path alias → zero build friction between packages. | `tsconfig.json`, `shared/package.json` |
| Leaflet for web, Remotion for video | Leaflet is mature for pan/zoom + clusters; Remotion renders deterministic MP4s in React. Kept separate to avoid Vue↔React mixing in the same bundle. | `web/composables/useLeafletMap.ts`, `*/video-remotion/src/*` |
| Dual palette (Dalí / Magritte) | Each map has a distinct mood; hard boundary prevents UI drift. | `web/nuxt.config.ts`, `docs/visual-direction_en.md` |
| TS strict + `noUncheckedIndexedAccess` | Data comes from JSON — indexed access is where bugs hide. Strict mode surfaces them at compile time. | `tsconfig.json` |
| Dev server binds to `0.0.0.0` | Workshop runs on LAN; phones need direct access. | `web/nuxt.config.ts` → `devServer.host` |
| Port range 1701–1800 | 1701 is the default; fall back through the range on shared hosts. | `CLAUDE.md` → port-picker helper |
| No test runner, no linter | Small scope, short timeline, QA is manual per release. Revisit post-event. | (absence) |

---

## Anti-Patterns (hard rules)

- Never run `.nuxt/dist/server/server.mjs` directly — internal build artifact only. Use `pnpm --filter @yalie/two-maps-web start`.
- Never edit `alumni-journey-map/web-nuxt/` or `local-guide-map/web-nuxt/` — orphan scaffolds, not in the workspace.
- Never use pure black (`#000`) or pure white (`#fff`) — use `surrealist-black` / `dream-white`.
- Never use `linear` easing for UI transitions — `ease-out` entering, `ease-in` exiting.
- Never mix Dalí and Magritte palettes in the same component.
- Never fabricate `demo_url`, photo URLs, or coordinates. If unknown, ask.
- Never bypass TypeScript with `as any`, `@ts-ignore`, or `@ts-expect-error`.

---

## Commands (run from `two-maps/`)

```bash
pnpm install             # Install all workspace deps
pnpm dev                 # Start @yalie/two-maps-web (defaults 0.0.0.0:1701)
pnpm build               # Build shared + web + both video bundles
pnpm render              # Render both MP4 videos
pnpm render:alumni       # Render alumni-journey.mp4 only
pnpm render:local        # Render local-guide.mp4 only
```

For port-fallback, production-style run, and host-address discovery, see `CLAUDE.md` (this folder).

---

## When To Update This File

- A new package is added to `pnpm-workspace.yaml` → update the Packages table.
- A file is added to `web/components/alumni/` or `web/components/local/` → update the tree.
- A new composable, shared type, or schema is introduced → update the tree and the Where-To-Look table.
- A new city template is added → update the tree.
- A hard rule changes → update Anti-Patterns.

If you are about to touch this file, also run a quick sanity check: `ls web/components/alumni web/components/local web/composables shared/types` and diff against the tree above.
