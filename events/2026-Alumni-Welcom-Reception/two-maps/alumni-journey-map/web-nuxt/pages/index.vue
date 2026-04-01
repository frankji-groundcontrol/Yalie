<script setup lang="ts">
import type { JourneyMapData } from "@yalie/shared";
import { formatClassYear, formatLocation } from "@yalie/shared";
import sampleData from "../../data/templates/sample.json";
interface PathRow {
  id: string;
  origin: string;
  destination: string;
  top: string;
  d: string;
}
const data = sampleData as JourneyMapData;
const profiles = computed(() => data.profiles.slice(0, 6));
const boardHeight = 420;
const pathRows = computed<PathRow[]>(() =>
  profiles.value.map((profile, index) => {
    const y = 52 + index * 62;
    const bend = 210 + (index - 2.5) * 18;
    return {
      id: profile.id,
      origin: profile.hometown,
      destination: profile.currentCity,
      top: `${(y / boardHeight) * 100}%`,
      d: `M 90 ${y} C 250 ${y}, 370 ${bend}, 500 210 C 640 ${bend}, 750 ${y}, 910 ${y}`
    };
  })
);
let animationFrame: number | null = null;
let latestScroll = 0;
let reducedMotion = false;
let motionQuery: MediaQueryList | null = null;
let scrollListening = false;
function paintParallax(): void {
  document.documentElement.style.setProperty("--scroll", `${latestScroll * -0.045}px`);
  animationFrame = null;
}
function scheduleParallax(): void {
  if (reducedMotion || animationFrame !== null) {
    return;
  }
  animationFrame = window.requestAnimationFrame(paintParallax);
}
function onScroll(): void {
  latestScroll = window.scrollY;
  scheduleParallax();
}
function setScrollTracking(shouldTrack: boolean): void {
  if (shouldTrack && !scrollListening) {
    window.addEventListener("scroll", onScroll, { passive: true });
    scrollListening = true;
    return;
  }
  if (!shouldTrack && scrollListening) {
    window.removeEventListener("scroll", onScroll);
    scrollListening = false;
  }
}
function onMotionChange(event: MediaQueryListEvent): void {
  reducedMotion = event.matches;
  if (reducedMotion) {
    setScrollTracking(false);
    document.documentElement.style.setProperty("--scroll", "0px");
    return;
  }
  setScrollTracking(true);
  onScroll();
}
onMounted(() => {
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  reducedMotion = motionQuery.matches;
  motionQuery.addEventListener("change", onMotionChange);
  if (reducedMotion) {
    document.documentElement.style.setProperty("--scroll", "0px");
    return;
  }
  setScrollTracking(true);
  onScroll();
});
onUnmounted(() => {
  setScrollTracking(false);
  motionQuery?.removeEventListener("change", onMotionChange);
  if (animationFrame !== null) {
    window.cancelAnimationFrame(animationFrame);
  }
  document.documentElement.style.setProperty("--scroll", "0px");
});
</script>
<template>
  <main class="journey-page">
    <section class="hero">
      <div class="hero-desert parallax-bg" aria-hidden="true"></div>
      <div class="hero-atmosphere parallax-mid" aria-hidden="true"></div>
      <div class="hero-copy parallax-fg">
        <p class="kicker">Alumni Journey Atlas · Shanghai Reception 2026</p>
        <h1>Yale Alumni Journey Map</h1>
        <p>{{ data.subtitle }}</p>
      </div>
      <div class="horizon" aria-hidden="true"></div>
    </section>
    <section class="cards-wrap parallax-fg">
      <div class="cards-grid">
        <article v-for="(profile, index) in profiles" :key="profile.id" class="journey-card" tabindex="0" :style="`--i:${index}`">
          <header>
            <h2>{{ profile.name }}</h2>
            <p class="profile-meta">{{ formatClassYear(profile.classYear) }} · {{ profile.program }}</p>
          </header>
          <p class="route-line">
            <span>{{ profile.hometown }}</span>
            <span class="route-arrow">→</span>
            <span>{{ formatLocation(profile.currentCity, profile.currentCountry) }}</span>
          </p>
          <p class="current-role">{{ profile.currentRole }}</p>
          <ul class="journey-points">
            <li v-for="highlight in profile.journeyHighlights" :key="highlight">{{ highlight }}</li>
          </ul>
          <a v-if="profile.website" :href="profile.website" target="_blank" rel="noreferrer" class="site-link">{{ profile.website.replace("https://", "") }}</a>
        </article>
      </div>
    </section>
    <section class="paths-wrap">
      <div class="paths-heading">
        <h3>Six Journeys Through Yale, Now Converging in Global Cities</h3>
      </div>
      <div class="path-board">
        <div class="depth-plane origins parallax-bg">
          <p v-for="row in pathRows" :key="`${row.id}-origin`" :style="{ top: row.top }">{{ row.origin }}</p>
        </div>
        <div class="depth-plane yale-paths parallax-mid">
          <svg viewBox="0 0 1000 420" role="presentation" aria-hidden="true">
            <g v-for="(row, index) in pathRows" :key="`${row.id}-line`" :style="`--p:${index}`">
              <path class="path-glow" :d="row.d" pathLength="1" />
              <path class="path-line" :d="row.d" pathLength="1" />
            </g>
          </svg>
          <span class="yale-node">Yale</span>
        </div>
        <div class="depth-plane destinations parallax-fg">
          <p v-for="row in pathRows" :key="`${row.id}-destination`" :style="{ top: row.top }">{{ row.destination }}</p>
        </div>
      </div>
    </section>
    <footer class="page-footer">Yale Alumni Welcome Reception · Shanghai · April 2026 · Built for web and event screens</footer>
  </main>
