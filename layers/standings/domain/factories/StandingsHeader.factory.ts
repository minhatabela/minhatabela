export class StandignsHeaderFactory {
  static make() {
    return [
      {
        header: '#',
        accessorKey: 'position'
      },
      {
        header: 'Clube',
        accessorKey: 'team'
      },
      {
        header: 'PTS',
        accessorKey: 'points'
      },
      {
        header: 'P',
        accessorKey: 'matches'
      },
      {
        header: 'SG',
        accessorKey: 'diffGoals'
      },
      {
        header: 'V',
        accessorKey: 'wins'
      },
      {
        header: 'E',
        accessorKey: 'draws'
      },
      {
        header: 'D',
        accessorKey: 'losses'
      },

      {
        header: 'GP',
        accessorKey: 'proGoals'
      },
      {
        header: 'GC',
        accessorKey: 'conGoals'
      },
      {
        header: '%',
        accessorKey: 'perf'
      }
    ]
  }
}
