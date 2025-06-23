import { serverSupabaseClient } from '#supabase/server'
import orderBy from 'lodash/orderBy'
import diff, {type DifferenceChange } from 'microdiff'
import type { PartidaCriar } from '~/types/partida'
import { diffToObject, mapPartidaCBF, mapPartidaMT } from '../../utils/mapper'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient(event)
  const { data: partidasMinhaTabela } = await client
    .from('partida')
    .select(
      'id, numero, status, hora, rodada, data, gols_mandante, gols_visitante, visitante:visitante(*), mandante:mandante(*), sede:sede(*)'
    )
    .order('numero')

  const { data: clubes } = await client.from('clube').select('*')

  const { data: sedes } = await client.from('sede').select('*')

  const numerosPartidas = partidasMinhaTabela?.map(partida => partida.numero)

  let response = {}
  try {
    response = await $fetch<{ jogos: object[] }>(
      `http://www.cbf.com.br/api/proxy?path=/jogos/campeonato/12606`,
      {
        method: 'GET'
      }
    )
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: 'Erro ao buscar dados da CBF', message: error as string })
  }

  const cbf = orderBy(response['jogos'], o => Number(o.num_jogo)).map(mapPartidaCBF)

  const partidasParaCriar = cbf
    .filter(partida => !numerosPartidas?.includes(Number(partida.numero)))
    .map<PartidaCriar>(partida => {
      return {
        ...partida,
        mandante: clubes?.find(clube => clube.slug === partida.mandante),
        visitante: clubes?.find(clube => clube.slug === partida.visitante),
        sede: sedes?.find(sede => sede.key === partida.sede)
      }
    })

  const partidas = partidasMinhaTabela?.map((partida, index) => {
    const partidaDiff = diff(mapPartidaMT(partida), cbf[index])
    return {
      ...partida,
      inconsistencias: diffToObject(partidaDiff as DifferenceChange[])
    }
  })

  return {
    partidas: orderBy(partidas, o => Object.values(o.inconsistencias).length > 0, ['desc']),
    partidasParaCriar
  }
})
