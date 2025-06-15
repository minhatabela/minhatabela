import { StandingPositionColorEnum } from '../enums/StandingsPositionColor.enum'
import type { Position } from '../values/Position'

export class PositionColorFactory {
  static make(position: Position): StandingPositionColorEnum {
    if (position._value <= 6) return StandingPositionColorEnum.LIBERTADORES
    if (position._value <= 8) return StandingPositionColorEnum.PRE_LIBERTADORES
    if (position._value <= 14) return StandingPositionColorEnum.SUDAMERICANA
    if (position._value <= 16) return StandingPositionColorEnum.NEUTRAL
    return StandingPositionColorEnum.RELEGATION
  }
}
