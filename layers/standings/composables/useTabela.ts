import { TableViewEnum } from '~~/layers/standings/enums/TableView.enum'
import { calculaStatsEquipe } from '../../../app/utils/tabela'

const { partidas, clubes } = useApi()
const { simulacao } = useSimulador()

const tableView = ref(TableViewEnum.OFICIAL_SIMULADA)

export const useTabela = () => {
  const { $posthog } = useNuxtApp()

  watch(tableView, newValue => {
    if ($posthog) $posthog().capture('classificacao:tabela-view', { tabela_view: newValue })
  })

  const columns = computed(() => {
    return [
      {
        header: '#',
        accessorKey: 'posicao'
      },
      {
        header: 'Clube',
        accessorKey: 'equipe'
      },
      {
        header: 'PTS',
        accessorKey: 'pontos'
      },
      {
        header: 'P',
        accessorKey: 'partidas'
      },
      {
        header: 'SG',
        accessorKey: 'diferenca_gols'
      },
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
        accessorKey: 'aproveitamento'
      }
    ].map((coluna, index) => Object.assign(coluna, { id: index.toString() }))
  })

  const statsByEquipe = computed(() => {
    return clubes.value?.map(clube =>
      calculaStatsEquipe(partidas.value || [], clube, simulacao.value, tableView.value)
    )
  })

  const tabela = computed(() => {
    return useOrderBy(
      statsByEquipe.value,
      ['pontos', 'vitorias', 'diferenca_gols', 'gols_pro'],
      ['desc', 'desc', 'desc', 'desc']
    )
  })

  return {
    columns,
    tabela,
    clubes,
    tableView
  }
}
