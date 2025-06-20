import { Match } from "~~/layers/shared/entities/Match";
import type { Team } from "~~/layers/shared/entities/Team";
import type { Vanue } from "~~/layers/shared/entities/Vanue";
import type { IObservable } from "~~/layers/shared/ports/IObservable.interface";
import type { MatchDate } from "~~/layers/shared/values/MatchDate";
import type { MatchNumber } from "~~/layers/shared/values/MatchNumber";
import type { MatchTime } from "~~/layers/shared/values/MatchTime";
import type { Round } from "~~/layers/shared/values/Round";
import type { IPredictedMatchObserver } from "../ports/IPreditedMatchObserver.interface";

export class PredictedMatch extends Match implements IObservable<IPredictedMatchObserver> {

  private readonly observers: IPredictedMatchObserver[] = []

  constructor(
    readonly predictedMatchId: string,
    private readonly _id: string,
    private readonly _round: Round,
    private readonly _number: MatchNumber,
    private readonly _date: MatchDate,
    private readonly _time: MatchTime,
    private readonly _homeTeam: Team,
    private readonly _awayTeam: Team,
    private readonly _vanue?: Vanue,
    private _homeGoals?: number,
    private _awayGoals?: number
  ) {
    super(_id, _round, _number,_date, _time, _homeTeam, _awayTeam, _vanue, _homeGoals, _awayGoals )
  }

  addObserver(observer: IPredictedMatchObserver): void {
    this.observers.push(observer)
  }

  setScore(homeGols: number, awayGoals: number) {
    this._awayGoals = awayGoals
    this._homeGoals = homeGols

    this.observers.forEach(observer => observer.execute(this))
  }

}