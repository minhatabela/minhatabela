import type { Match } from "~~/layers/shared/entities/Match";
import type { Team } from "~~/layers/shared/entities/Team";
import type { TableHeader } from "../dtos/TableHeader.dto";
import type { IStandings } from "../interfaces/IStandings.interface";
import { TeamStats } from "./TeamStats";

export class Standings implements IStandings {
  constructor(
    private readonly matches: Match[],
    private readonly teams: Team[]
  ) {}

  getStandings(): TableHeader[] {
    const stats = this.teams.map(team => new TeamStats(team.id, this.matches))
  }
}