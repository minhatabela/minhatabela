export interface IValidator<T = string> {
  isValid(value: T): boolean
}
