
const { data, partidas } = useApi()

const rodada_atual = 1

const simulacao = useLocalStorage('simulador', new Map([]))

export const useSimulador = () => {
  const jogosRodada = computed(() => {
    return filtraJogosRodada(partidas.value || [], rodada_atual)
  })

  function updatePlacarSimuladoMandante(jogoId: number, clubeId: string, placarSimuladoMandante: number) {
    if (simulacao.value.has(jogoId)) {
      simulacao.value.set(jogoId, Object.assign(simulacao.value.get(jogoId), { [clubeId]: placarSimuladoMandante }))
    } else {
      simulacao.value.set(jogoId, { [clubeId]: placarSimuladoMandante })
    }
  }

  function updatePlacarSimuladoVisitante(jogoId: number, clubeId: string, placarSimuladoVisitante: number) {
    if (simulacao.value.has(jogoId)) {
      simulacao.value.set(jogoId, Object.assign(simulacao.value.get(jogoId), { [clubeId]: placarSimuladoVisitante }))
    } else {
      simulacao.value.set(jogoId, { [clubeId]: placarSimuladoVisitante })
    }

  }

  return {
    jogosRodada,
    simulacao,
    updatePlacarSimuladoMandante,
    updatePlacarSimuladoVisitante
  }
}
