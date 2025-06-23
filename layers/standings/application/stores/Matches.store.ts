import type { Match } from '~~/layers/shared/entities/Match'

export const useMatchesStore = defineStore('matches', () => {
  const matches = ref<Match[]>([])
  const round = ref<number>()

  function setMatches(_matches: Match[]): void {
    matches.value = useOrderBy(_matches, match => new Date(match.date.value).getTime())
  }

  const nextMatch = computed(() => {
    return matches.value.filter(match => !match.isFinished).at(0)
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
