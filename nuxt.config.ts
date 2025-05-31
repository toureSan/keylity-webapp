export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "@nuxtjs/color-mode"],
  vite: {
    optimizeDeps: {
      include: ["gsap"],
    },
  },
  app: {
    head: {
      title: "Keylity",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],

      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap",
        },
        {
          rel: "icon",
          href: "/favicon.ico",
        },
      ],
    },
  },
  css: ["~/assets/css/fonts.css"],
  ssr: true,
  nitro: {
    preset: "netlify",
  },
});
