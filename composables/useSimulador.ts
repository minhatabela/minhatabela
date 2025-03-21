import type { Tables } from "~/types/database.types"
import { simularPartida } from '../utils/simulacao'
import { filtraJogosRodada } from "../utils/tabela"
const { partidas } = useApi()
const toast = useToast()

const rodada_atual = 1

const simulacao = useLocalStorage('simulador', new Map<string, Tables<'simulacao'>>([]))
const syncing = ref(false)

export const useSimulador = () => {

  const rodada_navegavel = ref(rodada_atual)

  const { data: simulacoes, execute, refresh, status } = useLazyAsyncData('simulacoes', async () => {
    const client = useSupabaseClient()
    return await client.from('simulacao').select('id, partida, gols_visitante, gols_mandante')
  },
    {
      immediate: false,
      transform: (response) => response.data,
      default: () => []
    })

  watch(status, async (value) => {
    if (value === 'success' && useSupabaseUser().value) {
      const simulacoesIdsLocal = Array.from(simulacao.value.keys())
      const simulacoesIdsNuvem = simulacoes.value.map(sim => sim.partida)
      const diff = simulacoesIdsLocal.filter(f => !simulacoesIdsNuvem.includes(f))

      const sims = diff.map(m => {
        return Object.assign(
          simulacao.value.get(m),
          { id: crypto.randomUUID() }
        )
      })

      if (diff.length) {
        await salvarMuitasSimulacoes(sims)
        await refresh()
      }

      const map = simulacoes.value.map(simulacao => [simulacao.partida, simulacao])
      simulacao.value = new Map(map)
    }
  })

  const jogosRodada = computed(() => {
    return filtraJogosRodada(partidas.value || [], rodada_navegavel.value)
  })


  async function removerSimulacao(partidaId: string) {
    const client = useSupabaseClient()
    const user = useSupabaseUser()

    simulacao.value.delete(partidaId)

    if (user.value) {
      syncing.value = true;
      const { error } = await client.from('simulacao').delete().eq('partida', partidaId)

      if (error) {
        toast.add({ description: 'Erro ao deletar simulação', color: 'error' })
      }
    }
    syncing.value = false;


  }

  async function salvarMuitasSimulacoes(simulacoes: Tables<'simulacao'>[]) {
    const client = useSupabaseClient()

    const { error } = await client.from('simulacao').insert(simulacoes)
    if (!error) {
      toast.add({ description: "Simulações foram sincronizadas", color: 'success' })
    }
  }

  async function salvarSimulacao(simulada: Tables<'simulacao'>) {
    const client = useSupabaseClient()
    const user = useSupabaseUser()

    simularPartida(simulada as Partial<Tables<'simulacao'>>, simulacao)


    if (user.value) {
      syncing.value = true;
      const { error, data } = await client.from('simulacao').upsert(simulada, { returning: 'minimal' }).select('id')

      if (data?.length) {
        simulacao.value.get(simulada.partida).id = data[0].id
      }
      if (error) {
        toast.add({ description: 'Erro ao salvar simulação', color: 'error' })
      }
      syncing.value = false
    }
  }

  return {
    jogosRodada,
    simulacao,
    simularPartida,
    removerSimulacao,
    rodada_navegavel,
    salvarSimulacao,
    syncing,
    // getAllSimulacoes,
    execute,
    simulacoes
  }
}
