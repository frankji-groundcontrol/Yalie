<script setup lang="ts">
useHead({ title: "Yale Alumni · Two Maps" });
let scrollY = 0;
let raf: number | null = null;
let listening = false;
function paint(): void {
  document.documentElement.style.setProperty("--gateway-scroll", `${scrollY}`);
  raf = null;
}
function onScroll(): void {
  scrollY = window.scrollY;
  if (raf === null) raf = requestAnimationFrame(paint);
}
function bind(on: boolean): void {
  if (on && !listening) { window.addEventListener("scroll", onScroll, { passive: true }); listening = true; }
  if (!on && listening) { window.removeEventListener("scroll", onScroll); listening = false; }
}
onMounted(() => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!mq.matches) { bind(true); onScroll(); }
  mq.addEventListener("change", (e) => { e.matches ? bind(false) : bind(true); });
});
onUnmounted(() => { bind(false); if (raf !== null) cancelAnimationFrame(raf); });
</script>

<template>
  <main class="gateway">
    <section class="gateway-stage">
      <div class="veil veil-left" aria-hidden="true"></div>
      <div class="veil veil-right" aria-hidden="true"></div>

      <header class="gateway-header">
        <p class="kicker">Yale Shanghai Alumni Reception · April 2026</p>
        <h1>Two Maps</h1>
        <p class="tagline">Your journey. Your cities. Your people.<br>Choose your entrance.</p>
      </header>

      <div class="diptych">
        <NuxtLink to="/alumni" class="panel panel-dali">
          <div class="panel-bg" aria-hidden="true">
            <div class="panel-grain"></div>
            <div class="panel-horizon"></div>
          </div>
           <div class="panel-copy">
            <span class="panel-number">I</span>
            <h2>Alumni<br>Journey Map</h2>
            <p class="panel-cn">校友旅程地图</p>
            <p class="panel-desc">Every Yalie has a story. Six paths from campus to the world — where did Yale take you?</p>
            <span class="panel-cta">See their stories</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/local" class="panel panel-magritte">
          <div class="panel-bg" aria-hidden="true">
            <div class="panel-grain"></div>
            <div class="panel-skyline"></div>
          </div>
           <div class="panel-copy">
            <span class="panel-number">II</span>
            <h2>Local<br>Guide Map</h2>
            <p class="panel-cn">本地指南地图</p>
            <p class="panel-desc">Every Yalie has two hometowns. From Pepe's to the Bund — the places that shaped us and the places that welcome us.</p>
            <span class="panel-cta">Explore both cities</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <footer class="gateway-foot">
      <span>Yale Alumni Welcome Reception · Shanghai · April 2026</span>
      <span>Built for web and event screens</span>
    </footer>
  </main>
</template>

