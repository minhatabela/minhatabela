import { type Clube } from "~/types/clube"
import { type IClubeStats } from "~/types/clubeStats.d"
import { type Partida } from "~/types/partida"
import { ClubeStats } from "~/utils/clubeStats"

interface ICampeonato {
  partidasOficiais: Partida[]
  clubes: Clube[]
  getClassificacao(): IClubeStats[]
}

export class Campeonato implements ICampeonato {
  partidasOficiais: Partida[]
  clubes: Clube[]

  constructor(partidasOficiais: Partida[], clubes: Clube[]) {
    this.partidasOficiais = partidasOficiais
    this.clubes = clubes
  }

  getClassificacao(): IClubeStats[] {
    return useOrderBy(this.clubes.map(clube => new ClubeStats(clube, this.partidasOficiais).stats()), ['pontos', 'vitorias', 'golsDif', 'gols_pro'], ['desc', 'desc', 'desc', 'desc'])
  }
}