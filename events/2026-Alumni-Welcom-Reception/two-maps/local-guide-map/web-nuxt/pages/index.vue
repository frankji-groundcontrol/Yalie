<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import type { GuideCategory, GuideLocation, LocalGuideMapData } from "@yalie/shared";
import sampleData from "../../data/templates/sample.json";

type IconSegment = {
  d: string;
  fill?: "currentColor" | "none";
  stroke?: "currentColor" | "none";
  strokeWidth?: number;
  strokeLinecap?: "round" | "butt" | "square";
  strokeLinejoin?: "round" | "bevel" | "miter";
};

type CategoryVisual = {
  color: string;
  label: string;
  floatDuration: string;
  icon: IconSegment[];
};

type PositionedLocation = GuideLocation & {
  left: number;
  top: number;
};

const data = sampleData as LocalGuideMapData;

const categoryVisuals: Record<GuideCategory, CategoryVisual> = {
  food: {
    color: "var(--warm-stone)",
    label: "Food",
    floatDuration: "9.5s",
    icon: [
      { d: "M12 6C13.4 4.8 14.6 4.7 16.2 4.9C15.3 6.4 14.2 7 12.6 7.2", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" },
      { d: "M12 7.3C8.2 7.3 5 10.1 5 13.8C5 17.6 8 20.3 12 20.3C16 20.3 19 17.6 19 13.8C19 10.1 15.8 7.3 12 7.3Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8 },
      { d: "M12 10.3V16.5", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" }
    ]
  },
  culture: {
    color: "var(--suit-charcoal)",
    label: "Culture",
    floatDuration: "10.5s",
    icon: [
      { d: "M6 11V9.6C6 6.8 8.7 4.6 12 4.6C15.3 4.6 18 6.8 18 9.6V11", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" },
      { d: "M3.2 13.2H20.8V16.6H3.2Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinejoin: "miter" },
      { d: "M8 13.2V11H16V13.2", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" }
    ]
  },
  art: {
    color: "var(--magritte-sky)",
    label: "Art",
    floatDuration: "8.6s",
    icon: [
      { d: "M4 4H20V20H4Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8 },
      { d: "M8 8H16V16H8Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8 },
      { d: "M11 12H13", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" }
    ]
  },
  nature: {
    color: "var(--apple-green)",
    label: "Nature",
    floatDuration: "11.4s",
    icon: [
      { d: "M12 4L6 12H18L12 4Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinejoin: "miter" },
      { d: "M12 8L7 15H17L12 8Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinejoin: "miter" },
      { d: "M12 15V20", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" }
    ]
  },
  practical: {
    color: "var(--twilight-slate)",
    label: "Practical",
    floatDuration: "9.8s",
    icon: [
      { d: "M12 21S18 14.8 18 10.8A6 6 0 1 0 6 10.8C6 14.8 12 21 12 21Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinejoin: "round" },
      { d: "M12 8L14.8 9.2L12.8 12L10 13.2L11.8 10.4L12 8Z", fill: "currentColor", stroke: "none" }
    ]
  },
  nightlife: {
    color: "var(--night-shadow)",
    label: "Nightlife",
    floatDuration: "10.9s",
    icon: [
      { d: "M14.5 4A5.5 5.5 0 1 0 20 9.5A4 4 0 1 1 14.5 4Z", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinejoin: "round" },
      { d: "M9 7V15.5A2.5 2.5 0 1 1 7 13.2 M9 10L14 9.1V14", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }
    ]
  }
};

const minLat = Math.min(...data.locations.map((location) => location.coordinates.lat));
const maxLat = Math.max(...data.locations.map((location) => location.coordinates.lat));
const minLng = Math.min(...data.locations.map((location) => location.coordinates.lng));
const maxLng = Math.max(...data.locations.map((location) => location.coordinates.lng));

function normalizePoint(lat: number, lng: number, xPad = 8, yPad = 8): { left: number; top: number } {
  const left = ((lng - minLng) / (maxLng - minLng || 1)) * (100 - xPad * 2) + xPad;
  const top = 100 - (((lat - minLat) / (maxLat - minLat || 1)) * (100 - yPad * 2) + yPad);
  return { left, top };
}

const positionedLocations: PositionedLocation[] = data.locations.map((location) => ({
  ...location,
  ...normalizePoint(location.coordinates.lat, location.coordinates.lng)
}));

const locationById = new Map(positionedLocations.map((location) => [location.id, location]));
const featuredWalk = data.walks[0];

const walkStops: PositionedLocation[] = featuredWalk
  ? featuredWalk.stops
      .map((stopId) => locationById.get(stopId))
      .filter((location): location is PositionedLocation => Boolean(location))
  : [];

const routePoints = walkStops.map((location) => {
  const point = normalizePoint(location.coordinates.lat, location.coordinates.lng, 9, 11);
  return {
    location,
    x: point.left * 9.1 + 24,
    y: point.top * 2.82 + 36
  };
});

const routePath = routePoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

const floatingOrder: GuideCategory[] = ["culture", "food", "nature", "art", "practical", "nightlife"];

const floatingPlacement: Record<GuideCategory, { left: string; top: string; delay: string }> = {
  culture: { left: "72%", top: "16%", delay: "0.2s" },
  food: { left: "84%", top: "28%", delay: "0.8s" },
  nature: { left: "68%", top: "36%", delay: "1.2s" },
  art: { left: "89%", top: "47%", delay: "1.7s" },
  practical: { left: "78%", top: "54%", delay: "2.1s" },
  nightlife: { left: "90%", top: "62%", delay: "2.5s" }
};

const empireSplit = ref(56);
let removeEmpireListeners: (() => void) | null = null;

onMounted(() => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const updateSplit = () => {
    if (media.matches) {
      empireSplit.value = 56;
      return;
    }
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    empireSplit.value = 46 + progress * 20;
  };

  updateSplit();
  window.addEventListener("scroll", updateSplit, { passive: true });
  media.addEventListener("change", updateSplit);

  removeEmpireListeners = () => {
    window.removeEventListener("scroll", updateSplit);
    media.removeEventListener("change", updateSplit);
  };
});

onBeforeUnmount(() => {
  removeEmpireListeners?.();
});
</script>

<template>
  <main class="page">
    <header class="hero">
      <div class="hero-copy">
        <p class="hero-kicker">Local Guide Map</p>
        <h1>
          {{ data.titleCn }}
          <span>{{ data.title }}</span>
        </h1>
        <p class="hero-subtitle">{{ data.subtitleCn }} / {{ data.subtitle }}</p>
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

    <section class="map-section" aria-labelledby="map-title">
      <div class="section-heading">
        <h2 id="map-title">城市定位 / Spatial Guide</h2>
        <p>Hard-edge placement for practical, cultural, and social stops.</p>
      </div>

      <div class="map-board" role="img" aria-label="Shanghai local guide map with categorized locations">
        <div class="map-grain" aria-hidden="true"></div>
        <button
          v-for="location in positionedLocations"
          :key="location.id"
          class="pin-item"
          type="button"
          :style="{ left: `${location.left}%`, top: `${location.top}%` }"
          :aria-label="`${location.nameCn} ${categoryVisuals[location.category].label}`"
        >
          <span class="pin-icon" :style="{ color: categoryVisuals[location.category].color }">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                v-for="segment in categoryVisuals[location.category].icon"
                :key="segment.d"
                :d="segment.d"
                :fill="segment.fill ?? 'none'"
                :stroke="segment.stroke ?? 'currentColor'"
                :stroke-width="segment.strokeWidth ?? 1.8"
                :stroke-linecap="segment.strokeLinecap ?? 'round'"
                :stroke-linejoin="segment.strokeLinejoin ?? 'round'"
              />
            </svg>
          </span>
          <span class="pin-label">
            <strong>{{ location.nameCn }}</strong>
            <small>{{ categoryVisuals[location.category].label }}</small>
          </span>
        </button>
      </div>

      <div class="cards-grid">
        <article v-for="location in positionedLocations" :key="`card-${location.id}`" class="location-card" tabindex="0">
          <header class="card-head">
            <span class="card-icon" :style="{ color: categoryVisuals[location.category].color }">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  v-for="segment in categoryVisuals[location.category].icon"
                  :key="segment.d"
                  :d="segment.d"
                  :fill="segment.fill ?? 'none'"
                  :stroke="segment.stroke ?? 'currentColor'"
                  :stroke-width="segment.strokeWidth ?? 1.8"
                  :stroke-linecap="segment.strokeLinecap ?? 'round'"
                  :stroke-linejoin="segment.strokeLinejoin ?? 'round'"
                />
              </svg>
            </span>
            <div>
              <h3>{{ location.nameCn }}</h3>
              <p>{{ location.name }} · {{ categoryVisuals[location.category].label }}</p>
            </div>
          </header>
          <div class="card-reveal">
            <p class="description">{{ location.descriptionCn }}</p>
            <p class="tips">{{ location.tipsCn[0] }}</p>
            <p class="meta">评分 {{ location.rating?.toFixed(1) ?? "-" }} · {{ location.addressCn }}</p>
          </div>
        </article>
      </div>
    </section>

    <section v-if="featuredWalk" class="route-section" aria-labelledby="route-title">
      <div class="section-heading">
        <h2 id="route-title">{{ featuredWalk.nameCn }} / {{ featuredWalk.name }}</h2>
        <p>{{ featuredWalk.descriptionCn }} · {{ featuredWalk.durationMinutes }} 分钟 · {{ featuredWalk.distanceKm }} km</p>
      </div>

      <div class="route-canvas">
        <svg viewBox="0 0 960 360" role="img" :aria-label="`${featuredWalk.name} route with ${walkStops.length} stops`">
          <path class="route-line" :d="routePath" />
          <g v-for="point in routePoints" :key="`route-${point.location.id}`">
            <rect :x="point.x - 10" :y="point.y - 10" width="20" height="20" fill="var(--dream-white)" stroke="var(--twilight-slate)" stroke-width="1.4" />
            <g :transform="`translate(${point.x - 7} ${point.y - 7})`" :style="{ color: categoryVisuals[point.location.category].color }" aria-hidden="true">
              <path
                v-for="segment in categoryVisuals[point.location.category].icon"
                :key="segment.d"
                :d="segment.d"
                :fill="segment.fill ?? 'none'"
                :stroke="segment.stroke ?? 'currentColor'"
                :stroke-width="segment.strokeWidth ?? 1.8"
                :stroke-linecap="segment.strokeLinecap ?? 'round'"
                :stroke-linejoin="segment.strokeLinejoin ?? 'round'"
                transform="scale(0.58)"
              />
            </g>
            <text :x="point.x + 14" :y="point.y - 12" fill="var(--surrealist-black)">{{ point.location.nameCn }}</text>
          </g>
        </svg>
      </div>
    </section>

    <section class="empire-section" :style="{ '--empire-split': `${empireSplit}%` }" aria-labelledby="empire-title">
      <h2 id="empire-title">Empire of Light / 光之帝国</h2>
      <p>Day sky above, night street below. Scroll shifts the seam between two realities.</p>
      <div class="lamp" aria-hidden="true">
        <span class="lamp-post"></span>
        <span class="lamp-glow"></span>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page {
  max-width: 1440px;
  margin: 0 auto;
  padding-bottom: 5.5rem;
  color: var(--surrealist-black);
}

.hero {
  position: relative;
  min-height: 100vh;
  padding: 5rem clamp(1rem, 5vw, 4.5rem) 16rem;
  overflow: hidden;
  background: linear-gradient(180deg, #f0ede8 0%, var(--magritte-sky) 100%);
}

.hero-copy {
  position: relative;
  z-index: 3;
  max-width: 42rem;
}

.hero-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.17em;
  text-transform: uppercase;
  color: var(--twilight-slate);
}

h1 {
  margin-top: 0.85rem;
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
  margin-top: 1rem;
  max-width: 40ch;
  font-size: clamp(0.98rem, 1.55vw, 1.3rem);
  color: var(--suit-charcoal);
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

.map-section,
.route-section,
.empire-section {
  margin: 3.4rem clamp(1rem, 4vw, 4rem) 0;
}

.section-heading {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1.15rem;
}

h2 {
  font-family: "Cormorant Garamond", "Noto Serif SC", serif;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  line-height: 1;
}

.section-heading p,
.empire-section p {
  max-width: 62ch;
  color: var(--twilight-slate);
}

.map-board {
  position: relative;
  height: clamp(340px, 42vw, 500px);
  border: 1px solid var(--twilight-slate);
  background: linear-gradient(165deg, #f0ede8 0%, #cfdce2 50%, #8eaec0 100%);
  overflow: hidden;
}

.map-grain {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(90deg, rgba(74, 85, 104, 0.12) 1px, transparent 1px), linear-gradient(rgba(74, 85, 104, 0.12) 1px, transparent 1px);
  background-size: 44px 44px;
  pointer-events: none;
}

.pin-item {
  position: absolute;
  transform: translate(-50%, -100%);
  display: grid;
  gap: 0.32rem;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.pin-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border: 1px solid var(--twilight-slate);
  background: rgba(235, 232, 229, 0.95);
}

.pin-icon svg {
  width: 1.2rem;
  height: 1.2rem;
}

.pin-label {
  display: grid;
  gap: 0.06rem;
  min-width: 6.8rem;
  padding: 0.35rem 0.45rem;
  border: 1px solid var(--twilight-slate);
  background: rgba(235, 232, 229, 0.96);
  box-shadow: 0 8px 18px rgba(26, 31, 46, 0.12);
  text-align: left;
}

.pin-label strong {
  font-size: 0.76rem;
  line-height: 1.2;
}

.pin-label small {
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--twilight-slate);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.2rem;
}

.location-card {
  border: 1px solid var(--twilight-slate);
  background: var(--dream-white);
  padding: 1rem;
  cursor: pointer;
  transition: transform 400ms ease, box-shadow 400ms ease;
}

.card-head {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
}

.card-icon {
  width: 1.8rem;
  height: 1.8rem;
}

.card-icon svg {
  width: 100%;
  height: 100%;
}

h3 {
  font-size: 1.04rem;
  line-height: 1.2;
}

.card-head p {
  margin-top: 0.2rem;
  font-size: 0.74rem;
  color: var(--twilight-slate);
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.card-reveal {
  margin-top: 0.9rem;
  clip-path: inset(0 0 60% 0);
  transition: clip-path 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.description,
.tips,
.meta {
  margin-top: 0.5rem;
}

.tips {
  color: var(--twilight-slate);
}

.meta {
  font-size: 0.82rem;
  color: var(--suit-charcoal);
}

.location-card:hover,
.location-card:focus-within {
  transform: translateY(-4px);
  box-shadow: 0 16px 26px rgba(26, 31, 46, 0.16);
}

.location-card:hover .card-reveal,
.location-card:focus-within .card-reveal {
  clip-path: inset(0 0 0 0);
}

.route-canvas {
  border: 1px solid var(--twilight-slate);
  background: linear-gradient(180deg, rgba(123, 167, 188, 0.2) 0%, rgba(235, 232, 229, 0.95) 70%);
  padding: 1rem;
}

.route-canvas svg {
  width: 100%;
  height: auto;
}

.route-canvas text {
  font-size: 13px;
  font-family: "Inter", "Noto Sans SC", sans-serif;
}

.route-line {
  fill: none;
  stroke: var(--twilight-slate);
  stroke-width: 2.2;
  stroke-linejoin: miter;
  stroke-linecap: square;
}

.empire-section {
  position: relative;
  min-height: 360px;
  padding: 2rem 1.4rem;
  border: 1px solid var(--twilight-slate);
  background: linear-gradient(180deg, #7ba7bc 0%, #7ba7bc var(--empire-split), #1a1f2e var(--empire-split), #1a1f2e 100%);
  color: var(--dream-white);
  overflow: hidden;
}

.empire-section h2,
.empire-section p {
  position: relative;
  z-index: 1;
}

.lamp {
  position: absolute;
  left: clamp(1rem, 6vw, 6rem);
  bottom: 0;
  width: 42px;
  height: 160px;
}

.lamp-post {
  position: absolute;
  left: 20px;
  bottom: 0;
  width: 2px;
  height: 138px;
  background: rgba(235, 232, 229, 0.9);
}

.lamp-glow {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: var(--streetlamp-amber);
  box-shadow: 0 0 16px rgba(196, 146, 42, 0.85);
}

.pin-item:focus-visible,
.location-card:focus-visible {
  outline: 2px solid var(--magritte-sky);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: no-preference) {
  .skyline-clouds {
    animation: skylineDrift 20s linear infinite;
  }

  .floating-object {
    animation: floatVertical var(--float-duration) ease-in-out infinite;
    animation-delay: var(--float-delay);
  }

  .route-line {
    stroke-dasharray: 1200;
    stroke-dashoffset: 1200;
    animation: drawPath 2000ms linear forwards;
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

@keyframes drawPath {
  to {
    stroke-dashoffset: 0;
  }
}

@media (max-width: 1023px) {
  .hero {
    min-height: 86vh;
    padding-bottom: 13rem;
  }

  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 880px) {
  .map-board .pin-item:nth-child(n + 8) {
    display: none;
  }
}

@media (max-width: 767px) {
  .hero {
    min-height: 72vh;
    padding: 3.2rem 1rem 10.5rem;
  }

  .floating-object {
    width: 1.9rem;
    height: 1.9rem;
  }

  .map-section,
  .route-section,
  .empire-section {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .map-board {
    height: 340px;
  }

  .map-board .pin-item:nth-child(n + 6) {
    display: none;
  }

  .route-canvas text {
    font-size: 11px;
  }
}
</style>
