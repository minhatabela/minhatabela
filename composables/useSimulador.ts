

const { data } = await useLazyAsyncData(
  'jogos',
  () => $fetch(
    'https://api.gcn.ge.globo.com/api/simuladores/estado-campeonato/campeonato-brasileiro/campeonato-brasileiro-2024/', {
    method: 'GET'
  }),

)

const { equipes, jogos, sedes, rodada_atual } = data?.value || { equipes: {}, jogos: {}, sedes: {}, rodada_atual: 0 }

export const useSimulador = () => {
  const columns = computed(() => {
    const { width } = useWindowSize()

    const columnsMobile = [
      {
        label: '#',
        key: 'posicao'
      }, {
        label: 'Clube',
        key: 'equipe'
      }, {
        label: 'PTS',
        key: 'pontos'
      }, {
        label: 'P',
        key: 'partidas'
      }, {
        label: 'SG',
        key: 'diferenca_gols'
      }
    ]

    if (width.value < 768) {
      return columnsMobile
    }

    return columnsMobile.concat([
      {
        label: 'V',
        key: 'vitorias'
      },
      {
        label: 'E',
        key: 'empates'
      },
      {
        label: 'D',
        key: 'derrotas'
      },

      {
        label: 'GP',
        key: 'gols_pro'
      },
      {
        label: 'GC',
        key: 'gols_contra'
      },
    ])

  })

  return {
    equipes,
    jogos,
    sedes,
    rodada_atual: toRef(rodada_atual),
    columns
  }
}
