import assert from "node:assert/strict";
import { finalStoryStopIndex, resolveJourneyAvatarState } from "../lib/alumniJourneySelection.ts";

const profile = {
  id: "alumni-frank-ji-2020",
  name: "Frank Ji",
  classYear: 2020,
  currentCity: "Shanghai",
  currentRole: "Founder",
  photoUrl: "/avatars/originals/alumni-frank-ji-2020.png",
  stops: [
    { city: "Shanghai", coordinates: { lat: 31.2304, lng: 121.4737 } },
    { city: "New Haven", coordinates: { lat: 41.3083, lng: -72.9279 } },
    { city: "Shanghai", coordinates: { lat: 31.2304, lng: 121.4737 } }
  ]
};

const original = resolveJourneyAvatarState(profile, {
  selectedProfileId: null,
  selectedStoryStopIndex: null
});

assert.equal(original.lat, 31.2304);
assert.equal(original.lng, 121.4737);
assert.equal(original.photoUrl, "/avatars/originals/alumni-frank-ji-2020.png");

const staged = resolveJourneyAvatarState(profile, {
  selectedProfileId: "alumni-frank-ji-2020",
  selectedStoryStopIndex: 1
});

assert.equal(staged.lat, 41.3083);
assert.equal(staged.lng, -72.9279);
assert.equal(staged.photoUrl, "/avatars/stages/alumni-frank-ji-2020/step-2.png");

assert.equal(finalStoryStopIndex(profile), 2);
assert.equal(finalStoryStopIndex({ ...profile, stops: [] }), null);

console.log("alumni journey selection tests passed");
