import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const rodada = parseInt(event?.context?.params?.rodada) as number

  if (!Number.isInteger(rodada) || !(rodada > 0 && rodada < 39)) {
    throw createError({ statusCode: 400, statusMessage: 'Rodada inválida' })
  }

  const { data } = await client.from('partida').select('numero, hora, rodada, data, visitante:visitante(slug), mandante:mandante(slug), sede:sede(nome_popular)',).eq('rodada', rodada)
  const response = await $fetch(`http://www.cbf.com.br/api/proxy?path=/jogos/campeonato/12606/rodada/${rodada}/fase`, {
    method: 'GET'
  })
  console.log("🚀 ~ defineEventHandler ~ event:", event)
  return event //diff(data?.map(mapPartidaMT).sort((a, b) => a.numero < b.numero ? 1 : -1), response["jogos"][0]["jogo"].map(mapPartidaCBF).sort((a, b) => a.numero < b.numero ? 1 : -1)) //data?.map(mapPartidaMT) //response["jogos"][0]["jogo"].map(mapPartida)
})
