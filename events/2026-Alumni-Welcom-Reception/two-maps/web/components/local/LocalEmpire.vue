<script setup lang="ts">
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
  <section class="empire-section" :style="{ '--empire-split': `${empireSplit}%` }" aria-labelledby="empire-title">
    <h2 id="empire-title">Empire of Light / 光之帝国</h2>
    <p>Day sky above, night street below. Scroll shifts the seam between two realities.</p>
    <div class="lamp" aria-hidden="true">
      <span class="lamp-post"></span>
      <span class="lamp-glow"></span>
    </div>
  </section>
</template>

<style scoped>
.empire-section {
  margin: 3.4rem clamp(1rem, 4vw, 4rem) 0;
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

.empire-section h2 {
  font-family: "Cormorant Garamond", "Noto Serif SC", serif;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  line-height: 1;
}

.empire-section p {
  max-width: 62ch;
  color: var(--twilight-slate);
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

@media (max-width: 767px) {
  .empire-section {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>
