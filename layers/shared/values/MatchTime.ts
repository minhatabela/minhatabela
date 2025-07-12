import { Validatable } from '../helpers/Validatable.abstract'
import { MatchTimeValidator } from '../helpers/validators/MatchTime.validator'

export class MatchTime extends Validatable<string> {
  constructor(override readonly value: string) {
    super(value, new MatchTimeValidator())
  }

  get formattedValue() {
    return this.value ? this.value.substring(0, 5) : 'A definir'
  }
}
