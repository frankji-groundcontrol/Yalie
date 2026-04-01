# Two Maps Visual Direction — Dalí × Magritte Surrealism

## Table of Contents

- [The Blend](#The%20Blend)
- [Color Palette](#Color%20Palette)
- [Typography](#Typography)
- [Per-Map Visual Identity](#Per-Map%20Visual%20Identity)
- [Animation Patterns](#Animation%20Patterns)
- [Composition Rules](#Composition%20Rules)
- [Remotion Video Direction](#Remotion%20Video%20Direction)
- [What to Avoid](#What%20to%20Avoid)

## The Blend

We are blending two surrealist voices — Dalí's warm, fluid emotional immersion and Magritte's cool, cerebral conceptual precision. They are not the same mood; they should be applied to different purposes.

| Dimension | Dalí Influence | Magritte Influence |
|---|---|---|
| When to use | Journey paths, transitions, emotional arc | Location markers, framing devices, reveal states |
| Color temperature | Warm: gold, ochre, burnt orange | Cool: slate blue, cloud white, muted green |
| Animation | Fluid morphing, spring physics, organic flow | Still-then-reveal, hard-edge clip-path, deliberate float |
| Spatial logic | Distorted perspective, impossible depth | Clean composition, one impossible element per scene |
| Mood | "This is a dream and it's beautiful" | "This is calm and something is quietly wrong" |

The Alumni Journey Map leans **Dalí** — journeys are emotional, paths melt and glow, the map bends to emotional truth rather than geographic accuracy.

The Local Guide Map leans **Magritte** — locations are precise and recognizable, but framed through paradox (a window showing a painting that matches the view; a map that is and isn't the city).

## Color Palette

### Shared Foundation (Both Maps)

| Role | Name | Hex | Usage |
|---|---|---|---|
| Background | Dream White | `#EBE8E5` | Page background, card faces |
| Text primary | Surrealist Black | `#1A1410` | Headings, body text |
| Text secondary | Warm Stone | `#8B7355` | Labels, metadata, captions |
| Divider/rule | Suit Charcoal | `#3D3D3D` | Lines, borders, subtle structure |

### Alumni Journey Map — Warm Dalí Tones

| Role | Name | Hex | Usage |
|---|---|---|---|
| Accent primary | Catalan Gold | `#E1B662` | Journey paths, highlights, active states |
| Accent secondary | Melting Orange | `#E1A030` | Hover glows, transition markers |
| Accent deep | Dalí Brown | `#9B6845` | Card borders, earth elements |
| Sky / depth | Port Lligat Azure | `#96B2DF` | Background depth, horizon, hover fills |
| Urgent | Catalan Sunset | `#D35400` | Alerts, important tags |

### Local Guide Map — Cool Magritte Tones

| Role | Name | Hex | Usage |
|---|---|---|---|
| Accent primary | Magritte Sky | `#7BA7BC` | Category headers, map overlays |
| Accent secondary | Apple Green | `#5A7A4A` | Location pins, nature category |
| Accent depth | Twilight Slate | `#4A5568` | Card borders, shadow tones |
| Night | Night Shadow | `#1A1F2E` | Dark sections, Empire of Light splits |
| Warm accent (sparse) | Streetlamp Amber | `#C4922A` | One warm highlight per screen |

## Typography

Two pairing options depending on tone:

**Option A — Gallery / Classical** (recommended for this event's Yale institutional context):
- Headings: **Cormorant Garamond** (high-contrast serif, "painted with a fine brush")
- Body: **Inter** (clean, institutional, highly legible)
- Mono/data: **Space Grotesk** (timestamps, IDs)

**Option B — Avant-garde / Contemporary** (if the team wants a bolder creative direction):
- Headings: **Syne** (distinctive geometric sans, art gallery mood)
- Body: **Manrope** (clean geometric sans, excellent readability)

**CJK support** (required for bilingual content):
- Chinese headings: **Noto Serif SC** (pairs with Cormorant) or **Noto Sans SC** (pairs with Syne)
- Chinese body: **Noto Sans SC** at 400/500 weight

**Avoid**: Rounded sans-serifs, handwritten fonts, decorative type. Both Dalí and Magritte demand precision.

## UI/UX Quality Protocol

When implementing the visual design, use the `ui-ux-pro-max` skill to validate decisions at each stage. The protocol:

1. **Before building**: Run `search.py` queries for style, typography, color, and UX domains to ground decisions in the skill's database.
2. **During building**: Follow the Pre-Delivery Checklist from the skill — no emoji icons (use SVG from Lucide/Heroicons), cursor-pointer on all interactive elements, smooth transitions (150-300ms), consistent icon sizing.
3. **Accessibility requirements**:
   - `prefers-reduced-motion` media query on ALL animations — respect user's motion settings.
   - WCAG AA contrast minimum (4.5:1 for body text, 3:1 for large headings).
   - All images have alt text. All interactive elements have focus states.
   - Ease-out for entering elements, ease-in for exiting. Never linear for UI transitions.
4. **Before delivery**: Run the full checklist — visual quality, interaction, light/dark mode, layout, accessibility.

Skill search commands relevant to this project:
```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "surrealism artistic" --domain style
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "elegant artistic gallery" --domain typography
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "animation" --domain ux
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "accessibility" --domain ux
```

## Per-Map Visual Identity

### Alumni Journey Map (Dalí-Forward)

**Core device — the emotionally accurate map**: Geography bends to story. Yale's campus is rendered at monumental scale. Journey paths glow with Catalan Gold and cast impossibly long shadows. Arrival cities are lit as if by a setting Catalan sun.

| Element | Visual Treatment |
|---|---|
| Profile cards | Warm tones, slight perspective tilt on hover, shadow elongates dramatically |
| Journey paths | SVG paths that glow with `#E1B662`, animated with spring physics |
| Origin → Yale → Current | Three depth planes with parallax (background moves slower) |
| Map background | Warm desert gradient (`#EBE8E5` → `#9B6845`), horizon line at 1/3 from bottom |
| Hover states | Card "lifts" with perspective transform; path segment highlights |
| Empty space | Charged, not empty — the vast desert feeling |

**Reference painting**: *The Persistence of Memory* — the warm, precise, impossible landscape.

### Local Guide Map (Magritte-Forward)

**Core device — the map that is and isn't the city**: A window shows a painting that perfectly matches the view through it. The map is a representation. Locations are photorealistic but one thing per screen is quietly impossible.

| Element | Visual Treatment |
|---|---|
| Location cards | Cool tones, hard-edge clip-path reveal on hover |
| Category markers | Floating objects (Magritte-style) — a green apple for food, a bowler hat for culture |
| Art walk routes | Clean paths with hard edges, not fluid — precision, not organic flow |
| Map background | Cool gradient (`#F0EDE8` → `#7BA7BC`), the Magritte overcast sky |
| The "one impossible thing" | A silhouette of Shanghai's skyline filled with moving clouds (clip-path + fixed background) |
| Hover states | Slow reveal (1.2s) — content "lifts" like a painting from an easel |

**Reference painting**: *The Human Condition* — the painting on the easel that matches the window view.

## Animation Patterns

### Shared Timing Constants

```
SLOW_REVEAL:    1200ms, cubic-bezier(0.4, 0, 0.2, 1)
FLOAT:          8000-12000ms, ease-in-out, infinite
CARD_LIFT:      400ms, spring(damping: 20, stiffness: 300)
PATH_DRAW:      2000ms, linear (SVG stroke-dashoffset)
MORPH:          800ms, spring(damping: 12, stiffness: 200)
```

### Alumni Journey Map Animations (Dalí)
- **Path glow**: SVG stroke animates with golden gradient, spring physics (low damping = viscous, slow settle)
- **Card hover**: Shadow elongates to 3× normal, card lifts with subtle perspective transform
- **Parallax scroll**: Background at 0.2× speed, mid-ground at 0.5×, foreground at 1×
- **Profile entrance**: Spring-based fade-in with slight vertical overshoot

### Local Guide Map Animations (Magritte)
- **Location reveal**: Hard-edge clip-path animation — content appears as if a curtain parts
- **Object float**: Slow vertical drift, linear, no bounce — objects are *placed*, not thrown
- **Silhouette fill**: Cloud texture moves slowly inside a static silhouette shape
- **Day/night split**: On scroll, a horizontal dividing line shifts the ratio of Magritte Sky to Night Shadow
- **Scale shift**: On hover, one element grows beyond its container (0.8s transition, stays large briefly)

## Composition Rules

1. **Asymmetric layouts** — neither artist centered things conventionally. Visual weight slightly off-balance.
2. **Extreme scale contrast** — one element very large, others small. A profile card that fills half the screen next to tiny location pins.
3. **Horizon line as structure** — a strong horizontal rule at ~1/3 from bottom. Separates warm (ground) from cool (sky).
4. **Negative space is intentional** — large areas of Dream White or Night Shadow feel charged, not unfinished.
5. **One impossible thing per screen** (Magritte rule) — don't stack impossibilities. One surreal device per composition.
6. **Hard edges for Magritte devices, soft edges for Dalí devices** — clip-path vs. blur/gradient.

## Remotion Video Direction

### Alumni Journey Map Video (60-90s)
1. Fade in title over warm desert gradient (3s hold)
2. Each profile enters with spring animation — card slides in, path draws itself in gold (5s per profile)
3. Journey path glows and "melts" slightly — the Dalí morph (1s transition between profiles)
4. Final frame: all paths visible, pulsing gently, over the full map (5s hold)
5. Fade to title card with event details

### Local Guide Map Video (60-90s)
1. Fade in title over Magritte overcast sky (3s hold)
2. Shanghai skyline silhouette fills with moving clouds (the signature Magritte moment, 4s)
3. Location pins float into place — category by category, each with its impossible object marker (4s per category)
4. Art walk path draws itself with hard edges, stops highlighted (8s)
5. Final frame: the "Human Condition" device — a framed painting of the map placed over the actual map (5s hold)
6. Fade to title card

### Render Specs
- Display: 1920×1080 (landscape, for screens)
- Social: 1080×1920 (portrait, for WeChat/Instagram)
- Stills: 3840×2160 (high-res, for print/display)
- FPS: 30 (smooth enough for spring animations, manageable file size)

## What to Avoid

- **Psychedelic / trippy effects** — surrealism is not psychedelia. The mood is precise, not hallucinatory.
- **Multiple impossible things competing** — one per scene. Magritte's discipline.
- **Pure black or pure white** — always use the palette variants (Surrealist Black, Dream White).
- **Warm + cool fighting in the same element** — warm belongs to Alumni Journey, cool belongs to Local Guide. They share the neutrals.
- **Fast, bouncy micro-interactions** — this is surrealism, not a SaaS dashboard. Everything moves slowly and deliberately.
- **Decorative surrealism** — every surreal element should mean something, not just look strange.

The test: **Would Dalí paint this with obsessive precision? Would Magritte present it with a straight face?** If yes, it's right.
