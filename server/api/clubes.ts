import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event)

  const { data } = await client.from('clube').select().eq('archived', false)

  return data
})
