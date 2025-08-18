<script setup lang="ts">
const selectedRound = defineModel<number>()

function nextRound() {
  selectedRound.value = selectedRound.value! + 1
}

function previousRound() {
  selectedRound.value = selectedRound.value! - 1
}

const open = ref()

const trailingIcon = computed(() => (open.value ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'))
</script>

<template>
  <div class="flex w-full items-center justify-between">
    <UButton
      :disabled="selectedRound === 1"
      icon="i-lucide-chevron-left"
      size="sm"
      variant="outline"
      class="cursor-pointer"
      @click="previousRound"
    />
    <UPopover @update:open="(value: boolean) => (open = value)">
      <UButton
        color="neutral"
        variant="ghost"
        :trailing-icon="trailingIcon"
        class="font-semibold uppercase"
        >Rodada {{ selectedRound }}</UButton
      >
      <template #content>
        <div class="p-4">
          <RoundPicker v-model="selectedRound" />
        </div>
      </template>
    </UPopover>
    <UButton
      type="button"
      :disabled="selectedRound === 38"
      icon="i-lucide-chevron-right"
      size="sm"
      variant="outline"
      class="cursor-pointer"
      @click="nextRound"
    />
  </div>
</template>
