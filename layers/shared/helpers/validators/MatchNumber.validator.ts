import type { IValidator } from '../../ports/IValidatable.interface'

export class MatchNumberValidator implements IValidator<number> {
  isValid(value: number): boolean {
    if (isNaN(Number(value))) return false

    const MAX_MATCH_NUMBER = 380
    return Number(value) > 0 || Number(value) < MAX_MATCH_NUMBER
  }
}
