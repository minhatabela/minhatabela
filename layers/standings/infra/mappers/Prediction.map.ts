import { Match } from '~~/layers/shared/entities/Match'
import { Team } from '~~/layers/shared/entities/Team'
import { Vanue } from '~~/layers/shared/entities/Vanue'
import type { IMapper } from '~~/layers/shared/ports/IMapper.interface'
import { MatchDate } from '~~/layers/shared/values/MatchDate'
import { MatchNumber } from '~~/layers/shared/values/MatchNumber'
import { MatchTime } from '~~/layers/shared/values/MatchTime'
import { Round } from '~~/layers/shared/values/Round'

export class PredictionMap implements IMapper<any, Match> {
  mapTo(data: any): Match {
    console.log(data)
    const { partida, gols_mandante, gols_visitante } = data

    const { id, mandante, visitante, rodada, numero, data: date, hora, sede } = partida

    const { id: homeTeamId, nome_popular: homeTeamName, escudo: homeTeamEmblem } = mandante
    const { id: awayTeamId, nome_popular: awayTeamName, escudo: awayTeamEmblem } = visitante

    const vanue = sede ? new Vanue(sede.id, sede.nome_popular) : undefined

    return new Match(
      id,
      new Round(rodada),
      new MatchNumber(numero),
      new MatchDate(date),
      new MatchTime(hora),
      new Team(homeTeamId, homeTeamName, homeTeamEmblem),
      new Team(awayTeamId, awayTeamName, awayTeamEmblem),
      vanue,
      gols_mandante,
      gols_visitante
    )
  }
}
