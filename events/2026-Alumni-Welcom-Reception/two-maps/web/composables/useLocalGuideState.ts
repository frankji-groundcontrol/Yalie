import { computed, ref } from "vue";
import type { ArtWalk, GuideCategory, GuideLocation, LocalGuideMapData } from "@yalie/shared";
import newHavenData from "../../local-guide-map/data/templates/new-haven-sample.json";
import shanghaiData from "../../local-guide-map/data/templates/shanghai-sample.json";

const newHavenRaw = newHavenData as LocalGuideMapData;
const shanghaiRaw = shanghaiData as LocalGuideMapData;

const activeCity = ref<"new-haven" | "shanghai">("new-haven");
const activeCategory = ref<GuideCategory | null>(null);
const searchQuery = ref("");
const activeLocationId = ref<string | null>(null);
const selectedLocation = ref<GuideLocation | null>(null);
const activeWalkId = ref<string | null>(null);

const data = computed<LocalGuideMapData>(() => (activeCity.value === "new-haven" ? newHavenRaw : shanghaiRaw));

const filteredLocations = computed<GuideLocation[]>(() => {
  const keyword = searchQuery.value.trim().toLowerCase();

  return data.value.locations.filter((location) => {
    const matchesCategory = activeCategory.value ? location.category === activeCategory.value : true;
    const matchesSearch = keyword
      ? `${location.name} ${location.nameCn}`.toLowerCase().includes(keyword)
      : true;

    return matchesCategory && matchesSearch;
  });
});

const categoryCounts = computed<Record<GuideCategory, number>>(() => {
  const counts: Record<GuideCategory, number> = {
    food: 0,
    culture: 0,
    art: 0,
    nature: 0,
    practical: 0,
    nightlife: 0
  };

  for (const location of data.value.locations) {
    counts[location.category] += 1;
  }

  return counts;
});

const activeWalk = computed<ArtWalk | null>(() => {
  if (!activeWalkId.value) {
    return null;
  }

  return data.value.walks.find((walk) => walk.id === activeWalkId.value) ?? null;
});

function switchCity(city: "new-haven" | "shanghai"): void {
  if (activeCity.value === city) {
    return;
  }

  activeCity.value = city;
  activeCategory.value = null;
  searchQuery.value = "";
  activeLocationId.value = null;
  activeWalkId.value = null;
  selectedLocation.value = null;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setCategory(category: GuideCategory | null): void {
  activeCategory.value = category;
  activeLocationId.value = null;
  selectedLocation.value = null;
}

function openLocationDetail(locationId: string): void {
  const location = data.value.locations.find((loc) => loc.id === locationId);
  if (!location) {
    return;
  }

  activeLocationId.value = locationId;
  selectedLocation.value = location;
}

function closeDetail(): void {
  selectedLocation.value = null;
}

export function useLocalGuideState() {
  return {
    activeCity,
    activeCategory,
    searchQuery,
    activeLocationId,
    selectedLocation,
    activeWalkId,
    data,
    filteredLocations,
    categoryCounts,
    activeWalk,
    switchCity,
    setCategory,
    openLocationDetail,
    closeDetail
  };
}
