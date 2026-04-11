<script setup lang="ts">
const props = defineProps<{
  activeView: "alumni" | "local";
  theme?: "alumni" | "local";
}>();

const themeClass = computed(() => `theme-${props.theme ?? props.activeView}`);

const options = [
  {
    key: "alumni",
    icon: "journey",
    label: "Journey",
    labelCn: "旅程",
    to: "/alumni"
  },
  {
    key: "local",
    icon: "local",
    label: "Local",
    labelCn: "本地",
    to: "/local"
  }
] as const;
</script>

<template>
  <nav class="map-mode-toggle" :class="themeClass" aria-label="Switch map experience">
    <NuxtLink
      v-for="option in options"
      :key="option.key"
      :to="option.to"
      class="toggle-option"
      :class="{ 'is-active': option.key === activeView }"
      :aria-current="option.key === activeView ? 'page' : undefined"
    >
      <span class="toggle-icon" aria-hidden="true">
        <svg v-if="option.icon === 'journey'" viewBox="0 0 24 24" fill="none">
          <path d="M5 18c3.2-6.4 6.8-9.6 14-12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          <path d="M14.5 6H19v4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="6" cy="18" r="1.7" fill="currentColor" />
          <circle cx="12.2" cy="12.8" r="1.5" fill="currentColor" opacity="0.78" />
          <circle cx="19" cy="6" r="1.7" fill="currentColor" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none">
          <path d="M12 21s6.2-5.55 6.2-11A6.2 6.2 0 0 0 5.8 10C5.8 15.45 12 21 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
          <circle cx="12" cy="10" r="2.2" fill="currentColor" />
          <path d="M18.2 18.2 21 21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </span>
      <span>{{ option.label }}</span>
      <small>{{ option.labelCn }}</small>
    </NuxtLink>
  </nav>
</template>

<style scoped>
.map-mode-toggle {
  display: inline-grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.3rem;
  margin-bottom: 1rem;
  padding: 0.3rem;
  border: 1px solid var(--toggle-border, rgba(155, 104, 69, 0.45));
  background: var(--toggle-shell, rgba(235, 232, 229, 0.7));
   box-shadow: var(--toggle-shadow, 0 14px 28px rgba(26, 20, 16, 0.1));
   backdrop-filter: blur(8px);
}

.toggle-option {
  display: grid;
  justify-items: center;
  gap: 0.12rem;
  min-width: 6.2rem;
  padding: 0.46rem 0.7rem;
  color: var(--toggle-text, var(--surrealist-black));
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background-color 180ms ease, color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
}

.toggle-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
}

.toggle-icon svg {
  width: 100%;
  height: 100%;
}

.toggle-option span {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.toggle-option small {
  font-size: 0.66rem;
  color: var(--toggle-subtle, rgba(26, 20, 16, 0.66));
}

.toggle-option:not(.is-active) {
  background: var(--toggle-option-bg, transparent);
}

.toggle-option:hover {
  transform: translateY(-1px);
}

.toggle-option.is-active {
  background: var(--toggle-active-bg, rgba(155, 104, 69, 0.12));
  color: var(--toggle-active-text, var(--surrealist-black));
  box-shadow: 0 10px 20px rgba(26, 20, 16, 0.12);
}

.toggle-option.is-active small {
  color: inherit;
}

.toggle-option:focus-visible {
  outline: 2px solid var(--toggle-focus, var(--catalan-gold));
  outline-offset: 2px;
}

.theme-alumni {
  --toggle-border: rgba(155, 104, 69, 0.7);
  --toggle-shell: rgba(247, 241, 232, 0.94);
  --toggle-shadow: 0 18px 34px rgba(70, 38, 18, 0.16);
  --toggle-text: var(--surrealist-black);
  --toggle-subtle: rgba(26, 20, 16, 0.72);
  --toggle-option-bg: rgba(255, 255, 255, 0.28);
  --toggle-active-bg: rgba(26, 20, 16, 0.92);
  --toggle-active-text: var(--dream-white);
  --toggle-focus: var(--catalan-gold);
}

.theme-local {
  --toggle-border: var(--twilight-slate);
  --toggle-shell: rgba(235, 244, 247, 0.92);
  --toggle-shadow: 0 18px 34px rgba(42, 72, 92, 0.14);
  --toggle-text: var(--twilight-slate);
  --toggle-subtle: var(--warm-stone);
  --toggle-option-bg: rgba(255, 255, 255, 0.42);
  --toggle-active-bg: var(--twilight-slate);
  --toggle-active-text: #ffffff;
  --toggle-focus: var(--magritte-sky);
}

@media (max-width: 767px) {
  .toggle-option {
    min-width: 5.5rem;
    padding-inline: 0.55rem;
  }
}
</style>
