import { format, isThisWeek } from 'date-fns'
import type { MatchDate } from '../values/MatchDate'
import type { MatchNumber } from '../values/MatchNumber'
import type { MatchTime } from '../values/MatchTime'
import type { Round } from '../values/Round'
import type { Team } from './Team'
import type { Vanue } from './Vanue'
import { ptBR } from 'date-fns/locale'

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

  get isPostponed(): boolean {
    return !isDefined(this.date.value) || !isDefined(this.time.value)
  }

  get isThisWeek(): boolean {
    if (!this.date.dateValue) return false
    return isThisWeek(this.date.dateValue)
  }

  get realizationDateTime(): string | undefined {
    if (!this.date.dateValue || !this.time.value) return undefined

    const [hours, mins, secs] = this.time.value.split(':').map(Number)

    return format(this.date.dateValue.setHours(hours!, mins, secs), 'd MMM HH:mm', { locale: ptBR })
  }
}
