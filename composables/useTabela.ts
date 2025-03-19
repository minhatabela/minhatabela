import { calculaStatsEquipe } from "~/utils/tabela"

const { partidas, clubes } = useApi()
const { simulacao } = useSimulador()

export const useTabela = () => {

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
    ]).map((coluna, index) => Object.assign(coluna, { id: index }))

  })


  const statsByEquipe = computed(() => {
    return clubes.value?.map((clube) => calculaStatsEquipe(partidas.value || [], clube, simulacao.value))
  })

  const tabela = computed(() => {
    return useOrderBy(statsByEquipe.value, ['pontos', 'vitorias', 'diferenca_gols', 'gols_pro'], ['desc', 'desc', 'desc', 'desc'])
  })

  return {
    columns,
    tabela,
    clubes
  }
}
