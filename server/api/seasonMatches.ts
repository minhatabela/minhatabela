import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event)
  const rodada = getRouterParam(event, 'rodada')

  const { data } = await client
    .from('partida')
    .select('*, visitante(*), mandante(*), sede(*)')
    .match(rodada ? { rodada } : {})
    .eq('season', new Date().getFullYear())

  return data
})
