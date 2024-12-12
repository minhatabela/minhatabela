

const { data } = await useAsyncData(
  'jogos',
  () => $fetch(
    'https://api.gcn.ge.globo.com/api/simuladores/estado-campeonato/campeonato-brasileiro/campeonato-brasileiro-2024/', {
    method: 'GET'
  }),
  { lazy: true }
)

const { equipes, jogos, sedes, rodada_atual } = data?.value || { equipes: {}, jogos: {}, sedes: {}, rodada_atual: 0 }

export const useSimulador = () => {
  return {
    equipes,
    jogos,
    sedes,
    rodada_atual: toRef(rodada_atual)
  }
}
