import { defineNuxtConfig } from 'nuxt/config';

const config = {
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            'dream-white': '#EBE8E5',
            'magritte-sky': '#7BA7BC',
            'apple-green': '#5A7A4A',
            'twilight-slate': '#4A5568',
            'night-shadow': '#1A1F2E',
            'streetlamp-amber': '#C4922A',
            'surrealist-black': '#1A1410',
            'warm-stone': '#8B7355',
            'suit-charcoal': '#3D3D3D'
          },
          fontFamily: {
            heading: ['Cormorant Garamond', 'Noto Serif SC', 'serif'],
            body: ['Inter', 'Noto Sans SC', 'sans-serif']
          }
        }
      }
    }
  },
  app: {
    head: {
      title: 'Shanghai Local Guide Map',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A practical and cultural guide to Shanghai for Yale alumni' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap' }
      ]
    }
  }
};

export default defineNuxtConfig(config as Parameters<typeof defineNuxtConfig>[0]);
