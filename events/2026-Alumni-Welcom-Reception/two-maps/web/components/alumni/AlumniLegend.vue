<script setup lang="ts">
import { BUILDER_STAR_COLOR, EVENT_STAR_COLOR, ORIGIN_STAR_COLOR, STAR_COLORS } from "./AlumniStarData";

const { profiles, selectedProfileId, selectProfile, constellationMode } = useAlumniState();

function openProfile(profileId: string): void {
  if (constellationMode.value === "build") return;
  if (selectedProfileId.value === profileId) {
    selectProfile(null);
    return;
  }
  selectProfile(profileId);
}
const hintVisible = ref(false);
const hintStorageKey = "yalie-alumni-legend-hint-dismissed";

function dismissHint(): void {
  hintVisible.value = false;
  window.localStorage.setItem(hintStorageKey, "1");
}

onMounted(() => {
  hintVisible.value = window.localStorage.getItem(hintStorageKey) !== "1";
});
</script>

<template>
  <aside class="legend" aria-label="Map legend">
    <h3>Alumni Journeys</h3>
    <ul>
      <li><span class="dot" :style="{ '--dot': ORIGIN_STAR_COLOR }"></span>Origin: Yale · New Haven</li>
      <li><span class="dot" :style="{ '--dot': EVENT_STAR_COLOR }"></span>Reunion: Shanghai 2026</li>
      <li v-for="(profile, index) in profiles" :key="profile.id">
        <span class="dot small" :style="{ '--dot': STAR_COLORS[index] ?? STAR_COLORS[0] }"></span>{{ profile.name }}
      </li>
      <li><span class="dot pulse" :style="{ '--dot': BUILDER_STAR_COLOR }"></span>Add Your Journey</li>
    </ul>

    <div v-if="hintVisible" class="hint">
      <p>Click a star to explore an alumni's journey</p>
      <button type="button" @click="dismissHint">Got it</button>
    </div>
  </aside>
</template>

<style scoped>
.legend {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 920;
  width: min(320px, calc(100% - 2rem));
  padding: 0.9rem;
  border: 1px solid rgba(155, 104, 69, 0.5);
  background: rgba(235, 232, 229, 0.88);
  backdrop-filter: blur(10px);
  color: var(--surrealist-black);
}

h3 {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  line-height: 1;
}

ul {
  margin-top: 0.55rem;
  list-style: none;
  display: grid;
  gap: 0.35rem;
  font-size: 0.8rem;
}

li {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--dot);
  box-shadow: 0 0 6px var(--dot);
  flex-shrink: 0;
}

.dot.small {
  width: 8px;
  height: 8px;
}

.dot.pulse {
  animation: legendPulse 1.8s ease-in-out infinite;
}

.hint {
  margin-top: 0.65rem;
  padding: 0.6rem;
  border: 1px solid rgba(155, 104, 69, 0.38);
  background: rgba(235, 232, 229, 0.9);
  display: grid;
  gap: 0.45rem;
}

.hint p {
  font-size: 0.78rem;
  line-height: 1.45;
}

.hint button {
  justify-self: start;
  padding: 0.3rem 0.55rem;
  border: 1px solid rgba(155, 104, 69, 0.45);
  background: transparent;
  color: var(--surrealist-black);
  font-size: 0.74rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 200ms ease;
}

.hint button:hover {
  background: rgba(225, 182, 98, 0.3);
}

@keyframes legendPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.25);
    opacity: 0.72;
  }
}

@media (max-width: 767px) {
  .legend {
    top: 0.7rem;
    left: 0.7rem;
    width: calc(100% - 1.4rem);
    padding: 0.7rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dot.pulse {
    animation: none;
  }
}
</style>
