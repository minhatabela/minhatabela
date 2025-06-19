<script setup lang="ts">
const round = defineModel<number>()
</script>

<template>
  <div class="flex w-full items-center justify-between">
    <button
      :disabled="round === 1"
      @click="round = Number(round) - 1"
    >
      <UIcon
        name="uil:angle-left"
        class="w-5 h-5 cursor-pointer"
        :class="{ 'opacity-40': round === 1 }"
      />
    </button>
    <span class="font-semibold uppercase">Rodada {{ round }}</span>
    <button
      type="button"
      :disabled="round === 38"
      @click="round = Number(round) + 1"
    >
      <UIcon
        name="uil:angle-right"
        class="w-5 h-5 cursor-pointer"
        :class="{ 'opacity-40': round === 38 }"
      />
    </button>
  </div>
</template>
