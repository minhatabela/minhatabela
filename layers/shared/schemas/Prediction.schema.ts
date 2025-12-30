import z from 'zod'
import { MatchSchema } from './Match.schema'
import { PredictedMatch } from '../../predictions/domain/entities/PredictedMatch'

export const PredictionSchema = z
  .object({
    id: z.uuid(),
    partida: MatchSchema,
    gols_mandante: z.number().optional(),
    gols_visitante: z.number().optional()
  })
  .transform(
    data =>
      new PredictedMatch(
        data.partida.id,
        data.partida.season,
        data.partida.homeTeam,
        data.partida.awayTeam,
        data.partida.round,
        data.partida.date,
        data.partida.time,
        data.partida.vanue,
        data.gols_mandante,
        data.gols_visitante,
        data.id
      )
  )