</template>
<style scoped>
.journey-page { --surface: var(--dream-white); --ink: var(--surrealist-black); --ink-soft: var(--suit-charcoal); --accent: var(--catalan-gold); --accent-strong: var(--melting-orange); --frame: var(--dali-brown); --space-1: 0.5rem; --space-2: 0.875rem; --space-3: 1.25rem; --space-4: 1.75rem; --space-5: 2.5rem; --space-6: 4rem; --radius: 0.625rem; --shadow-short: 0 16px 26px rgba(26, 20, 16, 0.16); --shadow-long: 0 50px 74px rgba(26, 20, 16, 0.3); --border: 1px solid rgba(155, 104, 69, 0.75); --reveal: 1200ms; --path-draw: 2000ms; --ease-slow: cubic-bezier(0.4, 0, 0.2, 1); --ease-spring: cubic-bezier(0.2, 0.86, 0.25, 1); margin: 0 auto; max-width: min(92vw, 90rem); padding: var(--space-3) var(--space-2) var(--space-6); color: var(--ink); }
.hero { position: relative; min-height: 100vh; padding: clamp(4rem, 11vw, 8.5rem) var(--space-2) clamp(5rem, 12vw, 10rem); overflow: hidden; border: var(--border); background: linear-gradient(170deg, var(--surface) 0%, #dcc7b0 42%, var(--frame) 100%); }
.hero-desert, .hero-atmosphere { position: absolute; inset: 0; pointer-events: none; }
.hero-desert { background: radial-gradient(130% 72% at 18% 16%, rgba(225, 182, 98, 0.38) 0%, rgba(225, 182, 98, 0) 70%), linear-gradient(120deg, rgba(155, 104, 69, 0.08) 8%, rgba(211, 84, 0, 0.22) 72%, rgba(26, 20, 16, 0.16) 100%); }
.hero-atmosphere { background-image: radial-gradient(circle at 74% 24%, rgba(150, 178, 223, 0.35) 0%, rgba(150, 178, 223, 0) 45%), repeating-linear-gradient(116deg, rgba(26, 20, 16, 0.06) 0 2px, rgba(26, 20, 16, 0) 2px 12px); opacity: 0.9; }
.horizon { position: absolute; left: 0; right: 0; bottom: 33%; border-top: 1px solid rgba(225, 182, 98, 0.85); box-shadow: 0 -10px 28px rgba(26, 20, 16, 0.16); }
.hero-copy { position: relative; z-index: 2; max-width: 62rem; }
.kicker { font-size: 0.75rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-soft); }
h1 { margin-top: var(--space-3); font-family: var(--font-heading); font-size: clamp(2.7rem, 9.6vw, 7.8rem); line-height: 0.92; font-weight: 600; }
.hero-copy p:last-child { margin-top: var(--space-3); max-width: 40ch; font-size: clamp(0.98rem, 2.1vw, 1.35rem); color: rgba(26, 20, 16, 0.9); }
.cards-wrap { margin-top: clamp(-3rem, -5vw, -5.25rem); position: relative; z-index: 3; }
.cards-grid { display: grid; gap: var(--space-3); }
.journey-card { background: rgba(235, 232, 229, 0.96); border: var(--border); padding: var(--space-4); box-shadow: var(--shadow-short); cursor: pointer; outline: none; }
.journey-card h2 { font-family: var(--font-heading); font-size: clamp(1.5rem, 3vw, 2rem); line-height: 1.03; }
.profile-meta { margin-top: var(--space-1); font-size: 1.125rem; color: var(--warm-stone); }
.route-line { margin-top: var(--space-3); display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; font-weight: 700; color: var(--ink); }
.route-arrow { color: var(--accent-strong); font-size: 1.15rem; }
.current-role { margin-top: var(--space-2); color: var(--ink-soft); line-height: 1.45; }
.journey-points { margin-top: var(--space-3); list-style: none; display: grid; gap: 0.42rem; padding-left: var(--space-2); color: var(--ink); }
.journey-points li { position: relative; }
.journey-points li::before { content: ""; position: absolute; left: calc(-1 * var(--space-2)); top: 0.52em; width: 0.42rem; height: 0.42rem; border-radius: 50%; background: var(--accent); }
.site-link { display: inline-block; margin-top: var(--space-3); color: var(--accent-strong); text-decoration: none; border-bottom: 1px solid rgba(211, 84, 0, 0.5); }
.site-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.journey-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
.paths-wrap { margin-top: var(--space-6); border: var(--border); padding: var(--space-4); background: linear-gradient(180deg, rgba(235, 232, 229, 0.95), rgba(220, 199, 176, 0.58)); }
.paths-heading h3 { max-width: 32ch; font-family: var(--font-heading); font-size: clamp(1.8rem, 3.4vw, 3rem); line-height: 1.04; }
.path-board { margin-top: var(--space-4); min-height: 26.25rem; display: grid; grid-template-columns: 1fr 2.8fr 1fr; align-items: stretch; overflow: hidden; }
.depth-plane { position: relative; }
.depth-plane p { position: absolute; transform: translateY(-50%); font-size: clamp(0.86rem, 1.5vw, 1rem); letter-spacing: 0.02em; }
.origins p { left: 0; color: rgba(26, 20, 16, 0.74); }
.destinations p { right: 0; text-align: right; color: var(--ink); font-weight: 600; }
.yale-paths svg { width: 100%; height: 100%; display: block; }
.path-glow { stroke: rgba(225, 182, 98, 0.4); stroke-width: 7; fill: none; filter: blur(4px); stroke-dasharray: 1; stroke-dashoffset: 1; }
.path-line { stroke: var(--accent); stroke-width: 2; fill: none; stroke-dasharray: 1; stroke-dashoffset: 1; }
.yale-node { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-family: var(--font-heading); font-size: clamp(2rem, 4vw, 3rem); padding: 0.35rem 1rem; border: 1px solid rgba(225, 182, 98, 0.85); background: rgba(235, 232, 229, 0.86); box-shadow: 0 16px 30px rgba(26, 20, 16, 0.18); }
.page-footer { margin-top: var(--space-5); padding: var(--space-2) 0; border-top: 1px solid rgba(155, 104, 69, 0.45); font-size: 0.9rem; letter-spacing: 0.02em; color: var(--ink-soft); }
.parallax-bg, .parallax-mid, .parallax-fg { will-change: transform; }
.parallax-bg { transform: translate3d(0, calc(var(--scroll, 0px) * 0.2), 0); }
.parallax-mid { transform: translate3d(0, calc(var(--scroll, 0px) * 0.5), 0); }
.parallax-fg { transform: translate3d(0, calc(var(--scroll, 0px) * 1), 0); }
@media (min-width: 48rem) { .journey-page { padding: var(--space-4) var(--space-4) var(--space-6); } .cards-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 64rem) { .cards-grid { grid-template-columns: repeat(12, minmax(0, 1fr)); } .journey-card:nth-child(1) { grid-column: 1 / span 5; } .journey-card:nth-child(2) { grid-column: 6 / span 4; } .journey-card:nth-child(3) { grid-column: 10 / span 3; } .journey-card:nth-child(4) { grid-column: 2 / span 4; } .journey-card:nth-child(5) { grid-column: 6 / span 5; } .journey-card:nth-child(6) { grid-column: 11 / span 2; } }
@media (min-width: 90rem) { .journey-page { padding-inline: var(--space-5); } .hero { min-height: 102vh; } }
@media (max-width: 47.99rem) { .journey-page { padding-inline: var(--space-1); } .hero { padding-inline: var(--space-1); } .paths-wrap { padding: var(--space-2); } .path-board { grid-template-columns: 1.15fr 1.8fr 1.15fr; min-height: 24rem; } }
@media (prefers-reduced-motion: no-preference) {
  .journey-card { transition: transform 400ms var(--ease-spring), box-shadow 400ms var(--ease-spring), background-color 400ms var(--ease-spring); animation: card-enter var(--reveal) var(--ease-spring) both; animation-delay: calc(var(--i) * 150ms); }
  .journey-card:hover, .journey-card:focus-visible { transform: perspective(800px) rotateX(-2deg) rotateY(3deg) translateY(-8px); box-shadow: var(--shadow-long); background: rgba(225, 160, 48, 0.14); }
  .path-line, .path-glow { animation: draw-path var(--path-draw) linear both; animation-delay: calc(var(--p) * 150ms); }
  .hero-atmosphere { animation: drift 10000ms ease-in-out infinite alternate; }
}
@keyframes card-enter { 0% { opacity: 0; transform: translateY(30px); } 60% { opacity: 1; transform: translateY(-4px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes draw-path { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes drift { from { transform: translate3d(-1.2rem, calc(var(--scroll, 0px) * 0.5), 0); } to { transform: translate3d(1.2rem, calc(var(--scroll, 0px) * 0.5), 0); } }
</style>
