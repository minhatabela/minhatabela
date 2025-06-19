import { TableViewEnum } from '~~/layers/standings/domain/enums/TableView.enum'
import type { IClube } from '../../types/clube'
import { type Enums, type Tables } from '../../types/database.types'
import { type Partida } from '../../types/partida'

export function somaGolsProMandante(jogos: Partida[], equipeId: string | number) {
  return jogos
    .filter(jogo => jogo.mandante.id === equipeId)
    .map(jogo => Number(jogo.gols_mandante) | 0)
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)
}

export function somaGolsContraMandante(jogos: Partida[], equipeId: number | string) {
  return jogos
    .filter(jogo => jogo.mandante.id === equipeId)
    .map(jogo => Number(jogo.gols_visitante) | 0)
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)
}

export function somaGolsProVisitante(jogos: Partida[], equipeId: number | string) {
  return jogos
    .filter(jogo => jogo.visitante.id === equipeId)
    .map(jogo => Number(jogo.gols_visitante) | 0)
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)
}

export function somaGolsContraVisitante(jogos: Partida[], equipeId: number | string) {
  return jogos
    .filter(jogo => jogo.visitante.id === equipeId)
    .map(jogo => Number(jogo.gols_mandante) | 0)
    .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)
}

export function filtraVitorias(jogos: Partida[], equipeId: number | string) {
  return jogos
    .filter(jogo => jogo.status !== ('nao_iniciada' as Enums<'status'>))
    .filter(jogo => {
      if (jogo.mandante.id === equipeId)
        return Number(jogo.gols_mandante || 0) > Number(jogo.gols_visitante || 0)
      else return Number(jogo.gols_visitante || 0) > Number(jogo.gols_mandante || 0)
    })
}

export function filtraDerrotas(jogos: Partida[], equipeId: number | string) {
  return (
    jogos
      // .filter(jogo => jogo.status !== 'nao_iniciada' as Enums<'status'>)
      .filter(jogo => {
        if (jogo.mandante.id === equipeId)
          return Number(jogo.gols_mandante) < Number(jogo.gols_visitante)
        else return Number(jogo.gols_visitante) < Number(jogo.gols_mandante)
      })
  )
}

export function filtraEmpates(jogos: Partida[]) {
  return jogos.filter(jogo => {
    return (
      isDefined(jogo.gols_mandante) &&
      isDefined(jogo.gols_visitante) &&
      jogo.gols_mandante === jogo.gols_visitante
    ) //&& jogo.status !== 'nao_iniciada' as Enums<'status'>
  })
}

export function golsPro(jogos: Partida[], equipeId: number | string) {
  return somaGolsProMandante(jogos, equipeId) + somaGolsProVisitante(jogos, equipeId)
}

export function golsContra(jogos: Partida[], equipeId: number | string) {
  return somaGolsContraMandante(jogos, equipeId) + somaGolsContraVisitante(jogos, equipeId)
}

export function filtraJogosRodada(jogos: Partida[] = [], rodada: number) {
  return jogos.filter(jogo => jogo.rodada === rodada)
}

function filtraJogosEquipe(jogos: Partida[], equipeId: number | string): Partida[] {
  const contemEquipe = (jogo: Partida) =>
    jogo.mandante.id === equipeId || jogo.visitante.id === equipeId
  return [...jogos.filter(contemEquipe)]
}

export function calculaStatsEquipe(
  jogos: Partida[],
  clube: IClube,
  simulador: Map<string, Tables<'simulacao'>> = new Map([]),
  tableView: TableViewEnum = TableViewEnum.OFICIAL
) {
  //TODO adicionar filtro por simulador
  const jogos_equipe_finalizado = filtraJogosEquipe(jogos, clube.id).filter(
    ({ gols_mandante, gols_visitante }) => isDefined(gols_mandante) && isDefined(gols_visitante)
  )
  const jogos_equipe_nao_iniciado = filtraJogosEquipe(jogos, clube.id).filter(
    jogo => jogo.status !== ('finalizada' as Enums<'status'>)
  )

  const jogos_equipe_simulado = filtraJogosEquipe(jogos, clube.id)
    .filter(partida => simulador.has(partida.id))
    .map(partida =>
      Object.assign({ ...partida }, { ...simulador.get(partida.id), status: 'simulada' })
    )

  const idsPartidasFinalizadas = jogos_equipe_finalizado.map(partida => partida.id)

  const tableViewPartidas = {
    [TableViewEnum.OFICIAL]: jogos_equipe_finalizado,
    [TableViewEnum.SIMULADA]: jogos_equipe_simulado,
    [TableViewEnum.OFICIAL_SIMULADA]: jogos_equipe_finalizado.concat(
      jogos_equipe_simulado.filter(partida => !idsPartidasFinalizadas.includes(partida.partida!))
    )
  }

  const jogos_equipe: Partida[] = tableViewPartidas[tableView]

  const vitorias = filtraVitorias(jogos_equipe, clube.id)

  const empates = filtraEmpates(jogos_equipe)

  return {
    gols_pro: golsPro(jogos_equipe, clube.id),
    gols_contra: golsContra(jogos_equipe, clube.id),
    vitorias: vitorias.length,
    empates: empates.length,
    derrotas: filtraDerrotas(jogos_equipe, clube.id).length,
    pontos: vitorias.length * 3 + empates.length,
    diferenca_gols: golsPro(jogos_equipe, clube.id) - golsContra(jogos_equipe, clube.id),
    equipe: clube.nome_popular,
    partidas: jogos_equipe.length,
    clube_url: clube.escudo,
    aproveitamento: Math.floor(
      ((vitorias.length * 3 + empates.length) / (jogos_equipe.length * 3)) * 100
    )
  }
}
