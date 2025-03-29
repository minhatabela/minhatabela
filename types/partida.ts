import { type Tables } from "~/types/database.types";
export type Partida = Omit<Tables<'partida'>, 'visitante' | 'mandante'> & { mandante: Tables<'clube'>, visitante: Tables<'clube'>, sede: Tables<'sede'> }

export interface IPartida extends Partida { }

export interface ClubeCBF {
  nome: string,
  gols?: number,
}

export interface PartidaCBF {
  num_jogo: string,
  rodada: string,
  mandante: ClubeCBF,
  visitante: ClubeCBF,
  local: string,
  data: string,
  hora: string
}

export interface PartidaNormalizada {
  numero?: number
  rodada: number
  mandante: string
  visitante: string
  gols_mandante?: number
  gols_visitante?: number
  sede?: string
  data?: string
  hora?: string
}

export interface PartidaSimulada {
  gols_mandante: number
  gols_visitante: number
  id: string
  partida: string
}