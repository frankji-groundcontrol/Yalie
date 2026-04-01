<template>
  <div class="app-shell">
    <NuxtPage />
  </div>
</template>

<style>
:root {
  --dream-white: #ebe8e5;
  --surrealist-black: #1a1410;
  --warm-stone: #8b7355;
  --suit-charcoal: #3d3d3d;
  --catalan-gold: #e1b662;
  --melting-orange: #e1a030;
  --dali-brown: #9b6845;
  --port-lligat: #96b2df;
  --catalan-sunset: #d35400;
  --magritte-sky: #7ba7bc;
  --apple-green: #5a7a4a;
  --twilight-slate: #4a5568;
  --night-shadow: #1a1f2e;
  --streetlamp-amber: #c4922a;
  --font-body: "Inter", "Noto Sans SC", sans-serif;
  --font-heading: "Cormorant Garamond", "Noto Serif SC", serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

html,
body,
#__nuxt {
  min-height: 100%;
}

body {
  min-height: 100vh;
  background: var(--dream-white);
  color: var(--surrealist-black);
  font-family: var(--font-body);
  line-height: 1.5;
}

.app-shell {
  min-height: 100vh;
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
