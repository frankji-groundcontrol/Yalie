<script setup lang="ts">
import type { GuideCategory } from "@yalie/shared";
import MapModeToggle from "../shared/MapModeToggle.vue";
import { categoryVisuals } from "./LocalCategoryData";

const { activeCity, data, switchCity } = useLocalGuideState();

const floatingOrder: GuideCategory[] = ["culture", "food", "nature", "art", "practical", "nightlife"];

const floatingPlacement: Record<GuideCategory, { left: string; top: string; delay: string }> = {
  culture: { left: "72%", top: "16%", delay: "0.2s" },
  food: { left: "84%", top: "28%", delay: "0.8s" },
  nature: { left: "68%", top: "36%", delay: "1.2s" },
  art: { left: "89%", top: "47%", delay: "1.7s" },
  practical: { left: "78%", top: "54%", delay: "2.1s" },
  nightlife: { left: "90%", top: "62%", delay: "2.5s" }
};
</script>

<template>
  <header class="hero">
    <div class="city-toggle" role="group" aria-label="Switch local guide city">
      <button
        type="button"
        class="city-toggle-button"
        :class="{ 'is-active': activeCity === 'new-haven' }"
        :aria-pressed="activeCity === 'new-haven'"
        @click="switchCity('new-haven')"
      >
        <span>New Haven</span>
        <small>纽黑文</small>
      </button>
      <button
        type="button"
        class="city-toggle-button"
        :class="{ 'is-active': activeCity === 'shanghai' }"
        :aria-pressed="activeCity === 'shanghai'"
        @click="switchCity('shanghai')"
      >
        <span>Shanghai</span>
        <small>上海</small>
      </button>
      <button
        type="button"
        class="city-toggle-button"
        :class="{ 'is-active': activeCity === 'beijing' }"
        :aria-pressed="activeCity === 'beijing'"
        @click="switchCity('beijing')"
      >
        <span>Beijing</span>
        <small>北京</small>
      </button>
    </div>

    <div class="hero-copy">
      <p class="hero-kicker">Local Guide Map</p>
      <h1>
        {{ data.titleCn }}
        <span>{{ data.title }}</span>
      </h1>
      <p class="hero-subtitle">{{ data.subtitleCn }} / {{ data.subtitle }}</p>
      <MapModeToggle active-view="local" theme="local" />
    </div>

    <ul class="floating-objects" aria-hidden="true">
      <li
        v-for="category in floatingOrder"
        :key="`float-${category}`"
        class="floating-object"
        :style="{
          left: floatingPlacement[category].left,
          top: floatingPlacement[category].top,
          '--float-delay': floatingPlacement[category].delay,
          '--float-duration': categoryVisuals[category].floatDuration,
          color: categoryVisuals[category].color
        }"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            v-for="segment in categoryVisuals[category].icon"
            :key="segment.d"
            :d="segment.d"
            :fill="segment.fill ?? 'none'"
            :stroke="segment.stroke ?? 'currentColor'"
            :stroke-width="segment.strokeWidth ?? 1.8"
            :stroke-linecap="segment.strokeLinecap ?? 'round'"
            :stroke-linejoin="segment.strokeLinejoin ?? 'round'"
          />
        </svg>
      </li>
    </ul>

    <div class="skyline-stage" aria-hidden="true">
      <div class="skyline-silhouette">
        <div class="skyline-clouds"></div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  padding: 5rem clamp(1rem, 5vw, 4.5rem) 16rem;
  overflow: hidden;
  background: linear-gradient(180deg, #f0ede8 0%, var(--magritte-sky) 100%);
}

.city-toggle {
  position: relative;
  z-index: 3;
  display: inline-flex;
  align-items: stretch;
  gap: 0.5rem;
  margin-bottom: 1.1rem;
}

.city-toggle-button {
  display: grid;
  gap: 0.08rem;
  min-width: 8.9rem;
  padding: 0.52rem 0.72rem 0.5rem;
  border: 1px solid var(--twilight-slate);
  background: transparent;
  color: var(--twilight-slate);
  text-align: left;
  cursor: pointer;
  transition: background-color 300ms ease, color 300ms ease, box-shadow 300ms ease;
}

