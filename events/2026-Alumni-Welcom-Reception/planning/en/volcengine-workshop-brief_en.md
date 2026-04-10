# Volcano Engine Event Context and Early Resource Ideas

## 1. What This Activity Is

This is the co-creation part of a Yale alumni event. The goal is not to run a technical demo for engineers. The goal is to let people with different technical backgrounds participate together and produce something visible during the event.

Most participants are alumni, with a smaller number of trusted Yale-network guests. The on-site flow is: short talks and Fishbowl discussion first, then group co-creation.

## 2. What Happens On Site

The co-creation block works in 4 steps:

1. **Group formation first**: we will group people based on technical confidence, so each team has both technical and non-technical participants.
2. **Shared onboarding first**: everyone visits one web page to understand the purpose of the activity and the two maps:
   - Life-path map: where someone came from, what happened at Yale, and where they are now.
   - Local living map: places, routes, and recommendations across New Haven, Beijing, and Shanghai.
3. **OpenClaw co-creation**: even people who do not know web development should be able to use OpenClaw to make fast visual outputs.
4. **Final showcase**: every group presents something, and we hope the result reflects each person's element. OpenClaw can also help with ideas and presentation structure.

## 3. Why We Wanted to Reach Out to Volcano Engine

We wanted to first give the Volcano Engine team a clear picture of the event. This is less a pure infrastructure request and more a question of whether there is a good fit between your product shape and an on-site collaboration experience for mixed-skill groups.

On our side, we have already prepared two concrete inputs:

- a fully usable engineering template (`two-maps`)
- a ready-to-use prompt pack

So this is not a zero-to-one request. These materials can be shared with OpenClaw in advance to help both sides think through pre-configuration, rehearsal, and resource matching.

## 4. Two Early Resource Ideas

### Idea 1: Around 20 turnkey Lobster / OpenClaw workspaces

- We are currently estimating around 20 groups.
- Based on the current scope, a basic `2C4G` starting point per workspace should likely be enough.
- If possible, browser-based delivery would be ideal.
- In the best case, each group would have one isolated, ready-to-use workspace.
- That would let participants avoid installation or additional setup on site.
- Ideally this also includes browser preview capability, for example:
  - primary option: a turnkey web preview service, or
  - fallback option: an accessible public IP / open port per group for preview.

### Idea 2: Pre-configure the core environment before the event

- If feasible, we would love to have Doubao LLM connected in advance.
- If feasible, it would also be great to have an image generation model ready.
- Pre-installing `git` would make the session much smoother.
- If `git` can work without login, that would further reduce friction.
- The ideal experience is that participants receive a link and can start immediately without any login.

## 5. Rough Engineering Shape of the Two Maps

To help with product matching, here is the rough shape of the current project:

- We already have a working `two-maps` engineering template.
- It is organized as a `pnpm workspace` monorepo.
- There is a combined `Nuxt 3` web app as the main web entry, and the repo also keeps map-specific web scaffolds.
- The browser layer is mainly `Nuxt 3 + TypeScript`.
- Mapping is currently built around `Leaflet`, with some 3D globe capability as well.
- Each map also has a `Remotion` project for video-style output.
- Shared data types and utilities are maintained in a `shared` package.
- In practice, the current workflow assumes a `Node + pnpm` environment and browser-based live preview, so web preview capability is an important part of the fit.

## 6. The Main Feedback We Need First

At this stage, we would mainly love to understand two things together:

1. Whether the above direction feels feasible for this activity format.
2. If it does, what product form and on-site resource matching would make the most sense.
