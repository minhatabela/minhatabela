import { TableViewEnum } from '../../domain/enums/TableView.enum'
import type { ITableViewOption } from '../interfaces/TableViewOption.interface'
import { TableViewOptions } from '../ports/TableViewOption.abstract'

export class GuestTableViewOptionsStrategy extends TableViewOptions {
  override tableViewOptions: ITableViewOption[]

  constructor() {
    super()
    this.tableViewOptions = this._getOptions()
  }

  private _getOptions(): ITableViewOption[] {
    return [
      { label: 'Simulada', value: TableViewEnum.SIMULADA },
      { label: 'Oficial', value: TableViewEnum.OFICIAL },
      {
        label: 'Oficial Simulada',
        value: TableViewEnum.OFICIAL_SIMULADA,
        disabled: true,
        icon: 'i-lucide-lock-keyhole'
      }
    ]
  }
}
