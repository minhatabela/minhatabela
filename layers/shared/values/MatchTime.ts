import { Validatable } from "../helpers/Validatable.abstract";
import { MatchTimeValidator } from "../helpers/validators/MatchTime.validator";

export class MatchTime extends Validatable<string> {
  constructor(override readonly value: string) {
    super(value, new MatchTimeValidator())
  }
}