import { Equipe } from "./equipe.ts"

export interface Jogo {
  id: number,
  rodada: number,
  equipe_mandante: Equipe,
  equipe_visitante: Equipe
  is_finalizado: boolean,
  hora_realizacao: string,
  jogo_id: number,
  data_realizacao: string
  placar_oficial_mandante?: number,
  placar_oficial_visitante?: number,
  empate: boolean,
  suspenso: boolean,
  cancelado: boolean,
  sede: number,
  vencedor_jogo?: number
}