<script setup lang="ts">
import { profileStageAvatar } from "./AlumniStageAvatars";
import { finalStoryStopIndex } from "../../lib/alumniJourneySelection";

const { selectedProfile, selectedStoryStopIndex, clearSelection, selectStoryStop } = useAlumniState();

const isOpen = computed(() => selectedProfile.value !== null);
const stops = computed(() => selectedProfile.value?.stops ?? []);
const activeStopIndex = computed(() => selectedStoryStopIndex.value ?? 0);
const activeStop = computed(() => stops.value[activeStopIndex.value] ?? null);
const activeStage = computed(() => {
  if (!selectedProfile.value) return profileStageAvatar("", 0);
  return profileStageAvatar(selectedProfile.value.id, activeStopIndex.value);
});
const finalStopIndex = computed(() => (selectedProfile.value ? finalStoryStopIndex(selectedProfile.value) : null));
const hasMultipleStops = computed(() => stops.value.length > 1);

function focusStop(index: number): void {
  selectStoryStop(index);
}

function onKeydown(event: KeyboardEvent): void {
  if (!isOpen.value) return;
  if (event.key === "Escape") {
    clearSelection();
    return;
  }
  if (!hasMultipleStops.value) return;
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    focusStop(activeStopIndex.value - 1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    focusStop(activeStopIndex.value + 1);
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <aside class="drawer" :class="{ 'is-open': isOpen }" :aria-hidden="!isOpen" aria-modal="true" role="dialog" aria-label="Journey details">
    <button type="button" class="close-btn" aria-label="Close journey" @click="clearSelection">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>

    <div v-if="selectedProfile" class="drawer-content">
      <header class="profile-head">
        <Transition name="stage-avatar" mode="out-in">
          <img
            :key="`${selectedProfile.id}-avatar-${activeStopIndex}`"
            :src="activeStage.imageUrl"
            :alt="`${selectedProfile.name} – ${activeStage.label}`"
            class="stage-avatar-img"
          />
        </Transition>
        <p class="stage-label">{{ activeStage.label }}</p>
        <h2>
          {{ selectedProfile.name }}
          <small v-if="selectedProfile.nameCn">{{ selectedProfile.nameCn }}</small>
        </h2>
        <p class="meta">{{ selectedProfile.classYear }} · {{ selectedProfile.program }}</p>
        <p class="role">{{ selectedProfile.currentRole }}</p>
      </header>

      <hr />

      <div v-if="hasMultipleStops" class="story-nav">
        <button class="nav-btn" type="button" :disabled="activeStopIndex <= 0" @click="focusStop(activeStopIndex - 1)">
          <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><path d="M12 4l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          Prev
        </button>
        <span class="nav-counter">{{ activeStopIndex + 1 }} / {{ stops.length }}</span>
        <button class="nav-btn" type="button" :disabled="activeStopIndex >= stops.length - 1" @click="focusStop(activeStopIndex + 1)">
          Next
          <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><path d="M8 4l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </button>
      </div>

      <Transition name="spotlight" mode="out-in">
        <article v-if="activeStop" :key="`${selectedProfile.id}-spotlight-${activeStopIndex}`" class="spotlight">
          <h3 class="spotlight-title">{{ activeStop.title }}</h3>
          <p class="spotlight-meta">{{ activeStop.city }} · {{ activeStop.year }}{{ activeStop.endYear ? "–" + activeStop.endYear : "" }}</p>
          <p class="spotlight-story">{{ activeStop.story }}</p>
        </article>
      </Transition>

      <ol class="timeline">
        <li
          v-for="(stop, index) in selectedProfile.stops"
          :key="`${selectedProfile.id}-${stop.city}-${index}`"
          class="timeline-item"
          :class="{ 'is-active': index === activeStopIndex }"
        >
          <button type="button" class="dot" :class="{ 'dot-active': index === activeStopIndex }" @click="focusStop(index)">{{ index + 1 }}</button>
          <button type="button" class="stop-card" :class="{ 'stop-card-active': index === activeStopIndex }" @click="focusStop(index)">
            <h3>{{ stop.title }}</h3>
            <p class="years">{{ stop.year }}{{ stop.endYear ? "–" + stop.endYear : "" }}</p>
          </button>
        </li>
        <li class="timeline-item final" :class="{ 'is-active': finalStopIndex !== null && activeStopIndex === finalStopIndex }">
          <button
            type="button"
            class="dot"
            :class="{ 'dot-active': finalStopIndex !== null && activeStopIndex === finalStopIndex }"
            @click="finalStopIndex !== null ? focusStop(finalStopIndex) : undefined"
          >
            {{ selectedProfile.stops.length + 1 }}
          </button>
          <button
            type="button"
            class="stop-card"
            :class="{ 'stop-card-active': finalStopIndex !== null && activeStopIndex === finalStopIndex }"
            @click="finalStopIndex !== null ? focusStop(finalStopIndex) : undefined"
          >
            <h3>Now in {{ selectedProfile.currentCity }}</h3>
            <p class="years">{{ selectedProfile.currentRole }}</p>
          </button>
        </li>
      </ol>
    </div>
  </aside>
</template>

<style scoped>
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: clamp(320px, 30vw, 420px);
  z-index: 1000;
  background: rgba(235, 232, 229, 0.97);
  backdrop-filter: blur(12px);
  border-left: 1px solid rgba(155, 104, 69, 0.45);
  box-shadow: -20px 0 34px rgba(26, 20, 16, 0.2);
  transform: translateX(100%);
  transition: transform 200ms ease-in;
  pointer-events: none;
}

.drawer.is-open {
  transform: translateX(0);
  transition: transform 300ms ease-out;
  pointer-events: auto;
}

.close-btn {
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  width: 32px;
  height: 32px;
  border: 1px solid rgba(155, 104, 69, 0.5);
  background: rgba(235, 232, 229, 0.9);
  color: var(--surrealist-black);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 200ms ease;
}

.close-btn:hover { background: var(--dream-white); }
.close-btn:focus-visible { outline: 2px solid var(--port-lligat); outline-offset: 2px; }

.drawer-content {
  height: 100%;
  overflow-y: auto;
  padding: 1.2rem 1rem calc(1.25rem + env(safe-area-inset-bottom, 1.5rem));
}

.stage-avatar-img {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  object-fit: cover;
  border: 2px solid rgba(225, 182, 98, 0.7);
  box-shadow: 0 4px 18px rgba(155, 104, 69, 0.2);
  margin-bottom: 0.45rem;
}

.stage-label {
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--catalan-sunset, #d35400);
  font-weight: 700;
  margin-bottom: 0.15rem;
}

.profile-head h2 {
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  line-height: 0.95;
  max-width: 15ch;
}

.profile-head small {
  display: block;
  margin-top: 0.2rem;
  font-family: var(--font-body);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--twilight-slate);
}

