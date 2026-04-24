import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import sampleData from "../../alumni-journey-map/data/templates/sample.json" with { type: "json" };
import { getAvatarDisplayState } from "../utils/alumniAvatarSelection.mjs";

test("selected stop drives avatar image and map position", () => {
  const frank = sampleData.profiles.find((profile) => profile.id === "alumni-frank-ji-2020");

  assert.ok(frank, "expected Frank Ji profile in sample data");

  const idleState = getAvatarDisplayState({
    profile: frank,
    isSelected: false,
    selectedStopIndex: null,
    fallbackImageUrl: frank.photoUrl
  });

  assert.equal(idleState.imageUrl, "/avatars/frank-ji.jpg");
  assert.deepEqual(idleState.coordinates, { lat: 31.2304, lng: 121.4737 });

  const selectedState = getAvatarDisplayState({
    profile: frank,
    isSelected: true,
    selectedStopIndex: 0,
    fallbackImageUrl: frank.photoUrl
  });

  assert.equal(selectedState.imageUrl, "/avatars/stages/alumni-frank-ji-2020/step-1.jpg");
  assert.deepEqual(selectedState.coordinates, { lat: 39.9042, lng: 116.4074 });
});

test("final current-city card stays clickable in alumni drawer", async () => {
  const drawerSource = await readFile(new URL("../components/alumni/AlumniDrawer.vue", import.meta.url), "utf8");

  assert.match(
    drawerSource,
    /class="stop-card final-stop-card"[\s\S]*@click="focusStop\(selectedProfile\.stops\.length - 1\)"/,
    "expected final current-city card to be rendered as a clickable button"
  );
});
