import type { Tables } from "../../types/database.types";


export function simularPartida(simulacao: Partial<Tables<'simulacao'>>, simulador: Ref<Map<string, Tables<'simulacao'>>>) {

  const partidaSimulada = toValue(simulador).get(simulacao.partida!)

  if (simulacao.gols_mandante === undefined && simulacao.gols_visitante === undefined) {
    simulador.value.delete(simulacao.partida!)
  } else if (partidaSimulada) {
    partidaSimulada.gols_mandante = simulacao.gols_mandante
    partidaSimulada.gols_visitante = simulacao.gols_visitante
    if (simulacao.id) partidaSimulada.id = simulacao.id
  } else {
    toValue(simulador).set(simulacao.partida!, simulacao!)
  }
}