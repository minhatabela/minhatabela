<script setup lang="ts">
const MAX_ROUNDS = 38

const MID_SEASON_ROUND = MAX_ROUNDS / 2
const TURN_ROUNDS = fillRounds(1)
const RETURN_ROUNDS = fillRounds(MID_SEASON_ROUND + 1)

function fillRounds(start: number) {
  return Array.from({ length: MID_SEASON_ROUND }, (_, index) => start + index)
}

const selectedRound = defineModel<number>()
const page = ref(selectedRound.value! >= MID_SEASON_ROUND ? 2 : 1)
const rounds = computed(() => (page.value === 1 ? TURN_ROUNDS : RETURN_ROUNDS))

function findBadgeVarinat(round: number) {
  if (!selectedRound.value) return 'outline'
  return selectedRound.value >= round ? 'solid' : 'outline'
}
</script>

<template>
  <div class="grid grid-cols-5 gap-2">
    <UButton
      style="height: 24px; width: 24px"
      class="rounded-full p-0 font-bold justify-center mx-auto cursor-pointer"
      :variant="findBadgeVarinat(round)"
      v-for="round in rounds"
      :key="round"
      :label="String(round)"
      @click="selectedRound = round"
    />
    <UButton
      variant="subtle"
      icon="lucide-x"
      style="height: 24px; width: 24px"
      class="p-0 font-bold justify-center mx-auto cursor-pointer"
      @click="selectedRound = undefined"
    />
  </div>
  <div class="flex justify-between">
    <UButton
      icon="i-lucide-corner-up-right"
      label="turno"
      :disabled="page === 1"
      @click="page = 1"
      size="xs"
      variant="ghost"
    />
    <UButton
      trailing-icon="i-lucide-corner-down-left"
      label="returno"
      :disabled="page === 2"
      @click="page = 2"
      variant="ghost"
      size="xs"
    />
  </div>
</template>
