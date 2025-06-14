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
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api',
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:8000'
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
      ],
      link: [
        {
          rel: "icon",
          href: "/favicon.ico"
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;700&display=swap"
        }
      ]
    },
  },
  css: ["~/assets/css/fonts.css"],
  ssr: true,
  nitro: {
    preset: "netlify",
    routeRules: {
      '/api/**': {
        proxy: (process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api') + '/**',
        cors: true,
        headers: {
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
          'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development'
            ? 'http://localhost:8000'
            : (process.env.NUXT_PUBLIC_APP_URL || 'https://keylity-webapp.netlify.app'),
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Max-Age': '86400',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
        }
      }
    }
  },
  devServer: {
    port: 8000
  }
});