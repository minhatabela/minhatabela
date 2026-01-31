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
    public round?: number,
    public date?: Date,
    public vanue?: Vanue,
    public homeGoals?: number,
    public awayGoals?: number
  ) {}

  get isFinished(): boolean {
    return isDefined(this.awayGoals) && isDefined(this.homeGoals)
  }

  get isPostponed(): boolean {
    return !isDefined(this.date)
  }

  get isThisWeek(): boolean {
    if (!this.date) return false
    return isThisWeek(this.date)
  }

  get realizationDateTime(): string | undefined {
    if (!this.date) return undefined
    return format(this.date, 'd MMM HH:mm', { locale: ptBR })
  }

  get status() {
    if (!isUndefined(this.awayGoals) && !isUndefined(this.homeGoals)) {
      return { label: 'Finalizada', color: 'success', icon: 'i-lucide-check-circle' }
    }

    return { label: 'Não iniciada', color: 'neutral', icon: 'i-lucide-pause' }
  }
}
