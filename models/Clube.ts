import { type IClube } from "~/types/clube";

export class Clube implements IClube {
  created_at: string | null;
  escudo: string | null;
  id: string;
  nome: string;
  nome_popular: string | null;
  sigla: string | null;
  slug: string | null;
  updated_at: string | null;

  constructor({ created_at, escudo, id, nome, nome_popular, sigla, slug, updated_at }: IClube) {
    this.created_at = created_at;
    this.escudo = escudo;
    this.id = id;
    this.nome = nome;
    this.nome_popular = nome_popular;
    this.sigla = sigla;
    this.slug = slug;
    this.updated_at = updated_at;
  }

}