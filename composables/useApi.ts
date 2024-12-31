const { data } = useAsyncData(
  'jogos',
  () => $fetch<{ equipes: object, rodada_atual: number, sedes: object, jogos: object }>(
    '/api/ge', {
    method: 'GET'
  }),
  {
    default: () => { return { equipes: {}, rodada_atual: 0, sedes: {}, jogos: {} } }
  }
)

const { data: partidas } = useAsyncData('partidas', () => $fetch('/api/partidas'), { default: () => [] })
const { data: clubes } = useAsyncData('clubes', () => $fetch('/api/clubes'), { default: () => [] })




export const useApi = () => {
  return { data, partidas, clubes }
}
