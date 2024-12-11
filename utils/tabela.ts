import { type Jogo } from "~/types/jogo";

export function somaGolsProMandante(jogos: Jogo[], equipeId: number) {
  return jogos
    .filter(jogo => jogo.equipe_mandante.id === equipeId)
    .map(jogo => Number(jogo.placar_oficial_mandante))
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)
}

export function somaGolsContraMandante(jogos: Jogo[], equipeId: number) {
  return jogos
    .filter(jogo => jogo.equipe_mandante.id === equipeId)
    .map(jogo => Number(jogo.placar_oficial_visitante))
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)
}

export function somaGolsProVisitante(jogos: Jogo[], equipeId: number) {
  return jogos
    .filter(jogo => jogo.equipe_visitante.id === equipeId)
    .map(jogo => Number(jogo.placar_oficial_visitante))
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)
}

export function somaGolsContraVisitante(jogos: Jogo[], equipeId: number) {
  return jogos
    .filter(jogo => jogo.equipe_visitante.id === equipeId)
    .map(jogo => Number(jogo.placar_oficial_mandante))
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)
}

export function filtraVitorias(jogos: Jogo[], equipeId: number) {
  return jogos
    .filter(jogo => {
      if (jogo.equipe_mandante.id === equipeId) return Number(jogo.placar_oficial_mandante) > Number(jogo.placar_oficial_visitante)
      else return Number(jogo.placar_oficial_visitante) > Number(jogo.placar_oficial_mandante)
    })
}

export function filtraEmpates(jogos: Jogo[], equipeId: number) {
  return jogos
    .filter(jogo => {
      return jogo.placar_oficial_mandante === jogo.placar_oficial_visitante
    })
}

export function golsPro(jogos: Jogo[], equipeId: number) {
  return somaGolsProMandante(jogos, equipeId) + somaGolsProVisitante(jogos, equipeId)
}

export function golsContra(jogos: Jogo[], equipeId: number) {
  return somaGolsContraMandante(jogos, equipeId) + somaGolsContraVisitante(jogos, equipeId)
}