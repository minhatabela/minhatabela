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
    class="rounded-full p-0 font-bold justify-center"
    style="height: 24px; width: 24px"
  >
    {{ position._value }}
  </UBadge>
</template>
