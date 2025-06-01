import { Validatable } from '../helpers/Validatable.abstract'
import { MatchNumberValidator } from '../helpers/validators/MatchNumber.validator'

export class MatchNumber extends Validatable<number> {
  constructor(override readonly value: number) {
    super(value, new MatchNumberValidator())
  }
}
