import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event)
  const rodada = getRouterParam(event, 'rodada')

  const { data } = await client
    .from('partida')
    .select('*, visitante(*), mandante(*), sede(*)')
    .not('rodada', 'is', null)
    .match(rodada ? { rodada } : {})
    .eq('season', 2026)

  return data
})
