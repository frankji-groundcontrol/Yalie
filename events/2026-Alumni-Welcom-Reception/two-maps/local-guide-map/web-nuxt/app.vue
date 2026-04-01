<template>
  <div class="app-shell">
    <NuxtPage />
  </div>
</template>

<style>
:root {
  --dream-white: #ebe8e5;
  --magritte-sky: #7ba7bc;
  --apple-green: #5a7a4a;
  --twilight-slate: #4a5568;
  --night-shadow: #1a1f2e;
  --streetlamp-amber: #c4922a;
  --surrealist-black: #1a1410;
  --warm-stone: #8b7355;
  --suit-charcoal: #3d3d3d;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body,
#__nuxt {
  min-height: 100%;
}

body {
  background: var(--dream-white);
  color: var(--surrealist-black);
  font-family: "Inter", "Noto Sans SC", sans-serif;
  line-height: 1.5;
}

.app-shell {
  min-height: 100vh;
  background: var(--dream-white);
  color: var(--surrealist-black);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
</style>
