import type { IValidator } from '~~/layers/shared/ports/IValidatable.interface'

export class PositionValidator implements IValidator<number> {
  isValid(value: number): boolean {
    return value > 0 && value <= 20
  }
}