<style scoped>
.gateway { --ink: var(--surrealist-black); --surface: var(--dream-white); min-height: 100vh; display: flex; flex-direction: column; }
.gateway-stage { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: clamp(2.5rem, 5vw, 4rem); padding: clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem); overflow: hidden; }
.veil { position: absolute; top: 0; bottom: 0; width: 50%; pointer-events: none; z-index: 0; }
.veil-left { left: 0; background: linear-gradient(170deg, var(--surface) 0%, #dcc7b0 40%, rgba(155, 104, 69, 0.22) 100%); }
.veil-right { right: 0; background: linear-gradient(190deg, #f0ede8 0%, rgba(123, 167, 188, 0.35) 50%, rgba(26, 31, 46, 0.18) 100%); }

.gateway-header { position: relative; z-index: 2; text-align: center; max-width: 48rem; }
.kicker { font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--warm-stone); }
h1 { margin-top: 0.75rem; font-family: var(--font-heading); font-size: clamp(4rem, 12vw, 9rem); line-height: 0.88; letter-spacing: -0.02em; background: linear-gradient(135deg, var(--catalan-gold) 0%, var(--melting-orange) 30%, var(--magritte-sky) 70%, var(--twilight-slate) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.tagline { margin-top: 1rem; font-size: clamp(1rem, 2vw, 1.3rem); line-height: 1.55; color: var(--suit-charcoal); }

.diptych { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; gap: clamp(0.75rem, 1.5vw, 1.5rem); width: 100%; max-width: 68rem; }

.panel { position: relative; display: flex; flex-direction: column; justify-content: flex-end; min-height: clamp(340px, 48vw, 520px); padding: clamp(1.5rem, 3vw, 2.5rem); text-decoration: none; color: var(--ink); overflow: hidden; cursor: pointer; border: 1px solid rgba(139, 115, 85, 0.5); }
.panel-bg { position: absolute; inset: 0; z-index: 0; }
.panel-grain { position: absolute; inset: 0; background-image: repeating-linear-gradient(116deg, rgba(26, 20, 16, 0.04) 0 1px, transparent 1px 14px); pointer-events: none; }

.panel-dali .panel-bg { background: linear-gradient(170deg, var(--surface) 0%, #dcc7b0 45%, rgba(155, 104, 69, 0.6) 100%); }
.panel-dali .panel-horizon { position: absolute; left: 0; right: 0; bottom: 35%; height: 1px; background: rgba(225, 182, 98, 0.85); box-shadow: 0 -8px 24px rgba(26, 20, 16, 0.14), 0 0 60px rgba(225, 182, 98, 0.25); }

.panel-magritte .panel-bg { background: linear-gradient(180deg, rgba(123, 167, 188, 0.55) 0%, var(--surface) 50%, rgba(26, 31, 46, 0.35) 100%); }
.panel-magritte .panel-skyline { position: absolute; left: 0; right: 0; bottom: 0; height: 38%; background: var(--surface); clip-path: polygon(0 100%, 0 58%, 6% 58%, 8% 42%, 10% 58%, 18% 58%, 19% 32%, 21% 58%, 28% 58%, 29% 38%, 31% 58%, 42% 58%, 43% 22%, 45% 58%, 52% 58%, 53% 44%, 55% 58%, 65% 58%, 66% 35%, 68% 58%, 78% 58%, 79% 48%, 81% 58%, 90% 58%, 91% 52%, 93% 58%, 100% 58%, 100% 100%); }
.panel-magritte .panel-skyline::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(123, 167, 188, 0.5) 0%, transparent 60%); background-size: 100% 200%; background-position: 50% 18%; }

.panel-copy { position: relative; z-index: 1; }
.panel-number { display: block; font-family: var(--font-heading); font-size: clamp(3rem, 6vw, 5rem); line-height: 1; opacity: 0.18; font-weight: 300; }
.panel-copy h2 { font-family: var(--font-heading); font-size: clamp(1.8rem, 3.8vw, 3.2rem); line-height: 1; margin-top: 0.25rem; }
.panel-cn { margin-top: 0.5rem; font-size: clamp(0.95rem, 1.6vw, 1.2rem); color: var(--warm-stone); }
.panel-desc { margin-top: 0.75rem; max-width: 30ch; font-size: clamp(0.88rem, 1.3vw, 1rem); color: var(--suit-charcoal); line-height: 1.5; }
.panel-cta { display: inline-block; margin-top: 1.1rem; font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; padding-bottom: 0.2rem; border-bottom: 1px solid currentColor; color: var(--warm-stone); }
.panel-dali .panel-cta { color: var(--dali-brown); }
.panel-magritte .panel-cta { color: var(--twilight-slate); }

.gateway-foot { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; padding: 1rem clamp(1rem, 4vw, 3rem); font-size: 0.82rem; letter-spacing: 0.02em; color: var(--warm-stone); border-top: 1px solid rgba(139, 115, 85, 0.3); }

@media (prefers-reduced-motion: no-preference) {
  .panel { transition: transform 500ms cubic-bezier(0.2, 0.86, 0.25, 1), box-shadow 500ms cubic-bezier(0.2, 0.86, 0.25, 1); }
  .panel:hover { transform: perspective(900px) rotateY(calc(var(--rotate, 2) * 1deg)) translateY(-6px); box-shadow: 0 32px 64px rgba(26, 20, 16, 0.22); }
  .panel-dali:hover { --rotate: 2; }
  .panel-magritte:hover { --rotate: -2; }
  .panel-cta { transition: letter-spacing 300ms ease, color 300ms ease; }
  .panel:hover .panel-cta { letter-spacing: 0.22em; }
  .panel-dali:hover .panel-cta { color: var(--catalan-sunset); }
  .panel-magritte:hover .panel-cta { color: var(--magritte-sky); }
  .veil-left { animation: veilShift 16s ease-in-out infinite alternate; }
  .veil-right { animation: veilShift 20s ease-in-out infinite alternate-reverse; }
  h1 { animation: titleReveal 1800ms cubic-bezier(0.4, 0, 0.2, 1) both; }
  .diptych { animation: panelsRise 1400ms cubic-bezier(0.2, 0.86, 0.25, 1) 400ms both; }
}

@keyframes veilShift { 0% { opacity: 0.85; } 100% { opacity: 1; } }
@keyframes titleReveal { 0% { opacity: 0; letter-spacing: 0.08em; transform: translateY(20px); } 60% { opacity: 1; } 100% { opacity: 1; letter-spacing: -0.02em; transform: translateY(0); } }
@keyframes panelsRise { 0% { opacity: 0; transform: translateY(40px); } 100% { opacity: 1; transform: translateY(0); } }

.panel:focus-visible { outline: 2px solid var(--catalan-gold); outline-offset: 4px; }

@media (max-width: 767px) {
  .diptych { grid-template-columns: 1fr; }
  .panel { min-height: 280px; }
  .veil-left, .veil-right { width: 100%; height: 50%; }
  .veil-left { bottom: auto; }
  .veil-right { top: auto; bottom: 0; left: 0; }
  h1 { font-size: clamp(3.5rem, 14vw, 5rem); }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .panel { min-height: 380px; }
}
</style>
