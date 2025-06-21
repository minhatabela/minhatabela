import { Validatable } from '../helpers/Validatable.abstract'
import { MatchDateValidator } from '../helpers/validators/MatchDate.validator'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export class MatchDate extends Validatable<string> {
  constructor(override readonly value: string) {
    super(value, new MatchDateValidator())
  }

  get formattedDate() {
    return this.value
      ? format(new Date(this.value), 'd MMM', { locale: ptBR })
      : 'A definir'
  }
}
