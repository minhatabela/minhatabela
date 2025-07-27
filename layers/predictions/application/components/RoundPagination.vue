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
      icon="i-lucide-chevron-left"
      size="sm"
      variant="outline"
      class="cursor-pointer"
      @click="emit('previous')"
    />
    <span class="font-semibold uppercase">Rodada {{ round }}</span>
    <UButton
      type="button"
      :disabled="round === 38"
      icon="i-lucide-chevron-right"
      size="sm"
      variant="outline"
      class="cursor-pointer"
      @click="emit('next')"
    />
  </div>
</template>
