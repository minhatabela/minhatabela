import type { Match } from '~~/layers/shared/entities/Match'
import type { IValidator } from '~~/layers/shared/ports/IValidatable.interface'

export class MatchesValidator implements IValidator<Match[]> {
  isValid(value: Match[]): boolean {
    if (!value) return false
    if (!(value instanceof Array)) return false
    return value.length > 0
  }
}
