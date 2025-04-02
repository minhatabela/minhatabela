import type { IClube } from "~/types/clube";
import { type IPartida } from "~/types/partida";
import { type ISede } from "~/types/sede";
import { Clube } from "./Clube";
import { Sede } from "./Sede";

const defaultPartida = {
  sede: new Sede(),
  data: null,
  gols_mandante: null,
  gols_visitante: null,
  hora: null,
  id: "",
  numero: null,
  rodada: 0,
  status: "nao_iniciada" as const,
  mandante: new Clube(),
  visitante: new Clube()
};

export class Partida implements IPartida {
  sede: ISede;
  data: string | null;
  gols_mandante: number | null;
  gols_visitante: number | null;
  hora: string | null;
  id: string;
  numero: number | null;
  rodada: number;
  status: "nao_iniciada" | "iniciada" | "finalizada" | "cancelada" | "wo" | "postergada" | "simulada";
  mandante: IClube;
  visitante: IClube;

  constructor({
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
    visitante
  }: Partial<IPartida> = defaultPartida) {
    this.data = data || null;
    this.gols_mandante = gols_mandante || null;
    this.gols_visitante = gols_visitante || null;
    this.hora = hora || null;
    this.id = id || "";
    this.numero = numero || null;
    this.rodada = rodada || 0;
    this.status = status || "nao_iniciada";
    this.mandante = mandante || new Clube();
    this.visitante = visitante || new Clube();
    this.sede = sede || new Sede()  
  }
}