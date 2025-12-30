// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4
  },
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
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    'nuxt-gtag',
    '@nuxtjs/supabase',
    '@nuxthub/core',
    '@nuxt/icon',
    '@nuxtjs/seo',
    'nuxt-og-image',
    '@nuxt/test-utils/module',
    '@nuxt/eslint',
    '@pinia/nuxt'
  ],
  supabase: {
    redirect: false
  },
  runtimeConfig: {
    public: {
      adsenseId: process.env.GOOGLE_ADSENSE_ID,
      posthogPublicKey: process.env.POSTHOG_PKEY,
      posthogHost: process.env.POSTHOG_HOST
    }
  },
  pages: true,
  ssr: true,
  routeRules: {
    '/simular': { ssr: false },
    '/': { ssr: true },
    '/admin/consistencia': { ssr: false },
    '/admin/partidas': { ssr: false },
    '/generate': { ssr: false },
    '/matches': { ssr: false }
  },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'https://atsavbpgqgsvxwlzvrwy.supabase.co/storage/v1/object/public/seo//logo.svg'
        }
      ]
    }
  }
})
