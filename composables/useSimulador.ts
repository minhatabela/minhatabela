import { calculaStatsEquipe, filtraJogosRodada } from "~/utils/tabela"

const { data } = useAsyncData(
  'jogos',
  () => $fetch(
    'https://api.gcn.ge.globo.com/api/simuladores/estado-campeonato/campeonato-brasileiro/campeonato-brasileiro-2024/', {
    method: 'GET'
  }),
  {
    default: () => { return { equipes: {}, rodada_atual: 0, sedes: {}, jogos: {} } }
  }
)

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

  const jogosRodada = computed(() => {
    return filtraJogosRodada(Object.values(data.value.jogos), data.value.rodada_atual)
  })

  const statsByEquipe = computed(() => {
    return Object.keys(data?.value?.equipes || {}).map(Number).map(equipeId => calculaStatsEquipe(Object.values(data.value.jogos), equipeId))
  })

  const tabela = computed(() => {
    return useOrderBy(statsByEquipe.value, ['pontos', 'vitorias', 'diferenca_gols', 'gols_pro'], ['desc', 'desc', 'desc', 'desc'])
  })

  return {
    columns,
    data,
    jogosRodada,
    tabela
  }
}
