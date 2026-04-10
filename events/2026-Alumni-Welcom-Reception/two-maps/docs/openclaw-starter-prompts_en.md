# OpenClaw Starter and Facilitation Prompts (English)

## 1. Usage

- This document is for technical facilitators and event admins.
- It helps the AI assistant perform three tasks fast:
  1. Explain project structure
  2. Guide map edits
  3. Generate the summary card `group_submission.json`

Semantic contract (keep consistent):
- Map 1 (Journey) = life path map (hometown -> New Haven -> now)
- Map 2 (Local Guide) = city map (New Haven / Beijing / Shanghai)

## 2. Starter Prompt (Project Understanding)

```text
You are my pair engineer for a live workshop. Read the current repository and provide:
1) A plain-language project map (entry points, data files, styles, output folders)
2) The minimum edit path (which 1-2 files to change to see visual impact)
3) A 20-minute onboarding plan with 5-minute checkpoints
Keep your explanation non-technical and avoid long code dumps.
```

## 2.1 Team Kickoff Prompt (Mixed-Skill Groups)

```text
You are our collaboration coach. Based on our team background, generate:
1) 4 role assignments (builder, storyteller, city curator, presenter)
2) One 10-minute task for each role
3) A clear way for non-web-developers to produce visible contribution
Keep it short and directly actionable.
```

## 3. Edit Prompt (Extend Existing Map)

```text
Please help us implement the following without breaking the existing structure:
- Add member map markers (name, role, lat/lng, short bio, avatar)
- Show avatar + text in marker popup
- Use group-based color coding for markers
- Preserve template data and create a separate group data file
Then output:
1) Files changed
2) Why each file was changed
3) Quick rollback path
```

## 4. Remix Prompt (Create a New Theme Variant)

```text
Create a new themed variant based on the existing two-map template:
- Theme name: [fill in]
- At least 5 demo points
- Keep the current rendering pipeline unchanged
- Provide minimum run steps
Do not refactor the whole project. Deliver only the smallest usable version.
```

## 5. Summary Card Prompt (group_submission)

```text
Generate submission/group_submission.json based on our current group output.
Rules:
- This is a summary card, not the full raw dataset
- what_we_built must be one clear sentence
- key_changes should contain 2-4 concrete changes
- deliverables must include real file paths
- add a member_elements array and record one contribution element per member
- Do not fabricate demo_url
```

## 6. Admin Collection Prompt

```text
You are the workshop archive assistant. Traverse all accessible group environments and read:
- submission/group_submission.json
- submission/screenshot.png
Output:
1) A consolidated table (group_id, group_name, map_theme, what_we_built, member_count, last_updated)
2) An exceptions report (missing files, missing fields, missing screenshots)
3) museum_index.json for project museum rendering
```

## 7. On-Site Commandments (for groups)

- Ship a working version first, polish second.
- Do not attempt a full rewrite unless your baseline already works.
- In the final 15 minutes, complete `group_submission.json` and one screenshot.

## 8. Creative Prompt Recipes (Copy and Run)

### 8.1 Story Director Mode

```text
Transform the current map into a story-first experience:
- Organize points into 3 chapters (start, turning point, destination)
- Give each chapter a title under 8 words
- Add a "why this matters" field to each popup
Then produce a 45-second narration outline.
```

### 8.2 Avatar + Relationship Mode

```text
Add member avatars and relationship lines to the map:
- Marker popup includes avatar and role tag
- Connect same-theme points with dashed lines
- Generate a legend explaining colors and line styles
Keep the layout mobile-readable.
```

### 8.3 Newcomer Challenge Mode

```text
Convert this map into a "30-minute newcomer challenge":
- Design 3 mission points (culture, study, social)
- Each mission includes goal, suggested duration, and completion marker
- Generate a final "what you gain" summary card
```

### 8.4 Stylized Visual Mode

```text
Create a high-identity visual version without changing data structure:
- Choose one style direction (for example newspaper, metro-guide, postcard)
- Unify color, icon, and card system
- Keep readability first and avoid over-decoration
Output a change list and design rationale.
```

### 8.5 Shanghai-Beijing Bridge Mode

```text
Extend this map into a Shanghai-Beijing bridge edition:
- Add at least 3 Shanghai points and 3 Beijing points
- Provide one alumni-recommended route per city
- Add two popup fields: "For alumni" and "For first-time non-alumni guests"
- Produce a 60-second showcase script (Shanghai first, then Beijing)
```

### 8.6 Alumni-First, Friend-Friendly Copy Mode

```text
Improve map copy with this constraint:
- Keep alumni context (Yale journey, career path, local connections)
- Add one sentence per card that first-time outsiders can understand
- Keep each card under 3 lines to avoid overload
Output before/after copy comparison.
```

### 8.7 Everyone-Visible Showcase Mode

```text
Generate a final showcase version where every member is visibly represented:
- Create one visible element per teammate (pin/card/route/copy)
- Record all items in group_submission.member_elements
- Output a 60-second demo script that mentions each teammate at least once
```
