import { computed, ref } from "vue";
import type { AlumniProfile, JourneyMapData, JourneyStop } from "@yalie/shared";
import sampleData from "../../alumni-journey-map/data/templates/sample.json";

const rawData = sampleData as JourneyMapData;

// ── Module-scope singleton refs ────────────────────────────────

/** All 6 sample alumni profiles */
const profiles = ref<AlumniProfile[]>(rawData.profiles);

/** Currently selected profile ID (click to view journey) */
const selectedProfileId = ref<string | null>(null);

/** Currently hovered profile ID (preview glow on map) */
const hoveredProfileId = ref<string | null>(null);

const selectedStoryStopIndex = ref<number | null>(null);

/** Constellation mode: 'explore' = browse journeys, 'build' = create your own */
const constellationMode = ref<"explore" | "build">("explore");

/** Builder mode stops (user-created journey) */
const builderStops = ref<JourneyStop[]>([]);

/** Builder mode: user's name input */
const builderName = ref("");

/** Builder mode: user's class year */
const builderClassYear = ref<number | null>(null);

// ── Computed ───────────────────────────────────────────────────

const selectedProfile = computed<AlumniProfile | null>(() => {
  if (!selectedProfileId.value) return null;
  return profiles.value.find((p) => p.id === selectedProfileId.value) ?? null;
});

const hoveredProfile = computed<AlumniProfile | null>(() => {
  if (!hoveredProfileId.value) return null;
  return profiles.value.find((p) => p.id === hoveredProfileId.value) ?? null;
});

/** Title and subtitle from the data file */
const mapTitle = computed(() => rawData.title);
const mapSubtitle = computed(() => rawData.subtitle);

// ── Actions ────────────────────────────────────────────────────

function selectProfile(profileId: string | null): void {
  if (constellationMode.value === "build") return;
  selectedProfileId.value = profileId;
  selectedStoryStopIndex.value = profileId ? 0 : null;
  hoveredProfileId.value = null;
}

function selectStoryStop(index: number | null): void {
  if (!selectedProfile.value) {
    selectedStoryStopIndex.value = null;
    return;
  }
  if (index === null) {
    selectedStoryStopIndex.value = null;
    return;
  }
  const maxIndex = selectedProfile.value.stops.length - 1;
  const clamped = Math.max(0, Math.min(index, maxIndex));
  selectedStoryStopIndex.value = clamped;
}

function hoverProfile(profileId: string | null): void {
  if (constellationMode.value === "build") return;
  if (selectedProfileId.value) return;
  hoveredProfileId.value = profileId;
}

function enterBuildMode(): void {
  selectedProfileId.value = null;
  selectedStoryStopIndex.value = null;
  hoveredProfileId.value = null;
  constellationMode.value = "build";
  builderStops.value = [];
  builderName.value = "";
  builderClassYear.value = null;
}

function exitBuildMode(): void {
  constellationMode.value = "explore";
  builderStops.value = [];
  builderName.value = "";
  builderClassYear.value = null;
}

function addBuilderStop(stop: JourneyStop): void {
  builderStops.value = [...builderStops.value, stop];
}

function removeBuilderStop(index: number): void {
  builderStops.value = builderStops.value.filter((_, i) => i !== index);
}

function reorderBuilderStops(fromIndex: number, toIndex: number): void {
  const stops = [...builderStops.value];
  const [moved] = stops.splice(fromIndex, 1);
  stops.splice(toIndex, 0, moved);
  builderStops.value = stops;
}

function clearSelection(): void {
  selectedProfileId.value = null;
  selectedStoryStopIndex.value = null;
  hoveredProfileId.value = null;
}

// ── Export ──────────────────────────────────────────────────────

export function useAlumniState() {
  return {
    // Data
    profiles,
    mapTitle,
    mapSubtitle,

    // Selection state
    selectedProfileId,
    hoveredProfileId,
    selectedStoryStopIndex,
    selectedProfile,
    hoveredProfile,
    constellationMode,

    // Builder state
    builderStops,
    builderName,
    builderClassYear,

    // Actions
    selectProfile,
    hoverProfile,
    selectStoryStop,
    enterBuildMode,
    exitBuildMode,
    addBuilderStop,
    removeBuilderStop,
    reorderBuilderStops,
    clearSelection
  };
}
