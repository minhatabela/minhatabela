import type { HomeAwayEnum } from '../enums/HomeAway.enum'
import type { TurnReturnEnum } from '../enums/TurnReturn.enum'

export type StandingsFiltersDto = {
  homeAway: HomeAwayEnum
  turnReturn: TurnReturnEnum
  peakRound: number
}
