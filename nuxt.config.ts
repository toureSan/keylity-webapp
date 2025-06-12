export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: process.env.NODE_ENV === 'development' },

  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@nuxtjs/color-mode", "@pinia/nuxt"],

  vite: {
    optimizeDeps: {
      include: ["gsap"],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NODE_ENV === 'production'
        ? 'https://keylity-backend-api-developpement.up.railway.app/api'
        : (process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api'),
      appUrl: process.env.NUXT_PUBLIC_APP_URL || (
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:4000'
          : 'https://keylity-dev.netlify.app'
      )
    }
  },

  app: {
    head: {
      title: "Keylity",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'format-detection', content: 'telephone=no' },
        // Remove CSP from here - use netlify.toml instead
      ],
      link: [
        {
          rel: "icon",
          href: "/favicon.ico",
        },
        // Add preconnect for Google Fonts
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com"
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: ""
        }
      ],
    },
  },

  css: ["~/assets/css/fonts.css"],
  ssr: true,

  nitro: {
    preset: "netlify",
    // Remove the proxy - let the frontend call the API directly
    // The CORS will be handled by your backend
  },

  devServer: {
    port: 4000 // Match your environment variable
  }
});