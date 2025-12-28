import { Match } from '~~/layers/shared/entities/Match'
import { Team } from '~~/layers/shared/entities/Team'
import { Vanue } from '~~/layers/shared/entities/Vanue'
import type { IMapper } from '~~/layers/shared/ports/IMapper.interface'
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
      season
    } = item

    const homeTeam = new Team(mandante.id, mandante.nome_popular, mandante.escudo)
    const awayTeam = new Team(visitante.id, visitante.nome_popular, visitante.escudo)

    const vanue = sede ? new Vanue(sede.id, sede.nome_popular) : undefined

    return new Match(
      id,
      new Round(rodada),
      season,
      homeTeam,
      awayTeam,
      new Date(data),
      hora,
      vanue,
      isDefined(gols_mandante) ? gols_mandante : undefined,
      isDefined(gols_visitante) ? gols_visitante : undefined
    )
  }
}
