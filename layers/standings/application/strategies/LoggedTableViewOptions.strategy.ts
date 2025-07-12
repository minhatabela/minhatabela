import { TableViewEnum } from '../../domain/enums/TableView.enum'
import type { ITableViewOption } from '../interfaces/TableViewOption.interface'
import { TableViewOptions } from '../ports/TableViewOption.abstract'

export class LoggedTableViewOptionsStrategy extends TableViewOptions {
  override tableViewOptions: ITableViewOption[]

  constructor() {
    super()
    this.tableViewOptions = this._getOptions()
  }

  private _getOptions(): ITableViewOption[] {
    return [
      {
        label: 'Oficial Simulada',
        value: TableViewEnum.OFICIAL_SIMULADA
      },
      { label: 'Simulada', value: TableViewEnum.SIMULADA },
      { label: 'Oficial', value: TableViewEnum.OFICIAL }
    ]
  }
}
