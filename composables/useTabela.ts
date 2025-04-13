import { TableViewEnum } from "~/types/TableView.enum"
import { calculaStatsEquipe } from "~/utils/tabela"

const { partidas, clubes } = useApi()
const { simulacao } = useSimulador()

const tableView = ref(TableViewEnum.OFICIAL_SIMULADA)


export const useTabela = () => {

  const columns = computed(() => {
    const { width } = useWindowSize()

    const columnsMobile = [
      {
        header: '#',
        accessorKey: 'posicao'
      }, {
        header: 'Clube',
        accessorKey: 'equipe'
      }, {
        header: 'PTS',
        accessorKey: 'pontos'
      }, {
        header: 'P',
        accessorKey: 'partidas'
      }, {
        header: 'SG',
        accessorKey: 'diferenca_gols'
      },
      
    ]

    if (width.value < 768) {
      return columnsMobile
    }

    return columnsMobile.concat([
      {
        header: 'V',
        accessorKey: 'vitorias'
      },
      {
        header: 'E',
        accessorKey: 'empates'
      },
      {
        header: 'D',
        accessorKey: 'derrotas'
      },

      {
        header: 'GP',
        accessorKey: 'gols_pro'
      },
      {
        header: 'GC',
        accessorKey: 'gols_contra'
      },
      {
        header: '%',
        accessorKey: 'aproveitamento',
      }
    ]).map((coluna, index) => Object.assign(coluna, { id: index.toString() }))

  })


  const statsByEquipe = computed(() => {
    return clubes.value?.map((clube) => calculaStatsEquipe(partidas.value || [], clube, simulacao.value, tableView.value))
  })

  const tabela = computed(() => {
    return useOrderBy(statsByEquipe.value, ['pontos', 'vitorias', 'diferenca_gols', 'gols_pro'], ['desc', 'desc', 'desc', 'desc'])
  })

  return {
    columns,
    tabela,
    clubes,
    tableView
  }
}
