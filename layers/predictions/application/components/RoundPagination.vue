<script setup lang="ts">
defineProps<{
  round: number
}>()

const emit = defineEmits<{
  (event: 'next' | 'previous'): void
}>()
</script>

<template>
  <div class="flex w-full items-center justify-between">
    <UButton
      :disabled="round === 1"
      icon="uil:angle-left"
      size="sm"
      variant="ghost"
      class="cursor-pointer"
      @click="emit('previous')"
    />
    <span class="font-semibold uppercase">Rodada {{ round }}</span>
    <UButton
      type="button"
      :disabled="round === 38"
      icon="uil:angle-right"
      size="sm"
      variant="ghost"
      class="cursor-pointer"
      @click="emit('next')"
    />
  </div>
</template>
