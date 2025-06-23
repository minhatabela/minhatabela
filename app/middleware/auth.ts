export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser()

  if (user.value?.user_metadata.role !== 'admin') {
    return abortNavigation()
  }
})
