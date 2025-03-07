import { serverSupabaseClient } from '#supabase/server'
import diff from 'microdiff'
import { Jogo } from '~/types/jogo'

interface ClubeCBF {
  nome: string,
  gols?: number,
}

interface PartidaCBF {
  num_jogo: string,
  rodada: string,
  mandante: ClubeCBF,
  visitante: ClubeCBF,
  local: string,
  data: string,
  hora: string
}

interface PartidaNormalizada {
  numero?: number
  rodada: number
  mandante: string
  visitante: string
  sede?: string
  data?: string
  hora?: string
}

function mapPartidaCBF(partida: PartidaCBF): PartidaNormalizada {
  return {
    numero: Number(partida.num_jogo),
    rodada: Number(partida.rodada),
    mandante: partida.mandante.nome,
    visitante: partida.visitante.nome,
    sede: partida.local === " -  - " ? undefined : partida.local,
    data: partida.data === "A Definir" ? undefined : partida.data,
    hora: partida.hora || undefined
  }
}

function mapPartidaMT(partida: Jogo): PartidaNormalizada {
  return {
    numero: partida.numero || undefined,
    rodada: partida.rodada,
    data: partida.data || undefined,
    hora: partida.hora || undefined,
    visitante: partida.visitante.slug,
    mandante: partida.mandante.slug,
    sede: partida.sede.nome_popular || undefined
  }
}

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const { data } = await client.from('partida').select('numero, hora, rodada, data, visitante:visitante(slug), mandante:mandante(slug), sede:sede(nome_popular)',).eq('rodada', '1')
  const response = await $fetch('http://www.cbf.com.br/api/proxy?path=/jogos/campeonato/12606/rodada/1/fase', {
    method: 'GET'
  })
  console.log("🚀 ~ defineEventHandler ~ response:", response.jogos.jogo)
  return diff(response["jogos"][0]["jogo"].map(mapPartidaCBF).sort((a, b) => a.numero < b.numero ? 1 : -1), data?.map(mapPartidaMT).sort((a, b) => a.numero < b.numero ? 1 : -1)) //data?.map(mapPartidaMT) //response["jogos"][0]["jogo"].map(mapPartida)
})
