export interface ITeamStats {
  get proGoals(): number
  get conGoals(): number
  get wins(): number
  get losses(): number
  get draws(): number
  get points(): number
  get matchesCount(): number
  get perf(): number
  get diffGoals(): number
}