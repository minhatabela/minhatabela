import { GuestTableViewOptionsStrategy } from '../strategies/GuestTableViewOptions.strategy'
import { LoggedTableViewOptionsStrategy } from '../strategies/LoggedTableViewOptions.strategy'

export class TableViewOptionsFactory {
  static make(logged: boolean) {
    switch (logged) {
      case true:
        return new LoggedTableViewOptionsStrategy().tableViewOptions
      default:
        return new GuestTableViewOptionsStrategy().tableViewOptions
    }
  }
}