.city-toggle-button span {
  font-size: 0.76rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.city-toggle-button small {
  font-size: 0.68rem;
  letter-spacing: 0.04em;
}

.city-toggle-button.is-active {
  background: var(--twilight-slate);
  color: #ffffff;
  box-shadow: 0 12px 24px rgba(26, 31, 46, 0.18);
}

.city-toggle-button:focus-visible {
  outline: 2px solid var(--magritte-sky);
  outline-offset: 2px;
}

.hero-copy {
  position: relative;
  z-index: 3;
  display: grid;
  gap: 0.95rem;
  max-width: 42rem;
}

.hero-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: var(--twilight-slate);
}

h1 {
  font-family: "Cormorant Garamond", "Noto Serif SC", serif;
  font-size: clamp(2rem, 5vw, 4.8rem);
  line-height: 0.95;
}

h1 span {
  display: block;
  margin-top: 0.55rem;
  font-family: "Inter", "Noto Sans SC", sans-serif;
  font-size: clamp(1rem, 2.1vw, 1.5rem);
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--twilight-slate);
}

.hero-subtitle {
  max-width: 40ch;
  font-size: clamp(0.98rem, 1.55vw, 1.3rem);
  color: var(--suit-charcoal);
}

.hero-copy :deep(.map-mode-toggle) {
  margin-top: 0.4rem;
  justify-self: start;
}

.floating-objects {
  list-style: none;
}

.floating-object {
  position: absolute;
  z-index: 2;
  width: 2.3rem;
  height: 2.3rem;
  opacity: 0.78;
}

.floating-object svg {
  width: 100%;
  height: 100%;
}

.skyline-stage {
  position: absolute;
  inset: auto 0 0;
  height: clamp(170px, 28vw, 280px);
  background: var(--dream-white);
  z-index: 1;
}

.skyline-silhouette {
  position: absolute;
  inset: 0;
  clip-path: polygon(0 100%, 0 68%, 4% 68%, 6% 58%, 8% 68%, 12% 68%, 12.6% 48%, 14.1% 68%, 19% 68%, 19% 50%, 21% 50%, 21.4% 68%, 27% 68%, 27% 44%, 29.2% 44%, 29.2% 68%, 35% 68%, 35% 56%, 38% 56%, 38% 68%, 44% 68%, 44.9% 35%, 47% 68%, 50.5% 68%, 50.5% 24%, 52.5% 24%, 52.5% 68%, 56% 68%, 56% 49%, 58% 49%, 58% 68%, 63% 68%, 63.6% 58%, 65.3% 58%, 65.9% 68%, 71% 68%, 71.9% 39%, 74% 68%, 78% 68%, 78% 53%, 80.2% 53%, 80.2% 68%, 86% 68%, 86% 59%, 89% 59%, 89% 68%, 100% 68%, 100% 100%);
}

.skyline-clouds {
  height: 100%;
  background: linear-gradient(180deg, #7ba7bc 0%, #ebe8e5 50%, #7ba7bc 100%);
  background-size: 100% 200%;
  background-position: 50% 18%;
}

@media (prefers-reduced-motion: no-preference) {
  .skyline-clouds {
    animation: skylineDrift 20s linear infinite;
  }

  .floating-object {
    animation: floatVertical var(--float-duration) ease-in-out infinite;
    animation-delay: var(--float-delay);
  }
}

@keyframes skylineDrift {
  from {
    background-position: 50% 0%;
  }

  to {
    background-position: 50% 100%;
  }
}

@keyframes floatVertical {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-13px);
  }
}

@media (max-width: 1023px) {
  .hero {
    min-height: 86vh;
    padding-bottom: 13rem;
  }
}

@media (max-width: 767px) {
  .hero {
    min-height: 72vh;
    padding: 3.2rem 1rem 10.5rem;
  }

  .city-toggle {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: min(100%, 19rem);
  }

  .city-toggle-button {
    min-width: 0;
  }

  .floating-object {
    width: 1.9rem;
    height: 1.9rem;
  }
}
</style>
