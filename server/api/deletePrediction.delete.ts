import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'
import { PredictedMatch } from '~~/layers/predictions/domain/entities/PredictedMatch'

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event)
  const user = await serverSupabaseUser(event)
  const predictionId = getRouterParam(event, 'predictionId')

  if (user) {
    let { data } = await client
      .from('simulacao')
      .delete()
      .eq('id', predictionId!)

    return data
  }

  return []
})