.meta { margin-top: 0.5rem; color: var(--dali-brown); }
.role { margin-top: 0.4rem; color: rgba(26, 20, 16, 0.9); }
hr { margin: 1rem 0; border: 0; border-top: 1px solid rgba(155, 104, 69, 0.38); }

.story-nav {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border: 1px solid rgba(155, 104, 69, 0.3);
  border-radius: 999px;
  background: rgba(235, 232, 229, 0.9);
  color: var(--surrealist-black);
  font-size: 0.72rem;
  padding: 0.28rem 0.55rem;
  cursor: pointer;
  transition: transform 160ms ease, background 160ms ease;
}

.nav-btn:hover:not(:disabled) { transform: translateY(-1px); background: rgba(225, 182, 98, 0.18); }
.nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.nav-counter { text-align: center; font-size: 0.72rem; color: var(--dali-brown); letter-spacing: 0.06em; }

.spotlight {
  padding: 0.8rem;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(225, 182, 98, 0.14), rgba(150, 178, 223, 0.12));
  border: 1px solid rgba(150, 178, 223, 0.25);
  margin-bottom: 0.85rem;
}

.spotlight-title { font-family: var(--font-heading); font-size: 1.05rem; line-height: 1.1; }
.spotlight-meta { margin-top: 0.18rem; font-size: 0.76rem; color: var(--dali-brown); letter-spacing: 0.04em; }
.spotlight-story { margin-top: 0.35rem; font-size: 0.88rem; line-height: 1.5; color: rgba(26, 20, 16, 0.88); }

.timeline { list-style: none; display: grid; gap: 0.6rem; }

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 2rem minmax(0, 1fr);
  gap: 0.7rem;
}

.timeline-item::before {
  content: "";
  position: absolute;
  left: 0.96rem;
  top: 2rem;
  bottom: -0.7rem;
  width: 1px;
  background: rgba(155, 104, 69, 0.45);
}

.timeline-item.final::before { display: none; }

.dot {
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 50%;
  border: 1px solid rgba(155, 104, 69, 0.45);
  background: var(--catalan-gold);
  color: var(--surrealist-black);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.84rem;
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.dot-active { transform: scale(1.15); box-shadow: 0 0 0 3px rgba(150, 178, 223, 0.35); }

.stop-card {
  padding: 0.6rem 0.75rem;
  border: 1px solid rgba(155, 104, 69, 0.38);
  background: rgba(235, 232, 229, 0.88);
  text-align: left;
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease;
}

.stop-card-active { transform: translateX(3px); border-color: rgba(150, 178, 223, 0.5); }
.stop-card h3 { font-family: var(--font-heading); font-size: 1.1rem; line-height: 1.02; }
.years { margin-top: 0.15rem; font-size: 0.76rem; color: var(--dali-brown); letter-spacing: 0.05em; }

.stage-avatar-enter-active,
.stage-avatar-leave-active,
.spotlight-enter-active,
.spotlight-leave-active {
  transition: opacity 240ms ease, transform 240ms ease;
}

.stage-avatar-enter-from,
.stage-avatar-leave-to,
.spotlight-enter-from,
.spotlight-leave-to {
  opacity: 0;
  transform: translateY(5px) scale(0.97);
}

@media (max-width: 767px) {
  .drawer {
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: auto;
    max-height: 60vh;
    border-left: 0;
    border-top: 1px solid rgba(155, 104, 69, 0.45);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    transform: translateY(100%);
  }

  .drawer.is-open {
    transform: translateY(0);
  }

  .drawer-content {
    padding-bottom: calc(3rem + env(safe-area-inset-bottom, 1.5rem));
  }
}

@media (prefers-reduced-motion: reduce) {
  .drawer,
  .drawer.is-open,
  .stage-avatar-enter-active,
  .stage-avatar-leave-active,
  .spotlight-enter-active,
  .spotlight-leave-active {
    transition: none;
  }
}
</style>
