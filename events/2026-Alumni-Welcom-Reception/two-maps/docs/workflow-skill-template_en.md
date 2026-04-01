# Reusable Workflow Skill Template, Interactive Map + Video Project
## Table of Contents
- [1. Prerequisites](#1.%20Prerequisites)
- [2. Visual Style Selection](#2.%20Visual%20Style%20Selection)
- [3. Project Setup](#3.%20Project%20Setup)
- [4. Data Collection](#4.%20Data%20Collection)
- [5. Template Lock](#5.%20Template%20Lock)
- [6. Web Development](#6.%20Web%20Development)
- [7. Video Production](#7.%20Video%20Production)
- [8. Event Day Protocol](#8.%20Event%20Day%20Protocol)
- [9. Post-Event Archive](#9.%20Post-Event%20Archive)
- [10. Output Checklist](#10.%20Output%20Checklist)
## 1. Prerequisites
**What to do**
- Confirm Node.js 20+, pnpm, Git, and FFmpeg.
- Confirm branding assets: logo placeholder, colors, fonts.
- Assign owners for data, web, video, display.
- Load the `ui-ux-pro-max` skill — it will be used throughout steps 2, 6, and 7 for design validation.
**Expected deliverable**
- Readiness checklist with versions and owner list.
**Common pitfalls**
- Missing FFmpeg. Forgetting to load the UI/UX skill before design work.
**Time estimate**
- 1.5 to 2 hours.

## 2. Visual Style Selection

A guided discovery process. The agent walks the user through finding their visual direction before any code is written. Every path through Steps 2a–2d must end with a signed-off `visual-direction.md`.

**Step 2a — Open-ended discovery (ask the user):**

Ask these questions one at a time. Adapt based on answers.

> **Q1: "Do you have any artists, designers, films, or visual references you love? These don't have to be digital — paintings, architecture, photography, fashion all work."**

If the user names specific references:
- Research those references using `librarian` agents (search for visual style analysis, color palettes, digital translations).
- Extract: color palette, composition principles, texture/surface quality, emotional mood, animation potential.
- Present a summary back to the user: "Here's what I found about [their reference] and how it could translate to this project."
- Then still proceed to Step 2b for calibration — the menu anchors the custom references to implementable design patterns.

If the user says "I don't know" / "no preference" / "just make it look good" / "professional":
- Skip Q1 follow-up. Move to the forced-choice fallback below, then go to Step 2b.

**Forced-choice fallback (for low-signal answers):**
> "Let me narrow it down with a few quick either/or choices:"
> - Warm tones or cool tones?
> - Minimal and quiet, or expressive and bold?
> - Calm and refined, or energetic and dynamic?
> - Classic/institutional or contemporary/experimental?

These four binary choices map to 2-3 styles on the menu. Present those as recommendations in Step 2b.

> **Q2: "What mood should people feel when they see this? Pick 2-3 words."**
> Examples: warm, cerebral, playful, prestigious, raw, serene, energetic, nostalgic, meditative, bold

> **Q3: "What should it definitely NOT feel like?"**
> This narrows the space faster than asking what they want.

> **Q4: "Are there any brand, institutional, or venue constraints I should know about?"**
> Examples: must use Yale blue, must feel formal enough for corporate sponsors, venue is industrial so design should complement, audience skews older/younger.

**Step 2b — Guided menu calibration (always run, even after Q1 references):**

Present the reference menu. Frame it as calibration, not final choice:

> "Here are established visual styles for context. Even if you already named references, pick 1-2 from this menu that feel closest — it helps me anchor the design to proven patterns. Or point out which ones are definitely wrong."

| # | Style | Also called | Mood | Key Colors | Animation Feel | Best For |
|---|---|---|---|---|---|---|
| 1 | Surrealism — Dalí | Dreamlike, fluid | Warm, immersive | Gold, ochre, shadow, azure | Slow morph, liquid, parallax | Emotional storytelling, journey maps |
| 2 | Surrealism — Magritte | Conceptual, clean | Cerebral, witty | Slate blue, green, cream | Still → suddenly wrong, reveal | Paradox framing, intellectual events |
| 3 | Bauhaus | Geometric modern | Functional, confident | Red/yellow/blue + B&W | Mechanical, precise, snapping | Academic events, design-literate |
| 4 | Art Deco | Gatsby, golden age | Luxurious, celebratory | Gold, black, navy, ivory | Stately reveals, line-drawing | Gala events, formal receptions |
| 5 | Japanese Ukiyo-e | Woodblock, wave | Serene, poetic | Indigo, vermillion, cream | Flowing, unhurried, scroll-like | Cultural events, nature-themed |
| 6 | Memphis Design | 80s bold | Energetic, playful | Hot pink, yellow, cobalt | Bouncy, springy, irreverent | Youth events, creative showcases |
| 7 | Swiss Typographic | International style | Precise, authoritative | B&W + one accent | Linear, grid-locked | Data-heavy maps, editorial |
| 8 | Wabi-Sabi / Zen | Imperfect beauty | Contemplative, quiet | Ash, clay, moss, fog | Breath-like, slow fades | Retreats, mindful gatherings |
| 9 | Vaporwave / Synthwave | Retro-futurism | Nostalgic, euphoric | Neon pink, purple, cyan | Glitchy, pulsing, neon-glow | Tech events, nightlife |
| 10 | Nordic Minimalism | Scandinavian clean | Calm, refined, warm | Off-white, warm grey, sage | Gentle, unhurried | Community events, welcoming |
| 11 | Chinese Ink (水墨画) | Brush painting | Meditative, spare | Ink black, grey, vermillion | Brush-stroke reveal, ink bloom | China-hosted, cultural bridge |
| 12 | Brutalist Web | Raw digital | Confrontational, memorable | B&W + aggressive accent | Abrupt, no easing | Avant-garde, making a statement |
| 13 | Contemporary Editorial | Magazine-like | Polished, professional, safe | Navy, white, warm grey, one accent | Smooth, restrained, confident | Corporate events, institutional |

Pairing suggestions for common event tones:

| Event Tone | Suggested Blend |
|---|---|
| Prestigious / gala | Art Deco × Swiss Typographic |
| Community / warm welcome | Nordic Minimalism × Wabi-Sabi |
| Cultural heritage | Chinese Ink × Japanese Ukiyo-e |
| Young / energetic | Memphis Design × Vaporwave |
| Academic / intellectual | Bauhaus × Magritte Surrealism |
| Avant-garde / memorable | Brutalist × Dalí Surrealism |
| Professional / institutional (safe) | Contemporary Editorial × Nordic Minimalism |

**Stop criteria for entering Step 2c** — proceed only when you have ALL of:
- A selected style or blend (from user references, menu, or both)
- 2-3 mood words
- 2-3 anti-mood words (what it should NOT feel like)
- Any brand/venue/audience constraints noted
- One sentence from the user confirming: "Yes, this direction feels right"

If you don't have all five after two rounds of questions, present your best recommendation with rationale and ask for a yes/no.

**Step 2c — Deep research on chosen style(s):**

1. Fire `librarian` agents in parallel to research how the chosen style translates to web design and motion graphics — color palettes, animation patterns, typography, composition rules. If the user named their own artist/reference, research that specifically.
2. Run `ui-ux-pro-max` queries to get data-driven design tokens:
```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<style keywords>" --domain style
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<mood keywords>" --domain typography
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<product type>" --domain color
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "animation" --domain ux
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "accessibility" --domain ux
```
3. Synthesize research + skill data into a draft `visual-direction.md`.

Max 2 research iterations. If the first round is comprehensive enough, move to 2d.

**Step 2d — Visual direction doc creation and sign-off:**

The doc must include:
- The chosen style reference(s) and why they fit
- Color palette with hex values, names, and usage rules
- Typography choices (with CJK support if bilingual)
- Per-map visual identity (if the project has multiple outputs)
- Animation patterns with timing constants
- Composition rules
- UI/UX quality protocol referencing `ui-ux-pro-max` checklist
- "What to avoid" section

Present the doc to the user. Ask explicitly:

> "Here's the visual direction. Does this capture what you're going for? Any changes before I lock it and start building?"

**Do not proceed to Step 3 until the user confirms.**

**Expected deliverable**
- `visual-direction.md` confirmed by the user.

**Common pitfalls**
- Skipping this step and letting style "emerge" during coding — leads to inconsistency.
- Picking 3+ styles — too many references dilute the direction.
- Taking the user's first answer as final — iterate. Ask follow-ups.
- Not researching the user's references deeply enough — surface-level style adoption misses the soul of the reference.
- Not running the `ui-ux-pro-max` queries — misses accessibility and UX data.
- Accepting "professional" without drilling deeper — "professional" means different things to different people.

**Time estimate**
- 2 to 4 hours including discovery conversation, research, doc creation, and sign-off.

## 3. Project Setup
**What to do**
- Scaffold from template into event folder.
- Configure workspace: `web/` (single unified Nuxt app), `apps/video-*` (Remotion per map), `packages/shared`.
- The web app is a single Nuxt site with route-per-map architecture: `/` is the gateway landing page, and each map gets its own route (e.g. `/alumni`, `/local`).
- Install from workspace root.
- Add root scripts for dev, build, validate, render.
**Expected deliverable**
- Nuxt boots with all routes and Remotion boots cleanly with shared imports.
**Common pitfalls**
- Install run in subfolder. Splitting maps into separate Nuxt apps instead of one unified site.
**Time estimate**
- 2 to 3 hours.
## 4. Data Collection
**What to do**
- Define schema before collecting records.
- Keep one structured source template.
- Normalize bilingual labels and category enums.
- Validate records before UI integration.
**Expected deliverable**
- Validated dataset consumed by web and video.
**Common pitfalls**
- Late schema edits.
**Time estimate**
- 3 to 5 hours plus updates.
## 5. Template Lock
**What to do**
- Freeze pre-event data by cutoff date.
- Tag frozen data as baseline.
- Generate first web build, stills, preview videos.
- Log exact render commands.
**Expected deliverable**
- Baseline artifact pack for review.
**Common pitfalls**
- No freeze point.
**Time estimate**
- 2 to 4 hours.
## 6. Web Development
**What to do**
- Build the gateway landing page first (`pages/index.vue`), then individual map pages.
- The gateway page is a full artistic entrance — not a plain nav page. It should:
  - Fill the viewport as a diptych: one panel per map, each rendered in that map's visual identity (palette, gradients, atmospheric textures).
  - Use the heading font at display scale with a gradient that bridges both palettes.
  - Include bilingual labels (Chinese + English) for each map entry.
  - Add perspective hover transforms on each panel, entrance animations for the title and panels, and subtle background atmosphere shifts.
  - Include the skyline silhouette motif or horizon line from each map's visual identity as panel decoration.
  - Stack panels vertically on mobile, side-by-side on tablet and up.
  - The gateway page sets the artistic tone for the entire site — it should feel like entering a gallery, not clicking a menu.
- Build each map page: shell first, then cards, then filters.
- Add empty states and reset behavior.
- Implement phone and large-screen layouts.
- Share Tailwind tokens and CSS custom properties across all pages, derived from the visual-direction doc. Merge both map palettes into a single config so all colors are available site-wide.
- Run the `ui-ux-pro-max` Pre-Delivery Checklist before calling any page done: no emoji icons, cursor-pointer on interactives, smooth transitions, `prefers-reduced-motion` respected, WCAG AA contrast, responsive at 320/768/1024/1440px.
**Expected deliverable**
- Polished Nuxt site with gateway + map routes, ready for static build, passing the UI/UX checklist on every page.
**Common pitfalls**
- Treating the gateway page as an afterthought — it is the first impression. Style drift between pages. Skipping the accessibility checklist. Using separate Nuxt apps instead of one unified site with routes.
**Time estimate**
- 1.5 to 2.5 days.
## 7. Video Production
**What to do**
- Define dimensions and timing constants matching the visual-direction doc.
- Build intro, reveal, and close scenes using the animation patterns from the visual direction.
- Reuse card and path motion patterns from the web components where possible.
- Configure display (1920×1080) and social (1080×1920) render profiles.
- Respect `ui-ux-pro-max` animation UX guidelines: ease-out for entrance, ease-in for exit, never linear for UI transitions.
**Expected deliverable**
- Stable horizontal and vertical compositions consistent with the visual direction.
**Common pitfalls**
- Preview smooth, final render stutter. Animation timing that ignores the visual direction doc.
**Time estimate**
- 1 to 2 days.
## 8. Event Day Protocol
**What to do**
- Set live-update windows and cutoffs.
- Run normalize then validate each cycle.
- Re-render changed outputs only.
- Verify venue playback fallback.
**Expected deliverable**
- Event-day runbook with clear handoff.
**Common pitfalls**
- Skipped validation.
**Time estimate**
- 1 hour setup, then 10 to 20 minute cycles.
## 9. Post-Event Archive
**What to do**
- Export final web and video artifacts.
- Export normalized data with date and version.
- Archive source files and command logs.
- Record lessons learned.
**Expected deliverable**
- Reusable archive package.
**Common pitfalls**
- Lost data lineage.
**Time estimate**
- 2 to 3 hours.
## 10. Output Checklist
**What to do**
- Confirm static web builds pass.
- Confirm high-res stills exist.
- Confirm MP4 renders for both aspect ratios.
- Confirm social-safe text margins.
- Confirm output naming includes event, module, language, date.
**Expected deliverable**
- Final handoff bundle ready for operations and archive.
**Common pitfalls**
- Inconsistent naming.
**Time estimate**
- 45 to 90 minutes.
