import type { Match } from '../../shared/entities/Match'
import { useMatchesManagementStore } from '../stores/MatchesManagement.store'

export class MatchesViewModel {
  selectedMatch = computed({
    get() {
      return useMatchesManagementStore().selectedMatch
    },
    set(match: Match) {
      useMatchesManagementStore().selectedMatch = match
    }
  })

  vanue = computed({
    get() {
      return useMatchesManagementStore().selectedMatch?.vanue?.id
    },
    set(vanueId: string) {
      const vanue = useMatchesManagementStore().vanues.find(vanue => vanue.id === vanueId)
      useMatchesManagementStore().selectedMatch!.vanue = vanue
    }
  })

  round = computed({
    get() {
      return useMatchesManagementStore().selectedMatch?.round
    },
    set(round: number) {
      useMatchesManagementStore().selectedMatch!.round = round
    }
  })

  homeGoals = computed({
    get() {
      return useMatchesManagementStore().selectedMatch?.homeGoals
    },
    set(goals: number) {
      useMatchesManagementStore().selectedMatch!.homeGoals = goals
    }
  })

  awayGoals = computed({
    get() {
      return useMatchesManagementStore().selectedMatch?.awayGoals
    },
    set(goals: number) {
      useMatchesManagementStore().selectedMatch!.awayGoals = goals
    }
  })

  date = computed({
    get() {
      return useMatchesManagementStore().selectedMatch?.date?.toDateString()
    },
    set(date: Date) {
      useMatchesManagementStore().selectedMatch!.date = date
    }
  })

  time = computed({
    get() {
      return useMatchesManagementStore().selectedMatch?.time
    },
    set(time: string) {
      useMatchesManagementStore().selectedMatch!.time = time
    }
  })
}
