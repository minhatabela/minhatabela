import { serverSupabaseClient } from '#supabase/server'
import diff from 'microdiff'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { data } = await client.from('partida').select('numero, hora, rodada, data, visitante:visitante(slug), mandante:mandante(slug), sede:sede(nome_popular)',).eq('rodada', '5')
  const response = await $fetch('http://www.cbf.com.br/api/proxy?path=/jogos/campeonato/12606/rodada/5/fase', {
    method: 'GET'
  })
  console.log("🚀 ~ defineEventHandler ~ response:", response.jogos.jogo)
  return diff(data?.map(mapPartidaMT).sort((a, b) => a.numero < b.numero ? 1 : -1), response["jogos"][0]["jogo"].map(mapPartidaCBF).sort((a, b) => a.numero < b.numero ? 1 : -1)) //data?.map(mapPartidaMT) //response["jogos"][0]["jogo"].map(mapPartida)
})
