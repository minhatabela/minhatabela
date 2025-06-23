<script lang="ts" setup>
import type { Match } from '~~/layers/shared/entities/Match'

const { match } = defineProps<{
  match: Match
}>()
</script>

<template>
  <UCard
    variant="subtle"
    class="flex items-center justify-center gap-2"
  >
    <div class="flex w-full justify-between pb-2">
      <div class="pb-2 flex justify-between gap-2">
        <span class="text-xs text-slate-400">{{ match.date.formattedDate }}</span>
        <span class="text-xs text-slate-400">{{ match.time.formattedValue }}</span>
        <span class="text-xs text-slate-400">{{ match.vanue?.getValue }}</span>
      </div>
    </div>
    <div class="flex gap-4 items-center justify-center mt-3">
      <UTooltip :text="match.homeTeam.name">
        <img
          class="w-7"
          :src="match.homeTeam.emblem"
          alt=""
        />
      </UTooltip>
      <span class="text-3xl px-4 w-20 text-center">{{ match.homeGoals }}</span>
      X
      <span class="text-3xl px-4 w-20 text-center">{{ match.awayGoals }}</span>
      <UTooltip :text="match.awayTeam.name">
        <img
          class="w-7"
          :src="match.awayTeam.emblem"
          alt=""
        />
      </UTooltip>
    </div>
  </UCard>
</template>
