// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    "nuxt-lodash",
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/fonts'
  ],
  pages: true,
  ssr: false
})