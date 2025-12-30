import z from 'zod'
import { Vanue } from '../entities/Vanue'

export const VanueSchema = z
  .object({
    id: z.uuid(),
    nome_popular: z.string()
  })
  .transform(data => new Vanue(data.id, data.nome_popular))
