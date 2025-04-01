import { type Tables } from "~/types/database.types";


export type Clube = Tables<'clube'>
export interface IClube extends Omit<Clube, 'created_at' | 'updated_at'> { }