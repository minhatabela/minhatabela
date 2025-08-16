import type { Match } from '~~/layers/shared/entities/Match'
import { orderBy } from 'lodash'
import type { StandingsFiltersDto } from '../dtos/StandingsFilters.dto'
import { HomeAwayEnum } from '../enums/HomeAway.enum'
import { TurnReturnEnum } from '../enums/TurnReturn.enum'

export const useMatchesStore = defineStore('matches', () => {
  const matches = ref<Match[]>([])
  const round = ref<number>()

  function setMatches(_matches: Match[]): void {
    matches.value = orderBy(_matches, match => {
      if (match.time.value) {
        const [hours, mins, secs] = match.time.value.split(':').map(Number)
        return match.date.dateValue!.setHours(hours!, mins, secs)
      }

      return match.date.dateValue
    })
  }

  const nextMatch = computed(() => {
    return matches.value.find(match => !match.isFinished && !match.isPostponed && match.isThisWeek)
  })

  const currentRound = computed({
    get() {
      if (round.value) return round.value

      if (nextMatch.value) return nextMatch.value.round.value

      const notPostponedMatches = matches.value.filter(match => !match.isPostponed)

      return notPostponedMatches[notPostponedMatches.length - 1]?.round.value
    },
    set(value: number) {
      round.value = value
    }
  })

  const standingsFilter = ref<StandingsFiltersDto>({
    homeAway: HomeAwayEnum.ALL,
    turnReturn: TurnReturnEnum.BOTH,
    peakRound: undefined
  })

  function nextRound() {
    currentRound.value = currentRound.value! + 1
  }

  function previousRound() {
    currentRound.value = currentRound.value! - 1
  }

  function getRoundMatches(): Match[] {
    return matches.value.filter(match => match.round.value === currentRound.value) as Match[]
  }

  return {
    matches,
    setMatches,
    currentRound,
    getRoundMatches,
    nextRound,
    previousRound,
    standingsFilter
  }
})
