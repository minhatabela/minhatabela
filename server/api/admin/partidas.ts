import { serverSupabaseClient } from '#supabase/server'
import orderBy from 'lodash/orderBy'
import diff, { DifferenceChange } from 'microdiff'
import { diffToObject, mapPartidaCBF, mapPartidaMT } from '../../utils/mapper'


export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { data: partidasMinhaTabela } = await client
    .from('partida')
    .select('numero, status, hora, rodada, data, gols_mandante, gols_visitante, visitante:visitante(*), mandante:mandante(*), sede:sede(*)')
    .order('numero')

    let response = {}
    try {
      response = await $fetch<{jogos: object[]}>(`http://www.cbf.com.br/api/proxy?path=/jogos/campeonato/12606`, {
        method: 'GET'
      })
    } catch (error) {
      throw createError({ statusCode: 500, statusMessage: 'Erro ao buscar dados da CBF' })
    }

    const cbf = orderBy(response['jogos'], (o) => Number(o.num_jogo)).map(mapPartidaCBF)

    const partidas = partidasMinhaTabela?.map((partida, index) => {
       const partidaDiff = diff(mapPartidaMT(partida), cbf[index])
       return {
        ...partida,
        inconsistencias: diffToObject(partidaDiff as DifferenceChange[])
       }
    })
  
  return partidas
})
