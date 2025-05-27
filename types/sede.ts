import type { Tables } from '../types/database.types'

export type Sede = Tables<'sede'>
export interface ISede extends Omit<Sede, 'created_at' | 'updated_at'> {}
