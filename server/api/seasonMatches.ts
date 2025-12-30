import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event)
  const user = await serverSupabaseUser(event)
  const rodada = getRouterParam(event, 'rodada')

  if (!user || user.user_metadata.role !== 'admin') return

  const { data } = await client
    .from('partida')
    .select('*, visitante(*), mandante(*), sede(*)')
    .match(rodada ? { rodada } : {})
    .eq('season', 2026)
    .order('rodada')
    .order('gols_mandante', { ascending: true, nullsFirst: true })
    .order('gols_visitante', { ascending: true, nullsFirst: true })

  return data
})
