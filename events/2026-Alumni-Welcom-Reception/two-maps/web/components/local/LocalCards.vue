<script setup lang="ts">
import { CATEGORY_COLORS, categoryVisuals } from "./LocalCategoryData";

const { filteredLocations, activeLocationId } = useLocalGuideState();
const { focusMarkerFromCard } = useLeafletMap();
</script>

<template>
  <div class="cards-scroll-area">
    <div v-if="filteredLocations.length" class="cards-grid">
      <article
        v-for="location in filteredLocations"
        :id="`card-${location.id}`"
        :key="location.id"
        class="location-card"
        :class="{ 'is-focused': activeLocationId === location.id }"
        tabindex="0"
        @click="focusMarkerFromCard(location.id)"
        @keydown.enter.prevent="focusMarkerFromCard(location.id)"
      >
        <div class="card-head">
          <span class="card-cat-dot" :style="{ background: CATEGORY_COLORS[location.category] }"></span>

          <div>
            <h3>{{ location.nameCn }}</h3>
            <p class="card-meta-line">{{ location.name }} · {{ categoryVisuals[location.category].label }}</p>
          </div>

          <span v-if="location.rating" class="card-rating">{{ location.rating.toFixed(1) }}</span>
        </div>

        <p class="card-desc">{{ location.descriptionCn }}</p>
        <p v-if="location.tipsCn.length" class="card-tip">{{ location.tipsCn[0] }}</p>
        <p class="card-address">{{ location.addressCn }}</p>
      </article>
    </div>

    <p v-else class="no-results">No locations found / 未找到符合条件的地点</p>
  </div>
</template>

<style scoped>
.cards-scroll-area {
  margin-top: 1rem;
  max-height: clamp(420px, 50vh, 600px);
  overflow-y: auto;
  border: 1px solid rgba(74, 85, 104, 0.25);
  padding: 0.75rem;
  scrollbar-width: thin;
  scrollbar-color: var(--twilight-slate) transparent;
}

.cards-scroll-area::-webkit-scrollbar {
  width: 6px;
}

.cards-scroll-area::-webkit-scrollbar-track {
  background: transparent;
}

.cards-scroll-area::-webkit-scrollbar-thumb {
  background: var(--twilight-slate);
  border-radius: 3px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.85rem;
}

.location-card {
  border: 1px solid rgba(74, 85, 104, 0.4);
  background: var(--dream-white);
  padding: 0.9rem;
  cursor: pointer;
  transition: transform 300ms, box-shadow 300ms, border-color 300ms;
}

.location-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(26, 31, 46, 0.14);
}

.location-card.is-focused,
.location-card.flash-focus {
  border-color: var(--magritte-sky);
  box-shadow: 0 0 0 2px rgba(123, 167, 188, 0.4);
}

.card-head {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
}

.card-cat-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-top: 5px;
  flex-shrink: 0;
}

.card-head h3 {
  font-family: var(--font-heading);
  font-size: 1.08rem;
  line-height: 1.15;
}

.card-meta-line {
  font-size: 0.78rem;
  color: var(--warm-stone);
  margin-top: 0.15rem;
}

.card-rating {
  margin-left: auto;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--streetlamp-amber);
}

.card-desc {
  margin-top: 0.6rem;
  font-size: 0.88rem;
  line-height: 1.45;
  color: var(--suit-charcoal);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tip {
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: var(--warm-stone);
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-address {
  margin-top: 0.35rem;
  font-size: 0.78rem;
  color: var(--twilight-slate);
}

.no-results {
  margin-top: 1rem;
  border: 1px dashed rgba(74, 85, 104, 0.45);
  padding: 1rem;
  color: var(--twilight-slate);
}

.location-card:focus-visible {
  outline: 2px solid var(--magritte-sky);
  outline-offset: 2px;
}

@media (max-width: 1023px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }

  .cards-scroll-area {
    max-height: 360px;
  }
}
</style>
