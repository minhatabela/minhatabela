import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Match } from '../../shared/entities/Match'
import type { Vanue } from '../../shared/entities/Vanue'

export const useMatchesManagementStore = defineStore('matches-management', () => {
  const selectedMatch = ref<Match | undefined>()
  const vanues = ref<Vanue[]>([])

  return {
    selectedMatch,
    vanues
  }
})
