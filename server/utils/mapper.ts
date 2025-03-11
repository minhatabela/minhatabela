import { Jogo, PartidaCBF, PartidaNormalizada } from '~/types/jogo'

export function mapPartidaCBF(partida: PartidaCBF): PartidaNormalizada {
  return {
    numero: Number(partida.num_jogo),
    rodada: Number(partida.rodada),
    mandante: partida.mandante.nome,
    visitante: partida.visitante.nome,
    gols_mandante: partida.mandante.gols || undefined,
    gols_visitante: partida.visitante.gols || undefined,
    sede: partida.local === " -  - " ? undefined : partida.local,
    data: partida.data === "A Definir" ? undefined : partida.data,
    hora: partida.hora || undefined
  }
}

export function mapPartidaMT(partida: Jogo): PartidaNormalizada {
  return {
    numero: partida.numero || undefined,
    rodada: partida.rodada,
    data: partida.data || undefined,
    hora: partida.hora || undefined,
    gols_mandante: partida.gols_mandante || undefined,
    gols_visitante: partida.gols_visitante || undefined,
    visitante: partida.visitante.slug,
    mandante: partida.mandante.slug,
    sede: partida.sede?.key || undefined
  }
}