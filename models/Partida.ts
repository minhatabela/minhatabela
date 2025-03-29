import { type IPartida } from "~/types/partida";

export class Partida implements IPartida {
  sede: string & { cidade: string | null; created_at: string | null; id: string; key: string | null; nome: string; nome_popular: string; updated_at: string | null; };
  created_at: string;
  data: string | null;
  gols_mandante: number | null;
  gols_visitante: number | null;
  hora: string | null;
  id: string;
  numero: number | null;
  rodada: number;
  status: "nao_iniciada" | "iniciada" | "finalizada" | "cancelada" | "wo" | "postergada" | "simulada";
  updated_at: string | null;
  mandante: { created_at: string | null; escudo: string | null; id: string; nome: string; nome_popular: string | null; sigla: string | null; slug: string | null; updated_at: string | null; };
  visitante: { created_at: string | null; escudo: string | null; id: string; nome: string; nome_popular: string | null; sigla: string | null; slug: string | null; updated_at: string | null; };

  constructor({
    created_at,
    data,
    gols_mandante,
    gols_visitante,
    hora,
    id,
    mandante,
    numero,
    rodada,
    sede,
    status,
    updated_at,
    visitante
  }: IPartida) {
    this.created_at = created_at;
    this.data = data;
    this.gols_mandante = gols_mandante;
    this.gols_visitante = gols_visitante;
    this.hora = hora;
    this.id = id;
    this.numero = numero;
    this.rodada = rodada;
    this.status = status;
    this.updated_at = updated_at;
    this.mandante = mandante;
    this.visitante = visitante;
    this.sede = sede;
  }
}