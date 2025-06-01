import type { IValidator } from "../../ports/IValidatable.interface";

export class MatchTimeValidator implements IValidator {
  isValid(value: string): boolean {
    return new RegExp(/([01]\d|2[0-3]):([0-5]\d)/).test(value)
  }
}