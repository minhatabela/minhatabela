import type { Match } from '~~/layers/shared/entities/Match'
import type { Team } from '~~/layers/shared/entities/Team'
import type { StandingPositon } from '../dtos/StandingPosition.dto'
import type { IStandings } from '../interfaces/IStandings.interface'
import { TeamStats } from './TeamStats'
import { orderBy } from 'lodash'
import type { StandingsFiltersDto } from '../../application/dtos/StandingsFilters.dto'

export class Standings implements IStandings {
  constructor(
    private readonly matches: Match[],
    private readonly teams: Team[],
    private readonly standingsFilters: StandingsFiltersDto
  ) {}

  getStandings(): StandingPositon[] {
    const orderedStandings = orderBy(
      this.teams.map(team => new TeamStats(team, this.matches, this.standingsFilters).getTeamStats),
      ['points', 'wins', 'diffGoals', 'proGoals'],
      ['desc', 'desc', 'desc', 'desc']
    )

    return orderedStandings
  }
}
