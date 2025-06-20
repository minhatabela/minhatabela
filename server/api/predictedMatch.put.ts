import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'
import { PredictedMatch } from '~~/layers/predictions/domain/entities/PredictedMatch'

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event)
  const user = await serverSupabaseUser(event)
  const { predictedMatchId, homeGoals, awayGoals } = await readBody(event) as PredictedMatch

  if (user) {
    let { data } = await client
      .from('simulacao')
      .update({ gols_mandante: homeGoals, gols_visitante: awayGoals })
      .eq('id', predictedMatchId)

    return data
  }

  return []
})
