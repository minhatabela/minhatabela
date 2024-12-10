interface Escudo {
  _60x60: string,
  _30x30: string,
  _45x45: string,
  svg: string
}

export interface Equipe {
  id: number,
  escudo: Escudo,
  equipe_id: number,
  nome: string
  nome_popular: string,
  sigla: string,
  slug: string,
}