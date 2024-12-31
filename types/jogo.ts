import { type Tables } from "~/types/database.types";
export type Jogo = Omit<Tables<'partida'>, 'visitante' | 'mandante'> & { mandante: Tables<'clube'>, visitante: Tables<'clube'> }