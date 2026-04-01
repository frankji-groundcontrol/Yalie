<template>
  <div class="app-shell">
    <NuxtPage />
  </div>
</template>

<style>
:root {
  --dream-white: #ebe8e5;
  --catalan-gold: #e1b662;
  --melting-orange: #e1a030;
  --dali-brown: #9b6845;
  --port-lligat: #96b2df;
  --surrealist-black: #1a1410;
  --warm-stone: #8b7355;
  --suit-charcoal: #3d3d3d;
  --catalan-sunset: #d35400;
  --font-body: "Inter", "Noto Sans SC", sans-serif;
  --font-heading: "Cormorant Garamond", "Noto Serif SC", serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  background: var(--dream-white);
  color: var(--surrealist-black);
  font-family: var(--font-body);
}

.app-shell {
  min-height: 100vh;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
</style>
