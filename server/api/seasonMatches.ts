import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event)
  const user = await serverSupabaseUser(event)
  const rodada = getRouterParam(event, 'rodada')
  const mandante = getRouterParam(event, 'homeTeam')

  if (!user || user.user_metadata.role !== 'admin') return

  const filters: Record<string, any> = {}
  if (rodada) filters.rodada = rodada
  if (mandante) filters.mandante = mandante

  const { data } = await client
    .from('partida')
    .select('*, visitante(*), mandante(*), sede(*)')
    .match(filters)
    .eq('season', 2026)
    .order('rodada')
    .order('gols_mandante', { ascending: true, nullsFirst: true })
    .order('gols_visitante', { ascending: true, nullsFirst: true })

  return data
})
