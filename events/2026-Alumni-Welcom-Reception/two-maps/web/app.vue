<script setup lang="ts">
const route = useRoute();

const routeOrder: Record<string, number> = {
  "/alumni": 0,
  "/local": 1,
};

const transitionName = ref("map-switch-forward");

watch(
  () => route.path,
  (nextPath, previousPath) => {
    const nextIndex = routeOrder[nextPath] ?? 0;
    const previousIndex = routeOrder[previousPath] ?? nextIndex;
    transitionName.value = nextIndex >= previousIndex ? "map-switch-forward" : "map-switch-backward";
  },
  { immediate: true },
);
</script>

<template>
  <div class="app-shell">
    <NuxtPage v-slot="{ Component }">
      <div class="page-transition-stage">
        <Transition :name="transitionName">
          <component :is="Component" :key="route.path" />
        </Transition>
      </div>
    </NuxtPage>
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

.page-transition-stage {
  position: relative;
  min-height: 100vh;
  overflow: clip;
}

.page-transition-stage > * {
  min-height: 100vh;
}

.map-switch-forward-enter-active,
.map-switch-forward-leave-active,
.map-switch-backward-enter-active,
.map-switch-backward-leave-active {
  position: relative;
  will-change: opacity, transform, filter;
  transition:
    opacity 520ms ease,
    transform 780ms cubic-bezier(0.22, 1, 0.36, 1),
    filter 780ms ease;
}

.map-switch-forward-leave-active,
.map-switch-backward-leave-active {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.map-switch-forward-enter-active,
.map-switch-backward-enter-active {
  z-index: 1;
}

.map-switch-forward-enter-from {
  opacity: 0;
  filter: blur(10px);
  transform: translate3d(34px, 6px, 0) scale(0.992);
}

.map-switch-forward-leave-to {
  opacity: 0.18;
  filter: blur(8px);
  transform: translate3d(-28px, 0, 0) scale(1.002);
}

.map-switch-backward-enter-from {
  opacity: 0;
  filter: blur(10px);
  transform: translate3d(-34px, 6px, 0) scale(0.992);
}

.map-switch-backward-leave-to {
  opacity: 0.18;
  filter: blur(8px);
  transform: translate3d(28px, 0, 0) scale(1.002);
}

.map-switch-forward-enter-to,
.map-switch-forward-leave-from,
.map-switch-backward-enter-to,
.map-switch-backward-leave-from {
  opacity: 1;
  filter: blur(0);
  transform: translate3d(0, 0, 0) scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .map-switch-forward-enter-active,
  .map-switch-forward-leave-active,
  .map-switch-backward-enter-active,
  .map-switch-backward-leave-active {
    transition: none !important;
  }

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
