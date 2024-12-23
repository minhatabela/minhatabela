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

export const useApi = () => {
  return { data }
}
