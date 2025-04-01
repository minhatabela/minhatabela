import { type Tables } from "~/types/database.types";
import { type IClube } from "./clube";
import { type ISede } from "./sede";
export type Partida = Omit<Tables<'partida'>, 'visitante' | 'mandante' | 'sede' | 'created_at' | 'updated_at'> & { mandante: IClube, visitante: IClube, sede: ISede }

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