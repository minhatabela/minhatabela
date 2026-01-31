import { type CalendarDate, CalendarDateTime, Time } from '@internationalized/date'
import type { Match } from '../../shared/entities/Match'
import { useMatchesManagementStore } from '../stores/MatchesManagement.store'

export class MatchesViewModel {
  selectedMatch = computed({
    get() {
      return useMatchesManagementStore().selectedMatch
    },
    set(match: Match | undefined) {
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
      return isDefined(useMatchesManagementStore().selectedMatch?.homeGoals)
        ? useMatchesManagementStore().selectedMatch?.homeGoals
        : null
    },
    set(goals: number) {
      useMatchesManagementStore().selectedMatch!.homeGoals = goals
    }
  })

  awayGoals = computed({
    get() {
      return isDefined(useMatchesManagementStore().selectedMatch?.awayGoals)
        ? useMatchesManagementStore().selectedMatch?.awayGoals
        : null
    },
    set(goals: number) {
      useMatchesManagementStore().selectedMatch!.awayGoals = goals
    }
  })

  date = computed({
    get() {
      const selectedDate = useMatchesManagementStore().selectedMatch?.date
      if (!selectedDate) return
      return new CalendarDateTime(
        selectedDate.getFullYear(),
        selectedDate.getMonth() - 1,
        selectedDate.getDate()
      )
    },
    set(date: CalendarDate) {
      if (!date) return

      const selectedDate = useMatchesManagementStore().selectedMatch?.date

      console.log('date: ', date)
      useMatchesManagementStore().selectedMatch!.date = new Date(
        date.year,
        date.month - 1,
        date.day,
        selectedDate?.getHours() || 0,
        selectedDate?.getMinutes() || 0
      )
    }
  })

  time = computed({
    get() {
      const selectedTime = useMatchesManagementStore().selectedMatch?.date
      if (!selectedTime) return
      return new Time(selectedTime.getHours(), selectedTime.getMinutes(), selectedTime.getSeconds())
    },
    set(time: Time) {
      useMatchesManagementStore().selectedMatch!.date?.setHours(time.hour, time.minute, time.second)
    }
  })
}
