// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    "nuxt-lodash",
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    'nuxt-gtag',
    '@nuxtjs/supabase',
    '@nuxthub/core',
    '@nuxt/icon',
    '@nuxt/scripts'
  ],
  supabase: {
    redirect: false
  },
  runtimeConfig: {
    public: {
      adsenseId: process.env.GOOGLE_ADSENSE_ID
    }
  },
  pages: true,
  ssr: true,
  routeRules: {
    '/simular': { ssr: false },
    '/': { ssr: true }

  },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: "./favicon.svg" }]
    }
  }
})