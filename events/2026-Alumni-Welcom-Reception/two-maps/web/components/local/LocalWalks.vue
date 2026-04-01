<script setup lang="ts">
const { data, activeWalkId, activeWalk } = useLocalGuideState();
</script>

<template>
  <div v-if="data.walks.length" class="walks-bar">
    <span class="walks-bar-label">Walking Routes</span>
    <div class="walk-tabs" role="tablist">
      <button
        v-for="walk in data.walks"
        :key="walk.id"
        role="tab"
        class="walk-tab"
        :class="{ 'is-active': activeWalkId === walk.id }"
        :aria-selected="activeWalkId === walk.id"
        @click="activeWalkId = activeWalkId === walk.id ? null : walk.id"
      >
        {{ walk.nameCn }}
        <small>{{ walk.distanceKm }}km · {{ Math.round(walk.durationMinutes / 60) }}h</small>
      </button>
    </div>
    <p v-if="activeWalk" class="walk-desc">{{ activeWalk.descriptionCn }} / {{ activeWalk.description }}</p>
  </div>
</template>

<style scoped>
.walks-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.75rem;
  padding: 0.65rem 0.9rem;
  border: 1px solid rgba(74, 85, 104, 0.35);
  background: rgba(74, 85, 104, 0.06);
}

.walks-bar-label {
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--twilight-slate);
  white-space: nowrap;
}

.walk-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.walk-tab {
  padding: 0.35rem 0.75rem;
  font-size: 0.82rem;
  border: 1px solid var(--twilight-slate);
  background: transparent;
  color: var(--twilight-slate);
  cursor: pointer;
  transition: all 200ms;
  display: grid;
  text-align: left;
}

.walk-tab small {
  font-size: 0.72rem;
  opacity: 0.65;
  margin-top: 0.1rem;
}

.walk-tab.is-active {
  background: var(--twilight-slate);
  color: #fff;
}

.walk-desc {
  flex-basis: 100%;
  margin-top: 0.25rem;
  font-size: 0.88rem;
  line-height: 1.45;
  color: var(--suit-charcoal);
}

.walk-tab:focus-visible {
  outline: 2px solid var(--magritte-sky);
  outline-offset: 2px;
}
</style>
