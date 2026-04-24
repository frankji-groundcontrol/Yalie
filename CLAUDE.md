# CLAUDE.md

> Fast-load guide for any Claude Code agent opening this vault. Read top-to-bottom before your first action. This file complements `AGENTS.md`; it does not replace it.

## Table of Contents

- [First Thing, Every Session](#first-thing-every-session)
- [Our Project: `two-maps`](#our-project-two-maps)
- [Deployment Rule: Always Bind to `0.0.0.0`](#deployment-rule-always-bind-to-0000)
- [Port Rule: Use `1701` — Fall Back Through `1701–1800`](#port-rule-use-1701--fall-back-through-17011800)
- [Remote Host: Ubuntu — How To Find The Address](#remote-host-ubuntu--how-to-find-the-address)
- [Meet The Team — Role Channels](#meet-the-team--role-channels)
- [Fast Working Examples](#fast-working-examples)
- [Also Read](#also-read)
- [What Not To Do](#what-not-to-do)

---

## First Thing, Every Session

Before any edit, any plan, any question — confirm the branch.

```bash
git branch --show-current
# Expected: 2026-04-alumni-welcome-event
```

If you are anywhere else, switch:

```bash
git checkout 2026-04-alumni-welcome-event
```

All active work for the 2026 Yale Shanghai alumni welcome reception lives on this branch. `main` is frozen reference; do not push to it from an agent session.

Do **not** run `git pull`, `git merge`, `git rebase`, or `git push` unless the user explicitly asks. Confirming the branch is safe; moving history is not.

---

## Git Remotes — Prefer Gitee From Mainland China

The repo is mirrored to two hosts. Both receive the same history; pick based on where you're running from.

| Host | URL | When to use |
|---|---|---|
| **GitHub** (primary) | `https://github.com/frankji-groundcontrol/Yalie.git` | Outside mainland China; CI; public reference |
| **Gitee** (China mirror) | `https://gitee.com/frankji-groundcontrol/yalie.git` | **Inside mainland China** — avoids GitHub throttling |

If `git pull` or `git clone` from GitHub is crawling, switch to Gitee:

```bash
# Add gitee as a second remote (once):
git remote add gitee https://gitee.com/frankji-groundcontrol/yalie.git

# Pull from gitee on the active branch:
git fetch gitee
git pull gitee 2026-04-alumni-welcome-event

# Or clone via gitee from the start:
git clone https://gitee.com/frankji-groundcontrol/yalie.git
```

When you push after the user explicitly asks, push to **both** remotes so they stay in sync:

```bash
git push origin  2026-04-alumni-welcome-event
git push gitee   2026-04-alumni-welcome-event
```

### Git LFS is required

Binary assets (`*.jpg`, `*.png`, `*.pdf`, `*.mp4`, Remotion bundle maps) are stored in **Git LFS** to keep clones fast. Before cloning or pulling:

```bash
# macOS
brew install git-lfs

# Ubuntu
sudo apt-get install git-lfs

# One-time setup per machine:
git lfs install

# After pull, fetch missing LFS objects:
git lfs pull
```

If you ever see `Encountered 1 file(s) that should have been pointers, but weren't` on a fresh clone, run `git lfs pull` and retry.

---

## Event Asset Hosting — Temporary Alibaba Cloud OSS

For the 2026 alumni welcome event only, browser-facing images (avatars, posters, QR codes) are temporarily served from Alibaba Cloud OSS **bucket `web-dj-20260205`** (Tokyo region, `ap-northeast-1`). This keeps the on-site app fast without treating OSS as the permanent source of truth.

Canonical originals remain in git through **Git LFS**. After the event, agents should prefer the local `public/` files backed by Git LFS again.

OSS prefix:

```
oss://web-dj-20260205/yalie/yale-club-of-shanghai/events/2026-04-alumni-welcome-event/
```

Security/lifetime model:

- Objects under this prefix are **private ACL**; direct `https://.../file.jpg` URLs should return `403`.
- App code uses generated **5-day signed URLs** committed into per-app URL maps.
- Bucket lifecycle rule `expire-2026-alumni-welcome-event-5day` deletes objects under the event prefix 5 days after upload.
- Current signed maps expire around `2026-04-29T09:51:00Z`; re-run the generator if the event site still needs OSS after that.

Generated maps:

| App | Helper | Generated signed URL map |
|---|---|---|
| `two-maps/web/` (Nuxt) | `composables/useAssetUrl.ts` | `web/lib/ossUrlMap.ts` |
| `posts/posters/long/` (Next.js) | `lib/asset-url.ts` | `lib/oss-url-map.ts` |
| `posts/posters/short/` (Next.js) | `lib/asset-url.ts` | `lib/oss-url-map.ts` |

During the event, use the helper only:

- Nuxt: `useAssetUrl("/avatars/frank-ji.jpg")`
- Next.js: `assetUrl("/shirley.jpg")`

Never hardcode OSS URLs manually. The helper first checks the generated signed URL map; if a path is missing or maps are cleared, it falls back to the local `/public/` path.

To regenerate 5-day signed URLs before or during the event:

```bash
python3 events/2026-Alumni-Welcom-Reception/scripts/generate-oss-urls.py
```

To return to post-event local/LFS behavior:

```bash
python3 events/2026-Alumni-Welcom-Reception/scripts/generate-oss-urls.py --clear
```

When adding a new event image during the temporary OSS window:

1. Drop the file into the correct `public/` folder (this remains the git/LFS source of truth).
2. Upload it under the matching OSS sub-prefix with private/default ACL:
   ```bash
   ossutil cp new-image.jpg oss://web-dj-20260205/yalie/yale-club-of-shanghai/events/2026-04-alumni-welcome-event/<sub-prefix>/new-image.jpg \
     --acl default \
     --meta "Cache-Control:public, max-age=432000"
   ```
3. Re-run `scripts/generate-oss-urls.py` and commit the regenerated map.

---

## Our Project: `two-maps`

The active product is at:

```
events/2026-Alumni-Welcom-Reception/two-maps/
```

Two experiences ship for the Yale Shanghai alumni welcome reception:

- **Alumni Journey Map** — personal life-path stories (hometown → Yale → today).
- **Local Guide Map** — bilingual city guides for New Haven, Shanghai, and Beijing.

Stack:

- **Nuxt 3 + Vue 3** (interactive web)
- **Remotion 4 + React 18** (pre-rendered MP4 videos)
- **pnpm workspaces** (4 packages: `shared`, `web`, 2× `video-remotion`)
- **TypeScript strict mode** + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`
- **Leaflet** for maps, **Tailwind** for styling

When a user gives you a map-related task without pointing at a folder, assume they mean `two-maps`.

**The running web app is `two-maps/web/`.** The folders `alumni-journey-map/web-nuxt/` and `local-guide-map/web-nuxt/` are orphaned scaffolds — do not edit them.

**Before you grep or scan the repo**, read `events/2026-Alumni-Welcom-Reception/two-maps/ARCHITECTURE.md`. It's a one-page map of every package, component, composable, type, schema, and data template. It will save you from spelunking.

---

## Deployment Rule: Always Bind to `0.0.0.0`

The event runs on a LAN where attendees scan a QR code and open the maps on their phones. **Every runtime must listen on `0.0.0.0`**, never on `localhost` only. A map that works on `127.0.0.1` but not on the LAN is a map that does not work at the event.

- `pnpm dev` already does this — see `web/nuxt.config.ts` → `devServer: { host: '0.0.0.0' }`.
- `pnpm start` runs `node .output/server/index.mjs`. Node defaults to `localhost` on some versions, so **always set `HOST=0.0.0.0` explicitly**.
- `pnpm preview` — same rule, same env.
- After any start, **prove the bind** before declaring success (see next section for the verify snippet).

Do not answer "the site is up" until you have verified both the bind address and the port.

---

## Port Rule: Use `1701` — Fall Back Through `1701–1800`

Default port is **`1701`**. On shared hosts `1701` is sometimes already in use — in that case, step forward one port at a time through `1702, 1703, … 1800` and pick the first free one. Never silently pick a port outside the range; never hardcode a port without checking it is free.

### Port picker (copy-paste, Ubuntu + macOS safe)

```bash
find_free_port() {
  for port in $(seq 1701 1800); do
    if command -v ss >/dev/null 2>&1; then
      ss -tln "sport = :$port" 2>/dev/null | grep -q LISTEN && continue
    fi
    if command -v lsof >/dev/null 2>&1; then
      lsof -iTCP:"$port" -sTCP:LISTEN -P -n >/dev/null 2>&1 && continue
    fi
    echo "$port"
    return 0
  done
  echo "ERR: no free port in 1701-1800" >&2
  return 1
}
```

### Canonical start commands

```bash
# Dev (hot reload) — Nuxt CLI takes --port:
PORT=$(find_free_port) && pnpm dev -- --port "$PORT"

# Production-style:
pnpm --filter @yalie/two-maps-web build
PORT=$(find_free_port)
HOST=0.0.0.0 PORT=$PORT pnpm --filter @yalie/two-maps-web start

# Preview:
PORT=$(find_free_port)
HOST=0.0.0.0 PORT=$PORT pnpm --filter @yalie/two-maps-web preview
```

### Verify the bind (mandatory)

```bash
ss -tlnp | grep ":$PORT"        # Ubuntu — expect 0.0.0.0:<PORT>
# or
lsof -iTCP:"$PORT" -sTCP:LISTEN
```

Always **tell the user which port you picked** in your reply, e.g. `Running on 0.0.0.0:1703 (1701 and 1702 were busy)`. If you see `127.0.0.1:<PORT>`, the bind failed — do not declare success.

---

## Remote Host: Ubuntu — How To Find The Address

The workshop demo server is Ubuntu. Use system tools to pull both LAN and public addresses, then build the share URL.

```bash
# LAN address — for phones on the same WiFi (preferred):
ip -4 addr show scope global | awk '/inet /{print $2}' | cut -d/ -f1

# Classic form (may need `sudo apt install net-tools`):
ifconfig | awk '/inet /{print $2}' | grep -v '127.0.0.1'

# Public address — for remote viewers, through NAT. Try ALL methods;
# any single endpoint can fail, be blocked, or return stale data.
curl -4fsS https://api.ipify.org ; echo
curl -4fsS https://ifconfig.me ; echo
curl -4fsS https://icanhazip.com ; echo
curl -4fsS https://checkip.amazonaws.com ; echo
curl -4fsS https://ipinfo.io/ip ; echo
dig +short myip.opendns.com @resolver1.opendns.com 2>/dev/null

# Hostname (for internal DNS, optional):
hostname -I
```

Compose the URL as `http://<ip>:<PORT>/alumni` or `http://<ip>:<PORT>/local` — substitute the port you actually bound (the one `find_free_port` returned), not a hardcoded `1701`. Share both LAN and public addresses when both make sense; name which is which.

One-liner to print the share URLs after a start:

```bash
LAN=$(ip -4 addr show scope global | awk '/inet /{print $2}' | cut -d/ -f1 | head -n1)
PUB=$( (curl -4fsS https://api.ipify.org || curl -4fsS https://ifconfig.me || curl -4fsS https://icanhazip.com || curl -4fsS https://checkip.amazonaws.com || curl -4fsS https://ipinfo.io/ip || dig +short myip.opendns.com @resolver1.opendns.com) 2>/dev/null | awk 'NF{print; exit}' )
echo "LAN:    http://$LAN:$PORT/alumni  |  http://$LAN:$PORT/local"
echo "Public: http://${PUB:-n/a}:$PORT/alumni  |  http://${PUB:-n/a}:$PORT/local"
```

If public-IP methods disagree, report all candidates and tell the user which one you used. Prefer the LAN URL for phones on the same WiFi.

---

## Meet The Team — Role Channels

We work as a small product squad. Each role has a distinct mindset. When the user prefixes a message with a channel tag, **switch voice** and load the matching role memory from `events/2026-Alumni-Welcom-Reception/two-maps/CLAUDE.md`.

| Channel | Role | Person | In one sentence |
|---|---|---|---|
| `[PM]` | Product Manager | **Lin** | Decides *what* we build and *why it matters to alumni*. |
| `[TL]` | Tech Lead | **Ren** | Chooses *how* we build and *keeps the architecture honest*. |
| `[FE]` | Frontend Engineer | **Min** | Makes the maps *feel alive* on phones and big screens. |
| `[BE]` | Backend Engineer | **Bo** | Keeps *data contracts clean* so nothing breaks silently. |
| `[QA]` | Quality Assurance | **Qi** | Asks *"are we sure?"* until we actually are. |

### How Channel Invocation Works

When you see any of these markers anywhere in the user's message, activate that role **before answering**:

- Short form: `[PM]`, `[TL]`, `[FE]`, `[BE]`, `[QA]`
- Long form: `[product-manager]`, `[tech-lead]`, `[frontend]`, `[backend]`, `[qa]`

Behavior on invocation:

1. Open `events/2026-Alumni-Welcom-Reception/two-maps/CLAUDE.md` and read the matching role memory section in full.
2. Adopt that role's voice, priorities, and scope for the rest of the reply.
3. Begin the reply with `[Role] — <one-line framing of how you're approaching this>` so the user sees the hand-off.
4. If the task genuinely spans multiple roles, declare the chain: `[PM → TL → FE]` and hand off step by step.
5. If no channel is specified, stay in orchestrator (Sisyphus) mode and route to the right role.

### Role Introductions (Non-Tech Friendly)

**Product Manager — Lin `[PM]`**
Imagine an alumna opening the map on her phone at the venue. Lin is the person who asks: *"Will this moment feel special? Will she call her mom about it?"* Lin translates community goals into features, cuts what doesn't move the needle, and protects the emotional arc of the evening.

**Tech Lead — Ren `[TL]`**
Ren is the calm one. When someone wants a flashy animation, Ren quietly checks whether the data model can carry it without a rewrite next week. Ren owns the shared contracts in `shared/`, defends TypeScript strictness, and lives by the rule "don't refactor while firefighting".

**Frontend Engineer — Min `[FE]`**
Min cares about the texture of the app — how a city marker eases in, how a Chinese serif sits next to English, whether the map still works one-handed on a dim subway. Min reaches for Tailwind tokens (Dalí / Magritte palettes) instead of ad-hoc hex.

**Backend Engineer — Bo `[BE]`**
Bo lives in the JSON. Both maps are driven by data files, and Bo keeps them schema-valid, coordinate-correct, and bilingually paired. Bo also worries about scale: what happens when a city has 300 places instead of 30?

**QA Engineer — Qi `[QA]`**
Qi tests on the cheapest Android, on the oldest iPad, and with airplane-mode-then-reconnect. Qi catches the "works on localhost, dies on LAN" bugs, the "Chinese wraps weird at 320px" bugs, and the "old data cached forever" bugs. Qi says *"show me it works, don't tell me"*.

---

## Fast Working Examples

Full, step-by-step runbooks live in `events/2026-Alumni-Welcom-Reception/two-maps/CLAUDE.md`. Here are the headlines:

- **Add a new place to the Shanghai guide** → `[BE]` Bo owns the JSON edit; `[FE]` Min verifies the marker and popup render; `[QA]` Qi spot-checks cluster behavior.
- **Replace an existing alumnus photo** → `[BE]` Bo swaps the asset in `web/public/avatars/`; `[FE]` Min checks the card layout; `[QA]` Qi confirms phone-side cache busts.
- **Add a new alumna (e.g. Yan, class of 2018, now in Hangzhou) to the Journey Map** → `[PM]` Lin writes the story beats; `[BE]` Bo appends the profile with `stops`; `[FE]` Min confirms the journey line draws; `[QA]` Qi verifies the profile list still sorts.
- **Add a new city (e.g. Hangzhou) to the Local Guide** → `[TL]` Ren confirms the schema; `[BE]` Bo drops in the city template; `[FE]` Min wires the selector; `[QA]` Qi verifies no marker leakage between cities.
- **Change the default color of the "food" marker** → `[FE]` Min updates the Magritte token; `[TL]` Ren sign-off on palette changes.

---

## Also Read

- `AGENTS.md` (root) — content-vault conventions.
- `events/2026-Alumni-Welcom-Reception/AGENTS.md` — event-level authoritative doc.
- `events/2026-Alumni-Welcom-Reception/two-maps/AGENTS.md` — code-specific conventions.
- `events/2026-Alumni-Welcom-Reception/two-maps/ARCHITECTURE.md` — **one-page codebase map, read before grep-ing**.
- `events/2026-Alumni-Welcom-Reception/two-maps/CLAUDE.md` — full role memories + detailed step-by-step examples + port-picker runbook.

---

## What Not To Do

- Do not work on another branch without asking — the only active branch is `2026-04-alumni-welcome-event`.
- Do not run Nuxt `dev`, `start`, or `preview` on `localhost` only — always `0.0.0.0`.
- Do not hardcode `PORT=1701` without a `find_free_port` check — use `1701–1800` and report which you picked.
- Do not pick a port outside `1701–1800`.
- Do not run `.nuxt/dist/server/server.mjs` directly — it is an internal build artifact, not a server entry.
- Do not edit the orphan scaffolds `alumni-journey-map/web-nuxt/` or `local-guide-map/web-nuxt/`.
- Do not commit without an explicit request (per root `AGENTS.md`).
- Do not touch `.obsidian/` files — they are Obsidian vault config, gitignored.
- Do not use `as any`, `@ts-ignore`, or `@ts-expect-error` to silence errors — fix the types.
- Do not fabricate coordinates, photo URLs, or `demo_url` values — if the data is missing, ask.
- Do not grep or scan the repo before reading `two-maps/ARCHITECTURE.md` — the map is there.
