import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async event => {
  const client = serverSupabaseServiceRole(event)
  const user = await serverSupabaseUser(event)
  const { id } = await readBody(event)

  if (user && id) {
    console.log(id)
    const { data } = await client.from('simulacao').delete().eq('id', id)

    return data
  }

  return []
})
