import z from 'zod'
import { Team } from '../entities/Team'

export const TeamSchema = z
  .object({
    id: z.uuid(),
    escudo: z.string(),
    nome_popular: z.string(),
    archived: z.boolean()
  })
  .transform(data => new Team(data.id, data.nome_popular, data.escudo))
