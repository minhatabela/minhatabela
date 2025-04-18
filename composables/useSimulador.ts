import type { Tables } from "~/types/database.types"
import { simularPartida } from '../utils/simulacao'
import { filtraJogosRodada } from "../utils/tabela"
const { partidas } = useApi()
const toast = useToast()


const simulacao = useLocalStorage('simulador', new Map<string, Tables<'simulacao'>>([]))
const syncing = ref(false)

export const useSimulador = () => {
  const { $posthog } = useNuxtApp()
  const rodada = ref<number | undefined>(undefined)

  const rodada_navegavel = computed({
    get() {
      return rodada.value || useOrderBy(partidas.value.filter(partida => !isDefined(partida.gols_mandante) && !isDefined(partida.gols_visitante)), (o) => o.data)[0]?.rodada
    },
    set(v) {
      rodada.value = v
    }
  })

  // const { data: _rodada_atual, execute: getRodadaAtual } = useLazyAsyncData('rodada_atual', () => $fetch('/api/rodadaAtual'), { immediate: false })


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
    return useOrderBy(filtraJogosRodada(partidas.value || [], rodada_navegavel.value), (o) => isDefined(o.data) && isDefined(o.hora) ? new Date(o?.data || 0).setHours(...o?.hora?.split(':')) : 0)
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
    if ($posthog) $posthog().capture('simulador:manual', { simulada })
  }


  return {
    jogosRodada,
    simulacao,
    simularPartida,
    removerSimulacao,
    rodada_navegavel,
    salvarSimulacao,
    syncing,
    execute,
    simulacoes
  }
}
