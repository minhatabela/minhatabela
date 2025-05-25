import { DifferenceChange } from 'microdiff'
import { IPartida, PartidaCBF, PartidaNormalizada } from '~/types/partida'

export function mapPartidaCBF(partida: PartidaCBF): PartidaNormalizada {
  return {
    numero: Number(partida.num_jogo),
    rodada: Number(partida.rodada),
    mandante: partida.mandante.nome,
    visitante: partida.visitante.nome,
    // gols_mandante: Number(partida.mandante.gols) || undefined,
    // gols_visitante: Number(partida.visitante.gols) || undefined,
    sede: partida.local === " -  - " ? undefined : partida.local,
    data: partida.data === "A Definir" ? undefined : partida.data.trim(),
    hora: partida.hora || undefined
  }
}

export function mapPartidaMT(partida: IPartida): PartidaNormalizada {
  return {
    numero: partida.numero || undefined,
    rodada: partida.rodada,
    data: new Date(partida.data?.split("-")).toLocaleDateString('pt-BR') || undefined,
    hora: partida.hora?.substr(0, 5) || undefined,
    // gols_mandante: Number(partida.gols_mandante) || undefined,
    // gols_visitante: Number(partida.gols_visitante) || undefined,
    visitante: partida.visitante.slug || '',
    mandante: partida.mandante.slug || '',
    sede: partida.sede?.key || undefined
  }
}

export function diffToObject(diff: DifferenceChange[]) {
 return Object.fromEntries(diff.map(item => [item.path, item.value]))
}