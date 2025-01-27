import type { Tables } from "~/types/database.types";


export function simularPartida(simulacao: Partial<Tables<'simulacao'>>, simulador: Ref<Map<string, Tables<'simulacao'>>>) {

  const partidaSimulada = toValue(simulador).get(simulacao.partida)

  if (simulacao.gols_mandante === undefined && simulacao.gols_visitante === undefined) {
    simulador.value.delete(simulacao.partida)
    console.log('simulacao deletada')
  } else if (partidaSimulada) {
    partidaSimulada.gols_mandante = simulacao.gols_mandante
    partidaSimulada.gols_visitante = simulacao.gols_visitante
  } else {
    toValue(simulador).set(simulacao.partida, simulacao)
  }
}