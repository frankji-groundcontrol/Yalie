<script setup lang="ts">
const { data } = useLocalGuideState();

useHead({ title: "Yale Alumni · Local Guide Map" });
</script>

<template>
  <main class="page">
    <LocalHero />

    <section class="guide-section">
      <div class="section-heading">
        <h2>{{ data.titleCn }} <span>{{ data.title }}</span></h2>
        <p>{{ data.subtitleCn }} / {{ data.subtitle }}</p>
      </div>

      <LocalMap />
      <LocalWalks />
      <LocalControls />
      <LocalCards />
    </section>

    <LocalEmpire />
  </main>
</template>

<style scoped>
.page {
  max-width: 1440px;
  margin: 0 auto;
  padding-bottom: 5.5rem;
  color: var(--surrealist-black);
}

.guide-section {
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

h2 span {
  font-family: "Inter", "Noto Sans SC", sans-serif;
  font-size: 0.7em;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--twilight-slate);
}

.section-heading p {
  max-width: 62ch;
  color: var(--twilight-slate);
}

@media (max-width: 767px) {
  .guide-section {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>
