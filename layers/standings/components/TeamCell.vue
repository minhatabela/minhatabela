<script setup lang="ts">
import type { TeamCell } from '../dtos/TeamCell.dto'

defineProps<TeamCell>()
</script>

<template>
  <div class="flex gap-2 items-center">
    <img
      class="w-6 h-6"
      :src="emblem"
      :alt="team"
    />
    <span class="font-bold">{{ team }}</span>
  </div>
</template>
