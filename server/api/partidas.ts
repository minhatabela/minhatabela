import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event)

  const { data } = await client.from('partida').select('*, visitante(*), mandante(*), sede(*)')

  return data
})
