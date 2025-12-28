import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event)
  const user = await serverSupabaseUser(event)

  const { matches } = await readBody(event)

  if (!user || user.user_metadata.role !== 'admin') return
  if (!matches || matches.length !== 380) return

  const { data } = await client.from('partida').insert(matches)

  return data
})
