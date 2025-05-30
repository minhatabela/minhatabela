import type { IValidator } from '../ports/IValidatable.interface'

export abstract class Validatable<T> {
  constructor(
    readonly value: T,
    private _validator: IValidator<T>
  ) {
    this._validate()
  }

  private _validate(): void {
    if (!this._validator.isValid(this.value)) {
      throw new Error(
        `${this.constructor.name} error: não foi possível validar valor ${this.value}`
      )
    }
  }
}
