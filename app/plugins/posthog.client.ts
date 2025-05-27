import { defineNuxtPlugin } from '#app'
import posthog from 'posthog-js'

export default defineNuxtPlugin(nuxtApp => {
  const user = useSupabaseUser()
  const runtimeConfig = useRuntimeConfig()
  const posthogClient = posthog.init(runtimeConfig.public.posthogPublicKey, {
    api_host: runtimeConfig.public.posthogHost,
    person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
    capture_pageview: false, // we add manual pageview capturing below
    loaded: posthog => {
      if (import.meta.env.MODE === 'development') posthog.debug()
    }
  })

  //identify the user
  if (user.value) {
    posthogClient.identify(user.value.id, {
      email: user.value.email,
      name: user.value.user_metadata.full_name
    })
  }

  // Make sure that pageviews are captured with each route change
  const router = useRouter()
  router.afterEach(to => {
    nextTick(() => {
      posthog.capture('$pageview', {
        current_url: to.fullPath
      })
    })
  })

  return {
    provide: {
      posthog: () => posthogClient
    }
  }
})
