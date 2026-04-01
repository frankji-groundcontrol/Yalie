<script setup lang="ts">
const mapContainer = ref<HTMLElement | null>(null);
const { initMap, cleanup, resetMap } = useConstellationMap(mapContainer);

onMounted(() => {
  void initMap();
});

onBeforeUnmount(() => {
  cleanup();
});

defineExpose({ resetMap });
</script>

<template>
  <div ref="mapContainer" class="constellation-map" />
</template>

<style scoped>
.constellation-map {
  position: relative;
  width: 100%;
  height: calc(100vh - 4rem);
  min-height: 500px;
  border: 1px solid rgba(116, 153, 212, 0.42);
  box-shadow: 0 38px 70px rgba(1, 4, 16, 0.62), inset 0 0 140px rgba(91, 132, 198, 0.12);
  background:
    radial-gradient(120% 90% at 22% 14%, rgba(53, 82, 136, 0.5), rgba(8, 12, 29, 0.92) 56%),
    radial-gradient(90% 80% at 85% 88%, rgba(32, 52, 96, 0.35), rgba(2, 5, 15, 0.95) 70%);
  overflow: hidden;
  border-radius: 12px;
}

.constellation-map::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at center, transparent 48%, rgba(2, 4, 12, 0.42) 100%);
}

:deep(.alumni-avatar) {
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  width: 64px;
  height: 64px;
  cursor: pointer;
  transition: transform 240ms ease-out, opacity 220ms ease-out;
}

:deep(.alumni-avatar-halo) {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--avatar-color) 0%, transparent 68%);
  opacity: 0.8;
  filter: blur(1px);
}

:deep(.alumni-avatar-image) {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid var(--avatar-color);
  box-shadow: 0 0 0 2px rgba(7, 13, 30, 0.82), 0 8px 18px rgba(0, 0, 0, 0.55), 0 0 22px var(--avatar-color);
}

:deep(.alumni-avatar-label) {
  position: absolute;
  left: 50%;
  bottom: -20px;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 10px;
  letter-spacing: 0.04em;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(4, 8, 20, 0.78);
  border: 1px solid var(--avatar-color);
  color: #eef4ff;
}

:deep(.alumni-avatar:hover),
:deep(.alumni-avatar.is-selected) {
  transform: translate(-50%, -50%) scale(1.1);
}

:deep(.alumni-avatar.is-selected .alumni-avatar-halo) {
  animation: avatar-halo-pulse 1.8s ease-in-out infinite;
}

:deep(.alumni-avatar:focus-visible) {
  outline: 2px solid #d9e9ff;
  outline-offset: 3px;
  border-radius: 50%;
}

@keyframes avatar-halo-pulse {
  0%,
  100% { opacity: 0.56; }
  50% { opacity: 0.95; }
}

@media (max-width: 767px) {
  .constellation-map {
    height: 68vh;
    min-height: 500px;
  }
}

@media (prefers-reduced-motion: reduce) {
  :deep(.alumni-avatar.is-selected .alumni-avatar-halo) {
    animation: none;
  }
}
</style>
