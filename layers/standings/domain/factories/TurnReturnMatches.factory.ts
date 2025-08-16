import type { Match } from '../../../shared/entities/Match'
import { TurnReturnEnum } from '../../application/enums/TurnReturn.enum'

export class TurnReturnMatchesFactory {
  static make(matches: Match[], turnReturn: TurnReturnEnum): Match[] {
    switch (turnReturn) {
      case TurnReturnEnum.TURN:
        return matches.filter(match => match.round.value <= 19)
      case TurnReturnEnum.RETURN:
        return matches.filter(match => match.round.value >= 20)
      default:
        return matches
    }
  }
}
