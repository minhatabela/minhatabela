import type { Match } from '~~/layers/shared/entities/Match'
import { orderBy } from 'lodash'

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
    return matches.value.filter(
      match => !match.isFinished && !match.isPostponed && match.isThisWeek
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
    return matches.value.filter(match => match.round.value === currentRound.value) as Match[]
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
