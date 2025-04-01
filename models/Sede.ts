import { type ISede } from "~/types/sede";

const defaultSede = {
  cidade: null,
  id: "",
  key: null,
  nome: null,
  nome_popular: "",
  created_at: null,
  updated_at: null,
};

export class Sede implements ISede {
  cidade: string | null;
  id: string;
  key: string | null;
  nome: string | null;
  nome_popular: string;

  constructor({
    cidade,
    id,
    key,
    nome,
    nome_popular,
  }: ISede = defaultSede) {
    this.cidade = cidade || null;
    this.id = id || "";
    this.key = key || null;
    this.nome = nome || null;
    this.nome_popular = nome_popular || "";
  }
}