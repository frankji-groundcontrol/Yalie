<script setup lang="ts">
const {
  constellationMode,
  builderStops,
  builderName,
  builderClassYear,
  removeBuilderStop,
  reorderBuilderStops,
  exitBuildMode
} = useAlumniState();

const isOpen = computed(() => constellationMode.value === "build");
const celebrate = ref(false);
const dragIndex = ref<number | null>(null);

function startDrag(index: number): void {
  dragIndex.value = index;
}

function onDrop(index: number): void {
  if (dragIndex.value === null || dragIndex.value === index) {
    dragIndex.value = null;
    return;
  }
  reorderBuilderStops(dragIndex.value, index);
  dragIndex.value = null;
}

function completeConstellation(): void {
  celebrate.value = true;
  window.setTimeout(() => {
    celebrate.value = false;
  }, 1200);
}
</script>

<template>
  <aside class="builder" :class="{ 'is-open': isOpen, 'is-celebrating': celebrate }" :aria-hidden="!isOpen">
    <header class="builder-head">
      <button type="button" class="back" aria-label="Exit builder mode" @click="exitBuildMode">
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <h3>Map Your Journey</h3>
    </header>

    <div class="builder-content">
      <label>
        Name
        <input v-model="builderName" type="text" placeholder="Your name" />
      </label>

      <label>
        Class year
        <input v-model.number="builderClassYear" type="number" inputmode="numeric" placeholder="2026" />
      </label>

      <p class="instruction">Click the map to add stops along your journey</p>

      <ul class="stop-list">
        <li
          v-for="(stop, index) in builderStops"
          :key="`${stop.city}-${index}`"
          class="stop-item"
          draggable="true"
          @dragstart="startDrag(index)"
          @dragover.prevent
          @drop.prevent="onDrop(index)"
        >
          <span class="order">{{ index + 1 }}</span>
          <div class="stop-meta">
            <p class="city">{{ stop.city }}</p>
            <input v-model="stop.story" type="text" placeholder="Write a short moment from this stop" />
          </div>
          <button type="button" class="remove" aria-label="Remove stop" @click="removeBuilderStop(index)">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>
        </li>
      </ul>

      <button type="button" class="done" :disabled="builderStops.length === 0" @click="completeConstellation">Done</button>
    </div>
  </aside>
</template>

<style scoped>
.builder {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: clamp(280px, 25vw, 380px);
  z-index: 995;
  transform: translateX(-100%);
  transition: transform 200ms ease-in;
  pointer-events: none;
  border-right: 1px solid rgba(155, 104, 69, 0.42);
  background: rgba(235, 232, 229, 0.97);
  backdrop-filter: blur(12px);
  box-shadow: 18px 0 34px rgba(26, 20, 16, 0.18);
}

.builder.is-open {
  transform: translateX(0);
  transition: transform 300ms ease-out;
  pointer-events: auto;
}

.builder-head {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.95rem 0.9rem;
  border-bottom: 1px solid rgba(155, 104, 69, 0.35);
}

.builder-head h3 {
  font-family: var(--font-heading);
  font-size: 1.65rem;
  line-height: 1;
}

.back, .remove {
  width: 30px;
  height: 30px;
  border: 1px solid rgba(155, 104, 69, 0.45);
  background: transparent;
  color: var(--surrealist-black);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.builder-content {
  height: calc(100% - 62px);
  overflow-y: auto;
  padding: 0.9rem;
  display: grid;
  gap: 0.7rem;
}

label {
  display: grid;
  gap: 0.35rem;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(26, 20, 16, 0.76);
}

input {
  width: 100%;
  border: 1px solid rgba(155, 104, 69, 0.45);
  padding: 0.48rem 0.55rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  background: rgba(235, 232, 229, 0.94);
}

.instruction {
  font-size: 0.86rem;
  line-height: 1.4;
  color: var(--dali-brown);
}

.stop-list {
  list-style: none;
  display: grid;
  gap: 0.5rem;
}

.stop-item {
  display: grid;
  grid-template-columns: 1.7rem minmax(0, 1fr) 2rem;
  gap: 0.45rem;
  align-items: start;
  padding: 0.55rem;
  border: 1px solid rgba(155, 104, 69, 0.4);
  background: rgba(235, 232, 229, 0.9);
}

.order {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  background: var(--port-lligat);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.78rem;
  font-weight: 700;
}

.city {
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
}

.done {
  padding: 0.55rem 0.65rem;
  border: 1px solid rgba(155, 104, 69, 0.5);
  background: rgba(225, 182, 98, 0.42);
  color: var(--surrealist-black);
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 200ms ease;
}

.done:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.done:not(:disabled):hover {
  background: rgba(225, 160, 48, 0.55);
}

.builder.is-celebrating {
  box-shadow: 18px 0 40px rgba(225, 182, 98, 0.48);
}

@media (max-width: 767px) {
  .builder {
    top: auto;
    bottom: 0;
    width: 100%;
    height: auto;
    max-height: 50vh;
    border-right: 0;
    border-top: 1px solid rgba(155, 104, 69, 0.42);
    transform: translateY(100%);
    box-shadow: 0 -16px 34px rgba(26, 20, 16, 0.18);
  }

  .builder.is-open {
    transform: translateY(0);
  }

  .builder-content {
    height: auto;
    max-height: calc(50vh - 62px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .builder,
  .builder.is-open,
  .done {
    transition: none;
  }
}
</style>
