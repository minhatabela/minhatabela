import type { Tables } from "~/types/database.types";
import type { Jogo } from "~/types/jogo";

export function simularPartida(simulacao: Tables<'simulacao'>, simulador: Ref<Map<string, Tables<'simulacao'>>>) {
  console.log('simulacao: ', simulador)
  const partidaSimulada = toValue(simulador).get(simulacao.partida)
  if (partidaSimulada) {
    partidaSimulada.gols_mandante = simulacao.gols_mandante
    partidaSimulada.gols_visitante = simulacao.gols_mandante
  } else {
    toValue(simulador).set(simulacao.partida, simulacao)
  }
}

export function simulacaoToPartida(partida: Jogo, simulacao: Tables<'simulacao'>) {
  partida.gols_mandante = simulacao.gols_mandante
  partida.gols_visitante = simulacao.gols_visitante
  partida.status = 'simulada'

  return partida
}