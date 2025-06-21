export class Vanue {
  constructor(
    private id: string,
    private name: string
  ) {}

  get getValue() {
    return this.name ? this.name : 'A definir'
  }
}
