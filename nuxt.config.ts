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
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  css: ['~/public/main.css'],
  modules: [
    '@nuxt/ui',
    "nuxt-lodash",
    '@vueuse/nuxt',
    '@nuxt/fonts',
    'nuxt-gtag',
    '@nuxtjs/supabase',
    '@nuxthub/core',
    '@nuxt/icon',
    '@nuxtjs/seo',
    'nuxt-og-image',
    '@nuxt/test-utils/module'
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
    '/': { ssr: true },
    '/admin/consistencia': { ssr: false },
  },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: "https://atsavbpgqgsvxwlzvrwy.supabase.co/storage/v1/object/public/seo//logo.svg" }]
    }
  }
})