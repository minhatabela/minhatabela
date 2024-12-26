import { type Jogo } from "~/types/jogo";

export function somaGolsProMandante(jogos: Jogo[], equipeId: string | number) {
  return jogos
    .filter(jogo => jogo.mandante.id === equipeId)
    .map(jogo => Number(jogo.gols_mandante))
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)
}

export function somaGolsContraMandante(jogos: Jogo[], equipeId: number | string) {
  return jogos
    .filter(jogo => jogo.mandante.id === equipeId)
    .map(jogo => Number(jogo.gols_visitante))
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)
}

export function somaGolsProVisitante(jogos: Jogo[], equipeId: number | string) {
  return jogos
    .filter(jogo => jogo.visitante.id === equipeId)
    .map(jogo => Number(jogo.gols_visitante))
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)
}

export function somaGolsContraVisitante(jogos: Jogo[], equipeId: number | string) {
  return jogos
    .filter(jogo => jogo.visitante.id === equipeId)
    .map(jogo => Number(jogo.gols_mandante))
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)
}

export function filtraVitorias(jogos: Jogo[], equipeId: number | string) {
  return jogos
    .filter(jogo => {
      if (jogo.mandante.id === equipeId) return Number(jogo.gols_mandante) > Number(jogo.gols_visitante)
      else return Number(jogo.gols_visitante) > Number(jogo.gols_mandante)
    })
}

export function filtraEmpates(jogos: Jogo[]) {
  return jogos
    .filter(jogo => {
      return jogo.gols_mandante === jogo.gols_visitante
    })
}

export function golsPro(jogos: Jogo[], equipeId: number | string) {
  return somaGolsProMandante(jogos, equipeId) + somaGolsProVisitante(jogos, equipeId)
}

export function golsContra(jogos: Jogo[], equipeId: number | string) {
  return somaGolsContraMandante(jogos, equipeId) + somaGolsContraVisitante(jogos, equipeId)
}

export function filtraJogosRodada(jogos: Jogo[] = [], rodada: number) {
  return jogos.filter(jogo => jogo.rodada === rodada)
}

function filtraJogosEquipe(jogos: Jogo[], equipeId: number | string): Jogo[] {
  const contemEquipe = (jogo: Jogo) => jogo.mandante.id === equipeId || jogo.visitante.id === equipeId
  return jogos.filter(contemEquipe)//.filter(jogo => jogo.is_finalizado)
}

export function calculaStatsEquipe(jogos: Jogo[], equipe_id: number | string) {
  const jogos_equipe = filtraJogosEquipe(jogos, equipe_id)

  const equipe = jogos_equipe[0].visitante.id === equipe_id ? jogos_equipe[0].visitante : jogos_equipe[0].mandante

  const vitorias = filtraVitorias(jogos_equipe, equipe_id)

  const empates = filtraEmpates(jogos_equipe)

  return {
    gols_pro: golsPro(jogos_equipe, equipe_id),
    gols_contra: golsContra(jogos_equipe, equipe_id),
    vitorias: vitorias.length,
    empates: empates.length,
    derrotas: Math.abs((vitorias.length + empates.length) - jogos_equipe.length),
    pontos: vitorias.length * 3 + empates.length,
    diferenca_gols: golsPro(jogos_equipe, equipe_id) - golsContra(jogos_equipe, equipe_id),
    equipe: equipe.nome_popular,
    partidas: jogos_equipe.length,
    clube_url: equipe.escudo,
  }

}

export function badgeColor(position: number) {
  if (position >= 1 && position <= 6) return 'green'  // libertadores
  if (position >= 7 && position <= 8) return 'orange' // pré libertadores
  if (position >= 9 && position <= 14) return 'blue'  // sudamericana
  if (position >= 15 && position <= 16) return 'white'
  if (position >= 17 && position <= 20) return 'red'  // rebaixamento
}