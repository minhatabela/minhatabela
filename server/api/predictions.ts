import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event)
  const user = await serverSupabaseUser(event)

  if (user) {
    const { data } = await client
      .from('simulacao')
      .select('*, partida(*, mandante(*), visitante(*), sede(*))')
      .eq('user_id', user.id)

    return data
  }

  return []
})
