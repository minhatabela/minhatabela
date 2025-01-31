import type { Tables } from "~/types/database.types"
import { simularPartida } from '../utils/simulacao'
const { partidas } = useApi()
const toast = useToast()

const rodada_atual = 1

const simulacao = useLocalStorage('simulador', new Map<string, Tables<'simulacao'>>([]))
const syncing = ref(false)

export const useSimulador = () => {

  const jogosRodada = computed(() => {
    return filtraJogosRodada(partidas.value || [], rodada_atual)
  })


  async function removerSimulacao(partidaId: string) {
    const client = useSupabaseClient()
    const user = useSupabaseUser()

    simulacao.value.delete(partidaId)

    if (user.value) {
      syncing.value = true;
      const { error } = await client.from('simulacao').delete().eq('partida', partidaId)

      if (error) {
        toast.add({ description: 'Erro ao deletar simulação', color: 'red' })
      }
    }
    syncing.value = false;


  }

  async function salvarSimulacao(simulada: Tables<'simulacao'>) {
    const client = useSupabaseClient()
    const user = useSupabaseUser()

    simularPartida(simulada as Partial<Tables<'simulacao'>>, simulacao)


    if (user.value) {
      syncing.value = true;
      const { error } = await client.from('simulacao').upsert(simulada, { returning: 'minimal' })

      if (error) {
        toast.add({ description: 'Erro ao salvar simulação', color: 'red' })
      }
      syncing.value = false
    }
  }

  async function getAllSimulacoes() {
    syncing.value = true;
    const client = useSupabaseClient()
    const { error, data } = await client.from('simulacao').select('id, partida, gols_visitante, gols_mandante')
    if (error) {
      toast.add({ description: 'Erro ao salvar simulação', color: 'red' })
    } else {
      const map = data.map(simulacao => [simulacao.partida, simulacao])
      simulacao.value = new Map(map)
      console.log('simulações: ', data)
    }
    syncing.value = false
  }

  return {
    jogosRodada,
    simulacao,
    simularPartida,
    removerSimulacao,
    rodada_atual,
    salvarSimulacao,
    syncing,
    getAllSimulacoes
  }
}
