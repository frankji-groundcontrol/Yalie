<script setup lang="ts">
import { CATEGORY_ORDER, categoryVisuals } from "./LocalCategoryData";

const { searchQuery, activeCategory, setCategory, data, categoryCounts } = useLocalGuideState();
</script>

<template>
  <div class="controls-bar">
    <input
      v-model="searchQuery"
      type="search"
      class="search-input"
      placeholder="Search locations..."
      aria-label="Search locations"
    />

    <div class="filter-pills" role="group" aria-label="Filter by category">
      <button class="filter-pill" :class="{ 'is-active': activeCategory === null }" @click="setCategory(null)">
        All <small>{{ data.locations.length }}</small>
      </button>
      <button
        v-for="category in CATEGORY_ORDER"
        :key="category"
        class="filter-pill"
        :class="{ 'is-active': activeCategory === category }"
        @click="setCategory(category)"
      >
        {{ categoryVisuals[category].label }} <small>{{ categoryCounts[category] }}</small>
      </button>
    </div>
  </div>
</template>

<style scoped>
.controls-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: flex-start;
  margin-top: 1.2rem;
}

.search-input {
  flex: 0 0 100%;
  padding: 0.6rem 0.9rem;
  font-size: 0.92rem;
  font-family: var(--font-body);
  border: 1px solid var(--twilight-slate);
  background: var(--dream-white);
  color: var(--surrealist-black);
}

.search-input:focus {
  outline: 2px solid var(--magritte-sky);
  outline-offset: 1px;
}

.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.filter-pill {
  padding: 0.38rem 0.72rem;
  font-size: 0.82rem;
  font-family: var(--font-body);
  border: 1px solid var(--twilight-slate);
  background: transparent;
  color: var(--twilight-slate);
  cursor: pointer;
  transition: all 200ms;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.filter-pill small {
  font-size: 0.72rem;
  opacity: 0.7;
}

.filter-pill.is-active {
  background: var(--twilight-slate);
  color: #fff;
}

.filter-pill:hover:not(.is-active) {
  background: rgba(74, 85, 104, 0.1);
}

.filter-pill:focus-visible {
  outline: 2px solid var(--magritte-sky);
}

@media (max-width: 767px) {
  .search-input {
    font-size: 16px;
  }
}
</style>
