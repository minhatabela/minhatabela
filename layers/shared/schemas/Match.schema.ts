import z from 'zod'
import { TeamSchema } from './Team.schema'
import { VanueSchema } from './Vanue.schema'
import { Match } from '../entities/Match'

export const MatchSchema = z
  .object({
    id: z.uuid(),
    data: z.preprocess((value: string) => new Date(value), z.date().optional()),
    gols_mandante: z.number().optional(),
    gols_visitante: z.number().optional(),
    hora: z.string(),
    mandante: TeamSchema,
    visitante: TeamSchema,
    rodada: z.number(),
    season: z.number(),
    sede: VanueSchema
  })
  .transform(
    data =>
      new Match(
        data.id,
        data.rodada,
        data.season,
        data.mandante,
        data.visitante,
        data.data,
        data.hora,
        data.sede,
        data.gols_mandante,
        data.gols_visitante
      )
  )
