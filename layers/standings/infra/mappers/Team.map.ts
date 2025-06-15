import { Team } from '~~/layers/shared/entities/Team'
import type { IMapper } from '~~/layers/shared/ports/IMapper.interface'

export class TeamMap implements IMapper<any, Team> {
  mapTo(item: any): Team {
    const { id, nome_popular, escudo } = item

    return new Team(id, nome_popular, escudo)
  }
}
