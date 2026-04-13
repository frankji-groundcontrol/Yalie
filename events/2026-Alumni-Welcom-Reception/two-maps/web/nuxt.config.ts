import { defineNuxtConfig } from "nuxt/config";

const config = {
  // WARNING: Binding to 0.0.0.0 is not technically recommended for general use.
  // This is set only for workshop facility — allows LAN access from participants' devices.
  compatibilityDate: "2026-04-11",
  devServer: { host: '0.0.0.0' },
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      exclude: ["#app-manifest", "#build/route-rules.mjs"]
    }
  },
  modules: ["@nuxtjs/tailwindcss"],
  css: [
    "leaflet/dist/leaflet.css",
    "leaflet.markercluster/dist/MarkerCluster.css",
    "leaflet.markercluster/dist/MarkerCluster.Default.css"
  ],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            /* Shared */
            "dream-white": "#EBE8E5",
            "surrealist-black": "#1A1410",
            "warm-stone": "#8B7355",
            "suit-charcoal": "#3D3D3D",
            /* Dalí palette — Alumni Journey */
            "catalan-gold": "#E1B662",
            "melting-orange": "#E1A030",
            "dali-brown": "#9B6845",
            "port-lligat": "#96B2DF",
            "catalan-sunset": "#D35400",
            /* Magritte palette — Local Guide */
            "magritte-sky": "#7BA7BC",
            "apple-green": "#5A7A4A",
            "twilight-slate": "#4A5568",
            "night-shadow": "#1A1F2E",
            "streetlamp-amber": "#C4922A"
          },
          fontFamily: {
            heading: ["Cormorant Garamond", "Noto Serif SC", "serif"],
            body: ["Inter", "Noto Sans SC", "sans-serif"]
          }
        }
      }
    }
  },
  app: {
    head: {
      title: "Yale Alumni · Two Maps",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Alumni Journey Map & Local Guide Map — Yale Shanghai Reception 2026"
        }
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "" as const
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap"
        }
      ]
    }
  }
};

export default defineNuxtConfig(config);
