# Two Maps Participant Guide (On-Site)

## 1. What We Are Building

You will collaborate in small groups to create a lightweight AI + map output using one of two templates:

- Illuminated Journey Map: a life-path map from hometown to Yale (New Haven) to the present city.
- Local Guide Map: a city-first map for "our cities" (New Haven, Beijing, Shanghai) and their practical/cultural resources.

The goal is not complex engineering. The goal is a clear, presentable, archivable outcome.

Audience composition is alumni-first, with a small number of trusted non-alumni friends. Make your output meaningful for alumni while still understandable for first-time outsiders.

## 2. What We Expect from You

1. Align on theme and role split in your group (story, points, visual, submission).
2. Modify an existing template or create one simple variant.
3. Deliver visible outputs: map + screenshot + summary card.
4. Include at least one Shanghai or Beijing element (place, route, persona, or city comparison).

No GitHub account is required. No full-stack coding background is required.

## 2.1 Creative Menu (Go Beyond the Baseline)

Finish baseline deliverables first, then pick 1-2 creative tracks:

### A. Storytelling Tracks

- Timeline mode: show past-present-future for one person or place.
- Contrast mode: compare two paths (for example, research vs startup).
- Themed route: add a "If you only have 2 hours" path.
- Dual-city relay: present one theme in paired Shanghai and Beijing views.

### B. Visual Tracks

- Avatar cards: marker popups with avatar, tags, and one-line story.
- Mood palette: layer colors by theme (calm exploration, social energy, night culture).
- Legend redesign: simplify the legend for first-time viewers.

### C. Interaction Tracks

- Quiz mode: embed 3 "Which route would you choose?" prompts.
- Role switch: one map, two views (incoming student vs alumni).
- Checkpoint tasks: define 3 executable mini-missions on the map.
- Yale-friends mode: add guidance so non-alumni attendees can participate without context gaps.

### D. Advanced Tracks (Optional)

- Convert static points into a sequenced story route.
- Add a "member contribution layer" by teammate.
- Prepare a 30-60 second narration script for final demo.

## 3. Workshop Flow (Recommended)

### Phase 0: Grouping and Role Mix (before start)

- Organizers will balance groups by technical confidence so each team includes both technical and non-technical members.
- Suggested minimum roles per team: builder, storyteller, city curator, presenter.
- The objective is visible contribution from every person, not one or two people doing everything.

### Phase A: Understand Template (15 min)

- Open your assigned group environment.
- Review sample map and choose a map type (Journey or Local Guide).
- Ask AI assistant for the minimum edit path.

### Phase B: Build and Edit (60-90 min)

- Add or refine points and copy.
- Add member avatars or story cards.
- Implement at least one item from the creative menu.
- Reach a demo-ready map state.

### Phase C: Finalize Submission (last 15 min)

- Complete `submission/group_submission.json`.
- Save one final screenshot to `submission/screenshot.png`.
- Record each member's contribution element in the summary card.
- Confirm required fields with your facilitator.

## 4. Final Outputs

Each group submits three items:

1. Summary card: `submission/group_submission.json`
2. Screenshot: `submission/screenshot.png`
3. Data file(s): place in `submission/` (group-defined names)

Recommended additions in your summary:

- 1 alumni-facing insight
- 1 non-alumni-friendly onboarding tip
- 1 Beijing or Shanghai connection point

After the session, the admin will batch collect all outputs and publish the project museum.

## 5. Example group_submission

```json
{
  "group_id": "g07",
  "group_name": "Map Makers",
  "map_theme": "local_guide",
  "what_we_built": "We added 8 local points with avatar popups.",
  "key_changes": [
    "Added art and study locations",
    "Improved readability of popup copy",
    "Applied theme-based color layers"
  ],
  "deliverables": {
    "data_files": ["submission/points-final.json"],
    "screenshots": ["submission/screenshot.png"],
    "demo_url": ""
  },
  "member_elements": [
    {"member": "A", "element": "Added two Beijing points and copy"},
    {"member": "B", "element": "Built avatar card style and legend"},
    {"member": "C", "element": "Prepared 60-second demo script"}
  ],
  "team": ["A", "B", "C"],
  "next_step": "Add automatic route recommendations"
}
```

## 6. Quick Success Criteria

- Your map opens and tells one clear story.
- Your changes are understandable and reusable by others.
- Your summary card and screenshot are complete.
- Your final demo visibly represents each team member.

## 7. Suggested Showcase Rubric

- Completion (40%): baseline deliverables finished on time.
- Clarity (30%): story and structure are easy to understand.
- Creativity (30%): the group implemented memorable creative choices.
