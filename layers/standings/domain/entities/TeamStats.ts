import type { Match } from '~~/layers/shared/entities/Match'
import type { Team } from '~~/layers/shared/entities/Team'
import type { StandingPositon } from '../dtos/StandingPosition.dto'
import type { ITeamStats } from '../interfaces/ITeamStats.interface'
import type { StandingsFiltersDto } from '../../application/dtos/StandingsFilters.dto'
import { HomeAwayMatchesFactory } from '../../domain/factories/HomeAwayMatches.factory'
import { TurnReturnMatchesFactory } from '../../domain/factories/TurnReturnMatches.factory'
import { PeakRoundMatchesFactory } from '../../domain/factories/PeakRoundMatches.factory'

export class TeamStats implements ITeamStats {
  constructor(
    private readonly team: Team,
    private readonly matches: Match[],
    private readonly standingsFilters: StandingsFiltersDto
  ) {
    this.matches = this.matches.filter(
      match => match.homeTeam.id === this.teamId || match.awayTeam.id === this.teamId
    )
  }

  get teamId() {
    return this.team.id
  }

  get diffGoals(): number {
    return this.proGoals - this.conGoals
  }

  get perf(): number {
    return Math.floor((this.points / (this.matchesCount * 3)) * 100)
  }

  private validMatches(): Match[] {
    let matches = this.matches.filter(
      match => isDefined(match.homeGoals) && isDefined(match.awayGoals)
    )

    matches = HomeAwayMatchesFactory.make(this.team, matches, this.standingsFilters.homeAway)

    matches = TurnReturnMatchesFactory.make(matches, this.standingsFilters.turnReturn)

    matches = PeakRoundMatchesFactory.make(matches, this.standingsFilters.peakRound)

    return matches
  }

  private homeMatches(): Match[] {
    return this.validMatches().filter(match => match.homeTeam.id === this.teamId)
  }

  private awayMatches(): Match[] {
    return this.validMatches().filter(match => match.awayTeam.id === this.teamId)
  }

  get matchesCount(): number {
    return this.validMatches().length
  }

  get proGoals(): number {
    const away = this.awayMatches()
      .map(match => match.awayGoals)
      .reduce((a, b) => a! + b!, 0)

    const home = this.homeMatches()
      .map(match => match.homeGoals)
      .reduce((a, b) => a! + b!, 0)

    return away! + home!
  }

  get conGoals(): number {
    const away = this.awayMatches()
      .map(match => match.homeGoals)
      .reduce((a, b) => a! + b!, 0)

    const home = this.homeMatches()
      .map(match => match.awayGoals)
      .reduce((a, b) => a! + b!, 0)

    return away! + home!
  }

  get wins(): number {
    const homeWins = this.homeMatches().filter(match => match.homeGoals! > match.awayGoals!)

    const awayWins = this.awayMatches().filter(match => match.awayGoals! > match.homeGoals!)

    return awayWins.length + homeWins.length
  }

  get losses(): number {
    const homeLosses = this.homeMatches().filter(match => match.homeGoals! < match.awayGoals!)

    const awayLosses = this.awayMatches().filter(match => match.awayGoals! < match.homeGoals!)

    return homeLosses.length + awayLosses.length
  }

  get draws(): number {
    return this.validMatches().filter(match => match.homeGoals === match.awayGoals).length
  }

  get points(): number {
    return this.wins * 3 + this.draws
  }

  get getTeamStats(): StandingPositon {
    const stats = {
      proGoals: this.proGoals,
      conGoals: this.conGoals,
      wins: this.wins,
      draws: this.draws,
      losses: this.losses,
      points: this.points,
      diffGoals: this.diffGoals,
      team: this.team.name,
      matches: this.matchesCount,
      emblem: this.team.emblem,
      perf: this.perf
    }

    return stats
  }
}
