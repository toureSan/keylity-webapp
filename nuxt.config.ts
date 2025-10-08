
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: process.env.NODE_ENV === "development" },
  css: ['~/assets/css/main.css'],
  modules: [
    "nuxt-icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
  ],
  vite: {
    optimizeDeps: {
      include: ["gsap"],
    },
    plugins: [
      tailwindcss(),
    ],

  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || (process.env.NODE_ENV === 'production' ? 'https://keylity-backend-api-production.up.railway.app/api' : 'http://localhost:3000/api'),
      appUrl: process.env.NUXT_PUBLIC_APP_URL || (process.env.NODE_ENV === 'production' ? 'https://keylity.ch' : 'http://localhost:4000'),
    },
  },
  app: {
    head: {
      title: "Keylity",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        {
          rel: "icon",
          href: "/favicon.ico",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700&display=swap",
        },
      ],
    },
  },

  ssr: true,
  nitro: {
    preset: "netlify",
    routeRules: {
      "/api/**": {
        proxy:
          (process.env.NUXT_PUBLIC_API_BASE || (process.env.NODE_ENV === 'production' ? 'https://keylity-backend-api-production.up.railway.app/api' : 'http://localhost:3000/api')) +
          "/**",
        cors: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  devServer: {
    port: 4000,
  },
});
