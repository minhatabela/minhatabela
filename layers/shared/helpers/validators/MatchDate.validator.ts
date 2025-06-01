import type { IValidator } from "../../ports/IValidatable.interface";

export class MatchDateValidator implements IValidator {
  isValid(value: string): boolean {
    return !isNaN(new Date(value).getTime())
  }
}