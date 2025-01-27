import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = serverSupabaseServiceRole(event)

  const body = await readBody(event)

  // const { data } = await client.from('clube').upsert(simulacoes)

  return body
})
