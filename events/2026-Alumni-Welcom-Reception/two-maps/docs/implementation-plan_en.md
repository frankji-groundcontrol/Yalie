# Two Maps Event Platform Implementation Plan
> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
**Goal:** Build two interactive map pages and matching motion outputs for the Yale Shanghai alumni welcome reception in late April 2026.
**Architecture:** Use a pnpm workspace monorepo at `two-maps/` with `apps/web` (Nuxt 3), `apps/video` (Remotion), and `packages/shared` (types, schemas, utils). Keep one normalized data contract consumed by both apps, with template and live-update lanes.
**Tech Stack:** Node.js 20+, pnpm workspace, Nuxt 3, Tailwind CSS, TypeScript, Remotion, JSON Schema.
---
## Table of Contents
- [Delivery Scope](#Delivery%20Scope)
- [Task 1: Environment Setup](#Task%201:%20Environment%20Setup)
- [Task 2: Alumni Journey Map, Nuxt Web Page](#Task%202:%20Alumni%20Journey%20Map,%20Nuxt%20Web%20Page)
- [Task 3: Alumni Journey Map, Remotion Video](#Task%203:%20Alumni%20Journey%20Map,%20Remotion%20Video)
- [Task 4: Local Guide Map, Nuxt Web Page](#Task%204:%20Local%20Guide%20Map,%20Nuxt%20Web%20Page)
- [Task 5: Local Guide Map, Remotion Video](#Task%205:%20Local%20Guide%20Map,%20Remotion%20Video)
- [Task 6: Data Pipeline](#Task%206:%20Data%20Pipeline)
- [Task 7: Output Generation](#Task%207:%20Output%20Generation)
- [Task 8: Polish and Event Prep](#Task%208:%20Polish%20and%20Event%20Prep)
- [Verification Gate](#Verification%20Gate)
## Delivery Scope
- Event profile: Yale Shanghai alumni event, 150 to 200 attendees, late April 2026.
- Output set: Alumni Journey Map and Local Guide Map, each as web and video.
- Artifact formats: static web, high-res still PNG, MP4 horizontal and vertical.
- Non-scope: backend services, database work, authentication, admin tooling.
## Task 1: Environment Setup
**Files:**
- Verify: `two-maps/pnpm-workspace.yaml`, `two-maps/package.json`.
- Update: `two-maps/README.md` setup section.
**Step 1: Verify tooling versions**
Run `node -v` and `pnpm -v`.
Expected: Node 20+ and pnpm available.
**Step 2: Install workspace dependencies**
Run `pnpm install` from `two-maps/`.
Expected: successful install with stable lockfile.
**Step 3: Verify workspace links**
Run `pnpm -r list --depth 0`.
Expected: `apps/web`, `apps/video`, `packages/shared` linked.
**Step 4: Add root scripts**
Add `dev:web`, `dev:video`, `build:web`, `render:video`, `validate:data`.
Expected: one command layer for the full team.
## Task 2: Alumni Journey Map, Nuxt Web Page
**Files:**
- Create: `two-maps/apps/web/pages/alumni-journey.vue`.
- Create: `two-maps/apps/web/components/alumni/ProfileCard.vue`.
- Create: `two-maps/apps/web/components/alumni/JourneyPath.vue`.
- Create: `two-maps/apps/web/components/alumni/FilterBar.vue`.
- Modify: `two-maps/apps/web/tailwind.config.ts`.
**Step 1: Create page shell**
Build hero, filter region, journey region, and card list region.
Deliverable: route loads with placeholder content.
**Step 2: Build profile card**
Show photo, name, class year, program, origin, current city, journey text.
Deliverable: typed reusable card.
**Step 3: Build journey path view**
Render origin -> Yale -> current with labels and markers.
Deliverable: works on phone and large screen.
**Step 4: Add filters**
Support decade, program, and industry.
Deliverable: filtered cards and path highlights update together.
**Step 5: Add responsive layout and styling**
Tune breakpoints and apply polished Tailwind theme.
Deliverable: event-worthy visual quality.
## Task 3: Alumni Journey Map, Remotion Video
**Files:**
- Create: `two-maps/apps/video/src/compositions/AlumniJourney/index.tsx`.
- Create: `two-maps/apps/video/src/compositions/AlumniJourney/TitleSequence.tsx`.
- Create: `two-maps/apps/video/src/compositions/AlumniJourney/ProfileReveal.tsx`.
- Create: `two-maps/apps/video/src/compositions/AlumniJourney/JourneyPathAnim.tsx`.
- Modify: `two-maps/apps/video/src/Root.tsx`.
**Step 1: Register composition sizes**
Add 1920x1080 and 1080x1920 compositions.
Deliverable: both visible in Remotion Studio.
**Step 2: Build title sequence**
Animate title, subtitle, and event date.
Deliverable: clear intro in first seconds.
**Step 3: Build staggered profile reveal**
Animate card entries with index offsets.
Deliverable: readable and smooth reveal order.
**Step 4: Build path animation**
Animate route draw and point highlights.
Deliverable: journey progression is clear at first watch.
**Step 5: Add music support and test render**
Add optional audio props and render sample data.
Deliverable: successful MP4 in both dimensions.
## Task 4: Local Guide Map, Nuxt Web Page
**Files:**
- Create: `two-maps/apps/web/pages/local-guide.vue`.
- Create: `two-maps/apps/web/components/local/LocationCard.vue`.
- Create: `two-maps/apps/web/components/local/ArtWalkRoute.vue`.
- Create: `two-maps/apps/web/components/local/CategoryFilter.vue`.
**Step 1: Create local guide page shell**
Build map panel, route panel, and locations panel.
Deliverable: route renders with sample data.
**Step 2: Build location card**
Include bilingual name, category icon, tip, district.
Deliverable: card supports EN and CN labels.
**Step 3: Build art walk route module**
Show ordered stops and estimated visit duration.
Deliverable: selected stop state is highlighted.
**Step 4: Add category filtering**
Support food, culture, art, practical.
Deliverable: list and map markers stay synchronized.
**Step 5: Add responsive polish**
Match spacing, typography, and component rhythm with Alumni page.
Deliverable: both pages read as one product system.
## Task 5: Local Guide Map, Remotion Video
**Files:**
- Create: `two-maps/apps/video/src/compositions/LocalGuide/index.tsx`.
- Create: `two-maps/apps/video/src/compositions/LocalGuide/LocationReveal.tsx`.
- Create: `two-maps/apps/video/src/compositions/LocalGuide/ArtWalkAnim.tsx`.
- Modify: `two-maps/apps/video/src/Root.tsx`.
**Step 1: Register dual-size compositions**
Add 1920x1080 and 1080x1920 entries.
Deliverable: both variants selectable in studio.
**Step 2: Build category-grouped reveal**
Animate locations in grouped blocks.
Deliverable: coherent category narrative.
**Step 3: Build art walk route animation**
Animate route trace and stop callouts.
Deliverable: route remains legible on first pass.
**Step 4: Test sample renders**
Render both dimensions with template data.
Deliverable: no clipping, no failed frames.
## Task 6: Data Pipeline
**Files:**
- Create: `two-maps/scripts/normalize-data.ts`.
- Create: `two-maps/scripts/validate-data.ts`.
- Create: `two-maps/packages/shared/schemas/*.schema.json`.
- Create: `two-maps/docs/live-update-protocol_en.md`.
**Step 1: Define schema contracts**
Specify required and optional fields for both map datasets.
Deliverable: shared schema files committed.
**Step 2: Build normalize script**
Transform template JSON to app-ready export JSON.
Deliverable: deterministic sorted output.
**Step 3: Build validate script**
Validate output files and return actionable errors.
Deliverable: fail-fast validation command.
**Step 4: Document live update protocol**
Document owners, cadence, cutoff windows, and fallback path.
Deliverable: event-day runbook for updates and rerenders.
## Task 7: Output Generation
**Files:**
- Modify: `two-maps/apps/web/nuxt.config.ts`.
- Modify: `two-maps/apps/video/package.json`.
- Create: `two-maps/docs/output-commands_en.md`.
**Step 1: Configure Nuxt static output**
Pre-render `/alumni-journey` and `/local-guide`.
Deliverable: static files ready for hosting.
**Step 2: Configure still render output**
Add high-res PNG still commands.
Deliverable: still assets for venue screens and posters.
**Step 3: Configure MP4 render output**
Add horizontal and vertical render commands.
Deliverable: one-command video outputs.
**Step 4: Run full output pass**
Generate web build, stills, and videos in one test cycle.
Deliverable: all outputs sourced from same normalized data.
## Task 8: Polish and Event Prep
**Files:**
- Modify: shared style tokens and branding blocks.
- Create: `two-maps/docs/event-prep-checklist_en.md`.
**Step 1: Add Yale branding**
Apply approved colors and logo placeholder positions.
Deliverable: consistent visual identity in web and video.
**Step 2: Add EN/CN toggle**
Add language toggle for key labels and cards.
Deliverable: bilingual support for mixed audience.
**Step 3: Final visual review**
Review phone, laptop, and venue display aspect ratios.
Deliverable: sign-off checklist for readability and spacing.
**Step 4: Generate pre-event baseline renders**
Render final template-data set before live updates begin.
Deliverable: rehearsal package and backup assets.
## Verification Gate
- Confirm all eight tasks have documented deliverables in `two-maps/docs/`.
- Confirm both pages share style language and bilingual behavior.
- Confirm both Remotion tracks render at 1920x1080 and 1080x1920.
- Confirm normalize and validate scripts pass on template data.
- Confirm event-day protocol includes owner, cadence, and fallback steps.
Plan complete and saved to `events/2026-Alumni-Welcom-Reception/two-maps/docs/implementation-plan_en.md`.
Two execution options:
1. Subagent-Driven (this session), fresh subagent per task with review checkpoints.
2. Parallel Session (separate), new session with executing-plans and batch checkpoints.
Which approach?
