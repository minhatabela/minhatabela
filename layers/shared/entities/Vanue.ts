export class Vanue {
  constructor(
    readonly id: string,
    readonly name: string
  ) {}

  get getValue() {
    return this.name ? this.name : 'A definir'
  }
}
