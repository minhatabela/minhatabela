import type { IValidator } from '../../ports/IValidatable.interface'

export class MatchDateValidator implements IValidator {
  isValid(value: string): boolean {
    if (!value) return true
    return !isNaN(new Date(value).getTime())
  }
}
