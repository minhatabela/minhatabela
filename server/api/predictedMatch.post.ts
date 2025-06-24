import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event)
  const user = await serverSupabaseUser(event)
  const { match } = await readBody(event)

  const record = {
    id: match.predictedMatchId,
    user_id: user?.id,
    partida: match.id,
    gols_mandante: match.homeGoals,
    gols_visitante: match.awayGoals
  }

  console.log(record)
  // console.log(prediction.toString())

  if (user) {
    const { data } = await client.from('simulacao').upsert([record])

    return data
  }

  return []
})
