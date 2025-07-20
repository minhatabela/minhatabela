import type { Match } from '~~/layers/shared/entities/Match'
import { orderBy } from 'lodash'

export const useMatchesStore = defineStore('matches', () => {
  const matches = ref<Match[]>([])
  const round = ref<number>()

  function setMatches(_matches: Match[]): void {
    matches.value = _matches
  }

  const nextMatch = computed(() => {
    return orderBy(
      matches.value.filter(match => !match.isFinished && !match.isPostponed && match.isThisWeek),
      match => match.round.value
    )[0]
  })

  const currentRound = computed({
    get() {
      return round.value || nextMatch.value?.round.value
    },
    set(value: number) {
      round.value = value
    }
  })

  function nextRound() {
    currentRound.value = currentRound.value! + 1
  }

  function previousRound() {
    currentRound.value = currentRound.value! - 1
  }

  function getRoundMatches(): Match[] {
    const roundMatches = matches.value.filter(
      match => match.round.value === currentRound.value
    ) as Match[]
    return orderBy(roundMatches, match => {
      if (match.time.value) {
        const [hours, mins, secs] = match.time.value.split(':').map(Number)
        return match.date.dateValue!.setHours(hours!, mins, secs)
      }

      return match.date.dateValue
    })
  }

  return {
    matches,
    setMatches,
    currentRound,
    getRoundMatches,
    nextRound,
    previousRound
  }
})
