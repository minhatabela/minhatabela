import { type IClube } from '../types/clube'

const defaultClube = {
  escudo: null,
  id: '',
  nome: '',
  nome_popular: null,
  sigla: null,
  slug: null
}

export class Clube implements IClube {
  escudo: string | null
  id: string
  nome: string
  nome_popular: string | null
  sigla: string | null
  slug: string | null

  constructor({ escudo, id, nome, nome_popular, sigla, slug }: Partial<IClube> = defaultClube) {
    this.escudo = escudo || null
    this.id = id || ''
    this.nome = nome || ''
    this.nome_popular = nome_popular || null
    this.sigla = sigla || null
    this.slug = slug || null
  }
}
