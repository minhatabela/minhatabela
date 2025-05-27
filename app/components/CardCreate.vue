<template>
  <UCard variant="subtle">
    <div class="flex flex-col gap-3">
      <div class="flex justify-between">
        <UBadge
          size="xs"
          color="neutral"
          class="mb-2"
          >Partida {{ partida }}</UBadge
        >
      </div>
      <div class="flex items-center justify-center w-full gap-2">
        <p>{{ item[0].value.mandante }}</p>
        x
        <p>{{ item[0].value.visitante }}</p>
      </div>
    </div>
    <div class="flex justify-end">
      <UButton
        @click="emit('setNumeroPartida', partida)"
        size="sm"
        color="info"
        variant="ghost"
        class="mt-4"
      >
        Criar</UButton
      >
    </div>
  </UCard>
</template>

<script lang="ts" setup>
interface Value {
  data: string
  hora: string
  mandante: string
  visitante: string
  numero: number
  rodada: number
  sede: string
}

interface Item {
  numero: string[]
  type: 'CHANGE' | 'REMOVE' | 'DELETE'
  value: Value
  oldValue: string
}

interface Props {
  item: Item[]
}

const emit = defineEmits(['setNumeroPartida'])

const props = defineProps<Props>()

const partida = computed(() => {
  return props.item[0].value.numero
})
</script>

<style></style>
