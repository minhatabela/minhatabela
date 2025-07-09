import type { IClube } from '../../types/clube'
import type { IClubeStats } from '../../types/clubeStats.d'
import type { Partida } from '../../types/partida'

export class ClubeStats {
  clube: IClube
  partidas: Partida[]

  constructor(clube: IClube, partidas: Partida[]) {
    this.clube = clube
    this.partidas = partidas.filter(
      partida => partida.mandante.id === clube.id || partida.visitante.id === clube.id
    )
  }

  public vitorias() {
    return this.partidasComResultado().filter(partida => {
      if (partida.mandante.id === this.clube.id)
        return Number(partida.gols_mandante) > Number(partida.gols_visitante)
      else return Number(partida.gols_visitante) > Number(partida.gols_mandante)
    })
  }

  public derrotas() {
    return this.partidasComResultado().filter(partida => {
      if (partida.mandante.id === this.clube.id)
        return Number(partida.gols_mandante) < Number(partida.gols_visitante)
      else return Number(partida.gols_visitante) < Number(partida.gols_mandante)
    })
  }

  public empates() {
    return this.partidasComResultado().filter(
      partida => partida.gols_mandante === partida.gols_visitante
    )
  }

  public pontos() {
    return this.vitorias().length * 3 + this.empates().length
  }

  public partidasMandante() {
    return this.partidas.filter(partida => partida.mandante.id === this.clube.id)
  }

  public partidasVisitante() {
    return this.partidas.filter(partida => partida.visitante.id === this.clube.id)
  }

  public golsPro() {
    return (
      this.partidasMandante()
        .map(partida => Number(partida.gols_mandante))
        .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0) +
      this.partidasVisitante()
        .map(partida => Number(partida.gols_visitante))
        .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)
    )
  }

  public golsContra() {
    return (
      this.partidasMandante()
        .map(partida => Number(partida.gols_visitante))
        .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0) +
      this.partidasVisitante()
        .map(partida => Number(partida.gols_mandante))
        .reduce((placar_atual, placar_prox) => placar_atual + placar_prox, 0)
    )
  }

  public golsDif() {
    return this.golsPro() - this.golsContra()
  }

  public partidasComResultado() {
    return this.partidas.filter(
      partida => isDefined(partida.gols_mandante) && isDefined(partida.gols_visitante)
    )
  }

  public stats(): IClubeStats {
    return {
      clube: this.clube.nome_popular || '',
      escudo: this.clube.escudo || '',
      gols_pro: this.golsPro(),
      gols_contra: this.golsContra(),
      vitorias: this.vitorias().length,
      empates: this.empates().length,
      derrotas: this.derrotas().length,
      pontos: this.pontos(),
      partidas: this.partidasComResultado().length,
      golsDif: this.golsDif()
    }
  }
}
