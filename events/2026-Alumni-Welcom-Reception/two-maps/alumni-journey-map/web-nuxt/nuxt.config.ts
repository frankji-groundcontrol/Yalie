import { defineNuxtConfig } from "nuxt/config";

const config = {
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            "dream-white": "#EBE8E5",
            "catalan-gold": "#E1B662",
            "melting-orange": "#E1A030",
            "dali-brown": "#9B6845",
            "port-lligat": "#96B2DF",
            "surrealist-black": "#1A1410",
            "warm-stone": "#8B7355",
            "suit-charcoal": "#3D3D3D",
            "catalan-sunset": "#D35400"
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
      title: "Yale Alumni Journey Map",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "From Yale pathways to global impact, now connected in Shanghai"
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
