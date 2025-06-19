import { Validatable } from '../helpers/Validatable.abstract'
import { RoundValidator } from '../helpers/validators/Round.validator'

export class Round extends Validatable<number> {
  constructor(override readonly value: number) {
    super(value, new RoundValidator())
  }
}
