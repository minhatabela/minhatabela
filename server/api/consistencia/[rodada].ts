import { serverSupabaseClient } from '#supabase/server'
import diff from 'microdiff'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient(event)
  let response = {}

  const rodada = parseInt(event?.context?.params?.rodada) as number

  if (!Number.isInteger(rodada) || !(rodada > 0 && rodada < 39)) {
    throw createError({ statusCode: 400, statusMessage: 'Rodada inválida' })
  }

  const { data } = await client
    .from('partida')
    .select(
      'numero, hora, rodada, data, gols_mandante, gols_visitante, visitante:visitante(slug), mandante:mandante(slug), sede:sede(key)'
    )
    .eq('rodada', rodada)
    .order('numero')

  try {
    response = await $fetch(
      `http://www.cbf.com.br/api/proxy?path=/jogos/campeonato/12606/rodada/${rodada}/fase`,
      {
        method: 'GET'
      }
    )
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Erro ao buscar dados da CBF' })
  }

  const minhatabela = Object.fromEntries(
    data
      ?.map(mapPartidaMT)
      .sort((a, b) => (a.numero < b.numero ? 1 : -1))
      .map(partida => [partida.numero, partida])
  )
  const oficial = Object.fromEntries(
    response['jogos'][0]['jogo']
      .map(mapPartidaCBF)
      .sort((a, b) => (a.numero < b.numero ? 1 : -1))
      .map(partida => [partida.numero, partida])
  )

  return diff(minhatabela, oficial) //diff(data?.map(mapPartidaMT).sort((a, b) => a.numero < b.numero ? 1 : -1), response["jogos"][0]["jogo"].map(mapPartidaCBF).sort((a, b) => a.numero < b.numero ? 1 : -1)) //data?.map(mapPartidaMT) //response["jogos"][0]["jogo"].map(mapPartida)
})
