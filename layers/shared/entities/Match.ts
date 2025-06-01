import type { MatchDate } from "../values/MatchDate";
import type { MatchNumber } from "../values/MatchNumber";
import type { MatchTime } from "../values/MatchTime";
import type { Round } from "../values/Round";
import type { Team } from "./Team";
import type { Vanue } from "./Vanue";

export class Match {
  constructor(
    private id: string, 
    private round: Round, 
    private number: MatchNumber, 
    private date: MatchDate, 
    private hour: MatchTime, 
    private vanue?: Vanue,
    private homeTeam?: Team,
    private awayTeam?: Team,
    private homeGoals?: number,
    private awayGoals?: number
  ) {}
}