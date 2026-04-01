<script setup lang="ts">
import { CATEGORY_COLORS, categoryVisuals } from "./LocalCategoryData";

const { filteredLocations, activeCity, activeWalk, activeLocationId, selectedLocation, closeDetail, openLocationDetail } = useLocalGuideState();

const mapContainer = ref<HTMLElement | null>(null);
const { initMap, updateMarkers, updateWalkRoute, resetMap, cleanup } = useLeafletMap(mapContainer);

watch(filteredLocations, () => {
  if (activeLocationId.value && !filteredLocations.value.some((location) => location.id === activeLocationId.value)) {
    activeLocationId.value = null;
    selectedLocation.value = null;
  }

  updateMarkers();
});

watch(activeWalk, () => {
  updateWalkRoute();
});

watch(activeCity, () => {
  nextTick(() => {
    void initMap();
  });
});

const handleFocusCard = (event: Event) => {
  if (!(event instanceof CustomEvent) || typeof event.detail !== "string") {
    return;
  }

  openLocationDetail(event.detail);
};

onMounted(() => {
  void initMap();
  document.addEventListener("show-detail", handleFocusCard);
});

onBeforeUnmount(() => {
  document.removeEventListener("show-detail", handleFocusCard);
  cleanup();
});
</script>

<template>
  <div class="map-wrap">
    <div ref="mapContainer" class="leaflet-map"></div>
    <button class="reset-map-btn" @click="resetMap" aria-label="Reset map view">Reset view</button>

    <Transition name="detail-slide">
      <div v-if="selectedLocation" class="detail-panel" role="dialog" aria-label="Location details">
        <button class="detail-close" @click="closeDetail" aria-label="Close">
          <svg viewBox="0 0 24 24" width="18" height="18"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
        <div class="detail-cat-row">
          <span class="detail-cat-dot" :style="{ background: CATEGORY_COLORS[selectedLocation.category] }"></span>
          <span class="detail-cat-label">{{ categoryVisuals[selectedLocation.category].label }}</span>
          <span v-if="selectedLocation.rating" class="detail-rating">{{ selectedLocation.rating.toFixed(1) }}</span>
        </div>
        <h3 class="detail-title">{{ selectedLocation.nameCn }}</h3>
        <p class="detail-subtitle">{{ selectedLocation.name }}</p>
        <p class="detail-desc">{{ selectedLocation.descriptionCn }}</p>
        <p class="detail-desc-en">{{ selectedLocation.description }}</p>
        <ul v-if="selectedLocation.tipsCn.length" class="detail-tips">
          <li v-for="(tip, i) in selectedLocation.tipsCn" :key="i">{{ tip }}</li>
        </ul>
        <p class="detail-address">{{ selectedLocation.addressCn }}</p>
        <p class="detail-address-en">{{ selectedLocation.address }}</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.leaflet-map {
  height: clamp(380px, 55vw, 560px);
  width: 100%;
  border: 1px solid var(--twilight-slate);
}

.map-wrap {
  position: relative;
}

.reset-map-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1000;
  padding: 6px 14px;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(74, 85, 104, 0.92);
  color: var(--dream-white);
  border: 1px solid var(--magritte-sky);
  cursor: pointer;
  transition: background 200ms;
}

.reset-map-btn:hover {
  background: var(--twilight-slate);
}

.detail-panel {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1001;
  width: clamp(260px, 28%, 340px);
  max-height: calc(100% - 24px);
  overflow-y: auto;
  padding: 1rem 1.1rem 1.2rem;
  background: rgba(235, 232, 229, 0.96);
  border: 1px solid var(--magritte-sky);
  box-shadow: 0 8px 32px rgba(26, 31, 46, 0.3);
  scrollbar-width: thin;
  scrollbar-color: var(--twilight-slate) transparent;
}

.detail-close {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--twilight-slate);
  background: var(--dream-white);
  color: var(--twilight-slate);
  cursor: pointer;
  transition: background 200ms;
}

.detail-close:hover {
  background: var(--twilight-slate);
  color: #fff;
}

.detail-cat-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-cat-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.detail-cat-label {
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--twilight-slate);
}

.detail-rating {
  margin-left: auto;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--streetlamp-amber);
}

.detail-title {
  margin-top: 0.45rem;
  font-family: var(--font-heading);
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  line-height: 1.1;
}

.detail-subtitle {
  font-size: 0.88rem;
  color: var(--warm-stone);
  margin-top: 0.15rem;
}

.detail-desc {
  margin-top: 0.65rem;
  font-size: 0.92rem;
  line-height: 1.5;
  color: var(--suit-charcoal);
}

.detail-desc-en {
  margin-top: 0.3rem;
  font-size: 0.82rem;
  line-height: 1.45;
  color: var(--warm-stone);
}

.detail-tips {
  margin-top: 0.6rem;
  padding-left: 1.1rem;
  list-style: disc;
}

.detail-tips li {
  font-size: 0.84rem;
  line-height: 1.4;
  color: var(--suit-charcoal);
  margin-top: 0.2rem;
}

.detail-address {
  margin-top: 0.6rem;
  font-size: 0.8rem;
  color: var(--twilight-slate);
}

.detail-address-en {
  font-size: 0.76rem;
  color: var(--warm-stone);
  margin-top: 0.1rem;
}

.detail-slide-enter-active,
.detail-slide-leave-active {
  transition: transform 300ms cubic-bezier(0.2, 0.86, 0.25, 1), opacity 300ms ease;
}

.detail-slide-enter-from,
.detail-slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.detail-close:focus-visible,
.reset-map-btn:focus-visible {
  outline: 2px solid var(--magritte-sky);
  outline-offset: 2px;
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 2px;
  box-shadow: 0 8px 20px rgba(26, 31, 46, 0.25);
}

:deep(.leaflet-popup-tip) {
  background: #fff;
}

:deep(.leaflet-control-zoom a) {
  background: rgba(235, 232, 229, 0.95);
  color: var(--twilight-slate);
  border-color: rgba(74, 85, 104, 0.3);
}

:deep(.leaflet-control-zoom a:hover) {
  background: var(--dream-white);
  color: var(--surrealist-black);
}

:deep(.leaflet-control-attribution) {
  background: rgba(235, 232, 229, 0.8) !important;
  color: rgba(74, 85, 104, 0.6);
  font-size: 10px;
}

:deep(.leaflet-control-attribution a) {
  color: rgba(74, 85, 104, 0.8);
}

@media (max-width: 767px) {
  .leaflet-map {
    height: 340px;
  }

  .detail-panel {
    top: auto;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    max-height: 55%;
    border: none;
    border-top: 2px solid var(--magritte-sky);
  }

  .detail-slide-enter-from,
  .detail-slide-leave-to {
    transform: translateY(100%);
  }
}
</style>
