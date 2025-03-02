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
  modules: ['@nuxt/ui', "nuxt-lodash", '@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxt/fonts', 'nuxt-gtag', '@nuxtjs/supabase', '@nuxthub/core', '@nuxt/icon'],
  supabase: {
    redirect: false
  },
  gtag: {
    initCommands: [
      ['consent', 'default', {
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        ad_storage: 'denied',
        analytics_storage: 'denied',
        wait_for_update: 500,
      }]
    ]
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