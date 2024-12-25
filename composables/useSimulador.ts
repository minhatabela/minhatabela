
const { data, partidas } = useApi()

const rodada_atual = 1

const simulacao = useLocalStorage('simulador', new Map([]))

export const useSimulador = () => {
  const jogosRodada = computed(() => {
    return filtraJogosRodada(partidas.value || [], rodada_atual)
  })

  function updatePlacarSimuladoMandante(jogoId: number, placarSimuladoMandante: number) {
    if (simulacao.value.has(jogoId)) {
      simulacao.value.set(jogoId, Object.assign(simulacao.value.get(jogoId), { placarSimuladoMandante }))
    } else {
      simulacao.value.set(jogoId, { placarSimuladoMandante })
    }
  }

  function updatePlacarSimuladoVisitante(jogoId: number, placarSimuladoVisitante: number) {
    if (simulacao.value.has(jogoId)) {
      simulacao.value.set(jogoId, Object.assign(simulacao.value.get(jogoId), { placarSimuladoVisitante }))
    } else {
      simulacao.value.set(jogoId, { placarSimuladoVisitante })
    }

  }

  return {
    jogosRodada,
    simulacao,
    updatePlacarSimuladoMandante,
    updatePlacarSimuladoVisitante
  }
}
