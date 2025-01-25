import type { Tables } from "~/types/database.types"
import { simularPartida } from '../utils/simulacao'
const { partidas } = useApi()

const rodada_atual = 1

const simulacao = useLocalStorage('simulador', new Map<string, Tables<'simulacao'>>([]))


export const useSimulador = () => {


  // const { data, execute, status } = useAsyncData('simulacao', () => $fetch('api/simulacao', { method: 'POST', body: { oii: 'oooi' } }), { immediate: false, watch: [simulacao] })

  const jogosRodada = computed(() => {
    return filtraJogosRodada(partidas.value || [], rodada_atual)
  })

  // function simularPartida(partida: Jogo, clubeId: string, placar: number) {
  //   const partidaSimulada = simulacao.value.get(partida.id)
  //   const golsKey = clubeId === partida.mandante.id ? 'gols_mandante' : 'gols_visitante'
  //   if (partidaSimulada) {
  //     simulacao.value.set(partida.id, Object.assign(partidaSimulada, { [golsKey]: placar }))
  //   } else {
  //     simulacao.value.set(partida.id, Object.assign(partida, { [golsKey]: placar, status: 'simulada' }))
  //   }
  // }

  function removerSimulacao(partidaId: string) {
    simulacao.value.delete(partidaId)
  }

  return {
    jogosRodada,
    simulacao,
    simularPartida,
    removerSimulacao,
    rodada_atual
  }
}
