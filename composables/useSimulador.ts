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
    columns,
  }
}
