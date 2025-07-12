import { Validatable } from '~~/layers/shared/helpers/Validatable.abstract'
import { PositionValidator } from '../validators/Position.validator'

export class Position extends Validatable<number> {
  constructor(override readonly value: number) {
    super(value, new PositionValidator())
  }

  get _value() {
    return this.value
  }
}
