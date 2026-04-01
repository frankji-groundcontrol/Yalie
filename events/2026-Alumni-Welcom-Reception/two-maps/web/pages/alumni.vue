<script setup lang="ts">
import AlumniHero from "~/components/alumni/AlumniHero.vue";
import AlumniMap from "~/components/alumni/AlumniMap.vue";
import AlumniLegend from "~/components/alumni/AlumniLegend.vue";
import AlumniDrawer from "~/components/alumni/AlumniDrawer.vue";
import AlumniBuilder from "~/components/alumni/AlumniBuilder.vue";

useHead({ title: "Yale Alumni · Constellation of Lives" });
</script>

<template>
  <main class="constellation-page">
    <AlumniHero />

    <section class="map-section">
      <AlumniMap />
      <AlumniLegend />
      <AlumniDrawer />
      <AlumniBuilder />
    </section>

    <footer>Yale Alumni Welcome Reception · Shanghai · April 2026</footer>
  </main>
</template>

<style scoped>
.constellation-page {
  --surface: var(--dream-white);
  --ink: var(--surrealist-black);
  --ink-soft: var(--suit-charcoal);
  --accent: var(--catalan-gold);
  --accent-strong: var(--melting-orange);
  --frame: var(--dali-brown);
  margin: 0 auto;
  max-width: 100%;
  color: var(--ink);
  background: var(--surface);
  padding-bottom: 2.75rem;
}

.map-section {
  position: relative;
  margin: 0 clamp(0.5rem, 2vw, 1.8rem);
}

footer {
  margin: 1.1rem clamp(1rem, 3vw, 2.5rem) 0;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(155, 104, 69, 0.45);
  font-size: 0.88rem;
  color: var(--ink-soft);
}

@media (max-width: 767px) {
  .map-section {
    margin-inline: 0.4rem;
  }

  footer {
    margin-inline: 1rem;
  }
}
</style>
