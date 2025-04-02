import { type IClube } from "~/types/clube"
import { type IClubeStats } from "~/types/clubeStats.d"
import { type Partida } from "~/types/partida"
import { ClubeStats } from "~/utils/clubeStats"

interface ICampeonato {
  partidasOficiais: Partida[]
  clubes: IClube[]
  getClassificacao(): IClubeStats[]
}

export class Campeonato implements ICampeonato {
  partidasOficiais: Partida[]
  clubes: IClube[]

  constructor(partidasOficiais: Partida[], clubes: IClube[]) {
    this.partidasOficiais = partidasOficiais
    this.clubes = clubes
  }

  getClassificacao(): IClubeStats[] {
    return useOrderBy(this.clubes.map(clube => new ClubeStats(clube, this.partidasOficiais).stats()), ['pontos', 'vitorias', 'golsDif', 'gols_pro'], ['desc', 'desc', 'desc', 'desc'])
  }
}