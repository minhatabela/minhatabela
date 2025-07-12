import { Validatable } from '../helpers/Validatable.abstract'
import { MatchDateValidator } from '../helpers/validators/MatchDate.validator'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export class MatchDate extends Validatable<string> {
  constructor(override readonly value: string) {
    super(value, new MatchDateValidator())
  }

  get formattedDate(): string | undefined {
    return this.dateValue ? format(this.dateValue, 'd MMM', { locale: ptBR }) : undefined
  }

  get dateValue(): Date | undefined {
    if (!this.value) return undefined

    const date = new Date(this.value)
    return new Date(date.setHours(date.getHours() + 3))
  }
}
