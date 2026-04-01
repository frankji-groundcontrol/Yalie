<script setup lang="ts">
const { mapSubtitle } = useAlumniState();

let animationFrame: number | null = null;
let latestScroll = 0;
let reducedMotion = false;
let motionQuery: MediaQueryList | null = null;
let listening = false;

function paintParallax(): void {
  document.documentElement.style.setProperty("--scroll", `${latestScroll * -0.05}px`);
  animationFrame = null;
}

function scheduleParallax(): void {
  if (reducedMotion || animationFrame !== null) return;
  animationFrame = window.requestAnimationFrame(paintParallax);
}

function onScroll(): void {
  latestScroll = window.scrollY;
  scheduleParallax();
}

function setTracking(enabled: boolean): void {
  if (enabled && !listening) {
    window.addEventListener("scroll", onScroll, { passive: true });
    listening = true;
    return;
  }
  if (!enabled && listening) {
    window.removeEventListener("scroll", onScroll);
    listening = false;
  }
}

function onMotionChange(event: MediaQueryListEvent): void {
  reducedMotion = event.matches;
  if (reducedMotion) {
    setTracking(false);
    document.documentElement.style.setProperty("--scroll", "0px");
    return;
  }
  setTracking(true);
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
  setTracking(true);
  onScroll();
});

onUnmounted(() => {
  setTracking(false);
  motionQuery?.removeEventListener("change", onMotionChange);
  if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
  document.documentElement.style.setProperty("--scroll", "0px");
});
</script>

<template>
  <header class="hero">
    <div class="hero-sky parallax-bg" aria-hidden="true"></div>
    <div class="hero-stars parallax-mid" aria-hidden="true"></div>
    <div class="hero-copy parallax-fg">
      <p class="kicker">Constellation of Lives · Shanghai Reception 2026</p>
      <h1>Where Did Yale Take You?</h1>
      <p>{{ mapSubtitle }}</p>
    </div>
    <div class="horizon" aria-hidden="true"></div>
  </header>
</template>

<style scoped>
.hero { position: relative; min-height: 72vh; padding: clamp(4rem, 11vw, 8rem) clamp(1rem, 4vw, 4rem) clamp(6rem, 14vw, 9rem); overflow: hidden; border: 1px solid rgba(155, 104, 69, 0.7); background: linear-gradient(175deg, var(--dream-white) 0%, #ddc3aa 45%, #b27e57 100%); }
.hero-sky, .hero-stars { position: absolute; inset: 0; pointer-events: none; }
.hero-sky { background: radial-gradient(120% 80% at 18% 14%, rgba(225, 182, 98, 0.36) 0%, rgba(225, 182, 98, 0) 65%), radial-gradient(70% 45% at 78% 28%, rgba(123, 167, 188, 0.36) 0%, rgba(123, 167, 188, 0) 60%); }
.hero-stars { background-image: radial-gradient(circle at 14% 18%, rgba(26, 20, 16, 0.32) 0 1px, transparent 1.2px), radial-gradient(circle at 68% 22%, rgba(26, 20, 16, 0.28) 0 1px, transparent 1.2px), radial-gradient(circle at 34% 44%, rgba(235, 232, 229, 0.72) 0 1.6px, transparent 1.8px), radial-gradient(circle at 82% 56%, rgba(235, 232, 229, 0.58) 0 1.3px, transparent 1.5px); background-size: 220px 220px, 260px 260px, 190px 190px, 280px 280px; opacity: 0.85; }
.hero-copy { position: relative; z-index: 2; max-width: 58rem; color: var(--surrealist-black); }
.kicker { font-size: 0.76rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(26, 20, 16, 0.8); }
h1 { margin-top: 1rem; font-family: var(--font-heading); font-size: clamp(2.6rem, 9vw, 7rem); line-height: 0.93; }
.hero-copy p:last-child { margin-top: 1rem; max-width: 44ch; font-size: clamp(1rem, 2vw, 1.3rem); color: rgba(26, 20, 16, 0.88); }
.horizon { position: absolute; left: 0; right: 0; bottom: 33%; border-top: 1px solid rgba(225, 182, 98, 0.86); box-shadow: 0 -10px 28px rgba(26, 20, 16, 0.16); }
.parallax-bg, .parallax-mid, .parallax-fg { will-change: transform; }
.parallax-bg { transform: translate3d(0, calc(var(--scroll, 0px) * 0.2), 0); }
.parallax-mid { transform: translate3d(0, calc(var(--scroll, 0px) * 0.5), 0); }
.parallax-fg { transform: translate3d(0, calc(var(--scroll, 0px) * 1), 0); }

@media (max-width: 767px) {
  .hero { min-height: 64vh; padding-bottom: 6rem; }
}

@media (prefers-reduced-motion: reduce) {
  .parallax-bg, .parallax-mid, .parallax-fg { transform: none; }
}
</style>
