import { Match } from '~~/layers/shared/entities/Match'
import { Team } from '~~/layers/shared/entities/Team'
import { Vanue } from '~~/layers/shared/entities/Vanue'
import type { IMapper } from '~~/layers/shared/ports/IMapper.interface'
import { MatchDate } from '~~/layers/shared/values/MatchDate'
import { MatchNumber } from '~~/layers/shared/values/MatchNumber'
import { MatchTime } from '~~/layers/shared/values/MatchTime'
import { Round } from '~~/layers/shared/values/Round'

export class MatchMap implements IMapper<any, Match> {
  mapTo(item: any): Match {
    const {
      id,
      rodada,
      data,
      gols_mandante,
      gols_visitante,
      mandante,
      visitante,
      sede,
      hora,
      numero
    } = item

    const homeTeam = new Team(mandante.id, mandante.nome_popular, mandante.escudo)
    const awayTeam = new Team(visitante.id, visitante.nome_popular, visitante.escudo)

    const vanue = sede ? new Vanue(sede.id, sede.nome_popular) : undefined

    return new Match(
      id,
      new Round(rodada),
      new MatchNumber(numero),
      new MatchDate(data),
      new MatchTime(hora),
      homeTeam,
      awayTeam,
      vanue,
      isDefined(gols_mandante) ? gols_mandante : undefined,
      isDefined(gols_visitante) ? gols_visitante : undefined
    )
  }
}
