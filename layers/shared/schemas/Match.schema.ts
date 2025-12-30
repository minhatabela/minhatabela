import z from 'zod'
import { TeamSchema } from './Team.schema'
import { VanueSchema } from './Vanue.schema'
import { Match } from '../entities/Match'

export const MatchSchema = z
  .object({
    id: z.uuid(),
    data: z.preprocess((value: string) => (value ? new Date(value) : null), z.date().nullable()),
    gols_mandante: z.number().nullable(),
    gols_visitante: z.number().nullable(),
    hora: z.string().nullable(),
    mandante: TeamSchema,
    visitante: TeamSchema,
    rodada: z.number().nullable(),
    season: z.number(),
    sede: VanueSchema.nullable()
  })
  .transform(
    data =>
      new Match(
        data.id,
        data.season,
        data.mandante,
        data.visitante,
        data.rodada || undefined,
        data.data || undefined,
        data.hora || undefined,
        data.sede || undefined,
        isDefined(data.gols_mandante) ? data.gols_mandante : undefined,
        isDefined(data.gols_visitante) ? data.gols_visitante : undefined
      )
  )
