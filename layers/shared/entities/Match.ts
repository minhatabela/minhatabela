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
    readonly hour: MatchTime,
    readonly homeTeam: Team,
    readonly awayTeam: Team,
    readonly vanue?: Vanue,
    readonly homeGoals?: number,
    readonly awayGoals?: number
  ) {}
}
