import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event)
  const user = await serverSupabaseUser(event)
  const predictionId = getRouterParam(event, 'predictionId')

  if (user) {
    const { data } = await client.from('simulacao').delete().eq('id', predictionId!)

    return data
  }

  return []
})
