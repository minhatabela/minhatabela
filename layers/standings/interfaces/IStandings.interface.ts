import type { TableHeader } from "../dtos/TableHeader.dto";

export interface IStandings {
  getStandings(): TableHeader[]
}