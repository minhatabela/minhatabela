import { Match } from '~~/layers/shared/entities/Match'
import type { Team } from '~~/layers/shared/entities/Team'
import type { Vanue } from '~~/layers/shared/entities/Vanue'
import type { IObservable } from '~~/layers/shared/ports/IObservable.interface'
import type { IPredictedMatchObserver } from '../ports/IPreditedMatchObserver.interface'

export class PredictedMatch extends Match implements IObservable<IPredictedMatchObserver> {
  private readonly observers?: IPredictedMatchObserver[] = []

  constructor(
    override readonly id: string,
    override readonly round: number,
    override readonly season: number,
    override readonly homeTeam: Team,
    override readonly awayTeam: Team,
    override readonly date?: Date,
    override readonly time?: string,
    override readonly vanue?: Vanue,
    override homeGoals?: number,
    override awayGoals?: number,
    readonly predictedMatchId?: string
  ) {
    super(id, round, season, homeTeam, awayTeam, date, time, vanue, homeGoals, awayGoals)
  }

  addObserver(observer: IPredictedMatchObserver): void {
    this.observers!.push(observer)
  }

  setScore(homeGols: number, awayGoals: number) {
    this.awayGoals = awayGoals
    this.homeGoals = homeGols

    if (isDefined(this.homeGoals) && isDefined(this.awayGoals)) {
      this.observers!.forEach(observer => observer.execute(this))
    }
  }
}
