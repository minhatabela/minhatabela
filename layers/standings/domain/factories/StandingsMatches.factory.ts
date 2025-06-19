import type { Match } from '~~/layers/shared/entities/Match'
import { TableViewEnum } from '../enums/TableView.enum'
import { OfficialPredictedMatchesStrategy } from '../strategies/OfficialPredictedMatches.strategy'

export class StandingsMatchesFactory {
  static make(view: TableViewEnum, officialMatches: Match[], predictedMatches: Match[]): Match[] {
    switch (view) {
      case TableViewEnum.OFICIAL:
        return officialMatches
      case TableViewEnum.SIMULADA:
        return predictedMatches
      case TableViewEnum.OFICIAL_SIMULADA:
        return new OfficialPredictedMatchesStrategy(officialMatches, predictedMatches).getMatches()
    }
  }
}
