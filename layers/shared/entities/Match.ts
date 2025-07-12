import type { MatchDate } from '../values/MatchDate'
import type { MatchNumber } from '../values/MatchNumber'
import type { MatchTime } from '../values/MatchTime'
import type { Round } from '../values/Round'
import type { Team } from './Team'
import type { Vanue } from './Vanue'

export class Match {
  constructor(
    readonly id: string,
    readonly round: Round,
    readonly number: MatchNumber,
    readonly date: MatchDate,
    readonly time: MatchTime,
    readonly homeTeam: Team,
    readonly awayTeam: Team,
    readonly vanue?: Vanue,
    readonly homeGoals?: number,
    readonly awayGoals?: number
  ) {}

  get isFinished(): boolean {
    return isDefined(this.awayGoals) && isDefined(this.homeGoals)
  }

  get isThisWeek(): boolean {
    if (!this.date.dateValue) return false

    const sevenDaysAhead = new Date(new Date().setDate(new Date().getDate() + 7))

    return this.date.dateValue > new Date() && this.date.dateValue < sevenDaysAhead
  }
}
