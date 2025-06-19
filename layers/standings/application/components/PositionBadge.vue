<script setup lang="ts">
import { PositionColorFactory } from '../../domain/factories/PositionColor.factory'
import type { Position } from '../../domain/values/Position'

const { position } = defineProps<{
  position: Position
}>()

const standingsPositionColor = computed(() => {
  return PositionColorFactory.make(position)
})
</script>
<template>
  <UBadge
    :color="standingsPositionColor"
    class="rounded-full w-6 h-6 p-0 font-bold justify-center"
  >
    {{ position._value }}
  </UBadge>
</template>
