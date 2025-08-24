import type { Match } from '../../../shared/entities/Match'
import type { Team } from '../../../shared/entities/Team'
import { HomeAwayEnum } from '../../application/enums/HomeAway.enum'

export class HomeAwayMatchesFactory {
  static make(team: Team, matches: Match[], homeAway: HomeAwayEnum): Match[] {
    switch (homeAway) {
      case HomeAwayEnum.HOME:
        return matches.filter(match => match.homeTeam.id === team.id)
      case HomeAwayEnum.AWAY:
        return matches.filter(match => match.awayTeam.id === team.id)
      default:
        return matches
    }
  }
}
