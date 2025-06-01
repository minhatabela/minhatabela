import type { IValidator } from "../../ports/IValidatable.interface";

export class RoundValidator implements IValidator<number> {
  isValid(value: number): boolean {
    if(!Number(value)) return false

    const MAX_ROUND = 38
    return Number(value) > 0 || Number(value) < MAX_ROUND
  }

}