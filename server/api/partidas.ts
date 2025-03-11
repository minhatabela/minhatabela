import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event)
  const rodada = getRouterParam(event, 'rodada')

  let { data } = await client
    .from('partida')
    .select('*, visitante(*), mandante(*), sede(*)')
    .match(rodada ? { rodada } : {})
    .order('numero')

  return data
})
