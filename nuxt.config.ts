export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxtjs/color-mode'],
  vite: {
    optimizeDeps: {
      include: ['gsap'], 
    },
  },
  app: {
    head: {
      title: 'Keylity',
      meta: [
<<<<<<< HEAD
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'format-detection', content: 'telephone=no' },
        { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
        { 'http-equiv': 'X-Frame-Options', content: 'DENY' },
        { 'http-equiv': 'X-XSS-Protection', content: '1; mode=block' },
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
        { name: 'Content-Security-Policy', content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' ${process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000/api'}" }
=======
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
>>>>>>> origin/main
      ],
  
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap'
        },
        {
          rel: 'icon',
          href: '/favicon.ico'
        }
      ]
    }
  },
<<<<<<< HEAD
  devServer: {
    port: 4000
=======
  css: ['~/assets/css/fonts.css'],
  ssr: true,
  nitro: {
    preset: 'netlify'
>>>>>>> origin/main
  }
})
