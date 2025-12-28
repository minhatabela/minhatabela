import { format, isThisWeek } from 'date-fns'
import type { Team } from './Team'
import type { Vanue } from './Vanue'
import { ptBR } from 'date-fns/locale'
import { isUndefined } from 'lodash'

export class Match {
  constructor(
    readonly id: string,
    readonly season: number,
    readonly homeTeam: Team,
    readonly awayTeam: Team,
    readonly round?: number,
    readonly date?: Date,
    readonly time?: string,
    readonly vanue?: Vanue,
    readonly homeGoals?: number,
    readonly awayGoals?: number
  ) {}

  get isFinished(): boolean {
    return isDefined(this.awayGoals) && isDefined(this.homeGoals)
  }

  get isPostponed(): boolean {
    return !isDefined(this.date) || !isDefined(this.time)
  }

  get isThisWeek(): boolean {
    if (!this.date) return false
    return isThisWeek(this.date)
  }

  get realizationDateTime(): string | undefined {
    if (!this.date || !this.time) return undefined

    const [hours, mins, secs] = this.time.split(':').map(Number)

    return format(this.date.setHours(hours!, mins, secs), 'd MMM HH:mm', { locale: ptBR })
  }

  get status() {
    if (!isUndefined(this.awayGoals) && !isUndefined(this.homeGoals)) {
      return { label: 'Finalizada', color: 'success', icon: 'i-lucide-check-circle' }
    }

    return { label: 'Não iniciada', color: 'neutral', icon: 'i-lucide-pause' }
  }
}
